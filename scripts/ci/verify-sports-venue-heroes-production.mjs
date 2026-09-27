import { appendFileSync, readFileSync } from 'node:fs';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const fallbackText = 'A verified venue photograph is not available yet.';

const wave7RealPhotoAttribution = {
  'round-rock-sports-center': ['Wikimedia Commons', 'Tony Webster', 'CC BY 2.0'],
  'texas-motorplex': ['Wikimedia Commons', 'Michael Barera', 'CC BY-SA 4.0'],
};

const registryPaths = [
  'src/data/sports-venue-images-curated-overrides.ts',
  'src/data/sports-venue-images.ts',
  'src/data/sports-venue-images-additions.ts',
  'src/data/sports-venue-images-additions-wave2.ts',
  'src/data/sports-venue-images-additions-wave3.ts',
  'src/data/sports-venue-images-additions-wave4.ts',
  'src/data/sports-venue-images-additions-wave5.ts',
  'src/data/sports-venue-images-additions-wave6.ts',
  'src/data/sports-venue-images-additions-wave7.ts',
];

const decodeTsString = (value) => value
  .replace(/\\'/g, "'")
  .replace(/\\"/g, '"')
  .replace(/\\n/g, '\n')
  .replace(/\\r/g, '\r')
  .replace(/\\t/g, '\t')
  .replace(/\\\\/g, '\\');

const recordEntries = (source) => [...source.matchAll(/^  ["']([^"']+)["']: \{\n([\s\S]*?)^  \},$/gm)].map((match) => {
  const body = match[2];
  const stringField = (name) => {
    const field = body.match(new RegExp(`\\b${name}:\\s*(["'])((?:\\\\.|(?!\\1)[\\s\\S])*?)\\1`));
    return field ? decodeTsString(field[2]) : '';
  };
  return {
    slug: match[1],
    alt: stringField('alt'),
    imageUrl: stringField('imageUrl'),
    sourceName: stringField('sourceName'),
    author: stringField('author'),
    licenseName: stringField('licenseName'),
  };
};

const governedPhotos = new Map();
for (const registryPath of registryPaths) {
  for (const entry of recordEntries(readFileSync(registryPath, 'utf8'))) {
    if (!governedPhotos.has(entry.slug)) governedPhotos.set(entry.slug, entry);
  }
}

const fallbackVenues = [
  'amarillo-national-center',
  'colonial-country-club',
  'cy-fair-fcu-stadium',
  'expo-center-taylor-county',
  'hodgetown',
  'houston-motorsports-park',
  'waco-surf',
];

const approvedSlugs = [
  'round-rock-sports-center',
  'texas-motorplex',
  'xtreme-raceway-park',
  'childrens-health-stadium-prosper',
];

const xtremeRacewayPhoto = governedPhotos.get('xtreme-raceway-park');
if (!xtremeRacewayPhoto) throw new Error('Missing governed sports venue photo metadata for xtreme-raceway-park.');

const approvedVenues = approvedSlugs.map((slug) => {
  const governedPhoto = governedPhotos.get(slug);
  if (!governedPhoto) throw new Error(`Missing governed sports venue photo metadata for ${slug}.`);
  const expectedImageUrl = governedPhoto.imageUrl;
  const assetPath = expectedImageUrl.startsWith('/') ? expectedImageUrl : undefined;
  const generated = /^AI-generated\b/i.test(governedPhoto.licenseName);
  const attributionMarkers = generated
    ? ['Editorial illustration by', governedPhoto.author, 'for TexasDefined; not documentary photography.']
    : (wave7RealPhotoAttribution[slug] ?? [governedPhoto.sourceName, governedPhoto.author, governedPhoto.licenseName]);
  return {
    slug,
    path: `/sports-venue/${slug}`,
    assetPath,
    expectedImageUrl,
    heroEndpointPath: `/api/sports-venue-hero?slug=${encodeURIComponent(slug)}`,
    required: [governedPhoto.alt, ...attributionMarkers],
  };
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const appendSummary = (value) => { if (summaryPath) appendFileSync(summaryPath, value); };

function decodeHtmlText(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, decimal) => String.fromCodePoint(Number.parseInt(decimal, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

async function fetchCi(url, init = {}) {
  return fetch(url, {
    ...init,
    cache: 'no-store',
    signal: AbortSignal.timeout(30_000),
    headers: { 'user-agent': 'TexasDefined-CI-Production-Smoke/1.0', ...(init.headers ?? {}) },
  });
}

async function inspectHeroEndpoint(heroEndpointPath, expectedImageUrl, token) {
  const separator = heroEndpointPath.includes('?') ? '&' : '?';
  const endpointUrl = `${origin}${heroEndpointPath}${separator}verify=${encodeURIComponent(token)}`;
  const expectedLocation = new URL(expectedImageUrl, origin).toString();
  const manual = await fetchCi(endpointUrl, { redirect: 'manual' });
  const actualLocation = manual.headers.get('location')
    ? new URL(manual.headers.get('location'), origin).toString()
    : '';
  const redirectOk = [301, 302, 307, 308].includes(manual.status) && actualLocation === expectedLocation;
  await manual.body?.cancel();

  const health = await fetchCi(endpointUrl, { redirect: 'follow', headers: { range: 'bytes=0-16383' } });
  const type = health.headers.get('content-type') ?? '';
  const bytes = (await health.arrayBuffer()).byteLength;
  const imageOk = health.ok && type.toLowerCase().startsWith('image/') && bytes > 0;
  return { ok: redirectOk && imageOk, status: manual.status, actualLocation, expectedLocation, imageStatus: health.status, type, bytes };
}

async function verifyApproved(venue) {
  let lastError = '';
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const token = `${sha}-${runId}-approved-${venue.slug}-${attempt}`;
    try {
      const response = await fetchCi(`${origin}${venue.path}?verify=${encodeURIComponent(token)}`, { redirect: 'follow' });
      const lastBody = await response.text();
      const decoded = decodeHtmlText(lastBody);
      const missing = venue.required.filter((needle) => !lastBody.includes(needle) && !decoded.includes(needle));
      const fallbackPresent = decoded.includes(fallbackText);
      const endpoint = await inspectHeroEndpoint(venue.heroEndpointPath, venue.expectedImageUrl ?? venue.assetPath, token);
      if (response.ok && !fallbackPresent && missing.length === 0 && endpoint.ok) {
        appendSummary(`| ✅ approved | ${venue.slug} | ${response.status} | ${endpoint.status} | ${endpoint.imageStatus} |\n`);
        return;
      }
      lastError = [
        !response.ok ? `page HTTP ${response.status}` : '',
        fallbackPresent ? 'fallback rendered' : '',
        missing.length ? `missing ${missing.join(' | ')}` : '',
        !endpoint.ok ? `hero endpoint mismatch ${endpoint.actualLocation || '(none)'} != ${endpoint.expectedLocation}` : '',
      ].filter(Boolean).join('; ');
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    if (attempt < 4) await sleep(4_000 * attempt);
  }
  throw new Error(`${venue.slug}: ${lastError || 'approved hero verification failed'}`);
}

async function verifyFallback(slug) {
  if (governedPhotos.has(slug)) throw new Error(`${slug}: fallback venue unexpectedly has governed photo metadata.`);
  let lastError = '';
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const token = `${sha}-${runId}-fallback-${slug}-${attempt}`;
    try {
      const page = await fetchCi(`${origin}/sports-venue/${slug}?verify=${encodeURIComponent(token)}`, { redirect: 'follow' });
      const body = decodeHtmlText(await page.text());
      const endpoint = await fetchCi(`${origin}/api/sports-venue-hero?slug=${encodeURIComponent(slug)}&verify=${encodeURIComponent(token)}`, { redirect: 'manual' });
      const ok = page.ok && body.includes(fallbackText) && endpoint.status === 404;
      await endpoint.body?.cancel();
      if (ok) {
        appendSummary(`| ✅ fallback | ${slug} | ${page.status} | ${endpoint.status} | n/a |\n`);
        return;
      }
      lastError = `page=${page.status}, fallback=${body.includes(fallbackText)}, heroEndpoint=${endpoint.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    if (attempt < 4) await sleep(4_000 * attempt);
  }
  throw new Error(`${slug}: ${lastError || 'fail-closed verification failed'}`);
}

appendSummary('\n## Sports venue hero production verification\n\n');
appendSummary('| Result | Venue | Page HTTP | Hero endpoint | Image HTTP |\n|---|---|---:|---:|---:|\n');

for (const venue of approvedVenues) await verifyApproved(venue);
for (const slug of [fallbackVenues[0]]) await verifyFallback(slug);

console.log(`TexasDefined sports venue hero production verification passed: ${approvedVenues.length} representative approved heroes plus ${1} intentional fail-closed fallback verified.`);
