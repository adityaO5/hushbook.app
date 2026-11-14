"""Count words, structure, dialogue, sentence length and name forms in Project Gutenberg eBook #28054
(The Brothers Karamazov, translated by Constance Garnett, The Lowell Press, New York), and the same
measures on Crime and Punishment (#2554, Garnett) for a like-for-like "is it hard" comparison.

Copied 2026-11-14 from ../../2026-11-13-best-jane-eyre-audiobook/scripts/je-wordcount.py
(parents: P&P pp-wordcount.py, W&P wp-wordcount.py). Same counting rules (a word is a whitespace token,
also split on "--" and em dashes, that contains a letter or digit), so the series' figures stay comparable.
Structure (4 parts, 12 books, epilogue, 96 chapters), headings, footnotes, names and the
Grand Inquisitor / Zosima sections changed for Karamazov. The #2554 loader reproduces the rules of
../../2026-11-11-best-crime-and-punishment-audiobook/scripts/gutenberg-wordcount.py (count 5 = 203,197).

Usage (isolated mode, each text in its own folder):
    python -I bk-wordcount.py <pg28054.txt> [label=h:mm:ss ...] [--cp <pg2554.txt>]

Counts reported for #28054:
  1. whitespace tokens between the START/END markers
  2. tokens with a letter or digit between the markers
  3. novel only: from the "PART I" heading to "THE END", tokens with a letter/digit
  4. as 3, also splitting on "--" and em dashes
  5. as 4, without heading lines (PART, Book, Chapter number and chapter title, EPILOGUE),
     footnote markers [n] and "THE END" (the novel as a narrator reads it, minus titles: THE FIGURE USED)
  5b. as 5 plus the book and chapter titles (what a narrator who reads every heading says)
"""
import hashlib
import re
import statistics
import sys

WORD = re.compile(r"[A-Za-z0-9À-ɏ]")
SPLIT = re.compile(r"(?:\s|--|—)+")
SITE_WPM = 151  # content/blog/how-long-is-an-audiobook.md (median of LibriVox solo readers)

# Runtimes (h:mm[:ss]) read 2026-11-14; filled in from the Audible catalogue API, Apple and LibriVox.
RUNTIMES = {}

