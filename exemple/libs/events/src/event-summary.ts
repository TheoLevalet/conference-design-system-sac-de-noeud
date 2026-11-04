/** Le vocabulaire métier d'ConferenceHub : il vit ici, pas dans le design system. */
export type EventStatus = 'full' | 'new' | 'free';

export interface EventSummary {
  id: string;
  title: string;
  /** Date ISO, par exemple 2026-11-14. */
  date: string;
  city: string;
  /** Illustration de démonstration ; une vraie application aurait une image et son texte alternatif. */
  emoji: string;
  status?: EventStatus;
}

export const EVENT_STATUS_LABELS: Record<EventStatus, string> = {
  full: 'Complet',
  new: 'Nouveau',
  free: 'Gratuit',
};
