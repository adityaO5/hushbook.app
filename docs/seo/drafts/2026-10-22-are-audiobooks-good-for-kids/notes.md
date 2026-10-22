# Notes: "Are Audiobooks Good for Kids? What the Research Says"

Draft prepared 2026-10-22 by the automated weekly SEO run. Not published. Slug: `are-audiobooks-good-for-kids`. Body: about 1,920 words (9 min read).

## Why this topic

### Search Console signal
- No query in the 90-day export or in the Oct 14 to 20 breakdown mentions kids, children, toddlers or babies. This is a new cluster for the site, so there is **no cannibalization risk** with existing pages.
- It extends the "Are audiobooks good for…" series that already exists (dyslexia, ADHD). Google autocomplete for "are audiobooks good for" lists, in order: your brain, **kids**, babies, you, adhd, **toddlers**, sleep, kids with adhd, learning, **children**.
- No new query cluster in this week's data lacked a page. Most new queries were Audible read-along, immersive reading, abridged and sleep variants of existing posts. That is why the topic came from autocomplete and the backlog instead.
- The backlog memory listed "audiobooks for kids" (free/bedtime/age 6/road trip) as a next candidate on 2026-10-21. This draft takes the question-style angle ("are audiobooks good for kids"), not the book-list angle ("audiobooks for kids age 6"), because book-list queries want a catalog HushBook does not sell.

### Topics considered and rejected
- "Is listening to audiobooks good for your brain" (big autocomplete cluster): cannibalizes `/blog/does-listening-to-audiobooks-count-as-reading`, which already has "Is your brain doing something different?" with Deniz 2019.
- "Audiobook transcript" ("audiobook app with transcript", "audible/libby/spotify audiobook transcript"): strong product fit, but overlaps the `/audiobook-with-text` answer page, which already gets "do audiobooks have transcripts".
- "Audiobooks while driving / is it safe": weak product fit (read-along is not for drivers).
- "Audiobooks vs podcasts": weak product fit.
- "Do audiobooks improve vocabulary": overlaps the learn-English post; smaller autocomplete.

### Google autocomplete (curl, `client=firefox&hl=en&gl=us`, 2026-10-22)
- "are audiobooks good for kids": with adhd, with dyslexia, development, learning to read; "are audiobooks beneficial for kids", "are audiobooks ok for kids", "are audiobooks better for kids than tv", "are audiobooks good for toddlers", "are audiobooks good for children"
- "do audiobooks help kids": learn to read, read, sleep, with adhd; "are audiobooks bad for babies"
- "should kids listen to audiobooks": "do kids listen to audiobooks", "should babies listen to audiobooks", "how can kids listen to audiobooks without a phone"
- "audiobooks for kids learning to read": "are audiobooks good for kids learning to read", "do audiobooks help kids learn to read"
- "are audiobooks better than tv": "…for kids", "…for your brain than tv"
- "audiobooks for kids": free, on spotify, youtube, road trip, age 6, bedtime, app, 10 years old (book-list intent, not targeted)

### Competing results (WebSearch, 2026-10-22; not Google's own index)
- "are audiobooks good for kids learning to read": Understood.org (Q&A for a third grader), Novak Djokovic Foundation (thin), Fatherly, Educational App Store, Audiobooks Now (retailer), voxblock.co.uk, Scholastic Parents. Most cite no studies. Fatherly cites one small study.
- "are audiobooks good for kids development": The Boar (student paper, 2020), voxblock, spam/scraped pages, BookTrust (NLT data), AAP Center of Excellence Q&A (the one strong source), an IASL paper.
- "are audiobooks good for toddlers": Epic (vendor), Chirp (vendor list), paperheartfamily blog, scraped spam, a OnePoll parent survey in The Star. No peer-reviewed research.
- "are audiobooks better than tv for kids": The 74 (opinion piece), an undergraduate thesis (TCU, 44 children, books vs TV), Substack comments, a South African newspaper.
- Verdict: a weak SERP. Mostly vendors and thin pages, with the AAP page as the only authoritative competitor. A post with named studies and sample sizes can compete.
- **Not checked:** live Google SERP and People Also Ask. The Playwright browser was not available to this run (connection timeout). H2s were taken from autocomplete phrasing instead. Check PAA in a browser before publishing and adjust H2/FAQ wording if needed.

## Sources and how each was verified

The opus research agent was briefed read-only, primary sources, exact numbers, flag unverified. Then every DOI was checked against `api.crossref.org/works/<doi>` and every ERIC ID against `api.ies.ed.gov/eric/?search=id:<id>`. All titles, authors, years and journals matched what the post cites.

