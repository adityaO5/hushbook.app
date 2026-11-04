# Research: evidence for "How to Learn German With Audiobooks"

Evidence agent, 2026-11-04. Every new DOI below was checked against `api.crossref.org/works/<doi>`; titles, journals, volumes and years are copied from Crossref. Abstracts came from OpenAlex, Crossref or ERIC. Web pages and PDFs were fetched on 2026-11-04 and are quoted word for word. General evidence already verified in the Spanish sibling (`../2026-11-04-learn-spanish-with-audiobooks/research-evidence.md`) is listed under "Reused from the Spanish file" and was **not** re-verified.

---

## 1. How fast is spoken German? (Pellegrino, Coupé & Marsico 2011)

- "A cross-language perspective on speech information rate", *Language* 87(3), 539–558. https://doi.org/10.1353/lan.2011.0057
- **Source of the numbers:** the Spanish file read Table 1 from the LSA-hosted PDF (Wayback snapshot 2011-10-14). I tried to re-open it today: the Wayback Machine returned its bot block page and both HAL copies (hal-01133692, halshs-01178755) returned an HTML challenge page. The German row below is copied from the Spanish file. I checked it for internal consistency: information rate = density × syllable rate ÷ 5.22 (Vietnamese syllable rate) gives 0.79 × 5.97 ÷ 5.22 = 0.90 for German and 0.91 × 6.19 ÷ 5.22 = 1.08 for English, which match the table.
- Design: 20 short MULTEXT texts (written in British English and translated), read aloud by six to ten adult native speakers per language. Vietnamese is the reference (= 1). Read speech, not conversation.

| Language | Information density per syllable | Syllabic rate (syllables/sec) | Information rate |
|---|---|---|---|
| English | 0.91 (± 0.04) | 6.19 (± 0.16) | 1.08 (± 0.08) |
| **German** | **0.79 (± 0.03)** | **5.97 (± 0.19)** | **0.90 (± 0.07)** |
| Spanish | 0.63 (± 0.02) | 7.82 (± 0.16) | 0.98 (± 0.07) |
| French | 0.74 (± 0.04) | 7.18 (± 0.12) | 0.99 (± 0.09) |
| Italian | 0.72 (± 0.04) | 6.99 (± 0.23) | 0.96 (± 0.10) |
| Japanese | 0.49 (± 0.02) | 7.84 (± 0.09) | 0.74 (± 0.06) |

**What the numbers show (the brief needs a correction):**
- German had the **slowest syllable rate of the European languages tested** (5.97/s), slightly below English (6.19/s, about 4% fewer) and about **24% below Spanish** (7.82/s).
- German syllables are **denser than Spanish, French, Italian or Japanese ones** (0.79 vs 0.63 for Spanish, about 25% more information per syllable). They are **not denser than English ones**: English syllables carried more (0.91 vs 0.79).
- German's information rate (0.90) was the lowest of the European languages; only Japanese (0.74) was lower. Because information rate here is the inverse of how long it took to read the same text, the German readings took roughly **1.2 times as long as the English readings** of the same content (1.08 ÷ 0.90; derived, approximate).
- Safe wording for the post: "Compared with Spanish, German doesn't race. In one cross-language study, German readers produced about 6 syllables a second, against nearly 8 for Spanish, and each German syllable carried more meaning. The difficulty of German by ear is less about speed than about where the meaning lands in the sentence."
- Does not show: spontaneous speech, dialects, or audiobook narration speed. Few speakers per language.

### Coupé, Oh, Dediu & Pellegrino (2019): German is in the 17-language sample
- Already in the Spanish file (see Reused). New check today: the PMC full text lists the languages as "Indo-European [Catalan (CAT), German (DEU), English (ENG), French (FRA), Italian (ITA), Spanish (SPA), and Serbian (SRP)] ...". German-specific values are only in the supplement, which I did not check. Use it only for the general claim that languages converge on about 39 bits/s.

---

## 2. Why German is hard to follow by ear

**Main finding:** good L2 *listening* evidence exists for **case endings** (learners ignore them in real time) and partial evidence for **verb position**. I found **no study of L2 listeners and separable verbs**, and **no study of L2 listeners segmenting German compounds**. For those two, use descriptive grammar plus the native-listener study and the Twain quote below.

### Hopp (2015): learners of German don't use case endings to anticipate meaning
- "Semantics and morphosyntax in predictive L2 sentence processing", *International Review of Applied Linguistics in Language Teaching* 53(3). https://doi.org/10.1515/iral-2015-0014
- Design: visual-world eye-tracking while **listening**; **45 L1 English learners of German** and 12 German natives.
- Result: "German natives are found to integrate morphosyntactic and lexical-semantic information in anticipatory processing, while L2 learners only rely on lexical-semantic information for prediction. Moreover, there is no indication that increasing proficiency leads to the involvement of morphosyntax in predictive L2 processing."
- Shows: English speakers listening to German lean on word meanings and ignore case endings (der/den) when guessing what comes next, and more proficiency did not change that. Does not show: comprehension after the sentence ends, or what would fix it.

