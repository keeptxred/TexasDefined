import fs from 'node:fs';

const origin = new URL(process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com').origin;
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const contractOnly = process.argv.includes('--contract-only');
const expectedVenueCount = 84;
const fallbackText = 'A verified venue photograph is not available yet.';
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
const generatedDisclosureMarkers = [
  'AI-generated representative editorial image',
  'Editorial illustration by',
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

// Registry order mirrors src/data/sports-venue-images-all.ts: curated overrides win,
// then the base registry, then Wave 1-7 additions.
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

const generatedCreditSources = [
  ['sports venue quick-answer hero', read('src/components/sports/SportsVenueQuickAnswers.tsx')],
  ['sports venue guide source section', read('src/components/sports/SportsVenueGuidePage.tsx')],
];
for (const [label, source] of generatedCreditSources) {
  if (!generatedDisclosureMarkers.some((marker) => source.includes(marker))) {
    contractFailures.push(`${label} must retain an approved generated/illustrative media disclosure marker.`);
  }
  if (!source.includes('not documentary photography')) {
    contractFailures.push(`${label} must explicitly state that generated venue media is not documentary photography.`);
  }
}

const usesConciseIllustrationCredit = generatedCreditSources.some(([, source]) => source.includes('Editorial illustration by'));
if (usesConciseIllustrationCredit) {
  const footerSource = read('src/components/layout/Footer.tsx');
  const editorialPolicySource = read('src/routes/editorial-policy.tsx');
  if (!footerSource.includes('Some imagery on this site may be AI-generated or AI-enhanced.')) {
    contractFailures.push('Concise venue illustration credits require the sitewide footer AI-imagery disclosure.');
  }
  if (!editorialPolicySource.includes('Images, illustrations and AI-generated media')) {
    contractFailures.push('Concise venue illustration credits require the Editorial Policy AI-media section.');
  }
  if (!editorialPolicySource.includes('should not be interpreted as documentary photography')) {
    contractFailures.push('Editorial Policy must explain that generated imagery is not documentary photography.');
  }
}

if (contractFailures.length) {
  console.error('Sports venue exhaustive production audit contract failed:');
  for (const failure of contractFailures) console.error(`- ${failure}`);
  process.exit(1);
}

if (contractOnly) {
  console.log(`PASS: exhaustive sports venue production audit derives ${effective.size}/${expectedVenueCount} governed venue heroes from the curated-first production registry chain, safely parses escaped metadata strings, and validates generated-media disclosure semantics.`);
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
  const manualChallenge = manual.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
  const location = manual.headers.get('location') ?? '';
  const actualLocation = location ? new URL(location, origin).toString() : '';
  const redirectStatuses = new Set([301, 302, 307, 308]);
  const redirectOk = !manualChallenge && redirectStatuses.has(manual.status) && actualLocation === expectedLocation;
  await manual.body?.cancel();

  const local = expectedImageUrl.startsWith('/');
  let health = await fetchWithTimeout(endpointUrl, { method: 'HEAD', redirect: 'follow' });
  let healthChallenge = health.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
  let contentType = health.headers.get('content-type') ?? '';
  let bytes = Number(health.headers.get('content-length') ?? 0);
  let target = health.url;

  const needsGet = !health.ok
    || healthChallenge
    || !contentType.toLowerCase().startsWith('image/')
    || (local && bytes < 10_000);

  if (needsGet) {
    await health.body?.cancel();
    health = await fetchWithTimeout(endpointUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: { range: 'bytes=0-16383' },
    });
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
  const localBytesOk = !local || bytes >= 10_000;
  const imageOk = !healthChallenge
    && health.ok
    && contentType.toLowerCase().startsWith('image/')
    && localTargetOk
    && localBytesOk;

  return {
    ok: redirectOk && imageOk,
    status: manual.status,
    healthStatus: health.status,
    contentType,
    bytes,
    target,
    expectedLocation,
    actualLocation,
    redirectOk,
    imageOk,
  };
}

async function inspectOnce(slug, entry, attempt) {
  const token = `${process.env.DEPLOY_SHA ?? process.env.GITHUB_SHA ?? 'local'}-${process.env.GITHUB_RUN_ID ?? Date.now()}-${slug}-${attempt}`;
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
    if (!generatedDisclosureMarkers.some((marker) => decodedBody.includes(marker))) missing.push('generated/illustrative media disclosure');
    if (!decodedBody.includes('not documentary photography')) missing.push('not-documentary-photography disclosure');
    if (!decodedBody.includes(entry.author)) missing.push(`generated-media author: ${entry.author}`);
  } else {
    if (!decodedBody.includes('Photo by') && !decodedBody.includes('Photo:')) missing.push('real-photo attribution label');
    if (!decodedBody.includes(entry.author)) missing.push(`photo author: ${entry.author}`);
    if (!decodedBody.includes(entry.sourceName)) missing.push(`photo source: ${entry.sourceName}`);
  }

  const endpoint = await inspectEndpoint(endpointUrl, entry.imageUrl);
  const fallbackPresent = decodedBody.includes(fallbackText);
  const pageOk = !pageChallenge && pageResponse.ok && !fallbackPresent && missing.length === 0;
  const ok = pageOk && endpoint.ok;

  return {
    ok,
    slug,
    pageStatus: pageResponse.status,
    endpointStatus: endpoint.status,
    imageStatus: endpoint.healthStatus,
    generated,
    missing,
    fallbackPresent,
    expectedLocation: endpoint.expectedLocation,
    actualLocation: endpoint.actualLocation,
    imageType: endpoint.contentType,
    imageTarget: endpoint.target,
    imageBytes: endpoint.bytes,
    redirectOk: endpoint.redirectOk,
    imageOk: endpoint.imageOk,
  };
}

async function verifyVenue(slug, entry) {
  let last;
  let lastError = '';
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      last = await inspectOnce(slug, entry, attempt);
      if (last.ok) return last;
      lastError = [
        last.fallbackPresent ? 'fallback rendered' : '',
        last.missing.length ? `missing: ${last.missing.join(' | ')}` : '',
        !last.redirectOk ? `hero redirect mismatch: ${last.actualLocation || '(none)'} != ${last.expectedLocation}` : '',
        !last.imageOk ? `image health failed: status=${last.imageStatus} type=${last.imageType || '(none)'} bytes=${last.imageBytes} target=${last.imageTarget || '(none)'}` : '',
      ].filter(Boolean).join('; ');
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    if (attempt < 4) await sleep(4_000 * attempt);
  }
  throw new Error(lastError || `${slug} failed exhaustive live hero verification.`);
}

