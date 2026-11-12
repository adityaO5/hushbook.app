"""Print the paragraphs of one chapter of Project Gutenberg #1342 (Pride and Prejudice), numbered, with
word counts, so a passage can be chosen. Illustration captions ([Illustration: ...]) are dropped.
Usage: python -I pp_chapter.py <pg1342.txt> <roman numeral>
"""
import hashlib
import re
import sys

path, numeral = sys.argv[1], sys.argv[2]
raw = open(path, 'rb').read()
print('sha256', hashlib.sha256(raw).hexdigest())
text = raw.decode('utf-8-sig').replace('\r\n', '\n')
start = text.index('*** START OF')
end = text.index('*** END OF')
body = text[start:end]
heads = list(re.finditer(r'^CHAPTER ([IVXLC]+)\.?\s*$', body, re.M))
print('chapter headings found:', len(heads))
for k, h in enumerate(heads):
    if h.group(1) == numeral:
        chunk = body[h.end(): heads[k + 1].start() if k + 1 < len(heads) else len(body)]
        break
else:
    sys.exit('chapter not found')
chunk = re.sub(r'\[Illustration:.*?\]', '', chunk, flags=re.S)
paras = [re.sub(r'\s+', ' ', p).strip() for p in re.split(r'\n\s*\n', chunk) if p.strip()]
total = 0
for i, p in enumerate(paras):
    total += len(p.split())
    print(f'[{i}] ({len(p.split())}w, cum {total}) {p}')
