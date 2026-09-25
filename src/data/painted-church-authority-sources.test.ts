import { describe, expect, it } from "vitest";

import {
  paintedChurchAuthoritySources,
  paintedChurchResearchExpansionSources,
} from "./painted-church-authority-sources";

describe("painted church research source expansions", () => {
  it("keeps each expansion at exactly fifteen source pages", () => {
    expect(paintedChurchAuthoritySources).toHaveLength(15);
    expect(paintedChurchResearchExpansionSources).toHaveLength(15);
  });

  it("does not reuse an exact source URL from the earlier expansion", () => {
    const originalUrls = new Set(paintedChurchAuthoritySources.map((source) => source.url));
    for (const source of paintedChurchResearchExpansionSources) {
      expect(originalUrls.has(source.url)).toBe(false);
    }
  });

  it("keeps every source URL unique inside the new research pass", () => {
    const urls = paintedChurchResearchExpansionSources.map((source) => source.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("keeps every new source tied to at least one church and a substantive contribution", () => {
    for (const source of paintedChurchResearchExpansionSources) {
      expect(source.churchSlugs.length).toBeGreaterThan(0);
      expect(source.contribution.length).toBeGreaterThan(40);
      expect(source.url).toMatch(/^https:\/\//);
    }
  });
});
