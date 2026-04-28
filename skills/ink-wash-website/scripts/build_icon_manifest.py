#!/usr/bin/env python3
"""Build a JSON manifest from the bundled ink icon Wiki."""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path


def skill_root() -> Path:
    return Path(__file__).resolve().parents[1]


def parse_args() -> argparse.Namespace:
    root = skill_root()
    parser = argparse.ArgumentParser()
    parser.add_argument("--wiki", type=Path, default=root / "assets/ink-common-icons/wiki/icon-wiki.tsv")
    parser.add_argument("--out", type=Path, default=root / "assets/ink-common-icons/wiki/icon-manifest.json")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    with args.wiki.open("r", encoding="utf-8", newline="") as fh:
        rows = list(csv.DictReader(fh, delimiter="\t"))

    manifest = {
        "name": "ink-common-icons",
        "count": len(rows),
        "icons": rows,
        "categories": sorted({row["category"] for row in rows}),
    }
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {args.out} ({len(rows)} icons)")


if __name__ == "__main__":
    main()
