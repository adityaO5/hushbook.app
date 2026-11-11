# Keyword research: 2026-11-11

Two lanes, per the owner's 2026-11-10 direction: a book-title lane (default) and a platform/how-to lane. Pick: **`best-crime-and-punishment-audiobook`**. Brief: `docs/seo/drafts/2026-11-11-best-crime-and-punishment-audiobook/scout.md`.

## How it was measured

**Book lane: one controlled autocomplete sweep, the same calls for every title.** 40 titles (39 candidates plus *The Count of Monte Cristo* as the yardstick, since it shipped yesterday). Per title: 43 calls to Google's `client=chrome` suggest (`hl=en&gl=us`): 16 decision-shaped seeds (`best <t> audiobook`, `best audiobook version of <t>`, `<t> audiobook narrator`, `best translation of <t>`, `<t> translation audiobook`, `how long is the <t> audiobook`, `is <t> hard to read`, `should i read or listen to <t>`, `<t> audiobook free`, `<t> unabridged audiobook`, `<t> audiobook vs book`, `which <t> audiobook`, `<t> audiobook reddit`, `<t> read along`, `<t> a`, `best <t>`), plus `<t> audiobook` alone and with ` a` to ` z`. The same 16 seeds went to Bing (`api.bing.com/osjson`) and DuckDuckGo (`duckduckgo.com/ac`). No call failed. Scripts: `docs/seo/drafts/2026-11-11-best-crime-and-punishment-audiobook/scripts/` (`ac.mjs`, `analyze2.mjs`). Raw JSON stays in the session scratchpad (`scratchpad/books/ac-*.json`), outside git.

- **Google on-topic**: distinct Google suggestions that contain the title.
- **Audiobook-decision**: the on-topic ones about audio or the choice of edition (audiobook, narrator, LibriVox, translation, length, hours, hard to read, read along, unabridged), minus movie, song, quotes, summary and language-dub noise.
- **rel ≥ 1250**: audiobook-decision suggestions Google ranks as a top completion (`google:suggestrelevance`).
- **Bing+DDG**: distinct audiobook-decision suggestions from the 16 seeds on Bing and DuckDuckGo combined.

**Reddit.** Reddit's RSS search answered "forbidden" (HTTP 403, then 429) on every call today, and Arctic Shift's title search timed out ("Timeout. Maybe slow down a bit") on every retry. Threads were found through DuckDuckGo `site:reddit.com` searches and the 2026-11-10 RSS files, and their scores read through Arctic Shift's ID lookup, which worked.

**SERP.** DuckDuckGo's HTML endpoint answered 16 queries (12 "best <title> audiobook" style, 4 `site:reddit.com`), then returned HTTP 202 (bot check) for the rest of the session. Google's "unusual traffic" page and DuckDuckGo's anomaly page both appeared on the first query from headless Chrome (`channel: 'chrome'`, `chromiumSandbox: true`). Startpage served a proof-of-work challenge. So: **Google SERP, People Also Ask, AI Overview and DuckDuckGo Search Assist are UNCHECKED** for every candidate.

**Search Console.** `~/hushbook-seo/gsc/2026-11-09/` (2026-08-10 to 2026-11-07, 1,153 queries). No row mentions Crime and Punishment, Dostoevsky, the Odyssey or Homer. Book titles appear only twice: "count of monte cristo audiobook length" (1 impression, position 10, how-long post) and "war and peace" (1, position 4, Spotify post). `node tools/seo/keyword-scout.mjs --gsc-only` gap list holds no book title.

**Platform lane.** `node tools/seo/keyword-scout.mjs` with 10 seeds (the three parked runner-ups plus "drm free audiobooks", "libro.fm vs audible", "best audiobook player for windows", "best classic audiobooks", "best audiobook narrators", "audiobook and ebook together"), engines google-chrome, bing, ddg, no Reddit or SERP stage (both blocked as above). 690 expansion queries per engine, 1,712 suggestions, 861 families. Report kept in the scratchpad (`scout-platform-2026-11-11.md`), not in the repo, so this file is not overwritten.

## Book lane: all 40 titles

Same 43 Google and 16 Bing/DDG calls per title. Sorted by audiobook-decision phrasings.

