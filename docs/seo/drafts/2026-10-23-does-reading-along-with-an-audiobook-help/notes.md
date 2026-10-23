# Notes: "Does Reading Along With an Audiobook Help? What the Research Says"

Draft prepared 2026-10-23. Applied locally (built and tested) but not committed, pushed, deployed or pinged. Slug: `does-reading-along-with-an-audiobook-help`. Body: about 2,030 words before the source list (9 min read). The build's `wordCount` (which includes the source list) is 2,409.

## Why this topic

### Search Console signal (`sc-domain:hushbook.app`, pulled 2026-10-23 via the API)
- 90 days (2026-07-25 to 2026-10-22), 335 query rows. No query cluster has a large impression count without a page. The weekly plan from 2026-10-22 found the same.
- The reading-along-is-it-worth-it cluster is starting to appear, landing on the wrong page: "reading along with an audiobook" (1 impression, position 11) and "can you listen to an audiobook and read at the same time" (1, position 11) both went to `/blog/can-you-read-along-with-audible`, which is about Audible's feature. `"reading while listening" "meta-analysis"` (1, position 5) went to the count-as-reading post. "audiobook vs reading study" (8, position 1.0) shows Google already trusts the blog for research-style reading-vs-listening queries.
- So the evidence for the topic is autocomplete plus a weak SERP (below). Search Console only shows that the site has no page that matches this intent yet.

### Google autocomplete (curl, `client=firefox&hl=en&gl=us`, 2026-10-23)
- "is reading along with an audiobook": **bad**, **good**, does reading along with an audiobook **help**, is reading with an audiobook bad / better, does reading along with an audiobook count as reading, can you read and listen to audiobooks at the same time
- "listening to audiobook while reading": …reddit, …the book, …along, …the same book, reading physical book while listening to audiobook, **is listening to audiobook while reading good**, **does listening to audiobooks while reading help**
- "reading along with audiobook": reading along with audiobooks **benefits**, …reddit, do you read along with audiobooks
- "reading and listening at the same time": **does reading and listening at the same time help**, adhd reading and listening at the same time
- "benefits of reading while listening": benefits of reading while listening to audiobook, benefits of reading and listening at the same time
- "immersion reading benefits" exists too. Deliberately not targeted, to protect `/blog/what-is-immersive-reading` (see cannibalization below).

### Live Google SERP and People Also Ask (Playwright browser, google.com, hl=en, gl=us, 2026-10-23)
- **"does reading along with an audiobook help"**: Reddit r/audiobooks, Quora (10 years old), Rockford's Rock Opera (children's audio vendor), margaretfeinberg.com, a Facebook group, Medium (6 years old), Harvard Gazette (Mar 2026, about whether audiobooks count as reading), a vlogbrothers video, Las Vegas Review-Journal (sponsored-style piece for Vox Books). No page answers the question with studies.
- **"is reading along with an audiobook bad"**: Reddit, Quora, Harvard Gazette, NPR/vlogbrothers videos, Facebook groups, Medium, margaretfeinberg.com, Review-Journal.
- **"reading along with audiobooks benefits"**: AI Overview present (cites MSU Health Care, Psychology Today, an Instagram post). Results: Reddit, Harvard Gazette, Libro.fm blog, margaretfeinberg.com, MSU Health Care, Rockford's Rock Opera, Review-Journal.
- **"does reading and listening at the same time help"**: Reddit, Medium, LingQ forum, Audible newsroom, Quora, fabuly.io (vendor), Speechify blog (vendor), Time.
- **Verdict:** a weak SERP dominated by forums and vendors. A post with named studies, sample sizes and an honest "when it gets in the way" section can compete.
- **People Also Ask seen:** "Does reading along with an audiobook count as reading?", "What is it called when you read along with an audiobook?", "Does listening to audiobooks help you read better?", "Do people with ADHD do better with audiobooks?", "Is it okay to read a book while listening to an audiobook?", "Can I read along with an audio book?", "Are audiobooks good or bad for your brain?", "Is it better for your brain to read or listen to audiobooks?", "What are the downsides of audiobooks?". The FAQs use the first, second, third and fifth verbatim. ADHD is left to the ADHD post. The brain questions are left to the count-as-reading post.
- **Related searches:** "does reading along with an audiobook help for adults", "is reading along with an audiobook good", "is reading along with an audiobook bad for you / for your brain", "reading along with audiobooks benefits", "listening to an audiobook while reading a different book".

