'use strict';

/**
 * Inject SEO meta tags + long-form copy into root + all locale index.html files.
 * Safe to re-run: replaces existing SEO blocks / upgraded meta when present.
 */
const fs = require('fs');
const path = require('path');
const { REGIONAL_BOOKS } = require('./seo-regional-books');
const { FAQ_ADDITIONS } = require('./faq-locale');
const { normalizeCanonicalUrl } = require('./seo-localization');

const ROOT = path.join(__dirname, '..');

const SEO_CSS = `/* seo long-form */
.seo-copy{padding:96px 0 80px;border-top:1px solid var(--line-soft)}
.seo-copy .sec-head{margin-bottom:40px}
.seo-copy .prose{max-width:720px;margin:0 auto}
.seo-copy .prose p{color:var(--muted);font-size:16.5px;line-height:1.72;margin-bottom:1.15em}
.seo-copy .prose p:last-child{margin-bottom:0}
.seo-copy .prose h3{font-family:var(--serif);font-weight:500;font-size:clamp(22px,2.4vw,28px);line-height:1.2;letter-spacing:-.01em;color:var(--ink);margin:2.1em 0 .75em}
.seo-copy .prose h3:first-of-type{margin-top:0}
.seo-copy .prose strong{color:var(--ink);font-weight:600}
.seo-copy .prose a{color:var(--gold-hi);text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px}
.seo-copy .prose a:hover{color:var(--gold)}
.seo-copy .prose .seo-cta{margin-top:2em;padding-top:1.4em;border-top:1px solid var(--line-soft);color:var(--ink)}

`;

const APPLE = 'https://apps.apple.com/us/app/hushbook-read-while-listening/id6783243597';
const PLAY = 'https://play.google.com/store/apps/details?id=com.hushbook.hushbook';
const OG_IMG = 'https://hushbook.app/assets/img/og-hushbook.webp';

function metaBlock(cfg) {
  const url = normalizeCanonicalUrl(cfg.canonical);
  return `<title>${cfg.title}</title>
<meta name="description" content="${cfg.description}">
<meta name="keywords" content="${cfg.keywords}">
<meta name="theme-color" content="#0B0A09">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="author" content="HushBook">
<meta property="og:type" content="website">
<meta property="og:site_name" content="HushBook">
<meta property="og:locale" content="${cfg.ogLocale}">
<meta property="og:title" content="${cfg.ogTitle}">
<meta property="og:description" content="${cfg.ogDescription}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${OG_IMG}">
<meta property="og:image:alt" content="${cfg.ogImageAlt}">
<meta property="og:image:width" content="1800">
<meta property="og:image:height" content="945">
<meta property="og:image:type" content="image/webp">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${cfg.ogTitle}">
<meta name="twitter:description" content="${cfg.ogDescription}">
<meta name="twitter:image" content="${OG_IMG}">
<meta name="twitter:image:alt" content="${cfg.ogImageAlt}">
<link rel="canonical" href="${url}">
<link rel="icon" href="${cfg.iconHref}">
<script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HushBook',
  url,
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Audiobook Player',
  operatingSystem: 'iOS, Android',
  description: cfg.schemaDescription,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: cfg.featureList,
  downloadUrl: [APPLE, PLAY],
}, null, 2)}
</script>`;
}

function sectionHtml(s) {
  return `<!-- ============ SEO COPY ============ -->
<section class="seo-copy" id="about-hushbook" aria-labelledby="seo-title">
  <div class="wrap">
    <div class="sec-head center reveal">
      <span class="eyebrow">${s.eyebrow}</span>
      <h2 id="seo-title">${s.h2}</h2>
      <p class="sub">${s.sub}</p>
    </div>
    <article class="prose reveal">
      <p>${s.p1}</p>

      <h3>${s.h3a}</h3>
      <p>${s.p2}</p>

      <h3>${s.h3b}</h3>
      <p>${s.p3}</p>

      <h3>${s.h3c}</h3>
      <p>${s.p4}</p>

      <h3>${s.h3d}</h3>
      <p>${s.p5}</p>

      <h3>${s.h3e}</h3>
      <p>${s.p6}</p>

      <p class="seo-cta"><strong>${s.ctaStrong}</strong> ${s.ctaRest}</p>
    </article>
  </div>
</section>

`;
}

/** Shared English body used as fallback and for en root */
const EN_SECTION = {
  eyebrow: 'The free audiobook app',
  h2: 'Free audiobook app with synced texts',
  sub: 'Read every word as you hear it — the read-along player built for focus, privacy, and books you already own.',
  p1: 'Looking for a <strong>free audiobook app with synced texts</strong>? HushBook is built for people who want more than plain playback. Ordinary players stream narration and leave your eyes with nothing to follow. HushBook turns listening into <strong>audiobook with words</strong>: every spoken word lights up in time with the narrator, so you read along the way lyrics move in a music app — only this time, the track is a full book.',
  h3a: 'Why synced text beats listening alone',
  p2: 'Passive audio is easy to start and easy to lose. Minds drift. Names blur. You finish a chapter and realize you retained almost nothing. Word-level highlighting anchors attention to the voice: you see what you hear, seek any line with a tap, and keep place without rewinding half a chapter. That dual-channel focus is why many readers call HushBook one of the <strong>best free audiobook apps</strong> when comprehension matters as much as convenience.',
  h3b: 'Best audiobook apps — what actually sets HushBook apart',
  p3: 'Search “<strong>best audiobook apps</strong>” and you’ll find storefronts, subscriptions, and cloud libraries. Those apps excel at discovery and catalogs. HushBook solves a different problem: <em>how you read the audio you already have</em>. Import your own MP3, M4B, FLAC, and more; chapters and cover art come along when the file includes them. Tap Transcribe, and the on-device HushBook Engine builds synchronized text — no lyrics database, no upload, no account. After a one-time engine download, the whole experience works offline. That private, file-first design is rare among mainstream <strong>audiobook apps for iPhone</strong> and <strong>audiobook apps for Android</strong>.',
  h3c: 'A free audiobook app for iPhone and Android',
  p4: 'HushBook ships free on both platforms — App Store and Google Play — with zero ads in the core experience. The public-domain library (classics from LibriVox and the Internet Archive) is free to browse and download. The read-along karaoke, quotes, reading profiles, and offline playback are free too. An optional Pro tier unlocks deeper analytics if you want them; going Pro helps keep the app independent. Whether you need <strong>audiobook apps for iPhone</strong> for a commute or <strong>audiobook apps for Android</strong> for bed-time reading, the same product promise holds: free to start, private by design, synced text included.',
  h3d: 'Your books — from classics to a Project Hail Mary audiobook',
  p5: 'Bring the titles you care about. Love long-haul science fiction? Import a <strong>Project Hail Mary audiobook</strong> file you already own (or any other book you have rights to play), run transcription on your phone, and follow Ryland Grace word by word as the narration unfolds. Prefer public-domain epics? Start with Monte Cristo, Austen, or Aurelius from the built-in catalogue. HushBook is not a piracy storefront — it is a player and read-along engine for files and free classics you choose. Synced text works across languages too: the engine supports dozens of tongues so an <strong>audiobook with words</strong> can match the language you hear.',
  h3e: 'Privacy, accessibility, and habits that stick',
  p6: 'Transcription never leaves the device. There is no sign-in wall and no cloud for your audio. Reading profiles reshape the whole UI for comprehension, dyslexia/ADHD, or low vision — fonts like OpenDyslexic and Atkinson Hyperlegible, overlays, contrast, and night mode included. Streaks, badges, and gentle stats stay local, so habit-building does not require a surveillance stack. That combination — free core, synced text, on-device AI, accessibility — is why HushBook ranks among the strongest answers when people search for the <strong>best free audiobook app</strong> that respects both focus and privacy.',
  ctaStrong: 'Ready to read along?',
  ctaRest: `Download HushBook free for <a href="${APPLE}" target="_blank" rel="noopener">iPhone</a> or <a href="${PLAY}" target="_blank" rel="noopener">Android</a>, pick a free classic or import a book you own, and watch every word light up with the voice.`,
};

const EN_META = {
  title: 'Free Audiobook App with Synced Texts | HushBook',
  description: 'Free audiobook app with synced texts — word-level read-along on iPhone &amp; Android. Import any book, transcribe privately on-device. Best free audiobook app for focus.',
  keywords: 'free audiobook app with synced texts, best free audiobook app, best audiobook apps, audiobook with words, free audiobook app, audiobook apps for iphone, audiobook apps for android, project hail mary audiobook, read along audiobook',
  ogLocale: 'en_US',
  ogTitle: 'Free Audiobook App with Synced Texts | HushBook',
  ogDescription: 'Word-level read-along for any audiobook — free on iPhone &amp; Android. Synced text, on-device transcription, no account required.',
  ogImageAlt: 'HushBook — free audiobook app with synced texts and word-level read-along',
  schemaDescription: 'Free audiobook app with synced texts. Turn any audiobook into word-level karaoke, transcribed privately on your phone.',
  featureList: [
    'Word-level synced read-along text',
    'On-device private transcription',
    'Works offline after engine download',
    'Free public-domain library',
    'Import MP3, M4B and more',
    'Accessibility reading profiles',
  ],
};

