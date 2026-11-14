import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { summarizePageSpeed, auditHomepageVitals } from './audit-homepage-vitals.mjs';

const good = {
  loadingExperience: { metrics: {
    LARGEST_CONTENTFUL_PAINT_MS: { percentile: 1900, category: 'FAST' },
    INTERACTION_TO_NEXT_PAINT: { percentile: 120, category: 'FAST' },
    CUMULATIVE_LAYOUT_SHIFT_SCORE: { percentile: 5, category: 'FAST' },
  } },
  lighthouseResult: { audits: { 'largest-contentful-paint': { numericValue: 2250 } },
    categories: { performance: { score: 0.81 } } },
};

test('separates measured homepage URL-level field observations from synthetic lab data', () => {
  const report = summarizePageSpeed(good, 'mobile');
  assert.equal(report.urlFieldStatus, 'good');
  assert.equal(report.fieldSource, 'homepage-URL');
  assert.equal(report.p75.lcp.p75, 1900);
  assert.equal(report.p75.cls.p75, 0.05, 'PSI integer CLS percentiles must be converted to a unitless score');
  assert.equal(report.p75.cls.rawP75, 5, 'retain source value for audit');
  assert.equal(report.p75.cls.unit, 'unitless');
  assert.equal(report.lab.lcpMs, 2250);
  assert.equal(report.lab.performanceScore, .81);
});

test('origin-only CrUX does not become a claimed homepage measurement', () => {
  const report = summarizePageSpeed({
    loadingExperience: { origin_fallback: true },
    originLoadingExperience: good.loadingExperience,
  }, 'desktop');
  assert.equal(report.fieldSource, 'origin-only');
  assert.equal(report.urlFieldStatus, 'not-measured');
});

test('API 429 and insufficient field data are explicitly not graded as good', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'td-vitals-'));
  try {
    const reportPath = join(dir, 'evidence.json');
    const result = await auditHomepageVitals({
      reportPath, strategies: ['mobile'],
      fetchImpl: async () => new Response('rate limit', { status: 429 }),
    });
    assert.equal(result.conclusion, 'field-data-unavailable');
    assert.equal(JSON.parse(readFileSync(reportPath)).strategies[0].urlFieldStatus, 'not-measured');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('verified failing page-level CrUX creates a diagnostic failure rather than fabricating a pass', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'td-vitals-'));
  try {
    const reportPath = join(dir, 'evidence.json');
    const slow = structuredClone(good);
    slow.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT.category = 'SLOW';
    await assert.rejects(() => auditHomepageVitals({
      reportPath, strategies: ['mobile'],
      fetchImpl: async () => new Response(JSON.stringify(slow),
        { status: 200, headers: { 'Content-Type': 'application/json' } }),
    }), /field Web Vitals need improvement/);
    assert.equal(JSON.parse(readFileSync(reportPath)).conclusion, 'url-field-vitals-need-improvement');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('missing CLS with good LCP and INP is not a successful Core Web Vitals assessment', () => {
  const incomplete = structuredClone(good);
  delete incomplete.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE;
  const report = summarizePageSpeed(incomplete, 'mobile');
  assert.equal(report.fieldSource, 'homepage-URL');
  assert.equal(report.urlFieldStatus, 'incomplete');
  assert.equal(report.p75.cls, null);
});

test('missing LCP with good CLS and INP must also remain incomplete', () => {
  const incomplete = structuredClone(good);
  delete incomplete.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS;
  assert.equal(summarizePageSpeed(incomplete, 'desktop').urlFieldStatus, 'incomplete');
});

test('good LCP and CLS may pass when INP field sampling is insufficient', () => {
  const incompleteINP = structuredClone(good);
  delete incompleteINP.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT;
  const report = summarizePageSpeed(incompleteINP, 'mobile');
  assert.equal(report.urlFieldStatus, 'good');
  assert.equal(report.p75.inp, null);
});

test('unknown metric category cannot be silently labeled good', () => {
  const malformed = structuredClone(good);
  malformed.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.category = 'UNKNOWN';
  assert.equal(summarizePageSpeed(malformed, 'mobile').urlFieldStatus, 'incomplete');
});
