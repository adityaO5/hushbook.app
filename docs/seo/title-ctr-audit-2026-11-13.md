# Title and snippet CTR audit: 2026-11-13

**Question:** daily impressions kept climbing (about 2.3k a day by Nov 10 and 11) while daily clicks rose to Nov 7 and 8 and then fell. Are the titles the problem?

**Evidence:** Search Console (`sc-domain:hushbook.app`, read-only API), pulled 2026-11-13: the standard 90-day export in `%USERPROFILE%\hushbook-seo\gsc\2026-11-13\` (to Nov 11), plus date x page, date x query, date x query x page, device, country, search appearance, image, video, Discover and hourly data for Oct 9 to Nov 12 in `gsc\2026-11-13\ctr-audit\` (adapted copy of `gsc_pull.py`, scripts in `scratch\2026-11-13\ctr\`). Titles as built from `data/blog-posts.js` + `scripts/build-blog.js`, `data/alternative-pages.js`, `scripts/build-answer-pages.js`. Bing-index results through DuckDuckGo's HTML endpoint for 15 queries (no bot check). Google results were not scraped. Earlier pulls (Oct 22 to Nov 9) and the 2026-11-09 plan for context.

## Summary: why clicks fell while impressions rose

1. **Clicks did not fall week over week.** Nov 4 to 10: **197 clicks / 14,016 impressions**, double Oct 28 to Nov 3 (99 / 8,993). The turn is inside the week: **30.6 clicks a day on Nov 4 to 8**, then 25 and 19 on Nov 9 and 10, and 26 on Nov 11 (not final). Nov 12 is a partial day.
2. **The extra impressions landed on pages that rarely get clicked.** About 290 of the 300 extra impressions a day went to pages ranked 6 to 10 for one-line-answer queries that convert at 0 to 0.5% (abridged vs unabridged doubled to 215 a day at position 9 to 10 with no clicks). At the old per-page CTRs they would have added almost no clicks.
3. **About 6 fewer clicks a day came from pages that had just surged.** The best-apps post (2.8 to 0.7 a day as its position slid from about 5 to 7 and 8.5), Pocket FM (on Nov 11 only), brand clicks on the homepage, and pages that get one click a day. A three-day dip this size is about two standard errors of ordinary daily noise.
4. **Titles explain none of the turn.** No live page's title or description changed between Oct 30 and Nov 12, and the dip shows on mobile and desktop and in the US and elsewhere.
5. **Titles do explain part of the low CTR on eight pages that sit well below the site's own position curve.** Fixing all eight would add about 2 clicks a day. The curve itself (2 to 3% at positions 4 and 5) matches 2025 and 2026 benchmarks for informational queries with AI Overviews.

## Daily numbers

Sitewide, web search. "Final" is Search Console's final data. The API reports `firstIncompleteDate` = Nov 11: Nov 11 has all 24 hours but can still be revised; Nov 12 runs to about 13:00 Pacific.

| Date | Day | Clicks | Impressions | CTR | Avg position | Data |
|---|---|---|---|---|---|---|
| 10-14 | Wed | 8 | 548 | 1.46% | 6.7 | final |
| 10-15 | Thu | 7 | 498 | 1.41% | 7.0 | final |
| 10-16 | Fri | 14 | 523 | 2.68% | 7.7 | final |
| 10-17 | Sat | 9 | 638 | 1.41% | 6.5 | final |
| 10-18 | Sun | 13 | 737 | 1.76% | 7.5 | final |
| 10-19 | Mon | 20 | 771 | 2.59% | 6.9 | final |
| 10-20 | Tue | 11 | 881 | 1.25% | 7.0 | final |
| 10-21 | Wed | 11 | 991 | 1.11% | 7.3 | final |
| 10-22 | Thu | 22 | 1,190 | 1.85% | 7.2 | final |
| 10-23 | Fri | 11 | 1,287 | 0.85% | 8.4 | final |
| 10-24 | Sat | 14 | 1,090 | 1.28% | 8.3 | final |
| 10-25 | Sun | 7 | 816 | 0.86% | 8.4 | final |
| 10-26 | Mon | 14 | 890 | 1.57% | 8.3 | final |
| 10-27 | Tue | 11 | 1,122 | 0.98% | 7.8 | final |
| 10-28 | Wed | 15 | 1,265 | 1.19% | 7.4 | final |
| 10-29 | Thu | 10 | 1,229 | 0.81% | 7.4 | final |
| 10-30 | Fri | 12 | 1,351 | 0.89% | 6.8 | final |
| 10-31 | Sat | 11 | 1,010 | 1.09% | 7.8 | final |
| 11-01 | Sun | 15 | 1,270 | 1.18% | 7.6 | final |
| 11-02 | Mon | 11 | 1,200 | 0.92% | 7.5 | final |
| 11-03 | Tue | 25 | 1,668 | 1.50% | 6.9 | final |
| 11-04 | Wed | 31 | 2,108 | 1.47% | 6.7 | final |
| 11-05 | Thu | 29 | 1,984 | 1.46% | 6.8 | final |
| 11-06 | Fri | 30 | 1,740 | 1.72% | 6.5 | final |
| 11-07 | Sat | 32 | 1,742 | 1.84% | 6.6 | final |
| 11-08 | Sun | 31 | 1,983 | 1.56% | 7.0 | final |
| 11-09 | Mon | 25 | 2,199 | 1.14% | 6.9 | final |
| 11-10 | Tue | 19 | 2,260 | 0.84% | 6.9 | final |
| 11-11 | Wed | 26 | 2,352 | 1.11% | 7.3 | **fresh, not final** |
| 11-12 | Thu | 9 | 903 | 1.00% | 7.0 | **partial day** |

No weekday pattern explains Nov 9 and 10: the two earlier Monday and Tuesday pairs were 14 and 11, then 11 and 25.

## Decomposition

Method: per page, clicks a day = impressions x CTR. The change splits into **impressions** (change in impressions at the old CTR), **position** (new impressions x the change in CTR the site curve below predicts for the page's daily positions) and **CTR at a similar position** (the rest). Rates are per day so windows of different length compare. Page rows count a search once per page shown, so page sums run about 5% above the sitewide line.

### Week over week: Nov 4 to 10 vs Oct 28 to Nov 3

Sitewide: 14.1 → 28.1 clicks a day, 1,285 → 2,002 impressions, CTR 1.10% → 1.41%, average position 7.3 → 6.8. Page sum +14.1 clicks a day: **+9.5 from impressions, +3.1 from position, +1.5 from CTR at a similar position.**

| Page | Clicks a day | Impressions a day | From impressions | From position | From CTR |
|---|---|---|---|---|---|
| `/alternatives/pocket-fm-alternatives` | 0.4 → 5.4 | 26 → 103 | +1.3 | +1.1 | +2.6 |
| `/` | 1.4 → 3.0 | 26 → 37 | +0.6 | 0.0 | +1.0 |
| `/blog/best-apps-to-read-and-listen-at-the-same-time` | 0.7 → 2.3 | 21 → 135 | +3.8 | +0.5 | -2.7 |
| `/blog/can-libby-read-to-you` | 0.3 → 1.4 | 37 → 169 | +1.0 | +0.2 | -0.1 |
| `/read-along-audiobooks` | 0.0 → 1.1 | 0 → 30 | 0.0 | +0.7 | +0.4 |
| `/blog/does-reading-along-with-an-audiobook-help` | 0.6 → 1.6 | 42 → 91 | +0.7 | +0.1 | +0.2 |
| `/blog/can-you-read-along-with-spotify-audiobooks` | 0.9 → 0.0 | 58 → 83 | +0.4 | -0.2 | -1.0 |
| `/blog/how-to-play-m4b-files` | 0.6 → 0.0 | 144 → 0 | -0.6 | 0.0 | 0.0 |
| `/blog/how-to-focus-on-audiobooks` | 0.6 → 0.1 | 37 → 39 | 0.0 | -0.2 | -0.2 |

Most new impressions: Libby (+132 a day), best-apps (+114), captions (+104), how-long (+101), Pocket FM (+77), Goodreads (+70), does-reading-along (+49), abridged (+48).

### The dip: Nov 9 to 11 vs Nov 4 to 8

Sitewide: 30.6 → 23.3 clicks a day (22.0 on the two final days), 1,911 → 2,270 impressions, CTR 1.60% → 1.03%, average position 6.74 → 7.04. Page sum -6.8 clicks a day: **+0.8 from impressions, -5.1 from position, -2.6 from CTR at a similar position.** Had every page kept its Nov 4 to 8 CTR on its Nov 9 to 11 impressions, the site would have had 30.3 clicks a day (CTR 1.30%): the impression growth itself was nearly click-free, and the loss came from the same pages converting worse.

| Page | Clicks a day | Impressions a day | From impressions | From position | From CTR |
|---|---|---|---|---|---|
| `/blog/best-apps-to-read-and-listen-at-the-same-time` | 2.8 → 0.7 | 144 → 109 | -0.7 | -1.1 | -0.4 |
| `/alternatives/pocket-fm-alternatives` | 5.6 → 3.7 | 107 → 87 | -1.1 | -0.8 | -0.1 |
| `/blog/does-reading-along-with-an-audiobook-help` | 2.0 → 1.0 | 96 → 80 | -0.3 | +0.1 | -0.8 |
| `/whispersync-alternative` | 2.0 → 1.0 | 18 → 20 | +0.2 | -0.1 | -1.1 |
| `/` | 3.6 → 2.7 | 37 → 35 | -0.2 | 0.0 | -0.7 |
| `/blog/how-to-take-notes-on-audiobooks` | 1.2 → 0.3 | 35 → 45 | +0.4 | -0.1 | -1.1 |
| `/alternatives/bookplayer-alternatives` | 0.8 → 0.0 | 31 → 29 | -0.1 | -0.5 | -0.3 |
| `/blog/can-you-read-along-with-audible` | 2.0 → 1.3 | 233 → 252 | +0.2 | +0.1 | -1.0 |
| `/blog/is-librivox-safe-and-legal` (gain) | 0.0 → 1.7 | 38 → 34 | 0.0 | 0.0 | +1.7 |
| `/blog/best-count-of-monte-cristo-audiobook` (new Nov 10) | 0.0 → 1.3 | 0 → 53 | +1.3 | 0.0 | 0.0 |

Where the extra impressions went (a day, with CTR in the dip): abridged vs unabridged 106 → 215 (0%), Monte Cristo 0 → 53 (2.5%), Libby 160 → 197 (0.8%), why-can't-I-focus 0 → 36 (0%), fall asleep 90 → 124 (0.5%), captions 98 → 131 (0.5%), immersive reading 87 → 110 (0%), Spotify 77 → 97 (0%), Audible 233 → 252 (0.5%), how-long 109 → 125 (0%).

Reading the losers:
- **Best-apps post:** 4, 4, 3, 2 clicks on Nov 3 to 6; 1, 4, 1, 1, 0 on Nov 7 to 11. Its daily position went from 4.9 to 5.6, to 6.0 to 7.0, to 8.5 on Nov 11. The page that grew fastest the week before is settling. Most of its named queries are AI-style probes that never click.
- **Pocket FM:** 5 clicks a day on Nov 9 and 10, as before; the drop is Nov 11 alone (1 click, fresh data). Wait for the final number.
- **Homepage:** brand clicks 5, 2, 1, 5 on Nov 8 to 11. Noise.
- **Whispersync, notes, does-reading-along, BookPlayer:** each fell from 1 or 2 clicks a day to 0 or 1. Each change on its own is within noise.

### Queries

Named queries cover only **24% of clicks and 25% of impressions** over the 28 days; the rest are anonymized. They account for -1.1 of the -6.8 clicks a day, and -0.5 of that is the brand query "hushbook". The drop cannot be pinned on named queries. Impressions grew most for definition queries ranked 8 to 10: "immersive reading meaning" 10 → 27 a day (position 8.4), "abridged vs unabridged" 5 → 19 (9.2), "what is unabridged audiobook" 4 → 16 (9.6), "what does unabridged mean for audiobooks" 1 → 8 (9.5), "what is immersive reading" 6 → 11 (9.6), "does audible have subtitles" 4 → 8 (8.1). AI-style prompt queries held at 45 to 55 impressions a day with no clicks from Nov 3 on, flat across peak and dip.

### Device, country, search features

- Mobile CTR 1.59% → 1.09%, desktop 1.61% → 0.98%. Both fell.
- US: 11.0 → 7.3 clicks a day, CTR 1.20% → 0.66%, impressions +22%. US share of impressions 45% → 48%: no country mix shift.
- Search appearance: only "Translated result" (22 impressions in 28 days). No rich results. Image search: 328 impressions, 1 click in 35 days. Discover: none.
- AI Overviews are not in the API. Search Console's generative AI report (UI only, reported as launched June 2026, not checked) would show which impressions are AI Overview citations.

## How much titles can explain

- **The dip: none.** The last title or description changes on pages that had impressions were Oct 20 (Audible, immersive reading). The Nov 9 to 12 registry edits were new posts and one description on the Kindle post, which has no impressions yet. Commits from Nov 8 to 10 to the homepage, alternatives and answer pages changed no title or description. The dip hits pages with very different titles at once.
- **The level: some, on specific pages.** Twelve of the 39 pages with 100+ impressions run below the site curve (table below). Their combined shortfall is about 83 clicks in 28 days (3 a day). The eight pages with proposed changes account for 56 (2 a day, about 7% of current clicks). Rankings, recrawls and new pages move more clicks than snippets do here.

## Site CTR curve and benchmarks

Built from page-day rows of blog, alternatives and answer pages (Oct 15 to Nov 11), so it includes clicks from anonymized queries. Homepage, `/about`, `/download` and locale pages are left out because brand searches would inflate the top bands. Position is the page's average for the day, so each band mixes better and worse placements; bands 1-3 and 11+ are thin.

| Position (page-day average) | Impressions | Clicks | Site CTR |
|---|---|---|---|
| 1 to 3 | 357 | 12 | 3.4% |
| 4 | 1,446 | 46 | 3.2% |
| 5 | 3,653 | 85 | 2.3% |
| 6 | 8,493 | 125 | 1.5% |
| 7 | 9,627 | 60 | 0.6% |
| 8 | 6,242 | 29 | 0.5% |
| 9 to 10 | 4,076 | 9 | 0.2% |
| 11 to 15 | 1,384 | 6 | 0.4% |
| 16+ | 465 | 3 | 0.6% |

Outside benchmarks:
- **Sistrix 2020**, 80 million keywords: position 1 28.5%, 2 about 15%, 3 about 11%, 10 2.5%. *Checked through Search Engine Journal's report; Sistrix's own page not opened.*
- **Backlinko**, "We Analyzed 4 Million Google Search Results" (page updated Apr 16, 2025): position 1 27.6%. **VERIFIED** (read 2026-11-13).
- **Ahrefs**, "Update: AI Overviews Reduce Clicks by 58%" (Feb 4, 2026; 300,000 keywords; desktop Search Console data): position-1 CTR in Dec 2025 was **3.9% for informational keywords without an AI Overview and 1.6% with one**; with an AI Overview, positions 2 to 10 lose 19 to 51% of clicks. **VERIFIED.**
- **Pew Research Center** (July 2025; 68,879 searches by 900 US adults): a result was clicked on 8% of visits with an AI summary, 15% without. *Checked through search results quoting Pew; Pew's page not opened.*

The old all-query curves would predict 5 to 8 times this site's clicks at positions 5 to 8. The 2025 to 2026 informational numbers put position 1 at 1.6 to 3.9%, which is where this site's positions 1 to 5 sit. Every verdict below uses the site curve; the outside numbers are rough context only.

## Opportunity table

Pages with 100+ impressions, Oct 15 to Nov 11. At this site's curve, 100 impressions is about 1.5 to 3 expected clicks, the least that can show a shortfall. "Expected" applies the site curve to each page-day's position. **Flag** = clicks under 0.65 of expected and at least 3 short, or a Poisson chance of so few clicks under 5%.

| Page | Impr | Clicks | CTR | Pos | Expected | Ratio | P(so few) | Top named queries (impr, pos) | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| `/blog/can-you-read-along-with-audible` | 5,826 | 36 | 0.62% | 7.5 | 32.5 | 1.11 | 0.77 | can you read along with audible (62, 8.8); how to read along with audible (48, 9.4) | at curve, leave |
| `/blog/what-is-immersive-reading` | 3,168 | 3 | 0.09% | 8.3 | 13.3 | 0.22 | 0.001 | immersive reading (572, 9.2); immersive reader meaning (462, 7.6); immersive reading meaning (357, 8.0) | **flag**, blocked by stale crawl |
| `/blog/how-to-play-m4b-files` | 2,328 | 8 | 0.34% | 8.6 | 9.1 | 0.88 | 0.45 | how to play m4b files (58, 5.9); m4b player (40, 8.5) | Google-side drop, leave |
| `/blog/why-do-i-fall-asleep-listening-to-audiobooks` | 2,297 | 18 | 0.78% | 6.7 | 18.4 | 0.98 | 0.52 | is it bad to listen to audiobooks while sleeping (21, 8.2) | at curve, leave |
| `/blog/abridged-vs-unabridged-audiobooks` | 2,216 | 2 | 0.09% | 10.9 | 6.8 | 0.29 | 0.03 | abridged vs unabridged (115, 12.9); unabridged (90, 20.1); what is unabridged audiobook (75, 9.7) | **flag**, description |
| `/alternatives/pocket-fm-alternatives` | 1,743 | 74 | 4.25% | 5.6 | 33.5 | 2.21 | 1.00 | pocket fm alternative free (65, 5.5); pocket fm alternative (53, 5.8) | above curve, leave |
| `/blog/can-libby-read-to-you` | 1,667 | 14 | 0.84% | 6.3 | 22.3 | 0.63 | 0.04 | can libby read books to you (19, 7.0); how to get libby to read aloud (13, 4.9) | **flag**, watch |
| `/blog/does-reading-along-with-an-audiobook-help` | 1,255 | 22 | 1.75% | 5.7 | 20.7 | 1.06 | 0.66 | reading along with an audiobook (21, 6.5) | at curve, leave |
| `/blog/audiobook-listening-speed` | 1,206 | 5 | 0.41% | 7.7 | 8.0 | 0.63 | 0.20 | how to listen to audiobooks faster without losing comprehension (62, 6.5); best speed for audiobooks (23, 6.8) | **flag**, title + description |
| `/blog/best-apps-to-read-and-listen-at-the-same-time` | 1,196 | 21 | 1.76% | 6.1 | 18.4 | 1.14 | 0.77 | AI-style probes (86, 4.6; 72, 3.0) | at curve, leave |
| `/blog/can-you-read-along-with-spotify-audiobooks` | 1,082 | 6 | 0.55% | 6.0 | 16.2 | 0.37 | 0.004 | do spotify audiobooks have transcripts (8, 7.1); spotify page match not showing (8, 7.9) | **flag**, title |
| `/blog/how-long-is-an-audiobook` | 1,058 | 1 | 0.09% | 7.1 | 11.1 | 0.09 | <0.001 | how long is a 300 page audiobook (25, 5.4); how long are audiobooks (15, 6.5) | **flag**, title + description |
| `/blog/how-to-focus-on-audiobooks` | 982 | 10 | 1.02% | 5.5 | 19.6 | 0.51 | 0.01 | how to focus on audiobooks (31, 6.7); how to pay attention to audiobooks (17, 4.3) | **flag**, description |
| `/blog/audiobooks-with-captions` | 916 | 6 | 0.66% | 6.5 | 11.2 | 0.54 | 0.07 | does audible have subtitles (43, 8.0); does audible have closed captions (13, 6.5) | **flag**, title + description |
| `/` | 768 | 51 | 6.64% | 3.5 | brand | | | hushbook (149, 1.6); hush book (72, 7.0) | brand, leave |
| `/alternatives/bookplayer-alternatives` | 727 | 13 | 1.79% | 5.6 | 12.9 | 1.01 | 0.59 | anyplay alternatives (29, 8.3); bookplayer android (20, 8.1) | at curve, leave |
| `/blog/do-audiobooks-count-on-goodreads` | 663 | 1 | 0.15% | 6.5 | 6.1 | 0.16 | 0.02 | audible vs goodreads (15, 3.4); does audible count towards kindle reading streak (15, 9.3) | **flag**, title |
| `/blog/are-audiobooks-good-for-adhd` | 650 | 5 | 0.77% | 6.3 | 8.4 | 0.60 | 0.16 | are audiobooks good for adhd (17, 6.4) | **flag**, leave |
| `/alternatives/storytel-alternatives` | 548 | 6 | 1.09% | 4.6 | 14.1 | 0.43 | 0.01 | storytel alternatives (77, 3.1); storytel alternative (31, 3.6) | **flag**, description |
| `/blog/are-audiobooks-good-for-kids` | 493 | 5 | 1.01% | 6.6 | 6.2 | 0.81 | 0.42 | are audiobooks good for kids (14, 15.6) | near curve, leave |
| `/blog/how-to-retain-information-from-audiobooks` | 485 | 4 | 0.82% | 5.6 | 8.5 | 0.47 | 0.07 | named queries cover 3% | **flag**, watch |
| `/blog/does-listening-to-audiobooks-count-as-reading` | 484 | 2 | 0.41% | 10.0 | 4.5 | 0.44 | 0.17 | does listening to an audiobook count as reading (10, 9.8) | position-limited, leave |
| `/blog/how-to-listen-to-audiobooks-for-free` | 466 | 5 | 1.07% | 10.3 | 1.9 | 2.69 | 0.99 | how to listen to audiobooks for free (16, 8.1) | above curve, leave |
| `/whispersync-alternative` | 442 | 25 | 5.66% | 7.0 | 4.8 | 5.18 | 1.00 | whispersync (119, 11.4); whispersync alternative (27, 3.9) | above curve, leave |
| `/blog/is-librivox-safe-and-legal` | 423 | 6 | 1.42% | 6.3 | 5.9 | 1.02 | 0.62 | is librivox safe (55, 7.4) | at curve, leave |
| `/audiobook-with-text` | 415 | 23 | 5.54% | 4.6 | 11.2 | 2.05 | 1.00 | do audiobooks come with text (16, 6.8) | above curve, leave |
| `/blog/m4b-vs-mp3` | 398 | 1 | 0.25% | 8.6 | 1.8 | 0.56 | 0.47 | m4b vs mp3 (36, 7.4); mp3 vs m4b (30, 7.1) | gap under 1, leave |
| `/blog/how-to-take-notes-on-audiobooks` | 394 | 8 | 2.03% | 5.6 | 7.0 | 1.14 | 0.73 | AI-style probe (10, 4.3) | at curve, leave |
| `/blog/are-audiobooks-good-for-dyslexia` | 368 | 7 | 1.90% | 5.2 | 8.7 | 0.80 | 0.36 | named queries cover 4% | near curve, leave |
| `/blog/learn-english-with-audiobooks` | 287 | 7 | 2.44% | 5.3 | 5.5 | 1.27 | 0.81 | learn english with audiobooks (5, 10.0) | above curve, leave |
| `/about` | 274 | 3 | 1.09% | 3.0 | brand | | | hushbook (154, 2.1) | brand sitelink, leave |
| `/read-along-audiobooks` | 257 | 8 | 3.11% | 4.5 | 6.7 | 1.19 | 0.77 | audiobook with text (11, 7.8) | above curve, leave |
| `/alternatives` | 218 | 2 | 0.92% | 5.6 | 3.9 | 0.51 | 0.25 | hushbook.app alternatives (20, 1.1) | gap under 2, leave |
| `/ar` | 180 | 10 | 5.56% | 7.5 | 1.8 | 5.55 | 1.00 | Arabic free-audiobook-app queries | above curve, leave |
| `/blog/best-count-of-monte-cristo-audiobook` | 160 | 4 | 2.50% | 5.6 | 3.3 | 1.23 | 0.77 | count of monte cristo audiobook length (10, 9.3) | above curve, leave |
| `/alternatives/speechify-alternatives` | 120 | 0 | 0% | 36.2 | 0.8 | | | speechify alternative (52, 41.0) | position 36, leave |
| `/m4b-player` | 116 | 1 | 0.86% | 11.5 | 0.7 | 1.42 | | m4b files android (7, 8.9) | leave |
| `/blog/why-cant-i-focus-on-reading` | 109 | 0 | 0% | 7.6 | 0.5 | | | why cant i focus on reading (5, 24.8) | new Nov 8, leave |
| `/blog/learn-spanish-with-audiobooks` | 103 | 0 | 0% | 7.1 | 1.3 | | | no named queries | leave |

## Proposals

Eight pages, eleven field changes. Exact strings for a mechanical apply: `C:\Users\rakes\AppData\Local\Temp\claude\34842c9e8e99357b\c2a3d7ee-0455-4fa1-9408-497f363eadcb\scratchpad\ctr\title-changes.json` (copy in `%USERPROFILE%\hushbook-seo\scratch\2026-11-13\ctr\`). `old: null` means the field is absent today and the build falls back to the longer `description`; add `metaDescription` right after `metaTitle`. Strings are JavaScript values: the registries use single quotes, so write an apostrophe as `\'`.

