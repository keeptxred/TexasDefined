import fs from 'node:fs';

const origin = new URL(process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com').origin;
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const contractOnly = process.argv.includes('--contract-only');
const fallbackText = 'Venue details and planning information continue below.';
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

const read = (filePath) => fs.readFileSync(filePath, 'utf8');
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
    sourcePage: stringField('sourcePage'),
    sourceName: stringField('sourceName'),
    author: stringField('author'),
    licenseName: stringField('licenseName'),
  };
});

const route = read('src/routes/sports-venue.$slug.tsx');
const staticRoute = read('src/routes/sports-venue.jones-att-stadium.tsx');
const routeBlock = route.match(/const sportsVenueGuidePilotSlugs = new Set\(\[([\s\S]*?)\]\);/)?.[1] ?? '';
const dynamicSlugs = [...routeBlock.matchAll(/'([^']+)'/g)].map((match) => match[1]);
const staticSlug = staticRoute.match(/const stableSlug = '([^']+)'/)?.[1] ?? '';
const governedSlugs = [...dynamicSlugs, ...(staticSlug ? [staticSlug] : [])];
const governed = new Set(governedSlugs);

const effective = new Map();
for (const registryPath of registryPaths) {
  for (const entry of recordEntries(read(registryPath))) {
    if (!effective.has(entry.slug)) effective.set(entry.slug, entry);
  }
}

const missingSlugs = governedSlugs.filter((slug) => !effective.has(slug)).sort();
const extraSlugs = [...effective.keys()].filter((slug) => !governed.has(slug)).sort();
const contractFailures = [];

if (!dynamicSlugs.length || !staticSlug) contractFailures.push('Could not derive the full governed sports venue inventory.');
if (governed.size !== governedSlugs.length) contractFailures.push('Governed sports venue inventory contains duplicate slugs.');
if (extraSlugs.length) contractFailures.push(`Hero registry contains ungoverned slugs: ${extraSlugs.join(', ')}.`);
for (const [slug, entry] of effective) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) contractFailures.push(`Invalid governed venue slug: ${slug}.`);
  if (!entry.alt.trim()) contractFailures.push(`Missing governed alt text: ${slug}.`);
  if (!entry.imageUrl.trim()) contractFailures.push(`Missing governed image URL: ${slug}.`);
  if (!entry.sourceName.trim()) contractFailures.push(`Missing governed source name: ${slug}.`);
  if (!entry.author.trim()) contractFailures.push(`Missing governed author: ${slug}.`);
  if (!entry.licenseName.trim()) contractFailures.push(`Missing governed license name: ${slug}.`);
  const generated = entry.sourceName === 'Texas Defined generated media' || /^AI-generated\b/i.test(entry.licenseName);
  if (generated && slug !== 'xtreme-raceway-park') contractFailures.push(`Unapproved generated venue hero: ${slug}.`);
}
if (!effective.has('xtreme-raceway-park')) contractFailures.push('Owner-approved Xtreme Raceway hero is missing.');

if (contractFailures.length) {
  console.error('Sports venue exhaustive production audit contract failed:');
  for (const failure of contractFailures) console.error(`- ${failure}`);
  process.exit(1);
}

if (contractOnly) {
  console.log(`PASS: production audit dynamically derives ${effective.size}/${governed.size} approved sports venue heroes and ${missingSlugs.length} intentional fallbacks.`);
  console.log(`Intentional fallback slugs: ${missingSlugs.join(', ') || 'none'}`);
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
      'user-agent': 'TexasDefined-CI-Sports-Venue-Exhaustive/1.2 (+https://texasdefined.com)',
      ...(init.headers ?? {}),
    },
  });
}

