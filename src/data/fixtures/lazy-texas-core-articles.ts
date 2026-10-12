import bbqBrisket from "@/assets/bbq-brisket.jpg";
import bigBend from "@/assets/big-bend.jpg";
import bluebonnets from "@/assets/bluebonnets.jpg";
import caddoLake from "@/assets/caddo-lake.jpg";
import paloDuro from "@/assets/palo-duro.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";

import type { Article, ImageRef } from "../types";
import { texasGatewayIndexReadyStubs } from "./texas-gateway-index-ready-stubs";

const image = (src: string, alt: string): ImageRef => ({ src, alt, width: 1600, height: 1067 });
const images = {
  bbqBrisket: image(bbqBrisket, "Sliced smoked brisket with a dark peppery bark on butcher paper"),
  bluebonnets: image(bluebonnets, "A field of bluebonnets running to a fence line in spring"),
  roadTrip: image(roadTrip, "A two-lane Texas farm road running straight to the horizon"),
  caddoLake: image(caddoLake, "Bald cypress trees draped in Spanish moss on Caddo Lake at dawn"),
  smallTown: image(smallTown, "A historic Texas courthouse square in a small town at golden hour"),
  paloDuro: image(paloDuro, "Layered red rock walls of Palo Duro Canyon in late afternoon light"),
  bigBend: image(bigBend, "The Chisos Mountains rising over the Chihuahuan Desert in Big Bend"),
};

const stub = (record: Omit<Article, "brandId" | "body">): Article => ({ brandId: "texasdefined", body: [], ...record });

