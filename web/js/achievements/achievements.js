import { $, escapeHtml } from '../core/utils.js';

const CATEGORY_LABELS = {
  learning: 'Learning',
  challenges: 'Challenges',
  projects: 'Projects',
  mastery: 'Mastery',
  ranks: 'Ranks',
  paths: 'Learning Paths'
};

const STATIC_ACHIEVEMENTS = [
  { id:'first-lesson', category:'learning', icon:'01', title:'First Step', description:'Complete your first lesson.', metric:'lessonsCompleted', target:1 },
  { id:'five-lessons', category:'learning', icon:'05', title:'Building Momentum', description:'Complete 5 lessons.', metric:'lessonsCompleted', target:5 },
  { id:'twenty-five-lessons', category:'learning', icon:'25', title:'Deep Study', description:'Complete 25 lessons.', metric:'lessonsCompleted', target:25 },
  { id:'fifty-lessons', category:'learning', icon:'50', title:'Halfway Scholar', description:'Complete 50 lessons across the Academy.', metric:'lessonsCompleted', target:50 },
  { id:'first-test', category:'learning', icon:'T1', title:'Class Tested', description:'Pass your first class test.', metric:'testsPassed', target:1 },
  { id:'ten-tests', category:'learning', icon:'10', title:'Consistent Student', description:'Pass 10 class tests.', metric:'testsPassed', target:10 },
  { id:'first-exam', category:'learning', icon:'E1', title:'Exam Survivor', description:'Pass your first final exam.', metric:'examsPassed', target:1 },
  { id:'perfect-score', category:'learning', icon:'100', title:'Perfect Score', description:'Earn 100% on a class test or final exam.', metric:'perfectAssessments', target:1 },
  { id:'gold-standard', category:'learning', icon:'G5', title:'Gold Standard', description:'Earn 5 gold assessment medals.', metric:'goldMedals', target:5 },
  { id:'all-four', category:'learning', icon:'4X', title:'Polyglot Starter', description:'Make progress in HTML, CSS, JavaScript and C#.', metric:'engagedLanguages', target:4 },
  { id:'xp-1000', category:'learning', icon:'1K', title:'1,000 XP', description:'Earn 1,000 Academy XP through learning activities.', metric:'xp', target:1000 },
  { id:'xp-5000', category:'learning', icon:'5K', title:'5,000 XP', description:'Earn 5,000 Academy XP.', metric:'xp', target:5000 },

  { id:'first-challenge', category:'challenges', icon:'C1', title:'Challenge Accepted', description:'Clear your first Advanced Challenge.', metric:'challengeClears', target:1 },
  { id:'ten-challenges', category:'challenges', icon:'C10', title:'Bug Hunter', description:'Clear 10 Advanced Challenges.', metric:'challengeClears', target:10 },
  { id:'fifty-challenges', category:'challenges', icon:'C50', title:'Bug Exterminator', description:'Clear 50 Advanced Challenges.', metric:'challengeClears', target:50 },
  { id:'first-try', category:'challenges', icon:'1ST', title:'First Strike', description:'Clear a challenge on the very first attempt.', metric:'firstTryClears', target:1 },
  { id:'first-try-ten', category:'challenges', icon:'10X', title:'First-Try Specialist', description:'Clear 10 challenges on the first attempt.', metric:'firstTryClears', target:10 },
  { id:'no-help-ten', category:'challenges', icon:'NH', title:'No Help Needed', description:'Clear 10 different challenges without using a hint.', metric:'noHintClears', target:10 },
  { id:'swift-five', category:'challenges', icon:'⚡', title:'Swift Solver', description:'Clear 5 different challenges in under two minutes without hints.', metric:'fastNoHintClears', target:5 },

  { id:'first-capstone', category:'projects', icon:'P1', title:'Builder', description:'Pass your first capstone project.', metric:'capstonesPassed', target:1 },
  { id:'five-capstones', category:'projects', icon:'P5', title:'Project Veteran', description:'Pass 5 capstone projects.', metric:'capstonesPassed', target:5 },
  { id:'ten-capstones', category:'projects', icon:'P10', title:'Portfolio Builder', description:'Pass 10 capstone projects.', metric:'capstonesPassed', target:10 },
  { id:'perfect-capstone', category:'projects', icon:'100', title:'Project Perfection', description:'Score 100% on a capstone project.', metric:'perfectCapstones', target:1 },

  { id:'first-mastery', category:'mastery', icon:'M1', title:'Module Master', description:'Reach 90% mastery in one module.', metric:'masteredModules', target:1 },
  { id:'ten-mastery', category:'mastery', icon:'M10', title:'Mastery Scholar', description:'Reach 90% mastery in 10 modules.', metric:'masteredModules', target:10 },
  { id:'twenty-five-mastery', category:'mastery', icon:'M25', title:'Knowledge Architect', description:'Reach 90% mastery in 25 modules.', metric:'masteredModules', target:25 },
  { id:'fifty-mastery', category:'mastery', icon:'M50', title:'Half the Academy Mastered', description:'Reach 90% mastery in 50 modules.', metric:'masteredModules', target:50 },
  { id:'first-revision', category:'mastery', icon:'R1', title:'Memory Training', description:'Complete your first adaptive revision session.', metric:'revisionSessions', target:1 },
  { id:'ten-revisions', category:'mastery', icon:'R10', title:'Spaced Repetition Regular', description:'Complete 10 adaptive revision sessions.', metric:'revisionSessions', target:10 },
  { id:'iron-memory', category:'mastery', icon:'∞', title:'Iron Memory', description:'Build a 5-review correct streak on a module.', metric:'maxRevisionStreak', target:5 },
  { id:'first-note', category:'mastery', icon:'N1', title:'Make It Your Own', description:'Save your first personal lesson note.', metric:'notes', target:1 },
  { id:'ten-notes', category:'mastery', icon:'N10', title:'Personal Textbook', description:'Save notes on 10 lessons.', metric:'notes', target:10 },
  { id:'ten-bookmarks', category:'mastery', icon:'★', title:'Reference Shelf', description:'Bookmark 10 lessons for quick access.', metric:'bookmarks', target:10 },

  { id:'web-trinity', category:'paths', icon:'3X', title:'Web Trinity', description:'Reach Junior in HTML, CSS and JavaScript to unlock the integrated Web Development path.', metric:'webPathUnlocked', target:1 },
  { id:'first-web-mission', category:'paths', icon:'W1', title:'Integrated Builder', description:'Pass your first Web Development mission.', metric:'webMissionsPassed', target:1 },
  { id:'all-web-missions', category:'paths', icon:'W5', title:'Web Systems Builder', description:'Pass all five integrated Web Development missions.', metric:'webMissionsPassed', target:5 },
  { id:'web-path-complete', category:'paths', icon:'WEB', title:'Web Developer', description:'Complete all five Web Development missions and the Game Companion Dashboard capstone.', metric:'webPathComplete', target:1 },
  { id:'game-path-unlocked', category:'paths', icon:'G+', title:'Gameplay Apprentice', description:'Reach C# Junior and unlock scored Game Development progression.', metric:'gamePathUnlocked', target:1 },
  { id:'first-game-mission', category:'paths', icon:'G1', title:'Gameplay Programmer', description:'Pass your first Game Development mission.', metric:'gameMissionsPassed', target:1 },
  { id:'game-path-complete', category:'paths', icon:'DEV', title:'Game Systems Developer', description:'Complete all six Game Development missions and the arena-survival systems capstone.', metric:'gamePathComplete', target:1 },
  { id:'first-boss', category:'challenges', icon:'B1', title:'Boss Breaker', description:'Defeat your first language Final Boss.', metric:'bossesPassed', target:1 },
  { id:'all-bosses', category:'challenges', icon:'B4', title:'Language Conqueror', description:'Defeat all four language Final Bosses.', metric:'bossesPassed', target:4 },
  { id:'grand-boss', category:'challenges', icon:'Ω', title:'Academy Ascended', description:'Defeat the Academy Grand Boss.', metric:'grandBossPassed', target:1 }
];

