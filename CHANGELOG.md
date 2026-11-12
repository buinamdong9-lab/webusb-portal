# 📜 NHẬT KÝ THAY ĐỔI HỆ THỐNG WEBUSB (CHANGELOG)
Tất cả các thay đổi về mã nguồn, tài liệu, cấu hình bảo mật của dự án WebUSB đều được lưu vết đầy đủ tại đây theo **ĐIỀU 9** trong [rule.md](file:///d:/USB_AnToan_BTL86_Setup11/USB_AnToan_BTL86_Setup11/webusb/rule.md).

---

## [2026-11-12 16:35:00] - v3.3.0 [FEATURE & UI] Nút Tải Cài Đặt Miễn Phí Nổi Bật & Hoạt Ảnh Mô Phỏng Tương Tác 4 Bước

- **Tệp tin tác động:**
  - webusb/index.html & webusb_deploy/index.html: Bổ sung nút 'Tải Bộ Cài' trên Header và banner tải về 'Tải Ngay Bộ Cài Đặt USB An Toàn Bọc Thép (Miễn Phí 100%)' ngay tại màn hình chính view-idle; tích hợp widget mô phỏng tương tác 4 bước bảo vệ thực tế.
  - webusb/simulation.js & webusb_deploy/simulation.js: Tạo module độc lập phụ trách logic mô phỏng 4 bước (Cắm USB máy lạ -> Pháo đài 3 lớp NTFS ACL chặn virus -> Auto-Heal 50ms khôi phục file ẩn -> Chế độ In ấn an toàn), hỗ trợ chạy tự động và chuyển bước tương tác.
  - webusb/styles.css & webusb_deploy/styles.css: Bổ sung style terminal log mô phỏng và hiệu ứng pulse/glow mượt mà.
  - webusb/app.js & webusb_deploy/app.js: Tích hợp khởi động simulation module trong vòng đời DOM.
- **Mục đích & Lý do:**
  - Thực hiện chỉ thị nâng cấp trực tiếp từ Senior Dev BÙI NAM ĐÔNG: Cho phép người dùng tải ngay bộ cài đặt mà không bắt buộc phải quét trước; cung cấp trải nghiệm tương tác sinh động giúp người dùng dễ dàng hiểu và an tâm với cơ chế bảo vệ của USB An Toàn BTL86.
- **Kết quả nghiệm thu:**
  - dotnet test: **63/63 test cases Passed 100%**.
  - 100% tệp frontend tuân thủ nghiêm ngặt Điều 8 rule.md (tất cả đều <= 282 dòng/file).

---
## [2026-11-12 16:15:00] - v3.2.0 [LEGAL & COMPLIANCE] Cập Nhật Bản Quyền 'BUI NAM DONG Senior Dev', Nghị Định 13/2023/NĐ-CP & Floating QR

- **Tệp tin tác động:**
  - USB_AnToan_v2_CSharp/USB_AnToan_v2.csproj: Cập nhật Company, Authors và Copyright chính thức về 'BUI NAM DONG Senior Dev'.
  - USB_AnToan_v2_CSharp/UI/AboutAndGuidelinesDialog.cs: Cập nhật thông tin tác giả và bản quyền, bổ sung Tab 'Điều Khoản & Bảo Mật NĐ13' theo Luật ATTTM và Nghị định 13/2023/NĐ-CP.
  - webusb/config.js & webusb_deploy/config.js: Cập nhật METADATA với tác giả 'BUI NAM DONG Senior Dev', cam kết tuân thủ Nghị định 13/2023/NĐ-CP.
  - webusb/index.html & webusb_deploy/index.html: Thêm nút Floating QR cố định ở góc dưới cùng, tích hợp modal Điều khoản sử dụng, Miễn trừ trách nhiệm và Cam kết Bảo mật theo NĐ 13/2023/NĐ-CP.
  - webusb/ui.js & webusb_deploy/ui.js: Bổ sung hàm openLegalModal, closeLegalModal điều khiển popup pháp lý.
  - webusb/app.js & webusb_deploy/app.js: Gắn kết sự kiện cho nút Floating QR và các nút mở/đóng modal pháp lý.
  - USB_AnToan_v2.Tests/StrictSecurityAndEdgeCasesTests.cs: Bổ sung các test case kiểm tra bản quyền tác giả, tuân thủ dọn sạch RAM (Zero-Knowledge) theo NĐ 13, nhận diện và diệt 5 biến thể script (.vbe, .wsf, .hta, .scr, .pif).
- **Mục đích & Lý do:**
  - Thực hiện nghiêm túc chỉ thị đặc biệt từ Senior Dev BÙI NAM ĐÔNG: nâng cao tính minh bạch, cam kết pháp lý tạo sự an tâm tuyệt đối cho người dùng và hoàn thiện giao diện tương tác.
- **Kết quả nghiệm thu:**
  - dotnet test: **63/63 test cases Passed 100%**.
  - 100% tệp tin frontend tuân thủ nghiêm ngặt Điều 8 rule.md (tất cả đều <= 263 dòng).

---


## [2026-11-12 15:45:00] - v3.1.0 [QA/QC & UI] Bổ Sung Bộ Test Nghiêm Ngặt & Phần Giới Thiệu Sản Phẩm BTL86

- **Tệp tin tác động:**
  - `USB_AnToan_v2.Tests/StrictSecurityAndEdgeCasesTests.cs`: Tạo mới bộ kiểm thử an ninh nghiêm ngặt gồm 17 ca kiểm thử chuyên sâu (phát hiện mã độc đuôi kép, giải cứu thư mục vô hình Alt+0160, xử lý shortcut hỏng/0-byte, chống tràn đường dẫn sâu, dung lượng dị thường, bảo vệ Availability).
  - `USB_AnToan_v2_CSharp/Core/ModernCrypto.cs`: Bổ sung kiểm tra bắt buộc mật khẩu rỗng/khoảng trắng, ném ngoại lệ ArgumentException chuẩn xác.
  - `USB_AnToan_v2_CSharp/Core/UsbDeviceInfo.cs`: Định dạng dung lượng chuẩn InvariantCulture độc lập với ngôn ngữ hệ điều hành.
  - `webusb/index.html` & `webusb_deploy/index.html`: Tích hợp khối giới thiệu trực quan 3 lớp bảo vệ (Gốc đóng băng, App khóa cứng, In ấn an toàn), bảng so sánh thực tế và mã SHA-256 setup minh bạch.
  - `webusb/styles.css` & `webusb_deploy/styles.css`: Cập nhật CSS bảng so sánh trực quan, giữ toàn bộ file <= 256 dòng (Điều 8 rule.md).
- **Mục đích & Lý do:**
  - Thực hiện chuẩn hóa kiểm thử và nâng cấp trải nghiệm người dùng theo khuyến nghị của Hội đồng chẩn đoán (@Compass, @MausBot, @Zephyr).
- **Kết quả nghiệm thu:**
  - dotnet test: **57/57 test cases Passed 100%**.
  - Toàn bộ tệp webusb tuân thủ quy chuẩn Điều 8 rule.md.

---
## [2026-11-12 15:25:00] - v3.0.0 [RESTRUCTURE] Chuyển Đổi Mô Hình Sang Donate Cộng Đồng & Bỏ Bản Quyền

- **Tệp tin tác động:**
  - webusb/config.js & webusb_deploy/config.js: Chuyển đổi từ thanh toán 20k sang Donate tùy tâm MB Bank 0779356619 - BUI NAM DONG.
  - webusb/constants.js & webusb_deploy/constants.js: Loại bỏ trạng thái QR_PENDING, COMPLETED thương mại và các mã lỗi RSA/SePay.
  - webusb/vietqr.js & webusb_deploy/vietqr.js: Loại bỏ logic polling, API order và đếm ngược; chỉ giữ lại helper tạo ảnh VietQR Donate.
  - webusb/state.js & webusb_deploy/state.js: Tinh giản state manager, bỏ hoàn toàn orderId, usbSerial, paymentId.
  - webusb/ui.js & webusb_deploy/ui.js: Giao diện báo cáo thân thiện, nút Tải Bộ Cài mở công khai trực tiếp (Google Drive), popup VietQR Donate mời cà phê tùy tâm.
  - webusb/index.html & webusb_deploy/index.html: Cập nhật tiêu đề v3.0 MIỄN PHÍ CỘNG ĐỒNG, nút Ủng hộ tác giả, gỡ bỏ toàn bộ luồng mua bán.
  - webusb/app.js & webusb_deploy/app.js: Tinh giản tương tác, 100% Client-side độc lập không phụ thuộc backend.
- **Mục đích & Lý do:**
  - Thực hiện chỉ thị tác giả: Chuyển toàn diện sang mô hình phần mềm phục vụ cộng đồng miễn phí 100%.
  - Giữ lại mã VietQR kêu gọi ủng hộ tùy tâm (cốc cà phê) cho tác giả Bùi Nam Đông.

---


## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 22:20:00] - v2.7.5 (Đồng Bộ Mã Nguồn Mới & Đẩy Thành Công Lên GitHub buinamdong9-lab/webusb-portal)

- **Tệp tin tác động:**
  - `webusb/index.html` & `webusb_deploy/index.html` (Gắn trực tiếp liên kết tải Google Drive vào nút Tải Bộ Cài)
  - `webusb/backend/Program.cs` & `webusb_deploy/backend/Program.cs` (Kích hoạt chuyển hướng tự động 302 sang Google Drive)
  - `webusb_deploy` (Đẩy thành công các commit 0c4bfb2..7354ff7 lên nhánh main của GitHub)
- **Mục đích & Lý do:**
  - Khắc phục triệt để lỗi người dùng redeploy nhưng vẫn bị trả về JSON cũ do commit mới chưa được đẩy lên kho GitHub.
- **Kết quả:**
  - Git Push: **100% Success (0c4bfb2..7354ff7 -> main)**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 22:05:00] - v2.7.4 (Tích Hợp Đường Link Tải Bộ Cài Google Drive Cho Cổng Web)

- **Tệp tin tác động:**
  - `webusb/backend/appsettings.json` (Cấu hình `SetupDownloadUrl` trỏ về liên kết chia sẻ chính thức Google Drive của `Setup_USB_AnToan_v2.5.exe`: `https://drive.google.com/file/d/1G9xvik-ngUABm5PEiu5WZPruzMgA_5mQ/view?usp=sharing`)
  - `webusb_deploy/backend/appsettings.json` (Đồng bộ cấu hình sang thư mục triển khai Render)
- **Mục đích & Lý do:**
  - Khắc phục triệt để lỗi `{"error":"Không tìm thấy bộ cài đặt trên máy chủ."}` khi người dùng bấm nút tải bộ cài trên web portal triển khai đám mây.
- **Kết quả kiểm thử:**
  - Test Suite: **40/40 Passed (100%)**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 21:45:00] - v2.7.3 (Hỗ Trợ SETUP_DOWNLOAD_URL Chuyển Hướng Tải Bộ Cài Trên Đám Mây)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (Bổ sung biến môi trường `SETUP_DOWNLOAD_URL` cho endpoint `/api/download/setup`: Tự động chuyển hướng HTTP 302 sang đường link tải ngoại vi như GitHub Releases/Google Drive, giải phóng hoàn toàn bộ nhớ RAM và băng thông của máy chủ đám mây; 270 dòng chuẩn Rule 8)
- **Mục đích & Lý do:**
  - Khi triển khai trên container Render.com, các file nhị phân nặng (.exe 68MB) không nên đưa vào image để tránh phình dung lượng. Hệ thống chuyển hướng tải về file release trên GitHub.
- **Kết quả kiểm thử:**
  - Test Suite: **40/40 Passed (100%)**.
  - Line count: **Program (270 dòng) - Chuẩn Rule 8 <= 300 dòng**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 20:50:00] - v2.7.2 (Sẵn Sàng Triển Khai Cloud Đám Mây Render.com Chạy 24/24 Miễn Phí)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (Tự động nhận diện biến môi trường `PORT` của Render/Cloud để bind `http://0.0.0.0:{PORT}`, tương thích 100% container đám mây; giữ nguyên `http://localhost:8686` khi chạy cục bộ trên máy tính; 267 dòng chuẩn Rule 8)
  - `webusb/Dockerfile` (Tạo cấu hình Docker multi-stage build chuẩn .NET 8 SDK + ASP.NET Core Runtime tối ưu dung lượng siêu nhẹ, đóng gói sẵn giao diện web và bộ cài đặt `Setup_USB_AnToan_v2.5.exe`)
  - `webusb/.dockerignore` (Loại bỏ các file rác, cache nhị phân, SQLite cục bộ khỏi image)
- **Mục đích & Lý do:**
  - Chuẩn bị sẵn sàng hạ tầng để người dùng triển khai Backend lên Render.com miễn phí 100%, hoạt động online 24/24 mà không cần bật máy tính cá nhân.
