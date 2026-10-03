import { readFile } from 'node:fs/promises';

const read = (path) => readFile(path, 'utf8');
const growthRoute = await read('src/routes/texas-data.county-growth.tsx');
const growthContent = await read('src/components/data/CountyGrowthContent.tsx');
const growthCsv = await read('src/routes/texas-data.county-growth[.]csv.ts');
const taxChangeRoute = await read('src/routes/texas-data.property-tax-changes.tsx');
const taxChangeContent = await read('src/components/data/PropertyTaxChangesContent.tsx');
const taxChangeCsv = await read('src/routes/texas-data.property-tax-changes[.]csv.ts');
const lakeDiversityRoute = await read('src/routes/texas-data.lake-game-fish-diversity.tsx');
const lakeDiversityContent = await read('src/components/data/LakeGameFishDiversityContent.tsx');
const lakeDiversityCsv = await read('src/routes/texas-data.lake-game-fish-diversity[.]csv.ts');
const researchRoute = await read('src/routes/texas-data.research.tsx');
const researchRegistry = await read('src/data/original-research.ts');
const texasDataLanding = await read('src/routes/texas-data.lazy.tsx');
const cityCountyRoute = await read('src/routes/texas-data.city-county-relationships.tsx');
const cityCountyCsv = await read('src/routes/texas-data.city-county-relationships[.]csv.ts');
const sportsRoute = await read('src/routes/sports-venues.compare.tsx');
const sportsCsv = await read('src/routes/sports-venues.compare[.]csv.ts');
const sportsData = await read('src/data/sports-venue-comparison.ts');
const topRoute = await read('src/routes/explore.top-attractions.tsx');
const topMethodology = await read('src/routes/explore.top-attractions.methodology.tsx');
const topMethodologyContent = await read('src/components/explore/TopAttractionsMethodologyContent.tsx');
const topCsv = await read('src/routes/top-25-texas-attractions[.]csv.ts');
const topJson = await read('src/routes/top-25-texas-attractions[.]json.ts');
const topReferenceData = await read('src/data/top-attraction-reference-data.ts');
const iconsRoute = await read('src/routes/things-unique-to-texas.tsx');
const iconsContent = await read('src/routes/things-unique-to-texas.lazy.tsx');
const iconsMethodology = await read('src/routes/things-unique-to-texas_.methodology.tsx');
const iconsCsv = await read('src/routes/things-that-define-texas[.]csv.ts');
const iconsJson = await read('src/routes/things-that-define-texas[.]json.ts');
const iconsReferenceData = await read('src/data/things-unique-to-texas-reference.ts');

const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

for (const token of [
  "encodingFormat: 'text/csv'",
  "contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/county-growth.csv')",
  "measurementTechnique:",
  "dateModified: '2026-10-03'",
]) expect(growthRoute.includes(token), `county-growth Dataset distribution missing: ${token}`);
for (const token of [
  'href="/texas-data/county-growth.csv"',
  'Complete dataset',
  'recommendedCitation=',
  'nextReview=',
  'All Texas counties',
]) expect(growthContent.includes(token), `county-growth research presentation missing: ${token}`);
for (const token of [
  "createFileRoute('/texas-data/county-growth.csv')",
  "'content-type': 'text/csv; charset=utf-8'",
  "'x-robots-tag': 'noindex, follow'",
  "'content-disposition': 'attachment; filename=\"texas-county-population-growth-2020-2025.csv\"'",
  'if (!data.available)',
  'status: 503',
  'population_change_percent',
]) expect(growthCsv.includes(token), `county-growth CSV contract missing: ${token}`);

for (const token of [
  "createFileRoute('/texas-data/property-tax-changes')",
  "encodingFormat: 'text/csv'",
  "contentUrl: absoluteUrl(texasDefinedBrand, csvPath)",
  'measurementTechnique:',
  "name: 'Original Research'",
]) expect(taxChangeRoute.includes(token), `property-tax research Dataset contract missing: ${token}`);
for (const token of [
  'href="/texas-data/property-tax-changes.csv"',
  'Complete matched dataset',
  'recommendedCitation=',
  'nextReview=',
  'A rate change is not the same thing as a change in an individual tax bill',
]) expect(taxChangeContent.includes(token), `property-tax research presentation missing: ${token}`);
for (const token of [
  "createFileRoute('/texas-data/property-tax-changes.csv')",
  "'content-type': 'text/csv; charset=utf-8'",
  "'x-robots-tag': 'noindex, follow'",
  'rate_point_change',
  'rate_change_percent',
]) expect(taxChangeCsv.includes(token), `property-tax research CSV contract missing: ${token}`);

