const ACADEMY_DIFFICULTIES = [
  {
    "id": "intern",
    "name": "Intern",
    "color": "#49ef9c",
    "rank": "I",
    "description": "Absolute foundations. Learn the vocabulary and core building blocks."
  },
  {
    "id": "junior",
    "name": "Junior",
    "color": "#4f8dff",
    "rank": "II",
    "description": "Practical beginner programming with larger exercises and debugging."
  },
  {
    "id": "intermediate",
    "name": "Intermediate",
    "color": "#ffd34d",
    "rank": "III",
    "description": "Combine systems, reason about structure and solve broader problems."
  },
  {
    "id": "senior",
    "name": "Senior",
    "color": "#ff923f",
    "rank": "IV",
    "description": "Advanced design, architecture, performance and professional patterns."
  },
  {
    "id": "advanced",
    "name": "Advanced",
    "color": "#ff4c5f",
    "rank": "V",
    "description": "Difficult concepts, deep problem solving and demanding assessments."
  }
];

const ACADEMY_LANGUAGE_META = {
  "html": {
    "name": "HTML",
    "accent": "#ff7849",
    "filename": "index.html",
    "description": "Structure webpages with semantic elements, forms, media and accessible markup.",
    "iconUrl": "assets/icons/html-symbol.svg",
    "iconFallback": "HTML5"
  },
  "css": {
    "name": "CSS",
    "accent": "#4f8dff",
    "filename": "styles.css",
    "description": "Control layout, spacing, typography, responsive design and polished visual systems.",
    "iconUrl": "assets/icons/css-symbol.svg",
    "iconFallback": "CSS3"
  },
  "javascript": {
    "name": "JavaScript",
    "accent": "#f4d64e",
    "filename": "app.js",
    "description": "Add logic, interactivity, state, events, functions and real application behaviour.",
    "iconUrl": "assets/icons/javascript-symbol.svg",
    "iconFallback": "JS"
  },
  "csharp": {
    "name": "C#",
    "accent": "#a86cff",
    "filename": "Program.cs",
    "description": "Learn strongly typed programming, methods, classes, collections and .NET application logic.",
    "iconUrl": "assets/icons/csharp-symbol.svg",
    "iconFallback": "C#"
  }
};


function has(text, term) {
  return String(text).toLowerCase().includes(String(term).toLowerCase());
}

function groupMatches(text, group) {
  return group.some(term => has(text, term));
}

function buildValidator(groups, minLength = 8) {
  return code => {
    const text = String(code || '').trim();
    return text.length >= minLength && groups.every(group => groupMatches(text, group));
  };
}

function escapeInline(text) {
  return String(text).replace(/[&<>]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[ch]));
}

const WRONG_SUMMARIES = {
  html: [
    'It is mainly a browser database mechanism for storing application records.',
    'It is a CSS-only technique for changing visual colors and spacing.',
    'It is a JavaScript runtime feature used to schedule asynchronous tasks.'
  ],
  css: [
    'It defines semantic document meaning instead of visual presentation.',
    'It is a C# compiler feature for generic type safety.',
    'It is a browser storage API for persisting JavaScript objects.'
  ],
  javascript: [
    'It is an HTML-only rule for document landmarks and heading hierarchy.',
    'It is a CSS layout feature that defines rows and columns.',
    'It is a C# type-system feature checked only by the .NET compiler.'
  ],
  csharp: [
    'It is a browser markup element used to create semantic page structure.',
    'It is a CSS selector rule used to match DOM elements.',
    'It is a JavaScript-only Web API that exists only in browsers.'
  ]
};

function topicQuestion(topic, language, conceptIndex = 0) {
  const concept = topic.concepts[conceptIndex % topic.concepts.length];
  const other = topic.concepts.filter(c => c !== concept).map(c => c.explanation);
  const options = [concept.explanation, ...other, `It means ${topic.title} can only be used for visual decoration.`].slice(0,4);
  return { type:'mc', prompt:`What best describes “${concept.name}” in this module?`, options, answer:concept.explanation };
}

function topicSummaryQuestion(topic, language) {
  return {
    type:'mc',
    prompt:`What is the main goal of “${topic.title}”?`,
    options:[topic.summary, ...WRONG_SUMMARIES[language]],
    answer:topic.summary
  };
}

