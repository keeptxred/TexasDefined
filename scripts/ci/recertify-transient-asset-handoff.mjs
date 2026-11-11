/**
 * EXACT-INCIDENT RECERTIFICATION ONLY.
 *
 * Nov 10 deploy #42842196279 published the currently active 100%-traffic
 * Worker but recorded two canonical-origin transport errors among 7,280
 * original-byte dual-origin checks. Its job correctly failed. This module can
 * restore only the exact original asset handoff after new independent 200/MIME/
 * original SHA verification on BOTH origins, with the active Worker still
 * precisely the same version. No 404, 5xx, wrong hash, stale Worker, alternate
 * run, expired artifact, or unrelated failed job is ever forgiven.
 *
 * The original failed report remains immutable in the GitHub run artifact.
 * The reconstructed report records explicit new HTTP evidence.
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyPriorAssetHandoff } from './verify-prior-asset-handoff.mjs';

export const INCIDENT = Object.freeze({
  runId: 42842196279,
  jobId: 129920058950,
  sourceSha: 'a651c58e630b303a2b82bc31c936a3ad9f335a03',
  workerVersion: '7ed30068-bd0d-4ddb-b4f2-ddfe3909dadf',
  checkedAt: '2026-11-10T15:23:18.953Z',
  assetCount: 7280,
  maxAgeHours: 72,
  failedPaths: Object.freeze({
    '/assets/texas-gateway-bestof-batch9-C8e0mg02.js': '3033cf901d3ee555e7cc435f01fb6e482bb8c65d019a83ceec513033b31f9de7',
    '/assets/external-link-C89WsLHQ.js': '6c74113061795dc374a49bc873a94cb449320b2fc8205ecb1dd86e20912f8bf8',
  }),
});
const ORIGINS = Object.freeze({
  direct: 'https://texasdefined-site.freddy-coppola.workers.dev',
  canonical: 'https://texasdefined.com',
});
const DIGEST = /^[0-9a-f]{64}$/;
const ASSET = /^\/assets\/[A-Za-z0-9_][A-Za-z0-9._-]*\.(?:js|css)$/;

function requireExact(condition, reason) { assert.ok(condition, reason); }
function checkedHash(data) { return createHash('sha256').update(data).digest('hex'); }
function sameArrayValues(actual, expected) {
  return actual.length === expected.length && expected.every(item => actual.includes(item));
}
function sameFailureSignature(record, path) {
  return record?.path === path && record?.origin === 'canonical' &&
    record?.status === 'network-error' && record?.hashMismatch !== true;
}
function validOriginal(asset) {
  return ASSET.test(asset?.path || '') &&
    ['canonical','direct'].includes(asset?.origin) &&
    asset?.status === 200 && asset?.ok === true &&
    DIGEST.test(asset.sha256 || '') && asset.oldHashMatches !== false;
}

export function qualifyKnownPublishedNetworkFailure(payload) {
  const jobs = Array.isArray(payload?.jobs) ? payload.jobs.filter(x => x.name === 'deploy') : [];
  requireExact(jobs.length === 1, 'Expected exactly one deploy job');
  const job = jobs[0];
  requireExact(job.id === INCIDENT.jobId && job.run_id === INCIDENT.runId,
    'Network-only repair cannot accept another GitHub run/job');
  requireExact(job.conclusion === 'failure', 'Original job must remain honestly failed');
  const steps = Array.isArray(job.steps) ? job.steps : [];
  const failures = steps.filter(x => x.conclusion === 'failure').map(x => x.name);
  requireExact(sameArrayValues(failures, ['Verify current and previous release JS/CSS on both public origins']),
    'Unrelated or additional deployment failure cannot be recertified');
  const required = [
    'Restore active Worker\'s verified successful asset handoff',
    'Capture old HTML JS/CSS hashes before Worker replacement',
    'Retain bounded old hashed client assets',
    'Refuse superseded Worker revision',
    'Deploy TexasDefined Worker',
    'Capture deployed Worker version',
    'Verify direct Worker health',
    'Verify canonical production health',
    'Measure postdeploy hashed-asset continuity',
    'Preserve old/new asset delivery evidence and next-release handoff',
  ];
  for (const name of required) {
    const matches = steps.filter(x => x.name === name);
    requireExact(matches.length === 1 && matches[0].conclusion === 'success',
      'Unverified published Worker safety step: ' + name);
  }
  return { verified: true, runId: job.run_id, jobId: job.id, passedSteps: required.length };
}

export function verifyOriginalIncident(snapshot, report, { workerVersion, sourceSha, now = Date.now() }) {
  requireExact(workerVersion === INCIDENT.workerVersion && sourceSha === INCIDENT.sourceSha,
    'Recovery is pinned to one proven Worker version and source commit');
  requireExact(report?.expected === INCIDENT.workerVersion &&
    report.checkedAt === INCIDENT.checkedAt && report.assets?.length === INCIDENT.assetCount,
    'Original delivery artifact is not the exact failed release');
  requireExact(Number.isFinite(now) && now >= Date.parse(report.checkedAt) &&
    now - Date.parse(report.checkedAt) <= INCIDENT.maxAgeHours * 3_600_000,
    'Original handoff is past the 72-hour original-byte retention window');
  const final = Array.isArray(snapshot?.snapshots) ? snapshot.snapshots.at(-1) : null;
  requireExact(final?.sourceCommit === INCIDENT.sourceSha &&
    Array.isArray(final.builtAssets) && final.builtAssets.length === 139,
    'Snapshot does not identify the exact deployed source and emitted assets');
  const badPaths = Object.keys(INCIDENT.failedPaths);
  requireExact(Array.isArray(report.failures) && report.failures.length === 2 &&
    badPaths.every(path => report.failures.some(f => sameFailureSignature(f, path))),
    'Original report must have only the two known canonical transport errors');
  const grouped = new Map();
  for (const asset of report.assets) {
    requireExact(ASSET.test(asset?.path || '') && ['direct','canonical'].includes(asset?.origin),
      'Original report contains a non-asset path or invalid origin');
    if (!grouped.has(asset.path)) grouped.set(asset.path, new Map());
    const entries = grouped.get(asset.path);
    requireExact(!entries.has(asset.origin), 'Duplicate asset/origin record: ' + asset.path);
    entries.set(asset.origin, asset);
  }
  requireExact(grouped.size === INCIDENT.assetCount / 2, 'Original dual-origin set is incomplete');
  for (const [path, pair] of grouped) {
    const direct = pair.get('direct'), canonical = pair.get('canonical');
    requireExact(Boolean(direct && canonical), 'Missing asset on either origin: ' + path);
    requireExact(validOriginal(direct), 'Original direct hash/status failed for ' + path);
    if (badPaths.includes(path)) {
      requireExact(sameFailureSignature(canonical,path) &&
        direct.sha256 === INCIDENT.failedPaths[path] &&
        canonical.oldHashMatches !== false,
        'Known transient failure lacks pinned original direct SHA: ' + path);
    } else {
      requireExact(validOriginal(canonical) && direct.sha256 === canonical.sha256,
        'Another asset is unverified, missing, or differs across origins: ' + path);
    }
  }
  for (const entry of final.builtAssets) {
    requireExact(grouped.has(entry.path), 'Original published built asset missing: ' + entry.path);
  }
  return { expected: workerVersion, checked: report.assets.length,
    preserved: grouped.size - badPaths.length, retryPaths: badPaths };
}

export function repairReportWithIndependentProbes(snapshot, report, probes, args) {
  const proof = verifyOriginalIncident(snapshot, report, args);
  requireExact(Array.isArray(probes) && probes.length === proof.retryPaths.length * 2,
    'Recertification requires both fresh origins for every failed path');
  const observed = new Map();
  for (const record of probes) {
    requireExact(proof.retryPaths.includes(record?.path) &&
      ['direct','canonical'].includes(record.origin),
      'Unexpected target/origin in fresh verification');
    const key = record.path + ':' + record.origin;
    requireExact(!observed.has(key), 'Duplicate live recheck');
    requireExact(record.status === 200 && record.contentType?.includes('javascript') &&
      DIGEST.test(record.sha256 || '') && record.sha256 === INCIDENT.failedPaths[record.path] &&
      record.bytes > 0 && record.challenge !== true,
      'Fresh origin did not deliver exact original JS/MIME/SHA: ' + key);
    observed.set(key, record);
  }
  for (const path of proof.retryPaths) for (const origin of ['direct','canonical']) {
    requireExact(observed.has(path + ':' + origin), 'Missing fresh original bytes for ' + path + '/' + origin);
  }
  const copied = structuredClone(report);
  copied.assets = copied.assets.map(item => {
    if (item.ok === true) return item;
    const p = observed.get(item.path + ':' + item.origin);
    requireExact(Boolean(p), 'Cannot replace any unverified failed record');
    return { ...item, status: 200, mime: p.contentType, ok: true,
      sha256: p.sha256, bytes: p.bytes, oldHashMatches: true,
      recoveryProof: { checkedAt: p.checkedAt, sourceUrl: p.url, http: p.status,
        sha256: p.sha256, contentType: p.contentType } };
  });
  copied.failures = [];
  copied.recertification = { mode: 'exact-incident-fresh-original-asset-probe', runId: INCIDENT.runId,
    sourceSha: INCIDENT.sourceSha, workerVersion: INCIDENT.workerVersion,
    originalReportCheckedAt: report.checkedAt, recoveredPaths: proof.retryPaths,
    liveProbes: probes, originalJobStillFailed: true };
  verifyPriorAssetHandoff(snapshot,copied,{expectedWorkerVersion:args.workerVersion,
    expectedSourceSha:args.sourceSha});
  return copied;
}

function classifyJs(type) {
  return /^(?:text\/javascript|application\/javascript|application\/x-javascript)(?:\s*;|$)/i.test(type || '');
}
async function fetchOriginal(url, { requireWorker = null } = {}) {
  let error;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        cache: 'no-store', redirect: 'manual', signal: AbortSignal.timeout(25_000),
        headers: { 'user-agent': 'TexasDefined-Verified-Worker-Asset-Recovery/1.0',
          'cache-control':'no-cache', accept: '*/*' },
      });
      const contentType = response.headers.get('content-type') || '';
      const version = response.headers.get('x-texasdefined-worker-version') || '';
      requireExact(response.status === 200 && response.headers.get('cf-mitigated') !== 'challenge',
        'Active public source returned HTTP ' + response.status + ': ' + url);
      if (requireWorker !== null) requireExact(version === requireWorker,
        'Current public Worker changed during recertification: ' + url + ' ' + version);
      const body = Buffer.from(await response.arrayBuffer());
      requireExact(body.length > 0 && body.length <= 12 * 1024 * 1024,
        'Live source bytes absent or unreasonable: ' + url);
      return { url, status: response.status, contentType, workerVersion: version,
        bytes: body.length, sha256: checkedHash(body), challenge:false,
        checkedAt: new Date().toISOString() };
    } catch (e) {
      error = e;
      if (attempt === 2 || (e?.name === 'AssertionError' && /HTTP [45]\d\d/.test(e.message)))
        break;
      await new Promise(done => setTimeout(done, 600 * (attempt + 1)));
    }
  }
  throw new Error('Exact original asset provenance could not be reproduced: ' + url +
    ': ' + String(error?.message || error));
}
async function verifyActiveWorkerOnBothOrigins() {
  for (const [name,origin] of Object.entries(ORIGINS)) {
    const page = await fetchOriginal(origin + '/texas-high-school-football-teams/shepherd?verify_asset_recovery=' +
      INCIDENT.runId + '-' + Date.now(), { requireWorker: INCIDENT.workerVersion });
    requireExact(page.contentType.includes('text/html'),
      'Active ' + name + ' Worker did not return HTML');
  }
}
async function liveProof(paths) {
  await verifyActiveWorkerOnBothOrigins();
  const probes = [];
  for (const path of paths) {
    for (const [origin,base] of Object.entries(ORIGINS)) {
      const record = await fetchOriginal(base + path);
      requireExact(classifyJs(record.contentType), 'Invalid original JS MIME at ' + record.url);
      probes.push({ ...record, path, origin });
    }
  }
  await verifyActiveWorkerOnBothOrigins();
  return probes;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv[2] === '--verify-job') {
      const jobJson = await new Promise((done,fail)=>{
        let data='';
        process.stdin.setEncoding('utf8');
        process.stdin.on('data',chunk => { data += chunk; if(data.length > 500_000) fail(Error('GitHub job evidence too large')); });
        process.stdin.on('end',()=>done(data)); process.stdin.on('error',fail);
      });
      console.log(JSON.stringify(qualifyKnownPublishedNetworkFailure(JSON.parse(jobJson))));
    } else if (process.argv[2] === '--repair') {
      const [snapshotPath,reportPath,workerVersion,sourceSha,outputPath] = process.argv.slice(3);
      requireExact(Boolean(snapshotPath && reportPath && workerVersion && sourceSha && outputPath),
        'Missing exact-source repair arguments');
      const [snapshot,report]=await Promise.all([snapshotPath,reportPath].map(p=>readFile(p,'utf8').then(JSON.parse)));
      const proof = verifyOriginalIncident(snapshot,report,{workerVersion,sourceSha});
      const probes=await liveProof(proof.retryPaths);
      const updated=repairReportWithIndependentProbes(snapshot,report,probes,{workerVersion,sourceSha});
      await writeFile(outputPath, JSON.stringify(updated,null,2) + '\n');
      console.log(JSON.stringify({recovery:'verified-original-hashes-only', originalRun:INCIDENT.runId,
        activeWorker:workerVersion, originalChecks:report.assets.length, missingReprobed:proof.retryPaths.length,
        freshOriginProof:probes.map(p=>({path:p.path,origin:p.origin,status:p.status,
          sha256:p.sha256,contentType:p.contentType}))}));
    } else throw Error('Run with --verify-job or --repair');
  } catch(error) {
    console.error('::error title=Exact-worker asset recertification rejected::' + String(error?.message||error));
    process.exitCode=1;
  }
}
