import { fishingPlatform, fishingScope } from "./index";
import { FISHING_ACCESS_DIRECTORY_PATH, FISHING_LOCAL_VERIFIED_AT, FISHING_SERVICES_DIRECTORY_PATH, fishingAccessCanonicalPath, fishingServiceCanonicalPath } from "./local-routing";
import { isFishingRecordVerified } from "./validation";

export async function loadFishingLocalSitemapEntriesServer() {
  const [accessPoints, tackleShops, businesses] = await Promise.all([
    fishingPlatform.accessPoints.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.tackleShops.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.businesses.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);
  const verifiedAccessPoints = accessPoints.filter(isFishingRecordVerified);
  const verifiedServices = [...tackleShops.filter(isFishingRecordVerified), ...businesses.filter(isFishingRecordVerified)];
  const entries = [
    ...(verifiedAccessPoints.length ? [{ path: FISHING_ACCESS_DIRECTORY_PATH, lastmod: FISHING_LOCAL_VERIFIED_AT }] : []),
    ...(verifiedServices.length ? [{ path: FISHING_SERVICES_DIRECTORY_PATH, lastmod: FISHING_LOCAL_VERIFIED_AT }] : []),
    ...verifiedAccessPoints.map((row) => ({ path: fishingAccessCanonicalPath(row.slug), lastmod: row.verifiedAt?.slice(0, 10) })),
    ...verifiedServices.map((row) => ({ path: fishingServiceCanonicalPath(row.slug), lastmod: row.verifiedAt?.slice(0, 10) })),
  ];
  return [...new Map(entries.map((entry) => [entry.path, entry])).values()];
}
