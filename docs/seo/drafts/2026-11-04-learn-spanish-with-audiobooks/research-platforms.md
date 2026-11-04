# Platform facts: learn-spanish-with-audiobooks

Fetched 2026-11-04 with curl (`-A "Mozilla/5.0..."`), WebFetch and WebSearch, plus the LibriVox and archive.org APIs. The requests came from an Indian IP: plain audible.com URLs redirected to audible.in, so Audible pages were fetched with `?ipRedirectOverride=true` and show USD prices. Store prices change by region and date, so the post should date every price. Raw downloads: `C:\Users\rakes\AppData\Local\Temp\claude\34842c9e8e99357b\5564f299-6c40-46f0-80a7-4dc4f59fee6e\scratchpad\dl-platforms\`.

Anything marked **UNVERIFIED** could not be confirmed from a primary page today.

---

## Part A: services and catalogues

### A1. LibriVox in Spanish

**Count.** The LibriVox API has no language parameter. Its documented parameters are id, since, author, title, genre, fields, extended, coverart, limit, offset, format and sort_order (https://librivox.org/api/info, fetched 2026-11-04). I counted with the catalogue's own advanced search instead: `https://librivox.org/advanced_search?recorded_language=5&status=...&project_type=...`, where language id 5 is "Spanish" in the site's dropdown. I read the pagination (25 per page) and counted the last page:

| Filter | Projects |
|---|---|
| Spanish, all statuses | **644** (25 full pages + 19) |
| Spanish, complete | **628** |
| Spanish, complete, solo | 386 |
| Spanish, complete, group | 243 |

