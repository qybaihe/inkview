#!/usr/bin/env python3
"""Build a preview image for the ink component library."""

from __future__ import annotations

import argparse
import csv
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--wiki", required=True, type=Path)
    parser.add_argument("--components-dir", required=True, type=Path)
    parser.add_argument("--out", required=True, type=Path)
    parser.add_argument("--columns", type=int, default=4)
    parser.add_argument("--cell-width", type=int, default=360)
    parser.add_argument("--cell-height", type=int, default=300)
    return parser.parse_args()


def font(size: int) -> ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        "/Library/Fonts/Arial Unicode.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def load_rows(wiki: Path) -> list[dict[str, str]]:
    with wiki.open("r", encoding="utf-8", newline="") as fh:
        return list(csv.DictReader(fh, delimiter="\t"))


def main() -> None:
    args = parse_args()
    rows = load_rows(args.wiki)
    columns = args.columns
    title_h = 76
    rows_count = (len(rows) + columns - 1) // columns
    width = columns * args.cell_width
    height = title_h + rows_count * args.cell_height
    image = Image.new("RGB", (width, height), "#f6f2e9")
    draw = ImageDraw.Draw(image)
    title_font = font(28)
    label_font = font(14)
    small_font = font(11)

    draw.rectangle((0, 0, width, title_h), fill="#211f1c")
    draw.text((24, 22), f"Ink Common Components - {len(rows)} Component Preview", fill="#f6f2e9", font=title_font)

    for index, row in enumerate(rows):
        col = index % columns
        row_index = index // columns
        x = col * args.cell_width
        y = title_h + row_index * args.cell_height
        draw.rectangle((x, y, x + args.cell_width - 1, y + args.cell_height - 1), outline="#d8d0c2", width=1)
        component_path = args.components_dir / f"{row['slug']}.png"
        if component_path.exists():
            component = Image.open(component_path).convert("RGBA")
            component.thumbnail((args.cell_width - 44, args.cell_height - 88), Image.Resampling.LANCZOS)
            image.paste(component, (x + (args.cell_width - component.width) // 2, y + 18), component)
        else:
            draw.rounded_rectangle((x + 88, y + 48, x + args.cell_width - 88, y + args.cell_height - 116), radius=12, outline="#b8afa0", width=2)
            draw.text((x + 142, y + 112), "planned", fill="#8c8274", font=small_font)
        draw.text((x + 16, y + args.cell_height - 58), row["slug"], fill="#211f1c", font=label_font)
        draw.text((x + 16, y + args.cell_height - 32), row["sheet"], fill="#8c8274", font=small_font)

    args.out.parent.mkdir(parents=True, exist_ok=True)
    image.save(args.out)


if __name__ == "__main__":
    main()
