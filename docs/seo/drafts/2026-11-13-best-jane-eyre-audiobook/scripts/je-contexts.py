"""Every occurrence of a pattern in Jane Eyre with chapter and context, plus a per-chapter tally.
Copied 2026-11-13 from ../../2026-11-12-best-pride-and-prejudice-audiobook/scripts/pp-contexts.py (idea; rewritten to load
je-wordcount.py for the chapter extraction). Usage: python -I je-contexts.py <pg1260.txt> "<regex>" [width] [--tally-only]"""
import importlib.util, os, re, sys
from collections import Counter
here = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("jewc", os.path.join(here, "je-wordcount.py"))
jewc = importlib.util.module_from_spec(spec); spec.loader.exec_module(jewc)
sys.stdout.reconfigure(encoding="utf-8")
path, pat = sys.argv[1], sys.argv[2]
w = int(sys.argv[3]) if len(sys.argv) > 3 and sys.argv[3].isdigit() else 70
_, _, body = jewc.load(path)
_, chapters = jewc.chapters_of(body)
tally = Counter()
for n, s in chapters:
    s1 = " ".join(s.split())
    for m in re.finditer(pat, s1):
        tally[n] += 1
        if "--tally-only" not in sys.argv:
            print(f"Ch{n}\t…{s1[max(0, m.start() - w):m.end() + w]}…")
print("TOTAL", sum(tally.values()), "| by chapter:", dict(sorted(tally.items())))
