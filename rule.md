# 📜 LUẬT CỨNG PHÁT TRIỂN HỆ THỐNG WEBUSB (DEVELOPMENT RULES)
## CÁC QUY TẮC BẮT BUỘC TUÂN THỦ TRONG MỌI DÒNG CODE VÀ KIẾN TRÚC
**Dự án:** WebUSB Portal — Bản Test Quét Mã Độc & Thu Phí Kích Hoạt 20k  
**Phạm vi áp dụng:** Toàn bộ mã nguồn Frontend, Backend API, Webhook và Packaging  

---

### ĐIỀU 1: NGUYÊN TẮC CÁCH LY TUYỆT ĐỐI (STRICT FEATURE AIR-GAP)
1. **Bản Test chạy trên Web tuyệt đối KHÔNG chứa mã nguồn tạo USB An Toàn:**
   - Frontend công khai chỉ chứa logic **READ-ONLY** (đọc cây thư mục, đếm file `.lnk`, phát hiện `.vbs`, kiểm tra cờ ẩn).
   - Tuyệt đối không nhúng file thực thi `USB_AnToan_v2.5.exe`, bộ cài `Setup_USB_AnToan_v2.5.exe`, hoặc mã nguồn tạo phân vùng NTFS vào thư mục public của Web.
   - Người dùng soi `F12 / Developer Tools / Network Tab` tuyệt đối không thể trích xuất được bản Chuẩn hay công cụ tạo USB an toàn.
2. **Bản Chuẩn chỉ được mở khóa từ Backend sau khi xác thực thanh toán hợp lệ.**

---

### ĐIỀU 2: NGUYÊN TẮC BẢO MẬT DỮ LIỆU ZERO-KNOWLEDGE (DATA PRIVACY)
1. **Không tải trộm tệp của người dùng lên Server:**
   - Trình duyệt chỉ phân tích tên tệp, phần mở rộng, kích thước tệp trực tiếp trong RAM của máy khách.
   - Nghiêm cấm mọi hành vi upload nội dung tệp Word, Excel, PDF, ảnh hoặc dữ liệu riêng tư của người dùng lên máy chủ.
   - Luôn duy trì uy tín bảo mật cao nhất của đơn vị An toàn thông tin quân sự BTL86.

---

### ĐIỀU 3: BẢO VỆ KHÓA BÍ MẬT RSA-2048 (PRIVATE KEY PROTECTION)
1. **Vị trí lưu trữ `rsa_private.xml`:**
   - Tệp `rsa_private.xml` **chỉ được phép tồn tại trên môi trường Server Backend**, cấm tuyệt đối đưa vào thư mục tĩnh của Frontend hoặc commit lên kho mã nguồn công khai (Public Git).
   - Mã hóa hoặc bảo vệ bằng biến môi trường (Environment Variable) khi triển khai thực tế.
2. **Frontend chỉ biết kết quả xác thực:**
   - Frontend chỉ nhận chuỗi giấy phép (License String) đã được ký số hoặc tệp `.sec_license` sau khi thanh toán hoàn tất.

---

### ĐIỀU 4: NGUYÊN TẮC THANH TOÁN VÀ CHỐNG GIAN LẬN (PAYMENT INTEGRITY)
1. **Kiểm tra chặt chẽ Webhook (Strict Verification):**
   - Webhook nhận từ cổng thanh toán (SePay/PayOS) bắt buộc phải kiểm tra chữ ký xác thực (Signature/API Key).
   - Kiểm tra chính xác số tiền chuyển khoản: `Amount >= 20000 VNĐ`.
   - Kiểm tra chính xác cú pháp nội dung chuyển khoản: Bắt buộc khớp với mã `USB <SERIAL>`.
2. **Chống Replay Attack & Cấp trùng lặp (Idempotency):**
   - Mỗi mã giao dịch ngân hàng (`transaction_id`) chỉ được phép xử lý cấp bản quyền đúng **1 lần duy nhất**.
   - Lưu trạng thái giao dịch vào cơ sở dữ liệu/cache để từ chối các webhook gửi lại nhiều lần.
3. **Ràng buộc phần cứng 1:1:**
   - Mỗi lần quét 20k chỉ cấp bản quyền cho duy nhất **1 USB Serial Number**. Cắm USB khác vào bắt buộc phải thanh toán lượt mới.

---

