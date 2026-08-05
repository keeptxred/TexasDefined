import fs from 'node:fs';

const errors = [];
const root = 'src/shared/platform-core';
const required = [
  `${root}/contract.ts`, `${root}/content-intelligence.ts`, `${root}/publication-gate.ts`, `${root}/governance-events.ts`,
  `${root}/entities.ts`, `${root}/fingerprint.ts`, `${root}/promotion.ts`, `${root}/index.ts`,
  `${root}/upstream.json`, `${root}/consumer.json`,
  'src/platform/entity-promotion.ts', 'src/routes/api.platform-core-status.ts',
  'src/routes/api.content-disposition.ts', 'src/routes/api.publication-gate.ts',
];
for (const path of required) if (!fs.existsSync(path)) errors.push(`Missing shared platform integration file: ${path}`);
if (errors.length) fail();
const upstream = JSON.parse(fs.readFileSync(`${root}/upstream.json`, 'utf8'));
const consumer = JSON.parse(fs.readFileSync(`${root}/consumer.json`, 'utf8'));
const contract = fs.readFileSync(`${root}/contract.ts`, 'utf8');
const content = fs.readFileSync(`${root}/content-intelligence.ts`, 'utf8');
const gate = fs.readFileSync(`${root}/publication-gate.ts`, 'utf8');
const governance = fs.readFileSync(`${root}/governance-events.ts`, 'utf8');
const gateApi = fs.readFileSync('src/routes/api.publication-gate.ts', 'utf8');

if (upstream.package !== '@keeptxred/texas-platform-core' || upstream.repository !== 'keeptxred/texas-common-core') errors.push('Unexpected shared package source.');
if (upstream.commit !== '1611863809cedf1901d2bbf7833db2bc6c503424') errors.push('TexasDefined is not pinned to the governed platform-core release.');
if (upstream.version !== '0.5.0' || upstream.apiVersion !== '1.3') errors.push('TexasDefined is not on core 0.5.0/API 1.3.');
if (consumer.coreCommit !== upstream.commit || consumer.packageVersion !== upstream.version || consumer.apiVersion !== upstream.apiVersion) errors.push('Consumer and upstream release pins differ.');
for (const file of ['contract.ts','content-intelligence.ts','publication-gate.ts','governance-events.ts','entities.ts','fingerprint.ts','promotion.ts','index.ts']) if (!upstream.files.includes(file)) errors.push(`Upstream manifest missing ${file}.`);
for (const capability of ['content-ownership','duplicate-content-prevention','cross-site-disposition','publication-gates','reviewed-overrides','governance-events','governance-analytics','ownership-drift-detection']) if (!consumer.capabilities.includes(capability) || !contract.includes(`'${capability}'`)) errors.push(`Publication capability missing: ${capability}`);
requireSymbols(content, ['decideCrossSiteContent','reject-duplicate','cross-link-only','publish-derivative-with-canonical-reference'], 'content engine');
requireSymbols(gate, ['fingerprintContentDecision','createPublicationOverride','validatePublicationOverride','enforcePublicationDecision','override-required','Override is expired','at least 20 characters'], 'publication gate');
requireSymbols(governance, ['GovernanceEvent','recordGovernanceEvent','governanceAnalytics','ownershipDrift'], 'governance events');
requireSymbols(gateApi, ["createFileRoute('/api/publication-gate')","targetSite: 'TexasDefined'",'enforcePublicationDecision','enforcement-preview','gate.publishable ? 200 : 409','100_000','no-store','noindex, nofollow'], 'publication gate API');
if (gateApi.includes('writeFile') || gateApi.includes('publish: true')) errors.push('Publication gate API contains direct write behavior.');
if (errors.length) fail();
console.log(`TexasDefined platform core ${upstream.version}/${upstream.apiVersion} publication gates, governance events, analytics, and reviewed overrides are protected.`);
function requireSymbols(source, symbols, area) { for (const symbol of symbols) if (!source.includes(symbol)) errors.push(`${area} missing: ${symbol}`); }
function fail() { console.error('Shared platform core validation failed:'); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
