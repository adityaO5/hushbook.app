# Notes: "How to Keep Track of Characters in a Book or Audiobook"

Draft prepared 2026-10-27. Content only: not built, committed, pushed, deployed or pinged. Slug: `how-to-keep-track-of-characters-in-a-book`. Body: 2,189 words before the source list (9 min read); 2,388 with sources. The animated phone demo, embed support and dev server are being built in parallel by the owner; this draft only places the `[[embed:character-map]]` line.

Files touched:
- `content/blog/how-to-keep-track-of-characters-in-a-book.md` (new)
- `data/blog-posts.js` (new entry at the top, above `can-libby-read-to-you`)
- `llms.txt` (new line directly above the Libby line, `\r\n` like its neighbours)

## Why this topic

From `docs/seo/keyword-research-2026-10-27.md`, ranked candidate #1 and Top 5 pick 1:

- **Demand proxy:** "how to keep track of characters in a book" is the first autocomplete suggestion for its own seed. 21 phrases in the cluster, including "...when reading a book", "...in a novel", "...in war and peace", "...game of thrones characters", "...wheel of time characters", "app to keep track of book characters", "how to remember characters in a book". The keyword file notes the seed count is inflated by alphabet expansions; phrase count and first place are the fair signal.
- **Search Console:** no signal (no page on the site mentions character tracking).
- **SERP (WebSearch, not Google's index):** weak. Goodreads threads, a Sonlight blog post, a 2016 Duke TIP book-club PDF (character grid), a Post-it ideas page, Blogspot, Substack, and app listings (BookLinker, InDelve, Chapterly, Bookopedia). Nobody covers the listening case.
- **Fit:** high. HushBook ships a character map (add characters, typed relationships, share the cast as text) and read-along text that shows how a spoken name is spelled.
- **Cannibalization:** none. Closest lines elsewhere: `does-reading-along-with-an-audiobook-help` ("Readers who want the names"), `how-to-focus-on-audiobooks` ("forty named characters", first chapters), `does-listening-to-audiobooks-count-as-reading` ("catch a character's name"). All are single sentences.
- **Watch item from the keyword file:** keep it reader-side. Writer and D&D variants ("when writing a book", "too many characters") are left out.
- **People Also Ask:** not collected (the keyword run had no browser). H2s use autocomplete wording. Check PAA in a browser after publishing and align one or two FAQs.

### H2s against the suggested list

| Suggested in keyword file | Used |
|---|---|
| How do you keep track of characters in a book? | Same |
| How to keep track of characters when reading a book | Same |
| Why is it harder to keep track of characters in an audiobook? | Same |
| Is there an app to keep track of book characters? | Same (holds the embed) |
| How to keep track of characters in War and Peace | Same |
| How to keep track of Game of Thrones and Wheel of Time characters | "How to keep track of characters in Game of Thrones and other long series" (both series named in the first line; no series-specific facts, see "left out") |
| FAQ: How do you remember characters in a book? | Promoted to an H2 and kept as an FAQ |
| (brief: honest limits) | "Honest limits" |

## Embed placement

`[[embed:character-map]]` sits on its own line, with blank lines around it, in "Is there an app to keep track of book characters?", directly after the paragraph that walks through the demo in order: tap +, "Who did you just meet?", name and hand-drawn ink face, Shuffle look, Hero of the story, the node drops onto a dotted map, link two characters with a tie such as "Mentor of", the ink line draws with the tie written on it, the "Meet" card with Share and Add another. The bullets after the embed carry the details the demo cannot show (first heard, the tie list, Cast search, share formats, read-along text).

The first HushBook mention is in the second intro paragraph, where the listener's problem is first stated (one sentence, no CTA language). HushBook then returns in the app H2, one bullet in the long-series H2 (Secret and Not sure ties), Honest limits and the CTA.

An in-memory dry run of `scripts/build-blog.js` (file writes intercepted, nothing written to disk) rendered the post with the parallel embed support: the `<figure>` with the `/demos/character-map` iframe lands right after that paragraph. No markdown leaks, no en or em dashes in the rendered page.

## Sources and how each was verified

All seven DOIs were checked on `https://api.crossref.org/works/<doi>` on 2026-10-27: title, authors, year, journal, volume and pages matched. Abstracts were read through OpenAlex (`abstract_inverted_index`) or PubMed. Sample sizes appear in the post only where read in the abstract or full text. Amazon and Project Gutenberg pages were fetched with curl and read as stripped text. Quotes are verbatim, with straight quotes where the source has curly ones.

| Claim in the post | Source | URL / DOI | How verified | Status |
|---|---|---|---|---|
| Situation models are "integrated mental representations of a described state of affairs" | Zwaan and Radvansky (1998), Psychological Bulletin 123(2) 162 to 185 | 10.1037/0033-2909.123.2.162 | Crossref ✓, abstract (OpenAlex) ✓, quote verbatim | Used |
| Readers connect story events along five dimensions: time, space, protagonist, causality and intentionality | Zwaan, Langston and Graesser (1995), Psychological Science 6(5) 292 to 297 | 10.1111/j.1467-9280.1995.tb00513.x | Crossref ✓, abstract ✓. "(what characters are trying to do)" and "meaning who is involved" are our glosses | Used |
| 2 experiments; reading slowed on sentences where a main character's action contradicted an earlier description, with local coherence intact | Albrecht and O'Brien (1993), JEP: Learning, Memory, and Cognition 19(5) 1061 to 1070 | 10.1037/0278-7393.19.5.1061 | Crossref ✓, abstract ✓. No sample size in the abstract, so none given | Used |
| Masking words after the eyes pass them (no rereading) hurt comprehension; regressions "contribute to the ability to understand what one has read" | Schotter, Tran and Rayner (2014), Psychological Science 25(6) 1218 to 1226 | 10.1177/0956797614531148 | Crossref ✓, abstract ✓, quote verbatim. The keyword brief named "Tung" as second author; Crossref says Tran. No sample size given. "Audio works much like the masked condition" is our analogy, flagged in Honest limits | Used |
| 211 students read aloud, read silently and listened; listening gave the most mind wandering and the worst memory | Varao Sousa, Carriere and Smilek (2013), Frontiers in Psychology 4:892 | 10.3389/fpsyg.2013.00892 | Crossref ✓ (Crossref has no abstract; OpenAlex ✓). Full text read via Europe PMC (PMC3842750): 235 recruited, 24 dropped, 211 analysed | Used |
| Generation effect: 86 studies, 445 effect sizes, average .40, "almost half a standard deviation" | Bertsch, Pesta, Wiscott and McDaniel (2007), Memory & Cognition 35(2) 201 to 210 | 10.3758/BF03193441 | Crossref ✓, abstract via PubMed (PMID 17645161) ✓, quote verbatim | Used |
| Drawing effect: 7 free-recall experiments; drawn words recalled better than written | Wammes, Meade and Fernandes (2016), QJEP 69(9) 1752 to 1776 | 10.1080/17470218.2015.1094494 | Crossref ✓, abstract ✓ | Used |
| X-Ray lets readers "learn more about a character, topic, event, place, or any other term, simply by pressing and holding on the word or phrase"; "X-Ray is only available for eBooks published in English"; hiding terms "that may provide spoilers or give away key plot points or character development" | KDP Help, "X-Ray for Authors" | kdp.amazon.com/en_US/help/topic/G202187230 | Fetched ✓ (curl). The spoiler sentence is advice to authors; "so an entry can tell you more than you have read" is our inference | Used |
| Entries created "using a range of publicly available sources, machine learning, and manual review" when the author provides none | KDP Help, "X-Ray for Authors: Tips and Tricks" | kdp.amazon.com/en_US/help/topic/G202197430 | Fetched ✓ | Used |
| Hamlet's Dramatis Personae: "CLAUDIUS, King of Denmark, Hamlet's uncle", "LAERTES, Son to Polonius", "OPHELIA, Daughter to Polonius" | Project Gutenberg eBook #1524 | gutenberg.org/ebooks/1524 | Downloaded `pg1524.txt`, read lines 74 to 103 | Used |
| Pierre is "Monsieur Pierre" (16 times) at Anna Pavlovna's soiree, "Peter Kirílovich" (5) when Natasha calls to him, "Count Bezúkhov" (29), which in Book One names his dying father; Nicholas Rostov is "Nikólenka" (12) to his family; "little Nicholas" (28) is Prince Andrew's son | Project Gutenberg eBook #2600, War and Peace, tr. Louise and Aylmer Maude | gutenberg.org/ebooks/2600 | Downloaded `pg2600.txt`; counted forms and read the passages in context. Father: "illegitimate son of Count Bezúkhov ... who now lay dying in Moscow" (line 1148; Book Two starts at line 6632) | Used |
| Rostovs, Bolkonskis, Bezukhovs, Kuragins as the families to sort by | Same | Same | Counted "Rostóv" 965, "Bolkónski" 180, "Bezúkhov" 97, "Kurágin" 71 | Used |
| The Gutenberg War and Peace has no list of characters | Same | Same | Read the front matter (title page and contents to line 832); grep for "list of characters", "principal characters", "dramatis" returned nothing | Used |
| LibriVox Maude translation, four volumes, 62 hours 27 minutes | LibriVox API (`/api/feed/audiobooks/?title=^War and Peace`): vols 14:34:37, 16:08:33, 17:00:19, 14:43:44 | librivox.org/war-and-peace-volume-1-maude-translation-by-leo-tolstoy/ | API ✓, our sum. Matches `how-long-is-an-audiobook` | Used |

12 sources in the post's source list (7 papers, 2 Amazon pages, 2 Gutenberg texts, 1 LibriVox page).

### Claims checked but left out

- **Daneman and Carpenter (1980), working memory span and pronoun reference over distance** (10.1016/S0022-5371(80)90312-6). Crossref ✓, but no abstract in Crossref, OpenAlex or Semantic Scholar, and the paper is closed. Not read, so not cited. The post says "when the cast grows faster than you can file it" without a citation.
- **Game of Thrones appendix of houses / Wheel of Time glossary.** No publisher page or excerpt confirmed either. The post only says to check your edition for a cast list, family tree or appendix.
- **Point-of-view chapter structure in A Game of Thrones.** Not checked against a primary source. The post says "in books that switch narrators chapter by chapter" without naming the series.
- **How many characters War and Peace has** (figures of 500+ circulate). No primary count found. Left out.
- **Print translations of War and Peace with a list of principal characters** (for example Pevear and Volokhonsky). Not confirmed from a publisher page. The post says "if your print edition has one".
- **Kindle X-Ray device list and Kindle app support.** The KDP page lists older devices only and says nothing about apps. Left out; the post says "Kindle books that have it".
- **Mind-wandering rates (0.51 listening vs 0.36 silent reading)** used in the retain post. Not found in the parts of the full text searched this run, so not repeated.
- **Third-party character-tracking apps** in the SERP (BookLinker, InDelve, Chapterly, Bookopedia). Features not checked, so not named.
- **HushBook's own War and Peace in Discover.** The LibriVox provider searches the Internet Archive's LibriVox collection (`lib/core/store/librivox_provider.dart`), and LibriVox has the recordings, but the app search was not run. The post links to LibriVox and does not say "find it in HushBook".

## Product claims (all from `D:\hushbook\lib`)

The character map revamp is on `main` and in `release/1.3.4-65` (tray commit `ec8221b`, 2026-10-14; Meet card `9bee2f5`). Checked against the spec `docs/superpowers/specs/2026-10-13-character-map-revamp-design.md`.

| Claim in the post | Backing |
|---|---|
| Character map on each book's Characters tab | `lib/features/library/book_detail_screen.dart` `_InBookTabBar._tabs` (Chapters, Characters, Insights, Notes) → `CharacterAtlasSection`; `characterMapTitle`, `characterOpenMap` |
| Free, not part of Pro | No `entitlement`/`isPro`/paywall reference anywhere in `lib/features/characters/` or the book detail Characters tab; Pro lists (`proWelcomeRow*`, `proTour*`) do not mention it. `canvas/canvas_skin.dart`: `enum CanvasSkin { ink }`, no skin picker, so the spec's Pro skins are not shipped and not mentioned |
| Tap +, tray asks "Who did you just meet?" | FAB `character_graph_canvas.dart` ~954; `characterTrayTitle`, `characterTrayPrompt` (used in `presentation/sheets/character_tray.dart`) |
| Hand-drawn ink face from the name; Shuffle look | `AvatarSpec.seeded(name, …)` in `character_tray.dart`; Open Peeps SVG parts in `assets/characters/peeps/`; `characterTrayReroll` |
| Hero of the story switch | `characterTrayHeroToggle` (`character_tray.dart`) |
| Drop onto a dotted map | `paper_dot_backdrop.dart`; node entrance in `character_graph_canvas.dart` |
| Link two characters, pick a tie, ink line draws with the tie written on it | `characterLinkTo` (`character_node_actions.dart`), `characterLinkHint`, `characterTieHint` (`canvas/tie_sheet.dart`); draw-on `progress` in `canvas/edge_painter.dart`; edge pills `edge-pill-…` in `character_graph_canvas.dart` ~1090 |
| Tie list: Good friends, Family, Siblings, Rivals, Allies, Sweethearts, Mentor of, Parent of, Employer of, Protects, Secret, Not sure, or your own; Mentor of reads as Student of from the other side | `data/character_relationship_preset.dart` (`characterRelationshipPresets`, `localizedRelationshipLabel`); `relationshipGoodFriends`, `relationshipFamily`, `relationshipSiblings`, `relationshipRivals`, `relationshipAllies`, `relationshipSweethearts`, `relationshipMentorOf`/`relationshipStudentOf`, `relationshipParentOf`, `relationshipEmployerOf`, `relationshipProtects`, `relationshipSecret`, `relationshipUnsure`, `characterCustomTie` |
| "Meet" card with Share and Add another | `characterMeet` ("Meet {name}"), `characterMeetShare`, `characterMeetAddAnother` (`presentation/widgets/meet_card.dart`) |
| First heard recorded as chapter and time, e.g. "Ch. 3 · 1:12:40", only when that book is playing | `characterFirstHeardLabel` ("Ch. {chapter} · {time}"); `_captureFirstHeard()` in `character_tray.dart` returns null unless `nowPlayingProvider.bookId` is this book; `data/first_heard.dart` `formatClock` gives h:mm:ss |
| Cast list with a search box at eight or more | `characterCastCount` ("Cast · {count}"), `characterSearchCast`; `canvas/cast_sheet.dart` `if (all.length >= 8)` |
| Share the map as an image or the cast summary as text: names, roles and relationships | `shareMapImage`, `shareCastSummary`, `shareCastSummarySubtitle` ("Names, roles, and relationships as text") in `presentation/sheets/character_graph_share_sheet.dart`; `data/character_share_formatter.dart` |
| Transcribes on your phone; highlights each word as the narrator reads | `longAudiobookDescription` ("runs entirely on your device"), `notificationTranscriptReadyBody` ("word-by-word highlighting"), `engagementRaiseReadAlong` ("follow the highlighted words as the narrator reads") |
| You add each character yourself (no automatic detection) | No suggestion or name-detection code in `lib/features/characters/`. `characterEmptyDescription` ("Transcript suggestions become available after transcription.") exists in the arb but is referenced by no Dart file. The spec lists transcript suggestions under "Later (not in v1)" |
| Free LibriVox audiobooks or imported files such as MP3 or M4B | `providerLibriVoxTagline` ("Free public domain audiobooks"), `librarySupportedAudioFormats` ("MP3, M4B, AAC, OGG, FLAC, WAV") |
| Speech recognition can get an unusual name wrong | `engineDescription` (transcription accuracy varies by engine) |

Not claimed: automatic character detection, Pro canvas skins, no ads, no account, offline use, the drag-the-plus gesture, the mini-map card, blinking avatars.

## Checks run

- H1 equals `title` ✓
- `metaTitle` 54 characters (65 with " | HushBook", so it renders without the suffix, like the Libby post); `metaDescription` 142 ≤ 160; `description` 208 ≤ 240 ✓
- 8 keywords, 5 takeaways, 6 FAQs; every takeaway and FAQ fact is stated in the body ✓
- No en or em dashes in the post, registry entry, llms.txt line or these notes ✓
- Internal links (7, six posts plus home): `/`, `how-to-focus-on-audiobooks`, `audiobook-listening-speed`, `does-reading-along-with-an-audiobook-help`, `how-to-retain-information-from-audiobooks`, `is-librivox-safe-and-legal`, `how-long-is-an-audiobook` ✓
- In-memory render via `build-blog.js` with writes intercepted: no markdown leaks, embed `<figure>` in place ✓. `blog/` untouched.
- `sitemap.xml` shows as modified in `git status`, with a timestamp of 12:31 today, before this draft. Not from this work.

## Not done (owner)

- `npm run build:blog`, tests, commit, deploy.
- Contextual links into the new post from existing posts (candidates: `how-to-focus-on-audiobooks` "forty named characters" line; `does-reading-along-with-an-audiobook-help` "Readers who want the names" bullet; `how-long-is-an-audiobook` War and Peace line).
- After deploy: IndexNow ping for the post and `/blog`, Request indexing in Search Console, check People Also Ask for "how to keep track of characters in a book".
