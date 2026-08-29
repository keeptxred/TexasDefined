import bigBend from "@/assets/big-bend.jpg";

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
];
