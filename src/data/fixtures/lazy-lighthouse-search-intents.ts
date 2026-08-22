import type { Article, ImageRef } from "../types";

const hero: ImageRef = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port_Isabel_Texas_Lighthouse.jpg?width=1600",
  alt: "Historic Port Isabel Lighthouse in Cameron County, Texas",
  width: 1188,
  height: 1528,
  credit: "lfwlfw / Bevo · CC BY 2.0 · Wikimedia Commons",
};

export const lighthouseSearchIntentStubs: Article[] = [
  {
    id: "lighthouse-intent-1",
    brandId: "texasdefined",
    slug: "best-lighthouses-to-visit-in-texas",
    title: "Best Lighthouses to Visit in Texas: What You Can Actually See and Climb",
    dek: "The best Texas lighthouse experiences ranked by public access, history and trip style.",
    category: "historic-sites",
    region: "gulf-coast",
    hero,
    authorId: "a-hollis",
    publishedAt: "2026-08-21",
    readingMinutes: 12,
    tags: [],
    featured: true,
    relatedCollections: [],
    relatedDestinations: ["port-isabel-lighthouse-state-park"],
    body: [],
  },
];

const slugs = new Set(lighthouseSearchIntentStubs.map((article) => article.slug));

export async function loadLighthouseSearchIntentArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !slugs.has(slug)) return null;
  const { lighthouseSearchIntentArticles } = await import("./lighthouse-search-intent-articles");
  return lighthouseSearchIntentArticles.find((article) => article.slug === slug) ?? null;
}
