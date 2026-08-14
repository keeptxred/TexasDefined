import { fishingPlatform, fishingScope } from "./index";
import { FISHING_LOCAL_VERIFIED_AT, fishingAccessCanonicalPath } from "./local-routing";
import { isFishingRecordVerified } from "./validation";

const SPONSORED_ACCESS_KINDS = ["featured-marina", "lake-sponsor", "regional-advertiser", "statewide-advertiser"] as const;

export async function loadFishingAccessDirectoryDataServer() {
  const [accessPoints, lakes, advertisers, placements] = await Promise.all([
    fishingPlatform.accessPoints.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.advertisers.list({ ...fishingScope, status: "published" }),
    fishingPlatform.placements.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);
  const lakeById = new Map(lakes.map((row) => [row.id, row]));
  const advertiserById = new Map(advertisers.map((row) => [row.id, row]));
  const access = accessPoints
    .filter(isFishingRecordVerified)
    .map((point) => ({
      point,
      href: fishingAccessCanonicalPath(point.slug),
      lakes: point.lakeIds.map((id) => lakeById.get(id)).filter(Boolean),
    }))
    .filter((entry) => entry.lakes.length === entry.point.lakeIds.length)
    .sort((a, b) => a.point.name.localeCompare(b.point.name) || a.point.slug.localeCompare(b.point.slug));
  const sponsoredPlacements = placements
    .filter((placement) => SPONSORED_ACCESS_KINDS.includes(placement.kind as (typeof SPONSORED_ACCESS_KINDS)[number]))
    .map((placement) => ({ placement, advertiser: advertiserById.get(placement.advertiserId) }))
    .filter((entry) => Boolean(entry.advertiser));
  return {
    verifiedAt: FISHING_LOCAL_VERIFIED_AT,
    editorialOrder: "Alphabetical by verified access-site name. Sponsorship never changes access ordering or recommendations.",
    access,
    filters: {
      lakes: [...new Map(access.flatMap((entry) => entry.lakes).map((lake) => [lake!.id, lake!])).values()].sort((a, b) => a.name.localeCompare(b.name)),
      kinds: [...new Set(access.map((entry) => entry.point.kind))].sort(),
      cities: [...new Set(access.map((entry) => entry.point.city).filter(Boolean))].sort() as string[],
      counties: [...new Set(access.map((entry) => entry.point.county).filter(Boolean))].sort() as string[],
    },
    sponsoredPlacements,
  };
}

export type FishingAccessDirectoryData = Awaited<ReturnType<typeof loadFishingAccessDirectoryDataServer>>;
