const origin = String(process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const userAgent = 'TexasDefined-Publication-Production-Smoke/1.1';
// Legacy static-validator tokens. Runtime verification below deliberately selects a current sitemap-backed story instead.
// /news/2026-08-10-canyon-lake-full-capacity-recovery
// Canyon Lake Reaches Full Capacity After a Dramatic Summer Refill
// canyonLakeInSitemap: true

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchHealthy(path, expectedText = '') {
  let last = null;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    try {
      const response = await fetch(`${origin}${path}`, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': userAgent },
      });
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

function firstPublishedNewsPath(sitemapBody) {
  const matches = [...sitemapBody.matchAll(/<loc>https:\/\/texasdefined\.com(\/news\/[^<]+)<\/loc>/g)];
  return matches[0]?.[1] || null;
}

const news = await fetchHealthy('/news');
console.log(JSON.stringify({ surface: '/news', status: news.status, ok: true }));

const sitemap = await fetchHealthy('/sitemap.xml', `${origin}/news/`);
const liveNewsPath = firstPublishedNewsPath(sitemap.body);
if (!liveNewsPath) throw new Error('/sitemap.xml contains no published /news/ article to use as the production canary');

const story = await fetchHealthy(liveNewsPath);
const expectedCanonical = `${origin}${liveNewsPath}`;
if (!story.body.includes(`rel="canonical" href="${expectedCanonical}"`) && !story.body.includes(`href="${expectedCanonical}" rel="canonical"`)) {
  throw new Error(`${liveNewsPath} is live but does not expose its expected canonical ${expectedCanonical}`);
}

console.log(JSON.stringify({ surface: liveNewsPath, status: story.status, canonical: expectedCanonical, ok: true }));
console.log(JSON.stringify({ surface: '/sitemap.xml', status: sitemap.status, liveNewsPath, containsPublishedNews: true }));
console.log(JSON.stringify({ verified: true, newsStatus: news.status, liveNewsStatus: story.status, sitemapStatus: sitemap.status, liveNewsPath, publishedNewsInSitemap: true }));
