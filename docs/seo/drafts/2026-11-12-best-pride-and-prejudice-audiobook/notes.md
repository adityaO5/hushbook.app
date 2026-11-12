# Research notes: best-pride-and-prejudice-audiobook (2026-11-12)

Research only. Files: `scout.md`, `research-platforms.md`, `research-evidence.md`, this file, `scripts/`. Nothing outside this folder was touched; no post, no registry entry, no build, no commit.

## Method

- Same template and scripts as `../2026-11-11-best-war-and-peace-audiobook/` and `../2026-11-11-best-crime-and-punishment-audiobook/`, copied and adapted (each script names its parent in its header).
- Plain HTTP wherever it worked: autocomplete endpoints, DuckDuckGo HTML, Audible catalogue API, iTunes Search and Apple Books pages, OverDrive thunder API, LibriVox API, archive.org metadata and advancedsearch, Arctic Shift (Reddit), Crossref, OpenAlex, Europe PMC, Wikisource and Wikipedia APIs, Project Gutenberg, podcast RSS feeds, publisher pages, audiopub.org, kirkusreviews.com.
- Headless Chrome only where pages are client-rendered or refuse curl: Audible product pages (whispersync tag, buy box), hoopla, Libro.fm, Chirp, Kobo, Spotify. Every launch `headless: true`, `channel: 'chrome'`, `chromiumSandbox: true`, Playwright loaded through `createRequire('D:/hushbook.app/package.json')`. No visible windows.
- Generic User-Agents only ("Mozilla/5.0 (research script)", "research-script/1.0", a stock Chrome string); no owner or project details in any request.
- Downloads each in their own new folder in the scratchpad (`pp/dl-gutenberg-1342/`, `pp/dl-gutenberg-42078/`, `pp/dl-richardson/`, `pp/dl-noiser-rss/`, `pp/dl-bnt-rss/`, `pp/dl-gutenberg-page/`); scripts kept in `pp/scripts/` and copied here; Python always `-I`, paths passed as arguments.
- Network: the run was interrupted once at the start (coordinator message); every later fetch succeeded on first try or with the scripts' built-in retries. No DNS failures after the restart.

## Dates pages were read

All on 2026-11-12 (local times approximate, from file timestamps): autocomplete 10:45 to 10:55; LibriVox, archive.org and Discover simulation about 10:50; Audible catalogue and products 10:55 to 11:00; Apple, OverDrive, hoopla 11:00 to 11:05; SERP batch 1 at 11:00, batch 2 at 11:15, batch 3 at 11:30; Reddit 11:05 to 11:15; Kobo, rendered Audible pages, Naxos, Penguin, Kirkus, podcasts, BBC pages 11:10 to 11:30; Crossref/OpenAlex/Europe PMC, Gutenberg letters and Wikisource 11:20 to 11:40. HushBook source read at HEAD `c0040d1` (committed 2026-11-05; working tree has uncommitted `lib/l10n` edits in other languages; citations are to HEAD files, English strings unchanged). Live App Store version 1.3.5 (2026-10-30), read today.

Reused, not re-checked today (per the brief): the nine Crossref/ERIC-checked studies from `../2026-11-11-best-war-and-peace-audiobook/research-evidence.md` section (f) (checked 2026-11-11), and the APS-release detail for Reichle et al. 2010 from `../2026-11-07-why-cant-i-focus-on-reading/research-evidence.md`. The 2026-11-11 book-lane autocomplete caches (session `9b795cca…/scratchpad/books/`) and the 2026-11-10 firefox lane (`79be317d…/scratchpad/lane-books/ac-gff.json`) were read, not refetched.

## Scripts (`scripts/`)

