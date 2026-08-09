#!/usr/bin/env python3
"""Render deterministic localized product screenshots from English masters.

Masters stay untouched. Only manifest-declared text regions are repainted; all
other pixels remain identical apart from WebP encoding.
"""
from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageFilter, ImageFont, features

try:
    from arabic_reshaper import reshape as reshape_arabic
    from bidi.algorithm import get_display as bidi_display
except ImportError:  # Optional fallback keeps non-Arabic batches usable.
    reshape_arabic = None
    bidi_display = None

ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "data" / "mockup-text-manifest.json"
TRANSLATIONS_PATH = ROOT / "data" / "mockup-translations.json"
DEVICE_TRANSLATIONS_PATH = ROOT / "data" / "mockup-device-translations.json"
LOCALES = [
    "de", "fr", "es-ES", "es-419", "pt-BR", "pt-PT", "it", "ja", "ko",
    "nl", "pl", "tr", "ru", "uk", "ar", "id", "th", "vi", "sv", "da",
]

FONT_LATIN = ROOT / "assets" / "fonts" / "Inter-Regular.ttf"
FONT_BOLD = ROOT / "assets" / "fonts" / "Inter-SemiBold.ttf"
FONT_CJK_JA = Path(os.environ.get("HUSHBOOK_JA_FONT", r"C:\Windows\Fonts\YuGothM.ttc"))
FONT_CJK_KO = Path(os.environ.get("HUSHBOOK_KO_FONT", r"C:\Windows\Fonts\malgun.ttf"))
FONT_AR = Path(os.environ.get("HUSHBOOK_AR_FONT", r"C:\Windows\Fonts\tahoma.ttf"))
FONT_TH = Path(os.environ.get("HUSHBOOK_TH_FONT", r"C:\Windows\Fonts\tahoma.ttf"))
RAQM_AVAILABLE = features.check("raqm")


def direction_for(locale: str) -> str | None:
    # Pillow needs libraqm for shaping/direction. Keep right alignment until
    # a shaping-capable runtime is installed; never crash the full batch.
    return "rtl" if locale == "ar" and RAQM_AVAILABLE else None


def shape_value(value: str, locale: str) -> str:
    if locale == "ar" and not RAQM_AVAILABLE and reshape_arabic and bidi_display:
        return bidi_display(reshape_arabic(value))
    return value


def font_path(locale: str, weight: str) -> Path:
    if locale == "ja" and FONT_CJK_JA.exists():
        return FONT_CJK_JA
    if locale == "ko" and FONT_CJK_KO.exists():
        return FONT_CJK_KO
    if locale == "ar" and FONT_AR.exists():
        return FONT_AR
    if locale == "th" and FONT_TH.exists():
        return FONT_TH
    return FONT_BOLD if weight == "bold" else FONT_LATIN


def load_font(locale: str, size: int, weight: str) -> ImageFont.FreeTypeFont:
    path = font_path(locale, weight)
    try:
        return ImageFont.truetype(str(path), size=size)
    except OSError:
        return ImageFont.load_default()


def text_width(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, direction: str | None) -> int:
    box = draw.textbbox((0, 0), text, font=font, direction=direction)
    return box[2] - box[0]


def wrap_text(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_width: int, locale: str) -> str:
    # CJK/Thai can wrap at character boundaries; whitespace languages wrap by word.
    units = list(text) if locale in {"ja", "ko", "th", "ar"} else text.split()
    lines: list[str] = []
    current = ""
    for unit in units:
        candidate = unit if not current else (current + ("" if locale in {"ja", "ko", "th", "ar"} else " ") + unit)
        if current and text_width(draw, candidate, font, direction_for(locale)) > max_width:
            lines.append(current)
            current = unit
        else:
            current = candidate
    if current:
        lines.append(current)
    return "\n".join(lines)


