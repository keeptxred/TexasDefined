const origin = process.env.DIRECT_WORKER_ORIGIN ?? 'https://texasdefined-site.freddy-coppola.workers.dev';
const productionOrigin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const surfaces = [
  ['explore-search', '/explore/search', 'Search the Texas Travel Guide'],
  ['trip-planner', '/explore/trip-planner', 'Texas Trip Planner'],
];
const majorEventLandingRequiredNeedles = ['Recurrence-derived planning window'];
const majorEventLandingForbiddenNeedles = [
  'Gillespie County Fair',
  'Austin Chronicle Hot Sauce Festival',
];
const christmasAuthorityPath = '/article/free-christmas-events-in-texas';
const christmasAuthorityRequiredNeedles = [
  'Fredericksburg: Christmas Nights of Lights at Marktplatz',
  'Georgetown Christmas Stroll: a free festival, not just lights',
  'Grapevine: choose the free public events inside a very busy Christmas calendar',
  "Verify this year's schedule before you leave",
];
const christmasAuthorityForbiddenNeedles = [
  'Texas Christmas trips can get expensive quickly when every evening has timed tickets.',
  'Walk the San Antonio River Walk lights',
];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&#x27;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

for (const [label, path, needle] of surfaces) {
  let passed = false;
  let lastStatus = 'network-error';
  let lastBody = '';
  let lastError = '';

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const url = `${origin}${path}?verify=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
    console.log(`[direct-worker:${label}] attempt ${attempt}: ${url}`);
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-CI-Direct-Worker-Smoke/1.0' },
      });
      lastStatus = String(response.status);
      lastBody = await response.text();
      lastError = '';
      if (response.ok && lastBody.includes(needle)) {
        console.log(`[direct-worker:${label}] verified (${response.status}): ${needle}`);
        passed = true;
        break;
      }
      console.log(response.ok
        ? `[direct-worker:${label}] HTTP ${response.status}, expected content not live yet: ${needle}`
        : `[direct-worker:${label}] HTTP ${response.status}; waiting for Worker propagation.`);
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      lastStatus = 'network-error';
      console.log(`[direct-worker:${label}] request failed: ${lastError}`);
    }
    if (attempt < 6) await sleep(5_000);
  }

  if (!passed) {
    const reason = lastError || (lastStatus !== '200' ? `HTTP ${lastStatus}` : `expected text not found: ${needle}`);
    console.error(`::error title=DIRECT WORKER discovery failure::${label} failed — ${reason}`);
    if (lastBody) console.error(`[direct-worker:${label}] response sample: ${lastBody.slice(0, 1200).replace(/\s+/g, ' ')}`);
    process.exit(1);
  }
}

async function verifyContentPolicy(targetOrigin, targetLabel, path, requiredNeedles, forbiddenNeedles, policyLabel) {
  let passed = false;
  let lastStatus = 'network-error';
  let lastBody = '';
  let lastError = '';
  let missingRequired = [];
  let staleForbidden = [];
  const checkLabel = `${targetLabel}:${policyLabel}`;

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${targetOrigin}${path}${separator}verify=${encodeURIComponent(`${sha}-${runId}-${policyLabel}-${attempt}`)}`;
    console.log(`[${checkLabel}] attempt ${attempt}: ${url}`);
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-CI-Content-Policy-Smoke/1.0' },
      });
      lastStatus = String(response.status);
      lastBody = await response.text();
      lastError = '';
      const text = visibleText(lastBody);
      missingRequired = requiredNeedles.filter((needle) => !text.includes(needle));
      staleForbidden = forbiddenNeedles.filter((needle) => text.includes(needle));

      if (response.ok && missingRequired.length === 0 && staleForbidden.length === 0) {
        console.log(`[${checkLabel}] verified (${response.status}): required content is live and stale content is absent; cf-cache=${response.headers.get('cf-cache-status') ?? 'none'}.`);
        passed = true;
        break;
      }

      if (!response.ok) {
        console.log(`[${checkLabel}] HTTP ${response.status}; waiting for propagation.`);
      } else {
        if (missingRequired.length) console.log(`[${checkLabel}] missing required content: ${missingRequired.join(' | ')}`);
        if (staleForbidden.length) console.log(`[${checkLabel}] stale forbidden content still present: ${staleForbidden.join(' | ')}`);
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      lastStatus = 'network-error';
      console.log(`[${checkLabel}] request failed: ${lastError}`);
    }
    if (attempt < 6) await sleep(5_000);
  }

  if (!passed) {
    const reason = lastError
      || (lastStatus !== '200' ? `HTTP ${lastStatus}` : '')
      || (missingRequired.length ? `missing required text: ${missingRequired.join(' | ')}` : '')
      || (staleForbidden.length ? `stale forbidden text present: ${staleForbidden.join(' | ')}` : '')
      || 'content policy did not match';
    console.error(`::error title=PRODUCTION content policy failure::${checkLabel} failed — ${reason}`);
    if (lastBody) console.error(`[${checkLabel}] response sample: ${visibleText(lastBody).slice(0, 2200)}`);
    process.exit(1);
  }
}

