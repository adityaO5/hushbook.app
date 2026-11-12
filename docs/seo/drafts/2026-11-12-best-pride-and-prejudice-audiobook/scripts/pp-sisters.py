"""Name-form counts for Mary and Lydia Bennet, and the birth-order lines for the five
Bennet sisters, in Project Gutenberg eBook #1342 (Pride and Prejudice).

Added 2026-11-12 (review fixes). Adapted from pp-wordcount.py: the same chapter extraction
(CHAPTER I to "the means of uniting them.", illustration captions and chapter headings
removed) and the same whole-word, case-sensitive count() as the names table, so the new
table rows are comparable with the existing ones. Re-checks two existing rows (Kitty 71,
Catherine without "Lady" 10) as a guard that the method matches.

Usage (isolated mode, text file in its own folder):
    python -I pp-sisters.py <path-to-pg1342.txt>
"""
import hashlib
import re
import sys

CHAPTER_HEAD = re.compile(r"^(?:CHAPTER|Chapter) ([IVXLC]+)\.?\]?[ \t]*$", re.M)
ILLUS = re.compile(r"\[Illustration[^\]]*\]", re.S)

# label, pattern (whole words, case-sensitive; a space matches any whitespace)
FORMS = [
    ("Kitty (guard: table says 71)", r"Kitty"),
    ("Mary (all)", r"Mary"),
    ("Mary King (a different person)", r"Mary King"),
    ("Miss Mary", r"Miss Mary"),
    ("Mary Bennet", r"Mary Bennet"),
    ("Lydia (all)", r"Lydia"),
    ("Miss Lydia", r"Miss Lydia"),
    ("Lydia Bennet", r"Lydia Bennet"),
    ("Miss Lydia Bennet", r"Miss Lydia Bennet"),
]
ORDER_LINES = [
    ("Jane is the eldest", r"her eldest daughter much admired"),
    ("Elizabeth is second", r"equally next to Jane in birth"),
    ("Catherine and Lydia are the two youngest", r"The two youngest of the family, Catherine and Lydia"),
    ("Lydia is the youngest", r"though I _am_ the youngest"),
]


def roman(s):
    vals = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100}
    total = 0
    for i, ch in enumerate(s):
        v = vals[ch]
        total += -v if i + 1 < len(s) and vals[s[i + 1]] > v else v
    return total


def count(pat, text):
    pat2 = pat.replace(" ", r"\s+")
    return len(re.findall(r"(?<![\wÀ-ÿ])(?:" + pat2 + r")(?![\wÀ-ÿ])", text))


def main(path):
    sys.stdout.reconfigure(encoding="utf-8")
    raw = open(path, "rb").read()
    print("SHA-256:", hashlib.sha256(raw).hexdigest())
    text = raw.decode("utf-8").replace("\r\n", "\n")
    start = re.search(r"^\*\*\* ?START OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M)
    end = re.search(r"^\*\*\* ?END OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M)
    body = text[start.end():end.start()]
    heads = list(CHAPTER_HEAD.finditer(body))
    last_line = body.index("the means of uniting them.") + len("the means of uniting them.")
    chapters = []
    for i, h in enumerate(heads):
        seg = body[h.end():heads[i + 1].start() if i + 1 < len(heads) else last_line]
        seg = ILLUS.sub(" ", seg)
        seg = re.sub(r"\[Illustration[^\]]*$", " ", seg, flags=re.S)
        seg = seg.replace("]", " ").replace("_", "")
        chapters.append((roman(h.group(1)), seg))
    assert [n for n, _ in chapters] == list(range(1, 62))
    story = "\n\n".join(s for _, s in chapters)

    print("\nForms (novel text, whole words):")
    for label, pat in FORMS:
        print(f"  {label}: {count(pat, story)}")
    cath = sum(len(re.findall(r"(?<!Lady)(?<!Lady\s)\bCatherine\b", " ".join(s.split()))) for _, s in chapters)
    print(f"  Catherine without 'Lady' before it (guard: table says 10): {cath}")
    mary_bennet = count(r"Mary", story) - count(r"Mary King", story)
    print(f"  Mary, not counting 'Mary King' (= Mary Bennet): {mary_bennet}")
    print("  first chapter naming Mary:", next(n for n, s in chapters if count(r"Mary", s)))
    print("  first chapter naming Lydia:", next(n for n, s in chapters if count(r"Lydia", s)))

    print("\nBirth order (raw chapter text, underscores kept):")
    for label, needle in ORDER_LINES:
        hits = []
        for i, h in enumerate(heads):
            seg = body[h.end():heads[i + 1].start() if i + 1 < len(heads) else last_line]
            flat = " ".join(seg.split())
            k = flat.find(needle)
            if k >= 0:
                hits.append((roman(h.group(1)), flat[max(0, k - 60):k + len(needle) + 60]))
        for n, ctx in hits:
            print(f"  {label}: Ch. {n}: …{ctx}…")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: python -I pp-sisters.py <pg1342.txt>")
    main(sys.argv[1])
