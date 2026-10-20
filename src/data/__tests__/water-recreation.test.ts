import { describe, expect, it } from "vitest";

import { auditDestination } from "../destination-audit";
import { applyAllCuratedDestination } from "../destination-curation-all";
import { preservedExploreDestinations } from "../destination-preserved-catalog";
import { listResolvedDestinations } from "../destination-query-runtime";
import { selectSwimmingHoleAndTubingDestinations, SWIM_ACTIVITY_RESTRICTIONS } from "../water-recreation";
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
    const item = destination({ slug: "blanco-state-park", summary: "A spring-fed pool with year-round swimming." });
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([item]);
  });

  it("excludes prohibition-only swimming mentions", () => {
    const item = destination({ slug: "blanco-state-park", body: ["Swimming is not allowed. Stay out of the water."] });
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([]);
  });

  it("keeps mixed-rule destinations when a separate area allows swimming", () => {
    const item = destination({ slug: "colorado-bend-state-park", body: ["Do not swim at Gorman Falls. Spicewood Springs has spring-fed swimming holes."] });
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([item]);
  });

  it("does not treat wildlife uses of wading as water recreation", () => {
    const item = destination({ slug: "fort-boggy-state-park", highlights: ["Lake loops for alligators, wading birds and wetland views"] });
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([]);
  });

  it("excludes destinations with a current all-site swimming closure", () => {
    const item = destination({
      slug: "blanco-state-park",
      summary: "A spring-fed swimming hole.",
      entryNote: "Swimming is cancelled until further notice.",
    });
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([]);
  });

  it("does not pull unrelated categories into the water collection", () => {
    const item = destination({ category: "historic-sites", summary: "A historic spring-fed swimming pool." });
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([]);
  });

  it("includes New Braunfels as the canonical Comal and Guadalupe tubing gateway", () => {
    const item = destination({ slug: "new-braunfels", category: "small-towns", summary: "A Hill Country city built around the Comal and Guadalupe rivers, with tubing." });
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([item]);
  });

  it("includes San Marcos as the canonical San Marcos River tubing gateway", () => {
    const item = destination({ slug: "san-marcos", category: "small-towns", summary: "A Central Texas city built around the San Marcos River, with tubing and paddling." });
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([item]);
  });

  it("keeps the real San Marcos canonical record preserved, indexable and water-qualified", () => {
    const base = preservedExploreDestinations.find((item) => item.slug === "san-marcos");
    expect(base).toBeDefined();
    const item = applyAllCuratedDestination(base!);
    expect(auditDestination(item).readyForIndexing).toBe(true);
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([item]);
  });

  it("keeps San Marcos when the production water collection resolves the full catalog", async () => {
    const items = await listResolvedDestinations({ category: "swimming-holes-river-tubing" });
    expect(items.some((item) => item.slug === "san-marcos")).toBe(true);
  });

  it("keeps cross-category water destinations when a region is also requested", async () => {
    const items = await listResolvedDestinations({ category: "swimming-holes-river-tubing", region: "hill-country" });
    expect(items.some((item) => item.slug === "new-braunfels")).toBe(true);
    expect(items.some((item) => item.slug === "san-marcos")).toBe(true);
    expect(items.every((item) => item.region === "hill-country")).toBe(true);
  });

  it("does not advertise Abilene State Park while both pool and lake swimming are closed", () => {
    const item = destination({
      slug: "abilene-state-park",
      summary: "The historic pool and Lake Abilene were once popular for swimming.",
      entryNote: "Swimming and fishing at Lake Abilene are not permitted; the pool is closed for renovations.",
    });
    expect(SWIM_ACTIVITY_RESTRICTIONS[item.slug]?.source).toContain("tpwd.texas.gov");
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([]);
  });

  it("does not equate a passing swimming reference in an off-topic park with confirmed swimming access", () => {
    const item = destination({
      slug: "palo-duro-canyon-state-park",
      summary: "A desert canyon with a historical story about swimming.",
    });
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([]);
  });

  it("includes Bandera as the canonical Medina River tubing gateway", () => {
    const item = destination({ slug: "bandera", category: "small-towns", summary: "A Hill Country town with public Medina River swimming and tubing access." });
    expect(selectSwimmingHoleAndTubingDestinations([item])).toEqual([item]);
  });
});