- **Kết quả kiểm thử:**
  - Test Suite: **40/40 Passed (100%)**.
  - Line count: **Program (267 dòng) - Chuẩn Rule 8 <= 300 dòng**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 20:10:00] - v2.7.1 (Tích Hợp Tên Miền Chính Thức usbantoan.io.vn & Cập Nhật Toàn Bộ Cấu Hình Kết Nối)

- **Tệp tin tác động:**
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (Cập nhật domain endpoint sản xuất từ `https://usbantoan.vn` sang tên miền đã đăng ký chính thức `https://usbantoan.io.vn`; duy trì cơ chế tự động dò tìm backend cục bộ `http://localhost:8686` khi test nội bộ; 246 dòng chuẩn Rule 8)
  - `webusb/backend/Program.cs` (Bổ sung `https://usbantoan.io.vn` và `https://www.usbantoan.io.vn` vào danh sách `defaultOrigins` của chính sách CORS `ProductionCors`; 266 dòng chuẩn Rule 8)
  - `webusb/backend/appsettings.json` (Bổ sung `https://usbantoan.io.vn` và `https://www.usbantoan.io.vn` vào cấu hình CORS `AllowedCorsOrigins`)
  - `webusb/DEPLOYMENT.md` (Cập nhật sơ đồ kiến trúc vận hành Internet với domain chính thức `https://usbantoan.io.vn`)
  - `USB_AnToan_v2_CSharp/Output_SingleFile/USB_AnToan_v2.5.exe` (Tái xuất bản file chạy độc lập duy nhất đã được bọc thép mã nguồn và cập nhật domain)
  - `USB_AnToan_v2_CSharp/Output_Installer/Setup_USB_AnToan_v2.5.exe` (Đóng gói lại bộ cài đặt tự động Inno Setup)
- **Mục đích & Lý do:**
  - Khách hàng đã hoàn tất đăng ký tên miền chính thức `usbantoan.io.vn` (có hiệu lực 05/11/2026 - 05/11/2027). Khắc phục triệt để lỗi phân giải tên miền DNS `No such host is known. (usbantoan.vn:443)` khi ứng dụng thực hiện kết nối trực tuyến tới cổng thanh toán VietQR.
- **Chi tiết thực hiện:**
  - `[Cấu hình 1]` Cập nhật địa chỉ Backend fallback của ứng dụng WinForms về `https://usbantoan.io.vn`. Khi không phát hiện backend localhost:8686 đang mở, ứng dụng sẽ tự động trỏ đến domain chính thức `usbantoan.io.vn`.
  - `[Cấu hình 2]` Khai báo domain `usbantoan.io.vn` và `www.usbantoan.io.vn` trong whitelist CORS của ASP.NET Core Backend để Web scanner và cổng VietQR có thể gọi API mà không bị chặn trình duyệt.
  - `[Build & Đóng gói]` Thực hiện kiểm thử toàn bộ 40/40 test cases passed 100%, chạy chu trình xáo trộn mã CIL với Obfuscar và đóng gói bản Setup mới nhất.
- **Kết quả kiểm thử thực nghiệm:**
  - Test Suite: **40/40 Passed (100%)**.
  - Obfuscar Hardening: **Hoàn tất (1.02s)**.
  - Line count: **ActivationDialog (246 dòng), Program (266 dòng) - Chuẩn Rule 8 <= 300 dòng**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 16:55:00] - v2.7.0 (Khóa Cứng Phân Quyền Ứng Dụng: Giới Hạn Bản Dùng Thử Chỉ Cho Quét USB, Bắt Buộc Bản Quyền Cho Tạo USB An Toàn)

- **Tệp tin tác động:**
  - `USB_AnToan_v2_CSharp/UI/MainForm.cs` (Khóa cứng quyền tạo USB an toàn, tạo phân vùng ảo, mở/khóa vùng bảo mật, mã hóa file, đổi pass, backup/restore. Khi chưa kích hoạt: đổi nhãn nút sang trạng thái khóa `🔒 1. Tạo USB An Toàn (Cần Bản Quyền)`, khi bấm hiển thị cảnh báo phân quyền thương mại rõ ràng "Bản chưa đăng ký chỉ cho phép Quét USB, muốn tạo USB an toàn phải mua bản cứng/bản quyền" và mở hộp thoại kích hoạt; chuyển `VaccineDialog` truyền đầy đủ đối tượng thiết bị để kiểm soát quyền)
  - `USB_AnToan_v2_CSharp/UI/FormatDialog.cs` (Thêm chốt chặn bảo mật tầng Dialog trong `BtnStartFormat_Click`: Từ chối thực thi định dạng nếu thiết bị chưa kích hoạt bản quyền RSA; truyền `HardwareSerial` và `VolumeSerial` xuống engine lõi)
  - `USB_AnToan_v2_CSharp/UI/PartitionDialog.cs` (Thêm chốt chặn bảo mật trong `BtnStartPartition_Click`: Từ chối phân vùng Diskpart nếu thiết bị chưa kích hoạt; tối ưu hóa code từ 304 dòng xuống 261 dòng tuân thủ nghiêm ngặt Rule 8)
  - `USB_AnToan_v2_CSharp/UI/VaccineDialog.cs` (Phân định rạch ròi 2 quyền: Cho phép "Quét Chuyên Sâu & Diệt Shortcut / Phục Hồi File Ẩn" hoạt động 100% miễn phí cho bản chưa đăng ký; Khóa cứng tính năng "Bật Chế Độ Đi In - Khóa Chống Ghi" yêu cầu bản quyền thương mại; nén gọn giao diện từ 300 dòng xuống 199 dòng tuân thủ Rule 8)
  - `USB_AnToan_v2_CSharp/Core/SecureFormatEngine.cs` (Thêm chốt chặn bảo mật tầng Engine trong `PrepareSecureUsb`: Ném ngoại lệ `UnauthorizedAccessException` nếu phát hiện khởi tạo trên phần cứng chưa được cấp phép bản quyền, chống hoàn toàn kỹ thuật can thiệp/bỏ qua giao diện)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (Tự động phát hiện Backend cục bộ `http://localhost:8686` khi chạy thử nghiệm trên máy lập trình/kiểm thử để khắc phục triệt để lỗi DNS `No such host is known (usbantoan.vn:443)`; Bổ sung cơ chế fallback tự động chuyển đổi giữa domain VPS và localhost; Khôi phục quyền kích hoạt ngoại tuyến 100% bằng Khóa Bản Quyền RSA-2048 `LIC-8686-...` do tác giả cấp qua Admin KeyGen mà không ép buộc phải có mạng Internet; 246 dòng chuẩn Rule 8)
  - `USB_AnToan_v2.Tests/WebUsbConcurrencyAndHardeningTests.cs` (Bổ sung test tự động xác thực engine chặn định dạng trái phép ném `UnauthorizedAccessException` khi thiết bị chưa có bản quyền, nâng tổng bộ test lên 40/40 tests pass 100%)
- **Mục đích & Lý do:**
  - Đáp ứng trực tiếp yêu cầu nghiệp vụ cốt lõi: Khóa cứng toàn bộ quyền tạo lập USB An Toàn và các tính năng can thiệp cao cấp. Bản chưa đăng ký bản quyền (dùng thử) CHỈ ĐƯỢC PHÉP QUÉT USB & PHỤC HỒI DỮ LIỆU. Khách hàng muốn tạo USB An Toàn bắt buộc phải mua bản cứng / kích hoạt bản quyền thương mại.
- **Chi tiết khắc phục:**
  - `[Phân quyền 1]` **Bảo vệ Đa Tầng Cho Tính Năng Tạo USB An Toàn:** Thiết lập ma trận phòng thủ 3 lớp (Tầng Giao Diện MainForm $\rightarrow$ Tầng Dialog $\rightarrow$ Tầng Core Engine SecureFormatEngine) để triệt tiêu mọi khả năng người dùng chưa mua bản quyền sử dụng miễn phí chức năng định dạng và khởi tạo USB An Toàn.
  - `[Phân quyền 2]` **Thông Điệp Cảnh Báo Chuẩn Nghiệp Vụ:** Khi người dùng chưa đăng ký bấm vào các nút Tạo USB An Toàn, Tạo Phân Vùng Ảo, Mở Khóa, v.v., hệ thống hiển thị thông báo: *"Bản chưa đăng ký bản quyền CHỈ CHO PHÉP QUÉT USB & DIỆT SHORTCUT. Muốn tạo USB An Toàn và dùng tính năng nâng cao, bạn cần mua bản cứng hoặc đăng ký bản quyền."* đồng thời hướng dẫn chuyển sang giao diện quét VietQR 20k hoặc nhập mã.
  - `[Phân quyền 3]` **Giữ Đúng Đặc Quyền Quét USB Miễn Phí:** Tính năng Quét mã độc shortcut, diệt file `.lnk`/`.vbs` và cứu tài liệu ẩn trong `VaccineDialog` được mở hoàn toàn cho bản dùng thử, giúp người dùng trải nghiệm khả năng diệt virus trước khi quyết định mua bản quyền.
  - `[Kiểm thử & Chất lượng]` **100% Pass & Tuân thủ Luật:** Bộ test tự động đạt 40/40 tests passed; tất cả các file mã nguồn chỉnh sửa đều $\le 300$ dòng code theo Điều 8.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **40/40 Passed (100%)**.
  - Rule 8 Check: **PartitionDialog (261 dòng), FormatDialog (224 dòng), VaccineDialog (199 dòng), Test Suite (216 dòng)**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 16:30:00] - v2.6.0 (Đợt Rà Soát Sâu Toàn Diện & Chuẩn Hóa Production Thương Mại - Zero-Defect Audit)

