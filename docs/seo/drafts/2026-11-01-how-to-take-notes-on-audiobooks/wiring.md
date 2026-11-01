# Wiring for /blog/how-to-take-notes-on-audiobooks

Published 2026-11-01 in a reviewed session. Everything below was applied in that session.

## 1. Answer pages (`scripts/build-answer-pages.js`): no change

None of the six answer pages is about notes or bookmarks. `/audiobook-with-text` was left alone on purpose: it is a top click earner and its related cards stay on the text question.

## 2. Contextual links from existing posts (2, link-only, no `dateModified` bump)

- `content/blog/how-to-retain-information-from-audiobooks.md`, section "7. Catch key lines as you hear them": one sentence pointing to the new post before the HushBook two-tap line. That section was the only place on the site that mentioned note-taking, so this tells Google which page now owns it.
- `content/blog/can-libby-read-to-you.md`, section on reading along inside Libby: the line listing Libby's player features (bookmarks, notes and highlights) now links to the new post.

## 3. llms.txt

`llms-line.txt` inserted directly below the `[HushBook blog]` line, CRLF endings to match neighbours.

## 4. Registry

`registry-entry.js` inserted at the top of `posts` in `data/blog-posts.js` by a script that asserted the lengths (metaTitle 57, metaDescription 155, description 226) and that the markdown H1 matches `title`. No `hero` or `aside` field: the post reuses none of the existing embeds (read-along-card, companions-arc, character-map).

## 5. After publishing

- `npm run build:blog`, then the 9 `*.test.js`: 7 pass; `seo-preservation` and `seo-repair-contract` fail on the old 2026-09-25 baseline as before.
- Rendered HTML checked for BlogPosting, FAQPage and BreadcrumbList, one h1, no iframe, no markdown leaks.
- After deploy: `node scripts/indexnow-ping.js https://hushbook.app/blog/how-to-take-notes-on-audiobooks https://hushbook.app/blog https://hushbook.app/blog/how-to-retain-information-from-audiobooks https://hushbook.app/blog/can-libby-read-to-you` (full URLs; Git Bash rewrites bare `/blog/...` paths).
- Request indexing for the new URL in Search Console (Chrome Profile 2).
