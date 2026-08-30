import fs from 'node:fs';

const generated = fs.readFileSync('src/data/property/county-property-enrichment.generated.ts', 'utf8');
const local = fs.readFileSync('src/data/property/county-property-local-verification.ts', 'utf8');
const schema = fs.readFileSync('src/data/property/county-property-schema.ts', 'utf8');
const dataset = fs.readFileSync('src/data/property/county-property-data.ts', 'utf8');
const testSource = fs.readFileSync('src/data/property/county-property-priority.test.ts', 'utf8');
const failures = [];

const expectedLocal = {
  travis: { date: '2026-08-30', hosts: ['traviscad.org', 'tax-office.traviscountytx.gov'] },
  bexar: { date: '2026-08-30', hosts: ['bcad.org', 'bexar.org'] },
  dallas: { date: '2026-08-30', hosts: ['dallascad.org', 'dallascounty.org'] },
  collin: { date: '2026-08-30', hosts: ['collincad.org', 'collincountytx.gov'] },
  polk: { date: '2026-08-25', hosts: ['polkcad.org', 'co.polk.tx.us'] },
  mason: { date: '2026-08-25', hosts: ['masoncad.org', 'co.mason.tx.us'] },
  haskell: { date: '2026-08-25', hosts: ['haskellcad.com', 'haskellcountytx.gov'] },
};
const expectedGenerated = {
  comal: '2026-08-21',
  denton: '2026-08-21',
  bell: '2026-08-21',
};

function blockFor(source, slug) {
  return new RegExp(`\\n  ${slug}: \\{([\\s\\S]*?)(?=\\n  [a-z0-9-]+: \\{|\\n};)`).exec(source)?.[1] ?? '';
}
function topLevelSlugs(source) {
  return [...source.matchAll(/^  (?:(?:"([a-z0-9-]+)")|([a-z0-9-]+)):\s*\{/gm)]
    .map((match) => match[1] || match[2])
    .filter(Boolean);
}

for (const [slug, requirement] of Object.entries(expectedLocal)) {
  const block = blockFor(local, slug);
  if (!block) {
    failures.push(`${slug}: local verification overlay missing.`);
    continue;
  }
  if (!block.includes(`lastVerifiedAt: '${requirement.date}'`)) failures.push(`${slug}: expected verification date ${requirement.date}.`);
  for (const host of requirement.hosts) if (!block.includes(host)) failures.push(`${slug}: expected local authority host ${host}.`);
  const urls = [...block.matchAll(/https:\/\/[^'"\s,]+/g)].map((match) => match[0].replace(/[}\]]+$/, ''));
  const localHosts = new Set(urls.filter((url) => !url.includes('comptroller.texas.gov')).map((url) => {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
  }).filter(Boolean));
  if (localHosts.size < 2) failures.push(`${slug}: fewer than two distinct local property-tax authority hosts.`);
}

for (const [slug, date] of Object.entries(expectedGenerated)) {
  const block = blockFor(generated, slug);
  if (!block) failures.push(`${slug}: generated verified county record missing.`);
  else if (!block.includes(`lastVerifiedAt: '${date}'`)) failures.push(`${slug}: expected generated verification date ${date}.`);
}

for (const feature of [
  'COUNTY_PROPERTY_VERIFICATION_MAX_AGE_DAYS',
  'hasFreshCountyPropertyVerification',
  'localPropertySources.size >= 2',
]) if (!schema.includes(feature)) failures.push(`Index-readiness gate missing ${feature}.`);
for (const feature of [
  'COUNTY_PROPERTY_LOCAL_VERIFICATION[county.slug]',
  'localVerification?.lastVerifiedAt ?? enrichment?.lastVerifiedAt ?? null',
  '...(localVerification?.sourceUrls ?? [])',
]) if (!dataset.includes(feature)) failures.push(`County dataset overlay merge missing ${feature}.`);
for (const slug of ['travis', 'bexar', 'dallas', 'collin']) if (!testSource.includes(`${slug}: '2026-08-30'`)) failures.push(`${slug}: priority regression test is not aligned to August 30 verification.`);

const readySlugs = [...new Set([...topLevelSlugs(generated), ...topLevelSlugs(local)])].sort();
for (const slug of [...Object.keys(expectedLocal), ...Object.keys(expectedGenerated)]) {
  if (!readySlugs.includes(slug)) failures.push(`${slug}: missing from governed readiness cohort.`);
}
if (readySlugs.length >= 254) failures.push('Fail-closed county property gate has unexpectedly expanded to all 254 counties.');

if (failures.length) {
  console.error('Priority county property overlay validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`COUNTY_PROPERTY_READY count=${readySlugs.length} slugs=${readySlugs.join(',')}`);
console.log('Priority county property overlays, local authority separation, freshness markers, dataset merge and fail-closed indexability contract are protected.');