/** Locale packs: meta overrides + section translations */
const LOCALES = {
  de: {
    canonical: 'https://hushbook.app/de/',
    iconHref: '/assets/img/default_preview.png',
    meta: {
      title: 'Kostenlose Hörbuch-App mit synchronem Text | HushBook',
      description: 'Kostenlose Hörbuch-App mit synchronem Text — Mitlesen Wort für Wort auf iPhone &amp; Android. Jedes Buch importieren, privat auf dem Gerät transkribieren.',
      keywords: 'kostenlose hörbuch app, hörbuch app mit text, beste hörbuch apps, free audiobook app with synced texts, audiobook apps for iphone, audiobook apps for android, project hail mary audiobook',
      ogLocale: 'de_DE',
      ogTitle: 'Kostenlose Hörbuch-App mit synchronem Text | HushBook',
      ogDescription: 'Mitlesen auf Wortebene für jedes Hörbuch — kostenlos auf iPhone &amp; Android. Synchroner Text, Transkription auf dem Gerät, kein Konto.',
      ogImageAlt: 'HushBook — kostenlose Hörbuch-App mit synchronem Text',
      schemaDescription: 'Kostenlose Hörbuch-App mit synchronem Text. Jedes Hörbuch wird privat auf dem Telefon in Karaoke auf Wortebene verwandelt.',
      featureList: [
        'Synchrones Mitlesen auf Wortebene',
        'Private Transkription auf dem Gerät',
        'Offline nach Engine-Download',
        'Kostenlose gemeinfreie Bibliothek',
        'Import von MP3, M4B und mehr',
        'Barrierefreie Leseprofile',
      ],
    },
    section: {
      eyebrow: 'Die kostenlose Hörbuch-App',
      h2: 'Kostenlose Hörbuch-App mit synchronem Text',
      sub: 'Lies jedes Wort, während du es hörst — der Mitlese-Player für Fokus, Privatsphäre und Bücher, die du schon besitzt.',
      p1: 'Suchst du eine <strong>kostenlose Hörbuch-App mit synchronem Text</strong>? HushBook ist für alle, die mehr wollen als reine Wiedergabe. Gewöhnliche Player streamen nur die Stimme — die Augen haben nichts, dem sie folgen können. HushBook macht daraus ein <strong>Hörbuch mit Wörtern</strong>: jedes gesprochene Wort leuchtet im Takt des Sprechers auf, wie Songtexte in einer Musik-App — nur dass der Track ein ganzes Buch ist.',
      h3a: 'Warum synchroner Text reines Hören schlägt',
      p2: 'Passives Audio startet leicht und geht leicht verloren. Gedanken schweifen ab. Namen verschwimmen. Du beendest ein Kapitel und merkst: fast nichts ist hängengeblieben. Hervorhebung auf Wortebene hält die Aufmerksamkeit an der Stimme: du siehst, was du hörst, springst mit einem Tipp zu jeder Zeile und verlierst die Stelle nicht. Genau deshalb nennen viele HushBook eine der <strong>besten kostenlosen Hörbuch-Apps</strong>, wenn Verständnis genauso zählt wie Bequemlichkeit.',
      h3b: 'Beste Hörbuch-Apps — was HushBook anders macht',
      p3: 'Bei „<strong>beste Hörbuch-Apps</strong>“ findest du Stores, Abos und Cloud-Bibliotheken. Die sind stark bei Entdeckung und Katalogen. HushBook löst ein anderes Problem: <em>wie du Audio liest, das du schon hast</em>. Importiere eigene MP3-, M4B-, FLAC-Dateien und mehr; Kapitel und Cover kommen mit, wenn die Datei sie enthält. Tippe auf Transkribieren — die HushBook Engine auf dem Gerät erzeugt synchronen Text: keine Text-Datenbank, kein Upload, kein Konto. Nach einmaligem Engine-Download läuft alles offline. Dieses private, dateibasierte Design ist unter gängigen <strong>Hörbuch-Apps für iPhone</strong> und <strong>Hörbuch-Apps für Android</strong> selten.',
      h3c: 'Kostenlos auf iPhone und Android',
      p4: 'HushBook ist auf beiden Plattformen kostenlos — App Store und Google Play — ohne Werbung im Kern. Die gemeinfreie Bibliothek (Klassiker von LibriVox und dem Internet Archive) ist frei zum Stöbern und Herunterladen. Mitlesen, Zitate, Leseprofile und Offline-Wiedergabe sind ebenfalls frei. Optional gibt es Pro für tiefere Analysen; Pro hält die App unabhängig. Ob <strong>Hörbuch-Apps für iPhone</strong> für den Pendelweg oder <strong>Hörbuch-Apps für Android</strong> für abends im Bett: gleiches Versprechen — kostenlos starten, privat by design, synchroner Text inklusive.',
      h3d: 'Deine Bücher — von Klassikern bis Project Hail Mary',
      p5: 'Bring die Titel mit, die dir wichtig sind. Sci-Fi-Marathons? Importiere ein <strong>Project-Hail-Mary-Hörbuch</strong>, das du bereits besitzt (oder jedes andere Buch, das du legal abspielen darfst), starte die Transkription auf dem Telefon und folge Ryland Grace Wort für Wort. Lieber gemeinfreie Epen? Monte Cristo, Austen oder Aurelius aus dem Katalog. HushBook ist kein Piraterie-Store — es ist Player und Mitlese-Engine für Dateien und freie Klassiker deiner Wahl. Synchroner Text funktioniert in vielen Sprachen, damit ein <strong>Hörbuch mit Wörtern</strong> zur gehörten Sprache passt.',
      h3e: 'Privatsphäre, Barrierefreiheit und Gewohnheiten',
      p6: 'Transkription verlässt das Gerät nie. Keine Anmeldewand, keine Cloud für dein Audio. Leseprofile formen die gesamte UI für Verständnis, Legasthenie/ADHS oder Sehschwäche — Schriften wie OpenDyslexic und Atkinson Hyperlegible, Overlays, Kontrast und Nachtmodus. Serien, Abzeichen und sanfte Statistiken bleiben lokal. Diese Kombination — freier Kern, synchroner Text, KI auf dem Gerät, Barrierefreiheit — macht HushBook zu einer starken Antwort auf die Suche nach der <strong>besten kostenlosen Hörbuch-App</strong> für Fokus und Privatsphäre.',
      ctaStrong: 'Bereit mitzulesen?',
      ctaRest: `Lade HushBook kostenlos für <a href="${APPLE}" target="_blank" rel="noopener">iPhone</a> oder <a href="${PLAY}" target="_blank" rel="noopener">Android</a>, wähle einen freien Klassiker oder importiere ein eigenes Buch — und sieh jedes Wort mit der Stimme aufleuchten.`,
    },
  },
  fr: {
    canonical: 'https://hushbook.app/fr/',
    iconHref: '/assets/img/default_preview.png',
    meta: {
      title: 'App de livres audio gratuite avec texte synchronisé | HushBook',
      description: 'App de livres audio gratuite avec texte synchronisé — lecture mot à mot sur iPhone et Android. Importez n’importe quel livre, transcription privée sur l’appareil.',
      keywords: 'app livre audio gratuite, livre audio avec texte, meilleures apps livres audio, free audiobook app with synced texts, audiobook apps for iphone, audiobook apps for android, project hail mary audiobook',
      ogLocale: 'fr_FR',
      ogTitle: 'App de livres audio gratuite avec texte synchronisé | HushBook',
      ogDescription: 'Lecture synchronisée mot à mot pour tout livre audio — gratuite sur iPhone et Android. Texte synchronisé, transcription sur l’appareil, sans compte.',
      ogImageAlt: 'HushBook — app de livres audio gratuite avec texte synchronisé',
      schemaDescription: 'Application de livres audio gratuite avec textes synchronisés. Transforme tout livre audio en karaoké mot à mot, transcrit en privé sur le téléphone.',
      featureList: [
        'Texte synchronisé mot à mot',
        'Transcription privée sur l’appareil',
        'Fonctionne hors ligne après téléchargement du moteur',
        'Bibliothèque du domaine public gratuite',
        'Import MP3, M4B et plus',
        'Profils de lecture accessibles',
      ],
    },
    section: {
      eyebrow: 'L’app de livres audio gratuite',
      h2: 'App de livres audio gratuite avec texte synchronisé',
      sub: 'Lisez chaque mot en l’entendant — le lecteur de lecture guidée conçu pour le focus, la vie privée et les livres que vous possédez déjà.',
      p1: 'Vous cherchez une <strong>app de livres audio gratuite avec texte synchronisé</strong> ? HushBook s’adresse à ceux qui veulent plus que la simple lecture. Les lecteurs classiques diffusent la narration et laissent les yeux sans point d’appui. HushBook transforme l’écoute en <strong>livre audio avec les mots</strong> : chaque mot prononcé s’allume au rythme du narrateur, comme des paroles de chanson — sauf que le titre est un livre entier.',
      h3a: 'Pourquoi le texte synchronisé bat l’écoute seule',
      p2: 'L’audio passif est facile à lancer et facile à perdre. L’esprit vagabonde. Les noms s’estompent. Vous finissez un chapitre sans presque rien retenir. Le surlignage mot à mot ancre l’attention sur la voix : vous voyez ce que vous entendez, sautez à n’importe quelle ligne d’un toucher, et gardez votre place sans rembobiner. C’est pourquoi beaucoup voient HushBook parmi les <strong>meilleures apps de livres audio gratuites</strong> quand la compréhension compte autant que le confort.',
      h3b: 'Meilleures apps de livres audio — ce qui distingue HushBook',
      p3: 'Cherchez « <strong>meilleures apps de livres audio</strong> » et vous trouverez des boutiques, des abonnements et des catalogues cloud. HushBook résout un autre problème : <em>comment lire l’audio que vous avez déjà</em>. Importez vos MP3, M4B, FLAC et plus ; chapitres et jaquettes suivent si le fichier les contient. Touchez Transcrire : le moteur HushBook sur l’appareil construit le texte synchronisé — pas de base de paroles, pas d’envoi cloud, pas de compte. Après un téléchargement unique du moteur, tout fonctionne hors ligne. Ce design privé et centré sur vos fichiers est rare parmi les <strong>apps de livres audio pour iPhone</strong> et <strong>apps de livres audio pour Android</strong>.',
      h3c: 'Gratuite sur iPhone et Android',
      p4: 'HushBook est gratuit sur les deux plateformes — App Store et Google Play — sans publicité au cœur de l’expérience. La bibliothèque du domaine public (classiques LibriVox et Internet Archive) est gratuite. La lecture synchronisée, les citations, les profils et le hors ligne aussi. Un abonnement Pro optionnel approfondit les statistiques. Que vous cherchiez des <strong>apps de livres audio pour iPhone</strong> pour le trajet ou des <strong>apps pour Android</strong> pour le soir, la promesse reste : gratuit au départ, privé par conception, texte synchronisé inclus.',
      h3d: 'Vos livres — des classiques à Project Hail Mary',
      p5: 'Apportez les titres qui comptent. SF au long cours ? Importez un fichier <strong>livre audio Project Hail Mary</strong> que vous possédez déjà (ou tout autre livre que vous avez le droit d’écouter), lancez la transcription sur le téléphone et suivez Ryland Grace mot à mot. Préférez les épopées du domaine public ? Monte-Cristo, Austen ou Aurèle dans le catalogue. HushBook n’est pas une vitrine de piratage — c’est un lecteur et un moteur de lecture synchronisée pour vos fichiers et classiques gratuits. Le texte synchronisé marche dans de nombreuses langues pour qu’un <strong>livre audio avec les mots</strong> suive la langue entendue.',
      h3e: 'Vie privée, accessibilité et habitudes durables',
      p6: 'La transcription ne quitte jamais l’appareil. Pas de mur de connexion, pas de cloud pour votre audio. Les profils de lecture adaptent toute l’interface — compréhension, dyslexie/TDAH ou basse vision — polices OpenDyslexic et Atkinson Hyperlegible, calques, contraste, mode nuit. Séries, badges et stats restent locaux. Ce mélange — cœur gratuit, texte synchronisé, IA sur l’appareil, accessibilité — place HushBook parmi les meilleures réponses à la recherche de la <strong>meilleure app de livres audio gratuite</strong> qui respecte focus et vie privée.',
      ctaStrong: 'Prêt à lire en même temps ?',
      ctaRest: `Téléchargez HushBook gratuitement pour <a href="${APPLE}" target="_blank" rel="noopener">iPhone</a> ou <a href="${PLAY}" target="_blank" rel="noopener">Android</a>, choisissez un classique gratuit ou importez un livre à vous, et regardez chaque mot s’allumer avec la voix.`,
    },
  },
};

