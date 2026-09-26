import fs from 'node:fs';

const workflow = fs.readFileSync('.github/workflows/deploy-production.yml', 'utf8');
const cloudflareSmoke = fs.readFileSync('.github/workflows/cloudflare-production-smoke.yml', 'utf8');
const health = fs.readFileSync('scripts/ci/verify-production-health.mjs', 'utf8');
const capture = fs.readFileSync('scripts/ci/capture-active-worker-version.mjs', 'utf8');
const restore = fs.readFileSync('.github/workflows/restore-verified-worker.yml', 'utf8');
const ledger = fs.readFileSync('scripts/ci/verified-worker-ledger.mjs', 'utf8');
const premerge = fs.readFileSync('scripts/ci/run-premerge-validation.mjs', 'utf8');
const smoke = fs.readFileSync('scripts/ci/verify-built-worker-ssr.mjs', 'utf8');
const productionSurfaces = fs.readFileSync('scripts/ci/verify-production-surfaces.mjs', 'utf8');
const failures = [];

const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

for (const [needle, label] of [
  ['id: runtime_smoke', 'predeploy built Worker SSR smoke step'],
  ['node scripts/ci/verify-built-worker-ssr.mjs', 'predeploy built Worker SSR smoke command'],
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
  ['id: predeploy_direct_health', 'predeploy direct Worker health step'],
  ['PRODUCTION_HEALTH_LABEL: predeploy-current-direct-worker', 'predeploy direct Worker health label'],
  ['id: predeploy_canonical_health', 'predeploy canonical-domain health step'],
  ['PRODUCTION_HEALTH_LABEL: predeploy-current-canonical-domain', 'predeploy canonical-domain health label'],
  ['id: predeploy_diagnostics', 'predeploy unhealthy-current diagnostics step'],
  ['path: artifacts/predeploy-current-*', 'visible predeploy incident diagnostics upload'],
  ['id: predeploy_health', 'predeploy fail-closed health gate'],
  ['Current production is unhealthy; deploy blocked', 'predeploy fail-closed error'],
  ['deployments: write', 'verified Worker ledger permission'],
  ['id: verified_worker_version', 'post-verification Worker version capture'],
  ['id: verified_worker_ledger', 'verified Worker recovery ledger step'],
  ['node scripts/ci/verified-worker-ledger.mjs record', 'verified Worker recovery ledger command'],
  ["CLOUDFLARE_CACHE_TOKEN_PRESENT: ${{ secrets.CLOUDFLARE_CACHE_API_TOKEN != '' }}", 'dedicated cache-purge token presence env flag'],
  ["CLOUDFLARE_CACHE_API_TOKEN: ${{ secrets.CLOUDFLARE_CACHE_API_TOKEN }}", 'dedicated cache-purge credential routing'],
  ['name: Report targeted cache-purge capability', 'cache-purge capability reporting'],
  ['deploy/general tokens are not assumed to have Cache Purge permission', 'cache-purge least-privilege warning'],
  ["env.CLOUDFLARE_CACHE_TOKEN_PRESENT == 'true'", 'cache-purge step env-flag condition'],
]) requireText(workflow, needle, label);

for (const [needle, label] of [
  ["CLOUDFLARE_WORKERS_API_TOKEN: ${{ secrets.CLOUDFLARE_DEPLOY_API_TOKEN || secrets.CLOUDFLARE_API_TOKEN }}", 'Cloudflare smoke dedicated Workers credential fallback'],
  ['Verify Cloudflare Workers, public DNS and production AI binding', 'Cloudflare smoke least-privilege capability label'],
  ['workers_auth="Authorization: Bearer $CLOUDFLARE_WORKERS_API_TOKEN"', 'Cloudflare smoke Workers authorization header'],
  ['curl --fail-with-body --silent --show-error -H "$workers_auth" \\\n            "$api/accounts/$CLOUDFLARE_ACCOUNT_ID/workers/scripts"', 'Cloudflare smoke Workers Scripts credential routing'],
  ["for hostname in ('texasdefined.com', 'www.texasdefined.com'):", 'Cloudflare smoke public DNS hostname coverage'],
  ['socket.getaddrinfo(hostname, 443, type=socket.SOCK_STREAM)', 'Cloudflare smoke public DNS resolver'],
  ["grep -qi '^cf-ray:'", 'Cloudflare smoke edge-routing header verification'],
  ["echo 'Public DNS resolution and Cloudflare edge routing verified.'", 'Cloudflare smoke public DNS success marker'],
  ['curl --fail-with-body --silent --show-error -H "$workers_auth" --get \\\n            "$api/accounts/$CLOUDFLARE_ACCOUNT_ID/workers/domains"', 'Cloudflare smoke Workers Domains credential routing'],
  ["-H 'Origin: https://texasdefined.com'", 'Cloudflare smoke production AI same-origin header'],
  ["-H 'Sec-Fetch-Site: same-origin'", 'Cloudflare smoke production AI fetch-site header'],
  ['https://texasdefined.com/api/texas-defined-ai?production_smoke=', 'Cloudflare smoke production AI binding endpoint'],
  ["assert isinstance(answer, str) and len(answer.strip()) >= 20", 'Cloudflare smoke production AI usable-answer requirement'],
]) requireText(cloudflareSmoke, needle, label);

