"""Identify which translation an audiobook sample reads.

Transcribes the first N seconds of each Audible sample MP3 with faster-whisper
and prints the text, plus whether it contains the Garnett opening (Project
Gutenberg #2554) "exceptionally hot evening early in July".

Usage: python -I sample_opening.py <samples_dir> [seconds]
Run 2026-11-11 for research-platforms.md section 1.
"""
import os
import sys

from faster_whisper import WhisperModel

samples = sys.argv[1]
seconds = float(sys.argv[2]) if len(sys.argv) > 2 else 240.0

# CPU: the CUDA build on this machine lacks cublas64_12.dll.
model = WhisperModel("mobiuslabsgmbh/faster-whisper-large-v3-turbo", device="cpu", compute_type="int8")

GARNETT = "exceptionally hot evening early in july"

for name in sorted(os.listdir(samples)):
    if not name.endswith(".mp3"):
        continue
    segs, _ = model.transcribe(
        os.path.join(samples, name),
        language="en",
        clip_timestamps=[0, seconds],
        vad_filter=True,
        beam_size=1,
    )
    text = " ".join(s.text.strip() for s in segs)
    flag = "GARNETT-OPENING" if GARNETT in text.lower().replace(",", "") else "other"
    print(f"===== {name} [{flag}]")
    print(text)
    sys.stdout.flush()
