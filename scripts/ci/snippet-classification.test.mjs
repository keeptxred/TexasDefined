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
