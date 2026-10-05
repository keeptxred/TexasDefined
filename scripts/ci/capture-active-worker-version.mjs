import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const outputPath = process.env.GITHUB_OUTPUT;
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const runId = process.env.GITHUB_RUN_ID || null;
const stateDirectory = '.artifacts';
const statePath = `${stateDirectory}/worker-version-capture-state.json`;
const maxAttempts = 12;
const retryDelayMs = 5_000;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const rollbackTargetFailure = 'Refusing to deploy without a deterministic rollback target.';
const workerName = process.env.CLOUDFLARE_WORKER_NAME?.trim() || 'texasdefined-site';

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function readState() {
  if (!runId || !existsSync(statePath)) return null;

  try {
    const parsed = JSON.parse(readFileSync(statePath, 'utf8'));
    return parsed?.runId === runId ? parsed : null;
  } catch {
    return null;
  }
}

function writeState(state) {
  if (!runId) return;
  mkdirSync(stateDirectory, { recursive: true });
  writeFileSync(statePath, `${JSON.stringify({ runId, ...state }, null, 2)}\n`);
}

function parseTrafficVersions(versions, sourceLabel) {
  if (!Array.isArray(versions) || versions.length === 0) {
    return {
      versionId: null,
      detail: `${sourceLabel} did not contain a non-empty versions array.`,
    };
  }

  const traffic = versions.map((entry, index) => {
    const versionId = typeof entry?.version_id === 'string' ? entry.version_id : null;
    const percentage = Number(entry?.percentage);
    return { index, versionId, percentage };
  });

  const invalid = traffic.filter(
    (entry) => !entry.versionId || !uuidPattern.test(entry.versionId) || !Number.isFinite(entry.percentage),
  );

  if (invalid.length > 0) {
    return {
      versionId: null,
      detail: `${sourceLabel} contained ${invalid.length} invalid active-traffic ${invalid.length === 1 ? 'entry' : 'entries'}.`,
    };
  }

  const fullTraffic = traffic.filter((entry) => entry.percentage >= 99.999);
  const otherTraffic = traffic.filter((entry) => entry.percentage > 0.001 && entry.percentage < 99.999);

  if (fullTraffic.length === 1 && otherTraffic.length === 0) {
    return { versionId: fullTraffic[0].versionId, detail: null };
  }

  const trafficSummary = traffic
    .map((entry) => `${entry.versionId}:${entry.percentage}%`)
    .join(', ');

  return {
    versionId: null,
    detail: `Expected exactly one 100% active Worker version in ${sourceLabel}, found ${trafficSummary || 'no valid traffic entries'}.`,
  };
}

function parseWranglerActiveVersion(stdout) {
  let payload;
  try {
    payload = JSON.parse(stdout);
  } catch (error) {
    return {
      versionId: null,
      detail: `Could not parse wrangler deployments status --json output: ${String(error)}`,
    };
  }

  return parseTrafficVersions(payload?.versions, 'Wrangler latest deployment traffic');
}

function latestDeploymentFromPayload(payload) {
  const result = payload?.result;
  const deployments = Array.isArray(result)
    ? result
    : Array.isArray(result?.deployments)
      ? result.deployments
      : null;

  if (!deployments?.length) return null;

  const dated = deployments.map((deployment) => ({
    deployment,
    timestamp: Date.parse(deployment?.created_on || ''),
  }));

  if (dated.every((entry) => Number.isFinite(entry.timestamp))) {
    dated.sort((a, b) => b.timestamp - a.timestamp);
    return dated[0].deployment;
  }

  return deployments[0];
}

