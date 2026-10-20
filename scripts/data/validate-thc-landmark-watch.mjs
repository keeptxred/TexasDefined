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
    .replace(/[^a-z0-9]+/gi, " ").trim().replace(/ +/g, " ");
}
function decodeHtml(text) {
  return text.replace(/&(?:nbsp|#160);/gi, " ")
    .replace(/&amp;/gi, "&").replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&ndash;|&mdash;/gi, "–")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
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
    const anchorPattern = /<a\b([^>]+)>([\s\S]*?)<\/a>/gi;
    for (const match of html.matchAll(anchorPattern)) {
      const href = /href\s*=\s*["']([^"']+)["']/i.exec(match[1])?.[1] ?? "";
      if (!/atlas\.thc\.texas\.gov\/NR\/pdfs\//i.test(decodeHtml(href))) continue;
      const preceding = html.slice(0, match.index);
      const dates = [...preceding.matchAll(new RegExp(`Listed\\s+(${months})\\s+(20\\d{2})`, "gi"))];
      const lastDate = dates.at(-1);
      if (!lastDate || ![2025, 2026].includes(Number(lastDate[2]))) continue;
      const label = decodeHtml(match[2].replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
      if (!label || label.length < 4) continue;
      links.push({ name: label, year: Number(lastDate[2]), month: lastDate[1], sourceUrl: decodeHtml(href) });
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
    Object.assign(report, { fetchedAt: new Date().toISOString(), parsedSourceLinks: links.length, newlyObserved, missingFromCurrent, dateChanges });
    if (newlyObserved.length || missingFromCurrent.length || dateChanges.length) errors.push("THC source changed: research and refresh canonical inventory (do not auto-publish)");
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
