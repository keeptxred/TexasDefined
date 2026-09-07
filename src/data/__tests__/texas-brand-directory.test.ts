import { describe, expect, it } from "vitest";

import { TEXAS_BRAND_DIRECTORY_COUNT, TEXAS_GROCERY_BRAND_EXPANSION } from "../texas-brand-directory";
import { getTexasIconCategory } from "../things-unique-to-texas";

describe("Texas Brands grocery expansion", () => {
  const legacy = getTexasIconCategory("texas-brands")?.items ?? [];

  it("preserves all existing Texas Brands entries and expands the chapter", () => {
    expect(legacy).toHaveLength(20);
    expect(TEXAS_GROCERY_BRAND_EXPANSION).toHaveLength(12);
    expect(TEXAS_BRAND_DIRECTORY_COUNT).toBe(32);
  });

  it("includes the priority Texas grocery institutions without duplicates", () => {
    const names = TEXAS_GROCERY_BRAND_EXPANSION.map(([name]) => name);
    expect(new Set(names).size).toBe(names.length);
    expect(names).toEqual(expect.arrayContaining([
      "Central Market",
      "Joe V's Smart Shop",
      "Brookshire's",
      "United Supermarkets",
      "Fiesta Mart",
      "Whole Foods Market",
    ]));
    expect(legacy.map((entry) => entry.name)).toContain("H-E-B");
    expect(legacy.map((entry) => entry.name)).toContain("Buc-ee's");
  });
});
