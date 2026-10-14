import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
const importer = read('supabase/functions/import-texas-property-tax-rates/index.ts');
const publicEndpoint = read('supabase/functions/public-school-district-tax-rates/index.ts');
const loader = read('src/data/school-district-tax-rates.ts');
const eagerRoute = read('src/routes/texas-data.$datasetSlug.tsx');
const lazyRoute = read('src/routes/texas-data.$datasetSlug.lazy.tsx');
const registry = read('src/data/texas-data-center.server.ts');
const catalog = read('src/data/texas-data-center.ts');
const routeTree = read('src/routeTree.gen.ts');

const requiredImporter = [
  ['Ballinger official ID', '"200-901-02"'],
  ['Ballinger corrected rate', 'corrected:{total:0.7705,mo:0.7705,debt:0}'],
  ['Ballinger Runnels County source', 'Ballinger%20ISD%202025%20Tax%20Rate%20Adoption.pdf'],
  ['Chillicothe official ID', '"099-902-02"'],
  ['Chillicothe corrected rate', 'corrected:{total:1.0239,mo:0.6692,debt:0.3547}'],
  ['Chillicothe Hardeman CAD source', 'hardemancad.org/Forms/GetDocument'],
  ['Keller official ID', '"220-907-02"'],
  ['Keller corrected rate', 'corrected:{total:1.0852,mo:0.7552,debt:0.33}'],
  ['Keller official finance source', 'kellerisd.net/departments/finance'],
  ['raw fingerprint protection', 'sameRate(unit.total_rate,correction.raw.total)'],
  ['fail-closed unresolved conflict response', 'Refusing to replace production data while unresolved 2025 school-rate conflicts remain.'],
  ['unprocessable conflict status', 'status:422'],
];

const requiredPage = [
  ['public endpoint loader', 'public-school-district-tax-rates', loader],
  ['source URL row provenance', 'sourceUrl: string', loader],
  ['correction count contract', 'officialCorrectionCount: number', loader],
  ['Dataset schema', "'@type': 'Dataset'", eagerRoute],
  ['Dataset variable measurements', 'variableMeasured: loaderData.rows.map', eagerRoute],
  ['Dataset source schema', 'isBasedOn: loaderData.sourceUrl', eagerRoute],
  ['Breadcrumb schema', "'@type': 'BreadcrumbList'", eagerRoute],
  ['lazy route dispatch', "params.datasetSlug === schoolDistrictSlug", eagerRoute],
  ['lazy page registration', "createLazyFileRoute('/texas-data/$datasetSlug')", lazyRoute],
  ['district search', 'placeholder="District or county"', lazyRoute],
  ['county filter', '<Control label="County">', lazyRoute],
  ['rate sorting', '<Control label="Sort">', lazyRoute],
  ['tax per $100K', 'Tax / $100K', lazyRoute],
  ['CSV download', 'Download CSV', lazyRoute],
  ['CSV source URL', "'source_url'", lazyRoute],
  ['visible correction source', 'Verified local correction source', lazyRoute],
  ['TEA MCR validation source', 'ty2025-final-mcrs-2.pdf', lazyRoute],
  ['current verification date', 'October 14, 2026', lazyRoute],
  ['current sitemap date', "{ slug: 'school-district-tax-rates', updated: '2026-10-14' }", catalog],
  ['statewide registry title', "title: 'Texas School District Property Tax Rates — 2025'", registry],
  ['empty legacy sample rows', 'rows: []', registry],
  ['generated lazy route', "import('./routes/texas-data.$datasetSlug.lazy').then((d) => d.Route)", routeTree],
];

const failures = [];
for (const [label, marker] of requiredImporter) {
  if (!importer.includes(marker)) failures.push(`missing importer ${label}: ${marker}`);
}
for (const [label, marker, source] of requiredPage) {
  if (!source.includes(marker)) failures.push(`missing ${label}: ${marker}`);
}

if (!publicEndpoint.includes('SUPABASE_ANON_KEY')) failures.push('public school-rate endpoint must use the anon/public RLS key');
if (publicEndpoint.includes('SUPABASE_SERVICE_ROLE_KEY')) failures.push('public school-rate endpoint must not use the service-role key');
if (!publicEndpoint.includes('"cache-control": "public, max-age=3600, stale-while-revalidate=86400"')) failures.push('public school-rate endpoint must retain cache headers');
if (registry.includes("title: 'Texas School-District Tax Rate Examples'")) failures.push('obsolete six-example school-tax registry title returned');
if (registry.includes("{ label: 'Judson ISD', value: 1.3022")) failures.push('obsolete six-row school-tax sample returned');

const correctionIndex = importer.indexOf('applyKnown2025SchoolRateCorrection(u);');
const conflictGuardIndex = importer.indexOf('maintenance_operations_rate<TEA_2025_MINIMUM_MCR');
const unresolvedIndex = importer.indexOf('const unresolvedSchoolConflicts=');
const deleteIndex = importer.indexOf('.from("texas_property_tax_rates").delete().eq("year",year)');

if (correctionIndex < 0 || conflictGuardIndex < 0 || correctionIndex > conflictGuardIndex) {
  failures.push('known source corrections must run before the 2025 M&O floor guard');
}
if (unresolvedIndex < 0 || deleteIndex < 0 || unresolvedIndex > deleteIndex) {
  failures.push('unresolved 2025 school-rate conflicts must be checked before replacing production rows');
}

if (failures.length) {
  console.error('Property-tax source/page integrity contract failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Property-tax source/page integrity contract passed: known 2025 source errors are fingerprint-corrected, unresolved conflicts fail closed, the public endpoint uses anon RLS access, and the statewide explorer retains required provenance/features.');
