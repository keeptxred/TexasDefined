import assert from 'node:assert/strict';
import test from 'node:test';
import { classifySnippetPage, PRIMARY_SNIPPET_CLASSIFICATIONS, snippetClassificationCounts } from './snippet-classification.mjs';

const good = () => ({
  status: 200, contentType: 'text/html; charset=utf-8',
  title: 'Texas Rivers Explained', description: 'Detailed overview',
  issues: [], warnings: [], authority: { reviewFlags: [] },
});

test('every inspected page receives exactly one declared classification', () => {
  const r = classifySnippetPage(good());
  assert.equal(r.classification, 'KEEP');
  assert.deepEqual(r.evidence, []);
  assert.equal(PRIMARY_SNIPPET_CLASSIFICATIONS.includes(r.classification), true);
  assert.equal(r.measuredSearchPerformance, false);
});

test('missing and broken search fields are technical, not invented CTR losses', () => {
  const r = classifySnippetPage({ ...good(), issues: [{ code: 'missing-canonical' }] });
  assert.equal(r.classification, 'TECHNICAL SNIPPET DEFECT');
  assert.deepEqual(r.evidence, ['missing-canonical']);
});

test('duplicate title is an intent candidate, not confirmed query cannibalization', () => {
  const r = classifySnippetPage({ ...good(), issues: [{ code: 'duplicate-title' }] });
  assert.equal(r.classification, 'INTENT CONFLICT');
  assert.match(r.basis, /candidate/);
});

test('thin or source-weak pages are authority candidates without invented rankings', () => {
  const r = classifySnippetPage({ ...good(), issues: [{ code: 'thin-render' }] });
  assert.equal(r.classification, 'RANKING PROBLEM');
  assert.match(r.basis, /not a measured/);
});

test('long title is only an editorial CTR opportunity, not a measured loser', () => {
  const r = classifySnippetPage({ ...good(), warnings: [{ code: 'title-review-length' }] });
  assert.equal(r.classification, 'CTR IMPROVEMENT');
  assert.equal(r.measuredSearchPerformance, false);
});

test('unavailable SSR remains fail-visible rather than treated as a proven 404', () => {
  const r = classifySnippetPage({ ...good(), status: 0, issues: [{ code: 'fetch-error' }] });
  assert.equal(r.classification, 'TECHNICAL SNIPPET DEFECT');
  assert.equal(r.htmlVerified, false);
  assert.match(r.basis, /not proof/);
});

test('an explicitly noindex sitemap URL is not an indexable candidate', () => {
  const r = classifySnippetPage({ ...good(), issues: [{ code: 'sitemap-url-noindex' }] });
  assert.equal(r.classification, 'TECHNICAL SNIPPET DEFECT');
  assert.equal(r.eligibleIndexableCandidate, false);
});

test('summary counts all inspected URLs with one classification each', () => {
  const rows = [good(), {...good(), issues: [{code:'duplicate-title'}]}].map((r) => ({snippet: classifySnippetPage(r)}));
  const counts = snippetClassificationCounts(rows);
  assert.equal(Object.values(counts).reduce((sum, n) => sum + n, 0), 2);
  assert.equal(counts.KEEP, 1);
  assert.equal(counts['INTENT CONFLICT'], 1);
});

test('GSC average position >20 sends a measured page to ranking-first review', () => {
  const page = { ...good(), gsc: { clicks: 1, impressions: 1000, ctr: 0.001, averagePosition: 47.4 } };
  const r = classifySnippetPage(page);
  assert.equal(r.classification, 'RANKING PROBLEM');
  assert.equal(r.measuredSearchPerformance, true);
  assert.deepEqual(r.evidence, ['gsc-average-position-over-20']);
});

test('competitive low CTR is a measured review candidate, not automatic proof of bad metadata', () => {
  const page = { ...good(), gsc: { clicks: 1, impressions: 400, ctr: 0.0025, averagePosition: 8.1 } };
  const r = classifySnippetPage(page);
  assert.equal(r.classification, 'CTR IMPROVEMENT');
  assert.match(r.basis, /not proof/);
  assert.equal(r.measurementDependency, null);
});

test('tiny GSC samples do not drive title churn', () => {
  const page = { ...good(), gsc: { clicks: 0, impressions: 8, ctr: 0, averagePosition: 5.6 } };
  const r = classifySnippetPage(page);
  assert.equal(r.classification, 'KEEP');
  assert.equal(r.measuredSearchPerformance, true);
});

test('deterministic SEO defects outrank a low-CTR GSC screening signal', () => {
  const page = { ...good(), issues: [{ code: 'missing-canonical' }],
    gsc: { clicks: 0, impressions: 400, ctr: 0, averagePosition: 5.5 } };
  assert.equal(classifySnippetPage(page).classification, 'TECHNICAL SNIPPET DEFECT');
});

test('normal position CTR does not trigger unnecessary rewrites', () => {
  const page = { ...good(), gsc: { clicks: 35, impressions: 400, ctr: 0.0875, averagePosition: 6 } };
  assert.equal(classifySnippetPage(page).classification, 'KEEP');
});
