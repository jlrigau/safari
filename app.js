/* =====================================================================
   Mon Safari à Thoiry — application pour les enfants de maternelle
   Liste des animaux reprise du panneau « Les habitants du safari ».

   Les vraies photos sont chargées depuis Wikipédia (côté navigateur) à
   partir du nom scientifique latin de chaque animal. L'emoji sert de
   repli tant que la photo n'est pas chargée (ou si elle est introuvable).
   ===================================================================== */

const ANIMALS = [
  // ---------- EN AFRIQUE ----------
  { region: "afrique", emoji: "🐘", name: "Éléphant de savane", wiki: ["Loxodonta africana"],
    desc: "C'est le plus grand animal de la savane. Avec sa longue trompe il attrape les feuilles et boit de l'eau, et ses grandes oreilles lui font de l'air.",
    cri: "Pouèèèt ! Barrrriii !", pitch: 0.6 },
  { region: "afrique", emoji: "🦏", name: "Rhinocéros blanc", wiki: ["Ceratotherium simum", "Rhinocéros blanc"],
    desc: "Un gros animal gris avec deux cornes sur le nez. Il mange de l'herbe presque toute la journée.",
    cri: "Grrrouf ! Grrr !", pitch: 0.7 },
  { region: "afrique", emoji: "🦛", name: "Hippopotame", wiki: ["Hippopotamus amphibius", "Hippopotame amphibie"],
    desc: "Il passe ses journées dans l'eau pour rester au frais et ouvre une très très grande bouche !",
    cri: "Mroo ho ho ho ho !", pitch: 0.6 },
  { region: "afrique", emoji: "🦃", name: "Autruche d'Afrique", wiki: ["Struthio camelus", "Autruche d'Afrique"],
    desc: "C'est le plus grand oiseau du monde. Elle ne sait pas voler, mais elle court très très vite sur ses longues pattes !",
    cri: "Bouh-bouh ! Bouuuh !", pitch: 0.8 },
  { region: "afrique", emoji: "🦒", name: "Girafe du Kordofan", wiki: ["Giraffa camelopardalis antiquorum", "Girafe du Kordofan", "Giraffa camelopardalis"],
    desc: "Avec son très long cou, elle attrape les feuilles tout en haut des arbres. C'est l'animal le plus grand du monde !",
    cri: "Chht... la girafe est presque toujours silencieuse.", pitch: 1.0 },
  { region: "afrique", emoji: "🦌", name: "Éland du Cap", wiki: ["Taurotragus oryx", "Éland du Cap"],
    desc: "C'est la plus grande des antilopes. Les mâles portent de belles cornes torsadées.",
    cri: "Meuh ! Beuh !", pitch: 0.9 },
  { region: "afrique", emoji: "🦌", name: "Grand koudou", wiki: ["Tragelaphus strepsiceros", "Grand koudou"],
    desc: "Une grande antilope avec de longues cornes en spirale et de fines rayures blanches sur le dos.",
    cri: "Ouaf ! Ouaf !", pitch: 0.9 },
  { region: "afrique", emoji: "🐐", name: "Hippotrague noir", wiki: ["Hippotragus niger", "Hippotrague noir"],
    desc: "Une antilope noire au ventre blanc, avec de longues cornes courbées vers l'arrière.",
    cri: "Snort ! Bêêh !", pitch: 0.9 },
  { region: "afrique", emoji: "🐄", name: "Vache watusi", wiki: ["Ankole-Watusi", "Watusi (race bovine)", "Watusi"],
    desc: "Une vache d'Afrique avec d'énormes cornes, parmi les plus grandes du monde !",
    cri: "Meuuuh ! Meuh !", pitch: 0.8 },
  { region: "afrique", emoji: "🦓", name: "Zèbre de Chapman", wiki: ["Equus quagga chapmani", "Zèbre de Chapman", "Equus quagga"],
    desc: "Un cheval sauvage à rayures noires et blanches. Chaque zèbre a des rayures différentes, comme une empreinte !",
    cri: "Hi-han ! Hii hii hii !", pitch: 1.0 },
  { region: "afrique", emoji: "🦌", name: "Cobe à croissant", wiki: ["Kobus ellipsiprymnus", "Cobe à croissant"],
    desc: "Une antilope avec un grand cercle blanc sur les fesses, qui ressemble à un croissant. Elle aime rester près de l'eau.",
    cri: "Beuh ! Snort !", pitch: 0.9 },
  { region: "afrique", emoji: "🐏", name: "Oryx algazelle", wiki: ["Oryx dammah", "Oryx algazelle"],
    desc: "Une antilope blanche du désert avec de longues cornes courbées comme des arcs.",
    cri: "Bêêh ! Snort !", pitch: 0.9 },
  { region: "afrique", emoji: "🐃", name: "Gnou à queue blanche", wiki: ["Connochaetes gnou", "Gnou noir", "Gnou à queue blanche"],
    desc: "Une antilope au museau noir et à la queue blanche, qui vit en troupeau dans la savane.",
    cri: "Gnou ! Gnou !", pitch: 0.8 },
  { region: "afrique", emoji: "🐃", name: "Gnou bleu", wiki: ["Connochaetes taurinus", "Gnou bleu"],
    desc: "Un gnou gris-bleu qui se déplace en très grand troupeau pour chercher de l'herbe.",
    cri: "Gnou ! Meuh !", pitch: 0.8 },
  { region: "afrique", emoji: "🦌", name: "Cobe lechwe", wiki: ["Kobus leche", "Cobe lechwe", "Lechwe"],
    desc: "Une antilope qui adore les marais et l'eau. Ses sabots l'aident à courir dans la boue.",
    cri: "Beuh ! Snort !", pitch: 0.9 },
  { region: "afrique", emoji: "🐦", name: "Grue royale", wiki: ["Balearica regulorum", "Grue royale"],
    desc: "Un bel oiseau avec une couronne de plumes dorées sur la tête. On dirait un roi !",
    cri: "Crrooo ! Crrooo !", pitch: 1.1 },
  { region: "afrique", emoji: "🦌", name: "Sitatunga du Gabon", wiki: ["Tragelaphus spekii", "Sitatunga", "Sitatunga du Gabon"],
    desc: "Une antilope des marais qui sait très bien nager et peut même se cacher dans l'eau !",
    cri: "Ouaf ! Beuh !", pitch: 0.9 },
  { region: "afrique", emoji: "🦌", name: "Springbok", wiki: ["Antidorcas marsupialis", "Springbok"],
    desc: "Une petite antilope rapide qui saute très haut dans les airs quand elle est contente !",
    cri: "Bêê ! Bêê !", pitch: 1.1 },
  { region: "afrique", emoji: "🐗", name: "Phacochère commun", wiki: ["Phacochoerus africanus", "Phacochère commun"],
    desc: "Un cochon sauvage avec des défenses. Quand il court, il lève sa petite queue toute droite en l'air !",
    cri: "Grouik ! Grouik !", pitch: 1.0 },

  // ---------- EN AMÉRIQUE ----------
  { region: "amerique", emoji: "🦬", name: "Bison d'Amérique", wiki: ["Bison bison", "Bison d'Amérique"],
    desc: "Un énorme animal poilu avec une grosse tête et une bosse sur le dos. Il vit dans les grandes plaines.",
    cri: "Mrrrouff ! Grrr !", pitch: 0.6 },
  { region: "amerique", emoji: "🐻", name: "Ours noir d'Amérique", wiki: ["Ursus americanus", "Ours noir"],
    desc: "Un ours qui grimpe très bien aux arbres et qui adore les baies et le miel.",
    cri: "Grrrr ! Rooaar !", pitch: 0.6 },
  { region: "amerique", emoji: "🐻", name: "Ours à lunettes", wiki: ["Tremarctos ornatus", "Ours à lunettes"],
    desc: "Le seul ours d'Amérique du Sud. Il a des cercles clairs autour des yeux, comme des lunettes !",
    cri: "Grrrr ! Grogn !", pitch: 0.6 },
  { region: "amerique", emoji: "🐺", name: "Loup du Canada", wiki: ["Canis lupus occidentalis", "Loup du Canada", "Canis lupus"],
    desc: "Un grand loup gris qui vit en meute, c'est-à-dire en famille. Il hurle pour parler aux autres.",
    cri: "Houuuuuuu ! Aouuuh !", pitch: 0.7 },
  { region: "amerique", emoji: "🐺", name: "Coyote", wiki: ["Canis latrans", "Coyote"],
    desc: "Un cousin du loup, plus petit et très malin. Il vit en Amérique du Nord.",
    cri: "Youp youp youuuh !", pitch: 1.0 },

  // ---------- EN EURASIE ----------
  { region: "eurasie", emoji: "🦬", name: "Bison d'Europe", wiki: ["Bison bonasus", "Bison d'Europe"],
    desc: "Le plus gros animal d'Europe. Il avait presque disparu, et les humains l'ont sauvé.",
    cri: "Mrrrouff ! Grrr !", pitch: 0.6 },
  { region: "eurasie", emoji: "🐎", name: "Cheval de Przewalski", wiki: ["Equus ferus przewalskii", "Cheval de Przewalski", "Equus przewalskii"],
    desc: "Le dernier vrai cheval sauvage du monde ! Il est petit, costaud et n'a jamais été apprivoisé.",
    cri: "Hiiii ! Hi-han !", pitch: 1.0 },
  { region: "eurasie", emoji: "🦌", name: "Daim d'Europe", wiki: ["Dama dama", "Daim européen", "Daim"],
    desc: "Un cerf avec des bois plats comme des mains et de jolies taches blanches sur le dos.",
    cri: "Bram ! Rrooh !", pitch: 0.8 },
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

/* ---------- Synthèse vocale (dire à voix haute en français) ---------- */
function frenchVoice() {
  if (!("speechSynthesis" in window)) return null;
  return window.speechSynthesis
    .getVoices()
    .find((v) => v.lang && v.lang.startsWith("fr"));
}

// Prononce un texte avec un débit/tonalité réglables
function speakWith(text, rate, pitch) {
  if (!("speechSynthesis" in window) || !text) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "fr-FR";
  u.rate = rate;
  u.pitch = pitch;
  const v = frenchVoice();
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

// Prononce plusieurs phrases à la suite (sans se couper entre elles)
function speakSequence(parts) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  parts.forEach((p) => speakWith(p.text, p.rate || 0.9, p.pitch || 1.05));
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  speakWith(text, 0.9, 1.1);
}

// Repli : « cri » parlé (onomatopée) avec une tonalité rigolote
function playCrySpoken(animal) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  speakWith(animal.cri || (animal.name + " ne fait pas de bruit !"), 0.75, animal.pitch || 1.0);
}
// Charger les voix au plus tôt
if ("speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () =>
    window.speechSynthesis.getVoices();
}