export const texasCoreArticleStubs: Article[] = [
  stub({ id: "ar-1", slug: "what-defines-texas-barbecue", title: "The Line Is the Point", dek: "Why Texans will stand three hours in July for a plate of meat and butcher paper — and what the wait is actually for.", category: "food-bbq", region: "hill-country", hero: images.bbqBrisket, authorId: "a-marisol", publishedAt: "2026-06-18", readingMinutes: 8, tags: ["barbecue", "lockhart", "brisket", "central texas"], featured: true, relatedCollections: ["smoke-and-salt"], relatedDestinations: ["gruene-historic-district"] }),
  stub({ id: "ar-2", slug: "bluebonnet-season-field-guide", title: "Chasing Bluebonnet Season", dek: "A practical Texas bluebonnet field guide: when blooms move across the state, where to look, how to photograph them safely, and how to plant your own.", category: "outdoors", region: "hill-country", hero: images.bluebonnets, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 13, tags: ["wildflowers", "bluebonnets", "spring", "hill country", "road trips", "native plants"], featured: true, relatedCollections: ["wildflower-house"], relatedDestinations: ["enchanted-rock-state-natural-area", "lady-bird-johnson-wildflower-center"] }),
  stub({ id: "ar-3", slug: "hill-country-two-lane-loop", title: "The Two-Lane Loop", dek: "A flexible Hill Country back-road loop through granite country, ranch roads, river towns and courthouse squares — with enough structure to plan a day and enough room to change course.", category: "road-trips", region: "hill-country", hero: images.roadTrip, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 14, tags: ["road trip", "hill country", "weekend", "driving", "small towns"], featured: true, relatedCollections: ["campfire-kitchen"], relatedDestinations: ["enchanted-rock-state-natural-area", "lady-bird-johnson-wildflower-center"] }),
  stub({ id: "ar-4", slug: "caddo-lake-cypress-morning", title: "Morning on Caddo", dek: "Paddling the boat roads of the only large natural lake in Texas, where the map is a maze and the fog does not lift on schedule.", category: "lakes-rivers", region: "piney-woods", hero: images.caddoLake, authorId: "a-hollis", publishedAt: "2026-04-11", readingMinutes: 7, tags: ["caddo", "paddling", "east texas", "cypress"], relatedCollections: ["campfire-kitchen"], relatedDestinations: ["caddo-lake"] }),
  stub({ id: "ar-5", slug: "moving-to-texas-what-nobody-tells-you", title: "What Nobody Tells You About Moving to Texas", dek: "A practical 2026 relocation guide to the costs, taxes, insurance, weather, utilities, schools, special districts, driving and regional differences that surprise people after they move to Texas.", category: "moving-to-texas", hero: images.smallTown, authorId: "a-dell", publishedAt: "2026-08-19", readingMinutes: 24, tags: ["moving to texas", "moving to texas guide", "relocating to texas", "living in texas", "texas cost of living", "texas property taxes", "texas home insurance", "texas schools", "texas utilities", "texas mud district"], featured: true, relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "ar-6", slug: "palo-duro-lighthouse-walk", title: "Down Into the Panhandle", dek: "A complete first-timer’s guide to the Lighthouse Trail at Palo Duro Canyon: distance, heat, water, timing, the final climb, and how to make the canyon a full day instead of one photograph.", category: "state-parks", region: "panhandle", hero: images.paloDuro, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 14, tags: ["palo duro", "hiking", "panhandle", "state parks", "lighthouse trail"], relatedCollections: ["campfire-kitchen"], relatedDestinations: ["palo-duro-canyon-state-park"] }),
  stub({ id: "ar-7", slug: "texas-dance-hall-survival", title: "The Last Dance Halls", dek: "Why historic Texas dance halls survive only when communities can keep roofs dry, floors sound, events active and old buildings useful enough to earn another generation of care.", category: "texas-history", region: "hill-country", hero: images.smallTown, authorId: "a-hollis", publishedAt: "2026-01-28", readingMinutes: 10, tags: ["history", "music", "dance halls", "preservation"], relatedCollections: [], relatedDestinations: ["gruene-historic-district"] }),
  stub({ id: "ar-8", slug: "texas-native-garden-that-survives-august", title: "A Garden That Survives August", dek: "How to build a Texas landscape around roots, soil, shade, irrigation and regionally appropriate native plants instead of replacing dead spring optimism every September.", category: "home-garden", hero: images.bluebonnets, authorId: "a-marisol", publishedAt: "2026-08-20", readingMinutes: 14, tags: ["gardening", "native plants", "xeriscape", "home", "drought", "landscaping"], relatedCollections: ["wildflower-house"], relatedDestinations: [] }),
  stub({ id: "ar-9", slug: "friday-night-and-the-texas-town", title: "Friday Night and the Texas Town", dek: "Texas high-school football is a game, a school event, a marching-band performance, a reunion and a weekly civic ritual. Here is what the stadium tells you about the town around it.", category: "sports", hero: images.smallTown, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 12, tags: ["football", "small towns", "friday night", "community", "high school sports"], relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "ar-10", slug: "big-bend-in-winter", title: "Big Bend Is a Winter Park", dek: "Why November through February changes Big Bend: milder desert hiking, freezing nights, scarce services, busy campgrounds, long drives, and a park where checking conditions is part of the itinerary.", category: "outdoors", region: "big-bend", hero: images.bigBend, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 15, tags: ["big bend", "national parks", "desert", "dark skies", "winter travel"], relatedCollections: ["campfire-kitchen"], relatedDestinations: ["big-bend-national-park"] }),
];

