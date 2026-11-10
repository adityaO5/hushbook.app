# Research evidence: "Does Kindle Paperwhite support Immersion Reading?" (2026-11-10)

- **Date:** 2026-11-10. **Scope:** the research backbone only. Is reading while listening worth chasing, for whom, does synced highlighting itself help, does e-ink matter, and why people want text in front of them. Amazon and Audible device facts belong to the platform file; the only Audible material here is the traceability of their benefit claims.
- **Method:** every DOI checked against `api.crossref.org/works/<doi>` on 2026-11-10; the title in the Sources block is the Crossref title (dashes and special hyphens normalised to ASCII hyphens, noted where it matters). ERIC IDs checked via `api.ies.ed.gov/eric/?search=id:<EJ>`. Abstracts from Crossref, Europe PMC (`resultType=core`), OpenAlex, ERIC and the HAL API. Full text from the NCBI BioC API (PMC open access), the ERIC PDF (Brown 2008) and the PMC page via WebFetch (Chang 2015). Non-DOI pages fetched with curl and their `<title>` recorded.
- **Status labels:** **VERIFIED** = I read the quoted text myself today; each entry says abstract or full text. **UNVERIFIED** = title confirmed but the number or detail comes from memory, an earlier project note or a secondary source.
- **Could not reach today:** ScienceDirect, SAGE, Wiley, MDPI and Springer full texts (403 or login redirect). Semantic Scholar elides Elsevier abstracts. Unpaywall returned nothing. Consequences: no sample size for Conklin 2020, Keelor 2023, Siegenthaler 2012 or Moussaoui 2025; no effect sizes for Hui and Godfroid; Chang and Millett 2015 abstract not re-read.
- **Year rule:** journal-issue year, with the online year noted when earlier (same as the 2026-11-09 file).

---

## (a) Summary a writer can lift (10 lines)

1. Reading while listening helps most against listening alone: a 2012 meta-analysis of 57 studies found spoken plus written words beat spoken words only, and matched written words only.
2. Against reading alone it adds little: a 2023 meta-analysis of 30 studies (1,945 participants) found a "trivial" benefit (g = 0.18), seen only when the pace was set for readers (g = 0.41) and absent when they read at their own speed (g = 0.06).
3. Adult studies with real books agree: 91 people learned the same from an audiobook, an e-text or both (Rogowsky 2016); 46 university English learners understood more reading along than listening, but no more than reading (Hui 2024).
4. One registered report with 86 adult English learners found reading along was slightly worse than silent reading for comprehension (Hui and Godfroid 2026).
5. The clearest winners are language learners (new words, listening fluency) and struggling or dyslexic readers (read-aloud tools g = 0.35 across 22 studies, Wood 2018).
6. Synced highlighting itself is not proven: children with reading difficulties scored the same with and without highlighting in text-to-speech (Keelor 2023), and karaoke-style highlighting helped word meaning in one study (35 pupils) and hurt it in another (40 pupils).
7. Audible says "research shows" immersion reading improves focus and comprehension, but cites no study; its "more than nine in ten" figure is an opinion survey with no sample size. No peer-reviewed study of Amazon's Immersion Reading or Whispersync for Voice was found.
8. E-ink is easier on the eyes than an LCD tablet in one 12-person study that used a Kindle Paperwhite: more blinking and lower fatigue ratings than a Kindle Fire HD, no difference from paper (Benedetto 2013). Other studies found e-ink and LCD reading about the same, and comprehension did not differ by device.
9. Light-emitting tablets before bed delayed sleep in a 12-person lab study (iPad vs printed book, Chang 2015); the study team's release says the Kindle e-reader they measured "does not emit light" (model not named), but no study tests the Paperwhite's front light.
10. People want the text because ears drift: in a 2013 study of 211 students, minds wandered at about half of check-ins while listening versus about a third during silent reading.

---

## (b) Findings by question

### 1. Does reading while listening improve comprehension?

**Short answer:** yes compared with listening only; barely or not at all compared with reading only, unless the pace is imposed. Adult studies with book-length or chapter-length material find no advantage over reading.

- **Clinton-Lisell (2023), Educational Research: Theory and Practice.** VERIFIED (ERIC EJ1403866 abstract; the same abstract is on the OSF preprint, Crossref DOI 10.31219/osf.io/ku6tv, titled "Reading while listening meta-analysis"). The journal article has no DOI. 30 studies, total N = 1,945, 62 effect sizes, reading while listening vs reading only.
  - Overall: "a trivial overall benefit of reading while listening over reading only on comprehension was found g = 0.18, SE = 0.07, p = 0.01".
  - Experimenter-paced: g = 0.41, SE = 0.12, 95% CI [0.13, 0.70].
  - Self-paced: "There were no reliable effects of reading while listening when reading was self-paced, g = 0.06, SE = 0.06, 95% CI = [-0.07, 0.19], p = 0.34."
  - Citation-style sentence: "In a 2023 meta-analysis of 30 studies with 1,945 participants, Virginia Clinton-Lisell found that reading while listening gave only a trivial comprehension boost over reading alone (g = 0.18), and no reliable boost when people read at their own pace (g = 0.06)."
