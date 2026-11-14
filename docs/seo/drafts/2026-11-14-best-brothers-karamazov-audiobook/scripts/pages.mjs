// Copied 2026-11-14 from ../../2026-11-13-best-jane-eyre-audiobook/scripts/pages.mjs (parent: WH wh-pages.mjs); NAMES default changed for The Brothers Karamazov translators and narrators.
// Fetch competing pages and outline them: dates in markup, headings, word count, which narrators/translators they name.
// node pages.mjs <outDir> <url...>
import fs from 'node:fs';
import path from 'node:path';
const [, , outDir, ...urls] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const dec = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#0?39;|&#x27;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/&#8217;/g, "'").replace(/&#8211;|&ndash;/g, '-').replace(/\s+/g, ' ').trim();
const NAMES = (process.env.NAMES || "LibriVox,Naxos,Penguin,BBC,full cast,abridged,unabridged,translation,Garnett,McDuff,Pevear,Avsey,MacAndrew,Magarshack,Katz,Guidall,Vance,Davidson,Gregory,Homewood,Kane,Rees,Crossley,Nelson,Grand Inquisitor,Zosima,Whispersync").split(",");
for (const url of urls) {
  const file = path.join(outDir, url.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '_').slice(0, 90) + '.html');
  let html;
  if (fs.existsSync(file)) html = fs.readFileSync(file, 'utf8');
  else {
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.8' } });
    html = await r.text();
    fs.writeFileSync(file, html);
    console.log(`\n=== ${url} [HTTP ${r.status}, ${html.length} bytes]`);
  }
  const dates = [...html.matchAll(/"(datePublished|dateModified|uploadDate)"\s*:\s*"([^"]+)"|property="article:(published_time|modified_time)"\s+content="([^"]+)"|<time[^>]*datetime="([^"]+)"/g)].map((m) => (m[1] || m[3] || 'time') + '=' + (m[2] || m[4] || m[5])).slice(0, 6);
  const title = dec((html.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '');
  const body = (html.match(/<article[\s\S]*?<\/article>/) || html.match(/<main[\s\S]*?<\/main>/) || [html])[0].replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');
  const heads = [...body.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => `h${m[1]} ${dec(m[2])}`).filter((h) => h.length > 3).slice(0, 40);
  const text = dec(body);
  const named = NAMES.map((n) => [n, (text.match(new RegExp(n, 'g')) || []).length]).filter(([, c]) => c).map(([n, c]) => `${n} ${c}`);
  const hours = [...new Set((text.match(/\b\d{1,2}\s?(?:h|hrs?|hours)\b(?:\s?(?:and\s)?\d{1,2}\s?(?:m|min|mins|minutes)\b)?/gi) || []))].slice(0, 15);
  console.log(`\n--- ${url}\ntitle: ${title}\ndates: ${dates.join(' | ') || 'none in markup'}\nwords: ~${text.split(' ').length}\nnames: ${named.join(', ')}\nruntimes: ${hours.join(', ')}\nheadings:\n  ${heads.join('\n  ')}`);
}
