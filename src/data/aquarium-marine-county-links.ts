export type AquariumMarineCountyLink = {
  countySlug: string;
  slug: string;
  name: string;
  nearestTown: string;
};

export const AQUARIUM_MARINE_COUNTY_LINKS: readonly AquariumMarineCountyLink[] = [
  { countySlug: "nueces", slug: "texas-state-aquarium", name: "Texas State Aquarium", nearestTown: "Corpus Christi" },
  { countySlug: "dallas", slug: "dallas-world-aquarium", name: "The Dallas World Aquarium", nearestTown: "Dallas" },
  { countySlug: "galveston", slug: "moody-gardens", name: "Moody Gardens", nearestTown: "Galveston" },
  { countySlug: "tarrant", slug: "sea-life-grapevine-aquarium", name: "SEA LIFE Grapevine Aquarium", nearestTown: "Grapevine" },
  { countySlug: "bexar", slug: "sea-life-san-antonio-aquarium", name: "SEA LIFE San Antonio Aquarium", nearestTown: "San Antonio" },
  { countySlug: "harris", slug: "downtown-aquarium-houston", name: "Downtown Aquarium Houston", nearestTown: "Houston" },
  { countySlug: "dallas", slug: "childrens-aquarium-dallas-fair-park", name: "Children's Aquarium Dallas at Fair Park", nearestTown: "Dallas" },
  { countySlug: "bexar", slug: "san-antonio-aquarium", name: "San Antonio Aquarium", nearestTown: "San Antonio" },
  { countySlug: "williamson", slug: "austin-aquarium", name: "Austin Aquarium", nearestTown: "Austin" },
  { countySlug: "harris", slug: "houston-interactive-aquarium-animal-preserve", name: "Houston Interactive Aquarium & Animal Preserve", nearestTown: "Houston" },
  { countySlug: "brazoria", slug: "sea-center-texas", name: "Sea Center Texas", nearestTown: "Lake Jackson" },
  { countySlug: "cameron", slug: "sea-turtle-inc", name: "Sea Turtle, Inc.", nearestTown: "South Padre Island" },
  { countySlug: "nueces", slug: "ut-marine-science-institute-patton-center", name: "UT Marine Science Institute Patton Center", nearestTown: "Port Aransas" },
  { countySlug: "lubbock", slug: "science-spectrum-museum-aquarium", name: "Science Spectrum Museum & Aquarium", nearestTown: "Lubbock" },
  { countySlug: "harris", slug: "houston-zoo", name: "Houston Zoo", nearestTown: "Houston" },
  { countySlug: "tarrant", slug: "fort-worth-zoo", name: "Fort Worth Zoo", nearestTown: "Fort Worth" },
  { countySlug: "bexar", slug: "san-antonio-zoo", name: "San Antonio Zoo", nearestTown: "San Antonio" },
] as const;

export function aquariumMarineLinksForCounty(countySlug: string) {
  const normalized = countySlug.trim().toLowerCase();
  return AQUARIUM_MARINE_COUNTY_LINKS.filter((item) => item.countySlug === normalized);
}
