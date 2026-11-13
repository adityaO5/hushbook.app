# Research notes: best-jane-eyre-audiobook (2026-11-13)

Research only. Files: `scout.md` (gate result, phrasings, H2s, FAQ, SERP, links, risks), `research-platforms.md` (editions, samples, free sets and their reviews, the French, own data, names and pronunciation, listeners, HushBook, competitor errors, picks, table, sources, do-not-claim, unverified), `research-evidence.md` (book facts, French evidence, read-or-listen block, Sources block, do-not-claim), this file, `scripts/`. Outside this folder only `docs/seo/keyword-research-2026-11-13.md` (the gate) was written. No post, no registry entry, no build, no commit.

## Method

- Same template and scripts as `../2026-11-12-best-wuthering-heights-audiobook/` and `../2026-11-12-best-pride-and-prejudice-audiobook/`, copied and adapted (each script names its parent in its header). The translation-matching scripts of the Crime and Punishment folder were not needed: Jane Eyre has no translation layer.
- Plain HTTP wherever it worked: autocomplete endpoints, DuckDuckGo HTML, Audible catalogue API, iTunes Search and Apple Books pages, OverDrive thunder API, LibriVox API and catalogue pages, archive.org metadata and advancedsearch, Arctic Shift, Crossref, OpenAlex, Wikisource and Wikipedia APIs, Project Gutenberg, Naxos page and booklet, OpenEdition, Spotify/SoundCloud/YouTube oEmbed, Kobo search, audiopub.org.
- Headless Chrome only for Audible product pages and hoopla. Every launch `headless: true`, `channel: 'chrome'`, `chromiumSandbox: true`, Playwright through `createRequire('D:/hushbook.app/package.json')`. No visible windows. Google was not tried (it bot-checks automated browsers).
- Generic User-Agents only ("Mozilla/5.0 (research script)", "research-script/1.0", a stock Chrome or Firefox string); no owner or project details in any request.
- Downloads each in their own new folder in the scratchpad (`book/dl-gutenberg-1260/`, `dl-gutenberg-768/`, `dl-gutenberg-1342/`, `dl-naxos-pdf/`, `dl-samples/`); scripts kept in `book/scripts/` and copied here; Python always `-I`, paths passed as arguments.
- DuckDuckGo HTML: 15 queries in the session (5 gate, 10 for Jane Eyre), all HTTP 200, no bot check.
- Blocked or bot-checked today: readinglength.com, audiobooksoul.com, readingvine.com, hubpages, Cambridge Dictionary (Cloudflare "Just a moment"), Open Book Publishers (AWS WAF captcha), AudioFile search (script-rendered), the ERIC API (HTTP 504). Each is marked UNCHECKED where it matters.

## Dates pages were read

All on 2026-11-13, local time, from the scratchpad files' timestamps (finish times): DDG gate 11:57; Audible catalogue and LibriVox/archive.org 12:02; autocomplete 12:04; OverDrive 12:05; DDG Jane Eyre batch 12:07; Apple 12:08; competitor pages 12:09; Gutenberg records, Wikisource, Wikipedia and Audies about 12:20; Naxos page and booklet 12:21; Kobo, Spotify, SoundCloud and YouTube oEmbed about 12:23; Crossref, OpenAlex and hoopla 12:24; Reddit 12:25; OpenEdition about 12:25; Audible rendered pages 12:28; Discover first and second tiers about 12:04 and 12:30; Audible samples 12:31 to 12:42. HushBook source read at D:\hushbook HEAD `d2ed665` (2026-11-12 13:13 +0530; billing-only changes since `c0040d1`); site copy at D:\hushbook.app HEAD `fae94ea`. Search Console: `~/hushbook-seo/gsc/2026-11-13/` (data to 2026-11-11).

Reused, not re-derived: the read-or-listen studies verified 2026-11-11 (DOIs re-resolved in Crossref today); the 2026-11-11 book-lane autocomplete caches (session `9b795cca…/scratchpad/books/ac-google.json`, `ac-bing.json`, `ac-ddg.json`), read and merged, not refetched.

