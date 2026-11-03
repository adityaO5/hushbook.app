# HushBook weekly SEO + AEO action plan: week of 2026-11-02

Format follows the Rerun "Weekly SEO Action Plan" template: where things stand, then the five highest-impact actions (page, target query, change, reason, evidence), ranked by expected impact, then carried-over items and the items that need you. Third scheduled run. Next plan: Monday 2026-11-09.

**Evidence:** Search Console pulled 2026-11-02 (`sc-domain:hushbook.app`): 90-day exports to 2026-10-31, plus per-page and per-query files for the last 7 days (**Oct 25 to 31**) and the 7 days before (**Oct 18 to 24**). Daily per-page breakdowns from the Search Console API. URL Inspection for 183 URLs (all 70 sitemap URLs plus known variants and all URLs that had impressions), re-run by hand after the scheduled inspection step failed (see Run notes). Git log since the 2026-10-26 plan. Live Google SERPs and People Also Ask in the Playwright browser (6 queries, no captcha). Google autocomplete via the suggest API. Google Search Status Dashboard. No Bing check this week.

## Where things stand

- **Clicks fell, impressions rose.** Last 7 days (Oct 25 to 31): **80 clicks / 7,683 impressions**. Previous 7 days (Oct 18 to 24): **102 clicks / 6,947 impressions**. That is **-22% clicks** and **+11% impressions**. CTR dropped from 1.47% to 1.04%.
- **The click loss sits on five pages that lost visibility on the same day, Oct 25.** `/alternatives/pocket-fm-alternatives`, `/audiobook-with-text`, `/alternatives/storytel-alternatives`, `/blog/free-read-along-audiobooks` and `/blog/how-to-listen-to-audiobooks-for-free` went from **45 clicks / 1,191 impressions to 3 / 253**. Everything else rose from **57 to 78 clicks (+37%)** and from 6,088 to 7,792 impressions (+28%). Where the five pages still appear, their position is about the same as before (Pocket FM 5.7 to 8.2 on most days), so Google is showing them for far fewer searches rather than ranking them lower. None of the five was changed since its last crawl (Pocket FM Oct 13, `/audiobook-with-text` Oct 15). Google's Search Status Dashboard lists no update since the September 2026 spam update (started Sep 24, about 13 days). Search Engine Roundtable reported unconfirmed ranking volatility on exactly those days ("Google Search Ranking Volatility Gets Heated October 24th", posted Oct 25, and "Unconfirmed Google Search Ranking Update: Volatility & Chatter Spike", Oct 27). Treat it as a Google-side re-evaluation, not a site fault.
- **The Audible snippet fix finally worked.** Google recrawled `/blog/can-you-read-along-with-audible` on **Oct 27**, the first crawl since the Oct 20 description change. Its CTR went from **0.34% (5 / 1,486)** to **0.70% (8 / 1,146)**. `/blog/what-is-immersive-reading` has still not been recrawled (last crawl **Oct 13**) and earned **0 clicks from 796 impressions**.
- **The M4B post is now the largest impression pool:** 1,472 impressions (up from 645), 7 clicks, position 8.4.
- **90 days:** 391 clicks / 19,210 impressions, up from 311 / 11,527 in the 2026-10-26 pull.
- **The blog carries 85% of impressions** (6,833 of 8,045 in the page file) and 58% of clicks (47 of 81).
- **Indexing:** **69 of 70 sitemap URLs are "Submitted and indexed"**. The one exception is `/blog/how-to-put-audiobooks-on-iphone` (published Oct 28): **"Discovered - currently not indexed"**, never crawled. All other posts from the last two weeks are indexed, including the three published Nov 1. Googlebot crawled the home page (Nov 2), `/about` (Nov 1) and three posts on Nov 1 and 2 after the Cloudflare cutover with no fetch errors.
- **Sitemap size:** 70 URLs, down from 80, because the translated about and legal pages were retired on Oct 27 (commit 33af136) and 10 posts were added.
- **Bing coverage:** not checked this run (last known state 2026-10-20: home, `/about` and `/read-along-audiobooks` only).

### Pages that rose (Oct 25 to 31 vs Oct 18 to 24)

