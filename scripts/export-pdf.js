// Export the deck to PDF:  npm run pdf[:dark] [-- [file.pdf] [decktape flags]]
//
// `npm run pdf` builds the deck first, then this script serves dist/ with
// `vite preview`, points decktape at it with ?export and shuts the server
// down again. Examples:
//   npm run pdf                          → slides.pdf, one page per slide
//   npm run pdf:dark                     → slides-dark.pdf, dark theme
//   npm run pdf -- talk.pdf              → talk.pdf
//   npm run pdf -- --fragments           → one page per fragment step
//   npm run pdf -- --size 1920x1080      → any other decktape option
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);

// The default file name follows the theme that is built into dist/
const builtPage = await readFile(path.join(root, 'dist', 'index.html'), 'utf8');
const theme = builtPage.match(/data-theme="(\w+)"/)?.[1];
const defaultName = theme === 'dark' ? 'slides-dark.pdf' : 'slides.pdf';
const output = args.find((arg) => arg.endsWith('.pdf')) ?? defaultName;
const flags = args.filter((arg) => arg !== output);
const withFragments = flags.includes('--fragments');
const size = flags.includes('--size') ? [] : ['--size', '1280x720'];  // match the Reveal width/height in import.js

const server = await preview({ root, logLevel: 'warn', preview: { port: 4173, open: false } });
const url = new URL(withFragments ? '?export&fragments' : '?export', server.resolvedUrls.local[0]).href;

console.log(`Exporting ${url} → ${output}`);
const decktape = path.join(root, 'node_modules', '.bin', 'decktape');
const code = await new Promise((resolve) => {
  spawn(decktape, ['reveal', ...size, '--pause', '500', ...flags, url, output], { cwd: root, stdio: 'inherit' })
    .on('close', resolve)
    .on('error', (error) => { console.error(error.message); resolve(1); });
});

await server.close();
process.exit(code ?? 1);
