"""Count words, structure, dialogue, letters and forms of address in Project Gutenberg
eBook #1342 (Pride and Prejudice, the 1894 George Allen edition with George Saintsbury's
preface and Hugh Thomson's illustrations).

Adapted 2026-11-12 from ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-wordcount.py
(same counting rules: a word is a whitespace token, also split on "--" and em dashes, that
contains a letter or digit), so the posts' figures are comparable.

Usage (isolated mode, text file in its own folder):
    python -I pp-wordcount.py <path-to-pg1342.txt>

Source file: https://www.gutenberg.org/cache/epub/1342/pg1342.txt
(downloaded 2026-11-12; header "Release date: June 1, 1998 [eBook #1342]
Most recently updated: September 1, 2026"; SHA-256 printed below).

Only the text between the "*** START OF THE PROJECT GUTENBERG EBOOK" and
"*** END OF THE PROJECT GUTENBERG EBOOK" lines is used.

Counts reported:
  1. whitespace tokens between the markers
  2. tokens with a letter or digit between the markers
  3. novel only: from the CHAPTER I heading to "the means of uniting them." (drops the
     title pages, dedication, Saintsbury's preface, the list of illustrations and the
     printer's lines), tokens with a letter or digit
  4. as 3, also splitting on "--" and em dashes
  5. as 4, without [Illustration ...] blocks (Thomson's captions) and chapter heading lines
     (count 5 = the novel as a narrator reads it; the figure used)
  6. Saintsbury's preface alone (for comparison with other published counts)
Also: words per chapter and per volume of the 1813 three-volume division (Vol. I = Ch. 1-23,
Vol. II = Ch. 24-42, Vol. III = Ch. 43-61, the standard mapping; see research-evidence.md),
chapter statistics, listening time at 151 and 155 words a minute at 1x / 1.25x / 1.5x / 2x,
the words a minute implied by each recording's runtime (RUNTIMES below, read 2026-11-12),
the share of words inside quotation marks, unattributed speech, letters, and name forms.
"""
import hashlib
import re
import statistics
import sys

WORD = re.compile(r"[A-Za-z0-9À-ɏ]")
SPLIT = re.compile(r"(?:\s|--|—)+")
CHAPTER_HEAD = re.compile(r"^(?:CHAPTER|Chapter) ([IVXLC]+)\.?\]?[ \t]*$", re.M)  # XIII and XIV have no full stop
ILLUS = re.compile(r"\[Illustration[^\]]*\]", re.S)
SITE_WORDS = 121676  # content/blog/how-long-is-an-audiobook.md line 33 (method not recorded)

# Runtimes (h:mm:ss) read 2026-11-12. LibriVox: API `totaltime` (matches archive.org
# `runtime`). Paid editions: store runtimes as printed (minutes from the Audible catalogue API).
# All read the full novel; the dramatic reading reads the full text with a voice per character.
RUNTIMES = {
    "LibriVox v1, 13 readers (id 253)": "13:06:44",
    "LibriVox v2, Annie Coleman Rothenberg (id 254)": "13:25:01",
    "LibriVox v3, Karen Savage (id 1480)": "10:23:00",
    "LibriVox v4, Elizabeth Klett (id 4023)": "11:09:53",
    "LibriVox v5, Micah Sheppard and Linda Lee Paquet (id 969)": "14:26:52",
    "LibriVox v6, dramatic reading, 26 readers (id 5349)": "11:57:51",
}
EXTRA_RUNTIMES = {}  # filled from the command line: "label=h:mm" pairs after the path

