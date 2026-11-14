"""Copied unchanged 2026-11-14 from ../../2026-11-13-best-jane-eyre-audiobook/scripts/je-pdftext.py (new there); run on the Hallow Pray40 2026 reading plan."""
"""Extract the text of a PDF (a publisher booklet) with pypdf. New 2026-11-13. Usage: python -I bk-pdftext.py <file.pdf> <out.txt>"""
import sys
from pypdf import PdfReader
r = PdfReader(sys.argv[1])
open(sys.argv[2], "w", encoding="utf-8").write("\n".join((p.extract_text() or "") for p in r.pages))
print(len(r.pages), "pages")
