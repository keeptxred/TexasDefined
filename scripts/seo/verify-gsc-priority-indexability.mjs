// Bounded, read-only Search Console priority-page smoke check.
// A Googlebot-style user-agent is NOT a Google-verified crawler or URL Inspection.
// This tests delivered HTML; only owner GSC can confirm actual index state.
import fs from "node:fs/promises";
import path from "node:path";

const ORIGIN = new URL(process.env.SITE_ORIGIN || "https://texasdefined.com").origin;
const OUT = process.env.REPORT_DIR || ".artifacts/seo/gsc-priority-pages";
const MANIFEST = "src/data/high-school-football/google-index-eligibility.generated.json";
const manifest = JSON.parse(await fs.readFile(MANIFEST, "utf8"));
const eligible = new Set(manifest.teamIndexableSlugs);
const TARGETS = [
  { path: "/destination/martin-creek-lake-state-park-rv-area", expected: "indexable", reason: "Nov 10 GSC: 25 impressions / avg position 16.08" },
  { path: "/destination/moody-gardens", expected: "indexable", reason: "Nov 10 GSC: 16 impressions / avg position 75.38" },
  { path: "/fishing", expected: "indexable", reason: "Nov 10 GSC: 3 impressions / avg position 37.33" },
  { path: "/explore/painted-churches", expected: "indexable", reason: "Nov 10 GSC: 2 impressions / avg position 6" },
  ...["comal-smithson-valley", "colorado-city-colorado"].map((slug) => ({
    path: "/texas-high-school-football-teams/" + slug,
    expected: eligible.has(slug) ? "indexable" : "google-noindex",
    reason: "Follow generated Google-only football eligibility manifest; never override it from one-day traffic",
  })),
];
const AGENTS = {
  normal: "Mozilla/5.0 (compatible; TexasDefinedIndexabilityAudit/1.0)",
  googlebotStyle: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
};
const errors = [];
const checked = [];
const clean = (value) => String(value || "").replaceAll("&amp;", "&");
const attr = (tag, name) => {
  const match = tag.match(new RegExp("\\b" + name + "\\s*=\\s*([\"'])(.*?)\\1", "i"));
  return clean(match?.[2] || "");
};
const findTags = (html, tag) => html.match(new RegExp("<" + tag + "\\b[^>]*>", "gi")) || [];
const challenge = /cf-chl|just a moment|attention required|captcha|access denied/i;
async function get(url, userAgent) {
  const response = await fetch(url, {
    redirect: "manual",
    headers: { "user-agent": userAgent, accept: "text/html,*/*;q=0.5", "cache-control": "no-cache" },
    signal: AbortSignal.timeout(20000),
  });
  const body = await response.text();
  return { status: response.status, contentType: response.headers.get("content-type") || "", xRobots: response.headers.get("x-robots-tag") || "", body };
}
function parseHtml(html, responseHeader) {
  const metas = findTags(html, "meta");
  const robots = metas.filter((tag) => attr(tag, "name").toLowerCase() === "robots").map((tag) => attr(tag, "content").toLowerCase()).join(",");
  const googlebot = metas.filter((tag) => attr(tag, "name").toLowerCase() === "googlebot").map((tag) => attr(tag, "content").toLowerCase()).join(",");
  const canonical = findTags(html, "link").find((tag) => attr(tag, "rel").toLowerCase().split(/\s+/).includes("canonical"));
  const header = responseHeader.toLowerCase();
  const googleHeaderNoindex = /googlebot:\s*[^,]*\bnoindex\b/.test(header);
  const genericHeaderNoindex = header.split(",").some((s) => !s.trim().startsWith("googlebot:") && /\bnoindex\b/.test(s));
  return {
    canonical: canonical ? attr(canonical, "href") : "",
    genericNoindex: /\bnoindex\b/.test(robots) || genericHeaderNoindex,
    googleNoindex: /\bnoindex\b/.test(googlebot) || /\bnoindex\b/.test(robots) || googleHeaderNoindex || genericHeaderNoindex,
  };
}
for (const target of TARGETS) {
  const url = ORIGIN + target.path;
  for (const [agent, ua] of Object.entries(AGENTS)) {
    try {
      const response = await get(url, ua);
      const meta = parseHtml(response.body, response.xRobots);
      const row = { url, expected: target.expected, agent, status: response.status, contentType: response.contentType, xRobots: response.xRobots, ...meta, reason: target.reason };
      checked.push(row);
      const prefix = target.path + " [" + agent + "]";
      if (response.status !== 200) errors.push(prefix + ": HTTP " + response.status);
      if (!/text\/html/i.test(response.contentType)) errors.push(prefix + ": not HTML");
      if (challenge.test(response.body.slice(0, 6000))) errors.push(prefix + ": challenge or access-denied content");
      if (response.body.length < 500) errors.push(prefix + ": unexpectedly short HTML");
      if (!meta.canonical || new URL(meta.canonical, ORIGIN).href !== url) errors.push(prefix + ": missing/mismatched self canonical (" + meta.canonical + ")");
      if (meta.genericNoindex) errors.push(prefix + ": generic robots noindex would hide page from Bing");
      if (target.expected === "indexable" && meta.googleNoindex) errors.push(prefix + ": protected indexable page has Google noindex");
      if (target.expected === "google-noindex" && !meta.googleNoindex) errors.push(prefix + ": staged football page lost Google-only noindex");
    } catch (error) {
      errors.push(target.path + " [" + agent + "]: fetch/parse error: " + String(error));
    }
  }
}
const report = {
  createdAt: new Date().toISOString(), origin: ORIGIN, targets: TARGETS.length, checked,
  errors, caveat: "Googlebot-style user agent is not a verified Googlebot request. HTTP/metadata parity is not proof of Google indexing or crawl scheduling. Finalized owner Search Console data remains necessary.",
};
await fs.mkdir(OUT, { recursive: true });
await fs.writeFile(path.join(OUT, "report.json"), JSON.stringify(report, null, 2) + "\n");
const markdown = [
  "# Google Search priority-page delivery check",
  "",
  "- Target URLs: " + TARGETS.length,
  "- Agent-specific HTML checks: " + checked.length + "/" + TARGETS.length * Object.keys(AGENTS).length,
  "- Findings: " + errors.length,
  "- Scope: selected pages only, no sitewide production crawl",
  "- Warning: a Googlebot-like user-agent does **not** prove authentic Googlebot delivery or search indexing",
  "",
  "| URL path | Expected Google policy | Reason |",
  "|---|---|---|",
  ...TARGETS.map((item) => "| " + item.path + " | " + item.expected + " | " + item.reason + " |"),
  "",
  "## Check failures",
  "",
  ...(errors.length ? errors.map((e) => "- " + e) : ["None found in the bounded HTTP delivery checks."]),
  "",
  "Actual Google indexing status, query-to-page attribution, crawl timestamps and 28-day performance require owner Search Console evidence; do not infer them from this test.",
];
await fs.writeFile(path.join(OUT, "summary.md"), markdown.join("\n") + "\n");
console.log(markdown.join("\n"));
if (errors.length) process.exitCode = 1;
