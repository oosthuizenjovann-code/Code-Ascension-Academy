(() => {
  const pendingLoads = [];
  const pendingRuns = new Map();
  const pendingRequests = new Map();
  let requestCounter = 0;

  function available() {
    return Boolean(window.chrome && window.chrome.webview);
  }

  function post(action, extra = {}) {
    if (!available()) return false;
    window.chrome.webview.postMessage({ action, ...extra });
    return true;
  }

  function browserLoad() {
    try {
      const raw = localStorage.getItem('codeAscensionSave');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function browserSave(state) {
    try {
      localStorage.setItem('codeAscensionSave', JSON.stringify(state));
    } catch (error) {
      console.error('Academy browser fallback save failed.', error);
    }
  }

  function unavailableRunnerResult() {
    return {
      success: false,
      compiled: false,
      executed: false,
      status: 'unavailable',
      message: 'The real C# runner is available only inside the Code Ascension Academy desktop application.',
      stdOut: '',
      stdErr: '',
      buildOutput: '',
      durationMs: 0
    };
  }

  function request(action, expectedAction, extra = {}, timeoutMs = 10000) {
    if (!available()) {
      return Promise.resolve({
        unavailable: true,
        message: 'This feature is available in the desktop application.'
      });
    }

    const requestId = `desktop-${Date.now()}-${++requestCounter}`;

    return new Promise(resolve => {
      const timeoutId = window.setTimeout(() => {
        pendingRequests.delete(requestId);
        resolve({
          timedOut: true,
          message: 'The desktop application did not respond in time.'
        });
      }, timeoutMs);

      pendingRequests.set(requestId, { resolve, timeoutId, expectedAction });
      post(action, { requestId, ...extra });
    });
  }

  const DesktopBridge = {
    available,

    loadProgress() {
      if (!available()) return Promise.resolve(browserLoad());

      return new Promise(resolve => {
        pendingLoads.push(resolve);
        post('load-progress');

        window.setTimeout(() => {
          const index = pendingLoads.indexOf(resolve);
          if (index >= 0) {
            pendingLoads.splice(index, 1);
            resolve(browserLoad());
          }
        }, 2500);
      });
    },

    saveProgress(state) {
      if (!post('save-progress', { payload: state })) {
        browserSave(state);
      }
    },

    runCSharp(code) {
      if (!available()) return Promise.resolve(unavailableRunnerResult());

      const requestId = `csharp-${Date.now()}-${++requestCounter}`;

      return new Promise(resolve => {
        const timeoutId = window.setTimeout(() => {
          pendingRuns.delete(requestId);
          resolve({
            success: false,
            compiled: false,
            executed: false,
            timedOut: true,
            status: 'bridge-timeout',
            message: 'The desktop runner did not respond in time.',
            stdOut: '',
            stdErr: '',
            buildOutput: '',
            durationMs: 0
          });
        }, 35000);

        pendingRuns.set(requestId, { resolve, timeoutId });

        if (!post('run-csharp', { requestId, code: String(code || '') })) {
          window.clearTimeout(timeoutId);
          pendingRuns.delete(requestId);
          resolve(unavailableRunnerResult());
        }
      });
    },

    backupStatus() {
      return request('get-backup-status', 'backup-status-complete');
    },

    createBackup() {
      return request('create-backup', 'create-backup-complete');
    },

    restoreLatestBackup() {
      return request('restore-latest-backup', 'restore-backup-complete', {}, 15000);
    },

    verifyProgress() {
      return request('verify-progress', 'verify-progress-complete');
    },

    openDataFolder() {
      return request('open-data-folder', 'open-data-folder-complete');
    },

    quit() {
      if (!post('quit')) {
        window.close();
      }
    },

    requestDataLocation() {
      post('get-data-location');
    }
  };

  if (available()) {
    window.chrome.webview.addEventListener('message', event => {
      const message = event.data;
      if (!message || !message.action) return;

      switch (message.action) {
        case 'load-progress-complete': {
          const resolve = pendingLoads.shift();
          if (resolve) resolve(message.found ? message.payload : null);
          break;
        }

        case 'run-csharp-complete': {
          const pending = pendingRuns.get(message.requestId);
          if (!pending) break;
          window.clearTimeout(pending.timeoutId);
          pendingRuns.delete(message.requestId);
          pending.resolve(message.result || unavailableRunnerResult());
          break;
        }

        case 'storage-error':
        case 'desktop-error':
          console.error('Academy desktop error:', message.message);
          break;

        default: {
          const pending = pendingRequests.get(message.requestId);
          if (!pending || pending.expectedAction !== message.action) break;
          window.clearTimeout(pending.timeoutId);
          pendingRequests.delete(message.requestId);
          pending.resolve(message);
          break;
        }
      }
    });
  }

  window.DesktopBridge = DesktopBridge;
})();
