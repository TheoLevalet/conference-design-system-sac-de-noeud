/*
 * Matcher Auto-Animate qui gère les data-id imbriqués et les changements de mise en page.
 *
 * reveal.js mesure chaque élément à sa position finale, puis le replace au
 * départ avec un translate + scale. Trois cas cassent ce calcul :
 * - un élément animé dans un autre élément animé subit aussi la transformation
 *   de son parent : il se déplace deux fois ;
 * - un conteneur scalé de façon non proportionnelle écrase son contenu ;
 * - les styles de départ (taille, padding, police…) changent la mise en page :
 *   un bloc centré en `margin: auto`, un élément de flex ou de grille, ou tout
 *   ce qui suit un élément qui grandit ne démarre plus au bon endroit.
 *
 * Enfin, reveal n'apparie un data-id que si la balise est identique : un h2 qui
 * devient h3 disparaît en fondu au lieu de s'animer.
 *
 * Ce matcher reprend les appariements de reveal (data-id, textes, médias, code),
 * apparie les data-id quelle que soit la balise, puis :
 * - anime la largeur et la hauteur des conteneurs au lieu de les scaler ;
 * - mesure la « mise en page de départ » : tous les styles de départ appliqués
 *   d'un coup, comme au premier instant de l'animation ;
 * - mesure chaque élément imbriqué par rapport à son ancêtre animé.
 */

const TEXT_NODES = 'h1, h2, h3, h4, h5, h6, p, li';
const MEDIA_NODES = 'img, video, iframe';
const CODE_NODES = 'pre';

// Même algorithme d'appariement que reveal.js (findAutoAnimateMatches)
function findMatches(pairs, fromScope, toScope, selector, serialize, options) {
  const fromMatches = {};
  const toMatches = {};

  fromScope.querySelectorAll(selector).forEach((element) => {
    const key = serialize(element);
    if (typeof key === 'string' && key.length) {
      (fromMatches[key] ??= []).push(element);
    }
  });

  toScope.querySelectorAll(selector).forEach((element) => {
    const key = serialize(element);
    (toMatches[key] ??= []).push(element);

    const candidates = fromMatches[key];
    if (!candidates) return;

    const primary = toMatches[key].length - 1;
    const secondary = candidates.length - 1;
    let from;

    if (candidates[primary]) {
      from = candidates[primary];
      candidates[primary] = null;
    } else if (candidates[secondary]) {
      from = candidates[secondary];
      candidates[secondary] = null;
    }

    if (from) pairs.push({ from, to: element, options: options ? { ...options } : undefined });
  });
}

const propertyName = (style) => (typeof style === 'string' ? style : style.property);

function relative(box, origin) {
  return { x: box.x - origin.x, y: box.y - origin.y, width: box.width, height: box.height };
}

// reveal appelle le matcher avec son contrôleur Auto-Animate en `this`
export function nestedAutoAnimateMatcher(fromSlide, toSlide) {
  // Les `styles` d'une paire remplacent la liste globale : on repart de celle-ci
  const defaultStyles = this?.Reveal?.getConfig().autoAnimateStyles ?? [];
  const pairs = [];

  // Contrairement à reveal, un data-id apparie aussi deux balises différentes (h2 → h3, div → figure…)
  findMatches(pairs, fromSlide, toSlide, '[data-id]', (node) => `id:::${node.dataset.id}`);
  findMatches(pairs, fromSlide, toSlide, TEXT_NODES, (node) => `${node.nodeName}:::${node.textContent.trim()}`);
  findMatches(pairs, fromSlide, toSlide, MEDIA_NODES, (node) => `${node.nodeName}:::${node.getAttribute('src') || node.getAttribute('data-src')}`);
  findMatches(pairs, fromSlide, toSlide, CODE_NODES, (node) => `${node.nodeName}:::${node.textContent.trim()}`);

  // Options de reveal pour les textes et le code
  for (const pair of [...pairs]) {
    if (pair.from.matches(TEXT_NODES)) {
      pair.options = { scale: false };
    } else if (pair.from.matches(CODE_NODES)) {
      pair.options = { scale: false, styles: ['width', 'height'] };
      findMatches(pairs, pair.from, pair.to, '.hljs .hljs-ln-code', (node) => node.textContent, { scale: false, styles: [] });
      findMatches(pairs, pair.from, pair.to, '.hljs .hljs-ln-numbers[data-line-number]', (node) => node.getAttribute('data-line-number'), { scale: false, styles: ['width'] });
    }
  }

  // Un même élément d'arrivée ne doit être animé qu'une fois
  const seen = new Set();
  const unique = pairs.filter((pair) => !seen.has(pair.to) && seen.add(pair.to));
  const pairByTo = new Map(unique.map((pair) => [pair.to, pair]));

  // Ancêtre animé le plus proche de chaque élément d'arrivée
  const parentOf = new Map();
  for (const pair of unique) {
    let parent = pair.to.parentElement;
    while (parent && parent !== toSlide && !pairByTo.has(parent)) parent = parent.parentElement;
    if (parent && parent !== toSlide) parentOf.set(pair, pairByTo.get(parent));
  }

  // Un conteneur anime sa taille au lieu d'être scalé : son contenu n'est pas déformé
  for (const parentPair of new Set(parentOf.values())) {
    if (parentPair.options?.scale === false) continue;
    const styles = new Set([...(parentPair.options?.styles ?? defaultStyles), 'width', 'height']);
    parentPair.options = { ...parentPair.options, scale: false, styles: [...styles] };
  }

  // Mise en page de départ : tous les styles de départ appliqués d'un coup,
  // mesurée une seule fois, au premier besoin (avant que reveal n'injecte ses styles).
  let startLayout = null;
  const measureStartLayout = () => {
    if (startLayout) return startLayout;

    const saved = unique.map((pair) => [pair.to, pair.to.getAttribute('style')]);

    for (const pair of unique) {
      const start = getComputedStyle(pair.from);
      const target = pair.to.style;
      target.setProperty('transition', 'none', 'important');
      target.setProperty('transform', 'none', 'important');
      for (const style of pair.options?.styles ?? defaultStyles) {
        const property = propertyName(style);
        target.setProperty(property, start.getPropertyValue(property), 'important');
      }
    }

    startLayout = new Map(unique.map((pair) => [pair.to, pair.to.getBoundingClientRect()]));

    for (const [element, style] of saved) {
      if (style === null) element.removeAttribute('style');
      else element.setAttribute('style', style);
    }

    return startLayout;
  };

  for (const pair of unique) {
    const parentPair = parentOf.get(pair);

    pair.options = {
      ...pair.options,
      measure: (element) => {
        if (element === pair.from) {
          const box = element.getBoundingClientRect();
          // Imbriqué : seul le déplacement relatif au parent compte,
          // le parent emmène déjà ses enfants avec lui.
          return parentPair ? relative(box, parentPair.from.getBoundingClientRect()) : box;
        }

        const layout = measureStartLayout();
        const box = layout.get(element);
        return parentPair ? relative(box, layout.get(parentPair.to)) : box;
      },
    };
  }

  return unique;
}