- archive.org, `collection:librivoxaudio AND mediatype:audio AND language:"spa"`: **565** items. With HushBook's safety clauses added (the query its Discover runs): **563**. The two totals differ because archive.org language metadata is incomplete.
- LibriVox home page (https://librivox.org/, fetched 2026-11-04): "Number of languages: 49". Its news excerpt says "the LibriVox catalog has grown to include more than 21,000 completed projects".
- Safe wording for the post: "about 630 finished Spanish recordings" or "more than 600".

**Public domain statements**
- https://librivox.org/pages/about-librivox/: "LibriVox volunteers record chapters of books in the public domain, and then we release the audio files back onto the net for free. All our audio is in the public domain, so you may use it for whatever purpose you wish."
- Same page, on accents: "We accept all volunteers in all languages, with all kinds of accents. You're welcome to volunteer to read any language you speak, as long as you can make yourself understood in it. ... We'll accept you no matter what you sound like."
- Same page, on old texts: "many of them are very old, and may contain language or express notions that are antiquated at best, offending at worst."
- https://wiki.librivox.org/index.php/Copyright_and_Public_Domain: "LibriVox makes good faith efforts to ensure that the texts recorded are public domain in the United States. We do not, and can't, ensure that these texts are public domain outside the United States."
- For a learner: the recordings are free and legal to download and transcribe. Readers are volunteers with mixed accents and mixed audio quality, and the vocabulary is 19th or early 20th century.

**Learner-friendly Spanish titles.** Runtimes, section counts and readers come from the LibriVox API (`extended=1`) and each catalogue page, fetched 2026-11-04. Every title is published before 1931 or is otherwise cleared by LibriVox as US public domain. **Accent: UNVERIFIED for every title except where noted.** LibriVox reader pages list only a catalog name and forum name, never a country.

| # | Title (author, first published) | LibriVox URL | Running time | Type and readers | Notes for learners |
|---|---|---|---|---|---|
| 1 | *Cuentos de la selva para los niños* (Horacio Quiroga, 1918; Uruguayan-Argentine, d. 1937) | https://librivox.org/cuentos-de-la-selva-para-los-ninos-by-horacio-quiroga/ | 02:06:40, 8 sections | Group: AnabelleC, Charbelí Ramos Chávez, Joyfull, Luis Alberto Martín, Mongope | Animal stories written for children; short chapters. The page calls Quiroga "uno de los cuentistas más célebres del Río de la Plata". |
| 2 | *La Edad de Oro* (José Martí, 1889; Cuban) | https://librivox.org/la-edad-de-oro-by-jose-marti/ | 8:19:42 | Group ("Read by: LibriVox Volunteers"), about 13 readers | Page: "Colección de cuentos para niños y niñas por José Martí." A children's magazine, so the language is fairly plain. Genre: "Children's Fiction, Short works". |
| 3 | *Cuentos, Adivinanzas y Refranes Populares* (Fernán Caballero, d. 1877; source edition 1921) | https://librivox.org/cuentos-adivinanzas-y-refranes-populares-by-fernan-caballero/ | 2:54:34, 39 sections | Group: Eduardo, Etel Buss, Juan Santana, Kathrine Engan, Kimberly Krause, Paolo Paez, Sue Anderson, Tux, gribuongiorne, mahiba | Folk tales, riddles and proverbs in very short sections. Several readers have English or other non-Spanish names, so expect some non-native accents (UNVERIFIED per reader). |
| 4 | *Cuentos de Hadas, Vol. 1* (Grimm, in Spanish translation) | https://librivox.org/cuentos-de-hadas-vol-1-by-jacob-wilhelm-grimm/ | 3:47:55, 20 sections | Group: Azalea, Bob Gonzalez, Cebes, DreamVoz, Jimyxt, Margaret Espaillat, Stephanie Schneider, Torreblanca | Stories learners already know ("Blancanieves", "La Cenicienta", "Hänsel y Gretel"). Vol. 2 (2:47:39) and Vol. 3 (03:11:06) also exist. |
| 5 | *El Capitán Veneno* (Pedro Antonio de Alarcón, 1881; Spain) | https://librivox.org/el-capitan-veneno-by-pedro-antonio-de-alarcon/ | 2:13:58 | **Solo**: Tux. Search listing: "Complete \| Solo \| Spanish" | A short comic novel; a good first whole book read by one narrator. |
| 6 | *Marianela* (Benito Pérez Galdós, 1878; Spain) | https://librivox.org/marianela-by-benito-perez-galdos/ | 06:00:40, 22 sections | **Solo**: Maritza Mateo | A short classic novel, B1 and up. |
| 7 | *Leyendas* (Gustavo Adolfo Bécquer, 1858-64; Spain) | https://librivox.org/leyendas-by-gustavo-adolfo-becquer/ | 10:04:53 | Group: Tux, DreamVoz, Elena del Valle, Gabriela Cowan, Rosacarmela, Vicente Cepeda and others | Gothic legends that are often taught in Spanish schools. Romantic-era vocabulary, intermediate and up. |
| 8 | *Antología de Cuentos Hispanoamericanos* (various) | https://librivox.org/antologia-de-cuentos-hispanoamericanos-by-various/ | 03:41:20, 14 sections | Group: Claudia Hernández, Ditirambo, Epachuko, Javier Gargiulo, Joyfull, Juan Santana, María, Mongope, Victor Villarraza | **The only page that states accents.** Its description: "cada cuento sea leído por un voluntario originario o que domine el acento nativo del país de procedencia del cuento con el objetivo de disfrutar y celebrar la riqueza de la cultura hispanoamericana y la diversidad del idioma español." Good for comparing Latin American accents. |

Alternatives:
- Perrault, *Cuentos de Hadas*, solo, Victor Villarraza, 03:35:25: https://librivox.org/cuentos-de-hadas-by-charles-perrault/
- Perrault, *Cuentos de hadas (version 2)*, solo, Mongope, 03:55:24: https://librivox.org/cuentos-de-hadas-by-charles-perrault-2/
- *Las Fábulas de Esopo, vol. 01*: 41:37, 30 fables, and the most downloaded Spanish LibriVox item on archive.org (3.47M downloads). Archive page: https://archive.org/details/fabulas_esopo_01_librivox. The LibriVox catalogue page was not located today.
- *Platero y yo* (Jiménez): **no LibriVox recording found** by the API title search or in the archive.org Spanish list. Do not promise it.

### A2. Internet Archive beyond LibriVox

- The Audio Books & Poetry collection (`audio_bookspoetry`) describes itself as: "This library of audio books and poetry features digital recordings and MP3's from the Naropa Poetics Audio Archive, LibriVox, Project Gutenberg, Maria Lectrix, and Internet Archive users." (archive.org metadata API for `audio_bookspoetry`, fetched 2026-11-04.)
- Non-LibriVox Spanish items in that collection, using HushBook's Internet Archive query (MP3 formats, `language` = Spanish/spa/es, minus LibriVox): **97**. The most-downloaded ones are mostly Spiritist literature (Kardec, Chico Xavier), plus a Galdós *Episodios Nacionales* upload. This is a thin, uneven shelf.
- How to filter by language: on archive.org search, use the Language facet, or put `language:spa` / `language:Spanish` in the query. Metadata is not normalized: "spa", "Spanish" and "es" all occur, which is why HushBook queries all three.
- Piracy caveat: in the 100-item sample of non-LibriVox Spanish audiobooks, 60 have **no license field**. Others carry CC BY-NC-ND, Public Domain Mark 1.0 or CC0. A user "Favorites" collection named "audio libros warhammer" (71 items) shows that commercial titles get uploaded too. How to tell: `_librivox` in the identifier, a link to a LibriVox catalogue page, or a license line showing Public Domain Mark / CC0 means it is safe. A recent commercial title with no license is likely an unauthorized upload. The scout already rejected the IA-piracy topic, so keep this to one sentence.
- archive.org overall: `mediatype:audio AND language:spa` returns 461,415 items, mostly music and radio. Not useful for the post.

### A3. Audible

- **Spanish storefront on audible.com:** https://www.audible.com/es_US/topic/audiobooks-spanish-language (fetched 2026-11-04). Page title: "Spanish Language Libros | Escucha en Audible". The nav includes "Audible Latino". Listings show "Idioma: Español" and Spanish-learning titles. audible.es is a separate store: https://www.audible.es/, title "Audible | Escucha audiolibros, podcasts y originales". I could not get a total count of Spanish titles (UNVERIFIED).
- **Read & Listen / immersion reading:** https://www.audible.com/ep/read-listen (fetched 2026-11-04):
  - "With Read & Listen, you can read the eBook on screen while the audiobook plays with synced narration that highlights the text in real time. You'll need both the eBook and audiobook for that title."
  - "Read & Listen features, including immersion reading, are currently available in the following marketplaces: the United States, United Kingdom, Canada, France, Germany, Italy, Spain, Japan, India, Brazil, and Australia."
  - **"Immersion reading and Page Sync are currently available for supported English and German language titles in the United States, United Kingdom, Australia, and Germany."**
  - "If you purchased a different version of the eBook (e.g., a different publisher or language), the sync may not connect."
  - For a learner: Audible's own page names only English and German titles for immersion reading, so the post should not tell people to use Read & Listen for Spanish-language books. Say "Audible lists English and German titles only".
- **Paul Noble:** https://www.audible.com/pd/B01D1VJS16, title "Learn Spanish with Paul Noble for Beginners – Complete Course". From the page's JSON-LD: duration "PT13H21M" (13 hrs 21 mins), datePublished 2016-03-31, publisher Collins, inLanguage "english". Description: "guide you through over 13 hours of everyday scenarios". Visible price: "Buy for $28.97" (the JSON-LD offer says 14.95, probably a member price). The page also says "The accompanying booklet is available here: http://collinsdictionary.com/resources." It is an English-language spoken course, not a Spanish book.
- **Pimsleur:** https://www.audible.com/pd/1508255555, title "Pimsleur Spanish Level 1 Lessons 1-5". Duration 3 hrs 4 mins, datePublished 2019-01-08, publisher Pimsleur, inLanguage "english". Visible price: "Buy for $19.76". Description: "With Pimsleur you'll become conversational in Spanish ... Only 30 minutes a day." A drill course sold in five-lesson chunks, not a book.
- Both are Audible DRM files, so HushBook cannot import them.

### A4. Spotify

- https://www.spotify.com/us/audiobooks/ (curl, fetched 2026-11-04): "Now enjoy 15 hours of audiobook listening time on Premium, every month." and "Select Premium plans now include 15 hours of audiobook listening time every month from our subscriber catalog of over 700,000 titles". **15 h still holds in the US.**
- https://newsroom.spotify.com/2026-10-07/audiobooks-global-expansion/ (curl):
  - "Eligible Premium subscribers get 12 hours of audiobook listening every month, included in their plan."
  - "listeners in new markets will be able to access more than 350,000 titles, including new catalogs in Spanish, Portuguese, Italian, Polish, and more, spanning over 120 languages."
  - WebFetch summary of the market list: "This option is coming to Italy, Spain, Portugal, Brazil, Mexico, Colombia, Poland, Chile, Norway, Peru, and more." It also says "Audiobooks+ is the primary way to access Audiobooks in markets across Africa, Asia, and Argentina."
- https://support.spotify.com/us/article/audiobooks-premium-plans/ (WebFetch): "The number of hours included varies per country and renews automatically each billing cycle." and "Any unused audiobook listening time from the previous month can no longer be used."
- **Whether the US subscriber catalogue includes Spanish-language audiobooks: UNVERIFIED** from an official page. The newsroom names Spanish catalogues only for the new markets (Spain, Mexico, Colombia, Chile, Peru). Safe wording: "Spotify added Spanish catalogues when audiobooks reached Spain and Latin America in October 2026; in the US, search for the title."
- No text: https://support.spotify.com/us/article/audiobooks/ lists the Now Playing controls: "Tap to control the play speed / Tap to skip forward 15 seconds, or tap to rewind 15 seconds / Tap to set a sleep timer". No transcript or text view. The site's existing posts already cite Page Match, which moves your place in the audiobook and shows no words.

### A5. Libby / OverDrive and hoopla

- **Libby language filter.** Libby's official blog, https://www.libbylife.com/2025-03-06-search-like-a-pro-expert-tips-for-finding-your-next-read-in-the-libby-app (WebFetch):
  - "After running your search, narrow down your results with filters like format, language, subject, and more."
  - "pinning the audiobooks and English filters will exclude all books and magazines and non-English language audiobooks when you browse and search."
  - So a learner can pin "Spanish" and "audiobooks" the same way. help.libbyapp.com/en-us/6064.htm ("Filtering by format") covers only format and "Audiobook Duration", with no language wording.
- **Libby: no text, no export.** https://help.libbyapp.com/en-us/6131.htm (curl): "Audiobooks in Libby can't be transferred to MP3 players or iPods. Instead, you can listen to audiobooks in Libby on a supported mobile device or in your web browser at libbyapp.com." I found no Libby help page about captions or text for audiobooks. The site's existing captions post already states this, citing the read-along / "narrated ebooks" pages (children's titles only).
- **hoopla language filter: UNVERIFIED.** https://www.hoopladigital.com/faq has no wording on languages or audiobook text. Library guides (e.g. https://library.hoopladigital.com/?p=1110) mention a language filter in Advanced search, but the example is comics. hoopla carries Spanish-learning audiobooks, including *Learn Spanish with Paul Noble*: https://www.hoopladigital.com/audiobook/learn-spanish-with-paul-noble-paul-noble/11638946 (search result, not fetched).

### A6. Graded readers with audio

- **Olly Richards, *Short Stories in Spanish for Beginners* (Teach Yourself):**
  - Audible page: https://www.audible.com/pd/1473683297. JSON-LD: duration PT4H30M, narrator Javier Marzan, publisher Teach Yourself, datePublished 2018-10-04. Description: "Mapped to A2-B1 on the Common European Framework of Reference" and "Controlled language at your level, including the 1000 most frequent words". "PLEASE NOTE: When you purchase this title, the accompanying PDF will be available in your Audible Library along with the audio." Visible price "Buy for $11.06".
  - Note: despite "for Beginners", the publisher maps the book to **A2-B1**, not A1.
  - Publisher's own delivery: https://readers.teachyourself.com/ (curl): "To read or listen to the titles purchased, please download our app from one of the app stores below". The app is "Foreign Language Graded Readers" by Hachette UK, https://apps.apple.com/us/app/id1422731589, version 2.1. App description: "Teach Yourself Short Stories by Olly Richards is a series of easy graded readers ... available in French, Italian, German, Spanish, Russian and English." So audio bought from the publisher plays **inside the app, not as an MP3 download** (DRM status of the app files: UNVERIFIED). A 2018 App Store review complains: "I can only access one at the time" (audio or text).
  - DRM-free route: Libro.fm lists the audiobook at https://libro.fm/audiobooks/9781473683297-short-stories-in-spanish-for-beginners (seen in search results; the page returned 403 to curl and WebFetch, so price and length are UNVERIFIED there). Libro.fm files are DRM-free (A7), so that copy would import into HushBook.
- **Lingo Mastery, *Spanish Short Stories for Beginners: 20 Captivating Short Stories...*:**
  - Audible page: https://www.audible.com/pd/B07B9KC44Y. Duration PT6H58M, narrators Jesse Fister and Nicolas Villanueva, publisher Lingo Mastery, 2018-03-08. "PLEASE NOTE: When you purchase this title, the accompanying reference material will be available in your My Library section along with the audio." Visible price "Buy for $16.47".
  - The "+ Audio Download" paperback and a link at the end of the book come from secondary listings (UNVERIFIED on a Lingo Mastery page).
  - A Libro.fm listing exists for a "Spanish Short Stories for Beginners by Language Mastery" (ISBN 9781669669180, https://libro.fm/audiobooks/9781669669180-spanish-short-stories-for-beginners). Seen in search results only, and possibly a different edition or publisher name.
- **Paco Ardit, "Spanish Novels" series:** Audible author page https://www.audible.com/author/Paco-Ardit/B00N64TWVK (search result). Titles are leveled A1 to C2, e.g. "Crimen en Barcelona (Short Stories for Intermediates B1)", "El Hacker (Short Stories for Pre-Intermediates A2)". Audio is sold as Audible audiobooks. A DRM-free source is UNVERIFIED.
- **Juan Fernández / "1001 Reasons to Learn Spanish": UNVERIFIED.** Nothing found. Leave it out.

### A7. Libro.fm

- https://support.libro.fm/support/solutions/articles/48000695426-how-do-i-download-audiobook-files-to-listen-on-my-computer- (WebFetch, 2026-11-04):
  - "You can download the zipped folder(s) containing the DRM-free files (MP3s or M4B format) directly to your computer and import these files into your media player of choice."
  - "To download a single audio file that contains your entire audiobook, choose the M4B option."
- Spanish-language titles:
  - Shelf Awareness, 2019-04-02: https://www.shelf-awareness.com/theshelf/2019-04-02/spanish-language_audiobooks_now_available_from_libro.fm.html. "A selection of some 2,000 Spanish-language audiobooks ... is now available from digital audiobook supplier Libro.fm ... at https://libro.fm/espanol."
  - Publishers Weekly, 2023-10-16: "We are still in the early days of selling Spanish-language audiobooks," says cofounder Mark Pearson.
  - The current catalogue size is UNVERIFIED: libro.fm returns 403 to automated fetches.

### A8. Competitor apps (US App Store listings fetched 2026-11-04)

- **Beelinguapp:** https://apps.apple.com/us/app/beelinguapp-language-learning/id1225056371
  - "Using our parallel-text method, you can read stories in two languages side by side"
  - "Audiobooks Narrated by Native Speakers"
  - "Karaoke-Style Scrolling Text: Follow along with synchronized text to enhance your reading and listening skills."
  - In-app purchases: "Beelinguapp Yearly $49.90", "Beelinguapp Monthly $7.99", plus promo yearly tiers from $18.49 to $41.99.
  - Its own catalogue of stories only; you cannot import your own audiobook.
- **LingQ:** https://apps.apple.com/us/app/lingq-learn-languages/id379385811
  - "all with matching text for easy listening and reading"
  - "Import Your Favorite Content: Turn Netflix, YouTube, podcasts, books, and articles into personalized lessons."
  - "AI Audio Transcription: Turn podcasts and audiobooks into interactive lessons."
  - Premium: "Unlimited vocabulary lookup and SRS review", "Unlimited content imports".
  - Prices: "LingQ Premium (Monthly) $14.99", "LingQ Premium (12 Months) $119.99", "LingQ Premium (6 Months) $80.99", "Premium Plus Monthly $29.99", "Premium Plus Yearly $269.99".
  - Free-tier limits and the "60 minutes / 60MB" import cap come from secondary sources (UNVERIFIED on LingQ's JS-rendered pricing page).
- **Lingopie:** https://apps.apple.com/us/app/lingopie-learn-languages-w-tv/id1534737981
  - "Enjoy videos with subtitles in your target and native languages. Tap on any word to get instant translations"
  - "Interactive tappable dual subtitles"
  - Prices: "Lingopie Monthly Subscription $13.99", "Lingopie Annual Subscription $83.99" (also $11.99 / $71.99 / $59.99 yearly / $34.99 for 3 months).
  - Video only, not audiobooks.
- **Dreaming Spanish:** https://www.dreamingspanish.com/method (curl): "Your progress is measured by the time you spend understanding real language. We track your input hours automatically, guiding you through key milestones toward fluency." The hour thresholds (Level 7 at 1,500 hours) and the $8/month Premium price come only from third-party reviews (e.g. https://palteca.com/dreaming-spanish-review). **UNVERIFIED** on the official site, which is JS-rendered. If the post mentions it, label the hours as the company's own roadmap, not research.

### A9. Other Spanish listening with text

- **News in Slow Spanish** (https://www.newsinslowspanish.com/, curl): "Learn Spanish by understanding real spoken conversations — at your level. Audio, transcripts, and explanations that help you understand spoken Spanish faster" and "Browse real-world audio lessons with transcripts and contextual translations in every episode." The nav offers "Spanish (Spain)" and "Spanish (Latino)". It is subscription-based ("SUBSCRIBE"). **Price UNVERIFIED** (the subscribe page did not render prices).
- **RTVE audiolibros, Instituto Cervantes, Biblioteca Virtual Miguel de Cervantes: UNVERIFIED.** No primary page confirmed audio plus synced text. Leave them out.

---

## Part B: HushBook app source (`D:\hushbook`)

### B1. Discover: Spanish filter, LibriVox and Internet Archive together

- Spanish is one of six Discover languages. `lib/core/store/store_models.dart`:
  ```
  english('eng', 'English', ['English', 'eng', 'en']),
  german('deu', 'German', ['German', 'deu', 'de']),
  french('fre', 'French', ['French', 'fre', 'fr']),
  spanish('spa', 'Spanish', ['Spanish', 'spa', 'es']),
  italian('ita', 'Italian', ['Italian', 'ita', 'it']),
  portuguese('por', 'Portuguese', ['Portuguese', 'por', 'pt']);
  ```
  UI label `lib/l10n/app_en.arb`: `"langSpanish": "Spanish"`. Filter chip default: `"discoverChipAnyLanguage": "Any language"`.
- Both libraries are searched together:
  - `StoreSourceFilter { both, librivox, internetArchive }` in `store_models.dart`
  - `"discoverChipBothLibraries": "Both libraries"`, `"homeSearchBothLibraries": "Search both libraries"`
  - `"discoverEntryLine": "Free audiobooks from LibriVox and Internet Archive"`
  - There is also a Discover row `"discoverRowOtherLanguages": "In other languages"`.
- Queries:
  - LibriVox: `librivox_provider.dart` uses `collection:librivoxaudio AND mediatype:audio` plus `language:"spa"`.
  - Internet Archive: `internet_archive_provider.dart` uses `mediatype:audio`, `collection:audio_bookspoetry`, `-collection:librivoxaudio` and an MP3 format clause, plus `(language:"Spanish" OR language:"spa" OR language:"es")`.
  - Today's counts for these exact queries: **563 LibriVox + 97 Internet Archive = about 660 Spanish books** in Discover, before client-side filtering.

### B2. Transcription language and engines

- `lib/core/whisper/model_manager.dart` defines four engines:
  - Tiny: `ggml-tiny.en-q5_1.bin`, 31 MB
  - Base, labelled "Regular": `ggml-base.en-q5_1.bin`, 57 MB
  - "Large": `ggml-small.en-q5_1.bin`, 190 MB
  - **"Universal"**: `ggml-base-q5_1.bin`, 57 MB, `'HushBook Universal'`
  - Only Universal is multilingual. It is whisper **base**, not small; the three others are English-only `.en` models.
- The default engine is Universal:
  - `prefs_service.dart`: `if (id == null) return EngineModel.multilingual;`
  - Onboarding, `profile_picker_screen.dart`: `const defaultModel = EngineModel.multilingual;`
- The language is **auto-detected**. There is no per-book or settings language picker on the phone. `transcription_service.dart`:
  - comment: "'en' for the English-only models (.en — they can't auto-detect); 'auto' for the multilingual Universal model so it transcribes the source language instead of forcing English (translate stays off)"
  - code: `language: model == EngineModel.multilingual ? 'auto' : 'en',`
- UI strings (`app_en.arb`):
  - `"engineUniversalTitle": "Universal"`
  - `"engineUniversalSubtitle": "Multilingual support — choose this if your audiobook is not in English."`
  - `"engineUniversalLanguages": "99 languages including Spanish, French, German, Hindi, Mandarin, Arabic, Japanese, Portuguese, Russian, Korean, and more"`
  - `"engineEnglishOnly": "English only"`
  - `"engineLargeSubtitle": "Highest English accuracy, slower to transcribe."`
- `"engineEnglishOnlyWarningTitle": "English-only engine selected"` and `"engineEnglishOnlyWarningBody": "This engine can only transcribe English. Choose Universal for an audiobook in another language."` exist in the ARB, but **no Dart code references them** today. A user who switched to Tiny, Regular or Large gets no warning before an English-only engine runs on a Spanish book. The post should say "keep the Universal engine (the default)".
- The website already claims "Ninety-nine languages ... Spanish, Hindi, Japanese, Arabic, French" (`D:\hushbook.app\index.html`, `#languages` section).

### B3. Playback speed

- `lib/core/prefs/prefs_service.dart`: `const double kMinPlaybackSpeed = 0.5;` `const double kMaxPlaybackSpeed = 3.0;`
- `lib/features/player/widgets/playback_speed_sheet.dart`:
  - presets `0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0`
  - `_step = 0.05`, with the comment "a −/+ stepper (0.05× steps) over today's presets as chips and a Custom chip that opens the slider"
- The speed is stored **per reading profile, not per book**: `playbackSpeedProvider` is a `.family` keyed on `AccessibilityProfile`, using `PrefsKeys.playbackSpeedFor(_profile)`. No per-book speed exists in the code.

### B4. Dictionary and translation

- The dictionary is **English-only, Pro, and needs the internet**:
  - `lib/core/dictionary/dictionary_api.dart`: `host: 'api.dictionaryapi.dev', pathSegments: ['api', 'v2', 'entries', 'en', word]`, with Datamuse as the fallback.
  - The word extractor only accepts ASCII letters: `RegExp(r"[A-Za-z]+(?:['’-][A-Za-z]+)*")`. Spanish words with á, é, í, ó, ú or ñ would not even parse as one word.
- Strings:
  - `"dictionarySearchHint": "Search any English word"`
  - `"dictionaryClipboardEmpty": "Clipboard does not contain any English words."`
  - `"dictionaryProTitle": "Unlock Dictionary with Pro"`
  - `"dictionarySourceAttribution": "Definitions by Free Dictionary API"`
  - `"proTourDictionaryHow": "Open Dictionary in Library. Type or paste a word to see definitions, examples and related words. An internet connection is needed for lookups."`
- The dictionary opens from Library (`lib/features/library/dictionary/dictionary_screen.dart`), not from a tap on a word in the read-along.
- **No translation feature.** A grep for "translat" in app code (outside l10n) finds only canvas `translate` calls. Whisper translate is explicitly off ("translate stays off").
- E-book sync (Pro) is English-only too: `"ebookErrorUnsupportedLanguage": "Fast e-book sync currently supports English narration."` and `"proTourEbookNote": "Use the same unabridged edition with English narration. ..."`. So syncing a Spanish Gutenberg EPUB to a LibriVox recording is not supported.

### B5. Long-press, tap a line, Mark

- `"playerTapLineToJump": "Tap a line to jump there"`, a switch in the player's Appearance sheet.
- `"playerTapLineToJumpHint": "You can always long-press a line to play from there."`
- Default off. `prefs_service.dart`: "Tap-to-seek on transcribed text. Off by default so reading taps never move the audio by accident", with `defaultValue: false`. Also `"lyricsTapToSeekHint": "Tap a line to jump the audio there. Off by default so reading taps never move playback."`
- Long-press notice: `"playerPlayingFromHere": "Playing from here"`.
- Mark:
  - `"markButton": "Mark"`, `"markButtonTooltip": "Mark: highlight, note or quote"`
  - Kinds: `"markHighlight": "Highlight"`, `"markKindNote": "Note"`, `"markKindQuote": "Quote"`
  - Library list: `"quotesAndNotesTitle": "Quotes & notes"`
  - Privacy: `"analyticsQuotePrivacy": "Quotes stay on this device."`
- None of this depends on language, so it works the same on a Spanish transcript.
- Side note: the live `/blog/can-libby-read-to-you` text says "Tap any word to jump the audio there". That is off by default, so that post may need a wording fix.

### B6. Reading profiles and fonts

- Profiles (`prefs_service.dart` and ARB): "Focused Reader", "Dyslexia & ADHD", "Low Vision".
- Fonts (`enum TranscriptFont`): System, Inter, Newsreader, Kameron, OpenDyslexic, Lexend, Andika, Comic Neue, Atkinson Hyperlegible. All are Latin fonts; Spanish accents were not tested visually (UNVERIFIED but expected).

### B7. On-device transcription and Transcribe on my PC

- On-device:
  - `"longAudiobookDescription": "Transcribing this book runs entirely on your device and can take a while. Your device may get warm and use battery — that's normal."`
  - `D:\hushbook.app\llms.txt`: "Transcription runs on-device. There is no account and no cloud upload of your audio."
  - `index.html`: "There's no upload, no account, and after a one-time engine download the whole app works offline".
- PC option:
  - `"transcribeOnMyPc": "Transcribe on my PC"`
  - `"desktopTileSupportingUnpaired": "Faster, and keeps your phone cool. Uses your computer on the same Wi-Fi."`
  - `"pairComputerBody": "Your computer can transcribe your books much faster than this phone. Books travel over your home Wi-Fi. They don't go through the internet."`
  - Pro: `"desktopCardProNeeded": "Pro is needed to use your computer."`
- **Spanish caveat for the PC:**
  - `"desktopTileEnglishOnly": "English books only for now."` and `"desktopJobEnglishOnly": "Your computer transcribes English books only. Transcribe on this phone?"`
  - Code `desktop_session.dart`: `helloEnglishOnly(hello) => hello == null || !hello.jobLanguages.contains('*');` and `jobLanguageFor(...) => !helloEnglishOnly(hello) && engine == EngineModel.multilingual ? 'auto' : 'en';`
  - So a Spanish book goes to the PC only if the computer reports a multilingual model; otherwise the app shows "English books only for now." Which models the desktop app ships is not in this repo (UNVERIFIED). The post should say the phone handles Spanish and not promise PC transcription for Spanish.

### B8. Limits the post must state

- **No DRM import.** Audible, Libby, hoopla and Spotify files cannot be imported. This matches the site's existing posts; Libby's help confirms its audiobooks "can't be transferred". Paul Noble and Pimsleur on Audible are therefore out.
- **Speech recognition errors.** The Universal engine is whisper **base**, a smaller model than the English "Large" (small.en). Expect more mistakes on Spanish names, archaic words and noisy LibriVox recordings. I did not measure Spanish accuracy (UNVERIFIED).
- **No plain-text export.** The only export is `"bundleExportRow": "Export .hushbook file"` (audio plus transcript for another HushBook). No .txt, copy-transcript or share-transcript string exists.
- **Engine download size.** Universal is about **57 MB**; the string `"engineSize": "~{size} MB"` shows sizes in Settings. Discover itself needs the internet: `"discoverDownloadsNeedInternet": "Downloads need the internet."`

---

## Facts the post must state honestly

1. **LibriVox Spanish:** about 630 finished recordings (628 complete, 644 in all, on the 2026-11-04 catalogue search). They are public domain in the US, so they are old texts. Readers are volunteers with mixed accents ("We accept all volunteers in all languages, with all kinds of accents"), and many books are group readings with a different voice per chapter. Only the *Antología de Cuentos Hispanoamericanos* page says it matches readers to each story's country.
2. ***Platero y yo* has no LibriVox recording.** Good starter picks that do exist: *Cuentos de la selva para los niños* (2 h 07 min), *La Edad de Oro*, Fernán Caballero's *Cuentos, adivinanzas y refranes populares*, Grimm *Cuentos de hadas*, and *El Capitán Veneno* (one reader, 2 h 14 min).
3. **Audible immersion reading** is listed only for "supported English and German language titles". Do not suggest it for Spanish books. Paul Noble (13 h 21 min, $28.97) and Pimsleur (Level 1 Lessons 1-5, 3 h 4 min, $19.76) are English-language spoken courses in Audible DRM, and HushBook cannot open them.
4. **Spotify:** 15 h per month in the US (spotify.com/us/audiobooks, today); 12 h in the October 2026 markets (Spain, Mexico, Colombia, Chile, Peru and others), which got "new catalogs in Spanish". The size of the US Spanish catalogue is unverified. Spotify shows no text for audiobooks.
5. **Libby** lets you filter or pin a language. Its audiobooks show no text and "can't be transferred", so HushBook cannot import them. hoopla's language filter is unverified.
6. **Olly Richards** *Short Stories in Spanish for Beginners* is mapped by its publisher to **A2-B1**, not A1. Audio bought from the publisher plays inside its app; the Audible edition is DRM-protected. The Libro.fm listing is the DRM-free route (listing seen, not fetched).
7. **Libro.fm** sells "DRM-free files (MP3s or M4B format)", which import into HushBook. Its Spanish catalogue is real but small and of unconfirmed size.
8. **HushBook transcribes Spanish only with the Universal engine** (the default; whisper base multilingual, about 57 MB, auto-detects the language). The other three engines are English-only, and today the app does not warn when one of them runs on a Spanish book.
9. **No translation and no Spanish dictionary in HushBook.** The dictionary is English-only, Pro and needs the internet. Learners need a separate Spanish dictionary or translator. E-book sync (Pro) is English-only too.
10. **Speed** runs from 0.5× to 3× in 0.05× steps, set per reading profile, not per book.
11. **Tap-to-jump is off by default.** Long-press a line to play from there ("Playing from here"), or turn on "Tap a line to jump there" in Appearance. Mark → Highlight / Note / Quote saves to Quotes & notes, and this works on Spanish text like any other.
12. **"Transcribe on my PC"** (Pro) may show "English books only for now" when the computer's model is English-only. Do not promise PC transcription for Spanish.
13. **Speech recognition makes mistakes**, more on names, archaic Spanish and noisy recordings, and the multilingual engine is the smaller base model. There is no plain-text transcript export. Audible, Libby, hoopla and Spotify books cannot be imported.
14. **Dreaming Spanish hour milestones** (e.g. 1,500 h) are company claims seen only in third-party reviews. If mentioned, label them as a vendor roadmap, not research.
