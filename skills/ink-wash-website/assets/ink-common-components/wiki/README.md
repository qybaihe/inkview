# Ink Common Components

Transparent water-ink UI component material library for InkView.

## Files

- `wiki/component-wiki.tsv`: source-of-truth lookup table.
- `prompts/sheet-prompts.md`: 10 sprite-sheet prompts, 4 components per sheet.
- `sheets/`: generated pure-green source sheets.
- `components/`: transparent PNG component exports.
- `scripts/slice_sheet.py`: crops a 2x2 sheet and removes the green-screen background.
- `scripts/build_preview.py`: creates `wiki/component-library-preview.png`.

## Style

- Modern Chinese ink-wash UI components, not complete webpages.
- Transparent PNG materials that can merge with real website components.
- No readable text. Use abstract lines and dots only.
- Source sheets use a uniform `#00ff00` background for alpha extraction.

## Slice

```bash
python assets/ink-common-components/scripts/slice_sheet.py \
  --sheet assets/ink-common-components/sheets/01-paper-surfaces.png \
  --sheet-id 01-paper-surfaces \
  --wiki assets/ink-common-components/wiki/component-wiki.tsv \
  --out-dir assets/ink-common-components/components
```

Use `--edge-contract 1` if a green fringe remains.
