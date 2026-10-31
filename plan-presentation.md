# Design system : le sac de nœuds 🪢 — Plan v2 révisé

> Ce qui entre dans un design system… et surtout ce qui reste dehors.

- **Format** : quickie de 20 minutes, deux speakers (Wafa et Théo).
- **Public** : chefs de projet, directeurs, designers, architectes, développeurs et référents techniques. Aucun prérequis sur Atomic Design.
- **Question centrale** : comment décider où vit un composant, sans transformer le design system en collection de tout ce qui pourrait être réutilisé ?
- **Fil conducteur** : une maquette d'écran EventHub, réparée puis documentée. Chaque idée répond à la question « qu'est-ce qui cloche sur cet écran, et que change-t-on ? »
- **Minutage** : 18 minutes de présentation, puis 2 minutes de questions. Les animations et les dialogues sont chronométrés en répétition.

## Vue d'ensemble

| Partie | Timing | Contenu |
|---|---:|---|
| Ouverture et problème | 0:00 → 4:00 | Accroche, situation fictive, question centrale |
| ② Un écran, réparé de bas en haut | 4:00 → 17:30 | Atomic Design, tokens, composants, compositions, Storybook et règle de décision dans un seul fil |
| Conclusion | 17:30 → 18:00 | Une phrase à retenir |
| Questions | 18:00 → 20:00 | QR code et ressources visibles |

Il n'y a pas de parties autonomes « Storybook » ou « La règle » : elles prolongent la réparation de l'écran. Les repères de navigation restent sur la partie ② jusqu'à la conclusion.

## Ouverture et problème (0:00 → 4:00)

1. Théo a « juste ajouté un petit bouton » ; les variantes explosent à l'écran.
2. Définir simplement le design system : boîte à outils commune, règles d'usage et documentation.
3. Présenter le bilan (7 boutons, 4 recherches, etc.) comme un **scénario illustratif**, pas comme une statistique réelle.
4. Montrer que chaque équipe a une raison locale, puis poser la question centrale : quelle frontière manque ?
5. Introduire l'idée de langage partagé comme une synthèse inspirée d'Alla Kholmatova, pas comme une citation littérale.

## ② Un écran, réparé de bas en haut (4:00 → 17:30)

**Structure répétée** : problème visible sur EventHub → concept utile → correction de l'écran. On ne présente pas les concepts comme des dossiers à créer.

### 2.1 Écran « avant » et Atomic Design (4:00 → 5:30)

- Théo montre la page sans énumérer ses défauts.
- Le gag des dossiers `atoms/`, `molecules/`, `organisms/` conduit à la vraie question : le niveau de composition ne décide pas à lui seul de l'endroit où le composant vit.
- Sur une seule illustration, suivre le même bouton dans les cinq niveaux : atome, molécule, organisme, template, page. Présenter la carte comme organisme « dans cet exemple », pas comme une classification universelle.
- Dire explicitement que c'est un modèle mental, pas un processus linéaire ni une arborescence de fichiers. Les exemples sont illustratifs, pas une taxonomie absolue.
- **Source** : Brad Frost, *Atomic Design*, chapitre 2.

### 2.2 Les tokens : donner un rôle aux nuances rouge-orange (5:30 → 7:30)

- **Problème** : une palette d'exemple contient 17 nuances rouge-orange ; leur nombre n'est pas en soi un défaut.
- Demander quel rôle joue chaque nuance et comment choisir la bonne valeur. Le problème illustré est l'absence de repères, pas la variété de couleurs.
- Les valeurs de base `#de1823` (rouge) et `#f67200` (orange) reprennent celles du logo Sopra Steria ; les autres nuances sont des variations illustratives, pas une palette officielle complète.
- **Concept** : présenter un token comme une valeur de design nommée et structurée, qui aide à exprimer et partager une décision. Le DTCG décrit un format d'échange et des tokens indépendants des plateformes ; ne pas réduire un token à la décision elle-même.
- **Correction** : montrer une palette de valeurs et des noms sémantiques par rôle. Le but n'est pas d'appliquer une seule couleur partout : plusieurs rôles et valeurs peuvent coexister.
- Montrer `var()` en CSS comme une illustration du principe d'alias ; préciser que le format d'échange DTCG a sa propre représentation des références.
- Les niveaux « bruts » et « sémantiques » sont une pratique courante, pas des catégories prescrites par le DTCG.
- **Source** : DTCG, *Design Tokens Format Module 2025.10*.

### 2.3 Atomes et molécules (7:30 → 9:15)

- **Atome** : un bouton natif partagé, avec des variantes intentionnelles, des tokens et un focus visible. Un seul composant ne veut pas dire une seule apparence.
- **Molécule** : le champ et le bouton de recherche forment un motif d'interface lisible, sans connaître ce que la personne recherche.
- Présenter « faire une chose clairement » comme une explication de composition, pas comme le principe logiciel de responsabilité unique.
- **Source** : Brad Frost, *Atomic Design*, chapitre 2.

### 2.4 Organismes : la carte universelle (9:15 → 13:15)

C'est le cœur de la démonstration ; le gag « juste un input » ne dépasse pas trois ajouts.

