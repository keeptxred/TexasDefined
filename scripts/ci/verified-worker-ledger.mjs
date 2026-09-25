const command = process.argv[2];
const explicitVersion = process.argv[3]?.trim();
const token = process.env.GITHUB_TOKEN?.trim();
const repository = process.env.GITHUB_REPOSITORY?.trim();
const outputPath = process.env.GITHUB_OUTPUT;
const environment = 'texasdefined-verified-worker';
const directOrigin = 'https://texasdefined-site.freddy-coppola.workers.dev';
const versionPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

if (!token) throw new Error('GITHUB_TOKEN is required for the verified Worker ledger.');
if (!repository || !repository.includes('/')) throw new Error('GITHUB_REPOSITORY is required for the verified Worker ledger.');

const apiBase = `https://api.github.com/repos/${repository}`;
const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'TexasDefined-Verified-Worker-Ledger/1.0',
};

async function github(path, init = {}) {
  const response = await fetch(apiBase + path, {
    ...init,
    headers: {
      ...headers,
      ...(init.headers ?? {}),
    },
  });
  const text = await response.text();
  let payload = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status} ${path}: ${typeof payload === 'string' ? payload : JSON.stringify(payload)}`);
  }
  return payload;
}

async function writeActionOutput(name, value) {
  if (!outputPath) return;
  const { appendFileSync } = await import('node:fs');
  appendFileSync(outputPath, `${name}=${value}\n`);
}

function validVersion(value) {
  return typeof value === 'string' && versionPattern.test(value.trim());
}

async function resolveVerified() {
  const deployments = await github(`/deployments?environment=${encodeURIComponent(environment)}&per_page=30`);
  if (!Array.isArray(deployments)) throw new Error('GitHub deployments response was not an array.');

  for (const deployment of deployments) {
    const statuses = await github(`/deployments/${deployment.id}/statuses?per_page=1`);
    const latest = Array.isArray(statuses) ? statuses[0] : null;
    if (latest?.state !== 'success') continue;

    const payload = deployment.payload && typeof deployment.payload === 'object'
      ? deployment.payload
      : typeof deployment.payload === 'string'
        ? (() => { try { return JSON.parse(deployment.payload); } catch { return {}; } })()
        : {};
    const version = String(payload.worker_version ?? '').trim();
    if (!validVersion(version)) continue;

    await writeActionOutput('version_id', version);
    await writeActionOutput('deployment_id', String(deployment.id));
    console.log(`Resolved verified Worker recovery target ${version} from GitHub deployment ${deployment.id}.`);
    return { version, deploymentId: deployment.id };
  }

  throw new Error('No successful verified Worker recovery target exists in the GitHub deployment ledger.');
}

async function recordVerified(version) {
  if (!validVersion(version)) throw new Error(`Invalid Cloudflare Worker version ID: ${version || '<empty>'}`);
  const sha = process.env.GITHUB_SHA?.trim();
  if (!sha) throw new Error('GITHUB_SHA is required to record a verified Worker.');
  const runId = process.env.GITHUB_RUN_ID?.trim() || '';
  const runAttempt = process.env.GITHUB_RUN_ATTEMPT?.trim() || '';

  const deployment = await github('/deployments', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      ref: sha,
      task: 'verified-worker-ledger',
      auto_merge: false,
      required_contexts: [],
      environment,
      description: `TexasDefined Worker ${version} passed the complete production verification contract`,
      production_environment: false,
      payload: {
        worker_version: version,
        commit_sha: sha,
        source_run_id: runId,
        source_run_attempt: runAttempt,
        verified_at: new Date().toISOString(),
      },
    }),
  });

  const deploymentId = deployment?.id;
  if (!deploymentId) throw new Error('GitHub did not return a deployment ID for the verified Worker ledger.');

  await github(`/deployments/${deploymentId}/statuses`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      state: 'success',
      description: 'Complete TexasDefined production verification passed',
      environment,
      environment_url: directOrigin,
      auto_inactive: false,
    }),
  });

  await writeActionOutput('version_id', version);
  await writeActionOutput('deployment_id', String(deploymentId));
  console.log(`Recorded verified Worker recovery target ${version} as GitHub deployment ${deploymentId}.`);
}

if (command === 'resolve') {
  await resolveVerified();
} else if (command === 'record') {
  await recordVerified(explicitVersion || process.env.VERIFIED_WORKER_VERSION?.trim());
} else {
  throw new Error('Usage: node scripts/ci/verified-worker-ledger.mjs <resolve|record> [worker-version-id]');
}