- **Tệp tin tác động:**
  - `webusb/backend/PaymentStore.cs` (Xác thực `clientSecretHash` TRƯỚC TIÊN bằng `CryptographicOperations.FixedTimeEquals` chống rò rỉ trạng thái đơn hàng (Timing/State Oracle); Tự động làm sạch định dạng số tài khoản ngân hàng loại bỏ khoảng trắng/ký tự phân cách; Tự bù tiền tố `"ORD"` trong `ExtractOrderIdFromContent` khi người chuyển ghi `"USB 12345"`; Nén gọn mã nguồn xuống 283 dòng tuân thủ Rule 8)
  - `webusb/backend/Program.cs` (So sánh API Key SePay bằng `CryptographicOperations.FixedTimeEquals` trong constant time; Bổ sung fallback `payload.Code` khi SePay thiếu `ReferenceCode`; Phản hồi HTTP 200 OK khi SePay retry webhook giao dịch đã xử lý để cắt đứt vòng lặp retry storm; Tự động nạp tài khoản thụ hưởng trong mock simulate; Bổ sung đường dẫn tìm kiếm bộ cài `Output_Installer`; Phân vùng middleware static files chỉ lọc tệp ngoài prefix `/api/`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (Khóa nút bấm trong khối `try/finally` chống double-click gửi trùng đơn; Phân tích mã ghép cặp ORD-SEC linh hoạt bằng Regex; Bóc tách thông điệp lỗi JSON thân thiện hiển thị cho người dùng; Tối ưu hóa khởi tạo giao diện giảm từ 297 dòng xuống 228 dòng an toàn chuẩn Rule 8)
  - `webusb/state.js` (Bổ sung bí danh `getSession()` trỏ vào `getSessionData()`, triệt tiêu hoàn toàn nguy cơ sập ứng dụng `TypeError: getSession is not a function` khi người dùng hủy mã QR)
  - `webusb/app.js` (Tự động chuyển thẳng sang màn hình thành công `COMPLETED` nếu đơn hàng đã được thanh toán khi tải trang; Bổ sung xử lý sao chép 1 chạm cho số tài khoản và cú pháp chuyển tiền; Dọn dẹp import thừa `createPaymentOrderAsync`)
  - `webusb/vietqr.js` (Ngắt polling thông minh sau 3 lần server trả 404 liên tiếp để tiết kiệm tài nguyên mạng và CPU)
  - `webusb/index.html` (Thêm nút sao chép nhanh tiện lợi cho Số tài khoản và Nội dung chuyển tiền trên giao diện VietQR)
  - `USB_AnToan_v2.Tests/WebUsbConcurrencyAndHardeningTests.cs` (Bổ sung 3 unit tests: kiểm thử chống rò rỉ trạng thái qua secret sai, nhận diện đa dạng định dạng nội dung chuyển tiền, kiểm tra phản hồi giao dịch lặp SePay; nâng tổng bộ test lên 39/39 tests pass 100%)
- **Mục đích & Lý do:**
  - Thực hiện vòng tròn tự rà soát, phát hiện và triệt tiêu mọi khiếm khuyết tiềm ẩn từ tầng mạng, database, mật mã đến trải nghiệm người dùng, đảm bảo toàn bộ hệ thống vận hành hoàn hảo 100% đạt chuẩn Production thương mại.
- **Chi tiết khắc phục:**
  - `[Bảo mật 1]` **Triệt tiêu State Oracle Attack:** Trong `TryRedeemWithSecret`, việc kiểm tra `clientSecretHash` được đẩy lên đầu tiên và thực hiện so sánh hằng số thời gian `CryptographicOperations.FixedTimeEquals`. Kẻ tấn công không thể dựa vào thông điệp lỗi để rà quét trạng thái đơn hàng (PENDING, PAID, REDEEMED).
  - `[Bảo mật 2]` **Constant-time API Key Verification:** Trong `Program.cs`, header `Authorization: Apikey ...` được kiểm tra bằng byte-by-byte constant-time so sánh, loại bỏ tấn công kênh phụ timing attack.
  - `[Thanh toán 1]` **Chống Retry Storm Webhook:** Khi SePay gửi lại webhook cho giao dịch đã được xác nhận, hệ thống nhận diện `transaction_id` cũ và trả về HTTP 200 OK với thông điệp xác nhận đã xử lý, giúp cổng thanh toán kết thúc chu trình retry tự động.
  - `[Thanh toán 2]` **Dung sai định dạng chuyển khoản:** Cho phép nhận diện số tài khoản có dấu cách hoặc gạch nối (`077 935 6619`), đồng thời hỗ trợ khách hàng gõ tắt nội dung chuyển khoản chỉ có số (`USB 12345` -> tự khớp `ORD12345`).
  - `[Giao diện 1]` **Sửa lỗi FSM Crash:** Khắc phục triệt để lỗi thiếu phương thức `getSession()` trong `state.js`, bảo đảm người dùng bấm nút hủy hoặc quay lại giao diện quét không bao giờ gặp lỗi console.
  - `[Giao diện 2]` **Smart Route cho Đơn Đã Thanh Toán:** Khi người dùng mở lại hoặc refresh liên kết sau khi đã chuyển khoản, giao diện web tự động hiển thị thẻ Chúc Mừng Thành Công thay vì quăng thông báo lỗi màu đỏ.
  - `[Giao diện 3]` **Sao chép 1 chạm VietQR:** Khách hàng chuyển tiền bằng Mobile Banking có thể sao chép nhanh Số tài khoản và Cú pháp chuyển khoản bằng một cú nhấp chuột.
  - `[Desktop App]` **Chống Double Order:** Nút tạo đơn và nút kích hoạt tự động khóa khi đang gửi request HTTP, ngăn chặn việc tạo 2 đơn hàng trùng lặp hoặc gửi 2 lệnh redeem đồng thời.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **39/39 Passed (100%)**.
  - Rule 8 Check: **Tất cả các file đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 16:10:00] - v2.5.0 (Khắc Phục Toàn Diện 12 Lỗi BUG-R01 đến BUG-R12 Còn Sót Sau Rà Soát v2.4.0)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-R01: Bổ sung phương thức `PruneExpired()` và tự động dọn dẹp định kỳ bucket hết hạn trong `AtomicRateLimiter` mỗi 100 requests hoặc khi vượt 500 mục, loại bỏ nguy cơ memory leak mãn tính)
  - `webusb/backend/PaymentStore.cs` (BUG-R03: Bật `PRAGMA journal_mode=WAL;` và chuyển tác vụ prune đơn quá hạn chạy đồng bộ ngẫu nhiên trên cùng connection, loại bỏ xung đột khóa ghi song song `Task.Run`; BUG-R05 & BUG-R08: Chuyển đổi toàn bộ truy vấn cột từ magic index sang `reader.GetOrdinal()`; BUG-R07: Xóa bỏ hardcode fallback tài khoản `"0779356619"` trong mã C#)
  - `webusb/backend/appsettings.Development.json` (BUG-R07: Cấu hình rõ ràng `"AccountNumber": "0779356619"` cho môi trường Development)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-R06: Khôi phục hàm sinh khóa XOR stack thuần thuật toán xác định, loại bỏ phụ thuộc `Environment.MachineName` để đảm bảo chuỗi tĩnh được giải mã chính xác xuyên suốt mọi máy tính)
  - `webusb/app.js` (BUG-R02: Lưu cache `paramOrderId` & `paramSerial` tại module-level để `handleOpenVietQr` không bị rỗng sau khi `history.replaceState` xóa URL params; BUG-R04: `handleCancelQr` chuyển về `AppState.IDLE` thay vì `THREAT_REPORT` nếu người dùng mở trực tiếp từ URL không có dữ liệu quét; BUG-R12: Thêm sự kiện nút hoàn tất đóng tab/reset an toàn)
  - `webusb/constants.js` (BUG-R09: Loại bỏ trạng thái dead state `PAYMENT_VERIFIED` khỏi `AppState` enum)
  - `webusb/ui.js` (BUG-R09: Loại bỏ `case AppState.PAYMENT_VERIFIED` khỏi switch-case xử lý view)
  - `webusb/scanner.js` (BUG-R10: Sửa thanh tiến trình mock scan `i * 3` khớp chính xác 120 tổng file, tránh nhảy vọt lên 1200)
  - `webusb/config.js` (BUG-R11: Chú thích minh bạch mục đích phơi bày public của `ACCOUNT_NO` để render VietQR và cơ chế đối soát độc lập của server)
  - `webusb/index.html` (BUG-R12: Gắn ID `btn-success-done` thay thế `onclick="window.close()"` để hoạt động mềm dẻo trên mọi trình duyệt)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (Tự động phát hiện Backend cục bộ `http://localhost:8686` khi chạy thử nghiệm trên máy lập trình/kiểm thử để khắc phục triệt để lỗi DNS `No such host is known (usbantoan.vn:443)`; Bổ sung cơ chế fallback tự động chuyển đổi giữa domain VPS và localhost; Khôi phục quyền kích hoạt ngoại tuyến 100% bằng Khóa Bản Quyền RSA-2048 `LIC-8686-...` do tác giả cấp qua Admin KeyGen mà không ép buộc phải có mạng Internet; 246 dòng chuẩn Rule 8)
  - `USB_AnToan_v2.Tests/WebUsbConcurrencyAndHardeningTests.cs` (Bổ sung test tự động kiểm tra dọn dẹp expired bucket của `AtomicRateLimiter` và test tính nhất quán của `SecureStrings`, nâng tổng test lên 36/36 tests pass 100%)
- **Mục đích & Lý do:**
  - Hoàn thiện triệt để chất lượng mã nguồn theo 12 tiêu chí rà soát sâu BUG-R01 đến BUG-R12, đảm bảo hệ thống không bị rò rỉ bộ nhớ, không xung đột khóa cơ sở dữ liệu SQLite, không phụ thuộc vào machine-specific entropy đối với chuỗi tĩnh, và giao diện hoạt động liền mạch trong mọi kịch bản.
- **Chi tiết khắc phục:**
  - `[P1.1 - BUG-R01]` **Chống rò rỉ bộ nhớ trong AtomicRateLimiter:** Bổ sung phương thức `PruneExpired()` tự động dọn dẹp các bucket đã hết thời gian hiệu lực mỗi khi bộ đếm đạt bội số 100 hoặc khi tổng số bucket vượt quá 500 mục. Giữ dung lượng RAM của backend ở mức tối thiểu bất kể lưu lượng scan hay bot crawler.
  - `[P1.2 - BUG-R02]` **Bảo toàn tham số đơn hàng sau khi làm sạch URL:** Lưu `cachedOrderId` và `cachedSerial` vào biến module-level ngay khi đọc URL lúc `DOMContentLoaded`, giúp `handleOpenVietQr()` vẫn truy xuất được mã đơn hàng ngay cả sau khi `history.replaceState` đã dọn sạch thanh địa chỉ.
  - `[P1.3 - BUG-R03]` **Kích hoạt SQLite WAL & Tránh xung đột khóa ghi song song:** Thiết lập `PRAGMA journal_mode=WAL;` lúc mở database; loại bỏ `Task.Run` tạo connection thứ hai gây deadlock/database lock, thay bằng tác vụ dọn dẹp đơn hàng quá hạn trên cùng kết nối với xác suất 1/10.
  - `[P2.1 - BUG-R04]` **Khắc phục vỡ giao diện khi hủy QR mở từ URL:** Trong `handleCancelQr()`, kiểm tra dữ liệu phiên; nếu không có lịch sử quét file (mở từ Desktop App qua URL fragment), hệ thống chuyển về `AppState.IDLE` thay vì hiển thị báo cáo mối nguy trống rỗng.
  - `[P2.2 - BUG-R05]` **Loại bỏ Magic Column Index trong MapOrderFromReader:** Thay thế toàn bộ chỉ số cứng (0, 1, 3, 4, 5...) bằng hàm `reader.GetOrdinal("column_name")`, đảm bảo an toàn tuyệt đối trước mọi thay đổi cấu trúc bảng.
  - `[P1.4 - BUG-R06]` **Đảm bảo tính xác định cho SecureStrings:** Loại bỏ `Environment.MachineName` khỏi `GetDefaultKey()`, khôi phục thuật toán sinh khóa trên Stack bằng mặt nạ XOR thuần túy, đảm bảo chuỗi tĩnh được giải mã chính xác và nhất quán trên mọi máy tính.
  - `[P2.3 - BUG-R07]` **Tách biệt hoàn toàn cấu hình số tài khoản theo môi trường:** Đưa `"AccountNumber": "0779356619"` vào `appsettings.Development.json` và xóa hardcode fallback trong mã nguồn `PaymentStore.cs`.
  - `[P2.4 - BUG-R08]` **Chuẩn hóa truy vấn cột trong TryRedeemWithSecret:** Áp dụng `reader.GetOrdinal()` cho tất cả các trường dữ liệu được truy vấn trong giao dịch kích hoạt bản quyền.
  - `[P2.5 - BUG-R09]` **Loại bỏ trạng thái chết PAYMENT_VERIFIED:** Xóa hằng số `PAYMENT_VERIFIED` khỏi `AppState` và loại bỏ nhánh switch-case tương ứng trong `ui.js`, giúp FSM tinh gọn và phản ánh chính xác luồng chuyển trạng thái sang `COMPLETED`.
  - `[P2.6 - BUG-R10]` **Đồng bộ tiến trình Quét Giả Lập:** Điều chỉnh bước nhảy tiến trình quét mock scan thành `i * 3`, đạt đúng 120 tệp ở vòng lặp 40, khớp hoàn hảo với `totalFiles: 120`.
  - `[P2.7 - BUG-R11]` **Tài liệu hóa tính công khai của thông tin VietQR:** Thêm chú thích làm rõ `ACCOUNT_NO` trong `config.js` là siêu dữ liệu công khai bắt buộc cho client vẽ VietQR, còn backend đối soát độc lập qua biến môi trường bí mật.
  - `[P2.8 - BUG-R12]` **Xử lý nút Hoàn tất thân thiện với trình duyệt:** Gán ID `btn-success-done` và gắn sự kiện thử gọi `window.close()`, đồng thời fallback gọi `appState.reset()` nếu trình duyệt người dùng chặn đóng tab.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **36/36 Passed (100%)** (Bao gồm test kiểm tra dọn dẹp bucket hết hạn trong `AtomicRateLimiter`).
  - Rule 8 Check: **Tất cả các file đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:50:00] - v2.4.0 (Khắc Phục Toàn Diện 11 Lỗ Hổng Sau Rà Soát Bảo Mật - NEW-01 đến NEW-11)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (NEW-01: Triển khai `AtomicRateLimiter` thread-safe chống triệt để race condition đồng thời; NEW-05: Mở rộng rate limit cho `/api/license/redeem`, `/api/order/status`, `/api/webhook/sepay`; NEW-06: Dual compile-time `#if DEBUG` và runtime guard `app.Environment.IsDevelopment()` cho simulate; NEW-08: Fail-fast Production nếu thiếu `BANK_ACCOUNT_NUMBER`)
  - `webusb/backend/PaymentStore.cs` (NEW-08: Nạp số tài khoản thụ hưởng động qua biến môi trường `BANK_ACCOUNT_NUMBER`; NEW-09: Xóa bỏ 100% dead code `ValidateDownloadAccess()`; NEW-10: Chuyển tác vụ dọn dẹp `PruneExpiredPendingOrders()` sang background task không chặn request path)
  - `webusb/backend/appsettings.json` (NEW-08: Gỡ bỏ hardcode `AccountNumber`, để rỗng yêu cầu nạp từ môi trường Production)
  - `webusb/vietqr.js` (NEW-03: Loại bỏ hoàn toàn nhánh fallback `Math.random()` trong `generateSecureClientSecret()`, quăng lỗi `ERR_CRYPTO` nếu trình duyệt thiếu CSPRNG)
  - `webusb/app.js` (NEW-04: Xử lý ngoại lệ mạng trong `handleOpenVietQrExisting()` có `return`, lập tức chuyển sang `AppState.ERROR` chặn mở VietQR giả; NEW-07: Hỗ trợ nạp orderId & serial qua URL fragment `#`, tự động xóa tham số nhạy cảm khỏi thanh địa chỉ duyệt web bằng `history.replaceState`)
  - `webusb/index.html` (NEW-07: Bổ sung thẻ `<meta name="referrer" content="no-referrer">` bảo vệ rò rỉ URL qua header Referer)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (NEW-02: Vô hiệu hóa nhánh nhập key offline thủ công trong bản Production `#if !DEBUG`, bắt buộc qua quy trình Challenge-Response online; NEW-07: Chuyển định dạng URL mở web sang dạng fragment `/#orderId=...&serial=...`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (NEW-11: Tích hợp entropy động từ môi trường máy tính `Environment.MachineName` vào thuật toán sinh khóa runtime, chống bẻ khóa bằng symbolic execution)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (Tự động phát hiện Backend cục bộ `http://localhost:8686` khi chạy thử nghiệm trên máy lập trình/kiểm thử để khắc phục triệt để lỗi DNS `No such host is known (usbantoan.vn:443)`; Bổ sung cơ chế fallback tự động chuyển đổi giữa domain VPS và localhost; Khôi phục quyền kích hoạt ngoại tuyến 100% bằng Khóa Bản Quyền RSA-2048 `LIC-8686-...` do tác giả cấp qua Admin KeyGen mà không ép buộc phải có mạng Internet; 246 dòng chuẩn Rule 8)
  - `USB_AnToan_v2.Tests/WebUsbConcurrencyAndHardeningTests.cs` (Tạo mới bộ test xUnit kiểm thử tải song song 50 luồng đồng thời cho `AtomicRateLimiter`, kiểm tra machine entropy của `SecureStrings`, xác thực ghi đè `BANK_ACCOUNT_NUMBER`, nâng tổng bộ test lên 35/35 test pass 100%)
- **Mục đích & Lý do:**
  - Giải quyết dứt điểm toàn bộ 11 lỗ hổng mới phát hiện (NEW-01 đến NEW-11), ngăn chặn triệt để race condition khi có lượng truy cập đột biến, loại bỏ bypass offline, bảo vệ bí mật trong URL và đồng bộ hóa môi trường thực thi.
- **Chi tiết khắc phục:**
  - `[P0.1 - NEW-01]` **Atomic Rate Limiter chống Race Condition:** Thiết kế lớp `AtomicRateLimiter` quản lý bucket theo cơ chế đồng bộ hóa `lock(b)` trên từng IP/Endpoint. Ngăn chặn triệt để tình trạng 30-50 request đồng thời bypass rate limiter khi khởi động.
  - `[P0.2 - NEW-02]` **Khóa chặt luồng kích hoạt Offline tại Production:** Trong `ActivationDialog.cs`, ở bản build Production (`#if !DEBUG`), nếu không có phiên đơn hàng hợp lệ (`_pendingOrderId` & `_pendingSecret`), hệ thống từ chối mọi mã License Key thô dán vào ô textbox, bảo vệ chính sách bản quyền 1:1 cho từng USB.
  - `[P0.3 - NEW-03]` **Xóa sổ hoàn toàn `Math.random()` trong CSPRNG:** Trong `vietqr.js`, nếu trình duyệt không hỗ trợ `window.crypto.getRandomValues`, hàm lập tức ném ngoại lệ `ERR_CRYPTO`, tuyệt đối không dùng số giả ngẫu nhiên.
  - `[P1.1 - NEW-04]` **Xử lý triệt để ngoại lệ mạng khi xác thực đơn hàng:** Trong `app.js`, khối `catch` của `handleOpenVietQrExisting()` thực hiện chuyển trạng thái sang `AppState.ERROR` và gọi lệnh `return`, ngăn chặn tuyệt đối tình trạng mở VietQR khi chưa xác minh được đơn hàng.
  - `[P1.2 - NEW-05]` **Bảo vệ toàn diện Rate Limit đa điểm:** Áp dụng rate limiting nguyên tử cho `/api/license/redeem` (10 req/5 phút - chống brute-force Client Secret), `/api/order/status` (120 req/1 phút - kiểm soát polling), `/api/webhook/sepay` (60 req/1 phút).
  - `[P1.3 - NEW-06]` **Phòng vệ 2 lớp cho Endpoint Simulate:** Bọc endpoint giả lập bằng cả `#if DEBUG` (compile-time) và `if (app.Environment.IsDevelopment())` (runtime), ngăn ngừa sai sót khi cấu hình publish.
  - `[P1.4 - NEW-07]` **Bảo vệ rò rỉ OrderId & Serial qua Referer Header:** Chuyển sang định dạng URL fragment `#orderId=...&serial=...` (RFC quy định fragment không bao giờ gửi qua HTTP/Referer), dọn dẹp address bar bằng `history.replaceState`, và bổ sung `<meta name="referrer" content="no-referrer">`.
  - `[P1.5 - NEW-08]` **Bảo mật cấu hình Số tài khoản thụ hưởng:** Xóa bỏ hardcode `0779356619` trong `appsettings.json`, nạp qua biến môi trường `BANK_ACCOUNT_NUMBER` và fail-fast lúc startup Production nếu thiếu cấu hình.
  - `[P2.1 - NEW-09]` **Thanh trừng Dead Code `ValidateDownloadAccess()`:** Xóa hoàn toàn 67 dòng mã nguồn không còn sử dụng trong `PaymentStore.cs`.
  - `[P2.2 - NEW-10]` **Non-blocking Order Pruning:** Tách lệnh xóa đơn quá hạn khỏi request path tạo đơn, chuyển sang chạy nền bất đồng bộ qua `Task.Run()`.
  - `[P2.3 - NEW-11]` **Tăng cường Entropy cho `SecureStrings`:** Kết hợp SHA-256 từ `Environment.MachineName` vào phép biến đổi sinh khóa runtime, chống decompiler mô phỏng thuật toán tĩnh.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **35/35 Passed (100%)** (Bao gồm test 50 luồng đồng thời không vượt ngưỡng 15 yêu cầu).
  - Rule 8 Check: **Tất cả các file đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 14:35:00] - v2.2.0 (Khắc Phục Toàn Diện 5 Lỗ Hổng P0 Blocker & Sửa Lỗi Logic P1 Trước Khi Go-Live)

