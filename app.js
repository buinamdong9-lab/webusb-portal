/**
 * @file app.js
 * @module WebUSB/App
 * @description Điểm khởi động chính, điều phối luồng người dùng và kết nối các module.
 * @stateDepends Tất cả trạng thái AppState
 * @security Đảm bảo toàn vẹn quy trình kiểm tra và cấp phép bản quyền.
 */

import { appState } from "./state.js";
import { AppState, ErrorCodes } from "./constants.js";
import { CONFIG } from "./config.js";
import {
  isFileSystemSupported,
  pickUsbDirectoryHandleAsync,
  scanDirectoryForThreatsAsync,
  calculateQuizSafetyScore,
  runMockScanAsync,
} from "./scanner.js";
import {
  renderAppState,
  updateScanProgress,
  finishScanProgress,
  setupQrModal,
  updateQrCountdown,
} from "./ui.js";
import {
  generateVietQrImageUrl,
  startPaymentWatcher,
} from "./vietqr.js";

let cancelPaymentWatcher = null;
let cachedOrderId = null;
let cachedSerial = null;

// Khởi chạy khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  console.log(`[WebUSB] Khởi chạy: ${CONFIG.SERVICE.NAME} v${CONFIG.SERVICE.VERSION}`);

  // Đăng ký StateManager lắng nghe thay đổi trạng thái
  appState.subscribe((state, session) => {
    renderAppState(state, session);
  });

  // Gắn sự kiện các nút tương tác
  bindUserActions();

  // Kiểm tra nếu được mở từ Desktop App (hỗ trợ hash fragment #orderId=... và query ?orderId=... - NEW-07)
  const hashRaw = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
  const hashParams = new URLSearchParams(hashRaw);
  const searchParams = new URLSearchParams(window.location.search);
  const paramOrderId = hashParams.get("orderId") || searchParams.get("orderId");
  const paramSerial = hashParams.get("serial") || searchParams.get("serial");

  if (paramOrderId) {
    cachedOrderId = paramOrderId;
    cachedSerial = paramSerial;
  }

  // Xóa tham số nhạy cảm khỏi thanh địa chỉ duyệt web (NEW-07)
  if (paramOrderId && window.history && window.history.replaceState) {
    window.history.replaceState(null, "", window.location.pathname);
  }

  if (paramOrderId) {
    handleOpenVietQrExisting(paramOrderId, paramSerial);
  } else {
    // Khởi tạo trạng thái ban đầu IDLE
    appState.reset();
  }
});

/**
 * Gắn kết các sự kiện nút bấm giao diện.
 */
function bindUserActions() {
  document.getElementById("btn-start-scan")?.addEventListener("click", handleStartScanAsync);
  document.getElementById("btn-mock-scan")?.addEventListener("click", handleMockScanAsync);
  document.getElementById("btn-upgrade-20k")?.addEventListener("click", handleOpenVietQr);
  document.getElementById("btn-cancel-qr")?.addEventListener("click", handleCancelQr);
  document.getElementById("btn-close-error")?.addEventListener("click", () => {
    document.getElementById("error-modal")?.classList.add("hidden");
    appState.reset();
  });
  document.getElementById("btn-success-done")?.addEventListener("click", () => {
    try { window.close(); } catch { }
    appState.reset();
  });

  const bindCopy = (btnId, textId) => {
    document.getElementById(btnId)?.addEventListener("click", (e) => {
      const text = document.getElementById(textId)?.textContent?.trim() || "";
      if (text && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        const b = e.currentTarget, old = b.textContent;
        b.textContent = "✓";
        setTimeout(() => { b.textContent = old; }, 1200);
      }
    });
  };
  bindCopy("btn-copy-acc", "qr-account-no");
  bindCopy("btn-copy-memo", "qr-serial-code");
}

/**
 * Xử lý luồng quét tệp tin trên USB phía máy khách qua File System Access API.
 */
async function handleStartScanAsync() {
  if (appState.getState() !== AppState.IDLE) return;

  if (!isFileSystemSupported()) {
    appState.transition(AppState.ERROR, {
      errorCode: ErrorCodes.ERR_SCAN_001,
      errorMessage: "Trình duyệt không hỗ trợ File System Access API. Vui lòng mở bằng Chrome hoặc Edge trên máy tính.",
    });
    return;
  }

  try {
    const dirHandle = await pickUsbDirectoryHandleAsync([]);
    const usbDisplayName = dirHandle.customDisplayName || dirHandle.name || "Ổ đĩa USB";
    
    appState.transition(AppState.SCANNING, {
      usbHandle: dirHandle,
      driveName: usbDisplayName,
      totalFiles: 0,
      threats: [],
    });

    const scanResult = await scanDirectoryForThreatsAsync(dirHandle, (count, fileName) => {
      updateScanProgress(count, fileName);
    });

    finishScanProgress(scanResult.totalFiles);
    const safetyScore = calculateQuizSafetyScore(scanResult.threats);

    appState.transition(AppState.THREAT_REPORT, {
      driveName: usbDisplayName,
      threats: scanResult.threats,
      totalFiles: scanResult.totalFiles,
      safetyScore: safetyScore,
      usbSerial: null,
      usbHandle: dirHandle
    });
  } catch (err) {
    if (err.code === ErrorCodes.ERR_SCAN_002) {
      appState.reset();
      return;
    }
    appState.transition(AppState.ERROR, {
      errorCode: err.code || ErrorCodes.ERR_SCAN_003,
      errorMessage: err.message,
    });
  }
}

