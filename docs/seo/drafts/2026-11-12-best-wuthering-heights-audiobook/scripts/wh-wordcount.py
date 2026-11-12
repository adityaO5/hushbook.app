"""Count words, chapters, narrators and Joseph's dialect in Project Gutenberg eBook #768
(Wuthering Heights, Emily Bronte).

Adapted from ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-wordcount.py
(same counting rules, so the figures compare with the War and Peace and Crime and
Punishment posts).

Usage (isolated mode, text file in its own folder):
    python -I wh-wordcount.py <path-to-pg768.txt>

Source file: https://www.gutenberg.org/cache/epub/768/pg768.txt
(downloaded 2026-11-12, header "Release date: December 1, 1996 [eBook #768]
Most recently updated: May 6, 2026", "Credits: David Price",
SHA-256 e533fe750589f0421d5d744576315f5c2b9b0d69e981179ea0551bbf134c5e02)

Counts reported, so the method is transparent:
  1. whitespace tokens between the START and END markers
  2. tokens with a letter or digit between the markers
  3. novel only: from the first "CHAPTER I" heading to the END marker; tokens with a letter or digit
  4. as 3, also splitting words joined by an em dash or "--"
  5. as 4, without the CHAPTER heading lines and the "* * * * *" break lines
     (count 5 is the figure to publish)
Also: words per chapter, listening time at 151 wpm (site median) at 1x/1.25x/1.5x/2x,
the words a minute implied by each recording's runtime, the Lockwood / Nelly split of the
narration (anchor phrases below), Isabella's letter, Joseph's speeches in dialect, and
name-form counts for the famous name confusion.
"""
import re
import statistics
import sys

WORD = re.compile(r"[A-Za-z0-9À-ɏ]")
SPLIT = re.compile(r"(?:\s|--|—)+")
CHAPTER_HEAD = re.compile(r"^CHAPTER [IVXLC]+\s*$", re.M)
BREAK = re.compile(r"^\* \* \* \* \*\*?\s*$", re.M)

# Runtimes read 2026-11-12 (Audible US catalogue API runtime_length_min, LibriVox API totaltime).
# label: minutes
RECORDINGS = {
    "Joanne Froggatt (Audible Studios 2017; includes a short introduction)": 752,
    "Janet McTeer and David Timson (Naxos 2006)": 788,
    "Patricia Routledge (Audible Studios 2012)": 855,
    "Emma Messenger (Trout Lake Media 2012)": 793,
    "Juliet Stevenson (silksoundbooks 2015)": 804,
    "Michael Kitchen (Audible Studios 2006)": 698,
    "Aimee Lou Wood and Kristin Atherton (Penguin Classics 2020)": 838,
    "Michael Page and Laural Merlington (Brilliance / AmazonClassics 2017)": 717,
    "Carolyn Seymour (Blackstone 2010)": 694,
    "Flo Gibson (Recorded Books 1999)": 675,
    "Anne Flosnik (Tantor 2008)": 739,
    "Judy Holt (2018)": 817,
    "Billie Fulford-Brown (Spotify Audiobooks 2024, Audible UK)": 818,
    "Kate Petrie (2015)": 661,
    "Ciaran Saward and Sherry Baines (Arcturus 2026)": 794,
    "Moira Quirk and Dan Stevens (Literati Audio 2026, listed unabridged)": 461,
    "LibriVox Version 2, Ruth Golding (solo, 14:48:42)": 14 * 60 + 48 + 42 / 60,
    "LibriVox Version 1, 14 readers (11:33:10)": 11 * 60 + 33 + 10 / 60,
    "LibriVox Version 3, dramatic reading (11:54:13)": 11 * 60 + 54 + 13 / 60,
}

# Where the narration passes between Lockwood (the frame) and Nelly Dean (the tale).
# Each anchor is the start of the text that a new narrator voices. Isabella's letter
# (Chapter 13) is told inside Nelly's narration and counted separately.
SWITCHES = [
    ("Before I came to live here, she commenced", "Nelly"),
    ("Thus interrupting herself, the housekeeper rose", "Lockwood"),
    ("On the morning of a fine June day my first bonny little nursling", "Nelly"),
    ("Mrs. Dean raised the candle, and I discerned", "Lockwood"),
    ("Catherine had kept up her acquaintance with the Lintons", "Nelly"),
    ("At this point of the housekeeper’s story she chanced", "Lockwood"),
    ("I got Miss Catherine and myself to Thrushcross Grange", "Nelly"),
    ("DEAR ELLEN, it begins", "Isabella (letter)"),
    ("—ISABELLA.", "Nelly"),
    ("Dree, and dreary! I reflected", "Lockwood"),
    ("In the evening, she said, the evening of my visit to the Heights", "Nelly"),
    ("“These things happened last winter, sir,” said Mrs. Dean", "Lockwood"),
    ("Edgar sighed; and, walking to the window", "Nelly"),
    ("Thus ended Mrs. Dean’s story.", "Lockwood"),
    ("I was summoned to Wuthering Heights, within a fortnight of your leaving", "Nelly"),
    ("“They are going to the Grange, then?” I said.", "Lockwood"),
]

