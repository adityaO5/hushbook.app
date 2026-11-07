# Wiring for /blog/why-cant-i-focus-on-reading

Draft, 2026-11-08. Nothing outside this folder has been edited by the writer.

## 1. Contextual links from existing posts (link-only, no `dateModified` bump)

- **`content/blog/how-to-focus-on-audiobooks.md`**, "What if nothing works?". After the paragraph
  > Some people really do follow a story better on paper, and that's fine. Mind wandering happens in print too. You just notice it sooner.

  add a new paragraph:
  > If print has become hard to stick with too, [why can't I focus on reading anymore](/blog/why-cant-i-focus-on-reading) covers the causes, from sleep to eyesight, and when to see a doctor.

- **`content/blog/does-reading-along-with-an-audiobook-help.md`**, "Does reading along help you focus?". The second paragraph ends with `For more on attention, see [how to focus on audiobooks](/blog/how-to-focus-on-audiobooks).` Append to that paragraph:
  > If reading itself has become hard to stick with, [why can't I focus on reading anymore](/blog/why-cant-i-focus-on-reading) goes through the usual causes and nine things that help.

- **`content/blog/how-to-read-classics-without-getting-bored.md`**, "How to read classics without getting bored". After the paragraph
  > Difficulty also feeds mind wandering. In a 2013 study by Feng, D'Mello and Graesser, people read easy or difficult versions of eight passages. Their minds wandered more often on the difficult versions, and there the wandering did more harm to comprehension.

  append to that paragraph:
  > If every book feels like this lately, not only the classics, see [why can't I focus on reading anymore](/blog/why-cant-i-focus-on-reading).

- Optional fourth: **`content/blog/how-to-go-on-an-information-diet.md`**, "Notifications off at all times", end of the second paragraph (`... while the narrator keeps talking to nobody.`). Append:
  > For what the research on phones and focus actually found, see [why can't I focus on reading anymore](/blog/why-cant-i-focus-on-reading).

  That post is a first-person brain-dump in the owner's voice; skip it if the sentence reads out of place.

## 2. Registry

Insert the object literal from `registry-entry.mjs` (the `entry` object only, not the self-check) at the top of `posts` in `data/blog-posts.js`. `node registry-entry.mjs` passes:

| Field | Value |
|---|---|
| `title` | 59 chars, equals the post.md H1 |
| `metaTitle` | 57 chars (limit 60), starts with the query |
| `metaDescription` | 152 chars (limit 160) |
| `description` | 225 chars (limit 240), same text as `llms-line.txt` |
| `cta.text` | 233 chars |
| `keywords` / `takeaways` / `faqs` | 8 / 5 / 6 (answers 34 to 38 words, each starts with Yes, No or Two) |
| `readingTime` | `'14 min read'` (2,996 body words / 220) |
| `category` | `'Reading and listening'`, same as how-to-focus-on-audiobooks and does-reading-along-with-an-audiobook-help |

- `faqs` use the registry's `[question, answer]` array shape, not `{question, answer}` objects, to match every existing entry.
- No `hero`, `aside` or `compared` field.
- The three wide images are already in `assets/img/blog/` (untracked): `why-cant-i-focus-on-reading-mind-wandering.webp`, `why-cant-i-focus-on-reading-pace.webp`, `why-cant-i-focus-on-reading-read-along.webp`. Commit them with the post.

## 3. llms.txt

Insert `llms-line.txt` at the top of the `## Blog (English)` list, directly under the `[HushBook blog]` line (line 40), above the German line.

## 4. Answer pages (`scripts/build-answer-pages.js`)

No change. LABELS/RELATED hold four links per answer page and serve product questions (read-along, audiobook with text, dyslexia app, M4B). The closest neighbour, `audiobook-app-for-dyslexia`, already links `/blog/are-audiobooks-good-for-adhd` and `/blog/how-to-focus-on-audiobooks`, and swapping one out for a general reading-focus post would weaken that page's topical cluster. Revisit if the post starts ranking for ADHD queries.

## 5. Ship check

1. All internal links in the post point to live posts: `/blog/are-audiobooks-good-for-adhd`, `/blog/how-long-is-an-audiobook`, `/blog/how-to-read-classics-without-getting-bored`, `/blog/does-listening-to-audiobooks-count-as-reading`, `/blog/does-reading-along-with-an-audiobook-help`, `/blog/how-to-focus-on-audiobooks`, plus `/`. No ship-together dependency.
2. `npm run build:blog`, then the `*.test.js` suite (`seo-preservation` and `seo-repair-contract` already fail at HEAD on old baselines; not a regression).
3. Rendered HTML should have 1 h1, 12 h2 (11 + Sources), 9 h3, 3 wide figures, 1 table.
4. Before publishing, open Google in a normal browser for "why can't i focus on reading anymore" and "how to get out of a reading slump" and record PAA and AI Overview (see `notes.md`, PAA caveat).
5. After deploy: IndexNow for the new URL, /blog and the posts that got links; then request indexing in Search Console.
