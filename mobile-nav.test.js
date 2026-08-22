const assert = require('node:assert/strict');
const fs = require('node:fs');

const localeScript = fs.readFileSync('assets/js/locale.js', 'utf8');

assert.match(localeScript, /class="locale-label"/, 'language control must expose a compact label wrapper');
assert.match(localeScript, /class="locale-primary"/, 'language control must expose current language separately');
assert.match(localeScript, /class="locale-secondary"/, 'language control must expose secondary language separately');
assert.match(localeScript, /class="locale-short"/, 'language control must expose compact mobile language text');
assert.match(localeScript, /Array\.from\(currentName\)\.slice\(0, 3\)/, 'mobile language text must use first three selected-language characters');
assert.match(localeScript, /aria-label="\$\{currentName\} \/ \$\{secondaryName\}"/, 'language button must retain an accessible full label');
assert.ok(
  localeScript.includes('.nav-inner>.brand{position:static;flex:1 1 auto;min-width:0;justify-content:center;margin:0;transform:none'),
  'mobile nav must keep brand in normal flow instead of overlaying it',
);
assert.ok(
  localeScript.includes('.locale-current{font-size:11px;padding:6px 8px;gap:5px;max-width:76px}'),
  'mobile language pill must have bounded width',
);
assert.ok(
  localeScript.includes('.locale-secondary{display:none}'),
  'mobile language pill must hide secondary label text',
);
assert.ok(
  localeScript.includes('.locale-primary{display:none}') && localeScript.includes('.locale-short{display:inline}'),
  'mobile language pill must show compact label instead of full label',
);

console.log('Mobile navigation overlap contract passes.');
