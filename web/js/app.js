import { $, escapeHtml } from './core/utils.js';
import { createScreenNavigator } from './core/navigation.js';
import { createAcademyStateStore } from './core/state.js';
import { createLearningController } from './learning/learning.js';
import { createAssessmentController } from './assessment/assessment.js';
import { createProfileController } from './profile/profile.js';
import { createMasteryController } from './mastery/mastery.js';
import { createPracticeLabController } from './practice-lab/practice-lab.js';
import { createChallengeController } from './challenges/challenges.js';
import { createProjectsController } from './projects/projects.js';
import { createRevisionController } from './revision/revision.js';
import { createStudyLibraryController } from './study/study-library.js';
import { createAchievementController } from './achievements/achievements.js';
import { createLearningPathsController } from './paths/paths.js';
import { createGameDevelopmentPathController } from './paths/game-path.js';
import { createBossArenaController } from './boss/boss-arena.js';
import { createGlobalSearchController } from './search/search.js';
import { createDataSafetyController } from './core/data-safety.js';

const PASS_MARK = 80;
const HINT_SECONDS = 300;

initialize();

async function initialize() {
  try {
    const academyData = await window.AcademyCurriculum.load();
    const navigator = createScreenNavigator();
    const store = createAcademyStateStore(academyData, PASS_MARK);
    const nav = {
      language: null,
      difficulty: null,
      lessonIndex: null,
      assessment: null,
      returnScreen: 'academyScreen'
    };

    await store.load();

    const learning = createLearningController({
      academyData,
      store,
      nav,
      navigator,
      passMark: PASS_MARK,
      hintSeconds: HINT_SECONDS
    });

    const assessment = createAssessmentController({
      store,
      nav,
      navigator,
      learning,
      passMark: PASS_MARK
    });

    const profile = createProfileController({
      academyData,
      store,
      nav,
      navigator,
      learning,
      passMark: PASS_MARK
    });

    const mastery = createMasteryController({
      academyData,
      store,
      nav,
      navigator,
      passMark: PASS_MARK
    });

    const practiceLab = createPracticeLabController({
      academyData,
      store,
      nav,
      navigator
    });

    const challenges = createChallengeController({
      academyData,
      store,
      nav,
      navigator,
      learning,
      passMark: PASS_MARK
    });

    const projects = createProjectsController({
      academyData,
      store,
      nav,
      navigator,
      learning,
      passMark: PASS_MARK
    });

    const revision = createRevisionController({
      academyData,
      store,
      nav,
      navigator
    });

    const study = createStudyLibraryController({
      academyData,
      store,
      nav,
      navigator,
      learning
    });

    const achievements = createAchievementController({
      academyData,
      store,
      navigator,
      passMark: PASS_MARK
    });

    const learningPaths = createLearningPathsController({
      store,
      navigator,
      learning,
      passMark: PASS_MARK
    });

    const gameDevelopment = createGameDevelopmentPathController({
      store,
      navigator,
      learning,
      passMark: PASS_MARK
    });

    const bossArena = createBossArenaController({
      academyData,
      store,
      navigator,
      learning
    });

    const dataSafety = createDataSafetyController();

    const globalSearch = createGlobalSearchController({
      academyData,
      nav,
      navigator,
      learning,
      study,
      routes: {
        'practice-lab': practiceLab.open,
        challenges: challenges.open,
        mastery: mastery.open,
        revision: revision.open,
        study: study.open,
        achievements: achievements.open,
        paths: learningPaths.open,
        'game-path': gameDevelopment.openRoadmap,
        boss: bossArena.open,
        references: profile.openReferenceLibrary
      }
    });

    achievements.initialize();

    document.addEventListener('click', event => {
      const searchFilter = event.target.closest('[data-search-filter]')?.dataset.searchFilter;
      const searchResult = event.target.closest('[data-search-result]')?.dataset.searchResult;
      const gamePathNode = event.target.closest('[data-game-path-node]')?.dataset.gamePathNode;
      const gamePathIndexRaw = event.target.closest('[data-game-path-index]')?.dataset.gamePathIndex;
      const bossLanguage = event.target.closest('[data-boss-language]')?.dataset.bossLanguage;
      const pathEditorTab = event.target.closest('[data-path-editor-tab]')?.dataset.pathEditorTab;
      const pathNode = event.target.closest('[data-path-node]')?.dataset.pathNode;
      const pathIndexRaw = event.target.closest('[data-path-index]')?.dataset.pathIndex;
      const achievementFilter = event.target.closest('[data-achievement-filter]')?.dataset.achievementFilter;
      const studyFilter = event.target.closest('[data-study-filter]')?.dataset.studyFilter;
      const studyOpen = event.target.closest('[data-study-open]')?.dataset.studyOpen;
      const cheatSheet = event.target.closest('[data-cheat-sheet]')?.dataset.cheatSheet;
      const revisionFilter = event.target.closest('[data-revision-filter]')?.dataset.revisionFilter;
      const challengeLanguage = event.target.closest('[data-challenge-language]')?.dataset.challengeLanguage;
      const challengeDifficulty = event.target.closest('[data-challenge-difficulty]')?.dataset.challengeDifficulty;
      const challengeType = event.target.closest('[data-challenge-type]')?.dataset.challengeType;
      const challengeIndexRaw = event.target.closest('[data-challenge-index]')?.dataset.challengeIndex;
      const labLanguage = event.target.closest('[data-lab-language]')?.dataset.labLanguage;
      const masteryFilter = event.target.closest('[data-mastery-filter]')?.dataset.masteryFilter;
      const language = event.target.closest('[data-language]')?.dataset.language;
      const difficulty = event.target.closest('[data-difficulty]')?.dataset.difficulty;
      const node = event.target.closest('[data-node]')?.dataset.node;
      const nodeIndex = Number(event.target.closest('[data-node-index]')?.dataset.nodeIndex);
      const action = event.target.closest('[data-action]')?.dataset.action;

      if (searchFilter) {
        globalSearch.setFilter(searchFilter);
        return;
      }

      if (searchResult) {
        globalSearch.openResult(searchResult);
        return;
      }

      if (gamePathNode) {
        gameDevelopment.openNode(gamePathNode, Number(gamePathIndexRaw || 0));
        return;
      }

      if (bossLanguage) {
        bossArena.startLanguage(bossLanguage);
        return;
      }

      if (pathEditorTab) {
        learningPaths.selectEditor(pathEditorTab);
        return;
      }

      if (pathNode) {
        learningPaths.openNode(pathNode, Number(pathIndexRaw || 0));
        return;
      }

      if (achievementFilter) {
        achievements.setFilter(achievementFilter);
        return;
      }

      if (studyFilter) {
        study.setFilter(studyFilter);
        return;
      }

      if (studyOpen) {
        study.openLessonFromLibrary(studyOpen);
        return;
      }

      if (cheatSheet) {
        study.openCheatSheet(cheatSheet);
        return;
      }

      if (revisionFilter) {
        revision.setFilter(revisionFilter);
        return;
      }

      if (challengeLanguage) {
        challenges.setLanguage(challengeLanguage);
        return;
      }

      if (challengeDifficulty) {
        challenges.setDifficulty(challengeDifficulty);
        return;
      }

      if (challengeType) {
        challenges.setType(challengeType);
        return;
      }

      if (challengeIndexRaw !== undefined) {
        challenges.openChallenge(Number(challengeIndexRaw));
        return;
      }

      if (labLanguage) {
        practiceLab.selectLanguage(labLanguage);
        return;
      }

      if (masteryFilter) {
        mastery.setFilter(masteryFilter);
        return;
      }

      if (language) {
        learning.openLanguage(language);
        return;
      }

      if (difficulty) {
        learning.openDifficulty(difficulty);
        return;
      }

      if (node) {
        if (node === 'lesson') { learning.openLesson(nodeIndex); study.syncLessonTools(); }
        if (node === 'test') assessment.startAssessment('test', nodeIndex);
        if (node === 'exam') assessment.startAssessment('exam', nodeIndex);
        return;
      }

      if (!action) return;

      const actions = {
        start: () => navigator.show('academyScreen'),
        quit: () => window.DesktopBridge.quit(),
        'open-search': globalSearch.open,
        'search-back': globalSearch.close,
        'back-start': () => navigator.show('startupScreen'),
        'back-languages': () => navigator.show('academyScreen'),
        'back-difficulties': () => {
          learning.renderDifficulties();
          navigator.show('difficultyScreen');
        },
        'back-roadmap': () => {
          learning.renderRoadmap();
          navigator.show('roadmapScreen');
        },
        'complete-lesson': learning.completeLesson,
        'start-practice': learning.startPractice,
        'back-lesson': () => { learning.openLesson(nav.lessonIndex); study.syncLessonTools(); },
        'run-code': learning.runLessonEditor,
        'reset-code': learning.resetLessonEditor,
        'show-hint': learning.showHint,
        'check-practice': learning.checkPractice,
        'run-practice': learning.runPracticeEditor,
        'abort-test': assessment.abort,
        'submit-answer': assessment.submitAnswer,
        'results-roadmap': () => {
          learning.renderRoadmap();
          navigator.show('roadmapScreen');
        },
        'open-learning-paths': learningPaths.open,
        'learning-paths-back': learningPaths.close,
        'open-web-path': learningPaths.openWebPath,
        'web-path-back': learningPaths.backToCenter,
        'open-game-path': gameDevelopment.openRoadmap,
        'game-path-center-back': learningPaths.open,
        'game-path-work-back': gameDevelopment.back,
        'game-path-run': gameDevelopment.run,
        'game-path-save': () => gameDevelopment.saveDraft(true),
        'game-path-reset': gameDevelopment.reset,
        'game-path-submit': gameDevelopment.submit,
        'open-boss-arena': bossArena.open,
        'boss-arena-back': bossArena.close,
        'boss-work-back': bossArena.backToHub,
        'boss-start-grand': bossArena.startGrand,
        'boss-submit': bossArena.submit,
        'boss-result-back': bossArena.backToHub,
        'path-work-back': learningPaths.backToRoadmap,
        'path-run': learningPaths.runPreview,
        'path-save': () => learningPaths.saveDraft(true),
        'path-reset': learningPaths.reset,
        'path-submit': learningPaths.submit,
        'open-achievements': achievements.open,
        'achievements-back': achievements.close,
        'open-study-library': study.open,
        'study-back': study.close,
        'cheat-back': study.closeCheatSheet,
        'print-cheat': study.printCheatSheet,
        'save-note': study.saveCurrentNote,
        'toggle-bookmark': study.toggleCurrentBookmark,
        'add-to-revision': study.addCurrentToRevision,
        'open-revision': revision.open,
        'revision-back': revision.close,
        'revision-start': revision.startSession,
        'revision-work-back': revision.abortSession,
        'revision-submit': revision.submit,
        'open-challenges': challenges.open,
        'challenge-hub-back': challenges.close,
        'open-capstone': projects.openCurrent,
        'capstone-back': projects.back,
        'capstone-run': projects.run,
        'capstone-save': () => projects.saveDraft(true),
        'capstone-submit': projects.submit,
        'capstone-reset': projects.reset,
        'challenge-work-back': challenges.backToHub,
        'challenge-show-hint': challenges.showHint,
        'challenge-submit': challenges.submit,
        'open-practice-lab': practiceLab.open,
        'practice-lab-back': practiceLab.close,
        'lab-run': practiceLab.run,
        'lab-save': () => practiceLab.saveWorkspace(true),
        'lab-reset': practiceLab.resetTemplate,
        'open-mastery': mastery.open,
        'mastery-back': () => navigator.show('academyScreen'),
        'open-references': profile.openReferenceLibrary,
        'references-back': () => navigator.show('academyScreen'),
        'open-profile': profile.openProfile,
        'profile-back': () => navigator.show(nav.returnScreen || 'academyScreen'),
        'open-settings': () => {
          nav.returnScreen = 'academyScreen';
          navigator.show('settingsScreen');
          dataSafety.refresh();
        },
        'settings-back': () => navigator.show(nav.returnScreen || 'academyScreen'),
        'create-backup': dataSafety.createBackup,
        'restore-backup': dataSafety.restoreLatest,
        'verify-save': dataSafety.verify,
        'open-data-folder': dataSafety.openFolder,
        'export-save': profile.exportSave,
        'reset-progress': profile.resetProgress,
        'print-lesson': () => window.print()
      };

      actions[action]?.();
    });

    $('importSaveInput').addEventListener('change', profile.importSave);
    $('labTemplateSelect').addEventListener('change', event => practiceLab.changeTemplate(event.target.value));
    $('studySearch').addEventListener('input', event => study.setSearch(event.target.value));
    $('lessonNoteInput').addEventListener('input', study.markNoteDirty);
    $('globalSearchInput').addEventListener('input', event => globalSearch.setQuery(event.target.value));
    $('globalSearchResults').addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const result = event.target.closest('[data-search-result]')?.dataset.searchResult;
      if (!result) return;
      event.preventDefault();
      globalSearch.openResult(result);
    });
    document.addEventListener('keydown', globalSearch.handleKeydown);
    learning.updateGlobalStats();
  } catch (error) {
    console.error('Academy startup failed.', error);
    document.body.innerHTML = `
      <main class="startup-error">
        <h1>Code Ascension Academy</h1>
        <p>The learning material could not be loaded.</p>
        <pre>${escapeHtml(String(error?.message || error))}</pre>
      </main>`;
  }
}
