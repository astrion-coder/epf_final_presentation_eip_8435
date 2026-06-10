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
  center: false,          // we handle our own vertical alignment
  transition: 'fade',
  transitionSpeed: 'fast',
  backgroundTransition: 'fade',
  width: 1280,
  height: 720,
  margin: 0.04,
});

deck.initialize();

// ─── Chart.js bar chart (Slide 5) ────────────────────────────
// Chart.js must be available; install via: npm install chart.js
// Then import it here:
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

// Draw chart once Reveal is ready and the slide is in the DOM
deck.on('ready', () => {
  renderBarChart();
});

// Re-render if navigating back to the chart slide
deck.on('slidechanged', (event) => {
  if (event.indexh === 4) {  // 0-indexed; slide 5 is index 4
    renderBarChart();
  }
});

function renderBarChart() {
  const canvas = document.getElementById('barChart');
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