| Page | Clicks | Impressions | Avg position |
|---|---|---|---|
| `/blog/how-to-play-m4b-files` | 1 → **7** | 645 → **1,472** | 9.5 → 8.4 |
| `/blog/can-you-read-along-with-audible` | 5 → **8** | 1,486 → 1,146 | 7.4 → 7.8 |
| `/blog/does-reading-along-with-an-audiobook-help` | 2 → **6** | 62 → 343 | 5.2 → 5.7 |
| `/` (home) | 7 → **13** | 168 → 159 | 3.5 → 4.0 |
| `/blog/how-to-retain-information-from-audiobooks` | 0 → 4 | 51 → 184 | 6.0 → 5.1 |
| `/blog/are-audiobooks-good-for-kids` | 0 → 3 | 72 → 196 | 6.2 → 6.4 |
| `/blog/are-audiobooks-good-for-dyslexia` | 1 → 3 | 108 → 122 | 4.5 → 4.8 |
| `/alternatives/bookplayer-alternatives` | 2 → 4 | 181 → 163 | 5.8 → 5.5 |
| `/blog/can-you-read-along-with-spotify-audiobooks` (Oct 27) | new → 2 | new → 161 | 6.7 |
| `/blog/can-libby-read-to-you` (Oct 25) | new → 1 | new → 154 | 7.1 |
| `/blog/why-do-i-fall-asleep-listening-to-audiobooks` | 8 → 4 | 504 → **716** | 6.7 → 6.7 |
| `/alternatives` (hub) | 0 → 1 | 19 → 69 | 10.1 → 6.1 |

### Pages that fell

| Page | Clicks | Impressions | Avg position |
|---|---|---|---|
| `/alternatives/pocket-fm-alternatives` | **24 → 1** | 553 → 145 | 5.8 → 7.0 |
| `/audiobook-with-text` | **13 → 0** | 176 → 20 | 3.7 → 8.9 |
| `/blog/how-to-listen-to-audiobooks-for-free` | 3 → 2 | 266 → 29 | 11.2 → 16.2 |
| `/alternatives/storytel-alternatives` | 2 → 0 | 152 → 54 | 5.7 → 5.1 |
| `/blog/free-read-along-audiobooks` | 3 → 0 | 44 → 5 | 10.1 → 5.8 |
| `/m4b-player` | 0 | 42 → 4 | 12.9 → 21.0 |
| `/blog/how-long-is-an-audiobook` | 0 | 48 → 2 | 15.8 → 12.5 |
| `/blog/what-is-immersive-reading` | 2 → 0 | 893 → 796 | 8.3 → 8.1 |
| `/whispersync-alternative` | 4 → 2 | 84 → 88 | 6.4 → 6.1 |

Daily impressions for `/alternatives/pocket-fm-alternatives` were 50 to 97 from Oct 18 to 24, then 8 to 23 from Oct 25 to 29, 66 on Oct 30 and 23 on Oct 31. `/audiobook-with-text` went from 21 to 30 a day to 0 to 4, with 11 on Oct 30. The Oct 30 bounce on both pages suggests the visibility is not gone for good. A signed-out US Google search today for "pocket fm alternative free" did not show hushbook.app on page one; the results were Reddit (r/audiobooks, r/PocketFMReddit), Facebook groups, a parrotfm.app blog post, Google Play, Softonic and Uptodown, under an AI Overview that names LibriVox, Loyal Books, Kuku FM, Headfone, Libby, Hoopla and Spotify. Most of this page's past clicks came from India and Germany, which this check does not cover.

### Queries that rose most (impressions, last 7 days vs the 7 before)

- M4B cluster: "how to play m4b files" 14 → **39** (pos 5.5), "m4b player windows" 8 → 26 (4.9), "how to play m4b files on android" 3 → 25 (7.2), "how to listen to mpeg 4 audio on iphone" 10 → 23 (6.8), "how to play m4b on iphone" 1 → 18 (8.5), "m4b files android" 5 → 14 (6.6), "can vlc play m4b" 1 → 8 (8.8), "m4b file on android" 0 → 8 (5.0). All 0 clicks.
- "is librivox safe" 0 → **21** (pos 9.3), the LibriVox post's first real query.
- "immersive reader meaning" 107 → 124 (7.6). Still 0 clicks.
- "how to listen to audiobooks faster without losing comprehension" 0 → 14 (7.3) and "is it faster to read or listen to a book" 0 → 5 (7.4), both on the speed post.
- "storytel alternatives" 1 → 14 (5.6), "anyplay alternatives" 0 → 14 (8.6, lands on the BookPlayer page).
- Sleep: "is listening to something while falling asleep bad for you?" 0 → 9 (6.9), "is it bad to listen to audiobooks while sleeping" 2 → 8 (8.8).
- "is reading along with an audiobook bad" 0 → 8 with 1 click (pos 3.8).

