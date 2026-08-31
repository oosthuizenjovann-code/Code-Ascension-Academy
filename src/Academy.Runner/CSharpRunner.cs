using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Academy.Runner;

public sealed class CSharpRunner
{
    private static readonly TimeSpan BuildTimeout = TimeSpan.FromSeconds(25);
    private static readonly TimeSpan ExecutionTimeout = TimeSpan.FromSeconds(5);
    private const int MaxOutputCharacters = 50_000;
    private const int MaxCodeCharacters = 150_000;

    public async Task<CSharpRunResult> RunAsync(string? code)
    {
        string source = code ?? string.Empty;
        Stopwatch stopwatch = Stopwatch.StartNew();

        if (string.IsNullOrWhiteSpace(source))
        {
            return Result(
                success: false,
                compiled: false,
                executed: false,
                status: "empty",
                message: "The C# editor is empty.",
                stopwatch: stopwatch);
        }

        if (source.Length > MaxCodeCharacters)
        {
            return Result(
                success: false,
                compiled: false,
                executed: false,
                status: "code-too-large",
                message: $"The submission is larger than the {MaxCodeCharacters:N0}-character runner limit.",
                stopwatch: stopwatch);
        }

        string workspace = Path.Combine(
            Path.GetTempPath(),
            "CodeAscensionAcademy",
            "Runner",
            Guid.NewGuid().ToString("N"));

        Directory.CreateDirectory(workspace);

        try
        {
            string projectFile = Path.Combine(workspace, "AcademySubmission.csproj");
            string programFile = Path.Combine(workspace, "Program.cs");
            string nugetFile = Path.Combine(workspace, "NuGet.Config");

            await File.WriteAllTextAsync(programFile, source, new UTF8Encoding(false));
            await File.WriteAllTextAsync(nugetFile, NuGetConfig, new UTF8Encoding(false));
            await File.WriteAllTextAsync(projectFile, CreateProjectFile("Exe"), new UTF8Encoding(false));

            ProcessCapture build = await RunProcessAsync(
                fileName: "dotnet",
                arguments:
                [
                    "build",
                    projectFile,
                    "--configuration", "Release",
                    "--nologo",
                    "--verbosity", "minimal",
                    "--disable-build-servers"
                ],
                workingDirectory: workspace,
                timeout: BuildTimeout,
                outputLimit: MaxOutputCharacters);

            if (build.TimedOut)
            {
                return Result(
                    success: false,
                    compiled: false,
                    executed: false,
                    timedOut: true,
                    status: "build-timeout",
                    message: "Compilation exceeded the Academy build-time limit.",
                    buildOutput: Combine(build.StdOut, build.StdErr),
                    stopwatch: stopwatch);
            }

            if (build.OutputLimitExceeded)
            {
                return Result(
                    success: false,
                    compiled: false,
                    executed: false,
                    outputLimitExceeded: true,
                    status: "build-output-limit",
                    message: "Compiler output exceeded the Academy output limit.",
                    buildOutput: Combine(build.StdOut, build.StdErr),
                    stopwatch: stopwatch);
            }

            bool compileOnly = false;
            if (build.ExitCode != 0 && ContainsMissingEntryPoint(build))
            {
                await File.WriteAllTextAsync(projectFile, CreateProjectFile("Library"), new UTF8Encoding(false));

                build = await RunProcessAsync(
                    fileName: "dotnet",
                    arguments:
                    [
                        "build",
                        projectFile,
                        "--configuration", "Release",
                        "--nologo",
                        "--verbosity", "minimal",
                        "--disable-build-servers"
                    ],
                    workingDirectory: workspace,
                    timeout: BuildTimeout,
                    outputLimit: MaxOutputCharacters);

                compileOnly = build.ExitCode == 0 && !build.TimedOut && !build.OutputLimitExceeded;
            }

            string buildOutput = Combine(build.StdOut, build.StdErr);

            if (build.TimedOut)
            {
                return Result(
                    success: false,
                    compiled: false,
                    executed: false,
                    timedOut: true,
                    status: "build-timeout",
                    message: "Compilation exceeded the Academy build-time limit.",
                    buildOutput: buildOutput,
                    stopwatch: stopwatch);
            }

            if (build.OutputLimitExceeded)
            {
                return Result(
                    success: false,
                    compiled: false,
                    executed: false,
                    outputLimitExceeded: true,
                    status: "build-output-limit",
                    message: "Compiler output exceeded the Academy output limit.",
                    buildOutput: buildOutput,
                    stopwatch: stopwatch);
            }

            if (build.ExitCode != 0)
            {
                return Result(
                    success: false,
                    compiled: false,
                    executed: false,
                    exitCode: build.ExitCode,
                    status: "compile-error",
                    message: "The C# compiler found one or more errors.",
                    buildOutput: buildOutput,
                    stopwatch: stopwatch);
            }

            if (compileOnly)
            {
                return Result(
                    success: true,
                    compiled: true,
                    executed: false,
                    exitCode: 0,
                    status: "compiled",
                    message: "Build succeeded. This snippet has no executable entry point, so the Academy validated it as a library instead of running it.",
                    buildOutput: buildOutput,
                    stopwatch: stopwatch);
            }

            string assemblyPath = Path.Combine(
                workspace,
                "bin",
                "Release",
                "net10.0",
                "AcademySubmission.dll");

            if (!File.Exists(assemblyPath))
            {
                return Result(
                    success: false,
                    compiled: true,
                    executed: false,
                    status: "assembly-missing",
                    message: "Compilation succeeded, but the runner could not locate the generated assembly.",
                    buildOutput: buildOutput,
                    stopwatch: stopwatch);
            }

            ProcessCapture execution = await RunProcessAsync(
                fileName: "dotnet",
                arguments: [assemblyPath],
                workingDirectory: workspace,
                timeout: ExecutionTimeout,
                outputLimit: MaxOutputCharacters);

            if (execution.TimedOut)
            {
                return Result(
                    success: false,
                    compiled: true,
                    executed: true,
                    timedOut: true,
                    status: "timeout",
                    message: "Execution was stopped after 5 seconds. Check for an infinite loop or code waiting indefinitely.",
                    stdOut: execution.StdOut,
                    stdErr: execution.StdErr,
                    buildOutput: buildOutput,
                    stopwatch: stopwatch);
            }

            if (execution.OutputLimitExceeded)
            {
                return Result(
                    success: false,
                    compiled: true,
                    executed: true,
                    outputLimitExceeded: true,
                    status: "output-limit",
                    message: "Execution was stopped because the program produced too much output.",
                    stdOut: execution.StdOut,
                    stdErr: execution.StdErr,
                    buildOutput: buildOutput,
                    stopwatch: stopwatch);
            }

            bool success = execution.ExitCode == 0;
            return Result(
                success: success,
                compiled: true,
                executed: true,
                exitCode: execution.ExitCode,
                status: success ? "success" : "runtime-error",
                message: success
                    ? "Build and execution succeeded."
                    : "The program compiled, but exited with a runtime error.",
                stdOut: execution.StdOut,
                stdErr: execution.StdErr,
                buildOutput: buildOutput,
                stopwatch: stopwatch);
        }
        catch (Exception exception)
        {
            return Result(
                success: false,
                compiled: false,
                executed: false,
                status: "host-error",
                message: $"The local C# runner could not start: {exception.Message}",
                stopwatch: stopwatch);
        }
        finally
        {
            TryDeleteDirectory(workspace);
        }
    }

