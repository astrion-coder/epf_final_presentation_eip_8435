// ─── Custom cursor ─────────────────────────────────────────────
// Replaces the mouse pointer over the deck with one small dot, in the
// style of the iPad pointer:
//   • It glides: every frame it covers a share of the remaining distance
//     (EASE), which smooths out small jitters but stays close enough to
//     click precisely.
//   • Over a button, link or snippet it snaps to it and morphs into a
//     soft highlight in the element's shape. The highlight leans a little
//     towards the mouse (PARALLAX) and the element drifts after it (LIFT).
//   • It shrinks while the mouse button is down, and fades out after a
//     few idle seconds, as reveal.js does for the normal pointer.
// Position, size and corner radius are all eased here, frame by frame,
// so the morph stays in step. Colours are in "Custom cursor" in style.css.

const EASE = 0.4;         // glide of the free dot, per 60 Hz frame; 1 = no glide
const SNAP_EASE = 0.3;    // how quickly it morphs onto and off a button
const DOT = 14;           // dot size in px, outline included (see .cursor)
const PAD = 6;            // room between a snapped element and its highlight
const PARALLAX = 0.12;    // how far the highlight leans towards the mouse…
const MAX_LEAN = 6;       // …but never more than this many px
const LIFT = 0.06;        // how far the element itself follows the mouse…
const MAX_LIFT = 3;       // …capped too, so wide elements stay calm
const IDLE_MS = 5000;
const SNAP = 'a, button, .snippet, [role="button"]';
const HOVER = '.reveal.overview .slides section, [data-select] > .card';   // too big to snap to: just grow

const clamp = (value, max) => Math.max(-max, Math.min(max, value));

export function addCursor() {
  // Touch screens and pens have no pointer to replace
  if (!matchMedia('(pointer: fine)').matches) return;

  const html = document.documentElement;
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.append(cursor);
  html.classList.add('has-custom-cursor');

  // People who ask for less motion get no glide, lean or drift
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
  const shape = { x: pointer.x, y: pointer.y, w: DOT, h: DOT, r: DOT / 2 };
  let snapped = null;    // { el, x, y, w, h, r }: the element and its resting box
  let idleTimer;

  const show = (visible) => html.classList.toggle('cursor-visible', visible);

  function snapTo(el) {
    const box = el.getBoundingClientRect();
    const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
    snapped = {
      el,
      x: box.left + box.width / 2,
      y: box.top + box.height / 2,
      w: box.width + PAD * 2,
      h: box.height + PAD * 2,
      r: Math.min(radius, box.height / 2) + PAD,
    };
    el.classList.add('cursor-lifted');
    cursor.classList.add('is-snapped');
  }

  function release() {
    if (!snapped) return;
    const { el } = snapped;
    el.style.translate = '';
    setTimeout(() => el.classList.remove('cursor-lifted'), 250);   // let it ease back first
    snapped = null;
    cursor.classList.remove('is-snapped');
  }

  // Only single-line elements get the highlight: a link that wraps onto
  // two lines has no one shape to wrap it in
  function canSnap(el) {
    const rects = el.getClientRects();
    return rects.length === 1 && rects[0].height <= 160;
  }

  // Where the cursor is heading this frame
  function goal() {
    if (!snapped) return { x: pointer.x, y: pointer.y, w: DOT, h: DOT, r: DOT / 2 };
    const lean = still ? 0 : PARALLAX;
    return {
      x: snapped.x + clamp((pointer.x - snapped.x) * lean, MAX_LEAN),
      y: snapped.y + clamp((pointer.y - snapped.y) * lean, MAX_LEAN),
      w: snapped.w,
      h: snapped.h,
      r: snapped.r,
    };
  }

  addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;

    const target = event.target.closest?.(SNAP);
    if (target !== snapped?.el) {
      release();
      if (target && canSnap(target)) snapTo(target);
    }
    cursor.classList.toggle('is-hovering', !snapped && Boolean(event.target.closest?.(HOVER)));

    if (!html.classList.contains('cursor-visible')) {
      Object.assign(shape, goal());   // appear in place, not glide in from the old spot
    }
    show(true);
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => show(false), IDLE_MS);
  });

  addEventListener('pointerdown', () => cursor.classList.add('is-pressed'));
  addEventListener('pointerup', () => cursor.classList.remove('is-pressed'));
  addEventListener('resize', release);   // the resting box is out of date
  html.addEventListener('mouseleave', () => { release(); show(false); });
  addEventListener('blur', () => show(false));

  let last = performance.now();
  requestAnimationFrame(function frame(now) {
    // A slide change moves the element we snapped to off screen (or hides
    // it); let go instead of leaving the highlight where it used to be
    const slide = snapped?.el.closest('.slides section');
    if (snapped && (!snapped.el.offsetParent || (slide && !slide.classList.contains('present')))) release();

    // Scale the ease by the real time since the last frame, so the motion
    // feels the same on 60 Hz and 120 Hz screens
    const frames = Math.min((now - last) / (1000 / 60), 4);
    last = now;
    const ease = still ? 1 : snapped ? SNAP_EASE : EASE;
    const step = 1 - (1 - ease) ** frames;
    const target = goal();
    for (const key of ['x', 'y', 'w', 'h', 'r']) shape[key] += (target[key] - shape[key]) * step;

    cursor.style.width = `${shape.w}px`;
    cursor.style.height = `${shape.h}px`;
    cursor.style.borderRadius = `${shape.r}px`;
    // `translate`, not `transform`, so the CSS `scale` (press, hover) works
    // around the centre instead of scaling the position too
    cursor.style.translate = `${shape.x - shape.w / 2}px ${shape.y - shape.h / 2}px`;

    if (snapped && !still) {
      const dx = clamp((pointer.x - snapped.x) * LIFT, MAX_LIFT);
      const dy = clamp((pointer.y - snapped.y) * LIFT, MAX_LIFT);
      snapped.el.style.translate = `${dx}px ${dy}px`;
    }
    requestAnimationFrame(frame);
  });
}
