import fs from 'node:fs';

const migrated = fs.readFileSync('src/data/fixtures/migrated-editorial.ts', 'utf8');
const lazyMigrated = fs.readFileSync('src/data/fixtures/lazy-migrated-editorial.ts', 'utf8');
const lazyCore = fs.readFileSync('src/data/fixtures/lazy-texas-core-articles.ts', 'utf8');
const coreBodies = fs.readFileSync('src/data/fixtures/texas-core-articles.ts', 'utf8');
const repositories = fs.readFileSync('src/data/fixtures/repositories.ts', 'utf8');
const redirectRoute = fs.readFileSync('src/routes/news.$slug.tsx', 'utf8');
const living = fs.readFileSync('src/routes/texas-living.tsx', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const errors = [];

const expected = [
  'renting-vs-buying-in-texas',
  'texas-house-down-payment-guide',
  'true-cost-of-owning-a-home-in-texas',
  'should-you-refinance-texas-mortgage',
  'texas-home-equity-heloc-guide',
  'texas-mortgage-payment-guide',
  'texas-closing-costs-guide',
  'texas-utility-costs-guide',
  'texas-homeowners-insurance-guide',
  'salary-needed-to-buy-a-house-in-texas',
  'moving-to-houston-address-checklist',
  'moving-to-dallas-fort-worth-guide',
  'moving-to-san-antonio-guide',
  'moving-to-austin-guide',
  'moving-to-el-paso-guide',
  'live-2026-06-29-the-history-behind-the-texas-stock-tank-name-bxkvg7',
  'live-2026-07-07-texas-pitmasters-to-feature-in-new-food-network-competition-series-v3wglp',
];

for (const slug of expected) {
  if (!migrated.includes(`slug: "${slug}"`)) errors.push(`Migrated article body missing: ${slug}`);
  if (!lazyMigrated.includes(`slug: "${slug}"`)) errors.push(`Migrated article catalog stub missing: ${slug}`);
}

const slugMatches = [...migrated.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (new Set(slugMatches).size !== slugMatches.length) errors.push('Migrated editorial body slugs must remain unique.');
if (slugMatches.length !== expected.length) errors.push(`Expected ${expected.length} migrated article bodies, found ${slugMatches.length}.`);

const stubSlugMatches = [...lazyMigrated.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (new Set(stubSlugMatches).size !== stubSlugMatches.length) errors.push('Migrated editorial stub slugs must remain unique.');
if (stubSlugMatches.length !== expected.length) errors.push(`Expected ${expected.length} migrated article stubs, found ${stubSlugMatches.length}.`);

for (const forbidden of ['KeepTXRed', 'Keep TX Red', '/news/homestead', '/tools/']) {
  if (migrated.includes(forbidden) || lazyMigrated.includes(forbidden)) errors.push(`Public migrated editorial contains legacy text or path: ${forbidden}`);
}

for (const feature of [
  'const editorialArticles = [',
  '...texasCoreArticleStubs,',
  '...migratedEditorialArticleStubs,',
  'loadTexasCoreArticle(scope.brandId, slug)',
  'loadMigratedEditorialArticle(scope.brandId, slug)',
  'byBrand(editorialArticles, query.brandId)',
  'href: `/article/${a.slug}`',
]) {
  if (!repositories.includes(feature)) errors.push(`Editorial repository wiring missing: ${feature}`);
}

for (const feature of [
  'await import("./migrated-editorial")',
  'migratedEditorialSlugs',
  'migratedEditorialArticleStubs',
]) {
  if (!lazyMigrated.includes(feature)) errors.push(`Lazy migrated editorial wiring missing: ${feature}`);
}

for (const feature of [
  'await import("./texas-core-articles")',
  'texasCoreArticleStubs',
  'loadTexasCoreArticle',
]) {
  if (!lazyCore.includes(feature)) errors.push(`Lazy core fixture wiring missing: ${feature}`);
}

const coreBodySlugs = [...coreBodies.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
const coreStubSlugs = [...lazyCore.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (coreBodySlugs.length !== 10 || new Set(coreBodySlugs).size !== 10) errors.push('Expected 10 unique lazy core fixture article bodies.');
if (coreStubSlugs.length !== 10 || new Set(coreStubSlugs).size !== 10) errors.push('Expected 10 unique lazy core fixture article stubs.');
for (const slug of coreBodySlugs) {
  if (!coreStubSlugs.includes(slug)) errors.push(`Core fixture article stub missing: ${slug}`);
}

if (repositories.includes('from "./migrated-editorial"')) {
  errors.push('Central article repository must not eagerly import migrated editorial bodies.');
}
if (repositories.includes('  articles,') || repositories.includes('...articles,')) {
  errors.push('Central article repository must not eagerly import the full texas.ts article array.');
}
if (redirectRoute.includes('@/data/fixtures/migrated-editorial"')) {
  errors.push('Legacy news redirect must use lightweight migrated editorial slugs.');
}

for (const feature of [
  'migratedEditorialSlugs.includes(params.slug)',
  'href: `/article/${params.slug}`',
  'statusCode: 301',
  'throw notFound()',
]) {
  if (!redirectRoute.includes(feature)) errors.push(`Legacy article redirect protection missing: ${feature}`);
}

for (const feature of [
  "articlesQuery({ category: 'real-estate' })",
  "articlesQuery({ category: 'moving-to-texas' })",
  'homeArticles.slice(0, 9)',
  'movingArticles.slice(0, 9)',
  'ArticleCard article={article}',
  'actionTo="/real-estate"',
  'actionTo="/moving-to-texas"',
]) {
  if (!living.includes(feature)) errors.push(`Living hub migration exposure missing: ${feature}`);
}

if (!sitemap.includes('platform.articles.list(scope)')) {
  errors.push('Primary sitemap no longer sources the complete article repository.');
}

for (const category of ['real-estate', 'moving-to-texas', 'texas-history', 'food-bbq']) {
  if (!migrated.includes(`category: "${category}"`)) errors.push(`Expected migrated body category is empty: ${category}`);
  if (!lazyMigrated.includes(`category: "${category}"`)) errors.push(`Expected migrated catalog category is empty: ${category}`);
}

if (errors.length) {
  console.error('Editorial migration validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Seventeen migrated lifestyle articles and ten core fixture articles retain lightweight catalogs, lazy detail loading, Texas Life exposure, repository search, sitemap sourcing and legacy redirects.');
