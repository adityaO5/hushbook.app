"""Write the first n paragraphs of Book I, Chapter I of Project Gutenberg #28054 (The Brothers Karamazov,
Constance Garnett's translation) as a JS array literal for the temp read-along scene.

Usage: python -I gut_js.py <pg28054.txt> <n> <out.js>
Prints the file's SHA-256, the heading found, words per paragraph and what was changed.
The page shows a transcript, so the text is set the way a transcript reads: no italics, no quotation
marks around dialogue (apostrophes stay), dashes and brackets read as commas.
Copied from ../2026-11-13-best-jane-eyre-audiobook/scripts/images/gut_js.py (#1260); the heading search
changed for #28054 ("PART I", "Book I. ...", then "Chapter I." and the chapter's title line).
"""
import hashlib
import json
import re
import sys

path, n, out = sys.argv[1], int(sys.argv[2]), sys.argv[3]
raw = open(path, 'rb').read()
print('sha256', hashlib.sha256(raw).hexdigest())
text = raw.decode('utf-8-sig').replace('\r\n', '\n')
# The contents list comes first; the novel starts at the line that is exactly "PART I". Its first
# "Chapter I." line is Book I, Chapter I; the next line is the chapter's title.
part = re.search(r'^PART I\n', text, re.M)
if not part:
    sys.exit('PART I heading not found')
head = re.compile(r'^Chapter I\.\n([^\n]+)\n', re.M).search(text, part.end())
if not head:
    sys.exit('Chapter I heading not found')
print('chapter title line:', head.group(1))
body = text[head.end():]
paras = [re.sub(r'\s+', ' ', p).strip() for p in re.split(r'\n\s*\n', body) if p.strip()][:n]
orig = list(paras)


def transcript(p):
    p = re.sub(r'_([^_]+)_', r'\1', p)              # italics
    p = p.replace('“', '').replace('”', '')  # double quotation marks
    p = re.sub(r'‘([^’]*?)’(?!\w)', r'\1', p)  # single quotes (not the apostrophe in don't)
    p = re.sub(r'\s*\(\s*', ', ', p)                # an opening bracket -> comma pause
    p = re.sub(r'\s*\)', ',', p)                    # a closing bracket -> comma pause
    p = re.sub(r'\s*—+\s*', ', ', p)           # em dash (or a doubled one) -> comma pause
    p = re.sub(r',\s*,', ',', p)
    p = re.sub(r'([.!?;:]),', r'\1', p)             # no ".," or ";," pairs
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
