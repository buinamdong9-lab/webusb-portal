/**
 * @file scanner.js
 * @module WebUSB/Scanner
 * @description Quét phân tích cây thư mục USB, phát hiện virus shortcut và tính điểm an toàn.
 * @stateDepends APP_STATE_IDLE -> APP_STATE_SCANNING -> APP_STATE_THREAT_REPORT
 * @security Chế độ đọc 100% (Read-Only), tuyệt đối không upload dữ liệu người dùng.
 */

import { ErrorCodes, ThreatCategory } from "./constants.js";
import { CONFIG } from "./config.js";

const OS_WHITELIST = new Set([
  "system volume information", "$recycle.bin", "recovery", "$sysreset", "config.msi"
]);

const SAFE_USB_LEGITIMATE = new Set([
  "app", "du_lieu_chung", "vung_bao_mat", ".sec_v2_header",
  ".sec_license", ".sec_lic_backup", "cuu_ho_usb_antoan.bat", "attt.ico"
]);

export function isFileSystemSupported() {
  return typeof window !== "undefined" && "showDirectoryPicker" in window;
}

export async function pickUsbDirectoryHandleAsync(detectedUsbDrives = []) {
  if (!isFileSystemSupported()) {
    const error = new Error("Trình duyệt không hỗ trợ File System Access API");
    error.code = ErrorCodes.ERR_SCAN_001;
    throw error;
  }

  try {
    const dirHandle = await window.showDirectoryPicker({
      id: "usb_removable_selector",
      mode: "read",
    });

    const customDisplayName = await validateIsUsbOnlyAsync(dirHandle, detectedUsbDrives);
    dirHandle.customDisplayName = customDisplayName;
    return dirHandle;
  } catch (err) {
    if (err.name === "AbortError") {
      const abortError = new Error("Người dùng đã hủy chọn ổ đĩa");
      abortError.code = ErrorCodes.ERR_SCAN_002;
      throw abortError;
    }
    if (err.code === ErrorCodes.ERR_SCAN_005) throw err;
    const accessError = new Error("Không thể truy cập ổ đĩa: " + err.message);
    accessError.code = ErrorCodes.ERR_SCAN_004;
    throw accessError;
  }
}

async function validateIsUsbOnlyAsync(dirHandle, detectedUsbDrives = []) {
  const rawName = (dirHandle.name || "").trim();
  const nameUpper = rawName.toUpperCase();

  const forbidden = [
    "C:", "D:", "(C:)", "(D:)", "LOCAL DISK", "Ổ ĐĨA C", "Ổ ĐĨA D", "Ổ C", "Ổ D",
    "WINDOWS", "PROGRAM FILES", "DOWNLOADS", "DESKTOP", "DOCUMENTS", "SYSTEM32"
  ];

  // Kiểm tra vô điều kiện - Chặn đứng cả ổ đĩa gốc nội bộ và các thư mục hệ thống
  for (const kw of forbidden) {
    if (nameUpper === kw || nameUpper.includes(kw) || nameUpper === "C" || nameUpper === "D") {
      const err = new Error(
        `Phát hiện bạn vừa chọn thư mục/ổ đĩa cứng nội bộ (${rawName}). ` +
        `Hệ thống CHỈ quét thiết bị USB ngoài để đảm bảo an toàn!`
      );
      err.code = ErrorCodes.ERR_SCAN_005;
      throw err;
    }
  }

  const isDriveRoot = nameUpper === "\\" || nameUpper === "/" || nameUpper === "";
  if (isDriveRoot && Array.isArray(detectedUsbDrives) && detectedUsbDrives.length > 0) {
    const primary = detectedUsbDrives[0];
    return primary.label ? `${primary.label} (${primary.name})` : `USB (${primary.name})`;
  }

  return rawName || "Ổ đĩa USB";
}

