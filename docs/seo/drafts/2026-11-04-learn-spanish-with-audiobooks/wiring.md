# Wiring for /blog/learn-spanish-with-audiobooks

Draft, 2026-11-04. Nothing outside this folder has been edited yet.

## 1. Contextual links from existing posts (link-only, no `dateModified` bump)

- **`learn-english-with-audiobooks.md`**, "Where to find free English audiobooks". After line 61 ("We cover free sources in more depth in [free read-along audiobooks](/blog/free-read-along-audiobooks).") add:
  > If you are learning Spanish, [how to learn Spanish with audiobooks](/blog/learn-spanish-with-audiobooks) covers the Spanish research and free Spanish books by level.
- **`free-read-along-audiobooks.md`**, "Who is it useful for?". Replace the bullet `- **Language learners.** You hear a word and see how it's spelled at the same moment.` with:
  > - **Language learners.** You hear a word and see how it's spelled at the same moment. Free Spanish picks by level are in [how to learn Spanish with audiobooks](/blog/learn-spanish-with-audiobooks).
- **`is-librivox-safe-and-legal.md`**, "Is LibriVox any good?". After the numbered list (item 4, "Adjust the speed."), add:
  > LibriVox is also a free source for language learners. [How to learn Spanish with audiobooks](/blog/learn-spanish-with-audiobooks) lists Spanish recordings by level, with running times and reader counts.

  Alternative: `best-librivox-app.md`, "No app: librivox.org in your browser". After the "**Catch:**" paragraph, add: "For Spanish recordings by level, see [how to learn Spanish with audiobooks](/blog/learn-spanish-with-audiobooks)."

## 2. Registry

Insert `registry-entry.mjs` at the top of `posts` in `data/blog-posts.js`. Checked by script:

| Field | Value |
|---|---|
| `title` | 62 chars, equals the post.md H1 |
| `metaTitle` | 58 chars (limit 60) |
| `metaDescription` | 159 chars (limit 160) |
| `description` | 235 chars (limit 240), same text as `llms-line.txt` |
| `cta.text` | 238 chars |
| `keywords` / `takeaways` / `faqs` | 8 / 5 / 6 (FAQ answers 3 to 4 sentences) |

- **`readingTime`**: the build has no handler for `'auto'`, so replace it with `'16 min read'`. The blog parser counts 3,518 words (3,598 raw, including Sources), and ceil(words / 230) matches the two newest posts (captions 19 min, Goodreads 12 min).
- **`category`**: set to `'Language learning'`, not the brief's `'Reading and listening'`. The sibling `learn-english-with-audiobooks` is the only post in that category, the category drives the eyebrow, breadcrumb and `articleSection`, and the French and German follow-ups would join it. If you want `'Reading and listening'`, change that one string.
- No `hero`, `aside` or `compared` field. The three wide images are already in `assets/img/blog/` (untracked): `spanish-audiobook-read-along.webp`, `spanish-speech-rate.webp`, `spanish-audiobook-routine.webp`.

## 3. llms.txt

Insert `llms-line.txt` directly below the `[HushBook blog]` line.

## 4. Facts I was unsure about

- **Jensen and Vinther (2003)**: the evidence file says the learners' Danish L1 comes from the full paper, which was not checked. The post says "84 upper-intermediate learners of Spanish" and leaves out "Danish".
- **Sample sizes not given**: Peterson 2025 (not in the abstract; the post says so), Zhang and Peng 2024, Winke 2010, Zhao 1997 (the often-quoted n = 15 is unverified).
- **Book years**: there is no year for the Spanish Grimm translation, so none is given. Fernán Caballero is listed as "1921 edition", the source edition (she died in 1877). The *Antología* is by various authors, with no year.
- **Levels** are marked "Roughly A2" and so on as our suggestions. Only Olly Richards's "A2-B1" is the publisher's own mapping.
- **Libro.fm** listing for *Short Stories in Spanish for Beginners*: seen in search results only, because the page returned 403. The post says only "Libro.fm also lists it".
- **Spotify US Spanish catalogue**: the size is unverified. The post says "We could not confirm" it.
- **Libby audiobook text**: no help page was found either way. The post says "We found no Libby help page that mentions text for audiobooks" and does not claim there is none.
- **"Free; Pro adds extras"** (HushBook table row) and **"No account, no ads"**: these come from existing site copy (the captions post and best-librivox-app), not from Part B of the research.
- **Source labels to check before publishing (about 2 minutes)**:
  - Written without quotes because the page title was not captured: Audible Read & Listen, the Spotify US audiobooks page, Spotify Newsroom 2026-10-07, Libby Help 6131.
  - In quotes but taken from URL slugs: the Libby Life blog post, the Libro.fm support article, and the Beelinguapp and LingQ App Store names.