- **Adesope and Nesbit (2012), Journal of Educational Psychology 104(1), 250-263.** VERIFIED (abstract via OpenAlex). 57 independent studies, "Most of the research participants were postsecondary students." Spoken plus written vs written only "did not differ, but students who learned from spoken--written presentations outperformed those who learned from spoken-only presentations." The advantage over spoken only held "for low prior knowledge learners, system-paced learning materials, and picture-free materials." No effect sizes in the abstract.
  - Sentence: "In a 2012 meta-analysis of 57 studies, mostly with college students, Adesope and Nesbit found that seeing and hearing the words beat only hearing them, and matched only reading them."
- **Rogowsky, Calhoun and Tallal (2016), SAGE Open 6(3).** VERIFIED (abstract, Crossref and ERIC EJ1198304). "Ninety-one participants were randomly assigned" to digital audiobook, e-text or dual modality, for "the preface and a chapter from a non-fiction book". "No statistically significant differences" at immediate test or 2-week retention. The e-text was read "from an electronic tablet".
  - Participant ages are not in the abstract (full text 403). UNVERIFIED that they were all adults, though the same team's 2015 study used "college-educated adults" (ERIC EJ1055886). Say "91 people", not "91 adults".
  - Sentence: "In a 2016 study, Rogowsky, Calhoun and Tallal gave 91 people the same non-fiction chapter as an audiobook, an e-text or both at once; all three groups scored the same, straight away and two weeks later."
- **Hui (2024), The Modern Language Journal 108(1), 183-200.** VERIFIED (abstract, Crossref and OpenAlex). Within-participant design: "46 English learners in an American university read, listened to, and simultaneously read and listened to two complexity versions of a fictional text." Reading while listening beat listening only; "no main effects between RWL and reading-only conditions". Neither reading speed nor text complexity moderated the effect.
  - Sentence: "In a 2024 study of 46 university English learners reading fiction, Bronson Hui found that reading along beat listening alone but gave no edge over reading alone."
- **Hui and Godfroid (2026; online 12 June 2025), Language Learning 76(1), 311-351.** VERIFIED (abstract, Crossref). Registered report, within-participant: "eighty-six intermediate-to-advanced Chinese learners of English read, read and listened, and listened to different excerpts of a novel." "Contrary to our preregistered hypotheses, participants comprehended the text less well when reading-while-listening than when reading it silently. Both reading conditions yielded better comprehension than listening-only." No effect sizes in the abstract (Wiley 403).
  - Year: Crossref "issued" is 2025, journal issue is March 2026. The 2026-11-09 Kindle post used 2026; older posts say 2025.
  - Sentence: "In a 2026 registered report, Hui and Godfroid had 86 adult English learners read, listen to, and read along with excerpts of a novel; they understood less when reading along than when reading silently, and least when only listening."

### 2. Who benefits most?

**Short answer:** language learners and struggling or dyslexic readers, plus anyone whose attention slips while listening. Clinton-Lisell's own abstract sums it up: "Struggling readers' overall comprehension and second language learners' incidental vocabulary acquisition may be benefited through audio-assisted reading, but there are currently too few studies to afford generalizations on these claims." VERIFIED (ERIC abstract).

**Second-language learners**
- **Brown, Waring and Donkaewbua (2008), Reading in a Foreign Language 20(2), 136-163.** VERIFIED (full text, ERIC PDF EJ815119). "Thirty-five Japanese students of English literature from a medium-sized private university in Kyushu, Japan" read and listened to three graded readers of about 5,500 words each.
  - Meaning-translation test: 16% of 28 words learned reading while listening, 15% reading only, 2% listening only.
  - Multiple-choice test: 48% reading while listening, 45% reading only, 29% listening only.
  - Preference: 72% reading while listening, 28% reading only, and "0% of the subjects chose listening-only".
  - Sentence: "In a 2008 study of 35 Japanese university students, Brown, Waring and Donkaewbua found that reading along taught about as many new words as reading (16% vs 15%) and far more than listening alone (2%); 72% preferred reading along and none preferred listening only."
