import type { Article, ArticleBlock } from "./types";
import { isTexasGatewayIndexReadyArticle } from "./fixtures/texas-gateway-index-readiness";

export const ARTICLE_INDEX_MIN_BODY_WORDS = 600;
export const ARTICLE_INDEX_MIN_DEK_CHARS = 80;

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

/**
 * Conservative public-discovery boundary for editorial articles.
 *
 * Direct URLs remain usable for QA and historical links, but pages that do not
 * yet meet this floor are noindexed, excluded from the sitemap and withheld
 * from normal article/search discovery until they are enriched. This is not a
 * writing target; it is only a minimum protection against thin/template-like
 * pages being advertised to search engines or reviewed as monetizable content.
 */
export function isArticleIndexReady(article: Article): boolean {
  if (!isTexasGatewayIndexReadyArticle(article)) return false;
  if (!article.title.trim() || article.dek.trim().length < ARTICLE_INDEX_MIN_DEK_CHARS) return false;
  if (!article.authorId.trim()) return false;
  if (!article.hero?.src?.trim() || !article.hero?.alt?.trim()) return false;
  if (!hasValidOptionalSource(article)) return false;
  return articleBodyWordCount(article) >= ARTICLE_INDEX_MIN_BODY_WORDS;
}
