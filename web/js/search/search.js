import { $, escapeHtml } from '../core/utils.js';
import { CHEAT_SHEETS } from '../study/cheat-sheets.js';

export function createGlobalSearchController({
  academyData,
  nav,
  navigator,
  learning,
  study,
  routes = {}
}) {
  const resultMap = new Map();
  let index = [];
  let filter = 'all';
  let query = '';

  function buildIndex() {
    const items = [];

    Object.entries(academyData.languages).forEach(([languageId, language]) => {
      Object.entries(language.levels).forEach(([difficultyId, level]) => {
        const difficultyName = academyData.difficulties.find(item => item.id === difficultyId)?.name || difficultyId;

        level.lessons.forEach((lesson, lessonIndex) => {
          const sectionText = lesson.sections
            .map(section => `${section.title} ${String(section.html || '').replace(/<[^>]+>/g, ' ')} ${section.code || ''}`)
            .join(' ');

          items.push({
            id: `lesson:${languageId}:${difficultyId}:${lessonIndex}`,
            kind: 'lesson',
            title: lesson.title,
            eyebrow: `${language.name} • ${difficultyName} • Level ${lessonIndex + 1}`,
            description: lesson.intro,
            searchText: `${lesson.title} ${lesson.intro} ${sectionText} ${language.name} ${difficultyName}`,
            languageId,
            difficultyId,
            lessonIndex
          });

          (lesson.references || []).forEach((reference, referenceIndex) => {
            items.push({
              id: `reference:${languageId}:${difficultyId}:${lessonIndex}:${referenceIndex}`,
              kind: 'reference',
              title: reference.title,
              eyebrow: `${language.name} • Official Reference`,
              description: `Reference used by ${lesson.title}.`,
              searchText: `${reference.title} ${lesson.title} ${language.name} ${difficultyName}`,
              url: reference.url
            });
          });
        });
      });
    });

    CHEAT_SHEETS.forEach(sheet => {
      const language = academyData.languages[sheet.language];
      const body = sheet.sections.flatMap(section => [section.title, ...section.rows.flat()]).join(' ');
      items.push({
        id: `cheat:${sheet.id}`,
        kind: 'cheat',
        title: sheet.title,
        eyebrow: `${language?.name || sheet.language} • Cheat Sheet`,
        description: sheet.summary,
        searchText: `${sheet.title} ${sheet.summary} ${body}`,
        cheatId: sheet.id
      });
    });

    const featureItems = [
      ['practice-lab', 'Practice Lab', 'Free coding workspace for HTML, CSS, JavaScript and C#.', 'practice code sandbox playground'],
      ['challenges', 'Advanced Challenges', 'Debug, predict, complete, refactor, explain and build code.', 'debug challenge refactor code'],
      ['mastery', 'Mastery', 'See topic-by-topic mastery and weak skills.', 'mastery skills weak topics'],
      ['revision', 'Revision Center', 'Adaptive revision and spaced repetition queue.', 'revision spaced repetition memory'],
      ['study', 'Study Library', 'Personal notes, bookmarks and cheat sheets.', 'notes bookmarks cheat sheets'],
      ['achievements', 'Achievements', 'Badges, medals and rank accomplishments.', 'achievements medals badges'],
      ['paths', 'Learning Paths', 'Integrated Web Development and Game Development roadmaps.', 'web development game development unity path'],
      ['boss', 'Boss Arena', 'Final language evaluations and Academy Grand Boss.', 'boss final evaluation exam'],
      ['references', 'Reference Library', 'Official documentation linked throughout the curriculum.', 'official docs references']
    ];

    featureItems.forEach(([route, title, description, terms]) => items.push({
      id: `feature:${route}`,
      kind: 'feature',
      title,
      eyebrow: 'ACADEMY FEATURE',
      description,
      searchText: `${title} ${description} ${terms}`,
      route
    }));

    index = items;
    return index;
  }

  function open() {
    nav.returnScreen = 'academyScreen';
    navigator.show('searchScreen');
    window.setTimeout(() => $('globalSearchInput')?.focus(), 0);
    render();
  }

  function close() {
    navigator.show(nav.returnScreen || 'academyScreen');
  }

  function setQuery(value) {
    query = String(value || '').trim();
    renderResults();
  }

  function setFilter(value) {
    filter = value || 'all';
    document.querySelectorAll('[data-search-filter]').forEach(button => {
      button.classList.toggle('active', button.dataset.searchFilter === filter);
    });
    renderResults();
  }

  function score(item, normalizedQuery) {
    if (!normalizedQuery) return item.kind === 'feature' ? 15 : 5;

    const title = item.title.toLowerCase();
    const eyebrow = item.eyebrow.toLowerCase();
    const text = item.searchText.toLowerCase();
    const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

    if (!tokens.every(token => text.includes(token) || title.includes(token) || eyebrow.includes(token))) {
      return -1;
    }

    let value = 0;
    if (title === normalizedQuery) value += 120;
    if (title.startsWith(normalizedQuery)) value += 80;
    if (title.includes(normalizedQuery)) value += 60;
    if (eyebrow.includes(normalizedQuery)) value += 25;
    tokens.forEach(token => {
      if (title.includes(token)) value += 18;
      if (eyebrow.includes(token)) value += 8;
      if (text.includes(token)) value += 4;
    });
    return value;
  }

  function filteredResults() {
    const normalizedQuery = query.toLowerCase();
    return index
      .filter(item => filter === 'all' || item.kind === filter)
      .map(item => ({ item, score: score(item, normalizedQuery) }))
      .filter(result => result.score >= 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, normalizedQuery ? 80 : 18)
      .map(result => result.item);
  }

  function render() {
    document.querySelectorAll('[data-search-filter]').forEach(button => {
      button.classList.toggle('active', button.dataset.searchFilter === filter);
    });
    renderResults();
  }

  function renderResults() {
    const root = $('globalSearchResults');
    if (!root) return;

    const results = filteredResults();
    resultMap.clear();
    results.forEach(item => resultMap.set(item.id, item));

    $('globalSearchCount').textContent = query
      ? `${results.length} result${results.length === 1 ? '' : 's'}`
      : 'Search lessons, tools, cheat sheets and official references';

    if (!results.length) {
      root.innerHTML = `
        <div class="search-empty glass-panel">
          <div class="eyebrow">NO MATCHES</div>
          <h3>Nothing matched “${escapeHtml(query)}”.</h3>
          <p>Try a shorter term such as <strong>loops</strong>, <strong>flexbox</strong>, <strong>LINQ</strong>, <strong>Unity</strong> or <strong>forms</strong>.</p>
        </div>`;
      return;
    }

    root.innerHTML = results.map(item => `
      <article class="search-result glass-panel" data-search-result="${escapeHtml(item.id)}" tabindex="0">
        <div class="search-result-type ${item.kind}">${labelFor(item.kind)}</div>
        <div class="eyebrow">${escapeHtml(item.eyebrow)}</div>
        <h3>${highlight(item.title)}</h3>
        <p>${highlight(item.description)}</p>
        <span class="search-open-label">OPEN →</span>
      </article>`).join('');
  }

  function labelFor(kind) {
    return ({ lesson: 'LESSON', cheat: 'CHEAT SHEET', feature: 'FEATURE', reference: 'REFERENCE' })[kind] || kind.toUpperCase();
  }

  function highlight(value) {
    const text = escapeHtml(value || '');
    if (!query) return text;
    const safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(${safe})`, 'ig'), '<mark>$1</mark>');
  }

  function openResult(id) {
    const item = resultMap.get(id) || index.find(candidate => candidate.id === id);
    if (!item) return;

    if (item.kind === 'lesson') {
      nav.language = item.languageId;
      nav.difficulty = item.difficultyId;
      nav.lessonIndex = item.lessonIndex;
      learning.openLesson(item.lessonIndex);
      study.syncLessonTools();
      return;
    }

    if (item.kind === 'cheat') {
      study.openCheatSheet(item.cheatId);
      return;
    }

    if (item.kind === 'reference') {
      window.open(item.url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (item.kind === 'feature') {
      routes[item.route]?.();
    }
  }

  function handleKeydown(event) {
    const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';
    if (isShortcut) {
      event.preventDefault();
      open();
      return;
    }

    if (event.key === 'Escape' && document.getElementById('searchScreen')?.classList.contains('active')) {
      close();
    }
  }

  buildIndex();

  return {
    open,
    close,
    setQuery,
    setFilter,
    openResult,
    handleKeydown,
    rebuildIndex: buildIndex
  };
}
