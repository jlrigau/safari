/* =====================================================================
   Mon Safari à Thoiry — application pour les enfants de maternelle
   Liste des animaux reprise du panneau « Les habitants du safari ».

   Les vraies photos sont chargées depuis Wikipédia (côté navigateur) à
   partir du nom scientifique latin de chaque animal. L'emoji sert de
   repli tant que la photo n'est pas chargée (ou si elle est introuvable).
   ===================================================================== */

const ANIMALS = [
  // ---------- EN AFRIQUE ----------
  { region: "afrique", emoji: "🐘", name: "Éléphant de savane", wiki: ["Loxodonta africana"] },
  { region: "afrique", emoji: "🦏", name: "Rhinocéros blanc", wiki: ["Ceratotherium simum", "Rhinocéros blanc"] },
  { region: "afrique", emoji: "🦛", name: "Hippopotame", wiki: ["Hippopotamus amphibius", "Hippopotame amphibie"] },
  { region: "afrique", emoji: "🦃", name: "Autruche d'Afrique", wiki: ["Struthio camelus", "Autruche d'Afrique"] },
  { region: "afrique", emoji: "🦒", name: "Girafe du Kordofan", wiki: ["Giraffa camelopardalis antiquorum", "Girafe du Kordofan", "Giraffa camelopardalis"] },
  { region: "afrique", emoji: "🦌", name: "Éland du Cap", wiki: ["Taurotragus oryx", "Éland du Cap"] },
  { region: "afrique", emoji: "🦌", name: "Grand koudou", wiki: ["Tragelaphus strepsiceros", "Grand koudou"] },
  { region: "afrique", emoji: "🐐", name: "Hippotrague noir", wiki: ["Hippotragus niger", "Hippotrague noir"] },
  { region: "afrique", emoji: "🐄", name: "Vache watusi", wiki: ["Ankole-Watusi", "Watusi (race bovine)", "Watusi"] },
  { region: "afrique", emoji: "🦓", name: "Zèbre de Chapman", wiki: ["Equus quagga chapmani", "Zèbre de Chapman", "Equus quagga"] },
  { region: "afrique", emoji: "🦌", name: "Cobe à croissant", wiki: ["Kobus ellipsiprymnus", "Cobe à croissant"] },
  { region: "afrique", emoji: "🐏", name: "Oryx algazelle", wiki: ["Oryx dammah", "Oryx algazelle"] },
  { region: "afrique", emoji: "🐃", name: "Gnou à queue blanche", wiki: ["Connochaetes gnou", "Gnou noir", "Gnou à queue blanche"] },
  { region: "afrique", emoji: "🐃", name: "Gnou bleu", wiki: ["Connochaetes taurinus", "Gnou bleu"] },
  { region: "afrique", emoji: "🦌", name: "Cobe lechwe", wiki: ["Kobus leche", "Cobe lechwe", "Lechwe"] },
  { region: "afrique", emoji: "🐦", name: "Grue royale", wiki: ["Balearica regulorum", "Grue royale"] },
  { region: "afrique", emoji: "🦌", name: "Sitatunga du Gabon", wiki: ["Tragelaphus spekii", "Sitatunga", "Sitatunga du Gabon"] },
  { region: "afrique", emoji: "🦌", name: "Springbok", wiki: ["Antidorcas marsupialis", "Springbok"] },
  { region: "afrique", emoji: "🐗", name: "Phacochère commun", wiki: ["Phacochoerus africanus", "Phacochère commun"] },

  // ---------- EN AMÉRIQUE ----------
  { region: "amerique", emoji: "🦬", name: "Bison d'Amérique", wiki: ["Bison bison", "Bison d'Amérique"] },
  { region: "amerique", emoji: "🐻", name: "Ours noir d'Amérique", wiki: ["Ursus americanus", "Ours noir"] },
  { region: "amerique", emoji: "🐻", name: "Ours à lunettes", wiki: ["Tremarctos ornatus", "Ours à lunettes"] },
  { region: "amerique", emoji: "🐺", name: "Loup du Canada", wiki: ["Canis lupus occidentalis", "Loup du Canada", "Canis lupus"] },
  { region: "amerique", emoji: "🐺", name: "Coyote", wiki: ["Canis latrans", "Coyote"] },

  // ---------- EN EURASIE ----------
  { region: "eurasie", emoji: "🦬", name: "Bison d'Europe", wiki: ["Bison bonasus", "Bison d'Europe"] },
  { region: "eurasie", emoji: "🐎", name: "Cheval de Przewalski", wiki: ["Equus ferus przewalskii", "Cheval de Przewalski", "Equus przewalskii"] },
  { region: "eurasie", emoji: "🦌", name: "Daim d'Europe", wiki: ["Dama dama", "Daim européen", "Daim"] },
];

