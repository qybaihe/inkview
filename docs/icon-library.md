# Icon Library / 图标库

InkView includes 176 transparent PNG icons at `assets/ink-common-icons/icons/`.

Source metadata:

- TSV: `assets/ink-common-icons/wiki/icon-wiki.tsv`
- JSON: `assets/ink-common-icons/wiki/icon-manifest.json`
- Preview: `assets/ink-common-icons/wiki/icon-library-preview.png`

## Search

```bash
python scripts/select_icons.py --query "dashboard analytics chart" --limit 8
python scripts/select_icons.py --query "学习 文档 灵感" --limit 8
```

## Copy

```bash
python scripts/copy_icons.py \
  --slugs dashboard-gauge line-chart database-stack \
  --out public/ink-icons \
  --manifest
```

## Categories

- 核心状态 / Core state
- 操作动作 / Actions
- 内容文件 / Content files
- 媒体创作 / Media creative
- 人物社交 / People social
- 商业工作 / Commerce work
- 时间地点 / Time place
- 自然装饰 / Nature decor
- 知识沟通 / Knowledge communication
- 安全权限 / Security access
- 设备工具 / Devices tools
- 生活健康 / Life health
- 数据系统 / Data system

