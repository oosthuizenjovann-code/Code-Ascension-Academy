const status = document.getElementById('academyA11yStatus');

export function announce(message) {
  if (!status || !message) return;
  status.textContent = '';
  window.setTimeout(() => {
    status.textContent = String(message);
  }, 20);
}

function applyStaticSemantics() {
  document.querySelectorAll('.ambient, .grid-overlay').forEach(element => {
    element.setAttribute('aria-hidden', 'true');
  });

  document.querySelectorAll('button[title]:not([aria-label])').forEach(button => {
    button.setAttribute('aria-label', button.getAttribute('title'));
  });

  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    if (!link.getAttribute('aria-label')) {
      const text = link.textContent?.trim() || 'External reference';
      link.setAttribute('aria-label', `${text} (opens in a new window)`);
    }
  });

  document.querySelectorAll('textarea:not([aria-label])').forEach((editor, index) => {
    const region = editor.closest('.code-lab, .practice-lab-workspace, .challenge-workspace, .capstone-workspace, .path-workspace, section');
    const filename = region?.querySelector('[id$="Filename"], .editor-filename, .code-lab-header')?.textContent?.trim();
    editor.setAttribute('aria-label', filename ? `Code editor: ${filename}` : `Code editor ${index + 1}`);
    editor.setAttribute('spellcheck', 'false');
  });

  document.querySelectorAll('.console-panel pre, [id$="Output"]').forEach(output => {
    output.setAttribute('role', 'status');
    output.setAttribute('aria-live', 'polite');
    output.setAttribute('aria-atomic', 'false');
  });

  const dataStatus = document.getElementById('dataSafetyStatus');
  if (dataStatus) {
    dataStatus.setAttribute('role', 'status');
    dataStatus.setAttribute('aria-live', 'polite');
  }
}

function trackInputMode() {
  document.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.addEventListener('pointerdown', () => {
    document.body.classList.remove('keyboard-navigation');
  }, { passive: true });
}

function installEscapeBehavior() {
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;

    const active = document.activeElement;
    if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement || active instanceof HTMLSelectElement) {
      active.blur();
    }
  });
}

applyStaticSemantics();
trackInputMode();
installEscapeBehavior();

window.AcademyAccessibility = Object.freeze({ announce });
