import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  HashRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import bookOpenIcon from '../assets/ink-common-icons/icons/book-open.png';
import calendarIcon from '../assets/ink-common-icons/icons/calendar-card.png';
import clockIcon from '../assets/ink-common-icons/icons/clock.png';
import filterIcon from '../assets/ink-common-icons/icons/filter-funnel.png';
import homeIcon from '../assets/ink-common-icons/icons/home.png';
import linkIcon from '../assets/ink-common-icons/icons/link-chain.png';
import searchIcon from '../assets/ink-common-icons/icons/search-magnifier.png';
import shareIcon from '../assets/ink-common-icons/icons/share-arrow.png';
import sparkleIcon from '../assets/ink-common-icons/icons/sparkle.png';
import tagIcon from '../assets/ink-common-icons/icons/tag-label.png';
import videoIcon from '../assets/ink-common-icons/icons/video-play.png';
import {
  articles,
  categories,
  getArticleBySlug,
  libraryStats,
  relatedArticles,
} from './data/articles';
import { assetUrl, resolveArticleAsset } from './lib/assetPath';
import { useMarkdown } from './lib/useMarkdown';

const uiIcons = {
  book: bookOpenIcon,
  calendar: calendarIcon,
  clock: clockIcon,
  filter: filterIcon,
  home: homeIcon,
  link: linkIcon,
  search: searchIcon,
  share: shareIcon,
  sparkle: sparkleIcon,
  tag: tagIcon,
  video: videoIcon,
};

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <SiteChrome />
    </HashRouter>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function SiteChrome() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand-mark" to="/" aria-label="返回首页">
          <span className="brand-seal">Ink</span>
          <span>
            <strong>InkView 课馆</strong>
            <small>AI 编程图文库</small>
          </span>
        </Link>
        <nav className="top-nav" aria-label="主导航">
          <Link to="/">
            <InkIcon src={uiIcons.home} size={22} />
            首页
          </Link>
          <a href="https://www.bilibili.com/" target="_blank" rel="noreferrer">
            <InkIcon src={uiIcons.video} size={22} />
            B 站
          </a>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div>
          <strong>InkView 课馆</strong>
          <span>纯静态课程图文站，无登录，无后台依赖。</span>
        </div>
        <span>Markdown + 本地图片 + Bilibili 课程入口</span>
      </footer>
    </div>
  );
}

