---
version: alpha
name: minimal-mono
description: |
  A deliberately minimal, documentation-first system: a paper-white canvas, rounded display headings over a system sans body, one black pill for the primary action, monospace snippets as first-class components, and a single inverted dark surface as the only attention device. No gradients, no shadows, no photography-led layouts. The palette is pure black, pure white and a short ladder of neutral grays; every interactive element is a fully rounded pill (`{rounded.full}`) and every card is a flat 12px-radius rectangle with a hairline border.

colors:
  primary: "#191919"
  on-primary: "#ffffff"
  ink: "#000000"
  ink-deep: "#090909"
  charcoal: "#525252"
  body: "#737373"
  mute: "#a3a3a3"
  canvas: "#ffffff"
  surface-soft: "#fafafa"
  surface-card: "#ffffff"
  hairline: "#e5e5e5"
  hairline-strong: "#d4d4d4"
  on-dark: "#ffffff"
  on-dark-mute: "rgba(255,255,255,0.7)"
  surface-dark: "#171717"
  focus-ring: "rgba(59,130,246,0.5)"
  link: "#000000"
  link-mute: "#737373"
  terminal-red: "#ff5f56"
  terminal-yellow: "#ffbd2e"
  terminal-green: "#27c93f"

typography:
  display-xl:
    fontFamily: SF Pro Rounded
    fontSize: 36px
    fontWeight: 500
    lineHeight: 1.11
    letterSpacing: 0
  display-lg:
    fontFamily: SF Pro Rounded
    fontSize: 30px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0
  heading-lg:
    fontFamily: SF Pro Rounded
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: 0
  heading-md:
    fontFamily: ui-sans-serif
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  heading-sm:
    fontFamily: ui-sans-serif
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.56
    letterSpacing: 0
  body-md:
    fontFamily: ui-sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-strong:
    fontFamily: ui-sans-serif
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: ui-sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  body-sm-strong:
    fontFamily: ui-sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: 0
  caption-sm:
    fontFamily: ui-sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: 0
  code-md:
    fontFamily: ui-monospace
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  code-sm:
    fontFamily: ui-monospace
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  button-md:
    fontFamily: ui-sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0

rounded:
  none: 0px
  sm: 6px
  md: 8px
  lg: 12px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  section: 88px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 8px 20px
    height: 36px
  button-primary-active:
    backgroundColor: "{colors.ink-deep}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 8px 20px
    height: 36px
  button-pill-on-dark:
    backgroundColor: "{colors.on-dark}"
    textColor: "{colors.surface-dark}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 8px 20px
  button-disabled:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.mute}"
    rounded: "{rounded.full}"
  search-pill:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 8px 16px
    height: 36px
  search-pill-focused:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 8px 16px
    height: 40px
  text-input-focused:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
  install-snippet:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.code-md}"
    rounded: "{rounded.full}"
    padding: 12px 20px
    height: 48px
  command-tag:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.code-sm}"
    rounded: "{rounded.full}"
    padding: 6px 12px
  terminal-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.code-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  terminal-traffic-lights:
    rounded: "{rounded.full}"
    size: 12px
  pricing-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  pricing-card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  feature-bullet:
    textColor: "{colors.charcoal}"
    typography: "{typography.body-sm}"
  faq-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 16px 0px
  link-inline:
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
  link-mute:
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
  primary-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.none}"
    height: 56px
  footer-section:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.caption-sm}"
    rounded: "{rounded.none}"
    padding: 32px 24px
  cta-strip-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.heading-lg}"
    rounded: "{rounded.lg}"
    padding: 24px 32px
---

## Overview

Minimal Mono is an almost defiantly under-designed system, and that is the point. A page (or a slide) reads like a carefully rendered Markdown README: a center-aligned rounded heading, a short line of gray body copy, an inline monospace snippet inside a soft-gray pill, and at most one black pill for the primary action. Everything sits on the same paper-white canvas (`{colors.canvas}`), with quiet `{colors.body}` neutrals carrying the prose. The system is the documentation, and the documentation is the system.

The design philosophy is geometric. Every interactive element collapses to `{rounded.full}` (9999px): buttons, snippet pills, inputs and the terminal traffic-light dots. There are no decorative drop shadows, no gradients and no hero illustrations beyond a single optional line-drawn logo mark. Cards use a soft `{rounded.lg}` (12px) and a 1px hairline. The one inverted moment is the dark surface (`{colors.surface-dark}` with white text). It is used once per page as the only attention-grabbing surface in an otherwise flat layout.

