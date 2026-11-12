// Compact table from saved Audible product records (pp-audible-products.mjs output).
// node pp-audible-table.mjs <dir>   -> one line per product: asin | narrators | publisher | release | h:mm | format | rating (n) / perf | price | plans | accent words in summary
import fs from 'node:fs';
import path from 'node:path';
const dir = process.argv[2];
const strip = (s) => (s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
for (const f of fs.readdirSync(dir)) {
  const p = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).product;
  if (!p) continue;
  const r = p.rating?.overall_distribution, perf = p.rating?.performance_distribution;
  const sum = strip(p.publisher_summary);
  const acc = (sum.match(/[^.]{0,60}\b(American|British|English|Irish|Scottish|Australian|accent|actress|actor|award|Audie|Earphones?)\b[^.]{0,60}/gi) || []).slice(0, 3).join(' // ');
  console.log([p.asin, (p.narrators || []).map((a) => a.name).join('; ').slice(0, 70), p.publisher_name, p.release_date,
    p.runtime_length_min ? `${Math.floor(p.runtime_length_min / 60)}:${String(p.runtime_length_min % 60).padStart(2, '0')}` : '', p.format_type,
    r ? `${r.display_average_rating} (${r.num_ratings}) / ${perf?.display_average_rating}` : '', p.price?.list_price ? `$${(+p.price.list_price.base).toFixed(2)}` : '',
    (p.plans || []).map((x) => x.plan_name).join(','), acc].join(' | '));
}
