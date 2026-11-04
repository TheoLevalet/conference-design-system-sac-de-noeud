import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { SearchField } from '@conferencehub/ui';

/**
 * En-tête propre à l'application ConferenceHub (logo, navigation).
 * Il réutilise la même molécule SearchField que le corps de page, en taille compacte :
 * plus de deuxième recherche bricolée (2.5).
 */
@Component({
  selector: 'app-header',
  imports: [SearchField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="logo">ConferenceHub</span>
    <ui-search-field label="Chercher sur ConferenceHub" hideLabel placeholder="Chercher…" buttonLabel="OK" size="sm" (search)="search.emit($event)" />
    <nav aria-label="Navigation principale">
      <a href="#">Accueil</a>
      <a href="#" aria-current="page">Événements</a>
      <a href="#">Contact</a>
    </nav>
  `,
  styles: `
    :host { display: contents; }
    .logo { font-weight: 850; color: var(--color-brand-text); }
    nav { display: flex; gap: 18px; }
    a { color: var(--color-text-muted); text-decoration: none; }
    a:hover, a[aria-current] { color: var(--color-text); }
    a:focus-visible { outline: 3px solid var(--color-focus-ring); outline-offset: 2px; }
  `,
})
export class AppHeader {
  readonly search = output<string>();
}
