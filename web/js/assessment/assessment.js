import { $, shuffle } from '../core/utils.js';

export function createAssessmentController({
  store,
  nav,
  navigator,
  learning,
  passMark
}) {
  let session = null;

  function startAssessment(kind, index) {
    const level = learning.currentLevel();
    const source = kind === 'test'
      ? level.lessons[index].test
      : level.exams[index];

    session = {
      kind,
      index,
      questions: shuffle(source.questions.map(question => ({
        ...question,
        options: question.options ? [...question.options] : undefined
      }))),
      position: 0,
      correct: 0,
      selected: null
    };

    nav.assessment = { kind, index };
    $('testEyebrow').textContent = kind === 'test' ? 'CLASS TEST' : 'FINAL EXAM';
    $('testTitle').textContent = source.title;
    renderQuestion();
    navigator.show('testScreen');
  }

  function renderQuestion() {
    const question = session.questions[session.position];
    $('questionCounter').textContent = `${session.position + 1}/${session.questions.length}`;
    $('testProgressFill').style.width = `${((session.position + 1) / session.questions.length) * 100}%`;
    $('testQuestionType').textContent = question.type === 'mc'
      ? 'MULTIPLE CHOICE'
      : 'CODE RESPONSE';
    $('testQuestion').textContent = question.prompt;

    const area = $('answerArea');
    area.innerHTML = '';
    session.selected = null;

    if (question.type === 'mc') {
      shuffle(question.options).forEach(option => {
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
    input.className = 'answer-input';
    input.placeholder = 'Write your code here...';
    input.oninput = () => {
      session.selected = input.value;
    };
    area.appendChild(input);
  }

  function submitAnswer() {
    if (!session) return;

    const question = session.questions[session.position];
    if (session.selected === null || String(session.selected).trim() === '') {
      alert('Please answer the question first.');
      return;
    }

    const correct = question.type === 'mc'
      ? session.selected === question.answer
      : Boolean(question.validator(session.selected));

    if (correct) session.correct += 1;
    session.position += 1;

    if (session.position < session.questions.length) {
      renderQuestion();
      return;
    }

    finishAssessment();
  }

  function finishAssessment() {
    const score = Math.round((session.correct / session.questions.length) * 100);
    const passed = score >= passMark;
    store.recordAssessment(nav.language, nav.difficulty, session.kind, session.index, score);

    if (passed) {
      store.state.xp += session.kind === 'test' ? 100 : 250;
    }

    store.unlockNextDifficulty(nav.language, nav.difficulty);
    store.save();
    learning.updateGlobalStats();

    $('resultBadge').textContent = `${score}%`;
    $('resultBadge').style.borderColor = passed ? '#49ef9c' : '#ff4c5f';
    $('resultBadge').style.color = passed ? '#49ef9c' : '#ff4c5f';
    $('resultEyebrow').textContent = session.kind === 'test'
      ? 'CLASS TEST COMPLETE'
      : 'FINAL EXAM COMPLETE';
    $('resultTitle').textContent = passed ? 'PASS' : 'NOT PASSED';
    $('resultMessage').textContent = passed
      ? `You reached the required ${passMark}% mark. Progress has been saved locally.`
      : `You need ${passMark}% to pass. Review the material and try again when ready.`;
    $('resultBreakdown').innerHTML = `
      <div><span>SCORE</span><strong>${score}%</strong></div>
      <div><span>CORRECT</span><strong>${session.correct}/${session.questions.length}</strong></div>
      <div><span>REQUIRED</span><strong>${passMark}%</strong></div>`;

    navigator.show('resultsScreen');
  }

  function abort() {
    session = null;
    learning.renderRoadmap();
    navigator.show('roadmapScreen');
  }

  return {
    startAssessment,
    submitAnswer,
    abort
  };
}
