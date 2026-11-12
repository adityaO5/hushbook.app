#!/usr/bin/env node
// Makes the 1200x630 share card for a blog post from its hero picture (the book posts' picks card).
//
//   node tools/blog/og-card.mjs assets/img/blog/<name>-picks.webp [more.webp ...]
//
// Writes <name>-picks-og.webp beside each input. scripts/build-blog.js uses that file for
// og:image and twitter:image when the post's hero embed shows <name>-picks.webp.
// The picture is scaled to fit and the sides are filled from its own edge pixels, so nothing
// is cropped at 1.91:1 or 2:1.
import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;

const inputs = process.argv.slice(2);
if (!inputs.length) {
  console.error('Usage: node tools/blog/og-card.mjs <picture.webp> [...]');
  process.exit(1);
}

for (const input of inputs) {
  const output = input.replace(/\.webp$/i, '-og.webp');
  const fitted = await sharp(input)
    .resize({ width: WIDTH, height: HEIGHT, fit: 'inside' })
    .png()
    .toBuffer({ resolveWithObject: true });
  const padX = WIDTH - fitted.info.width;
  const padY = HEIGHT - fitted.info.height;
  await sharp(fitted.data)
    .extend({
      left: Math.floor(padX / 2),
      right: Math.ceil(padX / 2),
      top: Math.floor(padY / 2),
      bottom: Math.ceil(padY / 2),
      extendWith: 'copy'
    })
    .webp({ quality: 84 })
    .toFile(output);
  console.log(`${output} (${WIDTH}x${HEIGHT})`);
}
