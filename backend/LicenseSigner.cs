// ============================================================================
// @file LicenseSigner.cs
// @module WebUsbBackend/LicenseSigner
// @description Engine ký số bản quyền RSA-2048 bất đối xứng chuẩn BTL86 từ Server.
// @stateDepends None
// @security Khóa bí mật chỉ được nạp trong bộ nhớ server, cấm trả ra client.
// ============================================================================

using System.Security.Cryptography;
using System.Text;

namespace WebUsbBackend
{
    public class LicenseSigner
    {
        private readonly string _privateKeyXml;

        public LicenseSigner(IConfiguration config)
        {
            _privateKeyXml = LoadPrivateKey(config);
        }

        /// <summary>
        /// Tìm và đọc khóa riêng tư RSA-2048 từ file hệ thống
        /// </summary>
        private static string LoadPrivateKey(IConfiguration config)
        {
            // 1. Nạp trực tiếp từ Secret Store / Biến môi trường (Không cần lưu file trên đĩa)
            string? envXml = Environment.GetEnvironmentVariable("RSA_PRIVATE_KEY_XML");
            if (!string.IsNullOrWhiteSpace(envXml))
            {
                return envXml.Trim();
            }

            // 2. Nạp từ đường dẫn chỉ định ngoài thư mục publish qua biến môi trường hoặc cấu hình
            string configuredPath = Environment.GetEnvironmentVariable("RSA_PRIVATE_KEY_PATH") 
                ?? config["WebUsbSettings:RsaPrivateKeyPath"] 
                ?? "rsa_private.xml";
            
            // Tìm kiếm đường dẫn linh hoạt (thư mục bí mật ngoài publish, thư mục hiện tại, cha)
            string[] searchPaths = new[]
            {
                configuredPath,
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "USB_AnToan", "keys", "rsa_private.xml"),
                Path.Combine(AppContext.BaseDirectory, configuredPath),
                Path.Combine(Directory.GetCurrentDirectory(), configuredPath),
                Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "rsa_private.xml"),
                Path.Combine(Directory.GetCurrentDirectory(), "..", "rsa_private.xml"),
            };

            foreach (var path in searchPaths)
            {
                if (File.Exists(path))
                {
                    return File.ReadAllText(path).Trim();
                }
            }

            throw new FileNotFoundException("Không tìm thấy tệp khóa bí mật RSA-2048! Vui lòng cấu hình RSA_PRIVATE_KEY_PATH hoặc RSA_PRIVATE_KEY_XML.");
        }

        /// <summary>
        /// Tạo Mã Đăng Ký từ Serial USB (Khớp 100% thuật toán của LicenseManager.cs)
        /// </summary>
        public string GenerateRegistrationCode(string usbSerial)
        {
            string cleanSerial = string.IsNullOrWhiteSpace(usbSerial)
                ? "GENERIC-USB-86"
                : usbSerial.Trim().ToUpper();

            using var sha = SHA256.Create();
            byte[] hash = sha.ComputeHash(
                Encoding.UTF8.GetBytes(cleanSerial + "|DEVICE_REQ_SALT_2026"));
            string checksum = BitConverter.ToString(hash)
                .Replace("-", "").Substring(0, 4);

            return $"REQ-8686-{cleanSerial}-{checksum}";
        }

        /// <summary>
        /// Ký số mã đăng ký bằng Private Key RSA-2048 để sinh License Key
        /// </summary>
        public string SignRegistrationCode(string registrationCode)
        {
            using var rsa = RSA.Create();
            rsa.FromXmlString(_privateKeyXml);

            byte[] dataBytes = Encoding.UTF8.GetBytes(registrationCode.Trim().ToUpper());
            byte[] signatureBytes = rsa.SignData(
                dataBytes,
                HashAlgorithmName.SHA256,
                RSASignaturePadding.Pkcs1);

            return "LIC-8686-" + Convert.ToBase64String(signatureBytes);
        }

        /// <summary>
        /// Đóng gói nội dung tệp .sec_license hoàn chỉnh để ghi vào USB
        /// </summary>
        public string GenerateLicenseFilePayload(string registrationCode, string licenseKey)
        {
            return $"{registrationCode}|{licenseKey}|ACTIVATED:{DateTime.Now:yyyy-MM-dd HH:mm:ss}";
        }
    }
}

