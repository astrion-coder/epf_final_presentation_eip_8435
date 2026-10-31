import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown';
import Highlight from 'reveal.js/plugin/highlight';
import Notes from 'reveal.js/plugin/notes';
import renderMathInElement from 'katex/contrib/auto-render';
import { addBackdrop } from './backdrop.js';
import { addCursor } from './cursor.js';
import { addBars } from './bars.js';
import {
  Chart, BarController, BarElement, LineController, LineElement, PointElement,
  CategoryScale, LinearScale, Legend, Tooltip,
} from 'chart.js';

import 'reveal.js/reveal.css';
import 'katex/dist/katex.min.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/600.css';
import './style.css';

// ─── PDF export mode ───────────────────────────────────────────
// Opening the deck with ?export (what `npm run pdf` does) shows every
// fragment, drops transitions and chart animations, and collapses
// step-through code highlights so each slide prints as one clean page.
// ?export&fragments keeps fragments and code steps for one page per step.
const params = new URLSearchParams(location.search);
const isExport = params.has('export');
const exportSteps = isExport && params.has('fragments');
const isPrint = params.has('print-pdf');   // Chrome's own print view
document.documentElement.classList.toggle('export', isExport);
document.documentElement.classList.toggle('export-steps', exportSteps);

// ─── KaTeX ─────────────────────────────────────────────────────
// Renders \( inline \), $ inline $, \[ display \] and $$ display $$
// maths on every slide. Listed after Markdown so Markdown slides are
// already HTML by the time it runs. Add class="no-math" to any element
// whose dollar signs should stay as plain text.
const KaTeX = {
  id: 'katex',
  init: (deck) => {
    renderMathInElement(deck.getSlidesElement(), {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false },
        { left: '$', right: '$', display: false },
      ],
      ignoredClasses: ['no-math'],
      throwOnError: false,
      macros: {
        '\\R': '\\mathbb{R}',
      },
    });
  },
};

// ─── Backdrop ──────────────────────────────────────────────────
// The animated abstract art behind the slides (backdrop.js). It is on
// while <div class="reveal"> has a data-backdrop attribute.
if (document.querySelector('.reveal[data-backdrop]')) addBackdrop();

// ─── Custom cursor ─────────────────────────────────────────────
// The iPad-style pointer (cursor.js). On while <div class="reveal">
// has a data-cursor attribute; never in PDF export.
if (document.querySelector('.reveal[data-cursor]') && !isExport && !isPrint) addCursor();

// ─── Reveal initialization ─────────────────────────────────────
// Every option: https://revealjs.com/config/
const deck = new Reveal({
  plugins: [Markdown, Highlight, Notes, KaTeX],
  hash: true,
  center: false,          // slides lay themselves out top-down (see style.css)
  display: 'flex',        // each slide is a flex column
  width: 1280,
  height: 720,
  margin: isPrint ? 0 : 0.04, // print pages are exactly one slide
  // Slides move in the direction you travel: → pushes the next slide in
  // from the right, ← from the left, ↓ and ↑ from below and above.
  // style.css sets the move's length and easing (--slide-duration).
  transition: isExport ? 'none' : 'slide',
  transitionSpeed: 'default',   // the actual length is --slide-duration in style.css
  backgroundTransition: 'slide',
  controls: !isExport,
  controlsLayout: 'edges', // arrows at the screen edges, clear of the footer
  progress: !isExport,
  fragments: !isExport || exportSteps,
  autoAnimate: !isExport,
  pdfSeparateFragments: false,
});

// decktape looks for a global `Reveal` to drive the deck during export.
window.Reveal = deck;

deck.initialize().then(() => {
  addFooters();
  addBars(deck);
  bindSnippets();
  bindSelectableCards();
  bindTimelines();
  renderCharts(deck.getCurrentSlide());
  deck.layout();
});

deck.on('slidechanged', (event) => renderCharts(event.currentSlide));

// Chrome's print view lays out every slide at once: draw all the charts
// after reveal.js has moved the slides into their print pages.
deck.on('pdf-ready', () => deck.getSlides().forEach(renderCharts));

