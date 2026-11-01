# Notes: "How to Take Notes on Audiobooks: Clips, Bookmarks and What Helps You Remember"

Written and published 2026-11-01 in a reviewed session. Slug: `how-to-take-notes-on-audiobooks`. Body: about 2,900 words (13 min read). Category: Reading and listening. No `hero` or `aside` embed: the three existing demos (read-along-card, companions-arc, character-map) are each tied to other posts and were not reused.

## Why this topic

- Pick #7 in `docs/seo/keyword-research-2026-10-27.md` (19 autocomplete phrases, 8 seeds, weak SERP, three verified app features). The higher picks from that file and from the 2026-10-30 AI-search file were already published (characters, Spotify, iPhone, classics, read-and-listen apps, LibriVox apps, dyslexia apps, beginner guide).
- **Search Console (local CSVs, 2026-10-26 pull, 90 days and 7 days):** no query containing note, highlight, annotate, bookmark, quote or clip. New cluster, no cannibalization. The only overlap is one H2 in `how-to-retain-information-from-audiobooks` ("7. Catch key lines as you hear them"), which now links here.
- **Google autocomplete (suggest API, `client=firefox&hl=en&gl=us`, 2026-11-01):**
  - "how to take notes on audiobooks", "how to take notes in audible", "how to write notes in audible", "how to use clips and notes in audible", "how to make notes in audible"
  - "how to take notes while listening to audiobook / audible / a podcast / a lecture", "how to take notes and listen at the same time"
  - "taking notes while listening to audiobooks", "best way to take notes when listening to audiobooks", "how do you take notes when listening to audiobooks"
  - "how to highlight audiobooks", "how to annotate audiobooks", "can you highlight audiobooks"
  - "how to bookmark audiobook in spotify / on iphone / on apple books / in ibooks", "can you bookmark in audible", "how to place a bookmark in audible"
  - "audible clips" cluster: and notes, export, location, and bookmarks, not working, saved, share, download
  - Noise excluded: "how to take smart notes audiobook" (the Ahrens book), "audiobook notes" (book titles).
- **Live Google SERP and People Also Ask (headed Chromium with a copied Playwright profile, signed out, `hl=en&gl=us`, 2026-11-01; headless Chromium got a bot check):**
  - "how to take notes on audiobooks": AI Overview citing Reddit r/audiobooks, YouTube (Ali Abdaal, Marble Jar, Find Your Flow Reading), martinboss.com and Kelly J. Adams; results are personal blogs and forum threads. PAA: "How to take notes on Audible?", "How do you take notes when listening to audiobooks?", "What is the best app for taking notes on books?", "How can I turn my audio recordings into notes?", "Is it better for your brain to read or listen to audiobooks?"
  - "how to take notes in audible": AI Overview from Reader Voracious, a Martin County Library YouTube tutorial and help.audible.com; Reddit r/audible "how on earth do you take notes using audible?" (1 year old). PAA: "How to take notes from an audiobook?", "Why can't I take notes while listening?", "Does Audible have a transcription feature?", "How do you take notes when listening to audiobooks?"
  - "how to take notes while listening to audiobook": same AI Overview. PAA: "How to take notes and listen at the same time?", "Is it hard for people with ADHD to listen to audiobooks?", "What can I do while listening to an audiobook?"
  - "how to bookmark audiobook on iphone": AI Overview built on Apple Community (2023 thread "Audiobook Bookmarks") and help.audible.com; says Apple Books has no manual bookmark tool. PAA: "How do I bookmark an audiobook?", "How to bookmark audiobook Apple Books?"
  - "can you highlight audiobooks": AI Overview built on a Libby YouTube tutorial. PAA: "Does Apple books let you highlight?", "How do you take notes when listening to audiobooks?"
  - "how to bookmark audiobook in spotify": bot check, not collected.
  - **Verdict:** weak SERP. No page cites research; the AI Overviews cite YouTube, Reddit and personal blogs. H2s and FAQs use the PAA wording above.

## Sources and how each was verified

One opus research agent (read-only, no browser, about 24 minutes) gathered the sources; every DOI below was then re-checked in this session against `api.crossref.org/works/<doi>` (title, year, journal and authors matched), and the numbers used were re-read in the downloaded full texts or help pages where marked.

