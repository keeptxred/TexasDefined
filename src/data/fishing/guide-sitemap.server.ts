import { fishingPlatform, fishingScope } from "./index";
import { FISHING_GUIDES_DIRECTORY_PATH, FISHING_GUIDES_VERIFIED_AT, fishingGuideCanonicalPath } from "./guide-routing";

export async function loadFishingGuideSitemapEntriesServer() {
  const guides = await fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 });
  return [
    ...(guides.length ? [{ path: FISHING_GUIDES_DIRECTORY_PATH, lastmod: FISHING_GUIDES_VERIFIED_AT }] : []),
    ...guides.map((guide) => ({ path: fishingGuideCanonicalPath(guide.slug), lastmod: guide.verifiedAt })),
  ];
}
