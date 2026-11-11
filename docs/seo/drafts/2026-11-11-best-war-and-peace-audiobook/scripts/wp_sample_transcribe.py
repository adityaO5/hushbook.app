"""Transcribe the first N seconds of each audiobook sample MP3.

Same engine and settings as
../../2026-11-11-best-crime-and-punishment-audiobook/scripts/sample_opening.py
(faster-whisper large-v3-turbo, CPU int8, VAD, beam 1), but writes UTF-8 to a
file so the matcher does not depend on the console code page.

Usage: python -I wp_sample_transcribe.py <samples_dir> <out.txt> [seconds] [cpu_threads]
Run 2026-11-11 for research-platforms.md section 1 (three processes in
parallel on disjoint sample folders, 180 s each, 4 threads each).
"""
import os
import sys

from faster_whisper import WhisperModel

samples, out = sys.argv[1], sys.argv[2]
seconds = float(sys.argv[3]) if len(sys.argv) > 3 else 300.0
threads = int(sys.argv[4]) if len(sys.argv) > 4 else 4

# CPU: the CUDA build on this machine lacks cublas64_12.dll.
model = WhisperModel("mobiuslabsgmbh/faster-whisper-large-v3-turbo", device="cpu", compute_type="int8", cpu_threads=threads)

with open(out, "a", encoding="utf-8") as fh:
    for name in sorted(os.listdir(samples)):
        if not name.endswith(".mp3"):
            continue
        segs, info = model.transcribe(
            os.path.join(samples, name),
            language="en",
            clip_timestamps=[0, seconds],
            vad_filter=True,
            beam_size=1,
        )
        text = " ".join(s.text.strip() for s in segs)
        fh.write(f"===== {name} [{info.duration:.0f}s]\n{text}\n")
        fh.flush()
        print(name, len(text.split()), "words", flush=True)
