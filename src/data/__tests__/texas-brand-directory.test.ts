import { describe, expect, it } from "vitest";

import {
  TEXAS_BRAND_DIRECTORY_CATEGORIES,
  TEXAS_BRAND_DIRECTORY_COUNT,
  TEXAS_GROCERY_BRAND_EXPANSION,
  getTexasBrandCommercialPlacement,
  texasBrandCategory,
} from "../texas-brand-directory";
import { getTexasIconCategory } from "../things-unique-to-texas";

describe("Texas Brands directory", () => {
  const legacy = getTexasIconCategory("texas-brands")?.items ?? [];

  it("preserves the existing chapter while adding a substantive grocery expansion", () => {
    expect(legacy).toHaveLength(20);
    expect(TEXAS_GROCERY_BRAND_EXPANSION).toHaveLength(12);
    expect(TEXAS_BRAND_DIRECTORY_COUNT).toBe(32);
    expect(TEXAS_BRAND_DIRECTORY_CATEGORIES).toHaveLength(5);

    for (const [slug] of TEXAS_BRAND_DIRECTORY_CATEGORIES) {
      const count = legacy.filter((entry) => texasBrandCategory(entry) === slug).length
        + TEXAS_GROCERY_BRAND_EXPANSION.filter((entry) => entry.category === slug).length;
      expect(count).toBeGreaterThan(0);
    }
  });

  it("includes the priority Texas grocery and roadside institutions", () => {
    const names = [...legacy.map((entry) => entry.name), ...TEXAS_GROCERY_BRAND_EXPANSION.map((entry) => entry.name)];
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

  it("keeps grocery expansion slugs unique and commercial placement fail-closed", () => {
    const slugs = TEXAS_GROCERY_BRAND_EXPANSION.map((entry) => entry.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(getTexasBrandCommercialPlacement("icon:38")).toBeUndefined();
    expect(getTexasBrandCommercialPlacement("brand:central-market")).toBeUndefined();
  });
});
