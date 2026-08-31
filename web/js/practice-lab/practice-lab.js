import { $ } from '../core/utils.js';
import { runCSharp } from '../csharp/csharp-runner.js';

const TEMPLATES = {
  html: {
    blank: {
      name: 'Blank page',
      description: 'A clean HTML document for free experimentation.',
      code: `<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Practice Lab</title>\n</head>\n<body>\n  <h1>Hello, Academy</h1>\n  <p>Edit this page and run it.</p>\n</body>\n</html>`
    },
    profile: {
      name: 'Developer profile',
      description: 'Practice semantic structure with a small developer profile.',
      code: `<header>\n  <h1>My Developer Profile</h1>\n  <nav aria-label="Primary">\n    <a href="#about">About</a>\n    <a href="#skills">Skills</a>\n  </nav>\n</header>\n\n<main>\n  <section id="about">\n    <h2>About Me</h2>\n    <p>I am learning web development.</p>\n  </section>\n\n  <section id="skills">\n    <h2>Skills</h2>\n    <ul>\n      <li>HTML</li>\n      <li>CSS</li>\n      <li>JavaScript</li>\n    </ul>\n  </section>\n</main>\n\n<footer>\n  <p>Built in Code Ascension Academy.</p>\n</footer>`
    },
    form: {
      name: 'Accessible form',
      description: 'Practice labels, inputs, fieldsets and native validation.',
      code: `<main>\n  <h1>Academy Registration</h1>\n  <form>\n    <label for="name">Name</label>\n    <input id="name" name="name" type="text" required>\n\n    <label for="email">Email</label>\n    <input id="email" name="email" type="email" required>\n\n    <button type="submit">Register</button>\n  </form>\n</main>`
    }
  },
  css: {
    flexbox: {
      name: 'Flexbox playground',
      description: 'Style a toolbar and cards using flexible layout rules.',
      code: `.toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}\n\n.card-row {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n\n.card {\n  flex: 1 1 180px;\n}`
    },
    grid: {
      name: 'Grid playground',
      description: 'Experiment with responsive tracks, gaps and spanning items.',
      code: `.card-row {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 16px;\n}\n\n.card:first-child {\n  grid-column: span 2;\n}\n\n@media (max-width: 700px) {\n  .card-row {\n    grid-template-columns: 1fr;\n  }\n\n  .card:first-child {\n    grid-column: auto;\n  }\n}`
    },
    cards: {
      name: 'Interface cards',
      description: 'Practice spacing, typography, borders, shadows and hover states.',
      code: `.card {\n  padding: 20px;\n  border: 1px solid #33445f;\n  border-radius: 14px;\n  background: #121d2d;\n  transition: transform 180ms ease, border-color 180ms ease;\n}\n\n.card:hover {\n  transform: translateY(-4px);\n  border-color: #36d7ff;\n}\n\n.card h2 {\n  margin-top: 0;\n}`
    }
  },
  javascript: {
    console: {
      name: 'Console basics',
      description: 'Experiment with variables, functions and console output.',
      code: `const playerName = "Nova";\nlet health = 100;\n\nfunction takeDamage(amount) {\n  health -= amount;\n  return health;\n}\n\nconsole.log(playerName);\nconsole.log(takeDamage(25));`
    },
    arrays: {
      name: 'Arrays & methods',
      description: 'Practice map, filter, find and reduce on useful data.',
      code: `const scores = [62, 91, 78, 100, 84];\n\nconst passed = scores.filter(score => score >= 80);\nconst average = scores.reduce((sum, score) => sum + score, 0) / scores.length;\n\nconsole.log("Passed:", passed);\nconsole.log("Average:", average);`
    },
    objects: {
      name: 'Objects & functions',
      description: 'Model data and update it through small reusable functions.',
      code: `const player = {\n  name: "Nova",\n  health: 100,\n  ammo: 30\n};\n\nfunction reload(target, amount) {\n  target.ammo += amount;\n}\n\nreload(player, 15);\nconsole.log(player);`
    }
  },
  csharp: {
    console: {
      name: 'Console program',
      description: 'Draft a small C# console program and keep it saved locally.',
      code: `using System;\n\nConsole.WriteLine("Code Ascension Academy");\n\nint health = 100;\nhealth -= 25;\n\nConsole.WriteLine($"Health: {health}");`
    },
    classes: {
      name: 'Class playground',
      description: 'Practice fields, properties, constructors and methods.',
      code: `using System;\n\nPlayer player = new("Nova", 100);\nplayer.TakeDamage(20);\nConsole.WriteLine(player.Health);\n\npublic class Player\n{\n    public string Name { get; }\n    public int Health { get; private set; }\n\n    public Player(string name, int health)\n    {\n        Name = name;\n        Health = health;\n    }\n\n    public void TakeDamage(int amount)\n    {\n        Health -= amount;\n    }\n}`
    },
    linq: {
      name: 'LINQ playground',
      description: 'Draft filtering, projection and aggregation queries.',
      code: `using System;\nusing System.Linq;\n\nint[] scores = [62, 91, 78, 100, 84];\n\nvar passed = scores\n    .Where(score => score >= 80)\n    .OrderByDescending(score => score);\n\nforeach (int score in passed)\n{\n    Console.WriteLine(score);\n}`
    }
  }
};

