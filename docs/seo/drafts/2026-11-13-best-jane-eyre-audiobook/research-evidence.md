# Research evidence: best Jane Eyre audiobook (the book, its French, read or listen)

Post: "Best Jane Eyre Audiobook" (slug `best-jane-eyre-audiobook`).

Scope: the book facts the comparison needs (publication, volumes, the text the free recordings read, our counts), the French in the novel and what research says about hearing a few unknown words, and the short read-or-listen block. Editions, narrators, prices, LibriVox and HushBook are in `research-platforms.md`; counts are repeated here only where the evidence uses them.

All pages were read on November 13, 2026. **VERIFIED** = read today on the page, scan or API named. **REUSED** = verified on 2026-11-11 in `../2026-11-11-best-war-and-peace-audiobook/research-evidence.md` (section (f)) and carried through `../2026-11-12-best-wuthering-heights-audiobook/research-evidence.md` (c); its DOI was re-resolved in Crossref today with `scripts/je-crossref-check.py` and returned the same title, journal, volume and pages. **UNVERIFIED** = not confirmed by a page read today. **OUR CALCULATION** = a saved script on a saved text.

How pages were read: curl and the Crossref and OpenAlex APIs; no browser automation for this file. Python ran with `-I`; downloads went into new folders in the session scratchpad (`book/dl-gutenberg-1260/`, `book/dl-naxos-pdf/`, `book/ev/`, `book/refs/`). The ERIC API answered HTTP 504 for EJ1403866 today (Clinton-Lisell 2023): not re-checked, and not needed for the two cited sentences.

No search-volume numbers are cited in this file.

---

## (a) The facts most likely to shape the post

1. **Length, our count:** Project Gutenberg #1260 has **186,145 words** in the novel (same rules as the Wuthering Heights and Pride and Prejudice counts), **38 chapters**, in the first edition's **three volumes of 15, 11 and 12 chapters**. At the site's 151 words a minute: **20 h 33 min at 1x, 16 h 26 min at 1.25x, 13 h 42 min at 1.5x, 10 h 16 min at 2x**. It is 1.6 times as long as Wuthering Heights (116,440, same script today). OUR CALCULATION (`scripts/je-wordcount.py`).
2. **The French, our count:** **346 words, 0.19% of the novel, about 2.3 minutes at 151 wpm**, in 55 passages across 12 chapters, almost all in Chapters 11 to 24; **Adèle speaks 291 of them (84%)**, Rochester 29, Jane's narration 10, Blanche Ingram 8, Sophie 5, Lady Ingram 2, Mrs. Fairfax 1. Volume III has 2 words of French (Rochester's "Jeune encore", Ch. 37). OUR CALCULATION (`scripts/je-french.py`: detector plus a hand check of every passage; a few one-word exclamations may be missed, so say "about 350 words").
3. **Why a listener can follow anyway:** in a study of 36 native and 40 non-native listeners, "most native and non-native participants could adequately comprehend the spoken texts with only 90 per cent coverage" (van Zeeland and Schmitt 2013). Jane Eyre is 99.8% English even for a listener with no French. The study used short informal narratives, not a novel. VERIFIED (Crossref plus abstract).
4. **Why the French is there:** Charlotte Brontë studied French in Brussels: "Between 1842 and 1844 Charlotte Brontë, together with her sister Emily, studied French at the Pensionat Heger in Brussels" (Naxos booklet). Emily Eells (2013): "Jane's knowledge of French qualifies her for the post of governess to Parisian born Adèle". VERIFIED.
5. **Published 1847 as "Currer Bell", in three volumes.** Wikipedia: "published under her pen name "Currer Bell" on 19 October 1847 by Smith, Elder & Co." The Naxos booklet: "Jane Eyre was published later in 1847 by Smith, Elder and Co., this and the subsequent two editions being in three volumes. The later 1850 edition was the first to be presented in one volume." Wikisource's transcription of the first edition: Volume I Chapters I to XV, Volume II I to XI, Volume III I to XII. VERIFIED.
6. **Reading ease is not the problem; length is.** Project Gutenberg's own reading-ease scores (same method for all three): Jane Eyre 77.4 ("7th grade. Fairly easy to read."), Wuthering Heights 78.8 (same band), Pride and Prejudice 69.2 ("8th & 9th grade"). Our same-splitter mean sentence length: 17.6 words (Jane Eyre), 16.1 (Wuthering Heights), 17.4 (Pride and Prejudice). The average Jane Eyre chapter is 32 minutes at 151 wpm and Chapter 27 is 74. VERIFIED (Gutenberg pages) and OUR CALCULATION.
7. **Read or listen (two cited sentences for the post):** overall, listening and reading comprehension do not reliably differ (Clinton-Lisell 2022, 46 studies), but minds wander most when only listening (Varao Sousa, Carriere and Smilek 2013). REUSED.
8. **What no study tests:** the French in Jane Eyre on audio, the pronunciation of "St. John", a 20-hour novel, or a read-along app. Say so if the post leans on any study.