# Yorkshire forms as Bronte spells them (lower case; apostrophes normalised to ').
DIALECT = set("""
t' th' i' o' wi' wi'out 'at 'bout 'em 'un 'ull 'll' un' an' nobbut maister maisters missis shoo hoo hor
wer yah yer yahr yerseln yerseld hisseln hersel' theirseln mysel' gooid gooidness sud mud mun munnot
noa nowt owt summut summat ech nay aye yon yonder aboon darnut cannut willn't wern't warn't dunnut
gie gied hev hes hed hevn't tuh tull ut uh ah ah'll ah's ah've ahr thah thee thy tha thysel' wisht
laith fowld flaysome neeght oppen mak' mak tak' tak gang gangs ganging girt lad lass bairn bairns
divil divvil dahn raight reight nobody's soa yeah thear heah hither 'ow 'em' sartin sattle starnill
aw awn bud whet whear whearas sich sud'nt wean awm i'st didnut doesn't'n coom com'd gooin' goan
'bide bide shaamed jocks ses hes'nt nor-ne hend wi't ye ye're ye'll ye've lanthern staling
""".split())

# Speaker of every dialect-dense quoted span, labelled by hand on 2026-11-12 from the
# narration around it (speech tags such as "said Joseph", "croaked Joseph", "shouted the
# ancient", "the tenant of the kitchen", "the religious elder"). Key: (chapter, first 20
# characters of the span). Unlabelled candidates print as "?" so a reviewer sees them.
LABELS = {}
for ch, speaker, prefixes in [
    (2, "Joseph", ["T’ maister’s down i’", "There’s nobbut t’ mi", "Nor-ne me! I’ll hae ", "Aw wonder how yah ca", "Maister, maister, he"]),
    (2, "Zillah", ["I wonder what you’ll"]),
    (3, "Joseph", ["T’ maister nobbut ju"]),
    (3, "skip (inside the Chapter 3 extra below)", ["Th’ Helmet o’ Salvat"]),
    (5, "old Mr. Earnshaw", ["I cannot love thee, "]),
    (9, "Joseph", ["And how isn’t that n", "Yon lad gets war und", "He’s left th’ gate a", "I sud more likker lo", "It ’ud be to more se",
               "Nay, nay, he’s noan ", "I’s niver wonder but", "If I war yah, maiste", "yah gooid fur nowt, "]),
    (10, "Joseph (quoted by Nelly)", ["we’s hae a crowner’s"]),
    (11, "Hareton (a child)", ["Damn the curate, and"]),
    (12, "Mary (a servant girl)", ["She’s gone, she’s go"]),
    (13, "Joseph", ["Mim! mim! mim! Did i", "None o’ me! I getten", "If there’s to be fre", "Hareton, thou willn’", "_parlour_! Nay, we’v",
                "It’s weel eneugh to ", "Yah’s see all t’ _be", "Oh! it’s Maister _Ha", "Couldn’t ye ha’ said", "Whear the divil?",
                "The Lord bless us! T", "Ech! ech!", "Weel done, Miss Cath", "They’s rahm for boat"]),
    (17, "Joseph", ["I’d rayther he’d goa"]),
    (19, "Joseph", ["It’s Maister Linton ", "Hathecliff has sent ", "Noa! that means naug", "To-morn, he’s come h"]),
    (20, "Joseph", ["he’s swopped wi’ ye,", "But Maister Hareton ", "yon dainty chap says"]),
    (20, "Heathcliff", ["None of that nonsens"]),
    (21, "Hareton", ["If thou weren’t more"]),
    (23, "Joseph", ["Na—ay! yah muh goa b"]),
    (24, "Joseph", ["I wer sure he’d sarv", "Thear, that’s t’ fat", "That’s father! We’ve"]),
    (24, "Hareton", ["Take her there if sh"]),
    (26, "a herd-boy", ["Maister Linton wer j"]),
    (27, "Hareton", ["oppen t’ door!"]),
    (32, "the old woman keeping the Grange", ["she doesn’t bide her", "Eea, Aw keep th’ hau", "T’ maister!", "Whet, whoiver knew y"]),
    (32, "Joseph", ["I’d rayther, by th’ ", "It’s a blazing shame", "he’s witched: I’m sa", "it warn’t a crying s", "Tak’ these in to t’ ",
                "and bide there. I’s ", "Ony books that yah l", "and it’ll be mitch i"]),
    (32, "Hareton", ["Get off wi’ ye!", "I’ll go to hell, bod"]),
    (33, "Joseph", ["I mun hev’ my wage, ", "I sudn’t shift for N"]),
    (33, "Hareton", ["Wisht! wisht!"]),
    (34, "Joseph", ["and he may hev’ his "]),
    (34, "a herd-boy", ["There’s Heathcliff a", "un’ I darnut pass ’e"]),
]:
    for pre in prefixes:
        LABELS[(ch, pre[:20])] = speaker

