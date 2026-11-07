// Editable inputs for tools/seo/keyword-scout.mjs.
// Change topic decisions here, not in the script. Every regex runs against a
// lowercased phrase. See tools/seo/README.md for how each list feeds the score.

// Pains that synced, word-level text solves. A phrase earns the weight of the
// strongest matching category plus half of each other match, capped at 100.
export const fit = [
  { id: 'synced-text', weight: 40, re: /read(ing)?[ -]?along|read and listen|listen and read|listen(ing)? while read|read(ing)? while listen|same time|with (the )?text|with words|transcri|subtitle|caption|follow along|karaoke|highlight|immersi|whispersync|sync/ },
  { id: 'language-learning', weight: 35, re: /\blearn|english|spanish|french|german|italian|portuguese|\besl\b|\bell\b|language|vocab|pronunciation|fluen|accent|bilingual|graded reader/ },
  { id: 'accessibility', weight: 30, re: /dyslex|adhd|deaf|hard of hearing|hearing (loss|aid|impair)|auditory processing|\bapd\b|accessib|disabilit/ },
  { id: 'focus-retention', weight: 25, re: /focus|zone out|zoning|lose track|losing track|lost (my )?place|concentrat|remember|retain|retention|comprehen|understand|mind wander|attention|distract|fall(ing)? asleep|can'?t finish|finish (a )?book|did not finish|dnf|slump|reading rut|lost interest in reading|stopped reading|can'?t read (books )?anymore|hard to read|attention span/ },
  { id: 'missed-words', weight: 20, re: /replay|rewind|go back|missed|repeat|re-?listen|mumbl|unclear|hard to (hear|understand)|names|spell/ },
  { id: 'speed', weight: 15, re: /speed|faster|slower|\bslow\b|words per minute|\bwpm\b|\d(\.\d)?x\b/ },
  { id: 'kids', weight: 15, re: /\bkids?\b|child|toddler|bedtime|reading level|\bteen|young reader|picture book/ },
  { id: 'own-files', weight: 15, re: /\bm4b\b|\bmp3\b|\bm4a\b|own files|local files|downloaded|import|\bdrm\b|player/ },
  { id: 'offline-private', weight: 15, re: /offline|without (internet|wifi|wi-fi|data)|no (internet|wifi)|privacy|private|no account|no subscription|without subscription/ },
  { id: 'free-classics', weight: 10, re: /librivox|public domain|classic|gutenberg|\bfree\b/ },
  { id: 'notes-quotes', weight: 15, re: /notes?\b|quote|annotat|bookmark|clip/ },
];

// Phrases with no reader pain (creator, account, piracy, shopping intent, riddles,
// writers finishing their own book) or navigational to another product with the same
// words (Google's Read Along kids app, Microsoft Immersive Reader). Fit drops to 0.
export const offFit = /read along (by )?google|google read along|read along (google )?classroom|read along (app )?(download|for pc|for laptop|for windows)|bolo app|immersive reader(?!.*(audio|kindle|book))|quiz bee|riddle|finish(ing)? a sentence|not a sentence|without a sentence|finish (writing|my novel|your novel)|write a book|writing a book|\bai to finish|finish (a |an |my |the |your )?(paper|essay|thesis|draft|manuscript|novel|puzzle)|finish what you start|narrat(or|ion) (job|career|salary|pay|rate)|become a narrator|how to (make|record|create|narrate|publish|sell|produce) an? audiobook|\bacx\b|voice ?over|voice actor|royalt|torrent|pirat|crack|mod apk|apk\b|login|log in|sign in|customer service|cancel|refund|gift card|stock|\bipo\b|coupon|promo code|discount|net worth|equipment|microphone|studio|ai voice generator|text to speech generator|summary of|immersive reader (in |on |for )?(outlook|word|onenote|teams|edge|windows|chrome|office|canvas|pdf|download|shortcut|turn off|disable|not working)/;