| Source | ID | Title check | Numbers check |
|---|---|---|---|
| Olson, Ozernov-Palchik, Arechiga, Gabrieli (2026), Developmental Science 29(3) | DOI 10.1111/desc.70159 | Crossref ✓ | PMC12995855 full text read in this run: N = 314 (105 / 108 / 101), grades 3 to 4, mean age 9.47, ~8 weeks, Learning Ally "words are highlighted on the screen", ~90 min/week, scaffold = two 30-min 1:1 sessions/week; Audiobooks-only receptive d = 0.15 (n.s.), expressive d = 0.35; Scaffold receptive 0.64, expressive 0.74; no PPVT/WASI effects; poor readers gained only with scaffolding ✓ |
| Takacs, Swart, Bus (2015), Review of Educational Research 85(4) 698 to 739 | DOI 10.3102/0034654314566989 | Crossref ✓ | PMC4647204 read in this run: 43 studies, 57 effects, 2,147 children aged 3 to 10; comprehension g+ = 0.17, expressive vocabulary g+ = 0.20; multimedia-only comprehension g+ = 0.39; interactive features "distracting"; disadvantaged children multimedia g+ = 0.66 ✓ |
| Takacs, Swart, Bus (2014), Frontiers in Psychology 5:1366 | DOI 10.3389/fpsyg.2014.01366 | Crossref ✓ | Europe PMC abstract: 29 studies, 1,272 children, no significant difference vs sharing print with an adult ✓. PMC4253734 full text: 14 studies with an adult comparison (11 researchers, 2 teachers, 1 parents); motivation and socio-emotional outcomes "not investigated" ✓. Age range 3 to 11 from the research agent's reading of the full text (not re-read here). |
| Gough and Tunmer (1986), Remedial and Special Education 7(1) 6 to 10 | DOI 10.1177/074193258600700104 | Crossref ✓ | Model description only, no numbers |
| Hogan, Adlof, Alonzo (2014), Int J Speech-Language Pathology 16(3) 199 to 207 | DOI 10.3109/17549507.2014.904441 | Crossref ✓ | Used only for the qualitative claim that listening comprehension explains more of reading comprehension as decoding matures (agent read PMC4681499) |
| Clinton-Lisell (2023), Educational Research: Theory and Practice 34(3) | ERIC EJ1403866 | ERIC ✓ | ERIC abstract read in this run: 30 studies, N = 1,945, g = 0.18 "trivial overall benefit", self-paced g = 0.06 n.s. ✓ |
| Evans and Saint-Aubin (2005), Psychological Science 16(11) 913 to 920 | DOI 10.1111/j.1467-9280.2005.01636.x | Crossref ✓ (Crossref title is the short form "What Children Are Looking at During Shared Storybook Reading"; the post adds the subtitle "Evidence From Eye Movement Monitoring" from the research agent; confirm on the journal page) | Europe PMC abstract read: two studies, child on mother's or teacher's lap, "spent very little time examining the print" ✓. **Sample sizes not stated in the abstract; the post gives none.** |
| Justice, Pullen, Pence (2008), Developmental Psychology 44(3) 855 to 866 | DOI 10.1037/0012-1649.44.3.855 | Crossref ✓ | Europe PMC abstract read: 44 preschoolers, "about 5%-6% of their fixations allocated to print", rises with verbal and nonverbal print references ✓ |
| Liao, Chang, Huang, Sung (2020), Computers & Education 144:103703 | DOI 10.1016/j.compedu.2019.103703 | Crossref ✓ | Abstract via NTNU repository (WebSearch summary): 61 children aged 4 to 5, "more than 19%" on print with equal areas, highlight synchronization raised it to 38%, four weeks of highlight or print discussion improved print awareness ✓. Full text not read. |
| Mol, Bus, de Jong, Smeets (2008), Early Education and Development 19(1) | ERIC EJ787378 | ERIC ✓ | ERIC abstract read in this run: 16 studies; expressive vocabulary k = 9, n = 322, d = 0.59; smaller for 4 to 5 year olds and at-risk children ✓ |
| Kuhl, Tsao, Liu (2003), PNAS 100(15) 9096 to 9101 | DOI 10.1073/pnas.1532872100 | Crossref ✓ | Europe PMC abstract read: 9-month-olds, 12 sessions, recorded Mandarin "without interpersonal interaction, had no effect" ✓ |
| Hutton et al. (2019), Brain Connectivity 9(7) 580 to 592 | DOI 10.1089/brain.2019.0679 | Crossref ✓ | Europe PMC abstract read: 27 of 33 completed fMRI, mean 58 ± 8 months, fixed order audio → illustrated → animated, comprehension equal audio and illustrated, lower for animation ✓ |
| Hutton et al. (2020; online 2018), Brain Imaging and Behavior 14(1) 130 to 141 | DOI 10.1007/s11682-018-9985-y | Crossref ✓ | Europe PMC abstract read: language network strain lower with illustration than audio; between-network connectivity lower for animation ✓ |
| AAP Center of Excellence Q&A, "Audiobooks, audio players and child development", updated 04/21/2026 | URL | Page fetched in this run ✓ | Quotes used, all confirmed verbatim: "audio narration is not a perfect substitute for parental co-reading"; "Avoid relying on audiobooks and audio players as a replacement for co-reading physical ones"; Toniebox/Yoto "haven't been studied" / "can provide children a positive, independent activity"; "useful tools for a screen-free mental refocus"; "high-quality, slow-paced content" ✓ |
| AAP Council on Communications and Media (2016), "Media and Young Minds", Pediatrics 138(5) e20162591 | DOI 10.1542/peds.2016-2591 | Crossref ✓ | Europe PMC abstract: covers "television, videos, and mobile/interactive technologies" for ages 0 to 5. The post claims only that it does not address audio-only stories ✓. Specific time limits were deliberately left out (full text returned 403). |
| Best, Clark, Picton (2020), NLT, "Children, young people and audiobooks before and during lockdown" | URL | Report page found via WebSearch ✓ | 58,346 aged 9 to 18 (Jan to Mar 2020), 16.3% listen; 4,141 aged 8 to 18 in lockdown, 23.4% listened more; 52.9% of listeners said it increased interest in reading; commissioned by the Publishers Association ✓ (report page text via WebSearch; the PDF was not opened) |
| National Literacy Trust (2025), "Children and young people's listening in 2024" | URL | Report page found via WebSearch ✓ | 37.5% "sparked their interest in reading books"; 42.3% enjoy listening vs 34.6% reading; first time since 2020 ✓. Base: more than 37,000 8 to 18 year olds who listen to audio (the research agent and WebSearch agree). |

