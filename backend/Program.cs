using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.FileProviders;
using WebUsbBackend;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<LicenseSigner>();
builder.Services.AddSingleton<PaymentStore>();

builder.Services.AddCors(options =>
{
    var defaultOrigins = new[] { "http://localhost:8686", "http://127.0.0.1:8686", "https://usbantoan.io.vn", "https://www.usbantoan.io.vn", "https://usbantoan.vn", "https://www.usbantoan.vn" };
    string envOrigins = Environment.GetEnvironmentVariable("ALLOWED_CORS_ORIGINS") ?? "";
    var configured = builder.Configuration.GetSection("WebUsbSettings:AllowedCorsOrigins").Get<string[]>() ?? defaultOrigins;
    var allOrigins = string.IsNullOrWhiteSpace(envOrigins)
        ? configured
        : configured.Concat(envOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)).Distinct().ToArray();
    options.AddPolicy("ProductionCors", p => p.WithOrigins(allOrigins).AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// Fail-fast ở Production nếu thiếu biến môi trường SEPAY_API_KEY hoặc BANK_ACCOUNT_NUMBER (NEW-08)
string startupKey = Environment.GetEnvironmentVariable("SEPAY_API_KEY") ?? builder.Configuration["WebUsbSettings:SePayApiKey"] ?? "";
string startupAccount = Environment.GetEnvironmentVariable("BANK_ACCOUNT_NUMBER") ?? builder.Configuration["WebUsbSettings:AccountNumber"] ?? "";

if (!builder.Environment.IsDevelopment() && (string.IsNullOrWhiteSpace(startupKey) || string.IsNullOrWhiteSpace(startupAccount)))
{
    throw new InvalidOperationException("[FATAL] Khởi động Production thất bại: Bắt buộc phải cấu hình biến môi trường SEPAY_API_KEY và BANK_ACCOUNT_NUMBER!");
}

app.UseCors("ProductionCors");
ConfigureStaticFiles(app, builder.Environment.ContentRootPath);

var limiter = new AtomicRateLimiter();

// 1. Health Check
app.MapGet("/api/health", () => Results.Ok(new { status = "HEALTHY", service = "WebUSB Backend Portal — BTL86", version = "2.7.0", serverTime = DateTime.UtcNow }));

// 2. Tạo đơn hàng kích hoạt mới (NEW-01: Atomic Rate-limiting chống DoS SQLite & Race Condition)
app.MapPost("/api/order/create", (HttpContext ctx, CreateOrderRequest req, PaymentStore store) =>
{
    string ip = ctx.Connection.RemoteIpAddress?.ToString() ?? "local";
    if (!limiter.Allow($"order_{ip}", 15, TimeSpan.FromMinutes(5))) return Results.StatusCode(StatusCodes.Status429TooManyRequests);

    string serial = string.IsNullOrWhiteSpace(req.UsbSerial) ? "GENERIC86" : req.UsbSerial.Trim().ToUpper();
    var order = store.CreateOrder(serial, req.ClientSecret, 20000);
    return Results.Ok(new { success = true, orderId = order.OrderId, amount = order.Amount, memo = $"USB {order.OrderId}", clientSecret = order.ClientSecret, expiresAt = order.ExpiresAt });
});

// 3. Kiểm tra trạng thái đơn hàng (NEW-05: Rate-limiting chống polling flood & brute-force)
app.MapGet("/api/order/status", (HttpContext ctx, string? orderId, PaymentStore store) =>
{
    string ip = ctx.Connection.RemoteIpAddress?.ToString() ?? "local";
    if (!limiter.Allow($"status_{ip}", 120, TimeSpan.FromMinutes(1))) return Results.StatusCode(StatusCodes.Status429TooManyRequests);

    if (string.IsNullOrWhiteSpace(orderId)) return Results.BadRequest(new { error = "Thiếu orderId" });
    var order = store.GetOrder(orderId);
    if (order == null) return Results.NotFound(new { error = "Không tìm thấy đơn hàng" });
    bool isPaid = order.Status == "PAID" || order.Status == "REDEEMED";
    return Results.Ok(new { success = true, orderId = order.OrderId, status = order.Status, isPaid, expiresAt = order.ExpiresAt });
});

// 4. Tiếp nhận Webhook SePay — Hỗ trợ cả HMAC-SHA256 và Authorization API Key (NEW-05: Rate-limiting)
app.MapPost("/api/webhook/sepay", async (HttpContext ctx, HttpRequest request, PaymentStore store, IConfiguration config) =>
{
    string ip = ctx.Connection.RemoteIpAddress?.ToString() ?? "local";
    if (!limiter.Allow($"webhook_{ip}", 60, TimeSpan.FromMinutes(1))) return Results.StatusCode(StatusCodes.Status429TooManyRequests);

    string configuredKey = Environment.GetEnvironmentVariable("SEPAY_API_KEY") ?? config["WebUsbSettings:SePayApiKey"] ?? "";
    if (string.IsNullOrWhiteSpace(configuredKey)) return Results.StatusCode(500);

    bool isAuthenticated = false;
    string rawBody = string.Empty;

    if (request.Headers.TryGetValue("X-SePay-Signature", out var sigVal) && request.Headers.TryGetValue("X-SePay-Timestamp", out var timeVal))
    {
        if (long.TryParse(timeVal.ToString(), out long reqTime))
        {
            if (Math.Abs(DateTimeOffset.UtcNow.ToUnixTimeSeconds() - reqTime) > 300) return Results.Unauthorized();
        }
        request.EnableBuffering();
        using var reader = new StreamReader(request.Body, Encoding.UTF8, leaveOpen: true);
        rawBody = await reader.ReadToEndAsync();
        request.Body.Position = 0;

        string hmacData = $"{timeVal}.{rawBody}";
        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(configuredKey));
        byte[] hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(hmacData));
        if (string.Equals(sigVal.ToString().Trim(), $"sha256={Convert.ToHexString(hashBytes).ToLowerInvariant()}", StringComparison.OrdinalIgnoreCase))
            isAuthenticated = true;
    }
    else if (request.Headers.TryGetValue("Authorization", out var authHeader))
    {
        string headerVal = authHeader.ToString().Trim();
        string tokenPart = headerVal.StartsWith("Apikey ", StringComparison.OrdinalIgnoreCase) ? headerVal.Substring(7).Trim() : headerVal;
        byte[] tokBytes = Encoding.UTF8.GetBytes(tokenPart);
        byte[] keyBytes = Encoding.UTF8.GetBytes(configuredKey);
        if (tokBytes.Length == keyBytes.Length && CryptographicOperations.FixedTimeEquals(tokBytes, keyBytes)) isAuthenticated = true;
    }

    if (!isAuthenticated) return Results.Unauthorized();
    if (string.IsNullOrEmpty(rawBody))
    {
        request.EnableBuffering();
        using var reader = new StreamReader(request.Body, Encoding.UTF8, leaveOpen: true);
        rawBody = await reader.ReadToEndAsync();
    }

    var payload = JsonSerializer.Deserialize<SePayWebhookDto>(rawBody, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
    if (payload == null || string.IsNullOrWhiteSpace(payload.Content)) return Results.BadRequest(new { error = "Dữ liệu Webhook không hợp lệ" });

    string? transactionId = payload.Id > 0 ? payload.Id.ToString() : (!string.IsNullOrWhiteSpace(payload.ReferenceCode) ? payload.ReferenceCode.Trim() : payload.Code?.Trim());
    if (string.IsNullOrWhiteSpace(transactionId)) return Results.BadRequest(new { error = "Thiếu transaction Id hoặc ReferenceCode từ ngân hàng" });

    bool isProcessed = store.TryProcessWebhook(transactionId, payload.Content, payload.TransferAmount, payload.AccountNumber, payload.TransferType, out var order, out string failureReason);
    if (isProcessed && order != null) return Results.Ok(new { success = true, orderId = order.OrderId });
    if (failureReason.Contains("đã xử lý")) return Results.Ok(new { success = true, orderId = order?.OrderId ?? "", message = failureReason });
    return Results.BadRequest(new { success = false, message = failureReason });
});

// 5. Desktop App Redeem Giấy phép RSA-2048 qua Client Secret Challenge (NEW-05: Rate-limiting chống brute-force)
app.MapPost("/api/license/redeem", (HttpContext ctx, RedeemRequest req, PaymentStore store) =>
{
    string ip = ctx.Connection.RemoteIpAddress?.ToString() ?? "local";
    if (!limiter.Allow($"redeem_{ip}", 10, TimeSpan.FromMinutes(5))) return Results.StatusCode(StatusCodes.Status429TooManyRequests);

    if (string.IsNullOrWhiteSpace(req.OrderId) || string.IsNullOrWhiteSpace(req.ClientSecret))
        return Results.BadRequest(new { success = false, message = "Thiếu Order ID hoặc Client Secret xác thực ghép cặp" });

    if (store.TryRedeemWithSecret(req.OrderId, req.ClientSecret, req.UsbSerial, out var licKey, out var licPayload, out var serial, out var reason))
        return Results.Ok(new { success = true, usbSerial = serial, licenseKey = licKey, licenseFileContent = licPayload });

    return Results.BadRequest(new { success = false, message = reason });
});

#if DEBUG
// 6. Giả lập thanh toán Dev Mode (NEW-06: Dual compile-time và runtime guard)
if (app.Environment.IsDevelopment())
{
    app.MapPost("/api/payment/simulate", (MockPaymentRequest req, PaymentStore store, IConfiguration config, IWebHostEnvironment env) =>
    {
        if (!config.GetValue<bool>("WebUsbSettings:DevMode")) return Results.StatusCode(403);
        string orderId = req.OrderId ?? "";
        if (string.IsNullOrEmpty(orderId))
        {
            var order = store.CreateOrder(req.UsbSerial ?? "DEV8686", null, 20000);
            orderId = order.OrderId;
        }
        string mockTxId = "MOCK_" + Guid.NewGuid().ToString("N")[..8];
        string targetAcc = Environment.GetEnvironmentVariable("BANK_ACCOUNT_NUMBER") ?? config["WebUsbSettings:AccountNumber"] ?? "0779356619";
        store.TryProcessWebhook(mockTxId, $"USB {orderId}", 20000, targetAcc, "in", out var processedOrder, out _);
        return Results.Ok(new { success = true, order = processedOrder });
    });
}
#endif

// 7. Tải bộ cài đặt phần mềm USB An Toàn (Công khai cho người dùng cài đặt - BUG-13 & BUG-17)
app.MapGet("/api/download/setup", (IConfiguration config) =>
{
    string downloadUrl = Environment.GetEnvironmentVariable("SETUP_DOWNLOAD_URL") ?? config["WebUsbSettings:SetupDownloadUrl"] ?? "";
    if (!string.IsNullOrWhiteSpace(downloadUrl)) return Results.Redirect(downloadUrl);

    string customPath = Environment.GetEnvironmentVariable("SETUP_EXE_PATH") ?? config["WebUsbSettings:SetupExePath"] ?? "";
    string[] searchPaths = new[]
    {
        customPath,
        Path.Combine(AppContext.BaseDirectory, "Setup_USB_AnToan_v2.5.exe"),
        Path.Combine(Directory.GetCurrentDirectory(), "Setup_USB_AnToan_v2.5.exe"),
        Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "COMMERCIAL_RELEASE_OUTPUT", "Bo_Cai_Dat_Setup", "Setup_USB_AnToan_v2.5.exe"),
        Path.Combine(Directory.GetCurrentDirectory(), "..", "COMMERCIAL_RELEASE_OUTPUT", "Bo_Cai_Dat_Setup", "Setup_USB_AnToan_v2.5.exe"),
        Path.Combine(Directory.GetCurrentDirectory(), "..", "USB_AnToan_v2_CSharp", "Output_Installer", "Setup_USB_AnToan_v2.5.exe"),
        Path.Combine(Directory.GetCurrentDirectory(), "..", "USB_AnToan_v2_CSharp", "bin", "Release", "net8.0-windows", "win-x64", "USB_AnToan_v2.5.exe")
    };

    foreach (var path in searchPaths)
    {
        if (!string.IsNullOrWhiteSpace(path) && File.Exists(path))
            return Results.File(path, "application/vnd.microsoft.portable-executable", "Setup_USB_AnToan_v2.5.exe");
    }
    return Results.NotFound(new { error = "Không tìm thấy bộ cài đặt trên máy chủ." });
});

