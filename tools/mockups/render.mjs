#!/usr/bin/env node
/**
 * Renders the homepage phone mockups from the scenes in tools/mockups/scenes.
 *
 *   node tools/mockups/render.mjs                 every shot, English
 *   node tools/mockups/render.mjs --shot home,library
 *   node tools/mockups/render.mjs --locale de      one locale (strings/de.json over en.json)
 *   node tools/mockups/render.mjs --locale all     every published locale
 *   node tools/mockups/render.mjs --png            also keep PNGs in tools/mockups/out/
 *   --quality 82 is the default; a shot can carry its own "quality" (cover-heavy screens use 76)
 *   node tools/mockups/render.mjs --list           print the shot ids and exit
 *
 * Contract with a scene: docs/superpowers/specs/2026-11-03-homepage-mockups-design.md
 * (window.__timelines.main, window.__hbReady, img#frame, canvas colour only on html/body/#root).
 * Each scene folder carries its own shots.json and strings/<locale>.json.
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const require = createRequire(import.meta.url);
const localeConfig = require(path.join(root, 'localization.config.js'));

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const flag = (name) => args.includes(name);

// Shots live next to their scene: tools/mockups/scenes/<scene>/shots.json (an array).
const scenesDir = path.join(here, 'scenes');
const shots = fs.readdirSync(scenesDir)
  .filter((d) => fs.existsSync(path.join(scenesDir, d, 'shots.json')))
  .sort()
  .flatMap((d) => JSON.parse(fs.readFileSync(path.join(scenesDir, d, 'shots.json'), 'utf8'))
    .map((s) => ({ ...s, scene: s.scene || d })));
const dupes = shots.map((s) => s.id).filter((id, i, a) => a.indexOf(id) !== i);
if (dupes.length) {
  console.error('Duplicate shot id(s): ' + [...new Set(dupes)].join(', '));
  process.exit(1);
}
if (flag('--list')) {
  for (const s of shots) console.log(`${s.id.padEnd(24)} ${s.scene.padEnd(16)} t=${s.t}  -> ${s.out}.webp`);
  process.exit(0);
}

const wantShots = opt('--shot') ? opt('--shot').split(',').map((s) => s.trim()) : null;
const selected = wantShots ? shots.filter((s) => wantShots.includes(s.id)) : shots;
if (wantShots) {
  const missing = wantShots.filter((id) => !shots.some((s) => s.id === id));
  if (missing.length) {
    console.error('Unknown shot id(s): ' + missing.join(', '));
    process.exit(1);
  }
}

const localeArg = opt('--locale') || 'en';
const locales = localeArg === 'all'
  ? localeConfig.publishedLocales
  : localeArg.split(',').map((s) => s.trim());

const keepPng = flag('--png');
const quality = Number(opt('--quality') || 82);
const outDir = path.join(here, 'out');

// Phone shots are clipped to the frame's silhouette: the bezel's own alpha plus the rounded
// screen cutout (x 199..4111, y 168..8653, 400-unit corners on the 4317 x 8796 frame). The
// scenes draw the screen as a square 393 x 852 stage, and its corners would otherwise show
// past the phone's rounded outer corners.
const FRAME_PNG = path.join(here, 'assets', 'frame-iphone.png');
const FRAME = { w: 4317, h: 8796, screen: { x: 199, y: 168, w: 3912, h: 8485, r: 400 } };
const silhouettes = new Map();
function silhouette(w, h) {
  const key = `${w}x${h}`;
  if (!silhouettes.has(key)) {
    // sharp resizes before it composites whatever the call order, so the cutout is drawn at the target size.
    const s = FRAME.screen;
    const sx = w / FRAME.w;
    const sy = h / FRAME.h;
    const cutout = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
      `<rect x="${s.x * sx}" y="${s.y * sy}" width="${s.w * sx}" height="${s.h * sy}" rx="${s.r * sx}" ry="${s.r * sy}" fill="#000"/></svg>`,
    );
    silhouettes.set(key, sharp(FRAME_PNG)
      .resize(w, h, { fit: 'fill', kernel: 'lanczos3' })
      .composite([{ input: cutout, blend: 'over' }])
      .png()
      .toBuffer());
  }
  return silhouettes.get(key);
}
if (keepPng) fs.mkdirSync(outDir, { recursive: true });

// Strings live next to their scene: tools/mockups/scenes/<scene>/strings/<locale>.json.
// A locale file overrides en.json key by key; anything missing falls back to English.
function loadStrings(scene, locale) {
  const read = (lc) => {
    const p = path.join(scenesDir, scene, 'strings', lc + '.json');
    return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
  };
  return { ...read('en'), ...(locale === 'en' ? {} : read(locale)) };
}

function outPath(locale, out) {
  return locale === 'en'
    ? path.join(root, 'assets', 'img', 'mockups', out + '.webp')
    : path.join(root, 'assets', 'img', 'mockups', 'locales', locale, out + '.webp');
}

const CANVAS = { width: 3840, height: 2160 };

async function renderShot(browser, locale, strings, shot) {
  const sceneFile = path.join(here, 'scenes', shot.scene, 'index.html');
  if (!fs.existsSync(sceneFile)) throw new Error(`Scene not found: ${sceneFile}`);
  const width = shot.width || (shot.crop === 'phone' ? 960 : 880);

  // First pass at DSF 1 to measure the capture box, then capture at the DSF that gives `width`.
  const measure = await browser.newPage({ viewport: CANVAS, deviceScaleFactor: 1 });
  await prime(measure, locale, strings, shot);
  const box = await captureBox(measure, shot);
  await measure.close();
  if (flag('--verbose')) console.log(`  box ${JSON.stringify(box)}`);

  const dsf = Math.min(4, Math.max(0.25, width / box.width));
  const page = await browser.newPage({ viewport: CANVAS, deviceScaleFactor: dsf });
  await prime(page, locale, strings, shot);
  await page.evaluate(() => {
    for (const el of [document.documentElement, document.body, document.getElementById('root')]) {
      if (el) el.style.background = 'transparent';
    }
  });
  const png = await page.screenshot({
    type: 'png',
    omitBackground: true,
    clip: box,
    animations: 'disabled',
    caret: 'hide',
  });
  await page.close();

  const dest = outPath(locale, shot.out);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  let img = sharp(png);
  const meta = await img.metadata();
  if (meta.width !== width) img = img.resize({ width, kernel: 'lanczos3' });
  if (shot.crop === 'phone') {
    const scaled = await img.png().toBuffer();
    const size = await sharp(scaled).metadata();
    img = sharp(scaled).composite([{ input: await silhouette(size.width, size.height), blend: 'dest-in' }]);
  }
  await img.webp({ quality: shot.quality || quality, effort: 6, smartSubsample: true, alphaQuality: 90 }).toFile(dest);
  if (keepPng) await sharp(png).toFile(path.join(outDir, `${locale}-${shot.out}.png`));
  const size = fs.statSync(dest).size;
  const final = await sharp(dest).metadata();
  console.log(`${locale.padEnd(6)} ${shot.id.padEnd(24)} ${final.width}x${final.height}  ${(size / 1024).toFixed(0)} KB  ${path.relative(root, dest)}`);
}

async function prime(page, locale, strings, shot) {
  await page.addInitScript(({ strings, locale, vars }) => {
    window.__HB_STRINGS = strings;
    window.__HB_LOCALE = locale;
    window.__HB_VARS = vars;
    window.__timelines = window.__timelines || {};
  }, { strings, locale, vars: shot.vars || {} });
  page.on('pageerror', (e) => console.error(`[${shot.scene}] page error: ${e.message}`));
  await page.goto(pathToFileURL(path.join(here, 'scenes', shot.scene, 'index.html')).href, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__hbReady === true && !!(window.__timelines && window.__timelines.main), null, { timeout: 60000, polling: 100 });
  await page.evaluate((t) => {
    const tl = window.__timelines.main;
    tl.pause();
    tl.seek(t, false);
    if (typeof window.render === 'function') window.render(t);
  }, shot.t);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(80);
}

async function captureBox(page, shot) {
  const selector = shot.crop === 'phone' ? 'img#frame' : shot.crop;
  const box = await page.locator(selector).first().boundingBox();
  if (!box) throw new Error(`Capture target not found: ${selector} in ${shot.scene}`);
  // Snap to whole pixels so the alpha edge is not blurred by a half-pixel clip.
  const x = Math.floor(box.x), y = Math.floor(box.y);
  return { x, y, width: Math.ceil(box.x + box.width) - x, height: Math.ceil(box.y + box.height) - y };
}

// Owner's rule: sandbox on, Google Chrome preferred over the bundled Chromium.
async function launch() {
  try { return await chromium.launch({ chromiumSandbox: true, channel: 'chrome' }); }
  catch { return chromium.launch({ chromiumSandbox: true }); }
}
const browser = await launch();
let failed = 0;
try {
  for (const locale of locales) {
    for (const shot of selected) {
      try {
        await renderShot(browser, locale, loadStrings(shot.scene, locale), shot);
      } catch (e) {
        failed++;
        console.error(`FAILED ${locale} ${shot.id}: ${e.message}`);
      }
    }
  }
} finally {
  await browser.close();
}
if (failed) {
  console.error(`${failed} shot(s) failed`);
  process.exit(1);
}
