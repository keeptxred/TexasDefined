/**
 * Narrow, fail-closed proof of the exact Nov18 published 55c0 Worker whose
 * deployment run FAILED after publication on two unrelated canonical HTTP 500s.
 * This NEVER converts the run into a successful deployment and NEVER trusts its
 * missing handoff artifact; old bytes must still be freshly captured and SHA
 * verified on BOTH current origins by the existing guarded retention pipeline.
 */
import { readFileSync } from 'node:fs';

export const INCIDENT = Object.freeze({
  runId: 44223004831,
  jobId: 134529253513,
  sourceSha: '46086633c816765a2e746961643ef80751b638b5',
  workerVersion: '55c0e4a9-48ec-4e2b-a787-ef9efd979438',
});
const MANDATORY = [
  'Deploy TexasDefined Worker',
  'Capture deployed Worker version',
  'Verify direct Worker health',
  'Verify canonical production health',
  'Verify current and previous release JS/CSS on both public origins',
  'Capture old HTML JS/CSS hashes before Worker replacement',
  'Prove captured four-page hash inventory belongs to exact active Worker',
  'Retain bounded old hashed client assets',
  'Measure postdeploy hashed-asset continuity',
  'Preserve old/new asset delivery evidence and next-release handoff',
];
const ALLOWED_FAILURES = [
  'Verify District 16 scorecards and official links on direct Worker and canonical domain',
  'Verify base production surfaces',
];
export function assertExactPublished55c0(run, jobs) {
  if (run?.id !== INCIDENT.runId || run?.head_sha !== INCIDENT.sourceSha
      || run?.status !== 'completed' || run?.conclusion !== 'failure') {
    throw Error('Refusing unrecognized published-Worker source run or altered GitHub conclusion');
  }
  const match = (jobs?.jobs ?? []).find(j => j.id === INCIDENT.jobId && j.name === 'deploy');
  if (!match || match.status !== 'completed' || match.conclusion !== 'failure') {
    throw Error('Refusing missing or non-failed exact deploy job');
  }
  const steps = match.steps ?? [];
  for (const step of MANDATORY) {
    if (steps.filter(s => s.name === step && s.status === 'completed' && s.conclusion === 'success').length !== 1) {
      throw Error('Missing independently successful source publish/asset gate: ' + step);
    }
  }
  const failed = steps.filter(s => s.conclusion === 'failure').map(s => s.name).sort();
  if (failed.length !== ALLOWED_FAILURES.length
      || !failed.every((name, i) => name === [...ALLOWED_FAILURES].sort()[i])) {
    throw Error('Unexpected failed deploy verifier; known unrelated canonical 500s only');
  }
  return {runId: INCIDENT.runId, jobId: INCIDENT.jobId, sha: INCIDENT.sourceSha,
    expectedLiveWorker: INCIDENT.workerVersion, failedChecks: failed,
    priorDeploymentStillFailed: true, originalBytesProven: false};
}
if (process.argv[1]?.endsWith('verify-55c0-predecessor-proof.mjs')) {
  try {
    const run = JSON.parse(readFileSync(process.argv[2], 'utf8'));
    const jobs = JSON.parse(readFileSync(process.argv[3], 'utf8'));
    console.log(JSON.stringify(assertExactPublished55c0(run, jobs)));
  } catch (e) {
    console.error('::error title=Unsafe 55c0 source provenance::' + String(e?.message ?? e));
    process.exitCode = 1;
  }
}
