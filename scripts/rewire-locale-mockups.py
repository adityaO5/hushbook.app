#!/usr/bin/env python3
"""Point localized HTML pages at approved locale screenshot variants.

The release file keeps English masters active while AI-edited variants are
pending review. This script is intentionally reversible: running it with
``--mode masters`` restores master references without deleting generated
variants.
"""
from __future__ import annotations

import argparse
import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "data" / "mockup-text-manifest.json").read_text(encoding="utf-8"))
RELEASE_PATH = ROOT / "data" / "mockup-ai-release.json"
LOCALES = [
    "de", "fr", "es-ES", "es-419", "pt-BR", "pt-PT", "it", "ja", "ko",
    "nl", "pl", "tr", "ru", "uk", "ar", "id", "th", "vi", "sv", "da",
]
PAGES = ["index.html", "download.html", "about.html", "privacy-policy.html", "terms-conditions.html", "refund-policy.html", "licenses.html"]

def parse_args() -> argparse.Namespace:
    release_mode = "masters"
    release_locales: list[str] = ["fr"]
    if RELEASE_PATH.exists():
        release = json.loads(RELEASE_PATH.read_text(encoding="utf-8"))
        release_mode = release.get("mode", release_mode)
        release_locales = release.get("approvedLocales", release_locales)
    mode = os.environ.get("MOCKUP_ASSET_MODE", release_mode)
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["masters", "localized"], default=mode)
    parser.add_argument("--locale", action="append", choices=LOCALES)
    return parser.parse_args()


def desired_path(locale: str, asset_name: str, mode: str, approved: set[str]) -> str:
    out_name = Path(asset_name).with_suffix(".webp").name
    if mode == "localized" and locale in approved:
        return f"/assets/img/mockups/locales/{locale}/{out_name}"
    # English masters keep their original extension (notably the PNG
    # read-along master); only generated locale variants normalize to WebP.
    return f"/assets/img/mockups/{asset_name}"


args = parse_args()
approved = set()
if RELEASE_PATH.exists():
    approved = set(json.loads(RELEASE_PATH.read_text(encoding="utf-8")).get("approvedLocales", []))
if args.mode == "localized" and not approved:
    raise SystemExit("localized mode requires at least one approved locale in data/mockup-ai-release.json")

selected_locales = args.locale or LOCALES
for locale in selected_locales:
    for page in PAGES:
        file = ROOT / locale / page
        if not file.exists():
            continue
        html = file.read_text(encoding="utf-8")
        for source_name in CONFIG["assets"]:
            master_name = Path(source_name).with_suffix(".webp").name
            target = desired_path(locale, source_name, args.mode, approved)
            # Replace either master or locale variant. Keep URL query strings.
            html = re.sub(
                rf"/assets/img/mockups/locales/{re.escape(locale)}/{re.escape(master_name)}",
                target,
                html,
            )
            html = re.sub(
                rf"(?<!locales/)(?<![A-Za-z0-9_-])/?assets/img/mockups/{re.escape(source_name)}",
                target,
                html,
            )
            # Repair older generated references that normalized a PNG master
            # to WebP before the extension policy was made explicit.
            html = re.sub(
                rf"/assets/img/mockups/(?!locales/){re.escape(master_name)}",
                target,
                html,
            )
        file.write_text(html, encoding="utf-8")
print(f"rewired {len(selected_locales)} locales across localized public pages in {args.mode} mode")
