#!/usr/bin/env node
/**
 * THC National Register watch: no LLM, no credential, no auto-publication.
 * Offline mode guards editorial status invariants. --live uses only the
 * publicly accessible THC listing to report newly listed/changed names.
 *
 * Exit 2: authoritative-source drift that needs researched correction.
 * Exit 1: source could not be checked; NEVER claim that the site is unchanged.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const catalogPath = path.join(root, "src/data/thc-recent-landmarks.ts");
const pagePath = path.join(root, "src/routes/texas-historic-landmarks.lazy.tsx");
const headPath = path.join(root, "src/routes/texas-historic-landmarks.tsx");
const source = "https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places";
const months = "(?:January|February|March|April|May|June|July|August|September|October|November|December)";
const code = fs.readFileSync(catalogPath, "utf8");
const page = fs.readFileSync(pagePath, "utf8");
const head = fs.readFileSync(headPath, "utf8");

function block(name) {
  const prefix = `export const ${name} = `;
  const start = code.indexOf(prefix);
  if (start < 0) throw Error(`Missing catalog block ${name}`);
  const open = code.indexOf("`", start);
  const close = code.indexOf("`", open + 1);
  if (open < 0 || close < 0) throw Error(`Unclosed catalog block ${name}`);
  return code.slice(open + 1, close).trim().split("\n").filter(Boolean);
}
function normalize(name) {
  return name
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘]/g, "'").replace(/&amp;/g, "&")
    .replace(/\([^)]*(?:boundary|amendment)[^)]*\)/gi, "")
    .replace(/[^a-z0-9]+/gi, " ").trim().replace(/ +/g, " ").toLowerCase();
}
function decodeHtml(text) {
  return text.replace(/&(?:nbsp|#160);/gi, " ")
    .replace(/&amp;/gi, "&").replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&ndash;|&mdash;/gi, "–")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

// Detect the nearest visible official heading, allowing HTML entities, zero-width
// characters and CMS markup between its words. A guessed date never overrides
// the source: mismatches remain explicit source-drift failures.
function visibleListingText(markup) {
  return decodeHtml(markup.replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(?:script|style)\b[^>]*>[\s\S]*?<\/(?:script|style)>/gi, " ")
    .replace(/<[^>]*>/g, " "))
    .replace(/&(?:nbsp|ensp|emsp|thinsp|hairsp|zwnj|zwj|lrm|rlm);?/gi, " ")
    .replace(/&#(?:x0*200[b-d]|0*820[3-5]);?/gi, " ")
    .replace(/[\u00a0\u2000-\u200f\u202f\u2060\ufeff]/g, " ")
    .replace(/\s+/g, " ");
}
function listingHeadingMatches(markupBeforeLink) {
  const visible = visibleListingText(markupBeforeLink);
  const regex = new RegExp(`\\bListed[^a-zA-Z0-9]{0,80}(${months})[^a-zA-Z0-9]{0,30}(20\\d{2})\\b`, "gi");
  return [...visible.matchAll(regex)].map((match) => ({ month: match[1], year: Number(match[2]), offset: match.index }));
}
function nearestListingDate(markupBeforeLink) {
  const heading = listingHeadingMatches(markupBeforeLink).at(-1);
  return heading ? { month: heading.month, year: heading.year } : null;
}
// Pending nomination stages are separate from National Register listing status.
// Track official stage transitions automatically without publishing attractions.
function extractPendingSections(html) {
  const visible = decodeHtml(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]*>/g, " "))
    .replace(/[\u00a0\s]+/g, " ").toLowerCase();
  const start = visible.indexOf("submitted to the national park service");
  const middle = visible.indexOf("final draft in progress", start);
  const finish = visible.indexOf("recent listings and nomination search", middle);
  if (start < 0 || middle <= start || finish <= middle) {
    throw Error("Official pending nomination headings absent or reordered; stage comparison unverified");
  }
  return { submitted: normalize(visible.slice(start, middle)), review: normalize(visible.slice(middle, finish)) };
}

function observedPendingStage(name, sections) {
  // The official page inserts county details inside the Chambersea label.
  const query = name === "Chambersea (relocation proposal)" ? "chambersea" : normalize(name);
  const isSubmitted = sections.submitted.includes(query);
  const isReview = sections.review.includes(query);
  return isSubmitted && isReview ? "ambiguous" : isSubmitted ? "submitted" : isReview ? "review" : "missing";
}
const listed = block("THC_RECENT_LISTED_RAW").map((line) => {
  const parts = line.split("|");
  if (parts.length !== 6) throw Error(`Malformed listed entry: ${line}`);
  const [year, month, name, town, county, kind] = parts;
  return { year: Number(year), month, name, town, county, kind };
});
const pending = block("THC_PENDING_RAW").map((line) => {
  const parts = line.split("|");
  if (parts.length !== 4) throw Error(`Malformed nomination: ${line}`);
  const [name, town, county, stage] = parts;
  return { name, town, county, stage };
});
const errors = [];
const known = new Set();
for (const entry of listed) {
  const key = normalize(entry.name);
  if (known.has(key)) errors.push(`Duplicate listed property: ${entry.name}`);
  known.add(key);
  if (![2025, 2026].includes(entry.year)) errors.push(`Unexpected listing year: ${entry.name}`);
  if (!new RegExp(`^${months}$`).test(entry.month)) errors.push(`Bad month for ${entry.name}`);
  if (!entry.town || !entry.county || !entry.kind) errors.push(`Missing location or kind: ${entry.name}`);
}
for (const entry of pending) {
  if (known.has(normalize(entry.name))) errors.push(`Pending property also called listed: ${entry.name}`);
  if (!["submitted", "review"].includes(entry.stage)) errors.push(`Bad nomination stage: ${entry.name}`);
}
if (listed.length < 60 || pending.length < 15) errors.push("Official listing baseline unexpectedly truncated");
if (!head.includes("CollectionPage") || !page.includes("thcRecentListedLandmarks") ||
    !page.includes("thcPendingLandmarks") || !page.includes("National Register")) errors.push("Research route/status disclosure removed");
// Regression: official listing headings can separate Listed/month with tags or &nbsp;.
const julyFixture = nearestListingDate("<h4>Listed&nbsp;August 2026</h4><h4><strong>Listed</strong>&nbsp;<span>July</span>&#8203; 2026</h4>");
if (julyFixture?.month !== "July" || julyFixture.year !== 2026) errors.push("THC listing month HTML parsing regression");

const pendingFixture = extractPendingSections("<h3>Submitted to the National Park Service</h3><p>Evergreen Cemetery</p><p>Chambersea, Chambers County (Relocation Proposal Approved)</p><h3>Final Draft in Progress</h3><p>Rosewood Park</p><h3>Recent Listings and Nomination Search</h3>");
if (observedPendingStage("Evergreen Cemetery", pendingFixture) !== "submitted" ||
    observedPendingStage("Rosewood Park", pendingFixture) !== "review" ||
    observedPendingStage("Chambersea (relocation proposal)", pendingFixture) !== "submitted" ||
    observedPendingStage("Scotus College", pendingFixture) !== "missing") {
  errors.push("THC pending nomination stage parsing regression");
}
const report = {
  checkedAt: new Date().toISOString(),
  source,
  listedCount: listed.length,
  listedByYear: { 2025: listed.filter((x) => x.year === 2025).length, 2026: listed.filter((x) => x.year === 2026).length },
  pendingCount: pending.length,
  errors,
};
if (!process.argv.includes("--live")) {
  console.log(JSON.stringify(report, null, 2));
  if (errors.length) process.exitCode = 2;
} else {
  const timeout = AbortSignal.timeout(25000);
  try {
    const response = await fetch(source, { signal: timeout, headers: { "user-agent": "TexasDefinedTHCPublicDiscovery/1.0 (+https://texasdefined.com/texas-historic-landmarks)" } });
    if (!response.ok) throw Error(`THC responded HTTP ${response.status}`);
    const html = await response.text();
    if (!html.includes("National Register of Historic Places") || html.length < 5000) throw Error("Unexpected THC source markup");
    // Extract NR nomination PDF labels, keeping each source's nearest Listed month.
    const links = [];
    const sourceHeadingDiagnostics = [];
    const anchorPattern = /<a\b([^>]+)>([\s\S]*?)<\/a>/gi;
    for (const match of html.matchAll(anchorPattern)) {
      const href = /href\s*=\s*["']([^"']+)["']/i.exec(match[1])?.[1] ?? "";
      if (!/atlas\.thc\.texas\.gov\/NR\/pdfs\//i.test(decodeHtml(href))) continue;
      const listingDate = nearestListingDate(html.slice(0, match.index));
      if (!listingDate || ![2025, 2026].includes(listingDate.year)) continue;
      const label = decodeHtml(match[2].replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
      if (!label || label.length < 4) continue;
      links.push({ name: label, year: listingDate.year, month: listingDate.month, sourceUrl: decodeHtml(href) });
      if (/^(?:Patricia Welder and Hampton C\. Robinson Jr\. House|Cindy Walker House)$/.test(label)) {
        const before = html.slice(0, match.index);
        sourceHeadingDiagnostics.push({
          name: label, inferred: `${listingDate.month} ${listingDate.year}`,
          nearestParsedHeadings: listingHeadingMatches(before).slice(-3),
          nearestVisibleText: visibleListingText(before).slice(-500),
        });
      }
    }
    // Do not allow a site template change to produce a fake empty "no changes" result.
    if (links.length < 45) throw Error(`Only ${links.length} linked 2025–2026 records parsed: format may have changed`);
    const matches = (label, reference) => {
      const left = normalize(label), right = normalize(reference);
      return left === right || (left.length >= 15 && right.startsWith(left)) || (right.length >= 15 && left.startsWith(right));
    };
    const newlyObserved = links.filter((link) => !listed.some((row) => matches(link.name, row.name)));
    const missingFromCurrent = listed.filter((row) =>
      !links.some((link) => matches(link.name, row.name)) &&
      !/(Shield Ranch|Donald Judd Historic District)/i.test(row.name) // THC has no linked PDF for these amendments
    );
    const dateChanges = links.flatMap((link) => {
      const row = listed.find((candidate) => matches(candidate.name, link.name));
      return row && (row.year !== link.year || row.month.toLowerCase() !== link.month.toLowerCase())
        ? [{ property: row.name, recorded: `${row.month} ${row.year}`, source: `${link.month} ${link.year}` }]
        : [];
    });
    const pendingSections = extractPendingSections(html);
    const pendingObserved = pending.map((entry) => ({
      name: entry.name, recorded: entry.stage, observed: observedPendingStage(entry.name, pendingSections),
    }));
    const pendingStageChanges = pendingObserved.filter((entry) => ["submitted", "review"].includes(entry.observed) && entry.recorded !== entry.observed);
    const pendingNotFound = pendingObserved.filter((entry) => ["missing", "ambiguous"].includes(entry.observed));
    Object.assign(report, {
      fetchedAt: new Date().toISOString(), parsedSourceLinks: links.length,
      newlyObserved, missingFromCurrent, dateChanges, pendingStageChanges, pendingNotFound, sourceHeadingDiagnostics,
    });
    if (newlyObserved.length || missingFromCurrent.length || dateChanges.length || pendingStageChanges.length || pendingNotFound.length) {
      errors.push("THC source changed: research and refresh canonical inventory or pending stage (do not auto-publish)");
    }
    const reportPath = path.join(root, "thc-landmark-watch-report.json");
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n");
    console.log(JSON.stringify(report, null, 2));
    if (errors.length) process.exitCode = 2;
  } catch (error) {
    report.fetchError = String(error);
    fs.writeFileSync(path.join(root, "thc-landmark-watch-report.json"), JSON.stringify(report, null, 2) + "\n");
    console.error("Could not verify live THC listing:", error);
    process.exitCode = 1;
  }
}
