import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const webmasterToken = '74E5E79AEC351CF6D2577A6FC6A125DF';
const indexNowKey = '0c2b08423ce5be707dd931f57239acf1';
const canonicalOrigin = 'https://texasdefined.com';
const sitemapUrls = [
  `${canonicalOrigin}/sitemap.xml`,
  `${canonicalOrigin}/sitemap-explore.xml`,
];
const errors = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing required Bing configuration file: ${relativePath}`);
    return '';
  }
  return fs.readFileSync(fullPath, 'utf8');
}

function requireText(source, text, message) {
  if (!source.includes(text)) errors.push(message);
}

function requirePattern(source, pattern, message) {
  if (!pattern.test(source)) errors.push(message);
}

function hasQuotedAssignment(source, variable, value) {
  return source.includes(`const ${variable} = '${value}'`) || source.includes(`const ${variable} = "${value}"`);
}

const robots = read('public/robots.txt');
const server = read('src/server.ts');
const indexNowScript = read('scripts/seo/submit-indexnow.mjs');
const indexNowWorkflow = read('.github/workflows/bing-indexnow.yml');
const productionWorkflow = read('.github/workflows/deploy-production.yml');
const keyFile = read(`public/${indexNowKey}.txt`);

requirePattern(
  robots,
  /User-agent:\s*Bingbot\s*[\r\n]+Allow:\s*\//i,
  'robots.txt must explicitly allow Bingbot.',
);
for (const sitemap of sitemapUrls) {
  requireText(robots, `Sitemap: ${sitemap}`, `robots.txt must advertise ${sitemap}.`);
}

requireText(
  server,
  `<meta name="msvalidate.01" content="${webmasterToken}" />`,
  'The production server must preserve the exact Bing Webmaster verification meta tag.',
);
requirePattern(
  server,
  /async function addBingVerificationMeta\(/,
  'The production server must keep the Bing Webmaster HTML injection guard.',
);
requirePattern(
  server,
  /request\.method !== ["']GET["'] \|\| url\.pathname !== ["']\/["']/,
  'Bing Webmaster verification injection must remain scoped to GET requests for the canonical homepage.',
);
requirePattern(
  server,
  /contentType\.includes\(["']text\/html["']\)/,
  'Bing Webmaster verification injection must remain restricted to HTML responses.',
);
requirePattern(
  server,
  /return await addBingVerificationMeta\(request, normalizedResponse\)/,
  'The server fetch pipeline must apply Bing verification to the normalized production response.',
);

if (keyFile.trim() !== indexNowKey) {
  errors.push('The public IndexNow key file must contain exactly the configured key.');
}

if (!hasQuotedAssignment(indexNowScript, 'origin', canonicalOrigin)) {
  errors.push('IndexNow submitter must use the canonical TexasDefined origin.');
}
if (!hasQuotedAssignment(indexNowScript, 'key', indexNowKey)) {
  errors.push('IndexNow submitter must use the published ownership key.');
}
for (const expected of [
  'https://api.indexnow.org/indexnow',
  '/sitemap.xml',
  '/sitemap-explore.xml',
  '[200, 202]',
  '10_000',
  "process.env.PUBLIC_INDEXING_ENABLED === 'true'",
  'IndexNow submission skipped: PUBLIC_INDEXING_ENABLED is not explicitly true. No URLs were submitted.',
]) {
  requireText(indexNowScript, expected, `IndexNow submitter is missing required contract: ${expected}`);
}

for (const expected of [
  'workflow_dispatch:',
  'Verify Bing Webmaster meta tag is live',
  webmasterToken,
  'node scripts/seo/submit-indexnow.mjs',
  'environment: texasdefined-publication',
]) {
  requireText(indexNowWorkflow, expected, `Bing IndexNow workflow is missing required contract: ${expected}`);
}

const approvalVariableContract = 'PUBLIC_INDEXING_ENABLED: ${{ vars.PUBLIC_INDEXING_ENABLED }}';
requireText(
  indexNowWorkflow,
  approvalVariableContract,
  'Bing IndexNow workflow must expose vars.PUBLIC_INDEXING_ENABLED to the guarded submitter.',
);
requireText(
  productionWorkflow,
  approvalVariableContract,
  'Production deployment workflow must expose vars.PUBLIC_INDEXING_ENABLED to the guarded IndexNow step.',
);

if (/^\s*push:\s*$/m.test(indexNowWorkflow)) {
  errors.push('Bing IndexNow workflow must remain manual-only and must not have a push trigger.');
}
if (/\bnpx\s+wrangler\s+deploy\b/.test(indexNowWorkflow)) {
  errors.push('Bing IndexNow workflow must not duplicate the production Cloudflare deployment.');
}
if (!indexNowWorkflow.includes('manual-only') || !indexNowWorkflow.includes('PUBLIC_INDEXING_ENABLED=true')) {
  errors.push('Bing IndexNow workflow summary must document the manual-only and explicit public-indexing approval safeguards.');
}

if (errors.length) {
  console.error('TexasDefined Bing configuration validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Bing Webmaster verification, Bingbot access, canonical sitemaps, IndexNow keying, manual-only execution, explicit public-indexing approval wiring, and URL submission contracts are protected without duplicating the production deployment.');