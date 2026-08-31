using System;
using System.IO;
using System.Text.Json;
using System.Windows;
using Academy.Core.Storage;
using Microsoft.Web.WebView2.Core;

namespace Academy.Desktop;

public partial class MainWindow : Window
{
    private readonly AcademyStorageService _storage = new();

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

        AcademyWebView.Source = new Uri(indexPath);
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

                case "quit":
                    Application.Current.Shutdown();
                    break;
            }
        }
        catch (Exception exception)
        {
            SendMessageToWeb(new
            {
                action = "storage-error",
                message = exception.Message
            });
        }
    }

    private void SendMessageToWeb(object message)
    {
        string json = JsonSerializer.Serialize(message);
        AcademyWebView.CoreWebView2.PostWebMessageAsJson(json);
    }
}
