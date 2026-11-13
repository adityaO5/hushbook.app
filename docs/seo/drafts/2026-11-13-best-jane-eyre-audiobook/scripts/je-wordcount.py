"""Count words, structure, dialogue, sentence length, direct addresses to the reader and name forms in
Project Gutenberg eBook #1260 (Jane Eyre: An Autobiography, the 1897 Service & Paton edition with
F. H. Townsend's illustrations; Charlotte Bronte's 1848 preface and the note to the third edition).

Copied 2026-11-13 from ../../2026-11-12-best-pride-and-prejudice-audiobook/scripts/pp-wordcount.py
(parent: ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-wordcount.py). Same counting rules
(a word is a whitespace token, also split on "--" and em dashes, that contains a letter or digit), so the
series' figures stay comparable. Volume split, French detector (je-french.py) and names changed for Jane Eyre.

Usage (isolated mode, text file in its own folder):
    python -I je-wordcount.py <path-to-pg1260.txt> [label=h:mm:ss ...] [--compare <pg768.txt> <pg1342.txt>]

Source file: https://www.gutenberg.org/cache/epub/1260/pg1260.txt (downloaded 2026-11-13; header
"Release date: March 1, 1998 [eBook #1260] Most recently updated: September 27, 2025"; SHA-256 printed).

Counts reported:
  1. whitespace tokens between the START/END markers
  2. tokens with a letter or digit between the markers
  3. novel only: from the CHAPTER I heading to the last line ("Lord Jesus!'"), tokens with a letter/digit
  4. as 3, also splitting on "--" and em dashes
  5. as 4, without chapter heading lines and illustration brackets (the novel as a narrator reads it; the figure used)
  6. the 1848 preface and the note to the third edition (read on some recordings)
"""
import hashlib
import re
import statistics
import sys

WORD = re.compile(r"[A-Za-z0-9À-ɏ]")
SPLIT = re.compile(r"(?:\s|--|—)+")
CHAPTER_HEAD = re.compile(r"^CHAPTER ([IVXLC]+)(?:—CONCLUSION)?[ \t]*$", re.M)
ILLUS = re.compile(r"\[Illustration[^\]]*\]", re.S)
SITE_WPM = 151  # content/blog/how-long-is-an-audiobook.md (median of LibriVox solo readers)

# Runtimes (h:mm:ss) read 2026-11-13. LibriVox: API `totaltime`. Paid editions: Audible US catalogue
# `runtime_length_min` (h:mm), except Josephine Bailey (Apple Books schema.org duration; not on Audible).
RUNTIMES = {
    "LibriVox v1, 21 readers (id 133)": "20:36:36",
    "LibriVox v2, Elizabeth Klett (id 2192)": "18:36:29",
    "LibriVox v3, dramatic reading, 36 readers (id 6772)": "19:42:53",
    "LibriVox v4, Dawn Sutton (id 18154, includes the preface)": "25:19:06",
    "Thandiwe Newton (Audible Studios 2016)": "19:10",
    "Juliet Stevenson (Audible Studios 2009)": "19:13",
    "Emma Messenger (Trout Lake 2012)": "21:47",
    "Lucy Scott (RNIB 2008)": "20:27",
    "Susan Ericksen (AmazonClassics 2017)": "17:27",
    "Susan Ericksen (The Classic Collection 2015)": "17:21",
    "Amanda Root (Naxos 2004)": "20:33",
    "Anna Popplewell (Penguin 2019, with introduction)": "22:51",
    "Flo Gibson (Recorded Books 1999)": "18:26",
    "Flo Gibson (Audio Book Contractors 2009)": "18:23",
    "Wanda McCaddon (Tantor 2008)": "17:56",
    "Wanda McCaddon / Nadia May (Blackstone 2009)": "18:51",
    "Josephine Bailey (Books on Tape, Apple)": "20:54:52",
    "Donna Barkman (Jimcin 2007)": "20:54",
    "Andrea Giordani (A.R.N. 2015)": "17:56",
    "Alice Johnson (Audioliterature 2017)": "18:20",
    "Anna Bentinck (Dreamscape 2015)": "23:08",
    "Juliet Mills (Blackstone 2014)": "19:26",
    "Juliet Mills (Phoenix 2019)": "19:10",
    "Emily Woof (silksoundbooks 2015)": "20:12",
    "Rachel Atkins (SNR 2024)": "20:35",
    "Judi Pennington (Cherry Hill 2012)": "20:31",
    "Alison Larkin (2020, with three poems)": "21:50",
    "Spoken Realms full cast (2019)": "19:38",
    "Thrive Audio full cast (2024)": "21:52",
}

