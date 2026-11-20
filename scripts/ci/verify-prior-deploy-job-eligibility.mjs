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

// Nov 13 deploy #43460115327 genuinely published 100%-traffic Worker
// 6f58c413-3ace-4666-9fd3-dba3afb7d5da from source 3836f5f8...,
// then proved deployed version, both origins' health, and each original
// JS/CSS byte on both origins. Only two later, independent page acceptance
// checks failed: mobile MSR Chrome navigation timed out without receiving
// the first response, and three Batch018 District 21 profiles lacked
// their source-checked league overlay. Subsequent code now (a) retries only
// transient MSR navigation timeouts, preserving all visual/rights assertions,
// and (b) shows independent District 21 evidence regardless of authored
// program season/notice overlays. This exception qualifies ONLY the exact
// published Worker's immutable asset handoff, NOT its failed page checks.
// The next deploy must rerun and pass every page acceptance test and the
// separate exact Worker/source SHA/dual-origin original-byte verifier.
const NOV13_PUBLISHED_WORKER_MSR_DISTRICT21 = Object.freeze({
  runId: 43460115327,
  jobId: 132004453072,
  sourceSha: '3836f5f8d492b970ba6a6e7edb10679309250479',
  workerVersion: '6f58c413-3ace-4666-9fd3-dba3afb7d5da',
  failedSteps: [
    'Verify MSR Houston responsive visitor page and licensed photo',
    'Verify District 21 hub and eight team scorecards on production',
  ],
});

// Nov 13 #43447328975 actually published 100%-traffic Worker
// 1e9cbeec-7e97-470f-9531-91ce2ab0946b from exact SHA 3cd985...
// and passed all five critical publish/health/dual-origin old+new asset
// hash checks. The sole later failure was the independent turkey Chrome
// test's 25-second /hunting internal request timeout, while its hunting
// hub browser passed. Do not mark that page/test/release as successful.
// Eligible only to preserve the exact published ORIGINAL asset bytes once
// the narrowly bounded timeout retry is present in the next source.
// Nov 13 publish run #43509240362 attempt 1 shipped the current 100%-traffic
// Worker 79902b61 and passed deploy, version capture, both public-origin
// health probes, and complete old/new JS/CSS original-byte validation. Only
// a later District 16 Chrome navigation reached TimeoutError after 45s.
// Attempt 2 of the SAME run was correctly rejected as a stale source and must
// never stand in for the published attempt 1. This exact exception qualifies
// immutable original asset bytes ONLY once the District 16 verifier has its
// narrowly bounded transport retry. It does not certify the failed release,
// nor skip independent next-release browser acceptance.
const NOV13_PUBLISHED_DISTRICT16_NAV_TIMEOUT = Object.freeze({
  runId: 43509240362,
  jobId: 132174849722,
  sourceSha: '9019a46c4317fbbbd69ceb348fc2f02d2e589498',
  workerVersion: '79902b61-3641-48db-a400-ddc81e71a162',
  failedStep: 'Verify District 16 mobile and desktop rendered layout',
});

const NOV13_PUBLISHED_WORKER_TURKEY_TIMEOUT = Object.freeze({
  runId: 43447328975,
  jobId: 131960103008,
  failedStep: 'Verify hunting hub and turkey guide in desktop/mobile Chrome',
  sourceSha: '3cd9851671f9077f9f57e4bc7d648816826002f2',
  workerVersion: '1e9cbeec-7e97-470f-9531-91ce2ab0946b',
});

// Nov 13 published Worker 7d2202c2... from source 4d9b10c7... in
// workflow #43524206406. The full Worker publish, version capture,
// canonical/direct health and EVERY emitted/retained JS/CSS dual-origin
// original-byte check succeeded. Only a separate District 5 production
// verifier timed out on the direct workers.dev *request* after the canonical
// origin had already passed all 28 schedule cards and data assertions.
// It must re-run with a strictly bounded transient transport retry on the
// next revision. This qualifies its immutably evidenced original asset
// handoff only, NEVER the failed page acceptance or release status.
const NOV13_PUBLISHED_DISTRICT5_DIRECT_TIMEOUT = Object.freeze({
  runId: 43524206406,
  jobId: 132225789491,
  failedStep: 'Verify District 5-6A scorecard on direct Worker and canonical domain',
  sourceSha: '4d9b10c7ada94b9843202d0400d59f8ad7b6eec1',
  workerVersion: '7d2202c2-619a-458f-be72-ce21eee8c61b',
});

// Nov 14 run #43608793638 actually shipped the 100%-traffic Worker
// 695cd863-f891-4b2b-8c60-22f722f7cc0e from SHA 5f80e24f....
// It passed Worker publish, version capture, direct/canonical health and
// COMPLETE dual-origin original-byte old/new CSS/JS validation. One later,
// independent Moody Gardens browser test observed its title changing after
// hydration. PR #7171 fixes the title/description source mismatch and adds
// a post-hydration browser assertion. Recover ORIGINAL BYTES ONLY from this
// EXACT failed run and job after the separately enforced Worker/source/hash
// and dual-origin safety gate succeeds; never certify the page or release.
const NOV14_MOODY_POSTHYDRATION_TITLE_FAILURE = Object.freeze({
  runId: 43608793638,
  jobId: 132489033467,
  sourceSha: '5f80e24f9791b86ec8ab87e9f2fb910cca21521f',
  workerVersion: '695cd863-f891-4b2b-8c60-22f722f7cc0e',
  failedStep: 'Verify Moody Gardens four-viewport browser authority and layout',
});

// Nov 14 run #43629450047 / deploy job #132552595374 published the now
// 100%-traffic Worker 4a67cc9a... from exact 9afb270... source. GitHub
// confirms deploy/version, direct/canonical health and every original-byte
// current+prior JS/CSS check completed SUCCESS; its only failed step was the
// independent Moody Gardens production text acceptance. The page did contain
// the admission guidance but the SSR HTML encoded the apostrophe in the
// visitor-facing phrase. The next-source verifier now normalizes HTML
// entities before comparing the fully intact required marker. Recover ONLY
// the verified original-byte handoff of this EXACT failed job; the failed
// Moody acceptance must remain failed, and the next release independently
// reruns ALL production page/asset checks. The caller still verifies exact
// active Worker + source commit + original hashes on BOTH origins.
const NOV14_PUBLISHED_MOODY_ENTITY_MARKER_FAILURE = Object.freeze({
  runId: 43629450047,
  jobId: 132552595374,
  sourceSha: '9afb27020d3152c52aed3f2f3241e93330e303bf',
  workerVersion: '4a67cc9a-616c-4707-9097-541b8fce2138',
  failedStep: 'Verify Moody Gardens production authority',
});

