# Design system : le sac de nœuds — Plan v3

> Ce qui entre dans un design system… et surtout ce qui reste dehors.

- **Format** : quickie de 20 minutes, deux speakers (Wafa et Théo).
- **Public** : chefs de projet, directeurs, designers, architectes, développeurs et référents techniques. Aucun prérequis sur Atomic Design.
- **Question centrale** : pour chaque pièce d'un front, où doit-elle vivre pour que le front tienne dans le temps ?
- **Fil conducteur** : la maquette ConferenceHub. On la répare en rangeant chaque pièce à sa place, puis on la fait vieillir de six mois avec l'arrivée d'une application de billetterie.
- **Fil caché** : la checklist se construit pendant la réparation, une question par étape, puis on la montre en entier à la fin.
- **Minutage** : 20 minutes de présentation, sans temps de questions. Les notes contiennent environ 2 150 mots (mesure du 12 novembre) : à 120–130 mots/minute, compter 16 min 30 à 18 minutes de parole, plus 4–5 minutes pour les clics, les pauses et les votes. On dépasse donc les 20 minutes d'une à deux minutes sur le papier : à trancher en répétition chronométrée, en coupant une slide de la conclusion si besoin.
- **Répartition de parole** : environ 49 % Théo / 51 % Wafa en nombre de mots. Wafa porte les principes ; Théo explique aussi leur application concrète, la composition, les dépendances et la réutilisation. Les deux participent à la checklist.

## Vue d'ensemble

| # | Partie | Timing | Contenu | Public |
|---|---|---:|---|---|
| 1 | Accroche | 0:00 → 1:00 | Deux questions sur le petit bouton, les boutons explosent, les speakers | Mains levées |
| 2 | Le sac de nœuds | 1:00 → 4:00 | Ce qu'est un design system, puis le bilan et les quatre bonnes raisons. Il manque une frontière. | — |
| 3 | Comment découper ? | 4:00 → 6:30 | Atomic Design (de quoi c'est fait) et le contexte (qui s'en sert), puis la grille qui les croise pour décider où placer chaque composant. | — |
| 4 | Réparer en rangeant | 6:30 → 13:30 | ConferenceHub, pièce par pièce. Chaque réparation dit où va la pièce et ajoute une question à la checklist. | — |
| 5 | Six mois plus tard | 13:30 → 18:00 | La billetterie arrive avec ses composants et veut réutiliser l'existant. | Vote par pièce |
| 6 | Conclusion | 18:00 → 20:00 | La checklist complète, le bilan du front, trois derniers conseils | — |

## 1 · Accroche (0:00 → 1:00)

- **Pas de sketch.** Deux questions à main levée, posées par Théo devant le seul bouton « ＋ Ajouter un bouton » :
  - « Levez la main si vous avez déjà ajouté un petit bouton dans un projet. »
  - « Gardez-la levée si, ce jour-là, il existait déjà un petit bouton qui faisait la même chose. »
- **On avance :** les boutons explosent, 2 secondes de silence, puis Wafa : « Vous êtes au bon endroit. »
- Le « petit bouton » revient en conclusion.
- Viennent ensuite les badges des speakers.

## 2 · Le sac de nœuds (1:00 → 4:00)

