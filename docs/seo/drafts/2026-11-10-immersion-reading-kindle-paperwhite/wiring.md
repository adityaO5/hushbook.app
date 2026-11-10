# Wiring for /blog/immersion-reading-kindle-paperwhite

Draft, 2026-11-10. The writer edited nothing outside this folder. Copy `post.md` to `content/blog/immersion-reading-kindle-paperwhite.md`.

## 1. Registry

Insert the `entry` object from `registry-entry.mjs` (the object only, not the self-check) at the top of `posts` in `data/blog-posts.js`, above `can-kindle-read-to-you`. `node registry-entry.mjs` passes:

| Field | Value |
|---|---|
| `title` | 71 chars, equals the post.md H1 |
| `metaTitle` | 58 chars (limit 60), starts with the query |
| `metaDescription` | 160 chars (limit 160), answer-first |
| `description` | 232 chars (limit 240), same text as `llms-line.txt` |
| `cta.text` | 226 chars |
| `keywords` / `takeaways` / `faqs` | 8 / 5 (30 to 34 words) / 6 (answers 27 to 36 words, each starts with Yes or No) |
| `readingTime` | `'19 min read'` (about 4,260 words incl. table cells / 220) |
| `category` | `'Read-along guides'`, same as can-kindle-read-to-you |
| dates | `datePublished` and `dateModified` `'2026-11-10'`; change both if it ships later |

- No `hero`, `aside` or `compared` field.
- Three wide images, made in parallel, must land in `assets/img/blog/` before the build: `immersion-reading-kindle-by-device.webp`, `immersion-reading-vs-switching.webp`, `immersion-reading-hushbook-read-along.webp`. The self-check lists them as "not on disk yet" until then. If the by-device image's rows differ from the post's table (14 rows, "Not checked" for Kindle for Windows Assistive Reader, "Unclear" for Kindle for Mac), adjust its alt text.

## 2. llms.txt

Insert `llms-line.txt` at the top of the `## Blog (English)` list, directly under the `[HushBook blog]` line (line 40), above the `can-kindle-read-to-you` line (line 41).

## 3. Contextual links from existing posts (link-only, no `dateModified` bump)

- **`content/blog/can-kindle-read-to-you.md`**, H2 "Can a Kindle Paperwhite read to you?". The paragraph under "### 3. Turn on Assistive Reader and press play":
  > Turn on **Assistive Reader**. The player at the bottom of the screen plays, pauses, changes the reading speed and rewinds by 30 seconds. Amazon says you can "follow along with the words highlighted as they're read aloud."

  append to that paragraph (one sentence):
  > Audible narration gets no highlighted words on any Kindle e-reader; see [does Kindle Paperwhite support Immersion Reading](/blog/immersion-reading-kindle-paperwhite).

- **`content/blog/can-you-read-along-with-audible.md`**, "How to turn it on". The paragraph
  > If the toggle doesn't appear, the usual reason is that one of the two editions is missing from your account, or that the title isn't eligible.

  append to that paragraph:
  > On a Kindle e-reader it never appears; [which Kindles support Immersion Reading](/blog/immersion-reading-kindle-paperwhite) goes model by model.

- **`content/blog/what-is-immersive-reading.md`**, "What about Audible's Read & Listen?". The paragraph
  > It works inside Audible's own app, for eligible titles, and you may need both formats.

  append to that paragraph:
  > Kindle e-readers can't do it even with both formats; see [does Kindle Paperwhite support Immersion Reading](/blog/immersion-reading-kindle-paperwhite).

## 4. Answer pages (`scripts/build-answer-pages.js`)

Fits, owner's call. `/whispersync-alternative` serves people who searched Whispersync, and this post answers "does Whispersync work on Kindle Paperwhite" and "Whispersync vs Immersion Reading" directly. Proposed:

- `LABELS`: add `'/blog/immersion-reading-kindle-paperwhite': 'Does Kindle Paperwhite support Immersion Reading?'`
- `RELATED['whispersync-alternative']`: replace `'/m4b-player'` with `'/blog/immersion-reading-kindle-paperwhite'` → `['/blog/can-you-read-along-with-audible', '/blog/immersion-reading-kindle-paperwhite', '/audiobook-with-text', '/read-along-audiobooks']`.

Then run `node scripts/build-answer-pages.js` and `scripts/inject-gtag.js` (see blog-system notes on build order). Skip this if you want the answer pages untouched this session; nothing in the post depends on it.

## 5. Ship check

1. Internal links in the post, all live: `/blog/can-kindle-read-to-you` (twice), `/blog/what-is-immersive-reading`, `/blog/can-you-read-along-with-audible`, `/blog/does-reading-along-with-an-audiobook-help`, `/blog/best-apps-to-read-and-listen-at-the-same-time`, `/desktop` (twice), `/`. No ship-together dependency.
2. `npm run build:blog`, then the `*.test.js` suite (`seo-preservation` and `seo-repair-contract` already fail at HEAD on old baselines; not a regression).
3. Rendered HTML should have 1 h1, 22 h2 (21 + Sources), 9 h3, 3 wide figures, 2 tables (14 and 11 body rows), 51 source links.
4. Publish-day re-check, because these move: the Kindle+ price ($11.99) on About Amazon; Audible's immersion reading device list; the Amazon e-reader switching page (nodeId TZkqDMewOPQ0FqrSqX returned "Page Not Found" once on November 10 before loading).
5. Plain commit message, no co-author or session trailers.
6. After deploy: IndexNow for the new URL, /blog and the three posts that got links; then request indexing in Search Console.
