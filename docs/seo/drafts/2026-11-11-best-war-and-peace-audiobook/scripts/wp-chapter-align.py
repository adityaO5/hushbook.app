"""Line up the Maude chapters (Gutenberg #2600) with the Russian chapters (Wikisource, Jubilee
edition) to show where the two chapter counts differ.

Usage:
    python -I wp-wordcount.py <pg2600.txt> > en.txt
    python -I wp-russian-wordcount.py count <folder> > ru.txt
    python -I wp-chapter-align.py en.txt ru.txt

Both scripts print one "CH<TAB>book<TAB>chapter<TAB>words<TAB>first words" line per chapter.
Maude's 15 books map one to one onto the Russian volume parts (Book 1 = Vol 1 Part 1 ...
Book 15 = Vol 4 Part 4; First and Second Epilogue = Epilogue Parts 1 and 2). For each book
the script prints both chapter lists side by side with the English/Russian word ratio, so a
Russian chapter that Maude splits in two shows up as one Russian row against two English rows.
"""
import sys

ORDER_EN = ["BOOK ONE", "BOOK TWO", "BOOK THREE", "BOOK FOUR", "BOOK FIVE", "BOOK SIX",
            "BOOK SEVEN", "BOOK EIGHT", "BOOK NINE", "BOOK TEN", "BOOK ELEVEN", "BOOK TWELVE",
            "BOOK THIRTEEN", "BOOK FOURTEEN", "BOOK FIFTEEN", "FIRST EPILOGUE", "SECOND EPILOGUE"]


def read(path):
    books = {}
    order = []
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            if not line.startswith("CH\t"):
                continue
            _, book, chap, n, first = line.rstrip("\n").split("\t", 4)
            if book not in books:
                books[book] = []
                order.append(book)
            books[book].append((chap, int(n), first))
    return books, order


def main(en_path, ru_path):
    sys.stdout.reconfigure(encoding="utf-8")
    en, _ = read(en_path)
    ru, ru_order = read(ru_path)
    total_en = total_ru = 0
    for en_book, ru_book in zip(ORDER_EN, ru_order):
        e, r = en[en_book], ru[ru_book]
        total_en += len(e)
        total_ru += len(r)
        flag = "" if len(e) == len(r) else "   <-- differs"
        print(f"{en_book} ({len(e)} ch) = {ru_book} ({len(r)} ch){flag}")
        if len(e) != len(r):
            for i in range(max(len(e), len(r))):
                a = e[i] if i < len(e) else ("", 0, "")
                b = r[i] if i < len(r) else ("", 0, "")
                ratio = f"{a[1] / b[1]:.2f}" if a[1] and b[1] else "-"
                print(f"   EN {a[0]:>3} {a[1]:>5} {a[2][:45]:<45} | RU {b[0]:>5} {b[1]:>5} {b[2][:45]:<45} | {ratio}")
    print("total chapters: Maude", total_en, "| Russian", total_ru)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit("usage: python -I wp-chapter-align.py <en.txt> <ru.txt>")
    main(sys.argv[1], sys.argv[2])
