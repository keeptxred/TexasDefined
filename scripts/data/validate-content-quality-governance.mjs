import fs from 'node:fs';

const POLICY_PATH = 'ops/seo/content-quality-governance.json';
const GSC_PATH = 'ops/seo/gsc-discovered-2026-09-05.json';
const PUBLIC_ROUTES_PATH = 'src/lib/public-routes.ts';

const failures = [];
const fail = (message) => failures.push(message);
const readJson = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
const read = (path) => fs.readFileSync(path, 'utf8');

for (const path of [POLICY_PATH, GSC_PATH, PUBLIC_ROUTES_PATH]) {
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
}

if (failures.length) {
  console.error('Permanent SEO/content quality governance validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Permanent SEO/content quality governance passed: the 452-URL GSC backlog is tracked, KEEP/IMPROVE/NOINDEX/REMOVE_CONSOLIDATE are permanent outcomes, worthwhile thin topics default to IMPROVE, new generated/entity URLs stay noindex until qualified, public route buckets remain disjoint, and dynamic article/destination/entity/county quality gates remain protected.');
