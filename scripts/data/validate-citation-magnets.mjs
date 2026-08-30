import { readFile } from 'node:fs/promises';

const read = (path) => readFile(path, 'utf8');
const readRouteSurface = async (path) => `${await read(path)}\n${await read(path.replace(/\.tsx$/, '.lazy.tsx'))}`;

const manifest = JSON.parse(await read('public/citation-magnets.json'));
const llms = await read('src/routes/llms[.]txt.ts');
const publicRoutes = await read('src/lib/public-routes.ts');
const exploreSitemap = await read('src/routes/sitemap-explore[.]xml.ts');
const mainSitemap = await read('src/routes/sitemap[.]xml.ts');
const trustPanel = await read('src/components/authority/CitationTrustPanel.tsx');
const collectionTrust = await read('src/components/authority/CitationCollectionTrustRouter.tsx');
const footer = await read('src/components/layout/Footer.tsx');
const citationGuide = await read('src/routes/citation-guide.tsx');
const exploreHub = await readRouteSurface('src/routes/explore.index.tsx');
const topAttractions = await read('src/routes/explore.top-attractions.tsx');
const topMethodology = await read('src/routes/explore.top-attractions.methodology.tsx');
const topMethodologyContent = await read('src/components/explore/TopAttractionsMethodologyContent.tsx');
const topRoadTrips = await read('src/routes/explore.top-attractions.road-trips.tsx');
const topCsv = await read('src/routes/top-25-texas-attractions[.]csv.ts');
const topJson = await read('src/routes/top-25-texas-attractions[.]json.ts');
const dataHub = await read('src/routes/texas-data.tsx');
const countyGrowth = await read('src/routes/texas-data.county-growth.tsx');
const countyGrowthContent = await read('src/components/data/CountyGrowthContent.tsx');
const countyGrowthData = await read('src/data/census-county-growth.ts');
const countyRoute = await readRouteSurface('src/routes/browse.counties.tsx');
const propertyTaxCounties = await read('src/routes/property-tax.counties.tsx');
const appraisalDistricts = await read('src/routes/learn.appraisal-districts.tsx');
const protest = await read('src/routes/do.property-tax-protest.tsx');
const homestead = await read('src/routes/do.homestead-exemption.tsx');
const attractions = await read('src/routes/explore.attractions-comparison.tsx');
const cityCounty = await read('src/routes/texas-data.city-county-relationships.tsx');

const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(manifest.schemaVersion === 1, 'citation-magnets.json must use schemaVersion 1');
expect(manifest.canonicalDomain === 'https://texasdefined.com', 'citation manifest canonicalDomain must be TexasDefined');
expect(manifest.asOf === '2026-08-30', 'citation manifest freshness date must reflect the 2026-08-30 authority expansion');
expect(Array.isArray(manifest.resources) && manifest.resources.length >= 22, 'citation manifest must retain at least 22 maintained resources');

const urls = manifest.resources.map((resource) => resource.url);
expect(new Set(urls).size === urls.length, 'citation manifest URLs must be unique');
for (const resource of manifest.resources) {
  expect(resource.url.startsWith('https://texasdefined.com/'), `manifest URL must be canonical TexasDefined URL: ${resource.url}`);
  expect(typeof resource.title === 'string' && resource.title.length > 3, `manifest resource needs title: ${resource.url}`);
  expect(typeof resource.type === 'string' && resource.type.length > 2, `manifest resource needs type: ${resource.url}`);
  expect(typeof resource.topic === 'string' && resource.topic.length > 2, `manifest resource needs topic: ${resource.url}`);
  expect(Array.isArray(resource.trust) && resource.trust.length > 0, `manifest resource needs trust metadata: ${resource.url}`);
  expect(llms.includes(resource.url), `llms.txt must prioritize manifest resource: ${resource.url}`);
}

const requiredManifestUrls = [
  'https://texasdefined.com/citation-guide',
  'https://texasdefined.com/texas-data',
  'https://texasdefined.com/texas-data/county-growth',
  'https://texasdefined.com/texas-data/city-county-relationships',
  'https://texasdefined.com/browse/counties',
  'https://texasdefined.com/property-tax/counties',
  'https://texasdefined.com/learn/property-taxes',
  'https://texasdefined.com/learn/appraisal-districts',
  'https://texasdefined.com/do/property-tax-protest',
  'https://texasdefined.com/do/homestead-exemption',
  'https://texasdefined.com/explore/state-parks',
  'https://texasdefined.com/explore/lakes-rivers',
  'https://texasdefined.com/explore/small-towns',
  'https://texasdefined.com/explore/road-trips',
  'https://texasdefined.com/explore/attractions-comparison',
  'https://texasdefined.com/explore/top-attractions',
  'https://texasdefined.com/explore/top-attractions/methodology',
  'https://texasdefined.com/explore/top-attractions/road-trips',
  'https://texasdefined.com/texas-science-technology-industry',
  'https://texasdefined.com/texas-college-towns',
  'https://texasdefined.com/texas-tailgating-guide',
  'https://texasdefined.com/texas-unique-lodging',
  'https://texasdefined.com/find-my-dmv',
  'https://texasdefined.com/find-my-school-district',
];
for (const url of requiredManifestUrls) expect(urls.includes(url), `required citation target missing from manifest: ${url}`);

