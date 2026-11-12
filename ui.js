/**
 * @file ui.js
 * @module WebUSB/UI
 * @description Điều khiển giao diện hiển thị kết quả quét và popup Donate VietQR.
 * @author BUI NAM DONG Senior Dev
 * @copyright Copyright © 2026 BUI NAM DONG Senior Dev. All rights reserved.
 * @stateDepends AppState
 * @security Đảm bảo an toàn DOM, không sử dụng innerHTML với dữ liệu người dùng chưa lọc.
 */

import { AppState } from "./constants.js";
import { CONFIG } from "./config.js";
import { generateDonateQrUrl } from "./vietqr.js";

/**
 * Cập nhật giao diện chính dựa theo trạng thái FSM hiện tại.
 * @param {string} state - Trạng thái hiện hành từ AppState.
 * @param {object} session - Dữ liệu phiên hiện tại.
 */
export function renderAppState(state, session) {
  const views = ["view-idle", "view-scanning", "view-report"];
  views.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });

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

    case AppState.ERROR:
      renderErrorModal(session.errorCode, session.errorMessage);
      break;
  }
}

/**
 * Hiển thị phần tử theo ID.
 * @param {string} id - ID phần tử.
 */
function showElement(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("hidden");
}

/**
 * Cập nhật thanh tiến trình quét tệp tin.
 * @param {number} count - Số lượng tệp đã duyệt.
 * @param {string} currentFileName - Tên tệp hiện tại.
 */
