import type { BrandId } from "@/brand/types";

import { countySlugForLegacyArticle, isLegacyCountySeriesArticle } from "./county-series";
import { fixturePlatform } from "./fixtures/repositories";
import type { PlatformRepositories } from "./repositories";
import type { Article, ArticleBlock, SearchDocument } from "./types";

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
const RANDALL_COUNTY_ARTICLE_SLUG = "randall-county-canyon-palo-duro-texas";
const TOM_GREEN_COUNTY_ARTICLE_SLUG = "tom-green-county-san-angelo-concho-texas";
const WILDFLOWER_ARTICLE_SLUGS = new Set([
  "texas-wildflowers-guide",
  "texas-bluebonnet-guide",
  "texas-indian-paintbrush-guide",
  "texas-indian-blanket-guide",
  "texas-winecup-guide",
  "texas-prairie-verbena-guide",
  "texas-horsemint-guide",
  "texas-mexican-hat-guide",
  "texas-black-eyed-susan-guide",
  "texas-purple-coneflower-guide",
  "texas-goldenrod-guide",
  "texas-maximilian-sunflower-guide",
]);
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
  "texas-utility-costs-guide": [
    {
      href: "/texas-utility-cost-calculator",
      label: "Estimate your Texas utility budget",
      description: "Turn electricity, water, gas, internet and trash assumptions into a monthly and annual household estimate.",
    },
    {
      href: "/article/how-to-choose-electricity-plan-texas",
      label: "Compare Texas electricity plans",
      description: "Understand plan structure, usage assumptions and Electricity Facts Labels before estimating power costs.",
    },
    {
      href: "/texas-homeownership-cost-calculator",
      label: "See the full cost of homeownership",
      description: "Combine utilities with mortgage, taxes, insurance, maintenance and other recurring ownership costs.",
    },
  ],
  "texas-closing-costs-guide": [
    {
      href: "/texas-closing-cost-calculator",
      label: "Estimate Texas closing costs",
      description: "Model buyer and seller transaction costs, credits and cash-to-close assumptions.",
    },
    {
      href: "/texas-down-payment-calculator",
      label: "Plan the down payment and cash reserve",
      description: "Keep the down payment, expected closing costs and post-closing reserves in the same planning view.",
    },
    {
      href: "/texas-mortgage-calculator",
      label: "Estimate the monthly housing payment",
      description: "Continue from one-time transaction costs to the recurring mortgage, tax and insurance estimate.",
    },
  ],
  "texas-house-down-payment-guide": [
    {
      href: "/texas-down-payment-calculator",
      label: "Run a down-payment scenario",
      description: "Compare down payment, loan amount, closing costs and the cash reserve left after closing.",
    },
    {
      href: "/texas-closing-cost-calculator",
      label: "Estimate closing costs separately",
      description: "See why the down payment is not the same thing as the total cash needed at closing.",
    },
  ],
  "salary-needed-to-buy-a-house-in-texas": [
    {
      href: "/texas-home-affordability-calculator",
      label: "Estimate a Texas home-price range",
      description: "Use income, debts, down payment, taxes and insurance to test a household-specific affordability scenario.",
    },
    {
      href: "/texas-mortgage-calculator",
      label: "Turn a home price into a monthly payment",
      description: "Estimate principal, interest, property taxes and homeowners insurance together.",
    },
  ],
  "true-cost-of-owning-a-home-in-texas": [
    {
      href: "/texas-homeownership-cost-calculator",
      label: "Build the full ownership budget",
      description: "Combine mortgage, taxes, insurance, utilities, maintenance and other recurring home costs.",
    },
    {
      href: "/texas-utility-cost-calculator",
      label: "Estimate household utilities",
      description: "Break out electricity, water, gas, internet and trash before folding them into the ownership budget.",
    },
  ],
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
  "ector-county-odessa-oil-stonehenge-texas": [
    {
      href: "/article/randall-county-canyon-palo-duro-texas",
      label: "Head north to Randall County",
      description: "Explore Canyon, Palo Duro and the edge of the High Plains in the Texas Panhandle.",
    },
  ],
  "randall-county-canyon-palo-duro-texas": [
    {
      href: "/article/tom-green-county-san-angelo-concho-texas",
      label: "Continue south to Tom Green County",
      description: "Explore San Angelo, Fort Concho and the river country at the West Texas crossroads.",
    },
  ],
};

const wordsInBlock = (block: ArticleBlock) => {
  if (block.type === "shop" || block.type === "image") return 0;
  const text = block.type === "list" ? block.items.join(" ") : block.text;
  return text.trim().split(/\s+/).filter(Boolean).length;
};

const computedReadingMinutes = (article: Article) => {
  const wordCount = article.body.reduce((total, block) => total + wordsInBlock(block), 0);
  if (wordCount === 0) return Math.max(1, article.readingMinutes);
  return Math.max(1, Math.ceil(wordCount / 220));
};

