import { $ } from './utils.js';

export function createDataSafetyController() {
  function setStatus(message, tone = 'neutral') {
    const target = $('dataSafetyStatus');
    if (!target) return;
    target.textContent = message;
    target.dataset.tone = tone;
  }

  function formatDate(value) {
    if (!value) return 'Never';
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? 'Unknown'
      : date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  }

  function formatBytes(bytes) {
    const value = Number(bytes) || 0;
    if (value < 1024) return `${value} B`;
    if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
    return `${(value / (1024 * 1024)).toFixed(1)} MB`;
  }

  async function refresh() {
    if (!$('backupSummary')) return;

    if (!window.DesktopBridge.available()) {
      $('backupSummary').textContent = 'Browser fallback mode — native backups are available in the desktop app.';
      setStatus('Desktop storage tools are unavailable in browser fallback mode.');
      return;
    }

    $('backupSummary').textContent = 'Checking local backups…';
    const response = await window.DesktopBridge.backupStatus();

    if (response.timedOut || response.unavailable) {
      $('backupSummary').textContent = response.message || 'Backup status unavailable.';
      return;
    }

    if (!response.count) {
      $('backupSummary').textContent = 'No backup snapshots yet. Automatic backups begin once progress has been saved.';
      return;
    }

    const latest = response.latest;
    $('backupSummary').textContent = `${response.count} backup${response.count === 1 ? '' : 's'} available. Latest: ${formatDate(latest?.createdAtUtc)} (${formatBytes(latest?.sizeBytes)}).`;
  }

  async function createBackup() {
    setStatus('Creating a manual backup…');
    const response = await window.DesktopBridge.createBackup();

    if (response.created) {
      setStatus(`Backup created: ${response.backup?.fileName || 'snapshot saved'}.`, 'success');
      await refresh();
      return;
    }

    setStatus(response.message || 'There is no progress file to back up yet.', 'warning');
  }

  async function restoreLatest() {
    if (!confirm('Restore the latest local backup? A safety snapshot of the current save will be created first.')) return;

    setStatus('Restoring the latest backup…');
    const response = await window.DesktopBridge.restoreLatestBackup();

    if (!response.restored) {
      setStatus(response.message || 'No backup was available to restore.', 'warning');
      return;
    }

    setStatus(`Restored ${response.backup?.fileName || 'latest backup'}. Reloading Academy…`, 'success');
    window.setTimeout(() => window.location.reload(), 700);
  }

  async function verify() {
    setStatus('Verifying progress.json…');
    const response = await window.DesktopBridge.verifyProgress();
    const result = response.result;

    if (!result) {
      setStatus(response.message || 'Verification could not be completed.', 'warning');
      return;
    }

    const suffix = result.savedAtUtc
      ? ` Last saved ${formatDate(result.savedAtUtc)}; ${formatBytes(result.sizeBytes)}.`
      : '';

    setStatus(`${result.message}${suffix}`, result.isValid ? 'success' : 'danger');
  }

  async function openFolder() {
    setStatus('Opening the local Academy data folder…');
    const response = await window.DesktopBridge.openDataFolder();
    if (response.path) setStatus(`Opened ${response.path}`, 'success');
  }

  return {
    refresh,
    createBackup,
    restoreLatest,
    verify,
    openFolder
  };
}