- **The only dash in the file** is Audible's own en dash inside the Paul Noble title in Sources, kept because it is the original title.
- **Left out for lack of verification**:
  - Montero Perez 2013 pooled effect sizes
  - Dreaming Spanish hour thresholds and price
  - Instituto Cervantes 2026 "640 million"
  - Lund 1991 findings
  - Nation's single-novel example
  - hoopla's language filter
  - Paco Ardit's DRM-free source and Juan Fernández
  - News in Slow Spanish price
  - RTVE and Cervantes text sources
  - LingQ free-tier limits
  - Accent of every LibriVox reader except the *Antología* matching
- **Verified but cut to stay at 35 sources** (any can swap in):
  - Coupé et al. 2019
  - Instituto Cervantes 2025 (24.6 million learners)
  - MLA 2023
  - Rodrigo, Krashen and Gribbons 2004
  - Bisson 2013 and 2014
  - Markham and Peter 2003
  - Stewart and Pertusa 2004
  - Winke 2013
  - Montero Perez 2013, 2015 and 2022
  - Laufer and Ravenhorst-Kalovski 2010
  - Nation 2006
  - McBride 2011
  - Shintani et al. 2013
  - Gregg 1984
- **Product note** (from research-platforms B2): the English-only engine warning strings (`engineEnglishOnlyWarningTitle/Body`) exist in the ARB, but no Dart code uses them. The post tells Spanish readers to keep Universal and that the app does not warn them. Wiring up that warning would let the post drop that sentence.

## 5. Outdated tap-to-seek wording ("Tap a line to jump there" is off by default; long-press plays from a line)

- **`learn-english-with-audiobooks.md`**:
  - Line 40, step 3: change "that is **one tap** on the sentence instead of scrubbing back" to "that is **a long press** on the line instead of scrubbing back".
  - Line 90, first HushBook bullet: change "**Tap a word to hear it again.** Tap any word in the text and the audio jumps there, so replaying a sentence takes one tap instead of scrubbing back." to "**Long-press a line to hear it again.** The audio plays from that line, so replaying a sentence takes one press instead of scrubbing back."
  - Its registry `cta` (data/blog-posts.js line 918): change the heading to 'Hear it, see it, hear it again' and "Tap any word to replay it" to "Long-press a line to replay it".
- **The same "tap any word" claim is live in**:
  - abridged-vs-unabridged-audiobooks.md:38
  - are-audiobooks-good-for-adhd.md:79
  - are-audiobooks-good-for-dyslexia.md:63
  - are-audiobooks-good-for-kids.md:83
  - can-libby-read-to-you.md:106
  - does-reading-along-with-an-audiobook-help.md:94
  - free-read-along-audiobooks.md:9
  - how-to-focus-on-audiobooks.md:59
  - is-librivox-safe-and-legal.md:104

  One sweep to "long-press a line to play from there" fixes them all.

## 6. After publishing

1. Run `npm run build:blog`, then the `*.test.js` suite. `seo-preservation` and `seo-repair-contract` already fail on the old baseline.
2. Check the rendered HTML has 1 h1, 3 wide figures and 3 tables. The draft renders through the blog parser with no markdown leaks.
3. Ping IndexNow for the new URL, /blog, and the three posts that get links.
4. Request indexing in Search Console.
