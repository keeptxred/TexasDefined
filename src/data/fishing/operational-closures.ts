/** Reviewed TPWD operating alerts. Do not infer reopening from a stale generic lake fact sheet.
 * Keep a closure until the named operator explicitly lifts it; scheduled audits
 * must report changed evidence rather than silently publishing fishing access.
 */
export const FISHING_OPERATIONAL_CLOSURES = {
  "lake-abilene": {
    status: "fishing-prohibited",
    reason: "TPWD Abilene State Park reports no fishing due to low lake level.",
    officialUrl: "https://tpwd.texas.gov/state-parks/abilene/alert/",
    reviewedAt: "2026-11-11",
  },
} as const;

export function isFishingCurrentlyClosed(lakeSlug: string): boolean {
  return lakeSlug in FISHING_OPERATIONAL_CLOSURES;
}
