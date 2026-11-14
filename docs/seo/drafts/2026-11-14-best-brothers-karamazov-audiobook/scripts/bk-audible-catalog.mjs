// Audible catalogue API (no auth): search The Brothers Karamazov on four marketplaces,
// save the raw JSON, and print one line per Dostoevsky "Karamazov" product (authors column keeps translators).
// Copied 2026-11-14 from ../../2026-11-13-best-jane-eyre-audiobook/scripts/je-audible-catalog.mjs
// (parent: P&P pp-audible-catalog.mjs, W&P wp-audible-catalog.mjs); keywords and filters changed; authors kept in full.
//
// Usage: node bk-audible-catalog.mjs <outdir>
// Run 2026-11-14 for research-platforms.md section 1.
import fs from 'node:fs';

const outdir = process.argv[2];
fs.mkdirSync(outdir, { recursive: true });
const UA = { 'User-Agent': 'Mozilla/5.0 (research script)' };
const RG = 'contributors,product_desc,product_attrs,rating,media,sample,series,relationships';
const hosts = ['api.audible.com', 'api.audible.co.uk', 'api.audible.ca', 'api.audible.com.au'];
const kws = [
  'brothers karamazov', 'the brothers karamazov dostoevsky', 'the brothers karamazov dostoyevsky', 'brothers karamazov unabridged', 'the karamazov brothers',
  'brothers karamazov pevear', 'brothers karamazov volokhonsky', 'brothers karamazov mcduff', 'brothers karamazov garnett', 'brothers karamazov avsey',
  'brothers karamazov magarshack', 'brothers karamazov macandrew', 'brothers karamazov katz', 'brothers karamazov translated',
  'brothers karamazov luke thompson', 'brothers karamazov frederick davidson', 'brothers karamazov constantine gregory', 'brothers karamazov george guidall',
  'brothers karamazov naxos', 'brothers karamazov penguin classics', 'brothers karamazov bbc', 'brothers karamazov full cast', 'brothers karamazov dramatisation',
  'brothers karamazov abridged', 'brothers karamazov audible', 'grand inquisitor dostoevsky', 'the grand inquisitor', 'dostoevsky collection', 'dostoyevsky collection',
  'karamazov', 'brothers karamazov bicentennial',
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
  const tt = p.title + ' ' + (p.subtitle || '');
  if (!/dosto/i.test(authors + ' ' + tt)) continue;
  if (!/karamazov|grand inquisitor/i.test(tt + ' ' + strip(p.publisher_summary).slice(0, 400))) continue;
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
    tr: (desc.match(/translat[^.|]{0,120}/gi) || []).slice(0, 2).join(' / '),
    abr: (desc.match(/abridg[^.|]{0,100}|dramati[sz][^.|]{0,100}|full[- ]cast[^.|]{0,80}/gi) || []).slice(0, 3).join(' / '),
  });
}
rows.sort((a, b) => a.host.localeCompare(b.host) || (b.min || 0) - (a.min || 0));
for (const r of rows) console.log(JSON.stringify(r));
console.error('total', rows.length);