| Source | ID | Numbers used and check |
|---|---|---|
| Piolat, Olive and Kellogg (2005), Applied Cognitive Psychology | 10.1002/acp.1086 | "note taking demands more effort than reading or learning... less effort than the creative written composition" (abstract) |
| Kiewra, Colliot and Lu (2018), IDEA Paper 73 | PDF | "just one third of a lesson's important information"; 1991 repetition figures 38% once, 53% twice, 60% three times, 65% self-controlled (full text re-read) |
| Aiken, Thomas and Shennum (1975), JEP | 10.1037/h0076613 | n = 180, 47% vs 12%, as reported in Jansen et al. 2017 (re-read in the Jansen preprint; original not read, stated in the post) |
| Jansen, Lakens and IJsselsteijn (2017), Educational Research Review | 10.1016/j.edurev.2017.10.001 | cognitive-load conclusion paraphrased from the preprint, not quoted |
| Varao Sousa, Carriere and Smilek (2013), Frontiers in Psychology | 10.3389/fpsyg.2013.00892 | 211 analysed, 0.506 vs 0.356 (full text re-read) |
| Kiewra, Mayer, Christensen, Kim and Risch (1991), JEP | 10.1037/0022-0663.83.1.120 | authors from Crossref; figures from the IDEA paper |
| Mueller and Oppenheimer (2014), Psychological Science | 10.1177/0956797614524581 | headline only |
| Morehead, Dunlosky and Rawson (2019), Ed Psych Review | 10.1007/s10648-019-09468-2 | "did not consistently differ... including a group who did not take notes" (abstract) |
| Urry et al. (2021), Psychological Science | 10.1177/0956797620965541 | 74 + 68 = 142; g = 0.04 across 8 studies (preprint re-read) |
| Bui, Myerson and Hale (2013), JEP | 10.1037/a0030367 | 11-minute audio lecture and samples 80/76/76 per Jansen; results from the abstract |
| Ruhl, Hughes and Schloss (1987), TESE | 10.1177/088840648701000103 | three 2-minute pauses; higher on free recall and objective test. **Sample size (72) not confirmable (SAGE 403, no abstract on Semantic Scholar): removed from the post** |
| Bachhel and Thaman (2014), J Clin Diagn Res | 10.7860/JCDR/2014/8260.4691 | n = 74 + 74, 23.0 vs 21.05, p = 0.032, 83.6% (PMC page re-read). Crossref lists only Thaman as author; PMC lists Bachhel first |
| Luo, Kiewra and Samuelson (2016), Instructional Science | 10.1007/s11251-016-9370-4 | 14-minute audio at 136 wpm; pauses beat revising after (abstract) |
| Roediger and Karpicke (2006), Psychological Science | 10.1111/j.1467-9280.2006.01693.x | Exp 1 n = 120; 56% vs 42% at one week (full text re-read) |
| Karpicke and Blunt (2011), Science | 10.1126/science.1199327 | n = 80; 0.67 vs 0.45 (full text re-read) |
| Rowland (2014), Psychological Bulletin | 10.1037/a0037559 | 159 effects, 61 studies, g = 0.50, 81% positive; 0.69 vs 0.41 by delay (full text re-read) |
| Lawson and Mayer (2024), Frontiers in Psychology | 10.3389/fpsyg.2024.1452385 | 203 students; d = 0.48 immediate (Exp 1), 0.54 one week (Exp 2) (full text re-read) |
| Dunlosky et al. (2013), PSPI | 10.1177/1529100612453266 | "low utility"; "may actually hurt performance on higher-level tasks that require inference making" (full text re-read) |
| Ponce, Mayer and Méndez (2022), Ed Psych Review | 10.1007/s10648-021-09654-1 | 36 articles, 85 effect sizes; 0.36 memory, 0.20 comprehension (abstract re-read) |
| Kiewra (1985), Educational Psychologist | 10.1207/s15326985ep2001_4 | process and product functions (abstract) |
| Murphy et al. (2022), Applied Cognitive Psychology | 10.1002/acp.3899 | up to 2x minimal cost, decline beyond (abstract) |
| Audible Help, "Manage clips & notes" | help.audible.com/s/article/manage-clips-bookmarks | 30 seconds; 5 to 44 seconds; clip adds a bookmark; notes in app; app only; Clips & Notes button, Edit Clip handles, Save (WebFetch 2026-11-01, page dated Sep 9, 2026) |
| Readwise Docs, "Import from Other Sources" | docs.readwise.io | "Audible doesn't make it possible to extract bookmarks or clips through the cloud" (page re-read) |
| Libby Help 6165, 6151, 6257 | help.libbyapp.com | bookmark icon, tap and hold, Make a note, reappear if borrowed again; export even after return, Table or Spreadsheet, highlights include notes; deleting Reading Journey deletes them (pages re-read) |
| hoopla, "Tap into Audiobooks on hoopla" | hoopladigital.com/audiobook | "Add notes to any bookmark for future reference" (page re-read) |
| Apple Support, "Listen to audiobooks in the Books app on iPhone" | support.apple.com | lists speed, sleep timer, chapters, slider; no "bookmark" on the page (re-read) |
| Spotify Support, "Audiobooks" | support.spotify.com/us/article/audiobooks | speed, 15-second skips, sleep timer, rate, share, download; no "bookmark" (re-read); Community idea closed |
| Apple Support, Notes recording and Voice Memos transcription | support.apple.com | "swipe down from the top of the screen"; supported languages auto-transcribed. **"iPhone 12 or later" not found on the saved pages: removed from the post** |
| Google Keep Help (Android), Pixel Phone Help transcriptions | support.google.com | Create Recording, Speak (page re-read); Pixel page title confirmed |

## Not used

Kobayashi 2005/2006 meta-analyses (effect size unverified), Adesope 2017 (numbers unverified), Daniel and Woody 2010 (scores unverified), McKinney 2009 (sample unverified), Bretzing and Kulhavy 1979 (only via Jansen), Kindle Notebook sync of highlights made during narration (no Amazon page states it).

## HushBook claims and where they come from

- Two-tap quote capture and shareable quote cards: App Store description and hushbook.app home page.
- Mark (highlight, note or quote; tap first and last word; "Audio paused"; "Play from here"; Quotes & notes screen with filters; marks listed by chapter): `lib/l10n/app_en.arb` strings added 2026-10-20 (`markButton`, `markButtonTooltip`, `markHintStart`, `markHintExtend`, `markAudioPaused`, `markPlayFromHere`, `quotesAndNotesTitle`, `marksFilter*`). App at version 1.3.5+70 on 2026-10-29. **Check that the Mark feature is in the store build before this post is cited for it.**
- Chapter notes page: `keepNotesHint`, `startWithChapterTitle`, `yourNotes`.
- Limits stated: speech recognition errors, no DRM import (Audible, Libby, hoopla, Apple Books, Spotify), marks and notes stay in the app (no export string found).
