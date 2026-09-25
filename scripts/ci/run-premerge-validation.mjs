import { appendFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const failures = [];
const results = [];

function appendSummary(text) {
  if (summaryPath) appendFileSync(summaryPath, text);
}

function runCheck({ classification, label, command, args = [], dependsOnBuild = false }, buildPassed) {
  if (dependsOnBuild && !buildPassed) {
    results.push({ status: 'SKIP', classification, label, durationSeconds: '0.0' });
    console.warn(`::warning title=${classification} skipped::${label} skipped because the production build failed.`);
    return false;
  }

  const started = Date.now();
  console.log(`::group::[${classification}] ${label}`);
  console.log(`$ ${command} ${args.join(' ')}`);
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
    shell: false,
  });
  console.log('::endgroup::');

  const durationSeconds = ((Date.now() - started) / 1000).toFixed(1);
  const ok = !result.error && result.status === 0;
  results.push({ status: ok ? 'PASS' : 'FAIL', classification, label, durationSeconds });

  if (!ok) {
    const detail = result.error ? result.error.message : `exit code ${result.status ?? 'unknown'}`;
    const renderedCommand = `${command} ${args.join(' ')}`.trim();
    failures.push({ classification, label, command: renderedCommand, detail });
    console.error(`::error title=${classification} failure::${label} failed (${detail}). Command: ${renderedCommand}`);
  }

  return ok;
}

