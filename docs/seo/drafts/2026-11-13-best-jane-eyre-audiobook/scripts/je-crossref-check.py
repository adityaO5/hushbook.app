"""Check study titles, journals and abstracts against Crossref, OpenAlex and ERIC.

Copied 2026-11-13 from ../../2026-11-12-best-wuthering-heights-audiobook/scripts/wh-crossref-check.py
(parent: ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-crossref-check.py); the DOI list keeps the
reused read-or-listen studies and adds Jane Eyre's French, its abridgements, and lexical-coverage candidates.

Usage (isolated mode; the output folder must be a new, empty folder):
    python -I je-crossref-check.py <output-folder>

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
    "10.1177/2158244016669550",    # Rogowsky, Calhoun, Tallal 2016
    "10.1002/acp.3163",            # Kopp and D'Mello 2016
    "10.1371/journal.pone.0007785",  # Mitterer and McQueen 2009 (reused from the Wuthering Heights research)
    # new candidates for Jane Eyre: its French, abridgements, how many unknown words a listener can absorb
    "10.4000/cve.839",               # Eells 2013, The French aire in Jane Eyre
    "10.11647/obp.0319.07",          # Sabiron 2023, Translating the French in the French Translations of Jane Eyre
    "10.1163/9789401204477_018",     # Harris 2007, Reader, She Married Him: abridging Jane Eyre for children
    "10.1353/vcr.2023.a925216",      # Stetz 2023, teaching Jane Eyre with Adele, Grace and Celine
    "10.1093/applin/ams074",         # van Zeeland and Schmitt 2013, lexical coverage in L1 and L2 listening
    "10.1111/j.1540-4781.2011.01146.x",  # Schmitt, Jiang and Grabe 2011, percentage of words known and comprehension
    "10.1017/cbo9780511484957.012",  # The enigma of St John Rivers (1999)
]
ERIC = ["EJ1403866"]


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
        sys.exit("usage: python -I je-crossref-check.py <output-folder>")
    main(sys.argv[1])
