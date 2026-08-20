import bbqBrisket from "@/assets/bbq-brisket.jpg";
import bigBend from "@/assets/big-bend.jpg";
import bluebonnets from "@/assets/bluebonnets.jpg";
import caddoLake from "@/assets/caddo-lake.jpg";
import paloDuro from "@/assets/palo-duro.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";

import type { Article, ImageRef } from "../types";
import {
  loadTexasGatewayLifestyleBatch6Article,
  texasGatewayLifestyleBatch6Articles,
} from "./texas-gateway-lifestyle-batch6";

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

const baseTexasCoreArticleStubs: Article[] = [
  stub({ id: "ar-1", slug: "what-defines-texas-barbecue", title: "The Line Is the Point", dek: "Why Texans will stand three hours in July for a plate of meat and butcher paper — and what the wait is actually for.", category: "food-bbq", region: "hill-country", hero: images.bbqBrisket, authorId: "a-marisol", publishedAt: "2026-06-18", readingMinutes: 8, tags: ["barbecue", "lockhart", "brisket", "central texas"], featured: true, relatedCollections: ["smoke-and-salt"], relatedDestinations: ["gruene-historic-district"] }),
  stub({ id: "ar-2", slug: "bluebonnet-season-field-guide", title: "Chasing Bluebonnet Season", dek: "Six weeks, one flower, and a state that reorganizes its weekends around it. Where to go, when, and how not to ruin the field.", category: "outdoors", region: "hill-country", hero: images.bluebonnets, authorId: "a-hollis", publishedAt: "2026-03-04", readingMinutes: 6, tags: ["wildflowers", "spring", "hill country", "highway 71"], featured: true, relatedCollections: ["wildflower-house"], relatedDestinations: ["enchanted-rock"] }),
  stub({ id: "ar-3", slug: "hill-country-two-lane-loop", title: "The Two-Lane Loop", dek: "A 240-mile Hill Country drive built entirely from roads with no stripe down the middle — dance halls, low-water crossings and one perfect pie.", category: "road-trips", region: "hill-country", hero: images.roadTrip, authorId: "a-dell", publishedAt: "2026-05-02", readingMinutes: 9, tags: ["road trip", "hill country", "weekend", "driving"], featured: true, relatedCollections: ["campfire-kitchen"], relatedDestinations: ["enchanted-rock", "blue-hole-wimberley"] }),
  stub({ id: "ar-4", slug: "caddo-lake-cypress-morning", title: "Morning on Caddo", dek: "Paddling the boat roads of the only large natural lake in Texas, where the map is a maze and the fog does not lift on schedule.", category: "lakes-rivers", region: "piney-woods", hero: images.caddoLake, authorId: "a-hollis", publishedAt: "2026-04-11", readingMinutes: 7, tags: ["caddo", "paddling", "east texas", "cypress"], relatedCollections: ["campfire-kitchen"], relatedDestinations: ["caddo-lake"] }),
  stub({ id: "ar-5", slug: "moving-to-texas-what-nobody-tells-you", title: "What Nobody Tells You About Moving to Texas", dek: "A practical 2026 relocation guide to the costs, taxes, insurance, weather, utilities, schools, special districts, driving and regional differences that surprise people after they move to Texas.", category: "moving-to-texas", hero: images.smallTown, authorId: "a-dell", publishedAt: "2026-08-19", readingMinutes: 24, tags: ["moving to texas", "moving to texas guide", "relocating to texas", "living in texas", "texas cost of living", "texas property taxes", "texas home insurance", "texas schools", "texas utilities", "texas mud district"], featured: true, relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "ar-6", slug: "palo-duro-lighthouse-walk", title: "Down Into the Panhandle", dek: "Palo Duro Canyon does not announce itself. It just opens, 800 feet deep, in the middle of a wheat field.", category: "state-parks", region: "panhandle", hero: images.paloDuro, authorId: "a-dell", publishedAt: "2026-05-19", readingMinutes: 6, tags: ["palo duro", "hiking", "panhandle", "state parks"], relatedCollections: ["campfire-kitchen"], relatedDestinations: ["palo-duro-canyon"] }),
  stub({ id: "ar-7", slug: "texas-dance-hall-survival", title: "The Last Dance Halls", dek: "Why historic Texas dance halls survive only when communities can keep roofs dry, floors sound, events active and old buildings useful enough to earn another generation of care.", category: "texas-history", region: "hill-country", hero: images.smallTown, authorId: "a-hollis", publishedAt: "2026-01-28", readingMinutes: 10, tags: ["history", "music", "dance halls", "preservation"], relatedCollections: [], relatedDestinations: ["gruene-historic-district"] }),
  stub({ id: "ar-8", slug: "texas-native-garden-that-survives-august", title: "A Garden That Survives August", dek: "Ten native plants that ask for nothing, plus the watering habit that kills more Texas landscapes than drought does.", category: "home-garden", hero: images.bluebonnets, authorId: "a-marisol", publishedAt: "2026-04-25", readingMinutes: 7, tags: ["gardening", "native plants", "xeriscape", "home"], relatedCollections: ["wildflower-house"], relatedDestinations: [] }),
  stub({ id: "ar-9", slug: "friday-night-and-the-texas-town", title: "Friday Night and the Texas Town", dek: "Why the stadium is the largest civic building in towns of four thousand people, and what happens there that has nothing to do with football.", category: "sports", hero: images.smallTown, authorId: "a-dell", publishedAt: "2026-06-02", readingMinutes: 6, tags: ["football", "small towns", "friday night", "community"], relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "ar-10", slug: "big-bend-in-winter", title: "Big Bend Is a Winter Park", dek: "The five-hour drive, the eighty-mile gas gap, and why the hardest national park in Texas to reach is best in January.", category: "outdoors", region: "big-bend", hero: images.bigBend, authorId: "a-hollis", publishedAt: "2026-01-09", readingMinutes: 8, tags: ["big bend", "national parks", "desert", "dark skies"], relatedCollections: ["campfire-kitchen"], relatedDestinations: ["big-bend-chisos-basin"] }),
];

export const texasCoreArticleStubs: Article[] = [...baseTexasCoreArticleStubs, ...texasGatewayLifestyleBatch6Articles];

const coreSlugs = new Set(texasCoreArticleStubs.map((article) => article.slug));

export async function loadTexasCoreArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !coreSlugs.has(slug)) return null;

  const gatewayArticle = await loadTexasGatewayLifestyleBatch6Article(brandId, slug);
  if (gatewayArticle) return gatewayArticle;

  if (slug === "moving-to-texas-what-nobody-tells-you") {
    const { movingToTexasPillarArticle } = await import("./moving-to-texas-pillar");
    return movingToTexasPillarArticle;
  }
  if (slug === "texas-dance-hall-survival") {
    const { texasDanceHallPreservationArticle } = await import("./texas-dance-hall-preservation");
    return texasDanceHallPreservationArticle;
  }
  const { texasCoreArticles } = await import("./texas-core-articles");
  return texasCoreArticles.find((article) => article.slug === slug) ?? null;
}
