"""Word count, structure, French share and name forms for the Russian text of War and Peace.

Adapted from ../../2026-11-11-best-crime-and-punishment-audiobook/scripts/russian-wordcount.py.

Source: Russian Wikisource, "Война и мир (Толстой)", five pages (Том 1 to Том 4, Эпилог),
each a ProofreadPage transclusion of the Jubilee edition: Толстой Л. Н., Полное собрание
сочинений в 90 томах, тт. 9-12 (Москва, 1937-1940). The text is in modern spelling and keeps
Tolstoy's French in Latin script, with Russian translations in footnotes.

Usage (run in isolated mode; the download folder must be a new, empty folder that holds
nothing but the downloaded JSON):
    python -I wp-russian-wordcount.py fetch <download-folder>
    python -I wp-russian-wordcount.py count <download-folder>

`fetch` saves the rendered HTML of each page (MediaWiki API action=parse) as volN.json.
`count` keeps only the transcluded text (div.prp-pages-output), drops page-number links,
footnote markers and the footnote list (the editors' Russian translations of the French),
then reports:
  - words per part and in total (tokens with a Cyrillic or Latin letter or a digit,
    splitting on whitespace and on em/en dashes)
  - parts and chapters (chapters are the centred Roman numerals)
  - Latin-script words (tokens with a Latin letter and no Cyrillic letter): Tolstoy's French,
    plus some German and Latin; a rough German share from common German function words
  - counts of the main characters' name forms (stem + any case ending)
"""
import html
import json
import os
import re
import statistics
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = "https://ru.wikisource.org/w/api.php"
PAGES = [
    ("vol1", "Война и мир (Толстой)/Том 1"),
    ("vol2", "Война и мир (Толстой)/Том 2"),
    ("vol3", "Война и мир (Толстой)/Том 3"),
    ("vol4", "Война и мир (Толстой)/Том 4"),
    ("epilogue", "Война и мир (Толстой)/Эпилог"),
]
UA = {"User-Agent": "word-count-research-script/1.0"}

WORD = re.compile(r"[A-Za-z0-9À-ɏЀ-ӿ]")
CYR = re.compile(r"[Ѐ-ӿ]")
LAT = re.compile(r"[A-Za-zÀ-ɏ]")
SPLIT = re.compile(r"(?:\s|—|–|--)+")
LOOKALIKE = str.maketrans({"Х": "X", "І": "I", "С": "C", "Ѵ": "V", "Ι": "I"})
GERMAN = {"und", "ich", "der", "die", "das", "nicht", "ist", "sie", "ein", "eine", "mit",
          "zu", "es", "wie", "so", "was", "auf", "den", "dem", "des", "wir", "ja", "mein",
          "gott", "kopf", "wohl", "schön", "aber", "hat", "haben", "sind", "war", "auch",
          "doch", "noch", "nur", "man", "erste", "kolonne", "marschiert", "zweite"}

NAMES = [
    # Pierre
    ("Пьер (any case)", r"Пьер(?:а|у|ом|е)?(?![А-Яа-яЁё])"),
    ("Pierre (Latin script, in French speech)", r"Pierre"),
    ("Петр / Пётр Кириллович (any case)", r"П[её]тр\w* Кириллович\w*"),
    ("Петр / Пётр Кирилыч (spoken short patronymic)", r"П[её]тр\w* Кирилыч\w*"),
    ("граф Безухов (any case)", r"граф\w* Безухов(?!а)\w*"),
    ("Безухов* (any case, includes Безухова)", r"Безухов\w*"),
    # Natasha
    ("Наташа (any case)", r"Наташ(?:а|и|е|у|ей|ею|ечка|еньк\w*)?(?![А-Яа-яЁё])"),
    ("Наталья Ильинична (any case)", r"Натали?ь?\w* Ильиничн\w*"),
    ("Natalie / Nathalie (Latin script)", r"Nat(?:h)?alie"),
    ("Наталья / Натали (any case, any context; includes the mother, Наталья Ильинишна)", r"Натал(?:ья|ьи|ье|ью|ией|ией|и)(?![А-Яа-яЁё])"),
    ("Ростова (feminine surname, any case)", r"Ростов(?:а|ой|у)(?![А-Яа-яЁё])"),
    # Andrei
    ("князь Андрей (any case)", r"княз\w* Андре(?:й|я|ю|ем|е)(?![А-Яа-яЁё])"),
    ("Андрей (any case, any context)", r"Андре(?:й|я|ю|ем|е)(?![А-Яа-яЁё])"),
    ("André (Latin script)", r"André"),
    ("Андрюша (any case)", r"Андрюш\w*"),
    ("Болконский (masculine, any case)", r"Болконск(?:ий|ого|ому|им|ом)(?![А-Яа-яЁё])"),
    # Nikolai
    ("Николай (any case)", r"Никола(?:й|я|ю|ем|е)(?![А-Яа-яЁё])"),
    ("Николенька (any case)", r"Николеньк\w*"),
    ("Николушка (any case)", r"Николушк\w*"),
    ("Nicolas (Latin script)", r"Nicolas"),
    ("Ростов (masculine, any case)", r"Ростов(?:а(?![А-Яа-яЁё])|у|ым|е)?(?![А-Яа-яЁёыои])"),
    # Marya
    ("княжна Марья (any case)", r"княжн\w* Марь(?:я|и|е|ю|ей|ею)(?![А-Яа-яЁё])"),
    ("Марья (any case, any context; includes Марья Дмитриевна Ахросимова)", r"Марь(?:я|и|е|ю|ей|ею)(?![А-Яа-яЁё])"),
    ("Марья Дмитриевна (any case)", r"Марь\w* Дмитриевн\w*"),
    ("Мари (Cyrillic)", r"Мари(?![А-Яа-яЁё])"),
    ("Marie (Latin script)", r"Marie"),
    ("Маша (any case)", r"Маш(?:а|и|е|у|ей|ею|енька|еньк\w*)(?![А-Яа-яЁё])"),
    # Others
    ("Соня (any case)", r"Сон(?:я|и|е|ю|ей|ею|ечк\w*)(?![А-Яа-яЁё])"),
    ("Sophie (Latin)", r"Sophie"),
    ("Элен (Cyrillic)", r"Элен(?![А-Яа-яЁё])"),
    ("Hélène (Latin)", r"Hélène"),
    ("Петя (any case)", r"Пет(?:я|и|е|ю|ей|ею)(?![А-Яа-яЁё])"),
    ("Кутузов (any case)", r"Кутузов\w*"),
    ("Наполеон (any case)", r"Наполеон\w*"),
    ("Бонапарт* (any case)", r"Бонапарт\w*"),
    ("Буонапарте (Cyrillic)", r"Буонапарт\w*"),
]


