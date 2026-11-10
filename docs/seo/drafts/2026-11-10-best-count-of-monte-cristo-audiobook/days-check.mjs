// Arithmetic behind every computed number in post.md. Run: node days-check.mjs
// Inputs come from research-evidence.md (runtimes as each page prints them).

const runtimes = [
  // [label, minutes, source]
  ['Richard Matthews', 43 * 60 + 18, 'PRH 43 Hours 18 Minutes'],
  ['John Lee', 46 * 60 + 56, 'Audible 46 hrs and 56 mins'],
  ['David Clarke (LibriVox v3)', 54 * 60 + 16 + 11 / 60, 'LibriVox 54:16:11'],
  ['Alan Munro', 57 * 60 + 20, 'Audible 57 hrs and 20 mins'],
];

const speeds = [1, 1.25, 1.5];
const perDay = [30, 60, 90];

console.log('Days to finish = ceil(minutes / speed / minutes per day)');
for (const [label, min, src] of runtimes) {
  for (const s of speeds) {
    const listening = min / s;
    const cells = perDay.map(d => Math.ceil(listening / d - 1e-9));
    console.log(`${label.padEnd(28)} ${String(s).padEnd(5)} listening ${listening.toFixed(2).padStart(8)} min -> ${cells.join(' / ')}   (${src})`);
  }
}

// Table of all 17 unabridged recordings (publisher figure where one exists, else Audible; LibriVox catalog).
const editions = [
  ['John Lee', 46, 56, 0],
  ['Bill Homewood', 52, 41, 0],
  ['B.J. Harrison', 52, 41, 0],
  ['Richard Matthews', 43, 18, 0],
  ['Guy Mott', 55, 37, 0],
  ['David Rintoul', 50, 48, 0],
  ['Teddy Garraway', 48, 37, 0],
  ['Andrew Timothy', 50, 44, 0],
  ['Christopher Tester', 50, 20, 0],
  ['Alan Munro', 57, 20, 0],
  ['Peter Batchelor', 43, 52, 0],
  ['Philippe Duquenoy', 45, 4, 0],
  ['Arthur Lane', 49, 28, 0],
  ['Juliette Martin', 52, 43, 0],
  ['LibriVox v1', 49, 43, 15],
  ['LibriVox v2', 49, 48, 19],
  ['David Clarke (LibriVox v3)', 54, 16, 11],
];
const totalH = editions.reduce((a, [, h, m, s]) => a + h + m / 60 + s / 3600, 0);
console.log(`\nSum of the 17 runtimes: ${totalH.toFixed(1)} hours`);
console.log('Shortest to longest:');
[...editions].sort((a, b) => (a[1] * 3600 + a[2] * 60 + a[3]) - (b[1] * 3600 + b[2] * 60 + b[3]))
  .forEach(([n, h, m, s]) => console.log(`  ${n.padEnd(28)} ${h} h ${m} min${s ? ` ${s} s` : ''}`));

// Words per minute, LibriVox only (same text as Gutenberg #1184).
const words = 461550;
for (const [n, h, m, s] of editions.filter(e => /LibriVox/.test(e[0]))) {
  const mins = h * 60 + m + s / 60;
  console.log(`${n}: ${(words / mins).toFixed(1)} wpm at 461,550 words; ${(459752 / mins).toFixed(1)} at 459,752`);
}

// Naxos abridged share of the unabridged running time (booklets).
const abr = 2 * 3600 + 38 * 60 + 12;
const unabr = 52 * 3600 + 43 * 60 + 38;
console.log(`\nNaxos abridged ${abr} s / unabridged ${unabr} s = ${(100 * abr / unabr).toFixed(1)}%`);

// hoopla 21-day loan, minutes a day to finish John Lee at 1x and 1.5x.
for (const s of [1, 1.5]) {
  const md = 2816 / s / 21;
  console.log(`hoopla 21 days, 46 h 56 min at ${s}x: ${md.toFixed(1)} min a day (${Math.floor(md / 60)} h ${Math.round(md % 60)} min)`);
}

// Patrick Shannon 22 hrs and 1 min listing: words per minute it would need.
console.log(`22 h 1 min would need ${(words / (22 * 60 + 1)).toFixed(0)} wpm`);

// LibriVox v1 readers excluding alternates, and archive.org views ratio.
console.log(`Views v1/v3: ${(7935249 / 2580255).toFixed(2)}x`);
