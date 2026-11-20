#!/usr/bin/env node
// Independent mobile/desktop PageSpeed Insights and CrUX observation for the
// EXACT Texas Flag authority URL. Lab values are not mislabeled as CrUX field data.
// Absence of URL-level CrUX (low traffic, 429, API failure) is UNKNOWN, never GOOD.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { summarizePageSpeed } from "./audit-homepage-vitals.mjs";

export const FLAG_URL = "https://texasdefined.com/texas-flag";
export const REPORT_PATH = ".artifacts/texas-flag-vitals-evidence.json";

export async function auditTexasFlagVitals({
  fetchImpl = fetch,
  key = process.env.PAGESPEED_API_KEY,
  reportPath = REPORT_PATH,
  strategies = ["mobile", "desktop"],
} = {}) {
  const report = {
    observedAt: new Date().toISOString(),
    source: "Google PageSpeed Insights v5 / CrUX when available",
    url: FLAG_URL,
    note: "The exact page URL is measured. Origin-only samples and Lighthouse lab scores do not certify URL-level Core Web Vitals.",
    strategies: [],
    conclusion: "not-measured",
    concerns: [],
  };
  for (const strategy of strategies) {
    const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    api.searchParams.set("url", FLAG_URL);
    api.searchParams.set("strategy", strategy);
    api.searchParams.set("category", "performance");
    if (key) api.searchParams.set("key", key);
    try {
      const response = await fetchImpl(api, { signal: AbortSignal.timeout(55000) });
      if (!response.ok) {
        report.strategies.push({ strategy, fieldSource: "unavailable",
          urlFieldStatus: "not-measured", apiHttpStatus: response.status });
        continue;
      }
      const data = await response.json();
      const metrics = summarizePageSpeed(data, strategy);
      if (metrics.fieldSource === "homepage-URL") metrics.fieldSource = "texas-flag-URL";
      report.strategies.push(metrics);
      if (metrics.urlFieldStatus === "needs-improvement") {
        report.concerns.push(strategy + ": official page-level CrUX p75 Core Web Vitals need improvement");
      }
      if (metrics.lab.performanceScore !== null && metrics.lab.performanceScore < 0.70) {
        report.concerns.push(strategy + ": Lighthouse lab performance score under 70/100 (diagnostic only)");
      }
      if (metrics.lab.lcpMs !== null && metrics.lab.lcpMs > 4000) {
        report.concerns.push(strategy + ": Lighthouse lab LCP above 4 seconds (diagnostic only)");
      }
      if (metrics.lab.cls !== null && metrics.lab.cls > 0.25) {
        report.concerns.push(strategy + ": Lighthouse lab CLS above 0.25 (diagnostic only)");
      }
    } catch (error) {
      report.strategies.push({ strategy, fieldSource: "unavailable", urlFieldStatus: "not-measured",
        detail: String(error) });
    }
  }
  const states = report.strategies.map(x => x.urlFieldStatus);
  report.conclusion = report.concerns.length ? "needs-attention"
    : states.length && states.every(x => x === "good") ? "url-field-vitals-good"
    : states.some(x => x === "good") ? "partial-url-field-data"
    : "url-field-data-unavailable";
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, JSON.stringify(report, null, 2) + "\n");
  console.log("TEXAS_FLAG_VITALS " + JSON.stringify(report));
  if (report.concerns.length) throw new Error("Texas flag mobile/desktop performance needs attention; see evidence JSON");
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await auditTexasFlagVitals();
}
