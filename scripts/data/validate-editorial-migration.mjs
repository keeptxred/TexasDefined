import fs from 'node:fs';
import path from 'node:path';

const migrated = fs.readFileSync('src/data/fixtures/migrated-editorial.ts', 'utf8');
const lazyMigrated = fs.readFileSync('src/data/fixtures/lazy-migrated-editorial.ts', 'utf8');
const financeDepth = fs.readFileSync('src/data/fixtures/finance-evergreen-depth.ts', 'utf8');
const financeDepth2 = fs.readFileSync('src/data/fixtures/finance-evergreen-depth-2.ts', 'utf8');
const relocationDepth = fs.readFileSync('src/data/fixtures/relocation-evergreen-depth.ts', 'utf8');
const relocationDepth2 = fs.readFileSync('src/data/fixtures/relocation-evergreen-depth-2.ts', 'utf8');
const lazyCore = fs.readFileSync('src/data/fixtures/lazy-texas-core-articles.ts', 'utf8');
const coreBodies = fs.readFileSync('src/data/fixtures/texas-core-articles.ts', 'utf8');
const repositories = fs.readFileSync('src/data/fixtures/repositories.ts', 'utf8');
const redirectRoute = fs.readFileSync('src/routes/news.$slug.tsx', 'utf8');
const living = fs.readFileSync('src/routes/texas-living.tsx', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const errors = [];

const expected = [
  'renting-vs-buying-in-texas','texas-house-down-payment-guide','true-cost-of-owning-a-home-in-texas','should-you-refinance-texas-mortgage','texas-home-equity-heloc-guide','texas-mortgage-payment-guide','texas-closing-costs-guide','texas-utility-costs-guide','texas-homeowners-insurance-guide','salary-needed-to-buy-a-house-in-texas','moving-to-houston-address-checklist','moving-to-dallas-fort-worth-guide','moving-to-san-antonio-guide','moving-to-austin-guide','moving-to-el-paso-guide','live-2026-06-29-the-history-behind-the-texas-stock-tank-name-bxkvg7','live-2026-07-07-texas-pitmasters-to-feature-in-new-food-network-competition-series-v3wglp',
];
for (const slug of expected) { if (!migrated.includes(`slug: "${slug}"`)) errors.push(`Migrated article body missing: ${slug}`); if (!lazyMigrated.includes(`slug: "${slug}"`)) errors.push(`Migrated article catalog stub missing: ${slug}`); }

const sourceFiles = [];
const collectSource = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) collectSource(full);
    else if (/\.(?:ts|tsx)$/.test(entry.name) && full !== path.join('src', 'routes', 'news.$slug.tsx')) sourceFiles.push(full);
  }
};
collectSource('src');
for (const file of sourceFiles) {
  const source = fs.readFileSync(file, 'utf8');
  for (const slug of expected) {
    if (source.includes(`/news/${slug}`)) errors.push(`Internal source must link migrated article directly to /article/${slug}, not legacy /news/${slug}: ${file}`);
  }
}

const financeDepthSlugs = ['texas-closing-costs-guide','texas-utility-costs-guide','salary-needed-to-buy-a-house-in-texas'];
const financeDepthSet = lazyMigrated.match(/const financeDepthSlugSet = new Set\(\[([\s\S]*?)\n\]\);/)?.[1] ?? '';
if (!financeDepthSet) errors.push('Could not parse financeDepthSlugSet.');
for (const slug of financeDepthSlugs) {
  if (!financeDepth.includes(`slug: "${slug}"`)) errors.push(`Deeper finance evergreen body missing: ${slug}`);
  if (!financeDepthSet.includes(`"${slug}"`)) errors.push(`Finance evergreen override slug missing from financeDepthSlugSet: ${slug}`);
}
for (const feature of ['financeDepthSlugSet','await import("./finance-evergreen-depth")','financeEvergreenDepthArticles.find((article) => article.slug === slug)']) if (!lazyMigrated.includes(feature)) errors.push(`Finance evergreen lazy override wiring missing: ${feature}`);
for (const marker of ['Closing costs and cash to close are not the same number','Use the Closing Disclosure as the final comparison','Use a full year when you can','Separate usage from the rate plan','Debt-to-income is a lender measure, not a household budget','Treat preapproval as a ceiling to evaluate, not a spending instruction']) if (!financeDepth.includes(marker)) errors.push(`Finance evergreen depth marker missing: ${marker}`);
for (const marker of [
  'https://www.consumerfinance.gov/owning-a-home/loan-estimate/',
  'https://www.consumerfinance.gov/owning-a-home/closing-disclosure/',
  'https://www.powertochoose.org/PlanDetails/Content/UserGuide',
  'https://www.hud.gov/helping-americans/buying-a-home',
  'CFPB Loan Estimate explainer',
  'CFPB Closing Disclosure explainer',
  'Texas Power to Choose user guide',
  'HUD homebuying guidance',
]) if (!financeDepth.includes(marker)) errors.push(`Finance evergreen primary-source authority marker missing: ${marker}`);
for (const marker of [
  'import closingHeroAsset from "@/assets/generated/texas-courthouse-square.jpg"',
  'import electricityHeroAsset from "@/assets/generated/texas-electricity-plan.jpg"',
  'import smallTown from "@/assets/small-town.jpg"',
  'const closingHero: Article["hero"]',
  'const utilityHero: Article["hero"]',
  'const salaryHero: Article["hero"]',
  '"migration-finance-depth-closing", closingHero',
  '"migration-finance-depth-utilities", utilityHero',
  '"migration-finance-depth-salary", salaryHero',
]) if (!financeDepth.includes(marker)) errors.push(`Finance evergreen topic-specific hero contract missing: ${marker}`);
if (financeDepth.includes('import heroHillCountry from "@/assets/hero-hill-country.jpg"')) errors.push('Finance evergreen deep articles must not collapse back onto one generic Hill Country hero.');

