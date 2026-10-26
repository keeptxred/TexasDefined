const baseUrl = (process.env.TEXASDEFINED_BASE_URL ?? 'https://texasdefined.com').replace(/\/$/, '');
const verifyToken = [
  process.env.GITHUB_SHA || 'local',
  process.env.GITHUB_RUN_ID || 'run',
  process.env.GITHUB_RUN_ATTEMPT || 'attempt',
  Date.now().toString(),
].join('-');
const banned = [
  'Texas Defined tracks it as a visitor-facing venue',
  'Texas Defined includes it in the statewide venue guide to connect the sporting experience with practical trip planning and the surrounding county and region.',
];

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

const FETCH_ATTEMPTS = 3;
const FETCH_TIMEOUT_MS = 30_000;
const RETRY_DELAY_MS = 1_000;

async function fetchVerifiedResponse(pathname, token) {
  const separator = pathname.includes('?') ? '&' : '?';
  const url = `${baseUrl}${pathname}${separator}td_verify=${encodeURIComponent(token)}`;
  let lastError;
  for (let attempt = 1; attempt <= FETCH_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url, {
        cache: 'no-store',
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        headers: {
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          'user-agent': 'TexasDefined production editorial verifier',
        },
        redirect: 'follow',
      });
      if (!response.ok) {
        const httpError = new Error(`${pathname} returned HTTP ${response.status}`);
        // Deterministic route/data failures must fail the release immediately.
        if (response.status < 500 && response.status !== 429) throw httpError;
        lastError = httpError;
      } else {
        return { url, text: await response.text() };
      }
    } catch (error) {
      if (error instanceof Error && / returned HTTP 4(?:0[0-9]|1[0-9]|2[0-8])/.test(error.message)) throw error;
      lastError = error;
    }
    if (attempt < FETCH_ATTEMPTS) {
      console.warn(`[sports-venue-prod] ${pathname} attempt ${attempt}/${FETCH_ATTEMPTS} failed transiently; retrying`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
  throw new Error(`Production verification fetch failed for ${pathname} after ${FETCH_ATTEMPTS} attempts: ${lastError?.message || lastError}`);
}

async function fetchText(pathname) {
  return fetchVerifiedResponse(pathname, verifyToken);
}

function assertAbsent(text, marker, label) {
  if (text.includes(marker)) throw new Error(`${label} still contains retired sports-venue boilerplate: ${marker}`);
}

function assertIncludes(text, marker, label) {
  if (!text.includes(marker)) throw new Error(`${label} is missing expected venue-specific editorial copy: ${marker}`);
}

function assertOrdered(text, markers, label) {
  let cursor = -1;
  for (const marker of markers) {
    const index = text.indexOf(marker, cursor + 1);
    if (index < 0) throw new Error(`${label} is missing expected ordered marker: ${marker}`);
    if (index <= cursor) throw new Error(`${label} has planning markers out of order near: ${marker}`);
    cursor = index;
  }
}

const countyChecks = [
  {
    path: '/county/tarrant',
    label: 'Tarrant County sports destinations',
    expected: [
      'AT&T Stadium is the Dallas Cowboys’ home in Arlington',
      'Globe Life Field opened in 2020 as the Texas Rangers’ third Arlington home',
      'Amon G. Carter Stadium has been TCU football’s home since 1930',
      'Colonial Country Club opened in 1936 from Marvin Leonard’s championship-golf vision',
    ],
  },
  {
    path: '/county/harris',
    label: 'Harris County sports destinations',
    expected: [
      'Daikin Park has anchored Houston Astros baseball in downtown Houston since 2000',
      'Shell Energy Stadium is Houston’s soccer-focused home for Dynamo FC and the Dash',
      'Toyota Center is the Houston Rockets’ downtown arena and a major stop for concerts and touring sports events',
      'Legacy Stadium is Katy ISD’s 2017 district stadium',
    ],
  },
];

for (const check of countyChecks) {
  const { url, text } = await fetchText(check.path);
  const html = decodeHtml(text);
  for (const marker of banned) assertAbsent(html, marker, check.label);
  for (const marker of check.expected) assertIncludes(html, marker, check.label);
  console.log(`PASS ${check.label}: ${url}`);
}

const venuePageChecks = [
  {
    path: '/sports-venue/msr-houston',
    label: 'MSR Houston operational motorsports authority guide',
    ordered: [
      'Karting is temporarily closed. The road course is a separate operation.',
      'How to participate',
      'Call office: 281-369-0677',
      'Can you actually drive at MSR Houston?',
      'The three-stage track-day checklist',
      'Questions about MSR Houston',
      'Sources & review',
    ],
  },
  {
    path: '/sports-venue/gerald-j-ford-stadium',
    label: 'Gerald J. Ford Stadium live planning layout',
    ordered: [
      'Know before you go',
      'Planning your visit to Gerald J. Ford Stadium',
      '>Parking</h3>',
      '>Arrival</h3>',
      'aria-label="Parking orientation for Gerald J. Ford Stadium"',
      'Official parking source',
    ],
  },
  {
    path: '/sports-venue/xtreme-raceway-park',
    label: 'Xtreme Raceway Park live planning layout',
    ordered: [
      'Know before you go',
      'Planning your visit to Xtreme Raceway Park',
      '>Parking</h3>',
      '>Arrival</h3>',
      'aria-label="Parking orientation for Xtreme Raceway Park"',
      'Official parking source',
    ],
  },
  {
    path: '/sports-venue/memorial-park-golf-course',
    label: 'Memorial Park Golf Course live planning layout',
    ordered: [
      'Know before you go',
      'Planning your visit to Memorial Park Golf Course',
      '>Parking</h3>',
      '>Arrival</h3>',
      'aria-label="Parking orientation for Memorial Park Golf Course"',
      'Official parking source',
    ],
  },
];

const retiredVenueLayoutMarkers = [
  'Accuracy checks',
  'Explore the collection',
  'More venues like ',
  'Browse collection →',
];

for (const check of venuePageChecks) {
  const { url, text } = await fetchText(check.path);
  const html = decodeHtml(text);
  for (const marker of retiredVenueLayoutMarkers) assertAbsent(html, marker, check.label);
  assertOrdered(html, check.ordered, check.label);
  console.log(`PASS ${check.label}: ${url}`);
}

// Unlike the cache-busted checks above, verify the actual canonical URL that
// visitors and search engines receive after the post-deploy Cloudflare purge.
const msrCanonicalUrl = `${baseUrl}/sports-venue/msr-houston`;
const msrCanonicalResponse = await fetch(msrCanonicalUrl, {
  cache: 'no-store',
  signal: AbortSignal.timeout(30_000),
  headers: {
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'user-agent': 'TexasDefined MSR Houston canonical content certification',
  },
  redirect: 'follow',
});
if (!msrCanonicalResponse.ok) {
  throw new Error(`MSR Houston canonical page returned HTTP ${msrCanonicalResponse.status}`);
}
const msrCanonicalHtml = decodeHtml(await msrCanonicalResponse.text());
for (const marker of [
  'Karting is temporarily closed. The road course is a separate operation.',
  'Can you actually drive at MSR Houston?',
  'The three-stage track-day checklist',
  'Is MSR Houston karting open in October 2026?',
  'Call office: 281-369-0677',
  'Instructor-led supercar drive or ride-along',
  'https://www.thextremexperience.com/tracks/msr-houston',
  'Sea Center Texas',
  'Varner-Hogg Plantation',
  'Angleton lodging and tourism',
]) {
  assertIncludes(msrCanonicalHtml, marker, 'MSR Houston canonical production guide');
}
if (msrCanonicalHtml.includes('Road-course driving, racing and karting destination')) {
  throw new Error('MSR Houston canonical page still shows superseded karting-open introductory copy.');
}
console.log(`PASS MSR Houston canonical visitor guide: ${msrCanonicalUrl}`);

 
// The collection page has its own CDN cache key. Assert its edited source-review
// wording on both cache-busted and unparameterized production responses.
const msrDirectoryCacheBusted = await fetchText('/sports-venues/motorsports');
const msrDirectoryUrl = baseUrl + '/sports-venues/motorsports';
const msrDirectoryCanonicalResponse = await fetch(msrDirectoryUrl, {
  cache: 'no-store',
  signal: AbortSignal.timeout(30_000),
  headers: {
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'user-agent': 'TexasDefined motorsports directory content certification',
  },
  redirect: 'follow',
});
if (!msrDirectoryCanonicalResponse.ok) {
  throw new Error('Motorsports canonical directory returned HTTP ' + msrDirectoryCanonicalResponse.status);
}
for (const [label, raw] of [
  ['cache-busted motorsports directory', msrDirectoryCacheBusted.text],
  ['canonical motorsports directory', await msrDirectoryCanonicalResponse.text()],
]) {
  const html = decodeHtml(raw);
  assertIncludes(html, 'The most recently checked individual venue record in this collection was verified', label);
  assertIncludes(html, 'The latest individual venue source check was', label);
  assertIncludes(html, 'karting operation announced a temporary closure', label);
  for (const stale of [
    'Venue source records on this page were reviewed through',
    'Source records for this collection were reviewed through',
  ]) {
    assertAbsent(html, stale, label);
  }
}
console.log('PASS MSR Houston motorsports directory canonical review-date and karting notice: ' + msrDirectoryUrl);


const entityChecks = [
  {
    id: 'sports-venue:att-stadium',
    expected: 'AT&T Stadium is the Dallas Cowboys’ home in Arlington',
  },
  {
    id: 'sports-venue:legacy-stadium-katy',
    expected: 'Legacy Stadium is Katy ISD’s 2017 district stadium',
  },
];

for (const check of entityChecks) {
  const { url, text } = await fetchText(`/api/ai/entities?id=${encodeURIComponent(check.id)}`);
  let payload;
  try {
    payload = JSON.parse(text);
  } catch (error) {
    throw new Error(`AI entity endpoint returned non-JSON for ${check.id}: ${error.message}`);
  }
  const description = payload?.about?.description;
  if (typeof description !== 'string') throw new Error(`AI entity endpoint is missing description for ${check.id}`);
  for (const marker of banned) assertAbsent(description, marker, `AI entity ${check.id}`);
  assertIncludes(description, check.expected, `AI entity ${check.id}`);
  console.log(`PASS AI entity ${check.id}: ${url}`);
}

console.log('Sports venue production editorial verification passed: county cards, cache-busted venue planning layouts and AI entity records use current venue-specific copy; retired boilerplate, accuracy-check UI and generic per-venue collection blocks are absent.');
