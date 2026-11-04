import type { Meta, StoryObj } from '@storybook/angular-vite';
import { Badge } from './badge';

const meta: Meta<Badge> = {
  title: 'Design system/Badge',
  component: Badge,
  render: () => ({ template: `<ui-badge>Libellé court</ui-badge>` }),
};
export default meta;

export const ParDefaut: StoryObj<Badge> = { name: 'Par défaut' };
