import fs from 'node:fs';

const workflow = fs.readFileSync('.github/workflows/deploy-production.yml', 'utf8');
const productionSurfaces = fs.readFileSync('scripts/ci/verify-production-surfaces.mjs', 'utf8');
const cityAuthorityProfiles = fs.readFileSync('src/data/city-authority-profiles.ts', 'utf8');
const citySocialImages = fs.readFileSync('src/data/city-social-images.ts', 'utf8');
const viatorProduction = fs.readFileSync('scripts/ci/verify-viator-production.mjs', 'utf8');
const sanAngeloProduction = fs.readFileSync('scripts/ci/verify-san-angelo-proximity-production.mjs', 'utf8');
const stateFairRoute = fs.readFileSync('src/routes/texas-state-fair.tsx', 'utf8');
const stateFairLazyRoute = fs.readFileSync('src/routes/texas-state-fair.lazy.tsx', 'utf8');
const stateFairEnhancements = fs.readFileSync('src/components/editorial/StateFairGuideEnhancements.tsx', 'utf8');
const stateFairHighlights = fs.readFileSync('src/components/editorial/StateFairCurrentHighlights.tsx', 'utf8');
const proximityCollectionRoute = fs.readFileSync('src/routes/explore.near.$metro.$collection.tsx', 'utf8');
const proximityPresentation = fs.readFileSync('src/data/metro-proximity-presentation.ts', 'utf8');
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

const cityProductionChecks = [
  ['city-houston-authority', '/city/houston', 'Museum District + Hermann Park', 'profile'],
  ['city-houston-social', '/city/houston', 'Houston_texas_usa_skyline.jpg?width=1600', 'social'],
  ['city-dallas-authority', '/city/dallas', 'Choose one evening district', 'profile'],
  ['city-dallas-social', '/city/dallas', 'Dallas_Texas_Skyline.jpg?width=1600', 'social'],
  ['city-fort-worth-authority', '/city/fort-worth', 'Panther Island', 'profile'],
  ['city-fort-worth-social', '/city/fort-worth', 'Fort_Worth_Stock_Yards_Entrance_Wiki_(1_of_1).jpg?width=1600', 'social'],
  ['city-austin-authority', '/city/austin', 'Lady Bird Lake + South Congress', 'profile'],
  ['city-austin-social', '/city/austin', 'Austin%2C_TX_skyline_2026.jpg?width=1600', 'social'],
  ['city-san-antonio-authority', '/city/san-antonio', 'Pearl + Museum Reach', 'profile'],
  ['city-san-antonio-social', '/city/san-antonio', 'San_Antonio_Skyline_2026.jpg?width=1600', 'social'],
  ['city-el-paso-authority', '/city/el-paso', 'UTEP campus architecture', 'profile'],
  ['city-el-paso-social', '/city/el-paso', 'El_Paso_skyline.jpg?width=1600', 'social'],
  ['city-arlington-authority', '/city/arlington', 'Build around the event calendar', 'profile'],
  ['city-arlington-social', '/city/arlington', 'Arlington_Texas_Entertainment_District.jpg?width=1600', 'social'],
  ['city-hurst-authority', '/city/hurst', 'Use Hurst as a Mid-Cities base', 'profile'],
  ['city-hurst-social', '/city/hurst', 'Cityhallathurst.jpg?width=1600', 'social'],
  ['city-corpus-christi-authority', '/city/corpus-christi', 'North Beach day', 'profile'],
  ['city-corpus-christi-social', '/city/corpus-christi', 'Corpus_Christi_skyline.jpg?width=1600', 'social'],
  ['city-plano-authority', '/city/plano', 'Legacy / Legacy West', 'profile'],
  ['city-plano-social', '/city/plano', 'Hdr_plano.jpg?width=1600', 'social'],
  ['city-lubbock-authority', '/city/lubbock', 'Downtown + Buddy Holly corridor', 'profile'],
  ['city-lubbock-social', '/city/lubbock', 'Lubbock%2C_Texas_skyline.jpg?width=1600', 'social'],
];
for (const [label, path, needle, sourceKind] of cityProductionChecks) {
  const tuple = `['${label}', '${path}', '${needle}']`;
  if (!productionSurfaces.includes(tuple)) failures.push(`Production surface verifier is missing required city check: ${label}`);
  const source = sourceKind === 'profile' ? cityAuthorityProfiles : citySocialImages;
  if (!source.includes(needle)) failures.push(`City production verifier drift: ${label} expects content not present in ${sourceKind} source: ${needle}`);
}

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
const dallasTwoHourTitle = 'Small-Town Day Trips From Dallas, Texas';
if (!proximityPresentation.includes('titlePrefix: "Small-Town Day Trips From"')) {
  failures.push('Metro proximity presentation must retain the shared Small-Town Day Trips From title contract for two-hour small-town pages.');
}
if (!productionSurfaces.includes(`['metro-dallas-small-towns-2-hours', '/explore/near/dallas/small-towns-2-hours', '${dallasTwoHourTitle}']`)) {
  failures.push(`Dallas two-hour small-town live verifier drift: expected current canonical presentation title ${dallasTwoHourTitle}.`);
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
  ['Verify direct Worker health', 'live_direct_health'],
  ['Verify canonical production health', 'live_canonical_health'],
  ['Verify direct Worker discovery', 'live_direct_worker'],
  ['Verify base production surfaces', 'live_base'],
  ['Verify Event structured-data production', 'live_events'],
  ['Verify local financial production', 'live_local_financial'],
  ['Verify statewide financial discovery', 'live_statewide_financial'],
  ['Verify advertiser production', 'live_advertiser'],
];

