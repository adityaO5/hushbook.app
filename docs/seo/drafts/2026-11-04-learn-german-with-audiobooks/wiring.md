# Wiring for /blog/learn-german-with-audiobooks

Draft, 2026-11-04. Nothing outside this folder has been edited.

## 1. Contextual links from existing posts (link-only, no `dateModified` bump)

- **`learn-spanish-with-audiobooks.md`**, "Do Spanish audiobooks come with text or a transcript?". Line 83 ends "...offers speed, 15-second skips and a sleep timer, and no text." Append to that paragraph:
  > German learners have more options: Read & Listen covers German, and [how to learn German with audiobooks](/blog/learn-german-with-audiobooks) lists free German audio published with its full text.
- **`can-you-read-along-with-audible.md`**, "What you need". Line 15 ends "...check your country's Audible help pages before you buy anything." Append:
  > If you're learning German, [how to learn German with audiobooks](/blog/learn-german-with-audiobooks) covers German books by level and free German audio that comes with the full text.
- **`free-read-along-audiobooks.md`**, "Who is it useful for?". Line 40, the "Language learners" bullet, ends with the Spanish link. Append:
  > German picks, plus free Deutsche Welle audio with the text, are in [how to learn German with audiobooks](/blog/learn-german-with-audiobooks).

  If the French draft also edits this bullet, merge both into one sentence instead: "Free picks by level are in our guides to learning [Spanish](/blog/learn-spanish-with-audiobooks), [French](/blog/learn-french-with-audiobooks) and [German](/blog/learn-german-with-audiobooks) with audiobooks."

## 2. Registry

Insert `registry-entry.mjs` at the top of `posts` in `data/blog-posts.js`. Checked by script:

| Field | Value |
|---|---|
| `title` | 61 chars, equals the post.md H1 |
| `metaTitle` | 57 chars (limit 60), contains "Learn German With Audiobooks" |
| `metaDescription` | 158 chars (limit 160) |
| `description` | 223 chars (limit 240), same text as `llms-line.txt` |
| `cta.heading` / `cta.text` | 31 / 238 chars |
| `keywords` / `takeaways` / `faqs` | 8 / 5 / 6 (FAQ answers 3 to 4 sentences) |

- **`readingTime`**: the build has no handler for `'auto'`. Replace it with `'16 min read'`: the blog parser counts 3,676 words (3,798 raw, including Sources), and ceil(3,676 / 230) = 16, the rule the Spanish post used.
- **`category`**: `'Language learning'`, same as the Spanish and English siblings.
- No `hero`, `aside` or `compared` field. The three wide images are in `assets/img/blog/` (untracked): `german-audiobook-read-along.webp`, `german-speech-rate.webp`, `german-audiobook-routine.webp`. The three image lines match the brief character for character.
- **Ship order**: the post links `/blog/learn-french-with-audiobooks` once (end of the reading-while-listening section). Publish the French post in the same deploy or first, or that link 404s.

## 3. llms.txt

Insert `llms-line.txt` directly below the `[HushBook blog]` line.

## 4. Facts I was unsure about

- **Pellegrino 2011 German row** (5.97 vs 6.19 syllables a second) is copied from the Spanish evidence file; the PDF could not be re-opened today. The evidence agent checked it for internal consistency.
- **Quotes shortened, meaning kept**:
  - Hopp 2015: the post quotes "no indication that increasing proficiency" and paraphrases the rest ("leads to the involvement of morphosyntax in predictive L2 processing").
  - Twain, *Connecticut Yankee*: the post paraphrases the opening ("dives into a sentence") and quotes "on the other side of his Atlantic with his verb in his mouth."
  - Read & Listen: "the same edition" and "the same Amazon account" are fragments of two longer help-page sentences.
