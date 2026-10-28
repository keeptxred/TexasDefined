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
const iconsRoute = await read('src/routes/things-unique-to-texas.tsx');
const iconsContent = await read('src/routes/things-unique-to-texas.lazy.tsx');
const iconsMethodology = await read('src/routes/things-unique-to-texas_.methodology.tsx');
const iconsCsv = await read('src/routes/things-that-define-texas[.]csv.ts');
const iconsJson = await read('src/routes/things-that-define-texas[.]json.ts');
const iconsReferenceData = await read('src/data/things-unique-to-texas-reference.ts');

// The existing post-deploy smoke must test the currently deployed verified
// Texas Data after *every* successful deploy, even if an intermediate data
// release was superseded before deployment. Never freeze future TDI premiums.
const smokeWorkflow = await read('.github/workflows/texasdefined-publication-production-smoke.yml');
const liveDataSmoke = await read('scripts/ci/verify-texas-data-production.mjs');

const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };

expect(smokeWorkflow.includes("if: ${{ github.event_name == 'workflow_dispatch' || github.event_name == 'schedule' || github.event.workflow_run.conclusion == 'success' }}"), 'Texas Data smoke must only run on manual, scheduled, or successful deployment checks');
expect(smokeWorkflow.includes("cron: '47 14 * * *'"), 'Official-source live acceptance must have one bounded daily GitHub check');
expect(smokeWorkflow.includes("group: texasdefined-publication-production-smoke-${{ github.event_name == 'schedule' && 'daily' || 'release' }}"), 'Daily audit must not cancel protected release smoke');
expect((smokeWorkflow.match(/if: github.event_name != 'schedule'/g) ?? []).length === 3, 'Daily check must skip unrelated news, museums, and affiliate audits');

expect(smokeWorkflow.includes('run: node --check scripts/ci/verify-texas-data-production.mjs'), 'Texas Data smoke must check live verifier syntax');
expect(smokeWorkflow.includes('run: node scripts/ci/verify-texas-data-production.mjs'), 'Every successful deployment must verify the live Texas Data hub, release vintages and CSVs');
expect(!smokeWorkflow.includes('texas_data_scope'), 'Data-only publication must not be skipped because a later unrelated merge won deployment');
expect(liveDataSmoke.includes('currentTdiPremiumLabel'), 'Live premium acceptance must follow the maintained official TDI series');
expect(liveDataSmoke.includes('currentBlsReleaseLabel') && liveDataSmoke.includes('currentBlsHubPayrolls'), 'Live acceptance must verify current official BLS observation month and four metro values');
expect(liveDataSmoke.includes("const metroDetailPath = '/texas-data/texas-metro-payrolls-latest'") && liveDataSmoke.includes("for (const row of currentBls.rows)"), 'Public live acceptance must validate exact latest BLS dataset page and all 13 current metro counts');
expect(liveDataSmoke.includes("const countyGrowthDetailPath = '/texas-data/county-growth'") && liveDataSmoke.includes("'live-Census-county-detail'"), 'Public live acceptance must validate the verified Census county vintage detail');
expect(!liveDataSmoke.includes("'$3,489'"), 'Live acceptance must not freeze the historic TDI premium');


for (const token of [
  "encodingFormat: 'text/csv'",
  "contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/county-growth.csv')",
]) expect(growthRoute.includes(token), `county-growth Dataset distribution missing: ${token}`);
expect(growthContent.includes('href="/texas-data/county-growth.csv"'), 'county-growth page must expose a visible CSV download link');
for (const token of [
  "createFileRoute('/texas-data/county-growth.csv')",
  "'content-type': 'text/csv; charset=utf-8'",
  "'x-robots-tag': 'noindex, follow'",
  "'content-disposition': 'attachment; filename=\"texas-county-population-growth-2020-'",
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

console.log('Citation dataset download validation passed: growth, city-county, sports-venue, Top-25 and Things-That-Define-Texas CSV/JSON distributions remain visible, noindex, source-aligned and machine-readable.');
