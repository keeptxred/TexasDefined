import { describe, expect, it } from "vitest";
import { REGIONAL_LANDSCAPE_LINKS, landscapeRegionBacklinks } from "../region-landscape-crosslinks";
import { texasLandscapes, texasLandscapeGuides } from "../texas-landscapes";
import { TEXAS_REGION_DEFINITIONS } from "../texas-regions";

const allLandscapeSlugs = new Set([...texasLandscapes, ...texasLandscapeGuides].map((item) => item.slug));
const initiallyUnderlinked = [
  "best-places-to-photograph-texas-landscapes",
  "best-scenic-drives-for-every-texas-landscape",
  "cross-timbers",
  "forests",
  "guadalupe-mountains",
  "most-beautiful-landscapes-in-texas",
  "permian-basin",
  "post-oak-savannah",
  "rivers-and-river-valleys",
  "rolling-plains",
  "texas-geography-explained",
  "texas-landscapes-by-region",
  "what-part-of-texas-looks-like-arizona-colorado-or-the-south",
  "why-is-the-texas-hill-country-so-hilly",
];

describe("region to landscape reciprocal editorial pathways", () => {
  it("gives all seven published regions specific meaningful landscape context", () => {
    expect(Object.keys(REGIONAL_LANDSCAPE_LINKS).sort()).toEqual(TEXAS_REGION_DEFINITIONS.map(x => x.id).sort());
    for (const region of TEXAS_REGION_DEFINITIONS) {
      const links = REGIONAL_LANDSCAPE_LINKS[region.id];
      expect(links.length).toBeGreaterThanOrEqual(2);
      expect(links.every(item => item.context.length > 40)).toBe(true);
      expect(new Set(links.map(item => item.slug)).size).toBe(links.length);
    }
  });
  it("adds contextual routes for every one of the 14 measured low-inbound landscape URLs", () => {
    for (const slug of initiallyUnderlinked) {
      expect(allLandscapeSlugs.has(slug), `Landscape is a real published guide: ${slug}`).toBe(true);
      const matching = landscapeRegionBacklinks(slug);
      expect(matching.length, `A source-aware region link for ${slug}`).toBeGreaterThan(0);
      for(const region of matching) {
        expect(region.href).toBe(`/explore/region/${region.region}`);
        expect(REGIONAL_LANDSCAPE_LINKS[region.region].some(item => item.slug === slug)).toBe(true);
      }
    }
  });
  it("does not manufacture regional references for unrelated slugs", () => {
    expect(landscapeRegionBacklinks("unknown-landscape")).toEqual([]);
  });
});
