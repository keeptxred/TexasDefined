import type { Article, ImageRef } from "../types";

const hero = (src: string, alt: string, width: number, height: number, credit: string): ImageRef => ({ src, alt, width, height, credit });

const heroes = {
  bolivar: hero(
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port_Bolivar_TX_-_Point_Bolivar_Lighthouse.jpg?width=1600",
    "Point Bolivar Lighthouse on the Bolivar Peninsula at the entrance to Galveston Bay",
    2502,
    1888,
    "Patrick Feller · CC BY 2.0 · Wikimedia Commons",
  ),
  lydiaAnn: hero(
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lydia_Ann_Lighthouse_near_Port_Aransas.jpg?width=1600",
    "Lydia Ann Lighthouse near Port Aransas with its brick tower and keeper's dwelling",
    829,
    648,
    "Jon Lebkowsky · CC BY-SA 2.0 · Wikimedia Commons",
  ),
  matagorda: hero(
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Matagorda_Island_Light_%28Calhoun_County%2C_Texas%29.jpg?width=1600",
    "Matagorda Island Lighthouse, the tapered cast-iron tower in Calhoun County",
    2244,
    2692,
    "U.S. Coast Guard · Public domain · Wikimedia Commons",
  ),
  halfmoon: hero(
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/HALFMOON_REEF_LIGHTHOUSE.jpg?width=1600",
    "Halfmoon Reef Lighthouse preserved in Port Lavaca, Texas",
    5500,
    4423,
    "Charles Henry · CC BY 2.0 · Wikimedia Commons",
  ),
  sabine: hero(
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sabine_Pass_Lighthouse_01.jpg?width=1600",
    "Sabine Pass Lighthouse on the Louisiana side of the Texas-Louisiana border waterway",
    723,
    499,
    "Jessica Kemm / National Park Service · Public domain · Wikimedia Commons",
  ),
};

type LighthouseStub = Omit<Article, "brandId" | "body" | "category" | "region" | "authorId" | "publishedAt" | "tags" | "relatedCollections" | "relatedDestinations">;
const stub = (record: LighthouseStub): Article => ({
  brandId: "texasdefined",
  body: [],
  category: "texas-history",
  region: "gulf-coast",
  authorId: "a-hollis",
  publishedAt: "2026-08-20",
  tags: [],
  relatedCollections: [],
  relatedDestinations: [],
  ...record,
});

export const lighthouseDeepDiveStubs: Article[] = [
  stub({ id: "lh-1", slug: "point-bolivar-lighthouse-history", title: "Point Bolivar Lighthouse: The Black Tower at Galveston Bay", dek: "The black cast-iron tower guarding Galveston Bay's Bolivar side.", readingMinutes: 8, hero: heroes.bolivar }),
  stub({ id: "lh-2", slug: "lydia-ann-lighthouse-port-aransas", title: "Lydia Ann Lighthouse: The Light Across From Port Aransas", dek: "The historic Aransas Pass light across from Port Aransas.", readingMinutes: 9, hero: heroes.lydiaAnn }),
  stub({ id: "lh-3", slug: "matagorda-island-lighthouse-history", title: "Matagorda Island Lighthouse: The Black Tower Beyond Port O'Connor", dek: "The Civil War-era lighthouse preserved on wild Matagorda Island.", readingMinutes: 10, hero: heroes.matagorda }),
  stub({ id: "lh-4", slug: "halfmoon-reef-lighthouse-port-lavaca", title: "Halfmoon Reef Lighthouse: The Texas Light That Came Ashore", dek: "The Matagorda Bay lighthouse that found a new home in Port Lavaca.", readingMinutes: 8, hero: heroes.halfmoon }),
  stub({ id: "lh-5", slug: "sabine-pass-lighthouse-texas-border", title: "Sabine Pass Lighthouse and the Eastern Edge of the Texas Coast", dek: "The border lighthouse tied to Texas' eastern Gulf gateway.", readingMinutes: 8, hero: heroes.sabine }),
];

const slugs = new Set(lighthouseDeepDiveStubs.map((article) => article.slug));

export async function loadLighthouseDeepDiveArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !slugs.has(slug)) return null;
  const [{ lighthouseDeepDiveArticles }, { lighthouseDeepDiveExpansionBySlug }] = await Promise.all([
    import("./lighthouse-deep-dive-articles"),
    import("./lighthouse-deep-dive-expansions"),
  ]);
  const article = lighthouseDeepDiveArticles.find((candidate) => candidate.slug === slug);
  if (!article) return null;
  const articleStub = lighthouseDeepDiveStubs.find((candidate) => candidate.slug === slug);
  const expansion = lighthouseDeepDiveExpansionBySlug[slug] ?? [];
  const expandedArticle: Article = {
    ...article,
    body: [...article.body, ...expansion],
  };
  return articleStub ? { ...expandedArticle, hero: articleStub.hero } : expandedArticle;
}
