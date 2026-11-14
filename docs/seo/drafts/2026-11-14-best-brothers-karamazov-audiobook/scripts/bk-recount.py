"""Independent recount of the key Karamazov figures from a different file and a different parser.
New 2026-11-14 (lesson of the 2026-11-12 review: recount key figures by a second method before reporting them).

bk-wordcount.py reads the plain-text eBook #28054 with line regexes. This script reads the HTML edition of the same
eBook (pg28054-images.html, downloaded separately), walks it with html.parser, starts a chapter at each <h2> whose text
begins "Chapter", keeps only <p> text (headings, the contents table and the footnote section are skipped; footnote
markers [n] removed), and counts with its own tokenizer (same rule: split on whitespace, "--" and em dashes; keep tokens
with a letter or digit). Single-word names are counted as whole tokens after stripping punctuation and a final
possessive "'s"/"’s", which is a different method from bk-wordcount.py's regex.

Usage: python -I bk-recount.py <pg28054-images.html>
"""
import re
import sys
from collections import Counter
from html.parser import HTMLParser

NAMES = ["Mitya", "Dmitri", "Alyosha", "Alexey", "Ivan", "Smerdyakov", "Grushenka", "Grusha", "Agrafena", "Katya",
         "Katerina", "Zossima", "Kolya", "Ilusha", "Rakitin", "Lise", "Fyodor", "Karamazov", "Inquisitor"]


class Walker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.chapters = []  # [title, [paragraph texts]]
        self.in_h2 = False
        self.h2 = ""
        self.in_p = False
        self.p = ""
        self.stop = False
        self.skip_depth = 0

    def handle_starttag(self, tag, attrs):
        if self.stop:
            return
        if tag == "h2":
            self.in_h2, self.h2 = True, ""
        elif tag == "p":
            self.in_p, self.p = True, ""
        elif tag == "br" and self.in_h2:
            self.h2 += " | "

    def handle_endtag(self, tag):
        if self.stop:
            return
        if tag == "h2" and self.in_h2:
            self.in_h2 = False
            t = " ".join(self.h2.split())
            if t.upper().startswith("FOOTNOTES"):
                self.stop = True
            elif t.startswith("Chapter"):
                self.chapters.append([t, []])
            elif re.match(r"^(PART|Book|EPILOGUE)", t):
                pass  # part and book headings: not chapter text
        elif tag == "p" and self.in_p:
            self.in_p = False
            t = " ".join(self.p.split())
            if self.chapters and t and t != "THE END":
                self.chapters[-1][1].append(t)

    def handle_data(self, data):
        if self.in_h2:
            self.h2 += data
        elif self.in_p:
            self.p += data


def tokens(text):
    out = []
    for raw in re.split(r"\s+", text):
        for piece in re.split(r"--|—", raw):
            if re.search(r"[A-Za-z0-9À-ɏ]", piece):
                out.append(piece)
    return out


def main(path):
    sys.stdout.reconfigure(encoding="utf-8")
    w = Walker()
    w.feed(open(path, encoding="utf-8").read())
    chs = w.chapters
    texts = [re.sub(r"\[\d+\]", "", " ".join(ps)) for _, ps in chs]
    counts = [len(tokens(t)) for t in texts]
    total = sum(counts)
    print("chapters:", len(chs))
    print("words (HTML, <p> only):", f"{total:,}")
    gi = [i for i, (h, _) in enumerate(chs) if "Grand Inquisitor" in h][0]
    print(f"Grand Inquisitor: chapter #{gi + 1}, {counts[gi]:,} words, starts after {sum(counts[:gi]):,} words ({sum(counts[:gi]) / total:.1%})")
    longest = max(range(len(counts)), key=lambda i: counts[i])
    print("longest chapter:", chs[longest][0], counts[longest])
    zos = [i for i, (h, _) in enumerate(chs) if any(k in h for k in ("Father Zossima And His Visitors", "The Duel", "Conversations And Exhortations"))]
    print("Book VI (3 chapters):", [chs[i][0] for i in zos], sum(counts[i] for i in zos))
    toks = Counter()
    for t in texts:
        for tok in tokens(t):
            k = re.sub(r"(’s|'s)$", "", tok.strip("“”‘’\"'.,;:!?()_*"))
            toks[k] += 1
    print("names (whole tokens):", ", ".join(f"{n} {toks[n]}" for n in NAMES))


if __name__ == "__main__":
    main(sys.argv[1])
