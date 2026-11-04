import { bootstrapApplication } from '@angular/platform-browser';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { EventSearchPage } from './app/event-search/event-search-page';

// Démo du thème (2.8) : http://localhost:4200/?theme=dark
// On change seulement l'attribut data-theme ; aucun composant ne sait qu'il existe un mode sombre.
const theme = new URLSearchParams(location.search).get('theme');
if (theme === 'dark') {
  document.documentElement.dataset['theme'] = 'dark';
}

bootstrapApplication(EventSearchPage, {
  providers: [provideBrowserGlobalErrorListeners()],
}).catch((err) => console.error(err));
