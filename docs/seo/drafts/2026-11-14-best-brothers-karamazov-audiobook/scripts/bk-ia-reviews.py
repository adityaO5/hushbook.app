"""Print every archive.org review of a saved /metadata/<identifier> response, character for character
(reviewer, stars, date, title, body), plus a keyword filter for accent / quality / pronunciation lines.
New 2026-11-13 for Jane Eyre (lesson 2 of the 2026-11-12 review: read the reviews array). Copied unchanged 2026-11-14 for The Brothers Karamazov.
Usage: python -I bk-ia-reviews.py <meta_<identifier>.json> [<more.json> ...]
"""
import json, re, sys
sys.stdout.reconfigure(encoding='utf-8')
KEY = re.compile(r'accent|british|american|english|pronoun|french|st\.? ?john|sinjin|voice|quality|sound|noise|volume|pace|speed|slow|fast|monoton|reader|narrat|version', re.I)
for path in sys.argv[1:]:
    m = json.load(open(path, encoding='utf-8'))
    md = m.get('metadata', {})
    rv = m.get('reviews', [])
    print('=' * 100)
    print(md.get('identifier'), '|', md.get('title'), '|', md.get('runtime'), '| reviews:', len(rv))
    for r in sorted(rv, key=lambda r: r.get('reviewdate', '')):
        print('-' * 60)
        print(f"{r.get('reviewer')} | {r.get('stars')} stars | {r.get('reviewdate')} | title: {r.get('reviewtitle')}")
        print(r.get('reviewbody'))
