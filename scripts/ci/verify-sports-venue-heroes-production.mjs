import { appendFileSync } from 'node:fs';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const fallbackText = 'A verified venue photograph is not available yet.';

const repairedWave7 = [
  ['amarillo-national-center', 'AI-generated photorealistic editorial depiction of Amarillo National Center in Amarillo, Texas'],
  ['childrens-health-stadium-prosper', "AI-generated photorealistic editorial depiction of Children's Health Stadium in Prosper, Texas"],
  ['colonial-country-club', 'AI-generated photorealistic editorial depiction of Colonial Country Club in Fort Worth, Texas'],
  ['cy-fair-fcu-stadium', 'AI-generated photorealistic editorial depiction of Cy-Fair FCU Stadium in Cypress, Texas'],
  ['expo-center-taylor-county', 'AI-generated photorealistic editorial depiction of Taylor County Expo Center in Abilene, Texas'],
  ['hodgetown', 'AI-generated photorealistic editorial depiction of Hodgetown in Amarillo, Texas'],
  ['houston-motorsports-park', 'AI-generated photorealistic editorial depiction of Houston Motorsports Park in Houston, Texas'],
  ['legacy-stadium-katy', 'AI-generated photorealistic editorial depiction of Legacy Stadium in Katy, Texas'],
  ['memorial-park-golf-course', 'AI-generated photorealistic editorial depiction of Memorial Park Golf Course in Houston, Texas'],
  ['national-shooting-complex', 'AI-generated photorealistic editorial depiction of National Shooting Complex in San Antonio, Texas'],
  ['pga-frisco-fields-ranch', 'AI-generated photorealistic editorial depiction of PGA Frisco / Fields Ranch in Frisco, Texas'],
  ['retama-park', 'AI-generated photorealistic editorial depiction of Retama Park in Selma, Texas'],
  ['round-rock-sports-center', 'Round Rock Sports Center in Round Rock, Texas'],
  ['texas-motorplex', 'Texas Motorplex in Ennis, Texas'],
  ['tpc-san-antonio', 'AI-generated photorealistic editorial depiction of TPC San Antonio in San Antonio, Texas'],
  ['waco-surf', 'AI-generated photorealistic editorial depiction of Waco Surf in Waco, Texas'],
].map(([slug, alt]) => ({
  label: `${slug}-hero`,
  path: `/sports-venue/${slug}`,
  assetPath: `/images/sports-venues/${slug}.jpg`,
  required: [`/images/sports-venues/${slug}.jpg`, alt],
}));

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
  {
    label: 'amon-g-carter-stadium-hero',
    path: '/sports-venue/amon-g-carter-stadium',
    required: [
      'Amon G. Carter Stadium',
      'Amon_G._Carter_Stadium',
      'Panoramic view of Amon G. Carter Stadium at TCU in Fort Worth, Texas',
      'Cubfan1109',
    ],
  },
  {
    label: 'gerald-j-ford-stadium-hero',
    path: '/sports-venue/gerald-j-ford-stadium',
    required: [
      'Gerald J. Ford Stadium',
      'View_of_Gerald_J_Ford_Stadium_after_renovations',
      'Gerald J. Ford Stadium at SMU after its renovation during a 2024 football game',
      'HavanaHeat',
    ],
  },
  ...repairedWave7,
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function appendSummary(text) {
  if (summaryPath) appendFileSync(summaryPath, text);
}

