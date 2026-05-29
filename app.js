const content = window.WORD_APP_CONTENT;
const STORAGE_KEY = "pliroforiki_word_progress_v1";

const app = document.querySelector("#app");
const navButtons = [...document.querySelectorAll(".nav-btn")];

let session = null;

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { attempts: {}, wrongIds: [] };
  } catch (error) {
    return { attempts: {}, wrongIds: [] };
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  updateOverallProgress();
}

function getActivity(id) {
  return content.activities.find(activity => activity.id === id);
}

function recordResult(activity, isCorrect) {
  const progress = loadProgress();
  if (!progress.attempts[activity.id]) {
    progress.attempts[activity.id] = {
      attempts: 0,
      correct: 0,
      category: activity.category,
      title: activity.title
    };
  }

  progress.attempts[activity.id].attempts += 1;
  if (isCorrect) {
    progress.attempts[activity.id].correct += 1;
    progress.wrongIds = progress.wrongIds.filter(id => id !== activity.id);
  } else if (!progress.wrongIds.includes(activity.id)) {
    progress.wrongIds.push(activity.id);
  }

  saveProgress(progress);
}

function progressStats() {
  const progress = loadProgress();
  const rows = Object.values(progress.attempts);
  const attempts = rows.reduce((sum, row) => sum + row.attempts, 0);
  const correct = rows.reduce((sum, row) => sum + row.correct, 0);
  const percent = attempts ? Math.round((correct / attempts) * 100) : 0;
  return { progress, rows, attempts, correct, percent };
}

function updateOverallProgress() {
  const { attempts, correct, percent } = progressStats();
  document.querySelector("#overallProgress").textContent = `${percent}%`;
  document.querySelector("#overallProgressText").textContent = attempts
    ? `${correct} σωστές απαντήσεις σε ${attempts} προσπάθειες.`
    : "Δεν υπάρχουν ακόμα απαντήσεις.";
}

function setView(view) {
  navButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.view === view);
  });

  if (view === "home") renderHome();
  if (view === "learn") renderLearn();
  if (view === "practice") renderPracticeMenu();
  if (view === "exam") startExam();
  if (view === "mistakes") renderMistakes();
  if (view === "progress") renderProgress();

  app.focus({ preventScroll: false });
}

function html(strings, ...values) {
  return strings.map((string, index) => string + (values[index] ?? "")).join("");
}

function renderHome() {
  const categories = [...new Set(content.activities.map(activity => activity.category))];
  app.innerHTML = html`
    <section class="view-panel">
      <p class="section-kicker">Αρχική</p>
      <h2>Ξεκινάμε με το Word</h2>
      <p class="muted">Η εφαρμογή έχει ήδη πραγματικές εικόνες από το Word για την Εκτύπωση και την καρτέλα Εισαγωγή. Οι υπόλοιπες προσωρινές εικόνες μπορούν να αντικατασταθούν σταδιακά με screenshots από το Word.</p>
      <div class="grid three" style="margin-top:18px">
        <button class="card-link" data-go="learn">
          <strong>Μαθαίνω</strong>
          <span>Σύντομα μαθήματα με εικόνες και βήματα.</span>
        </button>
        <button class="card-link" data-go="practice">
          <strong>Κάνω εξάσκηση</strong>
          <span>Ερωτήσεις, εικόνες και επιλογή σωστών σημείων.</span>
        </button>
        <button class="card-link" data-go="exam">
          <strong>Κάνω τεστ</strong>
          <span>Μικρή προσομοίωση με τυχαίες δραστηριότητες.</span>
        </button>
      </div>
      <div class="notice">
        <strong>Ενότητες που υπάρχουν τώρα:</strong> ${categories.join(" · ")}
      </div>
    </section>
  `;

  app.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => setView(button.dataset.go));
  });
}

