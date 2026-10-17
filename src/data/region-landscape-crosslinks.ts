import type { TexasRegion } from "./types";

/**
 * Bidirectional, editorially selected geography context.
 * Each entry has a visitor-useful reason; the reverse-link panel on landscape
 * pages is derived from this same evidence-led mapping rather than hand-built
 * or created from arbitrary shared keywords.
 */
export type RegionalLandscapeLink = { slug: string; label: string; context: string };
export const REGIONAL_LANDSCAPE_LINKS: Record<TexasRegion, readonly RegionalLandscapeLink[]> = {
  "hill-country": [
    { slug: "why-is-the-texas-hill-country-so-hilly", label: "Why the Hill Country is so hilly", context: "Understand Edwards Plateau limestone, the Balcones fault zone and river erosion before exploring the terrain." },
    { slug: "rivers-and-river-valleys", label: "Texas river valleys", context: "Follow the valleys, springs and water access that organize much of the Hill Country." },
    { slug: "best-places-to-photograph-texas-landscapes", label: "Landscape photography planning", context: "Match light, season and access to limestone ridges, rivers and smaller towns." },
  ],
  "piney-woods": [
    { slug: "forests", label: "Texas forest landscapes", context: "Distinguish East Texas pine and hardwood forests from wetlands and working timberlands." },
    { slug: "post-oak-savannah", label: "Post Oak Savannah transition", context: "Understand the prairie-to-woodland edge between the Piney Woods and Central Texas." },
    { slug: "texas-geography-explained", label: "Texas geography explained", context: "Compare rainfall, soils and forest patterns with the rest of Texas." },
  ],
  "gulf-coast": [
    { slug: "rivers-and-river-valleys", label: "Rivers meeting the Gulf", context: "Trace watersheds downstream toward deltas, estuaries and the coastal plain." },
    { slug: "most-beautiful-landscapes-in-texas", label: "Compare Texas landscapes", context: "Place marshes, barrier islands and bays beside the state's mountain and inland scenery." },
  ],
  "panhandle": [
    { slug: "rolling-plains", label: "Rolling Plains landscape", context: "Understand the land that grades toward the High Plains and the Caprock Escarpment." },
    { slug: "best-scenic-drives-for-every-texas-landscape", label: "Scenic drives by landscape", context: "Choose routes to canyon rims, open prairie and high-plains views with realistic travel planning." },
    { slug: "texas-landscapes-by-region", label: "Landscapes by Texas region", context: "Compare Panhandle travel geography with the scientific landscape classifications." },
  ],
  "big-bend": [
    { slug: "guadalupe-mountains", label: "Guadalupe Mountains landscape", context: "Explore fossil-reef mountains, high-elevation habitat and desert-to-mountain transitions in West Texas." },
    { slug: "permian-basin", label: "Permian Basin geography", context: "See how desert basins, sedimentary rocks and oil-field geography shape West Texas travel." },
    { slug: "what-part-of-texas-looks-like-arizona-colorado-or-the-south", label: "Why West Texas looks different", context: "Compare desert, mountain and canyon settings with nearby landscapes beyond Texas." },
  ],
  "prairies-lakes": [
    { slug: "cross-timbers", label: "Cross Timbers woodland", context: "Explore the belt of oak woodland and prairie transition around North Central Texas." },
    { slug: "post-oak-savannah", label: "Post Oak Savannah", context: "Understand soils, tree cover and the transition between Blackland Prairie and East Texas." },
    { slug: "texas-landscapes-by-region", label: "Texas landscape regions", context: "Distinguish practical North Texas travel regions from natural prairie and woodland boundaries." },
  ],
  "south-texas": [
    { slug: "rivers-and-river-valleys", label: "Rio Grande and other Texas river valleys", context: "Understand the border river corridor, downstream watersheds and access differences." },
    { slug: "texas-geography-explained", label: "The geography behind South Texas", context: "Compare brushland, coastal plain, rainfall and the Rio Grande Valley with the rest of the state." },
    { slug: "most-beautiful-landscapes-in-texas", label: "Texas landscapes in perspective", context: "Place South Texas thornscrub, wetlands and coastal-border transitions in statewide context." },
  ],
};

export function landscapeRegionBacklinks(slug: string) {
  return (Object.entries(REGIONAL_LANDSCAPE_LINKS) as [TexasRegion, readonly RegionalLandscapeLink[]][])
    .flatMap(([region, links]) =>
      links.filter((link) => link.slug === slug).map((link) => ({
        region,
        href: `/explore/region/${region}`,
        explanation: link.context,
      })),
    );
}
