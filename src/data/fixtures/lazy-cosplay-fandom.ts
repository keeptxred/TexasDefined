import bigBend from "@/assets/big-bend.jpg";
import type { Article, ImageRef } from "../types";

const remoteImage = (src: string, alt: string, width: number, height: number, credit: string): ImageRef => ({ src, alt, width, height, credit });
const localImage = (src: string, alt: string): ImageRef => ({ src, alt, width: 1600, height: 1067 });
const stub = (record: Omit<Article, "brandId" | "authorId" | "readingMinutes" | "body" | "relatedCollections" | "relatedDestinations">): Article => ({
  brandId: "texasdefined",
  authorId: "a-hollis",
  readingMinutes: 7,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
  ...record,
});

export const cosplayFandomArticleStubs: Article[] = [
  stub({
    id: "cosplay-fandom-texas-cosplay-guide",
    slug: "texas-cosplay-guide",
    title: "Texas Cosplay Guide: Conventions, Costumes, Props & Travel",
    dek: "Plan cosplay across Texas conventions with event-specific rule checks, costume logistics, photography etiquette, travel strategy and practical heat considerations.",
    category: "events",
    region: "prairies-lakes",
    hero: remoteImage("https://commons.wikimedia.org/wiki/Special:Redirect/file/People%20in%20Halloween%20Costumes.jpg", "Costumed attendees at the Oak Lawn Halloween Block Party in Dallas, Texas", 3789, 3031, "Matthew T Rader · CC BY-SA 4.0 · Wikimedia Commons"),
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-24",
    tags: ["texas cosplay", "cosplay conventions", "comic conventions texas", "anime conventions texas", "costume planning"],
    sourceName: "FAN EXPO Dallas policies",
    sourceUrl: "https://fanexpohq.com/fanexpodallas/policies/",
  }),
  stub({
    id: "cosplay-fandom-packing",
    slug: "what-to-pack-for-a-texas-convention",
    title: "What to Pack for a Texas Convention",
    dek: "A practical Texas convention packing list for badges, power, water, costume repairs, makeup, props, bags, parking, hotels and changing weather.",
    category: "events",
    region: "prairies-lakes",
    hero: remoteImage("https://commons.wikimedia.org/wiki/Special:Redirect/file/KayBaileyHutchisonConventionCenter.jpg", "Kay Bailey Hutchison Convention Center in downtown Dallas", 4928, 3264, "Raysonho · CC0 1.0 · Wikimedia Commons"),
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-24",
    tags: ["convention packing list", "texas conventions", "cosplay packing", "fan expo dallas", "comicpalooza"],
    sourceName: "FAN EXPO Dallas first-time guide",
    sourceUrl: "https://fanexpohq.com/fanexpodallas/first-time-guide/",
  }),
  stub({
    id: "cosplay-fandom-heat",
    slug: "cosplay-in-texas-heat",
    title: "Cosplay in Texas Heat: A Practical Convention Guide",
    dek: "Plan heavy costumes, wigs, masks, makeup, outdoor queues and travel around Texas heat without treating costume comfort as an afterthought.",
    category: "events",
    region: "big-bend",
    hero: localImage(bigBend, "Bright desert light over the Chisos Mountains in Big Bend, illustrating Texas heat exposure rather than a convention scene"),
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-24",
    tags: ["cosplay texas heat", "cosplay safety", "texas heat", "convention costumes", "hydration"],
    sourceName: "CDC Heat Health",
    sourceUrl: "https://www.cdc.gov/heat-health/about/index.html",
  }),
  stub({
    id: "cosplay-fandom-props",
    slug: "texas-cosplay-prop-guide",
    title: "Texas Cosplay Prop Guide: Convention Rules, Checks & Transport",
    dek: "Understand the difference between event prop policies and Texas law, then plan inspections, transport, storage and realistic-looking props convention by convention.",
    category: "events",
    region: "prairies-lakes",
    hero: remoteImage("https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort%20Worth%20Convention%20Center%20%2824823160844%29.jpg", "Fort Worth Convention Center in downtown Fort Worth", 5184, 3456, "Nicolas Henderson · CC BY 2.0 · Wikimedia Commons"),
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-24",
    tags: ["texas cosplay props", "convention prop policy", "cosplay weapons", "anime frontier", "fan expo dallas"],
    sourceName: "FAN EXPO Dallas props policy",
    sourceUrl: "https://fanexpohq.com/fanexpodallas/props-policy/",
  }),
  stub({
    id: "cosplay-fandom-halloween",
    slug: "halloween-in-texas",
    title: "Halloween in Texas: Events, Haunted Attractions & Trip Planning",
    dek: "Plan Halloween in Texas with recurring haunted attractions, family events, costumes, weather, travel and city-by-city seasonal planning without unsourced rankings.",
    category: "events",
    region: "prairies-lakes",
    hero: remoteImage("https://commons.wikimedia.org/wiki/Special:Redirect/file/Halloween%20pumpkins.jpg", "Carved Halloween pumpkins lit after dark", 4032, 3024, "Jiayu Zuo · CC BY-SA 4.0 · Wikimedia Commons"),
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-24",
    tags: ["halloween texas", "texas haunted attractions", "halloween events texas", "family halloween", "texas fall events"],
    sourceName: "Dark Hour Haunted House",
    sourceUrl: "https://darkhourhauntedhouse.com/",
  }),
  stub({
    id: "cosplay-fandom-halloween-costume",
    slug: "texas-halloween-costume-guide",
    title: "Texas Halloween Costume Guide: Heat, Rain, Parties & Events",
    dek: "Choose a Halloween costume for Texas conditions, from warm outdoor nights and rain to haunted attractions, family events, parties and convention-style rules.",
    category: "events",
    region: "prairies-lakes",
    hero: remoteImage("https://commons.wikimedia.org/wiki/Special:Redirect/file/An%20African%20American%20Man%20at%20the%20Oaklawn%20Halloween%20Block%20Party.jpg", "Halloween costume at the Oak Lawn Halloween Block Party in Dallas, Texas", 2394, 2992, "Matthew T Rader · CC BY-SA 4.0 · Wikimedia Commons"),
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-24",
    tags: ["texas halloween costumes", "halloween costume guide", "costume weather", "texas halloween", "costume planning"],
    sourceName: "CDC Heat Health",
    sourceUrl: "https://www.cdc.gov/heat-health/about/index.html",
  }),
];

const cosplayFandomSlugs = new Set(cosplayFandomArticleStubs.map((article) => article.slug));

function estimateReadingMinutes(article: Article): number {
  const text = article.body.map((block) => "text" in block ? block.text : "items" in block ? block.items.join(" ") : "").join(" ");
  const words = text.match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g)?.length ?? 0;
  return Math.max(4, Math.ceil(words / 200));
}

export async function loadCosplayFandomArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !cosplayFandomSlugs.has(slug)) return null;
  const { cosplayFandomArticles } = await import("./cosplay-fandom-articles");
  const article = cosplayFandomArticles.find((candidate) => candidate.slug === slug);
  return article ? { ...article, readingMinutes: estimateReadingMinutes(article) } : null;
}
