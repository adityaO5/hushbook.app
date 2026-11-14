"""Extra name forms and contexts for the Karamazov names table (loads bk-wordcount.py's parser so chapters match).
New 2026-11-14. Usage: python -I bk-names-extra.py <scripts-dir> <pg28054.txt> <pattern> [<pattern> ...]
For each pattern: whole-word count in the novel text, first chapter, count by book, and the first three contexts."""
import importlib.util, re, sys
sys.stdout.reconfigure(encoding="utf-8")
spec = importlib.util.spec_from_file_location("bkwc", sys.argv[1] + "/bk-wordcount.py")
bkwc = importlib.util.module_from_spec(spec); spec.loader.exec_module(bkwc)
_, _, body = bkwc.load(sys.argv[2])
s = re.search(r"^PART I[ \t]*$", body, re.M); e = re.search(r"^THE END[ \t]*$", body, re.M)
chs = bkwc.chapters_of(body[s.start():e.start()])
for pat in sys.argv[3:]:
    rx = re.compile(r"(?<![\wÀ-ÿ])(?:" + pat.replace(" ", r"\s+") + r")(?![\wÀ-ÿ])")
    total = sum(len(rx.findall(c[5])) for c in chs)
    first = next((f"Book {c[1]} Ch. {c[3]}" for c in chs if rx.search(c[5])), None)
    byb = {}
    for c in chs:
        n = len(rx.findall(c[5]))
        if n: byb[c[1]] = byb.get(c[1], 0) + n
    print(f"\n{pat}: {total} (first {first}) by book {byb}")
    k = 0
    for c in chs:
        for m in rx.finditer(c[5]):
            if k >= 3: break
            print(f"   B{c[1]}C{c[3]}: …" + " ".join(c[5][max(0, m.start()-90):m.end()+70].split()) + "…"); k += 1
