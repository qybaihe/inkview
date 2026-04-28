# Ink Common Icons

This library mirrors the Memphis asset workflow, but uses a restrained Chinese ink-wash visual language.

## Files

- `wiki/icon-wiki.tsv`: source-of-truth lookup table for all icons.
- `prompts/sheet-prompts.md`: 8 first-wave 4x3 sprite-sheet prompts and 5 expansion 4x4 sprite-sheet prompts.
- `sheets/`: generated pure-green source sheets.
- `icons/`: transparent PNG exports sliced from sheets.
- `scripts/slice_sheet.py`: crops a 4x3 sheet and removes the green-screen background.
- `scripts/build_preview.py`: creates `wiki/icon-library-preview.png` from available icons and planned placeholders.

## Style

- One compact object per icon.
- Modern ink-wash style: dry-brush edges, grey ink gradients, off-white rice-paper fills, restrained cinnabar, indigo, jade, ochre, or muted gold accents.
- Recognizable at 128px.
- No readable text.
- Source sheets use a uniform `#00ff00` background for alpha extraction.

## Generate

Generate one sheet from `prompts/sheet-prompts.md`, save it under:

```text
design/assets/ink-common-icons/sheets/<sheet-id>.png
```

First-wave sheets are 4 columns by 3 rows. Expansion sheets are 4 columns by 4 rows.

## Slice

```bash
python design/assets/ink-common-icons/scripts/slice_sheet.py \
  --sheet design/assets/ink-common-icons/sheets/01-core-status.png \
  --sheet-id 01-core-status \
  --wiki design/assets/ink-common-icons/wiki/icon-wiki.tsv \
  --out-dir design/assets/ink-common-icons/icons
```

Use `--edge-contract 1` if a green fringe remains.

For 4x4 expansion sheets, add `--rows 4`.

## Preview

```bash
python design/assets/ink-common-icons/scripts/build_preview.py \
  --wiki design/assets/ink-common-icons/wiki/icon-wiki.tsv \
  --icons-dir design/assets/ink-common-icons/icons \
  --out design/assets/ink-common-icons/wiki/icon-library-preview.png
```
