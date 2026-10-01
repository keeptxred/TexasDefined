import fs from 'node:fs';

const failures = [];
const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label} is missing: ${needle}`);
};

const article = fs.readFileSync('src/data/fixtures/texas-gateway-index-readiness.ts', 'utf8');
const destination = fs.readFileSync('src/data/destination-audit.ts', 'utf8');
const destinationRuntime = fs.readFileSync('src/data/destination-query-runtime.ts', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const newsRoute = fs.readFileSync('src/routes/news.$slug.tsx', 'utf8');
const policy = fs.readFileSync('docs/page-publication-contract.md', 'utf8');

for (const [needle, label] of [
  ['ARTICLE_INDEX_MIN_HEADINGS', 'article heading floor'],
  ['ARTICLE_INDEX_MIN_DISCOVERY_LINKS', 'article internal-discovery floor'],
  ['ARTICLE_INDEX_MIN_HERO_WIDTH', 'article hero width floor'],
  ['ARTICLE_INDEX_MIN_HERO_HEIGHT', 'article hero height floor'],
  ['hasSaneArticleTitle', 'article title sanity gate'],
  ['hasUsefulHero', 'article hero gate'],
  ['hasUsefulEditorialStructure', 'article structure gate'],
  ['hasDiscoveryLinks', 'article discovery-link gate'],
  ['hasUsefulEditorialStructure(article)', 'full article structure qualification'],
]) requireText(article, needle, label);

for (const [needle, label] of [
  ['MIN_HERO_WIDTH', 'destination hero width floor'],
  ['MIN_HERO_HEIGHT', 'destination hero height floor'],
  ['hasSaneDestinationName', 'destination name sanity gate'],
  ['hasUsefulHeroDimensions', 'destination hero dimension gate'],
  ['hero-dimensions', 'destination hero dimension audit issue'],
  ['readyForIndexing: errors === 0', 'destination fail-closed index decision'],
]) requireText(destination, needle, label);

requireText(destinationRuntime, 'filterSeoReadyDestinations(filterCurrentlyVisitableDestinations(improved))', 'destination catalog readiness integration');
requireText(sitemap, 'isArticleIndexReady', 'sitemap article readiness integration');
requireText(articleRoute, 'shouldNoindexTexasGatewayArticle(article)', 'article route noindex readiness integration');
requireText(newsRoute, 'isArticleIndexReady(article)', 'news route noindex readiness integration');

for (const phrase of [
  'must not become indexable until its page-family readiness function qualifies it',
  'human-readable, non-garbled title or H1',
  'sane heading structure',
  'crawlable internal discovery',
  'declared dimensions',
  'Do not weaken these floors to make a PR pass',
]) requireText(policy, phrase, 'publication-contract documentation');

if (failures.length) {
  console.error(`Page publication contract validation failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Page publication contract is wired upstream: article and destination readiness reject malformed/thin structures before indexability, route/catalog/sitemap surfaces consume the shared gates, and the fail-closed policy is documented.');
