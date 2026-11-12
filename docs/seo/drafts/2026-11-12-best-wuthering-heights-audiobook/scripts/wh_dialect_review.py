"""Print every dialect-dense quoted span in Gutenberg #768 with the narration around it,
so a person can label the speaker (the labels live in wh-wordcount.py LABELS).
Usage: python -I wh_dialect_review.py <wh-wordcount.py> <pg768.txt> > review.txt
Run 2026-11-12 for research-platforms.md section 3a."""
import re, sys, importlib.util
sys.stdout.reconfigure(encoding="utf-8")
spec = importlib.util.spec_from_file_location("wc", sys.argv[1]); wc = importlib.util.module_from_spec(spec); spec.loader.exec_module(wc)
text = open(sys.argv[2], encoding="utf-8").read()
s = re.search(r"^\*\*\* ?START.*$", text, re.M).end(); e = re.search(r"^\*\*\* ?END.*$", text, re.M).start()
body = text[s:e]; novel = body[re.search(r"^CHAPTER I\s*$", body, re.M).start():]
ch = 0; prev = ""
for p in re.split(r"\n\s*\n", novel):
    if wc.CHAPTER_HEAD.match(p.strip()): ch += 1; prev = ""; continue
    flat = " ".join(p.split())
    if not flat: continue
    for sp in wc.quote_spans(flat):
        outer = isinstance(sp, tuple); t = sp[1] if outer else sp
        toks, hits = wc.dialect_tokens(t)
        if len(toks) < 2 or len(hits) < 2 or len(hits)/len(toks) < 0.08: continue
        narr = re.sub(r"“[^“”]*(?:”|$)", " … ", flat)
        print(f"[{ch}] {len(toks)}w d={len(hits)/len(toks):.2f} | {t[:70]}\n      NARR: {narr[:200]}\n      PREV: {prev[-160:]}")
    prev = flat
