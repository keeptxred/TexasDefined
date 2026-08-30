import fs from 'node:fs';

const registry = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const exploreSitemap = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
const rss = fs.readFileSync('src/routes/rss[.]xml.ts', 'utf8');
const newsLayout = fs.readFileSync('src/routes/news.tsx', 'utf8');
const newsIndex = fs.readFileSync('src/routes/news.index.tsx', 'utf8');
const newsStory = fs.readFileSync('src/routes/news.$slug.tsx', 'utf8');
const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const remoteArticles = fs.readFileSync('src/data/articles-remote.ts', 'utf8');
const gatewayReadiness = fs.readFileSync('src/data/fixtures/texas-gateway-index-readiness.ts', 'utf8');
const articleQueries = fs.readFileSync('src/data/queries.ts', 'utf8');
const lazyEvergreen = fs.readFileSync('src/data/fixtures/lazy-evergreen.ts', 'utf8');
const specialDistricts = fs.readFileSync('src/data/fixtures/muds-pids-hoas-special-districts.ts', 'utf8');
const lazyMigratedEditorial = fs.readFileSync('src/data/fixtures/lazy-migrated-editorial.ts', 'utf8');
const financeEvergreenDepth = fs.readFileSync('src/data/fixtures/finance-evergreen-depth.ts', 'utf8');
const financeEvergreenDepth2 = fs.readFileSync('src/data/fixtures/finance-evergreen-depth-2.ts', 'utf8');
const entityRoute = fs.readFileSync('src/routes/$kind.$slug.tsx', 'utf8');
const countyRoute = fs.readFileSync('src/routes/property-tax.county.$county.tsx', 'utf8');
const failures = [];

