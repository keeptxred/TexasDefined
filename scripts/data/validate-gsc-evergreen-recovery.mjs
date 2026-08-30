import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const failures = [];

const lazyMigrated = read('src/data/fixtures/lazy-migrated-editorial.ts');
const financeDepth1 = read('src/data/fixtures/finance-evergreen-depth.ts');
const financeDepth2 = read('src/data/fixtures/finance-evergreen-depth-2.ts');
const relocationDepth = read('src/data/fixtures/relocation-evergreen-depth.ts');
const stockTank = read('src/data/fixtures/stock-tank-name-depth.ts');
const lazyCore = read('src/data/fixtures/lazy-texas-core-articles.ts');
const lazyCoreEvergreen = read('src/data/fixtures/lazy-core-evergreen.ts');
const countiesGuide = read('src/data/fixtures/why-texas-has-254-counties.ts');
const danceHall = read('src/data/fixtures/texas-dance-hall-preservation.ts');
const hurricane = read('src/data/fixtures/texas-hurricane-preparation-guide.ts');
const football = read('src/data/fixtures/high-school-football-newcomers.ts');
const lazyStandalone = read('src/data/fixtures/lazy-standalone-evergreen.ts');
const lazyPractical = read('src/data/fixtures/lazy-practical-evergreen-stubs.ts');
const articleRoute = read('src/routes/article.$slug.tsx');
const sitemap = read('src/routes/sitemap[.]xml.ts');
const texasLiving = read('src/routes/texas-living.tsx');
const financialHub = read('src/routes/decide.financial-tools.tsx');

const firstFinance = [
  'texas-closing-costs-guide',
  'texas-utility-costs-guide',
  'salary-needed-to-buy-a-house-in-texas',
];
const secondFinance = [
  'texas-house-down-payment-guide',
  'should-you-refinance-texas-mortgage',
  'texas-homeowners-insurance-guide',
];

const financeDepth1Set = lazyMigrated.match(/const financeDepthSlugSet = new Set\(\[([\s\S]*?)\n\]\);/)?.[1] ?? '';
const financeDepth2Set = lazyMigrated.match(/const financeDepth2SlugSet = new Set\(\[([\s\S]*?)\n\]\);/)?.[1] ?? '';
if (!financeDepth1Set) failures.push('Could not parse financeDepthSlugSet.');
if (!financeDepth2Set) failures.push('Could not parse financeDepth2SlugSet.');
for (const slug of firstFinance) {
  if (!lazyMigrated.includes(`slug: "${slug}"`)) failures.push(`First finance recovery slug missing from lightweight catalog: ${slug}.`);
  if (!financeDepth1Set.includes(`"${slug}"`)) failures.push(`First finance recovery slug missing from deep-loader set: ${slug}.`);
  if (!financeDepth1.includes(`slug: "${slug}"`)) failures.push(`First finance recovery deep body missing: ${slug}.`);
}
for (const slug of secondFinance) {
  if (!lazyMigrated.includes(`slug: "${slug}"`)) failures.push(`Second finance recovery slug missing from lightweight catalog: ${slug}.`);
  if (!financeDepth2Set.includes(`"${slug}"`)) failures.push(`Second finance recovery slug missing from deep-loader set: ${slug}.`);
  if (!financeDepth2.includes(`slug: "${slug}"`)) failures.push(`Second finance recovery deep body missing: ${slug}.`);
}
for (const marker of [
  'await import("./finance-evergreen-depth")',
  'await import("./finance-evergreen-depth-2")',
  'financeEvergreenDepthArticles.find((article) => article.slug === slug)',
  'financeEvergreenDepth2Articles.find((article) => article.slug === slug)',
]) if (!lazyMigrated.includes(marker)) failures.push(`Finance lazy-loading recovery contract missing ${marker}.`);

