import roadTrip from "@/assets/road-trip.jpg";

import type { Article, ImageRef } from "../types";

const coastHero: ImageRef = { src: roadTrip, alt: "A Texas Gulf Coast road leading toward open coastal country", width: 1600, height: 1067 };
const stub = (record: Omit<Article, "brandId" | "body">): Article => ({ brandId: "texasdefined", body: [], ...record });

export const lighthouseDeepDiveStubs: Article[] = [
  stub({ id: "lh-1", slug: "point-bolivar-lighthouse-history", title: "Point Bolivar Lighthouse: The Black Tower at Galveston Bay", dek: "The black cast-iron tower guarding Galveston Bay's Bolivar side.", category: "texas-history", region: "gulf-coast", hero: coastHero, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 8, tags: [], relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "lh-2", slug: "lydia-ann-lighthouse-port-aransas", title: "Lydia Ann Lighthouse: The Light Across From Port Aransas", dek: "The historic Aransas Pass light across from Port Aransas.", category: "texas-history", region: "gulf-coast", hero: coastHero, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 9, tags: [], relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "lh-3", slug: "matagorda-island-lighthouse-history", title: "Matagorda Island Lighthouse: The Black Tower Beyond Port O'Connor", dek: "The Civil War-era lighthouse preserved on wild Matagorda Island.", category: "texas-history", region: "gulf-coast", hero: coastHero, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 10, tags: [], relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "lh-4", slug: "halfmoon-reef-lighthouse-port-lavaca", title: "Halfmoon Reef Lighthouse: The Texas Light That Came Ashore", dek: "The Matagorda Bay lighthouse that found a new home in Port Lavaca.", category: "texas-history", region: "gulf-coast", hero: coastHero, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 8, tags: [], relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "lh-5", slug: "sabine-pass-lighthouse-texas-border", title: "Sabine Pass Lighthouse and the Eastern Edge of the Texas Coast", dek: "The border lighthouse tied to Texas' eastern Gulf gateway.", category: "texas-history", region: "gulf-coast", hero: coastHero, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 8, tags: [], relatedCollections: [], relatedDestinations: [] }),
];

const slugs = new Set(lighthouseDeepDiveStubs.map((article) => article.slug));

export async function loadLighthouseDeepDiveArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !slugs.has(slug)) return null;
  const { lighthouseDeepDiveArticles } = await import("./lighthouse-deep-dive-articles");
  const article = lighthouseDeepDiveArticles.find((candidate) => candidate.slug === slug);
  const articleStub = lighthouseDeepDiveStubs.find((candidate) => candidate.slug === slug);
  return article && articleStub ? { ...article, hero: articleStub.hero } : article ?? null;
}
