# EIP-8435 at the Ethereum Protocol Fellowship

The final presentation for EIP-8435, *Last-Written Block in PBT Leaves*, from Cohort 7 of the Ethereum Protocol Fellowship.

- **Live deck:** <https://astrion-coder.github.io/epf_final_presentation_eip_8435/>
- **PDFs:** [slides.pdf](slides.pdf) (light) and [slides-dark.pdf](slides-dark.pdf) (dark)
- **The EIP:** <https://eips.ethereum.org/EIPS/eip-8435>

Every push to `main` rebuilds the deck and publishes it to GitHub Pages ([.github/workflows/pages.yml](.github/workflows/pages.yml)). The rest of this README documents the presentation template the deck is built on.

## Presentation Template

A minimal [reveal.js](https://revealjs.com) slide deck with rounded headings, pill buttons and hairline cards, following the design system in [DESIGN.md](DESIGN.md). It has two complete colour themes, black on white and white on near-black, chosen with `npm run dev` or `npm run dev:dark`. Slow, faint abstract art moves behind the slides, and one attribute turns it off. It comes with example slides for everything you are likely to need: text, lists, images, quotes, Markdown, code with step-through highlights, LaTeX maths, tables, charts, key numbers, comparison cards, a timeline, fragments, auto-animate and speaker notes.

Everything is bundled locally (fonts, KaTeX, highlight.js, Chart.js), so the deck runs without an internet connection.

**Two decks share the theme.** [index.html](index.html) is the talk, *EIP-8435: write-age metadata for the Partitioned Binary Tree* (Ethereum Protocol Fellowship, Cohort 7), at <http://localhost:5173>. [examples.html](examples.html) holds the template's example slides for every component, at <http://localhost:5173/examples.html>.

## Contents

- [Quick start](#quick-start)
- [Light and dark themes](#light-and-dark-themes)
- [Presenting](#presenting)
- [Export to PDF](#export-to-pdf)
- [Build a static site](#build-a-static-site)
- [Project layout](#project-layout)
- [Writing slides](#writing-slides)
- [Customising](#customising)
- [Troubleshooting](#troubleshooting)

## Quick start

You need **Node.js 20.19 or newer**.

```sh
npm install
npm run dev            # light theme
npm run dev:dark       # dark theme
```

Open <http://localhost:5173>. The page reloads whenever you save a file.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with live reload at `localhost:5173` |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serves the built `dist/` at `localhost:4173` |
| `npm run pdf` | Builds the deck, then exports `slides.pdf` |

Each has a dark-theme twin: `npm run dev:dark`, `npm run build:dark` and `npm run pdf:dark`. Light is the default.

## Light and dark themes

```sh
npm run dev           # black on white (the default)
npm run dev:dark      # white on near-black
npm run build:dark    # dist/ in the dark theme
npm run pdf:dark      # slides-dark.pdf  (npm run pdf gives slides.pdf)
```

Both themes are complete: background, text, code, tables, maths, charts, pills and cards all switch. Every slide uses the theme's background, section dividers included, so a deck never alternates light and dark pages. In the dark theme the dark card and the strip are one shade lighter than the background, and the primary pill turns white.

- **Switching:** stop the dev server and start it again with the other flag. A build holds one theme, so `npm run preview` shows whichever theme you built last.
- **How it works:** the `:dark` scripts run Vite with its own `--mode dark` option. [vite.config.js](vite.config.js) reads the mode and writes `<html data-theme="dark">` into the page. [style.css](style.css) has the light colour tokens in `:root` and the dark ones in `:root[data-theme="dark"]`.
- **Why `dev:dark` and not `dev --dark`:** `npm run dev --dark` and `--light` still work for now, but npm prints `npm warn Unknown cli config "--dark"` and says it will stop passing such flags on in its next major version. The `:dark` scripts don't depend on npm, so they keep working. Two other ways that keep working: `npm run dev -- --mode dark`, and `THEME=dark npm run dev` (PowerShell: `$env:THEME="dark"; npm run dev`). Because it is Vite's mode, `--mode dark` would also load a `.env.dark` file if you ever add one.
- **Images with a dark version:** add `data-dark-src` and the dark theme uses that file instead. The logo and the placeholder image do this:
  ```html
  <img class="logo" src="/images/logo.svg" data-dark-src="/images/logo-dark.svg" alt="" />
  ```
  The swap happens when the page is served or built, for `<img>` tags in [index.html](index.html) (not inside Markdown slides). Images without `data-dark-src` are the same in both themes.
- **Changing the dark colours:** edit the `:root[data-theme="dark"]` block in [style.css](style.css). Anything not listed there (fonts, sizes, spacing, `--color-on-dark`, the terminal dots) is shared by both themes.

## Presenting

| Key | Action |
|---|---|
| `→` / `Space` | Next slide or fragment |
| `←` | Previous |
| `↓` / `↑` | Move within a vertical stack (the "Extras" section) |
| `S` | Speaker view: notes, timer, next slide (opens a new window, so allow pop-ups) |
| `Esc` / `O` | Overview of all slides |
| `F` | Full screen |
| `B` / `.` | Black screen |

The URL updates as you move (`#/3`, `#/agenda`), so you can reload or share a link to a specific slide.

## Export to PDF

```sh
npm run pdf
```

This builds the deck, serves it locally, prints every slide to **`slides.pdf`** in the project root with [decktape](https://github.com/astefanutti/decktape), and stops the server. `npm run pdf:dark` writes **`slides-dark.pdf`** instead; the name follows the theme built into `dist/`. It takes about 20 seconds and needs no running dev server. The [animated backdrop](#animated-backdrop) stands still in the PDF, so every page shows the same art.

By default you get **one page per slide**, with every fragment visible and code blocks shown in full without the step highlights. Options go after `--`:

```sh
npm run pdf -- talk.pdf              # different file name
npm run pdf -- --fragments           # one page per fragment / code step
npm run pdf -- --size 1920x1080      # bigger pages (same layout, scaled up)
npm run pdf -- --page examples.html  # the example slides, as examples.pdf
npm run pdf -- talk.pdf --fragments  # combine them
npm run pdf:dark -- talk-dark.pdf    # dark theme, own file name
```

Any other [decktape option](https://github.com/astefanutti/decktape#options) can be passed the same way.

**How it works:** [scripts/export-pdf.js](scripts/export-pdf.js) opens the deck with `?export` in the URL. In that mode ([import.js](import.js)) transitions, chart animations and controls are switched off, and step-through code copies are hidden, so every page prints cleanly. You can open `http://localhost:5173/?export` yourself to preview what the PDF will look like.

**Without decktape:** start the dev server in the theme you want, open `http://localhost:5173/?print-pdf` in Chrome, press `Cmd/Ctrl+P`, set *Destination* to *Save as PDF*, *Margins* to *None*, enable *Background graphics*, and save. This is reveal.js's built-in print mode. decktape is more reliable for charts and code.

## Build a static site

```sh
npm run build           # or: npm run build:dark
```

Upload the contents of `dist/` to any static host (GitHub Pages, Netlify, an S3 bucket, a university web space). Asset paths are relative (`base: './'` in [vite.config.js](vite.config.js)), so the deck also works from a sub-folder. Opening `dist/index.html` straight from disk (`file://`) does **not** work, because browsers block ES modules there. Use `npm run preview` or any local web server.

## Project layout

```
index.html            The talk (one <section> per slide)
examples.html         The template's example slides
style.css             The theme: design tokens + component styles
import.js             reveal.js setup, KaTeX, footer, charts, PDF mode
backdrop.js           The animated art behind the slides
cursor.js             The iPad-style pointer
bars.js               Animated bars with values on hover
public/images/        Images, served at /images/... (plus *-dark.svg versions)
scripts/export-pdf.js The `npm run pdf` helper
vite.config.js        Build settings; picks the theme and applies it to index.html
DESIGN.md             The design system the theme implements
```

## Writing slides

Every slide is a `<section>` inside `<div class="slides">` in [index.html](index.html). The easiest way to make a new slide is to copy the example closest to what you want from [examples.html](examples.html), or a slide of the talk, and edit it.

### Slide types

```html
<!-- Normal slide: content flows from the top -->
<section>
  <h2>Slide title</h2>
  <p>Content…</p>
</section>

<!-- Vertically centred content -->
<section class="middle"> … </section>

<!-- Centred both ways, no footer (title / closing slides) -->
<section class="centered no-footer"> … </section>

<!-- Section divider, centred with a larger title -->
<section class="divider">
  <p class="divider-num">02</p>
  <h2>Section name</h2>
  <p class="lede">What this section covers.</p>
</section>

<!-- Vertical stack: the outer section holds slides you reach with ↓ -->
<section>
  <section>First</section>
  <section>Second</section>
</section>
```

### Layout helpers

| Class | Use |
|---|---|
| `.cols` | Two equal columns (put on a direct child of the slide) |
| `.cols--3` | Three columns |
| `.cols--wide-left` / `.cols--wide-right` | 3:2 or 2:3 split |
| `.cols--middle` / `.cols--stretch` | Vertically centre / stretch the columns |
| `.fill` | Take up the remaining height of the slide |
| `.flow` (`--tight`, `--loose`) | Stack children vertically with even gaps |
| `.row` | Put children side by side and wrap (pills, tags) |

### Text

| Class / element | Use |
|---|---|
| `h1` … `h6` | Display → small headings (h1 for title slides, h2 for slide titles) |
| `.lede` | Larger intro paragraph |
| `.small`, `.caption` | Smaller text, captions and footnotes |
| `.muted`, `.ink`, `.mono` | Light grey, black, monospace |
| `ul`, `ol`, `ul.checks` | Bullets, numbers, ✓ list |
| `blockquote` + `footer` | Pull quote with attribution |
| `figure.figure` + `figcaption` | Image with caption; the image is cropped to fit |

### Components

| Class | Example |
|---|---|
| `.pill`, `.pill--secondary`, `.pill--on-dark`, `.pill--disabled` | `<a class="pill" href="#/agenda">Go</a>` |
| `.snippet` | `<div class="snippet">npm run dev</div>`: monospace pill with `$` prompt; click to copy |
| `.tag` | `<span class="tag">npm run build</span>` |
| `.card`, `.card--compact`, `.card--dark` | Bordered card; use the dark one once per slide. On hover a card lifts 6px and its border glows in the accent colour (the `.card:hover` rule in [style.css](style.css)) |
| `data-select` on a group of cards | `<div class="cols cols--3" data-select>`: clicking a card selects it (lifted, accent border and glow, faint accent tint) and clears the others; clicking it again clears it. Add `class="is-selected"` to a card to start with it selected, which also shows in the PDF. Give a card `data-highlight="name"` and it also lights up everything on its slide with `data-part="name"` while selected, such as nodes in an SVG diagram (the talk's node-types slide). `card--cool` and `card--warm` colour a card's border, glow and highlights like the chart series |
| `.terminal` + `.terminal-bar` | Code window with traffic-light dots (see the code slides) |
| `ol.rows.rows--numbered` | Agenda rows with a number, a title and a description |
| `ul.rows` | Question / answer rows (`.row-title`, `.row-text`) |
| `dl.facts` | A term and its detail on each line, between hairlines: `<dl class="facts"><div><dt>nonce</dt><dd>Same offset</dd></div></dl>`. A line can be a fragment, and it brings its hairlines in with it |
| `ul.icon-list` | An icon beside a title and a line of text: `<li><svg class="icon">…</svg><h5>Title</h5><p class="small">Text</p></li>` |
| `.feature` | The one result that matters most, with an orange bar on its left: a `.label`, a `.figure-value` and a `.lede` |
| `.stats` + `.stat` | Big numbers with a label and description |
| `.strip` | Dark call-to-action band |
| `ul.credits` | Acknowledgements: `<li><strong>Name</strong>What they did</li>` puts the name in ink above a muted line |
| `ol.timeline` | Vertical timeline, top to bottom; mark finished steps with `li.is-done`. To grow it step by step, wrap it in `<div class="timeline-window fill">` and give the later steps `class="fragment custom"`: each press of → extends the rail, adds a dot and brings in the text, and the list glides so the newest two steps stay in view (the example slide). The window can also be one column of a `.cols.fill`, beside other content (the talk's draft-to-merged slide). The PDF shows every step as a compact row |
| `.derivation` | Equation rows with a note column |

### Fragments (step-by-step reveals)

Add `class="fragment"` to anything. Optional styles include `fade-up`, `fade-down`, `fade-left`, `semi-fade-out` and `strike` ([full list](https://revealjs.com/fragments/)).

```html
<li class="fragment fade-up">Appears on the next press of →</li>
```

### Code

```html
<div class="terminal">
  <div class="terminal-bar"><span>file-name.js</span></div>
  <pre><code class="language-javascript" data-trim data-line-numbers="1-2|4"><script type="text/template">
const a = 1;
const b = 2;

if (a < b) console.log('raw code: no need to escape < or >');
  </script></code></pre>
</div>
```

- `class="language-…"` picks the language (`python`, `bash`, `rust`, `sql`, …). highlight.js auto-detects if you leave it out.
- `data-line-numbers` turns on line numbers; `"1-2|4"` steps through highlighted ranges, one per key press.
- Wrapping the code in `<script type="text/template">` lets you paste code as-is. Without it, write `<` as `&lt;`.
- For a terminal session, use `<pre class="shell">` with `<span class="prompt">$ </span>`, `<span class="comment">` and `<span class="output">` (see the "Any language" slide).

### Maths (LaTeX)

Maths is rendered by [KaTeX](https://katex.org/docs/supported.html) on every slide:

| Write | For |
|---|---|
| `\( … \)` or `$ … $` | Inline maths |
| `\[ … \]` or `$$ … $$` | Display maths |

```html
<p>The roots are \(x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}\).</p>
\[ \begin{aligned} a &= b + c \\ d &= e \end{aligned} \]
```

- **Dollar signs in normal text** (prices) can be mistaken for maths. Add `class="no-math"` to the element or a parent (the table and the key-numbers slide do this).
- **`<` in HTML:** write `\lt` (or `&lt;`), because a bare `<b` would start an HTML tag.
- **Custom macros** go in `macros` in [import.js](import.js). `\R` → ℝ is defined as an example.
- **Markdown slides:** the Markdown parser eats some backslashes (`\\`, `\,`, `\{`). Keep complex LaTeX in HTML slides.

### Markdown slides

```html
<section data-markdown>
  <textarea data-template>
    ## Title
    - A bullet <!-- .element: class="fragment" -->

    Note:
    Speaker notes go here.
  </textarea>
</section>
```

To keep slides in a separate file, put it in `public/` (e.g. `public/slides.md`) and use `<section data-markdown="slides.md" data-separator="^\n---\n$"></section>`. See the [reveal.js Markdown docs](https://revealjs.com/markdown/).

### Citations and references

The References slide follows IEEE style: sources are numbered in the order they are first cited, titles of books, standards and software go in `<cite>` (italic), article titles in quotes, and each entry ends with its DOI or URL. `<ol class="references">` adds the `[1]` labels and the hanging indent, so write only the reference itself:

```html
<li>E. R. Tufte, <cite>The Visual Display of Quantitative Information</cite>, 2nd ed. Cheshire, CT, USA: Graphics Press, 2001.</li>
```

Cite a source on any slide with a link to the References slide; clicking it jumps there:

```html
<p>Bars show values by position <a class="cite" href="#/references">[6]</a>.</p>
```

When you add or remove a reference, renumber the citations so they still match. If your list grows past six or seven entries, split it over two slides (`id="references"` on the first). The Acknowledgements slide before it uses `ul.credits` for people, organisations and funding.

### Bars (byte layouts, shares, bar charts)

Two kinds of horizontal bar, both drawn by [bars.js](bars.js) with the look in the "Bars" block of [style.css](style.css). They grow in from the left when their slide appears, and every segment or bar shows its values in a tooltip on hover (`data-tip` for the title, `data-tip-detail` for the line under it).

**Segment bar:** a row of segments in proportion, such as a byte layout or a stacked share. Each child is a segment; `data-size` is its width in units (bytes, percent…).

```html
<div class="segbar" data-ticks>
  <span data-size="1" data-tip="version" data-tip-detail="Byte 0">v</span>
  <span data-size="3" class="seg--muted" data-tip="reserved">reserved</span>
  <span data-size="28" class="seg--warm" data-tip="payload">payload</span>
</div>
```

- `data-total` sets the scale (default: the sum of the sizes); a bar with room left over shows it as empty track. Add `segbar--fit` to shrink the bar to its segments instead, for rows compared on one scale.
- `data-ticks` prints byte offsets under the bar.
- Segment colours: `seg--muted` (reserved), `seg--warm` (orange, what is new), `seg--cool` (blue, what stays). Bar sizes: `segbar--slim`, and `segbar--strip` for taller, left-aligned labels with a small `<small>` index above.

**Before and after:** put each bar in a `<figure class="segrow">` with a `<figcaption>`, and mark the second one `morph fragment custom`. It grows out of the first bar in three stages: it slides down out of it, its segments take their new widths (the byte offsets move with them), then their new labels and colours (and the caption appears). Segments are matched by `data-key`; a segment with no match grows from nothing. By default all three stages run on one press of →. To give a stage its own press, put a step marker inside the figure, with `data-fragment-index` values in order:

```html
<figure class="segrow morph fragment custom" data-fragment-index="1">
  <span class="fragment custom morph-step" data-step="resize" data-fragment-index="2"></span>
  <span class="fragment custom morph-step" data-step="relabel" data-fragment-index="3"></span>
  …
</figure>
```

On a byte bar (one with `data-ticks`) the tooltips add each segment's byte range, worked out from its current width, so they stay right at every stage; use `data-tip-detail` for anything else. Content that should appear after a one-press morph gets `class="fragment after-morph"` with the morph's `data-fragment-index`. The talk's account-leaf slide uses step markers; the 3-byte and storage-leaf slides morph on one press. The PDF shows the finished state.

**Bar chart:** one bar per row, against `--max`:

```html
<div class="hbars" style="--max: 2880">
  <div class="hbar hbar--warm" style="--value: 768" data-tip="2 children" data-tip-detail="768 bytes">
    <span class="hbar-label">2</span>
    <span class="hbar-track"><span class="hbar-fill"></span><span class="hbar-value">768 B</span></span>
  </div>
</div>
```

`hbar--warm` and `hbar--cool` colour a bar like the chart series; others are grey. `--hbar-label` on `.hbars` widens the label column. Bars inside a fragment grow when it is shown, and inside an `after-morph` fragment once the morph has finished (the storage-leaf slide).

### Speaker notes

Put an `<aside class="notes">…</aside>` inside any slide, then press `S` while presenting.

### Charts

1. Put a canvas on a slide:
   ```html
   <div class="chart"><canvas data-chart="sales" role="img" aria-label="Describe the chart"></canvas></div>
   ```
2. Add a matching entry to the `CHARTS` object in [import.js](import.js). It receives the theme colours (`c.series`, `c.ink`, `c.body`, …) and returns a normal [Chart.js config](https://www.chartjs.org/docs/latest/):
   ```js
   sales: (c) => ({
     type: 'bar',
     data: { labels: ['A', 'B'], datasets: [{ label: 'Units', data: [3, 5], backgroundColor: c.series[0] }] },
   }),
   ```
   Shared styling (grid, ticks, legend, tooltip) is applied automatically. The chart is redrawn each time its slide is shown. Change the height with `.chart { height: … }`.

Series colours come from a colour-blind-safe palette: `c.series[0]` is blue and `c.series[1]` orange, with separate shades for the light and dark themes (`--chart-1`, `--chart-2` in [style.css](style.css)). Give series the colours in that order. For more series, add the palette's next colours as `--chart-3` (aqua `#1baf7a` light / `#199e70` dark) and `--chart-4` (yellow `#eda100` / `#c98500`), extend the `[1, 2]` list in `themeColors()`, and keep a second cue besides colour, such as the dashed target line or direct labels.

### Images

Put files in `public/images/` and reference them as `/images/name.png`. The SVGs in there (`logo.svg`, `placeholder.svg` and their `-dark` versions) are neutral placeholders to replace. To give an image a dark-theme version, add `data-dark-src` (see [Light and dark themes](#light-and-dark-themes)).

## Customising

Almost everything is controlled by the design tokens at the top of [style.css](style.css), so change those before editing individual rules.

### Footer text and slide numbers

The footer (the deck title on the left, "7 of 27" on the right) is added by [import.js](import.js). There is one footer for the whole deck, so it stays in place while slides move; when the number or text changes, the old and new cross-fade, and it fades out on slides without a footer. (In Chrome's print view each slide gets its own copy.)

- Deck-wide text: `data-footer` on `<div class="reveal">` in [index.html](index.html).
- One slide: `<section data-footer="Something else">`.
- No footer: `<section class="no-footer">`.
- Slide numbers count every slide, including those in vertical stacks.

### Colours

Edit the `--color-*` tokens: the light theme's are in `:root`, the dark theme's in `:root[data-theme="dark"]` just below. For example, to tint the primary buttons and the dark surfaces navy in the light theme:

```css
--color-primary:      #1e3a8a;
--color-surface-dark: #172554;
```

Pills, the dark card and the strip pick up the change. Make the matching change in the dark block if you use both themes (e.g. `--color-primary: #93c5fd` for a light blue pill on the dark background).

**Accent:** `--color-accent` (blue) colours links, the hover glow on cards, the agenda and section numbers, list bullets and numbers, ✓ marks, the quote bar, the marked table row, the key numbers, the timeline dots and the progress bar. Headings, body text, buttons and the background stay neutral. Change the one token (both theme blocks) to recolour all of them; keep it at 4.5:1 or more against the canvas, since links and numbers are text. **Charts** use `--chart-1` and `--chart-2` (see [Charts](#charts)).

### Animated backdrop

Behind every slide sits slow, faint abstract art: soft glows, rings turning in the top-right corner, a ribbon of flowing lines along the bottom and a few rising specks. [backdrop.js](backdrop.js) draws it and the "Backdrop" block in [style.css](style.css) animates it. It is one layer under the slides, so it keeps moving smoothly from slide to slide.

- **Turn it off:** delete `data-backdrop` from `<div class="reveal">` in [index.html](index.html).
- **Make it fainter or stronger:** change the alphas in the `--backdrop-*` tokens. Each theme has its own set, in `:root` and in `:root[data-theme="dark"]`.
- **Text stays clear:** the art fades out towards the upper left, where titles and text sit (the `mask-image` on `.backdrop`). Cards, code windows, pills and chips are opaque, so the art never shows through them.
- **Speed:** change the durations in the backdrop CSS (`50s` for the glows, `180s` and `240s` for the rings, `90s` for the lines). Longer is calmer.
- **Your own shapes:** `rings()`, `waves()` and `specks()` in [backdrop.js](backdrop.js) draw the art; style.css places it. Animate only `transform` and `opacity`, which the browser can run smoothly.
- **PDF and reduced motion:** the PDF shows the rings and lines standing still. The specks are left out, and so are the glows, because a PDF prints such faint fades as hard-edged discs. Viewers whose system asks for less motion see the art standing still too.

### Custom cursor

Over the deck, the mouse pointer becomes an iPad-style pointer: a small dot in the text colour, with a thin outline in the background colour so it stays visible on any surface. It doesn't jump straight to the mouse; each frame it covers part of the remaining distance, which smooths out small jitters while staying close enough to click precisely.

Over a button, link, snippet or one of the slide arrows, the dot snaps to it and morphs into a soft tint in that element's shape, 6px larger all round. The tint leans a few pixels towards the mouse and the element drifts after it, like the "magnetic" feel on an iPad. Moving off turns it back into the dot. It shrinks a little while you click and fades out after 5 idle seconds (as reveal.js does with the normal pointer). Links that wrap onto two lines, and the slides in overview mode, don't snap; the dot just grows over them.

- **Turn it off:** delete `data-cursor` from `<div class="reveal">` in [index.html](index.html).
- **Feel:** the constants at the top of [cursor.js](cursor.js). `EASE` is the glide of the dot and `SNAP_EASE` the speed of the morph (lower is smoother; `1` is instant). `PAD` is the room around a snapped element; `PARALLAX`/`MAX_LEAN` and `LIFT`/`MAX_LIFT` set how far the tint leans and the element drifts. Set both lean and drift to `0` for a highlight that stays put.
- **Which elements snap:** the `SNAP` selector in [cursor.js](cursor.js).
- **Look:** `.cursor` and `.cursor.is-snapped` in the "Custom cursor" block of [style.css](style.css): the dot's size and colours, and the tint's strength (`10%`).
- **Where it is off:** on touch screens, and in the PDF. People whose system asks for less motion get the dot and the snap without the glide, lean or drift.

### Fonts

```css
--font-display: "SF Pro Rounded", ui-rounded, "Nunito", system-ui, sans-serif;  /* headings */
--font-body:    ui-sans-serif, system-ui, …;                                     /* text */
--font-mono:    ui-monospace, SFMono-Regular, Menlo, …;                          /* code */
```

Headings use SF Pro Rounded where the OS provides it (Safari on macOS) and the bundled **Nunito** everywhere else, including the PDF. To use a different web font offline, install it from [Fontsource](https://fontsource.org) (`npm install @fontsource/inter`), import its weights at the top of [import.js](import.js) (`import '@fontsource/inter/400.css';`) and put its name first in the token.

### Text size

`--type-scale` (default `1.75`) multiplies every font size from DESIGN.md. Try `1.5` for denser slides or `2` for a large room. To change one level only, edit its `--fs-*` token (`--fs-code-block` is the code size in code windows).

### Slide size, margins and spacing

- **Canvas size:** `width` / `height` in the `new Reveal({...})` call in [import.js](import.js) (default 1280×720, 16:9). For 4:3, use 1024×768. If you change it, also change the default `--size` in [scripts/export-pdf.js](scripts/export-pdf.js) so the PDF pages match.
- **Padding inside slides:** `--slide-pad-top`, `--slide-pad-x`, `--slide-pad-bottom` (the bottom one leaves room for the footer).
- **Gap between blocks on a slide:** `--slide-gap`.
- **Corner rounding:** `--radius-*`.

### Logo

Replace `public/images/logo.svg` and `logo-dark.svg` (or point the `src` and `data-dark-src` of the `<img class="logo">` tags on the title and closing slides at other files). If your logo works on both backgrounds, delete `data-dark-src`. Its size is set by `.logo` in [style.css](style.css). Delete the `<img>` if you don't want a logo.

### Transitions and other reveal.js options

Slides move in the direction you travel: → pushes the next slide in from the right, ← brings the previous one back from the left, and ↓ / ↑ move through a vertical stack from below and above. This is reveal.js's `slide` transition, lasting 0.6 s with a sharp ease-out, so slides move quickly and settle softly. The whole slide moves as one piece. The footer and the animated backdrop stay still while the slides move.

- **Faster or slower:** change `--slide-duration` (Motion tokens at the top of [style.css](style.css)); try `0.4s` for snappier or `0.8s` for calmer. For a cross-fade instead, set `transition: 'fade'` in [import.js](import.js).

All options are in the `new Reveal({...})` call in [import.js](import.js): `transition` (`none`, `fade`, `slide`, `convex`, `concave`, `zoom`), `transitionSpeed`, `controls`, `controlsLayout`, `progress`, `hash`, `autoSlide`, `loop` and [many more](https://revealjs.com/config/). A single slide can override the transition with `<section data-transition="zoom">`.

### Syntax highlighting colours

Code is coloured with GitHub's light and dark code palettes, one for each theme. The colours are the `--syntax-*` tokens in [style.css](style.css): keyword, function, constant, string, builtin, tag and comment. The "Syntax colours" block maps highlight.js classes (`.hljs-keyword`, `.hljs-string`, …) onto them, so changing one token recolours that kind of code in every block. Shell sessions (`<pre class="shell">`) use the same tokens for the prompt and comments.

To use a ready-made highlight.js theme instead, delete the "Syntax colours" block and import the theme in [import.js](import.js), for example `import 'reveal.js/plugin/highlight/monokai.css';`. Then set `.reveal pre code { background: … }` to match.

### Agenda

The agenda is the `ol.rows--numbered` list on the second slide; add or remove `<li>` rows freely. Section dividers are the `divider` slides with a `.divider-num`.

## Troubleshooting

- **`npm run pdf` says Chrome could not be found.** decktape drives Chrome through Puppeteer. Newer npm versions may skip Puppeteer's browser download (`npm warn install-scripts … puppeteer`). Install it once with `npx puppeteer browsers install chrome`, or use your installed Chrome: `npm run pdf -- --chrome-path "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.
- **The dark theme doesn't appear.** Check the first lines of the output for `Theme: dark`, and use `npm run dev:dark` rather than `npm run dev --dark`, which newer npm versions may ignore. `npm run preview` shows whichever theme you built last, so run `npm run build:dark` first.
- **Maths shows up as raw `\( … \)`.** Check the browser console for a KaTeX error; unsupported commands are shown in red. See the [supported functions list](https://katex.org/docs/supported.html).
- **A chart is blank.** The `data-chart` name must match a key in `CHARTS`, and the canvas needs a parent with a height (`.chart`).
- **Content runs off the bottom of a slide.** Slides don't scroll. Split the slide, use `.small`, or lower `--type-scale`.
- **The deck stutters on a slow computer.** Lower `SPECKS` in [backdrop.js](backdrop.js), or turn the backdrop off by deleting `data-backdrop`.
- **Headings look different in Safari and Chrome.** Safari uses the system SF Pro Rounded; other browsers use Nunito. The PDF is made with Chrome, so it uses Nunito.