// Nov 15 #43730208415 actually published the active 100%-traffic Worker
// f45399ba... from source 55088285..., then passed deployed-version capture,
// both production origins' health, and original-byte JS/CSS checks on both
// origins. The ONLY later failure was National Polka Festival's independent
// projected-date display assertion. PR #7242 repairs that visible wording in
// SSR without relaxing the Event/schema verification. Reuse its immutable
// ORIGINAL asset handoff only after matching this exact job/run, proving the
// repair is in source, and independently matching active Worker/source SHA
// and every asset SHA on BOTH origins. This DOES NOT certify the failed
// release or suppress the festival verifier on the next deployment.
const NOV15_PUBLISHED_EVENT_RECURRENCE_ASSERTION = Object.freeze({
  runId: 43730208415,
  jobId: 132860785220,
  sourceSha: '5508828580552fdca812f1527428b3ad5b609fd5',
  workerVersion: 'f45399ba-e9e8-4052-8450-bf858841b9ba',
  failedStep: 'Verify Event structured-data production',
});

// Nov15 culture publication / post-deploy source #b6a73701... actually
// published the 100%-traffic Worker ea33ec3d... then passed deployment,
// captured version, direct + canonical health, and exact old/new original-byte
// JS/CSS delivery across both origins. It failed ONLY the independent McKinney
// Event production verifier, which still expected an expired 2026 event despite
// official 2027 dates; the same source inadvertently carried a 2026 admission
// offer into 2027. A later source commit must correct both the visible claim
// and the strict verifier before this original-byte-only handoff is eligible.
// The prior production run remains FAILED, and the next deploy re-runs every
// page and original-asset acceptance. NEVER waive the Worker/SHA/dual-origin
// original-byte checks in the calling protected deployment pipeline.
const NOV15_PUBLISHED_MCKINNEY_2027_VALIDATION_FAILURE = Object.freeze({
  runId: 43734261983,
  jobId: 132873261043,
  sourceSha: 'b6a73701a69e5efeee3ed5ec605cdc420c7386df',
  workerVersion: 'ea33ec3d-842c-4c1b-9ff3-bb4bd292d7cb',
  failedStep: 'Verify Event structured-data production',
});

// Nov 15 run #43744754206 published the 100%-traffic Worker
// 7f0231fa... from exact source 172e2a... and passed ALL five deploy,
// Worker-version, direct/canonical health, and original SHA-256 asset gates.
// Its sole later failed step was a hunting production check: the hunting hub
// and turkey browser checks PASSED, but the deer SSR hero matcher expected the
// alt attribute to close immediately after "buck". The complete actual alt
// continues with habitat detail, so the old regular expression rejected valid
// SSR output. The current source fixes the alt matcher, asserts eager/high LCP,
// and self-tests full-length/reordered ALT strings. Preserve this one immutable
// Worker release's source-proven original bytes ONLY; do not certify the old
// failed deer test or loosen ANY next-release verification.
const NOV15_PUBLISHED_DEER_HERO_ALT_MATCHER = Object.freeze({
  runId: 43744754206,
  jobId: 132905483302,
  sourceSha: '172e2a38415fb3a64fa81f48d1732e660510d76f',
  workerVersion: '7f0231fa-6b09-4457-9c27-855392484141',
  failedStep: 'Verify hunting hub and turkey guide in desktop/mobile Chrome',
});

// Nov16 #43940147723 actually published the 100%-traffic Worker from
// 347ab475 and passed deploy, captured version, canonical/direct 200, and
// 9,728 original-byte dual-origin JS/CSS proofs with zero asset errors.
// Its one failure was the strictly independent Lake Conroe camping HTTP 500
// discovered by sitemap/robots parity; the published Worker remains BROKEN.
// #7288 repairs the actual unneeded statewide fishing-catalog import path.
// This exception qualifies ONLY that published Worker's immutable original
// bytes, never the failed fishing page or failed release. The calling release
// still pins current Worker UUID, exact source SHA and ALL original hashes on
// BOTH public origins and reruns the same strict parity after the fix.
const NOV16_PUBLISHED_CONROE_SSR_FAILURE = Object.freeze({
  runId: 43940147723,
  jobId: 133555201659,
  sourceSha: '347ab475a0566b52cfaa4fa8d7d918978466aa0a',
  workerVersion: '49b9c790-d1e6-41f6-bf69-0c47cc9a9871',
  failedStep: 'Verify fishing lake robots and sitemap publication parity',
});

// Nov16 deployment #43948840401 published 100%-traffic Worker cb71c303
// from ac29989a and passed ALL five deployment, runtime, and two-origin
// original-byte JS/CSS gates. A subsequent, unrelated category-page probe
// failed solely on a genuine TCP read ECONNRESET after earlier pages passed.
// PR #7294 introduced exactly one transport-only retry, preserving the
// HTTP/HTML/canonical/robots/content assertions. Recover its ORIGINAL bytes
// only if source repair and the separate active-Worker/source-SHA/hash proof
// pass. The failed overall deployment remains failed.
const NOV16_PUBLISHED_CATEGORY_TRANSPORT_RESET = Object.freeze({
  runId: 43948840401,
  jobId: 133585600321,
  sourceSha: 'ac29989a09dcf04317b386283f3019947138bf13',
  workerVersion: 'cb71c303-a15d-4873-a2a4-8f02f787a6f6',
  failedStep: 'Verify base production surfaces',
});

