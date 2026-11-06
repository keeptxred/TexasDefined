// Daily, bounded production acceptance for the reported 42 pairs.
// 13 actual URLs (9 fishing techniques + Mavericks, Spurs, Stars and /events),
// six sports/events pairs and 36 fishing-technique pairs.
// Shared navigation or generic vocabulary is not a canonicalization rule.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const origin = (process.env.TEXASDEFINED_BASE_URL || "https://texasdefined.com").replace(/\/+$/, "");
const fishingSlugs = ["soft-plastics", "crankbaits", "spinnerbaits", "topwater",
  "trolling", "vertical-jigging", "jigs-and-minnows", "live-bait", "cut-bait"];
const otherPaths = ["/sports/teams/dallas-mavericks", "/sports/teams/san-antonio-spurs",
  "/sports/teams/dallas-stars", "/events"];
const fishingPaths = fishingSlugs.map((slug) => "/fishing/techniques/" + slug);
const paths = [...otherPaths, ...fishingPaths];
const failures = [];
const records = [];

function attribute(tag, attr) {
  const match = tag.match(new RegExp("\\b" + attr + "\\s*=\\s*([\"'])(.*?)\\1", "i"));
  return match?.[2] ?? null;
}
function decodeEntities(text) {
  return text.replace(/&(?:amp|nbsp|lt|gt|quot|apos|#39|#x27|#x2019|#8217);/gi, (entity) => ({
    "&amp;": "&", "&nbsp;": " ", "&lt;": "<", "&gt;": ">", "&quot;": "\"",
    "&apos;": "'", "&#39;": "'", "&#x27;": "'", "&#x2019;": "'", "&#8217;": "'",
  }[entity.toLowerCase()] ?? entity));
}
function visibleText(html) {
  const raw = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]
    ?? html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  return decodeEntities(raw
    .replace(/<(?:script|style|noscript|svg)\b[^>]*>[\s\S]*?<\/(?:script|style|noscript|svg)>/gi, " ")
    .replace(/<(?:nav|footer)\b[^>]*>[\s\S]*?<\/(?:nav|footer)>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ").trim());
}
function editorialTerms(text) {
  const stop = new Set(["this", "that", "when", "with", "from", "where", "then", "more",
    "your", "they", "into", "across", "around", "over", "well", "than", "also",
    "their", "some", "most", "which", "have", "what", "before"]);
  return new Set((text.toLowerCase().match(/[a-z]{4,}/g) || []).filter((term) => !stop.has(term)));
}
function similarity(a, b) {
  const left = editorialTerms(a), right = editorialTerms(b);
  if (!left.size || !right.size) return null;
  return Math.round(100 * [...left].filter((word) => right.has(word)).length / Math.min(left.size, right.size));
}
async function check(path) {
  const url = origin + path;
  try {
    const response = await fetch(url, {
      headers: { Accept: "text/html", "User-Agent": "TexasDefined-Quality-Watchdog/1.0" },
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const html = await response.text();
    const canonicals = [...html.matchAll(/<link\b[^>]*>/gi)]
      .map((match) => match[0])
      .filter((tag) => /\brel\s*=\s*["']canonical["']/i.test(tag))
      .map((tag) => attribute(tag, "href"));
    const expectedCanonical = "https://texasdefined.com" + path;
    if (canonicals.length !== 1 || canonicals[0] !== expectedCanonical)
      failures.push(path + ": wrong/missing canonical: " + JSON.stringify(canonicals));
    const heading = decodeEntities(
      (html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "").replace(/<[^>]+>/g, " ").trim(),
    );
    const expectedTitle = path === "/events" ? "happening across Texas" :
      path.startsWith("/sports/teams/") ? path.split("/").pop().split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join(" ") :
      path.split("/").pop().split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join(" ");
    if (!heading.toLowerCase().includes(expectedTitle.toLowerCase()))
      failures.push(path + ": unexpected H1 " + JSON.stringify(heading));
    const text = visibleText(html);
    const sources = text.match(/Open official\/source page/g)?.length ?? 0;
    if (path.startsWith("/fishing/techniques/")) {
      if (!text.includes("Sources and Verification") || !text.includes("Browse all Texas fishing lake guides"))
        failures.push(path + ": missing source or lake-directory navigation");
      if (!text.includes("source-backed lake-technique relationships"))
        failures.push(path + ": lost full verified relationship count");
      if (sources > 20) failures.push(path + ": " + sources + " repeated source cards (maximum 20)");
      if (/is included in TPWD-backed fishing guidance|is documented in the verified/i.test(text))
        failures.push(path + ": generic TPWD relationship prose still rendered");
    }
    records.push({ path, status: response.status, canonical: canonicals, h1: heading, sourceCards: sources,
      visibleWords: text.split(/\s+/).length, visibleText: text });
    console.log("PASS " + path + " — " + heading + ", " + sources + " source references");
  } catch (error) {
    failures.push(path + ": " + String(error?.message || error));
  }
}
for (let i = 0; i < paths.length; i += 3) await Promise.all(paths.slice(i, i + 3).map(check));

const pairs = [];
function compare(group) {
  for (let i = 0; i < group.length; i++) for (let j = i + 1; j < group.length; j++) {
    const a = records.find((row) => row.path === group[i]);
    const b = records.find((row) => row.path === group[j]);
    if (!a || !b) continue;
    if (a.canonical[0] === b.canonical[0] || a.h1 === b.h1)
      failures.push(a.path + " vs " + b.path + ": same canonical or heading despite distinct intents");
    pairs.push({ left: a.path, right: b.path, mainTextTermOverlapPercent: similarity(a.visibleText, b.visibleText) });
  }
}
compare(otherPaths);
compare(fishingPaths);
if (records.length === 13 && pairs.length !== 42) failures.push("Expected exactly 42 complete live comparisons, got " + pairs.length);
const reportPath = ".artifacts/42-page-pair-production.json";
mkdirSync(dirname(reportPath), { recursive: true });
writeFileSync(reportPath, JSON.stringify({
  checkedAt: new Date().toISOString(), origin, urlCount: records.length, pairCount: pairs.length,
  passed: failures.length === 0, failures,
  pages: records.map(({ visibleText: _, ...row }) => row),
  // Context-only metric; repeated site chrome and similar vocabulary are NOT automatic duplicate-canonical reasons.
  pairs,
}, null, 2));
if (failures.length) {
  for (const failure of failures) console.error("FAIL " + failure);
  process.exitCode = 1;
} else console.log("PASS: 13 live canonical pages and all 42 distinct-title/canonical combinations; source boilerplate limits enforced.");
