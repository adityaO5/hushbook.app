# Research evidence: best Wuthering Heights audiobook (the book, the dialect, read or listen, accents and text)

Post: "Best Wuthering Heights Audiobook" (slug `best-wuthering-heights-audiobook`).

Scope: the book facts the comparison needs (publication, the 1850 respelling of Joseph, our counts), and the evidence block: read or listen, and what helps with an unfamiliar accent or dialect. Editions, narrators, prices, LibriVox and HushBook are in `research-platforms.md`; the counts are repeated here only where the evidence uses them.

All pages were read on November 12, 2026. **VERIFIED** = read today on the page, scan or API named. **REUSED** = verified on 2026-11-11 in `../2026-11-11-best-war-and-peace-audiobook/research-evidence.md` (section (f)) and not re-derived; its DOI was re-resolved in Crossref today with `scripts/wh-crossref-check.py` and returned the same title and journal. **UNVERIFIED** = not confirmed by a page read today. **OUR CALCULATION** = a saved script on a saved text.

How pages were read: curl and the Crossref, OpenAlex, ERIC and Europe PMC APIs; no browser automation for this file. Python ran with `-I`; downloads went into new folders in the session scratchpad (`whe-crossref/`, `wh-gutenberg-dl/`, `wh-gaskell-dl/`, `wh-ia-dl/`, `whp-pdf/`).

No search-volume numbers are cited in this file.

---

## (a) The facts most likely to shape the post