- **Jackson 2008** is described as "intermediate learners were slow to use case wherever the verb sat", from the abstract's "not immediately sensitive to case-marking information regardless of thematic verb placement". The direction of the verb effect for advanced learners is not in the abstract, so the post says only that an early verb "changed how hard" object-first sentences were.
- **Sample sizes not in the abstract**: Jackson 2008, Bordag 2017 (the post says so), Peterson 2025 (the post says so), Zhang and Peng 2024, Zhao 1997, Lightbown 2002, Trofimovich 2009.
- ***Den Hund sieht der Mann*** is our own example sentence, not a stimulus from Marsden et al. or Hopp.
- **Hesse**: Duke names only *Der Steppenwolf*. *Siddhartha* (1922) being US public domain is derived from the 95-year rule, and "until the end of 2032" in Germany is computed (died 1962, life plus 70). Kästner's US status is left out; the post says only that LibriVox has none.
- **Dates and descriptions in the book tables**: *Die Verwandlung* is dated 1915 (magazine; the book was 1916). *Der kleine Häwelmann* has no year in the research, so none is given. "Grim rhymed tales" (*Struwwelpeter*), "two boys' pranks, in rhyme" (*Max und Moritz*), "North German novella" (*Der Schimmelreiter*) and "a story many learners know" (*Heidi*) are general knowledge or our judgement, not quotes from LibriVox.
- **Levels**: all "Roughly A2" etc. are our suggestions. Publisher levels are only Olly Richards (A2-B1), Lingo Mastery (A2+), DW (B2, B1, A1 to B1), Slow German (B1 and up), Coffee Break Level 1 (A1 to A2) and Readle (A1 to C1). André Klein's *Café in Berlin* has no stated CEFR level, so the post gives none.
- **Vorleser.net** "mostly classics" is inferred from the site's "mehr als 70 Jahre tot". **Easy German** downloads were not checked, and the table says "Not checked". **Ohrka** per-title text is unverified, so the table claims none.
- **Libro.fm**: its German catalogue is unverified (403). The post names Libro.fm only as an example of a DRM-free purchase you can import, not as a German store.
- **Spotify US German catalogue**: unverified; the post says "we could not confirm" it.
- **Discover count 848**: the app's own LibriVox query (`language:"deu"`) on archive.org, before client-side filtering. Two LibriVox items tagged `ger` are missed by that query (product note).
- **"Free; Pro adds extras"** and **"No account, no ads"** come from existing site copy, as in the Spanish post.
- **Site inconsistency to check**: `can-you-read-along-with-audible.md` line 15 says Read & Listen "At launch ... supported English, German, Spanish, Italian and French books". Audible's Read & Listen page today says "supported English and German language titles". The Spanish post and this post follow today's page.
- **Product note**: the English-only engine warning strings (`engineEnglishOnlyWarningTitle/Body`) are still unused in Dart, so step 2 tells readers to check the engine themselves.

## 5. Source labels not taken from a captured page title

- New in this post:
  - Spotify Newsroom (2025), "Spotify Expands Its Audiobooks Offering to Listeners in Germany, Austria, Switzerland, and Liechtenstein": built from the URL slug.
  - Duke Center for the Study of the Public Domain, "Public Domain Day 2023": built from the URL.
  - Audible, "Short Stories in German for Beginners": the product name from the research file; the page title was not captured.
  - App Store, "Learn German: News by Readle": the app name as quoted in the research file.
- Reused from the Spanish post, already flagged there: Audible "Read & Listen", Spotify "Spotify Audiobooks" (US), Libby Help 6131, Libby Life, Libro.fm Support, and the Beelinguapp and LingQ App Store names.
- Inline links (not in Sources) whose link text is just the service or product name: Lingopie (App Store), the three DW pages, Slow German, Vorleser.net, Ohrka, Easy German membership, Coffee Break German Level 1, LearnOutLive (*Café in Berlin* and the TalkingBook page), the Audible pages for Lingo Mastery, Paul Noble and Pimsleur, and the eight LibriVox book pages.

## 6. Left out

- **Respecting UNVERIFIED flags**: frequency-dictionary coverage percentages (Jones and Tschirner), Rott 1999 as a German study, Lund 1991 findings, Goethe-Institut Onleihe, ARD Sounds, reader accents and origins, Readle word-level highlighting, Kästner's US public-domain status.
- **Verified but cut for length** (any can swap in):
  - Tschirner 2016 (listening lags reading, 3,000+ students)
  - Isel et al. 2003 (compound heads, native listeners)
  - VanPatten and Borst 2012 (explicit information speeds up case processing)
  - Henry 2022 and 2025, Hopp 2013, Bordag 2015, Arnold 2009, Clahsen and Felser 2006
  - Montero Perez 2014, Hu and Nation 2000, Kremmel 2023, Coupé 2019
  - Pellegrino's information-density figures (0.79 vs 0.91) and the "about a fifth longer" derivation
  - Facts about Germany's 130 million speakers
  - audible.de offer, Paul Noble booklet and *Next Steps in German*, Pimsleur's 30-part series
  - Spotify Audiobooks+ (€8.99), DW's "may be restricted in some countries" note, the LibriVox copyright footer quote
  - The complete Grimm *Kinder- und Hausmärchen* (29 h 41 min, 15 readers) and the second solo versions of *Struwwelpeter* and *Max und Moritz*
- **Mark Twain's compound quote** ("six or seven words compacted into one") was cut for length; the Appendix D source stays for the separable-verb quote.

## 7. After publishing

1. Run `npm run build:blog`, then the `*.test.js` suite. `seo-preservation` and `seo-repair-contract` already fail on the old baseline.
2. Check the rendered HTML has 1 h1, 12 h2, 3 wide figures and 4 tables, and that `/blog/learn-french-with-audiobooks` resolves.
3. Ping IndexNow for the new URL, /blog, and the three posts that get links.
4. Request indexing in Search Console.