### Product fit
Strongest possible: this is the question every HushBook user is implicitly asking. The post can also honestly answer the objection seen in Reddit's top answer ("my reading speed is like double+ most audiobooks"): Brysbaert 2019 vs ACX 9,300 words an hour, so speed up to about 1.5x.

### Cannibalization check
Reading-while-listening research already appears in short sections of other posts. None targets "does it help / is it bad":
- `does-listening-to-audiobooks-count-as-reading`, "Can you read and listen at the same time?": about 200 words, Clinton-Lisell 2023 only.
- `how-to-retain-information-from-audiobooks`, "3. Read along when the book is dense": Adesope and Nesbit, Clinton-Lisell, framed as a memory habit.
- `what-is-immersive-reading`: a definition page, with an anecdotal "Does it help with attention?" section. Its queries are "immersive reading / immersive reader meaning". This post does not use "immersive reading" or "immersion reading" in its title, H2s or keywords; it mentions the term once and links to that page.
- `learn-english-with-audiobooks`: second-language learners only. This post summarizes two of its studies in one bullet and links there.
- `can-you-read-along-with-audible`, "Is reading along worth it?": two anecdotal sentences.
The new post becomes the hub for the "is it worth it" question, and three of those sections now link to it.

### Topics considered and rejected
- "Is LibriVox safe / legal / legit / free / ai" (big autocomplete cluster; "librivox alternative" 4 impressions at position 29 on `/alternatives`): strong product fit, but overlaps the LibriVox H2 in `how-to-listen-to-audiobooks-for-free` and `free-read-along-audiobooks`, and the answer rests on LibriVox's own pages rather than research. Good candidate for a later post.
- "Do audiobooks count as screen time": awkward fit (read-along puts a screen in front of you), and the kids post already quotes the AAP's "screen-free" line.
- "Do audiobooks use data / how much data does an audiobook use": offline fits HushBook, but it is a two-paragraph answer.
- "Does listening to audiobooks help prevent dementia / audiobooks for dementia": a health claim with no direct audiobook research; weak fit.
- "How long does it take to read the Bible": large volume, but overlaps `how-long-is-an-audiobook` (which already has the KJV at 101 hours) and is off-brand.
- "Why are audiobooks so expensive": weak product fit (HushBook does not sell audiobooks); industry sources only.
- "Is listening to audiobooks good for your brain / make you smarter": still cannibalizes the count-as-reading post (same reason as the 2026-10-22 notes).
- "Do audiobooks improve vocabulary / reading comprehension": overlaps the kids, learn-English and count-as-reading posts.

## Sources and how each was verified

Every DOI was checked against `api.crossref.org/works/<doi>` and both ERIC IDs against `api.ies.ed.gov/eric/?search=id:<id>` on 2026-10-23. All titles, authors, years, journals, volumes and pages matched what the post cites. Every DOI also resolves at doi.org (HTTP 302). Numbers were re-read from the abstract or full text named below.

