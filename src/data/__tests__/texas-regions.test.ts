import { describe, expect, it } from "vitest";

import { TEXAS_REGION_DEFINITIONS } from "../texas-regions";

const expectedRegions = [
  ["big-bend", "Big Bend Country", "/explore/region/big-bend"],
  ["gulf-coast", "Gulf Coast", "/explore/region/gulf-coast"],
  ["hill-country", "Hill Country", "/explore/region/hill-country"],
  ["panhandle", "Panhandle Plains", "/explore/region/panhandle"],
  ["piney-woods", "Piney Woods", "/explore/region/piney-woods"],
  ["prairies-lakes", "Prairies & Lakes", "/explore/region/prairies-lakes"],
  ["south-texas", "South Texas Plains", "/explore/region/south-texas"],
] as const;

describe("TexasDefined seven-region taxonomy", () => {
  it("defines exactly seven stable regions with canonical Explore paths", () => {
    expect(TEXAS_REGION_DEFINITIONS.map(({ id, name }) => [id, name, `/explore/region/${id}`])).toEqual(expectedRegions);
  });

  it("keeps identifiers and names unique", () => {
    expect(new Set(TEXAS_REGION_DEFINITIONS.map((region) => region.id)).size).toBe(7);
    expect(new Set(TEXAS_REGION_DEFINITIONS.map((region) => region.name)).size).toBe(7);
  });

  it("provides useful regional descriptions without loading article-length copy", () => {
    for (const region of TEXAS_REGION_DEFINITIONS) {
      expect(region.blurb.length).toBeGreaterThan(50);
      expect(region.blurb.length).toBeLessThan(140);
    }
  });
});
