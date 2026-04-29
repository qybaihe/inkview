#!/usr/bin/env python3
"""Slice a green-screen text-safe ink component sheet into transparent PNG assets."""

from __future__ import annotations

import argparse
import csv
import math
from pathlib import Path

from PIL import Image, ImageFilter


KEY = (0, 255, 0)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sheet", required=True, type=Path)
    parser.add_argument("--sheet-id", required=True)
    parser.add_argument("--wiki", required=True, type=Path)
    parser.add_argument("--out-dir", required=True, type=Path)
    parser.add_argument("--columns", type=int, default=2)
    parser.add_argument("--rows", type=int, default=2)
    parser.add_argument("--canvas-width", type=int, default=1024)
    parser.add_argument("--canvas-height", type=int, default=768)
    parser.add_argument("--padding", type=int, default=64)
    parser.add_argument("--transparent-threshold", type=float, default=32)
    parser.add_argument("--opaque-threshold", type=float, default=165)
    parser.add_argument("--edge-contract", type=int, default=0)
    parser.add_argument("--edge-feather", type=float, default=0)
    parser.add_argument("--fixed-grid", action="store_true", help="Use exact equal cells instead of detecting green gutters.")
    return parser.parse_args()


def read_rows(wiki: Path, sheet_id: str, expected: int) -> list[dict[str, str]]:
    with wiki.open("r", encoding="utf-8", newline="") as fh:
        rows = [row for row in csv.DictReader(fh, delimiter="\t") if row["sheet"] == sheet_id]
    rows.sort(key=lambda row: int(row["slot"]))
    if len(rows) != expected:
        raise SystemExit(f"Expected {expected} wiki rows for {sheet_id}, found {len(rows)}")
    return rows


def distance_to_key(r: int, g: int, b: int) -> float:
    return math.sqrt((r - KEY[0]) ** 2 + (g - KEY[1]) ** 2 + (b - KEY[2]) ** 2)


def remove_green(image: Image.Image, transparent: float, opaque: float) -> Image.Image:
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            distance = distance_to_key(r, g, b)
            if distance <= transparent:
                pixels[x, y] = (r, g, b, 0)
            elif distance < opaque:
                alpha = int(255 * ((distance - transparent) / (opaque - transparent)))
                pixels[x, y] = (r, min(g, max(r, b) + 18), b, min(a, alpha))
            else:
                pixels[x, y] = (r, g, b, a)
    return rgba


def polish_alpha(image: Image.Image, edge_contract: int, edge_feather: float) -> Image.Image:
    if edge_contract <= 0 and edge_feather <= 0:
        return image
    rgba = image.convert("RGBA")
    r, g, b, a = rgba.split()
    if edge_contract > 0:
        for _ in range(edge_contract):
            a = a.filter(ImageFilter.MinFilter(3))
    if edge_feather > 0:
        a = a.filter(ImageFilter.GaussianBlur(edge_feather))
    rgba.putalpha(a)
    return rgba


def component_canvas(image: Image.Image, width: int, height: int, padding: int) -> Image.Image:
    alpha = image.getchannel("A")
    bbox = alpha.getbbox()
    if not bbox:
        raise ValueError("No non-transparent pixels found")

    left, top, right, bottom = bbox
    pad = max(8, int(min(image.size) * 0.035))
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(image.width, right + pad)
    bottom = min(image.height, bottom + pad)

    cropped = image.crop((left, top, right, bottom))
    max_w = width - padding * 2
    max_h = height - padding * 2
    scale = min(max_w / cropped.width, max_h / cropped.height)
    resized = cropped.resize((round(cropped.width * scale), round(cropped.height * scale)), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    canvas.alpha_composite(resized, ((width - resized.width) // 2, (height - resized.height) // 2))
    return canvas


def split_positions(alpha: Image.Image, axis: str, parts: int) -> list[int]:
    if parts == 1:
        return [0, alpha.width if axis == "x" else alpha.height]
    if parts != 2:
        size = alpha.width if axis == "x" else alpha.height
        step = size // parts
        return [index * step for index in range(parts)] + [size]

    size = alpha.width if axis == "x" else alpha.height
    lower = int(size * 0.34)
    upper = int(size * 0.66)
    pixels = alpha.load()
    scores: list[tuple[int, int]] = []
    window = max(9, size // 80)

    for pos in range(lower, upper):
        count = 0
        start = max(0, pos - window)
        end = min(size, pos + window + 1)
        if axis == "x":
            for x in range(start, end):
                for y in range(alpha.height):
                    if pixels[x, y] > 0:
                        count += 1
        else:
            for y in range(start, end):
                for x in range(alpha.width):
                    if pixels[x, y] > 0:
                        count += 1
        scores.append((count, pos))

    _, split = min(scores, key=lambda item: (item[0], abs(item[1] - size // 2)))
    return [0, split, size]


def main() -> None:
    args = parse_args()
    expected = args.columns * args.rows
    rows = read_rows(args.wiki, args.sheet_id, expected)
    sheet = Image.open(args.sheet).convert("RGB")
    transparent_sheet = remove_green(sheet, args.transparent_threshold, args.opaque_threshold)
    if args.fixed_grid:
        x_edges = [index * (sheet.width // args.columns) for index in range(args.columns)] + [sheet.width]
        y_edges = [index * (sheet.height // args.rows) for index in range(args.rows)] + [sheet.height]
    else:
        alpha = transparent_sheet.getchannel("A")
        x_edges = split_positions(alpha, "x", args.columns)
        y_edges = split_positions(alpha, "y", args.rows)
    args.out_dir.mkdir(parents=True, exist_ok=True)

    for row in rows:
        slot = int(row["slot"])
        col = (slot - 1) % args.columns
        row_index = (slot - 1) // args.columns
        crop = transparent_sheet.crop((x_edges[col], y_edges[row_index], x_edges[col + 1], y_edges[row_index + 1]))
        transparent = crop
        transparent = polish_alpha(transparent, args.edge_contract, args.edge_feather)
        component = component_canvas(transparent, args.canvas_width, args.canvas_height, args.padding)
        component.save(args.out_dir / f"{row['slug']}.png")
        print(f"wrote {row['slug']}.png")


if __name__ == "__main__":
    main()
