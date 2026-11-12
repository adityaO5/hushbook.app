# Research evidence: best Pride and Prejudice audiobook (the read-or-listen block, Austen-specific findings, book facts)

Post: "Best Pride and Prejudice audiobook" (slug `best-pride-and-prejudice-audiobook`).

Scope: the studies for the "Should you read or listen to Pride and Prejudice?" section, anything empirical that is specific to Austen or to following her dialogue by ear, and the few book facts the post needs (publication, volumes, what Austen herself said about reading it aloud). Editions, runtimes, our counts and HushBook facts are in `research-platforms.md`.

Labels: **VERIFIED (today)** = read on 2026-11-12 in Crossref, OpenAlex, Europe PMC, Wikisource or Project Gutenberg with the script named. **VERIFIED 2026-11-11 (reused)** = checked yesterday with `../2026-11-11-best-war-and-peace-audiobook/scripts/wp-crossref-check.py` and written up in that folder's `research-evidence.md` section (f); per the brief these are reused, not re-derived. **UNVERIFIED** = not confirmed by a page read. **OUR CALCULATION** = a saved script on a saved text.

Method today: `scripts/pp-crossref-check.py` (Crossref title, container, volume, pages, dates, authors; OpenAlex abstract) for the four new DOIs; Europe PMC full text of Richardson 2020 (PMC7347852) for the Pride and Prejudice detail; Project Gutenberg #42078 (Austen's letters) downloaded into its own folder and read; Wikisource API for the 1813 edition. Python with `-I`.

---

## (a) What most shapes the post

