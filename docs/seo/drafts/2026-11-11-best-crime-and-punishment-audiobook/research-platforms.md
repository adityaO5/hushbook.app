# Platform research: best Crime and Punishment audiobook

Post slug: `best-crime-and-punishment-audiobook`. Researched November 11, 2026. Every claim carries a source, the date read (November 11, 2026 unless a line says otherwise) and **VERIFIED** (opened and seen today) or **UNVERIFIED**. Prices and ratings change; each is a snapshot of 2026-11-11.

Scope: what a listener can actually get (editions, free recordings, read-along elsewhere, listener opinion, HushBook, competing pages). The book itself, translation history and critical reception belong to the other researcher.

## How pages were read

- **Audible catalogue API** (no auth): `https://api.audible.com/1.0/catalog/products?keywords=...` and `/catalog/products/{ASIN}` with response groups contributors, product_desc, product_attrs, rating, media, sample, price. Same queries on `api.audible.co.uk`, `.ca`, `.com.au`. Keyword sets: "crime and punishment", "+dostoevsky", "+dostoyevsky", "+pevear", "+mcduff", "+katz", "+oliver ready", "+garnett", "+pasternak slater", "+cockrell", "+monas", "+bbc", "+penguin", "+translated". The API list price equals the "Buy for" price on the US product page for every title checked (Heald $27.49 both ways).
- **Audible US product pages** with `?ipRedirectOverride=true&overrideBaseCountry=true` (curl for price, length and data tags; headless Chrome for the client-rendered buy box). Script: `scripts/audible-pages.mjs`, `scripts/render-pages.mjs`.
- **Apple Books**: iTunes Search API (`media=audiobook`, US) plus each `books.apple.com/us/audiobook/id…` page's schema.org data. Script: `scripts/apple-pages-parse.mjs`.
- **Libby**: OverDrive's public catalogue API `https://thunder.api.overdrive.com/v2/libraries/{nypl|lapl|kcls|sfpl|chipublib}/media?query=crime and punishment`.
- **hoopla**: headless Chrome, search plus every title page (`scripts/hoopla-titles.mjs`).
- **Kobo US** search page (curl). **Downpour** search page plus Shopify product JSON (`scripts/downpour.mjs`; most product requests got HTTP 429).
- **Translation check by listening**: every unabridged Audible sample MP3 was transcribed with faster-whisper (large-v3-turbo, CPU) and scored against Constance Garnett's text (Project Gutenberg #2554) by 6-word shingle overlap. A Garnett recording scores 83 to 99% (speech-recognition noise keeps it under 100); Oliver Ready's scores 3.6%. Scripts: `scripts/sample_opening.py`, `scripts/garnett_match.py`. This is how the translation of editions whose store page names no translator was settled.
- **LibriVox**: LibriVox API (`/api/feed/audiobooks/?title=^crime and punishment&extended=1`, then `?id=` per project), the four catalogue pages, archive.org `advancedsearch` and `/metadata/{item}`.
- **HushBook**: app source D:\hushbook at HEAD `c0040d1` (2026-11-05), pubspec `version: 1.3.5+70` (D:\hushbook\pubspec.yaml:4). Same HEAD as the Monte Cristo research on 2026-11-10, so that file's app citations still hold; the ones used here were re-read today.

