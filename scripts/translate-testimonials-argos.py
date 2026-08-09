import re, pathlib
from argostranslate import translate
texts=[
'I love the on-device transcription and the specialized reading modes (the dyslexia font and high-contrast layouts are fantastic). Highly recommended!',
'Perfect app just what I wanted. Pro unlocks more stats as far as I can see.',
'Great app! Could you please add option to highlight the current sentence and not word, cause ai makes words bold either too slow or too fast, so they are not synched with speech. Ability to add whole book without choosing chapters 1 by 1 would also be nice for multiple files 👍']
locales={'ja':'ja','ko':'ko','ru':'ru','uk':'uk','th':'th','ar':'ar'}
for loc,code in locales.items():
 p=pathlib.Path(loc)/'index.html'; h=p.read_text(encoding='utf-8')
 for src in texts:
  dst=translate.translate(src,'en',code)
  h=h.replace('“'+src+'”','“'+dst+'”').replace(src,dst)
 p.write_text(h,encoding='utf-8')
