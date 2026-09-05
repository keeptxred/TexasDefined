import fs from 'node:fs';

const POLICY_PATH = 'ops/seo/content-quality-governance.json';
const GSC_PATH = 'ops/seo/gsc-discovered-2026-09-05.json';
const GSC_URL_INVENTORY_PATH = 'ops/seo/gsc-discovered-2026-09-05-urls.tsv';
const PUBLIC_ROUTES_PATH = 'src/lib/public-routes.ts';
const TEXAS_VS_WAVE_PATH = 'ops/seo/gsc-remediation-wave4-2026-09-05.json';
const TEXAS_VS_PROMOTION_WAVE_PATH = 'ops/seo/gsc-remediation-wave6-2026-09-05.json';
const TEXAS_VS_READINESS_PATH = 'src/data/texas-vs-state-index-readiness.server.ts';
const TEXAS_VS_EVIDENCE_PATH = 'src/data/texas-vs-state-evidence.server.ts';
const COUNTY_PROMOTION_WAVE_PATH = 'ops/seo/gsc-remediation-wave5-2026-09-05.json';

const failures = [];
const fail = (message) => failures.push(message);
const readJson = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
const read = (path) => fs.readFileSync(path, 'utf8');

for (const path of [POLICY_PATH, GSC_PATH, GSC_URL_INVENTORY_PATH, PUBLIC_ROUTES_PATH]) {
  if (!fs.existsSync(path)) fail(`Permanent SEO quality governance file is missing: ${path}`);
}

