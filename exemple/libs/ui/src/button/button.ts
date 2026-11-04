import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'accent' | 'danger';
export type ButtonSize = 'md' | 'sm';

/**
 * ATOME (2.4) · un seul Button pour tout ConferenceHub.
 *
 * - On habille un vrai <button> natif (sélecteur d'attribut) au lieu de recréer un bouton
 *   avec une <div> : clavier (Tab, Entrée, Espace), rôle et état désactivé sont fournis par le navigateur.
 * - Un seul composant ne veut pas dire une seule apparence : les variantes sont
 *   intentionnelles, finies et nommées par leur rôle (primary, accent, danger).
 * - Styles reliés aux tokens sémantiques uniquement, focus toujours visible.
 * - Aucun vocabulaire métier : le bouton ne sait pas qu'il sert à s'inscrire.
 *
 * Usage : <button uiButton type="button" variant="accent">S'inscrire</button>
 */
@Component({
  selector: 'button[uiButton]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-button',
    '[class.ui-button--primary]': "variant() === 'primary'",
    '[class.ui-button--accent]': "variant() === 'accent'",
    '[class.ui-button--danger]': "variant() === 'danger'",
    '[class.ui-button--sm]': "size() === 'sm'",
    '[class.ui-button--block]': 'block()',
    // Chargement : on prévient les technologies d'assistance et on bloque le double clic,
    // sans retirer le bouton de l'ordre de tabulation (aria-disabled plutôt que disabled).
    '[attr.aria-busy]': 'loading() || null',
    '[attr.aria-disabled]': 'loading() || null',
    '(click)': 'blockWhileLoading($event)',
  },
  template: `
    @if (loading()) {
      <span class="ui-button__spinner" aria-hidden="true"></span>
    }
    <ng-content />
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      padding: 9px 18px;
      border: 0;
      border-radius: var(--radius-control);
      font: inherit;
      font-weight: 700;
      white-space: nowrap;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    :host(.ui-button--primary) { background: var(--color-primary); color: var(--color-on-primary); }
    :host(.ui-button--primary:hover) { background: var(--color-primary-strong); }
    :host(.ui-button--accent) { background: var(--color-accent); color: var(--color-on-accent); }
    :host(.ui-button--accent:hover) { background: var(--color-accent-strong); }
    :host(.ui-button--danger) { background: var(--color-danger); color: var(--color-on-danger); }

    :host(.ui-button--sm) { padding: 3px 10px; font-size: 12px; border-radius: var(--radius-control); }
    :host(.ui-button--block) { width: 100%; }

    /* Le focus reste visible : on ne supprime jamais l'outline sans le remplacer. */
    :host(:focus-visible) { outline: 3px solid var(--color-focus-ring); outline-offset: 2px; }

    :host(:disabled) { background: var(--color-disabled); color: var(--color-on-disabled); cursor: not-allowed; }
    :host([aria-busy='true']) { cursor: progress; }

    .ui-button__spinner {
      width: 0.9em;
      height: 0.9em;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: ui-button-spin 0.8s linear infinite;
    }

    @keyframes ui-button-spin { to { transform: rotate(360deg); } }

    @media (prefers-reduced-motion: reduce) {
      .ui-button__spinner { animation-duration: 2.4s; }
    }
  `,
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly block = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  protected blockWhileLoading(event: Event): void {
    if (this.loading()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
