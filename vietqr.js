/**
 * @file vietqr.js
 * @module WebUSB/VietQR
 * @description Sinh URL mã VietQR ủng hộ / donate tùy tâm (MB Bank - 0779356619 - BUI NAM DONG).
 * @stateDepends None
 * @security Chạy 100% Client-side, không phụ thuộc backend, không lưu trữ thông tin nhạy cảm.
 */

import { CONFIG } from "./config.js";

/**
 * Sinh đường dẫn ảnh mã VietQR Napas 24/7 để người dùng quét ủng hộ tùy tâm.
 * @param {number} [amount=0] - Số tiền ủng hộ (0 là tùy tâm khách nhập trên app ngân hàng).
 * @param {string} [memo] - Nội dung chuyển khoản.
 * @returns {string} URL ảnh VietQR chuẩn Napas.
 */
export function generateDonateQrUrl(amount = 0, memo = CONFIG.DONATE.DEFAULT_MEMO) {
  const bank = CONFIG.DONATE.BANK_ID;
  const account = CONFIG.DONATE.ACCOUNT_NO;
  const accountName = encodeURIComponent(CONFIG.DONATE.ACCOUNT_NAME);
  const safeMemo = encodeURIComponent(memo || CONFIG.DONATE.DEFAULT_MEMO);
  const amountParam = amount > 0 ? `&amount=${amount}` : "";

  return (
    `https://img.vietqr.io/image/${bank}-${account}-compact2.png` +
    `?addInfo=${safeMemo}&accountName=${accountName}${amountParam}`
  );
}
