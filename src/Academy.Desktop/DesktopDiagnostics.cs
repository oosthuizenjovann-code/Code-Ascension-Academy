using System;
using System.IO;
using Academy.Core.Storage;

namespace Academy.Desktop;

internal static class DesktopDiagnostics
{
    private static readonly object Gate = new();

    public static string LogDirectory => Path.Combine(
        AcademyPaths.RootDirectory,
        "logs");

    public static string LogFile => Path.Combine(
        LogDirectory,
        "desktop.log");

    public static void Log(string message)
    {
        try
        {
            lock (Gate)
            {
                Directory.CreateDirectory(LogDirectory);
                File.AppendAllText(
                    LogFile,
                    $"{DateTimeOffset.Now:yyyy-MM-dd HH:mm:ss.fff zzz} " +
                    $"[PID {Environment.ProcessId}] {message}{Environment.NewLine}");
            }
        }
        catch
        {
            // Diagnostics must never stop the Academy from launching.
        }
    }

    public static void LogException(string context, Exception exception)
    {
        Log($"{context}: {exception.GetType().Name}: {exception.Message}\n{exception.StackTrace}");
    }
}
