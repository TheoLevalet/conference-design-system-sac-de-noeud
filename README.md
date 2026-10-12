# Design system : le sac de nœuds 🪢

Slides du talk à deux voix (20 min + 5 min de questions) : **qu'est-ce qui mérite d'entrer dans un design system, et surtout qu'est-ce qui doit rester dehors ?**

## Speakers

| | Métier | Entreprise | Rôle sur scène |
| --- | --- | --- | --- |
| 👩‍💻 **Wafa** | Développeuse fullstack | Sopra Steria | la référente design system / Atomic Design : pose les frontières, la règle et la checklist |
| 🧑‍💻 **Théo** | Lead dev augmenté | TechTown | le développeur pressé : propose les ajouts « qui pourraient resservir », porte les illustrations |

Les rôles de scène sont des personnages : ils incarnent deux réflexes qu'on retrouve dans toutes les équipes.

Construit avec [reveal.js](https://revealjs.com) 6 et Vite, en s'appuyant largement sur les transitions [Auto-Animate](https://revealjs.com/auto-animate/).

## Lancer les slides

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # version statique dans dist/
```

| Touche | Action |
| --- | --- |
| `S` | Vue orateur : dialogues Wafa / Théo, minutage |
| `F` | Plein écran |
| `Échap` | Vue d'ensemble |
| `Alt` + clic | Zoom |

## Structure

```
index.html                    squelette : inclut les fichiers de slides/ dans l'ordre
slides/
  00-ouverture.html           titre, explosion de boutons, speakers
  01-probleme.html            ① le bilan, les 4 équipes, la vraie question
  02-fondations.html          ② Atomic Design, tokens, frontières
  03-ecran-demonte.html       ③ l'écran fil rouge, Storybook
  04-composant-universel.html ④ la Card à 42 inputs, composition
  05-regle.html               ⑤ 3 destinations, la règle, la checklist
  06-conclusion.html          message final, ressources, merci
vite.config.js                plugin qui remplace <!-- @include … --> par le fichier
src/main.js                   configuration reveal.js, pied de page, QR codes
src/styles/tokens.css         les tokens du deck (bruts + sémantiques)
src/styles/theme.css          typographie, mise en page, code
src/styles/illustrations.css  maquettes HTML/CSS animées (écran fil rouge, badges…)
public/                       memoji des speakers, logos
docs/checklist-pr.md          la checklist du talk, prête à copier dans un modèle de PR
```

reveal.js a besoin de toutes les `<section>` dans un seul document : le plugin de [vite.config.js](vite.config.js) les assemble en dev comme au build. Modifier un fichier de `slides/` recharge la page.

Pour ajouter une partie : créer le fichier dans `slides/`, puis ajouter `<!-- @include slides/mon-fichier.html -->` à sa place dans `index.html`. Attention, Auto-Animate fonctionne aussi entre deux fichiers : la dernière slide d'un fichier et la première du suivant restent voisines.

Clin d'œil au sujet : le CSS du deck applique sa propre règle. Seul `tokens.css` contient des valeurs brutes, le reste ne connaît que les tokens sémantiques.

## Les règles d'une bonne slide

1. **Une idée par slide.** Si on hésite, on coupe en deux et on relie avec Auto-Animate.
2. **Illustrer** : emojis, maquettes HTML, schémas. Pas de mur de texte.
3. **5 puces maximum.**
4. **Mettre en valeur l'essentiel** avec `<span class="hl">` (surligneur).
5. **Fond blanc dès qu'il y a du texte.** Fond sombre (`data-background-color="#020617"`) réservé au code.
6. **Animer** : fragments pour le rythme, Auto-Animate pour les transformations.

## Écrire une transition Auto-Animate

Deux slides consécutives avec `data-auto-animate`. Les éléments qui partagent le même `data-id` sont animés de leur position, taille et couleur de départ vers celles d'arrivée.

```html
<section data-auto-animate>
  <div class="tile" data-id="box">Avant</div>
</section>
<section data-auto-animate>
  <div class="tile primary" data-id="box" style="width: 800px">Après</div>
</section>
```

À savoir :

- **Pas de `transform` CSS** sur les éléments animés : reveal s'en sert déjà pour l'animation. Positionner avec `left`/`top`, la grille ou flexbox.
- Pour qu'un élément « surgisse » d'un autre, le placer dès la slide précédente au même endroit avec `opacity: 0` (voir l'explosion de boutons de la slide 1).
- Pour le code, mettre le même `data-id` sur les `<pre>` : reveal anime les lignes ajoutées et supprimées.
- Une slide intercalée sans `data-auto-animate` casse la chaîne.

## Parties et minutage

| Partie | Minutage | Contenu |
| --- | --- | --- |
| ① Le problème | 0:00 → 4:00 | les boutons, le bilan, les 4 équipes, la vraie question |
| ② Les fondations | 4:00 → 8:00 | Atomic Design, tokens bruts et sémantiques, DTCG, frontières |
| ③ Un écran, démonté | 8:00 → 13:00 | page → template → EventCard → primitives → tokens → changement de marque, Storybook |
| ④ Le composant universel | 13:00 → 16:00 | la Card à 42 inputs, composition |
| ⑤ La règle | 16:00 → 20:00 | 3 destinations, la règle, la checklist, conclusion |

Une slide qui porte `data-part="…"` démarre une nouvelle partie : le pied de page se met à jour tout seul.

## À compléter

- [ ] Rendre le repo public (ou changer l'URL du QR code de la slide de ressources)