# Joseph's words the span parser cannot isolate (nested book titles in double quotes inside
# Catherine's diary; a short opening line below the density threshold). Verbatim, whitespace
# normalised; each must be found in the text.
JOSEPH_EXTRA = [
    (3, "Maister Hindley!"),
    (3, "Maister, coom hither! Miss Cathy’s riven th’ back off “Th’ Helmet o’ Salvation,” un’ Heathcliff’s "
        "pawsed his fit into t’ first part o’ “T’ Brooad Way to Destruction!” It’s fair flaysome that ye let ’em "
        "go on this gait. Ech! th’ owd man wad ha’ laced ’em properly—but he’s goan!"),
    (34, "Th’ divil’s harried off his soul,"),
]

# Name forms (whole words; a space matches any whitespace).
NAMES = [
    ("Catherine (any)", r"Catherine"),
    ("Cathy", r"Cathy"),
    ("Catherine Earnshaw", r"Catherine Earnshaw"),
    ("Catherine Linton", r"Catherine Linton"),
    ("Catherine Heathcliff", r"Catherine Heathcliff"),
    ("Miss Catherine", r"Miss Catherine"),
    ("Miss Cathy", r"Miss Cathy"),
    ("Mrs. Linton", r"Mrs\. Linton"),
    ("Mrs. Heathcliff", r"Mrs\. Heathcliff"),
    ("Heathcliff (any)", r"Heathcliff"),
    ("Mr. Heathcliff", r"Mr\. Heathcliff"),
    ("Linton (any: Edgar, Isabella, Linton Heathcliff, the parents)", r"Linton"),
    ("Linton Heathcliff", r"Linton Heathcliff"),
    ("Mr. Linton", r"Mr\. Linton"),
    ("Edgar", r"Edgar"),
    ("Isabella", r"Isabella"),
    ("Earnshaw (any)", r"Earnshaw"),
    ("Mr. Earnshaw", r"Mr\. Earnshaw"),
    ("Hindley", r"Hindley"),
    ("Hareton", r"Hareton"),
    ("Ellen", r"Ellen"),
    ("Nelly", r"Nelly"),
    ("Mrs. Dean", r"Mrs\. Dean"),
    ("Lockwood", r"Lockwood"),
    ("Joseph", r"Joseph"),
    ("Zillah", r"Zillah"),
    ("Frances", r"Frances"),
]


def words(text):
    return [t for t in SPLIT.split(text) if WORD.search(t)]


