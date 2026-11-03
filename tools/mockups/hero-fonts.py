"""Subset the fonts of the hero's live read-along (assets/js/hero-read-along.js).

    python -I tools/mockups/hero-fonts.py

Writes WOFF files into assets/fonts/ (hra-*.woff). The reader's Newsreader is pinned to
opsz 18 (the reader sets "opsz" 18 everywhere) and keeps wght 400..700 (text 400, drop cap
and Aa 450, head 500, numeral 700). The latin file is what English pages download; the
latin-ext file only loads on pages whose text needs it (unicode-range in index.html).
Inter SemiBold is cut to the status bar clock's digits. WOFF2 needs the Python brotli
module; with it installed, switch FLAVOR to 'woff2' and the @font-face formats.
"""
import io
import os

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(ROOT, 'tools', 'mockups', 'assets', 'fonts')
OUT = os.path.join(ROOT, 'assets', 'fonts')
FLAVOR = 'woff'

# Google Fonts' latin and latin-ext ranges (keep in sync with the @font-face rules).
LATIN = ('U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,'
         'U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD')
LATIN_EXT = ('U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,'
             'U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF')
FEATURES = ['kern', 'liga', 'calt', 'case', 'lnum', 'tnum', 'ccmp', 'locl', 'mark', 'mkmk', 'rvrn']


def codepoints(ranges):
    out = []
    for part in ranges.split(','):
        lo, _, hi = part.strip()[2:].partition('-')
        out.extend(range(int(lo, 16), int(hi or lo, 16) + 1))
    return out


def cut(src, dst, unicodes=None, text=None, axes=None, features=FEATURES):
    font = TTFont(os.path.join(SRC, src))
    if axes:
        font = instancer.instantiateVariableFont(font, axes, updateFontNames=False)
        buf = io.BytesIO()
        font.save(buf)  # round-trip: the subsetter trips over the instancer's lazy gvar
        buf.seek(0)
        font = TTFont(buf)
    opts = subset.Options()
    opts.layout_features = features
    opts.flavor = FLAVOR
    opts.hinting = False
    opts.desubroutinize = True
    opts.notdef_outline = True
    opts.name_IDs = [0, 1, 2, 3, 4, 5, 6]
    opts.drop_tables += ['DSIG', 'STAT']
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=unicodes or [], text=text or '')
    sub.subset(font)
    font.flavor = FLAVOR
    path = os.path.join(OUT, dst)
    font.save(path)
    print(dst, os.path.getsize(path), 'bytes')


NEWS = {'opsz': 18, 'wght': (400, 700)}
cut('Newsreader-Variable.ttf', 'hra-newsreader-latin.woff', codepoints(LATIN), axes=NEWS)
cut('Newsreader-Variable.ttf', 'hra-newsreader-latin-ext.woff', codepoints(LATIN_EXT), axes=NEWS)
cut('Inter-SemiBold.ttf', 'hra-inter-600-clock.woff', text='0123456789:', features=['kern', 'tnum'])
