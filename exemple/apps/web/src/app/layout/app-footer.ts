import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Pied de page propre à l'application. */
@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span>© 2026 EventHub</span>
    <nav aria-label="Liens utiles">
      <a href="#">Mentions légales</a>
      <a href="#">Aide</a>
    </nav>
  `,
  styles: `
    :host { display: contents; }
    nav { display: flex; gap: 18px; }
    a { color: var(--color-text-muted); text-decoration: none; }
    a:focus-visible { outline: 3px solid var(--color-focus-ring); outline-offset: 2px; }
  `,
})
export class AppFooter {}
