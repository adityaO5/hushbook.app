# Notes: Why Can't I Focus on Reading Anymore? Causes and What Helps

Draft written 2026-11-08 for publish 2026-11-08 at /blog/why-cant-i-focus-on-reading. Pick and outline from `docs/seo/keyword-research-2026-11-07.md` ("Recommended pick"); evidence from `research-evidence.md`; product facts from `research-platforms.md` section 5.

## Decisions

- **Opening.** First sentence answers the title in 23 words. Deciding fact: Varao Sousa 2013, 35.6% of silent-reading check-ins. Then the fixes, the doctor line, and what the guide covers, all inside the first 130 words.
- **First H2 is "Why can't my brain focus on reading?"** (autocomplete: "why can t my brain focus on reading") instead of repeating the H1 question.
- **"What to do when you can't focus on reading: 9 things that help"** replaces the brief's "How to focus on reading again", because "what to do when you can't focus on reading" is a typed autocomplete phrasing (36 hits in signals.json). Nine numbered H3 steps, 2 to 4 sentences each.
- **"Is it ADHD, anxiety, depression or my eyes?"** replaces the brief's colon-style H2 so it reads as a question.
- **"Phone in another room"** became "Turn notifications off", because mere presence failed replication and notifications are the supported cost. The metaDescription no longer says "a phone within reach".
- **HushBook in the body before the closing section: once**, in "Why do I read the same page over and over?" (the pain moment). Step 6 and the read-along H2 do not name the app.
- **Table:** one pipe table (pace vs book length). Times for silent reading are our arithmetic from Brysbaert's rates and the word counts in `how-long-is-an-audiobook.md`; LibriVox times are the actual recordings from that post (Gatsby's reader ran at 142 wpm).
- **Moussaoui 2025** wording copied from `are-audiobooks-good-for-adhd.md` ("center", "76 university students", "That study used no audio, so it does not test reading along with an audiobook, but it is a reminder that what helps varies from person to person").
- **Product wording:** "underlined in red", "the page turns as the narrator reads", "Long-press a line to play from there", "Colour highlighting and scrolling are options, off by default", "Focused Reader" profile. No "focus mode", "focus view", "tap any word" or "one tap".
- **Spelling** is mixed British/American (favourite, behaviour, colour; center, generalized), matching the existing posts and the copied ADHD wording.
- **readingTime** `'14 min read'`: 2,996 body words (no H1, Sources or alt text) / 220 = 13.6.
- **FAQ shape:** arrays `[q, a]`, as in every registry entry, though the brief said `{question, answer}`.

## Numbers used and their sources

| Number | Source (status in research-evidence.md) |
|---|---|
| 211 students; 35.6% silent, 50.6% listening | Varao Sousa, Carriere and Smilek 2013 (VERIFIED, PMC full text) |
| 80 undergraduates; 42.3% vs 36.2% | Feng, D'Mello and Graesser 2013 (VERIFIED) |
| 68 reports, more than 10,000 people | Zanesco, Denkova and Jha 2025 (VERIFIED abstract) |
| 48 adults; 6 h or less for 14 days = up to 2 nights | Van Dongen et al. 2003 (VERIFIED abstract) |
| 34 studies, 1,353 people, small effect | Shields, Sazma and Yonelinas 2016 (VERIFIED) |
| 71 studies, 98,299 participants, r = -0.38 | Nguyen et al. 2025 (VERIFIED abstract) |
| eight seconds, no source | Maybin 2017, BBC (VERIFIED) |
| 40 workers, about 12 days, 47 s mean, 40 s median | Mark et al. 2016 (VERIFIED, ACM PDF Table 1) |
| nearly 800 smartphone users | Ward et al. 2017 (VERIFIED, press release) |
| "did not replicate" | Ruiz Pardo and Minda 2022 (VERIFIED abstract; n unverified, stated as not in abstract) |
| 33 studies, 4,368 participants, d = -0.02 | Hartanto et al. 2024 (VERIFIED abstract) |
| 236,270 people; 28% (2004) to 16% (2023) | Bone, Bu, Sonke and Fancourt 2025 (VERIFIED, PMC full text) |
| before age 12; five symptoms; 6 months; two settings | NIMH ADHD (VERIFIED) |
| 2 weeks | NIMH Depression (VERIFIED) |
| 6 months | NIMH GAD (VERIFIED) |
| after age 40 | AAO presbyopia (VERIFIED) |
| four undergraduates, a dozen or more one-hour sessions | Reichle et al. 2010 via APS release (VERIFIED) |
| 25 studies, r = -0.21 | Bonifacci et al. 2023 (VERIFIED abstract) |
| 10% to 15% regressions | Rayner et al. 2016 (VERIFIED) |
| 25% to 50% "good result"; fewer than 5% over 75% | Jellybooks (VERIFIED) |
| 46.4% "slow, boring"; 38.1% always finish | Goodreads 2013 (VERIFIED, infographic) |
| 190 studies, 18,573 participants; 238 / 260 wpm | Brysbaert 2019 (VERIFIED abstract) |
| 151 wpm median of ten; Gatsby 48,032 words, 5 h 38 min; P&P 121,676 words, 13 h 25 min | our count, `content/blog/how-long-is-an-audiobook.md` |
| 18,824 recordings; 7,038 (37.4%) under 3 h; 2,524 (13.4%) under 1 h; median 4.56 h | our count, research-platforms.md 3a, run 2026-11-07 18:33 UTC |
| 65 and 212 autocomplete suggestions | research-platforms.md 3b (Google, signals.json, 2026-11-07) |
| 96 volunteers; 18 to 254 days | Lally et al. 2010 (VERIFIED abstract) |
| 54 studies, 171,055 participants, g = -0.21 | Delgado et al. 2018 (VERIFIED abstract) |
| 30 studies, 1,945 participants, g = 0.18 / 0.41 | Clinton-Lisell 2023 (VERIFIED, ERIC) |
| 26-minute lecture | Pan et al. 2020 (VERIFIED abstract; n not stated) |
| 195 undergraduates | Welhaf et al. 2022 (VERIFIED abstract) |
| 76 university students | Moussaoui et al. 2025 (VERIFIED abstract) |
| 0.5x to 3x; 30-second rewind; 90 s; 2.5 min | app source, research-platforms.md 5.4, 5.5, 5.2a |