- **Chang and Millett (2014; online 2013), ELT Journal 68(1), 31-40.** VERIFIED (abstract via OpenAlex; Crossref has none). "Three groups of L2 students" studied "ten graded readers over a 13-week period: reading only, reading while listening, and listening only." "The reading plus listening group produced the most consistent and significant outcome" on listening fluency tests. n is not in the abstract.
- **Chang and Millett (2015), System 52, 91-102.** Title VERIFIED (Crossref). Content UNVERIFIED today (ScienceDirect 403; Semantic Scholar elides the abstract). The site's existing post, checked on 2026-10-23, says 64 tenth graders, 26 weeks, 90 minutes a week, 20 graded readers, with the audio-assisted group improving reading rate and comprehension "substantially" more and keeping gains three months later. Safe to reuse as the site already cites it, but it was not re-read today.
- **Conklin, Alotaibi, Pellicer-Sanchez and Vilkaite-Lozdiene (2020), Second Language Research 36(3), 257-276.** VERIFIED (abstract). Eye tracking of first and second language readers, one passage reading only and one reading while listening. "In general, neither group of participants fixated the word that they were hearing, although the L2 readers' eye movements were more aligned to the auditory input. When reading and listening were not aligned, both groups' eye movements generally preceded the audio." n not in the abstract.

**Struggling and dyslexic readers**
- **Wood, Moxley, Tighe and Wagner (2018; online 2017), Journal of Learning Disabilities 51(1), 73-84.** VERIFIED (abstract via Crossref and Europe PMC; full text via BioC PMC5494021). Meta-analysis of text-to-speech and read-aloud tools for students with reading difficulties: d = .35, 95% CI .14 to .56, p < .01. "Our study included a relatively small sample size (n = 22 studies)". "Type of oral modality" (synthesized, human reader, recorded human voice) was a non-significant moderator.
  - Sentence: "A 2018 meta-analysis of 22 studies by Wood and colleagues found that read-aloud tools gave students with reading difficulties a modest comprehension boost (g = 0.35)."
- **Montali and Lewandowski (1996), Journal of Learning Disabilities 29(3), 271-279.** VERIFIED (abstract). "Eighteen average readers ... and 18 less skilled readers ... in Grades 8 and 9." Passages shown on screen, read by a digitized voice, or "bimodally (on screen, highlighted, while being voiced)". "Less skilled readers comprehended more with bimodal versus unimodal presentations", matching average readers reading silently. Note: highlighting and voice were bundled, so this does not isolate highlighting.
- **Bonifacci, Colombini, Marzocchi, Tobia and Desideri (2022; online November 2021), Journal of Computer Assisted Learning 38(2), 440-454.** VERIFIED (abstract). Students "with dyslexia (20) and typical development (50)" read texts in "self-paced silent reading and text-to-speech reading". "In the text-to-speech condition, both groups showed better reading comprehension and reduced rates of mind wandering. Students with dyslexia were significantly more on task in the text-to-speech condition." The abstract does not say whether text stayed on screen or was highlighted, and gives no ages beyond "young students".
  - Sentence: "In a 2022 study of 70 students, 20 of them with dyslexia, Bonifacci and colleagues found that text-to-speech reading raised comprehension and cut mind wandering compared with silent reading, most of all for the students with dyslexia."
  - Naming note: the brief's "Bonifacci 2023" is a different paper (the mind-wandering meta-analysis in section 5).
- **Milani, Lorusso and Molteni (2010), Dyslexia 16(1), 87-97.** VERIFIED (abstract). Optional. Two groups of 20 adolescents with dyslexia; after 5 months, the audiobook group "showed a significant improvement in reading accuracy, with reduced unease and emotional-behavioural disorders". Audiobooks, not necessarily reading along.

### 3. Does highlighting synced to the audio itself help?

**Short answer:** not shown. The one study that compared text-to-speech with and without highlighting found no difference, and karaoke-style highlighting studies in children point both ways. No study tests Amazon's Immersion Reading.

- **Keelor, Creaghead, Silbert, Breit and Horowitz-Kraus (2023), Annals of Dyslexia 73(3), 469-486.** VERIFIED (abstract, Europe PMC PMID 37119436). Students aged 8 to 12 with reading and language difficulties read under five conditions: silent read, read aloud, listen only, "TTS with no highlighting, and (e) TTS with highlighting". Both TTS conditions beat silent reading, but "No other significant differences were found across conditions including between the presentational features of TTS, specifically TTS with no highlighting and TTS with highlighting conditions." n not in the abstract (Springer login wall).
  - Sentence: "In a 2023 study of children aged 8 to 12 with reading difficulties, Keelor and colleagues found that hearing the text read aloud while reading it helped comprehension, but adding highlighting made no measurable difference."
