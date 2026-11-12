/**
 * @file app.js
 * @module WebUSB/App
 * @description Điểm khởi động chính, điều phối sự kiện người dùng - Mô hình Donate Cộng đồng.
 * @author BUI NAM DONG Senior Dev
 * @copyright Copyright © 2026 BUI NAM DONG Senior Dev. All rights reserved.
 * @stateDepends Tất cả trạng thái AppState
 * @security Chạy hoàn toàn Client-side, không lưu trữ hay gửi dữ liệu người dùng.
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
  openDonateModal,
  closeDonateModal,
  openLegalModal,
  closeLegalModal,
} from "./ui.js";
import { initInteractiveSimulation } from "./simulation.js";
import { initGuideModal, openGuideModal } from "./guide.js";

// Khởi chạy khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  console.log(`[WebUSB] Khởi chạy: ${CONFIG.SERVICE.NAME} ${CONFIG.SERVICE.VERSION}`);

  // Đăng ký StateManager lắng nghe thay đổi trạng thái
  appState.subscribe((state, session) => {
    renderAppState(state, session);
  });

  // Gắn sự kiện các nút tương tác
  bindUserActions();

  // Khởi tạo mô phỏng tương tác 4 bước bảo vệ
  initInteractiveSimulation();

  // Khởi tạo cẩm nang hướng dẫn sử dụng chi tiết
  initGuideModal();

  // Khởi tạo trạng thái ban đầu IDLE
  appState.reset();
});

/**
 * Gắn kết các sự kiện nút bấm giao diện.
 */
function bindUserActions() {
  document.getElementById("btn-start-scan")?.addEventListener("click", handleStartScanAsync);
  document.getElementById("btn-mock-scan")?.addEventListener("click", handleMockScanAsync);
  document.getElementById("btn-header-donate")?.addEventListener("click", openDonateModal);
  document.getElementById("btn-header-guide")?.addEventListener("click", openGuideModal);
  document.getElementById("btn-idle-guide")?.addEventListener("click", openGuideModal);
  document.getElementById("btn-open-guide")?.addEventListener("click", openGuideModal);
  document.getElementById("btn-report-donate")?.addEventListener("click", openDonateModal);
  document.getElementById("btn-close-donate")?.addEventListener("click", closeDonateModal);
  document.getElementById("btn-floating-qr")?.addEventListener("click", openDonateModal);
  document.getElementById("btn-open-legal")?.addEventListener("click", openLegalModal);
  document.getElementById("btn-close-legal")?.addEventListener("click", closeLegalModal);
  document.getElementById("btn-rescan")?.addEventListener("click", () => appState.reset());

  document.getElementById("btn-close-error")?.addEventListener("click", () => {
    document.getElementById("error-modal")?.classList.add("hidden");
    appState.reset();
  });

  // Sao chép số tài khoản & nội dung donate
  const bindCopy = (btnId, textId) => {
    document.getElementById(btnId)?.addEventListener("click", (e) => {
      const text = document.getElementById(textId)?.textContent?.trim() || "";
      if (text && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        const btn = e.currentTarget;
        const originalText = btn.textContent;
        btn.textContent = "✓ Đã chép";
        setTimeout(() => { btn.textContent = originalText; }, 1200);
      }
    });
  };

  bindCopy("btn-copy-acc", "donate-account-no");
  bindCopy("btn-copy-memo", "donate-memo");
}

/**
 * Xử lý luồng quét tệp tin trên USB phía máy khách qua File System Access API.
 */
async function handleStartScanAsync() {
  if (appState.getState() !== AppState.IDLE) return;

  if (!isFileSystemSupported()) {
    appState.transition(AppState.ERROR, {
      errorCode: ErrorCodes.ERR_SCAN_001,
      errorMessage: "Trình duyệt không hỗ trợ File System Access API. Vui lòng mở website trên máy tính bằng Google Chrome, Microsoft Edge hoặc Cốc Cốc.",
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
      usbHandle: dirHandle,
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
 * Xử lý quét giả lập (Mock Scan) để test giao diện và trải nghiệm.
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
