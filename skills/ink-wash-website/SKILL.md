---
name: ink-wash-website
description: "Transform existing or new websites, web apps, landing pages, dashboards, and UI prototypes into a refined modern Chinese ink-wash / guse-guoxiang visual style. Use when Codex is asked to make a site water-ink, sumi-e, Chinese classical, oriental, guofeng, ancient elegant, xuan paper, ink brush, or to apply the bundled ink-common-icons asset library to web UI."
---

# Ink Wash Website

Use this skill to restyle a website into a refined modern Chinese ink-wash experience while preserving its product logic, information architecture, accessibility, and content priority.

## Core Workflow

1. Inspect the target website structure, framework, asset pipeline, and existing icon system.
2. Read `references/visual-system.md` before making visual decisions.
3. Read `references/transformation-prompt.md` when planning the redesign direction or writing implementation notes.
4. Read `references/icon-usage.md` before selecting or copying bundled icons.
5. Choose semantically matched icons from `assets/ink-common-icons/wiki/icon-wiki.tsv` or use `scripts/select_icons.py`.
6. Copy only the icons needed by the target website into its normal static asset folder with `scripts/copy_icons.py`.
7. Implement the visual system in the site's existing styling stack. Prefer CSS variables, design tokens, and reusable components over page-local one-off styles.
8. Verify responsive layout, text contrast, icon loading paths, and that the result does not become theme-park antique, fantasy-game, or low-readability decoration.

## Bundled Icon Library

The skill includes `assets/ink-common-icons/`, a 176-icon transparent PNG library with a Wiki lookup table and preview:

- `assets/ink-common-icons/icons/`: transparent 512px PNG icons.
- `assets/ink-common-icons/wiki/icon-wiki.tsv`: source-of-truth icon metadata.
- `assets/ink-common-icons/wiki/icon-manifest.json`: generated JSON manifest when available.
- `assets/ink-common-icons/wiki/icon-library-preview.png`: full visual preview.

Use icons as UI-supporting assets: feature cards, empty states, section headers, tool buttons, onboarding steps, help panels, and soft decorative accents. Do not replace every icon mechanically; preserve functional clarity.

## Helper Scripts

Run scripts from the skill directory or pass explicit paths.

Build or refresh the JSON manifest:

```bash
python scripts/build_icon_manifest.py
```

Find icon candidates:

```bash
python scripts/select_icons.py --query "login privacy security" --limit 8
python scripts/select_icons.py --query "empty inbox message" --category "知识沟通" --format json
```

Copy selected icons into a project:

```bash
python scripts/copy_icons.py \
  --slugs mail-envelope inbox-tray lightbulb \
  --out /path/to/site/public/ink-icons
```

## Implementation Rules

- Preserve the user's requested product and UX. Apply ink-wash styling as a design system, not as a content rewrite.
- Keep typography readable and modern. Use classical texture and accents around content, not on top of small text.
- Favor rice-paper surfaces, dry-brush borders, subtle ink wash backgrounds, cinnabar seals, jade/indigo accents, and generous breathing room.
- Avoid heavy red-gold palettes, fake old-paper grime, fantasy/xianxia visuals, excessive calligraphy fonts, low contrast, and decorative clutter.
- Use local bundled assets after copying them into the project. Do not reference the skill folder directly from a website's runtime code.
- If the website already has a strong brand, blend ink-wash materials with the brand instead of replacing all identity.
- For operational dashboards or dense apps, keep the layout quiet and efficient; use ink icons sparingly for navigation groups, empty states, and high-level modules.

## Verification

Before finishing:

- Confirm every copied icon path is referenced correctly.
- Confirm pages still work at mobile and desktop widths.
- Check that text does not overlap icons, seals, brush strokes, or paper textures.
- If a dev server is appropriate, run it and inspect the result in a browser or screenshot workflow.
