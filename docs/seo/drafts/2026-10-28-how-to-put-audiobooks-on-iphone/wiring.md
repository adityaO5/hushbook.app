# Wiring for /blog/how-to-put-audiobooks-on-iphone

Applied, built and tested on 2026-10-28 in the same session that wrote the draft. Not committed, pushed, deployed or pinged. The contextual links are link-only edits to existing posts: no `dateModified` bump.

## 1. Registry and hero

`registry-entry.js` goes at the top of the posts array in `data/blog-posts.js`. It sets `hero: 'read-along-card'` (existing embed `content/blog/embeds/read-along-card.html`), placed right after `slug` as in the Spotify, M4B and Audible entries. One animation, at the top, above the takeaways.

## 2. Answer pages (`scripts/build-answer-pages.js`): no change

`/m4b-player` is linked from the post body. No `RELATED` link added.

## 3. Contextual links from existing posts (2)

### a) `content/blog/how-to-play-m4b-files.md`, H2 "How to play M4B files on iPhone and iPad", line after the app list

Old:

```
Put the M4B in iCloud Drive or On My iPhone first, then import it from the app.
```

New:

```
Put the M4B in iCloud Drive or On My iPhone first, then import it from the app. Our guide to [putting audiobooks on iPhone](/blog/how-to-put-audiobooks-on-iphone) shows how to get the file there from a PC or Mac.
```

### b) `content/blog/is-librivox-safe-and-legal.md`, bullet "**Files come from a known host.**"

Old:

```
If you are not sure which to pick, see [M4B vs MP3](/blog/m4b-vs-mp3).
```

New:

```
If you are not sure which to pick, see [M4B vs MP3](/blog/m4b-vs-mp3), and to get the file onto your phone, see [how to put audiobooks on iPhone](/blog/how-to-put-audiobooks-on-iphone).
```

### Considered, not applied

`content/blog/m4b-vs-mp3.md` ("first check our guide to playing M4B files on iPhone, Android, Windows and Mac") and `content/blog/free-read-along-audiobooks.md` (LibriVox download steps) would also fit. Left out to keep the change to two link edits, as in the last runs.

## 4. llms.txt

The line in `llms-line.txt` goes directly below the `[HushBook blog]` line (line 39), above "Can You Read Along With Spotify Audiobooks?". Line 39 itself ends in `\r\r\n`; it was left as is, and the new line uses `\r\n` like the lines below it.

## 5. Build side effect on sitemap.xml

`git status --short` before the build showed only this change's files plus the three pre-existing untracked items (`AGENTS.md`, `docs/seo/drafts/2026-10-26-how-to-get-into-audiobooks/`, `docs/seo/weekly-action-plan-2026-10-26.md`). After `npm run build:blog`, `git diff sitemap.xml` showed only the new URL and the `/blog` lastmod (2026-10-27 to 2026-10-28). No other lines moved, so nothing was restored.

## 6. After publishing

- `npm run build:blog`, then the 9 `*.test.js` (7 pass; `seo-preservation` and `seo-repair-contract` fail on the old baseline, as before this change).
- After deploy: `node scripts/indexnow-ping.js` with the new post, `/blog`, and the two edited posts. Then Request indexing in Search Console for the new URL.
