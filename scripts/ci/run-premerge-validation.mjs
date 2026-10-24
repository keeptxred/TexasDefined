import { appendFileSync, writeFileSync } from 'node:fs';
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
  ['CONTENT/GOVERNANCE', 'Reject internal workflow language from public narratives', 'node', ['scripts/data/validate-reader-facing-copy.mjs']],
  ['SPORTS/TRAVEL', 'Verify pro-team home-game filtering, major updates and distinct weekend guides', 'node', ['--experimental-strip-types', '--test', 'src/data/pro-teams.test.mjs']],
  ['DATA/BLS', 'Validate fail-closed scheduled BLS table parser and release freshness rules', 'node', ['--test', 'scripts/data/refresh-texas-metro-payrolls.test.mjs']],
  ['CONTENT/VISITOR-FACTS', 'Scan curated visitor answers for malformed provenance, duplicate labels and expiration', 'node', ['scripts/data/validate-destination-visitor-fact-catalog.mjs']],
  ['CONTENT/VISITOR-FACTS', 'Verify source-dated practical visitor facts, conditional rendering and stale-claim suppression', 'node', ['--experimental-strip-types', '--test', 'src/data/destination-visitor-facts.test.ts']],
  ['HISTORY/CAMINO-REAL', 'Verify factual accuracy, primary sources, indexability and SSR map for El Camino Real', 'node', ['--test', 'scripts/ci/camino-real-factcheck.test.mjs']],
  ['WATERPARK/AUTHORITY', 'Validate source-linked Texas water parks and statewide routing coverage', 'node', ['scripts/data/validate-water-parks-authority.mjs']],
  ['FOOTBALL/BROWSER', 'Syntax-check playoff mobile production acceptance', 'node', ['--check', 'scripts/ci/verify-football-playoffs-browser.mjs']],
  ['CONTENT/IMAGES', 'Syntax-check official state-park photo resolver', 'node', ['--check', 'scripts/data/sync-state-park-hero-assets.mjs']],
  ['COMMERCE/PRIVACY', 'Verify receipt Google Customer Reviews payload boundaries', 'node', ['--experimental-strip-types', '--test', 'scripts/data/google-customer-reviews.test.mjs']],
  ['FOOTBALL/SEO', 'Reject slug-specific football SEO title overrides of researched editorial copy', 'node', ['scripts/ci/validate-football-authored-seo.mjs']],
  ['FOOTBALL/REVENUE', 'Verify sourced game-night action layer, sponsor hold and approved fan affiliate', 'node', ['--test', 'scripts/data/validate-football-game-night.test.mjs', 'scripts/data/validate-football-fan-affiliate.test.mjs']],
  ['CONTENT/AUTHORITY', 'Verify source-backed Harmony Eagles Batch006 and historic Batch005 evidence', 'node', ['scripts/data/validate-football-batch006-harmony.mjs']],
  ['CI/DEPLOYMENT', 'Syntax-check Harmony desktop/mobile production verifier', 'node', ['--check', 'scripts/ci/verify-football-batch006-harmony-production.mjs']],
  ['NEWS/PUBLICATION', 'Reject stale sources in disabled-by-default TexasDefined auto-news pipeline', 'node', ['--test', 'scripts/news/texasdefined-queue-freshness.test.mjs']],
  ['CI/COST', 'Verify update scan scope, retired triggers and shared page fetches', 'node', ['--test', 'scripts/ci/update-scan-policy.test.mjs']],
  ['CI/COST', 'Scope Batch004 live GIS/Chrome audit to true Batch004 changes; fail closed', 'node', ['scripts/ci/should-run-football-b004.test.mjs']],
  ['CI/COST', 'Protect all six remaining local audit migrations and authority reporting', 'node', ['--test', 'scripts/ci/local-audit-migrations.test.mjs', 'scripts/ci/authority-master-issue.test.mjs']],
  ['CI/COST', 'Protect local-only full-site crawls and request budgets', 'node', ['--test', 'scripts/ci/local-audit-fetch.test.mjs']],
  ['SEO/LINKS', 'Distinguish HTTP errors from failed transport without relaxing strict link audit', 'node', ['--test', 'scripts/ci/internal-link-failure-diagnostics.test.mjs']],
  ['SEO/LINKS', 'Ensure every Texas-vs-state comparison receives regional peer links', 'node', ['--experimental-strip-types', '--test', 'scripts/data/texas-vs-related-states.test.mjs']],
  ['COMMERCE/CHECKOUT', 'Verify Texas Defined shipping terms and safe handoff correlation', 'node', ['--experimental-strip-types', '--test', 'scripts/data/validate-shop-checkout-shipping.test.mjs']],
  ['DEPLOY/RECOVERY', 'Test Cloudflare Git-build API transient retries and fail-closed behavior', 'node', ['--test', 'scripts/ci/wait-for-cloudflare-git-build.test.mjs']],
  ['COMMERCE/SEO', 'Verify accurate Merchant delivery and variant photo signals', 'node', ['--experimental-strip-types', '--test', 'scripts/data/merchant-quality-signals.test.mjs']],
  ['SEO/CTR', 'Protect readable truncated meta descriptions', 'node', ['--experimental-strip-types','--test','src/lib/seo-snippet-trim.test.ts']],
  ['SEO/CTR', 'Detect stale edition claims in finished major-event snippets', 'node', ['--test', 'scripts/ci/expired-event-snippet.test.mjs']],
  ['SEO/CTR', 'Guard expiration of year-specific event search snippets', 'node', ['--experimental-strip-types', '--test', 'src/data/event-snippet-lifecycle.test.ts']],
  ['SEO/SITEMAP', 'Reject escaped and literal route-template tokens in crawlable paths', 'node', ['--experimental-strip-types', '--test', 'src/lib/public-route-tokens.test.ts']],
  ['CONTENT/AUTHORITY', 'Validate true historic photo subjects and closed-original visit policies', 'node', ['scripts/data/validate-historic-sites.mjs']],
  ['SEO/SITEMAP', 'Syntax-check historic photo production verifier', 'node', ['--check', 'scripts/ci/verify-historic-photo-indexability-production.mjs']],
  ['FOOTBALL/AUTHORITY', 'Syntax-check Batch 005 live browser verifier', 'node', ['--check', 'scripts/ci/verify-football-batch-005-production.mjs']],
  ['RUNTIME/RECOVERY', 'Ensure one-shot stale lazy-module recovery before hydration', 'node', ['--experimental-strip-types', '--test', 'scripts/ci/stale-chunk-recovery.test.mjs']],
  ['SEO/SITEMAP', 'Ensure swimming authority uses bundled server content and all canonical sitemap rules', 'node', ['scripts/data/validate-swimming-authority-ssr.mjs']],
  ['CONTENT/AUTHORITY', 'Prevent duplicate THC landmark images and lost indexable Holland Hotel page', 'node', ['scripts/data/validate-thc-landmark-authority-batch05.mjs']],
  ['SEO/SITEMAP', 'Syntax-check THC landmark production sitemap verifier', 'node', ['--check', 'scripts/ci/verify-thc-landmark-sitemap-production.mjs']],
  ['MUSEUM/AUTHORITY', 'Validate museum visitor research, references, new museum requirements and reciprocal links', 'node', ['scripts/data/validate-museum-authority.mjs']],
  ['SOFTBALL/PUBLISH', 'Reject thin or unapproved UIL softball team pages', 'npm', ['run', 'softball:authority:validate']],
  ['NETWORK/TERMS', 'Validate customer terms, content responsibility and recurring billing acceptance', 'node', ['scripts/data/validate-network-customer-terms.mjs']],
  ['NETWORK/RELEASE', 'Validate Network security and unpublished release guards', 'node', ['scripts/data/validate-network-release-guards.mjs']],
  ['NETWORK/MIGRATIONS', 'Validate applied Supabase Network migration history', 'node', ['scripts/data/validate-network-migration-parity.mjs']],
  ['NETWORK/ADMIN', 'Verify dedicated Network administrator key', 'node', ['--experimental-strip-types', '--test', 'scripts/data/network-admin-access.test.mjs']],
  ['NETWORK/EMAIL', 'Verify disabled Office 365 email templates', 'node', ['--experimental-strip-types', '--test', 'scripts/data/network-notification-templates.test.mjs']],
  ['NETWORK/EMAIL', 'Verify Graph claim preflight, uncertain sends and no automatic redelivery', 'node', ['--experimental-strip-types', '--test', 'scripts/data/network-notification-claim-plan.test.mjs']],
  ['NETWORK/EMAIL', 'Verify bounded default-off Graph dispatch worker and manual recovery decisions', 'node', ['--experimental-strip-types', '--test', 'scripts/data/network-notification-dispatch-worker.test.mjs']],
  ['NETWORK/EMAIL', 'Verify hard-disabled mailbox-scoped Graph HTTP transport and envelope safety', 'node', ['--experimental-strip-types', '--test', 'scripts/data/network-notification-graph-transport.test.mjs']],
  ['NETWORK/HOSTED-STAGING', 'Verify hosted staging read-only check refuses production and proves two-owner isolation', 'node', ['--test', 'scripts/data/network-hosted-stage-readonly.test.mjs']],
  ['NETWORK/OPERATIONS', 'Verify Network health inventory only executes aggregate SELECT statements', 'node', ['--test', 'scripts/data/network-operations-readonly.test.mjs']],
  ['NETWORK/PUBLIC-INDEX', 'Verify only editorially published profiles are searchable after directory launch', 'node', ['--test', 'scripts/data/network-public-indexing.test.mjs']],
  ['NETWORK/INTAKE', 'Test hard actual-byte cap for streamed application uploads', 'node', ['--experimental-strip-types', '--test', 'scripts/data/network-intake-limits.test.mjs']],
  ['NETWORK/INTAKE', 'Verify interrupted media cleanup preserves uncertain application evidence and prevents orphaned private media', 'node', ['--experimental-strip-types', '--test', 'scripts/data/network-intake-cleanup.test.mjs']],
  ['NETWORK/MEDIA', 'Test immutable approved public-image copies and safe same-byte replay', 'node', ['--experimental-strip-types', '--test', 'scripts/data/network-published-media.test.mjs']],
  ['NETWORK/MEDIA', 'Reject foreign, malicious and unbounded draft image references before signing', 'node', ['--experimental-strip-types', '--test', 'scripts/data/network-revision-media.test.mjs']],
  ['NETWORK/MEDIA', 'Verify draft DELETE no-op, cleanup postconditions and owner identity state hygiene', 'node', ['--experimental-strip-types', '--test', 'scripts/data/network-owner-draft-cleanup.test.mjs']],
  ['BILLING/SHARED', 'Validate unified TexasDefined customer and invoice architecture', 'node', ['scripts/data/validate-shared-billing.mjs']],
  ['NETWORK/BILLING', 'Verify case-insensitive but exact confirmed owner billing email and bindings', 'node', ['--experimental-strip-types', '--test', 'scripts/data/network-owner-email.test.mjs']],
  ['NETWORK/BILLING', 'Verify small actual-byte bound on Checkout and billing JSON', 'node', ['--experimental-strip-types', '--test', 'scripts/data/network-billing-json.test.mjs']],
  ['NETWORK/BILLING', 'Test Stripe webhook authentication and checkout launch gate', 'node', ['--experimental-strip-types', '--test', 'scripts/data/network-stripe-security.test.mjs']],
  ['NETWORK/BILLING', 'Reject foreign subscription rebinding and revoke only previously bound Plus price changes', 'node', ['--experimental-strip-types', '--test', 'scripts/data/network-stripe-entitlement-boundary.test.mjs']],
  ['NETWORK/BILLING', 'Require Stripe billing portal session to match owning customer, runtime mode and return host', 'node', ['--experimental-strip-types', '--test', 'scripts/data/network-stripe-portal-binding.test.mjs']],
  ['NETWORK/BILLING', 'Verify Stripe staging mode is isolated from live credentials, prices and website origin', 'node', ['--experimental-strip-types', '--test', 'scripts/data/network-stripe-isolated-mode.test.mjs']],
  ['CALCULATOR/PLATFORM', 'Validate calculator math and shared architecture', 'node', ['--experimental-strip-types', 'scripts/data/validate-calculator-platform.ts']],
  ['EVENT/CORPORATE', 'Validate corporate-event source directory, category guides, and SEO breadcrumbs', 'node', ['--experimental-strip-types', 'scripts/data/validate-corporate-events.mjs']],
  ['EVENT/CORPORATE/DEPLOY', 'Verify changed corporate marketplace production selection and GET-only SSR acceptance', 'node', ['scripts/ci/validate-corporate-event-production-smoke.mjs']],
  ['EVENT/CORPORATE/GEO', 'Protect source-verified and privacy-safe ZIP-radius prerequisites', 'node', ['--experimental-strip-types', 'scripts/data/validate-corporate-event-verified-proximity.mjs']],
  ['EVENT/CORPORATE/GEO-RESEARCH', 'Quarantine Census address-range interpolations pending actual venue premises verification', 'node', ['scripts/data/research-corporate-event-geocodes.test.mjs']],
  ['EVENT/CORPORATE/INTEGRATIONS', 'Enforce fail-closed quote/booking/payment adapter readiness', 'node', ['--experimental-strip-types', 'scripts/data/validate-corporate-event-integrations.mjs']],
  ['EVENT/CORPORATE/BROWSER', 'Enforce GET-only real Chrome mobile/tablet/desktop acceptance contract', 'node', ['scripts/ci/validate-corporate-event-responsive-production.mjs']],
  ['EVENT/CORPORATE/CONSENT', 'Require irreversible verified organizer consent withdrawal', 'node', ['scripts/data/validate-corporate-event-consent-withdrawal.mjs']],
  ['EVENT/CORPORATE/SOURCES', 'Maintain dated official-source re-review for all independent venues', 'node', ['scripts/data/validate-corporate-event-source-review.mjs']],
  ['EVENT/CORPORATE/RECEIPTS', 'Prevent duplicate real provider settlement and booking evidence records', 'node', ['scripts/data/validate-corporate-event-evidence-dedup.mjs']],
  ['EVENT/CORPORATE/OUTCOMES', 'Protect evidence-only quote, booking, dispute, and revenue ledger', 'node', ['scripts/data/validate-corporate-event-outcomes.mjs']],
  ['EVENT/CORPORATE/AGREEMENTS', 'Require verified signed partner agreements for offers and private quote drafts', 'node', ['scripts/data/validate-corporate-event-partner-agreements.mjs']],
  ['EVENT/CORPORATE/SECURITY', 'Enforce atomic private planner and partner intake limits', 'node', ['scripts/data/validate-corporate-event-atomic-intake.mjs']],
  ['EVENT/CORPORATE/RESPONSE', 'Require real independently documented planner first-contact evidence before SLA changes', 'node', ['--experimental-strip-types', 'scripts/data/validate-corporate-event-response-sla.mjs']],
  ['EVENT/CORPORATE/PARTNER-OUTREACH', 'Require genuine private evidence for venue business outreach and follow-ups', 'node', ['scripts/data/validate-corporate-event-partner-outreach.mjs']],
  ['EVENT/CHRISTMAS', 'Validate source-qualified Christmas community calendar and affiliate disclosures', 'node', ['scripts/data/validate-christmas-community-2026.mjs']],
  ['EVENT/TICKETMASTER', 'Validate Ticketmaster ingestion and tracking', 'node', ['--test', 'scripts/events/ticketmaster-discovery.test.mjs']],
  ['EVENT/TICKETMASTER', 'Validate authority candidate queue and publishing safeguards', 'node', ['--test', 'scripts/events/build-ticketmaster-authority-candidates.test.mjs']],
  ['EVENT/TICKETMASTER', 'Validate Ticketmaster calendar integration', 'node', ['scripts/data/validate-ticketmaster-integration.mjs']],
  ['EVENT/TICKETING', 'Validate shared ticket architecture', 'node', ['scripts/data/validate-event-ticketing-architecture.mjs']],
  ['EVENT/TICKETING', 'Validate canonical official ticket fallback', 'node', ['scripts/data/validate-event-ticket-positive-path.mjs']],
  ['CI/GOVERNANCE', 'Validate retired integration traces', 'node', ['scripts/ci/validate-retired-integration-traces.mjs']],
  ['CI/GOVERNANCE', 'Validate direct-main writer inventory', 'node', ['scripts/ci/validate-direct-main-writer-inventory.mjs']],
  ['CI/GOVERNANCE', 'Validate consolidated county certifiers', 'node', ['scripts/ci/validate-county-certifier-consolidation.mjs']],
  ['CI/GOVERNANCE', 'Validate automation main-write policy', 'node', ['scripts/ci/validate-automation-main-write-policy.mjs']],
  ['CI/GOVERNANCE', 'Validate retired one-time certifications', 'node', ['scripts/ci/validate-retired-one-time-certifications.mjs']],
  ['CI/DEPLOYMENT', 'Validate provenance-scoped Discover build cache', 'node', ['scripts/data/validate-discover-build-cache.mjs']],
  ['CI/DEPLOYMENT', 'Validate production rollback safety', 'node', ['scripts/data/validate-production-deployment-safety.mjs']],
  ['CI/DEPLOYMENT', 'Validate live verification contract', 'node', ['scripts/ci/validate-live-verification-contract.mjs']],
  ['CI/DEPLOYMENT', 'Validate post-deploy verifier safety', 'node', ['scripts/ci/validate-post-deploy-verifier-safety.mjs']],
  ['CI/DEPLOYMENT', 'Validate browser and destination post-deploy ordering', 'node', ['scripts/ci/validate-production-browser-deploy-order.mjs']],
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
  ['IMAGE/PROVENANCE', 'Reject false photo credits on known AI-generated editorial heroes', 'node', ['scripts/data/validate-ai-editorial-image-provenance.mjs']],
  ['IMAGE/READINESS', 'Validate destination final image readiness', 'node', ['scripts/data/validate-destination-image-final-readiness.mjs']],
  ['ANALYTICS/GOVERNANCE', 'Validate shared React affiliate click telemetry', 'node', ['scripts/data/validate-shared-affiliate-tracker.mjs']],
  ['ANALYTICS/GOVERNANCE', 'Validate private partner referral reporting', 'node', ['scripts/data/validate-partner-referral-reporting.mjs']],
  ['ANALYTICS/GOVERNANCE', 'Validate unusual business experiment attribution', 'node', ['scripts/data/validate-unusual-business-analytics.mjs']],
  ['DATA/SUPABASE', 'Validate remote JSON row cache behavior', 'node', ['--experimental-strip-types', 'scripts/data/validate-remote-read-cache.mjs']],
  ['CODE/REGRESSION', 'Validate date formatting SSR regression', 'node', ['--experimental-strip-types', '--test', 'src/domain/utils/format.test.ts']],
  ['DATA/GEOGRAPHY', 'Validate canonical Texas geography taxonomy', 'node', ['--experimental-strip-types', '--test', 'src/data/__tests__/canonical-geography.test.ts']],
  ['DATA/GEOGRAPHY', 'Validate populated Texas geography knowledge graph', 'node', ['--experimental-strip-types', '--test', 'src/data/__tests__/geography-knowledge-graph.test.ts']],
  ['IMAGE/NETWORK', 'Validate remote image upstream request policy', 'node', ['--experimental-strip-types', '--test', 'src/lib/remote-image-fetch-policy.test.ts']],
  ['IMAGE/DISCOVER', 'Verify governed Discover delivery regression tests', 'node', ['--test', 'scripts/ci/discover-production-asset-check.test.mjs']],
  ['PROPERTY/DATA', 'Validate priority county property overlays', 'node', ['scripts/data/validate-priority-county-property-overlays.mjs']],
  ['SEO/INDEXING', 'Validate Phase 10 housing index-suppression contract', 'node', ['scripts/data/validate-phase10-housing-indexing.mjs']],
  ['SEO/CTR', 'Test evidence-based production snippet classification', 'node', ['--test', 'scripts/ci/snippet-classification.test.mjs']],
  ['DATA/CITATION', 'Validate downloadable source-backed generic Texas Data briefs', 'node', ['--experimental-strip-types', '--test', 'src/data/texas-data-download.test.ts']],
  ['EDITORIAL/REGIONS', 'Keep Texas regions guide practical without internal publishing terminology', 'node', ['--test', 'scripts/data/texas-regions-reader-copy.test.mjs']],
  ['RELOCATION/GOVERNANCE', 'Validate Texas relocation operating system', 'node', ['scripts/data/validate-relocation-tools.mjs']],
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

writeFileSync('premerge-validation-report.json', JSON.stringify({
  generatedAt: new Date().toISOString(),
  passed: failures.length === 0,
  summary: { total: results.length, passed: results.filter((result) => result.status === 'PASS').length, failed: failures.length, skipped: results.filter((result) => result.status === 'SKIP').length },
  failures,
  results,
}, null, 2));

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
