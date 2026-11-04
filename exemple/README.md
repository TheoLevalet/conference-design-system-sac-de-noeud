# ConferenceHub, l'exemple du talk

Un exemple Angular minimal qui reproduit l'écran ConferenceHub **réparé** de la partie ② (slide « la page réparée, puis le mode sombre »), avec son Storybook.

Les principes de la présentation sont commentés dans le code, à l'endroit où on les applique. Ce tableau indique où les trouver.

## Lancer

```bash
npm install
npm start                 # l'application : http://localhost:4200 (mode sombre : ?theme=dark)
npm run storybook         # Storybook : http://localhost:6006
npm run lint:boundaries   # vérifie les frontières entre bibliothèques et l'usage des tokens
```

## Architecture : une frontière dans un seul sens

```
apps/web      → libs/events  → libs/ui        → libs/tokens
l'application   recettes       design system    fondations
```

```
libs/tokens/tokens.css                tokens bruts, tokens sémantiques, thème sombre
libs/ui/src/                          design system (@conferencehub/ui)
  button/        atome    Button      <button uiButton>, variantes, états, focus
  badge/         atome    Badge
  search-field/  molécule SearchField libellé + champ + Button
  card/          organisme Card       3 slots, aucun input
  listing-template/ template          le plan d'une page de liste, sans les données
libs/events/src/                      recettes métier (@conferencehub/events)
  event-card/    recette  EventCard   Card + Badge + Button
apps/web/src/app/
  event-search/  page                 le template rempli avec les données
  layout/                             en-tête et pied de page propres à l'application
tools/check-boundaries.mjs            la frontière outillée
```

Les dossiers sont rangés **par composant**, pas en `atoms/`, `molecules/`, `organisms/` : le niveau Atomic Design décrit comment un composant se compose, il ne décide pas à lui seul où il vit.

## Les principes du talk, et où ils sont appliqués

| Slide | Principe | Où le voir |
| --- | --- | --- |
| 2.2 | Atomic Design est un modèle de composition, pas une arborescence de dossiers | [libs/ui/src/index.ts](libs/ui/src/index.ts), dossiers par composant |
| 2.3 | Un token est une valeur de design nommée, partageable entre outils et plateformes (DTCG) | [libs/tokens/tokens.css](libs/tokens/tokens.css), en-tête |
| 2.3 | Tokens bruts (valeurs) et tokens sémantiques (rôles), reliés par un alias `var()` | [libs/tokens/tokens.css](libs/tokens/tokens.css) |
| 2.3 | Les composants n'utilisent que des tokens sémantiques | tous les composants ; vérifié par `npm run lint:boundaries` |
| 2.3 | Plusieurs nuances peuvent coexister, à condition que leur rôle soit clair | `--color-primary-strong` et `--color-danger` partagent `red-800` |
| 2.4 | Un seul Button : un vrai `<button>` natif habillé, variantes intentionnelles, focus visible | [libs/ui/src/button/button.ts](libs/ui/src/button/button.ts) |
| 2.4 | Un seul Badge ; l'information ne repose pas uniquement sur la couleur | [libs/ui/src/badge/badge.ts](libs/ui/src/badge/badge.ts) |
| 2.5 | Une molécule fait une chose ; SearchField ne sait pas ce qu'on cherche | [libs/ui/src/search-field/search-field.ts](libs/ui/src/search-field/search-field.ts) |
| 2.5 | La même molécule en haut et au milieu de la page, avec un libellé accessible | [app-header.ts](apps/web/src/app/layout/app-header.ts), [event-search-page.ts](apps/web/src/app/event-search/event-search-page.ts) |
| 2.6 | La mauvaise abstraction (Sandi Metz) : la Card à 42 inputs devient une Card à 3 slots | [libs/ui/src/card/card.ts](libs/ui/src/card/card.ts) |
| 2.6 | Configuration → composition : l'appelant décide de ce qu'il met dans les slots | [libs/ui/src/card/card.ts](libs/ui/src/card/card.ts), [event-card.ts](libs/events/src/event-card/event-card.ts) |
| 2.6 | Component / recipe / snowflake (Brad Frost) : `Card` dans le design system, `EventCard` dans le métier | [libs/events/src/event-card/event-card.ts](libs/events/src/event-card/event-card.ts) |
| 2.6 | Une primitive ne parle pas le métier : « Complet », « S'inscrire », la date vivent dans la recette | [libs/events/src/event-summary.ts](libs/events/src/event-summary.ts) |
| 2.6 | Frontière outillée : `libs/ui` ne peut pas dépendre de `EventCard` | [tools/check-boundaries.mjs](tools/check-boundaries.mjs) |
| 2.7 | Le template montre la structure, sans les données | [libs/ui/src/listing-template/listing-template.ts](libs/ui/src/listing-template/listing-template.ts), story « Plan » |
| 2.8 | La page = le template avec du contenu réel ; elle reste dans l'application | [apps/web/src/app/event-search/event-search-page.ts](apps/web/src/app/event-search/event-search-page.ts) |
| 2.8 | Mode sombre : mêmes composants, autres valeurs pour les mêmes tokens | `[data-theme='dark']` dans [tokens.css](libs/tokens/tokens.css), `?theme=dark` |
| 2.8 | Vérifier les contrastes dans chaque thème | `--color-brand-text` : le rouge du logo passe à `red-400` en sombre (4,09:1 → conforme) |
| Storybook | Une story = un exemple précis ; on documente les états utiles | [button.stories.ts](libs/ui/src/button/button.stories.ts) : Par défaut, Accent, Chargement, Désactivé, Danger |
| Storybook | Tout ce qui est dans Storybook n'entre pas dans le design system | barre latérale : « Design system », « Recettes ConferenceHub », « Pages » |
| Storybook | Le contrôle automatique d'accessibilité repère certaines erreurs, pas toutes | `@storybook/addon-a11y` dans [.storybook/main.ts](.storybook/main.ts) ; compléter au clavier et au lecteur d'écran |
| Storybook | Le thème se change sans toucher aux composants | menu « Thème » de la barre d'outils, [.storybook/preview.ts](.storybook/preview.ts) |
| La règle | Décider où vit un composant | [docs/checklist-pr.md](../docs/checklist-pr.md) |

## Ce que l'exemple ne fait pas

- Pas de chaîne Figma → Style Dictionary → plateformes : `tokens.css` est écrit à la main, et son en-tête explique ce qu'il remplacerait.
- Pas de snowflake dans l'écran : un besoin ponctuel (un bandeau d'une seule campagne, par exemple) resterait dans `apps/web`, à côté de la page qui l'utilise.
- Le contrôle axe passe sur toutes les stories, en clair et en sombre. Cela ne certifie pas l'accessibilité : rien n'a été testé avec un lecteur d'écran.

## Mettre à jour la capture de la slide Storybook

La slide `slides/03-storybook.html` affiche `public/storybook/button-accessibilite.png`, une capture de ce Storybook (story `Design system/Button › Par défaut`, panneau Accessibilité, onglet Passes, fenêtre 1200 × 540 en résolution ×2). Après une modification du Button, relancer `npm run storybook` et refaire la capture dans les mêmes conditions.
