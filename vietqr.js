/**
 * @file vietqr.js
 * @module WebUSB/VietQR
 * @description Sinh mã VietQR động 20.000đ và quản lý luồng chờ xác thực thanh toán theo Order ID.
 * @stateDepends APP_STATE_THREAT_REPORT -> APP_STATE_QR_PENDING -> APP_STATE_COMPLETED
 * @security Sử dụng Order ID ngẫu nhiên hết hạn, polling trạng thái từ SQLite Backend.
 */

import { CONFIG } from "./config.js";
import { ErrorCodes } from "./constants.js";

function generateSecureClientSecret() {
  if (typeof crypto === "undefined" || !crypto.getRandomValues) {
    throw new Error("ERR_CRYPTO: Trình duyệt không hỗ trợ CSPRNG. Yêu cầu HTTPS hoặc trình duyệt hiện đại.");
  }
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return "SEC-" + Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

/**
 * Gọi Backend tạo đơn hàng thanh toán kích hoạt cho USB (kèm Client Secret Challenge CSPRNG).
 * TUYỆT ĐỐI KHÔNG FALLBACK OFFLINE nếu server lỗi để tránh khách chuyển tiền nhưng không có đơn hàng.
 * @param {string} usbSerial - Mã serial phần cứng của USB.
 * @returns {Promise<{ orderId: string, amount: number, memo: string, clientSecret: string, expiresAt: string }>}
 */
export async function createPaymentOrderAsync(usbSerial) {
  const generatedSecret = generateSecureClientSecret();
  try {
    const res = await fetch("/api/order/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        usbSerial: usbSerial || "USB_GENERIC",
        clientSecret: generatedSecret
      })
    });
    if (res.ok) {
      const data = await res.json();
      return { ...data, clientSecret: generatedSecret };
    }
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.error || errBody.message || `Lỗi máy chủ (${res.status})`);
  } catch (err) {
    console.error("[VietQR] Lỗi kết nối máy chủ thanh toán:", err);
    throw new Error("Không thể kết nối máy chủ thanh toán để tạo mã QR. Vui lòng kiểm tra lại dịch vụ backend!");
  }
}

/**
 * Sinh đường dẫn ảnh mã VietQR động chuẩn Napas 24/7 theo Order ID.
 * @param {string} orderId - Mã đơn hàng ngẫu nhiên.
 * @param {number} [amount] - Số tiền thanh toán (mặc định 20.000đ).
 * @returns {string} URL hình ảnh VietQR.
 */
export function generateVietQrImageUrl(orderId, amount = CONFIG.SERVICE.PRICE_VND) {
  const safeMemo = encodeURIComponent(`USB ${(orderId || "TEST86").trim().toUpperCase()}`);
  const bank = CONFIG.PAYMENT.BANK_ID;
  const account = CONFIG.PAYMENT.ACCOUNT_NO;
  const accountName = encodeURIComponent(CONFIG.PAYMENT.ACCOUNT_NAME);

  return (
    `https://img.vietqr.io/image/${bank}-${account}-compact2.png` +
    `?amount=${amount}&addInfo=${safeMemo}&accountName=${accountName}`
  );
}

/**
 * Bắt đầu luồng kiểm tra thanh toán với đếm ngược 15 phút theo Order ID.
 * @param {string} orderId - Mã đơn hàng.
 * @param {function(number): void} onTick - Callback mỗi giây (số giây còn lại).
 * @param {function(object): void} onSuccess - Callback khi thanh toán thành công.
 * @param {function(string): void} onError - Callback khi timeout hoặc lỗi.
 * @returns {function(): void} Hàm hủy tiến trình đếm ngược/polling.
 */
export function startPaymentWatcher(orderId, onTick, onSuccess, onError) {
  let secondsLeft = CONFIG.PAYMENT.TIMEOUT_SECONDS;
  let isCancelled = false;
  let notFoundCount = 0;

  // Đồng hồ đếm ngược
  const timerInterval = setInterval(() => {
    if (isCancelled) return;
    secondsLeft--;
    if (typeof onTick === "function") {
      onTick(secondsLeft);
    }

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      clearInterval(pollInterval);
      if (typeof onError === "function") {
        onError(ErrorCodes.ERR_PAY_001);
      }
    }
  }, 1000);

  // Vòng lặp Polling kiểm tra trạng thái thanh toán từ Server
  const pollInterval = setInterval(async () => {
    if (isCancelled) return;

    try {
      const response = await fetch(`/api/order/status?orderId=${encodeURIComponent(orderId)}`);
      if (response.ok) {
        notFoundCount = 0;
        const data = await response.json();
        if (data.isPaid) {
          clearInterval(timerInterval);
          clearInterval(pollInterval);
          if (typeof onSuccess === "function") {
            onSuccess({
              orderId: orderId,
              isPaid: true,
              status: "PAID"
            });
          }
          return;
        }
      } else {
        if (response.status === 404) {
          notFoundCount++;
          if (notFoundCount >= 3) {
            clearInterval(timerInterval);
            clearInterval(pollInterval);
            if (typeof onError === "function") onError(ErrorCodes.ERR_PAY_001);
            return;
          }
        }
        console.warn(`[VietQR Polling] Máy chủ phản hồi mã ${response.status} cho đơn hàng ${orderId}`);
      }
    } catch (pollErr) {
      // Ghi log cảnh báo kết nối mạng thay vì catch rỗng
      console.warn("[VietQR Polling] Lỗi mạng khi kiểm tra trạng thái thanh toán:", pollErr?.message || pollErr);
    }
  }, CONFIG.PAYMENT.POLL_INTERVAL_MS);

  // Trả về hàm hủy để dọn dẹp khi người dùng đóng popup
  return function cancelWatcher() {
    isCancelled = true;
    clearInterval(timerInterval);
    clearInterval(pollInterval);
  };
}
