// Source-specific, fail-closed factual price corrections. No arbitrary prose or safety-rule rewrites.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
export const DATA_PATH = "src/data/outdoor-guide-admission.json";
export const REPORT_PATH = ".artifacts/outdoor-admission-refresh.json";
export const SOURCES = [
  { key: "huntsville", park: "Huntsville State Park", url: "https://tpwd.texas.gov/state-parks/huntsville/fees-facilities/entrance-fees" },
  { key: "rayRoberts", park: "Ray Roberts Lake State Park", url: "https://tpwd.texas.gov/state-parks/ray-roberts-lake/fees-facilities/entrance-fees" },
  { key: "caprock", park: "Caprock Canyons State Park", url: "https://tpwd.texas.gov/state-parks/caprock-canyons/fees-facilities/entrance-fees" },
];
export function parseTpwdDailyAdultFee(html, park) {
  const body = html.replace(/<(script|style|noscript|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;|&#38;/gi, "&")
    .replace(/\s+/g, " ").trim();
  if (!body.toLowerCase().includes(park.toLowerCase()) || !/Entrance Fees/i.test(body)) throw Error("Wrong park or missing entrance-fee heading");
  // Require the entire adult age/amount/day and free-child age block, not a random dollar amount.
  const matches = [...body.matchAll(/\b13\s+years\s+(?:&|and)\s+older\b\.?\s+\$(\d{1,3})(?:\.00)?\s+Daily\s+(?:Child\s+)?12\s+Years\s+(?:&|and)\s+Under\b\.?\s+Free\b/gi)];
  if (matches.length !== 1) throw Error("Unrecognized or ambiguous age, price or daily-admission terms");
  const adult = Number(matches[0][1]);
  if (!Number.isInteger(adult) || adult < 1 || adult > 100) throw Error("Admission price outside reviewed bounds; manual verification required");
  return { adult, sourceExcerpt: matches[0][0] };
}
export function applyVerifiedPrices(previous, observations, day) {
  if (previous.schemaVersion !== 1 || !/^\d{4}-\d\d-\d\d$/.test(day)) throw Error("Invalid data schema or observation date");
  if (observations.length !== SOURCES.length || new Set(observations.map(x => x.key)).size !== SOURCES.length) throw Error("All three independent source observations required");
  const next = structuredClone(previous), changes = [];
  for (const source of SOURCES) {
    const old = previous[source.key], seen = observations.find(x => x.key === source.key);
    if (!old || !seen || seen.url !== source.url || !Number.isInteger(seen.adult) || seen.adult < 1 || seen.adult > 100 ||
        !Number.isInteger(old.adult) || !/^\d{4}-\d\d-\d\d$/.test(old.evidenceDate) || old.evidenceDate > day) throw Error("Invalid verified record: " + source.key);
    if (old.adult !== seen.adult) {
      changes.push({ key: source.key, old: old.adult, new: seen.adult, url: source.url });
      next[source.key] = { adult: seen.adult, evidenceDate: day };
    }
  }
  return { next, changes };
}
export async function refreshOutdoorAdmission({ fetchImpl = fetch, now = new Date(), dataPath = DATA_PATH, reportPath = REPORT_PATH } = {}) {
  const previous = JSON.parse(await readFile(dataPath, "utf8"));
  const observations = [], errors = [];
  for (const source of SOURCES) {
    try {
      const response = await fetchImpl(source.url, { headers: { accept: "text/html", "user-agent": "TexasDefined-Outdoor-SourceReview/1.0" }, redirect: "follow", signal: AbortSignal.timeout(25000) });
      if (!response.ok) throw Error("HTTP " + response.status);
      if (response.url && new URL(response.url).hostname !== "tpwd.texas.gov") throw Error("Unexpected source host");
      observations.push({ key: source.key, url: source.url, ...parseTpwdDailyAdultFee(await response.text(), source.park) });
    } catch (error) { errors.push({ key: source.key, url: source.url, error: String(error.message) }); }
  }
  const result = errors.length ? { next: previous, changes: [] } : applyVerifiedPrices(previous, observations, now.toISOString().slice(0, 10));
  const report = { observedAt: now.toISOString(), observations, errors, changes: result.changes, note: "Numeric admission corrections only. No date advances without a changed price; source ambiguity fails closed and other rules require editorial review." };
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, JSON.stringify(report, null, 2) + "\n");
  if (errors.length) throw Error("Official admission evidence incomplete; no correction written");
  if (result.changes.length) await writeFile(dataPath, JSON.stringify(result.next, null, 2) + "\n");
  console.log(JSON.stringify(report));
  return report;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await refreshOutdoorAdmission();