| Source | ID | Title check | Numbers check |
|---|---|---|---|
| Clinton-Lisell (2023), Educational Research: Theory and Practice | ERIC EJ1403866 | ERIC ✓ | ERIC abstract: 30 studies, N = 1,945, 62 effect sizes, "trivial overall benefit" g = 0.18; experimenter-paced g = 0.41; self-paced g = 0.06 (p = .34) ✓ |
| Adesope and Nesbit (2012), J Educational Psychology 104(1) 250 to 263 | DOI 10.1037/a0026147 | Crossref ✓ | Abstract (OpenAlex): 57 independent studies, mostly postsecondary; spoken-written = written-only; spoken-written > spoken-only; advantage for low prior knowledge, system-paced, picture-free materials ✓. Effect sizes not in the abstract, so none given. |
| Rogowsky, Calhoun and Tallal (2016), SAGE Open 6(3) | DOI 10.1177/2158244016669550 | Crossref ✓ | Abstract: 91 participants, randomly assigned to audiobook, e-text or dual modality; preface and a chapter of a non-fiction book; no significant differences immediately or at 2 weeks ✓ |
| Kalyuga, Chandler and Sweller (2004), Human Factors 46(3) 567 to 581 | DOI 10.1518/hfes.46.3.567.50405 | Crossref ✓ | Europe PMC abstract (PMID 15573552): three experiments, 25 technical apprentices; experiment 3, concurrent identical spoken and written text "significantly less efficient" than auditory-only ✓ (quote verbatim) |
| Diao and Sweller (2007), Learning and Instruction 17(1) 78 to 88 | DOI 10.1016/j.learninstruc.2006.11.007 | Crossref ✓ | Abstract from the UNSW repository record (hdl 1959.4/50589): first-year tertiary EFL students; written only vs written plus verbatim spoken; translation scores, mental load ratings and free recall favored written only ✓. Sample size not in the abstract, so none given. |
| Diao, Chandler and Sweller (2007), American Journal of Psychology 120(2) 237 to 261 | DOI 10.2307/20445397 | Crossref ✓ | Europe PMC abstract (PMID 17650920): script and subtitles improved understanding of that passage but performance on a later auditory passage was poorer than listening-only ✓ |
| ACX, "How long will my narrated audiobook be?" | URL | Page fetched ✓ | "On average, most performers narrate about 9,300 words per hour." ✓ (155 a minute is our division) |
| Brysbaert (2019), Journal of Memory and Language 109:104047 | DOI 10.1016/j.jml.2019.104047 | Crossref ✓ | Abstract: 190 studies, 18,573 participants; 238 wpm non-fiction, 260 fiction ✓. "About one and a half times faster" and "1.5x ≈ 233 wpm" are our arithmetic (238/155 = 1.54, 260/155 = 1.68; 155 × 1.5 = 232.5), stated as such in the post. |
| Conklin, Alotaibi, Pellicer-Sánchez and Vilkaitė-Lozdienė (2020), Second Language Research 36(3) 257 to 276 | DOI 10.1177/0267658320921496 | Crossref ✓ | Abstract: L1 and L2 readers, one passage each mode; "in general, neither group of participants fixated the word that they were hearing"; eyes "generally preceded the audio"; authors suggest reading slightly ahead may explain some benefits ✓. **Sample size not in the abstract; the open manuscripts were behind a bot check, so the post gives none.** The source list spells the names without diacritics (Pellicer-Sanchez, Vilkaite-Lozdiene) to keep the markdown ASCII like the other posts. |
| Liao, Chang, Huang and Sung (2020), Computers & Education 144:103703 | DOI 10.1016/j.compedu.2019.103703 | Crossref ✓ | Abstract (OpenAlex): 61 children aged 4 to 5; highlight synchronization raised looking at print "from 19% to 38% reading time" ✓ |
| Gerbier, Bailly and Bosse (2015), SLaTE 2015, pp. 59 to 64 | DOI 10.21437/slate.2015-11 | Crossref ✓ | Abstract (OpenAlex): 35 sixth graders, 12 stories; synchronous highlighting boosted semantic memory (28% vs 17% correct), no orthographic benefit ✓ |
| Gerbier, Bailly and Bosse (2018), Computer Speech & Language 47:74 to 92 | DOI 10.1016/j.csl.2017.07.003 | Crossref ✓ | Abstract from HAL (hal-01575227) via the HAL API: 40 French children grades 3 to 5; synchronization null for orthography, negative for semantics; fewer regressive saccades; preference mainly for the plain version except the poorest readers; "forced the children to be strictly aligned with the oral modality" ✓ |
| Varao Sousa, Carriere and Smilek (2013), Frontiers in Psychology 4:892 | DOI 10.3389/fpsyg.2013.00892 | Crossref ✓ | Europe PMC abstract plus full text (PMC3842750): 235 students, 24 excluded, so 211 analyzed; listening produced the most mind wandering, poorest memory, least interest ✓. The 0.51 vs 0.36 proportions used in the retention post were not found in the text (likely in a figure), so this post gives no proportions. |
| Chang and Millett (2015), System 52:91 to 102 | DOI 10.1016/j.system.2015.05.003 | Crossref ✓ | Abstract read on ScienceDirect in the browser: 64 year-10 secondary EFL students, 26 weeks, 90 min a week, 20 graded readers; audio-assisted group improved reading rates and comprehension "substantially" more; maintained 3 months ✓. Nationality (Taiwan) only from secondary sources, so not stated. |
| Brown, Waring and Donkaewbua (2008), Reading in a Foreign Language 20(2) 136 to 163 | ERIC EJ815119 | ERIC ✓ | Full text (ERIC PDF): 35 Japanese university students; meaning-translation test 16% (RWL), 15% (reading), 2% (listening only); 72% preferred RWL, 28% reading only, 0% listening only ✓ |
| Montali and Lewandowski (1996), J Learning Disabilities 29(3) 271 to 279 | DOI 10.1177/002221949602900305 | Crossref ✓ | Europe PMC abstract (PMID 8732888): 18 average and 18 less skilled readers in grades 8 and 9; less skilled comprehended more bimodally (on screen, highlighted, voiced) than unimodally; bimodal performance commensurate with average readers' visual condition ✓ |
| Wood, Moxley, Tighe and Wagner (2018), J Learning Disabilities 51(1) 73 to 84 | DOI 10.1177/0022219416688170 | Crossref ✓ | Europe PMC abstract: g = 0.35, 95% CI 0.14 to 0.56 ✓. PMC5494021 full text: "n = 22 studies" ✓ |
| Audible newsroom, "Audible Launches Immersion Reading for Deeper Engagement with Books" | URL | Page fetched ✓ | Dated February 18, 2026; feature called "immersion reading" with a "Read & Listen" mode ✓ |

