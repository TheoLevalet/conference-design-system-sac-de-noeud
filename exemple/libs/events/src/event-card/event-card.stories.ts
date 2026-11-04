import { componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular-vite';
import { fn } from 'storybook/test';
import { EventCard } from './event-card';

/*
 * Une recette documentée dans Storybook, rangée à part du design system :
 * on la partage dans le produit sans la promouvoir dans libs/ui.
 */
const meta: Meta<EventCard> = {
  title: 'Recettes EventHub/EventCard',
  component: EventCard,
  decorators: [componentWrapperDecorator((story) => `<div style="width: 320px">${story}</div>`)],
  args: { register: fn() },
};
export default meta;

type Story = StoryObj<EventCard>;

export const Complet: Story = {
  args: { event: { id: '1', title: 'Nantes Tech Day', date: '2026-11-14', city: 'Nantes', emoji: '🎤', status: 'full' } },
};

export const SansStatut: Story = {
  name: 'Sans statut',
  args: { event: { id: '2', title: 'Atelier Angular', date: '2026-11-21', city: 'Rennes', emoji: '🧑‍💻' } },
};

/* La page vérifie que le système tient face au contenu réel : on teste aussi un titre long. */
export const TitreLong: Story = {
  name: 'Titre long',
  args: { event: { id: '3', title: 'Journée design system, accessibilité et architecture front-end', date: '2026-12-03', city: 'Angers', emoji: '🎸', status: 'new' } },
};
