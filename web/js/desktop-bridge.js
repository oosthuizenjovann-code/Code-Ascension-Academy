(() => {
  const pendingLoads = [];

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

  const DesktopBridge = {
    available,

    loadProgress() {
      if (!available()) return Promise.resolve(browserLoad());

      return new Promise(resolve => {
        pendingLoads.push(resolve);
        post('load-progress');

        // Avoid holding the app forever if the native host is unavailable.
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
        case 'storage-error':
          console.error('Academy storage error:', message.message);
          break;
      }
    });
  }

  window.DesktopBridge = DesktopBridge;
})();
