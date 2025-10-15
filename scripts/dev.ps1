Param(
  [switch]$Open
)

Write-Host "Starting Next.js dev server..." -ForegroundColor Cyan
pnpm dev

if ($Open) {
  Start-Process "http://localhost:3000/mock"
}

