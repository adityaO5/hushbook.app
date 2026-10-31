# Notes: "How to Get Into Audiobooks: 10 Tips for Beginners"

Draft prepared 2026-10-26 by the scheduled weekly SEO run. Not published. Slug: `how-to-get-into-audiobooks`. Body: about 2,100 words (10 min read). Category: Reading and listening.

## Why this topic

### Search Console signal
- No query in the 90-day export or the Oct 18 to 24 files mentions getting into, starting or getting used to audiobooks. This is a new cluster, so there is **no direct cannibalization** with an existing page.
- Closest existing pages: `/blog/how-to-focus-on-audiobooks` ("how to focus on audiobooks" 10 impr this week, pos 7.6; "how do people focus on audiobooks"; "how to pay attention to audiobooks") and `/blog/how-to-listen-to-audiobooks-for-free`. The new post keeps attention advice short and links to the focus post, and keeps source advice short and links to the free post. Its own angle is choosing a first book, the sample, session length, habit, speed and setup.
- This week's new queries without a page were too small or vague to build a post on ("librivox alternative" 4 impr, "are audiobooks faster than reading" 2). See the plan's "New queries" section.
- The backlog memory listed "how to get into audiobooks" (beginner guide, Reddit-heavy SERP) as the next candidate on 2026-10-21.

### Topics considered and rejected
- **"Audiobook to text" / "transcribe audiobook" / "audiobook to text converter"**: strong product fit, but it overlaps `/audiobook-with-text`, which is the site's second-best click earner this week (13 clicks, pos 3.7). HushBook also does not export transcripts as files (no export string in `app_en.arb`), so the "converter" intent would be served by other tools.
- **"How to convert M4B to MP3"** (big autocomplete cluster: free, mac, vlc, ffmpeg, with chapters): the live Google SERP is converter tools (CloudConvert, FreeConvert, Zamzar, Microsoft Store, Google Play apps) plus Reddit and Super User. Hard SERP and weak product fit. `/blog/m4b-vs-mp3` already has "Should you convert M4B to MP3?".
- **"Is listening to audiobooks good for your brain"**: overlaps `/blog/does-listening-to-audiobooks-count-as-reading` ("Is your brain doing something different?"). Rejected again, as on 2026-10-22.
- **"Audiobooks with subtitles"**: overlaps `/audiobook-with-text` and the Audible post.
- **"Audiobooks for visually impaired / low vision / seniors"**: authority SERP (NLS, RNIB, AFB) and overlaps the free post's print-disability section. Folded into one H3 here instead.
- **"Are audiobooks faster than reading"**: too small; proposed as a paragraph in the speed post (quick win in the plan).

### Google autocomplete (suggest API, `client=firefox&hl=en&gl=us`, 2026-10-26)
- "how to get into audiobooks": the query itself, then "how to get audiobooks in spotify / apple books / kindle / libby / different languages / audible / iphone / kindle unlimited / spanish"
- "how to get used to listening to audiobooks", "how to get used to audiobooks", "how to get started with audiobooks", "how to start doing audiobooks", "how to learn from audiobooks"
- "how to start listening to audiobooks", "how to listen to audiobooks"
- "getting into audiobooks": reddit, "can't get into audiobooks", "cant get into audiobooks reddit", "how to get started with audiobooks"
- "how to enjoy audiobooks", "how to enjoy audiobooks reddit", "best way to enjoy audiobooks", "how to like audiobooks"
- "why is it so hard to listen to audiobooks", "why is it so hard for me to listen to audiobooks"
- "what is the best way to listen to an audiobook", "what is the easiest way to listen to audiobooks", "what is the easiest way to listen to audiobooks for seniors", "easiest way to listen to audiobooks for seniors"
- "best first audiobook", "best first audiobook reddit", "best first audiobook to listen to", "good first audiobook"
- "tips for listening to audiobooks", "audiobook tips reddit"