async function verifyMajorEventLanding(targetOrigin, targetLabel, mode) {
  let passed = false;
  let lastStatus = 'network-error';
  let lastBody = '';
  let lastError = '';
  let missingRequired = [];
  let staleForbidden = [];
  const canonicalMode = mode === 'canonical';
  const checkLabel = `${targetLabel}:major-events:${mode}`;

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const suffix = canonicalMode
      ? ''
      : `?verify-major-events=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
    const url = `${targetOrigin}/events${suffix}`;
    console.log(`[${checkLabel}] attempt ${attempt}: ${url}`);
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        ...(canonicalMode ? {} : { cache: 'no-store' }),
        signal: AbortSignal.timeout(30_000),
        headers: {
          'user-agent': canonicalMode
            ? 'TexasDefined-CI-Major-Event-Canonical-Smoke/1.0'
            : 'TexasDefined-CI-Major-Event-Revision-Smoke/1.0',
        },
      });
      lastStatus = String(response.status);
      lastBody = await response.text();
      lastError = '';
      missingRequired = majorEventLandingRequiredNeedles.filter((needle) => !lastBody.includes(needle));
      staleForbidden = majorEventLandingForbiddenNeedles.filter((needle) => lastBody.includes(needle));

      if (response.ok && missingRequired.length === 0 && staleForbidden.length === 0) {
        console.log(`[${checkLabel}] verified (${response.status}): recurrence confidence is visible and ended authority guides are absent.`);
        passed = true;
        break;
      }

      if (!response.ok) {
        console.log(`[${checkLabel}] HTTP ${response.status}; waiting for propagation.`);
      } else if (missingRequired.length > 0) {
        console.log(`[${checkLabel}] recurrence qualifier not live yet: ${missingRequired.join(' | ')}`);
      } else {
        console.log(`[${checkLabel}] ended guide cards are still live: ${staleForbidden.join(' | ')}`);
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      lastStatus = 'network-error';
      console.log(`[${checkLabel}] request failed: ${lastError}`);
    }

    if (attempt < 6) await sleep(5_000);
  }

  if (!passed) {
    const reason = lastError
      || (lastStatus !== '200' ? `HTTP ${lastStatus}` : '')
      || (missingRequired.length > 0 ? `missing required text: ${missingRequired.join(' | ')}` : '')
      || (staleForbidden.length > 0 ? `ended guide cards still present: ${staleForbidden.join(' | ')}` : '')
      || 'major-event landing payload did not match policy';
    console.error(`::error title=MAJOR EVENT landing production failure::${checkLabel} failed — ${reason}`);
    if (lastBody) console.error(`[${checkLabel}] response sample: ${lastBody.slice(0, 1800).replace(/\s+/g, ' ')}`);
    process.exit(1);
  }
}

async function diagnoseRandallOrigin(targetOrigin, targetLabel) {
  const marker = 'RV camping around Randall County';
  const url = `${targetOrigin}/county/randall?verify-rv-origin=${encodeURIComponent(`${sha}-${runId}-${targetLabel}`)}`;
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(30_000),
      headers: { 'user-agent': 'TexasDefined-CI-RV-Origin-Diagnostic/1.0' },
    });
    const body = await response.text();
    const text = visibleText(body);
    const hasHeading = text.includes(marker);
    const hasPaloDuro = body.includes('Palo Duro Canyon State Park RV Loop');
    const hasMajorEvents = text.includes('Major annual events');
    const hasSportsDestinations = text.includes('Sports destinations');
    console.log(`[rv-origin:${targetLabel}] status=${response.status} final=${response.url} bytes=${body.length} heading=${hasHeading} palo-duro=${hasPaloDuro} major-events=${hasMajorEvents} sports=${hasSportsDestinations} cf-cache=${response.headers.get('cf-cache-status') ?? 'none'}`);
  } catch (error) {
    console.log(`[rv-origin:${targetLabel}] diagnostic request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

await verifyContentPolicy(origin, 'direct-worker', christmasAuthorityPath, christmasAuthorityRequiredNeedles, christmasAuthorityForbiddenNeedles, 'free-christmas-authority');
await verifyContentPolicy(productionOrigin, 'custom-domain', christmasAuthorityPath, christmasAuthorityRequiredNeedles, christmasAuthorityForbiddenNeedles, 'free-christmas-authority');
await verifyMajorEventLanding(origin, 'direct-worker', 'canonical');
await verifyMajorEventLanding(productionOrigin, 'custom-domain', 'canonical');
await verifyMajorEventLanding(origin, 'direct-worker', 'revision');
await verifyMajorEventLanding(productionOrigin, 'custom-domain', 'revision');
await diagnoseRandallOrigin(origin, 'direct-worker');
await diagnoseRandallOrigin(productionOrigin, 'custom-domain');

console.log(`Direct Worker discovery verification passed (${surfaces.length} discovery surfaces plus direct/custom-domain Christmas authority, canonical/revision-bound major-event landing policy, and Randall origin diagnostics).`);