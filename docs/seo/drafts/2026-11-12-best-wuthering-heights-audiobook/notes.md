# Research notes: best-wuthering-heights-audiobook (2026-11-12)

Files: `scout.md` (phrasings, film question, SERP, H2s), `research-platforms.md` (editions, free sets, Joseph, frame, own data, names, listeners, HushBook, picks, table, sources, do-not-claim, unverified), `research-evidence.md` (book facts, read-or-listen studies, accent and text studies, Sources block), `scripts/`. Research only: no post, no site files touched outside this folder, no build, no commit.

## Dates

Every page, API response and download was read on **2026-11-12** (one session). Reused material: the nine read-or-listen studies verified on 2026-11-11 in `../2026-11-11-best-war-and-peace-audiobook/research-evidence.md` (their DOIs re-resolved in Crossref today); the 43-call book-lane autocomplete sweep of 2026-11-11 (session scratchpad `9b795cca…/scratchpad/books/`), merged into today's grouping.

## Method, in run order

1. **Autocomplete** (`wh-ac.mjs`, 76 seeds plus "wuthering heights audiobook a..z" on the two Google clients): Google chrome and firefox 102 calls each, YouTube, Bing and DuckDuckGo 76 each, 432 calls, plain HTTP. A network drop interrupted the first pass (11 Google chrome and 11 Bing queries failed after three attempts each; YouTube and DuckDuckGo had not run); the script caches per query, so the rerun filled every call. Grouped with `wh-group.mjs` (the first version's noise pattern `ring\b` matched "wuthe-ring" and swallowed everything; fixed, and the script now warns about it).
2. **SERP** (`ddghtml.mjs`, DuckDuckGo HTML, 12 queries, all HTTP 200) and page outlines (`wh-pages.mjs`). The Guardian URL in the SERP was truncated; fetched directly with curl. Google, People Also Ask and AI Overview not checked.
3. **Film facts** from warnerbros.com (curl; the about text sits in the page's JSON). Cast and director narrator searches and "tie-in" keyword searches on Audible (`wh-audible-narrators.mjs`). Penguin UK tie-in and audio pages by curl.
4. **Audible** catalogue sweep (`wh-audible-catalog.mjs`, 4 stores, 458 products), product records (`wh-audible-products.mjs` + `audible-product-dump.mjs`), eight US pages and one UK page rendered (`wh-render.mjs`, headless Chrome, `chromiumSandbox: true`, `channel: 'chrome'`, Playwright via `createRequire('D:/hushbook.app/package.json')`).
5. **Apple Books** (`wh-apple.mjs`, 15 terms, 103 listings with schema.org data), **Libby** (`wh-overdrive.mjs`, 5 systems), **hoopla** (`wh-hoopla.mjs`, headless, 33 title pages), **Kobo** (curl, first page). Libro.fm and Chirp blocked (403); Spotify needs a login.
6. **LibriVox** (`wh-librivox-detail.mjs`, 3 projects; archive.org downloads by advancedsearch) and **HushBook Discover** (`wh-discover-cards.mjs`, the app's own queries).
7. **Text** (`wh-wordcount.py` on Gutenberg #768, SHA-256 `e533fe75…5c02`): counts, chapters, speeds, recording paces, the Lockwood/Nelly split (16 anchor phrases), Joseph (candidates from a dialect lexicon, speakers labelled by hand after `wh_dialect_review.py` printed each span with its narration), names. 1847-versus-1850 spelling: one passage compared in archive.org OCR of the 1848 Harper and 1889 Smith, Elder editions. Charlotte's letter from Gaskell (Gutenberg #1700).
8. **Samples** (`wh_sample_voice.py`): 13 Audible samples downloaded to their own folder; 10 analysed (faster-whisper large-v3-turbo CPU int8, librosa YIN pitch, 6-word overlap with #768). The first run at 240 s per sample was too slow and was stopped after two; the rest ran at 120 s each. `wh_condensed_check.py` produced the Literati diff (242 of 493 words unheard).
9. **Naxos** page and PDF booklet (curl with a browser User-Agent and referer; the booklet returned 403 to the research User-Agent). Text via pypdf.
10. **Reddit** (`wh-reddit.mjs`, then `wh-reddit-comments.mjs` because the first comment calls failed during the network drop).
11. **Audies** (`wh-audies.mjs`, 31 year pages from audiopub.org's winners index).
12. **Studies** (`wh-crossref-check.py`: 8 reused DOIs + 7 new, OpenAlex abstracts, ERIC EJ1403866); Wiltshire 2005 found by Crossref bibliographic query; Mitterer and McQueen's sample size from the Europe PMC full text (PMC2775720).
13. **HushBook source** re-read at D:\hushbook HEAD c0040d1 (pubspec 1.3.5+70); site copy checked at D:\hushbook.app HEAD (`git show HEAD:…`, since several root HTML files have uncommitted edits); live App Store lookup.

## Scripts (this folder)

Adapted from the War and Peace / Crime and Punishment folders: `wh-ac.mjs`, `wh-group.mjs`, `ddghtml.mjs` (copy), `wh-pages.mjs`, `wh-audible-catalog.mjs`, `wh-audible-products.mjs`, `audible-product-dump.mjs` (copy), `wh-render.mjs`, `wh-apple.mjs`, `wh-overdrive.mjs`, `wh-hoopla.mjs`, `wh-librivox-detail.mjs`, `wh-discover-cards.mjs`, `wh-reddit.mjs`, `wh-crossref-check.py`, `wh-wordcount.py`, `wh_sample_voice.py`. New today: `wh-audible-narrators.mjs`, `wh-audies.mjs`, `wh-reddit-comments.mjs`, `wh_dialect_review.py`, `wh_condensed_check.py`.

Run Python with `python -I`; keep every download in its own new folder outside the repo.

## Scratch locations (outside git)

`C:\Users\rakes\AppData\Local\Temp\claude\34842c9e8e99357b\2655ba97-6b0e-423c-ae20-7a39a3abf5ce\scratchpad\`: `wh\` (autocomplete caches `wh-ac.json`, `wh-ac-bd.json`; `groups.md`; `serp.json`; `aud-cat.jsonl`; `wc.txt`; `voice.txt`; `review.txt`; `reddit.txt`; `audies.txt`; `crossref.txt`), `whp-audible\`, `whp-prod-us\`, `whp-prod-bfb\`, `whp-prod-bbc\`, `whp-narr\`, `whp-apple\`, `whp-od\`, `whp-lv\`, `whp-render\`, `whp-samples\`, `whp-pages\`, `whp-pub\`, `whp-pdf\`, `whp-reddit\`, `whp-audie\`, `whp-film\`, `whp-stores\`, `whp-titles\`, `whe-crossref\`, and download folders `wh-gutenberg-dl\`, `wh-gaskell-dl\`, `wh-ia-dl\`.

## Judgement calls for the writer

- **Picks** (research-platforms section 9): Froggatt best overall (most-rated by far, 4.8 performance, the searched name); Stevenson highest rated; Naxos McTeer/Timson best two-voice and borrowable; Ruth Golding best free; BBC Radio 4 best dramatisation, LibriVox dramatic reading best free full cast.
- **Do not frame the post as a film tie-in.** One FAQ; the Aimee Lou Wood row and a line in the narrator H2.
- **Joseph section** is the differentiator: our 1.56% / 12 minutes, Charlotte's letter, the reviews, the accent studies, then the read-along line. Owner rule applies: no HushBook limits, scope the claim to "a matching DRM-free e-book" for sync.
- **Lockwood in a female voice** is a real listener complaint (Reddit ul16bc) and a clean comparison column ("voices for Lockwood / Nelly").
- **Naxos role split** is measured, not stated; phrase as "a male voice reads Lockwood".
- **Owner's no-dash rule** (last two posts): the Guardian and Independent titles contain en dashes; adjust in Sources.

## Review fixes 2026-11-12

Applied to the live post and its registry entry after an editorial review. No build, tests or commit (the orchestrator builds).

- **Script:** `scripts/wh-review-fixes.py` (loads `wh-wordcount.py`; run `python -I wh-review-fixes.py <pg768.txt> [<josephs-speech.html>]`). It rebuilds Joseph's 42 speeches (1,814 words, unchanged), counts glossary forms, prints who narrates each chapter from the 16 anchors, and locates every quote used below. Fan-site page saved by the reviewer; glossary page fetched today with a generic User-Agent into its own scratch folder.
- **Joseph translated (fix 1):** plain-English column on the first-lines table (our wording, close to wuthering-heights.co.uk's). Glossary of every form he uses 7+ times: t'/th' 83, yah/ye 64, o' 26, maister 23, un/und 21 (excludes "'un" = one), i' 15, wi' 10, nowt 10, wer 10, hev 8, mun 7, shoo 7, soa 7. owt occurs 0 times, so it is not listed. Meanings from the site's "Joseph's Speech" translations and Glossary page (nowt = naught; owt = aught; yah = ye; thear = there; un, und = and). The fan page now has 13 chapter headings (it had 11 at research time) and covers 29 of his 42 speeches (1,569 of 1,814 words) by a first-18-letters match, so the post says 29 of 42, not "all".
- **H2 split (fix 2):** new anchors `who-narrates-wuthering-heights`, `what-is-joseph-saying-in-wuthering-heights`; H3s under each. No repo file linked the old anchors except the generated HTML (rebuilt by the build).
- **Chapter narrators (fix 3):** chapter table from the anchors. Lockwood breaks are five, not eight, because the end of 9 runs into 10 (85 + 422 words) and the end of 14 into 15 (82 + 63); others: end of 7 (675), middle of 8 (120), start of 25 (340). End of 30 (81 words, "the second week in January"), all of 31 (the visit where he gives notice), start of 32 ("1802.—This September", 1,774 words), last 372 words of 34.
- **No spoilers (fix 4):** every marriage and parent in the tree is in Chapters 2 to 4 (and Frances as Hindley's wife in the Chapter 3 diary), except Frances as Hareton's mother, which is plain only at his birth (Ch. 8); the post says so. Edgar's father as "Mr. Linton" is Ch. 6, now cited.
- **FAQs (fix 5):** two-narrators FAQ dropped; added free audiobook and hard-to-read; Joseph answer carries the translated first line.
- **Small fixes (fix 6):** Hareton (Ch. 7 to 8); five Libby systems named; Donada Peters has no pace figure (not on Audible; the pace script used Audible and LibriVox runtimes); Fulford-Brown Spotify note.
- **Alts (fix 7):** 228, 212, 250, 224 characters.
- **Picks linked (fix 8);** generic study bullets replaced by two cited sentences (fix 9), Kopp and D'Mello, Clinton-Lisell 2023 and Hui and Godfroid removed from Sources; low-information quotes cut (fix 10), Reddit px6ykl and thehemingwaylist removed from Sources. Glossary page added to Sources.
- **Result:** body 6,181 words, `readingTime: '28 min read'`; six internal links; self-check clean (dashes only inside quotes, tables well formed, Joseph table sums to 1,814).
