import { readFile } from 'node:fs/promises';

const read = (path) => readFile(path, 'utf8');

const manifest = JSON.parse(await read('public/citation-magnets.json'));
const llms = await read('src/routes/llms[.]txt.ts');
const publicRoutes = await read('src/lib/public-routes.ts');
const exploreSitemap = await read('src/routes/sitemap-explore[.]xml.ts');
const mainSitemap = await read('src/routes/sitemap[.]xml.ts');
const trustPanel = await read('src/components/authority/CitationTrustPanel.tsx');
const footer = await read('src/components/layout/Footer.tsx');
const citationGuide = await read('src/routes/citation-guide.tsx');
const exploreHub = await read('src/routes/explore.index.tsx');
const dataHub = await read('src/routes/texas-data.tsx');
const countyRoute = await read('src/routes/browse.counties.tsx');
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
expect(Array.isArray(manifest.resources) && manifest.resources.length >= 18, 'citation manifest must retain at least 18 maintained resources');

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
  'https://texasdefined.com/texas-data/city-county-relationships',
  'https://texasdefined.com/browse/counties',
  'https://texasdefined.com/property-tax/counties',
  'https://texasdefined.com/learn/appraisal-districts',
  'https://texasdefined.com/do/property-tax-protest',
  'https://texasdefined.com/do/homestead-exemption',
  'https://texasdefined.com/explore/state-parks',
  'https://texasdefined.com/explore/lakes-rivers',
  'https://texasdefined.com/explore/small-towns',
  'https://texasdefined.com/explore/road-trips',
  'https://texasdefined.com/explore/attractions-comparison',
];
for (const url of requiredManifestUrls) expect(urls.includes(url), `required citation target missing from manifest: ${url}`);

for (const label of ['Sources', 'Methodology', 'Last verified']) {
  expect(trustPanel.includes(`>${label}<`), `CitationTrustPanel must retain visible ${label} label`);
}

expect(publicRoutes.includes('"/citation-guide"'), 'citation guide must remain governed as an indexable static path');
expect(footer.includes('to="/citation-guide"'), 'site footer must link the citation guide');
expect(citationGuide.includes("createFileRoute('/citation-guide')"), 'citation guide route must remain canonical');
expect(citationGuide.includes('Use the canonical page'), 'citation guide must explain canonical URL use');
expect(citationGuide.includes('Keep the original source attached'), 'citation guide must preserve official-source precedence');
expect(citationGuide.includes('/citation-magnets.json'), 'citation guide must link machine-readable citation manifest');
expect(citationGuide.includes('/llms.txt'), 'citation guide must link llms retrieval guidance');
expect(publicRoutes.includes('"/explore/attractions-comparison"'), 'attractions comparison must remain governed as an indexable static path');
expect(publicRoutes.includes('"/texas-data/city-county-relationships"'), 'city-county dataset must remain governed as an indexable static path');
expect(exploreSitemap.includes('"/explore/attractions-comparison"'), 'Explore sitemap must include attractions comparison');
expect(mainSitemap.includes('INDEXABLE_STATIC_PATHS'), 'main sitemap must remain driven by governed static paths');
expect(exploreHub.includes('to="/explore/attractions-comparison"'), 'Explore hub must link the attractions comparison');
expect(dataHub.includes('/texas-data/city-county-relationships'), 'Texas Data hub must link the city-county dataset');

const extractionContracts = [
  [countyRoute, 'How to use the county property-tax directory', 'county directory direct-answer layer'],
  [countyRoute, 'TexasCountyComparisonTable', 'county comparison table'],
  [propertyTaxCounties, 'County government rate examples', 'property-tax comparison answer block'],
  [appraisalDistricts, 'All 254 counties', 'appraisal-district directory answer block'],
  [protest, 'Start with the deadline', 'protest deadline direct answer'],
  [homestead, 'School homestead exemption history', 'homestead comparison answer block'],
  [attractions, 'ItemList', 'attractions machine-readable list'],
  [cityCounty, "'@type': 'Dataset'", 'city-county Dataset schema'],
];
for (const [source, token, label] of extractionContracts) expect(source.includes(token), `citation extraction contract missing: ${label}`);

expect(!manifest.resources.some((resource) => /growth|cost\/property/.test(resource.url)), 'deferred county growth/cost rankings must not be promoted without source data');

if (errors.length) {
  console.error('Citation magnet validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Citation magnet validation passed for ${manifest.resources.length} TexasDefined resources, including the public citation policy.`);
