'use strict';

/**
 * Regional audiobook examples used by the long-form landing-page copy.
 *
 * These are intentionally examples, not claims that HushBook owns or sells
 * the books. Visitors should import audio they own or are licensed to play.
 * The basis/source fields document the market signal used for each locale.
 */
const REGIONAL_BOOKS = {
  en: {
    title: 'Project Hail Mary',
    strongTitle: 'Project Hail Mary audiobook',
    keyword: 'project hail mary audiobook',
    basis: 'Keep the English seed example on the default page.',
  },
  de: {
    title: 'Onyx Storm – Flammengeküsst',
    strongTitle: 'Onyx-Storm-Hörbuch',
    keyword: 'onyx storm hörbuch',
    basis: 'BookBeat DACH 2025 most-listened title.',
    source: 'https://www.mynewsdesk.com/bookbeat/pressreleases/these-were-the-most-listened-to-audiobooks-in-bookbeat-land-in-2025-3420704',
  },
  fr: {
    title: 'La Femme de Ménage',
    strongTitle: 'livre audio La Femme de Ménage',
    keyword: 'livre audio la femme de ménage',
    basis: 'Spotify France 2025 first audiobook in the national top ten.',
    source: 'https://www.journaldugeek.com/2025/12/03/spotify-wrapped-2025-ce-que-les-francais-ont-vraiment-ecoute-cette-annee/',
  },
  'es-ES': {
    title: 'Harry Potter: La colección completa',
    strongTitle: 'audiolibro Harry Potter: La colección completa',
    keyword: 'audiolibro harry potter colección completa',
    basis: 'Audible.es 2025 most-listened audiobook.',
    source: 'https://www.europapress.es/comunicados/empresas-00908/noticia-comunicado-literatura-audio-alcanza-nuevo-record-97-millones-oyentes-2025-audible-20250527175222.html',
  },
  'es-419': {
    title: 'Cuarta Ala',
    strongTitle: 'audiolibro Cuarta Ala',
    keyword: 'audiolibro cuarta ala',
    basis: 'Spanish-language regional proxy from the 2025 Rebecca Yarros-led audiobook chart; no single public LatAm-wide ranking was available.',
    source: 'https://newsroom.spotify.com/2025-12-03/retrospectiva-top-artistas-musicas-albuns-podcasts-audiolivros/',
  },
  es: {
    title: 'Cuarta Ala',
    strongTitle: 'audiolibro Cuarta Ala',
    keyword: 'audiolibro cuarta ala',
    basis: 'Legacy generic Spanish route; use the Latin-American Spanish signal.',
  },
  'pt-BR': {
    title: 'Quarta Asa',
    strongTitle: 'audiolivro Quarta Asa',
    keyword: 'audiolivro quarta asa',
    basis: 'Brazilian Portuguese proxy from the 2025 audiobook chart; Spotify did not publish a Brazil-only audiobook ranking.',
    source: 'https://www.uol.com.br/splash/noticias/estadao-conteudo/2025/12/04/10-audiolivros-mais-ouvidos-do-spotify-rebecca-yarros-e-sarah-j-mass-dominam-a-lista.htm',
  },
  'pt-PT': {
    title: 'Quarta Asa',
    strongTitle: 'audiolivro Quarta Asa',
    keyword: 'audiolivro quarta asa',
    basis: 'European Portuguese proxy from the Portuguese-language 2025 chart; no public Portugal-only ranking was available.',
    source: 'https://newsroom.spotify.com/2025-12-03/retrospectiva-top-artistas-musicas-albuns-podcasts-audiolivros/',
  },
  pt: {
    title: 'Quarta Asa',
    strongTitle: 'audiolivro Quarta Asa',
    keyword: 'audiolivro quarta asa',
    basis: 'Legacy generic Portuguese route; use the Portuguese-language signal.',
  },
  it: {
    title: "L'anniversario",
    strongTitle: "audiolibro L'anniversario",
    keyword: "audiolibro l'anniversario",
    basis: "Audible.it's 2025 most-listened title.",
    source: 'https://www.ansa.it/sito/notizie/topnews/2026/01/15/lanniversario-di-bajani-letto-da-lo-cascio-il-piu-ascoltato-nel-2025-su-audible.it_e73dcfd6-a364-438d-8d2b-806589720d0d.html',
  },
  ja: {
    title: '国宝 上 青春篇',
    strongTitle: '「国宝 上 青春篇」のオーディオブック',
    keyword: '国宝 上 青春篇 オーディオブック',
    basis: 'Audible Japan 2025 most-listened title.',
    source: 'https://prtimes.jp/main/html/rd/p/000000300.000036126.html',
  },
  ko: {
    title: '달러구트 꿈 백화점',
    strongTitle: '달러구트 꿈 백화점 오디오북',
    keyword: '달러구트 꿈 백화점 오디오북',
    basis: 'Korean-language local bestseller proxy; no public country-wide 2025 listening chart was available.',
  },
  nl: {
    title: 'De verborgen belofte',
    strongTitle: 'luisterboek De verborgen belofte',
    keyword: 'luisterboek de verborgen belofte',
    basis: 'BookBeat Netherlands 2025 most-listened title.',
    source: 'https://www.mynewsdesk.com/bookbeat/pressreleases/these-were-the-most-listened-to-audiobooks-in-bookbeat-land-in-2025-3420704',
  },
  pl: {
    title: 'Onyksowa burza',
    strongTitle: 'audiobook Onyksowa burza',
    keyword: 'audiobook onyksowa burza',
    basis: 'BookBeat Poland 2025 most-listened title.',
    source: 'https://press.bookbeat.pl/438832-najchetniej-sluchane-audiobooki-w-bookbeat-w-2025-roku',
  },
  tr: {
    title: 'Seyir',
    strongTitle: 'Seyir sesli kitabı',
    keyword: 'seyir sesli kitabı',
    basis: 'Storytel Turkey 2025 local-market listening signal.',
    source: 'https://blog-turkey.storytel.com/2025te-kulakliklara-yerlesen-kitaplar/',
  },
  ru: {
    title: 'Трансерфинг реальности',
    strongTitle: 'аудиокнига «Трансерфинг реальности»',
    keyword: 'аудиокнига трансерфинг реальности',
    basis: 'LitRes 2025 digital-book/audio revenue signal; used as the best public Russian-language proxy.',
    source: 'https://tass.ru/obschestvo/25878621',
  },
  uk: {
    title: 'Служниця',
    strongTitle: 'аудіокнига «Служниця»',
    keyword: 'аудіокнига служниця',
    basis: 'Ukrainian 2025 audiobook popularity signal from Vivat/Abuk.',
    source: 'https://vivat.com.ua/blog/audioknyzhky-2025-za-nominatsiiamy/',
  },
  ar: {
    title: 'ما وراء الطبيعة',
    strongTitle: 'الكتاب الصوتي «ما وراء الطبيعة»',
    keyword: 'الكتاب الصوتي ما وراء الطبيعة',
    basis: 'Storytel Arabic-market popular-series signal; no public pan-Arab 2025 country ranking was available.',
    source: 'https://www.storytel.com/ae/series',
  },
  id: {
    title: '8 Intisari Kecerdasan Finansial',
    strongTitle: 'audiobook 8 Intisari Kecerdasan Finansial',
    keyword: 'audiobook 8 intisari kecerdasan finansial',
    basis: 'Storytel Indonesia current local-market popularity signal.',
    source: 'https://www.storytel.com/id/toplists/most-popular-weekly/audiobooks',
  },
  th: {
    title: 'เพราะชีวิตดีได้กว่าที่เป็น (Atomic Habits)',
    strongTitle: 'หนังสือเสียง เพราะชีวิตดีได้กว่าที่เป็น (Atomic Habits)',
    keyword: 'หนังสือเสียง เพราะชีวิตดีได้กว่าที่เป็น atomic habits',
    basis: 'Thai-language self-help proxy; no public country-wide 2025 listening chart was available.',
  },
  vi: {
    title: 'Đắc Nhân Tâm',
    strongTitle: 'sách nói Đắc Nhân Tâm',
    keyword: 'sách nói đắc nhân tâm',
    basis: 'Vietnamese audiobook bestseller/local popularity signal.',
    source: 'https://sachnoi.cc/blog/10-cuon-sach-noi-duoc-nghe-nhieu-nhat/',
  },
  sv: {
    title: 'Gråterskan',
    strongTitle: 'Gråterskan-ljudbok',
    keyword: 'gråterskan ljudbok',
    basis: 'BookBeat Sweden 2025 most-listened title.',
    source: 'https://www.mynewsdesk.com/se/bookbeat/pressreleases/haer-aer-aarets-mesta-ljudbokslyssningar-2025-3420683',
  },
  da: {
    title: 'Tælle til en, tælle til to',
    strongTitle: 'lydbogen Tælle til en, tælle til to',
    keyword: 'lydbog tælle til en tælle til to',
    basis: 'BookBeat Denmark 2025 most-listened title.',
    source: 'https://www.mynewsdesk.com/bookbeat/pressreleases/these-were-the-most-listened-to-audiobooks-in-bookbeat-land-in-2025-3420704',
  },
};

module.exports = { REGIONAL_BOOKS };
