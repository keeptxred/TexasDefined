import { describe, expect, it } from "vitest";

import { COUNTY_INDUSTRY_PATHS } from "@/data/county-industry-paths";
import { TEXAS_INDUSTRIES } from "@/data/texas-industries";

describe("county industry authority paths", () => {
  const validIndustryHrefs = new Set(TEXAS_INDUSTRIES.map((industry) => industry.href));

  it("points every county pathway at a published Texas industry route", () => {
    for (const [countySlug, paths] of Object.entries(COUNTY_INDUSTRY_PATHS)) {
      expect(paths.length, countySlug).toBeGreaterThan(0);
      for (const path of paths) {
        expect(validIndustryHrefs.has(path.href), `${countySlug}: ${path.href}`).toBe(true);
        expect(path.label.trim().length, countySlug).toBeGreaterThan(0);
        expect(path.context.trim().length, countySlug).toBeGreaterThan(40);
      }
    }
  });

  it("does not duplicate the same sector on one county page", () => {
    for (const [countySlug, paths] of Object.entries(COUNTY_INDUSTRY_PATHS)) {
      const hrefs = paths.map((path) => path.href);
      expect(new Set(hrefs).size, countySlug).toBe(hrefs.length);
    }
  });

  it("covers the major statewide industry geographies that motivated the local graph", () => {
    expect(COUNTY_INDUSTRY_PATHS.harris.map((path) => path.href)).toContain("/texas-industries/energy-power");
    expect(COUNTY_INDUSTRY_PATHS.midland.map((path) => path.href)).toContain("/texas-industries/energy-power");
    expect(COUNTY_INDUSTRY_PATHS.webb.map((path) => path.href)).toContain("/texas-industries/trade-transportation-logistics");
    expect(COUNTY_INDUSTRY_PATHS.grayson.map((path) => path.href)).toContain("/texas-industries/technology-semiconductors");
    expect(COUNTY_INDUSTRY_PATHS.lubbock.map((path) => path.href)).toContain("/texas-industries/agriculture-livestock");
    expect(COUNTY_INDUSTRY_PATHS.bexar.map((path) => path.href)).toContain("/texas-industries/aerospace-aviation-defense");
    expect(COUNTY_INDUSTRY_PATHS.galveston.map((path) => path.href)).toContain("/texas-industries/hospitality-tourism-culture");
  });
});
