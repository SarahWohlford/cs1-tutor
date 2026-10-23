param(
  [switch]$FrontendOnly
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$frontend = Join-Path $projectRoot "frontend"
$backend = Join-Path $projectRoot "backend"

if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
  throw "Node.js/npm is required. Install Node.js 18 or newer, then run this script again."
}

if (-not (Test-Path (Join-Path $frontend "node_modules"))) {
  Push-Location $frontend
  try { npm.cmd install } finally { Pop-Location }
}

$jobs = @()
try {
  if (-not $FrontendOnly) {
    $python = Get-Command python.exe -ErrorAction SilentlyContinue
    $isStoreAlias = $python -and $python.Source -like "*\\Microsoft\\WindowsApps\\python.exe"
    if (-not $python -or $isStoreAlias) {
      Write-Warning "Python was not found; starting the frontend only. API-backed features will be unavailable."
    } else {
      $jobs += Start-Process -FilePath $python.Source -ArgumentList "-m", "uvicorn", "main:app", "--reload", "--host", "127.0.0.1", "--port", "8000" -WorkingDirectory $backend -PassThru -NoNewWindow
    }
  }

  $jobs += Start-Process -FilePath "npm.cmd" -ArgumentList "run", "dev", "--", "--host", "127.0.0.1" -WorkingDirectory $frontend -PassThru -NoNewWindow
  Write-Host "CS1 Tutor is starting at http://127.0.0.1:5173"
  Write-Host "Press Ctrl+C to stop."
  Wait-Process -Id $jobs.Id
} finally {
  $jobs | Where-Object { -not $_.HasExited } | Stop-Process
}