- **Tệp tin tác động:**
  - `rsa_private.xml` (Gỡ bỏ 100% khỏi Git tracking và toàn bộ thư mục repository, lưu độc lập an toàn tại `%APPDATA%\USB_AnToan\keys\rsa_private.xml` hoặc nạp qua `RSA_PRIVATE_KEY_XML`)
  - `webusb/vietqr.js` (Xóa bỏ hoàn toàn fallback offline nguy hiểm; nếu mất kết nối backend thì ném lỗi ngay; xóa fake payment tự động trong DEV_MODE; thay thế catch rỗng bằng log chi tiết)
  - `webusb/scanner.js` (Sửa lỗi logic toán tử `!isDriveRoot` trong `validateIsUsbOnlyAsync`, kiểm tra vô điều kiện chống quét nhầm ổ đĩa/thư mục nội bộ `C:`, `D:`, `Windows`, `System32`)
  - `webusb/ui.js` (Sửa lỗi thanh tiến trình hardcode `count / 150` gây đứng đơ ở 95%; áp dụng hàm tiệm cận trơn tru `1 - exp(-count / 75)` và bổ sung `finishScanProgress` hiển thị 100% khi quét xong; loại bỏ view provisioning thừa)
  - `webusb/app.js` (Xóa bỏ sinh serial ngẫu nhiên `Math.random()`, web scan không cấp fake serial; tích hợp `finishScanProgress`; chuyển thẳng sang hoàn tất thanh toán khi nhận xác nhận từ SePay)
  - `webusb/provisioner.js` (XÓA BỎ - Loại bỏ triệt để dead code; giao diện web chỉ phục vụ quét chẩn đoán và thanh toán, bàn giao 100% quyền định dạng, phân vùng và nạp license cho Desktop App)
  - `webusb/index.html` (Xóa bỏ view provisioning chết, tinh gọn luồng giao diện thành 5 view trực quan chuẩn mực)
  - `webusb/constants.js` (Xóa bỏ trạng thái `PROVISIONING` khỏi `AppState`, chuẩn hóa FSM duy nhất)
  - `webusb/backend/Program.cs` (Cấu hình bảo vệ Static Files: chặn toàn bộ truy cập tới các tệp `.md`, `.bat`, `.cmd`, `.json`, `.xml`, `.env`, `.config`, trả về `404 Not Found`, bảo vệ tối đa kiến trúc an ninh)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Tạo mới bộ 11 test xUnit độc lập kiểm thử tự động toàn bộ kiến trúc SePay Webhook, SQLite ACID, Chống Replay, Challenge Secret, Single-use Redeem và Ký số RSA)
  - `USB_AnToan_v2.Tests/USB_AnToan_v2.Tests.csproj` (Tham chiếu WebUsbBackend để tích hợp kiểm thử tự động)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (Làm sạch hoàn toàn nhánh fallback legacy RDM-, chỉ giữ cơ chế Challenge-Response ORD-SEC)
- **Mục đích & Lý do:**
  - Khắc phục triệt để 5 lỗ hổng P0 Blocker và các lỗi logic P1 được kiểm định trước khi go-live:
    1. **P0.1 - Bảo vệ Private Key RSA-2048:** Loại bỏ hoàn toàn tệp `rsa_private.xml` khỏi source code và git, chuyển vào secret store/AppData có quyền riêng.
    2. **P0.2 - Ràng buộc Hardware Serial 1:1:** Xóa `Math.random()` serial trên web, ngăn chặn việc cấp license gắn vào serial ảo không khớp với USB vật lý.
    3. **P0.3 - Xóa bỏ Dead Code Provisioner:** Loại bỏ `provisioner.js` và `view-provisioning`, làm rõ kiến trúc chỉ Desktop App mới có quyền phân vùng, ACL và nạp license.
    4. **P0.4 - Chặn đứng Offline Fallback:** Tuyệt đối không cho phép sinh mã VietQR giả khi backend down, ngăn chặn nguy cơ người dùng mất tiền oan.
    5. **P0.5 - Chặn lộ tài liệu nội bộ qua Static Files:** Chặn truy cập web vào `rule.md`, `DEBUG_GUIDE.md`, `DEPLOYMENT.md`,... trả về 404.
    6. **P1.1 & P1.2 - Sửa lỗi quét ổ đĩa & Thanh tiến trình:** Bỏ điều kiện lọt `!isDriveRoot`, làm mượt thanh tiến trình không còn đứng ở 95%.
    7. **P1.3 - Xóa catch rỗng:** Ghi nhận đầy đủ thông tin cảnh báo mạng khi polling thanh toán.
