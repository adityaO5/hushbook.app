#!/usr/bin/env node
// Re-renders the list side of a book post's picks card and keeps the published phone side pixel for pixel.
// The phone-player.png each picks-card.html shows was a temporary render and is not kept, so the edited
// source is rendered without it and composited over the published card: the cut goes between the edge of
// the phone's shadow (measured against the published card) and the list. Fails on overflow or a font error.
//   node tools/blog/picks-card-repaint.mjs <picks-card.html> <published-card.webp> <out.webp>
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const require = createRequire(path.join(root, 'package.json'));
const { chromium } = require('playwright');
const sharp = require('sharp');

const [html, published, out] = process.argv.slice(2);
if (!out) {
  console.error('Usage: node tools/blog/picks-card-repaint.mjs <picks-card.html> <published-card.webp> <out.webp>');
  process.exit(1);
}
const fail = (message) => { throw new Error(message); };
process.on('uncaughtException', (e) => { console.error(`FAILED: ${e.message}`); process.exit(1); });

const SCALE = 2;      // the cards are 2x renders
const NOISE = 4;      // WebP noise on the dark background stays within 4 levels; more is the phone or its shadow
const GUARD = 12;     // WebP ringing around the published list text reaches a few px left of the list
const FEATHER = 12;   // widest blend between the published left side and the new render

const old = await sharp(published).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = old.info;

async function launch() {
  try { return await chromium.launch({ headless: true, channel: 'chrome', chromiumSandbox: true }); }
  catch { return chromium.launch({ headless: true, chromiumSandbox: true }); }
}
const browser = await launch();
let png, report;
const failed = [];
try {
  const page = await browser.newPage({ viewport: { width: W / SCALE, height: H / SCALE }, deviceScaleFactor: SCALE });
  page.on('pageerror', (e) => failed.push(`page error: ${e.message}`));
  page.on('requestfailed', (r) => { if (r.url().startsWith('file:')) failed.push(r.url()); });
  await page.route(/^https?:/, (r) => r.abort()); // the source's analytics tag never loads
  await page.goto(pathToFileURL(path.resolve(html)).href, { waitUntil: 'load' });
  const phoneSrc = await page.evaluate(() => document.querySelector('img.phone')?.src);
  if (!phoneSrc) fail('no img.phone in the source');
  const errors = failed.filter((e) => e !== phoneSrc);
  if (errors.length) fail(`failed to load:\n  ${errors.join('\n  ')}`);
  await page.addStyleTag({ content: 'img.phone { display: none !important; }' });

  const fonts = await page.evaluate(async () => {
    const faces = [...document.fonts];
    await Promise.allSettled(faces.map((f) => f.load()));
    await document.fonts.ready;
    return faces.map((f) => ({ name: `${f.family} ${f.weight}`, status: f.status }));
  });
  if (!fonts.length || fonts.some((f) => f.status !== 'loaded')) fail(`fonts: ${fonts.map((f) => `${f.name} ${f.status}`).join(', ') || 'none declared'}`);
  console.log(`fonts: ${fonts.map((f) => f.name).join(', ')} loaded`);

  report = await page.evaluate(() => {
    const sideEl = document.querySelector('.side');
    const side = sideEl.getBoundingClientRect();
    const bad = [];
    const walker = document.createTreeWalker(sideEl, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (!n.textContent.trim()) continue;
      const range = document.createRange(); range.selectNodeContents(n);
      for (const b of range.getClientRects()) {
        if (b.left < side.left - 0.5 || b.right > side.right + 0.5 || b.bottom > innerHeight + 0.5) {
          bad.push(`"${n.textContent.trim()}" spans x ${b.left.toFixed(1)} to ${b.right.toFixed(1)}, bottom ${b.bottom.toFixed(1)} (column ${side.left} to ${side.right}, page height ${innerHeight})`);
        }
      }
    }
    if (side.bottom > innerHeight + 0.5) bad.push(`.side ends at ${side.bottom.toFixed(1)}, page height ${innerHeight}`);
    for (const el of document.body.querySelectorAll('*')) {
      if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflow !== 'visible') bad.push(`${el.tagName.toLowerCase()}.${el.className} clips its content`);
    }
    for (const f of window.__fit || []) bad.push(`__fit: "${f.label}" needs ${f.need}px, room ${f.room}px`);
    const picks = [...sideEl.querySelectorAll('.pick')];
    return {
      bad,
      panel: side.left,
      rowsTop: picks.length ? picks[0].getBoundingClientRect().top : null,
      rows: picks.map((p) => [p.querySelector('.lab')?.textContent, ...[...p.querySelectorAll('.det')].map((d) => d.innerHTML)].join(' | ')),
    };
  });
  if (report.bad.length) fail(`text overflows the right column:\n  ${report.bad.join('\n  ')}`);
  if (report.rowsTop === null) fail('no .pick rows in .side');
  console.log('no overflow\nrows:\n  ' + report.rows.join('\n  '));
  png = await page.screenshot({ type: 'png' });
} finally {
  await browser.close();
}