const financeDepth2Slugs = ['texas-house-down-payment-guide','should-you-refinance-texas-mortgage','texas-homeowners-insurance-guide'];
const financeDepth2Set = lazyMigrated.match(/const financeDepth2SlugSet = new Set\(\[([\s\S]*?)\n\]\);/)?.[1] ?? '';
if (!financeDepth2Set) errors.push('Could not parse financeDepth2SlugSet.');
for (const slug of financeDepth2Slugs) {
  if (!financeDepth2.includes(`slug: "${slug}"`)) errors.push(`Second finance evergreen deep body missing: ${slug}`);
  if (!financeDepth2Set.includes(`"${slug}"`)) errors.push(`Second finance evergreen override slug missing from financeDepth2SlugSet: ${slug}`);
}
for (const feature of ['financeDepth2SlugSet','await import("./finance-evergreen-depth-2")','financeEvergreenDepth2Articles.find((article) => article.slug === slug)']) if (!lazyMigrated.includes(feature)) errors.push(`Second finance evergreen lazy override wiring missing: ${feature}`);

const relocationDepthSlugs = ['moving-to-austin-guide','moving-to-dallas-fort-worth-guide'];
const relocationDepthSet = lazyMigrated.match(/const relocationDepthSlugSet = new Set\(\[([\s\S]*?)\n\]\);/)?.[1] ?? '';
if (!relocationDepthSet) errors.push('Could not parse relocationDepthSlugSet.');
for (const slug of relocationDepthSlugs) {
  if (!relocationDepth.includes(`slug: "${slug}"`)) errors.push(`Relocation evergreen deep body missing: ${slug}`);
  if (!relocationDepthSet.includes(`"${slug}"`)) errors.push(`Relocation evergreen override slug missing from relocationDepthSlugSet: ${slug}`);
}
for (const feature of ['relocationDepthSlugSet','await import("./relocation-evergreen-depth")','relocationEvergreenDepthArticles.find((article) => article.slug === slug)']) if (!lazyMigrated.includes(feature)) errors.push(`Relocation evergreen lazy override wiring missing: ${feature}`);

const relocationDepth2Slugs = ['moving-to-houston-address-checklist','moving-to-san-antonio-guide','moving-to-el-paso-guide'];
const relocationDepth2Set = lazyMigrated.match(/const relocationDepth2SlugSet = new Set\(\[([\s\S]*?)\n\]\);/)?.[1] ?? '';
if (!relocationDepth2Set) errors.push('Could not parse relocationDepth2SlugSet.');
for (const slug of relocationDepth2Slugs) {
  if (!relocationDepth2.includes(`slug: "${slug}"`)) errors.push(`Second relocation evergreen deep body missing: ${slug}`);
  if (!relocationDepth2Set.includes(`"${slug}"`)) errors.push(`Second relocation evergreen override slug missing from relocationDepth2SlugSet: ${slug}`);
}
for (const feature of ['relocationDepth2SlugSet','await import("./relocation-evergreen-depth-2")','relocationEvergreenDepth2Articles.find((article) => article.slug === slug)']) if (!lazyMigrated.includes(feature)) errors.push(`Second relocation evergreen lazy override wiring missing: ${feature}`);
for (const marker of [
  'https://www.harriscountyfws.org/',
  'https://www.houstonpublicworks.org/utility-billing',
  'https://hcad.org/',
  'https://www.cpsenergy.com/content/corporate/en/my-home/savings-programs/rate_estimator_residential.html',
  'https://www.saws.org/service/water-sewer-rates/',
  'https://www.viainfo.net/',
  'https://www.txdmv.gov/motorists/register-your-vehicle',
  'https://www.epwater.org/business/billing-and-rates/rates-and-fees',
  'https://sunmetro.net/',
  'Harris County Flood Warning System',
  'CPS Energy residential bill estimator',
  'El Paso Water rates and fees',
]) if (!relocationDepth2.includes(marker)) errors.push(`Second relocation evergreen authority marker missing: ${marker}`);
for (const marker of [
  'Treat flooding as more than one map color',
  'Verify CPS Energy and SAWS service instead of assuming it',
  'Confirm vehicle and emissions requirements before the move',
]) if (!relocationDepth2.includes(marker)) errors.push(`Second relocation evergreen depth marker missing: ${marker}`);

