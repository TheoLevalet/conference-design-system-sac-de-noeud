import Reveal from 'reveal.js';
import Highlight from 'reveal.js/plugin/highlight';
import Notes from 'reveal.js/plugin/notes';
import Zoom from 'reveal.js/plugin/zoom';
import QRCode from 'qrcode';

import { nestedAutoAnimateMatcher } from './auto-animate-matcher.js';

import 'reveal.js/reset.css';
import 'reveal.js/reveal.css';
import 'reveal.js/theme/white.css';
import 'highlight.js/styles/tokyo-night-dark.css';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';

import './styles/tokens.css';
import './styles/theme.css';
import './styles/illustrations.css';

const deck = new Reveal({
  hash: true,
  width: 1280,
  height: 720,
  margin: 0.04,
  center: true,
  controls: true,
  progress: true,
  slideNumber: 'c/t',
  transition: 'fade',
  backgroundTransition: 'fade',
  autoAnimateDuration: 0.9,
  autoAnimateEasing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  autoAnimateMatcher: nestedAutoAnimateMatcher,
  plugins: [Highlight, Notes, Zoom],
});

// Pied de page : rappelle la partie en cours.
// Une partie commence sur toute slide qui porte data-part.
const footer = document.querySelector('.part-footer');

function updateFooter(currentSlide) {
  const slides = deck.getSlides();
  const index = slides.indexOf(currentSlide);
  const start = slides
    .slice(0, index + 1)
    .reverse()
    .find((slide) => slide.dataset.part);

  footer.textContent = start?.dataset.part ?? '';
  footer.classList.toggle('hidden', currentSlide.hasAttribute('data-no-footer'));
}

deck.on('ready', ({ currentSlide }) => updateFooter(currentSlide));
deck.on('slidechanged', ({ currentSlide }) => updateFooter(currentSlide));

// QR codes générés à partir de l'URL portée par data-qr.
document.querySelectorAll('[data-qr]').forEach(async (el) => {
  el.innerHTML = await QRCode.toString(el.dataset.qr, { type: 'svg', margin: 0 });
});

deck.initialize();
