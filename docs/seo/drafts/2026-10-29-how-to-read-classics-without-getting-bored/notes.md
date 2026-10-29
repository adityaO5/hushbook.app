# Notes: "How to Read Classics Without Getting Bored: Why They Feel Hard and Where to Start"

Draft prepared 2026-10-29, built and tested locally. Not committed, pushed, deployed or pinged: the owner approves those separately. Slug: `how-to-read-classics-without-getting-bored`. Body: about 1,880 words before "What the research does not show" and 1,990 before the source list (9 min read). The build's `wordCount` (which includes the source list) is 2,304. Topic is backlog pick #4 of `docs/seo/keyword-research-2026-10-27.md`; not re-picked.

## Why this topic

### Search Console signal (`sc-domain:hushbook.app`, pulled 2026-10-29 via the API; data ends 2026-10-26)
- 90 days (2026-07-31 to 2026-10-28) and 16 months (2025-06-29 to 2026-10-28), `query` + `page`, query matching `classic|bored|boring|literature|war and peace|shakespeare|dickens|austen|tolstoy|19th|victorian|old books|public domain|gutenberg|hard to read`: **1 row in both windows**, "public domain audiobooks" 1 impression @ 30 on `/blog/how-to-listen-to-audiobooks-for-free`.
- 16 months, query matching `librivox|how to read|novel|old english|archaic|pride and prejudice|moby|great books|canon|difficult book|hard book|get into reading|finish a book|attention span`: 10 rows, none on topic. "how to read along ..." rows land on the Audible post (7 to 20 impressions each, positions 9.2 to 10.3); "is librivox safe" 3 @ 8.3 and "is librivox legit" 1 @ 11 on the LibriVox post; "librivox alternative" 4 @ 29 on `/alternatives`.
- So, as the backlog said, no existing impressions for the classics cluster. Demand evidence comes from autocomplete.

### Google autocomplete (curl, `client=firefox&hl=en`, gl=us and gl=gb, 2026-10-29, 18 seeds)
Raw output kept in the session scratchpad (`ac/ac_raw.txt`), not in the repo. US and GB lists were the same apart from order.
- "how to read classics": **...without getting bored** (3rd), ...reddit, ...book, **...for free**, how to read classic literature, how to read classic books effectively, how to read classic novels
- "how to read classic books": ...effectively, ...for free, ...reddit, **how to read hard classic books**, how to start reading classic books, how to start reading classic literature
- "why are classics hard to read": why are classics so hard to read (reddit), **what makes classics hard to read**, why is classic literature hard to read, why reading classics is important
- "why are classics so boring": why are classic books so boring, why are classic novels so boring, most boring classics, most hated classic books
- "easiest classics to read": **...for beginners**, ...reddit, ...and understand, easy classics to read (for beginners), easier classics to read
- "classics better as audiobooks": best classics as audiobooks, **classics that are better as audiobooks**, classic books to listen to on audible, classics to listen to on audible
- "classic books to listen to": ...on audible, ...on audiobook, ...on spotify
- "classic audiobooks": **...free**, ...for kids, ...on spotify, ...for road trips, ...on youtube, ...on libby, ...to fall asleep to
- "how to get into classic literature": how to get into classic books, books to get into classic literature, classic literature for beginners
- "how to understand classic literature": ...better, how to understand classic books, how to read and understand classic literature
- "how to enjoy classic literature": how to enjoy classic books, how to understand classic literature
- "how to start reading classics": ...reddit, ...classic literature, ...classic novels, ...greek classics
- "are classics worth reading": ...reddit
- "how to read war and peace": ...reddit, ...in a year, ...in a month, how long to read war and peace (hours). Owned by `how-to-keep-track-of-characters-in-a-book` (War and Peace H2); linked, not repeated.
- "how to read shakespeare": ...for beginners, ...plays, ...sonnets, ...out loud, ...language. Covered by one line ("Read hard passages aloud ... It suits plays"); a Shakespeare post would be its own topic.
- "how to read classics for free": falls straight into generic "how to read books for free on kindle / iphone ...".
- "best classics for beginners": only generic "best books for beginners" variants.

