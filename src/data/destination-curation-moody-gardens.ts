import type { Destination } from "./types";

export function applyMoodyGardensCurrentCuration(destination: Destination): Destination {
  if (destination.slug !== "moody-gardens") return destination;

  return {
    ...destination,
    sourceCheckedAt: "2026-11-09",
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
      "Moody Gardens is Galveston's strongest all-weather family attraction because its signature glass pyramids create fully indoor experiences that do not depend on beach conditions. The complex began as an educational project and has grown into a collection of wildlife, science, entertainment and hospitality attractions spread around Offatts Bayou on the west side of the island.",
      "The Aquarium Pyramid is the clearest first priority for marine-life visitors. Large habitats organize animals by ocean region and let families move from Gulf and Caribbean themes to penguins, seals and other marine species without the heat or wind of the shoreline. The Rainforest Pyramid shifts the experience completely, creating a warm tropical environment with free-ranging birds, plants and other wildlife.",
      "Because each major attraction can take substantial time, a good visit is selective rather than automatic. The Discovery Pyramid now offers the Galveston Children's Museum, with hands-on STEM and maker activities upstairs, and the Audience Recognition Theater downstairs. According to Moody Gardens, guests age 2 and older need a Moody Gardens membership, a ticket that includes Galveston Children's Museum admission, or a separate museum ticket. An Aquarium or Rainforest ticket does not automatically include the museum; confirm what your admission covers before buying. The children's museum independently lists closures for Easter, Thanksgiving Day, Christmas Eve, Christmas Day, New Year's Day and the Sunday after the Momus Parade, so the pyramid schedule alone is not proof that the museum is open. Families interested mainly in marine and rainforest wildlife may spend most of the day between the two other pyramids, while bundles make sense only if there is time for their included experiences.",
      "Moody Gardens changes with the season. Holiday in the Gardens is scheduled from November 21, 2026 through January 2, 2027, with ICE LAND: Caribbean Christmas, the Holiday Lights Trail, ice skating and other evening attractions. Palm Beach is closed for the 2026 season and the operator lists a summer 2027 reopening, so check the official calendar instead of assuming attractions operate year-round.",
      "Moody Gardens reports accessible parking, ramps and restrooms throughout the property, free loaner wheelchairs on a first-come basis at the Visitor Center and Aquarium Pyramid (driver's license deposit), and accessible theater seating with captioning devices on request. Service animals are not admitted inside the free-roaming wildlife environment of the Rainforest Pyramid; check its official accessibility page before arriving.",
      "Its west-island location makes Moody Gardens easy to combine with Galveston's other sides. The Seawall and Pleasure Pier provide classic Gulf-front activity, the Strand and East End hold the city's strongest historic architecture, and Galveston Island State Park offers a quieter natural coastline farther west. A two-day trip can therefore balance indoor family attractions, beach time and historic Galveston without leaving the island.",
    ],
    directions:
      "Moody Gardens is on the west side of Galveston Island near Scholes International Airport and Offatts Bayou. Driving directions from Houston use Interstate 45, 61st Street, Seawall Boulevard, 81st Street and Jones Road to Hope Boulevard. Standard self-parking is free, with optional paid parking upgrades; special events can increase traffic around the complex.",
    accessibilityNotes: "Moody Gardens has accessible parking and restrooms, ramps, free first-come wheelchairs at the Visitor Center and Aquarium Pyramid with a license deposit, accessible theater seating and captioning on request. Service animals cannot enter the Rainforest Pyramid; see the official accessibility policy before planning a visit.",
  };
}
