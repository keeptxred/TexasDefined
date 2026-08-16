import fs from 'node:fs';

const snapshotPath = 'src/data/property/county-property-enrichment.generated.ts';
const snapshot = fs.readFileSync(snapshotPath, 'utf8');
const dataset = fs.readFileSync('src/data/property/county-property-data.ts', 'utf8');
const schema = fs.readFileSync('src/data/property/county-property-schema.ts', 'utf8');
const sync = fs.readFileSync('scripts/data/sync-county-property-data.mjs', 'utf8');
const directoryRoute = fs.readFileSync('src/routes/property-tax.counties.tsx', 'utf8');
const refreshWorkflow = fs.readFileSync('.github/workflows/sync-county-property-data.yml', 'utf8');
const validateWorkflow = fs.readFileSync('.github/workflows/validate.yml', 'utf8');
const failures = [];
const SOURCE_MAX_AGE_DAYS = 730;

for (const feature of [
  'COUNTY_PROPERTY_ENRICHMENT',
  'sourceUpdatedAt: { appraisalDistrict: string; taxOffice: string };',
  'https://comptroller.texas.gov/taxes/property-tax/county-directory/',
  'appraisalDistrictUrl:',
  'taxOfficeUrl:',
]) {
  if (!snapshot.includes(feature)) failures.push(`County property snapshot missing ${feature}`);
}

const seededSlugs = [
  'angelina', 'bee', 'collingsworth', 'fisher', 'hays', 'hidalgo',
  'leon', 'lubbock', 'sabine', 'smith', 'terrell', 'washington',
];
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
  'sourceUpdatedAt:',
  'appraisalDistrict: appraisalUpdated',
  'taxOffice: taxUpdated',
  'else if (fetched) delete merged[county.slug]',
  'lastVerifiedAt: sourceChecked',
  'sourceUrls: [sourceUrl, appraisal.websiteUrl, taxOffice.websiteUrl]',
]) {
  if (!sync.includes(feature)) failures.push(`County property sync safety contract missing ${feature}`);
}

for (const feature of [
  'const verifiedPropertyCounties = COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady)',
  'const verifiedPropertySlugs = new Set(verifiedPropertyCounties.map((county) => county.slug))',
  'numberOfItems: verifiedPropertyCounties.length',
  'itemListElement: verifiedPropertyCounties.map',
  'verifiedPropertySlugs.has(county.slug)',
  '? <Link to="/property-tax/county/$county"',
  ': <Link to="/county/$slug"',
  'to="/county/$slug"',
  'Verified county property-tax guides',
  'Counties without a verified local property-tax guide link to their substantive county reference page',
]) {
  if (!directoryRoute.includes(feature)) failures.push(`County property directory crawl-demand protection missing ${feature}`);
}
if (directoryRoute.includes('numberOfItems: TEXAS_COUNTIES.length')) failures.push('County property directory must not advertise all 254 placeholder property-tax pages in ItemList schema.');
if (directoryRoute.includes('itemListElement: TEXAS_COUNTIES.map')) failures.push('County property directory must not emit URL-bearing schema for all 254 placeholder property-tax pages.');
if (directoryRoute.includes('{TEXAS_COUNTIES.map((county) => <Link to="/property-tax/county/$county"')) failures.push('County property directory must not unconditionally link every Texas county to a property-tax placeholder.');

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

for (const feature of [
  'Validate county property enrichment',
  'node scripts/data/validate-county-property-enrichment.mjs',
]) {
  if (!validateWorkflow.includes(feature)) failures.push(`Main validation workflow must permanently run county property enrichment protection: ${feature}`);
}

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

const upstreamFreshness = [...snapshot.matchAll(/sourceUpdatedAt:\s*\{\s*appraisalDistrict:\s*['"](\d{4}-\d{2}-\d{2})['"],\s*taxOffice:\s*['"](\d{4}-\d{2}-\d{2})['"]\s*\}/g)];
if (upstreamFreshness.length < recordSlugs.length) failures.push('Every snapshot county must persist both upstream office update dates.');
for (const match of upstreamFreshness) {
  for (const value of [match[1], match[2]]) {
    const timestamp = Date.parse(value);
    if (Number.isNaN(timestamp)) {
      failures.push(`Snapshot contains invalid upstream office update date: ${value}`);
      continue;
    }
    const ageMs = Date.now() - timestamp;
    if (ageMs < 0) failures.push(`Snapshot contains a future upstream office update date: ${value}`);
    else if (ageMs > SOURCE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000) failures.push(`Snapshot contains stale upstream office data older than ${SOURCE_MAX_AGE_DAYS} days: ${value}`);
  }
}

if (failures.length) {
  console.error('County property enrichment validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`County property enrichment validation passed: ${recordSlugs.length} verified county records are source-backed, upstream-freshness-gated, stale-source-withdrawal protected, directory crawl-demand filtered, merged behind the indexability gate, and protected by both main CI and a reviewable refresh PR workflow.`);