### Claims checked but left out
- Varao Sousa et al. (2013) mind-wandering proportions (0.51 listening, 0.36 silent): not found in the article text; left out here. The retention post still uses them; worth checking against the paper's figure.
- Conklin et al. (2020) sample sizes: not reachable (open manuscripts behind a bot check).
- Adesope and Nesbit (2012) effect sizes: not in the abstract.
- Diao and Sweller (2007) sample size and the learners' first language: not in the abstract.
- Chang and Millett (2015) "Taiwanese": only from secondary sources.
- Any study measuring mind wandering during reading while listening: none found (WebSearch 2026-10-23 turned up only listening-only studies). The post says so explicitly.
- Harvard Gazette (Mar 2026) piece ranking for these queries: news coverage, not a primary source; not cited.
- Reddit "I read too fast" comments: used only as background for the speed section, not quoted.

## Product claims (live site fetched 2026-10-23, or `D:\hushbook\lib\l10n\app_en.arb`)
- "Every word lights up with the narrator. Tap any word to jump there." (home)
- 100% on-device transcription; works offline after a one-time engine download; no account (home).
- Built-in catalogue of public-domain audiobooks from LibriVox and the Internet Archive; "thousands of free classics"; import MP3, M4B and more (home).
- Font, text size (A− / A / A+) and line-spacing controls (home, "Reading profiles").
- Playback speed: "Playback speed" and "Custom Speed" strings in `app_en.arb`. The existing speed post states presets from 0.5x to 3x; this post only suggests 1.25x and 1.5x.
- Limits stated: speech recognition errors on unusual names; no protected Audible imports; reading along does not beat reading an easy book yourself.
- **Not claimed:** the e-book sync feature (`syncWithEbook`, DRM-free EPUB, PDF or TXT in `app_en.arb`). It is not on the live site, so it may not have shipped. It would be a strong fit for the "match the editions" tip once it is public.

## Soft upsell placement
- Body hint (one sentence, at the pain point): end of "Does reading along help you focus?". Most audiobooks give you no text to look at, and a highlighting app fills that gap.
- Closing "Reading along with HushBook" section, with honest limits.
- `cta`: "Read along at your own speed".

## Checks run
- H1 equals `title` ✓ (the build throws otherwise)
- metaTitle 60 ≤ 60 (rendered without the " | HushBook" suffix because it would exceed 60); metaDescription 146 ≤ 160; description 231 ≤ 240 ✓
- 8 keywords, 5 takeaways, 6 FAQs; every takeaway and FAQ fact is stated in the body ✓
- No en or em dashes in the post or registry text; no markdown tables in the post ✓
- 6 internal links: immersive reading, listening speed, focus, learn English, dyslexia, home ✓
- Rendered HTML: no markdown leaks; BlogPosting + FAQPage (6) + BreadcrumbList ✓

## Before publishing
1. Optional fourth contextual link from `can-you-read-along-with-audible` ("Is reading along worth it?"). That page holds the largest impression pool, and weekly plan action 1 edits it anyway.
2. After deploy: IndexNow with the full URL, then Request indexing in Search Console.
