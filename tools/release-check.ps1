param(
    [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
Push-Location $Root

try {
    Write-Host "Code Ascension Academy - Release Check" -ForegroundColor Cyan
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
    Write-Host '[OK] Required project files found' -ForegroundColor Green

    $curriculumFiles = @(Get-ChildItem '.\curriculum' -Filter '*.json' -Recurse -File)
    if ($curriculumFiles.Count -ne 20) {
        throw "Expected 20 curriculum JSON files; found $($curriculumFiles.Count)."
    }
    Write-Host '[OK] 20 curriculum files found' -ForegroundColor Green

    foreach ($file in $curriculumFiles) {
        try {
            $null = Get-Content $file.FullName -Raw | ConvertFrom-Json
        }
        catch {
            throw "Invalid curriculum JSON: $($file.FullName)"
        }
    }
    Write-Host '[OK] Curriculum JSON parses successfully' -ForegroundColor Green

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
        if ($LASTEXITCODE -ne 0) {
            throw 'Release build failed.'
        }
        Write-Host '[OK] Release build succeeded' -ForegroundColor Green
    }

    Write-Host ''
    Write-Host 'Release checks passed.' -ForegroundColor Green
}
finally {
    Pop-Location
}
