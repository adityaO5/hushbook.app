# Research notes: best-brothers-karamazov-audiobook (2026-11-14)

Research only. Files: `scout.md` (gate result, phrasings, H2s, FAQ, SERP, links, risks), `research-platforms.md` (editions with the translation each reads, abridged and partial versions, sample transcriptions, translations on audio and edition matching, free sets and their reviews, the Grand Inquisitor and the long chapters, own data, names and pronunciation, listeners, HushBook, competitor errors, picks, table, sources, do-not-claim, unverified), `research-evidence.md` (book facts, translation evidence, read-or-listen block, Sources block, do-not-claim), this file, `scripts/`. Outside this folder only `docs/seo/keyword-research-2026-11-14.md` (the gate) was written. No post, no registry entry, no build, no commit.

## Method

- Same template and scripts as `../2026-11-13-best-jane-eyre-audiobook/`, with the translation layer of `../2026-11-11-best-crime-and-punishment-audiobook/` (sample transcription matched against the public-domain text) and `../2026-11-11-best-war-and-peace-audiobook/` (Kindle pairing). Every script names its parent in its header.
- Plain HTTP wherever it worked: autocomplete endpoints (Google chrome and firefox clients, YouTube, Bing, DuckDuckGo), DuckDuckGo HTML, Audible catalogue API, iTunes Search and Apple Books pages, OverDrive thunder API, LibriVox API and catalogue pages, archive.org metadata and advancedsearch, Arctic Shift, Crossref, OpenAlex, Europe PMC, Wikipedia raw wikitext, Wiktionary parse API, Project Gutenberg, the LRB, The New Yorker, PEN America, BBC programmes, Hallow and Goodreads pages, Amazon Kindle listings.
- Headless Chrome only for Audible product pages, Penguin UK, Google Play and hoopla. Every launch `headless: true`, `channel: 'chrome'`, `chromiumSandbox: true`, Playwright through `createRequire('D:/hushbook.app/package.json')`. No visible windows. Google was not tried.
- Generic User-Agents only ("Mozilla/5.0 (research script)", "research-script/1.0", stock Chrome and Firefox strings); no owner or project details in any request.
- Downloads each in their own new folder in the scratchpad (`book/dl-gutenberg-28054/`, `dl-gutenberg-28054-html/`, `dl-gutenberg-2554/`, `dl-gutenberg-8578/`, `dl-samples/`, `dl-pirie/`, `dl-gi-check/`, `dl-hallow-pdf/`); scripts kept in `book/scripts/` and copied here; Python always `-I`, paths passed as arguments. One slip: a two-line `python -c` hash comparison of the two partial Grand Inquisitor MP3s was run with the download folder as the working directory (the folder held only those two MP3 files; nothing was imported from it). Every other run used the scripts folder.
- DuckDuckGo HTML: 15 queries in the session (2 gate, 11 for the book, 2 for Hallow and "with text"), all HTTP 200, no bot check.
- Translation identification: 21 Audible US samples, first 150 s transcribed with faster-whisper large-v3-turbo (CPU int8, VAD, beam 1), scored against Gutenberg #28054 by 6-word shingles and against nine translations' first sentences (as printed by welovetranslations.com) by 4-word shingles. Garnett recordings scored 72 to 95%; the McDuff, P&V and Magarshack samples 0 to 1.5%. The P&V and McDuff samples both play the end of Dostoevsky's "From the Author" preface, which gave a same-passage comparison of the two translations.
- Blocked or bot-checked today: Libro.fm and Kobo (HTTP 403 to the renderer), ask.metafilter.com (Cloudflare), hotaudio.com (TLS "unrecognized name"), Macmillan's US product page (Cloudflare), goodnovel.com and buildlearn.com (404), Wiktionary (HTTP 429 on the first pass; retried slowly), Amazon's Audible add-on section ("Sorry, there was a problem loading this page"), Hallow's reading-plan PDF (image-only). Each is marked UNCHECKED where it matters.

## Dates pages were read

All on 2026-11-14, local time (+05:30), from the scratchpad files' timestamps: DDG gate and gate pages about 10:20; Audible catalogue 10:22 to 10:30; Gutenberg #28054 10:27; samples downloaded 10:32 and transcribed 10:33 to 11:12; autocomplete 10:33 to 10:41; LibriVox and archive.org 10:34 to 10:36; OverDrive and Apple 10:38 to 10:41; DDG book batch 10:44; competitor pages 10:46; Discover tiers 10:47; Audible and store renders 10:52; hoopla 10:55; Reddit about 10:56; Wikipedia, LRB, New Yorker, PEN, BBC about 10:57; Crossref, OpenAlex and Europe PMC about 10:58 to 11:00; Kindle listings 11:00; Hallow 11:02; Wiktionary 11:03 and 11:08; Audies 11:09; HTML recount 11:11; Peery and Pirie timing test after 11:15. HushBook source read at D:\hushbook HEAD `d2ed665` (2026-11-12 13:13 +0530; the same HEAD as the Jane Eyre research); site copy at D:\hushbook.app HEAD `ee1f7e7` (2026-11-13). Search Console: `~/hushbook-seo/gsc/2026-11-13/` (data to 2026-11-11).

