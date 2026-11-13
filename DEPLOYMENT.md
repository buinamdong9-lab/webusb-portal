# 🚀 HƯỚNG DẪN TRIỂN KHAI HỆ THỐNG LÊN INTERNET (DEPLOYMENT GUIDE)
## DỰ ÁN WEBUSB PORTAL — CỔNG AN TOÀN USB TRỰC TUYẾN

---

## 1. KIẾN TRÚC MÔ HÌNH VẬN HÀNH TRÊN INTERNET

```
                         KHÁCH HÀNG INTERNET
                                 │
                                 ▼ (HTTPS)
                 [Tên miền: https://usbantoan.io.vn]
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
             [GIAO DIỆN WEB]           [WEBHOOK VIETQR]
        (Chrome/Edge Scanner)     (Nhận biến động số dư 20k)
                    │                         │
                    └────────────┬────────────┘
                                 ▼
         [MÁY CHỦ BACKEND ASP.NET CORE (PORT 8686 / REVERSE PROXY NGINX)]
            • Xử lý Webhook SePay / PayOS (24/7)
            • Ký số RSA-2048 tự động bằng `rsa_private.xml`
            • Phục vụ tải tệp cài đặt `Setup_USB_AnToan_v2.5.exe`
```

---

## 2. HƯỚNG DẪN CHẠY TEST CỤC BỘ (LOCAL DEVELOPMENT)

1. **Khởi động nhanh bằng 1-Click:**
   - Vào thư mục `webusb/` và nhấp đúp vào `run_system.bat`.
   - Trình duyệt sẽ tự động mở tại `http://localhost:8686`.
2. **Kiểm tra tính năng:**
   - Nhấn nút **`⚡ Chạy Giả Lập Thử Nghiệm`** để xem luồng chấm điểm Quizz.
   - Nhấn nút **`🛡️ QUẸT 20 CÀNH`** để mở mã VietQR động.
   - Khi ở `DEV_MODE=true`, sau 6 giây hệ thống tự động xác nhận thanh toán thành công và khởi tạo phân vùng!

---

## 3. CẤU HÌNH CỔNG THANH TOÁN SEPAY THẬT (NHẬN 20.000đ TỰ ĐỘNG)

Để nhận tiền thật 20k về tài khoản ngân hàng của bạn:

1. **Đăng ký tài khoản tại [SePay.vn](https://sepay.vn):**
   - Kết nối tài khoản ngân hàng (MB Bank, Vietcombank, ACB...).
2. **Cấu hình Webhook trên trang quản trị SePay:**
   - URL Webhook: `https://yourdomain.com/api/webhook/sepay`
   - Phương thức: `POST`
   - Loại dữ liệu: `JSON`
   - API Key xác thực: Điền trùng với `SePayApiKey` trong `appsettings.json`.
3. **Cú pháp chuyển khoản khách hàng:**
   - Nội dung quét: `USB <SERIAL>` (Hệ thống tự động sinh trên mã QR).
   - Khi khách quét tiền, SePay sẽ bắn thông báo về máy chủ trong 1–2 giây để tự động mở khóa bản quyền!

---

## 4. HƯỚNG DẪN ĐƯA LÊN MÁY CHỦ CLOUD (VPS / LINUX / WINDOWS SERVER)

### Cách 1: Chạy trực tiếp trên VPS Windows Server
1. Cài đặt **.NET 8 Runtime** (hoặc SDK).
2. Sao chép toàn bộ thư mục dự án lên VPS.
3. Chạy lệnh:
   ```cmd
   cd webusb/backend
   dotnet run --configuration Release
   ```
4. Cấu hình IIS hoặc Caddy/Nginx làm Reverse Proxy trỏ domain vào cổng `8686`.

### Cách 2: Chạy trên VPS Linux (Ubuntu / Debian)
1. Cài đặt dotnet: `sudo apt-get install -y dotnet-sdk-8.0`
2. Build và xuất bản:
   ```bash
   dotnet publish webusb/backend/WebUsbBackend.csproj -c Release -o /var/www/webusb
   ```
3. Cấu hình dịch vụ `systemd` để tự khởi động cùng hệ thống:
   ```ini
   [Unit]
   Description=WebUSB Portal Service
   After=network.target

   [Service]
   WorkingDirectory=/var/www/webusb
   ExecStart=/usr/bin/dotnet /var/www/webusb/WebUsbBackend.dll
   Restart=always
   RestartSec=10

   [Install]
   WantedBy=multi-user.target
   ```
4. Cài đặt SSL miễn phí với **Let's Encrypt Certbot**.

---

## 5. CHECKLIST AN TOÀN TRƯỚC KHI GOLIVE (PRODUCTION CHECKLIST)

- [ ] 1. Đổi `DEV_MODE=false` trong `webusb/config.js` và `appsettings.json`.
- [ ] 2. Kiểm tra tệp `rsa_private.xml` đã được đặt đúng đường dẫn trên máy chủ và **không bị public** qua web.
- [ ] 3. Kiểm tra số tài khoản và tên chủ tài khoản nhận 20k trong `config.js`.
- [ ] 4. Bật HTTPS (SSL) cho tên miền (trình duyệt chỉ cho phép `showDirectoryPicker` trên kết nối bảo mật `https://` hoặc `localhost`).
- [ ] 5. Kiểm thử một giao dịch chuyển khoản 20k thật từ app ngân hàng.