// Spanish variants share one body with light regional wording differences where useful
const ES_SECTION = {
  eyebrow: 'La app de audiolibros gratis',
  h2: 'App de audiolibros gratis con texto sincronizado',
  sub: 'Lee cada palabra mientras la oyes — el reproductor de lectura guiada para foco, privacidad y los libros que ya tienes.',
  p1: '¿Buscas una <strong>app de audiolibros gratis con texto sincronizado</strong>? HushBook es para quien quiere más que reproducir audio. Los reproductores normales solo narran y dejan los ojos sin ancla. HushBook convierte la escucha en <strong>audiolibro con palabras</strong>: cada palabra hablada se ilumina al ritmo del narrador, como la letra de una canción — solo que la pista es un libro completo.',
  h3a: 'Por qué el texto sincronizado gana a solo escuchar',
  p2: 'El audio pasivo es fácil de empezar y fácil de perder. La mente se va. Los nombres se difuminan. Terminas un capítulo y casi no retuviste nada. El resaltado palabra a palabra ancla la atención a la voz: ves lo que oyes, saltas a cualquier línea con un toque y no pierdes el hilo. Por eso muchos consideran HushBook una de las <strong>mejores apps de audiolibros gratis</strong> cuando la comprensión importa tanto como la comodidad.',
  h3b: 'Mejores apps de audiolibros — qué hace distinto a HushBook',
  p3: 'Busca «<strong>mejores apps de audiolibros</strong>» y verás tiendas, suscripciones y catálogos en la nube. Esas apps brillan en descubrimiento. HushBook resuelve otro problema: <em>cómo lees el audio que ya tienes</em>. Importa tus MP3, M4B, FLAC y más; capítulos y portada viajan si el archivo los trae. Toca Transcribir y el motor HushBook en el dispositivo genera texto sincronizado — sin base de letras, sin subida, sin cuenta. Tras un descarga única del motor, todo funciona sin conexión. Ese diseño privado y centrado en tus archivos es raro entre las <strong>apps de audiolibros para iPhone</strong> y <strong>apps de audiolibros para Android</strong>.',
  h3c: 'Gratis en iPhone y Android',
  p4: 'HushBook es gratis en ambas plataformas — App Store y Google Play — sin anuncios en la experiencia principal. La biblioteca de dominio público (clásicos de LibriVox e Internet Archive) es gratis. La lectura sincronizada, citas, perfiles y offline también. Un Pro opcional abre analíticas más profundas. Tanto si buscas <strong>apps de audiolibros para iPhone</strong> en el trayecto como <strong>apps para Android</strong> por la noche, la promesa es la misma: gratis al empezar, privado por diseño, texto sincronizado incluido.',
  h3d: 'Tus libros — de clásicos a Project Hail Mary',
  p5: 'Trae los títulos que te importan. ¿Ciencia ficción de largo aliento? Importa un archivo de <strong>audiolibro de Project Hail Mary</strong> que ya poseas (u otro libro que tengas derecho a reproducir), transcribe en el teléfono y sigue a Ryland Grace palabra a palabra. ¿Prefieres epopeyas de dominio público? Montecristo, Austen o Aurelio en el catálogo. HushBook no es una tienda de piratería: es un reproductor y motor de lectura sincronizada para archivos y clásicos gratis que eliges. El texto sincronizado funciona en muchos idiomas para que un <strong>audiolibro con palabras</strong> coincida con lo que oyes.',
  h3e: 'Privacidad, accesibilidad y hábitos que se quedan',
  p6: 'La transcripción nunca sale del dispositivo. Sin muro de registro ni nube para tu audio. Los perfiles de lectura adaptan toda la UI — comprensión, dislexia/TDAH o baja visión — con fuentes como OpenDyslexic y Atkinson Hyperlegible, capas, contraste y modo noche. Rachas, insignias y estadísticas suaves se quedan en local. Esa mezcla — núcleo gratis, texto sincronizado, IA en el dispositivo, accesibilidad — sitúa a HushBook entre las mejores respuestas a la <strong>mejor app de audiolibros gratis</strong> que respeta foco y privacidad.',
  ctaStrong: '¿Listo para leer a la vez?',
  ctaRest: `Descarga HushBook gratis para <a href="${APPLE}" target="_blank" rel="noopener">iPhone</a> o <a href="${PLAY}" target="_blank" rel="noopener">Android</a>, elige un clásico gratis o importa un libro tuyo y mira cada palabra iluminarse con la voz.`,
};

const ES_META_BASE = {
  title: 'App de audiolibros gratis con texto sincronizado | HushBook',
  description: 'App de audiolibros gratis con texto sincronizado — lectura palabra a palabra en iPhone y Android. Importa cualquier libro, transcripción privada en el dispositivo.',
  keywords: 'app audiolibros gratis, audiolibro con texto, mejores apps de audiolibros, free audiobook app with synced texts, audiobook apps for iphone, audiobook apps for android, project hail mary audiobook',
  ogTitle: 'App de audiolibros gratis con texto sincronizado | HushBook',
  ogDescription: 'Lectura sincronizada palabra a palabra para cualquier audiolibro — gratis en iPhone y Android. Texto sincronizado, transcripción en el dispositivo, sin cuenta.',
  ogImageAlt: 'HushBook — app de audiolibros gratis con texto sincronizado',
  schemaDescription: 'App de audiolibros gratis con textos sincronizados. Convierte cualquier audiolibro en karaoke palabra a palabra, transcrito en privado en el teléfono.',
  featureList: [
    'Texto sincronizado palabra a palabra',
    'Transcripción privada en el dispositivo',
    'Funciona sin conexión tras descargar el motor',
    'Biblioteca de dominio público gratis',
    'Importa MP3, M4B y más',
    'Perfiles de lectura accesibles',
  ],
};

function addEs(code, canonical, ogLocale) {
  LOCALES[code] = {
    canonical,
    iconHref: '/assets/img/default_preview.png',
    meta: { ...ES_META_BASE, ogLocale },
    section: ES_SECTION,
  };
}
addEs('es', 'https://hushbook.app/es/', 'es_ES');
addEs('es-ES', 'https://hushbook.app/es-ES/', 'es_ES');
addEs('es-419', 'https://hushbook.app/es-419/', 'es_419');

const PT_SECTION = {
  eyebrow: 'O app de audiolivros grátis',
  h2: 'App de audiolivros grátis com texto sincronizado',
  sub: 'Leia cada palavra enquanto a ouve — o player de leitura guiada para foco, privacidade e os livros que você já tem.',
  p1: 'Procura um <strong>app de audiolivros grátis com texto sincronizado</strong>? O HushBook é para quem quer mais do que só reproduzir. Players comuns só narram e deixam os olhos sem âncora. O HushBook transforma a escuta em <strong>audiolivro com palavras</strong>: cada palavra falada acende no ritmo do narrador, como letra de música — só que a faixa é um livro inteiro.',
  h3a: 'Por que texto sincronizado vence só ouvir',
  p2: 'Áudio passivo é fácil de começar e fácil de perder. A mente vagueia. Nomes se apagam. Você termina um capítulo e quase não reteve nada. O destaque palavra a palavra ancora a atenção na voz: você vê o que ouve, pula para qualquer linha com um toque e não perde o lugar. Por isso muitos veem o HushBook entre os <strong>melhores apps de audiolivros grátis</strong> quando a compreensão importa tanto quanto a comodidade.',
  h3b: 'Melhores apps de audiolivros — o que diferencia o HushBook',
  p3: 'Pesquise «<strong>melhores apps de audiolivros</strong>» e achará lojas, assinaturas e catálogos na nuvem. Eles brilham em descoberta. O HushBook resolve outro problema: <em>como você lê o áudio que já tem</em>. Importe MP3, M4B, FLAC e mais; capítulos e capa vêm se o arquivo os tiver. Toque em Transcrever e o motor HushBook no aparelho gera texto sincronizado — sem base de letras, sem upload, sem conta. Depois de um download único do motor, tudo funciona offline. Esse design privado e centrado em arquivos é raro entre <strong>apps de audiolivros para iPhone</strong> e <strong>apps de audiolivros para Android</strong>.',
  h3c: 'Grátis no iPhone e no Android',
  p4: 'O HushBook é grátis nas duas plataformas — App Store e Google Play — sem anúncios na experiência principal. A biblioteca de domínio público (clássicos do LibriVox e Internet Archive) é grátis. Leitura sincronizada, citações, perfis e offline também. Um Pro opcional aprofunda as análises. Se você precisa de <strong>apps de audiolivros para iPhone</strong> no trajeto ou <strong>apps para Android</strong> à noite, a promessa é a mesma: grátis para começar, privado por design, texto sincronizado incluso.',
  h3d: 'Seus livros — de clássicos a Project Hail Mary',
  p5: 'Traga os títulos que importam. Ficção científica longa? Importe um arquivo de <strong>audiolivro de Project Hail Mary</strong> que você já possui (ou outro livro que tenha direito de ouvir), transcreva no telefone e acompanhe Ryland Grace palavra a palavra. Prefere épicos de domínio público? Monte Cristo, Austen ou Aurélio no catálogo. O HushBook não é vitrine de pirataria — é player e motor de leitura sincronizada para arquivos e clássicos grátis que você escolhe. Texto sincronizado funciona em muitos idiomas para que um <strong>audiolivro com palavras</strong> combine com o que você ouve.',
  h3e: 'Privacidade, acessibilidade e hábitos que ficam',
  p6: 'A transcrição nunca sai do aparelho. Sem muro de login nem nuvem para o seu áudio. Perfis de leitura remodelam toda a UI — compreensão, dislexia/TDAH ou baixa visão — com fontes como OpenDyslexic e Atkinson Hyperlegible, sobreposições, contraste e modo noturno. Sequências, medalhas e estatísticas leves ficam locais. Essa combinação — núcleo grátis, texto sincronizado, IA no aparelho, acessibilidade — coloca o HushBook entre as melhores respostas à <strong>melhor app de audiolivros grátis</strong> que respeita foco e privacidade.',
  ctaStrong: 'Pronto para ler junto?',
  ctaRest: `Baixe o HushBook grátis para <a href="${APPLE}" target="_blank" rel="noopener">iPhone</a> ou <a href="${PLAY}" target="_blank" rel="noopener">Android</a>, escolha um clássico grátis ou importe um livro seu e veja cada palavra acender com a voz.`,
};

