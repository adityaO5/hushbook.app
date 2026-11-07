# Keyword scout

Ranks blog topic candidates for hushbook.app from free signals. Writes a Markdown report into the repo and the raw signals (including Search Console rows) outside it.

```sh
node tools/seo/keyword-scout.mjs --seeds "audiobook,audiobooks" --out docs/seo/keyword-research-2026-11-07
node tools/seo/keyword-scout.mjs --gsc-only                 # GSC gap list only, no network, a few seconds
node tools/seo/keyword-scout.mjs --help                     # every flag
```

A full run (about 25 seeds) makes about 7,400 autocomplete calls (about 10 minutes), 35 Reddit calls and up to 60 browser page loads. Reddit's RSS search allows about one call a minute from this network, so the Reddit stage sets the pace: about 35 to 40 minutes in all, with the SERP probe running alongside it. Responses are cached for 3 days (7 for SERPs) in `~/hushbook-seo/keyword-scout/cache`, so a rerun with a changed config or `--youtube-demand` file finishes in seconds. `--fresh` ignores the cache.

Outputs:

- `<out>.md`: sources that worked or failed, the formula, the ranked table, deep dives for the top 5, the strongest excluded families per reason (rejected, covered, off-fit, no fit), the top 15 of the GSC gap list, run notes. Generated sections are labelled "(generated)". A rerun overwrites the file, so add hand-written analysis (curated shortlist, the pick) after the run and copy it out before rerunning.
- `~/hushbook-seo/keyword-scout/<date>/signals.json`: every family with all phrasings and raw signals, the GSC gap list and the raw autocomplete lists. Kept out of git because it holds Search Console rows. `--json <path>` moves it.

Topic decisions live in `keyword-scout.config.mjs`: the pain categories for Fit, the off-fit pattern, rejected topics with the reason, domain classes and the subreddit. Add a rejected topic there after a live check says no, so later runs stop proposing it.

## Pipeline

1. **Seeds**: `--seeds`, `--seeds-file`, plus the top `--gsc-seeds` (default 6) uncovered Search Console queries that are about audiobooks in general.
2. **Autocomplete**: each seed is expanded with 12 question prefixes (how, what, why, can, does, is, are, should, which, best, when, where), 9 modifiers (for, with, without, vs, like, or, app, apps, free) and a to z, on five engines. Then the top `--l2` first-level phrases (default 25) are expanded again with the modifiers. Calls to one host are spaced by `--delay` (150 ms), two at a time.
3. **Families**: suggestions are grouped by their topic tokens (stopwords and the generic words audiobook, audio, book, app removed, plurals folded). "can you listen to audiobooks offline" and "listen to audiobooks offline" share a family. The ranked table merges near-duplicate families into the higher one and lists them as merged: overlapping words, one family inside the other, or the same words once modifiers such as "in a day", "fast" or "free" are set aside. Families that name different platforms (Libby, Spotify, Kindle, none) never merge.
4. **Site coverage**: every family is compared with `data/blog-posts.js` (slug, title, keywords, FAQ questions), the root answer pages, `/alternatives/*` and the `/questions` headings. Levels: covered, faq, near.
5. **Search Console**: the newest `~/hushbook-seo/gsc/<date>/queries.csv` and `queries_pages.csv`. A GSC query matches a family when their topic tokens overlap by 60% or more (Jaccard 0.6; at 0.5 a one-word key such as {focus} matched every two-word key containing it, so "cant focus on audiobooks" looked like cannibalization of "cant focus on reading").
6. **Reddit** on the top `--reddit` families (default 25): Reddit's global search for each, plus an r/audiobooks search for the top `--reddit-sub` (default 10).
7. **SERP probe** in headed Chrome on the top `--serp` families (default 30), 9 s apart per engine. Steps 6 and 7 run in parallel on the same shortlist, so the SERP shortlist is ranked before Reddit data arrives.
8. **Score, rank, write.**

## Signals

