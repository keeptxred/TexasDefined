/**
 * A complete GitHub Actions job can be marked failed after a real Worker
 * publish. Reuse its *asset handoff* only if it passed exact deploy, runtime,
 * and dual-origin asset checks and failed solely at the known non-asset
 * MSR Houston screenshot check.
 *
 * This qualifies an asset artifact, not a whole-site release or 95+ authority.
 * verify-prior-asset-handoff.mjs separately requires the active Worker version,
 * exact source SHA, all expected asset hashes and both public origins.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const CRITICAL = [
  'Deploy TexasDefined Worker',
  'Capture deployed Worker version',
  'Verify direct Worker health',
  'Verify canonical production health',
  'Verify current and previous release JS/CSS on both public origins',
];
const ALLOWED_POSTDEPLOY_NON_ASSET_FAILURE = 'Verify MSR Houston responsive visitor page and licensed photo';

export function qualifyPriorDeployJob(payload) {
  const jobs = Array.isArray(payload?.jobs) ? payload.jobs.filter((job) => job.name === 'deploy') : [];
  if (jobs.length !== 1) throw Error('Expected exactly one deploy job in GitHub Actions evidence');
  const job = jobs[0];
  if (!['success', 'failure'].includes(job.conclusion)) throw Error('Deploy job has not completed');
  const steps = Array.isArray(job.steps) ? job.steps : [];
  for (const name of CRITICAL) {
    const matched = steps.filter((step) => step.name === name);
    if (matched.length !== 1 || matched[0].conclusion !== 'success') {
      throw Error('Required published-Worker safety gate not successful: ' + name);
    }
  }
  const failures = steps.filter((step) => step.conclusion === 'failure').map((step) => step.name);
  if (job.conclusion === 'success') {
    if (failures.length) throw Error('Success job reports failed substeps');
    return { eligible: true, mode: 'successful-deploy-job', criticalChecks: CRITICAL.length };
  }
  if (failures.length !== 1 || failures[0] !== ALLOWED_POSTDEPLOY_NON_ASSET_FAILURE) {
    throw Error('Failed deploy job includes unapproved or missing failure evidence: ' + failures.join(', '));
  }
  // Narrow exception: the exact published Worker passed health and hash checks;
  // its unrelated responsive screenshot failed after deployment.
  return { eligible: true, mode: 'postdeploy-visual-check-failed-only', criticalChecks: CRITICAL.length, permittedFailure: failures[0] };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const evidence = JSON.parse(readFileSync(0, 'utf8'));
    console.log(JSON.stringify(qualifyPriorDeployJob(evidence)));
  } catch (error) {
    console.error('::warning title=Reject unverified previous deployment::' + String(error?.message || error));
    process.exitCode = 1;
  }
}
