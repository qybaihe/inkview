# Codex App 图文课：把 AI 编程从聊天窗口变成项目指挥台

> 课程来源：技术爬爬虾《Codex (APP) 保姆级全攻略，海量实战教程，一期精通 Codex》  
> B 站链接：https://www.bilibili.com/video/BV1Kk9kBAEJv/  
> 本文是基于公开视频信息、OpenAI 官方资料和原创整理制作的图文学习稿，不复制视频逐字稿。

![Codex App 16:9 横版课程海报](assets/poster-codex-app-16x9-1920.png)

## 一句话理解

Codex App 不只是“帮你写代码的聊天框”。更准确地说，它像一个项目指挥台：你把任务、项目文件夹和约束交给它，它用线程、项目、计划模式、Worktree、Skills、MCP 和自动化，把“想法”拆成可以审核、可以测试、可以交付的工作。

OpenAI 官方把 Codex 描述为帮助构建和发布的 coding agent，并强调 Codex App 面向多代理工作流、内置 Worktree、Skills 和 Automations。入门时，官方建议先连接一个项目文件夹，从小任务开始，并保持默认权限，逐步建立信任。

## 这门课适合谁

- 想从 Cursor、Claude Code、Trae 转向 Codex App 的人。
- 想用 AI 做网页、小工具、文档、PPT、代码整理的人。
- 还不熟悉 Git、Worktree、MCP、Skills，但想先知道它们在真实工作流里有什么用的人。

不适合：想让 AI 无审核地直接操作生产项目的人。Codex 的正确打开方式是“人定方向、AI 执行、人再审核”。

## 能力地图

![Codex App 能力地图](assets/diagram-codex-capability-map.png)

先按这个顺序学：

1. 基础使用：创建 Thread，连接 Project，给一个安全任务。
2. 计划模式：让 Codex 先拆任务，不急着改文件。
3. 代码管理：看 diff、跑测试、再决定是否提交。
4. Worktree：让多个方案并行尝试，互不污染。
5. Skills：把常见任务做成可复用能力。
6. MCP/插件：再接外部工具，不要一开始就堆插件。

## 标准工作流

![Codex App 工作流](assets/diagram-codex-workflow.png)

### Step 1：先建一个“安全项目文件夹”

不要一上来把整个电脑、公司仓库或重要项目扔给 Codex。先建一个小文件夹，例如：

```text
Codex-Lab/
├── notes/
├── website-demo/
└── experiments/
```

如果只是练习，可以让 Codex 在空文件夹里创建一个小网页、小文档或数据清理脚本。

### Step 2：创建 Thread，但把任务说窄

一个 Thread 就像一个任务对话，不要把所有事情塞进去。第一条提示词可以这样写：

```text
请先检查这个项目文件夹，告诉我里面有什么。
然后提出一个你可以安全完成的小任务。
在我确认之前，不要修改任何文件。
```

这个提示词的价值是：让 Codex 先观察、再建议、最后等你批准。

### Step 3：用 Plan 模式处理复杂任务

当任务超过 3 步，就先让 Codex 写计划。比如：

```text
我想做一个“课程链接整理页面”。
请先给出实现计划，包括页面结构、数据字段、需要创建的文件、验收标准。
暂时不要写代码。
```

好的计划应该包含：

- 要改哪些文件。
- 每一步完成什么。
- 如何验证结果。
- 有哪些风险。

### Step 4：让它改，但你要看 diff

Codex 很适合做第一版，但不要跳过审核。看 diff 时重点看三件事：

- 有没有改到不该改的文件。
- 有没有引入你看不懂的外部依赖。
- 有没有把 API key、路径、隐私数据写进代码。

### Step 5：用 Skills 做重复任务

Skills 的本质是“把一套稳定流程写成可复用说明 + 资源 + 脚本”。适合做：

- 自动整理课程资料。
- 自动生成 Git commit 摘要。
- 把网页截图和链接整理成报告。
- 按固定风格生成图文课初稿。

第一次不要贪大，可以从“自动生成 commit message”或“整理课程信息卡片”开始。

### Step 6：MCP 和插件放到第二阶段

MCP/插件能让 Codex 接外部工具，比如设计稿、项目管理、部署平台、文档系统。它很强，但也更容易变乱。

建议顺序：

1. 先会本地项目。
2. 再会 Plan 和 diff。
3. 再上 Skills。
4. 最后接 MCP、自动化和云端任务。

## 推荐练习：做一个“课程卡片网页”

这是最适合学习平台的第一个 Codex App 练习。

目标：做一个单页网页，展示 6 门 AI 编程课程。

字段：

```json
{
  "title": "课程名",
  "creator": "UP主",
  "tool": "Codex / OpenClaw / Claude Code",
  "level": "入门 / 进阶",
  "url": "B站链接",
  "why": "为什么值得学"
}
```

给 Codex 的提示词：

```text
请在当前文件夹里创建一个静态网页，用课程卡片展示这些 AI 编程课程。
要求：
1. 使用纯 HTML/CSS/JS，不要引入复杂框架。
2. 页面有筛选按钮：全部、Codex、OpenClaw、Claude Code、Stitch。
3. 每张卡片展示课程名、UP主、工具、难度、推荐理由和“打开课程”链接。
4. 先给出文件计划，等我确认后再写代码。
```

验收标准：

- 双击 `index.html` 能打开。
- 卡片不挤、不溢出。
- 筛选按钮能工作。
- 每个课程链接能跳转。

## 常见误区

| 误区 | 更好的做法 |
|---|---|
| 一上来给“帮我做完整 App” | 先让它写计划和验收标准 |
| 直接给全盘权限 | 只给项目文件夹，先用默认权限 |
| 不看 diff 就提交 | 每次都看改了什么 |
| 插件、MCP、Skills 全装上 | 先学基础，再逐步加能力 |
| 把 Codex 当替代程序员 | 把它当执行力很强、但需要你审核的项目成员 |

## 课程来源截图

这张截图只用于记录来源页面和课程信息，不截取视频画面内容。

![B站课程来源截图](assets/screenshot-bilibili-codex-app.png)

## 来源与校验

- B 站课程：技术爬爬虾《Codex (APP) 保姆级全攻略，海量实战教程，一期精通 Codex》  
  https://www.bilibili.com/video/BV1Kk9kBAEJv/
- OpenAI Codex 产品页：说明 Codex 是 coding agent，Codex App 面向多代理工作流、Worktree、Skills、Automations。  
  https://openai.com/codex/
- OpenAI《Introducing the Codex app》：介绍 Codex App 的并行 agents、Worktree、Skills、Automations、安全与权限设计。  
  https://openai.com/index/introducing-the-codex-app/
- OpenAI Academy《How to get started with Codex》：建议下载桌面 App、创建 Thread、连接项目文件夹、从小任务开始、默认权限起步。  
  https://openai.com/academy/codex-how-to-start/
