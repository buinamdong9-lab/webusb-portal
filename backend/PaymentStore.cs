// ============================================================================
// @file PaymentStore.cs
// @module WebUsbBackend/PaymentStore
// @description Quản lý phiên thanh toán SQLite, Client Secret Challenge & Token Redeem.
// @stateDepends None
// @security ACID Transaction, Client Secret Challenge, chống Replay Attack, Token 24h.
// ============================================================================

using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.Data.Sqlite;

namespace WebUsbBackend;

public class ActivationOrder
{
    public string OrderId { get; set; } = "";
    public string UsbSerial { get; set; } = "";
    public string? ClientSecret { get; set; }
    public string? ClientSecretHash { get; set; }
    public int Amount { get; set; } = 20000;
    public string Status { get; set; } = "PENDING";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAt { get; set; } = DateTime.UtcNow.AddMinutes(15);
    public string? TransactionId { get; set; }
    public string? LicenseKey { get; set; } public string? LicensePayload { get; set; }
}

public class PaymentStore
{
    private readonly string _connectionString;
    private readonly LicenseSigner _signer;
    private readonly string _expectedAccount;

    public PaymentStore(LicenseSigner signer, IConfiguration config)
    {
        _signer = signer;
        string? envAccount = Environment.GetEnvironmentVariable("BANK_ACCOUNT_NUMBER");
        _expectedAccount = !string.IsNullOrWhiteSpace(envAccount) ? envAccount.Trim() : (config["WebUsbSettings:AccountNumber"] ?? "");
        _connectionString = $"Data Source={Path.Combine(AppContext.BaseDirectory, "payments.db")}";
        InitializeDatabase();
    }

    private void InitializeDatabase()
    {
        using var conn = new SqliteConnection(_connectionString);
        conn.Open();
        try { using var walCmd = new SqliteCommand("PRAGMA journal_mode=WAL;", conn); walCmd.ExecuteNonQuery(); } catch { }
        string sql = @"CREATE TABLE IF NOT EXISTS activation_orders (order_id TEXT PRIMARY KEY, usb_serial TEXT NOT NULL, usb_serial_hash TEXT NOT NULL, client_secret_hash TEXT, amount INTEGER NOT NULL, status TEXT NOT NULL, created_at TEXT NOT NULL, expires_at TEXT NOT NULL, transaction_id TEXT UNIQUE, paid_at TEXT, token_expires_at TEXT, redeemed_at TEXT, license_key TEXT, license_payload TEXT);";
        using var cmd = new SqliteCommand(sql, conn);
        cmd.ExecuteNonQuery();
        try { new SqliteCommand("ALTER TABLE activation_orders ADD COLUMN client_secret_hash TEXT;", conn).ExecuteNonQuery(); } catch { }
    }

