'use strict';

function pack(items) {
  return items.map(([q, a]) => ({ q, a }));
}

/**
 * The seven high-intent FAQ entries that were present in the former English
 * SEO expansion. Existing page-specific questions are preserved; the
 * generator appends these entries to every supported landing page.
 */
const FAQ_ADDITIONS = {
  en: pack([
    ['Can I read and listen to an audiobook at the same time?', 'Yes. HushBook highlights every spoken word in sync, so you can read and listen at once without losing your place.'],
    ['Do audiobooks have subtitles or captions?', 'Most audiobook players do not. HushBook generates word-synced text from your audio on your phone, so you can follow the narration without a separate transcript or ebook.'],
    ['Do I need a Kindle or ebook to read along with an audiobook?', 'No. You do not need a Kindle, ebook, or second purchase. Import audio you own, and HushBook creates the synchronized text on your device.'],
    ['How is HushBook different from Audible Whispersync or Immersion Reading?', 'Whispersync and Immersion Reading usually depend on Audible plus a matching Kindle ebook. HushBook works with your own audio files, generates text privately on your phone, and does not require an Amazon account or cloud upload.'],
    ['Is reading and listening at the same time better for focus and comprehension?', 'Many listeners find that seeing and hearing the same words keeps attention anchored and makes it easier to retain a chapter than audio alone.'],
    ['Is HushBook good for dyslexia or ADHD?', 'Yes. Word-level highlighting and reading profiles support dyslexia, ADHD, low vision, language learning, and anyone who focuses better when they can see the words they hear.'],
    ['Does HushBook work offline?', 'Yes. After the one-time HushBook Engine download, playback, read-along, and transcription run on your device without an internet connection.'],
  ]),
  de: pack([
    ['Kann ich ein Hörbuch gleichzeitig lesen und hören?', 'Ja. HushBook hebt jedes gesprochene Wort synchron hervor, damit du gleichzeitig lesen und hören kannst, ohne die Stelle zu verlieren.'],
    ['Haben Hörbücher Untertitel oder Captions?', 'Die meisten Hörbuch-Player nicht. HushBook erzeugt synchronen Text aus deinem Audio auf dem Telefon, damit du der Erzählung ohne separates Transkript oder E-Book folgen kannst.'],
    ['Brauche ich einen Kindle oder ein E-Book zum Mitlesen?', 'Nein. Du brauchst weder Kindle noch E-Book oder einen zweiten Kauf. Importiere Audio, das du besitzt, und HushBook erstellt den synchronen Text auf deinem Gerät.'],
    ['Wie unterscheidet sich HushBook von Audible Whispersync oder Immersion Reading?', 'Whispersync und Immersion Reading benötigen meist Audible und ein passendes Kindle-E-Book. HushBook funktioniert mit deinen eigenen Audiodateien, erzeugt Text privat auf dem Telefon und braucht weder Amazon-Konto noch Cloud-Upload.'],
    ['Hilft gleichzeitiges Lesen und Hören bei Fokus und Verständnis?', 'Viele Hörer finden, dass das gleichzeitige Sehen und Hören die Aufmerksamkeit verankert und beim Behalten eines Kapitels hilft — mehr als Audio allein.'],
    ['Ist HushBook für Legasthenie oder ADHS geeignet?', 'Ja. Hervorhebung auf Wortebene und Leseprofile unterstützen Legasthenie, ADHS, Sehschwäche, Sprachlernen und alle, die Wörter besser aufnehmen, wenn sie sie sehen.'],
    ['Funktioniert HushBook offline?', 'Ja. Nach dem einmaligen Download der HushBook Engine laufen Wiedergabe, Mitlesen und Transkription ohne Internet auf deinem Gerät.'],
  ]),
  fr: pack([
    ['Puis-je lire et écouter un livre audio en même temps ?', 'Oui. HushBook met en évidence chaque mot prononcé en synchronisation, pour lire et écouter à la fois sans perdre votre place.'],
    ['Les livres audio ont-ils des sous-titres ou des légendes ?', 'La plupart des lecteurs audio n’en proposent pas. HushBook génère un texte synchronisé à partir de votre audio sur le téléphone, sans transcription ni e-book séparé.'],
    ['Ai-je besoin d’un Kindle ou d’un e-book pour lire en même temps ?', 'Non. Vous n’avez besoin ni d’un Kindle, ni d’un e-book, ni d’un second achat. Importez un audio que vous possédez et HushBook crée le texte synchronisé sur l’appareil.'],
    ['Quelle est la différence entre HushBook et Audible Whispersync ou Immersion Reading ?', 'Whispersync et Immersion Reading dépendent généralement d’Audible et d’un e-book Kindle correspondant. HushBook fonctionne avec vos fichiers audio, génère le texte en privé sur le téléphone et ne demande ni compte Amazon ni envoi cloud.'],
    ['Lire et écouter en même temps aide-t-il la concentration et la compréhension ?', 'Beaucoup d’auditeurs trouvent que voir et entendre les mêmes mots ancre l’attention et aide à retenir un chapitre mieux que l’audio seul.'],
    ['HushBook convient-il à la dyslexie ou au TDAH ?', 'Oui. Le surlignage mot à mot et les profils de lecture aident la dyslexie, le TDAH, la basse vision, l’apprentissage des langues et toute personne qui se concentre mieux en voyant les mots.'],
    ['HushBook fonctionne-t-il hors ligne ?', 'Oui. Après le téléchargement unique du moteur HushBook, la lecture, le suivi du texte et la transcription fonctionnent sur l’appareil sans connexion.'],
  ]),
  es: pack([
    ['¿Puedo leer y escuchar un audiolibro al mismo tiempo?', 'Sí. HushBook resalta cada palabra hablada en sincronía para que leas y escuches a la vez sin perder el punto.'],
    ['¿Los audiolibros tienen subtítulos o captions?', 'La mayoría de reproductores no. HushBook genera texto sincronizado a partir del audio en tu teléfono, sin necesitar una transcripción ni un ebook aparte.'],
    ['¿Necesito un Kindle o un ebook para leer mientras escucho?', 'No. No necesitas Kindle, ebook ni una segunda compra. Importa un audio que tengas y HushBook crea el texto sincronizado en tu dispositivo.'],
    ['¿En qué se diferencia HushBook de Audible Whispersync o Immersion Reading?', 'Whispersync e Immersion Reading suelen depender de Audible y de un ebook Kindle compatible. HushBook funciona con tus propios archivos de audio, genera el texto de forma privada en el teléfono y no requiere cuenta de Amazon ni subir archivos a la nube.'],
    ['¿Leer y escuchar a la vez ayuda al enfoque y la comprensión?', 'Muchas personas sienten que ver y oír las mismas palabras mantiene la atención y facilita recordar un capítulo más que el audio solo.'],
    ['¿HushBook sirve para la dislexia o el TDAH?', 'Sí. El resaltado palabra por palabra y los perfiles de lectura ayudan con dislexia, TDAH, baja visión, aprendizaje de idiomas y a cualquiera que se concentre mejor viendo las palabras.'],
    ['¿HushBook funciona sin conexión?', 'Sí. Después de descargar una vez HushBook Engine, la reproducción, la lectura sincronizada y la transcripción funcionan en el dispositivo sin internet.'],
  ]),
  pt: pack([
    ['Posso ler e ouvir um audiolivro ao mesmo tempo?', 'Sim. O HushBook destaca cada palavra falada em sincronia, para que você leia e ouça ao mesmo tempo sem perder o lugar.'],
    ['Os audiolivros têm legendas ou captions?', 'A maioria dos leitores não tem. O HushBook gera texto sincronizado a partir do áudio no seu telefone, sem exigir uma transcrição ou um ebook separado.'],
    ['Preciso de um Kindle ou ebook para ler enquanto ouço?', 'Não. Você não precisa de Kindle, ebook nem de uma segunda compra. Importe um áudio que possui e o HushBook cria o texto sincronizado no dispositivo.'],
    ['Qual é a diferença entre HushBook e Audible Whispersync ou Immersion Reading?', 'Whispersync e Immersion Reading normalmente dependem do Audible e de um ebook Kindle correspondente. O HushBook funciona com seus próprios arquivos de áudio, gera o texto em privado no telefone e não exige conta Amazon nem envio para a nuvem.'],
    ['Ler e ouvir ao mesmo tempo ajuda no foco e na compreensão?', 'Muitos ouvintes acham que ver e ouvir as mesmas palavras mantém a atenção e ajuda a reter um capítulo melhor do que apenas o áudio.'],
    ['O HushBook é bom para dislexia ou TDAH?', 'Sim. O destaque palavra por palavra e os perfis de leitura ajudam com dislexia, TDAH, baixa visão, aprendizagem de idiomas e qualquer pessoa que se concentre melhor vendo as palavras.'],
    ['O HushBook funciona offline?', 'Sim. Depois do download único do HushBook Engine, reprodução, leitura sincronizada e transcrição funcionam no dispositivo sem internet.'],
  ]),
  it: pack([
    ['Posso leggere e ascoltare un audiolibro allo stesso tempo?', 'Sì. HushBook evidenzia ogni parola pronunciata in sincronia, così puoi leggere e ascoltare senza perdere il punto.'],
    ['Gli audiolibri hanno sottotitoli o didascalie?', 'La maggior parte dei lettori non li offre. HushBook genera testo sincronizzato dall’audio sul telefono, senza trascrizione o e-book separati.'],
    ['Mi servono un Kindle o un e-book per leggere mentre ascolto?', 'No. Non servono Kindle, e-book o un secondo acquisto. Importa un audio che possiedi e HushBook crea il testo sincronizzato sul dispositivo.'],
    ['In cosa HushBook è diverso da Audible Whispersync o Immersion Reading?', 'Whispersync e Immersion Reading dipendono di solito da Audible e da un e-book Kindle corrispondente. HushBook usa i tuoi file audio, genera il testo in privato sul telefono e non richiede account Amazon né caricamenti cloud.'],
    ['Leggere e ascoltare insieme aiuta concentrazione e comprensione?', 'Molti ascoltatori trovano che vedere e sentire le stesse parole ancori l’attenzione e aiuti a ricordare un capitolo più dell’audio da solo.'],
    ['HushBook è adatto a dislessia o ADHD?', 'Sì. L’evidenziazione parola per parola e i profili di lettura aiutano con dislessia, ADHD, ipovisione, apprendimento delle lingue e concentrazione.'],
    ['HushBook funziona offline?', 'Sì. Dopo il download iniziale di HushBook Engine, riproduzione, lettura sincronizzata e trascrizione funzionano sul dispositivo senza internet.'],
  ]),
  ja: pack([
    ['オーディオブックを聴きながら同時に読めますか？', 'はい。HushBookは話されたすべての単語を同期してハイライトするため、位置を失わずに読んだり聴いたりできます。'],
    ['オーディオブックに字幕やキャプションはありますか？', '多くのプレイヤーにはありません。HushBookは音声から単語単位の同期テキストを端末上で生成するので、別の文字起こしや電子書籍は不要です。'],
    ['聴きながら読むためにKindleや電子書籍は必要ですか？', 'いいえ。Kindle、電子書籍、追加購入は必要ありません。自分が持っている音声を取り込むと、HushBookが端末上で同期テキストを作成します。'],
    ['HushBookはAudible WhispersyncやImmersion Readingとどう違いますか？', 'WhispersyncやImmersion Readingは通常、Audibleと対応するKindle電子書籍に依存します。HushBookは自分の音声ファイルで動き、端末内でテキストを生成し、Amazonアカウントやクラウドへのアップロードを必要としません。'],
    ['読むことと聴くことを同時にすると集中や理解に役立ちますか？', '同じ言葉を見ながら聴くことで注意が声に固定され、音声だけより章の内容を覚えやすいと感じる人が多くいます。'],
    ['HushBookはディスレクシアやADHDに向いていますか？', 'はい。単語単位のハイライトと読書プロファイルは、ディスレクシア、ADHD、ロービジョン、語学学習などをサポートします。'],
    ['HushBookはオフラインで使えますか？', 'はい。HushBook Engineを一度ダウンロードすれば、再生、読み聞かせ、文字起こしはインターネットなしで端末上で動きます。'],
  ]),
  ko: pack([
    ['오디오북을 들으면서 동시에 읽을 수 있나요?', '네. HushBook은 말한 모든 단어를 동기화해 강조하므로 자리를 잃지 않고 읽고 들을 수 있습니다.'],
    ['오디오북에 자막이나 캡션이 있나요?', '대부분의 플레이어에는 없습니다. HushBook은 휴대폰에서 오디오로부터 단어 단위 동기화 텍스트를 만들어 별도 전사나 전자책이 필요하지 않습니다.'],
    ['들으면서 읽으려면 Kindle이나 전자책이 필요한가요?', '아니요. Kindle, 전자책, 추가 구매가 필요하지 않습니다. 가진 오디오를 가져오면 HushBook이 기기에서 동기화 텍스트를 만듭니다.'],
    ['HushBook은 Audible Whispersync나 Immersion Reading과 어떻게 다른가요?', 'Whispersync와 Immersion Reading은 보통 Audible과 호환되는 Kindle 전자책에 의존합니다. HushBook은 내 오디오 파일로 작동하고 기기에서 비공개로 텍스트를 만들며 Amazon 계정이나 클라우드 업로드가 필요 없습니다.'],
    ['읽기와 듣기를 함께 하면 집중력과 이해력에 도움이 되나요?', '같은 단어를 보며 들으면 주의가 목소리에 고정되고 오디오만 들을 때보다 장의 내용을 기억하기 쉽다고 느끼는 사람이 많습니다.'],
    ['HushBook은 난독증이나 ADHD에 좋은가요?', '네. 단어 단위 강조와 읽기 프로필은 난독증, ADHD, 저시력, 언어 학습, 단어를 보며 더 잘 집중하는 사람을 지원합니다.'],
    ['HushBook은 오프라인에서 작동하나요?', '네. HushBook Engine을 한 번 다운로드하면 재생, 따라 읽기, 전사는 인터넷 없이 기기에서 작동합니다.'],
  ]),
  nl: pack([
    ['Kan ik tegelijk een luisterboek lezen en beluisteren?', 'Ja. HushBook markeert elk gesproken woord synchroon, zodat je tegelijk kunt lezen en luisteren zonder je plek kwijt te raken.'],
    ['Hebben luisterboeken ondertitels of captions?', 'De meeste spelers niet. HushBook maakt op je telefoon gesynchroniseerde tekst uit je audio, zonder apart transcript of e-book.'],
    ['Heb ik een Kindle of e-book nodig om mee te lezen?', 'Nee. Je hebt geen Kindle, e-book of tweede aankoop nodig. Importeer audio die je bezit en HushBook maakt de gesynchroniseerde tekst op je apparaat.'],
    ['Wat is het verschil tussen HushBook en Audible Whispersync of Immersion Reading?', 'Whispersync en Immersion Reading zijn meestal afhankelijk van Audible en een bijpassend Kindle-e-book. HushBook werkt met je eigen audiobestanden, maakt tekst privé op je telefoon en vereist geen Amazon-account of cloud-upload.'],
    ['Helpt tegelijk lezen en luisteren bij focus en begrip?', 'Veel luisteraars vinden dat zien en horen van dezelfde woorden de aandacht verankert en helpt om een hoofdstuk beter te onthouden dan audio alleen.'],
    ['Is HushBook geschikt voor dyslexie of ADHD?', 'Ja. Woord-voor-woord markering en leesprofielen ondersteunen dyslexie, ADHD, slechtziendheid, talen leren en iedereen die beter focust met zichtbare woorden.'],
    ['Werkt HushBook offline?', 'Ja. Na de eenmalige download van HushBook Engine werken afspelen, meelezen en transcriptie op je apparaat zonder internet.'],
  ]),
  pl: pack([
    ['Czy mogę jednocześnie czytać i słuchać audiobooka?', 'Tak. HushBook synchronicznie podświetla każde wypowiedziane słowo, więc możesz czytać i słuchać bez gubienia miejsca.'],
    ['Czy audiobooki mają napisy lub podpisy?', 'Większość odtwarzaczy ich nie ma. HushBook tworzy na telefonie zsynchronizowany tekst z Twojego audio, bez osobnej transkrypcji ani e-booka.'],
    ['Czy potrzebuję Kindle’a lub e-booka, żeby czytać podczas słuchania?', 'Nie. Kindle, e-book ani drugi zakup nie są potrzebne. Zaimportuj posiadany plik audio, a HushBook utworzy tekst synchronizowany na urządzeniu.'],
    ['Czym HushBook różni się od Audible Whispersync lub Immersion Reading?', 'Whispersync i Immersion Reading zwykle wymagają Audible oraz pasującego e-booka Kindle. HushBook działa z własnymi plikami audio, tworzy tekst prywatnie na telefonie i nie wymaga konta Amazon ani wysyłania do chmury.'],
    ['Czy jednoczesne czytanie i słuchanie pomaga w skupieniu i zrozumieniu?', 'Wielu słuchaczy uważa, że widzenie i słyszenie tych samych słów skupia uwagę i pomaga zapamiętać rozdział lepiej niż samo audio.'],
    ['Czy HushBook pomaga przy dysleksji lub ADHD?', 'Tak. Podświetlanie słowo po słowie i profile czytania wspierają dysleksję, ADHD, słaby wzrok, naukę języków i lepsze skupienie.'],
    ['Czy HushBook działa offline?', 'Tak. Po jednorazowym pobraniu HushBook Engine odtwarzanie, czytanie synchroniczne i transkrypcja działają na urządzeniu bez internetu.'],
  ]),
  tr: pack([
    ['Bir sesli kitabı aynı anda okuyup dinleyebilir miyim?', 'Evet. HushBook konuşulan her kelimeyi senkron biçimde vurgular; böylece yerini kaybetmeden okuyup dinleyebilirsin.'],
    ['Sesli kitaplarda altyazı veya açıklama olur mu?', 'Çoğu oynatıcıda olmaz. HushBook telefonda sesinden senkron metin üretir; ayrı bir döküm ya da e-kitap gerekmez.'],
    ['Dinlerken okumak için Kindle veya e-kitap gerekir mi?', 'Hayır. Kindle, e-kitap ya da ikinci bir satın alma gerekmez. Sahip olduğun sesi içe aktar; HushBook metni cihazında senkronlar.'],
    ['HushBook, Audible Whispersync veya Immersion Reading’den nasıl farklı?', 'Whispersync ve Immersion Reading genellikle Audible ile eşleşen bir Kindle e-kitabına bağlıdır. HushBook kendi ses dosyalarınla çalışır, metni telefonda gizli üretir ve Amazon hesabı ya da bulut yüklemesi istemez.'],
    ['Aynı anda okumak ve dinlemek odaklanmaya ve anlamaya yardımcı olur mu?', 'Birçok dinleyici aynı kelimeleri görüp duymanın dikkati sabitlediğini ve bir bölümü yalnızca ses dinlemekten daha iyi hatırlattığını söyler.'],
    ['HushBook disleksi veya DEHB için uygun mu?', 'Evet. Kelime düzeyinde vurgulama ve okuma profilleri disleksi, DEHB, düşük görme, dil öğrenimi ve daha iyi odaklanmayı destekler.'],
    ['HushBook çevrimdışı çalışır mı?', 'Evet. HushBook Engine bir kez indirildikten sonra oynatma, eşlikli okuma ve deşifre internetsiz olarak cihazda çalışır.'],
  ]),
  ru: pack([
    ['Можно ли одновременно читать и слушать аудиокнигу?', 'Да. HushBook синхронно выделяет каждое произнесённое слово, поэтому можно читать и слушать, не теряя место.'],
    ['Есть ли в аудиокнигах субтитры или подписи?', 'В большинстве плееров — нет. HushBook создаёт синхронный текст из аудио прямо на телефоне, без отдельной расшифровки или электронной книги.'],
    ['Нужны ли Kindle или электронная книга, чтобы читать во время прослушивания?', 'Нет. Kindle, электронная книга и вторая покупка не нужны. Импортируйте аудио, которым владеете, и HushBook создаст текст на устройстве.'],
    ['Чем HushBook отличается от Audible Whispersync или Immersion Reading?', 'Whispersync и Immersion Reading обычно зависят от Audible и подходящей книги Kindle. HushBook работает с вашими аудиофайлами, создаёт текст на телефоне и не требует аккаунта Amazon или загрузки в облако.'],
    ['Помогает ли одновременное чтение и слушание сосредоточиться и лучше понять текст?', 'Многие слушатели считают, что видимые и слышимые одновременно слова удерживают внимание и помогают запомнить главу лучше, чем одно аудио.'],
    ['Подходит ли HushBook при дислексии или СДВГ?', 'Да. Подсветка каждого слова и профили чтения помогают при дислексии, СДВГ, слабом зрении, изучении языков и концентрации.'],
    ['Работает ли HushBook офлайн?', 'Да. После однократной загрузки HushBook Engine воспроизведение, чтение и расшифровка работают на устройстве без интернета.'],
  ]),
  uk: pack([
    ['Чи можна одночасно читати й слухати аудіокнигу?', 'Так. HushBook синхронно підсвічує кожне вимовлене слово, тож можна читати й слухати, не втрачаючи місце.'],
    ['Чи мають аудіокниги субтитри або підписи?', 'Більшість програвачів — ні. HushBook створює синхронний текст з аудіо просто на телефоні, без окремої транскрипції чи електронної книги.'],
    ['Чи потрібні Kindle або електронна книга, щоб читати під час слухання?', 'Ні. Kindle, електронна книга чи друга покупка не потрібні. Імпортуйте аудіо, яке маєте, і HushBook створить текст на пристрої.'],
    ['Чим HushBook відрізняється від Audible Whispersync або Immersion Reading?', 'Whispersync та Immersion Reading зазвичай залежать від Audible і відповідної книги Kindle. HushBook працює з вашими аудіофайлами, створює текст на телефоні й не потребує акаунта Amazon або хмарного завантаження.'],
    ['Чи допомагає одночасне читання й слухання зосередитися та краще зрозуміти текст?', 'Багато слухачів вважають, що одночасне бачення й чуття слів утримує увагу та допомагає запам’ятати розділ краще, ніж саме аудіо.'],
    ['Чи підходить HushBook для дислексії або СДУГ?', 'Так. Підсвічування кожного слова й профілі читання підтримують дислексію, СДУГ, слабкий зір, вивчення мов і концентрацію.'],
    ['Чи працює HushBook офлайн?', 'Так. Після одноразового завантаження HushBook Engine відтворення, читання та транскрипція працюють на пристрої без інтернету.'],
  ]),
  ar: pack([
    ['هل يمكنني القراءة والاستماع إلى الكتاب الصوتي في الوقت نفسه؟', 'نعم. يميّز HushBook كل كلمة منطوقة بالتزامن، لتقرأ وتستمع معًا من دون أن تفقد موضعك.'],
    ['هل تحتوي الكتب الصوتية على ترجمات أو تسميات؟', 'معظم المشغلات لا تفعل ذلك. ينشئ HushBook نصًا متزامنًا من الصوت على هاتفك، من دون تفريغ أو كتاب إلكتروني منفصل.'],
    ['هل أحتاج إلى Kindle أو كتاب إلكتروني للقراءة أثناء الاستماع؟', 'لا. لا تحتاج إلى Kindle أو كتاب إلكتروني أو شراء ثانٍ. استورد صوتًا تملكه، وينشئ HushBook النص المتزامن على جهازك.'],
    ['كيف يختلف HushBook عن Audible Whispersync أو Immersion Reading؟', 'تعتمد Whispersync وImmersion Reading عادةً على Audible وكتاب Kindle مطابق. يعمل HushBook مع ملفاتك الصوتية، وينشئ النص على الهاتف بخصوصية، ولا يتطلب حساب Amazon أو رفعًا إلى السحابة.'],
    ['هل تساعد القراءة والاستماع معًا على التركيز والفهم؟', 'يجد كثير من المستمعين أن رؤية الكلمات وسماعها معًا يثبت الانتباه ويساعد على تذكر الفصل أكثر من الصوت وحده.'],
    ['هل يناسب HushBook عسر القراءة أو اضطراب فرط الحركة وتشتت الانتباه؟', 'نعم. التمييز كلمة بكلمة وملفات القراءة تدعم عسر القراءة، واضطراب فرط الحركة وتشتت الانتباه، وضعف البصر، وتعلم اللغات.'],
    ['هل يعمل HushBook دون اتصال؟', 'نعم. بعد تنزيل HushBook Engine مرة واحدة، يعمل التشغيل والقراءة المتزامنة والتفريغ على الجهاز من دون إنترنت.'],
  ]),
  id: pack([
    ['Bisakah saya membaca dan mendengarkan audiobook secara bersamaan?', 'Bisa. HushBook menyorot setiap kata yang diucapkan secara sinkron, sehingga Anda dapat membaca dan mendengarkan tanpa kehilangan posisi.'],
    ['Apakah audiobook memiliki subtitle atau caption?', 'Sebagian besar pemutar tidak memilikinya. HushBook membuat teks tersinkron dari audio di ponsel Anda, tanpa transkrip atau ebook terpisah.'],
    ['Apakah saya membutuhkan Kindle atau ebook untuk membaca sambil mendengarkan?', 'Tidak. Anda tidak memerlukan Kindle, ebook, atau pembelian kedua. Impor audio yang Anda miliki, lalu HushBook membuat teks sinkron di perangkat.'],
    ['Apa perbedaan HushBook dari Audible Whispersync atau Immersion Reading?', 'Whispersync dan Immersion Reading biasanya bergantung pada Audible serta ebook Kindle yang sesuai. HushBook bekerja dengan file audio Anda, membuat teks secara privat di ponsel, dan tidak memerlukan akun Amazon atau unggahan cloud.'],
    ['Apakah membaca dan mendengarkan bersama membantu fokus dan pemahaman?', 'Banyak pendengar merasa melihat dan mendengar kata yang sama membuat perhatian lebih terarah dan membantu mengingat bab dibandingkan audio saja.'],
    ['Apakah HushBook cocok untuk disleksia atau ADHD?', 'Ya. Sorotan per kata dan profil membaca mendukung disleksia, ADHD, penglihatan rendah, belajar bahasa, dan siapa pun yang lebih fokus saat melihat kata-kata.'],
    ['Apakah HushBook bisa digunakan offline?', 'Bisa. Setelah mengunduh HushBook Engine sekali, pemutaran, baca-bersama, dan transkripsi berjalan di perangkat tanpa internet.'],
  ]),
  th: pack([
    ['สามารถอ่านและฟังหนังสือเสียงพร้อมกันได้ไหม?', 'ได้ HushBook ไฮไลต์ทุกคำที่พูดให้ตรงจังหวะ จึงอ่านและฟังพร้อมกันได้โดยไม่หลงตำแหน่ง'],
    ['หนังสือเสียงมีคำบรรยายหรือแคปชันไหม?', 'เครื่องเล่นส่วนใหญ่ไม่มี HushBook สร้างข้อความที่ซิงก์กับเสียงจากโทรศัพท์ของคุณ โดยไม่ต้องมีบทถอดเสียงหรืออีบุ๊กแยก'],
    ['ต้องมี Kindle หรืออีบุ๊กเพื่ออ่านไปพร้อมกับการฟังไหม?', 'ไม่ต้อง คุณไม่จำเป็นต้องมี Kindle อีบุ๊ก หรือซื้อซ้ำ เพียงนำเข้าไฟล์เสียงที่เป็นของคุณ แล้ว HushBook จะสร้างข้อความซิงก์บนอุปกรณ์'],
    ['HushBook ต่างจาก Audible Whispersync หรือ Immersion Reading อย่างไร?', 'Whispersync และ Immersion Reading มักต้องใช้ Audible กับอีบุ๊ก Kindle ที่ตรงกัน HushBook ใช้ไฟล์เสียงของคุณ สร้างข้อความบนโทรศัพท์แบบเป็นส่วนตัว และไม่ต้องใช้บัญชี Amazon หรืออัปโหลดขึ้นคลาวด์'],
    ['การอ่านและฟังพร้อมกันช่วยเรื่องสมาธิและความเข้าใจไหม?', 'ผู้ฟังจำนวนมากพบว่าการเห็นและได้ยินคำเดียวกันช่วยยึดความสนใจและจำเนื้อหาได้ดีกว่าการฟังเสียงอย่างเดียว'],
    ['HushBook เหมาะกับดิสเล็กเซียหรือ ADHD ไหม?', 'เหมาะ โปรไฟล์การอ่านและการไฮไลต์ทีละคำช่วยรองรับดิสเล็กเซีย ADHD สายตาเลือนราง การเรียนภาษา และคนที่จดจ่อได้ดีขึ้นเมื่อเห็นคำพูด'],
    ['HushBook ใช้งานออฟไลน์ได้ไหม?', 'ได้ หลังดาวน์โหลด HushBook Engine ครั้งเดียว การเล่น การอ่านตาม และการถอดเสียงจะทำงานบนอุปกรณ์โดยไม่ใช้อินเทอร์เน็ต'],
  ]),
  vi: pack([
    ['Tôi có thể vừa đọc vừa nghe sách nói cùng lúc không?', 'Có. HushBook làm nổi bật từng từ được đọc theo thời gian thực, để bạn đọc và nghe cùng lúc mà không mất vị trí.'],
    ['Sách nói có phụ đề hay chú thích không?', 'Phần lớn trình phát không có. HushBook tạo văn bản đồng bộ từ audio ngay trên điện thoại, không cần bản chép lời hay ebook riêng.'],
    ['Tôi có cần Kindle hoặc ebook để đọc khi nghe không?', 'Không. Bạn không cần Kindle, ebook hay mua thêm. Nhập audio bạn sở hữu và HushBook tạo văn bản đồng bộ trên thiết bị.'],
    ['HushBook khác Audible Whispersync hay Immersion Reading như thế nào?', 'Whispersync và Immersion Reading thường phụ thuộc vào Audible cùng ebook Kindle tương ứng. HushBook dùng file audio của bạn, tạo văn bản riêng tư trên điện thoại và không cần tài khoản Amazon hay tải lên cloud.'],
    ['Đọc và nghe cùng lúc có giúp tập trung và hiểu tốt hơn không?', 'Nhiều người nghe thấy việc nhìn và nghe cùng một từ giúp giữ sự chú ý và nhớ một chương tốt hơn so với chỉ nghe audio.'],
    ['HushBook có phù hợp với chứng khó đọc hoặc ADHD không?', 'Có. Tô sáng từng từ và hồ sơ đọc hỗ trợ chứng khó đọc, ADHD, thị lực kém, học ngôn ngữ và bất kỳ ai tập trung tốt hơn khi nhìn thấy từ mình nghe.'],
    ['HushBook có hoạt động ngoại tuyến không?', 'Có. Sau khi tải HushBook Engine một lần, phát lại, đọc theo và chuyển giọng nói thành văn bản đều chạy trên thiết bị không cần internet.'],
  ]),
  sv: pack([
    ['Kan jag läsa och lyssna på en ljudbok samtidigt?', 'Ja. HushBook markerar varje talat ord i synk, så att du kan läsa och lyssna utan att tappa bort dig.'],
    ['Har ljudböcker undertexter eller captions?', 'De flesta spelare har inte det. HushBook skapar synkad text från ljudet på telefonen, utan separat transkription eller e-bok.'],
    ['Behöver jag en Kindle eller e-bok för att läsa med?', 'Nej. Du behöver varken Kindle, e-bok eller ett andra köp. Importera ljud du äger så skapar HushBook synkad text på enheten.'],
    ['Hur skiljer sig HushBook från Audible Whispersync eller Immersion Reading?', 'Whispersync och Immersion Reading kräver vanligtvis Audible och en matchande Kindle-bok. HushBook fungerar med dina egna ljudfiler, skapar text privat på telefonen och kräver inget Amazon-konto eller molnuppladdning.'],
    ['Hjälper det fokus och förståelse att läsa och lyssna samtidigt?', 'Många lyssnare upplever att det hjälper att se och höra samma ord för att hålla fokus och minnas ett kapitel bättre än med bara ljud.'],
    ['Är HushBook bra för dyslexi eller ADHD?', 'Ja. Ord-för-ord-markering och läsprofiler stödjer dyslexi, ADHD, nedsatt syn, språkinlärning och alla som fokuserar bättre när de ser orden.'],
    ['Fungerar HushBook offline?', 'Ja. Efter den engångsnedladdning av HushBook Engine fungerar uppspelning, följläsning och transkribering på enheten utan internet.'],
  ]),
  da: pack([
    ['Kan jeg læse og lytte til en lydbog på samme tid?', 'Ja. HushBook fremhæver hvert talte ord synkront, så du kan læse og lytte uden at miste stedet.'],
    ['Har lydbøger undertekster eller captions?', 'De fleste afspillere har ikke. HushBook laver synkroniseret tekst fra din lyd på telefonen uden separat transskription eller e-bog.'],
    ['Skal jeg have en Kindle eller e-bog for at læse med?', 'Nej. Du behøver hverken Kindle, e-bog eller et ekstra køb. Importér lyd, du ejer, så laver HushBook den synkroniserede tekst på enheden.'],
    ['Hvordan adskiller HushBook sig fra Audible Whispersync eller Immersion Reading?', 'Whispersync og Immersion Reading afhænger normalt af Audible og en tilsvarende Kindle-e-bog. HushBook fungerer med dine egne lydfiler, laver teksten privat på telefonen og kræver hverken Amazon-konto eller cloud-upload.'],
    ['Hjælper det fokus og forståelse at læse og lytte samtidig?', 'Mange lyttere oplever, at det at se og høre de samme ord fastholder opmærksomheden og gør et kapitel lettere at huske end lyd alene.'],
    ['Er HushBook god til ordblindhed eller ADHD?', 'Ja. Ord-for-ord-fremhævning og læseprofiler støtter ordblindhed, ADHD, nedsat syn, sprogindlæring og alle, der fokuserer bedre ved at se ordene.'],
    ['Virker HushBook offline?', 'Ja. Efter den ene download af HushBook Engine fungerer afspilning, følgelæsning og transskription på enheden uden internet.'],
  ]),
};

// Regional variants share the same language copy while keeping their own
// regional SEO title and metadata in seo-regional-books.js.
FAQ_ADDITIONS['es-ES'] = FAQ_ADDITIONS.es;
FAQ_ADDITIONS['es-419'] = FAQ_ADDITIONS.es;
FAQ_ADDITIONS['pt-BR'] = FAQ_ADDITIONS.pt;
FAQ_ADDITIONS['pt-PT'] = FAQ_ADDITIONS.pt;

module.exports = { FAQ_ADDITIONS };