### Claims checked but left out
- Shany and Biemiller (1995, ERIC EJ508080): verified title, but the sample size is not in the abstract.
- Chomsky (1976, ERIC EJ141119) "talking books": verified title. The commonly quoted "five third graders" detail is unverified.
- Elley (1989) 15% and 40% vocabulary gains: only partly verified (the 40% figure has no primary source).
- Bus, van IJzendoorn, Pellegrini (1995) d = 0.59: the effect size came only from secondary summaries.
- Valkenburg and Beentjes (1997), radio vs TV imagination with 64 children: abstract only partly verified.
- NLT 2020 "70.8% use their imagination more than when watching videos": confirmed only by the research agent, not re-checked.
- Sticht and James (1984) "listening outpaces reading until grades 6 to 8": known only from secondary quotations.
- The AAP 2016 screen-time limits (no screens under 18 months, 1 hour a day for ages 2 to 5): the full text was not reachable.
- The HealthyChildren.org "cap at 1 hour" quote: the page could not be confirmed, so it was removed.

## Product claims (all from the live site, fetched 2026-10-22, or the app strings)
- "Every word lights up with the narrator. Tap any word to jump there." (hushbook.app home)
- Transcription on your phone, works offline after a one-time engine download, no account (home).
- Built-in catalogue of public-domain audiobooks from LibriVox and the Internet Archive (home). *Alice's Adventures in Wonderland* is on LibriVox (already used in `/blog/how-long-is-an-audiobook`).
- Playback speed can be decreased (`playbackSpeedDecrease` in `D:\hushbook\lib\l10n\app_en.arb`). The post says "slow the narration down" without naming a minimum speed.
- Limits stated: built for older readers, not a children's app; reading aid, not instruction or therapy; speech recognition errors on unusual names; no Audible or other protected imports.
- Not claimed: parental controls, a kids' section in the store, age ratings. The app has a "Children" genre label (`genreChildren`), but this run did not confirm that the store exposes it as a filter, so the post does not mention it.

## Soft upsell placement
- Body hint (one sentence, at the pain point): end of "Do kids look at the words while they listen?". Most audiobooks give the child nothing to read; a highlighting app puts the print back.
- Closing "Reading along with HushBook" section, with honest limits.
- `cta`: "Let them see the words they hear".

## Checks run (python, `make_entry.py`)
- H1 equals the title ✓
- metaTitle 52 ≤ 60; metaDescription 154 ≤ 160; description 235 ≤ 240 ✓
- 8 keywords, 5 takeaways, 6 FAQs ✓
- No en or em dashes in the post or registry text; no markdown table lines ✓
- 6 internal links: dyslexia, ADHD, count-as-reading, free audiobooks, immersive reading, home ✓

## Before publishing
1. Check the live Google SERP and People Also Ask for "are audiobooks good for kids" in a browser, and align one or two H2s or FAQs with the exact PAA wording.
2. Confirm the Evans and Saint-Aubin subtitle on the journal page.
3. Optional: add a screenshot of the read-along view with a children's classic.
