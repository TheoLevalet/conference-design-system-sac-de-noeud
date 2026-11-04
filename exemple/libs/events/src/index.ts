/*
 * libs/events · les recettes métier d'ConferenceHub (@conferencehub/events).
 *
 * Frontière : libs/events peut dépendre de libs/ui, jamais d'apps/.
 * libs/ui, lui, ne doit jamais dépendre d'ici.
 */
export { EventCard } from './event-card/event-card';
export { EVENT_STATUS_LABELS, type EventStatus, type EventSummary } from './event-summary';
