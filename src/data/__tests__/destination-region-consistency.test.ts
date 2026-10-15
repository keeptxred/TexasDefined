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
    destination("abilene-state-park", "big-bend", 32.240731, -99.879139),
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
      .toEqual(["palo-duro-canyon-state-park", "caprock-canyons-state-park", "abilene-state-park"]);
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
  it("repairs unrecognized attractions in unambiguous cities instead of waiting for per-slug overrides", () => {
    const rows = [
      { ...destination("new-houston-museum", "hill-country", 29.76, -95.37), nearestTown: "Houston" },
      { ...destination("new-corpus-christi-venue", "hill-country", 27.80, -97.40), nearestTown: "Corpus Christi" },
      { ...destination("new-amarillo-canyon-stop", "hill-country", 35.21, -101.83), nearestTown: "Amarillo" },
      { ...destination("new-marfa-gallery", "hill-country", 30.31, -104.02), nearestTown: "Marfa" },
      { ...destination("new-dallas-history-site", "hill-country", 32.78, -96.8), nearestTown: "Dallas" },
    ];
    expect(filterDestinationsByScope(rows, { region: "hill-country" })).toEqual([]);
    expect(filterDestinationsByScope(rows, { region: "gulf-coast" }).map((row) => row.slug))
      .toEqual(["new-houston-museum", "new-corpus-christi-venue"]);
    expect(filterDestinationsByScope(rows, { region: "panhandle" }).map((row) => row.slug))
      .toEqual(["new-amarillo-canyon-stop"]);
    expect(filterDestinationsByScope(rows, { region: "big-bend" }).map((row) => row.slug))
      .toEqual(["new-marfa-gallery"]);
    expect(filterDestinationsByScope(rows, { region: "prairies-lakes" }).map((row) => row.slug))
      .toEqual(["new-dallas-history-site"]);
  });

  it("does not silently relabel borderline towns or override a source-checked venue slug", () => {
    const border = { ...destination("boundary-venue", "hill-country", 29.43, -98.49), nearestTown: "San Antonio" };
    expect(correctDestinationTravelRegion(border)).toBe(border);
    const venue = { ...destination("moody-gardens", "hill-country", 29.27, -94.85), nearestTown: "Dallas" };
    expect(correctDestinationTravelRegion(venue).region).toBe("gulf-coast");
  });

});