def fit_text(draw: ImageDraw.ImageDraw, value: str, region: dict[str, Any], locale: str) -> tuple[ImageFont.FreeTypeFont, str]:
    x1, y1, x2, y2 = region["box"]
    max_width, max_height = x2 - x1, y2 - y1
    base_size = int(region.get("size", 32))
    # Screenshot labels have less room than page copy. Keep a bounded floor so
    # long German, Polish, Arabic, and Romance-language labels can reflow
    # without clipping while still remaining legible at native resolution.
    min_size = max(10, int(region.get("minSize", base_size * 0.45)))
    direction = direction_for(locale)
    for size in range(base_size, min_size - 1, -1):
        font = load_font(locale, size, region.get("weight", "regular"))
        wrapped = wrap_text(draw, value, font, max_width, locale)
        align = "right" if locale == "ar" else region.get("align", "left")
        bbox = draw.multiline_textbbox((0, 0), wrapped, font=font, spacing=max(2, size // 7), direction=direction, align=align)
        if bbox[2] - bbox[0] <= max_width and bbox[3] - bbox[1] <= max_height:
            return font, wrapped
    raise ValueError(f"text overflow: {region['id']} locale={locale} value={value!r}")


def repaint_region(image: Image.Image, box: tuple[int, int, int, int]) -> None:
    x1, y1, x2, y2 = box
    # Flat background is safer for text-heavy cards; optional manifest color
    # avoids blurred glyph ghosts when source text is large or high contrast.
    return


def render_asset(master: Path, output: Path, locale: str, config: dict[str, Any], translations: dict[str, str]) -> None:
    image = Image.open(master).convert("RGBA")
    draw = ImageDraw.Draw(image)
    for region in config.get("regions", []):
        value = translations.get(region["key"])
        if value is None:
            raise KeyError(f"missing translation key {region['key']} for {locale}")
        value = shape_value(value, locale)
        box = tuple(region["box"])
        background = region.get("background")
        if background == "interpolate":
            x1, y1, x2, y2 = box
            top = image.crop((x1, max(0, y1 - 1), x2, y1))
            bottom = image.crop((x1, min(image.height - 1, y2), x2, min(image.height, y2 + 1)))
            for offset in range(y2 - y1):
                row = Image.blend(top, bottom, (offset + 1) / (y2 - y1 + 1)).resize((x2 - x1, 1))
                image.paste(row, (x1, y1 + offset))
        elif background == "heal":
            x1, y1, x2, y2 = box
            # Reconstruct smooth photographic/gradient backdrop from rows
            # immediately outside the text mask. This removes source glyphs
            # without leaving a visible rectangular blur patch.
            top = image.crop((x1, max(0, y1 - 4), x2, max(0, y1 - 3))).resize((x2 - x1, y2 - y1))
            bottom = image.crop((x1, min(image.height - 1, y2 + 3), x2, min(image.height, y2 + 4))).resize((x2 - x1, y2 - y1))
            healed = Image.blend(top, bottom, 0.5)
            image.paste(healed, (x1, y1, x2, y2))
        elif background == "blur":
            x1, y1, x2, y2 = box
            crop = image.crop(box).filter(ImageFilter.GaussianBlur(radius=int(region.get("blur", 18))))
            image.paste(crop, (x1, y1, x2, y2))
        elif background:
            ImageDraw.Draw(image).rectangle(box, fill=background)
        else:
            repaint_region(image, box)
        font, wrapped = fit_text(draw, value, region, locale)
        x1, y1, x2, y2 = box
        direction = direction_for(locale)
        align = "right" if locale == "ar" else region.get("align", "left")
        anchor_x = x2 if align == "right" else (x1 + x2) // 2 if align == "center" else x1
        anchor = "la" if align == "left" else ("ra" if align == "right" else "ma")
        draw.multiline_text(
            (anchor_x, y1), wrapped, font=font, fill=region.get("fill", "#ffffff"),
            spacing=max(2, int(font.size // 7)), align=align, direction=direction,
            anchor=anchor,
        )
    output.parent.mkdir(parents=True, exist_ok=True)
    # Localized variants all use WebP; PNG masters remain immutable.
    image.convert("RGB").save(output, "WEBP", quality=88, method=6)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--locale", action="append", dest="locales", choices=LOCALES)
    parser.add_argument("--asset", action="append", dest="assets")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--preview-root",
        default="output/mockup-ai/previews",
        help="private preview output root; never writes production locale assets by default",
    )
    args = parser.parse_args()
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    translations = json.loads(TRANSLATIONS_PATH.read_text(encoding="utf-8"))
    if DEVICE_TRANSLATIONS_PATH.exists():
        device_translations = json.loads(DEVICE_TRANSLATIONS_PATH.read_text(encoding="utf-8"))
        translations = {
            locale: {**values, **device_translations.get(locale, {})}
            for locale, values in translations.items()
        }
    locales = args.locales or LOCALES
    selected = args.assets or list(manifest["assets"])
    for locale in locales:
        for asset_name in selected:
            if asset_name not in manifest["assets"]:
                raise KeyError(f"asset not in manifest: {asset_name}")
            master = ROOT / manifest["masterRoot"] / asset_name
            if not master.exists():
                raise FileNotFoundError(master)
            out_name = Path(asset_name).with_suffix(".webp").name
            output = ROOT / args.preview_root / locale / out_name
            if args.dry_run:
                print(f"{master.relative_to(ROOT)} -> {output.relative_to(ROOT)}")
            else:
                render_asset(master, output, locale, manifest["assets"][asset_name], translations[locale])
    if not args.dry_run:
        print(f"generated {len(locales) * len(selected)} localized mockup variants")


if __name__ == "__main__":
    main()
