export interface ViatorExperienceRuntimeMarket {
  slug: string;
  name: string;
  regionLabel: string;
  priority: "primary" | "secondary" | "emerging";
  experienceLaneCount: number;
  anchorIdeaCount: number;
}

/**
 * Minimal client projection used by the Explore booking directory.
 * Research prose, sources, full category metadata, attractions and match aliases
 * intentionally live elsewhere so the statewide Viator layer stays inside the
 * site's client bundle budget.
 */
export const VIATOR_RUNTIME_CATEGORIES = [
  "City sightseeing",
  "History & landmarks",
  "Food & barbecue",
  "Wine, beer & spirits",
  "Outdoor adventure",
  "On the water",
  "Ghost tours & nightlife",
  "Western & ranch",
  "Museums & culture",
  "Family attractions",
  "Sports & stadiums",
  "Day trips",
] as const;

export const VIATOR_RUNTIME_MARKETS: readonly ViatorExperienceRuntimeMarket[] = [
  { slug: "austin", name: "Austin", regionLabel: "Austin & Central Texas", priority: "primary", experienceLaneCount: 9, anchorIdeaCount: 8 },
  { slug: "san-antonio", name: "San Antonio", regionLabel: "San Antonio & Hill Country", priority: "primary", experienceLaneCount: 10, anchorIdeaCount: 8 },
  { slug: "dallas", name: "Dallas", regionLabel: "Dallas–Fort Worth & North Texas", priority: "primary", experienceLaneCount: 8, anchorIdeaCount: 8 },
  { slug: "fort-worth", name: "Fort Worth", regionLabel: "Dallas–Fort Worth & North Texas", priority: "primary", experienceLaneCount: 9, anchorIdeaCount: 8 },
  { slug: "arlington", name: "Arlington", regionLabel: "Dallas–Fort Worth & North Texas", priority: "secondary", experienceLaneCount: 4, anchorIdeaCount: 5 },
  { slug: "houston", name: "Houston", regionLabel: "Houston & Upper Gulf Coast", priority: "primary", experienceLaneCount: 10, anchorIdeaCount: 8 },
  { slug: "galveston", name: "Galveston", regionLabel: "Gulf Coast", priority: "primary", experienceLaneCount: 8, anchorIdeaCount: 8 },
  { slug: "fredericksburg", name: "Fredericksburg & Texas Wine Country", regionLabel: "Texas Hill Country", priority: "primary", experienceLaneCount: 6, anchorIdeaCount: 8 },
  { slug: "new-braunfels-gruene", name: "New Braunfels & Gruene", regionLabel: "Texas Hill Country", priority: "secondary", experienceLaneCount: 7, anchorIdeaCount: 6 },
  { slug: "san-marcos", name: "San Marcos", regionLabel: "Central Texas", priority: "secondary", experienceLaneCount: 4, anchorIdeaCount: 4 },
  { slug: "bandera", name: "Bandera & Cowboy Country", regionLabel: "Texas Hill Country", priority: "secondary", experienceLaneCount: 5, anchorIdeaCount: 5 },
  { slug: "marble-falls-lake-travis", name: "Marble Falls, Lake Travis & Highland Lakes", regionLabel: "Texas Hill Country", priority: "secondary", experienceLaneCount: 5, anchorIdeaCount: 5 },
  { slug: "waco", name: "Waco", regionLabel: "Central Texas", priority: "secondary", experienceLaneCount: 6, anchorIdeaCount: 6 },
  { slug: "college-station-bryan", name: "Bryan–College Station", regionLabel: "Brazos Valley", priority: "secondary", experienceLaneCount: 6, anchorIdeaCount: 5 },
  { slug: "corpus-christi", name: "Corpus Christi", regionLabel: "Coastal Bend", priority: "primary", experienceLaneCount: 7, anchorIdeaCount: 6 },
  { slug: "port-aransas", name: "Port Aransas & Mustang Island", regionLabel: "Coastal Bend", priority: "secondary", experienceLaneCount: 4, anchorIdeaCount: 5 },
  { slug: "south-padre-island", name: "South Padre Island", regionLabel: "Rio Grande Valley & Gulf Coast", priority: "primary", experienceLaneCount: 4, anchorIdeaCount: 6 },
  { slug: "rio-grande-valley", name: "Rio Grande Valley", regionLabel: "South Texas & Rio Grande Valley", priority: "secondary", experienceLaneCount: 6, anchorIdeaCount: 5 },
  { slug: "el-paso", name: "El Paso", regionLabel: "Far West Texas", priority: "secondary", experienceLaneCount: 6, anchorIdeaCount: 6 },
  { slug: "big-bend-terlingua", name: "Big Bend & Terlingua", regionLabel: "Big Bend", priority: "primary", experienceLaneCount: 5, anchorIdeaCount: 6 },
  { slug: "marfa-alpine", name: "Marfa, Alpine & Davis Mountains", regionLabel: "Far West Texas", priority: "secondary", experienceLaneCount: 5, anchorIdeaCount: 6 },
  { slug: "amarillo-palo-duro", name: "Amarillo & Palo Duro Canyon", regionLabel: "Texas Panhandle", priority: "secondary", experienceLaneCount: 7, anchorIdeaCount: 6 },
  { slug: "lubbock", name: "Lubbock", regionLabel: "South Plains", priority: "emerging", experienceLaneCount: 6, anchorIdeaCount: 5 },
  { slug: "beaumont-golden-triangle", name: "Beaumont & the Golden Triangle", regionLabel: "Upper Gulf Coast", priority: "emerging", experienceLaneCount: 6, anchorIdeaCount: 5 },
  { slug: "jefferson-east-texas", name: "Jefferson & East Texas", regionLabel: "East Texas & Piney Woods", priority: "secondary", experienceLaneCount: 7, anchorIdeaCount: 5 },
] as const;
