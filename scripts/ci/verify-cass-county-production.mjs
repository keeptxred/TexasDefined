// Cass County authority is not certified merely because a source file contains
// musician names. Verify the *published, indexable* visitor experience, including
// the structured county geography and both the regular and cache-busted routes.
// This is read-only: no cache purge, production edits, or external bookings.
export const cassCanonicalPath = '/county/cass';
export const cassOrigins = [
  'https://texasdefined.com',
  'https://texasdefined-site.freddy-coppola.workers.dev',
];
export const cassRequiredMarkers = [
  'What the data says about Cass County',
  'Atlanta, Hughes Springs, Queen City, Avinger, and Bloomburg',
  'Cass County includes communities such as Linden, Atlanta, Hughes Springs',
  'Richard Bowden: from Linden bands to Pinkard',
  'Pinkard &amp; Bowden',
  'Music City Texas Theater: a concert room with a local mission',
  '108 Legion Street',
  'Cass County Boys',
  'T-Bone Walker Blues Festival',
  'The Four Speeds, Felicity and Shiloh',
  '1939 Linden Firehouse',
  'Research and official records',
];

export function assertCassCountyAuthority(html, url) {
  if (!html.includes('Cass County') || !html.includes('/county/cass'))
    throw new Error(url + ': Cass County canonical identity or page title missing');
  const robotsMeta = [...html.matchAll(/<meta[^>]*>/gi)].map((match) => match[0].toLowerCase());
  if (robotsMeta.some((tag) => (tag.includes('name="robots"') || tag.includes("name='robots'"))
      && tag.includes('noindex')))
    throw new Error(url + ': Cass County incorrectly noindexed');
  // React streams adjacent static/dynamic text with hydration comment boundaries,
  // e.g. "What the data says about <!-- -->Cass County". Test what readers
  // actually see, not a raw HTML byte sequence. Exclude scripts/styles rather
  // than accidentally accepting invisible JS payloads as editorial content.
  const visibleText = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;|&#38;|&#x26;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
  for (const marker of cassRequiredMarkers) {
    const expected = marker.replace(/&amp;|&#38;|&#x26;/gi, '&');
    if (!visibleText.includes(expected))
      throw new Error(url + ': required live Cass County evidence missing: ' + expected);
  }
  if (html.includes('Texas Defined does not add an unsourced list of local communities.'))
    throw new Error(url + ': Cass County still renders the old one-town structured place gap');
}

async function check(origin, fresh) {
  const url = new URL(cassCanonicalPath, origin);
  if (fresh) url.searchParams.set('__cass_authority', String(Date.now()));
  const response = await fetch(url, {
    headers: {Accept: 'text/html', 'Cache-Control': 'no-cache', 'User-Agent': 'TexasDefined-Cass-Authority-Acceptance/1.0'},
    signal: AbortSignal.timeout(20000),
  });
  if (response.status !== 200 || !(response.headers.get('content-type') || '').toLowerCase().includes('text/html')
      || response.headers.get('cf-mitigated') === 'challenge')
    throw new Error(url + ': expected ordinary HTML 200, got ' + response.status + ' ' + response.headers.get('content-type'));
  const html = await response.text();
  assertCassCountyAuthority(html, String(url));
  console.log('PASS ' + url.origin + cassCanonicalPath + (fresh ? ' [cache-busted]' : ' [visitor URL]')
    + ' version=' + (response.headers.get('x-texasdefined-worker-version') || 'not-advertised'));
}

if (process.argv[1]?.endsWith('/verify-cass-county-production.mjs')) {
  for (const origin of cassOrigins) {
    await check(origin, false);
    await check(origin, true);
  }
  console.log('Cass County published music/places/history authority: PASS (both origins, ordinary and cache-busted)');
}
