const QUESTIONS = (window.EXPRESS_QUESTIONS || []).map((q, index) => ({
  ...q,
  id: `${q.archive}-${q.file}-${q.number}-${index}`,
  guideId: null
}));

const VISUAL_GUIDES = [
  {
    id: 'word-format',
    module: 'Word',
    title: 'Word: Μορφοποίηση κειμένου και παραγράφου',
    description: 'Για έντονα, πλάγια, υπογράμμιση, χρώμα, επισήμανση, στοίχιση, κουκκίδες, περιγράμματα και σκίαση.',
    image: 'assets/guide-word-format.svg',
    tags: ['γραμματοσειρά','πλάγια','έντονα','υπογράμμιση','χρώμα','επισήμανση','παράγραφο','περίγραμμα','σκίαση','κουκκίδες','στοίχιση','διάστιχο'],
    steps: ['Επίλεξε πρώτα το κείμενο ή την παράγραφο.', 'Πήγαινε στην καρτέλα Κεντρική.', 'Βρες την ομάδα Γραμματοσειρά ή Παράγραφος.', 'Πάτησε το αντίστοιχο κουμπί και έλεγξε το αποτέλεσμα.'],
    fast: 'Κεντρική → Γραμματοσειρά/Παράγραφος → επιλογή εργαλείου.'
  },
  {
    id: 'word-header',
    module: 'Word',
    title: 'Word: Κεφαλίδα, υποσέλιδο και αριθμός σελίδας',
    description: 'Για ημερομηνία, ώρα, εικόνα, αριθμό σελίδας και επεξεργασία κεφαλίδας/υποσέλιδου.',
    image: 'assets/guide-word-header.svg',
    tags: ['κεφαλίδα','υποσέλιδο','ημερομηνία','αριθμός σελίδας','αριθμού σελίδας','ώρα'],
    steps: ['Πήγαινε στην καρτέλα Εισαγωγή.', 'Άνοιξε Κεφαλίδα, Υποσέλιδο ή Αριθμός σελίδας.', 'Διάλεξε το στοιχείο που ζητά η άσκηση.', 'Κλείσε την κεφαλίδα/υποσέλιδο όταν τελειώσεις.'],
    fast: 'Εισαγωγή → Κεφαλίδες & Υποσέλιδα → επιλογή στοιχείου.'
  },
  {
    id: 'word-table',
    module: 'Word',
    title: 'Word: Πίνακες',
    description: 'Για εισαγωγή πίνακα, γραμμές, στήλες, ύψος, πλάτος, στοίχιση, περιγράμματα και σκίαση κελιών.',
    image: 'assets/guide-word-table.svg',
    tags: ['πίνακα','πίνακας','γραμμών','γραμμής','στήλη','στήλες','κελί','κελιών','ύψος','πλάτος','συγχώνευση'],
    steps: ['Κάνε κλικ μέσα στον πίνακα.', 'Εμφανίζονται τα Εργαλεία Πίνακα.', 'Χρησιμοποίησε Σχεδίαση για στυλ/περιγράμματα ή Διάταξη για γραμμές, στήλες και μέγεθος.', 'Πάτησε OK όπου εμφανίζεται παράθυρο ρυθμίσεων.'],
    fast: 'Κλικ στον πίνακα → Εργαλεία Πίνακα → Σχεδίαση ή Διάταξη.'
  },
  {
    id: 'excel-format',
    module: 'Excel',
    title: 'Excel: Μορφοποίηση κελιών',
    description: 'Για χρώμα γεμίσματος, περιγράμματα, στοίχιση, αναδίπλωση, μορφή αριθμών και μέγεθος γραμμών/στηλών.',
    image: 'assets/guide-excel-format.svg',
    tags: ['κελί','κελιών','χρώμα','γέμισμα','στοίχιση','αναδίπλωση','συγχώνευση','μορφή','αριθμός','πλάτος','ύψος','στήλης','γραμμής','περίγραμμα'],
    steps: ['Επίλεξε το κελί ή την περιοχή κελιών.', 'Πήγαινε στην καρτέλα Κεντρική.', 'Χρησιμοποίησε Γραμματοσειρά, Στοίχιση, Αριθμός ή Κελιά.', 'Έλεγξε αν εφαρμόστηκε η μορφοποίηση στο σωστό εύρος.'],
    fast: 'Κεντρική → Γραμματοσειρά/Στοίχιση/Αριθμός/Κελιά.'
  },
  {
    id: 'excel-chart',
    module: 'Excel',
    title: 'Excel: Γραφήματα',
    description: 'Για εισαγωγή γραφήματος, αλλαγή τύπου, τίτλους, υπόμνημα, ετικέτες και επιλογή δεδομένων.',
    image: 'assets/guide-excel-chart.svg',
    tags: ['γράφημα','γραφήματος','γραφημάτων','άξονα','υπόμνημα','ετικέτες','δεδομένων','σειρά','στήλες γράφημα'],
    steps: ['Επίλεξε τα δεδομένα του πίνακα.', 'Πήγαινε στην καρτέλα Εισαγωγή.', 'Διάλεξε τύπο γραφήματος.', 'Με τα Εργαλεία γραφήματος ρύθμισε τίτλους, υπόμνημα, ετικέτες ή δεδομένα.'],
    fast: 'Εισαγωγή → Γραφήματα → επιλογή τύπου → Εργαλεία γραφήματος.'
  },
  {
    id: 'excel-page',
    module: 'Excel',
    title: 'Excel: Εκτύπωση και διαμόρφωση σελίδας',
    description: 'Για κλίμακα εκτύπωσης, προσανατολισμό, περιθώρια, περιοχή εκτύπωσης και εκτύπωση τίτλων.',
    image: 'assets/guide-excel-page.svg',
    tags: ['εκτύπωση','εκτύπωσης','κλίμακα','σελίδα','σελίδας','περιθώρια','προσανατολισμός','περιοχή εκτύπωσης','τίτλων'],
    steps: ['Πήγαινε στο σωστό φύλλο εργασίας.', 'Άνοιξε την καρτέλα Διάταξη Σελίδας.', 'Ρύθμισε Διαμόρφωση σελίδας ή Προσαρμογή κλίμακας.', 'Πριν τελειώσεις, κάνε έλεγχο από την Προεπισκόπηση εκτύπωσης.'],
    fast: 'Διάταξη Σελίδας → Διαμόρφωση σελίδας/Προσαρμογή κλίμακας.'
  },
  {
    id: 'internet-browser',
    module: 'Θεωρία/Internet/Outlook/Ασφάλεια',
    title: 'Internet: Περιήγηση, URL και αναζήτηση',
    description: 'Για browser, γραμμή διεύθυνσης, URL, μηχανές αναζήτησης, αγαπημένα και ρυθμίσεις προβολής.',
    image: 'assets/guide-internet-browser.svg',
    tags: ['internet','browser','περιήγηση','url','http','μηχανή','αναζήτηση','αγαπημένα','ιστοσελίδα','διεύθυνση','ιστός'],
    steps: ['Άνοιξε τον browser.', 'Γράψε διεύθυνση στη γραμμή URL ή λέξεις-κλειδιά στη μηχανή αναζήτησης.', 'Χρησιμοποίησε τα Αγαπημένα για αποθηκευμένες σελίδες.', 'Έλεγξε βασικούς όρους: URL, HTTP, μηχανή αναζήτησης.'],
    fast: 'Browser → Γραμμή διεύθυνσης ή αναζήτηση → επιλογή αποτελέσματος.'
  },
  {
    id: 'outlook-mail',
    module: 'Θεωρία/Internet/Outlook/Ασφάλεια',
    title: 'Outlook: Email και μηνύματα',
    description: 'Για δημιουργία μηνύματος, πρόχειρα, παραλήπτες, συνημμένα, αποστολή και λήψη.',
    image: 'assets/guide-outlook-mail.svg',
    tags: ['outlook','email','e-mail','μήνυμα','μηνύματος','αλληλογραφία','πρόχειρα','παραλήπτη','αποστολή','λήψη','συνημμένο'],
    steps: ['Άνοιξε το Outlook και επίλεξε τον σωστό φάκελο.', 'Για νέο μήνυμα πάτησε Νέο μήνυμα.', 'Συμπλήρωσε παραλήπτη, θέμα, κείμενο και συνημμένο αν ζητείται.', 'Πάτησε Αποστολή ή άνοιξε το μήνυμα από τα Πρόχειρα.'],
    fast: 'Outlook → Κεντρική → Νέο μήνυμα ή φάκελος Πρόχειρα.'
  },
  {
    id: 'windows-files',
    module: 'Windows/Αρχεία/Εκτυπώσεις',
    title: 'Windows: Αρχεία, φάκελοι και εκτυπώσεις',
    description: 'Για αντιγραφή, μετακίνηση, διαγραφή, μετονομασία, συμπίεση και βασικές ρυθμίσεις εκτυπωτή.',
    image: 'assets/guide-windows-files.svg',
    tags: ['αρχείο','αρχεία','φάκελο','φάκελος','αντιγραφή','μετακίνηση','διαγραφή','κάδος','συμπίεση','εκτυπωτή','εκτύπωση'],
    steps: ['Εντόπισε πρώτα το σωστό αρχείο ή φάκελο.', 'Κάνε δεξί κλικ ή χρησιμοποίησε την Κεντρική καρτέλα της Εξερεύνησης.', 'Επίλεξε αντιγραφή, μετακίνηση, διαγραφή, μετονομασία ή συμπίεση.', 'Για εκτυπώσεις, έλεγξε εκτυπωτή και προεπισκόπηση.'],
    fast: 'Επιλογή αρχείου/φακέλου → δεξί κλικ ή Κεντρική → ενέργεια.'
  },
  {
    id: 'access-db',
    module: 'Access/Βάσεις δεδομένων',
    title: 'Access: Πίνακες, φόρμες, εκθέσεις και ερωτήματα',
    description: 'Για δημιουργία αντικειμένων βάσης, αποθήκευση με όνομα, ιδιότητες και προβολές.',
    image: 'assets/guide-access-db.svg',
    tags: ['access','φόρμα','φόρμας','έκθεση','έκθεσης','πίνακα','πίνακας','ερώτημα','πεδίο','βάση','δεδομένων','ιδιότητες'],
    steps: ['Άνοιξε τη βάση δεδομένων.', 'Πήγαινε στη Δημιουργία ή επίλεξε το αντικείμενο από το αριστερό παράθυρο.', 'Διάλεξε πίνακα, φόρμα, έκθεση ή ερώτημα.', 'Αποθήκευσε με το όνομα που ζητά η άσκηση.'],
    fast: 'Access → Δημιουργία → Πίνακας/Φόρμα/Έκθεση/Ερώτημα.'
  },
  {
    id: 'powerpoint',
    module: 'PowerPoint/Παρουσιάσεις',
    title: 'PowerPoint: Διαφάνειες και αντικείμενα',
    description: 'Για νέα διαφάνεια, κείμενο, εικόνες, σχήματα, διάταξη και προβολή παρουσίασης.',
    image: 'assets/guide-powerpoint.svg',
    tags: ['powerpoint','διαφάνεια','διαφάνειας','παρουσίαση','κείμενο','πλαίσιο','εικόνα','σχήμα','smartart','προβολή'],
    steps: ['Επίλεξε τη σωστή διαφάνεια.', 'Άνοιξε Κεντρική ή Εισαγωγή ανάλογα με την εντολή.', 'Πρόσθεσε ή μορφοποίησε κείμενο, εικόνα ή σχήμα.', 'Έλεγξε το αποτέλεσμα σε προβολή παρουσίασης.'],
    fast: 'Επιλογή διαφάνειας → Κεντρική/Εισαγωγή → αντικείμενο ή μορφοποίηση.'
  }
];

