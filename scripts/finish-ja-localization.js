'use strict';

// Local-only final Japanese landing-page pass. No content leaves workspace.
const fs = require('node:fs');
const target = 'ja/index.html';
let html = fs.readFileSync(target, 'utf8');
const pairs = [
  ['Spanish, Hindi, Japanese, Arabic, French — ninety-nine 言語 in all. HushBook listens in the tongue a book was meant to be heard in, then paints 不要y word in time, so you read along no matter where the story comes from.', 'スペイン語、ヒンディー語、日本語、アラビア語、フランス語など、合計 99 言語。HushBook は本来その本が聴かれるべき言語で音声を聴き取り、すべての言葉をタイミングに合わせて表示します。物語がどの言語で書かれていても、読みながら聴けます。'],
  ['HushBook reading along to a Spanish poetry collection', 'スペイン語の詩集を読みながら聴く HushBook'],
  ['HushBook reading along to Los Motivos del Lobo by Rubén Darío in Spanish', 'ルベン・ダリオのスペイン語作品『狼の理由』を読みながら聴く HushBook'],
  ['HushBook reading along to an Italian poetry book', 'イタリア語の詩集を読みながら聴く HushBook'],
  ['HushBook reading along to Épigramme by François Maynard in French', 'フランソワ・メナールのフランス語作品『エピグラム』を読みながら聴く HushBook'],
  ['Spanish Poetry', 'スペイン語の詩'], ['Choose your reading profile: 理解, Dyslexia/ADHD, or 視覚', '読書プロファイルを選択：理解、ディスレクシア / ADHD、視覚'],
  ['HushBook ホーム with featured books and your library', '注目の本とあなたのライブラリを表示した HushBook ホーム'],
  ['本ごとの言葉数 bar chart', '本ごとの言葉数を示す棒グラフ'],
  ['習慣の気づき · genre radar · words per book · honest goals — 不要y card shareable as a polished image.', '習慣の気づき・ジャンルレーダー・本ごとの言葉数・正直な目標。すべてのカードを洗練された画像として共有できます。'],
  ['Streaks you can hold in your hand — 30+ collectible badges for streaks, books, words, hours, and firsts.', '手に取れる連続記録。連続日数、本、言葉数、時間、初回達成を記念する 30 種類以上のコレクションバッジ。'],
  ['Reading companions', '読書コンパニオン'], ['Map the cast as you read.', '読みながら登場人物を整理。'],
  ['Sprawling novels get confusing. Drag characters onto a canvas, draw the lines between them, and label each one in your own words — ally, rival, brother, admires. Your map lives with the book.', '長編小説では登場人物が分かりにくくなりがちです。登場人物をキャンバスへドラッグし、関係線を引き、自分の言葉で「味方」「ライバル」「兄弟」「慕っている」などのラベルを付けられます。マップは本と一緒に保存されます。'],
  ["And when a line stops you cold: tap the first word, tap the last, and it's saved as a quote — ready to share as a card.", '心を打つ一節に出会ったら、最初の言葉と最後の言葉をタップするだけ。引用として保存され、カードにして共有できます。'],
  ['Wher不要 you are', 'どこにいても'], ['Made for <i>your 不要yday.</i>', 'あなたの <i>毎日のために。</i>'],
  ['No reading nook required. HushBook fits the moments you already have — and turns them into pages.', '読書専用の場所は必要ありません。HushBook はすでにある日常のすき間時間に寄り添い、それをページへと変えます。'],
  ['Browsing the HushBook ホーム screen on the couch', 'ソファで HushBook のホーム画面を見ている様子'],
  ['Your couch.<br><i>Your next chapter.</i>', 'あなたのソファ。<br><i>次の章もここから。</i>'], ['Pick up exactly where you left off, before the kettle boils.', '湯が沸く前に、前回止めた場所からすぐ再開。'],
  ['読みながら聴けば、 with Project Hail Mary in bed at night', '夜、ベッドで『プロジェクト・ヘイル・メアリー』を読みながら聴く様子'],
  ['Your 11 PM.<br><i>Lights off, words on.</i>', '夜 11 時。<br><i>灯りを消して、言葉を灯す。</i>'], ['The room goes dark. The words keep glowing.', '部屋が暗くなっても、言葉は光り続けます。'],
  ['Listening to The Lord of the Rings on a park bench', '公園のベンチで『指輪物語』を聴く様子'],
  ['Your lunch hour.<br><i>Middle-earth included.</i>', 'あなたの昼休み。<br><i>中つ国へも行けます。</i>'], ['完全オフライン — the park has no Wi-Fi, and it doesn\'t matter.', '完全オフライン。公園に Wi-Fi がなくても問題ありません。'],
  ['MP3, M4A, M4B, AAC, WAV, FLAC, OGG, OPUS, OGA, AIFF, AIF, MKA, and ALAC — one file per import. Chapters inside M4B files are detected automatically, along with cover art and metadata.', 'MP3、M4A、M4B、AAC、WAV、FLAC、OGG、OPUS、OGA、AIFF、AIF、MKA、ALAC に対応しています。読み込みは一度に 1 ファイルです。M4B ファイル内の章は、表紙とメタデータとともに自動検出されます。'],
  ['The Engine is thermal-aware: it caps its worker threads and rests between chunks to keep your phone cool, and it resumes automatically if a long 文字起こし is interrupted.', 'Engine は発熱に配慮し、スマートフォンを冷たく保つためにワーカースレッド数を制限し、処理の区切りごとに休止します。長い文字起こしが中断されても自動的に再開します。'],
  ['どんなone who reads with their ears — and especially readers with dyslexia, ADHD, or low vision, language learners, and 言語のone who focuses better when they can see the words they hear.', '耳で読むすべての人のためのアプリです。特に、ディスレクシア、ADHD、弱視のある読者、言語学習者、聞こえる言葉を見たほうが集中しやすい人に向いています。'],
  ['Yes — night mode swaps the blurred cover backdrop for a solid dark canvas, and the 視覚 profile adds high-contrast themes like white-on-black and amber-on-black.', 'はい。ナイトモードではぼかした表紙の背景を濃い単色へ切り替え、視覚プロファイルでは黒地に白、黒地にアンバーなどの高コントラストテーマを追加できます。'],
  ['Read along with 不要y word you hear.', '聞こえるすべての言葉を、読みながら聴く。'],
  ['— Marcus Aurelius', '— マルクス・アウレリウス'],
  ['ダウンロード HushBook on the App Store', 'App Store で HushBook をダウンロード'], ['HushBook を入手 on Google Play', 'Google Play で HushBook を入手']
];
for (const [from, to] of pairs) html = html.split(from).join(to);
fs.writeFileSync(target, html, 'utf8');
