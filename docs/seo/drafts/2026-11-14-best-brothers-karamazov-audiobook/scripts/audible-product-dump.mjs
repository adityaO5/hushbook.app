// Copied unchanged 2026-11-14 from ../../2026-11-13-best-jane-eyre-audiobook/scripts/audible-product-dump.mjs; used for The Brothers Karamazov.
// Copied unchanged 2026-11-12 from ../../2026-11-11-best-crime-and-punishment-audiobook/scripts/audible-product-dump.mjs. Usage: node audible-product-dump.mjs <dir of pp-audible-products.mjs output>
import fs from 'node:fs';
import path from 'node:path';
const dir = process.argv[2];
const strip = (s) => (s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
for (const f of fs.readdirSync(dir)) {
  const j = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const p = j.product;
  if (!p) { console.log(f, 'NO PRODUCT', JSON.stringify(j).slice(0, 200)); continue; }
  const r = p.rating?.overall_distribution;
  const perf = p.rating?.performance_distribution;
  const story = p.rating?.story_distribution;
  const price = p.price?.list_price ? `${p.price.list_price.base} ${p.price.list_price.currency_code}` : '';
  const plans = (p.plans || []).map((x) => x.plan_name).join(',');
  console.log('=====', p.asin, '|', p.title, '|', p.subtitle || '');
  console.log('authors:', (p.authors || []).map((a) => a.name).join('; '));
  console.log('narrators:', (p.narrators || []).map((a) => a.name).join('; '));
  console.log('publisher:', p.publisher_name, '| release:', p.release_date, '| issue:', p.issue_date, '| runtime_min:', p.runtime_length_min, '| format:', p.format_type, '| lang:', p.language);
  console.log('rating overall:', r?.display_average_rating, `(${r?.num_ratings})`, '| performance:', perf?.display_average_rating, `(${perf?.num_ratings})`, '| story:', story?.display_average_rating, `(${story?.num_ratings})`, '| reviews:', p.rating?.num_reviews);
  console.log('price:', price, '| plans:', plans, '| sample:', p.sample_url ? p.sample_url.slice(0, 90) : 'none');
  console.log('copyright:', p.copyright || '', '| isbn:', p.isbn || '', '| sku:', p.sku || '', p.sku_lite || '');
  const rel = (p.relationships || []).map((x) => `${x.relationship_type}:${x.relationship_to_product}:${x.asin}`).join(' ');
  console.log('relationships:', rel);
  console.log('summary:', strip(p.publisher_summary).slice(0, 900));
  if (p.merchandising_summary) console.log('merch:', strip(p.merchandising_summary).slice(0, 300));
}
