import { describe, expect, it } from "vitest";

import { enrichCavernAreaGuide } from "../cavern-area-guides";
import type { Destination } from "../types";

function destination(slug: string, category: Destination["category"] = "caverns"): Destination {
  return {
    id: `test-${slug}`,
    brandId: "texasdefined",
    slug,
    name: slug.replaceAll("-", " "),
    summary: "A substantive Texas destination summary used for area-guide tests.",
    category,
    region: "hill-country",
    nearestTown: "Test",
    coordinates: { lat: 30, lng: -98 },
    hero: { src: "/test.jpg", alt: "Test destination image", width: 1, height: 1 },
    bestSeason: "Year-round",
    entryNote: "Check current visitor information.",
    highlights: ["Test"],
    body: ["Test body."],
  };
}

describe("cavern area guides", () => {
  it.each(["wonder-world-cave", "gorman-cave", "westcave-preserve"])("adds a complete area guide for %s", (slug) => {
    const enriched = enrichCavernAreaGuide(destination(slug));
    expect(enriched.areaGuide).toBeDefined();
    expect(enriched.areaGuide?.nearbyAttractions.length).toBeGreaterThan(0);
    expect(enriched.areaGuide?.foodAndDrink.length).toBeGreaterThan(0);
    expect(enriched.areaGuide?.lodging.length).toBeGreaterThan(0);
    expect(enriched.areaGuide?.neighborhoods.length).toBeGreaterThan(0);
    expect(enriched.areaGuide?.familyStops.length).toBeGreaterThan(0);
    expect(enriched.areaGuide?.sideTrips.length).toBeGreaterThan(0);
  });

  it("preserves an existing hand-curated guide", () => {
    const base = destination("wonder-world-cave");
    const custom = { ...enrichCavernAreaGuide(base).areaGuide!, intro: "Existing guide must win." };
    const result = enrichCavernAreaGuide({ ...base, areaGuide: custom });
    expect(result.areaGuide?.intro).toBe("Existing guide must win.");
  });

  it("does not attach cavern copy to unrelated destination categories", () => {
    const result = enrichCavernAreaGuide(destination("wonder-world-cave", "historic-sites"));
    expect(result.areaGuide).toBeUndefined();
  });
});
