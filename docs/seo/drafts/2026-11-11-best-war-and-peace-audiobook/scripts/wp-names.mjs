// Name forms and French in the Maude translation (Project Gutenberg eBook #2600), body text only
// (between the START and END markers). Counts are whole-word, case-sensitive, accents as printed.
// node wp-names.mjs <pg2600.txt>
import fs from 'node:fs';
const raw = fs.readFileSync(process.argv[2], 'utf8');
const body = raw.slice(raw.indexOf('*** START OF'), raw.indexOf('*** END OF'));
const words = body.split(/\s+/).filter((w) => /\p{L}/u.test(w)).length;
const count = (re) => (body.match(re) || []).length;
const forms = {
  Pierre: ['Pierre', 'Monsieur Pierre', 'Peter Kirílovich', 'Count Bezúkhov', 'Bezúkhov', 'Pétya'],
  Natasha: ['Natásha', 'Natálya Ilyínichna', 'Countess Bezúkhova'],
  'Prince Andrew': ['Prince Andrew', 'Andrew', 'Bolkónski', 'André', 'Andréy'],
  'Nicholas Rostov': ['Nicholas', 'Nikólenka', 'Nicholas Rostóv', 'Rostóv', 'Count Rostóv'],
  'Princess Mary': ['Princess Mary', 'Mary', 'Másha', 'Marie'],
  Sonya: ['Sónya', 'Sophie'],
  Hélène: ['Hélène', 'Ellen', 'Countess Bezúkhova'],
  'Anna Pávlovna': ['Anna Pávlovna', 'Annette', 'Schérer'],
  Kutúzov: ['Kutúzov'],
  Napoleon: ['Napoleon', 'Bonaparte', 'Buonaparte'],
};
console.log(`Body words (letter-bearing tokens): ${words}`);
for (const [who, fs_] of Object.entries(forms)) console.log(`${who}: ` + fs_.map((f) => `${f} ${count(new RegExp(`(?<![\\p{L}])${f}(?![\\p{L}])`, 'gu'))}`).join(', '));
// French markers: lines containing common French function words that do not occur in English prose.
const FR = /\b(mon cher|ma chère|mon ami|ma bonne|mon prince|mon Dieu|c'est|n'est|Eh bien|je |vous |nous |avec|chère|très|qu'il|pas de|ce que|il y a)\b/;
const lines = body.split(/\r?\n/);
const frLines = lines.filter((l) => FR.test(l)).length;
console.log(`Lines with French markers: ${frLines} of ${lines.filter((l) => l.trim()).length} non-empty lines`);
const chapters = count(/^CHAPTER [IVXLC]+/gm);
const books = count(/^BOOK [A-Z]+/gm);
console.log(`Chapters: ${chapters}, BOOK headings: ${books}, epilogue headings: ${count(/^(FIRST|SECOND) EPILOGUE/gm)}`);
