'use strict';

const fs = require('node:fs');
const path = require('node:path');
const localeConfig = require('../localization.config');

function fix(html) {
  let out = html;

  // Exact multi-byte recoveries first (order matters)
  const map = [
    [/HushBook \uFFFD /g, 'HushBook — '],
    [/ \uFFFD /g, ' — '],
    // où / Où (FFFD is not a word char, so use lookahead)
    [/o\uFFFD(?=[\s"'“”«»'<.,;:!?)\]])/g, 'où'],
    [/O\uFFFD(?=[\s"'“”«»'<.,;:!?)\]])/g, 'Où'],
    [/d'o\uFFFD/g, "d'où"],
    [/D'o\uFFFD/g, "D'où"],
    // ça
    [/\uFFFDa(?=[\s"'“”«»'<.,;:!?)\]])/g, 'ça'],
    [/Comment \uFFFDa/g, 'Comment ça'],
    [/comme \uFFFDa/g, 'comme ça'],
    [/essayer \uFFFDa/g, 'essayer ça'],
    // être / été / était
    [/\uFFFDtre(?=[\s"'<.,;:!?)\]])/g, 'être'],
    [/\uFFFDt\uFFFD(?=[\s"'<.,;:!?)\]])/g, 'été'],
    [/\uFFFDtait/g, 'était'],
    [/Était/g, 'Était'],
    // déjà
    [/D\uFFFDj\uFFFD/g, 'Déjà'],
    [/d\uFFFDj\uFFFD/g, 'déjà'],
    [/D\uFFFDjé/g, 'Déjà'],
    [/Déj\uFFFD/g, 'Déjà'],
    // téléphone family
    [/t\uFFFDl\uFFFDphone/g, 'téléphone'],
    [/T\uFFFDl\uFFFDphone/g, 'Téléphone'],
    [/t\uFFFDl\uFFFDcharg\uFFFD/g, 'téléchargé'],
    [/T\uFFFDl\uFFFDcharg\uFFFD/g, 'Téléchargé'],
    [/t\uFFFDl\uFFFDcharger/g, 'télécharger'],
    [/T\uFFFDl\uFFFDcharger/g, 'Télécharger'],
    [/t\uFFFDl\uFFFDcharg/g, 'télécharg'],
    [/T\uFFFDl\uFFFDcharg/g, 'Télécharg'],
    [/télécharg\uFFFD/g, 'téléchargé'],
    // common words
    [/karaok\uFFFD/g, 'karaoké'],
    [/priv\uFFFD/g, 'privé'],
    [/Priv\uFFFD/g, 'Privé'],
    [/accessibilit\uFFFD/g, 'accessibilité'],
    [/Accessibilit\uFFFD/g, 'Accessibilité'],
    [/confidentialit\uFFFD/g, 'confidentialité'],
    [/Confidentialit\uFFFD/g, 'Confidentialité'],
    [/identialit\uFFFD/g, 'identialité'],
    [/\uFFFDv\uFFFDnements/g, 'événements'],
    [/\uFFFDv\uFFFDnement/g, 'événement'],
    [/\uFFFDtoiles/g, 'étoiles'],
    [/\uFFFDtoile/g, 'étoile'],
    [/\uFFFDvidence/g, 'évidence'],
    [/\uFFFDchec/g, 'échec'],
    [/\uFFFDcartement/g, 'écartement'],
    [/\uFFFDpigramme/g, 'épigramme'],
    [/\uFFFDil(?=[\s"'<.,;:!?)\]])/g, 'œil'],
    [/\uFFFDteignez/g, 'Éteignez'],
    [/\uFFFDteindre/g, 'éteindre'],
    [/\uFFFDchange/g, 'échange'],
    [/instantan\uFFFD/g, 'instantané'],
    [/Instantan\uFFFD/g, 'Instantané'],
    [/int\uFFFDress\uFFFD/g, 'intéressé'],
    [/int\uFFFDress/g, 'intéress'],
    [/intéress\uFFFD/g, 'intéressé'],
    [/\uFFFDcoul\uFFFD/g, 'écoulé'],
    [/parl\uFFFD/g, 'parlé'],
    [/synchronis\uFFFD/g, 'synchronisé'],
    [/concentr\uFFFD/g, 'concentré'],
    [/recommand\uFFFD/g, 'recommandé'],
    [/essay\uFFFD/g, 'essayé'],
    [/not\uFFFD/g, 'noté'],
    [/destin\uFFFD/g, 'destiné'],
    [/int\uFFFDgr\uFFFD/g, 'intégré'],
    [/intégr\uFFFD/g, 'intégré'],
    [/enregistr\uFFFD/g, 'enregistré'],
    [/calcul\uFFFD/g, 'calculé'],
    [/alli\uFFFD/g, 'allié'],
    [/canap\uFFFD/g, 'canapé'],
    [/\uFFFDlev\uFFFD/g, 'élevé'],
    [/capacit\uFFFD/g, 'capacité'],
    [/possibilit\uFFFD/g, 'possibilité'],
    [/sant\uFFFD/g, 'santé'],
    [/perspicacit\uFFFD/g, 'perspicacité'],
    [/arr\uFFFDt\uFFFD/g, 'arrêté'],
    [/arr\uFFFDt/g, 'arrêt'],
    [/arrét\uFFFD/g, 'arrêté'],
    [/transform\uFFFD/g, 'transformé'],
    [/r\uFFFDsum\uFFFD/g, 'résumé'],
    [/num\uFFFDriq/g, 'numériq'],
    [/donn\uFFFDes/g, 'données'],
    [/Donn\uFFFDes/g, 'Données'],
    [/biblioth\uFFFDque/g, 'bibliothèque'],
    [/qualit\uFFFD/g, 'qualité'],
    [/r\uFFFDalit/g, 'réalit'],
    [/premi\uFFFDre/g, 'première'],
    [/derni\uFFFDre/g, 'dernière'],
    [/lumi\uFFFDre/g, 'lumière'],
    [/mani\uFFFDre/g, 'manière'],
    [/derri\uFFFDre/g, 'derrière'],
    [/tr\uFFFDs(?=[\s"'<.,;:!?)\]])/g, 'très'],
    [/Tr\uFFFDs(?=[\s"'<.,;:!?)\]])/g, 'Très'],
    [/apr\uFFFDs/g, 'après'],
    [/Apr\uFFFDs/g, 'Après'],
    [/compl\uFFFDt/g, 'complèt'],
    [/sp\uFFFDcial/g, 'spécial'],
    [/g\uFFFDn\uFFFDral/g, 'général'],
    [/mod\uFFFDle/g, 'modèle'],
    [/contr\uFFFDle/g, 'contrôle'],
    [/Contr\uFFFDle/g, 'Contrôle'],
    [/r\uFFFDglage/g, 'réglage'],
    [/pr\uFFFDf\uFFFDr/g, 'préfér'],
    [/m\uFFFDme/g, 'même'],
    [/M\uFFFDme/g, 'Même'],
    [/gr\uFFFDce/g, 'grâce'],
    [/si\uFFFDcle/g, 'siècle'],
    [/\uFFFDcouter/g, 'écouter'],
    [/\uFFFDcoute/g, 'écoute'],
    [/\uFFFDgalement/g, 'également'],
    [/\uFFFDcran/g, 'écran'],
    [/v\uFFFDrit/g, 'vérit'],
    [/s\uFFFDlection/g, 'sélection'],
    [/exp\uFFFDrience/g, 'expérience'],
    [/t\uFFFDmoignage/g, 'témoignage'],
    [/r\uFFFDponse/g, 'réponse'],
    [/r\uFFFDpond/g, 'répond'],
    [/num\uFFFDro/g, 'numéro'],
    [/p\uFFFDriode/g, 'période'],
    [/m\uFFFDthode/g, 'méthode'],
    [/syst\uFFFDme/g, 'système'],
    [/param\uFFFDtre/g, 'paramètre'],
    [/r\uFFFDseau/g, 'réseau'],
    [/m\uFFFDdia/g, 'média'],
    [/vid\uFFFDo/g, 'vidéo'],
    [/c\uFFFDt\uFFFD/g, 'côté'],
    [/propri\uFFFDt/g, 'propriét'],
    [/s\uFFFDcurit/g, 'sécurit'],
    [/personnalis\uFFFD/g, 'personnalisé'],
    [/l\uFFFD(?=[\s"'<.,;:!?)\]])/g, 'là'],
    [/Tracscrivez/g, 'Transcrivez'],
    [/tracscrivez/g, 'transcrivez'],
  ];

  for (const [re, rep] of map) out = out.replace(re, rep);

  // Generic: letter + FFFD + letter → é
  out = out.replace(/(\p{L})\uFFFD(\p{L})/gu, '$1é$2');
  // Generic trailing: letter + FFFD before non-letter → é
  out = out.replace(/(\p{L})\uFFFD(?=[\s"'“”«»'<.,;:!?)\]]|$)/gu, '$1é');
  // Leading FFFD before letter → é / É if start of sentence handled loosely
  out = out.replace(/(^|[\s>'"«])\uFFFD(\p{L})/gu, (_, a, b) => `${a}é${b}`);

  return out;
}

let totalBefore = 0;
let totalAfter = 0;
for (const page of localeConfig.publicPages) {
  const file = path.join(process.cwd(), 'fr', page);
  if (!fs.existsSync(file)) continue;
  const before = fs.readFileSync(file, 'utf8');
  const b = (before.match(/\uFFFD/g) || []).length;
  const after = fix(before);
  const a = (after.match(/\uFFFD/g) || []).length;
  totalBefore += b;
  totalAfter += a;
  if (after !== before) fs.writeFileSync(file, after);
  console.log(`${page}: ${b} → ${a}`);
}
console.log(`TOTAL: ${totalBefore} → ${totalAfter}`);

const fr = fs.readFileSync('fr/index.html', 'utf8');
const ctx = new Set();
for (const m of fr.matchAll(/\uFFFD/g)) {
  ctx.add(JSON.stringify(fr.slice(Math.max(0, m.index - 12), m.index + 12)));
}
console.log('remaining index contexts:', [...ctx]);