export async function scanDirectoryForThreatsAsync(dirHandle, onProgress, currentDepth = 0, stateRef = { totalFiles: 0 }) {
  if (currentDepth > CONFIG.SERVICE.SCAN_MAX_DEPTH) return { threats: [], totalFiles: stateRef.totalFiles };

  const threats = [];
  let lastThrottle = Date.now();

  try {
    for await (const entry of dirHandle.values()) {
      const lower = entry.name.toLowerCase();
      if (OS_WHITELIST.has(lower) || SAFE_USB_LEGITIMATE.has(lower)) continue;

      stateRef.totalFiles++;
      const now = Date.now();
      if (now - lastThrottle >= CONFIG.SERVICE.UI_THROTTLE_MS) {
        lastThrottle = now;
        if (typeof onProgress === "function") onProgress(stateRef.totalFiles, entry.name);
      }

      if (entry.kind === "file") {
        const threat = await analyzeFileEntryAsync(entry);
        if (threat) threats.push(threat);
      } else if (entry.kind === "directory") {
        const subHandle = await dirHandle.getDirectoryHandle(entry.name);
        const subResult = await scanDirectoryForThreatsAsync(subHandle, onProgress, currentDepth + 1, stateRef);
        threats.push(...subResult.threats);
      }
    }
  } catch (err) {
    console.warn("[Scanner] Cảnh báo đọc phân vùng:", err.message);
  }

  return { threats, totalFiles: stateRef.totalFiles };
}

async function analyzeFileEntryAsync(fileHandle) {
  const fileName = fileHandle.name;
  const lowerName = fileName.toLowerCase();

  if (lowerName.endsWith(".lnk")) {
    return {
      fileName,
      category: ThreatCategory.SHORTCUT,
      severity: "HIGH",
      deductPoints: 5,
      description: "Virus shortcut giả mạo chiếm dụng tài liệu gốc",
    };
  }

  // BUG-19: Chỉ chặn các script thực thi trực tiếp trên Windows (.vbs, .wsf, .hta), không chặn nhầm file .js của lập trình viên
  if (lowerName.endsWith(".vbs") || lowerName.endsWith(".wsf") || lowerName.endsWith(".hta")) {
    return {
      fileName,
      category: ThreatCategory.DANGEROUS_SCRIPT,
      severity: "CRITICAL",
      deductPoints: 15,
      description: "Mã độc thực thi tự động Windows Script Host (.vbs/.wsf/.hta)",
    };
  }

  if (lowerName === "autorun.inf") {
    try {
      const file = await fileHandle.getFile();
      const text = (await file.text()).toLowerCase();
      if (text.includes("open=") || text.includes("shellexecute=")) {
        return {
          fileName,
          category: ThreatCategory.AUTORUN_ABUSE,
          severity: "CRITICAL",
          deductPoints: 20,
          description: "Tệp autorun chứa lệnh thực thi mã độc tự động",
        };
      }
      return null;
    } catch {
      return null;
    }
  }

  return null;
}

export function calculateQuizSafetyScore(threats, isProtected = false) {
  if (isProtected && (!threats || threats.length === 0)) {
    return 100;
  }
  let score = 100;
  for (const item of (threats || [])) {
    score -= (item.deductPoints || 5);
  }
  return Math.max(0, Math.min(100, score));
}

export async function runMockScanAsync(onProgress) {
  const mockFiles = [
    "Tai_Lieu_Hop_Dong.docx.lnk",
    "Du_Lieu_Ke_Hoach.xlsx.lnk",
    "autorun.vbs",
    "Bao_Cao_Tai_Chinh.pdf.lnk",
  ];

  for (let i = 1; i <= 40; i++) {
    await new Promise((r) => setTimeout(r, 30));
    if (typeof onProgress === "function") {
      onProgress(i * 3, mockFiles[i % mockFiles.length]);
    }
  }

  const mockThreats = [
    { fileName: "Tai_Lieu_Hop_Dong.docx.lnk", category: "SHORTCUT", deductPoints: 5 },
    { fileName: "autorun.vbs", category: "DANGEROUS_SCRIPT", deductPoints: 15 }
  ];

  return {
    driveName: CONFIG.MOCK_DATA.DRIVE_NAME,
    totalFiles: 120,
    threats: mockThreats,
    safetyScore: 80,
    usbSerial: "MOCK-DEMO-PREVIEW",
  };
}
