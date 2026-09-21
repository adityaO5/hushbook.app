'use strict';

const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const output = path.join(root, 'docs', 'seo', 'alternative-content-strategy.md');
const rows = [];

const proof = {
  A: 'Same-date attribute table plus one explicit winner sentence.',
  B: 'Qualified workflow test and verdict for stated audience.',
  C: 'Parity table across every named option and segment verdicts.',
  D: 'Official feature and pricing checks dated on publication.',
  E: 'Hands-on use-case result with a measurable outcome.',
  F: 'Persona requirements matrix plus accessibility or workflow evidence.',
  G: 'Verified platform, privacy, pricing, or integration evidence.',
  H: 'Complete named set with consistent scoring methodology.'
};

function add(title, family, question, intent, namedSet, tier, requiredProof = proof[family]) {
  rows.push({ title, family, question, intent, namedSet, requiredProof, tier });
}

const pairs = [
  ['HushBook', 'Audible'], ['HushBook', 'BookPlayer'], ['HushBook', 'Storytel'], ['HushBook', 'Pocket FM'], ['HushBook', 'Speechify'],
  ['Audible', 'Storytel'], ['Audible', 'Spotify Audiobooks'], ['Audible', 'Everand'], ['Audible', 'Pocket FM'], ['Audible', 'LibriVox'],
  ['BookPlayer', 'Voice Audiobook Player'], ['BookPlayer', 'Smart AudioBook Player'], ['BookPlayer', 'Listen Audiobook Player'], ['BookPlayer', 'Audiobookshelf'], ['BookPlayer', 'HushBook'],
  ['Speechify', 'NaturalReader'], ['Speechify', 'Voice Dream Reader'], ['Speechify', 'ElevenReader'], ['Speechify', 'Speech Central'], ['Speechify', 'HushBook'],
  ['Storytel', 'Spotify Audiobooks'], ['Storytel', 'Everand'], ['Storytel', 'Pocket FM'], ['Pocket FM', 'Spotify Audiobooks'], ['Audiobookshelf', 'Voice Audiobook Player']
];
pairs.forEach(([a, b], index) => add(`${a} vs ${b}: Which Audiobook App Fits?`, 'A', `Should I choose ${a} or ${b} for my audiobook workflow?`, 'commercial-investigation', `${a}, ${b}`, index < 15 ? 1 : 2));

const qualified = [
  ['HushBook', 'Audible', 'owned audiobook files'], ['HushBook', 'BookPlayer', 'synchronized read-along'], ['HushBook', 'Speechify', 'students with dyslexia'], ['HushBook', 'Storytel', 'offline reading'], ['HushBook', 'Pocket FM', 'complete audiobooks'],
  ['Audible', 'Spotify Audiobooks', 'commuters'], ['Audible', 'Everand', 'ebook readers'], ['Storytel', 'Everand', 'multiformat reading'], ['BookPlayer', 'Voice Audiobook Player', 'private local playback'], ['BookPlayer', 'Audiobookshelf', 'family libraries'],
  ['Speechify', 'NaturalReader', 'university students'], ['Speechify', 'Voice Dream Reader', 'accessible reading'], ['Speechify', 'ElevenReader', 'natural AI voices'], ['Listen Audiobook Player', 'Smart AudioBook Player', 'Android power users'], ['HushBook', 'Voice Audiobook Player', 'account-free Android listening'],
  ['Audiobookshelf', 'HushBook', 'self-hosted households'], ['Pocket FM', 'Storytel', 'serialized fiction fans'], ['Spotify Audiobooks', 'Storytel', 'heavy listeners'], ['LibriVox', 'HushBook', 'free classic audiobooks'], ['Google Play Books', 'Audible', 'one-off purchases']
];
qualified.forEach(([a, b, useCase], index) => add(`${a} vs ${b} for ${useCase}`, 'B', `Which is better for ${useCase}: ${a} or ${b}?`, 'commercial-investigation', `${a}, ${b}`, index < 10 ? 1 : 2));

