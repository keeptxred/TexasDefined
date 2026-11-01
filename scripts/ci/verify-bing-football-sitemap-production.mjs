import assert from 'node:assert/strict';
import manifest from '../../src/data/high-school-football/google-index-eligibility.generated.json' with { type: 'json' };

// One bounded acceptance check, no browser cohorts and no sitewide crawl.
const origin = 'https://texasdefined.com';
const sitemapPath = '/sitemap-bing-football.xml';
const expectedCount = (1292 - manifest.teamIndexableSlugs.length) +
  (192 - manifest.districtIndexableSlugs.length);
const headers = {
  'user-agent': 'TexasDefined-Bing-Football-Discovery-Verification/1.0',
  'cache-control': 'no-cache',
};
const get = async (path, method = 'GET') => fetch(origin + path, {
  method,
  headers,
  redirect: 'manual',
  signal: AbortSignal.timeout(15_000),
});

const response = await get(sitemapPath);
assert.equal(response.status, 200, 'Bing supplemental football XML must be HTTP 200');
assert.match(response.headers.get('content-type') ?? '', /(?:application|text)\/xml/i);
const workerVersion = response.headers.get('x-texasdefined-worker-version') ?? 'unreported';
const xml = await response.text();
assert.match(xml, /<urlset\s+xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(urls.length, expectedCount, 'Bing supplemental feed must cover every currently staged football detail URL');
assert.equal(new Set(urls).size, urls.length, 'Bing supplemental feed must have unique URLs');
assert(urls.every((url) =>
  /^https:\/\/texasdefined\.com\/texas-high-school-football-(?:teams|districts)\/[a-z0-9-]+$/.test(url)
), 'Bing feed must contain only canonical football detail URLs');
assert(urls.includes(origin + '/texas-high-school-football-teams/colorado-city-colorado'),
  'Known staged football page is missing from Bing supplemental feed');
assert(!urls.includes(origin + '/texas-high-school-football-teams/jarrell'),
  'Protected Google-indexable team must not appear in supplemental feed');
assert(!urls.includes(origin + '/texas-high-school-football-districts/6a-district-7'),
  'Protected Google-indexable district must not appear in supplemental feed');

const head = await get(sitemapPath, 'HEAD');
assert.equal(head.status, 200, 'HEAD must return supplemental XML headers');
assert.match(head.headers.get('content-type') ?? '', /(?:application|text)\/xml/i);
await head.body?.cancel();

const robots = await get('/robots.txt');
assert.equal(robots.status, 200, 'robots.txt must remain available');
const robotsText = await robots.text();
assert.match(robotsText, /User-agent:\s*Bingbot[\s\S]*?Allow:\s*\//i);
assert(!robotsText.includes(sitemapPath), 'Bing-only supplemental must not be globally advertised in robots.txt');
assert(!/Disallow:\s*\/texas-high-school-football/i.test(robotsText));

const index = await get('/sitemap-index.xml');
assert.equal(index.status, 200);
assert(!(await index.text()).includes(sitemapPath),
  'Bing-only supplemental must not be advertised in the Google/main sitemap index');

const primary = await get('/sitemap.xml');
assert.equal(primary.status, 200);
const primaryXml = await primary.text();
assert(!primaryXml.includes(origin + '/texas-high-school-football-teams/colorado-city-colorado'),
  'Google sitemap must continue excluding staged football pages');
assert(primaryXml.includes(origin + '/texas-high-school-football-teams/jarrell'),
  'Google sitemap must retain protected football pages');

const sample = await get('/texas-high-school-football-teams/colorado-city-colorado');
assert.equal(sample.status, 200);
const html = await sample.text();
assert.match(html, /name=["']googlebot["'][^>]*content=["']noindex, follow["']/i,
  'Staged page must still tell Googlebot to noindex');
assert(!/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*\bnoindex/i.test(html),
  'Generic robots noindex must not be added to Bing-visible pages');
assert(!/\bnoindex\b/i.test(sample.headers.get('x-robots-tag') ?? ''),
  'Bing-visible football HTML must not receive generic X-Robots-Tag noindex');
console.log(`PASS: Bing supplemental XML ${urls.length}/${expectedCount} staged URLs, protected Google sitemap, Bing public HTML, worker=${workerVersion}`);
