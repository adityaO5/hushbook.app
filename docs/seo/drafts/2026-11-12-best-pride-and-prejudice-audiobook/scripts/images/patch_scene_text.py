"""Replace the CHAPTER array of a temp copy of the ios-read-along scene with the one in <chapter.js>.
Usage: python -I patch_scene_text.py <scene index.html> <chapter.js>
"""
import re
import sys

scene, js = sys.argv[1], sys.argv[2]
html = open(scene, encoding='utf-8').read()
new = open(js, encoding='utf-8').read().strip()
assert new.startswith('const CHAPTER = [') and new.endswith('];')
body = new[len('const CHAPTER = ['):-2].rstrip().rstrip(',') + '\n      ];'
pat = re.compile(r'const CHAPTER = \[\n.*?\n      \];', re.S)
assert len(pat.findall(html)) == 1
html = pat.sub(lambda m: 'const CHAPTER = [' + body, html)
open(scene, 'w', encoding='utf-8', newline='\n').write(html)
print('replaced; paragraphs:', body.count('\n"'))
