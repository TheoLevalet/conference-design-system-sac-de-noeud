import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ListingTemplate } from './listing-template';

/* Le template sans données : on voit le plan de la page, pas son contenu final. */
const meta: Meta<ListingTemplate> = {
  title: 'Design system/ListingTemplate',
  component: ListingTemplate,
  parameters: { layout: 'fullscreen' },
};
export default meta;

const zone = 'border: 1.5px dashed var(--color-border); border-radius: 8px; padding: 8px; color: var(--color-text-muted)';

export const Plan: StoryObj<ListingTemplate> = {
  render: () => ({
    template: `
      <ui-listing-template>
        <span listingHeader>Zone en-tête</span>
        <h1 listingTitle style="margin: 0; font-size: 22px">Titre de la page</h1>
        <div listingSearch style="${zone}">Zone de recherche</div>
        <div listingResults style="${zone}; height: 140px">Résultat</div>
        <div listingResults style="${zone}; height: 140px">Résultat</div>
        <div listingResults style="${zone}; height: 140px">Résultat</div>
        <span listingFooter>Zone pied de page</span>
      </ui-listing-template>`,
  }),
};
