# Platform research: best War and Peace audiobook

Post slug: `best-war-and-peace-audiobook`. Researched November 11, 2026. Every claim carries a source, the date read (November 11, 2026 unless a line says otherwise) and **VERIFIED** (opened and seen today) or **UNVERIFIED**. Prices and ratings change; each is a snapshot of 2026-11-11.

Scope: what a listener can actually get (editions, free recordings, read-along elsewhere, listener opinion, HushBook, competing pages). The book, the translations' history and reception, and the studies belong to the other researcher.

## How pages were read

Same methods as `../2026-11-11-best-crime-and-punishment-audiobook/research-platforms.md`, reused and adapted (scripts in `scripts/` here; raw responses in the session scratchpad `9b795cca…/scratchpad/wpp/`, outside git).

- **Audible catalogue API** (no auth): `https://api.audible.com/1.0/catalog/products?keywords=…` on `.com`, `.co.uk`, `.ca`, `.com.au`, 20 keyword sets ("war and peace", "+tolstoy", "+unabridged", "+maude", "+briggs", "+pevear", "+garnett", "+dunnigan", "+edmonds", "+bbc", "+neville jason", "+thandiwe newton", "+volume", "war & peace", "+dramatisation", "+frederick davidson", "+scourby", "+petherbridge", "+mandelker", "+dole"), 2 pages each (`scripts/wp-audible-catalog.mjs`), then `/catalog/products/{ASIN}` with contributors, product_desc, rating, sample, price, plans (`scripts/wp-audible-products.mjs`, parsed with the sibling's `audible-product-dump.mjs`). Narrator searches `?narrator=` for names other pages claim.
- **Audible US product pages**: curl got HTTP 503 today, so the six main pages were rendered in headless Chrome with `?ipRedirectOverride=true&overrideBaseCountry=true` (`scripts/wp-render.mjs`, saves HTML for the `whispersync` data tag). Buy-box prices are client-rendered and did not show; prices below are the API's US list price (the sibling verified that it equals the "Buy for" price).
- **Apple Books**: iTunes Search API (`media=audiobook`, US, four terms) and every matching `books.apple.com/us/audiobook/id…` page's schema.org data (`scripts/wp-apple.mjs`). iTunes lookup for UK where noted.
- **Libby**: OverDrive thunder API for NYPL, LAPL, KCLS, SFPL, Chicago PL (`scripts/wp-overdrive.mjs`).
- **hoopla**: headless Chrome, search "war and peace" (audiobooks) and every title page (`scripts/wp-hoopla.mjs`).
- **Kobo US** search page (curl; headless got 403). **Downpour** search page plus Shopify product JSON and one product page.
- **Publishers**: Naxos AudioBooks pages and the Volume I PDF booklet; Penguin UK audio page.
- **Translation check by listening**: every Audible US sample MP3 with a full-length or abridged War and Peace (24 samples) transcribed with faster-whisper (large-v3-turbo, CPU int8, VAD, first 180 to 300 s) and scored by 6-word shingle overlap against three public-domain texts: **Maude** (Project Gutenberg #2600), **Garnett** (archive.org `warpeace01tols_0`, Carlton House, OCR of the complete novel, through the second epilogue's "THE END") and **Dole** (archive.org `warandpeace01dolegoog` + `warandpeace00dolegoog`, OCR). Scripts: `scripts/wp_sample_transcribe.py`, `scripts/wp_translation_match.py`. Background overlap between two different translations of this book is 0 to 19% (shared names and short phrases); a recording of a text scores 60 to 98% against it (lower for abridgments and noisy samples).
- **LibriVox**: API (`?title=^War and Peace&extended=1`), the 24 catalogue pages, archive.org `/metadata/{item}` and `advancedsearch` (`scripts/wp-librivox-detail.mjs`; the scout's `scripts/wp-librivox.mjs`).
- **Reddit**: Arctic Shift API, posts by id, title search in nine subreddits, comment search and comment trees (`scripts/wp-reddit.mjs`).
- **Awards**: audiopub.org year pages 2000 to 2026 (27 pages, all HTTP 200), scanned for "War and Peace", "War & Peace", "Tolstoy". AudioFile reviews now live on kirkusreviews.com (audiofilemagazine.com redirects to kirkusreviews.com/discover-audiobooks).
- **HushBook**: app source D:\hushbook at HEAD `c0040d1` (2026-11-05), pubspec `version: 1.3.5+70` (D:\hushbook\pubspec.yaml:4). Same HEAD as the Crime and Punishment research this morning; every citation below was re-read today (line numbers corrected where they moved). The working tree has uncommitted `lib/l10n/*.arb` edits in other languages; citations are to HEAD files.

**Blocked today** (availability there NOT verified by me): Libro.fm (HTTP 202 empty / 403, curl and headless), Kobo in headless Chrome (403; curl worked), Amazon (search returned the automated-access page, so no Kindle pairing check), BBC Genome (HTTP 405), Spotify catalogue (needs a login), Google SERP and People Also Ask.

---

## 1. Unabridged English editions

### 1a. Master table (all values read 2026-11-11)

Translation column: "(sample N%)" = share of the Audible sample's 6-word runs found in that translation's text (section 1c); "(store)" = the store's translator credit; "(publisher)" = the publisher's page or booklet. Ratings: Audible US overall stars (number of ratings) / performance stars. Runtimes as each page prints them.

| # | Narrator | Translation | Publisher | Release | Runtime | Sold as | Audible US rating (ratings) / performance | Audible US price (API) | Audible UK rating | Where sold (checked today) | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Thandiwe Newton | **Maude** (Audible authors "Louise Maude - translator; Aylmer Maude - translator"; sample 84%) | Audible Studios; "Public Domain (P)2021 Audible, Ltd" | Audible 2021-11-04; Apple 2021-11-04 | Audible 60 hrs 14 mins (3,614 min); Apple 60:16:06 | one title | 4.6 (1,613) / 4.7 | $30.00; US page shows "Listen for free" (signed out) | 4.5 (708) | Audible US/UK/CA/AU; Apple Books $32.99, 4.2 (50). Not in Libby or hoopla. | VERIFIED. 2023 Audie winner (4b). B095TS6LLR |
| 2 | Neville Jason | **Maude** (Naxos "Translated by: Aylmer and Louise Maude"; booklet; Audible summary; samples 88% Vol. 1, 96% Vol. 2) | Naxos AudioBooks | Naxos "Released: September 2006"; Audible 2006-12-31 | Vol. 1 30 hrs 19 mins + Vol. 2 31 hrs 24 mins = **61 h 43 min**; Apple 30:25:24 + 31:36:52; OverDrive 30:20:06 + 31:25:10 | **two volumes**, bought separately | Vol. 1 4.6 (2,658) / 4.7; Vol. 2 4.7 (2,121) / 4.8 | $27.49 each | 4.6 (991); 4.6 (771) | Audible US/UK/CA/AU; Apple Books $54.99 each; Libby (Vol. I: NYPL 4 copies, KCLS 4, SFPL 4; Vol. 2: NYPL 2, LAPL 3, KCLS 2, SFPL 3); Naxos page links Spotify and Naxos Spoken Word Library | VERIFIED. 2007 Audie finalist. B002V5CULY, B002V1BXZM |
| 3 | Frederick Davidson | **Garnett** (OverDrive and Kobo credit "Constance Garnett"; sample 81%, 98% on the first 250 words) | Blackstone Publishing; "(P)1997 Blackstone Audio, Inc." | Audible 2005-01-21; Apple 2006-01-01; Kobo 2006 | Audible 61 hrs 6 mins (3,666 min); Apple 61:05:56; OverDrive 61:06:32; Kobo and Downpour 61 h 6 m | one title | 4.1 (4,900) / 4.2 | $27.45 | 3.9 (312) | Audible US/UK/CA/AU; Apple Books $24.99, 4.3 (3); Kobo US; Libby (NYPL 8 copies, SFPL 12, Chicago 4 with 12 holds, LAPL, KCLS); Downpour $34.95 | VERIFIED. B002V0PVJC |
| 4 | Edoardo Ballerini | **Maude** (Audible authors credit both Maudes; "includes editorial revisions"; sample 84%) | Brilliance Audio (AmazonClassics Edition); "℗ 2019 Brilliance Publishing" | Audible 2020-03-31 | Audible 55 hrs 30 mins (3,330 min); Apple 55:32:02 | one title | 4.6 (602) / 4.8 | $29.75; API plans include Kindle Unlimited | 4.5 (47) | Audible US/UK/CA/AU; Apple Books $23.99, 4.3 (67) | VERIFIED. 1799744698 |
| 5 | Chloe Pirrie, Sam Woolf, Michael Fox, Olivia Darnley, Terence Wilton (five readers) | **Anthony Briggs** (Audible "Anthony Briggs - translator", "Translator Copyright © Anthony Briggs 2005"; Penguin UK "Anthony Briggs (Translator)"; sample 8% Maude, 4% Garnett, i.e. neither public-domain text) | Penguin Classics (Penguin Audio) | Penguin UK "Published: 30/04/2020" | Audible 67 hrs 13 mins (4,033 min); Penguin "Length: 4034 minutes" | one title | 4.7 (12) / 4.5 | $19.32 | 4.5 (174) | Audible US and UK (£15.24) and AU; Apple Books **UK only** (£9.99); Penguin UK lists Apple Books, Audible, Bookshop.org, Google Play, Hive, Kobo, Libro.fm, Spotify, xigxag (£16.00) | VERIFIED. ISBN 9780241440933 |
| 6 | Philippe Duquenoy | **Maude** (sample 93%; no translator on the stores) | Goffin Media | Audible 2021-08-24; Apple re-listed 2026-10-02 | Audible 56 hrs 45 mins; Apple 56:47:48 | one title | 4.5 (45) / 4.8 | $30.00 | 4.0 (2) | Audible US/UK/CA/AU; Apple Books $25.99, 4.5 (17) | VERIFIED. B09D8S4Y2K |
| 7 | Jonathan Keeble | **Maude** (Kobo "Translated by Louise Maude, Aylmer Maude"; sample 81%) | SNR Audio | Audible 2023-04-20 | Audible 59 hrs 5 mins; Apple 59:07:25; Kobo 59 h 5 min | one title, and inside SNR bundles | 4.6 (13) / 5.0 | $30.02 | 3.5 (2) | Audible US/UK/CA/AU; Apple Books $24.99, 4.0 (6); Kobo US | VERIFIED. B0C1PC24PW |
| 8 | Keith Brown | **Maude** (sample 88%) | Spotify Audiobooks | Audible 2026-08-11 | 57 hrs 47 mins; Apple 57:47:25 | one title | no ratings | $31.58 | none | Audible US/UK/CA/AU; Apple Books $22.99; Kobo US | VERIFIED. B0HBPGFXCF |
| 9 | Zach Barrett | **Maude** (sample 89%) | NTMC | Audible 2024-12-12 | 67 hrs 33 mins; Apple 67:33:42 | one title | 3.6 (14) / 4.0 | $30.14 | none | Audible US/UK/CA/AU; Apple Books $12.99; Kobo US | VERIFIED. B0DLGNTDWJ |
| 10 | Alan Munro | **Maude** (Audible "Louise Maude - translator"; sample 69% on the first 250 words, verbatim Maude opening, the rest speech-recognition noise) | Trout Lake Media | Audible 2018-12-18 | 66 hrs 50 mins | one title | 3.9 (54) / 3.4 | $29.72 | 3.4 (15) | Audible US/UK/CA/AU | VERIFIED. B07LFH8K1N |
| 11 | Christopher Preece | **Maude** (sample 82%) | Montgomery Providence Publishing | Audible 2023-10-30 | 50 hrs 39 mins (shortest unabridged listing); Apple 50:41:32 | one title, and in a 96-hour Tolstoy collection | 5.0 (2) | $30.02 | none | Audible US/UK/CA/AU; Apple Books $26.99 | VERIFIED. B0CLZ1N4M3 |
| 12 | Sam Kusi | **Maude** (sample 89%) | Lauscher Audiobooks | Audible 2024-12-06 | 62 hrs 31 mins; Apple 62:31:10 | one title, and 17 separate parts | 2.0 (1) | $30.14 | none | Audible US/UK/CA/AU; Apple Books $36.99 | VERIFIED. B0DGLJ2J87 |

Totals: the twelve rows above are the complete, human-read, single-title recordings with a sample on Audible US; 1e lists more (a 60-hour reading labelled abridged, part-by-part sets, synthetic voices, Apple- and Kobo-only listings). Of the twelve, ten read Maude, one Garnett (Davidson), one Briggs (Penguin). VERIFIED.

### 1b. Abridged, dramatised and radio versions (flag in the post)

| Version | Kind | Publisher | Release | Runtime | Audible US rating / price | Other places | Status |
|---|---|---|---|---|---|---|---|
| BBC Radio 4 full-cast dramatisation (Paterson Joseph, John Hurt, Lesley Manville, Harriet Walter, Simon Russell Beale, Alun Armstrong, Roger Allam, Stephen Campbell Moore; also Natasha Little, David Calder, Phoebe Fox, Sam Reid, Joanna David) | Radio drama, "Adapted for radio by Timberlake Wertenbaker", "First broadcast on New Year's Day 2015", "Duration: 10 hours approx." | BBC Audio, "©2017 BBC Studios Distribution Ltd" | Audible 2017-04-06 | Audible 9 hrs 38 mins (578 min); Apple 9:38:36 and 9:38:54 (two listings); Kobo 9 h 38 min | 4.7 (112) / 4.8; $16.91. UK 4.7 (131) | Apple Books $12.99, 4.8 (9) (id1446246548) and $17.99 (id1219098058); Kobo US | VERIFIED. Audible US B01N9QSAZ9, UK B01MY7DKK2. Critic line on Audible: "Tolstoy's imagined world is recreated on air brilliantly by the extraordinary cast." (The Spectator). Format on Audible reads "unabridged", but it is a dramatisation. |
| Older BBC Radio 4 dramatisation: "A thirty-five strong cast including Leo McKern as Kutuzov, Simon Russell Beale as Pierre Bezuhov, Emily Mortimer as Natasha Rostov and Gerard Murphy as Andrei Bolkonsky" | Radio drama | BBC Digital Audio / BBC Audio | Audible 2006-05-11; Apple and OverDrive 2006-05-01 | Audible 8 hrs 25 mins (505 min); Apple 9:28:16; OverDrive 09:28:16 | 4.3 (145) / 4.5; $12.08 | Apple $7.99, 3.8 (14); Libby (LAPL 4 copies, KCLS 9) | VERIFIED. Audible B002VA3GY4. Summary quotes the Guardian: "Nine hours of blood-and-thunder period drama on a single disc has to be the best bargain around". Original broadcast year UNVERIFIED (Genome blocked). Also inside "The Leo Tolstoy BBC Radio Drama Collection" (BBC Audio, 2022-01-06, 18 hrs 35 mins with Anna Karenina, Resurrection and more; 4.6 (7); $19.32; B09KYF2HYL). |
| Neville Jason | Abridged (Naxos page: "Abridged by: Heather Godwin", "Translated by: Aylmer and Louise Maude", "Released: February 2000") | Naxos AudioBooks | Audible 2000-10-26 | Naxos 5 h 10 m; Audible 5 hrs 9 mins; Apple 5:09:57; OverDrive 05:09:50 | 4.0 (74) / 4.4; $10.05 | Apple $14.99; Kobo; Libby (NYPL 3, LAPL 2) | VERIFIED. https://naxosaudiobooks.com/war-and-peace-abridged/ |
| Edward Petherbridge | Abridged | CSA Word (2006); The Copyright Group in two parts (2012) | Audible 2006-03-28; 2012-07-19 | 4 hrs 47 mins; Part 1 2 hrs 24 mins, Part 2 2 hrs 23 mins | no US ratings; $11.18. UK 4.1 (13) | hoopla (Canongate Books, 2023, 4h 47m, 3.8 (54), "Edward Petherbridge, Reader"); Apple $9.99 (and $12.99 per part) | VERIFIED. Cut from **Garnett** (sample 72%, section 1c). This answers the scout's open Petherbridge question: his War and Peace is abridged only. |
| Sherman Allen | Abridged, 44 minutes | Listener's Digest | Audible 2008-08-13 | 0 hrs 44 mins | 2.3 (7); $3.53 | Apple $1.99 | VERIFIED |
| Geoffrey Giuliano / Cyril Taylor-Carr and "The Cliff" ("War and Peace: The Original Manuscript", Icon Audio Arts) | Kobo labels the Giuliano listing "Abridged"; about 15 h 52 min | Icon Audio Arts / Avalon House | Audible 2023-02-02 | 15 hrs 52 mins | 1.0 (1) | Kobo, Apple, hoopla (Avalon House 15h 44m) | VERIFIED as listed; translation not settled (the sample is an introduction, section 1c). Do not recommend. |

### 1c. Which translation each recording reads (sample test)

Run today: 24 Audible US samples, first 180 s (the four done first: 300 s), faster-whisper large-v3-turbo; score = share of the transcript's 6-word runs found in each text. "First 250 words" drops speech-recognition noise that Whisper produced over the closing seconds of some samples (music or silence), which pulled down the full-length scores of Neville Jason Vol. 1 and Alan Munro. Raw transcripts: scratchpad `wpp/all.txt`.

| Sample (ASIN) | Recording | Maude | Garnett | Dole | First 250 words (best text) | Opening words heard | Verdict |
|---|---|---|---|---|---|---|---|
| B095TS6LLR | Thandiwe Newton | **84.3%** | 9.8% | 6.3% | Maude 82.9% | "Don't tease. Well, and what has been decided about Novosiltsev's dispatch?" (Book 1, Ch. 1) | Maude |
| B002V5CULY | Neville Jason, Vol. 1 | **67.1%** | 7.7% | 3.5% | Maude 87.8% | "like an actor repeating a stale part. Anna Pavlovna [Schérer], on the contrary, despite her 40 years, overflowed with animation and impulsiveness." | Maude |
| B002V1BXZM | Neville Jason, Vol. 2 | **96.2%** | 9.3% | 3.4% | Maude 94.3% | "An incalculable number of causes present themselves." (Book 9, Ch. 1) | Maude |
| B002V0PVJC | Frederick Davidson | 8.7% | **81.0%** | 8.5% | Garnett 98.0% | "brimming over with excitement and impulsiveness. To be enthusiastic had become her pose in society" | **Garnett** |
| 1799744698 | Edoardo Ballerini | **84.4%** | 10.5% | 5.2% | Maude 84.9% | "Don't tease. Well, and what has been decided about Novosilcev's dispatch?" | Maude |
| 0241440939 | Penguin, five readers | 7.8% | 3.7% | 2.5% | none (4.5% / 5.3%) | "Wednesday, I must show my face, said the prince. My daughter is coming to take me there." | Not a public-domain text; Briggs per Audible and Penguin credits |
| B09D8S4Y2K | Philippe Duquenoy | **93.0%** | 12.0% | 5.6% | Maude 88.6% | "At five in the morning it was still quite dark. The troops of the centre, the reserves and Bagration's right flank had not yet moved" (Austerlitz) | Maude |
| B0C1PC24PW | Jonathan Keeble | **81.2%** | 14.5% | 7.9% | Maude 76.3% | "Well, Prince, so Genoa and Lucca are now just family estates of the Bonapartes." (Maude's first line) | Maude |
| B0HBPGFXCF | Keith Brown | **87.8%** | 9.7% | 7.6% | Maude 95.1% | "and sometimes even when she did not feel like it, she became enthusiastic" | Maude |
| B0DLGNTDWJ | Zach Barrett | **88.6%** | 7.9% | 2.8% | Maude 94.7% | "visitor, though politeness prevented his showing impatience, left the old woman with a sense of relief" | Maude |
| B07LFH8K1N | Alan Munro | 43.6% | 9.2% | 5.9% | Maude 69.4% | "It was in July 1805, and the speaker was the well-known Anna Pavlovna [Schérer], maid of honour and favourite of the Empress Maria Fedorovna" | Maude |
| B0CLZ1N4M3 | Christopher Preece | **82.1%** | 13.9% | 7.2% | Maude 81.2% | "Well, Prince, so Genoa and Lucca are now just family estates of the Bonapartes." | Maude |
| B0DGLJ2J87 | Sam Kusi | **88.9%** | 10.6% | 7.7% | Maude 92.2% | "like an actor repeating a stale part. Anna Pavlovna Scherer, on the contrary, despite her forty years" | Maude |
| B0CCSW8BNS | Harry Shaw | **75.0%** | 13.3% | 7.1% | Maude 76.3% | "Well, Prince, so Genoa and Luca are now just family estates of the Bonapartes." | Maude (the sample reads Chapter 1 in full; why Audible labels it abridged is unknown) |
| B0H2S8HVQ6 | Virtual Voice, Erato Press | **74.4%** | 11.7% | 6.5% | Maude 69.8% | "This title is narrated with virtual voice. Computer-generated narration for audiobooks." | Maude, synthetic voice |
| B0HG8RD1FV | Virtual Voice, Lumo "Adapted for Modern Readers" | 15.9% | 4.6% | 2.3% | Maude 19.2% | "This title is narrated with virtual voice." | A rewrite loosely based on Maude; synthetic voice |
| B077ZV2KRB | Ella Porter, "War and Peace 1" | 6.0% | 8.6% | **93.1%** | Dole 97.6% | "has burnt his ships and I believe that we are about to burn ours. Prince Vasili always spoke indolently like an actor rehearsing an old part" | **Dole** (first part only) |
| B0BTMWMQWD | "The Original Manuscript", Cyril Taylor-Carr | 0.0% | 0.0% | 0.0% | n/a (125 runs) | "Tolstoy is best known for the novels War and Peace and Anna Karenina" (a biography) | **Cannot settle**: the 65-second sample is an introduction |
| B002V0M1PY | Neville Jason, abridged | **69.1%** | 6.8% | 4.1% | Maude 69.0% | "I am dissatisfied with him between ourselves" | Maude, abridged (Naxos credit agrees) |
| B0036GTGFA | Edward Petherbridge, abridged (CSA Word) | 7.0% | **72.1%** | 6.8% | Garnett 60.8% | "a relation of ours, the young Princess Bolkonsky" | **Garnett**, abridged |
| B008MOI0SK | Edward Petherbridge, Part 1 (Copyright Group) | 6.7% | **71.4%** | 6.3% | Garnett 64.5% | "The young Princess Bolkonsky. Prince Vasily only added, Is she rich?" | Garnett, abridged (same reading) |
| B002V0KQ5Q | Sherman Allen, 44-minute abridgment | 10.8% | 7.3% | 1.5% | none | "He had two sons, both spendthrifts, and a daughter, Helena." | Cannot settle: a paraphrase |
| B01N9QSAZ9 | BBC Radio 4, 2015 | 0.2% | 0.0% | 0.0% | none | "Have you taken Anatole to visit the Princess Volkonsky yet?" | Dramatisation (adapted dialogue) |
| B002VA3GY4 | BBC, older dramatisation | 0.6% | 1.5% | 0.2% | none | "Revolution and regicide are grand fact, my dear Monsieur Pierre." | Dramatisation |

What the test settles (VERIFIED today): Thandiwe Newton, Neville Jason, Ballerini, Duquenoy, Keeble, Keith Brown, Barrett, Munro, Preece, Kusi and Harry Shaw read **Maude**; Frederick Davidson reads **Garnett**; Ella Porter reads **Dole**; the Petherbridge abridgment is cut from **Garnett**; the Penguin recording is neither public-domain text, consistent with its Briggs credit. Store credits agree wherever a store names a translator. What it cannot settle: the "Original Manuscript" listing (introduction sample) and the 44-minute Listener's Digest abridgment (paraphrase).

The French: no unabridged sample transcript contains a French phrase (the Book 1 passages they cover are in English in Maude's text; only the Garnett-based Petherbridge abridgment, the Listener's Digest abridgment and the older BBC drama have "Monsieur Pierre" or "madame"), so the samples do not show how each narrator voices the French. A Reddit listener on Neville Jason: "Jason reads out the story entirely in English, so I didn't have to keep going to the annotations to translate the French parts" (nwz66z, 2021); an Apple Books reviewer on Newton: "embodying dozens of characters speaking English, French, German, Russian and Latin" (2023). How much French each recording voices beyond the samples: UNVERIFIED.

### 1d. Notes per main edition

- **Thandiwe Newton (Audible Studios, 2021).** Audible summary: "Tolstoy's epic novel of love and war, in an unabridged performance by Emmy and BAFTA Award-winning actress Thandiwe Newton." and "Thandiwe Newton inhabits each character with such flair that it is easy to forget that you are listening to one voice." Copyright line "Public Domain (P)2021 Audible, Ltd". Authors field: "Louise Maude - translator; Aylmer Maude - translator". The US page shows **"Listen for free"** to a signed-out visitor instead of a price; API plans: "Free Tier", "AccessViaMusic", "KindleUnlimited"; API list price $30.00. Reddit (2024, 1fpmo28): "It is a loaner in the Plus library currently." The exact membership tier is UNVERIFIED; safe wording: "included with Audible membership at the time of writing". **2023 Audie Award winner, Literary Fiction & Classics**, and Best Female Narrator finalist (section 4b). Apple Books $32.99, 60:16:06, 4.2 (50), one 2023 review: "A Grammy-worthy one-woman performance, embodying dozens of characters speaking English, French, German, Russian and Latin." Two 2025 one-star reviews complain about loud character voices ("She starts yelling all the time for certain characters!"). Not found on Libby (5 library systems) or hoopla (Audible Studios title). VERIFIED.
- **Neville Jason (Naxos, 2006), two volumes.** Naxos pages: "Read by Neville Jason", "unabridged", "Translated by: Aylmer and Louise Maude", "Released: September 2006", Digital ISBN 978-962-954-572-7 (Vol. I, Cat. NAX43312, 442 MB) and 978-962-954-573-4 (Vol. II, Cat. NAX43412, 457 MB), links to Audible, Spotify and Naxos Spoken Word Library, "Due to copyright, this title is not currently available in your region" (India). Naxos Vol. II page: "The recording will run to fifty-one CDs, some seventy hours, and we have divided it into two volumes." Running times on Naxos read Vol. I "31 h 25 m" and Vol. II "30 h 21 m", the reverse of Audible (Vol. 1 30 hrs 19 mins, Vol. 2 31 hrs 24 mins), Apple (30:25:24 / 31:36:52) and OverDrive (30:20:06 / 31:25:10); use Audible's. Total **61 h 43 min** (Audible 1,819 + 1,884 min). Naxos Vol. I page: "The Neville Jason performance of Tolstoy's War & Peace has been selected as a Top 12 Fiction title for Best Audiobooks Of 2007 by AudioFile Magazine." Each volume costs a separate purchase (Audible $27.49 each; Apple $54.99 each). VERIFIED.
- **The Naxos booklet** (free PDF from the Naxos page, https://www.naxosaudiobooks.com/booklets/43312_War_and_Peace--Volume_I.pdf, 36 pages, downloaded today): track list with a title for every chapter ("Chapter 10 A Nameday at the Rostov's"), a book-by-book synopsis ("Notes by Mary Hobson"), and **"The Characters"** grouped by family (The Bezukhovs, The Rostovs, The Bolkonskys, The Kuragins, Other Main Characters), e.g. "Countess Natalya Rostova, (Natasha), their younger daughter". Credits: "Translated by Alymer [sic] and Louise Maude (1922–3)", "A Recordability production". Its narrator bio: "As a reader he won AudioFile Earphone awards for … War and Peace (Best Audiobooks of the Year 2007 and 2009)". Note the booklet uses "Nikolai" and "Andrei" while Maude's text, which the recording reads (section 1c), has "Nicholas" and "Prince Andrew"; which forms Jason speaks: UNVERIFIED (the samples do not reach those names). Whether Audible buyers get the PDF: UNVERIFIED (no PDF flag in the API or page). VERIFIED.
- **Frederick Davidson (Blackstone).** Audible copyright "(P)1997 Blackstone Audio, Inc."; Audible release 2005-01-21; Apple "© 1997 by Blackstone Audio, Inc.", released 2006-01-01. Critic review on Audible: "There will not be a better recording of Tolstoy's masterpiece for some time…Davidson's exquisite narration heightens the perfection of this novel" (Library Journal (audio review)). OverDrive and Kobo credit "Constance Garnett" as translator. Most-rated War and Peace on Audible US (4,900), but the lowest overall and performance stars among the main editions (4.1 / 4.2; UK 3.9 from 312). Widest library availability: Libby NYPL 8 copies, SFPL 12, Chicago PL 4 (12 holds), LAPL and KCLS listed. Downpour sells the download at $34.95 (61h 6m; "Read by Frederick Davidson"; https://downpour.com/products/book-2163). VERIFIED. Davidson as an alias of David Case: UNVERIFIED (not checked).
- **Edoardo Ballerini (AmazonClassics, Brilliance, 2020).** Authors field: "Louise Maude - translator; Aylmer Maude - translator". Summary: "Revised edition: Previously published as War and Peace, this edition of War and Peace (AmazonClassics Edition) includes editorial revisions." "℗ 2019 Brilliance Publishing, Inc." Shortest of the main unabridged editions at 55 hrs 30 mins. API plans include KindleUnlimited. Apple Books $23.99, 55:32:02, 4.3 (67); one 2023 Apple review: "This audio edition of the book has sections which are repeated, sometimes back to back." VERIFIED.
- **Penguin Classics (2020), Briggs translation, five readers.** Audible: "This Penguin Classic is performed by Chloe Pirrie, Sam Woolf, Michael Fox, Olivia Darnley and Terence Wilton." "Translator Copyright © Anthony Briggs 2005 (P) Penguin Audio 2020". Authors field adds Orlando Figes. Format "unabridged", 67 hrs 13 mins (4,033 min). Penguin UK: "Published: 30/04/2020", "ISBN: 9780241440933", "Length: 4034 minutes", "Price: £16.00", stores listed: Apple Books, Audible, Bookshop.org, Google Play, Hive, Kobo, Libro.fm, Spotify, xigxag (https://www.penguin.co.uk/books/301515/war-and-peace-by-tolstoy-leo/9780241440933). Audible US now lists it at $19.32 with 12 ratings (4.7); UK 4.5 (174) at £15.24. Apple Books: UK only (£9.99, id1510736337); the US lookup returns nothing. Reddit threads from 2021 and 2023 say it was UK-only on Audible; today the US catalogue and page show it. It is a multi-voice reading of the whole text, not a dramatisation: Reddit 18vkecx, 2024-01-02: "penguin classics uses like 4 people including men & women aka the girls sound like girls!!!" VERIFIED.
- **Philippe Duquenoy (Goffin Media, 2021).** No translator on Audible; a Reddit commenter (10b2kos, 2023-01-13) matched the sample to Maude's Book 3 Chapter XIV. Audible 56 hrs 45 mins, 4.5 (45) / 4.8; Apple re-listed 2026-10-02, 56:47:48, $25.99, 4.5 (17). VERIFIED.
- **Jonathan Keeble (SNR Audio, 2023).** Kobo credits "Translated by Louise Maude, Aylmer Maude". Audible 59 hrs 5 mins, 4.6 (13) / 5.0. Also inside several SNR bundles (The Leo Tolstoy Complete Collection 186:39, 4.5 (27); War and Peace & The Count of Monte Cristo, 2026-10-29, 109:54; and others). VERIFIED.

### 1e. Smaller listings (VERIFIED as listed; not recommended without more checks)

Audible US, besides rows 8 to 12 of 1a: Sam Kusi's summary is Oxford World's Classics' blurb ("Tolstoy gave his personal approval to this translation … introduction by Henry Gifford"), which fits its Maude sample; Harry Shaw (Spoken Realms, 2023-07-26, 60:34, Maude by sample, format "abridged" although 60 hours; Apple "War and Peace (Abridged)" 60:36:26, $35.99); Ella Porter ("War and Peace 1", Audioliterature, 2017, 15:07, first part only, **Dole** by sample, 3.0 (29)); Peter Silverleaf (Bookstream, books sold separately, 2023; Apple 59:28:30 complete listing); two "Virtual Voice" (synthetic) editions: Erato Press "War & Peace (Annotated and illustrated): A Classic Translation | Complete and Unabridged" (2026-05-24, 68:15, $6.99, Maude by sample; its blurb: "in the only English translation authorized by Tolstoy himself"; the scout's Amazon B0H2SB1R2R) and Lumo LLC "Adapted for Modern Readers" (2026-08-24, 59:36, a rewrite). Apple and Kobo only: Mark Nelson (Parolita Libro, 2024, 60:14:53, $9.99, 4.4 (7); Kobo credits "Translated by Aylmer Maude"; same reader as the free LibriVox Maude set, whether the same recording is UNVERIFIED), Philip Cooper (Sidra, 2026, 67:26), Jack Stimpling (2026, 54:26), David Ellington (Golden Age Audio, 2025, 72:20, $2.99), Zeke Ring ("A Modern Translation - Adapted for the Contemporary Reader", USC, 2025, 55:49; also hoopla), "AI Marcus" (24:45, 2.0 (4)), and five one-volume LibriVox-style listings (Rhea Wilson, Julie Garceau, Mayme Ellis, Kevin Gehring, Brian Barringer, $3.99 to $4.99). The scout's Audible B0DLGNTDWJ is **Zach Barrett**, not Christopher Preece (Preece is B0CLZ1N4M3).

Not found anywhere today: **Alexander Scourby** (Audible "war and peace scourby": no War and Peace hit, US or UK), **Walter Zimmerman**, **Simon Vance**, **Nadia May** (no War and Peace in the Audible keyword sweep or Apple search), and none of audiobookfest's three extra narrators (section 6). VERIFIED absence in those catalogues today.

### 1f. Modern translations on audio: the straight answer

- **Briggs**: one unabridged recording, the 2020 Penguin Classics five-reader edition (1d). No solo Briggs recording in Audible US/UK/CA/AU, Apple Books, OverDrive (5 libraries), Kobo US or hoopla. VERIFIED.
- **Pevear and Volokhonsky, Dunnigan, Edmonds, Mandelker's revised Maude, Garnett-modernised, Wiener, Bell**: no audiobook. Every War and Peace product in the 4-marketplace Audible sweep was scanned for "pevear", "volokhonsky", "dunnigan", "edmonds", "mandelker": zero hits; Apple Books US search, OverDrive and Kobo US first page: none. Audible narrator searches for "Alexandra O'Karma" (27 titles) and "Nicholas Guy Smith" (92 titles) contain no Tolstoy. VERIFIED absence in those catalogues today. So the r/audible question "which audiobook version is the narration of Richard Pevear and Larissa's translation" (14ao9hg, 2023) still has the answer its top comment gave: "There's only audiobooks versions of Maude, Anthony Briggs and Constance Garnett."
- **Maude** (1922-23) is read by Newton, Jason, Ballerini, Duquenoy, Keeble and the free LibriVox sets; **Garnett** (1904) by Davidson; **Dole** by the free LibriVox Dole set (section 1c, 2a).

---

## 2. Free recordings

### 2a. LibriVox (three sets, 24 projects)

All VERIFIED today: LibriVox API (`url_text_source`, translators, sections, readers), catalogue pages ("Catalog date", zip size, coordinator), archive.org metadata and advancedsearch (downloads, rating).

| Set | Projects | Translation (LibriVox credit and text source) | Readers | Runtime (sum of LibriVox times) | Sections | Catalog dates | archive.org downloads | Reviews |
|---|---|---|---|---|---|---|---|---|
| **Maude, Volumes 1 to 4** (solo) | 18545, 18547, 18548, 18549 | "Aylmer Maude", Gutenberg #2600 | **Mark Nelson** alone (coordinator Mark Nelson) | **62:27:13** (14:34:37 + 16:08:33 + 17:00:19 + 14:43:44) | 365 (68 + 99 + 96 + 102) | 2022-12-27, 2023-02-28, 2023-05-14, 2023-06-22 | 325,479 (97,250 + 88,501 + 88,742 + 50,986) | Vol. 1 5 stars (1) "so far so good"; Vol. 3 5 stars (1) "Well Read" |
| **Books 1 to 17** (group project) | 722, 1016, 1253, 1626, 1698, 1834, 1973, 2088, 2465, 2562, 2813, 3028, 3207, 3668, 3859, 4016, 4104 | "Aylmer Maude & Louise Maude", Gutenberg #2600 | 85 distinct readers, 4 to 14 per book (coordinator "Rainer"; most chapters: eva 10 books, Anna Simon 9, Ernst Pattynama 8) | 64:36:04 | 365 | 2007-04-28 to 2011-05-18 | 2,182,764 (Book 01 alone 986,390, the most of any War and Peace item) | Book 01: archive.org average 3 from 6 reviews, e.g. 2009, 1 star: "Unfortunately, multiple people have contributed to reading this novel and there are problems with this for me. … some of their uploads are so low"; Book 07: 4 (1) |
| **Dole, Vols. 1 to 3** (solo, unfinished) | 7178, 10137, 11415 | "Nathan Haskell Dole", archive.org `warandpeace01dolegoog` / `warandpeace00dolegoog` | **MaryAnn** alone | 31:05:36 for Vols. 1 and 2 (15:02:16 + 16:03:20), about half the novel (Vol. 1 Part 1 Ch 1 to Vol. 2 Part 5 Ch 22) | 66 + 98; Vol. 3 has 96 sections in the API | 2013-02-17, 2015-12-12 | 275,188 (204,402 + 70,786) | Vol. 2: 4 stars (1) "as always well read by Mary Ann Spiegal" |

- **Dole Vol. 3 is not finished.** The API lists 96 sections but no runtime, no zip and no archive.org item, and its catalogue URL (https://librivox.org/war-and-peace-vol-3-by-leo-tolstoy/) lands on the LibriVox forum login, not a catalogue page. VERIFIED.
- Maude volume coverage (LibriVox description and first/last section titles): Vol. 1 Book 1 Ch 1 to Book 3 Ch 19 (1805); Vol. 2 Book 4 to Book 8 Ch 22; Vol. 3 Book 9 to Book 11 Ch 34 (1812); Vol. 4 Book 12 Ch 1 to Second Epilogue Ch 12. VERIFIED.
- **Which makes a complete solo listen:** only the Maude Volumes 1 to 4, Mark Nelson, 62 h 27 min, one chapter per section. The 17-book set is complete but changes reader every few chapters; the Dole set stops halfway. The scout's figures match: 62:27:13 and `content/blog/how-long-is-an-audiobook.md`. VERIFIED.
- Days to finish the Maude set at one hour a day: 63 at 1x, 50 at 1.25x, 42 at 1.5x, 32 at 2x (62 h 27 min ÷ speed, rounded up). Computed today.
- Zip sizes on the catalogue pages: Maude 410, 454, 478, 414 MB. VERIFIED.
- Commercial re-listings of the volunteer readings (reader names VERIFIED, same recording UNVERIFIED): Mark Nelson on Apple (Parolita Libro) and Kobo, 60:14:53; Audible also carries third-party, podcast-style free listings ("Free Tier", episodes) of the LibriVox volumes, e.g. "War and Peace, Volume 1 (Maude translation) by Leo Tolstoy" (B0DJ6VFBJ9, author field "Lina") and the Dole Vols. 1 and 2 (B0FRX6STRC, B0GMDJ15PT), with no narrator field. Not LibriVox's own; do not recommend.

### 2b. Other legal free sources

- **Lit2Go** (University of South Florida): no War and Peace and no Tolstoy on its authors page or search. VERIFIED absence (https://etc.usf.edu/lit2go/authors/).
- **YouTube** full uploads exist (scout SERP, "The EPIC 58-Hour Full Audiobook"); rights and source not checked. Flag only.
- **Project Gutenberg #2600** is the free Maude text the LibriVox Maude sets read (LibriVox `url_text_source`). VERIFIED.

---

## 3. Text and audio in sync on other platforms

- Audible US product pages carry the `"listeningEnhancements":[{"eventId":"whispersync"…}]` data tag on **Thandiwe Newton** (B095TS6LLR) and **Edoardo Ballerini** (1799744698). No tag on Davidson, Neville Jason Vol. 1, Penguin/Briggs or the BBC 2015 dramatisation. VERIFIED (rendered page HTML). What the tag promises and which Kindle edition pairs with which narration: UNVERIFIED (Amazon blocked the check today).
- Reddit 18vkecx (2024-01-01): "I'm using the Maude version because it's free on Kindle for both ebook and audio!" and "My main translation was Maude cuz the book and audio was free on Kindle." Listener claims, UNVERIFIED.
- compendium.audio advertises "Text on screen as you listen" (scout SERP, not re-opened today). UNVERIFIED.
- Safe wording: "Audible marks the Newton and Ballerini editions with Whispersync; which Kindle edition pairs with them we could not confirm."

---

## 4. What listeners say

### 4a. Reddit (Arctic Shift API; scores as stored there, read 2026-11-11)

| Thread | Sub, date | Score / comments | Short remarks (comment score, date) |
|---|---|---|---|
| https://www.reddit.com/r/audible/comments/qmisl6/ "War and Peace Narrated by Thandiwe Newton. New Title included in Audible plus." | r/audible, 2021-11-04 | 78 / 24 | "Thandiwe Newton? 60 hours? Oh man, that's amazing" (13). "She was incredible on Jane Eyre" (11). "Neville Jason's performance was Top Notch. But that was Constance Garnett translation." (5), corrected below: "The Neville Jason version is the Maude translation." (3). The correction is right (section 1c). |
| https://www.reddit.com/r/audiobooks/comments/nwz66z/ "Audible of the Anthony Briggs Translation or Pevear/Volkhonsky Translation?" | r/audiobooks, 2021-06-10 | 27 / 8 | OP: "Audible doesn't appear to have the Pevear and Volokhonsky version." "Nevile Jason as the narrator is AMAZING. … Jason reads out the story entirely in English, so I didn't have to keep going to the annotations to translate the French parts." (1, 2021-06-11). "He only reads a few idioms or self-implied sentences in French." (1). |
| https://www.reddit.com/r/audible/comments/14ao9hg/ P&V narration? | r/audible, 2023-06-16 | 10 / 7 | "There's only audiobooks versions of Maude, Anthony Briggs and Constance Garnett." (3) |
| https://www.reddit.com/r/audiobooks/comments/176fo3k/ "which narrator Neville Jason or Thandiwe Newton?" | r/audiobooks, 2023-10-12 | 9 / 7 | "I finished the final quarter of the book in audio and loved Newton's narration." (1). "I am 2/3rds of the way through the version Neville Jason narrates, and have really enjoyed his narration and the character voices he uses." (1). "Neville Jackson [sic] is absolutely fantastic." (1, 2024). |
| https://www.reddit.com/r/audiobooks/comments/15pgf0t/ Briggs audiobook? | r/audiobooks, 2023-08-12 | 8 / 8 | OP could not buy the Penguin edition outside the UK; a 2025 reply describes switching an Audible account's country to buy it. Today Audible US lists it (1d). |
| https://www.reddit.com/r/ayearofwarandpeace/comments/18vkecx/ "Which translation have you chosen?" | r/ayearofwarandpeace, 2023-12-31 | 8 / 33 | "Maude because of Thandiwe Newton's narration." (2). "I'm listening to the Briggs translation because I really like big casts in audiobooks" (2). |
| https://www.reddit.com/r/audiobooks/comments/18uzbbg/ "Suggestions for consuming war and peace" | r/audiobooks, 2023-12-31 | 6 / 8 | OP: "There are many characters, and also the war description and geography gets confusing. I find myself re-hearing the same portion again and again". Replies: "Pick a free ecopy over at Amazon and more or less follow it with the audio recording. Once you have the characters infused, it goes much easier." (2, Ballerini listener). "I listened to the Frederick Davidson narration … his narration was brilliant and helpful in keeping each character distinct." (2). |
| https://www.reddit.com/r/audiobooks/comments/ovtot0/ "Best War and Peace audiobook edition?" | r/audiobooks, 2021-08-01 | 5 / 5 | "I liked the Neville Jason version. I had first tried the Frederick Davidson version, but it was awful and I returned it" (3). "There's a difference of 6 hours between these two versions with Edoardo being the shorter." (2). |
| https://www.reddit.com/r/audiobooks/comments/p4dky1/ | r/audiobooks, 2021-08-14 | 6 / 2 | "I have the Amazon Classics version. Which is a Maude translation … I couldn't listen to anything Fredrick Davidson narrates." (1) |
| https://www.reddit.com/r/audible/comments/mr5pna/ Ballerini or Jason? | r/audible, 2021-04-15 | 3 / 7 | "I think Edoardo Ballerini is one of the best narrators." (3). "Ballerini does the Maude translation" (2). "the only criticism I heard about Neville is the female voices" (1). |
| https://www.reddit.com/r/audible/comments/c1gfcf/ | r/audible, 2019-06-16 | 4 / 9 | "I haven't ever made it through my version of War and Peace, narrated by Frederick Davdson, and wish I had bought the one done by Neville Jason." (6) |
| https://www.reddit.com/r/audiobooks/comments/6eq2wo/ | r/audiobooks, 2017-06-01 | 2 / 9 | "Ugh whatever you do avoid Frederick Davidson. … Neville Jason does a good version but it's in two parts, so it'll cost you two credits on audible." (2). "I've always enjoyed Frederick Davidson's narration." (2). |
| https://www.reddit.com/r/audible/comments/kippci/ "time differences between versions" | r/audible, 2020-12-23 | 3 / 9 | "It's less than 10% difference. That's easily a difference of narrator pacing, not content" (3). |
| https://www.reddit.com/r/audible/comments/10b2kos/ Duquenoy translation? | r/audible, 2023-01-13 | 3 / 2 | "It appears to be the translation by Louise and Aylmer Maude. The audio sample lines up perfectly with the opening of Book 3 - Chapter XIV" (2). |

Pattern across 14 threads (2017 to 2024): Neville Jason is praised most consistently; Newton has drawn the most excitement since 2021, and some readers pick the Maude translation for her narration; Frederick Davidson splits listeners sharply ("brilliant" vs "avoid"); Ballerini has fans; readers keep asking for P&V and Briggs recordings, and repeatedly mix up which translation an edition uses. VERIFIED (from the comments above).

### 4b. Awards and reviews

- **2023 Audie Awards, Literary Fiction & Classics, WINNER**: "WAR & PEACE By Leo Tolstoy, translated by Louise Maude and Aylmer Maude Narrated by Thandiwe Newton Published by Audible Studios". Same year, **Best Female Narrator finalist**: "THANDIWE NEWTON for War and Peace … Published by Audible Studios". https://www.audiopub.org/2023audieawards-winners-1 VERIFIED.
- **2007 Audies, Solo Narration—Male, finalist**: "War and Peace Vol. 1 by Leo Tolstoy; narrated by Neville Jason (Naxos AudioBooks Ltd.)". https://www.audiopub.org/2007-audies-1 VERIFIED.
- No other War and Peace recording appears in any Audie year page 2000 to 2026 (the 2009 hit is Vonnegut's "Armageddon in Retrospect … Writings on War and Peace"). VERIFIED by the scan.
- **AudioFile (now on Kirkus)**: https://www.kirkusreviews.com/audiobook-reviews/leo-tolstoy/war-and-peace/ , combined review of Neville Jason's Vols. 1 and 2: "Neville Jason's mature rendering of Tolstoy's massive classic … he gives you a fresh and consistently insightful interpretation of the action, atmospheres, numberless characters, and author's apostrophes. Only his very young women ring a bit false. An accompanying booklet, intended to help the listener keep characters and events straight, is unnecessary, thanks to Jason's skill." The cover carries the page's `kirkus-earphones-awarded` marker. VERIFIED (text and marker). The same page's header credits "translated by Andrew Bromfield", which is **wrong**: Naxos, its booklet, Audible and the sample all say Maude (section 1c). Do not repeat it. "Best Audiobooks of 2007" rests on the Naxos page and booklet (publisher claim, VERIFIED as stated there); AudioFile's own list UNVERIFIED.
- Library Journal on Davidson (quoted on Audible, 1d). VERIFIED as quoted.
- No AudioFile/Kirkus review of the Newton edition appeared in the Kirkus audiobook search for "war and peace" (one result only). VERIFIED for that search.

---

## 5. HushBook facts for this book (positive framing; verified in source and on the live site copy)

### 5a. What Discover shows for "war and peace"

- VERIFIED. Discover searches archive.org for two libraries, LibriVox (`collection:librivoxaudio AND mediatype:audio`) and Internet Archive, 24 rows a page (`kIaPageSize = 24`, D:\hushbook\lib\core\store\librivox_provider.dart:17; request :600-611; query :681-687), sorted by all-time downloads by default (`kDownloadsSort`, D:\hushbook\lib\core\store\catalog_filter_queries.dart:88, 92-93; the month sort belongs only to the "Popular this month" row). Tier 1 needs every word in title or author (D:\hushbook\lib\core\store\search_query.dart:122); tier 2 drops stopwords and widens to subject and description, excluding tier-1 hits (:102-111).
- VERIFIED, and a correction to the scout's positions: the two libraries' pages are **interleaved index by index**, LibriVox first (`mergeCatalogPages`, D:\hushbook\lib\core\store\store_repository.dart:553-571; provider order D:\hushbook\lib\core\store\store_models.dart:675). Internet Archive's tier 1 returns 2 unrelated items today, so they land 2nd and 4th. Live result of the app's exact queries (`scripts/wp-discover-cards.mjs "war and peace"`), as the cards read (title | author line | length · rating):

| # | Card title | Author line | Length · rating | Download (64 kbps MP3, app format) | Chapters |
|---|---|---|---|---|---|
| 1 | War and Peace, Book 01: 1805 | Leo Tolstoy (transl. Aylmer and Louise Maude) | 5h 32m · 3 (6) | 152 MB | 28 |
| 2 | The Riddle of the Rhine: Chemical Strategy in Peace and War (Internet Archive) | Lefebure, Victor | no length | | |
| 3 | War and Peace Vol. 1 (1805-1806) [the Dole set; "Dole" is not in this title] | Leo Tolstoy | 15h 2m | 413 MB | 66 |
| 4 | Peace Theories and the Balkan War (Internet Archive) | Angell, Norman | no length | | |
| 5 | War and Peace, Book 02: 1805 | Leo Tolstoy (transl. …) | 4h 31m | 128 MB | 21 |
| 6 | War and Peace, Book 03: 1805 | Leo Tolstoy (transl. …) | 5h 2m | 138 MB | 19 |
| **7** | **War and Peace, Volume 1 (Maude translation)** | Leo Tolstoy | **14h 35m** · 5 (1) | **401 MB** | **68** |
| 8 | War and Peace, Book 04: 1806 | Leo Tolstoy (transl. …) | 3h 2m | 83 MB | 16 |
| **9** | **War and Peace, Volume 3 (Maude Translation)** | Leo Tolstoy | **17h 0m** · 5 (1) | **469 MB** | **96** |
| **10** | **War and Peace, Volume 2 (Maude Translation)** | Leo Tolstoy | **16h 9m** | **444 MB** | **99** |
| 11 | War and Peace, Book 05: 1806-1807 | Leo Tolstoy (transl. …) | 3h 52m | 107 MB | 22 |
| 12 | War and Peace, Book 07: 1810-1811 | Leo Tolstoy (transl. …) | 2h 38m · 4 (1) | 72 MB | 13 |
| 13 | War and Peace Vol. 2 (Dole Translation) | Leo Tolstoy | 16h 3m · 4 (1) | 447 MB | 98 |
| 14 to 18 | Book 09, Book 06, Book 08, Book 10, Book 11 | | 4h 19m, 4h 2m, 3h 57m, 7h 30m, 6h 10m | | |
| **19** | **War and Peace, Volume 4 (Maude Translation)** | Leo Tolstoy | **14h 44m** | **405 MB** | **102** |
| 20 to 25 | Book 14, Book 13, Book 17: Second Epilogue, Book 12, Book 16: First Epilogue, Book 15 | (Books 14 to 17 show plain "Leo Tolstoy") | 2h 8m, 2h 14m, 1h 54m, 2h 42m, 2h 31m, 2h 30m | | |
| 26 | Mr. Dooley in Peace and in War | Finley Peter Dunne | 5h 0m | | |

  Tier 1 URL (LibriVox) as the app sends it: `https://archive.org/advancedsearch.php?q=collection%3Alibrivoxaudio%20AND%20mediatype%3Aaudio%20AND%20((title%3A(war)%20OR%20creator%3A(war))%20AND%20(title%3A(and)%20OR%20creator%3A(and))%20AND%20(title%3A(peace)%20OR%20creator%3A(peace)))%20AND%20-subject%3Aerotica%20AND%20-subject%3Aeroticism%20AND%20-subject%3Aerotic%20AND%20-subject%3Apornography&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=downloads&fl[]=avg_rating&fl[]=num_reviews&fl[]=year&fl[]=runtime&fl[]=language&fl[]=subject&output=json&rows=24&page=1&sort[]=downloads%20desc`
- Card lines: title (two lines), the archive.org `creator` as the author line, and a meta line "length · rating (count) · library · language" (D:\hushbook\lib\features\store\widgets\store_cover_card.dart:14-15, 55-56; author from `creator`, librivox_provider.dart:662-679); length is whole rounded minutes as "14h 35m" (D:\hushbook\lib\features\store\discover_copy.dart:23-41); download size in MB (MiB) under 1 GB (discover_copy.dart:16-21). VERIFIED (code plus live data; not observed on a device).
- **Exactly what to pick for a complete single-voice listen:** the four cards titled "War and Peace, Volume N (Maude translation)": Volume 1 (7th card, 14h 35m), Volume 2 (10th, 16h 9m), Volume 3 (9th, 17h 0m), Volume 4 (19th, 14h 44m); listen 1, 2, 3, 4. Together 62 h 27 min, 365 chapters, about 1.7 GB (1,719 MiB). Safe wording: "search War and Peace and download the four titled Volume 1 to Volume 4 (Maude translation)". Avoid the 3rd card ("War and Peace Vol. 1 (1805-1806)"): it is the unfinished Dole set's first half. VERIFIED.
- The store page's facts list shows Read by, Language, Library, Recorded (year), Length with chapter count, Download size (D:\hushbook\lib\features\store\store_book_detail_screen.dart:941-980). For every War and Peace item the Read by line reads **"Reader not listed"** (D:\hushbook\lib\l10n\app_en.arb:7617): the reader comes only from the chosen files' `artist` tag, and an author's name there does not count (librivox_provider.dart:363-376; D:\hushbook\lib\core\store\reader_credit.dart:31-46); the 64 kbps files carry no artist tag and the others carry "Leo Tolstoy". Recorded reads 2022 (Vol. 1) and 2023 (Vols. 2 to 4). So the post must not say Discover names Mark Nelson. VERIFIED.
- "Play a sample" (app_en.arb:8697) plays 30 s of chapter 1, starting 30 s in to skip LibriVox's spoken introduction when chapter 1 is at least 2 minutes (D:\hushbook\lib\core\audio\sample_preview.dart:10-17). VERIFIED.

### 5b. Import and chapters (multi-part works)

- VERIFIED. Each Discover download becomes **one book** in the library with one chapter per file, titled as on the card, with the archive.org creator as author (D:\hushbook\lib\core\store\store_import_service.dart:379-405). So the Maude set arrives as four books, "War and Peace, Volume 1 (Maude translation)" to "Volume 4", with 68, 99, 96 and 102 chapters.
- VERIFIED (app logic on live metadata). Chapters order by the files' track tag, then file name; 64 kbps MP3 is preferred (librivox_provider.dart:268-331, 454-459). Chapter titles come from the files: Vol. 1 "Book 01 Chapter 01" … "Book 03 Chapter 19"; Vol. 4 ends "Second Epilogue Chapter 12" (`scripts/wp-librivox-detail.mjs`).
- VERIFIED. Store downloads start transcription on the phone by default ("Added to library. Transcription queued.", app_en.arb:771; default phone route D:\hushbook\lib\core\prefs\new_book_transcription.dart:34-42).
- VERIFIED (site copy). Files you own: "MP3, M4A, M4B, AAC, WAV, FLAC, OGG, OPUS, OGA, AIFF, AIF, CAF, WMA, MKA, and ALAC. Pick one file or several: several become one book, a chapter per file. Chapters inside M4B files are detected automatically" (D:\hushbook.app\index.html:668). Desktop: "Import MP3 and M4B files or whole folders. Covers and chapters come from the files." (D:\hushbook.app\desktop.html:431).
- Route to a modern translation with read-along: Penguin UK lists **Libro.fm** for the Briggs audiobook (VERIFIED, Penguin page); Libro.fm sells DRM-free MP3/M4B files (VERIFIED 2026-11-10 in the Monte Cristo research; libro.fm blocked us today). The Libro.fm listing itself: UNVERIFIED. Safe wording: "a DRM-free MP3 or M4B copy you own, for example the Penguin edition from Libro.fm".

### 5c. Reading along, names, speed, platforms

- VERIFIED (site copy). "Words fill in as the narrator reads them, with a red underline on the current one. Long-press any line to play from there." (index.html:1033). Long-press confirmation "Playing from here" (app_en.arb:8633); "Tap a line to jump there" is an off-by-default switch (app_en.arb:8453). Never write "tap any word".
- VERIFIED (site copy). "On the phone, each chapter is ready to read the moment it finishes." (index.html:1027).
- VERIFIED. **Character map**, free, on each book: "Character map" (app_en.arb:879), add a character; "First heard" captured from the playhead as "Ch. {chapter} · {time}" (app_en.arb:2160-2161; D:\hushbook\lib\features\characters\data\first_heard.dart); each card has role chips (Hero, Villain, Rival, Mentor, Friend, **Family**, Love interest, Narrator; app_en.arb:2219-2226), **Notes**, Attributes and Relationships (D:\hushbook\lib\features\characters\presentation\sheets\character_detail_sheet.dart:171-228); ties include Family, Siblings, Rivals, Parent of, Child of, Sweethearts, Secret, Not sure (app_en.arb:862-875, 2203-2206). The card has one name field plus Notes: so "keep Pierre, Count Bezúkhov and Monsieur Pierre on one card" means writing the other names in his Notes. Characters are added by hand; the string "Transcript suggestions become available after transcription" (app_en.arb:1069) is not used by any Dart code at HEAD, so do not claim suggestions. Each Maude volume is its own book, so each has its own map (one map per volume). VERIFIED.
- VERIFIED. Speed 0.5x to 3x in 0.05x steps (D:\hushbook\lib\features\player\widgets\playback_speed_sheet.dart:25-48; 0.5 at :26, 3.0 at :34, step 0.05 at :38).
- VERIFIED. Mark button "Mark: highlight, note or quote" (app_en.arb:8753); "Saved quotes & bookmarks" (app_en.arb:1071).
- VERIFIED, optional extra. "Sync with e-book": "Attach a matching, DRM-free EPUB, PDF or TXT" (app_en.arb:2113); first sync free, then Pro (D:\hushbook\lib\core\ebook\ebook_sync_allowance.dart:6, 33). The LibriVox Maude sets read Gutenberg #2600 (LibriVox `url_text_source`). Whether sync works when the audio book is one volume of a longer e-book: UNVERIFIED; do not suggest it for this book.
- VERIFIED. Works offline: "After the one-time HushBook Engine download, playback, read-along, and transcription run on your device without an internet connection." (index.html:752-757).
- VERIFIED. Platforms: iPhone and Android (App Store and Google Play links on index.html; App Store id6783243597, Google Play `com.hushbook.hushbook`); Windows 10 or 11, 64-bit, free ("Free · Windows 10 or 11, 64-bit", desktop.html:334), "Free and unlimited. No cap on books or hours." (desktop.html:347), "Discover Free public-domain audiobooks to browse and download." (desktop.html:433).
- VERIFIED. **Live App Store version 1.3.5**, released 2026-10-30, free, iOS 16.4+, 5 stars (4 ratings) (https://itunes.apple.com/lookup?id=6783243597&country=us). Matches the source's 1.3.5 (build 70 is not shown by the store). Play Store version not checked.
- VERIFIED. Price: "The core read-along experience and the public-domain library are free. There's an optional Pro upgrade for advanced analytics" (index.html:676). "With Pro, Transcribe on my PC sends it to your computer over home Wi-Fi." (index.html:1021).
- VERIFIED. Privacy: "Transcription runs on-device. There is no account and no cloud upload of your audio." (D:\hushbook.app\llms.txt:3).

---

## 6. Competing pages: provable factual errors (state the right fact; do not name them)

Pages were fetched by the scout today (`9b795cca…/scratchpad/wp/pages/`) and re-read from those files.

### 6a. audiobookfest.com, "Best War and Peace Audiobook: Top Picks for Immersive Listening" (2024-11-15)

https://audiobookfest.com/best-war-and-peace-audiobook-top-picks-for-immersive-listening/

- "Audible Exclusive: Narrated by Nicholas Guy Smith … Translation: Anthony Briggs … 60 hours": **no such recording**. Audible US narrator search for Nicholas Guy Smith (92 titles) has no Tolstoy; no Briggs recording other than Penguin's five-reader edition (67 h 13 min) exists in any catalogue checked. VERIFIED.
- "Narrated by Alexandra O'Karma … Translation: Richard Pevear and Larissa Volokhonsky … 63 hours": **no such recording**; her 27 Audible US titles include no Tolstoy, and no P&V War and Peace audiobook exists in Audible (4 markets), Apple, OverDrive or Kobo. VERIFIED.
- "Abridged Version: Narrated by Juliet Stevenson … 25 hours": not found (Audible US/UK keyword search 0 results; Apple 0). The abridged recordings found run 44 minutes to 5 h 10 min (plus two oddly labelled listings of about 16 and 60 hours), and the radio dramatisations 8 to 10 hours. VERIFIED.
- "Narrated by Frederick Davidson … Length: 58 hours": Audible, Kobo and Downpour say 61 hrs 6 mins; Apple 61:05:56. VERIFIED. (Its "Translation: Constance Garnett" for Davidson is right: OverDrive and Kobo credit Garnett and the sample matches Garnett.)
- "Neville Jason … 61 hours … Louise and Aylmer Maude": correct (61 h 43 min over two volumes). Its omission of the two-volume purchase, of Thandiwe Newton (the 2023 Audie winner), Ballerini, LibriVox and the BBC dramatisation is a gap, not an error.

### 6b. explore.oreateai.com, "Why choosing the right War and Peace audiobook narrator changes everything" (2026-08-21)

- "An unabridged recording typically lasts between 60 and 67 hours": Ballerini runs 55 hrs 30 mins, Duquenoy 56 hrs 45 mins, Keith Brown 57 hrs 47 mins, Keeble 59 hrs 5 mins. VERIFIED.
- "Dramatized or abridged versions are much shorter, usually between 10 and 20 hours": the BBC 2015 dramatisation is 9 hrs 38 mins, the older BBC 8 hrs 25 mins (Audible) / 9:28:16 (Apple), Naxos abridged 5 hrs 9 mins, Petherbridge 4 hrs 47 mins. VERIFIED.
- "Most audiobooks, including Thandiwe Newton's and Neville Jason's, use the Maude translation": correct (section 1c).

### 6c. thebooksinsider.com, "War and Peace Audiobook: Length, Rating & Free Listen (20.6 hrs)"

- "the War and Peace audiobook runs an estimated 20.6 hours": no unabridged recording is under 50 hours (shortest: Christopher Preece 50 hrs 39 mins; the main editions 55 h 30 min to 67 h 13 min). VERIFIED.

### 6d. Kirkus/AudioFile review page header

- "translated by Andrew Bromfield" for Neville Jason's Vol. 1: wrong; it is Maude (Naxos page "Translated by: Aylmer and Louise Maude", booklet credits, Audible summary "War and Peace was translated by Louise and Aylmer Maude", sample 96% Maude). VERIFIED. (A review host, not a ranking competitor; listed because the scout flagged it.)

### 6e. Correct as checked (no error found)

- classicsretold.com (2026-11-08) audio box: Newton, Maude, 60 h 14 min, Audible Studios; Ballerini, Maude, 55 h 30 min, AmazonClassics/Brilliance; Davidson, 61 h 6 min, Blackstone; Penguin full cast, Briggs: all match today's data. It adds "and others" to the Penguin readers; Audible lists exactly five. Missing: Neville Jason, LibriVox, BBC.
- playlisttime.com: Davidson 61h 05m and Duquenoy 56h 47m match Apple. VERIFIED.

### 6f. Reddit misattributions worth correcting in the post (without naming anyone)

- "Neville Jason … was Constance Garnett translation" (qmisl6, 2021): wrong, Maude.
- "Frederick … using the rough Constance Garnett translation" (mr5pna, 2021): right.

---

## 7. Picks, with the evidence

- **Best overall: Thandiwe Newton (Audible Studios, 2021, Maude, 60 h 14 min).** The only War and Peace recording to win an Audie (2023, Literary Fiction & Classics; she was also a Best Female Narrator finalist). Audible US 4.6 from 1,613 ratings, performance 4.7 (UK 4.5 from 708). One title instead of two volumes; shown as "Listen for free" to a signed-out US visitor today and carried in Kindle Unlimited per the API; Whispersync tag. Apple Books $32.99. Reddit: the 2021 release thread is the most-upvoted War and Peace audiobook thread found (78), and readers pick the Maude translation "because of Thandiwe Newton's narration". Caveat from two Apple reviews: some character voices are loud. Audible and Apple only (not in Libby).
- **Runner-up, and best to borrow: Neville Jason (Naxos, 2006, Maude, 61 h 43 min in two volumes).** Highly rated by many listeners (Vol. 1 4.6 from 2,658; Vol. 2 4.7 from 2,121, together 4,779 against Davidson's 4,900 on one title; performance 4.7 and 4.8, level with Ballerini and Duquenoy at the top); 2007 Audie finalist; AudioFile review on Kirkus with the Earphones marker ("a fresh and consistently insightful interpretation"); the most consistent praise on Reddit across 2017 to 2024. On Libby at NYPL, LAPL, KCLS and SFPL; Naxos links Spotify. Two purchases on Audible ($27.49 each).
- **Best free: LibriVox Maude Volumes 1 to 4, read by Mark Nelson (2022-23, 62 h 27 min).** The only complete free recording in one voice; 365 chapters; 5-star reviews on Vols. 1 and 3 ("Well Read"). In HushBook Discover: the four cards titled "War and Peace, Volume N (Maude translation)", about 1.7 GB in all. The older 17-book set changes reader every few chapters (85 readers; its Book 01 averages 3 stars, "multiple people have contributed … there are problems"); the Dole set stops halfway.
- **Best modern translation: Penguin Classics, Anthony Briggs's translation, five readers (2020, 67 h 13 min).** It is the only recording of any translation made after the Maudes' (no Edmonds, Dunnigan, P&V or Mandelker audio exists in any catalogue checked). UK 4.5 from 174 ratings; Audible US $19.32; Penguin UK £16.00 and sold through Libro.fm, Kobo, Spotify, Google Play and others per Penguin. Briggs puts the French into English (other researcher to confirm in the text).
- **Best for following the names: Neville Jason's Naxos edition, with the free Naxos booklet.** The 36-page PDF (free on naxosaudiobooks.com) lists "The Characters" by family (Bezukhovs, Rostovs, Bolkonskys, Kuragins) and gives every chapter a descriptive title; AudioFile's review mentions the booklet "intended to help the listener keep characters and events straight". A listener notes Jason "reads out the story entirely in English" for the French. For seeing each name as it is spoken, the free LibriVox Maude recording read along in HushBook, with a character card per person (notes for the other names, first heard chapter and time, family ties), is the HushBook hook (section 5c).
- **Also worth naming:** Edoardo Ballerini (AmazonClassics, Maude, 55 h 30 min, the shortest main edition; 4.6 from 602, performance 4.8; Kindle Unlimited plan; Whispersync tag). Frederick Davidson (Blackstone, Garnett, 61 h 6 min): most-rated single title (4,900) but the lowest stars (4.1 / 4.2) and the most divided Reddit opinion; the easiest to borrow (Libby in all five library systems checked).

---

## 8. Ready-to-paste comparison table (VERIFIED rows only)

| Narrator | Translation | Runtime | Publisher | Year | Where to get it |
|---|---|---|---|---|---|
| Thandiwe Newton | Louise and Aylmer Maude | 60 h 14 min | Audible Studios | 2021 | Audible, Apple Books |
| Neville Jason | Louise and Aylmer Maude | 61 h 43 min (two volumes) | Naxos AudioBooks | 2006 | Audible, Apple Books, Libby, Spotify |
| Frederick Davidson | Constance Garnett | 61 h 6 min | Blackstone | 1997 | Audible, Apple Books, Kobo, Libby, Downpour |
| Edoardo Ballerini | Louise and Aylmer Maude | 55 h 30 min | Brilliance Audio (AmazonClassics) | 2020 | Audible, Apple Books |
| Chloe Pirrie, Sam Woolf, Michael Fox, Olivia Darnley, Terence Wilton | Anthony Briggs | 67 h 13 min | Penguin Classics | 2020 | Audible, Kobo, Libro.fm, Spotify, Google Play, Apple Books (UK) |
| Philippe Duquenoy | Louise and Aylmer Maude | 56 h 45 min | Goffin Media | 2021 | Audible, Apple Books |
| Jonathan Keeble | Louise and Aylmer Maude | 59 h 5 min | SNR Audio | 2023 | Audible, Apple Books, Kobo |
| Keith Brown | Louise and Aylmer Maude | 57 h 47 min | Spotify Audiobooks | 2026 | Audible, Apple Books, Kobo |
| Mark Nelson (LibriVox, Volumes 1 to 4) | Louise and Aylmer Maude | 62 h 27 min | LibriVox (free) | 2022-23 | LibriVox, Internet Archive, HushBook Discover |
| LibriVox volunteers, Books 1 to 17 (85 readers) | Louise and Aylmer Maude | 64 h 36 min | LibriVox (free) | 2007-11 | LibriVox, Internet Archive, HushBook Discover |
| MaryAnn (LibriVox, Dole Vols. 1 and 2; first half only) | Nathan Haskell Dole | 31 h 6 min | LibriVox (free) | 2013-15 | LibriVox, Internet Archive, HushBook Discover |

Year notes: Davidson's year is Blackstone's (P)1997 line (Audible lists 2005-01-21, Apple 2006-01-01). Jason: Naxos "September 2006" (Audible 2006-12-31). Runtimes are Audible's (LibriVox's own for the free sets; Jason = 30 h 19 min + 31 h 24 min). "Spotify" for Jason rests on the Naxos page's link; Kobo, Libro.fm, Spotify and Google Play for the Penguin edition rest on Penguin UK's store list (Kobo US did not show it on its first results page; Libro.fm blocked us). Ratings to quote: Newton 4.6 (1,613); Jason 4.6 (2,658) and 4.7 (2,121); Davidson 4.1 (4,900); Ballerini 4.6 (602); Penguin 4.5 (174, Audible UK).

Abridged and dramatised, to flag: BBC Radio 4 dramatisation, 2015 (9 h 38 min, full cast, Timberlake Wertenbaker's adaptation); older BBC Radio 4 dramatisation (8 h 25 min on Audible, 9 h 28 min on Apple; Simon Russell Beale as Pierre, Leo McKern as Kutuzov); Neville Jason abridged (Naxos, 5 h 9 min, Maude); Edward Petherbridge abridged (CSA Word, 4 h 47 min, Garnett by sample).

---

## 9. Sources (opened 2026-11-11)

Audible
- Catalogue API: https://api.audible.com/1.0/catalog/products?keywords=war+and+peace&num_results=50&response_groups=contributors,product_desc,product_attrs,rating,media,sample,series,relationships (and .co.uk, .ca, .com.au; 20 keyword sets); per-ASIN `/1.0/catalog/products/{ASIN}?response_groups=…price,product_plans…`; narrator search `?narrator=Alexandra%20O%27Karma`, `?narrator=Nicholas%20Guy%20Smith`
- Rendered product pages (`?ipRedirectOverride=true&overrideBaseCountry=true`): https://www.audible.com/pd/B095TS6LLR (Newton) · /pd/B002V0PVJC (Davidson) · /pd/B002V5CULY (Jason Vol. 1) · /pd/1799744698 (Ballerini) · /pd/0241440939 (Penguin/Briggs) · /pd/B01N9QSAZ9 (BBC 2015)
- API-only: B002V1BXZM (Jason Vol. 2) · B09D8S4Y2K (Duquenoy) · B0C1PC24PW (Keeble) · B07LFH8K1N (Munro) · B0DLGNTDWJ (Barrett) · B0CLZ1N4M3 (Preece) · B0HBPGFXCF (Keith Brown) · B0DGLJ2J87 (Kusi) · B0CCSW8BNS (Harry Shaw) · B0H2S8HVQ6, B0HG8RD1FV (Virtual Voice) · B077ZV2KRB (Ella Porter) · B0BTMWMQWD (Original Manuscript) · B002VA3GY4 (BBC older) · B09KYF2HYL (BBC Tolstoy collection) · B002V0M1PY (Jason abridged) · B0036GTGFA, B008MOI0SK (Petherbridge) · B002V0KQ5Q (Sherman Allen) · B0C94NZQLP, B0HNDKCKT4 (SNR bundles) · B0DJ6VFBJ9, B0HH5NH35V (LibriVox-sourced free listings); UK: B095V27YSS, B004FTX2QQ, B004FTX3DI, B004FTL6IW, B01MY7DKK2, B004EW2U9O, 0241440939, 1799744698
- Sample MP3s: `https://samples.audible.com/bk/{…}_sample.mp3` (API `sample_url`)

Apple Books
- https://itunes.apple.com/search?term=war+and+peace&media=audiobook&country=us&limit=200 (and "war and peace tolstoy", "war peace tolstoy unabridged", "war and peace bbc", "war and peace penguin classics", "anthony briggs tolstoy", "alexandra o'karma", "nicholas guy smith", "juliet stevenson tolstoy"); https://itunes.apple.com/lookup?id=1510736337&country=gb (Penguin UK)
- https://books.apple.com/us/audiobook/id1626523876 (Newton) · id1503398078 (Ballerini) · id1646772706 (Davidson) · id1748221941, id1748222438 (Jason Vol. I, II) · id1748224347 (Jason abridged) · id1582667524 (Duquenoy) · id1681158604 (Keeble) · id1446246548, id1219098058 (BBC 2015) · id1480384399 (BBC older) · id1727581662 (Mark Nelson, Parolita Libro) · id1891333694 (Petherbridge)

Publishers
- https://naxosaudiobooks.com/war-and-peace-volume-i-unabridged/ · /war-and-peace-volume-ii-unabridged/ · /war-and-peace-abridged/ · /war-and-peace-the-final-episode/ (Nicolas Soames blog, 10 March 2007) · https://www.naxosaudiobooks.com/booklets/43312_War_and_Peace--Volume_I.pdf
- https://www.penguin.co.uk/books/301515/war-and-peace-by-tolstoy-leo/9780241440933

Libraries and other stores
- https://thunder.api.overdrive.com/v2/libraries/nypl/media?query=war%20and%20peace&format=audiobook-overdrive,audiobook-mp3&perPage=100 (also lapl, kcls, sfpl, chipublib)
- https://www.hoopladigital.com/search?q=war%20and%20peace&scope=everything&type=direct&kindId=8 ; https://www.hoopladigital.com/audiobook/war-and-peace-leo-tolstoy/15909982 (Petherbridge)
- https://www.kobo.com/us/en/search?query=war%20and%20peace%20tolstoy&fcmedia=AudioBook
- https://downpour.com/search?q=war+and+peace ; https://downpour.com/products/book-2163 (Davidson)

Free
- https://librivox.org/api/feed/audiobooks/?title=%5EWar%20and%20Peace&format=json&extended=1&limit=50
- LibriVox catalogue pages: https://librivox.org/war-and-peace-volume-1-maude-translation-by-leo-tolstoy/ · …-volume-2-maude-translation-… · …-volume-3-maude-translation-… · …-volume-4-maude-translation-… · https://librivox.org/war-and-peace-book-01-by-leo-tolstoy/ (and Books 02 to 17) · https://librivox.org/war-and-peace-vol-1-1805-1806-by-leo-tolstoy/ · https://librivox.org/war-and-peace-vol-2-by-leo-tolstoy/ · https://librivox.org/war-and-peace-vol-3-by-leo-tolstoy/ (forum login)
- https://archive.org/metadata/war_peace1_maude_translation_2212_librivox · war_peace_2_maude_translation_2302_librivox · war_peace_3_maude_translation_2305_librivox · war_and_peace_4_maude_translation_2306_librivox · war_and_peace_01_librivox (and the other 16 book items) · war_and_peace_vol1_dole_mas_librivox · war_and_peace_vol2_dole_1512_librivox
- Texts for the sample test: https://www.gutenberg.org/ebooks/2600 (Maude, scout's download) · https://archive.org/download/warpeace01tols_0/warpeace01tols_0_djvu.txt (Garnett) · https://archive.org/download/warandpeace01dolegoog/warandpeace01dolegoog_djvu.txt , https://archive.org/download/warandpeace00dolegoog/warandpeace00dolegoog_djvu.txt (Dole)
- https://etc.usf.edu/lit2go/authors/

Listeners, awards, reviews
- https://arctic-shift.photon-reddit.com/api/posts/ids?ids=qmisl6,nwz66z,14ao9hg,176fo3k,15pgf0t,18uzbbg,p4dky1,ovtot0,mr5pna,6eq2wo,10b2kos,18vkecx,11e23rm ; `/api/posts/search?subreddit={sub}&title=war%20and%20peace` ; `/api/comments/search?link_id={id}` ; `/api/comments/tree?link_id={id}`
- https://www.audiopub.org/2023audieawards-winners-1 · https://www.audiopub.org/2007-audies-1 (all 27 year pages 2000 to 2026 scanned)
- https://www.kirkusreviews.com/audiobook-reviews/leo-tolstoy/war-and-peace/ ; https://www.kirkusreviews.com/search/audiobooks/?q=war%20and%20peace

Competitors
- https://audiobookfest.com/best-war-and-peace-audiobook-top-picks-for-immersive-listening/ · https://explore.oreateai.com/explore/why-choosing-the-right-war-and-peace-audiobook-narrator-changes-everything · https://classicsretold.com/2026/11/08/best-translation-of-war-and-peace/ · https://thebooksinsider.com/audiobook/war-and-peace/ · https://playlisttime.com/audiobook-length/war-and-peace/

HushBook
- D:\hushbook HEAD c0040d1: files and lines in section 5. D:\hushbook.app: index.html, desktop.html, llms.txt lines in section 5. https://itunes.apple.com/lookup?id=6783243597&country=us

Scripts (this folder): `scripts/wp-audible-catalog.mjs`, `scripts/wp-audible-products.mjs`, `scripts/wp-render.mjs`, `scripts/wp-apple.mjs`, `scripts/wp-overdrive.mjs`, `scripts/wp-hoopla.mjs`, `scripts/wp-kindle-pairing.mjs` (blocked today), `scripts/wp-librivox-detail.mjs`, `scripts/wp-discover-cards.mjs`, `scripts/wp-reddit.mjs`, `scripts/wp_sample_transcribe.py`, `scripts/wp_translation_match.py`; reused from the sibling: `audible-product-dump.mjs`, `audible-pages.mjs` (503 today), `discover-search.mjs`.

---

## 10. Do not claim

1. That any unabridged audiobook of the **Pevear and Volokhonsky, Dunnigan, Edmonds, Mandelker (Oxford revised Maude), Wiener or Bell** translation exists, or a **solo** Briggs recording. The only modern-translation recording is Penguin's five-reader Briggs (2020).
2. That Nicholas Guy Smith, Alexandra O'Karma or Juliet Stevenson recorded War and Peace (audiobookfest's picks; not found anywhere).
3. That Neville Jason reads Garnett or Andrew Bromfield's translation. He reads Maude (publisher, booklet, Audible, sample).
4. That Frederick Davidson reads Maude, or runs 58 hours. He reads Garnett, 61 h 6 min.
5. That the BBC versions are audiobooks of the novel: both are radio dramatisations (2015: about 10 hours, Timberlake Wertenbaker's adaptation; older: about 8.5 to 9.5 hours). That Jessie Buckley is in the 2015 radio cast (autocomplete only; Audible's cast lists do not name her).
6. That Thandiwe Newton won the Audie for Best Female Narrator (she was a finalist; her recording **won** Literary Fiction & Classics, 2023). That Neville Jason won an Audie (finalist, 2007, Solo Narration—Male).
7. AudioFile honours as AudioFile's own statement: the Earphones marker is seen on Kirkus's page and "Best Audiobooks of 2007" on Naxos's page and booklet; AudioFile's list itself was not reachable.
8. Prices, "free with membership", "Kindle Unlimited" or credit counts as permanent facts. Newton shows "Listen for free" only to a signed-out US visitor on 2026-11-11; the tier is UNVERIFIED.
9. That the Penguin edition is a "full-cast dramatisation" or has more than the five credited readers. It is an unabridged reading shared by five actors.
10. That the Penguin Briggs edition is on Apple Books US (UK only today) or that it is region-locked on Audible US (it is listed at $19.32 today).
11. That HushBook Discover names Mark Nelson (every War and Peace card says "Reader not listed"), or that the card positions (7th, 10th, 9th, 19th) are fixed: they follow archive.org download counts and will drift. Tell readers to pick the four titled "Volume 1 (Maude translation)" to "Volume 4".
12. That HushBook opens Audible, Kindle, Apple Books, Kobo, Libby, hoopla, Spotify or Chirp purchases. Scope to "audiobook files you own" and "DRM-free MP3 or M4B".
13. That HushBook detects or suggests characters automatically, fills in other names for you, or shows the Maude text's accented spellings (Bezúkhov, Natásha) in the read-along: the words on screen come from the recording's transcript. Say "add Pierre once and keep his other names in his card's notes".
14. That e-book sync works for a book split into volumes (UNVERIFIED), or that sync is unlimited for free users (first sync free).
15. That "Transcribe on my PC" is free (Pro), or that a Mac app exists.
16. That the commercial Mark Nelson (Parolita Libro) or the Audible "Free Tier" podcast listings are the LibriVox recordings.
17. Which Kindle edition pairs with which narration (Whispersync tags only seen on Newton and Ballerini).
18. That Frederick Davidson is David Case (not checked), or the original broadcast year of the older BBC dramatisation.
19. That Lit2Go has War and Peace (it does not).
20. Any phone transcription time for this book, or that names will be spelled a particular way in the transcript.
21. That the Play Store build matches 1.3.5 (only the App Store was checked: 1.3.5, 2026-10-30).
