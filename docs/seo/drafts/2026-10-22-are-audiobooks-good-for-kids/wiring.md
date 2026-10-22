# Wiring for /blog/are-audiobooks-good-for-kids

Apply after adding `content/blog/are-audiobooks-good-for-kids.md` (copy of `post.md`) and the registry entry. These are link-only edits to existing posts: no `dateModified` bump.

## 1. Answer pages (`scripts/build-answer-pages.js`): no change recommended

No answer page targets children or parents. The closest are `/read-along-audiobooks` and `/audiobook-app-for-dyslexia`, and each already has 4 curated `RELATED` links that match its own query better. Do not touch `LABELS` or `RELATED` unless you decide otherwise. If you later want the kids post on `/audiobook-app-for-dyslexia`, the label to add would be:

```js
  '/blog/are-audiobooks-good-for-kids': 'Are audiobooks good for kids?'
```

## 2. Contextual links from existing posts (3)

### a) `content/blog/are-audiobooks-good-for-dyslexia.md`, section "Audiobooks for kids with dyslexia"

Old:

```
For children who are still learning to read, audiobooks belong next to reading lessons, not in place of them. Understood.org puts it simply:
```

New:

```
For children who are still learning to read, audiobooks belong next to reading lessons, not in place of them, and that holds for [all young readers](/blog/are-audiobooks-good-for-kids), not only those with dyslexia. Understood.org puts it simply:
```

### b) `content/blog/are-audiobooks-good-for-adhd.md`, section "Are audiobooks good for kids with ADHD?"

Old:

```
Talk to your child's school about read-aloud accommodations if reading tests are a struggle.
```

New:

```
Talk to your child's school about read-aloud accommodations if reading tests are a struggle. For what the research says about audiobooks and children in general, see [are audiobooks good for kids](/blog/are-audiobooks-good-for-kids).
```

### c) `content/blog/does-listening-to-audiobooks-count-as-reading.md`, section "Is listening to an audiobook cheating?"

Old:

```
There's one sensible exception. If a teacher has set a book to practise reading skills, ask before switching to audio, because the skill is the point of that assignment. Otherwise, count it. Put it on your Goodreads shelf.
```

New:

```
There's one sensible exception. If a teacher has set a book to practise reading skills, ask before switching to audio, because the skill is the point of that assignment. Otherwise, count it. Put it on your Goodreads shelf. If you're asking for a child, we cover the research on [audiobooks for kids](/blog/are-audiobooks-good-for-kids) separately.
```

## 3. llms.txt

Add the line in `llms-line.txt` directly below the `[HushBook blog]` line (line 39), above the current newest post ("How to Retain Information From Audiobooks").

## 4. After publishing

- `npm run build:blog`, run all 9 `*.test.js` (expected: 7 pass; `seo-preservation` and `seo-repair-contract` fail on the old baseline).
- Check the rendered page: no markdown leaks, FAQPage + BlogPosting + BreadcrumbList present.
- After deploy: `node scripts/indexnow-ping.js https://hushbook.app/blog/are-audiobooks-good-for-kids` (full URL), then Request indexing in Search Console.
