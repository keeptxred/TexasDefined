import type { FishSpecies, FishingGuide, FishingLake, FishingReport, LakeSpeciesProfile } from "./types";
import { isFishingRecordVerified } from "./validation";

export interface FishingReportValidationContext {
  lakes: FishingLake[];
  species: FishSpecies[];
  guides: FishingGuide[];
  lakeSpecies: LakeSpeciesProfile[];
}

export function isPublicFishingReportValid(report: FishingReport, context: FishingReportValidationContext, now = new Date()) {
  if (report.status !== "published" || !isFishingRecordVerified(report)) return false;
  const published = new Date(report.publishedAt);
  if (Number.isNaN(published.getTime()) || published.getTime() > now.getTime()) return false; // report-future / report-published-at
  if (report.expiresAt) {
    const expires = new Date(report.expiresAt);
    if (Number.isNaN(expires.getTime()) || expires.getTime() <= published.getTime()) return false; // report-expiry
  }
  if (!context.lakes.some((lake) => lake.id === report.lakeId && lake.status === "published")) return false;
  for (const update of report.speciesUpdates) {
    if (!context.species.some((fish) => fish.id === update.speciesId && fish.status === "published")) return false;
    if (!context.lakeSpecies.some((relation) => relation.lakeId === report.lakeId && relation.speciesId === update.speciesId)) return false; // report-species-lake
  }
  if (report.contributorGuideId) {
    const guide = context.guides.find((row) => row.id === report.contributorGuideId);
    if (!guide || !guide.verifiedListing || !guide.contributorApproved || guide.status !== "published") return false; // report-contributor-verification
    if (!report.sources.some((source) => source.sourceType === "contributor")) return false;
  }
  return true;
}
