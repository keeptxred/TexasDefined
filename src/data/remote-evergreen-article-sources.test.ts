import { describe, expect, it } from "vitest";
import type { Article } from "./types";
import { remoteEvergreenAuthoritySources } from "./remote-evergreen-authority-sources";
import { withRemoteEvergreenAuthoritySources } from "./remote-evergreen-article-sources";

const baseArticle = (slug: string): Article => ({
  id: `article:${slug}`,
  brandId: "texasdefined",
  slug,
  title: "Test article",
  dek: "Test description",
  category: "texas-history",
  hero: { src: "/hero.jpg", alt: "Test hero image", width: 1600, height: 900 },
  authorId: "editorial-desk",
  publishedAt: "2026-08-27T00:00:00.000Z",
  readingMinutes: 8,
  tags: ["Texas"],
  body: [{ type: "paragraph", text: "Original body." }],
  relatedCollections: [],
  relatedDestinations: [],
});

describe("remote evergreen article authority sources", () => {
  it("adds a primary source and visible multi-source section to every governed article", () => {
    for (const [slug, sources] of Object.entries(remoteEvergreenAuthoritySources)) {
      const article = withRemoteEvergreenAuthoritySources(baseArticle(slug));
      expect(article.sourceUrl, slug).toBe(sources[0].url);
      expect(article.sourceName, slug).toBe(sources[0].label);
      expect(article.body.some((block) => block.type === "heading" && block.text === "Sources and further reading"), slug).toBe(true);
      const sourceList = article.body.find((block) => block.type === "list" && block.items.some((item) => item.includes(sources[0].url)));
      expect(sourceList, slug).toBeDefined();
      if (sourceList?.type === "list") {
        for (const source of sources) {
          expect(sourceList.items.some((item) => item.includes(source.url)), `${slug}: ${source.url}`).toBe(true);
        }
      }
    }
  });

  it("preserves an article's explicit primary source and avoids duplicate source headings", () => {
    const slug = "sam-houston-texas-life-legacy";
    const article = baseArticle(slug);
    article.sourceUrl = "https://example.com/original";
    article.sourceName = "Original primary source";
    article.body.push({ type: "heading", text: "Sources and further reading" });

    const enriched = withRemoteEvergreenAuthoritySources(article);
    expect(enriched.sourceUrl).toBe("https://example.com/original");
    expect(enriched.sourceName).toBe("Original primary source");
    expect(enriched.body.filter((block) => block.type === "heading" && block.text === "Sources and further reading")).toHaveLength(1);
  });

  it("leaves articles outside the governed cohort unchanged", () => {
    const article = baseArticle("not-in-remote-evergreen-cohort");
    expect(withRemoteEvergreenAuthoritySources(article)).toBe(article);
  });
});
