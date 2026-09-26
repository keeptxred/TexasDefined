import { appendFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const checks = [
  ['generated-page-quality', 'CODE/CONTENT', 'Validate generated page quality', 'node', ['scripts/data/validate-generated-page-quality.mjs']],
  ['runtime-data-constants', 'CODE/RUNTIME', 'Validate runtime data constants', 'node', ['scripts/data/validate-runtime-data-constants.mjs']],
  ['county-editorial-discovery', 'INTERNAL-LINKING', 'Validate county editorial discovery', 'node', ['scripts/data/validate-county-editorial-discovery.mjs']],
  ['county-property-enrichment', 'CODE/CONTENT', 'Validate county property enrichment', 'node', ['scripts/data/validate-county-property-enrichment.mjs']],
  ['destination-indexing-policy', 'SEO/INDEXING', 'Validate destination indexing policy', 'node', ['scripts/data/validate-destination-indexing-policy.mjs']],
  ['public-route-governance', 'ROUTING/GOVERNANCE', 'Validate public route governance', 'node', ['scripts/data/validate-public-route-governance.mjs']],
  ['texas-talent-launch-contract', 'CONTENT/GOVERNANCE', 'Validate hidden Texas Talent launch contract', 'node', ['scripts/data/validate-texas-talent.mjs']],
  ['texas-talent-launch-depth-gate', 'CONTENT/DEPTH', 'Validate Texas Talent launch-depth gate', 'node', ['scripts/data/validate-texas-talent-launch-depth-gate.mjs']],
  ['texas-talent-flagship-depth', 'CONTENT/DEPTH', 'Validate Texas Talent flagship depth wave', 'node', ['scripts/data/validate-texas-talent-flagship-depth.mjs']],
  ['texas-talent-flagship-depth-wave2', 'CONTENT/DEPTH', 'Validate Texas Talent flagship depth wave 2', 'node', ['scripts/data/validate-texas-talent-flagship-depth-wave2.mjs']],
  ['texas-talent-source-provenance', 'SOURCE/QUALITY', 'Validate Texas Talent source provenance', 'node', ['scripts/data/validate-texas-talent-source-provenance.mjs']],
  ['texas-talent-editorial-status', 'CONTENT/GOVERNANCE', 'Validate Texas Talent editorial status separation', 'node', ['scripts/data/validate-texas-talent-editorial-status.mjs']],
  ['texas-talent-content-depth', 'CONTENT/DEPTH', 'Validate Texas Talent content depth', 'node', ['scripts/data/validate-texas-talent-content-depth.mjs']],
  ['texas-talent-launch-metadata', 'SEO/METADATA', 'Validate Texas Talent launch metadata', 'node', ['scripts/data/validate-texas-talent-launch-metadata.mjs']],
  ['texas-talent-reverse-links', 'INTERNAL-LINKING', 'Validate Texas Talent reverse links', 'node', ['scripts/data/validate-texas-talent-reverse-links.mjs']],
  ['texas-talent-public-preview', 'CONTENT/GOVERNANCE', 'Validate Texas Talent public-style preview', 'node', ['scripts/data/validate-texas-talent-public-preview.mjs']],
  ['texas-talent-music-authority', 'INTERNAL-LINKING', 'Validate Texas Talent music authority links', 'node', ['scripts/data/validate-texas-talent-music-authority.mjs']],
  ['made-in-texas-evidence', 'SOURCE/QUALITY', 'Validate Made in Texas evidence', 'node', ['scripts/data/validate-made-in-texas-evidence.mjs']],
  ['painted-church-search-intents', 'SEO/AUTHORITY', 'Validate Painted Churches search-intent coverage', 'node', ['scripts/data/validate-painted-church-search-intents.mjs']],
  ['indexation-quality', 'SEO/INDEXING', 'Validate indexation quality', 'node', ['scripts/data/validate-indexation-quality.mjs']],
  ['crawl-demand', 'SEO/INDEXING', 'Validate crawl demand', 'node', ['scripts/data/validate-crawl-demand.mjs']],
  ['freshness-signals', 'SEO/QUALITY', 'Validate freshness signals', 'node', ['scripts/data/validate-freshness-signals.mjs']],
  ['machine-indexing', 'SEO/INDEXING', 'Validate machine indexing', 'node', ['scripts/data/validate-machine-indexing.mjs']],
  ['bing-configuration', 'SEO/INDEXING', 'Validate Bing configuration', 'node', ['scripts/seo/validate-bing.mjs']],
  ['aeo-answer-layers', 'SEO/AEO', 'Validate AEO answer layers', 'node', ['scripts/data/validate-aeo-answer-layers.mjs']],
  ['homepage-seo', 'SEO', 'Validate homepage SEO', 'node', ['scripts/data/validate-homepage-seo.mjs']],
  ['texas-explained-seo', 'SEO/AUTHORITY', 'Validate Texas Explained SEO', 'node', ['scripts/data/validate-texas-explained-seo.mjs']],
  ['texas-explained-depth', 'CONTENT/DEPTH', 'Validate Texas Explained depth', 'node', ['scripts/data/validate-texas-explained-depth.mjs']],
  ['texas-explained-rivers', 'CONTENT/AUTHORITY', 'Validate Texas Explained river profiles', 'node', ['scripts/data/validate-texas-explained-river-profiles.mjs']],
  ['texas-explained-reservoirs', 'CONTENT/AUTHORITY', 'Validate Texas Explained reservoir profiles', 'node', ['scripts/data/validate-texas-explained-reservoir-profiles.mjs']],
  ['texas-explained-roads', 'CONTENT/AUTHORITY', 'Validate Texas Explained road systems', 'node', ['scripts/data/validate-texas-explained-road-systems.mjs']],
  ['explore-category-seo', 'SEO/AUTHORITY', 'Validate Explore category SEO', 'node', ['scripts/data/validate-explore-category-seo.mjs']],
  ['explore-region-seo', 'SEO/AUTHORITY', 'Validate Explore region SEO', 'node', ['scripts/data/validate-explore-region-seo.mjs']],
  ['explore-topical-authority', 'CONTENT/AUTHORITY', 'Validate Explore topical authority', 'node', ['scripts/data/validate-explore-topical-authority.mjs']],
  ['camping-guide-decision-ux', 'CONTENT/AUTHORITY', 'Validate camping guide decision UX', 'node', ['scripts/data/validate-camping-guide-decision-ux.mjs']],
  ['camping-public-authority-wave6', 'CONTENT/AUTHORITY', 'Validate camping public authority Wave 6', 'node', ['scripts/data/validate-camping-public-authority-wave6.mjs']],
  ['camping-public-authority-wave7', 'CONTENT/AUTHORITY', 'Validate camping public authority Wave 7', 'node', ['scripts/data/validate-camping-public-authority-wave7.mjs']],
  ['camping-public-authority-wave8', 'CONTENT/AUTHORITY', 'Validate camping public authority Wave 8', 'node', ['scripts/data/validate-camping-public-authority-wave8.mjs']],
  ['historic-sites', 'CONTENT/AUTHORITY', 'Validate statewide historic sites', 'node', ['scripts/data/validate-historic-sites.mjs']],
  ['historic-site-evergreen', 'CONTENT/AUTHORITY', 'Validate historic-site evergreen guides', 'node', ['scripts/data/validate-historic-site-evergreen.mjs']],
  ['historic-supporting-guides', 'CONTENT/AUTHORITY', 'Validate historic supporting guides', 'node', ['scripts/data/validate-historic-supporting-guides.mjs']],
  ['texas-before-us-history', 'CONTENT/AUTHORITY', 'Validate Texas before U.S. history authority', 'node', ['scripts/data/validate-texas-before-us-history.mjs']],
  ['military-history-expansion', 'CONTENT/AUTHORITY', 'Validate military history expansion', 'node', ['scripts/data/validate-military-history-expansion.mjs']],
  ['things-unique-to-texas', 'CONTENT/AUTHORITY', 'Validate Things That Define Texas authority', 'node', ['scripts/data/validate-things-unique-to-texas.mjs']],
  ['texas-icon-link-depth', 'INTERNAL-LINKING', 'Validate Things That Define Texas deep-link coverage', 'node', ['scripts/data/validate-texas-icon-link-depth.mjs']],
  ['texas-food-history', 'CONTENT/AUTHORITY', 'Validate Texas food history authority', 'node', ['scripts/data/validate-texas-food-history.mjs']],
  ['texas-culture-citation-index', 'SOURCE/QUALITY', 'Validate Texas culture citation index and human guidance', 'node', ['scripts/data/validate-texas-culture-citation-index.mjs']],
  ['texas-weather-authority', 'CONTENT/AUTHORITY', 'Validate Texas weather authority', 'node', ['scripts/data/validate-texas-weather-authority.mjs']],
  ['relocation-insurance-authority', 'CONTENT/AUTHORITY', 'Validate TDI relocation insurance authority', 'node', ['scripts/data/validate-relocation-insurance-authority.mjs']],
  ['relocation-city-comparison', 'CONTENT/AUTHORITY', 'Validate Texas city relocation comparison authority', 'node', ['scripts/data/validate-relocation-city-comparison.mjs']],
  ['relocation-freshness', 'DATA/FRESHNESS', 'Validate relocation source freshness and Census vintage', 'node', ['scripts/data/validate-relocation-freshness.mjs']],
  ['top-attraction-authority', 'CONTENT/AUTHORITY', 'Validate Top 25 attraction authority', 'node', ['scripts/data/validate-top-attraction-authority.mjs']],
  ['top-attraction-review-freshness', 'CONTENT/FRESHNESS', 'Validate Top 25 review freshness', 'node', ['scripts/data/validate-top-attraction-review-freshness.mjs']],
  ['article-discover-seo', 'SEO/DISCOVERY', 'Validate article discovery SEO', 'node', ['scripts/data/validate-article-discover-seo.mjs']],
  ['author-eeat', 'SEO/EEAT', 'Validate author EEAT', 'node', ['scripts/data/validate-author-eeat.mjs']],
  ['entity-template-quality', 'CONTENT/QUALITY', 'Validate entity template quality', 'node', ['scripts/data/validate-entity-template-quality.mjs']],
  ['image-seo', 'IMAGE/SEO', 'Validate image SEO', 'node', ['scripts/data/validate-image-seo.mjs']],
  ['shared-editorial-image-fallbacks', 'IMAGE/RESILIENCE', 'Validate shared editorial image failure handling', 'node', ['scripts/data/validate-shared-editorial-image-fallbacks.mjs']],
  ['editorial-image-duplicates', 'IMAGE/QUALITY', 'Validate editorial hero uniqueness site-wide', 'node', ['scripts/data/validate-editorial-image-duplicates.mjs', '--all']],
  ['search-rendering-performance', 'PERFORMANCE', 'Validate search rendering performance', 'node', ['scripts/data/validate-search-rendering-performance.mjs']],
  ['content-duplication', 'CONTENT/QUALITY', 'Validate content duplication', 'node', ['scripts/data/validate-content-duplication.mjs']],
  ['sitemap-routes', 'SEO/ROUTING', 'Validate sitemap routes', 'node', ['scripts/data/validate-sitemap-routes.mjs']],
  ['internal-link-discovery', 'INTERNAL-LINKING', 'Validate internal-link discovery', 'node', ['scripts/data/validate-internal-link-discovery.mjs']],
  ['search-intent-ctr', 'SEO/CTR', 'Validate search-intent CTR', 'node', ['scripts/data/validate-search-intent-ctr.mjs']],
  ['phase7-technical-seo', 'SEO/TECHNICAL', 'Validate Phase 7 technical SEO batch', 'node', ['scripts/data/validate-phase7-technical-seo.mjs']],
  ['citation-magnets', 'SEO/CITATIONS', 'Validate citation magnets', 'node', ['scripts/data/validate-citation-magnets.mjs']],
  ['fishing-authority', 'SEO/AUTHORITY', 'Validate fishing citation and retrieval authority', 'node', ['scripts/data/validate-fishing-authority.mjs']],
  ['citation-downloads', 'SEO/CITATIONS', 'Validate citation downloads', 'node', ['scripts/data/validate-citation-downloads.mjs']],
  ['citypass-affiliate', 'MONETIZATION/AFFILIATE', 'Validate Texas CityPASS affiliate coverage', 'node', ['scripts/data/validate-citypass-affiliate.mjs']],
  ['seo-ci-contract', 'CI/CONTRACT', 'Validate SEO CI contract', 'node', ['scripts/data/validate-seo-ci-contract.mjs']],
  ['data-validate', 'DATA/QUALITY', 'Validate production data and migrated features', 'npm', ['run', 'data:validate']],
  ['trip-planner-destinations', 'DATA/COVERAGE', 'Validate complete Trip Planner mapped coverage', 'node', ['scripts/data/audit-trip-planner-destinations.mjs', '--strict']],
  ['entity-maintenance', 'DATA/QUALITY', 'Validate Phase 3 entity maintenance', 'node', ['scripts/data/validate-entity-maintenance.mjs']],
  ['sports-venue-coverage', 'SPORTS/AUTHORITY', 'Validate sports venue coverage', 'node', ['scripts/data/validate-sports-venue-coverage.mjs']],
  ['sports-venue-completeness', 'SPORTS/AUTHORITY', 'Validate sports venue deep completeness', 'node', ['scripts/data/validate-sports-venue-deep-completeness.mjs']],
  ['sports-venue-images', 'SPORTS/IMAGES', 'Validate sports venue images', 'node', ['scripts/data/validate-sports-venue-images.mjs']],
  ['sports-venue-wave7-workflow', 'SPORTS/AUTOMATION', 'Validate sports venue Wave 7 workflow wiring', 'node', ['scripts/ci/validate-sports-venue-wave7-workflow.mjs']],
  ['sports-traffic-readiness', 'SPORTS/TRAFFIC', 'Validate sports traffic readiness', 'node', ['scripts/data/validate-sports-traffic-readiness.mjs']],
  ['event-sports-venue-links', 'SPORTS/LINKING', 'Validate event sports venue links', 'node', ['scripts/data/validate-event-sports-venue-links.mjs']],
  ['sports-editorial-authority', 'SPORTS/AUTHORITY', 'Validate sports editorial authority', 'node', ['scripts/data/validate-sports-editorial-authority.mjs']],
  ['sports-venue-landings', 'SPORTS/SEO', 'Validate sports venue landings', 'node', ['scripts/data/validate-sports-venue-landings.mjs']],
  ['sports-venue-comparison', 'SPORTS/AUTHORITY', 'Validate sports venue comparison', 'node', ['scripts/data/validate-sports-venue-comparison.mjs']],
  ['sports-partner-operations', 'SPORTS/OPERATIONS', 'Validate sports partner operations', 'node', ['scripts/data/validate-sports-partner-operations.mjs']],
  ['sports-sponsorship', 'SPORTS/OPERATIONS', 'Validate sports sponsorship', 'node', ['scripts/data/validate-sports-sponsorship.mjs']],
  ['shared-platform-core', 'PLATFORM/INTEGRATION', 'Validate shared platform core integration', 'node', ['scripts/data/validate-shared-platform-core.mjs']],
  ['texas-flag-authority', 'CONTENT/AUTHORITY', 'Validate Texas flag authority', 'node', ['scripts/data/validate-texas-flag-authority.mjs']],
  ['painted-churches-seo', 'SEO/AUTHORITY', 'Validate Painted Churches SEO', 'node', ['scripts/data/validate-painted-churches-seo.mjs']],
  ['painted-church-map', 'CONTENT/MAP', 'Validate Painted Churches map', 'node', ['scripts/data/validate-painted-church-map.mjs']],
  ['painted-church-completion', 'CONTENT/AUTHORITY', 'Validate Painted Churches completion', 'node', ['scripts/data/validate-painted-church-completion.mjs']],
];

const predeployIds = new Set([
  'runtime-data-constants',
  'county-editorial-discovery',
  'machine-indexing', 'things-unique-to-texas', 'texas-icon-link-depth', 'texas-weather-authority',
  'texas-food-history', 'texas-culture-citation-index', 'texas-flag-authority', 'painted-churches-seo',
  'painted-church-search-intents', 'painted-church-map', 'painted-church-completion', 'military-history-expansion',
  'texas-talent-launch-contract', 'texas-talent-launch-depth-gate', 'texas-talent-flagship-depth',
  'texas-talent-flagship-depth-wave2', 'texas-talent-source-provenance', 'texas-talent-editorial-status',
  'texas-talent-content-depth', 'texas-talent-launch-metadata', 'texas-talent-reverse-links',
  'texas-talent-public-preview', 'texas-talent-music-authority',
  'relocation-insurance-authority', 'relocation-city-comparison', 'relocation-freshness',
  'fishing-authority', 'citypass-affiliate',
]);

const fullExcludedIds = new Set(['texas-flag-authority', 'painted-churches-seo', 'painted-church-map', 'painted-church-completion']);
const args = process.argv.slice(2);
const suiteName = args.find((arg) => !arg.startsWith('--')) ?? 'full';
const collectAll = args.includes('--collect-all');
const selected = suiteName === 'predeploy'
  ? checks.filter(([id]) => predeployIds.has(id))
  : suiteName === 'full'
    ? checks.filter(([id]) => !fullExcludedIds.has(id))
    : null;

if (!selected) {
  console.error(`Unknown validation suite: ${suiteName}`);
  process.exit(2);
}

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
function appendSummary(text) {
  if (summaryPath) appendFileSync(summaryPath, text);
}

appendSummary(`## Validation suite: ${suiteName}\n\n`);
appendSummary('| Result | Class | Check | Duration |\n|---|---|---|---:|\n');

const failures = [];
for (const [, classification, label, command, commandArgs] of selected) {
  const started = Date.now();
  console.log(`::group::[${classification}] ${label}`);
  console.log(`$ ${command} ${commandArgs.join(' ')}`);
  const result = spawnSync(command, commandArgs, { cwd: process.cwd(), env: process.env, stdio: 'inherit', shell: false });
  console.log('::endgroup::');

  const durationSeconds = ((Date.now() - started) / 1000).toFixed(1);
  const ok = !result.error && result.status === 0;
  appendSummary(`| ${ok ? '✅ pass' : '❌ FAIL'} | ${classification} | ${label} | ${durationSeconds}s |\n`);

  if (!ok) {
    const detail = result.error ? result.error.message : `exit code ${result.status ?? 'unknown'}`;
    const failure = { classification, label, command: `${command} ${commandArgs.join(' ')}`, detail };
    failures.push(failure);
    console.error(`::error title=${classification} failure::${label} failed (${detail}). Command: ${failure.command}`);
    appendSummary(`\n**Failure class:** \`${classification}\`  \n**Failed check:** ${label}  \n**Command:** \`${failure.command}\`  \n**Result:** ${detail}\n`);
    if (!collectAll) process.exit(1);
  }
}

if (failures.length > 0) {
  appendSummary(`\n### Validation failures (${failures.length})\n`);
  for (const failure of failures) {
    appendSummary(`- \`${failure.classification}\` — ${failure.label}: \`${failure.command}\` (${failure.detail})\n`);
  }
  console.error(`Validation suite '${suiteName}' failed ${failures.length} check(s).`);
  process.exit(1);
}

appendSummary(`\nAll ${selected.length} checks passed.\n`);
console.log(`Validation suite '${suiteName}' passed (${selected.length} checks).`);