Fell: every Pocket FM phrasing ("pocket fm alternative free" 19 → 0, "pocket fm alternative" 13 → 0, "pocket fm competitors" 11 → 2), "what is immersive reading" 119 → 80, "whispersync alternative" 15 → 4, "audiobook vs reading study" 11 → 0, "unabridged audiobook" 18 → 6 (position 15.9 → 33.7).

### Page-one rankings with low click-through (90 days)

| Query | Page | Clicks / impressions | Position |
|---|---|---|---|
| immersive reading | `/blog/what-is-immersive-reading` | 0 / 475 | 8.8 |
| immersive reader meaning | `/blog/what-is-immersive-reading` | 0 / 317 | 7.4 |
| what is immersive reading | `/blog/what-is-immersive-reading` | 0 / 306 | 7.7 |
| immersive reading meaning | `/blog/what-is-immersive-reading` | 0 / 223 | 7.7 |
| whispersync | `/whispersync-alternative` | 1 / 75 | 9.9 |
| how to play m4b files | `/blog/how-to-play-m4b-files` | 0 / 53 | 5.8 |
| can you read along with audible | `/blog/can-you-read-along-with-audible` | 0 / 41 | 8.0 |
| hushbook | `/about`, `/download` | 3 / 503 | 3.5 (sitelinks, benign) |

### Queries at positions 4 to 20 worth pushing (last 7 days)

- M4B: "how to play m4b files" 39 (5.5), "m4b player windows" 26 (4.9), "how to play m4b files on android" 25 (7.2), "how to listen to mpeg 4 audio on iphone" 23 (6.8), "m4b player" 20 (8.7), "how to play m4b on iphone" 18 (8.5)
- LibriVox: "is librivox safe" 21 (9.3)
- Speed: "how to listen to audiobooks faster without losing comprehension" 14 (7.3), "best speed for audiobooks" 5 (6.6), "is it faster to read or listen to a book" 5 (7.4)
- Audible: "can you read along with audible" 13 (6.9), "how to read along with audible" 9 (9.4), "can i read along with audible" 8 (8.6), "does audible also give you the text" 6 (8.2)
- Unabridged: "what is unabridged" 13 (13.0), "unabridged vs abridged" 6 (12.7), "what does unabridged audiobook mean" 5 (10.2)
- Sleep: "is listening to something while falling asleep bad for you?" 9 (6.9), "is it bad to listen to audiobooks while sleeping" 8 (8.8)

### New queries with no matching page (or a weak one)

Almost every new query maps to an existing page. The few without a good one:

- "anyplay alternatives" 14 impressions at 8.6 and "scribd alternatives" 3 at 1.0 land on the BookPlayer and Storytel pages. Anyplay and Scribd are subscription services, so the Storytel page is the closer match. Watch; no new page yet.
- "talesfm alternatives" 3 at 3.7 and "libro.fm alternatives" 2 at 9.0 land on the Pocket FM page. Mention Tales FM there only after checking its store listing.
- "darmowa aplikacja do audiobooków" ("free audiobook app" in Polish) 6 at 10.7 lands on `/pl`. Leave to the locale home page.
- "what is it called when you listen and read a book at the same time" 3 at 9.3 and a variant 2 at 7.5 land on the immersive post. Use as a FAQ there (action 4).
- "audiobookshelf alternative" 6 at 5.5: out of scope (no Audiobookshelf angle, per the 2026-10-20 decision).
- Pirated-copy searches ("splash city m4b" 28 at 39, "do not enter m4b" 14 at 45, "the debut m4b" 5 at 14.6): ignore.

### Posts published in the last two weeks

