import sys
path, chap = sys.argv[1], sys.argv[2]
html = open(path, encoding='utf-8').read()
lines = open(chap, encoding='utf-8').read().splitlines()
para1 = lines[1]  # first paragraph only
start = html.index('      // TEMP (blog image): Jane Eyre, Chapter I')
end = html.index("      const CHAPTER_TITLE = '01 - Chapter 01';")
end = html.index('\n', end) + 1
new = (
"      // TEMP (blog image): The Brothers Karamazov, Book I, Chapter I, Project Gutenberg #28054\n"
"      // (Constance Garnett's translation, public domain), first paragraph, set as a transcript reads\n"
"      // (no quotation marks, dashes as commas): scripts/images/gut_js.py.\n"
"      const CHAPTER = [\n" + para1 + "\n      ];\n"
"      // The chapter's title as the app stores it for this recording: the archive.org file title of\n"
"      // brotherskaramazov3_01_dostoyevsky_64kb.mp3 (item brothers_karamazov_v3_2002_librivox), which\n"
"      // Discover imports as is. The book's chapter 1 of 96.\n"
"      const CHAPTER_TITLE = '01 - 01.01 Fyodor Pavlovitch Karamazov';\n")
html = html[:start] + new + html[end:]
old_len = "      const CHAPTER_LEN = 800;              // \"01 - Chapter 01\", 13:20 (archive.org length; 64 kbps 6,400,962 bytes = 800.1 s; VBR copy 800.22 s)"
assert old_len in html
html = html.replace(old_len, "      const CHAPTER_LEN = 579;              // file 01, 09:38 (archive.org length; 64 kbps 4,634,395 bytes = 579.3 s)")
old_cov = "      const COVER_AVERAGE = '#796D48';      // the item's cover (services/img and Jane_Eyre_1002.jpg), 16 px wide decode"
assert old_cov in html
html = html.replace(old_cov, "      const COVER_AVERAGE = '#D7CAB4';      // the item's cover tile (services/img, which the app downloads), 16 px wide decode; #D8CAB4 from brothers_karamazov_3.jpg")
old_b = "      const BREATHS = ['the cold winter wind had brought with it', 'humbled by the consciousness'];"
assert old_b in html
html = html.replace(old_b, "      const BREATHS = ['Alexey Fyodorovitch Karamazov was the third son', 'still remembered among us'];")
open(path, 'w', encoding='utf-8', newline='').write(html)
print('ok')
