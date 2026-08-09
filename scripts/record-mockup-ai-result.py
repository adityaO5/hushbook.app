#!/usr/bin/env python3
"""Promote one built-in image-editor result only after hard input checks.

The Codex image tool writes its result outside the repository. This helper
copies a selected result into the locale asset directory, verifies exact
master dimensions/mode, and records the job checksum. It refuses overwrite
unless ``--replace`` is supplied.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
JOBS_PATH = ROOT / "data" / "mockup-ai-jobs.json"
MANIFEST_PATH = ROOT / "data" / "mockup-text-manifest.json"


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--locale", required=True)
    parser.add_argument("--asset", required=True)
    parser.add_argument("--source", required=True, help="built-in image editor output path")
    parser.add_argument("--replace", action="store_true")
    args = parser.parse_args()

    jobs_data = json.loads(JOBS_PATH.read_text(encoding="utf-8"))
    jobs = jobs_data.get("jobs", [])
    job = next((item for item in jobs if item.get("locale") == args.locale and item.get("asset") == args.asset), None)
    if job is None:
        raise SystemExit(f"job not found: {args.locale}/{args.asset}")

    source = Path(args.source).resolve()
    master = ROOT / job["master"]
    output = ROOT / job["output"]
    if not source.exists():
        raise SystemExit(f"source result missing: {source}")
    if output.exists() and not args.replace:
        raise SystemExit(f"output exists; pass --replace to overwrite: {output}")

    with Image.open(source) as image, Image.open(master) as master_image:
        if image.size != master_image.size:
            raise SystemExit(f"dimension mismatch: result {image.size} != master {master_image.size}")
        if image.mode not in {"RGB", "RGBA"}:
            raise SystemExit(f"invalid result mode: {image.mode}")

    output.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, output)
    job.update({
        "status": "generated-pending-review",
        "outputSha256": sha256(output),
        "sourceResult": str(source),
    })
    JOBS_PATH.write_text(json.dumps(jobs_data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"recorded {args.locale}/{args.asset}: {output.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
