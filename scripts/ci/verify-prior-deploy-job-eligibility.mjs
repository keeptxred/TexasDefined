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

// Nov 12 #43251806283 published its Worker, passed direct/canonical health
// and the complete dual-origin old/new SHA asset audit. A later sports-venue
// checker demanded a second source-review sentence that was never in the
// actual directory. PR #7039 removed only that impossible assertion, preserving
// current individual-record date and karting closure checks. Eligible ONLY to
// reuse verified original bytes after separate active Worker/source/hash checks.
const KNOWN_PUBLISHED_SPORTS_DIRECTORY_ASSERTION = Object.freeze({
  runId: 43251806283,
  jobId: 131299301592,
  failedStep: 'Verify sports venue editorial production',
});

// Nov 12 run #43314663760/job #131519408864 actually published the
// 100%-traffic Worker 2f9420e0-0eba-4721-8727-a338a82cba72 from SHA
// 05719211996457c662e8d6d176883937ba9cf98e. GitHub logged success for
// deploy, Worker-version capture, both health probes, and full dual-origin
// original-byte JS/CSS verification. The only later failed step was the
// independent Fredericksburg Explore sitemap canonical assertion.
// This exception qualifies ORIGINAL BYTES ONLY after the exact-sitemap
// uniqueness repair (#7050) and diagnostic strict gate (#7049) are in source;
// neither the failed full release nor its broken sitemap is certified.
const KNOWN_PUBLISHED_FREDERICKSBURG_SITEMAP = Object.freeze({
  runId: 43314663760,
  jobId: 131519408864,
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

// Exact Nov 12, 2026 23:50Z live Worker 632decb8-3e25-43dd-a42f-73b236ea6336
// was published from SHA ab4becf... in deploy run 43331358104.
// Dual-origin original-byte asset, canonical+direct health, deployment and
// Worker-version capture passed. Three *later* checks failed on unrelated
// statewide responsive HTTP, Explore sitemap and CJ tracking contracts.
// Qualifies its immutable asset handoff only; NEVER calls its site release
// successful, suppresses future verifiers, or accepts any other failed run.
// The caller separately checks exact active version/source SHA/all original
// asset hashes/two origins; the time-bound workflow exception expires at 72h.
const NOV12_PUBLISHED_WORKER_UNRELATED_LIVE_FAILURES = Object.freeze({
  runId: 43331358104,
  jobId: 131576580894,
  failedSteps: [
    'Verify ticketing and Christmas pages at mobile and desktop widths',
    'Verify base production surfaces',
    'Verify changed CJ account tracking without affiliate clicks',
  ],
});

// Nov 13 run #43440830866 published Worker 14cd9057-b9e3-4cf6-b2f8-3e103afe7657
// at 100% from source SHA f3e92256e6659d25d03ba2b938f99e09b8702805.
// All five protected deploy/health/dual-origin byte checks passed, including
// 6,762 original-byte source/hash records for 139 emitted assets. Its single
// later failure was the independent /events Chrome SSR HTTP 500 (Cloudflare
// Ray a59e758888c7a2e0-LAX). This exception can ONLY qualify the immutable
// exact-run asset handoff to seed the next release. It does NOT certify that
// event page or this failed release, and the next Worker must pass all real
// page acceptance checks again, independently of this historical failure.
// The caller enforces the exact currently-active Worker version, source SHA,
// original asset hashes and BOTH origins, before using any old bytes.
const NOV13_PUBLISHED_WORKER_EVENTS_VISUAL_FAILURE = Object.freeze({
  runId: 43440830866,
  jobId: 131937683043,
  failedStep: 'Verify ticketing and Christmas pages at mobile and desktop widths',
  sourceSha: 'f3e92256e6659d25d03ba2b938f99e09b8702805',
  workerVersion: '14cd9057-b9e3-4cf6-b2f8-3e103afe7657',
});

// Nov 13 #43447328975 actually published 100%-traffic Worker
// 1e9cbeec-7e97-470f-9531-91ce2ab0946b from exact SHA 3cd985...
// and passed all five critical publish/health/dual-origin old+new asset
// hash checks. The sole later failure was the independent turkey Chrome
// test's 25-second /hunting internal request timeout, while its hunting
// hub browser passed. Do not mark that page/test/release as successful.
// Eligible only to preserve the exact published ORIGINAL asset bytes once
// the narrowly bounded timeout retry is present in the next source.
const NOV13_PUBLISHED_WORKER_TURKEY_TIMEOUT = Object.freeze({
  runId: 43447328975,
  jobId: 131960103008,
  failedStep: 'Verify hunting hub and turkey guide in desktop/mobile Chrome',
  sourceSha: '3cd9851671f9077f9f57e4bc7d648816826002f2',
  workerVersion: '1e9cbeec-7e97-470f-9531-91ce2ab0946b',
});

// Nov 13 #43460115327 published 100%-traffic Worker 6f58c413... from
// SHA 3836f5..., and passed all five critical worker/health/dual-origin
// original JS/CSS checks. The asset-handoff-43460115327 artifact exists.
// Its two LATER independent failures were MSR mobile Chrome navigation
// transport timeout and three missing District 21 team scorecards (HTTP 200).
// Neither is certified here: qualify *original-byte asset preservation only*
// for this exact run/job/source/version after targeted source diagnostics and
// fail-closed smoke checks are present. The downstream original-byte validator
// still pins the active Worker/source SHA and every old hash on both origins.
const NOV13_PUBLISHED_WORKER_MSR_D21_FAILURES = Object.freeze({
  runId: 43460115327,
  jobId: 132004453072,
  sourceSha: '3836f5f8d492b970ba6a6e7edb10679309250479',
  workerVersion: '6f58c413-3ace-4666-9fd3-dba3afb7d5da',
  failedSteps: [
    'Verify MSR Houston responsive visitor page and licensed photo',
    'Verify District 21 hub and eight team scorecards on production',
  ],
});

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
  const msrD21 = NOV13_PUBLISHED_WORKER_MSR_D21_FAILURES;
  if (job.run_id === msrD21.runId && job.id === msrD21.jobId &&
      failures.length === msrD21.failedSteps.length &&
      msrD21.failedSteps.every((step) => failures.includes(step))) {
    const msr = readFileSync('scripts/ci/verify-msr-houston-browser.mjs', 'utf8');
    const smoke = readFileSync('scripts/ci/verify-built-worker-ssr-core.mjs', 'utf8');
    const d21 = readFileSync('scripts/ci/verify-district21-football-production.mjs', 'utf8');
    if (!msr.includes('MSR_TRANSIENT_NAVIGATION_TIMEOUT') ||
        !msr.includes("error?.name !== 'TimeoutError' || attempt === 3") ||
        !msr.includes('assert.equal(response?.status(), 200') ||
        !d21.includes('cfCacheStatus: response.headers.get') ||
        !['fort-bend-austin', 'fort-bend-bush', 'fort-bend-clements']
          .every((slug) => smoke.includes('data-football-d21-team-section="' + slug + '"'))) {
      throw Error('Exact published Worker source repair required: MSR transport and strict District 21 SSR diagnostics');
    }
    return { eligible: true, mode: 'exact-nov13-msr-d21-original-assets-only',
      criticalChecks: CRITICAL.length, permittedFailures: failures,
      exactRun: msrD21.runId, requiredSourceSha: msrD21.sourceSha,
      requiredWorkerVersion: msrD21.workerVersion };
  }
  const turkeyTimeout = NOV13_PUBLISHED_WORKER_TURKEY_TIMEOUT;
  if (job.run_id === turkeyTimeout.runId && job.id === turkeyTimeout.jobId &&
      failures.length === 1 && failures[0] === turkeyTimeout.failedStep) {
    const visualVerifier = readFileSync('scripts/ci/verify-turkey-hunting-browser.mjs', 'utf8');
    if (!visualVerifier.includes('TURKEY_TRANSIENT_LINK_TIMEOUT') ||
        !visualVerifier.includes('attempt <= 3') ||
        !visualVerifier.includes('attempt === 3') ||
        !visualVerifier.includes('assert.ok(verified, "linked TexasDefined route was not verified: " + path)')) {
      throw Error('Published turkey link timeout cannot qualify until narrow retries preserve strict link assertions');
    }
    return { eligible: true, mode: 'exact-nov13-turkey-timeout-original-assets-only',
      criticalChecks: CRITICAL.length, permittedFailures: failures,
      exactRun: turkeyTimeout.runId, requiredSourceSha: turkeyTimeout.sourceSha,
      requiredWorkerVersion: turkeyTimeout.workerVersion };
  }
  const exactNov13 = NOV13_PUBLISHED_WORKER_EVENTS_VISUAL_FAILURE;
  if (job.run_id === exactNov13.runId && job.id === exactNov13.jobId
    && failures.length === 1 && failures[0] === exactNov13.failedStep) {
    return { eligible: true, mode: 'exact-nov13-active-worker-original-assets-only',
      criticalChecks: CRITICAL.length, permittedFailures: failures,
      exactRun: exactNov13.runId, requiredSourceSha: exactNov13.sourceSha,
      requiredWorkerVersion: exactNov13.workerVersion };
  }
  const exactNov12 = NOV12_PUBLISHED_WORKER_UNRELATED_LIVE_FAILURES;
  if (job.run_id === exactNov12.runId && job.id === exactNov12.jobId
    && failures.length === exactNov12.failedSteps.length
    && exactNov12.failedSteps.every(name => failures.includes(name))) {
    return { eligible: true, mode: 'exact-nov12-active-worker-original-assets-only',
      criticalChecks: CRITICAL.length, permittedFailures: failures,
      exactRun: exactNov12.runId };
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
  const sportsIncident = KNOWN_PUBLISHED_SPORTS_DIRECTORY_ASSERTION;
  if (job.run_id === sportsIncident.runId && job.id === sportsIncident.jobId &&
      failures.length === 1 && failures[0] === sportsIncident.failedStep) {
    const source = readFileSync('scripts/production/verify-sports-venue-editorial-production.mjs', 'utf8');
    if (!source.includes("assertIncludes(html, 'The most recently checked individual venue record in this collection was verified'") ||
        !source.includes("assertIncludes(html, 'karting operation announced a temporary closure'") ||
        source.includes("assertIncludes(html, 'The latest individual venue source check was'")) {
      throw Error('Exact motorsports source-review verifier is not repaired without relaxing dated-record and closure checks');
    }
    return { eligible: true, mode: 'exact-published-worker-sports-date-assertion-assets-only',
      criticalChecks: CRITICAL.length, permittedFailure: failures[0], exactRun: sportsIncident.runId };
  }
  const sitemapIncident = KNOWN_PUBLISHED_FREDERICKSBURG_SITEMAP;
  if (job.run_id === sitemapIncident.runId &&
      job.id === sitemapIncident.jobId &&
      failures.length === 1 && failures[0] === sitemapIncident.failedStep) {
    const sitemapSource = readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
    const liveVerifier = readFileSync('scripts/ci/verify-el-paso-fredericksburg-release.mjs', 'utf8');
    if (!sitemapSource.includes('function dedupeUrlEntries(') ||
        (sitemapSource.match(/const entries = dedupeUrlEntries\(\[/g) ?? []).length !== 2 ||
        !sitemapSource.includes('await auditedFredericksburgSitemapEntry()') ||
        !liveVerifier.includes('const expectedMatches = sitemap.split(expected).length - 1;')) {
      throw Error('Published Fredericksburg sitemap incident needs source-level duplicate fix and strict measured live verifier');
    }
    // The separate old-Worker handoff still verifies exact live 100%-traffic
    // version, source SHA, every original asset SHA and both public origins.
    return { eligible: true, mode: 'exact-published-worker-fredericksburg-sitemap-assets-only',
      criticalChecks: CRITICAL.length, permittedFailure: failures[0],
      exactRun: sitemapIncident.runId };
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
