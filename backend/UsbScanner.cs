// ============================================================================
// @file UsbScanner.cs
// @module WebUsbBackend/UsbScanner
// @description Bộ máy chẩn đoán an toàn USB thông minh, phân tích mã độc và nhận diện cấu trúc bảo vệ an toàn.
// @stateDepends None
// @security Kiểm tra toàn diện phần cứng USB, chống nhận diện nhầm thư mục hệ thống Windows.
// ============================================================================

using System.Text.RegularExpressions;

namespace WebUsbBackend;

public class ThreatItem
{
    public string FileName { get; set; } = "";
    public string Category { get; set; } = "";
    public string Severity { get; set; } = "MEDIUM";
    public int DeductPoints { get; set; } = 5;
    public string Description { get; set; } = "";
}

public class UsbScanResult
{
    public bool Success { get; set; }
    public string DriveName { get; set; } = "";
    public string DriveLetter { get; set; } = "";
    public int TotalFiles { get; set; }
    public List<ThreatItem> Threats { get; set; } = new();
    public int SafetyScore { get; set; } = 100;
    public string UsbSerial { get; set; } = "";
    public bool IsProtected { get; set; }
    public string ProtectionStatus { get; set; } = "";
    public string? Error { get; set; }
}

public static class UsbScanner
{
    private static readonly HashSet<string> OsWhitelist = new(StringComparer.OrdinalIgnoreCase)
    {
        "System Volume Information",
        "$RECYCLE.BIN",
        "Recovery",
        "$SysReset",
        "Config.Msi"
    };

    private static readonly HashSet<string> SafeUsbLegitimateFiles = new(StringComparer.OrdinalIgnoreCase)
    {
        "App",
        "Du_Lieu_Chung",
        "Vung_Bao_Mat",
        ".sec_v2_header",
        ".sec_license",
        ".sec_lic_backup",
        "Cuu_Ho_USB_AnToan.bat",
        "ATTT.ico"
    };

    public static UsbScanResult ScanDrive(DriveInfo drive)
    {
        var result = new UsbScanResult
        {
            DriveLetter = drive.Name.TrimEnd('\\'),
            DriveName = $"{drive.VolumeLabel} ({drive.Name.TrimEnd('\\')})"
        };

        try
        {
            var rootDir = new DirectoryInfo(drive.RootDirectory.FullName);
            bool isProtected = CheckSafeUsbSignatures(rootDir, out string serial);
            result.IsProtected = isProtected;
            result.UsbSerial = !string.IsNullOrEmpty(serial) ? serial : ResolveDefaultSerial(drive);

            int fileCount = 0;
            ScanFolderRecursive(rootDir, result.Threats, ref fileCount, isProtected, maxDepth: 6, currentDepth: 0);
            result.TotalFiles = fileCount;

            CalculateScore(result);
            result.Success = true;
            result.ProtectionStatus = isProtected ? "Đã kích hoạt Ironclad Fortress" : "Chưa kích hoạt bảo vệ an toàn";
        }
        catch (Exception ex)
        {
            result.Success = false;
            result.Error = ex.Message;
        }

        return result;
    }

    private static bool CheckSafeUsbSignatures(DirectoryInfo rootDir, out string serial)
    {
        serial = "";
        int markerScore = 0;

        try
        {
            string secHeaderPath = Path.Combine(rootDir.FullName, ".sec_v2_header");
            if (File.Exists(secHeaderPath))
            {
                markerScore += 2;
                ExtractSerialFromHeader(secHeaderPath, ref serial);
            }

            if (File.Exists(Path.Combine(rootDir.FullName, ".sec_license")) ||
                File.Exists(Path.Combine(rootDir.FullName, ".sec_lic_backup")))
            {
                markerScore += 2;
            }

            string appDir = Path.Combine(rootDir.FullName, "App");
            if (Directory.Exists(appDir))
            {
                markerScore += 1;
                if (Directory.EnumerateFiles(appDir, "USB_AnToan*.exe").Any())
                {
                    markerScore += 2;
                }
            }

            if (Directory.Exists(Path.Combine(rootDir.FullName, "Vung_Bao_Mat"))) markerScore += 1;
            if (Directory.Exists(Path.Combine(rootDir.FullName, "Du_Lieu_Chung"))) markerScore += 1;
            if (File.Exists(Path.Combine(rootDir.FullName, "Cuu_Ho_USB_AnToan.bat"))) markerScore += 1;
        }
        catch { }

        return markerScore >= 2;
    }

    private static void ExtractSerialFromHeader(string path, ref string serial)
    {
        try
        {
            string content = File.ReadAllText(path);
            var match = Regex.Match(content, @"SERIAL:([A-Za-z0-9_-]+)");
            if (match.Success)
            {
                serial = match.Groups[1].Value.Trim().ToUpper();
            }
        }
        catch { }
    }

