import fs from 'node:fs';

const workflow = fs.readFileSync('.github/workflows/deploy-production.yml', 'utf8');
const productionSurfaces = fs.readFileSync('scripts/ci/verify-production-surfaces.mjs', 'utf8');
const stateFairRoute = fs.readFileSync('src/routes/texas-state-fair.tsx', 'utf8');
const stateFairLazyRoute = fs.readFileSync('src/routes/texas-state-fair.lazy.tsx', 'utf8');
const stateFairEnhancements = fs.readFileSync('src/components/editorial/StateFairGuideEnhancements.tsx', 'utf8');
const stateFairHighlights = fs.readFileSync('src/components/editorial/StateFairCurrentHighlights.tsx', 'utf8');
const proximityCollectionRoute = fs.readFileSync('src/routes/explore.near.$metro.$collection.tsx', 'utf8');
const premerge = fs.readFileSync('scripts/ci/run-premerge-validation.mjs', 'utf8');

const failures = [];
const stateFairSource = [stateFairRoute, stateFairLazyRoute, stateFairEnhancements, stateFairHighlights].join('\n');

const expectedStateFairLabels = new Set([
  'state-fair-current-date',
  'state-fair-planning-strip',
  'state-fair-featured-gallery',
  'state-fair-full-gallery',
  'state-fair-hours-section',
  'state-fair-coupons-section',
  'state-fair-ticket-section',
]);

const stateFairChecks = [...productionSurfaces.matchAll(/\['(state-fair-[^']+)',\s*'\/texas-state-fair',\s*'([^']+)'\]/g)]
  .map((match) => ({ label: match[1], needle: match[2] }));

const labels = new Set(stateFairChecks.map(({ label }) => label));
for (const label of expectedStateFairLabels) {
  if (!labels.has(label)) failures.push(`Production surface verifier is missing required State Fair check: ${label}`);
}
for (const { label, needle } of stateFairChecks) {
  if (!stateFairSource.includes(needle)) {
    failures.push(`State Fair live verifier drift: ${label} expects text not present in the State Fair page source: ${needle}`);
  }
}
if (stateFairChecks.length !== labels.size) failures.push('State Fair production surface checks must not contain duplicate labels.');

for (const marker of [
  'data-proximity-town-references={metro.slug}',
  'data-town-reference-count={townReferences.length}',
  'San Angelo town-reference proof: Christoval, Mertzon, Robert Lee, Bronte, Paint Rock, Ballinger',
]) {
  if (!proximityCollectionRoute.includes(marker)) failures.push(`San Angelo proximity production-proof marker is missing: ${marker}`);
}

const blockingLiveSteps = [
  ['Verify direct Worker health', 'live_direct_health', 'DIRECT_HEALTH_OUTCOME'],
  ['Verify canonical production health', 'live_canonical_health', 'CANONICAL_HEALTH_OUTCOME'],
];
const advisoryLiveSteps = [
  ['Verify direct Worker discovery', 'live_direct_worker', 'DIRECT_WORKER_OUTCOME'],
  ['Verify base production surfaces', 'live_base', 'BASE_OUTCOME'],
  ['Verify Event structured-data production', 'live_events', 'EVENT_OUTCOME'],
  ['Verify local financial production', 'live_local_financial', 'LOCAL_FINANCIAL_OUTCOME'],
  ['Verify statewide financial discovery', 'live_statewide_financial', 'STATEWIDE_FINANCIAL_OUTCOME'],
  ['Verify advertiser production', 'live_advertiser', 'ADVERTISER_OUTCOME'],
];
const requiredLiveSteps = [...blockingLiveSteps, ...advisoryLiveSteps];

const gateName = '- name: Enforce blocking live runtime gate and summarize advisory checks';
const gateStart = workflow.indexOf(gateName);
const gateEnd = gateStart >= 0 ? workflow.indexOf('\n      - name:', gateStart + gateName.length) : -1;
const gateBlock = gateStart >= 0 ? workflow.slice(gateStart, gateEnd > gateStart ? gateEnd : workflow.length) : '';
if (!gateBlock) failures.push('Production workflow must retain the blocking runtime gate with advisory quality summary.');
if (workflow.includes('- name: Enforce aggregate live verification gate')) failures.push('The obsolete all-or-nothing aggregate live verification gate must not return.');

