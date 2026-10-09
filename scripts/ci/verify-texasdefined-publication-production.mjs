const origin = String(process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const userAgent = 'TexasDefined-Publication-Production-Smoke/1.3';
const verifyToken = [process.env.GITHUB_SHA || 'local', process.env.GITHUB_RUN_ID || 'run', process.env.GITHUB_RUN_ATTEMPT || 'attempt', Date.now()].join('-');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function fetchHealthy(path, expectedText = '') {
  let last = null;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    try {
      const response = await fetch(`${origin}${path}${path.includes('?') ? '&' : '?'}td_verify=${encodeURIComponent(verifyToken)}-${attempt}`, { redirect: 'follow', cache: 'no-store', signal: AbortSignal.timeout(30_000), headers: { 'user-agent': userAgent } });
      const body = await response.text();
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      last = { status: response.status, challenged, body };
      if (!challenged && response.ok && (!expectedText || body.includes(expectedText))) return last;
    } catch (error) {
      last = { status: 'network-error', challenged: false, body: '', error: error instanceof Error ? error.message : String(error) };
    }
    if (attempt < 6) await sleep(5_000);
  }
  const reason = last?.error || (last?.challenged ? 'Cloudflare challenge' : `HTTP ${last?.status}`) || 'unknown failure';
  throw new Error(`${path} failed production verification: ${reason}${expectedText ? `; expected text: ${expectedText}` : ''}`);
}
function firstPublishedNewsPath(newsBody) {
  const matches = [...newsBody.matchAll(/href=["'](\/news\/[^"'?#]+)["']/g)].map((match) => match[1]).filter((path) => path && path !== '/news/');
  return [...new Set(matches)][0] || null;
}

const news = await fetchHealthy('/news');
console.log(JSON.stringify({ surface: '/news', status: news.status, ok: true }));

// Confirm production serves an actual XML sitemap even when publication is
// disabled or no individual published news item is currently routed.
const sitemap = await fetchHealthy('/sitemap.xml');
if (!/<(?:sitemapindex|urlset)(?:\s|>)/i.test(sitemap.body)) {
  throw new Error('/sitemap.xml returned a successful HTTP status without a valid sitemap root');
}
console.log(JSON.stringify({ surface: '/sitemap.xml', status: sitemap.status, ok: true }));
// Govern the Texas ecoregions authority page as a production-critical evergreen surface.
const ecoregionsPath = '/article/texas-ecoregions-habitats-guide';
const ecoregions = await fetchHealthy(ecoregionsPath, 'Texas Ecoregions: Complete Map & Guide to All 10 Natural Regions');
for (const expected of [
  '/images/editorial/texas-ecoregions-map.svg',
  '/data/texas-ecoregions.csv',
  'Piney Woods',
  'Gulf Prairies and Marshes',
  'Post Oak Savannah',
  'Blackland Prairie',
  'Cross Timbers',
  'South Texas Plains',
  'Edwards Plateau',
  'Rolling Plains',
  'High Plains',
  'Trans-Pecos',
  'Methodology',
  'Recommended citation',
  'Texas Defined Travel &amp; Outdoors Desk',
  'Travel &amp; outdoors desk',
  'Sources and further reading',
  'Texas Water Development Board',
  'National Park Service',
  'Big Thicket National Preserve',
]) {
  if (!ecoregions.body.includes(expected)) throw new Error(`${ecoregionsPath} is missing expected authority marker: ${expected}`);
}
for (const stale of [
  'Texas Ecoregions Explained: Why the Landscape Changes So Fast',
  'Camping in Texas With Your Dog',
  'Hiking Texas Trails With Your Dog',
  'Texas Dogs at Lakes and Rivers',
  'Food &amp; Culture Desk',
  'More stories to read next',
]) {
  if (ecoregions.body.includes(stale)) throw new Error(`${ecoregionsPath} still exposes stale production content: ${stale}`);
}
const ecoregionsAuthor = await fetchHealthy('/authors/a-dell', 'Texas Defined Travel & Outdoors Desk');
const ecoregionsMap = await fetchHealthy('/images/editorial/texas-ecoregions-map.svg', 'Texas natural regions');
const ecoregionsCsv = await fetchHealthy('/data/texas-ecoregions.csv', 'region,orientation,landscape,signature_vegetation,representative_place');
for (const region of ['Piney Woods','Gulf Prairies and Marshes','Post Oak Savannah','Blackland Prairie','Cross Timbers','South Texas Plains','Edwards Plateau','Rolling Plains','High Plains','Trans-Pecos']) {
  if (!ecoregionsCsv.body.includes(region)) throw new Error(`/data/texas-ecoregions.csv is missing region: ${region}`);
}
console.log(JSON.stringify({ surface: ecoregionsPath, status: ecoregions.status, authorStatus: ecoregionsAuthor.status, mapStatus: ecoregionsMap.status, csvStatus: ecoregionsCsv.status, ok: true }));

const liveNewsPath = firstPublishedNewsPath(news.body);
if (!liveNewsPath) {
  console.log(JSON.stringify({ verified: true, newsStatus: news.status, publishedNewsPresent: false, reason: 'No routed published news is currently exposed; auto-publication remains disabled.' }));
  process.exit(0);
}
const story = await fetchHealthy(liveNewsPath);
const expectedCanonical = `${origin}${liveNewsPath}`;
if (!story.body.includes(expectedCanonical)) throw new Error(`${liveNewsPath} is live but does not expose its expected canonical URL ${expectedCanonical}`);
console.log(JSON.stringify({ surface: liveNewsPath, status: story.status, canonical: expectedCanonical, ok: true }));
console.log(JSON.stringify({ verified: true, newsStatus: news.status, liveNewsStatus: story.status, liveNewsPath, publishedNewsPresent: true }));
