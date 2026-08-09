'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const run = promisify(execFile);

const pages = ['index.html', 'download.html', 'about.html', 'privacy-policy.html', 'terms-conditions.html', 'refund-policy.html', 'licenses.html'];
const locale = process.argv[2];
if (!locale) throw new Error('Pass a locale code, e.g. fr');

const attrs = /\b(?:aria-label|alt|title|placeholder|content)=(['"])([\s\S]*?)\1/gi;
const opaque = /<script\b[\s\S]*?<\/script\s*>|<style\b[\s\S]*?<\/style\s*>/gi;
const protectedTerms = ['HushBook', 'App Store', 'Google Play', 'HushBook Engine', 'LibriVox', 'Internet Archive', 'Sentry', 'RevenueCat'];
const decode = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const encode = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function translatable(s) { const v = decode(s).replace(/\s+/g, ' ').trim(); return v && /[A-Za-z]/.test(v) && !/^https?:|^\/|^#|^mailto:|^[\w.-]+@[\w.-]+$/.test(v) && !/^[©®™—–·•]+$/.test(v); }
function mask(s) { const saved=[]; let out=s; for (const term of protectedTerms) { const token=`HBTERM${saved.length}X`; if(out.includes(term)){saved.push([token,term]);out=out.split(term).join(token);} } return [out,saved]; }
function unmask(s,saved){ for(const [token,term] of saved)s=s.split(token).join(term); return s; }
async function translate(s) { const [masked,saved]=mask(s); const {stdout}=await run('argos-translate.exe',['--from-lang','en','--to-lang',locale,masked],{windowsHide:true}); return unmask(stdout.trim(),saved); }

async function main(){
  const dir=path.join(process.cwd(),locale); await fs.mkdir(dir,{recursive:true});
  for(const page of pages){
    let html=await fs.readFile(page,'utf8'); const values=new Set();
    const visible=html.replace(opaque,'').replace(/<[^>]+>/g,'|');
    for(const part of visible.split('|')) if(translatable(part)) values.add(part.trim());
    for(const m of html.matchAll(attrs)) if(translatable(m[2])) values.add(m[2]);
    const map=new Map(); for(const value of values){ try{map.set(value,await translate(value));}catch(e){console.warn(`${locale} ${page}: ${value.slice(0,50)} (${e.message})`);} }
    html=html.replace(opaque, x=>`\u0000${Buffer.from(x).toString('base64')}\u0000`);
    html=html.replace(/>([^<>]+)</g,(all,raw)=>{const key=raw.trim(); return map.has(key)?`>${raw.replace(key,encode(map.get(key)))}<`:all;});
    html=html.replace(attrs,(all,q,raw)=>{const key=raw.trim(); return map.has(key)?all.replace(raw,encode(map.get(key))):all;});
    html=html.replace(/\u0000([A-Za-z0-9+/=]+)\u0000/g,(_,b)=>Buffer.from(b,'base64').toString('utf8'));
    html=html.replace(/<html lang="en">/i,`<html lang="${locale}">`);
    await fs.writeFile(path.join(dir,page),html,'utf8'); console.log(`${locale}: ${page} (${map.size} strings)`);
  }
}
main().catch(e=>{console.error(e);process.exitCode=1;});
