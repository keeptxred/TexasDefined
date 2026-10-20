import type { Destination } from "./types";
/** Lightweight discovery records. Full coastal authority research and reciprocal links are loaded only on destination detail routes to preserve the strict main-client bundle budget. */
export const coastalHeritageAuthoritySlugs = new Set<string>([
  "la-salle-odyssey-texas-coast",
  "goose-island-big-tree",
  "south-padre-island",
  "goose-island-state-park",
  "texas-maritime-museum-rockport",
  "corpus-christi-museum-science-history",
  "port-aransas",
  "fulton-mansion",
  "rockport",
  "south-padre-island-beaches",
  "port-isabel-lighthouse",
  "port-isabel-historical-museum",
  "palmito-ranch-battlefield",
  "palo-alto-battlefield-national-historical-park",
  "historic-brownsville-museum",
  "iwo-jima-museum-monument",
  "texas-state-aquarium",
  "uss-lexington-museum-corpus-christi",
  "museum-of-the-coastal-bend",
  "matagorda-county-museum",
  "calhoun-county-museum",
  "texana-museum-and-library"
]);
export const coastalHeritageDiscoveryDestinations: Destination[] = [
  {
    id: "coastal-heritage-la-salle-odyssey",
    brandId: "texasdefined",
    slug: "la-salle-odyssey-texas-coast",
    name: "La Salle Odyssey: Seven Texas Coastal Museums",
    summary: "A museum-by-museum coastal history trail following La Salle's 1684–1687 expedition, the wreck and excavation of La Belle, Fort St. Louis, and the Gulf Coast collections that tell different parts of the story.",
    category: "road-trips",
    region: "gulf-coast",
    county: "Aransas",
    nearestTown: "Rockport",
    coordinates: { lat: 28.02642, lng: -97.04874 },
    bestSeason: "Year-round indoor museum touring; fall through spring is more comfortable for moving between coastal towns.",
    entryNote: "The seven-museum list is a historical Texas Historical Commission itinerary, not a guarantee that all seven still maintain identical displays, hours or admission. Check each operator for current exhibits and opening before building a multi-day trip.",
    highlights: ["Seven coastal museum stops in six counties", "La Belle's 1686 wreck in Matagorda Bay", "Fort St. Louis and the Spanish presidio that followed", "Shipwreck archeology and conservation", "Bullock Museum's preserved La Belle hull in Austin"],
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Maritime_Museum_Rockport_Texas_2024.jpg?width=1600",
      alt: "Texas Maritime Museum in Rockport, one of the seven historical La Salle Odyssey museum stops",
      width: 1600, height: 1067,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons (Texas Maritime Museum Rockport Texas 2024)"
    },
    body: ["This is a short search and discovery summary. The complete researched visitor guide loads on the destination page."],
    sourceCheckedAt: "2026-10-12",
    featured: true
  },
  {
    id: "coastal-heritage-goose-island-big-tree",
    brandId: "texasdefined",
    slug: "goose-island-big-tree",
    name: "The Big Tree at Goose Island State Park",
    summary: "See one of the largest coastal live oaks in Texas near Rockport: official measurements, why its exact age is unknown, how to find the separate Big Tree area, and what else to visit nearby.",
    category: "outdoors",
    region: "gulf-coast",
    county: "Aransas",
    nearestTown: "Rockport",
    coordinates: { lat: 28.1523, lng: -96.9767 },
    bestSeason: "Fall through spring for comfortable temperatures and coastal birding; cooler mornings make a shorter outdoor stop more pleasant.",
    entryNote: "The Big Tree is in a separate mainland area associated with Goose Island State Park, not beside the island's fishing pier. Respect barriers and park notices. Contact TPWD for current access and any fees.",
    highlights: ["Coastal live oak (Quercus virginiana)", "35 ft 1.75 in trunk circumference in TPWD's nature inventory", "89-ft crown spread and 44-ft recorded height", "Centuries-old tree with unknown exact age", "Nearby winter whooping-crane habitat"],
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Big_Tree_Texas_2024.jpg?width=1600",
      alt: "The Big Tree, a massive protected coastal live oak with a sprawling canopy at Goose Island State Park",
      width: 4500, height: 3000,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · Big Tree Texas 2024.jpg (22 April 2024)"
    },
    body: ["This is a short search and discovery summary. The complete researched visitor guide loads on the destination page."],
    sourceCheckedAt: "2026-10-12",
    featured: true
  },
  {
    id: "coastal-heritage-south-padre-island",
    brandId: "texasdefined",
    slug: "south-padre-island",
    name: "South Padre Island",
    summary: "An independent South Padre Island planning guide: choosing city versus county beaches, access and parking, Laguna Madre ecology, nearby Port Isabel heritage and beach-season tradeoffs.",
    category: "beaches-coast",
    region: "south-texas",
    county: "Cameron",
    nearestTown: "South Padre Island",
    coordinates: { lat: 26.11184, lng: -97.16813 },
    bestSeason: "Spring and fall for comfortable beach weather; summer for swimming and family vacations with heat, sun and rip-current precautions; winter for birding and quieter beaches.",
    entryNote: "South Padre Island is the developed resort town at Padre Island's southern end. Beach access, parking, vehicle rules and facilities vary among city and county locations. Never treat Padre Island National Seashore near Corpus Christi as the same destination.",
    highlights: ["Gulf beaches and designated public access", "Laguna Madre birding and paddling", "South Padre Island Birding and Nature Center", "Isla Blanca and county beach areas", "Port Isabel Lighthouse and mainland heritage"],
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/South_Padre_Island_beach_panorama.jpg?width=1600",
      alt: "Panorama of the Gulf-facing beach at South Padre Island, Cameron County, Texas",
      width: 7328, height: 3274,
      credit: "Spheroidite · CC BY-SA 4.0 · Wikimedia Commons · South Padre Island beach panorama"
    },
    body: ["This is a short search and discovery summary. The complete researched visitor guide loads on the destination page."],
    sourceCheckedAt: "2026-10-12",
    featured: true
  }
];