function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');

  const filteredArticles = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === 'all' || article.categoryId === activeCategory;

      const searchText = [
        article.title,
        article.subtitle,
        article.excerpt,
        article.category,
        article.tool,
        article.level,
        ...article.tags,
      ]
        .join(' ')
        .toLowerCase();

      return matchesCategory && (!keyword || searchText.includes(keyword));
    });
  }, [activeCategory, query]);

  const featured = articles.find((article) => article.status === 'ready');

  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <InkIcon src={uiIcons.sparkle} size={22} />
            AI 编程课程图文库
          </span>
          <h1>先读图文脉络，再回课程补细节。</h1>
          <p>
            首页先按 Codex、OpenClaw、AI 编程路线和工作流分组，图文详情页保留来源、封面、表格、代码块和图片。
          </p>
          <div className="hero-actions" aria-label="内容概况">
            <StatPill value={libraryStats.ready} label="已生成" />
            <StatPill value={libraryStats.planned} label="待导入" />
            <StatPill value={libraryStats.categories} label="分类" />
          </div>
        </div>

        {featured ? (
          <Link className="featured-panel" to={`/article/${featured.slug}`}>
            <div className="featured-cover">
              <img src={assetUrl(featured.cover)} alt={featured.title} />
            </div>
            <div className="featured-content">
              <span>{featured.statusLabel}</span>
              <strong>{featured.title}</strong>
              <small>
                {featured.source.creator} · {featured.duration}
              </small>
            </div>
            <InkIcon className="feature-arrow" src={uiIcons.share} size={32} />
          </Link>
        ) : null}
      </section>

      <section className="library-toolbar" aria-label="课程筛选">
        <div className="search-box">
          <InkIcon src={uiIcons.search} size={24} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索 Codex、OpenClaw、工作流..."
            aria-label="搜索课程"
          />
        </div>

        <div className="category-strip" role="list" aria-label="课程分类">
          {categories.map((category) => (
            <button
              className={category.id === activeCategory ? 'is-active' : ''}
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              title={category.description}
            >
              <InkIcon src={uiIcons.filter} size={20} />
              {category.label}
            </button>
          ))}
        </div>
      </section>

      <section className="course-grid-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">课程列表</span>
            <h2>{getCategoryTitle(activeCategory)}</h2>
          </div>
          <p>{filteredArticles.length} 个入口</p>
        </div>

        {filteredArticles.length ? (
          <div className="course-grid">
            {filteredArticles.map((article) => (
              <ArticleCard article={article} key={article.slug} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
    </>
  );
}

function StatPill({ value, label }) {
  return (
    <span className="stat-pill">
      <strong>{value}</strong>
      {label}
    </span>
  );
}

function ArticleCard({ article }) {
  const isReady = article.status === 'ready';

  return (
    <article className={`course-card ${isReady ? '' : 'is-planned'}`}>
      <div className="course-visual">
        {article.cover ? (
          <img src={assetUrl(article.cover)} alt={article.title} />
        ) : (
          <div className="course-placeholder" aria-hidden="true">
            <img src={article.accentIcon} alt="" />
          </div>
        )}
        <span className="status-badge">{article.statusLabel}</span>
      </div>

      <div className="course-body">
        <div className="course-meta-line">
          <span>{article.category}</span>
          <span>{article.level}</span>
        </div>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>

        <div className="tag-row" aria-label="标签">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag}>
              <InkIcon src={uiIcons.tag} size={17} />
              {tag}
            </span>
          ))}
        </div>

        <div className="course-facts">
          <span>
            <InkIcon src={uiIcons.clock} size={19} />
            {article.duration}
          </span>
          <span>
            <InkIcon src={uiIcons.book} size={19} />
            {article.lessonCount ? `${article.lessonCount} 节` : '待拆课'}
          </span>
        </div>
      </div>

      <div className="course-actions">
        <Link className="button primary" to={`/article/${article.slug}`}>
          <InkIcon src={uiIcons.book} size={24} />
          读图文
        </Link>
        {article.source.url ? (
          <a
            className="button secondary"
            href={article.source.url}
            target="_blank"
            rel="noreferrer"
          >
            <InkIcon src={uiIcons.video} size={24} />
            看课程
          </a>
        ) : (
          <span className="button secondary is-disabled">
            <InkIcon src={uiIcons.video} size={24} />
            待导入
          </span>
        )}
      </div>
    </article>
  );
}

