# Notes: Audiobooks With Captions

Published 2026-11-03 at /blog/audiobooks-with-captions. Pick #4 of `docs/seo/keyword-research-ai-search-2026-10-30.md`, re-validated on the day by a scout pass (about 100 autocomplete calls, 17 WebSearch SERP checks).

## Why this topic

- About 40 autocomplete phrasings across "audiobooks with closed captions", "do audiobooks come with captions", "are there audiobooks with subtitles", "audiobook with subtitles app", "can you get subtitles on spotify audiobooks", "does libby have captions for audiobooks", "how to get captions on audible", "audiobooks for hearing impaired", "talking books for hard of hearing". Ten "does audible have subtitles/captions" variants.
- SERP is 2019 to 2020 lawsuit news (Publishers Weekly, Jane Friedman, Locus), DAISY, an RIT library guide, the F-Droid SubRead listing and a Speechify post that claims a toggle Audible does not have. No sourced guide existed.
- Search Console (90 days to 2026-10-31): "can you get subtitles on spotify audiobooks" 2 impressions at 7.5 on the Spotify post, "do audiobooks have transcripts" 4 at 7.2 on /audiobook-with-text. The transcript queries stay with /audiobook-with-text; this post links there and owns the caption wording, the hearing angle and the Live Captions how-to.
- Rejected on the day: "how to get a transcript of an audiobook" (DRM-removal vendor SERP; HushBook has no plain-text export, keep for later with that caveat), "can you listen to audiobooks offline" (brand help pages own the app-specific variants), Apple Books read-along (small cluster, keep), learn-English apps (cannibalizes learn-english-with-audiobooks).

## Research files

- `research-evidence.md`: Audible Captions history (July 31 2019 demo, August 23 2019 suit by seven publishers, January 13 2020 settlement, March 2020 "never launched"), Read & Listen status, the Speechify claim, caption and reading-while-listening evidence, hearing-loss figures, WCAG 1.2.1, caveats. 34 sources, every DOI checked on Crossref.
- `research-platforms.md`: what Spotify, Libby, Apple Books, hoopla, Audible, Storytel offer; iOS Live Captions, Android Live Caption, Windows live captions; Bloox, SubRead, Storyteller, WorkAudioBook, Clearly Audiobooks; Whisper licences; Audible conditions of use; LibriVox public domain statement. Fetched 2026-11-03.

## Corrections made elsewhere

- `are-audiobooks-good-for-adhd.md`: Moussaoui 2025's PACED condition is one word at a time in its usual place with the rest hidden, not highlighting. Fixed wording.
- `scripts/inject-gtag.js`: now skips `tools/` (the first `build:blog` after the mockup scenes landed had injected GA into every scene).

## Images

- `audiobook-captions-read-along.webp`: two real app renders from `tools/mockups/out` (player-hitchhikers, read-along) composed with `compose_phones.py` (PIL) on a dark canvas.
- `audible-captions-timeline.webp` and `hearing-loss-numbers.webp`: HTML rendered with Playwright at 2x using the mockup fonts (Newsreader, Inter), site ink and paper tokens, coral accent.
