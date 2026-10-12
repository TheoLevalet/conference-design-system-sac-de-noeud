import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// reveal.js veut toutes les <section> dans le même document.
// Ce plugin remplace chaque <!-- @include chemin.html --> d'index.html
// par le contenu du fichier, en dev comme au build.
const INCLUDE = /<!--\s*@include\s+(\S+)\s*-->/g;

function htmlIncludes() {
  let root = process.cwd();

  return {
    name: 'html-includes',
    configResolved(config) {
      root = config.root;
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(INCLUDE, (_, file) => readFileSync(resolve(root, file), 'utf-8'));
      },
    },
    // Recharge la page quand on modifie une slide incluse.
    configureServer(server) {
      server.watcher.add(resolve(root, 'slides'));
      server.watcher.on('change', (file) => {
        if (file.startsWith(resolve(root, 'slides'))) {
          server.ws.send({ type: 'full-reload' });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [htmlIncludes()],
});
