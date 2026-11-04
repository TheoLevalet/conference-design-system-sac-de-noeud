import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { EventCard, EventSummary } from '@eventhub/events';
import { ListingTemplate, SearchField } from '@eventhub/ui';
import { AppFooter } from '../layout/app-footer';
import { AppHeader } from '../layout/app-header';
import { EVENTS } from './events.data';

/**
 * PAGE (2.8) · le template rempli avec de vraies données.
 *
 * C'est à ce niveau qu'on vérifie que tout le système tient face au contenu réel
 * (titres longs, pas de badge, liste vide…). La page et ses données restent dans l'application.
 *
 * Elle n'a presque pas de style : la mise en page vient du template,
 * l'apparence vient des composants, les valeurs viennent des tokens.
 */
@Component({
  selector: 'app-event-search-page',
  imports: [ListingTemplate, SearchField, EventCard, AppHeader, AppFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-listing-template>
      <app-header listingHeader (search)="query.set($event)" />

      <h1 listingTitle><span aria-hidden="true">🎟️&nbsp;</span>Rechercher un événement</h1>

      <ui-search-field listingSearch label="Rechercher un événement" hideLabel placeholder="Nantes, novembre…" (search)="query.set($event)" />

      @if (results().length) {
        <div listingResults class="results" role="list">
          @for (event of results(); track event.id) {
            <evt-event-card role="listitem" [event]="event" (register)="registered.set($event)" />
          }
        </div>
      } @else {
        <p listingResults>Aucun événement ne correspond à votre recherche.</p>
      }

      <app-footer listingFooter />
    </ui-listing-template>

    <p class="visually-hidden" aria-live="polite">{{ registered() ? 'Inscription demandée : ' + registered() : '' }}</p>
  `,
  styles: `
    h1 { margin: 0; font-size: 22px; font-weight: 800; }
    .results { display: contents; }
    .visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  `,
})
export class EventSearchPage {
  /** Permet aux stories de fournir d'autres données ; l'application utilise EVENTS. */
  readonly events = input<EventSummary[]>(EVENTS);

  protected readonly query = signal('');
  protected readonly registered = signal<string | null>(null);

  protected readonly results = computed(() => {
    const words = this.query().toLowerCase().split(/[\s,]+/).filter(Boolean);
    return this.events().filter((event) => {
      const month = new Date(event.date).toLocaleDateString('fr-FR', { month: 'long' });
      const text = `${event.title} ${event.city} ${month}`.toLowerCase();
      return words.every((word) => text.includes(word));
    });
  });
}
