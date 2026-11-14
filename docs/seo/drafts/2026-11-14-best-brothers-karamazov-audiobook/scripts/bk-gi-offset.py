"""Second-method check of where "The Grand Inquisitor" starts, in words, in Gutenberg #28054 (Garnett).
New 2026-11-14 (wiring recount). Does not import bk-wordcount.py: own heading strip and own tokenizer
(split on whitespace, "--" and em dashes; keep tokens with any letter or digit, str.isalnum).

Usage: python -I bk-gi-offset.py <pg28054.txt>
Prints the novel total, the word offset before Book V Chapter 5, that chapter's length, and a few
variants (footnote markers kept, book headings counted) so a published offset can be traced.
"""
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")
text = open(sys.argv[1], "rb").read().decode("utf-8").replace("\r\n", "\n")
a = re.search(r"^\*\*\* ?START OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M).end()
b = re.search(r"^\*\*\* ?END OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M).start()
body = text[a:b]
novel = body[re.search(r"^PART I[ \t]*$", body, re.M).start():re.search(r"^THE END[ \t]*$", body, re.M).start()]
lines = novel.split("\n")


def toks(s):
    return [t for t in re.sub(r"--|—", " ", s).split() if any(ch.isalnum() for ch in t)]


def strip(lines_in, keep_marks=False, keep_books=False):
    out, skip_next = [], False
    for ln in lines_in:
        st = ln.strip()
        if skip_next:
            skip_next = False
            continue
        if re.fullmatch(r"PART (I|II|III|IV)|EPILOGUE", st):
            continue
        if re.fullmatch(r"Book [IVXL]+\. .+", st):
            if keep_books:
                out.append(st)
            continue
        if re.fullmatch(r"Chapter [IVXL]+\.", st):
            skip_next = True
            continue
        out.append(ln if keep_marks else re.sub(r"\[\d+\]", "", ln))
    return "\n".join(out)


# Locate Book V, then its Chapter V heading.
book5 = next(i for i, ln in enumerate(lines) if ln.strip() == "Book V. Pro And Contra")
gi = next(i for i in range(book5, len(lines) - 1)
          if lines[i].strip() == "Chapter V." and lines[i + 1].strip() == "The Grand Inquisitor")
nxt = next(i for i in range(gi + 2, len(lines)) if re.fullmatch(r"Chapter [IVXL]+\.", lines[i].strip()))
total = len(toks(strip(lines)))
before = len(toks(strip(lines[:gi])))
chapter = len(toks(strip(lines[gi:nxt])))
print(f"novel words (headings and [n] markers removed): {total:,}")
print(f"words before Book V, Chapter 5 heading: {before:,} ({before / total:.3%}; {before / 151:.1f} min at 151 wpm)")
print(f"The Grand Inquisitor chapter: {chapter:,} words")
print("variants of the offset:")
print(f"  footnote markers kept: {len(toks(strip(lines[:gi], keep_marks=True))):,}")
print(f"  book headings counted: {len(toks(strip(lines[:gi], keep_books=True))):,}")
print(f"  every heading line counted (PART, Book, Chapter n., titles): {len(toks(chr(10).join(lines[:gi]))):,}")
