import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputPath = process.env.GITHUB_OUTPUT;
const envPath = process.env.GITHUB_ENV;
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const runId = process.env.GITHUB_RUN_ID || null;
const stateDirectory = '.artifacts';
const statePath = `${stateDirectory}/worker-version-capture-state.json`;
const defaultWranglerOutputPath = resolve(stateDirectory, 'wrangler-production-output.jsonl');
const wranglerOutputPath = process.env.WRANGLER_OUTPUT_FILE_PATH?.trim()
  ? resolve(process.env.WRANGLER_OUTPUT_FILE_PATH.trim())
  : defaultWranglerOutputPath;
const maxAttempts = 12;
const retryDelayMs = 5_000;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const rollbackTargetFailure = 'Refusing to deploy without a deterministic rollback target.';
const workerName = process.env.CLOUDFLARE_WORKER_NAME?.trim() || 'texasdefined-site';

const sleep = (milliseconds) => new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));

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

function prepareWranglerDeployOutputCapture() {
  mkdirSync(dirname(wranglerOutputPath), { recursive: true });
  writeFileSync(wranglerOutputPath, '');
  if (!envPath) {
    if (runId) throw new Error('GITHUB_ENV is unavailable; refusing to deploy without deterministic Wrangler output capture.');
    return;
  }
  appendFileSync(envPath, `WRANGLER_OUTPUT_FILE_PATH=${wranglerOutputPath}\n`);
}

