#!/usr/bin/env python3
"""Build a wiki preview image for the ink common icon library."""

from __future__ import annotations

import argparse
import csv
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--wiki", required=True, type=Path)
    parser.add_argument("--icons-dir", required=True, type=Path)
    parser.add_argument("--out", required=True, type=Path)
    parser.add_argument("--columns", type=int, default=12)
    parser.add_argument("--cell", type=int, default=160)
    return parser.parse_args()


def load_rows(wiki: Path) -> list[dict[str, str]]:
    with wiki.open("r", encoding="utf-8", newline="") as fh:
        return list(csv.DictReader(fh, delimiter="\t"))


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


def draw_wrapped(draw: ImageDraw.ImageDraw, text: str, xy: tuple[int, int], max_width: int, fill: tuple[int, int, int], text_font: ImageFont.ImageFont) -> None:
    words = text.replace("-", "- ").split()
    lines: list[str] = []
    current = ""
    for word in words:
        test = f"{current} {word}".strip()
        if draw.textbbox((0, 0), test, font=text_font)[2] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    x, y = xy
    for line in lines[:2]:
        draw.text((x, y), line, fill=fill, font=text_font)
        y += 16


def main() -> None:
    args = parse_args()
    rows = load_rows(args.wiki)
    columns = args.columns
    cell = args.cell
    title_h = 72
    rows_count = (len(rows) + columns - 1) // columns
    width = columns * cell
    height = title_h + rows_count * cell
    image = Image.new("RGB", (width, height), "#f6f2e9")
    draw = ImageDraw.Draw(image)
    title_font = font(28)
    label_font = font(13)
    small_font = font(11)

    draw.rectangle((0, 0, width, title_h), fill="#211f1c")
    draw.text((24, 20), f"Ink Common Icons - {len(rows)} Icon Wiki Preview", fill="#f6f2e9", font=title_font)

    for index, row in enumerate(rows):
        col = index % columns
        row_index = index // columns
        x = col * cell
        y = title_h + row_index * cell
        draw.rectangle((x, y, x + cell - 1, y + cell - 1), outline="#d8d0c2", width=1)
        icon_path = args.icons_dir / f"{row['slug']}.png"
        if icon_path.exists():
            icon = Image.open(icon_path).convert("RGBA")
            icon.thumbnail((96, 96), Image.Resampling.LANCZOS)
            image.paste(icon, (x + (cell - icon.width) // 2, y + 14), icon)
        else:
            draw.rounded_rectangle((x + 34, y + 18, x + 126, y + 110), radius=12, outline="#b8afa0", width=2)
            draw.text((x + 55, y + 55), "planned", fill="#8c8274", font=small_font)
        draw_wrapped(draw, row["slug"], (x + 12, y + 116), cell - 24, "#211f1c", label_font)
        draw.text((x + 12, y + 146), row["sheet"], fill="#8c8274", font=small_font)

    args.out.parent.mkdir(parents=True, exist_ok=True)
    image.save(args.out)


if __name__ == "__main__":
    main()
