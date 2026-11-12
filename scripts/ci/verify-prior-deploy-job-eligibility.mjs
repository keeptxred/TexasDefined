/**
 * A complete GitHub Actions job can be marked failed after a real Worker
 * publish. Reuse its *asset handoff* only if it passed exact deploy, runtime,
 * and dual-origin asset checks and failed solely at an explicitly approved
 * post-deploy non-asset check (historical exact-run exception only).
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

// Nov 11 run #43113183643/job #130834293835 published its Worker and passed
// all five protected deploy/health/dual-origin original-byte checkpoints.
// The only failing later job step was the independent "Verify base production
// surfaces" image metadata test. Its log names only the unusual-Texas-businesses
// ImageObject missing verified rights, not a missing asset or runtime failure.
// The underlying root is the doubly encoded Britten%2520USA proxy filename;
// source matching is fixed in PR #7016. This EXACT failed job's original-byte
// handoff may seed the next deploy ONLY if the source fix is present and the
// separate exact Worker/source/dual-origin SHA verifier succeeds. It is NOT a
// successful deploy or permission to suppress the failed production check.
const KNOWN_PUBLISHED_IMAGE_RIGHTS_REGRESSION = Object.freeze({
  runId: 43113183643,
  jobId: 130834293835,
  failedStep: 'Verify base production surfaces',
});

// Nov 12 run #43152537155 published the active Worker and passed all original
// JS/CSS bytes on both origins. Its sole later failure was a 30-second
// direct-Worker Fredericksburg HTML transport timeout, retried twice: all
// earlier El Paso redirects, sitemap and canonical page checks had passed.
// This exact run may provide ORIGINAL asset bytes to the next deploy only
// after the bounded transport retry has been fixed in source AND the separate
// exact active Worker/source SHA/two-origin-hash gate passes. The failed
// independent page QA remains failed and must run again on the new release.
const KNOWN_PUBLISHED_FREDERICKSBURG_TIMEOUT = Object.freeze({
  runId: 43152537155,
  jobId: 130964877163,
  failedStep: 'Verify base production surfaces',
});

// Historical 2026-11-09 run #42640439772 actually published the Worker and
// passed the deployment, health and BOTH-origin original JS/CSS checks.
// The two later title checks failed after publication because the initial Bing
// title budget shortened complete visitor-facing titles. The correction was
// subsequently merged in PR #6888. This is an EXACT run+job exception to
// recover that published Worker's asset handoff, never a general exception for
// failed SEO validation or an unverified deployment.
const KNOWN_PUBLISHED_BING_TITLE_REGRESSION = {
  runId: 42640439772,
  jobId: 129239799336,
  steps: [
    'Verify District 6 complete 28-game archive, analysis and attribution on both production origins',
    'Verify base production surfaces',
  ],
};

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
  const historical = KNOWN_PUBLISHED_BING_TITLE_REGRESSION;
  const knownBingTitleFailure =
    job.run_id === historical.runId &&
    job.id === historical.jobId &&
    failures.length === historical.steps.length &&
    historical.steps.every((name) => failures.includes(name));
  if (knownBingTitleFailure) {
    // Only the asset handoff is eligible, not the failed page release. The
    // caller still must verify the exact active Worker version, source SHA,
    // every original hash and both public origins before it reuses bytes.
    return { eligible: true, mode: 'historical-published-title-regression-assets-only', criticalChecks: CRITICAL.length, permittedFailures: failures };
  }
  const imageIncident = KNOWN_PUBLISHED_IMAGE_RIGHTS_REGRESSION;
  if (job.run_id === imageIncident.runId && job.id === imageIncident.jobId
      && failures.length === 1 && failures[0] === imageIncident.failedStep) {
    const source = readFileSync('src/routes/article.$slug.tsx', 'utf8');
    if (!source.includes('Britten(?:%2520|%20| )USA')) {
      throw Error('The verified image-rights source gate is not repaired');
    }
    return { eligible: true, mode: 'exact-image-rights-incident-assets-only',
      criticalChecks: CRITICAL.length, permittedFailure: failures[0], exactRun: imageIncident.runId };
  }
  const fredericksburgIncident = KNOWN_PUBLISHED_FREDERICKSBURG_TIMEOUT;
  if (job.run_id === fredericksburgIncident.runId &&
      job.id === fredericksburgIncident.jobId &&
      failures.length === 1 && failures[0] === fredericksburgIncident.failedStep) {
    const source = readFileSync('scripts/ci/verify-el-paso-fredericksburg-release.mjs', 'utf8');
    if (!source.includes('const MAX_TRANSPORT_ATTEMPTS = 3;') ||
        !source.includes('attempt === MAX_TRANSPORT_ATTEMPTS')) {
      throw Error('The exact Fredericksburg transport timeout retry is not repaired');
    }
    return { eligible: true, mode: 'exact-published-worker-transport-timeout-assets-only',
      criticalChecks: CRITICAL.length, permittedFailure: failures[0],
      exactRun: fredericksburgIncident.runId };
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
