# InkView Component Libraries

InkView now has two component asset tracks.

## Display Components

Path: `assets/ink-common-components/`

These are expressive ink-wash UI materials for previews, empty states, editorial sections, hero plates, visual accents, and decorative framing. They can include placeholder-like marks, heavier scenery, or richer composition.

Use them when the component itself is mainly visual.

## Text-Safe Components

Path: `assets/ink-text-safe-components/`

These are quiet shells, frames, and accents designed to sit behind or around real HTML/CSS text.

Use them when the component contains live copy, form values, table data, chart labels, navigation labels, prices, or responsive content.

## Why Text-Safe Exists

Finished PNG components often look good in isolation but become awkward when real text is added: placeholder lines fight with real copy, textures reduce contrast, and fixed artwork does not adapt to wrapping. Text-safe components solve this by keeping the content zone clean and moving ink texture to the edges.

## Metadata

The text-safe Wiki includes:

- `text_zone`: recommended percentage area for real text or live UI.
- `safe_padding`: minimum CSS padding for the live component.
- `layer_role`: intended usage, such as `background-shell`, `overlay-frame`, `accent`, or `background-accent`.

## Agent Usage

1. Use `assets/ink-common-icons/` for semantic icons.
2. Use `assets/ink-text-safe-components/` for text-heavy UI.
3. Use `assets/ink-common-components/` for decorative or display-heavy sections.
4. Copy selected PNGs into the target project's own asset directory before referencing them.
5. Keep real text, focus states, layout, and responsive behavior in HTML/CSS.

## Commands

Search text-safe components:

```bash
python scripts/select_components.py --query "hero title text" --limit 8
python scripts/select_components.py --query "form input textarea" --format json
```

Copy selected components:

```bash
python scripts/copy_components.py \
  --slugs safe-paper-card safe-input-shell safe-alert-band \
  --out ./public/ink-components \
  --manifest
```

Build or refresh the manifest:

```bash
python scripts/build_component_manifest.py
```
