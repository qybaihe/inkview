#!/usr/bin/env python3
"""Build a JSON manifest from the bundled text-safe component Wiki."""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def parse_args() -> argparse.Namespace:
    root = repo_root()
    parser = argparse.ArgumentParser()
    parser.add_argument("--wiki", type=Path, default=root / "assets/ink-text-safe-components/wiki/component-wiki.tsv")
    parser.add_argument("--out", type=Path, default=root / "assets/ink-text-safe-components/wiki/component-manifest.json")
    parser.add_argument("--name", default="ink-text-safe-components")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    with args.wiki.open("r", encoding="utf-8", newline="") as fh:
        rows = list(csv.DictReader(fh, delimiter="\t"))

    manifest = {
        "name": args.name,
        "count": len(rows),
        "components": rows,
        "categories": sorted({row["category"] for row in rows}),
        "layer_roles": sorted({row["layer_role"] for row in rows}),
    }
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {args.out} ({len(rows)} components)")


if __name__ == "__main__":
    main()
