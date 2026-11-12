// Print the visible text around search terms in saved HTML pages (no network).
// Usage: node pp-grep-pages.mjs <file> <chars> term1 [term2 ...]
// Run 2026-11-12 to read the narrator, podcast and BBC pages for research-platforms.md.
import fs from 'node:fs';
const [file, n, ...terms] = process.argv.slice(2);
const h = fs.readFileSync(file, 'utf8');
const t = h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&#0?39;|&#x27;|&rsquo;|&#8217;/g, "'").replace(/&quot;|&ldquo;|&rdquo;|&#8220;|&#8221;/g, '"')
  .replace(/&nbsp;/g, ' ').replace(/&#8211;|&ndash;|&mdash;|&#8212;/g, '-').replace(/\s+/g, ' ');
const title = (h.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '';
const dates = [...h.matchAll(/"(datePublished|dateModified)"\s*:\s*"([^"]+)"|article:(published_time|modified_time)"\s+content="([^"]+)"/g)].map((m) => (m[1] || m[3]) + '=' + (m[2] || m[4])).slice(0, 4);
console.log(`# ${file}\ntitle: ${title.trim()}\ndates: ${dates.join(' | ')}`);
const seen = new Set();
for (const term of terms) {
  for (const m of t.matchAll(new RegExp(term, 'gi'))) {
    const s = Math.max(0, m.index - +n / 2);
    const key = Math.floor(s / 300);
    if (seen.has(key)) continue;
    seen.add(key);
    console.log(`  [${term}] …${t.slice(s, s + +n)}…`);
  }
}
