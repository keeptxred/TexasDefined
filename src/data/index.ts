import type { BrandId } from "@/brand/types";

import { caddoLakeCypressMorningArticle } from "./fixtures/caddo-lake-cypress-morning";
import { fixturePlatform } from "./fixtures/repositories";
import type { PlatformRepositories } from "./repositories";
import type { Article, ArticleBlock } from "./types";

/**
 * The single binding point between the app and its data source.
 *
 * Destinations are served from the shared Supabase Explore catalog
 * (`src/data/explore-remote.ts`). These fixture repositories remain bound here
 * only as an outage fallback: `src/data/queries.ts` uses them when the remote
 * catalog errors or returns nothing. Editorial content (articles, guides,
 * products, events) is still fixture-backed until it moves to the catalog.
 */

const wordsInBlock = (block: ArticleBlock) => {
  if (block.type === "shop") return 0;
  const text = block.type === "list" ? block.items.join(" ") : block.text;
  return text.trim().split(/\s+/).filter(Boolean).length;
};

const computedReadingMinutes = (article: Article) => {
  const wordCount = article.body.reduce((total, block) => total + wordsInBlock(block), 0);
  return Math.max(1, Math.ceil(wordCount / 220));
};

const normalizeArticle = (article: Article): Article => {
  const source =
    article.slug === caddoLakeCypressMorningArticle.slug
      ? caddoLakeCypressMorningArticle
      : article;

  return {
    ...source,
    readingMinutes: computedReadingMinutes(source),
  };
};

const articleRepository = {
  async list(query: Parameters<typeof fixturePlatform.articles.list>[0]) {
    const rows = await fixturePlatform.articles.list(query);
    return rows.map(normalizeArticle);
  },
  async getBySlug(
    scope: Parameters<typeof fixturePlatform.articles.getBySlug>[0],
    slug: Parameters<typeof fixturePlatform.articles.getBySlug>[1],
  ) {
    if (slug === caddoLakeCypressMorningArticle.slug && scope.brandId === "texasdefined") {
      return normalizeArticle(caddoLakeCypressMorningArticle);
    }

    const row = await fixturePlatform.articles.getBySlug(scope, slug);
    return row ? normalizeArticle(row) : null;
  },
};

export const platform: PlatformRepositories = {
  ...fixturePlatform,
  articles: articleRepository,
};

/** Brand scope used by every repository query in this app. */
export const CURRENT_BRAND_ID: BrandId = "texasdefined";

export const scope = { brandId: CURRENT_BRAND_ID } as const;

export type { PlatformRepositories };
