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

export type ViatorRuntimeCategory = (typeof VIATOR_RUNTIME_CATEGORIES)[number];

export interface ViatorExperienceRuntimeMarket {
  slug: string;
  name: string;
  regionLabel: string;
  priority: "primary" | "secondary" | "emerging";
  /** Compact, non-product booking lanes supported by reviewed Viator inventory. */
  signalLanes?: readonly ViatorRuntimeCategory[];
}

/** Latest manual reconciliation date for the compact inventory signals below. */
export const VIATOR_RUNTIME_SIGNAL_REVIEWED_AT = "2026-09-08";

/**
 * Minimal client projection used by the Explore booking directory.
 * Research prose, sources, full category metadata, attractions, product seeds
 * and match aliases intentionally live elsewhere so the statewide Viator layer
 * stays inside the site's client bundle budget. signalLanes are category-level
 * summaries only; live products, prices and availability remain on Viator.
 */
export const VIATOR_RUNTIME_MARKETS: readonly ViatorExperienceRuntimeMarket[] = [
  { slug: "austin", name: "Austin", regionLabel: "Austin & Central Texas", priority: "primary", signalLanes: ["Food & barbecue", "On the water", "Museums & culture"] },
  { slug: "san-antonio", name: "San Antonio", regionLabel: "San Antonio & Hill Country", priority: "primary", signalLanes: ["History & landmarks", "Food & barbecue", "Ghost tours & nightlife"] },
  { slug: "dallas", name: "Dallas", regionLabel: "Dallas–Fort Worth & North Texas", priority: "primary", signalLanes: ["History & landmarks", "Food & barbecue", "Sports & stadiums"] },
  { slug: "fort-worth", name: "Fort Worth", regionLabel: "Dallas–Fort Worth & North Texas", priority: "primary", signalLanes: ["Western & ranch", "Food & barbecue", "City sightseeing"] },
  { slug: "arlington", name: "Arlington", regionLabel: "Dallas–Fort Worth & North Texas", priority: "secondary" },
  { slug: "houston", name: "Houston", regionLabel: "Houston & Upper Gulf Coast", priority: "primary", signalLanes: ["Museums & culture", "History & landmarks", "Food & barbecue"] },
  { slug: "galveston", name: "Galveston", regionLabel: "Gulf Coast", priority: "primary", signalLanes: ["History & landmarks", "On the water", "Ghost tours & nightlife"] },
  { slug: "fredericksburg", name: "Fredericksburg & Texas Wine Country", regionLabel: "Texas Hill Country", priority: "primary", signalLanes: ["Wine, beer & spirits", "History & landmarks", "Day trips"] },
  { slug: "new-braunfels-gruene", name: "New Braunfels & Gruene", regionLabel: "Texas Hill Country", priority: "secondary", signalLanes: ["On the water", "City sightseeing"] },
  { slug: "san-marcos", name: "San Marcos", regionLabel: "Central Texas", priority: "secondary", signalLanes: ["On the water"] },
  { slug: "bandera", name: "Bandera & Cowboy Country", regionLabel: "Texas Hill Country", priority: "secondary" },
  { slug: "marble-falls-lake-travis", name: "Marble Falls, Lake Travis & Highland Lakes", regionLabel: "Texas Hill Country", priority: "secondary", signalLanes: ["On the water", "Wine, beer & spirits"] },
  { slug: "waco", name: "Waco", regionLabel: "Central Texas", priority: "secondary", signalLanes: ["Western & ranch", "On the water", "Ghost tours & nightlife"] },
  { slug: "college-station-bryan", name: "Bryan–College Station", regionLabel: "Brazos Valley", priority: "secondary" },
  { slug: "corpus-christi", name: "Corpus Christi", regionLabel: "Coastal Bend", priority: "primary" },
  { slug: "port-aransas", name: "Port Aransas & Mustang Island", regionLabel: "Coastal Bend", priority: "secondary", signalLanes: ["On the water"] },
  { slug: "south-padre-island", name: "South Padre Island", regionLabel: "Rio Grande Valley & Gulf Coast", priority: "primary", signalLanes: ["On the water", "Outdoor adventure", "Family attractions"] },
  { slug: "rio-grande-valley", name: "Rio Grande Valley", regionLabel: "South Texas & Rio Grande Valley", priority: "secondary" },
  { slug: "el-paso", name: "El Paso", regionLabel: "Far West Texas", priority: "secondary", signalLanes: ["Ghost tours & nightlife", "Museums & culture"] },
  { slug: "big-bend-terlingua", name: "Big Bend & Terlingua", regionLabel: "Big Bend", priority: "primary", signalLanes: ["Outdoor adventure", "On the water"] },
  { slug: "marfa-alpine", name: "Marfa, Alpine & Davis Mountains", regionLabel: "Far West Texas", priority: "secondary" },
  { slug: "amarillo-palo-duro", name: "Amarillo & Palo Duro Canyon", regionLabel: "Texas Panhandle", priority: "secondary" },
  { slug: "lubbock", name: "Lubbock", regionLabel: "South Plains", priority: "emerging" },
  { slug: "beaumont-golden-triangle", name: "Beaumont & the Golden Triangle", regionLabel: "Upper Gulf Coast", priority: "emerging" },
  { slug: "jefferson-east-texas", name: "Jefferson & East Texas", regionLabel: "East Texas & Piney Woods", priority: "secondary", signalLanes: ["On the water", "Ghost tours & nightlife"] },
] as const;
