/**
 * @file guide.js
 * @module WebUSB/Guide
 * @description Quản lý modal Hướng Dẫn Sử Dụng Chi Tiết cho USB An Toàn (BTL86).
 * @author BUI NAM DONG Senior Dev
 * @copyright Copyright © 2026 BUI NAM DONG Senior Dev. All rights reserved.
 * @security Module thuần UI Client-side, không chứa dữ liệu nhạy cảm.
 */

const GUIDE_SECTIONS = {
  PREPARE: `
    <div class="space-y-2.5 text-xs text-slate-300 leading-relaxed">
      <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
        <h5 class="font-bold text-amber-400">1. Sao lưu toàn bộ dữ liệu cũ:</h5>
        <p>Định dạng USB lần đầu sẽ xóa sạch ổ để tái cấu trúc NTFS chuẩn an toàn. Hãy copy dữ liệu ra máy trước.</p>
      </div>
      <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
        <h5 class="font-bold text-indigo-400">2. Quyền Quản trị viên (Run as Administrator):</h5>
        <p>Phần mềm cần quyền Admin trên Windows để thiết lập bảng phân quyền NTFS ACLs và bảo vệ cổng USB.</p>
      </div>
      <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
        <h5 class="font-bold text-rose-400">3. Mật khẩu Vùng Bảo Mật (AES-256):</h5>
        <p>Chuẩn mã hóa AES-256 kết hợp PBKDF2 100,000 vòng không lưu mật khẩu thô. Hãy ghi nhớ kỹ, quên mật khẩu sẽ không thể khôi phục!</p>
      </div>
    </div>
  `,
  FEATURES: `
    <div class="space-y-2 text-xs text-slate-300 leading-relaxed max-h-[50vh] overflow-y-auto pr-1">
      <div class="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800">
        <b class="text-emerald-400">🛡️ 1. Pháo Đài Bất Biến:</b> Thư mục <code>App</code> khóa cứng NTFS nhân Windows, cấm xóa cấm sửa.
      </div>
      <div class="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800">
        <b class="text-indigo-400">⚡ 2. Auto-Heal 50ms:</b> Tự động phát hiện, diệt shortcut rác và phục hồi file ẩn khi vừa cắm USB.
      </div>
      <div class="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800">
        <b class="text-amber-400">🖨️ 3. Chế Độ Đi In An Toàn:</b> Khóa quyền ghi toàn USB 1-click trước khi cắm máy photocopy lạ.
      </div>
      <div class="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800">
        <b class="text-cyan-400">🔒 4. Khóa/Mở Vùng Bảo Mật:</b> Ẩn và mã hóa tài liệu tối mật bằng AES-256 quân sự.
      </div>
      <div class="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800">
        <b class="text-purple-400">⌨️ 5. Bàn Phím Ảo Scrambled PIN:</b> Xáo trộn phím chống keylogger theo dõi mật khẩu.
      </div>
      <div class="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800">
        <b class="text-teal-400">💾 6. Sao Lưu & Bản Quyền Offline:</b> Sao lưu mã hóa và kích hoạt bằng chữ ký số RSA-2048.
      </div>
    </div>
  `,
  FAQ: `
    <div class="space-y-2.5 text-xs text-slate-300 leading-relaxed">
      <div class="p-3 bg-amber-950/40 rounded-xl border border-amber-800/60 space-y-1">
        <h5 class="font-bold text-amber-300">❓ Cắm máy quán photo không thấy file tài liệu?</h5>
        <p class="text-slate-300"><b>Nguyên nhân:</b> Máy in bị nhiễm virus shortcut đã gán cờ <code>+S +H</code> làm ẩn thư mục.</p>
      </div>
      <div class="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/60 space-y-1.5">
        <h5 class="font-bold text-emerald-300">✅ 3 Cách Cấp Cứu Nhanh Trong 1 Giây:</h5>
        <p>• <b>Cách 1:</b> Nhấp đúp vào tệp <code class="text-emerald-400">Cuu_Ho_USB_AnToan.bat</code> ngoài gốc USB.</p>
        <p>• <b>Cách 2:</b> Vào thư mục <code class="text-emerald-400">App</code> chạy phần mềm để tự động hiện lại 100% tài liệu.</p>
        <p>• <b>Cách 3:</b> Bấm thanh địa chỉ File Explorer gõ <code class="text-emerald-400">\Du_Lieu_Chung</code> rồi Enter.</p>
      </div>
    </div>
  `,
};