// ─── Footer ────────────────────────────────────────────────────
// The deck title on the left and "7 of 24" on the right of every slide.
// The text comes from data-footer on .reveal; a slide can override it
// with its own data-footer, or hide the footer with class="no-footer".
//
// There is one footer for the whole deck, so it stays in place while
// slides move. When its text changes, the old and new text cross-fade.
// It lives in its own slide-sized layer, scaled like the slides; not in
// .slides itself, where reveal.js would take it for a slide's neighbour
// and never report the last slide (which stalls PDF export). Chrome's
// print view lays out every slide at once, so there each slide gets its
// own copy instead.
function addFooters() {
  if (isPrint) {
    addFooterToEachSlide();
    return;
  }

  const footer = document.createElement('div');
  footer.className = 'slide-footer slide-footer--fixed is-hidden';
  footer.innerHTML = `
    <span class="footer-swap"><span></span><span></span></span>
    <span class="footer-swap slide-count"><span></span><span></span></span>
  `;
  const frame = document.createElement('div');
  frame.className = 'slide-frame';
  frame.style.width = `${deck.getConfig().width}px`;
  frame.style.height = `${deck.getConfig().height}px`;
  frame.append(footer);
  deck.getRevealElement().append(frame);
  const scaleFrame = () => frame.style.setProperty('--slide-scale', deck.getScale());
  scaleFrame();
  deck.on('resize', scaleFrame);

  const [title, count] = footer.querySelectorAll('.footer-swap');
  const deckFooter = deck.getRevealElement().dataset.footer || '';

  const update = () => {
    const slide = deck.getCurrentSlide();
    const wasHidden = footer.classList.contains('is-hidden');
    const hide = slide.classList.contains('no-footer');
    footer.classList.toggle('is-hidden', hide);
    if (hide) return;   // keep the old text while the footer fades out
    // Coming back from a footer-less slide, show the new text straight away
    crossFade(title, slide.dataset.footer ?? deckFooter, !wasHidden);
    crossFade(count, `${deck.getSlidePastCount() + 1} of ${deck.getTotalSlides()}`, !wasHidden);
  };
  update();
  deck.on('slidechanged', update);
}

// Each .footer-swap holds two stacked spans; the new text goes into the
// hidden one and the two swap, so CSS fades one out as the other fades in.
function crossFade(holder, text, animate) {
  const current = holder.querySelector('.is-current') ?? holder.firstElementChild;
  if (current.textContent === text && current.classList.contains('is-current')) return;
  if (!animate) {
    current.textContent = text;
    current.classList.add('is-current');
    return;
  }
  const next = current.nextElementSibling ?? holder.firstElementChild;
  next.textContent = text;
  current.classList.remove('is-current');
  next.classList.add('is-current');
}

function addFooterToEachSlide() {
  const slides = deck.getSlides();
  const deckFooter = deck.getRevealElement().dataset.footer || '';

  slides.forEach((slide, index) => {
    if (slide.classList.contains('no-footer') || slide.querySelector('.slide-footer')) return;

    const footer = document.createElement('div');
    footer.className = 'slide-footer';
    footer.innerHTML = `
      <span class="slide-title"></span>
      <span class="slide-count">${index + 1} of ${slides.length}</span>
    `;
    footer.querySelector('.slide-title').textContent = slide.dataset.footer ?? deckFooter;
    slide.appendChild(footer);
  });
}

// ─── Growing timelines ─────────────────────────────────────────
// A timeline inside a .timeline-window shows two steps at a time. Its
// later steps are fragments; as each one appears (or disappears again),
// the list glides so the newest two visible steps sit at the top of the
// window. The glide itself is a CSS transition on `translate`.
function bindTimelines() {
  const windows = [...document.querySelectorAll('.timeline-window')];
  if (!windows.length) return;

  const update = () => windows.forEach((win) => {
    const list = win.querySelector('.timeline');
    const shown = [...list.children].filter((step) =>
      !step.classList.contains('fragment') || step.classList.contains('visible'));
    const anchor = shown[Math.max(0, shown.length - 2)];
    list.style.translate = `0 ${-(anchor?.offsetTop ?? 0)}px`;
  });

  update();
  ['fragmentshown', 'fragmenthidden', 'slidechanged'].forEach((type) => deck.on(type, update));
}

// ─── Selectable cards ──────────────────────────────────────────
// In a group marked data-select, clicking a card selects it and clears
// the others; clicking the selected card again clears it. The look is
// .card.is-selected in style.css. A card with data-highlight="name" also
// lights up the elements with data-part="name" on its slide (such as
// nodes in a diagram) while it is selected, in the card's colour.
function bindSelectableCards() {
  document.querySelectorAll('[data-select]').forEach((group) => {
    const cards = [...group.querySelectorAll(':scope > .card')];
    const slide = group.closest('section');
    const parts = (card) => (card.dataset.highlight
      ? slide.querySelectorAll(`[data-part="${card.dataset.highlight}"]`)
      : []);
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const select = !card.classList.contains('is-selected');
        cards.forEach((other) => {
          const on = select && other === card;
          const colour = getComputedStyle(other).getPropertyValue('--card-accent').trim();
          other.classList.toggle('is-selected', on);
          parts(other).forEach((part) => {
            if (colour) part.style.setProperty('--highlight', colour);
            part.classList.toggle('is-highlighted', on);
          });
        });
      });
    });
  });
}

