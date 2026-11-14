import type { Destination } from "./types";

// Dates describe different editorial events. A source check is not a page modification.
// Update the substantive-edit date only after a real editorial change is released.
export const moodyGardensEditorialDates = {
  fullGuideReviewed: "2026-11-09",
  museumFactsReviewed: "2026-11-14",
  lastSubstantiveEdit: "2026-11-14",
} as const;

export function applyMoodyGardensCurrentCuration(destination: Destination): Destination {
  if (destination.slug !== "moody-gardens") return destination;

  return {
    ...destination,
    sourceCheckedAt: moodyGardensEditorialDates.fullGuideReviewed,
    entryNote:
      "Moody Gardens sells individual attraction admission and a Value Pass for multiple attractions. The Discovery Pyramid now houses the Galveston Children's Museum upstairs, generally open during Moody Gardens attraction hours, with 9 to 10 AM reserved for Galveston Children's Museum members (not other Moody Gardens memberships); the Audience Recognition Theater is downstairs. The children's museum has its own holiday closures. Admission requires a Moody Gardens membership, a ticket specifically including the children's museum, or separate museum admission for each guest age 2 and older. Check the operator's admission details and daily schedule rather than assuming every pyramid ticket includes the museum.",
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
      "Because each major attraction can take substantial time, a good visit is selective rather than automatic. The Discovery Pyramid offers the Galveston Children's Museum upstairs, where the Our Town exhibit lets children pretend to fish, shop or care for sea turtles, while Room to Grow provides a calmer space designed for ages 2 to 5. Downstairs, 20,000 Leagues Under the Sea: An Interactive Adventure uses a participatory Nautilus submarine voyage with 3D visuals and 4D effects. These are different activities with different sensory demands; check each experience's tickets and showtime instead of assuming a general pyramid admission covers both. According to Moody Gardens, guests age 2 and older need a Moody Gardens membership, a ticket that includes Galveston Children's Museum admission, or a separate museum ticket. An Aquarium or Rainforest ticket does not automatically include the museum; confirm what your admission covers before buying. The children's museum independently lists closures for Easter, Thanksgiving Day, Christmas Eve, Christmas Day, New Year's Day and the Sunday after the Momus Parade, so the pyramid schedule alone is not proof that the museum is open. Families interested mainly in marine and rainforest wildlife may spend most of the day between the two other pyramids, while bundles make sense only if there is time for their included experiences.",
      "Moody Gardens changes with the season. Holiday in the Gardens is scheduled from November 21, 2026 through January 2, 2027, with ICE LAND: Caribbean Christmas, the Holiday Lights Trail, ice skating and other evening attractions. Palm Beach is closed for the 2026 season and the operator lists a summer 2027 reopening, so check the official calendar instead of assuming attractions operate year-round.",
      "Moody Gardens reports accessible parking, ramps and restrooms throughout the property, free loaner wheelchairs on a first-come basis at the Visitor Center and Aquarium Pyramid (driver's license deposit), and accessible theater seating with captioning devices on request. Service animals are not admitted inside the free-roaming wildlife environment of the Rainforest Pyramid; check its official accessibility page before arriving.",
      "Its west-island location makes Moody Gardens easy to combine with Galveston's other sides. The Seawall and Pleasure Pier provide classic Gulf-front activity, the Strand and East End hold the city's strongest historic architecture, and Galveston Island State Park offers a quieter natural coastline farther west. A two-day trip can therefore balance indoor family attractions, beach time and historic Galveston without leaving the island.",
    ],
    directions:
      "Moody Gardens is on the west side of Galveston Island near Scholes International Airport and Offatts Bayou. Driving directions from Houston use Interstate 45, 61st Street, Seawall Boulevard, 81st Street and Jones Road to Hope Boulevard. Standard self-parking is free, with optional paid parking upgrades; special events can increase traffic around the complex.",
    accessibilityNotes: "Moody Gardens has accessible parking and restrooms, ramps, free first-come wheelchairs at the Visitor Center and Aquarium Pyramid with a license deposit, accessible theater seating and captioning on request. Service animals cannot enter the Rainforest Pyramid; see the official accessibility policy before planning a visit.",
  };
}