const REGIONS = [
  { id: "afrique",  label: "🌍 En Afrique" },
  { id: "amerique", label: "🌎 En Amérique" },
  { id: "eurasie",  label: "🌏 En Eurasie" },
];

const STORAGE_KEY = "safari-thoiry-vus";

/* Cache des URLs de photos déjà résolues (mémoire + navigateur) */
const photoCache = {};

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

/* ---------- Chargement des vraies photos depuis Wikipédia ---------- */

// Source 1 : API « pageimages » (image principale d'un article)
async function fetchThumbPageImages(lang, title, size) {
  const url =
    "https://" + lang + ".wikipedia.org/w/api.php" +
    "?action=query&format=json&prop=pageimages&piprop=thumbnail" +
    "&pithumbsize=" + size + "&redirects=1&origin=*&titles=" +
    encodeURIComponent(title);
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const pages = data.query && data.query.pages;
  if (!pages) return null;
  for (const k in pages) {
    const t = pages[k].thumbnail;
    if (t && t.source) return t.source;
  }
  return null;
}

// Source 2 : API REST « summary » (vignette de la fiche)
async function fetchThumbSummary(lang, title) {
  const url =
    "https://" + lang + ".wikipedia.org/api/rest_v1/page/summary/" +
    encodeURIComponent(title.replace(/ /g, "_"));
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (data.thumbnail && data.thumbnail.source) return data.thumbnail.source;
  if (data.originalimage && data.originalimage.source) return data.originalimage.source;
  return null;
}

// Résout l'URL de la photo d'un animal en essayant plusieurs noms et sources
async function resolvePhoto(animal) {
  const key = "photo:" + animal.name;
  if (photoCache[animal.name]) return photoCache[animal.name];

  const stored = localStorage.getItem(key);
  if (stored) {
    photoCache[animal.name] = stored;
    return stored;
  }

  const candidates = animal.wiki && animal.wiki.length ? animal.wiki : [animal.name];
  for (const title of candidates) {
    for (const lang of ["fr", "en"]) {
      try {
        const src =
          (await fetchThumbPageImages(lang, title, 500)) ||
          (await fetchThumbSummary(lang, title));
        if (src) {
          photoCache[animal.name] = src;
          try { localStorage.setItem(key, src); } catch (e) {}
          return src;
        }
      } catch (e) {
        /* réseau/CORS indisponible : on garde l'emoji */
      }
    }
  }
  return null; // aucune photo trouvée → emoji conservé
}

// Charge les photos de toutes les cartes affichées
function loadPhotos() {
  document.querySelectorAll(".animal").forEach((card) => {
    const index = Number(card.dataset.index);
    const animal = ANIMALS[index];
    const img = card.querySelector(".photo");
    if (!img || card.classList.contains("has-photo")) return;

    resolvePhoto(animal).then((src) => {
      if (!src) return;
      img.onload = () => card.classList.add("has-photo");
      img.src = src;
    });
  });
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
        '<div class="thumb">' +
          '<span class="emoji">' + animal.emoji + "</span>" +
          '<img class="photo" alt="" loading="lazy" />' +
        "</div>" +
        '<span class="name">' + animal.name + "</span>" +
        '<span class="check">✓</span>';

      card.addEventListener("click", () => toggle(index, card, animal));
      grid.appendChild(card);
    });

    section.appendChild(grid);
    app.appendChild(section);
  });

  updateScore();
  loadPhotos();
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
    const photo = photoCache[a.name];
    item.innerHTML =
      (photo
        ? '<img class="photo" alt="" src="' + photo + '" />'
        : '<span class="emoji">' + a.emoji + "</span>") +
      a.name;
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
