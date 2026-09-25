'use strict';

const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

const FACTS_CSS = `.lede{color:var(--muted);font-size:17px;line-height:1.5;margin:0 auto 22px;max-width:46ch}
.facts{list-style:none;margin:0 auto 28px;padding:0;max-width:46ch;text-align:left;color:var(--ink);font-size:15.5px;line-height:1.45}
.facts li{margin:0 0 10px;padding-left:18px;position:relative}
.facts li::before{content:"";position:absolute;left:0;top:.55em;width:7px;height:7px;border-radius:50%;background:var(--gold)}
.after{color:var(--muted);font-size:15px;line-height:1.5;margin:0 auto 28px;max-width:46ch}`;

const downloadCopy = {
  'es-ES': {
    title: 'Descargar HushBook para España',
    description: 'Descarga HushBook en España para iPhone y Android. Transcripción en el teléfono, uso sin conexión tras un motor, sin cuenta.',
    lede: 'Gratis en iPhone y Android. Tras una descarga única del motor en el dispositivo, la reproducción y la transcripción funcionan sin conexión. Sin cuenta.',
    facts: [
      'Importa MP3, M4B y otros audiolibros locales que ya tengas.',
      'La lectura palabra a palabra se queda en tu teléfono.',
      'Clásicos de dominio público de LibriVox y Internet Archive.',
    ],
    after: 'Después de instalar: abre la app, descarga el motor una vez con Wi-Fi y elige un clásico o importa un archivo.',
  },
  'es-419': {
    title: 'Descargar HushBook para Latinoamérica',
    description: 'Descarga HushBook en Latinoamérica para iPhone y Android. Transcripción en el teléfono, uso sin conexión tras un motor, sin cuenta.',
    lede: 'Gratis en iPhone y Android. Tras una descarga única del motor en el dispositivo, la reproducción y la transcripción funcionan sin conexión. Sin cuenta.',
    facts: [
      'Importa MP3, M4B y otros audiolibros locales que ya tengas.',
      'La lectura palabra a palabra se queda en tu teléfono.',
      'Clásicos de dominio público de LibriVox e Internet Archive.',
    ],
    after: 'Después de instalar: abre la app, descarga el motor una vez con Wi-Fi y elige un clásico o importa un archivo.',
  },
  'pt-BR': {
    title: 'Baixar HushBook no Brasil',
    description: 'Baixe o HushBook no Brasil para iPhone e Android. Transcrição no aparelho, offline após o motor, sem conta.',
    lede: 'Grátis no iPhone e no Android. Depois de baixar o motor uma vez no aparelho, a reprodução e a transcrição funcionam offline. Sem conta.',
    facts: [
      'Importe MP3, M4B e outros audiolivros locais que você já possui.',
      'A leitura palavra a palavra fica no seu telefone.',
      'Clássicos de domínio público do LibriVox e do Internet Archive.',
    ],
    after: 'Depois de instalar: abra o app, baixe o motor uma vez no Wi-Fi e escolha um clássico ou importe um arquivo.',
  },
  'pt-PT': {
    title: 'Transferir HushBook em Portugal',
    description: 'Transfira o HushBook em Portugal para iPhone e Android. Transcrição no telemóvel, offline após o motor, sem conta.',
    lede: 'Grátis no iPhone e no Android. Depois de transferir o motor uma vez no dispositivo, a reprodução e a transcrição funcionam offline. Sem conta.',
    facts: [
      'Importe MP3, M4B e outros audiolivros locais que já possui.',
      'A leitura palavra a palavra fica no seu telemóvel.',
      'Clássicos de domínio público da LibriVox e do Internet Archive.',
    ],
    after: 'Depois de instalar: abra a app, transfira o motor uma vez com Wi-Fi e escolha um clássico ou importe um ficheiro.',
  },
};

const defaultDownload = {
  title: null,
  description: 'Download HushBook for iPhone and Android. On-device transcripts, offline after one engine download, no account.',
  lede: 'Free on iPhone and Android. After a one-time on-device engine download, playback and transcription work offline. No account.',
  facts: [
    'Import MP3, M4B, and other local audiobook files you own.',
    'Word-level read-along stays on your phone.',
    'Public-domain classics from LibriVox and the Internet Archive.',
  ],
  after: 'After install: open the app, download the engine once on Wi-Fi, then pick a catalog title or import a file.',
};

function setMetaContent(html, nameOrProp, value, attr = 'name') {
  const re = new RegExp(`(<meta ${attr}="${nameOrProp}" content=")([^"]*)(")`);
  if (!re.test(html)) return html;
  return html.replace(re, `$1${value}$3`);
}

function setTitle(html, title) {
  return html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
}

function insertFactsCss(html) {
  if (html.includes('.facts{list-style:none')) return html;
  return html.replace(
    /h1\{font-family:"Fraunces",Georgia,serif;font-size:clamp\(36px,7vw,58px\);line-height:1\.05;margin:0 0 14px;font-weight:500\}/,
    `h1{font-family:"Fraunces",Georgia,serif;font-size:clamp(36px,7vw,58px);line-height:1.05;margin:0 0 14px;font-weight:500}\n${FACTS_CSS}`,
  );
}

function insertFactsBody(html, copy) {
  if (html.includes('<ul class="facts">')) return html;
  const facts = copy.facts.map((item) => `    <li>${item}</li>`).join('\n');
  const block = `  <p class="lede">${copy.lede}</p>\n  <ul class="facts">\n${facts}\n  </ul>\n  <p class="after">${copy.after}</p>\n  <div class="stores">`;
  return html.replace(/\s*<div class="stores">/, `\n${block}`);
}