### Live Google SERP (Playwright browser, signed out, `hl=en&gl=us`, 2026-10-26, no captcha)
- **"how to get into audiobooks"**: Reddit r/audiobooks (3 years old), The Perpetual Page-Turner (May 2021), Everyday Reading (Feb 2024), a Facebook group thread, NetGalley Bookish "A Beginner's Guide to Audiobooks", a 2020 WordPress post, an audiobook narration blog. People Also Ask on this query was about narration jobs and Prime ("How much do audiobook readers get paid?", "Do Amazon Prime members get Audible for free?").
- **"how to start listening to audiobooks"**: Reddit, NetGalley Bookish, Perpetual Page-Turner, Everyday Reading, Facebook, NetGalley Zendesk, The Young Folks (2022). **PAA:** "What is the easiest way for seniors to listen to audiobooks?", "Do Amazon Prime members get free audiobooks?", "What is the easiest way to listen to audiobooks?", "Why is it so hard for me to listen to audiobooks?"
- **"how to get used to listening to audiobooks"**: Reddit r/books (11 years old), Perpetual Page-Turner, Facebook, Medium (4 years old), baos.pub (2020), Saga Egmont (2023), a YouTube video, Quora. **PAA:** "Why is it so hard for me to listen to audiobooks?", "What is the easiest way for seniors to listen to audiobooks?", "Do people with ADHD have trouble listening to audiobooks?", "Is it better for your brain to read or listen to audiobooks?"
- **"can't get into audiobooks"**: Reddit (3 years), Medium, Facebook, Everyday Reading, Perpetual Page-Turner, Book Riot (2018), WordPress (2020), Substack. **PAA:** "Why is it so hard for me to listen to audiobooks?", "Why are audiobooks not working?", "Do people with ADHD have trouble listening to audiobooks?", "What is the easiest way for seniors to listen to audiobooks?"
- **AI Overview** (same on the first two queries): re-listen to a book you know, pick fast-paced genres, author-read memoirs, sample the narrator, pair with mindless tasks, 10 to 15 minute blocks, adjust speed, good headphones, drop books you dislike, Libby / Hoopla / Spotify / Audible. It cites Facebook, Reddit, YouTube, NetGalley and Saga Egmont. None of the sources cite research.
- **Verdict:** weak SERP. Old forum threads and personal blogs, no studies. A post that covers the same tips with named research and sample sizes can compete, and the AI Overview has no authoritative source to cite.
- **H2 and FAQ wording** was matched to the PAA questions above: "Why is it so hard to listen to audiobooks?" (H2) and "Why is it so hard for me to listen to audiobooks?" (FAQ), "What is the easiest way to listen to audiobooks?", "What is the easiest way for seniors to listen to audiobooks?", "Is it better for your brain to read or listen to audiobooks?", "Do people with ADHD have trouble listening to audiobooks?". The Prime question was not used: the post does not cover Prime, and the free post already does.

## Sources and how each was verified

The opus research agent was briefed read-only, primary sources only, exact numbers and sample sizes, and to flag anything unverified. Then every DOI was checked against `api.crossref.org/works/<doi>` in this run (title, authors, year, journal all matched), and non-DOI pages were fetched to confirm their titles and key phrases.

