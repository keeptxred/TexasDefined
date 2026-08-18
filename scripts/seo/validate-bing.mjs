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

const robots = read('public/robots.txt');
const server = read('src/server.ts');
const indexNowScript = read('scripts/seo/submit-indexnow.mjs');
const indexNowWorkflow = read('.github/workflows/bing-indexnow.yml');
const keyFile = read(`public/${indexNowKey}.txt`);

if (!/User-agent:\s*Bingbot[\s\S]*?Allow:\s*\//i.test(robots)) {
  errors.push('robots.txt must explicitly allow Bingbot.');
}
for (const sitemap of sitemapUrls) {
  requireText(robots, `Sitemap: ${sitemap}`, `robots.txt must advertise ${sitemap}.`);
}

requireText(
  server,
  `<meta name="msvalidate.01" content="${webmasterToken}" />`,
  'The production server must preserve the exact Bing Webmaster verification meta tag.',
);
requireText(
  server,
  'ensureBingWebmasterVerification',
  'The production server must keep the Bing Webmaster HTML injection guard.',
);
requireText(
  server,
  'url.pathname !== "/"',
  'Bing Webmaster verification injection must remain scoped to the canonical homepage.',
);
requireText(
  server,
  'content-type',
  'Bing Webmaster verification injection must remain restricted to HTML responses.',
);

if (keyFile.trim() !== indexNowKey) {
  errors.push('The public IndexNow key file must contain exactly the configured key.');
}

for (const expected of [
  `const origin = "${canonicalOrigin}"`,
  `const key = "${indexNowKey}"`,
  'https://api.indexnow.org/indexnow',
  '/sitemap.xml',
  '/sitemap-explore.xml',
  '[200, 202]',
]) {
  requireText(indexNowScript, expected, `IndexNow submitter is missing required contract: ${expected}`);
}

for (const expected of [
  'npx wrangler deploy',
  'Verify Bing Webmaster meta tag is live',
  webmasterToken,
  'node scripts/seo/submit-indexnow.mjs',
  "'src/server.ts'",
]) {
  requireText(indexNowWorkflow, expected, `Bing IndexNow workflow is missing required contract: ${expected}`);
}

if (errors.length) {
  console.error('TexasDefined Bing configuration validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Bing Webmaster verification, Bingbot access, canonical sitemaps, IndexNow keying, deployment verification, and URL submission contracts are protected.');