Typography pairs a rounded display face (SF Pro Rounded, weights 500–600) with the operating system's default sans (`ui-sans-serif`) for body and `ui-monospace` for code. The roundness of the heading face is the only "personality" the chrome carries. It echoes the `{rounded.full}` pill geometry without being decorative about it.

**Key characteristics:**
- Paper-white `{colors.canvas}` end-to-end with no surface alternation: one continuous sheet
- Center-aligned title with `{typography.display-xl}`, no eyebrow, at most one short subtitle
- Pill geometry everywhere: every button and pill input is `{rounded.full}`; cards use `{rounded.lg}`; nothing is sharp-cornered except dividers
- Single-color action system: near-black `{colors.primary}` pills carry every primary action
- Inline command snippet rendered as a pill in `{typography.code-md}`, the signature element
- Terminal card with traffic-light dots as the only "product preview" device
- One inverted dark surface per page, breaking the flat-white rhythm exactly once

## Colors

### Brand & Accent
- **Near Black** (`{colors.primary}`, `#191919`): every primary action, every black pill, every solid icon. It is a shade softer than the pure-black `{colors.ink}` of the headlines. There is no other accent color.
- **Ink Deep** (`{colors.ink-deep}`, `#090909`): pressed state for the primary pill, a notch darker than `{colors.primary}`.

### Surface
- **Canvas** (`{colors.canvas}`, `#ffffff`): the page itself. Nearly every surface in the system.
- **Soft Surface** (`{colors.surface-soft}`, `#fafafa`): snippet pill background, command tags, inline code chips, the rare alternating row fill.
- **Surface Dark** (`{colors.surface-dark}`, `#171717`): the inverted card and the dark CTA strip. The single inverted surface in the system.
- **Hairline** (`{colors.hairline}`, `#e5e5e5`): 1px card borders, row dividers, the line above the footer.
- **Hairline Strong** (`{colors.hairline-strong}`, `#d4d4d4`): the slightly stronger divider for extra separation (table headers, secondary pill outline).

### Text
- **Ink** (`{colors.ink}`, `#000000`): headlines, emphasis, button text on light surfaces, large figures.
- **Charcoal** (`{colors.charcoal}`, `#525252`): list-item text and secondary copy.
- **Body** (`{colors.body}`, `#737373`): default paragraph color, answers, footer text. The most-used text color after black.
- **Mute** (`{colors.mute}`, `#a3a3a3`): captions, code comments, list markers, lowest-emphasis utility text.
- **On Dark** (`{colors.on-dark}`, `#ffffff`): primary text on `{colors.surface-dark}`.
- **On Dark Mute** (`{colors.on-dark-mute}`, `rgba(255,255,255,0.7)`): secondary text on the dark surface.

### Semantic
The system has effectively no error/success/warning palette: no validation banners, no destructive states. The only "semantic" colors are the terminal traffic lights inside the terminal card:

- **Terminal Red** (`{colors.terminal-red}`, `#ff5f56`)
- **Terminal Yellow** (`{colors.terminal-yellow}`, `#ffbd2e`)
- **Terminal Green** (`{colors.terminal-green}`, `#27c93f`)

These appear only inside `{component.terminal-card}` and have no other use.

### Focus
- **Focus Ring** (`{colors.focus-ring}`, `rgba(59,130,246,0.5)`): translucent blue ring around focused interactive elements. The only blue in the system.

## Typography

### Font Family
- **SF Pro Rounded** (display headings): a rounded geometric sans, used at weights 500 and 600 from `{typography.display-xl}` (36px) down to `{typography.heading-lg}` (24px). Falls back to `system-ui`.
- **ui-sans-serif** (body, links, buttons, captions): the operating system's default sans-serif for every non-display role at 12–20px.
- **ui-monospace** (code, snippets, command tags): the OS default monospace. Falls back to SFMono-Regular → Menlo → Monaco → Consolas.

