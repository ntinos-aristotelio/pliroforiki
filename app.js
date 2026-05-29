
const app = document.getElementById('app');
const QUESTIONS = window.WORD_QUESTIONS || [];
const LESSONS = window.WORD_LESSONS || [];
const guideImage = id => `assets/${id}.png`;
const store = {
  get repeat(){ return JSON.parse(localStorage.getItem('wordRepeatV2') || '[]'); },
  set repeat(v){ localStorage.setItem('wordRepeatV2', JSON.stringify([...new Set(v)])); },
  get done(){ return JSON.parse(localStorage.getItem('wordDoneV2') || '[]'); },
  set done(v){ localStorage.setItem('wordDoneV2', JSON.stringify([...new Set(v)])); }
};
let state = {lessonIndex:0, practiceIndex:0, practicePool:shuffle([...QUESTIONS]), test:null};
function shuffle(arr){ return arr.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]); }
function esc(s){ return String(s ?? '').replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function byId(id){ return QUESTIONS.find(q=>q.id===id); }
function setView(html){ app.innerHTML = html; window.scrollTo({top:0, behavior:'smooth'}); }
function home(){
  const repeatCount = store.repeat.length;
  setView(`
    <section class="card hero">
      <div>
        <span class="pill">Μόνο Word • ${QUESTIONS.length} ερωτήσεις</span>
        <h2>Ένας απλός δρόμος για τον μαθητή</h2>
        <p>Όχι πολλά μενού, όχι άσχετες εικόνες. Πρώτα βλέπει το σωστό σημείο στο Word, μετά κάνει ερωτήσεις και στο τέλος ένα μικρό τεστ.</p>
        <div class="mode-grid">
          <button class="mode" onclick="lessons()"><div class="icon">1</div><h3>Μαθαίνω</h3><p>10 καθαρές καρτέλες με πραγματικές εικόνες Word.</p></button>
          <button class="mode" onclick="practice()"><div class="icon">2</div><h3>Εξάσκηση</h3><p>Μία ερώτηση τη φορά, με βήματα και εικόνα.</p></button>
          <button class="mode" onclick="startTest()"><div class="icon">3</div><h3>Μικρό τεστ</h3><p>12 τυχαίες ερωτήσεις Word.</p></button>
        </div>
        <div class="actions"><button class="secondary" onclick="repeatView()">Θέλω επανάληψη (${repeatCount})</button></div>
        <p class="small-note">Δοκιμή ύφους: κρατάμε απλό μενού και διορθώνουμε πρώτα το Word πριν πάμε στα υπόλοιπα.</p>
      </div>
      <img class="hero-img" src="assets/font.png" alt="Πραγματικός οδηγός Word για τη μορφοποίηση κειμένου">
    </section>
  `);
}
function lessons(){
  const l = LESSONS[state.lessonIndex] || LESSONS[0];
  const count = QUESTIONS.filter(q=>q.guide===l.id).length;
  setView(`
    <div class="toolbar"><button class="back" onclick="home()">← Αρχική</button><span class="pill">Μαθαίνω Word</span></div>
    <section class="card lesson-layout">
      <div class="lesson-list">
        ${LESSONS.map((x,i)=>`<button class="lesson-item ${i===state.lessonIndex?'active':''}" onclick="state.lessonIndex=${i};lessons()"><b>${i+1}. ${esc(x.title)}</b><span>${esc(x.subtitle)}</span></button>`).join('')}
      </div>
      <div class="lesson-view">
        <h2>${esc(l.title)}</h2>
        <p class="route">${esc(l.route)}</p>
        <img class="guide-img" src="${esc(l.image)}" alt="${esc(l.title)}">
        <div class="notice"><b>Λογική:</b> ο μαθητής βλέπει την πραγματική καρτέλα/ομάδα και κρατάει μόνο τη σύντομη διαδρομή εξέτασης.</div>
        <div class="actions">
          <button class="secondary" onclick="prevLesson()">Προηγούμενο</button>
          <button class="primary" onclick="nextLesson()">Επόμενο</button>
          <button class="secondary" onclick="practice('${esc(l.id)}')">Ερωτήσεις εδώ (${count})</button>
        </div>
      </div>
    </section>
  `);
}
function nextLesson(){ state.lessonIndex = (state.lessonIndex+1) % LESSONS.length; lessons(); }
function prevLesson(){ state.lessonIndex = (state.lessonIndex-1+LESSONS.length) % LESSONS.length; lessons(); }
function practice(guide=null){
  let pool = guide ? QUESTIONS.filter(q=>q.guide===guide) : state.practicePool;
  if(!pool.length) pool = state.practicePool;
  const idxKey = guide ? `practice_${guide}` : 'practiceIndex';
  if(state[idxKey] == null) state[idxKey] = 0;
  const idx = state[idxKey] % pool.length;
  const q = pool[idx];
  renderQuestion(q, {
    title:'Εξάσκηση Word', counter:`${idx+1}/${pool.length}`, back:`${guide ? 'lessons()' : 'home()'}`,
    next:`state['${idxKey}']=${idx+1}; practice(${guide?`'${guide}'`:'null'})`
  });
}
function renderQuestion(q, opts={}){
  setView(`
    <div class="toolbar"><button class="back" onclick="${opts.back || 'home()'}">← Πίσω</button><span class="counter">${esc(opts.counter || '')}</span></div>
    <section class="card question-card">
      <div class="meta"><span class="tag">${esc(q.test)}</span><span class="tag">Ερ. ${esc(q.number)}</span><span class="tag">${esc(q.guideTitle)}</span><span class="tag ${q.difficulty==='Προσοχή'?'warn':''}">${esc(q.difficulty)}</span></div>
      <h2>${esc(opts.title || 'Ερώτηση')}</h2>
      <p class="question-text">${esc(q.question)}</p>
      <p class="route">${esc(q.route)}</p>
      <div class="actions">
        <button class="primary" onclick="toggleAnswer('${q.id}')">Δείξε βήματα</button>
        <button class="secondary" onclick="toggleGuide('${q.id}')">Δείξε εικόνα</button>
        <button class="success" onclick="markDone('${q.id}')">Το ξέρω</button>
        <button class="danger" onclick="markRepeat('${q.id}')">Θέλω επανάληψη</button>
      </div>
      <div id="answer-${q.id}" class="answer hidden"><h3>Βήματα λύσης</h3><ol class="steps">${q.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><h3>Σύντομη απάντηση</h3><p><b>${esc(q.route)}</b></p></div>
      <div id="guide-${q.id}" class="answer hidden"><h3>Σχετική εικόνα Word</h3><img class="guide-img" src="${guideImage(q.guide)}" alt="${esc(q.guideTitle)}"><p class="image-source">Η εικόνα εμφανίζεται μόνο όταν αντιστοιχεί στην ενότητα της ερώτησης.</p></div>
      <div class="actions"><button class="secondary" onclick="${opts.next || 'practice()'}">Επόμενη ερώτηση →</button></div>
    </section>
  `);
}
function toggleAnswer(id){ document.getElementById(`answer-${id}`).classList.toggle('hidden'); }
function toggleGuide(id){ document.getElementById(`guide-${id}`).classList.toggle('hidden'); }
function markDone(id){ store.done = [...store.done, id]; toast('Σημειώθηκε ως γνωστό.'); }
function markRepeat(id){ store.repeat = [...store.repeat, id]; toast('Μπήκε για επανάληψη.'); }
function toast(msg){ const t=document.createElement('div'); t.textContent=msg; t.style.cssText='position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#122037;color:#fff;padding:12px 16px;border-radius:999px;z-index:20;box-shadow:0 14px 35px rgba(0,0,0,.22);font-weight:800'; document.body.appendChild(t); setTimeout(()=>t.remove(),1600); }
function repeatView(){
  const list = store.repeat.map(byId).filter(Boolean);
  setView(`<div class="toolbar"><button class="back" onclick="home()">← Αρχική</button><span class="pill">Επανάληψη</span></div><section class="card"><h2>Ερωτήσεις που θέλουν επανάληψη</h2>${list.length ? `<div class="repeat-list">${list.map(q=>`<div class="miniq"><b>${esc(q.question)}</b><p class="route">${esc(q.route)}</p><div class="actions"><button class="primary" onclick="renderQuestion(byId('${q.id}'),{title:'Επανάληψη',back:'repeatView()',next:'repeatView()'})">Άνοιγμα</button><button class="secondary" onclick="removeRepeat('${q.id}')">Το έμαθα</button></div></div>`).join('')}</div>` : `<div class="empty">Δεν υπάρχουν ακόμα ερωτήσεις για επανάληψη.</div>`}</section>`);
}
function removeRepeat(id){ store.repeat = store.repeat.filter(x=>x!==id); repeatView(); }
function startTest(){ state.test = {pool:shuffle([...QUESTIONS]).slice(0,12), index:0, known:[], repeat:[]}; renderTest(); }
function renderTest(){
  const t = state.test; if(t.index >= t.pool.length) return testResult();
  const q=t.pool[t.index]; const pct=Math.round((t.index/t.pool.length)*100);
  setView(`<div class="toolbar"><button class="back" onclick="home()">← Ακύρωση</button><span class="counter">${t.index+1}/${t.pool.length}</span></div><section class="card question-card"><div class="progress-wrap"><div class="progress-bar" style="width:${pct}%"></div></div><div class="meta"><span class="tag">${esc(q.guideTitle)}</span><span class="tag ${q.difficulty==='Προσοχή'?'warn':''}">${esc(q.difficulty)}</span></div><h2>Μικρό τεστ Word</h2><p class="question-text">${esc(q.question)}</p><div class="actions"><button class="primary" onclick="toggleAnswer('${q.id}')">Έλεγχος απάντησης</button><button class="secondary" onclick="toggleGuide('${q.id}')">Δείξε εικόνα</button></div><div id="answer-${q.id}" class="answer hidden"><h3>Απάντηση</h3><ol class="steps">${q.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></div><div id="guide-${q.id}" class="answer hidden"><h3>Σχετική εικόνα Word</h3><img class="guide-img" src="${guideImage(q.guide)}" alt="${esc(q.guideTitle)}"></div><div class="actions"><button class="success" onclick="testKnown('${q.id}')">Το ήξερα</button><button class="danger" onclick="testRepeat('${q.id}')">Δεν το ήξερα</button></div></section>`);
}
function testKnown(id){ state.test.known.push(id); state.test.index++; renderTest(); }
function testRepeat(id){ state.test.repeat.push(id); store.repeat = [...store.repeat, id]; state.test.index++; renderTest(); }
function testResult(){
  const t=state.test; const pct=Math.round((t.known.length/t.pool.length)*100); const cats={};
  t.repeat.map(byId).filter(Boolean).forEach(q=>cats[q.guideTitle]=(cats[q.guideTitle]||0)+1);
  const weak=Object.entries(cats).sort((a,b)=>b[1]-a[1]);
  setView(`<div class="toolbar"><button class="back" onclick="home()">← Αρχική</button><span class="pill">Αποτέλεσμα</span></div><section class="card"><h2>Αποτέλεσμα μικρού τεστ</h2><div class="test-result"><div class="stat"><span>Ποσοστό</span><b>${pct}%</b></div><div class="stat"><span>Το ήξερα</span><b>${t.known.length}</b></div><div class="stat"><span>Επανάληψη</span><b>${t.repeat.length}</b></div></div>${weak.length ? `<h3>Πού χρειάζεται επανάληψη</h3><div class="repeat-list">${weak.map(([k,v])=>`<div class="miniq"><b>${esc(k)}</b><p>${v} ερώτηση/εις</p></div>`).join('')}</div>` : `<div class="notice">Τέλεια. Δεν σημειώθηκε κάτι για επανάληψη.</div>`}<div class="actions"><button class="primary" onclick="startTest()">Νέο τεστ</button><button class="secondary" onclick="repeatView()">Δες επανάληψη</button></div></section>`);
}
document.getElementById('homeBtn').addEventListener('click', home);
document.getElementById('resetProgress').addEventListener('click', ()=>{ if(confirm('Να καθαριστεί η πρόοδος;')){localStorage.removeItem('wordRepeatV2'); localStorage.removeItem('wordDoneV2'); home();} });
home();
