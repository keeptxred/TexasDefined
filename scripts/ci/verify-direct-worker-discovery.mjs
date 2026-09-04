const origin = process.env.DIRECT_WORKER_ORIGIN ?? 'https://texasdefined-site.freddy-coppola.workers.dev';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const surfaces = [
  ['explore-search', '/explore/search', 'Search the Texas Travel Guide'],
  ['trip-planner', '/explore/trip-planner', 'Texas Trip Planner'],
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

console.log(`Direct Worker discovery verification passed (${surfaces.length} surfaces).`);
