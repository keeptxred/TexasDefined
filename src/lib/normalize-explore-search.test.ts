import { describe, expect, it } from "vitest";
import { normalizeExploreSearch } from "./normalize-explore-search";

describe("Explore search SSR query normalization", () => {
  it("handles absent origin and malformed optional values without throwing", () => {
    for (const value of [undefined, null, 0, false, {}, []]) {
      expect(normalizeExploreSearch(value)).toBe("");
    }
  });
  it("preserves valid queries with case and whitespace normalization", () => {
    expect(normalizeExploreSearch("  Caddo   Lake  ")).toBe("caddo lake");
    expect(normalizeExploreSearch("San Antonio")).toBe("san antonio");
  });
});
