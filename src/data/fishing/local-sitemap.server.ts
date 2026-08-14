import { fishingPlatform, fishingScope } from "./index";
import { fishingAccessCanonicalPath, fishingServiceCanonicalPath } from "./local-routing";
import { isFishingRecordVerified } from "./validation";

export async function loadFishingLocalSitemapEntriesServer() {
  const [accessPoints, tackleShops, businesses] = await Promise.all([
    fishingPlatform.accessPoints.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.tackleShops.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.businesses.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);
  const entries = [
    ...accessPoints.filter(isFishingRecordVerified).map((row) => ({ path: fishingAccessCanonicalPath(row.slug), lastmod: row.verifiedAt?.slice(0, 10) })),
    ...tackleShops.filter(isFishingRecordVerified).map((row) => ({ path: fishingServiceCanonicalPath(row.slug), lastmod: row.verifiedAt?.slice(0, 10) })),
    ...businesses.filter(isFishingRecordVerified).map((row) => ({ path: fishingServiceCanonicalPath(row.slug), lastmod: row.verifiedAt?.slice(0, 10) })),
  ];
  return [...new Map(entries.map((entry) => [entry.path, entry])).values()];
}