The pairing is intentionally "stock system": the design decision is to not have a typography decision. A branded body face would compete with the documentation feel.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 36px | 500 | 1.11 | 0 | Page or title-slide headline |
| `{typography.display-lg}` | 30px | 500 | 1.2 | 0 | Major section headlines, slide titles |
| `{typography.heading-lg}` | 24px | 600 | 1.33 | 0 | Subheading inside a section |
| `{typography.heading-md}` | 20px | 500 | 1.4 | 0 | Card title |
| `{typography.heading-sm}` | 18px | 500 | 1.56 | 0 | Question label, in-card subtitle |
| `{typography.body-md}` | 16px | 400 | 1.5 | 0 | Default body, answers, paragraphs |
| `{typography.body-strong}` | 16px | 500 | 1.5 | 0 | Inline emphasis |
| `{typography.body-sm}` | 14px | 400 | 1.43 | 0 | Feature bullets, footer links |
| `{typography.body-sm-strong}` | 14px | 500 | 1.43 | 0 | Small labels |
| `{typography.caption-sm}` | 12px | 400 | 1.33 | 0 | Copyright row, smallest meta text |
| `{typography.code-md}` | 16px | 400 | 1.5 | 0 | Snippet pill, in-terminal command |
| `{typography.code-sm}` | 14px | 400 | 1.43 | 0 | Terminal output, inline code chips |
| `{typography.button-md}` | 14px | 500 | 1 | 0 | Every button label |

### Principles
The typography is built for legibility on a flat-white canvas. The rounded heading face does almost all of the expression; everything below 20px collapses into the system sans. There is almost no letter-spacing variation, no display-only weights and very little italic. The heading-to-body ratio compresses tightly (36 → 30 → 24 → 20 → 16), so a page reads as a single readable column rather than a marketing pyramid.

### Font Substitutes
SF Pro Rounded ships only on Apple platforms. Elsewhere it falls back to `system-ui`. The closest open-source substitute is **Nunito** (weights 500/600). For the body, **Inter** closely matches `system-ui` metrics. For code, **JetBrains Mono** or **Fira Code** stand in for `ui-monospace`.

## Layout

### Spacing System
- **Base unit:** 8px, with finer 2/4px steps for tight inline gaps.
- **Tokens:** `{spacing.xxs}` (2px), `{spacing.xs}` (4px), `{spacing.sm}` (8px), `{spacing.md}` (12px), `{spacing.lg}` (16px), `{spacing.xl}` (24px), `{spacing.xxl}` (32px) and `{spacing.section}` (88px)
- **Section rhythm:** `{spacing.section}` (88px) separates major content blocks. It is the largest spacing token and is used liberally.
- **Card padding:** `{spacing.xxl}` (32px) all around; rows use `{spacing.lg}` (16px) vertical with no horizontal padding.

### Grid & Container
- **Reading column:** ~720px for long-form content, with optional two-column splits inside specific sections.
- **Card grid:** 3-up at desktop within ~960px; collapses to 1-up on narrow screens.
- **Text + terminal split:** 50/50 at desktop; stacked on narrow screens with the terminal below the text.

### Whitespace Philosophy
Whitespace is the layout. Sections are separated by plain white air, never by decorative dividers or colored bands. Content sits in a tight column without callout boxes or lifted cards. Treat the page as a Markdown document: the air between sections is the blank line in the source.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | No border, no shadow | The dominant treatment: titles, prose, footers |
| 1 — Hairline border | 1px solid `{colors.hairline}` | Cards, row dividers, terminal card |
| 2 — Inverted dark | `{colors.surface-dark}` fill | The one emphasized card, the CTA strip |

There is no drop-shadow elevation at all. Nothing lifts, floats or layers. The only depth cue beyond hairlines is the single dark surface.

### Decorative Depth
Two devices at most:
- **A line-drawn logo mark**: stroke-only in `{colors.ink}`, shown on the title and closing views. It is the only illustration.
- **Single-stroke icons**: no fill, drawn in `{colors.ink}`, used sparingly.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Navigation, footer, row dividers |
| `{rounded.sm}` | 6px | Inline code chips |
| `{rounded.md}` | 8px | Rare medium-radius surfaces (dropdowns, tooltips) |
| `{rounded.lg}` | 12px | Cards, terminal card, figures |
| `{rounded.full}` | 9999px | Every button, pill, snippet, tag and traffic-light dot |

The vocabulary is essentially two values: pills for everything interactive and 12px for cards.

