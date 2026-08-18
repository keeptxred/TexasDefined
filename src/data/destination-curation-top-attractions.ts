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

const sanAntonioRiverWalkContent: TopAttractionContent = {
  summary:
    "San Antonio's 15-mile river corridor links the famous below-street downtown promenade with the Museum Reach, Pearl and the Mission Reach, combining cypress-shaded walks, restaurants, public art, river cruises and some of the city's most important historic places.",
  nearestTown: "San Antonio",
  bestSeason:
    "Fall through spring for the most comfortable walking weather; summer is best early in the morning or after sunset, while the holiday season brings some of the River Walk's most recognizable evening lights",
  entryNote:
    "The River Walk itself is a free public space. Downtown and Museum Reach are open 24 hours a day, while Mission Reach is open during daylight hours. River cruises, attractions, restaurants and special events have separate prices and schedules.",
  highlights: [
    "The classic below-street downtown river loop with cypress trees, stone bridges, restaurants and river cruises",
    "Museum Reach trail and public art extending north toward Pearl",
    "Mission Reach trails connecting the river corridor with San Antonio's Spanish colonial mission landscape",
    "Easy walking connection between the River Walk, The Alamo and other downtown landmarks",
    "Fifteen miles of connected riverfront experiences ranging from busy downtown patios to quieter hike-and-bike sections",
  ],
  body: [
    "The San Antonio River Walk is best understood as a long urban corridor, not a single downtown attraction. The postcard section below street level is the part most visitors know first: cypress trees, limestone walls, arched bridges, restaurants and passenger boats winding through the center of the city. But that downtown loop is only one piece of a roughly 15-mile system that continues north through Museum Reach and south through Mission Reach.",
    "Downtown is the right starting point for a first visit because several of San Antonio's major landmarks sit within an easy walk of the river. The Alamo is only a few blocks away, while La Villita, Main Plaza, historic hotels, theaters, restaurants and museums create a dense itinerary that does not require a car once you are in the center. A river cruise can provide a quick orientation, but walking the paths at your own pace reveals bridges, stairways, landscaping and architecture that are easy to miss from the water.",
    "North of downtown, Museum Reach changes the feel of the River Walk. The river corridor becomes a broader cultural trail with public art, landscaped paths and connections toward Pearl. The San Antonio River Authority notes that this reach includes about three miles of paved trail and a lock-and-dam system that lets passenger barges travel between downtown and the northern reach. It is a useful choice for visitors who want a longer walk with fewer restaurant crowds and more room to focus on the river itself.",
    "South of downtown, Mission Reach shifts again. Here the River Walk becomes a recreation and heritage corridor tied to the San Antonio Missions National Historical Park landscape. Walking and biking paths follow restored river habitat toward the missions, making it possible to connect the city's famous downtown tourism district with a much older story of settlement, irrigation, Indigenous communities and Spanish colonial life. This section is especially valuable for travelers who want to see how the Alamo fits into a larger network of missions rather than treating it as an isolated site.",
    "Timing changes the experience. Early mornings are quieter and cooler, especially in summer, while evenings bring reflections, restaurant activity and one of downtown San Antonio's best-known nighttime scenes. Weekends, conventions, festivals and the holiday-light season can make the central loop much busier. Because the Downtown and Museum Reach sections remain open around the clock but Mission Reach is daylight-only, a practical full-day plan is to use daylight for the southern trail and missions, then return downtown after dark.",
    "The River Walk is also a strong trip-planning spine. Pair it with The Alamo for an easy first half-day, extend north toward Pearl for food and culture, or head south toward San Antonio Missions National Historical Park for a history-heavy day. TexasDefined's Bexar County guide adds the wider geography: the river is not just a visitor attraction but the waterway around which San Antonio's mission system, civic center and later public spaces developed.",
  ],
  managingAuthority: "City of San Antonio / San Antonio River Authority",
  officialUrl: "https://www.thesanantonioriverwalk.com/plan-your-trip/faqs/",
  sourceCheckedAt: "2026-08-17",
  county: "Bexar",
  directions:
    "The River Walk has many access points and no single street address. For a first downtown visit, enter near Alamo Plaza, Commerce Street, Market Street or the Shops at Rivercenter; the official visitor FAQ suggests 849 E. Commerce Street for GPS. Downtown is highly walkable, and transit or rideshare can avoid parking during busy events.",
  accessibilityNotes:
    "Accessible routes vary by section because the downtown River Walk changes elevation between street and river level. The official River Walk map collection includes a River Bend Accessibility Map and a North Path/Museum Reach Accessibility Map showing ramps and elevator access; review the current map for the section you plan to visit.",
  featured: true,
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The_San_Antontio_Riverwalk_at_night.jpg?width=1600",
    alt: "San Antonio River Walk at night with illuminated riverside buildings, paths and reflections on the water",
    width: 1600,
    height: 1067,
    credit: "Yinan Chen · Public domain · Wikimedia Commons",
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
  {
    id: "top-attraction-san-antonio-river-walk",
    brandId: "texasdefined",
    slug: "san-antonio-river-walk",
    name: "San Antonio River Walk",
    category: "lakes-rivers",
    region: "south-texas",
    coordinates: { lat: 29.4241, lng: -98.4881 },
    ...sanAntonioRiverWalkContent,
  },
];

const curated: Record<string, Partial<Destination>> = {
  "the-alamo": theAlamoContent,
  "san-antonio-river-walk": sanAntonioRiverWalkContent,
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