- **Gerbier, Bailly and Bosse (2015), SLaTE 2015, 59-64.** VERIFIED (abstract, OpenAlex and Semantic Scholar). "Thirty-five 6th grade pupils read 12 stories"; synchronous karaoke emphasis "significantly boosted the semantic memory by 10 points compared to the non-synchronous one (28% vs. 17% correct)"; "no benefit was observed in the orthographic task".
- **Gerbier, Bailly and Bosse (2018), Computer Speech & Language 47, 74-92.** VERIFIED (abstract via HAL API, hal-01575227). "Forty French children from 3rd to 5th grade." Words turned from grey to black as spoken, "in a karaoke-like fashion". "The effect of synchronizing was null in the orthographic task and negative in the semantic task. Children's preference was mainly for the S- condition, except for the poorest readers who tended to prefer the S+ condition." Fewer regressive saccades: the highlight "forced the children to be strictly aligned with the oral modality."
  - Sentence: "In a 2018 follow-up with 40 children, Gerbier, Bailly and Bosse found that karaoke-style highlighting made no difference to spelling memory and a negative difference to word meaning; only the weakest readers tended to prefer it."
  - Title note: Crossref writes "Audio-visual" with an en dash (U+2013) between the words; the Sources block uses an ASCII hyphen, as the existing post does.
- **Liao, Chang, Huang and Sung (2020), Computers & Education 144, 103703.** VERIFIED (abstract). "Sixty-one 4-5 year old Taiwanese children"; "the highlight synchronization design did entice children to look at the print more (from 19% to 38% reading time)". Attention to print, not comprehension.
- **Moussaoui, Siddiqi, Cheung and Niemeier (2025), Journal of the International Neuropsychological Society 31(9-10), 731-742.** VERIFIED (abstract). Undergraduates with and without ADHD read in FULL, "PACED reading that preserved text layout with one word at a time appearing at its usual location in the text", and RSVP (one word at a time in the centre). ADHD readers did better only with RSVP, "by almost 13% relative to neurotypical controls". No audio was used and PACED hides the rest of the text, so this is **not** a highlighting study. n not in the abstract (UNVERIFIED; earlier notes say 76).
- **Amazon and Audible claims.** VERIFIED (pages fetched 2026-11-10, curl).
  - Audible newsroom, "Audible Launches Immersion Reading for Deeper Engagement with Books", dated 2026-02-18: "Research shows that combining the two can improve focus and comprehension, and Audible's own data backs this up." No study is named or linked (checked the HTML around the sentence).
  - Same page: "Customers who currently listen while reading along are among Audible's most engaged users, consuming nearly twice as much content per month as audiobook-only customers." This is usage data from self-selected customers, not an effect of the feature.
  - Same page: "In a recent U.S. survey of people who read and listen together, more than nine in ten agreed that reading while listening improves cognitive retention and comprehension." No sample size, sponsor, date or method is given, and the respondents were people who already read and listen together.
  - The newsroom excerpt repeats it: "follow along with highlighted text synchronized to the narration while listening to an audiobook, which research shows improves focus and comprehension."
  - Audible newsroom, "Audible's Read & Listen Experience Comes to More Listeners Around the Globe" (2026-10-26): no new research claim in the body.
  - **Search result:** no peer-reviewed study of Amazon Immersion Reading, Whispersync for Voice or Audible Read & Listen in ERIC ("immersion reading", "Whispersync"), Europe PMC ("immersion reading" OR "whispersync") or Crossref. The only Crossref hit for "Whispersync" is a 2015 Scientific American Mind item, "Book Smart: Whispersync for Voice" (10.1038/scientificamericanmind0715-71a), a short magazine piece, not a study. No school pilot report was found. Conclusion: the "boosts comprehension" claim traces to general reading-while-listening research (whose own best summary calls the benefit over reading "trivial") plus an unpublished customer survey.

### 4. E-ink vs LCD screens (eye strain, comprehension, sleep)

**Short answer:** e-ink is not shown to improve comprehension over a phone or tablet. One small study with a Kindle Paperwhite found less visual fatigue than an LCD tablet. For sleep, the evidence is about bright tablets vs printed books; the front-lit Paperwhite has not been tested.

**Eye strain**
- **Benedetto, Drai-Zerbib, Pedrotti, Tissier and Baccino (2013), PLoS ONE 8(12), e83676.** VERIFIED (abstract and full text via BioC PMC3873942). "Twelve participants (5 males, mean age = 27 years, SD = 4)". Within-subjects, three sessions about ten days apart, each over an hour (mean 73 min), on a Kindle Paperwhite (E-ink, 212 ppi), a Kindle Fire HD (LCD) and a paper book.
  - Abstract: "reading on the LCD (Kindle Fire HD) triggers higher visual fatigue with respect to both the E-ink (Kindle Paperwhite) and the paper book. The absence of differences between E-ink and paper suggests that, concerning visual fatigue, the E-ink is indeed very similar to the paper."
  - Table: Visual Fatigue Scale (1-10) after reading: LCD 3.36, E-ink 2.90, paper 2.44. Blinks per second: LCD 0.43, E-ink 0.61, paper 0.61. Preference (1-7): LCD 3.55, E-ink 4.45, paper 6.64.
  - Sentence: "In a 2013 study, Benedetto and colleagues had 12 adults read for over an hour on a Kindle Paperwhite, a Kindle Fire HD and a paper book; the LCD tablet produced more visual fatigue and less blinking, while the Paperwhite was no different from paper."
