"""Write the first n paragraphs of Part I, Chapter I of Project Gutenberg #2554 (Constance Garnett's
Crime and Punishment) as a JS array literal for the temp read-along scene.

Usage: python -I gut_js.py <pg2554.txt> <n> <out.js>
Prints the file's SHA-256, the heading found, words per paragraph and any non-ASCII characters.
Italic underscores are removed (a transcript has no italics).
"""
import hashlib
import json
import re
import sys

path, n, out = sys.argv[1], int(sys.argv[2]), sys.argv[3]
raw = open(path, 'rb').read()
print('sha256', hashlib.sha256(raw).hexdigest())
text = raw.decode('utf-8-sig').replace('\r\n', '\n')
# The body's first "PART I" heading at the start of a line (the contents list is indented).
part = re.search(r'^PART I\n\s*\nCHAPTER I\n', text, re.M)
if not part:
    sys.exit('Part I, Chapter I heading not found')
body = text[part.end():]
paras = [re.sub(r'\s+', ' ', p).strip() for p in re.split(r'\n\s*\n', body) if p.strip()][:n]
paras = [re.sub(r'_([^_]+)_', r'\1', p) for p in paras]
with open(out, 'w', encoding='utf-8') as f:
    f.write('const CHAPTER = [\n')
    for p in paras:
        f.write(json.dumps(p, ensure_ascii=False) + ',\n')
    f.write('];\n')
non_ascii = sorted(set(c for p in paras for c in p if ord(c) > 127))
print('heading at char', part.start())
print('non-ascii:', [(c, hex(ord(c))) for c in non_ascii])
print('double hyphens:', [p.count('--') for p in paras])
print('words:', [len(p.split()) for p in paras])
for p in paras:
    print('---', p)
