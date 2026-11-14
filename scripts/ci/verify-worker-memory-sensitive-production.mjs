import { mkdir, writeFile } from 'node:fs/promises';
import { checkWorkerIdentity } from './worker-memory-identity.mjs';

// Representative production routes drawn from Cloudflare Worker memory-incident
// traces, not a sitewide crawl. Check uncached SSR on both origins so a CDN hit
// cannot conceal a failing dynamic import in the active Worker.
const canonical = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const direct = (process.env.WORKER_ORIGIN || 'https://texasdefined-site.freddy-coppola.workers.dev').replace(/\/$/, '');
const origins = [...new Set([canonical, direct])];
const routes = [
  '/county/smith',
  '/county/callahan',
  '/county/tarrant',
  '/county/jasper',
  '/county/el-paso',
  '/texas-high-school-football-isds/fort-worth-isd',
  '/texas-high-school-football-isds/la-joya-isd',
  '/texas-high-school-football-isds/lake-travis-isd',
  '/texas-high-school-football-isds/stephenville-isd',
  '/fishing/lakes',
  '/fishing/lakes/o-h-ivie-lake',
  '/sports/teams/dallas-mavericks',
  '/sports/teams/san-antonio-spurs',
  '/destination/sam-rayburn-house',
  '/destination/houston-national-cemetery',
  '/explore/historic-sites',
  '/sitemap-explore.xml',
];
const results = [];
const run = process.env.GITHUB_RUN_ID || 'local';
// A transition between Worker versions invalidates a 34-route acceptance even
// when each individual request happens to return HTTP 200.
let pinnedWorkerVersion = process.env.MEMORY_EXPECTED_WORKER_VERSION || '';

for (const origin of origins) {
  for (const path of routes) {
    const url = new URL(path, origin);
    url.searchParams.set('_td_worker_memory_probe', run);
    const start = performance.now();
    let status = 0;
    let failure = '';
    let bytes = 0;
    let workerVersion = '';
    try {
      const response = await fetch(url, {
        headers: { accept: path.endsWith('.xml') ? 'application/xml,text/xml' : 'text/html' },
        cache: 'no-store',
        signal: AbortSignal.timeout(22000),
      });
      status = response.status;
      const identity = checkWorkerIdentity(response.headers.get('x-texasdefined-worker-version'), pinnedWorkerVersion);
      workerVersion = identity.workerVersion;
      if (!identity.failure && !pinnedWorkerVersion) pinnedWorkerVersion = workerVersion;
      const body = await response.text();
      bytes = Buffer.byteLength(body);
      const type = response.headers.get('content-type') || '';
      if (response.status !== 200) failure = 'non-200 HTTP status';
      else if (identity.failure) failure = identity.failure;
      else if (/Dynamic import exceeded memory limits|Internal Server Error|<title>500\b/i.test(body)) failure = 'Worker/runtime error marker';
      else if (path.endsWith('.xml')) {
        if (!/xml/i.test(type) || !/<(?:urlset|sitemapindex)\b/i.test(body) || !/<loc>/.test(body)) {
          failure = 'invalid production XML sitemap';
        }
      } else if (!/html/i.test(type) || !/<h1\b[^>]*>/i.test(body)) {
        failure = 'missing SSR HTML or H1';
      }
    } catch (error) {
      failure = String(error);
    }
    const result = { origin, path, status, workerVersion, bytes, ms: Math.round(performance.now() - start), failure };
    results.push(result);
    process.stdout.write(`${failure ? 'FAIL' : 'PASS'} ${origin}${path}: ${status} (${result.ms}ms)${failure ? ' — ' + failure : ''}\n`);
  }
}

await mkdir('artifacts/worker-memory', { recursive: true });
await writeFile('artifacts/worker-memory/production.json', JSON.stringify({
  observedAt: new Date().toISOString(),
  gitSha: process.env.GITHUB_SHA || null,
  pinnedWorkerVersion: pinnedWorkerVersion || null,
  liveWorkerVersionProvenConsistent: results.length > 0 && results.every(x => x.workerVersion === pinnedWorkerVersion && !/Worker version/.test(x.failure)),
  originalIncident: 'https://github.com/keeptxred/TexasDefined/issues/7055',
  total: results.length,
  failures: results.filter((result) => result.failure),
  results,
}, null, 2));
const failures = results.filter((result) => result.failure);
console.log(`Worker memory-sensitive SSR: ${results.length - failures.length}/${results.length} passed`);
if (failures.length) process.exitCode = 1;
