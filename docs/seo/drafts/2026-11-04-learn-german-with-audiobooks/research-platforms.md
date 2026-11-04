# Platform facts: learn-german-with-audiobooks

Fetched 2026-11-04 with curl (browser user agent), the LibriVox API and advanced search, the archive.org search API, WebFetch and WebSearch. Requests came from an Indian IP, so Audible was fetched with `?ipRedirectOverride=true&overrideBaseCountry=true` and shows USD prices. Prices change by region and date; the post should date every price. Raw downloads: `C:\Users\rakes\AppData\Local\Temp\claude\34842c9e8e99357b\5564f299-6c40-46f0-80a7-4dc4f59fee6e\scratchpad\dl-de-platforms\`.

**UNVERIFIED** marks anything not confirmed on a primary page today. dw.com blocks WebFetch, but curl worked. goethe.de and libro.fm returned 403 to both.

---

## Part A: services and catalogues

### A1. LibriVox in German

**Count.** The API has no language parameter, so I used the catalogue's advanced search: `https://librivox.org/advanced_search?...&recorded_language=3...` (German is id 3 in the site's dropdown), with the `X-Requested-With: XMLHttpRequest` header. I fetched every results page and counted the items. The results also include a few series "group" index rows (`<li class="catalog-result all">`, linking to `/group/NNN`), which I excluded.

| Filter | Recordings | (plus series index rows) |
|---|---|---|
| German, all statuses | 967 | +11 |
| **German, complete** | **949** | +11 |
| German, complete, solo | 502 | +6 |
| German, complete, group | 447 | +5 |

- The search listing labels group projects "Collaborative", e.g. "Complete | Collaborative | German", and solo ones "Complete | Solo | German".
- archive.org, `collection:librivoxaudio AND mediatype:audio AND language:"deu"`: **848** items. Two more LibriVox items are tagged `language:ger`.
- Safe wording: "about 950 finished German recordings" or "more than 900". That is about 1.5× the Spanish shelf (628).
- Footer on every catalogue page: "LibriVox recordings are Public Domain in the USA. If you are not in the USA, please verify the copyright status of these works in your own country before downloading, otherwise you may be violating copyright laws."
- https://wiki.librivox.org/index.php/Copyright_and_Public_Domain, using a German example: "the original German version of Die Verwandlung ( The Metamorphosis ) by Franz Kafka is in the public domain in the United States, since it was first published in 1916. However, the 2002 translation of the book into English by David Wyllie is still under copyright."

**Eight learner-friendly picks.** Data from the API (`extended=1`) and each catalogue page. None of these pages says where a reader comes from (Austria, Switzerland or anywhere else). Reader pages list only names, so **accent is UNVERIFIED for every title.**

