import fs from 'node:fs';

const failures = [];
const read = (file) => fs.readFileSync(file, 'utf8');
const readRouteSurface = (file) => {
  const eagerSource = read(file);
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(lazyFile) ? `${eagerSource}\n${read(lazyFile)}` : eagerSource;
};

const registry = read('src/lib/public-routes.ts');
const brand = read('src/brand/texasdefined.ts');
const exploreDiscovery = read('src/components/editorial/ExploreDiscovery.tsx');
const texasLifeDiscovery = read('src/components/editorial/TexasLifeDiscovery.tsx');
const categoryPage = read('src/components/editorial/CategoryPage.tsx');
const calculatorPage = read('src/components/calculators/CalculatorPage.tsx');
const financialToolsHub = read('src/routes/decide.financial-tools.tsx');
const closingCostPage = readRouteSurface('src/routes/texas-closing-cost-calculator.tsx');
const affordabilityPage = readRouteSurface('src/routes/texas-home-affordability-calculator.tsx');
const utilityCostPage = readRouteSurface('src/routes/texas-utility-cost-calculator.tsx');
const dataIndex = read('src/data/index.ts');
const destinationPlanner = read('src/components/editorial/DestinationVisitPlanner.tsx');
const destinationRelationships = read('src/components/editorial/DestinationRelationships.tsx');
const texasExplainedContext = read('src/components/editorial/TexasExplainedContextLinks.tsx');
const fishingHub = read('src/components/fishing/FishingHub.tsx');
const sportsQuickAnswers = read('src/components/sports/SportsVenueQuickAnswers.tsx');
const countyIdentity = read('src/components/content/CountyIdentitySection.tsx');
const guidesPage = read('src/routes/guides.tsx');
const texasLiving = read('src/routes/texas-living.tsx');
const exploreSitemap = read('src/routes/sitemap-explore[.]xml.ts');
const homepage = readRouteSurface('src/routes/index.tsx');
const exploreTopicPaths = read('src/components/editorial/ExploreTopicPaths.tsx');
const relationshipPaths = read('src/data/knowledge-graph/relationships.ts');
const appraisalHub = read('src/routes/learn.appraisal-districts.tsx');
const countyPropertyDirectory = read('src/routes/property-tax.counties.tsx');
const countyPropertyTemplate = read('src/components/property/CountyPropertyTaxTemplate.tsx');
const appraisalRedirect = read('src/routes/appraisal-district.$slug.tsx');

for (const path of ['/property', '/explore/trip-planner']) {
  const indexableSection = registry.split('export const REDIRECT_ONLY_PATHS')[0];
  if (!indexableSection.includes(`"${path}"`)) failures.push(`${path} must remain an indexable static route.`);
}
if (!brand.includes('{ label: "Start Here", to: "/texas-resources" }')) failures.push('Global footer must keep a sitewide Start Here link to /texas-resources.');
for (const target of ['/explore/trip-planner', '/browse/cities', '/events']) if (!exploreDiscovery.includes(`to="${target}"`)) failures.push(`Explore discovery must link to ${target}.`);
for (const target of ['/property', '/decide/financial-tools', '/browse/cities', '/moving-to-texas', '/real-estate', '/texas-explained']) if (!texasLifeDiscovery.includes(`to: "${target}"`)) failures.push(`Texas Life discovery must link to ${target}.`);
for (const target of ['/decide/financial-tools', '/property', '/browse/counties', '/moving-to-texas', '/browse/cities']) if (!calculatorPage.includes(`to="${target}"`)) failures.push(`Calculator pages must link to ${target}.`);

for (const target of [
  '/best-places-to-go-camping-in-texas', '/texas-state-fair', '/texas-vs-every-state', '/texas-fishing-license',
  '/texas-drivers-license', '/texas-flag', '/texas-two-step', '/texas-resources',
]) if (!homepage.includes(`to: "${target}"`) && !homepage.includes(`to="${target}"`)) failures.push(`Homepage priority-search discovery must link to ${target}.`);
if (!homepage.includes('eyebrow="Popular Texas searches"')) failures.push('Homepage must retain the Popular Texas searches discovery module.');
for (const category of ['"lakes-rivers"', '"state-parks"', 'outdoors']) {
  const start = exploreTopicPaths.indexOf(`${category}: [`);
  if (start < 0) {
    failures.push(`Explore topic paths must retain ${category} configuration.`);
    continue;
  }
  const end = exploreTopicPaths.indexOf('],', start);
  const block = exploreTopicPaths.slice(start, end > start ? end : undefined);
  if (!block.includes('/best-places-to-go-camping-in-texas')) failures.push(`${category} topic paths must keep a direct camping-cornerstone link.`);
}

