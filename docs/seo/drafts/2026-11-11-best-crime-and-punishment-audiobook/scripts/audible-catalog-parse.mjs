// Parse Audible catalogue API JSON into a compact table.
import fs from 'node:fs';
const files = process.argv.slice(2);
const seen = new Map();
for (const f of files) {
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const p of j.products || []) {
    if (seen.has(p.asin)) continue;
    seen.set(p.asin, p);
  }
}
const strip = (s) => (s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const rows = [];
for (const p of seen.values()) {
  const authors = (p.authors || []).map((a) => a.name).join('; ');
  if (!/dostoevsk|dostoyevsk|dostoievsk/i.test(authors + ' ' + p.title)) continue;
  if (!/crime/i.test(p.title + ' ' + (p.subtitle || ''))) continue;
  const narr = (p.narrators || []).map((a) => a.name).join('; ');
  const r = p.rating?.overall_distribution;
  const desc = strip(p.publisher_summary) + ' || ' + strip(p.merchandising_summary);
  const tr = (desc.match(/translat[^.|]{0,120}/gi) || []).slice(0, 3).join(' / ');
  rows.push({
    asin: p.asin,
    title: p.title + (p.subtitle ? ': ' + p.subtitle : ''),
    authors,
    narr,
    pub: p.publisher_name,
    rel: p.release_date || p.issue_date,
    min: p.runtime_length_min,
    hm: p.runtime_length_min ? `${Math.floor(p.runtime_length_min / 60)}:${String(p.runtime_length_min % 60).padStart(2, '0')}` : '',
    fmt: p.format_type,
    lang: p.language,
    type: p.content_delivery_type,
    rating: r ? `${r.display_average_rating} (${r.num_ratings})` : '',
    sample: p.sample_url ? 'yes' : 'no',
    tr,
  });
}
rows.sort((a, b) => (b.min || 0) - (a.min || 0));
for (const r of rows) console.log(JSON.stringify(r));
console.error('total', rows.length);