if (!failures.length) {
  const policy = readJson(POLICY_PATH);
  const gsc = readJson(GSC_PATH);
  const publicRoutes = read(PUBLIC_ROUTES_PATH);

  const allowedActions = new Set(['KEEP', 'IMPROVE', 'NOINDEX', 'REMOVE_CONSOLIDATE']);

  for (const action of allowedActions) {
    if (!Object.prototype.hasOwnProperty.call(policy.actions ?? {}, action)) {
      fail(`Content-quality policy is missing required action ${action}.`);
    }
  }

  if ((policy.auditCadenceDays ?? 999) > 30) {
    fail('Permanent content-quality audit cadence may not exceed 30 days.');
  }
  if ((policy?.gscRemediation?.maxUnreviewedAgeDays ?? 999) > 30) {
    fail('GSC remediation backlog may not remain unreviewed for more than 30 days.');
  }
  if (policy?.newUrlReleaseGate?.defaultBeforeQualification !== 'NOINDEX') {
    fail('New generated/entity URLs must default to NOINDEX until the family quality gate qualifies them.');
  }
  if (policy?.newUrlReleaseGate?.remediationState !== 'IMPROVE') {
    fail('Worthwhile topics that fail quality qualification must flow to IMPROVE, not disappear.');
  }

  const principles = (policy.principles ?? []).join('\n');
  for (const fragment of [
    'Thin does not mean delete',
    'IMPROVE is the default remediation',
    'Do not leave weak pages untracked',
    'Sitemaps contain only canonical, indexable, quality-qualified URLs',
  ]) {
    if (!principles.includes(fragment)) fail(`Permanent content-quality principle missing: ${fragment}`);
  }

  if (gsc?.source?.affectedUrlCount !== 452) {
    fail('The 2026-09-05 GSC source snapshot must preserve the reported 452 affected URLs.');
  }

  const summary = gsc.initialTriageSummary ?? {};
  const summaryTotal = Object.values(summary).reduce((sum, value) => sum + Number(value || 0), 0);
  if (summaryTotal !== 452) fail(`Initial GSC triage summary must total 452 URLs; found ${summaryTotal}.`);
  for (const action of Object.keys(summary)) {
    if (!allowedActions.has(action)) fail(`Initial GSC triage summary contains unsupported action ${action}.`);
  }
  if ((summary.IMPROVE ?? 0) === 0) fail('GSC triage must preserve an explicit IMPROVE backlog.');
  if ((summary.REMOVE_CONSOLIDATE ?? 0) === 0) {
    fail('GSC triage must identify explicit removal/consolidation candidates when present.');
  }

  const inventoryRows = read(GSC_URL_INVENTORY_PATH)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && line !== 'action\tpath')
    .map((line) => {
      const [action, path, ...rest] = line.split('\t');
      return { action, path, extra: rest };
    });

  if (inventoryRows.length !== 452) {
    fail(`Per-URL GSC inventory must contain exactly 452 URL rows; found ${inventoryRows.length}.`);
  }
  const inventoryPaths = new Set();
  const inventoryCounts = { KEEP: 0, IMPROVE: 0, NOINDEX: 0, REMOVE_CONSOLIDATE: 0 };
  for (const [index, row] of inventoryRows.entries()) {
    if (!allowedActions.has(row.action)) fail(`Per-URL GSC inventory row ${index + 1} has unsupported action ${row.action}.`);
    if (!row.path?.startsWith('/')) fail(`Per-URL GSC inventory row ${index + 1} has invalid path ${row.path}.`);
    if (row.extra.length) fail(`Per-URL GSC inventory row ${index + 1} has unexpected extra columns.`);
    if (inventoryPaths.has(row.path)) fail(`Per-URL GSC inventory repeats path ${row.path}.`);
    inventoryPaths.add(row.path);
    if (Object.prototype.hasOwnProperty.call(inventoryCounts, row.action)) inventoryCounts[row.action] += 1;
  }
  for (const action of allowedActions) {
    if (inventoryCounts[action] !== Number(summary[action] ?? 0)) {
      fail(`Per-URL GSC inventory ${action} count ${inventoryCounts[action]} does not match summary ${Number(summary[action] ?? 0)}.`);
    }
  }

  const expectedReviewWaves = [
    'ops/seo/gsc-remediation-wave1-2026-09-05.json',
    'ops/seo/gsc-remediation-wave2-2026-09-05.json',
    'ops/seo/gsc-remediation-wave3-2026-09-05.json',
    TEXAS_VS_WAVE_PATH,
    COUNTY_PROMOTION_WAVE_PATH,
    TEXAS_VS_PROMOTION_WAVE_PATH,
  ];
  const reviewWaves = policy?.gscRemediation?.reviewWaves ?? [];
  for (const path of expectedReviewWaves) {
    if (!reviewWaves.includes(path)) fail(`Permanent policy is missing required GSC remediation wave: ${path}`);
  }

  const reviewedPaths = new Map();
  for (const wavePath of reviewWaves) {
    if (!fs.existsSync(wavePath)) {
      fail(`GSC remediation review wave is missing: ${wavePath}`);
      continue;
    }
    const wave = readJson(wavePath);
    if (wave.sourceSnapshot !== GSC_PATH) {
      fail(`GSC remediation wave ${wavePath} must point to the original 2026-09-05 snapshot.`);
    }
    const reviewed = Array.isArray(wave.reviewed) ? wave.reviewed : [];
    if (Number(wave?.summary?.reviewed ?? -1) !== reviewed.length) {
      fail(`GSC remediation wave ${wavePath} summary reviewed count does not match its ${reviewed.length} reviewed rows.`);
    }
    const waveCounts = { KEEP: 0, IMPROVE: 0, NOINDEX: 0, REMOVE_CONSOLIDATE: 0 };
    const wavePaths = new Set();
    for (const [index, item] of reviewed.entries()) {
      if (!item.path?.startsWith('/')) fail(`GSC remediation wave ${wavePath} row ${index + 1} has an invalid path.`);
      if (!inventoryPaths.has(item.path)) fail(`GSC remediation wave ${wavePath} reviews path outside the original 452-URL inventory: ${item.path}`);
      if (!allowedActions.has(item.action)) fail(`GSC remediation wave ${wavePath} row ${index + 1} has unsupported action ${item.action}.`);
      if (!item.reason || item.reason.length < 25) fail(`GSC remediation wave ${wavePath} row ${index + 1} lacks a meaningful rationale.`);
      if (item.action !== 'KEEP' && (!item.remediation || item.remediation.length < 25)) {
        fail(`GSC remediation wave ${wavePath} row ${index + 1} requires a concrete remediation for ${item.action}.`);
      }
      if (wavePaths.has(item.path)) fail(`GSC remediation wave ${wavePath} repeats reviewed path ${item.path}.`);
      wavePaths.add(item.path);

      const previousReview = reviewedPaths.get(item.path);
      if (previousReview) {
        if (item.supersedes !== previousReview.wavePath) {
          fail(`GSC remediation path ${item.path} was already reviewed in ${previousReview.wavePath}; ${wavePath} must explicitly supersede that exact wave.`);
        }
        if (item.previousAction !== previousReview.action) {
          fail(`GSC remediation path ${item.path} declares previousAction ${item.previousAction ?? 'missing'} but prior review action is ${previousReview.action}.`);
        }
        if (item.action === previousReview.action) {
          fail(`GSC remediation path ${item.path} supersedes ${previousReview.wavePath} without changing its action.`);
        }
      } else if (item.supersedes || item.previousAction) {
        fail(`GSC remediation path ${item.path} declares superseding metadata but has no prior review.`);
      }
      reviewedPaths.set(item.path, { wavePath, action: item.action });

      if (Object.prototype.hasOwnProperty.call(waveCounts, item.action)) waveCounts[item.action] += 1;
    }
    for (const action of allowedActions) {
      if (waveCounts[action] !== Number(wave?.summary?.[action] ?? 0)) {
        fail(`GSC remediation wave ${wavePath} ${action} count ${waveCounts[action]} does not match summary ${Number(wave?.summary?.[action] ?? 0)}.`);
      }
    }
  }

  if (!fs.existsSync(TEXAS_VS_WAVE_PATH)) {
    fail(`Texas-vs remediation wave is missing: ${TEXAS_VS_WAVE_PATH}`);
  }
  if (!fs.existsSync(TEXAS_VS_PROMOTION_WAVE_PATH)) {
    fail(`Texas-vs promotion wave is missing: ${TEXAS_VS_PROMOTION_WAVE_PATH}`);
  }
  if (!fs.existsSync(TEXAS_VS_READINESS_PATH)) {
    fail(`Texas-vs sitemap readiness gate is missing: ${TEXAS_VS_READINESS_PATH}`);
  }
  if (!fs.existsSync(TEXAS_VS_EVIDENCE_PATH)) {
    fail(`Texas-vs server evidence gate is missing: ${TEXAS_VS_EVIDENCE_PATH}`);
  }
  if (fs.existsSync(TEXAS_VS_WAVE_PATH) && fs.existsSync(TEXAS_VS_PROMOTION_WAVE_PATH) && fs.existsSync(TEXAS_VS_READINESS_PATH)) {
    const texasVsWave = readJson(TEXAS_VS_WAVE_PATH);
    const historicalImproveItems = (texasVsWave.reviewed ?? []).filter((item) => item.action === 'IMPROVE');
    if (historicalImproveItems.length !== 37 || Number(texasVsWave?.summary?.IMPROVE ?? 0) !== 37) {
      fail(`Texas-vs wave 4 must preserve exactly 37 historical IMPROVE state reviews; found ${historicalImproveItems.length}.`);
    }
    if ((texasVsWave.reviewed ?? []).some((item) => item.action !== 'IMPROVE')) {
      fail('Texas-vs wave 4 is historical evidence and may not be rewritten when later waves promote qualified states.');
    }

    const promotionWave = readJson(TEXAS_VS_PROMOTION_WAVE_PATH);
    const promotedItems = promotionWave.reviewed ?? [];
    const expectedPromotedPaths = new Set(['/texas-vs/georgia', '/texas-vs/north-carolina', '/texas-vs/tennessee']);
    if (promotedItems.length !== 3 || Number(promotionWave?.summary?.KEEP ?? 0) !== 3) {
      fail('Texas-vs wave 6 must contain exactly three KEEP promotions.');
    }
    for (const item of promotedItems) {
      if (!expectedPromotedPaths.has(item.path)) fail(`Unexpected Texas-vs wave-6 promotion path: ${item.path}`);
      if (item.action !== 'KEEP') fail(`Texas-vs wave-6 promotion must end in KEEP: ${item.path}`);
      if (item.supersedes !== TEXAS_VS_WAVE_PATH || item.previousAction !== 'IMPROVE') {
        fail(`Texas-vs wave-6 promotion must explicitly supersede its wave-4 IMPROVE review: ${item.path}`);
      }
    }
    for (const path of expectedPromotedPaths) {
      if (!promotedItems.some((item) => item.path === path)) fail(`Texas-vs wave 6 is missing ${path}.`);
    }

    const currentImproveItems = historicalImproveItems.filter((item) => reviewedPaths.get(item.path)?.action === 'IMPROVE');
    if (currentImproveItems.length !== 34) {
      fail(`Texas-vs current IMPROVE backlog must contain 34 unresolved state pages after wave 6; found ${currentImproveItems.length}.`);
    }

    const readinessSource = read(TEXAS_VS_READINESS_PATH);
    const improveStart = readinessSource.indexOf('const GSC_IMPROVE_STATE_SLUGS = [');
    const improveEnd = readinessSource.indexOf('] as const;', improveStart);
    if (improveStart < 0 || improveEnd < 0) {
      fail('Texas-vs readiness gate lost its explicit unresolved GSC IMPROVE state-slug registry.');
    } else {
      const readinessBlock = readinessSource.slice(improveStart, improveEnd);
      const readinessSlugs = [...readinessBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
      if (readinessSlugs.length !== 34 || new Set(readinessSlugs).size !== 34) {
        fail(`Texas-vs sitemap readiness registry must contain exactly 34 unique unresolved GSC IMPROVE state slugs; found ${readinessSlugs.length}.`);
      }
      for (const item of currentImproveItems) {
        const prefix = '/texas-vs/';
        if (!item.path.startsWith(prefix)) {
          fail(`Texas-vs wave contains a non-state path: ${item.path}`);
          continue;
        }
        const slug = item.path.slice(prefix.length);
        if (!readinessSlugs.includes(slug)) {
          fail(`Texas-vs current IMPROVE page is not excluded from sitemap priority: ${item.path}`);
        }
      }
      for (const slug of readinessSlugs) {
        const path = `/texas-vs/${slug}`;
        if (!currentImproveItems.some((item) => item.path === path)) {
          fail(`Texas-vs sitemap readiness registry contains a state that is no longer currently IMPROVE: ${slug}`);
        }
      }
      if (readinessSlugs.includes('california') || readinessSlugs.includes('florida')) {
        fail('California and Florida are redirect-only consolidations and must remain separate from the unresolved IMPROVE registry.');
      }
    }

    const promotedStart = readinessSource.indexOf('const EVIDENCE_PROMOTED_STATE_SLUGS = [');
    const promotedEnd = readinessSource.indexOf('] as const;', promotedStart);
    if (promotedStart < 0 || promotedEnd < 0) {
      fail('Texas-vs readiness gate lost its explicit evidence-promoted state-slug registry.');
    } else {
      const promotedBlock = readinessSource.slice(promotedStart, promotedEnd);
      const promotedSlugs = [...promotedBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
      const expectedPromotedSlugs = ['georgia', 'north-carolina', 'tennessee'];
      if (promotedSlugs.length !== 3 || new Set(promotedSlugs).size !== 3) {
        fail(`Texas-vs evidence-promoted registry must contain exactly three unique slugs; found ${promotedSlugs.length}.`);
      }
      for (const slug of expectedPromotedSlugs) {
        if (!promotedSlugs.includes(slug)) fail(`Texas-vs evidence-promoted registry is missing ${slug}.`);
      }
      for (const slug of promotedSlugs) {
        if (!expectedPromotedSlugs.includes(slug)) fail(`Unexpected Texas-vs evidence-promoted slug: ${slug}`);
      }
      if (!readinessSource.includes('isTexasVsStateEvidenceQualified')) {
        fail('Evidence-promoted Texas-vs states must pass the server evidence qualification function before sitemap inclusion.');
      }
    }
  }

  if (!fs.existsSync(COUNTY_PROMOTION_WAVE_PATH)) {
    fail(`County-property promotion wave is missing: ${COUNTY_PROMOTION_WAVE_PATH}`);
  } else {
    const countyWave = readJson(COUNTY_PROMOTION_WAVE_PATH);
    const expectedCountyPromotionPaths = new Set(['/property-tax/county/haskell', '/property-tax/county/leon']);
    const reviewed = countyWave.reviewed ?? [];
    if (reviewed.length !== 2 || Number(countyWave?.summary?.KEEP ?? 0) !== 2) {
      fail('County-property promotion wave must contain exactly two KEEP promotions.');
    }
    for (const item of reviewed) {
      if (!expectedCountyPromotionPaths.has(item.path)) fail(`Unexpected county-property promotion path: ${item.path}`);
      if (item.action !== 'KEEP') fail(`County-property promotion must end in KEEP: ${item.path}`);
      if (item.supersedes !== 'ops/seo/gsc-remediation-wave1-2026-09-05.json' || item.previousAction !== 'IMPROVE') {
        fail(`County-property promotion must explicitly supersede its wave-1 IMPROVE review: ${item.path}`);
      }
    }
    for (const path of expectedCountyPromotionPaths) {
      if (!reviewed.some((item) => item.path === path)) fail(`County-property promotion wave is missing ${path}.`);
    }
  }

  const familyCount = Object.values(gsc.routeFamilyCounts ?? {}).reduce((sum, value) => sum + Number(value || 0), 0);
  if (familyCount !== 452) fail(`GSC route-family inventory must total 452 URLs; found ${familyCount}.`);

  const ruleCount = (gsc.initialRules ?? []).reduce((sum, rule) => sum + Number(rule.count || 0), 0)
    + (gsc.explicitReviewedOverrides ?? []).length;
  if (ruleCount !== 452) fail(`GSC initial rules plus explicit reviewed overrides must cover 452 URLs; found ${ruleCount}.`);

  for (const [index, rule] of (gsc.initialRules ?? []).entries()) {
    if (!allowedActions.has(rule.action)) fail(`GSC initial rule ${index + 1} has unsupported action ${rule.action}.`);
    if (!['HIGH', 'MEDIUM', 'LOW'].includes(rule.priority)) fail(`GSC initial rule ${index + 1} has invalid priority.`);
    if (!rule.reason || rule.reason.length < 25) fail(`GSC initial rule ${index + 1} lacks a meaningful rationale.`);
    if (!rule.remediation || rule.remediation.length < 25) fail(`GSC initial rule ${index + 1} lacks a concrete remediation path.`);
  }
  for (const [index, item] of (gsc.explicitReviewedOverrides ?? []).entries()) {
    if (!item.path?.startsWith('/')) fail(`GSC reviewed override ${index + 1} has an invalid path.`);
    if (!allowedActions.has(item.action)) fail(`GSC reviewed override ${index + 1} has unsupported action ${item.action}.`);
    if (!item.reason || !item.remediation) fail(`GSC reviewed override ${index + 1} must contain rationale and remediation.`);
  }

  const parseArray = (name) => {
    const match = publicRoutes.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const;`));
    if (!match) {
      fail(`Public-route governance array missing: ${name}`);
      return [];
    }
    return [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
  };

  const routeBuckets = {
    INDEXABLE_STATIC_PATHS: parseArray('INDEXABLE_STATIC_PATHS'),
    CONDITIONAL_INDEXABLE_PUBLIC_PATHS: parseArray('CONDITIONAL_INDEXABLE_PUBLIC_PATHS'),
    NON_INDEXABLE_PUBLIC_PATHS: parseArray('NON_INDEXABLE_PUBLIC_PATHS'),
    REDIRECT_ONLY_PATHS: parseArray('REDIRECT_ONLY_PATHS'),
  };

  const seen = new Map();
  for (const [bucket, paths] of Object.entries(routeBuckets)) {
    for (const path of paths) {
      const previous = seen.get(path);
      if (previous) fail(`Public route ${path} is classified in both ${previous} and ${bucket}.`);
      seen.set(path, bucket);
    }
  }

  if (!routeBuckets.INDEXABLE_STATIC_PATHS.length) fail('Static indexable route registry unexpectedly empty.');
  if (!routeBuckets.NON_INDEXABLE_PUBLIC_PATHS.length) fail('Explicit noindex public route registry unexpectedly empty.');
  if (!routeBuckets.REDIRECT_ONLY_PATHS.length) fail('Redirect-only route registry unexpectedly empty.');

  for (const contract of policy.dynamicFamilyContracts ?? []) {
    if (!fs.existsSync(contract.file)) {
      fail(`Dynamic family ${contract.family} quality-gate file is missing: ${contract.file}`);
      continue;
    }
    const source = read(contract.file);
    for (const marker of contract.requiredMarkers ?? []) {
      if (!source.includes(marker)) {
        fail(`Dynamic family ${contract.family} lost required quality-gate marker: ${marker}`);
      }
    }
  }

  if (policy?.gscRemediation?.initialSnapshot !== GSC_PATH) {
    fail('Permanent policy must retain the 2026-09-05 GSC remediation snapshot as the initial backlog.');
  }
  if (policy?.gscRemediation?.initialUrlInventory !== GSC_URL_INVENTORY_PATH) {
    fail('Permanent policy must retain the exact 452-row GSC per-URL inventory.');
  }
}

if (failures.length) {
  console.error('Permanent SEO/content quality governance validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Permanent SEO/content quality governance passed: the exact 452-URL GSC backlog is tracked per URL, remediation review waves preserve audited superseding lineage, the historical 37-state Texas-vs IMPROVE cohort now has 34 unresolved states plus three server-evidence KEEP promotions that must remain fresh to retain sitemap priority, Haskell and Leon county-property pages are promoted only through the unchanged indexability gate, redirect-only comparisons stay separate, KEEP/IMPROVE/NOINDEX/REMOVE_CONSOLIDATE remain permanent outcomes, worthwhile thin topics default to IMPROVE, new generated/entity URLs stay noindex until qualified, public route buckets remain disjoint, and dynamic article/destination/entity/county/canonical/evidence quality gates remain protected.');
