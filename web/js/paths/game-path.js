import { $, escapeHtml } from '../core/utils.js';
import { runCSharp } from '../csharp/csharp-runner.js';
import { GAME_PATH } from './game-path-data.js';

export function createGameDevelopmentPathController({ store, navigator, learning, passMark }) {
  let current = null;

  function openRoadmap() {
    renderRoadmap();
    navigator.show('gamePathScreen');
  }

  function renderRoadmap() {
    const status = store.gamePathStatus(GAME_PATH.missions.length);
    $('gamePathRoadmapProgress').textContent = `${status.percent}%`;
    $('gamePathRoadmapStatus').textContent = status.unlocked
      ? 'Scored progression unlocked. Complete each mission in order.'
      : 'Preview mode: complete C# Intern and reach C# Junior to unlock scored progression.';
    $('gamePathRoadmapStatus').classList.toggle('preview', !status.unlocked);

    const root = $('gamePathNodes');
    root.innerHTML = '';

    GAME_PATH.missions.forEach((mission, index) => {
      const work = store.gameMissionData(index);
      const previousPassed = index === 0 || store.gameMissionData(index - 1).passed;
      const available = status.unlocked && previousPassed;
      const preview = !status.unlocked;
      const locked = !preview && !available;
      root.insertAdjacentHTML('beforeend', nodeMarkup({
        number: index + 1,
        title: mission.title,
        summary: mission.summary,
        score: work.bestScore,
        passed: work.passed,
        preview,
        locked,
        kind: 'mission',
        index
      }));
    });

    const capstone = store.gameCapstoneData();
    const capstoneReady = status.unlocked && status.passedMissions >= GAME_PATH.missions.length;
    root.insertAdjacentHTML('beforeend', nodeMarkup({
      number: '◆',
      title: GAME_PATH.capstone.title,
      summary: GAME_PATH.capstone.summary,
      score: capstone.bestScore,
      passed: capstone.passed,
      preview: !status.unlocked,
      locked: status.unlocked && !capstoneReady,
      kind: 'capstone',
      index: 0,
      capstone: true
    }));
  }

  function nodeMarkup({ number, title, summary, score, passed, preview, locked, kind, index, capstone = false }) {
    const state = passed ? 'PASSED' : preview ? 'PREVIEW' : locked ? 'LOCKED' : 'READY';
    const button = locked
      ? '<button class="glow-button small ghost" disabled>LOCKED</button>'
      : `<button class="glow-button small ${passed ? 'ghost' : 'primary'}" data-game-path-node="${kind}" data-game-path-index="${index}">${passed ? 'REOPEN' : preview ? 'PREVIEW' : capstone ? 'OPEN CAPSTONE' : 'OPEN MISSION'}</button>`;

    return `<article class="web-path-node game-path-node glass-panel ${passed ? 'passed' : ''} ${locked ? 'locked' : ''} ${capstone ? 'capstone' : ''}">
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
    const status = store.gamePathStatus(GAME_PATH.missions.length);
    const capstone = kind === 'capstone';
    const definition = capstone ? GAME_PATH.capstone : GAME_PATH.missions[index];
    if (!definition) return;

    const previousPassed = capstone
      ? status.passedMissions >= GAME_PATH.missions.length
      : index === 0 || store.gameMissionData(index - 1).passed;
    const scored = status.unlocked && previousPassed;
    const saved = capstone ? store.gameCapstoneData() : store.gameMissionData(index);

    current = { kind, index, definition, scored };
    $('gameWorkEyebrow').textContent = capstone
      ? 'GAME DEVELOPMENT • CAPSTONE'
      : `GAME DEVELOPMENT • MISSION ${index + 1}`;
    $('gameWorkTitle').textContent = definition.title;
    $('gameWorkMode').textContent = scored ? 'SCORED' : 'PREVIEW';
    $('gameWorkMode').classList.toggle('preview', !scored);
    $('gameWorkSummary').textContent = definition.summary;
    $('gameWorkUnityTranslation').textContent = definition.unityTranslation;
    $('gameWorkConcepts').innerHTML = definition.concepts.map(item => `<span>${escapeHtml(item)}</span>`).join('');
    $('gameWorkReferences').innerHTML = definition.references.map(reference =>
      `<a href="${reference.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(reference.title)}<span>↗</span></a>`
    ).join('');
    $('gameRequirementList').innerHTML = definition.requirements.map(item =>
      `<div class="path-requirement"><span>${item.points} pts</span><strong>${escapeHtml(item.label)}</strong></div>`
    ).join('');
    $('gameCodeEditor').value = saved.code || definition.starter;
    $('gameSubmitButton').disabled = !scored;
    $('gameSubmitButton').textContent = scored
      ? (capstone ? 'SUBMIT CAPSTONE' : 'SUBMIT MISSION')
      : 'PREVIEW MODE — SUBMISSION LOCKED';
    $('gameOutput').textContent = 'Ready. Run the C# simulation, then submit when the requirements are satisfied.';
    $('gameRubricResults').innerHTML = '';
    navigator.show('gamePathWorkScreen');
  }

  async function run() {
    if (!current) return null;
    return runCSharp($('gameCodeEditor').value, $('gameOutput'));
  }

  function saveDraft(show = true) {
    if (!current) return;
    const code = $('gameCodeEditor').value;
    if (current.kind === 'capstone') store.saveGameCapstoneDraft(code);
    else store.saveGameMissionDraft(current.index, code);
    if (show) $('gameOutput').textContent = 'Draft saved locally.';
  }

  function reset() {
    if (!current || !confirm('Reset this workspace to the starter C#?')) return;
    $('gameCodeEditor').value = current.definition.starter;
    saveDraft(false);
    $('gameRubricResults').innerHTML = '';
    $('gameOutput').textContent = 'Starter code restored.';
  }

  async function submit() {
    if (!current || !current.scored) return;
    const code = $('gameCodeEditor').value;
    const compile = await runCSharp(code, $('gameOutput'));
    if (!compile?.compiled) {
      $('gameOutput').textContent += '\n\nSubmission blocked: the C# code must compile successfully.';
      return;
    }

    const rubric = current.definition.requirements.map(requirement => {
      let passed = false;
      try { passed = Boolean(requirement.check(code)); } catch { passed = false; }
      return { label: requirement.label, earned: passed ? requirement.points : 0, possible: requirement.points, passed };
    });
    const score = rubric.reduce((sum, item) => sum + item.earned, 0);
    const result = { score, rubric, code };
    const saved = current.kind === 'capstone'
      ? store.recordGameCapstoneAttempt(result)
      : store.recordGameMissionAttempt(current.index, result);

    $('gameRubricResults').innerHTML = rubric.map(item => `<div class="path-rubric-result ${item.passed ? 'passed' : 'failed'}">
      <span>${item.passed ? '✓' : '×'}</span><strong>${escapeHtml(item.label)}</strong><em>${item.earned}/${item.possible}</em>
    </div>`).join('');
    $('gameOutput').textContent += saved.passed
      ? `\n\n✓ PASS — ${score}%. Best score: ${saved.bestScore}%.`
      : `\n\nNot passed yet — ${score}%. You need ${passMark}%.`;
    learning?.updateGlobalStats?.();
  }

  function back() {
    if (current) saveDraft(false);
    current = null;
    renderRoadmap();
    navigator.show('gamePathScreen');
  }

  return { openRoadmap, renderRoadmap, openNode, run, saveDraft, reset, submit, back };
}
