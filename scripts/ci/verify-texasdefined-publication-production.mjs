const origin = String(process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const canyonPath = '/news/2026-08-10-canyon-lake-full-capacity-recovery';
const canyonUrl = `${origin}${canyonPath}`;
const canyonTitle = 'Canyon Lake Reaches Full Capacity After a Dramatic Summer Refill';
const userAgent = 'TexasDefined-Publication-Production-Smoke/1.0';

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

const news = await fetchHealthy('/news');
console.log(JSON.stringify({ surface: '/news', status: news.status, ok: true }));

const canyon = await fetchHealthy(canyonPath, canyonTitle);
console.log(JSON.stringify({ surface: canyonPath, status: canyon.status, ok: true }));

const sitemap = await fetchHealthy('/sitemap.xml', canyonUrl);
console.log(JSON.stringify({ surface: '/sitemap.xml', status: sitemap.status, containsCanyonLakeArticle: true }));

console.log(JSON.stringify({
  verified: true,
  newsStatus: news.status,
  canyonLakeStatus: canyon.status,
  sitemapStatus: sitemap.status,
  canyonLakeInSitemap: true,
}));
