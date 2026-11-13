/**
 * @file config.js
 * @module WebUSB/Config
 * @description Cấu hình dự án WebUSB - Mô hình Donate Cộng đồng Miễn phí 100%.
 * @author BUI NAM DONG Senior Dev
 * @copyright Copyright © 2026 BUI NAM DONG Senior Dev. All rights reserved.
 * @security Dữ liệu cấu hình công khai client, không phụ thuộc backend.
 */

export const CONFIG = {
  DEV_MODE: false,

  METADATA: {
    AUTHOR: "BUI NAM DONG Senior Dev",
    COPYRIGHT: "Copyright © 2026 BUI NAM DONG Senior Dev. All rights reserved.",
    LICENSE: "Community Free Edition (Không Giới Hạn Tính Năng)",
    COMPLIANCE: "Luật An toàn thông tin mạng & Nghị định 13/2023/NĐ-CP",
  },

  SERVICE: {
    NAME: "Cổng An Toàn USB Trực Tuyến",
    VERSION: "3.2.0-Community",
    DOWNLOAD_URL: "https://github.com/buinamdong9-lab/webusb-portal/releases/download/v2.5/USB_AnToan_v2.5.exe",
    SCAN_MAX_DEPTH: 8,
    UI_THROTTLE_MS: 100,
  },

  DONATE: {
    BANK_ID: "MB",
    BANK_NAME: "MB Bank (Quân Đội)",
    ACCOUNT_NO: "0779356619",
    ACCOUNT_NAME: "BUI NAM DONG",
    DEFAULT_MEMO: "DONATE USB AN TOAN",
    MESSAGE: "Tùy tâm ủng hộ cốc cà phê cho tác giả phát triển dự án ❤️",
  },

  MOCK_DATA: {
    DRIVE_NAME: "KINGSTON_16GB (F:)",
    TOTAL_FILES: 1845,
    INITIAL_SCORE: 32,
  },
};
