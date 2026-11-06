import type { Article, ArticleBlock } from "./types";

/**
 * Shared estimated reading time for full editorial stories.
 * Do not count images or shops; empty lazy catalog stubs retain their
 * explicitly supplied estimate until the full body is loaded.
 */
export function countArticleWords(body: readonly ArticleBlock[]): number {
  return body.reduce((total, block) => {
    if (block.type === "shop" || block.type === "image") return total;
    const text = block.type === "list" ? block.items.join(" ") : block.text;
    return total + text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
}

export function calculateArticleReadingMinutes(article: Pick<Article, "body" | "readingMinutes">): number {
  const words = countArticleWords(article.body);
  return words === 0
    ? Math.max(1, article.readingMinutes)
    : Math.max(1, Math.ceil(words / 220));
}
