import { readFile } from 'node:fs/promises';

const read = (path) => readFile(path, 'utf8');
const growthRoute = await read('src/routes/texas-data.county-growth.tsx');
const growthContent = await read('src/components/data/CountyGrowthContent.tsx');
const growthCsv = await read('src/routes/texas-data.county-growth[.]csv.ts');
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

const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

for (const token of [
  "encodingFormat: 'text/csv'",
  "contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/county-growth.csv')",
]) expect(growthRoute.includes(token), `county-growth Dataset distribution missing: ${token}`);
expect(growthContent.includes('href="/texas-data/county-growth.csv"'), 'county-growth page must expose a visible CSV download link');
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
  'Download reference JSON',
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

if (errors.length) {
  console.error('Citation dataset download validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Citation dataset download validation passed: growth, city-county, sports-venue and Top-25 CSV/JSON distributions remain visible, noindex, source-aligned and machine-readable.');
