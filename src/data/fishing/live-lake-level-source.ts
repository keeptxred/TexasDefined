const WATER_DATA_FOR_TEXAS_PATTERN = /^https:\/\/(?:www\.)?waterdatafortexas\.org\/reservoirs\/individual\/[a-z0-9-]+\/?$/i;
const LCRA_HYDROMET_PATTERN = /^https:\/\/hydromet\.lcra\.org\/Charts\/?\?/i;

export type LiveLakeLevelProvider = "Water Data for Texas" | "LCRA Hydromet";

export function isWaterDataForTexasLiveLevelSource(url: string) {
  return WATER_DATA_FOR_TEXAS_PATTERN.test(url);
}

export function getLcraHydrometSiteNumber(url: string) {
  if (!LCRA_HYDROMET_PATTERN.test(url)) return null;
  try {
    const parsed = new URL(url);
    const siteNumber = parsed.searchParams.get("siteNumber")?.trim() ?? "";
    const siteType = parsed.searchParams.get("siteType")?.trim().toLowerCase() ?? "";
    return /^\d{3,6}$/.test(siteNumber) && siteType === "lakelevel" ? siteNumber : null;
  } catch {
    return null;
  }
}

export function isLcraHydrometLiveLevelSource(url: string) {
  return getLcraHydrometSiteNumber(url) != null;
}

export function isLiveLakeLevelSource(url: string) {
  return isWaterDataForTexasLiveLevelSource(url) || isLcraHydrometLiveLevelSource(url);
}

export function liveLakeLevelProvider(url: string): LiveLakeLevelProvider | null {
  if (isWaterDataForTexasLiveLevelSource(url)) return "Water Data for Texas";
  if (isLcraHydrometLiveLevelSource(url)) return "LCRA Hydromet";
  return null;
}