---

## (b) The book

| Claim | Value | Source | Label |
|---|---|---|---|
| Author and pen name | "Jane Eyre … is a novel by the English writer Charlotte Brontë. It was published under her pen name "Currer Bell" on 19 October 1847 by Smith, Elder & Co." | Wikipedia "Jane Eyre" (raw wikitext, read today) | VERIFIED (secondary; the date conflicts with a citation in the same article, see (e)) |
| Pen name in the book itself | The 1848 preface ends "CURRER BELL. December 21st, 1847." and the note to the third edition "CURRER BELL. April 13th, 1848.": "my claim to the title of novelist rests on this one work alone" | Gutenberg #1260, front matter | VERIFIED |
| Original title | "Jane Eyre: An Autobiography" (Gutenberg title; Wikipedia: "originally published as Jane Eyre: An Autobiography") | Gutenberg #1260; Wikipedia | VERIFIED |
| Three volumes, 15 + 11 + 12 chapters | Wikisource "Jane Eyre (1st edition)": contents list Volume I Chapters I to XV, Volume II I to XI, Volume III I to XII (38 links, counted by script). Notes: "The first edition of Jane Eyre was published as a three-volume novel in 1847." Checked by first sentences: Vol. II Ch. I "I both wished and feared to see Mr. Rochester on the day which followed this sleepless night" = our Chapter 16; Vol. III Ch. I "Some time in the afternoon I raised my head" = our Chapter 27 | Wikisource API and rendered pages | VERIFIED |
| One volume from 1850 | "The later 1850 edition was the first to be presented in one volume." | Naxos AudioBooks booklet, Jane Eyre (unabridged), essay | VERIFIED (publisher booklet) |
| Dedication | "TO W. M. THACKERAY, ESQ., This Work IS RESPECTFULLY INSCRIBED BY THE AUTHOR"; the booklet: "Dedicated to William Thackeray, whose work Charlotte much admired" (the dedication is to the second edition: the preface says "I have dedicated this second edition") | Gutenberg #1260; Naxos booklet | VERIFIED |
| French studies | "Between 1842 and 1844 Charlotte Brontë, together with her sister Emily, studied French at the Pensionat Heger in Brussels, in preparation for opening their own school." | Naxos booklet | VERIFIED (publisher booklet) |
| The text the free recordings read | Gutenberg #1260: "Jane Eyre: An Autobiography", illustrated by F. H. Townsend, London, Service & Paton, 1897; "Release date: March 1, 1998 [eBook #1260] Most recently updated: September 27, 2025"; "Credits: David Price". All four English LibriVox projects give it as their text source (`url_text_source` …/etext/1260 or …/ebooks/1260) | Gutenberg #1260 (SHA-256 `13414dee…5aa7631`); LibriVox API | VERIFIED |
| Popularity on Gutenberg | "66346 downloads in the last 30 days." | gutenberg.org/ebooks/1260 | VERIFIED (snapshot) |
| Narration | First person: "There was no possibility of taking a walk that day." (first sentence, 10 words); Jane addresses "reader" 36 times in 22 chapters (38 hits for the word, minus "She was a great reader", Ch. 29, and "The reader believed", Ch. 35, which mean someone reading) | Gutenberg #1260 | OUR CALCULATION (contexts printed by `je-wordcount.py`) |
| Jane's initials | "Some critics have detected an encoding of French in the name of the eponymous heroine. Her initials spell the French pronoun 'je' and thus announce her status as first person narrator" | Eells (2013), para. 2 (full text, OpenEdition) | VERIFIED as Eells's report of what "some critics" say; not her own claim |
| A contemporary complaint about Brontë's French | A reviewer of Shirley (1849) dismissed it as "written 'half in French and half in broad Yorkshire.'" | Eells (2013), para. 1, quoting the review | VERIFIED as quoted by Eells; the review itself not opened |

