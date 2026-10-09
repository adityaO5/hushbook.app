# M4B vs MP3: Which Audiobook Format Should You Use?

Short answer: for an audiobook, M4B is usually the better file to keep, and MP3 is the one that plays everywhere.

An M4B is a single file that holds the whole book, with chapter markers, cover art, and a place-saving flag that tells audiobook apps to remember where you stopped. An MP3 audiobook is normally a folder of separate files, one per chapter or part. Both play fine on a modern phone. The real differences are how tidy your library is, how chapters work, and which devices you need to support.

I build an audiobook app that imports both, so I see a lot of each. Here's what actually matters when you choose.

## What is an M4B file?

M4B is an audio file in the MPEG-4 container, the same family as M4A and MP4. The audio inside is almost always AAC. In practice, an M4B is close to an M4A with a different extension. The extension is what tells players like Apple Books "this is an audiobook, not a song".

That small label changes how apps treat it. Audiobook players remember your position, show a chapter list, and keep the book out of your music library. The LibriVox wiki sums it up well: the main practical difference from an album of MP3s is that an M4B remembers your place when you stop.

Chapters live inside the file as a chapter index, so a 14-hour novel can be one file with 40 named chapters you can jump between.

## What is an MP3 audiobook?

MP3 is the oldest common audio format still in daily use. Almost every device made in the last 25 years can play it: phones, car stereos, old iPods, smart speakers, cheap MP3 players.

An MP3 audiobook is usually a set of files, named so they sort in order (`01 Chapter One.mp3`, `02 Chapter Two.mp3`, and so on). The ID3 tags in each file carry the title, author, track number and often the cover art. Your app has to read those tags or file names to keep the chapters in order.

MP3 can technically store chapter markers too, but few players read them. Treat an MP3 audiobook as "one file per chapter" and you won't be surprised.

## M4B vs MP3 at a glance

- **Files per book:** M4B is usually one file. MP3 is usually one file per chapter.
- **Chapters:** M4B has a built-in, named chapter list. MP3 relies on separate files.
- **Remembering your place:** built into audiobook players for M4B. For MP3 it depends on the app.
- **Audio:** M4B usually holds AAC, which generally sounds a bit better than MP3 at the same bitrate.
- **Compatibility:** M4B plays on phones, Apple Books, VLC and most audiobook apps. MP3 plays on nearly everything.
- **DRM:** store copies of M4B can be locked (for example by Apple's FairPlay). MP3 files rarely are.

## Which sounds better?

At the same bitrate, AAC (inside an M4B) generally sounds better than MP3. Put another way, an M4B can match an MP3's quality in a smaller file.

For speech, though, the gap is small. A narrator's voice doesn't need much data. LibriVox offers its recordings as 64 kbps and 128 kbps MP3, and says the difference between the two is barely noticeable when listening. Don't re-buy or re-encode a book to chase quality you won't hear.

What you should avoid is converting back and forth. Both formats are lossy, so turning an M4B into MP3 (or the other way) throws away a little more detail each time. Keep the original file, and convert a copy only if a device can't play it.

## When to choose M4B

- You listen on a phone with an audiobook app.
- You want one file per book instead of a folder of 60 tracks.
- You jump around by chapter and want the chapter names on screen.
- You care about storage and want the smaller file for the same quality.

## When to choose MP3

- You need it to play in an older car stereo, a basic MP3 player, or a smart speaker.
- You want to edit, split or share single chapters.
- The book was only released as MP3. Many free recordings are, and there's no reason to convert them for a phone.

## M4A vs M4B: what's the difference?

Mostly the label. Both are MPEG-4 audio, usually AAC. The `.m4b` extension tells the player to treat the file as an audiobook: remember the position, show chapters, and file it under books. The `.m4a` extension says "music track". If an audiobook app doesn't see your M4A as a book, the extension is often the reason.

## Should you convert M4B to MP3?

Only if a device you rely on can't play M4B. In that case, convert a copy and keep the original. Expect to lose the built-in chapter list unless your converter splits the file at each chapter.

Two things conversion won't fix:

- **DRM.** Audiobooks bought from some stores are locked to that store's app. Apple has used FairPlay for protected M4B files, and Audible uses its own AAX format. A file that is locked is not an ordinary M4B you can move between apps, and you should use the store's own app for it.
- **Messy chapters.** If the source file has bad chapter marks, the converted copies will have the same problem.

## Where free audiobooks come in each format

LibriVox, the volunteer project that records public-domain books, offers each chapter as MP3 (64 kbps and 128 kbps) and lists an M4B for most books on the catalogue page. Libro.fm and some other stores sell DRM-free audiobooks you can download as files. If you're new to free sources, LibriVox is a good place to start because every recording is in the public domain.

## Reading along with either format

This is the part I work on. HushBook imports M4B and MP3, along with AAC, FLAC, OGG, OPUS, WAV and a few others, one file per import. With an M4B, the chapters and cover art come in with the book. Then the app transcribes the recording on your phone and highlights each word as the narrator says it, so you can read along.

The format doesn't change the transcript much. Narration quality does: a clean studio recording transcribes better than a noisy one, whichever container it's in. A transcript made by speech recognition also isn't the publisher's proofread text, so unusual names can come out wrong.

HushBook can't import M4B files with DRM, or Audible's protected downloads. There's more detail on the [M4B player page](/m4b-player), and on [getting text for an audiobook](/audiobook-with-text). If you're curious about reading and listening at the same time, start with [what immersive reading is](/blog/what-is-immersive-reading).

## The verdict

If you're building a library to listen to on your phone, keep M4B. One file per book, real chapters, smaller size, and your app remembers your place. If you need the widest compatibility, or the book only came as MP3, MP3 is perfectly fine. A narrator's voice sounds good in both.

## Sources and further reading

- [LibriVox wiki: How To Make M4B Files](https://wiki.librivox.org/index.php/How_To_Make_M4B_Files)
- [LibriVox wiki: How To Get LibriVox Audio Files](https://wiki.librivox.org/index.php/How_To_Get_LibriVox_Audio_Files)
- [FileFormat.com: What is an M4B file?](https://docs.fileformat.com/audio/m4b)
- [LibriVox: free public-domain audiobooks](https://librivox.org/)
- [HushBook M4B player guide](/m4b-player)
