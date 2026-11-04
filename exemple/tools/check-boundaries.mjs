// Frontière outillée (2.6) : apps/web → libs/events → libs/ui → libs/tokens.
// Les dépendances vont dans un seul sens. Ce script échoue si un import remonte la chaîne.
//
// C'est volontairement minimal. Dans un vrai dépôt, on utiliserait par exemple
// Nx module boundaries, eslint-plugin-boundaries ou dependency-cruiser.
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve, dirname, sep } from 'node:path';

const root = resolve(dirname(new URL(import.meta.url).pathname), '..');

// Pour chaque couche : ce qu'elle a le droit d'importer.
const layers = {
  'apps/web': ['apps/web', 'libs/events', 'libs/ui'],
  'libs/events': ['libs/events', 'libs/ui'],
  'libs/ui': ['libs/ui'],
};
const aliases = { '@eventhub/events': 'libs/events', '@eventhub/ui': 'libs/ui' };

const layerOf = (file) => Object.keys(layers).find((layer) => file.startsWith(layer + '/'));

function* tsFiles(dir) {
  for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* tsFiles(path);
    else if (entry.name.endsWith('.ts')) yield path.split(sep).join('/');
  }
}

const errors = [];
for (const layer of Object.keys(layers)) {
  for (const file of tsFiles(layer)) {
    const source = readFileSync(join(root, file), 'utf8');
    for (const [, specifier] of source.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
      let target;
      if (specifier in aliases) target = aliases[specifier];
      else if (specifier.startsWith('.')) target = layerOf(relative(root, resolve(root, dirname(file), specifier)).split(sep).join('/'));
      else continue; // paquet npm (@angular/core, storybook…)

      if (!target || !layers[layer].includes(target)) {
        errors.push(`✖ ${file} : ${layer} ne doit pas dépendre de ${target ?? specifier} (import « ${specifier} »)`);
      }
    }

    // Tokens (2.3) : les composants n'utilisent que des tokens sémantiques,
    // ni code hexadécimal, ni token brut de la palette.
    const raw = source.match(/#[0-9a-f]{3,8}\b(?=[;\s'"`)])|var\(--(red|orange|blue|slate)-\d+\)/gi);
    if (raw) errors.push(`✖ ${file} : valeur brute ${raw.join(', ')} ; utiliser un token sémantique`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('✔ Frontières respectées : apps/web → libs/events → libs/ui → libs/tokens');
