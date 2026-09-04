import { describe, expect, it } from "vitest";

import { selectSwimmingHoleAndTubingDestinations } from "../water-recreation";
import type { Destination } from "../types";

const destination = (overrides: Partial<Destination>): Destination => ({
  id: "test",
  brandId: "texasdefined",
  slug: "test",
  name: "Test destination",
  summary: "Texas destination",
  category: "state-parks",
  region: "hill-country",
  nearestTown: "Test",
  coordinates: { lat: 30, lng: -98 },
  hero: { src: "/test.jpg", alt: "Test", width: 1, height: 1 },
  bestSeason: "Year-round",
  entryNote: "Check current conditions.",
  highlights: [],
  body: [],
  ...overrides,
});

describe("Swimming Holes & River Tubing qualification", () => {
  it("includes destinations with clear positive swimming signals", () => {
    const item = destination({ summary: "A spring-fed pool with year-round swimming." });
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([item]);
  });

  it("excludes prohibition-only swimming mentions", () => {
    const item = destination({ body: ["Swimming is not allowed. Stay out of the water."] });
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([]);
  });

  it("keeps mixed-rule destinations when a separate area allows swimming", () => {
    const item = destination({ body: ["Do not swim at Gorman Falls. Spicewood Springs has spring-fed swimming holes."] });
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([item]);
  });

  it("does not pull unrelated categories into the water collection", () => {
    const item = destination({ category: "historic-sites", summary: "A historic spring-fed swimming pool." });
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([]);
  });

  it("includes New Braunfels as the canonical Comal and Guadalupe tubing gateway", () => {
    const item = destination({ slug: "new-braunfels", category: "small-towns", summary: "A Hill Country city built around the Comal and Guadalupe rivers, with tubing." });
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([item]);
  });
});