### Competing results (WebSearch, 2026-10-29; not Google's own index)
- **"how to read classics without getting bored"**: bookishelf, charlesreid1 wiki, Goodreads group thread, online-literature forum, bibliolifestyle, Miller's Book Review (Substack), Meaford Independent.
- **"why are classics hard to read"**: Literary Fancy (Substack, two posts), Iris Reading (two posts), Goodreads author blog, Mumsnet, a high school paper (lhsimprint), one SUNY thesis, Writing Forums.
- **"classics that are better as audiobooks"**: Literary Fancy, Modern Mrs Darcy, GeekDad/GeekMom (2016), Paste (2018), Audible UK blog, Book Riot.
- **"easiest classics to read for beginners"**: The Literary Lifestyle, Pan Macmillan, bibliolifestyle, a Substack, New Braunfels Public Library, Goodreads thread.
- **"how to get into classic literature"**: Johns Hopkins News-Letter, Mojza, Fiction Matters (Substack), Read & Co, The Classics List (Substack), Free Press Journal, Mumsnet.
- **"how to read classics for free"**: Lex (promotional), Thinking West (Substack), Bustle, MakeUseOf (two), Quartz.
- **Verdict: weak.** Blogs, Substack, forums and list posts. None cites a study on boredom, mind wandering or background knowledge, and none gives lengths or sentence counts.
- **Not checked:** the live Google SERP and People Also Ask (no browser this run; Playwright belongs to another agent). H2s use the backlog and autocomplete phrasing.

### Product fit
High. HushBook's built-in free catalogue is LibriVox and Internet Archive public domain audiobooks, which is mostly classics. The post's reader problems (long sentences, drifting attention, a big cast, needing a narrator) map to read-along, Sentence highlight, playback speed, chapters, sleep timer and the character map.

### Cannibalization check
- `does-reading-along-with-an-audiobook-help`: owns "does reading along help". The new post cites two of its studies (Adesope and Nesbit 2012; Varao Sousa et al. 2013) in one paragraph each, for the classics angle only, and links there "for the rest of that research".
- `is-librivox-safe-and-legal`: owns safety, legality, copyright outside the US, narration quality. The new post gives one line on the US 96-year rule and links there twice (narrator choice, outside the US).
- `free-read-along-audiobooks`: owns where free audiobooks come from and how to read along in HushBook. The new post's free section is four bullets and does not repeat its steps.
- `abridged-vs-unabridged-audiobooks`, `audiobook-listening-speed`: one-line checks with links.
- `how-to-keep-track-of-characters-in-a-book`: owns cast lists and War and Peace names. One tactic line links there.
- `how-long-is-an-audiobook`: owns lengths for ten classics. The new post reuses four of those LibriVox recordings (re-checked live) for its starter list and links there for the rest.
- `how-to-get-into-audiobooks` (unpublished draft): not linked, not touched.

## Sources and how each was verified

All pages opened on 2026-10-29. DOIs were checked live on `https://api.crossref.org/works/<doi>`; title, journal and year below are as Crossref returned them. Crossref holds no abstract for most of these, so each finding was read from the abstract on PubMed (efetch), OpenAlex (publisher-supplied abstract), ERIC or the open full text, as noted. LibriVox, Project Gutenberg and Libby pages were fetched with curl and read as stripped text.

