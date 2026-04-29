# Ink Text-Safe Components

Transparent ink-wash component materials designed to work with real HTML/CSS text.

This library complements `assets/ink-common-components/`:

- `ink-common-components`: expressive display and decorative UI materials.
- `ink-text-safe-components`: quiet shells, frames, and accents that keep text readable.

## Files

- `wiki/component-wiki.tsv`: source-of-truth lookup table.
- `wiki/component-manifest.json`: generated JSON manifest.
- `wiki/component-library-preview.png`: full visual preview.
- `prompts/sheet-prompts.md`: 10 sprite-sheet prompts, 4 components per sheet.
- `sheets/`: generated pure-green source sheets.
- `components/`: transparent PNG exports.
- `scripts/slice_sheet.py`: crops a 2x2 sheet and removes green-screen background.
- `scripts/build_preview.py`: creates the preview image.

## Text-Safe Rules

- Keep the central text zone clean.
- Put brush texture, paper edges, seals, and ink wash near edges or corners.
- Do not draw readable text or fake text placeholder lines.
- Use PNGs as background shells, overlay frames, or accents.
- Let real HTML/CSS own typography, wrapping, focus states, and responsiveness.

## Wiki Fields

- `text_zone`: recommended percentage area for real text or live UI.
- `safe_padding`: minimum CSS padding inside the real component.
- `layer_role`: how to use the PNG, such as `background-shell`, `overlay-frame`, or `accent`.

## Slice

```bash
python assets/ink-text-safe-components/scripts/slice_sheet.py \
  --sheet assets/ink-text-safe-components/sheets/01-text-containers.png \
  --sheet-id 01-text-containers \
  --wiki assets/ink-text-safe-components/wiki/component-wiki.tsv \
  --out-dir assets/ink-text-safe-components/components \
  --transparent-threshold 95 \
  --opaque-threshold 235 \
  --edge-contract 1
```
