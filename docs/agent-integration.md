# Agent Integration / Agent 接入

InkView works across agent environments because it is plain Markdown, PNG assets, TSV/JSON metadata, and small Python helpers.

InkView 可以跨 Agent 使用，因为它只依赖 Markdown 指令、PNG 资产、TSV/JSON 元数据和轻量 Python 脚本。

## Codex

Install:

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
cp -R skills/ink-wash-website "${CODEX_HOME:-$HOME/.codex}/skills/"
```

Invoke:

```text
Use $ink-wash-website to transform this website into a refined modern Chinese ink-wash design.
```

Codex will load `SKILL.md`, then the references and assets as needed.

## Cursor

Install in a target project:

```bash
mkdir -p .cursor/rules
cp adapters/cursor/inkview.mdc .cursor/rules/inkview.mdc
```

Recommended project layout:

```text
your-site/
├── .cursor/rules/inkview.mdc
├── public/ink-icons/
├── public/ink-components/
└── src/
```

Copy icons with:

```bash
python /path/to/inkview/scripts/copy_icons.py \
  --slugs lightbulb book-open mail-envelope \
  --out public/ink-icons \
  --manifest
```

Copy text-safe components with:

```bash
python /path/to/inkview/scripts/copy_components.py \
  --slugs safe-paper-card safe-input-shell safe-alert-band \
  --out public/ink-components \
  --manifest
```

## Claude Code

Install in a target project:

```bash
cat adapters/claude-code/CLAUDE.md >> CLAUDE.md
```

Then ask Claude Code to follow the InkView section in `CLAUDE.md`.

## Generic Agents

Use `adapters/generic-agent.md` as the system or project instruction. If the agent supports local files, point it to:

- `assets/ink-common-icons/wiki/icon-wiki.tsv`
- `assets/ink-common-icons/icons/`
- `assets/ink-text-safe-components/wiki/component-wiki.tsv`
- `assets/ink-text-safe-components/components/`
- `docs/design-system.md`
- `examples/agent-prompt.en.md` or `examples/agent-prompt.zh.md`

## Minimal Agent Prompt

```text
You are using InkView. Preserve the target website's information architecture and functionality. Redesign the site with a refined modern Chinese ink-wash visual system: rice-paper surfaces, dry-brush ink lines, restrained cinnabar/jade/indigo/ochre accents, readable typography, semantically matched local icons, and text-safe component shells for live copy. Copy any selected icons or components into the target project's own asset directory before referencing them.
```

中文：

```text
你正在使用 InkView。保留目标网站的信息架构和功能，将其改造成现代中式水墨风：宣纸界面、飞白墨线、克制的朱砂/青玉/靛蓝/赭石点睛、清晰排版，并选择语义匹配的本地图标和适合真实文字的 text-safe 组件外壳。引用前必须先把图标或组件复制到目标项目自己的资源目录。
```
