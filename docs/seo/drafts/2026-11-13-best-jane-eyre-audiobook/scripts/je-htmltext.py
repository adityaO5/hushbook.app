# Print readable text of a saved HTML page (new 2026-11-13; used to read competitor pages, Gutenberg records,
# Wikisource pages and the OpenEdition article). python -I je-htmltext.py <file> [maxchars]
import re, sys, html
t = open(sys.argv[1], encoding='utf8', errors='replace').read()
t = re.sub(r'<script.*?</script>|<style.*?</style>', '', t, flags=re.S)
t = re.sub(r'<(tr|p|h[1-6]|li|div|br)[^>]*>', '\n', t)
t = re.sub(r'</t[dh]>', ' | ', t)
t = html.unescape(re.sub(r'<[^>]+>', ' ', t))
t = re.sub(r'[ \t]+', ' ', t)
out = '\n'.join(l.strip() for l in t.splitlines() if l.strip())
n = int(sys.argv[2]) if len(sys.argv) > 2 else 6000
sys.stdout.buffer.write(out[:n].encode('utf8'))
