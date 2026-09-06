const origin = (process.env.TEXASDEFINED_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const userAgent = 'TexasDefined-RV-Parks-Production-Smoke/1.0';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

async function fetchText(pathname) {
  const response = await fetch(`${origin}${pathname}`, {
    headers: { 'user-agent': userAgent, accept: 'text/html,application/xml;q=0.9,*/*;q=0.8' },
    redirect: 'follow',
  });
  if (!response.ok) throw new Error(`${pathname} returned ${response.status}`);
  return { response, text: await response.text() };
}

function canonicalValues(html) {
  return [...html.matchAll(/<link\b[^>]*>/gi)]
    .filter((match) => /\brel=["']canonical["']/i.test(match[0]))
    .map((match) => match[0].match(/\bhref=["']([^"']+)/i)?.[1])
    .filter(Boolean)
    .map(decodeHtml);
}

function robotsValues(html) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)]
    .filter((match) => /\bname=["']robots["']/i.test(match[0]))
    .map((match) => match[0].match(/\bcontent=["']([^"']+)/i)?.[1])
    .filter(Boolean)
    .map((value) => decodeHtml(value).toLowerCase());
}

function imageCandidates(html) {
  const candidates = new Set();
  for (const tag of html.match(/<(?:meta|img)\b[^>]*>/gi) ?? []) {
    if (/<meta\b/i.test(tag) && !/\b(?:property|name)=["'](?:og:image|twitter:image)["']/i.test(tag)) continue;
    const value = tag.match(/\b(?:content|src)=["']([^"']+)/i)?.[1];
    if (value) candidates.add(decodeHtml(value));
  }
  return [...candidates];
}

async function verifyOnce() {
  const collectionPath = '/explore/rv-parks';
  const profilePath = '/destination/blanco-state-park-rv-area';
  const countyPath = '/county/blanco';
  const sitemapPath = '/sitemap-explore.xml';

  const [{ text: collection }, { text: profile }, { text: county }, { text: sitemap }] = await Promise.all([
    fetchText(collectionPath),
    fetchText(profilePath),
    fetchText(countyPath),
    fetchText(sitemapPath),
  ]);

  if (!/Texas RV Parks & Campgrounds/i.test(collection)) throw new Error('RV collection title/content missing.');
  if (canonicalValues(collection).join('|') !== `${origin}${collectionPath}`) throw new Error(`RV collection canonical mismatch: ${canonicalValues(collection).join(', ')}`);
  if (robotsValues(collection).some((value) => value.includes('noindex'))) throw new Error('RV collection unexpectedly noindex.');
  if (!collection.includes('Campground')) throw new Error('RV collection Campground schema/content missing.');

  if (!/Blanco State Park RV Area/i.test(profile)) throw new Error('Representative RV profile content missing.');
  if (canonicalValues(profile).join('|') !== `${origin}${profilePath}`) throw new Error(`RV profile canonical mismatch: ${canonicalValues(profile).join(', ')}`);
  if (!robotsValues(profile).some((value) => value.includes('noindex') && value.includes('follow'))) throw new Error(`RV seed profile is not protected by noindex, follow: ${robotsValues(profile).join(', ')}`);
  if (!profile.includes('CC BY 2.0') || !profile.includes('Charles Willgren')) throw new Error('Representative RV profile image attribution missing.');
  if (!profile.includes('commons.wikimedia.org')) throw new Error('Representative RV profile image source attribution missing.');

  if (!/RV camping around Blanco County/i.test(county)) throw new Error('Blanco County RV section missing.');
  if (!county.includes(profilePath)) throw new Error('Blanco County page missing representative RV profile link.');
  if (!county.includes(collectionPath)) throw new Error('Blanco County page missing statewide RV collection link.');

  if (!sitemap.includes(`${origin}${collectionPath}`)) throw new Error('Explore sitemap missing RV collection.');
  if (sitemap.includes(`${origin}${profilePath}`)) throw new Error('Thin RV seed profile leaked into Explore sitemap.');

  const hero = imageCandidates(profile).find((value) => value.includes('/media/remote?url=') || value.includes('commons.wikimedia.org'));
  if (!hero) throw new Error('Representative RV profile has no retrievable hero candidate.');
  const heroUrl = hero.startsWith('http') ? hero : `${origin}${hero.startsWith('/') ? '' : '/'}${hero}`;
  const heroResponse = await fetch(heroUrl, { headers: { 'user-agent': userAgent, accept: 'image/*,*/*;q=0.8' }, redirect: 'follow' });
  if (!heroResponse.ok) throw new Error(`Representative RV hero returned ${heroResponse.status}: ${heroUrl}`);
  const contentType = (heroResponse.headers.get('content-type') || '').toLowerCase();
  if (!contentType.startsWith('image/')) throw new Error(`Representative RV hero returned non-image MIME ${contentType || '(missing)'}.`);

  console.log('RV production verified: collection is canonical/indexable, representative seed profile is canonical/noindex, Blanco County discovery is live, sitemap excludes the thin profile, and the licensed hero returns an image response.');
}

let lastError;
for (let attempt = 1; attempt <= 10; attempt += 1) {
  try {
    await verifyOnce();
    process.exit(0);
  } catch (error) {
    lastError = error;
    console.warn(`RV production not ready; attempt ${attempt}/10: ${error instanceof Error ? error.message : String(error)}`);
    if (attempt < 10) await sleep(30_000);
  }
}

console.error('RV parks production verification failed after deployment propagation window.');
console.error(lastError instanceof Error ? lastError.stack : lastError);
process.exit(1);