function renderLearn() {
  app.innerHTML = html`
    <section class="view-panel">
      <p class="section-kicker">Μαθαίνω</p>
      <h2>Μικρά μαθήματα Word</h2>
      <p class="muted">Κάθε μάθημα δίνει πρώτα την εικόνα και μετά τα βήματα, ώστε ο μαθητής να συνδέει τη θεωρία με το περιβάλλον του Word.</p>
      <div style="margin-top:18px">
        ${content.lessons.map(lesson => html`
          <article class="lesson-card">
            <div>
              <p class="section-kicker">${lesson.category}</p>
              <h3>${lesson.title}</h3>
              <p>${lesson.summary}</p>
              <ol class="lesson-steps">
                ${lesson.steps.map(step => `<li>${step}</li>`).join("")}
              </ol>
            </div>
            <img src="${lesson.image}" alt="${lesson.title}" />
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderPracticeMenu() {
  const categories = [...new Set(content.activities.map(activity => activity.category))];
  app.innerHTML = html`
    <section class="view-panel">
      <p class="section-kicker">Εξάσκηση</p>
      <h2>Διάλεξε ενότητα</h2>
      <p class="muted">Ο μαθητής μπορεί να κάνει εξάσκηση ανά ενότητα ή όλα μαζί.</p>
      <div class="grid three" style="margin-top:18px">
        <button class="card-link" data-category="all">
          <strong>Όλες οι ασκήσεις</strong>
          <span>${content.activities.length} δραστηριότητες</span>
        </button>
        ${categories.map(category => {
          const count = content.activities.filter(activity => activity.category === category).length;
          return html`
            <button class="card-link" data-category="${category}">
              <strong>${category}</strong>
              <span>${count} δραστηριότητες</span>
            </button>
          `;
        }).join("")}
      </div>
    </section>
  `;

  app.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      const list = category === "all"
        ? content.activities.map(activity => activity.id)
        : content.activities.filter(activity => activity.category === category).map(activity => activity.id);
      startSession(list, category === "all" ? "Όλες οι ασκήσεις" : category);
    });
  });
}

function startSession(activityIds, title) {
  session = {
    title,
    ids: activityIds,
    index: 0,
    completed: 0,
    correct: 0,
    answeredCurrent: false
  };
  renderCurrentActivity();
}

function startExam() {
  const ids = [...content.activities.map(activity => activity.id)].sort(() => Math.random() - 0.5).slice(0, 7);
  startSession(ids, "Μικρό τεστ Word");
}

function renderCurrentActivity() {
  if (!session || session.index >= session.ids.length) {
    renderSessionEnd();
    return;
  }

  const activity = getActivity(session.ids[session.index]);
  if (!activity) {
    session.index += 1;
    renderCurrentActivity();
    return;
  }

  if (activity.type === "hotspot") renderHotspotActivity(activity);
  if (activity.type === "choice") renderChoiceActivity(activity);
  if (activity.type === "order") renderOrderActivity(activity);
}

function sessionHeader(activity) {
  return html`
    <div class="activity-header">
      <div>
        <p class="section-kicker">${session.title} · ${session.index + 1}/${session.ids.length}</p>
        <h2>${activity.title}</h2>
      </div>
      <span class="activityType">${activity.category}</span>
    </div>
  `;
}

function markAnswered(activity, isCorrect) {
  if (session && !session.answeredCurrent) {
    session.completed += 1;
    if (isCorrect) session.correct += 1;
    session.answeredCurrent = true;
    recordResult(activity, isCorrect);
  }
}

function nextActivity() {
  if (!session) return;
  session.index += 1;
  session.answeredCurrent = false;
  renderCurrentActivity();
}

function renderHotspotActivity(activity) {
  app.innerHTML = html`
    <section class="activity-card">
      ${sessionHeader(activity)}
      <p class="questionText">${activity.question}</p>
      <div class="image-stage ${activity.compact ? 'compact-stage' : ''}">
        <img class="activityImage" src="${activity.image}" alt="Εικόνα άσκησης: ${activity.title}" />
        <div class="hotspotFeedback" aria-live="polite"></div>
      </div>
      <div class="activity-actions">
        <button class="secondary showHintBtn">Δείξε βοήθεια</button>
        <button class="secondary nextBtn">Επόμενη</button>
      </div>
      <div class="hintBox hidden">${activity.hint}</div>
    </section>
  `;

  const image = app.querySelector(".activityImage");
  const feedback = app.querySelector(".hotspotFeedback");
  const hint = app.querySelector(".hintBox");

  image.addEventListener("click", event => {
    if (session.answeredCurrent) return;
    const rect = image.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (activity.imageWidth / rect.width);
    const y = (event.clientY - rect.top) * (activity.imageHeight / rect.height);
    const area = activity.correctArea;
    const isCorrect = x >= area.x && x <= area.x + area.width && y >= area.y && y <= area.y + area.height;

    app.querySelectorAll(".correct-marker").forEach(marker => marker.remove());
    const marker = document.createElement("div");
    marker.className = "correct-marker";
    marker.style.left = `${(area.x / activity.imageWidth) * 100}%`;
    marker.style.top = `${(area.y / activity.imageHeight) * 100}%`;
    marker.style.width = `${(area.width / activity.imageWidth) * 100}%`;
    marker.style.height = `${(area.height / activity.imageHeight) * 100}%`;
    app.querySelector(".image-stage").appendChild(marker);

    feedback.textContent = isCorrect ? activity.successMessage : activity.errorMessage;
    feedback.className = `hotspotFeedback show ${isCorrect ? "ok" : "bad"}`;
    markAnswered(activity, isCorrect);
  });

  app.querySelector(".showHintBtn").addEventListener("click", () => hint.classList.toggle("hidden"));
  app.querySelector(".nextBtn").addEventListener("click", nextActivity);
}

