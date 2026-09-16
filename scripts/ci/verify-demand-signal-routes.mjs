const origin = (process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com').replace(/\/$/, '');
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();

const routes = [
  {
    label: 'westcave-preserve',
    path: '/destination/westcave-preserve',
    required: ['Westcave Preserve'],
    canonical: `${origin}/destination/westcave-preserve`,
  },
  {
    label: 'motorsports-collection',
    path: '/sports-venues/motorsports',
    required: [
      'Texas racetracks and motorsports destinations',
      'Circuit of The Americas',
      'Texas Motor Speedway',
    ],
    canonical: `${origin}/sports-venues/motorsports`,
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function canonicalPresent(html, canonical) {
  const escaped = escapeRegex(canonical);
  return new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']${escaped}["']`, 'i').test(html)
    || new RegExp(`<link[^>]+href=["']${escaped}["'][^>]+rel=["']canonical["']`, 'i').test(html);
}

function noindexPresent(html) {
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)
    || /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(html);
}

async function verifyRoute(route) {
  let lastStatus = 'network-error';
  let lastBody = '';
  let lastError = '';

  for (let attempt = 1; attempt <= 18; attempt += 1) {
    const separator = route.path.includes('?') ? '&' : '?';
    const url = `${origin}${route.path}${separator}verify=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
    console.log(`[${route.label}] attempt ${attempt}: ${url}`);

    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-Demand-Signal-Route-Integrity/1.0' },
      });
      lastStatus = String(response.status);
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      lastBody = await response.text();
      lastError = '';

      const complete = response.status === 200
        && !challenged
        && route.required.every((needle) => lastBody.includes(needle))
        && canonicalPresent(lastBody, route.canonical)
        && !noindexPresent(lastBody);

      if (complete) {
        console.log(`[${route.label}] verified HTTP 200, canonical, indexability, and required content.`);
        return;
      }

      const missing = route.required.filter((needle) => !lastBody.includes(needle));
      console.log(challenged
        ? `[${route.label}] Cloudflare challenge; waiting for production.`
        : `[${route.label}] HTTP ${response.status}; missing=${missing.join(' | ') || 'none'}; canonical=${canonicalPresent(lastBody, route.canonical)}; noindex=${noindexPresent(lastBody)}; waiting for production.`);
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      console.log(`[${route.label}] request failed: ${lastError}`);
    }

    if (attempt < 18) await sleep(10_000);
  }

  throw new Error(`${route.label} failed after 18 attempts: ${lastError || `HTTP ${lastStatus}`} ${lastBody.slice(0, 1200).replace(/\s+/g, ' ')}`);
}

for (const route of routes) await verifyRoute(route);

console.log(`TexasDefined demand-signal route integrity passed for ${routes.length} routes.`);