| Source | ID | Title check | Numbers used, and how they were checked |
|---|---|---|---|
| Clinton-Lisell (2022), Review of Educational Research 92(4) 543 to 582 | DOI 10.3102/00346543211060871 | Crossref ✓ (online Dec 2021) | 46 studies, N = 4,687, "not reliably different" (g = 0.07); reading better when self-paced and on inferential questions. Agent read the abstract; same figures already on `/blog/does-listening-to-audiobooks-count-as-reading` ✓ |
| Rogowsky, Calhoun, Tallal (2016), SAGE Open 6(3) | DOI 10.1177/2158244016669550 | Crossref ✓ | 91 participants, three conditions, no differences immediately or after 2 weeks. Agent read abstract ✓ |
| Pew Research Center (2026-04-09) | URL | Page fetched ✓ (HTML title "Do Americans read print books, e-books or audiobooks more?") | Chart data read from the page in this run: audiobook past-year listening 11% (2011), 23% (2021), 26% (2025); survey of 8,046 US adults Oct 6 to 16, 2025 ✓. Pew marks a method change after 2021 (dashed line), so the post calls it a rough trend. |
| OverDrive press release (2026-01-21) | URL | Page fetched ✓ | "Audiobooks borrowed: 315.9 million (+13%)" ✓, worldwide Libby and Sora |
| Varao Sousa, Carriere, Smilek (2013), Frontiers in Psychology 4:892 | DOI 10.3389/fpsyg.2013.00892 | Crossref ✓ | about 211 analysed (235 recruited, 24 excluded); mind wandering 0.506 listening vs 0.356 silent reading; listening worst memory and lower interest. Agent read full text via Europe PMC ✓. Interest was lower vs reading aloud; the post says "the lowest interest", which matches the existing posts' wording. |
| Chang and Read (2006), TESOL Quarterly 40(2) 375 to 397 | DOI 10.2307/40264527 | Crossref ✓ | 160 Taiwanese college students; topic information was the most effective support, then repetition. Agent read abstract ✓. Indirect evidence (second-language listeners), stated as such in the post. |
| Libby Help, "Why are chapters locked in a title?" | help.libbyapp.com/en-us/6069.htm | Page fetched ✓ | Locked chapters mean you are in a sample; you can borrow from the sample ✓ |
| Richardson et al. (2020), Scientific Reports 10:11298 | DOI 10.1038/s41598-020-68253-2 | Crossref ✓ | 102 analysed (109 recruited); video rated about 15% more engaging; audio about 2 bpm higher heart rate, higher EDA, about 0.34 °C higher wrist temperature; **funded by Audible UK, two Audible co-authors**. Agent read PMC full text ✓. Funding is disclosed in the post. |
| Lally, van Jaarsveld, Potts, Wardle (2010), European Journal of Social Psychology 40(6) 998 to 1009 | DOI 10.1002/ejsp.674 | Crossref ✓ (online 2009) | 96 volunteers, 12 weeks, range 18 to 254 days, missing one opportunity "did not materially affect" ✓ (abstract). **Median 66 days: partly verified**, confirmed through Singh et al. 2024, not read in Lally's full text. |
| Singh, Murphy, Maher, Smith (2024), Healthcare 12(23) 2488 | DOI 10.3390/healthcare12232488 | Crossref ✓ | 20 studies, N = 2,601, medians 59 to 66 days; quotes Lally's 66 days (18 to 254). Agent read it ✓ |
| Strayer and Johnston (2001), Psychological Science 12(6) 462 to 466 | DOI 10.1111/1467-9280.00386 | Crossref ✓ | "Performance was not disrupted by listening to radio broadcasts or listening to a book on tape"; phone conversations gave a "twofold increase in the failure to detect simulated traffic signals" ✓ (abstract). **Sample size not verified**; the post gives none. |
| Nowosielski, Trick, Toxopeus (2018), Accident Analysis and Prevention 111 202 to 209 | DOI 10.1016/j.aap.2017.11.033 | Crossref ✓ | Faster hazard response time with an audiobook on simple roads; "especially deleterious" on complex roads ✓ (abstract). **Sample size not verified**; the post gives none. |
| Murphy, Hoover, Agadzhanyan, Kuehn, Castel (2022), Applied Cognitive Psychology 36(1) 69 to 82 | DOI 10.1002/acp.3899 | Crossref ✓ (online Nov 2021) | "minimal costs ... 1x to 1.5x, or 2x speed, but performance declined beyond 2x speed" ✓ (abstract). The post uses only this. |
| Seli, Smallwood, Cheyne, Smilek (2015), Psychonomic Bulletin and Review 22(3) 629 to 636 | DOI 10.3758/s13423-014-0793-0 | Crossref ✓ | 2,708 students, ADHD symptoms linked to spontaneous mind wandering. Restated from `/blog/are-audiobooks-good-for-adhd` (verified in that post's run). |
| Library of Congress, NLS home | loc.gov/nls | Page fetched ✓ | "free of charge through USPS Free Matter" ✓; "BARD mobile app" and the Alexa "My Talking Books" skill appear on the page ✓ |
| Library of Congress, "Apply for NLS Services" | loc.gov/nls/about/eligibility-for-nls-services/ | Page title fetched ✓ | Eligibility (blind, visual, physical or reading disability, certified by a competent authority): agent read the page; same wording already in the free post ✓ |
| RNIB, "Talking books service" | rnib.org.uk | Page fetched ✓ | "absolutely free" ✓; DAISY CD and USB ✓; Alexa link on page ✓. **The page says both "over 34,000" and "40,000" books, so the post gives no number.** "For people with sight loss" follows the free post's wording. |

### Claims checked but left out
- APA 2026 consumer survey "58% of Americans have listened to an audiobook": the survey sample was 1,706 spoken-word listeners, so the population base is unclear. Left out; Pew used instead.
- Audible sample length: no Audible Help Center page found. ACX asks for "a retail sample of 5 minutes or less" (agent read help.acx.com), but that is a production rule, not what listeners see. Left out.
- Apple Books free samples: the free post says Apple lets you play free samples; in this run the apple.com page did not show the phrase in its static HTML. Left out.
- Mayer, Sobko and Mautone (2003), human vs machine voice in a short lesson (DOI 10.1037/0022-0663.95.2.419, Crossref ✓): not about audiobooks. Left out.
- No peer-reviewed study compares author narration with professional narration. The post presents author-read memoirs as a practical suggestion only.
- Bransford and Johnson (1972) topic-knowledge numbers: only from secondary sources. Left out.
- Murphy (2022) per-experiment sample sizes and the delayed-test numbers from the UCLA press release: not read in the paper. Left out.
- Prime and Audible terms (Audible Plus closed to new members March 3, 2026; Prime trial with 2 credits): verified by the agent on help.audible.com and audible.com but not used, because the post does not cover Prime. Useful for a future update of the free post.

## Product claims (all already on the live site or in the app strings)
- Highlights each word as the narrator says it; tap any word to jump the audio there (home page, focus post, sleep post).
- Transcription runs on the phone, nothing uploaded, no account (llms.txt, home page).
- Built-in store of LibriVox and Internet Archive audiobooks (free post, focus post).
- Imports MP3, M4A and M4B (focus post, sleep post).
- Speed from 0.5x to 3x (speed post); 30-second rewind (focus post); sleep timer (sleep post; `sleepTimerTitle` in `app_en.arb`).
- Low-vision profile with large, high-contrast text (focus post).
- iPhone and Android (llms.txt).
- Limits stated: speech recognition errors on unusual names; no Audible downloads; no Libby or Hoopla loans (free post).
- Not claimed: price or "free" for the app itself in the closing section (the CTA says free classics are built in, which is on the site).

## Soft upsell placement
- Body hint (one sentence, at the pain point): tip 8, "Rewind the moment you drift": knowing how far back to go; an app that highlights the text, such as HushBook, lets you tap the last sentence you remember.
- Closing "Getting into audiobooks with HushBook" section, with honest limits.
- `cta`: "Never lose your place in an audiobook".

## Checks run (python, `make_entry.py` in the scratch folder)
- H1 equals the title ✓
- metaTitle 49 ≤ 60; metaDescription 152 ≤ 160; description 239 ≤ 240 ✓
- 8 keywords, 5 takeaways, 6 FAQs ✓; every number in the takeaways and FAQs appears in the body ✓
- No en or em dashes in any draft file or in the plan; no markdown table lines in the post ✓
- 6 internal links: focus, free, speed, count-as-reading, ADHD, home ✓
- HushBook named once in the body before the closing section ✓

## Before publishing
1. Re-check that the RNIB, NLS and Pew pages still say what the post quotes (time-sensitive pages).
2. Optional: add a screenshot of the read-along view next to tip 8.
3. Consider a short FAQ on "Do Amazon Prime members get free audiobooks?" later, linking to the free post's Audible section, if Search Console shows that query on this page.
