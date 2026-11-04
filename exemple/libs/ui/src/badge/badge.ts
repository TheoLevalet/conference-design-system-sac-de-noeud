import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * ATOME (2.4) · un seul Badge.
 *
 * Une petite étiquette de texte. Le libellé porte l'information :
 * la couleur ne fait que la souligner (on ne repose jamais uniquement sur elle).
 * Le badge ne sait pas ce que veut dire « Complet » : c'est la recette métier qui décide.
 */
@Component({
  selector: 'ui-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  styles: `
    :host {
      align-self: flex-start;
      display: inline-block;
      padding: 4px 10px;
      border-radius: var(--radius-pill);
      font-size: 13px;
      font-weight: 700;
      background: var(--color-highlight-soft);
      color: var(--color-on-highlight);
    }
  `,
})
export class Badge {}
