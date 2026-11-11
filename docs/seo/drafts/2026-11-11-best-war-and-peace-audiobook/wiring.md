# Wiring for /blog/best-war-and-peace-audiobook

2026-11-11. Applied the review edits, registered, cross-linked, built, tested, inspected and staged, mirroring the Crime and Punishment wiring (8d64145) and its hero commit (ea1f9de). Not committed, not pushed.

## Before starting

The six root pages that show as modified (audiobook-app-for-dyslexia, audiobook-with-text, m4b-player, questions, read-along-audiobooks, speechify-alternative) are stat-dirty only: `git hash-object` equals `HEAD:<file>` for all six, before and after the build. Not staged.

## Edits to the post (draft post.md and content/blog copy are byte-identical)

1. BBC section: deleted "Audible's cast list does not name Jessie Buckley."
2. Names section: now `Richard Pevear, while translating it, put the cast at "five hundred historical figures and fictional figures".` ("more than 500 named characters" removed). The registry's takeaways, FAQs, description, metaDescription and cta, and llms-line.txt, never said "more than 500", so no wording there changed.
3. The three body image alts replaced with the final ones in notes-images.md, copied verbatim by script: length (321 chars), editions (now "Bar chart of 14 unabridged English recordings", 1,134 chars, lists all 14 bars), read-along (457 chars).
4. Each body image still sits directly under its H2 (self-check and built HTML both confirm).

Knock-on change: edits 1 and 2 take the body from 4,952 to 4,939 words, and 4,939 / 220 rounds to 22, so the self-check failed on readingTime. `registry-entry.mjs` readingTime is now `'22 min read'`. Nothing else in the entry changed.

`node registry-entry.mjs` after the edits: OK. title 80, metaTitle 52, metaDescription 159, description 225, cta.heading 45, cta.text 195; first sentence 24 words; body 4,939 words (prose outside tables 4,214); 14 H2s plus Sources, 4 H3s, 6 tables, 3 wide images (all on disk, each under an H2), 57 source links, 6 internal links; 0 en or em dashes.

notes.md still describes the writer's draft (Jessie Buckley sentence kept, 23 min read, 13-bar editions alt); this file supersedes it on those points.

## Hero embed

`content/blog/embeds/war-and-peace-picks.html`: the Crime and Punishment embed with only the `src` (`/assets/img/blog/war-and-peace-audiobook-picks.webp`, 1400x788) and the alt changed. The alt is the picks alt from notes-images.md, HTML-escaped (`Briggs&#39;s`). `diff` against the C&P embed shows only line 2.

## Registry and llms.txt

- `data/blog-posts.js`: entry inserted first, above best-crime-and-punishment-audiobook, generated from registry-entry.mjs with a quote-escaping script; `require` round trip equals the source object; length asserts pass; 41 posts, 41 unique slugs.
- `llms.txt`: llms-line.txt inserted directly under the `[HushBook blog]` line, above the Crime and Punishment line.
- `scripts/build-answer-pages.js`: not touched (the Crime and Punishment wiring did not touch it either).

## Inbound links (link-only, no dateModified bump)