- **Siegenthaler, Bochud, Bergamin and Wurtz (2012), Ophthalmic and Physiological Optics 32(5), 367-374.** VERIFIED (abstract, Crossref and Europe PMC PMID 22762257). Participants "read for several hours on either e-Ink or LCD"; "reading on the two display types is very similar in terms of both subjective and objective measures." Conclusion: "It is not the technology itself, but rather the image quality that seems crucial for reading." n not in the abstract.
- **Kretzschmar, Pleimling, Hosemann, Füssel, Bornkessel-Schlesewsky and Schlesewsky (2013), PLoS ONE 8(2), e56178.** VERIFIED (abstract and full text via BioC PMC3566074). 36 younger adults (one excluded) and 21 older adults (60 to 77) read short texts on a paper page, a Kindle 3 e-reader and an iPad 2. "Comprehension accuracy did not differ across the three media for either group." Older adults showed shorter fixations and lower EEG theta on the tablet, which the authors attribute to its higher contrast. Participants still "overwhelmingly chose the paper page".
  - Sentence: "In a 2013 study of 57 younger and older adults, Kretzschmar and colleagues found no difference in comprehension between paper, a Kindle and an iPad; older readers actually read with less effort on the backlit tablet."

**Comprehension**
- **Delgado, Vargas, Ackerman and Salmerón (2018), Educational Research Review 25, 23-38.** VERIFIED (abstract via OpenAlex). 54 studies (38 between-participants, 16 within) with 171,055 participants, 2000 to 2017: paper beat digital, g = -0.21. The paper advantage grew under time pressure and held for informational texts "but not on those using only narrative texts". Covers screens in general, not e-ink specifically.
- **Clinton (2019), Journal of Research in Reading 42(2), 288-325.** VERIFIED (abstract, Crossref). 33 studies, n = 2,799: screens g = -.25; expository g = -.32; "no difference with narrative texts (g = -.04)".
- **Mangen, Olivier and Velay (2019), Frontiers in Psychology 10, 38.** VERIFIED (abstract and full text via BioC PMC6384527). "Fifty young adults (mean age 24 ± 3.9; 32 females)" read a 28-page mystery story (about 1 hour) on a Kindle DX or in print. "on most tests subjects performed identically whatever the reading medium", but print readers did better on chronology and plot reconstruction. Only two of the 50 were regular Kindle readers.
- **Cavalli, Colé, Brèthes, Lefevre, Lascombe and Velay (2019), Annals of Dyslexia 69(2), 243-259.** VERIFIED (abstract). "Thirty adults with dyslexia and 30 matched skilled readers" read the same text in print and on "an e-book (Amazon Kindle)". With print, dyslexic adults matched skilled readers; on the Kindle they were outperformed on literal and spatiotemporal tasks. The abstract does not name the Kindle model. Optional, and it cuts against an easy "Kindle is fine for dyslexia" line.

**Sleep**
- **Chang, Aeschbach, Duffy and Czeisler (2015; online December 2014), PNAS 112(4), 1232-1237.** VERIFIED (abstract via Europe PMC; numbers from the PMC page via WebFetch). 12 healthy young adults, randomized crossover, five evenings of about 4 hours reading in each condition, on an iPad ("LE-eBook") or a printed book.
  - Sleep latency 25.65 vs 15.75 min (P = 0.009), "nearly 10 min longer to fall asleep".
  - Evening melatonin suppressed by 55.12% with the iPad; REM 109.04 vs 120.86 min (P = 0.03); sleepier next morning.
  - Kindle: the Penn State release (EurekAlert, 2014-12-22) says "The Kindle e-reader does not emit light, while the iPad, Kindle Fire and Nook Color emit similar amounts of light." VERIFIED from the release, not from the paper's supplementary table (not reached). The release does not name the Kindle model; "does not emit light" implies one without a front light, so it says nothing about a front-lit Paperwhite (my inference).
  - Sentence: "In a 2015 lab study of 12 adults, Chang and colleagues found that four hours of reading on an iPad before bed delayed sleep by about 10 minutes and suppressed melatonin compared with a printed book."
- **Grønli, Byrkjedal, Bjorvatn, Nødtvedt, Hamre and Pallesen (2016), Sleep Medicine 21, 86-92.** VERIFIED (abstract, Europe PMC). "Sixteen students" read for 30 min in bed at home from an iPad or a book. The iPad decreased subjective sleepiness and "delayed the EEG dynamics of slow wave activity by approximately 30 min", but "No parameters of sleep state timing and sleep onset latency differed between the two reading conditions." Useful counterweight: at a normal 30 minutes, the effect was smaller.

### 5. Mind wandering: why people want the text in front of them