How titles are built: blog `<title>` = `metaTitle + " | HushBook"` when that fits in 60 characters, otherwise `metaTitle` alone (`scripts/build-blog.js`, line 394); the H1 is the registry `title`; the meta description is `metaDescription || description`. Alternatives pages use `title` for both `<title>` and H1, and `description` for the meta description and the lede under the H1 (`scripts/build-alternative-pages.js`). Answer pages hard-code `title` (also the H1) in `scripts/build-answer-pages.js`; none needs a change. Every H1 and registry `title` stays as it is.

Google title rewrites: Zyppy's 2022 study rewrote least at 51 to 60 characters (see Patterns). All proposed titles are 55 to 59 characters. Where a title's opening words differ from the H1, I flag a higher chance that Google shows the H1 instead.

### 1. `/blog/how-long-is-an-audiobook`: title and description

- **28 days:** 1,058 impressions, 1 click (0.09%), position 7.1; 11.1 expected (P < 0.001).
- **Queries:** how long is a 300 page audiobook (25, 5.4), how long are audiobooks (15, 6.5), how long is an audiobook for a 300 page book (14, 4.6), how many pages per hour audiobook (9, 18.9), average audiobook length (7, 12.9), how many pages is a 12 hour audiobook (6, 8.8).
- **Now:** title "How Long Is an Audiobook? 300 Pages, 1.5x and 10 Classics" (57; no suffix). H1 "How Long Is an Audiobook? Hours for a 300-Page Book, and at 1.5x". Description (157): "A 300-page book runs about 8 to 10.5 hours. We counted the words in 10 classics and timed their LibriVox audiobooks: narrators read about 151 words a minute."
- **What searchers see (DuckDuckGo):** we are #1 for "how long is a 300 page audiobook"; the other nine results are calculators ("Audiobook Length Calculator: Pages or Words to Hours", "Audiobook Time to Page Calculator").
- **New title:** "How Long Is an Audiobook? Hours by Page Count and Speed" (55)
- **New description (144):** "A 300-page book runs about 8 to 10.5 hours. See hours for 200 to 500 pages, times at 1.25x, 1.5x and 2x, and the measured length of 10 classics."
- **Why:** the old tail reads as fragments. The new one names the conversion calculator searchers want, which the page already has (200 to 500 page list, 1.25x to 2x section). The answer still comes first; the reason to click is the table. The old description spent its second sentence on method.
- **Risk:** low. Position 7, same opening words as the H1. "300 Pages" leaves the title but stays in the description; the #1 Bing spot could move.

