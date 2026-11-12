/**
 * On-demand, bounded ORIGINAL-ORIGIN review of the public fishing planner.
 * No search-index snapshot, saved page, downloaded fixture or CDN cache is used.
 * Every request includes a unique URL nonce and no-store/no-cache headers.
 * Run from GitHub Actions with public network reachability:
 *   node scripts/ci/audit-fishing-planner-fresh-live.mjs
 */
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import fs from "node:fs";

const publicOrigin = "https://texasdefined.com";
const workerOrigin = "https://texasdefined-site.freddy-coppola.workers.dev";
const expectedCanonical = publicOrigin + "/fishing/plan";
const runNonce = randomUUID();
const checks = [];
const problems = [];
const warnings = [];
const cases = [
  { path: "/fishing/plan", category: "planner-list" },
  { path: "/fishing/plan?view=map", category: "planner-map" },
  { path: "/fishing/plan?species=largemouth-bass", category: "species-filter" },
  { path: "/fishing/plan?q=Houston&sort=closest", category: "location-search" },
  { path: "/fishing/lakes", category: "lake-directory" },
  { path: "/fishing/compare", category: "lake-comparison" },
];
const failures = (problem) => problems.push(problem);
function visible(html) {
  return html.replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--\s*-->/g, "")
    .replace(/<[^>]*>/g, " ").replace(/&amp;/gi, "&")
    .replace(/&nbsp;/gi, " ").replace(/\s+/g, " ").trim();
}
function tag(html, tagName, attrsRegex) {
  return (html.match(new RegExp("<" + tagName + "\\b[^>]*>", "gi")) ?? [])
    .find((t) => attrsRegex.test(t)) ?? "";
}
function attr(markup, name) {
  return markup.match(new RegExp("\\b" + name + "=[\"']([^\"']*)[\"']", "i"))?.[1] ?? "";
}
function requireCheck(condition, code, detail) {
  checks.push({ code, pass: Boolean(condition), detail });
  if (!condition) failures(code + ": " + detail);
}
async function fresh(origin, entry) {
  const url = new URL(entry.path, origin);
  url.searchParams.set("independent_fishing_fresh_audit", runNonce + "-" + randomUUID());
  let error;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const started = Date.now();
      const response = await fetch(url, {
        redirect: "follow",
        headers: {
          "cache-control": "no-cache, no-store, max-age=0",
          pragma: "no-cache",
          "user-agent": "TexasDefinedIndependentLiveQualityAudit/2026-11-11",
          "accept": "text/html",
        },
        signal: AbortSignal.timeout(25_000),
      });
      const html = await response.text();
      const age = response.headers.get("age");
      const cache = response.headers.get("cf-cache-status");
      const date = response.headers.get("date");
      const dateMs = date ? Date.parse(date) : NaN;
      const dateDeltaSeconds = Number.isFinite(dateMs) ? Math.abs(started - dateMs) / 1000 : null;
      return {
        html, path: entry.path, category: entry.category, origin, status: response.status,
        bytes: html.length, durationMs: Date.now() - started, age,
        cache, date, dateDeltaSeconds, finalUrl: response.url,
        contentType: response.headers.get("content-type"),
        cfRay: response.headers.get("cf-ray"),
      };
    } catch (e) {
      error = e;
      if (attempt === 1) await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  throw new Error(origin + entry.path + ": fresh HTTP request failed: " + error);
}
function audit(result) {
  const { origin, category, html, status, cache, age, dateDeltaSeconds, path } = result;
  const scope = origin + " " + category;
  requireCheck(status === 200, "http-200", scope + " status=" + status);
  requireCheck(/text\/html/i.test(result.contentType ?? ""), "content-type", scope + ": " + result.contentType);
  requireCheck(!/\b(?:HIT|STALE|UPDATING)\b/i.test(cache ?? ""), "uncached-response", scope + " cf-cache-status=" + cache);
  requireCheck(age == null || Number(age) === 0, "zero-age", scope + " Age=" + age);
  requireCheck(dateDeltaSeconds != null && dateDeltaSeconds < 180, "fresh-origin-date", scope + " dateAgeSeconds=" + dateDeltaSeconds);
  requireCheck(result.finalUrl.includes("independent_fishing_fresh_audit="), "nonce-survived", scope + " redirect=" + result.finalUrl);
  const text = visible(html);
  requireCheck(/<html\b/i.test(html) && text.length > 2000, "substantive-ssr", scope + " visible-length=" + text.length);
  const robots = tag(html, "meta", /\bname=["'](?:robots|googlebot)["']/i);
  requireCheck(!/\bnoindex\b/i.test(attr(robots, "content")), "indexable", scope + " robots=" + attr(robots, "content"));
  const h1 = html.match(/<h1\b[^>]*>/gi) ?? [];
  requireCheck(h1.length === 1, "single-h1", scope + " h1count=" + h1.length);
  if (category.startsWith("planner") || ["species-filter", "location-search"].includes(category)) {
    const canonical = tag(html, "link", /\brel=["']canonical["']/i);
    requireCheck(attr(canonical, "href") === expectedCanonical, "self-canonical", scope + " canonical=" + attr(canonical, "href"));
    const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
    requireCheck(/Texas Fishing Lake Finder/i.test(title), "intent-title", scope + " title=" + title);
    const description = tag(html, "meta", /\bname=["']description["']/i);
    requireCheck(attr(description, "content").length > 85, "helpful-description", scope + " description=" + attr(description, "content"));
    requireCheck(/Find a Texas Fishing Lake/i.test(text), "clear-user-purpose", scope);
    requireCheck(/Fish-consumption advisories/i.test(text), "safety-source-link", scope);
    requireCheck(/fishing\/compare/i.test(html) && /fishing\/lakes/i.test(html), "related-navigation", scope);
  }
  if (category === "planner-list") {
    requireCheck(/72 matching lakes/i.test(text), "default-inventory-72", scope);
    requireCheck(/Showing 12 of 72 matching lake cards/i.test(text), "progressive-cards", scope);
    requireCheck(/Jump directly to any matching lake/i.test(text), "full-directory-links", scope);
    requireCheck(/Official fish-consumption advisory/i.test(text), "advisory-visible", scope);
    requireCheck(/A current report must be published within seven days/i.test(text), "report-freshness", scope);
    const quicknav = html.split('aria-label="All matching fishing lake guides"')[1]?.split("</nav>")[0] ?? "";
    const names = [...quicknav.matchAll(/href=["']\/fishing\/lakes\/([^"']+)["']/g)].map(m => m[1]);
    requireCheck(new Set(names).size === 72, "all-72-crawlable", scope + " linked=" + new Set(names).size);
  }
  if (category === "planner-map") {
    requireCheck(/Map coverage:\s*72 of 72 matching lakes/i.test(text), "verified-mapped-72", scope);
    requireCheck(/Every matching lake is represented/i.test(text), "all-pins-disclosed", scope);
    requireCheck(/Choose a mapped lake/i.test(text), "keyboard-map-selector", scope);
    requireCheck(/Texas Water Development Board/i.test(text), "official-coordinate-credit", scope);
    requireCheck(/reference locations|reservoir reference/i.test(text), "reference-not-access-disclosure", scope);
  }
  if (category === "species-filter") requireCheck(/largemouth bass/i.test(text), "species-filter-ssr", scope);
  if (category === "location-search") requireCheck(/Houston/i.test(text), "location-query-ssr", scope);
  if (category === "lake-directory") requireCheck(/Texas Fishing Lakes/i.test(text) && /72/i.test(text), "directory-different-purpose", scope);
  if (category === "lake-comparison") requireCheck(/Compare/i.test(text), "comparison-different-purpose", scope);
  return {
    origin, path, category, status, cache, age, date: result.date, dateDeltaSeconds,
    durationMs: result.durationMs, bytes: result.bytes,
    cfRay: result.cfRay, contentType: result.contentType,
    visibleTextChars: text.length, h1Count: h1.length,
  };
}
const observations = [];
for (const origin of [publicOrigin, workerOrigin]) {
  for (const entry of cases) {
    try {
      observations.push(audit(await fresh(origin, entry)));
    } catch (error) {
      failures(origin + " " + entry.path + " " + String(error));
    }
  }
}
const checkCount = checks.length;
const passed = checks.filter(x => x.pass).length;
const score = Math.round(100 * passed / Math.max(1, checkCount));
warnings.push("Cannot independently confirm Google-selected canonical/indexing, live CWV field data or human originality/expertise from HTTP alone.");
warnings.push("A passing HTTP auditor does not establish that each lake has current public launch access or that Google will rank the page.");
const report = {
  title: "TexasDefined fishing planner live authority review",
  method: "Uncached direct GitHub-runner HTTP GET: unique nonce on every request, cache-control:no-store/no-cache, zero Age and fresh Date; canonical plus independent direct Worker",
  auditedAt: new Date().toISOString(),
  nonce: runNonce,
  checkedRevision: process.env.GITHUB_SHA ?? null,
  scoring: { heuristicTechnicalScore: score, passed, checkCount, failed: problems.length, qualification: "Technical quality, indexing signals and rendered authority evidence only — not a Google quality score" },
  observations, failedChecks: checks.filter(x => !x.pass), problems, warnings,
};
fs.mkdirSync(".artifacts", { recursive: true });
fs.writeFileSync(".artifacts/fishing-planner-fresh-live-audit.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (problems.length) process.exitCode = 1;
