import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const readRouteSurface = (file) => {
  const eagerSource = read(file);
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(lazyFile) ? `${eagerSource}\n${read(lazyFile)}` : eagerSource;
};

const sitemap = read('src/routes/sitemap[.]xml.ts');
const hub = readRouteSurface('src/routes/texas-data.tsx');
const detail = read('src/routes/texas-data.$datasetSlug.tsx');
const detailSurface = readRouteSurface('src/routes/texas-data.$datasetSlug.tsx');
const schoolRates = read('src/data/school-district-tax-rates.ts');
const taxImporter = read('supabase/functions/import-texas-property-tax-rates/index.ts');
const bridge = read('src/data/texas-data-center.ts');
const serverRegistry = read('src/data/texas-data-center.server.ts');

const checks = [
  [sitemap, 'TEXAS_DATASETS.map((dataset)', 'Sitemap must enumerate Texas dataset routes'],
  [sitemap, 'lastmod: toDate(dataset.updated)', 'Dataset sitemap entries must expose update dates'],
  [bridge, 'createServerFn', 'Texas data registry bridge must use the supported server-function boundary'],
  [bridge, 'await import("./texas-data-center.server")', 'Texas data registry bridge must dynamically load the full registry server-side'],
  [hub, "'@type': ['CollectionPage', 'DataCatalog']", 'Texas data hub must declare a DataCatalog'],
  [hub, "import { getTexasDatasets } from '@/data/texas-data-center'", 'Texas data hub must load datasets through the server-backed registry bridge'],
  [hub, 'loader: async () => ({ datasets: await getTexasDatasets() })', 'Texas data loader must return every maintained dataset'],
  [hub, 'const { datasets } = Route.useLoaderData()', 'Texas data hub UI must consume the complete loader-backed dataset registry'],
  [hub, 'datasets.map((dataset', 'Texas data hub must link every loader-backed dataset'],
  [hub, 'to="/texas-data/$datasetSlug"', 'Texas data hub must use canonical dataset routes'],
  [hub, "const sportsComparisonPath = '/sports-venues/compare'", 'Texas data hub must retain the sports venue comparison as a maintained cross-vertical dataset'],
  [hub, "const sportsComparisonCsvPath = '/sports-venues/compare.csv'", 'Texas data hub must retain the sports venue comparison CSV distribution'],
  [hub, "name: 'Texas Sports Venue Comparison'", 'Texas DataCatalog schema must name the sports venue comparison dataset'],
  [hub, "'@type': 'DataDownload'", 'Texas DataCatalog must expose the sports comparison machine-readable distribution'],
  [hub, "encodingFormat: 'text/csv'", 'Texas DataCatalog sports comparison distribution must identify CSV encoding'],
  [hub, 'contentUrl: absoluteUrl(texasDefinedBrand, sportsComparisonCsvPath)', 'Texas DataCatalog must point to the canonical sports comparison CSV'],
  [hub, 'Data from across Texas Defined', 'Texas data hub must visibly distinguish cross-vertical reference datasets from native data briefs'],
  [hub, 'Texas Sports Venue Comparison', 'Texas data hub must visibly link the sports comparison'],
  [hub, 'Capacity and opening fields remain blank when the verified profile does not contain a usable value.', 'Texas data hub must preserve sports missing-value guidance'],
  [detail, "'@type': 'Dataset'", 'Dataset pages must declare Dataset schema'],
  [detail, 'const dataset = await getTexasDataset(params.datasetSlug)', 'Dataset pages must load the maintained registry through the server-backed bridge'],
  [detail, 'variableMeasured: loaderData.schoolRates ?', 'School tax Dataset schema must describe the live statewide measurements'],
  [detail, ': loaderData.rows.map', 'Generic Dataset schema must continue describing maintained registry measurements'],
  [detail, 'isBasedOn: loaderData.sourceUrl', 'Dataset schema must identify its source'],
  [detail, "'@type': 'BreadcrumbList'", 'Dataset pages must declare breadcrumbs'],
  [detailSurface, 'Texas School District Property Tax Rates — {data.year}', 'School tax dataset must render the statewide authority explorer'],
  [detailSurface, 'Download CSV', 'School tax dataset must preserve downloadable statewide data'],
  [schoolRates, ".eq('type', 'school-district')", 'School tax loader must select a school-district-specific latest year'],
  [taxImporter, 'KNOWN_2025_SCHOOL_RATE_CORRECTIONS', 'Property-tax importer must retain verified 2025 school-rate corrections'],
  [taxImporter, '"200-901-02":{raw:{total:0.286335,mo:0.286335,debt:0},corrected:{total:0.7705,mo:0.7705,debt:0}', 'Ballinger 2025 verified correction must not regress'],
  [taxImporter, '"099-902-02":{raw:{total:0.8247,mo:0.47,debt:0.3547},corrected:{total:1.0239,mo:0.6692,debt:0.3547}', 'Chillicothe 2025 verified correction must not regress'],
  [taxImporter, '"220-907-02":{raw:{total:1.0852,mo:0.33,debt:0.7552},corrected:{total:1.0852,mo:0.7552,debt:0.33}', 'Keller 2025 verified correction must not regress'],
];

