export function assetUrl(path = '') {
  if (!path) return '';
  if (/^(https?:|data:|blob:|mailto:|tel:)/.test(path)) return path;

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.replace(/^\/+/, '');

  return `${normalizedBase}${normalizedPath}`;
}

export function resolveArticleAsset(src = '', article) {
  if (!src) return '';
  if (/^(https?:|data:|blob:|mailto:|tel:|#)/.test(src)) return src;
  if (src.startsWith('/')) return assetUrl(src);

  const base = article?.assetBase || '';
  const normalizedBase = base ? `${base.replace(/\/?$/, '/')}` : '';
  const normalizedSrc = src.replace(/^\.\//, '');

  return assetUrl(`${normalizedBase}${normalizedSrc}`);
}
