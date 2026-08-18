import fs from 'node:fs';

const failures = [];
const read = (file) => fs.readFileSync(file, 'utf8');

const registry = read('src/lib/public-routes.ts');
const brand = read('src/brand/texasdefined.ts');
const exploreDiscovery = read('src/components/editorial/ExploreDiscovery.tsx');
const texasLifeDiscovery = read('src/components/editorial/TexasLifeDiscovery.tsx');
const categoryPage = read('src/components/editorial/CategoryPage.tsx');
const calculatorPage = read('src/components/calculators/CalculatorPage.tsx');
const financialToolsHub = read('src/routes/decide.financial-tools.tsx');
const closingCostPage = read('src/routes/texas-closing-cost-calculator.tsx');
const affordabilityPage = read('src/routes/texas-home-affordability-calculator.tsx');
const destinationPlanner = read('src/components/editorial/DestinationVisitPlanner.tsx');
const destinationRelationships = read('src/components/editorial/DestinationRelationships.tsx');
const texasExplainedContext = read('src/components/editorial/TexasExplainedContextLinks.tsx');
const fishingHub = read('src/components/fishing/FishingHub.tsx');
const sportsQuickAnswers = read('src/components/sports/SportsVenueQuickAnswers.tsx');
const countyIdentity = read('src/components/content/CountyIdentitySection.tsx');
const guidesPage = read('src/routes/guides.tsx');
const exploreSitemap = read('src/routes/sitemap-explore[.]xml.ts');

for (const path of ['/property', '/explore/trip-planner']) {
  const indexableSection = registry.split('export const REDIRECT_ONLY_PATHS')[0];
  if (!indexableSection.includes(`"${path}"`)) failures.push(`${path} must remain an indexable static route.`);
}

if (!brand.includes('{ label: "Start Here", to: "/texas-resources" }')) {
  failures.push('Global footer must keep a sitewide Start Here link to /texas-resources.');
}

for (const target of ['/explore/trip-planner', '/browse/cities', '/events']) {
  if (!exploreDiscovery.includes(`to="${target}"`)) failures.push(`Explore discovery must link to ${target}.`);
}

for (const target of ['/property', '/decide/financial-tools', '/browse/cities', '/moving-to-texas', '/real-estate', '/texas-explained']) {
  if (!texasLifeDiscovery.includes(`to: "${target}"`)) failures.push(`Texas Life discovery must link to ${target}.`);
}

for (const target of ['/decide/financial-tools', '/property', '/browse/counties', '/moving-to-texas', '/browse/cities']) {
  if (!calculatorPage.includes(`to="${target}"`)) failures.push(`Calculator pages must link to ${target}.`);
}

for (const target of [
  '/texas-mortgage-calculator',
  '/texas-home-affordability-calculator',
  '/texas-down-payment-calculator',
  '/texas-closing-cost-calculator',
  '/texas-mortgage-payoff-calculator',
  '/texas-salary-calculator',
  '/texas-utility-cost-calculator',
]) {
  if (!financialToolsHub.includes(`'${target}'`) && !financialToolsHub.includes(`"${target}"`)) {
    failures.push(`Financial-tools hub must keep an inbound discovery link to ${target}.`);
  }
}
for (const marker of ["'@type': 'ItemList'", 'itemListElement: sections.map', 'numberOfItems: sections.length']) {
  if (!financialToolsHub.includes(marker)) failures.push(`Financial-tools hub structured discovery contract is missing ${marker}.`);
}

