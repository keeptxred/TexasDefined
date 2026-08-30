import bigBend from "@/assets/big-bend.jpg";
import bluebonnets from "@/assets/bluebonnets.jpg";
import roadTrip from "@/assets/road-trip.jpg";

import type { Article, ImageRef } from "../types";

const image = (src: string, alt: string): ImageRef => ({ src, alt, width: 1600, height: 1067 });

/**
 * Lightweight public-discovery records for gateway articles that have been
 * explicitly promoted for indexing. Keep this list aligned one-for-one with
 * TEXAS_GATEWAY_INDEX_READY_SLUGS. Full article bodies remain lazy-loaded.
 */
export const texasGatewayIndexReadyStubs: Article[] = [
  {
    id: "gateway-b13-stars",
    brandId: "texasdefined",
    slug: "best-texas-stargazing-weekend-trips",
    title: "15 Best Texas Stargazing Weekend Trips",
    dek: "Pair dark skies with a real daytime destination so the weekend still works before sunset.",
    category: "outdoors",
    hero: image(bigBend, "The Chisos Mountains rising over the Big Bend desert"),
    authorId: "a-dell",
    publishedAt: "2026-08-20",
    readingMinutes: 8,
    tags: ["texas stargazing", "dark skies texas", "texas astronomy trip"],
    body: [],
    internalLinks: [],
    relatedCollections: [],
    relatedDestinations: ["big-bend-national-park", "fort-davis"],
  },
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
];
