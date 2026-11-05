/**
 * @file constants.js
 * @module WebUSB/Constants
 * @description Định nghĩa các hằng số hệ thống, máy trạng thái FSM và từ điển mã lỗi.
 * @stateDepends None
 * @security Đảm bảo tính bất biến của trạng thái và mã định danh lỗi.
 */

/**
 * Tập hợp các trạng thái duy nhất của ứng dụng (Finite State Machine).
 * @readonly
 * @enum {string}
 */
export const AppState = Object.freeze({
  IDLE: "IDLE",                         // Chờ kết nối USB
  SCANNING: "SCANNING",                 // Đang quét phân tích cây thư mục
  THREAT_REPORT: "THREAT_REPORT",       // Báo cáo chẩn đoán điểm số & mối nguy hại
  QR_PENDING: "QR_PENDING",             // Đang hiển thị VietQR 20.000đ chờ thanh toán
  COMPLETED: "COMPLETED",               // Hoàn tất kích hoạt và cấp phép
  ERROR: "ERROR",                       // Trạng thái lỗi có mã xử lý
});

/**
 * Bảng từ điển mã lỗi tra cứu chuẩn hóa theo Điều 15 rule.md.
 * @readonly
 * @enum {string}
 */
export const ErrorCodes = Object.freeze({
  ERR_SCAN_001: "ERR_SCAN_001", // Trình duyệt không hỗ trợ File System Access API
  ERR_SCAN_002: "ERR_SCAN_002", // Người dùng hủy chọn ổ đĩa (User aborted)
  ERR_SCAN_003: "ERR_SCAN_003", // USB bị rút ngắt kết nối đột ngột
  ERR_SCAN_004: "ERR_SCAN_004", // Bị từ chối cấp quyền đọc
  ERR_SCAN_005: "ERR_SCAN_005", // Chọn nhầm ổ cứng nội bộ (C:, D:), chỉ cho phép USB ngoài
  ERR_NO_USB: "ERR_NO_USB",     // Chưa phát hiện USB nào được cắm vào máy tính
  ERR_PAY_001: "ERR_PAY_001",   // Hết thời gian chờ thanh toán VietQR
  ERR_PAY_002: "ERR_PAY_002",   // Số tiền chuyển khoản nhỏ hơn 20.000đ
  ERR_PAY_003: "ERR_PAY_003",   // Sai cú pháp nội dung chuyển khoản
  ERR_LIC_001: "ERR_LIC_001",   // Khóa Private Key trên máy chủ bị thiếu
  ERR_LIC_002: "ERR_LIC_002",   // Lỗi sinh chữ ký số RSA-2048
});

/**
 * Phân loại các mối nguy hại phát hiện trên USB.
 * @readonly
 * @enum {string}
 */
export const ThreatCategory = Object.freeze({
  SHORTCUT: "SHORTCUT",             // Virus shortcut .lnk giả mạo
  DANGEROUS_SCRIPT: "SCRIPT",       // Script thực thi nguy hiểm .vbs, .wsf, .js
  HIDDEN_DOCUMENT: "HIDDEN_DOC",    // Thư mục/file Word/Excel bị gán cờ ẩn
  AUTORUN_ABUSE: "AUTORUN",         // File cấu hình autorun.inf độc hại
});

