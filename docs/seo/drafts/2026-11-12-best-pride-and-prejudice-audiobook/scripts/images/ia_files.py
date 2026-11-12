"""Print every file entry of an archive.org item whose name contains one of the given substrings.
Usage: python -I ia_files.py <meta.json> <substr> [<substr> ...]
"""
import json
import sys

with open(sys.argv[1], encoding='utf-8') as f:
    meta = json.load(f)
for x in meta.get('files', []):
    name = x.get('name', '')
    if any(s in name for s in sys.argv[2:]):
        keep = {k: x.get(k) for k in ('name', 'format', 'title', 'length', 'size', 'track', 'artist', 'album', 'source', 'sha1', 'md5')}
        print(json.dumps(keep, ensure_ascii=False))
