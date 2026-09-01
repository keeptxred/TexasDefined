import { appendFileSync } from 'node:fs';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const userAgent = 'TexasDefined-CI-Route66-Smoke/1.0';

const stops = [
  ['Shamrock', 'shamrock'],
  ['Lela', 'lela'],
  ['McLean', 'mclean'],
  ['Alanreed', 'alanreed'],
  ['Groom', 'groom'],
  ['Conway', 'conway'],
  ['Washburn', 'washburn'],
  ['Amarillo', 'amarillo'],
  ['Bushland', 'bushland'],
  ['Wildorado', 'wildorado'],
  ['Vega', 'vega'],
  ['Adrian', 'adrian'],
  ['Glenrio', 'glenrio'],
];

const routePages = [
  {
    label: 'route66-hub',
    path: '/explore/route-66/texas-road-trip',
    marker: 'Texas Route 66 Road Trip',
    requiredLinks: stops.map(([, slug]) => `/explore/route-66/${slug}`),
  },
  ...stops.map(([name, slug], index) => ({
    label: `route66-${slug}`,
    path: `/explore/route-66/${slug}`,
    marker: `${name} Route 66 Guide`,
    requiredLinks: [
      '/explore/route-66/texas-road-trip',
      ...(index > 0 ? [`/explore/route-66/${stops[index - 1][1]}`] : []),
      ...(index < stops.length - 1 ? [`/explore/route-66/${stops[index + 1][1]}`] : []),
    ],
  })),
];

function appendSummary(text) {
  if (summaryPath) appendFileSync(summaryPath, text);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function hasNoindex(html) {
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)
    || /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(html);
}

async function fetchWithRetries(label, path, validator) {
  let lastStatus = 'network-error';
  let lastReason = 'request did not run';
  let lastChallenge = false;

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
    console.log(`[${label}] attempt ${attempt}: ${url}`);

    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': userAgent },
      });
      const body = await response.text();
      lastStatus = String(response.status);
      lastChallenge = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';

      if (lastChallenge) {
        lastReason = 'Cloudflare returned cf-mitigated: challenge';
      } else if (!response.ok) {
        lastReason = `HTTP ${response.status}`;
      } else {
        const validation = validator(body);
        if (validation.ok) {
          console.log(`[${label}] verified (${response.status})`);
          return { status: response.status, attempts: attempt };
        }
        lastReason = validation.reason;
      }
    } catch (error) {
      lastStatus = 'network-error';
      lastChallenge = false;
      lastReason = error instanceof Error ? error.message : String(error);
    }

    console.log(`[${label}] not healthy yet: ${lastReason}`);
    if (attempt < 6) await sleep(5_000);
  }

  throw new Error(`${label} failed after 6 attempts — ${lastStatus}; ${lastReason}${lastChallenge ? '; Cloudflare challenge' : ''}`);
}

appendSummary('## Texas Route 66 production verification\n\n');
appendSummary('| Surface | Result |\n|---|---|\n');

for (const page of routePages) {
  const canonical = `${origin}${page.path}`;
  try {
    await fetchWithRetries(page.label, page.path, (html) => {
      if (!html.includes(page.marker)) return { ok: false, reason: `missing marker: ${page.marker}` };
      if (!html.includes(canonical)) return { ok: false, reason: `missing canonical URL: ${canonical}` };
      if (hasNoindex(html)) return { ok: false, reason: 'page is marked noindex' };
      const missingLink = page.requiredLinks.find((link) => !html.includes(link));
      if (missingLink) return { ok: false, reason: `missing required internal link: ${missingLink}` };
      return { ok: true };
    });
    appendSummary(`| ${page.label} | ✅ pass |\n`);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    appendSummary(`| ${page.label} | ❌ FAIL — ${reason} |\n`);
    console.error(`::error title=ROUTE 66 LIVE PRODUCTION failure::${reason}`);
    process.exit(1);
  }
}

const sitemapPath = '/sitemap-explore.xml';
try {
  await fetchWithRetries('route66-explore-sitemap', sitemapPath, (xml) => {
    if (!xml.includes('<urlset')) return { ok: false, reason: 'Explore sitemap is not a URL set' };
    const missing = routePages
      .map((page) => `${origin}${page.path}`)
      .filter((url) => !xml.includes(url));
    if (missing.length > 0) return { ok: false, reason: `missing Route 66 sitemap URLs: ${missing.join(', ')}` };
    return { ok: true };
  });
  appendSummary('| sitemap-explore-route66-inventory | ✅ pass |\n');
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  appendSummary(`| sitemap-explore-route66-inventory | ❌ FAIL — ${reason} |\n`);
  console.error(`::error title=ROUTE 66 SITEMAP failure::${reason}`);
  process.exit(1);
}

appendSummary(`\nAll ${routePages.length} Route 66 pages are live, canonical, indexable, internally linked, and present in the Explore sitemap.\n`);
console.log(`Texas Route 66 production verification passed (${routePages.length} pages + Explore sitemap inventory).`);