| Post | Published | Oct 25 to 31 | Index status |
|---|---|---|---|
| how-to-listen-to-audiobooks-for-free | Oct 21 | 2 / 29, pos 16.2 (was 266 impr) | indexed, crawled Oct 21 |
| are-audiobooks-good-for-adhd | Oct 21 | 0 / 199, pos 6.6 | indexed, crawled Oct 21 |
| how-to-retain-information-from-audiobooks | Oct 21 | 4 / 184, pos 5.1 | indexed, crawled Oct 21 |
| are-audiobooks-good-for-kids | Oct 22 | 3 / 196, pos 6.4 | indexed, crawled Oct 22 |
| does-reading-along-with-an-audiobook-help | Oct 23 | **6 / 343**, pos 5.7 | indexed, crawled Oct 23 |
| is-librivox-safe-and-legal | Oct 24 | 1 / 78, pos 7.5 | indexed, crawled Oct 25 |
| can-libby-read-to-you | Oct 25 | 1 / 154, pos 7.1 | indexed, crawled Oct 26 |
| how-to-keep-track-of-characters-in-a-book | Oct 27 | 0 / 10, pos 4.9 | indexed, crawled Oct 29 |
| can-you-read-along-with-spotify-audiobooks | Oct 27 | 2 / 161, pos 6.7 | indexed, crawled Oct 29 |
| how-to-put-audiobooks-on-iphone | Oct 28 | no data | **Discovered, not indexed** |
| how-to-read-classics-without-getting-bored | Oct 29 | no impressions yet | indexed, crawled Oct 31 |
| best-apps-to-read-and-listen-at-the-same-time | Oct 30 | 1 / 19, pos 8.2 | indexed, crawled Oct 31 |
| best-audiobook-apps-for-dyslexia | Oct 30 | no impressions yet | indexed, crawled Oct 31 |
| best-librivox-app | Oct 30 | no impressions yet | indexed, crawled Oct 31 |
| how-to-get-into-audiobooks | Nov 1 | after data window | indexed, crawled Nov 2 |
| how-to-take-notes-on-audiobooks | Nov 1 | after data window | indexed, crawled Nov 1 |
| how-to-go-on-an-information-diet | Nov 1 | after data window | indexed, crawled Nov 1 |

The reading-along post is the best of the batch (6 clicks, 1.75% CTR). The Spotify post copied the Audible pattern and got 161 impressions in its first four days. The free-audiobooks post fell with the Oct 25 group. The iPhone post is the only one Google has not crawled; request indexing.

### Indexing detail (inspection_all.json)

- **Sitemap URLs:** 69 of 70 indexed. `/blog/how-to-put-audiobooks-on-iphone` is "Discovered - currently not indexed" with no crawl yet.
- **Stale crawls on pages that matter:** `/blog/what-is-immersive-reading` and `/alternatives/pocket-fm-alternatives` Oct 13, `/audiobook-with-text` Oct 15, `/blog/does-listening-to-audiobooks-count-as-reading` Oct 15, `/blog/free-read-along-audiobooks` Oct 15, `/blog/abridged-vs-unabridged-audiobooks` Oct 16.
- **Canonical mismatches:** 25, all retired translated about, privacy, terms, refund or licence pages whose records date from Aug 5 to Sep 7 crawls, when their canonical pointed at the English page. Google picked each page as its own canonical. These URLs now return a 308 redirect to the English page, so the records will clear as Google recrawls them. One, `/es-419/refund-policy`, is "Duplicate, Google chose different canonical than user" (Google picked `/es-ES/refund-policy`); same cause, same fix.
- **Page with redirect (13):** `www`, `http`, `/download` and retired locale download and legal URLs. Expected.
- **"URL is unknown to Google" (30):** fragment URLs, `/blog/feed.xml` and never-crawled retired variants. Expected.
- **Retired URLs:** `sitemap-retired.xml` now lists **86 URLs** (the original 26 plus 60 added by the Oct 27 retirement of translated about and legal pages). 68 are still "Submitted and indexed", 8 already show "Page with redirect", 1 is a duplicate, 6 are unknown to Google and 3 were not inspected. None of the inspection records names `sitemap-retired.xml` as a sitemap, and the Search Console API lists only `sitemap.xml` as submitted (last submitted Oct 27). The removal check is due on or after 2026-12-01; not due yet. Because 60 URLs were added only on Oct 27, expect that check to need a second look in mid-December.

## Top 5 actions this week

### 1. `/alternatives/pocket-fm-alternatives` → refresh it, say "free" in the title, and get it recrawled

