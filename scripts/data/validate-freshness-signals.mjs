import fs from 'node:fs';

const entityIndex = fs.readFileSync('src/data/knowledge-graph/index.ts', 'utf8');
const primarySitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const exploreSitemap = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
const countyRoute = fs.readFileSync('src/routes/property-tax.county.$county.tsx', 'utf8');
const failures = [];
const sitemapIndex = fs.readFileSync('public/sitemap-index.xml', 'utf8');
const robots = fs.readFileSync('public/robots.txt', 'utf8');
const expectedSitemapUrls = [
  'https://texasdefined.com/sitemap.xml',
  'https://texasdefined.com/sitemap-explore.xml',
  'https://texasdefined.com/sitemap-texas-icons.xml',
];


const playoffsArticle = fs.readFileSync('src/data/fixtures/texas-high-school-football-playoffs.ts', 'utf8');
const playoffUpdatedAt = playoffsArticle.match(/updatedAt:\s*"([^\"]+)"/)?.[1];
const playoffSitemapDate = primarySitemap.match(/"texas-high-school-football-playoffs-explained":\s*"([^\"]+)"/)?.[1];
if (!playoffUpdatedAt || playoffUpdatedAt !== playoffSitemapDate) {
  failures.push('Football playoff sitemap lastmod must match its verified editorial updatedAt.');
}

// A stable sitemap index must list only live governed feeds. Never invent
// freshness dates for a sitemap index or overwrite page timestamps on a deploy.
if (!sitemapIndex.includes('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
  failures.push('Sitemap index XML root or namespace missing.');
}
const indexedFeeds = sitemapIndex.split('\n')
  .map((line) => line.trim())
  .filter((line) => line.startsWith('<sitemap><loc>'))
  .map((line) => line.replace('<sitemap><loc>', '').replace('</loc></sitemap>', ''));
if (JSON.stringify(indexedFeeds) !== JSON.stringify(expectedSitemapUrls)) {
  failures.push('Sitemap index must reference each owned and verified feed exactly once, in the documented order.');
}
if (sitemapIndex.includes('<lastmod>')) failures.push('Static sitemap index must not claim an unverified feed modification date.');
if (!robots.includes('Sitemap: https://texasdefined.com/sitemap-index.xml')) {
  failures.push('robots.txt must advertise the new sitemap index without replacing old endpoints.');
}
for (const url of expectedSitemapUrls) {
  if (!robots.includes(`Sitemap: ${url}`)) failures.push(`Previously advertised sitemap must stay discoverable: ${url}`);
}
const articleLastmodUsesEditorialUpdates = primarySitemap.split('toDate(article.updatedAt ?? ARTICLE_LASTMOD_BY_SLUG[article.slug] ?? article.publishedAt)').length - 1;
if (articleLastmodUsesEditorialUpdates !== 3) {
  failures.push('Article sitemap entries must prefer source-backed updatedAt, with reviewed overrides and publishedAt as fallbacks.');
}
if (!primarySitemap.includes('toDate(article.updatedAt ?? article.publishedAt)')) {
  failures.push('News sitemap lastmod must prefer an actual editorial updatedAt when available.');
}

const forbiddenDynamicFreshness = [
  "sourceCheckedAt: localGovernment.countyWebsiteUrl ? new Date().toISOString().slice(0, 10) : geographic.sourceCheckedAt",
  "sourceCheckedAt: office.lastUpdated ?? new Date().toISOString().slice(0, 10)",
];
for (const forbidden of forbiddenDynamicFreshness) {
  if (entityIndex.includes(forbidden)) failures.push(`Request-time freshness stamp must not return: ${forbidden}`);
}

for (const required of [
  'sourceCheckedAt: geographic.sourceCheckedAt',
  'sourceCheckedAt: office.lastUpdated ?? entity.sourceCheckedAt',
]) {
  if (!entityIndex.includes(required)) failures.push(`Stable entity freshness contract missing: ${required}`);
}

if (!primarySitemap.includes('lastmod: toDate(entity.sourceCheckedAt)')) {
  failures.push('Primary sitemap entity lastmod must remain tied to the governed sourceCheckedAt field.');
}
if (!exploreSitemap.includes('entry(`/destination/${item.slug}`, item.sourceCheckedAt)')) {
  failures.push('Explore sitemap destination lastmod must remain tied to sourceCheckedAt rather than request time.');
}
if (!countyRoute.includes('...(county.lastVerifiedAt ? { dateModified: county.lastVerifiedAt } : {})')) {
  failures.push('County structured-data dateModified must remain conditional on a real lastVerifiedAt value.');
}
if (countyRoute.includes("dateModified: '2026-08-08'")) {
  failures.push('Hard-coded county dateModified values must not return.');
}

if (failures.length) {
  console.error('Freshness signal validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Freshness signal validation passed: sitemap and structured-data dates are source-backed and request-time enrichment cannot manufacture daily modification signals.');