const PT_META_BASE = {
  title: 'App de audiolivros grátis com texto sincronizado | HushBook',
  description: 'App de audiolivros grátis com texto sincronizado — leitura palavra a palavra no iPhone e Android. Importe qualquer livro, transcrição privada no aparelho.',
  keywords: 'app audiolivros grátis, audiolivro com texto, melhores apps de audiolivros, free audiobook app with synced texts, audiobook apps for iphone, audiobook apps for android, project hail mary audiobook',
  ogTitle: 'App de audiolivros grátis com texto sincronizado | HushBook',
  ogDescription: 'Leitura sincronizada palavra a palavra para qualquer audiolivro — grátis no iPhone e Android. Texto sincronizado, transcrição no aparelho, sem conta.',
  ogImageAlt: 'HushBook — app de audiolivros grátis com texto sincronizado',
  schemaDescription: 'App de audiolivros grátis com textos sincronizados. Transforma qualquer audiolivro em karaokê palavra a palavra, transcrito em privado no telefone.',
  featureList: [
    'Texto sincronizado palavra a palavra',
    'Transcrição privada no aparelho',
    'Funciona offline após baixar o motor',
    'Biblioteca de domínio público grátis',
    'Importa MP3, M4B e mais',
    'Perfis de leitura acessíveis',
  ],
};

function addPt(code, canonical, ogLocale) {
  LOCALES[code] = {
    canonical,
    iconHref: '/assets/img/default_preview.png',
    meta: { ...PT_META_BASE, ogLocale },
    section: PT_SECTION,
  };
}
addPt('pt', 'https://hushbook.app/pt/', 'pt_PT');
addPt('pt-PT', 'https://hushbook.app/pt-PT/', 'pt_PT');
addPt('pt-BR', 'https://hushbook.app/pt-BR/', 'pt_BR');

// Compact packs for remaining locales (full quality, parallel structure)
LOCALES.it = {
  canonical: 'https://hushbook.app/it/',
  iconHref: '/assets/img/default_preview.png',
  meta: {
    title: 'App di audiolibri gratis con testo sincronizzato | HushBook',
    description: 'App di audiolibri gratis con testo sincronizzato — lettura parola per parola su iPhone e Android. Importa qualsiasi libro, trascrizione privata sul dispositivo.',
    keywords: 'app audiolibri gratis, audiolibro con testo, migliori app audiolibri, free audiobook app with synced texts, audiobook apps for iphone, audiobook apps for android, project hail mary audiobook',
    ogLocale: 'it_IT',
    ogTitle: 'App di audiolibri gratis con testo sincronizzato | HushBook',
    ogDescription: 'Lettura sincronizzata a livello di parola per qualsiasi audiolibro — gratis su iPhone e Android. Testo sincronizzato, trascrizione on-device, senza account.',
    ogImageAlt: 'HushBook — app di audiolibri gratis con testo sincronizzato',
    schemaDescription: 'App di audiolibri gratis con testi sincronizzati. Trasforma qualsiasi audiolibro in karaoke a livello di parola, trascritto in privato sul telefono.',
    featureList: ['Testo sincronizzato a livello di parola', 'Trascrizione privata sul dispositivo', 'Funziona offline dopo il download del motore', 'Biblioteca di pubblico dominio gratis', 'Importa MP3, M4B e altro', 'Profili di lettura accessibili'],
  },
  section: {
    eyebrow: 'L’app di audiolibri gratis',
    h2: 'App di audiolibri gratis con testo sincronizzato',
    sub: 'Leggi ogni parola mentre la ascolti — il player di lettura guidata per focus, privacy e i libri che già possiedi.',
    p1: 'Cerchi un’<strong>app di audiolibri gratis con testo sincronizzato</strong>? HushBook è per chi vuole più della semplice riproduzione. I player normali trasmettono solo la voce. HushBook trasforma l’ascolto in <strong>audiolibro con le parole</strong>: ogni parola detta si illumina a tempo con il narratore, come i testi di una canzone — ma la traccia è un intero libro.',
    h3a: 'Perché il testo sincronizzato batte il solo ascolto',
    p2: 'L’audio passivo è facile da avviare e facile da perdere. La mente vaga. I nomi si confondono. Finisci un capitolo e non hai trattenuto quasi nulla. L’evidenziazione parola per parola ancora l’attenzione alla voce: vedi ciò che senti, salti a qualsiasi riga con un tocco e non perdi il posto. Per questo molti considerano HushBook tra le <strong>migliori app di audiolibri gratis</strong> quando la comprensione conta quanto la comodità.',
    h3b: 'Migliori app di audiolibri — cosa distingue HushBook',
    p3: 'Cerca «<strong>migliori app di audiolibri</strong>» e troverai store, abbonamenti e cataloghi cloud. HushBook risolve un altro problema: <em>come leggi l’audio che già hai</em>. Importa MP3, M4B, FLAC e altro; capitoli e copertina arrivano se il file li contiene. Tocca Trascrivi e il motore HushBook sul dispositivo costruisce testo sincronizzato — nessuna base di testi, nessun upload, nessun account. Dopo un download unico del motore, tutto funziona offline. Questo design privato e basato sui file è raro tra le <strong>app di audiolibri per iPhone</strong> e <strong>per Android</strong>.',
    h3c: 'Gratis su iPhone e Android',
    p4: 'HushBook è gratis su entrambe le piattaforme — App Store e Google Play — senza annunci nell’esperienza principale. La biblioteca di pubblico dominio (classici da LibriVox e Internet Archive) è gratis. Lettura sincronizzata, citazioni, profili e offline pure. Un Pro opzionale apre analisi più profonde. Che servano <strong>app di audiolibri per iPhone</strong> in treno o <strong>per Android</strong> a letto, la promessa è la stessa: gratis per iniziare, privato per design, testo sincronizzato incluso.',
    h3d: 'I tuoi libri — dai classici a Project Hail Mary',
    p5: 'Porta i titoli che ti importano. Fantascienza lunga? Importa un file di <strong>audiolibro di Project Hail Mary</strong> che già possiedi (o qualsiasi altro libro che hai diritto di ascoltare), trascrivi sul telefono e segui Ryland Grace parola per parola. Preferisci epopee di pubblico dominio? Montecristo, Austen o Aurelio nel catalogo. HushBook non è un negozio di pirateria: è un player e un motore di lettura sincronizzata per file e classici gratis che scegli. Il testo sincronizzato funziona in molte lingue così un <strong>audiolibro con le parole</strong> coincide con ciò che senti.',
    h3e: 'Privacy, accessibilità e abitudini che restano',
    p6: 'La trascrizione non lascia mai il dispositivo. Nessun muro di accesso, nessun cloud per il tuo audio. I profili di lettura rimodellano tutta l’UI — comprensione, dislessia/ADHD o ipovisione — con font come OpenDyslexic e Atkinson Hyperlegible, overlay, contrasto e modalità notte. Serie, badge e statistiche restano locali. Questa combinazione — nucleo gratis, testo sincronizzato, AI sul dispositivo, accessibilità — colloca HushBook tra le risposte più forti alla <strong>migliore app di audiolibri gratis</strong> che rispetta focus e privacy.',
    ctaStrong: 'Pronto a leggere insieme?',
    ctaRest: `Scarica HushBook gratis per <a href="${APPLE}" target="_blank" rel="noopener">iPhone</a> o <a href="${PLAY}" target="_blank" rel="noopener">Android</a>, scegli un classico gratis o importa un tuo libro e guarda ogni parola illuminarsi con la voce.`,
  },
};

