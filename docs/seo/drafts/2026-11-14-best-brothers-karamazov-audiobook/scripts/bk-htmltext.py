"""Readable text of a saved HTML page (scripts, styles and tags removed), optionally only lines matching a pattern.
Copied 2026-11-14 from ../../2026-11-13-best-jane-eyre-audiobook/scripts/je-htmltext.py (new there); pattern filter added.
Usage: python -I bk-htmltext.py <page.html> [regex] [context-chars]"""
import html, re, sys
sys.stdout.reconfigure(encoding='utf-8')
t = open(sys.argv[1], encoding='utf-8', errors='replace').read()
t = re.sub(r'<(script|style|noscript)[^>]*>[\s\S]*?</\1>', ' ', t, flags=re.I)
t = re.sub(r'<br\s*/?>|</p>|</li>|</h\d>|</tr>|</div>', '\n', t, flags=re.I)
t = html.unescape(re.sub(r'<[^>]+>', ' ', t))
t = '\n'.join(' '.join(l.split()) for l in t.splitlines() if l.strip())
if len(sys.argv) > 2:
    c = int(sys.argv[3]) if len(sys.argv) > 3 else 200
    for m in re.finditer(sys.argv[2], t, flags=re.I):
        print('…', t[max(0, m.start() - c):m.end() + c].replace('\n', ' | '), '…\n')
else:
    print(t)