const SOS = [
  ['Word', ['Κεντρική → Γραμματοσειρά: έντονα, πλάγια, χρώμα, επισήμανση.', 'Κεντρική → Παράγραφος: στοίχιση, κουκκίδες, διάστιχο, περιγράμματα.', 'Εισαγωγή → Πίνακας για δημιουργία πίνακα.', 'Εισαγωγή → Κεφαλίδα/Υποσέλιδο για ημερομηνία και αριθμό σελίδας.']],
  ['Excel', ['Κεντρική → Κελιά για εισαγωγή/διαγραφή γραμμών και στηλών.', 'Κεντρική → Αριθμός για ποσοστό, νόμισμα, ημερομηνία.', 'Εισαγωγή → Γραφήματα για δημιουργία γραφήματος.', 'Διάταξη Σελίδας → Κλίμακα για εκτύπωση σε συγκεκριμένες σελίδες.']],
  ['Internet / Outlook', ['URL είναι η διεύθυνση της ιστοσελίδας.', 'HTTP είναι πρωτόκολλο μεταφοράς υπερκειμένου.', 'Outlook → Πρόχειρα για μηνύματα που δεν έχουν σταλεί.', 'SMTP για αποστολή, POP3/IMAP για λήψη email.']],
  ['Windows', ['Δεξί κλικ σε αρχείο/φάκελο για αντιγραφή, διαγραφή, μετονομασία.', 'Ο Κάδος Ανακύκλωσης κρατά προσωρινά διαγραμμένα αρχεία.', 'Συμπίεση: αποστολή προς συμπιεσμένο φάκελο zip.', 'Πριν την εκτύπωση ελέγχουμε εκτυπωτή και προεπισκόπηση.']],
  ['Access', ['Δημιουργία → Φόρμα/Έκθεση/Ερώτημα.', 'Οι πίνακες κρατούν τα δεδομένα.', 'Οι φόρμες διευκολύνουν την εισαγωγή δεδομένων.', 'Οι εκθέσεις χρησιμοποιούνται για παρουσίαση/εκτύπωση δεδομένων.']],
  ['PowerPoint', ['Κεντρική → Νέα διαφάνεια.', 'Εισαγωγή → Εικόνες/Σχήματα/SmartArt.', 'Κεντρική → Διάταξη για αλλαγή διάταξης διαφάνειας.', 'Προβολή παρουσίασης για τελικό έλεγχο.']]
];