function ArticlePage() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const markdown = useMarkdown(article?.markdownPath);

  if (!article) return <NotFound />;

  const related = relatedArticles(article);

  return (
    <article className="article-page">
      <nav className="breadcrumb" aria-label="面包屑">
        <Link to="/">
          <InkIcon className="icon-back" src={uiIcons.share} size={21} />
          返回课程列表
        </Link>
        <span>{article.category}</span>
      </nav>

      <header className="article-hero">
        <div className="article-title-block">
          <span className="eyebrow">{article.statusLabel}</span>
          <h1>{article.title}</h1>
          <p>{article.subtitle}</p>
          <div className="article-meta">
            <span>
              <InkIcon src={uiIcons.video} size={22} />
              {article.source.creator}
            </span>
            <span>
              <InkIcon src={uiIcons.clock} size={22} />
              {article.duration}
            </span>
            <span>
              <InkIcon src={uiIcons.calendar} size={22} />
              {article.lastVerified}
            </span>
          </div>
        </div>

        <div className="article-visual">
          {article.cover ? (
            <img src={assetUrl(article.cover)} alt={article.title} />
          ) : (
            <div className="article-placeholder">
              <img src={article.accentIcon} alt="" />
              <span>图文待导入</span>
            </div>
          )}
        </div>
      </header>

      <div className="article-layout">
        <aside className="article-aside" aria-label="课程信息">
          <div className="aside-block">
            <span className="aside-label">工具</span>
            <strong>{article.tool}</strong>
          </div>
          <div className="aside-block">
            <span className="aside-label">来源</span>
            <strong>{article.source.platform}</strong>
            <small>{article.source.title}</small>
          </div>
          <div className="aside-block">
            <span className="aside-label">重点</span>
            <ul>
              {article.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="article-main">
          <MarkdownArticle article={article} markdown={markdown} />
          <CourseCta article={article} />
        </div>
      </div>

      {related.length ? (
        <section className="related-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">继续学习</span>
              <h2>相关入口</h2>
            </div>
          </div>
          <div className="related-grid">
            {related.map((item) => (
              <Link className="related-item" to={`/article/${item.slug}`} key={item.slug}>
                <img src={item.accentIcon} alt="" />
                <span>{item.category}</span>
                <strong>{item.title}</strong>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}

function MarkdownArticle({ article, markdown }) {
  if (markdown.loading) {
    return (
      <div className="markdown-state">
        <span className="loader" />
        <p>正在载入图文内容...</p>
      </div>
    );
  }

  if (markdown.error) {
    return (
      <div className="markdown-state">
        <p>图文内容暂时无法加载。</p>
        <small>{markdown.error}</small>
      </div>
    );
  }

  if (!markdown.content) {
    return (
      <div className="empty-article">
        <img src={article.accentIcon} alt="" />
        <h2>图文稿待导入</h2>
        <p>
          这个入口已经预留好分类、来源、标签和课程 CTA。后续把 Markdown 文件和 assets
          放进对应目录，再补上 manifest 字段即可显示正文。
        </p>
      </div>
    );
  }

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img
              className="markdown-image"
              src={resolveArticleAsset(src, article)}
              alt={alt || ''}
              loading="lazy"
            />
          ),
          table: ({ children }) => (
            <div className="table-wrap">
              <table>{children}</table>
            </div>
          ),
          code: ({ className, children }) => {
            const isBlock = className?.startsWith('language-');
            return isBlock ? (
              <code className={className}>{children}</code>
            ) : (
              <code>{children}</code>
            );
          },
        }}
      >
        {markdown.content}
      </ReactMarkdown>
    </div>
  );
}

function CourseCta({ article }) {
  return (
    <section className="course-cta">
      <div>
        <span className="eyebrow">对应课程</span>
        <h2>{article.source.title}</h2>
        <p>
          图文负责快速建立结构，视频适合回看操作细节、界面变化和讲解节奏。
        </p>
      </div>

      {article.source.url ? (
        <a
          className="button primary large"
          href={article.source.url}
          target="_blank"
          rel="noreferrer"
        >
          <InkIcon src={uiIcons.link} size={25} />
          去 B 站看原课程
        </a>
      ) : (
        <span className="button secondary large is-disabled">
          <InkIcon src={uiIcons.video} size={25} />
          课程链接待导入
        </span>
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="empty-state">
      <InkIcon src={uiIcons.search} size={74} />
      <h3>没有匹配的课程</h3>
      <p>换个关键词或切回全部分类看看。</p>
    </div>
  );
}

function NotFound() {
  return (
    <section className="not-found">
      <span className="eyebrow">404</span>
      <h1>这个图文入口还不存在</h1>
      <p>可以回到首页查看已经整理好的课程卡片。</p>
      <Link className="button primary" to="/">
        <InkIcon src={uiIcons.home} size={24} />
        回首页
      </Link>
    </section>
  );
}

function getCategoryTitle(categoryId) {
  const category = categories.find((item) => item.id === categoryId);
  if (!category || category.id === 'all') return '全部课程图文';
  return `${category.label} 课程`;
}

function InkIcon({ src, size = 22, className = '' }) {
  return (
    <img
      className={`ink-ui-icon ${className}`.trim()}
      src={src}
      alt=""
      aria-hidden="true"
      style={{ '--icon-size': `${size}px` }}
    />
  );
}

export default App;