/**
 * Xử lý quét giả lập (Mock Scan) để test giao diện.
 */
async function handleMockScanAsync() {
  if (appState.getState() !== AppState.IDLE) return;

  appState.transition(AppState.SCANNING, {
    driveName: CONFIG.MOCK_DATA.DRIVE_NAME,
    totalFiles: 0,
  });

  const mockResult = await runMockScanAsync((count, fileName) => {
    updateScanProgress(count, fileName);
  });

  finishScanProgress(mockResult.totalFiles || 42);
  appState.transition(AppState.THREAT_REPORT, mockResult);
}

/**
 * Xử lý nút Nâng Cấp Bản Chuẩn 20k.
 * Nếu mở từ Desktop App: mở popup VietQR đã gắn Serial thật (BUG-R02).
 * Nếu mở web độc lập: hướng dẫn cắm USB và bấm nút từ Desktop App để nhận diện phần cứng thật.
 */
function handleOpenVietQr() {
  const params = new URLSearchParams(window.location.search);
  const orderId = cachedOrderId || params.get("orderId");
  const serial = cachedSerial || params.get("serial");

  if (orderId && serial) {
    handleOpenVietQrExisting(orderId, serial);
    return;
  }

  // Khách truy cập web độc lập: Hiển thị modal hướng dẫn non-blocking (BUG-14)
  appState.transition(AppState.ERROR, {
    errorCode: "HARDWARE_AUTH_REQUIRED",
    errorMessage: "Để bản quyền RSA-2048 được gắn kết vĩnh viễn vào đúng chip phần cứng USB thật:\n\n1. Cắm USB vào máy tính và mở ứng dụng 'USB An Toàn'.\n2. Bấm nút '⚡ Quét VietQR Mua Bản Quyền 20k' ngay trong ứng dụng.\n3. Ứng dụng sẽ tự động trích xuất Hardware Serial thật và mở cổng thanh toán chuẩn xác!",
  });
}

/**
 * Mở trực tiếp VietQR khi đơn hàng đã được Desktop App tạo sẵn với Serial phần cứng thật.
 * Xác thực đơn hàng tồn tại và ở trạng thái PENDING trước khi hiển thị QR (BUG-04).
 * @param {string} orderId - Mã đơn hàng.
 * @param {string} serial - Serial phần cứng thật.
 */
async function handleOpenVietQrExisting(orderId, serial) {
  try {
    const res = await fetch(`/api/order/status?orderId=${encodeURIComponent(orderId)}`);
    if (!res.ok) {
      appState.transition(AppState.ERROR, {
        errorCode: "ERR_ORDER_NOT_FOUND",
        errorMessage: "Đơn hàng thanh toán không tồn tại hoặc đã bị hủy. Vui lòng mở lại từ Desktop App!",
      });
      return;
    }
    const orderInfo = await res.json();
    if (orderInfo.status === "PAID" || orderInfo.status === "REDEEMED") {
      appState.transition(AppState.COMPLETED, { orderId, isPaid: true, status: orderInfo.status });
      return;
    }
    if (orderInfo.status !== "PENDING") {
      appState.transition(AppState.ERROR, {
        errorCode: "ERR_ORDER_NOT_PENDING",
        errorMessage: `Đơn hàng này hiện ở trạng thái '${orderInfo.status}'. Không thể hiển thị lại mã VietQR!`,
      });
      return;
    }
  } catch (err) {
    console.warn("[App] Lỗi kết nối xác thực đơn hàng:", err);
    appState.transition(AppState.ERROR, {
      errorCode: "ERR_ORDER_VERIFY_NETWORK",
      errorMessage: "Không thể kết nối đến máy chủ để xác thực đơn hàng. Vui lòng kiểm tra lại kết nối mạng!",
    });
    return;
  }

  const qrUrl = generateVietQrImageUrl(orderId, CONFIG.SERVICE.PRICE_VND);
  setupQrModal(qrUrl, orderId, `USB ${orderId}`);
  appState.transition(AppState.QR_PENDING, { orderId, usbSerial: serial });

  cancelPaymentWatcher = startPaymentWatcher(
    orderId,
    (secondsLeft) => updateQrCountdown(secondsLeft),
    (paymentData) => {
      appState.transition(AppState.COMPLETED, paymentData);
    },
    (errorCode) => {
      appState.transition(AppState.ERROR, {
        errorCode: errorCode,
        errorMessage: "Giao dịch đã hết hạn chờ thanh toán. Vui lòng thử lại.",
      });
    }
  );
}

/**
 * Hủy popup VietQR và dừng watcher.
 * Tránh hiển thị màn hình báo cáo rỗng nếu mở trực tiếp từ URL không qua bước quét (BUG-R04).
 */
function handleCancelQr() {
  if (typeof cancelPaymentWatcher === "function") {
    cancelPaymentWatcher();
    cancelPaymentWatcher = null;
  }
  const session = appState.getSessionData();
  if (session && ((session.threats && session.threats.length > 0) || session.driveName)) {
    appState.transition(AppState.THREAT_REPORT);
  } else {
    appState.reset();
  }
}

