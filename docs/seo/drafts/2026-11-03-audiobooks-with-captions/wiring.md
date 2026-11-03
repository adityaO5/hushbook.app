# Wiring for /blog/audiobooks-with-captions

Applied 2026-11-03.

## 1. Answer pages (`scripts/build-answer-pages.js`)

`/questions` FAQ "Does Audible have subtitles?" now links to the post ("how to get captions on any audiobook"). Rebuilt with `node scripts/build-answer-pages.js`.

## 2. Contextual links from existing posts (4, link-only, no `dateModified` bump)

- `can-you-read-along-with-audible.md`, "When Read & Listen won't cover your book" closing paragraph.
- `can-you-read-along-with-spotify-audiobooks.md`, "Do Spotify audiobooks have text or transcripts?" (the query "can you get subtitles on spotify audiobooks" lands there).
- `how-to-take-notes-on-audiobooks.md`, FAQ-style line "Audible does not show a transcript or captions".
- `are-audiobooks-good-for-adhd.md`: wording fix only (see notes.md), no link.

## 3. llms.txt

`llms-line.txt` inserted directly below the `[HushBook blog]` line, CRLF endings.

## 4. Registry

`registry-entry.mjs` inserted at the top of `posts` by a script that asserted the lengths (metaTitle 58, metaDescription 156, description 239), 8 keywords, 5 takeaways, 6 FAQs, and that the markdown H1 matches `title`. Reading time computed from the word count (4,147 words including Sources, 19 min). No `hero`, `aside` or `compared` field.

## 5. After publishing

- `npm run build:blog`, then the 10 `*.test.js`: 8 pass; `seo-preservation` and `seo-repair-contract` fail on the old baseline as before.
- Rendered HTML: BlogPosting, FAQPage, BreadcrumbList; one h1; 3 wide figures; 2 tables; no markdown leaks.
- IndexNow: `node scripts/indexnow-ping.js https://hushbook.app/blog/audiobooks-with-captions https://hushbook.app/blog https://hushbook.app/questions https://hushbook.app/blog/can-you-read-along-with-audible https://hushbook.app/blog/can-you-read-along-with-spotify-audiobooks https://hushbook.app/blog/how-to-take-notes-on-audiobooks`
- Request indexing for the new URL in Search Console (Chrome Profile 2).