**Blocked today** (availability there NOT verified by me): Libro.fm (HTTP 403 to curl and headless Chrome), Chirp (Cloudflare check), Amazon product data for US prices (Amazon served this machine's location, India; Kindle prices were read from the "You will be charged USD …" line), Naxos booklet PDFs (served HTML), Naxos direct sale ("Due to copyright, this title is not currently available in your region"), AudioFile Magazine (audiofilemagazine.com now redirects to kirkusreviews.com/discover-audiobooks), Reddit RSS (not tried; Arctic Shift API used instead), Spotify catalogue (needs a login), Google SERP and People Also Ask.

---

## 1. Unabridged English editions

### 1a. Master table (all values read 2026-11-11)

Translation column: "Garnett (sample)" = the Audible sample matched Garnett's text by the shingle test; "Garnett (store)" = the store credits Constance Garnett; "Garnett (publisher)" = the publisher's description says so. Ratings: Audible US overall stars (number of ratings) and performance stars. Runtimes as each page prints them.

| # | Narrator | Translation | Publisher | Release | Runtime | Audible US rating (ratings) / performance | Audible US price | Where sold (checked today) | Audible sample | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Anthony Heald | Garnett (sample 98.6%; OverDrive credits Garnett) | Blackstone Publishing; page reads "(P)2007 Blackstone Audio, Inc." | Audible 12-03-07; Apple 2007-12-03 | Audible 20 hrs 28 mins; Apple 20:29:19; OverDrive 20:29:20; Kobo 20 h 29 min; hoopla 20h 29m | 4.6 (10,436) / 4.8 | $27.49 | Audible US/UK/CA/AU; Apple Books $22.99, 4.3 (16); Libby (NYPL 10 copies, LAPL, KCLS, SFPL, Chicago PL); hoopla (Blackstone, 20h 29m); Kobo US | yes | VERIFIED |
| 2 | Will Poulter | Garnett (sample 95.1% on 120 s, 91.8% on 150 s); page reads "Public Domain (P)2020 Audible, Ltd" | Audible Studios | Audible 09-21-20; Apple 2020-09-21 | Audible 22 hrs 27 mins; Apple 22:27:40 | 4.7 (1,061) / 4.9 | no buy price shown; button reads "Listen for free" | Audible US/UK/CA/AU; Apple Books $21.99, 4.5 (24); Downpour (Audio CD only) | yes | VERIFIED |
| 3 | Constantine Gregory | Garnett (sample 94.1%) | Naxos AudioBooks | Naxos "Released: September 2013"; Audible 12-30-12; Apple 2013-06-01 | Naxos 22 h 03 m; Audible 22 hrs 2 mins; Apple 22:02:14; hoopla 22h 2m | 4.6 (2,094) / 4.7 | $28.16 | Audible US/UK/CA/AU; Apple Books $44.99; hoopla; Naxos page links Spotify and Naxos Spoken Word Library | yes | VERIFIED. Naxos IDs: Digital ISBN 978-1-84379-750-0, Cat. no. NA0140, download 338 MB. Audible says a PDF comes with it. |
| 4 | George Guidall | Garnett (sample 94.3%; Audible credits "Constance Garnett - translator") | Recorded Books | Apple copyright "© 1991 Recorded Books, Inc."; OverDrive 1991-01-01; Audible 10-17-00 | Audible 25 hrs 1 min; Apple 25:02:37; OverDrive 25:03:37; hoopla 25h 3m | 4.3 (2,718) / 4.5 | $25.36 | Audible US/UK/CA/AU; Apple Books $26.99; Libby (LAPL); hoopla; Downpour (audiobook and CD) | yes | VERIFIED |
| 5 | Don Warrington | **Oliver Ready** (Audible, Penguin UK, OverDrive credit him; sample 3.6% Garnett, opening "in early July in exceptional heat towards evening a young man left the garret he was renting in Stoliarny Lane") | Penguin Classics (Penguin Audio) | Penguin UK "Published: 23/04/2020"; Audible 04-23-20 | Penguin UK "Length: 1502 minutes"; Audible 25 hrs 2 mins; Apple 25:02:21; OverDrive 25:02:24 | 4.6 (148) / 4.6 | $19.32 | Penguin UK lists Apple Books, Audible, Bookshop.org, Google Play, Hive, Kobo, Libro.fm, Spotify, xigxag (£16.00); Apple Books $12.99, 4.3 (46); Libby (LAPL 4 copies) | yes | VERIFIED. Includes "an Introduction by Oliver Ready" (Audible summary). ISBN 9780241429525. |
| 6 | Bill Homewood | **Richard Pevear & Larissa Volokhonsky** (Audible authors list both as translator; subtitle "The New Translation by Richard Pevear and Larissa Volokhonsky"; Apple and Kobo credit "TRANSLATORS: Richard Pevear, Larissa Volokhonsky"; sample is an introduction, 0% Garnett, see 1c) | Echo Point Books & Media, LLC | Audible 02-20-25 ("newly recorded for 2025"); Apple 2025-02-20 | Audible 28 hrs 4 mins; Apple 28:04:41; OverDrive 28:04:42; Kobo 28 h 4 min; hoopla 28h 5m | 4.8 (121) / 4.6 | $30.14 | Audible US/UK/CA/AU; Apple Books $12.99, 4.6 (32); Libby (LAPL 12 copies); hoopla; Kobo US | yes | VERIFIED |
| 7 | James Anderson Foster | Garnett (Audible credits "Constance Garnett - translator"; sample 92.4%, opens on Garnett's first sentence) | Brilliance Audio (AmazonClassics Edition) | Audible 05-11-18; Apple 2018-05-10 | Audible 20 hrs 43 mins; Apple 20:44:57 | 4.4 (688) / 4.6 | $29.72 | Audible US/UK/CA/AU; Apple Books $19.99; Audible plans list includes Kindle Unlimited | yes | VERIFIED. 2019 Audie finalist (section 4). |
| 8 | Charlton Griffin | Garnett (Audible credits; sample is an introduction, not scored) | Audio Connoisseur | Audible 02-25-08; Apple 2026-10-02 (re-listed) | Audible 24 hrs 19 mins; Apple 24:20:43 | 4.1 (600) / 4.3 | $27.49 | Audible; Apple Books $34.99, 4.4 (8) | yes | VERIFIED |
| 9 | Dick Hill | Garnett (spoken credit in the sample: "translated by Constance Garnett, narrated by Dick Hill … produced in the year 2010 by Tantor Media"; sample 83.5%) | Tantor Audio | Audible 07-26-10 | Audible 23 hrs 44 mins; Apple 23:44:14; OverDrive 23:44:16 | 4.3 (36) / 4.4 | $27.49 | Audible; Apple Books $22.99; Libby (LAPL, SFPL) | yes | VERIFIED |
| 10 | Walter Zimmerman | Garnett (sample 94.4%) | Jimcin Recordings | Audible 04-04-06 | Audible 23 hrs 21 mins; Apple 23:22:59 | 3.9 (129) / 3.9 | $27.49 | Audible; Apple Books $15.99 | yes | VERIFIED |
| 11 | Alan Munro | Garnett (sample 91.2%) | Trout Lake Media | Audible 08-19-13 | Audible 25 hrs 4 mins; Apple 25:05:18 | 3.9 (220) / 3.6 | $28.18 | Audible; Apple Books $15.99, 3.2 (18) | yes | VERIFIED |
| 12 | Alastair Cameron | Garnett (sample 93.6%, opens on Garnett's first sentence) | A.R.N. Publications | Audible 04-21-16 | Audible 20 hrs 8 mins; Apple 20:09 | 4.6 (84) / 4.7 | $28.54 | Audible; Apple Books $25.99, 4.6 (7) | yes | VERIFIED |
| 13 | Mark Nelson | Garnett (sample 96.9%) | Paperless | Audible 09-18-17 | Audible 21 hrs 50 mins; Apple 21:51:05 | 4.6 (14) / 4.5 | $29.18 | Audible; Apple Books $25.99; a second Apple listing "Mark Nelson", Mariner's Folio Press, 21:48:18, $14.99 | yes | VERIFIED. Same reader as free LibriVox Version 3; whether it is the same recording is UNVERIFIED. |
| 14 | David Rintoul | Garnett (sample 92.2%, opens on Garnett's first sentence) | SNR Audio | Audible 10-27-23; Apple 2026-07-22 | Audible 22 hrs 38 mins; Apple 22:38:46 | 4.8 (10) / 4.7 | $30.02 | Audible; Apple Books $19.99; also inside SNR Dostoyevsky collections (2025 Audie finalist, section 4) | yes | VERIFIED |
| 15 | David Bendena | Garnett (publisher: "This new and unabridged audiobook edition is based on Constance Garnetts 1914 translation") | Dreamscape Media | Audible 02-18-25 | Audible 22 hrs 22 mins; hoopla 22h 22m | 5.0 (1) | $30.14 | Audible; hoopla | yes | VERIFIED |
| 16 | Keith Brown | Garnett (sample 96.1%) | Spotify Audiobooks | Audible 08-11-26 | Audible 21 hrs 20 mins; Kobo 21 h 20 min; hoopla 21h 20m | no ratings | $31.58 (API) | Audible; Apple Books $19.99; Kobo; hoopla | yes | VERIFIED |
| 17 | Peter Batchelor | Pevear & Volokhonsky (API subtitle "Pevear & Volokhonsky Translation (Vintage Classics)") | Echo Point Books & Media, LLC | API 2020-11-12 | API 1505 min (25:05) | API 4.5 (382) / 4.1 | none | **Not on sale**: Audible US page `/pd/B08NCWBWCY` returns HTTP 404; API shows no price and no sample | no | VERIFIED as withdrawn on Audible US today. Superseded by #6. |

Smaller unabridged listings seen on Audible US today, not recommended without further checks (all VERIFIED as listed only): Harry Shaw (Spoken Realms, 21:43; welovetranslations says Harry Shaw is Mark Nelson); Mary J. (Hexagon Tech, 21:05, 4.3 (6); "Mary J" coordinated LibriVox Version 4); Teddy Garraway (NTMC, 20:57); Arthur Lane (Lantern Audio, 21:08, 2026); Emma Bronks (Dahmani, 23:06); Geoffrey Giuliano / Icon Audio Arts ("The Original Manuscript" 22:15 and "Crime & Punishment" 22:00); and machine-voiced listings ("AI Voice Bob" 29:17, "AI Voice F. Hearts" 24:35, "AI Voice Andrew Johnson" 23:12, "Virtual Voice" editions, including two that describe themselves as adapted or cut by half). A Russian-language recording (Vyacheslav Gerasimov, 23:46, 4.7 (57)) exists.

### 1b. Abridged and dramatised (flag in the post)

| Narrator | Kind | Publisher | Release | Runtime | Rating | Price | Source | Status |
|---|---|---|---|---|---|---|---|---|
| Alex Jennings | Abridged ("Abridged Audiobook") | Penguin Audio | Audible 03-11-05; OverDrive (Books on Tape) 2005-06-16 | Audible 5 hrs 15 mins; Apple 5:15:42 | 3.9 (113) | $13.50 | Audible B002V0KQ60; Apple id1418836502; Libby (LAPL) | VERIFIED. Translation: welovetranslations says "Based on the McDuff translation"; its Audible summary is word for word the blurb on Penguin UK's McDuff paperback page. UNVERIFIED as McDuff (no page names a translator). |
| Michael Sheen | Abridged | Naxos AudioBooks | Naxos "Released: July 2000"; Audible 10-26-00; OverDrive 1994-08-18 | Naxos 3 h 43 m | 4.2 (57) | $6.90 | naxosaudiobooks.com/crime-and-punishment-abridged/; Audible B002V1J944; Libby (NYPL, LAPL); hoopla | VERIFIED |
| Nigel Anthony | Abridged | CSA Word (2009) and The Copyright Group (2012); Apple lists Little, Brown | 2009-12-07 / 2012-07-19 | 2 hrs 20 mins | 4.1 (14) / 4.6 (9) | $9.38 / $10.86 | Audible B002ZVETIG, B008MNZMQ4 | VERIFIED |
| BBC Radio full cast (Barnaby Kay as Raskolnikov, Jim Norton as Porfiry per the summary) | Radio drama, inside "The Fyodor Dostoevsky BBC Radio Drama Collection" with The Idiot, Devils, The Brothers Karamazov | BBC Audio | Audible 03-25-21 | whole collection 17 hrs 28 mins (format "Radio/TV Program") | 4.4 (18) | $19.32 | Audible 1529141796 | VERIFIED. 2022 Audie Audio Drama finalist. |

No audiobook of the **McDuff**, **Katz**, **Pasternak Slater**, **Cockrell**, **Monas**, **Coulson** or **Magarshack** translations was found: Audible US, UK, CA and AU API keyword searches, Apple Books US search ("crime and punishment katz / mcduff / pasternak / cockrell" return no such audiobook), and Penguin UK's McDuff work page, which lists only "Hardback 2018, Paperback 2003, Ebook 2003" (https://www.penguin.co.uk/books/35469/crime-and-punishment-by-dostoyevsky-fyodor/9780140449136, ISBN 9780140449136, "David McDuff (Translator)"). VERIFIED absence in those catalogues today. Penguin UK's Oliver Ready work page lists "Paperback 2014, Ebook 2014, Audio Download 2020" (https://www.penguin.co.uk/books/177606/crime-and-punishment-by-dostoyevsky-fyodor/9780141192802). VERIFIED.

So the answer to the Reddit question "Is there an audiobook of crime and punishment but the penguin classics version?" (r/dostoevsky 10907gd, 2023): yes for Penguin Classics' current UK translation (Oliver Ready, read by Don Warrington, 2020); no unabridged recording of David McDuff's translation (Penguin Classics' US paperback text) exists in any catalogue checked. The top autocomplete "crime and punishment audiobook translated by david mcduff" therefore has no matching product; the post can say so and point to the two modern-translation recordings.

### 1c. Translation by edition (summary)

- **Garnett (1914, public domain)**: Heald, Poulter, Gregory, Guidall, Foster, Griffin, Hill, Zimmerman, Munro, Cameron, Nelson, Rintoul, Bendena, Keith Brown, all four LibriVox versions. Samples not transcribed (job stopped for time): Harry Shaw, Mary J., Teddy Garraway, Emma Bronks, Arthur Lane. VERIFIED (sample test or store/publisher credit as marked in 1a). This contradicts no store page; it corrects one competitor (section 6).
- **Pevear & Volokhonsky**: Bill Homewood (2025, on sale), Peter Batchelor (2020, withdrawn from Audible US). VERIFIED from Audible metadata. Homewood's sample scores 0.0% against Garnett: it is from an introduction about Dostoevsky's notebooks and his letter of December 1865 ("I had much of it written and ready by the end of November. I burned it all."), so it confirms a non-Garnett edition with front matter but does not by itself prove the P&V text. The P&V credit rests on Audible's translator fields and subtitle, Apple's author line ("TRANSLATORS: Richard Pevear, Larissa Volokhonsky") and Kobo's. VERIFIED.
- **Oliver Ready**: Don Warrington (2020). VERIFIED.
- Abridged Penguin (Alex Jennings) said to be McDuff: UNVERIFIED.

### 1d. Notes per main edition

- **Heald.** Audible page critic quotes: "Anthony Heald grippingly portrays Raskolnikov's turbulent struggle of transgression and redemption." (Audible.com) and from AudioFile: "Anthony Heald shows remarkable versatility in this production…He delivers the dialogue as a stage actor would, with exaggerated emotion and even with laughter, coughing, stammering, and other adornments indicated in the text…Heald's pacing and rich characterizations keep the story moving." VERIFIED as quoted on https://www.audible.com/pd/B002V9ZF3K (AudioFile itself not reachable). 857 written reviews on Audible (API). Its 10,436 ratings are more than Guidall, Gregory and Poulter combined (5,873).
- **Poulter.** Audible editor Mysia Haight's review on the page: "With talented actor Will Poulter at the mic, however, you'll find it hard to stop listening." and "the audiobook runs just over 22 hours". VERIFIED (rendered page). Performance rating 4.9 is the highest among editions with more than 100 ratings. The US page shows "Listen for free" instead of a price (signed out, 2026-11-11); the exact membership tier is UNVERIFIED.
- **Gregory.** Naxos page: "Read by Constantine Gregory", "unabridged", "Running Time: 22 h 03 m", links to Audible, Spotify and Naxos Spoken Word Library, and a "Download PDF booklet" link (the PDF did not download). https://naxosaudiobooks.com/crime-and-punishment-unabridged/ VERIFIED.
- **Guidall.** Audible title "Crime and Punishment (Recorded Books Edition)"; Audible's summary calls it a "stunning dramatization", but it is a single-narrator unabridged reading (runtime 25 hrs 1 min, one narrator listed). VERIFIED.
- **Warrington / Ready.** Audible summary: "This Penguin Classic is performed by Don Warrington, known for his roles in Death in Paradise and The Five" and "This definitive recording includes an Introduction by Oliver Ready." Penguin UK page plays a sample. VERIFIED.
- **Homewood / P&V.** Audible summary: "this audio edition of Crime and Punishment has been newly recorded for 2025." hoopla page credits "award-winner narrator Bill Homewood, with audio engineering by Blake Rook". VERIFIED.
- **Foster.** Audible summary opens "Earphones Award Winner and nominee for the 2019 Audie Award for Best Literary Fiction & Classics Audiobook". Audie part VERIFIED at audiopub.org; Earphones part UNVERIFIED at AudioFile.

### 1e. Credits and prices across stores (snapshot 2026-11-11)

- Audible US non-member prices: as in the table. Audible's US page also shows the current offer "$0.99/mo for 3 months + $20 Audible bonus", "Audible Standard auto-renews at $8.99/mo after 3 months" (VERIFIED on the Heald page; promotional, will change).
- Apple Books US is cheapest for the two modern translations: Warrington/Ready $12.99 and Homewood/P&V $12.99 (iTunes Search API `collectionPrice`). VERIFIED.
- Penguin UK list price for the Ready audio: £16.00. VERIFIED.
- Credit cost per title on Audible: not stated on the pages read. UNVERIFIED; do not write "1 credit" as a fact.

---

## 2. Free recordings

### 2a. LibriVox (all Constance Garnett, all source text Project Gutenberg #2554)

| Project | Readers | Runtime (LibriVox) | Sections | Catalog date | archive.org item / publicdate | Downloads | archive.org rating | M4B | Discover title |
|---|---|---|---|---|---|---|---|---|---|
| Version 1 (id 755) | collaborative, 14 readers (Book Coordinator "Rainer") | 23:26:07 | 40 | 2009-03-01 | crime_and_punishment_0902_librivox / 2009-02-28 | 671,061 | 2.5 from 9 reviews (titles include "Not a Good Reader", "Part 1 needs a remake", "appalling reading", "The 2nd half is better") | 1 file | "Crime and Punishment" |
| Version 2 (id 10091) | solo, Expatriate | 19:52:38 | 51 | 2015-11-18 | crime_punishment_1511_librivox / 2015-11-18 | 553,723 | 3 from 4 reviews (one 5-star "Fine clear expressive reading", one 1-star "reading needs improvement") | 3 parts | "Crime and Punishment" |
| Version 3 (id 12129) | solo, Mark Nelson | 22:02:11 | 41 | 2017-09-01 | crime_punishment_3_1708_librivox / 2017-08-31 | 321,595 | no reviews | 4 parts | "Crime and Punishment (Version 3)" |
| Version 4, Dramatic Reading (id 10008) | 49 readers, one per character (Book Coordinator "Mary J") | 21:19:44 | 42 | 2019-11-11 | crimeandpunishment_1911_librivox / 2019-11-10 | 310,315 | 5 from 1 review ("best reading!") | 3 parts | "Crime and Punishment (Version 4 Dramatic Reading)" |

All VERIFIED: LibriVox API (`translators: Constance Garnett`, `url_text_source` = gutenberg.org 2554 for all four), catalogue pages (https://librivox.org/crime-and-punishment-by-fyodor-dostoyevsky/ , https://librivox.org/crime-and-punishment-version-2-by-fyodor-dostoyevsky/ , https://librivox.org/crime-and-punishment-version-3-by-fyodor-dostoyevsky/ , https://librivox.org/crime-and-punishment-4-by-fyodor-dostoyevsky/), archive.org metadata (https://archive.org/metadata/{item}). Zip sizes on the catalogue pages: 644 MB, 559 MB, 620 MB, 600 MB. archive.org descriptions name the translator: "(Translated by Constance Garnett.) Read in English by Mark Nelson" (Version 3), "Read in English by Expatriate" (Version 2).

**Which one to pick, and why.** Version 3 (Mark Nelson): solo from first to last, complete, the only one whose title in apps carries its own label "(Version 3)", 41 sections starting with the translator's preface. Version 2 (Expatriate) is the shorter solo alternative (19:52:38); a Russian-speaking Reddit listener praised it (section 4). Version 1 changes reader every chapter and has the weakest archive.org reviews. Version 4 suits listeners who want a cast.

Commercial re-listings of the volunteer readings (reader names VERIFIED, identical recordings UNVERIFIED): Expatriate on Libby via "Author's Republic" (2016-04-19, 19:49:59, NYPL and LAPL) and on Downpour via "INAudio"; Mark Nelson on Audible (Paperless) and Apple; Mary J. on Audible (Hexagon Tech). Worth one line in the post: the same voices are free on LibriVox.

### 2b. Other legal free sources

- **Lit2Go** (University of South Florida): Crime and Punishment with the Garnett text and a free MP3 on each chapter page, translator's preface plus chapters (41 chapter links). Source line: "Dostoyevsky, F. (1866). Crime and Punishment (Constance Garnett, Trans.)". Example audio: https://etc.usf.edu/lit2go/audio/mp3/crime-and-punishment-002-part-1-chapter-1.3392.mp3 . Reader not named on the page. https://etc.usf.edu/lit2go/182/crime-and-punishment/ VERIFIED.
- **Loyal Books**: book page serves LibriVox Version 1's files (download links point to archive.org/download/crime_and_punishment_0902_librivox). http://www.loyalbooks.com/book/crime-and-punishment-by-fyodor-dostoyevsky VERIFIED. Not a separate recording.
- **YouTube**: Reddit commenters link several full uploads (section 4). Rights and source not checked; flag only, do not recommend.

---

## 3. Text and audio in sync on other platforms (Whispersync / Read & Listen)

- Audible US product pages carry a `"listeningEnhancements":[{"eventId":"whispersync"…}]` data tag on: Heald, Poulter, Gregory, Guidall, Homewood (P&V), Griffin, Foster, Hill, Zimmerman, Munro, Cameron, Nelson, Bendena. No tag on Warrington (Ready), Rintoul, the abridged editions or the BBC collection. VERIFIED (page data). What the tag promises, and which Kindle edition it pairs with: UNVERIFIED (the page shows no Kindle edition to a signed-out visitor).
- Amazon Kindle pages, read from an India-located session (prices shown in INR; the Kindle price in dollars comes from "You will be charged USD …"):
  - AmazonClassics Edition (Garnett), B074W9WW4S: Kindle USD 2.99; "Add audiobook for INR 470.01" (struck INR 2,589.29); "Read and Listen for Free … with Prime" (India). VERIFIED for that session.
  - Modern Library (Garnett), B000QCS9RS: Kindle USD 6.99; "Add audiobook for INR 969.22". VERIFIED for that session.
  - Vintage Classics (Pevear & Volokhonsky), B008QLVMTI: Kindle USD 9.99; no "Add audiobook" offer. VERIFIED for that session.
  - Penguin Classics (McDuff), B002RI936U: USD 9.69; Penguin (Ready), B00HYQBBSI: USD 10.69; Katz, B06XNK4CSM: USD 9.99: no "Add audiobook" offer on any. VERIFIED for that session.
  - Which narration the add-on attaches, and its US price: UNVERIFIED (the form field `audibleAsin` is filled in later by script and stayed empty).
- welovetranslations (section 6) says every commercial edition except Warrington's is "Available as a digital download with Whispersync". UNVERIFIED third-party claim.
- Takeaway for the post (safe wording): on Amazon, the add-audiobook offer showed only on Garnett Kindle editions today; the modern translations were sold as separate Kindle and Audible purchases. Keep it to what was seen and dated; do not state US prices for the add-on.
- Lit2Go (2b) puts text and audio on the same page, without word highlighting. VERIFIED (page has text plus an `<audio>` player).

---

## 4. What listeners say

### 4a. Reddit (Arctic Shift API: post and comment data; scores as stored there, read 2026-11-11)

| Thread | Sub, date | Score / comments | Short remarks (comment score) |
|---|---|---|---|
| https://www.reddit.com/r/audiobooks/comments/xpzvn0/ "Best Crime and Punishment narrator?" | r/audiobooks, 2022-09-28 | 13 / 7 | "I prefer the Anthony Heald narration, it's really excellent. I like George Guidall as a narrator, but not for this book. There is a version that uses the Oliver Ready translation, and that is my favorite translation; but I couldn't stand the narrator" (5). "Anthony Heald is great but if you have hearing issues, not a good choice. He sounds almost muffled. … Alastair Cameron is a quite excellent alternative choice." (1). "Will Poulter" (1). "I ended up listening to the one narrated by Constantine Gregory … It's probably best to listen to a sample of each" (1). |
| https://www.reddit.com/r/dostoevsky/comments/10907gd/ "Is there an audiobook of crime and punishment but the penguin classics version? every single one on youtube begins with "On a exceptionally hot evening"" | r/dostoevsky, 2023-01-11 | 16 / 6 (17 comments stored, replies through 2026-08) | "the reader for that was don warrington" (8). "That's the Constance Garnett translation. Its the most commonly available public domain translation out there." (2). Repeated "Have you found one?" replies in 2025 and 2026 show the question is still open for readers. |
| https://www.reddit.com/r/audible/comments/17m5wkk/ "Best version of Crime and Punishment on Audible?" | r/audible, 2023-11-02 | 10 / 4 | "As I have some hearing impairment, David Rintoul has a very crisp rendition of this book." (3). "The Will Poulter version is amazing" (1). "I quite enjoyed the Peter Batchelor narration from Vintage Classics" (1). |
| https://www.reddit.com/r/audiobooks/comments/8s43ve/ | r/audiobooks, 2018-06-18 | 9 / 10 | "Anthony Heald does proper voice acting, not just a narration." (1, 2022). "It was v2, narrated by Expatriate. His american pronunciation is clear and simple, but works perfectly … I am russian btw" (1). "George is an absolutely fantastic narrator" (2). |
| https://www.reddit.com/r/audiobooks/comments/8dpy5d/ "Best version of Crime and Punishment?" | r/audiobooks, 2018-04-20 | 6 / 7 | "George Guidall" (4). "Anthony Heald is easily my favorite choice.. His voice is perfect for long reads/listens." (2) |
| https://www.reddit.com/r/audiobooks/comments/jyeqnw/ "Pevear and Volokhonsky's translation of Crime and Punishment is available as an audiobook, finally." | r/audiobooks, 2020-11-21 | 5 / 2 | Post links Audible B08NCWBWCY (the Batchelor edition, now 404) and notes it came "just half a year after Oliver Ready's translation of Crime and Punishment was recorded on audio". |
| https://www.reddit.com/r/audible/comments/es70cw/ | r/audible, 2020-01-22 | 3 / 7 | "almost all of the ones up are the Constance Garnett translation" (1). "the one narrated by Contantine Gregory and i thought it was excellent" (1). |
| https://www.reddit.com/r/dostoevsky/comments/12r9izn/ "Recommended audiobook version of Crime and Punishment?" | r/dostoevsky, 2023-04-19 | 3 / 4 | OP on hoopla: "There are seven unabridged versions to choose from. What's annoying is they don't list who translated it, only the narrator." "narrated by anthony heald and thought it was really good!" (3) |
| https://www.reddit.com/r/dostoevsky/comments/gslauh/ "Which C & P Audiobook is best" | r/dostoevsky, 2020-05-29 | 2 / 4 | "I thought the narration by Anthony Heald, on Audible, was brilliant." (3). "Librivox Recording has characters with drama voices! I loved it." (1, about the dramatic version) |
| https://www.reddit.com/r/audiobooks/comments/1jovumy/ "Best crime and punishment audiobook, for shadow reading?" | r/audiobooks, 2025-04-01 | 1 / 2 | A learner wants to read along to improve pronunciation (the HushBook use case). |

Pattern across ten threads (2018 to 2025): Anthony Heald is named most often and most warmly; Guidall, Gregory and Poulter each have fans; two commenters with hearing difficulty prefer a crisper voice (Rintoul, Cameron); translation questions keep coming back, and readers cannot tell which translation an app's edition uses. VERIFIED (counts from the comments above). The thread `10zva8y` is a YouTube link post with 0 comments.

### 4b. Awards (audiopub.org year pages, all years 2000 to 2026 scanned for "Crime and Punishment" and "Dostoevsky/Dostoyevsky")

- 2009 Audies, Literary Fiction finalists: "Crime and Punishment by Fyodor Dostoevsky; narrated by Anthony Heald (Blackstone Audio, Inc.)". https://www.audiopub.org/2009-audies-1 VERIFIED. (Heald won that year's category for Elmer Gantry.)
- 2019 Audies, Literary Fiction & Classics finalists: "Crime and Punishment by Fyodor Dostoyevsky, narrated by James Anderson Foster, published by Brilliance Publishing". https://www.audiopub.org/2019-audies-1 VERIFIED.
- 2022 Audies, Audio Drama finalists: "The Fyodor Dostoevsky BBC Radio Drama Collection … Published by BBC Audio/Penguin Random House UK". https://www.audiopub.org/2022audieawards-1 VERIFIED.
- 2025 Audies, UK-Produced Audiobook finalists: "The Fyodor Dostoyevsky Complete Collection … Narrated by David Rintoul, Jonathan Keeble, full cast Published by SNR Audio Ltd." (the collection includes Rintoul's Crime and Punishment). https://www.audiopub.org/2025audies-1 VERIFIED.
- No Crime and Punishment recording has won an Audie (no winner line found in any year). VERIFIED by the scan.
- AudioFile Earphones: claimed for Foster's edition on Audible; AudioFile's site unreachable. UNVERIFIED.

---

## 5. HushBook facts for this book (positive framing; verified in source and on the live site copy)

### 5a. Getting the free recording in Discover

- VERIFIED. Discover queries archive.org's `advancedsearch.php` for two libraries, LibriVox (`collection:librivoxaudio AND mediatype:audio`) and Internet Archive. D:\hushbook\lib\core\store\librivox_provider.dart:603-611 (request), :681-687 (`_buildQuery`), D:\hushbook\lib\core\store\internet_archive_provider.dart:198-213. Safety clauses `-subject:erotica …`: D:\hushbook\lib\core\store\content_safety.dart:44-54. Popular sort = `downloads desc`: D:\hushbook\lib\core\store\catalog_filter_queries.dart:88, 93.
- VERIFIED. Tiered search: tier 1 needs every word in title or author (D:\hushbook\lib\core\store\search_query.dart:122-123, `_primary`), tier 2 drops stopwords such as "and" and also searches subject and description, excluding tier 1 hits (search_query.dart:103-113).
- VERIFIED, live today with the app's exact query rebuilt (`scripts/discover-search.mjs`). Searching **"crime and punishment"**: tier 1 LibriVox returns exactly 4, in this order: Version 1 "Crime and Punishment" (23:26:07), Version 2 "Crime and Punishment" (19:52:38), "Crime and Punishment (Version 3)" (22:02:11), "Crime and Punishment (Version 4 Dramatic Reading)" (21:19:44). Internet Archive tier 1 returns 0. Tier 2 then lists unrelated LibriVox books (Chronicles of Newgate, A Book of Scoundrels, Under Western Eyes and others). Tier 1 URL as sent:
  `https://archive.org/advancedsearch.php?q=collection%3Alibrivoxaudio%20AND%20mediatype%3Aaudio%20AND%20((title%3A(crime)%20OR%20creator%3A(crime))%20AND%20(title%3A(and)%20OR%20creator%3A(and))%20AND%20(title%3A(punishment)%20OR%20creator%3A(punishment)))%20AND%20-subject%3Aerotica%20AND%20-subject%3Aeroticism%20AND%20-subject%3Aerotic%20AND%20-subject%3Apornography&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=downloads&fl[]=avg_rating&fl[]=num_reviews&fl[]=year&fl[]=runtime&fl[]=language&fl[]=subject&output=json&rows=24&page=1&sort[]=downloads%20desc`
- VERIFIED (code plus live metadata; not observed on a device). The store page's facts list shows Read by, Language, Library, Recorded, Length, size and the archive.org rating when there is one (D:\hushbook\lib\features\store\store_book_detail_screen.dart:955-975). For all four items the reader line will read **"Reader not listed"** (app_en.arb:7617): the reader comes only from per-file `artist` tags (librivox_provider.dart:364-376, D:\hushbook\lib\core\store\reader_credit.dart:31-46), the 64 kbps files carry none, and the other formats' tag is the author "Fyodor Dostoyevsky", which the code drops. So the post must not say Discover names Mark Nelson; it can say "pick the one titled Version 3" or "the 22-hour one".
- VERIFIED (app logic run on live metadata, `scripts/discover-order.mjs`). All four import in clean order, one chapter per file: Version 1 40 chapters, Version 2 51, Version 3 41 (00 Preface, then Part 1 Chapter 1 … 40 Epilogue), Version 4 42. Chapter order uses the track tag, then the file name (librivox_provider.dart:268-331, format priority 64 kbps first :454-459).
- VERIFIED. Download size, the 64 kbps MP3s the app takes: Version 3 640,017,920 bytes (about 640 MB), Version 2 572,575,744 (about 573 MB), Version 4 615,070,487, Version 1 675,119,067 (sums of archive.org `size`). Safe wording: "about 600 MB".
- VERIFIED. "Play a sample" (app_en.arb:8697) plays 30 seconds (D:\hushbook\lib\core\audio\sample_preview.dart:10) before you download.
- VERIFIED (from 2026-11-10 file, same HEAD). Store downloads join into one book with chapters, and transcription starts on its own on the phone by default (new_book_transcription.dart:34-41 re-read today; store_import_service.dart:375-402).
- Windows: the desktop app has Discover too: "Discover Free public-domain audiobooks to browse and download." D:\hushbook.app\desktop.html:433. VERIFIED.

### 5b. What the read-along does with it

- VERIFIED (site copy). "Words fill in as the narrator reads them, with a red underline on the current one. Long-press any line to play from there." D:\hushbook.app\index.html:1033. Long-press confirmation "Playing from here" app_en.arb:8633; "Tap a line to jump there" is an off-by-default switch, app_en.arb:8453. Never write "tap any word".
- VERIFIED (site copy). "On the phone, each chapter is ready to read the moment it finishes." index.html:1027.
- VERIFIED. Speed 0.5x to 3x in 0.05x steps (D:\hushbook\lib\features\player\widgets\playback_speed_sheet.dart:25-48).
- VERIFIED. Mark button: "Mark: highlight, note or quote" (app_en.arb:8753); "Saved quotes & bookmarks" (app_en.arb:1071).
- VERIFIED. Character map on each book, free: add a character, "First heard" captured from the playhead as "Ch. {chapter} · {time}" (app_en.arb:2160-2161), ties between characters. Good fit for Raskolnikov / Rodya / Rodion Romanovitch. Characters are added by hand (no automatic detection; do not claim it).
- VERIFIED, optional extra. Sync with e-book: "Attach a matching, DRM-free EPUB, PDF or TXT" (app_en.arb:2113), then the e-book's own words are highlighted. All four LibriVox versions read Project Gutenberg #2554 (LibriVox API `url_text_source`), so the free Gutenberg Garnett e-book is the matching text. First sync free, then Pro (D:\hushbook\lib\core\ebook\ebook_sync_allowance.dart). Note app_en.arb:2114 calls sync beta; keep claims to "attach the matching e-book".
- VERIFIED. Works offline after the one-time engine download (index.html:753-757).

### 5c. Files you own, platforms, price

- VERIFIED. Import formats: "MP3, M4A, M4B, AAC, WAV, FLAC, OGG, OPUS, OGA, AIFF, AIF, CAF, WMA, MKA, and ALAC. Pick one file or several: several become one book, a chapter per file. Chapters inside M4B files are detected automatically" index.html:668. Desktop imports "MP3 and M4B files or whole folders" desktop.html:431.
- Route to a modern translation with read-along: Penguin UK lists Libro.fm among the stores for the Warrington/Ready audiobook (VERIFIED, Penguin page), and Libro.fm's support page says its downloads are "DRM-free files (MP3s or M4B format)" (VERIFIED 2026-11-10 in the Monte Cristo research-platforms.md Part B; libro.fm itself was 403 today). The Libro.fm listing itself: UNVERIFIED today (seen as a DuckDuckGo result in scout.md). Safe wording: "a DRM-free MP3 or M4B copy you own, for example from Libro.fm".
- VERIFIED. Platforms: iPhone and Android (App Store and Google Play links, index.html:130-131); Windows 10 or 11, 64-bit, free (desktop.html:49, 334); "Free and unlimited. No cap on books or hours." (desktop.html:347).
- VERIFIED. Price: "The core read-along experience and the public-domain library are free. There's an optional Pro upgrade for advanced analytics" index.html:676. "Transcribe on my PC" sends a phone book to the computer with Pro (index.html:1021). No Pro price is printed on the site pages checked (grep of index.html and llms.txt).
- VERIFIED. Privacy: "Transcription runs on-device. There is no account and no cloud upload of your audio." D:\hushbook.app\llms.txt:3.

---

## 6. Competing pages for "best crime and punishment audiobook"

### 6a. welovetranslations.com, "What's the best audiobook of Crime and Punishment?"

https://welovetranslations.com/2022/06/22/whats-the-best-audiobook-of-crime-and-punishment/ (author Lucy Day Werts). Date only in the URL (2022-06-22); no datePublished/dateModified or `<time>` in the markup; rankings say "as of June 2022". VERIFIED.

Covers: a translation timeline (14 translations, "I found audio versions of 3 of them": Garnett, P&V, Ready); 14 Garnett editions with narrator, accent, Whispersync note and runtime; the four LibriVox versions; P&V and Ready editions; abridged editions (Nigel Anthony ×2, Michael Sheen, Alex Jennings "Based on the McDuff translation"); CliffsNotes, a children's version, the BBC collection; CD buying; author-name spellings; Audible ranking snapshot from June 2022 (Heald "over 7k" ratings, Guidall "over 2k", Gregory "over 1k"). It flags the Jimcin listing's description as wrongly claiming P&V. VERIFIED.

Misses or gets wrong (VERIFIED against today's data):
- The P&V entry names Bill Homewood but gives "Running time 25h 05m", which is Peter Batchelor's withdrawn 2020 recording; Homewood's 2025 recording runs 28 hrs 4 mins.
- No editions after 2022: Rintoul (2023), Bendena (2025), Homewood (2025), Keith Brown / Spotify Audiobooks (2026), Arthur Lane (2026).
- Ratings four years old (Heald now 10,436; Guidall 2,718; Gregory 2,094).
- No libraries (Libby, hoopla), no Apple Books or Kobo, no prices.
- No straight pick ("I don't think there can be any 'best' audiobook").
- No sizes or chapter counts for the free versions, nothing on which free version is labelled in apps.
- Nothing on reading along beyond Whispersync.

### 6b. readingtheodyssey.com, "Crime and Punishment Best Translation: Pevear, Ready, McDuff"

https://readingtheodyssey.com/translations-crime-and-punishment/ datePublished 2025-01-15, dateModified 2026-10-22, about 2,200 words. Print translations ranked P&V, Ready, McDuff, Garnett; FAQ includes "Is Crime and Punishment hard to read?". One audiobook mention: "Best Audiobook … Narrated by George Guidall — Pevear and Volokhonsky translation." **This is wrong**: Audible credits Guidall's Recorded Books edition to "Constance Garnett - translator" and its sample matches Garnett's text at 94.3%. VERIFIED. No runtimes, no LibriVox, no other narrators.

### 6c. Others (from scout.md, not re-opened today: UNVERIFIED by me)

classicsretold.com (print translations, 2026-03-11, modified 2026-11-04); literaryfancy.substack.com (print only, 2026-07-02); Reddit threads (section 4); retail pages (Audible, Apple, hoopla); archive.org and YouTube uploads.

**The gap our post can own:** one dated table of every unabridged recording with translation proven by the sample, runtime, rating count and where it is sold or borrowed; the Penguin/McDuff question answered (no unabridged McDuff audio exists; the Penguin Classics audio is Ready's); the withdrawn Batchelor P&V and the 2025 Homewood replacement; the four free versions told apart with the one labelled "Version 3" as the pick; a straight answer per need; read along with the free recording.

---

## 7. Picks, with the evidence

- **Best overall: Anthony Heald (Blackstone, 2007, Garnett, 20 hrs 28 mins).** Most-rated by far on Audible US (4.6 from 10,436; performance 4.8), 2009 Audie finalist, AudioFile praise quoted on Audible, named most often in ten Reddit threads, and the easiest to borrow (Libby at NYPL, LAPL, KCLS, SFPL, Chicago; hoopla). Also on Apple Books ($22.99) and Kobo. Caveat from one Reddit listener with hearing difficulty ("almost muffled"); suggest Rintoul or Cameron for a crisper voice.
- **Runners-up:** Will Poulter (Audible Studios, 2020, Garnett, 22 hrs 27 mins; performance 4.9 from 993) and Constantine Gregory (Naxos, 2012/2013, Garnett, 22 hrs 2 mins; 4.6 from 2,094).
- **Best free: LibriVox Version 3, Mark Nelson (Garnett, 22:02:11).** Solo throughout, complete, the only free version whose title carries its own label in Discover, 41 chapters in clean order, about 640 MB. Version 2 (Expatriate, 19:52:38, solo) is the shorter alternative.
- **Best modern translation: Pevear & Volokhonsky read by Bill Homewood (Echo Point, 2025, 28 hrs 4 mins).** Highest-rated edition with 100+ ratings (4.8 from 121), newest recording, $12.99 on Apple Books, 12 copies at LAPL on Libby, on hoopla and Kobo. **For Penguin Classics readers: Oliver Ready read by Don Warrington (Penguin, 2020, 25 hrs 2 mins, 4.6 from 148)**, the only recording of Ready's translation, sold on Libro.fm among others.

---

## 8. Ready-to-paste comparison table (VERIFIED rows only)

| Narrator | Translation | Runtime | Publisher | Year | Where to get it |
|---|---|---|---|---|---|
| Anthony Heald | Constance Garnett | 20 h 28 min | Blackstone | 2007 | Audible, Apple Books, Kobo, Libby, hoopla |
| Will Poulter | Constance Garnett | 22 h 27 min | Audible Studios | 2020 | Audible, Apple Books |
| Constantine Gregory | Constance Garnett | 22 h 2 min | Naxos AudioBooks | 2013 | Audible, Apple Books, hoopla, Spotify |
| George Guidall | Constance Garnett | 25 h 1 min | Recorded Books | 1991 | Audible, Apple Books, Libby, hoopla |
| Don Warrington | Oliver Ready | 25 h 2 min | Penguin Classics | 2020 | Audible, Apple Books, Kobo, Libro.fm, Spotify, Libby |
| Bill Homewood | Richard Pevear & Larissa Volokhonsky | 28 h 4 min | Echo Point Books & Media | 2025 | Audible, Apple Books, Kobo, Libby, hoopla |
| James Anderson Foster | Constance Garnett | 20 h 43 min | Brilliance Audio (AmazonClassics) | 2018 | Audible, Apple Books |
| David Rintoul | Constance Garnett | 22 h 38 min | SNR Audio | 2023 | Audible, Apple Books |
| Alastair Cameron | Constance Garnett | 20 h 8 min | A.R.N. Publications | 2016 | Audible, Apple Books |
| Dick Hill | Constance Garnett | 23 h 44 min | Tantor Audio | 2010 | Audible, Apple Books, Libby |
| Charlton Griffin | Constance Garnett | 24 h 19 min | Audio Connoisseur | 2008 | Audible, Apple Books |
| Mark Nelson (LibriVox Version 3) | Constance Garnett | 22 h 2 min | LibriVox (free) | 2017 | LibriVox, Internet Archive, HushBook Discover |
| Expatriate (LibriVox Version 2) | Constance Garnett | 19 h 53 min | LibriVox (free) | 2015 | LibriVox, Internet Archive, HushBook Discover |
| LibriVox volunteers, Version 1 (14 readers) | Constance Garnett | 23 h 26 min | LibriVox (free) | 2009 | LibriVox, Internet Archive, HushBook Discover |
| LibriVox volunteers, Version 4 dramatic (49 readers) | Constance Garnett | 21 h 20 min | LibriVox (free) | 2019 | LibriVox, Internet Archive, HushBook Discover |

Year notes: Guidall's year is the Recorded Books copyright line (© 1991, Apple) and OverDrive's 1991-01-01; Audible lists 2000. Gregory: Naxos says September 2013, Audible 12-30-12; use 2013 (publisher). Runtimes are Audible's (LibriVox's own for the free versions). "Spotify" for Gregory and Warrington rests on the publisher pages' links, not on a Spotify page.

Abridged, to flag: Alex Jennings (Penguin Audio, 5 h 15 min), Michael Sheen (Naxos, 3 h 43 min), Nigel Anthony (2 h 20 min). Radio drama: BBC full cast, in the Dostoevsky BBC collection.

---

## 9. Sources (opened 2026-11-11)

Audible
- Catalogue API: https://api.audible.com/1.0/catalog/products?keywords=crime+and+punishment&num_results=50&response_groups=contributors,product_desc,product_attrs,rating,media,sample (and .co.uk, .ca, .com.au; per-ASIN `/catalog/products/{ASIN}`)
- Product pages (`?ipRedirectOverride=true&overrideBaseCountry=true`): https://www.audible.com/pd/B002V9ZF3K (Heald) · /pd/B085F3BNKD (Poulter) · /pd/B00EY38WKY (Gregory) · /pd/B002V5GTWA (Guidall) · /pd/0241429528 (Warrington) · /pd/B0DTB4QJMW (Homewood) · /pd/B07CZPFY1J (Foster) · /pd/B002V1OCYQ (Griffin) · /pd/B003WH62D2 (Hill) · /pd/B002V8OCOO (Zimmerman) · /pd/B00EIIVY7I (Munro) · /pd/B01EKKEBS2 (Cameron) · /pd/B075MQB8WT (Nelson) · /pd/B0CLYC95KF (Rintoul) · /pd/B0DTZ6J1XL (Bendena) · /pd/B002V0KQ60 (Jennings, abridged) · /pd/B002V1J944 (Sheen, abridged) · /pd/1529141796 (BBC collection) · /pd/B08NCWBWCY (Batchelor, HTTP 404)
- Sample MP3s: `https://samples.audible.com/bk/{…}_sample.mp3` (URLs from the API `sample_url` field)

Apple Books
- https://itunes.apple.com/search?term=crime+and+punishment&media=audiobook&country=us&limit=200
- https://books.apple.com/us/audiobook/id1646097702 (Heald) · id1532921008 (Poulter) · id1453511149 (Gregory) · id1640986134 (Guidall) · id1502575645 (Warrington) · id1789827162 (Homewood) · id1383911990 (Foster) · id275044529 (Griffin) · id1648546588 (Hill) · id358074762 (Zimmerman) · id690324877 (Munro) · id1108451473 (Cameron) · id1286825802 (Nelson) · id1896135491 (Nelson, Mariner's Folio) · id1713953144 (Rintoul) · id1418836502 (Jennings) · id1748228369 (Sheen) · id1891330746 (Nigel Anthony)

Publishers
- https://www.penguin.co.uk/books/177606/crime-and-punishment-by-dostoyevsky-fyodor/9780241429525 (Ready audio) · https://www.penguin.co.uk/books/177606/crime-and-punishment-by-dostoyevsky-fyodor/9780141192802 (Ready work page) · https://www.penguin.co.uk/books/35469/crime-and-punishment-by-dostoyevsky-fyodor/9780140449136 (McDuff)
- https://naxosaudiobooks.com/crime-and-punishment-unabridged/ · https://naxosaudiobooks.com/crime-and-punishment-abridged/

Libraries and other stores
- https://thunder.api.overdrive.com/v2/libraries/nypl/media?query=crime%20and%20punishment&format=audiobook-overdrive,audiobook-mp3&perPage=50 (also lapl, kcls, sfpl, chipublib)
- https://www.hoopladigital.com/search?q=crime+and+punishment&scope=everything&type=direct&kindId=8 and its title pages, e.g. https://www.hoopladigital.com/audiobook/crime-and-punishment-fyodor-m-dostoevsky/13484344 (Blackstone 20h 29m), /17692991 (Echo Point 28h 5m), /11104721 (Naxos 22h 2m), /13525245 (Recorded Books 25h 3m)
- https://www.kobo.com/us/en/search?query=crime%20and%20punishment&fcmedia=AudioBook
- https://downpour.com/search?q=crime+and+punishment ; https://downpour.com/products/book-c1tl (Guidall) ; /book-hlbs (Poulter CD) ; /book-2v4n (Expatriate) ; /book-an36 (Jennings)
- Amazon Kindle pages: https://www.amazon.com/dp/B074W9WW4S · /dp/B000QCS9RS · /dp/B008QLVMTI · /dp/B002RI936U · /dp/B00HYQBBSI · /dp/B06XNK4CSM · /dp/B0BFQQL4HX

Free
- https://librivox.org/api/feed/audiobooks/?title=%5Ecrime%20and%20punishment&format=json&extended=1 ; `?id=755|10091|12129|10008&extended=1`
- LibriVox catalogue pages (section 2a); https://archive.org/metadata/crime_and_punishment_0902_librivox · crime_punishment_1511_librivox · crime_punishment_3_1708_librivox · crimeandpunishment_1911_librivox
- https://archive.org/advancedsearch.php?q=collection%3Alibrivoxaudio%20AND%20title%3A(crime%20and%20punishment)…
- https://www.gutenberg.org/cache/epub/2554/pg2554.txt (Garnett text for the sample test)
- https://etc.usf.edu/lit2go/182/crime-and-punishment/ · http://www.loyalbooks.com/book/crime-and-punishment-by-fyodor-dostoyevsky

Listeners and awards
- https://arctic-shift.photon-reddit.com/api/posts/ids?ids=10907gd,xpzvn0,17m5wkk,8s43ve,10zva8y,8dpy5d,jyeqnw,es70cw,12r9izn,gslauh,1jovumy ; `/api/comments/search?link_id={id}&limit=100`
- https://www.audiopub.org/2009-audies-1 · https://www.audiopub.org/2019-audies-1 · https://www.audiopub.org/2022audieawards-1 · https://www.audiopub.org/2025audies-1 (all year pages 2000 to 2026 scanned)

Competitors
- https://welovetranslations.com/2022/06/22/whats-the-best-audiobook-of-crime-and-punishment/
- https://readingtheodyssey.com/translations-crime-and-punishment/

HushBook (local)
- D:\hushbook HEAD c0040d1: files and lines in section 5. D:\hushbook.app: index.html, desktop.html, llms.txt lines in section 5.

Scripts (this folder): `scripts/audible-pages.mjs`, `scripts/audible-catalog-parse.mjs`, `scripts/audible-product-dump.mjs`, `scripts/apple-pages-parse.mjs`, `scripts/render-pages.mjs`, `scripts/kindle-pairing.mjs`, `scripts/kindle-narration.mjs`, `scripts/hoopla-titles.mjs`, `scripts/downpour.mjs`, `scripts/sample_opening.py`, `scripts/garnett_match.py`, `scripts/discover-search.mjs`, `scripts/discover-order.mjs`.

---

## 10. Do not claim

1. That any audiobook of David McDuff's translation is available unabridged, or that the Penguin Classics audiobook is McDuff's (it is Oliver Ready's).
2. That the abridged Alex Jennings recording is McDuff's text (UNVERIFIED).
3. That Peter Batchelor's P&V recording is on sale (Audible US page 404 today), or that P&V's audiobook runs 25 hours (that was Batchelor's; Homewood's is 28 h 4 min).
4. That Will Poulter, Anthony Heald, Constantine Gregory or George Guidall read a modern translation (all four read Garnett; samples matched). In particular never repeat readingtheodyssey's "Guidall, Pevear and Volokhonsky".
5. That a recording won an Audie. Heald (2009) and Foster (2019) were finalists; the BBC collection (2022) and the SNR complete collection (2025) were finalists.
6. AudioFile Earphones for any edition (unverified at AudioFile).
7. Credit costs, membership inclusion tiers, or Audible prices as permanent (snapshot 2026-11-11; Poulter shows "Listen for free" only to a signed-out US visitor).
8. US price of Amazon's "Add audiobook" narration, or which narration it adds (unverified); that Whispersync pairs any specific Kindle edition with any specific audiobook.
9. That HushBook Discover names Mark Nelson or Expatriate (it shows "Reader not listed"), or shows "Version 1/2" labels (only Version 3 and 4 carry them in the title).
10. That HushBook opens Audible, Kindle, Apple Books, Kobo, Libby, hoopla, Spotify or Chirp purchases. Scope to "audiobook files you own" and "DRM-free MP3 or M4B".
11. That HushBook detects characters automatically, that names will be spelled a certain way in the transcript, or any phone transcription time for this book.
12. That "Transcribe on my PC" is free (Pro), or that a Mac app exists ("Coming soon").
13. That e-book sync is unlimited for free users (first sync free).
14. That the Libro.fm listing of a given edition is DRM-free as verified today (Libro.fm blocked us; its DRM-free policy page was read 2026-11-10).
15. That the commercial "Expatriate", "Mark Nelson" or "Mary J." listings are the same recordings as the LibriVox ones.
16. That Discover results match the store build exactly until the owner confirms the live version is 1.3.5 (70) or newer (source HEAD c0040d1).
