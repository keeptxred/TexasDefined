import { applyTopAttractionAuthority } from "./destination-authority-top-attractions";
import { topAttractionSupplementalSources } from "./top-attraction-authority-sources";
import type { Destination, DestinationAuthoritySource } from "./types";

function dedupeSources(sources: DestinationAuthoritySource[]): DestinationAuthoritySource[] {
  const seen = new Set<string>();
  return sources.filter((source) => {
    const normalized = source.url.trim().replace(/\/$/, "");
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

function moodyGardensSources(): DestinationAuthoritySource[] {
  return [
    {
      label: "Moody Gardens — current hours and pricing",
      url: "https://www.moodygardens.com/visitor-info/hours",
      scope: "Current attraction schedules, Discovery Museum closure guidance and daily visitor information.",
    },
    {
      label: "Moody Gardens — visitor FAQ and parking",
      url: "https://www.moodygardens.com/visitor-info/faq",
      scope: "Current parking, accessibility, ticketing and visitor-policy guidance.",
    },
    {
      label: "Moody Gardens — events calendar",
      url: "https://www.moodygardens.com/events",
      scope: "Current seasonal-event dates and Holiday in the Gardens programming.",
    },
  ];
}

function refreshMoodyGardens(destination: Destination): Destination {
  if (destination.slug !== "moody-gardens") return destination;

  return {
    ...destination,
    sourceCheckedAt: "2026-10-04",
    entryNote:
      "Moody Gardens sells admission by attraction and through combination packages. The Discovery Museum is temporarily closed and is scheduled to reopen in November 2026; the Audience Recognition Theater remains open with regular showtimes. The Aquarium and Rainforest Pyramids, theaters and seasonal attractions can have separate hours, so check the official daily schedule before buying a package.",
    highlights: [
      "Aquarium Pyramid with marine habitats",
      "Rainforest Pyramid with tropical plants and wildlife",
      "Audience Recognition Theater and 3D/4D programming",
      "Discovery Museum scheduled to reopen in November 2026",
      "Holiday in the Gardens from Nov. 21, 2026 to Jan. 2, 2027",
    ],
    body: [
      "Moody Gardens is Galveston's strongest all-weather family attraction because its signature glass pyramids create fully indoor experiences that do not depend on beach conditions. The complex began as an educational project and has grown into a collection of wildlife, science, entertainment and hospitality attractions spread around Offatts Bayou on the west side of the island.",
      "The Aquarium Pyramid is the clearest first priority for marine-life visitors. Large habitats organize animals by ocean region and let families move from Gulf and Caribbean themes to penguins, seals and other marine species without the heat or wind of the shoreline. The Rainforest Pyramid shifts the experience completely, creating a warm tropical environment with free-ranging birds, plants and other wildlife.",
      "Because each major attraction can take substantial time, a good visit is selective rather than automatic. As of October 4, 2026, the Discovery Museum is temporarily closed and scheduled to reopen in November, while the Audience Recognition Theater remains open with regular showtimes. Families interested mainly in animals may spend most of the day between the aquarium and rainforest, and ticket bundles make the most sense when the itinerary genuinely has time for the included experiences.",
      "Moody Gardens changes with the season. Holiday in the Gardens runs November 21, 2026 through January 2, 2027, with ICE LAND: Caribbean Christmas, the Holiday Lights Trail, ice skating and other evening attractions. Palm Beach and water-focused activities are warm-weather draws, so check the official calendar instead of assuming every attraction operates year-round.",
      "Accessibility is unusually well integrated across the property. Moody Gardens reports accessible parking, ramps and restrooms throughout the complex, complimentary wheelchairs and wheelchair access to its major attractions and theaters. Because the Rainforest Pyramid has special service-animal restrictions tied to its wildlife, visitors using service animals should review the current policy before arrival.",
      "Its west-island location makes Moody Gardens easy to combine with Galveston's other sides. The Seawall and Pleasure Pier provide classic Gulf-front activity, the Strand and East End hold the city's strongest historic architecture, and Galveston Island State Park offers a quieter natural coastline farther west. A two-day trip can therefore balance indoor family attractions, beach time and historic Galveston without leaving the island.",
    ],
    directions:
      "Moody Gardens is on the west side of Galveston Island near Scholes International Airport and Offatts Bayou. It is easiest to reach by car from Interstate 45 and 61st Street. Standard self-parking is free, while upgraded parking options cost extra; special events can increase traffic around the complex.",
  };
}

/**
 * Canonical authority resolver for Top-25 rendering and machine-readable output.
 * Base authority supplies the attraction's controlling visitor/ticket sources;
 * the supplemental registry adds institutional history, science, conservation,
 * accessibility or designation evidence.
 */
export function resolveTopAttractionAuthority(destination: Destination): Destination {
  const base = refreshMoodyGardens(applyTopAttractionAuthority(destination));
  if (!base.authorityGuide) return base;
  const currentSources = base.slug === "moody-gardens" ? moodyGardensSources() : [];
  return {
    ...base,
    authorityGuide: {
      ...base.authorityGuide,
      sources: dedupeSources([
        ...base.authorityGuide.sources,
        ...topAttractionSupplementalSources(destination.slug),
        ...currentSources,
      ]),
    },
  };
}