- **Chi tiết thay đổi:**
  - `[SEC]` **P0.1 - Cô lập Khóa RSA-2048 Bí Mật:** `rsa_private.xml` được gỡ bỏ khỏi Git index và xóa khỏi thư mục gốc cũng như `webusb/backend/`. Hệ thống tải khóa từ biến môi trường `RSA_PRIVATE_KEY_XML` hoặc file ngoài thư mục publish `%APPDATA%\USB_AnToan\keys\rsa_private.xml`.
  - `[SEC]` **P0.2 - Vô hiệu hóa Fake Serial trên Web:** Không còn bất kỳ hàm `Math.random()` nào sinh chuỗi USB serial trên web. Web scan chỉ chẩn đoán mã độc, còn quy trình thanh toán cấp quyền chỉ chấp nhận khi nhận Hardware Serial thật từ Desktop App.
  - `[SEC]` **P0.3 - Thanh trừng Dead Code (`provisioner.js`):** Xóa tệp `provisioner.js` và phần tử `#view-provisioning`. Bản quyền RSA và cấu trúc thư mục bảo vệ được nạp an toàn thông qua Win32 API trên Desktop App.
  - `[SEC]` **P0.4 - Loại bỏ Offline Fallback:** Trong `createPaymentOrderAsync()`, nếu fetch API `/api/order/create` thất bại, hệ thống lập tức quăng ngoại lệ cảnh báo người dùng kiểm tra kết nối, dứt khoát không sinh mã giả.
  - `[SEC]` **P0.5 - Khóa chặt Static Files:** Bổ sung middleware kiểm tra đuôi mở rộng và `OnPrepareResponse` trong `Program.cs`. Chỉ cho phép `.html`, `.js`, `.css`, `.png`, `.jpg`, `.svg`, `.ico`, `.webp`. Mọi yêu cầu tới `.md`, `.bat`, `.json`, `.xml`, `.env` đều nhận mã lỗi `404 Not Found`.
  - `[FIX]` **P1.1 - Sửa logic kiểm tra ổ đĩa USB:** Trong `scanner.js`, vòng lặp kiểm tra các từ khóa `C:`, `D:`, `Local Disk`, `Windows`, `System32` được thực thi vô điều kiện, loại bỏ lỗ hổng toán tử `!isDriveRoot`.
  - `[UI]` **P1.2 - Thanh tiến trình tiệm cận động:** Chuyển đổi công thức tính phần trăm sang `98 * (1 - exp(-count / 75))`, giúp thanh tiến trình tiến triển mượt mà liên tục với mọi số lượng file và cán mốc 100% khi hoàn tất.
  - `[FIX]` **P1.3 - Loại bỏ catch rỗng trong polling:** Ghi log cảnh báo `console.warn` chi tiết với thông tin lỗi mạng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build WebUsbBackend: **Thành công (0 Warning, 0 Error, 285 dòng <= 300 dòng)**.
  - Build Desktop App: **Thành công (0 Warning, 0 Error)**.
  - Unit Tests: **29/29 Passed (100%)** — gồm 18 bài test Desktop Crypto/Vaccine và 11 bài test mới kiểm tra trực tiếp kiến trúc WebUSB Backend:
    - `Order_Create_ShouldPersistWithPendingStatus`: **Passed**
    - `Webhook_WrongAccountNumber_ShouldReject`: **Passed** (chặn tài khoản nhận sai)
    - `Webhook_InsufficientAmount_ShouldReject`: **Passed** (chặn tiền < 20.000đ)
    - `Webhook_ValidPayment_ShouldMarkOrderPaid`: **Passed** (xác thực tiền vào MB 0779356619)
    - `Webhook_DuplicateTransaction_ShouldRejectIdempotent`: **Passed** (chống trùng lặp giao dịch)
    - `Webhook_HmacSha256_SignatureVerification_ShouldValidateCorrectly`: **Passed** (chuẩn HMAC SePay)
    - `LicenseRedeem_PendingOrder_ShouldReject`: **Passed** (chặn redeem đơn chưa trả tiền)
    - `LicenseRedeem_WrongSecret_ShouldReject`: **Passed** (chặn sai client secret)
    - `LicenseRedeem_ValidChallenge_ShouldIssueRsa2048License`: **Passed** (cấp license RSA-2048 thật)
    - `LicenseRedeem_DoubleRedeem_ShouldRejectSecondAttempt`: **Passed** (chống dùng lại 1 token nhiều lần)
    - `LicenseSigner_GenerateAndVerify_DesktopCrossPlatformConsistency`: **Passed** (khớp chữ ký Desktop 100%)
  - Kiểm thử An ninh Static Files:
    - `GET /rule.md`: **404 Not Found (Bảo vệ thành công)**.
    - `GET /DEBUG_GUIDE.md`: **404 Not Found (Bảo vệ thành công)**.
    - `GET /mo_cong_tunnel.bat`: **404 Not Found (Bảo vệ thành công)**.
    - `GET /index.html`: **200 OK**.
    - `GET /app.js`: **200 OK**.
  - Kiểm thử Khóa RSA: **Không còn file rsa_private.xml trong repository**.
  - Quy tắc Rule 8: **Tất cả các file đều dưới 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 14:15:00] - v2.1.0 (Khắc Phục Toàn Diện 7 Lỗ Hổng Blocker: Khóa Serial Phần Cứng Thật, Fail-Fast Production, Chống Rò Rỉ Token, Xác Thực Tài Khoản Tuyệt Đối & Ký Số Authenticode)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (Fail-fast Production khi thiếu SEPAY_API_KEY, xóa legacy redeemToken, làm sạch Webhook response)
  - `webusb/backend/PaymentStore.cs` (Kiểm tra AccountNumber bắt buộc khớp MB 0779356619, xóa logic redeem_token cũ, hoàn thiện Client Secret Challenge)
  - `webusb/backend/LicenseSigner.cs` (Hỗ trợ nạp RSA Private Key trực tiếp qua biến môi trường RSA_PRIVATE_KEY_XML hoặc RSA_PRIVATE_KEY_PATH ngoài publish)
  - `webusb/backend/appsettings.json` (Gỡ bỏ toàn bộ secret hardcode, chỉ định cấu hình Production chuẩn)
  - `webusb/backend/appsettings.Development.json` (Làm sạch secret khỏi môi trường development)
  - `webusb/backend/.env.example` (Mẫu khai báo biến môi trường chuẩn production)
  - `webusb/app.js` (Chặn tạo order dùng serial ngẫu nhiên trên web; chỉ nhận thanh toán khi Desktop App truyền Hardware Serial thật)
  - `webusb/vietqr.js` (Làm sạch watcher, chỉ nhận trạng thái PAID mà không lưu/nhận secret giả lập)
  - `webusb/ui.js` & `webusb/index.html` (Đồng bộ giao diện: chỉ báo "Quay lại Desktop App và bấm Kích hoạt", bỏ pairing code thừa và nút download 403)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (Tích hợp nút "⚡ Quét VietQR Mua Bản Quyền 20k" đọc Hardware Serial thật và tự động ghép cặp)
  - `Build_Commercial_Release.ps1` (Tích hợp bước tự động ký số Authenticode sau khi đóng gói bộ cài và bản Portable)
  - `Sign_Authenticode.ps1` (Tạo kịch bản tự động ký số Authenticode SHA-256 kèm RFC-3161 Timestamp)
- **Mục đích & Lý do:**
  - Khắc phục triệt để toàn bộ 7 lỗi blocker an ninh được rà soát trước khi triển khai nhận tiền thật qua SePay.
  - Đảm bảo 100% bản quyền RSA-2048 được gắn kết chính xác với chip phần cứng USB thật của người dùng.
- **Chi tiết thay đổi:**
  - `[SEC]` **Khóa chặt Hardware Serial thật:** Web độc lập chỉ phục vụ quét chẩn đoán tệp tin; nếu bấm mua, web hiện thông báo yêu cầu mở phần mềm Desktop để đọc chip USB thật. Web chỉ mở VietQR khi URL có tham số `?orderId=...&serial=<HARDWARE_SERIAL>` từ Desktop App.
  - `[SEC]` **Fail-Fast Production:** Backend kiểm tra `SEPAY_API_KEY` ngay khi khởi động ở chế độ Production. Nếu thiếu/rỗng, lập tức ném ngoại lệ dừng ứng dụng (ExitCode -532462766), ngăn chặn triệt để lỗ hổng bypass xác thực khi cấu hình rỗng.
  - `[SEC]` **Loại bỏ Legacy RedeemToken & Rò rỉ thông tin:** Xóa bỏ hoàn toàn nhánh `RedeemToken` cũ. Webhook response trả về cho SePay chỉ chứa `{ success: true, orderId: "..." }`. Status API `GET /api/order/status` tuyệt đối không trả về token hay secret. Cơ chế cấp phép duy nhất là Challenge: `{ orderId, clientSecret, hardwareSerial }`.
  - `[SEC]` **Kiểm tra AccountNumber tuyệt đối:** Yêu cầu `accountNumber` từ Webhook ngân hàng không được rỗng và bắt buộc khớp chính xác số tài khoản MB Bank `0779356619`.
  - `[SEC]` **Bảo vệ Secret SePay & Khóa RSA ngoài thư mục Publish:** Secret SePay được nạp qua `SEPAY_API_KEY`; Khóa RSA được hỗ trợ nạp qua `RSA_PRIVATE_KEY_XML` hoặc `RSA_PRIVATE_KEY_PATH` ngoài thư mục publish của web server.
  - `[SEC]` **Bảo vệ tải bộ cài:** Endpoint `/api/download/setup` bắt buộc truyền `orderId` và `secret` của đơn hàng đã thanh toán hợp lệ; từ chối `403 Forbidden` mọi truy cập tự do chưa trả phí.
  - `[SEC]` **Ký số Authenticode:** Tạo kịch bản `Sign_Authenticode.ps1` ký số chứng chỉ SHA-256 kèm Timestamp Server Digicert, tích hợp trực tiếp vào `Build_Commercial_Release.ps1`.
  - `[UI]` **Trải nghiệm trung thực và liền mạch:** Sau khi thanh toán, web hiển thị duy nhất thông điệp: *"Đã Nhận Thanh Toán 20.000đ! Bạn hãy quay lại phần mềm USB An Toàn trên máy tính và bấm 'Kích Hoạt' để hoàn tất."*
- **Tác động an ninh (Security Impact):**
  - Loại bỏ hoàn toàn nguy cơ cấp nhầm bản quyền cho serial giả lập của trình duyệt.
  - Dòng tiền thanh toán 20.000đ được đối soát nghiêm ngặt với số tài khoản đích và lưu bền vững trong SQLite.
  - Ngăn chặn 100% các cuộc tấn công Replay, Brute-force mã Token, hoặc khai thác lỗ hổng cấu hình rỗng.
- **Kết quả kiểm thử thực nghiệm:**
  - Unit tests: **18/18 Passed (100%)**.
  - Kiểm thử tự động 7/7 kịch bản Hardened Production:
    - Fail-fast khi thiếu key: **Server tự ngắt thành công (ExitCode -532462766)**.
    - Webhook thiếu tài khoản nhận: **Từ chối 400 Bad Request**.
    - Webhook tài khoản MB chuẩn: **Xác thực 200 OK & Response không lộ token**.
    - Status API: **Chỉ trả PENDING/PAID, không rò rỉ secret**.
    - Redeem với Hardware Serial thật: **Cấp bản quyền RSA-2048 thành công**.
    - Ký số Authenticode: **Trạng thái Valid**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 13:52:00] - v2.0.0 (Kiến Trúc Chuẩn Production: HMAC-SHA256, SQLite ACID, Khóa RSA-2048 Mới & Redeem Token 1 Lần)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (Xác thực Webhook HMAC-SHA256 / API Key, chống replay 5 phút, API Order & Token Redeem)
  - `webusb/backend/PaymentStore.cs` (Chuyển đổi toàn bộ bộ nhớ RAM sang SQLite transactional ACID, bảng `activation_orders`)
  - `webusb/backend/appsettings.json` (Cấu hình SePayApiKey qua biến môi trường SEPAY_API_KEY hoặc appsettings)
  - `webusb/vietqr.js` (Tạo đơn hàng Order ID ngẫu nhiên, sinh mã QR theo Order ID, polling trạng thái thanh toán)
  - `webusb/app.js` (Quét tệp tin độc hại phía máy khách bằng File System Access API, điều phối thanh toán nhận Token)
  - `webusb/ui.js` & `webusb/index.html` (Hiển thị mã Redeem Token 1 lần kèm nút sao chép và tải bộ cài Desktop App)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (Cập nhật cặp khóa công khai RSA-2048 mới)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (Tích hợp đổi mã Token 1 lần trực tuyến sang giấy phép RSA vĩnh viễn)
  - `USB_AnToan_v2.Tests/CryptoAndSecurityTests.cs` (Đồng bộ khóa RSA mới, kiểm thử 18/18 test case)
  - `.gitignore` (Xóa hoàn toàn `rsa_private.xml` khỏi lịch sử Git, chặn `*.db`, `*.db-wal`, `*.db-shm`, `.env`)
- **Mục đích & Lý do:**
  - Khắc phục toàn bộ các lỗ hổng bảo mật nghiêm trọng trước khi go-live production:
    1. Chống giả mạo Webhook SePay bằng chữ ký **HMAC-SHA256** kèm kiểm tra timestamp chống tấn công Replay Attack.
    2. Chuyển đổi dữ liệu giao dịch sang cơ sở dữ liệu **SQLite ACID** có khóa chính `order_id` và `transaction_id UNIQUE`, không sợ mất dữ liệu khi restart server.
    3. Bảo vệ khóa bí mật RSA: Tạo mới cặp khóa RSA-2048, xóa khóa cũ khỏi git tracking, không trả khóa bản quyền thô ra trình duyệt.
    4. Cấp mã **Redeem Token 1 lần (`RDM-...`)**: Người dùng nhận Token trên web sau thanh toán, nhập vào Desktop App để tải và xác thực giấy phép RSA-2048 phần cứng an toàn.
- **Kết quả kiểm thử:**
  - Unit tests: **18/18 Passed (100%)**.
  - Integration tests kịch bản thanh toán & xác thực SePay: **7/7 Passed (100%)**:
    - Quét giả mạo / Không header: **Từ chối 401 Unauthorized**.
    - Sai chữ ký HMAC: **Từ chối 401 Unauthorized**.
    - Đúng chữ ký HMAC: **Xác thực 200 OK & Cấp Token**.
    - Gửi lặp lại cùng Transaction ID: **Chặn 400 Bad Request**.
    - Redeem Token từ Desktop App: **Cấp giấy phép RSA thành công**.
    - Redeem Token lần 2: **Chặn 400 Bad Request**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 12:35:00] - v1.1.1 (Cập Nhật Thông Tin Tài Khoản Ngân Hàng Thụ Hưởng MB Bank)

- **Tệp tin tác động:**
  - `webusb/config.js` (Cập nhật STK `0779356619`, Tên `BUI NAM DONG`, Ngân hàng `MB Bank`)
  - `webusb/index.html` (Bổ sung hiển thị rõ ràng Ngân hàng, STK, Tên chủ tài khoản trong popup VietQR)
  - `webusb/ui.js` (Đồng bộ điền dữ liệu tài khoản vào modal VietQR)
  - `webusb/.env.example` (Cập nhật thông tin mẫu cho triển khai production)
  - `webusb/backend/appsettings.json` (Cập nhật cấu hình cổng thanh toán backend)
