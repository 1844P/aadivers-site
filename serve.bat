@echo off
cd /d "%~dp0"
echo =======================================
echo  Action Adventure Divers - Local Server
echo =======================================
echo.
echo  Site:     http://localhost:8000
echo  Press Ctrl+C to stop the server.
echo.
python -m http.server 8000 --bind 127.0.0.1
pause
