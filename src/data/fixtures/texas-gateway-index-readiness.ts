import type { Article } from "../types";

/**
 * Gateway articles are acquisition drafts until an editor explicitly promotes
 * them for indexing. Keep this allowlist intentionally explicit: adding a slug
 * here makes it eligible for normal article listings, internal search and the
 * sitemap, while removing it stages the page again without breaking direct QA
 * URLs.
 */
export const TEXAS_GATEWAY_INDEX_READY_SLUGS = new Set<string>([]);

// Keep the public article-route check compile-time light while no gateway is
// promoted. A future promotion must deliberately flip this alongside the
// allowlist; leaving it false is conservative because the promoted page would
// remain noindex rather than exposing an unreviewed page to indexing.
const HAS_INDEX_READY_GATEWAYS = false;

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
  return isTexasGatewayArticle(article)
    && (!HAS_INDEX_READY_GATEWAYS || !isTexasGatewayIndexReadySlug(article.slug));
}
