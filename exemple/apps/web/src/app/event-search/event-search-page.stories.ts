import type { Meta, StoryObj } from '@storybook/angular-vite';
import { EventSearchPage } from './event-search-page';

/* La page complète, avec des données : c'est l'écran ConferenceHub de la présentation. */
const meta: Meta<EventSearchPage> = {
  title: 'Pages/Recherche d’événements',
  component: EventSearchPage,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<EventSearchPage>;

export const AvecResultats: Story = { name: 'Avec résultats' };

export const AucunEvenement: Story = {
  name: 'Aucun événement',
  args: { events: [] },
};
