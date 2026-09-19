import type { CategorySlug } from "./types";

export type EntityExploreDestinationLink = {
  slug: string;
  name: string;
  summary: string;
  category: CategorySlug;
  nearestTown: string;
  countySlug: string;
  citySlug?: string;
};

const links: EntityExploreDestinationLink[] = [
  {
    slug: "national-medal-of-honor-museum",
    name: "National Medal of Honor Museum",
    summary: "An immersive Arlington museum centered on Medal of Honor recipients, military history and service.",
    category: "historic-sites",
    nearestTown: "Arlington",
    countySlug: "tarrant",
    citySlug: "arlington",
  },
  {
    slug: "lubbock-lake-landmark",
    name: "Lubbock Lake Landmark",
    summary: "A Texas Tech archaeological and natural-history preserve documenting nearly 12,000 years of human history.",
    category: "historic-sites",
    nearestTown: "Lubbock",
    countySlug: "lubbock",
    citySlug: "lubbock",
  },
  {
    slug: "concordia-cemetery-el-paso",
    name: "Historic Concordia Cemetery",
    summary: "El Paso's historic cemetery, connecting more than 60,000 burials with border, military and community history.",
    category: "historic-sites",
    nearestTown: "El Paso",
    countySlug: "el-paso",
    citySlug: "el-paso",
  },
  {
    slug: "big-texan-steak-ranch",
    name: "The Big Texan Steak Ranch",
    summary: "A Route 66-era Amarillo roadside landmark known for oversized western style and the 72-ounce steak challenge.",
    category: "road-trips",
    nearestTown: "Amarillo",
    countySlug: "potter",
    citySlug: "amarillo",
  },
  {
    slug: "groom-cross",
    name: "The Cross at Groom",
    summary: "A 190-foot Panhandle cross and devotional complex beside Interstate 40 on the historic Route 66 corridor.",
    category: "road-trips",
    nearestTown: "Groom",
    countySlug: "carson",
    citySlug: "groom",
  },
  {
    slug: "grand-galvez",
    name: "Grand Galvez",
    summary: "Galveston's landmark 1911 beachfront hotel, linking island tourism, architecture and seawall history.",
    category: "historic-sites",
    nearestTown: "Galveston",
    countySlug: "galveston",
    citySlug: "galveston",
  },,
  {
    slug: "hazel-bazemore-county-park",
    name: "Hazel Bazemore County Park",
    summary: "A Nueces River birding park and major fall hawk-watch site on Corpus Christi's west side.",
    category: "outdoors",
    nearestTown: "Corpus Christi",
    countySlug: "nueces",
    citySlug: "corpus-christi",
  }
];

export function exploreDestinationsForEntity(kind: string, slug: string) {
  if (kind === "county") return links.filter((destination) => destination.countySlug === slug);
  if (kind === "city") return links.filter((destination) => destination.citySlug === slug);
  return [];
}
