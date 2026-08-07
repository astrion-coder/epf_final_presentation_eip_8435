import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown';
import Math from 'reveal.js/plugin/math';
import RevealNotes from 'reveal.js/plugin/notes';
import 'reveal.js/reveal.css';
import 'reveal.js/theme/black.css';
import './style.css';
import 'reveal.js/plugin/highlight/monokai.css'
import RevealHighlight from 'reveal.js/plugin/highlight';

// ─── Reveal initialization ───────────────────────────────────
const deck = new Reveal({
  plugins: [Markdown, Math, RevealNotes, RevealHighlight],
  hash: true,
  controls: true,
  progress: true,
  center: false,            // we handle our own vertical alignment
  transition: 'slide',      // smooth push: horizontal between sections, vertical within a section
  transitionSpeed: 'default',
  backgroundTransition: 'slide',
  width: 1280,
  height: 720,
  margin: 0.04,
});

deck.initialize();

// ─── Chart.js bar chart ────────────────────────────────────────
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

deck.on('ready', (event) => {
  renderBarChartIfPresent(event.currentSlide);
  updateSlideNumber(event.currentSlide);
});

deck.on('slidechanged', (event) => {
  renderBarChartIfPresent(event.currentSlide);
  updateSlideNumber(event.currentSlide);
});

function renderBarChartIfPresent(slide) {
  const canvas = slide && slide.querySelector('#barChart');
  if (!canvas) return;

  // Destroy existing instance if any (prevents double-render on revisit)
  const existing = Chart.getChart(canvas);
  if (existing) existing.destroy();

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
      datasets: [
        {
          label: 'Series 1',
          data: [55, 70, 45, 65],
          backgroundColor: '#3ecf6e',
          borderRadius: 3,
          barPercentage: 0.6,
        },
        {
          label: 'Series 2',
          data: [40, 30, 55, 80],
          backgroundColor: '#4a7fc1',
          borderRadius: 3,
          barPercentage: 0.6,
        },
        {
          label: 'Series 3',
          data: [25, 50, 35, 95],
          backgroundColor: '#5bbddf',
          borderRadius: 3,
          barPercentage: 0.6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },  // custom legend in HTML
        tooltip: {
          backgroundColor: 'rgba(13,20,32,0.95)',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          titleColor: '#fff',
          bodyColor: '#9ca3af',
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#9ca3af', font: { size: 11 } },
        },
        y: {
          min: 0,
          max: 100,
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#9ca3af', font: { size: 11 }, stepSize: 25 },
        },
      },
    },
  });
}

// ─── Footer slide numbers ──────────────────────────────────────
// Reveal keeps every vertical subsection mounted, so we just look up
// this slide's position in the fully flattened slide list.
function updateSlideNumber(slide) {
  const label = slide && slide.querySelector('.slide-number');
  if (!label) return;
  const index = deck.getSlides().indexOf(slide);
  label.textContent = index === -1 ? '' : String(index + 1).padStart(2, '0');
}

// ─── Timeline (vertical, scrollable, data-driven) ───────────────
// Add, remove, or reorder entries here — renderTimeline() rebuilds the
// rail, dots, spacing and scroll-reveal to match. Nothing in index.html
// or style.css needs to change when the list changes.
const TIMELINE_ITEMS = [
  { date: 'Q1 2025', title: 'Kickoff', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { date: 'Q2 2025', title: 'Build', desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { date: 'Q3 2025', title: 'Launch', desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
  { date: 'Q4 2025', title: 'Scale', desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.' },
  { date: 'Q1 2026', title: 'Review', desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa.' },
];

function renderTimeline() {
  const track = document.getElementById('timeline-v');
  if (!track) return;

  track.innerHTML = TIMELINE_ITEMS.map(item => `
    <div class="timeline-v-item">
      <div class="timeline-v-rail"><span class="timeline-v-dot"></span></div>
      <div class="timeline-v-content">
        <p class="timeline-v-date">${item.date}</p>
        <div class="timeline-v-card glass-panel">
          <p class="timeline-v-title">${item.title}</p>
          <p class="timeline-v-desc">${item.desc}</p>
        </div>
      </div>
    </div>
  `).join('');

  // Reveal each item as it scrolls into view, then stop watching it so
  // scrolling back up/down doesn't repeatedly re-trigger the animation.
  const wrap = track.closest('.timeline-v-wrap');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { root: wrap, threshold: 0.35 });

  track.querySelectorAll('.timeline-v-item').forEach(el => observer.observe(el));
}

renderTimeline();
