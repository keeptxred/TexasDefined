import fs from 'node:fs';
const read = file => fs.readFileSync(file, 'utf8');
const file = 'src/data/generated/texas-county-growth-current.json';
const snapshot = JSON.parse(read(file));
const errors = [];
const requireCheck = (ok, description) => { if (!ok) errors.push(description); };
requireCheck(Number.isInteger(snapshot.vintage) && snapshot.vintage >= 2025 && snapshot.vintage <= 2029, 'Census vintage must remain within verified 2020 estimates-base methodology');
requireCheck(snapshot.asOf === snapshot.vintage + '-07-01', 'County population as-of date must follow official July 1 vintage');
requireCheck(/^20\d{2}-\d\d-\d\d$/.test(snapshot.verifiedAt), 'Source verification date is missing');
requireCheck(snapshot.sourceFileUrl === 'https://www2.census.gov/programs-surveys/popest/datasets/2020-' +
  snapshot.vintage + '/counties/totals/co-est' + snapshot.vintage + '-alldata.csv', 'Source file must be the matching authoritative Census release');
requireCheck(Array.isArray(snapshot.rows) && snapshot.rows.length === 254, 'Must publish precisely 254 Texas counties');
const seen = new Set();
let total = 0;
for (const row of snapshot.rows || []) {
  requireCheck(/^48(00[13579]|0[1-9][13579]|[1-4]\d[13579]|50[1357])$/.test(row.fips),
    'Invalid Texas FIPS code ' + row.fips);
  requireCheck(!seen.has(row.fips), 'Duplicate Texas FIPS ' + row.fips);
  seen.add(row.fips);
  requireCheck(/ County(?:, Texas)?$/.test(row.countyName), 'Invalid official county name for ' + row.fips);
  requireCheck(Number.isSafeInteger(row.populationBase2020) && row.populationBase2020 > 0 &&
    Number.isSafeInteger(row.populationEstimate) && row.populationEstimate > 0, 'Population values must be positive safe integers');
  requireCheck(row.populationEstimate - row.populationBase2020 === row.populationChange, 'Incorrect population gain for ' + row.fips);
  requireCheck(Math.abs((row.populationChange / row.populationBase2020 * 100) - row.populationChangePercent) < 0.0000001,
    'Incorrect percent change for ' + row.fips);
  total += row.populationEstimate;
}
for (let code = 1; code <= 507; code += 2) {
  requireCheck(seen.has('48' + String(code).padStart(3, '0')), 'Missing Texas county GEOID ' + code);
}
requireCheck(total > 25_000_000 && total < 50_000_000, 'Invalid aggregate county population');
const censusState = JSON.parse(read('src/data/generated/texas-state-population-current.json'));
if (censusState.vintage === snapshot.vintage) {
  requireCheck(total === censusState.population, 'County sum must reconcile against verified same-vintage Census state population');
}
const loader = read('src/data/census-county-growth.ts');
requireCheck(loader.includes('createServerFn'), 'County growth data must be loaded through a server function');
requireCheck(loader.includes('texas-county-growth-current.json'), 'County growth must use the verified generated snapshot');
requireCheck(!loader.includes('fetch(') && !loader.includes('co-est2025-alldata.csv'),
  'Visitor-facing county data must not fetch the full official file');
const workflow = read('.github/workflows/refresh-texas-county-growth.yml');
const finisher = read('.github/workflows/finish-texas-county-growth-refresh.yml');
requireCheck(workflow.includes("cron: '17 13 15 * *'") && workflow.includes('refresh-texas-county-growth.mjs'),
  'GitHub-owned county refresh schedule missing');
requireCheck(finisher.includes('dispatch-validate-branch.sh') && finisher.includes('gh pr merge'),
  'Protected verified county PR finisher missing');
const csv = read('src/routes/texas-data.county-growth[.]csv.ts');
requireCheck(csv.includes('population_estimate_') && csv.includes('data.vintage'), 'CSV field and file must advance annually');
const route = read('src/routes/texas-data.county-growth.tsx');
requireCheck(route.includes('data.vintage') && route.includes('loaderData.vintage'),
  'County page schema and headings must follow the new verified vintage');
if (errors.length) {
  console.error('Census county growth integrity failed:\n' + errors.map(e => '- ' + e).join('\n'));
  process.exit(1);
}
console.log('Validated complete source-verified Census county growth snapshot for all 254 Texas counties, Vintage ' + snapshot.vintage);
