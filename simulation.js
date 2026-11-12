/**
 * @file simulation.js
 * @module WebUSB/Simulation
 * @description Mô phỏng tương tác 4 bước bảo vệ của USB An Toàn BTL86.
 * @author BUI NAM DONG Senior Dev
 * @copyright Copyright © 2026 BUI NAM DONG Senior Dev. All rights reserved.
 * @security Chạy thuần túy Client-side trong DOM, không can thiệp hệ thống máy khách.
 */

/** Danh mục 4 bước mô phỏng tiến trình bảo vệ */
export const SIMULATION_STEPS = [
  {
    step: 1,
    badge: "BƯỚC 1: NGUY HIỂM XÂM NHẬP 🚨",
    badgeClass: "bg-rose-950 text-rose-300 border border-rose-800",
    title: "Cắm USB Vào Máy Lạ / Tiệm Photocopy",
    desc: "Mã độc shortcut (.lnk, .vbs, .wsf) âm thầm sao chép và tìm cách thả tệp lạ vào thư mục gốc USB.",
    tech: "Virus quét ổ đĩa ngoại vi và cố gắng thực thi lệnh PowerShell/CMD ẩn.",
    log: "[CẢNH BÁO] Phát hiện mã độc cố ghi đè: X:\\Tai_Lieu.docx.lnk",
    logColor: "text-rose-400",
    visualIcon: "🔌",
    actionText: "Mã độc đang tấn công...",
  },
  {
    step: 2,
    badge: "BƯỚC 2: PHÁO ĐÀI PHÒNG THỦ 🏰",
    badgeClass: "bg-indigo-950 text-indigo-300 border border-indigo-800",
    title: "Pháo Đài 3 Lớp BTL86 Khóa Chặn",
    desc: "Thư mục gốc X:\\ đóng băng quyền Read-Only. Virus bị từ chối truy cập (Access Denied) hoàn toàn.",
    tech: "Phân quyền NTFS ACL chặn tạo file mới, bảo vệ tuyệt đối vùng gốc và thư mục App\\.",
    log: "[NTFS ACL] Quyền ghi bị từ chối 0x80070005! Mã độc bị cô lập 100%.",
    logColor: "text-indigo-400",
    visualIcon: "🛡️",
    actionText: "Đóng băng gốc Read-Only!",
  },
  {
    step: 3,
    badge: "BƯỚC 3: AUTO-HEAL 50MS ⚡",
    badgeClass: "bg-amber-950 text-amber-300 border border-amber-800",
    title: "Tự Động Phục Hồi File Ẩn Trong 50ms",
    desc: "Tự động gỡ thuộc tính ẩn (+H +S) và bóc gỡ ký tự tàng hình Alt+0160/Zero-width cứu dữ liệu.",
    tech: "Khôi phục tài liệu Word, Excel, PDF về nguyên trạng chỉ với 1 cú click hoặc cắm USB.",
    log: "[AUTO-HEAL] Gỡ thuộc tính +H +S thành công! 15 tài liệu đã hiển thị lại.",
    logColor: "text-amber-400",
    visualIcon: "⚡",
    actionText: "Khôi phục dữ liệu siêu tốc!",
  },
  {
    step: 4,
    badge: "BƯỚC 4: AN TOÀN TUYỆT ĐỐI 🖨️",
    badgeClass: "bg-emerald-950 text-emerald-300 border border-emerald-800",
    title: "Chế Độ In Ấn An Toàn & Rút USB",
    desc: "Khóa tạm thời khoang dữ liệu thành Read-Only khi in. Máy in không thể lây nhiễm chéo ngược vào USB.",
    tech: "Bật/Tắt chế độ In ấn an toàn 1-click. Rút USB ra bảo toàn 100% dữ liệu sạch.",
    log: "[IN ẤN AN TOÀN] Khóa ghi kích hoạt! Thoải mái in ấn không lo virus.",
    logColor: "text-emerald-400",
    visualIcon: "✅",
    actionText: "Bảo vệ toàn diện 100%!",
  },
];

let currentStepIndex = 0;
let autoPlayTimer = null;

/**
 * Khởi tạo mô phỏng tương tác 4 bước.
 */
export function initInteractiveSimulation() {
  const container = document.getElementById("simulation-container");
  if (!container) return;

  renderStep(0);
  bindSimulationControls();
}

/**
 * Gắn kết sự kiện chuyển bước và tự động chạy mô phỏng.
 */
function bindSimulationControls() {
  const stepButtons = document.querySelectorAll(".sim-step-btn");
  stepButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const stepIdx = parseInt(btn.getAttribute("data-step"), 10) - 1;
      stopAutoPlay();
      renderStep(stepIdx);
    });
  });

  const btnAutoPlay = document.getElementById("btn-sim-autoplay");
  if (btnAutoPlay) {
    btnAutoPlay.addEventListener("click", toggleAutoPlay);
  }

  const btnNext = document.getElementById("btn-sim-next");
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      stopAutoPlay();
      const nextIdx = (currentStepIndex + 1) % SIMULATION_STEPS.length;
      renderStep(nextIdx);
    });
  }
}

/**
 * Bật / tắt chế độ tự động chạy hoạt ảnh mô phỏng.
 */
function toggleAutoPlay() {
  if (autoPlayTimer) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
}

/**
 * Bắt đầu tự động chuyển bước.
 */
function startAutoPlay() {
  const btn = document.getElementById("btn-sim-autoplay");
  if (btn) btn.innerHTML = "<span>⏸️ Tạm Dừng</span>";

  autoPlayTimer = setInterval(() => {
    const nextIdx = (currentStepIndex + 1) % SIMULATION_STEPS.length;
    renderStep(nextIdx);
  }, 2800);
}

/**
 * Dừng tự động chuyển bước.
 */
function stopAutoPlay() {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
    const btn = document.getElementById("btn-sim-autoplay");
    if (btn) btn.innerHTML = "<span>▶️ Chạy Tự Động</span>";
  }
}

/**
 * Render chi tiết bước mô phỏng lên giao diện.
 * @param {number} index - Chỉ mục bước (0-3).
 */
export function renderStep(index) {
  currentStepIndex = index;
  const data = SIMULATION_STEPS[index];
  if (!data) return;

  updateStepIndicators(index);

  const badgeEl = document.getElementById("sim-badge");
  const titleEl = document.getElementById("sim-title");
  const descEl = document.getElementById("sim-desc");
  const techEl = document.getElementById("sim-tech");
  const logEl = document.getElementById("sim-log");
  const iconEl = document.getElementById("sim-icon");
  const actionEl = document.getElementById("sim-action-text");

  if (badgeEl) {
    badgeEl.textContent = data.badge;
    badgeEl.className = `quiz-badge text-[11px] font-bold ${data.badgeClass}`;
  }
  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
  if (techEl) techEl.textContent = data.tech;
  if (logEl) {
    logEl.textContent = data.log;
    logEl.className = `font-mono text-[11px] truncate ${data.logColor}`;
  }
  if (iconEl) iconEl.textContent = data.visualIcon;
  if (actionEl) actionEl.textContent = data.actionText;
}

/**
 * Cập nhật giao diện thanh bước mô phỏng (Tabs / Pills).
 * @param {number} activeIndex - Chỉ mục đang kích hoạt.
 */
function updateStepIndicators(activeIndex) {
  const buttons = document.querySelectorAll(".sim-step-btn");
  buttons.forEach((btn, idx) => {
    if (idx === activeIndex) {
      btn.className = "sim-step-btn px-2.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-md border border-indigo-400";
    } else {
      btn.className = "sim-step-btn px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-slate-700";
    }
  });
}
