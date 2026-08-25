import fs from 'node:fs';

const snapshotPath = 'src/data/property/county-property-enrichment.generated.ts';
const snapshot = fs.readFileSync(snapshotPath, 'utf8');
const localVerification = fs.readFileSync('src/data/property/county-property-local-verification.ts', 'utf8');
const dataset = fs.readFileSync('src/data/property/county-property-data.ts', 'utf8');
const schema = fs.readFileSync('src/data/property/county-property-schema.ts', 'utf8');
const sync = fs.readFileSync('scripts/data/sync-county-property-data.mjs', 'utf8');
const directoryRoute = fs.readFileSync('src/routes/property-tax.counties.tsx', 'utf8');
const refreshWorkflow = fs.readFileSync('.github/workflows/sync-county-property-data.yml', 'utf8');
const validateWorkflow = fs.readFileSync('.github/workflows/validate.yml', 'utf8');
const validationSuite = fs.readFileSync('scripts/ci/run-validation-suite.mjs', 'utf8');
const failures = [];
const SOURCE_MAX_AGE_DAYS = 730;
const LOCAL_VERIFICATION_MAX_AGE_DAYS = 400;

for (const feature of [
  'COUNTY_PROPERTY_ENRICHMENT',
  'sourceUpdatedAt: { appraisalDistrict: string; taxOffice: string };',
  'https://comptroller.texas.gov/taxes/property-tax/county-directory/',
  'appraisalDistrictUrl:',
  'taxOfficeUrl:',
]) {
  if (!snapshot.includes(feature)) failures.push(`County property snapshot missing ${feature}`);
}

for (const feature of [
  "import { COUNTY_PROPERTY_ENRICHMENT }",
  "import { COUNTY_PROPERTY_LOCAL_VERIFICATION }",
  'const enrichment = COUNTY_PROPERTY_ENRICHMENT[county.slug]',
  'const localVerification = COUNTY_PROPERTY_LOCAL_VERIFICATION[county.slug]',
  'enrichment ? enrichment.appraisalDistrict : {}',
  'enrichment ? enrichment.taxOffice : {}',
  'enrichment ? enrichment.links : {}',
  'localVerification?.appraisalDistrict',
  'localVerification?.taxOffice',
  'localVerification?.links',
  'localVerification?.lastVerifiedAt ?? enrichment?.lastVerifiedAt ?? null',
  '...(enrichment?.sourceUrls ?? [])',
  '...(localVerification?.sourceUrls ?? [])',
]) {
  if (!dataset.includes(feature)) failures.push(`County property dataset merge missing ${feature}`);
}

for (const feature of [
  'COUNTY_PROPERTY_LOCAL_VERIFICATION',
  'Hand-verified local property-tax records',
  'current local government sources independently confirm',
  "polk:",
  "mason:",
  "haskell:",
  "lastVerifiedAt: '2026-08-25'",
  'https://polkcad.org',
  'https://masoncad.org',
  'https://www.haskellcad.com',
]) {
  if (!localVerification.includes(feature)) failures.push(`County property local verification overlay missing ${feature}`);
}

