import { fishingPlatform, fishingScope } from "./index";
import { fishingAccessCanonicalPath } from "./local-routing";
import { isFishingRecordVerified } from "./validation";

export async function loadFishingAccessProfileDataServer(slug: string) {
  const [accessPoints, lakes] = await Promise.all([
    fishingPlatform.accessPoints.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);
  const point = accessPoints.find((row) => row.slug === slug);
  if (!point || !isFishingRecordVerified(point)) return null;
  const lakeById = new Map(lakes.map((row) => [row.id, row]));
  const relatedLakes = point.lakeIds.map((id) => lakeById.get(id)).filter(Boolean);
  if (relatedLakes.length !== point.lakeIds.length) return null;
  return { point, lakes: relatedLakes, canonicalPath: fishingAccessCanonicalPath(point.slug) };
}

export type FishingAccessProfileData = NonNullable<Awaited<ReturnType<typeof loadFishingAccessProfileDataServer>>>;