- **Target queries (90 days):** "pocket fm alternative free" (48 impr, 4 clicks, pos 7.2), "pocket fm kostenlose alternative" (35, 2 clicks, 6.8), "pocket fm competitors" (21, 7.6), "pocket fm alternative" (19, 1 click, 7.2), "app like pocket fm but free" (15, 8.1), "pocket fm similar app free" (13, 1 click, 7.8), "pocket fm alternative free app" (12, 5.0), "alternative zu pocket fm" (11, 1 click, 6.5), and new this week "talesfm alternatives" (3, 3.7).
- **Evidence:** the top click earner of the previous week (**24 clicks / 553 impressions, 4.3% CTR**) fell to **1 click / 145 impressions** this week. Impressions dropped from Oct 25. The page has not been crawled since Oct 13 and its JSON-LD `dateModified` is still **2026-09-13**, while competing results use "2026" and "free" in their titles. Its title, "5 Best Pocket FM Alternatives for Complete Audiobooks", does not contain "free", and most of its queries do.
- **Change:**
  1. Title test: `5 Best Free Pocket FM Alternatives for Complete Stories (2026)`. Checked this run: `alternative-pages.test.js` does not test titles, so this is safe as long as the page keeps its 23-word question, five unique options and the "Evidence checked" block. The title was deferred twice over that worry; it no longer needs to wait.
  2. Start each pick with its price model in a few words (free, free with a library card, paid). Keep HushBook first as best overall, per the comparison-page rule.
  3. Add Tales FM and Kuku FM to the FAQ only if their store listings are checked on the day of the edit (not verified in this run). No Pocket FM price unless read from its store listing that day.
  4. The title lives in `data/alternative-pages.js` line 460. The dates come from one shared `checkedDate = '2026-09-13'` (line 3), which feeds the visible "Evidence checked" line, the JSON-LD dates and the sitemap for all five comparison pages. Bump it only after re-checking the facts on all five pages; that also refreshes `/alternatives/storytel-alternatives`, which fell in the same week (152 → 54 impressions). Rebuild with `scripts/build-alternative-pages.js` then `scripts/inject-gtag.js`, deploy, request indexing.
- **Why first:** the largest single click loss on the site, worth about 20 clicks a week. The content was fine two weeks ago, so the fastest lever is a fresher page that Google recrawls.

### 2. `/blog/how-to-play-m4b-files` → answer each device query in its own heading

- **Target queries (last 7 days):** "how to play m4b files" (39 impr, pos 5.5), "m4b player windows" (26, 4.9), "how to play m4b files on android" (25, 7.2), "how to listen to mpeg 4 audio on iphone" (23, 6.8), "m4b player" (20, 8.7), "how to play m4b on iphone" (18, 8.5), "m4b" (15, 10.5), "m4b files android" (14, 6.6), "can vlc play m4b" (8, 8.8), "m4b file vlc" (5, 5.0), "m4b player mac" (5, 4.2).
- **Evidence:** **1,472 impressions and 7 clicks (0.48%)** at position 8.4, up from 645 / 1. Now the biggest impression pool on the site. Every query above has 0 clicks. Google recrawled it on Nov 1, so changes made now will be seen quickly.
- **Change:**
  1. Add a short H2 "Does VLC play M4B files?" (restate the VLC facts already in the post).
  2. Rename "How to play M4B files on Windows 10 and 11" to "Best M4B player for Windows 10 and 11" and keep the steps.
  3. Add FAQs "How do I listen to MPEG-4 audio on iPhone?" (M4B and M4A are MPEG-4 audio; restate the Files app route) and "What app plays M4B files on Android?".
  4. Test a metaDescription that starts "The best M4B player for each device:" (under 160 characters). Bump `dateModified`.
- **Why:** fastest-growing cluster, high intent, and HushBook is a named answer for iPhone and Android. Same as last week's action 3, now with twice the impressions.

### 3. `/blog/can-you-read-along-with-audible` → now add the question headings

- **Target queries (90 days):** "can you read along with audible" (41, pos 8.0), "how to read along with audible" (29, 9.3), "can i read along with audible" (22, 6.6), "how to read and listen on audible" (20, 9.9), "audible read along" (17, 9.5), "can you read books on audible or only listen" (17, 6.6), "does audible have a read along option" (13, 5.2), "can you read along with audible on iphone" (12, 10.2), "if i buy an audiobook can i also read it" (11, 6.0), "does amazon audiobooks come with text" (10, 8.4); new this week "how does audible read and listen work" (4, 9.2).
- **Evidence:** the snippet fix works: CTR doubled to **0.70% (8 / 1,146)** after the Oct 27 recrawl. The page still shows up for 140 phrasings over 90 days, and the listed ones carry 590 impressions with 1 click. The H2s ("What you need", "How to turn it on", "If you only own one edition") still match none of them.
- **Change:**
  1. H2s with the exact wording, each opened by a one or two sentence answer: "Can you read books on Audible or only listen?", "If I buy an audiobook, can I also read it?", "How does Audible Read & Listen work?" (rename "How to turn it on"), "Can you read along with Audible on iPhone?".
  2. FAQs "Does Audible come with text?" and "Does an Amazon audiobook come with the ebook?". Restate body facts only.
  3. Bump `dateModified`, deploy, request indexing.
