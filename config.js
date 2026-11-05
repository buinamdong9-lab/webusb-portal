/**
 * @file config.js
 * @module WebUSB/Config
 * @description Cấu hình môi trường, tham số định giá 20k và chế độ giả lập Dev.
 * @stateDepends None
 * @security Chứa cấu hình public client, tuyệt đối không lưu API Private Key tại đây.
 */

export const CONFIG = {
  // Bật DEV_MODE để test nhanh giao diện bằng dữ liệu giả lập (không cần cắm USB thật)
  DEV_MODE: false,

  // Thông số dịch vụ USB An Toàn
  SERVICE: {
    NAME: "Cổng An Toàn USB Trực Tuyến",
    VERSION: "2.6.0-WebOnline",
    PRICE_VND: 20000,
    PRICE_LABEL: "20.000 VNĐ (20 cành)",
    SCAN_MAX_DEPTH: 8,
    UI_THROTTLE_MS: 100,
    BATCH_FILE_THRESHOLD: 40,
  },

  // Cấu hình thanh toán VietQR động (Dữ liệu công khai phục vụ vẽ mã VietQR trên trình duyệt;
  // Phía backend độc lập đối soát qua biến môi trường BANK_ACCOUNT_NUMBER để chống giả mạo - BUG-R11)
  PAYMENT: {
    BANK_ID: "MB",
    BANK_NAME: "MB Bank (Quân Đội)",
    ACCOUNT_NO: "0779356619",
    ACCOUNT_NAME: "BUI NAM DONG",
    CURRENCY: "VND",
    TIMEOUT_SECONDS: 900, // 15 phút đếm ngược
    POLL_INTERVAL_MS: 2500,
  },

  // Dữ liệu mô phỏng khi chạy thử nghiệm (Mock Data)
  MOCK_DATA: {
    DRIVE_NAME: "KINGSTON_16GB (F:)",
    TOTAL_FILES: 1845,
    SHORTCUTS_FOUND: 14,
    SCRIPTS_FOUND: 2,
    HIDDEN_FOLDERS: 5,
    INITIAL_SCORE: 32,
  },
};

