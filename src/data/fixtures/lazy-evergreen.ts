import hillCountryHero from "@/assets/generated/hill-country-identity.jpg";

import type { Article } from "../types";

const texasRiversExplainedStub: Article = {
  id: "evergreen-texas-rivers-explained",
  brandId: "texasdefined",
  slug: "texas-rivers-explained",
  title: "The Rivers That Built Texas",
  dek: "From the Rio Grande and Brazos to the spring-fed Guadalupe and the slow, forested rivers of East Texas, the state's waterways explain where Texans settled, how cities grew and why one part of Texas can feel so different from another.",
  category: "lakes-rivers",
  hero: {
    src: "/images/explore/lakes-rivers/guadalupe-river-state-park.jpg",
    alt: "The Guadalupe River flowing beneath bald cypress trees in the Texas Hill Country",
    width: 1600,
    height: 1115,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-13",
  readingMinutes: 12,
  tags: [
    "texas rivers",
    "river basins",
    "brazos river",
    "colorado river",
    "guadalupe river",
    "rio grande",
    "texas geography",
    "texas water",
  ],
  featured: true,
  sourceName: "Texas Water Development Board",
  sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/index.asp",
  body: [],
  relatedCollections: [],
  relatedDestinations: ["guadalupe-river-state-park", "devils-river-state-natural-area", "south-llano-river-state-park"],
};

const texasHillCountryStub: Article = {
  id: "evergreen-texas-hill-country-what-makes-it",
  brandId: "texasdefined",
  slug: "texas-hill-country-what-makes-it",
  title: "What Makes the Texas Hill Country the Hill Country?",
  dek: "It is more than rolling scenery. Limestone, spring-fed rivers, live oaks, ranch roads, small towns and a distinctive mix of cultures all help define the part of Texas people simply call the Hill Country.",
  category: "guides",
  region: "hill-country",
  hero: {
    src: hillCountryHero,
    alt: "Texas Hill Country limestone hills, river, live oaks and wildflowers at sunset",
    width: 1600,
    height: 900,
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-07",
  readingMinutes: 10,
  tags: ["texas hill country", "hill country", "central texas", "texas geography", "fredericksburg", "texas travel"],
  featured: true,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

export const lazyEvergreenArticleStubs: Article[] = [
  texasRiversExplainedStub,
  texasHillCountryStub,
];

const texasRiversSourceLinks: NonNullable<Article["internalLinks"]> = [
  {
    href: "https://www.twdb.texas.gov/surfacewater/rivers/",
    label: "Texas Water Development Board river basins",
    description: "Official Texas river-basin and reservoir reference information.",
  },
  {
    href: "https://www.twdb.texas.gov/surfacewater/conditions/index.asp",
    label: "Texas water conditions and data",
    description: "Current and historical surface-water data from the Texas Water Development Board.",
  },
];

export async function loadLazyEvergreenArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined") return null;

  if (slug === texasRiversExplainedStub.slug) {
    const { texasRiversExplainedArticle } = await import("./texas-rivers-explained");
    const existingLinks = texasRiversExplainedArticle.internalLinks ?? [];

    return {
      ...texasRiversExplainedArticle,
      internalLinks: [
        ...existingLinks,
        ...texasRiversSourceLinks.filter(
          (link) => !existingLinks.some((existing) => existing.href === link.href),
        ),
      ],
    };
  }

  if (slug === texasHillCountryStub.slug) {
    const { texasHillCountryWhatMakesItArticle } = await import("./texas-hill-country-what-makes-it");
    return texasHillCountryWhatMakesItArticle;
  }

  return null;
}