const CSS_PREVIEW_HTML = `
  <div class="preview-shell">
    <div class="toolbar">
      <div>
        <span class="kicker">PRACTICE LAB</span>
        <h1>Interface Playground</h1>
      </div>
      <button>Action</button>
    </div>
    <div class="card-row">
      <article class="card"><h2>HTML</h2><p>Semantic structure and accessible content.</p></article>
      <article class="card"><h2>CSS</h2><p>Layout, spacing and visual systems.</p></article>
      <article class="card"><h2>JavaScript</h2><p>Logic, events and application state.</p></article>
    </div>
  </div>`;

export function createPracticeLabController({ academyData, store, nav, navigator }) {
  let language = 'html';

  function ensureLabState() {
    if (!store.state.lab || typeof store.state.lab !== 'object') store.state.lab = {};
    Object.keys(TEMPLATES).forEach(id => {
      if (!store.state.lab[id]) {
        const firstTemplate = Object.keys(TEMPLATES[id])[0];
        store.state.lab[id] = {
          template: firstTemplate,
          code: TEMPLATES[id][firstTemplate].code
        };
      }
    });
  }

  function open() {
    ensureLabState();
    nav.returnScreen = 'academyScreen';
    renderLanguageButtons();
    selectLanguage(language);
    navigator.show('practiceLabScreen');
  }

  function close() {
    saveWorkspace(false);
    navigator.show('academyScreen');
  }

  function renderLanguageButtons() {
    const root = $('labLanguageGrid');
    root.innerHTML = '';

    Object.entries(academyData.languages).forEach(([id, meta]) => {
      root.insertAdjacentHTML('beforeend', `
        <button class="lab-language-button ${id === language ? 'active' : ''}" data-lab-language="${id}" style="--accent:${meta.accent}">
          <span class="language-icon language-icon-${id} lab-language-icon">
            <img src="${meta.iconUrl}" alt="${meta.name} language logo" loading="eager" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
            <span class="language-icon-fallback" hidden>${meta.iconFallback}</span>
          </span>
          <span>${meta.name}</span>
        </button>`);
    });
  }

  function selectLanguage(nextLanguage) {
    if (!TEMPLATES[nextLanguage]) return;
    if ($('labEditor')) persistCurrentEditor();
    language = nextLanguage;
    ensureLabState();
    renderLanguageButtons();
    renderTemplateOptions();
    paintWorkspace();
  }

  function renderTemplateOptions() {
    const select = $('labTemplateSelect');
    select.innerHTML = Object.entries(TEMPLATES[language])
      .map(([id, template]) => `<option value="${id}">${template.name}</option>`)
      .join('');

    const saved = store.state.lab[language];
    if (!TEMPLATES[language][saved.template]) {
      saved.template = Object.keys(TEMPLATES[language])[0];
    }
    select.value = saved.template;
  }

  function paintWorkspace() {
    const meta = academyData.languages[language];
    const saved = store.state.lab[language];
    const template = TEMPLATES[language][saved.template];

    $('labEyebrow').textContent = `${meta.name.toUpperCase()} PLAYGROUND`;
    $('labTitle').textContent = `${meta.name} Practice Workspace`;
    $('labFilename').textContent = meta.filename;
    $('labTemplateDescription').textContent = template.description;
    $('labEditor').value = saved.code || template.code;
    $('labRunButton').textContent = '▶ RUN';
    $('labOutputTitle').textContent = language === 'html' || language === 'css' ? 'PREVIEW' : 'OUTPUT';
    $('labOutput').textContent = language === 'csharp'
      ? 'Ready. Press RUN to compile and execute this C# workspace with your local .NET SDK.'
      : 'Ready. Run the workspace when you want to test it.';

    const frame = $('labPreviewFrame');
    frame.classList.toggle('hidden', !(language === 'html' || language === 'css'));
    $('labOutput').classList.toggle('hidden', language === 'html' || language === 'css');

    if (language === 'html' || language === 'css') run();
  }

  function changeTemplate(templateId) {
    if (!TEMPLATES[language][templateId]) return;
    store.state.lab[language].template = templateId;
    store.state.lab[language].code = TEMPLATES[language][templateId].code;
    store.save();
    paintWorkspace();
  }

  function persistCurrentEditor() {
    ensureLabState();
    store.state.lab[language].code = $('labEditor').value;
  }

  function saveWorkspace(showMessage = true) {
    persistCurrentEditor();
    store.save();
    if (showMessage) {
      $('labSaveStatus').textContent = 'Workspace saved locally.';
      window.setTimeout(() => {
        if ($('labSaveStatus')) $('labSaveStatus').textContent = '';
      }, 2200);
    }
  }

  function resetTemplate() {
    const templateId = $('labTemplateSelect').value;
    const template = TEMPLATES[language][templateId];
    if (!template) return;
    $('labEditor').value = template.code;
    persistCurrentEditor();
    store.save();
    run();
  }

  async function run() {
    persistCurrentEditor();
    store.save();
    const code = $('labEditor').value;

    if (language === 'html') {
      $('labPreviewFrame').srcdoc = code;
      return;
    }

    if (language === 'css') {
      const safeCss = String(code).replace(/<\/style/gi, '<\\/style');
      $('labPreviewFrame').srcdoc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:#08101b;color:#eaf2ff;font-family:system-ui,sans-serif;padding:24px}.preview-shell{max-width:900px;margin:auto}.toolbar{margin-bottom:22px}.kicker{font-size:10px;letter-spacing:.18em;color:#63dfff}button{border:1px solid #3f5878;background:#11243a;color:#eaf2ff;border-radius:9px;padding:10px 14px}.card-row{display:flex;gap:16px}.card{background:#121d2d;border:1px solid #2b405d;border-radius:14px;padding:18px;flex:1}${safeCss}</style></head><body>${CSS_PREVIEW_HTML}</body></html>`;
      return;
    }

    const output = $('labOutput');
    output.classList.remove('hidden');

    if (language === 'javascript') {
      const logs = [];
      const fakeConsole = {
        log: (...args) => logs.push(args.map(formatValue).join(' ')),
        warn: (...args) => logs.push(`WARN: ${args.map(formatValue).join(' ')}`),
        error: (...args) => logs.push(`ERROR: ${args.map(formatValue).join(' ')}`)
      };

      try {
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

  function formatValue(value) {
    if (typeof value === 'string') return value;
    try { return JSON.stringify(value); } catch { return String(value); }
  }


  return {
    open,
    close,
    selectLanguage,
    changeTemplate,
    saveWorkspace,
    resetTemplate,
    run
  };
}
