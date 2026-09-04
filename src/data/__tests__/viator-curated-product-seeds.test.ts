import { describe, expect, it } from "vitest";

import { VIATOR_CURATED_PRODUCT_SEEDS, viatorSeedsForMarket } from "@/data/viator-curated-product-seeds";
import { VIATOR_TEXAS_MARKETS } from "@/data/viator-experiences";

describe("curated Viator product seeds", () => {
  it("keeps every curated product attached to a real Texas experience market", () => {
    const marketSlugs = new Set(VIATOR_TEXAS_MARKETS.map((market) => market.slug));
    for (const seed of VIATOR_CURATED_PRODUCT_SEEDS) {
      expect(marketSlugs.has(seed.marketSlug), `${seed.title} points to missing market ${seed.marketSlug}`).toBe(true);
    }
  });

  it("does not duplicate product titles", () => {
    const titles = VIATOR_CURATED_PRODUCT_SEEDS.map((seed) => seed.title.toLowerCase());
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("prioritizes deep Texas inventory rather than generic transportation", () => {
    expect(VIATOR_CURATED_PRODUCT_SEEDS.length).toBeGreaterThanOrEqual(75);
    const titles = VIATOR_CURATED_PRODUCT_SEEDS.map((seed) => seed.title.toLowerCase()).join("\n");
    for (const excluded of ["airport transfer", "black car services", "arrival private transfer", "departure private transfer", "airport shuttle"]) {
      expect(titles).not.toContain(excluded);
    }
  });

  it("captures the strongest newly supplied experience clusters", () => {
    expect(viatorSeedsForMarket("austin").length).toBeGreaterThanOrEqual(10);
    expect(viatorSeedsForMarket("san-antonio").length).toBeGreaterThanOrEqual(8);
    expect(viatorSeedsForMarket("dallas").length).toBeGreaterThanOrEqual(8);
    expect(viatorSeedsForMarket("houston").length).toBeGreaterThanOrEqual(8);
    expect(viatorSeedsForMarket("galveston").length).toBeGreaterThanOrEqual(8);
    expect(viatorSeedsForMarket("south-padre-island").length).toBeGreaterThanOrEqual(6);
    expect(viatorSeedsForMarket("waco").some((seed) => seed.title.includes("Brazos River"))).toBe(true);
    expect(viatorSeedsForMarket("big-bend-terlingua").some((seed) => seed.title.includes("Rio Grande"))).toBe(true);
  });
});
