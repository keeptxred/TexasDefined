import { appendFileSync } from 'node:fs';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const fallbackText = 'A verified venue photograph is not available yet.';

const venues = [
  {
    label: 'xtreme-raceway-park-hero',
    path: '/sports-venue/xtreme-raceway-park',
    required: [
      'Xtreme Raceway Park',
      '/images/sports-venues/xtreme-raceway-park.jpg',
      'Xtreme Raceway Park entrance in Ferris, Texas at dusk',
      'site-owner supplied media',
    ],
  },
  {
    label: 'msr-houston-hero',
    path: '/sports-venue/msr-houston',
    required: [
      'MSR Houston',
      'MSR_Houston_orthophoto_20150210.jpg',
      'Aerial orthophoto of MSR Houston in Angleton, Texas',
      'United States Geological Survey',
    ],
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function appendSummary(text) {
  if (summaryPath) appendFileSync(summaryPath, text);
}

async function verifyVenue({ label, path, required }) {
  let lastStatus = 'network-error';
  let lastBody = '';
  let lastError = '';
  let lastChallenge = false;
  let attempts = 0;
  let missing = [];
  let fallbackPresent = false;

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
      fallbackPresent = lastBody.includes(fallbackText);

      if (!lastChallenge && response.ok && missing.length === 0 && !fallbackPresent) {
        console.log(`[${label}] verified (${response.status}): registered hero is present and fallback is absent.`);
        appendSummary(`| ✅ pass | ${label} | ${lastStatus} | ${attempts} | no | 0 |\n`);
        return;
      }

      if (lastChallenge) {
        console.log(`[${label}] Cloudflare returned cf-mitigated: challenge; waiting for the edge to become healthy.`);
      } else if (!response.ok) {
        console.log(`[${label}] HTTP ${response.status}; waiting for production to become healthy.`);
      } else {
        if (missing.length) console.log(`[${label}] registered hero markers missing: ${missing.join(' | ')}`);
        if (fallbackPresent) console.log(`[${label}] fail-closed photo fallback is still being rendered.`);
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      lastStatus = 'network-error';
      lastChallenge = false;
      missing = required;
      fallbackPresent = false;
      console.log(`[${label}] request failed: ${lastError}`);
    }

    if (attempt < 6) await sleep(5_000);
  }

  appendSummary(`| ❌ FAIL | ${label} | ${lastStatus} | ${attempts} | ${fallbackPresent ? 'yes' : 'no'} | ${missing.length} |\n`);
  const reason = lastError
    || (lastChallenge ? 'Cloudflare returned cf-mitigated: challenge' : '')
    || (lastStatus !== '200' ? `HTTP ${lastStatus}` : '')
    || (fallbackPresent ? 'photo fallback is still rendered despite a registered venue hero' : '')
    || `required hero markers missing: ${missing.join(' | ')}`;
  console.error(`::error title=LIVE PRODUCTION sports venue hero failure::${label} failed after ${attempts} attempts — ${reason}`);
  if (lastBody) console.error(`[${label}] response sample: ${lastBody.slice(0, 1800).replace(/\s+/g, ' ')}`);
  throw new Error(`${label}: ${reason}`);
}

appendSummary('\n## Sports venue hero production verification\n\n');
appendSummary('| Result | Venue hero | HTTP | Attempts | Fallback present | Missing markers |\n|---|---|---:|---:|---|---:|\n');

for (const venue of venues) {
  await verifyVenue(venue);
}

console.log(`TexasDefined sports venue hero production verification passed (${venues.length} protected venues).`);
