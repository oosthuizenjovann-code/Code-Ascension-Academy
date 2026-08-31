using System;
using System.IO;
using System.Windows;

namespace Academy.Desktop;

public partial class MainWindow : Window
{
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

        AcademyWebView.Source =
            new Uri(indexPath);
    }
}