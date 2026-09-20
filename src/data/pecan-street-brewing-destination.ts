import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-20";

export const pecanStreetBrewingDestinations: Destination[] = [
  {
    id: "brewery-pecan-street-johnson-city",
    brandId: "texasdefined",
    slug: "pecan-street-brewing-johnson-city",
    name: "Pecan Street Brewing",
    summary:
      "Pecan Street Brewing is a family-owned Johnson City brewpub on the historic square, brewing beer onsite since 2011 and pairing its taproom with Southern-inspired food, live music, a biergarten, private-event spaces and recurring community events.",
    category: "food-bbq",
    region: "hill-country",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["texas-hill-country"],
      gatewaySubregionIds: ["austin-area"],
      countySlugs: ["blanco"],
      travelRegionIds: ["hill-country"],
      relocationPresentationLabels: ["San Antonio & Hill Country", "Austin & Central Texas"],
    },
    nearestTown: "Johnson City",
    county: "Blanco",
    coordinates: { lat: 30.27777, lng: -98.41129 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pecan%20Street%20Brewing%20Johnson%20City%20Texas.jpg?width=1600",
      alt: "Pecan Street Brewing brewpub and restaurant on the historic square in Johnson City, Texas",
      width: 1600,
      height: 900,
      credit: "Larry D. Moore · Wikimedia Commons · CC BY 4.0",
    },
    bestSeason:
      "Year-round; spring and fall are especially comfortable for combining the brewpub with the courthouse square, museums and outdoor Hill Country stops, while summer visits benefit from the indoor dining room and shaded outdoor areas.",
    entryNote:
      "As reviewed September 20, 2026, Pecan Street Brewing publishes daily service with shorter Wednesday hours and later Friday-Saturday hours. The official site currently lists Wednesday 11 a.m.-3 p.m.; Friday-Saturday 11 a.m.-9 p.m.; and Sunday, Monday, Tuesday and Thursday 11 a.m.-8 p.m. Reservations are available and can be useful on event weekends. Recheck the live site because hours, specials and event schedules can change.",
    highlights: [
      "House-brewed craft beer made onsite",
      "Southern-inspired brewpub food and brick-oven pizza",
      "Historic-square location in Johnson City",
      "Live Texas music and recurring community events",
      "Biergarten, dance hall, game room and private-event spaces",
      "Gears & Beers car and motorcycle show host site",
      "Sunday Lost Sounds of a TX Honky Tonk live-music series",
      "Current beer awards including 2026 competition medals",
    ],
    body: [
      "Pecan Street Brewing is one of Johnson City's most useful anchor stops because it functions as brewery, restaurant, live-music venue and community gathering place in the same historic-square building. The business describes itself as family-owned and says it has served the community since 2011.",
      "The building adds local context. Pecan Street Brewing says the space began as the County Hardware & Supply store, and the modern brewpub keeps that downtown commercial role alive rather than operating as a destination brewery isolated from town. That makes it easy to combine a meal or beer flight with the Blanco County Courthouse, visitor center, museums and seasonal events without getting back in the car.",
      "Beer is brewed onsite, and the current site emphasizes a rotating mix of core and seasonal releases rather than a single flagship-only lineup. The brewery also publishes recent competition results, including 2026 medals for its 12 Degree Czech Pale Lager and Screw Loose Blonde, alongside earlier awards from the Great American Beer Festival and Fredericksburg Craft Beer Competition.",
      "The food program is substantial enough that this is not just a taproom stop. The current menu includes pub snacks, pizza, chicken fried steak, chicken fried chicken, fish and chips, salads, brunch items and the signature Pecan Sweet Chicken. Because menus and prices change, Texas Defined treats the live menu as the source of truth while using the broader style of service for trip planning.",
      "Pecan Street Brewing is also a recurring event venue. The current calendar includes Sunday live music through the Lost Sounds of a TX Honky Tonk series, weekly specials, tasting dinners, workshops and community events. It also hosts the annual Gears & Beers Car and Motorcycle Show, which connects the brewpub directly to Johnson City's Texas Vintage Motorcycle Museum and local enthusiast scene.",
      "For a first visit, the main advantage is flexibility. Families can use it for lunch after Science Mill, adults can make it a brewery stop before or after a U.S. 290 wine-country day, and event visitors can treat it as a downtown base before Jazz Fest, holiday lights or Gears & Beers.",
      "The location also makes Pecan Street Brewing useful in a broader Blanco County route. Johnson City sits at the junction of U.S. 281 and U.S. 290, so the brewpub can serve as the food-and-drink anchor before heading west toward Hye, Garrison Brothers and the wine corridor or south toward Blanco and Real Ale Brewing.",
    ],
    managingAuthority: "Pecan Street Brewing",
    officialUrl: "https://pecanstreetbrewing.com/",
    reservationUrl: "https://pecanstreetbrewing.com/",
    address: "106 E Pecan Dr, Johnson City, TX 78636",
    directions:
      "Pecan Street Brewing sits on Johnson City's historic square, immediately east of the Blanco County Courthouse. Use the official address for navigation; once parked downtown, several Johnson City attractions and event venues are walkable.",
    accessibilityNotes:
      "The brewpub operates in a historic downtown commercial building with multiple dining and event areas. Contact Pecan Street Brewing directly if your visit depends on a specific accessible entrance, seating arrangement or private-event accommodation.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Use Pecan Street Brewing as the food-and-drink anchor for a Johnson City day, then build around downtown museums, the courthouse square, seasonal events or the U.S. 290 corridor.",
      nearbyAttractions: [
        {
          name: "Johnson City",
          description:
            "The town guide connects the brewpub with the courthouse square, Science Mill, LBJ history, wildlife attractions and river access.",
          proximity: "At the historic square",
          href: "/destination/johnson-city",
        },
        {
          name: "Texas Vintage Motorcycle Museum",
          description:
            "More than 100 vintage motorcycles in a restored 1930s Ford dealership make an easy downtown companion stop.",
          proximity: "Walkable downtown",
          href: "/destination/texas-vintage-motorcycle-museum-johnson-city",
        },
        {
          name: "Science Mill",
          description:
            "A hands-on STEM museum in the historic feed-mill complex gives families a substantial indoor attraction before or after a meal.",
          proximity: "Downtown Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
      ],
      foodAndDrink: [
        {
          name: "Pecan Street Brewing",
          description:
            "House-brewed beer, Southern-inspired food, brunch, pizza, cocktails and Texas wine are all available from one downtown stop.",
          proximity: "Onsite",
          href: "https://pecanstreetbrewing.com/food-menu",
        },
        {
          name: "Hye and U.S. 290",
          description:
            "Continue west for Garrison Brothers, wineries and the eastern Hill Country wine corridor.",
          proximity: "West of Johnson City",
          href: "/destination/hye",
        },
      ],
      lodging: [
        {
          name: "Johnson City",
          description:
            "Staying in town keeps the brewpub, museums, events and courthouse square within a compact radius.",
          proximity: "Downtown and nearby",
          href: "/destination/johnson-city",
        },
      ],
      neighborhoods: [
        {
          name: "Historic courthouse square",
          description:
            "Johnson City's walkable civic and commercial center is the brewpub's immediate setting.",
          proximity: "At the brewpub",
          href: "/destination/johnson-city",
        },
      ],
      familyStops: [
        {
          name: "Science Mill",
          description:
            "Pair lunch or brunch with Johnson City's major hands-on STEM attraction.",
          proximity: "Downtown",
          href: "/destination/science-mill-johnson-city",
        },
        {
          name: "Pedernales River Nature Park",
          description:
            "Add swimming, fishing, paddling or picnic time at the LCRA river park just south of downtown.",
          proximity: "About 1 mile",
          href: "/destination/pedernales-river-nature-park-johnson-city",
        },
      ],
      sideTrips: [
        {
          name: "Hye",
          description:
            "Continue west for the historic post office, Garrison Brothers and Hill Country wineries.",
          proximity: "West on U.S. 290",
          href: "/destination/hye",
        },
        {
          name: "Blanco",
          description:
            "Head south for Blanco State Park, the old courthouse square and Real Ale Brewing.",
          proximity: "South on U.S. 281",
          href: "/destination/blanco",
        },
        {
          name: "Blanco County",
          description:
            "Use the county guide to connect Johnson City, Hye, Blanco and the Pedernales corridor.",
          proximity: "Countywide",
          href: "/county/blanco",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Pecan Street Brewing is more than a brewery stop: it is a long-running downtown gathering place that ties Johnson City's historic square, food scene, live music and signature events together in one walkable location.",
      assessment: {
        recommendedVisit:
          "Plan 1.5 to 2.5 hours for a meal and beer tasting; allow longer on live-music nights or when the brewpub is hosting a major community event.",
        physicalEffort: "Low",
        weatherExposure: "Mostly indoors",
        planningLevel: "Low",
        familyFit:
          "Strong for mixed-age groups because it operates as a full-service restaurant as well as a brewery, with a broad food menu and family-oriented daytime use.",
        firstTimeValue:
          "High for Johnson City visitors because it combines local beer, food, town history and event activity directly on the historic square.",
      },
      itineraries: [
        {
          label: "Downtown lunch stop",
          duration: "1.5–2 hours",
          steps: [
            "Park near the Johnson City square and walk the courthouse area before the meal.",
            "Use the current tap list and menu rather than assuming a specific beer or seasonal dish is available.",
            "Continue on foot to the motorcycle museum or Science Mill.",
          ],
        },
        {
          label: "Johnson City family half day",
          duration: "4–5 hours",
          steps: [
            "Start with Science Mill or the LBJ Johnson City district.",
            "Use Pecan Street Brewing for lunch or an early dinner.",
            "Add the courthouse square, motorcycle museum or river park based on weather and interests.",
          ],
        },
        {
          label: "Hill Country food-and-drink day",
          duration: "Full day",
          steps: [
            "Begin in Johnson City with brunch or lunch at Pecan Street Brewing.",
            "Continue west on U.S. 290 toward Hye for Garrison Brothers or wineries.",
            "Return to Johnson City for live music or a signature event when the calendar supports it.",
          ],
        },
      ],
      sources: [
        {
          label: "Pecan Street Brewing — official site",
          url: "https://pecanstreetbrewing.com/",
          scope:
            "Current brewpub identity, onsite brewing, event spaces, recurring programming, location and service hours.",
        },
        {
          label: "Pecan Street Brewing — About",
          url: "https://pecanstreetbrewing.com/about",
          scope:
            "Family-owned history, County Hardware & Supply building context, food-and-drink model and current published hours.",
        },
        {
          label: "Pecan Street Brewing — Food Menu",
          url: "https://pecanstreetbrewing.com/food-menu",
          scope:
            "Current menu structure, brunch, pub dishes and service offerings.",
        },
        {
          label: "Pecan Street Brewing — Events",
          url: "https://pecanstreetbrewing.com/events",
          scope:
            "Current recurring live music, community events and Gears & Beers venue confirmation.",
        },
        {
          label: "Wikimedia Commons — Pecan Street Brewing Johnson City Texas",
          url: "https://commons.wikimedia.org/wiki/File:Pecan_Street_Brewing_Johnson_City_Texas.jpg",
          scope:
            "Exact-location visitor image by Larry D. Moore licensed CC BY 4.0.",
        },
      ],
    },
    featured: true,
  },
];