async function inspectEndpoint(endpointUrl, expectedImageUrl) {
  const expectedLocation = new URL(expectedImageUrl, origin).toString();
  const manual = await fetchWithTimeout(endpointUrl, { redirect: 'manual' });
  const challenge = manual.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
  const location = manual.headers.get('location') ?? '';
  const actualLocation = location ? new URL(location, origin).toString() : '';
  const redirectOk = !challenge && [301, 302, 307, 308].includes(manual.status) && actualLocation === expectedLocation;
  await manual.body?.cancel();

  let health = await fetchWithTimeout(endpointUrl, { method: 'HEAD', redirect: 'follow' });
  let healthChallenge = health.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
  let contentType = health.headers.get('content-type') ?? '';
  let bytes = Number(health.headers.get('content-length') ?? 0);
  let target = health.url;
  const local = expectedImageUrl.startsWith('/');

  if (!health.ok || healthChallenge || !contentType.toLowerCase().startsWith('image/') || (local && bytes < 10_000)) {
    await health.body?.cancel();
    health = await fetchWithTimeout(endpointUrl, { method: 'GET', redirect: 'follow', headers: { range: 'bytes=0-16383' } });
    healthChallenge = health.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
    contentType = health.headers.get('content-type') ?? '';
    const buffer = await health.arrayBuffer();
    bytes = Math.max(bytes, buffer.byteLength);
    target = health.url;
  } else {
    await health.body?.cancel();
  }

  const targetUrl = new URL(target);
  const expectedUrl = new URL(expectedImageUrl, origin);
  const localTargetOk = !local || (targetUrl.origin === expectedUrl.origin && targetUrl.pathname === expectedUrl.pathname);
  const imageOk = !healthChallenge && health.ok && contentType.toLowerCase().startsWith('image/') && localTargetOk && (!local || bytes >= 10_000);

  return { ok: redirectOk && imageOk, status: manual.status, healthStatus: health.status, contentType, bytes, target, expectedLocation, actualLocation, redirectOk, imageOk };
}

async function inspectPhoto(slug, entry, attempt) {
  const token = `${process.env.DEPLOY_SHA ?? process.env.GITHUB_SHA ?? 'local'}-${process.env.GITHUB_RUN_ID ?? Date.now()}-${slug}-${attempt}`;
  const pageUrl = `${origin}/sports-venue/${slug}?verify=${encodeURIComponent(token)}`;
  const endpointPath = `/api/sports-venue-hero?slug=${encodeURIComponent(slug)}`;
  const endpointUrl = `${origin}${endpointPath}&verify=${encodeURIComponent(token)}`;
  const pageResponse = await fetchWithTimeout(pageUrl, { redirect: 'follow' });
  const pageChallenge = pageResponse.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
  const decodedBody = decodeHtmlText(await pageResponse.text());
  const generated = /^AI-generated\b/i.test(entry.licenseName);
  const missing = [];

  if (!decodedBody.includes(endpointPath) && !decodedBody.includes(`${origin}${endpointPath}`)) missing.push('same-origin governed hero endpoint');
  if (!decodedBody.includes(entry.alt)) missing.push(`alt text: ${entry.alt}`);
  if (generated) {
    if (!decodedBody.includes('Editorial illustration by')) missing.push('editorial-illustration disclosure');
    if (!decodedBody.includes('not documentary photography')) missing.push('not-documentary-photography disclosure');
    if (!decodedBody.includes(entry.author)) missing.push(`generated-media author: ${entry.author}`);
  } else {
    if (!decodedBody.includes('Photo by') && !decodedBody.includes('Photo:')) missing.push('real-photo attribution label');
    if (!decodedBody.includes(entry.author)) missing.push(`photo author: ${entry.author}`);
    if (!decodedBody.includes(entry.sourceName)) missing.push(`photo source: ${entry.sourceName}`);
  }

  const endpoint = await inspectEndpoint(endpointUrl, entry.imageUrl);
  const fallbackPresent = decodedBody.includes(fallbackText);
  return {
    ok: !pageChallenge && pageResponse.ok && !fallbackPresent && missing.length === 0 && endpoint.ok,
    slug,
    kind: generated ? 'approved generated exception' : 'real/reusable photo',
    pageStatus: pageResponse.status,
    endpointStatus: endpoint.status,
    imageStatus: endpoint.healthStatus,
    missing,
    fallbackPresent,
    ...endpoint,
  };
}

