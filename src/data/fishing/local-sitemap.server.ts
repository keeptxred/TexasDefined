import { fishingPlatform, fishingScope } from "./index";
import { FISHING_ACCESS_DIRECTORY_PATH, FISHING_LOCAL_VERIFIED_AT, FISHING_SERVICES_DIRECTORY_PATH, fishingAccessCanonicalPath, fishingServiceCanonicalPath } from "./local-routing";
import { isFishingRecordVerified } from "./validation";
import { latestFishingSourceReviewDate } from "./source-review-dates";

export async function loadFishingLocalSitemapEntriesServer() {
  const [accessPoints, tackleShops, businesses] = await Promise.all([
    fishingPlatform.accessPoints.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.tackleShops.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.businesses.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);
  const verifiedAccessPoints = accessPoints.filter(isFishingRecordVerified);
  // Source-only pilot entries stay browsable but are not independent index targets.
  // Require a real facility location before adding a detailed access URL to Search.
  const indexEligibleAccessPoints = verifiedAccessPoints.filter((point) => Boolean(point.address || point.coordinates));
  const indexEligibleLakeIds = new Set(verifiedAccessPoints.flatMap((point) => point.lakeIds));
  const latestAccessReviewDate = latestFishingSourceReviewDate(verifiedAccessPoints, FISHING_LOCAL_VERIFIED_AT);
  const verifiedServices = [...tackleShops.filter(isFishingRecordVerified), ...businesses.filter(isFishingRecordVerified)];
  const entries = [
    ...(indexEligibleLakeIds.size >= 20 && verifiedAccessPoints.length >= 100 ? [{ path: FISHING_ACCESS_DIRECTORY_PATH, lastmod: latestAccessReviewDate }] : []),
    ...(verifiedServices.length ? [{ path: FISHING_SERVICES_DIRECTORY_PATH, lastmod: FISHING_LOCAL_VERIFIED_AT }] : []),
    ...indexEligibleAccessPoints.map((row) => ({ path: fishingAccessCanonicalPath(row.slug), lastmod: row.verifiedAt?.slice(0, 10) })),
    ...verifiedServices.map((row) => ({ path: fishingServiceCanonicalPath(row.slug), lastmod: row.verifiedAt?.slice(0, 10) })),
  ];
  return [...new Map(entries.map((entry) => [entry.path, entry])).values()];
}
