const origin = process.env.GSC_MANUAL_NEXT_PRODUCTION_ORIGIN || 'https://texasdefined.com';
const revision = process.env.GITHUB_SHA || 'local';
const runId = process.env.GITHUB_RUN_ID || Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const priorityPaths = [
  '/property-tax-calculator/bexar-county',
  '/property-tax-calculator/fort-bend-county',
  '/property-tax-calculator/montgomery-county',
  '/property-tax-calculator/williamson-county',
  '/property-tax-calculator/hidalgo-county',
  '/texas-mortgage-calculator/houston',
  '/texas-home-affordability-calculator/houston',
  '/texas-home-insurance-calculator/houston',
  '/destination/fredericksburg',
  '/destination/garner-state-park',
];

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function liveUrl(path, attempt) {
  const url = new URL(path, origin);
  url.searchParams.set('td_gsc_manual_next_verify', `${revision}-${runId}-${attempt}`);
  return url;
}

async function fetchLive(path) {
  let lastError;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const url = liveUrl(path, attempt);
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: {
          'cache-control': 'no-cache',
          'user-agent': 'TexasDefined-CI-GSC-Manual-Next/1.0',
        },
      });
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      const body = await response.text();
      if (!challenged && response.ok) return { body, response };
      lastError = new Error(
        challenged
          ? `${url.pathname} returned a Cloudflare challenge.`
          : `${url.pathname} returned HTTP ${response.status}.`,
      );
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
    if (attempt < 6) await sleep(5_000);
  }
  throw lastError || new Error(`${path} failed production verification.`);
}

function canonicalHref(html) {
  const match = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']|<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i,
  );
  return match?.[1] || match?.[2] || null;
}

function hasMetaNoindex(html) {
  return /<meta[^>]+(?:name=["'](?:robots|googlebot|googlebot-news)["'][^>]+content=["'][^"']*\bnoindex\b|content=["'][^"']*\bnoindex\b[^>]+name=["'](?:robots|googlebot|googlebot-news)["'])/i.test(html);
}

for (const path of priorityPaths) {
  const { body, response } = await fetchLive(path);
  const expected = new URL(path, origin);
  const finalUrl = new URL(response.url);

  requireCondition(
    finalUrl.origin === expected.origin && finalUrl.pathname.replace(/\/+$/, '') === expected.pathname.replace(/\/+$/, ''),
    `${path} redirected away from its priority URL to ${finalUrl.pathname}.`,
  );

  requireCondition(!hasMetaNoindex(body), `${path} is noindex in production.`);
  const xRobotsTag = response.headers.get('x-robots-tag') || '';
  requireCondition(!/\bnoindex\b/i.test(xRobotsTag), `${path} is blocked by X-Robots-Tag: ${xRobotsTag}`);

  const href = canonicalHref(body);
  requireCondition(Boolean(href), `${path} is missing a canonical URL.`);
  const canonical = new URL(href, origin);
  requireCondition(
    canonical.origin === expected.origin && canonical.pathname.replace(/\/+$/, '') === expected.pathname.replace(/\/+$/, ''),
    `${path} is not self-canonical; found ${canonical.href}.`,
  );
}

console.log(
  `GSC manual-next production verification passed: ${priorityPaths.length} priority URLs are live, indexable, non-redirecting and self-canonical.`,
);
