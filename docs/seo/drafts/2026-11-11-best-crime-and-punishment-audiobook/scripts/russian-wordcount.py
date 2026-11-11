"""Word count and name-form counts for the Russian text of Crime and Punishment.

Source: Russian Wikisource, "Преступление и наказание (Достоевский)", one subpage per
chapter (41 pages: six parts with 7, 7, 6, 6, 5 and 8 chapters, plus Epilogue I and II).
Wikisource gives its own source as www.lib.ru (modern spelling).

Usage (run in isolated mode; the download folder must be a new, empty folder that holds
nothing but the downloaded JSON):
    python -I russian-wordcount.py fetch <download-folder>
    python -I russian-wordcount.py count <download-folder>

`fetch` saves the chapter list (index.json) and one JSON file per chapter (chNN.json)
from the MediaWiki API. `count` strips wiki markup and reports:
  - words per part and in total (tokens containing a Cyrillic or Latin letter or a digit,
    splitting on whitespace and on em/en dashes)
  - chapter-length statistics
  - counts of the main characters' name forms (Russian names inflect for case, so each
    pattern matches the stem plus any ending; see the NAMES list)
"""
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
INDEX = "Преступление и наказание (Достоевский)"
UA = {"User-Agent": "word-count-research-script/1.0"}

WORD = re.compile(r"[A-Za-z0-9Ѐ-ӿ]")
SPLIT = re.compile(r"(?:\s|—|–|--)+")

# (label, regex). Endings: \w* catches case endings (Раскольникова, Раскольникову ...).
NAMES = [
    ("Раскольников* (surname, any case; includes Dunya's 'Раскольникова')", r"Раскольников\w*"),
    ("Родион Романович (full patronymic, any case)", r"Родион\w* Романович\w*"),
    ("Родион Романыч (spoken short patronymic, any case)", r"Родион\w* Романыч\w*"),
    ("Родион (any case, any context)", r"Родион(?:а|у|ом|е)?\b"),
    ("Родя (any case)", r"Род(?:я|и|е|ю|ей|ею)\b"),
    ("Родька (any case)", r"Родьк\w*"),
    ("Дуня (any case)", r"Дун(?:я|и|е|ю|ей|ею)\b"),
    ("Дунечка (any case)", r"Дунечк\w*"),
    ("Авдотья Романовна (any case)", r"Авдоть\w* Романовн\w*"),
    ("Соня (any case)", r"Сон(?:я|и|е|ю|ей|ею)\b"),
    ("Сонечка (any case)", r"Сонечк\w*"),
    ("Софья Семёновна / Семеновна (any case)", r"Софь\w* Сем[её]новн\w*"),
    ("Разумихин (any case)", r"Разумихин\w*"),
    ("Вразумихин (any case)", r"Вразумихин\w*"),
    ("Дмитрий Прокофьич (any case)", r"Дмитри\w* Прокофьич\w*"),
    ("Пульхерия Александровна (any case)", r"Пульхери\w* Александровн\w*"),
    ("Лужин (any case)", r"Лужин\w*"),
    ("Пётр / Петр Петрович (any case)", r"П[её]тр\w* Петрович\w*"),
    ("Свидригайлов (any case)", r"Свидригайлов\w*"),
    ("Аркадий Иванович (any case)", r"Аркади\w* Иванович\w*"),
    ("Порфирий (any case)", r"Порфири\w*"),
    ("Порфирий Петрович (any case)", r"Порфири\w* Петрович\w*"),
    ("Мармеладов (any case, includes Мармеладова)", r"Мармеладов\w*"),
    ("Семён / Семен Захарович (any case)", r"Сем[её]н\w* Захарович\w*"),
    ("Катерина Ивановна (any case)", r"Катерин\w* Ивановн\w*"),
    ("Полечка / Поленька (any case)", r"Пол(?:ечк|еньк)\w*"),
    ("Алёна / Алена Ивановна (any case)", r"Ал[её]н\w* Ивановн\w*"),
    ("Лизавета (any case)", r"Лизавет\w*"),
    ("Зосимов (any case)", r"Зосимов\w*"),
    ("Заметов (any case)", r"Заметов\w*"),
    ("Настасья (any case)", r"Настась\w*"),
    ("Настенька (any case)", r"Настеньк\w*"),
    ("Илья Петрович (any case)", r"Иль\w* Петрович\w*"),
    ("Порох (nickname 'Gunpowder', any case)", r"Порох\w*"),
    ("Никодим Фомич (any case)", r"Никоди\w* Фомич\w*"),
    ("Лебезятников (any case)", r"Лебезятников\w*"),
    ("Андрей Семёнович / Семенович (any case)", r"Андре\w* Сем[её]нович\w*"),
    ("Марфа Петровна (any case)", r"Марф\w* Петровн\w*"),
    ("Миколка (any case)", r"Миколк\w*"),
    ("Николай (any case)", r"Никола(?:й|я|ю|ем|е)\b"),
]


