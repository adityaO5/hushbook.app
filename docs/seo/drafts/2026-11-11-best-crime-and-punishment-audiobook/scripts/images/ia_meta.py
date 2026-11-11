"""Print an archive.org item's title, creator, licence, cover images and its 64 kbps chapter files.
Usage: python -I ia_meta.py <meta.json> [n_files]
"""
import json
import sys

with open(sys.argv[1], encoding='utf-8') as f:
    meta = json.load(f)
n = int(sys.argv[2]) if len(sys.argv) > 2 else 4
m = meta.get('metadata', {})
for k in ('identifier', 'title', 'creator', 'licenseurl', 'runtime', 'date', 'publicdate'):
    print(f'{k}:', m.get(k))
files = meta.get('files', [])
print('-- images')
for x in files:
    name = x.get('name', '')
    if name.lower().endswith(('.jpg', '.jpeg', '.png')):
        print(' ', name, x.get('format'), x.get('size'), x.get('width'), x.get('height'), x.get('source'))
mp3 = [x for x in files if x.get('name', '').endswith('.mp3') and x.get('format') == '64Kbps MP3']
mp3.sort(key=lambda x: x['name'])
print('-- 64 kbps mp3 files:', len(mp3))
for x in mp3[:n] + (['...'] if len(mp3) > n else []) + mp3[-2:]:
    if x == '...':
        print('  ...')
        continue
    print(' ', x.get('name'), '|', x.get('title'), '|', x.get('length'), '|', x.get('track'), '|', x.get('artist'))
