"""Find candidate scholarly sources (with DOIs) on the English translations of The Brothers Karamazov,
Constance Garnett, Pevear and Volokhonsky, and the Grand Inquisitor, through the OpenAlex search API.
New 2026-11-14 (helper for research-evidence.md section (d); every DOI it finds is then checked in Crossref
with bk-crossref-check.py before use).
Usage: python -I bk-openalex-search.py <output-folder>
"""
import json
import os
import sys
import time
import urllib.parse
import urllib.request

UA = {"User-Agent": "research-script/1.0 (title verification)"}
QUERIES = [
    "Brothers Karamazov translation English",
    "Constance Garnett translation Dostoevsky",
    "Pevear Volokhonsky translation Dostoevsky",
    "retranslation Dostoevsky English",
    "Grand Inquisitor Brothers Karamazov",
    "Brothers Karamazov serial Russian Messenger",
    "Russian names patronymic diminutive readers translation",
]


def main(folder):
    sys.stdout.reconfigure(encoding="utf-8")
    os.makedirs(folder, exist_ok=True)
    for q in QUERIES:
        url = "https://api.openalex.org/works?" + urllib.parse.urlencode(
            {"search": q, "per-page": "15", "select": "id,doi,title,publication_year,primary_location,cited_by_count,type"})
        raw = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read().decode("utf-8")
        open(os.path.join(folder, "oa_" + "".join(c if c.isalnum() else "_" for c in q) + ".json"), "w", encoding="utf-8").write(raw)
        print(f"\n## {q}")
        for w in json.loads(raw).get("results", []):
            src = ((w.get("primary_location") or {}).get("source") or {}).get("display_name")
            print(f"  {w.get('publication_year')} | {w.get('cited_by_count')} cites | {w.get('type')} | {w.get('doi')} | {w.get('title')} | {src}")
        time.sleep(1)


if __name__ == "__main__":
    main(sys.argv[1])
