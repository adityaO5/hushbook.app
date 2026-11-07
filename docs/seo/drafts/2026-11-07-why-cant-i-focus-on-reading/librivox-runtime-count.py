"""Count English LibriVox recordings on archive.org by runtime.

Reproduces the "short books are plentiful" numbers for the post
/blog/why-cant-i-focus-on-reading.

Run:   python -I librivox-runtime-count.py            (prints a summary)
       python -I librivox-runtime-count.py --csv out.csv   (also writes every row)

Source: archive.org advanced search, query
    collection:librivoxaudio AND language:(eng OR English)
fields identifier + runtime. Standard library only.
advancedsearch.php refuses offsets of 10,000 or more (HTTP 507, checked
2026-11-08), so the script asks for every row in one page (rows = numFound) and
falls back to the cursor-based scrape API if that single page fails.

Caveats:
- The librivoxaudio collection holds every LibriVox project type: novels, but also
  poetry collections, short-story collections, single short works, plays and
  "weekly poem" compilations. Short runtimes are not all short novels.
- archive.org language metadata is incomplete, so a few English items tagged
  differently are missing and a few mis-tagged items may be included.
- runtime is free text filled in by uploaders ("4:33:12", "33:12", sometimes
  other forms). Rows that do not parse are counted and reported, not guessed.
"""

import argparse
import csv
import json
import re
import statistics
import sys
import time
import urllib.parse
import urllib.request

QUERY = "collection:librivoxaudio AND language:(eng OR English)"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) hushbook-research/1.0"


def get_json(url):
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=180) as r:
                return json.loads(r.read().decode("utf-8"))
        except Exception as e:  # network hiccup: back off and retry
            if attempt == 3:
                raise
            print(f"{e}; retrying", file=sys.stderr)
            time.sleep(5 * (attempt + 1))


def advanced(rows):
    params = [("q", QUERY), ("fl[]", "identifier"), ("fl[]", "runtime"),
              ("rows", str(rows)), ("page", "1"), ("output", "json")]
    return get_json("https://archive.org/advancedsearch.php?" + urllib.parse.urlencode(params))["response"]


def scrape_all():
    docs, cursor = [], None
    while True:
        params = [("q", QUERY), ("fields", "identifier,runtime"), ("count", "10000")]
        if cursor:
            params.append(("cursor", cursor))
        data = get_json("https://archive.org/services/search/v1/scrape?" + urllib.parse.urlencode(params))
        docs.extend(data.get("items", []))
        cursor = data.get("cursor")
        if not cursor:
            return docs


def parse_runtime(value):
    """Return hours as float, or None if the value is missing or unparseable.

    Forms seen in the data (checked 2026-11-08):
      "4:33:12"   h:mm:ss  (most rows)
      "44:44"     mm:ss    (short poems; e.g. my_last_duchess_1706.poem_librivox)
      "08:28.25"  h:mm.ss  (about 96 older uploads; e.g. white_fang_librivox)
      ":52:14", "1:14:36\\"  stray punctuation, cleaned
    Dot-only values ("28.10") and file sizes ("13.3MB") are left unparsed.
    """
    if isinstance(value, list):
        value = value[0] if value else None
    if value is None:
        return None
    s = str(value).strip().rstrip("\\").strip()
    if s.startswith(":"):
        s = "0" + s
    if re.fullmatch(r"\d+:\d{2}\.\d+", s):  # h:mm.ss
        h, rest = s.split(":")
        m, sec = rest.split(".")
        return int(h) + int(m) / 60 + int(sec[:2].ljust(2, "0")) / 3600
    if not re.fullmatch(r"\d+(:\d+(\.\d+)?){1,2}", s):
        return None
    nums = [float(x) for x in s.split(":")]
    if len(nums) == 3:
        h, m, sec = nums
    else:  # mm:ss
        h, m, sec = 0.0, nums[0], nums[1]
    return h + m / 60 + sec / 3600


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", help="write identifier,runtime,hours rows here")
    args = ap.parse_args()

    total = advanced(0)["numFound"]
    try:
        docs = advanced(total + 100)["docs"]
        method = "advancedsearch, one page"
    except Exception as e:
        print(f"single-page advancedsearch failed ({e}); using scrape API", file=sys.stderr)
        docs = scrape_all()
        method = "scrape API"

    seen = set()
    rows = []
    missing = unparsed = 0
    for d in docs:
        ident = d.get("identifier")
        if ident in seen:
            continue
        seen.add(ident)
        raw = d.get("runtime")
        if raw in (None, "", []):
            missing += 1
            rows.append((ident, "", ""))
            continue
        h = parse_runtime(raw)
        if h is None or h <= 0:
            unparsed += 1
            rows.append((ident, raw, ""))
            continue
        rows.append((ident, raw, round(h, 4)))

    hours = sorted(r[2] for r in rows if r[2] != "")
    n = len(hours)
    under1 = sum(1 for h in hours if h < 1)
    under3 = sum(1 for h in hours if h < 3)
    under5 = sum(1 for h in hours if h < 5)
    over10 = sum(1 for h in hours if h >= 10)
    over20 = sum(1 for h in hours if h >= 20)

    print(f"Query: {QUERY}")
    print(f"Run at: {time.strftime('%Y-%m-%d %H:%M %Z')}")
    print(f"numFound: {total}; unique identifiers fetched: {len(seen)} ({method})")
    print(f"No runtime field: {missing}; runtime present but unparsed: {unparsed}")
    print(f"With a usable runtime: {n}")
    print(f"Under 1 h:  {under1} ({under1 / n:.1%})")
    print(f"Under 3 h:  {under3} ({under3 / n:.1%})")
    print(f"Under 5 h:  {under5} ({under5 / n:.1%})")
    print(f"10 h or more: {over10} ({over10 / n:.1%})")
    print(f"20 h or more: {over20} ({over20 / n:.1%})")
    print(f"Median: {statistics.median(hours):.2f} h; mean: {statistics.mean(hours):.2f} h")
    q = statistics.quantiles(hours, n=4)
    print(f"Quartiles: {q[0]:.2f} h / {q[1]:.2f} h / {q[2]:.2f} h")

    if args.csv:
        with open(args.csv, "w", newline="", encoding="utf-8") as f:
            w = csv.writer(f)
            w.writerow(["identifier", "runtime", "hours"])
            w.writerows(rows)
        print(f"Rows written to {args.csv}")


if __name__ == "__main__":
    main()
