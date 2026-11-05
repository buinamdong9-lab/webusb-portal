// ============================================================================
// @file Models.cs
// @module WebUsbBackend/Models
// @description Định nghĩa các mô hình DTO nhận Webhook thanh toán và Redeem Token.
// @stateDepends None
// @security Kiểm soát chặt chẽ các trường dữ liệu thanh toán VietQR và bản quyền số RSA.
// ============================================================================

namespace WebUsbBackend
{
    public class SePayWebhookDto
    {
        public long Id { get; set; }
        public string? Gateway { get; set; }
        public string? TransactionDate { get; set; }
        public string? AccountNumber { get; set; }
        public string? Code { get; set; }
        public string? Content { get; set; }
        public string? TransferType { get; set; }
        public decimal TransferAmount { get; set; }
        public string? ReferenceCode { get; set; }
        public string? Description { get; set; }
    }

    public class CreateOrderRequest
    {
        public string? UsbSerial { get; set; }
        public string? ClientSecret { get; set; }
    }

    public class RedeemRequest
    {
        public string? OrderId { get; set; }
        public string? ClientSecret { get; set; }
        public string? UsbSerial { get; set; }
        public string? RedeemToken { get; set; }
    }

    public class MockPaymentRequest
    {
        public string? OrderId { get; set; }
        public string? UsbSerial { get; set; }
        public decimal Amount { get; set; } = 20000;
    }
}
