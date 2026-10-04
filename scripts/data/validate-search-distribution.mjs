import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const key = '0c2b08423ce5be707dd931f57239acf1';
const errors = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing required search-distribution file: ${relativePath}`);
    return '';
  }
  return fs.readFileSync(fullPath, 'utf8');
}

function requireText(source, text, message) {
  if (!source.includes(text)) errors.push(message);
}

const robots = read('public/robots.txt');
const submitter = read('scripts/seo/submit-indexnow.mjs');
const library = read('scripts/seo/indexnow-lib.mjs');
const workflow = read('.github/workflows/bing-indexnow.yml');
const productionVerifier = read('scripts/seo/verify-search-production.mjs');
const keyFile = read(`public/${key}.txt`).trim();

if (keyFile !== key) errors.push('IndexNow ownership key file must exactly match the configured key.');

for (const expected of [
  'User-agent: Googlebot',
  'User-agent: Bingbot',
  'User-agent: Applebot',
  'User-agent: DuckDuckBot',
  'User-agent: OAI-SearchBot',
  'User-agent: GPTBot',
  '# Training/extended-use crawler policy is separate from search discovery.',
  'Sitemap: https://texasdefined.com/sitemap.xml',
  'Sitemap: https://texasdefined.com/sitemap-explore.xml',
  'Sitemap: https://texasdefined.com/sitemap-texas-icons.xml',
]) requireText(robots, expected, `robots.txt is missing required search policy: ${expected}`);

for (const expected of [
  "const origin = 'https://texasdefined.com';",
  `const key = '${key}';`,
  'INDEXNOW_URLS',
  'INDEXNOW_FULL',
  'INDEXNOW_FRESHNESS_HOURS',
  "process.env.PUBLIC_INDEXING_ENABLED === 'false'",
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
  'schedule:',
  'cron: "23 * * * *"',
  'workflow_dispatch:',
  'urls:',
  'INDEXNOW_URLS:',
  'INDEXNOW_FRESHNESS_HOURS:',
  'PUBLIC_INDEXING_ENABLED: ${{ vars.PUBLIC_INDEXING_ENABLED }}',
  'node scripts/seo/verify-search-production.mjs',
  'node scripts/seo/submit-indexnow.mjs',
]) requireText(workflow, expected, `IndexNow workflow is missing required contract: ${expected}`);

for (const expected of [
  'Googlebot/2.1',
  'bingbot/2.0',
  'Applebot/0.1',
  'DuckDuckBot/1.0',
  'OAI-SearchBot/1.0',
  'Public IndexNow key verification failed.',
  'canonical mismatch',
  'SITEMAPS',
  'CSS',
  'JavaScript',
  'Image',
]) requireText(productionVerifier, expected, `Production search verifier is missing required contract: ${expected}`);

if (/^\s*push:\s*$/m.test(workflow)) errors.push('IndexNow workflow must not submit directly from an undeployed push.');
if (/\bnpx\s+wrangler\s+deploy\b/.test(workflow)) errors.push('IndexNow workflow must not duplicate production deployment.');

if (errors.length) {
  console.error('TexasDefined search distribution validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('TexasDefined search distribution safeguards are protected: canonical-only IndexNow, meaningful-change scheduling, URL lifecycle support, public crawler verification, explicit OAI-SearchBot access, and separate training policy.');