const multiway = [
  ['HushBook vs Audible vs BookPlayer for Owned Audiobooks', ['HushBook', 'Audible', 'BookPlayer']],
  ['Audible vs Storytel vs Everand for Book Subscriptions', ['Audible', 'Storytel', 'Everand']],
  ['Speechify vs NaturalReader vs ElevenReader for Study', ['Speechify', 'NaturalReader', 'ElevenReader']],
  ['BookPlayer vs Voice vs Listen for Local Audiobooks', ['BookPlayer', 'Voice Audiobook Player', 'Listen Audiobook Player']],
  ['Pocket FM vs Storytel vs Spotify for Audio Fiction', ['Pocket FM', 'Storytel', 'Spotify Audiobooks']],
  ['Five Audiobook Players Compared on Offline Privacy', ['HushBook', 'BookPlayer', 'Voice Audiobook Player', 'Listen Audiobook Player', 'Smart AudioBook Player']],
  ['Five Reading Apps Compared on Accessibility Tools', ['HushBook', 'Speechify', 'NaturalReader', 'Voice Dream Reader', 'Speech Central']],
  ['Five Audiobook Services Compared on Ownership Rules', ['Audible', 'Storytel', 'Spotify Audiobooks', 'Everand', 'Google Play Books']],
  ['Free Audiobook Tools Compared for Classic Literature', ['HushBook', 'LibriVox', 'Voice Audiobook Player', 'BookPlayer', 'Audiobookshelf']],
  ['Android Audiobook Apps Compared on Playback Controls', ['HushBook', 'Voice Audiobook Player', 'Listen Audiobook Player', 'Smart AudioBook Player', 'Audiobookshelf']]
];
multiway.forEach(([title, set], index) => add(title, 'C', `How do ${set.join(', ').replace(/, ([^,]*)$/, ', and $1')} compare for this specific audiobook need?`, 'commercial-investigation', set.join(', '), index < 6 ? 1 : 2));

const alternativeSpecs = [
  ['Audible', 'private offline listening'], ['BookPlayer', 'Android users'], ['Storytel', 'owned audiobook files'], ['Pocket FM', 'complete audiobooks'], ['Speechify', 'human-narrated audiobooks'],
  ['Spotify Audiobooks', 'unlimited listening'], ['Everand', 'local file ownership'], ['LibriVox', 'new releases'], ['Audiobookshelf', 'no server setup'], ['Smart AudioBook Player', 'synchronized text'],
  ['Voice Audiobook Player', 'iPhone users'], ['Listen Audiobook Player', 'free playback'], ['NaturalReader', 'offline privacy'], ['Voice Dream Reader', 'Android users'], ['ElevenReader', 'human narration'],
  ['Speech Central', 'audiobook files'], ['Google Play Books', 'subscription listening'], ['Apple Books', 'Android users'], ['Audible', 'no monthly subscription'], ['Speechify', 'under $10 monthly']
];
const altSets = {
  Audible: 'HushBook, Storytel, Spotify Audiobooks, Everand, LibriVox', BookPlayer: 'HushBook, Voice Audiobook Player, Listen Audiobook Player, Audiobookshelf, Smart AudioBook Player', Storytel: 'HushBook, Audible, Everand, Spotify Audiobooks, LibriVox', 'Pocket FM': 'HushBook, Audible, Storytel, Spotify Audiobooks, LibriVox', Speechify: 'HushBook, NaturalReader, Voice Dream Reader, ElevenReader, Speech Central'
};
alternativeSpecs.forEach(([competitor, qualifier], index) => {
  const set = altSets[competitor] || 'HushBook, BookPlayer, Voice Audiobook Player, Audiobookshelf, LibriVox';
  add(`Best ${competitor} Alternatives for ${qualifier}`, 'D', `What are the best ${competitor} alternatives for ${qualifier}?`, 'commercial-investigation', set, index < 10 ? 1 : 2);
});

