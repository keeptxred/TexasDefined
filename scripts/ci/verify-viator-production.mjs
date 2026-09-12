import { appendFileSync } from 'node:fs';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;

const surfaces = [
  {
    label: 'viator-explore-directory',
    path: '/explore',
    minAffiliateLinks: 1,
    required: [
      'Book Texas experiences',
      'Affiliate disclosure: TexasDefined may earn a commission from qualifying Viator bookings',
      'pid=P00318227',
      'mcid=42383',
      'campaign=texasdefined-explore',
      'rel="sponsored noopener noreferrer"',
    ],
  },
  {
    label: 'viator-barton-springs-destination',
    path: '/destination/barton-springs-pool',
    minAffiliateLinks: 1,
    required: [
      'Add an experience around Barton Springs Pool',
      'Recent Austin inventory signals:',
      'On the water',
      'September 8, 2026',
      'Affiliate disclosure: TexasDefined may earn a commission from qualifying Viator bookings',
      'pid=P00318227',
      'mcid=42383',
      'campaign=texasdefined-destination-barton-springs-pool',
      'rel="sponsored noopener noreferrer"',
    ],
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function appendSummary(text) {
  if (summaryPath) appendFileSync(summaryPath, text);
}

function countAffiliateLinks(body) {
  return (body.match(/https:\/\/www\.viator\.com\/tours\//g) ?? []).length;
}

async function verifySurface({ label, path, required, minAffiliateLinks }) {
  let lastStatus = 'network-error';
  let lastBody = '';
  let lastError = '';
  let lastChallenge = false;
  let attempts = 0;
  let missing = [];
  let affiliateLinks = 0;

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    attempts = attempt;
    const url = `${origin}${path}?verify=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
    console.log(`[${label}] attempt ${attempt}: ${url}`);

    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-CI-Production-Smoke/1.0' },
      });
      lastStatus = String(response.status);
      lastChallenge = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      lastBody = await response.text();
      lastError = '';
      missing = required.filter((needle) => !lastBody.includes(needle));
      affiliateLinks = countAffiliateLinks(lastBody);

      if (!lastChallenge && response.ok && missing.length === 0 && affiliateLinks >= minAffiliateLinks) {
        console.log(`[${label}] verified (${response.status}): ${affiliateLinks} Viator tour link(s).`);
        appendSummary(`| ✅ pass | ${label} | ${lastStatus} | ${attempts} | ${affiliateLinks} |\n`);
        return;
      }

      if (lastChallenge) {
        console.log(`[${label}] Cloudflare returned cf-mitigated: challenge; waiting for the edge to become healthy.`);
      } else if (!response.ok) {
        console.log(`[${label}] HTTP ${response.status}; waiting for production to become healthy.`);
      } else {
        if (missing.length) console.log(`[${label}] required markers missing: ${missing.join(' | ')}`);
        if (affiliateLinks < minAffiliateLinks) console.log(`[${label}] found ${affiliateLinks} Viator tour links; expected at least ${minAffiliateLinks}.`);
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      lastStatus = 'network-error';
      lastChallenge = false;
      console.log(`[${label}] request failed: ${lastError}`);
    }

    if (attempt < 6) await sleep(5_000);
  }

  appendSummary(`| ❌ FAIL | ${label} | ${lastStatus} | ${attempts} | ${affiliateLinks} |\n`);
  const reason = lastError
    || (lastChallenge ? 'Cloudflare returned cf-mitigated: challenge' : '')
    || (lastStatus !== '200' ? `HTTP ${lastStatus}` : '')
    || (missing.length ? `required markers missing: ${missing.join(' | ')}` : '')
    || `found ${affiliateLinks} Viator tour links; expected at least ${minAffiliateLinks}`;
  console.error(`::error title=LIVE PRODUCTION Viator failure::${label} failed after ${attempts} attempts — ${reason}`);
  if (lastBody) console.error(`[${label}] response sample: ${lastBody.slice(0, 1600).replace(/\s+/g, ' ')}`);
  throw new Error(`${label}: ${reason}`);
}

appendSummary('\n## Viator production verification\n\n');
appendSummary('| Result | Surface | HTTP | Attempts | Viator links |\n|---|---|---:|---:|---:|\n');

for (const surface of surfaces) {
  await verifySurface(surface);
}

console.log('[viator-production] Explore directory and representative destination booking card passed live verification.');

await import('./verify-ask-texas-government-production.mjs');
await import('./verify-stay-nearby-production.mjs');
await import('./verify-critical-static-assets-production.mjs');
await import('./verify-sports-venue-heroes-production.mjs');
