// Audible catalogue API (no auth): search Wuthering Heights on four marketplaces,
// save the raw JSON, and print one line per Bronte "Wuthering Heights" product.
// Adapted from ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-audible-catalog.mjs.
// Words a minute = 107,000-ish words / runtime is computed later in wh-wordcount.py, not here.
//
// Usage: node wh-audible-catalog.mjs <outdir>
// Run 2026-11-12 for research-platforms.md section 1.
import fs from 'node:fs';

const outdir = process.argv[2];
fs.mkdirSync(outdir, { recursive: true });
const UA = { 'User-Agent': 'Mozilla/5.0 (research script)' };
const RG = 'contributors,product_desc,product_attrs,rating,media,sample,series,relationships';
const hosts = ['api.audible.com', 'api.audible.co.uk', 'api.audible.ca', 'api.audible.com.au'];
const kws = [
  'wuthering heights', 'wuthering heights bronte', 'wuthering heights unabridged', 'wuthering heights emily bronte',
  'wuthering heights dramatisation', 'wuthering heights bbc', 'wuthering heights full cast', 'wuthering heights abridged',
  'wuthering heights joanne froggatt', 'wuthering heights juliet stevenson', 'wuthering heights patricia routledge',
  'wuthering heights michael kitchen', 'wuthering heights janet mcteer', 'wuthering heights david timson',
  'wuthering heights emma messenger', 'wuthering heights carolyn seymour', 'wuthering heights aimee lou wood',
  'wuthering heights billie fulford-brown', 'wuthering heights naxos', 'wuthering heights penguin classics',
  'wuthering heights audible original', 'wuthering heights retelling',
];
const fetchJson = async (url) => {
  for (let a = 0; a < 4; a++) {
    try { const r = await fetch(url, { headers: UA }); return await r.json(); } catch (e) { console.error('retry', a, e.message); await new Promise((r) => setTimeout(r, 4000 * (a + 1))); }
  }
  throw new Error('failed ' + url);
};
const seen = new Map();
for (const host of hosts) {
  for (const kw of kws) {
    for (const page of [0, 1]) {
      const url = `https://${host}/1.0/catalog/products?keywords=${encodeURIComponent(kw)}&num_results=50&page=${page}&response_groups=${RG}&products_sort_by=Relevance`;
      try {
        const j = await fetchJson(url);
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
  if (!/bront/i.test(authors + ' ' + p.title + ' ' + (p.subtitle || ''))) continue;
  if (!/wuthering/i.test(p.title + ' ' + (p.subtitle || ''))) continue;
  const r = p.rating?.overall_distribution;
  const perf = p.rating?.performance_distribution;
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
    summary: strip(p.publisher_summary).slice(0, 160),
  });
}
rows.sort((a, b) => a.host.localeCompare(b.host) || (b.min || 0) - (a.min || 0));
fs.writeFileSync(`${outdir}/rows.json`, JSON.stringify(rows, null, 1));
for (const r of rows) console.log(JSON.stringify(r));
console.error('total', rows.length);