for (const [name, id, envName] of requiredLiveSteps) {
  const stepStart = workflow.indexOf(`- name: ${name}`);
  const stepEnd = stepStart >= 0 ? workflow.indexOf('\n      - name:', stepStart + 1) : -1;
  const stepBlock = stepStart >= 0 ? workflow.slice(stepStart, stepEnd > stepStart ? stepEnd : workflow.length) : '';
  if (!stepBlock.includes(`id: ${id}`)) failures.push(`${name} must keep step id ${id}.`);
  if (!stepBlock.includes('continue-on-error: true')) failures.push(`${name} must collect its raw outcome for the runtime/advisory summary.`);
  const outcomeMapping = `${envName}: \${{ steps.${id}.outcome }}`;
  if (!gateBlock.includes(outcomeMapping)) failures.push(`Live runtime gate must map ${envName} from steps.${id}.outcome.`);
}

for (const [, , envName] of blockingLiveSteps) {
  if (!gateBlock.includes(`"$${envName}" != 'success'`)) failures.push(`Blocking live runtime gate must fail when ${envName} is not success.`);
}
for (const [, , envName] of advisoryLiveSteps) {
  if (!gateBlock.includes(`[[ "$${envName}" == 'success' ]] || advisory_failures+=`)) failures.push(`Advisory live verifier ${envName} must be summarized without blocking deployment.`);
  if (gateBlock.includes(`"$${envName}" != 'success'`)) failures.push(`Advisory live verifier ${envName} must not be part of a fail-closed condition.`);
}

if (/steps\.[A-Za-z0-9_-]+\.conclusion/.test(gateBlock)) failures.push('Live runtime gate must use raw step outcome, not conclusion, for continue-on-error verifiers.');
if (!gateBlock.includes('advisory_failures=()') || !gateBlock.includes('Non-blocking production quality checks need attention')) {
  failures.push('Live runtime gate must retain the advisory failure summary and warning.');
}
if (!gateBlock.includes('Blocking production runtime checks passed.')) failures.push('Live runtime gate must state when blocking runtime checks pass.');
if (gateBlock.includes('ROLLBACK_OUTCOME" != \'success\'') || gateBlock.includes('ROLLBACK_HEALTH_OUTCOME" != \'success\'')) {
  failures.push('Intentionally skipped rollback/recovery steps must not be required to succeed in the live runtime gate.');
}

const indexNowName = '- name: Run advisory IndexNow step';
const indexNowStart = workflow.indexOf(indexNowName);
const indexNowEnd = indexNowStart >= 0 ? workflow.indexOf('\n      - name:', indexNowStart + 1) : -1;
const indexNowBlock = indexNowStart >= 0 ? workflow.slice(indexNowStart, indexNowEnd > indexNowStart ? indexNowEnd : workflow.length) : '';
if (!indexNowBlock.includes('id: indexnow') || !indexNowBlock.includes('node scripts/seo/submit-indexnow.mjs')) failures.push('Advisory IndexNow stage is missing or changed.');
if (!indexNowBlock.includes('continue-on-error: true')) failures.push('IndexNow must remain advisory so external indexing failures cannot invalidate a healthy deployment.');
if (workflow.includes('- name: Run guarded IndexNow step')) failures.push('The obsolete fail-closed IndexNow gate must not return.');

if (!premerge.includes("['CI/DEPLOYMENT', 'Validate live verification contract', 'node', ['scripts/ci/validate-live-verification-contract.mjs']]")) {
  failures.push('Canonical pre-merge validation must run the live verification contract validator.');
}

if (failures.length) {
  console.error('Live verification contract validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Live verification contract passed: ${stateFairChecks.length} State Fair production needles match page source; ${blockingLiveSteps.length} runtime checks are blocking and ${advisoryLiveSteps.length} quality checks plus IndexNow remain advisory.`);
