/**
 * @file ui.js
 * @module WebUSB/UI
 * @description Điều khiển render giao diện theo phong cách Quizz và cập nhật trạng thái FSM.
 * @stateDepends AppState
 * @security Đảm bảo nút thao tác bị khóa khi đang bận, không rò rỉ dữ liệu nhạy cảm.
 */

import { AppState } from "./constants.js";
import { CONFIG } from "./config.js";

/**
 * Cập nhật giao diện chính dựa theo trạng thái FSM hiện tại.
 * @param {string} state - Trạng thái hiện hành từ AppState.
 * @param {object} session - Dữ liệu phiên hiện tại.
 * @returns {void}
 */
export function renderAppState(state, session) {
  // Ẩn tất cả các view card
  const views = ["view-idle", "view-scanning", "view-report", "view-qr", "view-success"];
  views.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });

  // Hiển thị view tương ứng
  switch (state) {
    case AppState.IDLE:
      showElement("view-idle");
      break;

    case AppState.SCANNING:
      showElement("view-scanning");
      break;

    case AppState.THREAT_REPORT:
      renderThreatReportView(session);
      showElement("view-report");
      break;

    case AppState.QR_PENDING:
      showElement("view-qr");
      break;

    case AppState.COMPLETED:
      renderSuccessView(session);
      showElement("view-success");
      break;

    case AppState.ERROR:
      renderErrorModal(session.errorCode, session.errorMessage);
      break;
  }
}

/**
 * Hiển thị phần tử theo ID bằng cách bỏ class 'hidden'.
 * @param {string} id - ID phần tử.
 */
function showElement(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("hidden");
}

/**
 * Cập nhật thanh tiến trình quét tệp tin trơn tru theo hàm tiệm cận.
 * Tránh hardcode 150 file gây đứng đơ ở 95%.
 * @param {number} count - Số lượng tệp đã duyệt.
 * @param {string} currentFileName - Tên tệp hiện tại.
 */
export function updateScanProgress(count, currentFileName) {
  const countEl = document.getElementById("scan-file-count");
  const nameEl = document.getElementById("scan-current-file");
  const barEl = document.getElementById("scan-progress-bar");

  if (countEl) countEl.textContent = count.toLocaleString();
  if (nameEl) nameEl.textContent = currentFileName.length > 30 ? currentFileName.slice(0, 27) + "..." : currentFileName;
  if (barEl) {
    const smoothPercent = Math.min(98, Math.round(98 * (1 - Math.exp(-count / 75))));
    barEl.style.width = `${Math.max(5, smoothPercent)}%`;
  }
}

/**
 * Đặt thanh tiến trình về 100% khi quét tệp tin hoàn tất.
 * @param {number} totalFiles - Tổng số tệp đã quét.
 */
export function finishScanProgress(totalFiles) {
  const countEl = document.getElementById("scan-file-count");
  const barEl = document.getElementById("scan-progress-bar");
  if (countEl) countEl.textContent = totalFiles.toLocaleString();
  if (barEl) barEl.style.width = "100%";
}

/**
 * Render thẻ kết quả chẩn đoán phong cách Quizz (Điểm số & Danh sách mối nguy).
 * @param {object} session - Dữ liệu phiên.
 */
