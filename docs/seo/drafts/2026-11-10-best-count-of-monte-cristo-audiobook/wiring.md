# Wiring for /blog/best-count-of-monte-cristo-audiobook

Draft, 2026-11-10. Nothing outside this folder has been edited by the writer. Copy `post.md` to `content/blog/best-count-of-monte-cristo-audiobook.md`.

## 1. Contextual links from existing posts (link-only, no `dateModified` bump)

- **`content/blog/how-long-is-an-audiobook.md`**, "Why the same book can have different lengths", first bullet (line 63). The bullet
  > **The narrator.** Our ten readers ranged from 131 to 179 words a minute. On LibriVox, different recordings of the same book often differ by 10% or more. *The Count of Monte Cristo* runs from about 50 to 54 hours depending on the version.

  append to that bullet:
  > We compare every unabridged recording of it in [the best Count of Monte Cristo audiobook](/blog/best-count-of-monte-cristo-audiobook).

  Consistency: the new post says "about 460,000 words" and "about 141 words a minute" for David Clarke and "about 154" for LibriVox versions 1 and 2, which agrees with this post's 459,752 words, 141 words a minute and "about 50 to 54 hours". No edit to the numbers here.

- **`content/blog/abridged-vs-unabridged-audiobooks.md`**, the paragraph at line 32
  > Abridged editions make sense in a few situations: a long non-fiction book where you only want the main argument, a classic you want to sample before committing to 40 hours, or a young listener who'd struggle with the full text. Just know what you're getting.

  append to that paragraph:
  > For *The Count of Monte Cristo*, which is sold both ways, our [guide to its audiobook editions](/blog/best-count-of-monte-cristo-audiobook) separates the complete recordings from the cut ones.

- **`content/blog/how-to-read-classics-without-getting-bored.md`**, the bullet at line 57
  > - **Pick the narrator.** LibriVox readers are volunteers and quality varies, so prefer a solo recording and play the first chapter. More in [is LibriVox safe and legal](/blog/is-librivox-safe-and-legal).

  append to that bullet:
  > For a long classic, see how [the recordings of *The Count of Monte Cristo*](/blog/best-count-of-monte-cristo-audiobook) compare.

(Part D2 of research-platforms.md gave lines 30 and 55 for the last two; the sentences are now at 32 and 57. Match on the text, not the line number.)

## 2. Registry

Insert the object literal from `registry-entry.mjs` (the `entry` object only, not the self-check) at the top of `posts` in `data/blog-posts.js`, above `immersion-reading-kindle-paperwhite`. `node registry-entry.mjs` passes:

| Field | Value |
|---|---|
| `title` | 86 chars, equals the post.md H1, starts with "Best Audiobook Version of The Count of Monte Cristo" |
| `metaTitle` | 60 chars (limit 60), starts with "Best Count of Monte Cristo Audiobook" |
| `metaDescription` | 157 chars (limit 160), answer-first |
| `description` | 229 chars (limit 240), same text as `llms-line.txt` |
| `cta` | heading "See every word of the free recording as it is read"; text 207 chars, names the misspelled-names limit |
| `keywords` / `takeaways` / `faqs` | 8 (research-platforms.md C3 phrasings) / 5 (30 to 33 words) / 7 (answers 29 to 33 words, owner's 25 to 35 rule asserted in the self-check) |
| `readingTime` | `'17 min read'` (3,800 body words incl. tables / 220; 2,576 outside tables) |
| `category` | `'Reading and listening'` (existing category) |
| dates | `datePublished` and `dateModified` `'2026-11-10'`; change both if it ships later |

- `faqs` use the registry's `[question, answer]` array shape.
- No `hero`, `aside` or `compared` field.
- Images in `assets/img/blog/` (untracked, made by the image agent): `count-of-monte-cristo-audiobook-runtimes.webp` and `count-of-monte-cristo-audiobook-read-along.webp` were on disk at writing time; `count-of-monte-cristo-aliases.webp` was not yet. Commit all three with the post. The aliases alt text in post.md describes the evidence (Lord Wilmore 25, Abbé Busoni 26 unnamed and 43 named, Thomson & French clerk 28, Sinbad 29, Count of Monte Cristo 33, Zaccone 69); re-check it against the finished image.

## 3. llms.txt

Insert `llms-line.txt` at the top of the `## Blog (English)` list, directly under the `[HushBook blog]` line, above the newest existing post line.

## 4. Answer pages

No change.

## 5. Ship check

1. Internal links in the post, all live: `/blog/how-long-is-an-audiobook`, `/blog/audiobook-listening-speed`, `/blog/abridged-vs-unabridged-audiobooks`, `/blog/is-librivox-safe-and-legal`, `/blog/how-to-keep-track-of-characters-in-a-book`, `/blog/how-to-read-classics-without-getting-bored`, `/blog/how-to-play-m4b-files`. No ship-together dependency.
2. `npm run build:blog`, then the `*.test.js` suite (`seo-preservation` and `seo-repair-contract` already fail at HEAD on old baselines; not a regression).
3. Rendered HTML should have 1 h1, 11 h2 (10 + Sources), 3 h3, 8 tables (editions 17 rows, runtimes 17, days to finish 12, abridged 7, LibriVox 6, characters 13, aliases 6, stores 10), 3 wide figures, 45 source links.
4. Publish-day re-check, because these can change:
   - Penguin UK audio page (ISBN 9781837316199) and Audible B0HQCM2YBP: still February 11, 2027, still no narrator, length or translator? If a narrator or length is announced, update the opening, the translation section, takeaway 3 and FAQ 2.
   - The live HushBook store build is 1.3.5 (70) or newer, so the Discover description (three same-titled results, tiered search) matches. research-platforms.md Part A top caveat.
   - The read-along image's cover art reads "a LibriVox recording read by David Clarke". Discover itself does not show the reader's name for this item (Part A2, A9 item 1). The post text never says it does; confirm the owner is fine with the composed cover, or ask the image agent for a cover without that line.
   - BBC episode 1 page still "not currently available".
   - Runtimes for the 2026 listings (Christopher Tester, Arthur Lane) on Audible, since new listings get re-uploaded.
   - Internet Archive view counts are dated November 10, 2026 in the text; leave them unless the date is changed.
5. Plain commit message, no co-author or session trailers.
6. After deploy: IndexNow for the new URL, /blog and the three posts that got links; then request indexing in Search Console.
