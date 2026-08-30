import type { Article } from "../types";

/**
 * Gateway articles are acquisition drafts until an editor explicitly promotes
 * them for indexing. Keep this allowlist intentionally explicit: adding a slug
 * here makes it eligible for normal article listings, internal search and the
 * sitemap, while removing it stages the page again without breaking direct QA
 * URLs.
 */
export const TEXAS_GATEWAY_INDEX_READY_SLUGS = new Set<string>([
  "best-texas-stargazing-weekend-trips",
  "texas-vs-california-differences",
  "texas-vs-florida-differences",
  "texas-traditions-you-should-experience",
  "mistakes-first-time-visitors-make-in-texas",
  "texas-bucket-list-by-season",
]);

export function isTexasGatewayArticle(article: Pick<Article, "brandId" | "id">): boolean {
  return article.brandId === "texasdefined" && article.id.startsWith("gateway-");
}

export function isTexasGatewayIndexReadySlug(slug: string): boolean {
  return TEXAS_GATEWAY_INDEX_READY_SLUGS.has(slug);
}

export function isTexasGatewayIndexReadyArticle(article: Pick<Article, "brandId" | "id" | "slug">): boolean {
  return !isTexasGatewayArticle(article) || isTexasGatewayIndexReadySlug(article.slug);
}

export function shouldNoindexTexasGatewayArticle(article: Pick<Article, "brandId" | "id" | "slug">): boolean {
  return isTexasGatewayArticle(article) && !isTexasGatewayIndexReadySlug(article.slug);
}
