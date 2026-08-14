import fs from 'node:fs';

const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const hub = fs.readFileSync('src/routes/texas-data.tsx', 'utf8');
const detail = fs.readFileSync('src/routes/texas-data.$datasetSlug.tsx', 'utf8');

const checks = [
  [sitemap, 'TEXAS_DATASETS.map((dataset)', 'Sitemap must enumerate Texas dataset routes'],
  [sitemap, 'lastmod: toDate(dataset.updated)', 'Dataset sitemap entries must expose update dates'],
  [hub, "'@type': ['CollectionPage', 'DataCatalog']", 'Texas data hub must declare a DataCatalog'],
  [hub, 'TEXAS_DATASETS.map((dataset)', 'Texas data hub must link every dataset'],
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
  [detail, 'variableMeasured: loaderData.rows.map', 'Dataset schema must describe visible measurements'],
  [detail, 'isBasedOn: loaderData.sourceUrl', 'Dataset schema must identify its source'],
  [detail, "'@type': 'BreadcrumbList'", 'Dataset pages must declare breadcrumbs'],
];

const failures = checks
  .filter(([source, needle]) => !source.includes(needle))
  .map(([, , message]) => message);

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

console.log('Texas data SEO validation passed, including lightweight discovery and DataCatalog distribution metadata for the sports venue comparison.');