for (const target of [
  '/texas-mortgage-calculator', '/texas-home-affordability-calculator', '/texas-down-payment-calculator', '/texas-closing-cost-calculator',
  '/texas-mortgage-payoff-calculator', '/texas-salary-calculator', '/texas-utility-cost-calculator',
  '/article/texas-utility-costs-guide', '/article/texas-closing-costs-guide', '/article/salary-needed-to-buy-a-house-in-texas',
  '/article/muds-pids-hoas-special-districts-texas',
]) if (!financialToolsHub.includes(`'${target}'`) && !financialToolsHub.includes(`"${target}"`)) failures.push(`Financial-tools hub must keep an inbound discovery link to ${target}.`);
for (const marker of [
  "'@type': 'ItemList'", 'itemListElement: sections.map', 'numberOfItems: sections.length', 'Read the utility-cost guide',
  'Understand closing costs and cash to close', 'Understand salary and home affordability', 'Understand MUDs, PIDs, HOAs and special districts',
]) if (!financialToolsHub.includes(marker)) failures.push(`Financial-tools hub structured discovery contract is missing ${marker}.`);

for (const [label, source, markers] of [
  ['Texas closing-cost calculator', closingCostPage, ['Texas Closing Cost Calculator | Buyer & Seller Estimate', 'Separate the purchase price from the cash that changes hands at closing', 'Build the full transaction budget', 'Texas closing-cost calculator FAQ', "slug: 'texas-closing-costs-guide'", 'to="/texas-down-payment-calculator"', 'to="/texas-mortgage-calculator"', 'to="/texas-home-affordability-calculator"']],
  ['Texas home-affordability calculator', affordabilityPage, ['Texas Home Affordability Calculator | Estimate a Home-Price Range', 'Estimate the housing payment your budget would actually carry', 'Pressure-test the result', 'Texas home affordability calculator FAQ', "slug: 'salary-needed-to-buy-a-house-in-texas'", 'to="/texas-mortgage-calculator"', 'to="/texas-down-payment-calculator"', 'to="/texas-closing-cost-calculator"']],
  ['Texas utility-cost calculator', utilityCostPage, ['Texas Utility Cost Calculator | Estimate Electric, Gas & Water Bills', 'Estimate the bills beyond the mortgage', "slug: 'texas-utility-costs-guide'", "slug: 'how-to-choose-electricity-plan-texas'", 'to="/texas-homeownership-cost-calculator"']],
]) for (const marker of markers) if (!source.includes(marker)) failures.push(`${label} indexing-depth contract is missing ${marker}.`);

for (const marker of [
  '"texas-utility-costs-guide"', 'href: "/texas-utility-cost-calculator"', '"texas-closing-costs-guide"', 'href: "/texas-closing-cost-calculator"',
  '"texas-house-down-payment-guide"', 'href: "/texas-down-payment-calculator"', '"salary-needed-to-buy-a-house-in-texas"', 'href: "/texas-home-affordability-calculator"',
  '"true-cost-of-owning-a-home-in-texas"', 'href: "/texas-homeownership-cost-calculator"',
]) if (!dataIndex.includes(marker)) failures.push(`Finance evergreen → calculator discovery contract is missing ${marker}.`);

for (const marker of ['const financeGuides = [', '/article/texas-utility-costs-guide', '/article/texas-closing-costs-guide', '/article/salary-needed-to-buy-a-house-in-texas', 'eyebrow="Money decisions"', 'financeGuides.map', 'const financeItems = financeGuides.map']) if (!texasLiving.includes(marker)) failures.push(`Texas Life → finance evergreen discovery contract is missing ${marker}.`);
for (const token of ['to="/explore/$category"', '/explore/trip-planner?destination=', 'to="/explore"', 'to="/browse/cities"']) if (!destinationPlanner.includes(token)) failures.push(`Destination planning pathways are missing ${token}.`);
for (const marker of ['const regionalExplainers:', '/article/texas-rivers-explained', '/article/texas-lakes-reservoirs-explained', '/article/texas-farm-to-market-roads-explained', '/article/texas-wildflowers-guide', '/article/texas-trees-guide', '/article/texas-home-architecture-regions', '/article/buying-land-in-texas-guide', '/article/texas-wildlife-guide', '/article/texas-cultural-regions-explained', '/article/why-texas-has-254-counties', 'Understand the bigger picture', 'href="/texas-explained"']) if (!countyIdentity.includes(marker)) failures.push(`County → Texas Explained discovery contract is missing ${marker}.`);
for (const marker of ['to: "/texas-explained"', 'label: "Texas Explained"', 'Ten connected evergreen guides to why Texas works the way it does.', 'Start with Texas Explained for the why behind the state']) if (!guidesPage.includes(marker)) failures.push(`Guidebook → Texas Explained discovery contract is missing ${marker}.`);
for (const marker of ['type TexasExplainedSurface = "destination" | "fishing" | "sports"', 'surface="destination"', 'surface="fishing"', 'surface="sports"', '/article/texas-lakes-reservoirs-explained', '/article/texas-rivers-explained', '/article/texas-wildlife-guide', '/article/texas-cultural-regions-explained', '/article/texas-farm-to-market-roads-explained', '/article/texas-courthouses-town-square', 'Explore all 10 Texas Explained guides →']) {
  const combined = `${texasExplainedContext}\n${destinationRelationships}\n${fishingHub}\n${sportsQuickAnswers}`;
  if (!combined.includes(marker)) failures.push(`Remaining-surface Texas Explained discovery contract is missing ${marker}.`);
}
if (!destinationRelationships.includes('TexasExplainedContextLinks surface="destination"')) failures.push('Destination pages must render contextual Texas Explained links.');
if (!fishingHub.includes('TexasExplainedContextLinks surface="fishing"')) failures.push('Fishing hub must render contextual Texas Explained links.');
if (!sportsQuickAnswers.includes('TexasExplainedContextLinks surface="sports"')) failures.push('Sports venue pages must render contextual Texas Explained links.');
if (!categoryPage.includes('TexasLifeDiscovery')) failures.push('Texas Life category pages must render TexasLifeDiscovery.');
if (!categoryPage.includes('belongsToTexasLife && (') || !categoryPage.includes('<TexasLifeDiscovery currentCategory={category} />')) failures.push('TexasLifeDiscovery must be limited to Texas Life category surfaces.');
if (!exploreSitemap.includes('"/explore/trip-planner"')) failures.push('Explore sitemap must publish the Trip Planner.');

