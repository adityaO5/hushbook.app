"""Score each sample transcript against public-domain War and Peace texts.

For every transcript block written by wp_sample_transcribe.py, prints the share
of its 6-word shingles that also occur in each reference text. A recording of a
given translation scores high against that text (speech recognition noise keeps
it under 100%) and low against the others; a copyrighted translation (Briggs,
Pevear and Volokhonsky, Edmonds, Dunnigan, Mandelker) scores low against all.
Same method as ../../2026-11-11-best-crime-and-punishment-audiobook/scripts/garnett_match.py.

References (2026-11-11):
  maude   Project Gutenberg #2600 (Louise and Aylmer Maude)
  garnett archive.org warpeace01tols_0 OCR (Constance Garnett, Carlton House)
  dole    archive.org warandpeace01dolegoog + warandpeace00dolegoog OCR (Nathan Haskell Dole)

Usage: python -I wp_translation_match.py <transcripts.txt> maude=<path> garnett=<path> [dole=<path,path>] [limit=N]
"""
import re
import sys

N = 6


def words(s):
    s = re.sub(r"[¬-][ \t]*\r?\n[ \t]*", "", s)  # OCR line-end hyphens
    s = s.replace("’", "'").replace("'", "")
    return re.findall(r"[a-z]+", s.lower())


def shingles(ws):
    return {" ".join(ws[i:i + N]) for i in range(len(ws) - N + 1)}


transcripts = sys.argv[1]
refs = {}
limit = None  # limit=N scores only the first N words (drops a hallucinated tail over music)
for arg in sys.argv[2:]:
    name, _, paths = arg.partition("=")
    if name == "limit":
        limit = int(paths)
        continue
    text = "".join(open(p, encoding="utf-8", errors="replace").read() for p in paths.split(","))
    refs[name] = shingles(words(text))

blocks = re.split(r"^===== ", open(transcripts, encoding="utf-8").read(), flags=re.M)
print(f"{'sample':<20}{'shingles':>9}  " + "  ".join(f"{k:>8}" for k in refs) + "  | opening")
for b in blocks:
    if not b.strip():
        continue
    head, _, body = b.partition("\n")
    ws = words(body)
    sh = shingles(ws[:limit] if limit else ws)
    scores = [len(sh & r) / len(sh) if sh else 0 for r in refs.values()]
    print(f"{head.split()[0]:<20}{len(sh):>9}  " + "  ".join(f"{s:>8.1%}" for s in scores) + "  | " + body.strip()[:150])