| Title | Google on-topic | Audiobook-decision | rel ≥ 1250 | Best/which/narrator | Translation | Length | Hard | Bing+DDG |
|---|---|---|---|---|---|---|---|---|
| Project Hail Mary | 364 | 310 | 25 | 39 | 0 | 11 | 5 | 43 |
| The Odyssey | 298 | 245 | 20 | 48 | 34 | 17 | 14 | 59 |
| Frankenstein | 234 | 179 | 10 | 25 | 0 | 11 | 13 | 28 |
| Pride and Prejudice | 244 | 179 | 13 | 28 | 3 | 8 | 7 | 31 |
| Sherlock Holmes | 213 | 152 | 7 | 9 | 2 | 1 | 5 | 31 |
| **Crime and Punishment** | **195** | **151** | **14** | **32** | **36** | **13** | **13** | **22** |
| Wuthering Heights | 209 | 151 | 4 | 40 | 3 | 11 | 13 | 35 |
| The Iliad | 182 | 143 | 11 | 39 | 31 | 10 | 9 | 35 |
| Emma (ambiguous name) | 199 | 142 | 3 | 13 | 0 | 7 | 3 | 14 |
| Dracula | 191 | 133 | 16 | 16 | 0 | 8 | 10 | 15 |
| *The Count of Monte Cristo (yardstick, published 11-10)* | *150* | *119* | *12* | *39* | *18* | *13* | *7* | *18* |
| The Great Gatsby | 157 | 117 | 6 | 16 | 0 | 6 | 3 | 34 |
| War and Peace | 144 | 104 | 4 | 26 | 21 | 15 | 10 | 25 |
| East of Eden | 141 | 90 | 14 | 13 | 2 | 11 | 8 | 15 |
| Jane Eyre | 136 | 87 | 11 | 16 | 1 | 7 | 5 | 21 |
| Anna Karenina | 127 | 83 | 4 | 19 | 16 | 8 | 9 | 22 |
| The Brothers Karamazov | 113 | 80 | 7 | 22 | 17 | 8 | 8 | 21 |
| Don Quixote | 112 | 75 | 11 | 19 | 16 | 7 | 9 | 31 |
| Les Misérables | 118 | 72 | 5 | 20 | 14 | 6 | 6 | 24 |
| The Divine Comedy | 102 | 67 | 1 | 29 | 24 | 6 | 8 | 18 |
| Little Women | 105 | 63 | 7 | 14 | 0 | 2 | 1 | 20 |
| Ulysses | 108 | 63 | 2 | 8 | 1 | 7 | 10 | 12 |
| Paradise Lost | 107 | 60 | 4 | 9 | 5 | 5 | 5 | 21 |
| Great Expectations | 101 | 58 | 4 | 10 | 0 | 6 | 5 | 13 |
| Meditations (Marcus Aurelius) | 93 | 58 | 3 | 23 | 12 | 6 | 3 | 9 |
| Jekyll and Hyde | 106 | 57 | 2 | 4 | 0 | 10 | 2 | 15 |
| The Aeneid | 82 | 56 | 3 | 16 | 16 | 3 | 3 | 26 |
| A Tale of Two Cities | 91 | 53 | 2 | 13 | 1 | 4 | 4 | 10 |
| Dante's Inferno | 93 | 51 | 5 | 19 | 14 | 6 | 4 | 14 |
| The Picture of Dorian Gray | 90 | 50 | 5 | 12 | 1 | 9 | 3 | 7 |
| The Scarlet Letter | 90 | 50 | 4 | 5 | 0 | 5 | 3 | 16 |
| Middlemarch | 84 | 44 | 6 | 11 | 0 | 6 | 5 | 6 |
| The Three Musketeers | 78 | 39 | 2 | 13 | 6 | 5 | 3 | 5 |
| The Art of War | 73 | 38 | 4 | 13 | 9 | 6 | 3 | 20 |
| Heart of Darkness | 75 | 37 | 3 | 6 | 1 | 4 | 4 | 11 |
| David Copperfield | 71 | 29 | 2 | 7 | 0 | 4 | 1 | 7 |
| Bleak House | 58 | 26 | 4 | 6 | 0 | 4 | 3 | 4 |
| The Hound of the Baskervilles | 59 | 22 | 1 | 4 | 0 | 5 | 0 | 6 |
| Moby-Dick | 23 | 3 | 1 | 1 | 0 | 0 | 0 | 6 |
| Jane Austen (author, not a title) | 146 | 87 | 3 | 11 | 0 | 5 | 8 | 15 |

