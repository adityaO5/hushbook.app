"""Review fixes, 2026-11-12: Joseph glossary counts, narrator by chapter, quote checks.

Reuses wh-wordcount.py (same folder): its dialect lexicon, the 42 hand-labelled Joseph
speeches and the 16 narrator hand-over anchors. Nothing here changes those counts.

Usage (isolated mode; the text file and the saved web page sit in their own folders):
    python -I wh-review-fixes.py <pg768.txt> [<josephs-speech.html>]

1. Joseph's speeches rebuilt exactly as in wh-wordcount.py (check: 42 speeches, 1,814 words).
2. How often each common Yorkshire form occurs in those speeches (glossary table).
3. Who narrates each chapter: the narrator at each chapter's first and last word, and the
   words each narrator voices in it, from the 16 anchors.
4. Every quote the post uses for the no-spoilers family tree, the chapter-by-chapter table and
   Hareton's birth, located in the text with its chapter.
5. Optional: how many of the 42 speeches appear on wuthering-heights.co.uk's "Joseph's Speech"
   page (fetched 2026-11-12), matched on the first 25 letters of each speech.
"""
import html
import importlib.util
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("whwc", os.path.join(HERE, "wh-wordcount.py"))
W = importlib.util.module_from_spec(spec)
spec.loader.exec_module(W)

# Glossary forms: label -> regex on Joseph's speech text (curly apostrophes normalised to ').
# Meanings are checked against wuthering-heights.co.uk ("Joseph's Speech" translations and the
# Glossary page, both read 2026-11-12) and the narration around each line.
FORMS = [
    ("t'", "the", r"(?<![a-z'])t'(?=\s|[a-z])"),
    ("th'", "the", r"(?<![a-z'])th'"),
    ("i'", "in", r"(?<![a-z'])i'(?=\s)"),
    ("o'", "of", r"(?<![a-z'])o'(?!er)"),
    ("wi'", "with", r"(?<![a-z'])wi'"),
    ("maister", "master", r"\bmaister"),
    ("yah", "you", r"\byah\b"),
    ("ye", "you", r"\bye\b"),
    ("shoo", "she", r"\bshoo\b"),
    ("mun", "must", r"\bmun\b"),
    ("hev", "have", r"\bhev\b"),
    ("nowt", "nothing; a good-for-nothing", r"\bnowt\b"),
    ("owt", "anything", r"\bowt\b"),
    ("nobbut", "only, nobody but", r"\bnobbut\b"),
    ("noan", "not, none", r"\bnoan\b"),
    ("sud", "should, would", r"\bsud"),
    ("soa", "so", r"\bsoa\b"),
    ("thear", "there", r"\bthear\b"),
    ("gooid", "good", r"\bgooid"),
    ("raight", "right", r"\braight\b"),
    ("neeght", "night", r"\bneeght\b"),
    # "un" after an apostrophe is "'un" (one), as in "a rare 'un"; "un'" is still "and"
    ("un, und", "and", r"(?<!')\bun[d]?\b"),
    ("divil", "devil", r"\bdivil\b"),
    ("flaysome", "frightening", r"\bflaysome\b"),
    ("naught", "nothing", r"\bnaught\b"),
    ("wer", "were, our", r"\bwer\b"),
    ("goa", "go", r"\bgoa\b"),
    ("noa", "no", r"\bnoa\b"),
    ("hahse", "house", r"\bhahse\b"),
    ("lugs", "ears", r"\blugs\b"),
]

QUOTES = [
    "Heathcliff married Mr. Linton’s sister",
    "her husband was her cousin also: one on the mother’s, the other on the father’s side",
    "the late Mrs. Linton’s nephew",
    "Catherine Linton was her maiden name",
    "her mate is dead",
    "Frances",
    "Mr. Hindley Earnshaw, that was Hareton’s father",
    "He had a son, it seems?",
    "my late master’s daughter",
    "Mrs. Heathcliff is my daughter-in-law",
    "the summer of 1778",
    "the last of the ancient Earnshaw stock, was born",
    "1802.—This September",
    "Edgar",
    "Isabella",
    "Mr. and Mrs. Linton",
    "DEAR ELLEN",
]


def chapters_of(novel):
    """Start offset of each chapter in `novel` (raw text from CHAPTER I)."""
    return [m.start() for m in W.CHAPTER_HEAD.finditer(novel)]


def chap_at(starts, i):
    n = 0
    for k, s in enumerate(starts):
        if s <= i:
            n = k + 1
    return n


def joseph_speeches(novel):
    paras = re.split(r"\n\s*\n", novel)
    chap_no = 0
    cands = []
    for pi, p in enumerate(paras):
        if W.CHAPTER_HEAD.match(p.strip()):
            chap_no += 1
            continue
        flat = " ".join(p.split())
        if not flat:
            continue
        for sp in W.quote_spans(flat):
            s = sp[1] if isinstance(sp, tuple) else sp
            toks, hits = W.dialect_tokens(s)
            if len(toks) < 2 or len(hits) < 2 or len(hits) / len(toks) < 0.08:
                continue
            who = W.LABELS.get((chap_no, s[:20]), "?")
            cands.append((chap_no, pi, len(toks), len(hits), who, s))
    flat_novel = " ".join(novel.split())
    extra = []
    for ch, s in W.JOSEPH_EXTRA:
        if s not in flat_novel:
            sys.exit("JOSEPH_EXTRA not found: " + s[:60])
        toks, hits = W.dialect_tokens(s)
        pi = next(i for i, p in enumerate(paras) if s[:30] in " ".join(p.split()))
        extra.append((ch, pi, len(toks), len(hits), "Joseph", s))
    jos = [c for c in cands if c[4].startswith("Joseph")] + extra
    jos.sort(key=lambda c: (c[0], c[1]))
    return jos