const entries = [...effective.entries()].sort(([a], [b]) => a.localeCompare(b));
const results = [];
const failures = [];
let cursor = 0;
const workerCount = Math.min(2, entries.length);

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
    await sleep(250);
  }
}

await Promise.all(Array.from({ length: workerCount }, () => worker()));

appendSummary('\n## Exhaustive sports venue hero production audit\n\n');
appendSummary(`Verified ${results.length}/${entries.length} governed venue heroes against ${origin}.\n\n`);
appendSummary('| Result | Venue | Page | Hero redirect | Image health | Media kind |\n|---|---|---:|---:|---:|---|\n');
const passedBySlug = new Map(results.map((result) => [result.slug, result]));
const failedBySlug = new Map(failures.map((failure) => [failure.slug, failure]));
for (const [slug] of entries) {
  const result = passedBySlug.get(slug);
  if (result) {
    appendSummary(`| ✅ | ${slug} | ${result.pageStatus} | ${result.endpointStatus} | ${result.imageStatus} | ${result.generated ? 'generated representative media' : 'real/reusable photo'} |\n`);
  } else {
    appendSummary(`| ❌ | ${slug} | — | — | — | ${failedBySlug.get(slug)?.message ?? 'failed'} |\n`);
  }
}

if (failures.length) {
  console.error(`Exhaustive sports venue hero production audit failed: ${failures.length}/${entries.length} venues failed.`);
  for (const failure of failures) console.error(`- ${failure.slug}: ${failure.message}`);
  process.exit(1);
}

console.log(`PASS: exhaustive sports venue hero production audit verified ${results.length}/${entries.length} governed venue pages, attribution semantics, exact hero redirects, and live image health.`);
