#!/usr/bin/env python3
"""Make asset URLs root-relative inside generated locale pages."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOCALES = [
    "de", "fr", "es-ES", "es-419", "pt-BR", "pt-PT", "it", "ja", "ko",
    "nl", "pl", "tr", "ru", "uk", "ar", "id", "th", "vi", "sv", "da",
]

replacements = (
    ('src="assets/', 'src="/assets/'),
    ("src='assets/", "src='/assets/"),
    ('href="assets/', 'href="/assets/'),
    ("href='assets/", "href='/assets/"),
    ('poster="assets/', 'poster="/assets/'),
    ("poster='assets/", "poster='/assets/"),
    ('url(assets/', 'url(/assets/'),
    ('url("assets/', 'url("/assets/'),
    ("url('assets/", "url('/assets/"),
)

changed = 0
for locale in LOCALES:
    for page in (ROOT / locale).glob('*.html'):
        text = page.read_text(encoding='utf-8')
        updated = text
        for old, new in replacements:
            updated = updated.replace(old, new)
        updated = re.sub(
            r'<meta name="viewport" content="[^"]*">',
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
            updated,
            count=1,
        )
        if updated != text:
            page.write_text(updated, encoding='utf-8', newline='')
            changed += 1
print(f"normalized asset URLs in {changed} locale pages")