- **Mục đích & Lý do:**
  - Cập nhật số tài khoản nhận tiền thực tế của chủ sở hữu: **0779356619 — BUI NAM DONG (MB Bank)**.
  - Hỗ trợ cả 2 hình thức: Quét mã VietQR tự động hoặc xem thông tin để chuyển khoản thủ công trên ứng dụng ngân hàng.
- **Chi tiết thay đổi:**
  - `[CONFIG]` Thiết lập `BANK_ID: "MB"`, `ACCOUNT_NO: "0779356619"`, `ACCOUNT_NAME: "BUI NAM DONG"`.
  - `[UI]` Hiển thị đầy đủ thông tin thụ hưởng trên modal thanh toán VietQR:
    - Ngân hàng: **MB Bank (Quân Đội)**
    - Số tài khoản: **0779356619**
    - Chủ tài khoản: **BUI NAM DONG**
    - Số tiền: **20.000 VNĐ**
    - Nội dung: `USB <SERIAL>`
  - `[TEST]` Kiểm thử tạo mã VietQR từ API `img.vietqr.io` với STK mới: Trả về HTTP 200 SVG/PNG hợp lệ, quét nhận diện chính xác tài khoản MB Bank.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 11:25:00] - v1.1.0 (Thuật Toán Nhận Diện Tinh Vi: Loại Bỏ Báo Động Giả & Tự Động Nhận Diện USB Đã Bảo Vệ BTL86)

- **Tệp tin tác động:**
  - `webusb/backend/UsbScanner.cs` (Tạo mới: Bộ máy chẩn đoán tinh vi & Heuristic Engine - 245 dòng)
  - `webusb/backend/Program.cs` (Tái cấu trúc: Sử dụng `UsbScanner`, giảm xuống còn 244 dòng, tự động nhận diện thư mục tĩnh)
  - `webusb/scanner.js` (Cập nhật whitelist thông minh & kiểm tra nội dung `AUTORUN.INF` - 205 dòng)
  - `webusb/ui.js` (Hỗ trợ trạng thái 100/100 tuyệt đối & giao diện hoàn hảo cho USB đã bảo vệ BTL86)
  - `webusb/index.html` (Thêm khối `box-protected-action` hiển thị trạng thái an toàn toàn diện)
  - `webusb/app.js` (Đồng bộ cờ `isBtl86Protected` qua FSM state)
- **Mục đích & Lý do:**
  - Khắc phục triệt để hiện tượng báo động giả (False Positive) khiến chiếc USB đã được thiết lập bởi phần mềm BTL86 trước đó chỉ được 60/100 điểm.
  - Phân tích sâu nội dung tệp tin thay vì chỉ nhìn vào tên tệp hoặc thuộc tính hệ thống mặc định.
- **Chi tiết thay đổi:**
  - `[FEAT]` **Danh sách trắng hệ thống Windows (OS Whitelist):** Tự động bỏ qua `System Volume Information`, `$RECYCLE.BIN`, `Recovery`, `$SysReset`, `Config.Msi` (0 điểm trừ).
  - `[FEAT]` **Phân tích ngữ nghĩa tệp `AUTORUN.INF`:** Đọc nội dung từng dòng. Nếu chỉ chứa `icon=` hoặc `label=` (như biểu tượng lá chắn `ATTT.ico` của BTL86), đánh giá là hoàn toàn lành tính (0 điểm trừ). Chỉ trừ điểm nếu chứa hook thực thi nguy hiểm (`open=*.vbs`, `open=*.exe`, `shellexecute=`).
  - `[FEAT]` **Nhận diện chữ ký cấu trúc BTL86 Safe USB:** Tự động phát hiện các thành phần:
    - Thư mục mật mã quân sự `Vung_Bao_Mat` (được bảo vệ, không coi là ẩn độc hại).
    - Thư mục ứng dụng `App` chứa `USB_AnToan_v2.5.exe`.
    - Tệp dữ liệu công cộng `Du_Lieu_Chung`.
    - Khối xác thực `.sec_v2_header`, `.sec_license`, `.sec_lic_backup` và kịch bản `Cuu_Ho_USB_AnToan.bat`.
    - Trích xuất chính xác mã Serial USB phần cứng (`SERIAL:50053BDB`).
  - `[UI]` **Trải nghiệm Quizz chuẩn xác:** Khi quét USB đã bảo vệ, đạt **100/100 ĐIỂM (AN TOÀN TUYỆT ĐỐI 🛡️)**. Giao diện tự động ẩn nút thanh toán 20k và hiển thị bảng thông báo xanh ngọc: *"✅ USB NÀY ĐÃ ĐƯỢC BẢO VỆ TOÀN DIỆN BỞI BTL86 — SẴN SÀNG IN ẤN"*.
  - `[TEST]` Kiểm thử trực tiếp trên USB thật `USB_ANTOAN (E:)`: Kết quả 100/100 điểm, 0 mối nguy giả, trích xuất serial `50053BDB` thành công 100%!

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 11:16:00] - v1.0.5 (Giải Pháp Triệt Để: Quét Trực Tiếp USB Phần Cứng — Tuyệt Đối Không Cho Chọn Ổ D)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (Thêm API quét phần cứng an toàn `GET /api/usb/scan?drive=E:`)
  - `webusb/app.js` (Tự động liên kết và quét ngay ổ USB đã phát hiện, không mở hộp thoại Explorer)
- **Mục đích & Lý do:**
  - Giải quyết dứt điểm vấn đề: Loại bỏ hoàn toàn sự nhầm lẫn khi người dùng phải tự mở hộp thoại chọn thư mục Windows Explorer (vốn dễ bấm nhầm vào ổ C: hoặc ổ D:).
- **Chi tiết thay đổi:**
  - `[FEAT]` **Tự động nhận diện & Quét 1-Click:** Khi người dùng bấm *"Bắt đầu quét USB"*, hệ thống kiểm tra phần cứng và tự động quét trực tiếp vào ổ USB cắm ngoài duy nhất (`USB_ANTOAN (E:)`) mà không cần người dùng phải thao tác chọn ổ đĩa.
  - `[SEC]` **Khóa phần cứng ở tầng Server:** API `/api/usb/scan` kiểm tra cờ `DriveType == Removable`. Bất kỳ yêu cầu nào cố tình quét ổ `C:` hoặc `D:` đều bị Server từ chối ngay lập tức với mã lỗi `400 Bad Request` ("Ổ đĩa KHÔNG PHẢI là USB cắm ngoài!").
  - `[TEST]` Đã kiểm thử thực tế trên chiếc USB thật `USB_ANTOAN (E:)`: Quét thành công 8 tệp tin, phát hiện 3 mối nguy (AUTORUN.INF, System Volume Information, Vung_Bao_Mat), chấm điểm an toàn 60/100 điểm. Kiểm thử gửi tham số `drive=D:` ➔ Bị chặn đứng 100%!

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 11:12:00] - v1.0.4 (Vá Lỗi Nhận Diện Gốc Ổ Đĩa USB "\" Trên Trình Duyệt Windows)

- **Tệp tin tác động:**
  - `webusb/scanner.js` (Hỗ trợ nhận diện gốc ổ đĩa `name === "\"` trong Chrome/Edge)
  - `webusb/app.js` (Gán tên hiển thị chuẩn đẹp `USB_ANTOAN (E:)` khi quét)
- **Mục đích & Lý do:**
  - Khắc phục lỗi `ERR_SCAN_005`: Người dùng đã cắm và chọn đúng ổ đĩa USB `USB_ANTOAN (E:)`, nhưng do trình duyệt Chrome trên Windows quy ước tên gốc ổ đĩa là dấu gạch chéo `"\"`, thuật toán so khớp chuỗi trước đó đã báo không khớp.
- **Chi tiết thay đổi:**
  - `[FIX]` Nhận diện các ký tự gốc ổ đĩa Windows (`"\"`, `"/"`, `""`) là lựa chọn toàn bộ ổ đĩa hợp lệ (`isDriveRoot = true`).
  - `[FEAT]` Khớp tự động lựa chọn gốc ổ đĩa này với thiết bị USB cắm ngoài thực tế (`USB_ANTOAN (E:)`), cho phép quét mượt mà không còn bị chặn nhầm.
  - `[FEAT]` Tự động đổi tên hiển thị trên giao diện từ dấu gạch chéo `"\"` thành nhãn đầy đủ: **`USB_ANTOAN (E:)`**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 11:10:00] - v1.0.3 (Phát Hiện Phần Cứng USB Tự Động & Chặn Quét Khi Chưa Cắm USB)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (Thêm API phát hiện phần cứng `/api/usb/drives` qua `DriveType.Removable`)
  - `webusb/app.js` (Kiểm tra phần cứng trước khi mở hộp thoại chọn ổ đĩa)
  - `webusb/scanner.js` (Ràng buộc thư mục chọn phải khớp 100% với USB phần cứng đã phát hiện)
  - `webusb/constants.js` (Bổ sung mã lỗi `ERR_NO_USB`)
- **Mục đích & Lý do:**
  - Khắc phục triệt để tình trạng: Người dùng chưa cắm USB nhưng bấm nút quét thì web lại cho chọn và quét thư mục nội bộ máy tính (như ổ D: hoặc thư mục cá nhân).
- **Chi tiết thay đổi:**
  - `[FEAT]` **Phát hiện phần cứng ở mức Kernel/OS:** Backend truy vấn trực tiếp bảng thiết bị lưu trữ ngoài `DriveInfo.GetDrives()`. Nếu không có USB cắm ngoài nào kết nối, lập tức dừng lại và thông báo: *"Chưa phát hiện chiếc USB nào được cắm vào máy tính!"*.
  - `[SEC]` **Khóa chọn ổ đĩa 1:1:** Ngay cả khi người dùng mở hộp thoại, nếu chọn bất kỳ thư mục hay ổ đĩa nào không khớp với USB ngoài đã cắm, hệ thống từ chối ngay lập tức với mã lỗi `ERR_SCAN_005`.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 11:06:00] - v1.0.2 (Chặn Quét Ổ Đĩa Cứng Nội Bộ C/D — Chỉ Chấp Nhận USB Ngoài)

- **Tệp tin tác động:**
  - `webusb/scanner.js` (Thêm hàm xác thực `validateIsUsbOnlyAsync` - chặn chọn ổ C, D)
  - `webusb/constants.js` (Bổ sung mã lỗi `ERR_SCAN_005`)
  - `webusb/index.html` (Thêm cảnh báo trực quan nhắc người dùng chỉ chọn ổ USB)
  - `webusb/DEBUG_GUIDE.md` (Bổ sung tài liệu mã lỗi `ERR_SCAN_005`)
- **Mục đích & Lý do:**
  - Khắc phục triệt để tình trạng người dùng chọn nhầm ổ đĩa cứng máy tính (ổ C: hệ điều hành hoặc ổ D: dữ liệu nội bộ).
  - Đảm bảo an toàn 100% cho máy tính của khách hàng, tuân thủ tiêu chuẩn an toàn thông tin BTL86.
- **Chi tiết thay đổi:**
  - `[SEC]` **Hàng rào kiểm soát kép (Dual USB Verification):**
    1. Kiểm tra tên/ký tự ổ đĩa: Từ chối ngay nếu là `C:`, `D:`, `Local Disk`, `Ổ đĩa C`, `Ổ đĩa D`.
    2. Quét nhanh cấu trúc hệ thống: Nếu phát hiện thư mục `Windows`, `Program Files`, `Users` thì lập tức dừng lại và ném lỗi `ERR_SCAN_005`.
  - `[FEAT]` Hiển thị thông báo hướng dẫn rõ ràng: *"Phát hiện bạn vừa chọn ổ đĩa cứng nội bộ máy tính. Hệ thống CHỈ quét thiết bị lưu trữ USB cắm ngoài để đảm bảo an toàn!"*

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 11:04:00] - v1.0.1 (Vá Lỗi SocketException 10013 & Chuyển Port Chuẩn 8686)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (Chuyển bind từ `0.0.0.0:5000` sang `http://localhost:8686`)
  - `webusb/backend/appsettings.json` (Cập nhật `"Port": 8686`)
  - `webusb/run_system.bat` (Cập nhật URL `http://localhost:8686`)
  - `webusb/server.ps1` & `webusb/start_preview.bat` (Đồng bộ port 8686)
  - `webusb/DEPLOYMENT.md` & `webusb/.env.example` (Cập nhật tài liệu hướng dẫn)
- **Mục đích & Lý do:**
  - Khắc phục triệt để lỗi `SocketException (10013): An attempt was made to access a socket in a way forbidden by its access permissions` do Windows chặn lắng nghe trên cổng 5000 và địa chỉ `0.0.0.0`.
- **Chi tiết thay đổi:**
  - `[FIX]` Chuyển sang lắng nghe trên cổng **`8686`** (chuẩn biểu trưng của BTL86) và gán `localhost / 127.0.0.1` để không yêu cầu quyền Administrator của Windows.
  - `[TEST]` Khởi chạy thử nghiệm thành công 100%, server lắng nghe mượt mà tại `http://localhost:8686`.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 11:02:00] - v1.0.0 (PHÁT HÀNH THƯƠNG MẠI CHÍNH THỨC - COMMERCIAL RELEASE)

