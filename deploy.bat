@echo off
cd /d "%~dp0"
echo =============================================
echo  Deploy to GitHub - Action Adventure Divers
echo =============================================
echo.
echo  Step 1: Open GitHub Desktop
echo  Step 2: File ^> Add local repository
echo  Step 3: Choose: %~dp0
echo  Step 4: Click "Publish repository"
echo  Step 5: Uncheck "Keep this code private"
echo  Step 6: Click "Publish"
echo.
echo  Then enable GitHub Pages:
echo  Repo Settings ^> Pages ^> Deploy from main, /root
echo.
echo  Your site will be at:
echo  https://1844P.github.io/aadivers-site/
echo.
pause
