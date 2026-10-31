# Wiring for /blog/how-to-get-into-audiobooks

Prepared 2026-10-26 by the scheduled weekly run. Nothing below has been applied: no site file was edited, built, committed or deployed. The contextual links are link-only edits to existing posts, so they need no `dateModified` bump.

## 1. Answer pages (`scripts/build-answer-pages.js`): no change

The six answer pages (`/read-along-audiobooks`, `/audiobook-with-text`, `/speechify-alternative`, `/whispersync-alternative`, `/audiobook-app-for-dyslexia`, `/m4b-player`) answer product questions. None is about starting to listen, so no `RELATED` or `LABELS` entry is added. Do not link the new post from `/audiobook-with-text`: that page is climbing (13 clicks this week at position 3.7) and its related cards should stay on topic.

## 2. Contextual links from existing posts (2)

### a) `content/blog/how-to-focus-on-audiobooks.md`, section "3. Start with a book that's easy to follow" (line 33)

Old:

```
A dense history with forty named characters is a hard first audiobook. Memoirs, comedy, thrillers and books you've already read in print are easier, because the story carries you and you don't have to hold as much in your head.
```

New:

```
A dense history with forty named characters is a hard first audiobook. Memoirs, comedy, thrillers and books you've already read in print are easier, because the story carries you and you don't have to hold as much in your head. If you are new to listening, [how to get into audiobooks](/blog/how-to-get-into-audiobooks) covers choosing a first book and building the habit.
```

Why here: the focus post had 248 impressions this week, and this paragraph is where a beginner reader overlaps with the new post. It also tells Google which page owns "first audiobook" advice, so the two posts don't compete.

### b) `content/blog/how-to-listen-to-audiobooks-for-free.md`, section "Which free option should you pick?", after the last bullet (line 116)

Old:

```
- **You have a print disability:** NLS, Bookshare, RNIB or CELA.
```

New:

```
- **You have a print disability:** NLS, Bookshare, RNIB or CELA.

If you are new to audiobooks, [how to get into audiobooks](/blog/how-to-get-into-audiobooks) covers choosing a first book, finding your speed and building the habit.
```

Why here: the new post sends readers to the free post in tip 1, and this closes the loop at the moment a reader has picked a source.

### Considered, not applied

`content/blog/audiobook-listening-speed.md`, "How to find your speed", first line ("Start at 1x for the first chapter.") would also fit a link. Left out to keep this to two link edits, as in previous runs.

## 3. llms.txt

The line in `llms-line.txt` goes directly below the `[HushBook blog]` line (line 39), above "Can Libby Read to You?". The draft file uses LF line endings; the recent llms.txt lines use CRLF (see the 2026-10-25 wiring notes), so match CRLF when pasting.

## 4. Registry

Insert `registry-entry.js` at the top of the `posts` array in `data/blog-posts.js` and replace both `YYYY-MM-DD` values with the publish date. Category is "Reading and listening", the same as the focus and speed posts.

## 5. After publishing

- `npm run build:blog`, then the 9 `*.test.js` (expected: 7 pass; `seo-preservation` and `seo-repair-contract` still fail on the old 2026-09-25 baseline).
- Check the rendered HTML for FAQPage, BlogPosting and BreadcrumbList, and that the 17 source links render as a list.
- Watch the sitemap side effect noted on 2026-10-25: uncommitted pages get today's `lastmod` from `gitDate()`.
- After deploy: `node scripts/indexnow-ping.js https://hushbook.app/blog/how-to-get-into-audiobooks https://hushbook.app/blog https://hushbook.app/blog/how-to-focus-on-audiobooks https://hushbook.app/blog/how-to-listen-to-audiobooks-for-free` (full URLs; Git Bash rewrites bare `/blog/...` paths).
- Request indexing for the new URL in Search Console (Chrome Profile 2).
