"""Print chosen files of an archive.org item's metadata (size, length, md5, title) and the start time of
a 64 kbps track from the lengths of the tracks before it.
Usage: python -I ia_files.py <meta.json> <track> name1 [name2 ...]
"""
import json
import sys

meta = json.load(open(sys.argv[1], encoding='utf-8'))
track = int(sys.argv[2])
files = meta['files']
by = {f['name']: f for f in files}
for n in sys.argv[3:]:
    f = by.get(n)
    print(n, '->', {k: f.get(k) for k in ('format', 'size', 'length', 'md5', 'title', 'width', 'height')} if f else 'missing')
mp3 = sorted([f for f in files if f.get('format') == '64Kbps MP3'], key=lambda f: f['name'])


def secs(v):
    v = str(v)
    if ':' in v:
        p = [float(x) for x in v.split(':')]
        s = 0
        for x in p:
            s = s * 60 + x
        return s
    return float(v)


tot = sum(secs(f['length']) for f in mp3)
before = sum(secs(f['length']) for f in mp3[:track - 1])
h, r = divmod(round(before), 3600)
m, s = divmod(r, 60)
print('64kbps files', len(mp3), 'total', round(tot, 1), 's; track', track, 'starts at', f'{h}:{m:02d}:{s:02d}', f'({before / tot * 100:.1f}% in)', 'title', mp3[track - 1].get('title'), 'length', mp3[track - 1].get('length'))
vbr = [f for f in files if f.get('format') == 'VBR MP3']
vbr.sort(key=lambda f: f['name'])
print('VBR first:', vbr[0]['name'], vbr[0].get('length'), vbr[0].get('size'))
