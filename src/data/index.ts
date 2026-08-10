import type { BrandId } from "@/brand/types";

import { caddoLakeCypressMorningArticle } from "./fixtures/caddo-lake-cypress-morning";
import { ectorCountyOdessaOilStonehengeArticle } from "./fixtures/ector-county-odessa-oil-stonehenge";
import { fixturePlatform } from "./fixtures/repositories";
import { wardCountyMonahansSandhillsArticle } from "./fixtures/ward-county-monahans-sandhills";
import { winklerCountyKermitWinkOilArticle } from "./fixtures/winkler-county-kermit-wink-oil";
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
const ARTICLE_SLUG_ALIASES: Partial<Record<string, string>> = {
  "el-paso-county-pass-missions-borderlands-texas": "el-paso-county-missions-rio-grande-texas",
};
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
  "brewster-county-big-bend-texas": {
    src: "https://images.unsplash.com/photo-1701989664249-00bfd734f083?auto=format&fit=crop&w=1600&h=900&q=82",
    alt: "Big Bend National Park mountain landscape in Brewster County, Texas",
    width: 1600,
    height: 900,
    credit: "Sara Cottle · Unsplash",
  },
  "presidio-county-marfa-borderlands-texas": {
    src: "/images/explore/historic-sites/fort-leaton-state-historic-site.jpg",
    alt: "Fort Leaton State Historic Site in Presidio County near the Rio Grande borderlands",
    width: 1600,
    height: 1068,
    credit: "Carol M. Highsmith · Public domain · Wikimedia Commons",
  },
  "jeff-davis-county-fort-davis-mountains-texas": {
    src: "/images/explore/historic-sites/fort-davis-national-historic-site.jpg",
    alt: "Fort Davis National Historic Site beneath the Davis Mountains in Jeff Davis County",
    width: 1600,
    height: 1067,
    credit: "National Park Service Digital Image Archives · Public domain · Wikimedia Commons",
  },
  "culberson-county-van-horn-guadalupe-mountains-texas": {
    src: "https://images.unsplash.com/photo-1775940488701-70b93dd22023?auto=format&fit=crop&w=1600&h=900&q=82",
    alt: "Road through the Chihuahuan Desert toward the Guadalupe Mountains in Culberson County, Texas",
    width: 1600,
    height: 900,
    credit: "Jake Kling · Unsplash",
  },
  "hudspeth-county-sierra-blanca-salt-flats-texas": {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Hudspeth_county_courthouse_2009.jpg",
    alt: "Hudspeth County Courthouse in Sierra Blanca, Texas",
    width: 2284,
    height: 1295,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  },
  "el-paso-county-missions-rio-grande-texas": {
    src: "/images/explore/historic-sites/chamizal-national-memorial.jpg",
    alt: "Chamizal National Memorial in El Paso County, Texas",
    width: 1600,
    height: 2134,
    credit: "GoneBefore · CC BY-SA 4.0 · Wikimedia Commons",
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

const ARTICLE_INTERNAL_LINK_ADDITIONS: Partial<Record<string, NonNullable<Article["internalLinks"]>>> = {
  "ward-county-monahans-sandhills-texas": [
    {
      href: "/article/winkler-county-kermit-wink-oil-texas",
      label: "Explore neighboring Winkler County",
      description: "Continue north into Kermit, Wink and the Hendrick Field oil-boom story.",
    },
    {
      href: "/article/ector-county-odessa-oil-stonehenge-texas",
      label: "Continue into Ector County",
      description: "Explore Odessa, the Permian Basin, Stonehenge and the meteor-crater landscape.",
    },
  ],
  "winkler-county-kermit-wink-oil-texas": [
    {
      href: "/article/ector-county-odessa-oil-stonehenge-texas",
      label: "Continue east into Ector County",
      description: "Follow the Permian Basin into Odessa, Stonehenge and the meteor-crater story.",
    },
  ],
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
  const existingInternalLinks = source.internalLinks ?? [];
  const additions = ARTICLE_INTERNAL_LINK_ADDITIONS[source.slug] ?? [];
  const internalLinks = [
    ...existingInternalLinks,
    ...additions.filter((addition) => !existingInternalLinks.some((link) => link.href === addition.href)),
  ];

  return {
    ...source,
    hero,
    internalLinks,
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
    if (scope.brandId === "texasdefined") {
      if (slug === caddoLakeCypressMorningArticle.slug) {
        return normalizeArticle(caddoLakeCypressMorningArticle);
      }
      if (slug === ectorCountyOdessaOilStonehengeArticle.slug) {
        return normalizeArticle(ectorCountyOdessaOilStonehengeArticle);
      }
      if (slug === wardCountyMonahansSandhillsArticle.slug) {
        return normalizeArticle(wardCountyMonahansSandhillsArticle);
      }
      if (slug === winklerCountyKermitWinkOilArticle.slug) {
        return normalizeArticle(winklerCountyKermitWinkOilArticle);
      }
    }

    const resolvedSlug = ARTICLE_SLUG_ALIASES[slug] ?? slug;
    const row = await fixturePlatform.articles.getBySlug(scope, resolvedSlug);
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
