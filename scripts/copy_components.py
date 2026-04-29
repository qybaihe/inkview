#!/usr/bin/env python3
"""Copy bundled text-safe ink components into a target website project."""

from __future__ import annotations

import argparse
import csv
import shutil
from pathlib import Path


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def parse_args() -> argparse.Namespace:
    root = repo_root()
    parser = argparse.ArgumentParser()
    parser.add_argument("--slugs", nargs="+", required=True, help="Component slugs to copy.")
    parser.add_argument("--out", required=True, type=Path, help="Destination directory.")
    parser.add_argument("--wiki", type=Path, default=root / "assets/ink-text-safe-components/wiki/component-wiki.tsv")
    parser.add_argument("--library", type=Path, default=root / "assets/ink-text-safe-components")
    parser.add_argument("--manifest", action="store_true", help="Write copied-components.tsv in the destination.")
    return parser.parse_args()


def load_rows(path: Path) -> dict[str, dict[str, str]]:
    with path.open("r", encoding="utf-8", newline="") as fh:
        return {row["slug"]: row for row in csv.DictReader(fh, delimiter="\t")}


def main() -> None:
    args = parse_args()
    rows = load_rows(args.wiki)
    args.out.mkdir(parents=True, exist_ok=True)
    copied: list[dict[str, str]] = []

    for slug in args.slugs:
        if slug not in rows:
            raise SystemExit(f"Unknown component slug: {slug}")
        row = rows[slug]
        source = args.library / row["component_path"]
        if not source.exists():
            raise SystemExit(f"Missing source component: {source}")
        target = args.out / source.name
        shutil.copy2(source, target)
        copied.append(row)
        print(f"copied {slug} -> {target}")

    if args.manifest and copied:
        manifest = args.out / "copied-components.tsv"
        with manifest.open("w", encoding="utf-8", newline="") as fh:
            writer = csv.DictWriter(fh, fieldnames=copied[0].keys(), delimiter="\t")
            writer.writeheader()
            writer.writerows(copied)
        print(f"wrote {manifest}")


if __name__ == "__main__":
    main()
