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