export function updateScanProgress(count, currentFileName) {
  const countEl = document.getElementById("scan-file-count");
  const nameEl = document.getElementById("scan-current-file");
  const barEl = document.getElementById("scan-progress-bar");

  if (countEl) countEl.textContent = count.toLocaleString();
  if (nameEl) {
    nameEl.textContent = currentFileName.length > 30
      ? currentFileName.slice(0, 27) + "..."
      : currentFileName;
  }
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
 * Render thẻ kết quả chẩn đoán và danh sách mối nguy.
 * @param {object} session - Dữ liệu phiên.
 */
function renderThreatReportView(session) {
  const score = session.safetyScore ?? 100;
  const isProtected = score === 100 && (!session.threats || session.threats.length === 0);
  const scoreEl = document.getElementById("report-score-number");
  const rankEl = document.getElementById("report-rank-badge");
  const listEl = document.getElementById("report-threats-list");
  const driveEl = document.getElementById("report-drive-name");
  const summaryEl = document.getElementById("report-score-summary");

  if (driveEl) driveEl.textContent = session.driveName || "Ổ đĩa USB";

  if (scoreEl) {
    scoreEl.textContent = score;
    scoreEl.className = score >= 80
      ? "text-6xl font-extrabold text-emerald-400 tracking-tight"
      : (score >= 50
        ? "text-6xl font-extrabold text-amber-400 tracking-tight"
        : "text-6xl font-extrabold text-rose-500 tracking-tight");
  }

  if (summaryEl) {
    if (isProtected) {
      summaryEl.textContent = "🛡️ USB hoàn toàn an toàn, sạch sẽ, không có dấu vết của mã độc shortcut hay script!";
      summaryEl.className = "text-xs text-emerald-300 mt-2 font-medium";
    } else if (score >= 80) {
      summaryEl.textContent = "✅ Ổ đĩa an toàn, nguy cơ rất thấp. Bạn có thể sử dụng bình thường.";
      summaryEl.className = "text-xs text-emerald-300 mt-2 font-medium";
    } else {
      summaryEl.textContent = "⚠️ Phát hiện mã độc shortcut hoặc script nguy hiểm! Khuyến nghị cài đặt USB An Toàn để xử lý.";
      summaryEl.className = "text-xs text-rose-300/80 mt-2 font-medium";
    }
  }

  if (rankEl) {
    if (score >= 80) {
      rankEl.textContent = isProtected ? "AN TOÀN TUYỆT VỜI 🛡️" : "MỨC ĐỘ AN TOÀN CAO 🛡️";
      rankEl.className = "quiz-badge bg-emerald-500 text-white";
    } else if (score >= 50) {
      rankEl.textContent = "CẢNH BÁO NGUY CƠ ⚠️";
      rankEl.className = "quiz-badge bg-amber-500 text-white";
    } else {
      rankEl.textContent = "CỰC KỲ NGUY HIỂM 🚨";
      rankEl.className = "quiz-badge bg-rose-600 text-white animate-pulse";
    }
  }

  renderThreatsList(listEl, session.threats, isProtected);
}

/**
 * Hiển thị danh sách các tệp tin nguy hiểm hoặc thông báo sạch.
 * @param {HTMLElement} listEl - Phần tử danh sách.
 * @param {Array} threats - Danh sách mối nguy.
 * @param {boolean} isProtected - Cờ báo an toàn.
 */
function renderThreatsList(listEl, threats = [], isProtected = false) {
  if (!listEl) return;
  listEl.innerHTML = "";

  if (!threats || threats.length === 0) {
    listEl.innerHTML = `
      <div class="p-3.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs text-center">
        ✅ Tuyệt vời! Không phát hiện thấy tệp tin độc hại, virus shortcut hay script nào trên USB này.
      </div>
    `;
    return;
  }

  threats.slice(0, 6).forEach((item) => {
    const safeName = escapeHtml(item.fileName || "Tệp tin lạ");
    const itemHtml = `
      <div class="flex items-center justify-between p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs">
        <div class="flex items-center space-x-2 truncate">
          <span class="text-rose-400 font-bold text-sm">✕</span>
          <span class="text-slate-200 font-mono truncate">${safeName}</span>
        </div>
        <span class="text-rose-300 bg-rose-950/70 border border-rose-800/60 px-2 py-0.5 rounded text-[10px] font-bold shrink-0">
          -${item.deductPoints || 5} ĐIỂM
        </span>
      </div>
    `;
    listEl.innerHTML += itemHtml;
  });
}

/**
 * Mở modal Donate VietQR ủng hộ tùy tâm.
 */
export function openDonateModal() {
  const modal = document.getElementById("donate-modal");
  const qrImg = document.getElementById("donate-qr-image");
  const bankText = document.getElementById("donate-bank-text");
  const accountNoText = document.getElementById("donate-account-no");
  const accountNameText = document.getElementById("donate-account-name");
  const memoText = document.getElementById("donate-memo");

  if (qrImg) qrImg.src = generateDonateQrUrl(0, CONFIG.DONATE.DEFAULT_MEMO);
  if (bankText) bankText.textContent = CONFIG.DONATE.BANK_NAME;
  if (accountNoText) accountNoText.textContent = CONFIG.DONATE.ACCOUNT_NO;
  if (accountNameText) accountNameText.textContent = CONFIG.DONATE.ACCOUNT_NAME;
  if (memoText) memoText.textContent = CONFIG.DONATE.DEFAULT_MEMO;

  if (modal) modal.classList.remove("hidden");
}

/**
 * Đóng modal Donate.
 */
export function closeDonateModal() {
  const modal = document.getElementById("donate-modal");
  if (modal) modal.classList.add("hidden");
}

/**
 * Mở modal Điều khoản, Miễn trừ & Nghị định 13/2023/NĐ-CP.
 */
export function openLegalModal() {
  const modal = document.getElementById("legal-modal");
  if (modal) modal.classList.remove("hidden");
}

/**
 * Đóng modal Điều khoản pháp lý.
 */
export function closeLegalModal() {
  const modal = document.getElementById("legal-modal");
  if (modal) modal.classList.add("hidden");
}

/**
 * Hiển thị modal báo lỗi.
 * @param {string} code - Mã lỗi.
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

/**
 * Lọc ký tự HTML để phòng chống XSS.
 * @param {string} str - Chuỗi cần lọc.
 * @returns {string} Chuỗi an toàn.
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