Counts (all OUR CALCULATION; detail in research-platforms.md sections 3 to 5):

- Word counts: 185,390 whitespace tokens between the Gutenberg markers; **186,145** novel words by the series' rules (splitting em dashes, without the 38 chapter headings); the 1848 preface and the note to the third edition add 904.
- Volumes: I 60,508 words (6 h 41 min), II 59,611 (6 h 35 min), III 66,026 (7 h 17 min).
- Chapters: mean 4,899 words (32.4 min at 151 wpm), median 4,368; longest Chapter 27 (11,238, 74 min), shortest Chapter 38 (1,828, 12 min). Only 6 of 38 chapters take under 20 minutes; 18 take 30 or more.
- Dialogue: 43.9% of words inside quotation marks (Volume I 35.7%, II 47.3%, III 48.8%).
- French: 346 words, 0.19% (above).

---

## (c) Read or listen: the evidence (REUSED; the post carries two cited sentences)

Carried over from `../2026-11-12-best-wuthering-heights-audiobook/research-evidence.md` (c). Today's Crossref re-check (`scripts/je-crossref-check.py`) returned the same titles, journals, volumes and pages for all eight DOIs.

**Use these two in the post:**

1. **Clinton-Lisell (2022), "Listening Ears or Reading Eyes: A Meta-Analysis of Reading and Listening Comprehension Comparisons", Review of Educational Research 92(4), 543-582. DOI 10.3102/00346543211060871.** REUSED, abstract re-read today: "Based on robust variance estimation (46 studies; N = 4,687), the overall difference between reading and listening comprehension was not reliably different (g = 0.07, p = .23)."
2. **Varao Sousa, Carriere and Smilek (2013), "The way we encounter reading material influences how frequently we mind wander", Frontiers in Psychology 4. DOI 10.3389/fpsyg.2013.00892.** REUSED, abstract re-read today: "reading aloud led to the least amount of mind wandering, while listening to the passage led to the most mind wandering."

Suggested two sentences (no dashes): "Across 46 studies, Clinton-Lisell (2022) found no reliable overall difference between understanding a text by reading it and by listening to it. Minds do wander more when people only listen, though: Varao Sousa and colleagues (2013) found listening produced the most mind wandering of three ways of taking in a passage."

**Held in reserve (all re-checked in Crossref today, same titles):** Hui and Godfroid (2026; online 2025-06-12), Language Learning 76(1), 311-351, DOI 10.1111/lang.12721 (reading-while-listening comprehended less well than silent reading, for 86 Chinese learners of English); Kopp and D'Mello (2016), Applied Cognitive Psychology 30(1), 29-40, DOI 10.1002/acp.3163 (audio-only produced the most mind wandering); Rogowsky, Calhoun and Tallal (2016), SAGE Open 6(3), DOI 10.1177/2158244016669550 (no significant differences, 91 participants); Richardson et al. (2020), Scientific Reports 10, 11298, DOI 10.1038/s41598-020-68253-2; Rodero and Lucas (2023; online 2021), New Media & Society 25(7), 1746-1764, DOI 10.1177/14614448211024142 (human voices enjoyed more than synthetic: supports "avoid AI-voice listings"); Murphy et al. (2022), Applied Cognitive Psychology 36(1), 69-82, DOI 10.1002/acp.3899 (lecture video at up to 2x). Clinton-Lisell (2023), ERIC EJ1403866: not re-checked today (ERIC 504).

---

## (d) New, book-specific evidence (checked today with `scripts/je-crossref-check.py`)

