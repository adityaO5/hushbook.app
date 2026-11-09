# Research evidence: "Can Kindle Read to You?" (2026-11-09)

- **Date:** 2026-11-09. **Scope:** research studies and statistics only. Amazon, Apple and Google help pages are not covered here.
- **Method:** I checked every DOI against `api.crossref.org/works/<doi>` and copied the title, authors, year and journal from the JSON. Abstracts came from Europe PMC (`resultType=core`), the ERIC API, OpenAlex or Crossref. Full text came from the NCBI BioC API (PMC articles), Springer and Frontiers pages, and the official statistics pages, all fetched on 2026-11-09.
- **Status labels:** **VERIFIED** means I read the text quoted, and each entry says whether that was the abstract or the full text. **UNVERIFIED** means only the title, DOI or a secondary citation could be checked.
- **Could not reach:** ScienceDirect, Wiley, SAGE, T&F and ACM full texts (403 or bot check). Also unreachable: the UPF repository (Anubis bot check, which blocked the Rodero full text) and DiVA (connection refused, which blocked the Dylman full text). Europe PMC `fullTextXML` returned HTTP 500 all session. PMC HTML pages and IDA through WebFetch returned 403, but IDA worked through curl. CDC worked through WebFetch only, not curl.
- **Year rule:** the year given is the journal-issue year. When the article was online first, the online year is noted.

---

## 1. Synthetic (text-to-speech) voice vs human narration

**What the evidence says:** older studies found a clear human-voice advantage. Since 2019, studies with modern voices find little or no difference in learning or ratings. Two studies on stories still favour the human voice for enjoyment, engagement and immediate recall. No study tests a whole book.

- **Mayer (2017), Journal of Computer Assisted Learning.** VERIFIED (abstract). The review lists the "voice" principle among principles for generative processing with a median **d = 0.74**. The principle holds that people learn better from a human voice than a machine voice. The abstract does not give the number of comparisons. The underlying experiments used early-2000s synthetic voices.
  - Suggested sentence: "Richard Mayer's 2017 review put the median benefit of a human voice over a machine voice at d = 0.74, based on experiments run with early-2000s synthetic voices."
- **Mayer, Sobko and Mautone (2003), Journal of Educational Psychology.** VERIFIED (abstract). Students watched a narrated animation about lightning. With a human voice rather than a machine-synthesized one (Experiment 2), they did better on the transfer test and rated the speaker more positively. Retention results were mixed. n is not reported in the abstract.
- **Craig and Schroeder (2017), "Reconsidering the voice effect when learning from a virtual human", Computers & Education 114, 193-205.** UNVERIFIED. The title and DOI are confirmed by Crossref, but the publisher hides the abstract and the full text returned 403. Do not cite its findings or n.
- **Craig and Schroeder (2019), Journal of Educational Computing Research.** VERIFIED (abstract, Crossref and ERIC EJ1225297). This was a randomized pretest-posttest study of an instructional animation narrated by an older TTS engine, a modern TTS engine or a recorded human voice. Learners who heard the modern engine "were not statistically different in regard to their perceptions, learning outcomes, or cognitive efficiency measures compared with those who learned from the recorded human voice". n is not reported in the abstract.
  - Suggested sentence: "In a 2019 experiment, Craig and Schroeder found that students taught by a modern text-to-speech voice learned about as well as those taught by a recorded human voice."
- **Chiou, Schroeder and Craig (2020), Computers & Education.** VERIFIED (abstract via Semantic Scholar). In an online study of a virtual human, "voice quality did not significantly influence learning, but it did influence trust and learners' other perceptions". n is not reported in the abstract.
- **Cambre, Colnago, Maddock, Tsai and Kaye (2020), CHI 2020.** VERIFIED (abstract). The study tested voices for long-form content, defined as "voices that are pleasant to listen to for several minutes at a time". It covered **18 TTS voices, 3 human voices and a text-only control**, measuring listening experience, clarity and quality, and comprehension. Finding: "TTS voices are close to rivaling human voices, yet no single voice outperforms the others across all evaluation dimensions."
  - Crossref stores only the main title, "Choice of Voices". The subtitle is taken from dblp and the Mozilla listing.
  - From the companion Mozilla blog post (7 May 2020, VERIFIED, not peer reviewed): "50 people on Mechanical Turk listen to each recording". The best synthetic voices included Amazon's "Polly Neural voices". The "default (American) iOS female voice is pretty far to the right" on the chart, meaning it was rated low, and "some of our human voices were being rated lower than some of the robot voices."
