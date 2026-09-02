'use strict';
const fs = require('node:fs'), path = require('node:path');
const locales = ['de','fr','es-ES','es-419','pt-BR','pt-PT','it','ja','ko','nl','pl','tr','ru','uk','ar','id','th','vi','sv','da'];
const source = 'Audiobook with synced text';
const lines = ['# Localization meaning audit — hero copy','',`Source: **${source}**`,`Generated: ${new Date().toISOString()}`,'','| Locale | Current hero text | Finding |','|---|---|---|'];
for (const locale of locales) {
  const h = fs.readFileSync(path.join(locale,'index.html'),'utf8');
  const m = h.match(/<h1 id="hero-h1"[^>]*>([\s\S]*?)<\/h1>/);
  const text = (m?.[1]||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  const bad = /Transcribe|Any Any|ログイン|其他|Transemon|Напишите|Aucun|Translate|Transcript|Bản sao|транскриптор|订阅|구독|\bDownload\b/i.test(text);
  lines.push(`| ${locale} | ${text.replace(/\|/g,'\\|')} | ${bad ? '**Meaning risk — repair required**' : 'Verified OK'} |`);
}
fs.writeFileSync('docs/localization-meaning-report.md', lines.join('\n') + '\n');
console.log(lines.slice(5).join('\n'));
