# Wiring for /blog/best-crime-and-punishment-audiobook

2026-11-11. Applied the review edits, registered, cross-linked, built, tested, inspected and staged. Not committed, not pushed.

## Before starting

- `git diff --stat` was empty. The six root pages that showed as modified (audiobook-app-for-dyslexia, audiobook-with-text, m4b-player, questions, read-along-audiobooks, speechify-alternative) are stat-dirty only: `git hash-object` equals `HEAD:<file>` for all six, so the saved owner diff is empty. The build did not change them (hashes and byte compare identical after the build). Not staged.

## Edits to the post (draft post.md and content/blog copy are identical)

1. Paragraph "Years are the publisher's where it gives one": the Spotify sentence now reads "The Spotify entries for Constantine Gregory and Don Warrington, and the Libro.fm entry for Don Warrington, come from the publishers' own links." Checked first: research-platforms.md table 1a, Warrington row, "Penguin UK lists Apple Books, Audible, Bookshop.org, Google Play, Hive, Kobo, Libro.fm, Spotify, xigxag", and line 188 "Penguin UK lists Libro.fm among the stores for the Warrington/Ready audiobook (VERIFIED, Penguin page)".
2. Editions image alt: replaced with the notes-images.md alt (bar chart of 20 recordings, every bar named with runtime).
3. Read-along image alt: rewritten to match the webp on disk (checked visually): left phone the player with the LibriVox cover and the title "Crime and Punishment (Version 3)"; right phone Part 1, Chapter 1 opening "On an exceptionally hot evening early in July", the line "as though in hesitation, towards K. bridge" being read, current word "towards" underlined. notes-images.md's wording did not name the opening or the line, so it was not used verbatim.
4. Length image sources line ("median pace of ten LibriVox readers"): content/blog/how-long-is-an-audiobook.md uses ten solo LibriVox recordings and itself says "the ten readers" (lines 39 and 63), median 151. Its Sources list shows eight distinct narrators: Kara Shallenberg reads both Alice and Gatsby, Mark Nelson both the Odyssey and War and Peace. So "ten readers" is strictly ten solo recordings by eight people. Image not edited; flagged to the orchestrator.

`node registry-entry.mjs` after the edits: OK. title 87, metaTitle 59, metaDescription 157, description 231, cta.text 191; body 3,808 words, so "17 min read" still holds; 6 tables, 3 wide images (all on disk), 6 internal links; 0 en or em dashes.

## Registry and llms.txt

- `data/blog-posts.js`: entry inserted first, above best-count-of-monte-cristo-audiobook, generated from registry-entry.mjs with a quote-escaping script; `require` round trip equals the source object; length asserts pass; 40 unique slugs.
- `llms.txt`: llms-line.txt inserted directly under the `[HushBook blog]` line, above the Monte Cristo line (same place as 2026-11-10).
- `scripts/build-answer-pages.js`: not touched. Commit 03106ef did not change it for Monte Cristo either.

## Inbound links (link-only, no dateModified bump)

- `how-to-keep-track-of-characters-in-a-book.md`, step 5 "Read along when the names are hard": "In *Crime and Punishment*, Raskolnikov is also Rodya and Rodion Romanovitch, and our [guide to its audiobooks](/blog/best-crime-and-punishment-audiobook) lists the names each main character goes by."
- `how-to-read-classics-without-getting-bored.md`, step 8 "Change the translation, not the book": "The free recordings of *Crime and Punishment* read Constance Garnett's 1914 translation, and our [guide to its audiobooks](/blog/best-crime-and-punishment-audiobook) names the two modern ones you can hear instead."
- `best-count-of-monte-cristo-audiobook.md`, translation section, end of the "None of the store or publisher pages" paragraph: "For *Crime and Punishment*, where several stores do credit a translator, our [comparison of its audiobooks](/blog/best-crime-and-punishment-audiobook) names the translation each recording reads."
- `abridged-vs-unabridged-audiobooks.md`, bullet "Compare the length": "*Crime and Punishment*, for example, runs about 20 to 28 hours unabridged, while its [abridged audiobooks](/blog/best-crime-and-punishment-audiobook) run from 2 hours 20 minutes to 5 hours 15 minutes."

Rebuilt JSON-LD of the four pages: dateModified unchanged (2026-10-27, 2026-10-29, 2026-11-10, 2026-10-15); only wordCount moved.

## Build

`npm run build:blog` (build-blog, build-sitemap, inject-gtag): "Wrote 40 blog post(s), blog index and RSS feed", "Wrote sitemap.xml with 80 URLs", "Updated 43 pages · already present 48 · failed 0". Every blog page changes by 8 lines (Keep reading cards and footer Blog column now lead with the new post), as on 2026-11-10. sitemap.xml: new URL with lastmod 2026-11-11, /blog lastmod 2026-11-10 to 2026-11-11.

## Tests (each file run on its own, because `npm test` chains with && and stops at the first failure)

| Test | Working tree | Clean HEAD 8f95519 (git worktree) |
|---|---|---|
| localization, seo-localization, tracking-params, mobile-nav, blur-in-heading-reveal, alternative-pages, blog-pages ("40 post(s)"), worker | pass | not rerun |
| seo-preservation | fail: ar/index.html protected region hash changed (faqJsonLd, faqToFinale, seoCopyToFaq), worktree and repository states | identical failure, same hashes |
| seo-repair-contract | fail: "Body baseline worktree routeCount must equal expected route count", 86 !== 26 | identical failure, 86 !== 26 |

The two failing logs differ from HEAD only in file paths. Not a regression (memory note stale-seo-test-baselines). Worktree removed afterwards.

## HTML inspection of blog/best-crime-and-punishment-audiobook.html

- No `|---|`, `**`, `](` or raw `## ` in the article text; 6 tables, each inside `.table-wrap`.
- 3 `post-media-wide` figures; all three webp files exist.
- One JSON-LD block, parses; has BlogPosting, FAQPage (6 questions) and BreadcrumbList.
- `<title>` 59 chars, meta description 157, canonical https://hushbook.app/blog/best-crime-and-punishment-audiobook; 1 h1; 12 content H2s plus Sources, FAQ, CTA, Keep reading.
- 0 en or em dashes anywhere in the page.
- All 24 root-relative hrefs resolve to files on disk.
- First row on /blog, in sitemap.xml, llms.txt, blog/feed.xml; gtag present; in-body link present on all four linking pages.

## Staged

content (new post and four linking posts), data/blog-posts.js, llms.txt, sitemap.xml, blog/ (new page, all rebuilt pages, index.html, feed.xml), the three webp images, this draft folder, docs/seo/keyword-research-2026-11-11.md.

Left out on purpose: `scripts/__pycache__/russian-wordcount.cpython-314.pyc` in this folder (compiled bytecode), and the six owner root pages (content identical to HEAD).

## Odd things

- `blog/what-is-immersive-reading.html` is written with mixed line endings (git: "CRLF will be replaced by LF"); the index copy is LF and git normalises it on add. It predates this post.
- The read-along image may be re-rendered by another agent after staging; restage it before committing if so, and recheck the alt text against the new render.
