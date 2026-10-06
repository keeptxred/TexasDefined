import fs from 'node:fs';

const workflow = fs.readFileSync('.github/workflows/deploy-production.yml', 'utf8');
const productionSurfaces = fs.readFileSync('scripts/ci/verify-production-surfaces.mjs', 'utf8');
const viatorProduction = fs.readFileSync('scripts/ci/verify-viator-production.mjs', 'utf8');
const sanAngeloProduction = fs.readFileSync('scripts/ci/verify-san-angelo-proximity-production.mjs', 'utf8');
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

const sanAngeloProof = 'San Angelo town-reference proof: Christoval, Mertzon, Robert Lee, Bronte, Paint Rock, Ballinger';
for (const marker of [
  'data-proximity-town-references={metro.slug}',
  'data-town-reference-count={townReferences.length}',
  sanAngeloProof,
]) {
  if (!proximityCollectionRoute.includes(marker)) failures.push(`San Angelo proximity production-proof marker is missing: ${marker}`);
}
if (!viatorProduction.includes("await import('./verify-san-angelo-proximity-production.mjs');")) {
  failures.push('Base production verification must execute the San Angelo proximity live verifier.');
}
for (const marker of [
  '/explore/near/san-angelo/small-towns',
  '/explore/near/san-angelo/small-towns-1-hour',
  sanAngeloProof,
  "cache: 'no-store'",
  "'cache-control': 'no-cache'",
]) {
  if (!sanAngeloProduction.includes(marker)) failures.push(`San Angelo proximity live verifier is missing required cache-busted production assertion: ${marker}`);
}

const requiredLiveSteps = [
  ['Verify direct Worker health', 'live_direct_health', 'DIRECT_HEALTH_OUTCOME'],
  ['Verify canonical production health', 'live_canonical_health', 'CANONICAL_HEALTH_OUTCOME'],
  ['Verify direct Worker discovery', 'live_direct_worker', 'DIRECT_WORKER_OUTCOME'],
  ['Verify base production surfaces', 'live_base', 'BASE_OUTCOME'],
  ['Verify Event structured-data production', 'live_events', 'EVENT_OUTCOME'],
  ['Verify local financial production', 'live_local_financial', 'LOCAL_FINANCIAL_OUTCOME'],
  ['Verify statewide financial discovery', 'live_statewide_financial', 'STATEWIDE_FINANCIAL_OUTCOME'],
  ['Verify advertiser production', 'live_advertiser', 'ADVERTISER_OUTCOME'],
];

const gateName = '- name: Enforce aggregate live verification gate';
const gateStart = workflow.indexOf(gateName);
const gateEnd = gateStart >= 0 ? workflow.indexOf('\n      - name:', gateStart + gateName.length) : -1;
const gateBlock = gateStart >= 0 ? workflow.slice(gateStart, gateEnd > gateStart ? gateEnd : workflow.length) : '';
if (!gateBlock) failures.push('Production workflow must retain the fail-closed aggregate live verification gate.');
if (workflow.includes('- name: Enforce blocking live runtime gate and summarize advisory checks')) {
  failures.push('The weakened runtime-only/advisory live gate must not replace the fail-closed aggregate gate.');
}

for (const [name, id, envName] of requiredLiveSteps) {
  const stepStart = workflow.indexOf(`- name: ${name}`);
  const stepEnd = stepStart >= 0 ? workflow.indexOf('\n      - name:', stepStart + 1) : -1;
  const stepBlock = stepStart >= 0 ? workflow.slice(stepStart, stepEnd > stepStart ? stepEnd : workflow.length) : '';
  if (!stepBlock.includes(`id: ${id}`)) failures.push(`${name} must keep step id ${id}.`);
  if (!stepBlock.includes('continue-on-error: true')) failures.push(`${name} must collect its raw outcome for the aggregate gate.`);
  const outcomeMapping = `${envName}: \${{ steps.${id}.outcome }}`;
  if (!gateBlock.includes(outcomeMapping)) failures.push(`Aggregate live gate must map ${envName} from steps.${id}.outcome.`);
  if (!gateBlock.includes(`"$${envName}" != 'success'`)) failures.push(`Aggregate live gate must fail when ${envName} is not success.`);
}

if (/steps\.[A-Za-z0-9_-]+\.conclusion/.test(gateBlock)) failures.push('Aggregate live gate must use raw step outcome, not conclusion, for continue-on-error verifiers.');
if (!gateBlock.includes('Every raw child verifier outcome is blocking.')) {
  failures.push('Aggregate live gate must explicitly document that every raw child verifier is blocking.');
}
if (!gateBlock.includes('All production verification stages passed.')) failures.push('Aggregate live gate must state when every production verification stage passes.');
if (gateBlock.includes('advisory_failures=()') || gateBlock.includes('Non-blocking production quality checks need attention')) {
  failures.push('Aggregate live gate must not mask failed raw child outcomes as advisory warnings.');
}
if (gateBlock.includes('ROLLBACK_OUTCOME" != \'success\'') || gateBlock.includes('ROLLBACK_HEALTH_OUTCOME" != \'success\'')) {
  failures.push('Intentionally skipped rollback/recovery steps must not be required to succeed in the live aggregate gate.');
}

const indexNowName = '- name: Run guarded IndexNow step';
const indexNowStart = workflow.indexOf(indexNowName);
const indexNowEnd = indexNowStart >= 0 ? workflow.indexOf('\n      - name:', indexNowStart + 1) : -1;
const indexNowBlock = indexNowStart >= 0 ? workflow.slice(indexNowStart, indexNowEnd > indexNowStart ? indexNowEnd : workflow.length) : '';
if (!indexNowBlock.includes('id: indexnow') || !indexNowBlock.includes('node scripts/seo/submit-indexnow.mjs')) failures.push('Guarded IndexNow stage is missing or changed.');
if (indexNowBlock.includes('continue-on-error: true')) failures.push('IndexNow must remain fail-closed so a failed indexing submission cannot be published as a successful production certification.');
if (workflow.includes('- name: Run advisory IndexNow step')) failures.push('The weakened advisory IndexNow stage must not replace the guarded IndexNow gate.');

if (!premerge.includes("['CI/DEPLOYMENT', 'Validate live verification contract', 'node', ['scripts/ci/validate-live-verification-contract.mjs']]")) {
  failures.push('Canonical pre-merge validation must run the live verification contract validator.');
}

if (failures.length) {
  console.error('Live verification contract validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Live verification contract passed: ${stateFairChecks.length} State Fair production needles match page source; San Angelo close-town live proof is wired; all ${requiredLiveSteps.length} raw live verifier outcomes and IndexNow remain fail-closed.`);
