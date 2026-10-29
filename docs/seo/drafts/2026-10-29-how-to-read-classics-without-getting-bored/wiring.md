# Wiring for /blog/how-to-read-classics-without-getting-bored

Applied, built and tested on 2026-10-29 in the same session that wrote the draft. Not committed, pushed, deployed or pinged. The contextual links are link-only edits to existing posts: no `dateModified` bump.

## 1. Registry and hero

`registry-entry.js` goes at the top of the posts array in `data/blog-posts.js`. It sets `hero: 'read-along-card'` (existing embed `content/blog/embeds/read-along-card.html`), placed right after `slug` as in the iPhone, Spotify, M4B and Audible entries. One animation, at the top, above the takeaways. No new embed or demo.

## 2. Answer pages (`scripts/build-answer-pages.js`): no change

No answer page is about classics or reading difficulty, and the post links to blog guides only. No `RELATED` link added.

## 3. Contextual links from existing posts (2)

### a) `content/blog/is-librivox-safe-and-legal.md`, H2 "LibriVox vs Libby and Audible", first bullet

Old:

```
- **LibriVox** is for classics: public domain books, volunteer readers, free files you can keep, no account.
```

New:

```
- **LibriVox** is for classics: public domain books, volunteer readers, free files you can keep, no account. New to classics? Start with [how to read classics without getting bored](/blog/how-to-read-classics-without-getting-bored).
```

### b) `content/blog/free-read-along-audiobooks.md`, H2 "Who is it useful for?", bullet "**Classics readers.**"

Old:

```
- **Classics readers.** Older language is easier to follow when you can hear it and see it.
```

New:

```
- **Classics readers.** Older language is easier to follow when you can hear it and see it. Our guide to [reading classics without getting bored](/blog/how-to-read-classics-without-getting-bored) has more ways in.
```

### Considered, not applied

`content/blog/how-to-keep-track-of-characters-in-a-book.md` (War and Peace section) and `content/blog/how-long-is-an-audiobook.md` (the ten classics list) would also fit. Left out to keep the change to two link edits, as in the last runs.

## 4. llms.txt

The line in `llms-line.txt` goes directly below the `[HushBook blog]` line (line 39), above "How to Put Audiobooks on iPhone". Line 39 itself ends in `\r\r\n`; it was left as is, and the new line uses `\r\n` like the lines below it.

## 5. Build side effect on sitemap.xml

`git status --short` before the build showed only this change's files plus the three pre-existing untracked items (`AGENTS.md`, `docs/seo/drafts/2026-10-26-how-to-get-into-audiobooks/`, `docs/seo/weekly-action-plan-2026-10-26.md`). After `npm run build:blog`, `git diff sitemap.xml` showed the new URL and the `/blog` lastmod (2026-10-28 to 2026-10-29), plus five restamped lines: `/`, `/about`, `/refund-policy` and `/licenses` (2026-10-27 to 2026-10-28) and `/terms-conditions` (2026-10-25 to 2026-10-28). Those five were restored to their HEAD values, so the final diff is the new URL and the `/blog` lastmod only. `audiobook-app-for-dyslexia.html` showed no diff, so no checkout was needed.

## 6. After publishing

- `npm run build:blog` (then re-check the sitemap diff as in step 5), then the 9 `*.test.js` (7 pass; `seo-preservation` and `seo-repair-contract` fail on the old baseline, as before this change).
- After deploy: `node scripts/indexnow-ping.js /blog/how-to-read-classics-without-getting-bored /blog /blog/is-librivox-safe-and-legal /blog/free-read-along-audiobooks`. Then Request indexing in Search Console for the new URL.