### ĐIỀU 5: TƯƠNG THÍCH TRÌNH DUYỆT & XỬ LÝ LỖI (COMPATIBILITY & UX)
1. **Kiểm tra hỗ trợ File System Access API:**
   - Phải kiểm tra điều kiện `if ('showDirectoryPicker' in window)` trước khi cho người dùng bấm nút quét.
   - Nếu người dùng truy cập bằng Firefox, Safari hoặc điện thoại di động: Phải hiển thị thông báo hướng dẫn rõ ràng: *"Vui lòng mở website trên máy tính bằng Google Chrome, Microsoft Edge hoặc Cốc Cốc để quét ổ USB."*
2. **Xử lý an toàn khi người dùng hủy thao tác:**
   - Bắt trọn vẹn ngoại lệ `AbortError` khi người dùng bấm nút "Cancel" lúc chọn ổ đĩa, không để sập giao diện hoặc báo lỗi màu đỏ gây hoang mang.
   - Xử lý kịch bản người dùng rút USB đột ngột trong khi đang quét.

---

### ĐIỀU 6: QUY CHUẨN THIẾT KẾ GIAO DIỆN (UI/UX MILITARY ATTT STANDARD)
1. **Phong cách giao diện:**
   - Thiết kế hiện đại nhưng nghiêm túc, mang bản sắc An toàn thông tin quân sự (BTL86): Tông màu chủ đạo Xanh hải quân (Navy/Slate), Xanh lá an toàn (Emerald/Green), Đỏ cảnh báo nguy hiểm (Rose/Red).
   - Biểu tượng lá chắn `🛡️`, ổ khóa `🔐`, trạng thái quét rõ ràng, minh bạch.
2. **Trải nghiệm thanh toán:**
   - Popup mã VietQR phải hiển thị sắc nét, có nút *"Sao chép số tài khoản"*, *"Sao chép nội dung"*, *"Sao chép số tiền"* để người dùng chuyển khoản thủ công nếu không quét được camera.
   - Hiển thị đồng hồ đếm ngược chờ thanh toán (Timeout 10-15 phút) và trạng thái kết nối thời gian thực.

---

### ĐIỀU 7: KIỂM TOÁN VÀ GHI NHẬT KÝ (AUDIT TRAIL)
1. Mọi giao dịch 20.000đ thành công hoặc thất bại đều phải được ghi log: Thời gian, IP, Mã Serial USB, Số tiền, Mã giao dịch ngân hàng.
2. Không lưu trữ thông tin tài khoản ngân hàng nhạy cảm của khách hàng ngoài các trường do Webhook ngân hàng công khai.

---

### ĐIỀU 8: GIỚI HẠN ĐỘ DÀI & QUY CHUẨN MODULAR HÓA MÃ NGUỒN (CODE LENGTH CONSTRAINTS)
1. **Giới hạn độ dài tệp tin (File Length Limit):**
   - Mỗi tệp mã nguồn (`.js`, `.ts`, `.cs`, `.html`, `.css`) **tối đa không quá 300 dòng**.
   - Nếu tệp vượt quá 300 dòng, bắt buộc phải tách (refactor) thành các sub-module độc lập.
   - Nghiêm cấm tuyệt đối việc tạo ra các "God Files" (tệp khổng lồ ôm đồm toàn bộ chức năng).
2. **Giới hạn độ dài hàm/phương thức (Function / Method Length Limit):**
   - Mỗi hàm/phương thức **tối đa không quá 40 - 50 dòng**.
   - Tuân thủ nghiêm ngặt nguyên lý Đơn nhiệm (Single Responsibility Principle - SRP): Mỗi hàm chỉ thực hiện đúng một nhiệm vụ duy nhất và rõ ràng.
3. **Giới hạn độ dài dòng code (Line Length Limit):**
   - Mỗi dòng code **tối đa 120 ký tự**. Không viết code cuộn ngang dài dòng; phải chủ động ngắt dòng hợp lý để thuận tiện cho việc kiểm toán an ninh và review git diff.
4. **Giới hạn độ sâu lồng nhau (Nesting Depth & Complexity):**
   - Độ sâu lồng khối logic (`if / else / for / try`) **không vượt quá 3 cấp**.
   - Bắt buộc áp dụng mẫu hình **Guard Clauses / Fail-Fast** (kiểm tra điều kiện lỗi và return sớm) để mã nguồn phẳng, dễ đọc, tránh bẫy lỗi logic.
