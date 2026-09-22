import { fishingPlatform, fishingScope } from "./index";

export async function loadFishingLakeSitemapEntriesServer() {
  const [lakes, relationships] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakeSpecies.list(fishingScope),
  ]);
  const supportedLakeIds = new Set(
    relationships
      .filter((relationship) => Boolean(relationship.verifiedAt) && relationship.sources.length > 0)
      .map((relationship) => relationship.lakeId),
  );

  return lakes
    .filter((lake) => supportedLakeIds.has(lake.id))
    .filter((lake) => Boolean(lake.verifiedAt) && lake.sources.length > 0)
    .map((lake) => ({
      path: `/fishing/lakes/${lake.slug}`,
      lastmod: lake.verifiedAt?.slice(0, 10),
    }));
}
