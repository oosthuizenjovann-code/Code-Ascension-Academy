using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using Academy.Core.Storage;
using Academy.Runner;
using Microsoft.Web.WebView2.Core;

namespace Academy.Desktop;

public partial class MainWindow : Window
{
    private const string AcademyHostName = "academy.local";
    private static readonly JsonSerializerOptions WebJsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    private readonly AcademyStorageService _storage = new();
    private readonly CSharpRunner _csharpRunner = new();
    private bool _initialized;

    public MainWindow()
    {
        InitializeComponent();
        Loaded += MainWindow_Loaded;
        Closing += (_, _) => DesktopDiagnostics.Log("Main window closing.");
        Closed += (_, _) => DesktopDiagnostics.Log("Main window closed.");
    }

    private async void MainWindow_Loaded(
        object sender,
        RoutedEventArgs e)
    {
        if (_initialized)
        {
            return;
        }

        _initialized = true;
        DesktopDiagnostics.Log("Main window initialization started.");

        try
        {
            StartupStatus.Text = "Preparing the desktop runtime...";

            string userDataFolder = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "Code Ascension Academy",
                "WebView2");

            Directory.CreateDirectory(userDataFolder);

            CoreWebView2Environment environment =
                await CoreWebView2Environment.CreateAsync(
                    browserExecutableFolder: null,
                    userDataFolder: userDataFolder);

            await AcademyWebView.EnsureCoreWebView2Async(environment);

            AcademyWebView.CoreWebView2.Settings.IsWebMessageEnabled = true;
#if !DEBUG
            AcademyWebView.CoreWebView2.Settings.AreDevToolsEnabled = false;
#endif
            AcademyWebView.CoreWebView2.WebMessageReceived +=
                CoreWebView2_WebMessageReceived;
            AcademyWebView.CoreWebView2.NavigationCompleted +=
                CoreWebView2_NavigationCompleted;
            AcademyWebView.CoreWebView2.ProcessFailed +=
                CoreWebView2_ProcessFailed;

            string webRoot = Path.Combine(
                AppContext.BaseDirectory,
                "web");

            string indexPath = Path.Combine(
                webRoot,
                "index.html");

            if (!File.Exists(indexPath))
            {
                string message =
                    $"Academy interface could not be found.\n\n{indexPath}";

                DesktopDiagnostics.Log(message.Replace(Environment.NewLine, " "));
                ShowStartupFailure(message);
                return;
            }

            StartupStatus.Text = "Loading your Academy...";

            AcademyWebView.CoreWebView2.SetVirtualHostNameToFolderMapping(
                AcademyHostName,
                webRoot,
                CoreWebView2HostResourceAccessKind.Allow);

            DesktopDiagnostics.Log(
                $"Navigating WebView2 to https://{AcademyHostName}/index.html");

            AcademyWebView.CoreWebView2.Navigate(
                $"https://{AcademyHostName}/index.html");
        }
        catch (Exception exception)
        {
            DesktopDiagnostics.LogException(
                "Desktop initialization failed",
                exception);

            ShowStartupFailure(
                "The Academy desktop interface could not start.\n\n" +
                exception.Message +
                "\n\nDiagnostic log:\n" +
                DesktopDiagnostics.LogFile);
        }
    }

    private void CoreWebView2_NavigationCompleted(
        object? sender,
        CoreWebView2NavigationCompletedEventArgs e)
    {
        if (!e.IsSuccess)
        {
            DesktopDiagnostics.Log(
                $"WebView2 navigation failed: {e.WebErrorStatus}");

            ShowStartupFailure(
                "The Academy interface failed to load.\n\n" +
                $"WebView2 status: {e.WebErrorStatus}\n\n" +
                "Diagnostic log:\n" +
                DesktopDiagnostics.LogFile);
            return;
        }

        DesktopDiagnostics.Log("Academy interface navigation completed successfully.");
        AcademyWebView.Visibility = Visibility.Visible;
        StartupOverlay.Visibility = Visibility.Collapsed;
    }

    private void CoreWebView2_ProcessFailed(
        object? sender,
        CoreWebView2ProcessFailedEventArgs e)
    {
        DesktopDiagnostics.Log(
            $"WebView2 process failure reported: {e.ProcessFailedKind}");
    }

    private void ShowStartupFailure(string message)
    {
        StartupStatus.Text = message;
        AcademyWebView.Visibility = Visibility.Hidden;
        StartupOverlay.Visibility = Visibility.Visible;
    }

    private async void CoreWebView2_WebMessageReceived(
        object? sender,
        CoreWebView2WebMessageReceivedEventArgs e)
    {
        try
        {
            using JsonDocument document =
                JsonDocument.Parse(e.WebMessageAsJson);

            JsonElement root = document.RootElement;

            string? action = root.ValueKind switch
            {
                JsonValueKind.String => root.GetString(),
                JsonValueKind.Object when root.TryGetProperty(
                    "action",
                    out JsonElement actionElement) => actionElement.GetString(),
                _ => null
            };

            switch (action)
            {
                case "ping":
                    SendMessageToWeb(new { action = "pong" });
                    break;

                case "save-progress":
                    if (!root.TryGetProperty("payload", out JsonElement payload))
                    {
                        SendMessageToWeb(new
                        {
                            action = "storage-error",
                            message = "No progress payload was supplied."
                        });
                        return;
                    }

                    await _storage.SaveProgressAsync(payload);
                    SendMessageToWeb(new
                    {
                        action = "save-progress-complete",
                        path = _storage.ProgressFile
                    });
                    break;

                case "load-progress":
                    JsonElement? savedProgress =
                        await _storage.LoadProgressAsync();

                    SendMessageToWeb(new
                    {
                        action = "load-progress-complete",
                        found = savedProgress.HasValue,
                        payload = savedProgress
                    });
                    break;

                case "get-data-location":
                    SendMessageToWeb(new
                    {
                        action = "data-location",
                        path = _storage.DataRoot
                    });
                    break;

                case "get-backup-status":
                    SendBackupStatus(root);
                    break;

                case "create-backup":
                    await CreateBackupAsync(root);
                    break;

                case "restore-latest-backup":
                    await RestoreLatestBackupAsync(root);
                    break;

                case "verify-progress":
                    await VerifyProgressAsync(root);
                    break;

                case "open-data-folder":
                    OpenDataFolder(root);
                    break;

                case "run-csharp":
                    await RunCSharpAsync(root);
                    break;

                case "quit":
                    DesktopDiagnostics.Log("Quit requested from the Academy interface.");
                    Close();
                    break;
            }
        }
        catch (Exception exception)
        {
            DesktopDiagnostics.LogException(
                "Desktop bridge request failed",
                exception);

            SendMessageToWeb(new
            {
                action = "desktop-error",
                message = exception.Message
            });
        }
    }

    private void SendBackupStatus(JsonElement root)
    {
        string requestId = RequestId(root);
        var backups = _storage.GetBackups();
        AcademyBackupInfo? latest = backups.FirstOrDefault();

        SendMessageToWeb(new
        {
            action = "backup-status-complete",
            requestId,
            count = backups.Count,
            latest = latest is null
                ? null
                : new
                {
                    latest.FileName,
                    latest.CreatedAtUtc,
                    latest.SizeBytes
                }
        });
    }

    private async Task CreateBackupAsync(JsonElement root)
    {
        string requestId = RequestId(root);
        AcademyBackupInfo? backup = await _storage.CreateBackupAsync("manual");

        SendMessageToWeb(new
        {
            action = "create-backup-complete",
            requestId,
            created = backup is not null,
            backup = backup is null
                ? null
                : new
                {
                    backup.FileName,
                    backup.CreatedAtUtc,
                    backup.SizeBytes
                }
        });
    }

    private async Task RestoreLatestBackupAsync(JsonElement root)
    {
        string requestId = RequestId(root);
        AcademyBackupInfo? backup = await _storage.RestoreLatestBackupAsync();

        SendMessageToWeb(new
        {
            action = "restore-backup-complete",
            requestId,
            restored = backup is not null,
            backup = backup is null
                ? null
                : new
                {
                    backup.FileName,
                    backup.CreatedAtUtc,
                    backup.SizeBytes
                }
        });
    }

    private async Task VerifyProgressAsync(JsonElement root)
    {
        string requestId = RequestId(root);
        ProgressVerificationResult result = await _storage.VerifyProgressAsync();

        SendMessageToWeb(new
        {
            action = "verify-progress-complete",
            requestId,
            result
        });
    }

    private void OpenDataFolder(JsonElement root)
    {
        string requestId = RequestId(root);
        AcademyPaths.EnsureCreated();

        Process.Start(new ProcessStartInfo
        {
            FileName = _storage.DataRoot,
            UseShellExecute = true
        });

        SendMessageToWeb(new
        {
            action = "open-data-folder-complete",
            requestId,
            path = _storage.DataRoot
        });
    }

    private async Task RunCSharpAsync(JsonElement root)
    {
        string requestId = RequestId(root);

        string code = root.TryGetProperty("code", out JsonElement codeElement)
            ? codeElement.GetString() ?? string.Empty
            : string.Empty;

        CSharpRunResult result = await _csharpRunner.RunAsync(code);

        SendMessageToWeb(new
        {
            action = "run-csharp-complete",
            requestId,
            result
        });
    }

    private static string RequestId(JsonElement root) =>
        root.TryGetProperty("requestId", out JsonElement requestElement)
            ? requestElement.GetString() ?? string.Empty
            : string.Empty;

    private void SendMessageToWeb(object message)
    {
        if (AcademyWebView.CoreWebView2 is null)
        {
            return;
        }

        string json = JsonSerializer.Serialize(message, WebJsonOptions);
        AcademyWebView.CoreWebView2.PostWebMessageAsJson(json);
    }
}
