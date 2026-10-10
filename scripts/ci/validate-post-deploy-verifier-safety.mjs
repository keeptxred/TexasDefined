import fs from 'node:fs';
const failures = [];
const workflow = (name) => fs.readFileSync(`.github/workflows/${name}.yml`, 'utf8');
const requireMarker = (source, marker, label) => { if (!source.includes(marker)) failures.push(label); };
const noDirectPush = (source, label) => { if (/^  push:/m.test(source)) failures.push(`${label} cannot assert live production before a protected deployment`); };
// An independent production verifier may outlive newer main merges. Never
// checkout a moving branch or the workflow_run receiver's github.ref.
for (const file of fs.readdirSync('.github/workflows').filter((name) => name.endsWith('.yml'))) {
  const source = fs.readFileSync(`.github/workflows/${file}`, 'utf8');
  if (!/^  workflow_run:/m.test(source) || !source.includes('Deploy TexasDefined production')) continue;
  const floatingCheckout = /^\s+ref:[ \t]*(?:["']?main["']?|\$\{\{[ \t]*github\.ref[ \t]*\}\})[ \t]*(?:#.*)?$/m;
  if (floatingCheckout.test(source))
    failures.push(`${file} uses a moving main/github.ref checkout after canonical deployment; pin workflow_run.head_sha or use an explicit controlled exception`);
}
const postDeploy = ['texasdefined-publication-production-smoke','verify-rv-production','verify-aquarium-production','verify-hunting-production','adsense-production-smoke','verify-relocation-production','flag-history-production-smoke'];
for (const name of postDeploy) {
  const source = workflow(name);
  noDirectPush(source, name);
  requireMarker(source, 'workflow_run:', `${name} lost its protected deploy trigger`);
  requireMarker(source, 'Deploy TexasDefined production', `${name} lost its canonical deploy dependency`);
  requireMarker(source, "github.event.workflow_run.conclusion == 'success'", `${name} must not run after a failed/cancelled deploy`);
  requireMarker(source, 'workflow_dispatch:', `${name} lost its manual trigger`);
}
for (const name of ['texasdefined-publication-production-smoke','verify-rv-production','verify-aquarium-production','verify-hunting-production','verify-relocation-production']) {
  requireMarker(workflow(name), 'ref: ${{ github.event.workflow_run.head_sha || github.sha }}', `${name} must check out the exact deployed SHA`);
}
requireMarker(workflow('verify-hunting-production'), "github.event_name == 'pull_request'", 'Hunting needs PR-only syntax validation');
requireMarker(workflow('verify-hunting-production'), 'node --check scripts/data/verify-hunting-production.mjs', 'Hunting PR syntax check missing');
requireMarker(workflow('verify-relocation-production'), "github.event_name == 'pull_request'", 'Relocation PR syntax check missing');
const relocation = workflow('verify-relocation-production');
const relocationProbeStart = relocation.indexOf('      - name: Probe relocation expansion routes');
const relocationProbeEnd = relocation.indexOf('      - name: Publish relocation live verification pending');
if (relocationProbeStart < 0 || relocationProbeEnd <= relocationProbeStart) {
  failures.push('Relocation per-route verification step boundaries missing');
} else {
  const relocationProbe = relocation.slice(relocationProbeStart, relocationProbeEnd);
  for (const marker of [
    'id: expansion_probes',
    'node scripts/ci/publish-github-status.mjs "$context" success',
    'node scripts/ci/publish-github-status.mjs "$context" failure',
  ]) requireMarker(relocationProbe, marker, `Relocation per-route status contract missing: ${marker}`);
}
const relocationJob = relocation.slice(relocation.indexOf('  verify:'), relocationProbeStart);
requireMarker(relocationJob, 'STATUS_TARGET_SHA: ${{ github.event.workflow_run.head_sha || github.sha }}', 'Relocation job statuses must attach to triggering deployed SHA');
const statusPublisher = fs.readFileSync('scripts/ci/publish-github-status.mjs', 'utf8');
for (const marker of [
  'process.env.STATUS_TARGET_SHA',
  'statusTargetOverride || process.env.GITHUB_SHA',
  'STATUS_TARGET_SHA must be a 40-character commit SHA',
]) requireMarker(statusPublisher, marker, `GitHub status publisher must safely honor deployed SHA override: ${marker}`);
// Wave 2: prevent push/PR live smokes from asserting undeployed production.
const additionalPostDeploy = [
  'advertiser-production-verification',
  'swimming-holes-river-tubing-production-smoke',
  'vehicle-authority-production-smoke',
  'verify-reservoir-authority-production',
  'verify-seven-regions-production',
  'chappell-hill-production-smoke',
];
for (const name of additionalPostDeploy) {
  const source = workflow(name);
  noDirectPush(source, name);
  requireMarker(source, 'workflow_run:', `${name} needs protected deployment completion`);
  requireMarker(source, 'Deploy TexasDefined production', `${name} needs canonical deployment trigger`);
  requireMarker(source, 'workflow_dispatch:', `${name} must retain manual triggering`);
  requireMarker(source, "github.event.workflow_run.conclusion == 'success'", `${name} must skip failed/cancelled deployments`);
  if (name !== 'advertiser-production-verification' && /^  pull_request:/m.test(source))
    failures.push(`${name} must not probe undeployed pull-request code on production`);
}
const advertiser = workflow('advertiser-production-verification');
requireMarker(advertiser, "github.event_name == 'pull_request'", 'Advertiser PR-only syntax validation missing');
requireMarker(advertiser, 'node --check scripts/ci/verify-advertiser-production.mjs', 'Advertiser PR source syntax check missing');
requireMarker(advertiser, 'ref: ${{ github.event.workflow_run.head_sha || github.sha }}', 'Advertiser verifier must check out exact deployed SHA');
for (const name of ['verify-event-structured-data-production','verify-jasper-blue-hole-production','verify-sitemap-production-integrity']) {
  const source = workflow(name);
  requireMarker(source, 'ref: ${{ github.event.workflow_run.head_sha || github.sha }}', `${name} must check out exact deployed SHA`);
  if (/ref:\s*main\b/.test(source)) failures.push(`${name} must not check out moving main`);
  requireMarker(source, "github.event.workflow_run.conclusion == 'success'", `${name} must skip failed deployments`);
}
// Wave 3: live-only checks may run after deploy or explicitly by hand, not on PR or push.
for (const name of [
  'verify-cavern-production-integrity',
  'verify-demand-signal-routes',
  'verify-legacy-authority-production',
  'verify-relocation-production-depth',
  'verify-devils-sinkhole-redirect-production',
]) {
  const source = workflow(name);
  noDirectPush(source, name);
  requireMarker(source, 'workflow_run:', `${name} must follow protected deployment`);
  requireMarker(source, 'Deploy TexasDefined production', `${name} lost canonical deploy dependency`);
  requireMarker(source, 'workflow_dispatch:', `${name} lost explicit manual verification`);
  requireMarker(source, "github.event.workflow_run.conclusion == 'success'", `${name} must skip failed/cancelled deployments`);
  if (name !== 'verify-devils-sinkhole-redirect-production' && /^  pull_request:/m.test(source))
    failures.push(`${name} must not live-probe from PR triggers`);
}
const devils = workflow('verify-devils-sinkhole-redirect-production');
requireMarker(devils, "github.event_name == 'pull_request'", 'Devils Sinkhole PR syntax validation must remain');
requireMarker(devils, 'node --check scripts/ci/verify-devils-sinkhole-redirect-production.mjs', 'Devils Sinkhole PR syntax contract missing');
requireMarker(devils, 'ref: ${{ github.event.workflow_run.head_sha || github.sha }}', 'Devils Sinkhole verifier must use deployed SHA');
for (const name of ['verify-cavern-production-integrity','verify-demand-signal-routes'])
  requireMarker(workflow(name), 'ref: ${{ github.event.workflow_run.head_sha || github.sha }}', `${name} must check out deployed source`);
const relocationDepth = workflow('verify-relocation-production-depth');
requireMarker(relocationDepth, 'DEPLOY_SHA: ${{ github.event.workflow_run.head_sha || github.sha }}', 'Relocation-depth cache probe must bind deployed SHA');
requireMarker(relocationDepth, 'process.env.DEPLOY_SHA', 'Relocation-depth probe must not use moving default branch SHA');
// Wave 4: keep path-filtered source tests, but do not verify live URLs before
// this very commit has its canonical protected-production success status.
const pathFilteredLive = [
  'verify-housing-index-surfaces',
  'verify-local-home-insurance-production',
  'verify-local-mortgage-production',
  'verify-priority-county-property-production',
  'verify-remote-evergreen-production',
];
for (const name of pathFilteredLive) {
  const source = workflow(name);
  requireMarker(source, '  pull_request:', `${name} must retain PR source validation`);
  requireMarker(source, '  push:', `${name} must retain existing path-filtered push validation`);
  requireMarker(source, 'statuses: read', `${name} must have read-only GitHub status access`);
  const live = source.slice(source.indexOf('  verify-production:'));
  requireMarker(live, "github.event_name != 'pull_request'", `${name} must never live-check on PR`);
  requireMarker(live, 'node scripts/ci/wait-for-protected-production.mjs', `${name} must wait for protected deploy`);
  requireMarker(live, 'PRODUCTION_COMMIT_SHA:', `${name} must bind the exact triggering commit`);
  const waitAt = live.indexOf('node scripts/ci/wait-for-protected-production.mjs');
  const probeAt = live.indexOf('run: node scripts/ci/verify-');
  if (waitAt < 0 || probeAt < 0 || waitAt >= probeAt) failures.push(`${name} must wait *before* probing live production`);
}
const waitForProduction = fs.readFileSync('scripts/ci/wait-for-protected-production.mjs', 'utf8');
for (const marker of [
  "context === 'texasdefined-production'",
  "lastState === 'success'",
  "lastState === 'failure'",
  'Protected deployment failed',
  'Timed out waiting for exact-commit',
]) requireMarker(waitForProduction, marker, `Exact-commit production gate regressed: ${marker}`);
for (const name of ['hurst-whirlyball-production-smoke', 'my-story-museum-production-smoke', 'verify-brand-locator-production', 'verify-free-christmas-canonical']) {
  const source = workflow(name);
  requireMarker(source, 'STATUS_TARGET_SHA: ${{ github.event.workflow_run.head_sha || github.sha }}', `${name} must publish status against triggering deployed SHA`);
  requireMarker(source, "github.event.workflow_run.conclusion == 'success'", `${name} must skip live assertions after failed deployment`);
}
for (const name of ['hurst-whirlyball-production-smoke', 'my-story-museum-production-smoke']) {
  requireMarker(workflow(name), 'ref: ${{ github.event.workflow_run.head_sha || github.sha }}', `${name} must check out the triggering deployed revision`);
}
const freeChristmasSource = workflow('verify-free-christmas-canonical');
requireMarker(freeChristmasSource, 'DEPLOY_SHA: ${{ github.event.workflow_run.head_sha || github.sha }}', 'Free Christmas must resolve the actual deployed SHA');
requireMarker(freeChristmasSource, 'ref: ${{ env.DEPLOY_SHA }}', 'Free Christmas must check out the resolved deployed SHA');
const livePrSmoke = [
  'verify-fort-davis-browser',
  'verify-southlake-carroll-browser',
  'verify-texas-river-map-browser',
  'county-production-smoke',
  'verify-find-my-county-production',
  'verify-event-temporal-production',
];
for (const name of livePrSmoke) {
  const source = workflow(name);
  requireMarker(source, "github.event_name == 'pull_request'", `${name} must keep source-only PR validation`);
  requireMarker(source, 'node --check scripts/ci/', `${name} PR syntax check must exist`);
  requireMarker(source, "github.event.workflow_run.conclusion == 'success'", `${name} live probe must require successful deploy`);
  if (source.includes("github.event_name == 'pull_request' || github.event_name == 'workflow_dispatch'")) {
    failures.push(`${name} must not execute production probes on PRs`);
  }
}
// Cloudflare's path-filtered main push must wait for the exact source commit;
// successful checks on an earlier Worker are not certification of this push.
const cloudflareSmoke = workflow('cloudflare-production-smoke');
for (const marker of [
  '  statuses: read',
  'Wait for exact SHA protected production deployment',
  'PRODUCTION_COMMIT_SHA: ${{ github.sha }}',
  'node scripts/ci/wait-for-protected-production.mjs',
  "if: ${{ github.event_name == 'push' }}",
]) requireMarker(cloudflareSmoke, marker, `Cloudflare smoke exact-commit gate missing: ${marker}`);
const cloudflareGateIndex = cloudflareSmoke.indexOf('Wait for exact SHA protected production deployment');
const cloudflareLiveIndex = cloudflareSmoke.indexOf('Verify Cloudflare Workers, public DNS and production AI binding');
if (cloudflareGateIndex < 0 || cloudflareLiveIndex <= cloudflareGateIndex)
  failures.push('Cloudflare smoke must complete the protected deploy gate before live probes');

// Post-deploy verifier source must not float to a newer default branch.
const fridayNightLights = workflow('friday-night-lights-production-smoke');
requireMarker(fridayNightLights, "github.event.workflow_run.conclusion == 'success'", 'Friday Night Lights live smoke needs successful deploy');
requireMarker(fridayNightLights, 'ref: ${{ github.event.workflow_run.head_sha || github.sha }}', 'Friday Night Lights must check out deployed source, not default main');
if (fridayNightLights.includes('ref: main')) failures.push('Friday Night Lights live verifier cannot use moving main');
const waterNormalizer = workflow('normalize-waterdata-probe-status');
requireMarker(waterNormalizer, "github.event.workflow_run.conclusion == 'success'", 'Water-data optional-probe normalization requires successful source verifier');
requireMarker(waterNormalizer, 'STATUS_SHA: ${{ github.event.workflow_run.head_sha }}', 'Water-data status target must reference the triggering run');
requireMarker(waterNormalizer, 'ref: ${{ github.event.workflow_run.head_sha }}', 'Water-data normalizer must execute the triggering verifier revision');
if (waterNormalizer.includes('ref: main')) failures.push('Water-data normalizer must not execute changing main source');

// Browser verifier scripts for editorial and football must match the deploy
// which triggered them, not whichever commit has since become default main.
for (const name of ['verify-katy-browser','verify-abbott-browser','verify-wills-point-browser','verify-ysleta-museum-browser']) {
  const source = workflow(name);
  requireMarker(source, "github.event.workflow_run.conclusion == 'success'", `${name} must only run live after successful deployment`);
  requireMarker(source, 'ref: ${{ github.event.workflow_run.head_sha || github.sha }}', `${name} must check out deployed source SHA`);
  if (source.includes('Check out current repository')) failures.push(`${name} must not use moving main as verifier source`);
}

// Match post-deploy Events and museum verifier source to the triggering revision.
const eventCompletion = workflow('verify-event-system-completion');
const deployedRef = 'ref: ${{ github.event.workflow_run.head_sha || github.sha }}';
if (eventCompletion.split(deployedRef).length - 1 < 2)
  failures.push('Both Events completion jobs must check out the deployed SHA');
requireMarker(eventCompletion, "github.event.workflow_run.conclusion == 'success'", 'Events live checks require a successful deployment');
const zapata = workflow('verify-zapata-museum-production');
requireMarker(zapata, "github.event_name == 'workflow_dispatch' || github.event.workflow_run.conclusion == 'success'", 'Zapata live acceptance must be gated on deployment success');
requireMarker(zapata, deployedRef, 'Zapata live verifier must check out the deployed SHA');
if (zapata.slice(zapata.indexOf('  museum:')).includes("github.event.workflow_run.conclusion == 'failure'"))
  failures.push('Zapata live acceptance must not execute after failed deployment');

const linkGraph = workflow('audit-internal-link-graph-production');
requireMarker(linkGraph, 'ref: ${{ github.event.workflow_run.head_sha || github.sha }}', 'Post-deploy internal-link graph audit must check out triggering SHA');
requireMarker(linkGraph, "github.event.workflow_run.conclusion == 'success'", 'Internal-link graph audit requires successful deploy');
const seasonal = workflow('verify-seasonal-production');
requireMarker(seasonal, 'Wait for production deploy on push fallback', 'Seasonal direct-push fallback must synchronize deployment');
requireMarker(seasonal, 'texasdefined-production', 'Seasonal fallback must await exact SHA deployment success');
const sports = workflow('verify-sports-venue-editorial-production');
noDirectPush(sports, 'Sports venue standalone helper');
if (sports.includes('workflow_run:')) failures.push('Sports venue production check must run natively inside deploy, not via downstream workflow_run');
requireMarker(sports, 'workflow_dispatch:', 'Sports venue manual helper missing');
const deploy = workflow('deploy-production');
requireMarker(deploy, '- name: Verify sports venue editorial production', 'Native blocking sports production step missing');
requireMarker(deploy, 'node scripts/production/verify-sports-venue-editorial-production.mjs', 'Sports production verifier execution missing');
const sportsVerifier = fs.readFileSync('scripts/production/verify-sports-venue-editorial-production.mjs', 'utf8');
for (const marker of ['GITHUB_RUN_ID', 'GITHUB_RUN_ATTEMPT', 'Date.now()', "cache: 'no-store'", 'AbortSignal.timeout(30_000)', 'Daikin Park has anchored Houston Astros baseball in downtown Houston since 2000', 'sports-venue:legacy-stadium-katy'])
  requireMarker(sportsVerifier, marker, `Sports venue verifier regressed: ${marker}`);
const publication = fs.readFileSync('scripts/ci/verify-texasdefined-publication-production.mjs', 'utf8');
for (const marker of ['GITHUB_RUN_ID', 'GITHUB_RUN_ATTEMPT', 'Date.now()', 'td_verify=', "cache: 'no-store'"])
  requireMarker(publication, marker, `Publication cache bypass regressed: ${marker}`);
// Wave 6: retrospective Apple Springs browser acceptance must not assert
// proposed PR content against an older deployed Worker. Preserve the fast PR
// syntax check and the explicitly invoked production browser acceptance.
const appleSprings = workflow('verify-football-batch-003-apple-springs');
const appleSource = appleSprings.slice(appleSprings.indexOf('  source-syntax:'), appleSprings.indexOf('  apple-springs-chrome:'));
const appleLive = appleSprings.slice(appleSprings.indexOf('  apple-springs-chrome:'));
if (!appleSprings.includes('  pull_request:') || !appleSprings.includes('  workflow_dispatch:'))
  failures.push('Apple Springs must retain PR source validation and manual live retest');
requireMarker(appleSource, "if: ${{ github.event_name == 'pull_request' }}", 'Apple Springs PR job must be source-only');
requireMarker(appleSource, 'node --check scripts/ci/verify-football-batch-003-apple-springs.mjs', 'Apple Springs PR syntax check missing');
requireMarker(appleLive, "if: ${{ github.event_name == 'workflow_dispatch' }}", 'Apple Springs live browser must be manual-only, never execute on PR');
requireMarker(appleLive, 'node scripts/ci/verify-football-batch-003-apple-springs.mjs', 'Apple Springs manual live browser check missing');
if (appleSource.includes('node scripts/ci/verify-football-batch-003-apple-springs.mjs\n'))
  failures.push('Apple Springs PR source job must not invoke the live browser');

// Keep the 254-county source inventory on PRs but crawl the actual site only
// after an eligible deployment (or an intentional manual production audit).
const countyWorkflow = workflow('audit-all-editorial-production');
requireMarker(countyWorkflow, '  pull_request:', 'County source-inventory PR coverage missing');
const countyLive = countyWorkflow.slice(countyWorkflow.indexOf('  verify-county-production:'));
requireMarker(countyLive, "if: ${{ github.event_name != 'pull_request' && (github.event_name != 'workflow_run' || github.event.workflow_run.conclusion == 'success') }}", 'County production crawl must skip undeployed PRs and failed deployments');
if (countyLive.includes("continue-on-error: ${{ github.event_name == 'pull_request' }}"))
  failures.push('County production must not hide a PR-triggered live crawl failure');

// Wave 7: GSC priority source PRs and path-filtered main pushes must never
// probe live production before this exact revision is safely deployed.
const gscCohort = workflow('gsc-priority-cohort');
requireMarker(gscCohort, '  pull_request:', 'GSC priority cohort must retain PR coverage');
requireMarker(gscCohort, '  push:', 'GSC priority cohort must retain path-filtered push coverage');
requireMarker(gscCohort, '  schedule:', 'GSC priority cohort must retain scheduled audit');
requireMarker(gscCohort, '  statuses: read', 'GSC exact-SHA gate needs read-only status permission');
const gscSource = gscCohort.slice(gscCohort.indexOf('  validate-crawl-links:'), gscCohort.indexOf('  verify-production:'));
const gscLive = gscCohort.slice(gscCohort.indexOf('  verify-production:'));
requireMarker(gscSource, 'node scripts/seo/validate-gsc-crawl-demand-links.mjs', 'GSC must retain source-only PR contract');
if (gscSource.includes('node scripts/seo/check-gsc-priority-cohort.mjs')) failures.push('GSC source job must not probe live production');
for (const marker of [
  "if: ${{ github.event_name != 'pull_request' }}",
  'needs: validate-crawl-links',
  'Wait for exact SHA protected production deployment on push',
  "if: ${{ github.event_name == 'push' }}",
  'PRODUCTION_COMMIT_SHA: ${{ github.sha }}',
  'node scripts/ci/wait-for-protected-production.mjs',
  'node scripts/seo/check-gsc-priority-cohort.mjs',
]) requireMarker(gscLive, marker, `GSC deployed cohort gate missing: ${marker}`);
if (gscLive.indexOf('node scripts/ci/wait-for-protected-production.mjs') >= gscLive.indexOf('node scripts/seo/check-gsc-priority-cohort.mjs'))
  failures.push('GSC priority production crawl must wait for exact-SHA deployment before probing');

// Preserve the Texas river atlas source-only PR check and deployed-SHA
// live browser contract (adapted from prior PR #4544, without stale changes).
const texasRiver = workflow('verify-texas-river-map-browser');
const riverPr = texasRiver.slice(texasRiver.indexOf('  syntax:'), texasRiver.indexOf('  verify:'));
const riverLive = texasRiver.slice(texasRiver.indexOf('  verify:'));
requireMarker(riverPr, "github.event_name == 'pull_request'", 'River atlas PR syntax-only job missing');
requireMarker(riverPr, 'node --check scripts/ci/verify-texas-river-map-browser.mjs', 'River atlas PR source syntax check missing');
requireMarker(riverLive, "github.event.workflow_run.conclusion == 'success'", 'River atlas live checks require successful deployment');
requireMarker(riverLive, 'ref: ${{ github.event.workflow_run.head_sha || github.sha }}', 'River atlas live browser must use deployed SHA');
if (riverLive.includes("github.event_name == 'pull_request' ||"))
  failures.push('River atlas live browser must not run against undeployed PR code');

if (failures.length) { for (const failure of failures) console.error('FAIL: '+failure); process.exit(1); }
console.log('Scoped post-deploy verifier safety passed: deploy-success gating, immutable checkout, cache bypass, and blocking native sports smoke.');
