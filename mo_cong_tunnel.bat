@echo off
chcp 65001 >nul
title [BTL86] Cổng Kết Nối Trực Tuyến Cloudflare Tunnel - SePay Webhook
echo =========================================================================
echo    BỘ TƯ LỆNH 86 — HỆ THỐNG MỞ CỔNG KẾT NỐI INTERNET CHO WEBHOOK SEPAY
echo =========================================================================
echo.
echo [*] Đang thiết lập đường hầm bảo mật kết nối với cổng 8686...
echo [*] Vui lòng đợi vài giây để hệ thống sinh đường dẫn công khai...
echo.
echo [HƯỚNG DẪN DÁN VÀO SEPAY]:
echo  - Hãy nhìn dòng có chứa: https://xxxx.trycloudflare.com
echo  - Sao chép link đó và thêm đuôi: /api/webhook/sepay
echo  - Ví dụ: https://xxxx.trycloudflare.com/api/webhook/sepay
echo  - Dán vào ô 'URL Webhook' trên trang SePay của bạn!
echo =========================================================================
echo.

if exist "%~dp0cloudflared.exe" (
    "%~dp0cloudflared.exe" tunnel --url http://localhost:8686
) else if exist "C:\Program Files (x86)\cloudflared\cloudflared.exe" (
    "C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --url http://localhost:8686
) else (
    cloudflared tunnel --url http://localhost:8686
)
pause

