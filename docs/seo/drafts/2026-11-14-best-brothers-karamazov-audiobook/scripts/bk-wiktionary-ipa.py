"""Russian pronunciation (IPA) of the main Karamazov names from English Wiktionary's rendered Russian sections.
New 2026-11-14 (source for the names table's "say it" column in research-platforms.md section 5).
Usage: python -I bk-wiktionary-ipa.py <output-folder> [name ...]
Each page is fetched with the MediaWiki parse API (prop=text), saved, and the first IPA spans of its
Russian section are printed. Pages that do not exist are reported, not guessed.
"""
import html
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

UA = {"User-Agent": "research-script/1.0 (pronunciation lookup)"}
DEFAULT = ["Карамазов", "Алёша", "Алексей", "Митя", "Дмитрий", "Иван", "Фёдор", "Смердяков", "Грушенька", "Груша",
           "Аграфена", "Катя", "Катерина", "Зосима", "Ракитин", "Коля", "Илюша", "Достоевский"]


def main(folder, names):
    sys.stdout.reconfigure(encoding="utf-8")
    os.makedirs(folder, exist_ok=True)
    for n in names:
        url = "https://en.wiktionary.org/w/api.php?" + urllib.parse.urlencode(
            {"action": "parse", "page": n, "prop": "text", "format": "json", "redirects": "1"})
        try:
            raw = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read().decode("utf-8")
        except Exception as e:
            print(n, "FETCH FAIL", e)
            continue
        j = json.loads(raw)
        if "error" in j:
            print(f"{n}: no page ({j['error'].get('code')})")
            continue
        open(os.path.join(folder, f"wikt_{n}.json"), "w", encoding="utf-8").write(raw)
        t = j["parse"]["text"]["*"]
        i = t.find('id="Russian"')
        ru = t[i:] if i >= 0 else ""
        nxt = re.search(r'<h2[^>]*>', ru[20:])
        if nxt:
            ru = ru[:nxt.start() + 20]
        ipas = [html.unescape(re.sub(r"<[^>]+>", "", m)) for m in re.findall(r'<span class="IPA[^"]*"[^>]*>(.*?)</span>', ru)]
        print(f"{n}: {'Russian section found' if i >= 0 else 'NO Russian section'} | IPA: {', '.join(dict.fromkeys(ipas)) or '(none)'}")
        time.sleep(1)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2:] or DEFAULT)
