import { fishingPlatform, fishingScope } from "./index";
import { fishingServiceCanonicalPath } from "./local-routing";
import { isFishingRecordVerified } from "./validation";

export async function loadFishingServiceProfileDataServer(slug: string) {
  const [tackleShops, businesses, lakes] = await Promise.all([
    fishingPlatform.tackleShops.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.businesses.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);
  const tackle = tackleShops.find((row) => row.slug === slug);
  const business = businesses.find((row) => row.slug === slug);
  if (tackle && business) return null;
  const service = tackle ?? business;
  if (!service || !isFishingRecordVerified(service)) return null;
  const category = tackle ? "tackle-shop" : business!.category;
  const lakeById = new Map(lakes.map((row) => [row.id, row]));
  const relatedLakes = service.lakeIds.map((id) => lakeById.get(id)).filter(Boolean);
  if (relatedLakes.length !== service.lakeIds.length) return null;
  return { service, category, lakes: relatedLakes, canonicalPath: fishingServiceCanonicalPath(service.slug) };
}

export type FishingServiceProfileData = NonNullable<Awaited<ReturnType<typeof loadFishingServiceProfileDataServer>>>;
