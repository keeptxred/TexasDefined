/**
 * TPWD's FY 2026–27 state park list places the following park properties across
 * more than one Texas county. This is a geographic relationship, not a claim
 * that every park unit has a public gate in each named county.
 *
 * Official source:
 * https://tpwd.texas.gov/business/feedback/meetings/2025/0821/agenda/item.phtml?item=2
 * Exhibit E, 2026–27 Biennium State Park List (approved August 21, 2025).
 * Preserve single-county values on the original destination records.
 */
export const STATE_PARK_MULTICOUNTY: Readonly<Record<string, readonly string[]>> = {
  "big-bend-ranch-state-park": ["brewster", "presidio"],
  "caprock-canyons-state-park": ["briscoe", "floyd", "hall"],
  "choke-canyon-state-park": ["live-oak", "mcmullen"],
  "colorado-bend-state-park": ["lampasas", "san-saba"],
  "cooper-lake-state-park": ["delta", "hopkins"],
  "guadalupe-river-state-park": ["comal", "kendall"],
  "honey-creek-state-natural-area": ["comal", "kendall"],
  "hill-country-state-natural-area": ["bandera", "medina"],
  "kickapoo-cavern-state-park": ["edwards", "kinney"],
  "lake-mineral-wells-state-park": ["palo-pinto", "parker"],
  "lake-somerville-state-park": ["burleson", "lee"],
  "lost-maples-state-natural-area": ["bandera", "real"],
  "martin-dies-jr-state-park": ["jasper", "tyler"],
  "monahans-sandhills-state-park": ["ward", "winkler"],
  "palo-duro-canyon-state-park": ["armstrong", "randall"],
  "palo-pinto-mountains-state-park": ["palo-pinto", "stephens"],
  "purtis-creek-state-park": ["henderson", "van-zandt"],
  "ray-roberts-lake-state-park": ["cooke", "denton", "grayson"],
};

export function normalizeStateParkCounty(value: string): string {
  return value.toLowerCase().replace(/\s+county$/i, "").trim().replace(/[^a-z0-9]+/g, "-");
}

export function stateParkMatchesCounty(park: { slug: string; county?: string }, countySlug: string): boolean {
  const requested = normalizeStateParkCounty(countySlug);
  const officialCounties = STATE_PARK_MULTICOUNTY[park.slug];
  if (officialCounties) return officialCounties.includes(requested);
  return Boolean(park.county && normalizeStateParkCounty(park.county) === requested);
}
