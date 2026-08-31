import { $, escapeHtml } from '../core/utils.js';
import { WEB_PATH } from './web-path-data.js';

export function createLearningPathsController({ store, navigator, learning, passMark }) {
  let current = null;
  let activeEditor = 'html';

  function open() {
    renderCenter();
    navigator.show('pathsScreen');
  }

  function close() {
    learning?.updateGlobalStats?.();
    navigator.show('academyScreen');
  }

  function renderCenter() {
    const status = store.webPathStatus(WEB_PATH.missions.length);
    $('webPathProgressText').textContent = `${status.percent}%`;
    $('webPathGateText').textContent = status.unlocked ? 'UNLOCKED' : 'PREVIEW AVAILABLE';
    $('webPathGateText').classList.toggle('unlocked', status.unlocked);

    const requirements = [
      ['HTML', store.rankComplete('html', 'intern')],
      ['CSS', store.rankComplete('css', 'intern')],
      ['JavaScript', store.rankComplete('javascript', 'intern')]
    ];

    $('webPathRequirements').innerHTML = requirements.map(([name, done]) => `
      <div class="path-gate-item ${done ? 'done' : ''}">
        <span>${done ? '✓' : '○'}</span>
        <strong>${name} Junior</strong>
      </div>`).join('');

    $('webPathMissionSummary').textContent = `${status.passedMissions}/${status.missionCount} missions`;
    $('webPathCapstoneSummary').textContent = status.capstonePassed ? 'Capstone passed' : 'Capstone pending';

    const game = store.gamePathStatus(6);
    $('gamePathProgressText').textContent = `${game.percent}%`;
    $('gamePathGateText').textContent = game.unlocked ? 'UNLOCKED' : 'PREVIEW AVAILABLE';
    $('gamePathGateText').classList.toggle('unlocked', game.unlocked);
    $('gamePathRequirement').innerHTML = `<div class="path-gate-item ${game.unlocked ? 'done' : ''}"><span>${game.unlocked ? '✓' : '○'}</span><strong>C# Junior</strong></div>`;
    $('gamePathMissionSummary').textContent = `${game.passedMissions}/${game.missionCount} missions`;
    $('gamePathCapstoneSummary').textContent = game.capstonePassed ? 'Capstone passed' : 'Capstone pending';
  }

  function openWebPath() {
    renderRoadmap();
    navigator.show('webPathScreen');
  }

  function backToCenter() {
    renderCenter();
    navigator.show('pathsScreen');
  }

  function renderRoadmap() {
    const status = store.webPathStatus(WEB_PATH.missions.length);
    $('webPathRoadmapProgress').textContent = `${status.percent}%`;
    $('webPathRoadmapStatus').textContent = status.unlocked
      ? 'The path is unlocked. Mission scores now count toward completion.'
      : 'Preview mode: complete HTML, CSS and JavaScript Intern to unlock scored progression.';
    $('webPathRoadmapStatus').classList.toggle('preview', !status.unlocked);

    const root = $('webPathNodes');
    root.innerHTML = '';

    WEB_PATH.missions.forEach((mission, index) => {
      const work = store.webMissionData(index);
      const previousPassed = index === 0 || store.webMissionData(index - 1).passed;
      const available = status.unlocked && previousPassed;
      const preview = !status.unlocked;
      const locked = !preview && !available;
      root.insertAdjacentHTML('beforeend', roadmapNode({
        number: index + 1,
        title: mission.title,
        summary: mission.summary,
        passed: work.passed,
        score: work.bestScore,
        locked,
        preview,
        kind: 'mission',
        index
      }));
    });

    const capstone = store.webCapstoneData();
    const capstoneAvailable = status.unlocked && status.passedMissions >= WEB_PATH.missions.length;
    root.insertAdjacentHTML('beforeend', roadmapNode({
      number: '◆',
      title: WEB_PATH.capstone.title,
      summary: WEB_PATH.capstone.summary,
      passed: capstone.passed,
      score: capstone.bestScore,
      locked: status.unlocked && !capstoneAvailable,
      preview: !status.unlocked,
      kind: 'capstone',
      index: 0,
      capstone: true
    }));
  }

  function roadmapNode({ number, title, summary, passed, score, locked, preview, kind, index, capstone = false }) {
    const state = passed ? 'PASSED' : preview ? 'PREVIEW' : locked ? 'LOCKED' : 'READY';
    const button = locked
      ? '<button class="glow-button small ghost" disabled>LOCKED</button>'
      : `<button class="glow-button small ${passed ? 'ghost' : 'primary'}" data-path-node="${kind}" data-path-index="${index}">${passed ? 'REOPEN' : preview ? 'PREVIEW' : capstone ? 'OPEN CAPSTONE' : 'OPEN MISSION'}</button>`;

    return `
      <article class="web-path-node glass-panel ${passed ? 'passed' : ''} ${locked ? 'locked' : ''} ${capstone ? 'capstone' : ''}">
        <div class="web-path-orb">${number}</div>
        <div class="web-path-node-body">
          <div class="web-path-node-top"><span>${state}</span><strong>${Number(score || 0)}%</strong></div>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(summary)}</p>
          <div class="web-path-node-actions">${button}</div>
        </div>
      </article>`;
  }

  function openNode(kind, index) {
    const status = store.webPathStatus(WEB_PATH.missions.length);
    const isCapstone = kind === 'capstone';
    const definition = isCapstone ? WEB_PATH.capstone : WEB_PATH.missions[index];
    if (!definition) return;

    const previousPassed = isCapstone
      ? status.passedMissions >= WEB_PATH.missions.length
      : index === 0 || store.webMissionData(index - 1).passed;
    const scored = status.unlocked && previousPassed;

    current = { kind, index, definition, scored };
    activeEditor = 'html';
    const saved = isCapstone ? store.webCapstoneData() : store.webMissionData(index);

    $('pathWorkEyebrow').textContent = isCapstone
      ? 'WEB DEVELOPMENT • CAPSTONE'
      : `WEB DEVELOPMENT • MISSION ${index + 1}`;
    $('pathWorkTitle').textContent = definition.title;
    $('pathWorkMode').textContent = scored ? 'SCORED' : 'PREVIEW';
    $('pathWorkMode').classList.toggle('preview', !scored);
    $('pathWorkSummary').textContent = definition.summary;
    $('pathRequirementList').innerHTML = definition.requirements.map(item => `
      <div class="path-requirement"><span>${item.points} pts</span><strong>${escapeHtml(item.label)}</strong></div>`).join('');

    $('pathHtmlEditor').value = saved.html || definition.starter.html;
    $('pathCssEditor').value = saved.css || definition.starter.css;
    $('pathJsEditor').value = saved.javascript || definition.starter.js;
    $('pathSubmitButton').disabled = !scored;
    $('pathSubmitButton').textContent = scored
      ? (isCapstone ? 'SUBMIT CAPSTONE' : 'SUBMIT MISSION')
      : 'PREVIEW MODE — SUBMISSION LOCKED';
    $('pathFeedback').textContent = scored
      ? `Build the project, run the preview, then submit when you are ready. Pass mark: ${passMark}%.`
      : 'Preview mode is available now. Complete HTML, CSS and JavaScript Intern to unlock scored submissions.';
    $('pathRubricResults').innerHTML = '';
    selectEditor('html');
    runPreview();
    navigator.show('pathWorkScreen');
  }

  function selectEditor(tab) {
    activeEditor = ['html', 'css', 'javascript'].includes(tab) ? tab : 'html';
    document.querySelectorAll('[data-path-editor-tab]').forEach(button => {
      button.classList.toggle('active', button.dataset.pathEditorTab === activeEditor);
    });
    document.querySelectorAll('.path-code-editor').forEach(editor => editor.classList.remove('active'));
    const editorId = activeEditor === 'javascript' ? 'pathJsEditor' : activeEditor === 'css' ? 'pathCssEditor' : 'pathHtmlEditor';
    $(editorId).classList.add('active');
    $('pathEditorFilename').textContent = activeEditor === 'html' ? 'index.html' : activeEditor === 'css' ? 'styles.css' : 'app.js';
  }

  function files() {
    return {
      html: $('pathHtmlEditor').value,
      css: $('pathCssEditor').value,
      javascript: $('pathJsEditor').value
    };
  }

  function runPreview() {
    if (!current) return;
    const code = files();
    const safeJs = code.javascript.replace(/<\/script/gi, '<\\/script');
    $('pathPreview').srcdoc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${code.css}</style></head><body>${code.html}<script>${safeJs}<\/script></body></html>`;
    $('pathFeedback').textContent = 'Preview refreshed. Interact with it to test your HTML, CSS and JavaScript together.';
  }

  function saveDraft(showMessage = true) {
    if (!current) return;
    const code = files();
    if (current.kind === 'capstone') store.saveWebCapstoneDraft(code);
    else store.saveWebMissionDraft(current.index, code);
    if (showMessage) $('pathFeedback').textContent = 'Draft saved locally.';
  }

  function reset() {
    if (!current || !confirm('Reset this workspace to the starter files? Your saved draft will be replaced.')) return;
    $('pathHtmlEditor').value = current.definition.starter.html;
    $('pathCssEditor').value = current.definition.starter.css;
    $('pathJsEditor').value = current.definition.starter.js;
    saveDraft(false);
    runPreview();
    $('pathRubricResults').innerHTML = '';
  }

  function submit() {
    if (!current || !current.scored) return;
    const code = files();
    const rubric = current.definition.requirements.map(requirement => {
      let passed = false;
      try { passed = Boolean(requirement.check({ ...code, js: code.javascript })); } catch { passed = false; }
      return {
        label: requirement.label,
        earned: passed ? requirement.points : 0,
        possible: requirement.points,
        passed
      };
    });
    const score = rubric.reduce((sum, item) => sum + item.earned, 0);

    const result = { score, rubric, ...code };
    const saved = current.kind === 'capstone'
      ? store.recordWebCapstoneAttempt(result)
      : store.recordWebMissionAttempt(current.index, result);

    $('pathRubricResults').innerHTML = rubric.map(item => `
      <div class="path-rubric-result ${item.passed ? 'passed' : 'failed'}">
        <span>${item.passed ? '✓' : '×'}</span>
        <strong>${escapeHtml(item.label)}</strong>
        <em>${item.earned}/${item.possible}</em>
      </div>`).join('');
    learning?.updateGlobalStats?.();
    $('pathFeedback').textContent = saved.passed
      ? `✓ PASS — ${score}%. Best score: ${saved.bestScore}%.`
      : `Not passed yet — ${score}%. You need ${passMark}%. Review the failed rubric items and improve the project.`;
  }

  function backToRoadmap() {
    if (current) saveDraft(false);
    current = null;
    renderRoadmap();
    navigator.show('webPathScreen');
  }

  return {
    open,
    close,
    openWebPath,
    backToCenter,
    renderRoadmap,
    openNode,
    selectEditor,
    runPreview,
    saveDraft,
    reset,
    submit,
    backToRoadmap
  };
}