- `best-crime-and-punishment-audiobook.md`, names section, end of the "Garnett merges some forms" paragraph: "In *War and Peace*, the Maudes' "Prince Andrew" is Andrei in Pevear and Volokhonsky's translation, and our [comparison of its audiobooks](/blog/best-war-and-peace-audiobook) counts the names each main character goes by."
- `how-to-keep-track-of-characters-in-a-book.md`, War and Peace section, step 3 "Make your own list" (today's Crime and Punishment link is in step 5, a different list): "Naxos's free booklet for Volume I of Neville Jason's recording has one, sorted by family, and our [guide to War and Peace audiobooks](/blog/best-war-and-peace-audiobook) compares his reading with the others."
- `how-long-is-an-audiobook.md`, the War and Peace bullet: the title is now the link, `[*War and Peace*](/blog/best-war-and-peace-audiobook), the Maude translation: 561,870 words, ...`.
- `how-to-read-classics-without-getting-bored.md`, step 4 "Then the giants" (today's Crime and Punishment link is in step 8): "Our [War and Peace audiobook guide](/blog/best-war-and-peace-audiobook) sets that free reading beside the paid ones and counts the days to finish at each speed."

Every fact in the added sentences is in the new post (P&V's Andrei, the Naxos booklet's family list, the days-to-finish table). Rebuilt JSON-LD of the four pages, compared field by field with HEAD: dateModified unchanged (2026-11-11, 2026-10-20, 2026-10-27, 2026-10-29); only wordCount moved (C&P 4,844 to 4,874, characters 2,361 to 2,390, classics 2,364 to 2,387; how-long unchanged).

## Build

`npm run build:blog`: "Wrote 41 blog post(s), blog index and RSS feed.", "Wrote sitemap.xml with 81 URLs", "Updated 45 pages · already present 51 · failed 0". 36 untouched blog pages change by 4 lines each (Keep reading cards and footer Blog column now lead with the new post); the four linking pages 5 or 6 lines; blog/index.html 5+/4-; feed.xml one new item. sitemap.xml: one new URL with lastmod 2026-11-11; /blog lastmod already 2026-11-11.

## Tests (each file on its own; `npm test` chains with && and stops at seo-preservation)

| Test | Result |
|---|---|
| localization, seo-localization, tracking-params, mobile-nav, blur-in-heading-reveal, alternative-pages, blog-pages ("Blog contracts pass for 41 post(s)."), worker | pass |
| seo-preservation | fail: "No preservation baseline state matched current manifest: worktree: ar/index.html protected region hash changed" (and the same for the repository state) |
| seo-repair-contract | fail: "Body baseline worktree routeCount must equal expected route count", 86 !== 26 |

Same two messages as the Crime and Punishment run at HEAD 8f95519, and nothing under ar/ changed, so no worktree rerun was needed (memory note stale-seo-test-baselines).

## HTML inspection of blog/best-war-and-peace-audiobook.html

- No `|---|`, `**`, `](` or raw `## ` in the article; 6 tables, each inside `.table-wrap`.
- Hero: the picks figure is the first element after the H1 header, above the takeaways, with `fetchpriority="high"` (the only one on the page), `style="height:auto"` and 1400x788.
- 4 `post-media-wide` figures: the hero plus length, editions and read-along, each body image directly after its H2. All four webp files exist (1400x788, 1400x1080, 1400x1884, 1400x900).
- One JSON-LD block, parses: BlogPosting (published and modified 2026-11-11), FAQPage (6 questions), BreadcrumbList.
- `<title>` 52 chars, meta description 159, canonical https://hushbook.app/blog/best-war-and-peace-audiobook; 1 h1; "22 min read".
- 0 en or em dashes anywhere in the file; "Jessie" and "more than 500" absent.
- All 24 root-relative hrefs resolve to files on disk.
- First row on /blog, first item in blog/feed.xml, in sitemap.xml and llms.txt; gtag present.
- Crime and Punishment page: still builds with its picks hero first, 4 wide figures, JSON-LD intact, 0 dashes, all hrefs resolve.

## Staged

content/blog/best-war-and-peace-audiobook.md, content/blog/embeds/war-and-peace-picks.html, the four linking posts' md, data/blog-posts.js, llms.txt, sitemap.xml, blog/ (new page, the 40 rebuilt pages, index.html, feed.xml), assets/img/blog/war-and-peace-*.webp (4), and this draft folder.

Left out on purpose: the six owner root pages (content identical to HEAD). The draft folder had no `__pycache__`.

## Odd things

- `blog/what-is-immersive-reading.html` is still written with mixed line endings (git: "CRLF will be replaced by LF"); it predates this post, as noted on the Crime and Punishment wiring.
- The length image's sources line still says "the median pace of ten LibriVox readers" (ten recordings by eight people), as flagged on the Crime and Punishment image. Not edited.
