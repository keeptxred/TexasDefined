import { readFile } from 'node:fs/promises';

const token = process.env.CLOUDFLARE_CACHE_API_TOKEN?.trim() || process.env.CLOUDFLARE_API_TOKEN?.trim();
const zoneName = (process.env.CLOUDFLARE_ZONE_NAME || 'texasdefined.com').trim();
const rawUrls = process.env.CLOUDFLARE_PURGE_URLS || '';
const purgeMetroProximity = process.env.CLOUDFLARE_PURGE_METRO_PROXIMITY?.trim().toLowerCase() === 'true';

if (!token) {
  throw new Error('CLOUDFLARE_CACHE_API_TOKEN or CLOUDFLARE_API_TOKEN is required for targeted cache purge.');
}

const maybornAuthorityUrl = `https://${zoneName}/destination/mayborn-museum-waco`;
const borderfestAuthorityUrl = `https://${zoneName}/event/hidalgo-borderfest`;
const paintedChurchSanAntonioUrl = `https://${zoneName}/explore/painted-churches/guides/painted-churches-from-san-antonio`;

async function readPaintedChurchGuideSlugs() {
  const source = await readFile(new URL('../../src/data/painted-church-search-guides.ts', import.meta.url), 'utf8');
  const slugs = [...source.matchAll(/\bslug:\s*"([^"]+)"/g)].map((match) => match[1]);
  if (slugs.length === 0) throw new Error('No Painted Churches guide slugs were found for cache purge.');
  return [...new Set(slugs)];
}

const paintedChurchGuideUrls = [
  `https://${zoneName}/explore/painted-churches/guides`,
  `https://${zoneName}/explore/painted-churches/routes`,
  ...(await readPaintedChurchGuideSlugs()).map((slug) => `https://${zoneName}/explore/painted-churches/guides/${slug}`),
];

const alwaysPurgeUrls = [
  `https://${zoneName}/article/texas-rivers-explained`,
  `https://${zoneName}/article/texas-rio-grande-river-guide`,
  `https://${zoneName}/article/texas-six-man-football-rules-explained`,
  `https://${zoneName}/article/texas-major-cities-regional-differences`,
  `https://${zoneName}/explore/landscapes/why-is-the-texas-hill-country-so-hilly`,
  `https://${zoneName}/texas-mountain-biking-guide`,
  `https://${zoneName}/texas-horseback-riding-guide`,
  `https://${zoneName}/texas-ohv-guide`,
  `https://${zoneName}/texas-paddling-guide`,
  `https://${zoneName}/texas-rock-climbing-bouldering-guide`,
  maybornAuthorityUrl,
  borderfestAuthorityUrl,
  `https://${zoneName}/county/tarrant`,
  `https://${zoneName}/county/harris`,
  `https://${zoneName}/texas-high-school-football-teams/abbott`,
  ...paintedChurchGuideUrls,
];

const weekendEventUrls = [
  `https://${zoneName}/events/this-weekend`,
  `https://${zoneName}/events/houston-this-weekend`,
  `https://${zoneName}/events/dallas-this-weekend`,
  `https://${zoneName}/events/austin-this-weekend`,
  `https://${zoneName}/events/san-antonio-this-weekend`,
];

async function readMetroSlugs() {
  const source = await readFile(new URL('../../src/data/metro-proximity.ts', import.meta.url), 'utf8');
  const metroBlock = source.match(/export const METRO_PROXIMITY_METROS = \[([\s\S]*?)\]\s+as const;/)?.[1];
  if (!metroBlock) {
    throw new Error('Unable to locate METRO_PROXIMITY_METROS in src/data/metro-proximity.ts.');
  }

  const metros = [...metroBlock.matchAll(/\bslug:\s*"([^"]+)"/g)].map((match) => match[1]);
  if (metros.length === 0) {
    throw new Error('No metro slugs were found in METRO_PROXIMITY_METROS.');
  }

  return [...new Set(metros)];
}

