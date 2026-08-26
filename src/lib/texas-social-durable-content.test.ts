import { describe, expect, it } from "vitest";
import { fixtureArticles } from "@/data/fixtures/repositories";
import { shouldNoindexTexasGatewayArticle } from "@/data/fixtures/texas-gateway-index-readiness";
import { loadTexasSocialDurablePosts } from "@/lib/texas-social-durable-content.server";

describe("TexasDefined durable social content", () => {
  it("keeps published evergreen articles eligible regardless of age", async () => {
    const posts = await loadTexasSocialDurablePosts("2026-08-26");

    expect(posts.some((post) => post.id === "article-texas-barbecue-styles-explained")).toBe(true);
    expect(posts.some((post) => post.link === "/article/texas-barbecue-styles-explained")).toBe(true);
  });

  it("uses publication date only as a future-content gate", async () => {
    const beforePublication = await loadTexasSocialDurablePosts("2026-08-05");
    const afterPublication = await loadTexasSocialDurablePosts("2026-08-26");

    expect(beforePublication.some((post) => post.id === "article-texas-barbecue-styles-explained")).toBe(false);
    expect(afterPublication.some((post) => post.id === "article-texas-barbecue-styles-explained")).toBe(true);
  });

  it("does not expose staged gateway articles through the social pool", async () => {
    const articles = await fixtureArticles.list({ brandId: "texasdefined" });
    const stagedGatewaySlugs = new Set(
      articles.filter(shouldNoindexTexasGatewayArticle).map((article) => article.slug),
    );
    const posts = await loadTexasSocialDurablePosts("2099-12-31");

    for (const post of posts) {
      if (!post.link?.startsWith("/article/")) continue;
      expect(stagedGatewaySlugs.has(post.link.slice("/article/".length))).toBe(false);
    }
  });

  it("deduplicates durable candidates by canonical link", async () => {
    const posts = await loadTexasSocialDurablePosts("2099-12-31");
    const links = posts.map((post) => post.link).filter((link): link is string => Boolean(link));
    expect(new Set(links).size).toBe(links.length);
  });
});
