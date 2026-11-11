"""Count words in Project Gutenberg eBook #2600 (War and Peace, tr. Louise and Aylmer Maude).

Adapted from ../../2026-11-11-best-crime-and-punishment-audiobook/scripts/gutenberg-wordcount.py
(same counting rules, so the two posts' figures are comparable).

Usage (run in isolated mode, text file in its own folder):
    python -I wp-wordcount.py <path-to-pg2600.txt>

Source file: https://www.gutenberg.org/cache/epub/2600/pg2600.txt
(downloaded 2026-11-11, header "Release date: April 1, 2001 [eBook #2600]
Most recently updated: June 14, 2022", "Translator: Aylmer Maude / Louise Maude",
SHA-256 2d5bb2ad5f422765e714617e21fa31bbaf8958aa79682c86fca6660fcc5d1b2b)

Only the text between the "*** START OF THE PROJECT GUTENBERG EBOOK" and
"*** END OF THE PROJECT GUTENBERG EBOOK" marker lines is used.

Counts reported, so the method is transparent:
  1. whitespace tokens between the markers (what a word processor shows)
  2. tokens with a letter or digit between the markers
  3. novel only: from the body heading "BOOK ONE: 1805" to the END marker (drops the
     title and the contents list); tokens with a letter or digit
  4. as 3, also splitting words joined by an em dash ("Antichrist—I") or "--"
  5. as 4, without the translators' footnotes (indented paragraphs that start with "*",
     which give the English for French, German or Latin left in the text) and the
     "*", "*(2)" markers, and without the BOOK / CHAPTER / EPILOGUE heading lines
     (count 5 is the figure used in research-evidence.md)
Also: words per book and per chapter, chapter-length statistics, listening time at
151 and 155 words a minute at 1x, 1.25x, 1.5x and 2x, days to finish at 30 / 60 / 90
minutes a day, the words a minute implied by the LibriVox runtimes, the share of words
inside quotation marks, the footnoted foreign phrases, and name-form counts.
"""
import re
import statistics
import sys

WORD = re.compile(r"[A-Za-z0-9À-ɏ]")
SPLIT = re.compile(r"(?:\s|--|—)+")
BOOK_HEAD = re.compile(r"^(BOOK [A-Z]+: [0-9 \-]+|FIRST EPILOGUE: [0-9 \-]+|SECOND EPILOGUE)\s*$", re.M)
CHAPTER_HEAD = re.compile(r"^CHAPTER [IVXLC]+\s*$", re.M)

