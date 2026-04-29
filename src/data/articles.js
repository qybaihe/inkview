import bookOpenIcon from '../../assets/ink-common-icons/icons/book-open.png';
import videoIcon from '../../assets/ink-common-icons/icons/video-play.png';
import workflowIcon from '../../assets/ink-common-icons/icons/workflow-nodes.png';
import laptopIcon from '../../assets/ink-common-icons/icons/laptop.png';
import mindMapIcon from '../../assets/ink-common-icons/icons/mind-map.png';
import compassIcon from '../../assets/ink-common-icons/icons/compass.png';

export const categories = [
  {
    id: 'all',
    label: '全部',
    description: '所有已整理和待导入的 AI 编程课程',
  },
  {
    id: 'codex',
    label: 'Codex',
    description: 'Codex App、CLI、Skills、MCP 和自动化',
  },
  {
    id: 'openclaw',
    label: 'OpenClaw',
    description: 'OpenClaw 入门、原理和实战路线',
  },
  {
    id: 'ai-coding',
    label: 'AI 编程',
    description: 'AI 编程工作流、工具组合与路线判断',
  },
  {
    id: 'workflow',
    label: '工作流',
    description: '从想法、图文、代码到发布的完整流程',
  },
];

export const articles = [
  {
    slug: 'codex-app-papaxia',
    title: 'Codex App：把 AI 编程从聊天窗口变成项目指挥台',
    subtitle: '从 Thread、Plan、Worktree 到 Skills/MCP 的第一门主课',
    excerpt:
      '把 B 站长视频拆成可扫描的图文课：先建立正确心智，再按能力地图和标准工作流完成第一轮练习。',
    category: 'Codex',
    categoryId: 'codex',
    tags: ['Codex App', 'AI 编程', 'Skills', 'MCP'],
    tool: 'Codex App',
    level: '入门到进阶',
    duration: '38:13',
    lessonCount: 6,
    publishDate: '2026-04-28',
    lastVerified: '2026-04-29',
    status: 'ready',
    statusLabel: '已生成图文',
    accentIcon: bookOpenIcon,
    cover: 'course-articles/codex-app-papaxia/assets/poster-codex-app-16x9-1920.png',
    markdownPath: 'course-articles/codex-app-papaxia/codex-app-article.md',
    assetBase: 'course-articles/codex-app-papaxia/',
    source: {
      platform: 'Bilibili',
      creator: '技术爬爬虾',
      title: 'Codex (APP) 保姆级全攻略，海量实战教程，一期精通 Codex',
      bvid: 'BV1Kk9kBAEJv',
      url: 'https://www.bilibili.com/video/BV1Kk9kBAEJv/',
    },
    highlights: ['能力地图', '标准工作流', '跟做练习'],
  },
  {
    slug: 'openclaw-first-course',
    title: 'OpenClaw：从理性入门到第一套 AI Agent 工作流',
    subtitle: '预留给 OpenClaw 相关课程的图文入口',
    excerpt:
      '适合承接 OpenClaw 入门、原理课和实战案例，后续导入 Markdown 后会自动进入详情页阅读体验。',
    category: 'OpenClaw',
    categoryId: 'openclaw',
    tags: ['OpenClaw', 'Agent', 'AI 编程'],
    tool: 'OpenClaw',
    level: '入门',
    duration: '待导入',
    lessonCount: 0,
    publishDate: '待导入',
    lastVerified: '待导入',
    status: 'planned',
    statusLabel: '待导入',
    accentIcon: workflowIcon,
    cover: '',
    markdownPath: '',
    assetBase: '',
    source: {
      platform: 'Bilibili',
      creator: '待导入',
      title: '待导入 OpenClaw 课程',
      bvid: '',
      url: '',
    },
    highlights: ['工具定位', '原理理解', '实战路线'],
  },
  {
    slug: 'ai-coding-2026-roadmap',
    title: '2026 AI 编程路线：工具选择、学习顺序和避坑清单',
    subtitle: '预留给 AI 编程路线判断类课程',
    excerpt:
      '把多个公开视频整理成路线型图文，帮助读者判断先学 Codex、Claude Code、OpenClaw 还是全栈基础。',
    category: 'AI 编程',
    categoryId: 'ai-coding',
    tags: ['路线', 'AI Web', '工具选择'],
    tool: 'AI Coding',
    level: '入门',
    duration: '待导入',
    lessonCount: 0,
    publishDate: '待导入',
    lastVerified: '待导入',
    status: 'planned',
    statusLabel: '待导入',
    accentIcon: compassIcon,
    cover: '',
    markdownPath: '',
    assetBase: '',
    source: {
      platform: 'Bilibili',
      creator: '待导入',
      title: '待导入 AI 编程路线课程',
      bvid: '',
      url: '',
    },
    highlights: ['学习路线', '工具组合', '版本复查'],
  },
  {
    slug: 'course-to-article-workflow',
    title: '从 B 站课程到图文稿：采集、校验、重写和发布流程',
    subtitle: '平台内容生产流程的内部样板课',
    excerpt:
      '用于沉淀后续批量导入流程：视频信息、来源截图、Markdown 图文、封面和课程 CTA 的标准字段。',
    category: '工作流',
    categoryId: 'workflow',
    tags: ['内容生产', 'Markdown', 'Bilibili'],
    tool: 'Content Workflow',
    level: '进阶',
    duration: '待导入',
    lessonCount: 0,
    publishDate: '待导入',
    lastVerified: '待导入',
    status: 'planned',
    statusLabel: '待导入',
    accentIcon: mindMapIcon,
    cover: '',
    markdownPath: '',
    assetBase: '',
    source: {
      platform: 'Bilibili',
      creator: '内部流程',
      title: '图文生产流程样板',
      bvid: '',
      url: '',
    },
    highlights: ['采集字段', '图文模板', '发布清单'],
  },
  {
    slug: 'claude-code-codex-compare',
    title: 'Claude Code 与 Codex：AI 编程工具怎么搭配',
    subtitle: '预留给工具对比和迁移类课程',
    excerpt:
      '对比工具边界、项目权限、代码审核和适合场景，未来可作为 Codex 主课之后的延伸阅读。',
    category: 'AI 编程',
    categoryId: 'ai-coding',
    tags: ['Claude Code', 'Codex', '工具对比'],
    tool: 'Claude Code / Codex',
    level: '进阶',
    duration: '待导入',
    lessonCount: 0,
    publishDate: '待导入',
    lastVerified: '待导入',
    status: 'planned',
    statusLabel: '待导入',
    accentIcon: laptopIcon,
    cover: '',
    markdownPath: '',
    assetBase: '',
    source: {
      platform: 'Bilibili',
      creator: '待导入',
      title: '待导入工具对比课程',
      bvid: '',
      url: '',
    },
    highlights: ['适用场景', '迁移路线', '审核习惯'],
  },
  {
    slug: 'stitch-ai-studio-build',
    title: 'Stitch + AI Studio Build：从界面灵感到可运行原型',
    subtitle: '预留给视觉原型和前端生成类课程',
    excerpt:
      '面向想把 AI 编程落到界面的人：设计稿、交互状态、React 实现和移动端检查会放在同一条路径里。',
    category: '工作流',
    categoryId: 'workflow',
    tags: ['Stitch', 'AI Studio', '前端原型'],
    tool: 'Stitch',
    level: '入门',
    duration: '待导入',
    lessonCount: 0,
    publishDate: '待导入',
    lastVerified: '待导入',
    status: 'planned',
    statusLabel: '待导入',
    accentIcon: videoIcon,
    cover: '',
    markdownPath: '',
    assetBase: '',
    source: {
      platform: 'Bilibili',
      creator: '待导入',
      title: '待导入 Stitch 课程',
      bvid: '',
      url: '',
    },
    highlights: ['界面设计', '原型实现', '移动端检查'],
  },
];

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug);
}

export function relatedArticles(currentArticle, limit = 3) {
  return articles
    .filter((article) => article.slug !== currentArticle.slug)
    .filter(
      (article) =>
        article.categoryId === currentArticle.categoryId ||
        article.tags.some((tag) => currentArticle.tags.includes(tag)),
    )
    .slice(0, limit);
}

export const libraryStats = {
  ready: articles.filter((article) => article.status === 'ready').length,
  planned: articles.filter((article) => article.status !== 'ready').length,
  categories: categories.length - 1,
};