LOCALES.nl = {
  canonical: 'https://hushbook.app/nl/',
  iconHref: '/assets/img/default_preview.png',
  meta: {
    title: 'Gratis luisterboek-app met gesynchroniseerde tekst | HushBook',
    description: 'Gratis luisterboek-app met gesynchroniseerde tekst — woord-voor-woord meelezen op iPhone &amp; Android. Importeer elk boek, privé transcriptie op het apparaat.',
    keywords: 'gratis luisterboek app, luisterboek met tekst, beste luisterboek apps, free audiobook app with synced texts, audiobook apps for iphone, audiobook apps for android, project hail mary audiobook',
    ogLocale: 'nl_NL',
    ogTitle: 'Gratis luisterboek-app met gesynchroniseerde tekst | HushBook',
    ogDescription: 'Woord-niveau meelezen bij elk luisterboek — gratis op iPhone &amp; Android. Gesynchroniseerde tekst, transcriptie op het apparaat, geen account.',
    ogImageAlt: 'HushBook — gratis luisterboek-app met gesynchroniseerde tekst',
    schemaDescription: 'Gratis luisterboek-app met gesynchroniseerde teksten. Zet elk luisterboek om in karaoke op woordniveau, privé getranscribeerd op je telefoon.',
    featureList: ['Gesynchroniseerde tekst op woordniveau', 'Privé transcriptie op het apparaat', 'Offline na engine-download', 'Gratis publiek-domein bibliotheek', 'Import MP3, M4B en meer', 'Toegankelijke leesprofielen'],
  },
  section: {
    eyebrow: 'De gratis luisterboek-app',
    h2: 'Gratis luisterboek-app met gesynchroniseerde tekst',
    sub: 'Lees elk woord terwijl je het hoort — de meelees-speler voor focus, privacy en boeken die je al hebt.',
    p1: 'Op zoek naar een <strong>gratis luisterboek-app met gesynchroniseerde tekst</strong>? HushBook is voor wie meer wil dan alleen afspelen. Gewone spelers streamen alleen de stem. HushBook maakt er een <strong>luisterboek met woorden</strong> van: elk gesproken woord licht op met de verteller, zoals songteksten — alleen is het spoor een heel boek.',
    h3a: 'Waarom gesynchroniseerde tekst beter is dan alleen luisteren',
    p2: 'Passieve audio is makkelijk te starten en makkelijk te verliezen. Je gedachten dwalen af. Namen vervagen. Je eindigt een hoofdstuk en onthoudt bijna niets. Highlighting op woordniveau verankert aandacht bij de stem: je ziet wat je hoort, tikt naar elke regel en verliest je plek niet. Daarom noemen veel lezers HushBook een van de <strong>beste gratis luisterboek-apps</strong> als begrip net zo telt als gemak.',
    h3b: 'Beste luisterboek-apps — wat HushBook uniek maakt',
    p3: 'Zoek «<strong>beste luisterboek-apps</strong>» en je vindt winkels, abonnementen en cloudcatalogi. HushBook lost een ander probleem op: <em>hoe je audio leest die je al hebt</em>. Importeer eigen MP3, M4B, FLAC en meer; hoofdstukken en cover komen mee als het bestand ze heeft. Tik op Transcriberen — de HushBook Engine op het apparaat bouwt gesynchroniseerde tekst: geen songtekstendatabase, geen upload, geen account. Na één engine-download werkt alles offline. Dat private, bestandsgerichte ontwerp is zeldzaam bij <strong>luisterboek-apps voor iPhone</strong> en <strong>Android</strong>.',
    h3c: 'Gratis op iPhone en Android',
    p4: 'HushBook is gratis op beide platforms — App Store en Google Play — zonder ads in de kern. De publiek-domein bibliotheek (klassiekers van LibriVox en Internet Archive) is gratis. Meelezen, citaten, profielen en offline ook. Optioneel Pro voor diepere analyses. Of je <strong>luisterboek-apps voor iPhone</strong> nodig hebt voor de trein of <strong>voor Android</strong> ’s avonds: dezelfde belofte — gratis starten, privé by design, gesynchroniseerde tekst inbegrepen.',
    h3d: 'Jouw boeken — van klassiekers tot Project Hail Mary',
    p5: 'Neem de titels mee die ertoe doen. Lange sciencefiction? Importeer een <strong>Project Hail Mary-luisterboek</strong> dat je al bezit (of een ander boek dat je mag beluisteren), transcribeer op je telefoon en volg Ryland Grace woord voor woord. Liever publiek-domein epen? Monte Cristo, Austen of Aurelius in de catalogus. HushBook is geen piraterijwinkel — het is een speler en meelees-engine voor bestanden en gratis klassiekers die jij kiest. Gesynchroniseerde tekst werkt in vele talen zodat een <strong>luisterboek met woorden</strong> past bij wat je hoort.',
    h3e: 'Privacy, toegankelijkheid en gewoontes die blijven',
    p6: 'Transcriptie verlaat het apparaat nooit. Geen inlogmuur, geen cloud voor je audio. Leesprofielen vormen de hele UI — begrip, dyslexie/ADHD of slechtziendheid — met lettertypes als OpenDyslexic en Atkinson Hyperlegible, overlays, contrast en nachtmodus. Reeksen, badges en zachte stats blijven lokaal. Die combinatie — gratis kern, gesynchroniseerde tekst, AI op het apparaat, toegankelijkheid — maakt HushBook een sterk antwoord op de <strong>beste gratis luisterboek-app</strong> die focus én privacy respecteert.',
    ctaStrong: 'Klaar om mee te lezen?',
    ctaRest: `Download HushBook gratis voor <a href="${APPLE}" target="_blank" rel="noopener">iPhone</a> of <a href="${PLAY}" target="_blank" rel="noopener">Android</a>, kies een gratis klassieker of importeer een eigen boek, en zie elk woord oplichten met de stem.`,
  },
};

// For remaining locales, use high-quality localized packs
LOCALES.pl = {
  canonical: 'https://hushbook.app/pl/',
  iconHref: '/assets/img/default_preview.png',
  meta: {
    title: 'Darmowa aplikacja do audiobooków z zsynchronizowanym tekstem | HushBook',
    description: 'Darmowa aplikacja do audiobooków z zsynchronizowanym tekstem — czytanie słowo po słowie na iPhone i Android. Importuj dowolną książkę, prywatna transkrypcja na urządzeniu.',
    keywords: 'darmowa aplikacja audiobook, audiobook z tekstem, najlepsze aplikacje audiobook, free audiobook app with synced texts, audiobook apps for iphone, audiobook apps for android, project hail mary audiobook',
    ogLocale: 'pl_PL',
    ogTitle: 'Darmowa aplikacja do audiobooków z zsynchronizowanym tekstem | HushBook',
    ogDescription: 'Czytanie równoległe na poziomie słów — darmowo na iPhone i Android. Zsynchronizowany tekst, transkrypcja na urządzeniu, bez konta.',
    ogImageAlt: 'HushBook — darmowa aplikacja do audiobooków z zsynchronizowanym tekstem',
    schemaDescription: 'Darmowa aplikacja do audiobooków z zsynchronizowanym tekstem. Zamienia dowolny audiobook w karaoke na poziomie słów, transkrybowane prywatnie na telefonie.',
    featureList: ['Zsynchronizowany tekst na poziomie słów', 'Prywatna transkrypcja na urządzeniu', 'Działa offline po pobraniu silnika', 'Darmowa biblioteka domeny publicznej', 'Import MP3, M4B i więcej', 'Dostępne profile czytania'],
  },
  section: {
    eyebrow: 'Darmowa aplikacja do audiobooków',
    h2: 'Darmowa aplikacja do audiobooków z zsynchronizowanym tekstem',
    sub: 'Czytaj każde słowo, gdy je słyszysz — odtwarzacz do równoległego czytania dla skupienia, prywatności i książek, które już masz.',
    p1: 'Szukasz <strong>darmowej aplikacji do audiobooków z zsynchronizowanym tekstem</strong>? HushBook jest dla osób, które chcą więcej niż zwykłe odtwarzanie. Zwykłe odtwarzacze tylko narrują. HushBook zamienia słuchanie w <strong>audiobook ze słowami</strong>: każde wypowiedziane słowo podświetla się w rytm lektora — jak tekst piosenki, tylko utworem jest cała książka.',
    h3a: 'Dlaczego zsynchronizowany tekst wygrywa z samym słuchaniem',
    p2: 'Pasywne audio łatwo zacząć i łatwo stracić. Myśli uciekają. Imiona znikają. Kończysz rozdział i prawie nic nie pamiętasz. Podświetlenie słowo po słowie kotwiczy uwagę przy głosie: widzisz to, co słyszysz, skaczesz do dowolnej linii i nie gubisz miejsca. Dlatego wielu nazywa HushBook jedną z <strong>najlepszych darmowych aplikacji do audiobooków</strong>, gdy zrozumienie liczy się tak samo jak wygoda.',
    h3b: 'Najlepsze aplikacje do audiobooków — co wyróżnia HushBook',
    p3: 'Wyszukaj «<strong>najlepsze aplikacje do audiobooków</strong>» i znajdziesz sklepy, subskrypcje i chmury. HushBook rozwiązuje inny problem: <em>jak czytasz audio, które już masz</em>. Importuj własne MP3, M4B, FLAC i więcej; rozdziały i okładka przyjdą z plikiem. Dotknij Transkrybuj — silnik HushBook na urządzeniu buduje zsynchronizowany tekst: bez bazy tekstów, bez wgrywania, bez konta. Po jednorazowym pobraniu silnika wszystko działa offline. Ten prywatny, plikowy model jest rzadki wśród <strong>aplikacji audiobook na iPhone</strong> i <strong>Android</strong>.',
    h3c: 'Za darmo na iPhone i Android',
    p4: 'HushBook jest darmowy na obu platformach — App Store i Google Play — bez reklam w rdzeniu. Biblioteka domeny publicznej (klasyka z LibriVox i Internet Archive) jest darmowa. Równoległe czytanie, cytaty, profile i offline też. Opcjonalne Pro pogłębia analitykę. Czy potrzebujesz <strong>aplikacji audiobook na iPhone</strong> w drodze, czy <strong>na Android</strong> wieczorem — ta sama obietnica: darmowy start, prywatność by design, zsynchronizowany tekst w zestawie.',
    h3d: 'Twoje książki — od klasyki do Project Hail Mary',
    p5: 'Przynieś tytuły, na których Ci zależy. Długa science fiction? Zaimportuj plik <strong>audiobooka Project Hail Mary</strong>, który już posiadasz (lub inną książkę, którą masz prawo odtwarzać), uruchom transkrypcję na telefonie i śledź Rylanda Grace słowo po słowie. Wolisz epopeje domeny publicznej? Monte Christo, Austen lub Aureliusz w katalogu. HushBook to nie sklep piracki — to odtwarzacz i silnik równoległego czytania plików oraz darmowej klasyki. Zsynchronizowany tekst działa w wielu językach, by <strong>audiobook ze słowami</strong> pasował do tego, co słyszysz.',
    h3e: 'Prywatność, dostępność i nawyki, które zostają',
    p6: 'Transkrypcja nigdy nie opuszcza urządzenia. Bez ściany logowania i chmury dla Twojego audio. Profile czytania przebudowują cały interfejs — zrozumienie, dysleksja/ADHD lub słabe widzenie — czcionki OpenDyslexic i Atkinson Hyperlegible, nakładki, kontrast, tryb nocny. Serie, odznaki i delikatne statystyki zostają lokalnie. Ta mieszanka — darmowy rdzeń, zsynchronizowany tekst, AI na urządzeniu, dostępność — czyni HushBook mocną odpowiedzią na <strong>najlepszą darmową aplikację do audiobooków</strong>, która szanuje skupienie i prywatność.',
    ctaStrong: 'Gotowy czytać razem?',
    ctaRest: `Pobierz HushBook za darmo na <a href="${APPLE}" target="_blank" rel="noopener">iPhone</a> lub <a href="${PLAY}" target="_blank" rel="noopener">Android</a>, wybierz darmową klasykę lub zaimportuj własną książkę i patrz, jak każde słowo zapala się z głosem.`,
  },
};

