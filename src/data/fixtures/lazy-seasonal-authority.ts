import bluebonnets from "@/assets/bluebonnets.jpg";
import caddoLake from "@/assets/caddo-lake.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";

import type { Article, ImageRef } from "../types";

const image = (src: string, alt: string): ImageRef => ({ src, alt, width: 1600, height: 1067 });
const lighthouseHero: ImageRef = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port_Isabel%2C_Texas_Lighthouse.jpg?width=1600",
  alt: "Port Isabel Lighthouse on the southern Texas Gulf Coast",
  width: 1600,
  height: 1200,
  credit: "Billy D. Wagner · CC BY-SA 4.0 · Wikimedia Commons",
};
const heroes = {
  bluebonnets: image(bluebonnets, "Texas bluebonnets covering a field in spring"),
  fall: image(caddoLake, "Bald cypress trees along a Texas lake in autumn light"),
  roadTrip: image(roadTrip, "A two-lane Texas road crossing open country"),
  christmas: image(smallTown, "A historic Texas town square decorated for the holiday season"),
  lighthouse: lighthouseHero,
};

// These records power lightweight discovery cards only. Full article metadata,
// including complete SEO tags, is lazy-loaded from seasonal-authority-articles.
const stub = (record: Omit<Article, "brandId" | "body">): Article => ({ brandId: "texasdefined", body: [], ...record });

