import fs from 'node:fs';

const errors = [];
const root = 'src/shared/platform-core';
const required = [
  `${root}/contract.ts`, `${root}/content-intelligence.ts`, `${root}/entities.ts`, `${root}/fingerprint.ts`, `${root}/promotion.ts`,
  `${root}/index.ts`, `${root}/upstream.json`, `${root}/consumer.json`,
  'src/platform/entity-promotion.ts', 'src/routes/api.platform-core-status.ts', 'src/routes/api.content-disposition.ts',
];
for (const path of required) if (!fs.existsSync(path)) errors.push(`Missing shared platform integration file: ${path}`);
if (errors.length) fail();

const upstream = JSON.parse(fs.readFileSync(`${root}/upstream.json`, 'utf8'));
const consumer = JSON.parse(fs.readFileSync(`${root}/consumer.json`, 'utf8'));
const contract = fs.readFileSync(`${root}/contract.ts`, 'utf8');
const content = fs.readFileSync(`${root}/content-intelligence.ts`, 'utf8');
const entities = fs.readFileSync(`${root}/entities.ts`, 'utf8');
const fingerprint = fs.readFileSync(`${root}/fingerprint.ts`, 'utf8');
const promotion = fs.readFileSync(`${root}/promotion.ts`, 'utf8');
const integration = fs.readFileSync('src/platform/entity-promotion.ts', 'utf8');
const statusRoute = fs.readFileSync('src/routes/api.platform-core-status.ts', 'utf8');
const dispositionApi = fs.readFileSync('src/routes/api.content-disposition.ts', 'utf8');

if (upstream.package !== '@keeptxred/texas-platform-core' || upstream.repository !== 'keeptxred/texas-common-core') errors.push('Unexpected shared package source.');
if (!/^[0-9a-f]{40}$/.test(upstream.commit)) errors.push('Shared package upstream commit is not pinned to a full SHA.');
if (upstream.version !== '0.3.0' || upstream.apiVersion !== '1.1') errors.push('TexasDefined is not pinned to the Phase 5 core release.');
if (consumer.consumer !== 'TexasDefined' || consumer.repository !== 'keeptxred/TexasDefined') errors.push('Unexpected consumer identity.');
if (consumer.coreCommit !== upstream.commit || consumer.packageVersion !== upstream.version || consumer.apiVersion !== upstream.apiVersion) errors.push('Consumer and upstream release pins differ.');
if (!contract.includes(`packageVersion: '${upstream.version}'`) || !contract.includes(`apiVersion: '${upstream.apiVersion}'`)) errors.push('Vendored contract differs from upstream metadata.');
for (const file of ['contract.ts','content-intelligence.ts','entities.ts','fingerprint.ts','promotion.ts','index.ts']) if (!upstream.files.includes(file)) errors.push(`Upstream manifest does not include ${file}.`);

requireSymbols(contract, ['PLATFORM_CORE_CONTRACT','content-ownership','duplicate-content-prevention','cross-site-disposition'], 'shared compatibility contract');
requireSymbols(content, ['CONTENT_OWNERSHIP_RULES','decideCrossSiteContent','validateContentOwnershipRules','reject-duplicate','cross-link-only','publish-derivative-with-canonical-reference','fullRepublicationAllowed: false'], 'content ownership engine');
requireSymbols(entities, ['TexasEntityRecord','canonicalizeEntity','cloneEntity'], 'shared entity contracts');
requireSymbols(fingerprint, ['fnv1aFingerprint','fingerprintEntities'], 'shared fingerprints');
requireSymbols(promotion, ['diffEntitySets','quarantineEntity','createPromotionPreview'], 'shared promotion controls');
requireSymbols(integration, ["from '@/shared/platform-core'",'diffEntitySets','fingerprintEntities','sharedQuarantineEntity','validatePromotionApproval'], 'TexasDefined shared-core integration');
requireSymbols(statusRoute, ["createFileRoute('/api/platform-core-status')",'validateConsumerManifest','status: healthy ? 200 : 503','no-store','noindex, nofollow'], 'platform core status API');
requireSymbols(dispositionApi, ["createFileRoute('/api/content-disposition')","targetSite: 'TexasDefined'",'preview-only','decideCrossSiteContent','validateContentOwnershipRules','100_000','no-store','noindex, nofollow'], 'TexasDefined disposition API');
for (const capability of ['entity-contracts','entity-canonicalization','deterministic-fingerprints','entity-set-diffs','baseline-quarantine','promotion-previews','content-ownership','duplicate-content-prevention','cross-site-disposition']) if (!consumer.capabilities.includes(capability)) errors.push(`TexasDefined consumer capability missing: ${capability}`);
for (const domain of ['branding','routes','supabase','deployment']) if (!consumer.excludedDomains.includes(domain)) errors.push(`TexasDefined excluded domain missing: ${domain}`);
if (dispositionApi.includes('writeFile') || dispositionApi.includes('publish: true')) errors.push('Disposition API contains write or publication behavior.');

const forbidden = ['react','@tanstack','@supabase','texasdefined.com','keeptxred.com','import.meta.env','process.env'];
for (const path of [`${root}/content-intelligence.ts`,`${root}/entities.ts`,`${root}/fingerprint.ts`,`${root}/promotion.ts`]) {
  const source = fs.readFileSync(path, 'utf8').toLowerCase();
  for (const token of forbidden) if (source.includes(token.toLowerCase())) errors.push(`${path} contains forbidden site/framework dependency: ${token}`);
}
if (errors.length) fail();
console.log(`Shared platform core ${upstream.version} API ${upstream.apiVersion} and TexasDefined Phase 5 content controls are compatible, observable, and protected.`);
function requireSymbols(source, symbols, area) { for (const symbol of symbols) if (!source.includes(symbol)) errors.push(`${area} missing: ${symbol}`); }
function fail() { console.error('Shared platform core validation failed:'); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