### Marsden, Marsden, Hopp, Jackson, Jochum-Critchley & Rogers (2026): case cues are missed in listening until trained
- "The Effects of Prediction Training on the Real-Time Processing, Offline Comprehension, and Oral Production of case in L2 German", *Language Teaching Research* (online 2026-06-05). https://doi.org/10.1177/13621688261444298 (accepted version open: https://eprints.whiterose.ac.uk/id/eprint/238993/)
- Design: intermediate learners of German, training group **N = 28**, comparison **N = 13**. Visual-world eye-tracking while listening to SVO and OVS sentences, plus aural comprehension and oral production.
- Result: "Pretest results showed that the two groups were similar, with no evidence of case-driven eye movements, and low accuracy in comprehension and production of case in OVS sentences. In posttests, the training group made gains in all measures, which were maintained at a delayed posttest." Prediction from case "was not established, but earlier processing of case-marking was. The comparison group made relatively smaller gains in comprehension and production, and showed no evidence of real-time processing of case."
- Shows: intermediate learners hearing "Den Koch ruft der Kellner" did not use "den" to work out who does what; explicit teaching plus focused listening practice helped. Does not show: anything about audiobooks. Small comparison group.

### Jackson (2008): verb position changes how hard case is to process
- "Proficiency Level and the Interaction of Lexical and Morphosyntactic Information During L2 Sentence Processing", *Language Learning* 58(4), 875–909. https://doi.org/10.1111/j.1467-9922.2008.00481.x
- Design: self-paced **reading**, L2 German speakers at two proficiency levels, subject-object ambiguities.
- Result: "advanced L2 German speakers rapidly integrated case-marking information during online processing ... However, there was evidence that the relative processing difficulty of object-first sentences was influenced by early access to the thematic verb. In contrast, intermediate L2 speakers were not immediately sensitive to case-marking information regardless of thematic verb placement."
- Shows: whether the main verb comes early or late in the clause matters for processing, and intermediate learners miss case cues. Does not show: listening (reading task). n not in the abstract.

### Clahsen & Felser (2006): learners parse by meaning, less by grammar
- "Grammatical processing in language learners", *Applied Psycholinguistics* 27(1), 3–42. https://doi.org/10.1017/s0142716406060024
- Overview of a research project comparing native speakers, child L1 learners and adult L2 learners (the abstract does not name the languages). "Adult learners are guided by lexical–semantic cues during parsing in the same way as native speakers, but less so by syntactic information."
- Shows: the general pattern behind the German-specific findings above. Does not show: German listening specifically; it is a theory-laden overview (the "shallow structure" account, which later work has debated).

### Isel, Gunter & Friederici (2003): in spoken compounds, the meaning-carrying head comes last (native listeners)
- "Prosody-assisted head-driven access to spoken German compounds.", *Journal of Experimental Psychology: Learning, Memory, and Cognition* 29(2), 277–288. https://doi.org/10.1037/0278-7393.29.2.277
- Design: 328 participants (native German listeners), four priming experiments.
- Result: "there is no primacy of the left constituents in accessing auditorily presented German compound words ... A clear priming effect of left constituents occurred only for compound words with a transparent right constituent that is the head of compound words in Germanic languages." Prosody (duration of the first morpheme) helps listeners split compounds.
- Shows: the right-hand part of a German compound is the head (a *Handschuh* is a kind of *Schuh*), and native listeners use timing cues to split compounds. Does not show: anything about learners. **No L2 compound-listening study found** (OpenAlex searches for L2 German compound processing and segmentation returned nothing relevant).

### Separable verbs and verb-final clauses: descriptive only
- No psycholinguistic study of L2 listeners and German separable verbs turned up in OpenAlex, Crossref or ERIC (searches: "L2 German separable verbs", "particle verbs German second language learners processing", "trennbare Verben Deutsch als Fremdsprache Erwerb", "verb-final clauses second language learners German"). The closest is an English verb-particle eye-tracking study (Tiv et al. 2019, *Frontiers in Psychology*, English-French bilinguals), which is about English and should not be used.
- **Mark Twain, quote verified against Project Gutenberg texts:**
  - *A Connecticut Yankee in King Arthur's Court* (1889), Chapter XXII, Gutenberg eBook #86 (https://www.gutenberg.org/ebooks/86): "Whenever the literary German dives into a sentence, that is the last you are going to see of him till he emerges on the other side of his Atlantic with his verb in his mouth." (Often misattributed to "The Awful German Language"; it is in *Connecticut Yankee*.)
  - *A Tramp Abroad* (1880), Appendix D "The Awful German Language", Gutenberg eBook #119 (https://www.gutenberg.org/ebooks/119): "The Germans have another kind of parenthesis, which they make by splitting a verb in two and putting half of it at the beginning of an exciting chapter and the OTHER HALF at the end of it. ... These things are called "separable verbs." ... A favorite one is REISTE AB--which means departed."
  - Same appendix on compounds: "it is built mainly of compound words constructed by the writer on the spot, and not to be found in any dictionary--six or seven words compacted into one, without joint or seam".
  - Use as colour, not evidence. The grammar facts themselves (finite verb last in subordinate clauses; separable prefix at the end of a main clause; past participle at the end) are standard and need no citation.

---

## 3. Frequency coverage: how many German words you need