Sources listed: 37, all cited in the body. Thirty-six titles are copied from the evidence file's blocks; Wilde (2026), Healthline, comes from research-platforms.md section 2 (the brief named it citable).

## Claims deliberately left out

- The goldfish claim stated as fact; "attention spans have shrunk to 47 seconds"; "23 minutes to refocus"; "phone nearby drains your brain"; "people mind wander 50% of the time while reading"; "reading aloud stops mind wandering"; "21 or 66 days to build a habit" (66 is secondary only); speed-reading or finger-pacer speed claims; "can't focus means ADHD"; "most readers never finish books".
- Mark's 2.5-minute (2004) and 75-second (2012) figures: verified only as her podcast statements, not in a primary paper.
- Lim and Dinges 2010, Smallwood 2009 (mood), Unsworth and McMillan 2013, Parry 2024, Böttger 2023, Hartmann 2020, Franklin's and Ozubko's sample sizes (not in abstracts), NEA 2022, Pew 2022, NAEP 2023, NLT 2025/2026, Lorenz-Spreen 2019, Bradbury 2016, Clinton 2019, Singer and Alexander 2017, Dunlosky 2013, Schiefele's school-age caveat: verified but cut to stay under 3,000 words.
- The brief's 58 and 221 autocomplete counts (did not reproduce) and 18,833 / 7,048 / 2,535 LibriVox counts (superseded by the 2026-11-07 rerun).
- Reddit thread details and the r/Fantasy 792-point thread (not re-checked live).
- Product: no "focus mode", "focus view", no claim that check-ins are free (only the post-session reflection is), no "How was that section?" notification (dead code), no short-book filter in Discover, no plain-text export, Transcribe on my PC stated as Pro.
- The sleep timer was cut from the HushBook steps for length. It is free (5, 10, 15, 30, 45, 60 min, end of chapter) if anyone wants it back.

## PAA caveat

Google blocked the research run, so **no Google People Also Ask or AI Overview was recorded**. Bing showed no PAA box and DuckDuckGo has none. H2 and FAQ wording came from Google autocomplete (signals.json) and the Bing/DuckDuckGo related searches in `paa.md`. Revisit these if Google's PAA differs on publish day:

1. "Why can't my brain focus on reading?" (autocomplete; PAA may prefer "Why can't I concentrate when I read?" or "Why can't I read properly?")
2. "Why can't I focus when I read but I can watch TV or scroll?" (from the brief; no engine showed this exact form)
3. "Is my phone ruining my attention span?" (from the brief; not seen in any engine data)
4. "Is it ADHD, anxiety, depression or my eyes?" (composite; related searches had "eyes won't focus after reading" and "does adhd make reading difficult")
5. "How do I get out of a reading slump?" (Q2 query itself; PAA may add "How long do reading slumps last?", which is an autocomplete phrasing we did not answer)
6. FAQ 4 "Why can't my eyes focus when I read?" and FAQ 1 wording.

## Things I was unsure about

- **Section 1 bullets use studies of lab tasks** (Zanesco, Van Dongen, Shields), not reading. The bullets say what each measured; the post does not claim they are reading studies, but a strict reader could want "in lab tasks" added.
- **"office workers"** for Mark 2016's "information workers at a US tech company".
- **Reflection sheet timing:** "About 90 seconds after a session of 2.5 minutes or more". The 90 s timer starts when the session ends (book change, playback complete, 10-minute pause, or app backgrounded while paused), so in practice it can be longer.
- **"iPhone and Android"** and **"Nothing is uploaded"** follow existing posts and research-platforms.md 5.9.
- **The read-along image** shows *The Hitchhiker's Guide to the Galaxy*, a commercial title, not a LibriVox classic, and the spoken line appears tinted as well as underlined. The text says colour highlighting is off by default, which is true of the app; the image comes from the mockup renders. Flag for the image agent if a LibriVox book and plain text would fit the post better.
- **Healthline (Wilde 2026)** is cited for a tip, not as evidence; its title and URL come from research-platforms.md, not the evidence file.
