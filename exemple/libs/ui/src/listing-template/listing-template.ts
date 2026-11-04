import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * TEMPLATE (2.7) · le plan d'une page de liste, sans les données.
 *
 * Le template place les zones et montre la structure du contenu
 * (en-tête, titre, recherche, grille de résultats, pied de page). Pas le contenu final.
 * Avant, la page codait la mise en page et les données au même endroit :
 * impossible de réutiliser la structure pour lister des formations demain.
 *
 * Dans notre découpage, ce plan est partagé ; la page concrète et ses données
 * restent dans l'application (apps/web). D'autres équipes peuvent faire un autre choix.
 */
@Component({
  selector: 'ui-listing-template',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="zone-header"><ng-content select="[listingHeader]" /></header>
    <main class="zone-body">
      <ng-content select="[listingTitle]" />
      <div class="zone-search"><ng-content select="[listingSearch]" /></div>
      <div class="zone-results"><ng-content select="[listingResults]" /></div>
    </main>
    <footer class="zone-footer"><ng-content select="[listingFooter]" /></footer>
  `,
  styles: `
    :host { display: flex; flex-direction: column; min-height: 100vh; background: var(--color-bg); color: var(--color-text); }

    .zone-header, .zone-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 var(--space-6);
      background: var(--color-bg-subtle);
    }

    .zone-header { min-height: 38px; border-bottom: 1px solid var(--color-border); font-size: 15px; }
    .zone-footer { min-height: 32px; border-top: 1px solid var(--color-border); font-size: 13px; color: var(--color-text-muted); }

    .zone-body { flex: 1; padding: 14px var(--space-6) var(--space-4); }
    .zone-search { margin: 10px 0 var(--space-3); }

    .zone-results { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px; }
  `,
})
export class ListingTemplate {}