1. **Problème** : une `Card` accumule les cas d'événements jusqu'à 42 inputs et plusieurs templates.
2. **Mauvaise abstraction** : expliquer l'avertissement de Sandi Metz sans en faire une interdiction générale de réutiliser du code. Paramètres et conditions ne prouvent pas à eux seuls qu'une abstraction est mauvaise ; le signal est l'accumulation de cas divergents ou prématurés.
3. **Trois destinations dans la même explication**, sans slide supplémentaire : composant générique (`Card`), recette métier (`EventCard`), cas unique qui reste dans la fonctionnalité concernée (snowflake).
4. **Correction** : `Card` fournit des emplacements ; `EventCard` compose `Card`, `Badge` et `Button` avec le vocabulaire événementiel.
5. Garder la frontière `apps/web → libs/events → libs/ui → libs/tokens` comme un schéma d'architecture choisi pour l'exemple. Ne pas détailler les outils CI à l'oral.
- **Sources** : Sandi Metz, *The Wrong Abstraction* ; Brad Frost, *Design system components, recipes, and snowflakes*. La règle « générique / métier » est notre synthèse, pas une citation.

### 2.5 Template, page et thème (13:15 → 14:45)

- Le template montre la structure et les emplacements du contenu ; la page est une instance avec du contenu réel. Dans l'architecture de l'exemple, la page concrète reste dans l'application ; ce n'est pas une règle générale sur les design systems.
- Le mode sombre illustre ce que permettent des rôles de tokens cohérents ; il faut toujours vérifier les contrastes pour chaque thème.
- Ne pas présenter le mode sombre comme une règle de Brad Frost : c'est notre démonstration.
- **Source** : Brad Frost, *Atomic Design*, chapitre 2.

### 2.6 Documenter la réparation avec Storybook (14:45 → 15:45)

- Garder une seule slide Storybook : rendre visibles les états utiles du `Button` (défaut, chargement, désactivé, danger) et le vocabulaire commun.
- Présenter « contrat » comme notre métaphore d'équipe, pas comme un terme de Brad Frost.
- Les contrôles automatisés détectent certaines alertes et ne certifient pas l'accessibilité. Vérifier également au clavier et dans le contexte réel.
- La maquette Storybook est une illustration ; ne pas laisser croire qu'EventHub ou ses stories ont réellement été testés.
- Un état sans documentation est à clarifier, pas automatiquement interdit.
- **Source** : Brad Frost, *Design system components, recipes, and snowflakes* (atelier de composants, recettes et pages).

### 2.7 Faire appliquer la règle au public (15:45 → 17:30)

- Supprimer la slide autonome « Pas deux destinations, trois » : ses deux premières destinations répètent l'explication de `Card` et `EventCard`. Son apport sur les cas uniques est déplacé en 2.4.
- Faire participer le public par un vote très bref sur `Button` ou `EventCard`, puis appliquer les critères au scénario ; Théo coche les réponses sans ouvrir une discussion longue.
- Appliquer le résultat : `Button` → candidat au design system ; `EventCard` → recette métier. Le cas unique reste dans la fonctionnalité concernée.
- Le seuil de trois usages dans plusieurs produits est un repère choisi pour cet exemple interactif, pas une règle universelle.
- La checklist complète reste accessible dans le dépôt. Un « non » aux critères de préparation signifie « pas encore », pas « jamais ».
- **Source** : checklist et règle de tri = notre proposition, inspirée des références citées.

## Conclusion et questions (17:30 → 20:00)

- **17:30–18:00** : « Tout ce qui est réutilisable n'a pas besoin d'entrer dans le design system. La bonne frontière rend le commun plus utile à tous. »
- **18:00–20:00** : questions, avec la slide des références et le QR code affichés.
- Pas de rappel séparé des huit questions : la checklist est déjà présentée au public et reste disponible dans le dépôt.

## Attribution et limites des sources

| Idée | Source / statut |
|---|---|
| Cinq niveaux, modèle mental non linéaire, template et page | Brad Frost, *Atomic Design*, chapitre 2 |
| Composants, recettes et cas uniques ; Storybook comme atelier | Brad Frost, *Design system components, recipes, and snowflakes* |
| Tokens indépendants des plateformes, références entre tokens et format d'échange | DTCG, *Design Tokens Format Module 2025.10* |
| Design system et langage partagé | Synthèse inspirée d'Alla Kholmatova, *Design Systems* ; pas une citation littérale |
| Coût d'une mauvaise abstraction | Sandi Metz, *The Wrong Abstraction* ; mise en garde, pas une règle contre toute réutilisation |
| Tokens bruts/sémantiques, thème sombre, frontières de modules, Storybook « contrat », règle et checklist | Nos exemples et propositions, explicitement présentés comme tels |

## Fichiers concernés

- `slides/02-ecran-repare.html` : fil principal, 17 nuances rouge-orange illustratives, catégories et transitions.
- `slides/03-storybook.html` : une slide intégrée à la partie ②.
- `slides/04-regle.html` : trois slides interactives intégrées à la partie ② ; la page redondante est supprimée.
- `slides/05-conclusion.html` : conclusion à 17:30, QR code maintenu pendant les questions.
- `docs/checklist-pr.md` : checklist complète ; les trois usages sont explicitement présentés comme un repère de l'exemple, pas un seuil universel.
- `index.html`, `README.md` : ordre, navigation et minutage alignés.