function normalizeText(value){
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
}
function escapeHtml(value){
  return String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[char]));
}
function moduleShort(module){
  return module.replace('/Βάσεις δεδομένων','').replace('/Παρουσιάσεις','').replace('/Αρχεία/Εκτυπώσεις','').replace('/Internet/Outlook/Ασφάλεια',' / Internet');
}
function getGuideForQuestion(q){
  const haystack = normalizeText(`${q.module} ${q.question} ${q.answer}`);
  const exactModuleGuides = VISUAL_GUIDES.filter(g => g.module === q.module);
  let best = null;
  let bestScore = 0;
  for(const guide of exactModuleGuides){
    const score = guide.tags.reduce((sum, tag) => sum + (haystack.includes(normalizeText(tag)) ? 1 : 0), 0);
    if(score > bestScore){ best = guide; bestScore = score; }
  }
  if(best) return best.id;
  const fallback = exactModuleGuides[0];
  return fallback ? fallback.id : null;
}
QUESTIONS.forEach(q => q.guideId = getGuideForQuestion(q));

let reviewSet = new Set(JSON.parse(localStorage.getItem('pliroforikiReviewIds') || '[]'));
let knownSet = new Set(JSON.parse(localStorage.getItem('pliroforikiKnownIds') || '[]'));
let visibleLimit = 42;
let currentExam = [];
let examIndex = 0;
let examCorrect = 0;
let examNeedsReview = 0;
let examAnswered = false;

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function saveProgress(){
  localStorage.setItem('pliroforikiReviewIds', JSON.stringify([...reviewSet]));
  localStorage.setItem('pliroforikiKnownIds', JSON.stringify([...knownSet]));
  updateStats();
}
function updateStats(){
  $('#statTotal').textContent = QUESTIONS.length;
  $('#statGuided').textContent = QUESTIONS.filter(q => q.guideId).length;
  $('#statReview').textContent = reviewSet.size;
}
function initFilters(){
  const modules = ['all', ...new Set(QUESTIONS.map(q => q.module))];
  const options = modules.map(m => `<option value="${escapeHtml(m)}">${m === 'all' ? 'Όλες οι ενότητες' : escapeHtml(moduleShort(m))}</option>`).join('');
  $('#moduleFilter').innerHTML = options;
  $('#lessonModuleFilter').innerHTML = options;
}
function switchTab(tabId){
  $$('.tab').forEach(t => t.classList.toggle('is-active', t.dataset.tab === tabId));
  $$('.panel').forEach(p => p.classList.toggle('is-active', p.id === tabId));
  if(tabId === 'review') renderReview();
  window.scrollTo({top: document.querySelector('.tabs').offsetTop, behavior:'smooth'});
}
function filteredQuestions(){
  const q = normalizeText($('#searchInput')?.value || '');
  const module = $('#moduleFilter')?.value || 'all';
  const archive = $('#archiveFilter')?.value || 'all';
  return QUESTIONS.filter(item => {
    if(module !== 'all' && item.module !== module) return false;
    if(archive !== 'all' && item.archive !== archive) return false;
    if(q){
      const text = normalizeText(`${item.question} ${item.answer} ${item.module} ${item.test}`);
      if(!text.includes(q)) return false;
    }
    return true;
  });
}
function renderQuestionCard(q, opts={}){
  const guide = VISUAL_GUIDES.find(g => g.id === q.guideId);
  const inReview = reviewSet.has(q.id);
  const isKnown = knownSet.has(q.id);
  return `
    <article class="question-card" data-id="${escapeHtml(q.id)}">
      <div class="question-meta">
        <span class="module-pill">${escapeHtml(moduleShort(q.module))}</span>
        <span class="archive-pill">EXPRESS ${escapeHtml(q.archive)}</span>
        <span class="archive-pill">${escapeHtml(q.test.replace(' – Global Cert',''))}</span>
        ${guide ? '<span class="guide-pill">έχει εικόνα</span>' : ''}
      </div>
      <div class="question-title">${escapeHtml(q.question)}</div>
      <div class="card-actions">
        <button class="btn btn-light" data-action="toggle-answer">Δείξε απάντηση</button>
        ${guide ? `<button class="btn btn-ghost" data-action="open-guide" data-guide="${escapeHtml(guide.id)}">Οδηγίες με εικόνα</button>` : ''}
        <button class="btn btn-good" data-action="known">${isKnown ? 'Το ξέρω ✓' : 'Το ξέρω'}</button>
        <button class="btn btn-warn" data-action="review">${inReview ? 'Στην επανάληψη ✓' : 'Θέλω επανάληψη'}</button>
      </div>
      <div class="answer">${escapeHtml(q.answer)}</div>
    </article>
  `;
}
function renderQuestions(reset=false){
  if(reset) visibleLimit = 42;
  const list = filteredQuestions();
  const shown = list.slice(0, visibleLimit);
  $('#resultCount').textContent = `${list.length} αποτελέσματα${list.length > shown.length ? ` - εμφανίζονται τα πρώτα ${shown.length}` : ''}`;
  const more = list.length > visibleLimit ? `<button class="btn btn-primary" id="loadMoreBtn">Δείξε κι άλλες ερωτήσεις</button>` : '';
  $('#questionList').innerHTML = shown.map(q => renderQuestionCard(q)).join('') + more;
}
function renderLessons(){
  const module = $('#lessonModuleFilter')?.value || 'all';
  const guides = VISUAL_GUIDES.filter(g => module === 'all' || g.module === module);
  $('#lessonGrid').innerHTML = guides.map(g => `
    <article class="lesson-card">
      <div class="lesson-card__image"><img src="${escapeHtml(g.image)}" alt="${escapeHtml(g.title)}"></div>
      <div class="lesson-card__body">
        <span class="module-pill">${escapeHtml(moduleShort(g.module))}</span>
        <h3>${escapeHtml(g.title)}</h3>
        <p>${escapeHtml(g.description)}</p>
        <ol class="steps">${g.steps.slice(0,3).map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
        <div class="fast-answer">${escapeHtml(g.fast)}</div>
        <div class="card-actions"><button class="btn btn-primary" data-open-lesson="${escapeHtml(g.id)}">Άνοιγμα μαθήματος</button></div>
      </div>
    </article>
  `).join('');
}
function renderReview(){
  const reviewQuestions = QUESTIONS.filter(q => reviewSet.has(q.id));
  $('#reviewList').innerHTML = reviewQuestions.length ? reviewQuestions.map(q => renderQuestionCard(q)).join('') : '<div class="empty">Δεν υπάρχουν ακόμα ερωτήσεις για επανάληψη. Πάτησε “Θέλω επανάληψη” σε όποια ερώτηση δυσκολεύει τον μαθητή.</div>';
}
function renderSos(){
  $('#sosGrid').innerHTML = SOS.map(([title, items]) => `
    <article class="sos-card">
      <h3>${escapeHtml(title)}</h3>
      <ul>${items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
    </article>
  `).join('');
}
function openGuide(guideId, questionId=null){
  const guide = VISUAL_GUIDES.find(g => g.id === guideId);
  if(!guide) return;
  const q = questionId ? QUESTIONS.find(item => item.id === questionId) : null;
  $('#modalContent').innerHTML = `
    <div class="guide-modal">
      <span class="module-pill">${escapeHtml(moduleShort(guide.module))}</span>
      <h2 id="modalTitle">${escapeHtml(guide.title)}</h2>
      <p>${escapeHtml(guide.description)}</p>
      <img src="${escapeHtml(guide.image)}" alt="${escapeHtml(guide.title)}">
      <div class="guide-layout">
        <div class="guide-box">
          <h3>Βήματα</h3>
          <ol class="steps">${guide.steps.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
        </div>
        <div class="guide-box">
          <h3>Γρήγορη απάντηση εξέτασης</h3>
          <div class="fast-answer">${escapeHtml(guide.fast)}</div>
          ${q ? `<h3 style="margin-top:16px">Σχετική ερώτηση</h3><p>${escapeHtml(q.question)}</p><div class="answer is-open">${escapeHtml(q.answer)}</div>` : ''}
        </div>
      </div>
    </div>
  `;
  $('#guideModal').classList.add('is-open');
  $('#guideModal').setAttribute('aria-hidden','false');
}
function closeModal(){
  $('#guideModal').classList.remove('is-open');
  $('#guideModal').setAttribute('aria-hidden','true');
}
function handleQuestionAction(card, action, btn){
  const id = card.dataset.id;
  const q = QUESTIONS.find(item => item.id === id);
  if(!q) return;
  if(action === 'toggle-answer'){
    const ans = card.querySelector('.answer');
    ans.classList.toggle('is-open');
    btn.textContent = ans.classList.contains('is-open') ? 'Κρύψε απάντηση' : 'Δείξε απάντηση';
  }
  if(action === 'open-guide') openGuide(btn.dataset.guide, id);
  if(action === 'known'){
    knownSet.add(id);
    reviewSet.delete(id);
    saveProgress();
    renderQuestions();
    renderReview();
  }
  if(action === 'review'){
    reviewSet.add(id);
    knownSet.delete(id);
    saveProgress();
    renderQuestions();
    renderReview();
  }
}
function shuffle(arr){
  const copy = arr.slice();
  for(let i=copy.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }
  return copy;
}
function startExam(){
  const size = Number(document.querySelector('input[name="examSize"]:checked')?.value || 12);
  const modules = [...new Set(QUESTIONS.map(q => q.module))];
  const perModule = Math.max(1, Math.floor(size / modules.length));
  let picked = [];
  modules.forEach(m => picked.push(...shuffle(QUESTIONS.filter(q => q.module === m)).slice(0, perModule)));
  while(picked.length < size){
    const candidate = shuffle(QUESTIONS).find(q => !picked.some(p => p.id === q.id));
    if(candidate) picked.push(candidate); else break;
  }
  currentExam = shuffle(picked).slice(0, size);
  examIndex = 0;
  examCorrect = 0;
  examNeedsReview = 0;
  examAnswered = false;
  $('#examIntro').classList.add('hidden');
  $('#examSummary').classList.add('hidden');
  $('#examRun').classList.remove('hidden');
  renderExamQuestion();
}
function renderExamQuestion(){
  const q = currentExam[examIndex];
  const guide = VISUAL_GUIDES.find(g => g.id === q.guideId);
  const progress = Math.round((examIndex / currentExam.length) * 100);
  $('#examRun').innerHTML = `
    <div class="exam-top">
      <span>Ερώτηση ${examIndex + 1} από ${currentExam.length}</span>
      <div class="progress" aria-label="Πρόοδος"><span style="width:${progress}%"></span></div>
      <span>${examCorrect} σωστές</span>
    </div>
    <article class="exam-question" data-id="${escapeHtml(q.id)}">
      <div class="question-meta">
        <span class="module-pill">${escapeHtml(moduleShort(q.module))}</span>
        <span class="archive-pill">EXPRESS ${escapeHtml(q.archive)}</span>
        ${guide ? '<span class="guide-pill">έχει εικόνα</span>' : ''}
      </div>
      <h3>${escapeHtml(q.question)}</h3>
      <div class="exam-actions">
        <button class="btn btn-light" id="examShowAnswerBtn">Δείξε απάντηση</button>
        ${guide ? `<button class="btn btn-ghost" data-action="open-guide" data-guide="${escapeHtml(guide.id)}">Οδηγίες με εικόνα</button>` : ''}
      </div>
      <div class="answer" id="examAnswer">${escapeHtml(q.answer)}</div>
      <div class="exam-actions hidden" id="examSelfCheck" style="margin-top:14px">
        <button class="btn btn-good" id="examKnowBtn">Το ήξερα</button>
        <button class="btn btn-warn" id="examReviewBtn">Θέλει επανάληψη</button>
      </div>
    </article>
  `;
}
function nextExamQuestion(markKnown){
  const q = currentExam[examIndex];
  if(markKnown){
    examCorrect++;
    knownSet.add(q.id);
    reviewSet.delete(q.id);
  } else {
    examNeedsReview++;
    reviewSet.add(q.id);
    knownSet.delete(q.id);
  }
  saveProgress();
  examIndex++;
  if(examIndex >= currentExam.length) finishExam();
  else renderExamQuestion();
}
function finishExam(){
  const pct = Math.round((examCorrect / currentExam.length) * 100);
  const moduleStats = {};
  currentExam.forEach(q => {
    moduleStats[q.module] ||= {total:0, review:0};
    moduleStats[q.module].total++;
    if(reviewSet.has(q.id)) moduleStats[q.module].review++;
  });
  const weak = Object.entries(moduleStats).sort((a,b)=>b[1].review-a[1].review).slice(0,3);
  $('#examRun').classList.add('hidden');
  $('#examSummary').classList.remove('hidden');
  $('#examSummary').innerHTML = `
    <h2>Αποτέλεσμα τεστ</h2>
    <div class="summary-grid">
      <div class="summary-item"><b>${pct}%</b><span>ποσοστό</span></div>
      <div class="summary-item"><b>${examCorrect}</b><span>τα ήξερα</span></div>
      <div class="summary-item"><b>${examNeedsReview}</b><span>για επανάληψη</span></div>
    </div>
    <h3>Προτεινόμενη επανάληψη</h3>
    <ul class="steps">${weak.map(([m,s]) => `<li>${escapeHtml(moduleShort(m))}: ${s.review} από ${s.total} χρειάζονται επανάληψη.</li>`).join('')}</ul>
    <div class="card-actions" style="margin-top:18px">
      <button class="btn btn-primary" id="newExamBtn">Νέο τεστ</button>
      <button class="btn btn-ghost" data-jump="review">Άνοιγμα λίστας επανάληψης</button>
    </div>
  `;
}

