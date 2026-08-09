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

const TEXAS_UNDERGROUND_SLUG = "texas-caverns-caves-first-timers-guide";
const TEXAS_UNDERGROUND_HERO = {
  src: "/images/explore/caverns/longhorn-cavern-state-park.jpg",
  alt: "Underground limestone formations inside Longhorn Cavern State Park in Texas",
  width: 1600,
  height: 1200,
  credit: "Billy Hathorn · CC BY 3.0 · Wikimedia Commons",
} as const;

const MOVING_ARTICLE_HEROES: Partial<Record<string, Article["hero"]>> = {
  "moving-to-austin-guide": {
    src: "/images/editorial/moving/austin.svg",
    alt: "Austin skyline across Lady Bird Lake at sunrise",
    width: 1600,
    height: 900,
  },
  "moving-to-san-antonio-guide": {
    src: "/images/editorial/moving/san-antonio.svg",
    alt: "San Antonio River Walk in warm evening light",
    width: 1600,
    height: 900,
  },
  "moving-to-dallas-fort-worth-guide": {
    src: "/images/editorial/moving/dallas-fort-worth.svg",
    alt: "Dallas skyline with Reunion Tower at sunset",
    width: 1600,
    height: 900,
  },
  "moving-to-houston-address-checklist": {
    src: "/images/editorial/moving/houston.svg",
    alt: "Houston skyline beyond a green bayou and freeway",
    width: 1600,
    height: 900,
  },
  "moving-to-texas-what-nobody-tells-you": {
    src: "/images/editorial/moving/moving-to-texas.svg",
    alt: "Moving truck on a Texas road approaching a new home at sunset",
    width: 1600,
    height: 900,
  },
};

const EDITORIAL_HERO_OVERRIDES: Partial<Record<string, Article["hero"]>> = {
  "presidio-county-marfa-borderlands-texas": {
    src: "/images/explore/historic-sites/fort-leaton-state-historic-site.jpg",
    alt: "Fort Leaton State Historic Site in Presidio County near the Rio Grande borderlands",
    width: 1600,
    height: 1067,
  },
  "jeff-davis-county-fort-davis-mountains-texas": {
    src: "/images/explore/historic-sites/fort-davis-national-historic-site.jpg",
    alt: "Fort Davis National Historic Site beneath the Davis Mountains in Jeff Davis County",
    width: 1600,
    height: 1067,
  },
  "culberson-county-van-horn-guadalupe-mountains-texas": {
    src: "/images/explore/national-parks/guadalupe-mountains-national-park.jpg",
    alt: "Guadalupe Mountains National Park in Culberson County, home of Guadalupe Peak",
    width: 1600,
    height: 1067,
  },
  "muds-pids-hoas-special-districts-texas": {
    src: "https://images.unsplash.com/photo-1671410304582-1c2fb1390fbf?auto=format&fit=crop&w=1600&h=900&q=82",
    alt: "Aerial view of a Houston-area suburban neighborhood with homes, streets and shared infrastructure",
    width: 1600,
    height: 900,
    credit: "Jose Losada · Unsplash",
  },
  "prepare-texas-house-freeze": {
    src: "https://images.unsplash.com/photo-1767623876527-16d31a21c329?auto=format&fit=crop&w=1600&h=900&q=82",
    alt: "A snow-covered home and yard during freezing winter weather",
    width: 1600,
    height: 900,
    credit: "Kyan Tijhuis · Unsplash",
  },
};

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

  const hero = source.slug === TEXAS_UNDERGROUND_SLUG
    ? TEXAS_UNDERGROUND_HERO
    : EDITORIAL_HERO_OVERRIDES[source.slug] ?? MOVING_ARTICLE_HEROES[source.slug] ?? source.hero;

  return {
    ...source,
    hero,
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