Blind spot: Google returns almost nothing for "moby dick" phrasings (it suppresses the word), so Moby-Dick's row says nothing about demand. Bing+DDG has 6.

## Curated top 5

| # | Topic | Autocomplete (measured today) | Reddit (threads found, top score/comments) | SERP (DuckDuckGo, Bing index) | GSC | HushBook fit |
|---|---|---|---|---|---|---|
| 1 | **Best Crime and Punishment audiobook** (PICK) | 151 audiobook-decision phrasings, 14 at rel ≥ 1250 (Monte Cristo: 119 and 12). Most translation phrasings of any title but the Odyssey (36). Top completion of the whole sweep: "crime and punishment audiobook translated by david mcduff" (1252). Yesterday's firefox-client lane adds "crime and punishment audiobook with text", "... with text app", "... read along free" (`lane-books/ac-gff.json`, 2026-11-10 scratchpad) | 11 threads 2018 to 2025: "Is there an audiobook of crime and punishment but the penguin classics version?" 16/6, "Best Crime and Punishment narrator?" 13/7, "Best version of Crime and Punishment on Audible?" 10/4, "Best crime and punishment audiobook, for shadow reading?" 1/2 (2025) | "best crime and punishment audiobook": welovetranslations.com (2022 in its URL; lists a dozen or more narrators with accents and runtimes), Reddit x3, archive.org, bestsellingaudiobooks, YouTube, Audible x2, hoopla. No other comparison page. "... which translation": welovetranslations x2, classicsretold (2026), literaryfancy (2026), readingtheodyssey.com (2025), Audible x2, Reddit, Goodreads, Libro.fm | 0 rows | High: 4 free LibriVox recordings of the public-domain Garnett translation (19 h 52 m to 23 h 26 m), all four in Discover's first search tier; Russian names with several forms each (character map, read-along) |
| 2 | Best Odyssey audiobook | Highest public-domain demand: 245 audiobook-decision, 20 at rel ≥ 1250, 34 translation, 59 Bing+DDG. Includes "the odyssey audiobook greek names" | 4 threads: 25/22 (2016), 10/11 (2018), 0/11 (2026-07, "Which odyssey translation option is best from my library's audiobook collection?"), 3/0 (2026-06) | **Crowded by single-topic 2026 sites.** "best odyssey audiobook translation": hearhomer.com x2 (a 16-recording "verified registry" plus pages for length, free options, listen or read, the movie, the AI Michael Caine version), citylit, audiobookfest (2024-11), openscriptorium, Reddit x2, whichodyssey.com (modified 2026-10-22), jsusannewilson, readtheodyssey.org ("2026 Guide") | 0 rows | High: LibriVox Butler prose recording `odyssey_butler_librivox` 11:18:25 with 6,136,393 archive.org downloads, plus two more English versions. The how-long post's FAQ already answers "How long is The Odyssey audiobook?" (Butler, about 11 hours) |
| 3 | Best Pride and Prejudice audiobook | 179 audiobook-decision, 13 at rel ≥ 1250 (Rosamund Pike, Juliet Stevenson, Karen Savage, Julie Andrews, BBC, "american accent", LibriVox) | UNCHECKED | UNCHECKED (DuckDuckGo blocked before it ran) | 0 rows | High: many solo LibriVox recordings; Austen's English is a known read-along pain. No translation layer, so a thinner comparison |
| 4 | Best War and Peace audiobook | 104 audiobook-decision, 4 at rel ≥ 1250 ("war and peace audiobook length" 1251, "... best narrator", "... thandie newton", "best war and peace translation") | Strongest Reddit: 14 threads, "War and Peace Narrated by Thandiwe Newton" 78/24 (2021), "Has anyone listened to War and Peace?" 17/26 (2025), "Which translation have you chosen?" 8/33 (2023), Briggs vs Pevear 27/8 | Weakest SERP: Reddit x3, audiobookfest, Audible, Amazon x2, audiobooksoul, compendium.audio, an AI listicle; narrator query adds a 2021 Guardian review and an AI page (oreateai) | 1 impression ("war and peace", Spotify post) | High, but `how-to-keep-track-of-characters-in-a-book` already has a War and Peace H2, and three LibriVox sets (17-book, Dole, Maude 4 volumes) make the free answer messy |
| 5 | Can you buy audiobooks without a subscription? (platform) | 2026-11-10: 85 Google phrasings, 33 Bing+DDG, controlled probe 62 against Libby's 57, 1 phrasing at rel 1250 (`docs/seo/keyword-research-2026-11-10.md`). Today's scout: family "audiobook without subscription" 20 phrasings on Google, Bing and DuckDuckGo, best rel 601 | 2026-11-10: 47/63 (2023), 18/52 (2024), 12/83 (2025) | 2026-11-10: no authority domain in the top 10 (1minutebook x2, readtm, audiobooksgeek x2, Reddit x2). Not re-probed today | 0 rows | Medium to high: free app, plays DRM-free files you buy; sells no audiobooks |

