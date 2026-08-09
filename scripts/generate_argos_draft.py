import html, re, sys
from pathlib import Path
import argostranslate.translate as tr

pages = ['index.html','download.html','about.html','privacy-policy.html','terms-conditions.html','refund-policy.html','licenses.html']
locale = sys.argv[1]
output_locale = sys.argv[2] if len(sys.argv) > 2 else locale
langs = tr.get_installed_languages(); source = next(x for x in langs if x.code == 'en'); target = next(x for x in langs if x.code == locale)
translator = source.get_translation(target)
attr = re.compile(r'\b(?:aria-label|alt|title|placeholder|content)=(\"|\')(.*?)\1', re.I|re.S)
opaque = re.compile(r'<script\b.*?</script\s*>|<style\b.*?</style\s*>', re.I|re.S)
protected = ['HushBook','App Store','Google Play','HushBook Engine','LibriVox','Internet Archive','Sentry','RevenueCat']
cache = {}
def can(s):
    s = html.unescape(s).strip()
    return bool(s and re.search('[A-Za-z]', s) and not re.match(r'^(https?:|/|#|mailto:|[\w.-]+@[\w.-]+$)', s))
def translate(s):
    key = html.unescape(s).strip()
    if key in cache: return cache[key]
    saved=[]; out=key
    for i,t in enumerate(protected):
        token=f'HBTERM{i}X'
        if t in out: saved.append((token,t)); out=out.replace(t,token)
    value=translator.translate(out)
    for token,t in saved: value=value.replace(token,t)
    cache[key]=value
    return value
def esc(s): return html.escape(s, quote=False)
outdir=Path(output_locale); outdir.mkdir(exist_ok=True)
for page in pages:
    text=Path(page).read_text(encoding='utf-8')
    opaque_blocks=[]
    def hide(m): opaque_blocks.append(m.group(0)); return f'HBOPAQUE{len(opaque_blocks)-1}X'
    work=opaque.sub(hide,text)
    values=[]
    for m in re.finditer(r'>([^<>]+)<', work):
        if can(m.group(1)) and html.unescape(m.group(1)).strip() not in values: values.append(html.unescape(m.group(1)).strip())
    for m in attr.finditer(work):
        if can(m.group(2)) and html.unescape(m.group(2)).strip() not in values: values.append(html.unescape(m.group(2)).strip())
    for start in range(0,len(values),24):
        batch=values[start:start+24]
        marker='\nHBSEP9X\n'
        translated=translator.translate(marker.join(batch)).split(marker)
        if len(translated)==len(batch):
            for source,value in zip(batch,translated): cache[source]=value.strip()
        else:
            for source in batch: translate(source)
    def node(m):
        raw=m.group(1); key=html.unescape(raw).strip()
        return m.group(0) if not can(raw) else '>'+raw.replace(key,esc(translate(raw)))+'<'
    work=re.sub(r'>([^<>]+)<',node,work)
    def attribute(m):
        raw=m.group(2); return m.group(0) if not can(raw) else m.group(0).replace(raw,html.escape(translate(raw),quote=True))
    work=attr.sub(attribute,work)
    for i,b in enumerate(opaque_blocks): work=work.replace(f'HBOPAQUE{i}X',b)
    work=re.sub(r'<html lang="en">',f'<html lang="{locale}">',work,flags=re.I)
    (outdir/page).write_text(work,encoding='utf-8'); print(output_locale,page,len(cache),flush=True)
