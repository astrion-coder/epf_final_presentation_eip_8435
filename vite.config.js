import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const theme = resolveTheme(mode);
  return {
    // Relative asset paths, so the built dist/ folder works from any URL
    // (a sub-folder on GitHub Pages, a static file host, etc.)
    base: './',
    plugins: [deckTheme(theme)],
    build: {
      // reveal.js, highlight.js, KaTeX and Chart.js are bundled so the deck
      // runs offline; a ~1.6 MB script is expected for a presentation.
      chunkSizeWarningLimit: 2000,
      // Two decks: the talk (index.html) and the template's example slides
      // (examples.html, served at /examples.html)
      rollupOptions: {
        input: {
          main: 'index.html',
          examples: 'examples.html',
        },
      },
    },
  };
});

// The colour theme: light unless asked for dark. `npm run dev:dark` (and
// build:dark, pdf:dark) runs Vite with its own --mode dark option. Two
// older ways still work: `npm run dev --dark`, which npm passes on as
// npm_config_dark for as long as npm supports that, and THEME=dark.
function resolveTheme(mode, env = process.env) {
  if (mode === 'dark' || mode === 'light') return mode;
  if (env.npm_config_dark === 'true') return 'dark';
  if (env.npm_config_light === 'true') return 'light';
  return env.THEME?.toLowerCase() === 'dark' ? 'dark' : 'light';
}

// Writes <html data-theme="light|dark"> into index.html; style.css swaps
// its colour tokens on that attribute. In the dark theme it also swaps
// <img src="a.svg" data-dark-src="a-dark.svg"> to the dark image.
// A build bakes in one theme.
function deckTheme(theme) {
  return {
    name: 'deck-theme',
    configResolved(config) {
      if (!config.isPreview) config.logger.info(`  Theme: ${theme}`);
    },
    transformIndexHtml: {
      order: 'pre',   // before Vite rewrites asset paths, so the swapped src gets rewritten too
      handler(html) {
        html = html.replace(/<html\b/, `<html data-theme="${theme}"`);
        if (theme !== 'dark') return html;
        return html.replace(/<img\b[^>]*>/g, (tag) => {
          const darkSrc = tag.match(/\sdata-dark-src="([^"]*)"/)?.[1];
          return darkSrc ? tag.replace(/\ssrc="[^"]*"/, ` src="${darkSrc}"`) : tag;
        });
      },
    },
  };
}
