import type { Meta, StoryObj } from '@storybook/angular-vite';
import { Button } from './button';

/*
 * Une story = un exemple précis, que l'équipe consulte et compare.
 * On documente les états utiles, pas toutes les combinaisons possibles.
 * Un état qui n'a pas de story est un état à clarifier, pas forcément interdit.
 */
const meta: Meta<Button> = {
  title: 'Design system/Button',
  component: Button,
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'accent', 'danger'] },
    size: { control: 'inline-radio', options: ['md', 'sm'] },
    loading: { control: 'boolean' },
    block: { control: 'boolean' },
  },
  args: { variant: 'primary', size: 'md', loading: false, block: false },
  render: (args) => ({
    props: { ...args, label: "S'inscrire" },
    template: `<button uiButton type="button" [variant]="variant" [size]="size" [loading]="loading" [block]="block">{{ label }}</button>`,
  }),
};
export default meta;

type Story = StoryObj<Button>;

export const ParDefaut: Story = { name: 'Par défaut' };

export const Accent: Story = {
  name: 'Accent',
  args: { variant: 'accent' },
};

export const Chargement: Story = {
  args: { loading: true },
};

export const Desactive: Story = {
  name: 'Désactivé',
  render: (args) => ({
    props: args,
    template: `<button uiButton type="button" [variant]="variant" disabled>S'inscrire</button>`,
  }),
};

export const Danger: Story = {
  args: { variant: 'danger' },
  render: (args) => ({
    props: args,
    template: `<button uiButton type="button" variant="danger">Annuler</button>`,
  }),
};