const metroUrls = purgeMetroProximity
  ? await (async () => {
      const metros = await readMetroSlugs();
      const collections = [
        'things-to-do',
        'day-trips',
        'weekend-trips',
        'road-trips',
        'state-parks',
        'small-towns',
        'small-towns-1-hour',
        'small-towns-2-hours',
        'small-towns-3-hours',
        'lakes-rivers',
        'lakes',
        'swimming-holes',
        'historic-sites',
      ];
      return [
        ...metros.flatMap((metro) => [
          `https://${zoneName}/explore/near/${metro}`,
          ...collections.map((collection) => `https://${zoneName}/explore/near/${metro}/${collection}`),
        ]),
        `https://${zoneName}/sitemap-explore.xml`,
      ];
    })()
  : [];

const urls = [...new Set([
  ...rawUrls
    .split(/[\n,]+/)
    .map((value) => value.trim())
    .filter(Boolean),
  ...alwaysPurgeUrls,
  ...weekendEventUrls,
  ...metroUrls,
])];

if (urls.length === 0) {
  throw new Error('Cloudflare targeted purge URL list is empty.');
}

for (const value of urls) {
  const parsed = new URL(value);
  if (parsed.protocol !== 'https:' || parsed.hostname !== zoneName) {
    throw new Error(`Refusing to purge URL outside https://${zoneName}: ${value}`);
  }
}

const headers = {
  authorization: `Bearer ${token}`,
  'content-type': 'application/json',
};

async function fetchCloudflareJson(url, options, label) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(url, { ...options, signal: AbortSignal.timeout(20_000) });
      const body = await response.text();
      let payload;
      try {
        payload = JSON.parse(body);
      } catch {
        const preview = body.replace(/\\s+/g, ' ').trim().slice(0, 160);
        throw new Error(`${label} returned non-JSON HTTP ${response.status}${preview ? `: ${preview}` : ''}`);
      }
      if (response.ok && payload?.success === true) return { response, payload };
      const messages = [
        ...(Array.isArray(payload?.errors) ? payload.errors : []),
        ...(Array.isArray(payload?.messages) ? payload.messages : []),
      ].map((item) => item?.message).filter(Boolean).join(' | ');
      throw new Error(`${label} failed with HTTP ${response.status}${messages ? `: ${messages}` : ''}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < 4) {
        console.warn(`${label} attempt ${attempt}/4 failed: ${lastError.message}; retrying.`);
        await new Promise((resolve) => setTimeout(resolve, attempt * 2_000));
      }
    }
  }
  throw lastError || new Error(`${label} failed without a response.`);
}

const { payload: zonesPayload } = await fetchCloudflareJson(
  `https://api.cloudflare.com/client/v4/zones?name=${encodeURIComponent(zoneName)}&status=active&per_page=50`,
  { headers },
  'Cloudflare zone lookup',
);

const zones = Array.isArray(zonesPayload.result) ? zonesPayload.result : [];
const exactZone = zones.find((zone) => zone?.name === zoneName);
if (!exactZone?.id) {
  throw new Error(`Active Cloudflare zone not found for ${zoneName}.`);
}

const chunkSize = 30;
const chunks = [];
for (let index = 0; index < urls.length; index += chunkSize) {
  chunks.push(urls.slice(index, index + chunkSize));
}

for (let index = 0; index < chunks.length; index += 1) {
  const chunk = chunks[index];
  await fetchCloudflareJson(
    `https://api.cloudflare.com/client/v4/zones/${exactZone.id}/purge_cache`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ files: chunk }),
    },
    `Cloudflare targeted purge batch ${index + 1}/${chunks.length}`,
  );

  console.log(`Cloudflare accepted targeted purge batch ${index + 1}/${chunks.length} for ${chunk.length} URL(s).`);
}

console.log(`Cloudflare accepted targeted purge for ${urls.length} URL(s) in ${zoneName} across ${chunks.length} request(s).`);
for (const url of urls) console.log(`- ${url}`);

