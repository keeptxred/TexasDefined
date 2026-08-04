import fs from 'node:fs';

const errors = [];
const root = 'src/shared/platform-core';
const required = [
  `${root}/contract.ts`,
  `${root}/entities.ts`,
  `${root}/fingerprint.ts`,
  `${root}/promotion.ts`,
  `${root}/index.ts`,
  `${root}/upstream.json`,
  `${root}/consumer.json`,
  'src/platform/entity-promotion.ts',
];
for (const path of required) if (!fs.existsSync(path)) errors.push(`Missing shared platform integration file: ${path}`);
if (errors.length) fail();

const upstream = JSON.parse(fs.readFileSync(`${root}/upstream.json`, 'utf8'));
const consumer = JSON.parse(fs.readFileSync(`${root}/consumer.json`, 'utf8'));
const contract = fs.readFileSync(`${root}/contract.ts`, 'utf8');
const entities = fs.readFileSync(`${root}/entities.ts`, 'utf8');
const fingerprint = fs.readFileSync(`${root}/fingerprint.ts`, 'utf8');
const promotion = fs.readFileSync(`${root}/promotion.ts`, 'utf8');
const integration = fs.readFileSync('src/platform/entity-promotion.ts', 'utf8');

if (upstream.package !== '@keeptxred/texas-platform-core') errors.push('Unexpected shared package name.');
if (upstream.repository !== 'keeptxred/texas-common-core') errors.push('Unexpected shared package repository.');
if (!/^[0-9a-f]{40}$/.test(upstream.commit)) errors.push('Shared package upstream commit is not pinned to a full SHA.');
if (consumer.consumer !== 'TexasDefined') errors.push('Unexpected consumer identity.');
if (consumer.repository !== 'keeptxred/TexasDefined') errors.push('Unexpected consumer repository.');
if (consumer.coreCommit !== upstream.commit) errors.push('Consumer and upstream commit pins differ.');
if (consumer.packageVersion !== upstream.version) errors.push('Consumer and upstream package versions differ.');
if (consumer.apiVersion !== upstream.apiVersion) errors.push('Consumer and upstream API versions differ.');
if (!contract.includes(`packageVersion: '${upstream.version}'`)) errors.push('Vendored contract package version differs from upstream.json.');
if (!contract.includes(`apiVersion: '${upstream.apiVersion}'`)) errors.push('Vendored contract API version differs from upstream.json.');
for (const file of ['contract.ts', 'entities.ts', 'fingerprint.ts', 'promotion.ts', 'index.ts']) {
  if (!upstream.files.includes(file)) errors.push(`Upstream manifest does not include ${file}.`);
}

requireSymbols(contract, ['PLATFORM_CORE_CONTRACT', 'PlatformCoreConsumerManifest', 'validateConsumerManifest'], 'shared compatibility contract');
requireSymbols(entities, ['TexasEntityRecord', 'canonicalizeEntity', 'cloneEntity'], 'shared entity contracts');
requireSymbols(fingerprint, ['fnv1aFingerprint', 'fingerprintEntities', 'canonicalizeEntity'], 'shared fingerprints');
requireSymbols(promotion, ['diffEntitySets', 'quarantineEntity', 'createPromotionPreview', 'DEFAULT_PROMOTION_POLICY'], 'shared promotion controls');
requireSymbols(integration, [
  "from '@/shared/platform-core'", 'diffEntitySets', 'fingerprintEntities', 'sharedQuarantineEntity',
  'non-promotable-status', 'invalid-coordinates', 'validatePromotionApproval',
], 'TexasDefined shared-core integration');

for (const capability of ['entity-contracts','entity-canonicalization','deterministic-fingerprints','entity-set-diffs','baseline-quarantine','promotion-previews']) {
  if (!consumer.capabilities.includes(capability)) errors.push(`TexasDefined consumer capability missing: ${capability}`);
}
for (const domain of ['branding', 'routes', 'supabase', 'deployment']) {
  if (!consumer.excludedDomains.includes(domain)) errors.push(`TexasDefined excluded domain missing: ${domain}`);
}

const forbidden = ['react', '@tanstack', 'supabase', 'texasdefined.com', 'keeptxred.com', 'import.meta.env', 'process.env'];
for (const path of [`${root}/contract.ts`, `${root}/entities.ts`, `${root}/fingerprint.ts`, `${root}/promotion.ts`, `${root}/index.ts`]) {
  const source = fs.readFileSync(path, 'utf8').toLowerCase();
  for (const token of forbidden) if (source.includes(token.toLowerCase())) errors.push(`${path} contains forbidden site/framework dependency: ${token}`);
}

if (errors.length) fail();
console.log(`Shared platform core ${upstream.version} API ${upstream.apiVersion} pinned at ${upstream.commit} is compatible and boundary-safe.`);

function requireSymbols(source, symbols, area) {
  for (const symbol of symbols) if (!source.includes(symbol)) errors.push(`${area} missing: ${symbol}`);
}
function fail() {
  console.error('Shared platform core validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