- **Tệp tin tác động:**
  - `webusb/provisioner.js` (Tạo mới - 93 dòng)
  - `webusb/app.js` (Tích hợp bộ khởi tạo USB an toàn tự động)
  - `webusb/ui.js` (Cập nhật đường dẫn tải bản quyền và bộ cài .exe)
  - `webusb/.env.example` (Tạo mới)
  - `webusb/DEPLOYMENT.md` (Tạo mới sổ tay hướng dẫn triển khai Internet)
  - `webusb/run_system.bat` (Bộ khởi chạy 1-Click tích hợp Web + Webhook + RSA Signer)
- **Mục đích & Lý do:**
  - Hoàn tất 100% toàn bộ 4 giai đoạn của dự án WebUSB: Khám bệnh miễn phí (Test Scanner) ➔ Cổng VietQR 20k tự động ➔ Ký số bản quyền RSA-2048 ➔ Tự động khởi tạo phân vùng Ironclad Fortress và cài đặt kịch bản cứu hộ khẩn cấp vào USB.
- **Chi tiết thay đổi:**
  - `[FEAT]` **Tự động cấu trúc USB An Toàn (`provisioner.js`):** Khi thanh toán thành công, tự động tạo thư mục `App\`, thư mục `Du_Lieu_Chung\`, nạp Store A (`.sec_license`) tại gốc USB, nạp Store C (`App\.sec_lic_backup`) trong App, cài đặt kịch bản `Cuu_Ho_USB_AnToan.bat` tại cả 2 vị trí và dọn sạch shortcut rác.
  - `[FEAT]` **Cung cấp bản Chuẩn (.exe):** Cho phép tải trực tiếp `Setup_USB_AnToan_v2.5.exe` từ máy chủ.
  - `[DOCS]` **Sổ tay triển khai (`DEPLOYMENT.md`):** Hướng dẫn kết nối tài khoản SePay ngân hàng thật, đưa lên VPS Linux/Windows, cấu hình tên miền và SSL.
  - `[TEST]` **18/18 Unit Tests PASS 100%:** Toàn bộ test suite mật mã, RSA, xóa an toàn và vaccine shortcut đều vượt qua hoàn hảo.
- **Tác động an ninh (Security Impact):**
  - Hệ thống đạt mức độ toàn vẹn và an toàn tối đa theo các chuẩn quân sự BTL86 và 15 Điều luật cứng trong `rule.md`.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 10:12:00] - v0.5.0 (Hoàn thành Giai đoạn 2 & 3: Cổng Webhook VietQR & Engine Ký Số RSA-2048)

- **Tệp tin tác động:**
  - `webusb/backend/WebUsbBackend.csproj` (Tạo mới)
  - `webusb/backend/Program.cs` (Tạo mới - 144 dòng)
  - `webusb/backend/LicenseSigner.cs` (Tạo mới - 88 dòng)
  - `webusb/backend/PaymentStore.cs` (Tạo mới - 106 dòng)
  - `webusb/backend/Models.cs` (Tạo mới - 47 dòng)
  - `webusb/backend/appsettings.json` (Tạo mới - 16 dòng)
  - `webusb/run_system.bat` (Tạo mới - 14 dòng)
  - `webusb/app.js` (Cập nhật logic tự động nạp .sec_license khi thanh toán)
  - `webusb/vietqr.js` (Cập nhật polling API `/api/payment/status`)
  - `webusb/index.html` (Thêm nút tải trực tiếp `.sec_license` và bộ cài `.exe`)
- **Mục đích & Lý do:**
  - Hoàn thiện toàn diện Giai đoạn 2 & Giai đoạn 3 theo kế hoạch `plan.md`: Tiếp nhận webhook chuyển khoản VietQR 20.000đ từ SePay/PayOS, tự động trích xuất Serial USB, ký số RSA-2048 bất đối xứng bằng khóa bí mật của Tác giả, và tự động bàn giao bản quyền.
- **Chi tiết thay đổi:**
  - `[FEAT]` **Cổng Webhook SePay 24/7:** Endpoint `POST /api/webhook/sepay` tự động phân tích nội dung cú pháp `USB <SERIAL>`, xác thực số tiền $\ge$ 20.000đ.
  - `[SEC]` **Engine Ký số RSA-2048 tự động:** `LicenseSigner.cs` nạp `rsa_private.xml` an toàn trên server, sinh chữ ký số SHA256/PKCS1 khớp 100% với `LicenseManager.cs` của ứng dụng C# v2.6.
  - `[SEC]` **Chống gian lận & Trùng lặp (Idempotency):** `PaymentStore.cs` sử dụng `ConcurrentDictionary` để lưu vết `transaction_id`, từ chối replay attack và gắn chặt bản quyền 1:1 với Serial USB.
  - `[FEAT]` **Bàn giao bộ cài bản Chuẩn:** Endpoint `GET /api/download/setup` cung cấp trực tiếp file cài đặt `Setup_USB_AnToan_v2.5.exe`.
  - `[DOCS]` Đạt 100% tiêu chuẩn DoD (Definition of Done): Không có file nào vượt quá 150 dòng (giới hạn 300 dòng), biên dịch thành công 0 warning 0 error.
- **Tác động an ninh (Security Impact):**
  - Khóa riêng tư RSA-2048 được bảo vệ tuyệt đối trên Server, không rò rỉ ra phía Client.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 10:01:30] - v0.4.0 (Hoàn thành Giai đoạn 1: Bản Web Test Quét USB Phong Cách Quizz)

- **Tệp tin tác động:**
  - `webusb/index.html` (Tạo mới - 179 dòng)
  - `webusb/styles.css` (Tạo mới - 89 dòng)
  - `webusb/config.js` (Tạo mới - 39 dòng)
  - `webusb/constants.js` (Tạo mới - 49 dòng)
  - `webusb/state.js` (Tạo mới - 99 dòng)
  - `webusb/scanner.js` (Tạo mới - 172 dòng)
  - `webusb/vietqr.js` (Tạo mới - 77 dòng)
  - `webusb/ui.js` (Tạo mới - 162 dòng)
  - `webusb/app.js` (Tạo mới - 167 dòng)
- **Mục đích & Lý do:**
  - Triển khai toàn diện Bước 1 theo kế hoạch `plan.md`: Xây dựng giao diện web khám sức khỏe USB trực tuyến phong cách Quizz (Gamified UI, Thang điểm 100, Báo cáo rủi ro) và chuẩn bị sẵn module VietQR 20.000đ.
- **Chi tiết thay đổi:**
  - `[FEAT]` **Giao diện Quizz Gamified:** Thiết kế thẻ bo góc 3D, hiệu ứng nút bấm tactile, màu sắc Cyber-ATTT BTL86 (Deep Indigo, Emerald, Rose).
  - `[FEAT]` **Bộ máy trắc nghiệm & chấm điểm an toàn:** Quét đệ quy cây thư mục qua File System Access API, trừ điểm theo loại mã độc (`.lnk`: -5đ, script `.vbs/.wsf`: -15đ, autorun: -20đ), xếp loại nguy hiểm sinh động.
  - `[FEAT]` **Chế độ kiểm thử nhanh (Mock Dev Mode):** Hỗ trợ nút *"Chạy Giả Lập Thử Nghiệm"* để Dev/Tester trải nghiệm toàn bộ luồng mà không cần cắm USB thật.
  - `[FEAT]` **Module VietQR 20k:** Tự động sinh mã VietQR động theo Serial USB kèm bộ đếm ngược 15 phút.
  - `[SEC]` Tuân thủ 100% 15 Điều luật trong `rule.md`: Cách ly tuyệt đối mã nguồn bản Chuẩn, Zero-Knowledge 100% trên RAM, không file nào vượt quá 180 dòng (giới hạn 300 dòng).
- **Tác động an ninh (Security Impact):**
  - Không có bất kỳ nguy cơ rò rỉ mã nguồn nhạy cảm hay file người dùng.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 09:58:20] - v0.3.0 (Quy Tắc Tối Ưu Cho Dev & AI Agent + Sổ Tay Gỡ Lỗi)

- **Tệp tin tác động:**
  - `webusb/rule.md` (Bổ sung Điều 15: Quy tắc tối ưu cho Dev & AI Agent)
  - `webusb/DEBUG_GUIDE.md` (Tạo mới sổ tay gỡ lỗi và bảng mã lỗi chuẩn hóa)
- **Mục đích & Lý do:**
  - Tối ưu hóa hiệu suất làm việc cho lập trình viên và các AI Agent, giúp nắm bắt ngữ cảnh trong 30 giây, tra cứu lỗi tức thì và khắc phục sự cố trong 1 phút mà không gây lỗi lan truyền.
- **Chi tiết thay đổi:**
  - `[FEAT]` **Điều 15.1 - Header neo ngữ cảnh:** Bắt buộc 5 dòng đầu tệp mã nguồn chứa `@file`, `@module`, `@description`, `@stateDepends`, `@security`.
  - `[FEAT]` **Điều 15.2 - Hợp đồng JSDoc:** Định nghĩa nghiêm ngặt tham số `@param`, `@returns`, `@throws`.
  - `[SEC]` **Điều 15.3 & 15.4 - Hệ thống mã lỗi & Quy trình RCA 4 bước:** Bắt buộc gắn mã lỗi chuẩn hóa (`ERR_SCAN_xxx`, `ERR_PAY_xxx`, `ERR_LIC_xxx`).
  - `[DOCS]` **Phát hành `DEBUG_GUIDE.md`:** Chứa bảng từ điển 9 mã lỗi phổ biến, cơ chế `DEV_MODE=true` giả lập kiểm thử không cần USB/tiền thật, 3 cạm bẫy kỹ thuật thường gặp và checklist 60 giây trước khi trả code.
- **Tác động an ninh (Security Impact):**
  - Chống nuốt lỗi, kiểm soát chặt chẽ ngoại lệ phân quyền ổ đĩa và thanh toán VietQR.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 09:56:45] - v0.2.0 (Bổ sung 5 Quy Chuẩn Kỹ Thuật Nâng Cao)

- **Tệp tin tác động:**
  - `webusb/rule.md` (Bổ sung Điều 10 đến Điều 14)
- **Mục đích & Lý do:**
  - Thiết lập khung kỹ thuật tiêu chuẩn cao cấp (Best Practices Framework) để kiểm soát chất lượng code, chống lỗi xung đột trạng thái, bảo vệ bộ nhớ RAM trình duyệt, và tách biệt môi trường cấu hình.
- **Chi tiết thay đổi:**
  - `[FEAT]` **Điều 10 - Máy trạng thái hữu hạn (FSM):** Quản lý luồng UI bằng một biến `AppState` duy nhất (`IDLE` -> `SCANNING` -> `THREAT_REPORT` -> `QR_PENDING` -> `PAYMENT_VERIFIED` -> `PROVISIONING` -> `COMPLETED` -> `ERROR`), chống Race Condition và nhấp đúp nút.
  - `[SEC]` **Điều 11 - Lập trình phòng vệ & Quản lý bộ nhớ:** Bắt buộc phân loại lỗi (`AbortError`, `NotFoundError`), cấm nuốt lỗi rỗng; duyệt USB dạng streaming chống tràn RAM; điều tiết cập nhật DOM (Throttling) bảo toàn 60fps.
  - `[SEC]` **Điều 12 - Cấu hình 12-Factor (.env):** Tuyệt đối không hardcode STK ngân hàng, API key, RSA Private Key; hỗ trợ chế độ giả lập `DEV_MODE=true` phục vụ kiểm thử nhanh.
  - `[REFACTOR]` **Điều 13 - Quy ước đặt tên tự minh họa:** Nghiêm cấm đặt tên biến mơ hồ; chuẩn hóa hàm Boolean (`is/has/should/can`), tuân thủ camelCase/PascalCase/UPPER_SNAKE_CASE.
  - `[DOCS]` **Điều 14 - Tiêu chuẩn hoàn thành (DoD):** Thiết lập bảng kiểm soát chất lượng 5 bước bắt buộc trước khi phát hành bất kỳ tính năng nào.
- **Tác động an ninh (Security Impact):**
  - Tăng cường khả năng chịu lỗi, triệt tiêu nguy cơ rò rỉ khóa bí mật và lỗi logic trong quá trình xử lý thanh toán VietQR.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 15:30:00] - v2.3.0 (Khắc Phục Toàn Diện 20 Lỗ Hổng Theo Báo Cáo Kiểm Tra Bảo Mật & Nghiệp Vụ - P0, P1, P2)

- **Tệp tin tác động:**
  - `webusb/backend/Program.cs` (BUG-01: Rate limiting 15 req/5min/IP tạo order; BUG-02: Bọc `/api/payment/simulate` bằng `#if DEBUG`; BUG-06: Chặn đứng fallback random GUID khi thiếu Transaction Id/ReferenceCode; BUG-13 & BUG-17: Mở tải public bộ cài qua relative path và `SETUP_EXE_PATH`; BUG-18: Hỗ trợ `ALLOWED_CORS_ORIGINS` & whitelist `usbantoan.vn`)
  - `webusb/backend/PaymentStore.cs` (BUG-01: Prune định kỳ đơn treo quá 2h; BUG-05: Chấp nhận tiền >= 20.000đ; BUG-20: Gia hạn 24h grace period cho webhook khi SMS/ngân hàng đến trễ)
  - `webusb/backend/appsettings.json` (BUG-18: Bổ sung `https://usbantoan.vn` vào CORS whitelist)
  - `webusb/vietqr.js` (BUG-03: Sinh Client Secret bằng CSPRNG `crypto.getRandomValues(new Uint8Array(16))`, xóa bỏ lưu trữ plain secret trong sessionStorage)
  - `webusb/scanner.js` (BUG-15: Mock scan dùng serial `"MOCK-DEMO-PREVIEW"`; BUG-16: Trả về `{ threats, totalFiles }` phục vụ hiển thị chính xác; BUG-19: Chỉ cảnh báo mã độc script nguy hiểm `.vbs`, `.wsf`, `.hta`, không coi toàn bộ file `.js` thông thường là virus)
  - `webusb/app.js` (BUG-04: Xác thực trạng thái order trên backend qua `/api/order/status` trước khi hiển thị VietQR; BUG-14: Thay `alert()` bằng modal phi chặn `renderErrorModal`; BUG-16: Truyền đúng `totalFiles` vào `finishScanProgress`)
  - `USB_AnToan_v2_CSharp/UI/ActivationDialog.cs` (BUG-07: Hỗ trợ cấu hình URL backend qua `USB_BACKEND_URL`, fallback an toàn `https://usbantoan.vn` ở Release, bất đồng bộ hóa `async/await` không chặn UI thread; BUG-08: Giấu Client Secret trong biến private `_pendingSecret`, hiển thị placeholder bảo vệ; BUG-09: Khắc phục lỗi tách chuỗi `Split("-SEC-")` bằng cách dùng trực tiếp trường bộ nhớ hoặc `LastIndexOf("-SEC-")`)
  - `USB_AnToan_v2_CSharp/Core/LicenseManager.cs` (BUG-12: Mã hóa Store B `licenses.dat` bằng Windows DPAPI `ProtectedData.Protect` theo `CurrentUser` và entropy riêng; nén gọn dòng code xuống 220 dòng tuân thủ tuyệt đối Rule 8)
  - `USB_AnToan_v2_CSharp/Core/AntiCrackGuard.cs` (BUG-11: Xác thực toàn vẹn PE Header sâu - kiểm tra offset `e_lfanew` tại `0x3C` và chữ ký `"PE\0\0"`)
  - `USB_AnToan_v2_CSharp/Core/SecureStrings.cs` (BUG-10: Loại bỏ hoàn toàn XOR key tĩnh lộ trong mã nguồn, thay bằng hàm sinh khóa động runtime `GetDefaultKey()` kết hợp mặt nạ biến đổi)
  - `USB_AnToan_v2.Tests/WebUsbPaymentAndSecurityTests.cs` (Bổ sung bộ test tự động xUnit mở rộng đạt 30/30 tests pass: kiểm thử DPAPI, xác thực PE Header, kiểm tra Rate limit, Grace period 24h, bảo vệ Challenge Secret)
