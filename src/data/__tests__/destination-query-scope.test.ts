import { describe, expect, it } from "vitest";
import { filterDestinationsByScope } from "../destination-query-scope";
import { TEXAS_REGION_DEFINITIONS } from "../texas-regions";
import type { Destination } from "../types";

const fixtures = [
  { slug: "aquarium", name: "Texas State Aquarium", category: "outdoors", region: "gulf-coast" },
  { slug: "enchanted-rock", name: "Enchanted Rock", category: "state-parks", region: "hill-country" },
  { slug: "palo-duro", name: "Palo Duro Canyon", category: "state-parks", region: "panhandle" },
  { slug: "caddo-lake", name: "Caddo Lake", category: "lakes-rivers", region: "piney-woods" },
  { slug: "big-bend", name: "Big Bend", category: "national-parks", region: "big-bend" },
  { slug: "rio-grande-valley", name: "South Texas refuge", category: "outdoors", region: "south-texas" },
  { slug: "prairie", name: "Prairies & Lakes state park", category: "state-parks", region: "prairies-lakes" },
] as Destination[];

describe("resolved destination region scoping", () => {
  it("keeps only the requested region even when a merged feed contains all seven", () => {
    for (const region of TEXAS_REGION_DEFINITIONS) {
      const matching = filterDestinationsByScope(fixtures, { region: region.id });
      expect(matching).toHaveLength(1);
      expect(matching.every((destination) => destination.region === region.id)).toBe(true);
    }
  });

  it("does not leak the Corpus Christi aquarium into unrelated region hubs", () => {
    expect(filterDestinationsByScope(fixtures, { region: "piney-woods" }).some((item) => item.slug === "aquarium")).toBe(false);
    expect(filterDestinationsByScope(fixtures, { region: "gulf-coast" }).some((item) => item.slug === "aquarium")).toBe(true);
  });

  it("applies region and category together after all catalog sources merge", () => {
    expect(filterDestinationsByScope(fixtures, { region: "panhandle", category: "state-parks" }).map((item) => item.slug)).toEqual(["palo-duro"]);
    expect(filterDestinationsByScope(fixtures, { region: "panhandle", category: "outdoors" })).toEqual([]);
  });

  it("preserves existing unscoped statewide discovery", () => {
    expect(filterDestinationsByScope(fixtures, {})).toEqual(fixtures);
    expect(filterDestinationsByScope(fixtures, { category: "state-parks" })).toHaveLength(3);
  });
});
