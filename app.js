/* =====================================================================
   Mon Safari à Thoiry — application pour les enfants de maternelle
   Liste des animaux reprise du panneau « Les habitants du safari ».
   ===================================================================== */

const ANIMALS = [
  // ---------- EN AFRIQUE ----------
  { region: "afrique", emoji: "🐘", name: "Éléphant de savane" },
  { region: "afrique", emoji: "🦏", name: "Rhinocéros blanc" },
  { region: "afrique", emoji: "🦛", name: "Hippopotame" },
  { region: "afrique", emoji: "🦃", name: "Autruche d'Afrique" },
  { region: "afrique", emoji: "🦒", name: "Girafe du Kordofan" },
  { region: "afrique", emoji: "🦌", name: "Éland du Cap" },
  { region: "afrique", emoji: "🦌", name: "Grand koudou" },
  { region: "afrique", emoji: "🐐", name: "Hippotrague noir" },
  { region: "afrique", emoji: "🐄", name: "Vache watusi" },
  { region: "afrique", emoji: "🦓", name: "Zèbre de Chapman" },
  { region: "afrique", emoji: "🦌", name: "Cobe à croissant" },
  { region: "afrique", emoji: "🐏", name: "Oryx algazelle" },
  { region: "afrique", emoji: "🐃", name: "Gnou à queue blanche" },
  { region: "afrique", emoji: "🐃", name: "Gnou bleu" },
  { region: "afrique", emoji: "🦌", name: "Cobe lechwe" },
  { region: "afrique", emoji: "🐦", name: "Grue royale" },
  { region: "afrique", emoji: "🦌", name: "Sitatunga du Gabon" },
  { region: "afrique", emoji: "🦌", name: "Springbok" },
  { region: "afrique", emoji: "🐗", name: "Phacochère commun" },

  // ---------- EN AMÉRIQUE ----------
  { region: "amerique", emoji: "🦬", name: "Bison d'Amérique" },
  { region: "amerique", emoji: "🐻", name: "Ours noir d'Amérique" },
  { region: "amerique", emoji: "🐻", name: "Ours à lunettes" },
  { region: "amerique", emoji: "🐺", name: "Loup du Canada" },
  { region: "amerique", emoji: "🐺", name: "Coyote" },

  // ---------- EN EURASIE ----------
  { region: "eurasie", emoji: "🦬", name: "Bison d'Europe" },
  { region: "eurasie", emoji: "🐎", name: "Cheval de Przewalski" },
  { region: "eurasie", emoji: "🦌", name: "Daim d'Europe" },
];

const REGIONS = [
  { id: "afrique",  label: "🌍 En Afrique" },
  { id: "amerique", label: "🌎 En Amérique" },
  { id: "eurasie",  label: "🌏 En Eurasie" },
];

const STORAGE_KEY = "safari-thoiry-vus";

/* État : ensemble des index d'animaux vus, sauvegardé dans le navigateur */
let seen = loadSeen();

/* ---------- Synthèse vocale (dire les noms à voix haute) ---------- */
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "fr-FR";
  u.rate = 0.9;
  u.pitch = 1.1;
  const frVoice = window.speechSynthesis
    .getVoices()
    .find((v) => v.lang && v.lang.startsWith("fr"));
  if (frVoice) u.voice = frVoice;
  window.speechSynthesis.speak(u);
}
// Charger les voix au plus tôt
if ("speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () =>
    window.speechSynthesis.getVoices();
}

/* ---------- Construction de l'interface ---------- */
function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  REGIONS.forEach((region) => {
    const section = document.createElement("section");
    section.className = "region region-" + region.id;

    const title = document.createElement("h2");
    title.className = "region-title";
    title.textContent = region.label;
    section.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "grid";

    ANIMALS.forEach((animal, index) => {
      if (animal.region !== region.id) return;

      const card = document.createElement("button");
      card.className = "animal" + (seen.has(index) ? " seen" : "");
      card.type = "button";
      card.dataset.index = index;
      card.setAttribute(
        "aria-label",
        animal.name + (seen.has(index) ? " (vu)" : "")
      );
      card.innerHTML =
        '<span class="emoji">' + animal.emoji + "</span>" +
        '<span class="name">' + animal.name + "</span>" +
        '<span class="check">✓</span>';

      card.addEventListener("click", () => toggle(index, card, animal));
      grid.appendChild(card);
    });

    section.appendChild(grid);
    app.appendChild(section);
  });

  updateScore();
}

/* ---------- Marquer / démarquer un animal ---------- */
function toggle(index, card, animal) {
  if (seen.has(index)) {
    seen.delete(index);
    card.classList.remove("seen");
  } else {
    seen.add(index);
    card.classList.add("seen", "pop");
    setTimeout(() => card.classList.remove("pop"), 300);
  }
  speak(animal.name); // dire le nom de l'animal touché
  saveSeen();
  updateScore();
}

/* ---------- Compteur ---------- */
function updateScore() {
  const count = seen.size;
  document.getElementById("score-count").textContent = count;
  document.getElementById("score-label").textContent =
    count > 1 ? "animaux vus" : "animal vu";
}

/* ---------- Récapitulatif parlé ---------- */
function showSummary() {
  const list = [...seen].map((i) => ANIMALS[i]);
  const title = document.getElementById("summary-title");
  const text = document.getElementById("summary-text");
  const container = document.getElementById("summary-list");
  container.innerHTML = "";

  if (list.length === 0) {
    title.textContent = "🐾 Aucun animal pour l'instant";
    text.textContent = "Touche les animaux que tu vois au safari !";
    document.getElementById("summary").classList.remove("hidden");
    return;
  }

  title.textContent = "🎉 Bravo !";
  text.textContent =
    "Tu as vu " + list.length + (list.length > 1 ? " animaux :" : " animal :");

  list.forEach((a) => {
    const item = document.createElement("div");
    item.className = "summary-item";
    item.innerHTML =
      '<span class="emoji">' + a.emoji + "</span>" + a.name;
    container.appendChild(item);
  });

  document.getElementById("summary").classList.remove("hidden");

  // Lire la liste à voix haute, un animal après l'autre
  const phrase =
    "Bravo ! Tu as vu " +
    list.map((a) => a.name).join(", ") +
    ".";
  speak(phrase);
}

/* ---------- Réinitialiser ---------- */
function reset() {
  if (seen.size === 0) return;
  if (!confirm("Effacer tous les animaux vus ?")) return;
  seen = new Set();
  saveSeen();
  render();
}

/* ---------- Sauvegarde locale ---------- */
function loadSeen() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch (e) {
    return new Set();
  }
}

function saveSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...seen]));
  } catch (e) {
    /* mode privé : on ignore */
  }
}

/* ---------- Branchements ---------- */
document.getElementById("say-all").addEventListener("click", showSummary);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("summary-close").addEventListener("click", () => {
  document.getElementById("summary").classList.add("hidden");
  window.speechSynthesis && window.speechSynthesis.cancel();
});
document.getElementById("summary").addEventListener("click", (e) => {
  if (e.target.id === "summary") {
    e.target.classList.add("hidden");
    window.speechSynthesis && window.speechSynthesis.cancel();
  }
});

render();