- **Rodero and Lucas (2023; online 2021), New Media & Society.** VERIFIED (abstract). Listeners heard stories told by human and synthetic voices. With the human voice they "enjoyed stories ... more", "created more mental images, were more engaged, paid more attention, had a more positive emotional response, and remembered more information". The authors conclude that using synthetic voices "to narrate long stories, such as audiobooks do, is difficult". The voice engine and n are not in the abstract, and the full text was blocked.
  - Suggested sentence: "In a 2023 study of audiobook-style stories, Rodero and Lucas found that listeners enjoyed a human narrator more and remembered more of what it told them than a synthetic voice."
- **Dylman, Glarén Diaz, Blysa and Jansson (2025), Cogent Psychology.** VERIFIED (abstract). Participants heard narrated texts in natural speech, synthesised speech and two manipulated-prosody conditions, then answered multiple-choice questions immediately and one week later. Natural speech "led to better memory retention compared to the other conditions in the immediate recall, but no differences between the conditions were found one week later". n and the engine are not in the abstract, and the full text was unreachable.
  - Suggested sentence: "A 2025 study found a human voice helped people remember a text right after listening, but the advantage had gone a week later."
- **Ahrens-Schwabe, Kosch, Stocker and Boomgaarden (2026), Computers in Human Behavior Reports.** VERIFIED (abstract). Self-identified audiobook listeners rated literary audiobook excerpts performed by AI voices or professional human voice actors. "Differences in listener evaluations between AI-generated and human voices were minute." Knowing or expecting that a voice was AI did not change ratings. The authors conclude that AI voices "currently function as a viable substitute". The study measured evaluations, not comprehension. n is not in the abstract (full text 403).
- **Paris, Thomas, Gilson and Kincaid (2000), Human Factors.** VERIFIED (abstract). Participants recalled sentences spoken by a human or by one of two synthesizers. "Inappropriate prosodic modeling in synthetic speech was the major source of a performance differential." Missing prosodic cues add a working-memory burden that "may exceed its capacity, particularly in time-limited, demanding tasks." n is not reported in the abstract.
- **Duffy and Pisoni (1992), Language and Speech.** VERIFIED (abstract). Review: rule-based synthetic speech delays word recognition, which "affects not only lexical access but also comprehension processes". The language system changes "as its familiarity with synthetic speech increases", which means listeners adapt. This is a review with no single n.
- **Francis and Nusbaum (2009), Attention, Perception, & Psychophysics.** VERIFIED (abstract). Across three experiments: "Understanding low-intelligibility speech is effortful." Training raised the intelligibility and recognition speed of synthetic speech, and higher working-memory load slowed recognition. n is not reported in the abstract.
- **Ibelings, Brand and Holube (2022), Trends in Hearing.** VERIFIED (abstract and full text via BioC). German everyday sentences in noise were read by a neural TTS (Acapela DNN) or the natural recording. With TTS the speech-recognition threshold improved by about 1.2 dB. Verbal response times were "comparable for all speakers, suggesting no difference in listening effort". 25 participants finished online and 3 were excluded for unusable audio. These are single sentences, not narrative.
- **Wood, Moxley, Tighe and Wagner (2018)** (full entry in section 2). VERIFIED (full text). They coded "type of oral modality (synthesized text-to-speech, human readers, recorded human voice)" as a moderator, and it was **not significant**: for students with reading disabilities, a synthetic voice did as well as a human one in that dataset.

**Do modern neural voices close the gap?** For learning tests and listener ratings of short material, mostly yes: Craig and Schroeder 2019, Chiou 2020, Cambre 2020, Ahrens-Schwabe 2026 and the Wood moderator. For stories, Rodero and Lucas 2023 and Dylman 2025 still found human advantages in enjoyment, engagement and immediate recall. Dylman's advantage faded by one week.

## 2. Hearing text read aloud while seeing it

- **Wood, Moxley, Tighe and Wagner (2018), Journal of Learning Disabilities 51(1), 73-84.** VERIFIED (abstract via ERIC EJ1164251, full text via BioC PMC5494021). Meta-analysis of **22 studies**, students in grade 3 and up with reading disabilities. Effect of TTS and read-aloud tools on reading comprehension: **d̄ = .35, 95% CI [.14, .56], p < .01**. The paper's d̄ is Hedges g, so the site's "g = 0.35" is correct.
  - Trim-and-fill adjusted value: d̄ = .24, 95% CI [.02, .45].
  - Between-subject studies d̄ = .61; within-subject studies d̄ = .15 (not significant).
  - Total N is not stated in the text I read.
  - Confirms the existing site citation.
