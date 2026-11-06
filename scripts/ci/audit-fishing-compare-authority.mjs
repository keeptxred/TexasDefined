/**
 * Bounded official-source verification for /fishing/compare.
 * Scheduled by the existing fishing-lakes-directory-refresh GitHub workflow.
 * Never silently rewrites grades, advisories or source review dates.
 */
import fs from "node:fs";

const network = fs.readFileSync("src/data/fishing/statewide-lake-network.ts", "utf8");
const expanded = fs.readFileSync("src/data/fishing/lake-expansion-fixtures.ts", "utf8");
const compare = fs.readFileSync("src/lazy/fishing-compare.tsx", "utf8");
const server = fs.readFileSync("src/data/fishing/planner-data.server.ts", "utf8");
const checks = [], errors = [];
const at = new Date().toISOString();
function requireContract(ok, message) { if (!ok) errors.push(message); }
function getLakeBlock(slug) {
  const start = network.indexOf('    slug: "' + slug + '", name:');
  if (start < 0) throw new Error("Missing lake definition: " + slug);
  const end = network.indexOf("\n  {", start + 10);
  return network.slice(start, end < 0 ? undefined : end);
}
const expected = [
  { slug: "alan-henry-reservoir", tpwdSlug: "alan_henry", grades: { "Largemouth Bass": "Good", "Catfish": "Good", "Spotted Bass": "Good", "Crappie": "Poor" } },
  { slug: "amistad-reservoir", tpwdSlug: "amistad", grades: { "Largemouth Bass": "Excellent", "Catfish": "Good", "Striped Bass": "Good", "White Bass": "Good" } },
  { slug: "aquilla-lake", tpwdSlug: "aquilla", grades: { "Largemouth Bass": "Fair", "Catfish": "Good", "Crappie": "Good", "White Bass": "Fair" } },
];
const speciesIds = { "Largemouth Bass": "largemouth-bass", Catfish: "catfish", "Spotted Bass": "spotted-bass", Crappie: "crappie", "Striped Bass": "striped-bass", "White Bass": "white-bass" };
for (const entry of expected) {
  const isExpanded = entry.slug === "amistad-reservoir";
  const lake = isExpanded ? expanded : getLakeBlock(entry.slug);
  for (const [name, grade] of Object.entries(entry.grades)) {
    const speciesId = speciesIds[name];
    const re = isExpanded
      ? new RegExp('relation\\(\\{[^\\n]*lakeId: "amistad-reservoir", speciesId: "' + speciesId + '"[^\\n]*quality: "(excellent|good|fair|poor)"')
      : new RegExp('fish\\("' + speciesId + '","[^"]+","(excellent|good|fair|poor)"');
    const found = lake.match(re)?.[1];
    requireContract(found === grade.toLowerCase(), entry.slug + ": " + name + " published " + (found || "missing") + ", expected " + grade);
  }
}
for (const [file, tokens] of [
  [compare, ["Source-backed fishery grades", "Recorded access, not open-now status", "Official lake level and conditions", "Reviewed source dates", "Regulations, hazards and launch restrictions", "Verified guides (local fishing businesses)", "does not accept paid weighting", "aria-label=\"Lake comparison table\""]],
  [server, ["LAKE_AUTHORITY_RESEARCH_WAVE1", "comparisonAuthority", "accessReviewedAt", "fisheryReviewedAt", "importantAdvisories", "operatorConditionsSource", "Historical open/closed descriptions may be obsolete"]],
]) for (const token of tokens) requireContract(file.includes(token), "Missing compare source contract " + token);
checks.push({ kind: "local-contract", status: errors.length ? "failed" : "matched" });

function toText(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&").replace(/\s+/g, " ").trim();
}
async function readOfficial(url) {
  const response = await fetch(url, { headers: { "User-Agent": "TexasDefinedSourceMonitor/1.0 (+https://texasdefined.com/fishing/compare)", Accept: "text/html" }, redirect: "follow", signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error("HTTP " + response.status);
  const finalUrl = new URL(response.url);
  if (finalUrl.protocol !== "https:" || !["tpwd.texas.gov", "www.nps.gov"].includes(finalUrl.hostname)) throw new Error("Unexpected official source host " + response.url);
  return toText((await response.text()).slice(0, 900000));
}
async function checkTpWd(entry) {
  const url = "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/" + entry.tpwdSlug + "/";
  try {
    const text = await readOfficial(url);
    const begin = text.lastIndexOf("Angling Opportunities"), end = text.indexOf("Fishing Cover", begin);
    if (begin < 0 || end <= begin) throw new Error("TPWD angling-table headings changed");
    const section = text.slice(begin, end), mismatches = [];
    for (const [species, expectedGrade] of Object.entries(entry.grades)) {
      const re = new RegExp("(?:^|\\s)" + species.replace(/[\W]/g, "\\$&") + "\\s+(Poor|Fair|Good|Excellent)(?:\\s|$)", "i");
      const official = section.match(re)?.[1];
      if (!official) mismatches.push(species + " quality grade not parseable");
      else if (official.toLowerCase() !== expectedGrade.toLowerCase()) mismatches.push(species + " official=" + official + " source=" + expectedGrade);
    }
    checks.push({ kind: "tpwd-fishery", lake: entry.slug, url, status: mismatches.length ? "review_required" : "matched", mismatches });
    errors.push(...mismatches.map((message) => entry.slug + ": " + message));
  } catch (error) { checks.push({ kind: "tpwd-fishery", lake: entry.slug, url, status: "review_required", error: String(error) }); errors.push(entry.slug + ": " + String(error)); }
}
if (process.argv.includes("--remote")) {
  for (const entry of expected) await checkTpWd(entry);
  const url = "https://www.nps.gov/amis/planyourvisit/conditions.htm";
  try {
    const text = await readOfficial(url);
    if (!/Boat Ramp Status|boat ramps/i.test(text) || !/Diablo East/i.test(text)) throw new Error("NPS status headings changed");
    checks.push({ kind: "nps-access", lake: "amistad-reservoir", url, status: "source-reachable-not-live-status-certified" });
  } catch (error) { checks.push({ kind: "nps-access", url, status: "review_required", error: String(error) }); errors.push("Amistad NPS: " + String(error)); }
}
fs.mkdirSync(".artifacts", { recursive: true });
const report = { checkedAt: at, mode: process.argv.includes("--remote") ? "remote" : "local", scope: "Three TPWD fishery baseline profiles and NPS Amistad source identity, plus source-contract checks. The existing 72-lake rotation separately checks official URLs. No claim of full 72-lake grade recertification or live ramp monitoring.", checks, errors };
fs.writeFileSync(".artifacts/fishing-compare-authority-check.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ at, mode: report.mode, results: checks, errors }, null, 2));
if (errors.length) process.exitCode = 1;