# Whole words, case-sensitive; a space matches any whitespace. Rows overlap where noted.
NAMES = [
    # the father
    ("Fyodor Pavlovitch", r"Fyodor Pavlovitch"), ("Karamazov (all)", r"Karamazov"), ("Fyodor (all)", r"Fyodor"),
    # Dmitri
    ("Dmitri (all)", r"Dmitri"), ("Dmitri Fyodorovitch", r"Dmitri Fyodorovitch"), ("Mitya", r"Mitya"), ("Mitka", r"Mitka"),
    ("Mitenka", r"Mitenka"), ("Mitri", r"Mitri"), ("Dmitri Karamazov", r"Dmitri Karamazov"),
    # Ivan
    ("Ivan (all)", r"Ivan"), ("Ivan Fyodorovitch", r"Ivan Fyodorovitch"), ("Vanya", r"Vanya"), ("Vanka", r"Vanka"),
    ("Ivan Karamazov", r"Ivan Karamazov"),
    # Alyosha
    ("Alyosha", r"Alyosha"), ("Alexey (all)", r"Alexey"), ("Alexey Fyodorovitch", r"Alexey Fyodorovitch"),
    ("Alyoshka", r"Alyoshka"), ("Alyoshenka", r"Alyoshenka"), ("Alyoshetchka", r"Alyoshetchka"), ("Lyosha", r"Lyosha"),
    ("Alexey Karamazov", r"Alexey Karamazov"),
    # Smerdyakov
    ("Smerdyakov", r"Smerdyakov"), ("Pavel Fyodorovitch", r"Pavel Fyodorovitch"),
    # Grushenka
    ("Grushenka", r"Grushenka"), ("Agrafena Alexandrovna", r"Agrafena Alexandrovna"), ("Agrafena (all)", r"Agrafena"),
    ("Grusha", r"Grusha"), ("Grushka", r"Grushka"), ("Svetlova", r"Svetlov"),
    # Katerina Ivanovna
    ("Katerina Ivanovna", r"Katerina Ivanovna"), ("Katerina (all)", r"Katerina"), ("Katya", r"Katya"), ("Katka", r"Katka"),
    ("Verhovtsev", r"Verhovtsev"),
    # others
    ("Zossima", r"Zossima"), ("Father Zossima", r"Father Zossima"), ("Rakitin", r"Rakitin"), ("Misha", r"Misha"),
    ("Grigory", r"Grigory"), ("Marfa Ignatyevna", r"Marfa Ignatyevna"), ("Marfa (all)", r"Marfa"),
    ("Madame Hohlakov", r"Madame Hohlakov"), ("Hohlakov (all)", r"Hohlakov"), ("Lise", r"Lise"),
    ("Ilusha", r"Ilusha"), ("Ilushechka", r"Ilushechka"), ("Snegiryov", r"Snegiryov"), ("Kolya", r"Kolya"),
    ("Krassotkin", r"Krassotkin"), ("Miusov", r"Miüsov|Miusov"), ("Father Paissy", r"Father Paissy"),
    ("Ferapont", r"Ferapont"), ("Samsonov", r"Samsonov"), ("Perhotin", r"Perhotin"), ("Kalganov", r"Kalganov"),
    ("Maximov", r"Maximov"), ("Fenya", r"Fenya"), ("Lizaveta", r"Lizaveta"), ("Fetyukovitch", r"Fetyukovitch"),
    ("Ippolit Kirillovitch", r"Ippolit Kirillovitch"), ("Nikolay Parfenovitch", r"Nikolay Parfenovitch"),
    ("Grand Inquisitor", r"Grand Inquisitor"), ("Inquisitor (all)", r"Inquisitor"),
]
SPEECH_VERBS = (r"said|says|cried|replied|returned|answered|continued|added|observed|"
                r"exclaimed|asked|resumed|repeated|rejoined|whispered|interrupted|"
                r"thought|began|went on|called|spoke|reply|answer|demanded|inquired|responded|shouted|muttered")

PART_RE = re.compile(r"^(PART (?:I|II|III|IV)|EPILOGUE)[ \t]*$", re.M)
BOOK_RE = re.compile(r"^Book ([IVXL]+)\. (.+?)[ \t]*$", re.M)
CHAP_RE = re.compile(r"^Chapter ([IVXL]+)\.[ \t]*\n([^\n]+)\n", re.M)
FOOTMARK = re.compile(r"\[\d+\]")


def words(text):
    return [t for t in SPLIT.split(text) if WORD.search(t)]


def hms_to_min(s):
    parts = [int(x) for x in s.split(":")]
    if len(parts) == 2:
        parts = [parts[0], parts[1], 0]
    h, m, sec = parts
    return h * 60 + m + sec / 60


