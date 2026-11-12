"""Write the first n paragraphs of Chapter I of Project Gutenberg #768 (Emily Bronte's Wuthering
Heights) as a JS array literal for the temp read-along scene.

Usage: python -I gut_js.py <pg768.txt> <n> <out.js>
Prints the file's SHA-256, the heading found, words per paragraph and what was changed.
The page shows a transcript, so the text is set the way a transcript reads: no italics, no quotation
marks around dialogue (apostrophes stay), dashes read as commas.
"""
import hashlib
import json
import re
import sys

path, n, out = sys.argv[1], int(sys.argv[2]), sys.argv[3]
raw = open(path, 'rb').read()
print('sha256', hashlib.sha256(raw).hexdigest())
text = raw.decode('utf-8-sig').replace('\r\n', '\n')
# The file has no contents list: the first "CHAPTER I" line is the chapter's heading.
head = re.search(r'^CHAPTER I\n', text, re.M)
if not head:
    sys.exit('Chapter I heading not found')
body = text[head.end():]
paras = [re.sub(r'\s+', ' ', p).strip() for p in re.split(r'\n\s*\n', body) if p.strip()][:n]
orig = list(paras)


def transcript(p):
    p = re.sub(r'_([^_]+)_', r'\1', p)              # italics
    p = p.replace('“', '').replace('”', '')  # double quotation marks
    p = re.sub(r'‘([^’]*?)’(?!\w)', r'\1', p)  # single quotes (not the apostrophe in don't)
    p = re.sub(r'\s*—+\s*', ', ', p)            # em dash (or a doubled one) -> comma pause
    p = re.sub(r',\s*,', ',', p)
    p = re.sub(r'([.!?]),', r'\1', p)               # "it, walk in!" stays; no ".," pairs
    p = re.sub(r',\s*$', ',', p)
    return p.strip()


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