for (const token of [
  "createFileRoute('/texas-data/lake-game-fish-diversity')",
  "encodingFormat: 'text/csv'",
  "contentUrl: absoluteUrl(texasDefinedBrand, csvPath)",
  'measurementTechnique:',
  "name: 'Original Research'",
]) expect(lakeDiversityRoute.includes(token), `lake-diversity Dataset contract missing: ${token}`);
for (const token of [
  'href="/texas-data/lake-game-fish-diversity.csv"',
  'Complete dataset',
  'recommendedCitation=',
  'nextReview=',
  'documented fishing targets, not a biological species census',
]) expect(lakeDiversityContent.includes(token), `lake-diversity research presentation missing: ${token}`);
for (const token of [
  "createFileRoute('/texas-data/lake-game-fish-diversity.csv')",
  "'content-type': 'text/csv; charset=utf-8'",
  "'x-robots-tag': 'noindex, follow'",
  'documented_target_count',
  'targets_per_1000_acres',
  'source_urls',
]) expect(lakeDiversityCsv.includes(token), `lake-diversity research CSV contract missing: ${token}`);

for (const token of [
  "createFileRoute('/texas-data/research')",
  "'@type': ['CollectionPage', 'DataCatalog']",
  'TEXASDEFINED_RESEARCH_BRIEFS.map',
  'Built to be checked and cited',
  'Reusable research engine',
]) expect(researchRoute.includes(token), `original research hub missing: ${token}`);
for (const token of ['county-growth', 'property-tax-changes', 'lake-game-fish-diversity', 'TEXASDEFINED_RESEARCH_EXTENSION_DOMAINS']) expect(researchRegistry.includes(token), `original research registry missing: ${token}`);
for (const token of ['TexasDefined Research', '/texas-data/research', 'TEXASDEFINED_RESEARCH_BRIEFS.map', 'CSV ↓']) expect(texasDataLanding.includes(token), `Texas Data landing research discovery missing: ${token}`);

for (const token of [
  "encodingFormat: 'text/csv'",
  "contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/city-county-relationships.csv')",
  'href="/texas-data/city-county-relationships.csv"',
]) expect(cityCountyRoute.includes(token), `city-county Dataset distribution missing: ${token}`);
for (const token of [
  "createFileRoute('/texas-data/city-county-relationships.csv')",
  "'content-type': 'text/csv; charset=utf-8'",
  "'x-robots-tag': 'noindex, follow'",
  "'content-disposition': 'attachment; filename=\"texasdefined-city-county-relationships.csv\"'",
  'county_registry_match',
  "county ? 'matched' : 'pending'",
]) expect(cityCountyCsv.includes(token), `city-county CSV contract missing: ${token}`);

for (const token of [
  "'@type': 'Dataset'",
  "'@type': 'DataDownload'",
  "encodingFormat: 'text/csv'",
  'contentUrl: csvUrl',
  'href="/sports-venues/compare.csv"',
  'Download comparison CSV',
]) expect(sportsRoute.includes(token), `sports venue comparison Dataset distribution missing: ${token}`);
for (const token of [
  "createFileRoute('/sports-venues/compare.csv')",
  "'content-type': 'text/csv; charset=utf-8'",
  "'x-robots-tag': 'noindex, follow'",
  "'content-disposition': 'attachment; filename=\"texasdefined-sports-venue-comparison.csv\"'",
  'SPORTS_VENUE_COMPARISON_ROWS',
  "'source_checked_at'",
  "'official_url'",
]) expect(sportsCsv.includes(token), `sports venue comparison CSV contract missing: ${token}`);
for (const token of [
  'CURATED_KNOWLEDGE_GRAPH_SEED',
  "entity.kind === 'sports-venue'",
  '.map(applyCurrentEntityCorrections)',
  'getSportsVenueEnrichmentAll(venue.slug)',
  'canonicalPath: canonicalEntityPath(venue)',
]) expect(sportsData.includes(token), `sports venue comparison shared-data contract missing: ${token}`);