for (const retired of ['CLOUDFLARE_ZONE_API_TOKEN', '$api/zones', '/dns_records', '/ai/run/']) {
  if (cloudflareSmoke.includes(retired)) {
    failures.push(`Cloudflare production smoke must verify public DNS without requiring privileged zone/DNS API scope: found ${retired}`);
  }
}

if (cloudflareSmoke.includes('      CLOUDFLARE_API_TOKEN:')) {
  failures.push('Cloudflare production smoke must verify Workers AI through the deployed binding instead of requiring a broad direct REST API token.');
}

if (workflow.includes("CLOUDFLARE_CACHE_API_TOKEN: ${{ secrets.CLOUDFLARE_CACHE_API_TOKEN ||")) {
  failures.push('Targeted cache purge must not fall back to deploy/general Cloudflare tokens without explicit Cache Purge scope.');
}

if (/^\s*if:\s*.*secrets\./m.test(workflow)) {
  failures.push('GitHub Actions if expressions must not reference secrets directly; expose secret presence through job env and test env.* instead.');
}

requireText(workflow, 'https://texasdefined.com/explore/painted-churches', 'Painted Churches targeted cache purge URL');
requireText(productionSurfaces, "['painted-churches-authority-round-2', '/explore/painted-churches', 'A second 15-source research pass adds community, architectural and preservation evidence.']", 'Painted Churches round-two live authority check');
requireText(productionSurfaces, "['ima-hogg-authority', '/article/ima-hogg-texas-legacy', 'Ima Hogg: The Texas Patron Who Turned Family Wealth Into Public Institutions']", 'Ima Hogg live authority check');
requireText(productionSurfaces, "['hogg-family-authority', '/article/hogg-family-texas-legacy', 'The Hogg Family in Texas: Politics, Oil, Philanthropy and Preservation']", 'Hogg family live authority check');
requireText(productionSurfaces, "['texas-history-hogg-family-discovery', '/texas-history', 'The Hogg family in Texas']", 'Hogg family Texas History discovery check');
requireText(productionSurfaces, "['texas-history-ima-hogg-discovery', '/texas-history', 'Follow the Houston patron who helped build the symphony, the Hogg Foundation, Bayou Bend and a statewide preservation legacy.']", 'Ima Hogg Texas History discovery check');
for (const marker of [
  "['painted-churches-round2-lacoste', '/explore/painted-churches/lacoste-our-lady-of-grace', 'Documented decoration campaign']",
  "['painted-churches-round2-panna-maria', '/explore/painted-churches/panna-maria-immaculate-conception', '12,000-piece mosaic of the Virgin of Częstochowa']",
  "['painted-churches-round2-serbin', '/explore/painted-churches/serbin-st-paul-lutheran-church', 'Colony land purchase']",
  "['painted-churches-round2-amarillo', '/explore/painted-churches/amarillo-first-baptist-church', 'September 1889 with sixteen charter members']",
  "['painted-churches-round2-high-hill', '/explore/painted-churches/high-hill-nativity-of-mary', 'High Hill developed from the late-1840s German settlements of Blum Hill and Oldenburg']",
  "['painted-churches-round2-dubina', '/explore/painted-churches/dubina-saints-cyril-methodius', 'Carpenter Gothic basilican three-aisle plan']",
  "['painted-churches-round2-lindsay', '/explore/painted-churches/lindsay-st-peters-catholic-church', 'City of Lindsay visitor information says St. Peter has undergone two major restorations']",
  "['painted-churches-round2-bandera', '/explore/painted-churches/bandera-st-stanislaus-catholic-church', 'sixteen Polish families arriving in 1855 to work at the cypress mill']",
]) requireText(productionSurfaces, marker, 'Painted Churches round-two church-profile live check');
requireText(productionSurfaces, "['state-fair-current-date', '/texas-state-fair', 'September 25, 2026']", 'markup-agnostic State Fair live date check');
requireText(productionSurfaces, "['state-fair-planning-strip', '/texas-state-fair', 'Tickets, football and a place to stay']", 'State Fair production planning-strip check');
requireText(productionSurfaces, "['state-fair-featured-gallery', '/texas-state-fair', 'State Fair photo carousel']", 'State Fair production featured-gallery check');
requireText(productionSurfaces, "['state-fair-full-gallery', '/texas-state-fair', 'View the full 31-photo historical State Fair gallery']", 'State Fair production full-gallery check');
if (productionSurfaces.includes("['state-fair-current-date', '/texas-state-fair', 'Updated September 25, 2026']")) {
  failures.push('State Fair live verification must not depend on the exact Updated-label markup.');
}

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