| Signal | Source | What it means | Caveats |
|---|---|---|---|
| Engine coverage | Google (firefox and chrome clients), YouTube, Bing, DuckDuckGo autocomplete | How many engines suggest any phrasing of the topic. Suggestions are filtered by query volume, so presence on several engines is the best free demand proxy. | Not a search volume. The firefox list is nearly a subset of the chrome list (1.3% of firefox suggestions were missing from chrome on 2026-11-07) and DuckDuckGo mostly mirrors Bing (5% missing); the report prints both overlaps. `--engines google-chrome,youtube,bing,ddg` saves a fifth of the calls. |
| Chrome relevance | `google:suggestrelevance` from `client=chrome` | Google's own ranking score for the suggestion. 1250 or more is the top completion; 550 to 600 is the tail. | Rank-like, not volume. Bing's `suggestrelevance` is just 1300 minus the rank, so it is ignored. |
| Phrasings | count of distinct suggestions in the family | Breadth of the way people ask. The fair signal used in earlier reports. | Inflated a little by a to z expansions on seeds that contain the topic. |
| YouTube suggest | `client=youtube&ds=yt` | Video demand and how-to intent. | Separate audience; counts as one engine. |
| In Bing autocomplete | Bing or DuckDuckGo | Bing's index feeds ChatGPT search and Copilot, so a topic Bing suggests is likely asked in those tools too. | Proxy only. |
| Reddit | `reddit.com/search.json`, else RSS search plus Arctic Shift | Relevant threads in the last year (global search sorted by relevance, because sorting by top returns viral off-topic posts; r/audiobooks sorted by top), top thread score and comments, question-shaped titles. High-score question threads mean real pain and often a forum-heavy, beatable SERP. | Reddit blocks the JSON API from many networks ("blocked by network security"); the RSS feed has no scores, so scores come from Arctic Shift's ID lookup, final about 36 h after posting. RSS is rate limited to about one call a minute (`x-ratelimit-remaining: 0`, reset up to 60 s); the script waits out `x-ratelimit-reset` and backs off on 429. Arctic Shift's keyword search returned 422 "slow down" on 2026-11-07 even when spaced, so only its ID lookup is used. A title counts only when the topic's words sit within six words of each other in it (one-word topics also need a book word), so "the focus should be ... what we have read" does not count for "cant focus on reading". Read the threads in the deep dive before quoting a number. |
| GSC match | Search Console CSVs | Impressions, clicks and best position for matched queries, and the pages they land on. CANNIBALIZATION: an existing page already gets a matched query at position 12 or better. OPPORTUNITY: impressions at a worse position, or no landing page row. | 90-day window, anonymised long tail missing. Token matching can catch a loosely related query; read the matched queries in the deep dive before acting. |
| GSC gap list | Search Console CSVs | Top 50 queries by impressions that no page covers by topic and that do not already land on a blog or answer page at position 15 or better (the report shows 15, the JSON all 50). | Mostly title-specific M4B searches and ranking problems on existing pages; useful as seeds, rarely as topics. |
| SERP composition | Google in headed Chrome; DuckDuckGo (Bing index) as the second engine; Brave when Google blocks | Top 10 domains classed as forum, video, authority (big brands, .gov, .edu) or other; visible years; People Also Ask (`[data-q]`); AI Overview; related searches. | Google often shows its "unusual traffic" check to automated browsers (on 2026-11-07 it did on the first query, over IPv4 and IPv6, with Chrome and the bundled Chromium); the script stops querying Google at the first one and says so. Brave showed its own check after three queries that day. Bing's own results page returns junk to automated browsers (it searched only the first word), so it is not used. PAA and allintitle exist only on Google. Without Google, PAA falls back to question-shaped related searches (marked `r`). |
| allintitle | `allintitle:"phrase"` on Google, `#result-stats` | Pages with the exact phrase in the title. Low means few pages target it. | Google often hides result stats now; the report says when it did. |
| YouTube volume | vidIQ, via `--youtube-demand` | Monthly YouTube search estimate. | The vidIQ MCP is called by the agent, not the script (5 credits a call). Save `{"phrase": {"volume": n, "competition": n}}` and pass the file. |
| Fit | `keyword-scout.config.mjs` | Whether the reader feels a pain that synced text solves: synced text, language learning, accessibility, focus and retention, missed words, speed, kids, own files, offline, free classics, notes. | Regex lexicon; it can miss a fit or match a word in the wrong sense. Check the categories in the deep dive. |