**1. Eells (2013), "The French aire in Jane Eyre", Cahiers victoriens et édouardiens 78 Automne. DOI 10.4000/cve.839.** VERIFIED (Crossref title; English abstract and full text on OpenEdition, journals.openedition.org/cve/839).
- Abstract (English version on the page): "This article examines how Brontë makes French into a kind of licence for freedom of speech issued to both the eponymous heroine of the novel and the novelist herself. Jane's knowledge of French qualifies her for the post of governess to Parisian born Adèle, and thus offers her an income and some independence."
- Full text, para. 8: "At Thornfield, Jane finds herself in a French-speaking community, a kind of sorority composed of Adèle and her maid Sophie. Although Sophie is tight-lipped and distant (Jane Eyre, 94), and says no more than 'bon soir' when Jane returns to Thornfield after her aunt's death (Jane Eyre, 209)". (Our count agrees: Sophie's French is "Mais oui, certainement" (Ch. 11) and "bon soir" (Ch. 22). The "aunt's death" detail is a plot point: do not quote that clause in the post.)
- Para. 11: Rochester "explicitly excuses his use of French": "'I liked bonbons too in those days, Miss Eyre, and I was croquant —overlook the barbarism". (Our text, Ch. 15: "I was _croquant_—(overlook the barbarism)—_croquant_ chocolate comfits".)
- Why it fits: a scholarly source that the French belongs to Adèle's world and Jane's job, not to the narration.

**2. Sabiron (2023), "4. Translating the French in the French Translations of Jane Eyre", in Prismatic Jane Eyre (Open Book Publishers), pp. 244-267. DOI 10.11647/obp.0319.07.** VERIFIED (Crossref; abstract via OpenAlex). Full text: the publisher's site answered with a captcha (AWS WAF); not read.
- Abstract: "Translation within the novel is presented as both necessary (for the English-speaking readership) and impossible in order to preserve the 'effet de réel' … Brontë's pedagogical approach to textual deciphering is not translated into the French versions of her work".
- Use only as background: the novel itself sometimes glosses its French ("Brontë's pedagogical approach to textual deciphering"). Our own example: Rochester's "comme cela" is explained in the same breath in Ch. 14.

**3. van Zeeland and Schmitt (2013; online 2012-12-18), "Lexical Coverage in L1 and L2 Listening Comprehension: The Same or Different from Reading Comprehension?", Applied Linguistics 34(4), 457-479. DOI 10.1093/applin/ams074.** VERIFIED (Crossref; abstract via OpenAlex).
- "The coverage of four spoken informal narrative passages was manipulated, and participants' (36 native and 40 non-native speakers) listening comprehension of factual information was measured. Results showed that most native and non-native participants could adequately comprehend the spoken texts with only 90 per cent coverage, although the non-natives showed considerable variation at this level."
- Why it fits: the French in Jane Eyre leaves even a listener with no French at 99.8% known-language coverage, far above 90%. Caveat for the post: the study measured factual comprehension of short informal narratives; it did not test a novel, foreign-language passages, or French.

**4. Schmitt, Jiang and Grabe (2011), "The Percentage of Words Known in a Text and Reading Comprehension", The Modern Language Journal 95(1), 26-43. DOI 10.1111/j.1540-4781.2011.01146.x.** VERIFIED (Crossref; abstract via OpenAlex).
- "661 participants from 8 countries … The results revealed a relatively linear relationship between the percentage of vocabulary known and the degree of reading comprehension. There was no indication of a vocabulary "threshold"".
- Second-language readers of academic texts: background only. Do not cite in the post unless the French H3 needs "every unknown word costs a little".

**5. Harris (2007), "Reader, She Married Him: Abridging and Adapting Jane Eyre for Children and Young Adults", in A Breath of Fresh Eyre (Brill), pp. 259-271. DOI 10.1163/9789401204477_018.** Title VERIFIED in Crossref; no abstract in OpenAlex: content UNVERIFIED. Do not cite for content (and its title quotes the novel's ending).

**6. Stetz (2023), "Class and Classrooms: Teaching Jane Eyre with Adele Grace and Celine", Victorian Review 49(1), 40-43. DOI 10.1353/vcr.2023.a925216.** Title VERIFIED; OpenAlex has only a copyright note: content UNVERIFIED. Do not cite.

**7. "The enigma of St John Rivers", in The Brontës and Religion (Cambridge University Press, 1999), pp. 204-220. DOI 10.1017/cbo9780511484957.012.** Title VERIFIED (no author in Crossref; the book is by Marianne Thormählen: UNVERIFIED today). Abstract: "St John Rivers, unlike Bertha Rochester, plays a literally dominant role throughout a sizeable part of the novel." The abstract names a late plot secret: **do not quote it**. Nothing on pronunciation.

**Pronunciation (not academic; record the sources exactly):**
- Wikipedia "Jane Eyre", first line: "Jane Eyre (/ɛər/ AIR; originally published as Jane Eyre: An Autobiography)". VERIFIED (raw wikitext `{{IPAc-en|ɛər}} {{respell|AIR}}`).
- Wikipedia "St John (name)": "StJohn or St.John or St John or St. John or Sinjin or Sinjun is a given name and surname. It can be pronounced /ˈsɪndʒɪn/ or /-ʒən/ sometimes in some places, particularly if it is the first part of a hyphenated family name or a given name." Its list of fictional characters includes "St. John Rivers, clergyman in Charlotte Brontë's Jane Eyre". VERIFIED (raw wikitext). Note the hedge "sometimes in some places": the post should say "the traditional British pronunciation, used by the narrators listeners mention".
- Cambridge Dictionary's "St John" pronunciation page answered with a bot check: UNCHECKED.
- Listener evidence (research-platforms.md section 6): archive.org reviewer Laetitian (2016) heard Klett say "St. John (Sinjhn.)"; Reddit r/ClassicBookClub (2022): "I'm listening to the Audible version and I need to know, why the brits pronounce the name "St. John" as "Sinjin?"" (which Audible version: not said).

---

## What the evidence does not show

- No study tests French (or any foreign language) inside an English novel on audio, or how much a listener misses when a character speaks French.
- van Zeeland and Schmitt tested factual comprehension of short spoken narratives with words removed or replaced, not a 20-hour novel and not foreign-language passages; their 90% figure is "adequate" comprehension, not full.
- No study tests the pronunciation of names in audiobooks, or whether hearing "Sinjin" before seeing "St. John" confuses listeners.
- No study tests Jane Eyre, first-person narration or direct address on audio, or a read-along app with this book.
- Clinton-Lisell (2022) pooled studies of short texts; Varao Sousa (2013) used one passage. Neither tests a novel.

---

## (e) Conflicts between sources

1. **Publication date:** Wikipedia's lead says "19 October 1847"; the same article cites an edition dated "16 October 1847". The post needs only "1847".
2. **Third edition date:** the note to the third edition in Gutenberg #1260 is dated "April 13th, 1848"; Wikisource's header says the first edition "differs from the third edition of 1851, which is considered the "authoritative" edition". The Naxos booklet says the first three editions were in three volumes and "The later 1850 edition was the first to be presented in one volume". Do not give a year for "the third edition" in the post.
3. **How much French:** annotatedebooks.com (2026-10-29): "Adèle speaks almost exclusively in French" and "In Chapters 11 through 15 … Rochester frequently shifts between English and rapid-fire Parisian French". Our count: 346 words in the whole book; Adèle's 291 words sit in Chapters 11 to 24 (most in 13, 14 and 17); Rochester's French is 29 words, mostly single words in Chapter 15. A 2024 Reddit commenter's "like 3 French lines in the whole book" understates it the other way (55 passages).
4. **Word count:** annotatedebooks.com "approximately 185,000 words"; ours 186,145 by the series' rules (185,390 plain whitespace tokens). Consistent.
5. **"Stepbrother":** the New York Times Book Review quote on Newton's Audible page calls John Reed Jane's "cruel stepbrother"; the text makes him her cousin ("my own uncle—my mother's brother", Mr. Reed, Ch. 2; "the said Eliza, John, and Georgiana", Ch. 1). If the post quotes the review, stop before that clause.
6. **Klett's accent across books:** for Pride and Prejudice two archive.org reviews describe American narration with British-accented dialogue (published post); for Jane Eyre a Manchester reviewer calls her British accent "very creditable". Different recordings; not a conflict, but keep the book named.

---

## Sources

Ready to paste. Titles are the pages' own (`<title>`, article headline or Crossref title) as read on 2026-11-13. Owner rule: no en or em dashes in the post; none of the titles below contains one.

- [Project Gutenberg, "Jane Eyre: An Autobiography by Charlotte Brontë" (eBook #1260)](https://www.gutenberg.org/ebooks/1260)
- [Project Gutenberg, plain text of eBook #1260](https://www.gutenberg.org/cache/epub/1260/pg1260.txt)
- [Project Gutenberg, "Wuthering Heights by Emily Brontë" (eBook #768)](https://www.gutenberg.org/ebooks/768)
- [Project Gutenberg, "Pride and Prejudice by Jane Austen" (eBook #1342)](https://www.gutenberg.org/ebooks/1342)
- [Wikisource, "Jane Eyre (1st edition)"](https://en.wikisource.org/wiki/Jane_Eyre_(1st_edition))
- [Wikipedia, "Jane Eyre"](https://en.wikipedia.org/wiki/Jane_Eyre)
- [Wikipedia, "St John (name)"](https://en.wikipedia.org/wiki/St_John_(name))
- [Naxos AudioBooks, "Jane Eyre (unabridged)"](https://naxosaudiobooks.com/jane-eyre-unabridged/)
- [Naxos AudioBooks, Jane Eyre booklet (PDF)](https://naxosaudiobooks.com/wp-content/uploads/2020/03/35712_Jane_Eyre.pdf)
- [Eells (2013), "The French aire in Jane Eyre", Cahiers victoriens et édouardiens](https://doi.org/10.4000/cve.839)
- [Sabiron (2023), "Translating the French in the French Translations of Jane Eyre", Prismatic Jane Eyre](https://doi.org/10.11647/obp.0319.07)
- [van Zeeland and Schmitt (2013), "Lexical Coverage in L1 and L2 Listening Comprehension: The Same or Different from Reading Comprehension?", Applied Linguistics](https://doi.org/10.1093/applin/ams074)
- [Clinton-Lisell (2022), "Listening Ears or Reading Eyes: A Meta-Analysis of Reading and Listening Comprehension Comparisons", Review of Educational Research](https://doi.org/10.3102/00346543211060871)
- [Varao Sousa, Carriere and Smilek (2013), "The way we encounter reading material influences how frequently we mind wander", Frontiers in Psychology](https://doi.org/10.3389/fpsyg.2013.00892)
- [The Reader's Guide to Charlotte Brontë's "Jane Eyre", "Translations of Adele's French statements"](https://jane-eyre.guidesite.co.uk/french-translations)

Optional (only if used): Schmitt, Jiang and Grabe (2011), https://doi.org/10.1111/j.1540-4781.2011.01146.x ; Rodero and Lucas (2023), https://doi.org/10.1177/14614448211024142 ; Murphy et al. (2022), https://doi.org/10.1002/acp.3899 .

Store pages for the comparison table (Audible, Apple Books, OverDrive, hoopla, LibriVox, archive.org) are listed in research-platforms.md section 11; label them descriptively, as the Wuthering Heights post did. Internal source for 151 words a minute: `/blog/how-long-is-an-audiobook`.

---

## Do not claim

1. That listening is worse than reading in general (Clinton-Lisell 2022: no reliable overall difference), or that reading along improves comprehension for self-paced adults.
2. That any study shows French passages, names or first-person narration are harder on audio, or that van Zeeland and Schmitt tested foreign-language passages or novels.
3. "Adèle speaks almost exclusively in French" or "the book is full of French". Our count: about 350 words, under 0.2%.
4. Sample sizes other than these: Clinton-Lisell 46 studies (N = 4,687); van Zeeland and Schmitt 36 native and 40 non-native; Schmitt, Jiang and Grabe 661.
5. Anything from Harris (2007), Stetz (2023) or Sabiron's full text (not read), or a Thormählen authorship for "The enigma of St John Rivers".
6. That Jane's initials were intended as French "je" (Eells reports it as some critics' reading).
7. An exact publication day (19 or 16 October 1847) or a year for the third edition.
8. That every edition or recording reads the 1897 Service & Paton text: only the LibriVox recordings were checked (they cite Gutenberg #1260).
9. That "Sinjin" is the only correct pronunciation: Wikipedia hedges ("sometimes in some places"); say it is the traditional British way and the one listeners report hearing.
10. Plot facts in any quote: the Eells clause about the aunt's death, the Thormählen abstract, Harris's title, the NYT quote's "stepbrother".
