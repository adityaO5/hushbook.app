# Wiring for /blog/best-wuthering-heights-audiobook

2026-11-12, writer's hand-off. Nothing outside this folder was touched: no site files, no build, no commit.

## Files in this folder

- `post.md`: copy byte for byte to `content/blog/best-wuthering-heights-audiobook.md`.
- `registry-entry.mjs`: the registry object plus a self-check. `node registry-entry.mjs` prints OK: title 69, metaTitle 57, metaDescription 154, description 224, cta.heading 37, cta.text 202; first sentence 17 words; body 5,806 words (4,375 outside tables), so `readingTime: '26 min read'`; 11 H2s plus Sources, 5 H3s, 11 tables, 4 wide images (all on disk, each directly under its own H2), 68 source links, 6 internal links; 0 en or em dashes in the post or the entry.
- `llms-line.txt`: the llms.txt line. The self-check asserts it equals title plus description.

## Registry and llms.txt

- `data/blog-posts.js`: insert the entry first, above `best-war-and-peace-audiobook`. `hero: 'wuthering-heights-picks'` points at `content/blog/embeds/wuthering-heights-picks.html`, which the images agent already created (same markup as the War and Peace embed, only `src` and `alt` differ; alt says Naxos 13 h 9 min, matching the post).
- `llms.txt`: insert `llms-line.txt` directly under the `- [HushBook blog]` line (line 40 today), above the War and Peace line.

## Images (all four on disk at 2026-11-12 midday; alts written against the rendered files)

| Image | Under H2 | Note |
|---|---|---|
| `wuthering-heights-editions.webp` | Which Wuthering Heights audiobook is best? | Chart shows 12 store editions plus 3 LibriVox; the post's table has 16 plus 3. Fine as a subset. Billie Fulford-Brown's rating cell reads "none"; she is on Audible UK only, not unrated. Consider "UK only". |
| `wuthering-heights-length.webp` | How long is the Wuthering Heights audiobook? | Matches the post. |
| `wuthering-heights-family-tree.webp` | How do you keep the two Catherines ...? | **Spoiler.** The dashed "to marry" line from Hareton to Catherine Linton is the novel's ending. Scout has "family tree no spoilers", "character list no spoilers". Recommend the images agent drop that line and its legend entry. If it does, delete from the alt: `, and a dashed line for to marry` and `, and a dashed line shows her to marry Hareton Earnshaw`. The post's table already stops short of the ending. |
| `wuthering-heights-read-along.webp` | Is there a Wuthering Heights audiobook with text? | Alt describes "In all" tinted and "England" underlined, as rendered. |

If any image is re-rendered, re-read it and update its alt in `post.md` before copying.

## Inbound links (link-only edits, no dateModified bump)

1. `content/blog/audiobooks-with-captions.md`, section "Do captions help with focus, accents or noisy places?", the Mitterer and McQueen paragraph. Append after its last sentence ("If a narrator's accent is the thing between you and a book, captions are the fix."):

   > Joseph's Yorkshire in *Wuthering Heights* is the classic case, and our [guide to its audiobooks](/blog/best-wuthering-heights-audiobook) counts how much of the book he speaks and what listeners say about each narrator's accent.

2. `content/blog/how-to-keep-track-of-characters-in-a-book.md`, section "How to keep track of characters when reading a book", bullet "**A family tree for family sagas.**". Append after "Marriages and feuds then show up as lines between trees.":

   > *Wuthering Heights* needs one: two houses and two generations share the names Catherine, Linton and Heathcliff, and our [guide to its audiobooks](/blog/best-wuthering-heights-audiobook) sorts them by house.

3. `content/blog/how-long-is-an-audiobook.md`, section "Why the same book can have different lengths", bullet "**The narrator.**". Insert after "On LibriVox, different recordings of the same book often differ by 10% or more." (before the Monte Cristo sentence):

   > The three free LibriVox recordings of *Wuthering Heights* run from 11 hours 33 minutes to 14 hours 49 minutes, and our [guide to its audiobooks](/blog/best-wuthering-heights-audiobook) times every complete recording.

Every fact in the three sentences is in the new post.

## Outbound internal links (6, all exist in content/blog/)