# Whole words, case-sensitive; a space matches any whitespace. Rows overlap where noted.
NAMES = [
    ("Jane (all)", r"Jane"), ("Miss Eyre", r"Miss Eyre"), ("Eyre (all)", r"Eyre"), ("Janet", r"Janet"),
    ("Rochester (all)", r"Rochester"), ("Mr. Rochester", r"Mr\. Rochester"), ("Edward (all)", r"Edward"),
    ("Fairfax (all)", r"Fairfax"), ("Mrs. Fairfax", r"Mrs\. Fairfax"), ("Edward Fairfax", r"Edward Fairfax"),
    ("St. John", r"St\. John"), ("John (all, incl. St. John)", r"John"), ("John Reed", r"John Reed"),
    ("Master John", r"Master John"), ("Mr. Rivers", r"Mr\. Rivers"), ("Rivers (all)", r"Rivers"),
    ("Diana", r"Diana"), ("Mary (all)", r"Mary"), ("Mary Ann", r"Mary Ann"), ("Hannah", r"Hannah"),
    ("Adèle", r"Adèle"), ("Adela", r"Adela"), ("Adele (no accent)", r"Adele"), ("Sophie", r"Sophie"), ("Varens", r"Varens"),
    ("Céline", r"Céline"), ("Mrs. Reed", r"Mrs\. Reed"), ("Reed (all)", r"Reed"), ("Eliza", r"Eliza"),
    ("Georgiana", r"Georgiana"), ("Bessie", r"Bessie"), ("Abbot", r"Abbot"), ("Mr. Lloyd", r"Mr\. Lloyd"),
    ("Brocklehurst", r"Brocklehurst"), ("Helen (all)", r"Helen"), ("Helen Burns", r"Helen Burns"), ("Burns", r"Burns"),
    ("Miss Temple", r"Miss Temple"), ("Temple (all)", r"Temple"), ("Miss Scatcherd", r"Miss Scatcherd"),
    ("Grace Poole", r"Grace Poole"), ("Grace (all)", r"Grace"), ("Leah", r"Leah"), ("Pilot", r"Pilot"),
    ("Blanche", r"Blanche"), ("Ingram", r"Ingram"), ("Mason", r"Mason"), ("Rosamond", r"Rosamond"), ("Oliver", r"Oliver"),
    ("Gateshead", r"Gateshead"), ("Lowood", r"Lowood"), ("Thornfield", r"Thornfield"), ("Millcote", r"Millcote"),
    ("Moor House", r"Moor House"), ("Morton", r"Morton"), ("Marsh End", r"Marsh End"), ("Ferndean", r"Ferndean"),
    ("Whitcross", r"Whitcross"), ("Hay", r"Hay"),
]
SPEECH_VERBS = (r"said|says|cried|replied|returned|answered|continued|added|observed|"
                r"exclaimed|asked|resumed|repeated|rejoined|whispered|interrupted|"
                r"thought|began|went on|called|spoke|reply|answer|demanded|inquired|responded")


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


def chapters_of(body):
    """Return [(n, text)] for CHAPTER I..XXXVIII of #1260 (heading lines excluded, underscores removed)."""
    heads = list(CHAPTER_HEAD.finditer(body))
    out = []
    for i, h in enumerate(heads):
        seg_end = heads[i + 1].start() if i + 1 < len(heads) else len(body)
        seg = ILLUS.sub(" ", body[h.end():seg_end]).replace("_", "")
        out.append((roman(h.group(1)), seg))
    return heads, out


def sentences(text):
    return [s for s in re.split(r"(?<=[.!?])[”’]?\s+", " ".join(text.split())) if WORD.search(s)]