### 2. `/blog/can-you-read-along-with-spotify-audiobooks`: title

- **28 days:** 1,082 impressions, 6 clicks (0.55%), position 6.0; 16.2 expected (P = 0.004). All 6 clicks were on Nov 1 to 3. None in the 9 days since, at 70 to 105 impressions a day and an unchanged position.
- **Queries** (named queries cover 7%): Page Match, 18 impressions over five phrasings ("spotify page match not showing" 8, 7.9; "what is page match on spotify?" 4, 9.3); turning off "read along", 15 over three phrasings (10 to 11); "do spotify audiobooks have transcripts" (8, 7.1); "can you read books on spotify" (7, 4.7); "can you get subtitles on spotify audiobooks" (4, 5.8).
- **Now:** title "Can You Read Along With Spotify Audiobooks? | HushBook" (54). H1 "Can You Read Along With Spotify Audiobooks? Page Match, Recaps and Transcripts". Description (146) stays.
- **What searchers see (DuckDuckGo):** we are #1 for the exact question, then TechRadar and Fast Company on Spotify's Follow Along and Spotify's own Page Match how-to.
- **New title:** "Can You Read Along on Spotify? Page Match and Transcripts" (57)
- **Why:** searchers name Page Match and transcripts, and the title names neither. The brand suffix spends 11 characters on a name few searchers know. The H1's opening words stay.
- **Before applying:** 15 impressions ask how to turn off "read along" on Spotify. The post (checked Oct 27) doesn't cover it. Re-read Spotify's audiobook help pages first. If Spotify has shipped something new, update the body, or the new title promises an incomplete page.
- **Risk:** low to moderate. "Audiobooks" leaves the title but stays in the H1, URL and description.

