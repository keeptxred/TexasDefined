import fs from 'node:fs';

const origin = new URL(process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com').origin;
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const contractOnly = process.argv.includes('--contract-only');
const expectedVenueCount = 84;
const fallbackText = 'A verified venue photograph is not available yet.';
const registryPaths = [
  'src/data/sports-venue-images.ts',
  'src/data/sports-venue-images-additions.ts',
  'src/data/sports-venue-images-additions-wave2.ts',
  'src/data/sports-venue-images-additions-wave3.ts',
  'src/data/sports-venue-images-additions-wave4.ts',
  'src/data/sports-venue-images-additions-wave5.ts',
  'src/data/sports-venue-images-additions-wave6.ts',
  'src/data/sports-venue-images-additions-wave7.ts',
];

const read = (filePath) => fs.readFileSync(filePath, 'utf8');
const recordEntries = (source) => [...source.matchAll(/^  ["']([^"']+)["']: \{\n([\s\S]*?)^  \},$/gm)].map((match) => {
  const body = match[2];
  const stringField = (name) => body.match(new RegExp(`\\b${name}:\\s*(["'])(.*?)\\1`))?.[2] ?? '';
  return {
    slug: match[1],
    alt: stringField('alt'),
    imageUrl: stringField('imageUrl'),
    sourcePage: stringField('sourcePage'),
    sourceName: stringField('sourceName'),
    author: stringField('author'),
    licenseName: stringField('licenseName'),
  };
});

const effective = new Map();
for (const registryPath of registryPaths) {
  for (const entry of recordEntries(read(registryPath))) {
    if (!effective.has(entry.slug)) effective.set(entry.slug, entry);
  }
}

const contractFailures = [];
if (effective.size !== expectedVenueCount) {
  contractFailures.push(`Expected ${expectedVenueCount} effective governed venue heroes; found ${effective.size}.`);
}
for (const [slug, entry] of effective) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) contractFailures.push(`Invalid governed venue slug: ${slug}.`);
  if (!entry.alt.trim()) contractFailures.push(`Missing governed alt text: ${slug}.`);
  if (!entry.imageUrl.trim()) contractFailures.push(`Missing governed image URL: ${slug}.`);
  if (!entry.sourceName.trim()) contractFailures.push(`Missing governed source name: ${slug}.`);
  if (!entry.author.trim()) contractFailures.push(`Missing governed author: ${slug}.`);
  if (!entry.licenseName.trim()) contractFailures.push(`Missing governed license name: ${slug}.`);
}

if (contractFailures.length) {
  console.error('Sports venue exhaustive production audit contract failed:');
  for (const failure of contractFailures) console.error(`- ${failure}`);
  process.exit(1);
}

