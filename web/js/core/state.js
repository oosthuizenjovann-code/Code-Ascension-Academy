import { average, clamp } from './utils.js';

export function createAcademyStateStore(academyData, passMark) {
  const difficultyIds = academyData.difficulties.map(difficulty => difficulty.id);
  let state = createDefaultState();

  function createDefaultPath(index) {
    return {
      unlocked: index === 0,
      lessons: {},
      tests: {},
      exams: {},
      practice: {},
      testHistory: {},
      examHistory: {},
      challengeAttempts: {},
      challengeClears: {},
      revision: {},
      capstone: {
        bestScore: 0,
        attempts: [],
        code: '',
        passed: false,
        lastSubmittedAt: null,
        rubric: []
      }
    };
  }

  function createDefaultIntegratedWork() {
    return {
      bestScore: 0,
      attempts: [],
      html: '',
      css: '',
      javascript: '',
      passed: false,
      lastSubmittedAt: null,
      rubric: []
    };
  }

  function createDefaultWebPath() {
    return {
      missions: {},
      capstone: createDefaultIntegratedWork()
    };
  }

  function createDefaultGameWork() {
    return {
      bestScore: 0,
      attempts: [],
      code: '',
      passed: false,
      lastSubmittedAt: null,
      rubric: []
    };
  }

  function createDefaultGamePath() {
    return {
      missions: {},
      capstone: createDefaultGameWork()
    };
  }

  function createDefaultBossRecord() {
    return { bestScore: 0, attempts: [], passed: false, lastSubmittedAt: null };
  }

  function createDefaultFinalEvaluation() {
    return {
      languages: {},
      grand: createDefaultBossRecord()
    };
  }

  function createDefaultState() {
    const progress = {};

    Object.keys(academyData.languages).forEach(language => {
      progress[language] = {};
      difficultyIds.forEach((difficulty, index) => {
        progress[language][difficulty] = createDefaultPath(index);
      });
    });

    return {
      version: 11,
      xp: 0,
      hintsUsed: 0,
      lab: {
        html: { template: 'blank', code: '' },
        css: { template: 'flexbox', code: '' },
        javascript: { template: 'console', code: '' },
        csharp: { template: 'console', code: '' }
      },
      revisionSessions: [],
      study: {
        notes: {},
        bookmarks: {},
        revisionPins: {}
      },
      achievements: {
        unlocked: {}
      },
      paths: {
        webDevelopment: createDefaultWebPath(),
        gameDevelopment: createDefaultGamePath()
      },
      finalEvaluation: createDefaultFinalEvaluation(),
      progress
    };
  }

  function normalize(saved) {
    const base = createDefaultState();
    if (!saved || typeof saved !== 'object') return base;

    base.version = 11;
    base.xp = Number(saved.xp) || 0;
    base.hintsUsed = Number(saved.hintsUsed) || 0;
    base.revisionSessions = Array.isArray(saved.revisionSessions) ? saved.revisionSessions.slice(-50) : [];
    base.study = normalizeStudy(saved.study);
    base.achievements = normalizeAchievements(saved.achievements);
    base.paths = normalizePaths(saved.paths);
    base.finalEvaluation = normalizeFinalEvaluation(saved.finalEvaluation);

    if (saved.lab && typeof saved.lab === 'object') {
      Object.keys(base.lab).forEach(language => {
        const oldLab = saved.lab[language];
        if (!oldLab || typeof oldLab !== 'object') return;
        base.lab[language] = {
          template: String(oldLab.template || base.lab[language].template),
          code: String(oldLab.code || '')
        };
      });
    }

    Object.keys(base.progress).forEach(language => {
      difficultyIds.forEach((difficulty, index) => {
        const old = saved.progress?.[language]?.[difficulty];
        if (!old) return;

        base.progress[language][difficulty] = {
          ...createDefaultPath(index),
          unlocked: Boolean(old.unlocked) || difficulty === 'intern',
          lessons: { ...(old.lessons || {}) },
          tests: { ...(old.tests || {}) },
          exams: { ...(old.exams || {}) },
          practice: { ...(old.practice || {}) },
          testHistory: { ...(old.testHistory || {}) },
          examHistory: { ...(old.examHistory || {}) },
          challengeAttempts: { ...(old.challengeAttempts || {}) },
          challengeClears: { ...(old.challengeClears || {}) },
          revision: normalizeRevision(old.revision),
          capstone: normalizeCapstone(old, saved.version)
        };
      });
    });

    return base;
  }


  function normalizeIntegratedWork(value) {
    const source = value && typeof value === 'object' ? value : {};
    const bestScore = Math.max(0, Math.min(100, Number(source.bestScore) || 0));
    return {
      bestScore,
      attempts: Array.isArray(source.attempts) ? source.attempts.slice(-20) : [],
      html: String(source.html || ''),
      css: String(source.css || ''),
      javascript: String(source.javascript || ''),
      passed: Boolean(source.passed) || bestScore >= passMark,
      lastSubmittedAt: source.lastSubmittedAt || null,
      rubric: Array.isArray(source.rubric) ? source.rubric : []
    };
  }

  function normalizeGameWork(value) {
    const source = value && typeof value === 'object' ? value : {};
    const bestScore = Math.max(0, Math.min(100, Number(source.bestScore) || 0));
    return {
      bestScore,
      attempts: Array.isArray(source.attempts) ? source.attempts.slice(-20) : [],
      code: String(source.code || ''),
      passed: Boolean(source.passed) || bestScore >= passMark,
      lastSubmittedAt: source.lastSubmittedAt || null,
      rubric: Array.isArray(source.rubric) ? source.rubric : []
    };
  }

  function normalizePaths(value) {
    const source = value && typeof value === 'object' ? value : {};
    const web = source.webDevelopment && typeof source.webDevelopment === 'object' ? source.webDevelopment : {};
    const game = source.gameDevelopment && typeof source.gameDevelopment === 'object' ? source.gameDevelopment : {};
    const webMissions = {};
    const gameMissions = {};

    Object.entries(web.missions || {}).forEach(([index, work]) => {
      webMissions[String(index)] = normalizeIntegratedWork(work);
    });
    Object.entries(game.missions || {}).forEach(([index, work]) => {
      gameMissions[String(index)] = normalizeGameWork(work);
    });

    return {
      webDevelopment: {
        missions: webMissions,
        capstone: normalizeIntegratedWork(web.capstone)
      },
      gameDevelopment: {
        missions: gameMissions,
        capstone: normalizeGameWork(game.capstone)
      }
    };
  }

  function normalizeBossRecord(value) {
    const source = value && typeof value === 'object' ? value : {};
    const bestScore = Math.max(0, Math.min(100, Number(source.bestScore) || 0));
    return {
      bestScore,
      attempts: Array.isArray(source.attempts) ? source.attempts.slice(-20) : [],
      passed: Boolean(source.passed) || bestScore >= 85,
      lastSubmittedAt: source.lastSubmittedAt || null
    };
  }

  function normalizeFinalEvaluation(value) {
    const source = value && typeof value === 'object' ? value : {};
    const languages = {};
    Object.entries(source.languages || {}).forEach(([language, record]) => {
      languages[language] = normalizeBossRecord(record);
    });
    return { languages, grand: normalizeBossRecord(source.grand) };
  }

  function normalizeAchievements(value) {
    const source = value && typeof value === 'object' ? value : {};
    const unlocked = source.unlocked && typeof source.unlocked === 'object'
      ? source.unlocked
      : {};

    return {
      unlocked: Object.fromEntries(
        Object.entries(unlocked)
          .filter(([, timestamp]) => timestamp)
          .map(([id, timestamp]) => [id, String(timestamp)])
      )
    };
  }


  function normalizeStudy(value) {
    const source = value && typeof value === 'object' ? value : {};
    const notes = {};

    Object.entries(source.notes || {}).forEach(([key, note]) => {
      if (typeof note === 'string') {
        if (note.trim()) notes[key] = { text: note, updatedAt: null };
        return;
      }

      if (!note || typeof note !== 'object') return;
      const text = String(note.text || '');
      if (!text.trim()) return;
      notes[key] = {
        text,
        updatedAt: note.updatedAt || null
      };
    });

    return {
      notes,
      bookmarks: Object.fromEntries(
        Object.entries(source.bookmarks || {}).filter(([, value]) => Boolean(value))
      ),
      revisionPins: Object.fromEntries(
        Object.entries(source.revisionPins || {}).filter(([, value]) => Boolean(value))
      )
    };
  }

  function studyKey(language, difficulty, lessonIndex) {
    return `${language}.${difficulty}.${Math.max(0, Math.round(Number(lessonIndex) || 0))}`;
  }

  function lessonStudy(language, difficulty, lessonIndex) {
    const key = studyKey(language, difficulty, lessonIndex);
    return {
      key,
      note: state.study.notes[key] || null,
      bookmarked: Boolean(state.study.bookmarks[key]),
      revisionPinned: Boolean(state.study.revisionPins[key])
    };
  }

  function saveLessonNote(language, difficulty, lessonIndex, text) {
    const key = studyKey(language, difficulty, lessonIndex);
    const value = String(text || '');

    if (!value.trim()) {
      delete state.study.notes[key];
    } else {
      state.study.notes[key] = {
        text: value,
        updatedAt: new Date().toISOString()
      };
    }

    save();
    return state.study.notes[key] || null;
  }

  function toggleLessonBookmark(language, difficulty, lessonIndex) {
    const key = studyKey(language, difficulty, lessonIndex);
    if (state.study.bookmarks[key]) delete state.study.bookmarks[key];
    else state.study.bookmarks[key] = true;
    save();
    return Boolean(state.study.bookmarks[key]);
  }

  function pinLessonForRevision(language, difficulty, lessonIndex) {
    const key = studyKey(language, difficulty, lessonIndex);
    state.study.revisionPins[key] = true;
    seedRevision(language, difficulty, lessonIndex, 0, true);
    save();
    return true;
  }

  function studyStats() {
    return {
      notes: Object.keys(state.study.notes || {}).length,
      bookmarks: Object.values(state.study.bookmarks || {}).filter(Boolean).length,
      revisionPins: Object.values(state.study.revisionPins || {}).filter(Boolean).length
    };
  }

  function normalizeRevision(value) {
    if (!value || typeof value !== 'object') return {};

    return Object.fromEntries(
      Object.entries(value).map(([key, record]) => {
        const item = record && typeof record === 'object' ? record : {};
        return [key, {
          lastReviewedAt: item.lastReviewedAt || null,
          nextReviewAt: item.nextReviewAt || null,
          intervalDays: Math.max(0, Number(item.intervalDays) || 0),
          streak: Math.max(0, Math.round(Number(item.streak) || 0)),
          lapses: Math.max(0, Math.round(Number(item.lapses) || 0)),
          totalReviews: Math.max(0, Math.round(Number(item.totalReviews) || 0)),
          correctReviews: Math.max(0, Math.round(Number(item.correctReviews) || 0)),
          lastCorrect: item.lastCorrect === true ? true : item.lastCorrect === false ? false : null
        }];
      })
    );
  }


  function normalizeCapstone(oldPath, savedVersion) {
    const current = oldPath?.capstone;
    if (current && typeof current === 'object') {
      const bestScore = Math.max(0, Math.min(100, Number(current.bestScore) || 0));
      return {
        bestScore,
        attempts: Array.isArray(current.attempts) ? current.attempts.slice(-20) : [],
        code: String(current.code || ''),
        passed: Boolean(current.passed) || bestScore >= passMark,
        lastSubmittedAt: current.lastSubmittedAt || null,
        rubric: Array.isArray(current.rubric) ? current.rubric : []
      };
    }

    // A10 and earlier had no capstones. If a learner already reached the exams,
    // preserve that earned progression instead of relocking the path.
    const hadExamProgress = Object.values(oldPath?.exams || {})
      .some(score => Number(score) >= passMark);

    return {
      bestScore: hadExamProgress ? passMark : 0,
      attempts: [],
      code: '',
      passed: hadExamProgress,
      lastSubmittedAt: null,
      rubric: hadExamProgress
        ? [{ label: 'Legacy progression preserved', earned: passMark, possible: passMark }]
        : []
    };
  }

  async function load() {
    const saved = await window.DesktopBridge.loadProgress();
    state = normalize(saved || createDefaultState());
    return state;
  }

  function save() {
    window.DesktopBridge.saveProgress(state);
    window.dispatchEvent(new CustomEvent('academy:state-saved'));
  }

  function replace(nextState) {
    state = normalize(nextState);
    save();
    return state;
  }

  function reset() {
    state = createDefaultState();
    save();
    return state;
  }

  function pathProgress(language, difficulty) {
    return state.progress[language][difficulty];
  }

  function revisionKey(lessonIndex) {
    return String(Math.max(0, Math.round(Number(lessonIndex) || 0)));
  }

  function moduleEngaged(language, difficulty, lessonIndex) {
    const progress = pathProgress(language, difficulty);
    const key = revisionKey(lessonIndex);

    // Revision is for material the learner has actually studied. Advanced
    // Challenge attempts alone do not make an unseen module revision-eligible.
    return Boolean(progress.lessons[key]) ||
      Number(progress.practice[key] || 0) > 0 ||
      Number(progress.tests[key] || 0) > 0 ||
      Boolean(state.study?.revisionPins?.[studyKey(language, difficulty, key)]);
  }

  function revisionRecord(language, difficulty, lessonIndex) {
    const progress = pathProgress(language, difficulty);
    const key = revisionKey(lessonIndex);
    const saved = progress.revision?.[key];

    if (saved && typeof saved === 'object') {
      return {
        lastReviewedAt: saved.lastReviewedAt || null,
        nextReviewAt: saved.nextReviewAt || null,
        intervalDays: Math.max(0, Number(saved.intervalDays) || 0),
        streak: Math.max(0, Math.round(Number(saved.streak) || 0)),
        lapses: Math.max(0, Math.round(Number(saved.lapses) || 0)),
        totalReviews: Math.max(0, Math.round(Number(saved.totalReviews) || 0)),
        correctReviews: Math.max(0, Math.round(Number(saved.correctReviews) || 0)),
        lastCorrect: saved.lastCorrect === true ? true : saved.lastCorrect === false ? false : null
      };
    }

    if (!moduleEngaged(language, difficulty, lessonIndex)) return null;

    return {
      lastReviewedAt: null,
      nextReviewAt: new Date().toISOString(),
      intervalDays: 0,
      streak: 0,
      lapses: 0,
      totalReviews: 0,
      correctReviews: 0,
      lastCorrect: null
    };
  }

  function seedRevision(language, difficulty, lessonIndex, days = 1, forceSooner = false) {
    const progress = pathProgress(language, difficulty);
    const key = revisionKey(lessonIndex);
    const now = Date.now();
    const dueAt = new Date(now + Math.max(0, Number(days) || 0) * 86400000).toISOString();
    const existing = progress.revision[key];

    if (!existing) {
      progress.revision[key] = {
        lastReviewedAt: null,
        nextReviewAt: dueAt,
        intervalDays: Math.max(0, Number(days) || 0),
        streak: 0,
        lapses: 0,
        totalReviews: 0,
        correctReviews: 0,
        lastCorrect: null
      };
      return progress.revision[key];
    }

    if (forceSooner) {
      const currentDue = Date.parse(existing.nextReviewAt || '') || Number.POSITIVE_INFINITY;
      if (Date.parse(dueAt) < currentDue) {
        existing.nextReviewAt = dueAt;
        existing.intervalDays = Math.max(0, Number(days) || 0);
      }
    }

    return existing;
  }

  function reviewIntervalDays(streak, masteryScore) {
    const sequence = [1, 3, 7, 14, 30, 60, 90];
    const index = Math.min(sequence.length - 1, Math.max(0, streak - 1));
    let days = sequence[index];

    if (masteryScore >= 90 && streak >= 2) days = Math.max(days, 7);
    else if (masteryScore >= 75 && streak >= 2) days = Math.max(days, 3);

    return days;
  }

  function recordRevision(language, difficulty, lessonIndex, correct) {
    const progress = pathProgress(language, difficulty);
    const key = revisionKey(lessonIndex);
    const current = revisionRecord(language, difficulty, lessonIndex) || seedRevision(language, difficulty, lessonIndex, 0);
    const masteryBefore = masteryReport(language, difficulty).skills[Number(lessonIndex)]?.score || 0;
    const now = new Date();
    const wasDue = !current.nextReviewAt || Date.parse(current.nextReviewAt) <= now.getTime();
    const streak = correct ? current.streak + 1 : 0;
    const intervalDays = correct ? reviewIntervalDays(streak, masteryBefore) : 1;
    const nextReviewAt = new Date(now.getTime() + intervalDays * 86400000).toISOString();

    progress.revision[key] = {
      lastReviewedAt: now.toISOString(),
      nextReviewAt,
      intervalDays,
      streak,
      lapses: current.lapses + (correct ? 0 : 1),
      totalReviews: current.totalReviews + 1,
      correctReviews: current.correctReviews + (correct ? 1 : 0),
      lastCorrect: Boolean(correct)
    };

    delete state.study.revisionPins[studyKey(language, difficulty, lessonIndex)];
    if (correct && wasDue) state.xp += 8;
    save();
    return progress.revision[key];
  }

  function recordRevisionSession(result) {
    const entry = {
      at: new Date().toISOString(),
      correct: Math.max(0, Math.round(Number(result?.correct) || 0)),
      total: Math.max(0, Math.round(Number(result?.total) || 0)),
      score: Math.max(0, Math.min(100, Math.round(Number(result?.score) || 0)))
    };
    state.revisionSessions = [...state.revisionSessions, entry].slice(-50);
    save();
    return entry;
  }

  function recentChallengeFailures(language, difficulty, lessonIndex) {
    const progress = pathProgress(language, difficulty);
    const attempts = Object.values(progress.challengeAttempts || {})
      .flatMap(history => Array.isArray(history) ? history : [])
      .filter(attempt => Number(attempt.lessonIndex) === Number(lessonIndex))
      .slice(-8);
    return attempts.filter(attempt => !attempt.success).length;
  }

  function revisionItem(language, difficulty, lessonIndex, nowMs = Date.now()) {
    const level = academyData.languages[language].levels[difficulty];
    const progress = pathProgress(language, difficulty);
    const index = Number(lessonIndex);
    const unlocked = Boolean(progress.unlocked) && (index === 0 || Number(progress.tests[index - 1] || 0) >= passMark);
    if (!unlocked || !moduleEngaged(language, difficulty, index)) return null;

    const skill = masteryReport(language, difficulty).skills[index];
    const record = revisionRecord(language, difficulty, index);
    const dueMs = Date.parse(record?.nextReviewAt || '') || nowMs;
    const due = dueMs <= nowMs;
    const overdueDays = due ? Math.max(0, Math.floor((nowMs - dueMs) / 86400000)) : 0;
    const failures = recentChallengeFailures(language, difficulty, index);
    const testScore = Number(progress.tests[index] || 0);
    const neverReviewed = !record?.lastReviewedAt;
    let priority = (100 - skill.score) * 1.4;
    if (due) priority += 90 + Math.min(60, overdueDays * 5);
    if (neverReviewed) priority += 30;
    if (testScore > 0 && testScore < passMark) priority += 25;
    priority += Math.min(30, failures * 6);

    return {
      id: `${language}.${difficulty}.${index}`,
      language,
      languageName: academyData.languages[language].name,
      difficulty,
      difficultyName: academyData.difficulties.find(item => item.id === difficulty)?.name || difficulty,
      lessonIndex: index,
      title: level.lessons[index].title,
      mastery: skill.score,
      status: skill.status,
      due,
      dueAt: record?.nextReviewAt || new Date(nowMs).toISOString(),
      lastReviewedAt: record?.lastReviewedAt || null,
      intervalDays: record?.intervalDays || 0,
      streak: record?.streak || 0,
      lapses: record?.lapses || 0,
      totalReviews: record?.totalReviews || 0,
      weak: skill.score < 75,
      priority: Math.round(priority),
      recommendation: skill.recommendation,
      recentChallengeFailures: failures,
      testScore
    };
  }

  function revisionQueue(filter = 'smart', limit = 100) {
    const nowMs = Date.now();
    const items = [];

    Object.keys(academyData.languages).forEach(language => {
      difficultyIds.forEach(difficulty => {
        const level = academyData.languages[language].levels[difficulty];
        level.lessons.forEach((_, index) => {
          const item = revisionItem(language, difficulty, index, nowMs);
          if (item) items.push(item);
        });
      });
    });

    const selected = items.filter(item => {
      if (filter === 'due') return item.due;
      if (filter === 'weak') return item.weak;
      if (filter === 'all') return true;
      return item.due || item.weak;
    });

    return selected
      .sort((a, b) => b.priority - a.priority || a.mastery - b.mastery)
      .slice(0, Math.max(1, Number(limit) || 100));
  }

  function revisionSummary() {
    const all = revisionQueue('all', 1000);
    const due = all.filter(item => item.due);
    const weak = all.filter(item => item.weak);
    const upcoming = all
      .filter(item => !item.due && item.dueAt)
      .sort((a, b) => Date.parse(a.dueAt) - Date.parse(b.dueAt));
    const recent = [...state.revisionSessions].slice(-10);

    return {
      eligible: all.length,
      due: due.length,
      weak: weak.length,
      nextDueAt: upcoming[0]?.dueAt || null,
      sessions: state.revisionSessions.length,
      recentAverage: recent.length ? Math.round(average(recent.map(item => item.score))) : 0,
      topRecommendation: (due[0] || weak[0] || upcoming[0] || null)
    };
  }

  function rankComplete(language, difficulty) {
    const level = academyData.languages?.[language]?.levels?.[difficulty];
    const progress = state.progress?.[language]?.[difficulty];
    if (!level || !progress) return false;

    const capstonePassed = Boolean(progress.capstone?.passed) || Number(progress.capstone?.bestScore || 0) >= passMark;
    return capstonePassed && level.exams.every((_, index) => Number(progress.exams?.[index] || 0) >= passMark);
  }

  function webPathUnlocked() {
    return ['html', 'css', 'javascript'].every(language => rankComplete(language, 'intern'));
  }

  function webPathData() {
    return state.paths.webDevelopment;
  }

  function webMissionData(index) {
    const key = String(Math.max(0, Math.round(Number(index) || 0)));
    if (!state.paths.webDevelopment.missions[key]) {
      state.paths.webDevelopment.missions[key] = createDefaultIntegratedWork();
    }
    return state.paths.webDevelopment.missions[key];
  }

  function saveWebMissionDraft(index, files) {
    const work = webMissionData(index);
    work.html = String(files?.html || '');
    work.css = String(files?.css || '');
    work.javascript = String(files?.javascript || files?.js || '');
    save();
    return work;
  }

  function recordWebMissionAttempt(index, result) {
    const work = webMissionData(index);
    const score = Math.max(0, Math.min(100, Math.round(Number(result?.score) || 0)));
    const wasPassed = Boolean(work.passed);
    work.html = String(result?.html || work.html || '');
    work.css = String(result?.css || work.css || '');
    work.javascript = String(result?.javascript || result?.js || work.javascript || '');
    work.bestScore = Math.max(Number(work.bestScore || 0), score);
    work.passed = work.bestScore >= passMark;
    work.lastSubmittedAt = new Date().toISOString();
    work.rubric = Array.isArray(result?.rubric) ? result.rubric : [];
    work.attempts = [
      ...(Array.isArray(work.attempts) ? work.attempts : []),
      { score, at: work.lastSubmittedAt }
    ].slice(-20);
    if (!wasPassed && work.passed) state.xp += 150;
    save();
    return work;
  }

  function webCapstoneData() {
    return state.paths.webDevelopment.capstone;
  }

  function saveWebCapstoneDraft(files) {
    const work = webCapstoneData();
    work.html = String(files?.html || '');
    work.css = String(files?.css || '');
    work.javascript = String(files?.javascript || files?.js || '');
    save();
    return work;
  }

  function recordWebCapstoneAttempt(result) {
    const work = webCapstoneData();
    const score = Math.max(0, Math.min(100, Math.round(Number(result?.score) || 0)));
    const wasPassed = Boolean(work.passed);
    work.html = String(result?.html || work.html || '');
    work.css = String(result?.css || work.css || '');
    work.javascript = String(result?.javascript || result?.js || work.javascript || '');
    work.bestScore = Math.max(Number(work.bestScore || 0), score);
    work.passed = work.bestScore >= passMark;
    work.lastSubmittedAt = new Date().toISOString();
    work.rubric = Array.isArray(result?.rubric) ? result.rubric : [];
    work.attempts = [
      ...(Array.isArray(work.attempts) ? work.attempts : []),
      { score, at: work.lastSubmittedAt }
    ].slice(-20);
    if (!wasPassed && work.passed) state.xp += 500;
    save();
    return work;
  }

  function webPathStatus(missionCount = 5) {
    const missions = Array.from({ length: missionCount }, (_, index) => webMissionData(index));
    const passedMissions = missions.filter(item => item.passed || Number(item.bestScore || 0) >= passMark).length;
    const capstone = webCapstoneData();
    const capstonePassed = Boolean(capstone.passed) || Number(capstone.bestScore || 0) >= passMark;
    const completed = passedMissions + (capstonePassed ? 1 : 0);
    return {
      unlocked: webPathUnlocked(),
      passedMissions,
      missionCount,
      capstonePassed,
      complete: passedMissions >= missionCount && capstonePassed,
      percent: Math.round((completed / (missionCount + 1)) * 100)
    };
  }


  function gamePathUnlocked() {
    return rankComplete('csharp', 'intern');
  }

  function gameMissionData(index) {
    const key = String(Math.max(0, Math.round(Number(index) || 0)));
    if (!state.paths.gameDevelopment.missions[key]) state.paths.gameDevelopment.missions[key] = createDefaultGameWork();
    return state.paths.gameDevelopment.missions[key];
  }

  function saveGameMissionDraft(index, code) {
    const work = gameMissionData(index);
    work.code = String(code || '');
    save();
    return work;
  }

  function recordGameMissionAttempt(index, result) {
    const work = gameMissionData(index);
    const score = Math.max(0, Math.min(100, Math.round(Number(result?.score) || 0)));
    const wasPassed = Boolean(work.passed);
    work.code = String(result?.code || work.code || '');
    work.bestScore = Math.max(Number(work.bestScore || 0), score);
    work.passed = work.bestScore >= passMark;
    work.lastSubmittedAt = new Date().toISOString();
    work.rubric = Array.isArray(result?.rubric) ? result.rubric : [];
    work.attempts = [...(Array.isArray(work.attempts) ? work.attempts : []), { score, at: work.lastSubmittedAt }].slice(-20);
    if (!wasPassed && work.passed) state.xp += 175;
    save();
    return work;
  }

  function gameCapstoneData() {
    return state.paths.gameDevelopment.capstone;
  }

  function saveGameCapstoneDraft(code) {
    const work = gameCapstoneData();
    work.code = String(code || '');
    save();
    return work;
  }

  function recordGameCapstoneAttempt(result) {
    const work = gameCapstoneData();
    const score = Math.max(0, Math.min(100, Math.round(Number(result?.score) || 0)));
    const wasPassed = Boolean(work.passed);
    work.code = String(result?.code || work.code || '');
    work.bestScore = Math.max(Number(work.bestScore || 0), score);
    work.passed = work.bestScore >= passMark;
    work.lastSubmittedAt = new Date().toISOString();
    work.rubric = Array.isArray(result?.rubric) ? result.rubric : [];
    work.attempts = [...(Array.isArray(work.attempts) ? work.attempts : []), { score, at: work.lastSubmittedAt }].slice(-20);
    if (!wasPassed && work.passed) state.xp += 600;
    save();
    return work;
  }

  function gamePathStatus(missionCount = 6) {
    const missions = Array.from({ length: missionCount }, (_, index) => gameMissionData(index));
    const passedMissions = missions.filter(item => item.passed || Number(item.bestScore || 0) >= passMark).length;
    const capstone = gameCapstoneData();
    const capstonePassed = Boolean(capstone.passed) || Number(capstone.bestScore || 0) >= passMark;
    return {
      unlocked: gamePathUnlocked(),
      passedMissions,
      missionCount,
      capstonePassed,
      complete: passedMissions >= missionCount && capstonePassed,
      percent: Math.round(((passedMissions + (capstonePassed ? 1 : 0)) / (missionCount + 1)) * 100)
    };
  }

  function bossRecord(language) {
    if (!state.finalEvaluation.languages[language]) state.finalEvaluation.languages[language] = createDefaultBossRecord();
    return state.finalEvaluation.languages[language];
  }

  function recordBossAttempt(language, score) {
    const record = bossRecord(language);
    const value = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));
    const firstPass = !record.passed && value >= 85;
    record.bestScore = Math.max(record.bestScore, value);
    record.passed = record.bestScore >= 85;
    record.lastSubmittedAt = new Date().toISOString();
    record.attempts = [...record.attempts, { score: value, at: record.lastSubmittedAt }].slice(-20);
    if (firstPass) state.xp += 750;
    save();
    return record;
  }

  function grandBossRecord() { return state.finalEvaluation.grand; }

  function recordGrandBossAttempt(score) {
    const record = state.finalEvaluation.grand;
    const value = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));
    const firstPass = !record.passed && value >= 85;
    record.bestScore = Math.max(record.bestScore, value);
    record.passed = record.bestScore >= 85;
    record.lastSubmittedAt = new Date().toISOString();
    record.attempts = [...record.attempts, { score: value, at: record.lastSubmittedAt }].slice(-20);
    if (firstPass) state.xp += 1500;
    save();
    return record;
  }

  function bossArenaStatus() {
    const languageIds = Object.keys(academyData.languages);
    const bosses = Object.fromEntries(languageIds.map(language => [language, bossRecord(language)]));
    const languageReady = Object.fromEntries(languageIds.map(language => [language,
      academyData.difficulties.every(difficulty => rankComplete(language, difficulty.id))
    ]));
    const passed = languageIds.filter(language => bosses[language].passed).length;
    return {
      bosses,
      languageReady,
      passed,
      total: languageIds.length,
      grandUnlocked: passed >= languageIds.length,
      grand: grandBossRecord(),
      complete: passed >= languageIds.length && grandBossRecord().passed
    };
  }

  function difficultyPercent(language, difficulty) {
    const level = academyData.languages[language].levels[difficulty];
    if (!level) return 0;

    const progress = pathProgress(language, difficulty);
    let completed = 0;
    const total = 14;

    level.lessons.forEach((_, index) => {
      if (progress.lessons[index]) completed += 1;
      if ((progress.tests[index] || 0) >= passMark) completed += 1;
    });

    if (progress.capstone?.passed || Number(progress.capstone?.bestScore || 0) >= passMark) completed += 1;

    level.exams.forEach((_, index) => {
      if ((progress.exams[index] || 0) >= passMark) completed += 1;
    });

    return Math.round((completed / total) * 100);
  }

  function languagePercent(language) {
    const difficulties = Object.keys(academyData.languages[language].levels);
    if (!difficulties.length) return 0;

    const total = difficulties.reduce(
      (sum, difficulty) => sum + difficultyPercent(language, difficulty),
      0
    );

    return Math.round(total / difficulties.length);
  }

  function overallPercent() {
    const languages = Object.keys(academyData.languages);
    if (!languages.length) return 0;

    const total = languages.reduce(
      (sum, language) => sum + languagePercent(language),
      0
    );

    return Math.round(total / languages.length);
  }

  function recordPractice(language, difficulty, lessonIndex, success) {
    if (!success) return;
    const progress = pathProgress(language, difficulty);
    progress.practice[lessonIndex] = Number(progress.practice[lessonIndex] || 0) + 1;
    seedRevision(language, difficulty, lessonIndex, 1, false);
  }

  function recordAssessment(language, difficulty, kind, index, score) {
    const progress = pathProgress(language, difficulty);
    const key = String(index);
    const field = kind === 'test' ? 'tests' : 'exams';
    const historyField = kind === 'test' ? 'testHistory' : 'examHistory';

    progress[field][key] = Math.max(Number(progress[field][key] || 0), score);
    const history = Array.isArray(progress[historyField][key]) ? [...progress[historyField][key]] : [];
    history.push(score);
    progress[historyField][key] = history;

    if (kind === 'test') {
      seedRevision(language, difficulty, index, score >= passMark ? 1 : 0, score < passMark);
    } else {
      const level = academyData.languages[language].levels[difficulty];
      level.lessons.forEach((_, lessonIndex) => {
        seedRevision(language, difficulty, lessonIndex, score >= passMark ? 3 : 0, score < passMark);
      });
    }
  }


  function capstoneData(language, difficulty) {
    return pathProgress(language, difficulty).capstone;
  }

  function saveCapstoneDraft(language, difficulty, code) {
    const capstone = capstoneData(language, difficulty);
    capstone.code = String(code || '');
    save();
  }

  function recordCapstoneAttempt(language, difficulty, result) {
    const capstone = capstoneData(language, difficulty);
    const score = Math.max(0, Math.min(100, Math.round(Number(result.score) || 0)));
    const wasPassed = Boolean(capstone.passed);

    capstone.code = String(result.code || capstone.code || '');
    capstone.bestScore = Math.max(Number(capstone.bestScore || 0), score);
    capstone.passed = capstone.bestScore >= passMark;
    capstone.lastSubmittedAt = new Date().toISOString();
    capstone.rubric = Array.isArray(result.rubric) ? result.rubric : [];
    capstone.attempts = [
      ...(Array.isArray(capstone.attempts) ? capstone.attempts : []),
      {
        at: capstone.lastSubmittedAt,
        score,
        passed: score >= passMark,
        rubric: capstone.rubric
      }
    ].slice(-20);

    const level = academyData.languages[language].levels[difficulty];
    level.lessons.forEach((_, lessonIndex) => {
      seedRevision(language, difficulty, lessonIndex, score >= passMark ? 3 : 0, score < passMark);
    });

    const firstPass = capstone.passed && !wasPassed;
    if (firstPass) state.xp += 400;
    save();
    return firstPass;
  }

  function recordChallengeAttempt(language, difficulty, challengeId, attempt) {
    const progress = pathProgress(language, difficulty);
    const history = Array.isArray(progress.challengeAttempts[challengeId])
      ? [...progress.challengeAttempts[challengeId]]
      : [];

    history.push({
      at: new Date().toISOString(),
      success: Boolean(attempt.success),
      hintUsed: Boolean(attempt.hintUsed),
      seconds: Math.max(0, Math.round(Number(attempt.seconds) || 0)),
      type: String(attempt.type || 'challenge'),
      lessonIndex: Number(attempt.lessonIndex) || 0
    });

    progress.challengeAttempts[challengeId] = history.slice(-25);

    const firstClear = Boolean(attempt.success) && !progress.challengeClears[challengeId];
    if (attempt.success) progress.challengeClears[challengeId] = true;
    if (firstClear) state.xp += 20;

    const lessonIndex = Math.max(0, Number(attempt.lessonIndex) || 0);
    seedRevision(language, difficulty, lessonIndex, attempt.success ? 1 : 0, !attempt.success);

    save();
    return firstClear;
  }

  function challengeHistory(language, difficulty, challengeId) {
    const progress = pathProgress(language, difficulty);
    return Array.isArray(progress.challengeAttempts[challengeId])
      ? progress.challengeAttempts[challengeId]
      : [];
  }

  function challengeClearsForLesson(language, difficulty, lessonIndex) {
    const progress = pathProgress(language, difficulty);
    const needle = `.${lessonIndex}.`;
    return Object.entries(progress.challengeClears)
      .filter(([id, cleared]) => cleared && id.includes(needle))
      .length;
  }

  function challengeStats(language, difficulty) {
    const progress = pathProgress(language, difficulty);
    const attempts = Object.values(progress.challengeAttempts)
      .reduce((sum, history) => sum + (Array.isArray(history) ? history.length : 0), 0);
    const clears = Object.values(progress.challengeClears).filter(Boolean).length;

    return { attempts, clears };
  }

  function pathStats(language, difficulty) {
    const level = academyData.languages[language].levels[difficulty];
    const progress = pathProgress(language, difficulty);
    const challenges = challengeStats(language, difficulty);

    return {
      unlocked: progress.unlocked,
      progressPercent: difficultyPercent(language, difficulty),
      testsPassed: level.lessons.filter((_, index) => (progress.tests[index] || 0) >= passMark).length,
      examsPassed: level.exams.filter((_, index) => (progress.exams[index] || 0) >= passMark).length,
      lessonCount: level.lessons.length,
      examCount: level.exams.length,
      practiceClears: Object.values(progress.practice).reduce((sum, count) => sum + Number(count || 0), 0),
      challengeClears: challenges.clears,
      challengeAttempts: challenges.attempts,
      capstoneScore: Number(progress.capstone?.bestScore || 0),
      capstonePassed: Boolean(progress.capstone?.passed)
    };
  }

  function skillStatus(score) {
    if (score >= 90) return { label: 'Mastered', key: 'mastered' };
    if (score >= 75) return { label: 'Strong', key: 'strong' };
    if (score >= 50) return { label: 'Developing', key: 'developing' };
    if (score > 0) return { label: 'Early', key: 'early' };
    return { label: 'Unstarted', key: 'unstarted' };
  }

  function skillRecommendation(score, lessonDone, practiceCount, testScore, unlocked, challengeClears, revision) {
    if (!unlocked) return 'Locked until the previous class test is passed.';
    if (!lessonDone) return 'Study this lesson first and mark it complete.';
    if (practiceCount < 1) return 'Clear the practice challenge at least once.';
    if (testScore < passMark) return `Retake the class test and aim for at least ${passMark}%.`;
    const reviewDue = revision?.nextReviewAt && Date.parse(revision.nextReviewAt) <= Date.now();
    if (reviewDue) return revision.totalReviews > 0 ? 'Your spaced review is due now.' : 'Complete your first spaced review for this module.';
    if (challengeClears < 2) return 'Try a few Advanced Challenges for this module.';
    if (score < 90) return 'Retake practice, challenges or exams to reinforce this topic.';
    return 'Excellent. Follow the spaced-review schedule to keep this concept fresh.';
  }

  function masteryReport(language, difficulty) {
    const level = academyData.languages[language].levels[difficulty];
    const meta = academyData.languages[language];
    const diffMeta = academyData.difficulties.find(item => item.id === difficulty);
    const progress = pathProgress(language, difficulty);
    const stats = pathStats(language, difficulty);

    const examAverage = average(level.exams.map((_, index) => Number(progress.exams[index] || 0)));
    const skills = level.lessons.map((lesson, index) => {
      const lessonDone = Boolean(progress.lessons[index]);
      const practiceCount = Number(progress.practice[index] || 0);
      const testScore = Number(progress.tests[index] || 0);
      const unlocked = stats.unlocked && (index === 0 || (progress.tests[index - 1] || 0) >= passMark);
      const challengeClears = challengeClearsForLesson(language, difficulty, index);
      const revision = revisionRecord(language, difficulty, index);
      const revisionBonus = Math.min(5, Math.max(0, Number(revision?.streak || 0)));

      let score = 0;
      if (lessonDone) score += 20;
      if (practiceCount > 0) score += 15;
      score += testScore * 0.45;
      score += examAverage * 0.2;
      score += Math.min(5, challengeClears);
      score += revisionBonus;
      score = Math.round(clamp(score, 0, 100));

      const status = skillStatus(score);

      return {
        index,
        shortLabel: `M${index + 1}`,
        title: lesson.title,
        score,
        status: status.label,
        statusKey: status.key,
        unlocked,
        recommendation: skillRecommendation(score, lessonDone, practiceCount, testScore, unlocked, challengeClears, revision),
        lessonDone,
        practiceCount,
        testScore,
        challengeClears,
        revisionBonus,
        reviewStreak: Number(revision?.streak || 0),
        totalReviews: Number(revision?.totalReviews || 0),
        nextReviewAt: revision?.nextReviewAt || null,
        revisionDue: Boolean(revision?.nextReviewAt && Date.parse(revision.nextReviewAt) <= Date.now())
      };
    });

    const strongestSkill = [...skills]
      .filter(skill => skill.score > 0)
      .sort((a, b) => b.score - a.score)[0] || null;
    const weakestUnlockedSkill = [...skills]
      .filter(skill => skill.unlocked)
      .sort((a, b) => a.score - b.score)[0] || null;

    return {
      language,
      languageName: meta.name,
      difficulty,
      difficultyName: diffMeta.name,
      accent: meta.accent,
      color: diffMeta.color,
      rank: diffMeta.rank,
      unlocked: stats.unlocked,
      progressPercent: stats.progressPercent,
      percent: Math.round(average(skills.map(skill => skill.score))),
      testsPassed: stats.testsPassed,
      examsPassed: stats.examsPassed,
      practiceClears: stats.practiceClears,
      challengeClears: stats.challengeClears,
      challengeAttempts: stats.challengeAttempts,
      skills,
      strongestSkill,
      weakestUnlockedSkill
    };
  }

  function overallMasteryPercent() {
    const reports = Object.keys(academyData.languages).flatMap(language =>
      difficultyIds.map(difficulty => masteryReport(language, difficulty))
    );

    const engaged = reports.filter(report =>
      report.progressPercent > 0 ||
      report.practiceClears > 0 ||
      report.challengeClears > 0 ||
      report.testsPassed > 0 ||
      report.examsPassed > 0
    );

    if (!engaged.length) return 0;
    return Math.round(average(engaged.map(report => report.percent)));
  }

  function unlockNextDifficulty(language, difficulty) {
    const level = academyData.languages[language].levels[difficulty];
    const progress = pathProgress(language, difficulty);

    const complete = Boolean(progress.capstone?.passed) && level.exams.every(
      (_, index) => (progress.exams[index] || 0) >= passMark
    );

    if (!complete) return;

    const index = difficultyIds.indexOf(difficulty);
    if (index < 0 || index >= difficultyIds.length - 1) return;

    state.progress[language][difficultyIds[index + 1]].unlocked = true;
  }

  return {
    get state() { return state; },
    difficultyIds,
    load,
    save,
    replace,
    reset,
    normalize,
    difficultyPercent,
    languagePercent,
    overallPercent,
    overallMasteryPercent,
    lessonStudy,
    saveLessonNote,
    toggleLessonBookmark,
    pinLessonForRevision,
    studyStats,
    seedRevision,
    revisionRecord,
    revisionItem,
    revisionQueue,
    revisionSummary,
    recordRevision,
    recordRevisionSession,
    recordPractice,
    recordAssessment,
    capstoneData,
    saveCapstoneDraft,
    recordCapstoneAttempt,
    recordChallengeAttempt,
    challengeHistory,
    challengeStats,
    challengeClearsForLesson,
    pathStats,
    masteryReport,
    rankComplete,
    webPathUnlocked,
    webPathData,
    webMissionData,
    saveWebMissionDraft,
    recordWebMissionAttempt,
    webCapstoneData,
    saveWebCapstoneDraft,
    recordWebCapstoneAttempt,
    webPathStatus,
    gamePathUnlocked,
    gameMissionData,
    saveGameMissionDraft,
    recordGameMissionAttempt,
    gameCapstoneData,
    saveGameCapstoneDraft,
    recordGameCapstoneAttempt,
    gamePathStatus,
    bossRecord,
    recordBossAttempt,
    grandBossRecord,
    recordGrandBossAttempt,
    bossArenaStatus,
    unlockNextDifficulty
  };
}
