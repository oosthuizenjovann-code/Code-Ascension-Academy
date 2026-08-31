param(
    [switch]$SkipChecks,
    [switch]$NoZip
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$Version = (Get-Content (Join-Path $Root 'VERSION') -Raw).Trim()
$Dist = Join-Path $Root 'dist'
$Portable = Join-Path $Dist 'portable'
$ZipPath = Join-Path $Dist "Code-Ascension-Academy-$Version-win-x64.zip"

Push-Location $Root
try {
    if (-not $SkipChecks) {
        & (Join-Path $PSScriptRoot 'release-check.ps1')
    }

    if (Test-Path $Portable) {
        Remove-Item $Portable -Recurse -Force
    }
    New-Item -ItemType Directory -Force -Path $Portable | Out-Null

    Write-Host "Publishing Code Ascension Academy $Version..." -ForegroundColor Cyan

    & dotnet publish '.\src\Academy.Desktop\Academy.Desktop.csproj' `
        -c Release `
        -r win-x64 `
        --self-contained true `
        -p:PublishSingleFile=false `
        -p:PublishTrimmed=false `
        -p:DebugSymbols=false `
        -p:DebugType=None `
        -o $Portable

    if ($LASTEXITCODE -ne 0) {
        throw 'dotnet publish failed.'
    }

    $expected = @(
        (Join-Path $Portable 'CodeAscensionAcademy.exe'),
        (Join-Path $Portable 'web\index.html'),
        (Join-Path $Portable 'web\curriculum\html\intern.json'),
        (Join-Path $Portable 'web\assets\icons\html-symbol.svg')
    )

    foreach ($path in $expected) {
        if (-not (Test-Path $path)) {
            throw "Published output is incomplete: $path"
        }
    }

    Write-Host '[OK] Portable self-contained build created.' -ForegroundColor Green
    Write-Host "     $Portable"

    if (-not $NoZip) {
        if (Test-Path $ZipPath) {
            Remove-Item $ZipPath -Force
        }
        Compress-Archive -Path (Join-Path $Portable '*') -DestinationPath $ZipPath -CompressionLevel Optimal
        Write-Host '[OK] Portable ZIP created.' -ForegroundColor Green
        Write-Host "     $ZipPath"
    }

    Write-Host ''
    Write-Host 'Run the portable application:' -ForegroundColor Cyan
    Write-Host "  $Portable\CodeAscensionAcademy.exe"
}
finally {
    Pop-Location
}
