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
  [detail, 'variableMeasured: loaderData.rows.map', 'Dataset schema must describe visible measurements'],
  [detail, 'isBasedOn: loaderData.sourceUrl', 'Dataset schema must identify its source'],
  [detail, "'@type': 'BreadcrumbList'", 'Dataset pages must declare breadcrumbs'],
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
if (bridge.includes('sourceUrl:') || bridge.includes('methodology:') && bridge.includes('rows: [')) {
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
