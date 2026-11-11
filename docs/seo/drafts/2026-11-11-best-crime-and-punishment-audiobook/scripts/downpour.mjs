// Downpour search -> each product's Shopify JSON (/products/<handle>.json):
// title, vendor, tags (narrator, runtime, DRM hints), variants and prices.
//
// Usage: node downpour.mjs "crime and punishment"
// Run 2026-11-11 for research-platforms.md section 1.
const q = process.argv[2] || 'crime and punishment';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';
const H = { 'User-Agent': UA };
const html = await (await fetch(`https://downpour.com/search?q=${encodeURIComponent(q)}`, { headers: H })).text();
const handles = [...new Set([...html.matchAll(/\/products\/([a-z0-9-]+)\?/g)].map((m) => m[1]))];
console.error('products:', handles.length);
const strip = (s) => (s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
for (const h of handles) {
  await new Promise((res) => setTimeout(res, 4000)); // Downpour answers 429 to faster requests
  const r = await fetch(`https://downpour.com/products/${h}.json`, { headers: H });
  if (!r.ok) { console.log(h, 'HTTP', r.status); continue; }
  const p = (await r.json()).product;
  if (!/crime and punishment/i.test(p.title)) continue;
  const body = strip(p.body_html);
  console.log(JSON.stringify({
    url: `https://downpour.com/products/${h}`,
    title: p.title,
    vendor: p.vendor,
    tags: p.tags,
    variants: (p.variants || []).map((v) => `${v.title}: $${v.price}`).join('; '),
    narr: (body.match(/(Read by|Narrated by|Performed by)[^.]{0,80}/i) || [])[0] || '',
    drm: (body.match(/DRM[^.]{0,80}/i) || [])[0] || '',
    body: body.slice(0, 160),
  }));
  await new Promise((res) => setTimeout(res, 600));
}