Reused, not re-derived: the read-or-listen studies verified 2026-11-11 and Feng 2013 verified 2026-11-07 (DOIs re-resolved in Crossref today); the 2026-11-11 book-lane autocomplete caches (session `9b795cca…/scratchpad/books/ac-google.json`, `ac-bing.json`, `ac-ddg.json`, key "the brothers karamazov"), read and merged, not refetched.

## Scripts (`scripts/`)

| Script | What it does | Parent |
|---|---|---|
| `ddghtml.mjs` | DuckDuckGo HTML SERP probe | copied unchanged (Jane Eyre) |
| `pages.mjs` | Fetches competing pages; dates, headings, words, names, runtimes | JE `pages.mjs` (NAMES changed) |
| `bk-ac.mjs` | Autocomplete, 5 engines, 123 seeds on two stems (+ a..z on both Google clients and both stems) | JE `je-ac.mjs` |
| `bk-group.mjs` | Merges today's and the 11-11 caches, removes noise, groups (translation, Grand Inquisitor, Zosima, spoilers kept apart), lists rel ≥ 1250 | JE `je-group.mjs` |
| `bk-groups-for-scout.py` | Formats the groups for scout.md (film cut, Star Wars removed from the Grand Inquisitor group) | new |
| `bk-audible-catalog.mjs` | Audible catalogue API, 4 markets, 31 keyword sets, authors kept in full | JE `je-audible-catalog.mjs` |
| `bk-audible-products.mjs`, `bk-audible-table.mjs`, `audible-product-dump.mjs` | Product records by ASIN; compact table with an authors/translators column; full dump | JE (table adds authors) |
| `bk-render.mjs` | Headless render of Audible, Penguin, Google Play and hoopla pages | JE `je-render.mjs` (unchanged) |
| `bk-apple.mjs` | iTunes Search API + Apple Books schema.org | JE `je-apple.mjs` |
| `bk-overdrive.mjs` | Libby (OverDrive) catalogues of 5 systems, 3 queries, translator column | JE `je-overdrive.mjs` |
| `bk-hoopla.mjs` | hoopla search and title pages (headless) | JE `je-hoopla.mjs` |
| `bk-kindle-pairing.mjs` | Kindle listings and the Audible narration add-on | W&P `wp-kindle-pairing.mjs` |
| `bk-librivox-detail.mjs` | Every LibriVox Karamazov and Grand Inquisitor project: catalogue, archive.org, files with lengths, artist tags, full reviews | JE `je-librivox-detail.mjs` |
| `bk-ia-reviews.py` | Prints an archive.org item's reviews character for character | JE `je-ia-reviews.py` |
| `bk-discover-cards.mjs`, `bk-discover-expanded.mjs` | HushBook Discover's first and second search tiers | JE `je-discover-cards.mjs`, `je-discover-expanded.mjs` |
| `bk-reddit.mjs` | Arctic Shift title search in 12 subreddits and threads by id, with comments | JE `je-reddit.mjs` |
| `bk-audies.mjs` | Scans all Audie year pages for terms | JE `je-audies.mjs` |
| `bk-wordcount.py` | Word counts, parts, books, chapters, the Grand Inquisitor and Book VI, listening times, pace per recording, dialogue, longest speech, sentence length, the same measures on Crime and Punishment (`--cp`), names | JE `je-wordcount.py` + C&P `gutenberg-wordcount.py` rules |
| `bk-recount.py` | Independent recount from the HTML edition with a different parser and tokenizer | new |
| `bk-names-extra.py` | Extra name forms with first chapter, counts by book and contexts | new (loads `bk-wordcount.py`) |
| `bk_sample_check.py` | Transcribes Audible samples; Garnett overlap and nine translations' first sentences | JE `je_sample_check.py` + C&P `garnett_match.py` |
| `bk_same_recording.py` | Timing test: is the Hexagon "Bruce Peery" listing Pirie's LibriVox recording? | new |
| `bk-wiktionary-ipa.py` | Russian IPA for the main names from Wiktionary | new |
| `bk-crossref-check.py` | Crossref + OpenAlex for 13 DOIs | JE `je-crossref-check.py` |
| `bk-openalex-search.py` | Finds candidate scholarly sources on the translations | new |
| `bk-htmltext.py`, `bk-pdftext.py` | Readable text of a saved HTML page (with a pattern filter); PDF text | JE `je-htmltext.py`, `je-pdftext.py` |

Reproduce the main numbers (each input in its own folder):
```
python -I scripts/bk-wordcount.py <dir>/pg28054.txt --cp <dir2>/pg2554.txt
python -I scripts/bk-recount.py <dir3>/pg28054-images.html
python -I scripts/bk-names-extra.py scripts <dir>/pg28054.txt "Mitya" "Misha" "Païssy"
python -I scripts/bk_sample_check.py <samples dir> <dir>/pg28054.txt <out.txt> 150 8
python -I scripts/bk_same_recording.py <samples dir>/peery_B0BDP54D6M.mp3 <pirie dir>/pirie_01_head.mp3 200 8
node scripts/bk-discover-cards.mjs "brothers karamazov"
node scripts/bk-discover-expanded.mjs "brothers karamazov"
node scripts/bk-group.mjs <ac dir> <2026-11-11 books dir>
python -I scripts/bk-ia-reviews.py <lv-detail dir>/meta_brothers_karamazov_v3_2002_librivox.json
```

