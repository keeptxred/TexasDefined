import { appendFileSync } from 'node:fs';

const outputPath = process.env.GITHUB_OUTPUT;
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const runId = process.env.GITHUB_RUN_ID || 'local';
const directWorkerOrigin = String(process.env.DIRECT_WORKER_ORIGIN || 'https://texasdefined-site.freddy-coppola.workers.dev').replace(/\/$/, '');
const workerVersionHeader = 'x-texasdefined-worker-version';
const maxAttempts = 12;
const retryDelayMs = 5_000;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const sleep = (milliseconds) => new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));

async function probeServingVersion(attempt) {
  const url = new URL('/', directWorkerOrigin);
  url.searchParams.set('__worker_version_probe', `${runId}-${attempt}-${Date.now()}`);

  try {
    const response = await fetch(url, {
      redirect: 'manual',
      cache: 'no-store',
      headers: {
        'cache-control': 'no-cache, no-store, max-age=0',
        pragma: 'no-cache',
        'user-agent': 'TexasDefined-CI-Worker-Version/2.0',
      },
      signal: AbortSignal.timeout(15_000),
    });

    const versionId = response.headers.get(workerVersionHeader)?.trim() || '';
    if (response.status !== 204) {
      return { versionId: null, detail: `Direct Worker identity probe returned HTTP ${response.status}; expected 204.` };
    }
    if (!uuidPattern.test(versionId)) {
      return { versionId: null, detail: `Direct Worker identity probe did not contain a valid ${workerVersionHeader} UUID.` };
    }
    return { versionId, detail: null };
  } catch (error) {
    return { versionId: null, detail: `Direct Worker identity probe failed: ${String(error)}` };
  }
}

let capturedVersion = null;
let lastDetail = null;
for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  const result = await probeServingVersion(attempt);
  if (result.versionId) {
    capturedVersion = result.versionId;
    break;
  }
  lastDetail = result.detail;
  if (attempt < maxAttempts) {
    console.log(`Serving Worker identity has not converged (attempt ${attempt}/${maxAttempts}): ${lastDetail}`);
    await sleep(retryDelayMs);
  }
}

if (!capturedVersion) {
  console.error(`::error title=Serving Worker identity did not converge::${lastDetail || 'The direct Worker did not expose deterministic version metadata.'}`);
  process.exit(1);
}

if (!outputPath) {
  console.error('::error title=Missing GITHUB_OUTPUT::Serving Worker version capture requires GitHub Actions output support.');
  process.exit(1);
}

appendFileSync(outputPath, `version_id=${capturedVersion}\n`);
if (summaryPath) appendFileSync(summaryPath, `| Serving Worker version | \`${capturedVersion}\` |\n`);
console.log(`Captured serving Worker version: ${capturedVersion}`);
