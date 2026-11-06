import type { Article } from "./types";
import { calculateArticleReadingMinutes, countArticleWords } from "./article-reading-time.ts";

/**
 * A discovery stub has no article body, so its declared readingMinutes is an
 * estimate, not a verified measurement. Never display that value as fact.
 *
 * Lists capped at 24 cards resolve the same canonical detail article the
 * reader opens, in parallel. Unbounded directories do not load hundreds of
 * full articles solely to print reading times.
 */
export const MAX_DISCOVERY_READING_TIME_RESOLUTION = 24;

export function verifiedDiscoveryReadingMinutes(article: Article): number | null {
  return article.readingTimeVerified === true ? article.readingMinutes : null;
}

export async function verifyDiscoveryReadingTimes(
  articles: Article[],
  loadCanonicalDetail: (slug: string) => Promise<Article | null>,
  maxArticles = MAX_DISCOVERY_READING_TIME_RESOLUTION,
): Promise<Article[]> {
  if (!articles.length || articles.length > maxArticles) return articles;

  return Promise.all(articles.map(async (article) => {
    try {
      const detail = await loadCanonicalDetail(article.slug);
      if (!detail || countArticleWords(detail.body) === 0) {
        return { ...article, readingTimeVerified: false };
      }
      return {
        ...article,
        readingMinutes: calculateArticleReadingMinutes(detail),
        readingTimeVerified: true,
      };
    } catch {
      // A temporary detail failure must not re-expose the stub's guessed time.
      return { ...article, readingTimeVerified: false };
    }
  }));
}
