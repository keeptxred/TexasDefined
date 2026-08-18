import type { Destination } from "./types";

/**
 * TexasDefined's Top 25 Texas Attractions collection is being curated one
 * destination at a time. Entries here are also checked-in destination fallbacks
 * so their guides and Trip Planner stops do not depend on the remote Explore
 * catalog being available.
 */
type TopAttractionContent = Omit<
  Destination,
  "id" | "brandId" | "slug" | "name" | "category" | "region" | "coordinates"
>;

const theAlamoContent: TopAttractionContent = {
  summary:
    "San Antonio's best-known historic landmark: the former Mission San Antonio de Valero, where more than three centuries of mission, military, revolutionary and preservation history converge in the heart of downtown.",
  nearestTown: "San Antonio",
  bestSeason:
    "Fall through spring for comfortable downtown walking; in summer, visit near opening for cooler temperatures and lighter crowds",
  entryNote:
    "Admission to the historic Alamo Church is free, but a timed reservation is required. Guided tours and the Alamo Exhibit are separate ticketed experiences. Check the official site for current hours, construction impacts and availability before visiting.",
  highlights: [
    "Historic Alamo Church and Long Barrack",
    "Alamo Exhibit and the Ralston Family Collections Center",
    "Living History demonstrations and interpretation of the mission and 1836 battle",
    "Downtown location within an easy walk of the San Antonio River Walk",
  ],
  body: [
    "The Alamo is much more than the familiar limestone church facade. The site began as Mission San Antonio de Valero in 1718 and moved to its present location in 1724, decades before the Texas Revolution. A good visit starts with that longer timeline: Indigenous communities, Spanish mission life, Mexican Texas, military occupation, the 1836 battle and the generations of preservation work that followed all occupy the same compact downtown landscape.",
    "For a first visit, reserve a free timed entry to the Alamo Church and leave enough time for the Long Barrack, grounds and interpretation outside the church itself. The Alamo Exhibit in the Ralston Family Collections Center adds artifacts and deeper context, while living-history programs can make the site easier to understand for families and visitors who want more than a quick photograph of the facade.",
    "The 1836 battle is the best-known chapter, but treating it as the entire story misses why this place matters. The Alamo is one of the five San Antonio missions included in the UNESCO World Heritage designation, connecting it directly to San Antonio Missions National Historical Park and the broader Spanish colonial landscape along the San Antonio River.",
    "Its downtown setting makes the Alamo one of the easiest major Texas attractions to combine with other stops. The San Antonio River Walk is only a short walk away, so the two work naturally as part of the same half-day or full-day itinerary. Visitors interested in the larger historical landscape should also continue south to the other missions rather than treating the Alamo as an isolated monument.",
    "Plan around crowds and heat. Weekday mornings are usually the simplest time to experience the church and grounds at a slower pace, especially during warm months. Downtown events, school breaks and major holidays can make the plaza much busier, and the continuing Alamo Plan can change pedestrian routes or access around parts of the site, so confirm current conditions before arrival.",
    "The Alamo also makes a strong starting point for understanding Bexar County. From here, the River Walk, the mission corridor and San Antonio's older civic core reveal how water, settlement, religion, military history and tourism grew together. TexasDefined's Bexar County guide and San Antonio destination pages can turn a landmark visit into a broader read of the city instead of a single photo stop.",
  ],
  managingAuthority: "Texas General Land Office / Alamo Trust, Inc.",
  officialUrl: "https://www.thealamo.org/visit/",
  sourceCheckedAt: "2026-08-17",
  reservationUrl: "https://tickets.thealamo.org/",
  county: "Bexar",
  address: "300 Alamo Plaza, San Antonio, TX 78205",
  directions:
    "The Alamo is in the center of downtown San Antonio at Alamo Plaza, within walking distance of the River Walk and many downtown hotels. Use a downtown garage, rideshare or transit and check current pedestrian access before arrival because surrounding construction can change approaches to the site.",
  accessibilityNotes:
    "Wheelchairs, medically authorized mobility devices and strollers are permitted throughout the Alamo complex. Free sensory bags and weighted lap pads are available through the Welcome Center; check the official accessibility information for current services.",
  featured: true,
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Alamo_(facade).jpg?width=1600",
    alt: "Front facade of the historic Alamo Church in downtown San Antonio, Texas",
    width: 1600,
    height: 1067,
    credit: "Abbie Myers · CC BY-SA 4.0 · Wikimedia Commons",
  },
};

export const topAttractionDestinations: Destination[] = [
  {
    id: "top-attraction-the-alamo",
    brandId: "texasdefined",
    slug: "the-alamo",
    name: "The Alamo",
    category: "historic-sites",
    region: "south-texas",
    coordinates: { lat: 29.4257, lng: -98.4861 },
    ...theAlamoContent,
  },
];

const curated: Record<string, Partial<Destination>> = {
  "the-alamo": theAlamoContent,
};

export function applyCuratedTopAttractions(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override
    ? {
        ...destination,
        ...override,
        hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero,
      }
    : destination;
}