- **Why:** the second-largest impression pool, with most phrasings on page one; the description fix proved Google rewards a closer match here. On the list for three weeks.

### 4. `/blog/what-is-immersive-reading` → answer "Immersive Reader meaning" near the top, then get it recrawled

- **Target queries (90 days):** "immersive reading" (475, pos 8.8), "immersive reader meaning" (317, 7.4), "what is immersive reading" (306, 7.7), "immersive reading meaning" (223, 7.7), "what does immersive reading mean" (29, 7.3), "what is immersive reader" (22, 6.4); new "what is it called when you listen and read a book at the same time" (3, 9.3).
- **Evidence:** **796 impressions, 0 clicks** this week; 1,608 listed impressions and 1 click over 90 days. Google last crawled it on **Oct 13**, so the Oct 20 title ("What Is Immersive Reading? Meaning and How It Works") has never been shown. The Audible post shows what a recrawl after a snippet fix can do.
- **Change:**
  1. Rename the H2 "Microsoft Immersive Reader isn't an audiobook library" to "What does Immersive Reader mean?", move it to second place, and open it with a 40 to 60 word definition of Microsoft's tool plus one line on how it differs from immersive reading.
  2. FAQs "What is the difference between immersive reading and Immersive Reader?" and "What is it called when you read and listen to a book at the same time?" (immersive reading, also called reading while listening).
  3. Bump `dateModified`, deploy, request indexing.
- **Why:** the largest zero-click pool on the site; a recrawl alone could move it.

### 5. `/audiobook-with-text` → put the exact question at the top and get it recrawled

