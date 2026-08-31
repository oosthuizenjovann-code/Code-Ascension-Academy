using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Academy.Core.Storage;

public sealed class AcademyStorageService
{
    private const int MaximumBackups = 30;
    private static readonly TimeSpan AutomaticBackupInterval = TimeSpan.FromMinutes(15);

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        WriteIndented = true
    };

    private readonly SemaphoreSlim _gate = new(1, 1);

    public AcademyStorageService()
    {
        AcademyPaths.EnsureCreated();
    }

    public string DataRoot => AcademyPaths.RootDirectory;
    public string ProgressFile => AcademyPaths.ProgressFile;

    public async Task SaveProgressAsync(
        JsonElement progress,
        CancellationToken cancellationToken = default)
    {
        await _gate.WaitAsync(cancellationToken);
        try
        {
            AcademyPaths.EnsureCreated();
            await CreateAutomaticBackupIfDueCoreAsync(cancellationToken);

            string temporaryFile = AcademyPaths.ProgressFile + ".tmp";
            var envelope = new ProgressEnvelope
            {
                SchemaVersion = 1,
                SavedAtUtc = DateTimeOffset.UtcNow,
                Progress = progress.Clone()
            };

            await WriteEnvelopeAsync(temporaryFile, envelope, cancellationToken);
            File.Move(temporaryFile, AcademyPaths.ProgressFile, overwrite: true);
        }
        finally
        {
            _gate.Release();
        }
    }

    public async Task<JsonElement?> LoadProgressAsync(
        CancellationToken cancellationToken = default)
    {
        await _gate.WaitAsync(cancellationToken);
        try
        {
            ProgressEnvelope? envelope = await ReadEnvelopeAsync(
                AcademyPaths.ProgressFile,
                cancellationToken);

            return envelope?.Progress.ValueKind == JsonValueKind.Undefined
                ? null
                : envelope?.Progress.Clone();
        }
        finally
        {
            _gate.Release();
        }
    }

    public async Task<AcademyBackupInfo?> CreateBackupAsync(
        string reason = "manual",
        CancellationToken cancellationToken = default)
    {
        await _gate.WaitAsync(cancellationToken);
        try
        {
            if (!File.Exists(AcademyPaths.ProgressFile))
            {
                return null;
            }

            AcademyBackupInfo backup = await CreateBackupCoreAsync(reason, cancellationToken);
            TrimBackupsCore();
            return backup;
        }
        finally
        {
            _gate.Release();
        }
    }

    public IReadOnlyList<AcademyBackupInfo> GetBackups()
    {
        AcademyPaths.EnsureCreated();

        return Directory
            .EnumerateFiles(AcademyPaths.BackupsDirectory, "*.json", SearchOption.TopDirectoryOnly)
            .Select(path =>
            {
                var info = new FileInfo(path);
                return new AcademyBackupInfo(
                    info.Name,
                    info.FullName,
                    info.LastWriteTimeUtc,
                    info.Length);
            })
            .OrderByDescending(item => item.CreatedAtUtc)
            .ToArray();
    }

    public async Task<AcademyBackupInfo?> RestoreLatestBackupAsync(
        CancellationToken cancellationToken = default)
    {
        await _gate.WaitAsync(cancellationToken);
        try
        {
            AcademyBackupInfo? latest = GetBackups().FirstOrDefault();
            if (latest is null)
            {
                return null;
            }

            await RestoreBackupCoreAsync(latest.FileName, cancellationToken);
            return latest;
        }
        finally
        {
            _gate.Release();
        }
    }

    public async Task<ProgressVerificationResult> VerifyProgressAsync(
        CancellationToken cancellationToken = default)
    {
        await _gate.WaitAsync(cancellationToken);
        try
        {
            if (!File.Exists(AcademyPaths.ProgressFile))
            {
                return new ProgressVerificationResult(
                    false,
                    "No progress file exists yet.",
                    null,
                    0);
            }

            try
            {
                ProgressEnvelope? envelope = await ReadEnvelopeAsync(
                    AcademyPaths.ProgressFile,
                    cancellationToken);

                if (envelope is null || envelope.Progress.ValueKind == JsonValueKind.Undefined)
                {
                    return new ProgressVerificationResult(
                        false,
                        "The save file could be read, but it does not contain progress data.",
                        envelope?.SavedAtUtc,
                        new FileInfo(AcademyPaths.ProgressFile).Length);
                }

                return new ProgressVerificationResult(
                    true,
                    "The local progress file is valid JSON and contains Academy progress data.",
                    envelope.SavedAtUtc,
                    new FileInfo(AcademyPaths.ProgressFile).Length);
            }
            catch (JsonException exception)
            {
                return new ProgressVerificationResult(
                    false,
                    $"The progress file is not valid JSON: {exception.Message}",
                    null,
                    new FileInfo(AcademyPaths.ProgressFile).Length);
            }
        }
        finally
        {
            _gate.Release();
        }
    }

    private async Task CreateAutomaticBackupIfDueCoreAsync(
        CancellationToken cancellationToken)
    {
        if (!File.Exists(AcademyPaths.ProgressFile))
        {
            return;
        }

        AcademyBackupInfo? latestAutomatic = GetBackups()
            .FirstOrDefault(item => item.FileName.StartsWith("auto-", StringComparison.OrdinalIgnoreCase));

        if (latestAutomatic is not null &&
            DateTimeOffset.UtcNow - latestAutomatic.CreatedAtUtc < AutomaticBackupInterval)
        {
            return;
        }

        await CreateBackupCoreAsync("auto", cancellationToken);
        TrimBackupsCore();
    }

    private async Task<AcademyBackupInfo> CreateBackupCoreAsync(
        string reason,
        CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();
        AcademyPaths.EnsureCreated();

        string safeReason = new string(
            (reason ?? "backup")
                .Where(character => char.IsLetterOrDigit(character) || character == '-')
                .ToArray());

        if (string.IsNullOrWhiteSpace(safeReason))
        {
            safeReason = "backup";
        }

        string fileName = $"{safeReason}-{DateTimeOffset.UtcNow:yyyyMMdd-HHmmss-fff}.json";
        string destination = Path.Combine(AcademyPaths.BackupsDirectory, fileName);

        await using FileStream source = new(
            AcademyPaths.ProgressFile,
            FileMode.Open,
            FileAccess.Read,
            FileShare.Read,
            4096,
            useAsync: true);

        await using FileStream target = new(
            destination,
            FileMode.CreateNew,
            FileAccess.Write,
            FileShare.None,
            4096,
            useAsync: true);

        await source.CopyToAsync(target, cancellationToken);
        await target.FlushAsync(cancellationToken);

        var info = new FileInfo(destination);
        return new AcademyBackupInfo(
            info.Name,
            info.FullName,
            info.LastWriteTimeUtc,
            info.Length);
    }

    private async Task RestoreBackupCoreAsync(
        string fileName,
        CancellationToken cancellationToken)
    {
        string safeName = Path.GetFileName(fileName);
        string sourcePath = Path.Combine(AcademyPaths.BackupsDirectory, safeName);

        if (!File.Exists(sourcePath))
        {
            throw new FileNotFoundException("The selected Academy backup no longer exists.", sourcePath);
        }

        ProgressEnvelope? sourceEnvelope = await ReadEnvelopeAsync(sourcePath, cancellationToken);
        if (sourceEnvelope is null || sourceEnvelope.Progress.ValueKind == JsonValueKind.Undefined)
        {
            throw new InvalidDataException("The selected backup does not contain valid Academy progress data.");
        }

        if (File.Exists(AcademyPaths.ProgressFile))
        {
            await CreateBackupCoreAsync("pre-restore", cancellationToken);
        }

        string temporaryFile = AcademyPaths.ProgressFile + ".restore.tmp";
        File.Copy(sourcePath, temporaryFile, overwrite: true);
        File.Move(temporaryFile, AcademyPaths.ProgressFile, overwrite: true);
        TrimBackupsCore();
    }

    private static async Task WriteEnvelopeAsync(
        string path,
        ProgressEnvelope envelope,
        CancellationToken cancellationToken)
    {
        await using var stream = new FileStream(
            path,
            FileMode.Create,
            FileAccess.Write,
            FileShare.None,
            4096,
            useAsync: true);

        await JsonSerializer.SerializeAsync(
            stream,
            envelope,
            JsonOptions,
            cancellationToken);

        await stream.FlushAsync(cancellationToken);
    }

    private static async Task<ProgressEnvelope?> ReadEnvelopeAsync(
        string path,
        CancellationToken cancellationToken)
    {
        if (!File.Exists(path))
        {
            return null;
        }

        await using var stream = new FileStream(
            path,
            FileMode.Open,
            FileAccess.Read,
            FileShare.Read,
            4096,
            useAsync: true);

        return await JsonSerializer.DeserializeAsync<ProgressEnvelope>(
            stream,
            JsonOptions,
            cancellationToken);
    }

    private static void TrimBackupsCore()
    {
        FileInfo[] backups = new DirectoryInfo(AcademyPaths.BackupsDirectory)
            .GetFiles("*.json")
            .OrderByDescending(file => file.LastWriteTimeUtc)
            .ToArray();

        foreach (FileInfo oldBackup in backups.Skip(MaximumBackups))
        {
            try
            {
                oldBackup.Delete();
            }
            catch
            {
                // Backup cleanup is best effort; never fail a learner save because
                // an old backup could not be deleted.
            }
        }
    }

    private sealed class ProgressEnvelope
    {
        public int SchemaVersion { get; init; }
        public DateTimeOffset SavedAtUtc { get; init; }
        public JsonElement Progress { get; init; }
    }
}

public sealed record AcademyBackupInfo(
    string FileName,
    string FullPath,
    DateTimeOffset CreatedAtUtc,
    long SizeBytes);

public sealed record ProgressVerificationResult(
    bool IsValid,
    string Message,
    DateTimeOffset? SavedAtUtc,
    long SizeBytes);
