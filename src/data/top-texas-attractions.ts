export const TOP_TEXAS_ATTRACTIONS = [
  { rank: 1, slug: "the-alamo", name: "The Alamo" },
  { rank: 2, slug: "san-antonio-river-walk", name: "San Antonio River Walk" },
  { rank: 3, slug: "space-center-houston", name: "Space Center Houston" },
  { rank: 4, slug: "big-bend-national-park", name: "Big Bend National Park" },
  { rank: 5, slug: "sixth-floor-museum-at-dealey-plaza", name: "The Sixth Floor Museum at Dealey Plaza" },
  { rank: 6, slug: "fort-worth-stockyards", name: "Fort Worth Stockyards" },
  { rank: 7, slug: "texas-state-capitol", name: "Texas State Capitol" },
  { rank: 8, slug: "guadalupe-mountains-national-park", name: "Guadalupe Mountains National Park" },
  { rank: 9, slug: "palo-duro-canyon-state-park", name: "Palo Duro Canyon State Park" },
  { rank: 10, slug: "padre-island-national-seashore", name: "Padre Island National Seashore" },
  { rank: 11, slug: "san-antonio-missions-national-historical-park", name: "San Antonio Missions National Historical Park" },
  { rank: 12, slug: "moody-gardens", name: "Moody Gardens" },
  { rank: 13, slug: "galveston-island-historic-pleasure-pier", name: "Galveston Island Historic Pleasure Pier" },
  { rank: 14, slug: "dallas-arboretum-and-botanical-garden", name: "Dallas Arboretum and Botanical Garden" },
  { rank: 15, slug: "houston-museum-of-natural-science", name: "Houston Museum of Natural Science" },
  { rank: 16, slug: "cadillac-ranch", name: "Cadillac Ranch" },
  { rank: 17, slug: "natural-bridge-caverns", name: "Natural Bridge Caverns" },
  { rank: 18, slug: "hamilton-pool-preserve", name: "Hamilton Pool Preserve" },
  { rank: 19, slug: "bullock-texas-state-history-museum", name: "Bullock Texas State History Museum" },
  { rank: 20, slug: "houston-zoo", name: "Houston Zoo" },
  { rank: 21, slug: "fredericksburg-historic-district", name: "Fredericksburg Historic District" },
  { rank: 22, slug: "inner-space-cavern", name: "Inner Space Cavern" },
  { rank: 23, slug: "natural-bridge-wildlife-ranch", name: "Natural Bridge Wildlife Ranch" },
  { rank: 24, slug: "lady-bird-johnson-wildflower-center", name: "Lady Bird Johnson Wildflower Center" },
  { rank: 25, slug: "gruene-historic-district", name: "Gruene Historic District" },
] as const;

export const TOP_TEXAS_ATTRACTION_SLUGS = TOP_TEXAS_ATTRACTIONS.map((item) => item.slug);
const TOP_TEXAS_ATTRACTION_SLUG_SET = new Set<string>(TOP_TEXAS_ATTRACTION_SLUGS);

export function isTopTexasAttraction(slug: string): boolean {
  return TOP_TEXAS_ATTRACTION_SLUG_SET.has(slug);
}

export function topTexasAttractionRank(slug: string): number | null {
  return TOP_TEXAS_ATTRACTIONS.find((item) => item.slug === slug)?.rank ?? null;
}