def api_get(params):
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers=UA)
    for attempt in range(6):
        try:
            with urllib.request.urlopen(req, timeout=300) as r:
                return r.read().decode("utf-8")
        except urllib.error.HTTPError as e:
            if e.code != 429:
                raise
            time.sleep(10 * (attempt + 1))
    raise RuntimeError("rate limited: " + url)


def fetch(folder):
    os.makedirs(folder, exist_ok=True)
    for key, title in PAGES:
        raw = api_get({"action": "parse", "page": title, "prop": "text|revid",
                       "format": "json", "formatversion": "2"})
        with open(os.path.join(folder, key + ".json"), "w", encoding="utf-8") as fh:
            fh.write(raw)
        print("saved", key, len(raw))
        time.sleep(3)


def clean(page_html):
    m = re.search(r'<div class="prp-pages-output"[^>]*>(.*)', page_html, re.S)
    t = m.group(1) if m else page_html
    t = re.split(r'<div class="mw-references-wrap|<ol class="references"', t)[0]
    t = re.sub(r'<sup[^>]*class="reference"[^>]*>.*?</sup>', " ", t, flags=re.S)
    t = re.sub(r'<span><span class="noprint ws-noexport pagenumber".*?</span></span>', " ", t, flags=re.S)
    t = re.sub(r"<style[^>]*>.*?</style>", " ", t, flags=re.S)
    # mark structure before stripping tags. Part headings are <h3>; chapter headings are
    # <div role="heading" class="header3">II.</div> (some typed with Cyrillic look-alike
    # letters, e.g. "ХХІV."); a few parts print their first "I." as plain text instead.
    t = re.sub(r"<h[2-4][^>]*>(.*?)</h[2-4]>", lambda mm: "\n@@PART " + re.sub(r"<[^>]+>", "", mm.group(1)).strip() + "\n", t, flags=re.S)

    def head(mm):
        txt = re.sub(r"<[^>]+>", "", mm.group(1)).strip()
        roman = txt.translate(LOOKALIKE).rstrip(".").strip()
        if re.fullmatch(r"[IVXLC]+", roman):
            return f"\n@@CHAP {roman}\n"
        return "\n@@PART " + txt + "\n"
    t = re.sub(r'<div role="heading"[^>]*class="header\d"[^>]*>(.*?)</div>', head, t, flags=re.S)
    t = re.sub(r"<center>\s*([IVXLC]+)\.?\s*</center>", r"\n@@CHAP \1\n", t)
    t = re.sub(r'<div class="div-center">\s*([IVXLC]+)\.?\s*</div>', r"\n@@CHAP \1\n", t)
    t = re.sub(r"(\n@@PART [^\n]*\n)((?:\s|<[^>]+>)*)I\.\s", r"\1\n@@CHAP I\n\2", t)
    t = re.sub(r"<br\s*/?>", "\n", t)
    t = re.sub(r"</p>", "\n\n", t)
    t = re.sub(r"<[^>]+>", " ", t)
    return html.unescape(t).replace("\xa0", " ")


