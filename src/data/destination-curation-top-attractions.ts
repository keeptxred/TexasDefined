import type { Destination, DestinationAreaGuide } from "./types";

/**
 * TexasDefined's Top 25 Texas Attractions collection is being curated one
 * destination at a time. Entries here are also checked-in destination fallbacks
 * so their guides and Trip Planner stops do not depend on the remote Explore
 * catalog being available.
 *
 * Every Top 25 attraction must include a complete area guide. The type below
 * intentionally makes that field mandatory for this collection even though it
 * remains optional for the broader destination catalog.
 */
type TopAttractionContent = Omit<
  Destination,
  "id" | "brandId" | "slug" | "name" | "category" | "region" | "coordinates" | "areaGuide"
> & { areaGuide: DestinationAreaGuide };

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
  areaGuide: {
    intro:
      "The Alamo sits in one of Texas's densest visitor districts, so a good itinerary should use the landmark as an anchor rather than a stand-alone stop. Most downtown additions are walkable; Pearl, Brackenridge Park and the mission corridor are better treated as short rides or longer trail extensions.",
    nearbyAttractions: [
      {
        name: "San Antonio River Walk",
        proximity: "2–5 minute walk",
        description: "Drop from Alamo Plaza to the downtown river level for bridges, river cruises, restaurants and an easy walking route through the center of the city.",
        href: "/destination/san-antonio-river-walk",
      },
      {
        name: "La Villita Historic Arts Village",
        proximity: "About a 10-minute walk",
        description: "A compact historic village beside the river with galleries, shops, courtyards and one of the easiest ways to extend an Alamo visit without getting back in the car.",
      },
      {
        name: "Hemisfair",
        proximity: "About a 10–15-minute walk",
        description: "Downtown public parks, play spaces and lawns occupy the former 1968 World's Fair grounds just south of the Alamo and convention-center district.",
      },
      {
        name: "Historic Market Square",
        proximity: "About a 20-minute walk or short ride",
        description: "A colorful downtown market district for Mexican and Texan food, shopping, music and cultural events west of the central River Walk loop.",
      },
    ],
    foodAndDrink: [
      {
        name: "Downtown River Walk",
        proximity: "Steps away",
        description: "The largest concentration of visitor-oriented restaurants is along the downtown river loop. It is convenient before or after the Alamo, especially when walking is the priority.",
      },
      {
        name: "Southtown and South Alamo Street",
        proximity: "About 1–2 miles south",
        description: "A better fit for travelers who want neighborhood restaurants, patios and galleries beyond the busiest downtown tourism blocks.",
      },
      {
        name: "Pearl",
        proximity: "About 2 miles north",
        description: "The former brewery district on Museum Reach combines restaurants, cafes, food-focused shopping and river access in a walkable destination of its own.",
      },
    ],
    lodging: [
      {
        name: "Alamo Plaza and east Downtown",
        proximity: "Closest option",
        description: "Best for travelers who want the Alamo at the front door and easy access to the River Walk, convention center and downtown attractions on foot.",
      },
      {
        name: "Downtown River Walk core",
        proximity: "Roughly 5–10 minutes on foot",
        description: "The broadest concentration of hotels and the most practical base for a car-light first visit to central San Antonio.",
      },
      {
        name: "Pearl and Museum Reach",
        proximity: "About 2 miles north",
        description: "A quieter, dining-focused alternative with direct river access and an easy route back toward downtown along Museum Reach.",
      },
    ],
    neighborhoods: [
      {
        name: "La Villita and Southtown",
        proximity: "Immediately south of Downtown",
        description: "Historic streets, galleries, restaurants and the King William area make this the most natural neighborhood extension from the Alamo and River Walk.",
      },
      {
        name: "Market Square and the near West Side",
        proximity: "West of the downtown core",
        description: "A strong cultural counterpoint to Alamo Plaza, centered on Mexican-American food, markets, festivals and long-running downtown traditions.",
      },
      {
        name: "Pearl and Tobin Hill",
        proximity: "About 2 miles north",
        description: "A former industrial district transformed into a riverfront food, shopping and public-space destination at the northern end of Museum Reach.",
      },
    ],
    familyStops: [
      {
        name: "Yanaguana Garden at Hemisfair",
        proximity: "About a 10–15-minute walk",
        description: "An all-ages public play area with splash, climbing and adaptive play features that works especially well as a break after a history-heavy Alamo visit.",
      },
      {
        name: "The DoSeum",
        proximity: "About 3 miles north",
        description: "A children's museum north of downtown that can turn an Alamo morning into a balanced family day when younger visitors need more hands-on activity.",
      },
      {
        name: "Witte Museum and Brackenridge Park",
        proximity: "About 3–4 miles north",
        description: "Natural history, Texas exhibits and a major city park create an easy half-day family extension beyond the downtown core.",
      },
    ],
    sideTrips: [
      {
        name: "San Antonio Missions National Historical Park",
        proximity: "Roughly 3–9 miles south",
        description: "Continue the mission story at Concepción, San José, San Juan and Espada. The Mission Reach trail follows the river and connects the mission corridor with downtown.",
        href: "/destination/san-antonio-missions-national-historical-park",
      },
      {
        name: "Brackenridge Park and Japanese Tea Garden",
        proximity: "About 3 miles north",
        description: "A green-space and garden detour that pairs well with the Witte Museum or a break from downtown pavement and crowds.",
      },
      {
        name: "Natural Bridge Caverns",
        proximity: "About 30 miles north",
        description: "A larger half-day excursion for travelers who want to add an underground Hill Country experience to a San Antonio weekend.",
      },
    ],
  },
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
  areaGuide: {
    intro:
      "Because the River Walk passes through several distinct parts of San Antonio, the best nearby choices depend on which reach you are using. Downtown favors landmark-hopping on foot, Museum Reach favors museums and Pearl, and Mission Reach is the gateway to the city's Spanish colonial mission corridor.",
    nearbyAttractions: [
      {
        name: "The Alamo",
        proximity: "About a 5-minute walk from the downtown loop",
        description: "The city's signature historic landmark is close enough to combine with the River Walk in the same morning or afternoon without moving the car.",
        href: "/destination/the-alamo",
      },
      {
        name: "La Villita Historic Arts Village",
        proximity: "Directly beside the downtown River Walk",
        description: "Historic buildings, galleries, shops and small courtyards create one of the easiest above-river detours from the central loop.",
      },
      {
        name: "San Antonio Museum of Art",
        proximity: "On Museum Reach",
        description: "A major art museum housed in the former Lone Star Brewery complex, directly accessible from the northern river trail.",
      },
      {
        name: "Hemisfair",
        proximity: "A short walk from the downtown loop",
        description: "Public parks and play spaces around the former World's Fair grounds add green space and family-friendly downtime near the convention-center end of the river.",
      },
    ],
    foodAndDrink: [
      {
        name: "Downtown River Walk",
        proximity: "On the river",
        description: "The central loop has the greatest concentration of riverside restaurants and patios and is the simplest choice when convenience matters most.",
      },
      {
        name: "Pearl",
        proximity: "On Museum Reach, about 2 miles north of Downtown",
        description: "One of San Antonio's strongest food districts, with restaurants, cafes, markets and culinary businesses concentrated around the former brewery complex.",
      },
      {
        name: "Southtown and King William",
        proximity: "Just south of the downtown loop",
        description: "Neighborhood restaurants, bars, cafes and galleries make this a good alternative to the most tourist-heavy blocks along the central river.",
      },
    ],
    lodging: [
      {
        name: "Downtown River Walk core",
        proximity: "Direct access",
        description: "The most convenient base for first-time visitors who want to walk to the Alamo, river cruises, downtown dining and major central attractions.",
      },
      {
        name: "Alamo Plaza and east Downtown",
        proximity: "About 5–10 minutes on foot",
        description: "A practical alternative for travelers prioritizing The Alamo, Hemisfair and the eastern side of the downtown loop.",
      },
      {
        name: "Pearl and Museum Reach",
        proximity: "About 2 miles north",
        description: "Best for travelers who want a quieter riverfront base with destination dining and direct access to the northern walking trail.",
      },
    ],
    neighborhoods: [
      {
        name: "Downtown and La Villita",
        proximity: "Central River Walk",
        description: "The historic visitor core combines the river, Alamo Plaza, Main Plaza, theaters, civic landmarks and La Villita within a compact walking area.",
      },
      {
        name: "Southtown and King William",
        proximity: "South of Downtown",
        description: "Historic homes, galleries, local restaurants and neighborhood streets create a more residential counterpoint to the downtown river loop.",
      },
      {
        name: "Pearl and Tobin Hill",
        proximity: "North along Museum Reach",
        description: "Historic industrial architecture, public spaces, food and shopping make the northern river extension feel like a separate destination rather than merely a trail continuation.",
      },
    ],
    familyStops: [
      {
        name: "Yanaguana Garden at Hemisfair",
        proximity: "Short walk from the downtown River Walk",
        description: "A free public play area with splash, climbing and adaptive play features that gives families an easy break from sightseeing.",
      },
      {
        name: "The DoSeum",
        proximity: "About 3 miles north of Downtown",
        description: "A hands-on children's museum that pairs well with Museum Reach, Pearl or a north-side family itinerary.",
      },
      {
        name: "Witte Museum and Brackenridge Park",
        proximity: "About 3–4 miles north",
        description: "A strong family combination of Texas natural history, science exhibits and outdoor park space beyond the river corridor.",
      },
    ],
    sideTrips: [
      {
        name: "San Antonio Missions National Historical Park",
        proximity: "Mission Reach, roughly 3–9 miles south of Downtown",
        description: "The river trail links toward Concepción, San José, San Juan and Espada, letting travelers turn the River Walk into a much deeper history-and-outdoors itinerary.",
        href: "/destination/san-antonio-missions-national-historical-park",
      },
      {
        name: "Historic Market Square",
        proximity: "About 1 mile west of the downtown loop",
        description: "A three-block Mexican market district with food, shopping and festivals that is close enough for the same day but distinct from the riverfront experience.",
      },
      {
        name: "Brackenridge Park and Japanese Tea Garden",
        proximity: "About 3 miles north",
        description: "A worthwhile green-space extension that works naturally with the Witte Museum or a longer north-side outing beyond Museum Reach.",
      },
    ],
  },
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