5. **Cấu trúc module hóa bắt buộc (Modular Architecture):**
   - Tách biệt rõ ràng các tầng trách nhiệm:
     * `scanner.js`: Chuyên trách quét USB và phân tích mối nguy hại.
     * `vietqr.js`: Chuyên trách sinh mã VietQR và kiểm tra trạng thái thanh toán.
     * `ui.js`: Chuyên trách cập nhật giao diện, animation, thông báo.
     * `api.js`: Chuyên trách gọi các endpoint backend.
   - Không được viết gộp toàn bộ logic vào một tệp `index.html` hoặc `main.js` khổng lồ.

---

### ĐIỀU 9: QUY CHUẨN GHI NHẬT KÝ THAY ĐỔI MÃ NGUỒN (CHANGE LOGGING & TRACEABILITY)
1. **Duy trì tệp nhật ký thay đổi trung tâm (`webusb/CHANGELOG.md`):**
   - Mọi thao tác thêm mới (`Added`), chỉnh sửa (`Changed`), sửa lỗi (`Fixed`), hoặc vá bảo mật (`Security`) đều **bắt buộc phải ghi lại vào `CHANGELOG.md`** ngay trong lượt thay đổi đó.
   - Không được phép sửa code mà không cập nhật nhật ký tương ứng.
2. **Cấu trúc bản ghi nhật ký bắt buộc:**
   Mỗi lần thay đổi code phải ghi rõ các trường:
   - `Thời gian & Phiên bản`: Định dạng `[YYYY-MM-DD HH:mm:ss] - vX.Y.Z`
   - `Tệp tin tác động`: Đường dẫn tệp bị sửa đổi hoặc tạo mới.
   - `Mục đích & Lý do`: Tại sao phải thay đổi (Yêu cầu tính năng / Vá lỗi / Tối ưu).
   - `Chi tiết thay đổi`: Danh sách bullet point mô tả chính xác nội dung thay đổi.
   - `Tác động an ninh (Security Impact)`: Đánh giá xem thay đổi có ảnh hưởng đến logic quét, thanh toán QR, hay bảo mật RSA không.
3. **Quy chuẩn thông điệp thay đổi (Conventional Change Tags):**
   Mỗi mục thay đổi phải gắn tiền tố chuẩn hóa:
   - `[FEAT]`: Thêm tính năng mới.
   - `[FIX]`: Sửa lỗi phát sinh hoặc ngoại lệ.
   - `[SEC]`: Thay đổi liên quan đến bảo mật, thanh toán VietQR, chữ ký số RSA.
   - `[REFACTOR]`: Tái cấu trúc, tối ưu độ dài, chia nhỏ hàm/tệp mà không đổi logic.
   - `[DOCS]`: Cập nhật tài liệu, hướng dẫn, quy tắc.
4. **Nguyên tắc "No Silent Changes" (Tuyệt đối không sửa ngầm):**
   - Nghiêm cấm mọi hành vi âm thầm thay đổi logic kiểm tra bản quyền, số tiền thanh toán (20.000đ), hoặc logic lọc virus mà không có bản ghi log tương ứng.

---

### ĐIỀU 10: QUY CHUẨN MÁY TRẠNG THÁI HỮU HẠN (FINITE STATE MACHINE - FSM)
1. **Kiểm soát luồng hoạt động bằng trạng thái duy nhất:**
   - Toàn bộ trạng thái giao diện và vòng đời ứng dụng bắt buộc được quản lý bằng một biến trạng thái duy nhất (`AppState`).
   - Nghiêm cấm sử dụng các biến cờ `boolean` rời rạc (`isScanning`, `isPaid`, `isError`) gây xung đột trạng thái (Race Condition).
2. **Tập hợp trạng thái chuẩn hóa (Valid States):**
   - `IDLE`: Chờ người dùng cắm USB và bấm nút quét.
   - `SCANNING`: Đang quét phân tích cây thư mục USB.
   - `THREAT_REPORT`: Quét xong, hiển thị báo cáo mối nguy hại và nút bấm nâng cấp 20k.
   - `QR_PENDING`: Đang hiển thị mã VietQR 20.000đ và chờ tín hiệu thanh toán từ ngân hàng.
   - `PAYMENT_VERIFIED`: Đã nhận đủ 20.000đ từ webhook ngân hàng.
   - `PROVISIONING`: Đang thực hiện cấp bản quyền RSA và khởi tạo USB An Toàn.
   - `COMPLETED`: Khởi tạo hoàn tất, thông báo người dùng sẵn sàng sử dụng.
   - `ERROR`: Xảy ra sự cố (hủy cấp quyền, rút USB đột ngột, lỗi mạng), hiển thị thông báo an toàn.
