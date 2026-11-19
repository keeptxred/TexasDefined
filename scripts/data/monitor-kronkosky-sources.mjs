import fs from "node:fs";
import crypto from "node:crypto";

/**
 * Read-only, daily operator-and-publication monitor.
 * Does NOT infer that an opening announcement guarantees entry. Changes, access
 * inconsistencies and dated reviews are sent to a single GitHub editorial issue.
 * Never restamp sourceCheckedAt, change prices, or auto-publish unverified facts.
 */
const ROOT = "https://texasdefined.com";
const SLUG = "albert-bessie-kronkosky-state-natural-area";
const PATH = "/destination/" + SLUG;
const PRESS = "https://tpwd.texas.gov/newsmedia/releases/?req=20261118a";
const ALERT = "https://tpwd.texas.gov/state-parks/albert-bessie-kronkosky/park-alert";
const PARK = "https://tpwd.texas.gov/state-parks/albert-bessie-kronkosky";
const sources = [
  ["TPWD_RELEASE", PRESS],
  ["TPWD_ALERT", ALERT],
  ["TPWD_PARK", PARK],
  ["PUBLISHED_CLEAN", ROOT + PATH],
  ["PUBLISHED_NONCE", ROOT + PATH + "?kronkosky-source-check=" + Date.now()],
  ["PUBLIC_SITEMAP", ROOT + "/sitemap-explore.xml"],
];
const issues = [];
const seen = {};
const report = { checkedAt: new Date().toISOString(), sources: [], issues };
const add = (type, detail) => issues.push(type + " " + detail);
const normalize = html => html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;|&#160;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/\s+/g, " ").trim();
async function load(name, url) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { Accept: "text/html,application/xml;q=0.9", "User-Agent": "TexasDefined-OfficialSourceReview/1.0" },
        signal: AbortSignal.timeout(20000), redirect: "follow",
      });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const html = await response.text();
      if (html.length < 500 || html.length > 9000000) throw new Error("Implausible response length " + html.length);
      seen[name] = { html, text: normalize(html) };
      report.sources.push({ name, url, status: response.status, bytes: html.length,
        hash: crypto.createHash("sha256").update(html).digest("hex"),
        cfCache: response.headers.get("cf-cache-status") });
      return;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise(resolve => setTimeout(resolve, 700 * attempt));
    }
  }
  add("SOURCE_UNAVAILABLE", name + " " + String(lastError));
}
await Promise.all(sources.map(([name, url]) => load(name, url)));
const press = seen.TPWD_RELEASE?.text ?? "";
const alert = seen.TPWD_ALERT?.text ?? "";
const park = seen.TPWD_PARK?.text ?? "";
const page = seen.PUBLISHED_CLEAN?.html ?? "";
const nonce = seen.PUBLISHED_NONCE?.html ?? "";
const sitemap = seen.PUBLIC_SITEMAP?.html ?? "";
if (press && !/Dec\.?\s*1\b/i.test(press)) add("SOURCE_CHANGED", "TPWD_RELEASE missing scheduled December 1");
if (press && !/Dec\.?\s*15\b/i.test(press)) add("SOURCE_CHANGED", "TPWD_RELEASE missing scheduled December 15");
if (press && !/26\s+miles/i.test(press)) add("SOURCE_CHANGED", "TPWD_RELEASE missing 26-mile network");
if (alert) {
  const announcement = alert.match(/Park Alert\s+Park Opening\s+(.{0,1100}?)\s+Check back for updates/i)?.[1] ?? "";
  const expected = "Nov. 18, 2026 - The park will open for day use on Dec. 1, 2026. Camping and lodging will be available beginning Dec. 15, 2026 with reservations opening Dec. 1.";
  const cleaned = value => value.replace(/\s+/g, " ").trim().replace(/[–—]/g, "-");
  if (!announcement || !cleaned(announcement).includes(cleaned(expected))) {
    add("SOURCE_CHANGED", "TPWD_ALERT content differs from manually reviewed Nov. 18 park opening announcement");
  }
}
if (park && !/7754 State Highway 46/i.test(park)) add("SOURCE_CHANGED", "TPWD_PARK entrance address may have changed");
if (park && !/\$6\s+Daily/i.test(park)) add("SOURCE_CHANGED", "TPWD_PARK day-use fee may have changed");
for (const [label, html] of [["CLEAN", page], ["NONCE", nonce]]) {
  if (!html) continue;
  if (!html.includes("December 1, 2026") || !html.includes("December 15")) add("PUBLIC_STALE", label + " opening dates missing");
  if (!html.includes("ABK_SNA_Entrance_2026.jpg")) add("PUBLIC_STALE", label + " exact-location hero missing");
  if (!html.includes("7754 State Highway 46")) add("PUBLIC_STALE", label + " corrected address missing");
  if (html.includes("no opening date has been announced") || html.includes("currently under development and not yet open for ordinary public visitation")) {
    add("PUBLIC_STALE", label + " still serves obsolete closed-park story");
  }
  if (/<meta\b[^>]*name=["']robots["'][^>]*noindex/i.test(html)) add("PUBLIC_STALE", label + " robots noindex");
}
if (sitemap && !sitemap.includes("<loc>" + ROOT + PATH + "</loc>")) add("PUBLIC_STALE", "Explore sitemap missing canonical park URL");
const sourceFile = fs.readFileSync("src/data/kronkosky-state-natural-area-authority.ts", "utf8");
const checked = sourceFile.match(/const CHECKED = "(\d{4}-\d{2}-\d{2})"/)?.[1];
if (!checked) add("SOURCE_REVIEW", "Missing sourceCheckedAt anchor");
const current = Date.now();
const reviewed = checked ? Date.parse(checked + "T00:00:00Z") : 0;
if (reviewed && current - reviewed > 90 * 86400000) add("SOURCE_REVIEW", "Quarterly editorial verification due; last " + checked);
if (current >= Date.parse("2026-12-01T06:00:00Z") && reviewed < Date.parse("2026-12-01T00:00:00Z")) {
  add("SOURCE_REVIEW", "Dec 1 public-access checkpoint must be verified against actual TPWD operation (source last reviewed " + checked + ")");
}
if (current >= Date.parse("2026-12-15T06:00:00Z") && reviewed < Date.parse("2026-12-15T00:00:00Z")) {
  add("SOURCE_REVIEW", "Dec 15 overnight-operation checkpoint must be verified against current site and reservation inventory");
}
fs.mkdirSync(".artifacts", { recursive: true });
fs.writeFileSync(".artifacts/kronkosky-source-review.json", JSON.stringify(report, null, 2) + "\n");
if (issues.length) for (const issue of issues) console.log(issue);
else console.log("Kronkosky source, clean page, nonce page, sitemap and review checkpoints: PASS");