- **Définir le design system ici,** en une phrase : la boîte à outils commune (fondations, composants, règles d'usage, documentation). Sans cette définition, « sac de nœuds » ne veut rien dire.
- **Le bilan :** un produit, 4 équipes, 2 ans, 7 boutons… et 0 personne capable d'expliquer lequel utiliser.
- **Les quatre bonnes raisons :** chaque décision est raisonnable localement. C'est leur somme qui fait le chaos, et `libs/shared` devient un vide-grenier.
- **Ce qui manque,** c'est une frontière : décider ce qui est commun et ce qui reste chez soi.

## 3 · Comment découper ? (4:00 → 6:30)

On reste en vue d'ensemble : le détail vient dans la partie 4.

### Trois notions, trois questions, à ne jamais mélanger

| Notion | Question à laquelle elle répond | Valeurs | Source | Introduite |
|---|---|---|---|---|
| **Atomic Design** | *De quoi c'est fait ?* (taille, composition) | atome, molécule, organisme, template, page | Brad Frost, *Atomic Design*, chapitre 2 | Partie 3 |
| **Contexte** | *Qui s'en sert ?* (portée de la réutilisation) | component, recipe, snowflake | Brad Frost, *Design system components, recipes, and snowflakes* | Partie 3 |
| **Frontière de libs** | *Où vit le code, et qui a le droit de dépendre de qui ?* | `libs/tokens`, `libs/ui`, `libs/<domaine>`, `apps/<app>` | Notre architecture d'exemple | Partie 4, étape Card |

**La phrase qui relie les trois :** « Le niveau Atomic Design dit de quoi c'est fait. Le contexte dit où le placer : dans le design system, dans une bibliothèque métier ou dans l'application. » Les noms des libs viennent ensuite, à l'étape Card.

**Les deux premières notions sont indépendantes.** Un même niveau peut avoir des contextes différents, et c'est ce que la slide doit montrer :

| | Component (`libs/ui`) | Recipe (`libs/events`) | Snowflake (`apps/web`) |
|---|---|---|---|
| **Atome** | Button, Badge | — | — |
| **Molécule** | SearchField | — | — |
| **Organisme** | Card | EventCard | Le bandeau ponctuel |

On peut construire cette grille à l'écran en deux temps : d'abord les lignes (Atomic Design), puis les colonnes (le contexte).

**Les tokens** ne sont pas un contexte. Ce sont les fondations du design system, rangées dans `libs/tokens`, sous `libs/ui`.

### Déroulé de la partie
- **Atomic Design :**
  - une seule slide, illustrée à partir d'un bouton et de compositions, sans nommer encore le projet ;
  - c'est un modèle de composition, pas une arborescence de dossiers (le gag des dossiers `atoms/` montre justement la confusion) ;
  - pourquoi ce découpage : c'est le plus connu, et il donne un vocabulaire commun aux designers et aux développeurs.
- **Le contexte,** même auteur : Frost découpe aussi selon qui s'en sert. Ces trois catégories aident à décider où placer chaque composant.
- **La grille niveau × contexte :** EventCard et Card sont toutes deux des organismes, mais l'une est métier et l'autre générique.
- **Les libs n'apparaissent pas encore,** pour ne pas introduire trois notions d'un coup. On les montre à l'étape Card, pour concrétiser ce rangement dans le code.

### Vocabulaire à tenir partout (slides et notes)
- « **Où placer le composant ?** » = la question pratique. Le contexte guide le choix ; le dossier le concrétise. Le niveau décrit seulement la composition.
- « **design system** » = component, codé dans `libs/ui` et `libs/tokens`.
- « **recipe** » = codée dans une lib de domaine (`libs/events`). On évite « lib métier » seul, sans dire « recipe ».
- « **snowflake** » = reste dans l'application (`apps/web`).
- On ne dit jamais « une recipe est souvent un organisme » (c'est le cas aujourd'hui sur la slide 33) : ça recolle les deux notions qu'on vient de séparer.

## 4 · Réparer en rangeant (6:30 → 13:30)

- **Structure répétée,** toujours dans le même ordre :
  1. problème visible sur l'écran ;
  2. réparation ;
  3. niveau (*de quoi c'est fait*) ;
  4. contexte (*qui s'en sert*) ;
  5. question ajoutée à la checklist.
- **À partir de l'étape Card,** on ajoute la lib (*où vit le code*).
- **Construction de la checklist :** chaque question apparaît dans un coin de l'écran, rangée sous son critère (générique, stable ou partagé). On la retrouve en entier dans la conclusion.

| Étape | Problème sur l'écran | Réparation | Niveau | Contexte | Lib | Questions ajoutées |
|---|---|---|---|---|---|---|
| Tokens | Des nuances rouge-orange sans rôle | Des tokens sémantiques | — (fondations) | Design system | `libs/tokens` | G3 |
| Button, Badge | Quatre boutons « S'inscrire » | Un seul atome, un vrai `<button>` | Atome | Component | `libs/ui` | P1, S2 |
| SearchField | Deux recherches bricolées | Une molécule qui ne sait pas ce qu'on cherche | Molécule | Component | `libs/ui` | G1 |
| Card | Le gag « juste un input », 42 inputs | Une Card à slots, puis EventCard qui compose | Organisme | Card → component, EventCard → recipe | `libs/ui`, `libs/events` | G2, S1 |
| Bandeau ponctuel | Un message unique sur une page | Il reste là où il sert | Organisme | Snowflake | `apps/web` | — (un « non » renvoie ailleurs) |
| Page et thème | Le client veut un mode sombre | On change les valeurs des tokens, pas les composants | Page | — | — | — (c'est la preuve) |

- **Étape Card :**
  - Sandi Metz y reste ;
  - la frontière en libs y est **introduite** : « concrètement, où va le code ? » ;
  - le sens des dépendances, `apps/web → libs/events → libs/ui → libs/tokens`, est vérifié par un outil.
- **Allégés ou retirés :**
  - les définitions séparées d'atome et de molécule ;
  - le circuit des outils pour les tokens ;
  - le template ;
  - la répétition des précautions.

## 5 · Six mois plus tard (13:30 → 18:00)

- **La situation :** une application de billetterie arrive avec ses propres composants. Elle veut réutiliser une partie de l'existant.
- **Réveiller le public :** on montre trois ou quatre pièces de la billetterie. Pour chacune, la salle vote à main levée : component du design system, recipe métier ou snowflake local ? Exemples :
  - son bouton « Payer » ;
  - EventCard, qu'elle voudrait reprendre ;
  - un sélecteur de places ;
  - un bandeau promotionnel.
- **Ce que ça montre :**
  - **« Partagé » devient réel :** Button et SearchField servent tels quels dans deux produits.
  - **La promotion :** une recipe (EventCard) ne monte pas automatiquement au design system. On regarde si un besoin générique se dégage.
  - **La dépréciation :** les anciens boutons sont marqués comme dépréciés et migrés progressivement.
  - **La gouvernance :** qui décide, et qui maintient. La checklist sert dans la PR.
- **Questions ajoutées :** P2 (un besoin dans plusieurs produits), S3 (qui maintient), S4 (les changements cassants annoncés et la dépréciation progressive). La checklist est alors complète.
- Storybook n'est plus mentionné qu'en une phrase, comme l'endroit où la billetterie découvre ce qui existe déjà.

## La checklist v3 : 9 questions, rangées sous la règle

Les questions sont regroupées sous les trois mots de la règle. La règle et la checklist deviennent une seule et même chose, et « stable » est enfin vérifié.

| # | Critère | Question | Introduite à |
|---|---|---|---|
| G1 | Générique | Peut-il servir sans aucun vocabulaire métier ? | SearchField |
| G2 | Générique | Les variations passent-elles par la composition (slots) plutôt que par des options ? | Card |
| G3 | Générique | Ses styles n'utilisent-ils que des tokens sémantiques ? | Tokens |
| S1 | Stable | Son API est-elle petite, sans options pour des cas hypothétiques ? | Card (les 42 inputs) |
| S2 | Stable | Ses états sont-ils visibles dans Storybook, et l'accessibilité vérifiée (clavier, focus, lecteur d'écran) ? | Button |
| S3 | Stable | Une personne ou une équipe le maintient-elle ? | Six mois plus tard |
| S4 | Stable | Les changements cassants sont-ils annoncés, et les anciennes versions dépréciées progressivement ? | Six mois plus tard |
| P1 | Partagé | A-t-on vérifié qu'il n'existe pas déjà dans le catalogue ? | Button (les quatre équipes) |
| P2 | Partagé | Un besoin réel existe-t-il dans plusieurs produits ? | Six mois plus tard (la billetterie) |

`docs/checklist-pr.md` et la slide de conclusion reprennent ces 9 questions.

## 6 · Conclusion (18:00 → 20:00)

- **La checklist complète,** construite pendant le talk. Elle est disponible dans le dépôt.
- **Le bilan du front :** ConferenceHub et la billetterie, avec chaque pièce à sa place dans le code. On passe de 7 boutons à 1, et `libs/shared` est remplacé par des frontières claires.
- **La phrase de fin :** « Tout ce qui est réutilisable n'a pas besoin d'entrer dans le design system. Button va dans le design system, EventCard dans la bibliothèque métier, le bandeau temporaire dans sa page. »
- **Comment faire ça demain ?** Slide 43, « Pour mercredi matin », après le bilan et la règle de placement, avant le retour au petit bouton. Ce passage remplace les trois conseils généraux ; il n'ajoute pas de slide.
  - Théo pose la question. Wafa raconte le cas du projet : plusieurs boutons similaires avaient été créés séparément ; un problème de style ou d'accessibilité obligeait à les retrouver et à les corriger écran par écran. Elle oppose cette maintenance répétée à la correction d'un `Button` partagé, faite à la source.
  - La slide donne ensuite une marche à suivre : partir d'un écran, comparer les boutons, tester Tab, le focus, Entrée et Espace, puis vérifier le nom au lecteur d'écran. Choisir le bouton commun, corriger et documenter ses états, puis remplacer les doublons sur cet écran avec la checklist dans la PR.
  - En répétition, Wafa confirme que l'exemple correspond à son vécu et précise le problème observé. Vérifier également que la correction du composant partagé n'est pas contredite par des styles ou variantes locales.
- **Le retour au petit bouton :** « Et si vous avez un petit bouton à ajouter… demandez-vous d'abord où le placer. »

## Attribution et limites des sources

Présenter brièvement les auteurs à leur première mention : Brad Frost, designer web et auteur d'Atomic Design ; Sandi Metz, développeuse et autrice sur la conception logicielle. Sur la slide des références, préciser aussi qu'Alla Kholmatova est designer et autrice, et que DTCG est le groupe de standardisation des design tokens. Ne pas répéter ces présentations à chaque citation.

| Idée | Source / statut |
|---|---|
| Cinq niveaux, modèle mental non linéaire, template et page | Brad Frost, *Atomic Design*, chapitre 2 |
| Components, recipes et snowflakes ; Storybook comme atelier | Brad Frost, *Design system components, recipes, and snowflakes* |
| Tokens indépendants des plateformes, références entre tokens | DTCG, *Design Tokens Format Module 2025.10* |
| Design system et langage partagé | Synthèse inspirée d'Alla Kholmatova, *Design Systems* |
| Coût d'une mauvaise abstraction | Sandi Metz, *The Wrong Abstraction* |
| Placement des composants comme fil, billetterie, checklist, conseils | Nos exemples et propositions |