const useCases = [
  ['private on-device audiobook transcription', 'HushBook, Speechify, NaturalReader, ElevenReader, Speech Central'],
  ['reading while listening word by word', 'HushBook, Speechify, Voice Dream Reader, NaturalReader, ElevenReader'],
  ['playing DRM-free M4B files', 'HushBook, BookPlayer, Voice Audiobook Player, Listen Audiobook Player, Smart AudioBook Player'],
  ['organizing a large local audiobook library', 'BookPlayer, Audiobookshelf, Voice Audiobook Player, Listen Audiobook Player, Smart AudioBook Player'],
  ['listening on long flights without internet', 'HushBook, BookPlayer, Voice Audiobook Player, Audible, LibriVox'],
  ['tracking audiobook reading habits', 'HushBook, Everand, Storytel, Audible, Spotify Audiobooks'],
  ['saving and sharing audiobook quotes', 'HushBook, Listen Audiobook Player, Speechify, NaturalReader, Voice Dream Reader'],
  ['understanding difficult narrated books', 'HushBook, Speechify, NaturalReader, Voice Dream Reader, ElevenReader'],
  ['free public-domain classic audiobooks', 'HushBook, LibriVox, Apple Books, Google Play Books, Audiobookshelf'],
  ['self-hosting family audiobooks', 'Audiobookshelf, HushBook, BookPlayer, Voice Audiobook Player, Listen Audiobook Player'],
  ['syncing progress across devices', 'Audiobookshelf, BookPlayer, Audible, Storytel, Spotify Audiobooks'],
  ['listening to serialized audio fiction', 'Pocket FM, Storytel, Spotify Audiobooks, Audible, Everand'],
  ['buying one audiobook without subscribing', 'Audible, Google Play Books, Apple Books, Spotify Audiobooks, Storytel'],
  ['combining ebooks and audiobooks', 'Storytel, Everand, Google Play Books, Apple Books, Speechify'],
  ['turning study PDFs into speech', 'Speechify, NaturalReader, Voice Dream Reader, ElevenReader, Speech Central'],
  ['navigating audiobooks in the car', 'BookPlayer, Voice Audiobook Player, HushBook, Listen Audiobook Player, Audible'],
  ['using audiobook bookmarks and notes', 'HushBook, BookPlayer, Voice Audiobook Player, Listen Audiobook Player, Audible'],
  ['adjusting audiobook playback speed', 'HushBook, BookPlayer, Voice Audiobook Player, Listen Audiobook Player, Smart AudioBook Player'],
  ['sleeping with an audiobook timer', 'BookPlayer, Voice Audiobook Player, Listen Audiobook Player, Smart AudioBook Player, Audible'],
  ['learning languages through narrated text', 'HushBook, Speechify, NaturalReader, Voice Dream Reader, ElevenReader'],
  ['supporting dyslexic audiobook readers', 'HushBook, Voice Dream Reader, NaturalReader, Speechify, Speech Central'],
  ['supporting hard-of-hearing audiobook listeners', 'HushBook, Speechify, Voice Dream Reader, NaturalReader, Speech Central'],
  ['editing audiobook metadata and chapters', 'Audiobookshelf, BookPlayer, HushBook, Voice Audiobook Player, Smart AudioBook Player'],
  ['streaming current audiobook bestsellers', 'Audible, Storytel, Spotify Audiobooks, Everand, Google Play Books'],
  ['keeping listening data off cloud servers', 'HushBook, Voice Audiobook Player, BookPlayer, Listen Audiobook Player, Smart AudioBook Player']
];
useCases.forEach(([useCase, set], index) => add(`Best Audiobook Apps for ${useCase}`, 'E', `What is the best audiobook app for ${useCase}?`, index < 4 ? 'transactional' : 'commercial-investigation', set, index < 10 ? 1 : 2));

