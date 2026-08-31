import { $, escapeHtml } from '../core/utils.js';
import { runCSharp } from '../csharp/csharp-runner.js';

const PROJECTS = {
  html: {
    intern: ['Developer Profile', 'Build a complete semantic profile page that combines the five Intern modules into one coherent document.'],
    junior: ['Learning Hub', 'Create a richer learning portal page with navigation, forms, structured content and reusable semantic sections.'],
    intermediate: ['Accessible Academy Dashboard', 'Build an accessible application-style document that uses stronger forms, media, tables and semantic structure.'],
    senior: ['Professional Content Portal', 'Design robust production-style markup with advanced semantics, accessibility and maintainable page structure.'],
    advanced: ['Production Markup Capstone', 'Create and audit a demanding HTML document that demonstrates advanced platform knowledge and resilient markup.']
  },
  css: {
    intern: ['Responsive Developer Profile', 'Turn a basic profile interface into a polished, responsive layout using the five Intern CSS modules.'],
    junior: ['Game Dashboard Interface', 'Style a practical dashboard with reusable layout, responsive behavior, states and visual hierarchy.'],
    intermediate: ['Component Design System', 'Build a cohesive component system that combines modern layout, responsive rules and reusable visual patterns.'],
    senior: ['Scalable Application UI', 'Create a maintainable application skin with architecture, advanced layout and performance-conscious CSS.'],
    advanced: ['Production Design System', 'Build an advanced visual system using modern CSS features, robust sizing and professional architecture.']
  },
  javascript: {
    intern: ['RPG Character Manager', 'Build a small character-management program using variables, functions, conditions, collections, objects and events/logic.'],
    junior: ['Inventory Manager', 'Create a practical inventory application that combines state, collections, DOM-style logic and reusable functions.'],
    intermediate: ['Interactive Game Systems', 'Combine asynchronous behavior, modules, collections and application state into a larger interactive system.'],
    senior: ['Modular Game Framework', 'Design a maintainable JavaScript system using deeper language behavior, modules, performance awareness and architecture.'],
    advanced: ['Browser Application Engine', 'Build an advanced JavaScript application core that demonstrates professional-level language and platform reasoning.']
  },
  csharp: {
    intern: ['Console RPG Battle Simulator', 'Build a console battle simulator using variables, conditions, loops, methods and classes.'],
    junior: ['Inventory Manager', 'Create a structured inventory application using properties, collections, inheritance/interfaces, exceptions and files/resources.'],
    intermediate: ['Turn-Based Combat Engine', 'Build a reusable combat system using generics, delegates/events, LINQ, async concepts and modern data modeling.'],
    senior: ['Save & Simulation Architecture', 'Design a larger application core using reference/value semantics, concurrency, reflection and maintainable architecture.'],
    advanced: ['Multi-System Simulation Core', 'Build a demanding C# core that demonstrates performance-aware memory use, advanced generics, async streams and runtime concepts.']
  }
};

const MIN_LENGTH = {
  intern: 140,
  junior: 200,
  intermediate: 260,
  senior: 320,
  advanced: 380
};

const CSS_PREVIEW = `
<div class="cap-preview-shell">
  <header class="cap-toolbar">
    <div><span class="cap-kicker">CAPSTONE</span><h1>Code Ascension Interface</h1></div>
    <button>Continue</button>
  </header>
  <main>
    <section class="cap-hero"><h2>Current Learning Path</h2><p>Use your CSS to turn this plain structure into a polished application interface.</p></section>
    <section class="cap-grid">
      <article class="cap-card"><h3>Lessons</h3><p>Five modules completed.</p></article>
      <article class="cap-card"><h3>Projects</h3><p>One capstone in progress.</p></article>
      <article class="cap-card"><h3>Mastery</h3><p>Keep improving your score.</p></article>
    </section>
    <form class="cap-form"><label for="cap-name">Project name</label><input id="cap-name" value="My Academy Project"><button type="button">Save</button></form>
  </main>
</div>`;