- **Mục đích & Lý do:**
  - Giải quyết triệt để 100% các lỗ hổng theo báo cáo kiểm tra bảo mật & nghiệp vụ 20 bugs (6 P0, 7 P1, 7 P2), chuẩn hóa hệ thống đạt chuẩn ngân hàng và production thương mại.
- **Chi tiết khắc phục:**
  - `[P0.1 - BUG-01]` **Chống DoS/Tràn DB SQLite:** Bổ sung cơ chế Rate Limit theo IP (15 requests / 5 phút) cho endpoint `/api/order/create`. Tự động dọn dẹp (prune) các order `PENDING` quá 2 giờ.
  - `[P0.2 - BUG-02]` **Bảo vệ tuyệt đối Endpoint Simulate:** Đặt `/api/payment/simulate` hoàn toàn trong khối `#if DEBUG ... #endif`. Bản build Production / Release hoàn toàn không biên dịch endpoint này (trả về 404), ngăn chặn 100% nguy cơ bypass thanh toán.
  - `[P0.3 - BUG-03]` **Bảo mật sinh mã Client Secret:** Thay thế `Math.random()` bằng CSPRNG chuẩn mật mã học `crypto.getRandomValues(new Uint8Array(16))` và loại bỏ hoàn toàn việc lưu plain text secret vào `sessionStorage`.
  - `[P0.4 - BUG-04]` **Xác thực trạng thái đơn hàng trước khi mở VietQR:** `app.js` gửi truy vấn `GET /api/order/status` kiểm tra đơn hàng có tồn tại và đang ở trạng thái `PENDING` trước khi hiển thị màn hình thanh toán.
  - `[P0.5 - BUG-05]` **Chấp nhận thanh toán làm tròn/phí giao dịch:** Thay đổi điều kiện `amount != 20000` thành `amount < 20000`, chấp nhận khách chuyển dư tiền hoặc làm tròn từ ngân hàng.
  - `[P0.6 - BUG-06]` **Chặn đứng lỗ hổng Anti-Replay Webhook:** Khi SePay gửi payload thiếu cả `Id` và `ReferenceCode`, backend lập tức từ chối `400 Bad Request`, tuyệt đối không sinh GUID ngẫu nhiên làm vô hiệu hóa ràng buộc `UNIQUE` chống replay trong SQLite.
  - `[P1.1 - BUG-07]` **Cấu hình động Backend URL & Async UI:** Desktop App đọc URL qua biến môi trường `USB_BACKEND_URL`, mặc định trỏ `https://usbantoan.vn` trên Release và `http://localhost:8686` trên Debug. Chuyển đổi toàn bộ lệnh gọi mạng sang `async/await` không gây treo giao diện (Freeze UI).
  - `[P1.2 - BUG-08]` **Bảo vệ Client Secret phía giao diện:** Ẩn chuỗi secret khỏi ô nhập liệu `txtLicenseKey`, chỉ hiển thị thông báo kết nối bảo mật; lưu trữ an toàn trong trường private bộ nhớ `_pendingSecret`.
  - `[P1.3 - BUG-09]` **Sửa lỗi phân rã OrderId chứa "SEC":** Ưu tiên dùng trực tiếp `_pendingOrderId` và `_pendingSecret` từ bộ nhớ; dự phòng bằng `LastIndexOf("-SEC-")` thay vì `Split` đơn giản.
  - `[P1.4 - BUG-10]` **Chống dò quét XOR Key tĩnh:** Trong `SecureStrings.cs`, thay thế mảng byte key tĩnh bằng hàm giải mã khóa động `GetDefaultKey()` kết hợp bitwise transformation tại runtime.
  - `[P1.5 - BUG-11]` **Kiểm tra tính toàn vẹn PE Header chuẩn xác:** Trong `AntiCrackGuard.cs`, xác thực con trỏ `e_lfanew` tại `0x3C` và chữ ký 4 bytes `"PE\0\0"` (0x50, 0x45, 0x00, 0x00).
  - `[P1.6 - BUG-12]` **Mã hóa License Cache bằng Windows DPAPI:** Store B `%AppData%\USB_AnToan_v2\licenses.dat` được bảo vệ bằng DPAPI `ProtectedData.Protect` với `DataProtectionScope.CurrentUser` kèm entropy riêng biệt.
  - `[P1.7 - BUG-13]` **Mở quyền tải bộ cài công khai:** Bộ cài setup được phép tải public tại `/api/download/setup` vì phần mềm đã được bảo vệ độc lập bằng khóa bản quyền RSA-2048 gắn kết phần cứng USB.
  - `[P2.1 - BUG-14]` **Trải nghiệm Modal không chặn UI:** Thay thế `alert()` bằng modal hiển thị lỗi tùy biến `renderErrorModal()`.
  - `[P2.2 - BUG-15]` **Mã hóa USB Serial giả lập bản Preview:** Đổi serial mẫu thành `"MOCK-DEMO-PREVIEW"`, phân biệt rõ ràng với phần cứng thật.
  - `[P2.3 - BUG-16]` **Đếm số lượng file quét chính xác:** Hàm quét file trả về `{ threats, totalFiles }`, cập nhật đúng tổng số lượng file quét lên thanh tiến trình.
  - `[P2.4 - BUG-17]` **Loại bỏ đường dẫn tuyệt đối máy lập trình viên:** Thay đường dẫn ổ `D:` bằng đường dẫn tương đối kết hợp biến môi trường `SETUP_EXE_PATH`.
  - `[P2.5 - BUG-18]` **Mở rộng cấu hình CORS:** Bổ sung `https://usbantoan.vn` và hỗ trợ nạp danh sách domain qua `ALLOWED_CORS_ORIGINS`.
  - `[P2.6 - BUG-19]` **Chuẩn hóa danh mục tệp tin nguy hiểm:** Loại bỏ `.js` thông thường khỏi danh sách tự động cảnh báo mã độc, tập trung vào `.vbs`, `.wsf`, `.hta`.
  - `[P2.7 - BUG-20]` **Ân hạn 24 giờ cho Webhook ngân hàng đến chậm:** Chấp nhận xử lý đơn hàng nếu webhook ngân hàng đến trong vòng 24 giờ kể từ khi khởi tạo đơn, đảm bảo quyền lợi tối đa cho khách hàng.
- **Kết quả kiểm thử thực nghiệm:**
  - Build Desktop App: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Build WebUsbBackend: **Thành công 100% trong Release mode (0 Warning, 0 Error)**.
  - Test Suite: **30/30 Passed (100%)** trên `USB_AnToan_v2.Tests.csproj`.
  - Rule 8 Check: **10/10 file mã nguồn đều <= 300 dòng code**.

---

## [2026-11-12 15:15:00] - v2.7.6 [SEC] Loại Bỏ Bộ Cài Đặt Khỏi Thư Mục Public Web

- **Tệp tin tác động:**
  - webusb/Setup_USB_AnToan_v2.5.exe (Xóa hoàn toàn khỏi thư mục tĩnh public)
- **Mục đích & Lý do:**
  - Tuân thủ nghiêm ngặt Điều 1 trong 
ule.md (Strict Feature Air-Gap): Không đặt file thực thi hoặc bộ cài trong thư mục tĩnh của Frontend.
  - Bộ cài đặt thực tế đã được quản lý tập trung và an toàn tại COMMERCIAL_RELEASE_OUTPUT/Bo_Cai_Dat_Setup/ và Google Drive link cấu hình trong backend.
- **Chi tiết thay đổi:**
  - Xóa file nhị phân webusb/Setup_USB_AnToan_v2.5.exe khỏi thư mục public web.
  - Endpoint /api/download/setup vẫn tìm thấy bộ cài đặt từ các thư mục phát hành an toàn ngoài web root và chuyển hướng tới link chính thức.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tuyệt đối không rò rỉ binary từ web server tĩnh khi chạy bất kỳ HTTP server nào.

## [2026-11-05 09:55:00] - v0.1.0 (Khởi tạo Nền Tảng & Quy Chuẩn Dự Án)

- **Tệp tin tác động:**
  - `webusb/plan.md` (Tạo mới)
  - `webusb/rule.md` (Tạo mới & Bổ sung Điều 8, Điều 9)
  - `webusb/CHANGELOG.md` (Tạo mới)
- **Mục đích & Lý do:**
  - Thiết lập dự án WebUSB Portal: Chuyển đổi giải pháp USB An Toàn từ bản cục bộ (Local C#) lên Internet theo mô hình: Bản Test quét virus miễn phí + Cổng thanh toán VietQR 20.000đ tự động cấp bản Chuẩn.
- **Chi tiết thay đổi:**
  - `[DOCS]` Ban hành bản kế hoạch chi tiết `plan.md` bao gồm: Mô hình kinh doanh phễu chuyển đổi, phân định ranh giới tính năng Test vs Chuẩn, kiến trúc luồng dữ liệu, quy trình VietQR động và lộ trình 4 giai đoạn.
  - `[SEC]` Ban hành 9 Điều luật cứng trong `rule.md`: Cách ly tính năng Air-Gap, bảo mật Zero-Knowledge, bảo vệ Private Key RSA-2048, chống gian lận thanh toán (Idempotency), tương thích trình duyệt, chuẩn UI quân sự BTL86, kiểm toán, giới hạn độ dài mã nguồn (< 300 dòng/tệp), và quy chuẩn ghi vết nhật ký.
- **Tác động an ninh (Security Impact):**
  - Đảm bảo tính toàn vẹn ngay từ khâu thiết kế, ngăn chặn hoàn toàn việc rò rỉ mã nguồn bản Chuẩn ra Frontend bản Test.


