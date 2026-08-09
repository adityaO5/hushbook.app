#!/usr/bin/env python3
"""Validate remaining-locale AI job matrix and promotion readiness.

Default mode checks private-preview readiness without requiring AI outputs to
be published. ``--publish`` is a hard gate: every job must be approved, every
output must exist, and no locale may be promoted with a pending key or review.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path
from typing import Any

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "data" / "mockup-text-manifest.json"
JOB_INDEX_PATH = ROOT / "data" / "mockup-ai-jobs.json"
IMAGE_TRANSLATIONS_PATH = ROOT / "data" / "mockup-image-translations.json"
RELEASE_PATH = ROOT / "data" / "mockup-ai-release.json"
LOCALES = [
    "de", "es-ES", "es-419", "pt-BR", "pt-PT", "it", "ja", "ko", "nl",
    "pl", "tr", "ru", "uk", "ar", "id", "th", "vi", "sv", "da",
]


def read_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--publish", action="store_true", help="fail unless every job is approved and output is ready")
    args = parser.parse_args()

    failures: list[str] = []
    manifest = read_json(MANIFEST_PATH)
    if not JOB_INDEX_PATH.exists():
        failures.append(f"missing job index: {JOB_INDEX_PATH.relative_to(ROOT)}")
        print("AI mockup QA failed:\n" + "\n".join(failures))
        return 1
    jobs_data = read_json(JOB_INDEX_PATH)
    jobs = jobs_data.get("jobs", [])
    expected_count = len(LOCALES) * len(manifest["assets"])
    expected_pairs = {(locale, asset) for locale in LOCALES for asset in manifest["assets"]}
    actual_pairs = {(job.get("locale"), job.get("asset")) for job in jobs}
    if actual_pairs != expected_pairs:
        failures.append(f"job matrix mismatch: expected {expected_count}, found {len(actual_pairs)}")
        missing = sorted(expected_pairs - actual_pairs)
        extra = sorted(actual_pairs - expected_pairs)
        if missing:
            failures.append("missing jobs: " + ", ".join(f"{l}/{a}" for l, a in missing[:10]))
        if extra:
            failures.append("unexpected jobs: " + ", ".join(f"{l}/{a}" for l, a in extra[:10]))

    for job in jobs:
        locale = job.get("locale")
        asset = job.get("asset")
        master = ROOT / str(job.get("master", ""))
        output = ROOT / str(job.get("output", ""))
        guide = ROOT / str(job.get("editGuide", ""))
        if locale == "fr":
            failures.append("French appears in remaining-locale job index")
        if not master.exists():
            failures.append(f"{locale}/{asset}: missing master")
            continue
        if digest(master) != job.get("masterSha256"):
            failures.append(f"{locale}/{asset}: master checksum changed")
        if not guide.exists():
            failures.append(f"{locale}/{asset}: missing edit guide")
        if list(Image.open(master).size) != job.get("dimensions"):
            failures.append(f"{locale}/{asset}: master dimensions changed")
        prompt = job.get("prompt", "")
        for required in ("Change text only inside marked regions", "Preserve every unmarked pixel", "Do not redesign", "watermark"):
            if required not in prompt:
                failures.append(f"{locale}/{asset}: prompt missing preservation rule: {required}")
        if args.publish:
            if job.get("status") != "approved":
                failures.append(f"{locale}/{asset}: status {job.get('status')} is not approved")
            if not output.exists():
                failures.append(f"{locale}/{asset}: missing final output")
            else:
                try:
                    with Image.open(output) as image, Image.open(master) as source:
                        if image.size != source.size:
                            failures.append(f"{locale}/{asset}: output dimensions {image.size} != {source.size}")
                        if image.mode not in {"RGB", "RGBA"}:
                            failures.append(f"{locale}/{asset}: invalid output mode {image.mode}")
                except Exception as exc:
                    failures.append(f"{locale}/{asset}: unreadable output: {exc}")

    image_translations: dict[str, Any] = {}
    if IMAGE_TRANSLATIONS_PATH.exists():
        image_translations = read_json(IMAGE_TRANSLATIONS_PATH).get("locales", {})
        for locale in LOCALES:
            if locale not in image_translations:
                failures.append(f"missing image translation record: {locale}")
                continue
            if set(image_translations[locale].get("assets", {})) != set(manifest["assets"]):
                failures.append(f"{locale}: image translation asset set mismatch")
            if args.publish:
                for asset_name, record in image_translations[locale].get("assets", {}).items():
                    if record.get("status") != "approved":
                        failures.append(f"{locale}/{asset_name}: translation record is not approved")
                    for region_id, region in record.get("regions", {}).items():
                        if not region.get("backTranslation"):
                            failures.append(f"{locale}/{asset_name}/{region_id}: missing back-translation")
                        if region.get("reviewerStatus") != "approved":
                            failures.append(f"{locale}/{asset_name}/{region_id}: reviewer status is not approved")
    else:
        failures.append(f"missing image translation records: {IMAGE_TRANSLATIONS_PATH.relative_to(ROOT)}")

    release = read_json(RELEASE_PATH) if RELEASE_PATH.exists() else {}
    invalid_approved = set(release.get("approvedLocales", [])) - ({"fr"} | set(LOCALES))
    if invalid_approved:
        failures.append("release allowlist contains unknown locales: " + ", ".join(sorted(invalid_approved)))
    if failures:
        print("AI mockup QA failed:")
        print("\n".join(failures))
        return 1
    state = "publish-ready" if args.publish else "private-preview-ready"
    print(f"AI mockup QA passed: {expected_count} remaining-locale jobs; state={state}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
