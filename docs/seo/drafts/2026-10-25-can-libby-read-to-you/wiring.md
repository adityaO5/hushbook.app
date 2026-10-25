# Wiring for /blog/can-libby-read-to-you

Applied, built and tested on 2026-10-25 in the same session that wrote the draft. Not committed, pushed, deployed or pinged. The contextual links are link-only edits to existing posts: no `dateModified` bump.

## 1. Answer pages (`scripts/build-answer-pages.js`): no change

`/read-along-audiobooks` and `/audiobook-with-text` answer product questions. The new post answers a how-to question about one library app. No `RELATED` link added.

## 2. Contextual links from existing posts (2)

### a) `content/blog/how-to-listen-to-audiobooks-for-free.md`, section "1. Libby (with a library card)", last bullet

Old:

```
- Audiobooks play inside Libby. You cannot export them as audio files.
```

New:

```
- Audiobooks play inside Libby. You cannot export them as audio files, and Libby shows no text while they play. Our guide to [whether Libby can read to you](/blog/can-libby-read-to-you) covers read-alongs, screen readers and a way to follow along.
```

### b) `content/blog/can-you-read-along-with-audible.md`, section "When Read & Listen won't cover your book", closing line

Old:

```
There's more on [how HushBook compares to Whispersync](/whispersync-alternative), and on [getting text for an audiobook](/audiobook-with-text).
```

New:

```
There's more on [how HushBook compares to Whispersync](/whispersync-alternative), on [getting text for an audiobook](/audiobook-with-text) and, for library books, on [whether Libby can read to you](/blog/can-libby-read-to-you).
```

### Considered, not applied

`content/blog/are-audiobooks-good-for-kids.md`, bullet "**Free sources.** Your library's Libby or Hoopla apps..." would fit a link to the read-alongs section. Left out to keep the change to two link edits, as in the last run.

## 3. llms.txt

The line in `llms-line.txt` goes directly below the `[HushBook blog]` line (line 39), above "Is LibriVox Safe, Legal and Free?". Line 39 itself ends in `\r\r\n` in HEAD; it was left as is, and the new line uses `\r\n` like the LibriVox line below it.

## 4. Build side effect on sitemap.xml

`npm run build:blog` regenerates `sitemap.xml`. Besides the new URL and the `/blog` lastmod (2026-10-24 to 2026-10-25), the generator moved `/privacy-policy` and `/terms-conditions` lastmod from 2026-10-24 to 2026-10-25, because those two pages have someone else's uncommitted edits and `gitDate()` returns today for uncommitted files. Those two lines were set back to 2026-10-24, the value in the other person's uncommitted `sitemap.xml`. Any later `build:sitemap` run before those pages are committed will move them to that day's date again.

## 5. After publishing

- `npm run build:blog`, then the 9 `*.test.js` (7 pass; `seo-preservation` and `seo-repair-contract` fail on the old baseline, as before this change).
- After deploy: `node scripts/indexnow-ping.js` with the new post, `/blog`, and the two edited posts. Then Request indexing in Search Console for the new URL.
