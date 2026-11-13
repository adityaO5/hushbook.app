#!/usr/bin/env node
// Builds the social upload kit from the book posts' picks cards.
//
//   node tools/social/kit.mjs            every entry in kit.data.mjs
//   node tools/social/kit.mjs jane-eyre  entries whose slug contains the word
//
// Writes Originals/social-kit/<n> <Book>/ (Originals/ is git-ignored and never deployed):
//   x-linkedin-facebook.png  the picks card as it is on the post, 1400x788
//   instagram.png            1080x1080, the card under a "Today's audiobook pick" heading
//   caption.txt              the caption, then a version that fits a post on X
import { createRequire } from 'node:module';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import entries from './kit.data.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const require = createRequire(path.join(root, 'package.json'));
const { chromium } = require('playwright');
const sharp = require('sharp');

const out = path.join(root, 'Originals', 'social-kit');
const only = process.argv[2];
const url = (p) => pathToFileURL(path.join(root, p)).href;
const xLength = (text) => [...text.replace(/https?:\/\/\S+/g, 'x'.repeat(23))].length;

const tooLong = entries.filter((e) => xLength(e.x) > 280);
if (tooLong.length) {
  for (const e of tooLong) console.error(`${e.slug}: X text is ${xLength(e.x)} characters, limit 280`);
  process.exit(1);
}

const wordmark = await readFile(path.join(root, 'assets/img/hb-wordmark.svg'), 'utf8');
const squareHtml = (cardDataUrl) => `<!doctype html><meta charset="utf-8"><style>
  @font-face { font-family: News; src: url('${url('tools/mockups/assets/fonts/Newsreader-Variable.ttf')}'); font-weight: 200 800; }
  @font-face { font-family: Inter; src: url('${url('tools/mockups/assets/fonts/Inter-Medium.ttf')}'); font-weight: 500; }
  * { box-sizing: border-box; margin: 0; }
  body { width: 1080px; height: 1080px; background: #0B0A09; color: #F6EFE4; display: flex; flex-direction: column;
         justify-content: space-between; padding: 64px 40px 56px;
         background-image: radial-gradient(900px 520px at 12% 0%, rgba(232,97,63,.20), transparent 70%); }
  header { display: flex; align-items: center; gap: 16px; padding: 0 16px; }
  header img { width: 52px; height: 52px; border-radius: 12px; }
  header svg { height: 30px; width: auto; }
  h1 { font: 500 76px/1.05 News, serif; letter-spacing: -.01em; padding: 0 16px; }
  .card { width: 1000px; height: 563px; border-radius: 24px; display: block; box-shadow: 0 24px 80px rgba(0,0,0,.6); outline: 1px solid rgba(246,239,228,.10); }
  footer { font: 500 30px/1.3 Inter, sans-serif; color: #CABFB0; padding: 0 16px; display: flex; justify-content: space-between; }
  footer b { color: #E8613F; font-weight: 500; }
</style>
<header><img src="${url('assets/img/default_preview.png')}" alt="">${wordmark}</header>
<h1>Today's audiobook pick</h1>
<img class="card" src="${cardDataUrl}" alt="">
<footer><span>Every edition compared</span><b>hushbook.app/blog</b></footer>`;

async function launch() {
  try { return await chromium.launch({ headless: true, channel: 'chrome', chromiumSandbox: true }); }
  catch { return chromium.launch({ headless: true, chromiumSandbox: true }); }
}

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
// The page is loaded from a file in the repo so the file:// fonts and images resolve.
const shell = path.join(out, '.square.html');
await mkdir(out, { recursive: true });

let n = 0;
for (const entry of entries) {
  n += 1;
  if (only && !entry.slug.includes(only)) continue;
  const dir = path.join(out, `${n} ${entry.folder}`);
  await mkdir(dir, { recursive: true });

  const card = await sharp(path.join(root, entry.card)).png().toBuffer();
  await writeFile(path.join(dir, 'x-linkedin-facebook.png'), card);

  await writeFile(shell, squareHtml(`data:image/png;base64,${card.toString('base64')}`));
  await page.goto(pathToFileURL(shell).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(dir, 'instagram.png') });

  const caption = `${entry.caption}\n\n\n----- X (${xLength(entry.x)} of 280) -----\n\n${entry.x}\n`;
  await writeFile(path.join(dir, 'caption.txt'), caption.replace(/\n/g, '\r\n'), 'utf8');
  console.log(`${n} ${entry.folder}: 2 images, caption (X ${xLength(entry.x)}/280)`);
}

await browser.close();
const { rm } = await import('node:fs/promises');
await rm(shell, { force: true });
console.log(out);
