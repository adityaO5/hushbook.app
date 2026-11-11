"""Complete Russian word count of War and Peace from ilibrary.ru (one page per chapter, 361 pages).

Why a second Russian source: the Wikisource text used by wp-russian-wordcount.py stops part-way
through Vol. 3, Part 3, Ch. XXXIII (it has 360 chapter headings and lacks Ch. XXXIV). ilibrary.ru
("Лев Толстой. Война и мир", https://ilibrary.ru/text/11/index.html) lists all 361 chapters.

Usage (run in isolated mode; the download folder must be a new, empty folder):
    python -I wp-russian-ilibrary.py fetch <download-folder>
    python -I wp-russian-ilibrary.py count <download-folder>

`fetch` saves index.html and p001.html ... p361.html (pages are windows-1251).
`count` keeps the chapter text (from the chapter heading to the footnote block), drops the
footnote markers and the footnotes (Russian translations of the French), and reports words per
part, chapters per part, chapter-length statistics, and Latin-script words (Tolstoy's French,
plus some German and Latin). Same token rules as wp-russian-wordcount.py.
"""
import html
import os
import re
import statistics
import sys
import time
import urllib.request

BASE = "https://ilibrary.ru/text/11/"
UA = {"User-Agent": "Mozilla/5.0 (word-count research script)"}
WORD = re.compile(r"[A-Za-z0-9À-ɏЀ-ӿ]")
CYR = re.compile(r"[Ѐ-ӿ]")
LAT = re.compile(r"[A-Za-zÀ-ɏ]")
SPLIT = re.compile(r"(?:\s|—|–|--)+")

# Same patterns as wp-russian-wordcount.py (stem + case endings; Latin-script forms occur
# inside Tolstoy's French).
NAMES = [
    ("Пьер (any case)", r"Пьер(?:а|у|ом|е)?(?![А-Яа-яЁё])"),
    ("Pierre (Latin script, in French speech)", r"Pierre"),
    ("Петр / Пётр Кириллович (any case)", r"П[её]тр\w* Кириллович\w*"),
    ("Петр / Пётр Кирилыч (spoken short patronymic)", r"П[её]тр\w* Кирилыч\w*"),
    ("граф Безухов (any case)", r"граф\w* Безухов(?!а)\w*"),
    ("Безухов* (any case, includes Безухова)", r"Безухов\w*"),
    ("Наташа (any case)", r"Наташ(?:а|и|е|у|ей|ею|ечка|еньк\w*)?(?![А-Яа-яЁё])"),
    ("Наталья Ильинична (any case)", r"Натали?ь?\w* Ильиничн\w*"),
    ("Natalie / Nathalie (Latin script)", r"Nat(?:h)?alie"),
    ("Ростова (feminine surname, any case)", r"Ростов(?:а|ой|у)(?![А-Яа-яЁё])"),
    ("князь Андрей (any case)", r"княз\w* Андре(?:й|я|ю|ем|е)(?![А-Яа-яЁё])"),
    ("Андрей (any case, any context)", r"Андре(?:й|я|ю|ем|е)(?![А-Яа-яЁё])"),
    ("André (Latin script)", r"André"),
    ("Андрюша (any case)", r"Андрюш\w*"),
    ("Болконский (masculine, any case)", r"Болконск(?:ий|ого|ому|им|ом)(?![А-Яа-яЁё])"),
    ("Николай (any case)", r"Никола(?:й|я|ю|ем|е)(?![А-Яа-яЁё])"),
    ("Николенька (any case)", r"Николеньк\w*"),
    ("Николушка (any case)", r"Николушк\w*"),
    ("Nicolas (Latin script)", r"Nicolas"),
    ("Ростов (masculine, any case)", r"Ростов(?:а(?![А-Яа-яЁё])|у|ым|е)?(?![А-Яа-яЁёыои])"),
    ("княжна Марья (any case)", r"княжн\w* Марь(?:я|и|е|ю|ей|ею)(?![А-Яа-яЁё])"),
    ("Марья (any case, any context)", r"Марь(?:я|и|е|ю|ей|ею)(?![А-Яа-яЁё])"),
    ("Марья Дмитриевна (any case)", r"Марь\w* Дмитриевн\w*"),
    ("Мари (Cyrillic)", r"Мари(?![А-Яа-яЁё])"),
    ("Marie (Latin script)", r"Marie"),
    ("Маша (any case)", r"Маш(?:а|и|е|у|ей|ею|енька|еньк\w*)(?![А-Яа-яЁё])"),
    ("Соня (any case)", r"Сон(?:я|и|е|ю|ей|ею|ечк\w*)(?![А-Яа-яЁё])"),
    ("Элен (Cyrillic)", r"Элен(?![А-Яа-яЁё])"),
    ("Петя (any case)", r"Пет(?:я|и|е|ю|ей|ею)(?![А-Яа-яЁё])"),
    ("Кутузов (any case)", r"Кутузов\w*"),
    ("Наполеон (any case)", r"Наполеон\w*"),
]


