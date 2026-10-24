# Wiring for /blog/is-librivox-safe-and-legal

Applied, built, tested and published on 2026-10-24 in the same session that wrote the draft. The contextual links are link-only edits to existing posts: no `dateModified` bump.

## 1. Answer pages (`scripts/build-answer-pages.js`): no change

`/read-along-audiobooks` and `/audiobook-with-text` answer product questions. The new post answers a trust question about one free source. No `RELATED` link added.

## 2. Contextual links from existing posts (2)

### a) `content/blog/how-to-listen-to-audiobooks-for-free.md`, section "4. LibriVox: free public domain audiobooks", country caveat bullet

Old:

```
- **Public domain depends on your country.** LibriVox follows US copyright law. Its wiki warns a work "may be in the public domain in the US, but still be under copyright in other countries."
```

New:

```
- **Public domain depends on your country.** LibriVox follows US copyright law. Its wiki warns a work "may be in the public domain in the US, but still be under copyright in other countries." We show how to check, with a current example, in [is LibriVox safe and legal](/blog/is-librivox-safe-and-legal).
```

### b) `content/blog/free-read-along-audiobooks.md`, section "LibriVox"

Old:

```
That means thousands of classics with human narrators, free to download and keep. Many of these books are very old, and as LibriVox itself warns, may contain outdated or offensive language or ideas.
```

New:

```
That means thousands of classics with human narrators, free to download and keep. Many of these books are very old, and as LibriVox itself warns, may contain outdated or offensive language or ideas. For safety, copyright outside the US and whether the narrators are AI, see [is LibriVox safe and legal](/blog/is-librivox-safe-and-legal).
```

### Considered, not applied

`content/blog/learn-english-with-audiobooks.md` ("LibriVox. ... Quality varies, so play a sample and pick a reader whose voice is clear.") would fit a link to the "Is LibriVox any good?" section. Left out to keep the change to two link edits.

## 3. llms.txt

The line in `llms-line.txt` goes directly below the `[HushBook blog]` line (line 39), above "Does Reading Along With an Audiobook Help?". CRLF like the neighboring lines.

## 4. After publishing

- `npm run build:blog`, then the 9 `*.test.js` (7 pass; `seo-preservation` and `seo-repair-contract` fail on the old baseline, as before this change).
- After deploy: `node scripts/indexnow-ping.js` with the new post, `/blog`, and the two edited posts. Then Request indexing in Search Console for the new URL.