// Nov 16 published run #43957118581 is the exact 100%-traffic Worker
// e2e84b7d-cae7-46a1-ace1-3ab7f20de1b3 from 0b8a3ba. GitHub confirms
// Worker publish, version capture, direct/canonical health and every original
// JS/CSS byte on BOTH public origins succeeded. The deployment's only failed
// post-publish check was a genuine /fishing/lakes/lake-conroe/camping HTTP 500
// on the cache-busted production probe. This grants absolutely NO exemption
// from that failed content verifier, nor certifies the Worker as healthy on
// every route; next release still must pass the full Conroe parity gate.
// Only its immutable asset handoff can be reused, and ONLY after the caller's
// exact-current Worker UUID/source SHA/dual-origin original-byte verification.
// Nov 17, 2026 run #43985214547/job #133711496581 really published the
// CURRENT 100%-traffic Worker f7213d8b from exact source SHA 6124fed0.
// Its five critical deploy/version/health/original-byte gates passed: 139
// emitted assets and 8,108 individual original-byte checks across BOTH
// public origins. A later independent Lake Conroe camping HTTP request
// returned 500 on all three bounded tries. This is NOT proof of the site's
// successful release or a waiver of that live error. Preserve ONLY original
// asset bytes from this exact published version; the next deployment must
// independently pass every strict fishing HTTP/robots/canonical/sitemap gate.
// The workflow rechecks actual active version, source SHA and every asset hash.
// Exact November 18 run 44238364654 published the 100%-traffic Worker
// a92fd7fa from source 422d1485. GitHub proves successful publish, captured
// Worker UUID, direct+canonical health and both-origin original JS/CSS checks.
// The ONLY failed later step was a real three-attempt HTTP 500 on Conroe
// camping; the failure is NOT erased. #7330 removed the unnecessary live
// reservoir fetch and parser ONLY from /camping. Qualify original assets ONLY
// while that correction and the strict unchanged fishing live verifier exist.
// Callers separately demand exact Worker UUID, source SHA, artifact original
// byte hashes and both HTTP origins. This never certifies the prior release.
// Nov 18 deployment 44242409782/job 134593204841 genuinely published
// 100%-traffic Worker 6f9e538a from source 873454f7 and passed all five
// protected publish, version, direct/canonical health, and dual-origin
// original JS/CSS byte gates (139 emitted assets). Its ONLY later failed
// step was a REAL three-attempt 500 on Lake Conroe camping, not an asset
// failure. The subsequently merged #7330 static camping SSR route must
// remain intact, alongside the strict live parity verifier. Permit ONLY
// the exact immutable original-asset handoff; old release stays FAILED.
// Calling deployment separately pins active Worker UUID, source SHA and
// proves every preserved JS/CSS hash on BOTH public origins again.
// Nov 18 run #44324366863/job #134871546550 published the current
// 100%-traffic Worker 8d5476fc from f0973266 and passed all five
// independently logged publish/version/health/two-origin original-byte gates.
// ALL 3,248 original JS/CSS asset responses across both origins passed.
// Two later, separately failed deer smoke steps shared ONE known obsolete
// marker: "Guide reviewed November 17" vs the actual truthful visible
// "Substantive guide reviewed November 17" byline. PR #7347 now tests the
// exact rendered phrase; preserve every other legal/source/SEO assertion.
// This failed release stays FAILED. Qualify ONLY original bytes; the next
// deployment must separately match active Worker UUID, source SHA, every
// original hash on BOTH origins, and rerun all unchanged live gates.
const NOV18_PUBLISHED_8D5476_DEER_REVIEW_ASSETS = Object.freeze({
  runId: 44324366863,
  jobId: 134871546550,
  sourceSha: 'f09732663ced5b26556a06d34d06bfe87850cadf',
  workerVersion: '8d5476fc-e55c-48e2-a5d9-355c510ab271',
  failedSteps: [
    'Verify deer authority HTML, claim sources and exact XML lastmod',
    'Verify hunting hub and turkey guide in desktop/mobile Chrome',
  ],
});

const NOV18_PUBLISHED_6F9E_CONROE_ORIGINAL_ASSETS = Object.freeze({
  runId: 44242409782,
  jobId: 134593204841,
  sourceSha: '873454f756a635b63957b83d479d8979719858ed',
  workerVersion: '6f9e538a-98d4-45fa-bd0e-6c47f8cbc2a0',
  failedStep: 'Verify fishing lake robots and sitemap publication parity',
});

const NOV18_PUBLISHED_A92_CONROE_ASSETS_ONLY = Object.freeze({
  runId: 44238364654,
  jobId: 134579887566,
  sourceSha: '422d1485403af6f365d06016055f5e7c39d036cf',
  workerVersion: 'a92fd7fa-32a1-4386-bd2e-5ed53767cfb2',
  failedStep: 'Verify fishing lake robots and sitemap publication parity',
});

const NOV17_PUBLISHED_CONROE_CAMPING_ASSET_HANDOFF = Object.freeze({
  runId: 43985214547,
  jobId: 133711496581,
  sourceSha: '6124fed0ab5f1b2e0478f180058394b423f7f4c3',
  workerVersion: 'f7213d8b-d327-4a3a-9112-c3cc02b1bdab',
  failedStep: 'Verify fishing lake robots and sitemap publication parity',
});

const NOV16_PUBLISHED_CONROE_500_HISTORIC_ASSET_HANDOFF = Object.freeze({
  runId: 43957118581,
  jobId: 133614493520,
  sourceSha: '0b8a3ba134e5d03bb07b5575b19611d2a90c932b',
  workerVersion: 'e2e84b7d-cae7-46a1-ace1-3ab7f20de1b3',
  failedStep: 'Verify fishing lake robots and sitemap publication parity',
});

// Nov18 run #44368051009 actually published the 100%-traffic Worker
// 23317b8a from source 06ace4c8 after the five outdoor guide authority
// upgrades (#7350) were merged. Immutable GitHub job #135027028666 reports
// SUCCESS for publish, deployed-version capture, both-origin health, and
// EVERY current/prior JS/CSS original-byte check. It then failed two
// independent, real live-page checks: Lake Conroe camping returned HTTP 500
// after three attempts; the separate Devils River hero verifier failed.
// Both page regressions remain failures and MUST pass on the next release.
// ONLY original client asset bytes may be inherited, and ONLY after the
// caller matches this exact current Worker, source SHA, successful original
// delivery artifact and BOTH canonical/direct origin hashes. No blanket
// exception, skipped production check, or fabricated green deployment.
// November 18 release 44377712495/job 135061203635 published 100%-traffic
// Worker d132bb99 from exact source 364733eb. All five strict publish/version,
// direct/canonical health and 2,438 original SHA-256 JS/CSS checks PASSED.
// Only the later independent changed-page smoke failed: it directly requested
// Wikimedia's Davis Hill hero and received HTTP 429, even though page HTML and
// Martin Creek authority smoke passed. The follow-up uses the site's own
// exact licensed first-party hero and checks IDENTICAL JPEG bytes on BOTH
// origins. Do not certify this failed release; recover original bytes ONLY,
// and independently re-check outgoing UUID, SHA and every asset on both origins.
const NOV18_PUBLISHED_D132_DAVIS_PHOTO_ASSETS = Object.freeze({
  runId: 44377712495,
  jobId: 135061203635,
  sourceSha: '364733eb09030150e885919a337568b68b0b9119',
  workerVersion: 'd132bb99-7de2-4293-b465-b4bf5019d1b5',
  failedStep: 'Verify base production surfaces',
});