def count(folder):
    texts = []
    for key, title in PAGES:
        with open(os.path.join(folder, key + ".json"), encoding="utf-8") as fh:
            d = json.load(fh)
        texts.append((key, d["parse"].get("revid"), clean(d["parse"]["text"])))
    total = 0
    latin_total = 0
    german_total = 0
    chapters = []  # (volume, part, chapter, words)
    parts_summary = []
    alltext = []
    for key, revid, t in texts:
        print(f"{key}: revid {revid}")
        segs = re.split(r"\n@@(PART [^\n]*|CHAP [IVXLC]+)\n", t)
        part = "(before first heading)"
        cur_chap = None
        buf = []

        def flush():
            if cur_chap is not None:
                toks = [w for w in SPLIT.split(" ".join(buf)) if WORD.search(w)]
                chapters.append((key, part, cur_chap, len(toks), toks))

        pre = segs[0]
        if pre.strip():
            toks = [w for w in SPLIT.split(pre) if WORD.search(w)]
            if toks:
                print("  text before first heading:", len(toks), "tokens:", " ".join(toks[:12]))
        for i in range(1, len(segs), 2):
            head, body = segs[i], segs[i + 1]
            if head.startswith("PART"):
                flush()
                cur_chap, buf = None, []
                part = head[5:].strip()
                rest = [w for w in SPLIT.split(body) if WORD.search(w)]
                if len(rest) > 100:
                    # the edition prints no "I." here: the text up to "II." is chapter I
                    print(f"  part '{part}' in {key}: {len(rest)} words before the first numbered chapter,"
                          " counted as chapter I:", " ".join(rest[:10]))
                    cur_chap, buf = "I (no heading)", [body]
                elif rest:
                    print(f"  words after part heading '{part}' before first chapter:", len(rest), " ".join(rest[:15]))
            else:
                flush()
                cur_chap, buf = head[5:], [body]
        flush()
        alltext.append(t)
    # summarise
    by_part = {}
    for vol, part, chap, n, toks in chapters:
        by_part.setdefault((vol, part), []).append(n)
        total += n
        for w in toks:
            if LAT.search(w) and not CYR.search(w):
                latin_total += 1
                if re.sub(r"[^\wäöüß]", "", w.lower()) in GERMAN:
                    german_total += 1
    for vol, part, chap, n, toks in chapters:
        # one line per chapter, read by wp-chapter-align.py
        print(f"CH\t{vol} {part}\t{chap}\t{n}\t" + " ".join(toks[:8]))
    print("\nParts and chapters:")
    for (vol, part), ns in by_part.items():
        print(f"  {vol} | {part}: {len(ns)} chapters, {sum(ns):,} words")
    ns = [c[3] for c in chapters]
    print("total chapters:", len(ns))
    print("total words:", f"{total:,}")
    print("chapter length: mean", round(statistics.mean(ns)), "median", round(statistics.median(ns)),
          "min", min(chapters, key=lambda c: c[3])[:4], "max", max(chapters, key=lambda c: c[3])[:4])
    print(f"Latin-script tokens (no Cyrillic letter): {latin_total:,} = {latin_total / total:.2%} of all words")
    print(f"  of which common German function words (rough floor for German): {german_total:,}")
    # chapters with the most Latin-script words
    lat_by_chap = []
    for vol, part, chap, n, toks in chapters:
        lat = sum(1 for w in toks if LAT.search(w) and not CYR.search(w))
        lat_by_chap.append((lat, lat / n if n else 0, vol, part, chap, n))
    lat_by_chap.sort(reverse=True)
    print("  chapters with most Latin-script words:")
    for row in lat_by_chap[:6]:
        print(f"    {row[2]} | {row[3]} | ch {row[4]}: {row[0]:,} of {row[5]:,} ({row[1]:.0%})")
    vol1_part1 = [c for c in chapters if c[0] == "vol1"]
    first = vol1_part1[0]
    print("first words of Vol 1 Part 1 Ch I:", " ".join(first[4][:40]))
    whole = "\n".join(alltext)
    whole = re.sub(r"\n@@(PART [^\n]*|CHAP [IVXLC]+)\n", "\n", whole)
    print("\nName forms (whole text, stem + any case ending):")
    for label, pat in NAMES:
        pat = pat.replace(" ", r"\s+")
        print(f"  {label}: {len(re.findall(r'(?<![А-Яа-яЁёA-Za-zÀ-ÿ])' + pat, whole))}")


if __name__ == "__main__":
    if len(sys.argv) != 3 or sys.argv[1] not in ("fetch", "count"):
        sys.exit("usage: python -I wp-russian-wordcount.py fetch|count <download-folder>")
    sys.stdout.reconfigure(encoding="utf-8")
    if sys.argv[1] == "fetch":
        fetch(sys.argv[2])
    else:
        count(sys.argv[2])
