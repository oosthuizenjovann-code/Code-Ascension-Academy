import { $, escapeHtml, shuffle } from '../core/utils.js';
import { runCSharp, formatCSharpResult } from '../csharp/csharp-runner.js';

export function createRevisionController({ academyData, store, nav, navigator }) {
  let currentFilter = 'smart';
  let session = null;

  function open() {
    nav.returnScreen = 'academyScreen';
    renderHub();
    navigator.show('revisionScreen');
  }

  function close() {
    session = null;
    navigator.show('academyScreen');
  }

  function setFilter(filter) {
    currentFilter = ['smart', 'due', 'weak', 'all'].includes(filter) ? filter : 'smart';
    renderHub();
  }

  function renderHub(lastSession = null) {
    const summary = store.revisionSummary();
    const queue = store.revisionQueue(currentFilter, 30);

    $('revisionDueCount').textContent = summary.due;
    $('revisionWeakCount').textContent = summary.weak;
    $('revisionSessionCount').textContent = summary.sessions;
    $('revisionAverage').textContent = summary.sessions ? `${summary.recentAverage}%` : '—';
    $('revisionNextDue').textContent = formatNextDue(summary.nextDueAt, summary.due);

    const recommendation = summary.topRecommendation;
    $('revisionRecommendation').innerHTML = recommendation
      ? `<strong>${escapeHtml(recommendation.languageName)} ${escapeHtml(recommendation.difficultyName)} — ${escapeHtml(recommendation.title)}</strong><span>${recommendation.due ? 'Due now' : recommendation.weak ? 'Weak topic' : 'Upcoming review'} • ${recommendation.mastery}% mastery</span>`
      : '<strong>No revision queue yet.</strong><span>Complete a lesson or assessment and the Academy will begin scheduling reviews.</span>';

    document.querySelectorAll('[data-revision-filter]').forEach(button => {
      button.classList.toggle('active', button.dataset.revisionFilter === currentFilter);
    });

    renderQueue(queue);
    renderHistory();
    renderLastSession(lastSession);

    const startButton = $('revisionStartButton');
    startButton.disabled = queue.length === 0;
    startButton.textContent = queue.length
      ? `START ${Math.min(5, queue.length)}-ITEM REVISION`
      : 'NO REVISION ITEMS YET';
  }

  function renderQueue(queue) {
    const root = $('revisionQueue');
    root.innerHTML = '';

    if (!queue.length) {
      root.innerHTML = `
        <div class="revision-empty glass-panel">
          <div class="revision-empty-icon">✓</div>
          <h3>Nothing matches this revision view</h3>
          <p>Complete more lessons, or switch the filter to see scheduled and weaker topics.</p>
        </div>`;
      return;
    }

    queue.forEach((item, index) => {
      const language = academyData.languages[item.language];
      const dueLabel = item.due ? 'DUE NOW' : formatRelativeDate(item.dueAt);
      const reason = item.due
        ? item.totalReviews ? 'Scheduled review is due.' : 'First spaced review is ready.'
        : item.weak ? 'Mastery is below the strong threshold.' : 'Scheduled for future reinforcement.';

      root.insertAdjacentHTML('beforeend', `
        <article class="revision-queue-card glass-panel" style="--accent:${language.accent}">
          <div class="revision-priority">${String(index + 1).padStart(2, '0')}</div>
          <div class="revision-queue-main">
            <div class="revision-queue-heading">
              <div>
                <div class="eyebrow">${escapeHtml(item.languageName.toUpperCase())} • ${escapeHtml(item.difficultyName.toUpperCase())} • MODULE ${item.lessonIndex + 1}</div>
                <h3>${escapeHtml(item.title)}</h3>
              </div>
              <span class="revision-due-pill ${item.due ? 'due' : ''}">${escapeHtml(dueLabel)}</span>
            </div>
            <p>${escapeHtml(reason)}</p>
            <div class="revision-queue-stats">
              <span>Mastery <strong>${item.mastery}%</strong></span>
              <span>Best test <strong>${item.testScore || 0}%</strong></span>
              <span>Review streak <strong>${item.streak}</strong></span>
              <span>Lapses <strong>${item.lapses}</strong></span>
            </div>
            <div class="revision-mastery-track"><div style="width:${item.mastery}%"></div></div>
          </div>
        </article>`);
    });
  }

  function renderHistory() {
    const root = $('revisionHistory');
    const history = [...store.state.revisionSessions].slice(-6).reverse();

    root.innerHTML = history.length
      ? history.map(item => `
          <div class="revision-history-row">
            <span>${formatDate(item.at)}</span>
            <strong>${item.score}%</strong>
            <span>${item.correct}/${item.total} correct</span>
          </div>`).join('')
      : '<div class="revision-history-empty">No revision sessions completed yet.</div>';
  }

  function renderLastSession(result) {
    const panel = $('revisionLastResult');
    if (!result) {
      panel.classList.add('hidden');
      panel.innerHTML = '';
      return;
    }

    panel.classList.remove('hidden');
    panel.innerHTML = `
      <div>
        <div class="eyebrow">SESSION COMPLETE</div>
        <h3>${result.score}% revision score</h3>
        <p>${result.correct}/${result.total} correct. Every reviewed module has been rescheduled automatically.</p>
      </div>
      <div class="revision-result-badge">${result.score}%</div>`;
  }

  function startSession() {
    const source = store.revisionQueue(currentFilter, 5);
    if (!source.length) return;

    session = {
      items: source,
      position: 0,
      correct: 0,
      answer: null,
      question: null,
      awaitingNext: false,
      results: []
    };

    renderQuestion();
    navigator.show('revisionWorkScreen');
  }

  function renderQuestion() {
    const item = session.items[session.position];
    const level = academyData.languages[item.language].levels[item.difficulty];
    const lesson = level.lessons[item.lessonIndex];
    const record = store.revisionRecord(item.language, item.difficulty, item.lessonIndex);
    const questionIndex = Number(record?.totalReviews || 0) % lesson.test.questions.length;
    const question = cloneQuestion(lesson.test.questions[questionIndex]);

    session.question = question;
    session.answer = null;
    session.awaitingNext = false;

    $('revisionWorkCounter').textContent = `${session.position + 1}/${session.items.length}`;
    $('revisionWorkProgress').style.width = `${((session.position + 1) / session.items.length) * 100}%`;
    $('revisionWorkEyebrow').textContent = `${item.languageName.toUpperCase()} • ${item.difficultyName.toUpperCase()} • MODULE ${item.lessonIndex + 1}`;
    $('revisionWorkTitle').textContent = item.title;
    $('revisionQuestionType').textContent = question.type === 'mc' ? 'KNOWLEDGE CHECK' : 'CODE RECALL';
    $('revisionQuestion').textContent = question.prompt;
    $('revisionWhy').textContent = buildWhy(item);
    $('revisionFeedback').className = 'revision-feedback hidden';
    $('revisionFeedback').innerHTML = '';
    $('revisionSubmitButton').textContent = 'SUBMIT REVIEW';

    renderAnswerArea(question);
  }

  function cloneQuestion(question) {
    return {
      ...question,
      options: question.options ? [...question.options] : undefined
    };
  }

  function renderAnswerArea(question) {
    const root = $('revisionAnswerArea');
    root.innerHTML = '';

    if (question.type === 'mc') {
      shuffle(question.options || []).forEach(option => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'revision-answer-option';
        button.textContent = option;
        button.addEventListener('click', () => {
          [...root.children].forEach(child => child.classList.remove('selected'));
          button.classList.add('selected');
          session.answer = option;
        });
        root.appendChild(button);
      });
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.className = 'revision-code-answer';
    textarea.spellcheck = false;
    textarea.placeholder = 'Write your answer from memory...';
    textarea.addEventListener('input', () => {
      session.answer = textarea.value;
    });
    root.appendChild(textarea);
  }

  async function submit() {
    if (!session) return;

    if (session.awaitingNext) {
      advance();
      return;
    }

    if (session.answer === null || String(session.answer).trim() === '') {
      alert('Answer the revision question first.');
      return;
    }

    const item = session.items[session.position];
    const question = session.question;
    let correct = false;
    let compilerText = '';

    if (question.type === 'mc') {
      correct = session.answer === question.answer;
    } else {
      try {
        correct = Boolean(question.validator(session.answer));
      } catch {
        correct = false;
      }

      if (correct && item.language === 'csharp') {
        const result = await runCSharp(session.answer, null);
        correct = Boolean(result?.success);
        if (!correct) compilerText = formatCSharpResult(result);
      }
    }

    const revision = store.recordRevision(item.language, item.difficulty, item.lessonIndex, correct);
    if (correct) session.correct += 1;
    session.results.push({ item, correct, nextReviewAt: revision.nextReviewAt });
    session.awaitingNext = true;

    const feedback = $('revisionFeedback');
    feedback.className = `revision-feedback ${correct ? 'correct' : 'incorrect'}`;
    feedback.innerHTML = correct
      ? `<strong>✓ Correct</strong><span>Next review: ${escapeHtml(formatRelativeDate(revision.nextReviewAt))}. Your review streak is now ${revision.streak}.</span>`
      : `<strong>✕ Needs another pass</strong><span>${question.type === 'mc' ? `Correct answer: ${escapeHtml(question.answer)}` : 'Revisit the lesson example and try this concept again tomorrow.'}</span>${compilerText ? `<pre>${escapeHtml(compilerText)}</pre>` : ''}`;

    $('revisionSubmitButton').textContent = session.position >= session.items.length - 1
      ? 'FINISH SESSION'
      : 'NEXT REVIEW';
  }

  function advance() {
    if (session.position < session.items.length - 1) {
      session.position += 1;
      renderQuestion();
      return;
    }

    finishSession();
  }

  function finishSession() {
    const total = session.items.length;
    const correct = session.correct;
    const score = Math.round((correct / total) * 100);
    const result = store.recordRevisionSession({ total, correct, score });
    session = null;
    renderHub(result);
    navigator.show('revisionScreen');
  }

  function abortSession() {
    session = null;
    renderHub();
    navigator.show('revisionScreen');
  }

  function buildWhy(item) {
    if (item.due && item.totalReviews > 0) return 'This module is due according to your spaced-review schedule.';
    if (item.due) return 'You have learned this module, but have not completed its first spaced review yet.';
    if (item.testScore > 0 && item.testScore < 80) return `Your best class-test score is ${item.testScore}%, so this topic has been prioritized.`;
    if (item.recentChallengeFailures > 0) return `Recent challenge attempts exposed ${item.recentChallengeFailures} difficulty signal(s) in this module.`;
    if (item.weak) return `Current mastery is ${item.mastery}%, below the Academy's 75% strong threshold.`;
    return 'This module is scheduled for reinforcement before the knowledge becomes stale.';
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Unknown';
    return date.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function formatNextDue(value, dueCount) {
    if (dueCount > 0) return 'NOW';
    if (!value) return '—';
    return formatRelativeDate(value);
  }

  function formatRelativeDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Not scheduled';

    const diff = date.getTime() - Date.now();
    if (diff <= 0) return 'Due now';

    const hours = Math.ceil(diff / 3600000);
    if (hours < 24) return `In ${hours} hour${hours === 1 ? '' : 's'}`;

    const days = Math.ceil(diff / 86400000);
    if (days === 1) return 'Tomorrow';
    if (days < 14) return `In ${days} days`;
    return formatDate(value);
  }

  return {
    open,
    close,
    setFilter,
    startSession,
    submit,
    abortSession,
    renderHub
  };
}