# LibriVox runtimes (API `totaltime`, read 2026-11-11). The solo set reads Gutenberg #2600
# (API url_text_source https://www.gutenberg.org/ebooks/2600); volume boundaries from the
# API section lists: Vol 1 = Books 1-3, Vol 2 = Books 4-8, Vol 3 = Books 9-11,
# Vol 4 = Books 12-15 and both epilogues.
LIBRIVOX_VOLUMES = {
    "Volume 1 (id 18545), Books 1-3": ("14:34:37", ["ONE", "TWO", "THREE"]),
    "Volume 2 (id 18547), Books 4-8": ("16:08:33", ["FOUR", "FIVE", "SIX", "SEVEN", "EIGHT"]),
    "Volume 3 (id 18548), Books 9-11": ("17:00:19", ["NINE", "TEN", "ELEVEN"]),
    "Volume 4 (id 18549), Books 12-15 + epilogues": ("14:43:44", ["TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "FIRST", "SECOND"]),
}
LIBRIVOX_TOTALS = {
    "Solo set, Mark Nelson, 4 volumes (sum)": "62:27:13",
    "Group set, Books 1-17 (ids 722 to 4104, sum per scout.md)": "64:36:04",
}

# Name forms as the Maude text spells them (accents as printed). Whole words; a space in a
# pattern matches any whitespace (names can wrap across lines). Some rows are exclusive
# (e.g. "Andrew, without 'Prince' before it") so the forms can be added up.
NAMES = [
    # Pierre Bezukhov
    ("Pierre (all)", r"Pierre"),
    ("Monsieur Pierre", r"Monsieur Pierre"),
    ("Peter Kirílovich / Peter Kirílych (Pierre's name and patronymic)", r"Peter Kirí(?:lovich|lych)"),
    ("Count Bezúkhov", r"Count Bezúkhov"),
    ("Bezúkhov (surname, any context; Pierre and his father)", r"Bezúkhov"),
    ("Bezúkhova (Hélène, later Natasha)", r"Bezúkhova"),
    ("Countess Bezúkhova", r"Countess Bezúkhova"),
    # Natasha Rostova
    ("Natásha", r"Natásha"),
    ("Natalie (French form)", r"Natalie"),
    ("Nataly", r"Nataly"),
    ("Natálya (full first name)", r"Natálya"),
    ("Natálya Ilyníchna (name and patronymic)", r"Natálya Ilyíni?chna|Natálya Ilyníchna"),
    ("Rostóva (feminine surname: Natasha, her mother, her sister)", r"Rostóva"),
    ("Countess Rostóva", r"Countess Rostóva"),
    # Prince Andrew Bolkonsky
    ("Prince Andrew", r"Prince Andrew"),
    ("Andrew without 'Prince' before it", r"(?<!Prince )(?<!Prince\n)Andrew"),
    ("André (French form)", r"André"),
    ("Andrúsha (pet form)", r"Andrúsha"),
    ("Bolkónski (surname, any context; Andrew and his father)", r"Bolkónski"),
    ("Prince Bolkónski", r"Prince Bolkónski"),
    ("Bolkónskaya (feminine: Mary, Lise)", r"Bolkónskaya"),
    # Nicholas Rostov
    ("Nicholas", r"Nicholas"),
    ("Nicholas Rostóv", r"Nicholas Rostóv"),
    ("Nikólenka (Nicholas as a boy; in the First Epilogue, Andrew's son)", r"Nikólenka"),
    ("Rostóv (surname, any context)", r"Rostóv"),
    ("Count Rostóv (usually the father, Ilyá)", r"Count Rostóv"),
    ("Nicholas Ilyích / Ilyich", r"Nicholas Ily[íi]ch"),
    # Princess Mary Bolkonskaya
    ("Princess Mary", r"Princess Mary"),
    ("Mary without 'Princess' before it", r"(?<!Princess )(?<!Princess\n)Mary"),
    ("Marie (French form)", r"Marie"),
    ("Másha", r"Másha"),
    ("Máshka", r"Máshka"),
    # Others
    ("Sónya", r"Sónya"),
    ("Sophie", r"Sophie"),
    ("Hélène", r"Hélène"),
    ("Pétya (Natasha's brother)", r"Pétya"),
    ("Anatole", r"Anatole"),
    ("Kurágin", r"Kurágin"),
    ("Prince Vasíli", r"Prince Vasíli"),
    ("Borís", r"Borís"),
    ("Drubetskóy", r"Drubetskóy"),
    ("Anna Mikháylovna", r"Anna Mikháylovna"),
    ("Anna Pávlovna", r"Anna Pávlovna"),
    ("Denísov", r"Denísov"),
    ("Dólokhov", r"Dólokhov"),
    ("Kutúzov", r"Kutúzov"),
    ("Napoleon", r"Napoleon"),
    ("Bonaparte", r"Bonaparte"),
    ("Buonaparte", r"Buonaparte"),
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
    sys.stdout.reconfigure(encoding="utf-8")
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    start = re.search(r"^\*\*\* ?START OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M)
    end = re.search(r"^\*\*\* ?END OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M)
    if not start or not end:
        sys.exit("START/END markers not found")
    body = text[start.end():end.start()]

    c1 = len(body.split())
    c2 = len([t for t in body.split() if WORD.search(t)])

    # The contents list indents "BOOK ONE: 1805" by four spaces; the body heading is flush left.
    m = re.search(r"^BOOK ONE: 1805\s*$", body, re.M)
    if not m:
        sys.exit("body heading BOOK ONE not found")
    novel = body[m.start():]
    front = body[:m.start()]
    c3 = len([t for t in novel.split() if WORD.search(t)])
    c4 = len(words(novel))

    # Footnotes: an indented paragraph whose first line starts with "*" (or "*(2)").
    paras_raw = re.split(r"\n[ \t]*\n", novel)
    foot, kept = [], []
    for p in paras_raw:
        if re.match(r"^[ \t]+\*", p):
            foot.append(p)
        else:
            kept.append(p)
    story = "\n\n".join(kept)
    markers = len(re.findall(r"\*(?:\(\d+\))?", story))
    story = re.sub(r"\s?\*(?:\(\d+\))?", "", story)
    story_no_heads = CHAPTER_HEAD.sub("", BOOK_HEAD.sub("", story))
    c5 = len(words(story_no_heads))
    foot_words = sum(len(words(re.sub(r"\*(?:\(\d+\))?", "", p))) for p in foot)

    print("file:", path)
    print("characters between markers:", len(body))
    print("1. whitespace tokens between markers:", c1)
    print("2. tokens with a letter/digit between markers:", c2)
    print("   title + contents list (tokens with a letter/digit):", len(words(front)))
    print("3. novel only (BOOK ONE heading to END marker), tokens with a letter/digit:", c3)
    print("4. as 3, also splitting on '--' and em dashes:", c4)
    print("5. as 4, without translators' footnotes, markers and heading lines:", c5)
    print("   footnote paragraphs removed:", len(foot), "| their words:", foot_words,
          "| footnote markers removed from the text:", markers)

    # Structure
    pieces = BOOK_HEAD.split(story)
    # pieces = [preamble, head1, text1, head2, text2, ...] (BOOK_HEAD has one group)
    print("\nStructure (novel text, footnotes removed):")
    chapter_counts = []  # (book, chapter number, words)
    book_words = {}
    for i in range(1, len(pieces), 2):
        head, btext = pieces[i].strip(), pieces[i + 1]
        chaps = CHAPTER_HEAD.split(btext)[1:]
        counts = [len(words(c)) for c in chaps]
        key = head.split(":")[0].replace("BOOK ", "").replace(" EPILOGUE", "")
        book_words[key] = (len(counts), sum(counts))
        for j, c in enumerate(chaps):
            # one line per chapter, read by wp-chapter-align.py
            print("CH\t" + head.split(":")[0] + f"\t{j + 1}\t{counts[j]}\t" + " ".join(words(c)[:8]))
        chapter_counts.extend((head.split(":")[0], j + 1, n) for j, n in enumerate(counts))
        print(f"  {head}: {len(counts)} chapters, {sum(counts):,} words, "
              f"{fmt_hm(sum(counts) / 151)} at 151 wpm")
    ns = [n for _, _, n in chapter_counts]
    print("  total chapters:", len(ns), "| sum of chapter words:", f"{sum(ns):,}")
    print("  chapter length: mean", round(statistics.mean(ns)), "median",
          round(statistics.median(ns)), "min", min(ns), "max", max(ns))
    by_len = sorted(chapter_counts, key=lambda x: x[2])
    print("  5 shortest:", by_len[:5])
    print("  5 longest:", by_len[-5:])
    print(f"  mean chapter at 151 wpm: {statistics.mean(ns) / 151:.1f} min; median "
          f"{statistics.median(ns) / 151:.1f} min; shortest {min(ns) / 151:.1f} min; "
          f"longest {max(ns) / 151:.1f} min")
    under10 = sum(1 for n in ns if n / 151 < 10)
    print(f"  chapters under 10 minutes at 151 wpm: {under10} of {len(ns)}")

    print("\nListening time for count 5 =", f"{c5:,}", "words:")
    for label, wpm in (("151 wpm (site median, LibriVox solo readers)", 151),
                       ("155 wpm (ACX 9,300 words an hour)", 9300 / 60)):
        for speed in (1, 1.25, 1.5, 2):
            mins = c5 / wpm / speed
            print(f"  {label} at {speed}x: {mins:,.1f} min = {fmt_hm(mins)}")
    print("  days to finish at 151 wpm (rounded up to whole days):")
    for speed in (1, 1.25, 1.5, 2):
        mins = c5 / 151 / speed
        cells = ", ".join(f"{per} min a day: {-(-mins // per):.0f} days" for per in (30, 60, 90))
        print(f"    {speed}x ({mins:,.1f} min): {cells}")

    print("\nWords a minute implied by LibriVox runtimes:")
    for label, (rt, books) in LIBRIVOX_VOLUMES.items():
        w = sum(book_words[b][1] for b in books)
        ch = sum(book_words[b][0] for b in books)
        mins = hms_to_min(rt)
        print(f"  {label}: {ch} chapters, {w:,} words, {rt} -> {w / mins:.1f} wpm")
    for label, rt in LIBRIVOX_TOTALS.items():
        mins = hms_to_min(rt)
        print(f"  {label}: {rt} = {mins:,.2f} min -> {c5 / mins:.1f} wpm")
    print("  site figure check: 561,870 words / 62:27:13 ->",
          f"{561870 / hms_to_min('62:27:13'):.1f} wpm")

    # Dialogue share (same algorithm as the Crime and Punishment script).
    paras = [p for p in re.split(r"\n\s*\n", story_no_heads) if p.strip()]
    inside_words = 0
    runs = []
    run_words, run_start, prev_open = 0, None, False
    for idx, p in enumerate(paras):
        t = " ".join(p.split())
        state, buf, pieces_q = False, [], []
        for ch in t:
            if ch == "“":
                if buf and not state:
                    buf = []
                state = True
                continue
            if ch == "”":
                if state:
                    pieces_q.append("".join(buf))
                buf, state = [], False
                continue
            if state:
                buf.append(ch)
        ended_open = state
        if state and buf:
            pieces_q.append("".join(buf))
        w = sum(len(words(x)) for x in pieces_q)
        inside_words += w
        continues = prev_open and t.startswith("“")
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
    for w, s in runs[:3]:
        print(f"  long quoted passage: {w:,} words (~{w / 151:.0f} min at 151 wpm), starts:",
              " ".join(paras[s].split())[:90])

    sentences = [s for s in re.split(r"(?<=[.!?])[”’]?\s+", " ".join(story_no_heads.split())) if WORD.search(s)]
    print("sentences (rough split on . ! ?):", f"{len(sentences):,}",
          "| mean words per sentence:", round(c5 / len(sentences), 1))

    print("\nForeign phrases kept in the text and glossed in a footnote:", len(foot))
    for p in foot[:3]:
        print("   e.g.", " ".join(p.split())[:100])

    print("\nName forms, novel text only (footnotes removed), whole-word counts:")
    for label, pat in NAMES:
        pat2 = pat.replace(" ", r"\s+") if "(?<!" not in pat else pat
        n = len(re.findall(r"(?<![\wÀ-ÿ])(?:" + pat2 + r")(?![\wÀ-ÿ])", story))
        print(f"  {label}: {n}")
    # Pierre's patronymic and the old count: where "Count Bezúkhov" falls
    print("  'Count Bezúkhov' by book:", {k: len(re.findall(r"Count\s+Bezúkhov(?![\wÀ-ÿ])", pieces[i + 1]))
                                       for i in range(1, len(pieces), 2)
                                       for k in [pieces[i].split(':')[0].strip()]})
    print("  'Nikólenka' by book:", {k: len(re.findall(r"Nikólenka", pieces[i + 1]))
                                   for i in range(1, len(pieces), 2)
                                   for k in [pieces[i].split(':')[0].strip()]})


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: python -I wp-wordcount.py <pg2600.txt>")
    main(sys.argv[1])