    private static string ResolveDefaultSerial(DriveInfo drive)
    {
        string label = drive.VolumeLabel;
        if (!string.IsNullOrWhiteSpace(label)) return label.Replace(" ", "_").ToUpper();
        return drive.Name.Replace(":", "").Replace("\\", "") + "_SAFEUSB";
    }

    private static void ScanFolderRecursive(DirectoryInfo dir, List<ThreatItem> threats, ref int fileCount, bool isProtected, int maxDepth, int currentDepth)
    {
        if (currentDepth > maxDepth || OsWhitelist.Contains(dir.Name)) return;

        try
        {
            InspectDirectoryAttributes(dir, threats, isProtected, currentDepth);

            foreach (var file in dir.EnumerateFiles())
            {
                fileCount++;
                InspectFileEntry(file, threats, isProtected);
            }

            foreach (var subDir in dir.EnumerateDirectories())
            {
                ScanFolderRecursive(subDir, threats, ref fileCount, isProtected, maxDepth, currentDepth + 1);
            }
        }
        catch { }
    }

    private static void InspectDirectoryAttributes(DirectoryInfo dir, List<ThreatItem> threats, bool isProtected, int currentDepth)
    {
        if (currentDepth == 0) return;

        // Bỏ qua thư mục hợp lệ (Vung_Bao_Mat được thiết kế để ẩn bảo vệ)
        if (isProtected && SafeUsbLegitimateFiles.Contains(dir.Name)) return;

        bool isHidden = dir.Attributes.HasFlag(FileAttributes.Hidden) || dir.Attributes.HasFlag(FileAttributes.System);
        if (isHidden)
        {
            threats.Add(new ThreatItem
            {
                FileName = dir.Name,
                Category = "HIDDEN_DOC",
                Severity = "HIGH",
                DeductPoints = 10,
                Description = "Thư mục bị virus gán cờ Ẩn hệ thống (+H +S)"
            });
        }
    }

    private static void InspectFileEntry(FileInfo file, List<ThreatItem> threats, bool isProtected)
    {
        string name = file.Name;
        string ext = file.Extension.ToLower();

        // Bỏ qua các tệp thành phần hợp lệ
        if (isProtected && SafeUsbLegitimateFiles.Contains(name)) return;

        if (name.Equals("autorun.inf", StringComparison.OrdinalIgnoreCase))
        {
            var threat = AnalyzeAutorunFile(file);
            if (threat != null) threats.Add(threat);
            return;
        }

        if (ext == ".lnk")
        {
            threats.Add(new ThreatItem
            {
                FileName = name,
                Category = "SHORTCUT",
                Severity = "HIGH",
                DeductPoints = 5,
                Description = "Virus shortcut giả mạo tài liệu gốc"
            });
        }
        else if (ext == ".vbs" || ext == ".wsf" || ext == ".js")
        {
            threats.Add(new ThreatItem
            {
                FileName = name,
                Category = "SCRIPT",
                Severity = "CRITICAL",
                DeductPoints = 15,
                Description = "Script độc hại thực thi tự động"
            });
        }
    }

    private static ThreatItem? AnalyzeAutorunFile(FileInfo file)
    {
        try
        {
            string[] lines = File.ReadAllLines(file.FullName);
            bool hasMaliciousHook = false;

            foreach (var line in lines)
            {
                string trimmed = line.Trim();
                if (trimmed.StartsWith("open=", StringComparison.OrdinalIgnoreCase) ||
                    trimmed.StartsWith("shellexecute=", StringComparison.OrdinalIgnoreCase))
                {
                    string target = trimmed.Substring(trimmed.IndexOf('=') + 1).Trim().ToLower();
                    if (target.EndsWith(".exe") || target.EndsWith(".vbs") ||
                        target.EndsWith(".bat") || target.EndsWith(".cmd") ||
                        target.EndsWith(".wsf") || target.EndsWith(".js"))
                    {
                        hasMaliciousHook = true;
                        break;
                    }
                }
            }

            if (hasMaliciousHook)
            {
                return new ThreatItem
                {
                    FileName = file.Name,
                    Category = "AUTORUN",
                    Severity = "CRITICAL",
                    DeductPoints = 20,
                    Description = "Tệp autorun chứa lệnh thực thi mã độc tự động"
                };
            }
        }
        catch { }

        // Tệp autorun chỉ chứa icon/label là hoàn toàn vô hại
        return null;
    }

    private static void CalculateScore(UsbScanResult result)
    {
        int score = 100;
        foreach (var item in result.Threats)
        {
            score -= item.DeductPoints;
        }

        // Nếu là USB đã bảo vệ và không có mối nguy độc hại thực sự nào
        if (result.IsProtected && result.Threats.Count == 0)
        {
            score = 100;
        }

        result.SafetyScore = Math.Max(0, Math.Min(100, score));
    }
}