function renderChoiceActivity(activity) {
  app.innerHTML = html`
    <section class="activity-card">
      ${sessionHeader(activity)}
      <p class="questionText">${activity.question}</p>
      ${activity.image ? `<div class="image-stage ${activity.compact ? 'compact-stage' : ''}"><img class="activityImage" src="${activity.image}" alt="Εικόνα άσκησης: ${activity.title}" /></div>` : ""}
      <div class="answer-list">
        ${activity.options.map((option, index) => html`
          <button class="answer-btn" data-index="${index}">${option}</button>
        `).join("")}
      </div>
      <div class="feedback-box hidden"></div>
      <div class="activity-actions">
        <button class="secondary nextBtn">Επόμενη</button>
      </div>
    </section>
  `;

  const feedback = app.querySelector(".feedback-box");
  app.querySelectorAll(".answer-btn").forEach(button => {
    button.addEventListener("click", () => {
      if (session.answeredCurrent) return;
      const selected = Number(button.dataset.index);
      const isCorrect = selected === activity.answer;
      markAnswered(activity, isCorrect);

      app.querySelectorAll(".answer-btn").forEach(answerButton => {
        const index = Number(answerButton.dataset.index);
        if (index === activity.answer) answerButton.classList.add("correct");
        if (index === selected && !isCorrect) answerButton.classList.add("wrong");
      });

      feedback.textContent = `${isCorrect ? "Σωστά!" : "Όχι ακριβώς."} ${activity.explanation}`;
      feedback.classList.remove("hidden");
    });
  });

  app.querySelector(".nextBtn").addEventListener("click", nextActivity);
}

function renderOrderActivity(activity) {
  let steps = activity.steps.map(step => ({ ...step }));

  app.innerHTML = html`
    <section class="activity-card">
      ${sessionHeader(activity)}
      <p class="questionText">${activity.question}</p>
      <div class="steps-area"></div>
      <div class="activity-actions">
        <button class="primary checkOrderBtn">Έλεγχος</button>
        <button class="secondary hintBtn">Βοήθεια</button>
        <button class="secondary nextBtn">Επόμενη</button>
      </div>
      <div class="feedback-box hidden"></div>
    </section>
  `;

  const stepsArea = app.querySelector(".steps-area");
  const feedback = app.querySelector(".feedback-box");

  function drawSteps() {
    stepsArea.innerHTML = steps.map((step, index) => html`
      <div class="step-row">
        <strong>${index + 1}. ${step.text}</strong>
        <button class="step-btn" data-action="up" data-index="${index}" aria-label="Μετακίνηση πάνω">↑</button>
        <button class="step-btn" data-action="down" data-index="${index}" aria-label="Μετακίνηση κάτω">↓</button>
      </div>
    `).join("");

    stepsArea.querySelectorAll(".step-btn").forEach(button => {
      button.addEventListener("click", () => {
        if (session.answeredCurrent) return;
        const index = Number(button.dataset.index);
        const action = button.dataset.action;
        const target = action === "up" ? index - 1 : index + 1;
        if (target < 0 || target >= steps.length) return;
        [steps[index], steps[target]] = [steps[target], steps[index]];
        drawSteps();
      });
    });
  }

  drawSteps();

  app.querySelector(".checkOrderBtn").addEventListener("click", () => {
    if (session.answeredCurrent) return;
    const currentOrder = steps.map(step => step.id).join("|");
    const correctOrder = activity.correctOrder.join("|");
    const isCorrect = currentOrder === correctOrder;
    markAnswered(activity, isCorrect);
    feedback.textContent = `${isCorrect ? "Σωστά!" : "Όχι ακόμα."} ${activity.explanation}`;
    feedback.classList.remove("hidden");
  });

  app.querySelector(".hintBtn").addEventListener("click", () => {
    feedback.textContent = activity.hint;
    feedback.classList.remove("hidden");
  });

  app.querySelector(".nextBtn").addEventListener("click", nextActivity);
}

