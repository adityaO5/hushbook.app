'use strict';
const fs = require('node:fs');
const path = require('node:path');

const copy = {
  de: ['Hörbuch', 'mit', 'synchronisiertem', 'Text.'],
  fr: ['Livre audio', 'avec', 'texte', 'synchronisé.'],
  'fr-argos': ['Livre audio', 'avec', 'texte', 'synchronisé.'],
  'es-ES': ['Audiolibro', 'con', 'texto', 'sincronizado.'],
  'es-419': ['Audiolibro', 'con', 'texto', 'sincronizado.'],
  es: ['Audiolibro', 'con', 'texto', 'sincronizado.'],
  'pt-BR': ['Audiolivro', 'com', 'texto', 'sincronizado.'],
  'pt-PT': ['Audiolivro', 'com', 'texto', 'sincronizado.'],
  pt: ['Audiolivro', 'com', 'texto', 'sincronizado.'],
  it: ['Audiolibro', 'con', 'testo', 'sincronizzato.'],
  ja: ['同期テキスト付き', 'オーディオブック'],
  ko: ['동기화된', '텍스트가 있는', '오디오북'],
  nl: ['Luisterboek', 'met', 'gesynchroniseerde', 'tekst.'],
  pl: ['Audiobook', 'ze', 'zsynchronizowanym', 'tekstem.'],
  tr: ['Senkronize', 'metinli', 'sesli kitap.'],
  ru: ['Аудиокнига', 'со', 'синхронизированным', 'текстом.'],
  uk: ['Аудіокнига', 'зі', 'синхронізованим', 'текстом.'],
  ar: ['كتاب صوتي', 'مع', 'نص', 'متزامن.'],
  id: ['Audiobook', 'dengan', 'teks', 'tersinkronisasi.'],
  th: ['หนังสือเสียง', 'พร้อมข้อความ', 'ที่ซิงค์'],
  vi: ['Sách nói', 'có', 'văn bản', 'đồng bộ.'],
  sv: ['Ljudbok', 'med', 'synkroniserad', 'text.'],
  da: ['Lydbog', 'med', 'synkroniseret', 'tekst.']
};

for (const [locale, words] of Object.entries(copy)) {
  const p = path.join(locale, 'index.html');
  if (!fs.existsSync(p)) continue;
  let h = fs.readFileSync(p, 'utf8');
  const ariaLabel = words.join(' ');
  const innerHtml = words.map(w => `<span class="kw">${w}</span>`).join(' ');
  h = h.replace(/<h1 id="hero-h1"[^>]*>[\s\S]*?<\/h1>/, `<h1 id="hero-h1" class="reveal" aria-label="${ariaLabel}">${innerHtml}</h1>`);
  fs.writeFileSync(p, h);
}

console.log('Updated hero copy for', Object.keys(copy).length, 'locales to Audiobook with Synced Text');
