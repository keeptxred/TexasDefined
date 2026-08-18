import { applyCuratedTopAttractionsBatch2 } from "./destination-curation-top-attractions-batch2";
import { applyCuratedTopAttractionsBatch3 } from "./destination-curation-top-attractions-batch3";
import { applyCuratedTopAttractionsBatch4 } from "./destination-curation-top-attractions-batch4";
import { applyCuratedTopAttractionsBatch5 } from "./destination-curation-top-attractions-batch5";
import type { CategorySlug, Destination, TexasRegion } from "./types";

function fallback(
  slug: string,
  name: string,
  category: CategorySlug,
  region: TexasRegion,
  lat: number,
  lng: number,
): Destination {
  const base: Destination = {
    id: `top-attraction-${slug}`,
    brandId: "texasdefined",
    slug,
    name,
    category,
    region,
    coordinates: { lat, lng },
    summary: "",
    nearestTown: "",
    hero: { src: "", alt: "", width: 1, height: 1 },
    bestSeason: "",
    entryNote: "",
    highlights: [],
    body: [],
  };

  return applyCuratedTopAttractionsBatch5(
    applyCuratedTopAttractionsBatch4(
      applyCuratedTopAttractionsBatch3(applyCuratedTopAttractionsBatch2(base)),
    ),
  );
}

/**
 * Checked-in bases for Top 25 attractions that historically depended on the
 * remote Explore catalog. Full editorial content is applied by the Top 25
 * curators above, so these records keep catalog, search, sitemap and Trip Planner
 * behavior available during remote-data outages.
 */
export const topAttractionExpansionDestinations: Destination[] = [
  fallback("big-bend-national-park", "Big Bend National Park", "national-parks", "big-bend", 29.3286, -103.2067),
  fallback("sixth-floor-museum-at-dealey-plaza", "The Sixth Floor Museum at Dealey Plaza", "historic-sites", "prairies-lakes", 32.7797, -96.8085),
  fallback("fort-worth-stockyards", "Fort Worth Stockyards", "historic-sites", "prairies-lakes", 32.7881, -97.3475),
  fallback("texas-state-capitol", "Texas State Capitol", "historic-sites", "hill-country", 30.2747, -97.7404),
  fallback("guadalupe-mountains-national-park", "Guadalupe Mountains National Park", "national-parks", "big-bend", 31.8936, -104.8227),
  fallback("palo-duro-canyon-state-park", "Palo Duro Canyon State Park", "state-parks", "panhandle", 34.9845, -101.7017),
  fallback("padre-island-national-seashore", "Padre Island National Seashore", "beaches-coast", "gulf-coast", 27.4207, -97.301),
  fallback("san-antonio-missions-national-historical-park", "San Antonio Missions National Historical Park", "historic-sites", "south-texas", 29.361, -98.4794),
  fallback("moody-gardens", "Moody Gardens", "outdoors", "gulf-coast", 29.2739, -94.8506),
  fallback("galveston-island-historic-pleasure-pier", "Galveston Island Historic Pleasure Pier", "beaches-coast", "gulf-coast", 29.2866, -94.7899),
  fallback("dallas-arboretum-and-botanical-garden", "Dallas Arboretum and Botanical Garden", "outdoors", "prairies-lakes", 32.8214, -96.7175),
  fallback("houston-museum-of-natural-science", "Houston Museum of Natural Science", "historic-sites", "gulf-coast", 29.7221, -95.3897),
  fallback("cadillac-ranch", "Cadillac Ranch", "road-trips", "panhandle", 35.1873, -101.9872),
  fallback("natural-bridge-caverns", "Natural Bridge Caverns", "caverns", "hill-country", 29.6927, -98.3429),
  fallback("hamilton-pool-preserve", "Hamilton Pool Preserve", "major-springs", "hill-country", 30.3423, -98.1268),
  fallback("bullock-texas-state-history-museum", "Bullock Texas State History Museum", "historic-sites", "hill-country", 30.2801, -97.7393),
  fallback("houston-zoo", "Houston Zoo", "outdoors", "gulf-coast", 29.7158, -95.3903),
  fallback("fredericksburg-historic-district", "Fredericksburg Historic District", "historic-sites", "hill-country", 30.2743, -98.8715),
  fallback("inner-space-cavern", "Inner Space Cavern", "caverns", "hill-country", 30.6078, -97.6889),
  fallback("natural-bridge-wildlife-ranch", "Natural Bridge Wildlife Ranch", "outdoors", "hill-country", 29.6944, -98.3358),
  fallback("lady-bird-johnson-wildflower-center", "Lady Bird Johnson Wildflower Center", "outdoors", "hill-country", 30.1853, -97.8706),
  fallback("gruene-historic-district", "Gruene Historic District", "historic-sites", "hill-country", 29.7386, -98.1043),
];
