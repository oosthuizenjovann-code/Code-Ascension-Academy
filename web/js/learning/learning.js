import { $, escapeHtml, stripTagsSummary } from '../core/utils.js';
import { runCSharp } from '../csharp/csharp-runner.js';

export function createLearningController({
  academyData,
  store,
  nav,
  navigator,
  passMark,
  hintSeconds
}) {
  let hintInterval = null;

  function currentLevel() {
    return academyData.languages[nav.language].levels[nav.difficulty];
  }

  function currentLesson() {
    return currentLevel().lessons[nav.lessonIndex];
  }

  function saveAndRefresh() {
    store.save();
    updateGlobalStats();
  }

  function renderLanguages() {
    const root = $('languageGrid');
    root.innerHTML = '';

    Object.entries(academyData.languages).forEach(([id, language]) => {
      const percent = store.languagePercent(id);
      root.insertAdjacentHTML('beforeend', `
        <article class="language-card glass-panel" data-language="${id}" style="--accent:${language.accent}">
          <div class="language-icon language-icon-${id}">
            <img src="${language.iconUrl}" alt="${language.name} language logo" loading="eager" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
            <span class="language-icon-fallback" hidden>${language.iconFallback}</span>
          </div>
          <h3>${language.name}</h3>
          <p>${language.description}</p>
          <div class="language-footer">
            <div class="mini-progress"><div style="width:${percent}%"></div></div>
            <strong>${percent}%</strong>
          </div>
        </article>`);
    });
  }

  function openLanguage(id) {
    nav.language = id;
    renderDifficulties();
    navigator.show('difficultyScreen');
  }

  function renderDifficulties() {
    const language = academyData.languages[nav.language];
    $('difficultyTitle').textContent = language.name;
    $('difficultyEyebrow').textContent = `${language.name.toUpperCase()} LEARNING PATH`;
    $('languageProgress').textContent = `${store.languagePercent(nav.language)}%`;
    $('difficultyGrid').innerHTML = '';

    academyData.difficulties.forEach(difficulty => {
      const progress = store.state.progress[nav.language][difficulty.id];
      const available = Boolean(language.levels[difficulty.id]);
      const locked = !progress.unlocked || !available;
      const percent = store.difficultyPercent(nav.language, difficulty.id);

      $('difficultyGrid').insertAdjacentHTML('beforeend', `
        <article class="difficulty-card glass-panel ${locked ? 'locked' : ''}"
          ${locked ? '' : `data-difficulty="${difficulty.id}"`}
          style="--rank:${difficulty.color}">
          <div class="rank-number">${difficulty.rank}</div>
          <h3>${difficulty.name}</h3>
          <p>${difficulty.description}</p>
          <div class="lock-label">${!available ? 'CURRICULUM EXPANSION PENDING' : locked ? 'LOCKED' : `${percent}% COMPLETE`}</div>
        </article>`);
    });
  }

  function openDifficulty(id) {
    nav.difficulty = id;
    renderRoadmap();
    navigator.show('roadmapScreen');
  }

  function renderRoadmap() {
    const level = currentLevel();
    const difficulty = academyData.difficulties.find(item => item.id === nav.difficulty);
    const progress = store.state.progress[nav.language][nav.difficulty];

    $('roadmapLanguage').textContent = level.language.toUpperCase();
    $('roadmapDifficulty').textContent = `${difficulty.name} Roadmap`;
    $('rankName').textContent = difficulty.name;
    $('rankDescription').textContent = difficulty.description;
    $('rankEmblem').textContent = difficulty.rank;
    $('rankEmblem').parentElement.style.setProperty('--rank-color', difficulty.color);
    $('difficultyProgress').textContent = `${store.difficultyPercent(nav.language, nav.difficulty)}%`;
    $('difficultyMastery').textContent = `${store.masteryReport(nav.language, nav.difficulty).percent}%`;
    $('lessonsDone').textContent = `${Object.values(progress.lessons).filter(Boolean).length}/5`;
    $('testsDone').textContent = `${Object.values(progress.tests).filter(score => score >= passMark).length}/5`;
    $('capstoneDone').textContent = progress.capstone?.passed ? `${progress.capstone.bestScore}% PASS` : `${Number(progress.capstone?.bestScore || 0)}%`;
    $('examsDone').textContent = `${Object.values(progress.exams).filter(score => score >= passMark).length}/3`;

    const root = $('roadmapNodes');
    root.innerHTML = '';

    level.lessons.forEach((lesson, index) => {
      const lessonDone = Boolean(progress.lessons[index]);
      const testPassed = (progress.tests[index] || 0) >= passMark;
      const unlocked = index === 0 || (progress.tests[index - 1] || 0) >= passMark;

      renderNode(root, {
        number: index + 1,
        title: `Level ${index + 1}: ${lesson.title}`,
        description: unlocked
          ? testPassed
            ? 'Completed — replay lesson or retake the test.'
            : lessonDone
              ? 'Lesson complete — class test unlocked.'
              : 'Study the lesson, practice, then take the class test.'
          : 'Pass the previous class test to unlock.',
        color: difficulty.color,
        locked: !unlocked,
        completed: testPassed,
        buttons: unlocked
          ? `<button class="glow-button small ghost" data-node="lesson" data-node-index="${index}">${lessonDone ? 'REVIEW LESSON' : 'OPEN LESSON'}</button>${lessonDone ? `<button class="glow-button small primary" data-node="test" data-node-index="${index}">${testPassed ? 'RETAKE TEST' : 'CLASS TEST'}</button>` : ''}`
          : ''
      });
    });

    const allTestsPassed = level.lessons.every(
      (_, index) => (progress.tests[index] || 0) >= passMark
    );

    const capstonePassed = Boolean(progress.capstone?.passed) || Number(progress.capstone?.bestScore || 0) >= passMark;
    renderNode(root, {
      number: '◆',
      title: `${level.language} ${difficulty.name} Capstone Project`,
      description: allTestsPassed
        ? capstonePassed
          ? `Passed with ${Number(progress.capstone?.bestScore || 0)}% — reopen the project whenever you want to improve it.`
          : `Build one complete project combining all five modules. Pass mark: ${passMark}%.`
        : 'Pass all five class tests to unlock the capstone project.',
      color: difficulty.color,
      locked: !allTestsPassed,
      completed: capstonePassed,
      buttons: allTestsPassed
        ? `<button class="glow-button small ${capstonePassed ? 'ghost' : 'primary'}" data-action="open-capstone">${capstonePassed ? 'REVIEW CAPSTONE' : 'START CAPSTONE'}</button>`
        : ''
    });

    level.exams.forEach((exam, index) => {
      const passed = (progress.exams[index] || 0) >= passMark;
      const unlocked = allTestsPassed && capstonePassed &&
        (index === 0 || (progress.exams[index - 1] || 0) >= passMark);

      renderNode(root, {
        number: `E${index + 1}`,
        title: exam.title,
        description: unlocked
          ? passed
            ? 'Passed — retake at any time.'
            : `Mixed questions from all five class modules. Pass mark: ${passMark}%.`
          : capstonePassed
            ? 'Complete the required previous exam first.'
            : allTestsPassed
              ? 'Pass the capstone project before starting the final exams.'
              : 'Complete all five class tests first.',
        color: difficulty.color,
        locked: !unlocked,
        completed: passed,
        buttons: unlocked
          ? `<button class="glow-button small primary" data-node="exam" data-node-index="${index}">${passed ? 'RETAKE EXAM' : 'START EXAM'}</button>`
          : ''
      });
    });
  }

  function renderNode(root, node) {
    root.insertAdjacentHTML('beforeend', `
      <div class="road-node ${node.locked ? 'locked' : ''} ${node.completed ? 'completed' : ''}" style="--node-color:${node.color}">
        <div class="node-orb">${node.locked ? '🔒' : node.number}</div>
        <div class="node-info">
          <h3>${node.title}</h3>
          <p>${node.description}</p>
          <div class="node-actions">${node.buttons}</div>
        </div>
      </div>`);
  }

  function openLesson(index) {
    nav.lessonIndex = index;
    const lesson = currentLesson();
    const language = academyData.languages[nav.language];

    $('lessonContext').textContent = `${language.name.toUpperCase()} // ${nav.difficulty.toUpperCase()} // LEVEL ${index + 1}`;
    $('lessonTitle').textContent = lesson.title;
    $('editorFilename').textContent = language.filename;
    $('lessonEditor').value = lesson.starter;

    const body = $('lessonBody');
    body.innerHTML = `<div class="lesson-kicker">LEARNING MATERIAL</div><p class="lesson-intro">${lesson.intro}</p>`;

    lesson.sections.forEach((section, sectionIndex) => {
      body.insertAdjacentHTML('beforeend', `
        <section class="lesson-section">
          <div class="section-number">${sectionIndex + 1}</div>
          <div>
            <h3>${section.title}</h3>
            <div class="section-content">
              ${section.html.startsWith('<ul>') ? section.html : `<p>${section.html}</p>`}
              ${section.code ? `<pre>${escapeHtml(section.code)}</pre>` : ''}
            </div>
          </div>
        </section>`);
    });

    if (lesson.references?.length) {
      body.insertAdjacentHTML('beforeend', `
        <section class="reference-panel">
          <div class="lesson-kicker">OFFICIAL REFERENCES</div>
          <h3>Continue with the authoritative documentation</h3>
          <p>These lessons are original Academy explanations. Use the official documentation below when you want deeper detail or a complete language reference.</p>
          <div class="reference-links">
            ${lesson.references.map(reference => `<a href="${reference.url}" target="_blank" rel="noopener noreferrer">${reference.title}<span>↗</span></a>`).join('')}
          </div>
        </section>`);
    }

    $('lessonOutput').textContent = 'Ready. Edit the example and press RUN.';
    navigator.show('lessonScreen');
  }

  function completeLesson() {
    const progress = store.state.progress[nav.language][nav.difficulty];
    if (!progress.lessons[nav.lessonIndex]) {
      progress.lessons[nav.lessonIndex] = true;
      store.seedRevision(nav.language, nav.difficulty, nav.lessonIndex, 1, false);
      store.state.xp += 50;
      saveAndRefresh();
    }
    renderRoadmap();
    navigator.show('roadmapScreen');
  }

  function startPractice() {
    const practice = currentLesson().practice;
    $('practiceTitle').textContent = currentLesson().title;
    $('practicePrompt').textContent = practice.prompt;
    $('practiceDetails').textContent = `${practice.details ? `${practice.details} ` : ''}Try to solve this yourself. A hint becomes available after five minutes.`;
    $('practiceFilename').textContent = academyData.languages[nav.language].filename;
    $('practiceEditor').value = '';
    $('practiceOutput').textContent = 'Write your solution, then check your answer.';
    $('hintBox').classList.add('hidden');
    $('hintButton').disabled = true;
    $('hintButton').textContent = 'HINT LOCKED';
    startHintTimer();
    navigator.show('practiceScreen');
  }

  function startHintTimer() {
    clearInterval(hintInterval);
    let remaining = hintSeconds;

    const paint = () => {
      $('hintTimer').textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
    };

    paint();
    hintInterval = setInterval(() => {
      remaining -= 1;
      paint();
      if (remaining <= 0) {
        clearInterval(hintInterval);
        $('hintButton').disabled = false;
        $('hintButton').textContent = 'SHOW HINT';
      }
    }, 1000);
  }

  function showHint() {
    const box = $('hintBox');
    box.textContent = currentLesson().practice.hint;
    box.classList.remove('hidden');
    store.state.hintsUsed += 1;
    saveAndRefresh();
  }

  async function checkPractice() {
    const practice = currentLesson().practice;
    const code = $('practiceEditor').value;
    let correct = false;

    try {
      correct = practice.validator(code);
    } catch {
      correct = false;
    }

    if (correct && nav.language === 'csharp') {
      const compileResult = await runCSharp(code, $('practiceOutput'));
      correct = Boolean(compileResult?.success);

      if (!correct) {
        $('practiceOutput').textContent += '\n\nThe structural requirements were present, but the C# submission must compile before the practice challenge can be cleared.';
      }
    } else {
      $('practiceOutput').textContent = correct
        ? '✓ Correct. You met the challenge requirements.'
        : '✕ Not quite. Re-read the requirement and compare your structure with the lesson. You can keep trying.';
    }

    if (correct) {
      store.state.xp += 10;
      store.recordPractice(nav.language, nav.difficulty, nav.lessonIndex, true);
    }
    saveAndRefresh();
  }

  async function runEditor(code, output) {
    const language = nav.language;

    if (language === 'html') {
      output.textContent = `HTML preview opened below:\n\n${stripTagsSummary(code)}`;
      const popup = window.open('', '_blank', 'width=760,height=600');
      if (popup) {
        popup.document.open();
        popup.document.write(code);
        popup.document.close();
      }
      return;
    }

    if (language === 'css') {
      output.textContent = 'CSS preview opened in a separate window. The preview contains common academy components so you can experiment with selectors, layout, typography and responsive rules.';
      const popup = window.open('', '_blank', 'width=900,height=700');
      if (popup) {
        const safeCss = String(code).replace(/<\/style/gi, '<\\/style');
        popup.document.open();
        popup.document.write(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CSS Academy Preview</title><style>body{font-family:system-ui,sans-serif;background:#0b1220;color:#eaf2ff;padding:24px}.preview-shell{max-width:900px;margin:auto}.course-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.course-card{background:#121d2d;border:1px solid #2b405d;border-radius:14px;padding:18px}.toolbar{display:flex;gap:10px;align-items:center;justify-content:space-between;margin-bottom:20px}.button{border:1px solid #4fdcff;background:#12263b;color:#eaf2ff;border-radius:9px;padding:10px 14px}input{padding:10px;border-radius:8px;border:1px solid #41516a;background:#0a101a;color:white}${safeCss}</style></head><body><div class="preview-shell"><div class="toolbar"><h1>Code Ascension Preview</h1><button class="button">Action</button></div><p>Resize this window to test responsive rules.</p><div class="course-grid"><article class="course-card featured"><h2>HTML</h2><p>Structure and semantics.</p><button class="button">Open</button></article><article class="course-card"><h2>CSS</h2><p>Layout and visual systems.</p><input placeholder="Try form selectors"></article><article class="course-card"><h2>JavaScript</h2><p>Logic and interactivity.</p></article></div></div></body></html>`);
        popup.document.close();
      }
      return;
    }

    if (language === 'javascript') {
      const logs = [];
      try {
        const fakeConsole = { log: (...args) => logs.push(args.join(' ')) };
        new Function('console', code)(fakeConsole);
        output.textContent = logs.length ? logs.join('\n') : 'Program completed with no console output.';
      } catch (error) {
        output.textContent = `ERROR: ${error.message}`;
      }
      return;
    }

    if (language === 'csharp') {
      await runCSharp(code, output);
    }
  }

  async function runLessonEditor() {
    await runEditor($('lessonEditor').value, $('lessonOutput'));
  }

  function resetLessonEditor() {
    $('lessonEditor').value = currentLesson().starter;
    runLessonEditor();
  }

  async function runPracticeEditor() {
    await runEditor($('practiceEditor').value, $('practiceOutput'));
  }

  function updateGlobalStats() {
    if (!$('overallProgressText')) return;
    const percent = store.overallPercent();
    $('overallProgressText').textContent = `${percent}%`;
    $('overallProgressBar').style.width = `${percent}%`;
    $('xpValue').textContent = store.state.xp;
    renderLanguages();
  }

  return {
    currentLevel,
    currentLesson,
    renderLanguages,
    openLanguage,
    renderDifficulties,
    openDifficulty,
    renderRoadmap,
    openLesson,
    completeLesson,
    startPractice,
    showHint,
    checkPractice,
    runLessonEditor,
    resetLessonEditor,
    runPracticeEditor,
    updateGlobalStats
  };
}