export function createAchievementController({ academyData, store, navigator, passMark }) {
  let currentFilter = 'all';
  let syncing = false;
  const toastQueue = [];
  let toastBusy = false;

  const rankAchievements = buildRankAchievements();
  const languageAchievements = buildLanguageAchievements();
  const catalog = [...STATIC_ACHIEVEMENTS, ...rankAchievements, ...languageAchievements];

  function buildRankAchievements() {
    return Object.entries(academyData.languages).flatMap(([languageId, language]) =>
      academyData.difficulties.map(difficulty => ({
        id: `rank-${languageId}-${difficulty.id}`,
        category: 'ranks',
        icon: difficulty.rank,
        title: `${language.name} ${difficulty.name}`,
        description: `Master the ${difficulty.name} rank in ${language.name}: capstone plus all three final exams.`,
        customProgress: metrics => metrics.rankProgress[`${languageId}.${difficulty.id}`] || 0,
        target: 100,
        customUnlocked: metrics => Boolean(metrics.rankComplete[`${languageId}.${difficulty.id}`])
      }))
    );
  }

  function buildLanguageAchievements() {
    return Object.entries(academyData.languages).map(([languageId, language]) => ({
      id: `language-${languageId}-complete`,
      category: 'ranks',
      icon: 'V',
      title: `${language.name} Ascended`,
      description: `Master every rank in the ${language.name} learning path.`,
      customProgress: metrics => metrics.languageRanks[languageId] || 0,
      target: academyData.difficulties.length,
      customUnlocked: metrics => (metrics.languageRanks[languageId] || 0) >= academyData.difficulties.length
    }));
  }

  function metrics() {
    const result = {
      xp: Number(store.state.xp || 0),
      lessonsCompleted: 0,
      testsPassed: 0,
      examsPassed: 0,
      perfectAssessments: 0,
      capstonesPassed: 0,
      perfectCapstones: 0,
      challengeClears: 0,
      firstTryClears: 0,
      noHintClears: 0,
      fastNoHintClears: 0,
      masteredModules: 0,
      revisionSessions: Array.isArray(store.state.revisionSessions) ? store.state.revisionSessions.length : 0,
      maxRevisionStreak: 0,
      notes: Object.keys(store.state.study?.notes || {}).length,
      bookmarks: Object.values(store.state.study?.bookmarks || {}).filter(Boolean).length,
      engagedLanguages: 0,
      bronzeMedals: 0,
      silverMedals: 0,
      goldMedals: 0,
      rankComplete: {},
      rankProgress: {},
      languageRanks: {},
      webPathUnlocked: store.webPathUnlocked() ? 1 : 0,
      webMissionsPassed: store.webPathStatus().passedMissions,
      webPathComplete: store.webPathStatus().complete ? 1 : 0,
      gamePathUnlocked: store.gamePathUnlocked() ? 1 : 0,
      gameMissionsPassed: store.gamePathStatus().passedMissions,
      gamePathComplete: store.gamePathStatus().complete ? 1 : 0,
      bossesPassed: store.bossArenaStatus().passed,
      grandBossPassed: store.bossArenaStatus().grand.passed ? 1 : 0
    };

    Object.keys(academyData.languages).forEach(languageId => {
      let languageEngaged = false;
      let completedRanks = 0;

      academyData.difficulties.forEach(difficulty => {
        const progress = store.state.progress?.[languageId]?.[difficulty.id];
        if (!progress) return;

        const lessonCount = Object.values(progress.lessons || {}).filter(Boolean).length;
        result.lessonsCompleted += lessonCount;
        if (lessonCount > 0) languageEngaged = true;

        const testScores = Object.values(progress.tests || {}).map(Number).filter(Number.isFinite);
        const examScores = Object.values(progress.exams || {}).map(Number).filter(Number.isFinite);
        result.testsPassed += testScores.filter(score => score >= passMark).length;
        result.examsPassed += examScores.filter(score => score >= passMark).length;
        result.perfectAssessments += [...testScores, ...examScores].filter(score => score === 100).length;

        [...testScores, ...examScores].forEach(addMedal);

        const capstoneScore = Number(progress.capstone?.bestScore || 0);
        const capstonePassed = Boolean(progress.capstone?.passed) || capstoneScore >= passMark;
        if (capstonePassed) result.capstonesPassed += 1;
        if (capstoneScore === 100) result.perfectCapstones += 1;
        if (capstoneScore >= passMark) addMedal(capstoneScore);

        const clears = Object.values(progress.challengeClears || {}).filter(Boolean).length;
        result.challengeClears += clears;
        if (clears > 0 || testScores.some(score => score > 0) || examScores.some(score => score > 0) || capstoneScore > 0) {
          languageEngaged = true;
        }

        Object.values(progress.challengeAttempts || {}).forEach(history => {
          if (!Array.isArray(history) || !history.length) return;
          if (history[0]?.success) result.firstTryClears += 1;
          if (history.some(attempt => attempt?.success && !attempt?.hintUsed)) result.noHintClears += 1;
          if (history.some(attempt => attempt?.success && !attempt?.hintUsed && Number(attempt?.seconds || 0) > 0 && Number(attempt.seconds) <= 120)) {
            result.fastNoHintClears += 1;
          }
        });

        Object.values(progress.revision || {}).forEach(record => {
          result.maxRevisionStreak = Math.max(result.maxRevisionStreak, Number(record?.streak || 0));
        });

        const report = store.masteryReport(languageId, difficulty.id);
        result.masteredModules += report.skills.filter(skill => skill.score >= 90).length;

        const rankKey = `${languageId}.${difficulty.id}`;
        const complete = capstonePassed && academyData.languages[languageId].levels[difficulty.id].exams.every(
          (_, index) => Number(progress.exams?.[index] || 0) >= passMark
        );
        result.rankComplete[rankKey] = complete;
        result.rankProgress[rankKey] = store.difficultyPercent(languageId, difficulty.id);
        if (complete) completedRanks += 1;
      });

      result.languageRanks[languageId] = completedRanks;
      if (languageEngaged || store.languagePercent(languageId) > 0) result.engagedLanguages += 1;
    });

    return result;

    function addMedal(score) {
      if (score === 100) result.goldMedals += 1;
      else if (score >= 90) result.silverMedals += 1;
      else if (score >= passMark) result.bronzeMedals += 1;
    }
  }

  function achievementProgress(definition, values) {
    const current = definition.customProgress
      ? Number(definition.customProgress(values) || 0)
      : Number(values[definition.metric] || 0);
    const target = Math.max(1, Number(definition.target || 1));
    const unlocked = definition.customUnlocked
      ? Boolean(definition.customUnlocked(values))
      : current >= target;

    return {
      current,
      target,
      percent: Math.min(100, Math.round((current / target) * 100)),
      unlocked
    };
  }

  function sync({ silent = false } = {}) {
    if (syncing) return [];
    syncing = true;

    try {
      const values = metrics();
      const newlyUnlocked = [];
      const unlockedMap = store.state.achievements?.unlocked || (store.state.achievements = { unlocked: {} }).unlocked;
      const now = new Date().toISOString();

      catalog.forEach(definition => {
        const status = achievementProgress(definition, values);
        if (!status.unlocked || unlockedMap[definition.id]) return;
        unlockedMap[definition.id] = now;
        newlyUnlocked.push(definition);
      });

      if (newlyUnlocked.length) {
        store.save();
        if (!silent) newlyUnlocked.forEach(queueToast);
      }

      return newlyUnlocked;
    } finally {
      syncing = false;
    }
  }

  function initialize() {
    sync({ silent: true });
    window.addEventListener('academy:state-saved', () => {
      sync({ silent: false });
      if (document.getElementById('achievementsScreen')?.classList.contains('active')) render();
    });
  }

  function open() {
    sync({ silent: true });
    render();
    navigator.show('achievementsScreen');
  }

  function close() {
    navigator.show('academyScreen');
  }

  function setFilter(filter) {
    currentFilter = filter || 'all';
    render();
  }

  function render() {
    const values = metrics();
    const unlockedMap = store.state.achievements?.unlocked || {};
    const unlockedCount = catalog.filter(definition => Boolean(unlockedMap[definition.id])).length;
    const completedRanks = Object.values(values.rankComplete).filter(Boolean).length;

    $('achievementUnlockedCount').textContent = unlockedCount;
    $('achievementCollectionText').textContent = `${unlockedCount} / ${catalog.length}`;
    $('achievementGoldCount').textContent = values.goldMedals;
    $('achievementRankCount').textContent = completedRanks;
    $('achievementPercent').textContent = `${Math.round((unlockedCount / catalog.length) * 100)}%`;
    $('bronzeMedals').textContent = values.bronzeMedals;
    $('silverMedals').textContent = values.silverMedals;
    $('goldMedals').textContent = values.goldMedals;

    document.querySelectorAll('[data-achievement-filter]').forEach(button => {
      button.classList.toggle('active', button.dataset.achievementFilter === currentFilter);
    });

    const filtered = catalog
      .map(definition => ({
        definition,
        status: achievementProgress(definition, values),
        unlockedAt: unlockedMap[definition.id] || null
      }))
      .filter(item => currentFilter === 'all'
        || (currentFilter === 'unlocked' && item.unlockedAt)
        || item.definition.category === currentFilter)
      .sort((a, b) => {
        if (Boolean(a.unlockedAt) !== Boolean(b.unlockedAt)) return a.unlockedAt ? -1 : 1;
        return b.status.percent - a.status.percent;
      });

    const root = $('achievementGrid');
    root.innerHTML = filtered.length
      ? filtered.map(renderCard).join('')
      : '<div class="achievement-empty glass-panel">No achievements match this filter yet.</div>';
  }

  function renderCard(item) {
    const { definition, status, unlockedAt } = item;
    const currentText = definition.category === 'ranks' && status.target === 100
      ? `${Math.min(100, Math.round(status.current))}%`
      : `${Math.min(status.current, status.target)} / ${status.target}`;

    return `
      <article class="achievement-card glass-panel ${unlockedAt ? 'unlocked' : 'locked'}">
        <div class="achievement-emblem">${escapeHtml(definition.icon)}</div>
        <div class="achievement-card-body">
          <div class="achievement-card-top">
            <span>${CATEGORY_LABELS[definition.category] || definition.category}</span>
            <strong>${unlockedAt ? 'UNLOCKED' : `${status.percent}%`}</strong>
          </div>
          <h3>${escapeHtml(definition.title)}</h3>
          <p>${escapeHtml(definition.description)}</p>
          <div class="achievement-progress"><div style="width:${status.percent}%"></div></div>
          <div class="achievement-progress-meta">
            <span>${unlockedAt ? `Earned ${formatDate(unlockedAt)}` : currentText}</span>
            <span>${unlockedAt ? '★' : 'LOCKED'}</span>
          </div>
        </div>
      </article>`;
  }

  function formatDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'previously' : date.toLocaleDateString();
  }

  function queueToast(definition) {
    toastQueue.push(definition);
    if (!toastBusy) showNextToast();
  }

  function showNextToast() {
    const definition = toastQueue.shift();
    if (!definition) {
      toastBusy = false;
      return;
    }

    toastBusy = true;
    const toast = $('achievementToast');
    $('achievementToastTitle').textContent = definition.title;
    $('achievementToastText').textContent = definition.description;
    toast.classList.add('show');

    window.setTimeout(() => {
      toast.classList.remove('show');
      window.setTimeout(showNextToast, 280);
    }, 3400);
  }

  return {
    initialize,
    open,
    close,
    setFilter,
    render,
    sync
  };
}
