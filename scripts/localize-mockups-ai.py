#!/usr/bin/env python3
"""Prepare reviewed GPT-5.6 screenshot-edit jobs.

This command does not call an external image API. It creates one exact prompt,
one red-box edit guide, and one validation record per asset/locale pair. The
Codex built-in image editor consumes these job packets manually. English
masters stay immutable; deterministic Pillow renders remain private previews
and are never promoted by this command.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "data" / "mockup-text-manifest.json"
TRANSLATIONS_PATH = ROOT / "data" / "mockup-translations.json"
DEVICE_TRANSLATIONS_PATH = ROOT / "data" / "mockup-device-translations.json"
IMAGE_TRANSLATIONS_PATH = ROOT / "data" / "mockup-image-translations.json"
JOB_INDEX_PATH = ROOT / "data" / "mockup-ai-jobs.json"
GENERATION_LOG_PATH = ROOT / "data" / "mockup-ai-generation-log.json"
GUIDE_ROOT = ROOT / "output" / "mockup-ai" / "edit-guides"

ALL_LOCALES = [
    "de", "fr", "es-ES", "es-419", "pt-BR", "pt-PT", "it", "ja", "ko",
    "nl", "pl", "tr", "ru", "uk", "ar", "id", "th", "vi", "sv", "da",
]
REMAINING_LOCALES = [locale for locale in ALL_LOCALES if locale != "fr"]
BATCHES = {
    "high-risk": ["de", "ja", "ko", "ar", "th", "ru", "uk", "pl", "tr", "vi"],
    "latin": ["es-ES", "es-419", "pt-BR", "pt-PT", "it", "nl", "id", "sv", "da"],
    "all": REMAINING_LOCALES,
}

LOCKED_COMPONENTS = [
    "device frame and screen proportions",
    "status bar, app logo, navigation icons, and player controls",
    "charts, plotted data, numbers, dates, durations, and progress values",
    "gradients, shadows, lighting, textures, and decorative artwork",
    "portraits, illustrations, and book-cover artwork",
]

RTL_LOCALES = {"ar"}
CHAR_WRAP_LOCALES = {"ja", "ko", "th"}


def read_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def merged_translations() -> dict[str, dict[str, str]]:
    base = read_json(TRANSLATIONS_PATH)
    device = read_json(DEVICE_TRANSLATIONS_PATH) if DEVICE_TRANSLATIONS_PATH.exists() else {}
    return {locale: {**base.get(locale, {}), **device.get(locale, {})} for locale in ALL_LOCALES}


def target_texts(locale: str, spec: dict[str, Any], translations: dict[str, dict[str, str]]) -> dict[str, str]:
    values = translations.get(locale, {})
    missing = [region["key"] for region in spec.get("regions", []) if not str(values.get(region["key"], "")).strip()]
    if missing:
        raise ValueError(f"{locale}: missing translation keys: {', '.join(sorted(set(missing)))}")
    return {region["key"]: values[region["key"]] for region in spec.get("regions", [])}


def guide_font() -> ImageFont.ImageFont:
    candidates = [
        ROOT / "assets" / "fonts" / "Inter-SemiBold.ttf",
        Path(os.environ.get("WINDIR", r"C:\Windows")) / "Fonts" / "arial.ttf",
    ]
    for candidate in candidates:
        if candidate.exists():
            try:
                return ImageFont.truetype(str(candidate), size=18)
            except OSError:
                pass
    return ImageFont.load_default()


def create_edit_guide(asset_name: str, spec: dict[str, Any]) -> Path:
    source = ROOT / "assets" / "img" / "mockups" / asset_name
    guide_path = GUIDE_ROOT / (Path(asset_name).stem + ".png")
    if guide_path.exists():
        return guide_path
    with Image.open(source).convert("RGBA") as image:
        overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)
        font = guide_font()
        for region in spec.get("regions", []):
            x1, y1, x2, y2 = region["box"]
            draw.rectangle((x1, y1, x2, y2), outline=(255, 35, 35, 255), width=max(3, image.width // 500))
            draw.rectangle((x1, max(0, y1 - 24), min(image.width, x1 + 24 * len(region["id"])), y1), fill=(255, 35, 35, 220))
            draw.text((x1 + 4, max(0, y1 - 22)), region["id"], fill=(255, 255, 255, 255), font=font)
        guide = Image.alpha_composite(image, overlay)
        guide_path.parent.mkdir(parents=True, exist_ok=True)
        guide.save(guide_path, "PNG")
    return guide_path


def prompt_for(locale: str, asset_name: str, spec: dict[str, Any], values: dict[str, str], master: Path, guide: Path) -> str:
    direction = "right-to-left with Arabic shaping" if locale in RTL_LOCALES else "left-to-right"
    wrapping = "character-aware line breaks without inserted spaces" if locale in CHAR_WRAP_LOCALES else "natural word wrapping"
    editable = []
    for region in spec.get("regions", []):
        editable.append(
            f"- {region['id']} ({region['box']}, {region.get('align', 'left')} aligned, max {region.get('maxLines', 'declared')} lines): "
            f"replace {region['source']!r} with {values[region['key']]!r}"
        )
    if not editable:
        editable.append("- No editable region is currently declared; preserve all visible artwork and UI text until manifest audit approval.")
    locked = "\n".join(f"- {item}" for item in LOCKED_COMPONENTS)
    return f"""Use case: text-localization\nAsset type: HushBook landing-page product screenshot\nInput image 1 (edit target): {master}\nInput image 2 (edit guide): {guide}\nTarget locale: {locale}\nReading direction: {direction}\nLine breaking: {wrapping}\n\nChange text only inside marked regions. Render exact target strings, including accents, diacritics, CJK glyphs, Thai combining marks, or Arabic bidi punctuation.\nEditable regions:\n{chr(10).join(editable)}\n\nPreserve every unmarked pixel and every product component. Locked regions:\n{locked}\n\nDo not redesign, redraw, simplify, crop, relight, recolor, reinterpret, or change screen proportions. Do not invent icons, controls, charts, books, people, data, or UI. Keep all numbers, dates, durations, progress values, product claims, author names, URLs, store names, file extensions, HushBook, and approved artwork exceptions unchanged. Do not add a watermark or extra text.\n"""


def build_image_translation_record(locale: str, manifest: dict[str, Any], translations: dict[str, dict[str, str]]) -> dict[str, Any]:
    assets: dict[str, Any] = {}
    values = translations.get(locale, {})
    for asset_name, spec in manifest["assets"].items():
        regions: dict[str, Any] = {}
        for region in spec.get("regions", []):
            target = values.get(region["key"])
            regions[region["id"]] = {
                "key": region["key"],
                "source": region["source"],
                "target": target,
                "backTranslation": None,
                "meaningStatus": "pending-independent-back-translation",
                "reviewerStatus": "pending",
                "approvedException": False,
            }
        assets[asset_name] = {
            "status": "pending-ai-edit" if regions else "needs-manifest-audit",
            "regions": regions,
            "approvedExceptions": [],
        }
    return {"status": "pending", "assets": assets}


def select_locales(args: argparse.Namespace) -> list[str]:
    if args.locale:
        if "fr" in args.locale:
            raise SystemExit("French baseline is frozen; omit --locale fr")
        selected = args.locale
    elif args.batch:
        selected = BATCHES[args.batch]
    else:
        selected = REMAINING_LOCALES
    return list(dict.fromkeys(selected))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--locale", action="append", choices=ALL_LOCALES)
    parser.add_argument("--asset", action="append")
    parser.add_argument("--batch", choices=sorted(BATCHES))
    parser.add_argument("--draft", action="store_true", help="write private job packets only")
    parser.add_argument("--retry-failed", action="store_true", help="include needs-review jobs")
    parser.add_argument("--replace", action="store_true", help="replace existing job index and guides")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    manifest = read_json(MANIFEST_PATH)
    translations = merged_translations()
    locales = select_locales(args)
    assets = args.asset or list(manifest["assets"])
    unknown = [asset for asset in assets if asset not in manifest["assets"]]
    if unknown:
        raise SystemExit(f"asset not in manifest: {', '.join(unknown)}")

    retry_pairs: set[tuple[str, str]] | None = None
    if args.retry_failed:
        if not JOB_INDEX_PATH.exists():
            raise SystemExit("--retry-failed requires existing data/mockup-ai-jobs.json")
        retry_pairs = {
            (job.get("locale"), job.get("asset"))
            for job in read_json(JOB_INDEX_PATH).get("jobs", [])
            if job.get("status") in {"failed", "needs-review"}
        }
    jobs: list[dict[str, Any]] = []
    image_records = {"version": 1, "sourceOfTruth": "assets/img/mockups/<asset>.webp", "locales": {}}
    errors: list[str] = []
    for locale in locales:
        image_records["locales"][locale] = build_image_translation_record(locale, manifest, translations)
        for asset_name in assets:
            if retry_pairs is not None and (locale, asset_name) not in retry_pairs:
                continue
            master = ROOT / manifest["masterRoot"] / asset_name
            if not master.exists():
                errors.append(f"missing master: {asset_name}")
                continue
            spec = manifest["assets"][asset_name]
            try:
                values = target_texts(locale, spec, translations)
            except ValueError as exc:
                errors.append(str(exc))
                continue
            guide = create_edit_guide(asset_name, spec)
            output_name = Path(asset_name).with_suffix(".webp").name
            output = ROOT / manifest["outputRoot"] / locale / output_name
            job = {
                "locale": locale,
                "asset": asset_name,
                "status": "pending-ai-edit" if spec.get("regions") else "needs-manifest-audit",
                "master": str(master.relative_to(ROOT)).replace("\\", "/"),
                "masterSha256": sha256(master),
                "editGuide": str(guide.relative_to(ROOT)).replace("\\", "/"),
                "output": str(output.relative_to(ROOT)).replace("\\", "/"),
                "dimensions": list(Image.open(master).size),
                "direction": "rtl" if locale in RTL_LOCALES else "ltr",
                "translatedKeys": sorted(values),
                "translations": values,
                "lockedComponents": LOCKED_COMPONENTS,
                "prompt": prompt_for(locale, asset_name, spec, values, master, guide),
                "validation": {
                    "lockedRegions": "pending",
                    "ocr": "pending",
                    "glyphs": "pending",
                    "nativeReview": "pending",
                },
            }
            if output.exists() and not args.replace:
                job["existingOutput"] = "private-preview-or-prior-result; no overwrite requested"
            jobs.append(job)

    if errors:
        print("AI job preparation failed:")
        print("\n".join(errors))
        return 1
    if args.dry_run:
        print(f"would prepare {len(jobs)} GPT-5.6 edit jobs; French excluded and frozen")
        return 0

    payload = {
        "version": 1,
        "generator": "Codex built-in GPT-5.6 image editor job planner",
        "mode": "text-localization",
        "frenchBaseline": "frozen; not regenerated",
        "jobCount": len(jobs),
        "jobs": jobs,
    }
    if JOB_INDEX_PATH.exists() and not args.replace:
        old = read_json(JOB_INDEX_PATH)
        old_jobs = {(j["locale"], j["asset"]): j for j in old.get("jobs", [])}
        for job in jobs:
            old_jobs[(job["locale"], job["asset"])] = job
        payload["jobs"] = list(old_jobs.values())
        payload["jobCount"] = len(payload["jobs"])
    write_json(JOB_INDEX_PATH, payload)
    write_json(IMAGE_TRANSLATIONS_PATH, image_records)

    log = read_json(GENERATION_LOG_PATH) if GENERATION_LOG_PATH.exists() else {}
    log.update({
        "version": max(2, int(log.get("version", 1))),
        "generator": "built-in GPT-5.6 image editor",
        "mode": "text-localization",
        "frenchBaseline": "frozen; not regenerated",
        "remainingLocaleJobIndex": str(JOB_INDEX_PATH.relative_to(ROOT)).replace("\\", "/"),
        "remainingJobCount": len(payload["jobs"]),
        "pendingLocales": REMAINING_LOCALES,
        "approvedLocales": ["fr"],
    })
    write_json(GENERATION_LOG_PATH, log)
    print(f"prepared {len(jobs)} private GPT-5.6 edit jobs for {len(locales)} locales; no French assets changed")
    print(f"job index: {JOB_INDEX_PATH.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