const NOV18_PUBLISHED_23317_FISHING_DEVILS_ASSETS = Object.freeze({
  runId: 44368051009,
  jobId: 135027028666,
  sourceSha: '06ace4c8029d853722a98e8485252247cf1a7551',
  workerVersion: '23317b8a-2b01-473d-95b4-bbf9c61af2e7',
  failedSteps: [
    'Verify fishing lake robots and sitemap publication parity',
    'Verify Devils River photograph and exact destination production',
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
  const d132 = NOV18_PUBLISHED_D132_DAVIS_PHOTO_ASSETS;
  if (job.run_id === d132.runId && job.id === d132.jobId &&
      failures.length === 1 && failures[0] === d132.failedStep) {
    const changed = readFileSync('scripts/ci/verify-changed-production-pages.mjs', 'utf8');
    const guide = readFileSync('src/components/editorial/DavisHillAuthority.tsx', 'utf8');
    // Exactly the source-verified first-party photo repair must be present;
    // no blanket exception for 404s, mismatched origins or bad JPEG data.
    for (const token of [
      'if (davisHillPages.includes(path))',
      "'/media/remote?url=' + encodeURIComponent(heroUrl)",
      "[origin, 'https://texasdefined-site.freddy-coppola.workers.dev']",
      'photoBytes.length < 10000',
      'photoBytes[0] !== 0xff || photoBytes[1] !== 0xd8',
      '!photoDigests[0].equals(photoDigests[1])',
      "'CC BY 4.0'",
      'Davis Hill photographic hero original bytes differ',
    ]) if (!changed.includes(token)) throw Error('d132 asset history requires strict source-correct Davis Hill two-origin photo acceptance: ' + token);
    for (const token of [
      'const DAVIS_HILL_PHOTO_PROXY', 'encodeURIComponent(DAVIS_HILL_PHOTO_ORIGINAL)',
      'src={DAVIS_HILL_PHOTO_PROXY}', 'William L. Farr', 'CC BY 4.0',
    ]) if (!guide.includes(token)) throw Error('d132 asset history requires first-party licensed Davis Hill hero: ' + token);
    return { eligible: true, mode: 'exact-nov18-d132-davis-hill-429-original-assets-only',
      exactRun: d132.runId, requiredSourceSha: d132.sourceSha,
      requiredWorkerVersion: d132.workerVersion,
      criticalChecks: CRITICAL.length, permittedFailures: failures,
      priorReleaseStillFailed: true };
  }
  if (job.run_id === d132.runId || job.id === d132.jobId) {
    throw Error('d132 Davis Hill asset history rejects altered run/job/failure: ' + failures.join(', '));
  }
  const published23317 = NOV18_PUBLISHED_23317_FISHING_DEVILS_ASSETS;
  if (job.run_id === published23317.runId && job.id === published23317.jobId &&
      failures.length === published23317.failedSteps.length &&
      published23317.failedSteps.every(name => failures.includes(name))) {
    // Do not weaken or skip either failed production check on the next release.
    // This qualification is asset-handoff-only; the caller independently proves
    // active Worker UUID, exact source SHA, every emitted original hash and
    // successful delivery to BOTH direct and canonical origins.
    const fishing = readFileSync('scripts/ci/verify-fishing-live-publication-parity.mjs', 'utf8');
    for (const guard of [
      'fetchLiveHtmlWithRetry', 'attempts: 3', 'if (!response.ok) throw new Error',
      '"/fishing/lakes/lake-conroe/camping"', 'canonicalMatches', 'inSitemap', 'noindex',
    ]) if (!fishing.includes(guard)) {
      throw Error('23317 original asset handoff refuses weakened Lake Conroe acceptance: ' + guard);
    }
    return { eligible: true, mode: 'exact-nov18-23317-original-assets-only',
      exactRun: published23317.runId, requiredSourceSha: published23317.sourceSha,
      requiredWorkerVersion: published23317.workerVersion,
      criticalChecks: CRITICAL.length, permittedFailures: failures,
      priorReleaseStillFailed: true };
  }
  if (job.run_id === published23317.runId || job.id === published23317.jobId) {
    throw Error('23317 published asset handoff rejects changed run/job/failure evidence: ' + failures.join(', '));
  }
  const nov18DeerMarker = NOV18_PUBLISHED_8D5476_DEER_REVIEW_ASSETS;
  if (job.run_id === nov18DeerMarker.runId && job.id === nov18DeerMarker.jobId &&
      failures.length === nov18DeerMarker.failedSteps.length &&
      nov18DeerMarker.failedSteps.every((name) => failures.includes(name))) {
    // A false-negative editorial phrase is not a bypass for actual hunting,
    // sitemap, page indexability, or Worker asset regressions.
    const verifier = readFileSync('scripts/data/verify-hunting-production.mjs', 'utf8');
    for (const guard of [
      "const deerEditorialReviewMarker = 'Substantive guide reviewed ' + deerEditorialDateLabel;",
      "assert.ok(authorByline.includes('Substantive guide reviewed {topic.reviewedLabel ?? topic.reviewedOn}'));",
      "requireText(extractVisibleText(deerHtml), marker, 'Revised deer authority source comparison');",
      "article.author?.name !== 'Texas Defined Travel & Outdoors Desk'",
      "'Exact canonical deer visitor hero lacks eager/high-priority LCP treatment'",
      "'Deer visitor HTML must not emit noindex'",
    ]) if (!verifier.includes(guard)) {
      throw Error('8d5476 original asset handoff requires source-correct strict deer verifier: ' + guard);
    }
    return {
      eligible: true,
      mode: 'exact-nov18-8d5476-deer-review-marker-original-assets-only',
      exactRun: nov18DeerMarker.runId,
      requiredSourceSha: nov18DeerMarker.sourceSha,
      requiredWorkerVersion: nov18DeerMarker.workerVersion,
      criticalChecks: CRITICAL.length,
      permittedFailures: failures,
      priorReleaseStillFailed: true,
    };
  }
  if (job.run_id === nov18DeerMarker.runId || job.id === nov18DeerMarker.jobId) {
    throw Error('8d5476 original asset handoff rejects altered run/job/failed steps: ' + failures.join(', '));
  }
  const nov18SixF9e = NOV18_PUBLISHED_6F9E_CONROE_ORIGINAL_ASSETS;
  if (job.run_id === nov18SixF9e.runId && job.id === nov18SixF9e.jobId &&
      failures.length === 1 && failures[0] === nov18SixF9e.failedStep) {
    // A genuine failed Conroe 500 is not waived or relabeled. Only reuse
    // original assets after verifying the source correction and the same
    // complete fishing content/indexing acceptance on the NEXT deployment.
    const verifier = readFileSync('scripts/ci/verify-fishing-live-publication-parity.mjs', 'utf8');
    const route = readFileSync('src/routes/fishing.lakes.$slug.$section.tsx', 'utf8');
    const server = readFileSync('src/data/fishing/lake-conroe-page-data.functions.ts', 'utf8');
    const regression = readFileSync('scripts/ci/verify-fishing-section-loader-fanout.test.mjs', 'utf8');
    for (const guard of [
      'fetchLiveHtmlWithRetry', 'attempts: 3', 'if (!response.ok) throw new Error',
      '"/fishing/lakes/lake-conroe/camping"', 'canonicalMatches', 'inSitemap', 'noindex',
    ]) if (!verifier.includes(guard)) {
      throw Error('6f9e original asset recovery requires unchanged strict fishing live parity: ' + guard);
    }
    for (const guard of [
      'params.section === "camping"', 'await getLakeConroeCampingPageData()',
      ': await getLakeConroePageData()', 'data.section !== "camping"',
    ]) if (!route.includes(guard)) {
      throw Error('6f9e original asset recovery requires corrected static Conroe camping route: ' + guard);
    }
    for (const guard of [
      'export const getLakeConroeCampingPageData',
      '...loadLakeConroePageDataServer()', 'liveLakeLevel: null',
      'await import("./live-lake-level-fetch.server")',
    ]) if (!server.includes(guard)) {
      throw Error('6f9e original asset recovery requires a non-network camping data path: ' + guard);
    }
    if (!regression.includes("camping cold SSR avoids the optional live-water fetch")) {
      throw Error('6f9e original asset recovery requires protected regression evidence');
    }
    return {
      eligible: true, mode: 'exact-nov18-6f9e-failed-camping-original-assets-only',
      exactRun: nov18SixF9e.runId, requiredSourceSha: nov18SixF9e.sourceSha,
      requiredWorkerVersion: nov18SixF9e.workerVersion,
      criticalChecks: CRITICAL.length, permittedFailures: failures,
      priorReleaseStillFailed: true,
    };
  }
  if (job.run_id === nov18SixF9e.runId || job.id === nov18SixF9e.jobId) {
    throw Error('6f9e original asset handoff rejects altered run/job/failure evidence: ' + failures.join(', '));
  }
  const nov18Conroe = NOV18_PUBLISHED_A92_CONROE_ASSETS_ONLY;
  if (job.run_id === nov18Conroe.runId && job.id === nov18Conroe.jobId &&
      failures.length === 1 && failures[0] === nov18Conroe.failedStep) {
    const verifier = readFileSync('scripts/ci/verify-fishing-live-publication-parity.mjs', 'utf8');
    const route = readFileSync('src/routes/fishing.lakes.$slug.$section.tsx', 'utf8');
    const server = readFileSync('src/data/fishing/lake-conroe-page-data.functions.ts', 'utf8');
    const sourceTest = readFileSync('scripts/ci/verify-fishing-section-loader-fanout.test.mjs', 'utf8');
    for (const guard of [
      'fetchLiveHtmlWithRetry', 'attempts: 3', 'if (!response.ok) throw new Error',
      '"/fishing/lakes/lake-conroe/camping"', 'canonicalMatches', 'inSitemap', 'noindex',
    ]) if (!verifier.includes(guard)) {
      throw Error('Nov18 a92 prior original asset restoration must retain strict fishing parity: ' + guard);
    }
    for (const guard of [
      'params.section === "camping"', 'await getLakeConroeCampingPageData()',
      ': await getLakeConroePageData()', 'data.section !== "camping"',
    ]) if (!route.includes(guard)) {
      throw Error('Nov18 a92 asset restoration requires merged no-fetch camping SSR correction: ' + guard);
    }
    for (const guard of [
      'export const getLakeConroeCampingPageData',
      '...loadLakeConroePageDataServer()',
      'liveLakeLevel: null',
      'await import("./live-lake-level-fetch.server")',
    ]) if (!server.includes(guard)) {
      throw Error('Nov18 a92 asset restoration requires source-preserving static camping data: ' + guard);
    }
    if (!sourceTest.includes("camping cold SSR avoids the optional live-water fetch")) {
      throw Error('Nov18 a92 asset restoration requires protected camping regression test');
    }
    return {
      eligible: true, mode: 'exact-nov18-a92-failed-camping-original-assets-only',
      exactRun: nov18Conroe.runId, requiredSourceSha: nov18Conroe.sourceSha,
      requiredWorkerVersion: nov18Conroe.workerVersion,
      criticalChecks: CRITICAL.length, permittedFailures: failures,
      priorReleaseStillFailed: true,
    };
  }
  if (job.run_id === nov18Conroe.runId || job.id === nov18Conroe.jobId) {
    throw Error('Nov18 a92 original-byte handoff rejects changed run, job, failure evidence: ' + failures.join(', '));
  }
  const nov17Conroe = NOV17_PUBLISHED_CONROE_CAMPING_ASSET_HANDOFF;
  if (job.run_id === nov17Conroe.runId && job.id === nov17Conroe.jobId &&
      failures.length === 1 && failures[0] === nov17Conroe.failedStep) {
    // No waiver of the Conroe page's genuine HTTP 500. A later release has to
    // pass the SAME complete fishing verifier; only cryptographic asset proof
    // from the actually published old Worker is eligible for preservation.
    const verifier = readFileSync('scripts/ci/verify-fishing-live-publication-parity.mjs', 'utf8');
    for (const guard of [
      'fetchLiveHtmlWithRetry', 'attempts: 3', 'if (!response.ok) throw new Error',
      '"/fishing/lakes/lake-conroe/camping"', 'canonicalMatches',
      'inSitemap', 'noindex',
    ]) {
      if (!verifier.includes(guard)) {
        throw Error('Nov17 Conroe asset restoration requires the unchanged strict live fishing parity verifier: ' + guard);
      }
    }
    return { eligible: true, mode: 'exact-nov17-conroe-camping-original-assets-only',
      exactRun: nov17Conroe.runId, requiredSourceSha: nov17Conroe.sourceSha,
      requiredWorkerVersion: nov17Conroe.workerVersion, criticalChecks: CRITICAL.length,
      permittedFailures: failures };
  }
  if (job.run_id === nov17Conroe.runId || job.id === nov17Conroe.jobId) {
    throw Error('Nov17 Conroe original-byte handoff rejects altered run/job/failure evidence: ' + failures.join(', '));
  }
  const conroe500 = NOV16_PUBLISHED_CONROE_500_HISTORIC_ASSET_HANDOFF;
  if (job.run_id === conroe500.runId && job.id === conroe500.jobId &&
      failures.length === 1 && failures[0] === conroe500.failedStep) {
    // Only the immutable *asset* proof may be restored. This is not a
    // 200/HTML/robots/canonical waiver for Conroe or any other route.
    return {eligible:true,mode:'exact-nov16-conroe-500-original-assets-only',
      exactRun:conroe500.runId,requiredSourceSha:conroe500.sourceSha,
      requiredWorkerVersion:conroe500.workerVersion,
      criticalChecks:CRITICAL.length,permittedFailures:failures};
  }
  if (job.run_id === conroe500.runId || job.id === conroe500.jobId) {
    throw Error('Nov16 Conroe HTTP 500 original-byte handoff rejects altered run/job/failure proof: '+failures.join(', '));
  }
  const categoryReset = NOV16_PUBLISHED_CATEGORY_TRANSPORT_RESET;
  if (job.run_id === categoryReset.runId && job.id === categoryReset.jobId &&
      failures.length === 1 && failures[0] === categoryReset.failedStep) {
    const verifier = readFileSync('scripts/ci/verify-authority-category-live.mjs', 'utf8');
    const tests = readFileSync('scripts/ci/verify-authority-category-live.test.mjs', 'utf8');
    const sourceProof = [
      'export function isTransientNetworkFailure(err)',
      'export async function retryOneAuthorityTransport(action',
      'if (!isTransientNetworkFailure(err)) throw err;',
      'await pause(1000);',
      'return await action();',
      'return retryTransientProduction5xx(() => retryOneAuthorityTransport(() => fetch(url,',
      '"ECONNRESET"',
      'if(response.status!==200',
      'hasNoindex(html,response.headers.get("x-robots-tag"))',
      'readCanonical(html)',
    ];
    if (!sourceProof.every(needle => verifier.includes(needle)) ||
        !tests.includes('retryOneAuthorityTransport') ||
        !tests.includes('ECONNRESET')) {
      throw Error('Nov16 original asset handoff rejected until #7294 one-reset retry preserves strict HTTP/canonical/robots and source assertions');
    }
    return { eligible: true, mode: 'exact-nov16-category-transport-original-assets-only',
      exactRun: categoryReset.runId, requiredSourceSha: categoryReset.sourceSha,
      requiredWorkerVersion: categoryReset.workerVersion,
      criticalChecks: CRITICAL.length, permittedFailures: failures };
  }
  if (job.run_id === categoryReset.runId || job.id === categoryReset.jobId) {
    throw Error('Nov16 category transport original-byte handoff rejects altered run/job/failure evidence: ' + failures.join(', '));
  }
  const conroe = NOV16_PUBLISHED_CONROE_SSR_FAILURE;
  if (job.run_id === conroe.runId && job.id === conroe.jobId &&
      failures.length === 1 && failures[0] === conroe.failedStep) {
    const route = readFileSync('src/routes/fishing.lakes.$slug.$section.tsx', 'utf8');
    const loader = route.slice(route.indexOf('  loader: async'), route.indexOf('  head:'));
    const firstBranch = loader.indexOf('if (params.slug === LAKE_CONROE_SLUG)');
    const unconditionalCatalog = loader.indexOf('const { fishingGuidesQuery, fishingLakeQuery, fishingPlacementsQuery, fishingReportsQuery }');
    const conditionalCatalog = loader.indexOf('if (params.section === "reports" || params.section === "guides")');
    // A previous published Worker had no Conroe fishing catalog fanout. The
    // current, narrower repair makes /camping independent of live-water fetch.
    // Keep previous verified asset eligibility tied to that exact safe path.
    const pageDataBeforeGlobal = loader.indexOf('const pageData = params.section === "camping"');
    const conroeServer = readFileSync('src/data/fishing/lake-conroe-page-data.functions.ts', 'utf8');
    const campingPathSafe = (
      loader.includes('await getLakeConroeCampingPageData()') &&
      loader.includes(': await getLakeConroePageData()') &&
      conroeServer.includes('export const getLakeConroeCampingPageData') &&
      conroeServer.includes('...loadLakeConroePageDataServer()') &&
      conroeServer.includes('liveLakeLevel: null') &&
      conroeServer.includes('await import("./live-lake-level-fetch.server")')
    );
    const canonicalPageGuard = loader.indexOf('if (!isLakeConroeSection(params.section)) throw notFound()');
    if (firstBranch < 0 || canonicalPageGuard < firstBranch ||
        pageDataBeforeGlobal < canonicalPageGuard || conditionalCatalog < pageDataBeforeGlobal ||
        unconditionalCatalog < conditionalCatalog || !campingPathSafe ||
        !loader.includes('const lake = await context.queryClient.ensureQueryData(fishingLakeQuery(params.slug))') ||
        !loader.includes('reports = await context.queryClient.ensureQueryData(fishingReportsQuery({ lakeId: lake.id, limit: 20 }, lake))')) {
      throw Error('Nov16 Conroe asset handoff is rejected until #7288 repairs unconditional statewide fishing catalog import');
    }
    return { eligible: true, mode: 'exact-nov16-conroe-failed-parity-original-assets-only',
      exactRun: conroe.runId, requiredSourceSha: conroe.sourceSha,
      requiredWorkerVersion: conroe.workerVersion, criticalChecks: CRITICAL.length,
      permittedFailures: failures };
  }
  if (job.run_id === conroe.runId || job.id === conroe.jobId) {
    throw Error('Nov16 Conroe original-byte handoff rejects altered run/job/failure evidence: ' + failures.join(', '));
  }
  const deerHero = NOV15_PUBLISHED_DEER_HERO_ALT_MATCHER;
  if (job.run_id === deerHero.runId && job.id === deerHero.jobId &&
      failures.length === 1 && failures[0] === deerHero.failedStep) {
    const repaired = readFileSync('scripts/data/verify-hunting-production.mjs', 'utf8');
    const proof = [
      'function findDeerHeroImageTag(html)',
      '.matchAll(/<img\\b[^>]*>/gi)',
      'Close view of a white-tailed buck[^"]*',
      'assert.equal(findDeerHeroImageTag(fullAlt), fullAlt)',
      'assert.equal(findDeerHeroImageTag(reordered), reordered)',
      'findDeerHeroImageTag(deerHtml)',
      'findDeerHeroImageTag(canonicalDeerHtml)',
      'loading="eager"',
      'fetchpriority="high"',
    ];
    if (!proof.every((needle) => repaired.includes(needle)) ||
        repaired.includes('(?=[^>]*alt="Close view of a white-tailed buck")')) {
      throw Error('Deer SSR full-alt source correction and strict eager/high image checks must remain present before accepting Nov15 original asset handoff');
    }
    return {
      eligible: true,
      mode: 'exact-nov15-deer-full-alt-original-assets-only',
      exactRun: deerHero.runId,
      requiredSourceSha: deerHero.sourceSha,
      requiredWorkerVersion: deerHero.workerVersion,
      criticalChecks: CRITICAL.length,
      permittedFailures: failures,
    };
  }
  if (job.run_id === deerHero.runId || job.id === deerHero.jobId) {
    throw Error('Nov15 deer original asset handoff rejects altered run/job/failed-step evidence: ' + failures.join(', '));
  }
  const mckinney = NOV15_PUBLISHED_MCKINNEY_2027_VALIDATION_FAILURE;
  if (job.run_id === mckinney.runId && job.id === mckinney.jobId &&
      failures.length === 1 && failures[0] === mckinney.failedStep) {
    const eventIndex = readFileSync('src/data/major-event-index.ts', 'utf8');
    const schema = readFileSync('src/data/major-event-schema-enrichment-batch2.server.ts', 'utf8');
    const verifier = readFileSync('scripts/ci/verify-event-structured-data-production.mjs', 'utf8');
    const sourceRegression = readFileSync('scripts/events/event-editorial-review-wave4.test.mjs', 'utf8');
    // Look only at the exact McKinney record. A correct 2027 date elsewhere in
    // the index or another festival with no offers cannot qualify this handoff.
    const indexStart = eventIndex.indexOf('slug: "mckinney-oktoberfest"');
    const schemaStart = schema.indexOf('slug: "mckinney-oktoberfest"');
    const indexRecord = indexStart >= 0 ? eventIndex.slice(indexStart, eventIndex.indexOf('\n', indexStart)) : '';
    const schemaRecord = schemaStart >= 0 ? schema.slice(schemaStart, schema.indexOf('\n  },', schemaStart)) : '';
    if (!indexRecord.includes('startDate: "2027-09-24"') ||
        !indexRecord.includes('endDate: "2027-09-26"') ||
        !indexRecord.includes('current public admissions and special-event times are not yet confirmed') ||
        schemaRecord.includes('offers:') ||
        schemaRecord.includes('usdOffer(') ||
        !schemaRecord.includes('https://downtownmckinney.com/events/event-opportunities') ||
        !schemaRecord.includes('verifiedAt: "2026-11-15"') ||
        !verifier.includes('async function verifyConfirmedMcKinney2027Leaf()') ||
        !verifier.includes("const startDate = '2027-09-24'") ||
        !verifier.includes("const endDate = '2027-09-26'") ||
        !verifier.includes("assert(asArray(event.offers).length === 0") ||
        !verifier.includes("assert(!html.includes('Tickets and admission')") ||
        !verifier.includes("await verifyConfirmedMcKinney2027Leaf()") ||
        !sourceRegression.includes("test('McKinney 2027 Event schema never reuses the 2026 free-admission offer")) {
      throw Error('The exact published Nov15 McKinney Worker asset handoff is blocked until 2027 source, nonfabricated pricing, strict live Event schema and tests are repaired');
    }
    return { eligible: true, mode: 'exact-nov15-mckinney-2027-original-assets-only',
      exactRun: mckinney.runId, criticalChecks: CRITICAL.length,
      permittedFailures: failures, requiredSourceSha: mckinney.sourceSha,
      requiredWorkerVersion: mckinney.workerVersion };
  }
  if (job.run_id === mckinney.runId || job.id === mckinney.jobId) {
    throw Error('Nov15 McKinney Worker original assets reject alternate run/job/failure evidence: ' + failures.join(', '));
  }
  const recurrence = NOV15_PUBLISHED_EVENT_RECURRENCE_ASSERTION;
  if (job.run_id === recurrence.runId && job.id === recurrence.jobId &&
      failures.length === 1 && failures[0] === recurrence.failedStep) {
    const route = readFileSync('src/data/major-event-page.server.ts', 'utf8');
    const verifier = readFileSync('scripts/ci/verify-event-structured-data-production.mjs', 'utf8');
    const protectedPlanningNeedles = [
      "Treat Memorial Day Weekend as the stable planning window",
      "Do not turn the Memorial Day recurrence into a confirmed 2027 ticket",
    ];
    const liveContractStillStrict = protectedPlanningNeedles.some(needle =>
      verifier.includes("planningNeedle: '" + needle + "'") && route.includes(needle));
    if (!liveContractStillStrict ||
        !route.includes('recheck the organizer for the confirmed schedule') ||
        !route.includes('esc(recurrencePlanningNotice)') ||
        !verifier.includes("assert(!nodes.some((node) => hasType(node, 'Event'))") ||
        !verifier.includes("assert(nodes.every((node) => !Object.hasOwn(node, 'startDate')")) {
      throw Error('The exact published Nov15 asset handoff is blocked until the recurrence date notice is repaired without weakening the scheduled Event schema exclusions');
    }
    return { eligible: true, mode: 'exact-nov15-event-recurrence-original-assets-only',
      exactRun: recurrence.runId, criticalChecks: CRITICAL.length,
      permittedFailures: failures, requiredSourceSha: recurrence.sourceSha,
      requiredWorkerVersion: recurrence.workerVersion };
  }
  if (job.run_id === recurrence.runId || job.id === recurrence.jobId) {
    throw Error('Nov15 original assets reject alternate run/job/failure evidence: ' + failures.join(', '));
  }
  const moodyEntity = NOV14_PUBLISHED_MOODY_ENTITY_MARKER_FAILURE;
  if (job.run_id === moodyEntity.runId && job.id === moodyEntity.jobId &&
      failures.length === 1 && failures[0] === moodyEntity.failedStep) {
    const verifier = readFileSync('scripts/production/verify-moody-gardens-production.mjs', 'utf8');
    const normalizer = readFileSync('scripts/production/moody-gardens-html-entities.mjs', 'utf8');
    const article = readFileSync('src/components/editorial/MoodyGardensSpotlights.tsx', 'utf8');
    const marker = "a ticket that includes Galveston Children's Museum admission";
    if (!verifier.includes('normalizeMoodyGardensTextEntities(html)') ||
        !verifier.includes('if (!decodedVisitorCopy.includes(marker))') ||
        !verifier.includes(marker) ||
        !normalizer.includes('export function normalizeMoodyGardensTextEntities') ||
        !article.includes(marker)) {
      throw Error('Exact published Moody asset handoff rejected until SSR entity decoding is source-repaired without deleting the admission fact or production verifier');
    }
    return { eligible: true, mode: 'exact-nov14-moody-entity-original-assets-only',
      exactRun: moodyEntity.runId, criticalChecks: CRITICAL.length,
      permittedFailures: failures,
      requiredSourceSha: moodyEntity.sourceSha,
      requiredWorkerVersion: moodyEntity.workerVersion };
  }
  if (job.run_id === moodyEntity.runId || job.id === moodyEntity.jobId) {
    throw Error('Moody entity source-verified active Worker has unexpected run/job/failure evidence: ' + failures.join(', '));
  }
  const moody = NOV14_MOODY_POSTHYDRATION_TITLE_FAILURE;
  if (job.run_id === moody.runId && job.id === moody.jobId &&
      failures.length === 1 && failures[0] === moody.failedStep) {
    const route = readFileSync('src/routes/destination.$slug.tsx', 'utf8');
    const seo = readFileSync('src/lib/seo.ts', 'utf8');
    const browser = readFileSync('scripts/ci/verify-moody-gardens-responsive-browser.mjs', 'utf8');
    const guard = readFileSync('scripts/data/validate-destination-data-integrity.mjs', 'utf8');
    const title = 'Moody Gardens Galveston: Aquarium, Rainforest & Visitor Guide';
    const description = 'Plan Moody Gardens in Galveston: Aquarium and Rainforest Pyramids, ticket packages, parking, accessibility, seasonal attractions and practical visitor tips.';
    if (!route.includes('"moody-gardens": "'+title+'"') ||
        !route.includes('"'+description+'"') ||
        !seo.includes('title: "'+title+'"') ||
        !seo.includes('description: "'+description+'"') ||
        !browser.includes('await page.waitForLoadState("load"') ||
        !browser.includes('assert.equal(facts.metaDescription,') ||
        !guard.includes('Moody Gardens hydrated destination metadata must exactly match the SSR title and description')) {
      throw Error('Exact published Moody Worker asset handoff rejected until hydration metadata mismatch is source-repaired and real Chrome verification remains strict');
    }
    return {eligible:true,mode:'exact-nov14-moody-posthydration-original-assets-only',
      exactRun:moody.runId,criticalChecks:CRITICAL.length,permittedFailures:failures,
      requiredSourceSha:moody.sourceSha,requiredWorkerVersion:moody.workerVersion};
  }
  if (job.run_id === moody.runId || job.id === moody.jobId) {
    throw Error('Moody source-verified published Worker has unexpected failure, job or run evidence: '+failures.join(', '));
  }
  const repairedRelease = NOV13_PUBLISHED_WORKER_MSR_DISTRICT21;
  if (job.run_id === repairedRelease.runId && job.id === repairedRelease.jobId &&
      failures.length === repairedRelease.failedSteps.length &&
      repairedRelease.failedSteps.every(name => failures.includes(name))) {
    // Fail closed unless BOTH independently failing checks are fixed in the
    // code that will be deployed next. These guards do not waive runtime QA.
    const mobile = readFileSync('scripts/ci/verify-msr-houston-browser.mjs', 'utf8');
    const football = readFileSync('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx', 'utf8');
    if (!mobile.includes('for (let attempt = 1; attempt <= 2; attempt++)') ||
        !mobile.includes("if (attempt === 2 || !/TimeoutError/.test(String(error))) throw error") ||
        !mobile.includes("assert.equal(response?.status(), 200") ||
        !mobile.includes("assert.deepEqual(failures, []") ||
        !football.includes("program?.classification === '6A' && program.district === 21 && hasDistrict21TeamScorecard(schoolName);") ||
        football.includes("&& !editorial?.season && !editorial?.notice && hasDistrict21TeamScorecard(schoolName)") ||
        !football.includes('<District21TeamSeason schoolName={schoolName} />')) {
      throw Error('Exact MSR/District21 failed release is not source-repaired; reject old asset handoff');
    }
    return { eligible: true, mode: 'exact-nov13-msr-district21-original-assets-only',
      criticalChecks: CRITICAL.length, permittedFailures: failures,
      exactRun: repairedRelease.runId, requiredSourceSha: repairedRelease.sourceSha,
      requiredWorkerVersion: repairedRelease.workerVersion };
  }
  // This exact failed publish is KNOWN to have two independent failed checks.
  // A forged one-failure transcript would otherwise fall through to the
  // historical generic MSR-only exception below. Reject it explicitly.
  if (job.run_id === repairedRelease.runId || job.id === repairedRelease.jobId) {
    throw Error('Failed deploy job includes unapproved or missing failure evidence for exact Nov13 MSR/District21 published Worker: ' + failures.join(', '));
  }
  const district5 = NOV13_PUBLISHED_DISTRICT5_DIRECT_TIMEOUT;
  if (job.run_id === district5.runId && job.id === district5.jobId &&
      failures.length === 1 && failures[0] === district5.failedStep) {
    // Do not weaken the 28-card, 16-result, direct/canonical checks.
    const source = readFileSync('scripts/ci/verify-district-5-production.mjs', 'utf8');
    // The production verifier originally retried only initial request timeouts.
    // A newer strict helper also retries aborted response bodies, without retrying
    // a received HTTP error or omitting a single District 5 content assertion.
    const originalInlineRetry =
      source.includes('for (let attempt = 1; attempt <= 2; attempt++)') &&
      source.includes("if (attempt === 2 || !transient) throw error") &&
      source.includes("assert.equal(response.status, 200");
    const helperSource = source.includes("import { fetchLiveDistrict5Html } from './district5-transient-http.mjs';")
      ? readFileSync('scripts/ci/district5-transient-http.mjs', 'utf8')
      : '';
    const strictBodyRetry =
      source.includes('const html = await fetchLiveDistrict5Html(url, origin);') &&
      helperSource.includes('const MAX_TRANSIENT_ATTEMPTS = 3;') &&
      helperSource.includes('attempts >= 1 && attempts <= MAX_TRANSIENT_ATTEMPTS') &&
      helperSource.includes('if (!isTransientTransportError(error)) throw error;') &&
      helperSource.includes('assert.equal(response.status, 200') &&
      helperSource.includes('return await response.text()') &&
      helperSource.includes('if (attempt === attempts)') &&
      helperSource.includes('await sleep(750 * attempt)');
    if (!(originalInlineRetry || strictBodyRetry) ||
        !source.includes("'https://texasdefined-site.freddy-coppola.workers.dev'") ||
        !source.includes("'https://texasdefined.com'") ||
        !source.includes("assert.equal(games.length, 28") ||
        !source.includes("assert.ok(reportedFinals.length >= 16") ||
        !source.includes("assert.equal(pending.length + reportedFinals.length, 28") ||
        !source.includes('await Promise.all(origins.map(check));')) {
      throw Error('Exact District5 original asset handoff blocked until bounded transport retry preserves both-origin data assertions');
    }
    return { eligible: true, mode: 'exact-nov13-district5-transport-original-assets-only',
      criticalChecks: CRITICAL.length, exactRun: district5.runId,
      requiredSourceSha: district5.sourceSha,
      requiredWorkerVersion: district5.workerVersion,
      permittedFailures: failures };
  }
  if (job.run_id === district5.runId || job.id === district5.jobId) {
    throw Error('Failed deploy job includes unapproved or missing failure evidence for exact Nov13 District5: ' + failures.join(', '));
  }
  const district16 = NOV13_PUBLISHED_DISTRICT16_NAV_TIMEOUT;
  if (job.run_id === district16.runId && job.id === district16.jobId &&
      job.run_attempt === 1 && failures.length === 1 && failures[0] === district16.failedStep) {
    const browserSource = readFileSync('scripts/ci/verify-district16-responsive-browser.mjs', 'utf8');
    if (!browserSource.includes("for (let attempt = 1; attempt <= 2; attempt++)") ||
        !browserSource.includes("if (attempt === 2 || !/TimeoutError/.test(String(error))) throw error") ||
        !browserSource.includes("assert.equal(response?.status(),200") ||
        !browserSource.includes("assert.equal(facts.rows,8)") ||
        // Preserve the tightly scoped historical timeout exception only if
        // complete data checks remain paired: old 4/12 snapshot OR a stricter
        // source-verified 16/0 final-season publication, never mixed counts.
        !(browserSource.includes("assert.equal(facts.finals,4)") &&
          browserSource.includes("assert.equal(facts.fixtures,12)") ||
          browserSource.includes("assert.equal(facts.finals,16)") &&
          browserSource.includes("assert.equal(facts.fixtures,0)")) ||
        !browserSource.includes("assert.deepEqual(errors,[]")) {
      throw Error('Exact District 16 timeout retry not repaired without weakening full browser assertions');
    }
    return {eligible:true,mode:'exact-nov13-district16-transport-original-assets-only',
      exactRun:district16.runId,criticalChecks:CRITICAL.length,permittedFailures:failures,
      requiredSourceSha:district16.sourceSha,requiredWorkerVersion:district16.workerVersion};
  }
  // Prevent another attempt of this failed run (or a substituted job ID)
  // from qualifying through the less specific historical visual exception.
  if (job.run_id === district16.runId || job.id === district16.jobId) {
    throw Error('Failed deploy job includes unapproved or missing failure evidence for exact Nov13 District16: ' + failures.join(', '));
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