// ─── Copy-on-click install snippets ─────────────────────────────
function bindSnippets() {
  document.querySelectorAll('.snippet').forEach((snippet) => {
    snippet.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(snippet.textContent.trim());
        snippet.classList.add('is-copied');
        setTimeout(() => snippet.classList.remove('is-copied'), 1500);
      } catch {
        // Clipboard access can be blocked (e.g. non-https); nothing to do.
      }
    });
  });
}

// ─── Charts (Chart.js) ─────────────────────────────────────────
// Put <div class="chart"><canvas data-chart="name"></canvas></div> on a
// slide and add a matching entry to CHARTS. Each entry receives the
// theme colours so charts follow the tokens in style.css: series take
// c.series[0], c.series[1] … in order (blue, then orange; never skip or
// reorder them, the order keeps neighbours distinguishable for
// colour-blind viewers). A chart is rebuilt every time its slide is
// shown so the animation replays.
Chart.register(
  BarController, BarElement, LineController, LineElement, PointElement,
  CategoryScale, LinearScale, Legend, Tooltip,
);

const CHARTS = {
  quarterly: (c) => ({
    type: 'bar',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        { label: 'This year', data: [42, 58, 71, 86], backgroundColor: c.series[0] },
        { label: 'Last year', data: [35, 41, 52, 60], backgroundColor: c.series[1] },
      ],
    },
    options: {
      datasets: { bar: { borderRadius: 4, barPercentage: 0.9, categoryPercentage: 0.6 } },
      scales: { y: { beginAtZero: true, max: 100, ticks: { stepSize: 25 } } },
    },
  }),

  trend: (c) => ({
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [
        {
          label: 'Measured', data: [12, 19, 17, 28, 34, 31, 42, 48],
          borderColor: c.series[0], backgroundColor: c.series[0], tension: 0.35,
        },
        {
          label: 'Target', data: [15, 20, 25, 30, 35, 40, 45, 50],
          borderColor: c.series[1], backgroundColor: c.series[1], borderDash: [6, 6], pointRadius: 0,
        },
      ],
    },
    options: {
      elements: { point: { radius: 4, hoverRadius: 6 }, line: { borderWidth: 2 } },
      interaction: { mode: 'index', intersect: false },
      scales: { y: { beginAtZero: true } },
    },
  }),
};

function themeColors() {
  const css = getComputedStyle(document.documentElement);
  const token = (name) => css.getPropertyValue(`--color-${name}`).trim();
  return {
    ink: token('ink'),
    charcoal: token('charcoal'),
    body: token('body'),
    mute: token('mute'),
    hairline: token('hairline'),
    hairlineStrong: token('hairline-strong'),
    canvas: token('canvas'),
    surfaceDark: token('surface-dark'),
    onDark: token('on-dark'),
    series: [1, 2].map((n) => css.getPropertyValue(`--chart-${n}`).trim()),
    fontBody: css.getPropertyValue('--font-body').trim(),
  };
}

function renderCharts(slide) {
  if (!slide) return;
  const colors = themeColors();
  Chart.defaults.font.family = colors.fontBody;

  slide.querySelectorAll('canvas[data-chart]').forEach((canvas) => {
    const build = CHARTS[canvas.dataset.chart];
    if (!build) {
      console.warn(`No chart named "${canvas.dataset.chart}" in CHARTS`);
      return;
    }

    Chart.getChart(canvas)?.destroy();
    const config = build(colors);
    config.options = mergeDefaults(config.options, colors);
    new Chart(canvas, config);
  });
}

// Shared look for every chart: hairline grid, body-coloured ticks,
// system font, legend at the bottom. Per-chart options win.
function mergeDefaults(options = {}, c) {
  const axis = {
    grid: { color: c.hairline, drawTicks: false },
    border: { display: false },
    ticks: { color: c.body, padding: 10, font: { size: 18 } },
  };
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: isExport || isPrint ? false : { duration: 700 },
    ...options,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: c.charcoal, usePointStyle: true, boxWidth: 10, boxHeight: 10, padding: 24, font: { size: 18 } },
      },
      tooltip: {
        backgroundColor: c.surfaceDark, titleColor: c.onDark, bodyColor: c.onDark,
        padding: 12, cornerRadius: 8, displayColors: false,
      },
      ...options.plugins,
    },
    scales: {
      x: { ...axis, grid: { display: false }, ...options.scales?.x },
      y: { ...axis, ...options.scales?.y, ticks: { ...axis.ticks, ...options.scales?.y?.ticks } },
    },
  };
}