const requiredMaybornMarkers = [
  'Mayborn Museum in Waco',
  'Cultural Crossroads changes the museum',
  'Attack of the Bloodsuckers!',
];
const retiredMaybornMarkers = [
  'Tours and experiences near Mayborn Museum',
  'Mayborn Museum | Texas Historic Site Guide',
];
let maybornVerified = false;
let maybornReason = 'no response';

for (let attempt = 1; attempt <= 6; attempt += 1) {
  try {
    const response = await fetch(maybornAuthorityUrl, {
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(30_000),
      headers: {
        'user-agent': 'TexasDefined-CI-Mayborn-Authority/1.0',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
      },
    });
    const body = await response.text();
    const missing = requiredMaybornMarkers.filter((marker) => !body.includes(marker));
    const retired = retiredMaybornMarkers.filter((marker) => body.includes(marker));
    if (response.ok && missing.length === 0 && retired.length === 0) {
      maybornVerified = true;
      console.log(`Mayborn authority verification passed after targeted purge (attempt ${attempt}).`);
      break;
    }
    maybornReason = `HTTP ${response.status}; missing=${missing.join(' | ') || 'none'}; retired=${retired.join(' | ') || 'none'}`;
  } catch (error) {
    maybornReason = error instanceof Error ? error.message : String(error);
  }

  if (attempt < 6) await new Promise((resolve) => setTimeout(resolve, 5_000));
}

if (!maybornVerified) {
  throw new Error(`Mayborn authority page did not verify after targeted cache purge: ${maybornReason}`);
}

const requiredBorderfestMarkers = [
  'The next BorderFest dates are not confirmed yet',
  'Families have more than carnival rides',
  'Turn BorderFest into a Rio Grande Valley weekend',
  'Event facts last source-checked 2026-10-07',
];
const retiredBorderfestMarkers = [
  'Sunday adult one-day admission — $18.00 USD',
  'Use the latest confirmed four-day schedule',
  'Event facts last source-checked 2026-08-27',
];
let borderfestVerified = false;
let borderfestReason = 'no response';

for (let attempt = 1; attempt <= 6; attempt += 1) {
  try {
    const response = await fetch(borderfestAuthorityUrl, {
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(30_000),
      headers: {
        'user-agent': 'TexasDefined-CI-BorderFest-Authority/1.0',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
      },
    });
    const body = await response.text();
    const missing = requiredBorderfestMarkers.filter((marker) => !body.includes(marker));
    const retired = retiredBorderfestMarkers.filter((marker) => body.includes(marker));
    if (response.ok && missing.length === 0 && retired.length === 0) {
      borderfestVerified = true;
      console.log(`BorderFest authority public-cache verification passed after targeted purge (attempt ${attempt}).`);
      break;
    }
    borderfestReason = `HTTP ${response.status}; missing=${missing.join(' | ') || 'none'}; retired=${retired.join(' | ') || 'none'}`;
  } catch (error) {
    borderfestReason = error instanceof Error ? error.message : String(error);
  }

  if (attempt < 6) await new Promise((resolve) => setTimeout(resolve, 5_000));
}

if (!borderfestVerified) {
  throw new Error(`BorderFest authority page did not verify after targeted cache purge: ${borderfestReason}`);
}