static void ConfigureStaticFiles(WebApplication app, string contentRoot)
{
    string[] candidateRoots = new[]
    {
        Path.Combine(contentRoot, "webusb"), Path.GetFullPath(Path.Combine(contentRoot, "..")), contentRoot,
        Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "webusb"))
    };
    string webusbRoot = candidateRoots.FirstOrDefault(p => File.Exists(Path.Combine(p, "index.html"))) ?? Path.Combine(contentRoot, "webusb");

    if (Directory.Exists(webusbRoot) && File.Exists(Path.Combine(webusbRoot, "index.html")))
    {
        var allowedExts = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            ".html", ".htm", ".js", ".mjs", ".css", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp", ".woff", ".woff2"
        };
        app.Use(async (ctx, next) =>
        {
            string ext = Path.GetExtension(ctx.Request.Path.Value ?? "");
            if (!ctx.Request.Path.StartsWithSegments("/api") && !string.IsNullOrEmpty(ext) && !allowedExts.Contains(ext))
            {
                ctx.Response.StatusCode = StatusCodes.Status404NotFound;
                return;
            }
            await next();
        });
        var fileProvider = new PhysicalFileProvider(webusbRoot);
        app.UseDefaultFiles(new DefaultFilesOptions { FileProvider = fileProvider, RequestPath = "" });
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = fileProvider, RequestPath = "",
            OnPrepareResponse = ctx =>
            {
                string ext = Path.GetExtension(ctx.File.PhysicalPath ?? ctx.File.Name);
                if (!allowedExts.Contains(ext)) { ctx.Context.Response.StatusCode = 404; ctx.Context.Response.ContentLength = 0; ctx.Context.Response.Body = Stream.Null; }
            }
        });
    }
}

