'use strict';
const fs=require('node:fs'),path=require('node:path');
const phrases={
de:['Es war einmal','Ich will großartig sein','Sein oder nicht sein','Einer für alle,','alle für einen.','Erinnerungen sind alles.','Und sie lebten glücklich bis ans Ende.'],
fr:['Il était une fois','Je veux être formidable','Être ou ne pas être','Tous pour un,','un pour tous.','Les souvenirs sont tout.','Ils vécurent heureux.'],
'es-ES':['Érase una vez','Quiero ser increíble','Ser o no ser','Todos para uno,','uno para todos.','Los recuerdos lo son todo.','Y vivieron felices para siempre.'],
'es-419':['Érase una vez','Quiero ser genial','Ser o no ser','Todos para uno,','uno para todos.','Los recuerdos lo son todo.','Y vivieron felices para siempre.'],
'pt-BR':['Era uma vez','Quero ser incrível','Ser ou não ser','Todos por um,','um por todos.','Memórias são tudo.','E viveram felizes para sempre.'],
'pt-PT':['Era uma vez','Quero ser extraordinário','Ser ou não ser','Todos por um,','um por todos.','As memórias são tudo.','E viveram felizes para sempre.'],
it:['C’era una volta','Voglio essere straordinario','Essere o non essere','Tutti per uno,','uno per tutti.','I ricordi sono tutto.','E vissero felici e contenti.'],
ja:['むかしむかし','最高になりたい','生きるべきか、死ぬべきか','一人はみんなのために、','みんなは一人のために。','思い出はすべて。','そして二人はいつまでも幸せに暮らしました。'],
ko:['옛날 옛적에','멋진 사람이 되고 싶어','죽느냐 사느냐','한 사람은 모두를 위해,','모두는 한 사람을 위해.','추억이 전부야.','그들은 오래도록 행복하게 살았습니다.'],
nl:['Er was eens','Ik wil geweldig zijn','Zijn of niet zijn','Eén voor allen,','allen voor één.','Herinneringen zijn alles.','En ze leefden nog lang en gelukkig.'],
pl:['Dawno, dawno temu','Chcę być wspaniały','Być albo nie być','Wszyscy za jednego,','jeden za wszystkich.','Wspomnienia są wszystkim.','I żyli długo i szczęśliwie.'],
tr:['Bir varmış bir yokmuş','Harika olmak istiyorum','Olmak ya da olmamak','Biri herkes için,','herkes biri için.','Anılar her şeydir.','Ve sonsuza dek mutlu yaşadılar.'],
ru:['Жили-были','Я хочу быть великолепным','Быть или не быть','Один за всех,','все за одного.','Воспоминания — это всё.','И жили они долго и счастливо.'],
uk:['Жили-були','Я хочу бути неймовірним','Бути чи не бути','Один за всіх,','усі за одного.','Спогади — це все.','І жили вони довго й щасливо.'],
ar:['كان يا ما كان','أريد أن أكون رائعًا','أكون أو لا أكون','الكل للواحد،','والواحد للكل.','الذكريات هي كل شيء.','وعاشا بسعادة إلى الأبد.'],
id:['Pada suatu ketika','Aku ingin menjadi hebat','Ada atau tiada','Satu untuk semua,','semua untuk satu.','Kenangan adalah segalanya.','Dan mereka hidup bahagia selamanya.'],
th:['กาลครั้งหนึ่งนานมาแล้ว','ฉันอยากยอดเยี่ยม','เป็นหรือไม่เป็น','หนึ่งเพื่อทุกคน','ทุกคนเพื่อหนึ่งคน','ความทรงจำคือทุกสิ่ง','แล้วพวกเขาก็อยู่ด้วยกันอย่างมีความสุขตลอดไป'],
vi:['Ngày xửa ngày xưa','Tôi muốn trở nên tuyệt vời','Tồn tại hay không tồn tại','Một người vì mọi người,','mọi người vì một người.','Ký ức là tất cả.','Và họ sống hạnh phúc mãi mãi.'],
sv:['Det var en gång','Jag vill vara fantastisk','Att vara eller inte vara','En för alla,','alla för en.','Minnen är allt.','Och de levde lyckliga i alla sina dagar.'],
da:['Der var engang','Jeg vil være fantastisk','At være eller ikke at være','Én for alle,','alle for én.','Minder er alt.','Og de levede lykkeligt til deres dages ende.']};
for(const [locale,items] of Object.entries(phrases)){const p=path.join(locale,'index.html');if(!fs.existsSync(p))continue;let h=fs.readFileSync(p,'utf8');h=h.replace(/const PHRASES=\[[\s\S]*?\];/,`const PHRASES=${JSON.stringify(items)};`);fs.writeFileSync(p,h)}
console.log('Localized rotating hero phrases for',Object.keys(phrases).length,'locales');
