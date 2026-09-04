import type { ViatorExperienceCategory } from "./viator-experiences";

export type ViatorProductSeedFit = "feature" | "supporting";

export interface ViatorProductSeed {
  marketSlug: string;
  title: string;
  category: ViatorExperienceCategory;
  fit: ViatorProductSeedFit;
}

/**
 * Editorial curation seeds collected from current Viator Texas inventory.
 *
 * These are discovery signals, not a static product catalog. Do not hard-code
 * prices, ratings, review counts, availability or guessed product URLs from
 * this file. Resolve live product details through Viator before rendering a
 * product-level booking card.
 */
export const VIATOR_CURATED_PRODUCT_SEEDS: readonly ViatorProductSeed[] = [
  // Austin
  { marketSlug: "austin", title: "Guided Sunset Bat Kayak Tour in Austin", category: "water", fit: "feature" },
  { marketSlug: "austin", title: "Austin Biker Gang E-Bike Tour", category: "city-sightseeing", fit: "feature" },
  { marketSlug: "austin", title: "Austin Electric Bike Tour: Let it Ride", category: "city-sightseeing", fit: "feature" },
  { marketSlug: "austin", title: "Austin Live Music Crawl", category: "ghost-nightlife", fit: "feature" },
  { marketSlug: "austin", title: "Austin BBQ Tour: 6 Tastings, Michelin Stops & Skip the Line", category: "food-bbq", fit: "feature" },
  { marketSlug: "austin", title: "Austin South Congress Food Tour with 5 Tastings, Tacos & Sweets", category: "food-bbq", fit: "feature" },
  { marketSlug: "austin", title: "Lake Austin Scenic History Tour 2Hr, Fully Shaded, AM, PM, Sunset", category: "water", fit: "feature" },
  { marketSlug: "austin", title: "Lake Travis Public Sunset Tour, BYOB", category: "water", fit: "feature" },
  { marketSlug: "austin", title: "Austin Murder Walk", category: "ghost-nightlife", fit: "supporting" },
  { marketSlug: "austin", title: "Haunted Austin Walking History Tour", category: "ghost-nightlife", fit: "supporting" },
  { marketSlug: "austin", title: "ACL Live Guided Backstage Tour at The Moody Theater", category: "museums-culture", fit: "feature" },
  { marketSlug: "austin", title: "The Story of Austin: Downtown History Walking Tour", category: "history-landmarks", fit: "feature" },

  // San Antonio
  { marketSlug: "san-antonio", title: "San Antonio Premium City Tour with Alamo & River Walk Cruise", category: "history-landmarks", fit: "feature" },
  { marketSlug: "san-antonio", title: "San Antonio Haunted Ghost Bus Tour", category: "ghost-nightlife", fit: "feature" },
  { marketSlug: "san-antonio", title: "Small-Group World Heritage San Antonio Missions Guided Tour", category: "history-landmarks", fit: "feature" },
  { marketSlug: "san-antonio", title: "San Antonio UNESCO Premium Missions Tour", category: "history-landmarks", fit: "feature" },
  { marketSlug: "san-antonio", title: "Walking Tour Along the San Antonio Riverwalk And Around Downtown", category: "city-sightseeing", fit: "feature" },
  { marketSlug: "san-antonio", title: "San Antonio E-Bike Tour: Murals, Street Art and Hidden Gems", category: "city-sightseeing", fit: "feature" },
  { marketSlug: "san-antonio", title: "San Antonio Centre Food Tour of 6 Tastings with Tacos & Ice Cream", category: "food-bbq", fit: "feature" },
  { marketSlug: "san-antonio", title: "Natural Bridge Caverns Hidden Wonders Tour", category: "family", fit: "feature" },
  { marketSlug: "san-antonio", title: "Cave Without a Name Admission Ticket with Guided Cavern Tour", category: "outdoors", fit: "feature" },
  { marketSlug: "san-antonio", title: "Hopscotch San Antonio Immersive Art Experience", category: "museums-culture", fit: "supporting" },

  // Dallas / North Texas
  { marketSlug: "dallas", title: "John F. Kennedy Trolley Tour in Dallas", category: "history-landmarks", fit: "feature" },
  { marketSlug: "dallas", title: "JFK Assassination Tour with JFK Museum and Oswald's Rooming House", category: "history-landmarks", fit: "feature" },
  { marketSlug: "dallas", title: "Dallas and JFK Full-Day Tour with Sixth Floor Museum and Oswald Rooming House", category: "history-landmarks", fit: "feature" },
  { marketSlug: "dallas", title: "Dallas Open Air Van Tour", category: "city-sightseeing", fit: "feature" },
  { marketSlug: "dallas", title: "Dallas Food Tour with 5 Local Food Tastings in Deep Ellum Area", category: "food-bbq", fit: "feature" },
  { marketSlug: "dallas", title: "Downtown Dallas Sightseeing & History 2 Hour E-Bike tour", category: "city-sightseeing", fit: "feature" },
  { marketSlug: "dallas", title: "Dallas Cowboys Stadium Or The Star in Frisco with Transportation", category: "sports", fit: "feature" },
  { marketSlug: "dallas", title: "The Real Unreal at Meow Wolf Grapevine", category: "museums-culture", fit: "feature" },
  { marketSlug: "dallas", title: "SEA LIFE Aquarium Grapevine Admission Ticket", category: "family", fit: "supporting" },
  { marketSlug: "dallas", title: "George W. Bush Presidential Library & Museum Tour", category: "museums-culture", fit: "supporting" },

  // Fort Worth
  { marketSlug: "fort-worth", title: "FW Stockyards All-Inclusive, Self-Guided Food & History Tour", category: "western", fit: "feature" },
  { marketSlug: "fort-worth", title: "Stockyards History Tour Fort Worth Pub Crawl", category: "western", fit: "feature" },
  { marketSlug: "fort-worth", title: "Fort Worth Stockyards Foodie Tour by Food Tours of America", category: "food-bbq", fit: "feature" },
  { marketSlug: "fort-worth", title: "Billy Bob's Texas Honky Tonk Dinner and Photo Package", category: "western", fit: "feature" },
  { marketSlug: "fort-worth", title: "Fort Worth Electric Bike Tour", category: "city-sightseeing", fit: "feature" },
  { marketSlug: "fort-worth", title: "Stockyard Shadows: Wicked Fort Worth Ghost Tours", category: "ghost-nightlife", fit: "supporting" },
  { marketSlug: "fort-worth", title: "Dinosaur World Glen Rose", category: "family", fit: "supporting" },

  // Houston
  { marketSlug: "houston", title: "Astroville Houston Tunnel Tour: Downtown History & Hidden Gems", category: "history-landmarks", fit: "feature" },
  { marketSlug: "houston", title: "Houston Space Center Ticket With NASA Expert Guide & Transport", category: "museums-culture", fit: "feature" },
  { marketSlug: "houston", title: "NASA Historic Mission Control Tram Tour + General Admission Pass", category: "museums-culture", fit: "feature" },
  { marketSlug: "houston", title: "Houston Downtown Food Tour with 5 Tastings of Tradition & Fusion", category: "food-bbq", fit: "feature" },
  { marketSlug: "houston", title: "Houston's Official City & Mural Tour!", category: "city-sightseeing", fit: "feature" },
  { marketSlug: "houston", title: "Houston Museum of Natural Science General Admission", category: "museums-culture", fit: "feature" },
  { marketSlug: "houston", title: "Museum of Fine Arts, Houston All Access Admission Ticket", category: "museums-culture", fit: "feature" },
  { marketSlug: "houston", title: "Meow Wolf's Radio Tave in Houston", category: "museums-culture", fit: "supporting" },
  { marketSlug: "houston", title: "Private Houston Brewery Tour by Cart", category: "wine-spirits", fit: "supporting" },
  { marketSlug: "houston", title: "Juneteenth and Beyond African American Van Tours", category: "history-landmarks", fit: "feature" },

  // Galveston
  { marketSlug: "galveston", title: "The Historic Galveston Ghost Tour", category: "ghost-nightlife", fit: "feature" },
  { marketSlug: "galveston", title: "The Galveston Cemetery Tour - Walk With The Dead!", category: "ghost-nightlife", fit: "feature" },
  { marketSlug: "galveston", title: "Haunted Harbor Tours – Galveston Ghost Boat", category: "ghost-nightlife", fit: "feature" },
  { marketSlug: "galveston", title: "The Galveston Architecture Tour - Visit Historic Homes & Mansions", category: "history-landmarks", fit: "feature" },
  { marketSlug: "galveston", title: "Tour Galveston's 1895 Moody Mansion", category: "history-landmarks", fit: "feature" },
  { marketSlug: "galveston", title: "Galveston Island E-Bike Adventure Tour", category: "city-sightseeing", fit: "feature" },
  { marketSlug: "galveston", title: "Galveston Naval Museum Admission Ticket", category: "museums-culture", fit: "supporting" },
  { marketSlug: "galveston", title: "The Bryan Museum Admission", category: "museums-culture", fit: "feature" },
  { marketSlug: "galveston", title: "Baywatch Dolphin Tours – Pier 21 Galveston", category: "water", fit: "feature" },
  { marketSlug: "galveston", title: "Galveston Sweets and Treats Tour", category: "food-bbq", fit: "supporting" },

  // Fredericksburg / Hill Country
  { marketSlug: "fredericksburg", title: "Fredericksburg Safari Tour With Wine Tasting", category: "wine-spirits", fit: "feature" },
  { marketSlug: "fredericksburg", title: "Taste of Fredericksburg Small-Group Wine Tour from San Antonio", category: "wine-spirits", fit: "feature" },
  { marketSlug: "fredericksburg", title: "Boutique Winery Experience in the Fredericksburg Texas Hill Country", category: "wine-spirits", fit: "feature" },
  { marketSlug: "fredericksburg", title: "Fredericksburg Wine Trolley - Air Conditioned and Heated!", category: "wine-spirits", fit: "feature" },
  { marketSlug: "fredericksburg", title: "Fredericksburg Texas Area Wine Tastings: 3 Wineries and Lunch", category: "wine-spirits", fit: "feature" },
  { marketSlug: "fredericksburg", title: "Fredericksburg Historic District Narrated Tour", category: "history-landmarks", fit: "feature" },
  { marketSlug: "fredericksburg", title: "Fredericksburg Giraffe Safari and Dinner Experience", category: "outdoors", fit: "supporting" },
  { marketSlug: "fredericksburg", title: "Half-Day Hill Country Wine Shuttle From Austin", category: "day-trips", fit: "feature" },

  // New Braunfels / Gruene / caverns
  { marketSlug: "new-braunfels-gruene", title: "River Tubing on the Comal River with 3 Chutes and Shuttle", category: "water", fit: "feature" },
  { marketSlug: "new-braunfels-gruene", title: "2 HR | Slingshot Gruene and River Road Self-guided Tour", category: "city-sightseeing", fit: "supporting" },

  // Lake Travis / Highland Lakes
  { marketSlug: "marble-falls-lake-travis", title: "2 hr Sunset Boat Cruise on Lake Austin. BYOB (Single Tickets)", category: "water", fit: "feature" },
  { marketSlug: "marble-falls-lake-travis", title: "Lake Austin Private Boat - 2 Hour, Cooler, Swim, BYOB, Float Pad", category: "water", fit: "supporting" },

  // Waco / Brazos Valley
  { marketSlug: "waco", title: "Horseback Riding on Scenic Texas Ranch near Waco", category: "western", fit: "feature" },
  { marketSlug: "waco", title: "Amazing Brazos River Morning or Sunset Boat Adventure", category: "water", fit: "feature" },
  { marketSlug: "waco", title: "Haunts & Legends Tour: Waco’s Stories after Dark", category: "ghost-nightlife", fit: "feature" },
  { marketSlug: "waco", title: "Waco Foodie Tour: Taste the City Like a Local", category: "food-bbq", fit: "supporting" },

  // Port Aransas / Coastal Bend
  { marketSlug: "port-aransas", title: "Private Dolphin Watch and Sunset Boat Tour Port Aransas Texas", category: "water", fit: "feature" },
  { marketSlug: "port-aransas", title: "GlowRow Glowing Kayak Tour Port Aransas - Lighthouse Lakes", category: "water", fit: "feature" },

  // South Padre Island
  { marketSlug: "south-padre-island", title: "Sunset Dolphin Watch Cruise", category: "water", fit: "feature" },
  { marketSlug: "south-padre-island", title: "Parasailing Adventure in South Padre Island", category: "water", fit: "feature" },
  { marketSlug: "south-padre-island", title: "North Bay Snorkeling Adventure on South Padre Island", category: "water", fit: "feature" },
  { marketSlug: "south-padre-island", title: "Bay Fishing Adventure in South Padre Island", category: "water", fit: "feature" },
  { marketSlug: "south-padre-island", title: "Learn to Surf on South Padre Island", category: "outdoors", fit: "feature" },
  { marketSlug: "south-padre-island", title: "South Padre Island Sandcastling Experience", category: "family", fit: "feature" },
  { marketSlug: "south-padre-island", title: "45-Minute Sea-Doo Rental in South Padre Island", category: "water", fit: "supporting" },
  { marketSlug: "south-padre-island", title: "Banana Boat South Padre Island", category: "water", fit: "supporting" },

  // Big Bend / Far West Texas
  { marketSlug: "big-bend-terlingua", title: "Float the Canyons of the Rio Grande", category: "water", fit: "feature" },
  { marketSlug: "big-bend-terlingua", title: "Big Bend National Park Self-Guided Driving Audio Tour", category: "outdoors", fit: "supporting" },
  { marketSlug: "el-paso", title: "Wraiths of the West Texas Wind: El Paso Ghost Tour", category: "ghost-nightlife", fit: "supporting" },
  { marketSlug: "el-paso", title: "El Paso Crystal Mine Museum Pass", category: "museums-culture", fit: "supporting" },

  // East Texas
  { marketSlug: "jefferson-east-texas", title: "Mystical Private Kayak and Canoe Tours on Caddo Lake", category: "water", fit: "feature" },
  { marketSlug: "jefferson-east-texas", title: "Self-Guided Jefferson Ghosts Walking Tour", category: "ghost-nightlife", fit: "supporting" },
] as const;

/**
 * Inventory types intentionally kept out of TexasDefined editorial discovery.
 * Their presence on Viator does not make them destination content.
 */
export const VIATOR_PRODUCT_EXCLUSION_RULES = [
  "airport transfers and hotel transfers",
  "black-car and chauffeur-only services",
  "cruise-port shuttles without an experience component",
  "non-Texas inventory accidentally returned in Texas searches",
  "generic scavenger hunts without meaningful Texas-specific interpretation",
  "duplicative private limo or vehicle-transfer variants",
  "standalone vehicle rentals unless the route itself is the travel experience",
  "thin workshops and generic indoor activities unless they support a destination guide",
] as const;

export function viatorSeedsForMarket(marketSlug: string) {
  return VIATOR_CURATED_PRODUCT_SEEDS.filter((seed) => seed.marketSlug === marketSlug);
}