const smokeIndex = workflow.indexOf('id: runtime_smoke');
const predeployDirectIndex = workflow.indexOf('id: predeploy_direct_health');
const predeployCanonicalIndex = workflow.indexOf('id: predeploy_canonical_health');
const predeployGateIndex = workflow.indexOf('id: predeploy_health');
const captureIndex = workflow.indexOf('id: rollback_target');
const deployIndex = workflow.indexOf('id: cloudflare');
if (
  smokeIndex < 0 ||
  predeployDirectIndex < 0 ||
  predeployCanonicalIndex < 0 ||
  predeployGateIndex < 0 ||
  captureIndex < 0 ||
  deployIndex < 0 ||
  smokeIndex > predeployDirectIndex ||
  predeployDirectIndex > predeployCanonicalIndex ||
  predeployCanonicalIndex > predeployGateIndex ||
  predeployGateIndex > captureIndex ||
  captureIndex > deployIndex
) {
  failures.push('The built Worker smoke and current direct/canonical health gate must pass before rollback-target capture and Cloudflare deployment.');
}

const liveGateIndex = workflow.indexOf('id: live\n');
const indexNowIndex = workflow.indexOf('id: indexnow');
const verifiedVersionIndex = workflow.indexOf('id: verified_worker_version');
const verifiedLedgerIndex = workflow.indexOf('id: verified_worker_ledger');
if (
  liveGateIndex < 0 ||
  indexNowIndex < 0 ||
  verifiedVersionIndex < 0 ||
  verifiedLedgerIndex < 0 ||
  liveGateIndex > indexNowIndex ||
  indexNowIndex > verifiedVersionIndex ||
  verifiedVersionIndex > verifiedLedgerIndex
) {
  failures.push('The verified Worker ledger must advance only after aggregate live verification and the guarded IndexNow stage succeed.');
}

for (const [needle, label] of [
  ["node_modules/.bin/wrangler", 'Wrangler local runtime launch'],
  ["'dist/server/wrangler.json'", 'generated Worker configuration smoke target'],
  ["response.status === 200", 'local Worker HTTP 200 requirement'],
  ["body.includes(requiredText)", 'local Worker content marker requirement'],
  ["process.kill(-child.pid", 'local Worker process-group cleanup'],
]) requireText(smoke, needle, label);

requireText(premerge, "Smoke-test built Worker SSR locally", 'protected merge-gate Worker SSR smoke');
requireText(premerge, "scripts/ci/verify-built-worker-ssr.mjs", 'protected merge-gate Worker SSR smoke command');

for (const [needle, label] of [
  ["'wrangler', 'deployments', 'status', '--json'", 'Wrangler active-deployment query'],
  ["percentage >= 99.999", 'single 100%-traffic version requirement'],
  ["version_id=", 'GitHub Actions rollback-target output'],
  ['Refusing to deploy without a deterministic rollback target.', 'fail-closed ambiguous deployment handling'],
]) requireText(capture, needle, label);

const retiredEmergencyWorkflow = '.github/workflows/emergency-restore-known-good-worker.yml';
if (fs.existsSync(retiredEmergencyWorkflow)) {
  failures.push('The one-time hard-coded emergency Worker restore workflow must remain retired.');
}

for (const [needle, label] of [
  ['workflow_dispatch:', 'manual verified Worker restore trigger'],
  ['deployments: read', 'verified Worker restore deployment-ledger permission'],
  ['node scripts/ci/verified-worker-ledger.mjs resolve', 'verified Worker restore ledger resolution'],
  ['path: artifacts/verified-restore-*', 'visible restore diagnostics upload path'],
  ['if-no-files-found: error', 'restore diagnostics fail-closed upload'],
  ['steps.verified_target.outputs.version_id', 'restore uses resolved verified Worker version'],
  ['Verify restored direct Worker', 'restored direct Worker health gate'],
  ['Verify restored canonical domain', 'restored canonical-domain health gate'],
  ['Verify restored production surfaces', 'restored base production surfaces gate'],
]) requireText(restore, needle, label);

if (/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(restore)) {
  failures.push('Permanent verified Worker restore workflow must not hard-code a Cloudflare version UUID.');
}

for (const [needle, label] of [
  ["const environment = 'texasdefined-verified-worker';", 'verified Worker ledger environment'],
  ["task: 'verified-worker-ledger'", 'verified Worker ledger task'],
  ['required_contexts: []', 'verified Worker ledger explicit context handling'],
  ['worker_version: version', 'verified Worker ledger version payload'],
  ["state: 'success'", 'verified Worker ledger success status'],
  ["latest?.state !== 'success'", 'verified Worker resolver success-only rule'],
  ['No successful verified Worker recovery target exists', 'verified Worker resolver fail-closed behavior'],
]) requireText(ledger, needle, label);

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

console.log('Production deployment safety passed: current production must be healthy before replacement, rollback targets are captured only after that gate, failed releases capture visible diagnostics and rollback, Cloudflare production smoke routes Workers API probes through the deploy-capable credential, verifies live public DNS/Cloudflare edge routing without privileged zone/DNS scope, and verifies Workers AI through the production binding instead of a broad REST token; targeted cache purge uses only its dedicated least-privilege credential while cache-busted live verification remains authoritative, live State Fair verification remains markup-agnostic, and fully verified Worker versions advance an immutable recovery ledger used by the manual restore workflow.');
