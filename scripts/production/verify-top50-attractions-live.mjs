import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/**
 * Change-scoped AFTER deployment. No background scanning of unrelated pages,
 * no indexing submissions and no automatic editorial fact-date stamps.
 */
const source = fs.readFileSync("src/data/texas-top50-ranking.ts", "utf8");
const prefix = "export const TEXAS_TOP50_RANKING = ";
const start = source.indexOf(prefix);
assert.ok(start >= 0, "Top 50 canonical ranking missing");
const from = start + prefix.length;
const to = source.indexOf(" as const;", from);
assert.ok(to > from, "Top 50 ranking delimiter missing");
const attractions = JSON.parse(source.slice(from, to));
assert.equal(attractions.length, 50);
assert.equal(new Set(attractions.map((item) => item.href)).size, 50);

const origin = (process.env.PRODUCTION_ORIGIN ?? "https://texasdefined.com").replace(/\/$/, "");
const head = process.env.GITHUB_SHA ?? "manual";
const urls = [
  { rank: 0, name: "Top 50 Texas tourist attractions", href: "/explore/top-50-attractions" },
  ...attractions,
];
const newDestinations = new Set([
  "/destination/schlitterbahn-new-braunfels",
  "/destination/six-flags-over-texas",
  "/destination/seaworld-san-antonio",
  "/destination/six-flags-fiesta-texas",
  "/destination/congress-avenue-bridge-bat-colony",
]);
const heroCredits = new Map([
  ["/destination/schlitterbahn-new-braunfels", "ljpelletier"],
  ["/destination/six-flags-over-texas", "Rct247"],
  ["/destination/seaworld-san-antonio", "TheConduqtor"],
  ["/destination/six-flags-fiesta-texas", "Wacky Windjammer"],
  ["/destination/congress-avenue-bridge-bat-colony", "Aleksandr Zykov"],
]);
function getCanonical(html) {
  const candidates = html.match(/<link\b[^>]*>/gi) ?? [];
  const tag = candidates.find((item) => /\brel\s*=\s*["']canonical["']/i.test(item));
  return tag?.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1] ?? null;
}
function robotsNoindex(html) {
  const candidates = html.match(/<meta\b[^>]*>/gi) ?? [];
  return candidates.some((tag) => /\bname\s*=\s*["']robots["']/i.test(tag) && /noindex/i.test(tag));
}
function pathFromUrl(value) {
  try { return new URL(value, origin).pathname.replace(/\/$/, "") || "/"; }
  catch { return null; }
}
const jobs = [...urls];
const results = [];
const timeoutMs = 18000;
const concurrency = 5;
async function verify(item) {
  const url = new URL(item.href, origin);
  url.searchParams.set("authority_verify", head.slice(0, 12));
  const issues = [];
  try {
    const response = await fetch(url.toString(), {
      redirect: "follow",
      signal: AbortSignal.timeout(timeoutMs),
      headers: {
        "user-agent": "TexasDefinedAuthorityReleaseCheck/1.0 (+https://texasdefined.com/citation-guide)",
        "cache-control": "no-cache",
        accept: "text/html,application/xhtml+xml",
      },
    });
    const html = await response.text();
    if (response.status !== 200) issues.push(`HTTP ${response.status}`);
    if (!(response.headers.get("content-type") ?? "").includes("text/html")) issues.push("Non-HTML response");
    if (pathFromUrl(response.url) !== item.href) issues.push(`Redirected to ${response.url}`);
    if (html.length < 1800) issues.push("Unexpectedly short SSR HTML");
    const canonical = getCanonical(html);
    if (!canonical) issues.push("Missing canonical link");
    else if (pathFromUrl(canonical) !== item.href) issues.push(`Wrong canonical: ${canonical}`);
    const noindex = robotsNoindex(html);
    if (noindex && (item.rank === 0 || newDestinations.has(item.href))) issues.push("New canonical marked noindex");
    if (item.rank === 0 && (!html.includes("Top 50 Texas tourist attractions") || !html.includes("The Alamo"))) issues.push("Ranking heading/list absent");
    if (newDestinations.has(item.href)) {
      const author = heroCredits.get(item.href);
      if (author && !html.toLowerCase().includes(author.toLowerCase())) issues.push(`Photographer credit absent from rendered HTML: ${author}`);
      if (!html.includes("Official verification") && !html.includes("Common visitor questions")) issues.push("Source-linked visitor guidance not rendered");
    }
    return { rank: item.rank, name: item.name, href: item.href, status: response.status,
      finalUrl: response.url, canonical, noindex, htmlBytes: html.length, errors: issues };
  } catch (err) {
    return { rank: item.rank, name: item.name, href: item.href, status: 0,
      finalUrl: null, canonical: null, noindex: null, htmlBytes: 0,
      errors: [String(err?.message ?? err)] };
  }
}
async function worker() {
  while (jobs.length) {
    const item = jobs.shift();
    if (item) results.push(await verify(item));
  }
}
await Promise.all(Array.from({ length: concurrency }, () => worker()));
results.sort((a, b) => a.rank - b.rank);
const fails = results.filter((item) => item.errors.length);
const noindexExisting = results.filter((item) => item.noindex && !newDestinations.has(item.href) && item.rank > 0);
const report = {
  schemaVersion: 1, gitSha: head, checkedAt: new Date().toISOString(), origin,
  count: { checked: results.length, passed: results.length - fails.length, failed: fails.length, preExistingNoindex: noindexExisting.length },
  results,
};
const output = process.env.TOP50_LIVE_REPORT ?? "artifacts/top50-live-acceptance.json";
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(report, null, 2) + "\n");
console.log(`Top 50 live release check: ${report.count.passed}/51 HTML surfaces passed; ${noindexExisting.length} old surfaces noindex (reported, not silently changed).`);
for (const issue of fails) console.error(`FAIL #${issue.rank} ${issue.href}: ${issue.errors.join("; ")}`);
if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, [
    "## Texas Defined Top 50 — Live release check",
    `- Exact paths inspected: **${results.length}**`,
    `- Passed: **${report.count.passed}**`,
    `- Failed: **${fails.length}**`,
    `- Existing intentionally/otherwise noindexed pages: **${noindexExisting.length}**`,
    "",
    ...fails.map((item) => `- ${item.href} — ${item.errors.join("; ")}`),
    "",
  ].join("\n"));
}
if (fails.length) process.exitCode = 1;