**Why Crime and Punishment and not the Odyssey.** The Odyssey has about 1.6 times the phrasings, but its SERP already holds hearhomer.com, a 2026 site built for exactly this post (a 16-row recording table with translator, narrator and runtime, plus separate pages for length, free versions and "listen or read first"), and two more single-topic sites (whichodyssey.com, readtheodyssey.org). For a domain as young as hushbook.app, that is a fight for position 5. Crime and Punishment beats yesterday's Monte Cristo on six of the eight counts in the table, ties on length (13) and trails on best/which/narrator (32 against 39). Its translation demand is twice Monte Cristo's (36 against 18). Its SERP has one serious page (welovetranslations) and then Reddit and store listings. And its autocomplete names the HushBook feature: "crime and punishment audiobook with text", "... with text app", "... read along free".

**Why the book lane and not the platform pick.** Crime and Punishment has 14 top completions from 43 Google calls; the no-subscription topic had 1 from the 11-10 scout's 1,361 expansion queries per engine. It also has a definite "which edition" answer the post can own with a table, and the owner asked for book titles. The no-subscription topic keeps the weaker SERP (no authority domain), so it stays first in the platform queue.

## Rejected or parked today

- **Project Hail Mary** (310, the most of any title): in copyright, one narrator (Ray Porter), so no "which version" question; DRM-free availability UNCHECKED (Libro.fm returned a bot check). Fit fails unless a DRM-free edition exists.
- **Frankenstein** (179): no translation question; a school-text tail ("chapter 1"); academyvoices.com already has "Frankenstein Audiobook: Every Version Compared" and audiobookfest ranks #1.
- **Dracula** (133, 16 top completions): driven by Audible's new full-cast "Bram Stoker's Dracula", an adaptation, so the answer is one product. Revisit as "is the new Dracula audiobook unabridged".
- **Sherlock Holmes** (152): a collection, not one book; demand is Stephen Fry and Benedict Cumberbatch products.
- **Wuthering Heights** (151, 4 top completions): no translation layer; queue after Pride and Prejudice.
- **The Iliad** (143): the same crowded SERP as the Odyssey (whichodyssey, hearhomer cover both).
- **Anna Karenina, Brothers Karamazov, Don Quixote, Les Misérables** (72 to 83): below the yardstick. Good later posts on the same template; Karamazov and Don Quixote have welovetranslations pages too.
- **Emma, Jane Austen**: ambiguous names (Emma Thompson, author queries).
- **Moby-Dick**: Google suppresses its phrasings, so demand can't be measured with this method.
- **Platform: "drm free audiobooks"** (13 phrasings, rel 1250 on "drm free" alone): a definition query with generic demand; near `how-to-listen-to-audiobooks-for-free`. **"audiobook player for pc"** (8 phrasings): device intent, HushBook Windows fit, small. **"best audiobook narrators"** (25 phrasings): no HushBook fit. **"best classic books on audio"** (16): covered by `how-to-read-classics-without-getting-bored`. **Learn Italian** (5 and 12 phrasings in two families): unchanged since 11-10, language posts get little traffic. **Can Apple Books read to you**: not re-measured; 11-10 numbers stand (85 Google phrasings, Apple pages and TTS vendors in the SERP).

## Next in the book queue

1. The Odyssey (if the owner accepts a crowded SERP for the biggest demand), 2. Pride and Prejudice (check the SERP first), 3. War and Peace (link from and to the characters post), 4. Wuthering Heights, 5. The Brothers Karamazov. The same 43-call method and `analyze2.mjs` make each comparable with today's table.
