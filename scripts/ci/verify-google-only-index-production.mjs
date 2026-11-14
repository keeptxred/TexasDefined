import assert from 'node:assert/strict';

// Targeted, bounded post-deployment proof. Never perform a full-site crawl.
const ORIGIN = 'https://texasdefined.com';
const CASES = [
  { path: '/texas-high-school-football-teams/colorado-city-colorado', excluded: true },
  { path: '/texas-high-school-football-teams/jarrell', excluded: false },
  { path: '/texas-high-school-football-districts/6a-district-7', excluded: false },
];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const metaValues = (html, name) => (html.match(/<meta\b[^>]*>/gi) || [])
  .map((tag) => {
    const n = /\bname=(["'])(.*?)\1/i.exec(tag)?.[2]?.toLowerCase();
    const content = /\bcontent=(["'])(.*?)\1/i.exec(tag)?.[2]?.toLowerCase();
    return n === name ? content : null;
  }).filter((v) => v !== null);
async function load(path) {
  const res = await fetch(ORIGIN + path, {
    redirect: 'manual',
    headers: { 'user-agent': 'Mozilla/5.0 (compatible; TexasDefined-SEO-Verification/1.0)', 'cache-control': 'no-cache' },
  });
  assert.equal(res.status, 200, path + ': expected HTTP 200, got ' + res.status);
  const html = await res.text();
  assert(!/cf-chl|just a moment|attention required.*cloudflare/i.test(html), path + ': challenge response instead of content');
  return { html, headers: res.headers };
}
async function verify() {
  for (const test of CASES) {
    const { html, headers } = await load(test.path);
    assert(/<html\b/i.test(html), test.path + ': not rendered HTML');
    const gb = metaValues(html, 'googlebot');
    const general = metaValues(html, 'robots');
    const hasNoindex = (values) => values.some((x) => /(^|[,;\s])noindex($|[,;\s])/.test(x));
    assert.equal(hasNoindex(gb), test.excluded, test.path + ': Googlebot noindex does not match release policy');
    assert(!hasNoindex(general), test.path + ': generic noindex would affect Bing');
    assert(!/\bnoindex\b/i.test(headers.get('x-robots-tag') || ''), test.path + ': generic X-Robots-Tag noindex would affect Bing');
    console.log('Page Googlebot policy OK: ' + test.path + ' excluded=' + test.excluded + ' worker=' + (headers.get('x-texasdefined-worker-version') || 'unreported'));
  }
  const { html: sitemap } = await load('/sitemap.xml');
  assert(/<urlset\b/i.test(sitemap), 'Primary sitemap missing XML urlset');
  for (const test of CASES) {
    const included = sitemap.includes(ORIGIN + test.path);
    assert.equal(included, !test.excluded, test.path + ': sitemap must match Googlebot policy');
  }
  const { html: robots } = await load('/robots.txt');
  assert(/User-agent:\s*Googlebot[\s\S]*?Allow:\s*\//i.test(robots), 'robots.txt must allow Googlebot');
  assert(!/Disallow:\s*\/texas-high-school-football/i.test(robots), 'robots.txt must not block football pages');
  console.log('PASS: Google-only noindex is live; Bing remains indexable; both protected pages present in sitemap, excluded page omitted.');
}
let lastError;
for (let attempt = 1; attempt <= 8; attempt++) {
  try { await verify(); lastError = undefined; break; }
  catch (error) {
    lastError = error;
    console.warn('Attempt ' + attempt + '/8: ' + (error instanceof Error ? error.message : String(error)));
    if (attempt < 8) await sleep(20_000);
  }
}
if (lastError) throw lastError;