def api_get(params):
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers=UA)
    for attempt in range(6):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read().decode("utf-8")
        except urllib.error.HTTPError as e:
            if e.code != 429:
                raise
            time.sleep(10 * (attempt + 1))  # Wikimedia rate limit: back off and retry
    raise RuntimeError("rate limited: " + url)


def fetch(folder):
    os.makedirs(folder, exist_ok=True)
    raw = api_get({"action": "parse", "page": INDEX, "prop": "wikitext",
                   "format": "json", "redirects": 1})
    with open(os.path.join(folder, "index.json"), "w", encoding="utf-8") as fh:
        fh.write(raw)
    wikitext = json.loads(raw)["parse"]["wikitext"]["*"]
    titles = re.findall(r"\[\[(" + re.escape(INDEX) + r"/[^|\]]+)", wikitext)
    print("chapter pages listed:", len(titles))
    for i, title in enumerate(titles, 1):
        raw = api_get({"action": "query", "prop": "revisions",
                       "rvprop": "content|ids|timestamp", "rvslots": "main",
                       "format": "json", "titles": title})
        with open(os.path.join(folder, f"ch{i:02d}.json"), "w", encoding="utf-8") as fh:
            fh.write(raw)
        time.sleep(2)
    print("saved", len(titles), "chapter files to", folder)


def clean(wikitext):
    t = wikitext
    t = re.sub(r"<ref[^>]*>.*?</ref>", " ", t, flags=re.S)  # footnotes
    t = re.sub(r"<ref[^>]*/>", " ", t)
    # header template {{Отексте ...}} or {{Отексте|...}} at the top: drop the first
    # balanced {{...}} block if it is a header template
    m = re.match(r"\s*\{\{", t)
    if m:
        depth, i = 0, m.start()
        while i < len(t):
            if t.startswith("{{", i):
                depth += 1
                i += 2
            elif t.startswith("}}", i):
                depth -= 1
                i += 2
                if depth == 0:
                    break
            else:
                i += 1
        t = t[i:]
    # remaining templates: keep the last parameter of simple ones like {{razr|text}}
    for _ in range(5):
        t = re.sub(r"\{\{[^{}|]*\|([^{}]*)\}\}", lambda mm: mm.group(1).split("|")[-1], t)
        t = re.sub(r"\{\{[^{}]*\}\}", " ", t)
    t = re.sub(r"\[\[(?:[^|\]]*\|)?([^\]]*)\]\]", r"\1", t)  # links
    t = re.sub(r"<[^>]+>", " ", t)  # html tags
    t = re.sub(r"'{2,}", "", t)  # bold/italic quotes
    t = re.sub(r"^=+.*?=+\s*$", " ", t, flags=re.M)  # headings
    t = re.sub(r"__[A-ZА-Я]+__", " ", t)
    t = t.replace("&nbsp;", " ")
    return t


def count(folder):
    files = sorted(f for f in os.listdir(folder) if re.fullmatch(r"ch\d\d\.json", f))
    chapters = []
    for f in files:
        with open(os.path.join(folder, f), encoding="utf-8") as fh:
            data = json.load(fh)
        page = next(iter(data["query"]["pages"].values()))
        rev = page["revisions"][0]
        text = rev["slots"]["main"]["*"]
        chapters.append((page["title"], rev.get("revid"), rev.get("timestamp"), clean(text)))
    print("chapter pages read:", len(chapters))
    total = 0
    per_part = {}
    lengths = []
    for title, revid, ts, text in chapters:
        n = len([w for w in SPLIT.split(text) if WORD.search(w)])
        part = title.split("/")[1]
        per_part.setdefault(part, []).append(n)
        lengths.append((title.split("/", 1)[1], n))
        total += n
    for part, ns in per_part.items():
        print(f"  {part}: {len(ns)} chapters, {sum(ns):,} words")
    ns = [n for _, n in lengths]
    print("total words:", f"{total:,}")
    print("chapter length: mean", round(statistics.mean(ns)), "median",
          round(statistics.median(ns)), "min", min(lengths, key=lambda x: x[1]),
          "max", max(lengths, key=lambda x: x[1]))
    print("latest revision timestamp among chapter pages:",
          max(ts for _, _, ts, _ in chapters))
    alltext = "\n".join(t for *_, t in chapters)
    first = chapters[0][3].strip().split("\n")[0]
    print("first line of Part I chapter I:", first[:300])
    print("\nName forms (whole text, stem + any case ending):")
    for label, pat in NAMES:
        # the wikitext breaks lines and doubles spaces inside names, so a space in a
        # pattern matches any run of whitespace
        pat = pat.replace(" ", r"\s+")
        print(f"  {label}: {len(re.findall(r'(?<![А-Яа-яЁё])' + pat, alltext))}")


if __name__ == "__main__":
    if len(sys.argv) != 3 or sys.argv[1] not in ("fetch", "count"):
        sys.exit("usage: python -I russian-wordcount.py fetch|count <download-folder>")
    sys.stdout.reconfigure(encoding="utf-8")
    if sys.argv[1] == "fetch":
        fetch(sys.argv[2])
    else:
        count(sys.argv[2])