// Remaining locales: use English SEO keywords in meta where search is EN-heavy + native body
// For ja, ko, ar, th, vi, ru, uk, tr, id, sv, da — full native sections

function pack(code, canonical, ogLocale, title, description, keywords, ogTitle, ogDescription, ogImageAlt, schemaDescription, featureList, section) {
  LOCALES[code] = {
    canonical,
    iconHref: '/assets/img/default_preview.png',
    meta: { title, description, keywords, ogLocale, ogTitle, ogDescription, ogImageAlt, schemaDescription, featureList },
    section,
  };
}

pack(
  'sv',
  'https://hushbook.app/sv/',
  'sv_SE',
  'Gratis ljudboksapp med synkad text | HushBook',
  'Gratis ljudboksapp med synkad text — ord-för-ord-läsning på iPhone &amp; Android. Importera vilken bok som helst, privat transkribering på enheten.',
  'gratis ljudboksapp, ljudbok med text, bästa ljudboksappar, free audiobook app with synced texts, audiobook apps for iphone, audiobook apps for android, project hail mary audiobook',
  'Gratis ljudboksapp med synkad text | HushBook',
  'Ordnivå-följeläsning för vilken ljudbok som helst — gratis på iPhone &amp; Android. Synkad text, transkribering på enheten, inget konto.',
  'HushBook — gratis ljudboksapp med synkad text',
  'Gratis ljudboksapp med synkad text. Förvandlar vilken ljudbok som helst till ordnivå-karaoke, privat transkriberad på telefonen.',
  ['Synkad text på ordnivå', 'Privat transkribering på enheten', 'Fungerar offline efter motor-nedladdning', 'Gratis public domain-bibliotek', 'Importera MP3, M4B med mera', 'Tillgängliga läsprofiler'],
  {
    eyebrow: 'Den gratis ljudboksappen',
    h2: 'Gratis ljudboksapp med synkad text',
    sub: 'Läs varje ord medan du hör det — följeläsaren för fokus, integritet och böcker du redan äger.',
    p1: 'Letar du efter en <strong>gratis ljudboksapp med synkad text</strong>? HushBook är för dig som vill ha mer än vanlig uppspelning. Vanliga spelare streamar bara rösten. HushBook gör lyssnandet till <strong>ljudbok med ord</strong>: varje talat ord tänds i takt med berättaren — som sångtext, men spåret är en hel bok.',
    h3a: 'Varför synkad text slår att bara lyssna',
    p2: 'Passivt ljud är lätt att starta och lätt att tappa. Tankarna vandrar. Namn suddas ut. Du avslutar ett kapitel och minns nästan inget. Markering ord för ord förankrar uppmärksamheten vid rösten: du ser det du hör, hoppar till vilken rad som helst med ett tryck och tappar inte stället. Därför kallar många HushBook en av de <strong>bästa gratis ljudboksapparna</strong> när förståelse räknas lika högt som bekvämlighet.',
    h3b: 'Bästa ljudboksappar — vad som skiljer HushBook',
    p3: 'Sök «<strong>bästa ljudboksappar</strong>» och du hittar butiker, abonnemang och molnkataloger. HushBook löser ett annat problem: <em>hur du läser ljud du redan har</em>. Importera egna MP3, M4B, FLAC med mera; kapitel och omslag följer om filen har dem. Tryck Transkribera — HushBook Engine på enheten bygger synkad text: ingen text-databas, ingen uppladdning, inget konto. Efter en engångsnedladdning av motorn fungerar allt offline. Den privata, filbaserade designen är ovanlig bland <strong>ljudboksappar för iPhone</strong> och <strong>Android</strong>.',
    h3c: 'Gratis på iPhone och Android',
    p4: 'HushBook är gratis på båda plattformarna — App Store och Google Play — utan annonser i kärnan. Public domain-biblioteket (klassiker från LibriVox och Internet Archive) är gratis. Följeläsning, citat, profiler och offline också. Valfri Pro ger djupare analys. Oavsett om du behöver <strong>ljudboksappar för iPhone</strong> på pendeln eller <strong>för Android</strong> på kvällen: samma löfte — gratis att börja, privat by design, synkad text ingår.',
    h3d: 'Dina böcker — från klassiker till Project Hail Mary',
    p5: 'Ta med titlarna som betyder något. Lång science fiction? Importera en <strong>Project Hail Mary-ljudbok</strong> du redan äger (eller annan bok du har rätt att spela), kör transkribering på telefonen och följ Ryland Grace ord för ord. Föredrar public domain-epos? Monte Cristo, Austen eller Aurelius i katalogen. HushBook är ingen piratbutik — det är en spelare och följeläs-motor för filer och gratis klassiker du väljer. Synkad text fungerar på många språk så en <strong>ljudbok med ord</strong> matchar det du hör.',
    h3e: 'Integritet, tillgänglighet och vanor som stannar',
    p6: 'Transkribering lämnar aldrig enheten. Ingen inloggningsmur, inget moln för ditt ljud. Läsprofiler formar hela gränssnittet — förståelse, dyslexi/ADHD eller nedsatt syn — typsnitt som OpenDyslexic och Atkinson Hyperlegible, overlay, kontrast och nattläge. Serier, märken och mjuka statistik stannar lokalt. Den kombinationen — gratis kärna, synkad text, AI på enheten, tillgänglighet — gör HushBook till ett starkt svar på den <strong>bästa gratis ljudboksappen</strong> som respekterar både fokus och integritet.',
    ctaStrong: 'Redo att läsa med?',
    ctaRest: `Ladda ner HushBook gratis till <a href="${APPLE}" target="_blank" rel="noopener">iPhone</a> eller <a href="${PLAY}" target="_blank" rel="noopener">Android</a>, välj en gratis klassiker eller importera en egen bok — och se varje ord tändas med rösten.`,
  }
);

pack(
  'da',
  'https://hushbook.app/da/',
  'da_DK',
  'Gratis lydbogsapp med synkroniseret tekst | HushBook',
  'Gratis lydbogsapp med synkroniseret tekst — ord-for-ord-læsning på iPhone &amp; Android. Importer enhver bog, privat transskription på enheden.',
  'gratis lydbogsapp, lydbog med tekst, bedste lydbogsapps, free audiobook app with synced texts, audiobook apps for iphone, audiobook apps for android, project hail mary audiobook',
  'Gratis lydbogsapp med synkroniseret tekst | HushBook',
  'Ordniveau-følgelæsning til enhver lydbog — gratis på iPhone &amp; Android. Synkroniseret tekst, transskription på enheden, ingen konto.',
  'HushBook — gratis lydbogsapp med synkroniseret tekst',
  'Gratis lydbogsapp med synkroniseret tekst. Gør enhver lydbog til karaoke på ordniveau, privat transskriberet på telefonen.',
  ['Synkroniseret tekst på ordniveau', 'Privat transskription på enheden', 'Virker offline efter motor-download', 'Gratis public domain-bibliotek', 'Importer MP3, M4B m.m.', 'Tilgængelige læseprofiler'],
  {
    eyebrow: 'Den gratis lydbogsapp',
    h2: 'Gratis lydbogsapp med synkroniseret tekst',
    sub: 'Læs hvert ord, mens du hører det — følgelæserspilleren til fokus, privatliv og bøger, du allerede ejer.',
    p1: 'Leder du efter en <strong>gratis lydbogsapp med synkroniseret tekst</strong>? HushBook er til dig, der vil mere end almindelig afspilning. Almindelige spillere streamer kun stemmen. HushBook gør lytning til <strong>lydbog med ord</strong>: hvert talte ord tænder i takt med fortælleren — som sangtekst, men sporet er en hel bog.',
    h3a: 'Hvorfor synkroniseret tekst slår at lytte alene',
    p2: 'Passiv lyd er nem at starte og nem at miste. Tankerne vandrer. Navne sløres. Du afslutter et kapitel og husker næsten intet. Fremhævning ord for ord forankrer opmærksomheden ved stemmen: du ser det, du hører, hopper til enhver linje med et tryk og mister ikke stedet. Derfor kalder mange HushBook en af de <strong>bedste gratis lydbogsapps</strong>, når forståelse tæller lige så meget som bekvemmelighed.',
    h3b: 'Bedste lydbogsapps — hvad der adskiller HushBook',
    p3: 'Søg «<strong>bedste lydbogsapps</strong>», og du finder butikker, abonnementer og skykataloger. HushBook løser et andet problem: <em>hvordan du læser lyd, du allerede har</em>. Importer egne MP3, M4B, FLAC m.m.; kapitler og cover følger, hvis filen har dem. Tryk Transskriber — HushBook Engine på enheden bygger synkroniseret tekst: ingen tekstdatabase, ingen upload, ingen konto. Efter ét motor-download virker alt offline. Det private, filbaserede design er sjældent blandt <strong>lydbogsapps til iPhone</strong> og <strong>Android</strong>.',
    h3c: 'Gratis på iPhone og Android',
    p4: 'HushBook er gratis på begge platforme — App Store og Google Play — uden annoncer i kernen. Public domain-biblioteket (klassikere fra LibriVox og Internet Archive) er gratis. Følgelæsning, citater, profiler og offline også. Valgfri Pro giver dybere analyse. Uanset om du har brug for <strong>lydbogsapps til iPhone</strong> på toget eller <strong>til Android</strong> om aftenen: samme løfte — gratis at starte, privat by design, synkroniseret tekst inkluderet.',
    h3d: 'Dine bøger — fra klassikere til Project Hail Mary',
    p5: 'Tag titlerne med, der betyder noget. Lang science fiction? Importer en <strong>Project Hail Mary-lydbog</strong>, du allerede ejer (eller en anden bog, du har ret til at afspille), kør transskription på telefonen, og følg Ryland Grace ord for ord. Foretrækker public domain-epik? Monte Cristo, Austen eller Aurelius i kataloget. HushBook er ikke en piratbutik — det er en spiller og følgelæsemotor til filer og gratis klassikere, du vælger. Synkroniseret tekst virker på mange sprog, så en <strong>lydbog med ord</strong> matcher det, du hører.',
    h3e: 'Privatliv, tilgængelighed og vaner, der bliver',
    p6: 'Transskription forlader aldrig enheden. Ingen login-mur, ingen sky til din lyd. Læseprofiler former hele UI’et — forståelse, dysleksi/ADHD eller nedsat syn — skrifttyper som OpenDyslexic og Atkinson Hyperlegible, overlays, kontrast og nattilstand. Serier, badges og bløde stats forbliver lokale. Den kombination — gratis kerne, synkroniseret tekst, AI på enheden, tilgængelighed — gør HushBook til et stærkt svar på den <strong>bedste gratis lydbogsapp</strong>, der respekterer både fokus og privatliv.',
    ctaStrong: 'Klar til at læse med?',
    ctaRest: `Download HushBook gratis til <a href="${APPLE}" target="_blank" rel="noopener">iPhone</a> eller <a href="${PLAY}" target="_blank" rel="noopener">Android</a>, vælg en gratis klassiker eller importer din egen bog — og se hvert ord tænde med stemmen.`,
  }
);

