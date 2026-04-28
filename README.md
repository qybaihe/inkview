# InkView

![InkView hero](assets/inkview-hero.png)

> Turn any website into a refined modern Chinese ink-wash experience.  
> 将任意网站转换为有设计感的现代水墨风网站。

[![License: MIT](https://img.shields.io/badge/License-MIT-2f536f.svg)](LICENSE)
[![Icons](https://img.shields.io/badge/Ink%20Icons-176-b64232.svg)](assets/ink-common-icons/wiki/icon-wiki.tsv)
[![Agent Ready](https://img.shields.io/badge/Agent%20Ready-Codex%20%7C%20Cursor%20%7C%20Claude%20Code-5c7f67.svg)](docs/agent-integration.md)

InkView is a portable agent skill and asset library for redesigning websites into a tasteful ink-wash / guofeng visual language. It bundles a 176-icon transparent PNG library, bilingual usage guidance, reusable design prompts, and adapters for Codex, Cursor, Claude Code, and generic AI coding agents.

InkView 是一个可移植的 Agent Skill 与水墨资产库，用于把现有网站、Web App、落地页、仪表盘或原型改造成现代中式水墨风。它内置 176 枚透明 PNG 图标、双语说明、可复用设计提示词，以及 Codex、Cursor、Claude Code 和通用 AI Agent 的接入方式。

## What It Does

- Preserves the original website's product logic, content hierarchy, and interactions.
- Applies a refined ink-wash system: rice-paper surfaces, dry-brush ink lines, cinnabar seal accents, jade and indigo highlights.
- Selects semantic icons from the bundled `ink-common-icons` wiki.
- Copies assets into the target project's own static folder, so the final website is self-contained.
- Avoids low-readability "fake ancient" styling, fantasy UI clutter, and heavy red-gold theme-park aesthetics.

## 它能做什么

- 保留原网站的产品逻辑、内容层级和核心交互。
- 注入现代水墨视觉系统：宣纸底、飞白墨线、朱砂印章、青玉与靛蓝点睛。
- 从内置 `ink-common-icons` Wiki 中按语义选择图标。
- 将图标复制到目标项目自己的静态资源目录，最终网站不依赖本仓库路径。
- 避免“影楼古风”、页游仙侠、满屏红金、低对比和牺牲可读性的装饰。

## Repository Map

```text
inkview/
├── assets/
│   ├── inkview-hero.png
│   └── ink-common-icons/
│       ├── icons/                 # 176 transparent PNG icons
│       ├── sheets/                # original generated sprite sheets
│       ├── wiki/icon-wiki.tsv     # source-of-truth icon wiki
│       └── wiki/icon-manifest.json
├── skills/ink-wash-website/       # full Codex-compatible skill
├── adapters/
│   ├── cursor/inkview.mdc
│   ├── claude-code/CLAUDE.md
│   └── generic-agent.md
├── docs/
│   ├── agent-integration.md
│   ├── design-system.md
│   └── icon-library.md
├── examples/
│   ├── agent-prompt.en.md
│   ├── agent-prompt.zh.md
│   └── css-tokens.css
└── scripts/
    ├── select_icons.py
    ├── copy_icons.py
    └── build_icon_manifest.py
```

## Quick Start

### 1. Pick icons

```bash
python scripts/select_icons.py --query "login privacy security" --limit 8
python scripts/select_icons.py --query "空状态 收件 消息" --limit 8
```

### 2. Copy icons into your website

```bash
python scripts/copy_icons.py \
  --slugs login-door privacy-eye mail-envelope \
  --out ./public/ink-icons \
  --manifest
```

### 3. Use the design prompt

```text
Preserve the website's information architecture, content priority, conversion goals, and core interactions. Redesign the visual system into a refined modern Chinese ink-wash style: rice-paper surfaces, dry-brush ink lines, restrained cinnabar/jade/indigo/ochre accents, calm spacing, readable typography, and semantically matched local icons from the bundled ink-common-icons library.
```

中文：

```text
保留网站原有的信息架构、内容优先级、转化目标和核心交互。将视觉系统改造成精致的现代中式水墨风：宣纸界面、干笔墨线、克制的朱砂/青玉/靛蓝/赭石点睛、舒展留白、清晰排版，并从内置水墨图标库中选择语义匹配的本地图标。
```

## Agent Integration

InkView is intentionally plain-file based. Any coding agent can read Markdown instructions and copy PNG assets.

- **Codex**: copy `skills/ink-wash-website/` into `${CODEX_HOME:-$HOME/.codex}/skills/`.
- **Cursor**: copy `adapters/cursor/inkview.mdc` into `.cursor/rules/inkview.mdc`.
- **Claude Code**: copy or merge `adapters/claude-code/CLAUDE.md` into your project's `CLAUDE.md`.
- **Generic agents**: use `adapters/generic-agent.md` or `examples/agent-prompt.*.md`.

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

## Design Principles

InkView's style is not "old Chinese decoration pasted on top." It is a product-grade design language:

- Warm rice-paper surfaces instead of plain white.
- Strong black ink text and quiet grey ink wash.
- Cinnabar for seals, status marks, and important highlights.
- Jade and indigo for secondary accents, links, and depth.
- Dry-brush dividers and soft ink circles for atmosphere.
- Modern, readable typography for all functional text.

## 设计原则

InkView 不是简单贴古风素材，而是一套产品级水墨视觉语言：

- 用温暖宣纸底替代纯白背景。
- 用浓墨文字与浅墨层次建立可读性。
- 用朱砂做印章、状态和重点标记。
- 用青玉、靛蓝作为辅助强调和层次。
- 用飞白分割线、淡墨圆晕营造氛围。
- 功能文字始终保持现代、清晰、可读。

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

Browse the full wiki at [assets/ink-common-icons/wiki/icon-wiki.tsv](assets/ink-common-icons/wiki/icon-wiki.tsv), or inspect the visual preview at [assets/ink-common-icons/wiki/icon-library-preview.png](assets/ink-common-icons/wiki/icon-library-preview.png).

## License

MIT. See [LICENSE](LICENSE).

