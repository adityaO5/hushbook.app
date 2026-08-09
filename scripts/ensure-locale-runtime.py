"""Ensure every generated locale page loads the shared locale runtime."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOCALES = [
    "de", "fr", "es-ES", "es-419", "pt-BR", "pt-PT", "it", "ja", "ko",
    "nl", "pl", "tr", "ru", "uk", "ar", "id", "th", "vi", "sv", "da",
]
SCRIPT = '<script src="/assets/js/locale.js" defer></script>'


def ensure(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    if "<script src=\"/assets/js/locale.js\"" in text:
        return False
    marker = "</body>"
    if marker not in text:
        raise RuntimeError(f"missing </body>: {path}")
    path.write_text(text.replace(marker, f"{SCRIPT}{marker}", 1), encoding="utf-8", newline="")
    return True


changed = 0
for locale in LOCALES:
    directory = ROOT / locale
    if not directory.is_dir():
        continue
    for page in sorted(directory.glob("*.html")):
        changed += int(ensure(page))

print(f"locale runtime ensured on {changed} page(s)")
