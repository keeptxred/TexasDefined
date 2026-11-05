/**
 * Read-only source-integrity monitor for the 72 published lake research dossiers.
 * Every Monday/Thursday: one deterministic 12-lake cohort (all 72 in 3 weeks).
 * Quarterly/manual: all 72. PR smoke: two source types (TPWD lake profile and
 * waterbody-specific fishing regulation). No automated legal claims or timestamps.
 *
 * This tests whether a dossier's FIRST-PARTY fishery/regulation URL still
 * resolves to the correct lake. It cannot determine whether limits changed.
 * An operational status or content mismatch requires a dated editorial review.
 */
import fs from "node:fs";
import path from "node:path";

const sourceFile = "src/data/fishing/lake-authority-research-wave1.ts";
const source = fs.readFileSync(sourceFile, "utf8");
const match = source.match(/export const LAKE_AUTHORITY_RESEARCH_WAVE1: Record<string, LakeAuthorityResearch> = (\{[\s\S]*\});\s*$/);
if (!match) throw new Error("Cannot parse existing researched source dossiers; do not guess their structure.");
const dossiers = JSON.parse(match[1]);
const all = Object.entries(dossiers).map(([slug, research]) => {
  const urls = research.regulations.map((item) => item.sourceUrl);
  const url = urls.find((candidate) => /\/fishboat\/fish\/action\/fishregs2\.php\?water=\d+/.test(candidate))
    || urls.find((candidate) => /\/fishboat\/fish\/recreational\/lakes\/[a-z0-9_]+\/?$/i.test(candidate));
  if (!url) throw new Error(slug + ": missing lake-specific first-party TPWD fisheries/regulations source");
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || parsed.hostname !== "tpwd.texas.gov")
    throw new Error(slug + ": primary fisheries/regulations source must be an official HTTPS TPWD URL");
  return { slug, url, kind: parsed.pathname.endsWith("fishregs2.php") ? "waterbody-regulations" : "lake-fishery-profile" };
}).sort((a, b) => a.slug.localeCompare(b.slug));

if (all.length !== 72 || new Set(all.map((item) => item.slug)).size !== 72
  || new Set(all.map((item) => item.url)).size !== 72)
  throw new Error("Require 72 distinct lake dossiers and distinct TPWD fishery/regulation source URLs.");

const now = new Date();
const dayMs = 86_400_000;
const week = Math.floor((Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - Date.UTC(2026, 0, 5)) / (7 * dayMs));
const cohort = ((week * 2 + (now.getUTCDay() === 4 ? 1 : 0)) % 6 + 6) % 6;
const mode = process.argv.includes("--plan") ? "plan" : process.argv.includes("--smoke") ? "smoke"
  : process.argv.includes("--full") || process.env.FISHING_LAKES_FULL_REVIEW === "1" ? "full" : "cohort";
const selected = mode === "smoke" ? ["lake-buchanan", "lewisville-lake"].map((slug) => {
  const item = all.find((candidate) => candidate.slug === slug);
  if (!item) throw new Error("Missing smoke-test lake: " + slug);
  return item;
}) : mode === "full" ? all : all.filter((_, index) => index % 6 === cohort);

const buckets = Array.from({ length: 6 }, (_, bucket) => all.filter((_, i) => i % 6 === bucket).map((item) => item.slug));
const covered = buckets.flat();
if (covered.length !== 72 || new Set(covered).size !== 72 || buckets.some((row) => row.length !== 12))
  throw new Error("Six scheduled cohorts must collectively cover all 72 lakes exactly once.");
if (mode === "plan") {
  console.log(JSON.stringify({
    mode, totalLakes: all.length, batches: buckets.map((slugs, bucket) => ({ bucket, lakes: slugs.length, slugs })),
    currentCohort: cohort, coverage: "All 72 unique official TPWD sources checked over three Monday/Thursday cycles."
  }, null, 2));
  process.exit(0);
}

function plainText(text) {
  return text
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|quot|#39|rsquo);/gi, " ")
    .replace(/\s+/g, " ").trim();
}
const normalize = (value) => String(value).normalize("NFKD").toLowerCase().replace(/[^a-z0-9]/g, "");
const generic = new Set(["lake", "reservoir", "state", "park", "international"]);
const checkedAt = new Date().toISOString();
const checks = [];
const errors = [];
const headers = { "User-Agent": "TexasDefinedLakeOfficialSources/1.0 (+https://texasdefined.com/fishing/lakes)", Accept: "text/html" };

async function one(item) {
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetch(item.url, { headers, redirect: "follow", signal: AbortSignal.timeout(18000) });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const actual = new URL(response.url);
      if (actual.protocol !== "https:" || actual.hostname !== "tpwd.texas.gov")
        throw new Error("Official source redirected outside TPWD");
      const html = (await response.text()).slice(0, 850000);
      const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
        .map((m) => plainText(m[1])).filter(Boolean);
      const candidateTokens = item.slug.split("-").filter((token) => token.length >= 3 && !generic.has(token));
      const heading = headings.find((h) => candidateTokens.some((token) => normalize(h).includes(normalize(token))));
      const typeMatched = Boolean(heading) && (item.kind === "waterbody-regulations"
        ? /fishing regulations for/i.test(heading)
        : /lake|reservoir|fishing/i.test(heading));
      if (!typeMatched) {
        throw new Error("TPWD source no longer shows expected lake-specific " + item.kind
          + " heading; received: " + JSON.stringify(headings.slice(0, 3)));
      }
      checks.push({ slug: item.slug, url: item.url, kind: item.kind, status: "verified_source_identity",
        http: response.status, heading, checkedAt });
      return;
    } catch (error) {
      lastError = String(error?.message ?? error);
      if (attempt === 1) await new Promise((resolve) => setTimeout(resolve, 1200));
    }
  }
  checks.push({ slug: item.slug, url: item.url, kind: item.kind, status: "review_required", error: lastError, checkedAt });
  errors.push(item.slug + ": " + lastError + " — " + item.url);
}

let next = 0;
await Promise.all(Array.from({ length: Math.min(3, selected.length) }, async () => {
  while (next < selected.length) {
    const item = selected[next++];
    await one(item);
  }
}));
checks.sort((a, b) => a.slug.localeCompare(b.slug));
const report = {
  checkedAt, mode, cohort: mode === "cohort" ? cohort : null,
  scope: "First-party TPWD lake-specific regulation/fishery source identity and reachability; NOT legal limit recertification, live access, current catch, or fish advisories.",
  totalLakes: all.length, checkedLakes: checks.length, nextAction: errors.length
    ? "Investigate official sources for listed slugs; change published rules only after independently verifying exact current requirements."
    : "No source identity drift seen in this cohort. This does not establish that the detailed legal limits are unchanged.",
  errors, checks,
};
fs.mkdirSync(".artifacts", { recursive: true });
fs.writeFileSync(path.join(".artifacts", "fishing-lake-regulation-sources.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ checkedAt, mode, cohort: report.cohort, totalLakes: all.length, checkedLakes: checks.length,
  verified: checks.filter((c) => c.status === "verified_source_identity").length, errors: errors.slice(0, 20) }, null, 2));
if (errors.length) process.exitCode = 1;
