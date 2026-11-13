"""Print the Jane Eyre rows of je-audible-catalog.mjs output for one market, single titles only (runtime under 30 h),
English, longest first. New 2026-11-13. Usage: python -I je-aud-rows.py <rows.jsonl> <host: com|co.uk|ca|com.au> [maxmin]"""
import json, sys
sys.stdout.reconfigure(encoding='utf-8')
rows = [json.loads(l) for l in open(sys.argv[1], encoding='utf8')]
mx = int(sys.argv[3]) if len(sys.argv) > 3 else 1800
for r in rows:
    if r['host'] != sys.argv[2]: continue
    if (r.get('lang') or 'english').lower() != 'english': continue
    if (r.get('min') or 0) > mx: continue
    g = r.get
    print(g('asin'), '|', (g('narr') or '')[:55], '|', (g('pub') or '')[:26], '|', g('rel'), '|', g('hm'), '|', g('fmt'), '|',
          g('rating'), '/', (g('perf') or '').split(' ')[0], '|', (g('title') or '')[:60], '|', (g('abr') or '')[:90])
