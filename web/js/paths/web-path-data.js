export const WEB_PATH = {
  id: 'web-development',
  name: 'Web Development',
  shortName: 'Web Dev',
  accent: '#36d7ff',
  unlockText: 'Reach Junior in HTML, CSS and JavaScript.',
  description: 'Combine HTML structure, CSS presentation and JavaScript behaviour in the same working projects.',
  missions: [
    {
      title: 'Semantic Page Blueprint',
      summary: 'Build a complete semantic page, style its major regions and add one real interaction.',
      requirements: [
        { label: 'Semantic HTML landmarks', points: 20, check: c => /<header\b/i.test(c.html) && /<nav\b/i.test(c.html) && /<main\b/i.test(c.html) && /<footer\b/i.test(c.html) },
        { label: 'At least two meaningful sections', points: 15, check: c => (c.html.match(/<section\b/gi) || []).length >= 2 },
        { label: 'CSS layout and spacing', points: 20, check: c => /(display\s*:\s*(grid|flex)|grid-template|gap\s*:|padding\s*:)/i.test(c.css) },
        { label: 'Responsive rule', points: 15, check: c => /@media/i.test(c.css) },
        { label: 'JavaScript DOM event', points: 20, check: c => /(querySelector|getElementById)/i.test(c.js) && /addEventListener/i.test(c.js) },
        { label: 'Meaningful customization', points: 10, check: c => (c.html.length + c.css.length + c.js.length) >= 700 }
      ],
      starter: {
        html: `<header class="site-header">\n  <h1>Code Ascension</h1>\n  <nav aria-label="Primary">\n    <a href="#about">About</a>\n    <a href="#projects">Projects</a>\n  </nav>\n</header>\n\n<main>\n  <section id="about">\n    <h2>About</h2>\n    <p>Build this page into a semantic developer profile.</p>\n  </section>\n\n  <section id="projects">\n    <h2>Projects</h2>\n    <button id="revealProject" type="button">Reveal project</button>\n    <article id="projectCard" hidden>\n      <h3>Academy Project</h3>\n      <p>HTML, CSS and JavaScript working together.</p>\n    </article>\n  </section>\n</main>\n\n<footer>Built in Code Ascension Academy</footer>`,
        css: `body {\n  margin: 0;\n  font-family: system-ui, sans-serif;\n}\n\n.site-header {\n  padding: 1rem;\n}\n\nmain {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 1rem;\n}\n\n@media (min-width: 700px) {\n  main {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 1rem;\n  }\n}`,
        js: `const button = document.querySelector('#revealProject');\nconst project = document.querySelector('#projectCard');\n\nbutton.addEventListener('click', () => {\n  project.hidden = !project.hidden;\n});`
      }
    },
    {
      title: 'Responsive Game Dashboard',
      summary: 'Create a dashboard of game-style cards that adapts across screen sizes and responds to user input.',
      requirements: [
        { label: 'Dashboard/cards in HTML', points: 15, check: c => /(dashboard|card)/i.test(c.html) && (c.html.match(/<(article|section)\b/gi) || []).length >= 2 },
        { label: 'Grid or Flexbox layout', points: 20, check: c => /display\s*:\s*(grid|flex)/i.test(c.css) },
        { label: 'Responsive breakpoint', points: 15, check: c => /@media/i.test(c.css) },
        { label: 'Interactive button or control', points: 20, check: c => /<(button|input|select)\b/i.test(c.html) && /addEventListener/i.test(c.js) },
        { label: 'DOM state update', points: 20, check: c => /(textContent|innerHTML|classList|dataset|style\.)/i.test(c.js) },
        { label: 'Meaningful customization', points: 10, check: c => (c.html.length + c.css.length + c.js.length) >= 850 }
      ],
      starter: {
        html: `<main class="dashboard">\n  <header class="dashboard-header">\n    <div>\n      <p>PLAYER STATUS</p>\n      <h1>Horde Command</h1>\n    </div>\n    <button id="healButton" type="button">Heal Player</button>\n  </header>\n\n  <section class="stat-grid">\n    <article class="stat-card">\n      <span>HEALTH</span>\n      <strong id="healthValue">72</strong>\n    </article>\n    <article class="stat-card">\n      <span>WAVE</span>\n      <strong>14</strong>\n    </article>\n    <article class="stat-card">\n      <span>KILLS</span>\n      <strong>382</strong>\n    </article>\n  </section>\n</main>`,
        css: `body { margin: 0; font-family: system-ui, sans-serif; background: #090d15; color: #edf6ff; }\n.dashboard { max-width: 1000px; margin: auto; padding: 24px; }\n.dashboard-header { display: flex; justify-content: space-between; gap: 16px; align-items: center; }\n.stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }\n.stat-card { padding: 20px; border: 1px solid #29405e; border-radius: 14px; background: #111a28; }\n@media (max-width: 700px) { .stat-grid { grid-template-columns: 1fr; } }`,
        js: `let health = 72;\nconst healthValue = document.querySelector('#healthValue');\nconst healButton = document.querySelector('#healButton');\n\nhealButton.addEventListener('click', () => {\n  health = Math.min(100, health + 10);\n  healthValue.textContent = health;\n});`
      }
    },
    {
      title: 'DOM Interaction Controller',
      summary: 'Build a small interface whose visual state is driven by JavaScript events and DOM updates.',
      requirements: [
        { label: 'Multiple interactive controls', points: 15, check: c => (c.html.match(/<(button|input|select)\b/gi) || []).length >= 2 },
        { label: 'Reusable CSS state class', points: 15, check: c => /\.[\w-]*(active|selected|open|complete)[\w-]*\s*\{/i.test(c.css) },
        { label: 'DOM selection', points: 15, check: c => /(querySelector(All)?|getElementById)/i.test(c.js) },
        { label: 'At least two event listeners', points: 20, check: c => (c.js.match(/addEventListener/gi) || []).length >= 2 },
        { label: 'DOM/class updates', points: 25, check: c => /(classList\.(add|remove|toggle)|textContent|dataset)/i.test(c.js) },
        { label: 'Meaningful customization', points: 10, check: c => (c.html.length + c.css.length + c.js.length) >= 900 }
      ],
      starter: {
        html: `<main class="mission-panel">\n  <h1>Mission Control</h1>\n  <p id="statusText">No mission selected.</p>\n  <div class="mission-actions">\n    <button class="mission-button" data-mission="Supply Run">Supply Run</button>\n    <button class="mission-button" data-mission="Night Patrol">Night Patrol</button>\n  </div>\n</main>`,
        css: `.mission-panel { max-width: 700px; margin: 40px auto; font-family: system-ui, sans-serif; }\n.mission-actions { display: flex; gap: 12px; }\n.mission-button { padding: 12px 16px; }\n.mission-button.active { outline: 3px solid #36d7ff; }`,
        js: `const buttons = document.querySelectorAll('.mission-button');\nconst statusText = document.querySelector('#statusText');\n\nbuttons.forEach(button => {\n  button.addEventListener('click', () => {\n    buttons.forEach(item => item.classList.remove('active'));\n    button.classList.add('active');\n    statusText.textContent = \`Selected: \${button.dataset.mission}\`;\n  });\n});`
      }
    },
    {
      title: 'Local Progress Tracker',
      summary: 'Persist interface state locally so data survives a refresh and can be restored later.',
      requirements: [
        { label: 'Input or form controls', points: 15, check: c => /<(input|form|textarea|select)\b/i.test(c.html) },
        { label: 'Styled saved-data interface', points: 15, check: c => /(saved|progress|task|tracker|entry)/i.test(c.css) && /padding\s*:/i.test(c.css) },
        { label: 'localStorage usage', points: 20, check: c => /localStorage\.(setItem|getItem)/i.test(c.js) },
        { label: 'JSON serialization', points: 15, check: c => /JSON\.(stringify|parse)/i.test(c.js) },
        { label: 'Render/update function', points: 25, check: c => /function\s+[\w$]+|=>/i.test(c.js) && /(innerHTML|textContent|appendChild|insertAdjacentHTML)/i.test(c.js) },
        { label: 'Meaningful customization', points: 10, check: c => (c.html.length + c.css.length + c.js.length) >= 1000 }
      ],
      starter: {
        html: `<main class="tracker">\n  <h1>Learning Tracker</h1>\n  <form id="progressForm">\n    <label for="topicInput">Topic</label>\n    <input id="topicInput" required>\n    <button type="submit">Save Topic</button>\n  </form>\n  <ul id="savedTopics"></ul>\n</main>`,
        css: `.tracker { max-width: 650px; margin: 40px auto; padding: 24px; font-family: system-ui, sans-serif; }\n#savedTopics { display: grid; gap: 10px; padding: 0; list-style: none; }\n#savedTopics li { padding: 12px; border: 1px solid #cad5e1; border-radius: 8px; }`,
        js: `const form = document.querySelector('#progressForm');\nconst input = document.querySelector('#topicInput');\nconst list = document.querySelector('#savedTopics');\nlet topics = JSON.parse(localStorage.getItem('academy-topics') || '[]');\n\nfunction renderTopics() {\n  list.innerHTML = topics.map(topic => \`<li>\${topic}</li>\`).join('');\n}\n\nform.addEventListener('submit', event => {\n  event.preventDefault();\n  topics.push(input.value);\n  localStorage.setItem('academy-topics', JSON.stringify(topics));\n  input.value = '';\n  renderTopics();\n});\n\nrenderTopics();`
      }
    },
    {
      title: 'Integrated Mini Application',
      summary: 'Bring structure, responsive design, data, events and persistence together in one polished browser application.',
      requirements: [
        { label: 'Semantic multi-section HTML', points: 15, check: c => /<main\b/i.test(c.html) && /<(section|article)\b/i.test(c.html) && /<(button|form|input)\b/i.test(c.html) },
        { label: 'Responsive Grid/Flex layout', points: 15, check: c => /display\s*:\s*(grid|flex)/i.test(c.css) && /@media/i.test(c.css) },
        { label: 'JavaScript data collection', points: 15, check: c => /\b(const|let)\s+\w+\s*=\s*\[|\b(const|let)\s+\w+\s*=\s*\{/i.test(c.js) },
        { label: 'Functions and events', points: 20, check: c => /(function\s+\w+|=>)/i.test(c.js) && /addEventListener/i.test(c.js) },
        { label: 'Persistent state', points: 20, check: c => /localStorage\.(setItem|getItem)/i.test(c.js) },
        { label: 'Meaningful customization', points: 15, check: c => (c.html.length + c.css.length + c.js.length) >= 1400 }
      ],
      starter: {
        html: `<main class="loadout-app">\n  <header>\n    <p>ACADEMY MINI APP</p>\n    <h1>Game Loadout Planner</h1>\n  </header>\n\n  <section>\n    <form id="loadoutForm">\n      <label for="weaponInput">Weapon name</label>\n      <input id="weaponInput" required>\n      <button type="submit">Add weapon</button>\n    </form>\n  </section>\n\n  <section>\n    <h2>Saved Loadout</h2>\n    <div id="loadoutList" class="loadout-grid"></div>\n  </section>\n</main>`,
        css: `body { margin: 0; background: #09101a; color: #edf6ff; font-family: system-ui, sans-serif; }\n.loadout-app { max-width: 900px; margin: auto; padding: 24px; }\n.loadout-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }\n.loadout-card { padding: 14px; border-radius: 10px; background: #142236; }\n@media (max-width: 650px) { .loadout-grid { grid-template-columns: 1fr; } }`,
        js: `const form = document.querySelector('#loadoutForm');\nconst input = document.querySelector('#weaponInput');\nconst list = document.querySelector('#loadoutList');\nlet loadout = JSON.parse(localStorage.getItem('academy-loadout') || '[]');\n\nconst render = () => {\n  list.innerHTML = loadout.map(item => \`<article class="loadout-card">\${item}</article>\`).join('');\n};\n\nform.addEventListener('submit', event => {\n  event.preventDefault();\n  loadout.push(input.value);\n  localStorage.setItem('academy-loadout', JSON.stringify(loadout));\n  input.value = '';\n  render();\n});\n\nrender();`
      }
    }
  ],
  capstone: {
    title: 'Game Companion Dashboard',
    summary: 'Build a complete browser-based companion dashboard using HTML, CSS and JavaScript together.',
    requirements: [
      { label: 'Semantic navigation and multiple content regions', points: 15, check: c => /<nav\b/i.test(c.html) && /<main\b/i.test(c.html) && (c.html.match(/<(section|article)\b/gi) || []).length >= 3 },
      { label: 'Responsive dashboard layout', points: 15, check: c => /display\s*:\s*(grid|flex)/i.test(c.css) && /@media/i.test(c.css) },
      { label: 'Reusable visual component classes', points: 10, check: c => (c.css.match(/\.[\w-]+\s*\{/g) || []).length >= 4 },
      { label: 'JavaScript application state', points: 15, check: c => /\b(const|let)\s+\w+\s*=\s*(\[|\{)/i.test(c.js) },
      { label: 'At least two user interactions', points: 15, check: c => (c.js.match(/addEventListener/gi) || []).length >= 2 },
      { label: 'Dynamic DOM rendering', points: 10, check: c => /(innerHTML|insertAdjacentHTML|appendChild|textContent)/i.test(c.js) },
      { label: 'Persistent browser state', points: 10, check: c => /localStorage\.(setItem|getItem)/i.test(c.js) },
      { label: 'Substantial original project', points: 10, check: c => (c.html.length + c.css.length + c.js.length) >= 2200 }
    ],
    starter: {
      html: `<header class="app-header">\n  <div>\n    <p>GAME COMPANION</p>\n    <h1>Command Dashboard</h1>\n  </div>\n  <nav aria-label="Dashboard">\n    <button data-view="loadout">Loadout</button>\n    <button data-view="missions">Missions</button>\n  </nav>\n</header>\n\n<main>\n  <section id="loadoutView">\n    <h2>Loadout</h2>\n    <form id="itemForm">\n      <input id="itemInput" placeholder="Add an item" required>\n      <button type="submit">Add</button>\n    </form>\n    <div id="itemGrid" class="card-grid"></div>\n  </section>\n\n  <section id="missionsView">\n    <h2>Missions</h2>\n    <button id="missionButton">Generate mission</button>\n    <article id="missionCard" class="panel">No mission generated.</article>\n  </section>\n\n  <section class="panel">\n    <h2>Progress</h2>\n    <p id="progressText">0 saved items</p>\n  </section>\n</main>`,
      css: `body { margin: 0; background: #080d15; color: #eef7ff; font-family: system-ui, sans-serif; }\n.app-header { display: flex; justify-content: space-between; gap: 20px; padding: 24px; border-bottom: 1px solid #243a55; }\nmain { max-width: 1000px; margin: auto; padding: 24px; }\n.card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }\n.card, .panel { padding: 16px; border-radius: 12px; background: #121e2d; border: 1px solid #29435f; }\n@media (max-width: 700px) { .app-header { flex-direction: column; } .card-grid { grid-template-columns: 1fr; } }`,
      js: `const form = document.querySelector('#itemForm');\nconst input = document.querySelector('#itemInput');\nconst grid = document.querySelector('#itemGrid');\nconst progress = document.querySelector('#progressText');\nconst missionButton = document.querySelector('#missionButton');\nconst missionCard = document.querySelector('#missionCard');\nlet items = JSON.parse(localStorage.getItem('companion-items') || '[]');\n\nfunction renderItems() {\n  grid.innerHTML = items.map(item => \`<article class="card">\${item}</article>\`).join('');\n  progress.textContent = \`\${items.length} saved items\`;\n}\n\nform.addEventListener('submit', event => {\n  event.preventDefault();\n  items.push(input.value);\n  localStorage.setItem('companion-items', JSON.stringify(items));\n  input.value = '';\n  renderItems();\n});\n\nmissionButton.addEventListener('click', () => {\n  const missions = ['Supply Run', 'Night Patrol', 'Rescue Operation'];\n  missionCard.textContent = missions[Math.floor(Math.random() * missions.length)];\n});\n\nrenderItems();`
    }
  }
};
