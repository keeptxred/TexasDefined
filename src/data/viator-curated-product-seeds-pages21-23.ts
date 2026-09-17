import type { ViatorProductSeed } from "./viator-curated-product-seeds-base";

/**
 * High-fit editorial discovery signals from the supplied Viator Texas pages
 * 21–23 (reviewed 2026-09-08). All 72 supplied listings were reconciled;
 * transfers, generic escape/scavenger inventory, thin indoor activities and
 * redundant low-signal variants remain intentionally excluded. Volatile prices,
 * ratings, review counts and product URLs stay outside this checked-in layer.
 */
export const VIATOR_CURATED_PRODUCT_SEEDS_PAGES_21_23: readonly ViatorProductSeed[] = [
  // Austin
  { marketSlug: "austin", title: "Giant Glow Paddleboarding the Downtown Skyline with Bats", category: "water", fit: "feature" },
  { marketSlug: "austin", title: "Waterloo Music Saunter", category: "museums-culture", fit: "feature" },
  { marketSlug: "austin", title: "Austin Downtown Food Tour With BBQ Brisket and Peach Cobbler", category: "food-bbq", fit: "feature" },
  { marketSlug: "austin", title: "Texas Hill Country Group Wine Tour by Limousine", category: "wine-spirits", fit: "feature" },
  { marketSlug: "austin", title: "Hauntings, Apparitions & Ashes of Austin Ghost Tour", category: "ghost-nightlife", fit: "supporting" },
  { marketSlug: "austin", title: "Austin E-Bike Foodie Tour", category: "food-bbq", fit: "feature" },
  { marketSlug: "austin", title: "Private Lake Austin Boat Tour 2 Hour Luxury Cruise Optional Shade", category: "water", fit: "feature" },
  { marketSlug: "austin", title: "Austin Street Art and Street Food Tour with Local Guide", category: "food-bbq", fit: "feature" },
  { marketSlug: "austin", title: "Live Music Capital of the World Pedicab Tour", category: "museums-culture", fit: "feature" },
  { marketSlug: "austin", title: "Austin Art and Architecture Bicycle Tour", category: "city-sightseeing", fit: "feature" },
  { marketSlug: "austin", title: "Austin Icons Bicycle Tour", category: "city-sightseeing", fit: "feature" },

  // San Antonio
  { marketSlug: "san-antonio", title: "The Buckhorn Saloon & Museum and Texas Ranger Museum Admission", category: "museums-culture", fit: "feature" },
  { marketSlug: "san-antonio", title: "LEGOLAND Discovery Center San Antonio Admission Ticket", category: "family", fit: "supporting" },
  { marketSlug: "san-antonio", title: "San Antonio: Off-Road 4 & 6-seater UTV Adventure", category: "outdoors", fit: "supporting" },
  { marketSlug: "san-antonio", title: "San Antonio Ranger Creek Brewstillery Tour", category: "wine-spirits", fit: "feature" },
  { marketSlug: "san-antonio", title: "Private Drunk History Tour: Lunch, Libations & History", category: "ghost-nightlife", fit: "supporting" },
  { marketSlug: "san-antonio", title: "Madams & Mayhem – Adults-Only San Antonio Ghost Tour", category: "ghost-nightlife", fit: "supporting" },
  { marketSlug: "san-antonio", title: "VESPA SiDECAR Tour in San Antonio with Tacos", category: "food-bbq", fit: "feature" },
  { marketSlug: "san-antonio", title: "Texas’ Oldest Haunted Pub Crawl Shared Walking Tour", category: "ghost-nightlife", fit: "feature" },
  { marketSlug: "san-antonio", title: "Private San Antonio Food Tour +6 Tastings with Tacos & Ice Cream", category: "food-bbq", fit: "supporting" },

  // Dallas / North Texas
  { marketSlug: "dallas", title: "LEGOLAND® Discovery Center Dallas Admission Ticket", category: "family", fit: "supporting" },
  { marketSlug: "dallas", title: "Dallas Flavor and History Tour", category: "food-bbq", fit: "feature" },
  { marketSlug: "dallas", title: "Dallas Cowboys Football Game at ATandT Stadium", category: "sports", fit: "supporting" },
  { marketSlug: "dallas", title: "Dallas Deep Ellum Food & Street Art Tour by Food Tours of America", category: "food-bbq", fit: "feature" },
  { marketSlug: "dallas", title: "Waco AdvenTOUR: Explore Waco & Magnolia Market from Dallas", category: "day-trips", fit: "feature" },
  { marketSlug: "dallas", title: "Dallas Highlights Tour", category: "city-sightseeing", fit: "feature" },
  { marketSlug: "dallas", title: "Dallas Highlights & Fort Worth Highlights Day Tour", category: "day-trips", fit: "feature" },

  // Houston
  { marketSlug: "houston", title: "Tea Around Town Houston: An Elegant Tea Experience", category: "city-sightseeing", fit: "supporting" },
  { marketSlug: "houston", title: "Private NASA Space Center Day Trip with Houston City Tour", category: "museums-culture", fit: "feature" },
  { marketSlug: "houston", title: "Small Group Day Trip from Houston to Austin", category: "day-trips", fit: "feature" },
  { marketSlug: "houston", title: "Galveston Sightseeing Tour 5-Hr private day trip", category: "day-trips", fit: "feature" },
  { marketSlug: "houston", title: "5 Hour Full Guided Fishing Trip. Redfish++ Reel in the memories.", category: "water", fit: "feature" },

  // Galveston
  { marketSlug: "galveston", title: "Galveston's Secrets of the Strand Walking Tour", category: "history-landmarks", fit: "feature" },
  { marketSlug: "galveston", title: "Galveston Seawall SegwayTour", category: "city-sightseeing", fit: "feature" },
  { marketSlug: "galveston", title: "Magical History Segway Tour", category: "history-landmarks", fit: "feature" },
  { marketSlug: "galveston", title: "Demo and Reno Galveston Reconstructed Private Tour", category: "history-landmarks", fit: "feature" },
  { marketSlug: "galveston", title: "Full-Day Jetty Fishing Charter from Galveston", category: "water", fit: "feature" },
  { marketSlug: "galveston", title: "Historical E-Bike Tour of Galveston", category: "history-landmarks", fit: "feature" },
  { marketSlug: "galveston", title: "Galveston's Best Pub Crawl Tour and Guided History Walk", category: "ghost-nightlife", fit: "feature" },
  { marketSlug: "galveston", title: "Private Sailing Experience on Galveston Bay", category: "water", fit: "feature" },

  // Fredericksburg / Hill Country
  { marketSlug: "fredericksburg", title: "Wine Tour Pros - Private Fredericksburg Wine Tour Up to 11 people", category: "wine-spirits", fit: "feature" },
  { marketSlug: "fredericksburg", title: "Luxe Hill Country Private Wine Adventure with Gourmet Lunch", category: "wine-spirits", fit: "feature" },
  { marketSlug: "fredericksburg", title: "2 to 5 Guests Fredericksburg Private Mercedes SUV Wine Tour", category: "wine-spirits", fit: "feature" },

  // Lake Travis / Highland Lakes
  { marketSlug: "marble-falls-lake-travis", title: "Sunset Yacht Charter Experience on Lake Travis", category: "water", fit: "feature" },
  { marketSlug: "marble-falls-lake-travis", title: "3 Hour Private Boat Charter on Lake Travis for up to 12 People", category: "water", fit: "supporting" },
] as const;
