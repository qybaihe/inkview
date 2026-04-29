#!/usr/bin/env python3
"""Select bundled text-safe ink components by semantic query."""

from __future__ import annotations

import argparse
import csv
import json
import re
from pathlib import Path


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def parse_args() -> argparse.Namespace:
    root = repo_root()
    parser = argparse.ArgumentParser()
    parser.add_argument("--query", required=True, help="Search words or a short UI need.")
    parser.add_argument("--category", help="Optional exact category filter.")
    parser.add_argument("--layer-role", help="Optional exact layer_role filter.")
    parser.add_argument("--limit", type=int, default=12)
    parser.add_argument("--wiki", type=Path, default=root / "assets/ink-text-safe-components/wiki/component-wiki.tsv")
    parser.add_argument("--format", choices=["tsv", "json"], default="tsv")
    return parser.parse_args()


def tokens(text: str) -> list[str]:
    return [part for part in re.split(r"[\s,;:/|()\[\]{}._-]+", text.lower()) if part]


def load_rows(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8", newline="") as fh:
        return list(csv.DictReader(fh, delimiter="\t"))


def score(row: dict[str, str], query: str, query_tokens: list[str]) -> int:
    haystack = " ".join(
        [
            row["slug"],
            row["name"],
            row["category"],
            row["description"],
            row["use_when"],
            row["text_zone"],
            row["safe_padding"],
            row["layer_role"],
        ]
    ).lower()
    value = 0
    if query.lower() in haystack:
        value += 8
    for token in query_tokens:
        if token in row["slug"].lower():
            value += 6
        if token in row["use_when"].lower():
            value += 5
        if token in row["description"].lower():
            value += 3
        if token in row["category"].lower() or token in row["name"].lower():
            value += 3
        if token in row["layer_role"].lower():
            value += 3
        if token in haystack:
            value += 1
    return value


def main() -> None:
    args = parse_args()
    rows = load_rows(args.wiki)
    if args.category:
        rows = [row for row in rows if row["category"] == args.category]
    if args.layer_role:
        rows = [row for row in rows if row["layer_role"] == args.layer_role]
    query_tokens = tokens(args.query)
    ranked = []
    for row in rows:
        row_score = score(row, args.query, query_tokens)
        if row_score:
            ranked.append((row_score, row))
    ranked.sort(key=lambda item: (-item[0], item[1]["sheet"], int(item[1]["slot"])))
    selected = [{**row, "score": row_score} for row_score, row in ranked[: args.limit]]

    if args.format == "json":
        print(json.dumps(selected, ensure_ascii=False, indent=2))
        return

    fields = ["score", "slug", "name", "category", "layer_role", "text_zone", "safe_padding", "use_when", "component_path"]
    print("\t".join(fields))
    for row in selected:
        print("\t".join(str(row[field]) for field in fields))


if __name__ == "__main__":
    main()
