using System;
using System.IO;

namespace Academy.Core.Storage;

public static class AcademyPaths
{
    public static string RootDirectory { get; } = Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments),
        "Code Ascension Academy");

    public static string ProgressFile =>
        Path.Combine(RootDirectory, "progress.json");

    public static string NotesDirectory =>
        Path.Combine(RootDirectory, "notes");

    public static string AttemptsDirectory =>
        Path.Combine(RootDirectory, "attempts");

    public static string ProjectsDirectory =>
        Path.Combine(RootDirectory, "projects");

    public static string BackupsDirectory =>
        Path.Combine(RootDirectory, "backups");

    public static void EnsureCreated()
    {
        Directory.CreateDirectory(RootDirectory);
        Directory.CreateDirectory(NotesDirectory);
        Directory.CreateDirectory(AttemptsDirectory);
        Directory.CreateDirectory(ProjectsDirectory);
        Directory.CreateDirectory(BackupsDirectory);
    }
}
