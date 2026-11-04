import type { Preview } from '@storybook/angular-vite';

/* Les mêmes styles globaux que l'application : les stories utilisent exactement les mêmes tokens. */
import '../libs/tokens/tokens.css';
import '../apps/web/src/styles.css';

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: 'Thème des tokens sémantiques',
      toolbar: {
        title: 'Thème',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Clair' },
          { value: 'dark', title: 'Sombre' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    // Même mécanisme que l'application : on change data-theme, les composants ne bougent pas.
    (story, context) => {
      document.documentElement.dataset['theme'] = context.globals['theme'] === 'dark' ? 'dark' : 'light';
      return story();
    },
  ],
  parameters: {
    layout: 'centered',
    options: {
      storySort: { order: ['Design system', 'Recettes EventHub', 'Pages'] },
    },
    a11y: {
      // 'error' : une violation détectée fait échouer le test de la story.
      test: 'error',
    },
  },
};

export default preview;
