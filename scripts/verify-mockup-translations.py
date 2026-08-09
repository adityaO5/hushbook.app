#!/usr/bin/env python3
"""Check that every declared screenshot translation exists for every locale."""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / "data" / "mockup-text-manifest.json").read_text(encoding="utf-8"))
translations = json.loads((ROOT / "data" / "mockup-translations.json").read_text(encoding="utf-8"))
extra_path = ROOT / "data" / "mockup-device-translations.json"
if extra_path.exists():
    extra = json.loads(extra_path.read_text(encoding="utf-8"))
    translations = {locale: {**values, **extra.get(locale, {})} for locale, values in translations.items()}
failures: list[str] = []

for locale, values in translations.items():
    for asset, spec in manifest["assets"].items():
        for region in spec.get("regions", []):
            key = region["key"]
            if key not in values or not str(values[key]).strip():
                failures.append(f"{locale}: missing translation {key} ({asset})")

if failures:
    print("Mockup translation QA failed:")
    print("\n".join(failures))
    sys.exit(1)

region_count = sum(len(spec.get("regions", [])) for spec in manifest["assets"].values())
print(f"Mockup translation QA passed: {len(translations)} locales × {region_count} declared regions.")
