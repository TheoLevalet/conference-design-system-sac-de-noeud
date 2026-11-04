import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { Button } from '../button/button';
import { Card, CARD } from './card';

/* La Card n'a aucun input : les stories montrent ce que l'appelant place dans ses trois slots. */
const meta: Meta<Card> = {
  title: 'Design system/Card',
  component: Card,
  decorators: [moduleMetadata({ imports: [...CARD, Button] })],
};
export default meta;

type Story = StoryObj<Card>;

export const Structure: Story = {
  render: () => ({
    template: `
      <ui-card style="width: 300px">
        <div uiCardMedia>media</div>
        <ui-card-content>content</ui-card-content>
        <ui-card-actions>actions</ui-card-actions>
      </ui-card>`,
  }),
};

export const SansMedia: Story = {
  name: 'Sans media',
  render: () => ({
    template: `
      <ui-card style="width: 300px">
        <ui-card-content><strong>Titre</strong><span>Un texte d'exemple.</span></ui-card-content>
        <ui-card-actions><button uiButton type="button">Action</button></ui-card-actions>
      </ui-card>`,
  }),
};
