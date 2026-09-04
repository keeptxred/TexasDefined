export interface ViatorExperienceRuntimeMarket {
  slug: string;
  name: string;
  regionLabel: string;
  priority: "primary" | "secondary" | "emerging";
  experienceLaneCount: number;
  anchorIdeaCount: number;
  bookingHighlights?: readonly string[];
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
  { slug: "austin", name: "Austin", regionLabel: "Austin & Central Texas", priority: "primary", experienceLaneCount: 9, anchorIdeaCount: 8, bookingHighlights: ["Bat-watching kayak tours", "E-bike city tours", "BBQ & food tours", "Live-music experiences"] },
  { slug: "san-antonio", name: "San Antonio", regionLabel: "San Antonio & Hill Country", priority: "primary", experienceLaneCount: 10, anchorIdeaCount: 8, bookingHighlights: ["Alamo & River Walk combos", "UNESCO Missions tours", "Ghost tours", "Cavern experiences"] },
  { slug: "dallas", name: "Dallas", regionLabel: "Dallas–Fort Worth & North Texas", priority: "primary", experienceLaneCount: 8, anchorIdeaCount: 8, bookingHighlights: ["JFK history tours", "Food & e-bike tours", "Cowboys stadium experiences", "Grapevine attractions"] },
  { slug: "fort-worth", name: "Fort Worth", regionLabel: "Dallas–Fort Worth & North Texas", priority: "primary", experienceLaneCount: 9, anchorIdeaCount: 8, bookingHighlights: ["Stockyards food & history", "Cowboy & honky-tonk experiences", "E-bike sightseeing", "Ghost tours"] },
  { slug: "arlington", name: "Arlington", regionLabel: "Dallas–Fort Worth & North Texas", priority: "secondary", experienceLaneCount: 4, anchorIdeaCount: 5, bookingHighlights: ["Stadium tours", "Family attractions", "DFW combination tours"] },
  { slug: "houston", name: "Houston", regionLabel: "Houston & Upper Gulf Coast", priority: "primary", experienceLaneCount: 10, anchorIdeaCount: 8, bookingHighlights: ["NASA & Space Center tours", "Downtown tunnel tours", "Food & mural tours", "Museum tickets"] },
  { slug: "galveston", name: "Galveston", regionLabel: "Gulf Coast", priority: "primary", experienceLaneCount: 8, anchorIdeaCount: 8, bookingHighlights: ["Ghost & cemetery tours", "Dolphin & harbor cruises", "Historic homes & architecture", "Island e-bike tours"] },
  { slug: "fredericksburg", name: "Fredericksburg & Texas Wine Country", regionLabel: "Texas Hill Country", priority: "primary", experienceLaneCount: 6, anchorIdeaCount: 8, bookingHighlights: ["Winery tours & shuttles", "Wine-country day trips", "Historic district tours", "Wildlife safari experiences"] },
  { slug: "new-braunfels-gruene", name: "New Braunfels & Gruene", regionLabel: "Texas Hill Country", priority: "secondary", experienceLaneCount: 7, anchorIdeaCount: 6, bookingHighlights: ["Comal River tubing", "Cavern tours", "Gruene & River Road experiences"] },
  { slug: "san-marcos", name: "San Marcos", regionLabel: "Central Texas", priority: "secondary", experienceLaneCount: 4, anchorIdeaCount: 4, bookingHighlights: ["Spring-fed river activities", "Paddling & tubing", "Short Hill Country trips"] },
  { slug: "bandera", name: "Bandera & Cowboy Country", regionLabel: "Texas Hill Country", priority: "secondary", experienceLaneCount: 5, anchorIdeaCount: 5, bookingHighlights: ["Horseback riding", "Ranch experiences", "Cowboy heritage"] },
  { slug: "marble-falls-lake-travis", name: "Marble Falls, Lake Travis & Highland Lakes", regionLabel: "Texas Hill Country", priority: "secondary", experienceLaneCount: 5, anchorIdeaCount: 5, bookingHighlights: ["Sunset boat cruises", "Private lake outings", "Hill Country winery trips"] },
  { slug: "waco", name: "Waco", regionLabel: "Central Texas", priority: "secondary", experienceLaneCount: 6, anchorIdeaCount: 6, bookingHighlights: ["Texas ranch horseback rides", "Brazos River outings", "Haunted-history tours", "Food tours"] },
  { slug: "college-station-bryan", name: "Bryan–College Station", regionLabel: "Brazos Valley", priority: "secondary", experienceLaneCount: 6, anchorIdeaCount: 5, bookingHighlights: ["Presidential history", "Aggie sports weekends", "Brazos Valley wine & food"] },
  { slug: "corpus-christi", name: "Corpus Christi", regionLabel: "Coastal Bend", priority: "primary", experienceLaneCount: 7, anchorIdeaCount: 6, bookingHighlights: ["Bayfront sightseeing", "Aquarium & museum tickets", "Wildlife & water activities"] },
  { slug: "port-aransas", name: "Port Aransas & Mustang Island", regionLabel: "Coastal Bend", priority: "secondary", experienceLaneCount: 4, anchorIdeaCount: 5, bookingHighlights: ["Dolphin & sunset cruises", "Glowing kayak tours", "Coastal wildlife outings"] },
  { slug: "south-padre-island", name: "South Padre Island", regionLabel: "Rio Grande Valley & Gulf Coast", priority: "primary", experienceLaneCount: 4, anchorIdeaCount: 6, bookingHighlights: ["Dolphin eco-cruises", "Parasailing & snorkeling", "Bay fishing", "Surf & sandcastle experiences"] },
  { slug: "rio-grande-valley", name: "Rio Grande Valley", regionLabel: "South Texas & Rio Grande Valley", priority: "secondary", experienceLaneCount: 6, anchorIdeaCount: 5, bookingHighlights: ["Birding & wildlife", "Borderland heritage", "South Padre day trips"] },
  { slug: "el-paso", name: "El Paso", regionLabel: "Far West Texas", priority: "secondary", experienceLaneCount: 6, anchorIdeaCount: 6, bookingHighlights: ["Mission Trail heritage", "Ghost & history tours", "Museums & desert culture"] },
  { slug: "big-bend-terlingua", name: "Big Bend & Terlingua", regionLabel: "Big Bend", priority: "primary", experienceLaneCount: 5, anchorIdeaCount: 6, bookingHighlights: ["Rio Grande canyon floats", "Big Bend scenic tours", "Dark-sky experiences"] },
  { slug: "marfa-alpine", name: "Marfa, Alpine & Davis Mountains", regionLabel: "Far West Texas", priority: "secondary", experienceLaneCount: 5, anchorIdeaCount: 6, bookingHighlights: ["Art & cultural tours", "Dark-sky experiences", "Davis Mountains outings"] },
  { slug: "amarillo-palo-duro", name: "Amarillo & Palo Duro Canyon", regionLabel: "Texas Panhandle", priority: "secondary", experienceLaneCount: 7, anchorIdeaCount: 6, bookingHighlights: ["Palo Duro adventures", "Route 66 sightseeing", "Western heritage"] },
  { slug: "lubbock", name: "Lubbock", regionLabel: "South Plains", priority: "emerging", experienceLaneCount: 6, anchorIdeaCount: 5, bookingHighlights: ["Music history", "West Texas wineries", "Ranching heritage"] },
  { slug: "beaumont-golden-triangle", name: "Beaumont & the Golden Triangle", regionLabel: "Upper Gulf Coast", priority: "emerging", experienceLaneCount: 6, anchorIdeaCount: 5, bookingHighlights: ["Spindletop history", "Bayou nature", "Cajun-Texas culture"] },
  { slug: "jefferson-east-texas", name: "Jefferson & East Texas", regionLabel: "East Texas & Piney Woods", priority: "secondary", experienceLaneCount: 7, anchorIdeaCount: 5, bookingHighlights: ["Caddo Lake kayak tours", "Jefferson ghost walks", "Piney Woods history"] },
] as const;
