"""Is a recording the full text? Word-level diff of a sample transcript against Gutenberg #768.

Takes one transcript block from wh_sample_voice.py output, cuts the Gutenberg text between two
anchor phrases, and lists the Gutenberg words the reader does not say (difflib on lower-case
words). Used 2026-11-12 on the Literati Audio sample (Moira Quirk, Dan Stevens), from
"Yesterday afternoon set in misty and cold." to "leisure attendance": 242 of 493 words unheard.

Usage: python -I wh_condensed_check.py <voice.txt> <sample-name> <pg768.txt> "<start anchor>" "<end anchor>"
"""
import difflib
import re
import sys

voice, name, pg, start, end = sys.argv[1:6]
sys.stdout.reconfigure(encoding="utf-8")


def words(s):
    return re.findall(r"[a-z]+", s.lower().replace("’", "").replace("'", ""))


block = next(b for b in open(voice, encoding="utf-8").read().split("===== ")[1:] if b.startswith(name))
heard_text = " ".join(re.sub(r"^\s+[\d.]+-\s*[\d.]+s\s+\S+ Hz\s+", "", l) for l in block.split("\n")[1:] if l.strip())
t = " ".join(open(pg, encoding="utf-8").read().split())
a = t.find(start)
b = t.find(end, a)
if a < 0 or b < 0:
    sys.exit("anchor not found in Gutenberg text")
src = words(t[a:b + len(end)])
hw = words(heard_text)
# align the transcript to the same stretch
i = next(k for k in range(len(hw)) if hw[k:k + 5] == words(start)[:5])
e_words = words(end)
j = next(k for k in range(i, len(hw)) if hw[k:k + len(e_words)] == e_words) + len(e_words)
heard = hw[i:j]
sm = difflib.SequenceMatcher(a=src, b=heard, autojunk=False)
cut = 0
for op, i1, i2, j1, j2 in sm.get_opcodes():
    if op in ("delete", "replace"):
        cut += i2 - i1
        print(f"{op} ({i2 - i1} words): [{' '.join(src[i1:i2])[:400]}]" + (f" -> [{' '.join(heard[j1:j2])}]" if op == "replace" else ""))
print(f"\nGutenberg words in this stretch: {len(src)}; heard: {len(heard)}; not heard: {cut} ({cut / len(src):.0%})")