string port = Environment.GetEnvironmentVariable("PORT") ?? builder.Configuration["WebUsbSettings:Port"] ?? "8686";
string host = Environment.GetEnvironmentVariable("PORT") != null ? "0.0.0.0" : "localhost";
string bindUrl = $"http://{host}:{port}";
Console.WriteLine($"[OK] WebUSB Production-Hardened Backend BTL86 tại: {bindUrl}");
app.Run(bindUrl);

namespace WebUsbBackend
{
    public sealed class AtomicRateLimiter
    {
        private sealed class Bucket { public long ResetTicks; public int Count; }
        private readonly System.Collections.Concurrent.ConcurrentDictionary<string, Bucket> _b = new();
        private long _opsCount;

        public bool Allow(string key, int limit, TimeSpan window)
        {
            long now = DateTime.UtcNow.Ticks;
            if (System.Threading.Interlocked.Increment(ref _opsCount) % 100 == 0 || _b.Count > 500)
            {
                PruneExpired(TimeSpan.FromMinutes(2));
            }

            var b = _b.GetOrAdd(key, _ => new Bucket { ResetTicks = now + window.Ticks, Count = 0 });
            lock (b)
            {
                if (now > b.ResetTicks) { b.ResetTicks = now + window.Ticks; b.Count = 0; }
                if (b.Count >= limit) return false;
                b.Count++;
                return true;
            }
        }

        public int PruneExpired(TimeSpan? margin = null)
        {
            long threshold = DateTime.UtcNow.Ticks - (margin?.Ticks ?? 0);
            int removed = 0;
            foreach (var kvp in _b)
            {
                if (threshold > kvp.Value.ResetTicks && _b.TryRemove(kvp.Key, out _)) removed++;
            }
            return removed;
        }

        public int BucketCount => _b.Count;
    }
}
