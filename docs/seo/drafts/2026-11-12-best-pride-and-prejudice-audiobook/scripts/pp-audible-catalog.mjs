// Audible catalogue API (no auth): search Pride and Prejudice on four marketplaces,
// save the raw JSON, and print one line per Austen "Pride and Prejudice" product.
// Adapted 2026-11-12 from ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-audible-catalog.mjs.
// Reuses the method of ../../2026-11-11-best-crime-and-punishment-audiobook/scripts/audible-catalog-parse.mjs.
//
// Usage: node pp-audible-catalog.mjs <outdir>
// Run 2026-11-12 for research-platforms.md section 1.
import fs from 'node:fs';

const outdir = process.argv[2];
fs.mkdirSync(outdir, { recursive: true });
const UA = { 'User-Agent': 'Mozilla/5.0 (research script)' };
const RG = 'contributors,product_desc,product_attrs,rating,media,sample,series,relationships';
const hosts = ['api.audible.com', 'api.audible.co.uk', 'api.audible.ca', 'api.audible.com.au'];
const kws = [
  'pride and prejudice', 'pride and prejudice austen', 'pride and prejudice unabridged', 'pride & prejudice', 'pride and prejudice jane austen audiobook',
  'pride and prejudice rosamund pike', 'pride and prejudice juliet stevenson', 'pride and prejudice karen savage', 'pride and prejudice julie andrews',
  'pride and prejudice emilia fox', 'pride and prejudice lindsay duncan', 'pride and prejudice kate reading', 'pride and prejudice flo gibson',
  'pride and prejudice jennifer ehle', 'pride and prejudice bbc', 'pride and prejudice dramatisation', 'pride and prejudice full cast',
  'pride and prejudice audible original', 'pride and prejudice drama', 'pride and prejudice abridged', 'pride and prejudice annotated',
  'jane austen collection', 'jane austen complete novels',
];
const seen = new Map();
for (const host of hosts) {
  for (const kw of kws) {
    for (const page of [0, 1]) {
      const url = `https://${host}/1.0/catalog/products?keywords=${encodeURIComponent(kw)}&num_results=50&page=${page}&response_groups=${RG}&products_sort_by=Relevance`;
      try {
        const r = await fetch(url, { headers: UA });
        const j = await r.json();
        fs.writeFileSync(`${outdir}/${host}_${kw.replace(/\W+/g, '-')}_${page}.json`, JSON.stringify(j));
        for (const p of j.products || []) {
          const key = `${host}|${p.asin}`;
          if (!seen.has(key)) seen.set(key, { host, p });
        }
        if ((j.products || []).length < 50) break;
      } catch (e) { console.error('ERR', host, kw, e.message); }
      await new Promise((r) => setTimeout(r, 300));
    }
  }
}
const strip = (s) => (s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const rows = [];
for (const { host, p } of seen.values()) {
  const authors = (p.authors || []).map((a) => a.name).join('; ');
  if (!/austen/i.test(authors + ' ' + p.title + ' ' + (p.subtitle || ''))) continue;
  if (!/pride/i.test(p.title + ' ' + (p.subtitle || ''))) continue;
  const r = p.rating?.overall_distribution;
  const perf = p.rating?.performance_distribution;
  const desc = strip(p.publisher_summary) + ' || ' + strip(p.merchandising_summary);
  rows.push({
    host: host.replace('api.audible.', ''),
    asin: p.asin,
    title: p.title + (p.subtitle ? ': ' + p.subtitle : ''),
    authors,
    narr: (p.narrators || []).map((a) => a.name).join('; '),
    pub: p.publisher_name,
    rel: p.release_date || p.issue_date,
    min: p.runtime_length_min,
    hm: p.runtime_length_min ? `${Math.floor(p.runtime_length_min / 60)}:${String(p.runtime_length_min % 60).padStart(2, '0')}` : '',
    fmt: p.format_type,
    lang: p.language,
    type: p.content_delivery_type,
    rating: r ? `${r.display_average_rating} (${r.num_ratings})` : '',
    perf: perf ? `${perf.display_average_rating} (${perf.num_ratings})` : '',
    sample: p.sample_url || '',
    abr: (desc.match(/abridg[^.|]{0,100}|dramati[sz][^.|]{0,100}|full[- ]cast[^.|]{0,80}/gi) || []).slice(0, 3).join(' / '),
  });
}
rows.sort((a, b) => a.host.localeCompare(b.host) || (b.min || 0) - (a.min || 0));
for (const r of rows) console.log(JSON.stringify(r));
console.error('total', rows.length);