def main(path, page=None):
    sys.stdout.reconfigure(encoding="utf-8")
    text = open(path, encoding="utf-8").read()
    start = re.search(r"^\*\*\* ?START OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M)
    end = re.search(r"^\*\*\* ?END OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M)
    body = text[start.end():end.start()]
    m = re.search(r"^CHAPTER I\s*$", body, re.M)
    novel = body[m.start():]

    # 1. Joseph
    jos = joseph_speeches(novel)
    turns = sorted({(c[0], c[1]) for c in jos})
    words = sum(c[2] for c in jos)
    by = {}
    for c in jos:
        by[c[0]] = by.get(c[0], 0) + c[2]
    print(f"1. Joseph: {len(turns)} speeches, {len(jos)} spans, {words:,} words; by chapter {by}")

    # 2. Glossary counts
    speech = " ".join(" ".join(c[5].split()) for c in jos).lower().replace("’", "'").replace("‘", "'")
    print("\n2. Forms in Joseph's speeches (count; speeches containing it):")
    rows = []
    for form, meaning, pat in FORMS:
        n = len(re.findall(pat, speech))
        sp_n = 0
        for t in turns:
            s = " ".join(" ".join(c[5].split()) for c in jos if (c[0], c[1]) == t).lower().replace("’", "'")
            if re.search(pat, s):
                sp_n += 1
        rows.append((n, form, meaning, sp_n))
    for n, form, meaning, sp_n in sorted(rows, reverse=True):
        print(f"  {form:<9} {meaning:<30} {n:>4}  in {sp_n} speeches")

    # 3. Narrator by chapter
    clean_novel = novel  # anchors are searched in the raw novel text so chapter offsets line up
    starts = chapters_of(clean_novel)
    pos = []
    for anchor, who in W.SWITCHES:
        i = clean_novel.find(anchor)
        if i < 0:
            # some anchors span a line break in the raw file
            flat_pat = r"\s+".join(map(re.escape, anchor.split()))
            mm = re.search(flat_pat, clean_novel)
            if not mm:
                sys.exit("anchor not found: " + anchor)
            i = mm.start()
        pos.append((i, who, anchor))
    pos.sort()
    segs = [(0, "Lockwood", "(opening)")] + pos
    print("\n3. Hand-overs (chapter: new narrator, from):")
    for i, who, anchor in pos:
        print(f"  ch {chap_at(starts, i):>2}: {who:<18} {anchor[:70]}")
    print("\n   Per chapter: narrator at first word / at last word; words by narrator")
    bounds = starts + [len(clean_novel)]
    for k in range(len(starts)):
        a, b = bounds[k], bounds[k + 1]
        share = {}
        for j, (i, who, anchor) in enumerate(segs):
            nxt = segs[j + 1][0] if j + 1 < len(segs) else len(clean_novel)
            lo, hi = max(a, i), min(b, nxt)
            if hi > lo:
                n = len(W.words(W.BREAK.sub("", W.CHAPTER_HEAD.sub("", clean_novel[lo:hi]))))
                if n:
                    share[who] = share.get(who, 0) + n
        first = next(who for i, who, _ in reversed(segs) if i <= a + 20)
        last = next(who for i, who, _ in reversed(segs) if i < b - 5)
        print(f"  ch {k + 1:>2}: opens {first:<18} closes {last:<18} {share}")

    # 4. Quotes
    flat = " ".join(clean_novel.split())
    fstarts = [mm.start() for mm in re.finditer(r"CHAPTER [IVXLC]+ ", flat)]
    print("\n4. Quotes (first chapter found, number of hits):")
    for q in QUOTES:
        hits = [mm.start() for mm in re.finditer(re.escape(q), flat)]
        chs = sorted({chap_at(fstarts, h) for h in hits})
        print(f"  {q[:70]!r}: chapters {chs[:12]}, {len(hits)} hits")
    # Chapter 7 end and Chapter 8 start (Hareton's birth)
    for k in (7, 8, 30, 31, 32):
        a = fstarts[k - 1]
        b = fstarts[k] if k < len(fstarts) else len(flat)
        print(f"\n  ch {k} opens: {flat[a:a + 260]}")
        print(f"  ch {k} closes: {flat[b - 420:b]}")

    # 5. The fan site's coverage
    if page:
        t = open(page, encoding="utf-8", errors="replace").read()
        t = html.unescape(re.sub(r"<[^>]+>", " ", t))
        key = lambda s: re.sub(r"[^a-z]", "", s.lower().replace("’", "'"))[:25]
        site = re.sub(r"[^a-z]", "", t.lower().replace("’", "'"))
        found = 0
        missing = []
        for t_ in turns:
            s = " ".join(" ".join(c[5].split()) for c in jos if (c[0], c[1]) == t_)
            if key(s) in site:
                found += 1
            else:
                missing.append((t_[0], s[:70]))
        print(f"\n5. Speeches on the fan site's page: {found} of {len(turns)}")
        for ch, s in missing:
            print(f"   not matched: ch {ch}: {s}")


if __name__ == "__main__":
    if len(sys.argv) not in (2, 3):
        sys.exit("usage: python -I wh-review-fixes.py <pg768.txt> [<josephs-speech.html>]")
    main(*sys.argv[1:])
