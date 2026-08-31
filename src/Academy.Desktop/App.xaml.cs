using System;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading;
using System.Windows;
using System.Windows.Threading;

namespace Academy.Desktop;

public partial class App : Application
{
    private const string SingleInstanceMutexName =
        @"Local\CodeAscensionAcademy.Desktop.SingleInstance.v2";

    private Mutex? _singleInstanceMutex;
    private bool _ownsSingleInstanceMutex;

    protected override void OnStartup(StartupEventArgs e)
    {
        DesktopDiagnostics.Log("Application startup requested.");

        _singleInstanceMutex = new Mutex(
            true,
            SingleInstanceMutexName,
            out bool createdNew);

        _ownsSingleInstanceMutex = createdNew;

        if (!createdNew)
        {
            DesktopDiagnostics.Log(
                "A second launch was blocked because the Academy is already running.");

            TryActivateExistingInstance();
            Shutdown(0);
            return;
        }

        ShutdownMode = ShutdownMode.OnMainWindowClose;
        RegisterDiagnostics();

        base.OnStartup(e);

        var window = new MainWindow();
        MainWindow = window;
        window.Show();

        DesktopDiagnostics.Log("Main window shown.");
    }

    protected override void OnExit(ExitEventArgs e)
    {
        DesktopDiagnostics.Log($"Application exiting with code {e.ApplicationExitCode}.");

        if (_ownsSingleInstanceMutex)
        {
            try
            {
                _singleInstanceMutex?.ReleaseMutex();
            }
            catch (ApplicationException)
            {
                // The process is already exiting; nothing else is required.
            }
        }

        _singleInstanceMutex?.Dispose();
        base.OnExit(e);
    }

    private void RegisterDiagnostics()
    {
        DispatcherUnhandledException += (_, args) =>
        {
            DesktopDiagnostics.LogException(
                "Unhandled WPF dispatcher exception",
                args.Exception);
        };

        AppDomain.CurrentDomain.UnhandledException += (_, args) =>
        {
            if (args.ExceptionObject is Exception exception)
            {
                DesktopDiagnostics.LogException(
                    "Unhandled application-domain exception",
                    exception);
            }
            else
            {
                DesktopDiagnostics.Log(
                    $"Unhandled application-domain failure: {args.ExceptionObject}");
            }
        };

        TaskScheduler.UnobservedTaskException += (_, args) =>
        {
            DesktopDiagnostics.LogException(
                "Unobserved task exception",
                args.Exception);
        };
    }

    private static void TryActivateExistingInstance()
    {
        try
        {
            Process current = Process.GetCurrentProcess();
            Process? existing = Process
                .GetProcessesByName(current.ProcessName)
                .FirstOrDefault(process =>
                    process.Id != current.Id &&
                    process.MainWindowHandle != IntPtr.Zero);

            if (existing is null)
            {
                return;
            }

            ShowWindow(existing.MainWindowHandle, 9);
            SetForegroundWindow(existing.MainWindowHandle);
        }
        catch (Exception exception)
        {
            DesktopDiagnostics.LogException(
                "Could not activate the existing Academy instance",
                exception);
        }
    }

    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool SetForegroundWindow(IntPtr hWnd);

    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
