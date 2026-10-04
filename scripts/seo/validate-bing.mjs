import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const webmasterToken = '74E5E79AEC351CF6D2577A6FC6A125DF';
const indexNowKey = '0c2b08423ce5be707dd931f57239acf1';
const canonicalOrigin = 'https://texasdefined.com';
const errors = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing required search-distribution file: ${relativePath}`);
    return '';
  }
  return fs.readFileSync(fullPath, 'utf8');
}
function requireText(source, text, message) { if (!source.includes(text)) errors.push(message); }
function requirePattern(source, pattern, message) { if (!pattern.test(source)) errors.push(message); }

const robots = read('public/robots.txt');
const server = read('src/server.ts');
const submitter = read('scripts/seo/submit-indexnow.mjs');
const library = read('scripts/seo/indexnow-lib.mjs');
const workflow = read('.github/workflows/bing-indexnow.yml');
const productionWorkflow = read('.github/workflows/deploy-production.yml');
const keyFile = read(`public/${indexNowKey}.txt`).trim();

for (const agent of ['Googlebot', 'Bingbot', 'Applebot', 'DuckDuckBot', 'OAI-SearchBot', 'GPTBot']) {
  requireText(robots, `User-agent: ${agent}`, `robots.txt must state an explicit policy for ${agent}.`);
}
requireText(robots, '# Training/extended-use crawler policy is separate from search discovery.', 'robots.txt must keep search-discovery and training policies separate.');
for (const sitemap of ['sitemap.xml', 'sitemap-explore.xml', 'sitemap-texas-icons.xml']) {
  requireText(robots, `Sitemap: ${canonicalOrigin}/${sitemap}`, `robots.txt must advertise ${sitemap}.`);
}

requireText(server, `<meta name="msvalidate.01" content="${webmasterToken}" />`, 'The production server must preserve the exact Bing Webmaster verification meta tag.');
requirePattern(server, /async function addBingVerificationMeta\(/, 'The production server must keep the Bing Webmaster HTML injection guard.');
requirePattern(server, /contentType\.includes\(["']text\/html["']\)/, 'Bing verification injection must remain restricted to HTML responses.');

if (keyFile !== indexNowKey) errors.push('The public IndexNow ownership file must contain exactly the configured key.');
for (const expected of [
  canonicalOrigin,
  indexNowKey,
  'INDEXNOW_URLS',
  'INDEXNOW_FULL',
  'INDEXNOW_FRESHNESS_HOURS',
  "PUBLIC_INDEXING_ENABLED === 'false'",
  'cosmetic deployment produced no notification',
  'submitIndexNowSafely',
  'verifyIndexNowKey',
]) requireText(submitter, expected, `IndexNow submitter is missing required contract: ${expected}`);

for (const expected of [
  'https://api.indexnow.org/indexnow',
  'DEFAULT_BATCH_SIZE = 1000',
  'HARD_MAX_BATCH_SIZE = 10_000',
  'utm_.+',
  'normalizeIndexNowUrl',
  'selectMeaningfulUrls',
  'allowTransition = true',
  'IndexNow notification failed without blocking publication.',
]) requireText(library, expected, `Reusable IndexNow library is missing required contract: ${expected}`);

for (const expected of [
  'workflow_dispatch:',
  'schedule:',
  'cron: "23 * * * *"',
  'urls:',
  'INDEXNOW_URLS:',
  'INDEXNOW_FRESHNESS_HOURS:',
  'Verify Bing Webmaster meta tag is live',
  webmasterToken,
  'node scripts/seo/submit-indexnow.mjs',
  'environment: texasdefined-publication',
]) requireText(workflow, expected, `IndexNow workflow is missing required contract: ${expected}`);

const killSwitch = 'PUBLIC_INDEXING_ENABLED: ${{ vars.PUBLIC_INDEXING_ENABLED }}';
requireText(workflow, killSwitch, 'Scheduled IndexNow workflow must preserve the emergency public-indexing kill switch.');
requireText(productionWorkflow, killSwitch, 'Production deployment workflow must preserve the emergency public-indexing kill switch.');
if (/^\s*push:\s*$/m.test(workflow)) errors.push('IndexNow workflow must not submit from an undeployed push.');
if (/\bnpx\s+wrangler\s+deploy\b/.test(workflow)) errors.push('IndexNow workflow must not duplicate the Cloudflare deployment.');

if (errors.length) {
  console.error('TexasDefined search distribution validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('TexasDefined explicit crawler policy, separate training controls, canonical sitemap discovery, reusable IndexNow lifecycle support, hourly meaningful-change distribution, and publication-failure isolation are protected.');