- **Perelmutter, McGregor and Gordon (2017), Computers & Education.** VERIFIED (full text via BioC PMC5736156). Meta-analysis of assistive technology for adolescents and adults with learning disabilities. TTS out of **13 unique studies**: "overall effect was small (Hedges' g) of 0.445 (p = 0.06)", falling to 0.167 (p = 0.094) without one outlier. TTS "tended to hinder students who had relatively high baseline reading ability".
  - Suggested sentence: "For adults, the evidence is thinner: a 2017 meta-analysis found only a small, not quite significant benefit (g = 0.445), and text-to-speech tended to hinder people who already read well."
- **Clinton-Lisell (2023), Educational Research: Theory and Practice 34(3), 133-155.** VERIFIED (ERIC EJ1403866 abstract; no DOI). The study exists and the title on the site is correct. Reading while listening vs reading only: **30 studies, total N = 1,945, 62 effect sizes**.
  - Overall **g = 0.18**, SE = 0.07, p = 0.01, described as "trivial".
  - Experimenter-paced reading: **g = 0.41**, 95% CI [0.13, 0.70].
  - Self-paced reading: **g = 0.06**, 95% CI [-0.07, 0.19], p = 0.34, "no reliable effects".
- **Clinton-Lisell (2022), Review of Educational Research 92(4), 543-582 (online Dec 2021).** VERIFIED (abstract). Reading vs listening: **46 studies, N = 4,687**, overall g = 0.07 (p = .23), "not reliably different".
  - Reading beat listening when self-paced: g = 0.13 (p = .049).
  - Reading also beat listening on inferential comprehension: g = 0.36.
- **Hui and Godfroid (2026; online 12 June 2025), Language Learning 76(1), 311-351.** VERIFIED (abstract). The study exists and the title is confirmed. It is a registered report with a within-participant design: **86** intermediate-to-advanced Chinese learners of English read, read while listening, and listened to different excerpts of a novel. They "comprehended the text less well when reading-while-listening than when reading it silently"; both reading conditions beat listening only. The abstract gives no effect sizes (Wiley full text 403).
  - Year note: the site currently cites it as 2025. Crossref "issued" is 2025, but the journal issue is 2026. Pick one convention site-wide.
- **Buzick and Stone (2014), Educational Measurement: Issues and Practice.** VERIFIED (abstract). In a meta-analysis of the read-aloud test accommodation, read-aloud raised reading test scores for students with and without disabilities, "but more so for students with disabilities". The abstract gives no numbers. Optional.
- **No newer (2019 to 2026) TTS meta-analysis for struggling or general readers was found** in Crossref, ERIC or Europe PMC.

## 3. Listening while doing something else

- **Varao Sousa, Carriere and Smilek (2013), Frontiers in Psychology.** VERIFIED (full text, Frontiers). 211 University of Waterloo students were analysed in two samples (106 and 105). Each heard or read ~1,800-word Bill Bryson excerpts. Minds wandered at **0.506** of probes while listening vs **0.356** when reading silently, and least when reading aloud. Listening also gave the poorest memory on a 10-item true/false test.
  - Suggested sentence: "When Varao Sousa and colleagues probed 211 students, minds wandered at about half of the check-ins while listening, against about a third during silent reading."
- **Strayer and Johnston (2001), Psychological Science.** VERIFIED (abstract). In a driving simulator, "Performance was not disrupted by listening to radio broadcasts or listening to a book on tape". Phone conversations, by contrast, doubled missed signals. n is not reported in the abstract.
- **Nowosielski, Trick and Toxopeus (2018), Accident Analysis & Prevention.** VERIFIED (abstract). In a simulator, listening to an audiobook gave faster braking to hazards on a simple road. On a complex road, secondary tasks such as audiobooks were "especially deleterious". n is not reported in the abstract.
- **Bak, Arnold, Darakjian, Pichora-Fuller, Russo and Campos (2025), PLOS One.** VERIFIED (abstract). The sample was 24 older drivers (mean age 68.29) and 24 younger drivers (mean age 26.42). Results:
  - Only older adults lost listening accuracy when listening while driving, mostly in city driving.
  - Both groups' lane keeping got worse, most in city driving with harder listening.
