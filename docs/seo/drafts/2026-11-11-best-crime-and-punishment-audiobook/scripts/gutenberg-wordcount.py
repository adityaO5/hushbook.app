"""Count words in Project Gutenberg eBook #2554 (Crime and Punishment, tr. Constance Garnett).

Usage (run in isolated mode, text file in its own folder):
    python -I gutenberg-wordcount.py <path-to-pg2554.txt>

Source file: https://www.gutenberg.org/cache/epub/2554/pg2554.txt
(downloaded 2026-11-11, "Most recently updated: October 16, 2026",
SHA-256 4a84a709a6e355f5fa555c7276c8a90125eb9d06f63bc8663410c3d1297eb688)

Only the text between the "*** START OF THE PROJECT GUTENBERG EBOOK" and
"*** END OF THE PROJECT GUTENBERG EBOOK" marker lines is used.

Counts reported, so the method is transparent:
  1. whitespace tokens between the markers (what a word processor shows)
  2. tokens with a letter or digit between the markers (drops lone "--" etc.)
  3. novel only: from the body heading "PART I" to the END marker, i.e. without the
     title block, the contents list and Garnett's 1914 TRANSLATOR'S PREFACE;
     tokens with a letter or digit
  4. as 3, also splitting words joined by "--" or an em dash (this file writes
     "happy--and" with no spaces)
  5. as 4, without the three translator's footnotes ("[*] ... --TRANSLATOR'S NOTE.")
     and the "[*]" markers, and without the PART / CHAPTER / EPILOGUE heading words
     (count 5 is the figure used in research-evidence.md)
Also: words per part and per chapter, chapter-length statistics, listening time at
151 and 155 words a minute at 1x, 1.25x and 1.5x, the words a minute implied by the
four LibriVox runtimes, and name-form counts on the novel text only.
"""
import re
import statistics
import sys

WORD = re.compile(r"[A-Za-z0-9À-ɏ]")
SPLIT = re.compile(r"(?:\s|--|—)+")

# LibriVox runtimes (all read Gutenberg's Garnett text); from the LibriVox API
# `totaltime` field, re-read 2026-11-11.
LIBRIVOX = {
    "Version 1 (id 755, 14 readers)": "23:26:07",
    "Version 2 (id 10091, solo, Expatriate)": "19:52:38",
    "Version 3 (id 12129, solo, Mark Nelson)": "22:02:11",
    "Version 4 Dramatic Reading (id 10008, 49 readers)": "21:19:44",
}

# Name forms as Garnett spells them. Patterns are counted as whole words.
NAMES = [
    ("Raskolnikov", r"Raskolnikov"),
    ("Rodion Romanovitch", r"Rodion Romanovitch"),
    ("Rodion (any)", r"Rodion"),
    ("Rodya", r"Rodya"),
    ("Dounia", r"Dounia"),
    ("Avdotya Romanovna", r"Avdotya Romanovna"),
    ("Sonia", r"Sonia"),
    ("Sofya Semyonovna", r"Sofya Semyonovna"),
    ("Razumihin", r"Razumihin"),
    ("Vrazumihin", r"Vrazumihin"),
    ("Dmitri Prokofitch", r"Dmitri Prokofitch"),
    ("Pulcheria Alexandrovna", r"Pulcheria Alexandrovna"),
    ("Luzhin", r"Luzhin"),
    ("Pyotr Petrovitch", r"Pyotr Petrovitch"),
    ("Svidrigaïlov", r"Svidrigaïlov"),
    ("Arkady Ivanovitch", r"Arkady Ivanovitch"),
    ("Porfiry Petrovitch", r"Porfiry Petrovitch"),
    ("Porfiry (any)", r"Porfiry"),
    ("Marmeladov", r"Marmeladov"),
    ("Semyon Zaharovitch", r"Semyon Zaharovitch"),
    ("Katerina Ivanovna", r"Katerina Ivanovna"),
    ("Polenka", r"Polenka"),
    ("Alyona Ivanovna", r"Alyona Ivanovna"),
    ("Lizaveta", r"Lizaveta"),
    ("Zossimov", r"Zossimov"),
    ("Zametov", r"Zametov"),
    ("Nastasya", r"Nastasya"),
    ("Ilya Petrovitch", r"Ilya Petrovitch"),
    ("Explosive Lieutenant", r"[Ee]xplosive [Ll]ieutenant"),
    ("Nikodim Fomitch", r"Nikodim Fomitch"),
    ("Lebeziatnikov", r"Lebeziatnikov"),
    ("Andrey Semyonovitch", r"Andrey Semyonovitch"),
    ("Marfa Petrovna", r"Marfa Petrovna"),
    ("Mikolka", r"Mikolka"),
    ("Nikolay", r"Nikolay"),
    ("Amalia Ivanovna", r"Amalia Ivanovna"),
    ("Amalia Fyodorovna", r"Amalia Fyodorovna"),
    ("Amalia Ludwigovna", r"Amalia Ludwigovna"),
    ("Lippevechsel", r"Lippevechsel"),
]


