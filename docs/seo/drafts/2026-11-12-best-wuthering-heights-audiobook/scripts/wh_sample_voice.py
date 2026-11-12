"""Who voices Lockwood, and is it the full text? Audible sample check.

For each sample MP3 (Audible `sample_url`, saved in its own folder): transcribe the first
N seconds with faster-whisper (large-v3-turbo, CPU int8, VAD, beam 1: the settings of
../../2026-11-11-best-war-and-peace-audiobook/scripts/wp_sample_transcribe.py), print each
segment with its median voice pitch (librosa YIN, 60-400 Hz; adult male voices sit roughly
85-180 Hz, female roughly 165-255 Hz), and score the transcript against Project Gutenberg
#768 by 6-word shingle overlap (a verbatim reading of the novel scores high; an
introduction, an adaptation or a paraphrase scores low).

Usage: python -I wh_sample_voice.py <samples_dir> <pg768.txt> <out.txt> [seconds] [threads] [name-filter]
Run 2026-11-12 for research-platforms.md section 1 (two-voice editions).
"""
import os
import re
import sys

import librosa
import numpy as np
from faster_whisper import WhisperModel

samples, pg, out = sys.argv[1], sys.argv[2], sys.argv[3]
seconds = float(sys.argv[4]) if len(sys.argv) > 4 else 240.0
threads = int(sys.argv[5]) if len(sys.argv) > 5 else 8
only = sys.argv[6] if len(sys.argv) > 6 else ""

N = 6


def words(s):
    s = s.replace("’", "'").replace("'", "")
    return re.findall(r"[a-z]+", s.lower())


def shingles(ws):
    return {" ".join(ws[i:i + N]) for i in range(len(ws) - N + 1)}


ref = shingles(words(open(pg, encoding="utf-8").read()))
model = WhisperModel("mobiuslabsgmbh/faster-whisper-large-v3-turbo", device="cpu", compute_type="int8", cpu_threads=threads)

with open(out, "a", encoding="utf-8") as fh:
    for name in sorted(os.listdir(samples)):
        if not name.endswith(".mp3") or (only and only not in name):
            continue
        path = os.path.join(samples, name)
        y, sr = librosa.load(path, sr=16000, mono=True, duration=seconds)
        f0 = librosa.yin(y, fmin=60, fmax=400, sr=sr, frame_length=1024, hop_length=256)
        rms = librosa.feature.rms(y=y, frame_length=1024, hop_length=256)[0]
        n = min(len(f0), len(rms))
        f0, rms = f0[:n], rms[:n]
        voiced = rms > np.percentile(rms, 60)
        times = librosa.frames_to_time(np.arange(n), sr=sr, hop_length=256)
        segs, info = model.transcribe(path, language="en", clip_timestamps=[0, seconds], vad_filter=True, beam_size=1)
        segs = list(segs)
        text = " ".join(s.text.strip() for s in segs)
        sh = shingles(words(text))
        score = len(sh & ref) / len(sh) if sh else 0.0
        fh.write(f"===== {name} [{info.duration:.0f}s sample] Gutenberg 6-word overlap {score:.1%} ({len(sh)} shingles)\n")
        for s in segs:
            m = (times >= s.start) & (times < s.end) & voiced
            hz = float(np.median(f0[m])) if m.any() else float("nan")
            fh.write(f"  {s.start:6.1f}-{s.end:6.1f}s  {hz:5.0f} Hz  {s.text.strip()[:110]}\n")
        fh.flush()
        print(name, f"{score:.1%}", flush=True)
