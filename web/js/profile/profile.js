import { $ } from '../core/utils.js';

export function createProfileController({
  academyData,
  store,
  nav,
  navigator,
  learning,
  passMark
}) {
  function openReferenceLibrary() {
    const root = $('referenceLibraryGrid');
    root.innerHTML = '';

    Object.entries(academyData.languages).forEach(([languageId, language]) => {
      const references = new Map();

      Object.values(language.levels).forEach(level => {
        level.lessons.forEach(lesson => {
          (lesson.references || []).forEach(reference => {
            references.set(reference.url, reference);
          });
        });
      });

      const links = [...references.values()]
        .map(reference => `<a href="${reference.url}" target="_blank" rel="noopener noreferrer">${reference.title}<span>↗</span></a>`)
        .join('');

      root.insertAdjacentHTML('beforeend', `
        <article class="reference-library-card glass-panel" style="--accent:${language.accent}">
          <div class="reference-library-heading">
            <div class="language-icon language-icon-${languageId}">
              <img src="${language.iconUrl}" alt="${language.name} language logo" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
              <span class="language-icon-fallback" hidden>${language.iconFallback}</span>
            </div>
            <div>
              <div class="eyebrow">${language.name.toUpperCase()}</div>
              <h3>${language.name} Documentation</h3>
            </div>
          </div>
          <p>${references.size} curated official references used across the ${language.name} curriculum.</p>
          <div class="reference-links reference-library-links">${links}</div>
        </article>`);
    });

    navigator.show('referenceScreen');
  }

  function openProfile() {
    nav.returnScreen = 'academyScreen';
    $('profileXp').textContent = store.state.xp;
    $('profileHints').textContent = store.state.hintsUsed;

    let tests = 0;
    let exams = 0;

    Object.values(store.state.progress).forEach(language => {
      Object.values(language).forEach(difficulty => {
        tests += Object.values(difficulty.tests).filter(score => score >= passMark).length;
        exams += Object.values(difficulty.exams).filter(score => score >= passMark).length;
      });
    });

    $('profileTests').textContent = tests;
    $('profileExams').textContent = exams;
    $('profileLanguages').innerHTML = Object.entries(academyData.languages)
      .map(([id, language]) => {
        const percent = store.languagePercent(id);
        return `
          <div class="profile-language-row">
            <strong>${language.name}</strong>
            <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
            <span>${percent}%</span>
          </div>`;
      })
      .join('');

    navigator.show('profileScreen');
  }

  function exportSave() {
    const blob = new Blob(
      [JSON.stringify(store.state, null, 2)],
      { type: 'application/json' }
    );
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `CodeAscension_Save_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function importSave(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed.progress) throw new Error('Invalid save');
        store.replace(parsed);
        learning.updateGlobalStats();
        alert('Save imported successfully.');
        navigator.show('academyScreen');
      } catch {
        alert('That file is not a valid Code Ascension save.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  function resetProgress() {
    if (!confirm('Erase every score, unlock, lesson completion and XP value?')) return;
    store.reset();
    learning.updateGlobalStats();
    navigator.show('academyScreen');
  }

  return {
    openReferenceLibrary,
    openProfile,
    exportSave,
    importSave,
    resetProgress
  };
}
