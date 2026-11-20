import assert from "node:assert/strict";
import { mkdtempSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { auditTexasFlagVitals, FLAG_URL } from "./audit-texas-flag-vitals.mjs";

const data = {
  loadingExperience: { metrics: {
    LARGEST_CONTENTFUL_PAINT_MS: { percentile: 1800, category: "FAST" },
    CUMULATIVE_LAYOUT_SHIFT_SCORE: { percentile: 4, category: "FAST" },
    INTERACTION_TO_NEXT_PAINT: { percentile: 110, category: "FAST" },
  }},
  lighthouseResult: { categories: { performance: { score: 0.92 }},
    audits: { "largest-contentful-paint": { numericValue: 1900 }, "cumulative-layout-shift": { numericValue: 0.04 }} },
};
async function runWith(fetchImpl) {
  const dir = mkdtempSync(join(tmpdir(), "td-flag-vitals-"));
  try {
    const reportPath = join(dir, "vitals.json");
    const report = await auditTexasFlagVitals({ fetchImpl, strategies: ["mobile"], reportPath });
    assert.deepEqual(JSON.parse(readFileSync(reportPath, "utf8")), report);
    return report;
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

test("PageSpeed requests exact Texas flag URL and preserves mobile/desktop distinction", async () => {
  const report = await runWith(async (url) => {
    assert.equal(url.searchParams.get("url"), FLAG_URL);
    assert.equal(url.searchParams.get("strategy"), "mobile");
    return new Response(JSON.stringify(data), { status: 200 });
  });
  assert.equal(report.conclusion, "url-field-vitals-good");
  assert.equal(report.strategies[0].fieldSource, "texas-flag-URL");
  assert.equal(report.strategies[0].p75.cls.p75, 0.04);
});

test("origin fallback never passes a page-specific CrUX audit", async () => {
  const report = await runWith(async () => new Response(JSON.stringify({
    loadingExperience: { origin_fallback: true },
    originLoadingExperience: data.loadingExperience,
    lighthouseResult: data.lighthouseResult,
  }), { status: 200 }));
  assert.equal(report.conclusion, "url-field-data-unavailable");
  assert.equal(report.strategies[0].fieldSource, "origin-only");
});

test("API rate limiting is unknown, not a false pass", async () => {
  const report = await runWith(async () => new Response("", { status: 429 }));
  assert.equal(report.strategies[0].apiHttpStatus, 429);
  assert.equal(report.conclusion, "url-field-data-unavailable");
});

test("measured slow real-user vitals fail closed", async () => {
  const slow = structuredClone(data);
  slow.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS = { percentile: 3600, category: "SLOW" };
  const dir = mkdtempSync(join(tmpdir(), "td-flag-vitals-"));
  try {
    const reportPath = join(dir, "vitals.json");
    await assert.rejects(() => auditTexasFlagVitals({
      fetchImpl: async () => new Response(JSON.stringify(slow), { status: 200 }),
      strategies: ["mobile"], reportPath,
    }), /needs attention/);
    const report = JSON.parse(readFileSync(reportPath, "utf8"));
    assert.equal(report.conclusion, "needs-attention");
    assert.match(report.concerns[0], /CrUX/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("synthetic Lighthouse regression is a diagnostic alert, not mislabeled CrUX", async () => {
  const slow = structuredClone(data);
  delete slow.loadingExperience;
  slow.lighthouseResult.categories.performance.score = 0.4;
  const dir = mkdtempSync(join(tmpdir(), "td-flag-vitals-"));
  try {
    const reportPath = join(dir, "vitals.json");
    await assert.rejects(() => auditTexasFlagVitals({
      fetchImpl: async () => new Response(JSON.stringify(slow), { status: 200 }),
      strategies: ["desktop"], reportPath,
    }), /needs attention/);
    assert.equal(JSON.parse(readFileSync(reportPath, "utf8")).strategies[0].urlFieldStatus, "not-measured");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