const canonicalizeCountyHref = (href: string) => {
  const match = href.match(/^\/article\/([^?#/]+)([?#].*)?$/);
  if (!match) return href;
  const countySlug = countySlugForLegacyArticle(match[1]);
  return countySlug ? `/county/${countySlug}${match[2] ?? ""}` : href;
};

const canonicalizeInternalLinks = (links: NonNullable<Article["internalLinks"]>) =>
  links.map((link) => ({ ...link, href: canonicalizeCountyHref(link.href) }));

const normalizeArticle = (article: Article): Article => {
  const hero = article.slug === TEXAS_UNDERGROUND_SLUG
    ? TEXAS_UNDERGROUND_HERO
    : EDITORIAL_HERO_OVERRIDES[article.slug] ?? MOVING_ARTICLE_HEROES[article.slug] ?? article.hero;
  const existingInternalLinks = article.internalLinks ?? [];
  const additions = ARTICLE_INTERNAL_LINK_ADDITIONS[article.slug] ?? [];
  const internalLinks = canonicalizeInternalLinks([
    ...existingInternalLinks,
    ...additions.filter((addition) => !existingInternalLinks.some((link) => link.href === addition.href)),
  ]);

  return {
    ...article,
    hero,
    internalLinks,
    readingMinutes: computedReadingMinutes(article),
  };
};

const loadDirectTexasDefinedArticles = async () => {
  const [tomGreenModule, randallModule] = await Promise.all([
    import("./fixtures/tom-green-county-san-angelo-concho"),
    import("./fixtures/randall-county-canyon-palo-duro"),
  ]);
  return [tomGreenModule.tomGreenCountySanAngeloConchoArticle, randallModule.randallCountyCanyonPaloDuroArticle];
};

const loadWildflowerTexasDefinedArticles = async () => {
  const { texasWildflowerArticles } = await import("./fixtures/texas-wildflower-species");
  return texasWildflowerArticles;
};

const articleMatchesQuery = (article: Article, query: Parameters<typeof fixturePlatform.articles.list>[0]) =>
  !isLegacyCountySeriesArticle(article.slug) &&
  (!query.category || query.category === article.category) &&
  (!query.tag || article.tags.includes(query.tag)) &&
  (query.featured === undefined || Boolean(article.featured) === query.featured) &&
  query.excludeSlug !== article.slug;

const articleRepository = {
  async list(query: Parameters<typeof fixturePlatform.articles.list>[0]) {
    const rows = (await fixturePlatform.articles.list(query)).filter((article) => !isLegacyCountySeriesArticle(article.slug));
    if (query.brandId !== "texasdefined") return rows.map(normalizeArticle);

    const [directArticles, wildflowerArticles] = await Promise.all([
      loadDirectTexasDefinedArticles(),
      loadWildflowerTexasDefinedArticles(),
    ]);
    const eligibleDirect = directArticles.filter((article) => articleMatchesQuery(article, query) && !rows.some((row) => row.slug === article.slug));
    const occupiedSlugs = new Set([...rows, ...eligibleDirect].map((article) => article.slug));
    const eligibleWildflowers = wildflowerArticles.filter((article) => articleMatchesQuery(article, query) && !occupiedSlugs.has(article.slug));
    const merged = [...eligibleDirect, ...rows, ...eligibleWildflowers];
    const limited = query.limit ? merged.slice(0, query.limit) : merged;
    return limited.map(normalizeArticle);
  },
  async getBySlug(
    scope: Parameters<typeof fixturePlatform.articles.getBySlug>[0],
    slug: Parameters<typeof fixturePlatform.articles.getBySlug>[1],
  ) {
    if (scope.brandId === "texasdefined") {
      if (WILDFLOWER_ARTICLE_SLUGS.has(slug)) {
        const wildflowerArticles = await loadWildflowerTexasDefinedArticles();
        const wildflowerArticle = wildflowerArticles.find((article) => article.slug === slug);
        if (wildflowerArticle) return normalizeArticle(wildflowerArticle);
      }
      if (slug === "caddo-lake-cypress-morning") {
        const { caddoLakeCypressMorningArticle } = await import("./fixtures/caddo-lake-cypress-morning");
        return normalizeArticle(caddoLakeCypressMorningArticle);
      }
      if (slug === RANDALL_COUNTY_ARTICLE_SLUG) {
        const { randallCountyCanyonPaloDuroArticle } = await import("./fixtures/randall-county-canyon-palo-duro");
        return normalizeArticle(randallCountyCanyonPaloDuroArticle);
      }
      if (slug === TOM_GREEN_COUNTY_ARTICLE_SLUG) {
        const { tomGreenCountySanAngeloConchoArticle } = await import("./fixtures/tom-green-county-san-angelo-concho");
        return normalizeArticle(tomGreenCountySanAngeloConchoArticle);
      }
    }

    const resolvedSlug = ARTICLE_SLUG_ALIASES[slug] ?? slug;
    const row = await fixturePlatform.articles.getBySlug(scope, resolvedSlug);
    return row ? normalizeArticle(row) : null;
  },
};

const searchRepository = {
  async documents(searchScope: Parameters<typeof fixturePlatform.search.documents>[0]) {
    const documents = await fixturePlatform.search.documents(searchScope);
    const rewritten = documents.map((document): SearchDocument => {
      if (document.kind !== "article") return document;
      return { ...document, href: canonicalizeCountyHref(document.href) };
    });
    if (searchScope.brandId === "texasdefined") {
      const wildflowerArticles = await loadWildflowerTexasDefinedArticles();
      rewritten.push(...wildflowerArticles.map((article): SearchDocument => ({
        id: `article:${article.slug}`,
        brandId: "texasdefined",
        kind: "article",
        title: article.title,
        summary: article.dek,
        keywords: article.tags,
        href: `/article/${article.slug}`,
      })));
    }
    return [...new Map(rewritten.map((document) => [document.href, document])).values()];
  },
};

export const platform: PlatformRepositories = {
  ...fixturePlatform,
  articles: articleRepository,
  search: searchRepository,
};

/** Brand scope used by every repository query in this app. */
export const CURRENT_BRAND_ID: BrandId = "texasdefined";

export const scope = { brandId: CURRENT_BRAND_ID } as const;

export type { PlatformRepositories };
