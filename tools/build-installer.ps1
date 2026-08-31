param(
    [switch]$SkipPublish
)

$ErrorActionPreference = 'Stop'

$Root = Split-Path -Parent $PSScriptRoot

Write-Host ''
Write-Host 'Code Ascension Academy - Installer Builder' -ForegroundColor Cyan
Write-Host "Repository: $Root"
Write-Host ''

# ------------------------------------------------------------
# Publish the application first unless explicitly skipped.
# ------------------------------------------------------------

if (-not $SkipPublish) {
    $publishScript = Join-Path $PSScriptRoot 'publish.ps1'

    if (-not (Test-Path $publishScript)) {
        throw "Publish script was not found: $publishScript"
    }

    Write-Host '[INFO] Publishing Code Ascension Academy...' -ForegroundColor Yellow

    & $publishScript -NoZip

    if ($LASTEXITCODE -ne 0) {
        throw 'Application publishing failed.'
    }

    Write-Host '[OK] Application published.' -ForegroundColor Green
    Write-Host ''
}
else {
    Write-Host '[INFO] Publish step skipped.' -ForegroundColor Yellow
    Write-Host ''
}

# ------------------------------------------------------------
# Locate the Inno Setup command-line compiler.
# ------------------------------------------------------------

$innoCandidates = @(
    "${env:ProgramFiles(x86)}\Inno Setup 6\ISCC.exe",
    "${env:ProgramFiles}\Inno Setup 6\ISCC.exe",
    "${env:LOCALAPPDATA}\Programs\Inno Setup 6\ISCC.exe"
)

$compiler = $innoCandidates |
    Where-Object {
        $_ -and (Test-Path $_)
    } |
    Select-Object -First 1

# If Inno Setup was added to PATH, allow that as a fallback.
if (-not $compiler) {
    $innoCommand = Get-Command 'ISCC.exe' -ErrorAction SilentlyContinue

    if ($innoCommand) {
        $compiler = $innoCommand.Source
    }
}

if (-not $compiler) {
    Write-Host ''
    Write-Host '[ERROR] Inno Setup compiler could not be located.' -ForegroundColor Red
    Write-Host ''
    Write-Host 'Checked:' -ForegroundColor Yellow

    foreach ($candidate in $innoCandidates) {
        Write-Host "  $candidate"
    }

    Write-Host ''
    throw 'Inno Setup 6 compiler (ISCC.exe) was not found.'
}

Write-Host '[OK] Inno Setup compiler found:' -ForegroundColor Green
Write-Host "     $compiler"
Write-Host ''

# ------------------------------------------------------------
# Locate the Academy installer script.
# ------------------------------------------------------------

$script = Join-Path $Root 'installer\CodeAscensionAcademy.iss'

if (-not (Test-Path $script)) {
    throw "Installer script was not found: $script"
}

Write-Host '[OK] Installer script found:' -ForegroundColor Green
Write-Host "     $script"
Write-Host ''

# ------------------------------------------------------------
# Compile the installer.
# ------------------------------------------------------------

Write-Host '[INFO] Building Windows installer...' -ForegroundColor Yellow
Write-Host ''

& $compiler $script

if ($LASTEXITCODE -ne 0) {
    throw "Inno Setup compilation failed with exit code $LASTEXITCODE."
}

Write-Host ''
Write-Host 'Installer build completed successfully.' -ForegroundColor Green
Write-Host 'Installer created under:' -ForegroundColor Green
Write-Host "  $Root\dist\installer"
Write-Host ''