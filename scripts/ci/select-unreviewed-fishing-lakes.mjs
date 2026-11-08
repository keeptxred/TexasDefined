// Select only genuinely unreviewed TPWD lakes for *new* access-site
// discovery. A curated lake and a separately source-reviewed statewide
// accessPoints dossier are already covered by existing drift monitors.
export function selectUnreviewedFishingLakes(definitions, curatedLakeIds) {
  const curated = new Set(curatedLakeIds);
  const matches = [...definitions.matchAll(/slug:\s*"([^"]+)"[^\n]*tpwdSlug:\s*"([^"]+)"/g)];
  const seen = new Set();
  const candidates = [];
  const reviewed = [];
  const populatedWithoutExplicitReviewDate = [];
  const defined = [];
  for (let i = 0; i < matches.length; i++) {
    const [, lakeId, tpwd] = matches[i];
    if (seen.has(lakeId)) continue;
    seen.add(lakeId);
    defined.push(lakeId);
    if (curated.has(lakeId)) continue;
    const block = definitions.slice(matches[i].index, matches[i + 1]?.index ?? definitions.length);
    const hasReviewedDate = /\baccessReviewedAt:\s*"\d{4}-\d{2}-\d{2}"/.test(block);
    const hasVerifiedSites = /\baccessPoints:\s*\[/.test(block);
    if (hasVerifiedSites) {
      // The public prototype's accessReviewedAt already falls back to
      // 2026-10-12 for lake definitions with actual accessPoints. Keep
      // these documented locations in the existing source-drift review,
      // rather than rediscovering the same TPWD page as if it were new.
      if (hasReviewedDate) reviewed.push(lakeId);
      else populatedWithoutExplicitReviewDate.push(lakeId);
      continue;
    }
    candidates.push({ lakeId, tpwd });
  }
  return {
    lakes: candidates,
    reviewedLakeGroups: reviewed.length,
    existingAccessWithoutExplicitDate: populatedWithoutExplicitReviewDate.length,
    totalDistinctKnownLakes: new Set([...defined, ...curated]).size,
    networkLakeDefinitions: defined.length,
  };
}
