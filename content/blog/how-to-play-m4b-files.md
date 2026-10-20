# How to Play M4B Files on iPhone, Android, Windows and Mac

Open it in a player made for audiobooks. On Android, use Voice, VLC or Smart AudioBook Player. On iPhone, use BookPlayer or HushBook, or import it into Apple Books on a Mac and sync it across. On Windows, use VLC. On a Mac, use Apple Books or VLC. All of these keep your chapters, and most remember where you stopped.

If the file still will not play in any of them, it is almost certainly protected by DRM, the copy protection on store purchases, rather than a problem with M4B itself. More on that at the end.

## What is an M4B file?

An M4B file is an audiobook in the same container as an M4A music file: AAC audio inside an MPEG-4 file. The MP4 Registration Authority, which keeps the official list of MP4 file types, describes M4B as an iTunes audiobook that "can contain audio + video + 3g text track + chapter track." The US Library of Congress calls M4B files "'Bookmarkable' AAC files used for audio books."

In practice that means one file for the whole book, with chapter markers and support for remembering your place. Many simple music players can play the audio, but they treat the book as one 12-hour song. We compare it with MP3 in [M4B vs MP3](/blog/m4b-vs-mp3).

## How to play M4B files on Android

Android has no built-in audiobook player, and Google Play Books only lets you upload PDF and EPUB files, not audio. Install one of these instead:

- **Voice.** Free and open source. Its developer lists support for "local M4B, MP3, M4A, OGG, OGA, and OPUS audiobooks" with chapter navigation. A good first choice if you want something simple.
- **VLC for Android.** Free. It added chapter selection for audiobooks in version 3.3.1 and chapter navigation in the audio player in 3.6.0.
- **Smart AudioBook Player.** A long-running audiobook player with M4B chapter support. The full version is free for the first 30 days, then it drops to a basic version unless you upgrade.
- **HushBook.** Plays M4B with chapters and cover art, and adds word-by-word text you can read along with. More below.

To get the file onto your phone, copy it over USB into a folder such as Audiobooks, or download it from cloud storage. Then open the folder from your player.

## How to play M4B files on iPhone and iPad

This is the awkward one. The Books app on iPhone and iPad has no import button for audio files. In a 2024 test by ProVideo Coalition, opening a DRM-free M4B on an iPhone did nothing at all. You have two options.

**Use an audiobook app that imports from Files.**

- **BookPlayer.** Free and open source. It plays "M4B/M4A/MP3" with chapters, and imports from the Files app, other apps and AirDrop.
- **HushBook.** Tap Import audiobook in the Library and pick the file from Files. Chapters and cover art come along when the file has them.

Put the M4B in iCloud Drive or On My iPhone first, then import it from the app.

**Or go through a Mac.** Apple's supported route is to import the audiobook into Books on a Mac, then sync it. Connect the iPhone, select it in the Finder sidebar, open the Audiobooks tab, tick "Sync audiobooks onto" your device, and click Apply.

## How to play M4B files on a Mac

- **Apple Books.** Choose File, then Import, select the file and click Import. Apple's help page names MP3 and Audible audiobooks rather than M4B, but in ProVideo Coalition's test a DRM-free M4B opened straight into Books with its chapters. To jump to a chapter, open the book from Library, then Audiobooks, and use its table of contents.
- **VLC.** Free, and plays M4B with chapters, the same way as on Windows below.

## How to play M4B files on Windows 10 and 11

- **VLC.** The most reliable free option. VLC recognises the .m4b extension, and you can jump between chapters from Playback, then Chapter. Ctrl+T jumps to a specific time.
- **Audibly.** A free, open-source audiobook player for Windows 10 and 11. Its developer lists support for .m4b and .mp3 files.
- **The built-in Media Player.** Microsoft's list of audio formats Windows supports out of the box includes AAC and M4A, but not M4B. Some files may open, but do not count on it, and you will not get audiobook features. VLC is the safer choice.

## Why won't my M4B file play?

- **It is protected.** The Library of Congress notes that M4B files bought from the iTunes Store play only on authorised devices and computers. Audible's downloads use Audible's own AA and AAX formats, which are not M4B at all and play in the Audible app. No ordinary player can open protected files.
- **There are no chapters.** Chapters only appear if the file contains chapter markers. If someone made the M4B by joining MP3 files together without adding markers, every player will show it as one long track.
- **You are using a music player.** It may play the audio but lose your place, ignore chapters, or shuffle the book into your music. Use an audiobook player.
- **The file is incomplete.** A whole audiobook can be several hundred megabytes. If the download or copy was interrupted, the file may not open. Copy it again.

## Read along with your M4B files in HushBook

[HushBook](/) plays M4B files on iPhone, iPad and Android, with chapters, cover art and saved position. Then it does something other players do not: it transcribes the audiobook on your phone and highlights each word as the narrator says it, so you can read along. Tap any word to jump the audio there.

The transcript is made on the device, so the audio is never uploaded, and there is no account. Listening can start while the rest of the book transcribes. It also plays MP3, M4A, FLAC, OGG, OPUS and more. Like every player above, it cannot open DRM-protected files such as Audible downloads. The [M4B player](/m4b-player) page has the details.

## Sources

- [MP4 Registration Authority, "Brands"](https://mp4ra.org/registered-types/brands)
- [Library of Congress, "QuickTime Audio, AAC Codec"](https://www.loc.gov/preservation/digital/formats/fdd/fdd000110.shtml)
- [Apple Support, "Import books, audiobooks, or PDFs in Books on Mac"](https://support.apple.com/guide/books/import-books-audiobooks-or-pdfs-ibkseed72068/mac)
- [Apple Support, "Listen to audiobooks in Books on Mac"](https://support.apple.com/guide/books/listen-to-audiobooks-ibks9a460640/mac)
- [Apple Support, "Sync audiobooks between your Mac and iPhone, iPad, or iPod touch"](https://support.apple.com/guide/mac-help/sync-audiobooks-to-your-device-mchlf764c5a4/15.0/mac/15.0)
- [Tépper (2024), "Apple Books app: inconsistent among formats & platforms", ProVideo Coalition](https://provideocoalition.com/apple-books-app-inconsistent-among-formats-platforms/)
- [BookPlayer on GitHub](https://github.com/TortugaPower/BookPlayer)
- [Voice on GitHub](https://github.com/PaulWoitaschek/Voice) and [on F-Droid](https://f-droid.org/packages/de.ph1b.audiobook/)
- [VLC for Android release notes](https://raw.githubusercontent.com/videolan/vlc-android/master/NEWS)
- [VideoLAN wiki, "Documentation: Playback"](https://wiki.videolan.org/Documentation:Playback)
- [VLC source, supported audio extensions](https://raw.githubusercontent.com/videolan/vlc/3.0.x/include/vlc_interface.h)
- [Microsoft Support, "Troubleshoot Windows Media Player errors"](https://support.microsoft.com/en-us/windows/apps/windowsmediaplayer/troubleshoot-windows-media-player-errors)
- [Google Play Help, "Upload PDF and EPUB files to your library"](https://support.google.com/googleplay/answer/11012086)
- [Audibly on GitHub](https://github.com/rstewa/Audibly)
