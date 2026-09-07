import { describe, expect, it } from "vitest";
import type { TexasBrandLocatorLocation } from "../data/texas-brand-locator.types";
import { scopeTexasBrandLocationsToPlace } from "./texas-defined-ai-location-place.server";

const result = (id: string, city: string): TexasBrandLocatorLocation => ({
  id,
  brand: "bucees",
  brandLabel: "Buc-ee's",
  name: `Buc-ee's ${city}`,
  address: `100 Test Rd, ${city}, TX 75000`,
  city,
  postalCode: "75000",
  distanceMiles: 10,
  latitude: 30,
  longitude: -97,
  directionsUrl: "https://www.google.com/maps/search/?api=1&query=test",
  sourceLabel: "Buc-ee's official locations",
  sourceUrl: "https://buc-ees.com/locations/",
});

describe("Ask Texas brand location place scoping", () => {
  it("keeps only exact-city results for an in-city question", async () => {
    const scope = await scopeTexasBrandLocationsToPlace(
      [result("austin", "Austin"), result("bastrop", "Bastrop")],
      { kind: "city", name: "Austin", slug: "austin" },
    );

    expect(scope.mode).toBe("within-city");
    expect(scope.exact).toBe(true);
    expect(scope.results.map((item) => item.city)).toEqual(["Austin"]);
  });

  it("returns no city match instead of relabeling the nearest store", async () => {
    const scope = await scopeTexasBrandLocationsToPlace(
      [result("bastrop", "Bastrop")],
      { kind: "city", name: "Austin", slug: "austin" },
    );

    expect(scope.mode).toBe("within-city");
    expect(scope.exact).toBe(false);
    expect(scope.results).toEqual([]);
  });

  it("preserves nearest-location behavior for metro anchors", async () => {
    const locations = [result("austin", "Austin"), result("bastrop", "Bastrop")];
    const scope = await scopeTexasBrandLocationsToPlace(
      locations,
      { kind: "metro-area", name: "Austin metro", slug: "austin-round-rock-san-marcos" },
    );

    expect(scope.mode).toBe("nearest");
    expect(scope.results).toEqual(locations);
  });
});