## Score

Score = 100 x (0.40 Demand + 0.35 Weakness + 0.25 AI shape) x (0.3 + 0.7 Fit) minus penalties. Each part is 0 to 1 and shows as 0 to 100 in the report. Fit is a multiplier, not a fourth term: an early version added it at 25% and generic speech-to-text queries ("whisper transcription for mac") won on demand alone. Fit 0 keeps 30% of the score, Fit 100 keeps all of it.

- **Demand** = 0.25 engine coverage + 0.20 chrome relevance ((rel - 500) / 750, capped) + 0.20 phrasings (log scale, 25 = full) + 0.15 Reddit (half log10(top score) / 3, half relevant threads / 10) + 0.20 GSC impressions (log10 / 3). A vidIQ volume, when given, takes 10% (log10 / 5).
- **Weakness** = 0.35 forums in the top 10 (4 = full) + 0.30 absence of authority domains (5 = none left) + 0.15 share of dated results two or more years old + 0.20 low allintitle (1 - log10 / 5; dropped and the rest reweighted when missing). Averaged over the engines probed. Not probed = 0.5, shown as n/p.
- **AI shape** = 0.30 question or prompt phrasing anywhere in the family (how, what, can, is there, which app, best) + 0.20 four or more words (three = half) + 0.20 PAA count (4 = full) + 0.15 an AI answer already cites sources (Google AI Overview, DuckDuckGo Search Assist, Brave answer) + 0.15 present in Bing or DuckDuckGo autocomplete.
- **Fit** = the strongest matching pain weight plus half of each other match, capped at 100. A family where under 30% of phrasings mention books, reading or listening (`bookContext` in the config) keeps a quarter of its Fit. Fit 0 families leave the ranked table.
- **Penalties**: rejected topic 50, off-fit 20, covered by a published page 35, answered in a FAQ 10, near an existing page 5, generic head term 15, cannibalization 20. Opportunity earns 5.

Rejected, covered, off-fit, no-fit and head-term families leave the ranked table (`--include-rejected` keeps them) and appear in the "excluded" table instead, so a strong family that was dropped is still visible.

The weights are a judgment call written down so runs are comparable week to week. Change them in `scoreCandidate` and say so in the report.

## Browser

The SERP probe launches Google Chrome (`channel: 'chrome'`, falling back to the bundled Chromium) with `chromiumSandbox: true`, headed, the window parked off screen at 2000,2000. It keeps its own profile in `%LOCALAPPDATA%\hushbook-keyword-scout\chrome-profile`, seeded on first run from the newest Playwright MCP profile so Google sees an existing cookie jar. Delete that folder to reset it. `--headless` exists but Google blocks headless almost every time.

## Caveats

- Nothing here is search volume. Treat the score as a ranking for a human to read, then check the top picks by hand (live SERP, PAA, the matched GSC queries).
- Topic families come from token matching. Two different intents can share tokens ("audiobook player" for files versus for kids), and one intent can split across families when people use different words. Read the phrasings in the deep dive.
- Fit is a regex lexicon, not judgment. A high Fit with a weak SERP is a lead to check, not a decision.
- Fit 0 families leave the shortlist, so a gap in the lexicon hides a whole cluster. On 2026-11-07 "reading slump" (221 Google phrasings) scored 0 until "slump" joined the focus category. Seed pain phrases you suspect ("cant focus on reading") and read the "no fit" rows of the excluded table.
- Autocomplete differs by location and personalisation is off only partly. The script asks for `hl=en&gl=us` (Google, YouTube), `mkt=en-US` (Bing) and `kl=us-en` (DuckDuckGo).
- The Monday automation cannot run this yet: `~/hushbook-seo/weekly-seo.ps1` denies `Bash(node *)` and `weekly-prompt.md` says not to run node. To wire it in, allow `Bash(node tools/seo/keyword-scout.mjs*)` in the script and replace the prompt's autocomplete step with a run of this tool.