if (purgeMetroProximity) {
  const cachedSurfaceChecks = [
    {
      label: 'Abilene metro hub',
      url: `https://${zoneName}/explore/near/abilene`,
      required: ['Nearby places worth opening first', 'Frontier Texas!'],
      sectionStart: 'Nearby places worth opening first',
      sectionEnd: 'How to use this guide',
      firstDestinationHref: '/destination/frontier-texas',
    },
    {
      label: 'Abilene state parks',
      url: `https://${zoneName}/explore/near/abilene/state-parks`,
      required: ['Abilene State Park'],
    },
    {
      label: 'Abilene historic sites',
      url: `https://${zoneName}/explore/near/abilene/historic-sites`,
      required: ['Buffalo Gap Historic Village', 'Fort Phantom Hill'],
    },
  ];

  for (const check of cachedSurfaceChecks) {
    let verified = false;
    let reason = 'no response';
    for (let attempt = 1; attempt <= 6; attempt += 1) {
      try {
        const response = await fetch(check.url, {
          redirect: 'follow',
          signal: AbortSignal.timeout(30_000),
          headers: {
            'user-agent': 'Mozilla/5.0 (compatible; TexasDefined-Public-Cache-Verification/1.0)',
            accept: 'text/html,application/xhtml+xml',
          },
        });
        const body = await response.text();
        const missing = check.required.filter((marker) => !body.includes(marker));
        let sectionProblem = '';
        if (check.sectionStart && check.firstDestinationHref) {
          const sectionStartIndex = body.indexOf(check.sectionStart);
          const sectionEndIndex = sectionStartIndex >= 0 && check.sectionEnd
            ? body.indexOf(check.sectionEnd, sectionStartIndex + check.sectionStart.length)
            : -1;
          const section = sectionStartIndex >= 0
            ? body.slice(sectionStartIndex, sectionEndIndex > sectionStartIndex ? sectionEndIndex : undefined)
            : '';
          const firstDestinationIndex = section.indexOf('/destination/');
          const expectedDestinationIndex = section.indexOf(check.firstDestinationHref);
          if (sectionStartIndex < 0) {
            sectionProblem = `section start ${check.sectionStart} is missing`;
          } else if (expectedDestinationIndex < 0) {
            sectionProblem = `${check.firstDestinationHref} is missing from the rendered nearby section`;
          } else if (firstDestinationIndex !== expectedDestinationIndex) {
            sectionProblem = `${check.firstDestinationHref} is not the first rendered destination card`;
          }
        }
        if (response.ok && missing.length === 0 && !sectionProblem) {
          verified = true;
          console.log(`${check.label} public-cache verification passed after targeted purge (attempt ${attempt}).`);
          break;
        }
        reason = `HTTP ${response.status}; missing=${missing.join(' | ') || 'none'}; section=${sectionProblem || 'ok'}`;
      } catch (error) {
        reason = error instanceof Error ? error.message : String(error);
      }

      if (attempt < 6) await new Promise((resolve) => setTimeout(resolve, 5_000));
    }

    if (!verified) {
      throw new Error(`${check.label} did not verify through the normal public cache after targeted purge: ${reason}`);
    }
  }
}


const requiredPaintedChurchMarkers = [
  'San Antonio to the Painted Churches: Complete One-Day Driving Guide',
  'Trip at a glance',
  'A route you can actually use',
  'Visitor information checked',
  'October 7, 2026',
];
const retiredPaintedChurchMarkers = [
  'Question this page answers',
  'All 50 searches',
  'Browse the full search-intent atlas',
];
let paintedChurchVerified = false;
let paintedChurchReason = 'no response';

for (let attempt = 1; attempt <= 6; attempt += 1) {
  try {
    const response = await fetch(paintedChurchSanAntonioUrl, {
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(30_000),
      headers: {
        'user-agent': 'TexasDefined-CI-Painted-Churches-Authority/1.0',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
      },
    });
    const body = await response.text();
    const missing = requiredPaintedChurchMarkers.filter((marker) => !body.includes(marker));
    const retired = retiredPaintedChurchMarkers.filter((marker) => body.includes(marker));
    if (response.ok && missing.length === 0 && retired.length === 0) {
      paintedChurchVerified = true;
      console.log(`Painted Churches San Antonio verification passed after targeted purge (attempt ${attempt}).`);
      break;
    }
    paintedChurchReason = `HTTP ${response.status}; missing=${missing.join(' | ') || 'none'}; retired=${retired.join(' | ') || 'none'}`;
  } catch (error) {
    paintedChurchReason = error instanceof Error ? error.message : String(error);
  }
  if (attempt < 6) await new Promise((resolve) => setTimeout(resolve, 5_000));
}

if (!paintedChurchVerified) {
  throw new Error(`Painted Churches San Antonio page did not verify after targeted cache purge: ${paintedChurchReason}`);
}
