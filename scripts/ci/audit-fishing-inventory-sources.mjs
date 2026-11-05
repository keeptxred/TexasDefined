import fs from "node:fs";
import path from "node:path";

const access = JSON.parse(fs.readFileSync("src/data/fishing/curated-access-sites.json", "utf8"));
const guides = JSON.parse(fs.readFileSync("src/data/fishing/curated-fishing-guide-businesses.json", "utf8"));
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
    const response = await fetch(url, { headers: { "User-Agent": "TexasDefinedSourceIntegrity/1.0 (+https://texasdefined.com/fishing)" }, redirect: "follow", signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error("HTTP " + response.status);
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
for (const lake of access) {
  await check("https://tpwd.texas.gov/fishboat/fish/recreational/lakes/" + lake.tpwd + "/" + (lake.sourcePage ?? "access.phtml"), lake.facilities.map(([name]) => name), ["Public Access Facilities"]);
}
for (const guide of guides) {
  // Independent first-party URLs, no reviews/pricing/availability are inferred.
  await check(guide.url, [], ["fishing", "guide", "charter", "striper", "crappie", "bass"]);
}
await check("https://tpwd.texas.gov/fishboat/fish/recreational/fishreport.phtml", [], ["Weekly Fishing Reports"]);
const report = { checkedAt, sourceCount: checked.length, lakeGroups: access.length, facilityRecords: access.reduce((n, g) => n + g.facilities.length, 8), guideBusinesses: guides.length, issues, checked };
fs.mkdirSync(".artifacts", { recursive: true });
fs.writeFileSync(path.join(".artifacts", "fishing-inventory-sources.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ checkedAt, sources: checked.length, facilities: report.facilityRecords, guides: guides.length, issues: issues.length, sample: issues.slice(0, 12) }, null, 2));
if (issues.length) process.exitCode = 1;