for (const marker of [
  'https://www.consumerfinance.gov/owning-a-home/loan-estimate/',
  'https://www.consumerfinance.gov/owning-a-home/closing-disclosure/',
  'https://www.powertochoose.org/PlanDetails/Content/UserGuide',
  'https://www.hud.gov/helping-americans/buying-a-home',
]) if (!financeDepth1.includes(marker)) failures.push(`First finance recovery authority marker missing ${marker}.`);
for (const marker of [
  'https://www.hud.gov/buying/loans',
  'https://www.va.gov/housing-assistance/home-loans/loan-types/purchase-loan/',
  'https://welcomehome.tdhca.texas.gov/',
  'https://www.consumerfinance.gov/ask-cfpb/is-there-such-a-thing-as-a-no-cost-or-no-closing-loan-or-refinancing-en-141/',
  'https://www.tdi.texas.gov/tips/replacing-your-roof.html',
  'https://www.tdi.texas.gov/tips/deductibles.html',
]) if (!financeDepth2.includes(marker)) failures.push(`Second finance recovery authority marker missing ${marker}.`);

for (const path of [
  '/article/texas-utility-costs-guide',
  '/article/texas-closing-costs-guide',
  '/article/salary-needed-to-buy-a-house-in-texas',
]) {
  if (!texasLiving.includes(path)) failures.push(`Texas Life recovery link missing ${path}.`);
  if (!financialHub.includes(path)) failures.push(`Money & Property recovery link missing ${path}.`);
}

const relocationSet = lazyMigrated.match(/const relocationDepthSlugSet = new Set\(\[([\s\S]*?)\n\]\);/)?.[1] ?? '';
if (!relocationSet) failures.push('Could not parse relocationDepthSlugSet.');
for (const slug of ['moving-to-austin-guide', 'moving-to-dallas-fort-worth-guide']) {
  if (!lazyMigrated.includes(`slug: "${slug}"`)) failures.push(`Relocation recovery slug missing from lightweight catalog: ${slug}.`);
  if (!relocationSet.includes(`"${slug}"`)) failures.push(`Relocation recovery slug missing from deep-loader set: ${slug}.`);
  if (!relocationDepth.includes(`slug: "${slug}"`)) failures.push(`Relocation recovery deep body missing: ${slug}.`);
}
for (const marker of [
  'await import("./relocation-evergreen-depth")',
  'relocationEvergreenDepthArticles.find((article) => article.slug === slug)',
]) if (!lazyMigrated.includes(marker)) failures.push(`Relocation lazy-loading recovery contract missing ${marker}.`);
for (const marker of [
  'https://www.austintexas.gov/services/pay-utility-bill',
  'https://www.austintexas.gov/water/rates-and-fees',
  'https://www.capmetro.org/',
  'https://www.ntta.org/plan-your-trip',
  'https://www.dart.org/about/about-dart/about-dart/dart-service-area',
  'https://www.dart.org/guide/transit-and-use/dart-schedules-and-maps',
  'href: "/find-my-school-district"',
  'href: "/browse/counties"',
]) if (!relocationDepth.includes(marker)) failures.push(`Relocation recovery authority/discovery marker missing ${marker}.`);

const stockTankSlug = 'live-2026-06-29-the-history-behind-the-texas-stock-tank-name-bxkvg7';
for (const marker of [
  `const STOCK_TANK_DEPTH_SLUG = "${stockTankSlug}"`,
  'await import("./stock-tank-name-depth")',
  'return stockTankNameDepthArticle',
]) if (!lazyMigrated.includes(marker)) failures.push(`Stock-tank recovery lazy-loader contract missing ${marker}.`);
for (const marker of [
  `slug: "${stockTankSlug}"`,
  'https://tpwd.texas.gov/landwater/land/habitats/post_oak/waterfowl/mallard_res/',
  'https://agrilifeextension.tamu.edu/asset-external/a-pond-to-call-my-own-understanding-water-law-in-texas/',
  'https://www.nrcs.usda.gov/state-offices/texas/news/nors-cattle-co-a-legacy-of-innovation-and-collaboration-with-nrcs',
  'href: "/article/texas-rural-wells-water-guide"',
  'The name starts with livestock, not recreation',
]) if (!stockTank.includes(marker)) failures.push(`Stock-tank recovery contract missing ${marker}.`);