### 3. `/blog/audiobooks-with-captions`: title and description

- **28 days:** 916 impressions, 6 clicks (0.66%), position 6.5; 11.2 expected (P = 0.07).
- **Queries:** 131 of the 158 named impressions (83%) are Audible questions. Does audible have subtitles (43, 8.0), does audible have closed captions (13, 6.5), does audible have captions (11, 7.7), audible subtitles (9, 7.8), does audible have transcripts (7, 9.4), can you get subtitles on audible (6, 6.0), audible closed captioning (6, 6.0). Generic "audiobooks with subtitles" phrasings bring 4 to 7.
- **Now:** title "Audiobooks With Captions: How to Get Subtitles on Any Book" (58; no suffix). H1 "Audiobooks With Captions: How to Get Subtitles on Any Audiobook". Description (156): "Most audiobooks have no captions. Audible's captions never launched. Get subtitles with Read & Listen, iPhone or Android Live Captions, or a read-along app."
- **What searchers see (DuckDuckGo, "does audible have subtitles"):** we are not in the top 10. It shows Audible's 2019 "Audible Captions: A Demonstration" page, two Reddit threads, "Does Audible Show the Words? 2026 Captions Guide" and YouTube how-tos.
- **New title:** "Does Audible Have Subtitles? Captions for Any Audiobook" (55)
- **New description (145):** "No. Audible's 2019 captions feature never launched. Use Read & Listen, Live Captions on iPhone or Android, or a read-along app for files you own."
- **Why:** the page answers this question in its intro and in the H2 "Does Audible have closed captions?", but the title names neither Audible nor the question.
- **Risk:** moderate. The opening words now differ from the H1, so Google is more likely to show the H1. A few generic-captions impressions could slip.