// Canonical lightweight discovery stubs; full authority bodies remain lazy-loaded.
texasCoreArticleStubs.push(
  stub({ id: "evergreen-scenic-drives-in-texas", slug: "scenic-drives-in-texas", title: "Scenic Drives in Texas: Routes, Stops, Seasons and Road Conditions",
    dek: "Choose a Texas scenic drive by landscape and road type, from the Hill Country and Piney Woods to Big Bend, Gulf Coast, Panhandle and South Texas—with realistic trip-planning advice.",
    category: "road-trips", hero: images.roadTrip, authorId: "a-marisol", publishedAt: "2026-10-12", updatedAt: "2026-10-12",
    readingMinutes: 27, tags: ["scenic drives in texas", "texas scenic routes", "big bend scenic drive", "texas road trips"], featured: true,
    sourceName: "TxDOT — 2026 Texas State Travel Guide and Official Travel Map",
    sourceUrl: "https://www.txdot.gov/about/newsroom/stories/get-your-kicks-with-the-2026-texas-travel-guide.html",
    relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "evergreen-texas-wine-country", slug: "texas-wine-country", title: "Texas Wine Country: Regions, Vineyards and Planning a Wine Weekend",
    dek: "Understand Texas wine regions beyond the Fredericksburg tasting corridor, including the Hill Country and Texas High Plains, with AVA geography, vineyard sourcing and practical visitor planning.",
    category: "guides", hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Hills_vineyard.jpg?width=1280",
      alt: "Vineyard rows at Texas Hills Vineyard near Johnson City, Texas", width: 1280, height: 960,
      credit: "Jon Lebkowsky · Wikimedia Commons · CC BY-SA 2.0" },
    authorId: "a-hollis", publishedAt: "2026-10-12", updatedAt: "2026-10-12", readingMinutes: 23,
    tags: ["texas wine country", "texas wineries", "texas wine regions", "texas high plains ava"], featured: true,
    sourceName: "U.S. Alcohol and Tobacco Tax and Trade Bureau — established American Viticultural Areas",
    sourceUrl: "https://www.ttb.gov/regulated-commodities/beverage-alcohol/wine/established-avas",
    relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "evergreen-texas-german-belt", slug: "texas-german-belt", title: "Texas German Belt: Towns, Churches, History and Heritage Routes",
    dek: "Trace German-Texan immigration from New Braunfels and Fredericksburg to Comfort, Boerne and smaller communities, with historical context, churches, food traditions and a responsible heritage-drive itinerary.",
    category: "texas-history", region: "hill-country",
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fredericksburg%20July%202017%205%20%28Marktplatz%29.jpg?width=1600",
      alt: "Fredericksburg Marktplatz and historic town center in Texas", width: 1600, height: 1067,
      credit: "Michael Barera · CC BY-SA 4.0 · Wikimedia Commons" },
    authorId: "a-marisol", publishedAt: "2026-10-12", updatedAt: "2026-10-12", readingMinutes: 26,
    tags: ["texas german belt", "german towns in texas", "new braunfels", "fredericksburg"], featured: true,
    sourceName: "Texas State Historical Association — Adelsverein",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/adelsverein",
    relatedCollections: [], relatedDestinations: [] }),
);

texasCoreArticleStubs.push(...texasGatewayIndexReadyStubs);

const coreSlugs = new Set(texasCoreArticleStubs.map((article) => article.slug));
const gatewayReadySlugs = new Set(texasGatewayIndexReadyStubs.map((article) => article.slug));

const depthSlugs = new Set([
  "bluebonnet-season-field-guide",
  "hill-country-two-lane-loop",
  "palo-duro-lighthouse-walk",
  "texas-native-garden-that-survives-august",
  "friday-night-and-the-texas-town",
  "big-bend-in-winter",
]);

export async function loadTexasCoreArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined") return null;

  if (gatewayReadySlugs.has(slug) || !coreSlugs.has(slug)) {
    const { loadTexasGatewayArticle } = await import("./lazy-texas-gateway");
    return loadTexasGatewayArticle(brandId, slug);
  }
  if (slug === "moving-to-texas-what-nobody-tells-you") {
    const { movingToTexasPillarArticle } = await import("./moving-to-texas-pillar");
    return movingToTexasPillarArticle;
  }
  if (slug === "texas-dance-hall-survival") {
    const { texasDanceHallPreservationArticle } = await import("./texas-dance-hall-preservation");
    return texasDanceHallPreservationArticle;
  }
  if (depthSlugs.has(slug)) {
    const { texasCoreDepthArticles } = await import("./texas-core-depth");
    return texasCoreDepthArticles.find((article) => article.slug === slug) ?? null;
  }
  const { texasCoreArticles } = await import("./texas-core-articles");
  return texasCoreArticles.find((article) => article.slug === slug) ?? null;
}