1. **Length, our count:** Project Gutenberg #768 has **116,440 words** in the novel, **34 chapters**. At the site's 151 words a minute: **12 h 51 min at 1x, 10 h 17 min at 1.25x, 8 h 34 min at 1.5x, 6 h 26 min at 2x**. Complete recordings measured today run 11 h 1 min to 14 h 49 min (131 to 176 words a minute, median 151). OUR CALCULATION (`scripts/wh-wordcount.py`).
2. **Two narrators:** Lockwood tells 14.7% of the words (17,103), Nelly Dean 82.3% (95,830), Isabella's letter 3.0% (3,507). Lockwood's opening run (Chapter 1 to Nelly's first words in Chapter 4) is 10,997 words, about 73 minutes. OUR CALCULATION.
3. **Joseph:** 1,814 words of dialect speech in 42 speeches across 13 chapters, **1.56% of the novel, about 12 minutes of listening**; a quarter of his words are Yorkshire forms. OUR CALCULATION, hand-labelled speakers.
4. **Charlotte Brontë respelled Joseph in 1850,** in her own words to her publisher's reader: "It seems to me advisable to modify the orthography of the old servant Joseph's speeches; for though, as it stands, it exactly renders the Yorkshire dialect to a Yorkshire ear, yet, I am sure Southerns must find it unintelligible" (letter of 29 September 1850, in Gaskell's Life). Gutenberg #768, which the free LibriVox recordings read, carries the respelled text. VERIFIED.
5. **Read or listen:** overall, listening and reading comprehension do not reliably differ (Clinton-Lisell 2022, 46 studies), but minds wander most when only listening (Varao Sousa 2013; Kopp and D'Mello 2016, with literary texts). REUSED.
6. **Accent plus text:** seeing the words helps listeners learn an unfamiliar accent. Mitterer and McQueen (2009): Dutch listeners who watched Scottish or Australian English clips with English subtitles later repeated new clips in that accent better; Dutch subtitles made them worse. Knowing the words while hearing hard-to-understand speech speeds learning (Davis et al. 2005) and makes the speech sound clearer (Sohoglu et al. 2012). An unfamiliar native accent costs processing time (Adank et al. 2009; Floccia et al. 2006), and listeners adapt fast (Clarke and Garrett 2004: within a minute). VERIFIED (Crossref plus abstracts; Mitterer and McQueen full text).
7. **What no study tests:** a written dialect such as Joseph's, a 13-hour novel, or a read-along app. Say so.

---

## (b) The book

| Claim | Value | Source | Label |
|---|---|---|---|
| First published | "The first edition, published in 1847, had sold poorly and received indifferent reviews." | Naxos AudioBooks booklet for Wuthering Heights (NAX39712), essay | VERIFIED (publisher booklet) |
| Pen name | "Currer Bell, Ellis Bell and Acton Bell, the supposed authors of the poems which the three sisters published together in 1846, were the pen names of Charlotte, Emily and Anne respectively" | Naxos booklet | VERIFIED (publisher booklet) |
| Second edition, 1850, edited by Charlotte | Charlotte "undertook the task of editing" Wuthering Heights and Agnes Grey for republication (Gaskell, Ch. VIII); the booklet quotes "her 1850 preface to the second edition" | Gaskell, The Life of Charlotte Brontë, Vol. 2 (Gutenberg #1700); Naxos booklet | VERIFIED |
| Charlotte on Joseph's speech | "It seems to me advisable to modify the orthography of the old servant Joseph's speeches; for though, as it stands, it exactly renders the Yorkshire dialect to a Yorkshire ear, yet, I am sure Southerns must find it unintelligible; and thus one of the most graphic characters in the book is lost on them." Letter to Mr. Williams, September 29th, 1850 | Gaskell, Vol. 2, Ch. VIII (Gutenberg #1700, SHA-256 `05ec682e…c7c281`) | VERIFIED |
| Gutenberg #768 = revised spelling | Joseph's first lines in #768 match the 1889 Smith, Elder text ("What are ye for?" … "Go round by th' end o' t' laith, if ye went to spake to him"), not the 1848 Harper text set from the first edition ("Whet are ye for?" … "Goa rahnd by th' end ut' laith, if yah went tuh spake tull him") | archive.org OCR of `wutheringheights04bron` (New York, Harper & Brothers, 1848) and `wutheringheights00bron` (London, Smith, Elder, 1889); Gutenberg #768 | OUR OBSERVATION on one passage, texts VERIFIED |
| Gutenberg #768 file | "Release date: December 1, 1996 [eBook #768] Most recently updated: May 6, 2026", "Credits: David Price"; no edition stated | https://www.gutenberg.org/cache/epub/768/pg768.txt, SHA-256 `e533fe75…5f5c2b9b0d69e981179ea0551bbf134c5e02` | VERIFIED |
| Dialect as social marker | "The outsider Lockwood speaks received English while the servant Joseph speaks the purest form of Yorkshire dialect." | Irene Wiltshire, Brontë Studies 30(1), 19-29 (2005), abstract via OpenAlex | VERIFIED (abstract; full text not read) |
| Why readers struggle (press, 2026) | Teacher quoted: "the terminology, the sentence structure and the density of the prose," plus the "incomprehensible Yorkshire dialect"; professor: "It's told by these unreliable narrators." | TODAY, 2026-02-19 | VERIFIED (quotes as printed) |

Counts (all OUR CALCULATION, `scripts/wh-wordcount.py`; full detail in research-platforms.md sections 3 to 5):

- Word counts: 115,945 whitespace tokens between the Gutenberg markers; **116,440** novel words by the sibling posts' rules (splitting em dashes, without the 34 chapter headings and 9 break lines).
- Chapters: mean 3,425 words; longest Chapter 17 (6,832, 45 minutes at 151 wpm); shortest Chapter 5 (1,414, 9 minutes).
- Lockwood 14.7% / Nelly 82.3% / Isabella's letter 3.0%, with 16 hand-overs.
- Joseph: 42 speeches, 1,814 words, 1.56%, 13 chapters, 25% of his words Yorkshire forms; most in Chapter 13 (401 words) and Chapter 9 (348).
- Names: "Catherine" 379 (two women), "Linton" 404 (Edgar, Isabella, their parents, Linton Heathcliff), "Heathcliff" 475, "Mrs. Heathcliff" 25 (Isabella and the younger Catherine).

---

## (c) Read or listen: the evidence (REUSED, 9 studies)

Text and labels below are carried over from `../2026-11-11-best-war-and-peace-audiobook/research-evidence.md` (f), where each was checked against Crossref, OpenAlex or ERIC on 2026-11-11. Today's Crossref re-check (`scripts/wh-crossref-check.py`) returned the same titles, journals, volumes and pages.

1. **Clinton-Lisell (2022), "Listening Ears or Reading Eyes: A Meta-Analysis of Reading and Listening Comprehension Comparisons", Review of Educational Research 92(4), 543-582 (online 29 Dec 2021). DOI 10.3102/00346543211060871.** REUSED. "Based on robust variance estimation (46 studies; N = 4,687), the overall difference between reading and listening comprehension was not reliably different (g = 0.07, p = .23)." "Reading was beneficial over listening when the reading condition was self-paced (g = 0.13, p = .049)"; inferential questions g = 0.36, literal g = -0.01.
2. **Varao Sousa, Carriere and Smilek (2013), "The way we encounter reading material influences how frequently we mind wander", Frontiers in Psychology 4. DOI 10.3389/fpsyg.2013.00892.** REUSED. "reading aloud led to the least amount of mind wandering, while listening to the passage led to the most mind wandering. Listening to the passage was also associated with the poorest memory performance and the least interest in the material."
3. **Clinton-Lisell (2023), "Does Reading While Listening to Text Improve Comprehension Compared to Reading Only? A Systematic Review and Meta-Analysis", Educational Research: Theory and Practice. ERIC EJ1403866.** REUSED (ERIC record re-read today). "30 eligible studies (total N = 1945) with 62 effect sizes"; "a trivial overall benefit of reading while listening over reading only on comprehension was found g = 0.18"; experimenter-paced "g = 0.41"; self-paced "g = 0.06" (no reliable effect).
4. **Hui and Godfroid (2026; online 12 June 2025), "Listening, Reading, or Both? Rethinking the Comprehension Benefits of Reading-While-Listening", Language Learning 76(1), 311-351. DOI 10.1111/lang.12721.** REUSED. "eighty-six intermediate-to-advanced Chinese learners of English read, read and listened, and listened to different excerpts of a novel… participants comprehended the text less well when reading-while-listening than when reading it silently. Both reading conditions yielded better comprehension than listening-only."
5. **Kopp and D'Mello (2016; online 15 Sept 2015), "The Impact of Modality on Mind Wandering during Comprehension", Applied Cognitive Psychology 30(1), 29-40. DOI 10.1002/acp.3163.** REUSED. Texts "The Red Headed League (Experiment 1 and 2) and Walden (Experiment 3)". "An Audio only condition produced the most mind wandering." Audio + Text and self-paced reading produced equivalent, lower mind wandering in Experiments 1 and 2. No sample sizes in the abstract: do not give one.
6. **Rogowsky, Calhoun and Tallal (2016), "Does Modality Matter? The Effects of Reading, Listening, and Dual Modality on Comprehension", SAGE Open 6(3). DOI 10.1177/2158244016669550.** REUSED. "Ninety-one participants … (digital audiobook, e-text, dual modality)." "No statistically significant differences were found … at Time 1 or Time 2" (two-week retention). Non-fiction chapter.
7. **Richardson et al. (2020), "Engagement in video and audio narratives: contrasting self-report and physiological measures", Scientific Reports 10, 11298. DOI 10.1038/s41598-020-68253-2.** REUSED. "stronger physiological responses were recorded for auditory stories." Audio versus video, not versus print.
8. **Rodero and Lucas (2023; online 28 June 2021), "Synthetic versus human voices in audiobooks: The human emotional intimacy effect", New Media & Society 25(7), 1746-1764. DOI 10.1177/14614448211024142.** REUSED. "listeners enjoyed stories narrated by a human voice more than a synthetic one". Fits the "avoid AI-voice listings" line. No sample size: do not give one.
9. **Murphy et al. (2022; online 22 Nov 2021), "Learning in double time: The effect of lecture video speed on immediate and delayed comprehension", Applied Cognitive Psychology 36(1), 69-82. DOI 10.1002/acp.3899.** REUSED. "minimal costs incurred by increasing video speed from 1x to 1.5x, or 2x speed, but performance declined beyond 2x speed." Lecture videos, not novels.

---

## (d) Accents, dialect and seeing the words (NEW, checked today with `scripts/wh-crossref-check.py`)

**10. Mitterer and McQueen (2009), "Foreign Subtitles Help but Native-Language Subtitles Harm Foreign Speech Perception", PLoS ONE 4(11), e7785. DOI 10.1371/journal.pone.0007785.** VERIFIED (Crossref; abstract via OpenAlex; full text via Europe PMC PMC2775720).
- Abstract: "Dutch participants, unfamiliar with Scottish and Australian regional accents of English, watched Scottish or Australian English videos with Dutch, English or no subtitles, and then repeated audio fragments of both accents. Repetition of novel fragments was worse after Dutch-subtitle exposure but better after English-subtitle exposure. Native-language subtitles appear to create lexical interference, but foreign-language subtitles assist speech learning by indicating which words (and hence sounds) are being spoken."
- Full text, Materials and Methods: "121 participants from the subject pool of the Max Planck Institute for Psycholinguistics participated in the experiment." Clips came from Trainspotting (Scottish) and Kath & Kim (Australian).
- Why it fits: the closest test of "see the words to learn an accent". Same-language text helped. Joseph is written dialect in the listener's own language, so the matching case is "English words with English speech".
- Note: `/blog/audiobooks-with-captions` says "121 Dutch students"; the paper says "121 participants from the subject pool"; "students" is not in the text. Use "121 Dutch participants".

**11. Davis, Johnsrude, Hervais-Adelman, Taylor and McGettigan (2005), "Lexical Information Drives Perceptual Learning of Distorted Speech: Evidence From the Comprehension of Noise-Vocoded Sentences", Journal of Experimental Psychology: General 134(2), 222-241. DOI 10.1037/0096-3445.134.2.222.** VERIFIED (Crossref; abstract via OpenAlex).
- "listeners' reporting improved from near 0% to 70% correct over 30 sentences (Experiment 1). Learning was enhanced if listeners heard distorted sentences while they knew the identity of the undistorted target (Experiments 2 and 3)." "Similar processes may facilitate comprehension of speech in an unfamiliar accent or following cochlear implantation."
- Distorted (vocoded) speech, not dialect; the accent link is the authors' suggestion, not a test.

**12. Sohoglu, Peelle, Carlyon and Davis (2012), "Predictive Top-Down Integration of Prior Knowledge during Speech Perception", Journal of Neuroscience 32(25), 8443-8453. DOI 10.1523/JNEUROSCI.5069-11.2012.** VERIFIED (Crossref; abstract via OpenAlex).
- "We manipulated listeners' prior knowledge of speech content by presenting matching, mismatching, or neutral written text before a degraded (noise-vocoded) spoken word. When speech conformed to prior knowledge, subjective perceptual clarity was enhanced."
- Single degraded words, text shown before the sound; perceived clarity, not comprehension.

**13. Adank, Evans, Stuart-Smith and Scott (2009), "Comprehension of familiar and unfamiliar native accents under adverse listening conditions", Journal of Experimental Psychology: Human Perception and Performance 35(2), 520-529. DOI 10.1037/a0013552.** VERIFIED (Crossref; abstract via OpenAlex).
- "the differences between the native accents influenced the speed of language processing under adverse listening conditions and that this processing speed was modulated by the relative familiarity of the listener with the native accent." The nonnative accent cost more than the unfamiliar native one.
- Which accents (Glaswegian and Standard Southern British English) is not in the abstract: UNVERIFIED here; do not name them.

**14. Floccia, Goslin, Girard and Konopczynski (2006), "Does a regional accent perturb speech processing?", Journal of Experimental Psychology: Human Perception and Performance 32(5), 1276-1293. DOI 10.1037/0096-1523.32.5.1276.** VERIFIED (Crossref; abstract via OpenAlex).
- French regional accents; "regional accent normalization involves a short-term adjustment mechanism that develops as a certain amount of accented signal is available, resulting in a temporary perturbation in speech processing."

**15. Clarke and Garrett (2004), "Rapid adaptation to foreign-accented English", Journal of the Acoustical Society of America 116(6), 3647-3658. DOI 10.1121/1.1815131.** VERIFIED (Crossref; abstract via OpenAlex).
- "processing speed is initially slower for accented speech than for native speech but that this deficit diminishes within one minute of exposure"; "adaptation can occur within as few as two to four sentence-length utterances."
- Foreign (Spanish- and Chinese-) accented English, not regional dialect.

**16. Bradlow and Bent (2008), "Perceptual adaptation to non-native speech", Cognition 106(2), 707-729. DOI 10.1016/j.cognition.2007.04.005.** Title VERIFIED in Crossref; no abstract available in OpenAlex today: findings UNVERIFIED. Do not cite for content.

**17. Wiltshire (2005), "Speech in Wuthering Heights: Joseph's Dialect and Charlotte's Emendations", Brontë Studies 30(1), 19-29. DOI 10.1179/147489304x18821.** VERIFIED (Crossref; abstract via OpenAlex): "In Wuthering Heights regional dialect is used by the author to delineate social class and manners. Each principal character is given a distinctive form of speaking to denote his or her social standing. The outsider Lockwood speaks received English while the servant Joseph speaks the purest form of Yorkshire dialect. In this essay I propose to examine Emily Brontë's use of dialect speech and Charlotte Brontë's response to the dialect passages given to Joseph." Full text not read.

**How to use these in the post (suggested):** the Joseph H2 can say: a short burst of unfamiliar accent slows listeners at first and they adapt within minutes (Clarke and Garrett; Floccia); Joseph's whole part is about 12 minutes spread over 13 chapters, so many listeners never get the minute of steady exposure; seeing the words while hearing them is the one tested aid (Mitterer and McQueen), and knowing the words makes hard speech clearer (Sohoglu) and easier to learn (Davis). Then the read-along line.

## What the evidence does not show

- No study tests a written dialect such as Joseph's, eye-dialect spelling, or Yorkshire specifically.
- No study tests a full novel, a 13-hour listen, or a read-along app; the longest material in (c) is a chapter (Rogowsky) and the accent studies use clips, sentences or single words.
- Mitterer and McQueen tested foreign listeners with subtitles on video; whether a native English listener gains the same from reading Joseph's lines is untested.
- Reading along does not reliably improve comprehension for self-paced adult readers (Clinton-Lisell 2023, g = 0.06) and was worse than silent reading for second-language learners (Hui and Godfroid). Kopp and D'Mello's audio-plus-text result is about mind wandering, not comprehension.
- Davis 2005 and Sohoglu 2012 used noise-vocoded speech, not accents.

---

## (e) Conflicts between sources

1. **Nelly or Nellie:** the Guardian and the Independent write "Nellie"; the text has "Nelly" (89) and "Ellen" (98). Use "Nelly".
2. **121 "students" vs "participants":** site post says students; the paper says "participants from the subject pool". Use "participants".
3. **Publication year:** thebooksinsider gives 1846 (that is the year of the sisters' poems, per the Naxos booklet); the novel is 1847.
4. **Which spelling of Joseph:** first edition (1847, seen in the 1848 Harper reprint) vs Charlotte's 1850 revision (Gutenberg #768, Smith, Elder 1889). Recordings of other editions may use the first-edition spelling; not checked.
5. **Naxos runtime:** Audible 13 hrs 8 mins; Naxos page 13 h 09 m and booklet 13:09:16. Use either with its source.

---

## Sources

Ready to paste. Titles are the pages' own (`<title>` or article headline) as read on 2026-11-12. Owner rule for the last two posts: no en or em dashes in the post, so titles containing one (Guardian, Independent) need the dash replaced by a colon or comma, or the title shortened.

- [Project Gutenberg, "Wuthering Heights by Emily Brontë" (eBook #768)](https://www.gutenberg.org/ebooks/768)
- [Project Gutenberg, plain text of eBook #768](https://www.gutenberg.org/cache/epub/768/pg768.txt)
- [Project Gutenberg, "The Life of Charlotte Brontë, Volume 2 by Elizabeth Cleghorn Gaskell" (eBook #1700)](https://www.gutenberg.org/ebooks/1700)
- [Internet Archive, "Wuthering Heights: a novel" (New York, Harper & Brothers, 1848)](https://archive.org/details/wutheringheights04bron)
- [Internet Archive, "Wuthering Heights" (London, Smith, Elder & Co., 1889)](https://archive.org/details/wutheringheights00bron)
- [Wiltshire (2005), "Speech in Wuthering Heights: Joseph's Dialect and Charlotte's Emendations", Brontë Studies](https://doi.org/10.1179/147489304x18821)
- [Naxos AudioBooks, "Wuthering Heights (unabridged)"](https://naxosaudiobooks.com/wuthering-heights-unabridged/)
- [Naxos AudioBooks, Wuthering Heights booklet (PDF)](https://naxosaudiobooks.com/wp-content/uploads/2020/03/39712_Wuthering_Heights.pdf)
- [LibriVox, "Wuthering Heights (Version 2)"](https://librivox.org/wuthering-heights-by-emily-bronte-2/)
- [LibriVox, "Wuthering Heights"](https://librivox.org/wuthering-heights-by-emily-bronte/)
- [LibriVox, "Wuthering Heights (version 3 dramatic reading)"](https://librivox.org/wuthering-heights-dramatic-reading-by-emily-bronte/)
- [Internet Archive, "Wuthering Heights (Solo Version)"](https://archive.org/details/wuthering_heights_rg_librivox)
- [Warner Bros., "Wuthering Heights"](https://www.warnerbros.com/movies/wuthering-heights)
- [The Guardian, "Wuthering Heights by Emily Brontë audiobook review – Aimee Lou Wood reads the romance of the moment" (Fiona Sturges, 5 February 2026)](https://www.theguardian.com/books/2026/feb/05/wuthering-heights-by-emily-bronte-audiobook-review-aimee-lou-wood-reads-the-romance-of-the-moment)
- [The Independent, "Aimee Lou Wood voices audiobook of Wuthering Heights – here's where to listen" (12 February 2026)](https://www.independent.co.uk/extras/indybest/books/wuthering-heights-audiobook-aimee-lou-wood-b2918366.html)
- [Variety, "'Wuthering Heights' Audiobook, Voiced by Aimee Lou Wood, Sees 440% Increase in Listens Following Trailer Drop" (17 February 2026)](https://variety.com/2026/shopping/news/wuthering-heights-audiobook-aimee-lou-wood-download-online-1236665688/)
- [TODAY, "People Are Re-Reading 'Wuthering Heights.' It Isn't Going Well" (19 February 2026)](https://www.today.com/popculture/books/reading-wuthering-heights-book-trend-rcna259613)
- [Penguin Books UK, "Wuthering Heights" (Penguin Classics, film tie-in, ISBN 9780241819937)](https://www.penguin.co.uk/books/183707/wuthering-heights-by-bronte-emily/9780241819937)
- [Penguin Books UK, "Wuthering Heights" (read by Juliet Stevenson, 161 minutes, ISBN 9780718198763)](https://www.penguin.co.uk/books/183707/wuthering-heights-by-bronte-emily/9780718198763)
- [Audio Publishers Association, "2004 Audie Awards"](https://www.audiopub.org/2004-audies-1)
- [Understanding Joseph's speech in Wuthering Heights (wuthering-heights.co.uk)](https://wuthering-heights.co.uk/josephs-speech.php)
- [Mitterer and McQueen (2009), "Foreign Subtitles Help but Native-Language Subtitles Harm Foreign Speech Perception", PLoS ONE](https://doi.org/10.1371/journal.pone.0007785)
- [Davis, Johnsrude, Hervais-Adelman, Taylor and McGettigan (2005), "Lexical Information Drives Perceptual Learning of Distorted Speech: Evidence From the Comprehension of Noise-Vocoded Sentences", Journal of Experimental Psychology: General](https://doi.org/10.1037/0096-3445.134.2.222)
- [Sohoglu, Peelle, Carlyon and Davis (2012), "Predictive Top-Down Integration of Prior Knowledge during Speech Perception", Journal of Neuroscience](https://doi.org/10.1523/JNEUROSCI.5069-11.2012)
- [Adank, Evans, Stuart-Smith and Scott (2009), "Comprehension of familiar and unfamiliar native accents under adverse listening conditions", Journal of Experimental Psychology: Human Perception and Performance](https://doi.org/10.1037/a0013552)
- [Floccia, Goslin, Girard and Konopczynski (2006), "Does a regional accent perturb speech processing?", Journal of Experimental Psychology: Human Perception and Performance](https://doi.org/10.1037/0096-1523.32.5.1276)
- [Clarke and Garrett (2004), "Rapid adaptation to foreign-accented English", Journal of the Acoustical Society of America](https://doi.org/10.1121/1.1815131)
- [Clinton-Lisell (2022), "Listening Ears or Reading Eyes: A Meta-Analysis of Reading and Listening Comprehension Comparisons", Review of Educational Research](https://doi.org/10.3102/00346543211060871)
- [Varao Sousa, Carriere and Smilek (2013), "The way we encounter reading material influences how frequently we mind wander", Frontiers in Psychology](https://doi.org/10.3389/fpsyg.2013.00892)
- [Clinton-Lisell (2023), "Does Reading While Listening to Text Improve Comprehension Compared to Reading Only? A Systematic Review and Meta-Analysis", Educational Research: Theory and Practice (ERIC EJ1403866)](https://eric.ed.gov/?id=EJ1403866)
- [Hui and Godfroid (2026), "Listening, Reading, or Both? Rethinking the Comprehension Benefits of Reading-While-Listening", Language Learning](https://doi.org/10.1111/lang.12721)
- [Kopp and D'Mello (2016), "The Impact of Modality on Mind Wandering during Comprehension", Applied Cognitive Psychology](https://doi.org/10.1002/acp.3163)
- [Rogowsky, Calhoun and Tallal (2016), "Does Modality Matter? The Effects of Reading, Listening, and Dual Modality on Comprehension", SAGE Open](https://doi.org/10.1177/2158244016669550)
- [Richardson, Griffin, Zaki, Stephenson, Yan, Curry, Noble, Hogan, Skipper and Devlin (2020), "Engagement in video and audio narratives: contrasting self-report and physiological measures", Scientific Reports](https://doi.org/10.1038/s41598-020-68253-2)
- [Rodero and Lucas (2023), "Synthetic versus human voices in audiobooks: The human emotional intimacy effect", New Media & Society](https://doi.org/10.1177/14614448211024142)
- [Murphy, Hoover, Agadzhanyan, Kuehn and Castel (2022), "Learning in double time: The effect of lecture video speed on immediate and delayed comprehension", Applied Cognitive Psychology](https://doi.org/10.1002/acp.3899)

Store pages for the comparison table (Audible, Apple Books, OverDrive, hoopla) are listed in research-platforms.md section 11; label them descriptively, as the War and Peace post did. Internal source for 151 words a minute: `/blog/how-long-is-an-audiobook`.

---

## Do not claim

1. That listening is worse than reading in general (Clinton-Lisell 2022: no reliable overall difference), or that reading along improves comprehension for self-paced adults (Clinton-Lisell 2023: g = 0.06, not reliable).
2. That any study shows reading along helps with Joseph, with Yorkshire dialect, or with a whole novel. Mitterer and McQueen is foreign listeners, video, regional English accents.
3. "121 Dutch students" (say "121 Dutch participants"), or sample sizes for Kopp and D'Mello, Rodero and Lucas, Adank, Floccia, Clarke and Garrett, Davis, or Sohoglu (not taken from the papers today).
4. That Davis 2005 or Sohoglu 2012 tested accents (both used noise-vocoded speech; the accent link is the authors' suggestion in Davis).
5. The accents in Adank et al. 2009 (not in the abstract), or anything from Bradlow and Bent 2008 (abstract not read).
6. That Charlotte "translated" or "removed" Joseph's dialect. She modified its spelling ("modify the orthography") for the 1850 edition.
7. That every edition or recording uses the 1850 spelling: only Gutenberg #768 (and so LibriVox) was checked.
8. That Emily Brontë used the pen name "Ellis Bell" for anything beyond what the booklet says (poems 1846; the 1847 novel is widely credited to Ellis Bell, and TODAY says so; fine to say "published in 1847 under the name Ellis Bell").
9. Joseph shares, counts or chapter totals other than ours (1,814 words, 1.56%, 42 speeches, 13 chapters), or that only Joseph speaks dialect.
10. Wiltshire's argument beyond her abstract.
