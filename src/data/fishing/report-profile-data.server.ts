import { fishingPlatform, fishingScope } from "./index";
import { fishingReportCanonicalPath, fishingReportFreshness } from "./report-routing";
import { isPublicFishingReportValid } from "./report-validation";

export async function loadFishingReportProfileDataServer(slug: string) {
  const report = await fishingPlatform.reports.getBySlug(fishingScope, slug);
  if (!report) return null;
  const [lakes, species, techniques, guides, lakeSpecies] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.techniques.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 }),
    fishingPlatform.lakeSpecies.list(fishingScope),
  ]);
  if (!isPublicFishingReportValid(report, { lakes, species, guides, lakeSpecies })) return null;
  const lake = lakes.find((row) => row.id === report.lakeId);
  if (!lake) return null;
  const speciesById = new Map(species.map((row) => [row.id, row]));
  const techniqueById = new Map(techniques.map((row) => [row.id, row]));
  const updates = report.speciesUpdates.map((update) => ({
    update,
    species: speciesById.get(update.speciesId),
    techniques: (update.recommendedTechniqueIds ?? []).map((id) => techniqueById.get(id)).filter(Boolean),
  }));
  const contributorGuide = report.contributorGuideId
    ? guides.find((guide) => guide.id === report.contributorGuideId && guide.contributorApproved)
    : undefined;
  return {
    report,
    canonicalPath: fishingReportCanonicalPath(report.slug),
    freshness: fishingReportFreshness(report),
    lake,
    updates,
    contributorGuide,
  };
}

export type FishingReportProfileData = NonNullable<Awaited<ReturnType<typeof loadFishingReportProfileDataServer>>>;
