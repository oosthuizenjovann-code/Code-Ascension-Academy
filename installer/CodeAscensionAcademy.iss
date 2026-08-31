#define MyAppName "Code Ascension Academy"
#define MyAppVersion "2.0.0"
#define MyAppPublisher "Code Ascension Academy"
#define MyAppExeName "CodeAscensionAcademy.exe"

[Setup]
AppId={{B765A52C-CC7B-4A98-9C87-5B44C87A2C31}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={localappdata}\Programs\Code Ascension Academy
DefaultGroupName=Code Ascension Academy
DisableProgramGroupPage=yes
OutputDir=..\dist\installer
OutputBaseFilename=Code-Ascension-Academy-Setup-{#MyAppVersion}
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
PrivilegesRequired=lowest
UninstallDisplayName={#MyAppName}

[Files]
Source: "..\dist\portable\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{userdesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Tasks]
Name: "desktopicon"; Description: "Create a desktop shortcut"; GroupDescription: "Additional shortcuts:"; Flags: unchecked

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "Launch {#MyAppName}"; Flags: nowait postinstall skipifsilent
