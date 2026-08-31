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

    public MainWindow()
    {
        InitializeComponent();
        Loaded += MainWindow_Loaded;
    }

    private async void MainWindow_Loaded(
        object sender,
        RoutedEventArgs e)
    {
        await AcademyWebView.EnsureCoreWebView2Async();

        AcademyWebView.CoreWebView2.Settings.IsWebMessageEnabled = true;
        AcademyWebView.CoreWebView2.WebMessageReceived +=
            CoreWebView2_WebMessageReceived;

        string webRoot = Path.Combine(
            AppContext.BaseDirectory,
            "web");

        string indexPath = Path.Combine(
            webRoot,
            "index.html");

        if (!File.Exists(indexPath))
        {
            MessageBox.Show(
                $"Academy interface could not be found.\n\n{indexPath}",
                "Code Ascension Academy",
                MessageBoxButton.OK,
                MessageBoxImage.Error);

            return;
        }

        AcademyWebView.CoreWebView2.SetVirtualHostNameToFolderMapping(
            AcademyHostName,
            webRoot,
            CoreWebView2HostResourceAccessKind.Allow);

        AcademyWebView.CoreWebView2.Navigate(
            $"https://{AcademyHostName}/index.html");
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
                    Application.Current.Shutdown();
                    break;
            }
        }
        catch (Exception exception)
        {
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
        string json = JsonSerializer.Serialize(message, WebJsonOptions);
        AcademyWebView.CoreWebView2.PostWebMessageAsJson(json);
    }
}