    public ActivationOrder CreateOrder(string usbSerial, string? clientSecret = null, int amount = 20000)
    {
        string cleanSerial = (usbSerial ?? "USB86").Trim().ToUpper();
        string orderId = GenerateOrderId();
        string secret = string.IsNullOrWhiteSpace(clientSecret) ? "SEC-" + Guid.NewGuid().ToString("N").ToUpper() : clientSecret.Trim();
        string secretHash = ComputeHash(secret);
        var now = DateTime.UtcNow;
        var expiresAt = now.AddMinutes(15);

        using var conn = new SqliteConnection(_connectionString);
        conn.Open();

        // Dọn dẹp đơn hàng PENDING rác quá hạn > 2 giờ trên cùng kết nối (BUG-R03)
        if (Random.Shared.Next(0, 10) == 0)
        {
            using var pruneCmd = new SqliteCommand("DELETE FROM activation_orders WHERE status = 'PENDING' AND expires_at < datetime('now', '-2 hours');", conn);
            try { pruneCmd.ExecuteNonQuery(); } catch { }
        }

        using var cmd = new SqliteCommand(@"
            INSERT INTO activation_orders (order_id, usb_serial, usb_serial_hash, client_secret_hash, amount, status, created_at, expires_at)
            VALUES (@orderId, @serial, @hash, @secretHash, @amount, 'PENDING', @createdAt, @expiresAt);
        ", conn);
        cmd.Parameters.AddWithValue("@orderId", orderId);
        cmd.Parameters.AddWithValue("@serial", cleanSerial);
        cmd.Parameters.AddWithValue("@hash", ComputeHash(cleanSerial));
        cmd.Parameters.AddWithValue("@secretHash", secretHash);
        cmd.Parameters.AddWithValue("@amount", amount);
        cmd.Parameters.AddWithValue("@createdAt", now.ToString("o"));
        cmd.Parameters.AddWithValue("@expiresAt", expiresAt.ToString("o"));
        cmd.ExecuteNonQuery();

        return new ActivationOrder
        {
            OrderId = orderId, UsbSerial = cleanSerial, ClientSecret = secret,
            ClientSecretHash = secretHash, Amount = amount, Status = "PENDING",
            CreatedAt = now, ExpiresAt = expiresAt
        };
    }

    public ActivationOrder? GetOrder(string orderId)
    {
        using var conn = new SqliteConnection(_connectionString);
        conn.Open();
        using var cmd = new SqliteCommand("SELECT * FROM activation_orders WHERE order_id = @id;", conn);
        cmd.Parameters.AddWithValue("@id", orderId.Trim().ToUpper());
        using var reader = cmd.ExecuteReader();
        return reader.Read() ? MapOrderFromReader(reader) : null;
    }

    public bool TryProcessWebhook(string transactionId, string content, decimal amount, string? accountNumber, string? transferType, out ActivationOrder? order, out string failureReason)
    {
        order = null; failureReason = "";
        if (!string.Equals(transferType, "in", StringComparison.OrdinalIgnoreCase)) { failureReason = "TransferType != in"; return false; }
        if (amount < 20000) { failureReason = $"Số tiền chuyển không đủ 20.000đ: {amount:N0}đ"; return false; }

        string cleanTarget = Regex.Replace(accountNumber ?? "", @"\D", "");
        string cleanExpected = Regex.Replace(_expectedAccount, @"\D", "");
        if (string.IsNullOrEmpty(cleanTarget) || !string.Equals(cleanTarget, cleanExpected, StringComparison.OrdinalIgnoreCase))
        {
            failureReason = $"Số tài khoản nhận không hợp lệ hoặc không khớp tài khoản MB {_expectedAccount} (nhận được: '{accountNumber}')";
            return false;
        }

        string? orderId = ExtractOrderIdFromContent(content);
        if (string.IsNullOrEmpty(orderId)) { failureReason = "Thiếu mã đơn hàng USB"; return false; }

        using var conn = new SqliteConnection(_connectionString);
        conn.Open();
        using var tx = conn.BeginTransaction();
        try
        {
            using var chkCmd = new SqliteCommand("SELECT * FROM activation_orders WHERE transaction_id = @txId;", conn, tx);
            chkCmd.Parameters.AddWithValue("@txId", transactionId);
            using var chkReader = chkCmd.ExecuteReader();
            if (chkReader.Read())
            {
                order = MapOrderFromReader(chkReader);
                chkReader.Close();
                tx.Rollback();
                failureReason = $"Giao dịch {transactionId} đã xử lý";
                return false;
            }
            chkReader.Close();

            using var findCmd = new SqliteCommand("SELECT * FROM activation_orders WHERE order_id = @id AND status = 'PENDING';", conn, tx);
            findCmd.Parameters.AddWithValue("@id", orderId);
            using var reader = findCmd.ExecuteReader();
            if (!reader.Read()) { failureReason = $"Đơn hàng {orderId} không hợp lệ hoặc không ở trạng thái chờ"; tx.Rollback(); return false; }
            order = MapOrderFromReader(reader);
            reader.Close();

            if (DateTime.UtcNow > order.ExpiresAt.AddHours(24)) { failureReason = $"Đơn hàng {orderId} đã quá hạn đối soát (> 24 giờ)"; tx.Rollback(); return false; }

            string regCode = _signer.GenerateRegistrationCode(order.UsbSerial);
            string licenseKey = _signer.SignRegistrationCode(regCode);
            string payload = _signer.GenerateLicenseFilePayload(regCode, licenseKey);

            using var updCmd = new SqliteCommand(@"UPDATE activation_orders SET status = 'PAID', transaction_id = @txId, paid_at = @paidAt, token_expires_at = @tokenExp, license_key = @licKey, license_payload = @payload WHERE order_id = @id;", conn, tx);
            updCmd.Parameters.AddWithValue("@txId", transactionId);
            updCmd.Parameters.AddWithValue("@paidAt", DateTime.UtcNow.ToString("o"));
            updCmd.Parameters.AddWithValue("@tokenExp", DateTime.UtcNow.AddHours(24).ToString("o"));
            updCmd.Parameters.AddWithValue("@licKey", licenseKey);
            updCmd.Parameters.AddWithValue("@payload", payload);
            updCmd.Parameters.AddWithValue("@id", orderId);
            updCmd.ExecuteNonQuery();

            tx.Commit();
            order.Status = "PAID";
            order.LicenseKey = licenseKey;
            order.LicensePayload = payload;
            return true;
        }
        catch (Exception ex) { tx.Rollback(); failureReason = ex.Message; return false; }
    }

    public bool TryRedeemWithSecret(string orderId, string clientSecret, string? usbSerial, out string? licenseKey, out string? licensePayload, out string? serialOut, out string failureReason)
    {
        licenseKey = null; licensePayload = null; serialOut = null; failureReason = "";
        if (string.IsNullOrWhiteSpace(orderId) || string.IsNullOrWhiteSpace(clientSecret))
        {
            failureReason = "Thiếu Order ID hoặc Client Secret"; return false;
        }

        string cleanOrderId = orderId.Trim().ToUpper();
        string expectedSecretHash = ComputeHash(clientSecret.Trim());
        using var conn = new SqliteConnection(_connectionString);
        conn.Open();
        using var tx = conn.BeginTransaction();

        using var cmd = new SqliteCommand("SELECT order_id, usb_serial, client_secret_hash, license_key, license_payload, token_expires_at, status FROM activation_orders WHERE order_id = @id;", conn, tx);
        cmd.Parameters.AddWithValue("@id", cleanOrderId);
        using var reader = cmd.ExecuteReader();
        if (!reader.Read()) { tx.Rollback(); failureReason = "Đơn hàng không tồn tại"; return false; }

        int ordStatus = reader.GetOrdinal("status");
        int ordSecret = reader.GetOrdinal("client_secret_hash");
        int ordExp = reader.GetOrdinal("token_expires_at");
        int ordSerial = reader.GetOrdinal("usb_serial");
        int ordLicKey = reader.GetOrdinal("license_key");
        int ordLicPayload = reader.GetOrdinal("license_payload");

        // Xác thực Secret TRƯỚC TIÊN bằng constant-time so sánh để chống rò rỉ trạng thái đơn hàng (Timing/Oracle)
        string dbSecretHash = reader.IsDBNull(ordSecret) ? "" : reader.GetString(ordSecret);
        byte[] dbBytes = Encoding.UTF8.GetBytes(dbSecretHash);
        byte[] expBytes = Encoding.UTF8.GetBytes(expectedSecretHash);
        if (dbBytes.Length != expBytes.Length || !CryptographicOperations.FixedTimeEquals(dbBytes, expBytes))
        {
            tx.Rollback(); failureReason = "Khóa xác thực bí mật (Client Secret) không hợp lệ"; return false;
        }

        string dbStatus = reader.GetString(ordStatus);
        if (dbStatus == "REDEEMED") { tx.Rollback(); failureReason = "Giấy phép đơn hàng đã được kích hoạt trước đó"; return false; }
        if (dbStatus != "PAID") { tx.Rollback(); failureReason = "Đơn hàng chưa hoàn tất thanh toán"; return false; }

        DateTime tokenExp = reader.IsDBNull(ordExp) ? DateTime.MinValue : DateTime.Parse(reader.GetString(ordExp));
        if (DateTime.UtcNow > tokenExp) { tx.Rollback(); failureReason = "Mã kích hoạt đã hết hạn (24 giờ)"; return false; }

        string dbSerial = reader.GetString(ordSerial);
        if (!string.IsNullOrWhiteSpace(usbSerial) && !string.Equals(dbSerial, usbSerial.Trim().ToUpper(), StringComparison.OrdinalIgnoreCase))
        {
            tx.Rollback(); failureReason = $"Mã phần cứng ({usbSerial}) không khớp với đơn hàng ({dbSerial})"; return false;
        }

        serialOut = dbSerial;
        licenseKey = reader.IsDBNull(ordLicKey) ? null : reader.GetString(ordLicKey);
        licensePayload = reader.IsDBNull(ordLicPayload) ? null : reader.GetString(ordLicPayload);
        reader.Close();

        using var updCmd = new SqliteCommand("UPDATE activation_orders SET status = 'REDEEMED', redeemed_at = @now WHERE order_id = @id;", conn, tx);
        updCmd.Parameters.AddWithValue("@now", DateTime.UtcNow.ToString("o"));
        updCmd.Parameters.AddWithValue("@id", cleanOrderId);
        updCmd.ExecuteNonQuery();

        tx.Commit();
        return true;
    }

    public void PruneExpiredPendingOrders()
    {
        try
        {
            using var conn = new SqliteConnection(_connectionString);
            conn.Open();
            using var pruneCmd = new SqliteCommand("DELETE FROM activation_orders WHERE status = 'PENDING' AND expires_at < datetime('now', '-2 hours');", conn);
            pruneCmd.ExecuteNonQuery();
        }
        catch { }
    }

    private static string GenerateOrderId()
    {
        const string chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        var random = new byte[5]; RandomNumberGenerator.Fill(random);
        var sb = new StringBuilder("ORD");
        foreach (byte b in random) sb.Append(chars[b % chars.Length]);
        return sb.ToString();
    }

    public static string? ExtractOrderIdFromContent(string? content)
    {
        if (string.IsNullOrWhiteSpace(content)) return null;
        var match = Regex.Match(content, @"\b(?:USB|ORD|BTL86)?[\s_]*(ORD[A-Z0-9]{5,8})\b", RegexOptions.IgnoreCase);
        if (match.Success) return match.Groups[1].Value.ToUpper();
        var fallback = Regex.Match(content, @"\bUSB[\s_]+([A-Z0-9]{5,10})\b", RegexOptions.IgnoreCase);
        if (!fallback.Success) return null;
        string val = fallback.Groups[1].Value.ToUpper();
        return val.StartsWith("ORD") ? val : "ORD" + val;
    }

    private static string ComputeHash(string text) => Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(text + "|BTL86_SALT")));

    private static ActivationOrder MapOrderFromReader(SqliteDataReader reader)
    {
        int col(string n) => reader.GetOrdinal(n);
        int ordSecret = col("client_secret_hash"), ordTx = col("transaction_id"), ordKey = col("license_key"), ordPayload = col("license_payload");
        return new ActivationOrder
        {
            OrderId = reader.GetString(col("order_id")), UsbSerial = reader.GetString(col("usb_serial")),
            ClientSecretHash = reader.IsDBNull(ordSecret) ? null : reader.GetString(ordSecret),
            Amount = reader.GetInt32(col("amount")), Status = reader.GetString(col("status")),
            CreatedAt = DateTime.Parse(reader.GetString(col("created_at"))), ExpiresAt = DateTime.Parse(reader.GetString(col("expires_at"))),
            TransactionId = reader.IsDBNull(ordTx) ? null : reader.GetString(ordTx),
            LicenseKey = reader.IsDBNull(ordKey) ? null : reader.GetString(ordKey),
            LicensePayload = reader.IsDBNull(ordPayload) ? null : reader.GetString(ordPayload)
        };
    }
}
