import { $, escapeHtml, shuffle } from '../core/utils.js';
import { runCSharp } from '../csharp/csharp-runner.js';

const BOSS_PASS_MARK = 85;

export function createBossArenaController({ academyData, store, navigator, learning }) {
  let session = null;

  function open() {
    renderHub();
    navigator.show('bossArenaScreen');
  }

  function close() {
    navigator.show('academyScreen');
  }

  function renderHub() {
    const status = store.bossArenaStatus();
    $('bossPassedCount').textContent = `${status.passed}/${status.total}`;
    $('bossGrandStatus').textContent = status.grand.passed ? 'PASSED' : status.grandUnlocked ? 'READY' : 'LOCKED';
    $('bossGrandBest').textContent = `${Number(status.grand.bestScore || 0)}%`;

    const root = $('bossLanguageGrid');
    root.innerHTML = Object.entries(academyData.languages).map(([id, language]) => {
      const record = status.bosses[id];
      const ready = status.languageReady[id];
      const state = record.passed ? 'PASSED' : ready ? 'READY' : 'PREVIEW';
      return `<article class="boss-card glass-panel ${record.passed ? 'passed' : ''}" style="--accent:${language.accent}">
        <div class="boss-card-icon language-icon"><img src="${language.iconUrl}" alt="${language.name}"></div>
        <div class="boss-card-top"><span>${state}</span><strong>${Number(record.bestScore || 0)}%</strong></div>
        <h3>${escapeHtml(language.name)} Final Boss</h3>
        <p>Mixed final evaluation drawn from all five ranks of ${escapeHtml(language.name)}. Pass mark: ${BOSS_PASS_MARK}%.</p>
        <button class="glow-button ${record.passed ? 'ghost' : 'primary'}" data-boss-language="${id}">${record.passed ? 'RETAKE BOSS' : ready ? 'START BOSS' : 'PREVIEW BOSS'}</button>
      </article>`;
    }).join('');

    $('grandBossButton').disabled = !status.grandUnlocked;
    $('grandBossButton').textContent = status.grand.passed ? 'RETAKE GRAND BOSS' : status.grandUnlocked ? 'START GRAND BOSS' : 'PASS ALL 4 LANGUAGE BOSSES';
  }

  function buildLanguageQuestions(language) {
    const questions = [];
    academyData.difficulties.forEach(difficulty => {
      const level = academyData.languages[language].levels[difficulty.id];
      const lessonIndex = Math.floor(Math.random() * level.lessons.length);
      const lesson = level.lessons[lessonIndex];
      const pool = shuffle(lesson.test.questions);
      if (pool[0]) questions.push({ ...pool[0], source: `${difficulty.name} • ${lesson.title}` });
      if (pool[1]) questions.push({ ...pool[1], source: `${difficulty.name} • ${lesson.title}` });
    });
    return shuffle(questions).slice(0, 10);
  }

  function buildGrandQuestions() {
    return shuffle(Object.keys(academyData.languages).flatMap(language =>
      buildLanguageQuestions(language).slice(0, 4).map(question => ({ ...question, language }))
    )).slice(0, 16);
  }

  function startLanguage(language) {
    const ready = store.bossArenaStatus().languageReady[language];
    session = {
      kind: 'language',
      language,
      scored: ready,
      questions: buildLanguageQuestions(language),
      position: 0,
      correct: 0,
      selected: null
    };
    $('bossWorkEyebrow').textContent = `${academyData.languages[language].name.toUpperCase()} • FINAL BOSS`;
    $('bossWorkTitle').textContent = `${academyData.languages[language].name} Final Evaluation`;
    $('bossWorkMode').textContent = ready ? 'SCORED' : 'PREVIEW';
    $('bossWorkMode').classList.toggle('preview', !ready);
    renderQuestion();
    navigator.show('bossWorkScreen');
  }

  function startGrand() {
    const status = store.bossArenaStatus();
    if (!status.grandUnlocked) return;
    session = { kind: 'grand', language: null, scored: true, questions: buildGrandQuestions(), position: 0, correct: 0, selected: null };
    $('bossWorkEyebrow').textContent = 'ACADEMY • GRAND BOSS';
    $('bossWorkTitle').textContent = 'Cross-Discipline Final Evaluation';
    $('bossWorkMode').textContent = 'SCORED';
    $('bossWorkMode').classList.remove('preview');
    renderQuestion();
    navigator.show('bossWorkScreen');
  }

  function renderQuestion() {
    if (!session) return;
    const question = session.questions[session.position];
    $('bossQuestionCounter').textContent = `${session.position + 1}/${session.questions.length}`;
    $('bossProgressFill').style.width = `${((session.position + 1) / session.questions.length) * 100}%`;
    $('bossSource').textContent = question.source || (question.language ? academyData.languages[question.language].name : 'Academy');
    $('bossQuestion').textContent = question.prompt;
    $('bossFeedback').textContent = session.scored ? `Pass mark: ${BOSS_PASS_MARK}%. No hints.` : 'Preview mode: your result will not be saved.';
    const area = $('bossAnswerArea');
    area.innerHTML = '';
    session.selected = null;

    if (question.type === 'mc') {
      shuffle(question.options || []).forEach(option => {
        const button = document.createElement('button');
        button.className = 'answer-option';
        button.textContent = option;
        button.onclick = () => {
          [...area.children].forEach(item => item.classList.remove('selected'));
          button.classList.add('selected');
          session.selected = option;
        };
        area.appendChild(button);
      });
      return;
    }

    const input = document.createElement('textarea');
    input.className = 'answer-input boss-code-answer';
    input.placeholder = 'Write your solution here...';
    input.oninput = () => { session.selected = input.value; };
    area.appendChild(input);
  }

  async function submit() {
    if (!session) return;
    const question = session.questions[session.position];
    const answer = String(session.selected ?? '').trim();
    if (!answer) { $('bossFeedback').textContent = 'Answer the question before submitting.'; return; }

    let correct = false;
    if (question.type === 'mc') {
      correct = session.selected === question.answer;
    } else {
      try { correct = Boolean(question.validator?.(answer)); } catch { correct = false; }
      const language = session.kind === 'language' ? session.language : question.language;
      if (correct && language === 'csharp') {
        const compile = await runCSharp(answer, null);
        correct = Boolean(compile?.compiled);
        if (!correct) $('bossFeedback').textContent = 'The structural answer matched, but the C# compiler rejected the code.';
      }
    }

    if (correct) session.correct += 1;
    session.position += 1;
    if (session.position < session.questions.length) renderQuestion();
    else finish();
  }

  function finish() {
    const score = Math.round((session.correct / session.questions.length) * 100);
    const passed = score >= BOSS_PASS_MARK;
    if (session.scored) {
      if (session.kind === 'grand') store.recordGrandBossAttempt(score);
      else store.recordBossAttempt(session.language, score);
      learning?.updateGlobalStats?.();
    }

    $('bossResultScore').textContent = `${score}%`;
    $('bossResultTitle').textContent = passed ? 'BOSS DEFEATED' : 'BOSS SURVIVED';
    $('bossResultMessage').textContent = session.scored
      ? passed ? 'Final evaluation passed and saved.' : `You need ${BOSS_PASS_MARK}% to defeat this boss. Review weak modules and return stronger.`
      : `Preview complete. Score: ${score}%. Finish the required ranks to make boss attempts count.`;
    $('bossResultBreakdown').innerHTML = `<div><span>CORRECT</span><strong>${session.correct}/${session.questions.length}</strong></div><div><span>REQUIRED</span><strong>${BOSS_PASS_MARK}%</strong></div><div><span>MODE</span><strong>${session.scored ? 'SCORED' : 'PREVIEW'}</strong></div>`;
    navigator.show('bossResultScreen');
  }

  function backToHub() {
    session = null;
    renderHub();
    navigator.show('bossArenaScreen');
  }

  return { open, close, renderHub, startLanguage, startGrand, submit, backToHub };
}
