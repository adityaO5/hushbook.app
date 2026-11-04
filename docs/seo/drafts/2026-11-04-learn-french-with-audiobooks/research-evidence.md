# Research: evidence for "How to Learn French With Audiobooks"

Evidence agent, 2026-11-04. This file covers French-specific evidence only. The general evidence (reading-while-listening, captions meta-analyses, repetition and speed, lexical coverage, output limits, Krashen) was verified in `../2026-11-04-learn-spanish-with-audiobooks/research-evidence.md` and is listed under "Reused from the Spanish file" without re-verification.

How things were checked: every new DOI was checked against `api.crossref.org/works/<doi>`, and titles, journals and years are copied from Crossref. Abstracts came from Crossref, OpenAlex or the ERIC API. Full texts were read where an open copy existed (Pellegrino et al. 2011, Thomas 2004, Fievez et al. 2023, Peters et al. 2019). Web pages were fetched on 2026-11-04 and are quoted word for word. Anything not confirmed is marked **UNVERIFIED**.

---

## 1. How fast French is, and why its word boundaries are hard to hear

### Pellegrino, Coupé & Marsico (2011): French vs English speech rate
- "A cross-language perspective on speech information rate", *Language* 87(3), 539–558. https://doi.org/10.1353/lan.2011.0057 (this Sources line is reused; see below).
- I re-read Table 1 from the LSA-hosted PDF (Wayback snapshot 2011-10-14 of http://lsadc.org/info/documents/2011/press-releases/pellegrino-et-al.pdf). The PDF text layer shifts the first two numeric columns down one row. The alignment below is confirmed by the paper's own prose: "French and Italian ( pMCMC = 0.55, n.s.)" for syllabic rate fits 7.18 vs 6.99, and "English and German ( pMCMC = 0.08, n.s.)" fits 6.19 vs 5.97.

| Language | Information density per syllable | Syllabic rate (syllables/sec) | Information rate |
|---|---|---|---|
| English | 0.91 (± 0.04) | 6.19 (± 0.16) | 1.08 (± 0.08) |
| French | 0.74 (± 0.04) | 7.18 (± 0.12) | 0.99 (± 0.09) |

  (Vietnamese = 1, the reference. Read speech: 20 short texts per language, "from six to ten" speakers per language.)
- On information rate: "English significantly contrasts with Japanese, German, Mandarin, and Spanish ( pMCMC < 0.01) and with Italian and French ( pMCMC < 0.05)." And: "no significant contrast exists among five of the seven languages (German, Mandarin, Italian, Spanish, and French)".
- **For the post:** read French ran at **7.18 syllables per second against 6.19 for English**, about 16% more syllables per second (derived). Each French syllable carried less information (0.74 vs 0.91), so French passed on slightly *less* information per second than English (0.99 vs 1.08).
- Shows: French sounds fast because more, lighter syllables go by each second. Does not show: conversational speed (these were rehearsed readings) or Québec vs European differences.

### Tremblay & Spinelli (2014): liaison consonants are shorter, and learners lean on that
- Annie Tremblay & Elsa Spinelli, "English Listeners' Use of Distributional and Acoustic-Phonetic Cues to Liaison in French: Evidence from Eye Movements", *Language and Speech* 57(3), 310–337 (online 2013). https://doi.org/10.1177/0023830913504569
- Design: visual-world eye-tracking. English-speaking learners of French and native French listeners heard adjective–noun sequences with /t/ or /z/ as the pivotal consonant. n is not in the abstract.
- Quotes: "Liaison creates a misalignment of the syllable and word boundaries"; "liaison consonants are 15 per cent shorter than word-initial consonants". "Both groups' competitor fixations were modulated by the duration of the pivotal consonant, but only the learners' fixations to liaison-initial targets were modulated by the duration of the pivotal consonant."
- Shows: in French, a word can seem to start with a consonant that really belongs to the word before it (liaison), and the only acoustic clue is a small timing difference. English speakers rely on that clue more than native speakers do. Does not show: how much listening practice it takes to get good at it.

### Tremblay (2011): learners can parse liaison-initial words
- Annie Tremblay, "Learning to parse liaison-initial words: An eye-tracking study", *Bilingualism: Language and Cognition* 14(3), 257–279. https://doi.org/10.1017/S1366728910000271
- Native English speakers "at three proficiency levels in French" and native French speakers; eye-tracking. n is not in the abstract.
- Result: "the non-native listeners had little difficulty recognizing liaison-initial real words, and they recognized liaison-initial nonce words more rapidly than consonant-initial ones." The learners' "ability to segment liaison-initial words being phonologically abstract rather than lexical".
- Shows: learners can learn to hear liaison, at all three proficiency levels, in a lab task. Does not show: real-time comprehension of a full-speed narrator. **Use it to keep the post balanced: liaison is a hurdle, not a wall.**

### Tremblay, Coughlin, Bahler & Gaillard (2012): French puts its stress at the end, English listeners hear it at the start
- "Differential contribution of prosodic cues in the native and non-native segmentation of French speech", *Laboratory Phonology* 3(2). https://doi.org/10.1515/lp-2012-0018 (I read the full abstract in the open copy at http://hdl.handle.net/1808/17415.)
- Mid-level and high-level English learners of French and native listeners; two word-monitoring tasks.
- Result: "as L2 learners become more proficient in French, they go from parsing accented syllables as word-initial to parsing them as word-final, but unlike native listeners, they use duration increase but not fundamental frequency (F0) rise as a cue to word-final boundaries." The authors argue these factors "prevent English listeners from attending to F0 rise as a cue to word-final boundaries in French, irrespective of their proficiency in French."
- Shows: English habits for finding where words start carry over into French and only partly fade with proficiency. Does not show: any training effect.

### Shoemaker & Wauquier (2019): learners who mostly hear French process liaison like French children
- Ellenor M. Shoemaker & Sophie Wauquier, "The emergence of speech segmentation in adult L2 learners of French", *Language, Interaction and Acquisition* 10(1), 22–44. https://doi.org/10.1075/lia.17016.sho
- Result (abstract): "more naturalistic L2 learners, who have had little formal L2 instruction and whose exposure is primarily oral, process liaison employing strategies previously observed only in children learning L1 French ... suggesting rather that phonological development depends on both the quality and quantity of the input to which the L2 learner is exposed." The abstract also notes that the existing literature "holds that the processing of liaison is greatly influenced by orthographic representations".
- Sample size: not in the abstract (**UNVERIFIED**; no open full text).
- Shows: how you meet French (mostly by ear or mostly on paper) changes how you hear liaison. Does not show: which route is better overall. It supports the post's idea of pairing audio with text: the text shows the spelling, and the audio shows how the words actually join.

### Wauquier & Shoemaker (2013): review of liaison acquisition
- "Convergence and divergence in the acquisition of French liaison by native and non-native speakers", *Language, Interaction and Acquisition* 4(2), 161–189. https://doi.org/10.1075/lia.4.2.03wau
- An overview of production and psycholinguistic studies of liaison in L1 and L2 French. Use it as the "review" citation; it gives no new numbers.

### Graham (2006): what English learners of French say is hardest about listening
- Suzanne Graham, "Listening comprehension: The learners' perspective", *System* 34(2), 165–182. https://doi.org/10.1016/j.system.2005.11.001 (ERIC EJ803840)
- English students aged 16–18 learning French in England. Abstract (ERIC): "listening comprehension is the skill in which students in the post-compulsory phase of education feel they have achieved the least success. The main problems highlighted by learners were dealing adequately with the speed of delivery of texts, making out individual words in a stream of spoken French, and making sense of any words identified."
- Sample size is not in the abstract (it is often quoted as 594 questionnaire respondents: **UNVERIFIED**).
- Shows: speed and word boundaries are the two problems English speakers name with spoken French, and slowing down and following the words target exactly those. Does not show: that any method fixed them.

### Graham & Macaro (2008): listening strategy instruction for learners of French
- "Strategy Instruction in Listening for Lower‐Intermediate Learners of French", *Language Learning* 58(4), 747–783. https://doi.org/10.1111/j.1467-9922.2008.00478.x (ERIC EJ819105)
- **68** lower-intermediate learners of French in England, against a comparison group, with high- and low-scaffolded versions. "Results suggest that the program improved listening proficiency and learners' confidence about listening."
- Shows: French listening can be trained, and learners' confidence rises with it. Does not show: anything about audiobooks (this was classroom strategy training). Effect sizes are not in the abstract.

### Brand & Ernestus (2018): you learn reduced pronunciations by hearing them
- Sophie Brand & Mirjam Ernestus, "Listeners' processing of a given reduced word pronunciation variant directly reflects their exposure to this variant: Evidence from native listeners and learners of French", *Quarterly Journal of Experimental Psychology* 71(5), 1240–1259. https://doi.org/10.1080/17470218.2017.1313282
- Lexical decision task with French words said with or without the word-medial schwa (for example *revue*). Native listeners, plus Dutch advanced and beginner learners of French. Group sizes were not checked (**UNVERIFIED**).
- Result: "Dutch advanced learners' accuracy scores and RTs were best predicted by their own ratings" of how often each variant occurs, whereas beginners' "could not be predicted by any relative frequency rating". "Our results strongly suggest that listeners store the frequencies of occurrence of pronunciation variants, and consequently the variants themselves."
- Shows: how well you recognise casual French (with the *e* dropped) tracks how much of it you have heard. It supports listening to natural narration, not only slow textbook audio. Does not show: an intervention effect (it is correlational).

---

## 2. Vocabulary: how many French words, and how many learners actually know

### French frequency dictionary: coverage figures NOT FOUND
- Deryle Lonsdale & Yvon Le Bras, *A Frequency Dictionary of French: Core Vocabulary for Learners*, Routledge, 2009. https://doi.org/10.4324/9780203883044. Second edition: James Law & Yvon Le Bras, *A Frequency Dictionary of French*, Routledge, 2026. https://doi.org/10.4324/9781003468776 (Crossref, issued 2026-03-13).
- **I could not find published coverage figures for the top 1,000 / 2,000 / 5,000 words in either edition.** The introduction is not open, and Google Books (quota error) and the publisher's pages returned nothing usable. Do not quote a coverage percentage from this dictionary. Cite it only as "a 5,000-word frequency dictionary of French".
- Cobb & Horst (2004), "Is there room for an academic word list in French?", in *Vocabulary in a Second Language* (Benjamins), 15–38. https://doi.org/10.1075/lllt.10.04cob. The metadata is verified, but **its coverage comparisons of French vs English are UNVERIFIED** (the publisher page was behind a bot check). Do not cite numbers from it.

### Best French coverage numbers I could verify: a French TV series (Fievez et al.)
- From Fievez et al. (2021 online; 2023 issue; full entry in section 5), full text read. For six episodes of *Dix pour cent* (*Call My Agent!*): "For the first three episodes, 95% of the lexical coverage was attained with the 3,000 most frequent words (including proper nouns), whereas it was reached with the 4,000 most frequent words for the last three episodes". Also: "In the present study, 86% and 93% lexical coverage were attained with the 1000 and 2000 levels, which 70% of participants mastered."
- Shows: for a popular French drama, about 3,000–4,000 words gets a viewer to 95% coverage. Does not show: anything about novels. I found **no corpus study of how many words a French novel needs**. Pictures help viewers, so audio alone would be harder at the same coverage.

### Noreillie, Kestemont, Heylen, Desmet & Peters (2018): vocabulary and listening in French
- "Vocabulary knowledge and listening comprehension at an intermediate level in English and French as foreign languages", *ITL – International Journal of Applied Linguistics* 169(1), 212–231. https://doi.org/10.1075/itl.00013.nor
- A replication of Stæhr (2009) with Flemish learners; the second experiment was in French. Abstract: "We also found a positive correlation between vocabulary knowledge and listening comprehension. Although our findings reveal that learners probably need fewer words for adequate listening comprehension at an intermediate proficiency level, our study also showed that learners who knew more words had higher listening comprehension scores. Finally, our study seems to suggest that learners might need less lexical coverage for intermediate listening."
- Fievez et al. (2023) summarise it as finding "that knowledge of only 1000 or 2000 lemmas, or 86% and 93% of lexical coverage, is enough for adequate listening comprehension of French". **That number is a secondary report; I could not open Noreillie's full text (Lirias captcha). If used, attribute it as "a 2018 study, as summarised by Fievez et al."**
- Shows: in French, as in English, a larger vocabulary goes with better listening, and intermediate listening texts may need fewer words than reading does. Does not show: anything about novel-length audio.

### Milton (2006): how many French words UK school learners know
- James Milton, "Language Lite? Learning French Vocabulary in School", *Journal of French Language Studies* 16(2), 187–205. https://doi.org/10.1017/S0959269506002420
- Abstract: "learners learn about 170 words per year up to GCSE and about 530 words per year in 'A' level study ... On average, learners take GCSE with under 1000 words of French vocabulary and 'A' level with about 2000 words." It also reports "a worrying period where progress, even of the best learners, appears to halt for several years".
- Shows: classroom French alone builds only a small vocabulary, well short of the roughly 3,000 words needed for 95% coverage of a TV drama (Fievez). Does not show: US learners, adults, or what happens with extra input.

### Peters, Noreillie, Heylen, Bulté & Desmet (2019): out-of-school input explains the gap
- "The Impact of Instruction and Out‐of‐School Exposure to Foreign Language Input on Learners' Vocabulary Knowledge in Two Languages", *Language Learning* 69(3), 747–782. https://doi.org/10.1111/lang.12351 (open copy on Lirias, full text read)
- **138** Flemish learners (second and fourth year of secondary school, and first-year university), each tested in both French and English. French was their first foreign language, with more years and more hours of teaching.
- Result: "Despite fewer years of English instruction, participants' vocabulary knowledge in English was considerably larger than their French vocabulary knowledge, which can be explained by their large amounts of out‐of‐school exposure to English language input." And "the gains remained modest when out‐of‐school exposure to the foreign language input was limited."
- Shows: **the best French-specific argument for audiobooks.** The same learners knew more of the language they *heard outside school* than of the one they had studied longer. Does not show: anything about audiobooks specifically (the English exposure was mostly online activities and TV). It is cross-sectional, not an experiment.

### Ovtcharov, Cobb & Halter (2006): richer vocabulary goes with a higher oral level
- "La richesse lexicale des productions orales: mesure fiable du niveau de compétence langagière", *Canadian Modern Language Review* 63(1), 107–125. https://doi.org/10.3138/cmlr.63.1.107
- **48** adult Anglophone learners of French (Canadian federal public servants), split by oral test level. Frequency profiles of their recorded speech showed "des différences statistiquement significatives entre les productions des deux groupes".
- Shows: higher-rated speakers used rarer, richer vocabulary. Does not show: vocabulary *size* (the brief assumed it did). It measures the words people used in speech, not how many they know. Optional source.

### David (2008): vocabulary breadth from school to university (optional)
- Annabelle David, "Vocabulary breadth in French L2 learners", *Language Learning Journal* 36(2), 167–180. https://doi.org/10.1080/09571730802389991. UK learners (FLLOC project), tested with X_Lex: "learners' lexicon size increased throughout the study period. Learning is linked to word frequency for all learners at all stages." The abstract gives no sizes. Optional.

---

## 3. FSI: how long French takes

- U.S. Department of State, "Foreign Language Training". https://www.state.gov/national-foreign-affairs-training-center/foreign-language-training. Read on 2026-11-04 through the r.jina.ai reader, because state.gov blocks curl. The Sources line is the same as in the Spanish file.
- Exact quotes:
  - "The following language learning timelines indicate the time usually expect ed for a student to reach a n integrated score of 3 (Speaking + Listening) on the Interagency Language Roundtable (ILR) scale, though the actual time can vary based on several factors, including the language learner's natural ability, prior language-learning experience, and time spent in the classroom. A typical week is 23 hours per week in class and 17 hours of self-study." (The stray spaces in "expect ed" and "a n" are on the page.)
  - "**Category I Languages:** 24-30 weeks (552-690 class hours)" / "Languages close to English."
  - "Danish (24 weeks)Dutch (24 weeks)French (30 weeks)" / "Italian (24 weeks)Norwegian (24 weeks)Portuguese (24 weeks)" / "Romanian (24 weeks)Spanish (30 weeks)Swedish (24 weeks)"
- **French: 30 weeks**, the top of Category I, the same as Spanish. Derived: 30 × 23 = 690 class hours, plus 30 × 17 = 510 self-study hours, so about 1,200 hours of full-time study to reach ILR 3 (label as derived).
- Shows: FSI rates French among the easiest languages for English speakers, at the slow end of that group. Does not show: timelines for hobby learners, or anything about audiobooks.

---

## 4. Scale

### OIF, *La langue française dans le monde*, édition 2026 (latest)
- Organisation internationale de la Francophonie, *La langue française dans le monde. Synthèse, édition 2026* (Gallimard). PDF: https://www.francophonie.org/sites/default/files/2026-04/Synthese_rapport_Langue_francaise_dans_le_monde_2026.pdf. The full report is at https://www.francophonie.org/sites/default/files/2026-03/La_langue_francaise_dans_le_monde_Edition_2026.pdf (not read). The landing page with key figures is https://www.francophonie.org/la-langue-francaise-dans-le-monde-305 ("396 millions de francophones dans le monde", "170 millions d'apprenants du et en français").
- Exact quotes from the 2026 synthesis:
  - "Forte de son statut de quatrième langue la plus parlée au monde avec 396 millions de Francophones, de deuxième langue la plus apprise sur les cinq continents, de quatrième langue présente sur Internet, de troisième langue de l'économie et des affaires, la langue française est bien une langue mondiale"
  - "L'estimation du nombre de Francophones représente le point focal des éditions 2010, 2014, 2019 et 2022 de La Langue française dans le monde, qui en ont comptabilisé respectivement 220, 274, 300 et 321 millions."
  - "Pour 2025, l'OIF explore, en complément de la méthode utilisée pour ces dénombrements successifs (appelée par la suite « méthode 1 »), une nouvelle méthode (« méthode 2 ») qui prend en compte les élèves de 6-9 ans alphabétisés en français ... les estimations de l'OIF pour l'année 2025 donnent environ 396 millions de Francophones, répartis sur les cinq continents, dont près de 65 % en Afrique."
  - "... si l'on conservait pour 2025 la méthode 1 de dénombrement qui donne 348 millions de Francophones."
  - "En 2024, plus de 170 millions d'élèves dans 36 pays à travers le monde ont reçu un enseignement en français ou ont appris le français en milieu institutionnel, dans des contextes de français langue maternelle (FLM) ou de français langue seconde (FLS). Le nombre d'apprenants de français langue étrangère (FLE) dans le monde est, quant à lui, estimé à environ 51 millions d'apprenants."
  - "Le français est la deuxième langue la plus apprise dans le monde, après l'anglais."
  - "En tant que langue maternelle, le français fait partie des vingt langues les plus parlées au monde, avec environ 90 millions de locuteurs maternels. ... Mais avec 396 millions de Francophones dans le monde, le français occupe désormais la quatrième place, derrière l'anglais, le mandarin (chinois) et l'espagnol, et devant l'arabe standard."
- **Caveats for the post:** the jump from 321 million (2022) to 396 million (2025) is partly a **change of counting method**. Method 2 adds literate 6–9-year-olds in 30 countries; the old method gives 348 million. The "170 million" counts pupils taught *in* French or learning it as a first or second language, not foreign-language learners. The foreign-language (FLE) figure is **about 51 million**. Safe wording: "About 396 million people speak French (OIF, 2026 edition, using a new counting method; 348 million by the old one), about 90 million of them natively, and about 51 million people study it as a foreign language. It is the second most-learned language after English."

### MLA census, fall 2021 (French figures; same Sources line as the Spanish file)
- Lusin, Peterson, Sulewski & Zafer, *Enrollments in Languages Other Than English in US Institutions of Higher Education, Fall 2021*, MLA, 2023 (PDF read in full).
- Exact quotes:
  - "In terms of ranking, Spanish and French are still the two most studied languages (table 1a)."
  - "Enrollments in French, German, Italian, and Portuguese also declined significantly overall and at all levels between 2016 and 2021: French enrollments declined by 23.1% (down 35.6% at two-year colleges, 21.0% at four-year institutions, and 20.1% at the graduate level)".
  - "Five European languages had losses of around twenty percent: French (23.1%), Portuguese (21.8%), Latin (21.5%), Italian (20.4%), and Spanish (18.0%)."
  - "the declines in French and German enrollments between 2009 and 2021 have been in the same range as for Latin (down 37.2% and 44.0%, respectively)".
- Table 1a: French **175,710** (2016) → **135,088** (2021). The PDF text layer misaligns the %-change column, but 135,088 / 175,710 works out to −23.1%, which matches the prose. Table 6: French was **11.4%** of all US college language enrollments in 2021, down from 34.4% in 1968.

---

## 5. French-specific studies with text + audio, captions or extensive reading

**Main finding: as with Spanish, I found no peer-reviewed audiobook or reading-while-listening study with adult learners of French.** French does have an unusually strong *captioned video* literature, mostly from Maribel Montero Perez's group at KU Leuven, with Dutch-speaking learners of French. That is the closest evidence.

### Fievez, Montero Perez, Cornillie & Desmet (2021 online; 2023 issue): a full French Netflix season with clickable captions
- "Promoting incidental vocabulary learning through watching a French Netflix series with glossed captions", *Computer Assisted Language Learning* 36(1-2), 26–51. https://doi.org/10.1080/09588221.2021.1899244 (open copy: https://biblio.ugent.be/publication/8710148/file/01GSQVKD0Q5DGSQACDWGJ2CDS7.pdf, full text read)
- Design: Dutch-speaking low- to high-intermediate university learners of French. The treatment group (**n = 65**) watched six episodes of *Dix pour cent* (307 minutes in total) with Netflix's French captions plus a click-to-translate extension, within 21 days (mean 16 days). The control group (**n = 37**) only took the tests. There were 78 target words.
- Results (full text): the treatment group gained on form recall (t(64) = 11.48, d = .83) and meaning recall (t(64) = 14.26, d = .98). Between groups, the differences were d = 1.56 for form recall and d = 1.62 for meaning recall. "participants recalled, on average, the form of 14 words and 13 word meanings. This represents relative gains of 27% and 36% respectively." Mean comprehension was 84%, and enjoyment was rated 4.62/5. "66% said they would not have understood the series without captions." Lookups and vocabulary size both predicted learning, and words that appeared "more concentrated in one episode" were learned better.
- Shows: binge-style French input with same-language text and on-demand translation taught real words in about two weeks. It is the closest French analogue to read-along audio with tap-to-translate. Does not show: audio without pictures, or long-term retention (the posttest came straight after the last episode). Note that the control group also gained a little from testing alone (meaning recall d = .35).

### Montero Perez, Peters & Desmet (2014): full captions help French listening comprehension
- "Is less more? Effectiveness and perceived usefulness of keyword and full captioned video for L2 listening comprehension", *ReCALL* 26(1), 21–43. https://doi.org/10.1017/s0958344013000256
- **226** Flemish university students watched three short French clips: no captions (n = 70), full captions (n = 81) or keyword captions (n = 75).
- Result: "the full captioning group outperformed both the no captioning and the keyword captioning group on the global comprehension questions". There were no differences on the detailed questions, which learners answered with access to the audio. Learners rated captions "useful for speech decoding and meaning-making processes", and "keyword captions were considered highly distracting."
- Shows: showing every word, not just key words, helps French learners follow the gist, which supports full text over highlights. Does not show: listening skill growth over time. Effect sizes are not in the abstract.

### Montero Perez, Peters & Desmet (2017 online; 2018 issue): captions with on-demand meaning
- "Vocabulary learning through viewing video: the effect of two enhancement techniques", *Computer Assisted Language Learning* 31(1-2), 1–26. https://doi.org/10.1080/09588221.2017.1375960
- **227** Dutch-speaking university students watched three French videos in one of 8 conditions (4 caption types × test announced or not).
- Result: "students in the glossed keyword captions group (with access to meaning) scored best on the form recognition and meaning recall tests ... looking up a given word was positively related to the learning of that word. Test Announcement did not affect word learning or look-up behaviour."
- Shows: being able to tap a word for its meaning while hearing it adds to learning. Does not show: anything about audiobooks, and the videos were short.

### Montero Perez (2020): who learns most from French video
- Maribel Montero Perez, "Incidental vocabulary learning through viewing video: the role of vocabulary knowledge and working memory", *Studies in Second Language Acquisition* 42(4), 749–773. https://doi.org/10.1017/s0272263119000706 (Crossref gives the title only as "INCIDENTAL VOCABULARY LEARNING THROUGH VIEWING VIDEO"; the subtitle is from the journal page.)
- **63** higher-intermediate learners of French watched a French documentary containing 15 pseudowords, then took surprise tests.
- Result: "learning gains occurred at the level of form and meaning recognition. Vocabulary knowledge was positively related to picking up new words from video."
- Shows: the more French you already know, the more new words you pick up from input, which is the reason to start with easier books. Does not show: gains in meaning recall (only recognition was tested).

### Montero Perez (2019): pre-learning words before a captioned French video (optional)
- "Pre-learning vocabulary before viewing captioned video: an eye-tracking study", *The Language Learning Journal* 47(4), 460–478. https://doi.org/10.1080/09571736.2019.1638623. **30** intermediate learners of French. Pre-learning changed fixations little, but "The effect of pre-learning was more pronounced on the vocabulary post-tests."

### Older French caption studies (all with US or Canadian learners of French)
- **Danan (1992)**, "Reversed Subtitling and Dual Coding Theory: New Directions for Foreign Language Instruction", *Language Learning* 42(4), 497–527. https://doi.org/10.1111/j.1467-1770.1992.tb01042.x. Beginning and intermediate US college French students watched a 5-minute excerpt of *French in Action*, then took a vocabulary recall test. Reversed subtitling (English audio, French text) "proved to be the most beneficial condition", and "bimodal input" (French audio, French titles) "also gave positive results". n is not in the abstract.
- **Borrás & Lafayette (1994)**, "Effects of Multimedia Courseware Subtitling on the Speaking Performance of College Students of French", *Modern Language Journal* 78(1), 61–75. https://doi.org/10.1111/j.1540-4781.1994.tb02015.x (ERIC EJ485107). Fifth-semester college French. ERIC: "subtitles help learners not only to comprehend authentic linguistic input better but also to produce comprehensible communicative output." n not verified.
- **Baltova (1999)**, "Multisensory Language Teaching in a Multidimensional Curriculum: The Use of Authentic Bimodal Video in Core French", *Canadian Modern Language Review* 56(1), 31–48. https://doi.org/10.3138/cmlr.56.1.31. Argues that video with French subtitles helps "even in the case of relatively inexperienced students", citing a study with Grade 11 core French students. n is not in the abstract.

### Extensive reading and narrow listening in French
- **Pigada & Schmitt (2006)**, "Vocabulary acquisition from extensive reading: A case study", *Reading in a Foreign Language* 18(1), 1–28. https://doi.org/10.64152/10125/66611 (ERIC EJ759833). **One** learner of French, one month of extensive reading, 133 target words. "knowledge of 65% of the target words was enhanced in some way ... Spelling was strongly enhanced, even from a small number of exposures. Meaning and grammatical knowledge were also enhanced, but not to the same extent." Shows: a month of easy reading in French built partial knowledge of many words. Does not show: results that generalise (n = 1), or anything about audio.
- **Dupuy (1999)**, "Narrow Listening: an alternative way to develop and enhance listening comprehension in students of French as a foreign language", *System* 27(3), 351–361. https://doi.org/10.1016/s0346-251x(99)00030-5 (ERIC EJ589663). A survey of college French students about narrow listening, "the repeated listening of tape-recorded interviews of proficient speakers discussing a topic both familiar and interesting to the acquirers". "Students found narrow listening to be interesting and helpful in improving listening comprehension, fluency, vocabulary, and confidence with French." Shows: learners *like* repeated, topic-focused listening and *believe* it works. Does not show: measured gains (it is self-report). n not checked.
- **Dupuy & Krashen (1993)**, "Incidental Vocabulary Acquisition in French as a Foreign Language", *Applied Language Learning* (ERIC EJ477798; no DOI). Third-semester college French students "viewed part of a film, read part, and then were given a surprise vocabulary test with colloquial words from the text". ERIC: "Their performance, compared to a control group, suggests that incidental vocabulary acquisition is possible in a foreign language situation." Krashen is a co-author. Optional; **volume and pages UNVERIFIED**.

---

## 6. Accent variety: Québec vs European French

### Baker & Smith (2010): the only learner study found
- Wendy Baker & Laura Catharine Smith, "The Impact of L2 Dialect on Learning French Vowels: Native English Speakers Learning Québécois and European French", *Canadian Modern Language Review* 66(5), 711–738. https://doi.org/10.3138/cmlr.66.5.711
- Anglophone learners of either Québec French (QF) or European French (EF) identified, discriminated and produced the vowels /i/, /y/ and /u/. n is not in the abstract.
- Result: "QF learners were more accurate at discrimination and identification of these vowels as produced by both QF and EF speakers and that L2 dialect exposure affects how well learners perceive and produce these French vowels." QF has an extra cue: /t, d/ become [ts, dz] before /i, y/.
- Shows: the variety you learn shapes what you hear. For this one set of vowels, learning Québec French did not hurt learners' perception of European French. Does not show: comprehension of whole sentences, or that either variety is "easier".
- **No study found that compares learners' comprehension of Québec vs European French** (OpenAlex searches in English and French). The UQAM theses that came up are about immigrant learners' attitudes in Montréal, not comprehension tests. For the familiarity principle, the nearest analogue is Schoonmaker-Gates (2018) in the Spanish file (Spanish, not French).
- Practical line for the post: start with the variety you will use, then add narrators with other accents.

---

## 7. Honest limits specific to French: liaison production

### Thomas (2004): advanced learners made nearly three times the native error rate on liaison, and a year in France barely changed it
- Alain Thomas, "Phonetic norm versus usage in advanced French as a second language", *IRAL* 42(4). https://doi.org/10.1515/iral.2004.42.4.365 (open copy on YorkSpace, full text read)
- **87** English-speaking third-year university students in Ontario: **48** spent the year in France and **39** stayed home. Recordings at the start and end of the year produced more than 190,000 words of semi-spontaneous speech.
- Quotes:
  - "Overall, 91.1 % of all possible compulsory liaisons were realized by our students, as opposed to 96.9% by Malécot's Parisians. ... it becomes obvious that our students make nearly three times as many errors as Francophones in this area."
  - "liaison accounts for nearly 20 % of all the phonetic errors made by students" (from a comparison with an earlier analysis of the same corpus).
  - "8.5 % of correct liaisons were realized without proper enchaînement, or forward linking".
  - Learners sometimes split words along English or spelling lines, "for instance avec une amie 'with a friend' pronounced /a-vEk-yn-a-mi/ instead of /a-vE-ky-na-mi/".
  - "Clearly, eight months of studies in French, even in a total immersion environment, cannot drastically change the pronunciation of advanced students, which was already established before their third year of university."
- Table 8 (home vs abroad, as I read it; the PDF text layer misaligns the z-scores): compulsory liaison rose slightly in both groups (abroad 86.7% → 90.8%; home 91.1% → 93.9%).
- Shows: even full immersion, which means far more listening than any audiobook habit, did not quickly fix liaison in these learners' speech. Does not show: anything about listening-only learners (these students also took classes and spoke French).

### Harnois-Delpiano, Cavalla & Chevrot (2019): adult learners can judge liaison before they can produce it
- "Comparing French liaison acquisition in L1 children and L2 adults", *Language, Interaction and Acquisition* 10(1), 45–70. https://doi.org/10.1075/lia.17021.har
- French L1 children aged two to six and adult Korean learners of French, in a series of experimental tasks.
- Result: "the ability to judge the correctness of liaison precedes the ability to produce it in L2 learners, but not in L1 children."
- Shows: for adult learners, *hearing* liaison correctly comes before *saying* it. Listening builds the first skill; speaking practice has to build the second. Does not show: results for English speakers (the learners were Korean). Sample sizes **UNVERIFIED** (the HAL copy is behind a bot check).

### Kennedy, Blanchet & Trofimovich (2014): a course that targeted enchaînement and liaison
- Sara Kennedy, Josée Blanchet & Pavel Trofimovich, "Learner Pronunciation, Awareness, and Instruction in French as a Second Language", *Foreign Language Annals* 47(1), 79–96. https://doi.org/10.1111/flan.12066
- **30** adult learners in a 15-week listening and speaking course that covered "connected speech processes (enchaînement, liaison), intonation, and fluency".
- Result: "Results showed significant improvements in learners' segmental production, enchaînement, and some aspects of intonation and fluency." **The abstract does not list liaison among the improvements.** I could not open the full text to check whether liaison was measured separately (**UNVERIFIED**).
- Shows: explicit, speaking-focused practice improved enchaînement (linking a final consonant into the next word) within one semester. Does not show: a comparison with a control group (none is mentioned in the abstract).

### Takeaway for the post
- The evidence supports this: audio plus text helps learners *hear* liaison and linked words (Tremblay 2011; Shoemaker & Wauquier 2019; Montero Perez et al. 2014 ReCALL). Saying them reliably takes speaking practice (Harnois-Delpiano et al. 2019; Thomas 2004; plus Lightbown et al. 2002 and Trofimovich et al. 2009 from the Spanish file). **No study tested whether listening alone fixes liaison production.**

---

## Reused from the Spanish file (do not re-verify; copy these Sources lines as is)

Core reuse for the French post:
- [Hui and Godfroid (2025), "Listening, Reading, or Both? Rethinking the Comprehension Benefits of Reading-While-Listening", Language Learning](https://doi.org/10.1111/lang.12721)
- [Peterson (2025), "Exploring general language ability development through monitored extensive reading, extensive listening, and audio-assisted extensive reading", Foreign Language Annals](https://doi.org/10.1111/flan.70043)
- [Reynolds, Cui, Kao and Thomas (2022), "Vocabulary Acquisition through Viewing Captioned and Subtitled Video: A Scoping Review and Meta-Analysis", Systems](https://doi.org/10.3390/systems10050133) (French was the second-largest language in its pool, k = 5)
- [Montero Perez, Van Den Noortgate and Desmet (2013), "Captioned video for L2 listening and vocabulary learning: A meta-analysis", System](https://doi.org/10.1016/j.system.2013.07.013) (say "a large effect"; the pooled g values are UNVERIFIED)
- [Montero Perez (2022), "Second or foreign language learning through watching audio-visual input and the role of on-screen text", Language Teaching](https://doi.org/10.1017/S0261444821000501)
- [Montero Perez, Peters, Clarebout and Desmet (2014), "Effects of captioning on video comprehension and incidental vocabulary learning", Language Learning & Technology](https://doi.org/10.64152/10125/44357) (L2 French, n = 133: captions helped form recognition, but "Captioning did not affect comprehension nor meaning recall")
- [Montero Perez, Peters and Desmet (2015), "Enhancing Vocabulary Learning Through Captioned Video: An Eye-Tracking Study", The Modern Language Journal](https://doi.org/10.1111/modl.12215) (L2 French)
- [Pellegrino, Coupé and Marsico (2011), "A cross-language perspective on speech information rate", Language](https://doi.org/10.1353/lan.2011.0057) (French row re-read above: 7.18 syllables/sec, density 0.74, information rate 0.99)
- [Coupé, Oh, Dediu and Pellegrino (2019), "Different languages, similar encoding efficiency: Comparable information rates across the human communicative niche", Science Advances](https://doi.org/10.1126/sciadv.aaw2594)
- [Zhao (1997), "The Effects of Listeners' Control of Speech Rate on Second Language Comprehension", Applied Linguistics](https://doi.org/10.1093/applin/18.1.49)
- [Jensen and Vinther (2003), "Exact Repetition as Input Enhancement in Second Language Acquisition", Language Learning](https://doi.org/10.1111/1467-9922.00230) (Spanish learners; present it as "in a study of Spanish learners")
- [McBride (2011), "The effect of rate of speech and distributed practice on the development of listening comprehension", Computer Assisted Language Learning](https://doi.org/10.1080/09588221.2010.528777)
- [van Zeeland and Schmitt (2013), "Lexical Coverage in L1 and L2 Listening Comprehension: The Same or Different from Reading Comprehension?", Applied Linguistics](https://doi.org/10.1093/applin/ams074)
- [Hu and Nation (2000), "Unknown vocabulary density and reading comprehension", Reading in a Foreign Language](https://doi.org/10.64152/10125/66973)
- [Kremmel, Indrarathne, Kormos and Suzuki (2023), "Unknown Vocabulary Density and Reading Comprehension: Replicating Hu and Nation (2000)", Language Learning](https://doi.org/10.1111/lang.12622)
- [Nation (2006), "How Large a Vocabulary is Needed For Reading and Listening?", The Canadian Modern Language Review](https://doi.org/10.3138/cmlr.63.1.59)
- [U.S. Department of State, "Foreign Language Training"](https://www.state.gov/national-foreign-affairs-training-center/foreign-language-training) (French = 30 weeks)
- [Modern Language Association (2023), "Enrollments in Languages Other Than English in US Institutions of Higher Education, Fall 2021"](https://www.mla.org/content/download/191324/file/Enrollments-in-Languages-Other-Than-English-in-US-Institutions-of-Higher-Education-Fall-2021.pdf) (French figures in section 4)
- [Lightbown, Halter, White and Horst (2002), "Comprehension-Based Learning: The Limits of 'Do It Yourself'", The Canadian Modern Language Review](https://doi.org/10.3138/cmlr.58.3.427) (the learners were French-speaking children learning English in Canada, which makes a neat mirror for this post)
- [Trofimovich, Lightbown, Halter and Song (2009), "Comprehension-based practice: The development of L2 pronunciation in a listening and reading program", Studies in Second Language Acquisition](https://doi.org/10.1017/s0272263109990040)
- [Krashen (1982), "Principles and Practice in Second Language Acquisition"](https://www.sdkrashen.com/content/books/principles_and_practice.pdf)

Optional reuse:
- [Zhang and Peng (2024), "Multimodal reading in reading-only versus reading-while-listening modes: evidence from Chinese language learners", Chinese as a Second Language Research](https://doi.org/10.1515/caslar-2024-2003)
- [Laufer and Ravenhorst-Kalovski (2010), "Lexical threshold revisited: Lexical text coverage, learners' vocabulary size and reading comprehension", Reading in a Foreign Language](https://doi.org/10.64152/10125/66648)
- [Shintani, Li and Ellis (2013), "Comprehension-Based Versus Production-Based Grammar Instruction: A Meta-Analysis of Comparative Studies", Language Learning](https://doi.org/10.1111/lang.12001)
- [Gregg (1984), "Krashen's Monitor and Occam's Razor", Applied Linguistics](https://doi.org/10.1093/applin/5.2.79)
- [Schoonmaker-Gates (2018), "Dialect comprehension and identification in L2 Spanish: Familiarity and type of exposure", Studies in Hispanic and Lusophone Linguistics](https://doi.org/10.1515/shll-2018-0007) (only as a Spanish analogue for accent familiarity)

Do not reuse: the Bisson Welsh studies (per the brief), the Spanish-only caption studies (Winke et al., Markham et al., Stewart & Pertusa, Montero Perez & Pattemore), Rodrigo et al., Davies (2005), Instituto Cervantes, or Dreaming Spanish.

---

## What the evidence does not show

1. **No controlled study of adults learning French from audiobooks or reading-while-listening was found.** The French evidence covers captioned video (strong, mostly with Dutch-speaking learners in Belgium), extensive reading (one case study), narrow listening (self-report) and listening-perception lab work.
2. That French carries more meaning per second. It packs more syllables per second than English (7.18 vs 6.19), each carrying less information, so its information rate was slightly *lower* than English (0.99 vs 1.08). These figures come from read speech by 6–10 speakers per language.
3. That learners cannot learn to hear liaison. Lab studies show English speakers can parse liaison-initial words (Tremblay 2011), helped by liaison consonants being 15% shorter (Tremblay & Spinelli 2014), though English stress habits linger (Tremblay et al. 2012).
4. That listening fixes liaison in *speech*. A year in France barely moved advanced learners' compulsory liaison (Thomas 2004), and adult learners judge liaison before they can produce it (Harnois-Delpiano et al. 2019). No study tested listening-only learners.
5. A verified coverage figure for the Routledge *Frequency Dictionary of French* (1,000 / 2,000 / 5,000 words), or for French novels. The only French coverage figures verified here come from one TV series: 86% at 1,000 words, 93% at 2,000, and 95% at 3,000–4,000 (Fievez et al.).
6. That Québec or European French is easier to start with. The only study found is about vowel perception (Baker & Smith 2010), and in it Québec French learners did better on both varieties.
7. That captions improve detailed comprehension or meaning recall. Full captions helped global but not detailed comprehension (Montero Perez et al. 2014, ReCALL, n = 226), and in the n = 133 study captioning "did not affect comprehension nor meaning recall".
8. That the OIF's 396 million reflects real growth on the old basis. It uses a new counting method; the old one gives 348 million (vs 321 million in 2022). The 170 million "apprenants du et en français" are mostly pupils schooled *in* French; foreign-language learners number about 51 million.
9. Sample sizes for Tremblay (2011), Tremblay & Spinelli (2014), Shoemaker & Wauquier (2019), Harnois-Delpiano et al. (2019), Brand & Ernestus (2018), Baker & Smith (2010), Graham (2006), Danan (1992), Borrás & Lafayette (1994), Baltova (1999) and Dupuy (1999). They were not in the abstracts and are not verified.

---

## Sources (new ones only, ready to paste)

Core:
- [Tremblay and Spinelli (2014), "English Listeners' Use of Distributional and Acoustic-Phonetic Cues to Liaison in French: Evidence from Eye Movements", Language and Speech](https://doi.org/10.1177/0023830913504569)
- [Tremblay (2011), "Learning to parse liaison-initial words: An eye-tracking study", Bilingualism: Language and Cognition](https://doi.org/10.1017/S1366728910000271)
- [Tremblay, Coughlin, Bahler and Gaillard (2012), "Differential contribution of prosodic cues in the native and non-native segmentation of French speech", Laboratory Phonology](https://doi.org/10.1515/lp-2012-0018)
- [Shoemaker and Wauquier (2019), "The emergence of speech segmentation in adult L2 learners of French", Language, Interaction and Acquisition](https://doi.org/10.1075/lia.17016.sho)
- [Graham (2006), "Listening comprehension: The learners' perspective", System](https://doi.org/10.1016/j.system.2005.11.001)
- [Brand and Ernestus (2018), "Listeners' processing of a given reduced word pronunciation variant directly reflects their exposure to this variant: Evidence from native listeners and learners of French", Quarterly Journal of Experimental Psychology](https://doi.org/10.1080/17470218.2017.1313282)
- [Milton (2006), "Language Lite? Learning French Vocabulary in School", Journal of French Language Studies](https://doi.org/10.1017/S0959269506002420)
- [Peters, Noreillie, Heylen, Bulté and Desmet (2019), "The Impact of Instruction and Out-of-School Exposure to Foreign Language Input on Learners' Vocabulary Knowledge in Two Languages", Language Learning](https://doi.org/10.1111/lang.12351)
- [Noreillie, Kestemont, Heylen, Desmet and Peters (2018), "Vocabulary knowledge and listening comprehension at an intermediate level in English and French as foreign languages", ITL – International Journal of Applied Linguistics](https://doi.org/10.1075/itl.00013.nor)
- [Fievez, Montero Perez, Cornillie and Desmet (2023), "Promoting incidental vocabulary learning through watching a French Netflix series with glossed captions", Computer Assisted Language Learning](https://doi.org/10.1080/09588221.2021.1899244)
- [Montero Perez, Peters and Desmet (2014), "Is less more? Effectiveness and perceived usefulness of keyword and full captioned video for L2 listening comprehension", ReCALL](https://doi.org/10.1017/s0958344013000256)
- [Montero Perez, Peters and Desmet (2018), "Vocabulary learning through viewing video: the effect of two enhancement techniques", Computer Assisted Language Learning](https://doi.org/10.1080/09588221.2017.1375960)
- [Montero Perez (2020), "Incidental vocabulary learning through viewing video: the role of vocabulary knowledge and working memory", Studies in Second Language Acquisition](https://doi.org/10.1017/s0272263119000706)
- [Pigada and Schmitt (2006), "Vocabulary acquisition from extensive reading: A case study", Reading in a Foreign Language](https://doi.org/10.64152/10125/66611)
- [Baker and Smith (2010), "The Impact of L2 Dialect on Learning French Vowels: Native English Speakers Learning Québécois and European French", The Canadian Modern Language Review](https://doi.org/10.3138/cmlr.66.5.711)
- [Thomas (2004), "Phonetic norm versus usage in advanced French as a second language", IRAL – International Review of Applied Linguistics in Language Teaching](https://doi.org/10.1515/iral.2004.42.4.365)
- [Harnois-Delpiano, Cavalla and Chevrot (2019), "Comparing French liaison acquisition in L1 children and L2 adults", Language, Interaction and Acquisition](https://doi.org/10.1075/lia.17021.har)
- [Organisation internationale de la Francophonie (2026), "La langue française dans le monde. Synthèse, édition 2026"](https://www.francophonie.org/sites/default/files/2026-04/Synthese_rapport_Langue_francaise_dans_le_monde_2026.pdf)

Optional:
- [Graham and Macaro (2008), "Strategy Instruction in Listening for Lower-Intermediate Learners of French", Language Learning](https://doi.org/10.1111/j.1467-9922.2008.00478.x)
- [Kennedy, Blanchet and Trofimovich (2014), "Learner Pronunciation, Awareness, and Instruction in French as a Second Language", Foreign Language Annals](https://doi.org/10.1111/flan.12066)
- [Wauquier and Shoemaker (2013), "Convergence and divergence in the acquisition of French liaison by native and non-native speakers", Language, Interaction and Acquisition](https://doi.org/10.1075/lia.4.2.03wau)
- [Dupuy (1999), "Narrow Listening: an alternative way to develop and enhance listening comprehension in students of French as a foreign language", System](https://doi.org/10.1016/s0346-251x(99)00030-5)
- [Danan (1992), "Reversed Subtitling and Dual Coding Theory: New Directions for Foreign Language Instruction", Language Learning](https://doi.org/10.1111/j.1467-1770.1992.tb01042.x)
- [Borrás and Lafayette (1994), "Effects of Multimedia Courseware Subtitling on the Speaking Performance of College Students of French", The Modern Language Journal](https://doi.org/10.1111/j.1540-4781.1994.tb02015.x)
- [Baltova (1999), "Multisensory Language Teaching in a Multidimensional Curriculum: The Use of Authentic Bimodal Video in Core French", The Canadian Modern Language Review](https://doi.org/10.3138/cmlr.56.1.31)
- [Montero Perez (2019), "Pre-learning vocabulary before viewing captioned video: an eye-tracking study", The Language Learning Journal](https://doi.org/10.1080/09571736.2019.1638623)
- [Ovtcharov, Cobb and Halter (2006), "La richesse lexicale des productions orales: mesure fiable du niveau de compétence langagière", The Canadian Modern Language Review](https://doi.org/10.3138/cmlr.63.1.107)
- [David (2008), "Vocabulary breadth in French L2 learners", Language Learning Journal](https://doi.org/10.1080/09571730802389991)
- [Lonsdale and Le Bras (2009), "A Frequency Dictionary of French: Core Vocabulary for Learners", Routledge](https://doi.org/10.4324/9780203883044) (cite only as a resource; no coverage figures verified)