const section = (name) => registry.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const;`))?.[1] ?? '';
const always = section('INDEXABLE_STATIC_PATHS');
const conditional = section('CONDITIONAL_INDEXABLE_PUBLIC_PATHS');
const nonIndexable = section('NON_INDEXABLE_PUBLIC_PATHS');
const redirects = section('REDIRECT_ONLY_PATHS');

if (always.includes('"/news"')) failures.push('/news must not be unconditionally indexable.');
if (!conditional.includes('"/news"')) failures.push('/news must be registered as conditionally indexable.');
if (!newsIndex.includes('robots: hasStories ? undefined : "noindex, follow"')) failures.push('/news index must noindex its empty state.');
if (!newsIndex.includes('canonicalPath: "/news"') || !newsIndex.includes('canonicalLink(texasDefinedBrand, "/news")')) failures.push('/news exact index route must own the /news canonical.');
if (newsLayout.includes('canonicalPath') || newsLayout.includes('canonicalLink(') || newsLayout.includes('head:')) failures.push('/news parent layout must remain canonical-neutral so story children cannot inherit a second canonical.');
if (!newsLayout.includes('Outlet')) failures.push('/news parent route must render its exact index or story child through Outlet.');
if (!newsStory.includes('fetchPublishedTexasDefinedNewsArticle') || !newsStory.includes('const canonicalPath = `/news/${params.slug}`') || !newsStory.includes('links: [canonicalLink(texasDefinedBrand, canonicalPath)]')) failures.push('Routed news stories must be feed-backed and own a self-canonical.');
if (!newsStory.includes('robots: isArticleIndexReady(article) ? undefined : "noindex, follow, max-image-preview:large"')) failures.push('Routed news stories must apply the shared article-readiness robots boundary.');
if (!newsIndex.includes('fetchPublishedTexasDefinedNewsArticles')) failures.push('/news listing must use the feed-backed news-only remote query.');
if (!newsIndex.includes('.filter(isArticleIndexReady)')) failures.push('/news listing must exclude remote news below the shared article-readiness floor.');
if (!sitemap.includes('const indexableRemoteNews = remoteNews.filter(isArticleIndexReady);')) failures.push('Primary sitemap must derive an indexable remote-news cohort through the shared readiness floor.');
if (!sitemap.includes('...(indexableRemoteNews.length ? [{ path: "/news" }] : [])')) failures.push('Primary sitemap must publish /news only when index-ready remote news exists.');
if (!sitemap.includes('...indexableRemoteNews.map((article) => ({ path: `/news/${article.slug}`')) failures.push('Primary sitemap must map only index-ready remote news to /news paths.');
if (!sitemap.includes('const indexableRemoteEvergreen = remoteEvergreen.filter(isArticleIndexReady);')) failures.push('Primary sitemap must derive an indexable manual-evergreen cohort through the shared readiness floor.');
if (!sitemap.includes('...indexableRemoteEvergreen.map((article) => ({ path: `/article/${article.slug}`')) failures.push('Primary sitemap must map only index-ready manual evergreen rows to /article paths.');
if (!rss.includes('!isLegacyCountySeriesArticle(article.slug) && isArticleIndexReady(article)')) failures.push('RSS must exclude legacy or non-index-ready editorial articles.');
for (const marker of [
  'if (kind === "evergreen") params.set("source_feed_id", "is.null")',
  'if (kind === "news") params.set("source_feed_id", "not.is.null")',
  'fetchPublishedTexasDefinedEvergreenArticle',
  'fetchPublishedTexasDefinedNewsArticle',
]) {
  if (!remoteArticles.includes(marker)) failures.push(`Remote article routing contract missing: ${marker}`);
}

for (const path of ['/search', '/explore/search', '/shop/cart', '/shop/checkout-return']) {
  if (!nonIndexable.includes(`"${path}"`)) failures.push(`${path} must remain explicitly non-indexable.`);
  if (always.includes(`"${path}"`)) failures.push(`${path} must not be in the always-indexable registry.`);
}

for (const path of ['/tax-calculator', '/texas-financial-tools', '/texas-property-tax-increase-calculator', '/texas-property-tax-protest-guide']) {
  if (!redirects.includes(`"${path}"`)) failures.push(`${path} must remain redirect-only.`);
  if (always.includes(`"${path}"`) || conditional.includes(`"${path}"`)) failures.push(`${path} must not be indexable.`);
}

for (const feature of [
  'const canonicalPath = `/article/${params.slug}`',
  'canonicalLink(texasDefinedBrand, canonicalPath)',
  'title: article.title',
  'description: article.dek',
  'publishedTime: article.publishedAt',
]) {
  if (!articleRoute.includes(feature)) failures.push(`Evergreen article indexation contract missing: ${feature}`);
}
if (!articleRoute.includes('if (!loaderData) return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex, nofollow" }] };')) {
  failures.push('Article route must reserve noindex for the unavailable-loader state.');
}
const articleMetaBlock = articleRoute.match(/meta: buildMeta\(texasDefinedBrand, \{([\s\S]*?)\n\s*\}\),\n\s*links:/)?.[1] ?? '';
const readinessRobotsContract = 'robots: shouldNoindexTexasGatewayArticle(article) ? "noindex, follow, max-image-preview:large" : undefined';
if (!articleMetaBlock) failures.push('Could not parse normal article buildMeta block.');
else {
  const robotsEntries = articleMetaBlock.match(/\brobots\s*:[^\n]+/g) ?? [];
  if (robotsEntries.length > 1 || (robotsEntries.length === 1 && !articleMetaBlock.includes(readinessRobotsContract))) {
    failures.push('Loaded evergreen articles must use the shared article-readiness robots override.');
  }
}
if (!articleRoute.includes('shouldNoindexTexasGatewayArticle')) failures.push('Article route must apply the shared article-readiness noindex helper.');
for (const marker of [
  'export const ARTICLE_INDEX_MIN_BODY_WORDS = 600',
  'export function isArticleIndexReady(article: Article): boolean',
  'if (!isTexasGatewayIndexReadyArticle(article)) return false',
  'return articleBodyWordCount(article) >= ARTICLE_INDEX_MIN_BODY_WORDS',
  'return !isArticleIndexReady(article)',
]) {
  if (!gatewayReadiness.includes(marker)) failures.push(`Article readiness floor missing: ${marker}`);
}
const articleCatalogPattern = /\.\.\.articles\s*\.filter\(\(article\)\s*=>\s*!isLegacyCountySeriesArticle\(article\.slug\)\s*&&\s*isArticleIndexReady\(article\)\)\s*\.map\(\(article\)\s*=>\s*\(\{\s*path:\s*`\/article\/\$\{article\.slug\}`/s;
if (!articleCatalogPattern.test(sitemap)) {
  failures.push('Primary sitemap must publish only non-legacy articles that pass the shared article-readiness floor.');
}
for (const marker of [
  '.map(prepareArticleForDelivery)\n    .filter(isArticleIndexReady)',
  'document.kind !== "article" || indexableArticleHrefs.has(document.href)',
]) {
  if (!articleQueries.includes(marker)) failures.push(`Article discovery/readiness query contract missing: ${marker}`);
}
for (const slug of ['muds-pids-hoas-special-districts-texas', 'texas-towns-german-czech-mexican-roots']) {
  if (!lazyEvergreen.includes(`slug: "${slug}"`)) failures.push(`GSC evergreen indexing candidate is missing from the lazy article registry: ${slug}`);
}
for (const marker of [
  'https://www.tceq.texas.gov/agency/subjects-of-interest/utilities/municipal-utility-districts',
  'https://comptroller.texas.gov/transparency/local/sb625/lookup.php',
  'https://statutes.capitol.texas.gov/Docs/LG/htm/LG.372.htm',
  'https://statutes.capitol.texas.gov/Docs/PR/htm/PR.209.htm',
  'TCEQ municipal utility district resources',
  'Texas special purpose district database',
  'Texas Local Government Code Chapter 372',
  'Texas Residential Property Owners Protection Act',
  'href: "/learn/mud-taxes-explained"',
  'href: "/learn/property-taxes"',
]) {
  if (!specialDistricts.includes(marker)) failures.push(`Special-district evergreen authority/discovery contract missing: ${marker}`);
}

const migratedFinanceEvergreens = [
  'texas-closing-costs-guide',
  'texas-utility-costs-guide',
  'salary-needed-to-buy-a-house-in-texas',
];
const financeDepthBlock = lazyMigratedEditorial.match(/const financeDepthSlugSet = new Set\(\[([\s\S]*?)\n\]\);/)?.[1] ?? '';
if (!financeDepthBlock) failures.push('Could not parse financeDepthSlugSet from lazy migrated editorial registry.');
for (const slug of migratedFinanceEvergreens) {
  if (!lazyMigratedEditorial.includes(`slug: "${slug}"`)) failures.push(`Migrated finance evergreen is missing from the lazy article registry: ${slug}`);
  if (!financeDepthBlock.includes(`"${slug}"`)) failures.push(`Migrated finance evergreen is missing from financeDepthSlugSet: ${slug}`);
  if (!financeEvergreenDepth.includes(`slug: "${slug}"`)) failures.push(`Migrated finance evergreen deep article is missing: ${slug}`);
}
for (const marker of [
  'const financeDepthSlugSet = new Set([',
  'if (financeDepthSlugSet.has(slug))',
  'await import("./finance-evergreen-depth")',
  'financeEvergreenDepthArticles.find((article) => article.slug === slug)',
]) {
  if (!lazyMigratedEditorial.includes(marker)) failures.push(`Finance evergreen deep-loader contract missing: ${marker}`);
}

const migratedFinanceEvergreens2 = [
  'texas-house-down-payment-guide',
  'should-you-refinance-texas-mortgage',
  'texas-homeowners-insurance-guide',
];
const financeDepth2Block = lazyMigratedEditorial.match(/const financeDepth2SlugSet = new Set\(\[([\s\S]*?)\n\]\);/)?.[1] ?? '';
if (!financeDepth2Block) failures.push('Could not parse financeDepth2SlugSet from lazy migrated editorial registry.');
for (const slug of migratedFinanceEvergreens2) {
  if (!lazyMigratedEditorial.includes(`slug: "${slug}"`)) failures.push(`Second-batch finance evergreen is missing from the lazy article registry: ${slug}`);
  if (!financeDepth2Block.includes(`"${slug}"`)) failures.push(`Second-batch finance evergreen is missing from financeDepth2SlugSet: ${slug}`);
  if (!financeEvergreenDepth2.includes(`slug: "${slug}"`)) failures.push(`Second-batch finance evergreen deep article is missing: ${slug}`);
}
for (const marker of [
  'const financeDepth2SlugSet = new Set([',
  'if (financeDepth2SlugSet.has(slug))',
  'await import("./finance-evergreen-depth-2")',
  'financeEvergreenDepth2Articles.find((article) => article.slug === slug)',
]) {
  if (!lazyMigratedEditorial.includes(marker)) failures.push(`Second finance evergreen deep-loader contract missing: ${marker}`);
}
for (const marker of [
  'https://www.hud.gov/buying/loans',
  'https://www.va.gov/housing-assistance/home-loans/loan-types/purchase-loan/',
  'https://welcomehome.tdhca.texas.gov/',
  'https://www.consumerfinance.gov/consumer-tools/mortgages/answers/key-terms/',
  'https://www.consumerfinance.gov/ask-cfpb/is-there-such-a-thing-as-a-no-cost-or-no-closing-loan-or-refinancing-en-141/',
  'https://www.tdi.texas.gov/tips/replacing-your-roof.html',
  'https://www.tdi.texas.gov/tips/deductibles.html',
  'href: "/texas-down-payment-calculator"',
  'href: "/texas-refinance-savings-calculator"',
  'href: "/texas-home-insurance-calculator"',
]) {
  if (!financeEvergreenDepth2.includes(marker)) failures.push(`Second finance evergreen authority/discovery contract missing: ${marker}`);
}

if (!entityRoute.includes('isIndexableEntityPage')) failures.push('Generic entity indexation gate missing: isIndexableEntityPage.');
if (!entityRoute.includes('robots: indexable ? undefined :') || !entityRoute.includes('noindex, follow')) failures.push('Generic entity pages must emit a noindex directive when the quality gate fails.');
if (!countyRoute.includes('isCountyPropertyIndexReady')) failures.push('County indexation gate missing: isCountyPropertyIndexReady.');
if (!countyRoute.includes('robots: indexReady ? undefined :') || !countyRoute.includes('noindex, follow')) failures.push('County pages must emit a noindex directive when the quality gate fails.');
for (const feature of ['graph.filter(isIndexableEntityPage)', 'COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady)']) if (!sitemap.includes(feature)) failures.push(`Primary sitemap quality gate missing: ${feature}`);
for (const feature of ['isPrimaryTripPlannerDestination(destination)', 'auditDestination(destination).readyForIndexing']) if (!exploreSitemap.includes(feature)) failures.push(`Explore sitemap destination quality gate missing: ${feature}`);
if (!sitemap.includes('.filter((path) => !isExploreSitemapOwnedPath(path))')) failures.push('Primary sitemap must exclude Explore-owned static paths.');
if (!exploreSitemap.includes('!isExploreSitemapOwnedPath(normalized)')) failures.push('Explore sitemap must reject paths outside its owned crawl namespace.');

if (failures.length) {
  console.error('Indexation quality validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('Indexation quality validation passed: conditional feed-backed news, routed-news canonical isolation, strict article/news/RSS/sitemap readiness gating, canonical manual evergreen routing, public article search/listing readiness, primary-source-backed special-district evergreen authority, two parsed migrated finance deep-content batches with primary-source authority and reciprocal tools, noindex utilities, redirects, generated-page quality gates, and sitemap ownership are aligned.');