### Imagery
There is no photography-led layout. Images, when used, sit inside a hairline-bordered `{rounded.lg}` frame with a caption in `{typography.caption-sm}`.

## Components

> Hover states are not specified. Each spec covers Default and Active/Pressed only.

### Buttons

**`button-primary`**: the universal action.
- Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.button-md}`, padding `8px 20px`, height `36px`, rounded `{rounded.full}`.
- Pressed state is `button-primary-active`: background drops to `{colors.ink-deep}`.

**`button-secondary`**: outline alternative on the light canvas.
- Background `{colors.canvas}`, text `{colors.ink}`, 1px solid `{colors.hairline-strong}`, otherwise identical to primary.

**`button-pill-on-dark`**: white pill on a dark surface.
- Background `{colors.on-dark}`, text `{colors.surface-dark}` (the dark surface shows through as the label, so it stays white in both themes). Inside the dark card or strip, the inversion makes the dark surface the anchor and the white pill the action.

**`button-disabled`**
- Background `{colors.surface-soft}`, text `{colors.mute}`, rounded `{rounded.full}`.

### Inputs & Snippets

**`search-pill`** / **`text-input`**
- Pill-shaped inputs on `{colors.surface-soft}` or `{colors.canvas}` with a 1px hairline. On focus the background becomes `{colors.canvas}` and `{colors.focus-ring}` appears.

**`install-snippet`**: the signature monospace pill.
- Background `{colors.surface-soft}`, text `{colors.ink}` in `{typography.code-md}`, padding `12px 20px`, height `48px`, rounded `{rounded.full}`. A muted `$` prompt sits at the left; a small copy affordance may sit at the right.

**`command-tag`**: small inline command chip.
- Background `{colors.surface-soft}`, text `{colors.ink}` in `{typography.code-sm}`, padding `6px 12px`, rounded `{rounded.full}`.

### Cards & Containers

**`terminal-card`**
- Background `{colors.canvas}`, 1px solid `{colors.hairline}`, padding `{spacing.lg}`, rounded `{rounded.lg}`.
- Header: three `{component.terminal-traffic-lights}` dots at the top-left.
- Body: code in `{typography.code-sm}`, comments in `{colors.mute}`, commands in `{colors.ink}`.

**`terminal-traffic-lights`**
- Three 12px filled circles at `{rounded.full}` in red, yellow and green, `{spacing.xs}`–`{spacing.sm}` apart.

**`pricing-card`** (any comparison or option card)
- Background `{colors.canvas}`, 1px solid `{colors.hairline}`, padding `{spacing.xxl}`, rounded `{rounded.lg}`.
- Layout: title in `{typography.heading-md}`, one-line description, a large figure in `{typography.display-lg}`, a divider, then a list of `{component.feature-bullet}` rows.

**`pricing-card-dark`**: the recommended option (inverted).
- Same layout on `{colors.surface-dark}`, with `{colors.on-dark}` text, `{colors.on-dark-mute}` secondary text and `{component.button-pill-on-dark}`. The inversion is the single "look here" cue.

**`feature-bullet`**
- A `✓` in `{colors.ink}` followed by `{typography.body-sm}` text in `{colors.charcoal}`. No background, no border; rows stack with `{spacing.sm}` between them.

**`faq-row`**
- Background `{colors.canvas}`, padding `16px 0`, 1px bottom border `{colors.hairline}`.
- Question in `{typography.heading-sm}` `{colors.ink}`; answer in `{typography.body-md}` `{colors.body}` directly below. Always expanded.

**`cta-strip-dark`**
- Background `{colors.surface-dark}`, text `{colors.on-dark}` in `{typography.heading-lg}`, padding `24px 32px`, rounded `{rounded.lg}`. Used sparingly.

### Inline

**`link-inline`**: `{colors.ink}` with an underline.

**`link-mute`**: `{colors.body}` with an underline, for secondary references and the footer.

### Navigation & Footer

**`primary-nav`**: canvas background, `{typography.body-sm-strong}` links in `{colors.ink}`, 56px tall, one black pill at the right.

**`footer-section`**: canvas background, 1px top border `{colors.hairline}`, `{typography.caption-sm}` in `{colors.body}`, a single row of small links with the copyright at the right.

## Do's and Don'ts

### Do
- Treat every page like a Markdown document: one reading column, generous `{spacing.section}` air, no decorative dividers.
- Use `{component.button-primary}` (black pill) for every primary action. No brand-tinted actions.
- Default to `{rounded.full}` for anything interactive; cards get `{rounded.lg}`.
- Use `{typography.display-xl}` for the top headline only and `{typography.body-md}` for nearly everything else.
- Reserve the inverted dark surface for exactly one "look here" moment per page.
- Render commands and code inside `{component.install-snippet}` or `{component.terminal-card}`. Code is a first-class component.

### Don't
- Don't introduce gradients, drop shadows or atmospheric backgrounds. The canvas is pure `{colors.canvas}`.
- Don't add accent colors. The system is black on white with gray text. (The slides allow one blue accent, chart colours and code colours; see Colour below.)
- Don't soften pills or sharpen cards. Pills stay `{rounded.full}`; cards stay `{rounded.lg}`.
- Don't lift cards with shadows. Use a hairline border or invert to `{colors.surface-dark}`.
- Don't replace the system body face with a branded one.
- Don't wrap long-form answers in decorative containers.

## Responsive Behavior

| Name | Width | Key Changes |
|---|---|---|
| desktop-large | 1280px+ | 720px reading column, 3-up card grid |
| desktop | 1024px | Same layout |
| tablet | 850px | Card grid becomes 2-up + 1 |
| tablet-narrow | 768px | Card grid becomes 1-up; navigation collapses to a drawer |
| mobile | 640px | Headline drops to ~28px; snippet wraps; section spacing tightens |

- **Section spacing:** 88px desktop → 64px tablet → 48px mobile.
- **Touch targets:** pills sit at 36–40px tall with wide horizontal padding.
- **Snippet pill:** wraps to a second line instead of truncating.

## Using This System in the Slides

The presentation template implements these tokens in `style.css`. The 1280×720 slide canvas is viewed from a distance, so every type size is multiplied by `--type-scale` (default `1.75`). Spacing and radii are used as specified.

| Token family | CSS variables | Notes |
|---|---|---|
| `colors.*` | `--color-*` (e.g. `--color-surface-dark`) | Charts read these at runtime |
| `typography.*` | `--fs-*`, `--font-display`, `--font-body`, `--font-mono` | Nunito is bundled as the rounded fallback |
| `rounded.*` | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full` | |
| `spacing.*` | `--space-xxs` … `--space-section` | Slide padding uses `--space-section` horizontally |

