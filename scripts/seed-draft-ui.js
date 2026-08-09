'use strict';
const fs = require('node:fs');
const path = require('node:path');
const locales = {
  tr: { 'Read-along':'Birlikte oku', Privacy:'Gizlilik', Accessibility:'Erişilebilirlik', Analytics:'Analizler', FAQ:'SSS', Download:'İndir', About:'Hakkında', 'Terms and Conditions':'Hüküm ve Koşullar', 'Refund Policy':'İade Politikası', Licenses:'Lisanslar', 'Transcribe Any Audiobook':'Her audiobook’u transkribe et', 'Download now':'Şimdi indir' },
  ru: { 'Read-along':'Чтение вместе', Privacy:'Конфиденциальность', Accessibility:'Доступность', Analytics:'Аналитика', FAQ:'Частые вопросы', Download:'Скачать', About:'О приложении', 'Terms and Conditions':'Условия использования', 'Refund Policy':'Политика возврата', Licenses:'Лицензии', 'Transcribe Any Audiobook':'Транскрибируйте любую аудиокнигу', 'Download now':'Скачать сейчас' },
  uk: { 'Read-along':'Читати разом', Privacy:'Конфіденційність', Accessibility:'Доступність', Analytics:'Аналітика', FAQ:'Поширені запитання', Download:'Завантажити', About:'Про нас', 'Terms and Conditions':'Умови використання', 'Refund Policy':'Політика повернення', Licenses:'Ліцензії', 'Transcribe Any Audiobook':'Транскрибуйте будь-яку аудіокнигу', 'Download now':'Завантажити зараз' },
  ar: { 'Read-along':'اقرأ واستمع', Privacy:'الخصوصية', Accessibility:'إمكانية الوصول', Analytics:'التحليلات', FAQ:'الأسئلة الشائعة', Download:'تنزيل', About:'عن التطبيق', 'Terms and Conditions':'الشروط والأحكام', 'Refund Policy':'سياسة الاسترداد', Licenses:'التراخيص', 'Transcribe Any Audiobook':'حوّل أي كتاب صوتي إلى نص', 'Download now':'نزّل الآن' },
  id: { 'Read-along':'Baca sambil mendengar', Privacy:'Privasi', Accessibility:'Aksesibilitas', Analytics:'Analitik', FAQ:'Tanya Jawab', Download:'Unduh', About:'Tentang', 'Terms and Conditions':'Syarat dan Ketentuan', 'Refund Policy':'Kebijakan Pengembalian', Licenses:'Lisensi', 'Transcribe Any Audiobook':'Transkripsikan audiobook apa pun', 'Download now':'Unduh sekarang' },
  th: { 'Read-along':'อ่านไปพร้อมกัน', Privacy:'ความเป็นส่วนตัว', Accessibility:'การเข้าถึง', Analytics:'การวิเคราะห์', FAQ:'คำถามที่พบบ่อย', Download:'ดาวน์โหลด', About:'เกี่ยวกับ', 'Terms and Conditions':'ข้อกำหนดและเงื่อนไข', 'Refund Policy':'นโยบายคืนเงิน', Licenses:'ใบอนุญาต', 'Transcribe Any Audiobook':'ถอดเสียงหนังสือเสียงทุกเล่ม', 'Download now':'ดาวน์โหลดตอนนี้' },
  vi: { 'Read-along':'Đọc cùng lúc', Privacy:'Quyền riêng tư', Accessibility:'Khả năng tiếp cận', Analytics:'Phân tích', FAQ:'Câu hỏi thường gặp', Download:'Tải xuống', About:'Giới thiệu', 'Terms and Conditions':'Điều khoản và điều kiện', 'Refund Policy':'Chính sách hoàn tiền', Licenses:'Giấy phép', 'Transcribe Any Audiobook':'Chuyển mọi sách nói thành văn bản', 'Download now':'Tải xuống ngay' },
  sv: { 'Read-along':'Läs med', Privacy:'Integritet', Accessibility:'Tillgänglighet', Analytics:'Analys', FAQ:'Vanliga frågor', Download:'Ladda ner', About:'Om oss', 'Terms and Conditions':'Villkor', 'Refund Policy':'Återbetalningspolicy', Licenses:'Licenser', 'Transcribe Any Audiobook':'Transkribera valfri ljudbok', 'Download now':'Ladda ner nu' },
  da: { 'Read-along':'Læs med', Privacy:'Privatliv', Accessibility:'Tilgængelighed', Analytics:'Analyser', FAQ:'Ofte stillede spørgsmål', Download:'Download', About:'Om os', 'Terms and Conditions':'Vilkår og betingelser', 'Refund Policy':'Refusionspolitik', Licenses:'Licenser', 'Transcribe Any Audiobook':'Transskriber enhver lydbog', 'Download now':'Download nu' }
};
for (const [locale, repl] of Object.entries(locales)) {
  for (const file of fs.readdirSync(locale).filter(f=>f.endsWith('.html'))) {
    const p=path.join(locale,file); let html=fs.readFileSync(p,'utf8');
    for (const [from,to] of Object.entries(repl)) html=html.split(from).join(to);
    fs.writeFileSync(p,html);
  }
}
console.log('Seeded localized UI labels for', Object.keys(locales).join(', '));
