const GSC_IMPROVE_STATE_SLUGS = [
  "alabama",
  "alaska",
  "colorado",
  "connecticut",
  "delaware",
  "georgia",
  "hawaii",
  "idaho",
  "indiana",
  "kansas",
  "kentucky",
  "louisiana",
  "maine",
  "maryland",
  "massachusetts",
  "michigan",
  "minnesota",
  "missouri",
  "montana",
  "nevada",
  "new-hampshire",
  "new-jersey",
  "new-mexico",
  "new-york",
  "north-carolina",
  "north-dakota",
  "ohio",
  "oregon",
  "pennsylvania",
  "rhode-island",
  "south-carolina",
  "south-dakota",
  "tennessee",
  "utah",
  "virginia",
  "west-virginia",
  "wyoming",
] as const;

const REDIRECT_ONLY_STATE_SLUGS = ["california", "florida"] as const;

export const TEXAS_VS_GSC_IMPROVE_STATE_SLUGS = new Set<string>(GSC_IMPROVE_STATE_SLUGS);
export const TEXAS_VS_REDIRECT_ONLY_STATE_SLUGS = new Set<string>(REDIRECT_ONLY_STATE_SLUGS);

export function isTexasVsStateSitemapReady(slug: string) {
  return !TEXAS_VS_GSC_IMPROVE_STATE_SLUGS.has(slug) && !TEXAS_VS_REDIRECT_ONLY_STATE_SLUGS.has(slug);
}