### 4. `/blog/how-to-focus-on-audiobooks`: add a description

- **28 days:** 982 impressions, 10 clicks (1.02%), position 5.5; 19.6 expected (P = 0.01).
- **Queries:** how to focus on audiobooks (31, 6.7), how to pay attention to audiobooks (17, 4.3), cant focus on audiobooks (8, 7.0), how to concentrate on audiobooks (8, 8.4).
- **Now:** title "How to Focus on Audiobooks: 7 Fixes for a Wandering Mind" (56) stays. Query words come first, and it holds its own on DuckDuckGo at #4 next to "How to Focus on Audiobooks [Tips That Actually Work]" and "6 Tips to better Focus on Audiobooks!". No `metaDescription`. Google gets the 186-character `description`, which opens with a 2013 study and gets cut off.
- **New metaDescription (151):** "Give your hands a simple task, rewind the moment you drift, pick an easy book, adjust the speed and read along. Seven fixes, and why your mind wanders."
- **Why:** answer-first, with five of the seven fixes in the searcher's words. No ranking risk.

### 5. `/blog/audiobook-listening-speed`: title and description

- **28 days:** 1,206 impressions, 5 clicks (0.41%), position 7.7; 8.0 expected (P = 0.20, weak on its own).
- **Queries:** how to listen to audiobooks faster without losing comprehension (62, 6.5), best speed to listen to audiobooks (23, 7.7), best speed for audiobooks (23, 6.8), audiobook vs reading speed (22, 9.7), what speed do you listen to audiobooks (18, 10.8). "bookbeat playback speed" (46, 22.6) is off topic.
- **Now:** title "What Speed Should You Listen to Audiobooks At? | HushBook" (57). H1 "What Speed Should You Listen to Audiobooks At?". No `metaDescription` (177-character `description`).
- **What searchers see (DuckDuckGo, "best speed to listen to audiobooks"):** we are not in the top 10. Competitors name speeds and comprehension: "Audiobook Listening Speed Guide 2026: 1.5x, 2x, and Beyond", "How to Listen to Audiobooks Faster Without Losing the Plot", "Best Audiobook Speed: 1.5x, 2x & Comprehension".
- **New title:** "Best Audiobook Speed: 1x to 2x Without Losing Comprehension" (59)
- **New metaDescription (149):** "Between 1x and 2x for most books. What a UCLA study found about 2x playback, when speed starts to cost comprehension, and a speed guide by book type."
- **Why:** the four biggest on-topic queries say "best speed" or "without losing comprehension", and the title has neither. The page delivers both: its opening answer (1x to 2x), the UCLA section and the guide by book type.
- **Risk:** low for ranking (position 7.7). The opening words now differ from the H1, so Google may show the H1. Lower confidence than changes 1 to 4.

### 6. `/blog/abridged-vs-unabridged-audiobooks`: add a description

- **28 days:** 2,216 impressions, 2 clicks, position 10.9; 6.8 expected (P = 0.03). **Position is the main limit, not the snippet.** The big queries sit at 10 to 22: abridged vs unabridged (115, 12.9), unabridged (90, 20.1), what is unabridged (73, 13.3), unabridged audiobooks (70, 21.8), what does unabridged mean (51, 17.9). The closest ones sit at 9.7: what is unabridged audiobook (75), what does unabridged mean for audiobooks (33).
- **Now:** title "What Is an Unabridged Audiobook? Abridged vs Unabridged" (55) stays; it covers both query families. No `metaDescription`; the 196-character `description` gets cut.
- **New metaDescription (153):** "Unabridged means the complete book, read word for word. Abridged means an editor cut it first. How to tell which one you are buying, and which to choose."
- **Why:** answer-first and complete within 160. The ranking work is action 3 of the 2026-11-09 plan (definition headings). No ranking risk.

### 7. `/blog/do-audiobooks-count-on-goodreads`: title

- **28 days:** 663 impressions, 1 click, position 6.5; 6.1 expected (P = 0.02).
- **Queries:** most named impressions ask something else. About 45 are AI-style "evaluate ... Goodreads" probes. Others: "audible vs goodreads" (15, 3.4) and "goodreads vs audible" (6, 1.0), the Kindle reading streak (20, 9 to 10), "apple tv plus vs goodreads" (14). Of the on-topic ones, logging questions outnumber "do they count" questions 31 to 16: can i log audiobooks on goodreads (7, 6.6), how to track audiobooks on goodreads (5, 6.4), how to log audiobooks on goodreads (4, 8.8). The count questions include do you count audiobooks on goodreads (9, 7.6).
- **Now:** title "Do Audiobooks Count on Goodreads? Challenge Rules (2026)" (56; no suffix). H1 "Do Audiobooks Count on Goodreads? Reading Challenge Rules and How to Log Them". On DuckDuckGo we are #3 behind two Goodreads pages.
- **New title:** "Do Audiobooks Count on Goodreads? How to Log Them (2026)" (56)
- **Why:** nobody searches "challenge rules". Logging is the larger real intent and has its own section ("How to add audiobooks to Goodreads"). The year stays because the challenge is yearly.
- **Risk:** low. The expected gain is small, because most impressions are intents no title will win.

### 8. `/alternatives/storytel-alternatives`: description (`data/alternative-pages.js`)

