// Search-presentation triage of live HTML evidence, not a substitute for GSC CTR data.
// The classification is an actionable audit category. KEEP means no observed
// issue in these deterministic checks, NOT editorial or traffic certification.
const intentCodes = new Set(['title-h1-intent-conflict', 'duplicate-title']);
const snippetCodes = new Set([
  'missing-title', 'fallback-title', 'generic-title', 'title-extreme-length',
  'dangling-title-fragment', 'missing-description', 'missing-canonical',
  'canonical-mismatch', 'invalid-canonical', 'duplicate-description',
  'h1-count', 'expired-event-snippet', 'sitemap-url-noindex',
  'unexpected-redirect', 'page-level-fallback-copy',
]);

export const PRIMARY_SNIPPET_CLASSIFICATIONS = Object.freeze([
  'KEEP', 'CTR IMPROVEMENT', 'RANKING PROBLEM',
  'INTENT CONFLICT', 'TECHNICAL SNIPPET DEFECT',
]);

export function classifySnippetPage(page) {
  const issues = Array.isArray(page?.issues) ? page.issues : [];
  const warnings = Array.isArray(page?.warnings) ? page.warnings : [];
  const codes = new Set(issues.map((issue) => issue.code));
  const warningCodes = new Set(warnings.map((warning) => warning.code));
  const flags = Array.isArray(page?.authority?.reviewFlags) ? page.authority.reviewFlags : [];
  const verifiedHtml = page?.status === 200 && String(page?.contentType || '').toLowerCase().includes('text/html');
  let classification = 'KEEP';
  let evidence = [];
  let basis = 'No defect surfaced in the automated search-presentation checks; editorial and performance reviews remain open.';

  if (!verifiedHtml || codes.has('fetch-error') || codes.has('http-status')) {
    classification = 'TECHNICAL SNIPPET DEFECT';
    evidence = [...codes].filter((code) => code === 'fetch-error' || code === 'http-status');
    if (!evidence.length) evidence = ['html-unverified'];
    basis = 'URL could not be inspected as usable HTML; this is an availability or transport investigation, not proof the snippet itself is broken.';
  } else if ([...codes].some((code) => intentCodes.has(code))) {
    classification = 'INTENT CONFLICT';
    evidence = [...codes].filter((code) => intentCodes.has(code));
    basis = 'On-page title/H1 or title-duplication conflict candidate; actual query cannibalization requires independent search evidence.';
  } else if ([...codes].some((code) => snippetCodes.has(code))) {
    classification = 'TECHNICAL SNIPPET DEFECT';
    evidence = [...codes].filter((code) => snippetCodes.has(code));
    basis = 'Deterministic title, description, canonical, event-freshness or indexability defect.';
  } else if (codes.has('thin-render') || flags.includes('no-identifiable-primary-source-host')) {
    classification = 'RANKING PROBLEM';
    evidence = [
      ...(codes.has('thin-render') ? ['thin-render'] : []),
      ...(flags.includes('no-identifiable-primary-source-host') ? ['source-provenance-review'] : []),
    ];
    basis = 'Content/authority review candidate, not a measured Google ranking or position change.';
  } else if (warningCodes.has('title-review-length')) {
    classification = 'CTR IMPROVEMENT';
    evidence = ['title-review-length'];
    basis = 'Editorial search-result wording review candidate; no measured CTR improvement or deficit is asserted.';
  }

  return {
    classification, evidence, basis,
    htmlVerified: verifiedHtml,
    eligibleIndexableCandidate: verifiedHtml && !codes.has('sitemap-url-noindex'),
    measuredSearchPerformance: false,
    measurementDependency: 'Authenticated finalized Google Search Console metrics unavailable in this audit',
  };
}

export function snippetClassificationCounts(rows) {
  const counts = Object.fromEntries(PRIMARY_SNIPPET_CLASSIFICATIONS.map((kind) => [kind, 0]));
  for (const row of rows) {
    const classification = row.snippet?.classification;
    if (!Object.hasOwn(counts, classification)) throw new Error('Unrecognized primary snippet classification: ' + classification);
    counts[classification] += 1;
  }
  return counts;
}
