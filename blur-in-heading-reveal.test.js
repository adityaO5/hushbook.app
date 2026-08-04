const assert = require('node:assert/strict');
const fs = require('node:fs');

const page = fs.readFileSync('index.html', 'utf8');

assert.match(page, /reveal-char/, 'heading characters must receive a reveal class');
assert.match(page, /aria-label/, 'split headings must retain an accessible name');
assert.match(page, /reveal-word/, 'each word must stay grouped so headings do not break mid-word');
assert.match(page, /aria-hidden/, 'generated character spans must be hidden from assistive technology');
assert.match(page, /querySelectorAll\('\[data-char-reveal\]'\)/, 'revealed containers must activate nested animated headings');
assert.match(page, /h1,\s*h2,\s*h3/, 'all heading levels must be selected');
assert.match(page, /\.life-head h2\{[^}]*color:var\(--gold-hi\)/, 'reading-life heading must use stable visible text color');
assert.match(page, /\.reveal-char\{[^}]*filter:blur\(/, 'characters must start blurred');
assert.match(page, /\.reveal-char\.in\{[^}]*filter:none/, 'characters must finish sharp');
assert.match(page, /@media \(prefers-reduced-motion:reduce\)[\s\S]*\.reveal-char/, 'reduced motion must show characters without animation');

console.log('Blur-in heading reveal contract passes.');