const authorityTrustContracts = new Map([
  ['https://texasdefined.com/texas-science-technology-industry', ['official-sources', 'source-review-date', 'operations-caveat', 'canonical-cross-links', 'visitor-planning']],
  ['https://texasdefined.com/texas-college-towns', ['first-party-campus-sources', 'source-review-date', 'game-day-caveat', 'canonical-cross-links', 'visitor-planning']],
  ['https://texasdefined.com/texas-tailgating-guide', ['first-party-athletics-sources', 'source-review-date', 'event-day-caveat', 'safety-caveat', 'canonical-cross-links']],
  ['https://texasdefined.com/texas-unique-lodging', ['first-party-TPWD-sources', 'source-review-date', 'availability-caveat', 'no-ranking-claim', 'canonical-cross-links']],
]);
for (const [url, markers] of authorityTrustContracts) {
  const resource = manifest.resources.find((item) => item.url === url);
  expect(Boolean(resource), `destination authority citation resource missing: ${url}`);
  for (const marker of markers) expect(resource?.trust?.includes(marker), `${url} citation resource is missing trust marker ${marker}`);
}

for (const label of ['Sources', 'Methodology', 'Last verified']) expect(trustPanel.includes(`>${label}<`), `CitationTrustPanel must retain visible ${label} label`);

const collectionTrustPaths = [
  '/citation-guide',
  '/texas-data',
  '/explore/top-attractions',
  '/explore/top-attractions/methodology',
  '/explore/top-attractions/road-trips',
  '/learn/property-taxes',
  '/find-my-dmv',
  '/find-my-school-district',
];
for (const path of collectionTrustPaths) {
  expect(collectionTrust.includes(`'${path}'`), `collection trust router must cover ${path}`);
  expect(urls.includes(`https://texasdefined.com${path}`), `collection trust path must remain promoted in citation manifest: ${path}`);
}
expect(footer.includes('CitationCollectionTrustRouter'), 'site footer must render collection trust coverage');

expect(publicRoutes.includes('"/citation-guide"'), 'citation guide must remain governed as an indexable static path');
expect(publicRoutes.includes('"/texas-data/county-growth"'), 'county growth must remain governed as a conditional public path');
expect(!publicRoutes.split('CONDITIONAL_INDEXABLE_PUBLIC_PATHS')[0].includes('"/texas-data/county-growth"'), 'county growth must not be unconditionally indexable');
expect(mainSitemap.includes('loadTexasCountyGrowth'), 'main sitemap must evaluate county-growth source readiness');
expect(mainSitemap.includes('countyGrowth.available'), 'main sitemap must publish county growth only when source data is ready');
expect(dataHub.includes('/texas-data/county-growth'), 'Texas Data hub must link county growth');
expect(countyGrowth.includes("createFileRoute('/texas-data/county-growth')"), 'county growth route must remain canonical');
expect(countyGrowth.includes("loaderData?.available ? 'index, follow, max-image-preview:large' : 'noindex, follow'"), 'county growth route must fail closed on source outage');
expect(countyGrowth.includes("lazy(() => import('@/components/data/CountyGrowthContent'))"), 'county growth UI must remain manually split from the main client bundle');
expect(countyGrowth.includes("await import('@/data/census-county-growth')"), 'county growth source parser must remain dynamically imported by the route loader');
expect(countyGrowthContent.includes('CitationTrustPanel'), 'county growth content must expose visible source/methodology/verification context');
for (const token of ['co-est2025-alldata.csv', "cells[index.STATE] !== '48'", 'ESTIMATESBASE2020', 'POPESTIMATE2025', 'rows.length >= 250']) expect(countyGrowthData.includes(token), `county growth source contract missing: ${token}`);

