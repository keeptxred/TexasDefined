export type LiveLakeLevelException = {
  slug: string;
  reason: "noPublicLiveLevelSource";
  authority: string;
  verifiedAt: string;
  officialCurrentInformationUrl: string;
  checkedAuthoritativeSystems: readonly string[];
  note: string;
};

/**
 * Complete fishing-lake guides that intentionally do not expose a numeric live
 * pool-elevation snapshot. Keep this list tiny and evidence-backed: a nearby
 * environmental or river gauge is not a substitute for the named reservoir.
 */
export const LIVE_LAKE_LEVEL_EXCEPTIONS: readonly LiveLakeLevelException[] = [
  {
    slug: "calaveras-lake",
    reason: "noPublicLiveLevelSource",
    authority: "CPS Energy",
    verifiedAt: "2026-09-30",
    officialCurrentInformationUrl: "https://www.cpsenergy.com/en/about-us/community/cooling-lakes.html",
    checkedAuthoritativeSystems: [
      "CPS Energy cooling-lake and environmental/water operations pages",
      "Texas Water Development Board / Water Data for Texas reservoir system",
      "U.S. Geological Survey NWIS / National Water Information System",
      "NOAA National Water Prediction Service",
      "Texas Parks and Wildlife Department Calaveras Reservoir guidance",
      "Texas Commission on Environmental Quality monitoring systems",
      "San Antonio Water System and City of San Antonio public water resources",
      "Public ArcGIS/feature services and public dashboard endpoints attributable to the managing authority",
    ],
    note: "No public real-time Calaveras Lake pool-elevation feed was identified. TCEQ has active hourly monitoring sites at Calaveras, but they monitor air-quality/meteorological parameters rather than reservoir pool elevation. Do not infer a live level from normal operating range, nearby gauges, or dated environmental reports.",
  },
] as const;

export function getLiveLakeLevelException(slug: string) {
  return LIVE_LAKE_LEVEL_EXCEPTIONS.find((entry) => entry.slug === slug) ?? null;
}
