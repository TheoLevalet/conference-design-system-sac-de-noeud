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
npm run preview    # prévisualiser la version de production

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
  00-ouverture.html           titre, question au public, explosion de boutons, speakers
  01-sac-de-noeuds.html       ① ce qu'est un design system, le bilan, les 4 équipes, libs/shared, la vraie question
  02-decouper.html            ② Atomic Design (de quoi c'est fait ?), le contexte (qui s'en sert ?), la grille qui les croise
  03-reparer/                 ③ ConferenceHub réparé pièce par pièce, chaque pièce rangée à son adresse :
    01-ecran-avant.html         l'écran « avant »
    02-tokens.html              17 nuances, tokens bruts → sémantiques, alias CSS · question G3
    03-atomes.html              un seul Button, un seul Badge · questions P1, S2
    04-molecules.html           un seul SearchField · question G1
    05-organismes.html          la Card à 42 inputs, Sandi Metz, EventCard, composition, les libs · questions G2, S1
    06-page-theme.html          la page rangée, puis le mode sombre
  04-six-mois.html            ④ la billetterie arrive : vote du public, Storybook, partagé pour de vrai, la durée · questions P2, S3, S4
  05-conclusion.html          la checklist complète, le bilan du front, la phrase de fin, 3 conseils, merci
vite.config.js                plugin qui remplace <!-- @include … --> par le fichier
src/main.js                   configuration reveal.js, pied de page, QR codes
src/styles/tokens.css         les tokens du deck (bruts + sémantiques)
src/styles/theme.css          typographie, mise en page, code
src/styles/illustrations.css  maquettes HTML/CSS animées (écran fil rouge, badges…)
public/                       memoji des speakers, logos
docs/checklist-pr.md          la checklist du talk, prête à copier dans un modèle de PR
exemple/                      l'écran ConferenceHub réparé en Angular, avec son Storybook
public/storybook/             capture du Storybook de exemple/, affichée dans la partie ④
```

## L'exemple ConferenceHub

[exemple/](exemple/README.md) reproduit l'écran de démo réparé (tokens, Button, Badge, SearchField, Card, EventCard, template, page, mode sombre) dans une petite application Angular, avec un Storybook. Chaque principe du talk y est commenté là où il s'applique ; le README de l'exemple fait la correspondance slide par slide.

```bash
cd exemple
npm install
npm start           # http://localhost:4200 (?theme=dark pour le mode sombre)
npm run storybook   # http://localhost:6006
```

reveal.js a besoin de toutes les `<section>` dans un seul document : le plugin de [vite.config.js](vite.config.js) les assemble en dev comme au build. Modifier un fichier de `slides/` recharge la page.

Pour ajouter une partie : créer le fichier dans `slides/`, puis ajouter `<!-- @include slides/mon-fichier.html -->` à sa place dans `index.html`. Attention, Auto-Animate fonctionne aussi entre deux fichiers : la dernière slide d'un fichier et la première du suivant restent voisines.

Clin d'œil au sujet : `tokens.css` sépare les tokens bruts des tokens sémantiques, et le thème du deck s'appuie sur les sémantiques. Exceptions : `illustrations.css` contient des valeurs en dur, surtout pour montrer le désordre (les 17 nuances rouge-orange, les boutons et l'écran « avant »), et `theme.css` en garde quelques-unes pour le terminal.

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
- Les `data-id` peuvent être **imbriqués** (une carte animée qui contient un bouton animé) et changer de **balise** (`h2` → `h3`) : le matcher maison de [src/auto-animate-matcher.js](src/auto-animate-matcher.js) gère ces cas, que reveal.js gère mal par défaut. Un conteneur animé change de taille sans être déformé, et chaque élément démarre exactement là où il était sur la slide précédente.

## Parties et minutage

| Partie | Minutage | Contenu |
| --- | --- | --- |
| Accroche | 0:00 → 1:00 | question au public, les boutons explosent, les speakers |
| ① Le sac de nœuds | 1:00 → 4:00 | le bilan, les 4 équipes, il manque une frontière |
| ② Comment découper ? | 4:00 → 6:30 | Atomic Design et le contexte : deux questions indépendantes |
| ③ Réparer en rangeant | 6:30 → 13:30 | chaque réparation donne une adresse et une question de la checklist |
| ④ Six mois plus tard | 13:30 → 18:00 | la billetterie, le vote, partagé pour de vrai, la durée |
| Conclusion | 18:00 → 20:00 | la checklist, le bilan, la phrase de fin |

Le détail est dans [plan-presentation.md](plan-presentation.md). Il n'y a pas de temps de questions.

Une slide qui porte `data-part="…"` démarre une nouvelle partie : le pied de page se met à jour tout seul.

### L'écran « avant », réparé étage par étage

La maquette ConferenceHub de la partie ③ porte la classe `messy` : elle affiche volontairement le désordre (plusieurs nuances rouge-orange, plusieurs boutons, deux recherches, trois mises en page de carte). Les deux couleurs de base sont celles du logo Sopra Steria ; les autres nuances sont illustratives, pas une palette officielle complète. Chaque étage se répare :

- par une classe sur la maquette : `fix-tokens`, `fix-atoms`, `fix-molecules`, `fix-organisms` ;
- ou au clic, avec un fragment de la même slide qui porte `data-fix="tokens|atoms|molecules|organisms"` (transition animée).

Un fragment qui porte `data-flag="…"` entoure en rouge les éléments concernés par le problème suivant (`data-spot` sur la maquette).

## À compléter

- [ ] Rendre le repo public (ou changer l'URL du QR code de la slide de ressources)
