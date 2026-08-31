const SCREEN_GROUPS = {
  academyScreen: 'learn',
  difficultyScreen: 'learn',
  roadmapScreen: 'learn',
  lessonScreen: 'learn',
  practiceScreen: 'learn',
  testScreen: 'learn',
  resultsScreen: 'learn',
  capstoneScreen: 'learn',
  practiceLabScreen: 'practice',
  challengeHubScreen: 'challenges',
  challengeWorkScreen: 'challenges',
  revisionScreen: 'revision',
  revisionWorkScreen: 'revision',
  pathsScreen: 'paths',
  webPathScreen: 'paths',
  pathWorkScreen: 'paths',
  gamePathScreen: 'paths',
  gamePathWorkScreen: 'paths',
  masteryScreen: 'mastery',
  achievementsScreen: 'achievements',
  bossArenaScreen: 'boss',
  bossWorkScreen: 'boss',
  bossResultScreen: 'boss',
  studyLibraryScreen: 'library',
  cheatSheetScreen: 'library',
  referenceScreen: 'references',
  profileScreen: 'profile',
  settingsScreen: 'settings',
  searchScreen: 'search'
};

const FOCUS_SCREENS = new Set([
  'testScreen',
  'challengeWorkScreen',
  'revisionWorkScreen',
  'pathWorkScreen',
  'gamePathWorkScreen',
  'bossWorkScreen'
]);

function screenName(screen) {
  return screen?.querySelector('h1, h2, h3')?.textContent?.trim() || 'Code Ascension Academy';
}

export function createScreenNavigator() {
  const screens = [...document.querySelectorAll('.screen')];
  const railItems = [...document.querySelectorAll('[data-rail-group]')];

  function setScreenAvailability(activeId) {
    screens.forEach(screen => {
      const active = screen.id === activeId;
      screen.setAttribute('aria-hidden', String(!active));
      if (active) {
        screen.removeAttribute('inert');
      } else {
        screen.setAttribute('inert', '');
      }
    });
  }

  function syncShell(id) {
    const shellActive = id !== 'startupScreen';
    document.body.dataset.screen = id;
    document.body.classList.toggle('desktop-shell-active', shellActive);
    document.body.classList.toggle('focus-workspace', FOCUS_SCREENS.has(id));

    const group = SCREEN_GROUPS[id] || '';
    railItems.forEach(item => {
      const active = item.dataset.railGroup === group;
      item.classList.toggle('active', active);
      if (active) {
        item.setAttribute('aria-current', 'page');
      } else {
        item.removeAttribute('aria-current');
      }
    });
  }

  function focusScreen(target) {
    const heading = target.querySelector('h1, h2, h3');
    const focusTarget = heading || target;
    focusTarget.setAttribute('tabindex', '-1');

    window.requestAnimationFrame(() => {
      focusTarget.focus({ preventScroll: true });
      const name = screenName(target);
      document.title = name === 'Code Ascension Academy'
        ? name
        : `${name} — Code Ascension Academy`;
      window.AcademyAccessibility?.announce(name);
    });
  }

  setScreenAvailability('startupScreen');
  syncShell('startupScreen');

  return {
    show(id) {
      const target = document.getElementById(id);
      if (!target) {
        throw new Error(`Unknown Academy screen: ${id}`);
      }

      screens.forEach(screen => screen.classList.remove('active'));
      target.classList.add('active');
      setScreenAvailability(id);
      syncShell(id);
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      focusScreen(target);
    }
  };
}