3. **Khóa thao tác tương tác (Interaction Lock):**
   - Khi ở trạng thái `SCANNING`, `QR_PENDING`, hoặc `PROVISIONING`, toàn bộ nút bấm kích hoạt khác phải tự động chuyển sang chế độ vô hiệu hóa (`disabled`) để chống hành vi nhấp đúp chuột liên tục.

---

### ĐIỀU 11: NGUYÊN TẮC LẬP TRÌNH PHÒNG VỆ & BỘ NHỚ (DEFENSIVE & MEMORY HYGIENE)
1. **Xử lý lỗi có ngữ cảnh (Contextual Error Handling):**
   - Mọi hàm bất đồng bộ (`async / await`) bắt buộc phải bọc trong khối `try-catch`.
   - Nghiêm cấm tuyệt đối hành vi "nuốt lỗi" (`catch (e) {}` rỗng).
   - Bắt buộc phân loại ngoại lệ:
     * `AbortError`: Người dùng bấm Cancel trong hộp thoại chọn ổ đĩa ➔ Trở về `IDLE` nhẹ nhàng.
     * `NotFoundError`: Rút USB đột ngột trong khi đang thao tác ➔ Chuyển sang `ERROR` với cảnh báo: *"USB đã bị ngắt kết nối"*.
     * `SecurityError`: Trình duyệt từ chối cấp quyền ghi ➔ Hướng dẫn cấp quyền.
2. **Bảo vệ bộ nhớ RAM khi quét USB dung lượng lớn (Memory Streaming):**
   - Khi duyệt thư mục chứa hàng chục nghìn tệp tin, không được nạp toàn bộ danh sách tệp vào một mảng khổng lồ trong RAM.
   - Sử dụng cơ chế luồng lặp bất đồng bộ (`Async Generator / for await`) để duyệt tệp dạng phân đoạn (Chunking).
3. **Kiểm soát tần suất cập nhật giao diện (UI Throttling):**
   - Không gọi lệnh cập nhật DOM giao diện sau từng tệp đơn lẻ (gây nghẽn luồng render 60fps của trình duyệt).
   - Bắt buộc áp dụng cơ chế điều tiết (Throttle): Cập nhật thanh tiến trình tối đa 1 lần mỗi 100ms hoặc sau mỗi 50 tệp tin quét được.

---

### ĐIỀU 12: QUY CHUẨN CẤU HÌNH 12-FACTOR & TÁCH BIỆT MÔI TRƯỜNG (.ENV ISOLATION)
1. **Tuyệt đối không hardcode thông tin nhạy cảm vào mã nguồn:**
   - Số tài khoản ngân hàng, tên chủ tài khoản, mã ngân hàng (Bin code).
   - API Key / Webhook Secret của cổng thanh toán SePay / PayOS.
   - Khóa riêng tư `rsa_private.xml`.
2. **Tách biệt tệp cấu hình môi trường:**
   - Dùng tệp `.env` để cấu hình biến môi trường trên máy chủ/local.
   - Cung cấp tệp mẫu `.env.example` với các giá trị mẫu để hướng dẫn triển khai.
3. **Hỗ trợ 2 chế độ vận hành (Runtime Environments):**
   - `DEV_MODE=true`: Kích hoạt chế độ giả lập (Mocking): Cho phép quét USB dữ liệu mẫu và giả lập thanh toán 20k thành công để phục vụ kiểm thử nhanh mà không cần cắm USB thật hay chuyển tiền thật.
   - `PROD_MODE=true`: Bật chế độ thương mại thật: Kết nối ngân hàng thật, quét ổ đĩa thật.

---

### ĐIỀU 13: QUY ƯỚC ĐẶT TÊN TỰ MINH HỌA (SELF-DOCUMENTING CODE & NAMING)
1. **Quy tắc từ ngữ rõ nghĩa nghiệp vụ:**
   - Nghiêm cấm đặt tên biến/hàm mơ hồ: `temp`, `data`, `res`, `flag`, `x`, `run()`.
   - Phải đặt tên rõ nghĩa:
     * `usbDirectoryHandle`: Con trỏ thư mục gốc USB.
     * `detectedThreatsCount`: Số lượng mã độc phát hiện.
     * `vietQrTransactionId`: Mã giao dịch VietQR ngân hàng.
     * `verifyPaymentStatusAsync()`: Hàm kiểm tra thanh toán bất đồng bộ.
