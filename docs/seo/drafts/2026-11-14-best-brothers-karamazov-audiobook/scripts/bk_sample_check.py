"""Which translation does each Audible sample read? Audible sample check for The Brothers Karamazov.

Copied 2026-11-14 from ../../2026-11-13-best-jane-eyre-audiobook/scripts/je_sample_check.py (parents: WH wh_sample_voice.py,
W&P wp_sample_transcribe.py) and merged with the method of
../../2026-11-11-best-crime-and-punishment-audiobook/scripts/garnett_match.py (6-word shingle overlap with Garnett's text).
Changes: reference text is Gutenberg #28054 (Constance Garnett); the pitch measure is dropped (not needed);
each transcript is also scored against the first sentence of nine translations as printed on
welovetranslations.com "What's the best translation of The Brothers Karamazov?" (read 2026-11-14; 4-word shingles),
so a sample that opens on Book I, Chapter 1 can be told apart even when it is not Garnett.

For each sample MP3 (Audible `sample_url`, saved in its own folder): transcribe the first N seconds with
faster-whisper (large-v3-turbo, CPU int8, VAD, beam 1), print each segment, the share of the transcript's
6-word shingles found in Garnett's text, and the best-matching first sentence.

Usage: python -I bk_sample_check.py <samples_dir> <pg28054.txt> <out.txt> [seconds] [threads] [name-filter]
Run 2026-11-14 for research-platforms.md section 1c.
"""
import os
import re
import sys

from faster_whisper import WhisperModel

samples, pg, out = sys.argv[1], sys.argv[2], sys.argv[3]
seconds = float(sys.argv[4]) if len(sys.argv) > 4 else 150.0
threads = int(sys.argv[5]) if len(sys.argv) > 5 else 8
only = sys.argv[6] if len(sys.argv) > 6 else ""

# First sentences as printed by welovetranslations.com (2026-11-14). Kept verbatim, typos included.
FIRST = {
    "Garnett": "Alexey Fyodorovich Karamazov was the third son of Fyodor Pavlovich Karamazov, a landowner well known in our district in his own day, and still remembered among us owing to his gloomy and tragic death, which happened thirteen years ago, and which I shall describe in its proper place.",
    "Garnett/Matlaw (revised)": "Alexey Fyodorovich Karamazov was the third son of Fyodor Pavlovich Karamazov, a landowner well known in our district in his own day (and still remembered among us) owing to his tragic and obscure death, which happened exactly thirteen years ago, and which I shall describe in its proper place.",
    "Magarshack": "Alexey Fyodorovich Marakazov was the third son of Fyodor Pavlovich Karamazov, a landowner of our district, who became notorious in his own day (and is still remembered among us) because of his tragic and mysterious death, which occurred exactly thirteen years ago and which I shall relate in its proper place.",
    "MacAndrew": "Alexei Fyodorovich Karamazov, a landowner in our district who became a celebrity (and is remembered to this day) because of the tragic and mysterious end he met exactly thirteen years ago, which will be described in its proper place.",
    "Katzer": "Alexei Fyodorovich Karamazov was the third son of Fyodor Pavlovich Karamazov, a landowner in our uyezd, a man who once acquired some notoriety (and is still remembered in our parts) because of his tragic and mysterious death, which took place exactly thirteen years ago and will be dealt with here in due course.",
    "Pevear & Volokhonsky": "Alexei Fyodorovich Karamazov was the third son of a landowner from our district, Fyodor Pavlovich Karamazov, well known in his own day (and still remembered among us) because of his dark and tragic death, which happened exactly thirteen years ago and which I shall speak of in its proper place.",
    "McDuff": "Aleksey Fyodorovich Karamazov was the third son of a landowner in our district, Fyodor Pavlovich Karamazov, so noted in his time (and even now still recollected among us) for his tragic and fishy death, which occurred just thirteen years ago and which I shall report in its proper context.",
    "Avsey": "Aleksei Fyodorovich Karamazov was the third son of Fyodor Pavlovich Karamazov, a landowner of our district, extremely well known in his time (and to this day still remembered in these parts) on account of his violent and mysterious death exactly thirteen years ago, the circumstances of which I shall relate in due course.",
    "Katz": "Aleksey Fyodorovich Karamazov was the third son of a landowner Ain our district, Fyodor Pavlovich Karamazov, so well known in his own time (and still remembered among us) for his dark and tragic demise, which occurred exactly thirteen years ago, and which I'll tell you about at the proper time.",
}
N = 6


def words(s):
    s = s.replace("’", "'").replace("'", "")
    return re.findall(r"[a-z]+", s.lower())


def shingles(ws, n=N):
    return {" ".join(ws[i:i + n]) for i in range(len(ws) - n + 1)}


ref = shingles(words(open(pg, encoding="utf-8").read()))
first = {k: shingles(words(v), 4) for k, v in FIRST.items()}
model = WhisperModel("mobiuslabsgmbh/faster-whisper-large-v3-turbo", device="cpu", compute_type="int8", cpu_threads=threads)

with open(out, "a", encoding="utf-8") as fh:
    for name in sorted(os.listdir(samples)):
        if not name.endswith(".mp3") or (only and only not in name):
            continue
        path = os.path.join(samples, name)
        segs, info = model.transcribe(path, language="en", clip_timestamps=[0, seconds], vad_filter=True, beam_size=1)
        segs = list(segs)
        text = " ".join(s.text.strip() for s in segs)
        ws = words(text)
        sh = shingles(ws)
        score = len(sh & ref) / len(sh) if sh else 0.0
        sh4 = shingles(ws, 4)
        fm = sorted(((len(sh4 & v) / len(v), k) for k, v in first.items()), reverse=True)[:3]
        fh.write(f"===== {name} [{info.duration:.0f}s sample, first {seconds:.0f}s] Garnett 6-word overlap {score:.1%} ({len(sh)} shingles) | "
                 f"first-sentence match: " + ", ".join(f"{k} {v:.0%}" for v, k in fm) + "\n")
        for s in segs:
            fh.write(f"  {s.start:6.1f}-{s.end:6.1f}s  {s.text.strip()[:140]}\n")
        fh.flush()
        print(name, f"{score:.1%}", fm[0], flush=True)
