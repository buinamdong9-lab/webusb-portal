# 🛡️ KẾ HOẠCH DỰ ÁN: CỔNG AN TOÀN USB TRỰC TUYẾN (WEBUSB PORTAL)
## DỰ ÁN CHUYỂN ĐỔI SỐ: TEST QUÉT MÃ ĐỘC MIỄN PHÍ & DỊCH VỤ CÀI ĐẶT USB AN TOÀN TỰ ĐỘNG QUA VIETQR
**Đơn vị phát triển:** Nhóm Nghiên cứu An Toàn Thông Tin & Mật Mã — BTL86  
**Chủ trì kỹ thuật:** DongNB_TTNT  
**Mục tiêu:** Đưa giải pháp USB An Toàn lên Internet, cho phép người dùng kiểm tra USB trực tuyến miễn phí và thu phí tự động 20.000 VNĐ/lần cài đặt bản đầy đủ qua VietQR.

---

## 1. TỔNG QUAN MÔ HÌNH HOẠT ĐỘNG (BUSINESS & TECH MODEL)

Hệ thống hoạt động theo mô hình phễu chuyển đổi: **"Chẩn đoán miễn phí ➔ Thu phí vi mô (Micro-payment 20k) ➔ Tự động cài đặt bản chuẩn vĩnh viễn"**.

```
                NGƯỜI DÙNG CẮM USB TRUY CẬP WEBSITE
                                │
                                ▼
         ┌──────────────────────────────────────────────┐
         │ 1. BẢN TEST TRỰC TUYẾN (MIỄN PHÍ TRÊN WEB)   │
         │ - Quét đếm virus shortcut (.lnk)             │
         │ - Phát hiện script độc (.vbs, .wsf, .js)     │
         │ - Liệt kê thư mục tài liệu đang bị ẩn        │
         │ - Báo cáo mức độ rủi ro (Không có tính năng  │
         │   tạo phân vùng an toàn hay diệt triệt để)   │
         └──────────────────────┬───────────────────────┘
                                │
                  Bấm "Nâng cấp bảo vệ vĩnh viễn"
                                │
                                ▼
         ┌──────────────────────────────────────────────┐
         │ 2. CỔNG THANH TOÁN VIETQR TỰ ĐỘNG (20.000đ)  │
         │ - Tự sinh mã QR động theo Serial của USB     │
         │ - Webhook (SePay / PayOS) bắt biến động      │
         │   số dư ngân hàng 24/7 trong 1-2 giây        │
         └──────────────────────┬───────────────────────┘
                                │
                      Thanh toán thành công
                                │
                                ▼
         ┌──────────────────────────────────────────────┐
         │ 3. KHỞI TẠO USB AN TOÀN BẢN CHUẨN ĐẦY ĐỦ     │
         │ - Tự động ký số bản quyền RSA-2048 theo      │
         │   Serial USB (Server-side License Signer)    │
         │ - Bàn giao gói V2.6 đầy đủ (Ironclad Fortress,│
         │   Két AES-256 GCM, Bộ cứu hộ .bat 1-Click)   │
         └──────────────────────────────────────────────┘
```

---

## 2. PHÂN ĐỊNH RANH GIỚI TÍNH NĂNG (TEST VS. CHUẨN)

| Tính năng kỹ thuật | Bản Test Online (Miễn phí) | Bản Chuẩn Đầy Đủ (20.000đ / 1 USB) |
| :--- | :---: | :---: |
| **Quét & Thống kê Shortcut rác** | ✅ Quét và hiển thị số lượng file `.lnk` | ✅ Tự động quét sạch và tiêu diệt triệt để |
| **Phát hiện script độc hại** | ✅ Cảnh báo file `.vbs`, `.wsf`, `.js` | ✅ Xóa tận gốc các tiến trình và file độc |
| **Báo cáo file tài liệu bị ẩn** | ✅ Liệt kê tên các thư mục Word/Excel bị ẩn | ✅ Gỡ bỏ cờ ẩn hệ thống, khôi phục 100% |
| **Tính năng Tạo USB An Toàn** | ❌ **Tuyệt đối KHÔNG có** | ✅ **Khởi tạo trọn gói cấu trúc phòng vệ** |
| **Phân vùng NTFS Ironclad Fortress** | ❌ Không có | ✅ Thiết lập `App\` (cấm xóa/sửa) & `Du_Lieu_Chung\` |
| **Két bảo mật mã hóa AES-256 GCM** | ❌ Không có | ✅ Đầy đủ Két an toàn + Bàn phím ảo chống Keylogger |
| **Bản quyền số RSA-2048** | ❌ Không có | ✅ Cấp tệp `.sec_license` độc quyền theo Serial USB |
| **Bộ cứu hộ khẩn cấp 1-Click** | ❌ Không có | ✅ Sinh bộ `.bat` cứu hộ tại Root và trong App |

---

## 3. THIẾT KẾ KIẾN TRÚC HỆ THỐNG (SYSTEM ARCHITECTURE)

```
[Trình duyệt Khách hàng (Chrome/Edge)]
   │
   ├─► [Web Scanner Component] ──► Dùng `window.showDirectoryPicker()` truy cập USB
   │                               (Chạy 100% tại Client, Zero-Knowledge)
   │
   ├─► [VietQR Modal Component] ──► Hiển thị mã QR động 20.000đ
   │
   ▼ (Gọi API qua HTTPS)
