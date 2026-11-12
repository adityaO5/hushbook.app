"""Check study titles, journals and abstracts against Crossref, OpenAlex and ERIC.

Adapted 2026-11-12 from ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-crossref-check.py.
The ten studies checked there on 2026-11-11 are reused as checked (not re-run); this run checks
only the DOIs new to the Pride and Prejudice post.

Usage (isolated mode; the output folder must be a new, empty folder):
    python -I pp-crossref-check.py <output-folder>

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
    "10.1177/0956797610378686",              # Reichle, Reineberg, Schooler 2010 (Sense and Sensibility, mindless reading)
    "10.1093/oxfordhb/9780199978069.013.0004",  # Phillips 2015 (fMRI, attention and Jane Austen)
    "10.1016/j.jml.2019.104047",             # Brysbaert 2019 (silent reading rate)
    "10.1016/j.sbspro.2014.12.077",          # free indirect discourse reading experiment
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
        sys.exit("usage: python -I pp-crossref-check.py <output-folder>")
    main(sys.argv[1])
