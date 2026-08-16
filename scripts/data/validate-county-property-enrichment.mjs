import fs from 'node:fs';

const snapshotPath = 'src/data/property/county-property-enrichment.generated.ts';
const snapshot = fs.readFileSync(snapshotPath, 'utf8');
const dataset = fs.readFileSync('src/data/property/county-property-data.ts', 'utf8');
const schema = fs.readFileSync('src/data/property/county-property-schema.ts', 'utf8');
const sync = fs.readFileSync('scripts/data/sync-county-property-data.mjs', 'utf8');
const refreshWorkflow = fs.readFileSync('.github/workflows/sync-county-property-data.yml', 'utf8');
const failures = [];

for (const feature of [
  'COUNTY_PROPERTY_ENRICHMENT',
  'https://comptroller.texas.gov/taxes/property-tax/county-directory/',
  'appraisalDistrictUrl:',
  'taxOfficeUrl:',
]) {
  if (!snapshot.includes(feature)) failures.push(`County property snapshot missing ${feature}`);
}

const seededSlugs = ['angelina', 'bee', 'burleson', 'collingsworth', 'cottle', 'fisher', 'hays', 'hidalgo', 'kendall', 'leon', 'lubbock', 'terrell'];
for (const slug of seededSlugs) {
  if (!new RegExp(`(?:^|\\n)  ${slug}:\\s*\\{`).test(snapshot) && !snapshot.includes(`\n  "${slug}":`)) {
    failures.push(`Verified priority county missing from snapshot: ${slug}`);
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
  'SOURCE_MAX_AGE_DAYS = 730',
  'parseCountyPage',
  'appraisal.websiteUrl',
  'taxOffice.websiteUrl',
  'isFreshSourceDate(appraisal.lastUpdated)',
  'isFreshSourceDate(taxOffice.lastUpdated)',
  'else if (fetched) delete merged[county.slug]',
  'lastVerifiedAt: sourceChecked',
  'sourceUrls: [sourceUrl, appraisal.websiteUrl, taxOffice.websiteUrl]',
]) {
  if (!sync.includes(feature)) failures.push(`County property sync safety contract missing ${feature}`);
}

for (const feature of [
  'workflow_dispatch:',
  'schedule:',
  "cron: '37 11 * * 1'",
  'permissions:',
  'contents: write',
  'pull-requests: write',
  'node scripts/data/sync-county-property-data.mjs',
  'node scripts/data/validate-county-property-enrichment.mjs',
  'git checkout -b "$branch"',
  'gh pr create',
  "--base main",
]) {
  if (!refreshWorkflow.includes(feature)) failures.push(`County property refresh workflow missing safety feature ${feature}`);
}
if (/git\s+push\s+origin\s+main(?:\s|$)/m.test(refreshWorkflow)) failures.push('County property refresh workflow must never push generated source changes directly to main.');
if (/gh\s+pr\s+merge/m.test(refreshWorkflow)) failures.push('County property refresh workflow must not auto-merge externally refreshed data.');

if (/lastVerifiedAt:\s*['"]?\s*['"]?\s*,/.test(snapshot)) failures.push('Snapshot contains an empty verification date.');
if (/websiteUrl:\s*['"]http:\/\//.test(snapshot)) failures.push('Snapshot contains an insecure office website URL.');

const recordMatches = [...snapshot.matchAll(/^  (?:(?:"([a-z0-9-]+)")|([a-z0-9-]+)):\s*\{/gm)];
const recordSlugs = recordMatches.map((match) => match[1] || match[2]).filter(Boolean);
if (new Set(recordSlugs).size !== recordSlugs.length) failures.push('Snapshot contains duplicate top-level county slugs.');
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

console.log(`County property enrichment validation passed: ${recordSlugs.length} verified county records are source-backed, freshness-gated, stale-source-withdrawal protected, merged behind the indexability gate, and refreshed only through a reviewable PR workflow.`);