def fmt_hm(minutes):
    h = int(minutes // 60)
    m = int(round(minutes - h * 60))
    if m == 60:
        h, m = h + 1, 0
    return f"{h} h {m:02d} min"


def norm(tok):
    t = tok.lower().replace("’", "'").replace("‘", "'")
    return re.sub(r"^[^\w']+|[^\w']+$", "", t)


def dialect_tokens(text):
    toks = [norm(t) for t in SPLIT.split(text) if WORD.search(t)]
    hits = [t for t in toks if t in DIALECT or (t.endswith("'") and len(t) <= 4 and t not in ("o'",)) or t in ("o'",)]
    return toks, hits


def quote_spans(par):
    """Double-quoted spans, and inside them single-quoted spans (Bronte's nested speech).
    A single closing quote is a ’ preceded by , . ! ? — or ” (an elision such as t’ is
    preceded by a letter)."""
    spans = []
    for m in re.finditer(r"“([^“”]*)(?:”|$)", par):
        inner = m.group(1)
        nested = re.findall(r"(?:^|(?<=[\s“—(]))‘(.+?[,.!?—])’(?=[\s,.;:!?—”]|$)", inner, re.S)
        if nested:
            spans.extend(nested)
            rest = re.sub(r"(?:^|(?<=[\s“—(]))‘(.+?[,.!?—])’(?=[\s,.;:!?—”]|$)", " ", inner, flags=re.S)
            spans.append(("OUTER", rest))
        else:
            spans.append(inner)
    return spans


def main(path):
    sys.stdout.reconfigure(encoding="utf-8")
    text = open(path, encoding="utf-8").read()
    start = re.search(r"^\*\*\* ?START OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M)
    end = re.search(r"^\*\*\* ?END OF TH(E|IS) PROJECT GUTENBERG EBOOK.*$", text, re.M)
    body = text[start.end():end.start()]
    c1 = len(body.split())
    c2 = len([t for t in body.split() if WORD.search(t)])
    m = re.search(r"^CHAPTER I\s*$", body, re.M)
    novel = body[m.start():]
    c3 = len([t for t in novel.split() if WORD.search(t)])
    c4 = len(words(novel))
    clean = BREAK.sub("", CHAPTER_HEAD.sub("", novel))
    c5 = len(words(clean))
    print("file:", path)
    print("1. whitespace tokens between markers:", f"{c1:,}")
    print("2. tokens with a letter/digit between markers:", f"{c2:,}")
    print("   front matter (title, author) tokens:", len(words(body[:m.start()])))
    print("3. novel only, tokens with a letter/digit:", f"{c3:,}")
    print("4. as 3, also splitting on '--' and em dashes:", f"{c4:,}")
    print("5. as 4, without CHAPTER headings and break lines:", f"{c5:,}   <- publish this")
    print("   chapter headings:", len(CHAPTER_HEAD.findall(novel)), "| '* * * * *' break lines:", len(BREAK.findall(novel)))

    chaps = CHAPTER_HEAD.split(novel)[1:]
    counts = [len(words(BREAK.sub("", c))) for c in chaps]
    print("\nChapters:", len(counts), "| sum of chapter words:", f"{sum(counts):,}")
    for i, n in enumerate(counts, 1):
        print(f"  CH {i:>2}: {n:>6,} words, {n / 151:5.1f} min at 151 wpm")
    print("  mean", round(statistics.mean(counts)), "median", round(statistics.median(counts)),
          "min", min(counts), f"(ch {counts.index(min(counts)) + 1})", "max", max(counts), f"(ch {counts.index(max(counts)) + 1})")
    print(f"  mean chapter at 151 wpm: {statistics.mean(counts) / 151:.1f} min; longest {max(counts) / 151:.1f} min; shortest {min(counts) / 151:.1f} min")

    print("\nListening time for", f"{c5:,}", "words at 151 wpm (site median):")
    for sp in (1, 1.25, 1.5, 2):
        print(f"  {sp}x: {fmt_hm(c5 / 151 / sp)}")
    print("  days to finish (rounded up):")
    for sp in (1, 1.25, 1.5, 2):
        mins = c5 / 151 / sp
        print(f"    {sp}x: " + ", ".join(f"{per} min a day: {-(-mins // per):.0f} days" for per in (30, 60)))

    print("\nWords a minute implied by each runtime (count 5 / runtime), and the runtime at 1.25x / 1.5x / 2x:")
    for label, mins in sorted(RECORDINGS.items(), key=lambda kv: kv[1]):
        print(f"  {label}: {fmt_hm(mins)} -> {c5 / mins:.0f} wpm | 1.25x {fmt_hm(mins / 1.25)} | 1.5x {fmt_hm(mins / 1.5)} | 2x {fmt_hm(mins / 2)}")
    rates = [c5 / v for k, v in RECORDINGS.items() if "Quirk" not in k]
    print(f"  complete recordings (Quirk/Stevens excluded): {min(rates):.0f} to {max(rates):.0f} wpm, median {statistics.median(rates):.0f}")

    # Narrators
    pos = []
    for anchor, who in SWITCHES:
        i = clean.find(anchor)
        if i < 0:
            sys.exit("anchor not found: " + anchor)
        pos.append((i, who, anchor))
    pos.sort()
    segs = [(0, "Lockwood", "(opening)")] + pos
    totals = {}
    print("\nNarration segments (anchor -> narrator, words):")
    for k, (i, who, anchor) in enumerate(segs):
        j = segs[k + 1][0] if k + 1 < len(segs) else len(clean)
        n = len(words(clean[i:j]))
        ch = len(CHAPTER_HEAD.findall(novel[: novel.find(anchor) if anchor != "(opening)" else 0])) if anchor != "(opening)" else 1
        totals[who] = totals.get(who, 0) + n
        print(f"  ch {ch:>2} {who:<18} {n:>6,}  from: {anchor[:60]}")
    for who, n in totals.items():
        print(f"  TOTAL {who}: {n:,} words = {n / c5:.1%} ({fmt_hm(n / 151)} at 151 wpm)")

    # Dialect speech: candidates = quoted spans with >= 2 Yorkshire forms and >= 8% of tokens
    # in DIALECT; speaker from the hand-labelled LABELS table.
    paras = [p for p in re.split(r"\n\s*\n", novel)]
    chap_no = 0
    cands = []  # (chapter, para index, tokens, hits, speaker, text)
    for pi, p in enumerate(paras):
        if CHAPTER_HEAD.match(p.strip()):
            chap_no += 1
            continue
        flat = " ".join(p.split())
        if not flat:
            continue
        for sp in quote_spans(flat):
            s = sp[1] if isinstance(sp, tuple) else sp
            toks, hits = dialect_tokens(s)
            if len(toks) < 2 or len(hits) < 2 or len(hits) / len(toks) < 0.08:
                continue
            who = LABELS.get((chap_no, s[:20]), "?")
            cands.append((chap_no, pi, len(toks), len(hits), who, s))
    flat_novel = " ".join(novel.split())
    extra = []
    for ch, s in JOSEPH_EXTRA:
        if s not in flat_novel:
            sys.exit("JOSEPH_EXTRA not found: " + s[:60])
        toks, hits = dialect_tokens(s)
        pi = next(i for i, p in enumerate(paras) if s[:30] in " ".join(p.split()))
        extra.append((ch, pi, len(toks), len(hits), "Joseph", s))
    jos = [c for c in cands if c[4].startswith("Joseph")] + extra
    jos.sort(key=lambda c: (c[0], c[1]))
    jw = sum(c[2] for c in jos)
    jh = sum(c[3] for c in jos)
    # A "speech" = Joseph's quoted spans in one paragraph (split only by "he said" tags).
    turns = {(c[0], c[1]) for c in jos}
    by = {}
    for c in jos:
        by[c[0]] = by.get(c[0], 0) + c[2]
    print(f"\nJoseph's speech in dialect (hand-labelled): {len(turns)} speeches ({len(jos)} quoted spans), "
          f"{jw:,} words = {jw / c5:.2%} of the novel ({jw / 151:.1f} min at 151 wpm); "
          f"{jh} of those words are Yorkshire forms ({jh / jw:.0%})")
    print(f"  chapters: {len(by)} -> words by chapter {by}")
    print(f"  longest speech span: {max(c[2] for c in jos)} words (chapter {max(jos, key=lambda c: c[2])[0]})")
    for c in jos:
        print(f"  J ch{c[0]:>2} {c[2]:>3}w {c[3]:>2}d  {c[5][:100]}")
    others = [c for c in cands if not c[4].startswith("Joseph")]
    sp = {}
    for c in others:
        sp.setdefault(c[4], [0, 0])
        sp[c[4]][0] += 1
        sp[c[4]][1] += c[2]
    print("\nOther dialect-dense spans by speaker (spans, words):", sp)
    for c in others:
        print(f"  O ch{c[0]:>2} {c[4]:<34} {c[2]:>3}w  {c[5][:80]}")

    print("\nName forms (whole words, novel text):")
    for label, pat in NAMES:
        pat2 = pat.replace(" ", r"\s+")
        n = len(re.findall(r"(?<![\wÀ-ÿ])(?:" + pat2 + r")(?![\wÀ-ÿ])", clean))
        print(f"  {label}: {n}")
    mh = [i + 1 for i, c in enumerate(chaps) if re.search(r"Mrs\.\s+Heathcliff", c)]
    print("  chapters with 'Mrs. Heathcliff':", mh)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: python -I wh-wordcount.py <pg768.txt>")
    main(sys.argv[1])