def mean_sentence(text):
    s = sentences(text)
    return len(words(text)) / len(s), len(s)


def main(path, extra, compare):
    sys.stdout.reconfigure(encoding="utf-8")
    raw, text, body = load(path)
    print("file:", path)
    print("SHA-256:", hashlib.sha256(raw).hexdigest())
    hdr = re.search(r"Release date: .*\n.*Most recently updated: .*", text)
    print("header:", " ".join(hdr.group(0).split()) if hdr else "(no header line)")
    c1 = len(body.split())
    c2 = len([t for t in body.split() if WORD.search(t)])
    heads, chapters = chapters_of(body)
    print("chapter headings found:", len(heads), "| first:", heads[0].group(0).strip(), "| last:", heads[-1].group(0).strip())
    nums = [n for n, _ in chapters]
    assert nums == list(range(1, 39)), nums
    novel = body[heads[0].start():]
    front = body[:heads[0].start()]
    c3 = len([t for t in novel.split() if WORD.search(t)])
    c4 = len(words(novel))
    story = "\n\n".join(s for _, s in chapters)
    c5 = len(words(story))
    pre = front[front.index("\nPREFACE\n"):]
    c6 = len(words(pre.replace("_", "")))
    print("\n1. whitespace tokens between markers:", f"{c1:,}")
    print("2. tokens with a letter/digit between markers:", f"{c2:,}")
    print("3. novel only (CHAPTER I heading to the end), tokens with a letter/digit:", f"{c3:,}")
    print("4. as 3, also splitting on '--' and em dashes:", f"{c4:,}")
    print("5. as 4, without chapter headings and illustration brackets (FIGURE USED):", f"{c5:,}")
    print("6. preface (1848) + note to the third edition:", f"{c6:,}", "| novel + both:", f"{c5 + c6:,}")

    counts = [(n, len(words(s))) for n, s in chapters]
    vols = {"Volume I (Ch. 1-15)": range(1, 16), "Volume II (Ch. 16-26)": range(16, 27), "Volume III (Ch. 27-38)": range(27, 39)}
    print("\nStructure (count 5):")
    for label, rng in vols.items():
        w = sum(c for n, c in counts if n in rng)
        print(f"  {label}: {len(rng)} chapters, {w:,} words, {fmt_hm(w / SITE_WPM)} at {SITE_WPM} wpm")
    for n, c in counts:
        print(f"CH\t{n}\t{c}\t{c / SITE_WPM:.1f} min\t" + " ".join(words(chapters[n - 1][1])[:9]))
    ns = [c for _, c in counts]
    print("  chapters:", len(ns), "| mean", round(statistics.mean(ns)), "| median", round(statistics.median(ns)),
          "| min", min(ns), "| max", max(ns))
    by_len = sorted(counts, key=lambda x: x[1])
    print("  5 shortest (chapter, words):", by_len[:5])
    print("  5 longest (chapter, words):", by_len[-5:])
    print(f"  mean chapter at {SITE_WPM} wpm: {statistics.mean(ns) / SITE_WPM:.1f} min; median {statistics.median(ns) / SITE_WPM:.1f} min")
    print("  chapters under 20 minutes:", sum(1 for c in ns if c / SITE_WPM < 20), "| 30 minutes or more:", sum(1 for c in ns if c / SITE_WPM >= 30))

    print("\nListening time:")
    for wl, wpm in ((f"{SITE_WPM} wpm", SITE_WPM), ("155 wpm (ACX)", 9300 / 60)):
        print(f"  {c5:,} words at {wl}: " + "; ".join(f"{s}x {fmt_hm(c5 / wpm / s)}" for s in (1, 1.25, 1.5, 2)))
    total = c5 / SITE_WPM
    for per_day in (30, 60):
        print(f"  days at {per_day} min a day:", ", ".join(f"{s}x {-(-total / s // per_day):.0f}" for s in (1, 1.25, 1.5, 2)))
    print(f"  silent reading at 260 wpm: {fmt_hm(c5 / 260)}")

    print("\nRecordings: runtime -> 1.25x / 1.5x / 2x | implied words a minute (count 5):")
    paces = []
    for label, rt in {**RUNTIMES, **extra}.items():
        mins = hms_to_min(rt)
        paces.append((c5 / mins, label))
        print(f"  {label}: {rt} ({fmt_hm(mins)}) -> " + " / ".join(fmt_hm(mins / s) for s in (1.25, 1.5, 2)) + f" | {c5 / mins:.1f} wpm")
    pv = sorted(p for p, _ in paces)
    print(f"  pace range {pv[0]:.0f} to {pv[-1]:.0f}, median {statistics.median(pv):.0f} ({len(pv)} recordings)")

    # Dialogue: words inside curly double quotes.
    inside = 0
    paras = []
    for n, s in chapters:
        for p in re.split(r"\n\s*\n", s):
            if p.strip():
                paras.append((n, " ".join(p.split())))
    unattributed = speech_paras = 0
    for n, p in paras:
        inside += sum(len(words(q)) for q in re.findall(r"“([^”]*)(?:”|$)", p))
        if p.startswith("“"):
            speech_paras += 1
            outside = re.sub(r"“[^”]*(?:”|$)", " ", p)
            if not outside.strip() or not (re.search(SPEECH_VERBS, outside) or re.search(r"[A-Z][a-z]+", outside.strip())):
                unattributed += 1
    print(f"\nDialogue: {inside:,} of {c5:,} words inside “ ” = {inside / c5:.1%}")
    for label, rng in vols.items():
        vq = vw = 0
        for n, s in chapters:
            if n in rng:
                vw += len(words(s))
                vq += sum(len(words(q)) for q in re.findall(r"“([^”]*)(?:”|$)", " ".join(s.split())))
        print(f"  {label}: {vq / vw:.1%}")
    print(f"Paragraphs {len(paras):,}; opening with a quotation mark {speech_paras:,}; no speaker or speech verb outside the quotes {unattributed:,} ({unattributed / speech_paras:.1%})")

    ms, ns_ = mean_sentence(story)
    print(f"\nSentences (rough split on . ! ?): {ns_:,} | mean words per sentence {ms:.1f}")
    print("first sentence:", sentences(story)[0][:200], "|", len(words(sentences(story)[0])), "words")
    if compare:
        for cp in compare:
            _, t2, b2 = load(cp)
            h2 = list(re.finditer(r"^CHAPTER [IVXLC]+\.?\]?[ \t]*$", b2, re.M))
            st = ILLUS.sub(" ", b2[h2[0].start():]).replace("_", "")
            st = re.sub(r"^CHAPTER [IVXLC]+\.?\]?[ \t]*$", " ", st, flags=re.M)
            m2, n2 = mean_sentence(st)
            print(f"  same splitter on {cp.split('/')[-1].split(chr(92))[-1]}: {len(words(st)):,} words from CHAPTER I to the END marker, {n2:,} sentences, mean {m2:.1f}")

    # Direct addresses to the reader.
    hits = [m for m in re.finditer(r"(?<![\w])[Rr]eader(?![\w’'])", story)]
    print(f"\n'reader'/'Reader' as a word (not 'readers'/'reader's'): {len(hits)}")
    by_ch = {}
    for n, s in chapters:
        k = len(re.findall(r"(?<![\w])[Rr]eader(?![\w’'])", s))
        if k:
            by_ch[n] = k
    print("  by chapter:", by_ch)
    for m in hits:
        print("   …", " ".join(story[max(0, m.start() - 60):m.start() + 50].split()), "…")

    print("\nNames and forms (novel text, whole words):")
    for label, pat in NAMES:
        c = count(pat, story)
        first = next((n for n, s in chapters if count(pat, s)), None)
        print(f"  {label}: {c} (first in Ch. {first})")


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args:
        sys.exit("usage: python -I je-wordcount.py <pg1260.txt> [label=h:mm:ss ...] [--compare <pg768.txt> <pg1342.txt>]")
    compare = []
    if "--compare" in args:
        i = args.index("--compare")
        compare = args[i + 1:]
        args = args[:i]
    extra = dict(a.split("=", 1) for a in args[1:])
    main(args[0], extra, compare)
