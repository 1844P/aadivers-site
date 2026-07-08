# Launch the Action Adventure Divers site locally
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host " Action Adventure Divers - Local Server" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Site:     http://localhost:8000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server." -ForegroundColor Yellow
Write-Host ""

python -m http.server 8000 --bind 127.0.0.1
