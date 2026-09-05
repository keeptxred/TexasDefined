import { isTexasVsStateEvidenceQualified } from "./texas-vs-state-evidence.server";
import { texasVsStateName } from "./texas-vs-states-index";

const GSC_IMPROVE_STATE_SLUGS = [
  "alabama",
  "alaska",
  "colorado",
  "connecticut",
  "delaware",
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
  "north-dakota",
  "ohio",
  "oregon",
  "pennsylvania",
  "rhode-island",
  "south-carolina",
  "south-dakota",
  "utah",
  "virginia",
  "west-virginia",
  "wyoming",
] as const;

const EVIDENCE_PROMOTED_STATE_SLUGS = ["georgia", "north-carolina", "tennessee"] as const;
const REDIRECT_ONLY_STATE_SLUGS = ["california", "florida"] as const;

export const TEXAS_VS_GSC_IMPROVE_STATE_SLUGS = new Set<string>(GSC_IMPROVE_STATE_SLUGS);
export const TEXAS_VS_EVIDENCE_PROMOTED_STATE_SLUGS = new Set<string>(EVIDENCE_PROMOTED_STATE_SLUGS);
export const TEXAS_VS_REDIRECT_ONLY_STATE_SLUGS = new Set<string>(REDIRECT_ONLY_STATE_SLUGS);

export function isTexasVsStateSitemapReady(slug: string) {
  if (TEXAS_VS_REDIRECT_ONLY_STATE_SLUGS.has(slug)) return false;
  if (TEXAS_VS_GSC_IMPROVE_STATE_SLUGS.has(slug)) return false;
  if (!TEXAS_VS_EVIDENCE_PROMOTED_STATE_SLUGS.has(slug)) return true;
  const name = texasVsStateName(slug);
  return Boolean(name && isTexasVsStateEvidenceQualified(name));
}
