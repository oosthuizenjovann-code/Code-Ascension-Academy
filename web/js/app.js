(() => {
  const PASS_MARK = 80;
  const HINT_SECONDS = 300;
  const difficultyIds = ACADEMY_DATA.difficulties.map(d=>d.id);
  let state = defaultState();
  let nav = {language:null,difficulty:null,lessonIndex:null,assessment:null,returnScreen:'academyScreen'};
  let testSession = null;
  let hintInterval = null;

  const $ = id => document.getElementById(id);
  const screens = [...document.querySelectorAll('.screen')];
  document.addEventListener('click', onClick);
  $('importSaveInput').addEventListener('change', importSave);

  initialize();

  async function initialize(){
    const saved = await DesktopBridge.loadProgress();
    state = normalizeState(saved || defaultState());
    renderLanguages();
    updateGlobalStats();
  }

  function defaultState(){
    const progress={};
    Object.keys(ACADEMY_DATA.languages).forEach(lang=>{
      progress[lang]={};
      difficultyIds.forEach((d,i)=>progress[lang][d]={unlocked:i===0,lessons:{},tests:{},exams:{}});
    });
    return {version:2,xp:0,hintsUsed:0,progress};
  }
  function normalizeState(saved){
    const base=defaultState();
    if(!saved || typeof saved!=='object') return base;
    base.version=2;
    base.xp=Number(saved.xp)||0;
    base.hintsUsed=Number(saved.hintsUsed)||0;
    Object.keys(base.progress).forEach(lang=>{
      difficultyIds.forEach(diff=>{
        const old=saved.progress?.[lang]?.[diff];
        if(!old)return;
        base.progress[lang][diff].unlocked=!!old.unlocked || diff==='intern';
        base.progress[lang][diff].lessons={...(old.lessons||{})};
        base.progress[lang][diff].tests={...(old.tests||{})};
        base.progress[lang][diff].exams={...(old.exams||{})};
      });
    });
    return base;
  }
  function save(){ DesktopBridge.saveProgress(state); updateGlobalStats(); }
  function show(id){screens.forEach(s=>s.classList.remove('active'));$(id).classList.add('active');window.scrollTo(0,0)}

  function onClick(e){
    const action=e.target.closest('[data-action]')?.dataset.action;
    const lang=e.target.closest('[data-language]')?.dataset.language;
    const diff=e.target.closest('[data-difficulty]')?.dataset.difficulty;
    const node=e.target.closest('[data-node]')?.dataset.node;
    const nodeIndex=Number(e.target.closest('[data-node-index]')?.dataset.nodeIndex);
    if(lang){openLanguage(lang);return}
    if(diff){openDifficulty(diff);return}
    if(node){openNode(node,nodeIndex);return}
    if(!action)return;
    ({
      start:()=>show('academyScreen'),quit:()=>DesktopBridge.quit(),'back-start':()=>show('startupScreen'),
      'back-languages':()=>show('academyScreen'),'back-difficulties':()=>{renderDifficulties();show('difficultyScreen')},'back-roadmap':()=>{renderRoadmap();show('roadmapScreen')},
      'complete-lesson':completeLesson,'start-practice':startPractice,'back-lesson':()=>openLesson(nav.lessonIndex),'run-code':()=>runEditor($('lessonEditor').value,$('lessonOutput')),
      'reset-code':()=>{$('lessonEditor').value=currentLesson().starter;runEditor($('lessonEditor').value,$('lessonOutput'))},'show-hint':showHint,'check-practice':checkPractice,
      'run-practice':()=>runEditor($('practiceEditor').value,$('practiceOutput')),'abort-test':()=>{testSession=null;renderRoadmap();show('roadmapScreen')},'submit-answer':submitAnswer,
      'results-roadmap':()=>{renderRoadmap();show('roadmapScreen')},'open-references':openReferenceLibrary,'references-back':()=>show('academyScreen'),'open-profile':openProfile,'profile-back':()=>show(nav.returnScreen||'academyScreen'),
      'open-settings':()=>{nav.returnScreen='academyScreen';show('settingsScreen')},'settings-back':()=>show(nav.returnScreen||'academyScreen'),'export-save':exportSave,
      'reset-progress':resetProgress,'print-lesson':()=>window.print()
    })[action]?.();
  }

  function renderLanguages(){
    const root=$('languageGrid');root.innerHTML='';
    Object.entries(ACADEMY_DATA.languages).forEach(([id,l])=>{
      const p=languagePercent(id);
      root.insertAdjacentHTML('beforeend',`<article class="language-card glass-panel" data-language="${id}" style="--accent:${l.accent}"><div class="language-icon"><img src="${l.iconUrl}" alt="${l.name} language logo" loading="eager" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="language-icon-fallback" hidden>${l.iconFallback}</span></div><h3>${l.name}</h3><p>${l.description}</p><div class="language-footer"><div class="mini-progress"><div style="width:${p}%"></div></div><strong>${p}%</strong></div></article>`)
    });
  }
  function openLanguage(id){nav.language=id;renderDifficulties();show('difficultyScreen')}
  function renderDifficulties(){
    const l=ACADEMY_DATA.languages[nav.language];$('difficultyTitle').textContent=l.name;$('difficultyEyebrow').textContent=`${l.name.toUpperCase()} LEARNING PATH`;$('languageProgress').textContent=languagePercent(nav.language)+'%';
    $('difficultyGrid').innerHTML='';
    ACADEMY_DATA.difficulties.forEach((d,i)=>{
      const prog=state.progress[nav.language][d.id];const available=!!l.levels[d.id];const locked=!prog.unlocked||!available;
      const p=difficultyPercent(nav.language,d.id);
      $('difficultyGrid').insertAdjacentHTML('beforeend',`<article class="difficulty-card glass-panel ${locked?'locked':''}" ${locked?'':`data-difficulty="${d.id}"`} style="--rank:${d.color}"><div class="rank-number">${d.rank}</div><h3>${d.name}</h3><p>${d.description}</p><div class="lock-label">${!available?'CURRICULUM EXPANSION PENDING':locked?'LOCKED':`${p}% COMPLETE`}</div></article>`)
    });
  }
  function openDifficulty(id){nav.difficulty=id;renderRoadmap();show('roadmapScreen')}
  function currentLevel(){return ACADEMY_DATA.languages[nav.language].levels[nav.difficulty]}
  function currentLesson(){return currentLevel().lessons[nav.lessonIndex]}
  function renderRoadmap(){
    const level=currentLevel(),d=ACADEMY_DATA.difficulties.find(x=>x.id===nav.difficulty),prog=state.progress[nav.language][nav.difficulty];
    $('roadmapLanguage').textContent=level.language.toUpperCase();$('roadmapDifficulty').textContent=`${d.name} Roadmap`;$('rankName').textContent=d.name;$('rankDescription').textContent=d.description;$('rankEmblem').textContent=d.rank;$('rankEmblem').parentElement.style.setProperty('--rank-color',d.color);$('difficultyProgress').textContent=difficultyPercent(nav.language,nav.difficulty)+'%';
    $('lessonsDone').textContent=`${Object.values(prog.lessons).filter(Boolean).length}/5`;$('testsDone').textContent=`${Object.values(prog.tests).filter(v=>v>=PASS_MARK).length}/5`;$('examsDone').textContent=`${Object.values(prog.exams).filter(v=>v>=PASS_MARK).length}/3`;
    const root=$('roadmapNodes');root.innerHTML='';
    level.lessons.forEach((ls,i)=>{
      const lessonDone=!!prog.lessons[i],testPassed=(prog.tests[i]||0)>=PASS_MARK,unlocked=i===0||((prog.tests[i-1]||0)>=PASS_MARK);
      node(root,{number:i+1,title:`Level ${i+1}: ${ls.title}`,desc:unlocked?(testPassed?'Completed — replay lesson or retake the test.':lessonDone?'Lesson complete — class test unlocked.':'Study the lesson, practice, then take the class test.'):'Pass the previous class test to unlock.',color:d.color,locked:!unlocked,completed:testPassed,buttons:unlocked?`<button class="glow-button small ghost" data-node="lesson" data-node-index="${i}">${lessonDone?'REVIEW LESSON':'OPEN LESSON'}</button>${lessonDone?`<button class="glow-button small primary" data-node="test" data-node-index="${i}">${testPassed?'RETAKE TEST':'CLASS TEST'}</button>`:''}`:''});
    });
    const allTests=level.lessons.every((_,i)=>(prog.tests[i]||0)>=PASS_MARK);
    level.exams.forEach((exam,i)=>{const pass=(prog.exams[i]||0)>=PASS_MARK;const unlocked=allTests&&(i===0||(prog.exams[i-1]||0)>=PASS_MARK);node(root,{number:`E${i+1}`,title:exam.title,desc:unlocked?(pass?'Passed — retake at any time.':`Mixed questions from all five class modules. Pass mark: ${PASS_MARK}%.`):'Complete the required class tests/exam first.',color:d.color,locked:!unlocked,completed:pass,buttons:unlocked?`<button class="glow-button small primary" data-node="exam" data-node-index="${i}">${pass?'RETAKE EXAM':'START EXAM'}</button>`:''})});
  }
  function node(root,n){root.insertAdjacentHTML('beforeend',`<div class="road-node ${n.locked?'locked':''} ${n.completed?'completed':''}" style="--node-color:${n.color}"><div class="node-orb">${n.locked?'🔒':n.number}</div><div class="node-info"><h3>${n.title}</h3><p>${n.desc}</p><div class="node-actions">${n.buttons}</div></div></div>`)}
  function openNode(type,index){if(type==='lesson')openLesson(index);if(type==='test')startAssessment('test',index);if(type==='exam')startAssessment('exam',index)}
  function openLesson(index){
    nav.lessonIndex=index;const l=currentLesson(),lang=ACADEMY_DATA.languages[nav.language];$('lessonContext').textContent=`${lang.name.toUpperCase()} // ${nav.difficulty.toUpperCase()} // LEVEL ${index+1}`;$('lessonTitle').textContent=l.title;$('editorFilename').textContent=lang.filename;$('lessonEditor').value=l.starter;
    const body=$('lessonBody');body.innerHTML=`<div class="lesson-kicker">LEARNING MATERIAL</div><p class="lesson-intro">${l.intro}</p>`;
    l.sections.forEach((s,i)=>body.insertAdjacentHTML('beforeend',`<section class="lesson-section"><div class="section-number">${i+1}</div><div><h3>${s.title}</h3><div class="section-content">${s.html.startsWith('<ul>')?s.html:`<p>${s.html}</p>`}${s.code?`<pre>${escapeHtml(s.code)}</pre>`:''}</div></div></section>`));
    if(l.references?.length){
      body.insertAdjacentHTML('beforeend',`<section class="reference-panel"><div class="lesson-kicker">OFFICIAL REFERENCES</div><h3>Continue with the authoritative documentation</h3><p>These lessons are original Academy explanations. Use the official documentation below when you want deeper detail or a complete language reference.</p><div class="reference-links">${l.references.map(ref=>`<a href="${ref.url}" target="_blank" rel="noopener noreferrer">${ref.title}<span>↗</span></a>`).join('')}</div></section>`);
    }
    $('lessonOutput').textContent='Ready. Edit the example and press RUN.';show('lessonScreen');
  }
  function completeLesson(){const prog=state.progress[nav.language][nav.difficulty];if(!prog.lessons[nav.lessonIndex]){prog.lessons[nav.lessonIndex]=true;state.xp+=50;save()}renderRoadmap();show('roadmapScreen')}
  function startPractice(){const p=currentLesson().practice;$('practiceTitle').textContent=currentLesson().title;$('practicePrompt').textContent=p.prompt;$('practiceDetails').textContent=(p.details?p.details+' ':'')+'Try to solve this yourself. A hint becomes available after five minutes.';$('practiceFilename').textContent=ACADEMY_DATA.languages[nav.language].filename;$('practiceEditor').value='';$('practiceOutput').textContent='Write your solution, then check your answer.';$('hintBox').classList.add('hidden');$('hintButton').disabled=true;$('hintButton').textContent='HINT LOCKED';startHintTimer();show('practiceScreen')}
  function startHintTimer(){clearInterval(hintInterval);let remaining=HINT_SECONDS;const paint=()=>{$('hintTimer').textContent=`${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')}`};paint();hintInterval=setInterval(()=>{remaining--;paint();if(remaining<=0){clearInterval(hintInterval);$('hintButton').disabled=false;$('hintButton').textContent='SHOW HINT'}},1000)}
  function showHint(){const box=$('hintBox');box.textContent=currentLesson().practice.hint;box.classList.remove('hidden');state.hintsUsed++;save()}
  function checkPractice(){const p=currentLesson().practice,code=$('practiceEditor').value;let ok=false;try{ok=p.validator(code)}catch{}$('practiceOutput').textContent=ok?'✓ Correct. You met the challenge requirements.':'✕ Not quite. Re-read the requirement and compare your structure with the lesson. You can keep trying.';if(ok)state.xp+=10;save()}

  function runEditor(code,out){
    const lang=nav.language;
    if(lang==='html'){out.textContent='HTML preview opened below:\n\n'+stripTagsSummary(code);const w=window.open('','_blank','width=760,height=600');if(w){w.document.open();w.document.write(code);w.document.close()}return}
    if(lang==='css'){
      out.textContent='CSS preview opened in a separate window. The preview contains common academy components so you can experiment with selectors, layout, typography and responsive rules.';
      const w=window.open('','_blank','width=900,height=700');
      if(w){
        const safeCss=String(code).replace(/<\/style/gi,'<\\/style');
        w.document.open();
        w.document.write(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CSS Academy Preview</title><style>body{font-family:system-ui,sans-serif;background:#0b1220;color:#eaf2ff;padding:24px}.preview-shell{max-width:900px;margin:auto}.course-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.course-card{background:#121d2d;border:1px solid #2b405d;border-radius:14px;padding:18px}.toolbar{display:flex;gap:10px;align-items:center;justify-content:space-between;margin-bottom:20px}.button{border:1px solid #4fdcff;background:#12263b;color:#eaf2ff;border-radius:9px;padding:10px 14px}input{padding:10px;border-radius:8px;border:1px solid #41516a;background:#0a101a;color:white} ${safeCss}</style></head><body><div class="preview-shell"><div class="toolbar"><h1>Code Ascension Preview</h1><button class="button">Action</button></div><p>Resize this window to test responsive rules.</p><div class="course-grid"><article class="course-card featured"><h2>HTML</h2><p>Structure and semantics.</p><button class="button">Open</button></article><article class="course-card"><h2>CSS</h2><p>Layout and visual systems.</p><input placeholder="Try form selectors"></article><article class="course-card"><h2>JavaScript</h2><p>Logic and interactivity.</p></article></div></div></body></html>`);
        w.document.close();
      }
      return
    }
    if(lang==='javascript'){const logs=[];try{const fake={log:(...a)=>logs.push(a.join(' '))};new Function('console',code)(fake);out.textContent=logs.length?logs.join('\n'):'Program completed with no console output.'}catch(err){out.textContent='ERROR: '+err.message}return}
    if(lang==='csharp'){out.textContent='C# PRACTICE\n\nUse SUBMIT to check your solution against the exercise requirements. RUN displays your current code for review.\n\nYour code:\n'+code}
  }
  function stripTagsSummary(code){return code.replace(/<script[\s\S]*?<\/script>/gi,'[script]').replace(/<style[\s\S]*?<\/style>/gi,'[style]').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().slice(0,300)}

  function startAssessment(kind,index){
    const source=kind==='test'?currentLevel().lessons[index].test:currentLevel().exams[index];testSession={kind,index,questions:shuffle(source.questions.map(q=>({...q,options:q.options?[...q.options]:undefined}))),pos:0,correct:0,answers:[],selected:null};nav.assessment={kind,index};$('testEyebrow').textContent=kind==='test'?'CLASS TEST':'FINAL EXAM';$('testTitle').textContent=source.title;renderQuestion();show('testScreen')
  }
  function renderQuestion(){const s=testSession,q=s.questions[s.pos];$('questionCounter').textContent=`${s.pos+1}/${s.questions.length}`;$('testProgressFill').style.width=`${((s.pos+1)/s.questions.length)*100}%`;$('testQuestionType').textContent=q.type==='mc'?'MULTIPLE CHOICE':'CODE RESPONSE';$('testQuestion').textContent=q.prompt;const area=$('answerArea');area.innerHTML='';s.selected=null;
    if(q.type==='mc')shuffle(q.options).forEach(opt=>{const b=document.createElement('button');b.className='answer-option';b.textContent=opt;b.onclick=()=>{[...area.children].forEach(x=>x.classList.remove('selected'));b.classList.add('selected');s.selected=opt};area.appendChild(b)})
    else {const ta=document.createElement('textarea');ta.className='answer-input';ta.placeholder='Write your code here...';ta.oninput=()=>s.selected=ta.value;area.appendChild(ta)}
  }
  function submitAnswer(){const s=testSession,q=s.questions[s.pos];if(s.selected===null||String(s.selected).trim()===''){alert('Please answer the question first.');return}let correct=q.type==='mc'?s.selected===q.answer:!!q.validator(s.selected);if(correct)s.correct++;s.answers.push({correct});s.pos++;if(s.pos<s.questions.length)renderQuestion();else finishAssessment()}
  function finishAssessment(){const s=testSession,score=Math.round((s.correct/s.questions.length)*100),passed=score>=PASS_MARK,prog=state.progress[nav.language][nav.difficulty],key=s.index;if(s.kind==='test')prog.tests[key]=Math.max(prog.tests[key]||0,score);else prog.exams[key]=Math.max(prog.exams[key]||0,score);if(passed)state.xp+=s.kind==='test'?100:250;unlockIfComplete();save();$('resultBadge').textContent=score+'%';$('resultBadge').style.borderColor=passed?'#49ef9c':'#ff4c5f';$('resultBadge').style.color=passed?'#49ef9c':'#ff4c5f';$('resultEyebrow').textContent=s.kind==='test'?'CLASS TEST COMPLETE':'FINAL EXAM COMPLETE';$('resultTitle').textContent=passed?'PASS':'NOT PASSED';$('resultMessage').textContent=passed?`You reached the required ${PASS_MARK}% mark. Progress has been saved locally.`:`You need ${PASS_MARK}% to pass. Review the material and try again when ready.`;$('resultBreakdown').innerHTML=`<div><span>SCORE</span><strong>${score}%</strong></div><div><span>CORRECT</span><strong>${s.correct}/${s.questions.length}</strong></div><div><span>REQUIRED</span><strong>${PASS_MARK}%</strong></div>`;show('resultsScreen')}
  function unlockIfComplete(){const level=currentLevel(),prog=state.progress[nav.language][nav.difficulty];if(level.exams.every((_,i)=>(prog.exams[i]||0)>=PASS_MARK)){const idx=difficultyIds.indexOf(nav.difficulty);if(idx>=0&&idx<difficultyIds.length-1)state.progress[nav.language][difficultyIds[idx+1]].unlocked=true}}

  function difficultyPercent(lang,diff){const l=ACADEMY_DATA.languages[lang].levels[diff];if(!l)return 0;const p=state.progress[lang][diff];let done=0,total=13;l.lessons.forEach((_,i)=>{if(p.lessons[i])done++;if((p.tests[i]||0)>=PASS_MARK)done++});l.exams.forEach((_,i)=>{if((p.exams[i]||0)>=PASS_MARK)done++});return Math.round(done/total*100)}
  function languagePercent(lang){const avail=Object.keys(ACADEMY_DATA.languages[lang].levels);if(!avail.length)return 0;return Math.round(avail.reduce((a,d)=>a+difficultyPercent(lang,d),0)/avail.length)}
  function overallPercent(){const ids=Object.keys(ACADEMY_DATA.languages);return Math.round(ids.reduce((a,l)=>a+languagePercent(l),0)/ids.length)}
  function updateGlobalStats(){if(!$('overallProgressText'))return;$('overallProgressText').textContent=overallPercent()+'%';$('overallProgressBar').style.width=overallPercent()+'%';$('xpValue').textContent=state.xp;renderLanguages()}
  function openReferenceLibrary(){
    const root=$('referenceLibraryGrid');root.innerHTML='';
    Object.entries(ACADEMY_DATA.languages).forEach(([id,lang])=>{
      const seen=new Map();
      Object.values(lang.levels).forEach(level=>level.lessons.forEach(lesson=>(lesson.references||[]).forEach(ref=>seen.set(ref.url,ref))));
      const links=[...seen.values()].map(ref=>`<a href="${ref.url}" target="_blank" rel="noopener noreferrer">${ref.title}<span>↗</span></a>`).join('');
      root.insertAdjacentHTML('beforeend',`<article class="reference-library-card glass-panel" style="--accent:${lang.accent}"><div class="reference-library-heading"><div class="language-icon"><img src="${lang.iconUrl}" alt="${lang.name} language logo" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="language-icon-fallback" hidden>${lang.iconFallback}</span></div><div><div class="eyebrow">${lang.name.toUpperCase()}</div><h3>${lang.name} Documentation</h3></div></div><p>${seen.size} curated official references used across the ${lang.name} curriculum.</p><div class="reference-links reference-library-links">${links}</div></article>`);
    });
    show('referenceScreen');
  }

  function openProfile(){nav.returnScreen='academyScreen';$('profileXp').textContent=state.xp;$('profileHints').textContent=state.hintsUsed;let tests=0,exams=0;Object.values(state.progress).forEach(l=>Object.values(l).forEach(d=>{tests+=Object.values(d.tests).filter(x=>x>=PASS_MARK).length;exams+=Object.values(d.exams).filter(x=>x>=PASS_MARK).length}));$('profileTests').textContent=tests;$('profileExams').textContent=exams;$('profileLanguages').innerHTML=Object.entries(ACADEMY_DATA.languages).map(([id,l])=>`<div class="profile-language-row"><strong>${l.name}</strong><div class="progress-track"><div class="progress-fill" style="width:${languagePercent(id)}%"></div></div><span>${languagePercent(id)}%</span></div>`).join('');show('profileScreen')}
  function exportSave(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`CodeAscension_Save_${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(a.href)}
  function importSave(e){const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{try{const parsed=JSON.parse(r.result);if(!parsed.progress)throw new Error('Invalid save');state=normalizeState(parsed);save();alert('Save imported successfully.');show('academyScreen')}catch{alert('That file is not a valid Code Ascension save.')}};r.readAsText(file);e.target.value=''}
  function resetProgress(){if(confirm('Erase every score, unlock, lesson completion and XP value?')){state=defaultState();save();renderDifficulties();show('academyScreen')}}
  function shuffle(arr){return [...arr].sort(()=>Math.random()-.5)}
  function escapeHtml(str){return str.replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]))}
})();
