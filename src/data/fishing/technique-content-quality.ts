// Editorial visibility rule for lake-technique guides.
// Preserve every verified relationship in the catalog and lake detail pages;
// avoid repeating generic registry prose across all nine technique landing pages.
export function isGenericLakeTechniqueSummary(summary: string): boolean {
  return /\b(?:is included in TPWD-backed fishing guidance|is documented in the verified)\b/i.test(summary);
}

export function selectFeaturedLakeApplications<T extends { profile: { summary: string }; lake: { name: string } }>(profiles: T[]): T[] {
  const specific = profiles
    .filter((row) => !isGenericLakeTechniqueSummary(row.profile.summary))
    .slice(0, 10);
  // A technique with no specific source-backed lake narrative can still surface
  // at most two verified lake links. The generic prose itself stays suppressed.
  const fallback = specific.length === 0 ? profiles.slice(0, Math.min(2, profiles.length)) : [];
  return [...specific, ...fallback].sort((a, b) => a.lake.name.localeCompare(b.lake.name));
}
