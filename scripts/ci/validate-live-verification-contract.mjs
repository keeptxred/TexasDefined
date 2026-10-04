import fs from 'node:fs';

const workflow = fs.readFileSync('.github/workflows/deploy-production.yml', 'utf8');
const productionSurfaces = fs.readFileSync('scripts/ci/verify-production-surfaces.mjs', 'utf8');
const stateFairRoute = fs.readFileSync('src/routes/texas-state-fair.tsx', 'utf8');
const stateFairLazyRoute = fs.readFileSync('src/routes/texas-state-fair.lazy.tsx', 'utf8');
const stateFairEnhancements = fs.readFileSync('src/components/editorial/StateFairGuideEnhancements.tsx', 'utf8');
const stateFairHighlights = fs.readFileSync('src/components/editorial/StateFairCurrentHighlights.tsx', 'utf8');
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

for (const [name, id, envName] of requiredLiveSteps) {
  const stepStart = workflow.indexOf(`- name: ${name}`);
  const stepEnd = stepStart >= 0 ? workflow.indexOf('\n      - name:', stepStart + 1) : -1;
  const stepBlock = stepStart >= 0 ? workflow.slice(stepStart, stepEnd > stepStart ? stepEnd : workflow.length) : '';
  if (!stepBlock.includes(`id: ${id}`)) failures.push(`${name} must keep step id ${id}.`);
  if (!stepBlock.includes('continue-on-error: true')) failures.push(`${name} must collect its failure so the aggregate gate can summarize and fail closed.`);
  const outcomeMapping = `${envName}: \${{ steps.${id}.outcome }}`;
  if (!gateBlock.includes(outcomeMapping)) failures.push(`Aggregate live gate must map ${envName} from steps.${id}.outcome.`);
  if (!gateBlock.includes(`"$${envName}" != 'success'`)) failures.push(`Aggregate live gate must fail when ${envName} is not success.`);
}

if (/steps\.[A-Za-z0-9_-]+\.conclusion/.test(gateBlock)) failures.push('Aggregate live gate must use step outcome, not conclusion, for continue-on-error verifiers.');
if (/advisory/i.test(gateBlock) || gateBlock.includes('advisory_failures')) failures.push('Required production quality verifiers must not be downgraded to advisory status.');
if (gateBlock.includes('ROLLBACK_OUTCOME" != \'success\'') || gateBlock.includes('ROLLBACK_HEALTH_OUTCOME" != \'success\'')) {
  failures.push('Intentionally skipped rollback/recovery steps must not be required to succeed in the aggregate live gate.');
}

const indexNowStart = workflow.indexOf('- name: Run guarded IndexNow step');
const indexNowEnd = indexNowStart >= 0 ? workflow.indexOf('\n      - name:', indexNowStart + 1) : -1;
const indexNowBlock = indexNowStart >= 0 ? workflow.slice(indexNowStart, indexNowEnd > indexNowStart ? indexNowEnd : workflow.length) : '';
if (!indexNowBlock.includes('id: indexnow') || !indexNowBlock.includes('node scripts/seo/submit-indexnow.mjs')) failures.push('Guarded IndexNow stage is missing or changed.');
if (indexNowBlock.includes('continue-on-error: true')) failures.push('Guarded IndexNow stage must remain fail-closed.');

if (!premerge.includes("['CI/DEPLOYMENT', 'Validate live verification contract', 'node', ['scripts/ci/validate-live-verification-contract.mjs']]")) {
  failures.push('Canonical pre-merge validation must run the live verification contract validator.');
}

if (failures.length) {
  console.error('Live verification contract validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Live verification contract passed: ${stateFairChecks.length} State Fair production needles match page source and ${requiredLiveSteps.length} required live verifier outcomes remain fail-closed.`);
