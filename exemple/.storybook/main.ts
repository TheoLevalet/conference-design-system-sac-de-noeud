import type { StorybookConfig } from '@storybook/angular-vite';

/*
 * Storybook (2.6 de la présentation) : un atelier pour partager les exemples.
 * On documente les composants du design system ET les recettes du produit :
 * tout ce qui est dans Storybook n'a pas vocation à entrer dans le design system.
 * La barre latérale le montre : « Design system », « Recettes ConferenceHub », « Pages ».
 */
const config: StorybookConfig = {
  stories: ['../libs/*/src/**/*.stories.ts', '../apps/web/src/**/*.stories.ts'],
  addons: [
    // Contrôle automatique d'accessibilité (axe-core) : il repère certaines erreurs, pas toutes.
    // On vérifie aussi au clavier, le focus visible et avec un lecteur d'écran, dans le contexte réel.
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/angular-vite',
  // Pas de widget « Get started » : la barre latérale reste celle d'un vrai projet.
  features: { sidebarOnboardingChecklist: false, menuOnboardingChecklist: false },
  core: { disableTelemetry: true },
};
export default config;
