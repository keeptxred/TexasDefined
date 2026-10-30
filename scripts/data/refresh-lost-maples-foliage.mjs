import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";

export const SOURCE_URL = "https://tpwd.texas.gov/state-parks/lost-maples/foliage-reports";
export const OUTPUT_PATH = "src/data/generated/lost-maples-foliage-report.json";
const MONTHS = new Map(Object.entries({
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
}));

function plainText(html) {
  return String(html).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;|&#xA0;/gi, " ")
    .replace(/&amp;/gi, "&").replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ").trim();
}
function parseReportDate(raw) {
  const m = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2}),?\s+(20\d{2})$/i.exec(raw);
  if (!m) return null;
  const month = MONTHS.get(m[1].slice(0, 3).toLowerCase());
  const date = new Date(Date.UTC(Number(m[3]), month - 1, Number(m[2])));
  if (date.getUTCDate() !== Number(m[2]) || date.getUTCMonth() !== month - 1) return null;
  return date.toISOString().slice(0, 10);
}

export function extractOfficialFoliageReport(html, asOf = new Date()) {
  if (typeof html !== "string" || html.length < 100 || html.length > 4_000_000) {
    throw Error("Unexpected size for official foliage HTML; not publishing an update");
  }
  const text = plainText(html);
  const year = asOf.getUTCFullYear();
  if (!new RegExp("\\b" + year + "\\s+Fall Foliage Color Report\\b", "i").test(text)) {
    throw Error("Official TPWD page has no report headed for this calendar year");
  }
  const h2s = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)];
  const reports = h2s.map((m, index) => {
    const reportDate = parseReportDate(plainText(m[1]));
    if (!reportDate || Number(reportDate.slice(0, 4)) !== year) return null;
    const after = m.index + m[0].length;
    const beforeNext = index + 1 < h2s.length ? h2s[index + 1].index : html.length;
    const section = html.slice(after, Math.min(beforeNext, after + 15000));
    const paragraphs = [...section.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
      .map(p => plainText(p[1])).filter(Boolean).slice(0, 3);
    return { reportDate, paragraphs };
  }).filter(Boolean).sort((a, b) => b.reportDate.localeCompare(a.reportDate));
  const latest = reports[0];
  if (!latest || !latest.paragraphs.length) {
    throw Error("No dated official observation paragraph found; preserving older snapshot");
  }
  const today = asOf.toISOString().slice(0, 10);
  const ageDays = Math.floor((Date.parse(today) - Date.parse(latest.reportDate)) / 86_400_000);
  if (ageDays < 0 || ageDays > 90) {
    throw Error("Official report date is future-dated or from a previous season");
  }
  const observations = [];
  const summary = latest.paragraphs.join(" ").slice(0, 1500);
  // Only publish narrow, proven species observations. Any unfamiliar wording
  // yields a dated source link, never an inferred peak/green-to-red forecast.
  if (/\bmaples?\b[^.!?]{0,120}\b(?:still|remain|mostly)\s+green\b/i.test(summary)) {
    observations.push("TPWD describes the maples as still green.");
  }
  if (/\bsycamores?\b[^.!?]{0,120}\b(?:yellow|golden)\b/i.test(summary)) {
    observations.push("TPWD describes the sycamores as yellowing.");
  }
  if (observations.some(x => x.includes("maples")) &&
      /\b(?:edges?|leaf edges?)\b/i.test(summary) &&
      /\b(?:change|color)\b/i.test(summary)) {
    observations[0] = "TPWD describes the maples as still green, with early color on some leaf edges.";
  }
  return { sourceUrl: SOURCE_URL, reportDate: latest.reportDate, observations };
}

export async function updateFromOfficialHtml(html, asOf = new Date(), path = OUTPUT_PATH) {
  const next = extractOfficialFoliageReport(html, asOf);
  let current = null;
  try { current = JSON.parse(await fs.readFile(path, "utf8")); }
  catch (error) { if (error.code !== "ENOENT") throw error; }
  if (JSON.stringify(current) === JSON.stringify(next)) {
    console.log("No new dated TPWD observation; snapshot unchanged.");
    return false;
  }
  await fs.writeFile(path, JSON.stringify(next, null, 2) + "\n", "utf8");
  console.log("Saved dated TPWD observation " + next.reportDate + "; no peak inference.");
  return true;
}

async function main() {
  const response = await fetch(SOURCE_URL, {
    signal: AbortSignal.timeout(20000),
    headers: { "user-agent": "TexasDefined-official-seasonal-source-check/1.0 (once daily in fall)" },
  });
  if (!response.ok || !(response.headers.get("content-type") ?? "").includes("text/html")) {
    throw Error("Official TPWD source unavailable or no longer HTML: HTTP " + response.status);
  }
  await updateFromOfficialHtml(await response.text());
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error("Fail closed: " + error.message); process.exitCode = 1; });
}
