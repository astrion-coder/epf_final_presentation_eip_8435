// ─── Bars ──────────────────────────────────────────────────────
// Horizontal bars that animate and show their values on hover.
//
//   .segbar  a row of segments in proportion: byte layouts, stacked
//            shares, labelled strips. Each child is a segment with
//            data-size (its width in units, e.g. bytes). data-total on
//            the bar sets the scale (default: the sum of the sizes) and
//            data-ticks adds the offsets under it.
//   .hbars   a bar chart, one bar per row (sized in CSS, see style.css)
//
// Segments and bars grow in from the left when their slide appears.
//
// A <figure class="segrow morph fragment custom"> grows out of the
// .segrow before it on the same slide, in three stages: it slides down
// out of that earlier bar (arrive), its segments take their new widths
// (resize), then their new labels and colours (relabel). Segments are
// matched between the two bars by data-key. By default all three run on
// one press of →; put <span class="fragment custom morph-step"
// data-step="resize"> (and/or data-step="relabel") inside the figure to
// give a stage its own press.
//
// Anything with data-tip (and optionally data-tip-detail) shows a
// tooltip on hover. On a byte bar (one with data-ticks) the tooltip also
// gives the segment's byte range, worked out from its current width.

export function addBars(deck) {
  document.querySelectorAll('.segbar').forEach(setUpSegbar);
  const morphs = [...document.querySelectorAll('.segrow.morph')].map(setUpMorph).filter(Boolean);
  document.querySelectorAll('.hbars').forEach((chart) => {
    [...chart.children].forEach((bar, i) => bar.style.setProperty('--i', i));
  });
  const tooltip = addTooltip();

  const update = () => {
    morphs.forEach((morph) => morph.sync());
    morphs.filter((morph) => deck.getCurrentSlide()?.contains(morph.row)).forEach((morph) => morph.measure());
    tooltip.hide();
  };
  update();
  ['slidechanged', 'fragmentshown', 'fragmenthidden', 'resize'].forEach((type) => deck.on(type, update));
}

// Sizes each segment as a share of the bar, numbers it for the
// staggered entrance and wraps its content in a label
function setUpSegbar(bar) {
  const segs = [...bar.children];
  const sizes = segs.map((seg) => Number(seg.dataset.size ?? 1));
  const sum = sizes.reduce((a, b) => a + b, 0);
  const total = Number(bar.dataset.total ?? sum);

  // segbar--fit: the bar is only as wide as its segments, on the shared scale
  if (bar.classList.contains('segbar--fit')) {
    bar.style.width = `${(sum / total) * 100}%`;
    bar.style.setProperty('--total', sum);
  } else {
    bar.style.setProperty('--total', total);
  }

  segs.forEach((seg, i) => {
    seg.classList.add('seg');
    seg.style.setProperty('--size', sizes[i]);
    seg.style.setProperty('--i', i);
    seg.innerHTML = `<span class="seg-label">${seg.innerHTML}</span>`;
  });

  if (bar.hasAttribute('data-ticks')) bar.after(makeTicks(sizes, bar.style.getPropertyValue('--total')));
}

// Byte offsets under a bar: one tick at the start of each segment,
// plus one where the last segment ends
function makeTicks(sizes, total) {
  const ticks = document.createElement('div');
  ticks.className = 'segbar-ticks';
  ticks.setAttribute('aria-hidden', 'true');
  ticks.style.setProperty('--total', total);
  let offset = 0;
  sizes.forEach((size, i) => {
    ticks.append(makeTick(size, i, offset));
    offset += size;
  });
  const end = makeTick(0, sizes.length, offset);
  end.classList.add('seg-tick--end');
  ticks.append(end);
  return ticks;
}

function makeTick(size, i, text) {
  const tick = document.createElement('span');
  tick.className = 'seg-tick';
  tick.style.setProperty('--size', size);
  tick.style.setProperty('--i', i);
  tick.innerHTML = `<span class="tick-label">${text}</span>`;
  return tick;
}