const slugMatches = [...migrated.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (new Set(slugMatches).size !== slugMatches.length) errors.push('Migrated editorial body slugs must remain unique.');
if (slugMatches.length !== expected.length) errors.push(`Expected ${expected.length} migrated article bodies, found ${slugMatches.length}.`);
const stubSlugMatches = [...lazyMigrated.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (new Set(stubSlugMatches).size !== stubSlugMatches.length) errors.push('Migrated editorial stub slugs must remain unique.');
if (stubSlugMatches.length !== expected.length) errors.push(`Expected ${expected.length} migrated article stubs, found ${stubSlugMatches.length}.`);
for (const forbidden of ['KeepTXRed','Keep TX Red','/news/homestead','/tools/']) if (migrated.includes(forbidden) || lazyMigrated.includes(forbidden) || financeDepth.includes(forbidden) || financeDepth2.includes(forbidden) || relocationDepth.includes(forbidden) || relocationDepth2.includes(forbidden)) errors.push(`Public migrated editorial contains legacy text or path: ${forbidden}`);
for (const feature of ['const editorialArticles = [','...texasCoreArticleStubs,','...migratedEditorialArticleStubs,','loadTexasCoreArticle(scope.brandId, slug)','loadMigratedEditorialArticle(scope.brandId, slug)','byBrand(editorialArticles, query.brandId)','href: `/article/${a.slug}`']) if (!repositories.includes(feature)) errors.push(`Editorial repository wiring missing: ${feature}`);
for (const feature of ['await import("./migrated-editorial")','migratedEditorialSlugs','migratedEditorialArticleStubs']) if (!lazyMigrated.includes(feature)) errors.push(`Lazy migrated editorial wiring missing: ${feature}`);
for (const feature of ['await import("./texas-core-articles")','texasCoreArticleStubs','loadTexasCoreArticle']) if (!lazyCore.includes(feature)) errors.push(`Lazy core fixture wiring missing: ${feature}`);
const coreBodySlugs = [...coreBodies.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
const coreStubSlugs = [...lazyCore.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (coreBodySlugs.length !== 10 || new Set(coreBodySlugs).size !== 10) errors.push('Expected 10 unique lazy core fixture article bodies.');
if (coreStubSlugs.length !== 10 || new Set(coreStubSlugs).size !== 10) errors.push('Expected 10 unique lazy core fixture article stubs.');
for (const slug of coreBodySlugs) if (!coreStubSlugs.includes(slug)) errors.push(`Core fixture article stub missing: ${slug}`);
if (repositories.includes('from "./migrated-editorial"')) errors.push('Central article repository must not eagerly import migrated editorial bodies.');
if (repositories.includes('  articles,') || repositories.includes('...articles,')) errors.push('Central article repository must not eagerly import the full texas.ts article array.');
if (redirectRoute.includes('@/data/fixtures/migrated-editorial"')) errors.push('Legacy news redirect must use lightweight migrated editorial slugs.');
for (const feature of ['migratedEditorialSlugs.includes(params.slug)','href: `/article/${params.slug}`','statusCode: 301','throw notFound()']) if (!redirectRoute.includes(feature)) errors.push(`Legacy article redirect protection missing: ${feature}`);
for (const feature of ["articlesQuery({ category: 'real-estate' })","articlesQuery({ category: 'moving-to-texas' })",'homeArticles.slice(0, 9)','movingArticles.slice(0, 9)','const withTexasLivingPhoto = (article: Article): Article','ArticleCard article={withTexasLivingPhoto(article)}','actionTo="/real-estate"','actionTo="/moving-to-texas"']) if (!living.includes(feature)) errors.push(`Living hub migration exposure missing: ${feature}`);
if (!sitemap.includes('platform.articles.list(scope)')) errors.push('Primary sitemap no longer sources the complete article repository.');
for (const category of ['real-estate','moving-to-texas','texas-history','food-bbq']) { if (!migrated.includes(`category: "${category}"`)) errors.push(`Expected migrated body category is empty: ${category}`); if (!lazyMigrated.includes(`category: "${category}"`)) errors.push(`Expected migrated catalog category is empty: ${category}`); }
if (errors.length) { console.error('Editorial migration validation failed:'); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
console.log('Seventeen migrated lifestyle articles and ten core fixture articles retain lightweight catalogs, lazy detail loading, direct canonical /article linking instead of legacy /news aliases, six protected deeper finance evergreen overrides, five protected deep relocation guides with current official source authority, Texas Life exposure with curated photo enrichment, repository search, sitemap sourcing and legacy redirects.');