- **Chen, Kumar, Varkhedi and Murphy (2024), Educational Psychology Review, Experiment 4.** VERIFIED (full text, Springer). 222 undergraduates watched lecture clips with or without on-screen phone calls, texts and notifications. Comprehension with distractions was M = 0.50 vs 0.52 without, F(1, 214) = 1.03, p = 0.312. These were screen distractions, not chores or driving.
- **Audio Publishers Association (2026), consumer survey.** VERIFIED (page). Listeners cite "the ability to multitask (86%) and to listen on-the-go (84%) as the top benefits." This is a survey of 1,020 audiobook listeners, not an experiment.

## 4. Speed: reading rate, narrator pace and sped-up listening

- **Brysbaert (2019), Journal of Memory and Language 109, 104047.** VERIFIED (abstract). **190 studies (18,573 participants)**: adult silent reading in English averages **238 wpm for non-fiction and 260 wpm for fiction**.
  - Oral reading averages **183 wpm** (77 studies, 5,965 participants).
  - Most adults read non-fiction at 175 to 300 wpm and fiction at 200 to 320 wpm.
  - Reading rates "are in line with maximum listening speed".
- **ACX (Amazon's audiobook marketplace) help page.** VERIFIED (page). "On average, most performers narrate about 9,300 words per hour." That works out to 155 wpm, about two-thirds of the silent reading rate for fiction.
- **Murphy, Hoover, Agadzhanyan, Kuehn and Castel (2022; online Nov 2021), Applied Cognitive Psychology 36(1), 69-82.** VERIFIED (abstract). Lecture videos were tested immediately and one week later. Results showed "minimal costs incurred by increasing video speed from 1x to 1.5x, or 2x speed, but performance declined beyond 2x speed." n is not reported in the abstract. Kuehn is a fifth author, so the brief's four-author list was incomplete.
- **Murphy, Hoover and Castel (2023), Memory.** VERIFIED (abstract). Younger adults kept their memory of a lecture at faster speeds; "older adults' test performance is generally impaired when watching at faster speeds". Faster speeds reduced mind-wandering. n is not reported in the abstract.
- **Chen, Kumar, Varkhedi and Murphy (2024), Educational Psychology Review 36(3), art. 79.** VERIFIED (full text). **Experiment 1 was audio only**: AAAS Science Podcast clips at 1x (n = 50), 1.5x (n = 54), 2x (n = 50) and 2.5x (n = 46) for UCLA undergraduates. There was "no significant effect of speed", F(3, 219) = 2.40, p = 0.069. In Experiment 2 (n = 200):
  - Audio plus visuals scored M = 0.56 against M = 0.49 for audio only.
  - 1x vs 2x was not significant (M = 0.55 vs 0.51).
  - Audio only at 2x scored about 12% below audio-visual at 1x (p_tukey = .005).
  - The authors "still do not advise exceeding 2x speed".
- **Tharumalingam, Roberts, Fawcett and Risko (2025), Educational Psychology Review 37(2), art. 35.** VERIFIED (abstract, Springer). Meta-analysis of **24 studies, 110 effect sizes**: faster lecture playback "can negatively impact content test performance, but this cost is small (and often non-significant) for speeds 1.5 x and slower." n is not reported in the abstract.
  - Suggested sentence: "A 2025 meta-analysis of 24 studies found that speeding up lectures costs a little comprehension, and the cost stays small up to 1.5x."
- **Foulke and Sticht (1969), Psychological Bulletin 72(1), 50-62.** UNVERIFIED for content: Crossref confirms the title, but there is no abstract or full text. The often-quoted ceiling of **275 wpm** is confirmed only as cited by Chen et al. (2024): "speeds that surpass what the phonological loop ... can handle (275 words per minute; see Foulke & Sticht, 1969)". If used, cite it through Chen et al.

## 5. Scale facts

- **Pew Research Center, "Americans still opt for print books over digital or audio versions; few are in book clubs" (William Bishop, 9 April 2026).** VERIFIED (page fetched 2026-11-09). The survey ran Oct 6-16, 2025, with **n = 8,046** US adults. In the past 12 months:
  - **26%** listened to an audiobook (11% in 2011).
  - **31%** read an e-book (17% in 2011).
  - **64%** read a print book.
  - **75%** read all or part of at least one book.
  - Also: "41% of adults under 30 say they've read an e-book in the past 12 months."
- **Audio Publishers Association, sales and consumer surveys (press release, 5 June 2026).** VERIFIED (audiopub.org/surveys). Sales:
  - "audiobook sales revenue ... reaching **$2.43 billion in 2025, 9%** over the previous year". The sales survey was run by Toluna.
  - "Only **16%** of Audiobook Listeners have listened to an AI-voiced audiobook, and AI sales revenue amounted to **.03%** in 2025."
  - Willingness to try AI-narrated audiobooks fell "from 70% in 2025 to 61% in 2026".

  Consumer survey (Edison Research, online, February 2026, **n = 1,706** spoken-word listeners aged 18+, 1,020 of them audiobook listeners):
  - "58% of Americans age 18+ have listened to an audiobook" (estimated 157 million).
- **AAP StatShot, December 2025 (released 11 February 2026).** VERIFIED (publishers.org). For 2025, trade revenue was **$9.8 billion** (down 0.5%), eBook revenue **$1 billion** (down 0.3%) and Digital Audio **$1 billion** (up 2.1%).
  - From these figures, ebooks are about one-tenth of US trade publisher revenue. That is my arithmetic, not an AAP statement.
- **Kindle-specific share:** no reliable public source was found. Amazon does not publish Kindle unit or user counts, so do not state a Kindle share.

## 6. Vision and reading accessibility

- **WHO fact sheet "Blindness and vision impairment" (dated 10 February 2026, fetched 2026-11-09).** VERIFIED. Quotes:
  - "Globally, at least 2.2 billion people have a near or distance vision impairment."
  - "For at least 1 billion of these people, vision impairment could have been prevented or is yet to be addressed."
  - "The main condition causing near vision impairment is presbyopia (826 million)."
  - "most people with vision impairment and blindness are over the age of 50 years."
- **CDC "Fast Facts: Vision Loss" (page date 15 May 2024; read via WebFetch on 2026-11-09, curl returned 403).** VERIFIED. Quotes:
  - "Approximately 7 million people in the United States have vision impairment." "This includes 1 million with blindness."
  - "As of 2012, 4.2 million Americans aged 40 or older have uncorrectable vision impairment." "This number is predicted to more than double by 2050."
- **NEI:** not fetched this session.
- **International Dyslexia Association, "Dyslexia Basics" (fetched 2026-11-09).** VERIFIED. Quote: "many more people— perhaps as many as 15–20% of the population as a whole—have some of the symptoms of dyslexia, including slow or inaccurate reading, poor spelling, poor writing, or mixing up similar words." The same page puts students classified with a learning disability at 6-7%, "About 85%" of whom have a primary reading and language disability.
- **Yang, Li, Li, Zhai, An et al. (2022), Brain Sciences 12(2), 240.** VERIFIED (abstract). Pooled prevalence of developmental dyslexia in primary school children was **7.10% (95% CI 6.27-7.97%)**: boys 9.22%, girls 4.66%. The authors note that most studies were small and used diverse definitions.
- **NIH:** no NIH prevalence page was fetched.

---

## Sources

- [Mayer (2017), "Using multimedia for e-learning", Journal of Computer Assisted Learning](https://doi.org/10.1111/jcal.12197)
- [Mayer, Sobko and Mautone (2003), "Social cues in multimedia learning: Role of speaker's voice", Journal of Educational Psychology](https://doi.org/10.1037/0022-0663.95.2.419)
- [Craig and Schroeder (2019), "Text-to-Speech Software and Learning: Investigating the Relevancy of the Voice Effect", Journal of Educational Computing Research](https://doi.org/10.1177/0735633118802877)
- [Chiou, Schroeder and Craig (2020), "How we trust, perceive, and learn from virtual humans: The influence of voice quality", Computers & Education](https://doi.org/10.1016/j.compedu.2019.103756)
- [Cambre, Colnago, Maddock, Tsai and Kaye (2020), "Choice of Voices: A Large-Scale Evaluation of Text-to-Speech Voice Quality for Long-Form Content", Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems](https://doi.org/10.1145/3313831.3376789)
- [Rodero and Lucas (2023), "Synthetic versus human voices in audiobooks: The human emotional intimacy effect", New Media & Society](https://doi.org/10.1177/14614448211024142)
- [Dylman, Glarén Diaz, Blysa and Jansson (2025), "The effect of prosody on listening comprehension: Immediate and delayed recall", Cogent Psychology](https://doi.org/10.1080/23311908.2025.2576785)
- [Ahrens-Schwabe, Kosch, Stocker and Boomgaarden (2026), "Who cares about artificial intelligence? Human and artificial voices in audiobooks", Computers in Human Behavior Reports](https://doi.org/10.1016/j.chbr.2026.101068)
- [Paris, Thomas, Gilson and Kincaid (2000), "Linguistic Cues and Memory for Synthetic and Natural Speech", Human Factors](https://doi.org/10.1518/001872000779698132)
- [Duffy and Pisoni (1992), "Comprehension of Synthetic Speech Produced by Rule: A Review and Theoretical Interpretation", Language and Speech](https://doi.org/10.1177/002383099203500401)
- [Francis and Nusbaum (2009), "Effects of intelligibility on working memory demand for speech perception", Attention, Perception, & Psychophysics](https://doi.org/10.3758/APP.71.6.1360)
- [Ibelings, Brand and Holube (2022), "Speech Recognition and Listening Effort of Meaningful Sentences Using Synthetic Speech", Trends in Hearing](https://doi.org/10.1177/23312165221130656)
- [Wood, Moxley, Tighe and Wagner (2018), "Does Use of Text-to-Speech and Related Read-Aloud Tools Improve Reading Comprehension for Students With Reading Disabilities? A Meta-Analysis", Journal of Learning Disabilities](https://doi.org/10.1177/0022219416688170)
- [Perelmutter, McGregor and Gordon (2017), "Assistive technology interventions for adolescents and adults with learning disabilities: An evidence-based systematic review and meta-analysis", Computers & Education](https://doi.org/10.1016/j.compedu.2017.06.005)
- [Clinton-Lisell (2023), "Does Reading While Listening to Text Improve Comprehension Compared to Reading Only? A Systematic Review and Meta-Analysis", Educational Research: Theory and Practice](https://eric.ed.gov/?id=EJ1403866)
- [Clinton-Lisell (2022), "Listening Ears or Reading Eyes: A Meta-Analysis of Reading and Listening Comprehension Comparisons", Review of Educational Research](https://doi.org/10.3102/00346543211060871)
- [Hui and Godfroid (2026), "Listening, Reading, or Both? Rethinking the Comprehension Benefits of Reading-While-Listening", Language Learning](https://doi.org/10.1111/lang.12721)
- [Buzick and Stone (2014), "A Meta-Analysis of Research on the Read Aloud Accommodation", Educational Measurement: Issues and Practice](https://doi.org/10.1111/emip.12040)
- [Varao Sousa, Carriere and Smilek (2013), "The way we encounter reading material influences how frequently we mind wander", Frontiers in Psychology](https://doi.org/10.3389/fpsyg.2013.00892)
- [Strayer and Johnston (2001), "Driven to Distraction: Dual-Task Studies of Simulated Driving and Conversing on a Cellular Telephone", Psychological Science](https://doi.org/10.1111/1467-9280.00386)
- [Nowosielski, Trick and Toxopeus (2018), "Good distractions: Testing the effects of listening to an audiobook on driving performance in simple and complex road environments", Accident Analysis & Prevention](https://doi.org/10.1016/j.aap.2017.11.033)
- [Bak, Arnold, Darakjian, Pichora-Fuller, Russo and Campos (2025), "Dual-task costs of listening while driving in older and younger adults", PLOS One](https://doi.org/10.1371/journal.pone.0324657)
- [Brysbaert (2019), "How many words do we read per minute? A review and meta-analysis of reading rate", Journal of Memory and Language](https://doi.org/10.1016/j.jml.2019.104047)
- [Murphy, Hoover, Agadzhanyan, Kuehn and Castel (2022), "Learning in double time: The effect of lecture video speed on immediate and delayed comprehension", Applied Cognitive Psychology](https://doi.org/10.1002/acp.3899)
- [Murphy, Hoover and Castel (2023), "The effect of video playback speed on learning and mind-wandering in younger and older adults", Memory](https://doi.org/10.1080/09658211.2023.2198264)
- [Chen, Kumar, Varkhedi and Murphy (2024), "The Effect of Playback Speed and Distractions on the Comprehension of Audio and Audio-Visual Materials", Educational Psychology Review](https://doi.org/10.1007/s10648-024-09917-7)
- [Tharumalingam, Roberts, Fawcett and Risko (2025), "Increasing Video Lecture Playback Speed Can Impair Test Performance – a Meta-Analysis", Educational Psychology Review](https://doi.org/10.1007/s10648-025-10003-9)
- [Yang, Li, Li, Zhai, An et al. (2022), "Prevalence of Developmental Dyslexia in Primary School Children: A Systematic Review and Meta-Analysis", Brain Sciences](https://doi.org/10.3390/brainsci12020240)
- [Pew Research Center (2026), "Americans still opt for print books over digital or audio versions; few are in book clubs"](https://www.pewresearch.org/short-reads/2026/04/09/americans-still-opt-for-print-books-over-digital-or-audio-versions-few-are-in-book-clubs/)
- [Audio Publishers Association (2026), "The Audio Publishers Association Annual Surveys Show Audiobook Sales Jump 9% to $2.43 Billion"](https://www.audiopub.org/surveys)
- [Association of American Publishers (2026), "AAP December 2025 StatShot Report"](https://publishers.org/news/aap-december-2025-statshot-report-overall-publishing-industry-up-9-4-for-month-of-december-and-up-1-1-year-to-date/)
- [ACX, "How long will my narrated audiobook be?"](https://help.acx.com/s/article/how-long-will-my-narrated-audiobook-be)
- [World Health Organization (2026), "Blindness and vision impairment" fact sheet](https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment)
- [CDC (2024), "Fast Facts: Vision Loss"](https://www.cdc.gov/vision-health/data-research/vision-loss-facts/index.html)
- [International Dyslexia Association, "Dyslexia Basics"](https://dyslexiaida.org/dyslexia-basics/)
- [Mozilla (2020), "Mozilla research shows some machine voices score higher than humans"](https://blog.mozilla.org/en/mozilla/mozilla-research-shows-some-machine-voices-score-higher-than-humans/) (blog, not peer reviewed; optional)

Not in Sources (UNVERIFIED content): Craig and Schroeder (2017) at doi.org/10.1016/j.compedu.2017.07.003, and Foulke and Sticht (1969) at doi.org/10.1037/h0027575.

## What the evidence does not show

- **No study compares a whole book read by a synthetic voice with the same book read by a narrator.** All voice studies use excerpts, lessons or sentences of seconds to minutes. Ahrens-Schwabe 2026 and Rodero and Lucas 2023 are the closest, and both use excerpts or short stories.
- **No study tests Amazon's Assistive Reader, VoiceView, Alexa, iOS Spoken Content or Android TalkBack voices.** Results from one engine do not carry over to another. Cambre 2020 found "no single voice outperforms the others across all evaluation dimensions".
- **The human-voice advantage depends on the measure.** Learning scores and ratings mostly show no gap with modern voices. Enjoyment, engagement and immediate recall of stories still favour humans in two studies. Dylman 2025 found the recall gap gone after one week, so "people remember less from a computer voice" is not established long term.
- **Mayer's d = 0.74 rests on older machine voices** (early 2000s). It should not be presented as the size of today's gap.
- **No evidence was found on word-by-word highlighting synced to a human narrator** (HushBook's feature). Reading-while-listening evidence is mixed:
  - No reliable benefit when skilled readers set their own pace (Clinton-Lisell 2023, g = 0.06).
  - Worse comprehension than silent reading in Hui and Godfroid 2026.
  - Benefits concentrate in struggling readers and paced reading (Wood 2018; Perelmutter 2017, small and not significant for adults).
- **The driving studies measure driving, not how much of the book was understood.** The one study that measured listening accuracy (Bak 2025) used test sentences, 48 drivers and a simulator. None tested cooking or chores.
- **The playback-speed studies used lectures and podcasts with young undergraduates,** not fiction or long listening sessions. Older adults lost comprehension at faster speeds (Murphy 2023).
- **No reliable figure was found for Kindle owners, Kindle app users or Assistive Reader use.**
- **The Pew 26% and the APA 58% answer different questions:** past 12 months against ever, with different methods. They should not be set side by side as a trend.
- **WHO's 2.2 billion includes near-vision impairment** such as presbyopia (826 million), much of it fixable with glasses. It does not mean 2.2 billion people cannot read a screen.
- **Dyslexia figures differ by definition.** The 7.10% pooled diagnosed prevalence (children) is not the same as IDA's "perhaps as many as 15–20%" with some symptoms, so do not merge them.
