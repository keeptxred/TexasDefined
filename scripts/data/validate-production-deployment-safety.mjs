import fs from 'node:fs';

const workflow = fs.readFileSync('.github/workflows/deploy-production.yml', 'utf8');
const health = fs.readFileSync('scripts/ci/verify-production-health.mjs', 'utf8');
const capture = fs.readFileSync('scripts/ci/capture-active-worker-version.mjs', 'utf8');
const emergency = fs.readFileSync('.github/workflows/emergency-restore-known-good-worker.yml', 'utf8');
const failures = [];

const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

for (const [needle, label] of [
  ['id: live_direct_health', 'direct Worker health step'],
  ['PRODUCTION_HEALTH_ORIGIN: https://texasdefined-site.freddy-coppola.workers.dev', 'direct Worker health origin'],
  ["if: ${{ always() && steps.cloudflare.outcome == 'success' }}", 'direct Worker health deploy dependency'],
  ['id: live_direct_diagnostics', 'unhealthy Worker diagnostics step'],
  ['name: Upload unhealthy Worker runtime diagnostics', 'unhealthy Worker diagnostics upload'],
  ['artifacts/unhealthy-worker-tail.jsonl', 'Worker error tail capture'],
  ['if-no-files-found: error', 'diagnostic artifact fail-closed upload'],
  ['id: rollback', 'automatic rollback step'],
  ["steps.live_direct_health.outcome == 'failure'", 'rollback direct-health failure condition'],
  ['id: rollback_target', 'predeploy rollback target step'],
  ['node scripts/ci/capture-active-worker-version.mjs', 'rollback target capture command'],
  ['npx wrangler rollback "${{ steps.rollback_target.outputs.version_id }}" --message "Automatic rollback: direct Worker health failed after deploy ${GITHUB_SHA}"', 'explicit non-interactive Worker rollback command'],
  ['id: rollback_health', 'rollback health verification'],
  ["steps.rollback.outcome == 'success'", 'rollback health dependency'],
  ['id: live_canonical_health', 'canonical domain health step'],
  ['PRODUCTION_HEALTH_ORIGIN: https://texasdefined.com', 'canonical health origin'],
  ["steps.live_direct_health.outcome == 'success'", 'canonical health direct-Worker dependency'],
  ['DIRECT_HEALTH_OUTCOME: ${{ steps.live_direct_health.outcome }}', 'aggregate direct-health outcome'],
  ['CANONICAL_HEALTH_OUTCOME: ${{ steps.live_canonical_health.outcome }}', 'aggregate canonical-health outcome'],
  ['ROLLBACK_OUTCOME: ${{ steps.rollback.outcome }}', 'aggregate rollback outcome'],
  ['ROLLBACK_HEALTH_OUTCOME: ${{ steps.rollback_health.outcome }}', 'aggregate rollback-health outcome'],
]) requireText(workflow, needle, label);

const guardedVerifierCondition = "steps.live_direct_health.outcome == 'success' && steps.live_canonical_health.outcome == 'success'";
for (const step of [
  'Verify direct Worker discovery',
  'Verify base production surfaces',
  'Verify Event structured-data production',
  'Verify local financial production',
  'Verify statewide financial discovery',
  'Verify advertiser production',
]) {
  const index = workflow.indexOf(`- name: ${step}`);
  const block = index >= 0 ? workflow.slice(index, workflow.indexOf('\n      - name:', index + 1) > index ? workflow.indexOf('\n      - name:', index + 1) : workflow.length) : '';
  if (!block.includes(guardedVerifierCondition)) failures.push(`${step} must wait for both direct Worker and canonical-domain health.`);
}

const diagnosticsIndex = workflow.indexOf('- name: Capture unhealthy Worker runtime diagnostics');
const rollbackIndex = workflow.indexOf('- name: Roll back unhealthy Worker deployment');
const rollbackEnd = rollbackIndex >= 0 ? workflow.indexOf('\n      - name:', rollbackIndex + 1) : -1;
const rollbackBlock = rollbackIndex >= 0 ? workflow.slice(rollbackIndex, rollbackEnd > rollbackIndex ? rollbackEnd : workflow.length) : '';
if (diagnosticsIndex < 0 || rollbackIndex < 0 || diagnosticsIndex > rollbackIndex) {
  failures.push('Failing Worker runtime diagnostics must be captured before rollback.');
}
if (rollbackBlock.includes('live_canonical_health')) failures.push('Automatic rollback must not be triggered by canonical-domain-only failures.');
if (!rollbackBlock.includes("steps.live_direct_health.outcome == 'failure'")) failures.push('Automatic rollback must be limited to a failed direct Worker health gate.');
if (rollbackBlock.includes('npx wrangler rollback --message')) failures.push('Automatic rollback must specify the captured predeploy Worker version ID explicitly.');

const captureIndex = workflow.indexOf('id: rollback_target');
const deployIndex = workflow.indexOf('id: cloudflare');
if (captureIndex < 0 || deployIndex < 0 || captureIndex > deployIndex) {
  failures.push('The active Worker rollback target must be captured before the Cloudflare deploy step.');
}

for (const [needle, label] of [
  ["'wrangler', 'deployments', 'status', '--json'", 'Wrangler active-deployment query'],
  ["percentage >= 99.999", 'single 100%-traffic version requirement'],
  ["version_id=", 'GitHub Actions rollback-target output'],
  ['Refusing to deploy without a deterministic rollback target.', 'fail-closed ambiguous deployment handling'],
]) requireText(capture, needle, label);

for (const [needle, label] of [
  ['mkdir -p artifacts', 'visible emergency diagnostics directory'],
  ['path: artifacts/pre-rollback-*', 'emergency diagnostics upload path'],
  ['if-no-files-found: error', 'emergency diagnostics fail-closed upload'],
]) requireText(emergency, needle, label);

if (emergency.includes('.artifacts/pre-rollback-')) {
  failures.push('Emergency diagnostics must not use a hidden .artifacts upload path.');
}

for (const [needle, label] of [
  ["const attempts = Math.max(2", 'bounded retry count'],
  ["PRODUCTION_HEALTH_ATTEMPTS || '18'", 'default propagation window'],
  ['const requiredConsecutive = 2;', 'two-consecutive-success requirement'],
  ["response.status === 200", 'HTTP 200 requirement'],
  ["body.includes(requiredText)", 'content marker requirement'],
  ["cf-mitigated", 'Cloudflare challenge handling'],
  ["url.searchParams.set('health_check'", 'cache-busting health request'],
  ["cache: 'no-store'", 'no-store health request'],
  ["AbortSignal.timeout(timeoutMs)", 'request timeout'],
]) requireText(health, needle, label);

if (failures.length) {
  console.error('Production deployment safety validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Production deployment safety passed: new Worker health is stabilized before deep verification, persistent direct-Worker failure triggers rollback, rollback health is verified, and canonical-only failures do not rollback a healthy Worker.');
