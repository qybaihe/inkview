# 课程图文内容格式

静态站读取 `src/data/articles.js` 里的课程清单，并从
`public/course-articles/<slug>/` 渲染 Markdown 图文。

## 目录结构

```text
public/course-articles/<slug>/
├── <article>.md
└── assets/
    ├── poster.png
    ├── screenshot.png
    └── bilibili-view-info.json
```

当前已经生成的图文格式可以直接兼容：

- Markdown 正文支持标题、列表、表格、引用、代码块和图片。
- 图片可以继续使用 `assets/poster.png` 这类相对路径。
- B 站元数据可以保留在 `assets/bilibili-view-info.json`。
- B 站课程链接放在课程清单的 `source.url` 字段里。

## 清单字段

新增课程时，在 `articles` 里补一个对象：

```js
{
  slug: 'codex-app-papaxia',
  title: 'Codex App：把 AI 编程从聊天窗口变成项目指挥台',
  categoryId: 'codex',
  tags: ['Codex App', 'AI 编程'],
  status: 'ready',
  cover: 'course-articles/codex-app-papaxia/assets/poster-codex-app-16x9-1920.png',
  markdownPath: 'course-articles/codex-app-papaxia/codex-app-article.md',
  assetBase: 'course-articles/codex-app-papaxia/',
  source: {
    platform: 'Bilibili',
    creator: '技术爬爬虾',
    bvid: 'BV1Kk9kBAEJv',
    url: 'https://www.bilibili.com/video/BV1Kk9kBAEJv/'
  }
}
```

如果 `markdownPath` 为空，详情页会显示“图文待导入”状态，但卡片、分类和
B 站课程入口的位置都会先保留下来。