// Phase 5: consolidate property/appraisal authority on the canonical county property-tax pages.
for (const marker of [
  "const APPRAISAL_DISTRICT_SUFFIX = '-appraisal-district'",
  "entity.kind === 'appraisal-district'",
  'entity.slug.endsWith(APPRAISAL_DISTRICT_SUFFIX)',
  'return `/property-tax/county/${countySlug}`',
]) if (!relationshipPaths.includes(marker)) failures.push(`Appraisal-district canonical authority mapping is missing ${marker}.`);
for (const marker of [
  "createFileRoute('/appraisal-district/$slug')",
  "params.slug.replace(/-appraisal-district$/, '')",
  'href: `/property-tax/county/${countySlug}`',
  'statusCode: 301',
]) if (!appraisalRedirect.includes(marker)) failures.push(`Legacy appraisal-district redirect contract is missing ${marker}.`);
for (const marker of [
  "import { COUNTY_PROPERTY_RECORDS } from '@/data/property/county-property-data'",
  "import { isCountyPropertyIndexReady } from '@/data/property/county-property-schema'",
  'const verifiedPropertyCounties = COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady)',
  'const verifiedPropertySlugs = new Set(verifiedPropertyCounties.map((county) => county.slug))',
  "const priorityCountySlugs = ['leon', 'terrell', 'lubbock', 'hidalgo', 'sabine']",
  "name: 'Verified Texas county appraisal-district guides'",
  'numberOfItems: verifiedPropertyCounties.length',
  'verifiedPropertySlugs.has(county.slug)',
  'to="/property-tax/county/$county"',
  'to="/county/$slug"',
  'instead of a noindex tax page',
]) if (!appraisalHub.includes(marker)) failures.push(`Appraisal hub authority-flow contract is missing ${marker}.`);
if (appraisalHub.includes('numberOfItems: TEXAS_COUNTIES.length')) failures.push('Appraisal hub ItemList must not advertise all 254 county-tax URLs when some remain noindex.');
for (const marker of [
  'to="/learn/appraisal-districts"',
  'Texas appraisal-district directory →',
]) if (!countyPropertyDirectory.includes(marker)) failures.push(`County property-tax directory reciprocal appraisal discovery is missing ${marker}.`);
for (const marker of [
  'to="/learn/appraisal-districts"',
  'How Texas appraisal districts work →',
]) if (!countyPropertyTemplate.includes(marker)) failures.push(`County property-tax template must link back to appraisal authority with ${marker}.`);
if (countyPropertyTemplate.includes("const appraisalDistrict = countyEntity('appraisal-district'")) failures.push('County property-tax pages must not create a redundant appraisal-district entity self-link.');
if (countyPropertyTemplate.includes('canonicalEntityPath(appraisalDistrict)')) failures.push('County property-tax pages must not route appraisal authority through the retired appraisal-district path.');

if (failures.length) { console.error('Internal-link discovery validation failed:'); for (const failure of failures) console.error(`- ${failure}`); process.exit(1); }
console.log('Internal-link discovery pathways, sitewide Start Here resources link, homepage priority-search links, protected camping-cornerstone links, Texas Explained links from Texas Life, county profiles, Guidebook, destination pages, fishing and sports venues, calculator hub inbound/outbound discovery, reciprocal finance evergreen/calculator clusters, direct Texas Life and financial-tools finance/special-district evergreen discovery, priority calculator indexing depth, structured calculator collection links, Explore sitemap coverage, and appraisal-district authority consolidation onto verified canonical county-tax pages are protected.');
