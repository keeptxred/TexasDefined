import { DESTINATION_PHOTO_PLACEHOLDER } from "./destination-hero-placeholder";
import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-19";

/**
 * Canonical TexasDefined destination for the Texas Vintage Motorcycle Museum
 * in downtown Johnson City. Mutable hours and admission stay behind the
 * first-party source because the museum's current pages do not agree on the
 * exact daily schedule.
 */
export const texasVintageMotorcycleMuseumDestinations: Destination[] = [
  {
    id: "museum-texas-vintage-motorcycle-johnson-city",
    brandId: "texasdefined",
    slug: "texas-vintage-motorcycle-museum-johnson-city",
    name: "Texas Vintage Motorcycle Museum",
    summary:
      "Texas Vintage Motorcycle Museum in downtown Johnson City turns a preserved 1930s Ford dealership into a highly personal collection of vintage motorcycles, memorabilia and motorcycle art, with the core collection focused on machines from the 1950s, 1960s and 1970s.",
    category: "historic-sites",
    region: "hill-country",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["texas-hill-country"],
      countySlugs: ["blanco"],
      travelRegionIds: ["hill-country"],
      relocationPresentationLabels: ["San Antonio & Hill Country", "Austin & Central Texas"],
    },
    nearestTown: "Johnson City",
    county: "Blanco",
    coordinates: { lat: 30.2769221, lng: -98.4117388 },
    hero: {
      src: DESTINATION_PHOTO_PLACEHOLDER,
      alt: "Texas Vintage Motorcycle Museum in Johnson City — exact-location hero pending governed image clearance",
      width: 1600,
      height: 1067,
    },
    bestSeason:
      "Year-round. The museum is primarily indoors, making it a useful Hill Country stop during summer heat, rain or a mixed indoor-and-outdoor Johnson City itinerary.",
    entryNote:
      "The museum generally operates Thursday through Sunday, with special holiday-Monday hours published by the operator. The museum's current official pages do not agree on the exact opening and closing times, so verify the live schedule and current admission on the official site before making a dedicated drive.",
    highlights: [
      "More than 100 vintage motorcycles in the current museum showroom",
      "Strong focus on motorcycles from the 1950s, 1960s and 1970s",
      "Rare American, British, European and Japanese machines",
      "Motorcycle art, memorabilia and period display material",
      "Restored 1930s Ford dealership building near the Johnson City square",
      "Walkable pairing with Johnson City history, food, shops and the LBJ district",
    ],
    body: [
      "Texas Vintage Motorcycle Museum is one of the Hill Country's most distinctive small museums because the collection is personal rather than institutional. Owner Gordon Massie spent decades riding, collecting and restoring motorcycles before moving from the Houston area to Johnson City in 2021. He purchased a historic commercial building near the town square and opened the collection to the public in 2022.",
      "The motorcycles are the main event. The museum's current venue material describes a showroom with more than 100 vintage motorcycles, while the museum's core story emphasizes machines from the 1950s, 1960s and 1970s. That era captures a major transition in motorcycle design, engineering and culture: traditional American and British marques share the timeline with BMW and other European makers as Japanese manufacturers reshaped the market.",
      "The building adds another layer to the visit. The museum occupies a preserved 1930s Ford dealership, and the current venue description calls out original flooring, showroom windows, ceiling tiles and a vintage hydraulic lift. That means the setting contributes to the transportation-history story rather than serving as a neutral warehouse.",
      "This is also a good museum for visitors who are curious about motorcycles without being riders. The displays emphasize individual machines and their histories, and the collection's mix of engineering, industrial design, racing culture and period memorabilia gives non-riders multiple ways into the subject. Motorcycle enthusiasts can easily spend longer comparing marques and mechanical details.",
      "Location is a major advantage. The museum sits at 100 N. Nugent Avenue just off the Johnson City square, within the same compact visitor area as restaurants, shops, the Blanco County Courthouse and other downtown stops. The Johnson City district of Lyndon B. Johnson National Historical Park is also close enough to make presidential history and motorcycle history part of one walkable or short-drive itinerary.",
      "For a broader Hill Country trip, the museum works especially well as an indoor anchor between outdoor or driving-heavy stops. Pedernales Falls State Park, the U.S. 290 wine corridor, Stonewall and Fredericksburg can all fit into a larger route, while Johnson City's Science Mill gives families another substantial indoor attraction in town.",
      "Because the museum is privately operated, treat current hours, admission and special-event access as live information rather than permanent facts. The operator's own pages currently show conflicting exact hours even though they agree on the Thursday-through-Sunday pattern, so checking the official site before departure is the safest planning choice.",
    ],
    managingAuthority: "Texas Vintage Motorcycle Museum",
    officialUrl: "https://www.texasvintagemotorcyclemuseum.com/",
    address: "100 N Nugent Ave, Johnson City, TX 78636",
    directions:
      "The museum is at the corner of Nugent Avenue and Main Street in downtown Johnson City, one block from the Blanco County Courthouse and close to the town visitor center. Use the official street address for navigation.",
    accessibilityNotes:
      "The museum's current venue information describes street-level access and a wheelchair-accessible facility. Confirm any specific mobility, seating or restroom accommodation directly with the museum before travel.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Use the motorcycle museum as an indoor downtown anchor, then connect it with Johnson City's presidential history, science attractions and the wider Blanco County Hill Country landscape.",
      nearbyAttractions: [
        {
          name: "Lyndon B. Johnson National Historical Park — Johnson City District",
          description:
            "The visitor center, Johnson Settlement and LBJ Boyhood Home add nationally significant history within the same small-town itinerary.",
          proximity: "Johnson City",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
        {
          name: "Science Mill",
          description:
            "A hands-on science museum in a historic mill building that gives families a second strong indoor attraction in Johnson City.",
          proximity: "Downtown Johnson City",
        },
        {
          name: "Blanco County Courthouse and town square",
          description:
            "Historic civic architecture, local shops and downtown businesses sit within easy walking distance of the museum.",
          proximity: "Downtown Johnson City",
          href: "/county/blanco",
        },
      ],
      foodAndDrink: [
        {
          name: "Downtown Johnson City",
          description:
            "Restaurants, cafes, tasting rooms and casual food options cluster around Main Street and the courthouse square.",
          proximity: "Walkable from the museum",
          href: "/county/blanco",
        },
      ],
      lodging: [
        {
          name: "Johnson City and the U.S. 290 corridor",
          description:
            "Local inns, guesthouses and Hill Country stays work well for travelers combining Johnson City with Stonewall, wineries and Fredericksburg.",
          proximity: "Johnson City / U.S. 290",
          href: "/county/blanco",
        },
      ],
      neighborhoods: [
        {
          name: "Johnson City historic core",
          description:
            "The compact downtown around Main Street, Nugent Avenue and the courthouse is the easiest base for combining the museum with local history and food.",
          proximity: "At the museum",
          href: "/county/blanco",
        },
      ],
      familyStops: [
        {
          name: "Science Mill",
          description:
            "Interactive STEM exhibits make it the strongest family companion stop to the motorcycle museum in Johnson City.",
          proximity: "Downtown Johnson City",
        },
        {
          name: "LBJ National Historical Park",
          description:
            "Free national-park history, outdoor walking and preserved historic buildings add a different kind of learning stop.",
          proximity: "Johnson City",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
      ],
      sideTrips: [
        {
          name: "Blanco County",
          description:
            "Extend the day south to Blanco or west along the Pedernales corridor for a broader county itinerary.",
          proximity: "Countywide",
          href: "/county/blanco",
        },
        {
          name: "Texas Hill Country",
          description:
            "Use Johnson City as a central point for Pedernales Falls, Stonewall, Fredericksburg and other Hill Country stops.",
          proximity: "Regional",
          href: "/explore/region/hill-country",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "The museum preserves both motorcycle history and a distinctive layer of Johnson City's transportation-era architecture, giving the Hill Country a focused, privately assembled collection that complements the region's larger presidential, ranching and natural-history attractions.",
      assessment: {
        recommendedVisit:
          "Plan about 1 to 2 hours for a first visit; serious motorcycle enthusiasts may want longer, while a broader Johnson City day can pair the museum with the LBJ district and Science Mill.",
        physicalEffort: "Low",
        weatherExposure: "Mostly indoors",
        planningLevel: "Low",
        familyFit:
          "Good for families with an interest in machines, design or transportation history; the operator currently lists free admission for children age 5 and under, but verify current pricing before arrival.",
        firstTimeValue:
          "High for motorcycle enthusiasts and strong for Hill Country travelers who want an unusual indoor museum within a walkable small-town itinerary.",
      },
      itineraries: [
        {
          label: "Museum-focused stop",
          duration: "1–2 hours",
          steps: [
            "Verify the current Thursday-through-Sunday operating schedule before departure.",
            "Walk the showroom chronologically and compare how motorcycle design changed across the 1950s, 1960s and 1970s.",
            "Leave time for memorabilia, motorcycle art and the historic dealership details rather than only photographing the bikes.",
          ],
        },
        {
          label: "Downtown Johnson City half day",
          duration: "4–5 hours",
          steps: [
            "Start at the Texas Vintage Motorcycle Museum while downtown is quiet.",
            "Walk the courthouse-square area for lunch, shops and local history.",
            "Finish with either the Science Mill or the Johnson City district of Lyndon B. Johnson National Historical Park.",
          ],
        },
        {
          label: "Hill Country history day",
          duration: "Full day",
          steps: [
            "Use the motorcycle museum as the morning indoor anchor.",
            "Explore the LBJ visitor center, Boyhood Home or Johnson Settlement.",
            "Continue west on U.S. 290 toward Stonewall or build an outdoor block around Pedernales Falls based on weather and reservations.",
          ],
        },
      ],
      sources: [
        {
          label: "Texas Vintage Motorcycle Museum — official site",
          url: "https://www.texasvintagemotorcyclemuseum.com/",
          scope:
            "Current address, general operating pattern, admission, collection era and visitor information.",
        },
        {
          label: "Texas Vintage Motorcycle Museum — About",
          url: "https://www.texasvintagemotorcyclemuseum.com/about",
          scope:
            "Owner Gordon Massie's background, move to Johnson City and development of the collection.",
        },
        {
          label: "Texas Vintage Event Venue",
          url: "https://www.texasvintagemotorcyclemuseum.com/event-venue",
          scope:
            "Historic Ford-dealership building, current showroom size, motorcycle count and accessibility context.",
        },
        {
          label: "Explore Johnson City — Texas Vintage Motorcycle Museum",
          url: "https://explorejctx.com/attractions/texas-vintage-motorcycle-museum/",
          scope:
            "Current local visitor context, downtown location and attraction overview.",
        },
      ],
    },
    featured: false,
  },
];
