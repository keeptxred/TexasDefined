import bluebonnets from "@/assets/bluebonnets.jpg";
import caddoLake from "@/assets/caddo-lake.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";

import { canonicalizeSeasonalArticleLinks } from "../seasonal-article-redirects";
import type { Article, ImageRef } from "../types";
import { texasWildflowerSpeciesStubs } from "./texas-wildflower-species-stubs";

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
// including complete SEO tags and descriptions, is lazy-loaded from seasonal-authority-articles.
type SeasonalStub = Omit<Article, "brandId" | "body" | "publishedAt" | "tags" | "relatedCollections" | "relatedDestinations"> & Partial<Pick<Article, "relatedCollections" | "relatedDestinations">>;
const stub = (record: SeasonalStub): Article => ({
  brandId: "texasdefined",
  body: [],
  publishedAt: "2026-08-20",
  tags: [],
  relatedCollections: [],
  relatedDestinations: [],
  ...record,
});

export const seasonalAuthorityArticleStubs: Article[] = [
  stub({ id: "sa-1", slug: "texas-lighthouses-complete-guide", title: "The Lighthouses That Watched the Texas Coast", dek: "Texas lighthouses, survivors, lost lights and visitor access.", category: "texas-history", region: "gulf-coast", hero: heroes.lighthouse, authorId: "a-hollis", readingMinutes: 18, featured: true, relatedDestinations: ["port-isabel-lighthouse"] }),
  stub({ id: "sa-2", slug: "texas-lighthouse-road-trip", title: "A Texas Lighthouse Road Trip, Sabine to Port Isabel", dek: "A coast-spanning Texas lighthouse road trip and itinerary.", category: "road-trips", region: "gulf-coast", hero: heroes.roadTrip, authorId: "a-dell", readingMinutes: 12, relatedDestinations: ["port-isabel-lighthouse"] }),
  stub({ id: "sa-3", slug: "port-isabel-lighthouse-guide", title: "Port Isabel Lighthouse: The Texas Light You Can Still Climb", dek: "History and visitor guidance for Port Isabel Lighthouse.", category: "historic-sites", region: "gulf-coast", hero: heroes.lighthouse, authorId: "a-hollis", readingMinutes: 9, relatedDestinations: ["port-isabel-lighthouse"] }),
  stub({ id: "sa-4", slug: "lost-lighthouses-of-texas", title: "The Lost Lighthouses of Texas", dek: "The Texas lights that disappeared, moved or became obsolete.", category: "texas-history", region: "gulf-coast", hero: heroes.lighthouse, authorId: "a-hollis", readingMinutes: 10 }),
  stub({ id: "sa-5", slug: "texas-bluebonnets-complete-guide", title: "Bluebonnet Season, Explained", dek: "Texas bluebonnet timing, places, laws and trip planning.", category: "outdoors", region: "hill-country", hero: heroes.bluebonnets, authorId: "a-hollis", readingMinutes: 16, featured: true, relatedCollections: ["wildflower-house"], relatedDestinations: ["enchanted-rock"] }),
  stub({ id: "sa-6", slug: "best-places-to-see-bluebonnets-in-texas", title: "Where Texas Turns Blue in Spring", dek: "The Texas regions most worth planning around for bluebonnets.", category: "outdoors", hero: heroes.bluebonnets, authorId: "a-dell", readingMinutes: 11, relatedCollections: ["wildflower-house"], relatedDestinations: ["enchanted-rock"] }),
  stub({ id: "sa-7", slug: "texas-bluebonnet-road-trip", title: "The Bluebonnet Loop We Would Actually Drive", dek: "A practical spring bluebonnet road trip through Central Texas.", category: "road-trips", region: "hill-country", hero: heroes.roadTrip, authorId: "a-dell", readingMinutes: 10, relatedDestinations: ["enchanted-rock"] }),
  stub({ id: "sa-8", slug: "christmas-in-texas-complete-guide", title: "Christmas in Texas, From River Lights to Courthouse Squares", dek: "Texas Christmas lights, towns, trains and holiday trips.", category: "events", hero: heroes.christmas, authorId: "a-marisol", readingMinutes: 15, featured: true }),
  stub({ id: "sa-9", slug: "best-christmas-towns-in-texas", title: "The Texas Towns That Go All In for Christmas", dek: "Texas towns that transform for the Christmas season.", category: "small-towns", hero: heroes.christmas, authorId: "a-marisol", readingMinutes: 10 }),
  stub({ id: "sa-10", slug: "texas-christmas-road-trip", title: "A Hill Country Christmas Road Trip", dek: "A Hill Country holiday loop built around lights and town squares.", category: "road-trips", region: "hill-country", hero: heroes.roadTrip, authorId: "a-dell", readingMinutes: 9 }),
  stub({ id: "sa-11", slug: "fall-in-texas-complete-guide", title: "Where Autumn Actually Shows Up in Texas", dek: "Texas fall color, timing, parks and scenic drives.", category: "outdoors", hero: heroes.fall, authorId: "a-hollis", readingMinutes: 14, featured: true, relatedDestinations: ["caddo-lake"] }),
  stub({ id: "sa-13", slug: "texas-fall-foliage-road-trip", title: "A Texas Fall Foliage Road Trip That Works", dek: "A flexible Texas foliage route with Hill Country and East Texas options.", category: "road-trips", region: "hill-country", hero: heroes.roadTrip, authorId: "a-dell", readingMinutes: 9 }),
  ...texasWildflowerSpeciesStubs,
];

const wildflowerSlugs = new Set(texasWildflowerSpeciesStubs.map((article) => article.slug));
const seasonalSlugs = new Set(seasonalAuthorityArticleStubs.map((article) => article.slug));

export async function loadSeasonalAuthorityArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !seasonalSlugs.has(slug)) return null;
  if (wildflowerSlugs.has(slug)) {
    const { texasWildflowerSpeciesArticles } = await import("./texas-wildflower-species");
    return texasWildflowerSpeciesArticles.find((item) => item.slug === slug) ?? null;
  }
  const { seasonalAuthorityArticles } = await import("./seasonal-authority-articles");
  const article = seasonalAuthorityArticles.find((item) => item.slug === slug);
  return article ? canonicalizeSeasonalArticleLinks(article) : null;
}