| Script | What it does | Parent |
|---|---|---|
| `pp-ac.mjs` | Autocomplete sweep, 5 engines, 69 seeds (+ a-z for Google) | `wp-ac.mjs` |
| `pp-group.mjs` | Merges today's and earlier caches, removes noise, groups into H2/FAQ buckets, lists rel ≥ 1250 | `wp-group.mjs` |
| `ddghtml.mjs` | DuckDuckGo HTML SERP probe | copied unchanged |
| `pages.mjs` | Fetches competing pages; dates, headings, words, names, runtimes | `pages.mjs` (names list changed) |
| `pp-audible-catalog.mjs` | Audible catalogue API, 4 markets, 23 keyword sets | `wp-audible-catalog.mjs` |
| `pp-audible-products.mjs` | Audible product records by ASIN | `wp-audible-products.mjs` |
| `audible-product-dump.mjs` | Prints product records | copied from the Crime and Punishment folder |
| `pp-audible-table.mjs` | One-line table per product, with accent/award phrases from summaries | new |
| `pp-apple.mjs` | iTunes Search API + Apple Books page schema.org | `wp-apple.mjs` |
| `pp-overdrive.mjs` | Libby (OverDrive) catalogues of 5 library systems | `wp-overdrive.mjs` |
| `pp-hoopla.mjs` | hoopla search and title pages (headless) | `wp-hoopla.mjs` |
| `pp-render.mjs` | Headless render of pages (Audible whispersync tag, buy box) | `wp-render.mjs` |
| `pp-reddit.mjs`, `pp-reddit-ids.mjs` | Arctic Shift title search and threads by id, with comments | `wp-reddit.mjs` |
| `pp-librivox-detail.mjs` | Every LibriVox P&P project: catalogue, archive.org, chapter files, artist tags | `wp-librivox-detail.mjs` |
| `pp-discover-cards.mjs` | HushBook Discover's exact search for a title, merged as the app merges, with card lines and identifiers | `wp-discover-cards.mjs` |
| `pp-audies.mjs` | Scans all Audie year pages for a title | new (yesterday's scan had no saved script) |
| `pp-podcast-feed.mjs` | Sums episode durations in a podcast RSS feed | new |
| `pp-grep-pages.mjs` | Prints text around terms in saved HTML | new |
| `pp-wordcount.py` | Word counts, chapters, volumes, listening times, pace per recording, dialogue share (overall and per volume), unattributed speech, Darcy's letter, name forms | `wp-wordcount.py` |
| `pp-contexts.py` | Every occurrence of a name form with chapter and context (to assign each "Miss Bennet" by hand) | new |
| `pp-crossref-check.py` | Crossref + OpenAlex for the four new DOIs | `wp-crossref-check.py` |

The War and Peace sample-transcription scripts were not used: this book has no translation to identify. No sample was listened to or transcribed, so no accent was measured.

Reproduce the main numbers:
```
python -I scripts/pp-wordcount.py <folder>/pg1342.txt "Rosamund Pike=11:35:00" …
node scripts/pp-discover-cards.mjs "pride and prejudice"
node scripts/pp-group.mjs <ac dir> <2026-11-11 books dir> <2026-11-10 ac-gff.json>
```

## Decisions made in the research

- **Word count:** keep the site's 121,676 (ours 121,850, 0.1% apart; method in research-platforms 3a). Listening times use 151 wpm as the site does.
- **Chapters:** 61; three volumes of 23, 19, 19 (Wikisource 1813 transcription, checked by first sentences against #1342).
- **"Miss Bennet":** 65 uses, assigned by hand from context: 39 Jane, 26 Elizabeth (11 of them in Ch. 56). Recount before publishing if the post gives the split.
- **Picks:** Pike best overall; Stevenson runner-up; Karen Savage (LibriVox v3) best free; the Audible Original best dramatised but flagged as an adaptation; no verified American-accent pick (American narrators named instead); Kellgren best to borrow.
- **Julie Andrews:** treated as real and, on Noiser's word, unabridged; free podcast, not an audiobook product.

## For the orchestrator or owner to decide

1. **HushBook Discover shows a probable copyright problem for this title.** Searching "pride and prejudice" puts an Internet Archive upload titled "JANE AUSTEN Pride And Prejudice [ Stevenson]" (collection `audio_bookspoetry`, uploaded 2023) at card 4, between the LibriVox versions. It looks like a copy of Juliet Stevenson's commercial recording. The post must not mention it; the owner may want to look at Discover's Internet Archive filtering. (Card 2 is an item in archive.org's "gutenberg-audiobooks" collection; card 6 an untitled item whose identifier, `pride_and_prejudice_1005_librivox`, resembles LibriVox version 4's; contents of both not checked.)
2. **Accent.** If the post is to name an "American accent" recording, someone has to listen to the samples of Kate Reading (Apple), Flo Gibson (Audible), Katherine Kellgren (Libby) and Elizabeth Klett (LibriVox v4). Until then: "American narrator".
3. **Timing.** A Netflix series adapted by Dolly Alderton is announced on Penguin UK's listing; Audible US has a tie-in dated 2026-11-19. Publishing before then catches the rise.
4. **People Also Ask** for `best pride and prejudice audiobook`, `pride and prejudice audiobook american accent` and `pride and prejudice audiobook length`: please check in a normal browser.
5. **Length of the post.** Twelve candidate H2s in scout.md; scout suggests which to merge to reach 8 to 10.
6. **Images:** an existing app render, `tools/mockups/out/en-player-pride-prejudice.png`, shows the P&P player; `can-kindle-read-to-you-read-along.webp` already uses P&P chapter 1 in read-along (do not reuse that embed; render a new one).

## "Miss Bennet" recount (wiring agent, 2026-11-12)

Independent recount before publishing, done blind (the earlier assignment was not read until the tally was finished). Fresh download of Gutenberg #1342 (`pg1342.txt`, 772,386 bytes, SHA-256 3f6bb9d6…af9d75) into a new scratchpad folder; `scripts/pp-contexts.py` run with `-I` and the pattern `Miss Bennet`, which already excludes the plural "Miss Bennets" (the `(?![\w])` guard) and keeps the possessive "Miss Bennet's". Each of the 65 hits was read with 500 characters of context and assigned by hand.

- **65 uses in the novel**: Jane 39, Elizabeth 26. The whole file has 67: the other two are the list of illustrations and the illustration caption "A note for Miss Bennet", both outside the story.
- **Elizabeth, by chapter**: 10 (4: Darcy twice, Bingley twice), 16 (2, Wickham), 18 (Darcy), 29 (2, Lady Catherine, including "Do you play and sing, Miss Bennet?"), 31 (3, Lady Catherine), 32 (narration, Darcy's call), 37 (narration, Lady Catherine's remark), 44 (narration, Darcy's invitation), 56 (11, all Lady Catherine).
- **Chapter 56** has 12 uses: 11 Elizabeth, plus one Jane ("Bingley instantly prevailed on Miss Bennet" before Lady Catherine arrives).
- **Chapters 1 to 9**: 11 uses, every one Jane.

Matches the post (65; 39 Jane; 26 Elizabeth; 11 of Elizabeth's in Chapter 56; Chapters 1 to 9 all Jane), the who-is-speaking image and research-platforms.md section 3. No figure changed.

## Review fixes 2026-11-12

Applied to the live post (`content/blog/best-pride-and-prejudice-audiobook.md`) and its registry entry after an editorial review. No build, test, image or commit.

- **Accent (fix 1).** Source: archive.org `/metadata/` responses saved by the reviewer on 2026-11-12 (`prideandprejudice_1005_librivox.json`, `pride_prejudice_krs_librivox.json`), read with `python -I` from a separate scratchpad folder. Checked character for character as substrings of `reviewbody`: Klett v4, 2010-05-05 (reviewer "Sorker", 5 stars): "She narrates with an American accent yet, to my ear, nails the dialog with perfect expression, tempo, and accent." and "It certainly does help us quickly distinguish (as could a reader of the book itself) when the piece is changing from narration to dialog."; 2010-10-28 ("ListeninginChicago", 5 stars): "I think the American / British accents worked wonderfully." Savage v3, 2009-04-19 ("David Sanchez", 4 stars), full review read: "Karen Save brings a nice British accent, very different from other Audiobooks. Sometimes she looses it a bit, and American English comes in (Especially in vowels), but most of the time she manages to give an adequate old-fashioned speech". The post quotes only "a nice British accent" and paraphrases the vowel caveat. The section now answers "Yes" with Klett's v4; Reading, Gibson and Kellgren stay as "American narrators whose accent for Austen we could not confirm". The "Sound" bullet says the accents are reviewers' words. Supersedes "For the orchestrator or owner to decide" item 2 and research-platforms 1f/7 ("none verified").
- **Sisters (fix 2).** Order from #1342 (same file, SHA-256 3f6bb9d6…af9d75): Jane "her eldest daughter" (Ch. 3), Elizabeth "equally next to Jane in birth" (Ch. 15), "The two youngest of the family, Catherine and Lydia" (Ch. 7), Lydia "though I _am_ the youngest" (Ch. 2); Mary third by elimination. New script `scripts/pp-sisters.py`, adapted from `pp-wordcount.py` (same chapter extraction and whole-word `count()`; guards reproduce Kitty 71 and Catherine-without-Lady 10). Results: Mary 39, of which "Mary King" 2 (a different young woman, Ch. 39), so Mary Bennet 37; "Miss Mary" 0; Lydia 170, "Miss Lydia" 4. "Mrs. Wickham" left out of the table (spoiler).
- **YouTube (fix 3).** Paragraph in the free section from research-platforms 1c and 2b only; the Jennifer Ehle bullet in "What we could not verify" removed as a duplicate. Added her oEmbed-verified video URL to Sources.
- **FAQs (fix 4).** Seven, each ≤40 words (39, 32, 31, 39, 37, 39, 39). Dropped the full-cast and chapters FAQs (facts stay in takeaways and body). The best-narrator answer now says "highest average among editions with over 100 ratings", because Adjoa Andoh's 5.0 from 6 is higher. The reading-ease paragraph now opens "not hard to read by the usual measure".
- **E-book sync (fix 5).** Wording follows `best-wuthering-heights-audiobook.md` ("attach a matching DRM-free EPUB, PDF or TXT … e-book sync (in beta, first sync free) aligns … word by word"); sources app_en.arb 2113-2114, ebook_sync_allowance.dart, audiobook-with-text.html line 67.
- **Fixes 6 to 12.** Beckinsale surfaced in the best-free H3; Lindsay Duncan removed from "Other free ways" (the could-not-verify bullet now says what the page showed); "two of LibriVox's free solo readings"; Kellgren year "Not listed"; alts cut to 161 to 247 characters; six outbound pick links (URLs already in Sources); five generic study bullets replaced by two sentences (Clinton-Lisell 2022, Varao Sousa 2013), Kopp and D'Mello 2016, Clinton-Lisell 2023 and Hui and Godfroid 2026 removed from Sources; quotes dropped for Duncan, Fox, Kate Reading, Kellgren, "singlehandedly" and Klett's "voice of Lizzy" (the post had misquoted "Lizzie" as "Lizzy").
- **Kept as is.** `description` (llms.txt line 41 mirrors it, and "the American narrators" is still in the post); takeaways (no stated fact changed).
- **Self-check** (scratchpad `ppfix/selfcheck.cjs`): no dashes outside quotes, alts ≤250, FAQs ≤40 words, 6 internal links all present in content/blog, outbound body links all in Sources, tables well formed, every FAQ/takeaway number in the body, metaTitle 58, metaDescription 155, description 236. Body 5,564 words by the `registry-entry.mjs` method: readingTime 25 min (was 24).