| Claim in the post | Source | DOI / URL | How verified |
|---|---|---|---|
| Boredom comes from (a) mismatch between cognitive demands and available resources, both understimulation and overstimulation, and (b) mismatch between the activity and valued goals | Westgate and Wilson, "Boring thoughts and bored minds: The MAC model of boredom and cognitive engagement", Psychological Review, 2018 | 10.1037/rev0000097 | Crossref ✓; PubMed 29963873 abstract ✓ |
| Easy or difficult versions of eight passages; mind wandering more frequent on difficult texts; more negative effect on comprehension for difficult texts | Feng, D'Mello and Graesser, "Mind wandering while reading easy and difficult texts", Psychonomic Bulletin & Review, 2013 | 10.3758/s13423-012-0367-y | Crossref ✓; PubMed 23288660 abstract ✓ |
| 64 junior high students; account of a half inning of a baseball game; main effect of prior knowledge on all measures; no interaction with reading ability | Recht and Leslie, "Effect of prior knowledge on good and poor readers' memory of text", Journal of Educational Psychology, 1988 | 10.1037/0022-0663.80.1.16 | Crossref ✓; ERIC EJ384774 (api.ies.ed.gov) ✓; OpenAlex abstract ✓ (baseball detail) |
| Detective novella; zoning out "had the greatest influence when they occurred early in the narrative" | Smallwood, McSpadden and Schooler, "When attention matters: The curious incident of the wandering mind", Memory & Cognition, 2008 | 10.3758/MC.36.6.1144 | Crossref ✓; PubMed 18927032 abstract ✓ |
| Reading aloud least mind wandering; listening most mind wandering, poorest memory, least interest; 211 students (235 recruited, 24 dropped) | Varao Sousa, Carriere and Smilek, "The way we encounter reading material influences how frequently we mind wander", Frontiers in Psychology, 2013 | 10.3389/fpsyg.2013.00892 | Crossref ✓; abstract (Semantic Scholar) ✓; Methods section of the open full text on frontiersin.org ✓ |
| 57 studies, mostly postsecondary; spoken plus written beat spoken only; advantage for low prior knowledge learners and system-paced material | Adesope and Nesbit, "Verbal redundancy in multimedia learning environments: A meta-analysis", Journal of Educational Psychology, 2012 (Crossref print year; OpenAlex lists 2011 online) | 10.1037/a0026147 | Crossref ✓; OpenAlex abstract ✓ |
| *A Tale of Two Cities* opens with a 119-word sentence; *Moby-Dick* about 24 words a sentence, longest about 470 (469 by our count) in chapter 42 "The Whiteness of the Whale"; *Gatsby* about 14; *Pride and Prejudice* about 21; *A Christmas Carol* 16; *Sherlock Holmes* 16; *Call of the Wild* 19; *Jekyll and Hyde* 23; *Frankenstein* 23 | Project Gutenberg plain texts #98, #2701, #64317, #1342, #46, #1661, #215, #43, #84 | gutenberg.org/cache/epub/<id>/pg<id>.txt | Our own count, method below ✓ |
| "entailed, in default of heirs male, on a distant relation" | Project Gutenberg #1342, *Pride and Prejudice*, ch. 7 | gutenberg.org/ebooks/1342 | Text search ✓ (source has a curly apostrophe; post uses straight) |
| Five staves in *A Christmas Carol*; twelve stories in *The Adventures of Sherlock Holmes*; Klondike setting of *The Call of the Wild* | Project Gutenberg #46, #1661, #215 | as above | Text search ✓ ("STAVE I" to "STAVE V"; contents I to XII; "Klondike strike") |
| Running times and readers: Christmas Carol 2:43:45 Glen Hallstrom; Sherlock Holmes 13:29:27 Ruth Golding; Call of the Wild 3:34:06 Tom Crawford; Jekyll and Hyde 3:11:54 Bob Neufeld; Gatsby 05:38:03 Kara Shallenberg; Frankenstein 7:26:03 Caden Vaughn Clegg; Pride and Prejudice 13:25:01 Annie Coleman Rothenberg; Moby Dick 24:37:50 Stewart Wills | LibriVox catalog pages | librivox.org/a-christmas-carol-by-charles-dickens-2/ and the seven pages in the source list | curl ✓ |
| War and Peace, Maude translation, four volumes: 14:34:37 + 16:08:33 + 17:00:19 + 14:43:44 = 62 h 27 min, all Mark Nelson | LibriVox catalog pages, volumes 1 to 4 | librivox.org/war-and-peace-volume-<n>-maude-translation-by-leo-tolstoy/ | curl ✓, summed by us; matches `how-long-is-an-audiobook` |
| 21,866 cataloged works, 49 languages | LibriVox homepage statistics | librivox.org | curl ✓ |
| "Works published 96 years ago or earlier"; "every translation has independent copyright protection"; Kafka *Metamorphosis* 1916 original public domain in the US, David Wyllie 2002 translation still under copyright | LibriVox Wiki, "Copyright and Public Domain" | wiki.librivox.org/index.php/Copyright_and_Public_Domain | curl ✓ |
| "an online library of more than 75,000 free eBooks" | Project Gutenberg, About | gutenberg.org/about/ | curl ✓ |
| "All you need is a library card." | Libby Help 6103, "Getting started with Libby" | help.libbyapp.com/en-us/6103.htm | curl ✓ |
| 1x to 1.25x for literary fiction | Our own post `audiobook-listening-speed` | /blog/audiobook-listening-speed | Read in repo ✓ |