if (!lazyCoreEvergreen.includes('slug: "why-texas-has-254-counties"')) failures.push('254-counties recovery article missing from lazy core evergreen catalog.');
for (const marker of [
  'https://www.texas.gov/local-government-resources/',
  'https://www.tsl.texas.gov/ref/abouttx/countyseats.html',
  'https://comptroller.texas.gov/transparency/local/counties.php',
  'href: "/browse/counties"',
  'href: "/article/texas-courthouses-town-square"',
]) if (!countiesGuide.includes(marker)) failures.push(`254-counties recovery authority/discovery contract missing ${marker}.`);

if (!lazyPractical.includes('slug: "texas-hurricane-preparation-homeowners-renters"')) failures.push('Hurricane recovery stub missing from lazy practical catalog.');
for (const marker of [
  'https://tdem.texas.gov/prepare',
  'https://www.nhc.noaa.gov/prepare/hazards.php',
  'https://www.ready.gov/',
  'href: "/article/texas-homeowners-insurance-guide"',
]) if (!hurricane.includes(marker)) failures.push(`Hurricane recovery contract missing ${marker}.`);

if (!lazyStandalone.includes('slug: "texas-high-school-football-newcomers"')) failures.push('High-school-football recovery article missing from lazy standalone catalog.');
for (const marker of [
  'https://www.uiltexas.org/football/alignments',
  'https://www.uiltexas.org/football/playoff-brackets',
  'href:"/sports-venues/high-school-football"',
]) if (!football.includes(marker)) failures.push(`High-school-football recovery contract missing ${marker}.`);

if (!lazyCore.includes('slug: "texas-dance-hall-survival"')) failures.push('Dance-hall preservation article missing from lightweight core catalog.');
for (const marker of [
  'if (slug === "texas-dance-hall-survival")',
  'await import("./texas-dance-hall-preservation")',
  'return texasDanceHallPreservationArticle',
]) if (!lazyCore.includes(marker)) failures.push(`Dance-hall lazy preservation contract missing ${marker}.`);
for (const marker of [
  'https://texasdancehall.org/',
  'https://texasdancehall.org/dance-hall-owners/preservation-fund-grants/',
  'https://thc.texas.gov/preserve/grants-tax-credits-and-funding/additional-funding-sources-preservation-projects',
  'href: "/texas-dance-halls-honky-tonks"',
  'Continuing use is one of the strongest forms of preservation',
]) if (!danceHall.includes(marker)) failures.push(`Dance-hall preservation recovery contract missing ${marker}.`);
if (lazyCore.includes('Nine hundred were built. Fewer than four hundred are standing.')) failures.push('Dance-hall catalog must not restore the unsupported legacy numeric deck.');

for (const marker of [
  'const canonicalPath = `/article/${params.slug}`',
  'canonicalLink(texasDefinedBrand, canonicalPath)',
]) if (!articleRoute.includes(marker)) failures.push(`Shared evergreen recovery metadata contract missing ${marker}.`);
if (!sitemap.includes('platform.articles.list(scope)')) failures.push('Primary sitemap must continue sourcing recovery-candidate articles from platform.articles.list(scope).');
const articleCatalogPattern = /\.\.\.articles\s*\.filter\(\(article\)\s*=>\s*!isLegacyCountySeriesArticle\(article\.slug\)\s*&&\s*isArticleIndexReady\(article\)\)\s*\.map\(\(article\)\s*=>\s*\(\{\s*path:\s*`\/article\/\$\{article\.slug\}`/s;
if (!articleCatalogPattern.test(sitemap)) failures.push('Primary sitemap must continue publishing recovery-candidate articles through the strict quality-gated canonical article catalog.');

if (failures.length) {
  console.error('GSC evergreen recovery validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('GSC evergreen recovery passed: six finance guides, two relocation guides, stock-tank terminology, 254-county history, hurricane, football and dance-hall preservation retain deep source-backed content, lazy delivery where appropriate, and shared article canonical/strict quality-gated sitemap discovery.');