async function inspectFallback(slug, attempt) {
  const token = `${process.env.DEPLOY_SHA ?? process.env.GITHUB_SHA ?? 'local'}-${process.env.GITHUB_RUN_ID ?? Date.now()}-${slug}-fallback-${attempt}`;
  const pageUrl = `${origin}/sports-venue/${slug}?verify=${encodeURIComponent(token)}`;
  const endpointUrl = `${origin}/api/sports-venue-hero?slug=${encodeURIComponent(slug)}&verify=${encodeURIComponent(token)}`;
  const [pageResponse, endpointResponse] = await Promise.all([
    fetchWithTimeout(pageUrl, { redirect: 'follow' }),
    fetchWithTimeout(endpointUrl, { redirect: 'manual' }),
  ]);
  const pageChallenge = pageResponse.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
  const endpointChallenge = endpointResponse.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
  const decodedBody = decodeHtmlText(await pageResponse.text());
  await endpointResponse.body?.cancel();
  const fallbackPresent = decodedBody.includes(fallbackText);
  return {
    ok: !pageChallenge && pageResponse.ok && !endpointChallenge && endpointResponse.status === 404 && fallbackPresent,
    slug,
    kind: 'intentional fallback',
    pageStatus: pageResponse.status,
    endpointStatus: endpointResponse.status,
    fallbackPresent,
  };
}

async function verifyWithRetry(fn, slug) {
  let last;
  let errorText = '';
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      last = await fn(attempt);
      if (last.ok) return last;
      errorText = JSON.stringify(last);
    } catch (error) {
      errorText = error instanceof Error ? error.message : String(error);
    }
    if (attempt < 4) await sleep(4_000 * attempt);
  }
  throw new Error(errorText || `${slug} failed live verification.`);
}

const checks = [
  ...[...effective.entries()].map(([slug, entry]) => ({ slug, run: (attempt) => inspectPhoto(slug, entry, attempt) })),
  ...missingSlugs.map((slug) => ({ slug, run: (attempt) => inspectFallback(slug, attempt) })),
].sort((a, b) => a.slug.localeCompare(b.slug));

const results = [];
const failures = [];
let cursor = 0;
const workerCount = Math.min(2, checks.length);

async function worker() {
  while (true) {
    const index = cursor++;
    if (index >= checks.length) return;
    const check = checks[index];
    try {
      const result = await verifyWithRetry(check.run, check.slug);
      results.push(result);
      console.log(`[sports-venue-all] PASS ${check.slug} ${result.kind} page=${result.pageStatus} endpoint=${result.endpointStatus}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push({ slug: check.slug, message });
      console.error(`::error title=LIVE PRODUCTION sports venue hero failure::${check.slug}: ${message}`);
    }
    await sleep(250);
  }
}

await Promise.all(Array.from({ length: workerCount }, () => worker()));

appendSummary('\n## Exhaustive sports venue hero production audit\n\n');
appendSummary(`Governed venues: ${governed.size}. Approved heroes: ${effective.size}. Intentional fallbacks: ${missingSlugs.length}.\n\n`);
appendSummary('| Result | Venue | Page | Hero endpoint | State |\n|---|---|---:|---:|---|\n');
const resultBySlug = new Map(results.map((result) => [result.slug, result]));
const failureBySlug = new Map(failures.map((failure) => [failure.slug, failure]));
for (const slug of [...governed].sort()) {
  const result = resultBySlug.get(slug);
  if (result) appendSummary(`| ✅ | ${slug} | ${result.pageStatus} | ${result.endpointStatus} | ${result.kind} |\n`);
  else appendSummary(`| ❌ | ${slug} | — | — | ${failureBySlug.get(slug)?.message ?? 'failed'} |\n`);
}

if (failures.length) {
  console.error(`Exhaustive sports venue production audit failed: ${failures.length}/${checks.length} governed venues failed.`);
  for (const failure of failures) console.error(`- ${failure.slug}: ${failure.message}`);
  process.exit(1);
}

console.log(`PASS: production audit verified all ${governed.size} governed venue pages: ${effective.size} approved heroes and ${missingSlugs.length} intentional fail-closed fallbacks.`);
