# Icon Usage

## Selection

Start from the Wiki:

```text
assets/ink-common-icons/wiki/icon-wiki.tsv
```

Fields:

- `slug`: stable filename stem.
- `name`: Chinese display name.
- `category`: semantic group.
- `description`: visual description.
- `use_when`: usage keywords.
- `icon_path`: path relative to `assets/ink-common-icons/`.

Use `scripts/select_icons.py` for quick matching. It searches slug, name, category, description, and use_when.

## Copying

Copy icons into the target project; do not reference `~/.codex/skills/...` from runtime code.

Common destinations:

- Vite/React/Next static files: `public/ink-icons/`
- Bundled React assets: `src/assets/ink-icons/`
- Plain HTML: `assets/ink-icons/`

Prefer keeping filenames as `<slug>.png`.

## Usage Patterns

Use icons for:

- Feature cards: one icon per card.
- Empty states: one larger icon plus short text.
- Page section markers: one subtle icon beside a heading.
- Navigation groups: restrained 20px-28px icons.
- Onboarding steps: 48px-80px icons.
- Decorative anchors: low-opacity icon behind a card only when it does not obscure text.

Avoid:

- Replacing every small system icon.
- Using icons as background wallpaper.
- Scaling 512px PNGs above their comfortable size without checking edge quality.
- Putting icons behind form labels, table data, or dense text.

## Category Hints

- Core state: status, success, warning, loading, offline.
- Actions: add, edit, delete, search, share, upload, settings.
- Content files: documents, folders, notes, forms, archives.
- Media creative: images, video, camera, palette, brush.
- People social: profile, team, message, heart, gift.
- Commerce work: wallet, cart, chart, ticket, storefront.
- Time place: clock, map, home, route, travel.
- Nature decor: cloud, leaf, mountain, wave, seal, ink splash.
- Knowledge comm: mail, inbox, book, lightbulb, mind map.
- Security access: key, fingerprint, password, shield, privacy.
- Devices tools: phone, laptop, printer, keyboard, wifi.
- Life health: tea, food, medicine, sleep, running, home.
- Data system: dashboard, charts, database, workflow, kanban.
