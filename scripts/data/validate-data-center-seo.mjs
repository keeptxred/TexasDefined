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
  [detail, "'@type': 'Dataset'", 'Dataset pages must declare Dataset schema'],
  [detail, 'variableMeasured: loaderData.rows.map', 'Dataset schema must describe visible measurements'],
  [detail, 'isBasedOn: loaderData.sourceUrl', 'Dataset schema must identify its source'],
  [detail, "'@type': 'BreadcrumbList'", 'Dataset pages must declare breadcrumbs'],
];

const failures = checks
  .filter(([source, needle]) => !source.includes(needle))
  .map(([, , message]) => message);

if (failures.length) {
  console.error('Texas data SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Texas data SEO validation passed.');