| # | Title (author, first published) | LibriVox URL | Running time, sections | Solo/group, readers | Notes |
|---|---|---|---|---|---|
| 1 | *Ausgewählte Märchen der Brüder Grimm* (Grimm, edition 1857) | https://librivox.org/maerchen-der-brueder-grimm-by-jacob-wilhelm-grimm/ | 05:21:14, 24 | **Solo**: Hans Hafen | Best Grimm pick: one voice. **Der Froschkönig = section 1, Rotkäppchen = section 10.** Also has Hänsel und Gretel (4), Aschenputtel (7), Bremer Stadtmusikanten (11), Dornröschen (15), Schneewittchen (17), Rumpelstilzchen (18) and Die Sterntaler (22). Text: zeno.org. |
| 2 | *Max und Moritz* (Wilhelm Busch, 1865) | https://librivox.org/max-und-moritz-by-wilhelm-busch/ | 00:20:24, 1 | **Solo**: Mikki Starzmann-Kassi | Page: "Erstveröffentlichung 4. April 1865". Rhymed verse. Version 2 (00:16:53, solo Roman Buettner): https://librivox.org/max-und-moritz-by-wilhelm-busch-version-2/. The page links a "Duel language presentation" [sic] at http://www.fln.vcu.edu/mm/mmmenu.html. Text: Gutenberg #17161. |
| 3 | *Der Struwwelpeter* (Heinrich Hoffmann, 1845) | https://librivox.org/der-struwwelpeter-von-heinrich-hoffman/ | 00:17:45, 1 | **Solo**: Kara Shallenberg (1969-2023) | Page: written in 1845 as "Lustige Geschichten und drollige Bilder ... für Kinder von 3-6 Jahren". Version 2 (00:14:47, solo Roman Buettner): https://librivox.org/der-struwwelpeter-by-heinrich-hofmann-german2/. These are grim cautionary tales. |
| 4 | *Heidis Lehr- und Wanderjahre* (Johanna Spyri, 1880) | https://librivox.org/heidis-lehr-und-wanderjahre-von-johanna-spyri/ | 6:00:10, 14 | **Group** ("LibriVox Volunteers"): Kalynda, Kara Shallenberg, LillY, Stephanie König, Consi, Tubbs, Igor Teaforay, Sabine | Page: "Im Jahre 1880 im Perthes-Verlag, Gotha, erschienenen ersten Heidi-Roman". The voice changes per chapter. Sequel *Heidi kann brauchen, was es gelernt hat*: 4:01:04, 9 sections (https://librivox.org/heidi-kann-brauchen-was-es-gelernt-hat-by-johanna-spyri/). Text: Gutenberg #7500. |
| 5 | *Die Verwandlung* (Franz Kafka, 1915 in a magazine, 1916 as a book) | https://librivox.org/die-verwandlung-von-franz-kafka/ | 2:08:02, 3 | **Solo**: Markus Wachenheim | The API gives copyright_year 1915; the LibriVox wiki says "first published in 1916". B1+. Text: zeno.org; Gutenberg #22367. |
| 6 | *Der Schimmelreiter* (Theodor Storm, 1888) | https://librivox.org/der-schimmelreiter-by-theodor-storm/ | 4:17:23, 7 | **Solo**: Felix (catalogued 2006-03-02) | Newer solo version 2: 05:08:00, 11 sections, josvanaken, catalogued **2026-01-26**: https://librivox.org/der-schimmelreiter-by-theodor-storm-2/. North German setting, B2+. Text: projekt-gutenberg.org. |
| 7 | *Münchhausen* (Gottfried August Bürger, 1786) | https://librivox.org/muenchhausen-by-gottfried-august-buerger/ | 3:22:27, 17 | **Group**: Gesine, Herr_Klugbeisser, Hokuspokus, Orsina, Stefan Schmelz, Stephanie König, ekyale, noonday | Page: "Wunderbare Reisen zu Wasser und zu Lande ... des Freiherrn von Münchhausen". Short tall tales. 18th-century German. |
| 8 | *Der kleine Häwelmann* (Theodor Storm) | https://librivox.org/der-kleine-haewelmann-by-theodor-storm/ | 00:08:18, 1 | **Solo**: Franziska Nelson | An 8-minute children's tale: a good first test file for HushBook. |

**Grimm: which volume has which tale** (asked in the brief):
- Full *Kinder- und Hausmärchen*: 29:41:16, 212 sections, group (15 readers). Froschkönig is section 1 and Rotkäppchen section 26, both read by Peter Badurek. https://librivox.org/kinder-und-hausmaerchen-by-jacob-wilhelm-grimm-2/
- *Märchen 1*: 4:55:03, 38 sections. Rotkäppchen is section 31 (Oliver Lucas). https://librivox.org/maerchen-by-grimm-1/
- *Märchen 2*: 8:26:19, 72 sections. "Der Froschkönig" is section 32 (AliceG). https://librivox.org/maerchen-by-grimm-2/
- *Kinder- und Hausmärchen (1812/15) Teil 1*: 4:54:48, 50 sections. Froschkönig is section 7, and the title is spelled **"Rothkäppchen"** (section 48), the old spelling. https://librivox.org/kinder-und-hausmarchen-181215-teil-1-by-jacob-wilhelm-grimm/

**Excluded authors, with a correction to the brief:**
- **Hermann Hesse** (1877–1962). The brief's line "not public domain in the US for most works" is **not accurate**: his famous novels are pre-1931 and are now public domain in the US. https://law.duke.edu/cspd/publicdomainday/2023/ lists "Hermann Hesse, Der Steppenwolf (in the original German)" among works that entered the US public domain on 2023-01-01. *Siddhartha* (1922, per Wikipedia) is PD in the US by the same 95-year rule. His later works (e.g. *Das Glasperlenspiel*, 1943) are not. In Germany and Austria, Hesse stays under copyright until the end of 2032 (life + 70, computed).
  - LibriVox has **no German-language Hesse recordings**. The API returns only English: *Siddhartha* (twice), *Demian*, *Steppenwolf*.
  - Safe wording: "Hesse's novels are public domain in the US but not in Germany, and LibriVox has them only in English."
