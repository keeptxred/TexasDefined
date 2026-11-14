import { fishingPlatform, fishingScope } from "./index";
import { FISHING_GUIDES_DIRECTORY_PATH, FISHING_GUIDES_VERIFIED_AT, fishingGuideCanonicalPath } from "./guide-routing";
import { latestFishingSourceReviewDate } from "./source-review-dates";

export async function loadFishingGuideSitemapEntriesServer() {
  const guides = await fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 });
  const lakeCoverage = new Set(guides.flatMap((guide) => guide.lakeIds));
  const latestGuideReviewDate = latestFishingSourceReviewDate(guides, FISHING_GUIDES_VERIFIED_AT);
  const indexableProfiles = guides.filter((guide) => guide.claimedListing && (guide.bio?.length ?? 0) >= 350);
  return [
    ...(guides.length >= 8 && lakeCoverage.size >= 3 ? [{ path: FISHING_GUIDES_DIRECTORY_PATH, lastmod: latestGuideReviewDate }] : []),
    ...indexableProfiles.map((guide) => ({ path: fishingGuideCanonicalPath(guide.slug), lastmod: guide.verifiedAt })),
  ];
}