for (const [label, source, markers] of [
  ['Texas closing-cost calculator', closingCostPage, [
    'Texas Closing Cost Calculator | Buyer & Seller Estimate',
    'Separate the purchase price from the cash that changes hands at closing',
    'Build the full transaction budget',
    'Texas closing-cost calculator FAQ',
    'to="/texas-down-payment-calculator"',
    'to="/texas-mortgage-calculator"',
    'to="/texas-home-affordability-calculator"',
  ]],
  ['Texas home-affordability calculator', affordabilityPage, [
    'Texas Home Affordability Calculator | Estimate a Home-Price Range',
    'Estimate the housing payment your budget would actually carry',
    'Pressure-test the result',
    'Texas home affordability calculator FAQ',
    'to="/texas-mortgage-calculator"',
    'to="/texas-down-payment-calculator"',
    'to="/texas-closing-cost-calculator"',
  ]],
]) {
  for (const marker of markers) {
    if (!source.includes(marker)) failures.push(`${label} indexing-depth contract is missing ${marker}.`);
  }
}

for (const token of ['to="/explore/$category"', '/explore/trip-planner?destination=', 'to="/explore"', 'to="/browse/cities"']) {
  if (!destinationPlanner.includes(token)) failures.push(`Destination planning pathways are missing ${token}.`);
}

for (const marker of [
  'const regionalExplainers:',
  '/article/texas-rivers-explained',
  '/article/texas-lakes-reservoirs-explained',
  '/article/texas-farm-to-market-roads-explained',
  '/article/texas-wildflowers-guide',
  '/article/texas-trees-guide',
  '/article/texas-home-architecture-regions',
  '/article/buying-land-in-texas-guide',
  '/article/texas-wildlife-guide',
  '/article/texas-cultural-regions-explained',
  '/article/why-texas-has-254-counties',
  'Understand the bigger picture',
  'href="/texas-explained"',
]) {
  if (!countyIdentity.includes(marker)) failures.push(`County → Texas Explained discovery contract is missing ${marker}.`);
}

for (const marker of [
  'to: "/texas-explained"',
  'label: "Texas Explained"',
  'Ten connected evergreen guides to why Texas works the way it does.',
  'Start with Texas Explained for the why behind the state',
]) {
  if (!guidesPage.includes(marker)) failures.push(`Guidebook → Texas Explained discovery contract is missing ${marker}.`);
}

for (const marker of [
  'type TexasExplainedSurface = "destination" | "fishing" | "sports"',
  'surface="destination"',
  'surface="fishing"',
  'surface="sports"',
  '/article/texas-lakes-reservoirs-explained',
  '/article/texas-rivers-explained',
  '/article/texas-wildlife-guide',
  '/article/texas-cultural-regions-explained',
  '/article/texas-farm-to-market-roads-explained',
  '/article/texas-courthouses-town-square',
  'Explore all 10 Texas Explained guides →',
]) {
  const combined = `${texasExplainedContext}\n${destinationRelationships}\n${fishingHub}\n${sportsQuickAnswers}`;
  if (!combined.includes(marker)) failures.push(`Remaining-surface Texas Explained discovery contract is missing ${marker}.`);
}

if (!destinationRelationships.includes('TexasExplainedContextLinks surface="destination"')) failures.push('Destination pages must render contextual Texas Explained links.');
if (!fishingHub.includes('TexasExplainedContextLinks surface="fishing"')) failures.push('Fishing hub must render contextual Texas Explained links.');
if (!sportsQuickAnswers.includes('TexasExplainedContextLinks surface="sports"')) failures.push('Sports venue pages must render contextual Texas Explained links.');

if (!categoryPage.includes('TexasLifeDiscovery')) failures.push('Texas Life category pages must render TexasLifeDiscovery.');
if (!categoryPage.includes('belongsToTexasLife && <TexasLifeDiscovery')) failures.push('TexasLifeDiscovery must be limited to Texas Life category surfaces.');
if (!exploreSitemap.includes('"/explore/trip-planner"')) failures.push('Explore sitemap must publish the Trip Planner.');

if (failures.length) {
  console.error('Internal-link discovery validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Internal-link discovery pathways, sitewide Start Here resources link, Texas Explained links from Texas Life, county profiles, Guidebook, destination pages, fishing and sports venues, calculator hub inbound/outbound discovery, priority calculator indexing depth, structured calculator collection links and Explore sitemap coverage are protected.');
