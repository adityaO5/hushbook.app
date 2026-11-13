"""How much of Jane Eyre is in French, where, and who speaks it (for "jane eyre french translations", rel 1250).

New 2026-11-13. Loads je-wordcount.py (same folder) for the chapter extraction and word rule, so the French
share is a share of the same 186,145 words.

Method: quoted speech is cut into sentences at . ; : ! ? and dashes; narration into clauses at . , ; : ! ? — ( ).
The apostrophe is never a cut point (the text writes elisions with ’: “C’est”). A unit is French when
it has at least two tokens from the French word list below that are not also common English words, or one such
token plus a French elision (c', n', qu', l', d', j', s', m', t') or a word with a French accent, and at least
half its tokens are French-looking (in the list, accented, elided, or ending -ez/-ais/-ait/-ons). Single French
forms of address used inside an English clause ("Mademoiselle Adela", "Monsieur") are not counted. Adjacent
French units in a paragraph are joined into one passage. Every passage is printed with its chapter and the
start of its paragraph so a person can check it and label the speaker (`--review`).

Usage: python -I je-french.py <pg1260.txt> [--review]
"""
import importlib.util
import os
import re
import sys
from collections import Counter, defaultdict

here = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("jewc", os.path.join(here, "je-wordcount.py"))
jewc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(jewc)

FR = set("""
le la les l un une des du de d au aux et ou où mais donc car ni que qu qui quoi quel quelle quels quelles dont
je j me m moi tu te t toi il elle on nous vous ils elles se s lui leur leurs eux y en ce c cet cette ces ça cela
mon ma mes ton ta tes son sa ses notre nos votre vos
suis es est sommes êtes sont étais était étions étiez étaient serai sera serons serez seront serais serait été être
ai as a avons avez ont avais avait avions aviez avaient aurai aura aurez aurais aurait eu avoir
fais fait faites font faire faisait dit dis dites dire va vais vas allons allez vont aller allé allée viens vient venez
venir venu peux peut pouvez pouvons pu pouvoir veux veut voulez voulons voudrais voulais vouloir sais sait savez savoir
vois voit voyez voir vu prends prend prenez donne donnez donner regardez regarde mettre mets met
oui non si pas ne n plus jamais rien toujours encore déjà aussi très trop bien mal peu beaucoup assez tout tous
toute toutes même autre autres ici là voici voilà maintenant alors puis après avant avec sans pour par sur sous dans
chez vers entre comme quand parce combien comment pourquoi
monsieur madame mademoiselle mesdames messieurs mère maman papa père fille enfant ami amie amis chère cher chéri
bonne bon bonté bonjour bonsoir adieu merci pardon mille fois bientôt demain hier aujourd soir matin jour nuit heure heures
petit petite petits petites jolie joli jolies belle beau beaux grand grande cadeau cadeaux robe toilette rose chose choses
vrai vraiment heureux heureuse content contente gentille gentil seule seul tant chanter chanson danser jouer mon dieu
remercie revenez parlé parler parlez cinq six deux trois quatre premier première enfin tenez attendez écoutez
boîte ciel cela grande croquant ange porte cochère taille athlète voiture tant pis gardez seulement completer compléter donc dit
ligue fontaine dedans fées fée contes menteur reste dommage fleurs magnifiques puis prendre seule mange mangé faim
servies mesdames gouvernante chambre chambres salon dames femmes coiffer habiller amusant apprend suivais regardais
croquer anglaise prête noble théâtre passées naïve feuille cerises vos joues sont rouges souliers bas danser robe va
boite ciel ange gardez-vous règle parenthèse signifier personne mince pâle demandé nom coffre maman faisait monde sera mal vrai
doigts tremblent joues rouges cerises comme qu'avez avez-vous n'est-ce c'est j'ai qu'il qu'elle d'un d'une l'on s'il
""".split())
# French words that are also common English words: they count as French-looking but do not trigger a clause.
EN_ALSO = set("a as on son me ma pas car rose robe dire pour plus en si ton sans tant fils mine fine are pain lit sale".split())
ELISION = re.compile(r"^(?:c|n|qu|l|d|j|s|m|t)[’']\w", re.I)
ACCENT = re.compile(r"[àâäçéèêëîïôöûùüœ]", re.I)
CLAUSE_SPLIT = re.compile(r"(?<=[.,;:!?()])\s+|\s*[—()]\s*")
SENT_SPLIT = re.compile(r"(?<=[.;:!?])\s+|\s*—\s*")
TOKEN = re.compile(r"[A-Za-zÀ-ÿœŒ][A-Za-zÀ-ÿœŒ’'\-]*")
ADDRESS_ONLY = {"monsieur", "madame", "mademoiselle", "mdlle", "messieurs"}


