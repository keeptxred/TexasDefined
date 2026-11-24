import type { Destination } from "./types";

// Dates describe different editorial events. A source check is not a page modification.
// Update the substantive-edit date only after a real editorial change is released.
export const moodyGardensEditorialDates = {
  fullGuideReviewed: "2026-11-09",
  museumFactsReviewed: "2026-11-14",
  holidayFactsReviewed: "2026-11-24",
  lastSubstantiveEdit: "2026-11-24",
} as const;

export function applyMoodyGardensCurrentCuration(destination: Destination): Destination {
  if (destination.slug !== "moody-gardens") return destination;

  return {
    ...destination,
    sourceCheckedAt: moodyGardensEditorialDates.fullGuideReviewed,
    entryNote:
      "Moody Gardens sells tickets for individual attractions and several combinations. The Galveston Children's Museum upstairs in the Discovery Pyramid has separate admission terms, a GCM-only early member hour and its own holiday closures; verify exactly which attractions your ticket covers before purchasing.",
    highlights: [
      "Aquarium Pyramid with marine habitats",
      "Rainforest Pyramid with tropical plants and wildlife",
      "Audience Recognition Theater and 3D/4D programming",
      "Galveston Children's Museum now open upstairs in Discovery Pyramid",
      "Holiday in the Gardens from Nov. 21, 2026 to Jan. 2, 2027",
    ],
    body: [
      "Moody Gardens works as an indoor alternative when Galveston's beach weather is unfavorable: the Aquarium Pyramid emphasizes marine life, the Rainforest Pyramid immerses visitors in a living tropical environment, and the Discovery Pyramid pairs hands-on children's activities with a participatory theater. The complex began as an educational project and now occupies a campus of wildlife, science, entertainment and hospitality facilities beside Offatts Bayou on the west side of the island.",
      "Choose the Aquarium Pyramid when the main goal is watching marine animals: its ocean-region galleries include penguins, seals, sharks and the Jellyfish Gallery, while the Coral Reef Lab connects local conservation to NOAA's Flower Garden Banks sanctuary. Choose the Rainforest Pyramid for a different kind of visit: the route moves from the canopy to lower forest habitats, with free-roaming birds, giant river otters, a dimly lit Nightfall exhibit and a waterfall. It is a warmer, humid indoor setting, not a second aquarium.",
      "Discovery Pyramid offers two different experiences. Upstairs, the Galveston Children's Museum has Our Town, where children can explore a pretend fishing boat, shop and sea turtle clinic, and Room to Grow, a calmer hands-on area for ages 2 to 5. Downstairs, 20,000 Leagues Under the Sea: An Interactive Adventure is a participatory Nautilus submarine voyage with 3D visuals and 4D effects. A child who enjoys open-ended play may prefer the museum over theater effects; check the showtime before deciding. For a wildlife-centered day, Aquarium and Rainforest may fill the available time without Discovery.",
      "Moody Gardens changes with the season. Holiday in the Gardens runs November 21, 2026 through January 2, 2027; the operator lists the Holiday Lights Trail from 5:30 to 10 p.m., while ICE LAND: Caribbean Christmas opens at noon on published dates. The separately sold Holiday Evening Pass begins after 4 p.m.; renting ice skates is not included. Other attractions have different day-of hours. Moody Gardens is open Thanksgiving, Christmas Eve, Christmas Day, New Year's Eve and New Year's Day, with general attractions opening at noon on Christmas Day, but the separately operated Galveston Children's Museum closes on several of those holidays. Palm Beach is closed for 2026 and planned for summer 2027. Check each attraction's daily schedule rather than assuming a resort-wide opening time.",
      "The warm, humid Rainforest Pyramid and its free-roaming animals are a different sensory environment from the Aquarium or theaters. Travelers planning around heat, mobility, hearing accommodations or service animals should check the operator's attraction-specific access policy; the practical details below distinguish loaner wheelchairs, theater captioning and the Rainforest service-animal restriction.",
      "Its west-island location makes Moody Gardens easy to combine with Galveston's other sides. The Seawall and Pleasure Pier provide classic Gulf-front activity, the Strand and East End hold the city's strongest historic architecture, and Galveston Island State Park offers a quieter natural coastline farther west. A two-day trip can therefore balance indoor family attractions, beach time and historic Galveston without leaving the island.",
    ],
    directions:
      "Moody Gardens is on the west side of Galveston Island near Scholes International Airport and Offatts Bayou. Driving directions from Houston use Interstate 45, 61st Street, Seawall Boulevard, 81st Street and Jones Road to Hope Boulevard. Standard self-parking is free, with optional paid parking upgrades; special events can increase traffic around the complex.",
    accessibilityNotes: "Moody Gardens has accessible parking and restrooms, ramps, free first-come wheelchairs at the Visitor Center and Aquarium Pyramid with a license deposit, accessible theater seating and captioning on request. Service animals cannot enter the Rainforest Pyramid; see the official accessibility policy before planning a visit.",
  };
}
