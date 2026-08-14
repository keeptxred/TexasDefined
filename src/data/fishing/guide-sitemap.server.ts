import { fishingPlatform, fishingScope } from "./index";
import { fishingGuideCanonicalPath } from "./guide-routing";

export async function loadFishingGuideSitemapEntriesServer() {
  const guides = await fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 });
  return guides.map((guide) => ({ path: fishingGuideCanonicalPath(guide.slug), lastmod: guide.verifiedAt }));
}
