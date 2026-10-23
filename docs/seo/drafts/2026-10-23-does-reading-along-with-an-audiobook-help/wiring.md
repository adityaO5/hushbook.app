# Wiring for /blog/does-reading-along-with-an-audiobook-help

Apply after adding `content/blog/does-reading-along-with-an-audiobook-help.md` (copy of `post.md`) and the registry entry. These are link-only edits to existing posts: no `dateModified` bump.

All of this was already applied locally on 2026-10-23 (uncommitted). This file records exactly what changed.

## 1. Answer pages (`scripts/build-answer-pages.js`): no change recommended

`/read-along-audiobooks` and `/audiobook-with-text` are product answer pages ("what is the best way to read along", "how can I get an audiobook with text"). The new post answers whether reading along is worth doing, which is a different question. Each answer page already has 4 curated `RELATED` links. If you later want the post on `/read-along-audiobooks`, the label would be:

```js
  '/blog/does-reading-along-with-an-audiobook-help': 'Does reading along with an audiobook help?'
```

## 2. Contextual links from existing posts (3)

### a) `content/blog/does-listening-to-audiobooks-count-as-reading.md`, section "Can you read and listen at the same time?"

Old:

```
If you'd like to try it, there's a fuller guide to [immersive reading](/blog/what-is-immersive-reading).
```

New:

```
If you'd like to try it, there's a fuller guide to [immersive reading](/blog/what-is-immersive-reading). For when reading along helps and when it gets in the way, see [does reading along with an audiobook help](/blog/does-reading-along-with-an-audiobook-help).
```

### b) `content/blog/what-is-immersive-reading.md`, section "Does it help with attention?"

Old:

```
You might find it distracting. Give yourself permission to turn one off.
```

New:

```
You might find it distracting. Give yourself permission to turn one off. We go through [what the research says about reading along](/blog/does-reading-along-with-an-audiobook-help) in a separate guide.
```

### c) `content/blog/how-to-retain-information-from-audiobooks.md`, section "3. Read along when the book is dense"

Old:

```
something for your eyes to do, and a way to see exactly where you are.
```

New:

```
something for your eyes to do, and a way to see exactly where you are. We look at [when reading along helps and when it gets in the way](/blog/does-reading-along-with-an-audiobook-help) in more detail.
```

### Optional, not applied: `content/blog/can-you-read-along-with-audible.md`, section "Is reading along worth it?"

That page has the largest impression pool on the site, and weekly plan action 1 edits it anyway. A natural link would be:

```
It depends on the reader. [What the research says about reading along](/blog/does-reading-along-with-an-audiobook-help) comes down to the book, your reading speed and your attention.
```

Left out to keep this change to three link-only edits.

## 3. llms.txt

Add the line in `llms-line.txt` directly below the `[HushBook blog]` line (line 39), above the current newest post ("Are Audiobooks Good for Kids?"). Use CRLF like the surrounding lines.

Note for whoever commits: `llms.txt` already has mixed line endings from the kids post (`\r\r\n` after the `[HushBook blog]` line, and a bare `\n` after the kids line), and git tracks it as `-text`. This change does not touch that; normalizing the file to CRLF or LF is a separate one-line cleanup if wanted.

## 4. After publishing

- `npm run build:blog`, then all 9 `*.test.js` (expected: 7 pass; `seo-preservation` and `seo-repair-contract` fail on the old baseline).
- Check the rendered page: no markdown leaks, FAQPage + BlogPosting + BreadcrumbList present.
- After deploy: `node scripts/indexnow-ping.js https://hushbook.app/blog/does-reading-along-with-an-audiobook-help` (full URL), then Request indexing in Search Console.
