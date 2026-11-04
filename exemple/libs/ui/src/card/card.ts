import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';

/**
 * ORGANISME générique (2.6) · la Card du design system ne fournit que la structure.
 *
 * Avant : une Card « universelle » à 42 inputs (isEvent, showBadge, layout, iconRightOnlyIf…).
 * Le design system devait connaître tous les cas : c'est la mauvaise abstraction
 * dont parle Sandi Metz (The Wrong Abstraction).
 *
 * Après : zéro input, trois emplacements (slots). La variation passe de la configuration
 * à la composition : l'appelant décide de ce qu'il met dedans.
 * « Et l'icône à droite, mais seulement parfois ? » → dans ui-card-actions, quand tu en as besoin.
 *
 * Card
 * ├── [uiCardMedia]    image ou illustration
 * ├── ui-card-content  le contenu
 * └── ui-card-actions  les actions
 *
 * Aucune règle métier, aucun mot « événement » : c'est un design system component
 * au sens de Brad Frost (components, recipes and snowflakes).
 */
@Component({
  selector: 'ui-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content select="[uiCardMedia]" />
    <ng-content select="ui-card-content" />
    <ng-content select="ui-card-actions" />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-surface);
      background: var(--color-bg);
      color: var(--color-text);
    }
  `,
})
export class Card {}

/** Slot media : une zone d'illustration de hauteur fixe. */
@Directive({
  selector: '[uiCardMedia]',
  host: {
    style: `display: grid; place-items: center; height: 60px; font-size: 30px; background: var(--color-primary-soft);`,
  },
})
export class CardMedia {}

/** Slot content : empile ce qu'on lui donne. */
@Component({
  selector: 'ui-card-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  styles: `:host { display: flex; flex-direction: column; gap: var(--space-1); padding: var(--space-2) var(--space-3) 2px; flex: 1; }`,
})
export class CardContent {}

/** Slot actions : aligne les actions en bas de la carte. */
@Component({
  selector: 'ui-card-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  styles: `:host { display: flex; gap: var(--space-2); padding: 6px var(--space-3) 10px; }`,
})
export class CardActions {}

/** Pratique pour importer la structure complète en une ligne. */
export const CARD = [Card, CardMedia, CardContent, CardActions] as const;