    private static async Task<ProcessCapture> RunProcessAsync(
        string fileName,
        IReadOnlyList<string> arguments,
        string workingDirectory,
        TimeSpan timeout,
        int outputLimit)
    {
        using Process process = new()
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = fileName,
                WorkingDirectory = workingDirectory,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                RedirectStandardInput = true,
                CreateNoWindow = true
            },
            EnableRaisingEvents = true
        };

        foreach (string argument in arguments)
        {
            process.StartInfo.ArgumentList.Add(argument);
        }

        process.StartInfo.Environment["DOTNET_CLI_TELEMETRY_OPTOUT"] = "1";
        process.StartInfo.Environment["DOTNET_NOLOGO"] = "1";
        process.StartInfo.Environment["DOTNET_SKIP_FIRST_TIME_EXPERIENCE"] = "1";

        StringBuilder stdout = new();
        StringBuilder stderr = new();
        object sync = new();
        int characterCount = 0;
        bool outputLimitExceeded = false;

        void AppendLimited(StringBuilder target, string? line)
        {
            if (line is null) return;

            lock (sync)
            {
                if (outputLimitExceeded) return;

                int remaining = outputLimit - characterCount;
                string value = line + Environment.NewLine;

                if (remaining <= 0)
                {
                    outputLimitExceeded = true;
                }
                else if (value.Length > remaining)
                {
                    target.Append(value.AsSpan(0, remaining));
                    characterCount += remaining;
                    outputLimitExceeded = true;
                }
                else
                {
                    target.Append(value);
                    characterCount += value.Length;
                }
            }

            if (outputLimitExceeded)
            {
                TryKill(process);
            }
        }

        process.OutputDataReceived += (_, eventArgs) => AppendLimited(stdout, eventArgs.Data);
        process.ErrorDataReceived += (_, eventArgs) => AppendLimited(stderr, eventArgs.Data);

        if (!process.Start())
        {
            throw new InvalidOperationException($"Could not start process '{fileName}'.");
        }

        process.StandardInput.Close();
        process.BeginOutputReadLine();
        process.BeginErrorReadLine();

        bool timedOut = false;
        using CancellationTokenSource cancellation = new(timeout);

        try
        {
            await process.WaitForExitAsync(cancellation.Token);
        }
        catch (OperationCanceledException)
        {
            timedOut = true;
            TryKill(process);
            await process.WaitForExitAsync();
        }

        process.WaitForExit();

        return new ProcessCapture
        {
            ExitCode = process.HasExited ? process.ExitCode : -1,
            StdOut = stdout.ToString().TrimEnd(),
            StdErr = stderr.ToString().TrimEnd(),
            TimedOut = timedOut,
            OutputLimitExceeded = outputLimitExceeded
        };
    }

    private static bool ContainsMissingEntryPoint(ProcessCapture build)
    {
        string output = Combine(build.StdOut, build.StdErr);
        return output.Contains("CS5001", StringComparison.OrdinalIgnoreCase);
    }

    private static string CreateProjectFile(string outputType) => $$"""
        <Project Sdk="Microsoft.NET.Sdk">
          <PropertyGroup>
            <OutputType>{{outputType}}</OutputType>
            <TargetFramework>net10.0</TargetFramework>
            <ImplicitUsings>enable</ImplicitUsings>
            <Nullable>enable</Nullable>
            <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
            <RestoreIgnoreFailedSources>true</RestoreIgnoreFailedSources>
            <TreatWarningsAsErrors>false</TreatWarningsAsErrors>
            <AssemblyName>AcademySubmission</AssemblyName>
          </PropertyGroup>
        </Project>
        """;

    private const string NuGetConfig = """
        <?xml version="1.0" encoding="utf-8"?>
        <configuration>
          <packageSources>
            <clear />
          </packageSources>
        </configuration>
        """;

    private static CSharpRunResult Result(
        bool success,
        bool compiled,
        bool executed,
        string status,
        string message,
        Stopwatch stopwatch,
        bool timedOut = false,
        bool outputLimitExceeded = false,
        int? exitCode = null,
        string stdOut = "",
        string stdErr = "",
        string buildOutput = "")
    {
        stopwatch.Stop();
        return new CSharpRunResult
        {
            Success = success,
            Compiled = compiled,
            Executed = executed,
            TimedOut = timedOut,
            OutputLimitExceeded = outputLimitExceeded,
            ExitCode = exitCode,
            DurationMs = stopwatch.ElapsedMilliseconds,
            Status = status,
            Message = message,
            StdOut = stdOut,
            StdErr = stdErr,
            BuildOutput = buildOutput
        };
    }

    private static string Combine(string first, string second)
    {
        if (string.IsNullOrWhiteSpace(first)) return second.Trim();
        if (string.IsNullOrWhiteSpace(second)) return first.Trim();
        return $"{first.Trim()}\n{second.Trim()}";
    }

    private static void TryKill(Process process)
    {
        try
        {
            if (!process.HasExited)
            {
                process.Kill(entireProcessTree: true);
            }
        }
        catch
        {
            // Best-effort cleanup for a short-lived local runner process.
        }
    }

    private static void TryDeleteDirectory(string path)
    {
        try
        {
            if (Directory.Exists(path))
            {
                Directory.Delete(path, recursive: true);
            }
        }
        catch
        {
            // Temporary runner folders are also cleaned up by the OS eventually.
        }
    }

    private sealed class ProcessCapture
    {
        public int ExitCode { get; init; }
        public string StdOut { get; init; } = string.Empty;
        public string StdErr { get; init; } = string.Empty;
        public bool TimedOut { get; init; }
        public bool OutputLimitExceeded { get; init; }
    }
}