# Forms of address and names. Whole words, case-sensitive; a space matches any whitespace.
# Some rows overlap ("Elizabeth" counts the "Elizabeth" inside "Miss Elizabeth"); exclusive
# rows say so.
NAMES = [
    ("Elizabeth (all)", r"Elizabeth"),
    ("Miss Elizabeth (Bennet)", r"Miss Elizabeth"),
    ("Miss Eliza (Bennet)", r"Miss Eliza(?!beth)"),
    ("Eliza (all, not Elizabeth)", r"Eliza(?!beth)"),
    ("Lizzy", r"Lizzy"),
    ("Miss Bennet (all)", r"Miss Bennet"),
    ("Miss Bennets (the sisters)", r"Miss Bennets"),
    ("Jane", r"Jane"),
    ("Mr. Bennet", r"Mr\. Bennet"),
    ("Mrs. Bennet", r"Mrs\. Bennet"),
    ("Darcy (all)", r"Darcy"),
    ("Mr. Darcy", r"Mr\. Darcy"),
    ("Miss Darcy (Georgiana)", r"Miss Darcy"),
    ("Georgiana", r"Georgiana"),
    ("Fitzwilliam Darcy", r"Fitzwilliam Darcy"),
    ("Fitzwilliam (all)", r"Fitzwilliam"),
    ("Colonel Fitzwilliam", r"Colonel Fitzwilliam"),
    ("Bingley (all)", r"Bingley"),
    ("Mr. Bingley", r"Mr\. Bingley"),
    ("Miss Bingley (Caroline)", r"Miss Bingley"),
    ("Caroline", r"Caroline"),
    ("Mrs. Hurst (Louisa)", r"Mrs\. Hurst"),
    ("Louisa", r"Louisa"),
    ("Mr. Hurst", r"Mr\. Hurst"),
    ("Charles (Bingley's first name)", r"Charles"),
    ("Lady Catherine", r"Lady Catherine"),
    ("Lady Catherine de Bourgh", r"Lady Catherine de Bourgh"),
    ("her ladyship / your ladyship", r"(?:her|your|Her|Your) [Ll]adyship"),
    ("Miss de Bourgh", r"Miss de Bourgh"),
    ("Catherine (all; Lady Catherine and Kitty)", r"Catherine"),
    ("Kitty", r"Kitty"),
    ("Lydia", r"Lydia"),
    ("Mrs. Wickham (Lydia after marrying)", r"Mrs\. Wickham"),
    ("Wickham (all)", r"Wickham"),
    ("Mr. Wickham", r"Mr\. Wickham"),
    ("Mary", r"Mary"),
    ("Mr. Collins", r"Mr\. Collins"),
    ("Mrs. Collins (Charlotte after marrying)", r"Mrs\. Collins"),
    ("Charlotte", r"Charlotte"),
    ("Miss Lucas", r"Miss Lucas"),
    ("Sir William (Lucas)", r"Sir William"),
    ("Lady Lucas", r"Lady Lucas"),
    ("Maria (Lucas)", r"Maria"),
    ("Mr. Gardiner", r"Mr\. Gardiner"),
    ("Mrs. Gardiner", r"Mrs\. Gardiner"),
    ("Mrs. Philips (this edition's spelling)", r"Mrs\. Philips"),
    ("Mrs. Forster", r"Mrs\. Forster"),
    ("Colonel Forster", r"Colonel Forster"),
    ("Mrs. Long", r"Mrs\. Long"),
    ("Denny", r"Denny"),
    ("Mrs. Reynolds", r"Mrs\. Reynolds"),
    ("Mr. Darcy's / Darcy's", r"Darcy’s"),
    ("Netherfield", r"Netherfield"),
    ("Longbourn", r"Longbourn"),
    ("Pemberley", r"Pemberley"),
    ("Rosings", r"Rosings"),
    ("Meryton", r"Meryton"),
    ("Hunsford", r"Hunsford"),
]
SPEECH_VERBS = (r"said|says|cried|replied|returned|answered|continued|added|observed|"
                r"exclaimed|asked|resumed|repeated|rejoined|whispered|interrupted|"
                r"thought|began|went on|called|spoke|reply|answer")


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


