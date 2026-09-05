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
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

await verifyMajorEventLanding(origin, 'direct-worker', 'canonical');
await verifyMajorEventLanding(productionOrigin, 'custom-domain', 'canonical');
await verifyMajorEventLanding(origin, 'direct-worker', 'revision');
await verifyMajorEventLanding(productionOrigin, 'custom-domain', 'revision');

console.log(`Direct Worker discovery verification passed (${surfaces.length} discovery surfaces plus canonical and revision-bound direct/custom-domain major-event landing policy).`);