const prebuildChecks = [
  ['EVENT/TICKETMASTER', 'Validate Ticketmaster ingestion and tracking', 'node', ['--test', 'scripts/events/ticketmaster-discovery.test.mjs']],
  ['EVENT/TICKETMASTER', 'Validate Ticketmaster calendar integration', 'node', ['scripts/data/validate-ticketmaster-integration.mjs']],
  ['EVENT/TICKETING', 'Validate shared ticket architecture', 'node', ['scripts/data/validate-event-ticketing-architecture.mjs']],
  ['EVENT/TICKETING', 'Validate canonical official ticket fallback', 'node', ['scripts/data/validate-event-ticket-positive-path.mjs']],
  ['EVENT/TICKETING', 'Syntax-check production ticketing verifier', 'node', ['--check', 'scripts/ci/verify-event-ticketing-production.mjs']],
  ['CI/GOVERNANCE', 'Validate retired integration traces', 'node', ['scripts/ci/validate-retired-integration-traces.mjs']],
  ['CI/GOVERNANCE', 'Validate direct-main writer inventory', 'node', ['scripts/ci/validate-direct-main-writer-inventory.mjs']],
  ['CI/GOVERNANCE', 'Validate consolidated county certifiers', 'node', ['scripts/ci/validate-county-certifier-consolidation.mjs']],
  ['CI/GOVERNANCE', 'Validate automation main-write policy', 'node', ['scripts/ci/validate-automation-main-write-policy.mjs']],
  ['CI/GOVERNANCE', 'Validate retired one-time certifications', 'node', ['scripts/ci/validate-retired-one-time-certifications.mjs']],
  ['CI/DEPLOYMENT', 'Validate production rollback safety', 'node', ['scripts/data/validate-production-deployment-safety.mjs']],
  ['CONTENT/GOVERNANCE', 'Validate permanent SEO content quality governance', 'node', ['scripts/data/validate-content-quality-governance.mjs']],
  ['UX/LAYOUT', 'Validate sitewide dead-space safeguards', 'node', ['scripts/data/validate-layout-dead-space.mjs']],
  ['CONTENT/GOVERNANCE', 'Validate 250 Texas Stories source backlog', 'node', ['scripts/data/validate-250-texas-stories-backlog.mjs']],
  ['CONTENT/GOVERNANCE', 'Validate 250 Texas Stories Part 1 reconciliation', 'node', ['scripts/data/validate-250-texas-stories-part1-reconciliation.mjs']],
  ['CONTENT/GOVERNANCE', 'Validate 250 Texas Stories Part 2 reconciliation', 'node', ['scripts/data/validate-250-texas-stories-part2-reconciliation.mjs']],
  ['SEO/STATE-EVIDENCE', 'Validate Texas-vs state promotions', 'node', ['scripts/data/validate-texas-vs-state-promotions.mjs']],
  ['AI/FOUNDATION', 'Validate Texas AI intelligence foundation', 'node', ['scripts/data/validate-texas-defined-ai-readiness.mjs']],
  ['AI/RESEARCH', 'Validate Texas Defined AI official research', 'node', ['scripts/ai/validate-ai-official-research.mjs']],
  ['EVENT/SEO', 'Validate Event SEO', 'node', ['scripts/data/validate-events-seo.mjs']],
  ['EVENT/SCHEMA', 'Audit Event schema enrichment', 'node', ['scripts/data/audit-event-schema-enrichment.mjs']],
  ['EVENT/SCHEMA', 'Syntax-check production Event structured-data verifier', 'node', ['--check', 'scripts/ci/verify-event-structured-data-production.mjs']],
  ['IMAGE/PROVENANCE', 'Validate RV image provenance', 'node', ['scripts/data/validate-rv-image-provenance.mjs']],
  ['IMAGE/READINESS', 'Validate destination final image readiness', 'node', ['scripts/data/validate-destination-image-final-readiness.mjs']],
  ['ANALYTICS/GOVERNANCE', 'Validate shared React affiliate click telemetry', 'node', ['scripts/data/validate-shared-affiliate-tracker.mjs']],
  ['ANALYTICS/GOVERNANCE', 'Validate private partner referral reporting', 'node', ['scripts/data/validate-partner-referral-reporting.mjs']],
  ['ANALYTICS/GOVERNANCE', 'Validate unusual business experiment attribution', 'node', ['scripts/data/validate-unusual-business-analytics.mjs']],
  ['CODE/REGRESSION', 'Validate date formatting SSR regression', 'node', ['--experimental-strip-types', '--test', 'src/domain/utils/format.test.ts']],
  ['DATA/GEOGRAPHY', 'Validate canonical Texas geography taxonomy', 'node', ['--experimental-strip-types', '--test', 'src/data/__tests__/canonical-geography.test.ts']],
  ['DATA/GEOGRAPHY', 'Validate populated Texas geography knowledge graph', 'node', ['--experimental-strip-types', '--test', 'src/data/__tests__/geography-knowledge-graph.test.ts']],
  ['IMAGE/NETWORK', 'Validate remote image upstream request policy', 'node', ['--experimental-strip-types', '--test', 'src/lib/remote-image-fetch-policy.test.ts']],
  ['PROPERTY/DATA', 'Validate priority county property overlays', 'node', ['scripts/data/validate-priority-county-property-overlays.mjs']],
  ['SEO/INDEXING', 'Validate Phase 10 housing index-suppression contract', 'node', ['scripts/data/validate-phase10-housing-indexing.mjs']],
  ['CONTENT/AUTHORITY', 'Validate Texas industries authority', 'node', ['scripts/data/validate-texas-industries-authority.mjs']],
  ['CONTENT/AUTHORITY', 'Validate Texas beaches and coast authority', 'node', ['scripts/data/validate-coastal-authority.mjs']],
  ['AGGREGATE/SITE-QUALITY', 'Run recurring site quality contract', 'node', ['scripts/data/run-site-quality-watch.mjs']],
  ['AGGREGATE/FULL', 'Run authoritative validation suite', 'node', ['scripts/ci/run-validation-suite.mjs', 'full', '--collect-all']],
  ['CONTENT/AUTHORITY', 'Validate mountain biking authority', 'node', ['scripts/data/validate-mountain-biking-authority.mjs']],
  ['CONTENT/AUTHORITY', 'Validate horseback riding authority', 'node', ['scripts/data/validate-horseback-riding-authority.mjs']],
  ['CONTENT/AUTHORITY', 'Validate OHV authority', 'node', ['scripts/data/validate-ohv-authority.mjs']],
  ['CONTENT/AUTHORITY', 'Validate paddling authority', 'node', ['scripts/data/validate-paddling-authority.mjs']],
  ['CONTENT/AUTHORITY', 'Validate stargazing authority', 'node', ['scripts/data/validate-stargazing-authority.mjs']],
  ['CONTENT/AUTHORITY', 'Validate hunting authority', 'node', ['scripts/data/validate-hunting-authority.mjs']],
  ['CONTENT/AUTHORITY', 'Validate national cemetery authority cluster', 'node', ['scripts/data/validate-national-cemetery-authority.mjs']],
  ['CONTENT/DEPTH', 'Validate AdSense-facing finance content depth', 'node', ['scripts/data/validate-adsense-content-depth.mjs']],
  ['CONTENT/DEPTH', 'Validate Texas Talent content depth', 'node', ['scripts/data/validate-texas-talent-content-depth.mjs']],
  ['CONTENT/DEPTH', 'Validate Texas Talent launch-depth gate', 'node', ['scripts/data/validate-texas-talent-launch-depth-gate.mjs']],
  ['CONTENT/DEPTH', 'Validate Texas Talent flagship depth wave', 'node', ['scripts/data/validate-texas-talent-flagship-depth.mjs']],
  ['CONTENT/DEPTH', 'Validate Texas Talent flagship depth wave 2', 'node', ['scripts/data/validate-texas-talent-flagship-depth-wave2.mjs']],
  ['CONTENT/DEPTH', 'Validate Texas Talent flagship depth wave 3', 'node', ['scripts/data/validate-texas-talent-flagship-depth-wave3.mjs']],
  ['CONTENT/DEPTH', 'Validate Texas Talent flagship depth wave 4', 'node', ['scripts/data/validate-texas-talent-flagship-depth-wave4.mjs']],
  ['CONTENT/DEPTH', 'Validate Texas Talent flagship depth wave 5', 'node', ['scripts/data/validate-texas-talent-flagship-depth-wave5.mjs']],
  ['CONTENT/DEPTH', 'Validate Texas Talent flagship depth wave 6', 'node', ['scripts/data/validate-texas-talent-flagship-depth-wave6.mjs']],
  ['CONTENT/DEPTH', 'Validate Texas Talent flagship depth wave 7', 'node', ['scripts/data/validate-texas-talent-flagship-depth-wave7.mjs']],
  ['SEO/METADATA', 'Validate Texas Talent launch metadata', 'node', ['scripts/data/validate-texas-talent-launch-metadata.mjs']],
  ['INTERNAL-LINKING', 'Validate Texas Talent reverse-link audit', 'node', ['scripts/data/validate-texas-talent-reverse-links.mjs']],
  ['INTERNAL-LINKING', 'Validate Texas Talent related network', 'node', ['scripts/data/validate-texas-talent-related-network.mjs']],
  ['CONTENT/GOVERNANCE', 'Validate Texas Talent public-style preview', 'node', ['scripts/data/validate-texas-talent-public-preview.mjs']],
  ['CONTENT/GOVERNANCE', 'Validate Texas Talent canonical ownership', 'node', ['scripts/data/validate-texas-talent-ownership.mjs']],
  ['AGGREGATE/PREDEPLOY', 'Validate production predeploy gates', 'node', ['scripts/ci/run-validation-suite.mjs', 'predeploy', '--collect-all']],
];

