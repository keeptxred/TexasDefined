import fs from 'node:fs';

const errors = [];
const root = 'src/shared/platform-core';
const required = [
  `${root}/contract.ts`, `${root}/content-intelligence.ts`, `${root}/publication-gate.ts`,
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
const gateApi = fs.readFileSync('src/routes/api.publication-gate.ts', 'utf8');

if (upstream.package !== '@keeptxred/texas-platform-core' || upstream.repository !== 'keeptxred/texas-common-core') errors.push('Unexpected shared package source.');
if (upstream.commit !== 'd1be8d321b312cd3349807eed61edf8cc917d0df') errors.push('TexasDefined is not pinned to the governed publication-gate release.');
if (upstream.version !== '0.4.0' || upstream.apiVersion !== '1.2') errors.push('TexasDefined is not on core 0.4.0/API 1.2.');
if (consumer.coreCommit !== upstream.commit || consumer.packageVersion !== upstream.version || consumer.apiVersion !== upstream.apiVersion) errors.push('Consumer and upstream release pins differ.');
for (const file of ['contract.ts','content-intelligence.ts','publication-gate.ts','entities.ts','fingerprint.ts','promotion.ts','index.ts']) if (!upstream.files.includes(file)) errors.push(`Upstream manifest missing ${file}.`);
for (const capability of ['content-ownership','duplicate-content-prevention','cross-site-disposition','publication-gates','reviewed-overrides']) if (!consumer.capabilities.includes(capability) || !contract.includes(`'${capability}'`)) errors.push(`Publication capability missing: ${capability}`);
requireSymbols(content, ['decideCrossSiteContent','reject-duplicate','cross-link-only','publish-derivative-with-canonical-reference'], 'content engine');
requireSymbols(gate, ['fingerprintContentDecision','createPublicationOverride','validatePublicationOverride','enforcePublicationDecision','override-required','Override is expired','at least 20 characters'], 'publication gate');
requireSymbols(gateApi, ["createFileRoute('/api/publication-gate')","targetSite: 'TexasDefined'",'enforcePublicationDecision','enforcement-preview','gate.publishable ? 200 : 409','100_000','no-store','noindex, nofollow'], 'publication gate API');
if (gateApi.includes('writeFile') || gateApi.includes('publish: true')) errors.push('Publication gate API contains direct write behavior.');
if (errors.length) fail();
console.log(`TexasDefined platform core ${upstream.version}/${upstream.apiVersion} publication gates and reviewed overrides are protected.`);
function requireSymbols(source, symbols, area) { for (const symbol of symbols) if (!source.includes(symbol)) errors.push(`${area} missing: ${symbol}`); }
function fail() { console.error('Shared platform core validation failed:'); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
