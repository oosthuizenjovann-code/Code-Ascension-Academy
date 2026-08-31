import { $, escapeHtml } from '../core/utils.js';
import { formatCSharpResult } from '../csharp/csharp-runner.js';

const TYPES = {
  debug: {
    name: 'Debug the Code',
    short: 'DEBUG',
    description: 'Repair deliberately broken code while preserving the lesson requirements.'
  },
  predict: {
    name: 'Predict the Output',
    short: 'PREDICT',
    description: 'Read a small snippet carefully and determine what it produces.'
  },
  complete: {
    name: 'Complete the Code',
    short: 'COMPLETE',
    description: 'Fill in a missing piece without replacing the whole solution.'
  },
  refactor: {
    name: 'Refactor the Code',
    short: 'REFACTOR',
    description: 'Improve a working solution while keeping its important behaviour and structure.'
  },
  explain: {
    name: 'Explain the Code',
    short: 'EXPLAIN',
    description: 'Describe unfamiliar code in your own words to prove you can read it.'
  },
  build: {
    name: 'Build from Requirements',
    short: 'BUILD',
    description: 'Start from a blank editor and satisfy the module requirements without starter code.'
  }
};

export function createChallengeController({ academyData, store, nav, navigator, learning, passMark = 80 }) {
  let language = 'html';
  let difficulty = 'intern';
  let type = 'debug';
  let active = null;
  let startedAt = 0;
  let hintUsed = false;

  function open() {
    nav.returnScreen = 'academyScreen';
    chooseValidDifficulty();
    paintSelectors();
    renderHub();
    navigator.show('challengeHubScreen');
  }

  function close() {
    navigator.show('academyScreen');
  }

  function chooseValidDifficulty() {
    const path = store.state.progress[language]?.[difficulty];
    if (path?.unlocked) return;
    difficulty = academyData.difficulties.find(item => store.state.progress[language]?.[item.id]?.unlocked)?.id || 'intern';
  }

  function setLanguage(next) {
    if (!academyData.languages[next]) return;
    language = next;
    chooseValidDifficulty();
    paintSelectors();
    renderHub();
  }

  function setDifficulty(next) {
    if (!academyData.languages[language].levels[next]) return;
    if (!store.state.progress[language][next]?.unlocked) return;
    difficulty = next;
    paintSelectors();
    renderHub();
  }

  function setType(next) {
    if (!TYPES[next]) return;
    type = next;
    paintSelectors();
    renderHub();
  }

  function paintSelectors() {
    const languageRoot = $('challengeLanguageFilters');
    languageRoot.innerHTML = Object.entries(academyData.languages).map(([id, meta]) => `
      <button class="challenge-filter ${id === language ? 'active' : ''}" data-challenge-language="${id}" style="--accent:${meta.accent}">${meta.name}</button>`).join('');

    const difficultyRoot = $('challengeDifficultyFilters');
    difficultyRoot.innerHTML = academyData.difficulties.map(item => {
      const unlocked = Boolean(store.state.progress[language]?.[item.id]?.unlocked);
      return `<button class="challenge-filter rank-filter ${item.id === difficulty ? 'active' : ''} ${unlocked ? '' : 'locked'}" ${unlocked ? `data-challenge-difficulty="${item.id}"` : 'disabled'} style="--rank:${item.color}">${item.name}</button>`;
    }).join('');

    const typeRoot = $('challengeTypeFilters');
    typeRoot.innerHTML = Object.entries(TYPES).map(([id, meta]) => `
      <button class="challenge-type-button ${id === type ? 'active' : ''}" data-challenge-type="${id}">
        <span>${meta.short}</span>
        <strong>${meta.name}</strong>
      </button>`).join('');
  }

  function renderHub() {
    const meta = academyData.languages[language];
    const diff = academyData.difficulties.find(item => item.id === difficulty);
    const level = academyData.languages[language].levels[difficulty];
    const stats = store.challengeStats(language, difficulty);

    $('challengeHubEyebrow').textContent = `${meta.name.toUpperCase()} • ${diff.name.toUpperCase()}`;
    $('challengeHubTitle').textContent = TYPES[type].name;
    $('challengeHubDescription').textContent = TYPES[type].description;
    $('challengeClears').textContent = stats.clears;
    $('challengeAttempts').textContent = stats.attempts;

    const root = $('challengeGrid');
    root.innerHTML = '';

    level.lessons.forEach((lesson, index) => {
      const unlocked = index === 0 || (store.state.progress[language][difficulty].tests[index - 1] || 0) >= passMark;
      const challenge = buildChallenge(index, type);
      const history = store.challengeHistory(language, difficulty, challenge.id);
      const solved = Boolean(store.state.progress[language][difficulty].challengeClears[challenge.id]);
      const attempts = history.length;

      root.insertAdjacentHTML('beforeend', `
        <article class="challenge-card glass-panel ${unlocked ? '' : 'locked'} ${solved ? 'solved' : ''}" ${unlocked ? `data-challenge-index="${index}"` : ''}>
          <div class="challenge-card-top">
            <span class="challenge-module">MODULE ${index + 1}</span>
            <span class="challenge-state">${solved ? '✓ CLEARED' : unlocked ? (attempts ? `${attempts} ATTEMPT${attempts === 1 ? '' : 'S'}` : 'READY') : 'LOCKED'}</span>
          </div>
          <h3>${escapeHtml(lesson.title)}</h3>
          <p>${escapeHtml(challenge.cardDescription)}</p>
          <div class="challenge-tags">
            ${challenge.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}
          </div>
          <button class="glow-button small ${solved ? 'ghost' : 'primary'}" ${unlocked ? `data-challenge-index="${index}"` : 'disabled'}>${solved ? 'RETRY CHALLENGE' : unlocked ? 'START CHALLENGE' : 'LOCKED'}</button>
        </article>`);
    });
  }

  function openChallenge(index) {
    active = buildChallenge(index, type);
    startedAt = Date.now();
    hintUsed = false;

    const meta = academyData.languages[language];
    const diff = academyData.difficulties.find(item => item.id === difficulty);

    $('challengeWorkEyebrow').textContent = `${meta.name.toUpperCase()} • ${diff.name.toUpperCase()} • MODULE ${index + 1}`;
    $('challengeWorkTitle').textContent = active.name;
    $('challengeKind').textContent = TYPES[active.type].name.toUpperCase();
    $('challengePrompt').textContent = active.prompt;
    $('challengeInstructions').textContent = active.instructions;
    $('challengeSkillTags').innerHTML = active.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('');
    $('challengeFilename').textContent = active.answerMode === 'text' ? 'answer.txt' : meta.filename;
    $('challengeEditor').value = active.starter;
    $('challengeEditor').placeholder = active.answerMode === 'text' ? 'Explain your answer here...' : 'Write your solution here...';
    $('challengeFeedback').textContent = 'Submit when you are ready. Attempts are saved locally.';
    $('challengeHintBox').textContent = active.hint;
    $('challengeHintBox').classList.add('hidden');
    $('challengeHintButton').textContent = 'USE HINT';
    $('challengeReferenceCode').textContent = active.referenceCode || '';
    $('challengeReferencePanel').classList.toggle('hidden', !active.referenceCode);

    renderAttemptHistory();
    navigator.show('challengeWorkScreen');
  }

  function backToHub() {
    active = null;
    renderHub();
    navigator.show('challengeHubScreen');
  }

  function showHint() {
    if (!active) return;
    hintUsed = true;
    $('challengeHintBox').classList.remove('hidden');
    $('challengeHintButton').textContent = 'HINT SHOWN';
  }

  async function submit() {
    if (!active) return;
    const answer = $('challengeEditor').value;
    const seconds = (Date.now() - startedAt) / 1000;
    let success = false;

    try {
      success = Boolean(active.validator(answer));
    } catch {
      success = false;
    }

    let compilerFeedback = '';
    if (success && language === 'csharp' && active.answerMode === 'code') {
      $('challengeFeedback').textContent = 'Compiling C# submission...';
      const compileResult = await window.DesktopBridge.runCSharp(answer);
      if (!compileResult?.success) {
        success = false;
        compilerFeedback = `The structural requirements are present, but the C# submission did not compile/run successfully.\n\n${formatCSharpResult(compileResult)}`;
      }
    }

    const firstClear = store.recordChallengeAttempt(language, difficulty, active.id, {
      success,
      hintUsed,
      seconds,
      type: active.type,
      lessonIndex: active.lessonIndex
    });

    $('challengeFeedback').textContent = success
      ? firstClear
        ? '✓ Challenge cleared. First-clear XP awarded and mastery reinforcement recorded.'
        : '✓ Correct. This challenge was already cleared, but the new attempt is saved.'
      : compilerFeedback || active.failureMessage;

    learning.updateGlobalStats();
    renderAttemptHistory();
    if (success) renderHubStatsOnly();
    startedAt = Date.now();
    hintUsed = false;
  }

  function renderHubStatsOnly() {
    const stats = store.challengeStats(language, difficulty);
    $('challengeClears').textContent = stats.clears;
    $('challengeAttempts').textContent = stats.attempts;
  }

  function renderAttemptHistory() {
    if (!active) return;
    const history = [...store.challengeHistory(language, difficulty, active.id)].reverse().slice(0, 6);
    const root = $('challengeAttemptHistory');

    if (!history.length) {
      root.innerHTML = '<p class="muted challenge-empty-history">No attempts yet.</p>';
      return;
    }

    root.innerHTML = history.map((attempt, index) => `
      <div class="challenge-attempt ${attempt.success ? 'success' : 'failed'}">
        <div><strong>${attempt.success ? 'PASS' : 'TRY AGAIN'}</strong><span>${formatDuration(attempt.seconds)}</span></div>
        <div><span>${attempt.hintUsed ? 'Hint used' : 'No hint'}</span><span>${new Date(attempt.at).toLocaleString()}</span></div>
      </div>`).join('');
  }

  function buildChallenge(lessonIndex, challengeType) {
    const lesson = academyData.languages[language].levels[difficulty].lessons[lessonIndex];
    const solution = String(lesson.practice?.solution || lesson.starter || '');
    const baseId = `${language}.${difficulty}.${lessonIndex}.${challengeType}`;
    const tags = [
      `${academyData.languages[language].name} Module ${lessonIndex + 1}`,
      challengeType === 'debug' ? 'Debugging' : TYPES[challengeType].name
    ];

    if (challengeType === 'debug') {
      const broken = breakCode(solution, language);
      return {
        id: baseId,
        type: challengeType,
        lessonIndex,
        name: `Repair: ${lesson.title}`,
        cardDescription: 'A working module solution has been damaged. Find the deliberate defect and repair it.',
        prompt: `Repair the broken ${academyData.languages[language].name} example for “${lesson.title}”.`,
        instructions: 'Keep the core lesson requirements intact. Remove the deliberate defect instead of replacing the entire exercise with unrelated code.',
        starter: broken,
        referenceCode: '',
        answerMode: 'code',
        hint: 'Look for the unusual BROKEN marker first, then make sure the repaired code still satisfies the original lesson requirement.',
        tags,
        validator: answer => !String(answer).includes('BROKEN') && changed(answer, broken) && lesson.practice.validator(answer),
        failureMessage: '✕ The repair is not complete yet. Remove the deliberate defect and preserve the module requirements.'
      };
    }

    if (challengeType === 'complete') {
      const incomplete = makeIncomplete(solution, language);
      return {
        id: baseId,
        type: challengeType,
        lessonIndex,
        name: `Complete: ${lesson.title}`,
        cardDescription: 'One important piece is missing from a valid module solution.',
        prompt: `Replace the ____ placeholder so the “${lesson.title}” example is complete again.`,
        instructions: 'Do not delete the surrounding structure. Use the lesson concepts to determine what belongs in the missing position.',
        starter: incomplete,
        referenceCode: '',
        answerMode: 'code',
        hint: lesson.practice.hint || 'Compare the missing position with the worked example in the lesson.',
        tags,
        validator: answer => !String(answer).includes('____') && changed(answer, incomplete) && lesson.practice.validator(answer),
        failureMessage: '✕ Something is still missing or the completed code no longer satisfies the lesson requirements.'
      };
    }

    if (challengeType === 'refactor') {
      return {
        id: baseId,
        type: challengeType,
        lessonIndex,
        name: `Refactor: ${lesson.title}`,
        cardDescription: 'Improve a correct solution without losing the lesson concept.',
        prompt: `Refactor the example for “${lesson.title}” so it is clearer or better structured.`,
        instructions: 'Change names, formatting, structure, or organization while preserving the key behaviour. The checker requires a meaningful edit and the original module requirements.',
        starter: solution,
        referenceCode: '',
        answerMode: 'code',
        hint: 'Make one meaningful readability improvement: descriptive names, clearer grouping, less repetition, or cleaner structure.',
        tags,
        validator: answer => changed(answer, solution) && String(answer).trim().length >= Math.max(12, solution.trim().length * 0.55) && lesson.practice.validator(answer),
        failureMessage: '✕ The refactor either changed too little or lost one of the module requirements.'
      };
    }

    if (challengeType === 'explain') {
      const keywords = explanationKeywords(lesson);
      return {
        id: baseId,
        type: challengeType,
        lessonIndex,
        name: `Explain: ${lesson.title}`,
        cardDescription: 'Read code you did not just write and explain its important behaviour.',
        prompt: `Explain what the example from “${lesson.title}” does and why the important pieces are used.`,
        instructions: 'Write at least a few sentences in your own words. Mention the important concepts rather than describing only individual characters or punctuation.',
        starter: '',
        referenceCode: lesson.starter,
        answerMode: 'text',
        hint: `Focus on these ideas: ${keywords.slice(0, 4).join(', ')}.`,
        tags,
        validator: answer => explanationValid(answer, keywords),
        failureMessage: '✕ Give a fuller explanation and mention at least two of the important concepts shown in the example.'
      };
    }

    if (challengeType === 'predict') {
      return predictChallenge(baseId, lessonIndex, lesson, tags);
    }

    return {
      id: baseId,
      type: 'build',
      lessonIndex,
      name: `Build: ${lesson.title}`,
      cardDescription: 'No starter code. Work directly from the module requirements.',
      prompt: lesson.practice.prompt,
      instructions: 'Start from a blank editor. There can be multiple valid solutions, but your answer must demonstrate the important module features.',
      starter: '',
      referenceCode: '',
      answerMode: 'code',
      hint: lesson.practice.hint || 'Break the requirement into smaller pieces and implement them one at a time.',
      tags,
      validator: lesson.practice.validator,
      failureMessage: '✕ The solution does not yet demonstrate all of the important module requirements.'
    };
  }

  function predictChallenge(id, lessonIndex, lesson, tags) {
    const n = lessonIndex + 2;
    let referenceCode = '';
    let expected = [];
    let prompt = '';

    if (language === 'html') {
      referenceCode = `<main>\n  <h1>Academy ${n}</h1>\n  <p>Level ${n + 1}</p>\n</main>`;
      expected = [`academy ${n}`, `level ${n + 1}`];
      prompt = 'What two pieces of visible text would this HTML render?';
    } else if (language === 'css') {
      const width = 100 + n * 20;
      referenceCode = `.card {\n  width: ${width}px;\n  padding: 16px;\n}`;
      expected = [`${width}px`];
      prompt = 'What width value is explicitly assigned to .card?';
    } else if (language === 'javascript') {
      const result = n * (n + 3);
      referenceCode = `const value = ${n};\nconsole.log(value * ${n + 3});`;
      expected = [String(result)];
      prompt = 'What exact value is printed to the console?';
    } else {
      const result = n + (n * 2);
      referenceCode = `int value = ${n};\nvalue += ${n * 2};\nConsole.WriteLine(value);`;
      expected = [String(result)];
      prompt = 'What exact value is printed by Console.WriteLine?';
    }

    return {
      id,
      type: 'predict',
      lessonIndex,
      name: `Read: ${lesson.title}`,
      cardDescription: 'Slow down and reason through a small snippet before running or changing anything.',
      prompt,
      instructions: 'Write only the requested output/value. For HTML, include both visible text phrases.',
      starter: '',
      referenceCode,
      answerMode: 'text',
      hint: 'Trace the snippet from top to bottom and write down each value or visible text item before answering.',
      tags,
      validator: answer => expected.every(item => String(answer).toLowerCase().includes(item.toLowerCase())),
      failureMessage: '✕ Re-read the snippet carefully and trace the values or visible text in order.'
    };
  }

  function breakCode(code, lang) {
    const text = String(code || '');
    if (!text.trim()) return 'BROKEN';

    if (lang === 'html') {
      const index = text.indexOf('>');
      return index >= 0 ? `${text.slice(0, index)} BROKEN${text.slice(index)}` : `${text}\n<!-- BROKEN -->`;
    }

    if (lang === 'css') {
      return `${text}\n\n/* BROKEN: repair or remove this invalid declaration */\n.challenge-bug { color: BROKEN; }`;
    }

    if (lang === 'javascript') {
      const match = text.match(/\b(const|let|function|return|for|if)\b/);
      if (match) return text.replace(match[0], `BROKEN_${match[0]}`);
      return `BROKEN\n${text}`;
    }

    const match = text.match(/\b(using|public|class|record|int|string|var|foreach|if)\b/);
    if (match) return text.replace(match[0], `BROKEN_${match[0]}`);
    return `BROKEN\n${text}`;
  }

  function makeIncomplete(code, lang) {
    const text = String(code || '');
    const patterns = lang === 'html'
      ? [/<(main|section|article|form|nav|header|footer|h1|p)\b/i]
      : lang === 'css'
        ? [/\b(display|grid-template-columns|justify-content|align-items|color|background|padding|margin)\s*:/i]
        : lang === 'javascript'
          ? [/\b(const|let|function|return|for|if|class)\b/]
          : [/\b(public|class|record|int|string|var|return|foreach|if|using)\b/];

    for (const pattern of patterns) {
      if (pattern.test(text)) return text.replace(pattern, match => match.replace(/[A-Za-z#-]+/, '____'));
    }

    return `____\n${text}`;
  }

  function explanationKeywords(lesson) {
    const source = [lesson.title, ...lesson.sections.map(section => section.title)].join(' ')
      .toLowerCase()
      .replace(/[^a-z0-9#]+/g, ' ')
      .split(/\s+/)
      .filter(word => word.length >= 4 && !['core', 'idea', 'worked', 'example', 'common', 'mistakes', 'debugging', 'mastery', 'checkpoint'].includes(word));
    return [...new Set(source)].slice(0, 10);
  }

  function explanationValid(answer, keywords) {
    const text = String(answer || '').toLowerCase().trim();
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length < 25) return false;
    const hits = keywords.filter(keyword => text.includes(keyword)).length;
    return hits >= Math.min(2, keywords.length || 2);
  }

  function changed(answer, starter) {
    return normalizeText(answer) !== normalizeText(starter);
  }

  function normalizeText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function formatDuration(seconds) {
    const total = Math.max(0, Math.round(Number(seconds) || 0));
    const minutes = Math.floor(total / 60);
    const remainder = total % 60;
    return minutes ? `${minutes}m ${remainder}s` : `${remainder}s`;
  }

  return {
    open,
    close,
    setLanguage,
    setDifficulty,
    setType,
    openChallenge,
    backToHub,
    showHint,
    submit
  };
}