1. **Austen herself expected the book to be read aloud, and complained about it.** The day her copy arrived, "in the evening we fairly set at it, and read half the first vol. to her" (letter to Cassandra, 29 January 1813). A week later: "Our second evening's reading to Miss B. had not pleased me so well, but I believe something must be attributed to my mother's too rapid way of getting on: though she perfectly understands the characters herself, she cannot speak as they ought." (4 February 1813). This is the hook for "pick a narrator who voices the characters, and a speed you can follow". VERIFIED (today).
2. **Austen on unattributed dialogue.** Same 29 January letter: 'a "said he," or a "said she," would sometimes make the dialogue more immediately clear; but "I do not write for such dull elves" as have not a great deal of ingenuity themselves.' Our count: 61.5% of the speech paragraphs carry no speaker or speech verb outside the quotes (research-platforms 3d). And on 4 February: "The greatest blunder in the printing that I have met with is in page 220, v. 3, where two speeches are made into one." VERIFIED (today).
3. **One empirical study used Pride and Prejudice for free indirect discourse:** Mikulan and Legac (2014): "The text for the experiment was from Jane Austen's Pride and Prejudice"; "a quarter of the study participants could hear the 'dual voice'". It tested reading, not listening; 38 non-native and 40 native (Croatian) students. VERIFIED (today).
4. **Pride and Prejudice was one of the audiobook scenes in Richardson et al. (2020)**, the study in which heart rate and skin conductance rose more for audiobook scenes than for the film versions. VERIFIED (today, full text).
5. **Read or listen, the general evidence** (reused): no reliable overall difference between reading and listening comprehension (Clinton-Lisell 2022, 46 studies); listening alone produces the most mind wandering (Varao Sousa 2013; Kopp and D'Mello 2016 with literary texts); reading along gives no reliable comprehension benefit to self-paced readers (Clinton-Lisell 2023) and scored below silent reading for second-language learners (Hui and Godfroid 2026). VERIFIED 2026-11-11 (reused).
6. **Time:** silent reading of fiction averages 260 words a minute (Brysbaert 2019), so the novel's 121,676 words take about 7 h 48 min to read silently against 13 h 26 min to hear at 151 wpm. VERIFIED (today) plus OUR CALCULATION.

---

## (b) Book facts

| Claim | Value | Source | Label |
|---|---|---|---|
| First edition | "The 1st edition, published in three volumes on 28 January 1813 by T. Egerton, Whitehall. Austen sold the copyright, and thus did not contribute to the modifications of later editions." | Wikisource, "Pride and Prejudice" versions page | VERIFIED (secondary, Wikisource editors' note) |
| Third edition | "published in two volumes in 1817 by T. Egerton" | same | VERIFIED (secondary) |
| Volume division | Volume I Chapters 1 to 23, Volume II Chapters 1 to 19, Volume III Chapters 1 to 19 (61 chapter links counted) | Wikisource, "Pride and Prejudice (1813)" contents, via MediaWiki API | VERIFIED |
| Volume openings | Vol. II Ch. I: "Miss Bingley's letter arrived, and put an end to doubt." Vol. III Ch. I: "Elizabeth, as they drove along, watched for the first appearance of Pemberley Woods with some perturbation" = Gutenberg #1342 Chapters 24 and 43 | Wikisource chapter pages; our script | VERIFIED |
| Austen's first copy | "I want to tell you that I have got my own darling child from London" (footnote: "Pride and Prejudice."), Chawton, Friday (January 29, 1813) | The Letters of Jane Austen (Brabourne selection), Project Gutenberg #42078, letter XL | VERIFIED (dates in brackets are the editor's) |
| Read aloud the first evening | "Miss B. dined with us on the very day of the book's coming, and in the evening we fairly set at it, and read half the first vol. to her" | same, letter XL | VERIFIED |
| Elizabeth | "I must confess that I think her as delightful a creature as ever appeared in print" | same, letter XL | VERIFIED |
| Dialogue tags | 'a "said he," or a "said she," would sometimes make the dialogue more immediately clear; but "I do not write for such dull elves" as have not a great deal of ingenuity themselves.' | same, letter XL | VERIFIED |
| Volume II | "The second volume is shorter than I could wish, but the difference is not so much in reality as in look, there being a larger proportion of narrative in that part." | same, letter XL | VERIFIED. Our count: Vol. II is 33,942 words against 41,105 (I) and 46,803 (III), and 45.1% of its words are inside quotation marks (40.5% without Darcy's letter) against 48.8% and 46.3% (research-platforms 3b, 3d). So it is shorter in words too, on the 1894 text |
| Reading aloud, speed | "Our second evening's reading to Miss B. had not pleased me so well, but I believe something must be attributed to my mother's too rapid way of getting on: though she perfectly understands the characters herself, she cannot speak as they ought." | same, letter XLI, Chawton, Thursday (February 4) | VERIFIED |
| "light and bright and sparkling" | "The work is rather too light and bright and sparkling: it wants shade" | same, letter XLI | VERIFIED |
| Printing error in the dialogue | "The greatest blunder in the printing that I have met with is in page 220, v. 3, where two speeches are made into one." | same, letter XLI | VERIFIED |
| Gutenberg readability | "Reading ease score: 69.2 (8th & 9th grade). Neither easy nor difficult to read." (War and Peace in Maude: 78.3, "7th grade"); "230347 downloads in the last 30 days" | gutenberg.org/ebooks/1342 | VERIFIED |
| Austen read her novels aloud to her family | Apple Books' description of the Beckinsale recording: "we know that Austen liked to test her novels by reading them out loud to her family" | Apple Books id1445220910 | A retailer's claim; use the letters above instead |

Recommended use: quote the "too rapid way of getting on … she cannot speak as they ought" sentence in the narrator or speed section, and the "said he … said she … dull elves" sentence in the who-is-speaking section. Both are short and from a primary text.

---

## (c) Read or listen: the evidence

### Reused (VERIFIED 2026-11-11 with `wp-crossref-check.py`; details and quotes from `../2026-11-11-best-war-and-peace-audiobook/research-evidence.md` section (f))

1. **Clinton-Lisell (2022), "Listening Ears or Reading Eyes: A Meta-Analysis of Reading and Listening Comprehension Comparisons", Review of Educational Research 92(4), 543-582. DOI 10.3102/00346543211060871.** "Based on robust variance estimation (46 studies; N = 4,687), the overall difference between reading and listening comprehension was not reliably different (g = 0.07, p = .23)." "Reading was beneficial over listening when the reading condition was self-paced (g = 0.13, p = .049)"; inferential questions g = 0.36.
2. **Varao Sousa, Carriere and Smilek (2013), "The way we encounter reading material influences how frequently we mind wander", Frontiers in Psychology 4. DOI 10.3389/fpsyg.2013.00892.** "reading aloud led to the least amount of mind wandering, while listening to the passage led to the most mind wandering. Listening to the passage was also associated with the poorest memory performance and the least interest in the material." 211 analysed students (from the Crime and Punishment research's full-text reading).
3. **Kopp and D'Mello (2016), "The Impact of Modality on Mind Wandering during Comprehension", Applied Cognitive Psychology 30(1), 29-40. DOI 10.1002/acp.3163.** Texts: "The Red Headed League (Experiment 1 and 2) and Walden (Experiment 3)". "An Audio only condition produced the most mind wandering." Audio plus text and self-paced reading "produced equivalent amounts of mind wandering". No sample size in the abstract; give none.
4. **Clinton-Lisell (2023), "Does Reading While Listening to Text Improve Comprehension Compared to Reading Only? A Systematic Review and Meta-Analysis", Educational Research: Theory and Practice. ERIC EJ1403866.** "30 eligible studies (total N = 1945)"; "a trivial overall benefit of reading while listening over reading only on comprehension was found g = 0.18"; experimenter-paced "g = 0.41"; "There were no reliable effects of reading while listening when reading was self-paced, g = 0.06".
5. **Hui and Godfroid (2026; online 12 June 2025), "Listening, Reading, or Both? Rethinking the Comprehension Benefits of Reading-While-Listening", Language Learning 76(1), 311-351. DOI 10.1111/lang.12721.** "eighty-six intermediate-to-advanced Chinese learners of English read, read and listened, and listened to different excerpts of a novel … participants comprehended the text less well when reading-while-listening than when reading it silently. Both reading conditions yielded better comprehension than listening-only."
6. **Rogowsky, Calhoun and Tallal (2016), "Does Modality Matter? The Effects of Reading, Listening, and Dual Modality on Comprehension", SAGE Open 6(3). DOI 10.1177/2158244016669550.** 91 participants, a preface and a chapter of a non-fiction book, by digital audiobook, e-text or both: "No statistically significant differences were found … at Time 1 or Time 2".
7. **Rodero and Lucas (2023), "Synthetic versus human voices in audiobooks: The human emotional intimacy effect", New Media & Society 25(7), 1746-1764. DOI 10.1177/14614448211024142.** "listeners enjoyed stories narrated by a human voice more than a synthetic one". No sample size in the abstract. Use it if the post mentions the many AI-voice listings.
8. **Murphy, Hoover, Agadzhanyan, Kuehn and Castel (2022), "Learning in double time: The effect of lecture video speed on immediate and delayed comprehension", Applied Cognitive Psychology 36(1), 69-82. DOI 10.1002/acp.3899.** "minimal costs incurred by increasing video speed from 1x to 1.5x, or 2x speed, but performance declined beyond 2x speed." Lecture videos, not novels.
9. Link-only: **Feng, D'Mello and Graesser (2013), "Mind wandering while reading easy and difficult texts", Psychonomic Bulletin & Review 20(3), 586-592, DOI 10.3758/s13423-012-0367-y**, already used in `/blog/how-to-read-classics-without-getting-bored`; link that post.

### Reused with a Pride and Prejudice detail added today

10. **Richardson, Griffin, Zaki, Stephenson, Yan, Curry, Noble, Hogan, Skipper and Devlin (2020), "Engagement in video and audio narratives: contrasting self-report and physiological measures", Scientific Reports 10, 11298. DOI 10.1038/s41598-020-68253-2.** Title and abstract VERIFIED 2026-11-11 (reused): "Although participants self-reported greater involvement for watching video relative to listening to auditory scenes, stronger physiological responses were recorded for auditory stories." **Today, full text (Europe PMC PMC7347852), VERIFIED:** "From classic literature we selected Pride and Prejudice and Great Expectations; from action novels we chose The Girl on the Train and The DaVinci Code; from crime fiction we chose Hound of the Baskervilles and The Silence of the Lambs and from Science Fiction/Fantasy we chose Alien: River of Pain and A Song of Ice and Fire". "109 participants were recruited … Of the 102 (41 M, 61F) who completed the experiment". Each participant "either heard a passage from an audiobook, or saw a TV or movie adaptation of the same scene". The site already cites it in `how-to-get-into-audiobooks` (with "The study was funded by Audible"). Limits: audio versus video, short scenes, arousal not understanding; results are pooled across the eight stories, not reported for Pride and Prejudice alone (do not say "Pride and Prejudice listeners' hearts…").

### New today (Crossref and OpenAlex via `scripts/pp-crossref-check.py`)

11. **Mikulan and Legac (2014), "The 'Dual Voice' of Free Indirect Discourse: A Reading Experiment with Croatian Speakers Reading a Literary Text in English and Croatian", Procedia - Social and Behavioral Sciences 158, 214-221. DOI 10.1016/j.sbspro.2014.12.077.** **VERIFIED** (Crossref: title, container, volume 158, pages 214-221, December 2014, authors Mikulan, Legac; abstract via OpenAlex).
    - "The text for the experiment was from Jane Austen's Pride and Prejudice."
    - "The experiment was conducted with two groups of participants: 38 non-native university students studying English … and 40 university students and native speakers of Croatian" (reading a Croatian translation).
    - "The results show that a quarter of the study participants could hear the 'dual voice'".
    - Fit: free indirect discourse is narration that carries a character's thoughts without "she thought"; the study shows most readers did not detect it even on the page. A listener has only the narrator's voice to go on. Limits: a reading study, small, student samples, not native English readers; it does not test listening. Suggested sentence: "In a 2014 reading experiment with a passage from Pride and Prejudice, only about a quarter of the 78 students could hear the 'dual voice' of narrator and character in Austen's free indirect style."
12. **Brysbaert (2019), "How many words do we read per minute? A review and meta-analysis of reading rate", Journal of Memory and Language 109, 104047. DOI 10.1016/j.jml.2019.104047.** **VERIFIED** (Crossref; abstract via OpenAlex).
    - "Based on the analysis of 190 studies (18,573 participants), we estimate that the average silent reading rate for adults in English is 238 words per minute (wpm) for non-fiction and 260 wpm for fiction."
    - "The average oral reading rate (based on 77 studies and 5965 participants) is 183 wpm."
    - "For silent reading of English non-fiction most adults fall in the range of 175–300 wpm; for fiction the range is 200–320 wpm."
    - Use: 121,676 words at 260 wpm = **7 h 48 min** of silent reading (range 6 h 20 min at 320 wpm to 10 h 8 min at 200 wpm), against 13 h 26 min at 151 wpm or 11 h 35 min for Rosamund Pike. OUR CALCULATION. Note that Karen Savage's LibriVox pace (about 196 wpm) is above Brysbaert's average oral reading rate (183). Already cited on the site (`why-cant-i-focus-on-reading`, "about 7.8 hours").
13. **Reichle, Reineberg and Schooler (2010), "Eye Movements During Mindless Reading", Psychological Science 21(9), 1300-1310. DOI 10.1177/0956797610378686.** **VERIFIED** (Crossref: issued 2010-08-02, print 2010-09; abstract via OpenAlex): "fixations during the latter were longer and less affected by lexical and linguistic variables than fixations during the former. Also, eye movements immediately preceding self-caught mind wandering were especially erratic."
    - The Austen detail is not in the abstract. From the 2026-11-07 research (`../2026-11-07-why-cant-i-focus-on-reading/research-evidence.md`, APS release of August 30, 2010, not re-read today): "Four undergraduate students at the University of Pittsburgh … a dozen or more one-hour reading sessions of Jane Austen's Sense and Sensibility, chosen because it's 'fairly easy but a little bit dry'". The site already uses this in `why-cant-i-focus-on-reading`. Fit: minds wander while reading Austen too; reading is not automatically the attentive option. Use at most one sentence; it is Sense and Sensibility, not Pride and Prejudice.
14. **Phillips (2015), "Literary Neuroscience and History of Mind" (chapter), in Zunshine (ed.), The Oxford Handbook of Cognitive Literary Studies. DOI 10.1093/oxfordhb/9780199978069.013.0004.** Title, book and year **VERIFIED** (Crossref; no abstract in OpenAlex). The full title on OUP's page per a search result: "Literary Neuroscience and History of Mind: An Interdisciplinary fMRI Study of Attention and Jane Austen" (search snippet; UNVERIFIED). What the experiment did, from Stanford's 2012 news story (stanford.edu, 2012-09-07, read today): "Participants read a full chapter from Mansfield Park, which is projected onto a mirror inside an MRI scanner", switching between "reading for pleasure or reading with a heightened attention to literary form"; participants were "all literary PhD candidates". Results as reported there: "the global increase in blood flow during close reading". Fit: weak (reading, Mansfield Park, a press story for the findings). Optional; leave out unless the post wants an Austen-and-the-brain line.

### What the evidence does not show

- No study tests listening to Pride and Prejudice (or any whole novel); Richardson used short scenes and compared audio with video.
- No study compares narrators, accents, or full-cast against solo readings for comprehension.
- No study measures how listeners attribute unattributed dialogue or follow free indirect discourse by ear; Mikulan and Legac tested reading.
- Reading along: no reliable comprehension gain for self-paced adult readers (Clinton-Lisell 2023, g = 0.06); worse than silent reading for second-language learners (Hui and Godfroid). Kopp and D'Mello's audio-plus-text result is about mind wandering, not comprehension.
- Murphy et al. used lecture videos.

---

## (d) Conflicts and cautions

1. **Word count:** ours 121,850 vs the site's 121,676 (0.1%); a sentence-count script in the classics post's notes gave 117,830. Keep 121,676.
2. **Sentence length:** our rough split gives 17.4 words a sentence; the classics post published "about 21 words a sentence" (its notes: 20.9). Different splitters; do not publish ours.
3. **Volume lengths:** Austen judged Volume II's shortness "not so much in reality as in look"; on the 1894 text it is also shorter in words. Her measure was the 1813 page count, which we did not check. Phrase it as "by our count of the words, Volume II is also the shortest".
4. **Richardson 2020:** results are pooled; do not attribute a heart-rate figure to the Pride and Prejudice scene.
5. **Mikulan and Legac:** non-native readers and a Croatian translation; "a quarter" is of all participants.
6. **Letters:** the Brabourne selection (1884) prints editorial dates in brackets; quote the words, date them "January 1813" and "February 1813".

---

## Sources

- [Wikisource, "Pride and Prejudice" (versions page: 1813 first edition in three volumes, 1817 third edition)](https://en.wikisource.org/wiki/Pride_and_Prejudice)
- [Wikisource, "Pride and Prejudice (1813)" (contents: Volume I, 23 chapters; Volumes II and III, 19 each)](https://en.wikisource.org/wiki/Pride_and_Prejudice_(1813))
- [Project Gutenberg, "Pride and Prejudice by Jane Austen | Project Gutenberg" (eBook #1342)](https://www.gutenberg.org/ebooks/1342)
- [Project Gutenberg, plain text of eBook #1342](https://www.gutenberg.org/cache/epub/1342/pg1342.txt)
- [Project Gutenberg, "The Letters of Jane Austen" (Brabourne selection, eBook #42078), letters XL and XLI](https://www.gutenberg.org/ebooks/42078)
- [Clinton-Lisell (2022), "Listening Ears or Reading Eyes: A Meta-Analysis of Reading and Listening Comprehension Comparisons", Review of Educational Research](https://doi.org/10.3102/00346543211060871)
- [Varao Sousa, Carriere and Smilek (2013), "The way we encounter reading material influences how frequently we mind wander", Frontiers in Psychology](https://doi.org/10.3389/fpsyg.2013.00892)
- [Kopp and D'Mello (2016), "The Impact of Modality on Mind Wandering during Comprehension", Applied Cognitive Psychology](https://doi.org/10.1002/acp.3163)
- [Clinton-Lisell (2023), "Does Reading While Listening to Text Improve Comprehension Compared to Reading Only? A Systematic Review and Meta-Analysis", Educational Research: Theory and Practice (ERIC EJ1403866)](https://eric.ed.gov/?id=EJ1403866)
- [Hui and Godfroid (2026), "Listening, Reading, or Both? Rethinking the Comprehension Benefits of Reading-While-Listening", Language Learning](https://doi.org/10.1111/lang.12721)
- [Richardson, Griffin, Zaki, Stephenson, Yan, Curry, Noble, Hogan, Skipper and Devlin (2020), "Engagement in video and audio narratives: contrasting self-report and physiological measures", Scientific Reports](https://doi.org/10.1038/s41598-020-68253-2)
- [Mikulan and Legac (2014), "The 'Dual Voice' of Free Indirect Discourse: A Reading Experiment with Croatian Speakers Reading a Literary Text in English and Croatian", Procedia - Social and Behavioral Sciences](https://doi.org/10.1016/j.sbspro.2014.12.077)
- [Brysbaert (2019), "How many words do we read per minute? A review and meta-analysis of reading rate", Journal of Memory and Language](https://doi.org/10.1016/j.jml.2019.104047)
- [Reichle, Reineberg and Schooler (2010), "Eye Movements During Mindless Reading", Psychological Science](https://doi.org/10.1177/0956797610378686)
- [Rogowsky, Calhoun and Tallal (2016), "Does Modality Matter? The Effects of Reading, Listening, and Dual Modality on Comprehension", SAGE Open](https://doi.org/10.1177/2158244016669550)
- [Rodero and Lucas (2023), "Synthetic versus human voices in audiobooks: The human emotional intimacy effect", New Media & Society](https://doi.org/10.1177/14614448211024142)
- [Murphy, Hoover, Agadzhanyan, Kuehn and Castel (2022), "Learning in double time: The effect of lecture video speed on immediate and delayed comprehension", Applied Cognitive Psychology](https://doi.org/10.1002/acp.3899)

Optional (only if the post uses them):
- [Phillips (2015), "Literary Neuroscience and History of Mind", in The Oxford Handbook of Cognitive Literary Studies](https://doi.org/10.1093/oxfordhb/9780199978069.013.0004)
- [Stanford Arts, "This is your brain on Jane Austen, and Stanford researchers are taking notes" (September 7, 2012)](https://arts.stanford.edu/this-is-your-brain-on-jane-austen-and-stanford-researchers-are-taking-notes/)
- [Feng, D'Mello and Graesser (2013), "Mind wandering while reading easy and difficult texts", Psychonomic Bulletin & Review](https://doi.org/10.3758/s13423-012-0367-y) (prefer linking `/blog/how-to-read-classics-without-getting-bored`)

## Do not claim

1. That any study tested listening to Pride and Prejudice as a whole, or compared its narrators, accents or full-cast versions.
2. A Pride-and-Prejudice-specific heart-rate or engagement figure from Richardson 2020 (results are pooled across eight stories).
3. That Mikulan and Legac tested listeners, or native English readers.
4. That reading along improves comprehension for self-paced adults (Clinton-Lisell 2023: g = 0.06, not reliable), or that listening is worse than reading in general (Clinton-Lisell 2022: no reliable difference).
5. Sample sizes for Kopp and D'Mello or Rodero and Lucas.
6. That Reichle et al. used Pride and Prejudice (it was Sense and Sensibility, and that detail is from a press release).
7. Phillips's findings as peer-reviewed results; only the 2012 Stanford news story was read.
8. That Austen "tested her novels by reading them aloud to her family" as a general habit (Apple's description); quote the 1813 letters instead.
9. Any word count but 121,676 (or "about 122,000") for the novel.