def get(url):
    req = urllib.request.Request(url, headers=UA)
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except Exception:  # network hiccup: back off and retry
            time.sleep(5 * (attempt + 1))
    raise RuntimeError("failed: " + url)


def fetch(folder):
    os.makedirs(folder, exist_ok=True)
    with open(os.path.join(folder, "index.html"), "wb") as fh:
        fh.write(get(BASE + "index.html"))
    for n in range(1, 362):
        with open(os.path.join(folder, f"p{n:03d}.html"), "wb") as fh:
            fh.write(get(f"{BASE}p.{n}/index.html"))
        time.sleep(1)
    print("saved 361 chapter pages to", folder)


def structure(folder):
    t = open(os.path.join(folder, "index.html"), "rb").read().decode("cp1251")
    seq = re.findall(r'href="/text/11/p\.(\d+)/index\.html"[^>]*>([^<]*)<', t)
    vol, part, rows = None, None, {}
    for n, txt in seq:
        txt = html.unescape(txt).strip()
        if txt in ("»", "Читать онлайн"):
            continue
        if txt.startswith("Том") or txt == "Эпилог":
            vol = txt
        elif txt.startswith("Часть"):
            part = txt
        elif re.fullmatch(r"[IVXLC]+", txt):
            rows[int(n)] = (vol, part, txt)
    return rows


def chapter_text(raw):
    s = raw.decode("cp1251")
    m = re.search(r"<h3>([IVXLC]+)</h3>", s)
    if not m:
        raise ValueError("no chapter heading")
    body = s[m.end():]
    cut = re.search(r'<span id="fnt\d+"|<iframe id="tocFrame"', body)
    body = body[:cut.start()] if cut else body
    body = re.sub(r"<fn>.*?</fn>", " ", body, flags=re.S)
    body = re.sub(r"<[^>]+>", " ", body)
    return m.group(1), html.unescape(body).replace("\xa0", " ").replace(" ", " ")


def count(folder):
    rows = structure(folder)
    print("chapters listed in the contents:", len(rows))
    per_part, chapters, texts = {}, [], []
    latin = 0
    for n in range(1, 362):
        with open(os.path.join(folder, f"p{n:03d}.html"), "rb") as fh:
            numeral, text = chapter_text(fh.read())
        texts.append(text)
        vol, part, toc_numeral = rows[n]
        if numeral != toc_numeral:
            print("heading mismatch at page", n, numeral, toc_numeral)
        toks = [w for w in SPLIT.split(text) if WORD.search(w)]
        lat = sum(1 for w in toks if LAT.search(w) and not CYR.search(w))
        latin += lat
        chapters.append((vol, part, numeral, len(toks), lat))
        per_part.setdefault((vol, part), []).append(len(toks))
    total = sum(c[3] for c in chapters)
    for (vol, part), ns in per_part.items():
        print(f"  {vol} | {part}: {len(ns)} chapters, {sum(ns):,} words")
    ns = [c[3] for c in chapters]
    print("total chapters:", len(ns))
    print("total words:", f"{total:,}")
    print("chapter length: mean", round(statistics.mean(ns)), "median", round(statistics.median(ns)),
          "| shortest", min(chapters, key=lambda c: c[3])[:4], "| longest", max(chapters, key=lambda c: c[3])[:4])
    print(f"Latin-script tokens (no Cyrillic letter): {latin:,} = {latin / total:.2%} of all words")
    over_half = [c for c in chapters if c[3] and c[4] / c[3] > 0.5]
    print("chapters where Latin-script words are more than half:", [(c[0], c[1], c[2], c[4], c[3]) for c in over_half])
    first_part = [c for c in chapters if c[0] == "Том первый" and c[1] == "Часть первая"]
    fp_lat = sum(c[4] for c in first_part)
    fp_all = sum(c[3] for c in first_part)
    print(f"Vol 1 Part 1 Latin-script share: {fp_lat:,} of {fp_all:,} = {fp_lat / fp_all:.1%}")
    rest_lat = latin - fp_lat
    print(f"Rest of the novel: {rest_lat:,} of {total - fp_all:,} = {rest_lat / (total - fp_all):.1%}")
    print("\nName forms (whole text, stem + any case ending; same patterns as wp-russian-wordcount.py):")
    whole = "\n".join(texts)
    for label, pat in NAMES:
        pat = pat.replace(" ", r"\s+")
        print(f"  {label}: {len(re.findall(r'(?<![А-Яа-яЁёA-Za-zÀ-ÿ])' + pat, whole))}")


if __name__ == "__main__":
    if len(sys.argv) != 3 or sys.argv[1] not in ("fetch", "count"):
        sys.exit("usage: python -I wp-russian-ilibrary.py fetch|count <download-folder>")
    sys.stdout.reconfigure(encoding="utf-8")
    if sys.argv[1] == "fetch":
        fetch(sys.argv[2])
    else:
        count(sys.argv[2])