async function captureViaCloudflareApi() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  const token = process.env.CLOUDFLARE_API_TOKEN?.trim();

  if (!accountId || !token) {
    return {
      versionId: null,
      detail: 'Cloudflare account/token environment is unavailable for direct deployment lookup.',
      mayFallback: true,
    };
  }

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/workers/scripts/${encodeURIComponent(workerName)}/deployments`;

  let response;
  try {
    response = await fetch(endpoint, {
      headers: { authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(20_000),
    });
  } catch (error) {
    return {
      versionId: null,
      detail: `Cloudflare deployment lookup failed before receiving a response: ${String(error)}`,
      mayFallback: true,
    };
  }

  let payload;
  try {
    payload = await response.json();
  } catch (error) {
    return {
      versionId: null,
      detail: `Cloudflare deployment lookup returned non-JSON HTTP ${response.status}: ${String(error)}`,
      mayFallback: true,
    };
  }

  if (!response.ok || payload?.success !== true) {
    const messages = [
      ...(Array.isArray(payload?.errors) ? payload.errors : []),
      ...(Array.isArray(payload?.messages) ? payload.messages : []),
    ]
      .map((item) => item?.message)
      .filter(Boolean)
      .join(' | ');
    return {
      versionId: null,
      detail: `Cloudflare deployment lookup failed with HTTP ${response.status}${messages ? `: ${messages}` : ''}.`,
      mayFallback: true,
    };
  }

  const latestDeployment = latestDeploymentFromPayload(payload);
  if (!latestDeployment) {
    return {
      versionId: null,
      detail: 'Cloudflare deployment lookup returned no deployments.',
      mayFallback: false,
    };
  }

  const parsed = parseTrafficVersions(latestDeployment.versions, 'Cloudflare latest deployment traffic');
  return { ...parsed, mayFallback: false };
}

function captureViaWrangler() {
  const result = spawnSync('npx', ['wrangler', 'deployments', 'status', '--json'], {
    cwd: process.cwd(),
    env: process.env,
    encoding: 'utf8',
    shell: false,
  });

  if (result.error || result.status !== 0) {
    return {
      versionId: null,
      detail: result.error?.message || result.stderr || `wrangler exited with code ${result.status}`,
    };
  }

  return parseWranglerActiveVersion(result.stdout);
}

async function captureActiveVersion() {
  const apiResult = await captureViaCloudflareApi();
  if (apiResult.versionId || !apiResult.mayFallback) return apiResult;

  console.log(`Direct Cloudflare deployment lookup unavailable; using Wrangler fallback: ${apiResult.detail}`);
  const wranglerResult = captureViaWrangler();
  return wranglerResult.versionId
    ? wranglerResult
    : {
        versionId: null,
        detail: `${apiResult.detail} Wrangler fallback also failed: ${wranglerResult.detail}`,
      };
}

const state = readState();
const phase = !state?.baselineVersion
  ? 'baseline'
  : !state?.deployedVersion
    ? 'post-deploy'
    : 'post-verification';
const attemptLimit = phase === 'post-verification' ? 1 : maxAttempts;

let capturedVersion = null;
let lastDetail = null;

for (let attempt = 1; attempt <= attemptLimit; attempt += 1) {
  const { versionId, detail } = await captureActiveVersion();
  lastDetail = detail;

  if (versionId) {
    if (phase === 'baseline') {
      capturedVersion = versionId;
    } else if (phase === 'post-deploy' && versionId !== state.baselineVersion) {
      capturedVersion = versionId;
    } else if (phase === 'post-verification' && versionId === state.deployedVersion) {
      capturedVersion = versionId;
    } else if (phase === 'post-deploy') {
      lastDetail = `Cloudflare still reports the pre-deploy Worker ${state.baselineVersion} as active.`;
    } else {
      lastDetail = `Cloudflare reports ${versionId} active, but this run deployed ${state.deployedVersion}.`;
    }
  }

  if (capturedVersion) break;

  if (attempt < attemptLimit) {
    console.log(`Worker version ${phase} check has not converged (attempt ${attempt}/${attemptLimit}): ${String(lastDetail || 'no deterministic active version yet').trim()}`);
    await sleep(retryDelayMs);
  }
}

if (!capturedVersion && phase === 'post-verification' && state?.deployedVersion) {
  capturedVersion = state.deployedVersion;
  const detail = String(lastDetail || 'Cloudflare did not return a deterministic active Worker during final bookkeeping.').trim();
  console.warn(`::warning title=Verified Worker bookkeeping did not converge::${detail} Retaining this run's already-captured deployed Worker ${capturedVersion} as the recovery target because blocking production runtime verification has already completed.`);
}

if (!capturedVersion) {
  const title = phase === 'baseline'
    ? 'Unable to capture active Worker rollback target'
    : 'Deployed Worker did not become active';
  const fallbackDetail = phase === 'baseline'
    ? rollbackTargetFailure
    : 'Cloudflare did not report the expected active Worker before the bounded retry window expired.';
  console.error(`::error title=${title}::${String(lastDetail || fallbackDetail).trim()}`);
  process.exit(1);
}

if (phase === 'baseline') {
  writeState({ baselineVersion: capturedVersion, deployedVersion: null });
} else if (phase === 'post-deploy') {
  writeState({ baselineVersion: state.baselineVersion, deployedVersion: capturedVersion });
}

if (!outputPath) {
  console.error('::error title=Missing GITHUB_OUTPUT::Worker version capture requires GitHub Actions output support.');
  process.exit(1);
}

appendFileSync(outputPath, `version_id=${capturedVersion}\n`);
if (summaryPath) appendFileSync(summaryPath, `| Worker version ${phase} | \`${capturedVersion}\` |\n`);
console.log(`Captured ${phase} Worker version: ${capturedVersion}`);