def words(text):
    return [t for t in SPLIT.split(text) if WORD.search(t)]


def hms_to_min(s):
    h, m, sec = (int(x) for x in s.split(":"))
    return h * 60 + m + sec / 60


def fmt_hm(minutes):
    h = int(minutes // 60)
    m = int(round(minutes - h * 60))
    if m == 60:
        h, m = h + 1, 0
    return f"{h} h {m:02d} min"


def main(path):
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    start = re.search(r"^\*\*\* ?START OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M)
    end = re.search(r"^\*\*\* ?END OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M)
    if not start or not end:
        sys.exit("START/END markers not found")
    body = text[start.end():end.start()]

    c1 = len(body.split())
    c2 = len([t for t in body.split() if WORD.search(t)])

    # The contents list indents "PART I" by four spaces; the body heading is flush left.
    m = re.search(r"^PART I\s*$", body, re.M)
    if not m:
        sys.exit("body heading PART I not found")
    novel = body[m.start():]
    preface_and_front = body[:m.start()]
    c3 = len([t for t in novel.split() if WORD.search(t)])
    c4 = len(words(novel))

    # Translator's footnotes: a paragraph starting "[*]" and ending "TRANSLATOR'S NOTE."
    # (two of the three end that way; the third, about the time of day, is a
    # paragraph starting "[*] Dostoevsky appears to have forgotten").
    footnote_paras = re.findall(r"^\[\*\][^\n]*(?:\n(?!\n)[^\n]*)*", novel, re.M)
    story = re.sub(r"^\[\*\][^\n]*(?:\n(?!\n)[^\n]*)*", "", novel, flags=re.M)
    story = story.replace("[*]", "")
    heading_re = re.compile(r"^(PART [IVX]+|CHAPTER [IVX]+|EPILOGUE|[IVX]+)\s*$", re.M)
    story_no_heads = heading_re.sub("", story)
    c5 = len(words(story_no_heads))

    print("file:", path)
    print("characters between markers:", len(body))
    print("1. whitespace tokens between markers:", c1)
    print("2. tokens with a letter/digit between markers:", c2)
    print("   front matter + translator's preface (tokens with a letter/digit):",
          len(words(preface_and_front)))
    print("3. novel only (PART I heading to END marker), tokens with a letter/digit:", c3)
    print("4. as 3, also splitting on '--' and em dashes:", c4)
    print("5. as 4, without translator's footnotes and heading words:", c5)
    print("   footnote paragraphs removed:", len(footnote_paras))

    # Structure: split the story at PART / EPILOGUE headings, then at chapter headings.
    parts = re.split(r"^(PART [IVX]+|EPILOGUE)\s*$", story, flags=re.M)
    # parts = [preamble, name1, text1, name2, text2, ...]
    print("\nStructure (novel text, footnotes removed):")
    chapter_counts = []
    total_chapters = 0
    for i in range(1, len(parts), 2):
        name, ptext = parts[i], parts[i + 1]
        if name == "EPILOGUE":
            chaps = re.split(r"^[IVX]+\s*$", ptext, flags=re.M)[1:]
        else:
            chaps = re.split(r"^CHAPTER [IVX]+\s*$", ptext, flags=re.M)[1:]
        counts = [len(words(c)) for c in chaps]
        chapter_counts.extend((name, j + 1, n) for j, n in enumerate(counts))
        total_chapters += len(counts)
        print(f"  {name}: {len(counts)} chapters, {sum(counts):,} words")
    print("  total chapters incl. the two epilogue chapters:", total_chapters)
    ns = [n for _, _, n in chapter_counts]
    print("  sum of chapter words:", f"{sum(ns):,}")
    print("  chapter length: mean", round(statistics.mean(ns)), "median",
          round(statistics.median(ns)), "min", min(ns), "max", max(ns))
    shortest = min(chapter_counts, key=lambda x: x[2])
    longest = max(chapter_counts, key=lambda x: x[2])
    print("  shortest:", shortest, "longest:", longest)
    for name, j, n in chapter_counts:
        print(f"    {name} ch {j}: {n:,}")

    print("\nListening time for count 5 =", f"{c5:,}", "words:")
    for label, wpm in (("151 wpm (site median, LibriVox solo readers)", 151),
                       ("155 wpm (ACX 9,300 words an hour)", 9300 / 60)):
        for speed in (1, 1.25, 1.5):
            mins = c5 / wpm / speed
            print(f"  {label} at {speed}x: {mins:,.1f} min = {fmt_hm(mins)}")
    print("  days to finish at 151 wpm (rounded up to whole days):")
    for speed in (1, 1.25, 1.5):
        mins = c5 / 151 / speed
        cells = ", ".join(f"{per} min a day: {-(-mins // per):.0f} days" for per in (30, 60, 90))
        print(f"    {speed}x ({mins:,.1f} min): {cells}")
    print("  at 1x, mean chapter at 151 wpm:", round(statistics.mean(ns) / 151, 1), "min")
    print("  at 1x, median chapter at 151 wpm:", round(statistics.median(ns) / 151, 1), "min")

    print("\nWords a minute implied by LibriVox runtimes (count 5 / runtime):")
    for label, rt in LIBRIVOX.items():
        mins = hms_to_min(rt)
        print(f"  {label}: {rt} = {mins:,.2f} min -> {c5 / mins:.1f} wpm")

    # Dialogue share: words inside curly double quotes. A quotation that runs over
    # several paragraphs reopens with an opening quote mark and closes only at its
    # end, so the inside/outside state is reset at every paragraph break, and a
    # paragraph that opens with a quote mark right after an unclosed paragraph is
    # counted as the same speech (for the longest-speech figure).
    paras = [p for p in re.split(r"\n\s*\n", story_no_heads) if p.strip()]
    inside_words = 0
    runs = []  # (words, first paragraph index)
    run_words, run_start, prev_open = 0, None, False
    for idx, p in enumerate(paras):
        text = " ".join(p.split())
        state, buf, pieces = False, [], []
        for ch in text:
            if ch == "“":
                if buf and not state:
                    buf = []
                state = True
                continue
            if ch == "”":
                if state:
                    pieces.append("".join(buf))
                buf, state = [], False
                continue
            if state:
                buf.append(ch)
        ended_open = state
        if state and buf:
            pieces.append("".join(buf))
        w = sum(len(words(x)) for x in pieces)
        inside_words += w
        continues = prev_open and text.startswith("“")
        if continues:
            run_words += w
        else:
            if run_start is not None:
                runs.append((run_words, run_start))
            run_words, run_start = w, idx
        prev_open = ended_open
    if run_start is not None:
        runs.append((run_words, run_start))
    print("\nDialogue (words inside double quotation marks):",
          f"{inside_words:,} of {c5:,} = {inside_words / c5:.1%}")
    runs.sort(reverse=True)
    for w, start in runs[:3]:
        print(f"  long speech: {w:,} words (~{w / 151:.0f} min at 151 wpm), starts:",
              " ".join(paras[start].split())[:90])

    sentences = [s for s in re.split(r"(?<=[.!?])[”’]?\s+", " ".join(story_no_heads.split())) if WORD.search(s)]
    print("sentences (rough split on . ! ?):", f"{len(sentences):,}",
          "| mean words per sentence:", round(c5 / len(sentences), 1))

    print("\nName forms, novel text only (footnotes removed), whole-word counts:")
    for label, pat in NAMES:
        # names can wrap across lines in the file, so a space matches any whitespace
        pat = pat.replace(" ", r"\s+")
        n = len(re.findall(r"\b" + pat + r"\b", story))
        print(f"  {label}: {n}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: python -I gutenberg-wordcount.py <pg2554.txt>")
    main(sys.argv[1])