// For complex script languages use full native packs
pack(
  'ja',
  'https://hushbook.app/ja/',
  'ja_JP',
  '同期テキスト付き無料オーディオブックアプリ | HushBook',
  '同期テキスト付き無料オーディオブックアプリ。iPhone・Androidで単語単位の読み聞かせ。好きな本を取り込み、端末内でプライベートに文字起こし。',
  '無料オーディオブックアプリ, 同期テキスト, free audiobook app with synced texts, best free audiobook app, audiobook apps for iphone, audiobook apps for android, project hail mary audiobook',
  '同期テキスト付き無料オーディオブックアプリ | HushBook',
  'どのオーディオブックも単語単位で読み上げ同期 — iPhone・Android無料。端末内文字起こし、アカウント不要。',
  'HushBook — 同期テキスト付き無料オーディオブックアプリ',
  '同期テキスト付き無料オーディオブックアプリ。どのオーディオブックも端末内で単語単位カラオケに変換。',
  ['単語単位の同期テキスト', '端末内プライベート文字起こし', 'エンジンDL後はオフライン', 'パブリックドメイン無料ライブラリ', 'MP3・M4Bなど取り込み', 'アクセシビリティ読書プロファイル'],
  {
    eyebrow: '無料オーディオブックアプリ',
    h2: '同期テキスト付き無料オーディオブックアプリ',
    sub: '聞こえるままに一語ずつ読む — 集中・プライバシー・すでに持っている本のための読み聞かせプレイヤー。',
    p1: '<strong>同期テキスト付き無料オーディオブックアプリ</strong>をお探しですか？HushBookは、ただ再生するだけでは足りない人のためのアプリです。普通のプレイヤーは声だけを流し、目には追うものがありません。HushBookは聴くことを<strong>言葉のあるオーディオブック</strong>に変えます。話されたすべての語がナレーターに合わせて光り、音楽アプリの歌詞のように読めます — ただし曲は一冊の本です。',
    h3a: '同期テキストが「聴くだけ」に勝る理由',
    p2: '受動的な音声は始めやすいが、すぐ流れます。気が散り、名前がぼやけ、章を終えてもほとんど残らない。単語単位のハイライトは注意を声に固定します。聞いたものを見て、タップでどの行にも飛び、場所を失いません。理解と利便の両方が大事なとき、多くの人がHushBookを<strong>最良の無料オーディオブックアプリ</strong>のひとつと呼ぶ理由です。',
    h3b: '最良のオーディオブックアプリ — HushBookの違い',
    p3: '「<strong>best audiobook apps</strong>」で探すと、ストアやサブスク、クラウド目録が出てきます。HushBookが解くのは別の問題：<em>すでに持っている音声をどう読むか</em>。MP3・M4B・FLACなどを取り込み、章やカバーがあれば一緒に来ます。「文字起こし」をタップすると端末上のHushBook Engineが同期テキストを生成 — 歌詞DBなし、アップロードなし、アカウントなし。エンジンを一度入れればオフライン。このプライベートでファイル中心の設計は、主流の<strong>iPhone向けオーディオブックアプリ</strong>や<strong>Android向け</strong>では珍しいです。',
    h3c: 'iPhoneとAndroidで無料',
    p4: 'HushBookは両OSで無料 — App StoreとGoogle Play — コア体験に広告なし。パブリックドメインの名作ライブラリ（LibriVoxとInternet Archive）も無料。読み聞かせカラオケ、引用、読書プロファイル、オフラインも無料。任意のProで深い分析。通勤向け<strong>iPhoneのオーディオブックアプリ</strong>でも、就寝時の<strong>Androidアプリ</strong>でも、約束は同じ：無料で始め、設計からプライベート、同期テキスト込み。',
    h3d: 'あなたの本 — 名作から Project Hail Mary まで',
    p5: '大事なタイトルを持ってきてください。長編SFが好きなら、すでに所有する<strong>Project Hail Mary audiobook</strong>ファイル（または合法に再生できる本）を取り込み、端末で文字起こしし、Ryland Graceを一語ずつ追えます。パブリックドメインの大作なら、カタログのモンテ・クリスト、オースティン、アウレリウスから。HushBookは海賊版ストアではなく、選んだファイルと無料古典のためのプレイヤー兼読み聞かせエンジンです。同期テキストは多数言語に対応し、<strong>言葉のあるオーディオブック</strong>が聞こえる言語に合います。',
    h3e: 'プライバシー、アクセシビリティ、続く習慣',
    p6: '文字起こしは端末を出ません。ログイン壁も、音声のクラウドもありません。読書プロファイルは理解・ディスレクシア/ADHD・ロービジョン向けにUI全体を変え、OpenDyslexicやAtkinson Hyperlegible、オーバーレイ、コントラスト、ナイトモードを用意。連続記録・バッジ・やさしい統計はローカル。無料コア、同期テキスト、端末内AI、アクセシビリティ — この組み合わせが、集中とプライバシーを両立する<strong>best free audiobook app</strong>としてのHushBookを支えます。',
    ctaStrong: '一緒に読み始めますか？',
    ctaRest: `<a href="${APPLE}" target="_blank" rel="noopener">iPhone</a> または <a href="${PLAY}" target="_blank" rel="noopener">Android</a> でHushBookを無料ダウンロード。無料の古典を選ぶか自分の本を取り込み、声に合わせてすべての語が光るのを見てください。`,
  }
);

pack(
  'ko',
  'https://hushbook.app/ko/',
  'ko_KR',
  '동기화 텍스트가 있는 무료 오디오북 앱 | HushBook',
  '동기화 텍스트가 있는 무료 오디오북 앱 — iPhone·Android에서 단어 단위 따라 읽기. 어떤 책이든 가져와 기기에서 비공개로 전사.',
  '무료 오디오북 앱, 동기화 텍스트, free audiobook app with synced texts, best free audiobook app, audiobook apps for iphone, audiobook apps for android, project hail mary audiobook',
  '동기화 텍스트가 있는 무료 오디오북 앱 | HushBook',
  '어떤 오디오북이든 단어 단위 따라 읽기 — iPhone·Android 무료. 동기화 텍스트, 기기 내 전사, 계정 불필요.',
  'HushBook — 동기화 텍스트가 있는 무료 오디오북 앱',
  '동기화 텍스트가 있는 무료 오디오북 앱. 어떤 오디오북이든 기기에서 비공개로 단어 단위 가라오케로 변환.',
  ['단어 단위 동기화 텍스트', '기기 내 비공개 전사', '엔진 다운로드 후 오프라인', '무료 퍼블릭 도메인 라이브러리', 'MP3·M4B 등 가져오기', '접근성 읽기 프로필'],
  {
    eyebrow: '무료 오디오북 앱',
    h2: '동기화 텍스트가 있는 무료 오디오북 앱',
    sub: '들으면서 모든 단어를 읽으세요 — 집중, 프라이버시, 이미 가진 책을 위한 따라 읽기 플레이어.',
    p1: '<strong>동기화 텍스트가 있는 무료 오디오북 앱</strong>을 찾으시나요? HushBook은 단순 재생 이상을 원하는 사람을 위해 만들어졌습니다. 일반 플레이어는 음성만 흘려보내고 눈은 따라갈 것이 없습니다. HushBook은 듣기를 <strong>단어가 있는 오디오북</strong>으로 바꿉니다. 말하는 모든 단어가 내레이터에 맞춰 빛나 음악 앱 가사처럼 읽습니다 — 다만 트랙은 한 권의 책입니다.',
    h3a: '동기화 텍스트가 듣기만 하는 것보다 나은 이유',
    p2: '수동적인 오디오는 시작하기 쉽고 놓치기도 쉽습니다. 생각이 흐르고 이름이 흐려지며 장을 끝내도 거의 남지 않습니다. 단어 단위 하이라이트는 주의를 목소리에 고정합니다. 들은 것을 보고, 탭으로 어느 줄이든 이동하며, 자리를 잃지 않습니다. 이해와 편리함이 모두 중요할 때 많은 이가 HushBook을 <strong>최고의 무료 오디오북 앱</strong> 중 하나로 부르는 이유입니다.',
    h3b: '최고의 오디오북 앱 — HushBook이 다른 점',
    p3: '«<strong>best audiobook apps</strong>»를 검색하면 스토어, 구독, 클라우드 카탈로그가 나옵니다. HushBook이 푸는 문제는 다릅니다: <em>이미 가진 오디오를 어떻게 읽을까</em>. MP3·M4B·FLAC 등을 가져오면 파일에 있는 장·표지가 함께 옵니다. 전사를 누르면 기기 위 HushBook Engine이 동기화 텍스트를 만듭니다 — 가사 DB 없음, 업로드 없음, 계정 없음. 엔진을 한 번 받으면 오프라인. 이 비공개·파일 우선 설계는 주류 <strong>iPhone 오디오북 앱</strong>과 <strong>Android 앱</strong>에서 드뭅니다.',
    h3c: 'iPhone과 Android에서 무료',
    p4: 'HushBook은 두 플랫폼 모두 무료 — App Store와 Google Play — 핵심 경험에 광고 없음. 퍼블릭 도메인 라이브러리(LibriVox·Internet Archive 고전)도 무료. 따라 읽기 가라오케, 인용, 읽기 프로필, 오프라인도 무료. 선택적 Pro로 더 깊은 분석. 출퇴근용 <strong>iPhone 오디오북 앱</strong>이든 잠자리용 <strong>Android 앱</strong>이든 약속은 같습니다: 무료로 시작, 설계부터 비공개, 동기화 텍스트 포함.',
    h3d: '당신의 책 — 고전부터 Project Hail Mary까지',
    p5: '소중한 제목을 가져오세요. 장편 SF를 좋아하나요? 이미 소유한 <strong>Project Hail Mary audiobook</strong> 파일(또는 합법적으로 재생할 수 있는 책)을 가져와 폰에서 전사하고 Ryland Grace를 단어마다 따라가세요. 퍼블릭 도메인 대작이 낫다면 카탈로그의 몬테 크리스토, 오스틴, 아우렐리우스. HushBook은 불법 스토어가 아니라 선택한 파일과 무료 고전을 위한 플레이어·따라 읽기 엔진입니다. 동기화 텍스트는 여러 언어를 지원해 <strong>단어가 있는 오디오북</strong>이 듣는 언어와 맞습니다.',
    h3e: '프라이버시, 접근성, 이어지는 습관',
    p6: '전사는 기기를 떠나지 않습니다. 로그인 벽도, 오디오용 클라우드도 없습니다. 읽기 프로필은 이해·난독증/ADHD·저시력에 맞게 UI 전체를 바꾸고 OpenDyslexic·Atkinson Hyperlegible, 오버레이, 대비, 나이트 모드를 제공합니다. 연속 기록·배지·가벼운 통계는 로컬에 남습니다. 무료 코어, 동기화 텍스트, 기기 AI, 접근성 — 이 조합이 집중과 프라이버시를 모두 존중하는 <strong>best free audiobook app</strong>으로서 HushBook을 지탱합니다.',
    ctaStrong: '함께 읽을 준비 되셨나요?',
    ctaRest: `<a href="${APPLE}" target="_blank" rel="noopener">iPhone</a> 또는 <a href="${PLAY}" target="_blank" rel="noopener">Android</a>용 HushBook을 무료로 받고, 무료 고전을 고르거나 내 책을 가져와 목소리와 함께 모든 단어가 빛나는 것을 보세요.`,
  }
);

