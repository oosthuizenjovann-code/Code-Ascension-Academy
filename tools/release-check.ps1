param(
    [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
Push-Location $Root

try {
    Write-Host "Code Ascension Academy - RC3 Release Check" -ForegroundColor Cyan
    Write-Host "Repository: $Root"

    $dotnetVersion = (& dotnet --version).Trim()
    if (-not $dotnetVersion) {
        throw '.NET SDK was not found on PATH.'
    }

    $major = [int]($dotnetVersion.Split('.')[0])
    if ($major -lt 10) {
        throw "Academy 2.0 requires .NET SDK 10 or newer. Found $dotnetVersion."
    }
    Write-Host "[OK] .NET SDK $dotnetVersion" -ForegroundColor Green

    $requiredFiles = @(
        'CodeAscensionAcademy.slnx',
        'src\Academy.Desktop\Academy.Desktop.csproj',
        'src\Academy.Desktop\MainWindow.xaml',
        'src\Academy.Desktop\MainWindow.xaml.cs',
        'src\Academy.Runner\CSharpRunner.cs',
        'web\index.html',
        'web\js\app.js',
        'web\js\core\accessibility.js',
        'web\css\release-qa.css',
        'web\assets\icons\html-symbol.svg',
        'web\assets\icons\css-symbol.svg',
        'web\assets\icons\javascript-symbol.svg',
        'web\assets\icons\csharp-symbol.svg'
    )

    foreach ($file in $requiredFiles) {
        if (-not (Test-Path $file)) {
            throw "Required release file is missing: $file"
        }
    }
    Write-Host '[OK] Required RC3 project files found' -ForegroundColor Green

    $curriculumFiles = @(Get-ChildItem '.\curriculum' -Filter '*.json' -Recurse -File)
    if ($curriculumFiles.Count -ne 20) {
        throw "Expected 20 curriculum JSON files; found $($curriculumFiles.Count)."
    }
    foreach ($file in $curriculumFiles) {
        try { $null = Get-Content $file.FullName -Raw | ConvertFrom-Json }
        catch { throw "Invalid curriculum JSON: $($file.FullName)" }
    }
    Write-Host '[OK] 20 curriculum JSON files parse successfully' -ForegroundColor Green

    $html = Get-Content '.\web\index.html' -Raw
    $idMatches = [regex]::Matches($html, 'id\s*=\s*["'']([^"'']+)["'']', 'IgnoreCase')
    $ids = @($idMatches | ForEach-Object { $_.Groups[1].Value })
    $duplicates = @($ids | Group-Object | Where-Object Count -gt 1)
    if ($duplicates.Count -gt 0) {
        throw "Duplicate HTML IDs found: $($duplicates.Name -join ', ')"
    }
    Write-Host "[OK] $($ids.Count) unique HTML IDs" -ForegroundColor Green

    if ($html -notmatch 'academyA11yStatus' -or $html -notmatch 'SKIP TO CONTENT') {
        throw 'RC3 accessibility hooks are missing from web/index.html.'
    }
    Write-Host '[OK] RC3 accessibility hooks found' -ForegroundColor Green

    $node = Get-Command node -ErrorAction SilentlyContinue
    if ($node) {
        $jsFiles = @(Get-ChildItem '.\web\js' -Filter '*.js' -Recurse -File)
        foreach ($file in $jsFiles) {
            & node --check $file.FullName | Out-Null
            if ($LASTEXITCODE -ne 0) {
                throw "JavaScript syntax validation failed: $($file.FullName)"
            }
        }
        Write-Host "[OK] $($jsFiles.Count) JavaScript files passed node --check" -ForegroundColor Green
    }
    else {
        Write-Host '[INFO] Node.js is not installed; JavaScript syntax check skipped.' -ForegroundColor Yellow
    }

    if (-not $SkipBuild) {
        & dotnet build '.\CodeAscensionAcademy.slnx' -c Release
        if ($LASTEXITCODE -ne 0) { throw 'Release build failed.' }
        Write-Host '[OK] Release build succeeded' -ForegroundColor Green
    }

    Write-Host ''
    Write-Host 'RC3 release checks passed.' -ForegroundColor Green
    Write-Host 'Complete the manual RC3-QA-CHECKLIST.md before publishing.' -ForegroundColor Cyan
}
finally {
    Pop-Location
}
