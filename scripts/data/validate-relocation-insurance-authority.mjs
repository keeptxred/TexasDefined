import fs from 'node:fs';

const failures = [];
const read = (file) => fs.readFileSync(file, 'utf8');
const insurance = read('src/data/relocation-insurance.ts');
const metro = read('src/components/relocation/MetroRelocationAuthority.tsx');
const relocation = read('src/data/relocation-authority.ts');
const smoke = read('scripts/ci/verify-production-surfaces.mjs');

for (const requirement of [
  'https://www.tdi.texas.gov/general/texas-homeowners-insurance-market-overview.html',
  'https://www.tdi.texas.gov/consumer/homeowners-losses-by-county.html',
  'https://www.tdi.texas.gov/general/documents/home-owners-losses-by-county-25.csv',
  'https://www.tdi.texas.gov/news/2026/tdi06222026.html',
  'statewideAverageAnnualPremium: 3506',
  'activeHomeownersPolicies: 8233096',
  'statewidePaidLosses: 8_740_000_000',
  'windHailShareSince2019: 0.62',
  'every Texas county from 2019 through preliminary 2025 data',
  'TWIA wind and hail losses are not included',
  'if (county === "Harris") return "twia-partial"',
  'return "twia-county"',
  'Do not compare a policy that excludes wind with an inland policy that includes it.',
]) {
  if (!insurance.includes(requirement)) failures.push(`Relocation insurance source contract missing: ${requirement}`);
}

for (const coastalCounty of [
  'Aransas', 'Brazoria', 'Calhoun', 'Cameron', 'Chambers', 'Galveston', 'Jefferson',
  'Kenedy', 'Kleberg', 'Matagorda', 'Nueces', 'Refugio', 'San Patricio', 'Willacy',
]) {
  if (!insurance.includes(`"${coastalCounty}"`)) failures.push(`TWIA county classification must retain ${coastalCounty}.`);
}

for (const guidePath of [
  '/article/moving-to-dallas-fort-worth-guide',
  '/article/moving-to-houston-address-checklist',
  '/article/moving-to-austin-guide',
  '/article/moving-to-san-antonio-guide',
  '/article/moving-to-el-paso-guide',
]) {
  if (!relocation.includes(`guideHref: "${guidePath}"`)) failures.push(`Relocation insurance authority must remain attached to canonical metro guide ${guidePath}.`);
}

for (const requirement of [
  'TDI_HOMEOWNERS_MARKET',
  'countyWindLabel',
  'countyWindNote',
  'metro.counties.map((county)',
  'TDI county insurance research · 2025 preliminary',
  'Compare the counties, then quote the address',
  'a statewide average is not a quote',
  'Open TDI county premium map',
  'Open county paid-loss tool',
  'Download TDI 2025 county-loss CSV',
  'County losses describe paid claims, not expected future premiums or the risk at a specific property.',
  '/texas-home-insurance-calculator',
]) {
  if (!metro.includes(requirement)) failures.push(`Metro insurance authority surface missing: ${requirement}`);
}

if (!smoke.includes("['relocation-data-center', '/moving-to-texas/data', 'The data behind a move to Texas']")) {
  failures.push('Production smoke contract must verify the Texas Relocation Data Center directly.');
}

if (failures.length) {
  console.error('Texas relocation insurance authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('TDI county insurance research, TWIA caveats, five metro guide surfaces and relocation production smoke are protected.');
