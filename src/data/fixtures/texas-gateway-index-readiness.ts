import type { Article, ArticleBlock } from "../types";

/**
 * Gateway articles are acquisition drafts until an editor explicitly promotes
 * them for indexing. Keep this allowlist intentionally explicit: adding a slug
 * here makes it eligible for normal article listings, internal search and the
 * sitemap, while removing it stages the page again without breaking direct QA
 * URLs.
 */
export const TEXAS_GATEWAY_INDEX_READY_SLUGS = new Set<string>([
  "texas-vs-california-differences",
  "texas-vs-florida-differences",
  "texas-traditions-you-should-experience",
  "mistakes-first-time-visitors-make-in-texas",
  "texas-bucket-list-by-season",
]);

export const ARTICLE_INDEX_MIN_BODY_WORDS = 600;
export const ARTICLE_INDEX_MIN_DEK_CHARS = 80;
export const ARTICLE_DISCOVERY_MIN_READING_MINUTES = 4;

export function isTexasGatewayArticle(article: Pick<Article, "brandId" | "id">): boolean {
  return article.brandId === "texasdefined" && article.id.startsWith("gateway-");
}

export function isTexasGatewayIndexReadySlug(slug: string): boolean {
  return TEXAS_GATEWAY_INDEX_READY_SLUGS.has(slug);
}

export function isTexasGatewayIndexReadyArticle(article: Pick<Article, "brandId" | "id" | "slug">): boolean {
  return !isTexasGatewayArticle(article) || isTexasGatewayIndexReadySlug(article.slug);
}

function blockWordCount(block: ArticleBlock): number {
  const text = block.type === "list"
    ? block.items.join(" ")
    : block.type === "image" || block.type === "shop"
      ? ""
      : block.text;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function articleBodyWordCount(article: Pick<Article, "body">): number {
  return article.body.reduce((total, block) => total + blockWordCount(block), 0);
}

function hasValidOptionalSource(article: Pick<Article, "sourceName" | "sourceUrl">): boolean {
  const name = article.sourceName?.trim() ?? "";
  const url = article.sourceUrl?.trim() ?? "";
  if (!name && !url) return true;
  if (!name || !url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function hasArticleReadinessMetadata(article: Article): boolean {
  if (!isTexasGatewayIndexReadyArticle(article)) return false;
  if (!article.title.trim() || article.dek.trim().length < ARTICLE_INDEX_MIN_DEK_CHARS) return false;
  if (!article.authorId.trim()) return false;
  if (!article.hero?.src?.trim() || !article.hero?.alt?.trim()) return false;
  return hasValidOptionalSource(article);
}

/**
 * Strict route-level boundary for a fully loaded editorial article. Direct URLs
 * remain usable for QA/history, but a full article must carry substantive body
 * depth before it can be indexed.
 */
export function isArticleIndexReady(article: Article): boolean {
  return hasArticleReadinessMetadata(article)
    && articleBodyWordCount(article) >= ARTICLE_INDEX_MIN_BODY_WORDS;
}

/**
 * Catalog-level boundary for list/search/RSS/sitemap surfaces.
 *
 * TexasDefined deliberately represents many validated long-form articles as
 * lightweight lazy stubs whose body is omitted from the catalog bundle and
 * loaded only on the detail route. A completely omitted body may therefore use
 * the stub's conservative reading-time signal, but a partially populated thin
 * body can never use that escape hatch. The full detail route still applies
 * `isArticleIndexReady`, so lazy delivery does not weaken page-level indexing.
 */
export function isArticleDiscoveryReady(article: Article): boolean {
  if (!hasArticleReadinessMetadata(article)) return false;
  const bodyWords = articleBodyWordCount(article);
  if (bodyWords >= ARTICLE_INDEX_MIN_BODY_WORDS) return true;
  return bodyWords === 0
    && article.body.length === 0
    && article.readingMinutes >= ARTICLE_DISCOVERY_MIN_READING_MINUTES;
}

/**
 * Backward-compatible route helper. The existing name is retained so direct
 * article route callers keep the gateway quarantine while gaining the stronger
 * shared public-readiness decision.
 */
export function shouldNoindexTexasGatewayArticle(article: Article): boolean {
  return !isArticleIndexReady(article);
}
