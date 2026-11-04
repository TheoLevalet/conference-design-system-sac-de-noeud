import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Button, ButtonSize } from '../button/button';

let nextId = 0;

/**
 * MOLÉCULE (2.5) · un seul SearchField, utilisé dans l'en-tête et au milieu de la page.
 *
 * - Un libellé, un champ et un bouton qui font une seule chose : lancer une recherche.
 *   C'est l'exemple même de Brad Frost (Atomic Design, chapitre 2).
 * - Composée d'atomes du design system (Button) : on assemble, on ne réinvente pas.
 * - Elle ne sait pas ce qu'on cherche : des événements aujourd'hui, des factures demain.
 *   Elle émet un texte, c'est l'appelant qui en fait quelque chose.
 * - Le champ garde toujours un libellé : visible, ou au minimum lisible par les lecteurs d'écran.
 * - Un vrai <form role="search"> : la touche Entrée lance la recherche sans code supplémentaire,
 *   et chaque zone de recherche est un repère nommé (deux sur la page, donc deux noms distincts).
 */
@Component({
  selector: 'ui-search-field',
  imports: [Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.ui-search-field--sm]': "size() === 'sm'" },
  template: `
    <form role="search" [attr.aria-label]="label()" (submit)="submit($event, query.value)">
      <label [for]="inputId" [class.visually-hidden]="hideLabel()">{{ label() }}</label>
      <span class="ui-search-field__control">
        <span class="ui-search-field__icon" aria-hidden="true">🔍</span>
        <input #query [id]="inputId" type="search" name="q" [placeholder]="placeholder()" autocomplete="off" />
      </span>
      <button uiButton type="submit" [size]="size()">{{ buttonLabel() }}</button>
    </form>
  `,
  styles: `
    form { display: flex; gap: var(--space-3); align-items: center; }
    label { font-weight: 600; }

    .ui-search-field__control {
      flex: 1;
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: 9px 14px;
      border: 2px solid var(--color-border);
      border-radius: var(--radius-control);
      background: var(--color-bg);
    }

    .ui-search-field__control:focus-within { outline: 3px solid var(--color-focus-ring); outline-offset: 2px; }

    input { flex: 1; min-width: 0; border: 0; padding: 0; font: inherit; color: var(--color-text); background: transparent; }
    input:focus { outline: none; }
    input::placeholder { color: var(--color-text-muted); }

    /* Taille compacte pour l'en-tête : même molécule, autre taille. */
    :host(.ui-search-field--sm) form { gap: var(--space-1); }
    :host(.ui-search-field--sm) .ui-search-field__control { flex: none; width: 170px; padding: 3px 10px; border-width: 1.5px; font-size: 12px; border-radius: var(--size-radius-sm); }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
  `,
})
export class SearchField {
  readonly label = input.required<string>();
  readonly hideLabel = input(false, { transform: booleanAttribute });
  readonly placeholder = input('');
  readonly buttonLabel = input('Rechercher');
  readonly size = input<ButtonSize>('md');

  readonly search = output<string>();

  protected readonly inputId = `ui-search-field-${nextId++}`;

  protected submit(event: Event, value: string): void {
    event.preventDefault();
    this.search.emit(value.trim());
  }
}
