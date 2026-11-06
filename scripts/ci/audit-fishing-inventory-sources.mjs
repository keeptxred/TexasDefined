import fs from "node:fs";
import path from "node:path";
import { runBoundedSourceChecks } from "./run-bounded-source-checks.mjs";

const access = JSON.parse(fs.readFileSync("src/data/fishing/curated-access-sites.json", "utf8"));
const guides = JSON.parse(fs.readFileSync("src/data/fishing/curated-fishing-guide-businesses.json", "utf8"));
const { statewideNetworkShowcaseLakePrototypes } = await import("../../src/data/fishing/statewide-lake-network.ts");
const checkedAt = new Date().toISOString();
const issues = [];
const checked = [];
const normalize = (value) => value
  .replace(/&#x27;|&#39;|&apos;|&rsquo;|&#8217;/gi, "'")
  .replace(/&amp;/gi, "&")
  .replace(/&nbsp;/gi, " ")
  .replace(/<[^>]*>/g, " ")
  .normalize("NFKD").toLowerCase().replace(/[^a-z0-9]/g, "");
async function check(url, names = [], textHints = []) {
  try {
    // TPWD intermittently resets groups of automated connections. Preserve the
    // source-integrity gate while using a bounded two-attempt backoff: a failed
    // provider is still an issue, never silently treated as verified.
    let response;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        response = await fetch(url, { headers: { "User-Agent": "TexasDefinedSourceIntegrity/1.0 (+https://texasdefined.com/fishing)", Accept: "text/html" }, redirect: "follow", signal: AbortSignal.timeout(16000) });
        if (!response.ok) {
          const status = response.status;
          await response.body?.cancel();
          if (status === 429 || status >= 500) throw new Error("Retryable HTTP " + status);
          throw Object.assign(new Error("HTTP " + status), { nonRetryable: true });
        }
        break;
      } catch (failure) {
        if (attempt >= 2 || failure?.nonRetryable) {
          const rootCause = failure?.cause?.code || failure?.cause?.message || "";
          throw new Error(String(failure?.message ?? failure) + (rootCause ? " (" + rootCause + ")" : ""));
        }
        await new Promise((resolve) => setTimeout(resolve, 1400));
      }
    }
    if (!response) throw new Error("Source response unexpectedly absent");
    const content = (await response.text()).slice(0, 600000);
    if (content.length < 100) throw new Error("Empty source document");
    const normalized = normalize(content);
    const missing = names.filter((name) => !normalized.includes(normalize(name)));
    const hintsMissing = textHints.length && !textHints.some((hint) => normalized.includes(normalize(hint)));
    if (missing.length || hintsMissing) issues.push({ source: url, missingFacilityNames: missing, pageTypeMismatch: Boolean(hintsMissing) });
    checked.push({ url, http: response.status, namesChecked: names.length, missing: missing.length, pageTypeMismatch: Boolean(hintsMissing) });
  } catch (error) {
    issues.push({ source: url, error: String(error?.message ?? error) });
    checked.push({ url, error: String(error?.message ?? error) });
  }
}
// Keep every verified TPWD name check, but do not serialize unrelated HTTP
// requests. The bounded pool also prevents the fixed 12-minute job budget from
// growing linearly with each new reviewed lake and guide business.
const sourceTasks = access.map((lake) => () => check(
  "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/" + lake.tpwd + "/" + (lake.sourcePage ?? "access.phtml"),
  lake.facilities.map(([name]) => name),
  ["Public Access Facilities"],
));
// Recheck already-researched lake-access dossiers without inventing or restamping facts.
const seeded = new Set(["lake-conroe", ...access.map((lake) => lake.lakeId)]);
const network = Object.values(statewideNetworkShowcaseLakePrototypes)
  .filter((lake) => !seeded.has(lake.slug) && lake.accessReviewedAt
    && lake.sources?.tpwdAccess?.url?.startsWith("https://tpwd.texas.gov/")
    && lake.access.some((site) => site.name && !site.name.toLowerCase().includes("public access inventory")))
  .sort((a, b) => a.slug.localeCompare(b.slug));
const cohort = new Date().getUTCDay() === 4 ? 1 : 0;
const batch = process.env.GITHUB_EVENT_NAME === "pull_request" ? []
  : network.filter((_, i) => i % 2 === cohort);
for (const lake of batch) {
  const names = lake.access.map((site) => site.name?.trim())
    .filter((name) => name && !name.toLowerCase().includes("public access inventory"));
  sourceTasks.push(() => check(lake.sources.tpwdAccess.url, names, ["Public Access Facilities"]));
}
for (const guide of guides) {
  // Independent first-party URLs, no reviews/pricing/availability are inferred.
  sourceTasks.push(() => check(guide.url, [], ["fishing", "guide", "charter", "striper", "crappie", "bass"]));
}
sourceTasks.push(() => check("https://tpwd.texas.gov/fishboat/fish/recreational/fishreport.phtml", [], ["Weekly Fishing Reports"]));

// Two concurrent external requests with bounded retries across all official
// and first-party sources. This reduces TPWD connection throttling without
// weakening source-drift failures or exceeding the 12-minute job budget.
await runBoundedSourceChecks(sourceTasks, 2);
// Stable artifact ordering keeps source changes reviewable between scheduled
// cohorts even when HTTP requests finish out of order.
checked.sort((a, b) => a.url.localeCompare(b.url));
issues.sort((a, b) => a.source.localeCompare(b.source));
const report = { checkedAt, sourceCount: checked.length, reviewedNetworkLakes: network.length, reviewedNetworkChecked: batch.length, lakeGroups: access.length, facilityRecords: access.reduce((n, g) => n + g.facilities.length, 8), guideBusinesses: guides.length, maximumConcurrentRequests: 2, issues, checked };
fs.mkdirSync(".artifacts", { recursive: true });
fs.writeFileSync(path.join(".artifacts", "fishing-inventory-sources.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ checkedAt, sources: checked.length, facilities: report.facilityRecords, guides: guides.length, issues: issues.length, sample: issues.slice(0, 12) }, null, 2));
if (issues.length) process.exitCode = 1;