const fresh = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
if (fresh.info.width !== W || fresh.info.height !== H) fail(`render is ${fresh.info.width}x${fresh.info.height}, published card ${W}x${H}`);
const a = old.data, b = fresh.data;
const diff = (x, y) => { const i = (y * W + x) * 3; return Math.max(Math.abs(a[i] - b[i]), Math.abs(a[i + 1] - b[i + 1]), Math.abs(a[i + 2] - b[i + 2])); };

// Rightmost column left of the list where the published card differs from the phone-less render by more
// than WebP noise: over the heading band (identical text in both) and over the full height (catches the side button).
const panel = Math.round(report.panel * SCALE);
const rowsTop = Math.round(report.rowsTop * SCALE);
const edge = (y0, y1) => {
  const minHits = Math.max(2, Math.ceil((y1 - y0) * 0.005));
  for (let x = panel - GUARD - 1; x >= 0; x--) {
    let hits = 0;
    for (let y = y0; y < y1; y++) if (diff(x, y) > NOISE) hits++;
    if (hits >= minHits) return x;
  }
  return -1;
};
const headEdge = edge(0, rowsTop);
const fullEdge = edge(0, H);
const lo = Math.max(headEdge, fullEdge) + 1;
const hi = panel - GUARD;
if (hi - lo < 1) fail(`no room for a cut: phone and shadow reach column ${lo - 1}, list starts at ${panel}`);
const width = Math.min(FEATHER, hi - lo);
const start = lo + Math.floor((hi - lo - width) / 2);

const outBuf = Buffer.from(b);
let seam = 0, seamN = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < start + width; x++) {
    const w = Math.min(1, Math.max(0, (x - start + 0.5) / width)); // share of the new render
    const i = (y * W + x) * 3;
    for (let c = 0; c < 3; c++) outBuf[i + c] = Math.round(a[i + c] * (1 - w) + b[i + c] * w);
    if (x >= start) { seam += Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]); seamN += 3; }
  }
}
await sharp(outBuf, { raw: { width: W, height: H, channels: 3 } }).webp({ quality: 88, effort: 6, smartSubsample: true }).toFile(out);

const oldBytes = statSync(published).size, newBytes = statSync(out).size;
console.log(`phone edge: column ${headEdge} over the heading band (rows 0 to ${rowsTop - 1}), ${fullEdge} over the full height; list starts at ${panel}`);
console.log(`cut: published card up to column ${start - 1}, blend ${start} to ${start + width - 1}, new render from ${start + width} (mean difference in the blend ${(seam / seamN).toFixed(2)} levels)`);
console.log(`${out}  ${W}x${H}  ${newBytes} bytes (published ${oldBytes}, x${(newBytes / oldBytes).toFixed(2)})`);
if (newBytes > oldBytes * 1.3) console.warn('WARNING: more than 1.3x the published size');
