# 🛠️ SỔ TAY GỠ LỖI & PHÁT TRIỂN NHANH (DEBUG & TROUBLESHOOTING GUIDE)
## HƯỚNG DẪN CHO LẬP TRÌNH VIÊN VÀ AI AGENT ĐỊNH VỊ VÀ SỬA LỖI TRONG 1 PHÚT
**Áp dụng:** Toàn bộ hệ thống WebUSB Portal theo **ĐIỀU 15** trong [rule.md](./rule.md)

---

## 1. BẢNG TỪ ĐIỂN MÃ LỖI CHUẨN HÓA (ERROR TAXONOMY)

Khi màn hình hoặc console xuất hiện mã lỗi, tra cứu ngay tại bảng này:

| Mã Lỗi | Tên Lỗi | Nguyên Nhân Gốc Rễ | Cách Khắc Phục Tức Thì |
| :--- | :--- | :--- | :--- |
| **`ERR_SCAN_001`** | `NOT_SUPPORTED` | Trình duyệt không hỗ trợ File System Access API (Firefox, Safari, Mobile). | Kiểm tra `if ('showDirectoryPicker' in window)`. Hiển thị modal hướng dẫn người dùng mở bằng Google Chrome hoặc Microsoft Edge trên máy tính. |
| **`ERR_SCAN_002`** | `USER_ABORTED` | Người dùng bấm nút "Cancel" khi bảng chọn ổ đĩa hiện lên. | Bắt ngoại lệ `err.name === 'AbortError'`. Trả trạng thái FSM về `IDLE` nhẹ nhàng, không hiển thị lỗi đỏ. |
| **`ERR_SCAN_003`** | `DEVICE_DISCONNECTED`| USB bị rút đột ngột trong khi đang quét tệp tin. | Chuyển FSM sang `ERROR`. Báo thông báo: *"USB đã bị ngắt kết nối. Vui lòng cắm lại và thử lại."* |
| **`ERR_SCAN_004`** | `PERMISSION_DENIED` | Người dùng từ chối quyền đọc/ghi thư mục. | Gọi lại hàm yêu cầu quyền `queryPermission({ mode: 'read' })` và hướng dẫn bấm "Cho phép" (Allow). |
| **`ERR_SCAN_005`** | `INTERNAL_DRIVE_REJECTED` | Người dùng chọn nhầm ổ đĩa cứng nội bộ (C:, D:) của máy tính. | Hệ thống từ chối quét ngay lập tức để bảo đảm an toàn dữ liệu máy tính; hiển thị cảnh báo yêu cầu người dùng cắm và chọn đúng ổ đĩa USB ngoài (E:, F:, G:...). |
| **`ERR_PAY_001`** | `PAYMENT_TIMEOUT` | Quá thời gian chờ chuyển khoản (15 phút) mà chưa thấy tiền về. | Hủy Polling/SSE, chuyển FSM sang `ERROR`. Hiển thị nút *"Thử lại"* để sinh mã giao dịch mới. |
| **`ERR_PAY_002`** | `UNDERPAID_AMOUNT` | Khách chuyển khoản số tiền nhỏ hơn 20.000 VNĐ. | Webhook ghi log cảnh báo; không kích hoạt cấp bản quyền; gửi phản hồi yêu cầu chuyển bù số tiền còn thiếu. |
| **`ERR_PAY_003`** | `INVALID_SYNTAX` | Nội dung chuyển khoản sai cú pháp (không khớp `USB <SERIAL>`). | Webhook đánh dấu giao dịch cần tra soát thủ công (`MANUAL_REVIEW`), không cấp nhầm. |
| **`ERR_LIC_001`** | `PRIVATE_KEY_MISSING`| Backend không tìm thấy file khóa `rsa_private.xml`. | Kiểm tra đường dẫn biến môi trường `RSA_PRIVATE_KEY_PATH` trên Server. |
| **`ERR_LIC_002`** | `SIGN_FAILED` | Lỗi trong quá trình sinh chữ ký số RSA-2048 cho Serial USB. | Kiểm tra tính hợp lệ của chuỗi USB Serial đầu vào (phải là chuỗi hex/alphanumeric hợp lệ). |

---

## 2. CHẾ ĐỘ GIẢ LẬP KIỂM THỬ NHANH (MOCK DEV MODE)

Để Dev hoặc AI Agent có thể kiểm thử toàn bộ luồng giao diện mà **không cần cắm USB thật** và **không cần chuyển 20.000đ thật**:

1. **Bật Mock Mode trong file cấu hình `.env`:**
   ```env
   DEV_MODE=true
   MOCK_SCAN_DELAY_MS=1500
   MOCK_PAYMENT_AUTO_APPROVE=true
   ```
2. **Hành vi khi bật Mock Mode:**
   - Bấm "Quét USB": Tự động sinh dữ liệu giả lập (Phát hiện 12 shortcut `.lnk`, 2 script `.vbs`, 4 file Word bị ẩn) sau 1.5 giây.
   - Bấm "Quẹt QR 20k": Hiển thị mã QR mẫu; sau 3 giây tự động kích hoạt Webhook thanh toán thành công để chuyển sang bước bàn giao phần mềm.

---

## 3. CÁC CẠM BẪY KỸ THUẬT PHỔ BIẾN (COMMON GOTCHAS)

* **Bẫy 1: Quét đệ quy vô tận do Shortcut trỏ vòng lặp:**
  * *Hiện tượng:* Quét mãi không dừng khi gặp folder shortcut lồng nhau.
  * *Khắc phục:* Luôn giới hạn độ sâu tối đa (`maxDepth = 10`) trong hàm `scanner.js`.
* **Bẫy 2: Lỗi CORS khi gọi Webhook:**
  * *Hiện tượng:* Trình duyệt chặn request kiểm tra trạng thái thanh toán.
  * *Khắc phục:* Đảm bảo Backend API cấu hình đúng Header: `Access-Control-Allow-Origin`.
* **Bẫy 3: Đụng độ trạng thái UI (Race Condition):**
  * *Hiện tượng:* Khách nhấp chuột 3 lần liên tiếp vào nút "Quét USB" làm mở 3 hộp thoại chọn thư mục.
  * *Khắc phục:* Luôn kiểm tra `if (currentState !== AppState.IDLE) return;` trước khi thực thi.

---

## 4. CHECKLIST 60 GIÂY CHO AI AGENT TRƯỚC KHI TRẢ CODE

Trước khi thông báo hoàn thành bất kỳ task nào, AI Agent bắt buộc tự rà soát:
- [ ] 1. Tệp có bị quá 300 dòng không? (Nếu quá ➔ Tách module ngay).
- [ ] 2. Hàm có bị quá 50 dòng không?
- [ ] 3. Có khối `catch` nào bị bỏ rỗng không? Có gắn mã lỗi `ERR_xxx` chưa?
- [ ] 4. Có để lộ file thực thi `.exe` của bản Chuẩn ra Frontend không?
- [ ] 5. Đã ghi vết thay đổi vào [CHANGELOG.md](./CHANGELOG.md) chưa?