function patchDownload(locale) {
  const file = locale === 'en' ? path.join(root, 'download.html') : path.join(root, locale, 'download.html');
  if (locale === 'en') return;
  let html = fs.readFileSync(file, 'utf8');
  const copy = downloadCopy[locale] || {
    ...defaultDownload,
    title: html.match(/<title>([^<]*)<\/title>/)[1],
  };
  if (copy.title) html = setTitle(html, copy.title);
  html = setMetaContent(html, 'description', copy.description);
  html = html.replace(/("description":\s*")([^"]*)(")/, `$1${copy.description}$3`);
  html = setMetaContent(html, 'og:title', copy.title || html.match(/<title>([^<]*)<\/title>/)[1], 'property');
  html = setMetaContent(html, 'og:description', copy.description, 'property');
  html = setMetaContent(html, 'twitter:title', copy.title || html.match(/<title>([^<]*)<\/title>/)[1]);
  html = setMetaContent(html, 'twitter:description', copy.description);
  html = insertFactsCss(html);
  html = insertFactsBody(html, copy);
  fs.writeFileSync(file, html);
}

const homepage = {
  'es-ES': {
    title: 'App de audiolibros gratis con texto sincronizado en España | HushBook',
    description: 'App de audiolibros gratis con texto sincronizado para España. Lectura palabra a palabra en iPhone y Android. Importa cualquier libro, transcripción privada en el dispositivo.',
    aboutTitle: 'Acerca de HushBook en España',
    aboutDescription: 'HushBook en España: audiolibros que puedes leer palabra a palabra, con transcripción privada en el teléfono.',
    aboutNote: 'Esta página está pensada para lectores en España.',
  },
  'es-419': {
    title: 'App de audiolibros gratis con texto sincronizado en Latinoamérica | HushBook',
    description: 'App de audiolibros gratis con texto sincronizado para Latinoamérica. Lectura palabra a palabra en iPhone y Android. Importa cualquier libro, transcripción privada en el dispositivo.',
    aboutTitle: 'Acerca de HushBook en Latinoamérica',
    aboutDescription: 'HushBook en Latinoamérica: audiolibros que puedes leer palabra a palabra, con transcripción privada en el teléfono.',
    aboutNote: 'Esta página está pensada para lectores de América Latina.',
  },
  'pt-BR': {
    title: 'App de audiolivros grátis com texto sincronizado no Brasil | HushBook',
    description: 'App de audiolivros grátis com texto sincronizado para o Brasil. Leitura palavra a palavra no iPhone e Android. Importe qualquer livro, transcrição privada no aparelho.',
    aboutTitle: 'Sobre o HushBook no Brasil',
    aboutDescription: 'HushBook no Brasil: audiolivros que você pode ler palavra a palavra, com transcrição privada no aparelho.',
    aboutNote: 'Esta página é para leitores no Brasil.',
  },
  'pt-PT': {
    title: 'App de audiolivros grátis com texto sincronizado em Portugal | HushBook',
    description: 'App de audiolivros grátis com texto sincronizado para Portugal. Leitura palavra a palavra no iPhone e Android. Importe qualquer livro, transcrição privada no telemóvel.',
    aboutTitle: 'Sobre o HushBook em Portugal',
    aboutDescription: 'HushBook em Portugal: audiolivros que pode ler palavra a palavra, com transcrição privada no telemóvel.',
    aboutNote: 'Esta página é para leitores em Portugal.',
  },
};

function patchLocalePages(locale, copy) {
  const indexPath = path.join(root, locale, 'index.html');
  let index = fs.readFileSync(indexPath, 'utf8');
  index = setTitle(index, copy.title);
  index = setMetaContent(index, 'description', copy.description);
  index = setMetaContent(index, 'og:title', copy.title, 'property');
  index = setMetaContent(index, 'og:description', copy.description, 'property');
  index = setMetaContent(index, 'twitter:title', copy.title);
  index = setMetaContent(index, 'twitter:description', copy.description);
  fs.writeFileSync(indexPath, index);

  const aboutPath = path.join(root, locale, 'about.html');
  let about = fs.readFileSync(aboutPath, 'utf8');
  about = setTitle(about, copy.aboutTitle);
  about = setMetaContent(about, 'description', copy.aboutDescription);
  about = setMetaContent(about, 'og:title', copy.aboutTitle, 'property');
  about = setMetaContent(about, 'og:description', copy.aboutDescription, 'property');
  about = setMetaContent(about, 'twitter:title', copy.aboutTitle);
  about = setMetaContent(about, 'twitter:description', copy.aboutDescription);
  if (!about.includes(copy.aboutNote)) {
    about = about.replace(
      /(<p class="lead">[\s\S]*?<\/p>)/,
      `$1\n  <p class="region-note">${copy.aboutNote}</p>`,
    );
  }
  fs.writeFileSync(aboutPath, about);
}

const locales = fs.readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(root, entry.name, 'download.html')))
  .map((entry) => entry.name)
  .filter((name) => !['es', 'pt', 'fr-argos', 'node_modules', 'videos', 'output'].includes(name));

for (const locale of locales) patchDownload(locale);
for (const [locale, copy] of Object.entries(homepage)) patchLocalePages(locale, copy);

console.log(`Patched ${locales.length} locale download pages and 4 regional home/about pairs.`);
