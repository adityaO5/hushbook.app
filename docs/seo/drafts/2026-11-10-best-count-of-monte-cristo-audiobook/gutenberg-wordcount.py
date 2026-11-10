"""Count words in Project Gutenberg eBook #1184 (The Count of Monte Cristo).

Usage (run in isolated mode, text file in its own folder):
    python -I gutenberg-wordcount.py <path-to-pg1184.txt>

Source file: https://www.gutenberg.org/cache/epub/1184/pg1184.txt
Counts only the text between the
"*** START OF THE PROJECT GUTENBERG EBOOK" and
"*** END OF THE PROJECT GUTENBERG EBOOK" marker lines.

Reports three counts so the method is transparent:
  1. whitespace tokens (str.split), the usual "word count" a word processor gives
  2. tokens containing at least one letter or digit (drops lone punctuation such as "--")
  3. the same as 2, but excluding the table of contents block before "Chapter 1." body text
  4. the same as 3, but also splitting on em dashes, which this file uses without spaces
  5. the same as 4, minus the closing FOOTNOTES block and stray marker tokens like "0345m"
     (count 5 is the figure used for words-per-minute in research-evidence.md)
Also reports the number of chapter headings found in the body.
"""
import re
import sys


def main(path):
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    start = re.search(r"^\*\*\* ?START OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M)
    end = re.search(r"^\*\*\* ?END OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M)
    if not start or not end:
        sys.exit("START/END markers not found")
    body = text[start.end():end.start()]

    tokens = body.split()
    wordlike = [t for t in tokens if re.search(r"[A-Za-z0-9À-ɏ]", t)]

    # Body text starts at the second occurrence of the "Chapter 1." heading
    # (the first occurrence is the table of contents). In the 2026 edition of
    # the file, body headings are indented by one space; TOC lines are not.
    heading = r"^[ \t]*Chapter (\d+)\. (.+)$"
    heads = [m.start() for m in re.finditer(r"^[ \t]*Chapter 1\. ", body, re.M)]
    if len(heads) >= 2:
        narrative = body[heads[1]:]
        toc_block = body[:heads[1]]
    else:
        narrative = body
        toc_block = ""
    narrative_wordlike = [t for t in narrative.split() if re.search(r"[A-Za-z0-9À-ɏ]", t)]

    # Em dashes in this file join words without spaces ("Marseilles—The"),
    # so count 4 also splits on em dashes.
    narrative_dash_split = [
        t for t in re.split(r"[\s—]+", narrative) if re.search(r"[A-Za-z0-9À-ɏ]", t)
    ]

    # Count 5: the novel's own words only. Drops the FOOTNOTES block at the end
    # and the stray source-edition marker tokens such as "0345m" that sit on
    # lines of their own in this file.
    fn = re.search(r"^FOOTNOTES:\s*$", narrative, re.M)
    story = narrative[:fn.start()] if fn else narrative
    marker_tokens = re.findall(r"^\d+m$", story, re.M)
    story_words = [
        t for t in re.split(r"[\s—]+", story)
        if re.search(r"[A-Za-z0-9À-ɏ]", t) and not re.fullmatch(r"\d+m", t)
    ]

    chapter_heads = re.findall(heading, narrative, re.M)
    toc_entries = re.findall(heading, toc_block, re.M)

    print("file:", path)
    print("characters between markers:", len(body))
    print("1. whitespace tokens between markers:", len(tokens))
    print("2. tokens with a letter/digit between markers:", len(wordlike))
    print("3. tokens with a letter/digit from first chapter heading to END marker:", len(narrative_wordlike))
    print("4. as 3, also splitting on em dashes:", len(narrative_dash_split))
    print("5. as 4, without the FOOTNOTES block and marker tokens:", len(story_words))
    print("   marker tokens removed:", len(marker_tokens), "| footnotes block found:", bool(fn))
    print("table of contents entries:", len(toc_entries))
    print("chapter headings in body:", len(chapter_heads))
    if chapter_heads:
        print("first heading:", chapter_heads[0])
        print("last heading:", chapter_heads[-1])


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: python -I gutenberg-wordcount.py <pg1184.txt>")
    main(sys.argv[1])
