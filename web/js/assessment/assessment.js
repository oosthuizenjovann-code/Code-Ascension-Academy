import { $ , shuffle } from '../core/utils.js';
import { runCSharp } from '../csharp/csharp-runner.js';

export function createAssessmentController({
  store,
  nav,
  navigator,
  learning,
  passMark
}) {
  let session = null;
  let submitting = false;

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
      selected: null,
      csharpCompileFailures: 0
    };

    submitting = false;
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
    setSubmitting(false);

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

    if (requiresCSharpCompile(question)) {
      const status = document.createElement('div');
      status.id = 'assessmentCompilerStatus';
      status.className = 'assessment-compiler-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      status.textContent = 'C# code responses are checked by the real local compiler when submitted.';
      area.appendChild(status);
    }
  }

  async function submitAnswer() {
    if (!session || submitting) return;

    const question = session.questions[session.position];
    if (session.selected === null || String(session.selected).trim() === '') {
      alert('Please answer the question first.');
      return;
    }

    let correct;

    if (question.type === 'mc') {
      correct = session.selected === question.answer;
    } else if (requiresCSharpCompile(question)) {
      setSubmitting(true, 'COMPILING...');
      setCompilerStatus('Compiling your C# answer with the real local compiler...', 'working');

      const compileResult = await runCSharp(String(session.selected));

      if (isRunnerInfrastructureFailure(compileResult)) {
        setCompilerStatus(
          compileResult?.message || 'The C# compiler could not be reached. Your answer has not been graded.',
          'error'
        );
        setSubmitting(false);
        return;
      }

      const compiled = Boolean(compileResult?.compiled);
      const matchesRequiredConcepts = Boolean(question.validator(session.selected));
      correct = compiled && matchesRequiredConcepts;

      if (!compiled) {
        session.csharpCompileFailures += 1;
      }
    } else {
      correct = Boolean(question.validator(session.selected));
    }

    if (correct) session.correct += 1;
    session.position += 1;

    if (session.position < session.questions.length) {
      renderQuestion();
      return;
    }

    setSubmitting(false);
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

    const compileNote = session.csharpCompileFailures > 0
      ? ` ${session.csharpCompileFailures} C# code response${session.csharpCompileFailures === 1 ? '' : 's'} did not compile and ${session.csharpCompileFailures === 1 ? 'was' : 'were'} counted as incorrect.`
      : '';

    $('resultMessage').textContent = passed
      ? `You reached the required ${passMark}% mark. Progress has been saved locally.${compileNote}`
      : `You need ${passMark}% to pass. Review the material and try again when ready.${compileNote}`;
    $('resultBreakdown').innerHTML = `
      <div><span>SCORE</span><strong>${score}%</strong></div>
      <div><span>CORRECT</span><strong>${session.correct}/${session.questions.length}</strong></div>
      <div><span>REQUIRED</span><strong>${passMark}%</strong></div>`;

    navigator.show('resultsScreen');
  }

  function requiresCSharpCompile(question) {
    return nav.language === 'csharp' && question?.type === 'code';
  }

  function isRunnerInfrastructureFailure(result) {
    if (!result) return true;
    const status = String(result.status || '');
    return [
      'unavailable',
      'bridge-timeout',
      'bridge-error',
      'host-error',
      'build-timeout',
      'build-output-limit',
      'assembly-missing'
    ].includes(status);
  }

  function setCompilerStatus(message, state = 'idle') {
    const status = $('assessmentCompilerStatus');
    if (!status) return;
    status.textContent = message;
    status.dataset.state = state;
  }

  function setSubmitting(value, label = 'SUBMIT ANSWER') {
    submitting = value;
    const button = document.querySelector('[data-action="submit-answer"]');
    if (!button) return;
    button.disabled = value;
    button.textContent = value ? label : 'SUBMIT ANSWER';
    button.setAttribute('aria-busy', value ? 'true' : 'false');
  }

  function abort() {
    if (submitting) return;
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