const failures = checks
  .filter(([source, needle]) => !source.includes(needle))
  .map(([, , message]) => message);

const extractSlugs = (source) => [...source.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
const bridgeSlugs = extractSlugs(bridge);
const serverSlugs = extractSlugs(serverRegistry);
if (JSON.stringify(bridgeSlugs) !== JSON.stringify(serverSlugs)) {
  failures.push('Sitemap-safe Texas dataset metadata must stay in exact slug parity with the full server registry.');
}
// Data integrity regressions must fail before stale or misquoted figures reach the hub.
const premiumBrief = serverRegistry.slice(serverRegistry.indexOf("slug: 'texas-homeowners-premium-history'"), serverRegistry.indexOf("slug: 'texas-metro-payrolls-june-2026'"));
if (!premiumBrief.includes("{ label: '2023', value: 2795 }") || !premiumBrief.includes("{ label: '2025', value: 3489")) {
  failures.push('Homeowners brief must agree with TDI published 2023 ($2,795) and preliminary 2025 ($3,489) annual premiums.');
}
const juneBrief = serverRegistry.slice(serverRegistry.indexOf("slug: 'texas-metro-payrolls-june-2026'"), serverRegistry.indexOf("slug: 'texas-metro-payrolls-august-2026'"));
if (!juneBrief.includes('https://www.bls.gov/news.release/archives/metro_07292026.htm')) {
  failures.push('Historical June 2026 metro payrolls must link to its original BLS archive, not the rolling table.');
}
const augustBrief = serverRegistry.slice(serverRegistry.indexOf("slug: 'texas-metro-payrolls-august-2026'"), serverRegistry.indexOf("slug: 'texas-traffic-monitoring-coverage'"));
if (!augustBrief.includes('https://www.bls.gov/news.release/archives/metro_09302026.htm')) {
  failures.push('Current August 2026 metro payrolls must link to the dated September 30 BLS release.');
}
for (const [label, value] of [
  ['Dallas–Fort Worth–Arlington', 4357000],
  ['Houston–Pasadena–The Woodlands', 3495300],
  ['Austin–Round Rock–San Marcos', 1415900],
  ['San Antonio–New Braunfels', 1191700],
]) {
  if (!augustBrief.includes(`{ label: '${label}', value: ${value} }`)) {
    failures.push(`August 2026 BLS Table 3 payroll mismatch: ${label}`);
  }
}
if (!hub.includes("texas-metro-payrolls-august-2026")) {
  failures.push('Texas Data hub must feature the latest verified metro payroll snapshot.');
}
if (/Hutto ISD|Socorro ISD/.test(serverRegistry.slice(serverRegistry.indexOf("slug: 'school-district-tax-rates'"), serverRegistry.indexOf("slug: 'homestead-exemption-history'")))) {
  failures.push('School district tax registry must not regress to the obsolete six-row sample.');
}
if (bridge.includes("sourceName: '") || bridge.includes("sourceUrl: '") || bridge.includes("methodology: '") || bridge.includes('rows: [')) {
  failures.push('Texas data bridge must not duplicate source methodology and measurement rows into emitted client JavaScript.');
}
if (hub.includes("from '@/data/sports-venue-comparison'")) {
  failures.push('Texas data hub must link the sports dataset without importing the 84-row sports comparison payload.');
}
if (hub.includes('getSportsVenueEnrichmentAll') || hub.includes('CURATED_KNOWLEDGE_GRAPH_SEED')) {
  failures.push('Texas data hub must not import sports venue enrichment or the statewide knowledge seed just to advertise the comparison dataset.');
}

if (failures.length) {
  console.error('Texas data SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas data SEO validation passed (${serverSlugs.length} full server-backed datasets in sitemap parity, with DataCatalog and sports CSV discovery preserved).`);
