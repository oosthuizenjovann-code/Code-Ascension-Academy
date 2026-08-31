import { $, escapeHtml } from '../core/utils.js';

export function createMasteryController({ academyData, store, nav, navigator, passMark }) {
  let currentFilter = 'all';

  function open() {
    nav.returnScreen = 'academyScreen';
    render();
    navigator.show('masteryScreen');
  }

  function setFilter(filter) {
    currentFilter = filter || 'all';
    render();
  }

  function visibleLanguages() {
    return currentFilter === 'all'
      ? Object.keys(academyData.languages)
      : [currentFilter].filter(Boolean);
  }

  function render() {
    if (!$('masteryGrid')) return;
    paintFilters();
    paintSummary();
    paintCards();
  }

  function paintFilters() {
    const root = $('masteryFilters');
    if (!root) return;

    const allButtons = [...root.querySelectorAll('[data-mastery-filter]')];
    allButtons.forEach(button => {
      button.classList.toggle('active', button.dataset.masteryFilter === currentFilter);
    });
  }

  function paintSummary() {
    const summary = buildSummary();
    $('masteryOverall').textContent = `${summary.overallMastery}%`;
    $('masteryOverallCard').textContent = `${summary.overallMastery}%`;
    $('masteryStrongest').textContent = summary.strongestPath || 'None yet';
    $('masteryModules').textContent = `${summary.masteredModules}/${summary.totalModules}`;
    $('masteryPractice').textContent = summary.practiceClears;
    $('masteryRecommendation').textContent = summary.recommendation;
  }

  function buildSummary() {
    const reports = [];
    let practiceClears = 0;
    let masteredModules = 0;
    let totalModules = 0;

    Object.keys(academyData.languages).forEach(language => {
      academyData.difficulties.forEach(difficulty => {
        const report = store.masteryReport(language, difficulty.id);
        reports.push(report);
        practiceClears += report.practiceClears;
        masteredModules += report.skills.filter(skill => skill.score >= 90).length;
        totalModules += report.skills.length;
      });
    });

    const strongest = reports
      .filter(report => report.percent > 0)
      .sort((a, b) => b.percent - a.percent)[0];

    const recommendation = reports
      .filter(report => report.percent > 0 || report.progressPercent > 0)
      .flatMap(report => report.skills
        .filter(skill => skill.score < 80)
        .map(skill => ({
          path: `${report.languageName} ${report.difficultyName}`,
          title: skill.title,
          score: skill.score,
          unlocked: skill.unlocked
        })))
      .filter(item => item.unlocked)
      .sort((a, b) => a.score - b.score)[0];

    return {
      overallMastery: store.overallMasteryPercent(),
      strongestPath: strongest ? `${strongest.languageName} ${strongest.difficultyName}` : '',
      masteredModules,
      totalModules,
      practiceClears,
      recommendation: recommendation
        ? `${recommendation.path}: revisit ${recommendation.title} (${recommendation.score}%).`
        : 'Keep passing lessons, practice challenges and tests to build mastery.'
    };
  }

  function paintCards() {
    const root = $('masteryGrid');
    root.innerHTML = '';

    visibleLanguages().forEach(languageId => {
      const language = academyData.languages[languageId];

      academyData.difficulties.forEach(difficulty => {
        const report = store.masteryReport(languageId, difficulty.id);
        const status = report.percent >= 90 ? 'Mastered'
          : report.percent >= 75 ? 'Strong'
          : report.percent >= 50 ? 'Developing'
          : report.percent > 0 ? 'Early'
          : 'Unstarted';

        root.insertAdjacentHTML('beforeend', `
          <article class="mastery-card glass-panel" style="--accent:${language.accent};--rank:${difficulty.color}">
            <div class="mastery-card-header">
              <div class="mastery-card-brand">
                <div class="language-icon language-icon-${languageId} mastery-icon">
                  <img src="${language.iconUrl}" alt="${language.name} language logo" loading="eager" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
                  <span class="language-icon-fallback" hidden>${language.iconFallback}</span>
                </div>
                <div>
                  <div class="eyebrow">${language.name.toUpperCase()} • ${difficulty.name.toUpperCase()}</div>
                  <h3>${language.name} ${difficulty.name}</h3>
                </div>
              </div>
              <div class="mastery-pill ${status.toLowerCase()}">${status}</div>
            </div>

            <div class="mastery-hero">
              <div class="mastery-ring-box">
                <div class="mastery-ring"><strong>${report.percent}%</strong><span>MASTERY</span></div>
                <div class="mastery-mini-meta">
                  <div><span>Progress</span><strong>${report.progressPercent}%</strong></div>
                  <div><span>Tests</span><strong>${report.testsPassed}/5</strong></div>
                  <div><span>Exams</span><strong>${report.examsPassed}/3</strong></div>
                </div>
              </div>
              <div class="mastery-insights">
                <div class="mastery-insight-row"><span>Strongest module</span><strong>${escapeHtml(report.strongestSkill?.title || 'None yet')}</strong></div>
                <div class="mastery-insight-row"><span>Needs attention</span><strong>${escapeHtml(report.weakestUnlockedSkill?.title || 'Start the path')}</strong></div>
                <div class="mastery-insight-row"><span>Practice clears</span><strong>${report.practiceClears}</strong></div>
                <div class="mastery-insight-row"><span>Challenge clears</span><strong>${report.challengeClears}</strong></div>
                <div class="mastery-insight-row"><span>Locked state</span><strong>${report.unlocked ? 'Available' : 'Locked'}</strong></div>
              </div>
            </div>

            <div class="mastery-skill-list">
              ${report.skills.map(skill => `
                <div class="mastery-skill ${skill.unlocked ? '' : 'locked'}">
                  <div class="mastery-skill-head">
                    <div>
                      <strong>${escapeHtml(skill.shortLabel)}</strong>
                      <span>${escapeHtml(skill.title)}</span>
                    </div>
                    <div class="mastery-skill-score ${skill.statusKey}">${skill.score}%</div>
                  </div>
                  <div class="mastery-skill-track"><div style="width:${skill.score}%"></div></div>
                  <div class="mastery-skill-meta">
                    <span>${skill.status}</span>
                    <span>${skill.unlocked ? (skill.recommendation || 'Keep reinforcing this skill.') : 'Pass the previous test to unlock this module.'}</span>
                  </div>
                </div>`).join('')}
            </div>
          </article>`);
      });
    });
  }

  return {
    open,
    render,
    setFilter
  };
}
