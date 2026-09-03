import { describe, expect, it } from "vitest";
import { VIATOR_TEXAS_MARKETS } from "@/data/viator-experiences";
import { VIATOR_RUNTIME_CATEGORIES, VIATOR_RUNTIME_MARKETS, runtimeMarketsForPlace } from "@/data/viator-experience-runtime";

describe("Viator client runtime catalog", () => {
  it("keeps the full statewide market and booking-lane coverage", () => {
    expect(VIATOR_RUNTIME_MARKETS).toHaveLength(VIATOR_TEXAS_MARKETS.length);
    expect(VIATOR_RUNTIME_CATEGORIES).toHaveLength(12);
    expect(VIATOR_RUNTIME_MARKETS.map((market) => market.slug).sort()).toEqual(
      VIATOR_TEXAS_MARKETS.map((market) => market.slug).sort(),
    );
  });

  it("matches destination landmarks, towns and county names without the rich research payload", () => {
    expect(runtimeMarketsForPlace("The Alamo").map((market) => market.slug)).toContain("san-antonio");
    expect(runtimeMarketsForPlace("Travis County").map((market) => market.slug)).toContain("austin");
    expect(runtimeMarketsForPlace("Space Center Houston").map((market) => market.slug)).toContain("houston");
    expect(runtimeMarketsForPlace("Big Bend National Park").map((market) => market.slug)).toContain("big-bend-terlingua");
  });
});
