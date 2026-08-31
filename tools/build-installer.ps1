param(
    [switch]$SkipPublish
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot

if (-not $SkipPublish) {
    & (Join-Path $PSScriptRoot 'publish.ps1') -NoZip
}

$candidates = @(
    "$env:ProgramFiles(x86)\Inno Setup 6\ISCC.exe",
    "$env:ProgramFiles\Inno Setup 6\ISCC.exe"
) | Where-Object { $_ -and (Test-Path $_) }

$compiler = $candidates | Select-Object -First 1
if (-not $compiler) {
    throw 'Inno Setup 6 was not found. Install Inno Setup, then run this script again.'
}

$script = Join-Path $Root 'installer\CodeAscensionAcademy.iss'
& $compiler $script
if ($LASTEXITCODE -ne 0) {
    throw 'Inno Setup compilation failed.'
}

Write-Host 'Installer created under dist\installer.' -ForegroundColor Green
