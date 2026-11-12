"""Write one chapter of Project Gutenberg #1342 (Pride and Prejudice, 1894 George Allen text) as a JS array
literal for the temp read-along scene, one entry per paragraph, from the chapter's first paragraph.

Usage: python -I gut_js.py <pg1342.txt> <roman numeral> <out.js>
Prints the file's SHA-256, the paragraphs, their word counts and what was changed.
The page shows a transcript, so the text is set the way a transcript reads: no italics, no quotation
marks around dialogue (apostrophes stay), dashes read as commas, illustration markers dropped.
Adapted from the War and Peace copy (../2026-11-11-best-war-and-peace-audiobook/scripts/images/gut_js.py).
"""
import hashlib
import json
import re
import sys

path, numeral, out = sys.argv[1], sys.argv[2], sys.argv[3]
raw = open(path, 'rb').read()
print('sha256', hashlib.sha256(raw).hexdigest())
text = raw.decode('utf-8-sig').replace('\r\n', '\n')
body = text[text.index('*** START OF'):text.index('*** END OF')]
heads = list(re.finditer(r'^CHAPTER ([IVXLC]+)\.?\s*$', body, re.M))
for k, h in enumerate(heads):
    if h.group(1) == numeral:
        chunk = body[h.end(): heads[k + 1].start() if k + 1 < len(heads) else len(body)]
        break
else:
    sys.exit('chapter not found')
chunk = re.sub(r'\[Illustration[^\]]*\]', '', chunk)
paras = [re.sub(r'\s+', ' ', p).strip() for p in re.split(r'\n\s*\n', chunk) if p.strip()]
orig = list(paras)


def transcript(p):
    p = re.sub(r'_([^_]+)_', r'\1', p)                       # italics
    p = p.replace('“', '').replace('”', '')         # double quotation marks
    p = re.sub('‘([^’]*?)’(?!\\w)', r'\1', p)  # inner 'quotes' (not the apostrophe in ma'am)
    p = re.sub(r'\s*-{2,}\s*', ', ', p)                       # -- and ---- read as a comma pause
    p = re.sub(r'\s*—\s*', ', ', p)
    p = re.sub(r',\s*,', ',', p)
    p = re.sub(r'\s+,', ',', p)
    return p.strip().rstrip(',').strip() if p.strip().endswith(', ') else p.strip()


paras = [transcript(p) for p in paras]
with open(out, 'w', encoding='utf-8') as f:
    f.write('const CHAPTER = [\n')
    for p in paras:
        f.write(json.dumps(p, ensure_ascii=False) + ',\n')
    f.write('];\n')
words = [len(p.split()) for p in paras]
print('paragraphs:', len(paras), 'words:', sum(words))
print('non-ascii left:', sorted(set(hex(ord(c)) for p in paras for c in p if ord(c) > 127)))
for i, (o, p) in enumerate(zip(orig, paras)):
    if o != p:
        print(f'--- [{i}] gutenberg:', o.encode('ascii', 'backslashreplace').decode())
        print(f'+++ [{i}] on screen:', p.encode('ascii', 'backslashreplace').decode())