expect(footer.includes('to="/citation-guide"'), 'site footer must link the citation guide');
expect(citationGuide.includes("createFileRoute('/citation-guide')"), 'citation guide route must remain canonical');
expect(citationGuide.includes('Use the canonical page'), 'citation guide must explain canonical URL use');
expect(citationGuide.includes('Keep the original source attached'), 'citation guide must preserve official-source precedence');
expect(citationGuide.includes('Top-25 source hierarchy'), 'citation guide must explain the Top 25 evidence hierarchy');
expect(citationGuide.includes('Controlling visitor source'), 'citation guide must distinguish controlling Top 25 sources');
expect(citationGuide.includes('Supporting authority source'), 'citation guide must distinguish supporting Top 25 sources');
expect(citationGuide.includes('/citation-magnets.json'), 'citation guide must link machine-readable citation manifest');
expect(citationGuide.includes('/llms.txt'), 'citation guide must link llms retrieval guidance');
expect(citationGuide.includes('/top-25-texas-attractions.csv'), 'citation guide must link Top 25 CSV');
expect(citationGuide.includes('/top-25-texas-attractions.json'), 'citation guide must link Top 25 JSON');
expect(publicRoutes.includes('"/explore/attractions-comparison"'), 'attractions comparison must remain governed as an indexable static path');
for (const path of ['/explore/top-attractions', '/explore/top-attractions/methodology', '/explore/top-attractions/road-trips']) {
  expect(publicRoutes.includes(`"${path}"`), `Top 25 authority route must remain governed: ${path}`);
  expect(exploreSitemap.includes(`"${path}"`), `Explore sitemap must include Top 25 authority route: ${path}`);
}
expect(publicRoutes.includes('"/top-25-texas-attractions.csv"'), 'Top 25 CSV distribution must be governed');
expect(publicRoutes.includes('"/top-25-texas-attractions.json"'), 'Top 25 JSON distribution must be governed');
expect(publicRoutes.includes('"/texas-data/city-county-relationships"'), 'city-county dataset must remain governed as an indexable static path');
expect(exploreSitemap.includes('"/explore/attractions-comparison"'), 'Explore sitemap must include attractions comparison');
expect(mainSitemap.includes('INDEXABLE_STATIC_PATHS'), 'main sitemap must remain driven by governed static paths');
expect(exploreHub.includes('to="/explore/attractions-comparison"'), 'Explore hub must link the attractions comparison');
expect(exploreHub.includes('to="/explore/top-attractions"'), 'Explore hub must link the Top 25 attractions reference collection');
expect(dataHub.includes('/texas-data/city-county-relationships'), 'Texas Data hub must link the city-county dataset');
expect(topMethodology.includes('TopAttractionsMethodologyContent'), 'Top 25 methodology route must retain the split methodology component');

const extractionContracts = [
  [countyRoute, 'How to use the county property-tax directory', 'county directory direct-answer layer'],
  [countyRoute, 'TexasCountyComparisonTable', 'county comparison table'],
  [propertyTaxCounties, 'County government rate examples', 'property-tax comparison answer block'],
  [appraisalDistricts, 'All 254 counties', 'appraisal-district directory answer block'],
  [protest, 'Start with the deadline', 'protest deadline direct answer'],
  [homestead, 'School homestead exemption history', 'homestead comparison answer block'],
  [attractions, 'ItemList', 'attractions machine-readable list'],
  [topAttractions, 'How this list is researched', 'Top 25 authority methodology layer'],
  [topAttractions, 'resolveTopAttractionAuthority', 'Top 25 multi-source assessment layer'],
  [topAttractions, 'variableMeasured', 'Top 25 Dataset variable definitions'],
  [topMethodologyContent, 'Review sites are not authority evidence', 'Top 25 source-selection policy'],
  [topRoadTrips, 'TouristTrip', 'Top 25 machine-readable road-trip collection'],
  [topCsv, 'authority_source_urls', 'Top 25 CSV source provenance'],
  [topJson, 'authoritySources', 'Top 25 JSON source provenance'],
  [cityCounty, "'@type': 'Dataset'", 'city-county Dataset schema'],
  [countyGrowthContent, 'Fastest percentage growth', 'county growth comparison layer'],
];
for (const [source, token, label] of extractionContracts) expect(source.includes(token), `citation extraction contract missing: ${label}`);

expect(llms.includes('Top 25 attractions collection uses a three-level evidence hierarchy'), 'llms.txt must describe the Top 25 three-level evidence hierarchy');
expect(llms.includes('https://texasdefined.com/top-25-texas-attractions.csv'), 'llms.txt must expose Top 25 CSV distribution');
expect(llms.includes('https://texasdefined.com/top-25-texas-attractions.json'), 'llms.txt must expose Top 25 JSON distribution');
expect(!manifest.resources.some((resource) => /cost\/property/.test(resource.url)), 'county housing/cost ranking must not be promoted until its official source is maintainable');

if (errors.length) {
  console.error('Citation magnet validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Citation magnet validation passed for ${manifest.resources.length} TexasDefined resources, including the multi-source Top 25 authority cluster, Census Vintage 2025 county growth, and four source-backed destination authority guides.`);
