const origin = String(process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const userAgent = 'TexasDefined-Publication-Production-Smoke/1.3';
const verifyToken = [process.env.GITHUB_SHA || 'local', process.env.GITHUB_RUN_ID || 'run', process.env.GITHUB_RUN_ATTEMPT || 'attempt', Date.now()].join('-');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function fetchHealthy(path, expectedText = '') {
  let last = null;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    try {
      const response = await fetch(`${origin}${path}${path.includes('?') ? '&' : '?'}td_verify=${encodeURIComponent(verifyToken)}-${attempt}`, { redirect: 'follow', cache: 'no-store', signal: AbortSignal.timeout(30_000), headers: { 'user-agent': userAgent } });
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
function firstPublishedNewsPath(newsBody) {
  const matches = [...newsBody.matchAll(/href=["'](\/news\/[^"'?#]+)["']/g)].map((match) => match[1]).filter((path) => path && path !== '/news/');
  return [...new Set(matches)][0] || null;
}

const news = await fetchHealthy('/news');
console.log(JSON.stringify({ surface: '/news', status: news.status, ok: true }));

// Confirm production serves an actual XML sitemap even when publication is
// disabled or no individual published news item is currently routed.
const sitemap = await fetchHealthy('/sitemap.xml');
if (!/<(?:sitemapindex|urlset)(?:\s|>)/i.test(sitemap.body)) {
  throw new Error('/sitemap.xml returned a successful HTTP status without a valid sitemap root');
}
console.log(JSON.stringify({ surface: '/sitemap.xml', status: sitemap.status, ok: true }));

// Preserve the original guarded-publication handoff article as a permanent
// production regression check: the historical page must stay live, canonical,
// and discoverable in the sitemap unless it is deliberately retired in code.
const historicalCanyonPath = '/news/2026-08-10-canyon-lake-full-capacity-recovery';
const historicalCanyon = await fetchHealthy(historicalCanyonPath, 'Canyon Lake Reaches Full Capacity After a Dramatic Summer Refill');
const historicalCanyonCanonical = `${origin}${historicalCanyonPath}`;
if (!historicalCanyon.body.includes(historicalCanyonCanonical)) {
  throw new Error(`${historicalCanyonPath} is live but does not expose its expected canonical URL ${historicalCanyonCanonical}`);
}
if (!sitemap.body.includes(`<loc>${historicalCanyonCanonical}</loc>`)) {
  throw new Error(`${historicalCanyonPath} is live but missing from /sitemap.xml`);
}
console.log(JSON.stringify({ surface: historicalCanyonPath, status: historicalCanyon.status, canonical: historicalCanyonCanonical, sitemap: true, ok: true }));
// Govern the Texas ecoregions authority page as a production-critical evergreen surface.
const ecoregionsPath = '/article/texas-ecoregions-habitats-guide';
const ecoregions = await fetchHealthy(ecoregionsPath, 'Texas Ecoregions: Complete Map & Guide to All 10 Natural Regions');
for (const expected of [
  '/images/editorial/texas-ecoregions-map.svg',
  '/data/texas-ecoregions.csv',
  'Piney Woods',
  'Gulf Prairies and Marshes',
  'Post Oak Savannah',
  'Blackland Prairie',
  'Cross Timbers',
  'South Texas Plains',
  'Edwards Plateau',
  'Rolling Plains',
  'High Plains',
  'Trans-Pecos',
  'Methodology',
  'Recommended citation',
  'Texas Defined Travel &amp; Outdoors Desk',
  'Sources and further reading',
  'Texas Water Development Board',
  'National Park Service',
  'Big Thicket National Preserve',
]) {
  if (!ecoregions.body.includes(expected)) throw new Error(`${ecoregionsPath} is missing expected authority marker: ${expected}`);
}
for (const stale of [
  'Texas Ecoregions Explained: Why the Landscape Changes So Fast',
  'Camping in Texas With Your Dog',
  'Hiking Texas Trails With Your Dog',
  'Texas Dogs at Lakes and Rivers',
  'Food &amp; Culture Desk',
  'More stories to read next',
]) {
  if (ecoregions.body.includes(stale)) throw new Error(`${ecoregionsPath} still exposes stale production content: ${stale}`);
}
const ecoregionsAuthor = await fetchHealthy('/authors/a-dell', 'Texas Defined Travel & Outdoors Desk');
if (!['Travel & outdoors desk', 'Travel &amp; outdoors desk'].some((role) => ecoregionsAuthor.body.includes(role))) {
  throw new Error('/authors/a-dell is missing the expected Travel & outdoors desk role');
}
const ecoregionsMap = await fetchHealthy('/images/editorial/texas-ecoregions-map.svg', 'Texas natural regions');
const ecoregionsCsv = await fetchHealthy('/data/texas-ecoregions.csv', 'region,orientation,landscape,signature_vegetation,representative_place');
for (const region of ['Piney Woods','Gulf Prairies and Marshes','Post Oak Savannah','Blackland Prairie','Cross Timbers','South Texas Plains','Edwards Plateau','Rolling Plains','High Plains','Trans-Pecos']) {
  if (!ecoregionsCsv.body.includes(region)) throw new Error(`/data/texas-ecoregions.csv is missing region: ${region}`);
}
console.log(JSON.stringify({ surface: ecoregionsPath, status: ecoregions.status, authorStatus: ecoregionsAuthor.status, mapStatus: ecoregionsMap.status, csvStatus: ecoregionsCsv.status, ok: true }));

// Protect the published El Paso authority rollout with a live, uncached HTTP
// check. The pre-deploy SSR suite validates the built Worker, but only this
// deployed-domain probe can detect stale edge HTML or a missing metro route.
// Reuse the existing bounded retry and unique query key; do not purge caches.
const elPasoLiveSurfaces = [
  { path: '/metro-area/el-paso-metro', markers: [
    'What counts as the El Paso metro?',
    'Hudspeth County',
    'Connected El Paso guides',
    '/county/hudspeth',
    'Quintin Soloviev',
    '/media/remote?url=',
    'El_Paso_skyline.jpg',
  ] },
  { path: '/city/el-paso', markers: [
    'Connected El Paso guides',
    '/metro-area/el-paso-metro',
  ] },
  { path: '/county/el-paso', markers: [
    'Connected El Paso guides',
    '/metro-area/el-paso-metro',
  ] },
  { path: '/article/moving-to-el-paso-guide', markers: [
    'Connected El Paso guides',
    '/metro-area/el-paso-metro',
  ] },
];
const elPasoResults = await Promise.all(elPasoLiveSurfaces.map(async ({ path, markers }) => {
  const { status, body } = await fetchHealthy(path, markers[0]);
  for (const marker of markers) {
    if (!body.includes(marker)) throw new Error(`${path} returned HTTP ${status}, but published HTML is missing El Paso authority marker: ${marker}`);
  }
  if (path === '/metro-area/el-paso-metro') {
    for (const stale of ['Expo Center of Taylor County', 'Ratliff Stadium']) {
      if (body.includes(stale)) throw new Error(`${path} still contains geographically incorrect old metro recommendation: ${stale}`);
    }
  }
  return { path, status, markersVerified: markers.length };
}));
for (const result of elPasoResults) console.log(JSON.stringify({ surface: 'El Paso authority production', ...result, ok: true }));

// The old El Paso destination must permanently redirect to the canonical city
// authority, never expose a 404 or duplicate indexable destination.
const legacyElPasoPath = '/destination/el-paso';
const legacyElPasoToken = `${verifyToken}-el-paso-301`;
const legacyElPasoUrl = new URL(legacyElPasoPath, origin);
legacyElPasoUrl.searchParams.set('td_verify', legacyElPasoToken);
const legacyElPasoResponse = await fetch(legacyElPasoUrl, {
  redirect: 'manual', cache: 'no-store', signal: AbortSignal.timeout(20_000),
  headers: { 'user-agent': userAgent, 'cache-control': 'no-cache' },
});
const legacyLocation = legacyElPasoResponse.headers.get('location');
if (legacyElPasoResponse.status !== 301
    || legacyElPasoResponse.headers.get('cf-mitigated')?.toLowerCase() === 'challenge'
    || !legacyLocation) {
  throw new Error(`${legacyElPasoPath} must return HTTP 301 to /city/el-paso; received ${legacyElPasoResponse.status}`);
}
const redirectedElPaso = new URL(legacyLocation, origin);
if (redirectedElPaso.origin !== new URL(origin).origin
    || redirectedElPaso.pathname !== '/city/el-paso'
    || redirectedElPaso.searchParams.get('td_verify') !== legacyElPasoToken) {
  throw new Error(`${legacyElPasoPath} redirected to an unexpected destination: ${redirectedElPaso.href}`);
}
console.log(JSON.stringify({ surface: legacyElPasoPath, status: 301, target: '/city/el-paso', queryPreserved: true, ok: true }));


// Bounded El Paso destination/neighbor network acceptance. These are the
// specific related authorities linked from the metro page, not a sitewide scan.
// A title or county mention alone is insufficient: insist on the actual metro
// backlink in each publicly rendered page.
const elPasoNetworkPaths = [
  '/county/hudspeth',
  '/destination/chamizal-national-memorial',
  '/destination/magoffin-home',
  '/destination/old-socorro-mission',
  '/destination/franklin-mountains-state-park',
  '/destination/hueco-tanks-state-park-and-historic-site',
  '/destination/el-paso-museum-of-art',
  '/destination/el-paso-museum-of-archaeology',
  '/destination/hotel-paso-del-norte',
  '/article/el-camino-real-de-tierra-adentro-national-historic-trail',
  '/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso',
];
const elPasoNetworkResults = await Promise.allSettled(elPasoNetworkPaths.map(async path => {
  // Ysleta del Sur uses its own researched authority navigation, rather than
  // the shared 'Connected El Paso guides' heading.
  const expected = path.includes('ysleta-del-sur-pueblo')
    ? 'El Paso metro-area guide' : 'Connected El Paso guides';
  const { status, body } = await fetchHealthy(path, expected);
  if (!body.includes('/metro-area/el-paso-metro')) {
    throw new Error(`${path} is missing its live El Paso metro backlink`);
  }
  return { path, status, backlink: true };
}));
const elPasoNetworkFailures = [];
for (let i = 0; i < elPasoNetworkResults.length; i++) {
  const item = elPasoNetworkResults[i];
  if (item.status === 'rejected') {
    elPasoNetworkFailures.push(`${elPasoNetworkPaths[i]}: ${String(item.reason)}`);
  } else {
    console.log(JSON.stringify({ surface: 'El Paso connected authority', ...item.value, ok: true }));
  }
}
if (elPasoNetworkFailures.length) {
  throw new Error('El Paso connected authority live verification failed: ' + elPasoNetworkFailures.join('; '));
}

// Do not mistake a licensed image URL or a caption for a loaded photograph.
// The live metro hero is delivered through the existing same-origin remote
// image route; require real encoded image bytes from that exact route.
const skylineSource = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/El_Paso_skyline.jpg?width=1600';
const skylinePath = '/media/remote?url=' + encodeURIComponent(skylineSource);
const skylineResponse = await fetch(origin + skylinePath, {
  redirect: 'follow', cache: 'no-store', signal: AbortSignal.timeout(30_000),
  headers: { 'user-agent': userAgent },
});
const skylineType = (skylineResponse.headers.get('content-type') || '').toLowerCase();
const skylineBytes = new Uint8Array(await skylineResponse.arrayBuffer());
const skylineMagic = (skylineBytes[0] === 255 && skylineBytes[1] === 216)
  || (skylineBytes[0] === 137 && skylineBytes[1] === 80 && skylineBytes[2] === 78 && skylineBytes[3] === 71)
  || (skylineBytes[0] === 82 && skylineBytes[1] === 73 && skylineBytes[8] === 87 && skylineBytes[9] === 69);
if (!skylineResponse.ok || !skylineType.startsWith('image/') || skylineBytes.length < 1024 || !skylineMagic) {
  throw new Error('El Paso skyline returned no valid image bytes: ' + JSON.stringify({
    status: skylineResponse.status, type: skylineType, bytes: skylineBytes.length,
  }));
}
console.log(JSON.stringify({ surface: 'El Paso skyline real image bytes', status: skylineResponse.status,
  type: skylineType, bytes: skylineBytes.length, ok: true }));

// Regression guard for the Oct 2026 reservoir authority upgrade. This verifies
// actual production HTML and SVG responses, not just the merged source fixture.
// Query-busted requests avoid reading an unrelated old HTML cache entry.
const reservoirPath = '/article/texas-lakes-reservoirs-explained';
const reservoirHtml = await fetchHealthy(reservoirPath, 'Texas lakes and reservoirs at a glance');
for (const expected of [
  'How many major reservoirs?',
  '188 major water-supply reservoirs',
  'cannot all describe the same inventory',
  'William L. Farr',
  'CC BY-SA 4.0',
  'Big_Cypress_Bayou,_Caddo_Lake_State_Park',
  'Existing_Major_Water_Supply_Reservoirs_042026.pdf',
  'Recommended_New_Major_Water_Supply_Reservoirs_042026.pdf',
  'Arbuckle Reservoir',
  'off-channel reservoirs',
  '2027 State Water Plan',
  'waterdatafortexas.org/reservoirs/statewide',
  'Sources and further reading',
  '/fishing/lakes/lake-conroe',
  '/images/illustrations/texas-reservoir-on-off-channel.svg',
  '/images/illustrations/texas-reservoir-conservation-flood-pools.svg',
]) {
  if (!reservoirHtml.body.includes(expected)) {
    throw new Error(`${reservoirPath} is missing deployed authority content: ${expected}`);
  }
}
for (const stale of [
  'Texas did not begin with a landscape full of big lakes',
  'Find the dam. It immediately tells you which end of the lake is deepest',
  'A reservoir begins with a dam. Engineers build a barrier',
  'nearly every familiar inland lake is really a river or creek held behind a dam',
  'If a dam created the permanent pool by impounding a stream or river',
]) {
  if (reservoirHtml.body.includes(stale)) {
    throw new Error(`${reservoirPath} still serves obsolete text: ${stale}`);
  }
}
for (const imageName of [
  'texas-reservoir-on-off-channel.svg',
  'texas-reservoir-conservation-flood-pools.svg',
]) {
  const imagePath = `/images/illustrations/${imageName}`;
  const imageResponse = await fetch(`${origin}${imagePath}?td_verify=${encodeURIComponent(verifyToken)}`, {
    redirect: 'follow', cache: 'no-store', signal: AbortSignal.timeout(30_000),
    headers: { 'user-agent': userAgent, accept: 'image/svg+xml' },
  });
  const imageType = (imageResponse.headers.get('content-type') || '').toLowerCase();
  const svg = await imageResponse.text();
  if (!imageResponse.ok || !imageType.includes('image/svg+xml')
      || !svg.includes('<svg ') || !svg.includes('<title ') || !svg.includes('<desc ')
      || !svg.includes('</svg>')) {
    throw new Error(`Reservoir diagram failed actual asset delivery: ${imagePath} ${JSON.stringify({
      status: imageResponse.status, contentType: imageType, length: svg.length,
    })}`);
  }
  console.log(JSON.stringify({ surface: imagePath, status: imageResponse.status, type: imageType, bytes: svg.length, ok: true }));
}
console.log(JSON.stringify({
  surface: reservoirPath,
  status: reservoirHtml.status,
  sourcedFacts: true,
  diagrams: 2,
  staleTextAbsent: true,
  ok: true,
}));

const liveNewsPath = firstPublishedNewsPath(news.body);
if (!liveNewsPath) {
  console.log(JSON.stringify({ verified: true, newsStatus: news.status, publishedNewsPresent: false, reason: 'No routed published news is currently exposed; auto-publication remains disabled.' }));
  process.exit(0);
}
const story = await fetchHealthy(liveNewsPath);
const expectedCanonical = `${origin}${liveNewsPath}`;
if (!story.body.includes(expectedCanonical)) throw new Error(`${liveNewsPath} is live but does not expose its expected canonical URL ${expectedCanonical}`);
if (!sitemap.body.includes(`<loc>${expectedCanonical}</loc>`)) {
  throw new Error(`${liveNewsPath} is live but missing from /sitemap.xml`);
}
// Check the first actually published, routed story rather than binding the
// publication smoke to a historical fixed slug.
if (!story.body.includes('"@type":"NewsArticle"')) throw new Error(`${liveNewsPath} is missing Article structured data`);
if (!/href=["\']\/authors\/a-[^"\']+["\']/.test(story.body)) throw new Error(`${liveNewsPath} is missing its institutional editorial byline link`);
console.log(JSON.stringify({ surface: liveNewsPath, status: story.status, canonical: expectedCanonical, ok: true }));
console.log(JSON.stringify({ verified: true, newsStatus: news.status, liveNewsStatus: story.status, liveNewsPath, publishedNewsPresent: true }));