async function inspectLocalAsset(assetPath, token) {
  if (!assetPath) return { ok: true, status: 'n/a', bytes: 0, contentType: 'n/a', challenge: false, error: '' };
  try {
    const response = await fetch(`${origin}${assetPath}?verify=${encodeURIComponent(token)}`, {
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(30_000),
      headers: { 'user-agent': 'TexasDefined-CI-Production-Smoke/1.0' },
    });
    const challenge = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
    const contentType = response.headers.get('content-type') ?? '';
    const bytes = (await response.arrayBuffer()).byteLength;
    return {
      ok: !challenge && response.ok && contentType.toLowerCase().startsWith('image/') && bytes >= 10_000,
      status: String(response.status),
      bytes,
      contentType,
      challenge,
      error: '',
    };
  } catch (error) {
    return {
      ok: false,
      status: 'network-error',
      bytes: 0,
      contentType: '',
      challenge: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function verifyVenue({ label, path, required, assetPath }) {
  let lastStatus = 'network-error';
  let lastBody = '';
  let lastError = '';
  let lastChallenge = false;
  let attempts = 0;
  let missing = [];
  let fallbackPresent = false;
  let lastAsset = { ok: !assetPath, status: assetPath ? 'not-run' : 'n/a', bytes: 0, contentType: '', challenge: false, error: '' };

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    attempts = attempt;
    const token = `${sha}-${runId}-${attempt}`;
    const url = `${origin}${path}?verify=${encodeURIComponent(token)}`;
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
      lastAsset = await inspectLocalAsset(assetPath, token);

      if (!lastChallenge && response.ok && missing.length === 0 && !fallbackPresent && lastAsset.ok) {
        console.log(`[${label}] verified (${response.status}): registered hero is present, fallback is absent, and local asset is healthy.`);
        appendSummary(`| ✅ pass | ${label} | ${lastStatus} | ${attempts} | no | ${lastAsset.status} | ${lastAsset.bytes || 'n/a'} | 0 |\n`);
        return;
      }

      if (lastChallenge) {
        console.log(`[${label}] Cloudflare returned cf-mitigated: challenge; waiting for the edge to become healthy.`);
      } else if (!response.ok) {
        console.log(`[${label}] HTTP ${response.status}; waiting for production to become healthy.`);
      } else {
        if (missing.length) console.log(`[${label}] registered hero markers missing: ${missing.join(' | ')}`);
        if (fallbackPresent) console.log(`[${label}] fail-closed photo fallback is still being rendered.`);
        if (!lastAsset.ok) console.log(`[${label}] local hero asset unhealthy: status=${lastAsset.status} bytes=${lastAsset.bytes} type=${lastAsset.contentType || 'unknown'} error=${lastAsset.error || 'none'}`);
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

  appendSummary(`| ❌ FAIL | ${label} | ${lastStatus} | ${attempts} | ${fallbackPresent ? 'yes' : 'no'} | ${lastAsset.status} | ${lastAsset.bytes} | ${missing.length} |\n`);
  const reason = lastError
    || (lastChallenge ? 'Cloudflare returned cf-mitigated: challenge' : '')
    || (lastStatus !== '200' ? `HTTP ${lastStatus}` : '')
    || (fallbackPresent ? 'photo fallback is still rendered despite a registered venue hero' : '')
    || (!lastAsset.ok ? `local hero asset unhealthy: status=${lastAsset.status}, bytes=${lastAsset.bytes}, type=${lastAsset.contentType || 'unknown'}, error=${lastAsset.error || 'none'}` : '')
    || `required hero markers missing: ${missing.join(' | ')}`;
  console.error(`::error title=LIVE PRODUCTION sports venue hero failure::${label} failed after ${attempts} attempts — ${reason}`);
  if (lastBody) console.error(`[${label}] response sample: ${lastBody.slice(0, 1800).replace(/\s+/g, ' ')}`);
  throw new Error(`${label}: ${reason}`);
}

appendSummary('\n## Sports venue hero production verification\n\n');
appendSummary('| Result | Venue hero | Page HTTP | Attempts | Fallback present | Asset HTTP | Asset bytes | Missing markers |\n|---|---|---:|---:|---|---:|---:|---:|\n');

for (const venue of venues) {
  await verifyVenue(venue);
}

console.log(`TexasDefined sports venue hero production verification passed (${venues.length} protected venues; ${repairedWave7.length} repaired Wave 7 pages include live local-asset checks).`);
