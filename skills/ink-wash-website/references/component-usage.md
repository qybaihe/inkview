# Component Usage

InkView has two component asset tracks:

- `assets/ink-common-components/`: expressive display and decorative UI materials.
- `assets/ink-text-safe-components/`: quiet shells, frames, and accents for live text.

## Default Rule

Use text-safe components when real text, data, form values, navigation labels, prices, or chart labels will appear in or near the component.

Use display components only when the asset is mainly decorative, illustrative, or used as a non-critical visual frame.

## Text-Safe Metadata

Start from:

```text
assets/ink-text-safe-components/wiki/component-wiki.tsv
```

Fields:

- `slug`: stable filename stem.
- `name`: Chinese display name.
- `category`: semantic group.
- `description`: visual description.
- `use_when`: usage keywords.
- `text_zone`: recommended clean content area.
- `safe_padding`: minimum CSS padding for live text.
- `layer_role`: intended layer type, such as `background-shell`, `overlay-frame`, or `accent`.
- `component_path`: path relative to `assets/ink-text-safe-components/`.

## Usage Patterns

For cards, panels, alerts, forms, buttons, lists, and mobile UI:

- Place the PNG as a decorative background or absolutely positioned overlay.
- Keep live text in normal HTML/CSS above the asset.
- Use the Wiki `safe_padding` as the starting padding.
- Keep focus rings, hover states, disabled states, and validation states in CSS.
- Avoid putting body text over dark brush strokes, seals, or textured mountain wash.

For overlay frames:

- Put the frame above or around content with `pointer-events: none`.
- Make sure it does not cover selectable text, input carets, or buttons.

For accents:

- Use underlines, corner brackets, seal slots, and ink backdrops sparingly.
- Keep them outside the main reading path whenever possible.

## Helper Scripts

Search component candidates:

```bash
python scripts/select_components.py --query "hero title text" --limit 8
python scripts/select_components.py --query "form input textarea" --format json
```

Copy selected components:

```bash
python scripts/copy_components.py \
  --slugs safe-paper-card safe-input-shell safe-alert-band \
  --out /path/to/site/public/ink-components \
  --manifest
```

## Avoid

- Using display components behind dense text.
- Letting PNG placeholder lines compete with real content.
- Relying on PNGs for responsive text layout.
- Covering labels, table cells, inputs, or buttons with brush strokes.
