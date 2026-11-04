import { EventSummary } from '@eventhub/events';

/** Les données de la page : en vrai, elles viendraient d'une API. */
export const EVENTS: EventSummary[] = [
  { id: 'nantes-tech-day', title: 'Nantes Tech Day', date: '2026-11-14', city: 'Nantes', emoji: '🎤', status: 'full' },
  { id: 'atelier-angular', title: 'Atelier Angular', date: '2026-11-21', city: 'Rennes', emoji: '🧑‍💻', status: 'new' },
  { id: 'meetup-design', title: 'Meetup Design', date: '2026-12-03', city: 'Angers', emoji: '🎸', status: 'free' },
];