- **Varao Sousa, Carriere and Smilek (2013), Frontiers in Psychology 4, 892.** VERIFIED (abstract and full text via BioC PMC3842750). "A total of 235 University of Waterloo students participated (Sample 1: 114; Sample 2: 121)"; the analyses have 106 and 105 participants (df 105 and 104), so 211 analysed. Each person read one Bill Bryson passage aloud, heard one and read one silently, with thought probes.
  - "Here we see similar rates of mind wandering for Listening (M = 0.506) and Reading Silently (M = 0.356)". Reading aloud produced the least.
  - "Listening to the passage was also associated with the poorest memory performance and the least interest in the material."
  - Sentence: "In a 2013 study of 211 students, Varao Sousa, Carriere and Smilek found that minds wandered at about half of random check-ins while listening, against about a third while reading silently, and listening also left the weakest memory of the passage."
- **Bonifacci, Viroli, Vassura, Colombini and Desideri (2023; online 2022), Psychonomic Bulletin & Review 30(1), 40-59.** VERIFIED (abstract). 25 studies, 73 correlations: pooled r = -0.21 between mind wandering and reading comprehension; the link vanished when mind wandering was measured by trait questionnaire rather than in-the-moment probes.
- **Bonifacci et al. (2022)** (section 2): text-to-speech reading reduced mind wandering in 70 students, most for those with dyslexia. The closest thing to a reading-along mind-wandering study.
- **Gap:** no study measured mind wandering in adults reading along with an audiobook (also noted in the 2026-10-23 and 2026-11-07 research).

---

## (c) What the evidence does not show

- **No study tests Amazon's Immersion Reading, Whispersync for Voice, Audible Read & Listen or any commercial read-along app**, HushBook included. Audible's "research shows" line cites nothing, and its survey has no published method.
- **No study shows synced highlighting adds anything for adults.** The only direct with/without comparison (Keelor 2023) found no difference, in children with reading difficulties. The karaoke studies are in children and disagree (Gerbier 2015 vs 2018).
- **No study compares reading along on an e-ink screen with reading along on a phone.** The e-ink studies test silent reading only.
- **E-ink is not shown to improve comprehension.** Kretzschmar 2013 (Kindle 3, iPad 2, paper) found no comprehension difference; Mangen 2019 found the Kindle equal on most measures and worse only on chronology. The screen-vs-paper meta-analyses (Delgado 2018, Clinton 2019) found no paper advantage for narrative text.
- **The eye-strain advantage rests on small studies with old hardware.** Benedetto 2013 had 12 people and a Paperwhite of that era (212 ppi, published December 2013; the paper does not say whether the front light was on); Siegenthaler 2012 found e-ink and LCD about the same and credited image quality, not technology. Modern phone and tablet screens were not tested.
- **No sleep study tests a front-lit e-ink reader.** Chang 2015 compared an iPad with a printed book (12 people, 4 hours a night); its "Kindle e-reader does not emit light" line (press release, model not named) cannot describe a front-lit Paperwhite. Grønli 2016 found no change in sleep onset after 30 minutes of iPad reading.
- **Whole books over weeks are untested.** Most reading-while-listening studies use passages or one chapter; the longest e-ink session was about 73 minutes.
- **Benefits for confident adult readers are small or absent.** Self-paced g = 0.06 (Clinton-Lisell 2023); no edge over reading (Hui 2024; Rogowsky 2016); slightly worse than reading in Hui and Godfroid 2026.
- **Mind wandering while reading along has not been measured in adults.** The case for "text keeps you on track" is indirect: listening drifts most (Varao Sousa 2013), and text-to-speech reading cut drifting in students (Bonifacci 2022).
- **Most learner studies are classroom students learning English**, so the numbers may not transfer to every reader or language.

---

## (d) Sources (ready to paste)