def fmt_hm(minutes):
    h = int(minutes // 60)
    m = int(round(minutes - h * 60))
    if m == 60:
        h, m = h + 1, 0
    return f"{h} h {m:02d} min"


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


def load(path):
    raw = open(path, "rb").read()
    text = raw.decode("utf-8").replace("\r\n", "\n")
    start = re.search(r"^\*\*\* ?START OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M)
    end = re.search(r"^\*\*\* ?END OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M)
    return raw, text, text[start.end():end.start()]


def chapters_of(novel):
    """[(part, book_no, book_title, ch_no, ch_title, text)] in reading order; text has no heading lines."""
    marks = []
    for m in PART_RE.finditer(novel):
        marks.append((m.start(), m.end(), "part", m.group(1)))
    for m in BOOK_RE.finditer(novel):
        marks.append((m.start(), m.end(), "book", (roman(m.group(1)), m.group(2))))
    for m in CHAP_RE.finditer(novel):
        marks.append((m.start(), m.end(), "chap", (roman(m.group(1)), m.group(2).strip())))
    marks.sort()
    out = []
    part = book = None
    for i, (s, e, kind, val) in enumerate(marks):
        if kind == "part":
            part = val
            if val == "EPILOGUE":
                book = (13, "Epilogue")
        elif kind == "book":
            book = val
        else:
            seg_end = marks[i + 1][0] if i + 1 < len(marks) else len(novel)
            seg = FOOTMARK.sub("", novel[e:seg_end])
            out.append((part, book[0], book[1], val[0], val[1], seg))
    return out


def sentences(text):
    return [s for s in re.split(r"(?<=[.!?])[”’]?\s+", " ".join(text.split())) if WORD.search(s)]


def mean_sentence(text):
    s = sentences(text)
    return len(words(text)) / len(s), len(s)


def dialogue_share(chunks):
    inside = total = 0
    for s in chunks:
        total += len(words(s))
        for p in re.split(r"\n\s*\n", s):
            p = " ".join(p.split())
            inside += sum(len(words(q)) for q in re.findall(r"“([^”]*)(?:”|$)", p))
    return inside, total


def cp_story(path):
    """#2554 with the rules of the 2026-11-11 gutenberg-wordcount.py (count 5)."""
    _, _, body = load(path)
    m = re.search(r"^PART I\s*$", body, re.M)
    novel = body[m.start():]
    story = re.sub(r"^\[\*\][^\n]*(?:\n(?!\n)[^\n]*)*", "", novel, flags=re.M).replace("[*]", "")
    return re.sub(r"^(PART [IVX]+|CHAPTER [IVX]+|EPILOGUE|[IVX]+)\s*$", "", story, flags=re.M)


def main(path, extra, cp):
    sys.stdout.reconfigure(encoding="utf-8")
    raw, text, body = load(path)
    print("file:", path)
    print("SHA-256:", hashlib.sha256(raw).hexdigest())
    hdr = re.search(r"Release date: .*\n.*Most recently updated: .*", text)
    print("header:", " ".join(hdr.group(0).split()) if hdr else "(no header line)")
    c1 = len(body.split())
    c2 = len([t for t in body.split() if WORD.search(t)])
    start = re.search(r"^PART I[ \t]*$", body, re.M)
    end = re.search(r"^THE END[ \t]*$", body, re.M)
    novel = body[start.start():end.start()]
    c3 = len([t for t in novel.split() if WORD.search(t)])
    c4 = len(words(novel))
    chs = chapters_of(novel)
    story = "\n\n".join(c[5] for c in chs)
    c5 = len(words(story))
    titles = sum(len(words(f"{c[4]}")) for c in chs) + sum(len(words(t)) for t in {c[2] for c in chs})
    print("\n1. whitespace tokens between markers:", f"{c1:,}")
    print("2. tokens with a letter/digit between markers:", f"{c2:,}")
    print("3. novel only (PART I heading to THE END), tokens with a letter/digit:", f"{c3:,}")
    print("4. as 3, also splitting on '--' and em dashes:", f"{c4:,}")
    print("5. as 4, without heading lines, footnote markers and THE END (FIGURE USED):", f"{c5:,}")
    print("5b. as 5 plus book and chapter titles:", f"{c5 + titles:,} (titles {titles:,} words)")
    print("chapters:", len(chs), "| books:", len({c[1] for c in chs}), "| footnotes (end section, not counted):",
          len(re.findall(r"^ \[\d+\]", body[end.end():], re.M)))

    print("\nStructure (count 5):")
    parts = {}
    for c in chs:
        parts.setdefault(c[0], []).append(c)
    for p, cl in parts.items():
        w = sum(len(words(c[5])) for c in cl)
        print(f"  {p}: books {sorted({c[1] for c in cl})}, {len(cl)} chapters, {w:,} words, {w / c5:.1%}, {fmt_hm(w / SITE_WPM)} at {SITE_WPM} wpm")
    books = {}
    for c in chs:
        books.setdefault((c[1], c[2]), []).append(c)
    cum = 0
    for (bn, bt), cl in books.items():
        w = sum(len(words(c[5])) for c in cl)
        print(f"  Book {bn} {bt}: {len(cl)} chapters, {w:,} words ({w / c5:.1%}), {fmt_hm(w / SITE_WPM)}; starts at word {cum:,} ({cum / c5:.1%}, {fmt_hm(cum / SITE_WPM)} in)")
        cum += w
    cum = 0
    rows = []
    for i, c in enumerate(chs, 1):
        w = len(words(c[5]))
        rows.append((i, c[1], c[3], c[4], w, cum))
        print(f"CH\t{i}\tBook {c[1]}\tCh. {c[3]}\t{c[4][:48]}\t{w}\t{w / SITE_WPM:.1f} min\tstarts {cum / c5:.1%} ({fmt_hm(cum / SITE_WPM)})\t" + " ".join(words(c[5])[:8]))
        cum += w
    ns = [r[4] for r in rows]
    print("  chapters:", len(ns), "| mean", round(statistics.mean(ns)), "| median", round(statistics.median(ns)), "| min", min(ns), "| max", max(ns))
    by_len = sorted(rows, key=lambda r: r[4])
    print("  5 shortest:", [(f"B{r[1]}C{r[2]}", r[3][:30], r[4]) for r in by_len[:5]])
    print("  5 longest:", [(f"B{r[1]}C{r[2]}", r[3][:30], r[4]) for r in by_len[-5:]])
    print(f"  mean chapter at {SITE_WPM} wpm: {statistics.mean(ns) / SITE_WPM:.1f} min; median {statistics.median(ns) / SITE_WPM:.1f} min")
    print("  chapters under 20 minutes:", sum(1 for c in ns if c / SITE_WPM < 20), "| 30 minutes or more:", sum(1 for c in ns if c / SITE_WPM >= 30),
          "| 60 minutes or more:", sum(1 for c in ns if c / SITE_WPM >= 60))

    print("\nSections people ask about:")
    for label, sel in (("Book V Ch. V The Grand Inquisitor", lambda r: r[1] == 5 and r[2] == 5),
                       ("Book V Ch. IV Rebellion", lambda r: r[1] == 5 and r[2] == 4),
                       ("Book V Ch. IV + V (Rebellion + The Grand Inquisitor)", lambda r: r[1] == 5 and r[2] in (4, 5)),
                       ("Book VI The Russian Monk (all three chapters)", lambda r: r[1] == 6),
                       ("Book VI Ch. II-III (Zosima's life and teachings, as Alyosha's notes)", lambda r: r[1] == 6 and r[2] in (2, 3)),
                       ("Book X The Boys", lambda r: r[1] == 10),
                       ("Book XII A Judicial Error", lambda r: r[1] == 12)):
        sel_rows = [r for r in rows if sel(r)]
        w = sum(r[4] for r in sel_rows)
        st = sel_rows[0][5]
        print(f"  {label}: {w:,} words, {w / c5:.2%} of the novel, {fmt_hm(w / SITE_WPM)} at {SITE_WPM} wpm "
              f"(1.25x {fmt_hm(w / SITE_WPM / 1.25)}, 1.5x {fmt_hm(w / SITE_WPM / 1.5)}); starts {st / c5:.1%} of the way in, "
              f"{fmt_hm(st / SITE_WPM)} in at {SITE_WPM} wpm; chapter #{sel_rows[0][0]} of {len(rows)}")

    print("\nListening time:")
    for wl, wpm in ((f"{SITE_WPM} wpm", SITE_WPM), ("155 wpm (ACX)", 9300 / 60)):
        print(f"  {c5:,} words at {wl}: " + "; ".join(f"{s}x {fmt_hm(c5 / wpm / s)}" for s in (1, 1.25, 1.5, 2)))
    total = c5 / SITE_WPM
    for per_day in (30, 60):
        print(f"  days at {per_day} min a day:", ", ".join(f"{s}x {-(-total / s // per_day):.0f}" for s in (1, 1.25, 1.5, 2)))
    print(f"  silent reading at 260 wpm: {fmt_hm(c5 / 260)}")
    for other, n in (("Crime and Punishment (published 203,197)", 203197), ("War and Peace (published 561,870)", 561870),
                     ("Jane Eyre (published 186,145)", 186145)):
        print(f"  vs {other}: {c5 / n:.2f}x; {fmt_hm(n / SITE_WPM)} at {SITE_WPM} wpm")

    if RUNTIMES or extra:
        print("\nRecordings: runtime -> 1.25x / 1.5x / 2x | implied words a minute (count 5):")
        paces = []
        for label, rt in {**RUNTIMES, **extra}.items():
            mins = hms_to_min(rt)
            paces.append((c5 / mins, label))
            print(f"  {label}: {rt} ({fmt_hm(mins)}) -> " + " / ".join(fmt_hm(mins / s) for s in (1.25, 1.5, 2)) + f" | {c5 / mins:.1f} wpm")
        pv = sorted(p for p, _ in paces)
        print(f"  pace range {pv[0]:.0f} to {pv[-1]:.0f}, median {statistics.median(pv):.0f} ({len(pv)} recordings)")

    inside, tot = dialogue_share([c[5] for c in chs])
    print(f"\nDialogue: {inside:,} of {tot:,} words inside “ ” = {inside / tot:.1%}")
    for p, cl in parts.items():
        i2, t2 = dialogue_share([c[5] for c in cl])
        print(f"  {p}: {i2 / t2:.1%}")
    gi = [c for c in chs if c[1] == 5 and c[3] == 5][0][5]
    i2, t2 = dialogue_share([gi])
    print(f"  The Grand Inquisitor chapter: {i2 / t2:.1%} inside quotes")
    # longest unbroken speech paragraph-run (a paragraph that opens with “ and has no closing ” continues)
    longest = (0, None)
    for c in chs:
        paras = [" ".join(p.split()) for p in re.split(r"\n\s*\n", c[5]) if p.strip()]
        run = 0
        for p in paras:
            if p.startswith("“"):
                run += len(words(p))
                if p.count("“") <= p.count("”"):
                    if run > longest[0]:
                        longest = (run, f"Book {c[1]} Ch. {c[3]} {c[4]}")
                    run = 0
            else:
                run = 0
    print(f"  longest unbroken quoted speech (paragraph run): {longest[0]:,} words, {longest[0] / SITE_WPM:.0f} min, {longest[1]}")

    ms, nsent = mean_sentence(story)
    print(f"\nSentences (rough split on . ! ?): {nsent:,} | mean words per sentence {ms:.1f}")
    print("first sentence:", sentences(story)[0][:200], "|", len(words(sentences(story)[0])), "words")
    if cp:
        cps = cp_story(cp)
        cw = len(words(cps))
        cm, cn = mean_sentence(cps)
        ci, ct = dialogue_share([cps])
        print(f"\nSAME SCRIPT on {cp.split('/')[-1].split(chr(92))[-1]} (Crime and Punishment, Garnett): {cw:,} words "
              f"(published 203,197: {'MATCH' if cw == 203197 else 'DIFFERS'}); {cn:,} sentences, mean {cm:.1f} words; "
              f"dialogue {ci / ct:.1%} (published 55.4% by the 11-11 script)")
        print(f"  Karamazov / C&P: words {c5 / cw:.2f}x, sentence length {ms:.1f} vs {cm:.1f}")

    print("\nNames and forms (novel text, whole words):")
    for label, pat in NAMES:
        c = count(pat, story)
        first = next((f"Book {x[1]} Ch. {x[3]}" for x in chs if count(pat, x[5])), None)
        print(f"  {label}: {c} (first in {first})")


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args:
        sys.exit("usage: python -I bk-wordcount.py <pg28054.txt> [label=h:mm:ss ...] [--cp <pg2554.txt>]")
    cp = None
    if "--cp" in args:
        i = args.index("--cp")
        cp = args[i + 1]
        args = args[:i] + args[i + 2:]
    extra = dict(a.split("=", 1) for a in args[1:])
    main(args[0], extra, cp)