def norm(t):
    return t.lower().replace("’", "'").strip("'-")


def frenchy(t):
    n = norm(t)
    base = n.split("'")[-1] if ELISION.match(n) else n
    return n in FR or base in FR or bool(ACCENT.search(n)) or bool(ELISION.match(n)) or bool(re.search(r"(ez|ais|ait|ons)$", n) and len(n) > 4 and n not in {"reasons", "persons", "seasons", "lessons", "wait", "await", "sometimes"})


def strong(t):
    n = norm(t)
    base = n.split("'")[-1] if ELISION.match(n) else n
    if n in EN_ALSO:
        return False
    return (n in FR or base in FR or bool(ELISION.match(n)) or bool(ACCENT.search(n))) and n not in ADDRESS_ONLY


def is_french(tokens):
    if not tokens:
        return False
    s = sum(1 for t in tokens if strong(t))
    f = sum(1 for t in tokens if frenchy(t))
    if all(norm(t) in ADDRESS_ONLY for t in tokens):
        return len(tokens) >= 1 and False
    return s >= 2 and f / len(tokens) >= 0.5 or (s >= 1 and len(tokens) <= 3 and f == len(tokens) and not all(norm(t) in ADDRESS_ONLY for t in tokens))


def main(path, review):
    sys.stdout.reconfigure(encoding="utf-8")
    _, _, body = jewc.load(path)
    _, chapters = jewc.chapters_of(body)
    total_words = sum(len(jewc.words(s)) for _, s in chapters)
    passages = []
    for n, s in chapters:
        for p in re.split(r"\n\s*\n", s):
            p = " ".join(p.split())
            if not p:
                continue
            # quoted speech: judge sentence by sentence (a sentence may run across commas); narration: clause by clause
            pieces = re.split(r"(“[^”]*(?:”|$))", p)
            for piece in pieces:
                if not piece.strip():
                    continue
                quoted = piece.startswith("“")
                unit_split = SENT_SPLIT if quoted else CLAUSE_SPLIT
                units = [x for x in unit_split.split(piece.strip("“”")) if x and x.strip()]
                run = []
                for u in units:
                    toks = TOKEN.findall(u)
                    if is_french(toks) or (run and toks and all(frenchy(t) for t in toks)):
                        run.append(u)
                    else:
                        if run:
                            passages.append((n, " ".join(run), p))
                        run = []
                if run:
                    passages.append((n, " ".join(run), p))
    # Words set in italics (_..._ in the Gutenberg file) or in single quotes inside speech (‘voiture’, ‘Mon ange’)
    # that are French: names of things, Rochester's asides.
    heads = list(jewc.CHAPTER_HEAD.finditer(body))
    italic_added = 0
    for i, h in enumerate(heads):
        n = jewc.roman(h.group(1))
        seg = body[h.end():heads[i + 1].start() if i + 1 < len(heads) else len(body)]
        seg = " ".join(seg.split())
        found = " ".join(x for c, x, _ in passages if c == n)
        for m in list(re.finditer(r"_([^_]{1,120})_", seg)) + list(re.finditer(r"‘([^’]{1,60}?)’(?!\w)", seg)):
            span = m.group(1).replace("_", "").strip(" ,.;:!?")
            toks = TOKEN.findall(span)
            if not toks or span in found or any(span in x.replace("_", "") for c, x, _ in passages if c == n):
                continue
            if sum(1 for t in toks if strong(t)) >= 1 and sum(1 for t in toks if frenchy(t)) / len(toks) >= 0.5:
                ctx = seg[max(0, m.start() - 100):m.end() + 60]
                passages.append((n, span, "[italic] " + ctx))
                italic_added += 1
    # A lone name ("Adèle,") is not French text.
    passages = [x for x in passages if norm(x[1].strip(" ,.;:!?")) not in {"adèle", "céline", "adèle varens", "céline varens"}]
    print("italic / single-quoted French spans added:", italic_added)
    # Not French text a listener has to decode: "&c." (et cetera) and English loanwords; one false hit ("content").
    drop = {"&c", "&c.", "content", "tête-à-tête", "naïveté", "naïve", "mesdames", "adèle"}
    def is_noise(x):
        t = re.sub(r"[,.;:!? ]+", " ", x.replace("&c.", " &c ").replace("&c", " &c ")).strip().lower()
        return not t or all(w in drop or w == "&c" for w in t.split()) or norm(x.strip(" ,.;:!?")) in drop
    dropped = [x for x in passages if is_noise(x[1])]
    passages = [x for x in passages if not is_noise(x[1])]
    print("dropped as not French text:", len(dropped), "|", sorted({x[1].strip() for x in dropped}))
    fw = sum(len(jewc.words(x)) for _, x, _ in passages)
    by_ch = Counter()
    for n, x, _ in passages:
        by_ch[n] += len(jewc.words(x))
    print(f"French passages: {len(passages)}; words {fw:,} of {total_words:,} = {fw / total_words:.2%};"
          f" {fw / jewc.SITE_WPM:.1f} min at {jewc.SITE_WPM} wpm")
    print("chapters with French:", len(by_ch), "|", dict(sorted(by_ch.items())))
    top = by_ch.most_common(6)
    print("most French by chapter (words):", top)
    vols = {"I (1-15)": range(1, 16), "II (16-26)": range(16, 27), "III (27-38)": range(27, 39)}
    print("by volume:", {k: sum(v for c, v in by_ch.items() if c in r) for k, r in vols.items()})
    longest = sorted(passages, key=lambda x: -len(jewc.words(x[1])))[:8]
    print("longest passages:")
    for n, x, _ in longest:
        print(f"  Ch. {n}, {len(jewc.words(x))} words: {x[:160]}")
    # Speaker of each passage, labelled by hand from its paragraph (2026-11-13). Narration = Jane's own words.
    LABELS = [
        ("C’est là ma gouvernante", "Adèle"), ("Mais oui, certainement", "Sophie"), ("La Ligue des Rats", "Adèle"),
        ("Qu’avez vous donc", "Adèle (quoting her mother)"), ("Mesdames, vous êtes servies", "Adèle"), ("J’ai bien faim", "Adèle"),
        ("Revenez bientôt", "Adèle"), ("ami, Monsieur Edouard", "Adèle"), ("Et cela doit signifier", "Adèle"),
        ("qu’il y aura là dedans", "Adèle"), ("N’est-ce pas, monsieur, qu’il y a", "Adèle"), ("Ma boite", "Adèle"),
        ("Que c’est beau", "Adèle"), ("Est-ce que ma robe", "Adèle"), ("et mes souliers", "Adèle"), ("je vous remercie mille", "Adèle"),
        ("C’est comme cela que maman", "Adèle"), ("Qu’avez-vous, mademoiselle", "Adèle"), ("Vos doigts tremblent", "Adèle"),
        ("Elles changent", "Adèle"), ("Chez maman", "Adèle"), ("quand il y avait du monde", "Adèle"), ("voilà cinq ou six", "Adèle"),
        ("quel dommage", "Adèle"), ("fleurs magnifiques", "Adèle"), ("Bon jour, mesdames", "Adèle"), ("Voilà Monsieur Rochester", "Adèle"),
        ("qu’elle y sera mal", "Adèle"), ("un vrai menteur", "Adèle"), ("contes de fée", "Adèle"), ("il n’y avait pas de fées", "Adèle"),
        ("passées", "Adèle (her word, in narration)"), ("boite", "Adèle (her word, in narration)"), ("petit coffre", "Adèle (her word, in narration)"),
        ("bonne", "Mrs. Fairfax (Adèle's word)"), ("bon soir", "Sophie"), ("Tant pis", "Lady Ingram"), ("Gardez-vous", "Blanche Ingram"),
        ("Au reste", "Blanche Ingram"), ("la belle passion", "Blanche Ingram"),
        ("taille d’athlète", "Rochester"), ("grande passion", "Rochester"), ("croquant", "Rochester"), ("porte cochère", "Rochester"),
        ("beauté mâle", "Rochester"), ("voiture", "Rochester"), ("Mon ange", "Rochester"), ("et j’y tiens", "Rochester"),
        ("prête à croquer", "Rochester"), ("pour me donner une contenance", "Rochester"), ("Jeune encore", "Rochester"),
        ("en règle", "Jane (narration)"), ("par parenthèse", "Jane (narration)"), ("père noble", "Jane (narration)"),
        ("minois chiffoné", "Jane (narration)"),
    ]
    spk = Counter()
    unl = []
    for n, x, _ in passages:
        lab = next((who for key, who in LABELS if key in x), None)
        if lab is None:
            unl.append((n, x))
            lab = "UNLABELLED"
        spk[lab.split(" (")[0]] += len(jewc.words(x))
    print("words by speaker (hand labels):", dict(spk.most_common()))
    if unl:
        print("unlabelled passages:", unl)
    if review:
        print("\n--- every passage (chapter | words | passage | paragraph start) ---")
        for i, (n, x, p) in enumerate(passages, 1):
            print(f"{i}\tCh{n}\t{len(jewc.words(x))}\t{x}\t|| {p[:200]}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit("usage: python -I je-french.py <pg1260.txt> [--review]")
    main(sys.argv[1], "--review" in sys.argv)