- [Clinton-Lisell (2023), "Does Reading While Listening to Text Improve Comprehension Compared to Reading Only? A Systematic Review and Meta-Analysis", Educational Research: Theory and Practice (ERIC EJ1403866)](https://eric.ed.gov/?id=EJ1403866)
- [Adesope and Nesbit (2012), "Verbal redundancy in multimedia learning environments: A meta-analysis", Journal of Educational Psychology](https://doi.org/10.1037/a0026147)
- [Rogowsky, Calhoun and Tallal (2016), "Does Modality Matter? The Effects of Reading, Listening, and Dual Modality on Comprehension", SAGE Open](https://doi.org/10.1177/2158244016669550)
- [Hui (2024), "Scaffolding comprehension with reading while listening and the role of reading speed and text complexity", The Modern Language Journal](https://doi.org/10.1111/modl.12905)
- [Hui and Godfroid (2026), "Listening, Reading, or Both? Rethinking the Comprehension Benefits of Reading-While-Listening", Language Learning](https://doi.org/10.1111/lang.12721)
- [Brown, Waring and Donkaewbua (2008), "Incidental vocabulary acquisition from reading, reading-while-listening, and listening to stories", Reading in a Foreign Language (ERIC EJ815119)](https://files.eric.ed.gov/fulltext/EJ815119.pdf)
- [Chang and Millett (2014), "The effect of extensive listening on developing L2 listening fluency: some hard evidence", ELT Journal](https://doi.org/10.1093/elt/cct052)
- [Conklin, Alotaibi, Pellicer-Sanchez and Vilkaite-Lozdiene (2020), "What eye-tracking tells us about reading-only and reading-while-listening in a first and second language", Second Language Research](https://doi.org/10.1177/0267658320921496)
- [Wood, Moxley, Tighe and Wagner (2018), "Does Use of Text-to-Speech and Related Read-Aloud Tools Improve Reading Comprehension for Students With Reading Disabilities? A Meta-Analysis", Journal of Learning Disabilities](https://doi.org/10.1177/0022219416688170)
- [Montali and Lewandowski (1996), "Bimodal Reading: Benefits of a Talking Computer for Average and Less Skilled Readers", Journal of Learning Disabilities](https://doi.org/10.1177/002221949602900305)
- [Bonifacci, Colombini, Marzocchi, Tobia and Desideri (2022), "Text-to-speech applications to reduce mind wandering in students with dyslexia", Journal of Computer Assisted Learning](https://doi.org/10.1111/jcal.12624)
- [Keelor, Creaghead, Silbert, Breit and Horowitz-Kraus (2023), "Impact of text-to-speech features on the reading comprehension of children with reading and language difficulties", Annals of Dyslexia](https://doi.org/10.1007/s11881-023-00281-9)
- [Gerbier, Bailly and Bosse (2015), "Using Karaoke to enhance reading while listening: impact on word memorization and eye movements", SLaTE 2015](https://doi.org/10.21437/slate.2015-11)
- [Gerbier, Bailly and Bosse (2018), "Audio-visual synchronization in reading while listening to texts: Effects on visual behavior and verbal learning", Computer Speech & Language](https://doi.org/10.1016/j.csl.2017.07.003)
- [Liao, Chang, Huang and Sung (2020), "Electronic storybook design, kindergartners' visual attention, and print awareness: An eye-tracking investigation", Computers & Education](https://doi.org/10.1016/j.compedu.2019.103703)
- [Moussaoui, Siddiqi, Cheung and Niemeier (2025), "Reading without eye movements: Improving reading comprehension in young adults with attention-deficit/hyperactivity disorder (ADHD)", Journal of the International Neuropsychological Society](https://doi.org/10.1017/s1355617725101628)
- [Benedetto, Drai-Zerbib, Pedrotti, Tissier and Baccino (2013), "E-Readers and Visual Fatigue", PLoS ONE](https://doi.org/10.1371/journal.pone.0083676)
- [Siegenthaler, Bochud, Bergamin and Wurtz (2012), "Reading on LCD vs e-Ink displays: effects on fatigue and visual strain", Ophthalmic and Physiological Optics](https://doi.org/10.1111/j.1475-1313.2012.00928.x)
- [Kretzschmar, Pleimling, Hosemann, Füssel, Bornkessel-Schlesewsky and Schlesewsky (2013), "Subjective Impressions Do Not Mirror Online Reading Effort: Concurrent EEG-Eyetracking Evidence from the Reading of Books and Digital Media", PLoS ONE](https://doi.org/10.1371/journal.pone.0056178)
- [Delgado, Vargas, Ackerman and Salmerón (2018), "Don't throw away your printed books: A meta-analysis on the effects of reading media on reading comprehension", Educational Research Review](https://doi.org/10.1016/j.edurev.2018.09.003)
- [Clinton (2019), "Reading from paper compared to screens: A systematic review and meta-analysis", Journal of Research in Reading](https://doi.org/10.1111/1467-9817.12269)
- [Mangen, Olivier and Velay (2019), "Comparing Comprehension of a Long Text Read in Print Book and on Kindle: Where in the Text and When in the Story?", Frontiers in Psychology](https://doi.org/10.3389/fpsyg.2019.00038)
- [Cavalli, Colé, Brèthes, Lefevre, Lascombe and Velay (2019), "E-book reading hinders aspects of long-text comprehension for adults with dyslexia", Annals of Dyslexia](https://doi.org/10.1007/s11881-019-00182-w)
- [Chang, Aeschbach, Duffy and Czeisler (2015), "Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness", Proceedings of the National Academy of Sciences](https://doi.org/10.1073/pnas.1418490112)
- [Grønli, Byrkjedal, Bjorvatn, Nødtvedt, Hamre and Pallesen (2016), "Reading from an iPad or from a book in bed: the impact on human sleep. A randomized controlled crossover trial", Sleep Medicine](https://doi.org/10.1016/j.sleep.2016.02.006)
- [Varao Sousa, Carriere and Smilek (2013), "The way we encounter reading material influences how frequently we mind wander", Frontiers in Psychology](https://doi.org/10.3389/fpsyg.2013.00892)
- [Bonifacci, Viroli, Vassura, Colombini and Desideri (2023), "The relationship between mind wandering and reading comprehension: A meta-analysis", Psychonomic Bulletin & Review](https://doi.org/10.3758/s13423-022-02141-w)
- [Penn State (2014), "Light-emitting e-readers detrimentally shift circadian clock" (press release via EurekAlert)](https://www.eurekalert.org/news-releases/528564)
- [Audible newsroom (February 18, 2026), "Audible Launches Immersion Reading for Deeper Engagement with Books"](https://www.audible.com/about/newsroom/audible-launches-immersion-reading-for-deeper-engagement-with-books)

**Suggested core set for a short evidence section (8):** Clinton-Lisell 2023, Hui 2024, Brown 2008, Wood 2018, Keelor 2023, Varao Sousa 2013, Benedetto 2013, Chang 2015 (plus the Audible newsroom page for the claim check). Swap in Hui and Godfroid 2026, Gerbier 2018 or Kretzschmar 2013 as needed.

**Optional, not in the block:** Chang and Millett (2015), "Improving reading rates and comprehension through audio-assisted extensive reading for beginner learners", System, https://doi.org/10.1016/j.system.2015.05.003 (title VERIFIED; content carried from the 2026-10-23 notes); Milani, Lorusso and Molteni (2010), "The effects of audiobooks on the psychosocial adjustment of pre-adolescents and adolescents with dyslexia", Dyslexia, https://doi.org/10.1002/dys.397 (VERIFIED abstract). Not used: Siegenthaler et al. (2011), "Comparing reading processes on e-ink displays and print", Displays, https://doi.org/10.1016/j.displa.2011.05.005 (title VERIFIED; abstract unreachable), and Siegenthaler et al. (2012), "LCD vs. E-ink: An Analysis of the Reading Behavior", Journal of Eye Movement Research, https://doi.org/10.16910/jemr.5.3.5 (abstract VERIFIED: reading behaviour on tablets "very similar" to e-ink, tablets "may even provide better legibility" under artificial light; n unreachable).

---

## (e) Do not claim

- "Immersion Reading is proven to improve comprehension or retention." Audible names no study; its survey of existing read-and-listen users has no sample size or method.
- "More than nine in ten readers say it improves retention" as evidence. It is opinion from people who already use the feature. If quoted, attribute it to Audible and say no method was published.
- "Reading along makes you read twice as much." Audible's "nearly twice as much content" compares self-selected customers; it is not an effect of the feature.
- "Word highlighting boosts comprehension." Keelor 2023 found no difference with or without highlighting; Gerbier 2018 found a negative effect on word meaning.
- "Reading along beats reading on your own" for confident adults. Self-paced g = 0.06; Hui 2024 no difference; Hui and Godfroid 2026 slightly worse.
- "E-ink improves comprehension" or "a Paperwhite helps you remember more than a phone." No study shows this; Kretzschmar 2013 found no comprehension difference by device.
- "E-ink causes no eye strain" or "e-ink is proven better for your eyes." One 12-person study (Benedetto 2013) found less fatigue than an LCD tablet; Siegenthaler 2012 found e-ink and LCD about the same.
- "A Paperwhite won't affect your sleep." No study found tests the front light; the 2014 "does not emit light" line was about a Kindle the release does not name, and a lit screen by definition emits light.
- Chang 2015 numbers as if they were about phones at normal use. It was an iPad at full use for about 4 hours a night, 12 people, in a lab.
- "Kindle hurts comprehension." Mangen 2019 found the Kindle equal on most tests and worse only on chronology, with 50 people who mostly did not own a Kindle.
- Moussaoui 2025 as highlighting or read-along evidence. It used no audio and showed one word at a time with the rest hidden.
- "Reading along reduces mind wandering in adults." Not measured; cite Varao Sousa 2013 (listening drifts most) and Bonifacci 2022 (students, text-to-speech) as indirect evidence.
- "Reading along treats dyslexia or ADHD." These are reading aids; the studies measure comprehension on the day, not a cure. Keep the site's "reading aid, not medical" line.
- 235 participants for Varao Sousa 2013. 235 took part; 211 were analysed. Use 211.
- Sample sizes for Conklin 2020, Keelor 2023, Siegenthaler 2012 or Moussaoui 2025. None is in the abstracts read today.
- Effect sizes for Hui and Godfroid 2026 or Adesope and Nesbit 2012. None is in the abstracts.
- "Chang and Millett 2014" for the 64-student, 26-week reading-rate study. That is the 2015 System paper; the 2014 ELT Journal paper is about listening fluency over 13 weeks.
