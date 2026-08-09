'use strict';
const fs=require('node:fs'), path=require('node:path');
const titles={
 tr:'HushBook — Her audiobook’u oku ve dinle', ru:'HushBook — Читайте и слушайте любую аудиокнигу', uk:'HushBook — Читайте й слухайте будь-яку аудіокнигу', ar:'HushBook — اقرأ واستمع إلى أي كتاب صوتي', id:'HushBook — Baca dan dengarkan audiobook apa pun', th:'HushBook — อ่านและฟังหนังสือเสียงทุกเล่ม', vi:'HushBook — Đọc và nghe mọi sách nói', sv:'HushBook — Läs och lyssna på valfri ljudbok', da:'HushBook — Læs og lyt til enhver lydbog'
};
const pages=['index.html','download.html','about.html','privacy-policy.html','terms-conditions.html','refund-policy.html','licenses.html'];
for(const [locale,title] of Object.entries(titles)) for(const page of pages){const p=path.join(locale,page);let h=fs.readFileSync(p,'utf8');h=h.replace(/<title>[^<]*<\/title>/i,`<title>${title}</title>`).replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/i,`$1${title}$2`).replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/i,`$1${title}$2`);fs.writeFileSync(p,h)}
console.log('Localized metadata for',Object.keys(titles).join(', '));
