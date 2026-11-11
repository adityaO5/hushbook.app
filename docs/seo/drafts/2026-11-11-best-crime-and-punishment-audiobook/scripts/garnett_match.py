"""Score each sample transcript against Constance Garnett's text.

Reads the output of sample_opening.py and Project Gutenberg #2554 (Garnett),
and prints, per sample, the share of the transcript's 6-word shingles that
also occur in the Garnett text. A recording of Garnett scores high (speech
recognition noise keeps it under 100%); another translation scores near 0.

Usage: python -I garnett_match.py <transcripts.txt> <pg2554.txt>
Run 2026-11-11 for research-platforms.md section 1.
"""
import re
import sys

N = 6


def words(s):
    return re.findall(r"[a-z]+", s.lower().replace("’", "'").replace("'", ""))


def shingles(ws):
    return {" ".join(ws[i:i + N]) for i in range(len(ws) - N + 1)}


transcripts, gutenberg = sys.argv[1], sys.argv[2]
garnett = shingles(words(open(gutenberg, encoding="utf-8").read()))

# sample_opening.py's stdout is the Windows console code page, not UTF-8.
blocks = re.split(r"^===== ", open(transcripts, encoding="cp1252", errors="replace").read(), flags=re.M)
for b in blocks:
    if not b.strip():
        continue
    head, _, body = b.partition("\n")
    sh = shingles(words(body))
    hit = len(sh & garnett)
    share = hit / len(sh) if sh else 0
    print(f"{head.split()[0]:<16} shingles {len(sh):>4}  in Garnett {hit:>4}  share {share:5.1%}  | {body.strip()[:110]}")