[Máy chủ WebUSB Backend (Node.js / ASP.NET Core Minimal API)]
   │
   ├─► [Webhook Endpoint] ◄── Nhận IPN từ SePay / PayOS khi khách quét tiền thành công
   │
   ├─► [RSA License Signer] ──► Đọc `rsa_private.xml`, ký số license cho USB Serial
   │
   └─► [Package Delivery] ──► Cấp gói cài đặt `Setup_USB_AnToan_v2.5.exe` + `.sec_license`
```

---

## 4. QUY TRÌNH THANH TOÁN & BÀN GIAO TỰ ĐỘNG

1. **Bước 1: Quét chẩn đoán USB**
   - Khách cắm USB, nhấn *"Quét & Kiểm Tra USB"*.
   - Trình duyệt đọc danh sách tệp qua File System Access API.
   - Hiển thị bảng kết quả: *"Phát hiện 12 virus shortcut, 3 script độc! Tài liệu của bạn đang gặp nguy hiểm."*
2. **Bước 2: Yêu cầu nâng cấp**
   - Nút kêu gọi hành động: `[ 🛡️ Quẹt 20 cành để Diệt virus & Tạo USB An Toàn ]`.
   - Lấy `USB Serial / Volume Name` để sinh nội dung chuyển khoản duy nhất (Ví dụ: `USB 9000181A`).
3. **Bước 3: Quét mã VietQR**
   - Popup hiển thị ảnh VietQR động:
     - Ngân hàng: Tài khoản của Tác giả.
     - Số tiền: `20,000` VNĐ.
     - Nội dung chuyển khoản: `USB <SERIAL>`.
   - Web bật cơ chế Polling (hoặc Server-Sent Events / SSE) để chờ xác nhận.
4. **Bước 4: Nhận tiền & Kích hoạt bản quyền**
   - Ngân hàng báo số dư tăng 20.000đ ➔ SePay/PayOS đẩy Webhook về Backend.
   - Backend xác thực giao dịch, lấy RSA Private Key sinh chữ ký số hợp lệ cho Serial đó.
   - Web chuyển sang màn hình xanh: *"Thanh toán thành công! Đang thiết lập USB An Toàn..."*.
5. **Bước 5: Hoàn tất cài đặt**
   - Tự động ghi gói phần mềm bản quyền vào USB hoặc tải file cài đặt cá nhân hóa về máy tính người dùng.

---

## 5. LỘ TRÌNH TRIỂN KHAI (ROADMAP)

### Giai Đoạn 1: Xây dựng Giao diện Web Test (Frontend Scanner)
- Dựng trang web bằng HTML5 + Tailwind CSS (hoặc React/Vite) với phong cách quân sự/an ninh mạng BTL86.
- Viết module JavaScript giao tiếp với File System Access API.
- Logic kiểm tra và đếm file `.lnk`, `.vbs`, `.wsf`, thư mục ẩn.
- Đảm bảo **hoàn toàn không có mã nguồn tạo USB an toàn trên Frontend**.

### Giai Đoạn 2: Tích hợp Cổng thanh toán VietQR Webhook
- Đăng ký và cấu hình webhook với SePay.vn hoặc PayOS.
- Xây dựng API tiếp nhận Webhook, xác thực số tiền `>= 20000` và nội dung `USB <SERIAL>`.
- Cơ chế chống gian lận và chống thanh toán trùng lặp (Idempotency).

### Giai Đoạn 3: Tích hợp Engine Ký số RSA-2048 Bản quyền
- Port logic tạo key từ project `Admin_KeyGen_Tool` lên backend.
- Lưu trữ an toàn tệp `rsa_private.xml` trên máy chủ (không để lộ ra ngoài).
- Tự động sinh nội dung file bản quyền `.sec_license`.

### Giai Đoạn 4: Hoàn thiện Bàn giao Bản Chuẩn & Kiểm thử E2E
- Kiểm thử luồng từ: Quét Test ➔ Bật QR ➔ Chuyển khoản thật 20k ➔ Nhận diện trong 2s ➔ Bàn giao bản Full.
- Đóng gói và phát hành chính thức lên Internet.