function bindEvents(){
  $$('.tab').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
  $$('[data-jump]').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.jump)));
  $('#searchInput').addEventListener('input', () => renderQuestions(true));
  $('#moduleFilter').addEventListener('change', () => renderQuestions(true));
  $('#archiveFilter').addEventListener('change', () => renderQuestions(true));
  $('#lessonModuleFilter').addEventListener('change', renderLessons);
  $('#questionList').addEventListener('click', e => {
    const btn = e.target.closest('button');
    if(!btn) return;
    if(btn.id === 'loadMoreBtn'){
      visibleLimit += 42;
      renderQuestions();
      return;
    }
    const card = e.target.closest('.question-card');
    if(card && btn.dataset.action) handleQuestionAction(card, btn.dataset.action, btn);
  });
  $('#reviewList').addEventListener('click', e => {
    const btn = e.target.closest('button');
    const card = e.target.closest('.question-card');
    if(card && btn?.dataset.action) handleQuestionAction(card, btn.dataset.action, btn);
  });
  $('#lessonGrid').addEventListener('click', e => {
    const btn = e.target.closest('[data-open-lesson]');
    if(btn) openGuide(btn.dataset.openLesson);
  });
  $('#randomQuestionBtn').addEventListener('click', () => {
    const list = filteredQuestions();
    if(!list.length) return;
    const q = list[Math.floor(Math.random()*list.length)];
    $('#searchInput').value = q.question.slice(0, 28);
    renderQuestions(true);
  });
  $('#clearReviewBtn').addEventListener('click', () => {
    if(confirm('Να καθαρίσει η λίστα επανάληψης;')){
      reviewSet.clear();
      saveProgress();
      renderReview();
    }
  });
  $('#startExamBtn').addEventListener('click', startExam);
  $('#examRun').addEventListener('click', e => {
    const btn = e.target.closest('button');
    if(!btn) return;
    if(btn.id === 'examShowAnswerBtn'){
      $('#examAnswer').classList.add('is-open');
      $('#examSelfCheck').classList.remove('hidden');
      btn.textContent = 'Η απάντηση εμφανίζεται';
      btn.disabled = true;
    }
    if(btn.id === 'examKnowBtn') nextExamQuestion(true);
    if(btn.id === 'examReviewBtn') nextExamQuestion(false);
    if(btn.dataset.action === 'open-guide'){
      const id = $('#examRun .exam-question')?.dataset.id;
      openGuide(btn.dataset.guide, id);
    }
  });
  $('#examSummary').addEventListener('click', e => {
    const btn = e.target.closest('button');
    if(!btn) return;
    if(btn.id === 'newExamBtn'){
      $('#examSummary').classList.add('hidden');
      $('#examIntro').classList.remove('hidden');
    }
    if(btn.dataset.jump) switchTab(btn.dataset.jump);
  });
  $$('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });
}

function boot(){
  initFilters();
  renderLessons();
  renderQuestions(true);
  renderSos();
  updateStats();
  bindEvents();
}
boot();
