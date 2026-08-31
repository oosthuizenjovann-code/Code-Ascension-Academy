export async function runCSharp(code, outputElement) {
  if (outputElement) {
    outputElement.textContent = 'COMPILING C#...';
  }

  let result;
  try {
    result = await window.DesktopBridge.runCSharp(code);
  } catch (error) {
    result = {
      success: false,
      compiled: false,
      executed: false,
      status: 'bridge-error',
      message: error?.message || String(error),
      stdOut: '',
      stdErr: '',
      buildOutput: '',
      durationMs: 0
    };
  }

  if (outputElement) {
    outputElement.textContent = formatCSharpResult(result);
  }

  return result;
}

export function formatCSharpResult(result) {
  if (!result) return 'C# runner returned no result.';

  const status = String(result.status || 'unknown');
  const lines = [];

  if (status === 'success') lines.push('✓ BUILD SUCCEEDED', '✓ EXECUTION SUCCEEDED');
  else if (status === 'compiled') lines.push('✓ BUILD SUCCEEDED', '• COMPILE-ONLY SNIPPET');
  else if (status === 'compile-error') lines.push('✕ BUILD FAILED');
  else if (status === 'runtime-error') lines.push('✓ BUILD SUCCEEDED', '✕ RUNTIME ERROR');
  else if (status.includes('timeout')) lines.push('✕ EXECUTION STOPPED');
  else if (status.includes('output-limit')) lines.push('✕ OUTPUT LIMIT REACHED');
  else lines.push('✕ C# RUNNER');

  if (result.message) {
    lines.push('', String(result.message));
  }

  if (result.stdOut) {
    lines.push('', 'OUTPUT', String(result.stdOut));
  }

  if (result.stdErr) {
    lines.push('', 'ERROR OUTPUT', String(result.stdErr));
  }

  if (!result.compiled && result.buildOutput) {
    lines.push('', 'COMPILER', cleanBuildOutput(result.buildOutput));
  }

  if (Number.isFinite(Number(result.durationMs))) {
    lines.push('', `Completed in ${(Number(result.durationMs) / 1000).toFixed(2)}s`);
  }

  return lines.join('\n').trim();
}

function cleanBuildOutput(value) {
  return String(value || '')
    .split(/\r?\n/)
    .filter(line => {
      const text = line.trim();
      if (!text) return false;
      if (/^Determining projects to restore/i.test(text)) return false;
      if (/^All projects are up-to-date for restore/i.test(text)) return false;
      if (/^Restore complete/i.test(text)) return false;
      return true;
    })
    .join('\n')
    .trim();
}