const audiences = [
  ['students', 'HushBook, Speechify, NaturalReader, Voice Dream Reader, ElevenReader'], ['teachers', 'HushBook, Speechify, NaturalReader, Voice Dream Reader, LibriVox'], ['readers with dyslexia', 'HushBook, Voice Dream Reader, NaturalReader, Speechify, Speech Central'], ['hard-of-hearing listeners', 'HushBook, Speechify, Voice Dream Reader, NaturalReader, Speech Central'], ['blind and low-vision readers', 'Voice Dream Reader, BookPlayer, Speechify, NaturalReader, Speech Central'],
  ['commuters', 'Audible, Storytel, Spotify Audiobooks, HushBook, BookPlayer'], ['parents managing family libraries', 'Audiobookshelf, Audible, Storytel, HushBook, BookPlayer'], ['audiobook collectors', 'Audiobookshelf, BookPlayer, HushBook, Voice Audiobook Player, Smart AudioBook Player'], ['independent learners', 'HushBook, Speechify, NaturalReader, LibriVox, ElevenReader'], ['Android power users', 'HushBook, Voice Audiobook Player, Listen Audiobook Player, Smart AudioBook Player, Audiobookshelf'],
  ['public libraries', 'LibriVox, Audiobookshelf, HushBook, Google Play Books, Apple Books'], ['universities', 'NaturalReader, Speechify, Voice Dream Reader, HushBook, Speech Central'], ['K-12 education', 'HushBook, NaturalReader, Speechify, Voice Dream Reader, LibriVox'], ['homeschool families', 'HushBook, LibriVox, NaturalReader, Speechify, Audiobookshelf'], ['accessibility services teams', 'Voice Dream Reader, HushBook, NaturalReader, Speechify, Speech Central'],
  ['language-learning programs', 'HushBook, Speechify, NaturalReader, ElevenReader, Voice Dream Reader'], ['corporate learning teams', 'Speechify, NaturalReader, Speech Central, HushBook, ElevenReader'], ['publishers testing read-along formats', 'HushBook, Speechify, ElevenReader, NaturalReader, Voice Dream Reader'], ['book clubs', 'Everand, Storytel, Audible, HushBook, Spotify Audiobooks'], ['solo readers on a budget', 'HushBook, LibriVox, Voice Audiobook Player, BookPlayer, Audiobookshelf']
];
audiences.forEach(([audience, set], index) => add(`Best Audiobook and Reading Apps for ${audience}`, 'F', `Which audiobook and reading apps work best for ${audience}?`, 'commercial-investigation', set, index < 10 ? 2 : 3));

const constraints = [
  ['free audiobook player apps', 'HushBook, BookPlayer, Voice Audiobook Player, Audiobookshelf, LibriVox'], ['audiobook apps under $10 monthly', 'HushBook, Voice Audiobook Player, BookPlayer, Spotify Audiobooks, LibriVox'], ['audiobook apps for iOS and Android', 'HushBook, Audible, Storytel, Spotify Audiobooks, Everand'], ['Android audiobook players for local files', 'HushBook, Voice Audiobook Player, Listen Audiobook Player, Smart AudioBook Player, Audiobookshelf'], ['iPhone audiobook players for local files', 'HushBook, BookPlayer, Voice Dream Reader, Audiobookshelf, Speechify'],
  ['audiobook apps without an account', 'HushBook, Voice Audiobook Player, BookPlayer, Listen Audiobook Player, Smart AudioBook Player'], ['audiobook apps without ads', 'HushBook, Voice Audiobook Player, BookPlayer, Audiobookshelf, LibriVox'], ['audiobook apps without cloud uploads', 'HushBook, Voice Audiobook Player, BookPlayer, Listen Audiobook Player, Smart AudioBook Player'], ['audiobook apps without a subscription', 'HushBook, BookPlayer, Voice Audiobook Player, Listen Audiobook Player, LibriVox'], ['audiobook tools with on-device AI', 'HushBook, NaturalReader, Speechify, ElevenReader, Speech Central'],
  ['open-source audiobook players', 'BookPlayer, Voice Audiobook Player, Audiobookshelf, HushBook, LibriVox'], ['offline audiobook apps for flights', 'HushBook, BookPlayer, Voice Audiobook Player, Audible, Storytel'], ['self-hosted audiobook tools', 'Audiobookshelf, HushBook, BookPlayer, Voice Audiobook Player, Listen Audiobook Player'], ['audiobook players with no technical setup', 'HushBook, BookPlayer, Voice Audiobook Player, Listen Audiobook Player, Smart AudioBook Player'], ['audiobook apps with CarPlay support', 'BookPlayer, Audible, Spotify Audiobooks, Voice Dream Reader, Audiobookshelf'],
  ['audiobook apps with Android Auto support', 'Voice Audiobook Player, Audible, Spotify Audiobooks, Listen Audiobook Player, Audiobookshelf'], ['audiobook apps with dyslexia fonts', 'HushBook, Voice Dream Reader, NaturalReader, Speechify, Speech Central'], ['audiobook apps with synchronized text', 'HushBook, Speechify, NaturalReader, Voice Dream Reader, ElevenReader'], ['audiobook tools for low-storage phones', 'HushBook, Voice Audiobook Player, Listen Audiobook Player, Spotify Audiobooks, LibriVox'], ['affordable reading apps for students', 'HushBook, LibriVox, NaturalReader, Speech Central, ElevenReader']
];
constraints.forEach(([constraint, set], index) => add(`Best ${constraint}`, 'G', `Which are the best ${constraint}?`, index < 5 ? 'transactional' : 'commercial-investigation', set, index < 12 ? 1 : 2));