| Link | Section | Anchor text |
|---|---|---|
| /blog/how-long-is-an-audiobook | How long is the Wuthering Heights audiobook? | how long audiobooks run |
| /blog/best-war-and-peace-audiobook | Who narrates ... separate voices? ("How we know") | War and Peace comparison |
| /blog/free-read-along-audiobooks | Is there a free Wuthering Heights audiobook? | free read-along audiobooks |
| /blog/abridged-vs-unabridged-audiobooks | Which ... abridged or dramatised? | abridged and unabridged audiobooks |
| /blog/how-to-keep-track-of-characters-in-a-book | How do you keep the two Catherines ...? | keep track of characters |
| /blog/how-to-read-classics-without-getting-bored | Should you read or listen to Wuthering Heights? | how to read classics without getting bored |

## For the reviewer: figures the writer derived from research data

- "More ratings than all the other recordings in our table put together": 8,661 against 6,595, the sum of the other Audible US rating counts in the table.
- "10 of the 19 complete recordings in our table fall outside" 12 to 14 hours: eight under 12 (Petrie, Peters, Gibson, LibriVox V1, Seymour, Kitchen, LibriVox V3, Page and Merlington), two over 14 (Routledge, Golding). research-platforms.md section 4 says "six" but lists seven and misses Peters and two LibriVox sets.
- Naxos runtime: the post uses Naxos's own 13 h 9 min (booklet 13:09:16) to match the chart and hero, and says Audible lists 13 h 8 min. Its speed row is recalculated from 13:09:16: 10 h 31 min, 8 h 46 min, 6 h 35 min.
- Joseph "about 43 words a speech": 1,814 words over 42 speeches.

## Not for this wiring, owner's call

- `audiobooks-with-captions.md` says "121 Dutch students"; the paper says "121 participants from the subject pool" (research-evidence.md, item 10). The new post says "121 Dutch participants".
- The six stat-dirty root HTML files and the other untracked work (`docs/seo/drafts/2026-11-12-best-pride-and-prejudice-audiobook/`, `assets/img/mockups/_tmp-pp-*`, `tools/mockups/scenes/_tmp-pp-*`) belong to other jobs; do not stage them with this post.

## Wired (wiring agent, 2026-11-12, not staged or committed)

- Family tree alt rewritten in `post.md` for the re-rendered image (75,940 bytes, SHA-256 427be1fa…2181, viewed at 12:06): only "married" double lines, the two house brackets, two generations. No dashed line, "to marry" or Hareton marriage in the alt. Then copied byte for byte to `content/blog/best-wuthering-heights-audiobook.md`. Self-check still OK (alt text is outside the word count).
- `data/blog-posts.js`: entry second, under Pride and Prejudice, above War and Peace; `require` round trip equals the module. `llms.txt`: line under the Pride and Prejudice line.
- Inbound links 1 to 3 applied as written above. In `how-to-keep-track-of-characters-in-a-book.md` the Pride and Prejudice link went in step 1 and this one in the family-tree bullet; in `how-long-is-an-audiobook.md` Pride and Prejudice is the title link in the word-count list and this one is in "The narrator" bullet. No paragraph carries both. dateModified unchanged on every linking page (JSON-LD compared with HEAD; only wordCount moved).
- `npm run build:blog`: 43 posts, sitemap 83 URLs, gtag "Updated 52 pages, failed 0". `build-answer-pages.js` and `build:cf` not run (not asked for; yesterday's wiring did not run them). The six stat-dirty owner root pages hash the same as HEAD after the build.
- Tests run one by one: localization, seo-localization, tracking-params, mobile-nav, blur-in-heading-reveal, alternative-pages, blog-pages ("Blog contracts pass for 43 post(s).") and worker pass; seo-preservation ("ar/index.html protected region hash changed") and seo-repair-contract (routeCount 86 !== 26) fail as at HEAD.
- Rendered pages, both posts: 0 markdown leaks, every pipe table inside `.table-wrap` (5 and 11), hero picks figure first with the page's only `fetchpriority="high"`, 4 body figures each directly after its H2, one JSON-LD block with BlogPosting, FAQPage (6) and BreadcrumbList, `<title>` 58 and 57 chars, meta description 155 and 154, 0 en or em dashes in the file, every root-relative href and image resolves. The only `|` outside tables is in the Pride and Prejudice Sources entry quoting Gutenberg's page title, as on the War and Peace page.