function renderSessionEnd() {
  const percent = session.completed ? Math.round((session.correct / session.completed) * 100) : 0;
  app.innerHTML = html`
    <section class="view-panel">
      <p class="section-kicker">Ολοκλήρωση</p>
      <h2>${session.title}</h2>
      <div class="grid three" style="margin-top:18px">
        <div class="stat-card">
          <p>Σωστές</p>
          <div class="stat-number">${session.correct}/${session.completed}</div>
        </div>
        <div class="stat-card">
          <p>Ποσοστό</p>
          <div class="stat-number">${percent}%</div>
        </div>
        <div class="stat-card">
          <p>Ασκήσεις</p>
          <div class="stat-number">${session.ids.length}</div>
        </div>
      </div>
      <div class="activity-actions">
        <button class="primary" id="repeatSession">Ξανά το ίδιο</button>
        <button class="secondary" id="goPractice">Άλλη εξάσκηση</button>
        <button class="secondary" id="goProgress">Δες πρόοδο</button>
      </div>
    </section>
  `;

  app.querySelector("#repeatSession").addEventListener("click", () => startSession(session.ids, session.title));
  app.querySelector("#goPractice").addEventListener("click", () => setView("practice"));
  app.querySelector("#goProgress").addEventListener("click", () => setView("progress"));
}

function renderMistakes() {
  const progress = loadProgress();
  const wrongActivities = progress.wrongIds.map(getActivity).filter(Boolean);

  app.innerHTML = html`
    <section class="view-panel">
      <p class="section-kicker">Τα λάθη μου</p>
      <h2>Επανάληψη στα σημεία που δυσκόλεψαν</h2>
      ${wrongActivities.length ? html`
        <p class="muted">Υπάρχουν ${wrongActivities.length} δραστηριότητες για επανάληψη.</p>
        <div class="grid two" style="margin-top:18px">
          ${wrongActivities.map(activity => html`
            <div class="stat-card">
              <span class="pill">${activity.category}</span>
              <h3 style="margin-top:12px">${activity.title}</h3>
              <p>${activity.question}</p>
            </div>
          `).join("")}
        </div>
        <div class="activity-actions">
          <button class="primary" id="practiceMistakes">Κάνε επανάληψη λαθών</button>
        </div>
      ` : html`
        <div class="notice">Δεν υπάρχουν λάθη αυτή τη στιγμή. Όταν ο μαθητής απαντήσει λάθος σε κάποια άσκηση, θα εμφανιστεί εδώ.</div>
      `}
    </section>
  `;

  const button = app.querySelector("#practiceMistakes");
  if (button) button.addEventListener("click", () => startSession(wrongActivities.map(activity => activity.id), "Επανάληψη λαθών"));
}

function renderProgress() {
  const { progress, attempts, correct, percent } = progressStats();
  const categories = {};

  Object.values(progress.attempts).forEach(row => {
    if (!categories[row.category]) categories[row.category] = { attempts: 0, correct: 0 };
    categories[row.category].attempts += row.attempts;
    categories[row.category].correct += row.correct;
  });

  app.innerHTML = html`
    <section class="view-panel">
      <p class="section-kicker">Πρόοδος</p>
      <h2>Αποτελέσματα μαθητή</h2>
      <div class="grid three" style="margin-top:18px">
        <div class="stat-card"><p>Σύνολο προσπαθειών</p><div class="stat-number">${attempts}</div></div>
        <div class="stat-card"><p>Σωστές απαντήσεις</p><div class="stat-number">${correct}</div></div>
        <div class="stat-card"><p>Ποσοστό επιτυχίας</p><div class="stat-number">${percent}%</div></div>
      </div>
      <div class="progress-bar" aria-hidden="true"><div class="progress-fill" style="width:${percent}%"></div></div>
      ${Object.keys(categories).length ? html`
        <div class="table-wrap">
          <table class="progress-table">
            <thead>
              <tr><th>Ενότητα</th><th>Σωστές</th><th>Προσπάθειες</th><th>Ποσοστό</th></tr>
            </thead>
            <tbody>
              ${Object.entries(categories).map(([category, row]) => {
                const categoryPercent = row.attempts ? Math.round((row.correct / row.attempts) * 100) : 0;
                return `<tr><td>${category}</td><td>${row.correct}</td><td>${row.attempts}</td><td>${categoryPercent}%</td></tr>`;
              }).join("")}
            </tbody>
          </table>
        </div>
      ` : `<div class="notice">Δεν υπάρχουν ακόμα αποτελέσματα.</div>`}
      <div class="activity-actions">
        <button class="secondary danger" id="resetProgress">Μηδενισμός προόδου</button>
      </div>
    </section>
  `;

  app.querySelector("#resetProgress").addEventListener("click", () => {
    if (!confirm("Να μηδενιστεί η πρόοδος;")) return;
    localStorage.removeItem(STORAGE_KEY);
    updateOverallProgress();
    renderProgress();
  });
}

navButtons.forEach(button => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

updateOverallProgress();
renderHome();
