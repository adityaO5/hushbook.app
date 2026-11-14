"""Turn bk-group.mjs output (groups.md) into the "All phrasings, grouped" section of scout.md:
film group cut to its first 30, Star Wars phrasings removed from the Grand Inquisitor group (listed separately as a count),
"Other on-topic" cut to its first 60. New 2026-11-14 (formatting helper; no counting rules of its own).
Usage: python -I bk-groups-for-scout.py <groups.md> <out.md>
"""
import re
import sys

STAR_WARS = re.compile(r"counter|swgoh|star wars|kenobi|obi wan|rebels|lightsaber|mods\b|tier \d|species|real name|actor|how strong|how tall|how old is|how good|event guide|alive|death|black series|grand inquisitor's name|in star wars|temple guard|hello \(|wow sod|journey guide|vs kanan|grand inquisitor vs|grand inquisitor kenobi|counters|counter narrative|grand inquisitor \(BDFY\)|who is the grand inquisitor \(|grand inquisitor court|grand inquisitor country|lord inquisitor|how did the grand inquisitor survive|who was the grand inquisitor in history|the grand inquisitor's manual")

t = open(sys.argv[1], encoding="utf-8").read()
out = []
for m in re.finditer(r"### (.+?) \((\d+)\)\n\n(.*?)(?=\n\n###|\Z)", t, re.S):
    name, n, body = m.group(1), int(m.group(2)), m.group(3).strip()
    if name.startswith("rel >= 1250") or name.startswith("Read or listen") or name.startswith("Film/TV x"):
        continue
    items = [x for x in body.split("; ") if x]
    if name == "Film and TV":
        out.append(f"**Film and TV ({n}, not answered):** " + "; ".join(items[:30]) + f"; … ({n - 30} more)")
    elif name.startswith("Grand Inquisitor"):
        keep = [x for x in items if not STAR_WARS.search(x)]
        drop = len(items) - len(keep)
        out.append(f"**Grand Inquisitor / Rebellion / Book V ({len(keep)} about the novel; {drop} Star Wars and other noise removed by hand):** " + "; ".join(keep))
    elif name.startswith("Other on-topic"):
        out.append(f"**Other on-topic ({n}; first 60 shown, the rest are theme, summary, genre and review phrasings):** " + "; ".join(items[:60]))
    elif name.startswith("Plot and spoilers"):
        out.append(f"**Plot and spoilers ({n}; the \"no spoilers\" ones are answered by the names table, the rest are not answered):** " + "; ".join(items))
    else:
        out.append(f"**{name} ({n}):** " + "; ".join(items))
open(sys.argv[2], "w", encoding="utf-8").write("\n\n".join(out) + "\n")
print(len(out), "groups written")
