# 🦁 Mon Safari à Thoiry

Petite application web pensée pour les **enfants de maternelle** qui visitent le
parc zoologique de Thoiry. Elle reprend la liste des animaux du panneau
« Les habitants du safari » et permet à l'enfant de **dire quels animaux il a
vus** — même s'il ne sait pas encore lire.

## ✨ Ce que fait l'application

- 🐘 **Tous les animaux du panneau**, classés par région (Afrique, Amérique, Eurasie).
- 👆 L'enfant **touche** un animal qu'il a vu : la carte se colore et un ✓ apparaît.
- 🔊 **Le nom de l'animal est dit à voix haute** en français à chaque touche
  (synthèse vocale du navigateur) — idéal pour les non-lecteurs.
- 🎉 Le bouton **« Dire mes animaux »** récapitule et lit à voix haute la liste
  des animaux vus.
- 💾 La sélection est **sauvegardée** dans le navigateur (on peut fermer et revenir).
- 📱 Interface **grosse, colorée et tactile**, pensée pour une tablette ou un
  téléphone, et fonctionne **hors-ligne**.

## 🚀 Utilisation en ligne

Une fois le déploiement effectué, l'application est disponible ici :

**https://jlrigau.github.io/safari/**

## 🖥️ Lancer en local

Aucune installation : il suffit d'ouvrir `index.html` dans un navigateur.
Pour la synthèse vocale, mieux vaut passer par un petit serveur local :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## 🛠️ Déploiement (GitHub Pages)

Le site est un site **statique** publié directement depuis la branche `main`.

Réglage (une seule fois) dans **Settings → Pages** :

- **Source** : *Deploy from a branch*
- **Branch** : `main` — dossier `/ (root)`

Chaque push sur `main` met ensuite le site à jour automatiquement.
Le fichier `.nojekyll` indique à GitHub de servir les fichiers tels quels
(sans traitement Jekyll).

## 📂 Structure

| Fichier        | Rôle                                   |
| -------------- | -------------------------------------- |
| `index.html`   | Structure de la page                   |
| `style.css`    | Mise en forme (couleurs, grille…)      |
| `app.js`       | Liste des animaux et logique de l'app  |

## 🐾 Animaux inclus

**Afrique :** éléphant de savane, rhinocéros blanc, hippopotame, autruche,
girafe du Kordofan, éland du Cap, grand koudou, hippotrague noir, vache watusi,
zèbre de Chapman, cobe à croissant, oryx algazelle, gnou à queue blanche,
gnou bleu, cobe lechwe, grue royale, sitatunga du Gabon, springbok,
phacochère commun.

**Amérique :** bison d'Amérique, ours noir, ours à lunettes, loup du Canada,
coyote.

**Eurasie :** bison d'Europe, cheval de Przewalski, daim d'Europe.