| Component | Slide class |
|---|---|
| `button-primary` / `-secondary` / `-pill-on-dark` / `-disabled` | `.pill`, `.pill--secondary`, `.pill--on-dark`, `.pill--disabled` |
| `install-snippet` | `.snippet` |
| `command-tag` | `.tag` |
| `terminal-card` + traffic lights | `.terminal` with a `.terminal-bar` |
| `pricing-card` / `pricing-card-dark` | `.card`, `.card--dark` |
| `feature-bullet` | `ul.checks` |
| `faq-row` | `ul.rows` (`ol.rows--numbered` for the agenda) |
| `cta-strip-dark` | `.strip` |
| Section divider | `<section class="divider">` |
| `footer-section` | `.slide-footer` (added automatically) |

Every slide sits on `{colors.canvas}`, section dividers included, so a deck never alternates light and dark pages. Dividers stand out by size alone: a centred, larger title under the section number. The "one inverted surface per page" rule becomes one inverted element per slide, either a dark card or a dark strip, never both.

### Dark Theme

The slides also ship a dark theme (`npm run dev:dark`). It keeps every token name and changes only the colour values, in the `:root[data-theme="dark"]` block of `style.css`. The canvas is `{colors.primary}` (`#191919`), the same near-black as the light theme's primary pill, and the neutral scale is mirrored end for end:

