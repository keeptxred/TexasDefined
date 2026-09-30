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

function parseActiveVersion(stdout) {
  let payload;
  try {
    payload = JSON.parse(stdout);
  } catch (error) {
    return {
      versionId: null,
      detail: `Could not parse wrangler deployments status --json output: ${String(error)}`,
    };
  }

  const weighted = [];
  const unweighted = new Set();

  function visit(value) {
    if (Array.isArray(value)) {
      for (const item of value) visit(item);
      return;
    }
    if (!value || typeof value !== 'object') return;

    const versionId =
      typeof value.version_id === 'string' ? value.version_id :
      typeof value.versionId === 'string' ? value.versionId :
      value.version && typeof value.version === 'object' && typeof value.version.id === 'string' ? value.version.id :
      null;

    if (versionId && uuidPattern.test(versionId)) {
      unweighted.add(versionId);
      const percentage = Number(value.percentage ?? value.traffic_percentage ?? value.traffic ?? value.percent);
      if (Number.isFinite(percentage)) weighted.push({ versionId, percentage });
    }

    for (const nested of Object.values(value)) visit(nested);
  }

  visit(payload);

  const fullTraffic = [...new Set(weighted.filter((item) => item.percentage >= 99.999).map((item) => item.versionId))];
  let versionId = null;

  if (fullTraffic.length === 1) {
    versionId = fullTraffic[0];
  } else if (fullTraffic.length === 0 && unweighted.size === 1) {
    versionId = [...unweighted][0];
  }

  return {
    versionId,
    detail: versionId
      ? null
      : `Expected exactly one 100% active Worker version, found full-traffic=${fullTraffic.length}, discovered=${unweighted.size}.`,
  };
}

function captureActiveVersion() {
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

  return parseActiveVersion(result.stdout);
}

const state = readState();
const phase = !state?.baselineVersion
  ? 'baseline'
  : !state?.deployedVersion
    ? 'post-deploy'
    : 'post-verification';

let capturedVersion = null;
let lastDetail = null;

for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  const { versionId, detail } = captureActiveVersion();
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

  if (attempt < maxAttempts) {
    console.log(`Worker version ${phase} check has not converged (attempt ${attempt}/${maxAttempts}): ${String(lastDetail || 'no deterministic active version yet').trim()}`);
    await sleep(retryDelayMs);
  }
}

if (!capturedVersion) {
  const title = phase === 'baseline'
    ? 'Unable to capture active Worker rollback target'
    : phase === 'post-deploy'
      ? 'Deployed Worker did not become active'
      : 'Verified Worker changed during production verification';
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
