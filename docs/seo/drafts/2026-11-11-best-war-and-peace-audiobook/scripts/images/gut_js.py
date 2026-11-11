"""Write the first n paragraphs of Book One, Chapter I of Project Gutenberg #2600 (Louise and Aylmer
Maude's War and Peace) as a JS array literal for the temp read-along scene.

Usage: python -I gut_js.py <pg2600.txt> <n> <out.js>
Prints the file's SHA-256, the heading found, words per paragraph and what was changed.
The page shows a transcript, so the text is set the way a transcript reads: no italics, no quotation
marks around dialogue (apostrophes stay), dashes read as commas, no stress accents on names.
"""
import hashlib
import json
import re
import sys
import unicodedata

path, n, out = sys.argv[1], int(sys.argv[2]), sys.argv[3]
raw = open(path, 'rb').read()
print('sha256', hashlib.sha256(raw).hexdigest())
text = raw.decode('utf-8-sig').replace('\r\n', '\n')
# The body's "BOOK ONE: 1805" heading at the start of a line (the contents list is indented).
head = re.search(r'^BOOK ONE: 1805\n\s*\nCHAPTER I\n', text, re.M)
if not head:
    sys.exit('Book One, Chapter I heading not found')
body = text[head.end():]
paras = [re.sub(r'\s+', ' ', p).strip() for p in re.split(r'\n\s*\n', body) if p.strip()][:n]
orig = list(paras)


def transcript(p):
    p = re.sub(r'_([^_]+)_', r'\1', p)                      # italics
    p = p.replace('“', '').replace('”', '')        # double quotation marks
    p = re.sub(r'‘([^’]*?)’(?!\w)', r'\1', p)  # 'faithful slave,' (not the apostrophe in don't)
    p = re.sub(r'\s*—\s*', ', ', p)                    # em dash -> comma pause
    p = p.replace(',,', ',')
    p = unicodedata.normalize('NFD', p)
    p = ''.join(c for c in p if unicodedata.category(c) != 'Mn')  # Pávlovna -> Pavlovna, Fëdorovna -> Fedorovna
    return unicodedata.normalize('NFC', p)


paras = [transcript(p) for p in paras]
with open(out, 'w', encoding='utf-8') as f:
    f.write('const CHAPTER = [\n')
    for p in paras:
        f.write(json.dumps(p, ensure_ascii=False) + ',\n')
    f.write('];\n')
print('heading at char', head.start())
print('non-ascii left:', sorted(set((c, hex(ord(c))) for p in paras for c in p if ord(c) > 127)))
print('words:', [len(p.split()) for p in paras])
for o, p in zip(orig, paras):
    print('--- gutenberg:', o)
    print('+++ on screen:', p)
