# Wiring for /blog/best-pride-and-prejudice-audiobook

Writer's hand-off, 2026-11-12. Files in this folder: `post.md` (copy to `content/blog/best-pride-and-prejudice-audiobook.md`), `registry-entry.mjs` (run `node registry-entry.mjs`; last run: OK), `llms-line.txt`. Nothing outside this folder was touched; no build, no commit.

## Inbound links (link-only edits, no dateModified bump)

Every fact in these sentences is in the new post.

1. `content/blog/how-long-is-an-audiobook.md`, line 33, the Pride and Prejudice bullet. Make the title the link, as was done for War and Peace on line 36:
   - now: `- *Pride and Prejudice*: 121,676 words, 13 hours 25 minutes (151 words a minute)`
   - new: `- [*Pride and Prejudice*](/blog/best-pride-and-prejudice-audiobook): 121,676 words, 13 hours 25 minutes (151 words a minute)`

2. `content/blog/how-to-keep-track-of-characters-in-a-book.md`, line 11, step 1 "The name, plus any other name they go by." Append after "Put them all on one line.":
   - `In *Pride and Prejudice*, "Miss Bennet" is usually Jane but sometimes Elizabeth, and our [guide to its audiobooks](/blog/best-pride-and-prejudice-audiobook) counts which is which.`
   - (Steps 3 and 5 already carry the War and Peace and Crime and Punishment links, so this one goes in a different step.)

3. `content/blog/abridged-vs-unabridged-audiobooks.md`, line 23, bullet "Read the description." Append after "and it may change the text.":
   - `Audible's 2025 full-cast *Pride and Prejudice*, for example, is a 4 hour 34 minute adaptation, against at least 10 hours 23 minutes for any [complete reading of the novel](/blog/best-pride-and-prejudice-audiobook).`
   - (Line 22 already holds the Crime and Punishment link, so this goes on the next bullet.)

Spare, if one of the three is refused: `content/blog/how-to-read-classics-without-getting-bored.md`, line 34, step 9, append: `Our [Pride and Prejudice audiobook guide](/blog/best-pride-and-prejudice-audiobook) tells its six free LibriVox versions apart.`

## Internal links this post makes (6, the cap)

| Section | Anchor text | Target |
|---|---|---|
| Which is best, end of "Listings we left out" | Wuthering Heights audiobook comparison | `/blog/best-wuthering-heights-audiobook` |
| How long, second paragraph | how long audiobooks run | `/blog/how-long-is-an-audiobook` |
| Full-cast, BBC and Julie Andrews, under the table | abridged and unabridged audiobooks | `/blog/abridged-vs-unabridged-audiobooks` |
| Names, "Who is speaking" paragraph | comparison of its audiobooks | `/blog/best-crime-and-punishment-audiobook` |
| Names, last paragraph (after the HushBook hint) | keep track of characters | `/blog/how-to-keep-track-of-characters-in-a-book` |
| Read or listen, last paragraph | how to read classics without getting bored | `/blog/how-to-read-classics-without-getting-bored` |

**Same-day dependency.** `best-wuthering-heights-audiobook` is not in `content/blog/` yet (its draft folder exists, so the self-check passes with a WARN). Ship both posts together. If Wuthering Heights does not ship today, delete the last sentence of "Listings we left out" ("Our [Wuthering Heights audiobook comparison](...) uses the same method for another English classic."); the post then has 5 internal links, still within 3 to 6.

## For the image agent and the wiring agent

- **Hero.** `content/blog/embeds/pride-and-prejudice-picks.html` and `assets/img/blog/pride-and-prejudice-picks.webp` already exist (made by the image agent, untracked). They show the four picks the post opens with: Pike, Stevenson, Karen Savage (LibriVox version 3), the 2025 Audible Original as a 4 h 34 min adaptation. Katherine Kellgren is "Best to borrow" in the body only. post.md has no image at the top.
- **Four body images** are on disk, each directly under its H2 (the self-check enforces which H2). I looked at each render and rewrote its alt to describe what it actually shows:
  - `pride-and-prejudice-editions.webp`: 14 bars in three groups (Audible 7, Apple Books and Libby 3, free on LibriVox 4). The body table has 24 rows; the chart is the main editions only, and the alt says so by listing all 14.
  - `pride-and-prejudice-length.webp`: words, chapters, four speeds, three volumes with chapter ranges.
  - `pride-and-prejudice-who-is-speaking.webp`: 46.8%, 61.5% (754 of 1,227), and "Miss Bennet" 39 Jane / 26 Elizabeth of 65.
  - `pride-and-prejudice-audiobook-with-text.webp`: the read-along page is Chapter XXIX with "Do you play and sing, Miss Bennet? A little." being read and "little" underlined, beside the player for "Pride and Prejudice (version 3)". The closing paragraph now points at that same Chapter 29 exchange, which the names section also quotes.
- **Two small notes on the image text** (images not edited): the length image's footnote says "the median pace of ten LibriVox readers", the same wording flagged on the War and Peace and Crime and Punishment images (ten recordings by eight people). The who-is-speaking tile says "of the words are dialogue" where the post says "inside quotation marks", which includes quoted letters; its footnote states the method, so I left it.

## Things to confirm before publishing

1. **Accent.** The post names Kate Reading, Flo Gibson and Katherine Kellgren as American narrators and describes no one's accent. If the owner listens to the samples, the American-accent H2 can name one.
2. **"Miss Bennet" split** (39 Jane, 26 Elizabeth) is the researcher's reading of each use in context; notes.md asks for a recount before publishing.
3. **Wikipedia sources.** The research read Wikipedia's REST summaries for Kate Reading, Flo Gibson and Katherine Kellgren; the Sources list links the standard article URLs for those same pages.
4. **Discover.** Card facts (titles, 10h 23m, 11h 10m, 299 MB, 307 MB, 61 chapters) were read on 2026-11-12 from source HEAD c0040d1 plus live archive.org data. The post never mentions the fourth Discover card (the Internet Archive upload flagged in notes.md item 1), and never says Discover names the reader.
5. **People Also Ask** for the main query and the American-accent query is still unchecked (scout.md).

## Wired (wiring agent, 2026-11-12, not staged or committed)

- `post.md` copied byte for byte to `content/blog/best-pride-and-prejudice-audiobook.md`. No edits to the post: the "Miss Bennet" recount matched (65; Jane 39, Elizabeth 26; 11 of Elizabeth's in Chapter 56; Chapters 1 to 9 all Jane), recorded in notes.md.
- `data/blog-posts.js`: entry first, Wuthering Heights second, War and Peace third; copied from `registry-entry.mjs` source with the indent shifted, `require` round trip equals the module's object; 43 posts, 43 unique slugs. `llms.txt`: line under `[HushBook blog]`, above Wuthering Heights.
- Inbound links 1 to 3 applied as written above (the spare was not needed). Link-only, dateModified unchanged on all three pages.
- The Wuthering Heights link in "Listings we left out" stays: both posts shipped in the same build. The Wuthering Heights post does not link back here (it is at its 6-link cap).
- `npm run build:blog`, tests and HTML checks: see the Wuthering Heights wiring.md, same run.
