#!/usr/bin/env python3
"""Validate localized mockup matrix, dimensions, and HTML references."""
from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / "data" / "mockup-text-manifest.json").read_text(encoding="utf-8"))
release_path = ROOT / "data" / "mockup-ai-release.json"
release = json.loads(release_path.read_text(encoding="utf-8")) if release_path.exists() else {"mode": "masters", "approvedLocales": []}
mode = os.environ.get("MOCKUP_ASSET_MODE", release.get("mode", "masters"))
approved_locales = set(release.get("approvedLocales", []))
locales = [
    "de", "fr", "es-ES", "es-419", "pt-BR", "pt-PT", "it", "ja", "ko",
    "nl", "pl", "tr", "ru", "uk", "ar", "id", "th", "vi", "sv", "da",
]
pages = ["index.html", "download.html", "about.html", "privacy-policy.html", "terms-conditions.html", "refund-policy.html", "licenses.html"]
failures: list[str] = []


def expected_reference(locale: str, asset_name: str) -> str:
    output_name = Path(asset_name).with_suffix(".webp").name
    if mode == "localized" and locale in approved_locales:
        return f"/assets/img/mockups/locales/{locale}/{output_name}"
    return f"/assets/img/mockups/{asset_name}"

for asset_name, spec in manifest["assets"].items():
    master = ROOT / manifest["masterRoot"] / asset_name
    if not master.exists():
        failures.append(f"missing master: {asset_name}")
        continue
    with Image.open(master) as source:
        source_size = source.size
        source_mode = source.mode
    out_name = Path(asset_name).with_suffix(".webp").name
    for locale in locales:
        output = ROOT / manifest["outputRoot"] / locale / out_name
        if not output.exists():
            failures.append(f"{locale}: missing {out_name}")
            continue
        try:
            with Image.open(output) as image:
                if image.size != source_size:
                    failures.append(f"{locale}: {out_name} size {image.size} != {source_size}")
                if image.mode not in {"RGB", "RGBA"}:
                    failures.append(f"{locale}: {out_name} invalid mode {image.mode}")
                if image.width > 0 and image.height > 0 and image.width / image.height > 3:
                    failures.append(f"{locale}: {out_name} invalid aspect ratio")
        except Exception as exc:
            failures.append(f"{locale}: unreadable {out_name}: {exc}")

for locale in locales:
    for page in pages:
        file = ROOT / locale / page
        if not file.exists():
            failures.append(f"{locale}: missing page {page}")
            continue
        html = file.read_text(encoding="utf-8")
        for asset_name in manifest["assets"]:
            expected = expected_reference(locale, asset_name)
            output_name = Path(asset_name).with_suffix(".webp").name
            locale_ref = f"/assets/img/mockups/locales/{locale}/{output_name}"
            master_ref = f"/assets/img/mockups/{asset_name}"
            # Pages do not all use every mockup. Validate only assets that are
            # referenced on this page, while still rejecting an unapproved
            # locale variant when one appears.
            if expected not in html and locale_ref not in html and master_ref not in html:
                continue
            if expected not in html:
                failures.append(f"{locale}/{page}: expected mockup reference missing: {expected}")
            if expected == master_ref and locale_ref in html:
                failures.append(f"{locale}/{page}: pending locale variant referenced: {locale_ref}")
            if expected == locale_ref and master_ref in html:
                failures.append(f"{locale}/{page}: approved locale still references English master: {master_ref}")
        refs = re.findall(r"/assets/img/mockups/locales/[^\"')\s]+", html)
        refs += re.findall(r"/assets/img/mockups/(?!locales/)[^\"')\s]+", html)
        for raw_ref in refs:
            ref = raw_ref.split("?", 1)[0]
            if not (ROOT / ref.lstrip("/")).exists():
                failures.append(f"{locale}/{page}: missing referenced asset {ref}")

if failures:
    print("Mockup QA failed:")
    print("\n".join(failures))
    sys.exit(1)
print(f"Mockup QA passed: {len(locales)} locales × {len(manifest['assets'])} assets; {len(pages)} pages checked per locale.")