### Our own count (sentence lengths)
- Texts: Project Gutenberg plain text (`pg<id>.txt`), header and footer removed at the `*** START OF` and `*** END OF` markers, then cut to start at the first line of the story (for example "Call me Ishmael", "It was the best of times", "In my younger and more vulnerable years"), so prefaces, contents pages and Melville's etymology and extracts are out.
- Short heading lines (CHAPTER, STAVE, LETTER, roman numerals) were dropped. Abbreviations such as Mr., Mrs., Dr., St. and single initials were protected. A sentence ends at `.`, `!` or `?` (plus any closing quote) followed by whitespace and a capital letter or digit, or at a blank line.
- Results (mean words per sentence): Gatsby 14.4, Christmas Carol 16.2, Sherlock Holmes 15.8, Call of the Wild 19.0, Pride and Prejudice 20.9, Frankenstein 22.6, Jekyll and Hyde 23.1, Moby-Dick 24.4. First sentence of A Tale of Two Cities: 119 words. Longest Moby-Dick sentence: 469 words (chapter 42). Also counted, not used: Tale of Two Cities 18.1, Treasure Island 18.9, Dracula 18.2, Dorian Gray 12.6, Jane Eyre 19.8, Great Expectations 19.8, Anne of Green Gables 15.3, Monte Cristo 18.4.
- Word totals agree with the counts in `how-long-is-an-audiobook` within 0.2% (Christmas Carol 28,478 vs 28,431; Gatsby 48,410 vs 48,032; Frankenstein 75,041 vs 74,936). Pride and Prejudice differs more (117,830 vs 121,676), probably a different start or end point; no word totals are published in this post.
- Script and texts are in the session scratchpad (`scripts/sentlen.py`, `gut/`), not in the repo.

### Considered, not cited
- Patall, Cooper and Robinson (2008), choice and intrinsic motivation, Psychological Bulletin, 10.1037/0033-2909.134.2.270 (Crossref ✓, PubMed 18298272 ✓). Not reading-specific; the MAC model's meaning component already carries "pick a book you want". Cut to keep the study list short.
- Eastwood, Frischen, Fenske and Smilek (2012), "The Unengaged Mind", Perspectives on Psychological Science, 10.1177/1745691612456044 (Crossref ✓ with abstract). Overlaps with Westgate and Wilson.
- Clinton-Lisell (2023) and the other reading-while-listening studies in `does-reading-along-with-an-audiobook-help`: left to that post.

### Claims left out
| Claim | Why left out |
|---|---|
| "Spoilers make stories more enjoyable, so read a summary first" (Leavitt and Christenfeld 2011, Psychological Science, 10.1177/0956797611417007) | DOI ✓ on Crossref, but the results are only in press write-ups (EurekAlert, Psychology Today); SAGE returned 403 and PubMed and OpenAlex have no results text. A later study (Johnson and Rosenbaum 2015, Communication Research, 10.1177/0093650214564051, N = 412, Crossref abstract ✓) found unspoiled stories more fun, suspenseful, moving and enjoyable. Evidence mixed; the post only says introductions may discuss the ending. |
| "Middle English needs annotations; Shakespearean English uses dense figurative language" (Iris Reading) | Blog source only. |
| Classic sentence length has fallen over time (Sherman 1893 and later corpus studies) | No DOI-verified source found this run; the post uses our own counts instead and makes no claim about a historical trend. |
| Named narrators of paid classics (Rosamund Pike, Juliet Stevenson, Simon Vance) as "the best" | Opinion from list posts; not needed. |
| Serial Reader app sends classics in 20-minute daily chunks | Only in a MakeUseOf summary; not opened. |
| Penguin Classics or Oxford World's Classics editions have the best notes | Blog opinion; the post says "the edition's introduction" without naming publishers. |
| *Animal Farm*, *Of Mice and Men*, *To Kill a Mockingbird* as easy classics | Common in the SERP lists, but not public domain in the US and not on LibriVox, so they don't fit a free starter list. |
| HushBook Dictionary for old words | `dictionaryTitle` and `proTourDictionary*` are a HushBook Pro feature opened from the Library; left out to keep the product section on the free core. |

