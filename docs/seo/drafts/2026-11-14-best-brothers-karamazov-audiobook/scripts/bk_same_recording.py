"""Is the Audible "Bruce Peery" (Hexagon Tech) recording the free LibriVox Version 3 by Bruce Pirie?
New 2026-11-14 (research-platforms.md section 2c). Timing test: transcribe the opening of both with faster-whisper
word timestamps (large-v3-turbo, CPU int8, the settings of bk_sample_check.py), find the same anchor phrases in both
(each one starts a sentence of Garnett's Book I, Chapter 1), and compare the gaps between anchors. Two readings by
different people, or two takes, drift by seconds over two minutes; the same recording keeps every gap within a few
tenths of a second (word timestamps are approximate), even when the start offset differs (LibriVox opens with a spoken notice).

Usage: python -I bk_same_recording.py <clip A.mp3> <clip B.mp3> [seconds] [threads]
"""
import re
import sys

from faster_whisper import WhisperModel

ANCHORS = ["alexey fyodorovitch karamazov was", "for the present i will", "but he was one of", "he ran to dine",
           "at the same time he", "i repeat it was", "he was married twice", "how it came to pass",
           "i knew a young lady"]


def norm(w):
    return re.sub(r"[^a-z]", "", w.lower().replace("’", "'"))


def anchor_times(path, model, seconds):
    segs, _ = model.transcribe(path, language="en", clip_timestamps=[0, seconds], vad_filter=True, beam_size=1,
                               word_timestamps=True)
    words = [(norm(w.word), w.start) for s in segs for w in (s.words or []) if norm(w.word)]
    seq = [w for w, _ in words]
    out = {}
    for a in ANCHORS:
        toks = [norm(t) for t in a.split()]
        for i in range(len(seq) - len(toks) + 1):
            # allow the transcriber's "alexei/alexey" and "pavlovich/pavlovitch" variants on the first token
            if all(seq[i + k] == toks[k] or (k == 0 and seq[i][:4] == toks[0][:4]) or (k > 0 and seq[i + k][:5] == toks[k][:5]) for k in range(len(toks))):
                out[a] = words[i][1]
                break
    return out


def main(a, b, seconds, threads):
    sys.stdout.reconfigure(encoding="utf-8")
    model = WhisperModel("mobiuslabsgmbh/faster-whisper-large-v3-turbo", device="cpu", compute_type="int8", cpu_threads=threads)
    ta, tb = anchor_times(a, model, seconds), anchor_times(b, model, seconds)
    common = [x for x in ANCHORS if x in ta and x in tb]
    print("anchors found in both:", len(common), "of", len(ANCHORS))
    if len(common) < 2:
        return
    a0, b0 = ta[common[0]], tb[common[0]]
    print(f"offset of first anchor: A {a0:.2f}s, B {b0:.2f}s (B - A = {b0 - a0:+.2f}s)")
    worst = 0.0
    for x in common:
        ga, gb = ta[x] - a0, tb[x] - b0
        worst = max(worst, abs(ga - gb))
        print(f"  {x!r:40} A +{ga:7.2f}s  B +{gb:7.2f}s  diff {gb - ga:+.2f}s")
    span = ta[common[-1]] - a0
    print(f"largest gap difference over {span:.0f}s: {worst:.2f}s")


if __name__ == "__main__":
    seconds = float(sys.argv[3]) if len(sys.argv) > 3 else 180.0
    threads = int(sys.argv[4]) if len(sys.argv) > 4 else 8
    main(sys.argv[1], sys.argv[2], seconds, threads)