// For remaining: ru, uk, tr, id, th, vi, ar — full packs
const remaining = require('./seo-locale-remaining.js');
Object.assign(LOCALES, remaining.LOCALES);

const PROJECT_PHRASE_RE = /Project[\s-]+Hail[\s-]+Mary/gi;
const PROJECT_STRONG_RE = /<strong>[^<]*Project[\s-]+Hail[\s-]+Mary[^<]*<\/strong>/i;
const PROJECT_KEYWORD_RE = /project[\s-]+hail[\s-]+mary[\s-]+audiobook/gi;

function regionalizeSection(section, locale) {
  const book = REGIONAL_BOOKS[locale] || REGIONAL_BOOKS.en;
  const next = { ...section };
  next.h3d = next.h3d.replace(PROJECT_PHRASE_RE, book.title);
  next.p5 = next.p5.replace(PROJECT_STRONG_RE, `<strong>${book.strongTitle}</strong>`);
  next.p5 = next.p5.replace(PROJECT_PHRASE_RE, book.title);
  return next;
}

function regionalizeConfig(cfg, locale) {
  const book = REGIONAL_BOOKS[locale] || REGIONAL_BOOKS.en;
  return {
    ...cfg,
    meta: {
      ...cfg.meta,
      keywords: cfg.meta.keywords.replace(PROJECT_KEYWORD_RE, book.keyword),
    },
    section: regionalizeSection(cfg.section, locale),
  };
}

function regionalizeBookMentions(html, locale) {
  const book = REGIONAL_BOOKS[locale] || REGIONAL_BOOKS.en;
  return html.replace(PROJECT_PHRASE_RE, book.title);
}

function stripExistingSeoSection(html) {
  return html.replace(
    /\n?<!-- ============ SEO COPY ============ -->[\s\S]*?(?=<!-- ============ FAQ ============ -->)/,
    '\n'
  );
}

function ensureCss(html) {
  if (html.includes('.seo-copy{')) return html;
  if (html.includes('/* faq */')) {
    return html.replace('/* faq */', `${SEO_CSS}/* faq */`);
  }
  // fallback: insert before </style>
  return html.replace('</style>', `${SEO_CSS}</style>`);
}

function replaceMeta(html, cfg) {
  const block = metaBlock({
    ...cfg.meta,
    canonical: cfg.canonical,
    iconHref: cfg.iconHref,
  });

  // Remove every unmarked SoftwareApplication block before inserting one.
  // Global replacement keeps this idempotent after a partially completed run.
  let out = html.replace(
    /\n?<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    (full, body) => /"@type"\s*:\s*"SoftwareApplication"/.test(body) ? '' : full,
  );

  // Replace from <title> through first <link rel="icon"...> (inclusive of that link)
  const re = /<title>[\s\S]*?<link rel="icon"[^>]*>/;
  if (!re.test(out)) {
    throw new Error('Could not find title..icon block to replace');
  }
  out = out.replace(re, block);
  return out;
}

function insertSection(html, section) {
  const marker = '<!-- ============ FAQ ============ -->';
  if (!html.includes(marker)) {
    throw new Error('FAQ marker missing');
  }
  const cleaned = stripExistingSeoSection(html);
  return cleaned.replace(marker, `${sectionHtml(section)}${marker}`);
}

function faqItemsHtml(locale) {
  const items = FAQ_ADDITIONS[locale] || FAQ_ADDITIONS.en;
  return [
    '      <!-- ============ FAQ ADDITIONS ============ -->',
    ...items.flatMap(({ q, a }) => [
      `      <div class="qa"><button type="button" aria-expanded="false">${q}</button><div class="a"><p>${a}</p></div></div>`,
    ]),
  ].join('\n');
}

function insertFaqAdditions(html, locale) {
  const faqMarker = '<!-- ============ FAQ ============ -->';
  const finaleMarker = '<!-- ============ FINALE ============ -->';
  const faqStart = html.indexOf(faqMarker);
  const finaleStart = html.indexOf(finaleMarker, faqStart);
  if (faqStart < 0 || finaleStart < 0) {
    throw new Error('FAQ/finale markers missing');
  }

  let faqBlock = html.slice(faqStart, finaleStart).replace(
    /\n?\s*<!-- ============ FAQ ADDITIONS ============ -->[\s\S]*?(?=\n\s*<\/div>\s*\n\s*<\/div>\s*\n<\/section>)/,
    '\n'
  );
  const closing = /\n\s*<\/div>\s*\n\s*<\/div>\s*\n<\/section>\s*$/;
  const match = closing.exec(faqBlock);
  if (!match) {
    throw new Error('Could not find FAQ container closing tags');
  }

  const insertAt = match.index;
  faqBlock = `${faqBlock.slice(0, insertAt)}\n${faqItemsHtml(locale)}${faqBlock.slice(insertAt)}`;
  return `${html.slice(0, faqStart)}${faqBlock}${html.slice(finaleStart)}`;
}

function decodeHtml(value) {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function ensureFaqSchema(html) {
  const items = [];
  const qaRe = /<div class="qa">\s*<button[^>]*>([\s\S]*?)<\/button>\s*<div class="a">\s*<p>([\s\S]*?)<\/p>/g;
  let match;
  while ((match = qaRe.exec(html))) {
    items.push({
      '@type': 'Question',
      name: decodeHtml(match[1]),
      acceptedAnswer: {
        '@type': 'Answer',
        text: decodeHtml(match[2]),
      },
    });
  }
  if (!items.length) throw new Error('No FAQ items found for schema');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items,
  };
  const block = `<script type="application/ld+json" data-hushbook-faq>\n${JSON.stringify(schema, null, 2)}\n</script>`;
  const withoutExisting = html.replace(
    /\n?<script type="application\/ld\+json" data-hushbook-faq>[\s\S]*?<\/script>/,
    ''
  );
  return withoutExisting.replace('</head>', `${block}\n</head>`);
}

function processFile(filePath, cfg, label) {
  let html = fs.readFileSync(filePath, 'utf8');
  const localizedCfg = regionalizeConfig(cfg, label);
  html = ensureCss(html);
  html = replaceMeta(html, localizedCfg);
  html = insertSection(html, localizedCfg.section);
  html = insertFaqAdditions(html, label);
  html = regionalizeBookMentions(html, label);
  html = ensureFaqSchema(html);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('OK', label);
}

function main() {
  // The root and locale pages share the same generation path so content cannot
  // silently disappear when a localization merge replaces index.html.
  const enRoot = path.join(ROOT, 'index.html');
  let en = fs.readFileSync(enRoot, 'utf8');
  const enCfg = regionalizeConfig({
    canonical: 'https://hushbook.app/',
    iconHref: 'assets/img/default_preview.png',
    meta: EN_META,
    section: EN_SECTION,
  }, 'en');
  en = ensureCss(en);
  en = replaceMeta(en, enCfg);
  en = insertSection(en, enCfg.section);
  en = insertFaqAdditions(en, 'en');
  en = regionalizeBookMentions(en, 'en');
  en = ensureFaqSchema(en);
  fs.writeFileSync(enRoot, en, 'utf8');
  console.log('OK en (root)');

  for (const [code, cfg] of Object.entries(LOCALES)) {
    const filePath = path.join(ROOT, code, 'index.html');
    if (!fs.existsSync(filePath)) {
      console.warn('SKIP missing', code);
      continue;
    }
    processFile(filePath, cfg, code);
  }
}

main();
