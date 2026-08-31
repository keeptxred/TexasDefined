const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();

const surfaces = [
  ['aquarium-hub', '/explore/aquariums', ['Texas aquariums & marine life', 'Texas State Aquarium', 'The Dallas World Aquarium']],
  ['explore-sitemap', '/sitemap-explore.xml', ['/explore/aquariums', '/destination/texas-state-aquarium', '/destination/dallas-world-aquarium']],
  ['texas-state-aquarium', '/destination/texas-state-aquarium', ['Texas State Aquarium', 'Nueces County', 'Official visitor information']],
  ['dallas-world-aquarium', '/destination/dallas-world-aquarium', ['The Dallas World Aquarium', 'Dallas County', 'Official visitor information']],
  ['sea-center-texas', '/destination/sea-center-texas', ['Sea Center Texas', 'Brazoria County', 'Texas Parks and Wildlife Department']],
  ['sea-turtle-inc', '/destination/sea-turtle-inc', ['Sea Turtle, Inc.', 'Cameron County', 'Official visitor information']],
  ['austin-aquarium', '/destination/austin-aquarium', ['Austin Aquarium', 'Williamson County', 'Official visitor information']],
  ['san-antonio-zoo', '/destination/san-antonio-zoo', ['San Antonio Zoo', 'Friedrich Aquarium', 'Bexar County']],
  ['houston-zoo-kipp-correction', '/destination/houston-zoo', ['Houston Zoo', 'Kipp Aquarium', 'closed in 2020']],
  ['nueces-county-aquarium-links', '/county/nueces', ['Aquariums & marine life', 'Texas State Aquarium', 'UT Marine Science Institute Patton Center']],
  ['harris-county-aquarium-links', '/county/harris', ['Aquariums & marine life', 'Downtown Aquarium Houston', 'Houston Zoo']],
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function normalizeForAssertions(body) {
  return body
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/(?:&#39;|&apos;)/gi, "'")
    .replace(/&nbsp;/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function verifySurface(label, path, needles) {
  let lastStatus = 'network-error';
  let lastBody = '';
  let lastComparableBody = '';
  let lastError = '';
  let lastChallenge = false;

  for (let attempt = 1; attempt <= 8; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify-aquariums=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
    console.log(`[${label}] attempt ${attempt}: ${url}`);

    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-Aquarium-Production-Smoke/1.0' },
      });
      lastStatus = String(response.status);
      lastChallenge = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      lastBody = await response.text();
      lastComparableBody = normalizeForAssertions(lastBody);
      lastError = '';
      const missing = needles.filter((needle) => !lastComparableBody.includes(needle));

      if (!lastChallenge && response.ok && missing.length === 0) {
        console.log(`[${label}] verified (${response.status})`);
        return;
      }

      if (lastChallenge) console.log(`[${label}] Cloudflare challenge; retrying.`);
      else if (!response.ok) console.log(`[${label}] HTTP ${response.status}; retrying.`);
      else console.log(`[${label}] missing expected production text: ${missing.join(' | ')}`);
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      lastStatus = 'network-error';
      lastChallenge = false;
      console.log(`[${label}] request failed: ${lastError}`);
    }

    if (attempt < 8) await sleep(10_000);
  }

  const missing = needles.filter((needle) => !lastComparableBody.includes(needle));
  const reason = lastError
    || (lastChallenge ? 'Cloudflare returned cf-mitigated: challenge' : '')
    || (lastStatus !== '200' ? `HTTP ${lastStatus}` : `missing expected text: ${missing.join(' | ')}`);
  console.error(`::error title=AQUARIUM LIVE PRODUCTION failure::${label} failed — ${reason}`);
  if (lastBody) console.error(`[${label}] response sample: ${lastBody.slice(0, 1600).replace(/\s+/g, ' ')}`);
  process.exit(1);
}

for (const [label, path, needles] of surfaces) {
  await verifySurface(label, path, needles);
}

console.log(`TexasDefined aquarium production verification passed (${surfaces.length} live surfaces).`);
