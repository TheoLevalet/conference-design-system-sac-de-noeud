import { componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular-vite';
import { fn } from 'storybook/test';
import { SearchField } from './search-field';

const meta: Meta<SearchField> = {
  title: 'Design system/SearchField',
  component: SearchField,
  args: { label: 'Rechercher', hideLabel: false, placeholder: 'Mots-clés…', buttonLabel: 'Rechercher', size: 'md', search: fn() },
  argTypes: { size: { control: 'inline-radio', options: ['md', 'sm'] } },
  decorators: [componentWrapperDecorator((story) => `<div style="width: 560px">${story}</div>`)],
  render: (args) => ({
    props: args,
    template: `<ui-search-field [label]="label" [hideLabel]="hideLabel" [placeholder]="placeholder" [buttonLabel]="buttonLabel" [size]="size" (search)="search($event)" />`,
  }),
};
export default meta;

type Story = StoryObj<SearchField>;

/* Le libellé générique le rappelle : la molécule ne sait pas ce qu'on cherche. */
export const ParDefaut: Story = { name: 'Par défaut' };

export const LibelleMasque: Story = {
  name: 'Libellé masqué visuellement',
  args: { hideLabel: true },
};

export const Compact: Story = {
  name: 'Compact (en-tête)',
  args: { size: 'sm', hideLabel: true, buttonLabel: 'OK', placeholder: 'Chercher…' },
};
