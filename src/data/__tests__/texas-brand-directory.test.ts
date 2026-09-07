import { describe, expect, it } from "vitest";

import {
  TEXAS_BRAND_DIRECTORY,
  TEXAS_BRAND_DIRECTORY_CATEGORIES,
  getTexasBrandDirectoryByCategory,
} from "../texas-brand-directory";

describe("Texas Brands directory", () => {
  it("keeps a substantive multi-category Texas brand inventory", () => {
    expect(TEXAS_BRAND_DIRECTORY.length).toBeGreaterThanOrEqual(25);
    expect(TEXAS_BRAND_DIRECTORY_CATEGORIES.length).toBeGreaterThanOrEqual(5);

    for (const category of TEXAS_BRAND_DIRECTORY_CATEGORIES) {
      expect(getTexasBrandDirectoryByCategory(category.slug).length).toBeGreaterThan(0);
    }
  });

  it("includes the priority Texas grocery and roadside institutions", () => {
    const names = TEXAS_BRAND_DIRECTORY.map((entry) => entry.name);
    expect(names).toEqual(expect.arrayContaining([
      "H-E-B",
      "Central Market",
      "Joe V's Smart Shop",
      "Brookshire's",
      "United Supermarkets",
      "Fiesta Mart",
      "Whole Foods Market",
      "Buc-ee's",
    ]));
  });

  it("keeps slugs unique and commercial placements explicitly disclosed", () => {
    const slugs = TEXAS_BRAND_DIRECTORY.map((entry) => entry.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const entry of TEXAS_BRAND_DIRECTORY) {
      expect(entry.texasConnection.length).toBeGreaterThan(60);
      if (entry.commercial) {
        expect(entry.commercial.href).toMatch(/^https:\/\//);
        expect(entry.commercial.cta.trim().length).toBeGreaterThan(0);
        expect(entry.commercial.disclosure.trim().length).toBeGreaterThan(15);
      }
    }
  });
});
