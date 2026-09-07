import fs from 'node:fs';

const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const exploreSitemap = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
const failures = [];

function requireText(source, marker, message) {
  if (!source.includes(marker)) failures.push(message);
}

requireText(
  sitemap,
  'const indexableLocalArticles = articles.filter((article) => !isLegacyCountySeriesArticle(article.slug) && isArticleIndexReady(article));',
  'Primary sitemap must create its local article cohort from the strict full-page index-readiness gate.',
);
requireText(
  sitemap,
  '...indexableLocalArticles.map((article) => ({ path: `/article/${article.slug}`',
  'Primary sitemap must publish the strict index-ready local article cohort.',
);
requireText(
  sitemap,
  'const discoveryOnlyLocalArticlePaths = [',
  'Primary sitemap must retain an explicit diagnostic cohort for discovery-ready but non-index-ready articles.',
);
requireText(
  sitemap,
  'Primary sitemap omitted ${discoveryOnlyLocalArticlePaths.length} discovery-only article URLs that are not fully index-ready.',
  'Primary sitemap must make discovery-only URL pruning observable in server logs.',
);

const entriesBlock = sitemap.match(/const entries: SitemapEntry\[\] = \[([\s\S]*?)\n\s*\];/)?.[1] ?? '';
if (!entriesBlock) failures.push('Could not parse the primary sitemap entries block.');
else {
  if (entriesBlock.includes('isArticleDiscoveryReady')) {
    failures.push('Discovery-only article readiness must never be used directly inside the primary sitemap entries block.');
  }
  if (entriesBlock.includes('discoveryOnlyLocalArticlePaths')) {
    failures.push('Discovery-only article diagnostic paths must not be submitted in the primary sitemap.');
  }
}

requireText(
  exploreSitemap,
  '+ indexableDestinations.filter((destination) => destination.category === slug).length',
  'Explore category sitemap readiness must count only index-ready destination profiles.',
);
if (exploreSitemap.includes('+ destinations.filter((destination) => destination.category === slug).length')) {
  failures.push('Explore category sitemap readiness must not be inflated by destination profiles that fail the indexing quality gate.');
}

if (failures.length) {
  console.error('GSC indexation remediation validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('GSC indexation remediation validation passed: discovery-only editorial URLs stay out of submitted sitemaps and Explore category eligibility is based on index-ready destination inventory.');
