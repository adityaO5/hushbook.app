import fs from 'node:fs';
const prio = (f) => ({ '64Kbps MP3': 3, '128Kbps MP3': 2, 'VBR MP3': 1 }[f] || 0);
for (const id of process.argv.slice(2)) {
  const j = JSON.parse(fs.readFileSync(`lv/${id}.meta.json`));
  const mp3 = j.files.filter((f) => (f.name || '').toLowerCase().endsWith('.mp3') && (f.format || '').toLowerCase().includes('mp3'));
  const stems = new Map();
  for (const f of mp3) { const s = f.name.toLowerCase().replace(/(_(64|128)kb|_vbr)?\.mp3$/, ''); if (!stems.has(s)) stems.set(s, []); stems.get(s).push(f); }
  const tracked = [], untracked = [];
  for (const v of stems.values()) {
    let c = v[0]; for (const f of v.slice(1)) if (prio(f.format) > prio(c.format)) c = f;
    let t = null; for (const f of v) { const m = String(f.track ?? '').match(/\d+/); if (m) { t = +m[0]; break; } }
    const artist = c.artist ?? v.find((f) => f.artist)?.artist ?? null;
    const title = c.title ?? v.find((f) => f.title)?.title;
    (t != null ? tracked : untracked).push({ t, name: c.name, title, artist, len: c.length });
  }
  tracked.sort((a, b) => a.t - b.t || a.name.localeCompare(b.name)); untracked.sort((a, b) => a.name.localeCompare(b.name));
  const all = [...tracked, ...untracked];
  let inOrder = true; for (let i = 1; i < tracked.length; i++) if (tracked[i].name < tracked[i - 1].name) inOrder = false;
  console.log(id, '| chapters', all.length, '| tracked', tracked.length, 'untracked', untracked.length, '| file-name order preserved:', inOrder, '| artists:', [...new Set(all.map((x) => x.artist))].join(';'));
  console.log('   first 3:', all.slice(0, 3).map((x) => x.title).join(' | '), '| last 2:', all.slice(-2).map((x) => x.title).join(' | '));
}
