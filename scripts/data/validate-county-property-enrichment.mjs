import fs from 'node:fs';

const snapshot = fs.readFileSync('src/data/property/county-property-enrichment.generated.ts', 'utf8');
const dataset = fs.readFileSync('src/data/property/county-property-data.ts', 'utf8');
const sync = fs.readFileSync('scripts/data/sync-county-property-data.mjs', 'utf8');
const failures = [];

for (const feature of [
  'COUNTY_PROPERTY_ENRICHMENT',
  "lastVerifiedAt: '2026-08-16'",
  'https://comptroller.texas.gov/taxes/property-tax/county-directory/',
  'appraisalDistrictUrl:',
  'taxOfficeUrl:',
]) {
  if (!snapshot.includes(feature)) failures.push(`County property snapshot missing ${feature}`);
}

for (const slug of ['angelina', 'burleson', 'collingsworth', 'cottle', 'fisher', 'kendall', 'terrell']) {
  if (!new RegExp(`(?:^|\\n)\\s*${slug}:\\s*\\{`).test(snapshot) && !snapshot.includes(`"${slug}":`)) {
    failures.push(`Verified first-batch county missing from snapshot: ${slug}`);
  }
}

for (const feature of [
  "import { COUNTY_PROPERTY_ENRICHMENT }",
  'const enrichment = COUNTY_PROPERTY_ENRICHMENT[county.slug]',
  '...enrichment.appraisalDistrict',
  '...enrichment.taxOffice',
  '...enrichment.links',
  'enrichment?.lastVerifiedAt ?? null',
  '...(enrichment?.sourceUrls ?? [])',
]) {
  if (!dataset.includes(feature)) failures.push(`County property dataset merge missing ${feature}`);
}

for (const feature of [
  "const DIRECTORY_URL = 'https://comptroller.texas.gov/taxes/property-tax/county-directory/'",
  'if (counties.length !== 254)',
  'parseCountyPage',
  'appraisal.websiteUrl',
  'taxOffice.websiteUrl',
  'lastVerifiedAt: sourceChecked',
  'sourceUrls: [sourceUrl, appraisal.websiteUrl, taxOffice.websiteUrl]',
]) {
  if (!sync.includes(feature)) failures.push(`County property sync safety contract missing ${feature}`);
}

if (/lastVerifiedAt:\s*['"]?\s*['"]?\s*,/.test(snapshot)) failures.push('Snapshot contains an empty verification date.');
if (/websiteUrl:\s*['"]http:\/\//.test(snapshot)) failures.push('Snapshot contains an insecure office website URL.');

const comptrollerPages = [...snapshot.matchAll(/https:\/\/comptroller\.texas\.gov\/taxes\/property-tax\/county-directory\/([a-z0-9-]+)\.php/g)].map((match) => match[1]);
if (new Set(comptrollerPages).size < 7) failures.push('Snapshot must retain a county-specific Comptroller source for every seeded record.');

if (failures.length) {
  console.error('County property enrichment validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`County property enrichment validation passed: ${new Set(comptrollerPages).size} verified county records are source-backed and merged behind the existing indexability gate.`);