2. **Quy tắc hàm Boolean:**
   - Mọi hàm hoặc biến mang giá trị đúng/sai bắt buộc phải bắt đầu bằng: `is`, `has`, `should`, `can` (ví dụ: `isFileSystemSupported`, `hasDangerousScripts`, `shouldPromptUpgrade`).
3. **Quy tắc chữ hoa/thường:**
   - `camelCase`: Cho biến, thuộc tính đối tượng, tên hàm (`scanDirectoryAsync`, `activeSession`).
   - `PascalCase`: Cho Class, Component, Interface (`ThreatScanner`, `VietQrModal`).
   - `UPPER_SNAKE_CASE`: Cho hằng số, mã lỗi, trạng thái FSM (`APP_STATE_SCANNING`, `PRICE_VND = 20000`).

---

### ĐIỀU 14: TIÊU CHUẨN HOÀN THÀNH MỌI TÍNH NĂNG (DEFINITION OF DONE - DOD)
Một tính năng chỉ được coi là hoàn tất và sẵn sàng phát hành khi thỏa mãn đầy đủ Bảng kiểm chuẩn 5 bước:
- [ ] **1. Giới hạn mã nguồn (Code Constraints):** File $\le$ 300 dòng, hàm $\le$ 50 dòng, lồng $\le$ 3 cấp (theo Điều 8).
- [ ] **2. Cách ly an toàn (Air-Gap Check):** Không để lộ binary bản Chuẩn hay Private Key ra client (theo Điều 1, 3).
- [ ] **3. An toàn ngoại lệ (Error Safety):** Đã kiểm thử kịch bản bấm Cancel và rút USB đột ngột (theo Điều 11).
- [ ] **4. Tương thích đa trình duyệt (Cross-Browser):** Đã kiểm thử mượt mà trên Chrome, Edge, Cốc Cốc (theo Điều 5).
- [ ] **5. Nhật ký thay đổi (Changelog Audit):** Đã cập nhật đầy đủ thông tin vào `webusb/CHANGELOG.md` (theo Điều 9).

---

### ĐIỀU 15: QUY TẮC TỐI ƯU CHO DEV & AI AGENT (AGENTIC & DEVELOPER ERGONOMICS)
1. **Bắt buộc dùng Header Neo Ngữ Cảnh (File Context Anchor):**
   - 5 dòng đầu tiên của mọi tệp mã nguồn (`.js`, `.ts`, `.cs`) bắt buộc chứa khối chú thích:
     * `@file`: Tên tệp.
     * `@module`: Phân hệ trách nhiệm.
     * `@description`: Tóm tắt chức năng trong 1 câu ngắn gọn.
     * `@stateDepends`: Phụ thuộc trạng thái FSM nào.
     * `@security`: Giới hạn an ninh bắt buộc.
2. **Chuẩn hóa Hợp đồng Kiểu Dữ liệu (Strict JSDoc Contracts):**
   - Mọi hàm xuất khẩu (`export function`) bắt buộc khai báo đầy đủ JSDoc: `@param`, `@returns`, `@throws` kèm mã lỗi cụ thể.
   - Nghiêm cấm viết hàm mà không chỉ rõ kiểu dữ liệu tham số đầu vào.
3. **Hệ thống Mã Lỗi Tra Cứu Tức Thì (Error Taxonomy):**
   - Mọi ngoại lệ bắt buộc ném ra mã lỗi chuẩn hóa định dạng `ERR_<MODULE>_<SỐ>` (ví dụ: `ERR_SCAN_001`, `ERR_PAY_002`).
   - Nghiêm cấm thông báo lỗi chung chung không có mã tra cứu.
4. **Quy trình Gỡ Lỗi 4 Bước Bắt Buộc (4-Step RCA Protocol):**
   - Khi fix bug, Dev và AI Agent bắt buộc tuân theo:
     * Bước 1: Tra cứu mã lỗi trong `webusb/DEBUG_GUIDE.md` và kiểm tra trạng thái FSM hiện tại.
     * Bước 2: Kiểm tra tính bất biến (không phá vỡ 14 Điều luật an ninh trước đó).
     * Bước 3: Sửa lỗi cục bộ (Minimal Patch), không sửa lan man sang module khác.
     * Bước 4: Cập nhật nhật ký nguyên nhân và giải pháp vào `webusb/CHANGELOG.md`.