### The dictionary
- Jones & Tschirner, *A Frequency Dictionary of German: Core Vocabulary for Learners*, Routledge, 2006. Crossref registers the Routledge e-book as https://doi.org/10.4324/9780203883037 (title "A Frequency Dictionary of German", authors Tschirner, Jones, e-book date 2015).
- 2nd edition: Tschirner & Möhring, *A Frequency Dictionary of German*, Routledge, 2019. https://doi.org/10.4324/9781315620008
- It lists the **4,000** most frequent words (confirmed by van der Knaap below: "Die häufigsten 4000 Wörter sind veröffentlicht (Jones/Tschirner 2006)"). **Its own coverage figures for the top 1,000 / 2,000 / 4,000 words are UNVERIFIED:** the introduction is not open, and I found no open Tschirner 2005/2009 paper with coverage tables (his 2007 *Deutsch als Fremdsprache* article "Korpuslinguistik und Deutsch als Fremdsprache", https://doi.org/10.37307/j.2198-2430.2007.04.02, is paywalled). Do not quote a percentage from the dictionary.

### van der Knaap (2018): coverage of 26 German novels (best German number)
- "Zur Bedeutung der Lexik für das literarische Lesen: Didaktische Erkenntnisse einer Textdeckungsuntersuchung" (English title: "The Significance of Vocabulary for Reading Literature: Didactic Evidence of an Analysis of Text Coverage"), *Informationen Deutsch als Fremdsprache* 45(4), 444–463. https://doi.org/10.1515/infodaf-2018-0069 (open copy: https://dspace.library.uu.nl/handle/1874/374312)
- Design: 26 German literary titles from a Dutch school reading catalogue (B1–C1, including Kafka's *Die Verwandlung*, Remarque's *Im Westen nichts Neues*, Zweig's *Schachnovelle*, and recent novels such as *Herr Lehmann*). Average length 41,408 tokens; 1,076,619 tokens in total. Coverage measured with Tschirner's Herder/BYU frequency lists (the Jones & Tschirner 4,000 extended to 5,000). The paper does not say proper nouns were removed.
- **Average coverage:** "74,6 % (1000; SD = 2,8), 84,2 % (3000; SD = 2,3) und 87,4 % (5000; SD = 2,1)".
- *Die Verwandlung*: 85.6% with the 3,000 list, 89.5% with the 5,000 list, and **268 more words** needed to reach 95%. *Im Westen nichts Neues*: 1,338 more words. *Der Hals der Giraffe*: 2,607. Across the remaining titles, "einen Durchschnitt von 675 Vokabeln, die pro Titel zusätzlich notwendig sind, um das 95 %-Optimum an Textdeckung zu erreichen."
- Conclusion: "Aus den Analysen der 26 ausgewählten literarischen Titel geht hervor, dass für eine sinnvolle Leseerfahrung optimale lexikalische Deckungsgrade nicht erreicht werden."
- Tschirner's CEFR vocabulary minima, quoted from van der Knaap's Table 1 (citing Tschirner 2009, secondary): A1 1,000; A2 2,000; B1 3,000; **B2 5,000**; C1 7,500; C2 10,000. Also: "Im Deutschen liegt das professionelle Wortschatzminimum bei 5000 Wörtern (Tschirner 2008a)."
- Shows: **even someone who knows the 5,000 most common German words meets about one unknown word in eight in a typical novel.** That is far below the 95–98% thresholds (see Hu & Nation, Laufer & Ravenhorst-Kalovski in the Spanish file). Does not show: comprehension (coverage only). Counts are word forms/lemmas from Tschirner's lists, not English word families, so do not compare directly with Nation's English figures.
- **Contrast with Spanish (careful):** Davies (2005) found 3,000 Spanish lemmas cover 89.6% of fiction; van der Knaap found 3,000 German words cover 84.2% of German novels. Different corpora and counting methods; at most say "German novels look harder on paper than Spanish ones in the two studies we found".

---

## 4. FSI: how long German takes

- Source: US Department of State, "Foreign Language Training" (NFATC), https://www.state.gov/national-foreign-affairs-training-center/foreign-language-training. Read on 2026-11-04 through the r.jina.ai reader (state.gov blocks curl).
- Exact lines:
  - "**Category II Languages:** Approximately 36 weeks (828 class hours)"
  - Languages listed under it: "German Haitian Creole Indonesian / Malay Swahili"
  - Category II has no descriptor line. Category I is "Languages close to English" (24–30 weeks, 552–690 class hours; Spanish and French 30 weeks). Category III is "Approximately 44 weeks (1,012 class hours)".
  - Same preamble as in the Spanish file: "A typical week is 23 hours per week in class and 17 hours of self-study."
- Arithmetic (derived, label it): 36 × 23 = 828 class hours, plus 36 × 17 = 612 self-study hours, so about **1,440 hours** in total, against about 1,200 for Spanish. German takes 6 more weeks than Spanish or French.
- Shows: FSI puts German one category harder than Spanish, French, Dutch or Swedish, for full-time classroom adults aiming at ILR 3. Does not show: hobby timelines or anything about listening.

---

## 5. Scale

### Learners worldwide: 15.4 million (2020 survey; the 2025 survey published no total)
- Auswärtiges Amt, "German as a foreign language: Growing numbers learning German in Africa and Asia" (2020). https://www.auswaertiges-amt.de/en/newsroom/news/german-as-a-foriegn-language/2347090 (the "foriegn" typo is in the URL)
  - "as found by the survey "Deutsch als Fremdsprache weltweit" on international interest in the German language, more than 15.4 million people around the world are learning German as a foreign language."
  - "Europe is still home to the largest number of German learners (11.2 million)."
  - "In the United States, in contrast, there are now 15% fewer people learning German."
  - "The Federal Foreign Office publishes this survey at five-year intervals in collaboration with the Goethe-Institut, Deutsche Welle, the German Academic Exchange Service and the Central Agency for Schools Abroad (ZfA)." "The Goethe-Institut coordinated the survey and processed the data."
  - German version (https://www.auswaertiges-amt.de/de/newsroom/deutsch-als-fremdsprache-2346756): "lernen weltweit mehr als 15,4 Millionen Menschen Deutsch"; "An den Hochschulen lernen aktuell 1,27 Millionen Studierende Deutsch."
- **2025 survey:** Auswärtiges Amt, "Aktuelle Trendanalyse zeigt Relevanz von Deutsch als Fremdsprache weltweit", https://www.auswaertiges-amt.de/de/newsroom/deutsch-als-fremdsprache-2728478 (publication PDF: https://www.auswaertiges-amt.de/resource/blob/2728424/6ac8bd93deae4f8cf3ed876bdd571647/deutsch-als-fremdsprache-weltweit-data.pdf, "Deutsch als Fremdsprache weltweit 2025"). Exact quote: "Da die Vollständigkeit und Verfügbarkeit von Daten bei der diesjährigen Erhebung in einzelnen Ländern stark variiert, wird in diesem Jahr davon abgesehen, eine Gesamtzahl an Deutschlernenden weltweit zu veröffentlichen." I searched the PDF text: no worldwide total.
- **Safe wording:** "More than 15.4 million people were learning German as a foreign language in the last official count (2020); the 2025 survey did not publish a total." Do not use the "14.5 million" figure that circulates in press summaries; I found no primary source for it.

### Speakers
- Facts about Germany, "Attractive Language", https://www.tatsachen-ueber-deutschland.de/en/culture-and-art/attractive-language (fetched 2026-11-04; publisher not re-checked):
  - "German is the most widely spoken first language in the European Union and ranks twelfth in the world's most widely spoken languages. Around 130 million people around the world ... speak German as their first language or regularly use it as a second language."
  - "More than 15.5 million people around the world are learning German." (Note: 15.5 here vs 15.4 in the Foreign Office release. Use 15.4 from the primary.)
- The 130 million figure **mixes first-language and regular second-language speakers**; it is not a native-speaker count. Ethnologue's native-speaker figure is paywalled and was **not checked**. Safe wording: "about 130 million people speak German as a first language or use it regularly".

### MLA enrollment census, fall 2021 (same report as the Spanish file)
- https://www.mla.org/content/download/191324/file/Enrollments-in-Languages-Other-Than-English-in-US-Institutions-of-Higher-Education-Fall-2021.pdf
- Table 1a, German row: **2009: 95,613; 2013: 86,782 (−9.2%); 2016: 80,594 (−7.1%); 2021: 53,543 (−33.6%).**
- Exact quotes:
  - "German had the biggest decline, 33.6%, followed by Arabic (27.4%) and Modern Hebrew (26.0%)."
  - "ASL continues to hold third place, having displaced German in 2013." "German has dropped further down, and Japanese has taken its place in fourth." (So German is fifth.)
  - "172 fewer institutions reported German enrollments and 164" fewer reported French (sentence continues on the page).
- Shows: German is still a top-five college language in the US but lost a third of its enrollments between 2016 and 2021. Use it only as context; it says nothing about learning.

---

## 6. German-specific studies with reading, listening, captions or audio

**Main finding: no audiobook or reading-while-listening study with learners of German was found** (OpenAlex, Crossref and ERIC: "reading while listening German", "German learners captions", "extensive reading German audio", "Deutsche Welle learners study"). The German evidence is extensive reading, incidental vocabulary and grammar from reading, captions (mostly descriptive or qualitative), and a listening-lags-reading result.

### Maxim (2002): a whole novel in first-semester German
- "A Study into the Feasibility and Effects of Reading Extended Authentic Discourse in the Beginning German Language Classroom", *The Modern Language Journal* 86(1), 20–35. https://doi.org/10.1111/1540-4781.00134 (ERIC EJ643200)
- Design: first-semester US college German. Treatment group **N = 27** read a **142-page romance novel** in class instead of textbook readings; comparison **N = 32**.
- Result: "students were able to read a full-length authentic text in the first semester. Second, the treatment group performed as well as the comparison group on the three department tests and the posttest".
- Shows: beginners can get through a real German book with support, at no cost to their grammar-heavy exams. Does not show: an advantage (it was "as well as"), or audio.

### Arnold (2009): online extensive reading, advanced German
- "Online Extensive Reading for Advanced Foreign Language Learners: An Evaluation Study", *Foreign Language Annals* 42(2), 340–366. https://doi.org/10.1111/j.1944-9720.2009.01024.x
- Qualitative evaluation: "learners experienced a variety of affective and linguistic benefits. Interestingly, some learners purposely sought out more difficult texts to challenge themselves."
- Shows: learners of German liked self-selected reading and grew in confidence. Does not show: measured gains (no test; n not in the abstract).

### Rott (1999): how many encounters a new word needs
- "The Effect of Exposure Frequency on Intermediate Language Learners' Incidental Vocabulary Acquisition and Retention through Reading", *Studies in Second Language Acquisition* 21(4), 589–619. https://doi.org/10.1017/s0272263199004039 (ERIC EJ655719)
- Result: "only two encounters with unfamiliar words during reading significantly affected learners' vocabulary growth. Moreover, two or four exposure frequencies resulted in fairly similar word gain, but six exposures produced significantly more vocabulary knowledge." Receptive knowledge was retained over 4 weeks by "all but one experimental group".
- **The abstract does not name the language.** Rott's study is widely described as using intermediate learners of German, but I could not confirm this or the n from an open source. **Treat "German" as UNVERIFIED**; the finding itself is verified.

### Bordag, Kirschenbaum, Rogahn, Opitz & Tschirner (2017): gender learned from reading, except masculines
- "Misbehaved masculines: Incidental acquisition of grammatical gender in L2 German during reading", *Bilingualism: Language and Cognition* 22(1), 130–141. https://doi.org/10.1017/s1366728917000608
- Result: "advanced L2 learners are sensitive to gender agreement violations after as few as three to four exposures to a novel noun within a short text ... Whereas gender violation effects were observed for feminine and neuter nouns, no such effects were observed for masculine nouns."
- Shows: some der/die/das knowledge does come from input alone, fast. Does not show: production, or reliable learning of masculine nouns. n not in the abstract.

### Bordag, Kirschenbaum, Opitz, Rogahn & Tschirner (2015)
- "Incidental Acquisition of Grammatical Features During Reading in L1 and L2", *Studies in Second Language Acquisition* 38(3), 445–483. https://doi.org/10.1017/s0272263115000315
- L2 German readers picked up whether new verbs were transitive as well as natives did; "the syntactic complexity of the context and morphological markedness positively affect the incidental acquisition of new words in the L2". Optional citation.

### Tschirner (2016): listening lags reading in US college language programmes
- "Listening and Reading Proficiency Levels of College Students", *Foreign Language Annals* 49(2), 201–223. https://doi.org/10.1111/flan.12198 (ERIC EJ1104718)
- Design: "more than 3,000 participants studying seven languages at 21 universities and colleges across the United States." (The abstract does not name the seven languages; I did not confirm German is one of them.)
- Result: "while listening proficiency appears to develop more slowly, Advanced levels of reading proficiency appear to be attainable for college majors at graduation." It discusses "the apparent disconnect between listening and reading".
- Shows: classroom learners' ears fall behind their eyes, which is the gap read-along audio targets. Does not show: that read-along closes the gap. Author is the German frequency-dictionary author.

### Captions with learners of German (weak evidence)
- **Jolitz & Mally (2024)**, "The effects of deductive versus inductive pronunciation instruction in combination with captioned video on the acquisition of incongruent grapheme-phoneme correspondences in L2 German", *Die Unterrichtspraxis/Teaching German* 57(2), 180–199. https://doi.org/10.1111/tger.12294 (ERIC EJ1451021). Three beginner L1 English courses; captioned clips plus guided pronunciation questions vs a meaning-only control. The most mispronounced spellings were "< v > - /f/, < s > - /z/, and < z > - /ts/". "both experimental groups significantly improved in their word-level productions". Shows: captioned German video plus attention to spelling-sound links helped pronunciation. Does not show: that captions alone did it (the control lacked the instruction, not the captions). n not in the abstract.
- **Vanderplank (2019)**, "'Gist watching can only take you so far': attitudes, strategies and changes in behaviour in watching films with captions", *The Language Learning Journal* 47(4), 407–423. https://doi.org/10.1080/09571736.2019.1610033. EURECAP project: "36 learners of French, German, Italian and Spanish at intermediate level and above" watched self-chosen films with optional captions; viewers split into "Minimal users", "evolving users" and "maximal users". Qualitative; no German-only results.
- **Not experiments, do not cite as evidence:** Froehlich (1988), "German Videos with German Subtitles: A New Approach to Listening Comprehension Development", *Die Unterrichtspraxis* 21(2), https://doi.org/10.2307/3530283 (a teaching proposal); Yang (2020), "The Cognitive and Psychological Effects of YouTube Video Captions and Subtitles on Higher-Level German Language Learners", Springer chapter, https://doi.org/10.1007/978-3-030-34212-8_4 (a literature review plus the author's classroom practice).
- Lund (1991), *MLJ* 75(2) (in the Spanish file): ERIC EJ428684 confirms it "compared listening and reading recall among beginning and intermediate college German students", but **findings remain UNVERIFIED** (no abstract or full text).

---

## 7. Variety: Austrian, Swiss and northern German

- **No study found of learners' comprehension of Austrian, Swiss or northern Standard German** (OpenAlex: "Swiss Standard German comprehension learners", "Austrian German pluricentric learners listening", "regional accent German learners comprehension intelligibility", "learners of German dialect exposure listening").
- Closest, tangential: Ott (2025), "Beyond "Standard Language": Investigating L2 Learners' Perceptions of Language Use by Native Speakers of German", *Die Unterrichtspraxis/Teaching German* 58(1), 68–79. https://doi.org/10.1111/tger.70015. **n = 8** sojourners; "Wilcoxon signed-rank tests showed no significant differences in sojourners' preference toward standard language" across a stay. About attitudes, not comprehension. Optional.
- Practical line for the post: by analogy with the Spanish evidence (Schoonmaker-Gates 2018: learners understand the varieties they have heard most), start with a narrator in the variety you will need, then add others. Label it as an analogy from Spanish.

---

## 8. Honest limits specific to German

- **No study found that tests listening-only exposure against form-focused teaching for German case or gender production.** What exists:
  - Case endings go unused in real-time listening by intermediate learners (Marsden et al. 2026, pretest) and by L2 learners in general, with no improvement across proficiency levels in a cross-section (Hopp 2015, n = 45).
  - **VanPatten & Borst (2012)**, "The Roles of Explicit Information and Grammatical Sensitivity in Processing Instruction: Nominative-Accusative Case Marking and Word Order in German L2", *Foreign Language Annals* 45(1), 92–109. https://doi.org/10.1111/j.1944-9720.2012.01169.x. **46** third-semester learners of German heard sentences and picked a picture; the problem targeted was the "First-Noun Principle" (assuming the first noun is the subject). "the +EI group began processing sentences correctly before the −EI group." Shows: being told how der/den works speeds up learning to hear it.
  - **Henry (2025)**, "The Effects of Structured Input and Output on the Acquisition of the Accusative Case in L2 German", *Instructed Second Language Acquisition* 9(1), 1–29. https://doi.org/10.3138/isla-2024-0003. Structured input, structured output and mixed instruction: "The results showed few sustained differences between the three types of instruction." Shows: focused listening tasks can teach the accusative about as well as speaking tasks, when both make learners notice the ending. Not free listening.
  - **Henry (2022)**, "The additive use of prosody and morphosyntax in L2 German", *Studies in Second Language Acquisition* 45(2), 348–369. https://doi.org/10.1017/s0272263122000092. Third-semester L1 English learners trained with aural input: emphatic prosody vs monotone. Offline results were similar; in self-paced reading "only the PI+P group" used case markers "in all conditions". Shows: a narrator's stress and intonation can help learners notice case. Optional.
  - **Hopp (2016)**, "Learning (not) to predict: Grammatical gender processing in second language acquisition", *Second Language Research* 32(2), 277–307. https://doi.org/10.1177/0267658315624960. **34** intermediate L1 English learners of German trained on gender assignment then showed predictive gender processing, but "performance correlated with accuracy in gender assignment"; "target knowledge of lexical gender in the L2 lexicon is a prerequisite for predictive use of gender agreement". Shows: **learning each noun with its article is what unlocks hearing gender agreement.** Good basis for "save nouns with der/die/das".
  - **Hopp (2013)**, "Grammatical gender in adult L2 acquisition: Relations between lexical and syntactic variability", *Second Language Research* 29(1), 33–56. https://doi.org/10.1177/0267658312461803. 20 advanced to near-native L1 English speakers of L2 German: accuracy in assigning gender in production went with predictive gender processing in listening. Optional.
  - Bordag et al. (2017): reading alone taught gender sensitivity for feminine and neuter nouns but not masculine ones.
- Takeaway for the post: audiobooks give the repetitions; case and gender need a little explicit attention (learn nouns with their article; notice der/den/dem when you replay a sentence). The general production limits (Lightbown, Trofimovich, Shintani) are in the Spanish file.

---

## Reused from the Spanish file (do not re-verify)

Core, recommended for the German post (Sources lines copied exactly):
- [Hui and Godfroid (2025), "Listening, Reading, or Both? Rethinking the Comprehension Benefits of Reading-While-Listening", Language Learning](https://doi.org/10.1111/lang.12721)
- [Peterson (2025), "Exploring general language ability development through monitored extensive reading, extensive listening, and audio-assisted extensive reading", Foreign Language Annals](https://doi.org/10.1111/flan.70043)
- [Reynolds, Cui, Kao and Thomas (2022), "Vocabulary Acquisition through Viewing Captioned and Subtitled Video: A Scoping Review and Meta-Analysis", Systems](https://doi.org/10.3390/systems10050133)
- [Montero Perez, Peters, Clarebout and Desmet (2014), "Effects of captioning on video comprehension and incidental vocabulary learning", Language Learning & Technology](https://doi.org/10.64152/10125/44357)
- [Jensen and Vinther (2003), "Exact Repetition as Input Enhancement in Second Language Acquisition", Language Learning](https://doi.org/10.1111/1467-9922.00230)
- [Zhao (1997), "The Effects of Listeners' Control of Speech Rate on Second Language Comprehension", Applied Linguistics](https://doi.org/10.1093/applin/18.1.49)
- [Pellegrino, Coupé and Marsico (2011), "A cross-language perspective on speech information rate", Language](https://doi.org/10.1353/lan.2011.0057)
- [van Zeeland and Schmitt (2013), "Lexical Coverage in L1 and L2 Listening Comprehension: The Same or Different from Reading Comprehension?", Applied Linguistics](https://doi.org/10.1093/applin/ams074)
- [Hu and Nation (2000), "Unknown vocabulary density and reading comprehension", Reading in a Foreign Language](https://doi.org/10.64152/10125/66973)
- [Kremmel, Indrarathne, Kormos and Suzuki (2023), "Unknown Vocabulary Density and Reading Comprehension: Replicating Hu and Nation (2000)", Language Learning](https://doi.org/10.1111/lang.12622)
- [U.S. Department of State, "Foreign Language Training"](https://www.state.gov/national-foreign-affairs-training-center/foreign-language-training)
- [Modern Language Association (2023), "Enrollments in Languages Other Than English in US Institutions of Higher Education, Fall 2021"](https://www.mla.org/content/download/191324/file/Enrollments-in-Languages-Other-Than-English-in-US-Institutions-of-Higher-Education-Fall-2021.pdf)
- [Lightbown, Halter, White and Horst (2002), "Comprehension-Based Learning: The Limits of 'Do It Yourself'", The Canadian Modern Language Review](https://doi.org/10.3138/cmlr.58.3.427)
- [Trofimovich, Lightbown, Halter and Song (2009), "Comprehension-based practice: The development of L2 pronunciation in a listening and reading program", Studies in Second Language Acquisition](https://doi.org/10.1017/s0272263109990040)
- [Krashen (1982), "Principles and Practice in Second Language Acquisition"](https://www.sdkrashen.com/content/books/principles_and_practice.pdf)

Optional reuse:
- [Coupé, Oh, Dediu and Pellegrino (2019), "Different languages, similar encoding efficiency: Comparable information rates across the human communicative niche", Science Advances](https://doi.org/10.1126/sciadv.aaw2594)
- [Montero Perez, Van Den Noortgate and Desmet (2013), "Captioned video for L2 listening and vocabulary learning: A meta-analysis", System](https://doi.org/10.1016/j.system.2013.07.013)
- [McBride (2011), "The effect of rate of speech and distributed practice on the development of listening comprehension", Computer Assisted Language Learning](https://doi.org/10.1080/09588221.2010.528777)
- [Laufer and Ravenhorst-Kalovski (2010), "Lexical threshold revisited: Lexical text coverage, learners' vocabulary size and reading comprehension", Reading in a Foreign Language](https://doi.org/10.64152/10125/66648)
- [Nation (2006), "How Large a Vocabulary is Needed For Reading and Listening?", The Canadian Modern Language Review](https://doi.org/10.3138/cmlr.63.1.59)
- [Shintani, Li and Ellis (2013), "Comprehension-Based Versus Production-Based Grammar Instruction: A Meta-Analysis of Comparative Studies", Language Learning](https://doi.org/10.1111/lang.12001)
- [Gregg (1984), "Krashen's Monitor and Occam's Razor", Applied Linguistics](https://doi.org/10.1093/applin/5.2.79)
- [Bisson, van Heuven, Conklin and Tunney (2013), "Incidental Acquisition of Foreign Language Vocabulary through Brief Multi-Modal Exposure", PLoS ONE](https://doi.org/10.1371/journal.pone.0060912)
- [Schoonmaker-Gates (2018), "Dialect comprehension and identification in L2 Spanish: Familiarity and type of exposure", Studies in Hispanic and Lusophone Linguistics](https://doi.org/10.1515/shll-2018-0007) (only as an analogy for narrator variety)

Spanish-only sources to leave out: Montero Perez & Pattemore 2025, Winke et al. 2010/2013, Markham et al. 2001/2003, Stewart & Pertusa 2004, Rodrigo et al. 2004, Davies 2005, Instituto Cervantes, Dreaming FAQ.

---

## What the evidence does not show

1. No controlled study of learners of **German** using **audiobooks** or reading-while-listening was found. German evidence covers extensive reading (Maxim, Arnold), incidental learning from reading (Rott, Bordag et al.), captions (weak or qualitative) and listening-processing lab studies.
2. That German is "fast". In read speech German had fewer syllables per second than English or Spanish (5.97 vs 6.19 vs 7.82). Its syllables are denser than Spanish ones but **less dense than English ones**, so the brief's "slower but denser" holds against Spanish, not against English.
3. That listening on its own teaches learners to use case endings. Intermediate learners did not use der/den while listening until trained (Marsden et al. 2026), and proficiency did not change this in a cross-section (Hopp 2015). No input-only vs instruction study for German case production was found.
4. Any L2 listening study on separable verbs or on splitting compounds. Both rest on grammar description, a native-listener study (Isel et al. 2003) and Twain.
5. The Jones & Tschirner dictionary's own coverage percentages (UNVERIFIED). The verified German figure is van der Knaap's: 5,000 words cover 87.4% of 26 novels on average.
6. A current worldwide learner total. The last one is 15.4 million (2020); the 2025 survey deliberately published none.
7. A verified native-speaker count. The 130 million figure includes regular second-language users.
8. Anything about Austrian, Swiss or northern German comprehension for learners.
9. That Rott (1999) used learners of German, and its sample size (UNVERIFIED).

---

## Sources (ready to paste, new ones only)

Core:
- [Hopp (2015), "Semantics and morphosyntax in predictive L2 sentence processing", International Review of Applied Linguistics in Language Teaching](https://doi.org/10.1515/iral-2015-0014)
- [Marsden, Marsden, Hopp, Jackson, Jochum-Critchley and Rogers (2026), "The Effects of Prediction Training on the Real-Time Processing, Offline Comprehension, and Oral Production of case in L2 German", Language Teaching Research](https://doi.org/10.1177/13621688261444298)
- [Jackson (2008), "Proficiency Level and the Interaction of Lexical and Morphosyntactic Information During L2 Sentence Processing", Language Learning](https://doi.org/10.1111/j.1467-9922.2008.00481.x)
- [Clahsen and Felser (2006), "Grammatical processing in language learners", Applied Psycholinguistics](https://doi.org/10.1017/s0142716406060024)
- [Isel, Gunter and Friederici (2003), "Prosody-assisted head-driven access to spoken German compounds", Journal of Experimental Psychology: Learning, Memory, and Cognition](https://doi.org/10.1037/0278-7393.29.2.277)
- [Twain (1889), "A Connecticut Yankee in King Arthur's Court", Project Gutenberg](https://www.gutenberg.org/ebooks/86)
- [Twain (1880), "A Tramp Abroad", Appendix D: "The Awful German Language", Project Gutenberg](https://www.gutenberg.org/ebooks/119)
- [van der Knaap (2018), "Zur Bedeutung der Lexik für das literarische Lesen: Didaktische Erkenntnisse einer Textdeckungsuntersuchung", Informationen Deutsch als Fremdsprache](https://doi.org/10.1515/infodaf-2018-0069)
- [Jones and Tschirner (2006), "A Frequency Dictionary of German: Core Vocabulary for Learners", Routledge](https://doi.org/10.4324/9780203883037)
- [Tschirner and Möhring (2019), "A Frequency Dictionary of German", 2nd ed., Routledge](https://doi.org/10.4324/9781315620008)
- [Auswärtiges Amt (2020), "German as a foreign language: Growing numbers learning German in Africa and Asia"](https://www.auswaertiges-amt.de/en/newsroom/news/german-as-a-foriegn-language/2347090)
- [Auswärtiges Amt (2025), "Aktuelle Trendanalyse zeigt Relevanz von Deutsch als Fremdsprache weltweit"](https://www.auswaertiges-amt.de/de/newsroom/deutsch-als-fremdsprache-2728478)
- [Facts about Germany, "Attractive Language"](https://www.tatsachen-ueber-deutschland.de/en/culture-and-art/attractive-language)
- [Maxim (2002), "A Study into the Feasibility and Effects of Reading Extended Authentic Discourse in the Beginning German Language Classroom", The Modern Language Journal](https://doi.org/10.1111/1540-4781.00134)
- [Tschirner (2016), "Listening and Reading Proficiency Levels of College Students", Foreign Language Annals](https://doi.org/10.1111/flan.12198)
- [Bordag, Kirschenbaum, Rogahn, Opitz and Tschirner (2017), "Misbehaved masculines: Incidental acquisition of grammatical gender in L2 German during reading", Bilingualism: Language and Cognition](https://doi.org/10.1017/s1366728917000608)
- [Hopp (2016), "Learning (not) to predict: Grammatical gender processing in second language acquisition", Second Language Research](https://doi.org/10.1177/0267658315624960)
- [VanPatten and Borst (2012), "The Roles of Explicit Information and Grammatical Sensitivity in Processing Instruction: Nominative-Accusative Case Marking and Word Order in German L2", Foreign Language Annals](https://doi.org/10.1111/j.1944-9720.2012.01169.x)

Optional:
- [Henry (2025), "The Effects of Structured Input and Output on the Acquisition of the Accusative Case in L2 German", Instructed Second Language Acquisition](https://doi.org/10.3138/isla-2024-0003)
- [Henry (2022), "The additive use of prosody and morphosyntax in L2 German", Studies in Second Language Acquisition](https://doi.org/10.1017/s0272263122000092)
- [Hopp (2013), "Grammatical gender in adult L2 acquisition: Relations between lexical and syntactic variability", Second Language Research](https://doi.org/10.1177/0267658312461803)
- [Bordag, Kirschenbaum, Opitz, Rogahn and Tschirner (2015), "Incidental Acquisition of Grammatical Features During Reading in L1 and L2", Studies in Second Language Acquisition](https://doi.org/10.1017/s0272263115000315)
- [Arnold (2009), "Online Extensive Reading for Advanced Foreign Language Learners: An Evaluation Study", Foreign Language Annals](https://doi.org/10.1111/j.1944-9720.2009.01024.x)
- [Rott (1999), "The Effect of Exposure Frequency on Intermediate Language Learners' Incidental Vocabulary Acquisition and Retention through Reading", Studies in Second Language Acquisition](https://doi.org/10.1017/s0272263199004039) (do not call it a German study unless confirmed)
- [Jolitz and Mally (2024), "The effects of deductive versus inductive pronunciation instruction in combination with captioned video on the acquisition of incongruent grapheme-phoneme correspondences in L2 German", Die Unterrichtspraxis/Teaching German](https://doi.org/10.1111/tger.12294)
- [Vanderplank (2019), "'Gist watching can only take you so far': attitudes, strategies and changes in behaviour in watching films with captions", The Language Learning Journal](https://doi.org/10.1080/09571736.2019.1610033)
- [Auswärtiges Amt (2025), "Deutsch als Fremdsprache weltweit 2025" (PDF)](https://www.auswaertiges-amt.de/resource/blob/2728424/6ac8bd93deae4f8cf3ed876bdd571647/deutsch-als-fremdsprache-weltweit-data.pdf)