// Gives a morph row its "before" layout, copied from the row above:
// sizes, labels, colours and tooltips, matched by data-key
function setUpMorph(row) {
  let source = row.previousElementSibling;
  while (source && !source.matches('.segrow')) source = source.previousElementSibling;
  const bar = row.querySelector('.segbar');
  const from = source?.querySelector('.segbar');
  if (!bar || !from) return null;

  const fromSegs = [...from.querySelectorAll(':scope > .seg')];
  const segs = [...bar.querySelectorAll(':scope > .seg')];
  bar.style.setProperty('--before-total', from.style.getPropertyValue('--total'));

  const beforeSizes = segs.map((seg) => {
    const match = fromSegs.find((candidate) => candidate.dataset.key && candidate.dataset.key === seg.dataset.key);
    const size = match ? Number(match.style.getPropertyValue('--size')) : 0;
    seg.style.setProperty('--before-size', size);
    seg.dataset.classAfter = seg.className;
    seg.dataset.classBefore = match ? match.className : 'seg';
    if (match) {
      seg.dataset.tipBefore = match.dataset.tip ?? '';
      seg.dataset.tipDetailBefore = match.dataset.tipDetail ?? '';
      const label = match.querySelector('.seg-label').innerHTML;
      if (label !== seg.querySelector('.seg-label').innerHTML) {
        seg.insertAdjacentHTML('beforeend', `<span class="seg-label seg-label--before">${label}</span>`);
        seg.dataset.relabels = '';
      }
    }
    return size;
  });

  const ticks = row.querySelector('.segbar-ticks');
  if (ticks) {
    ticks.style.setProperty('--before-total', from.style.getPropertyValue('--total'));
    let offset = 0;
    [...ticks.children].forEach((tick, i) => {
      const size = beforeSizes[i] ?? 0;
      tick.style.setProperty('--before-size', size);
      if (String(offset) !== tick.textContent) {
        tick.insertAdjacentHTML('beforeend', `<span class="tick-label tick-label--before">${offset}</span>`);
        tick.dataset.relabels = '';
      }
      offset += size;
    });
  }

  const step = (name) => row.querySelector(`:scope > .morph-step[data-step="${name}"]`);
  const resizeStep = step('resize');
  const relabelStep = step('relabel');
  row.classList.toggle('is-auto', !resizeStep && !relabelStep);

  return {
    row,
    // Mark which stages have happened, from the fragments reveal.js has
    // shown, and swap each segment's colour classes once relabelled
    sync() {
      const arrived = row.classList.contains('visible');
      const resized = arrived && (!resizeStep || resizeStep.classList.contains('visible'));
      const relabelled = resized && (!relabelStep || relabelStep.classList.contains('visible'));
      row.classList.toggle('is-arrived', arrived);
      row.classList.toggle('is-resized', resized);
      row.classList.toggle('is-relabelled', relabelled);
      segs.forEach((seg) => { seg.className = relabelled ? seg.dataset.classAfter : seg.dataset.classBefore; });
    },
    // How far up the row starts: exactly over the bar it grows out of
    measure() {
      row.style.setProperty('--rise', `${source.offsetTop - row.offsetTop}px`);
    },
  };
}

// "Bytes 1 to 4, 4 bytes" for a segment of a byte bar (one with
// data-ticks), from the widths it has right now: a morph row that has not
// been resized yet still uses the earlier bar's sizes
function byteRange(seg) {
  const bar = seg.parentElement;
  if (!seg.matches('.seg') || !bar.hasAttribute('data-ticks')) return null;
  const old = seg.closest('.segrow.morph:not(.is-resized)');
  const size = (el) => Number(el.style.getPropertyValue(old ? '--before-size' : '--size'));
  const segs = [...bar.children];
  const start = segs.slice(0, segs.indexOf(seg)).reduce((sum, el) => sum + size(el), 0);
  const bytes = size(seg);
  return bytes === 1 ? `Byte ${start}, 1 byte` : `Bytes ${start} to ${start + bytes - 1}, ${bytes} bytes`;
}

// One shared tooltip for everything with data-tip
function addTooltip() {
  const tip = document.createElement('div');
  tip.className = 'tip';
  tip.setAttribute('role', 'tooltip');
  document.body.append(tip);
  let current = null;

  const hide = () => {
    current = null;
    tip.classList.remove('is-visible');
  };

  document.addEventListener('pointerover', (event) => {
    const target = event.target.closest?.('[data-tip]');
    if (!target || target === current) return;
    current = target;

    // A morph row keeps the earlier bar's names until it is relabelled
    const morph = target.closest('.segrow.morph');
    const before = morph && !morph.classList.contains('is-relabelled') && target.dataset.tipBefore !== undefined;
    const title = before ? target.dataset.tipBefore : target.dataset.tip;
    const detail = before ? target.dataset.tipDetailBefore : target.dataset.tipDetail;

    const heading = document.createElement('strong');
    heading.textContent = title;
    tip.replaceChildren(heading);
    for (const text of [byteRange(target), detail]) {
      if (!text) continue;
      const line = document.createElement('span');
      line.textContent = text;
      tip.append(line);
    }

    // Centre it above the element, kept inside the window
    const box = target.getBoundingClientRect();
    const half = tip.offsetWidth / 2;
    const x = Math.min(Math.max(box.left + box.width / 2, half + 8), innerWidth - half - 8);
    tip.style.left = `${x}px`;
    tip.style.top = `${box.top}px`;
    tip.classList.add('is-visible');
  });

  document.addEventListener('pointerout', (event) => {
    const target = event.target.closest?.('[data-tip]');
    if (target && !target.contains(event.relatedTarget)) hide();
  });

  return { hide };
}