export function parseWranglerDeployOutput(text, expectedWorkerName = workerName) {
  const lines = String(text || '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) return { versionId: null, detail: 'Wrangler deploy output file was empty.' };
  const records = [];
  for (const [index, line] of lines.entries()) {
    try { records.push(JSON.parse(line)); }
    catch (error) { return { versionId: null, detail: `Wrangler deploy output line ${index + 1} was not valid JSON: ${String(error)}` }; }
  }
  const deployRecords = records.filter((record) => record?.type === 'deploy' && record?.worker_name === expectedWorkerName);
  if (deployRecords.length !== 1) return { versionId: null, detail: `Expected exactly one Wrangler deploy record for ${expectedWorkerName}, found ${deployRecords.length}.` };
  const versionId = typeof deployRecords[0]?.version_id === 'string' ? deployRecords[0].version_id.trim() : '';
  if (!uuidPattern.test(versionId)) return { versionId: null, detail: `Wrangler deploy record for ${expectedWorkerName} did not contain a valid Worker version UUID.` };
  return { versionId, detail: null };
}

function captureWranglerDeployedVersion() {
  if (!existsSync(wranglerOutputPath)) return { versionId: null, detail: `Wrangler deploy output file is missing at ${wranglerOutputPath}.` };
  try { return parseWranglerDeployOutput(readFileSync(wranglerOutputPath, 'utf8'), workerName); }
  catch (error) { return { versionId: null, detail: `Could not read Wrangler deploy output at ${wranglerOutputPath}: ${String(error)}` }; }
}

export function parseTrafficVersions(versions, sourceLabel) {
  if (!Array.isArray(versions) || versions.length === 0) return { versionId: null, detail: `${sourceLabel} did not contain a non-empty versions array.` };
  const traffic = versions.map((entry, index) => ({ index, versionId: typeof entry?.version_id === 'string' ? entry.version_id.trim() : null, percentage: Number(entry?.percentage) }));
  const invalid = traffic.filter((entry) => !entry.versionId || !uuidPattern.test(entry.versionId) || !Number.isFinite(entry.percentage) || entry.percentage < 0 || entry.percentage > 100);
  if (invalid.length > 0) return { versionId: null, detail: `${sourceLabel} contained ${invalid.length} invalid active-traffic ${invalid.length === 1 ? 'entry' : 'entries'}.` };
  const fullTraffic = traffic.filter((entry) => entry.percentage >= 99.999);
  const otherTraffic = traffic.filter((entry) => entry.percentage > 0.001 && entry.percentage < 99.999);
  if (fullTraffic.length === 1 && otherTraffic.length === 0) return { versionId: fullTraffic[0].versionId, detail: null };
  const trafficSummary = traffic.map((entry) => `${entry.versionId}:${entry.percentage}%`).join(', ');
  return { versionId: null, detail: `Expected exactly one 100% active Worker version in ${sourceLabel}, found ${trafficSummary || 'no valid traffic entries'}.` };
}

export function parseWranglerActiveVersion(stdout) {
  let payload;
  try { payload = JSON.parse(stdout); }
  catch (error) { return { versionId: null, detail: `Could not parse wrangler deployments status --json output: ${String(error)}` }; }
  return parseTrafficVersions(payload?.versions, 'Wrangler latest deployment traffic');
}

export function activeDeploymentFromPayload(payload) {
  const result = payload?.result;
  const deployments = Array.isArray(result) ? result : Array.isArray(result?.deployments) ? result.deployments : null;
  if (!deployments?.length) return { versionId: null, detail: 'Cloudflare deployment lookup returned no deployments.' };
  return parseTrafficVersions(deployments[0]?.versions, 'Cloudflare active deployment traffic');
}

export function evaluateCapturedVersion(phase, versionId, state, exactDeployedVersion = null) {
  if (!versionId) return { capturedVersion: null, detail: null };
  if (phase === 'baseline') return { capturedVersion: versionId, detail: null };
  const expectedVersion = phase === 'post-deploy' ? exactDeployedVersion : state?.deployedVersion;
  if (expectedVersion && versionId === expectedVersion) return { capturedVersion: versionId, detail: null };
  if (phase === 'post-deploy' && versionId === state?.baselineVersion) return { capturedVersion: null, detail: `Cloudflare still reports the pre-deploy Worker ${state?.baselineVersion} as active; Wrangler deployed ${expectedVersion || 'an unknown version'}.` };
  return { capturedVersion: null, detail: `Cloudflare reports ${versionId} active, but this run deployed ${expectedVersion || 'an unknown version'}.` };
}

export function supersedingActiveVersion(phase, versionId, state, exactDeployedVersion = null) {
  if (phase !== 'post-deploy' || !versionId || !uuidPattern.test(versionId)) return null;
  if (versionId === state?.baselineVersion || versionId === exactDeployedVersion) return null;
  return versionId;
}

async function captureViaCloudflareApi() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  const token = process.env.CLOUDFLARE_API_TOKEN?.trim();
  if (!accountId || !token) return { versionId: null, detail: 'Cloudflare account/token environment is unavailable for direct deployment lookup.', mayFallback: true };
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/workers/scripts/${encodeURIComponent(workerName)}/deployments`;
  let response;
  try { response = await fetch(endpoint, { headers: { authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(20_000) }); }
  catch (error) { return { versionId: null, detail: `Cloudflare deployment lookup failed before receiving a response: ${String(error)}`, mayFallback: true }; }
  let payload;
  try { payload = await response.json(); }
  catch (error) { return { versionId: null, detail: `Cloudflare deployment lookup returned non-JSON HTTP ${response.status}: ${String(error)}`, mayFallback: true }; }
  if (!response.ok || payload?.success !== true) {
    const messages = [...(Array.isArray(payload?.errors) ? payload.errors : []), ...(Array.isArray(payload?.messages) ? payload.messages : [])].map((item) => item?.message).filter(Boolean).join(' | ');
    return { versionId: null, detail: `Cloudflare deployment lookup failed with HTTP ${response.status}${messages ? `: ${messages}` : ''}.`, mayFallback: true };
  }
  const parsed = activeDeploymentFromPayload(payload);
  return { ...parsed, mayFallback: false };
}

function captureViaWrangler() {
  const result = spawnSync('npx', ['wrangler', 'deployments', 'status', '--json'], { cwd: process.cwd(), env: process.env, encoding: 'utf8', shell: false });
  if (result.error || result.status !== 0) return { versionId: null, detail: result.error?.message || result.stderr || `wrangler exited with code ${result.status}` };
  return parseWranglerActiveVersion(result.stdout);
}

async function captureActiveVersion() {
  const apiResult = await captureViaCloudflareApi();
  if (apiResult.versionId || !apiResult.mayFallback) return apiResult;
  console.log(`Direct Cloudflare deployment lookup unavailable; using Wrangler fallback: ${apiResult.detail}`);
  const wranglerResult = captureViaWrangler();
  return wranglerResult.versionId ? wranglerResult : { versionId: null, detail: `${apiResult.detail} Wrangler fallback also failed: ${wranglerResult.detail}` };
}

async function main() {
  const state = readState();
  const phase = !state?.baselineVersion ? 'baseline' : !state?.deployedVersion ? 'post-deploy' : 'post-verification';
  let exactDeployedVersion = null;
  let supersededBy = null;
  if (phase === 'post-deploy') {
    const parsedDeploy = captureWranglerDeployedVersion();
    if (!parsedDeploy.versionId) {
      console.error(`::error title=Unable to capture exact Wrangler deployed Worker version::${parsedDeploy.detail}`);
      process.exit(1);
    }
    exactDeployedVersion = parsedDeploy.versionId;
    console.log(`Wrangler reports this run created Worker version: ${exactDeployedVersion}`);
  }
  let capturedVersion = null;
  let lastDetail = null;
  // Final version capture is bookkeeping after both blocking runtime gates have passed.
  // Re-querying Cloudflare here creates a race with queued production deployments and can
  // turn a healthy deployment red after verification. The effective active production
  // version was already captured in the post-deploy phase and then exercised by live checks.
  if (phase === 'post-verification') {
    if (state?.deployedVersion && uuidPattern.test(state.deployedVersion)) {
      capturedVersion = state.deployedVersion;
      console.log(`Using the already verified effective production Worker version for final bookkeeping: ${capturedVersion}`);
    } else {
      lastDetail = 'The run state does not contain a valid effective production Worker version.';
    }
  }
  for (let attempt = 1; !capturedVersion && attempt <= maxAttempts; attempt += 1) {
    const { versionId, detail } = await captureActiveVersion();
    lastDetail = detail;
    const evaluated = evaluateCapturedVersion(phase, versionId, state, exactDeployedVersion);
    if (evaluated.capturedVersion) {
      capturedVersion = evaluated.capturedVersion;
    } else {
      const supersedingVersion = supersedingActiveVersion(phase, versionId, state, exactDeployedVersion);
      if (supersedingVersion) {
        capturedVersion = supersedingVersion;
        supersededBy = supersedingVersion;
        lastDetail = null;
        console.log(`::warning title=Worker deployment superseded before identity capture::This run created ${exactDeployedVersion}, but Cloudflare already reports ${supersedingVersion} as the 100% active production Worker. Continuing with the active version as the effective production identity; live runtime checks remain authoritative.`);
      } else if (evaluated.detail) {
        lastDetail = evaluated.detail;
      }
    }
    if (capturedVersion) break;
    if (attempt < maxAttempts) {
      console.log(`Worker version ${phase} check has not converged (attempt ${attempt}/${maxAttempts}): ${String(lastDetail || 'no deterministic active version yet').trim()}`);
      await sleep(retryDelayMs);
    }
  }
  if (!capturedVersion) {
    const title = phase === 'baseline' ? 'Unable to capture active Worker rollback target' : phase === 'post-verification' ? 'Verified Worker bookkeeping state is invalid' : 'Exact Wrangler deployed Worker did not become active';
    const fallbackDetail = phase === 'baseline' ? rollbackTargetFailure : phase === 'post-verification' ? 'The effective production Worker version was not retained in this run state.' : `Cloudflare did not report Wrangler-deployed Worker ${exactDeployedVersion || 'unknown'} active before the bounded retry window expired.`;
    console.error(`::error title=${title}::${String(lastDetail || fallbackDetail).trim()}`);
    process.exit(1);
  }
  if (phase === 'baseline') {
    try { prepareWranglerDeployOutputCapture(); }
    catch (error) {
      console.error(`::error title=Unable to prepare deterministic Wrangler deploy capture::${String(error)}`);
      process.exit(1);
    }
    writeState({ baselineVersion: capturedVersion, deployedVersion: null, wranglerDeployedVersion: null, supersededBy: null });
  } else if (phase === 'post-deploy') {
    writeState({
      baselineVersion: state.baselineVersion,
      deployedVersion: capturedVersion,
      wranglerDeployedVersion: exactDeployedVersion,
      supersededBy,
    });
  }
  if (!outputPath) {
    console.error('::error title=Missing GITHUB_OUTPUT::Worker version capture requires GitHub Actions output support.');
    process.exit(1);
  }
  appendFileSync(outputPath, `version_id=${capturedVersion}\n`);
  if (phase === 'post-deploy') {
    appendFileSync(outputPath, `wrangler_version_id=${exactDeployedVersion}\n`);
    appendFileSync(outputPath, `superseded=${supersededBy ? 'true' : 'false'}\n`);
  }
  if (summaryPath) {
    appendFileSync(summaryPath, `| Worker version ${phase} | \`${capturedVersion}\`${supersededBy ? ` (superseded this run's \`${exactDeployedVersion}\`)` : ''} |\n`);
  }
  console.log(`Captured ${phase} Worker version: ${capturedVersion}`);
}

const isDirectExecution = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectExecution) await main();
