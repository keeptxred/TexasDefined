import { describe, expect, it } from "vitest";
import { VIATOR_TEXAS_MARKETS } from "@/data/viator-experiences";
import { VIATOR_RUNTIME_CATEGORIES, VIATOR_RUNTIME_MARKETS } from "@/data/viator-experience-runtime";
import { viatorMarketsForPlace } from "@/data/viator-market-match";

describe("Viator client runtime catalog", () => {
  it("keeps the full statewide market and booking-lane coverage", () => {
    expect(VIATOR_RUNTIME_MARKETS).toHaveLength(VIATOR_TEXAS_MARKETS.length);
    expect(VIATOR_RUNTIME_CATEGORIES).toHaveLength(12);
    expect(VIATOR_RUNTIME_MARKETS.map((market) => market.slug).sort()).toEqual(
      VIATOR_TEXAS_MARKETS.map((market) => market.slug).sort(),
    );
  });

  it("matches destination landmarks, towns and county names without the rich research payload", () => {
    expect(viatorMarketsForPlace("The Alamo").map((market) => market.slug)).toContain("san-antonio");
    expect(viatorMarketsForPlace("Travis County").map((market) => market.slug)).toContain("austin");
    expect(viatorMarketsForPlace("Space Center Houston").map((market) => market.slug)).toContain("houston");
    expect(viatorMarketsForPlace("Big Bend National Park").map((market) => market.slug)).toContain("big-bend-terlingua");
  });

  it("does not confuse Mission, Texas with San Antonio Missions", () => {
    const matches = viatorMarketsForPlace("Mission").map((market) => market.slug);
    expect(matches).toContain("rio-grande-valley");
    expect(matches).not.toContain("san-antonio");
  });
});
