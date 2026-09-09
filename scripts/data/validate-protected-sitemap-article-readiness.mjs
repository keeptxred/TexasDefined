import fs from 'node:fs';

const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');

const required = [
  ['const ARTICLE_LASTMOD_BY_SLUG', 'protected sitemap article registry is missing'],
  ['directlyIndexableLocalArticleSlugs', 'direct index-ready article set is missing'],
  ['Object.keys(ARTICLE_LASTMOD_BY_SLUG)', 'protected article slugs are not resolved'],
  ['isArticleDiscoveryReady(catalogArticle)', 'protected lazy catalog stubs are not required to be discovery-ready'],
  ['platform.articles.getBySlug(scope, slug)', 'protected lazy articles are not resolved to their full detail body'],
  ['fullArticle && isArticleIndexReady(fullArticle)', 'protected lazy articles are not required to pass full index readiness'],
  ['const indexableLocalArticles = [...directlyIndexableLocalArticles, ...protectedLocalArticles]', 'verified protected articles are not merged into sitemap candidates'],
];

for (const [needle, message] of required) {
  if (!sitemap.includes(needle)) throw new Error(message);
}

if (sitemap.includes('...articles.filter((article) => !isLegacyCountySeriesArticle(article.slug) && isArticleDiscoveryReady(article)).map')) {
  throw new Error('Discovery-only article catalog entries must not be submitted directly to the sitemap');
}

console.log('Protected sitemap article readiness contract passed.');
