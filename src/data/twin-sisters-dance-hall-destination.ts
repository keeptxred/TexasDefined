import { DESTINATION_PHOTO_PLACEHOLDER } from "./destination-hero-placeholder";
import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-24";

export const twinSistersDanceHallDestinations: Destination[] = [
  {
    id: "historic-twin-sisters-dance-hall-blanco",
    brandId: "texasdefined",
    slug: "twin-sisters-dance-hall-blanco",
    name: "Twin Sisters Dance Hall",
    summary:
      "Twin Sisters Dance Hall south of Blanco is a volunteer-run nineteenth-century Texas dance hall that still hosts public first-Saturday dances, live country music, community fundraisers, private events and preservation programs in one of Blanco County's oldest continuously used gathering places.",
    category: "historic-sites",
    region: "hill-country",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["texas-hill-country"],
      gatewaySubregionIds: ["austin-area", "san-antonio-area"],
      countySlugs: ["blanco"],
      travelRegionIds: ["hill-country"],
      relocationPresentationLabels: ["San Antonio & Hill Country", "Austin & Central Texas"],
    },
    nearestTown: "Blanco",
    county: "Blanco",
    coordinates: { lat: 29.9953, lng: -98.4107 },
    hero: {
      src: DESTINATION_PHOTO_PLACEHOLDER,
      alt: "Twin Sisters Dance Hall south of Blanco — exact-location hero pending governed image clearance",
      width: 1600,
      height: 1067,
    },
    bestSeason:
      "Year-round for scheduled dances and special events. Spring and fall are most comfortable for arriving early, spending time outdoors and combining the hall with Blanco or Hill Country side trips.",
    entryNote:
      "Twin Sisters is an event-driven historic hall rather than a daily-hours attraction. The hall currently advertises a public dance on the first Saturday of each month, with event-specific doors, ticket prices, reserved tables and special programming published through its live calendar and Ticket Tailor. Check the current event listing before making the drive because dates, bands and admission vary.",
    highlights: [
      "Historic nineteenth-century Texas dance hall",
      "Public dance tradition on the first Saturday of each month",
      "Live country and Texas dance-hall music",
      "Volunteer-run nonprofit preservation model",
      "Large wooden dance floor and traditional communal hall layout",
      "Private-event and wedding rentals",
      "Raise the Roof preservation fundraiser and other special events",
      "Featured in the 2026 PBS/KLRN Texas Dance Halls series",
    ],
    body: [
      "Twin Sisters Dance Hall is one of Blanco County's clearest examples of living heritage: the building is preserved not as a static museum but as a place where people still gather for music, dancing, family events and community fundraisers. The hall stands on U.S. 281 south of Blanco near the Little Blanco River and the historic Twin Sisters community.",
      "The hall's exact founding date is described differently across historical sources, but the current hall and Texas Dance Hall Preservation consistently place its origin in the nineteenth century and the German-settlement era of the 1870s. Texas Dance Hall Preservation traces the hall to German immigrant Max Krueger and describes the site as part of a wider Hill Country dance-hall tradition that also includes places such as Kendalia and Luckenbach.",
      "The building itself carries much of the experience. Historical descriptions note the weathered pressed-metal exterior, rows of windows for ventilation and light, long communal tables and a wooden dance floor that has supported generations of social dancing. The nonprofit organization that operates the hall has continued to invest in roof, window, electrical and other preservation work rather than replacing the historic structure with a modern venue.",
      "The most useful way for a first-time visitor to experience Twin Sisters is through a scheduled public dance. The hall's current calendar says public dances continue on the first Saturday of each month, while its live ticket page lists individual bands, times, child pricing, reserved-table options and special-event details. A typical current listing runs from roughly 8 p.m. to midnight, but travelers should rely on the specific event page rather than assuming every month uses identical hours or prices.",
      "Food and beverage rules are part of trip planning. The hall's current website says it sells beer, wine, wine coolers, champagne, soft drinks, water and snacks, and it regularly references Old 300 BBQ at events. The hall also publishes restrictions on outside coolers and outside beverages, so visitors should read the current event rules before arriving rather than relying on practices from other Texas dance halls.",
      "Twin Sisters remains a community institution as much as a music venue. The hall rents for weddings, parties and private gatherings, hosts charitable and educational functions, and uses major fundraisers to support preservation. Texas Dance Hall Preservation included Twin Sisters among its recent preservation-grant recipients, reinforcing the fact that keeping the hall active requires continuing maintenance rather than only historical recognition.",
      "The hall also gained renewed statewide visibility in 2026 when PBS/KLRN's Texas Dance Halls series devoted part of its first episode to Twin Sisters and the Devil's Backbone. That current media attention makes the venue especially useful for travelers who want to connect Texas music history with a place where the tradition is still practiced.",
      "For a broader Blanco County trip, the hall pairs naturally with downtown Blanco, the Old Blanco County Courthouse, Blanco State Park, Real Ale Brewing Company and the Buggy Barn Museum. Because Twin Sisters is south of town and event-based, it works best as the evening anchor after a daytime Blanco itinerary rather than as an unplanned roadside stop.",
    ],
    managingAuthority: "Twin Sisters Hall Club, Inc.",
    officialUrl: "https://www.twinsistersdancehall.com/",
    reservationUrl: "https://www.tickettailor.com/events/twinsistersdancehall",
    address: "6720 US-281, Blanco, TX 78606",
    directions:
      "The hall is on the east side of U.S. 281 roughly 6 to 7 miles south of downtown Blanco, just north of the Little Blanco River/FM 473 area. Use the published street address and the hall's directions because the organization has warned that some onboard navigation can be inaccurate.",
    accessibilityNotes:
      "Twin Sisters is a historic nineteenth-century hall with event-specific layouts. Current public materials do not provide a comprehensive accessibility inventory for every route, seating area or event setup, so contact the hall before travel if a visit depends on a specific mobility or seating accommodation.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Use Twin Sisters as the evening music anchor for a Blanco day: spend daylight hours around the courthouse, river or museums, then drive south only when a public dance or special event is confirmed.",
      nearbyAttractions: [
        {
          name: "Blanco",
          description:
            "The town guide connects the hall with the historic square, river, food, lodging and other Blanco attractions.",
          proximity: "About 6–7 miles north",
          href: "/destination/blanco",
        },
        {
          name: "Old Blanco County Courthouse",
          description:
            "Blanco's 1886 former county courthouse provides the strongest civic-history stop before an evening dance.",
          proximity: "Downtown Blanco",
          href: "/destination/old-blanco-county-courthouse",
        },
        {
          name: "Buggy Barn Museum",
          description:
            "A large horse-drawn transportation collection and Old West film-set complex north of downtown Blanco.",
          proximity: "North Blanco",
          href: "/destination/buggy-barn-museum-blanco",
        },
      ],
      foodAndDrink: [
        {
          name: "Twin Sisters event concessions",
          description:
            "The hall currently advertises beer, wine and other beverages, snacks and event-specific food service; check the event listing for that night's setup.",
          proximity: "Onsite",
          href: "https://www.twinsistersdancehall.com/",
        },
        {
          name: "Real Ale Brewing Company",
          description:
            "A working Blanco brewery and distillery with taproom service, free Friday tours and food north of town.",
          proximity: "Blanco",
          href: "/destination/real-ale-brewing-company-blanco",
        },
      ],
      lodging: [
        {
          name: "Blanco",
          description:
            "Staying in Blanco keeps the hall, courthouse square and river within one short driving corridor.",
          proximity: "North",
          href: "/destination/blanco",
        },
        {
          name: "Johnson City and Blanco County",
          description:
            "Johnson City adds a larger museum and dining cluster for travelers building a full county weekend.",
          proximity: "Farther north",
          href: "/county/blanco",
        },
      ],
      neighborhoods: [
        {
          name: "Twin Sisters / Little Blanco River corridor",
          description:
            "A rural historic community area south of Blanco centered on U.S. 281, FM 473, the Little Blanco River and surviving nineteenth-century community sites.",
          proximity: "Local",
        },
      ],
      familyStops: [
        {
          name: "Buggy Barn Museum",
          description:
            "A more daytime-oriented family stop with historic vehicles and the Pine Moore Old West setting.",
          proximity: "Blanco",
          href: "/destination/buggy-barn-museum-blanco",
        },
        {
          name: "Blanco State Park",
          description:
            "An in-town river park for swimming, fishing and picnicking when current conditions allow.",
          proximity: "Blanco",
          href: "/destination/blanco-state-park",
        },
      ],
      sideTrips: [
        {
          name: "Blanco County",
          description:
            "Use the county guide to connect Twin Sisters with Blanco, Johnson City, Hye and the Pedernales corridor.",
          proximity: "Countywide",
          href: "/county/blanco",
        },
        {
          name: "Johnson City",
          description:
            "Add LBJ history, museums and the county-seat cluster north of Blanco.",
          proximity: "North on U.S. 281",
          href: "/destination/johnson-city",
        },
        {
          name: "Hye",
          description:
            "Continue northwest into the wine-and-bourbon side of Blanco County.",
          proximity: "Northwest",
          href: "/destination/hye",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Twin Sisters is not merely a historic building: it preserves the social function that made Texas dance halls important by continuing to host public dances, family gatherings and preservation fundraisers in the original rural Hill Country setting.",
      assessment: {
        recommendedVisit:
          "Plan an entire evening around a scheduled public dance; add 30 to 60 minutes before the event for arrival, parking and settling in rather than treating the hall as a quick stop.",
        physicalEffort: "Low",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Moderate",
        familyFit:
          "Current public dances and special events commonly publish child admission, but music volume, late hours and event-specific rules matter; check the exact listing before bringing younger children.",
        firstTimeValue:
          "High for travelers seeking a still-operating historic Texas dance hall rather than a preserved building with no public music program.",
      },
      itineraries: [
        {
          label: "First public dance",
          duration: "Evening",
          steps: [
            "Confirm the live event, band, doors and ticket rules on the hall's current calendar.",
            "Arrive before the music starts so parking and seating do not consume the first part of the dance.",
            "Treat the hall as the evening destination rather than stacking another late-night stop afterward.",
          ],
        },
        {
          label: "Blanco history-and-dance day",
          duration: "Full day",
          steps: [
            "Start at the Old Blanco County Courthouse and historic square.",
            "Use the afternoon for Blanco State Park or the Buggy Barn Museum.",
            "Have dinner or an early meal before driving south for the scheduled Twin Sisters dance.",
          ],
        },
        {
          label: "Blanco County heritage weekend",
          duration: "1–2 nights",
          steps: [
            "Give Blanco a daytime block for its courthouse, river and local attractions.",
            "Use Twin Sisters for the scheduled evening music experience.",
            "Spend the next day in Johnson City, Hye or LBJ country rather than repeating the same corridor.",
          ],
        },
      ],
      sources: [
        {
          label: "Twin Sisters Dance Hall — Official site",
          url: "https://www.twinsistersdancehall.com/",
          scope:
            "Current first-Saturday tradition, nonprofit status, beverage and outside-item policies, special events and preservation activity.",
        },
        {
          label: "Twin Sisters Dance Hall — Contact",
          url: "https://www.twinsistersdancehall.com/contact/",
          scope:
            "Current address, phone number, rental contact and location south of Blanco.",
        },
        {
          label: "Twin Sisters Dance Hall — Ticket Tailor",
          url: "https://www.tickettailor.com/events/twinsistersdancehall",
          scope:
            "Current 2026 public-dance schedule, event times, ticketing and reserved-table availability.",
        },
        {
          label: "Texas Dance Hall Preservation — Twin Sisters history",
          url: "https://texasdancehall.org/the-twin-sisters-dance-hall-by-patrick-cox-ph-d/",
          scope:
            "Historical context, German-settlement origins, building features, community role and nonprofit stewardship.",
        },
        {
          label: "PBS — Texas Dance Halls Episode 1",
          url: "https://www.pbs.org/video/episode-1-twin-sisters-and-devils-backbone-ftoqrl/",
          scope:
            "2026 documentary coverage confirming Twin Sisters as an active Texas dance-hall heritage site.",
        },
      ],
    },
    featured: true,
  },
];
