import type { ViatorProductSeed } from "./viator-curated-product-seeds-base";

/**
 * High-fit editorial discovery signals from the supplied Viator Texas pages
 * 18–20 (reviewed 2026-09-08). Volatile prices, ratings, review counts and
 * product URLs intentionally remain outside this checked-in research layer.
 */
export const VIATOR_CURATED_PRODUCT_SEEDS_PAGES_18_20: readonly ViatorProductSeed[] = [
  // Austin
  { marketSlug: "austin", title: "Private Half-Hour Pedicab City Tour of Austin", category: "city-sightseeing", fit: "supporting" },
  { marketSlug: "austin", title: "Austin Self-Guided Driving & Walking Audio Tour Guide", category: "city-sightseeing", fit: "supporting" },
  { marketSlug: "austin", title: "Greenbelter Safari Hikes", category: "outdoors", fit: "feature" },
  { marketSlug: "austin", title: "Austin Guided Outdoor Climbing Experience", category: "outdoors", fit: "feature" },
  { marketSlug: "austin", title: "Neon Paddle Night", category: "water", fit: "feature" },
  { marketSlug: "austin", title: "The Drag: Austin Music Culture and History Walking Tour", category: "museums-culture", fit: "feature" },

  // San Antonio
  { marketSlug: "san-antonio", title: "Self-Guided Ghost Audio Tour in San Antonio App with EMF Reader", category: "ghost-nightlife", fit: "supporting" },
  { marketSlug: "san-antonio", title: "San Antonio Botanical Garden Admission Ticket", category: "family", fit: "feature" },
  { marketSlug: "san-antonio", title: "San Antonio Art and Shop Walking Tour", category: "museums-culture", fit: "feature" },

  // Dallas / North Texas
  { marketSlug: "dallas", title: "Dallas Holocaust and Human Rights Museum All Day Ticket", category: "museums-culture", fit: "feature" },
  { marketSlug: "dallas", title: "Smart Tour: Dallas Mural E-Bike Tour", category: "city-sightseeing", fit: "feature" },
  { marketSlug: "dallas", title: "DFW Sports Fan AdvenTOUR: A&T Stadium, AAC, Globe Life & More!", category: "sports", fit: "feature" },
  { marketSlug: "dallas", title: "Southfork Ranch and Ewing Mansion Tour from Dallas", category: "history-landmarks", fit: "feature" },
  { marketSlug: "dallas", title: "North Texas Wineries & Vineyards Tour & Tastings", category: "day-trips", fit: "feature" },

  // Fort Worth
  { marketSlug: "fort-worth", title: "Murals & Mimosas - Cowtown Cycle Party BYOB Public Tour", category: "city-sightseeing", fit: "supporting" },

  // Houston
  { marketSlug: "houston", title: "Downtown Houston Food Tour", category: "food-bbq", fit: "feature" },
  { marketSlug: "houston", title: "The Best of Houston Self-Guided Driving Audio Tour", category: "city-sightseeing", fit: "supporting" },
  { marketSlug: "houston", title: "Seismique Immersive Art Experience Ticket", category: "museums-culture", fit: "supporting" },
  { marketSlug: "houston", title: "Houston Tunnels Tours", category: "history-landmarks", fit: "feature" },
  { marketSlug: "houston", title: "Explore Downtown Houston by Max Pro E Scooter", category: "city-sightseeing", fit: "supporting" },
  { marketSlug: "houston", title: "Houston Buffalo Bayou Park Cistern History Tour", category: "history-landmarks", fit: "feature" },
  { marketSlug: "houston", title: "Houston Mural Group Tour", category: "city-sightseeing", fit: "feature" },

  // Galveston
  { marketSlug: "galveston", title: "The Shadows of Revelry Walking Ghost Tour", category: "ghost-nightlife", fit: "feature" },
  { marketSlug: "galveston", title: "Historic Galveston Red Light District Tour", category: "history-landmarks", fit: "feature" },
  { marketSlug: "galveston", title: "Galveston Ghost Tour (Self-Guided Driving/Walking Audio Tour)", category: "ghost-nightlife", fit: "supporting" },
  { marketSlug: "galveston", title: "Galveston Sunset Tour – Sophisticated Adult Oriented Cruise", category: "water", fit: "feature" },
  { marketSlug: "galveston", title: "Galveston Historical Harbor Cruise with Dolphins", category: "water", fit: "feature" },

  // Hill Country / Central Texas
  { marketSlug: "fredericksburg", title: "Javi’s History Tour Of Downtown Fredericksburg", category: "history-landmarks", fit: "feature" },
  { marketSlug: "marble-falls-lake-travis", title: "Sip & Savor: Wine Tasting at Flat Creek Estate", category: "wine-spirits", fit: "feature" },
  { marketSlug: "san-marcos", title: "Clear Kayak Day Adventure Tour in San Marcos", category: "water", fit: "feature" },
  { marketSlug: "waco", title: "Horseback Riding on the Historic Chisholm Trail Downtown Waco", category: "history-landmarks", fit: "feature" },

  // South Padre Island
  { marketSlug: "south-padre-island", title: "Dolphin Wildlife Space X Cruise", category: "water", fit: "feature" },
] as const;
