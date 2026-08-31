using System;
using System.IO;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Academy.Core.Storage;

public sealed class AcademyStorageService
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        WriteIndented = true
    };

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
        AcademyPaths.EnsureCreated();

        string temporaryFile = AcademyPaths.ProgressFile + ".tmp";

        var envelope = new ProgressEnvelope
        {
            SchemaVersion = 1,
            SavedAtUtc = DateTimeOffset.UtcNow,
            Progress = progress.Clone()
        };

        await using (var stream = new FileStream(
            temporaryFile,
            FileMode.Create,
            FileAccess.Write,
            FileShare.None,
            bufferSize: 4096,
            useAsync: true))
        {
            await JsonSerializer.SerializeAsync(
                stream,
                envelope,
                JsonOptions,
                cancellationToken);

            await stream.FlushAsync(cancellationToken);
        }

        File.Move(
            temporaryFile,
            AcademyPaths.ProgressFile,
            overwrite: true);
    }

    public async Task<JsonElement?> LoadProgressAsync(
        CancellationToken cancellationToken = default)
    {
        if (!File.Exists(AcademyPaths.ProgressFile))
        {
            return null;
        }

        await using var stream = new FileStream(
            AcademyPaths.ProgressFile,
            FileMode.Open,
            FileAccess.Read,
            FileShare.Read,
            bufferSize: 4096,
            useAsync: true);

        ProgressEnvelope? envelope =
            await JsonSerializer.DeserializeAsync<ProgressEnvelope>(
                stream,
                JsonOptions,
                cancellationToken);

        if (envelope is null ||
            envelope.Progress.ValueKind == JsonValueKind.Undefined)
        {
            return null;
        }

        return envelope.Progress.Clone();
    }

    private sealed class ProgressEnvelope
    {
        public int SchemaVersion { get; init; }

        public DateTimeOffset SavedAtUtc { get; init; }

        public JsonElement Progress { get; init; }
    }
}
