const fs = require('node:fs');
const path = require('node:path');
const q = '“Hello! I have it downloaded and very cool app. Is there a way to increase playback speed? I find that’s the only thing from incorporating this into my daily reading.”';
const translations = {
  ja: '「こんにちは！ダウンロードしました。とても良いアプリです。再生速度を上げられますか？毎日の読書に取り入れるうえで、そこだけが気になります。」',
  ko: '“안녕하세요! 다운로드했는데 정말 멋진 앱입니다. 재생 속도를 높일 수 있을까요? 매일 독서에 활용하는 데 그 점만 아쉽습니다.”',
  ru: '«Здравствуйте! Я скачал приложение — оно очень классное. Можно ли увеличить скорость воспроизведения? Для ежедневного чтения мне не хватает только этого.»',
  uk: '«Вітаю! Я завантажив застосунок — він дуже класний. Чи можна збільшити швидкість відтворення? Для щоденного читання бракує лише цього.»',
  th: '“สวัสดี! ฉันดาวน์โหลดแล้ว แอปดีมาก มีวิธีเพิ่มความเร็วการเล่นไหม? สำหรับการอ่านทุกวัน นี่เป็นสิ่งเดียวที่ยังขาดอยู่”',
  ar: '“مرحبًا! نزّلته والتطبيق رائع جدًا. هل يمكن زيادة سرعة التشغيل؟ هذا هو الشيء الوحيد الذي يمنعني من استخدامه في قراءتي اليومية.”'
};
for (const [locale, text] of Object.entries(translations)) {
  const file = path.join(locale, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, html.replaceAll(q, text));
}
