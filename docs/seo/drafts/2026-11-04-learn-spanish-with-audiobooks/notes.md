# Notes: How to Learn Spanish With Audiobooks

Published 2026-11-04 at /blog/learn-spanish-with-audiobooks. Topic picked on the day by an Opus scout (about 420 autocomplete calls, WebSearch SERP checks, Search Console cannibalization check); see `scout-report.md`.

## Why this topic

- Biggest uncovered cluster on the site: 127 distinct autocomplete phrasings for Spanish ("audiobooks to learn spanish" a-z: 20; "spanish audiobooks" a-z: 93), with French (104) and German (62) behind it for follow-ups on the same template.
- Search Console (90 days to 2026-10-31): zero impressions for spanish, french, german, bilingual, translat, foreign, language or graded. No cannibalization; the learn-English post is English-specific and is linked instead of repeated.
- SERP: store listings (Audible in four countries, Kobo, Bookmate, hoopla records), Lingopie, FluentU, Talkpal, Speechling, the Audible blog and a thin BookRiot list. No sourced guide, and no page explains how to get the text.
- Fit: Discover's language filter includes Spanish (about 660 LibriVox + Internet Archive items on the day); Spanish transcription runs on the default Universal engine.
- Rejected on the day (scout list): Internet Archive audiobooks (piracy long tail), do audiobooks come with text (owned by /audiobook-with-text), bookmark/highlight (notes post), search inside / cite an audiobook (Scribbr, Purdue), audiobooks for blind or low-vision (NLS, RNIB), seniors (device intent), concussion (medical), students, textbooks, autism, aphantasia, graded readers (PDF/piracy), generic "learn a language by listening" (too close to the English post; use as FAQ and later hub), audio drama vs audiobook, hoopla/Apple Books read-along (small). Also: transcript topic rejected again (fourth time) because /audiobook-with-text earns those clicks.

## Research files

- `research-evidence.md`: 38 sources, every DOI checked on Crossref, abstracts via OpenAlex / ERIC / Europe PMC. Key facts: no study of adults learning Spanish from audiobooks; Hui and Godfroid 2025 (n = 86) found reading-while-listening comprehended a novel less well than silent reading, both beat listening alone; Peterson 2025 (Japanese) and Zhang and Peng 2024 (Chinese) favour text plus audio; Pellegrino 2011: 7.82 vs 6.19 syllables a second, 0.63 vs 0.91 information per syllable; Jensen and Vinther 2003 (n = 84): three hearings help, slowed or not; Davies 2005: top 1,000 words = 87.8% of speech, 79.6% of fiction; FSI page now says 24 to 30 weeks, 552 to 690 class hours (older copies said 600 to 750); Schoonmaker-Gates 2018 (n = 60): familiarity, not variety, predicts comprehension; Lightbown 2002 and Trofimovich 2009: comprehension-only programs fall behind on writing and fluency ratings. UNVERIFIED and left out: Montero Perez 2013 effect sizes, Dreaming Spanish hours and price, Cervantes 2026 figure, Lund 1991, Zhao's n.
- `research-platforms.md`: LibriVox 628 complete / 644 total Spanish recordings (site advanced search; the API has no language filter); eight picks with running times and reader counts; Audible Read & Listen "supported English and German language titles" only; Paul Noble 13 h 21 min $28.97, Pimsleur 1-5 3 h 4 min $19.76; Olly Richards mapped to A2-B1 by its publisher, Audible 4 h 30 min $11.06 with PDF; Libro.fm "DRM-free files (MP3s or M4B format)"; Spotify 15 h US, 12 h in the October 2026 markets with "new catalogs in Spanish"; Beelinguapp $7.99/mo or $49.90/yr, LingQ $14.99/mo or $119.99/yr, Lingopie $13.99/mo or $83.99/yr (US App Store, 2026-11-04). App source (Part B): Universal engine = default, multilingual, auto-detect, about 57 MB; Tiny/Regular/Large English-only; the English-only warning strings exist in the ARB but no Dart code shows them; "Transcribe on my PC" can say "English books only for now"; dictionary English-only (dictionaryapi.dev), Pro, online, parser accepts A-Z only; no translation; speed 0.5x to 3x in 0.05x steps per profile; "Tap a line to jump there" off by default, long-press = "Playing from here"; export is .hushbook only.

## Images

- `spanish-audiobook-read-along.webp`: two real renders composed with `compose_phones.py` (PIL). Both came from temporary copies of the mockup scenes (`tools/mockups/scenes/_es-read-along`, `_es-player`, deleted after rendering): the read-along scene with the opening of Quiroga's "La abeja haragana" (Wikisource text, public domain, chapter 1 of the LibriVox recording, 14:07) and the player-cover scene with the LibriVox cover `cuentos_selva_1603.jpg` from archive.org. Cover average colour `#7C9962` for the ambient wash; the scene's `alnum` regex widened to `\p{L}\p{N}` so accented words time correctly; shot at t = 11 so the current word sits mid-screen.
- `spanish-speech-rate.webp` and `spanish-audiobook-routine.webp`: HTML rendered with Playwright at 2x (mockup fonts, site tokens, coral accent). Stat tiles: single accent, label + value, sources line (dataviz skill).

## Side fixes shipped with this post

- Outdated "tap any word to jump" claims (tap-to-seek is off by default; long-press plays from a line) rewritten across the older posts and their registry ctas/FAQs. The learn-English post's step 3 now says "a long press on the line".
- Homepage moment line: "Apple-Music lyrics, for books." replaced by "Subtitles for audiobooks." in English and 23 locale pages (commit 8293db7).

## Wiring

See `wiring.md`. Registry: metaTitle 58, metaDescription 159, description 235, 16 min read, category 'Language learning' (same as the English post). Contextual links from learn-english-with-audiobooks, free-read-along-audiobooks and is-librivox-safe-and-legal. No answer-page change.
