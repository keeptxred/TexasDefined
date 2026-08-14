import { fishingPlatform, fishingScope } from "./index";
import { FISHING_LOCAL_VERIFIED_AT, fishingServiceCanonicalPath } from "./local-routing";
import { isFishingRecordVerified } from "./validation";

const SPONSORED_SERVICE_KINDS = ["featured-tackle-shop", "featured-lodging", "featured-campground", "featured-restaurant", "regional-advertiser", "statewide-advertiser"] as const;

export async function loadFishingServicesDirectoryDataServer() {
  const [tackleShops, businesses, lakes, advertisers, placements] = await Promise.all([
    fishingPlatform.tackleShops.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.businesses.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.advertisers.list({ ...fishingScope, status: "published" }),
    fishingPlatform.placements.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);
  const lakeById = new Map(lakes.map((row) => [row.id, row]));
  const advertiserById = new Map(advertisers.map((row) => [row.id, row]));
  const rawServices = [
    ...tackleShops.map((service) => ({ service, category: "tackle-shop" as const })),
    ...businesses.map((service) => ({ service, category: service.category })),
  ];
  const services = rawServices
    .filter(({ service }) => isFishingRecordVerified(service))
    .map(({ service, category }) => ({
      service,
      category,
      href: fishingServiceCanonicalPath(service.slug),
      lakes: service.lakeIds.map((id) => lakeById.get(id)).filter(Boolean),
    }))
    .filter((entry) => entry.lakes.length === entry.service.lakeIds.length)
    .sort((a, b) => a.service.name.localeCompare(b.service.name) || a.service.slug.localeCompare(b.service.slug));
  const sponsoredPlacements = placements
    .filter((placement) => SPONSORED_SERVICE_KINDS.includes(placement.kind as (typeof SPONSORED_SERVICE_KINDS)[number]))
    .map((placement) => ({ placement, advertiser: advertiserById.get(placement.advertiserId) }))
    .filter((entry) => Boolean(entry.advertiser));
  return {
    verifiedAt: FISHING_LOCAL_VERIFIED_AT,
    editorialOrder: "Alphabetical by verified local-service name. Sponsorship never changes service ordering or recommendations.",
    services,
    filters: {
      lakes: [...new Map(services.flatMap((entry) => entry.lakes).map((lake) => [lake!.id, lake!])).values()].sort((a, b) => a.name.localeCompare(b.name)),
      categories: [...new Set(services.map((entry) => entry.category))].sort(),
      cities: [...new Set(services.map((entry) => entry.service.city).filter(Boolean))].sort() as string[],
      counties: [...new Set(services.map((entry) => entry.service.county).filter(Boolean))].sort() as string[],
    },
    sponsoredPlacements,
  };
}

export type FishingServicesDirectoryData = Awaited<ReturnType<typeof loadFishingServicesDirectoryDataServer>>;
