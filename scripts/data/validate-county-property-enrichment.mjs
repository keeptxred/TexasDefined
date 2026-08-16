import fs from 'node:fs';

const snapshotPath = 'src/data/property/county-property-enrichment.generated.ts';
const snapshot = fs.readFileSync(snapshotPath, 'utf8');
const dataset = fs.readFileSync('src/data/property/county-property-data.ts', 'utf8');
const schema = fs.readFileSync('src/data/property/county-property-schema.ts', 'utf8');
const sync = fs.readFileSync('scripts/data/sync-county-property-data.mjs', 'utf8');
const failures = [];

for (const feature of [
  'COUNTY_PROPERTY_ENRICHMENT',
  'https://comptroller.texas.gov/taxes/property-tax/county-directory/',
  'appraisalDistrictUrl:',
  'taxOfficeUrl:',
]) {
  if (!snapshot.includes(feature)) failures.push(`County property snapshot missing ${feature}`);
}

const seededSlugs = ['angelina', 'burleson', 'collingsworth', 'cottle', 'fisher', 'kendall', 'terrell'];
for (const slug of seededSlugs) {
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
  'COUNTY_PROPERTY_VERIFICATION_MAX_AGE_DAYS',
  'hasFreshCountyPropertyVerification',
  'new Set([',
  'localPropertySources.size >= 2',
]) {
  if (!schema.includes(feature)) failures.push(`County property index gate missing ${feature}`);
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

const recordMatches = [...snapshot.matchAll(/(?:^|\n)\s*(?:"([a-z0-9-]+)"|([a-z0-9-]+)):\s*\{/g)];
const recordSlugs = recordMatches.map((match) => match[1] || match[2]).filter(Boolean);
if (new Set(recordSlugs).size !== recordSlugs.length) failures.push('Snapshot contains duplicate county slugs.');
if (recordSlugs.length < seededSlugs.length) failures.push(`Snapshot contains only ${recordSlugs.length} county records; expected at least ${seededSlugs.length}.`);

const comptrollerPages = [...snapshot.matchAll(/https:\/\/comptroller\.texas\.gov\/taxes\/property-tax\/county-directory\/([a-z0-9-]+)\.php/g)].map((match) => match[1]);
const uniqueComptrollerPages = new Set(comptrollerPages);
if (uniqueComptrollerPages.size < recordSlugs.length) failures.push('Every snapshot county must retain its own county-specific Comptroller source URL.');

const verificationDates = [...snapshot.matchAll(/lastVerifiedAt:\s*['"](\d{4}-\d{2}-\d{2})['"]/g)].map((match) => match[1]);
if (verificationDates.length < recordSlugs.length) failures.push('Every snapshot county must have a verification date.');
for (const value of verificationDates) {
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) failures.push(`Snapshot contains invalid verification date: ${value}`);
  else if (timestamp > Date.now() + 24 * 60 * 60 * 1000) failures.push(`Snapshot contains a future verification date: ${value}`);
}

if (failures.length) {
  console.error('County property enrichment validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`County property enrichment validation passed: ${recordSlugs.length} verified county records are source-backed, freshness-gated, and merged behind the existing indexability gate.`);
