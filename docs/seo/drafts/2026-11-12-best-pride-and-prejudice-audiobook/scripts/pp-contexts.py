"""Print every occurrence of a name form in Pride and Prejudice (Gutenberg #1342) with its
chapter number and context, so each can be assigned to a person by hand.

Usage (isolated mode): python -I pp-contexts.py <pg1342.txt> "Miss Bennet(?!s)" [width]
Run 2026-11-12 for the forms-of-address table in research-platforms.md (section 3).
"""
import re
import sys

CHAPTER_HEAD = re.compile(r"^(?:CHAPTER|Chapter) ([IVXLC]+)\.?\]?[ \t]*$", re.M)


def roman(s):
    vals = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100}
    total = 0
    for i, ch in enumerate(s):
        v = vals[ch]
        total += -v if i + 1 < len(s) and vals[s[i + 1]] > v else v
    return total


def main(path, pat, width):
    sys.stdout.reconfigure(encoding="utf-8")
    text = open(path, encoding="utf-8").read().replace("\r\n", "\n")
    heads = list(CHAPTER_HEAD.finditer(text))
    end = text.index("the means of uniting them.")
    rx = re.compile(r"(?<![\w])" + pat.replace(" ", r"\s+") + r"(?![\w])")
    n = 0
    for i, h in enumerate(heads):
        seg = text[h.end():heads[i + 1].start() if i + 1 < len(heads) else end]
        seg = " ".join(re.sub(r"\[Illustration[^\]]*\]", " ", seg, flags=re.S).split())
        for m in rx.finditer(seg):
            n += 1
            a = max(0, m.start() - width)
            print(f"Ch. {roman(h.group(1))}: …{seg[a:m.end() + width // 2]}…")
    print("total", n)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 110)
