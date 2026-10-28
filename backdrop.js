// ─── Backdrop ──────────────────────────────────────────────────
// Slow, faint abstract art behind every slide: soft glows, turning
// rings, a ribbon of flowing lines and a few rising specks. It is one
// fixed layer under .reveal, so it keeps moving across slide changes.
// Everything is drawn here and animated by CSS (see "Backdrop" in
// style.css), using only transform and opacity so it stays smooth.
// Colours come from the --backdrop-* tokens, so each theme has its own.

const SPECKS = 14;

export function addBackdrop() {
  const backdrop = document.createElement('div');
  backdrop.className = 'backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  backdrop.innerHTML = `
    <div class="backdrop-glow backdrop-glow--a"></div>
    <div class="backdrop-glow backdrop-glow--b"></div>
    <div class="backdrop-glow backdrop-glow--c"></div>
    ${rings('backdrop-rings', [70, 150, 230])}
    ${rings('backdrop-rings backdrop-rings--cw', [110, 190], ['14 6', '1 3'])}
    ${rings('backdrop-rings backdrop-rings--ccw', [130, 210], ['40 10 4 10', '22 14'])}
    ${waves()}
    <div class="backdrop-specks">${specks()}</div>
  `;
  document.body.prepend(backdrop);
}

// Concentric circles. The dashed sets turn slowly, which is what makes
// the rotation visible; dash lengths are percentages of each circle.
function rings(className, radii, dashes) {
  const circles = radii.map((r, i) => {
    const dash = dashes ? ` stroke-dasharray="${dashes[i]}"` : '';
    return `<circle cx="250" cy="250" r="${r}" pathLength="100"${dash} />`;
  }).join('');
  return `<svg class="${className}" viewBox="0 0 500 500">${circles}</svg>`;
}

// A ribbon of sine lines. They all share one period, and the band is
// four periods wide, so sliding it left by half its width loops with
// no visible seam. Amplitude and phase shift a little per line, which
// makes the ribbon twist instead of looking like parallel copies.
function waves() {
  const width = 2000;
  const period = 500;
  const lines = Array.from({ length: 10 }, (_, i) => {
    const amplitude = 34 + 16 * Math.sin(i * 0.6);
    const phase = i * 0.32;
    const base = 70 + i * 18;
    let d = '';
    for (let x = 0; x <= width; x += 10) {
      const y = base + amplitude * Math.sin((2 * Math.PI * x) / period + phase);
      d += `${x ? 'L' : 'M'}${x} ${y.toFixed(1)}`;
    }
    return `<path d="${d}" />`;
  }).join('');
  return `<svg class="backdrop-waves" viewBox="0 0 ${width} 300" preserveAspectRatio="none">${lines}</svg>`;
}

// Each speck gets its own size, sway and speed. A negative delay starts
// it part-way up, so the screen is already populated when the deck opens.
function specks() {
  return Array.from({ length: SPECKS }, () => {
    const duration = 30 + Math.random() * 30;
    const style = [
      `left: ${(Math.random() * 100).toFixed(1)}%`,
      `--size: ${(1.5 + Math.random() * 2).toFixed(1)}px`,
      `--sway: ${((Math.random() - 0.5) * 120).toFixed(0)}px`,
      `--duration: ${duration.toFixed(1)}s`,
      `--delay: ${(-Math.random() * duration).toFixed(1)}s`,
    ].join('; ');
    return `<span style="${style}"></span>`;
  }).join('');
}