// Topics already rejected after live checks. Matching families get a penalty and a
// REJECTED flag; they stay in the JSON but leave the shortlist. Re-propose only with
// new evidence and say why.
export const rejected = [
  { id: 'transcript', re: /transcript of (an? |the )?audio ?book|audio ?books? transcripts?|get (the )?text (of|from) (an? )?audio ?book|audio ?book to text|convert (an? )?audio ?book to (text|pdf|ebook)/, why: 'Rejected 4 times: the SERP is DRM-removal vendors and HushBook has no plain-text export.' },
  { id: 'internet-archive', re: /internet archive|archive\.org/, why: 'Piracy long tail; rejected 2026-11-04.' },
  { id: 'search-cite', re: /\bcite\b|citation|search (in|inside|within) (an? )?audio ?book|search (an? )?audio ?book for/, why: 'Rejected 2026-11-04: low demand, no product answer.' },
  { id: 'blind-low-vision', re: /\bblind\b|low vision|visually impaired|\bnls\b|\brnib\b|talking books? (for|program)/, why: 'NLS and RNIB own the SERP.' },
  { id: 'seniors', re: /senior|elderly|older (adults|people)|grandparent|dementia/, why: 'Device intent; rejected 2026-11-04.' },
  { id: 'students', re: /\bstudents?\b|college|universit|\bschool\b|homework/, why: 'Rejected 2026-11-04.' },
  { id: 'textbooks', re: /textbook/, why: 'Rejected 2026-11-04.' },
  { id: 'autism', re: /autis/, why: 'Rejected 2026-11-04.' },
  { id: 'concussion', re: /concussion|brain injury|\btbi\b/, why: 'Rejected 2026-11-04.' },
  { id: 'while-listening', re: /what to do while (listening|you listen)|things to do while listening/, why: 'NO-GO 2026-10-20: BookRiot listicles own it; folded into how-to-focus.' },
  { id: 'audible-subtitles', re: /audible.*(subtitle|caption|closed caption)|(subtitle|caption).*audible/, why: 'GSC already sends these to can-you-read-along-with-audible.' },
  { id: 'audiobook-vs-reading', re: /(audio ?books?|listening).*(vs\.?|versus|better than|or) (reading|physical books?|real books?)|(reading|physical books?).*(vs\.?|versus|or) (audio ?books?|listening)/, why: 'Covered by does-listening-to-audiobooks-count-as-reading; needs a new angle.' },
];

// Domain classes for the SERP weakness signal. Suffix match on the hostname.
export const forumDomains = ['reddit.com', 'quora.com', 'stackexchange.com', 'stackoverflow.com', 'discussions.apple.com', 'community.spotify.com', 'forum.librivox.org', 'librivox.org/forum', 'goodreads.com/topic', 'answers.microsoft.com', 'support.google.com/*/thread', 'tiktok.com', 'facebook.com', 'tapatalk.com', 'boards.', 'forum.', 'forums.', 'community.'];
export const videoDomains = ['youtube.com', 'youtu.be', 'vimeo.com'];
export const authorityDomains = [
  'wikipedia.org', 'britannica.com', 'gov', 'edu', 'nih.gov', 'ac.uk', 'gov.uk',
  'apple.com', 'support.apple.com', 'google.com', 'microsoft.com', 'amazon.com', 'audible.com', 'audible.co.uk', 'spotify.com', 'overdrive.com', 'libbyapp.com', 'hoopladigital.com', 'kobo.com', 'storytel.com', 'everand.com', 'scribd.com', 'librivox.org', 'gutenberg.org', 'goodreads.com',
  'nytimes.com', 'theguardian.com', 'bbc.co.uk', 'bbc.com', 'npr.org', 'washingtonpost.com', 'forbes.com', 'businessinsider.com', 'cnet.com', 'pcmag.com', 'theverge.com', 'wired.com', 'techradar.com', 'tomsguide.com', 'zdnet.com', 'engadget.com', 'macworld.com', 'androidauthority.com', 'lifehacker.com', 'nypost.com', 'usatoday.com', 'cnn.com',
  'bookriot.com', 'penguinrandomhouse.com', 'harpercollins.com', 'publishersweekly.com', 'libraryjournal.com', 'ala.org',
  'healthline.com', 'verywellmind.com', 'psychologytoday.com', 'understood.org', 'webmd.com', 'mayoclinic.org', 'clevelandclinic.org', 'dyslexiaida.org', 'chadd.org', 'additudemag.com',
  'britishcouncil.org', 'duolingo.com', 'fluentu.com', 'babbel.com',
];

// Subreddit for the scoped Reddit search (the global search runs too).
export const subreddit = 'audiobooks';

// Brand terms excluded from the GSC gap list.
export const brand = /hush ?book|hushbook/;

// Platform and device words. Families that name different platforms are different
// topics ("libby offline" is not "audiobooks offline"), so the ranked list never merges them.
export const platforms = ['audible', 'libby', 'overdrive', 'hoopla', 'spotify', 'kindle', 'amazon', 'apple', 'itune', 'ibook', 'google', 'youtube', 'kobo', 'storytel', 'everand', 'scribd', 'chirp', 'bookbeat', 'speechify', 'librivox', 'netflix', 'pocket', 'iphone', 'ipad', 'android', 'window', 'mac', 'pc', 'alexa', 'echo', 'car', 'carplay', 'tesla', 'garmin', 'vlc', 'plex', 'audiobookshelf', 'bookplayer', 'prologue', 'goodread', 'kid'];

// A family is about books when at least 30% of its phrasings match this. Otherwise its
// Fit keeps 40% (generic speech-to-text or "immersive learning" queries are not reader pains).
export const bookContext = /audio ?books?|\bbooks?\b|\bread|listen|narrat|librivox|gutenberg|novel|\bstor(y|ies)\b|chapter|author|kindle|audible|libby|\bm4b\b|bedtime/;
