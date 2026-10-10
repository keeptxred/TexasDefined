import fs from 'node:fs';
const failures = [];
const workflow = (name) => fs.readFileSync(`.github/workflows/${name}.yml`, 'utf8');
const requireMarker = (source, marker, label) => { if (!source.includes(marker)) failures.push(label); };
const noDirectPush = (source, label) => { if (/^  push:/m.test(source)) failures.push(`${label} cannot assert live production before a protected deployment`); };
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
if (failures.length) { for (const failure of failures) console.error('FAIL: '+failure); process.exit(1); }
console.log('Scoped post-deploy verifier safety passed: deploy-success gating, immutable checkout, cache bypass, and blocking native sports smoke.');