/**
 * Khởi tạo modal hướng dẫn sử dụng chi tiết.
 */
export function initGuideModal() {
  ensureGuideModalHtml();
  bindGuideEvents();
}

/**
 * Tạo khung DOM cho Guide Modal nếu chưa tồn tại.
 */
function ensureGuideModalHtml() {
  if (document.getElementById("guide-modal")) return;

  const modalHtml = `
    <div id="guide-modal" class="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
      <div class="quiz-card p-6 max-w-lg w-full space-y-4 text-left border-indigo-700/60 max-h-[90vh] flex flex-col">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span class="quiz-badge bg-indigo-900/80 text-indigo-300 border border-indigo-700 text-[10px]">CẨM NANG NGƯỜI DÙNG</span>
            <h3 class="text-lg font-bold text-white">Hướng Dẫn Sử Dụng USB An Toàn</h3>
          </div>
          <button id="btn-close-guide-x" class="text-slate-400 hover:text-white text-lg p-1">✕</button>
        </div>

        <!-- 3 Tab điều hướng -->
        <div class="grid grid-cols-3 gap-1.5 text-center" id="guide-tabs">
          <button class="guide-tab-btn px-2 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white" data-tab="PREPARE">1. Chuẩn Bị</button>
          <button class="guide-tab-btn px-2 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-400 hover:text-white" data-tab="FEATURES">2. Tính Năng</button>
          <button class="guide-tab-btn px-2 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-400 hover:text-white" data-tab="FAQ">3. Quán In FAQ</button>
        </div>

        <!-- Nội dung Tab -->
        <div id="guide-tab-content" class="flex-1 overflow-y-auto">
          ${GUIDE_SECTIONS.PREPARE}
        </div>

        <div class="pt-2 border-t border-slate-800 flex justify-between items-center">
          <span class="text-[10px] text-slate-400">Bản quyền © BUI NAM DONG Senior Dev</span>
          <button id="btn-close-guide" class="quiz-btn quiz-btn-primary px-4 py-2 text-xs">Đã Hiểu & Đóng Lại</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHtml);
}

/**
 * Gắn kết sự kiện chuyển Tab và đóng mở modal hướng dẫn.
 */
function bindGuideEvents() {
  document.getElementById("btn-close-guide")?.addEventListener("click", closeGuideModal);
  document.getElementById("btn-close-guide-x")?.addEventListener("click", closeGuideModal);

  const tabButtons = document.querySelectorAll(".guide-tab-btn");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabKey = btn.getAttribute("data-tab");
      switchTab(tabKey, tabButtons);
    });
  });
}

/**
 * Chuyển đổi nội dung Tab hiển thị.
 * @param {string} tabKey - Khóa Tab (PREPARE, FEATURES, FAQ).
 * @param {NodeList} buttons - Danh sách nút tab.
 */
function switchTab(tabKey, buttons) {
  const contentEl = document.getElementById("guide-tab-content");
  if (contentEl && GUIDE_SECTIONS[tabKey]) {
    contentEl.innerHTML = GUIDE_SECTIONS[tabKey];
  }

  buttons.forEach((btn) => {
    if (btn.getAttribute("data-tab") === tabKey) {
      btn.className = "guide-tab-btn px-2 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white";
    } else {
      btn.className = "guide-tab-btn px-2 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-400 hover:text-white";
    }
  });
}

/**
 * Mở modal Hướng Dẫn Sử Dụng.
 */
export function openGuideModal() {
  const modal = document.getElementById("guide-modal");
  if (modal) modal.classList.remove("hidden");
}

/**
 * Đóng modal Hướng Dẫn Sử Dụng.
 */
export function closeGuideModal() {
  const modal = document.getElementById("guide-modal");
  if (modal) modal.classList.add("hidden");
}