| Token | Light | Dark | Dark-theme role |
|---|---|---|---|
| `canvas` | `#ffffff` | `#191919` | The page: `{colors.primary}`, near-black |
| `surface-soft` | `#fafafa` | `#222222` | Snippets, tags, inline code, one step above the canvas |
| `hairline` / `hairline-strong` | `#e5e5e5` / `#d4d4d4` | `#2e2e2e` / `#404040` | Borders and dividers |
| `ink` | `#000000` | `#fafafa` | Headlines, emphasis (16.8:1 on the canvas) |
| `charcoal` | `#525252` | `#d4d4d4` | List text (11.9:1) |
| `body` | `#737373` | `#a3a3a3` | Paragraphs (7:1) |
| `mute` | `#a3a3a3` | `#737373` | Markers, small labels, line numbers (3.7:1) |
| `primary` / `on-primary` | `#191919` / `#ffffff` | `#fafafa` / `#191919` | The primary pill turns white, with canvas-coloured text |
| `ink-deep` | `#090909` | `#e5e5e5` | Pressed primary pill |
| `surface-dark` | `#171717` | `#2e2e2e` | Lifted above the canvas, not inverted |

`on-dark`, `on-dark-mute`, `hairline-dark`, `focus-ring` and the terminal colours are the same in both themes.

The one deliberate asymmetry is `surface-dark`. In the dark theme it stays dark and is lifted one step above the canvas instead of turning white, so the dark card and the strip never put a bright block on a dark slide. The "one inverted element per slide" rule still holds: the lifted surface is the emphasis, and the white primary pill is the single bright action. Charts take their series colours from `--chart-1` and `--chart-2`, which have their own steps for each theme.

### Backdrop

The slides allow one thing the web system rules out: a faint, slowly moving backdrop of abstract line art behind every slide (`backdrop.js`). It is a deliberate exception and keeps to the system's spirit:

- **Monochrome:** strokes and glows are `ink` at a few percent opacity (`--backdrop-*` tokens), so it follows the theme and adds no colour.
- **Hairlines only:** 1px rings and lines echo the hairline borders. Nothing is filled except the soft glows and the specks.
- **Behind the words:** a mask fades it out in the upper left, where titles and text sit, and opaque cards, code windows and pills hide it entirely.
- **Slow:** loops last 30 seconds to 4 minutes, so nothing pulls the eye from the speaker.
- **Optional:** one attribute (`data-backdrop`) turns it off. The canvas under it stays `{colors.canvas}` on every slide.

### Cursor

Over the deck, the pointer is one small `{rounded.full}` dot in `{colors.ink}` with a 2px `{colors.canvas}` outline, so it reads on every surface, including the black pill and the dark card. It glides lightly rather than tracking every movement. Over a pill, link, snippet or arrow it snaps to the element and becomes a soft `{colors.ink}` tint at 10% in the element's own shape, 6px larger all round, in the manner of the iPad pointer. The tint leans at most 6px towards the mouse and the element drifts at most 3px, so nothing moves far. State changes take under 200ms. `data-cursor` turns it off.

### Colour

The slides relax "black on white with gray text" in three deliberate, contained places. Headings, body text, buttons, surfaces and the backdrop stay neutral.

- **Accent** (`--color-accent`): one blue, `#256abf` on light (5.4:1) and `#6da7ec` on dark (7:1), for small signals: links, the hover and selected states of cards (a 6px lift, an accent border and a soft accent glow, the one place a glow appears; a selected card also takes a 7% accent tint), agenda and section numbers, list markers and ✓ marks, the quote bar, the marked table row, the key-number figures, the timeline dots and the progress bar. Never a fill behind text, never a second accent.
- **Charts** (`--chart-1`, `--chart-2`): blue then orange from a colour-blind-safe categorical palette, in separate steps for each theme. Both pass the separation, lightness and 3:1 contrast checks against their canvas. Further series take the next slots in order (aqua, yellow, …), never reordered.
- **Code** (`--syntax-*`): GitHub's light and dark code palettes, so code reads the way people know it from their editors. Each colour meets 4.5:1 on its theme's canvas. Nothing outside code blocks and shell sessions uses these colours.

## Iteration Guide

1. Change one component at a time and check that every property still resolves to a token.
2. Reference tokens by name (`{colors.primary}`, `{rounded.full}`); don't paraphrase values.
3. Add new variants as separate entries (`-active`, `-disabled`, `-focused`) rather than burying them in prose.
4. Default body text to `{typography.body-md}`; use `{typography.body-sm}` for utility text; keep `{typography.display-xl}` for the top headline.
5. Keep `{colors.primary}` scarce: at most one black pill per view.
6. Before adding a component, check whether the existing pill + flat-card + terminal vocabulary already covers it. The system rarely needs new tokens.
