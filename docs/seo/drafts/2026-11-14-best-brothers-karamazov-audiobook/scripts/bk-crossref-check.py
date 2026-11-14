"""Check study titles, journals and abstracts against Crossref, OpenAlex and ERIC.

Copied 2026-11-14 from ../../2026-11-13-best-jane-eyre-audiobook/scripts/je-crossref-check.py
(parents: WH wh-crossref-check.py, W&P wp-crossref-check.py); the DOI list keeps the reused read-or-listen
studies and replaces the Jane Eyre candidates with The Brothers Karamazov's translation scholarship and
mind wandering on difficult texts (candidates found with bk-openalex-search.py). No ERIC record this time.

Usage (isolated mode; the output folder must be a new, empty folder):
    python -I bk-crossref-check.py <output-folder>

For each DOI: Crossref title, container, volume, issue, pages, issued and online dates,
authors; OpenAlex abstract (rebuilt from the inverted index). For the ERIC record: title,
source and abstract from the ERIC API. Raw JSON is saved in the output folder.
"""
import json
import os
import sys
import time
import urllib.parse
import urllib.request

UA = {"User-Agent": "research-script/1.0 (title verification)"}
DOIS = [
    # reused from the War and Peace research (verified there 2026-11-11), re-checked here
    "10.3102/00346543211060871",   # Clinton-Lisell 2022
    "10.3389/fpsyg.2013.00892",    # Varao Sousa, Carriere, Smilek 2013
    "10.1111/lang.12721",          # Hui and Godfroid 2026
    "10.1038/s41598-020-68253-2",  # Richardson et al. 2020
    "10.1177/14614448211024142",   # Rodero and Lucas 2023
    "10.1002/acp.3899",            # Murphy et al. 2022 (playback speed)
    # reused from the focus post research (2026-11-07): mind wandering on easy vs difficult texts
    "10.3758/s13423-012-0367-y",   # Feng, D'Mello, Graesser 2013
    # new for The Brothers Karamazov: its English translations
    "10.1632/pmla.2020.135.5.895",     # Brain fever in The Brothers Karamazov and its English afterlife (PMLA 2020)
    "10.1111/russ.12287",              # Constance Garnett and the English afterlife of Dostoevsky's corpses (Russian Review 2020)
    "10.11649/cs.1319",                # When "soul" is lost in translation (Cognitive Studies 2017)
    "10.1353/tsl.2007.0014",           # The Brothers Incandenza (Texas Studies in Literature and Language 2007)
    "10.1111/j.1467-9434.2009.00524.x",  # Siblings in The Brothers Karamazov (Russian Review 2009)
    "10.2307/306995",                  # A Karamazov Companion (review, SEEJ 1982)
]
ERIC = []


def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8")


def abstract(inv):
    if not inv:
        return ""
    pos = []
    for word, idxs in inv.items():
        for i in idxs:
            pos.append((i, word))
    return " ".join(w for _, w in sorted(pos))


def main(folder):
    sys.stdout.reconfigure(encoding="utf-8")
    os.makedirs(folder, exist_ok=True)
    for doi in DOIS:
        try:
            raw = get("https://api.crossref.org/works/" + urllib.parse.quote(doi))
        except Exception as e:  # report and continue
            print("CROSSREF FAIL", doi, e)
            continue
        safe = doi.replace("/", "_")
        open(os.path.join(folder, f"crossref_{safe}.json"), "w", encoding="utf-8").write(raw)
        m = json.loads(raw)["message"]
        authors = ", ".join(a.get("family", "") for a in m.get("author", []))
        print(f"\nDOI {doi}")
        print("  title:", " ".join(m.get("title", [""])))
        print("  container:", " ".join(m.get("container-title", [""])),
              "| vol", m.get("volume"), "| issue", m.get("issue"), "| pages", m.get("page"),
              "| article", m.get("article-number"))
        print("  issued:", m.get("issued", {}).get("date-parts"),
              "| online:", m.get("published-online", {}).get("date-parts"),
              "| print:", m.get("published-print", {}).get("date-parts"))
        print("  authors:", authors)
        try:
            oa = get("https://api.openalex.org/works/https://doi.org/" + doi)
            open(os.path.join(folder, f"openalex_{safe}.json"), "w", encoding="utf-8").write(oa)
            a = abstract(json.loads(oa).get("abstract_inverted_index"))
            print("  abstract (OpenAlex):", a[:1600] if a else "(none)")
        except Exception as e:
            print("  OPENALEX FAIL", e)
        time.sleep(1)
    for ej in ERIC:
        url = "https://api.ies.ed.gov/eric/?" + urllib.parse.urlencode(
            {"search": "id:" + ej, "format": "json", "fields": "id,title,source,publicationdateyear,description,author"})
        try:
            raw = get(url)
        except Exception as e:
            print("ERIC FAIL", ej, e)
            continue
        open(os.path.join(folder, f"eric_{ej}.json"), "w", encoding="utf-8").write(raw)
        for d in json.loads(raw).get("response", {}).get("docs", []):
            print(f"\nERIC {ej}")
            print("  title:", d.get("title"))
            print("  source:", d.get("source"), "| year:", d.get("publicationdateyear"), "| authors:", d.get("author"))
            print("  abstract:", (d.get("description") or "")[:1200])


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: python -I bk-crossref-check.py <output-folder>")
    main(sys.argv[1])