for (const token of [
  '"@type": "Dataset"',
  '"@type": "DataDownload"',
  'encodingFormat: "text/csv"',
  'encodingFormat: "application/json"',
  'contentUrl: csvUrl',
  'contentUrl: jsonUrl',
  'Download comparison CSV',
  'Download JSON data',
  'variableMeasured',
]) expect(topRoute.includes(token), `Top 25 Dataset distribution missing: ${token}`);
for (const token of [
  'TOP_ATTRACTION_REFERENCE_ROWS',
  'TOP_ATTRACTIONS_METHODOLOGY_URL',
  'authoritySources',
  'roadTrips',
  'sourceCheckedAt',
]) expect(topReferenceData.includes(token), `Top 25 shared reference-data contract missing: ${token}`);
for (const token of [
  "createFileRoute('/top-25-texas-attractions.csv')",
  "'content-type': 'text/csv; charset=utf-8'",
  "'x-robots-tag': 'noindex, follow'",
  "'content-disposition': 'attachment; filename=\"texasdefined-top-25-texas-attractions.csv\"'",
  'TOP_ATTRACTION_REFERENCE_ROWS',
  "'authority_source_count'",
  "'authority_source_urls'",
  "'road_trip_names'",
  "'methodology_url'",
]) expect(topCsv.includes(token), `Top 25 CSV contract missing: ${token}`);
for (const token of [
  "createFileRoute('/top-25-texas-attractions.json')",
  "'content-type': 'application/json; charset=utf-8'",
  "'x-robots-tag': 'noindex, follow'",
  "'content-disposition': 'attachment; filename=\"texasdefined-top-25-texas-attractions.json\"'",
  'TOP_ATTRACTION_REFERENCE_ROWS',
  'schemaVersion: 1',
  'authoritySources',
  'roadTrips',
  'canonicalCollection',
  'methodology',
]) expect(topJson.includes(token), `Top 25 JSON contract missing: ${token}`);
expect(topMethodology.includes('TopAttractionsMethodologyContent'), 'Top 25 methodology route must retain the split methodology content component');
for (const token of [
  'Source URLs travel with the data',
  '/top-25-texas-attractions.csv',
  '/top-25-texas-attractions.json',
]) expect(topMethodologyContent.includes(token), `Top 25 methodology download contract missing: ${token}`);

for (const token of [
  '"@type": "Dataset"',
  '"@type": "DataDownload"',
  'encodingFormat: "text/csv"',
  'encodingFormat: "application/json"',
  'contentUrl: csvUrl',
  'contentUrl: jsonUrl',
  'variableMeasured',
]) expect(iconsRoute.includes(token), `Things That Define Texas Dataset distribution missing: ${token}`);
for (const token of [
  'TEXAS_ICON_REFERENCE_ROWS',
  'TEXAS_ICONS_COLLECTION_URL',
  'TEXAS_ICONS_METHODOLOGY_URL',
  'TEXAS_ICON_CATEGORIES.flatMap',
  'texasIconCanonicalHref(entry)',
  'deeperGuide',
]) expect(iconsReferenceData.includes(token), `Things That Define Texas shared reference-data contract missing: ${token}`);
for (const token of [
  "createFileRoute('/things-that-define-texas.csv')",
  "'content-type': 'text/csv; charset=utf-8'",
  "'x-robots-tag': 'noindex, follow'",
  "'content-disposition': 'attachment; filename=\"texasdefined-things-that-define-texas.csv\"'",
  'TEXAS_ICON_REFERENCE_ROWS',
  "'deeper_guide'",
  "'canonical_collection'",
  "'methodology'",
]) expect(iconsCsv.includes(token), `Things That Define Texas CSV contract missing: ${token}`);
for (const token of [
  "createFileRoute('/things-that-define-texas.json')",
  "'content-type': 'application/json; charset=utf-8'",
  "'x-robots-tag': 'noindex, follow'",
  "'content-disposition': 'attachment; filename=\"texasdefined-things-that-define-texas.json\"'",
  'TEXAS_ICON_REFERENCE_ROWS',
  'schemaVersion: 1',
  'canonicalCollection',
  'methodology',
  'count: TEXAS_ICON_REFERENCE_ROWS.length',
  'items: TEXAS_ICON_REFERENCE_ROWS',
]) expect(iconsJson.includes(token), `Things That Define Texas JSON contract missing: ${token}`);
for (const token of [
  '/things-that-define-texas.csv',
  '/things-that-define-texas.json',
]) {
  expect(iconsContent.includes(`href=\"${token}\"`), `Things That Define Texas collection must expose ${token}`);
  expect(iconsMethodology.includes(`href=\"${token}\"`), `Things That Define Texas methodology must expose ${token}`);
}

if (errors.length) {
  console.error('Citation dataset download validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Citation dataset download validation passed: original research, growth, city-county, sports-venue, Top-25 and Things-That-Define-Texas distributions remain visible, source-aligned and machine-readable.');
