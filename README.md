# InkView

<p align="center">
  <a href="./README.md"><img alt="English" src="https://img.shields.io/badge/Language-English-2f536f?style=for-the-badge"></a>
  <a href="./README.zh-CN.md"><img alt="中文" src="https://img.shields.io/badge/语言-中文-b64232?style=for-the-badge"></a>
</p>

![InkView hero](assets/inkview-hero.png)

> Turn any website into a refined modern Chinese ink-wash experience.

[![License: MIT](https://img.shields.io/badge/License-MIT-2f536f.svg)](LICENSE)
[![Icons](https://img.shields.io/badge/Ink%20Icons-176-b64232.svg)](assets/ink-common-icons/wiki/icon-wiki.tsv)
[![Text Safe Components](https://img.shields.io/badge/Text--Safe%20Components-40-5c7f67.svg)](assets/ink-text-safe-components/wiki/component-wiki.tsv)
[![Agent Ready](https://img.shields.io/badge/Agent%20Ready-Codex%20%7C%20Cursor%20%7C%20Claude%20Code-5c7f67.svg)](docs/agent-integration.md)

InkView is a portable agent skill and asset library for redesigning websites into a tasteful ink-wash / guofeng visual language. It bundles a 176-icon transparent PNG library, 40 text-safe component shells for live HTML/CSS content, reusable design prompts, CSS tokens, and adapters for Codex, Cursor, Claude Code, and generic AI coding agents.

It is designed for one practical goal: let an agent take an existing website, preserve its product logic and content hierarchy, and restyle it into a refined modern Chinese ink-wash interface with local assets.

## What It Does

- Preserves the original website's information architecture, content hierarchy, conversion goals, and interactions.
- Applies a refined ink-wash system: rice-paper surfaces, dry-brush ink lines, cinnabar seal accents, jade and indigo highlights.
- Selects semantic icons from the bundled `ink-common-icons` wiki.
- Selects text-safe component shells from the bundled `ink-text-safe-components` wiki when real text, forms, tables, buttons, or responsive content are involved.
- Copies assets into the target project's own static folder so the final website is self-contained.
- Provides ready-to-use instructions for Codex, Cursor, Claude Code, and generic agents.
- Avoids low-readability "fake ancient" styling, fantasy UI clutter, and heavy red-gold theme-park aesthetics.

## Repository Map

```text
inkview/
├── assets/
│   ├── inkview-hero.png
│   ├── ink-common-icons/
│       ├── icons/                 # 176 transparent PNG icons
│       ├── sheets/                # original generated sprite sheets
│       ├── wiki/icon-wiki.tsv     # source-of-truth icon wiki
│       └── wiki/icon-manifest.json
│   ├── ink-common-components/     # expressive display/decorative component materials
│   └── ink-text-safe-components/  # 40 shells/frames for live HTML/CSS text
├── skills/ink-wash-website/       # full Codex-compatible skill
├── adapters/
│   ├── cursor/inkview.mdc
│   ├── claude-code/CLAUDE.md
│   └── generic-agent.md
├── docs/
│   ├── agent-integration.md
│   ├── component-library.md
│   ├── design-system.md
│   └── icon-library.md
├── examples/
│   ├── agent-prompt.en.md
│   ├── agent-prompt.zh.md
│   └── css-tokens.css
└── scripts/
    ├── select_icons.py
    ├── copy_icons.py
    ├── select_components.py
    ├── copy_components.py
    ├── build_icon_manifest.py
    └── build_component_manifest.py
```

## Quick Start

### 1. Search for icons

```bash
python scripts/select_icons.py --query "login privacy security" --limit 8
python scripts/select_icons.py --query "empty inbox message" --limit 8
python scripts/select_icons.py --query "dashboard analytics chart" --format json
```

### 2. Copy icons into your website

```bash
python scripts/copy_icons.py \
  --slugs login-door privacy-eye mail-envelope \
  --out ./public/ink-icons \
  --manifest
```

### 3. Search and copy text-safe components

```bash
python scripts/select_components.py --query "hero title text" --limit 8
python scripts/select_components.py --query "form input textarea" --format json

python scripts/copy_components.py \
  --slugs safe-paper-card safe-input-shell safe-alert-band \
  --out ./public/ink-components \
  --manifest
```

### 4. Give your agent the transformation brief

```text
Preserve the website's information architecture, content priority, conversion goals, and core interactions. Redesign the visual system into a refined modern Chinese ink-wash style: rice-paper surfaces, dry-brush ink lines, restrained cinnabar/jade/indigo/ochre accents, calm spacing, readable typography, semantically matched local icons, and text-safe component shells for live copy.
```

## Agent Integration

InkView is intentionally plain-file based. Any coding agent can read Markdown instructions and copy PNG assets.

| Agent | Integration |
| --- | --- |
| Codex | Install `skills/ink-wash-website/` into `${CODEX_HOME:-$HOME/.codex}/skills/`. |
| Cursor | Copy `adapters/cursor/inkview.mdc` into `.cursor/rules/inkview.mdc`. |
| Claude Code | Copy or merge `adapters/claude-code/CLAUDE.md` into your project's `CLAUDE.md`. |
| Generic agents | Use `adapters/generic-agent.md` or `examples/agent-prompt.en.md`. |

See [Agent Integration](docs/agent-integration.md) for full instructions.

## Codex Install

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
cp -R skills/ink-wash-website "${CODEX_HOME:-$HOME/.codex}/skills/"
```

Then invoke:

```text
Use $ink-wash-website to restyle this site as a refined modern Chinese ink-wash website.
```

## Cursor Install

```bash
mkdir -p .cursor/rules
cp adapters/cursor/inkview.mdc .cursor/rules/inkview.mdc
```

Then ask Cursor:

```text
Apply InkView to this website. Use the bundled assets and redesign it into a refined ink-wash visual system.
```

## Claude Code Install

```bash
cat adapters/claude-code/CLAUDE.md >> CLAUDE.md
```

Then ask:

```text
Use the InkView instructions in CLAUDE.md to transform this website into a modern Chinese ink-wash design.
```

## Design System

InkView's style is not "old Chinese decoration pasted on top." It is a product-grade visual language.

```css
:root {
  --ink-bg: #f6f1e6;
  --ink-paper: #fffaf0;
  --ink-paper-deep: #eee3d0;
  --ink-text: #201c18;
  --ink-muted: #6f675d;
  --ink-line: #2a2723;
  --ink-wash: rgba(32, 28, 24, 0.08);
  --ink-cinnabar: #b64232;
  --ink-indigo: #2f536f;
  --ink-jade: #5c7f67;
  --ink-ochre: #b78642;
  --ink-gold: #c8a65a;
}
```

Core principles:

- Use warm rice-paper surfaces instead of plain white.
- Keep text strong, readable, and modern.
- Use cinnabar for seals, status marks, and important highlights.
- Use jade and indigo for secondary accents, links, and depth.
- Use dry-brush dividers and soft ink circles for atmosphere.
- Use icons semantically, not as wallpaper.
- Use text-safe component shells behind real text instead of placing copy over decorative screenshots.

Avoid:

- Heavy red-gold palace styling.
- Fantasy/xianxia game UI.
- Dirty paper texture behind small text.
- Decorative clutter over functional UI.
- Calligraphy fonts for forms, tables, navigation, or buttons.

## Icon Library

The icon library contains 176 transparent 512px PNGs across 13 semantic groups:

- Core state
- Actions
- Content files
- Media creative
- People social
- Commerce work
- Time place
- Nature decor
- Knowledge communication
- Security access
- Devices tools
- Life health
- Data system

Browse the full wiki at [assets/ink-common-icons/wiki/icon-wiki.tsv](assets/ink-common-icons/wiki/icon-wiki.tsv), inspect the JSON manifest at [assets/ink-common-icons/wiki/icon-manifest.json](assets/ink-common-icons/wiki/icon-manifest.json), or view the full preview at [assets/ink-common-icons/wiki/icon-library-preview.png](assets/ink-common-icons/wiki/icon-library-preview.png).

## Component Libraries

InkView includes two component tracks:

- Display components: [assets/ink-common-components](assets/ink-common-components) for decorative, editorial, and atmosphere-heavy UI materials.
- Text-safe components: [assets/ink-text-safe-components](assets/ink-text-safe-components) for real copy, forms, tables, buttons, alerts, cards, and mobile UI.

The text-safe wiki includes `text_zone`, `safe_padding`, and `layer_role` metadata so agents can place real HTML/CSS text without fighting the artwork. Browse the wiki at [assets/ink-text-safe-components/wiki/component-wiki.tsv](assets/ink-text-safe-components/wiki/component-wiki.tsv), inspect the manifest at [assets/ink-text-safe-components/wiki/component-manifest.json](assets/ink-text-safe-components/wiki/component-manifest.json), or view the preview at [assets/ink-text-safe-components/wiki/component-library-preview.png](assets/ink-text-safe-components/wiki/component-library-preview.png).

## Recommended Workflow for Agents

1. Inspect the target website's framework, routes, components, and asset pipeline.
2. Preserve the site's functionality, content priority, and accessibility.
3. Apply InkView tokens globally before restyling individual components.
4. Search the icon wiki for semantic matches.
5. Search the text-safe component wiki for shells and frames when live text is involved.
6. Copy selected icons and components into the target project's own asset directory.
7. Replace or add icons only where they improve clarity or atmosphere.
8. Verify mobile and desktop layout, text contrast, and asset paths.

## License

MIT. See [LICENSE](LICENSE).