- **Target queries (90 days):** "do audiobooks come with text" (9, pos 6.0), "do audiobooks have text" (9, 3.4), "do audiobooks have transcripts" (4, 7.2), "does audiobook have text" (3, 7.7), "audiobook with text" (2, 9.0).
- **Evidence:** **13 clicks / 176 impressions at position 3.7** in the previous week, **0 / 20** this week. Same Oct 25 drop as action 1. Last crawled Oct 15; JSON-LD `dateModified` 2026-10-05. Most of its clicks came from anonymized long-tail queries.
- **Change:**
  1. Add a first H2 "Do audiobooks come with text?" with a two-sentence answer (most do not; Audible's Read & Listen needs the Kindle edition too; a read-along app can build the text from the audio of a file you own). Keep the current H2s.
  2. Add a FAQ "Do audiobooks have transcripts?".
  3. Bump the page's `dateModified`, rebuild with `scripts/build-answer-pages.js`, deploy, request indexing.
- **Why:** it was the second-best click earner before Oct 25 and sits on the core product query. Cheap to refresh.

## Quick wins (under 15 minutes each)

- **`/blog/how-to-focus-on-audiobooks` → link the ADHD post.** Still no link to `/blog/are-audiobooks-good-for-adhd` (open for two weeks). The ADHD post had 199 impressions and 0 clicks this week. Link-only edit, no `dateModified` bump.
- **`/blog/audiobook-listening-speed` → answer "is it faster to read or listen to a book".** One short paragraph with the median 151 words per minute from `/blog/how-long-is-an-audiobook` against typical silent reading speed (source it). New queries this week: "how to listen to audiobooks faster without losing comprehension" (14, pos 7.3), "is it faster to read or listen to a book" (5, 7.4), "audiobook vs reading speed" (5, 10.8).

## Carried over from the 2026-10-26 plan

**Done since that plan (git log):**
- Beginner-guide draft published as `how-to-get-into-audiobooks` (96c9f85, Nov 1), indexed Nov 2.
- Nine more posts: characters (0ed7edc) and Spotify (2931c5e) on Oct 27, iPhone (e6cbb0d) Oct 28, classics (578d9e8) Oct 29, three ranked comparisons (5530d83) Oct 30, notes (9d55a05) and the information-diet essay (bccbca9) Nov 1. All indexed except the iPhone post.
- Blog build: pipe tables, ItemList schema and media embeds (070dac0); one app animation on five posts (78f9024, 84dc9ab).
- Translated about and legal pages retired with 308 redirects, 60 URLs added to `sitemap-retired.xml` (33af136, Oct 27).
- Hosting moved to a Cloudflare Worker (9c232aa, 014a4af, 45d06c4, Nov 1). Googlebot crawled the site on Nov 1 and 2 without errors.
- Desktop page and landing section (d645f80, 5f71c7b), contact email change (a58d821). No SEO impact expected.

**Still open (not started):**
- Last week's action 1 (Audible headings): open, now #3.
- Last week's action 2 (Immersive Reader H2): open, now #4.
- Last week's action 3 (M4B headings): open, now #2.
- Last week's action 4 (Pocket FM "free" title): open, now #1 with a refresh.
- Last week's action 5 (abridged expansion): open, out of the top 5. 376 impressions and 1 click at position 12.2 this week; "unabridged audiobook" fell from 15.9 to 33.7.
- Quick wins: ADHD link from the focus post and the speed paragraph (both open).
- `/blog/audiobook-listening-speed` speed/time table and FAQs (open; 338 impressions, 0.30% CTR this week).
- Backlog unchanged: home SEO-copy block, home H1, mobile speed (fonts, gtag), per-post OG images, Speechify pages (now at 62.4 and 43.2, effectively gone), Wikidata, a possible "LibriVox alternatives" page, Whispersync comparison table.
- `seo-preservation` and `seo-repair-contract` baseline refresh: still awaiting your decision.
- Temporary `sitemap-retired.xml` and its robots.txt line: keep until the check on or after 2026-12-01.

## New blog post (draft, ready to review)

See `docs/seo/drafts/2026-11-02-do-audiobooks-count-on-goodreads/`. Full evidence is in its `notes.md`; summary below.

- **Topic:** "Do audiobooks count on Goodreads?", pick #5 of the 2026-10-27 keyword research and the seasonal item in the topic backlog ("publish before January"). Reading challenges reset on January 1, so publishing in November gives Google time to index it before the peak.
- **Why:** autocomplete returns a large cluster across 15 seeds: "do audiobooks count on goodreads (challenge / goal)", "should audiobooks count on goodreads", "do audible books count on goodreads", "how to add audiobooks to goodreads", "can you link audible to goodreads", "how does goodreads count pages for audiobooks", "do audiobooks count for 75 hard", "do audiobooks count for summer reading challenge", "storygraph audiobook tracking / pages". The live Google results are weak: a Goodreads member poll, Reddit threads up to 11 years old, Facebook groups, Goodreads Help community answers and a 2022 NBC News opinion piece. Nobody puts the Goodreads, StoryGraph, 75 Hard and library rules on one sourced page. Search Console has no query for it yet, so it is a new cluster.
- **People Also Ask** (live, 5 queries): "Does Goodreads track audiobooks?", "Can I import my Audible books to Goodreads?", "Does rereading a book count on the Goodreads Challenge?", "Why is a book not showing up in my reading challenge on Goodreads?", "How do I add a book as an audiobook on StoryGraph?", "Does StoryGraph sync with Audible?", "How long is a 70,000 word audiobook?". H2s and FAQs use this wording.
- **Not cannibalizing:** `does-listening-to-audiobooks-count-as-reading` keeps the research question ("is it reading?"); this post answers "does it count on this tracker or in this challenge?" and links there. The hours-to-pages maths reuses the sourced figures in `how-long-is-an-audiobook` and links to it.
- **Files:** `post.md`, `registry-entry.js` (dates left as `YYYY-MM-DD`), `llms-line.txt`, `wiring.md` (2 contextual links, no answer-page change), `notes.md`.

## Needs you

1. **Request indexing** (Search Console, URL Inspection, in Chrome Profile 2):
   - Now: `https://hushbook.app/blog/how-to-put-audiobooks-on-iphone` (Discovered, never crawled).
   - Now, even before the edit ships: `https://hushbook.app/blog/what-is-immersive-reading` (last crawled Oct 13, before the Oct 20 title change).
   - After actions 1 and 5 ship: `https://hushbook.app/alternatives/pocket-fm-alternatives` and `https://hushbook.app/audiobook-with-text`.
   - After the new post ships: `https://hushbook.app/blog/do-audiobooks-count-on-goodreads`.
   Wait for the "Indexing requested" confirmation; if the quota is reached, try again the next day.
2. **Submit `https://hushbook.app/sitemap-retired.xml`** in Search Console → Sitemaps. Only `sitemap.xml` is submitted, and none of the 86 retired URLs is linked to the retired sitemap yet. Open for two weeks.
3. **Cloudflare returns 403 to the default Python user agent.** Since the cutover, `https://hushbook.app/sitemap.xml` answers `Python-urllib/3.14` with HTTP 403 and "error code: 1010" (Cloudflare's browser-signature block). Googlebot, Bingbot, GPTBot, ClaudeBot and PerplexityBot user agents, curl and `python-requests` all get 200, so search and AI crawlers are fine. It broke this week's inspection step (see Run notes). Either leave the Cloudflare setting and accept the script fix below, or relax the rule in the dashboard. While there, the two open dashboard tasks from the migration notes still apply (turn off Email Address Obfuscation, set the route to fail open); not verified in this run.
4. **Approve the script fix** in `%USERPROFILE%\hushbook-seo\gsc_inspect_all.py`: send a `User-Agent` header when fetching the sitemap (details in Run notes). Not applied in this run because the run only writes its plan and draft.
5. **Bing:** confirm the Bing Webmaster Tools import and that IndexNow ran after the Oct 27 to Nov 1 deploys. Unknown for three weeks.
6. **Reddit and listings:** confirm promotional posting is paused (open since 2026-10-20).
7. **Review the Goodreads draft** and approve publishing it, ideally in November, ahead of the January reading-challenge reset.
8. **Decide** on refreshing the `seo-preservation` / `seo-repair-contract` baselines.

## Run notes

- **Error: URL Inspection step failed in the scheduled pull.** `inspection_all.json` was missing from `gsc\2026-11-02`. The log shows `gsc_inspect_all.py` died with `urllib.error.HTTPError: HTTP Error 403: Forbidden` while fetching `https://hushbook.app/sitemap.xml`. Cause: since the Cloudflare cutover, the site answers the default `Python-urllib/3.14` user agent with 403 "error code: 1010". `weekly-seo.ps1` does not check that script's exit code, so the run carried on without it.
- **Workaround used:** `%USERPROFILE%\hushbook-seo\scratch\2026-11-02\inspect_wrapper.py` installs a urllib opener with a browser-like `User-Agent` and runs `gsc_inspect_all.py` unchanged. It inspected 183 URLs (70 in the sitemap) in about 4 minutes and wrote the normal `inspection_all.json`.
- **Improvement (needs your OK):** in `gsc_inspect_all.py` line 23, fetch the sitemap with `urllib.request.urlopen(urllib.request.Request("https://hushbook.app/sitemap.xml", headers={"User-Agent": "Mozilla/5.0 (compatible; hushbook-seo-inspect/1.0)"}), timeout=30)`. In `weekly-seo.ps1`, check `$LASTEXITCODE` after the inspection step and show a toast such as "inspection failed" so the next failure is visible.
- **Data window:** 7-day files cover Oct 25 to 31 and Oct 18 to 24 (end date = run day minus 2). The 90-day files run to Oct 31. Nov 1, the Cloudflare cutover day, is not in the data yet; next week's plan should check Nov 1 to 7 for any hosting effect.
- **Week-over-week method:** headline totals from `dates.csv`; page and query deltas from the `_7d` / `_prev7d` files; per-page daily breakdowns from the `searchconsole` MCP, which connected this week. Page-level click sums (81) match the daily total (80) within rounding. The query file lists only 20 of 80 clicks; most clicks come from anonymized queries.
- **Not used:** a country breakdown for the Pocket FM page from the MCP summed to far fewer impressions than the page totals, so country claims in this plan come only from the previous week's query mix, not from that call.
- **Playwright:** worked. Six live Google searches (five for the draft, one for Pocket FM) with no captcha; browser closed. Page snapshots and console logs again went to `D:\Hushbook.app\.playwright-mcp\` (gitignored, inside the repo).
- **Bing:** not checked directly. One WebSearch probe (a Bing-like index) for "hushbook can you read along with audible" returned no hushbook.app page, only third-party app listings. Treat Bing and ChatGPT search coverage of the blog as still thin.
- **Memory not updated:** the edit to `seo-research-tooling.md` was blocked as a sensitive file, as last week. Next interactive session should record: (1) the Cloudflare 403 for `Python-urllib` and the wrapper; (2) the Oct 25 to 31 baseline (80 clicks / 7,683 impressions, 69/70 indexed) and the Oct 25 visibility drop on five pages; (3) the Audible CTR doubling after its Oct 27 recrawl; (4) this week's Goodreads draft and the rejected topics (Apple Books read-along parked, finish-books and offline apps rejected for now). Improvement: allow memory edits in the scheduled task, or have the run write a `memory-update.md` next to the plan.
- **Nothing was committed, pushed, deployed or built.** In the repo, only this file and the draft folder were written. Outside the repo: scratch scripts and outputs in `%USERPROFILE%\hushbook-seo\scratch\2026-11-02\` and `inspection_all.json` in the data folder.
