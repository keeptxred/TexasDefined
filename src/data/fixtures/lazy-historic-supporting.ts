import type { Article } from "../types";

const texasCattleRanchingHistoryGuideStub: Article = {
  id: "evergreen-texas-cattle-ranching-history-guide",
  brandId: "texasdefined",
  slug: "texas-cattle-ranching-history-guide",
  title: "Texas Cattle History: Longhorns, Cattle Trails and Goodnight Ranch",
  dek: "Connect the Official State Longhorn Herd, Fort Griffin and Goodnight Ranch to the cattle drives, ranch businesses, trail towns and conservation stories that turned cattle into one of Texas' defining symbols.",
  category: "texas-history",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Charles_Goodnight_Ranch_House.jpg?width=1600",
    alt: "Charles and Mary Ann Goodnight Ranch House in Armstrong County, Texas",
    width: 1600,
    height: 1200,
    credit: "Pi3.124 · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-19",
  readingMinutes: 14,
  tags: ["texas cattle history", "texas longhorns", "cattle trails", "goodnight ranch", "fort griffin", "charles goodnight", "texas ranching"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/state-historic-sites/official-state-texas-longhorn-herd/state-texas-longhorn-herd-history",
  body: [],
  relatedCollections: [],
  relatedDestinations: ["official-texas-longhorn-herd", "fort-griffin", "goodnight-ranch"],
};

const texasHistoricTravelTransportationGuideStub: Article = {
  id: "evergreen-texas-historic-travel-transportation-guide",
  brandId: "texasdefined",
  slug: "texas-historic-travel-transportation-guide",
  title: "How Texans Traveled Before Highways: Stagecoach Inns, Wagon Roads and Harvey Houses",
  dek: "Use Fanthorp Inn, Landmark Inn and the Slaton Harvey House to follow Texas travel from stage roads and wagon freight to the railroad networks that transformed distance, lodging and food on the road.",
  category: "texas-history",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/LandmarkInn_%281_of_1%29.jpg?width=1600",
    alt: "Landmark Inn in Castroville, Texas",
    width: 1600,
    height: 1031,
    credit: "Renelibrary · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-19",
  readingMinutes: 13,
  tags: ["texas transportation history", "stagecoach texas", "fanthorp inn", "landmark inn", "slaton harvey house", "texas railroads", "historic inns"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/state-historic-sites/fanthorp-inn/fanthorp-inn-history",
  body: [],
  relatedCollections: [],
  relatedDestinations: ["fanthorp-inn", "landmark-inn", "slaton-harvey-house", "fort-lancaster"],
};

export const historicSupportingStubs: Article[] = [
  texasCattleRanchingHistoryGuideStub,
  texasHistoricTravelTransportationGuideStub,
];

export async function loadHistoricSupportingArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined") return null;
  if (slug === texasCattleRanchingHistoryGuideStub.slug) return import("./texas-cattle-ranching-history-guide").then((module) => module.texasCattleRanchingHistoryGuideArticle);
  if (slug === texasHistoricTravelTransportationGuideStub.slug) return import("./texas-historic-travel-transportation-guide").then((module) => module.texasHistoricTravelTransportationGuideArticle);
  return null;
}
