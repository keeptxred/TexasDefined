import bluebonnets from "@/assets/bluebonnets.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";

import type { Article, ImageRef } from "../types";

const image = (src: string, alt: string): ImageRef => ({ src, alt, width: 1600, height: 1067 });

/**
 * Lightweight public-discovery records for gateway articles that have been
 * explicitly promoted for indexing. Keep this list aligned one-for-one with
 * TEXAS_GATEWAY_INDEX_READY_SLUGS. Full article bodies remain lazy-loaded.
 */
export const texasGatewayIndexReadyStubs: Article[] = [
  {
    id: "gateway-tx-vs-ca",
    brandId: "texasdefined",
    slug: "texas-vs-california-differences",
    title: "Texas vs. California: What Changes When You Actually Move",
    dek: "Taxes, housing, insurance, climate, driving and daily routines can feel radically different between California and Texas. The useful comparison starts with a household budget and a specific metro, not a stereotype.",
    category: "moving-to-texas",
    hero: image(roadTrip, "A two-lane Texas highway stretching toward the horizon"),
    authorId: "a-dell",
    publishedAt: "2026-08-20",
    readingMinutes: 17,
    tags: ["texas vs california", "moving from california to texas", "texas california differences", "living in texas"],
    body: [],
    internalLinks: [],
    relatedCollections: [],
    relatedDestinations: ["austin", "dallas", "houston", "san-antonio"],
  },
  {
    id: "gateway-tx-vs-fl",
    brandId: "texasdefined",
    slug: "texas-vs-florida-differences",
    title: "Texas vs. Florida: The Relocation Tradeoffs That Actually Matter",
    dek: "Texas and Florida both have warm climates, fast-growing metros and no personal state income tax, but housing risk, insurance, geography, driving and daily routines can produce very different household outcomes.",
    category: "moving-to-texas",
    hero: image(bluebonnets, "Texas bluebonnets blooming in spring"),
    authorId: "a-dell",
    publishedAt: "2026-08-20",
    readingMinutes: 17,
    tags: ["texas vs florida", "texas florida differences", "moving to texas", "moving to florida"],
    body: [],
    internalLinks: [],
    relatedCollections: [],
    relatedDestinations: ["houston", "galveston", "austin", "san-antonio"],
  },
  {
    id: "gateway-traditions",
    brandId: "texasdefined",
    slug: "texas-traditions-you-should-experience",
    title: "21 Texas Traditions You Should Experience at Least Once",
    dek: "Bluebonnet season, Friday-night football, barbecue counters, dance halls, rodeos, missions and small-town festivals make more sense when you experience them in the communities that keep them alive.",
    category: "guides",
    hero: image(smallTown, "A Texas courthouse square in a historic small town"),
    authorId: "a-hollis",
    publishedAt: "2026-08-20",
    readingMinutes: 16,
    tags: ["texas traditions", "texas culture", "things to do in texas", "texas bucket list"],
    body: [],
    internalLinks: [],
    relatedCollections: [],
    relatedDestinations: ["san-antonio-missions", "big-bend-chisos-basin", "gruene-historic-district", "fredericksburg"],
  },
  {
    id: "gateway-first-trip-mistakes",
    brandId: "texasdefined",
    slug: "mistakes-first-time-visitors-make-in-texas",
    title: "20 First-Time Texas Travel Mistakes—and How to Avoid Them",
    dek: "Texas trips usually go wrong for predictable reasons: too much driving, weak weather planning, bad timing and assuming every famous stop works the same way. Here is how to build a trip that survives contact with the map.",
    category: "guides",
    hero: image(roadTrip, "A two-lane Texas highway stretching toward the horizon"),
    authorId: "a-dell",
    publishedAt: "2026-08-20",
    readingMinutes: 16,
    tags: ["texas travel mistakes", "first time texas", "texas trip planning", "texas travel"],
    body: [],
    internalLinks: [],
    relatedCollections: [],
    relatedDestinations: ["san-antonio-missions", "palo-duro-canyon", "galveston", "big-bend-chisos-basin"],
  },
  {
    id: "gateway-seasonal-bucket",
    brandId: "texasdefined",
    slug: "texas-bucket-list-by-season",
    title: "Texas by Season: A Practical Bucket List for Spring, Summer, Fall and Winter",
    dek: "Texas rewards travelers who match the trip to the calendar. Wildflowers, swimming holes, fairs, football, Gulf weekends and desert hikes each work best under different conditions.",
    category: "guides",
    hero: image(bluebonnets, "Texas bluebonnets blooming in spring"),
    authorId: "a-hollis",
    publishedAt: "2026-08-20",
    readingMinutes: 14,
    tags: ["texas bucket list", "texas seasons", "texas travel", "things to do in texas"],
    body: [],
    internalLinks: [],
    relatedCollections: [],
    relatedDestinations: ["fredericksburg", "galveston", "palo-duro-canyon", "big-bend-chisos-basin"],
  },
];
