import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Badge, Button, CARD } from '@conferencehub/ui';
import { EVENT_STATUS_LABELS, EventSummary } from '../event-summary';

const dateFormat = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' });

/**
 * RECETTE (2.6) · EventCard = Card + Badge + Button.
 *
 * Une composition de composants du design system, utilisée de façon cohérente dans ConferenceHub,
 * mais trop métier pour entrer dans le design system (Brad Frost : components, recipes and snowflakes).
 *
 * Tout le vocabulaire métier est ici : l'événement, « Complet », l'inscription.
 * Les pièces qu'elle assemble ne connaissent pas le mot « événement ».
 * Elle assemble, elle n'invente rien : aucun style de bouton ou de carte redéfini.
 *
 * Elle vit dans libs/events : la dépendance va dans un seul sens, libs/events → libs/ui.
 */
@Component({
  selector: 'evt-event-card',
  imports: [CARD, Badge, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-card>
      <div uiCardMedia aria-hidden="true">{{ event().emoji }}</div>
      <ui-card-content>
        @if (statusLabel(); as label) {
          <ui-badge>{{ label }}</ui-badge>
        }
        <h2 class="title">{{ event().title }}</h2>
        <p class="meta">
          <span aria-hidden="true">📅&nbsp;</span><time [attr.datetime]="event().date">{{ dateLabel() }}</time>
          ·&nbsp;<span aria-hidden="true">📍&nbsp;</span>{{ event().city }}
        </p>
      </ui-card-content>
      <ui-card-actions>
        <button uiButton type="button" variant="accent" block [attr.aria-label]="'S\\'inscrire à ' + event().title" (click)="register.emit(event().id)">
          S'inscrire
        </button>
      </ui-card-actions>
    </ui-card>
  `,
  styles: `
    :host { display: block; }
    ui-card { height: 100%; }
    .title { margin: 0; font-size: 17px; font-weight: 800; }
    .meta { margin: 0; font-size: 14px; color: var(--color-text-muted); }
  `,
})
export class EventCard {
  readonly event = input.required<EventSummary>();
  readonly register = output<string>();

  protected readonly statusLabel = computed(() => {
    const status = this.event().status;
    return status ? EVENT_STATUS_LABELS[status] : null;
  });

  protected readonly dateLabel = computed(() => dateFormat.format(new Date(this.event().date)).replace('.', ''));
}