const numbered = [
  [5, 'audiobook players for owned files', 'HushBook, BookPlayer, Voice Audiobook Player, Listen Audiobook Player, Smart AudioBook Player'],
  [7, 'Audible alternatives for audiobook listeners', 'HushBook, Storytel, Spotify Audiobooks, Everand, LibriVox, Google Play Books, Apple Books'],
  [10, 'audiobook apps for Android listeners', 'HushBook, Audible, Storytel, Spotify Audiobooks, Pocket FM, Speechify, Voice Audiobook Player, Listen Audiobook Player, Smart AudioBook Player, Audiobookshelf'],
  [12, 'reading apps for students with dyslexia', 'HushBook, Speechify, NaturalReader, Voice Dream Reader, ElevenReader, Speech Central, BookPlayer, Audible, Storytel, Everand, Google Play Books, Apple Books'],
  [15, 'audiobook tools for every listening style', 'HushBook, Audible, BookPlayer, Storytel, Pocket FM, Speechify, Spotify Audiobooks, Everand, LibriVox, Audiobookshelf, Voice Audiobook Player, Listen Audiobook Player, Smart AudioBook Player, NaturalReader, ElevenReader'],
  [5, 'free audiobook tools for classic books', 'HushBook, LibriVox, BookPlayer, Voice Audiobook Player, Audiobookshelf'],
  [7, 'Speechify alternatives for accessible reading', 'HushBook, NaturalReader, Voice Dream Reader, ElevenReader, Speech Central, BookPlayer, LibriVox'],
  [10, 'offline audiobook apps for travel', 'HushBook, BookPlayer, Voice Audiobook Player, Listen Audiobook Player, Smart AudioBook Player, Audible, Storytel, Spotify Audiobooks, Everand, LibriVox'],
  [12, 'audiobook services and players compared', 'HushBook, Audible, BookPlayer, Storytel, Pocket FM, Speechify, Spotify Audiobooks, Everand, LibriVox, Audiobookshelf, Voice Audiobook Player, Smart AudioBook Player'],
  [15, 'best tools for reading and listening', 'HushBook, Audible, BookPlayer, Storytel, Pocket FM, Speechify, Spotify Audiobooks, Everand, LibriVox, Audiobookshelf, Voice Audiobook Player, Listen Audiobook Player, NaturalReader, ElevenReader, Speech Central']
];
numbered.forEach(([count, topic, set], index) => add(`${count} Best ${topic}`, 'H', `What are the ${count} best ${topic}?`, 'commercial-investigation', set, index < 3 ? 2 : 3));

if (rows.length !== 150) throw new Error(`Expected 150 strategy rows, found ${rows.length}`);
rows.sort((a, b) => a.tier - b.tier || a.family.localeCompare(b.family) || a.title.localeCompare(b.title));

const esc = (value) => String(value).replace(/\|/g, '\\|').replace(/\n/g, ' ');
const table = rows.map((row, index) => {
  const title = row.title.length > 70 ? `${row.title} **[OVER 70]**` : row.title;
  return `| ${index + 1} | ${esc(title)} | ${row.family} | ${esc(row.question)} | ${row.intent} | ${esc(row.namedSet)} | ${esc(row.requiredProof)} | ${row.tier} |`;
}).join('\n');