export function createProjectsController({ academyData, store, nav, navigator, learning, passMark }) {
  let language = null;
  let difficulty = null;
  let project = null;

  function openCurrent() {
    language = nav.language;
    difficulty = nav.difficulty;
    if (!language || !difficulty) return;

    const level = academyData.languages[language].levels[difficulty];
    const progress = store.state.progress[language][difficulty];
    const allTestsPassed = level.lessons.every((_, index) => Number(progress.tests[index] || 0) >= passMark);

    if (!allTestsPassed) {
      alert('Pass all five class tests before starting the capstone project.');
      return;
    }

    project = buildProject(language, difficulty);
    paint();
    navigator.show('capstoneScreen');
  }

  function buildProject(lang, diff) {
    const meta = academyData.languages[lang];
    const diffMeta = academyData.difficulties.find(item => item.id === diff);
    const level = meta.levels[diff];
    const [title, mission] = PROJECTS[lang][diff];

    return {
      lang,
      diff,
      title,
      mission,
      filename: meta.filename,
      accent: meta.accent,
      rankColor: diffMeta.color,
      requirements: level.lessons.map((lesson, index) => ({
        index,
        title: lesson.title,
        prompt: lesson.practice.prompt,
        validator: lesson.practice.validator
      })),
      starter: starterCode(lang, diff, title, level)
    };
  }

  function starterCode(lang, diff, title, level) {
    const todos = level.lessons.map((lesson, index) => `${index + 1}. ${lesson.title}`).join('\n');

    if (lang === 'html') {
      return `<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>${title}</title>\n</head>\n<body>\n  <header>\n    <h1>${title}</h1>\n  </header>\n\n  <main>\n    <!-- Build one coherent project that demonstrates all five modules. -->\n  </main>\n\n  <footer>\n    <p>Built in Code Ascension Academy.</p>\n  </footer>\n</body>\n</html>`;
    }

    if (lang === 'css') {
      return `/* ${title}\n   Demonstrate these five modules:\n${todos.split('\n').map(line => `   ${line}`).join('\n')}\n*/\n\n:root {\n  font-family: system-ui, sans-serif;\n}\n\n/* Build your complete capstone styles below. */\n`;
    }

    if (lang === 'javascript') {
      return `// ${title}\n// Build one working program that demonstrates all five modules.\n\nconst project = {\n  name: "${title}",\n  ready: false\n};\n\nfunction startProject() {\n  project.ready = true;\n  console.log(project.name);\n}\n\nstartProject();\n\n// Continue your capstone below.\n`;
    }

    return `using System;\n\n// ${title}\n// Build one coherent C# program that demonstrates all five modules.\n\nConsole.WriteLine("${title}");\n\n// Continue your capstone below.\n`;
  }

  function paint() {
    const meta = academyData.languages[language];
    const diffMeta = academyData.difficulties.find(item => item.id === difficulty);
    const capstone = store.capstoneData(language, difficulty);
    const code = capstone.code || project.starter;

    $('capstoneContext').textContent = `${meta.name.toUpperCase()} • ${diffMeta.name.toUpperCase()} • CAPSTONE`;
    $('capstoneTitle').textContent = project.title;
    $('capstoneMission').textContent = project.mission;
    $('capstoneFilename').textContent = project.filename;
    $('capstoneEditor').value = code;
    $('capstoneBestScore').textContent = `${Number(capstone.bestScore || 0)}%`;
    $('capstoneStatus').textContent = capstone.passed ? 'PASSED' : 'IN PROGRESS';
    $('capstoneStatus').className = `capstone-status ${capstone.passed ? 'passed' : ''}`;
    $('capstoneSaveStatus').textContent = '';

    $('capstoneRequirements').innerHTML = project.requirements.map(requirement => `
      <div class="capstone-requirement">
        <span>${requirement.index + 1}</span>
        <div><strong>${escapeHtml(requirement.title)}</strong><p>${escapeHtml(requirement.prompt)}</p></div>
      </div>`).join('');

    $('capstoneRubric').innerHTML = `
      <div><span>Five module requirements</span><strong>75 pts</strong></div>
      <div><span>Project completeness</span><strong>15 pts</strong></div>
      <div><span>Meaningful customization</span><strong>10 pts</strong></div>
      <div class="capstone-rubric-total"><span>Pass mark</span><strong>${passMark}%</strong></div>`;

    const frame = $('capstonePreviewFrame');
    const output = $('capstoneOutput');
    const visual = language === 'html' || language === 'css';
    frame.classList.toggle('hidden', !visual);
    output.classList.toggle('hidden', visual);
    $('capstoneOutputLabel').textContent = visual ? 'PREVIEW' : language === 'csharp' ? 'BUILD / OUTPUT' : 'OUTPUT';

    if (capstone.attempts?.length) {
      renderResult(capstone.attempts[capstone.attempts.length - 1], false);
    } else {
      $('capstoneResult').innerHTML = '<p class="muted">Submit the completed project when you are ready for rubric scoring.</p>';
    }

    run();
  }

  function saveDraft(showMessage = true) {
    if (!project) return;
    store.saveCapstoneDraft(language, difficulty, $('capstoneEditor').value);
    if (showMessage) {
      $('capstoneSaveStatus').textContent = 'Draft saved locally.';
      window.setTimeout(() => {
        if ($('capstoneSaveStatus')) $('capstoneSaveStatus').textContent = '';
      }, 2200);
    }
  }

  function reset() {
    if (!project) return;
    if (!confirm('Reset this capstone editor to the starter project? Your saved draft will be replaced.')) return;
    $('capstoneEditor').value = project.starter;
    saveDraft(false);
    run();
  }

  async function run() {
    if (!project) return;
    const code = $('capstoneEditor').value;
    saveDraft(false);

    if (language === 'html') {
      $('capstonePreviewFrame').srcdoc = code;
      return;
    }

    if (language === 'css') {
      const safeCss = String(code).replace(/<\/style/gi, '<\\/style');
      $('capstonePreviewFrame').srcdoc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:#07101c;color:#eef6ff;font-family:system-ui,sans-serif;padding:26px}.cap-preview-shell{max-width:920px;margin:auto}.cap-toolbar{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:24px}.cap-kicker{font-size:10px;letter-spacing:.18em;color:#4ddfff}.cap-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.cap-card,.cap-hero,.cap-form{background:#111c2c;border:1px solid #2c405c;border-radius:14px;padding:18px;margin-bottom:16px}button,input{padding:10px 12px;border-radius:8px;border:1px solid #3d5574;background:#0b1727;color:#eef6ff}.cap-form{display:grid;gap:10px}${safeCss}</style></head><body>${CSS_PREVIEW}</body></html>`;
      return;
    }

    const output = $('capstoneOutput');
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

  async function submit() {
    if (!project) return;
    const code = $('capstoneEditor').value;

    if (language === 'csharp') {
      const compileResult = await runCSharp(code, $('capstoneOutput'));
      if (!compileResult?.success) {
        $('capstoneResult').innerHTML = `
          <div class=\"capstone-result-head\">
            <div><span>BUILD REQUIRED</span><strong>FIX CODE</strong></div>
            <p>Your C# capstone must compile successfully before the rubric can be scored. Fix the compiler/runtime errors shown in BUILD / OUTPUT, then submit again.</p>
          </div>`;
        return;
      }
    }

    const result = scoreProject(code);
    const firstPass = store.recordCapstoneAttempt(language, difficulty, {
      score: result.score,
      rubric: result.rubric,
      code
    });

    renderResult({
      at: new Date().toISOString(),
      score: result.score,
      passed: result.score >= passMark,
      rubric: result.rubric
    }, firstPass);

    $('capstoneBestScore').textContent = `${store.capstoneData(language, difficulty).bestScore}%`;
    $('capstoneStatus').textContent = store.capstoneData(language, difficulty).passed ? 'PASSED' : 'IN PROGRESS';
    $('capstoneStatus').className = `capstone-status ${store.capstoneData(language, difficulty).passed ? 'passed' : ''}`;
    learning.updateGlobalStats();
  }

  function scoreProject(code) {
    const rubric = [];
    let score = 0;

    project.requirements.forEach(requirement => {
      let passed = false;
      try { passed = Boolean(requirement.validator(code)); } catch { passed = false; }
      const earned = passed ? 15 : 0;
      score += earned;
      rubric.push({ label: `Module ${requirement.index + 1}: ${requirement.title}`, earned, possible: 15 });
    });

    const min = MIN_LENGTH[difficulty] || 180;
    const length = String(code).trim().length;
    const completeness = length >= min ? 15 : length >= Math.round(min * 0.65) ? 8 : length >= Math.round(min * 0.4) ? 4 : 0;
    score += completeness;
    rubric.push({ label: 'Project completeness', earned: completeness, possible: 15 });

    const starterNormalized = normalize(project.starter);
    const codeNormalized = normalize(code);
    let customization = 0;
    if (codeNormalized !== starterNormalized && length >= min) customization = 10;
    else if (codeNormalized !== starterNormalized && length >= Math.round(min * 0.55)) customization = 5;
    score += customization;
    rubric.push({ label: 'Meaningful customization', earned: customization, possible: 10 });

    return { score: Math.max(0, Math.min(100, score)), rubric };
  }

  function renderResult(attempt, firstPass) {
    const rubric = Array.isArray(attempt.rubric) ? attempt.rubric : [];
    const passed = Number(attempt.score || 0) >= passMark;
    $('capstoneResult').innerHTML = `
      <div class="capstone-result-head ${passed ? 'passed' : ''}">
        <div><span>${passed ? 'CAPSTONE PASSED' : 'KEEP BUILDING'}</span><strong>${Number(attempt.score || 0)}%</strong></div>
        <p>${passed ? (firstPass ? 'Excellent — the three final exams are now unlocked. First-pass XP awarded.' : 'This capstone meets the promotion requirement.') : `You need ${passMark}% to unlock the final exams.`}</p>
      </div>
      <div class="capstone-score-list">
        ${rubric.map(item => `<div class="${Number(item.earned) >= Number(item.possible) ? 'met' : ''}"><span>${escapeHtml(item.label)}</span><strong>${item.earned}/${item.possible}</strong></div>`).join('')}
      </div>`;
  }

  function back() {
    saveDraft(false);
    learning.renderRoadmap();
    navigator.show('roadmapScreen');
  }

  function formatValue(value) {
    if (typeof value === 'string') return value;
    try { return JSON.stringify(value); } catch { return String(value); }
  }

  function normalize(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }


  return {
    openCurrent,
    saveDraft,
    reset,
    run,
    submit,
    back
  };
}
