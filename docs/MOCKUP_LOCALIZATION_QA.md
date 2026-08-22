# Mockup localization QA

Status: private preview for remaining locales. English masters are the source
of truth and were not modified. French is frozen as the accepted baseline.

## Generated set

- 36 English master assets.
- 20 non-English locales: `de`, `fr`, `es-ES`, `es-419`, `pt-BR`, `pt-PT`,
  `it`, `ja`, `ko`, `nl`, `pl`, `tr`, `ru`, `uk`, `ar`, `id`, `th`, `vi`,
  `sv`, and `da`.
- 720 WebP variants at `assets/img/mockups/locales/<locale>/` (French baseline
  plus 684 remaining-locale jobs).
- Every locale contains the same 36-file set; the PNG read-along master is
  emitted as a WebP variant without changing its dimensions.
- Current generated payload: approximately 84 MB. Review lazy-loading and
  caching before production rollout.

## Local generation path

The deterministic local Pillow renderer remains a disposable private preview
only. It is never promoted as a final AI-edited screenshot:

```text
python scripts/localize-mockups.py
python scripts/verify-mockup-locales.py
```

The renderer never edits English masters. It only applies masks declared in
`data/mockup-text-manifest.json`, fits approved translations from
`data/mockup-translations.json`, shapes Arabic/CJK/Thai text with local fonts,
and fails on overflow. English masters remain immutable.

The remaining-locale workflow creates one GPT-5.6 edit packet per asset and
locale, including exact target strings, red-box guide, locked components,
source checksum, dimensions, and validation placeholders:

```text
python scripts/localize-mockups-ai.py --batch high-risk --replace
python scripts/localize-mockups-ai.py --batch latin --replace
python scripts/verify-mockup-ai.py
```

Job packets live in `data/mockup-ai-jobs.json`; translation/back-translation
records live in `data/mockup-image-translations.json`. Built-in image edits are
performed in Codex without an external API key. Failed edits remain
`needs-review`; no poor overlay or unreviewed AI result is promoted.

After visual review, record one built-in result only when its dimensions and
mode match the English master:

```text
python scripts/record-mockup-ai-result.py --locale de --asset home.webp --source <generated-file>
```

## Translated screenshot regions

The current manifest controls 77 readable regions across ten high-signal assets:

- `advanced-analytics.webp`
- `home.webp`
- `brain-health.webp`
- `library.webp`
- `player-hitchhikers.webp`
- `card-habit-insights.webp`
- `card-add-goals.webp`
- `card-genre-radar.webp`
- `card-goals-sheet.webp`
- `card-words-per-book.webp`

These include the cards highlighted in the landing-page review: Habit
Insights, Genre Radar, Add Goals, the goals sheet, and Words per book. All
other mockups remain blocked from promotion until their readable regions are
added to the manifest and pass OCR/visual review. This is an intentional
private-preview gate, not a claim that every baked string is already
translated.

## Approved exceptions

- Book-cover artwork and lettering.
- Author and person names.
- Titles intentionally shown as library content or truncated chart labels.
- Product/platform names (`HushBook`, iOS, Android, App Store, Google Play).
- Numbers, dates, durations, chart values, and control states.
- Locked icons, controls, charts, illustrations, portraits, device frames, and
  decorative texture.

## Verification evidence

`python scripts/verify-mockup-locales.py` currently passes:

```text
Mockup QA passed: 20 locales × 36 assets; 7 pages checked per locale.
```

`python scripts/verify-mockup-ai.py --publish` checks the complete 684-job
matrix and currently passes. The release allowlist in
`data/mockup-ai-release.json` includes all 20 non-English locales, and the
localized public pages reference their WebP variants. Set
`MOCKUP_ASSET_MODE=masters` for immediate rollback without deleting generated
assets.

The final pass included exact-dimension checks for all 720 outputs and
representative visual checks across French, Danish, Arabic, and Japanese.
Additional native-language review remains a useful follow-up for copy polish.