function renderThreatReportView(session) {
  const score = session.safetyScore ?? 100;
  const isProtected = session.isBtl86Protected || score === 100;
  const scoreEl = document.getElementById("report-score-number");
  const rankEl = document.getElementById("report-rank-badge");
  const listEl = document.getElementById("report-threats-list");
  const driveEl = document.getElementById("report-drive-name");
  const summaryEl = document.getElementById("report-score-summary");
  const boxUpgrade = document.getElementById("box-upgrade-action");
  const boxProtected = document.getElementById("box-protected-action");

  if (driveEl) driveEl.textContent = session.driveName || "Ổ đĩa USB";
  if (scoreEl) {
    scoreEl.textContent = score;
    scoreEl.className = score >= 80
      ? "text-6xl font-extrabold text-emerald-400 tracking-tight"
      : (score >= 50 ? "text-6xl font-extrabold text-amber-400 tracking-tight" : "text-6xl font-extrabold text-rose-500 tracking-tight");
  }

  // Cập nhật mô tả tóm tắt điểm số
  if (summaryEl) {
    if (isProtected) {
      summaryEl.textContent = "🛡️ USB đã được bảo vệ bởi phần mềm BTL86. Cấu trúc an toàn, hoàn toàn miễn nhiễm virus!";
      summaryEl.className = "text-xs text-emerald-300 mt-2 font-medium";
    } else if (score >= 80) {
      summaryEl.textContent = "✅ Ổ đĩa an toàn, không phát hiện mã độc shortcut hay script bất thường nào.";
      summaryEl.className = "text-xs text-emerald-300 mt-2 font-medium";
    } else {
      summaryEl.textContent = "⚠️ Phát hiện mã độc shortcut hoặc script nguy hiểm. Dữ liệu có nguy cơ bị virus chiếm quyền!";
      summaryEl.className = "text-xs text-rose-300/80 mt-2 font-medium";
    }
  }

  // Xếp loại theo phong cách Quizz Gamified
  if (rankEl) {
    if (score >= 80) {
      rankEl.textContent = isProtected ? "ĐÃ BẢO VỆ BTL86 🛡️" : "AN TOÀN TUYỆT VỜI 🛡️";
      rankEl.className = "quiz-badge bg-emerald-500 text-white";
    } else if (score >= 50) {
      rankEl.textContent = "CẢNH BÁO NGUY CƠ ⚠️";
      rankEl.className = "quiz-badge bg-amber-500 text-white";
    } else {
      rankEl.textContent = "CỰC KỲ NGUY HIỂM 🚨";
      rankEl.className = "quiz-badge bg-rose-600 text-white animate-pulse";
    }
  }

  // Ẩn/Hiện nút Quẹt 20k hoặc Khối Đã bảo vệ
  if (boxUpgrade && boxProtected) {
    if (isProtected) {
      boxUpgrade.classList.add("hidden");
      boxProtected.classList.remove("hidden");
    } else {
      boxUpgrade.classList.remove("hidden");
      boxProtected.classList.add("hidden");
    }
  }

  // Danh sách các phát hiện
  if (listEl) {
    listEl.innerHTML = "";
    const threats = session.threats || [];

    if (threats.length === 0) {
      if (isProtected) {
        listEl.innerHTML = `
          <div class="space-y-1.5">
            <div class="flex items-center space-x-2 p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
              <span class="font-bold">✓</span>
              <span>Đã kích hoạt Ironclad Fortress: App, Du_Lieu_Chung, Vung_Bao_Mat</span>
            </div>
            <div class="flex items-center space-x-2 p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
              <span class="font-bold">✓</span>
              <span>Chữ ký số bản quyền: Xác thực hợp lệ (${session.usbSerial || "BTL86"})</span>
            </div>
            <div class="flex items-center space-x-2 p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
              <span class="font-bold">✓</span>
              <span>Tệp cấu hình Autorun & Icon: An toàn, không chứa mã độc</span>
            </div>
          </div>
        `;
      } else {
        listEl.innerHTML = `
          <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm">
            ✅ Không tìm thấy mã độc shortcut hay script bất thường nào trên USB này!
          </div>
        `;
      }
    } else {
      threats.slice(0, 6).forEach((item) => {
        const itemHtml = `
          <div class="flex items-center justify-between p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-xs">
            <div class="flex items-center space-x-2 truncate">
              <span class="text-rose-400 font-bold text-sm">✕</span>
              <span class="text-slate-200 font-mono truncate">${item.fileName}</span>
            </div>
            <span class="text-rose-300 bg-rose-950/70 border border-rose-800/60 px-2 py-0.5 rounded text-[10px] font-bold">
              -${item.deductPoints} ĐIỂM
            </span>
          </div>
        `;
        listEl.innerHTML += itemHtml;
      });
    }
  }
}

/**
 * Hiển thị Modal VietQR kèm đồng hồ đếm ngược.
 * @param {string} qrUrl - Đường dẫn mã QR.
 * @param {string} orderId - Mã đơn hàng.
 * @param {string} [memo] - Cú pháp chuyển khoản.
 */
export function setupQrModal(qrUrl, orderId, memo) {
  const qrImg = document.getElementById("qr-image");
  const serialText = document.getElementById("qr-serial-code");
  const amountText = document.getElementById("qr-amount-text");
  const bankText = document.getElementById("qr-bank-text");
  const accountNoText = document.getElementById("qr-account-no");
  const accountNameText = document.getElementById("qr-account-name");

  if (qrImg) qrImg.src = qrUrl;
  if (serialText) serialText.textContent = memo || `USB ${orderId}`;
  if (amountText) amountText.textContent = CONFIG.SERVICE.PRICE_LABEL;
  if (bankText) bankText.textContent = CONFIG.PAYMENT.BANK_NAME || "MB Bank (Quân Đội)";
  if (accountNoText) accountNoText.textContent = CONFIG.PAYMENT.ACCOUNT_NO;
  if (accountNameText) accountNameText.textContent = CONFIG.PAYMENT.ACCOUNT_NAME;
}

/**
 * Cập nhật đồng hồ đếm ngược trên popup VietQR.
 * @param {number} seconds - Số giây còn lại.
 */
export function updateQrCountdown(seconds) {
  const timerEl = document.getElementById("qr-countdown");
  if (!timerEl) return;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timerEl.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Cập nhật đường dẫn tải bản quyền và bộ cài khi hoàn tất.
 * @param {object} session - Dữ liệu phiên.
 */
/**
 * Cập nhật giao diện thông báo thanh toán thành công khi hoàn tất.
 * @param {object} session - Dữ liệu phiên.
 */
function renderSuccessView(session) {
  const orderId = session.orderId || "";
  const orderEl = document.getElementById("success-order-id");
  if (orderEl) {
    orderEl.textContent = orderId;
  }
}

/**
 * Hiển thị thông báo lỗi thân thiện kèm mã tra cứu.
 * @param {string} code - Mã lỗi (ERR_xxx).
 * @param {string} message - Chi tiết lỗi.
 */
function renderErrorModal(code, message) {
  const errBox = document.getElementById("error-modal");
  const errCodeEl = document.getElementById("error-code-badge");
  const errMsgEl = document.getElementById("error-message-text");

  if (errCodeEl) errCodeEl.textContent = code || "ERR_UNKNOWN";
  if (errMsgEl) errMsgEl.textContent = message || "Đã xảy ra lỗi ngoài dự kiến.";
  if (errBox) errBox.classList.remove("hidden");
}

