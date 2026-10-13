import { describe, expect, it } from "vitest";
import { filterDestinationsByScope } from "../destination-query-scope";
import {
  CANONICAL_DESTINATION_TRAVEL_REGIONS,
  correctDestinationTravelRegion,
  isGeographicallyPlausibleForTravelRegion,
} from "../destination-region-consistency";
import type { Destination, TexasRegion } from "../types";

const destination = (
  slug: string,
  region: TexasRegion,
  lat: number,
  lng: number,
): Destination => ({
  id: slug,
  slug,
  region,
  category: "outdoors",
  coordinates: { lat, lng },
  name: slug,
  brandId: "texasdefined",
  hero: { src: "", alt: "", width: 1, height: 1 },
  summary: "",
  nearestTown: "",
  bestSeason: "",
  entryNote: "",
  highlights: [],
  body: [],
});

describe("geographic consistency across all Explore regional routes", () => {
  const mislabeled = [
    destination("texas-state-aquarium", "hill-country", 27.81, -97.39),
    destination("moody-gardens", "hill-country", 29.2739, -94.8506),
    destination("houston-zoo", "hill-country", 29.7158, -95.3903),
    destination("downtown-aquarium-houston", "hill-country", 29.76, -95.37),
    destination("houston-interactive-aquarium-animal-preserve", "hill-country", 29.63, -95.17),
    destination("space-center-houston", "hill-country", 29.5519, -95.0981),
    destination("palo-duro-canyon-state-park", "hill-country", 34.9845, -101.7017),
    destination("caprock-canyons-state-park", "hill-country", 34.4, -101.07),
    destination("big-bend-national-park", "hill-country", 29.3286, -103.2067),
    destination("guadalupe-mountains-national-park", "hill-country", 31.8936, -104.8227),
    destination("dinosaur-valley-state-park", "hill-country", 32.249, -97.81),
    destination("brazos-bend-state-park", "hill-country", 29.371, -95.63),
  ];

  it("does not allow famous non-Hill-Country locations in the Hill Country route or its JSON-LD", () => {
    const rows = [...mislabeled, destination("natural-bridge-caverns", "hill-country", 29.69, -98.34)];
    expect(filterDestinationsByScope(rows, { region: "hill-country" }).map((d) => d.slug))
      .toEqual(["natural-bridge-caverns"]);
  });

  it("puts incorrectly tagged known places back into their checked regional catalogs", () => {
    expect(filterDestinationsByScope(mislabeled, { region: "gulf-coast" }).map((d) => d.slug))
      .toEqual(["texas-state-aquarium", "moody-gardens", "houston-zoo", "downtown-aquarium-houston", "houston-interactive-aquarium-animal-preserve", "space-center-houston", "brazos-bend-state-park"]);
    expect(filterDestinationsByScope(mislabeled, { region: "panhandle" }).map((d) => d.slug))
      .toEqual(["palo-duro-canyon-state-park", "caprock-canyons-state-park"]);
    expect(filterDestinationsByScope(mislabeled, { region: "big-bend" }).map((d) => d.slug))
      .toEqual(["big-bend-national-park", "guadalupe-mountains-national-park"]);
    expect(filterDestinationsByScope(mislabeled, { region: "prairies-lakes" }).map((d) => d.slug))
      .toEqual(["dinosaur-valley-state-park"]);
  });

  it("rejects clearly impossible Hill Country coordinates even if an unknown row's slug is not curated", () => {
    const unknownWrong = destination("new-north-texas-site-needing-editorial-research", "hill-country", 34.5, -98.5);
    expect(isGeographicallyPlausibleForTravelRegion(unknownWrong, "hill-country")).toBe(false);
    expect(filterDestinationsByScope([unknownWrong], { region: "hill-country" })).toEqual([]);
  });

  it("does not invent boundaries for plausible edge places or missing coordinates", () => {
    expect(isGeographicallyPlausibleForTravelRegion(destination("san-antonio-border-place", "hill-country", 29.43, -98.49), "hill-country")).toBe(true);
    expect(isGeographicallyPlausibleForTravelRegion(destination("missing-coordinate-site", "hill-country", 0, 0), "hill-country")).toBe(true);
  });

  it("does not mutate source records when repairing editorial region membership", () => {
    const input = destination("moody-gardens", "hill-country", 29.2739, -94.8506);
    const corrected = correctDestinationTravelRegion(input);
    expect(input.region).toBe("hill-country");
    expect(corrected.region).toBe("gulf-coast");
    expect(corrected).not.toBe(input);
    expect(CANONICAL_DESTINATION_TRAVEL_REGIONS["moody-gardens"]).toBe("gulf-coast");
  });
});