## Decisions made in the research

- **Gate:** Karamazov passes (only audiobook comparison from 2023; the 2026-modified page compares print translations). Anna Karenina and Les Misérables were not re-gated.
- **Word count:** 349,788 (Garnett, our rules); 349,820 by the HTML recount; publish "about 350,000 (349,788 by our count)". Listening times at 151 wpm as the site does.
- **Extra data angle: the Grand Inquisitor** (where it sits and how long it runs), chosen from the autocomplete: 73 phrasings about the chapter and Book V, three top completions, and no ranking page that gives its length or position. Names and "is it hard" are covered too, but as the template's names table and hard-to-read H2.
- **Picks:** Thompson best overall (owner may prefer Gregory: see below); Gregory most rated and best Garnett; Miles for P&V; Pirie best free; Miles on hoopla best to borrow.
- **Translation verdicts by sample**, not by listing: Davidson is Garnett (a competitor says P&V); the Hexagon "Peery" listing is Garnett (its blurb is McDuff's).
- **Accent:** only as sourced (Miles: AudioFile via Audible; Davidson: Reddit OP; others "according to We Love Translations").
- **Names table:** facts told by Book III at the latest, except Kolya (Book X, introduction only); Smerdyakov's parentage, deaths, illness, the money, the night of the murder, investigation and trial left out.
- **Spellings:** Garnett's ("Zossima", "Pavlovitch") when quoting her or the free recordings; modern ("Zosima") in general prose.

## For the orchestrator or owner to decide

1. **Best overall: Luke Thompson or Constantine Gregory?** Gregory has 5,910 US ratings to Thompson's 858; Thompson has the higher performance score (4.9 to 4.7), is the searched narrator (a top completion), matches the Penguin Classics edition and is Reddit's favourite since 2021. The brief picks Thompson and calls Gregory "the most rated".
2. **An archive.org upload that looks like an unauthorized copy of a commercial recording:** "The Brothers Karamazov - Dostoevsky (Full Audio Book)", identifier `TheBrothersKaramazovFyodorDostoyevskyPart3`, creator "Victorian Vault", uploaded 2019, collections `cratediggers` and `folksoundomy`, three MP3s totalling about 28 hours, description "Translated by Constance Garnet" followed by Blackstone's publisher blurb for Frederick Davidson's recording ("After spending four years in a Siberian penal settlement…"). It ranks on DuckDuckGo for five of our queries. **HushBook Discover does not show it** (wrong collection for the Internet Archive tier; second tier checked too). The post must not mention it.
3. **Audible sells Bruce Pirie's free LibriVox reading** as "Bruce Peery" (Hexagon Tech, Audible Plus per Reddit, "(P)2021 Hexagon Tech"), with Penguin's McDuff blurb on a Garnett recording; a Reddit thread (2026-02-22) says the listing carries an "Only on Audible" tag. Our timing test (research-platforms.md 2c) supports the Reddit replies: nine sentence openings line up within 0.24 s over two minutes, so it is the same recording, minus the LibriVox notices. Owner's call whether the post says "the same reading is sold on Audible under the name Bruce Peery" (useful to listeners, factual if 2c holds) or leaves it out.
4. **Hallow:** the 2026 Hallow Edition (Lent "Pray40") prints Garnett, so "Hallow edition audiobook" searchers can use any Garnett recording, including the free ones. Whether the Hallow app has its own audio: unchecked. Optional FAQ.
5. **Competitor read-along services in the SERP:** compendium.audio ("Text on screen as you listen", 33 hr 36 min, first chapter free, then Premium) and loudreader.io (device voices). For awareness only; the post names neither.
6. **People Also Ask / AI Overview:** please check `best brothers karamazov audiobook`, `brothers karamazov translations` and `what chapter is the grand inquisitor in the brothers karamazov` in a normal browser.
7. **Listening checks someone with access could do:** how Thompson, Miles and Gregory say "Alyosha", "Karamazov" and "Smerdyakov"; whether the BBC dramatisation includes the Grand Inquisitor; the BBC Karamazov's own runtime.
8. **Inbound links** (link-only): `best-crime-and-punishment-audiobook.md:155`, `abridged-vs-unabridged-audiobooks.md:32`, `how-long-is-an-audiobook.md:3`, `how-to-keep-track-of-characters-in-a-book.md:11`; details in scout.md.
9. **Oddity:** the Grand Inquisitor files of LibriVox Version 1 (credited to Bob Sherman) and Version 3 (Bruce Pirie) differ in length by 0.03 seconds; their first 500 KB differ byte for byte. Not used in the post; LibriVox may want to know if one is a reuse.
10. **Length:** eight candidate H2s plus the HushBook section; scout.md suggests folding the "other famous chapters" H3 into H2 4 if the post runs long.
