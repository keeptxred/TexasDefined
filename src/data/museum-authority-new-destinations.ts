import type { Destination } from "./types";
import { cityPassDestinationExpansion } from "./citypass-destination-expansion";

/**
 * Fill structural gaps without replacing existing researched museum slugs.
 * Witte's existing destination is adopted from the CityPASS expansion.
 */
export const museumAuthorityDestinations: Destination[] = [
  ...cityPassDestinationExpansion.filter((destination) => destination.slug === "witte-museum"),
  {
    id: "museum-authority-george-ranch",
    brandId: "texasdefined",
    slug: "george-ranch-historical-park",
    name: "George Ranch Historical Park",
    summary: "Explore two centuries of Fort Bend County ranching and settlement at George Ranch Historical Park in Richmond, with historic houses, working ranch interpretation, a blacksmith shop and changing demonstrations.",
    category: "historic-sites",
    region: "gulf-coast",
    nearestTown: "Richmond",
    county: "Fort Bend",
    coordinates: { lat: 29.5334, lng: -95.6915 },
    hero: {
      src: "https://tile.loc.gov/image-services/iiif/service%3Apnp%3Ahighsm%3A29100%3A29135/full/pct%3A25/0/default.jpg",
      alt: "Costumed interpreter outside an early stock-farm house at George Ranch Historical Park near Richmond",
      width: 1024,
      height: 683,
      credit: "Carol M. Highsmith · Library of Congress, Highsmith Archive (item 2014633335); check the source record for reuse terms",
    },
    bestSeason: "Fall through spring for comfortable outdoor historic-house touring; check heat and storm forecasts all year.",
    entryNote: "Public admission normally operates Saturdays, 9 a.m.–5 p.m. Weekday visits commonly require advance group or school bookings, with special summer and holiday exceptions. Confirm current hours, tickets and open demonstrations directly with the ranch.",
    highlights: [
      "Jones Stock Farm and early settlement",
      "Ryon Prairie Home and later ranch history",
      "Blacksmith and working-ranch demonstrations",
      "Historic homes and tractor-pulled tram",
    ],
    body: [
      "George Ranch Historical Park follows the history of one long-lived ranching landscape in Fort Bend County. Successive homes interpret the Jones, Ryon, Davis and George families across distinct periods of the nineteenth and twentieth centuries, while the working ranch allows visitors to connect household stories with agriculture, livestock and the changes that reshaped the Brazos region.",
      "A visit is not just a series of preserved houses. The ranch uses costumed interpreters, historic domestic settings, animals, blacksmith demonstrations and outdoor landscapes to help visitors understand how ranch life operated. Interpretation should also acknowledge the labor systems, displacement and inequalities that supported settlement and agricultural expansion.",
      "The visitor route extends across a sizable outdoor landscape rather than one climate-controlled gallery. The operator recommends about three to four hours, practical footwear and hydration, with a tractor-pulled tram offering another way to move among stops. Public general admission and advance group tours follow different schedules; check the ranch's current booking information before arriving.",
    ],
    managingAuthority: "The George Foundation / The George Ranch",
    officialUrl: "https://www.georgeranch.org/visit/hours-admissions-directions/",
    address: "10215 FM 762, Richmond, TX 77469",
    sourceCheckedAt: "2026-10-12",
    accessibilityNotes: "The ranch describes a roughly one-mile paved interpretive loop and a tractor-pulled tram, but individual historic-house entrances and outdoor surfaces may differ. Contact visitor services to verify accessible routing and any assistive arrangements.",
  },
];
