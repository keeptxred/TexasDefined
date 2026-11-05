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