if (workflow.includes('- name: Enforce aggregate live verification gate')) {
  failures.push('Obsolete aggregate live verification gate must not be restored; raw production verifiers must fail closed natively.');
}
if (workflow.includes('- name: Enforce blocking live runtime gate and summarize advisory checks')) {
  failures.push('The weakened runtime-only/advisory live gate must not replace native fail-closed production verifiers.');
}

let lastLiveStepStart = -1;
for (const [name, id] of requiredLiveSteps) {
  const stepStart = workflow.indexOf(`- name: ${name}`);
  const stepEnd = stepStart >= 0 ? workflow.indexOf('\n      - name:', stepStart + 1) : -1;
  const stepBlock = stepStart >= 0 ? workflow.slice(stepStart, stepEnd > stepStart ? stepEnd : workflow.length) : '';
  if (!stepBlock) { failures.push(`Missing required live verifier step: ${name}.`); continue; }
  if (!stepBlock.includes(`id: ${id}`)) failures.push(`${name} must keep step id ${id}.`);
  if (stepBlock.includes('continue-on-error: true')) failures.push(`${name} must fail closed natively and must not use continue-on-error.`);
  lastLiveStepStart = Math.max(lastLiveStepStart, stepStart);
}

const liveMarkerName = '- name: Mark live production verification complete';
const liveMarkerStart = workflow.indexOf(liveMarkerName);
const liveMarkerEnd = liveMarkerStart >= 0 ? workflow.indexOf('\n      - name:', liveMarkerStart + liveMarkerName.length) : -1;
const liveMarkerBlock = liveMarkerStart >= 0 ? workflow.slice(liveMarkerStart, liveMarkerEnd > liveMarkerStart ? liveMarkerEnd : workflow.length) : '';
if (!liveMarkerBlock) failures.push('Production workflow must retain a post-verifier live-completion marker.');
if (liveMarkerStart >= 0 && liveMarkerStart <= lastLiveStepStart) failures.push('Live-completion marker must run after every blocking live verifier.');
for (const marker of ['id: live', "if: ${{ success() && steps.cloudflare.outcome == 'success' }}", "All blocking production verifiers passed natively."]) {
  if (!liveMarkerBlock.includes(marker)) failures.push(`Live-completion marker is missing: ${marker}`);
}

const livePublishName = '- name: Publish live verification result';
const livePublishStart = workflow.indexOf(livePublishName);
const livePublishEnd = livePublishStart >= 0 ? workflow.indexOf('\n      - name:', livePublishStart + livePublishName.length) : -1;
const livePublishBlock = livePublishStart >= 0 ? workflow.slice(livePublishStart, livePublishEnd > livePublishStart ? livePublishEnd : workflow.length) : '';
if (!livePublishBlock.includes("STAGE_OUTCOME: ${{ steps.live.outcome == 'success' && 'success' || 'failure' }}")) {
  failures.push('Live status publication must report failure whenever the native live-completion marker did not succeed.');
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

console.log(`Live verification contract passed: ${stateFairChecks.length} State Fair production needles and ${cityProductionChecks.length} city authority/social production needles match source; San Angelo close-town live proof is wired; all ${requiredLiveSteps.length} live verifiers fail closed natively without the retired aggregate gate, and IndexNow remains fail-closed.`);