## Product claims (`D:\hushbook\lib\l10n\app_en.arb`, app code, live site)
- Live site (hushbook.app, fetched 2026-10-29): "Thousands of classics, free"; "A built-in catalogue of public-domain audiobooks from LibriVox and the Internet Archive, in six languages. Download one and the transcription starts on its own, you're reading along in minutes." (the site uses a dash there; the post rewords it); "Every word lights up with the narrator. Tap any word to jump there."; "Transcribed on your phone. Never the cloud."; "Free to download, Zero Ads."; "No account, no sign-in."; "The core read-along experience and the public-domain library are free."
- `discoverTitle` "Discover"; `discoverSubtitle` "Free audiobooks from LibriVox and Internet Archive."; `discoverSearchHint` "Search both libraries"; `discoverDownloadFree` "Download for Free". The Discover name and strings arrived 2026-10-19 (`f16e48e`), and the 1.3.4 release commit (`2c4ca14`, 2026-10-24) and later builds include them. Not used: the Discover genre strip and the "Under an hour" row and "How long?" filter (`cf7b04e`, 2026-10-20), left out in case some readers are on an older build.
- `providerLibriVoxContentType` "Classic literature, fiction & non-fiction"; `providerLibriVoxCatalogSize` "~20,000 titles" (not used; the post gives LibriVox's own live count instead).
- `sentenceHighlight` "Sentence highlight" / `sentenceHighlightHelper` "Highlight the whole sentence as it is narrated." Toggle in `lyrics_appearance_sheet.dart` (`highlight-sentence-toggle`), applied in `synced_lyrics_view.dart`; no Pro gate. Strings added 2026-09-10 (`cf5687a`).
- Playback speed: `playbackSpeedTitle`; `playback_speed_sheet.dart` "0.05x steps ... within 0.5x to 3x".
- `chapters` "Chapters" (`chapter_list_sheet.dart`, player controls); `sleepTimerEndOfChapter` "End of current chapter" (`sleep_timer_sheet.dart`).
- Character map: `characters` "Characters" tab, `characterMapTitle`, `characterFirstHeard` "First heard", `characterFirstHeardLabel` "Ch. {chapter} · {time}" (set when a character is added during playback, per the characters post).
- **Not claimed:** Dictionary (Pro), saved quotes, notes, streaks, Discover rows and filters, e-book sync.

## HushBook placement (bright side only)
- Intro, second paragraph, where the pain is first stated: "If you'd like a voice to carry you through those sentences, **[HushBook](/)** has *thousands of free classics* built in and **highlights each word as the narrator reads it**."
- "How to read classics for free": one bullet (Discover, free download, reading along in minutes).
- Closing section "Read free classics word by word": catalogue, on-phone transcription, Sentence highlight, speed, chapters and sleep timer, character map, free with no ads and no account.
- Every body mention is bold, with one or two benefit phrases in bold or italics. No HushBook limitation is stated. Limits of the research stay in "What the research does not show".
- `hero: 'read-along-card'` (existing embed; its demo text is a Sherlock Holmes passage), the only animation in the post, above the takeaways.
- `cta`: "Free classics, every word lit up".

## Checks run
- H1 equals `title` ✓ (the build throws otherwise)
- metaTitle 42 characters (53 with " | HushBook", so it renders with the suffix); metaDescription 145 ≤ 160; description 197 ≤ 240 ✓
- 9 keywords, 5 takeaways, 5 FAQs; every takeaway and FAQ fact is stated in the body ✓
- No en or em dashes in the post, registry entry, llms.txt line, draft files, the two edited posts or the rendered HTML (`LC_ALL=C.UTF-8 grep -P '[\x{2013}\x{2014}]'`) ✓
- Internal links in the body: `how-to-keep-track-of-characters-in-a-book`, `how-long-is-an-audiobook`, `does-reading-along-with-an-audiobook-help`, `is-librivox-safe-and-legal` (twice), `abridged-vs-unabridged-audiobooks`, `audiobook-listening-speed`, home ✓. 2 new contextual links into the post ✓
- Rendered HTML: canonical `https://hushbook.app/blog/how-to-read-classics-without-getting-bored`; BlogPosting + FAQPage (5 questions) + BreadcrumbList, all JSON-LD parses; read-along card iframe directly above the Key takeaways box; all internal hrefs resolve to files in the repo; no markdown leaks; every HushBook mention in the prose is inside `<strong>` ✓
- sitemap.xml: only the new URL and `/blog` lastmod (2026-10-28 to 2026-10-29) changed, after restoring five restamped lines (see wiring.md) ✓
- Tests: 7 pass; `seo-preservation` (ar/index.html protected region hash) and `seo-repair-contract` (body baseline routeCount 86 !== 26) fail on the old baseline, on files this change does not touch ✓

## After publishing
1. IndexNow ping for the new post, `/blog`, `/blog/is-librivox-safe-and-legal` and `/blog/free-read-along-audiobooks`.
2. Request indexing in Search Console for `https://hushbook.app/blog/how-to-read-classics-without-getting-bored`.
3. Check People Also Ask for "how to read classics" and "why are classics hard to read" in a browser, and align FAQ wording if needed.
4. Once readers are on 1.3.4 or later, consider one line on Discover's "Under an hour" row and length filter in the "Start short" tactic.
