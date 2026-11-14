// Copied unchanged 2026-11-14 from ../../2026-11-13-best-jane-eyre-audiobook/scripts/je-audible-products.mjs (parent: P&P pp-audible-products.mjs); used for The Brothers Karamazov.
// Fetch Audible catalogue product records (no auth) for a list of ASINs on one
// marketplace and save them; parse with
// ../../2026-11-11-best-crime-and-punishment-audiobook/scripts/audible-product-dump.mjs <outdir>.
//
// Usage: node pp-audible-products.mjs <outdir> <host e.g. api.audible.com> ASIN [ASIN ...]
// Run 2026-11-12 for research-platforms.md section 1 (Pride and Prejudice).
// Adapted from ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-audible-products.mjs (unchanged logic).
import fs from 'node:fs';

const [outdir, host, ...asins] = process.argv.slice(2);
fs.mkdirSync(outdir, { recursive: true });
const RG = 'contributors,product_desc,product_extended_attrs,product_attrs,rating,media,sample,price,product_plans,relationships,series,sku,customer_rights';
for (const asin of asins) {
  const url = `https://${host}/1.0/catalog/products/${asin}?response_groups=${RG}`;
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (research script)' } });
    const t = await r.text();
    fs.writeFileSync(`${outdir}/${host.replace('api.audible.', '')}_${asin}.json`, t);
    console.log(asin, r.status, t.length);
  } catch (e) { console.log(asin, 'ERR', e.message); }
  await new Promise((r) => setTimeout(r, 300));
}