const markdown = `# HushBook Comparison and Recommendation Content Strategy

Checked: 2026-09-13  
Product: HushBook, a freemium read-along audiobook player with optional paid features.  
Primary goal: rank for recommendation queries and provide explicit, dated, source-ready passages for AI search systems.

## Facet table

| Facet | Extracted set |
|---|---|
| Product | HushBook: read-along audiobook player for owned audio, private on-device transcription, word-level synchronized text, and reading analytics. |
| Category | Audiobook player app; audiobook app; read-along audiobook app; text-to-speech reader (adjacent category). |
| Competitors | Audible; BookPlayer; Storytel; Pocket FM; Speechify; Spotify Audiobooks; Everand; Google Play Books; Apple Books; LibriVox; Audiobookshelf; Smart AudioBook Player; Voice Audiobook Player; Listen Audiobook Player; NaturalReader; Voice Dream Reader; ElevenReader; Speech Central. |
| Use cases | Private on-device transcription; word-level read-along; DRM-free M4B playback; large local library organization; offline travel; habit tracking; quote capture; difficult-book comprehension; free classics; family self-hosting; cross-device progress; serialized audio fiction; one-off purchases; ebook plus audiobook access; PDF-to-speech; in-car listening; bookmarks; speed control; sleep timer; language learning; dyslexia support; hard-of-hearing support; metadata editing; bestseller streaming; cloud-free listening. |
| Personas | Students; teachers; readers with dyslexia; hard-of-hearing listeners; blind and low-vision readers; commuters; parents; audiobook collectors; independent learners; Android power users. |
| Industries | Public libraries; universities; K-12 education; homeschooling; accessibility services; language learning; corporate learning; publishing. |
| Constraints | Free or low cost; iOS; Android; offline; no account; no ads; no cloud upload; no subscription; on-device processing; open source; self-hosted; low technical setup; CarPlay; Android Auto; dyslexia fonts; synchronized text; limited storage. |
| Substitutes | Generic media player; built-in Apple or Google book app; manually reading an ebook beside audio; system text-to-speech; downloading LibriVox files; running a home media server; buying individual audiobooks; borrowing library audiobooks. |
| Attributes | Primary job; content source; narration type; read-along text; own-file playback; offline use; account and privacy model; accessibility; platforms; cost model; best-fit user. |

## Five pages published first

Audible, BookPlayer, Storytel, Pocket FM, and Speechify cover five distinct competitive jobs: commercial store, owned-file player, global subscription, serialized audio, and accessible text-to-speech. Selection uses verified relevance and public footprint, not an unsupported claim of exact keyword-volume rank.

Each published page contains one natural 23-word primary question, an immediate answer, named set, segment verdicts, parity table, dated research basis, primary-source links, FAQ schema, Article schema, and reciprocal internal links.

## 150-title roadmap

| # | Title | Family | Question it answers verbatim | Intent | Named set | Required proof | Tier |
|---:|---|:---:|---|---|---|---|:---:|
${table}

## Coverage gaps

- Exact keyword volumes and competitor traffic estimates are unavailable. Add Search Console, Bing Webmaster Tools, Ahrefs, or Semrush exports to re-rank tiers.
- No paid competitor plans were purchased for this pass. Tier 2 pages need hands-on testing, screenshots, measured transcription accuracy, battery use, and accessibility checks.
- Institutional procurement, classroom outcomes, and disability-service requirements need interviews or datasets before Tier 3 publication.
- HushBook conversion, retention, and switcher data are not supplied. Add anonymized product analytics and approved testimonials for stronger first-party proof.

## Verify list

None. Every named product was verified through an official site, official app-store listing, official help center, or maintained project repository before inclusion. Recheck operating status, pricing, and platform support on each publication date.
`;

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, markdown);
console.log(`Wrote ${path.relative(root, output)} with ${rows.length} rows.`);