if (contractOnly) {
  console.log(`PASS: exhaustive sports venue production audit derives ${effective.size}/${expectedVenueCount} governed venue heroes from the base-first registry chain.`);
  process.exit(0);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const decodeHtmlText = (value) => value
  .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
  .replace(/&#([0-9]+);/g, (_, decimal) => String.fromCodePoint(Number.parseInt(decimal, 10)))
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'")
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');

function appendSummary(text) {
  if (summaryPath) fs.appendFileSync(summaryPath, text);
}

async function fetchWithTimeout(url, init = {}) {
  return fetch(url, {
    ...init,
    cache: 'no-store',
    signal: AbortSignal.timeout(30_000),
    headers: {
      'user-agent': 'TexasDefined-CI-Sports-Venue-Exhaustive/1.0',
      ...(init.headers ?? {}),
    },
  });
}

async function inspectImage(imageUrl, token) {
  const target = new URL(imageUrl, origin);
  const local = imageUrl.startsWith('/');
  const url = new URL(target);
  url.searchParams.set('verify', token);

  if (local) {
    const response = await fetchWithTimeout(url, { redirect: 'follow' });
    const challenge = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
    const contentType = response.headers.get('content-type') ?? '';
    const bytes = (await response.arrayBuffer()).byteLength;
    return {
      ok: !challenge && response.ok && contentType.toLowerCase().startsWith('image/') && bytes >= 10_000,
      status: response.status,
      contentType,
      bytes,
      target: response.url,
    };
  }

  let response = await fetchWithTimeout(target, { method: 'HEAD', redirect: 'follow' });
  let contentType = response.headers.get('content-type') ?? '';
  let challenge = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
  if (!response.ok || challenge || !contentType.toLowerCase().startsWith('image/')) {
    response = await fetchWithTimeout(target, {
      method: 'GET',
      redirect: 'follow',
      headers: { range: 'bytes=0-0' },
    });
    contentType = response.headers.get('content-type') ?? '';
    challenge = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
    await response.body?.cancel();
  }
  return {
    ok: !challenge && response.ok && contentType.toLowerCase().startsWith('image/'),
    status: response.status,
    contentType,
    bytes: Number(response.headers.get('content-length') ?? 0),
    target: response.url,
  };
}

async function inspectOnce(slug, entry, attempt) {
  const token = `${process.env.GITHUB_SHA ?? 'local'}-${process.env.GITHUB_RUN_ID ?? Date.now()}-${slug}-${attempt}`;
  const pageUrl = `${origin}/sports-venue/${slug}?verify=${encodeURIComponent(token)}`;
  const endpointPath = `/api/sports-venue-hero?slug=${encodeURIComponent(slug)}`;
  const endpointUrl = `${origin}${endpointPath}&verify=${encodeURIComponent(token)}`;

  const pageResponse = await fetchWithTimeout(pageUrl, { redirect: 'follow' });
  const pageChallenge = pageResponse.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
  const body = await pageResponse.text();
  const decodedBody = decodeHtmlText(body);
  const generated = entry.sourceName === 'Texas Defined generated media' || /^AI-generated\b/i.test(entry.licenseName);
  const missing = [];

  if (!decodedBody.includes(endpointPath) && !decodedBody.includes(`${origin}${endpointPath}`)) missing.push('same-origin governed hero endpoint');
  if (!decodedBody.includes(entry.alt)) missing.push(`alt text: ${entry.alt}`);
  if (generated) {
    if (!decodedBody.includes('AI-generated representative editorial image')) missing.push('AI-generated representative editorial image disclosure');
    if (!decodedBody.includes('not documentary photography')) missing.push('not-documentary-photography disclosure');
    if (!decodedBody.includes(entry.author)) missing.push(`generated-media author: ${entry.author}`);
  } else {
    if (!decodedBody.includes('Photo by') && !decodedBody.includes('Photo:')) missing.push('real-photo attribution label');
    if (!decodedBody.includes(entry.author)) missing.push(`photo author: ${entry.author}`);
    if (!decodedBody.includes(entry.sourceName)) missing.push(`photo source: ${entry.sourceName}`);
  }

  const endpointResponse = await fetchWithTimeout(endpointUrl, { redirect: 'manual' });
  const endpointChallenge = endpointResponse.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
  const location = endpointResponse.headers.get('location') ?? '';
  const redirectStatuses = new Set([301, 302, 307, 308]);
  const expectedLocation = new URL(entry.imageUrl, origin).toString();
  const actualLocation = location ? new URL(location, origin).toString() : '';
  const endpointOk = !endpointChallenge && redirectStatuses.has(endpointResponse.status) && actualLocation === expectedLocation;

  const image = await inspectImage(entry.imageUrl, token);
  const fallbackPresent = decodedBody.includes(fallbackText);
  const pageOk = !pageChallenge && pageResponse.ok && !fallbackPresent && missing.length === 0;
  const ok = pageOk && endpointOk && image.ok;

  return {
    ok,
    slug,
    pageStatus: pageResponse.status,
    endpointStatus: endpointResponse.status,
    imageStatus: image.status,
    generated,
    missing,
    fallbackPresent,
    expectedLocation,
    actualLocation,
    imageType: image.contentType,
    imageTarget: image.target,
  };
}

async function verifyVenue(slug, entry) {
  let last;
  let lastError = '';
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      last = await inspectOnce(slug, entry, attempt);
      if (last.ok) return last;
      lastError = [
        last.fallbackPresent ? 'fallback rendered' : '',
        last.missing.length ? `missing: ${last.missing.join(' | ')}` : '',
        last.actualLocation !== last.expectedLocation ? `hero redirect mismatch: ${last.actualLocation || '(none)'} != ${last.expectedLocation}` : '',
        last.imageType.toLowerCase().startsWith('image/') ? '' : `image MIME: ${last.imageType || '(none)'}`,
      ].filter(Boolean).join('; ');
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    if (attempt < 3) await sleep(2_500);
  }
  throw new Error(lastError || `${slug} failed exhaustive live hero verification.`);
}

const entries = [...effective.entries()].sort(([a], [b]) => a.localeCompare(b));
const results = [];
const failures = [];
let cursor = 0;
const workerCount = Math.min(6, entries.length);

async function worker() {
  while (true) {
    const index = cursor;
    cursor += 1;
    if (index >= entries.length) return;
    const [slug, entry] = entries[index];
    try {
      const result = await verifyVenue(slug, entry);
      results.push(result);
      console.log(`[sports-venue-all] PASS ${slug} page=${result.pageStatus} endpoint=${result.endpointStatus} image=${result.imageStatus}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push({ slug, message });
      console.error(`::error title=LIVE PRODUCTION sports venue exhaustive hero failure::${slug}: ${message}`);
    }
  }
}

await Promise.all(Array.from({ length: workerCount }, () => worker()));

appendSummary('\n## Exhaustive sports venue hero production audit\n\n');
appendSummary(`Verified ${results.length}/${entries.length} governed venue heroes against ${origin}.\n\n`);
appendSummary('| Result | Venue | Page | Hero endpoint | Image | Media kind |\n|---|---|---:|---:|---:|---|\n');
const passedBySlug = new Map(results.map((result) => [result.slug, result]));
const failedBySlug = new Map(failures.map((failure) => [failure.slug, failure]));
for (const [slug] of entries) {
  const result = passedBySlug.get(slug);
  if (result) {
    appendSummary(`| ✅ | ${slug} | ${result.pageStatus} | ${result.endpointStatus} | ${result.imageStatus} | ${result.generated ? 'AI-generated representative' : 'real/reusable photo'} |\n`);
  } else {
    appendSummary(`| ❌ | ${slug} | — | — | — | ${failedBySlug.get(slug)?.message ?? 'failed'} |\n`);
  }
}

if (failures.length) {
  console.error(`Exhaustive sports venue hero production audit failed: ${failures.length}/${entries.length} venues failed.`);
  for (const failure of failures) console.error(`- ${failure.slug}: ${failure.message}`);
  process.exit(1);
}

console.log(`PASS: exhaustive sports venue hero production audit verified ${results.length}/${entries.length} governed venue pages, attribution semantics, exact same-origin hero redirects, and live image health.`);
