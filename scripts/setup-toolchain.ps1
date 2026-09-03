# ==============================================================================
# GhostFree — Midnight Toolchain & Proof Server Setup Script (Windows / WSL)
# ==============================================================================

Write-Host "Checking Node.js..." -ForegroundColor Cyan
$nodeVer = node -v
Write-Host "Node.js: $nodeVer" -ForegroundColor Green

Write-Host "`nChecking Docker & Midnight Proof Server..." -ForegroundColor Cyan
if (Get-Command docker -ErrorAction SilentlyContinue) {
    Write-Host "Docker is available." -ForegroundColor Green
    Write-Host "Pulling Midnight proof server container..." -ForegroundColor Yellow
    docker pull midnightnetwork/proof-server
    Write-Host "Starting proof server on port 6300..." -ForegroundColor Yellow
    docker run -d -p 6300:6300 midnightnetwork/proof-server
} else {
    Write-Host "Docker is not detected in PATH. Please start Docker Desktop to run midnightnetwork/proof-server on port 6300." -ForegroundColor Yellow
}

Write-Host "`nChecking Compact Compiler..." -ForegroundColor Cyan
Write-Host "To install Compact on Windows, use WSL or run:" -ForegroundColor Yellow
Write-Host "curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh" -ForegroundColor Yellow
