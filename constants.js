/**
 * @file constants.js
 * @module WebUSB/Constants
 * @description Định nghĩa các hằng số hệ thống, máy trạng thái FSM và danh mục lỗi.
 * @stateDepends None
 * @security Đảm bảo tính bất biến của trạng thái ứng dụng.
 */

/**
 * Các trạng thái chính của ứng dụng (Finite State Machine).
 * @readonly
 * @enum {string}
 */
export const AppState = Object.freeze({
  IDLE: "IDLE",                   // Màn hình chờ bắt đầu quét
  SCANNING: "SCANNING",           // Đang quét phân tích cây thư mục
  THREAT_REPORT: "THREAT_REPORT", // Báo cáo chẩn đoán điểm số & giải pháp
  ERROR: "ERROR",                 // Trạng thái lỗi
});

/**
 * Bảng từ điển mã lỗi tra cứu chuẩn hóa.
 * @readonly
 * @enum {string}
 */
export const ErrorCodes = Object.freeze({
  ERR_SCAN_001: "ERR_SCAN_001", // Trình duyệt không hỗ trợ File System Access API
  ERR_SCAN_002: "ERR_SCAN_002", // Người dùng hủy chọn ổ đĩa (User aborted)
  ERR_SCAN_003: "ERR_SCAN_003", // USB bị ngắt kết nối đột ngột
  ERR_SCAN_004: "ERR_SCAN_004", // Bị từ chối cấp quyền đọc
  ERR_SCAN_005: "ERR_SCAN_005", // Chọn nhầm ổ cứng nội bộ (C:, D:)
  ERR_NO_USB: "ERR_NO_USB",     // Chưa phát hiện USB nào
});

/**
 * Phân loại các mối nguy hại phát hiện trên USB.
 * @readonly
 * @enum {string}
 */
export const ThreatCategory = Object.freeze({
  SHORTCUT: "SHORTCUT",             // Virus shortcut .lnk giả mạo
  DANGEROUS_SCRIPT: "SCRIPT",       // Script thực thi nguy hiểm .vbs, .wsf, .hta
  HIDDEN_DOCUMENT: "HIDDEN_DOC",    // Thư mục/file Word/Excel bị gán cờ ẩn
  AUTORUN_ABUSE: "AUTORUN",         // File autorun.inf độc hại
});