- **28 days:** 548 impressions, 6 clicks, position 4.6; 14.1 expected (P = 0.01). "storytel alternatives" has 77 impressions at 3.1 with no clicks; "storytel alternative" has 31 at 3.6 with 2.
- **Who searches:** named impressions come from Mexico, Germany, Poland, Turkey, Belgium, Spain, France and Switzerland, plus one Icelandic query. These are Storytel's markets, landing on an English-only page that leaves out local services. No snippet fixes that part.
- **Now:** title (also the H1) "5 Best Storytel Alternatives for Reading and Listening" (54) stays. Description (152): "Compare five Storytel alternatives for owned audiobooks, commercial catalogs, ebooks, free classics, private transcripts, and offline listening in 2026." It names no product. On DuckDuckGo we are #6; the competitors are long lists ("Top 10 Ebook Subscription services", "Top 13 Audiobook Stores", "Top 47 Best Similar Sites").
- **New description (147):** "HushBook, Audible, Everand, Spotify and LibriVox as Storytel alternatives, compared on cost, offline listening, your own files and read-along text."
- **Why:** people comparing services scan for names. The attributes listed are the page's own comparison rows. This is a description-only change (it also replaces the lede under the H1), so there is no ranking risk.

## Flagged but not changed

- **`/blog/what-is-immersive-reading`** (3 clicks vs 13.3 expected). Its current title ("What Is Immersive Reading? Meaning and How It Works", Oct 20) **has never been shown**: Google last crawled the page on Oct 13. The DuckDuckGo top 10 for "immersive reader meaning" is all Microsoft's tool, and the page has one paragraph on it. Request indexing now and judge the Oct 20 title two weeks after the crawl. If the 2026-11-09 plan's "What does Immersive Reader mean?" section ships, a title naming both becomes honest.
- **`/blog/can-libby-read-to-you`** (14 vs 22.3, P = 0.04). The title already matches the queries, and the answer ("Not by itself") is one the results page gives away. DuckDuckGo #4, behind Libby's own help pages and Reddit. Watch.
- **`/blog/how-to-retain-information-from-audiobooks`** (4 vs 8.5, P = 0.07). Named queries cover 3% of impressions, so there's nothing to write a title for; the current title matches its DuckDuckGo #2 spot. Watch.
- **`/blog/are-audiobooks-good-for-adhd`** (5 vs 8.4, P = 0.16). The title is the exact query; DuckDuckGo #2. Leave.

## Not touched