appendSummary('## Canonical pre-merge validation\n\n');
appendSummary('This is the same deterministic contract used by the protected Merge Gate. All independent checks run even after a failure so one run exposes the full failure set.\n\n');

for (const [classification, label, command, args] of prebuildChecks) {
  runCheck({ classification, label, command, args }, true);
}

const buildPassed = runCheck({
  classification: 'BUILD/PRODUCTION',
  label: 'Build production application',
  command: 'npm',
  args: ['run', 'build'],
}, true);

runCheck({
  classification: 'BUILD/GENERATED',
  label: 'Validate generated route tree is committed',
  command: 'git',
  args: ['diff', '--exit-code', '--', 'src/routeTree.gen.ts'],
  dependsOnBuild: true,
}, buildPassed);

runCheck({
  classification: 'RUNTIME/SSR',
  label: 'Smoke-test built Worker SSR locally',
  command: 'node',
  args: ['scripts/ci/verify-built-worker-ssr.mjs'],
  dependsOnBuild: true,
}, buildPassed);

runCheck({
  classification: 'PERFORMANCE/BUDGET',
  label: 'Validate client performance budget',
  command: 'npm',
  args: ['run', 'performance:validate'],
  dependsOnBuild: true,
}, buildPassed);

appendSummary('| Result | Class | Check | Duration |\n|---|---|---|---:|\n');
for (const result of results) {
  const icon = result.status === 'PASS' ? '✅ pass' : result.status === 'FAIL' ? '❌ FAIL' : '⏭️ skipped';
  appendSummary(`| ${icon} | ${result.classification} | ${result.label} | ${result.durationSeconds}s |\n`);
}

if (failures.length > 0) {
  appendSummary(`\n### Pre-merge failures (${failures.length})\n`);
  for (const failure of failures) {
    appendSummary(`- \`${failure.classification}\` — ${failure.label}: \`${failure.command}\` (${failure.detail})\n`);
  }
  console.error(`Canonical pre-merge validation failed ${failures.length} top-level check(s).`);
  console.error('Fix the complete reported set, rerun this command, and do not declare the task complete until it passes on the reconciled branch head.');
  process.exit(1);
}

appendSummary(`\nAll ${results.length} canonical pre-merge checks passed.\n`);
console.log(`Canonical pre-merge validation passed (${results.length} checks).`);
