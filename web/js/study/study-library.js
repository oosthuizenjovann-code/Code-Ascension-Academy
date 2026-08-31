import { $, escapeHtml } from '../core/utils.js';
import { CHEAT_SHEETS, getCheatSheet } from './cheat-sheets.js';

export function createStudyLibraryController({ academyData, store, nav, navigator, learning }) {
  let currentFilter = 'all';
  let currentSearch = '';
  let activeSheetId = null;

  function lessonKey(language = nav.language, difficulty = nav.difficulty, lessonIndex = nav.lessonIndex) {
    return `${language}.${difficulty}.${Number(lessonIndex)}`;
  }

  function lessonMetaFromKey(key) {
    const [language, difficulty, indexRaw] = String(key || '').split('.');
    const index = Number(indexRaw);
    const level = academyData.languages?.[language]?.levels?.[difficulty];
    const lesson = level?.lessons?.[index];
    if (!lesson) return null;
    return {
      key,
      language,
      languageName: academyData.languages[language].name,
      difficulty,
      difficultyName: academyData.difficulties.find(item => item.id === difficulty)?.name || difficulty,
      index,
      title: lesson.title,
      lesson
    };
  }

  function open() {
    nav.returnScreen = 'academyScreen';
    render();
    navigator.show('studyLibraryScreen');
    $('studySearch')?.focus();
  }

  function close() {
    navigator.show('academyScreen');
  }

  function render() {
    renderSummary();
    renderFilters();
    renderResults();
  }

  function renderSummary() {
    const stats = store.studyStats();
    $('studyNotesCount').textContent = stats.notes;
    $('studyBookmarksCount').textContent = stats.bookmarks;
    $('studyRevisionPinsCount').textContent = stats.revisionPins;
    $('studyCheatCount').textContent = CHEAT_SHEETS.length;
  }

  function renderFilters() {
    document.querySelectorAll('[data-study-filter]').forEach(button => {
      button.classList.toggle('active', button.dataset.studyFilter === currentFilter);
    });
  }

  function setFilter(filter) {
    currentFilter = filter || 'all';
    renderFilters();
    renderResults();
  }

  function setSearch(value) {
    currentSearch = String(value || '').trim().toLowerCase();
    renderResults();
  }

  function matchesSearch(...values) {
    if (!currentSearch) return true;
    return values.some(value => String(value || '').toLowerCase().includes(currentSearch));
  }

  function noteCards() {
    return Object.entries(store.state.study.notes || {})
      .map(([key, record]) => ({ meta: lessonMetaFromKey(key), record }))
      .filter(item => item.meta && matchesSearch(item.meta.title, item.meta.languageName, item.meta.difficultyName, item.record.text))
      .sort((a, b) => Date.parse(b.record.updatedAt || 0) - Date.parse(a.record.updatedAt || 0))
      .map(({ meta, record }) => `
        <article class="study-card glass-panel">
          <div class="study-card-type">NOTE</div>
          <div class="eyebrow">${escapeHtml(meta.languageName.toUpperCase())} • ${escapeHtml(meta.difficultyName.toUpperCase())} • LEVEL ${meta.index + 1}</div>
          <h3>${escapeHtml(meta.title)}</h3>
          <p class="study-note-preview">${escapeHtml(record.text)}</p>
          <div class="study-card-footer">
            <span>${formatDate(record.updatedAt)}</span>
            <button class="glow-button small ghost" data-study-open="${escapeHtml(meta.key)}">OPEN LESSON</button>
          </div>
        </article>`);
  }

  function bookmarkCards() {
    return Object.keys(store.state.study.bookmarks || {})
      .filter(key => store.state.study.bookmarks[key])
      .map(key => lessonMetaFromKey(key))
      .filter(meta => meta && matchesSearch(meta.title, meta.languageName, meta.difficultyName))
      .map(meta => `
        <article class="study-card glass-panel bookmark-card">
          <div class="study-card-type">BOOKMARK</div>
          <div class="eyebrow">${escapeHtml(meta.languageName.toUpperCase())} • ${escapeHtml(meta.difficultyName.toUpperCase())} • LEVEL ${meta.index + 1}</div>
          <h3>${escapeHtml(meta.title)}</h3>
          <p>Saved for quick access from your personal study library.</p>
          <div class="study-card-footer">
            <span>${store.state.study.revisionPins?.[meta.key] ? 'Also pinned for revision' : 'Bookmarked lesson'}</span>
            <button class="glow-button small ghost" data-study-open="${escapeHtml(meta.key)}">OPEN LESSON</button>
          </div>
        </article>`);
  }

  function cheatCards() {
    return CHEAT_SHEETS
      .filter(sheet => {
        const languageName = academyData.languages[sheet.language]?.name || sheet.language;
        const body = sheet.sections.flatMap(section => section.rows.flat()).join(' ');
        return matchesSearch(sheet.title, sheet.summary, languageName, body);
      })
      .map(sheet => {
        const language = academyData.languages[sheet.language];
        return `
          <article class="study-card cheat-card glass-panel" style="--accent:${language.accent}">
            <div class="study-card-type">CHEAT SHEET</div>
            <div class="eyebrow">${escapeHtml(language.name.toUpperCase())}</div>
            <h3>${escapeHtml(sheet.title)}</h3>
            <p>${escapeHtml(sheet.summary)}</p>
            <div class="study-card-footer">
              <span>${sheet.sections.length} quick-reference sections</span>
              <button class="glow-button small primary" data-cheat-sheet="${sheet.id}">OPEN SHEET</button>
            </div>
          </article>`;
      });
  }

  function renderResults() {
    const root = $('studyResults');
    const sections = [];

    if (currentFilter === 'all' || currentFilter === 'notes') sections.push(...noteCards());
    if (currentFilter === 'all' || currentFilter === 'bookmarks') sections.push(...bookmarkCards());
    if (currentFilter === 'all' || currentFilter === 'cheats') sections.push(...cheatCards());

    root.innerHTML = sections.length
      ? sections.join('')
      : `<div class="study-empty glass-panel">
          <div class="eyebrow">NOTHING FOUND</div>
          <h3>Your study library is waiting.</h3>
          <p>Add notes or bookmarks from lessons, or change the current search/filter.</p>
        </div>`;
  }

  function syncLessonTools() {
    if (!nav.language || !nav.difficulty || nav.lessonIndex === null) return;
    const data = store.lessonStudy(nav.language, nav.difficulty, nav.lessonIndex);
    const noteInput = $('lessonNoteInput');
    const noteStatus = $('lessonNoteStatus');
    const bookmarkButton = $('lessonBookmarkButton');
    const revisionButton = $('lessonRevisionButton');

    if (noteInput) noteInput.value = data.note?.text || '';
    if (noteStatus) noteStatus.textContent = data.note?.updatedAt ? `Saved ${formatDate(data.note.updatedAt)}` : 'No note saved yet.';

    if (bookmarkButton) {
      bookmarkButton.textContent = data.bookmarked ? '★ BOOKMARKED' : '☆ BOOKMARK';
      bookmarkButton.classList.toggle('active-study-action', data.bookmarked);
    }

    if (revisionButton) {
      revisionButton.textContent = data.revisionPinned ? '✓ ADDED TO REVISION' : '+ ADD TO REVISION';
      revisionButton.classList.toggle('active-study-action', data.revisionPinned);
    }
  }

  function markNoteDirty() {
    if ($('lessonNoteStatus')) $('lessonNoteStatus').textContent = 'Unsaved changes';
  }

  function saveCurrentNote() {
    const text = $('lessonNoteInput')?.value || '';
    store.saveLessonNote(nav.language, nav.difficulty, nav.lessonIndex, text);
    syncLessonTools();
  }

  function toggleCurrentBookmark() {
    store.toggleLessonBookmark(nav.language, nav.difficulty, nav.lessonIndex);
    syncLessonTools();
  }

  function addCurrentToRevision() {
    store.pinLessonForRevision(nav.language, nav.difficulty, nav.lessonIndex);
    syncLessonTools();
  }

  function openLessonFromLibrary(key) {
    const meta = lessonMetaFromKey(key);
    if (!meta) return;
    nav.language = meta.language;
    nav.difficulty = meta.difficulty;
    nav.lessonIndex = meta.index;
    learning.openLesson(meta.index);
    syncLessonTools();
  }

  function openCheatSheet(id) {
    const sheet = getCheatSheet(id);
    if (!sheet) return;
    activeSheetId = id;
    const language = academyData.languages[sheet.language];
    $('cheatSheetEyebrow').textContent = language.name.toUpperCase();
    $('cheatSheetTitle').textContent = sheet.title;
    $('cheatSheetSummary').textContent = sheet.summary;
    $('cheatSheetBody').innerHTML = sheet.sections.map(section => `
      <section class="cheat-section">
        <h3>${escapeHtml(section.title)}</h3>
        <div class="cheat-table">
          ${section.rows.map(row => `
            <div class="cheat-row">
              <code>${escapeHtml(row[0])}</code>
              <span>${escapeHtml(row[1])}</span>
            </div>`).join('')}
        </div>
      </section>`).join('');
    navigator.show('cheatSheetScreen');
  }

  function closeCheatSheet() {
    activeSheetId = null;
    render();
    navigator.show('studyLibraryScreen');
  }

  function printCheatSheet() {
    if (!activeSheetId) return;
    document.body.classList.add('printing-cheat-sheet');
    const cleanup = () => document.body.classList.remove('printing-cheat-sheet');
    window.addEventListener('afterprint', cleanup, { once: true });
    window.print();
    window.setTimeout(cleanup, 1000);
  }

  function formatDate(value) {
    if (!value) return 'Saved';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Saved';
    return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  }

  return {
    open,
    close,
    setFilter,
    setSearch,
    syncLessonTools,
    markNoteDirty,
    saveCurrentNote,
    toggleCurrentBookmark,
    addCurrentToRevision,
    openLessonFromLibrary,
    openCheatSheet,
    closeCheatSheet,
    printCheatSheet,
    render
  };
}