/* ---------- Chargement des vraies photos depuis Wikipédia ---------- */

// Écarte les images qui ne sont pas des photos (cartes de répartition,
// schémas, logos…) : elles contiennent des mots-clés reconnaissables ou
// sont des fichiers vectoriels .svg (souvent des cartes).
function isLikelyPhoto(url) {
  const u = url.toLowerCase();
  if (/\.svg(\/|\.|$|\?)/.test(u)) return false;
  if (/(range|distribution|\bmap\b|carte|localisation|locator|aire|repartition|r%c3%a9partition|iucn|status|world|\.ogg|\.oga)/.test(u)) {
    return false;
  }
  return true;
}

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
    if (t && t.source && isLikelyPhoto(t.source)) return t.source;
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
  if (data.thumbnail && data.thumbnail.source && isLikelyPhoto(data.thumbnail.source))
    return data.thumbnail.source;
  if (data.originalimage && data.originalimage.source && isLikelyPhoto(data.originalimage.source))
    return data.originalimage.source;
  return null;
}

// Résout l'URL de la photo d'un animal en essayant plusieurs noms et sources
async function resolvePhoto(animal) {
  const key = "photo2:" + animal.name;
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

/* ---------- Vrais cris d'animaux (best-effort, depuis Wikimedia) ----------
   On cherche un fichier son sur l'article Wikipédia, en évitant les fichiers
   de prononciation du mot. On privilégie la version MP3 transcodée (lisible
   sur iPhone). Si rien n'est jouable, on retombe sur le cri parlé.        */

const cryCache = {};   // nom -> [urls] jouables, ou null si rien trouvé
let currentAudio = null;

function stopAudio() {
  if (currentAudio) {
    try { currentAudio.pause(); } catch (e) {}
    currentAudio = null;
  }
}

// Construit l'URL du MP3 transcodé Wikimedia à partir de l'URL d'origine
function deriveTranscodedMp3(url) {
  try {
    const u = new URL(url);
    if (u.host !== "upload.wikimedia.org") return null;
    const parts = u.pathname.split("/"); // /wikipedia/commons/3/3f/Nom.oga
    const file = parts[parts.length - 1];
    if (!/\.(ogg|oga|flac|wav|opus)$/i.test(file)) return null;
    const repoIdx = parts.indexOf("wikipedia");
    if (repoIdx === -1 || !parts[repoIdx + 1]) return null;
    parts.splice(repoIdx + 2, 0, "transcoded"); // insère après le nom du dépôt
    return u.origin + parts.join("/") + "/" + file + ".mp3";
  } catch (e) {
    return null;
  }
}

// Trouve un fichier audio « cri » sur un article (évite les prononciations)
async function findAudioFile(lang, title) {
  const url =
    "https://" + lang + ".wikipedia.org/w/api.php" +
    "?action=query&format=json&origin=*&redirects=1&prop=images&imlimit=200&titles=" +
    encodeURIComponent(title);
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const pages = data.query && data.query.pages;
  if (!pages) return null;

  let files = [];
  for (const k in pages) {
    if (pages[k].images) files = files.concat(pages[k].images.map((i) => i.title));
  }
  const audio = files.filter((f) => /\.(ogg|oga|wav|flac|mp3|m4a|opus)$/i.test(f));
  if (!audio.length) return null;

  const isPron = (f) =>
    /pronunciation|prononciation|\bLL-Q|(^|[ \-_/:])(en|fr|de|es|it|nl|pt)[\- ]/i.test(f);
  const isSound = (f) =>
    /(call|cry|sound|vocal|roar|trumpet|bray|growl|grunt|bellow|bugle|howl|song|noise|whinny|bark|roaring|grunting)/i.test(f);

  return (
    audio.find((f) => isSound(f) && !isPron(f)) ||
    audio.find((f) => !isPron(f)) ||
    null
  );
}

// Résout l'URL réelle d'un fichier
async function resolveFileUrl(lang, fileTitle) {
  const url =
    "https://" + lang + ".wikipedia.org/w/api.php" +
    "?action=query&format=json&origin=*&prop=imageinfo&iiprop=url&titles=" +
    encodeURIComponent(fileTitle);
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const pages = data.query && data.query.pages;
  if (!pages) return null;
  for (const k in pages) {
    const ii = pages[k].imageinfo;
    if (ii && ii[0] && ii[0].url) return ii[0].url;
  }
  return null;
}

// Résout (et met en cache) la liste d'URLs jouables pour le cri d'un animal
async function resolveCry(animal) {
  if (animal.name in cryCache) return cryCache[animal.name];

  const candidates = animal.wiki && animal.wiki.length ? animal.wiki : [animal.name];
  for (const title of candidates) {
    for (const lang of ["fr", "en"]) {
      try {
        const file = await findAudioFile(lang, title);
        if (!file) continue;
        const orig = await resolveFileUrl(lang, file);
        if (!orig) continue;
        const urls = [];
        const mp3 = deriveTranscodedMp3(orig);
        if (mp3) urls.push(mp3); // MP3 d'abord (iPhone)
        urls.push(orig);
        cryCache[animal.name] = urls;
        return urls;
      } catch (e) {
        /* on continue */
      }
    }
  }
  cryCache[animal.name] = null;
  return null;
}

// Essaie de jouer une liste d'URLs, sinon retombe sur le cri parlé
function playUrlList(animal, urls, idx) {
  if (idx >= urls.length) {
    playCrySpoken(animal);
    return;
  }
  stopAudio();
  const a = new Audio();
  currentAudio = a;
  a.addEventListener("error", () => playUrlList(animal, urls, idx + 1), { once: true });
  a.src = urls[idx];
  const p = a.play();
  if (p && p.catch) p.catch(() => playUrlList(animal, urls, idx + 1));
}

// Joue le cri : vrai son si disponible, sinon onomatopée
function playCry(animal) {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  const urls = cryCache[animal.name];
  if (urls && urls.length) {
    playUrlList(animal, urls, 0);
  } else {
    playCrySpoken(animal);
    if (!(animal.name in cryCache)) resolveCry(animal); // pour la prochaine fois
  }
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
          '<span class="info" role="button" aria-label="En savoir plus sur ' +
            animal.name + '">i</span>' +
        "</div>" +
        '<span class="name">' + animal.name + "</span>" +
        '<span class="check">✓</span>';

      card.addEventListener("click", () => toggle(index, card, animal));

      // Le bouton ℹ️ ouvre la fiche sans marquer l'animal comme vu
      card.querySelector(".info").addEventListener("click", (e) => {
        e.stopPropagation();
        openDetail(animal);
      });

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

/* ---------- Fiche détaillée d'un animal (description + cri) ---------- */
let currentDetail = null;

function openDetail(animal) {
  currentDetail = animal;

  const thumb = document.getElementById("detail-thumb");
  const photo = photoCache[animal.name];
  thumb.innerHTML = photo
    ? '<img class="photo" alt="" src="' + photo + '" />'
    : '<span class="emoji">' + animal.emoji + "</span>";

  document.getElementById("detail-name").textContent = animal.name;
  document.getElementById("detail-desc").textContent = animal.desc || "";

  document.getElementById("detail").classList.remove("hidden");

  // Pré-charge le vrai cri en arrière-plan (prêt dès le clic sur « Le cri »)
  resolveCry(animal);

  // Lit le nom puis la description à voix haute (pour les non-lecteurs)
  speakSequence([
    { text: animal.name, rate: 0.9, pitch: 1.1 },
    { text: animal.desc || "", rate: 0.95, pitch: 1.05 },
  ]);
}

function closeDetail() {
  document.getElementById("detail").classList.add("hidden");
  stopAudio();
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  currentDetail = null;
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

// Fiche détaillée : cri, relecture, fermeture
document.getElementById("detail-cry").addEventListener("click", () => {
  if (currentDetail) playCry(currentDetail);
});
document.getElementById("detail-read").addEventListener("click", () => {
  if (currentDetail) {
    speakSequence([
      { text: currentDetail.name, rate: 0.9, pitch: 1.1 },
      { text: currentDetail.desc || "", rate: 0.95, pitch: 1.05 },
    ]);
  }
});
document.getElementById("detail-close").addEventListener("click", closeDetail);
document.getElementById("detail").addEventListener("click", (e) => {
  if (e.target.id === "detail") closeDetail();
});

render();
