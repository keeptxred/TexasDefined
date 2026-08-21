import roadTrip from "@/assets/road-trip.jpg";

import type { Article, ImageRef } from "../types";

const coastHero: ImageRef = { src: roadTrip, alt: "A Texas Gulf Coast road leading toward open coastal country", width: 1600, height: 1067 };
const stub = (record: Omit<Article, "brandId" | "body">): Article => ({ brandId: "texasdefined", body: [], ...record });

export const lighthouseDeepDiveStubs: Article[] = [
  stub({ id: "lh-1", slug: "point-bolivar-lighthouse-history", title: "Point Bolivar Lighthouse: The Black Tower at Galveston Bay", dek: "The history of the cast-iron lighthouse that guarded the Bolivar side of Galveston Bay, survived catastrophic hurricanes and still stands beside one of Texas' busiest ferry approaches.", category: "texas-history", region: "gulf-coast", hero: coastHero, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 8, tags: [], relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "lh-2", slug: "lydia-ann-lighthouse-port-aransas", title: "Lydia Ann Lighthouse: The Light Across From Port Aransas", dek: "Why the 1857 Aransas Pass light survived Civil War demolition attempts, returned to service and still marks the maritime landscape behind Port Aransas as a private aid to navigation.", category: "texas-history", region: "gulf-coast", hero: coastHero, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 9, tags: [], relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "lh-3", slug: "matagorda-island-lighthouse-history", title: "Matagorda Island Lighthouse: The Black Tower Beyond Port O'Connor", dek: "A cast-iron lighthouse rebuilt after the Civil War, moved inland from an eroding shoreline and preserved on one of the wildest barrier islands of the middle Texas coast.", category: "texas-history", region: "gulf-coast", hero: coastHero, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 10, tags: [], relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "lh-4", slug: "halfmoon-reef-lighthouse-port-lavaca", title: "Halfmoon Reef Lighthouse: The Texas Light That Came Ashore", dek: "How an 1858 screw-pile lighthouse survived Civil War darkness and hurricane damage, then moved from Matagorda Bay to a permanent home beside Port Lavaca.", category: "texas-history", region: "gulf-coast", hero: coastHero, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 8, tags: [], relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "lh-5", slug: "sabine-pass-lighthouse-texas-border", title: "Sabine Pass Lighthouse and the Eastern Edge of the Texas Coast", dek: "The unusual border lighthouse story at Sabine Pass, where a tower on the Louisiana side still belongs to the navigation, war and port history of Texas' eastern Gulf gateway.", category: "texas-history", region: "gulf-coast", hero: coastHero, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 8, tags: [], relatedCollections: [], relatedDestinations: [] }),
];

const slugs = new Set(lighthouseDeepDiveStubs.map((article) => article.slug));

export async function loadLighthouseDeepDiveArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !slugs.has(slug)) return null;
  const { lighthouseDeepDiveArticles } = await import("./lighthouse-deep-dive-articles");
  const article = lighthouseDeepDiveArticles.find((candidate) => candidate.slug === slug);
  const articleStub = lighthouseDeepDiveStubs.find((candidate) => candidate.slug === slug);
  return article && articleStub ? { ...article, hero: articleStub.hero } : article ?? null;
}
