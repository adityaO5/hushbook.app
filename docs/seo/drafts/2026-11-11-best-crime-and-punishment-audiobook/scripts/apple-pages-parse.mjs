import fs from 'node:fs';
for (const f of fs.readdirSync('apple').filter((x) => x.startsWith('p') && x.endsWith('.html'))) {
  const h = fs.readFileSync('apple/' + f, 'utf8');
  const blocks = [...h.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let ld = null;
  for (const b of blocks) {
    try {
      const j = JSON.parse(b);
      if (/Audiobook|Book/.test(JSON.stringify(j['@type'] || ''))) ld = j;
    } catch {}
  }
  const i = h.indexOf('NARRATOR');
  const narrSnip = i > 0 ? h.slice(i, i + 600).replace(/<[^>]+>/g, '|').replace(/\|+/g, '|') : '';
  const j2 = h.indexOf('PUBLISHER');
  const pubSnip = j2 > 0 ? h.slice(j2, j2 + 400).replace(/<[^>]+>/g, '|').replace(/\|+/g, '|') : '';
  if (!ld) { console.log(f, 'NO LD', h.length); continue; }
  const r = ld.aggregateRating || {};
  console.log([f.replace(/\D/g, ''), ld.name, '| dur', ld.duration, '| rating', r.ratingValue ?? '-', `(${r.reviewCount ?? r.ratingCount ?? 0})`, '| date', ld.datePublished || '', '| price', JSON.stringify(ld.offers || '').slice(0, 80)].join(' '));
  console.log('    ', narrSnip.slice(0, 120), ' || ', pubSnip.slice(0, 100));
}
