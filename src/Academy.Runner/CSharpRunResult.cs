namespace Academy.Runner;

public sealed class CSharpRunResult
{
    public bool Success { get; init; }
    public bool Compiled { get; init; }
    public bool Executed { get; init; }
    public bool TimedOut { get; init; }
    public bool OutputLimitExceeded { get; init; }
    public int? ExitCode { get; init; }
    public long DurationMs { get; init; }
    public string Status { get; init; } = "host-error";
    public string Message { get; init; } = string.Empty;
    public string StdOut { get; init; } = string.Empty;
    public string StdErr { get; init; } = string.Empty;
    public string BuildOutput { get; init; } = string.Empty;
}