- **At or above the curve:** the Audible post (the largest pool, 36 vs 32.5), fall asleep, does-reading-along-help, best apps, BookPlayer, kids, dyslexia, LibriVox safety, notes, learn English, free audiobooks, the Monte Cristo post, `/whispersync-alternative`, `/audiobook-with-text`, `/read-along-audiobooks`, `/m4b-player`, `/ar`.
- **`/alternatives/pocket-fm-alternatives`:** 4.25% CTR, 2.2 times the curve. The 2026-11-09 plan's "leave the title alone" holds.
- **Homepage and `/about`:** brand traffic (the "hushbook" query at position 1 to 2). Their titles come from the HTML files themselves; nothing in the numbers calls for a change. Locale pages: too few impressions.
- **No verdict possible:** the M4B how-to (a Google-side drop since Nov 2, not a snippet problem), m4b-vs-mp3 (gap under 1 click), does-listening-count-as-reading (position 10, gap 2.5), the `/alternatives` hub (gap under 2), Speechify alternatives (position 36), and pages under 100 impressions or under two weeks old (why-can't-I-focus, Spanish, French, German, the Kindle posts, and four of the five book posts).

## Title-shape patterns on this site

These are the site's own rows: 31 blog and alternatives pages with 100+ impressions, comparing clicks with the site curve's expectation, pooled per group. Groups are small and overlap, so read them as hints.

| Shape | Pages | Clicks / expected | Ratio |
|---|---|---|---|
| **One-fact or definition query** (how long, what is, does X count, can X) | 16 | 135 / 194 | **0.70** |
| **List, comparison or how-to** | 12 | 165 / 142 | **1.16** (0.84 without Pocket FM) |
| Question title | 17 | 134 / 192 | 0.70 |
| Statement title | 14 | 166 / 147 | 1.13 (0.81 without Pocket FM) |
| " \| HushBook" suffix in the built title | 3 | 13 / 29 | 0.45 |
| No suffix | 28 | 287 / 310 | 0.93 |
| Relies on the long `description` (over 160 chars) | 6 | 38 / 59 | 0.64 |
| Has a `metaDescription` of 160 or less | 25 | 262 / 279 | 0.94 |
| Top query's words in the first 35 characters | 14 | 126 / 170 | 0.74 (0.74 without Pocket FM) |
| Not in the first 35 | 17 | 174 / 168 | 1.03 (0.74 without Pocket FM) |
| Year in title | 2 | 22 / 25 | 0.90 (no signal) |
| Parentheses | 5 | 39 / 42 | 0.93 (no harm seen) |
| Device or app names in title | 3 | 29 / 29 | 1.00 |

What the rows say:
- **Answer type matters more than title shape.** Question titles look worse, but almost every question title here targets a one-fact question that the results page answers by itself. Pages whose searchers still need to choose something (a list, a comparison, steps) earn at or above the curve.
- **Front-loading the query words shows no CTR difference here.** It may still help ranking, but it is not the lever behind these numbers.
- **Weak signals, consistent with outside work:** the brand suffix (three pages, half the curve) and missing meta descriptions (six pages, two thirds of the curve).

Outside research:
- **Backlinko** (4 million results, page updated Apr 2025): question titles 15.5% vs 16.3% CTR, "not significant"; titles of 40 to 60 characters had the highest CTR; positive sentiment had 4.1% higher absolute CTR than negative. **VERIFIED.**
- **Zyppy** (Cyrus Shepard, 80,959 titles from 2,370 sites, Q1 2022 data): Google rewrote 61.6% of titles. Rewrites were least common at 51 to 60 characters (39 to 42%), above 76% past 60 characters and 99.9% past 70. Brackets were rewritten 77.6% of the time and parentheses 61.9%. Google removed or replaced pipes 41.0% of the time and dashes 19.7%. **VERIFIED.**

## Title rules for new posts

1. Built `<title>` at most 60 characters. Spend the room on words, not the " | HushBook" suffix: the three suffixed pages earned half the curve, and Google drops pipes 41% of the time.
2. Open with the searcher's own words for the main query, and with the same words the H1 opens with.
3. After the colon or question mark, name concrete things the page gives (hours by page count, steps by device, the product names), never an abstraction ("Challenge Rules", "10 Classics", "for Reading and Listening").
4. For one-fact questions (how long, what does X mean, does X count) the results page gives the answer away, so make the title and description promise something the bare answer does not (the table, the steps, the comparison).
5. Always set `metaDescription`, at most 160 characters, answer first and then what else is on the page; never leave Google the longer `description`.
6. Use a year only where the facts change yearly. Parentheses are fine; no brackets, em dashes or en dashes.
7. "Best <book> audiobook" posts: keep "Best <Book> Audiobook: Every Edition Compared" (60 or less, no suffix). The description names the pick and narrator, the free pick, and the pick's running time, because half of Monte Cristo's first named impressions were length queries. **Data is thin:** Monte Cristo has 4 clicks and 201 impressions at position 5.6 in its first three days (2.0%, above the curve); Crime and Punishment, War and Peace, Pride and Prejudice and Wuthering Heights have no Search Console data yet.
8. Judge a title only after Google has recrawled the page and two more weeks have passed; a swing of one click a day is noise.

## What I could not check

- Google's live results, AI Overviews and People Also Ask for any query (Google bot-checks automated browsers; not attempted). The AI Overview share of impressions is visible only in Search Console's generative AI report in the web UI.
- The title Google actually displays for each page (rewrites are invisible in the data). DuckDuckGo shows our titles exactly as built, but that is Bing's index.
- Anonymized queries: 75% of impressions and 76% of clicks have no query attached, so most page-level verdicts rest on page totals.
- Whether Spotify shipped a "read along" feature after Oct 27 (one search found nothing).

## Needs you

1. **Review and apply the eleven changes** (`title-changes.json`), then rebuild, deploy and run IndexNow. Request indexing for the eight URLs.
2. **Request indexing for `/blog/what-is-immersive-reading` now.** Its last crawl was Oct 13, so its current title has never been shown.
3. **Before change 2, re-check Spotify's audiobook help pages** for the "read along" feature searchers are asking how to turn off.
4. **Re-measure two weeks after each recrawl** (about Nov 27 to Dec 1): compare each changed page's clicks with the site curve's expectation, not with last week.
5. **Unrelated finding:** the Storytel page's FAQ ("How does HushBook help me read while I listen?") says "tap a word to jump". Seeking in the app is long-press. Fix it in `data/alternative-pages.js` when change 8 goes in.

Nothing was committed, built or deployed. Outside the repo: raw data in `%USERPROFILE%\hushbook-seo\gsc\2026-11-13\` (including `ctr-audit\`), scripts in `%USERPROFILE%\hushbook-seo\scratch\2026-11-13\ctr\`.

## Applied 2026-11-13

All eleven changes went in, two of them amended. Every `old` string matched the registry before the edit, and each page was read to confirm it delivers what its new title and description promise. No H1 or registry `title` changed. Only the Spotify post's `dateModified` moved (to 2026-11-13); the meta-only changes kept their dates. Built, tested, not committed, not deployed.

### Final strings

Built length is what ships in `<title>` and `<meta name="description">`. None of the new titles takes the " | HushBook" suffix, because each would pass 60 characters with it. `og:title`, `og:description`, `twitter:title` and `twitter:description` match the title and description on all eight pages. JSON-LD parses on every page and no Markdown leaked.

| Page | Field | Final string | Built length |
|---|---|---|---|
| `/blog/how-long-is-an-audiobook` | title | How Long Is an Audiobook? Hours by Page Count and Speed | 55 |
| | description | A 300-page book runs about 8 to 10.5 hours. See hours for 200 to 500 pages, times at 1.25x, 1.5x and 2x, and the measured length of 10 classics. | 144 |
| `/blog/can-you-read-along-with-spotify-audiobooks` | title | Can You Read Along on Spotify? Page Match and Transcripts | 57 |
| `/blog/audiobooks-with-captions` | title (amended) | Audiobooks With Captions: Does Audible Have Subtitles? | 54 |
| | description (amended) | Audible's 2019 captions feature never launched. Get subtitles with Read & Listen, Live Captions on iPhone or Android, or a read-along app for files you own. | 156 |
| `/blog/how-to-focus-on-audiobooks` | description (new) | Give your hands a simple task, rewind the moment you drift, pick an easy book, adjust the speed and read along. Seven fixes, and why your mind wanders. | 151 |
| `/blog/audiobook-listening-speed` | title | Best Audiobook Speed: 1x to 2x Without Losing Comprehension | 59 |
| | description (new) | Between 1x and 2x for most books. What a UCLA study found about 2x playback, when speed starts to cost comprehension, and a speed guide by book type. | 149 |
| `/blog/abridged-vs-unabridged-audiobooks` | description (new) | Unabridged means the complete book, read word for word. Abridged means an editor cut it first. How to tell which one you are buying, and which to choose. | 153 |
| `/blog/do-audiobooks-count-on-goodreads` | title | Do Audiobooks Count on Goodreads? How to Log Them (2026) | 56 |
| `/alternatives/storytel-alternatives` | description and lede under the H1 | HushBook, Audible, Everand, Spotify and LibriVox as Storytel alternatives, compared on cost, offline listening, your own files and read-along text. | 147 |

**Why the captions strings were amended:** the proposal's "Does Audible Have Subtitles? Captions for Any Audiobook" opened with different words from the H1 ("Audiobooks With Captions: ..."). Keeping the H1's opening words makes Google less likely to swap in the H1, and keeps the generic captions queries in the title while the Audible question still appears. The description dropped the leading "No." because the title no longer opens with the Audible question.

**Promises checked against each page:** the how-long post lists hours for 200, 300, 400 and 500 pages, has a 1.25x, 1.5x and 2x section, and gives measured times for ten classics. The focus post's seven fixes include all five named (hands, rewind, easy book, slow down or speed up, read along), and its first H2 explains mind wandering. The speed post opens with 1x to 2x, covers the UCLA 2x study and its caveats, and has a guide by book type. The abridged post defines both terms in its first lines and has "How to tell" and "Which should you choose?" sections. The Goodreads post has "How to add audiobooks to Goodreads". The Storytel page's `options` are exactly hushbook, audible, everand, spotify and librivox, and its comparison table has Cost model, Offline use, Own-file playback and Read-along text rows.

### Spotify re-check

**Finding:** the "read along" that searchers want to turn off is Spotify's podcast transcript. Spotify launched it in 2023 "so you can read along with an episode", and some shows display it in place of the cover art. It is not an audiobook feature, not lyrics and not Follow Along. Spotify has not shipped or announced on-screen text for audiobooks since October 27. Nothing in the post's opening, takeaways or FAQs is out of date.

**Changes to the post:** a new H3 "How do you turn off read along on Spotify?" under "Do Spotify podcasts have read along?": Spotify's "Now Playing view" help page lists podcast transcripts but no setting to hide them, and its "Managing episode transcripts on Spotify" page says the show's creator can turn transcripts off for one episode or the whole show. Both pages were already in Sources. The "checked on" line now reads November 13, 2026, "from November 2024 to October 2026" became "to November 2026", and `dateModified` is 2026-11-13. The title went in as proposed.

Spotify pages, all read 2026-11-13:
- "Now Playing view - Spotify", https://support.spotify.com/us/article/now-playing/ : lists "Podcast transcripts" in the desktop Now Playing view; no setting to hide transcripts, read along or lyrics.
- "Managing episode transcripts on Spotify - Spotify", https://support.spotify.com/us/creators/article/managing-episode-transcripts-on-spotify/ : "Listeners see transcripts in the Now Playing View and on episode pages in the Spotify mobile app." Creators switch off "Display a transcript for this episode" or, for the show, "Display transcripts on Spotify". https://support.spotify.com/us/creators/article/viewing-episode-transcripts/ serves the same article.
- "Unlock Audiobooks - Spotify", https://support.spotify.com/us/article/audiobooks-unlock/ : Now Playing on an audiobook offers speed, 15-second skips, a sleep timer, rating and sharing. No text.
- "Audiobooks in Premium plans - Spotify", https://support.spotify.com/us/article/audiobooks-premium-plans/ : no text feature; hours are still counted at normal speed.
- "Video settings - Spotify", https://support.spotify.com/us/article/video-settings/ : the "Other videos" switch turns off video podcasts; nothing on subtitles or transcripts.
- Newsroom audiobooks tag, https://newsroom.spotify.com/tag/audiobooks/ : the posts since October 7 are "Boo! The Spotify Editors' Guide to Horror Audiobooks" (Oct 14, 2026) and "Scholastic's Catalog Is Now Available on Audiobooks in Premium" (Nov 10, 2026, https://newsroom.spotify.com/2026-11-10/scholastic-audiobooks-in-premium/, which covers catalog access only). Neither mentions audiobook text. The listing was cut off after the April 22, 2026 entry.
- "Spotify — Audiobooks", https://newsroom.spotify.com/books : nothing on on-screen text.
- "Plot Twist: 3 New Ways to Discover and Explore Audiobooks on Spotify" (Aug 11, 2026), https://newsroom.spotify.com/2026-08-11/audiobook-new-expanded-features/ : Prompted Playlist, Just Ask Spotify and series pages. No text.
- "Spotify Brings Long-Form Magazine Articles to Audio" (May 26, 2026), https://newsroom.spotify.com/2026-05-26/articles-magazine-test-launch/ : lists "Page Match, Recaps, and Follow Along" among Spotify's audiobook features.
- "Everything In Store for Podcast Listeners and Creators This International Podcast Day" (Sep 28, 2023): "so you can read along with an episode"; "scroll down the Now Playing View to find the transcript".
- Re-read and unchanged: both February 5, 2026 Page Match posts (including the plan rules in the how-to), the April 15, 2026 and October 7, 2026 posts, the November 13, 2025 Recaps post, the November 21, 2024 features post ("We're also testing a 'follow-along' feature on select titles") and "Spotify User Guidelines - Spotify".

**Follow-Along update (owner decision 1):** the Spotify post no longer says "we don't know whether Follow-Along is still running". It now says Follow-Along is still offered. It cites the May 26, 2026 post "Spotify Brings Long-Form Magazine Articles to Audio" (https://newsroom.spotify.com/2026-05-26/articles-magazine-test-launch/), which lists "Page Match, Recaps, and Follow Along" among Spotify's audiobook features but does not describe the feature. It also cites Spotify's "Audiobooks on Spotify" page (https://www.spotify.com/us/audiobooks/, read 2026-11-13), which offers Follow-Along with "time-synchronized illustrations, photos, and graphics for select titles". Both pages were added to Sources. The open question that remains is which titles have it.
**Spelling:** the post and registry keep "Follow-Along", as on Spotify's current audiobooks page and its October 15, 2025 post. The May 26, 2026 post writes "Follow Along" once in passing, and that wording is quoted as written. The registry needed no change: its description already says "Follow-Along", and no takeaway or FAQ mentions the feature. Rebuilt with `npm run build:blog`. The same 8 suites pass and the same 2 fail, with output identical to the baseline.

Spotify Community (not used in the post; replies carry no visible staff label): "Do all podcasts have read along?" (https://community.spotify.com/t5/Content-Questions/Do-all-podcasts-have-read-along/td-p/6190937) has a reply saying "it's not something that can be toggled off/on from the user's end". https://community.spotify.com/t5/Other-Podcasts-Partners-etc/Stop-Podcast-Live-Transcript/m-p/6808046/highlight/true served "Podcasts: choice between showing the podcast cover art or the captions", which shows captions replacing the cover art. Search snippets cite a three-dot menu, Subtitles, Off path for video episodes, but no fetched page confirmed it. Two pages returned 404: the Android board's "read along" label page and the Live Idea "Option to disable subtitles for audio-only podcast episodes".

Press, from search results only (articles not opened): TechCrunch, "Spotify expands audiobooks to over 180 markets" (Oct 7, 2026); Good e-Reader, "Hunger Games, Owl Diaries available on Spotify Audiobooks" (reported Nov 12, 2026, on the Scholastic catalog); Publishing Perspectives, "Spotify Expands 'Follow Along' for Audiobooks" (Aug 2025). None reports audiobook text.

### Stale "tap a word" claims

- Fixed in `data/alternative-pages.js`: in the Storytel FAQ, "tap a word to jump" became "long-press a line to play from there". In the BookPlayer FAQ ("What does HushBook add on top of a file player?"), "tap a line to skip" became "long-press a line to play from there". Both pages were rebuilt.
- No other cases in `data/*.js`, `content/blog/*.md`, `scripts/build-answer-pages.js`, root `*.html`, `alternatives/*.html` or `questions/`. The Spanish, French and German posts already say long-press, with "Tap a line to jump there" off by default. The Libby post's "tap a word to hear it again" is about OverDrive's reader.
- Left unchanged (locale or hand-written): `es/index.html:913` "Toca cualquier palabra para saltar allí." and `pt/index.html:913` "Toque em qualquer palavra para saltar lá." The translation maps in `scripts/generate-fr-local.js`, `scripts/localize-it.js`, `scripts/localize-ja-index.js` and `scripts/localize-ko-index.js` still hold the old English source line "Tap any word to jump there." The built fr, it, ja and ko pages no longer contain it. Agent context files still say "tap-to-seek": `.claude/product-marketing-context.md`, `.agents/marketing-context.md` and `LANDING_REVAMP_BRIEF.md`. The "Tap a word to start" lines in the ios-quotes mockup belong to the quote-marking flow, which is accurate.

### Tests

The `npm test` chain stops at its first failure, so each suite was also run on its own, before and after. Results were the same both times, with byte-identical output. Eight suites pass. Two fail as before. seo-preservation fails on "No preservation baseline state matched current manifest: ar/index.html protected region hash changed". seo-repair-contract fails on "Body baseline worktree routeCount must equal expected route count, 86 !== 26". Neither suite covers blog or alternatives pages: seo-preservation reads locale `index.html` and `about.html`, and seo-repair-contract checks locale `index.html` plus the five English-only pages, with `<title>` assertions only on download pages.

### Changed files

`data/blog-posts.js`, `data/alternative-pages.js`, `content/blog/can-you-read-along-with-spotify-audiobooks.md`, the seven built blog posts, `alternatives/storytel-alternatives.html`, `alternatives/bookplayer-alternatives.html`, `blog/index.html` (the Spotify `dateModified` in the Blog JSON-LD) and `sitemap.xml`. In the sitemap, the Spotify post and `/blog` moved to 2026-11-13. `/terms-conditions` moved to 2026-11-12, catching up with commit 6142203, which changed the terms without rebuilding the sitemap. After the full alternatives chain, the Speechify page still has its "Want the short version?" section and every page keeps its GA tag. No other alternatives page differs from HEAD.

### Recrawl requests

- https://hushbook.app/blog/how-long-is-an-audiobook
- https://hushbook.app/blog/can-you-read-along-with-spotify-audiobooks
- https://hushbook.app/blog/audiobooks-with-captions
- https://hushbook.app/blog/how-to-focus-on-audiobooks
- https://hushbook.app/blog/audiobook-listening-speed
- https://hushbook.app/blog/abridged-vs-unabridged-audiobooks
- https://hushbook.app/blog/do-audiobooks-count-on-goodreads
- https://hushbook.app/alternatives/storytel-alternatives
- Lower priority: https://hushbook.app/alternatives/bookplayer-alternatives (one FAQ sentence changed). Still due from "Needs you" item 2: https://hushbook.app/blog/what-is-immersive-reading
