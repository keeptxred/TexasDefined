import fs from "node:fs";
import { fileURLToPath } from "node:url";

export const FRESHNESS_FILE = "src/data/hunting/freshness.ts";
export function loadSeasonContract(source) {
  const read = (key) => new RegExp(key + ':\s*"([^"]+)"').exec(source)?.[1];
  const seasonYear = read("seasonYear"), validFrom = read("validFrom"), validThrough = read("validThrough");
  if (!/^20\d{2}–\d{2}$/.test(seasonYear || "") || !/^20\d{2}-\d\d-\d\d$/.test(validFrom || "") || !/^20\d{2}-\d\d-\d\d$/.test(validThrough || "")) throw Error("Invalid hunting season contract");
  const first = Number(seasonYear.slice(0, 4)), last = first + 1;
  if (validFrom !== first + "-09-01" || validThrough !== last + "-08-31") throw Error("Hunting season year and validity boundaries disagree");
  return { seasonYear, validFrom, validThrough };
}
/** At 45 days before September rollover, create one protected editorial alert.
 * No automated wording or legal conclusion is published from a date alone. */
export function rolloverStatus(contract, today) {
  if (!/^20\d{2}-\d\d-\d\d$/.test(today)) throw Error("Invalid audit date");
  const current = new Date(today + "T12:00:00Z").valueOf();
  const expiry = new Date(contract.validThrough + "T12:00:00Z").valueOf();
  if (!Number.isFinite(current) || !Number.isFinite(expiry)) throw Error("Invalid rollover date");
  const daysLeft = Math.ceil((expiry - current) / 86400000);
  if (daysLeft < 0) return { state: "expired", daysLeft };
  if (daysLeft <= 45) return { state: "upcoming", daysLeft };
  return { state: "current", daysLeft };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const contract = loadSeasonContract(fs.readFileSync(FRESHNESS_FILE, "utf8"));
  const today = process.env.HUNTING_AUDIT_DATE || new Date().toISOString().slice(0, 10);
  const result = rolloverStatus(contract, today);
  console.log(JSON.stringify({ ...result, checkedOn: today, seasonYear: contract.seasonYear, validThrough: contract.validThrough }));
  // Nonzero triggers an existing scheduled GitHub workflow's single review issue.
  // Do not silently alter the published county/species legal explanations.
  if (result.state !== "current") process.exitCode = 2;
}
