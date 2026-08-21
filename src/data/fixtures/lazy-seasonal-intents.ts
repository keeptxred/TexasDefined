import bluebonnets from "@/assets/bluebonnets.jpg";
import caddoLake from "@/assets/caddo-lake.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";

import type { Article, ImageRef } from "../types";

const image = (src: string, alt: string): ImageRef => ({ src, alt, width: 1600, height: 1067 });
const heroes = {
  blue: image(bluebonnets, "Texas bluebonnets blooming across a spring field"),
  fall: image(caddoLake, "Bald cypress trees and reflective water in East Texas"),
  christmas: image(smallTown, "A historic Texas town square during the holiday season"),
  road: image(roadTrip, "A two-lane Texas road crossing open country"),
};
const stub = (record: Omit<Article, "brandId" | "body">): Article => ({ brandId: "texasdefined", body: [], ...record });

export const seasonalIntentStubs: Article[] = [
  stub({ id: "si-1", slug: "bluebonnets-near-austin", title: "Where to See Bluebonnets Near Austin", dek: "Austin-area bluebonnet drives and public viewing spots.", category: "outdoors", region: "hill-country", hero: heroes.blue, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 8, tags: [], relatedCollections: ["wildflower-house"], relatedDestinations: [] }),
  stub({ id: "si-2", slug: "bluebonnets-near-houston", title: "Where to See Bluebonnets Near Houston", dek: "Houston-area bluebonnet trips toward Brenham and Washington County.", category: "outdoors", region: "prairies-lakes", hero: heroes.blue, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 7, tags: [], relatedCollections: ["wildflower-house"], relatedDestinations: [] }),
  stub({ id: "si-3", slug: "bluebonnets-near-dallas-fort-worth", title: "Where to See Bluebonnets Near Dallas–Fort Worth", dek: "North Texas bluebonnet trips centered on Ennis and nearby drives.", category: "outdoors", region: "prairies-lakes", hero: heroes.blue, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 7, tags: [], relatedCollections: ["wildflower-house"], relatedDestinations: [] }),
  stub({ id: "si-4", slug: "bluebonnets-near-san-antonio", title: "Where to See Bluebonnets Near San Antonio", dek: "Bluebonnet drives from San Antonio into the Hill Country.", category: "outdoors", region: "south-texas", hero: heroes.blue, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 7, tags: [], relatedCollections: ["wildflower-house"], relatedDestinations: [] }),
  stub({ id: "si-5", slug: "texas-bluebonnet-festivals", title: "Texas Bluebonnet Festivals and Spring Flower Weekends", dek: "Texas bluebonnet festivals, trails and spring weekends.", category: "events", hero: heroes.blue, authorId: "a-marisol", publishedAt: "2026-08-20", readingMinutes: 8, tags: [], featured: true, relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "si-6", slug: "is-it-illegal-to-pick-bluebonnets-in-texas", title: "Is It Illegal to Pick Bluebonnets in Texas?", dek: "What Texas law actually says about picking bluebonnets.", category: "guides", hero: heroes.blue, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 6, tags: [], featured: true, relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "si-7", slug: "best-christmas-lights-in-texas", title: "The Best Christmas Lights in Texas", dek: "Texas holiday light displays worth planning a trip around.", category: "events", hero: heroes.christmas, authorId: "a-marisol", publishedAt: "2026-08-20", readingMinutes: 9, tags: [], featured: true, relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "si-8", slug: "texas-christmas-train-rides", title: "Christmas Train Rides in Texas", dek: "Holiday train rides and family railroad experiences across Texas.", category: "events", hero: heroes.road, authorId: "a-marisol", publishedAt: "2026-08-20", readingMinutes: 8, tags: [], relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "si-9", slug: "free-christmas-events-in-texas", title: "Free Christmas Events in Texas", dek: "Free Texas holiday lights, strolls and community traditions.", category: "events", hero: heroes.christmas, authorId: "a-marisol", publishedAt: "2026-08-20", readingMinutes: 8, tags: [], relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "si-10", slug: "east-texas-fall-colors", title: "Where to See Fall Colors in East Texas", dek: "The strongest fall-color destinations across East Texas.", category: "outdoors", region: "piney-woods", hero: heroes.fall, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 8, tags: [], featured: true, relatedCollections: [], relatedDestinations: ["caddo-lake"] }),
  stub({ id: "si-11", slug: "hill-country-fall-colors", title: "Where to See Fall Colors in the Texas Hill Country", dek: "Hill Country river corridors and parks for autumn color.", category: "outdoors", region: "hill-country", hero: heroes.fall, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 8, tags: [], relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "si-12", slug: "best-texas-state-parks-for-fall-colors", title: "The Best Texas State Parks for Fall Colors", dek: "Texas state parks that reliably reward an autumn trip.", category: "state-parks", hero: heroes.fall, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 9, tags: [], featured: true, relatedCollections: [], relatedDestinations: ["caddo-lake"] }),
];

const slugs = new Set(seasonalIntentStubs.map((article) => article.slug));

export async function loadSeasonalIntentArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !slugs.has(slug)) return null;
  const { seasonalIntentArticles } = await import("./seasonal-intent-articles");
  return seasonalIntentArticles.find((article) => article.slug === slug) ?? null;
}
