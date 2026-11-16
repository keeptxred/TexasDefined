import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// An independent evidence query; never treat successful HTTP probes as proof
// that the active Worker emitted no runtime exceptions.
export function unpackTelemetryResponse(body) {
  if (!body || body.success !== true || !body.result) {
    throw new Error('Cloudflare telemetry response was unsuccessful or malformed');
  }
  if (body.result.run?.status !== 'COMPLETED') {
    throw new Error('Cloudflare telemetry query has not completed; results are not evidence');
  }
  const bucket = body.result.events;
  if (!bucket || !Array.isArray(bucket.events)) {
    throw new Error('Cloudflare telemetry event view is missing; cannot infer zero errors');
  }
  if (bucket.count != null && (!Number.isSafeInteger(bucket.count) || bucket.count < 0)) {
    throw new Error('Cloudflare telemetry event count is invalid');
  }
  return { count: bucket.count ?? bucket.events.length, events: bucket.events };
}

export function assessMemoryEvidence(baselineBody, errorsBody) {
  const baseline = unpackTelemetryResponse(baselineBody);
  const errors = unpackTelemetryResponse(errorsBody);
  if (baseline.count < 1) {
    throw new Error('No actual texasdefined-site invocation logs in the requested time window; cannot certify absence of exceptions');
  }
  if (errors.count > 0) {
    throw new Error('Dynamic-import memory exhaustion recurred: ' + errors.count + ' logged events');
  }
  return { observedInvocations: baseline.count, memoryExhaustionEvents: errors.count };
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SITE = 'texasdefined-site';
const ORIGINS = ['https://texasdefined.com', 'https://texasdefined-site.freddy-coppola.workers.dev'];
const ENDPOINT_PATH = '/workers/observability/telemetry/query';
const MESSAGE = 'Dynamic import exceeded memory limits';

async function activeVersion() {
  let expected = '';
  for (const origin of ORIGINS) {
    const url = new URL('/texas-high-school-football-isds/stephenville-isd', origin);
    url.searchParams.set('_td_memory_telemetry', String(Date.now()));
    const response = await fetch(url, {
      cache: 'no-store',
      headers: { accept: 'text/html' },
      signal: AbortSignal.timeout(25000),
    });
    const workerVersion = response.headers.get('x-texasdefined-worker-version') || '';
    if (response.status !== 200 || !UUID.test(workerVersion)) {
      throw new Error('Unhealthy or unidentified live Worker at ' + origin);
    }
    if (expected && expected !== workerVersion) {
      throw new Error('Public origins are serving different Worker versions');
    }
    expected = workerVersion;
  }
  return expected;
}

async function queryTelemetry(account, token, timeframe, needle, version) {
  const parameters = {
    datasets: ['cloudflare-workers'],
    filters: [
      { key: '$workers.scriptName', operation: 'eq', type: 'string', value: SITE },
      { key: '$workers.scriptVersion.id', operation: 'eq', type: 'string', value: version },
    ],
  };
  if (needle) parameters.needle = { value: needle, matchCase: false, isRegex: false };
  const response = await fetch(
    'https://api.cloudflare.com/client/v4/accounts/' + encodeURIComponent(account) + ENDPOINT_PATH,
    {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        queryId: needle ? 'texasdefined-memory-exceptions' : 'texasdefined-memory-baseline',
        timeframe,
        view: 'events',
        limit: 2,
        parameters,
        dry: true,
      }),
      signal: AbortSignal.timeout(30000),
    },
  );
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Cloudflare telemetry API lacks Workers Observability Write permission (HTTP ' + response.status + '); no log-health conclusion is possible');
    }
    throw new Error('Cloudflare telemetry query failed (HTTP ' + response.status + ')');
  }
  return response.json();
}

export async function run() {
  const report = {
    observedAt: new Date().toISOString(),
    sourceSha: process.env.GITHUB_SHA || null,
    releaseRun: process.env.GITHUB_EVENT_NAME === 'workflow_run' ? 'postdeploy' : process.env.GITHUB_EVENT_NAME || 'manual',
    originalIncident: 'https://github.com/keeptxred/TexasDefined/issues/7055',
    status: 'INCOMPLETE',
  };
  try {
    const account = (process.env.CLOUDFLARE_ACCOUNT_ID || '').trim();
    const tokens = [...new Set([
      process.env.CLOUDFLARE_OBSERVABILITY_API_TOKEN,
      process.env.CLOUDFLARE_API_TOKEN,
      process.env.CLOUDFLARE_DEPLOY_API_TOKEN,
    ].map(x => (x || '').trim()).filter(Boolean))];
    if (!account || !tokens.length) throw new Error('Existing GitHub Actions Cloudflare observability credentials are unavailable');
    const to = Date.now();
    const startArg = (process.env.WORKER_MEMORY_START_UTC || '').trim();
    const from = startArg ? Date.parse(startArg) : to - 6 * 60 * 60 * 1000;
    if (!Number.isFinite(from) || from >= to || to - from < 10_000 || to - from > 7 * 86_400_000) {
      throw new Error('Log window missing or outside supported 10-second to 7-day retention range');
    }
    report.window = { from: new Date(from).toISOString(), to: new Date(to).toISOString() };
    report.pinnedLiveWorkerVersion = await activeVersion();
    const timeframe = { from, to };
    // Ask the stored log dataset twice: a positive observed-event baseline
    // and the independently searched memory-exception stream.
    let observed = null;
    for (const token of tokens) {
      try {
        const baseline = await queryTelemetry(account, token, timeframe, null, report.pinnedLiveWorkerVersion);
        const errors = await queryTelemetry(account, token, timeframe, MESSAGE, report.pinnedLiveWorkerVersion);
        observed = assessMemoryEvidence(baseline, errors);
        break;
      } catch (error) {
        // Bounded fallback across *already installed* GitHub Secrets, never OAuth.
        // Data/schema failures are not permission failures and must not be hidden.
        if (!/Workers Observability Write permission \(HTTP 40[13]\)/.test(String(error?.message || error))) throw error;
      }
    }
    if (!observed) throw new Error('All existing Cloudflare credentials lack Workers Observability Write permission (HTTP 401/403); no stored-log conclusion is possible');
    Object.assign(report, observed);
    report.status = 'PASS';
    console.log('Worker memory telemetry: observable invocation evidence, zero matching memory-exhaustion log events, same Worker UUID on both public origins.');
  } catch (error) {
    report.status = 'INCOMPLETE';
    report.failure = String(error?.message || error).slice(0, 400);
    process.exitCode = 1;
    console.error('Worker memory telemetry remains unverified: ' + report.failure);
  } finally {
    await mkdir('artifacts/worker-memory', { recursive: true });
    await writeFile('artifacts/worker-memory/telemetry.json', JSON.stringify(report, null, 2) + '\n');
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await run();
}
