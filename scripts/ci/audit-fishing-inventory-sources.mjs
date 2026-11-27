import fs from "node:fs";
import path from "node:path";
import { runBoundedSourceChecks } from "./run-bounded-source-checks.mjs";
import { sourceForFishingGuideReview, isSameOperatorOrigin, officialFishingGuideSingleRowMatches } from "./fishing-operator-source-witnesses.mjs";

const access = JSON.parse(fs.readFileSync("src/data/fishing/curated-access-sites.json", "utf8"));
const guides = JSON.parse(fs.readFileSync("src/data/fishing/curated-fishing-guide-businesses.json", "utf8"));
const officialWitnesses = JSON.parse(fs.readFileSync("scripts/ci/fishing-access-source-witnesses.json", "utf8"));
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
async function check(url, names = [], textHints = [], requiredEvidence = [], enforceOperatorOrigin = false, requireGovernmentRow = false, evidenceScope = "direct-source") {
  try {
    // TPWD intermittently resets groups of automated connections. Preserve the
    // source-integrity gate while using a bounded two-attempt backoff: a failed
    // provider is still an issue, never silently treated as verified.
    let response;
    // Operator sites can occasionally exceed the normal network timeout on
    // GitHub-hosted runners. Only connection/429/5xx failures get a bounded
    // third attempt; a missing/changed official source still fails closed.
    const maximumAttempts = url.startsWith("https://tpwd.texas.gov/") ? 2 : 3;
    for (let attempt = 1; attempt <= maximumAttempts; attempt++) {
      try {
        response = await fetch(url, { headers: { "User-Agent": "TexasDefinedSourceIntegrity/1.0 (+https://texasdefined.com/fishing)", Accept: "text/html" }, redirect: "follow", signal: AbortSignal.timeout(url.startsWith("https://tpwd.texas.gov/") ? 16000 : 20000) });
        if (!response.ok) {
          const status = response.status;
          await response.body?.cancel();
          if (status === 429 || status >= 500) throw new Error("Retryable HTTP " + status);
          throw Object.assign(new Error("HTTP " + status), { nonRetryable: true });
        }
        if (enforceOperatorOrigin && !isSameOperatorOrigin(url, response.url)) {
          await response.body?.cancel();
          throw Object.assign(new Error("Operator source redirected outside reviewed first-party origin"), { nonRetryable: true });
        }
        break;
      } catch (failure) {
        if (attempt >= maximumAttempts || failure?.nonRetryable) {
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
    const missingEvidence = requiredEvidence.filter((fact) => !normalized.includes(normalize(fact)));
    const governmentRowMissing = requireGovernmentRow && !officialFishingGuideSingleRowMatches(content, requiredEvidence);
    if (missing.length || hintsMissing || missingEvidence.length || governmentRowMissing) issues.push({
      source: url, missingFacilityNames: missing, missingOfficialFacts: missingEvidence,
      pageTypeMismatch: Boolean(hintsMissing), governmentRowMissing,
    });
    checked.push({ url, evidenceScope, http: response.status, namesChecked: names.length, missing: missing.length,
      missingOfficialFacts: missingEvidence.length, pageTypeMismatch: Boolean(hintsMissing), governmentRowMissing });
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
// Never accept an unmatched editorial-to-official alias: a rename or a removed
// lake must fail loudly. The alternate pages are exact verified agency URLs,
// not arbitrary user URLs or blanket synonyms.
const networkBySlug = new Map(network.map((lake) => [lake.slug, lake]));
const approvedAlternateOrigins = new Set(["https://tpwd.texas.gov", "https://www.sweetwatertx.gov"]);
for (const [slug, sites] of Object.entries(officialWitnesses)) {
  const lake = networkBySlug.get(slug);
  if (!lake) throw new Error("Official source witnesses refer to an unreviewed/removed lake " + slug);
  const names = new Set(lake.access.map((site) => site.name));
  for (const [editorialName, witness] of Object.entries(sites)) {
    if (!names.has(editorialName)) throw new Error(slug + ": stale official source witness " + editorialName);
    if (!witness.name || typeof witness.name !== "string" || witness.name.length < 3 ||
        (witness.requires && (!Array.isArray(witness.requires) || witness.requires.some((fact) => typeof fact !== "string" || fact.length < 4)))) {
      throw new Error(slug + ": ungrounded official source witness " + editorialName);
    }
    if (witness.url && !approvedAlternateOrigins.has(new URL(witness.url).origin)) {
      throw new Error(slug + ": witness must cite a verified TPWD or municipal source");
    }
  }
}
const cohort = new Date().getUTCDay() === 4 ? 1 : 0;
// On witness changes, PR checks cover all 15 independently researched
// exception groups. Scheduled Mon/Thu scans still cover every existing group.
const batch = process.env.GITHUB_EVENT_NAME === "pull_request"
  ? network.filter((lake) => Boolean(officialWitnesses[lake.slug]))
  : network.filter((_, i) => i % 2 === cohort);
for (const lake of batch) {
  const names = lake.access.map((site) => site.name?.trim())
    .filter((name) => name && !name.toLowerCase().includes("public access inventory"));
  const lakeWitnesses = officialWitnesses[lake.slug] ?? {};
  const sourceUrl = lake.sources.tpwdAccess.url;
  const direct = { names: [], required: [] };
  const alternate = new Map();
  for (const name of names) {
    const witness = lakeWitnesses[name];
    const target = witness?.url && witness.url !== sourceUrl
      ? (alternate.get(witness.url) ?? { names: [], required: [] })
      : direct;
    target.names.push(witness?.name ?? name);
    if (witness?.requires) target.required.push(...witness.requires);
    if (witness?.url && witness.url !== sourceUrl) alternate.set(witness.url, target);
  }
  sourceTasks.push(() => check(sourceUrl, direct.names, ["Public Access Facilities"], direct.required));
  for (const [url, group] of alternate) {
    sourceTasks.push(() => check(url, group.names, [], group.required));
  }
}
for (const guide of guides) {
  // A source-reviewed same-origin operator detail URL can corroborate identity
  // where the general homepage is flaky or shows a generic/challenge document.
  // This is still the official operator website, not a copied or paid listing.
  const witness = sourceForFishingGuideReview(guide);
  // If the original operator host times out on both GitHub architectures,
  // the agency license roster or attributed historical agency report verifies identity only,
  // NOT current phone, operator site availability, license status from the report, or trip prices.
  sourceTasks.push(() => check(witness.url, [], ["fishing", "guide", "charter", "striper", "crappie", "bass"],
    witness.identity, witness.identity.length > 0, witness.sourceKind === "government-license", witness.sourceKind ?? "operator-homepage"));
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
const report = { checkedAt, sourceCount: checked.length, reviewedNetworkLakes: network.length, reviewedNetworkChecked: batch.length, officialWitnessGroups: Object.keys(officialWitnesses).length, lakeGroups: access.length, facilityRecords: access.reduce((n, g) => n + g.facilities.length, 8), guideBusinesses: guides.length, maximumConcurrentRequests: 2, issues, checked };
fs.mkdirSync(".artifacts", { recursive: true });
fs.writeFileSync(path.join(".artifacts", "fishing-inventory-sources.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ checkedAt, sources: checked.length, facilities: report.facilityRecords, guides: guides.length, issues: issues.length, sample: issues.slice(0, 12) }, null, 2));
if (issues.length) process.exitCode = 1;
