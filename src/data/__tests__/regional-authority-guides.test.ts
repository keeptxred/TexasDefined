import { describe, expect, it } from "vitest";
import { regionalAuthorityArticles } from "../fixtures/regional-authority-guides";
import { REGION_AUTHORITY_DEPTH } from "../region-authority-depth";
import { REGION_AUTHORITY_OVERVIEWS } from "../region-authority-overviews";
import { TEXAS_REGION_DEFINITIONS } from "../texas-regions";

const canonicalGuideSlugs = ["scenic-drives-in-texas", "texas-wine-country", "texas-german-belt"];

const words = (article: (typeof regionalAuthorityArticles)[number]) =>
  article.body.map((block) => block.type === "list" ? block.items.join(" ") : block.type === "image" || block.type === "shop" ? "" : block.text).join(" ").trim().split(/\s+/).length;

describe("ten regional authority guides", () => {
  it("keeps seven stable canonical regions with distinct substantive geography/history/planning and official sources", () => {
    expect(TEXAS_REGION_DEFINITIONS).toHaveLength(7);
    for (const region of TEXAS_REGION_DEFINITIONS) {
      const context = REGION_AUTHORITY_OVERVIEWS[region.id];
      const depth = REGION_AUTHORITY_DEPTH[region.id];
      expect(context.intro.length).toBeGreaterThan(180);
      expect(context.bases).toHaveLength(3);
      expect(context.links.length).toBeGreaterThanOrEqual(4);
      expect(context.sources.length).toBeGreaterThanOrEqual(2);
      expect(depth).toHaveLength(4);
      expect(new Set(depth.map((section) => section.heading)).size).toBe(4);
      expect(depth.every((section) => section.body.length > 260)).toBe(true);
    }
  });
  it("registers exactly one full-body authority article for each of three distinct statewide intent topics", () => {
    expect(regionalAuthorityArticles.map((article) => article.slug).sort()).toEqual([...canonicalGuideSlugs].sort());
    for (const article of regionalAuthorityArticles) {
      expect(words(article)).toBeGreaterThan(1400);
      expect(article.updatedAt).toBe("2026-10-12");
      expect(article.sources?.length).toBeGreaterThanOrEqual(3);
      expect(article.sourceUrl).toMatch(/^https:\/\//);
      expect(article.internalLinks?.length).toBeGreaterThanOrEqual(10);
      expect(article.hero.alt.length).toBeGreaterThan(30);
      expect(article.body.some((block) => block.type === "image" && Boolean(block.image.credit))).toBe(true);
      expect(new Set((article.internalLinks ?? []).map((link) => link.href)).size).toBe(article.internalLinks?.length);
    }
  });
  it("distinguishes statewide travel subjects from the Hill Country's regional identifier", () => {
    expect(regionalAuthorityArticles.find((article) => article.slug === "texas-german-belt")?.region).toBe("hill-country");
    expect(regionalAuthorityArticles.find((article) => article.slug === "texas-wine-country")?.region).toBeUndefined();
    expect(regionalAuthorityArticles.find((article) => article.slug === "scenic-drives-in-texas")?.region).toBeUndefined();
  });
});
