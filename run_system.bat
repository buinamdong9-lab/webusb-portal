@echo off
title WebUSB Full System
chcp 65001 >nul
echo ========================================================
echo DANG KHOI DONG HE THONG WEBUSB PORTAL VA BACKEND...
echo [1] Giao Dien Quizz Gamified: http://localhost:8686
echo [2] Webhook VietQR (Napas 24/7): http://localhost:8686/api/webhook/sepay
echo [3] Engine Ky So RSA-2048 Tu Dong: San sang
echo ========================================================
cd /d "%~dp0backend"
if "%ASPNETCORE_ENVIRONMENT%"=="" set ASPNETCORE_ENVIRONMENT=Development
start http://localhost:8686
dotnet run --no-build
pause