def main(path, extra):
    sys.stdout.reconfigure(encoding="utf-8")
    raw = open(path, "rb").read()
    print("file:", path)
    print("SHA-256:", hashlib.sha256(raw).hexdigest())
    text = raw.decode("utf-8").replace("\r\n", "\n")
    hdr = re.search(r"Release date: .*\n.*Most recently updated: .*", text)
    print("header:", " ".join(hdr.group(0).split()) if hdr else "(no header line)")
    start = re.search(r"^\*\*\* ?START OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M)
    end = re.search(r"^\*\*\* ?END OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M)
    body = text[start.end():end.start()]

    c1 = len(body.split())
    c2 = len([t for t in body.split() if WORD.search(t)])

    heads = list(CHAPTER_HEAD.finditer(body))
    print("chapter headings found:", len(heads), "| first:", heads[0].group(0).strip(),
          "| last:", heads[-1].group(0).strip())
    last_line = body.index("the means of uniting them.") + len("the means of uniting them.")
    novel = body[heads[0].start():last_line]
    front = body[:heads[0].start()]
    c3 = len([t for t in novel.split() if WORD.search(t)])
    c4 = len(words(novel))

    chapters = []
    for i, h in enumerate(heads):
        seg_end = heads[i + 1].start() if i + 1 < len(heads) else last_line
        seg = body[h.end():seg_end]
        seg = ILLUS.sub(" ", seg)
        # a chapter's heading can sit inside an illustration bracket ("[Illustration: ... Chapter I.]"):
        # drop any unmatched illustration opener left at the end of the previous chapter and a stray "]"
        seg = re.sub(r"\[Illustration[^\]]*$", " ", seg, flags=re.S)
        seg = seg.replace("]", " ")
        seg = seg.replace("_", "")
        chapters.append((roman(h.group(1)), seg))
    nums = [n for n, _ in chapters]
    assert nums == list(range(1, 62)), nums
    story = "\n\n".join(s for _, s in chapters)
    c5 = len(words(story))

    pre = re.search(r"^PREFACE\.\s*$", front, re.M)
    lst = front.find("[Illustration: List of Illustrations.]")
    preface = ILLUS.sub(" ", front[pre.end():lst]).replace("_", "") if pre and lst > 0 else ""
    c6 = len(words(preface))

    print("\n1. whitespace tokens between markers:", f"{c1:,}")
    print("2. tokens with a letter/digit between markers:", f"{c2:,}")
    print("3. novel only (CHAPTER I heading to the last sentence), tokens with a letter/digit:", f"{c3:,}")
    print("4. as 3, also splitting on '--' and em dashes:", f"{c4:,}")
    print("5. as 4, without illustration captions, brackets and chapter headings (FIGURE USED):", f"{c5:,}")
    print("6. Saintsbury's preface alone:", f"{c6:,}", "| novel + preface:", f"{c5 + c6:,}")
    print("   site figure", f"{SITE_WORDS:,}", "differs from count 5 by", f"{SITE_WORDS - c5:+,}",
          f"({(SITE_WORDS - c5) / c5:+.1%})")
    captions = ILLUS.findall(novel)
    print("   illustration blocks inside the novel:", len(captions), "| their words:",
          sum(len(words(c)) for c in captions))

    counts = [(n, len(words(s))) for n, s in chapters]
    vols = {"Volume I (Ch. 1-23)": range(1, 24), "Volume II (Ch. 24-42)": range(24, 43),
            "Volume III (Ch. 43-61)": range(43, 62)}
    print("\nStructure (count 5):")
    for label, rng in vols.items():
        w = sum(c for n, c in counts if n in rng)
        print(f"  {label}: {len(rng)} chapters, {w:,} words, {fmt_hm(w / 151)} at 151 wpm")
    for n, c in counts:
        print(f"CH\t{n}\t{c}\t" + " ".join(words(chapters[n - 1][1])[:9]))
    ns = [c for _, c in counts]
    print("  chapters:", len(ns), "| mean", round(statistics.mean(ns)), "| median", round(statistics.median(ns)),
          "| min", min(ns), "| max", max(ns))
    by_len = sorted(counts, key=lambda x: x[1])
    print("  5 shortest (chapter, words):", by_len[:5])
    print("  5 longest (chapter, words):", by_len[-5:])
    print(f"  mean chapter at 151 wpm: {statistics.mean(ns) / 151:.1f} min; median {statistics.median(ns) / 151:.1f} min;"
          f" shortest {min(ns) / 151:.1f} min; longest {max(ns) / 151:.1f} min")
    print("  chapters under 10 minutes at 151 wpm:", sum(1 for c in ns if c / 151 < 10), "of", len(ns))

    print("\nListening time:")
    for label, n_words in (("count 5", c5), ("site figure", SITE_WORDS)):
        for wpm_label, wpm in (("151 wpm", 151), ("155 wpm (ACX)", 9300 / 60)):
            cells = "; ".join(f"{s}x {fmt_hm(n_words / wpm / s)}" for s in (1, 1.25, 1.5, 2))
            print(f"  {label} {n_words:,} words at {wpm_label}: {cells}")

    print("\nRecordings: runtime, time at 1.25x / 1.5x / 2x, implied words a minute (count 5; site figure):")
    for label, rt in {**RUNTIMES, **extra}.items():
        mins = hms_to_min(rt)
        speeds = " / ".join(fmt_hm(mins / s) for s in (1.25, 1.5, 2))
        print(f"  {label}: {rt} ({fmt_hm(mins)}) -> {speeds} | {c5 / mins:.1f} wpm; {SITE_WORDS / mins:.1f} wpm")

    # Dialogue: words inside curly double quotes; unattributed speech paragraphs, i.e. a
    # paragraph that opens with a quotation mark and has no text outside the quotes, or only
    # text with neither a speech verb nor a capitalised word (a name). Rough: Darcy's letter
    # is quoted too, and a run is broken by any narrated paragraph.
    paras_all = []
    for n, s in chapters:
        for p in re.split(r"\n\s*\n", s):
            if p.strip():
                paras_all.append((n, " ".join(p.split())))
    inside = 0
    unattributed = 0
    speech_paras = 0
    runs, run, run_start = [], 0, None
    for n, p in paras_all:
        quoted = re.findall(r"“([^”]*)(?:”|$)", p)
        w = sum(len(words(q)) for q in quoted)
        inside += w
        if p.startswith("“"):
            speech_paras += 1
            outside = re.sub(r"“[^”]*(?:”|$)", " ", p)
            named = re.search(SPEECH_VERBS, outside) or re.search(r"[A-Z][a-z]+", outside.strip())
            if not outside.strip() or not named:
                unattributed += 1
                if run == 0:
                    run_start = (n, p[:80])
                run += 1
                continue
        if run:
            runs.append((run, run_start))
        run = 0
    if run:
        runs.append((run, run_start))
    print(f"\nDialogue: {inside:,} of {c5:,} words inside “ ” = {inside / c5:.1%}")
    # Per volume (1813 division), to test Austen's remark that Volume II has "a larger
    # proportion of narrative"; Darcy's letter (Ch. 35, inside quotation marks) shown separately.
    letter_words = 0
    ch35_text = chapters[34][1]
    la, lb = ch35_text.find("Be not alarmed, madam"), ch35_text.find("FITZWILLIAM DARCY")
    if la >= 0 and lb > la:
        letter_words = len(words(ch35_text[la:lb + len("FITZWILLIAM DARCY")]))
    for label, rng in (("Volume I", range(1, 24)), ("Volume II", range(24, 43)), ("Volume III", range(43, 62))):
        vq = vw = 0
        for n, s in chapters:
            if n not in rng:
                continue
            vw += len(words(s))
            for p in re.split(r"\n\s*\n", s):
                vq += sum(len(words(q)) for q in re.findall(r"“([^”]*)(?:”|$)", " ".join(p.split())))
        extra_note = ""
        if label == "Volume II" and letter_words:
            extra_note = f"; without Darcy's letter ({letter_words:,} words): {(vq - letter_words) / (vw - letter_words):.1%}"
        print(f"  {label}: {vq:,} of {vw:,} words inside quotation marks = {vq / vw:.1%}{extra_note}")
    print(f"Paragraphs: {len(paras_all):,}; opening with a quotation mark: {speech_paras:,};"
          f" pure speech with no speaker or speech verb outside the quotes: {unattributed:,}"
          f" ({unattributed / speech_paras:.1%} of speech paragraphs)")
    runs.sort(key=lambda x: -x[0])
    print("  runs of 4 or more consecutive unattributed speech paragraphs:", sum(1 for r, _ in runs if r >= 4))
    for r, (n, first) in runs[:5]:
        print(f"  run of {r} in Ch. {n}, starting: {first}")
    sentences = [s for s in re.split(r"(?<=[.!?])[”’]?\s+", " ".join(story.split())) if WORD.search(s)]
    print("sentences (rough split on . ! ?):", f"{len(sentences):,}", "| mean words per sentence:",
          round(c5 / len(sentences), 1))
    print("first sentence:", sentences[0][:200], "|", len(words(sentences[0])), "words")

    # Letters: Darcy's letter (Ch. 35) and the word "letter".
    ch35 = chapters[34][1]
    a = ch35.find("Be not alarmed, madam")
    b = ch35.find("FITZWILLIAM DARCY")
    if a >= 0 and b > a:
        dl = words(ch35[a:b + len("FITZWILLIAM DARCY")])
        print(f"\nDarcy's letter (Ch. 35, 'Be not alarmed, madam' to the signature): {len(dl):,} words,"
              f" {len(dl) / 151:.1f} min at 151 wpm; Ch. 35 is {len(words(ch35)):,} words")
    print("'letter' / 'letters' in the novel:", count(r"letters?", story),
          "| chapters mentioning a letter:", sum(1 for _, s in chapters if count(r"letters?", s)))

    print("\nForms of address and names (novel text, whole words):")
    for label, pat in NAMES:
        print(f"  {label}: {count(pat, story)}")
    # Where "Miss Bennet" is not Jane: the chapter-by-chapter spread, and Ch. 56.
    mb = {n: count(r"Miss Bennet(?!s)", s) for n, s in chapters}
    print("  'Miss Bennet' by chapter (non-zero):", {k: v for k, v in mb.items() if v})
    for n in (56,):
        s = chapters[n - 1][1]
        hits = [m.start() for m in re.finditer(r"Miss\s+Bennet(?!s)", s)]
        print(f"  Ch. {n}: 'Miss Bennet' {len(hits)} times; contexts:")
        for h in hits:
            print("    …", " ".join(s[max(0, h - 90):h + 40].split()), "…")
    for n in range(1, 62):
        s = chapters[n - 1][1]
        if count(r"Fitzwilliam Darcy", s):
            print(f"  'Fitzwilliam Darcy' in Ch. {n}: {count(r'Fitzwilliam Darcy', s)}")
    print("  'Colonel Fitzwilliam' first chapter:",
          next((n for n, s in chapters if count(r"Colonel Fitzwilliam", s)), None))
    kit = {n: count(r"Kitty", s) for n, s in chapters}
    cath = {n: len(re.findall(r"(?<!Lady)(?<!Lady\s)\bCatherine\b", " ".join(s.split()))) for n, s in chapters}
    print("  'Catherine' without 'Lady' before it, by chapter (non-zero):", {k: v for k, v in cath.items() if v})
    print("  'Kitty' total:", sum(kit.values()))
    # Who calls Elizabeth "Eliza": speakers are not parsed; print contexts.
    for m in list(re.finditer(r"(?<![\w])Eliza(?!beth)", story))[:12]:
        print("    Eliza …", " ".join(story[max(0, m.start() - 70):m.start() + 30].split()), "…")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit("usage: python -I pp-wordcount.py <pg1342.txt> [label=h:mm:ss ...]")
    extra = dict(a.split("=", 1) for a in sys.argv[2:])
    main(sys.argv[1], extra)