- **Erich Kästner** (1899–1974). *Emil und die Detektive* is "a 1929 novel" (Wikipedia). Under the 95-year rule, 1929 works entered the US public domain on 2025-01-01 (https://law.duke.edu/cspd/publicdomainday/2025/: "On January 1, 2025, thousands of copyrighted works from 1929 will enter the US public domain"). The Duke page does not name Kästner, so the claim that *Emil* is US-PD is **derived, not quoted**. It stays under copyright in Germany until the end of 2044.
  - The LibriVox API finds no recordings for author=Kästner, Kastner or Kaestner.
  - Safe wording: keep Kästner out, or say "not on LibriVox".
- **Old spelling catch.** Many free German e-texts and older recordings use pre-1901 or pre-1996 spelling:
  - Gutenberg #22367 *Die Verwandlung* (https://www.gutenberg.org/cache/epub/22367/pg22367.txt) has "daß" 132 times, e.g. "Man sah vom Bett aus, daß er auf ...".
  - Gutenberg #17161 *Max und Moritz*: "Aber kaum, daß er von hinnen".
  - The 1812 Grimm on LibriVox titles a tale "Rothkäppchen".
  - Not every text is old: Gutenberg #7500 *Heidi* uses reformed spelling ("erfasst"). I found no "Thür" in these three texts.
  - So learners will meet "daß" for today's "dass", and "th" or "-iren" spellings in older editions. Whisper will probably write modern spelling in HushBook's transcript, so it may not match an old e-text letter for letter (expectation, UNVERIFIED).

### A2. Audible

- **audible.de:** https://www.audible.de/ is a separate store, titled "Audible | Höre Hörbücher, Hörspiele und Podcasts jederzeit". Its offer today: "Nur 0,99 €/Monat für die ersten 3 Monate + 15 € Audible-Guthaben ... Nach 3 Monaten 6,99 €/Monat." Whether a US account can buy there is UNVERIFIED.
- **audible.com German category:** https://www.audible.com/topic/audiobooks-german-language, titled "German Language Books | Listen on Audible". Its first page is almost all **learn-German products**: Paul Noble, Pimsleur, Lingo Mastery, GermanPod101, Olly Richards *World War II in Simple German* ("Language: German", $9.49). Many are tagged "Language: English". The size of the German-language catalogue is UNVERIFIED.
- **Read & Listen / immersion reading** (https://www.audible.com/ep/read-listen):
  - "Immersion reading and Page Sync are currently available for supported English and German language titles in the United States, United Kingdom, Australia, and Germany. Availability of specific features may vary by marketplace and not all titles support Read & Listen in every region. Check your Audible app for the Read & Listen badge to see which titles are eligible in your marketplace."
  - The Kindle-edition requirement: "With Read & Listen, you can read the eBook on screen while the audiobook plays with synced narration that highlights the text in real time. You'll need both the eBook and audiobook for that title."
  - "The eBook and audiobook must be for the same edition of the title. If you purchased a different version of the eBook (e.g., a different publisher or language), the sync may not connect." and "Both purchases need to be on the same Amazon account."
  - For the post: **Audible immersion reading does officially cover German titles**, including in the US store. But you must own both the Kindle eBook and the Audible audiobook of the same edition, on one account, and the title must carry the Read & Listen badge. This is a real competitor for German, unlike for Spanish.
- **Paul Noble German:** https://www.audible.com/pd/B01D51B1IA, "Learn German with Paul Noble for Beginners – Complete Course".
  - JSON-LD: duration PT12H14M (**12 h 14 min**), datePublished 2016-03-31, publisher Collins, inLanguage "english".
  - Visible price "**Buy for $24.14**" (the JSON-LD offer says 14.95).
  - "The accompanying booklet is available here: http://collinsdictionary.com/resources."
  - Follow-up course *Next Steps in German*: 8 h 26 min, $20.52.
- **Pimsleur German Level 1 Lessons 1-5:** https://www.audible.com/pd/B0DQQPJ3ML. JSON-LD duration PT2H43M (**2 h 43 min**), datePublished 2024-12-17, inLanguage "english", visible "**Buy for $19.76**". The series page (https://www.audible.com/series/Pimsleur-German-Audiobooks/B01CUWUVMC) says "Pimsleur German 30 books in series", and Level 1 is sold in five-lesson parts at $19.76 each. An older listing, B003BPCIM4, now says "Audiobook is not available".
- **DRM:** both courses are Audible downloads (Audible DRM). HushBook cannot import them. Both are English-language spoken courses, not German books.

### A3. Spotify

- **DACH launch:** https://newsroom.spotify.com/2025-04-15/spotify-expands-its-audiobooks-offering-to-listeners-in-germany-austria-switzerland-and-liechtenstein/ (WebFetch):
  - "Today we're launching an enhanced audiobooks offering in Germany, Austria, Switzerland, and Liechtenstein."
  - "Eligible Premium subscribers will receive 12 hours of audiobook listening each month."
  - The catalog has "350,000 audiobooks", including "titles in German, French, and Italian".
  - Footnote: "12 hours/month from our subscriber catalog available to Individual and Duo or Family Plan Managers only."
- **Germany page today:** https://www.spotify.com/de-en/audiobooks/ (curl):
  - "I have my own Premium plan You get 12 hours of audiobook listening hours included each month."
  - Audiobooks+ "Enjoy 15 hours of audiobook listening added to your account each month ... €8.99/mo".
  - The same page advertises "Follow-Along Immerse yourself in time-synchronized illustrations, photos, and graphics for select titles". That is pictures, not the book's text.
- **US:** https://www.spotify.com/us/audiobooks/: "Now enjoy 15 hours of audiobook listening time on Premium, every month." and "over 700,000 titles".
- **Markets with 12 h:** Germany, Austria, Switzerland and Liechtenstein (since 2025-04-15), plus the October 2026 markets (Spain, Mexico and others; see the Spanish file). Support page: "The number of hours included varies per country".
- **Whether US Premium includes German-language audiobooks: UNVERIFIED.** No official page names the US catalogue's languages. Safe wording: "Spotify sells German audiobooks in Germany, Austria and Switzerland; in the US, search for the title."
- No text: Spotify's audiobook player has speed, skip and sleep-timer controls only (see the Spanish file's quote of https://support.spotify.com/us/article/audiobooks/).

### A4. Libby / OverDrive (reused from the Spanish file, fetched 2026-11-04)

- Language filter: https://www.libbylife.com/2025-03-06-search-like-a-pro-expert-tips-for-finding-your-next-read-in-the-libby-app says "After running your search, narrow down your results with filters like format, language, subject, and more." So learners can pin "German" plus "audiobooks".
- No text, no transfer: https://help.libbyapp.com/en-us/6131.htm says "Audiobooks in Libby can't be transferred to MP3 players or iPods." No Libby page offers text for audiobooks (read-along exists only for some children's "narrated ebooks").
- OverDrive carries *Learn German with Paul Noble*: https://www.overdrive.com/media/2560139 (seen in search results, not fetched).

### A5. Graded readers

- **Olly Richards & Alex Rawlings, *Short Stories in German for Beginners* (Teach Yourself):** https://www.audible.com/pd/1473683394
  - JSON-LD: PT3H12M (**3 h 12 min**), narrator Gido Schimanski, 2018-10-04, publisher Teach Yourself. "**Buy for $11.06**".
  - CEFR: "**Mapped to A2-B1 on the Common European Framework of Reference**, these eight captivating stories will both entertain you, and give you a feeling of progress when listening."
  - PDF: "PLEASE NOTE: When you purchase this title, the accompanying PDF will be available in your Audible Library along with the audio."
  - The *Intermediate* volume: 6 h 36 min, narrator Alexander Devrient, $11.06.
  - The publisher's own app ("Foreign Language Graded Readers", Hachette, https://apps.apple.com/us/app/id1422731589) covers German too (quote in the Spanish file).
  - **Libro.fm listing: UNVERIFIED.** libro.fm returned 403, and search found no Libro.fm page for this title.
- **André Klein, *Learn German with Stories* / "Dino lernt Deutsch" (LearnOutLive):** https://books.learnoutlive.com/
  - *Café in Berlin* (book 1 of 13) is sold in four formats: "Ebook $2.99 TalkingBook $3.99 Paperback $9.99 MP3 Audio $4.99"; bundle "for only $6.99".
  - Audiobook format, from the *Sturm auf Sylt* page (https://books.learnoutlive.com/learn-german-with-stories-sturm-auf-sylt-10-short-stories-for-beginners-audiobook/): "MP3 audiobook (zipped) Stream online or download MP3 ... Format MP3 (VBR 1.65, ~224kbps) Length 1:28:37 File Size 110 MB (zipped)". These are **plain MP3 downloads** and import into HushBook.
  - **TalkingBook = a direct competitor feature.** The *Café in Berlin* TalkingBook page (https://books.learnoutlive.com/learn-german-stories-cafe-berlin-10-short-stories-beginners-talkingbook/) says: "This edition aligns audio narration with the words on the page" and "Read and listen with synced narration ... Format EPUB3 with audio narration". It also says: "Note: This edition does not contain downloadable MP3 files".
  - Shop home page: "synchronized narration for our TalkingBooks so you can follow along word for word" and "download the 100% DRM-free EPUB".
  - Audible also sells his books, e.g. *Ferien in Frankfurt*: 1 h 2 min, read by André Klein, $11.30.
- **Lingo Mastery, *German Short Stories for Beginners*:** https://www.audible.com/pd/B07PHLVZXN. JSON-LD PT6H29M, narrator Kai Powalla, 2019-03-09, inLanguage "german", "Buy for $9.43". Level: "recommended for A2+ level learners". "PLEASE NOTE: When you purchase this title, the accompanying PDF will be available in your Audible Library along with the audio." No DRM-free source found (UNVERIFIED).
- **Libro.fm German catalogue: UNVERIFIED.** Search results show Libro.fm pages for:
  - *Learn German with Paul Noble for Beginners – Complete Course* (https://libro.fm/audiobooks/9780008182939-...). A search snippet claimed "This audiobook uses AI narration", which is unverified and conflicts with Audible's listing.
  - *100 German Stories for Beginners* (https://app.libro.fm/audiobooks/9781667080871-...).
  - Neither page could be fetched.

### A6. Free German audio WITH text (the German cluster's big advantage)

- **DW "Langsam gesprochene Nachrichten"** (slow news): https://learngerman.dw.com/de/langsam-gesprochene-nachrichten/s-60040332. The old dw.com/de/deutsch-lernen/nachrichten/s-8030 is now a 404.
  - Level and format: "Die Langsam Gesprochenen Nachrichten der Deutschen Welle bieten von Montag bis Samstag aktuelle Tagesnachrichten aus aller Welt. Das langsam und verständlich gesprochene Audio trainiert das Hörverstehen. **Zusätzlich gibt es den vollständigen Text zum Mitlesen. Die Audio-Datei kann auch heruntergeladen werden.** **Niveaustufe: B2** Medien: Audio, Text Sprache: Deutsch". The level is **B2**, not B2/C1.
  - Each episode (e.g. https://learngerman.dw.com/de/03112026-langsam-gesprochene-nachrichten/a-79836078) shows the full news text on the page. It links "Nachrichten von Dienstag, 03.11.2026 – langsam gesprochen | MP3 | 8MB" and "... im Originaltempo | MP3 | 5MB".
  - RSS: https://rss.dw.com/xml/DKpodcast_lgn_de, described as "B2 | Deutsch für Fortgeschrittene: ... besonders langsam und deutlich gesprochen". 99 MP3 enclosures.
- **DW "Top-Thema mit Vokabeln":** https://learngerman.dw.com/de/top-thema/s-55861562
  - "Wir bieten dir jede Woche kurze Artikel für die Mittelstufe (B1) ... Außerdem kannst du dir den Text als Audio anhören. **Niveaustufe: B1** Medien: Audio, Text (Download), interaktive Übungen".
  - Each lesson has "Wortschatz" and "Manuskript" tabs (e.g. https://learngerman.dw.com/de/warum-audi-jetzt-in-die-usa-geht/l-79836372/lm, with the full text).
  - RSS: https://rss.dw.com/xml/DKpodcast_topthemamitvokabeln_de, "B1 | ... leicht verständlich und mit Vokabelglossar", with MP3 enclosures of about 3 MB.
- **DW "Nicos Weg":** https://learngerman.dw.com/en/nicos-weg/c-36519789
  - A1: "Follow Nico from Spain on his adventure in Germany. Video course for beginners with detailed grammar pages".
  - A2: "Nico's adventure in Germany continues. Video course for beginners with previous knowledge".
  - B1 (German page): "Nico gibt nicht auf: Video-Sprachkurs für Fortgeschrittene mit besonderem Fokus auf den Themen Beruf und Arbeitsmarkt". So the course runs **A1 to B1**.
  - Each lesson has a "Script" tab with the full dialogue (e.g. https://learngerman.dw.com/en/hallo/l-37250531/lm), and the player data carries a `subtitles` resource.
  - Account: lessons and scripts loaded without logging in. The help page says the certificate needs a login: "If you successfully complete the 'Nicos Weg' course, you will receive a certificate to download ... Log in to DW Learn German." It is video-first; the audio is not offered as a separate download (none seen).
- DW overall (https://learngerman.dw.com/en/overview): "With Deutsche Welle's mobile courses, you can learn German easily and free of charge." The help page adds: "Access to DW content may be restricted in some countries."
- **Slow German (Annik Rubens):** https://slowgerman.com/
  - "Slow German ist ein kostenloser Podcast. Wenn du mehr Deutsch lernen möchtest, kannst du aber in den Premium-Bereich kommen." and "Für Level B1 und höher".
  - **Transcripts are free.** Each episode page shows the full text and "Text der Episode als PDF: https://slowgerman.com/folgen/sg326kurz.pdf". The MP3 is a direct file (https://slowgerman.cdn.svmaudio.com/slowgerman/sg326.mp3).
  - Premium (https://slowgerman.com/premium-mitglied-werden/): "Monatlich € 9,90 pro Monat", "6 Monate € 7,90 pro Monat", "12 Monate € 6,90 pro Monat", "7 Tage kostenlos testen". It adds "PDF-Dateien & Vokabellisten" and fast versions.
- **Coffee Break German:** https://coffeebreaklanguages.com/coffeebreakgerman/
  - "Every level starts with a free podcast."
  - Level 1 course (https://coffeebreaklanguages.com/courses/coffee-break-german-level-1/): "A1–A2 40 lessons Over 20 hours of audio ... $269 One payment, yours for life".
  - "Comprehensive lesson notes Grammar, vocabulary and transcripts."
  - "the lesson notes and audio download to your device".
  - **Transcripts are paid** (part of the course), and the free podcast has no transcript on the page.
- **Easy German podcast:** https://www.easygerman.org/podcast says "Easy German members get access to interactive transcripts, our vocabulary helper and bonus content". Transcripts come with the "Learner or Conversation Membership". https://www.easygerman.org/membership lists "Learner Membership ... from €11,99/month incl. VAT"; Conversation is from €34,99, and Supporter (€4,99) does not include transcripts. **Transcripts are paid.**
- **Vorleser.net:** https://www.vorleser.net/ueber-vorleser
  - "Hier stehen nicht nur **rund 800** professionell produzierte Titel gratis als MP3-Download zur Verfügung." The brief's "700+" is outdated; the site says about 800.
  - FAQ (https://www.vorleser.net/faq): "das mp3-Hörbuch und ggf. andere Dateien, wie Texte, - so verfügbar - sofort auf euren Rechner herunterladen". The licence is for private use: "dürfen heruntergeladen, in Maßen vervielfältigt sowie auf Datenträgern ... ausschließlich für den privaten Gebrauch weiter gegeben werden".
  - Example title page: *König Drosselbart* (https://www.vorleser.net/hoerbuch/koenig-drosselbart), read by Johannes Ackner, 11 min. "Dateien herunterladen MP3 PDF" (PDF: files/user/audiobook/text/koenig-drosselbart.pdf).
  - So a **free MP3 plus PDF text** is available per title "so verfügbar". Most authors are "mehr als 70 Jahre tot" (public domain).
  - The site says it supplies audio to the WiDu school project, nominated for the Deutscher Lesepreis 2026, whose "Lesehörbücher" have "synchrone Text-Audio-Abgleich (Media Overlay)". That is for schools, not a public feature.
- **Ohrka.de:** a free children's audio portal.
  - https://www.ohrka.de/ueber-ohrka/das-projekt: "Gemeinnützig, kostenlos und werbefrei." and "Alles steht zum Download bereit."
  - FAQ (https://www.ohrka.de/fragen): "Alle unsere Hörstücke liegen im mp3-Format vor." and "Bei einzelnen Hör-Angeboten kann es ausnahmsweise sein, dass du diese nur anhören und nicht herunterladen kannst."
  - Text: the home page mentions "Lese-Hörbücher" (nominated for the Deutscher Lesepreis 2026). Whether a text is offered per title is UNVERIFIED.
- **ARD Audiothek:** ardaudiothek.de now redirects to **https://www.ardsounds.de/**, titled "ARD Sounds · Radio, Podcasts, Hörspiele & Hörbücher". Transcripts, file downloads and access outside Germany are **UNVERIFIED**. Leave it out, or call it "ARD Sounds (formerly ARD Audiothek)".
- **Goethe-Institut Onleihe: UNVERIFIED** (goethe.de returned 403). Search snippets from goethe.de branch pages say: "anyone with permanent residence outside the German speaking countries can use our eLibrary". It is free, needs a "Mein Goethe.de" account, and offers e-books, audiobooks, learner materials and films (about 15,000–25,000 media, figures vary by page). Whether its audiobooks show text is UNVERIFIED; Onleihe audiobooks are DRM-protected loans (UNVERIFIED). Other Goethe-Institut free materials: UNVERIFIED (403).
- **Readle:** see A7. It is a German-only app with its own stories and audio; you cannot import your own audiobook.

### A7. Competitor apps (US App Store, fetched 2026-11-04)

- **Readle**, "Learn German: News by Readle": https://apps.apple.com/us/app/learn-german-news-by-readle/id1483552317, developer A-Type Technologies, "A1-C1 German language learning", 4.7 from 1.1K ratings.
  - "Learn German with real news: 2,000+ stories from A1 to C1, native-speaker audio, tap-to-translate and a quiz for every story"
  - "Every story comes with audio, so you train listening and pronunciation while you read."
  - "Tap any word you don't know to see the English translation and an explanation."
  - In-app purchases: "Yearly Premium Subscription $69.99", "Readle German: Premium Monthly $9.99", "Readle Quarterly Subscription $44.99", "Readle German Lifetime $249.99".
  - Android: "Learn German Daily with Readle" by Langster Languages, 4.8 stars, 10.9K reviews, 500K+ downloads (https://play.google.com/store/apps/details?id=com.hello.german).
  - The listing makes no word-by-word highlight claim; only "Loop Audio for Stories" appears in its changelog.
- **Beelinguapp:** https://apps.apple.com/us/app/beelinguapp-language-learning/id1225056371. Lists "Learn German". Claims "parallel-text method", "Audiobooks Narrated by Native Speakers" and "Karaoke-Style Scrolling Text: Follow along with synchronized text". Prices: "Beelinguapp Yearly $49.90", "Beelinguapp Monthly $7.99", plus promo tiers ($6.49 monthly, $19.99–$41.99 yearly). Its own catalogue only.
- **LingQ:** https://apps.apple.com/us/app/lingq-learn-languages/id379385811. German is among "more than 50 languages".
  - "all with matching text for easy listening and reading"
  - "Import Your Favorite Content"
  - "AI Audio Transcription: Turn podcasts and audiobooks into interactive lessons."
  - Prices: "LingQ Premium (Monthly) $14.99", "(12 Months) $119.99", "(6 Months) $80.99", "Premium Plus Monthly $29.99", "Premium Plus Yearly $269.99".
- **Lingopie:** https://apps.apple.com/us/app/lingopie-learn-a-language/id1534737981. Lists German among its languages.
  - "Enjoy videos with subtitles in your target and native languages. Tap on any word to get instant translations"
  - "Enjoy 8 minutes of language learning each week for FREE."
  - Prices: "Lingopie Monthly Subscription $13.99", "Lingopie Annual Subscription $83.99" (also $11.99, $71.99, $59.99, and $34.99 for 3 months).
  - Video only. A US reviewer called its German shows "fine but not particularly entertaining".

### A8. Libro.fm

- DRM-free (reused, fetched 2026-11-04 by the Spanish agent): https://support.libro.fm/support/solutions/articles/48000695426 says "You can download the zipped folder(s) containing the DRM-free files (MP3s or M4B format) directly to your computer and import these files into your media player of choice."
- **German-language catalogue: UNVERIFIED** (403). Search results show at least Paul Noble German and *100 German Stories for Beginners*. No German storefront page was found.

---

## Part B: HushBook app source (`D:\hushbook`), German check

**Confirmed: Discover's language filter includes German.**
- `lib/core/store/store_models.dart`: `german('deu', 'German', ['German', 'deu', 'de']),` in `enum LibraryLanguage`.
- `lib/features/store/provider_browse_screen.dart`, `_pickLanguage()`: `for (final language in LibraryLanguage.values) _languageChoice(l10n, language),` with `l10n.discoverChipAnyLanguage` ("Any language") first.
- `lib/features/store/discover_copy.dart`: `LibraryLanguage.german => l10n.langGerman` ("German"), and the endonym `LibraryLanguage.german => 'Deutsch'` is shown as the second line in the language sheet.
- Counts today for the app's own queries:
  - LibriVox (`collection:librivoxaudio AND mediatype:audio AND language:"deu"`): **848**.
  - Internet Archive non-LibriVox (`mediatype:audio`, `collection:audio_bookspoetry`, `-collection:librivoxaudio`, MP3 formats, `(language:"German" OR language:"deu" OR language:"de")`): **0**.
  - So for German, "Both libraries" adds nothing beyond LibriVox: about 850 German books in Discover, before client-side filtering.
  - Two LibriVox items tagged `ger` are missed by the `deu` code (minor).

Everything else in the Spanish file's Part B applies unchanged to German. I re-checked today:
- Universal is the only multilingual engine (whisper base, about 57 MB, auto-detect). `"engineUniversalLanguages"` names German.
- The `engineEnglishOnlyWarningTitle` string is still unused in Dart.
- The dictionary is English-only: `api.dictionaryapi.dev ... 'en'`, and the regex `[A-Za-z]+(?:['’-][A-Za-z]+)*` splits words with ä, ö, ü or ß.
- `"ebookErrorUnsupportedLanguage": "Fast e-book sync currently supports English narration."`
- `"desktopTileEnglishOnly": "English books only for now."`
- Speed, long-press, Mark and export are as described in the Spanish file.

---

## Facts the post must state honestly

1. **LibriVox German:** about 950 finished recordings (949 complete, 967 in all, on the 2026-11-04 catalogue search). That is more than Spanish. They are public domain in the US, so the texts are old. Readers are volunteers with mixed accents and audio quality, and group books change voice per chapter. No pick's page states a reader's country, so do not claim Austrian or Swiss readers.
2. **Good starters that exist:**
   - Grimm *Ausgewählte Märchen* (one reader, 5 h 21 min; Froschkönig = section 1, Rotkäppchen = section 10)
   - *Max und Moritz* (20 min)
   - *Struwwelpeter* (18 min)
   - *Der kleine Häwelmann* (8 min)
   - *Heidis Lehr- und Wanderjahre* (6 h, group)
   - *Die Verwandlung* (one reader, 2 h 8 min)
   - *Der Schimmelreiter* (one reader, 4 h 17 min; a new 2026 solo version runs 5 h 8 min)
   - *Münchhausen* (3 h 22 min, group)
3. **Hesse and Kästner:** Hesse's pre-1931 novels are public domain in the US (Duke lists *Der Steppenwolf* for 2023) but not in Germany, and LibriVox has Hesse only in English. *Emil und die Detektive* (1929) is US-public-domain by the 95-year rule but not in Germany, and it is not on LibriVox. Don't promise either in German.
4. **Old spelling:** expect "daß" (e.g. 132 times in Gutenberg's *Verwandlung*) and spellings like "Rothkäppchen" in old texts and editions. HushBook's transcript comes from the audio, so its spelling may not match an old e-text.
5. **Audible immersion reading DOES cover German** ("supported English and German language titles in the United States, United Kingdom, Australia, and Germany"), but only if you own both the Kindle eBook and the audiobook, same edition, on one account, with the Read & Listen badge. Say this plainly; don't claim HushBook is the only way to read along in German.
6. **Paul Noble** (12 h 14 min, $24.14) and **Pimsleur Level 1 Lessons 1-5** (2 h 43 min, $19.76 per five lessons) are English-language spoken courses in Audible DRM. HushBook cannot open them.
7. **Spotify** gives 12 h per month in Germany, Austria, Switzerland and Liechtenstein (since 2025-04-15, with German titles) and 15 h in the US. Whether US Premium includes German-language audiobooks is unverified. Spotify shows no book text ("Follow-Along" is pictures).
8. **Libby:** pin "German" as a language filter. Its audiobooks show no text and "can't be transferred", so HushBook can't import them.
9. **Olly Richards** *Short Stories in German for Beginners* is mapped by the publisher to **A2-B1**, not A1 (3 h 12 min, $11.06 on Audible, PDF included). No DRM-free copy was confirmed.
10. **André Klein (Dino lernt Deutsch)** sells *Café in Berlin* as an **MP3 download for $4.99**, which imports into HushBook. His **TalkingBook** ($3.99) already offers synced word-by-word read-along in an EPUB3. Acknowledge it if the post compares.
11. **Free German audio with text is unusually good:**
    - DW *Langsam gesprochene Nachrichten*: **B2**, full text on the page, downloadable MP3 in slow and normal speed, Monday to Saturday.
    - DW *Top-Thema mit Vokabeln*: **B1**, weekly, Manuskript plus MP3.
    - DW *Nicos Weg*: **A1 to B1** video course with a Script tab; free, and a login is needed only for the certificate.
    - Slow German: B1+, free text and PDF per episode.
    - Vorleser.net: about 800 free MP3s, PDF text where available, private use only.
    - Ohrka: free children's MP3s.
    - These texts are **not synced word by word**. HushBook's value is the sync, not the text itself.
12. **Paid transcripts:** Easy German (Learner Membership from €11.99/month) and the Coffee Break German courses (Level 1: $269 one-time, includes transcripts). Their free podcasts have no transcript.
13. **Competitor prices (US App Store, today):**
    - Readle: $9.99/mo, $44.99/quarter, $69.99/yr, $249.99 lifetime
    - Beelinguapp: $7.99/mo, $49.90/yr
    - LingQ: $14.99/mo, $119.99/yr
    - Lingopie: $13.99/mo, $83.99/yr, video only
    - Readle and Beelinguapp use their own catalogues. LingQ can import and transcribe audio.
14. **HushBook:**
    - Discover's language filter includes German (about 850 LibriVox titles; Internet Archive adds none for German).
    - Transcription uses the Universal engine only: the default, whisper base multilingual, about 57 MB, auto-detects the language. The other engines are English-only, and the app does not warn you.
    - No German dictionary and no translation; the dictionary even splits words with umlauts or ß.
    - E-book sync and "Transcribe on my PC" are English-only for now.
    - Speed runs 0.5–3× in 0.05× steps, set per reading profile.
    - Tap-to-jump is off by default; long-press a line instead.
    - Mark → Highlight / Note / Quote works on German text.
    - No plain-text export.
    - Speech recognition will make mistakes on names, archaic German and noisy recordings.
15. **Unverified, so keep it out or hedge:** reader origins, the size of the Libro.fm German catalogue, Goethe Onleihe details (403), ARD Sounds downloads and text, the US Spotify German catalogue, and Readle's word-level highlighting.