function lessonFromTopic(topic, language, difficulty, index) {
  const sections = [
    { title:'Core idea', html:topic.summary, code:'' },
    ...topic.concepts.map(concept => ({
      title:concept.name,
      html:concept.explanation,
      code:''
    })),
    {
      title:'Worked example',
      html:'Read the example from top to bottom. Before changing it, explain what each important line contributes. Then change one value, selector, type, condition, or name and predict the result before running it.',
      code:topic.example
    },
    {
      title:'Common mistakes & debugging',
      html:(topic.pitfalls && topic.pitfalls.length)
        ? `<ul>${topic.pitfalls.map(item=>`<li>${item}</li>`).join('')}</ul>`
        : `<ul><li>Do not copy the syntax without being able to explain the role of the key pieces used in this lesson.</li><li>Change one thing at a time, then inspect the browser/compiler output before making another change.</li><li>Prefer the simplest correct feature that communicates intent clearly.</li></ul>`,
      code:''
    },
    {
      title:'Mastery checkpoint',
      html:(topic.mastery && topic.mastery.length)
        ? `<ul>${topic.mastery.map(item=>`<li>${item}</li>`).join('')}</ul>`
        : `<ul><li>Explain ${escapeInline(topic.title)} without reading the example.</li><li>Rebuild the core example with different names and values.</li><li>Recognize at least one situation where this feature is the wrong tool.</li><li>Complete the practice challenge without opening the hint if possible.</li></ul>`,
      code:''
    }
  ];

  const test = {
    title:`${ACADEMY_LANGUAGE_META[language].name} ${ACADEMY_DIFFICULTIES.find(d=>d.id===difficulty).name} — ${topic.title}`,
    questions:[
      topicSummaryQuestion(topic, language),
      topicQuestion(topic, language, 0),
      topicQuestion(topic, language, 1),
      { type:'code', prompt:`Write a short ${ACADEMY_LANGUAGE_META[language].name} example that demonstrates the essential syntax or structure from “${topic.title}”.`, validator:buildValidator(topic.groups.slice(0, Math.min(2, topic.groups.length)), 8) },
      { type:'code', prompt:`Apply “${topic.title}” to a small academy-themed example. Include the key feature(s) from the lesson.`, validator:buildValidator(topic.groups, 12) }
    ]
  };

  return {
    title:topic.title,
    intro:topic.summary,
    sections,
    starter:topic.example,
    references:topic.references,
    practice:{
      prompt:topic.challenge,
      details:'The checker looks for the important ideas from the lesson. There can be more than one valid solution.',
      hint:topic.hint,
      solution:topic.solution,
      validator:buildValidator(topic.groups, 10)
    },
    test
  };
}

function examFromTopics(language, difficulty, topics, examNumber) {
  const diffName = ACADEMY_DIFFICULTIES.find(d=>d.id===difficulty).name;
  const questions = [];
  topics.forEach((topic, index) => {
    questions.push(index % 2 === 0
      ? topicQuestion(topic, language, examNumber + index)
      : topicSummaryQuestion(topic, language));
  });
  topics.forEach((topic, index) => {
    const rotate = (examNumber + index) % topic.groups.length;
    const ordered = [...topic.groups.slice(rotate), ...topic.groups.slice(0, rotate)];
    const required = examNumber === 1 ? ordered.slice(0, Math.min(2, ordered.length))
                   : examNumber === 2 ? ordered.slice(0, Math.min(3, ordered.length))
                   : ordered;
    questions.push({
      type:'code',
      prompt:`Exam ${examNumber}: Create a fresh example demonstrating “${topic.title}”. Do not simply copy the lesson wording; change names/data/structure while preserving the concept.`,
      validator:buildValidator(required, examNumber === 3 ? 20 : 12)
    });
  });
  return { title:`${ACADEMY_LANGUAGE_META[language].name} ${diffName} Exam ${examNumber}`, questions };
}

function buildLevel(language, difficulty) {
  const topics = ACADEMY_TOPIC_DATA[language][difficulty];
  return {
    language:ACADEMY_LANGUAGE_META[language].name,
    difficulty:ACADEMY_DIFFICULTIES.find(d=>d.id===difficulty).name,
    lessons:topics.map((topic,index)=>lessonFromTopic(topic, language, difficulty, index)),
    exams:[1,2,3].map(n=>examFromTopics(language, difficulty, topics, n))
  };
}


const ACADEMY_CURRICULUM_FILES = Object.fromEntries(
  Object.keys(ACADEMY_LANGUAGE_META).map(language => [
    language,
    Object.fromEntries(
      ACADEMY_DIFFICULTIES.map(difficulty => [
        difficulty.id,
        `curriculum/${language}/${difficulty.id}.json`
      ])
    )
  ])
);

async function loadCurriculumTopics() {
  const topicData = {};

  await Promise.all(
    Object.entries(ACADEMY_CURRICULUM_FILES).flatMap(([language, levels]) => {
      topicData[language] = {};

      return Object.entries(levels).map(async ([difficulty, url]) => {
        const response = await fetch(url, { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(
            `Could not load ${language}/${difficulty} curriculum (${response.status}).`
          );
        }

        const document = await response.json();

        if (!document || !Array.isArray(document.topics)) {
          throw new Error(`Invalid curriculum file: ${url}`);
        }

        topicData[language][difficulty] = document.topics;
      });
    })
  );

  return topicData;
}

let ACADEMY_TOPIC_DATA = {};

async function loadAcademyData() {
  ACADEMY_TOPIC_DATA = await loadCurriculumTopics();

  return {
    languages: Object.fromEntries(
      Object.entries(ACADEMY_LANGUAGE_META).map(([id, meta]) => [
        id,
        {
          ...meta,
          levels: Object.fromEntries(
            ACADEMY_DIFFICULTIES.map(difficulty => [
              difficulty.id,
              buildLevel(id, difficulty.id)
            ])
          )
        }
      ])
    ),
    difficulties: ACADEMY_DIFFICULTIES
  };
}

window.AcademyCurriculum = Object.freeze({
  load: loadAcademyData,
  difficulties: ACADEMY_DIFFICULTIES,
  languages: ACADEMY_LANGUAGE_META
});
