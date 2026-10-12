import { fishingPlatform, fishingScope } from "./index";
import { LAKE_CONROE_SLUG, lakeConroeCanonicalPath } from "./lake-conroe-routing";
import { isShowcaseLakeSlug, showcaseLakeCanonicalPath } from "./showcase-lake-routing";
import { FISHING_GUIDES_DIRECTORY_PATH, FISHING_GUIDES_VERIFIED_AT, fishingGuideCanonicalPath } from "./guide-routing";

export async function loadFishingGuideSitemapEntriesServer() {
  const [guides, lakes] = await Promise.all([
    fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 }),
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);
  // The matching route indexes /guides only when at least one verified
  // guide listing exists. Do not advertise an empty section in Google's sitemap.
  const qualifiedLakeIds = new Set(guides.flatMap((guide) => guide.lakeIds));
  const lakeSectionEntries = lakes.filter((lake) =>
    qualifiedLakeIds.has(lake.id) && Boolean(lake.verifiedAt) && lake.sources.length > 0
  ).flatMap((lake) => lake.slug === LAKE_CONROE_SLUG
    ? [{ path: lakeConroeCanonicalPath("guides"), lastmod: lake.verifiedAt }]
    : isShowcaseLakeSlug(lake.slug)
      ? [{ path: showcaseLakeCanonicalPath(lake.slug, "guides"), lastmod: lake.verifiedAt }]
      : []);
  return [
    ...(guides.length ? [{ path: FISHING_GUIDES_DIRECTORY_PATH, lastmod: FISHING_GUIDES_VERIFIED_AT }] : []),
    ...guides.map((guide) => ({ path: fishingGuideCanonicalPath(guide.slug), lastmod: guide.verifiedAt })),
    ...lakeSectionEntries,
  ];
}
