# CHÍNH SÁCH BẢO MẬT, ĐIỀU KHOẢN SỬ DỤNG VÀ MIỄN TRỪ TRÁCH NHIỆM
**Hệ Sinh Thái USB An Toàn (BTL86) & WebUSB Portal v3.2.0**  
*Căn cứ Luật An toàn thông tin mạng số 86/2015/QH13 và Nghị định số 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân*

---

## 1. QUYỀN SỞ HỮU TRÍ TUỆ VÀ BẢN QUYỀN
- **Chủ sở hữu tác quyền:** Toàn bộ bản quyền phần mềm máy trạm (Desktop Client C#), bộ cài đặt và cổng chẩn đoán trực tuyến WebUSB Portal thuộc quyền sở hữu trí tuệ của **BUI NAM DONG Senior Dev**.
- **Thông báo bản quyền chính thức:**  
  `Copyright © 2026 BUI NAM DONG Senior Dev. All rights reserved.`
- **Mục đích phát hành:** Dự án được nghiên cứu, phát triển và phát hành miễn phí 100% phục vụ lợi ích cộng đồng, bảo vệ người dùng trước các nguy cơ tấn công mạng qua thiết bị lưu trữ ngoại vi USB tại Việt Nam.

---

## 2. CAM KẾT BẢO VỆ DỮ LIỆU CÁ NHÂN (NGHỊ ĐỊNH 13/2023/NĐ-CP)
Tuân thủ nghiêm ngặt Luật An toàn thông tin mạng số 86/2015/QH13 và Nghị định số 13/2023/NĐ-CP của Chính phủ, chúng tôi cam kết bảo vệ quyền riêng tư tuyệt đối của người dùng theo nguyên tắc **Zero-Knowledge**:

1. **Xử lý hoàn toàn tại máy khách (100% Client-Side Processing):**
   - Quá trình phân tích cấu trúc cây thư mục, nhận diện shortcut độc hại (`.lnk`, `.vbs`, `.wsf`, `.hta`) và kiểm tra thuộc tính file diễn ra trực tiếp trong bộ nhớ RAM của trình duyệt thông qua File System Access API ở chế độ chỉ đọc (`read-only`).
   - Sau khi kết thúc phiên chẩn đoán, toàn bộ cấu trúc dữ liệu tạm trong bộ nhớ RAM máy khách tự động được giải phóng (RAM Zeroing).
2. **Không tải lên máy chủ (Zero File Uploads):**
   - Hệ thống tuyệt đối KHÔNG sao chép, KHÔNG thu thập và KHÔNG tải bất kỳ nội dung tài liệu (Word, Excel, PDF, hình ảnh, mã nguồn) hay siêu dữ liệu nhạy cảm nào của người dùng lên máy chủ mạng.
3. **Không thu thập thông tin định danh & Không Telemetry:**
   - Website và phần mềm không sử dụng cookies theo dõi hành vi, không nhúng mã phân tích (analytics/tracking), không thu thập địa chỉ IP nhằm mục đích thương mại và không hiển thị quảng cáo rác của bên thứ ba.

---

## 3. ĐIỀU KHOẢN SỬ DỤNG (TERMS OF SERVICE)
Khi tải về, cài đặt ứng dụng hoặc sử dụng cổng chẩn đoán WebUSB Portal, người dùng đồng ý với các điều khoản sau:

1. **Quyền sử dụng:**
   - Người dùng cá nhân, cơ quan, tổ chức, trường học được quyền sử dụng toàn bộ tính năng của USB An Toàn và WebUSB Portal hoàn toàn miễn phí.
2. **Hành vi bị nghiêm cấm:**
   - Nghiêm cấm sử dụng mã nguồn, giải pháp bảo vệ hoặc công cụ của dự án để phát tán phần mềm độc hại, can thiệp trái phép vào hệ thống thông tin của tổ chức, cá nhân khác vi phạm Điều 8 Luật An toàn thông tin mạng.
   - Nghiêm cấm mạo danh tác giả hoặc thương hiệu USB An Toàn BTL86 nhằm mục đích lừa đảo, trục lợi.

---

## 4. TUYÊN BỐ MIỄN TRỪ TRÁCH NHIỆM (DISCLAIMER)
1. **Nguyên tắc phát hành "Nguyên trạng" (As-Is):**
   - Phần mềm và công cụ trực tuyến được cung cấp theo nguyên tắc "nguyên trạng" mà không có bất kỳ sự bảo đảm nào, dù rõ ràng hay ngầm định, về sự phù hợp cho một mục đích cụ thể ngoài phạm vi phòng ngừa và cứu hộ USB an toàn.
2. **Giới hạn trách nhiệm vật lý và dữ liệu cũ:**
   - Tác giả **BUI NAM DONG Senior Dev** không chịu trách nhiệm đối với các lỗi vật lý sẵn có của USB (như hỏng chip nhớ Flash NAND, lỗi IC Controller, bad sector do thiết bị đã quá niên hạn sử dụng) hoặc các tệp tin đã bị virus phá hủy/ghi đè vĩnh viễn trước thời điểm chạy phần mềm.
3. **Khuyến nghị an toàn:**
   - Người dùng có trách nhiệm chủ động sao lưu các tài liệu quan trọng sang ít nhất hai thiết bị lưu trữ độc lập để đảm bảo an toàn dữ liệu tuyệt đối.

---

## 5. ĐẦU MỐI LIÊN HỆ & BÁO CÁO LỖ HỔNG
Mọi phản hồi kỹ thuật, đề xuất tính năng hoặc thông báo lỗ hổng bảo mật (Vulnerability Disclosure) xin vui lòng gửi về:
- **Tác giả:** BUI NAM DONG Senior Dev
- **Dự án:** USB An Toàn (BTL86) & WebUSB Portal
- **Ủng hộ quỹ máy chủ & cà phê:** STK `0779356619` (MB Bank) - BUI NAM DONG