const localVerificationDates = [...localVerification.matchAll(/lastVerifiedAt:\s*['"](\d{4}-\d{2}-\d{2})['"]/g)].map((match) => match[1]);
if (localVerificationDates.length < 3) failures.push('Local verification overlay must retain verification dates for Polk, Mason, and Haskell.');
for (const value of localVerificationDates) {
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) failures.push(`Local verification overlay contains invalid verification date: ${value}`);
  else {
    const ageMs = Date.now() - timestamp;
    if (ageMs < 0) failures.push(`Local verification overlay contains future verification date: ${value}`);
    else if (ageMs > LOCAL_VERIFICATION_MAX_AGE_DAYS * 24 * 60 * 60 * 1000) failures.push(`Local verification overlay contains stale verification older than ${LOCAL_VERIFICATION_MAX_AGE_DAYS} days: ${value}`);
  }
}

for (const slug of ['polk', 'mason', 'haskell']) {
  const record = new RegExp(`\\b${slug}:\\s*\\{([\\s\\S]*?)(?=\\n  [a-z0-9-]+:\\s*\\{|\\n};)`).exec(localVerification)?.[1] ?? '';
  const urls = [...record.matchAll(/https:\/\/[^'"\s,]+/g)].map((match) => match[0].replace(/[}\]]+$/, ''));
  const distinctLocalSources = new Set(urls.filter((url) => !url.includes('comptroller.texas.gov')));
  if (distinctLocalSources.size < 2) failures.push(`${slug}: local verification must retain at least two distinct non-Comptroller property-tax sources.`);
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
  'MIN_RETAINED_RATIO = 0.75',
  'const previousCount = Object.keys(merged).length',
  'nextCount < Math.floor(previousCount * MIN_RETAINED_RATIO)',
  'Refusing statewide county-property refresh that would shrink verified coverage',
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
  'concurrency:',
  'group: texasdefined-county-property-sync',
  'cancel-in-progress: false',
  'node scripts/data/sync-county-property-data.mjs',
  'node scripts/data/validate-county-property-enrichment.mjs',
  'node scripts/data/validate-generated-page-quality.mjs',
  'node scripts/data/validate-entity-template-quality.mjs',
  'node scripts/data/validate-indexation-quality.mjs',
  'node scripts/data/validate-crawl-demand.mjs',
  'node scripts/data/validate-freshness-signals.mjs',
  'node scripts/data/validate-sitemap-routes.mjs',
  'git checkout -b "$branch"',
  'gh pr create',
  "--base main",
]) {
  if (!refreshWorkflow.includes(feature)) failures.push(`County property refresh workflow missing safety feature ${feature}`);
}
if (/git\s+push\s+origin\s+main(?:\s|$)/m.test(refreshWorkflow)) failures.push('County property refresh workflow must never push generated source changes directly to main.');
if (/gh\s+pr\s+merge/m.test(refreshWorkflow)) failures.push('County property refresh workflow must not auto-merge externally refreshed data.');

const legacyStandaloneProtection = validateWorkflow.includes('Validate county property enrichment') && validateWorkflow.includes('node scripts/data/validate-county-property-enrichment.mjs');
const centralizedProtection = validateWorkflow.includes('node scripts/ci/run-validation-suite.mjs full')
  && validationSuite.includes("'county-property-enrichment'")
  && validationSuite.includes("'scripts/data/validate-county-property-enrichment.mjs'");
if (!legacyStandaloneProtection && !centralizedProtection) {
  failures.push('Main validation must permanently run county property enrichment protection either as its legacy named step or through the authoritative validation suite.');
}

if (/lastVerifiedAt:\s*['"]?\s*['"]?\s*,/.test(snapshot)) failures.push('Snapshot contains an empty verification date.');
if (/websiteUrl:\s*['"]http:\/\//.test(snapshot)) failures.push('Snapshot contains an insecure office website URL.');

const recordMatches = [...snapshot.matchAll(/^  (?:(?:"([a-z0-9-]+)")|([a-z0-9-]+)):\s*\{/gm)];
const recordSlugs = recordMatches.map((match) => match[1] || match[2]).filter(Boolean);
if (recordSlugs.length === 0) failures.push('Snapshot must contain at least one verified county record.');
if (recordSlugs.length > 254) failures.push(`Snapshot contains ${recordSlugs.length} county records; maximum is 254.`);
if (new Set(recordSlugs).size !== recordSlugs.length) failures.push('Snapshot contains duplicate top-level county slugs.');

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

console.log(`County property enrichment validation passed: ${recordSlugs.length} generated county records remain upstream-freshness-gated; current local verification overlays are independently freshness/source-count protected; catastrophic-shrink, stale-source withdrawal, crawl-demand filtering, indexability gating, CI protection and reviewable refresh PR behavior remain intact.`);
