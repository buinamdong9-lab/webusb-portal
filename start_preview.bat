@echo off
title WebUSB Preview Server - BTL86
chcp 65001 >nul
echo ========================================================
echo DANG KHOI DONG SERVER WEBUSB CUC BO (PORT 8686)...
echo ========================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause

