/**
 * Bounded TPWD source-integrity monitor for twelve editorial month examples.
 * Uses nine distinct official URLs, never changes a review date or rewrites claims.
 * --plan verifies the catalog and required official links without network access.
 * --remote validates actual TPWD text on scheduled/dispatch review.
 */
import fs from "node:fs";
const sourcePath = "src/data/fishing/monthly-editorial.ts";
const text = fs.readFileSync(sourcePath, "utf8");
const records = text.split("\n").filter((line) => /^\s*\{ slug: "/.test(line)).map((line) => ({
  month: line.match(/slug: "([^"]+)"/)?.[1],
  sourceUrl: line.match(/sourceUrl: "([^"]+)"/)?.[1],
  sourceLabel: line.match(/sourceLabel: "([^"]+)"/)?.[1],
  example: line.match(/example: "([^"]+)"/)?.[1],
}));
const expectedMonths = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
const errors = [];
const checks = [];
for (const month of expectedMonths) {
  const record = records.find((row) => row.month === month);
  if (!record || !record.sourceLabel || !record.example || record.example.length < 80) errors.push(month + ": missing substantive monthly source example");
  if (!record?.sourceUrl?.startsWith("https://tpwd.texas.gov/")) errors.push(month + ": not a primary TPWD URL");
}
if (records.length !== 12 || new Set(records.map((row) => row.month)).size !== 12) errors.push("Expected exactly 12 unique months");
const expectedAnchor = new Map([
  ["/lakes/corpus_christi/index.phtml", "nueces river channel"],
  ["/lakes/fork/", "mid-february to april"],
  ["/lakes/brazos/index.phtml", "late february through april"],
  ["/lakes/meredith/", "april through june"],
  ["/pwd_br_t3200_0022e/seasons.phtml", "october and november"],
  ["/lakes/lavon/", "early summer"],
  ["/lakes/sam_rayburn/", "hot summer"],
  ["/programs/neighborhood-fishin/", "not stocked in august"],
  ["/lakes/texana/", "december and january"],
]);
const urls = [...new Set(records.map((row) => row.sourceUrl).filter(Boolean))];
if (urls.length !== expectedAnchor.size) errors.push("Unique source inventory shifted; update anchor checks only after reviewing the official source.");
for (const url of urls) {
  const urlObject = new URL(url);
  if (urlObject.hostname !== "tpwd.texas.gov" || urlObject.protocol !== "https:") errors.push("Unexpected official source URL " + url);
  if (![...expectedAnchor.keys()].some((suffix) => urlObject.pathname.endsWith(suffix))) errors.push("Missing independently reviewed source anchor: " + url);
}
const remote = process.argv.includes("--remote");
function readable(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi," ")
    .replace(/<[^>]+>/g," ")
    .replace(/&(?:nbsp|#160);/gi," ")
    .replace(/&amp;/gi,"&")
    .replace(/\s+/g," ").trim().toLowerCase();
}
if (remote && !errors.length) {
  // Bounded sequential official-source check: only nine reviewed URLs.
  for (const url of urls) {
    const needle = [...expectedAnchor].find(([suffix]) => new URL(url).pathname.endsWith(suffix))?.[1];
    let last;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await fetch(url, {
          headers: { "user-agent": "TexasDefinedFishingSeasonsTPWDReview/1.0 (+https://texasdefined.com/fishing/seasons)" },
          signal: AbortSignal.timeout(18_000),
          redirect: "follow",
        });
        if (!response.ok) throw new Error("HTTP " + response.status);
        if (new URL(response.url).hostname !== "tpwd.texas.gov") throw new Error("Official source redirected to unexpected host");
        const content = readable((await response.text()).slice(0, 1000000));
        if (!content.includes(needle)) throw new Error("Source passage no longer matched: " + needle);
        checks.push({ url, anchor: needle, result: "matched" });
        last = null;
        break;
      } catch (error) {
        last = error;
        if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    }
    if (last) {
      checks.push({ url, anchor: needle, result: "review_required", error: String(last) });
      errors.push("Official source requires review: " + url + " — " + String(last));
    }
  }
}
const report = {
  checkedAt: new Date().toISOString(),
  remote,
  scope: "12 editorial month examples and 9 official TPWD source pages; source checks do not certify real-time lake fishing conditions",
  monthCount: records.length, sourceCount: urls.length, checks, errors,
};
fs.mkdirSync(".artifacts", { recursive: true });
fs.writeFileSync(".artifacts/fishing-seasons-tpwd-source-review.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