## Scripts (`scripts/`)

| Script | What it does | Parent |
|---|---|---|
| `ddghtml.mjs` | DuckDuckGo HTML SERP probe | copied unchanged (WH) |
| `pages.mjs` | Fetches competing pages; dates, headings, words, names (NAMES via env), runtimes | WH `wh-pages.mjs` |
| `je-ac.mjs` | Autocomplete, 5 engines, 103 seeds (+ a-z on Google) | WH `wh-ac.mjs` |
| `je-group.mjs` | Merges today's and the 11-11 caches, removes noise, groups, lists rel ≥ 1250 with bucket | WH `wh-group.mjs` |
| `je-discover-cards.mjs` | HushBook Discover's first search tier, merged as the app merges, with card lines | P&P `pp-discover-cards.mjs` |
| `je-discover-expanded.mjs` | Discover's second ("expanded") tier for both libraries | new |
| `je-audible-catalog.mjs` | Audible catalogue API, 4 markets, 29 keyword sets | P&P `pp-audible-catalog.mjs` |
| `je-aud-rows.py` | One line per single-title row of the catalogue output, by market | new |
| `je-audible-products.mjs`, `je-audible-table.mjs`, `audible-product-dump.mjs` | Product records by ASIN; compact table; full dump | P&P (unchanged) |
| `je-render.mjs` | Headless render of Audible pages (reviews, press quotes, whispersync tag) | P&P `pp-render.mjs` |
| `je-apple.mjs` | iTunes Search API + Apple Books schema.org | P&P `pp-apple.mjs` |
| `je-overdrive.mjs` | Libby (OverDrive) catalogues of 5 systems | P&P `pp-overdrive.mjs` |
| `je-hoopla.mjs` | hoopla search and title pages (headless) | P&P `pp-hoopla.mjs` |
| `je-librivox-detail.mjs` | Every LibriVox Jane Eyre project: catalogue, archive.org, files, artist tags, full reviews | P&P `pp-librivox-detail.mjs` |
| `je-ia-reviews.py` | Prints an archive.org item's reviews character for character | new (lesson 2 of the 11-12 review) |
| `je-reddit.mjs` | Arctic Shift title search and threads by id, with comments | P&P `pp-reddit.mjs` |
| `je-audies.mjs` | Scans all Audie year pages for a title | P&P `pp-audies.mjs` |
| `je-wordcount.py` | Word counts, chapters, volumes, listening times, pace per recording, dialogue, sentence length (with `--compare` on #768 and #1342), "reader" addresses, names | P&P `pp-wordcount.py` |
| `je-french.py` | The French: detector, hand-checked exclusions, speaker labels, per chapter and volume, `--review` list | new (loads `je-wordcount.py`) |
| `je-contexts.py` | Every occurrence of a pattern with chapter and context, tally by chapter | P&P `pp-contexts.py` (rewritten) |
| `je-crossref-check.py` | Crossref + OpenAlex for 16 DOIs | WH `wh-crossref-check.py` |
| `je-pdftext.py` | Text of a PDF booklet (pypdf) | new |
| `je_sample_check.py` | Transcribes the first N s of Audible samples, 6-word overlap with #1260 | WH `wh_sample_voice.py` |
| `je-htmltext.py` | Readable text of a saved HTML page | new |

Reproduce the main numbers (each input in its own folder):
```
python -I scripts/je-wordcount.py <dir>/pg1260.txt --compare <dir2>/pg768.txt <dir3>/pg1342.txt
python -I scripts/je-french.py <dir>/pg1260.txt --review
python -I scripts/je-contexts.py <dir>/pg1260.txt "St\. John" 50 --tally-only
node scripts/je-discover-cards.mjs "jane eyre"
node scripts/je-discover-expanded.mjs "jane eyre"
node scripts/je-group.mjs <ac dir> <2026-11-11 books dir>
python -I scripts/je-ia-reviews.py <lv-detail dir>/meta_jane_eyre_ver03_0809_librivox.json
python -I scripts/je_sample_check.py <samples dir> <dir>/pg1260.txt <out.txt> 90 8
```

## Decisions made in the research

- **Gate:** Jane Eyre over Dracula because a dedicated 2026 Dracula comparison with an editions table now ranks (academyvoices.com, 2026-10-13, modified 2026-11-08); Jane Eyre has the next-highest demand and only an undated table. Runner-up order Karamazov, Anna Karenina, Les Misérables (`docs/seo/keyword-research-2026-11-13.md`).
- **Word count:** 186,145 (our rules; the site has no earlier Jane Eyre figure). Listening times at 151 wpm as the site does.
- **Volumes:** 15 + 11 + 12 from Wikisource's first edition, checked by first sentences.
- **French:** publish "about 350 words, under 0.2%"; 346 is the script's figure after hand review; speaker labels by hand (Adèle 291).
- **Picks:** Newton best overall; Stevenson runner-up; Klett best free; Popplewell best to borrow (McCaddon / Nadia May for a shorter wait); BBC Radio 4 best dramatisation; LibriVox dramatic reading best complete full cast (Spoken Realms paid).
- **Accent:** British by sources for Newton, Stevenson, Root, Scott, Popplewell and Klett (one reviewer); no verified American-accent recording, so the post should not name one.
- **Names table:** only facts told by the chapter given; Mr. Mason, the uncle John Eyre and the Thornfield secret left out.
- **Our translations** of Adèle's lines (research-platforms 3b) are plain English by the researcher, checked against the guidesite translations for sense.

## For the orchestrator or owner to decide

1. **A YouTube playlist looks like an unauthorized copy of a commercial recording:** "Audiobook-Jane Eyre-Narrator-Juliet Stevenson" (channel "Shine", https://www.youtube.com/playlist?list=PLQS2X2FAq-LUmCKtdb5LVcEpV_D3TMojl), ranking 5th for "jane eyre audiobook narrator". The post must not mention it. Good news for the app: **HushBook Discover shows no Internet Archive copy of a commercial Jane Eyre** (first tier empty for Internet Archive; second tier checked).
2. **Discover card for the LibriVox group set shows "4.6 (8)"**, but five of its eight archive.org reviews are about Klett's separate recording, posted on the wrong page; the card overstates the group set. Klett's own card title reads "Jane Eyre (version 3)" (archive.org's title) while LibriVox's catalogue calls it "version 2"; the post handles it by length (18h 36m). Klett's archive.org page also carries a 2025 spam "review" (5 stars) that the app's average includes.
3. **Possible news hook, UNVERIFIED:** autocomplete has "jane eyre adaptation 2026", "jane eyre adaptation 2027", "jane eyre movie 2026" and "jane eyre new series" (Google, Bing, DDG). Not checked (DDG budget). If a new film or series is announced, a one-line FAQ like Wuthering Heights' film line may be worth adding.
4. **People Also Ask / AI Overview:** please check `best jane eyre audiobook`, `jane eyre french translations` and `how to pronounce st john in jane eyre` in a normal browser.
5. **Listening checks someone with access could do:** how Newton and Stevenson say "St. John" (Chapter 28) and read Adèle's French (Chapter 11, 13, 17); whether Susan Ericksen's AmazonClassics reading is American-accented. Until then the post says what the sources say.
6. **Adèle translations:** a French speaker could check research-platforms 3b before publishing.
7. **Inbound links** (link-only): `how-to-read-classics-without-getting-bored.md:76`, `how-long-is-an-audiobook.md:47`, `best-wuthering-heights-audiobook.md:291` (or `:197`); details in scout.md.
8. **Length:** nine candidate H2s plus the HushBook section; scout.md suggests folding pronunciation into the names section if the post runs long.