export const seasonalAuthorityArticleStubs: Article[] = [
  stub({ id: "sa-1", slug: "texas-lighthouses-complete-guide", title: "The Lighthouses That Watched the Texas Coast", dek: "A coast-to-coast guide to Texas lighthouses: what survives, what disappeared, which towers can be visited, and how each light fits into the history of the Gulf Coast.", category: "texas-history", region: "gulf-coast", hero: heroes.lighthouse, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 18, tags: [], featured: true, relatedCollections: [], relatedDestinations: ["port-isabel-lighthouse"] }),
  stub({ id: "sa-2", slug: "texas-lighthouse-road-trip", title: "A Texas Lighthouse Road Trip, Sabine to Port Isabel", dek: "A practical Gulf Coast itinerary linking Texas lighthouse history with ferries, beaches, historic ports, barrier islands and county stops from the upper coast to the Rio Grande Valley.", category: "road-trips", region: "gulf-coast", hero: heroes.roadTrip, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 12, tags: [], relatedCollections: [], relatedDestinations: ["port-isabel-lighthouse"] }),
  stub({ id: "sa-3", slug: "port-isabel-lighthouse-guide", title: "Port Isabel Lighthouse: The Texas Light You Can Still Climb", dek: "History, visitor context and a deeper look at the 1850s lighthouse that still anchors Port Isabel at the southern end of the Texas coast.", category: "historic-sites", region: "gulf-coast", hero: heroes.lighthouse, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 9, tags: [], relatedCollections: [], relatedDestinations: ["port-isabel-lighthouse"] }),
  stub({ id: "sa-4", slug: "lost-lighthouses-of-texas", title: "The Lost Lighthouses of Texas", dek: "A guide to the Texas lights that disappeared, moved, became obsolete or survive only through records, photographs and the coastal geography they once guarded.", category: "texas-history", region: "gulf-coast", hero: heroes.lighthouse, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 10, tags: [], relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "sa-5", slug: "texas-bluebonnets-complete-guide", title: "Bluebonnet Season, Explained", dek: "When bluebonnets bloom, where to find them, how weather changes the season, what the state-flower law actually says, and how to plan a spring trip without damaging the fields.", category: "outdoors", region: "hill-country", hero: heroes.bluebonnets, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 16, tags: [], featured: true, relatedCollections: ["wildflower-house"], relatedDestinations: ["enchanted-rock"] }),
  stub({ id: "sa-6", slug: "best-places-to-see-bluebonnets-in-texas", title: "Where Texas Turns Blue in Spring", dek: "The bluebonnet regions worth planning around, from Ennis and Washington County to the Highland Lakes, Willow City, Lake Travis and Big Bend.", category: "outdoors", hero: heroes.bluebonnets, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 11, tags: [], relatedCollections: ["wildflower-house"], relatedDestinations: ["enchanted-rock"] }),
  stub({ id: "sa-7", slug: "texas-bluebonnet-road-trip", title: "The Bluebonnet Loop We Would Actually Drive", dek: "A spring road trip through Brenham, Washington County, the Highland Lakes and the Hill Country, with enough backup stops to survive an unpredictable bloom year.", category: "road-trips", region: "hill-country", hero: heroes.roadTrip, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 10, tags: [], relatedCollections: [], relatedDestinations: ["enchanted-rock"] }),
  stub({ id: "sa-8", slug: "christmas-in-texas-complete-guide", title: "Christmas in Texas, From River Lights to Courthouse Squares", dek: "The Texas holiday guide: big-city lights, small-town squares, German traditions, train rides, coastal celebrations and the destinations worth building a December trip around.", category: "events", hero: heroes.christmas, authorId: "a-marisol", publishedAt: "2026-08-20", readingMinutes: 15, tags: [], featured: true, relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "sa-9", slug: "best-christmas-towns-in-texas", title: "The Texas Towns That Go All In for Christmas", dek: "From Grapevine and Fredericksburg to Marshall, Johnson City, Granbury and Georgetown, these are the places where the whole town becomes part of the holiday.", category: "small-towns", hero: heroes.christmas, authorId: "a-marisol", publishedAt: "2026-08-20", readingMinutes: 10, tags: [], relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "sa-10", slug: "texas-christmas-road-trip", title: "A Hill Country Christmas Road Trip", dek: "A December loop through Fredericksburg, Johnson City, Marble Falls and nearby Hill Country towns built around lights, historic squares and short driving legs.", category: "road-trips", region: "hill-country", hero: heroes.roadTrip, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 9, tags: [], relatedCollections: [], relatedDestinations: [] }),
  stub({ id: "sa-11", slug: "fall-in-texas-complete-guide", title: "Where Autumn Actually Shows Up in Texas", dek: "A statewide fall guide to color, timing, parks, scenic drives and weekend destinations from Lost Maples and the Frio to the Piney Woods and Guadalupe Mountains.", category: "outdoors", hero: heroes.fall, authorId: "a-hollis", publishedAt: "2026-08-20", readingMinutes: 14, tags: [], featured: true, relatedCollections: [], relatedDestinations: ["caddo-lake"] }),
  stub({ id: "sa-12", slug: "best-places-for-fall-colors-in-texas", title: "The Places We Trust for Texas Fall Color", dek: "Lost Maples, Garner, Caddo Lake, Daingerfield, Tyler, Guadalupe River and the other Texas places most likely to reward an autumn drive.", category: "state-parks", hero: heroes.fall, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 10, tags: [], relatedCollections: [], relatedDestinations: ["caddo-lake"] }),
  stub({ id: "sa-13", slug: "texas-fall-foliage-road-trip", title: "A Texas Fall Foliage Road Trip That Works", dek: "A flexible autumn route through the Frio, Lost Maples and the Guadalupe corridor, plus an East Texas alternative for years when the Hill Country runs late.", category: "road-trips", region: "hill-country", hero: heroes.roadTrip, authorId: "a-dell", publishedAt: "2026-08-20", readingMinutes: 9, tags: [], relatedCollections: [], relatedDestinations: [] }),
];

const seasonalSlugs = new Set(seasonalAuthorityArticleStubs.map((article) => article.slug));

export async function loadSeasonalAuthorityArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !seasonalSlugs.has(slug)) return null;
  const { seasonalAuthorityArticles } = await import("./seasonal-authority-articles");
  return seasonalAuthorityArticles.find((article) => article.slug === slug) ?? null;
}
