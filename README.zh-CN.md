# InkView

<p align="center">
  <a href="./README.md"><img alt="English" src="https://img.shields.io/badge/Language-English-2f536f?style=for-the-badge"></a>
  <a href="./README.zh-CN.md"><img alt="中文" src="https://img.shields.io/badge/语言-中文-b64232?style=for-the-badge"></a>
</p>

![InkView 头图](assets/inkview-hero.png)

> 将任意网站转换为有设计感的现代水墨风网站。

[![License: MIT](https://img.shields.io/badge/License-MIT-2f536f.svg)](LICENSE)
[![Icons](https://img.shields.io/badge/Ink%20Icons-176-b64232.svg)](assets/ink-common-icons/wiki/icon-wiki.tsv)
[![Agent Ready](https://img.shields.io/badge/Agent%20Ready-Codex%20%7C%20Cursor%20%7C%20Claude%20Code-5c7f67.svg)](docs/agent-integration.md)

InkView 是一个可移植的 Agent Skill 与水墨资产库，用于把现有网站、Web App、落地页、仪表盘或原型改造成现代中式水墨风。它内置 176 枚透明 PNG 图标、可复用设计提示词、CSS 设计变量，以及 Codex、Cursor、Claude Code 和通用 AI Coding Agent 的接入方式。

它的目标很直接：让任何 Agent 都能读取这套规则，理解目标网站的结构，保留产品逻辑和内容层级，然后把界面改造成精致、克制、可用的现代水墨风。

## 它能做什么

- 保留原网站的信息架构、内容层级、转化目标和核心交互。
- 注入现代水墨视觉系统：宣纸界面、飞白墨线、朱砂印章、青玉与靛蓝点睛。
- 从内置 `ink-common-icons` Wiki 中按语义选择图标。
- 将图标复制到目标项目自己的静态资源目录，最终网站不依赖本仓库路径。
- 为 Codex、Cursor、Claude Code 和通用 Agent 提供开箱即用的接入说明。
- 避免“影楼古风”、页游仙侠、满屏红金、低对比和牺牲可读性的装饰。

## 仓库结构

```text
inkview/
├── assets/
│   ├── inkview-hero.png
│   └── ink-common-icons/
│       ├── icons/                 # 176 枚透明 PNG 图标
│       ├── sheets/                # 原始生成图标表
│       ├── wiki/icon-wiki.tsv     # 图标 Wiki 源数据
│       └── wiki/icon-manifest.json
├── skills/ink-wash-website/       # 完整 Codex Skill
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

## 快速开始

### 1. 检索图标

```bash
python scripts/select_icons.py --query "login privacy security" --limit 8
python scripts/select_icons.py --query "空状态 收件 消息" --limit 8
python scripts/select_icons.py --query "数据 看板 图表" --format json
```

### 2. 将图标复制到你的网站项目

```bash
python scripts/copy_icons.py \
  --slugs login-door privacy-eye mail-envelope \
  --out ./public/ink-icons \
  --manifest
```

### 3. 给 Agent 使用这段改造提示词

```text
保留网站的信息架构、内容优先级、转化目标和核心交互。将视觉系统改造成精致的现代中式水墨风：宣纸界面、干笔墨线、克制的朱砂/青玉/靛蓝/赭石点睛、舒展留白、清晰排版，并从 InkView 内置水墨图标库中选择语义匹配的本地图标。
```

## Agent 接入

InkView 特意做成纯文件方案。任何 Coding Agent 都可以读取 Markdown 指令、复制 PNG 图标、使用 TSV/JSON 元数据。

| Agent | 接入方式 |
| --- | --- |
| Codex | 将 `skills/ink-wash-website/` 安装到 `${CODEX_HOME:-$HOME/.codex}/skills/`。 |
| Cursor | 将 `adapters/cursor/inkview.mdc` 复制到 `.cursor/rules/inkview.mdc`。 |
| Claude Code | 将 `adapters/claude-code/CLAUDE.md` 复制或合并到项目的 `CLAUDE.md`。 |
| 通用 Agent | 使用 `adapters/generic-agent.md` 或 `examples/agent-prompt.zh.md`。 |

完整说明见 [Agent Integration](docs/agent-integration.md)。

## Codex 安装

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
cp -R skills/ink-wash-website "${CODEX_HOME:-$HOME/.codex}/skills/"
```

然后这样调用：

```text
Use $ink-wash-website to restyle this site as a refined modern Chinese ink-wash website.
```

## Cursor 安装

```bash
mkdir -p .cursor/rules
cp adapters/cursor/inkview.mdc .cursor/rules/inkview.mdc
```

然后对 Cursor 说：

```text
Apply InkView to this website. Use the bundled assets and redesign it into a refined ink-wash visual system.
```

## Claude Code 安装

```bash
cat adapters/claude-code/CLAUDE.md >> CLAUDE.md
```

然后这样调用：

```text
Use the InkView instructions in CLAUDE.md to transform this website into a modern Chinese ink-wash design.
```

## 设计系统

InkView 不是简单贴古风素材，而是一套产品级水墨视觉语言。

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

核心原则：

- 用温暖宣纸底替代纯白背景。
- 文字保持浓墨般清晰，同时维持现代可读性。
- 用朱砂做印章、状态和重点标记。
- 用青玉、靛蓝作为辅助强调、链接和层次。
- 用飞白分割线、淡墨圆晕营造氛围。
- 图标按语义使用，不当作背景壁纸铺满页面。

避免：

- 满屏红金的宫廷风。
- 页游仙侠式视觉。
- 影响小字阅读的脏旧纸纹。
- 覆盖功能区的纯装饰。
- 在表单、表格、导航、按钮中滥用书法字体。

## 图标库

图标库包含 176 枚 512px 透明 PNG，覆盖 13 个语义分组：

- 核心状态
- 操作动作
- 内容文件
- 媒体创作
- 人物社交
- 商业工作
- 时间地点
- 自然装饰
- 知识沟通
- 安全权限
- 设备工具
- 生活健康
- 数据系统

你可以查看完整 Wiki：[assets/ink-common-icons/wiki/icon-wiki.tsv](assets/ink-common-icons/wiki/icon-wiki.tsv)，读取 JSON manifest：[assets/ink-common-icons/wiki/icon-manifest.json](assets/ink-common-icons/wiki/icon-manifest.json)，或者打开完整预览图：[assets/ink-common-icons/wiki/icon-library-preview.png](assets/ink-common-icons/wiki/icon-library-preview.png)。

## 推荐 Agent 工作流

1. 检查目标网站的框架、路由、组件和资源管线。
2. 保留网站功能、内容优先级和可访问性。
3. 先全局接入 InkView 设计变量，再改具体组件。
4. 根据页面语义检索图标 Wiki。
5. 将选中的图标复制到目标项目自己的资源目录。
6. 只在能提升语义或氛围的位置替换或添加图标。
7. 检查移动端和桌面端布局、文字对比度、图标路径。

## License

MIT. See [LICENSE](LICENSE).

