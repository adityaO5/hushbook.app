"""The chapter list HushBook builds from an archive.org item (librivox_provider.dart _chosenChapterFiles
and _chaptersFrom at HEAD c0040d1): mp3 files grouped by name stem, best format per stem (64 kbps >
128 kbps > VBR), track from the first variant with digits, tracked stems in track order then by name,
untracked ones last by name; title from the chosen file, else filled from another variant.
Usage: python -I ia_chapter_order.py <meta.json> [substr ...]   prints index (1-based), title, length, track, name
"""
import json
import re
import sys

with open(sys.argv[1], encoding='utf-8') as f:
    meta = json.load(f)
files = [x for x in meta.get('files', []) if x.get('name', '').lower().endswith('.mp3') and 'mp3' in (x.get('format') or '').lower()]
prio = {'64Kbps MP3': 3, '128Kbps MP3': 2, 'VBR MP3': 1}
stems = {}
for x in files:
    stem = re.sub(r'(_(64|128)kb|_vbr)?\.mp3$', '', x['name'].lower())
    stems.setdefault(stem, []).append(x)
tracked, untracked = [], []
for variants in stems.values():
    chosen = variants[0]
    for v in variants[1:]:
        if prio.get(v.get('format'), 0) > prio.get(chosen.get('format'), 0):
            chosen = v
    chosen = dict(chosen)
    for tag in ('title', 'artist'):
        if not chosen.get(tag):
            for v in variants:
                if v.get(tag):
                    chosen[tag] = v[tag]
                    break
    track = None
    for v in variants:
        m = re.search(r'\d+', str(v.get('track') or ''))
        if m:
            track = int(m.group(0))
            break
    (tracked if track is not None else untracked).append((track, chosen))
tracked.sort(key=lambda t: (t[0], t[1]['name']))
untracked.sort(key=lambda t: t[1]['name'])
order = tracked + untracked
want = sys.argv[2:]
print('chapters:', len(order))
for i, (track, x) in enumerate(order, 1):
    if not want or any(w in x['name'] or w == x.get('title') for w in want):
        print(i, '|', x.get('title'), '|', x.get('length'), '| track', track, '|', x['name'], '| artist', x.get('artist'))
