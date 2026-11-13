@echo off
title Cong Ket Noi Truc Tuyen SePay Webhook
echo =========================================================================
echo    HE THONG MO CONG INTERNET CHO WEBHOOK SEPAY
echo =========================================================================
echo.
echo [*] Dang mo duong truyen ket noi Internet cho cong 8686...
echo.
echo [HUONG DAN DAN VAO SEPAY]:
echo  - He thong se hien dong: "your url is: https://xxxx.loca.lt"
echo  - Ban copy link do va them duoi: /api/webhook/sepay
echo  - Vi du: https://xxxx.loca.lt/api/webhook/sepay
echo  - Dan duong link tren vao o URL Webhook tren SePay!
echo =========================================================================
echo.
npx --yes localtunnel --port 8686
pause
