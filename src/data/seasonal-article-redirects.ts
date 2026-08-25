import type { Article } from "./types";

export const RETIRED_FALL_ARTICLE_PATH = "/article/best-places-for-fall-colors-in-texas";
export const CANONICAL_FALL_PARKS_PATH = "/article/best-texas-state-parks-for-fall-colors";

export function canonicalizeSeasonalArticleLinks(article: Article): Article {
  const links = article.internalLinks;
  if (!links?.some((link) => link.href === RETIRED_FALL_ARTICLE_PATH)) return article;

  const selfPath = `/article/${article.slug}`;
  const internalLinks = links.flatMap((link) => {
    if (link.href !== RETIRED_FALL_ARTICLE_PATH) return [link];
    if (selfPath === CANONICAL_FALL_PARKS_PATH) return [];
    return [{ ...link, href: CANONICAL_FALL_PARKS_PATH }];
  });

  return { ...article, internalLinks };
}
