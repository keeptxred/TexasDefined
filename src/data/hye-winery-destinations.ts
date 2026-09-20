import { DESTINATION_PHOTO_PLACEHOLDER } from "./destination-hero-placeholder";
import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-20";

export const hyeWineryDestinations: Destination[] = [
  {
    id: "winery-william-chris-hye",
    brandId: "texasdefined",
    slug: "william-chris-vineyards-hye",
    name: "William Chris Vineyards",
    summary:
      "William Chris Vineyards in Hye is one of Texas wine country's most influential estate tasting destinations, founded in 2008 by Bill Blackmon and Chris Brundrett around a Texas-grown, vineyard-first philosophy and now offering guided tastings, chef-paired experiences, Hye Society member tastings and a nationally recognized Hill Country estate.",
    category: "food-bbq",
    region: "hill-country",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["texas-hill-country"],
      countySlugs: ["blanco"],
      travelRegionIds: ["hill-country"],
      relocationPresentationLabels: ["San Antonio & Hill Country", "Austin & Central Texas"],
    },
    nearestTown: "Hye",
    county: "Blanco",
    coordinates: { lat: 30.2515, lng: -98.5572 },
    hero: {
      src: DESTINATION_PHOTO_PLACEHOLDER,
      alt: "William Chris Vineyards in Hye — exact-location hero pending governed image clearance",
      width: 1600,
      height: 1067,
    },
    bestSeason:
      "Fall through spring for comfortable Hill Country patio weather; spring adds wildflowers and fall brings harvest-season energy, while summer tastings are easiest when built around reserved indoor experiences.",
    entryNote:
      "As reviewed September 20, 2026, William Chris publishes Hye Estate hours of Sunday through Wednesday 11 a.m.–5 p.m. and Thursday through Saturday 10 a.m.–6 p.m. The current Winemaker's Tasting is $30 for about 45 minutes, while the Chef's Table is $95 for about 90 minutes and requires guests to be 21+. Reservations are strongly useful on busy weekends; recheck live availability and pricing before travel.",
    highlights: [
      "Hye Estate founded in 2008 by Bill Blackmon and Chris Brundrett",
      "Winemaker's Tasting with guided Texas-wine education",
      "Chef's Table with seasonal food-and-wine pairings",
      "Estate vineyards plus long-term Texas grower partnerships",
      "Low-intervention, vineyard-first winemaking",
      "2025 World’s Best Vineyards No. 31 recognition",
      "Historic Hye Post Office connection through Rebecca Caroline sparkling wine",
      "Direct position on the U.S. 290 Johnson City–Fredericksburg wine corridor",
    ],
    body: [
      "William Chris Vineyards belongs on a Hye authority map because the winery is both a visitor destination and a major part of modern Texas wine history. Bill Blackmon and Chris Brundrett founded the Hye Estate operation in 2008 around the idea that great wine is grown in the vineyard rather than manufactured in the cellar.",
      "The current winery story reaches much farther than its estate rows. William Chris says it farms its own Hye vineyards while maintaining grower relationships across Texas, using Texas fruit and a low-intervention approach intended to preserve vineyard character. The company also emphasizes open-air fermentation, careful barrel and concrete aging, and a farming-first identity rather than positioning Hye only as a retail tasting room.",
      "For most first-time visitors, the Winemaker's Tasting is the practical entry point. The current experience lasts about 45 minutes, costs $30 per person and is designed for one to six guests. Walk-ins are currently welcomed Monday through Thursday when space allows, but reservations are the safer choice on weekends and during busy Hill Country travel periods.",
      "The Chef's Table is the deeper food-and-wine option. The current 90-minute experience pairs five wines with seasonal house-made food and is offered Wednesday through Sunday at published seating times. It is currently priced at $95 per guest and limited to guests 21 and older.",
      "William Chris also matters to the statewide wine story. Its official history says the partners helped champion 2021 Texas labeling legislation intended to clarify what qualifies as Texas wine, and the winery now highlights membership in the Wine Origins Alliance alongside other internationally recognized wine regions.",
      "Recognition has followed that growth. William Chris says it entered the World's Best Vineyards Top 100 in 2022 and reached No. 31 in 2025, becoming the first Texas winery in that organization's top 50. Texas Defined treats that as a dated recognition from the winery's current official record rather than a permanent ranking claim.",
      "Hye itself has become part of the brand's visitor identity. The first William Chris tasting room opened in an old farmhouse at the Hye Estate in 2010. In 2026, the company opened a Fredericksburg tasting room and gave its Rebecca Caroline traditional-method sparkling project a dedicated home across U.S. 290 in the historic Hye Post Office.",
      "That geography makes a visit easy to combine with other substantial stops. Garrison Brothers Distillery, Hye Meadow Winery, the historic Hye core, the LBJ Ranch district near Stonewall and Johnson City all sit along the same eastern Hill Country travel corridor.",
    ],
    managingAuthority: "William Chris Vineyards",
    officialUrl: "https://williamchriswines.com/",
    reservationUrl: "https://williamchriswines.com/visitwcv/",
    address: "10352 U.S. Highway 290, Hye, TX 78635",
    directions:
      "William Chris Vineyards sits directly on U.S. 290 in Hye between Johnson City and Stonewall. Use the official street address for navigation and allow extra travel time on busy wine-corridor weekends.",
    accessibilityNotes:
      "The estate operates multiple tasting spaces and experiences. Contact the concierge team before booking if your visit depends on a specific mobility, seating, dietary or sensory accommodation; the Chef's Table currently notes vegetarian and gluten-free options on request.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Use William Chris as the wine anchor for Hye, then choose one or two nearby stops rather than trying to stack an entire U.S. 290 tasting corridor into a single afternoon.",
      nearbyAttractions: [
        {
          name: "Hye",
          description:
            "The town guide connects the winery with the historic post office, Garrison Brothers, other Hye wineries and the U.S. 290 corridor.",
          proximity: "In Hye",
          href: "/destination/hye",
        },
        {
          name: "Garrison Brothers Distillery",
          description:
            "A working bourbon ranch with guided grain-to-glass tours, reserve tastings, food and special events.",
          proximity: "A short drive north of U.S. 290",
          href: "/destination/garrison-brothers-distillery-hye",
        },
        {
          name: "Hye Meadow Winery",
          description:
            "A relaxed 42-acre winery with Texas-grown wines, decks, yard games, food and tasting or production-tour options.",
          proximity: "Nearby on U.S. 290",
          href: "/destination/hye-meadow-winery",
        },
      ],
      foodAndDrink: [
        {
          name: "Chef's Table at William Chris",
          description:
            "A reservation-based five-wine seasonal pairing experience for visitors who want food integrated into the tasting.",
          proximity: "Onsite",
          href: "https://williamchriswines.com/visitwcv/",
        },
        {
          name: "Hye and Stonewall wine corridor",
          description:
            "Multiple wineries and tasting rooms continue west and east along U.S. 290.",
          proximity: "Along U.S. 290",
          href: "/destination/hye",
        },
      ],
      lodging: [
        {
          name: "Johnson City and Blanco County",
          description:
            "Stay east for easier access to Johnson City restaurants, museums, Garrison Brothers and Blanco County attractions.",
          proximity: "East",
          href: "/county/blanco",
        },
        {
          name: "Fredericksburg / Stonewall corridor",
          description:
            "Stay west when William Chris is one stop in a broader Fredericksburg wine-country trip.",
          proximity: "West on U.S. 290",
          href: "/destination/fredericksburg-texas-wineries-things-to-do-guide",
        },
      ],
      neighborhoods: [
        {
          name: "Hye Estate / historic Hye",
          description:
            "The winery and historic post-office area form one of the most concentrated visitor clusters in tiny Hye.",
          proximity: "At the winery",
          href: "/destination/hye",
        },
      ],
      familyStops: [
        {
          name: "Lyndon B. Johnson National Historical Park",
          description:
            "Use the Johnson City or ranch district as the all-ages history component of a mixed-interest Hill Country day.",
          proximity: "Johnson City / Stonewall",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
        {
          name: "Science Mill",
          description:
            "Johnson City's hands-on STEM museum gives families a substantial non-wine companion stop.",
          proximity: "Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
      ],
      sideTrips: [
        {
          name: "Johnson City",
          description:
            "Museums, food, LBJ history and the courthouse square make Johnson City the strongest eastern base.",
          proximity: "East on U.S. 290",
          href: "/destination/johnson-city",
        },
        {
          name: "Fredericksburg",
          description:
            "Continue west for the larger winery, lodging, shopping and German-Texan heritage cluster.",
          proximity: "West on U.S. 290",
          href: "/destination/fredericksburg-texas-wineries-things-to-do-guide",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "William Chris ties an internationally recognized modern Texas wine brand directly to a visitable Hye estate, making vineyard philosophy, Texas-grown fruit, tasting education and the U.S. 290 wine corridor part of one experience.",
      assessment: {
        recommendedVisit:
          "Plan 1.5 to 2.5 hours for a standard tasting and unhurried estate time; allow about 3 hours when booking the Chef's Table or pairing the visit with the historic Hye core.",
        physicalEffort: "Low",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Moderate",
        familyFit:
          "The standard estate can work for mixed groups under current house rules, but the wine experience is adult-focused and the Chef's Table is 21+; pair it with Johnson City or LBJ history for families.",
        firstTimeValue:
          "Very high for travelers trying to understand contemporary Texas wine because the Hye estate combines production philosophy, vineyard context and structured tasting education.",
      },
      itineraries: [
        {
          label: "First William Chris visit",
          duration: "1.5–2 hours",
          steps: [
            "Reserve the Winemaker's Tasting for a structured first visit.",
            "Arrive before the reservation so check-in does not compress the tasting.",
            "Leave time after the tasting for estate views and bottle shopping.",
          ],
        },
        {
          label: "Hye wine half day",
          duration: "4–5 hours",
          steps: [
            "Start at William Chris before the U.S. 290 corridor becomes busiest.",
            "Visit the historic Hye core and Rebecca Caroline post-office area.",
            "Add Hye Meadow or one additional nearby winery rather than overbooking the afternoon.",
          ],
        },
        {
          label: "Texas wine and history day",
          duration: "Full day",
          steps: [
            "Use Johnson City or LBJ history for the morning block.",
            "Reserve William Chris for midday or early afternoon.",
            "Continue toward Stonewall or return east for dinner in Johnson City.",
          ],
        },
      ],
      sources: [
        {
          label: "William Chris Vineyards — official site",
          url: "https://williamchriswines.com/",
          scope:
            "Current Hye location, Texas-grown wine philosophy, World’s Best Vineyards recognition, address and hours.",
        },
        {
          label: "William Chris Vineyards — About",
          url: "https://williamchriswines.com/about/",
          scope:
            "2008 founding, 2010 tasting-room opening, 2021 labeling advocacy, vineyard philosophy and 2026 Hye/Fredericksburg milestones.",
        },
        {
          label: "William Chris Vineyards — Visit",
          url: "https://williamchriswines.com/visitwcv/",
          scope:
            "Current Winemaker's Tasting, Chef's Table, reservation, age, pricing and operating-hour details.",
        },
      ],
    },
    featured: true,
  },
  {
    id: "winery-hye-meadow",
    brandId: "texasdefined",
    slug: "hye-meadow-winery",
    name: "Hye Meadow Winery",
    summary:
      "Hye Meadow Winery is a relaxed 42-acre Texas Hill Country winery in Hye with 100% Texas-grape wines, a modern tasting room, three decks, oak-shaded grounds, yard games, family- and dog-friendly spaces, a small kitchen and tasting or production-tour experiences.",
    category: "food-bbq",
    region: "hill-country",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["texas-hill-country"],
      countySlugs: ["blanco"],
      travelRegionIds: ["hill-country"],
      relocationPresentationLabels: ["San Antonio & Hill Country", "Austin & Central Texas"],
    },
    nearestTown: "Hye",
    county: "Blanco",
    coordinates: { lat: 30.2509, lng: -98.5590 },
    hero: {
      src: DESTINATION_PHOTO_PLACEHOLDER,
      alt: "Hye Meadow Winery in Hye — exact-location hero pending governed image clearance",
      width: 1600,
      height: 1067,
    },
    bestSeason:
      "Fall through spring for comfortable deck and meadow time; spring events and mild fall weekends are especially well suited to the outdoor property, while summer visits work best around shaded or indoor tasting periods.",
    entryNote:
      "As reviewed September 20, 2026, Hye Meadow publishes Monday, Wednesday and Thursday hours of noon–5 p.m.; Friday noon–6 p.m.; Saturday 11 a.m.–6 p.m.; Sunday noon–5 p.m.; and Tuesday closed. The official site currently shows a $25 Signature Tasting, a $40 Barrel & Beyond Production Tour and a $45 Tasting Table Experience, while another visit page separately lists $25 blended and $30 red tastings. Use the live booking page as the final pricing source because the official pages are not perfectly synchronized.",
    highlights: [
      "42 oak-studded acres in Hye",
      "Wines made from 100% Texas grapes",
      "Modern tasting room with three decks",
      "Walk-in Signature Tasting plus bookable tasting experiences",
      "Barrel & Beyond Production Tour",
      "Small kitchen with paninis, cheese plates and snacks",
      "Family- and dog-friendly grounds with yard games",
      "Annual Kite Fest, Grape Stomp, Pig Roast and pairing events",
    ],
    body: [
      "Hye Meadow Winery offers a different Hye experience from the larger, more structured tasting destinations nearby. The winery presents itself as relaxed and approachable, with a modern tasting room overlooking 42 oak-studded acres, three decks and outdoor space intended for lingering rather than moving through a rigid tour schedule.",
      "The wine program centers on 100% Texas grapes. Hye Meadow describes its portfolio as ranging from intriguing whites to Mediterranean-influenced reds, and its current site highlights estate and Texas bottlings alongside seasonal releases.",
      "The most flexible visit is the Signature Tasting. Hye Meadow's current reservation system lists it at $25 and says walk-ins are welcome, with a choose-your-own tasting of nine wines. A separate current visit page describes five seasonal wines and lists $25 blended or $30 red tastings, so visitors should rely on the live reservation flow rather than assuming every page has been updated simultaneously.",
      "Visitors who want more structure can currently choose a $40 Barrel & Beyond Production Tour or a $45 Tasting Table Experience. The winery also offers glass-and-bottle service and member experiences, giving groups several ways to use the property without requiring the same format for everyone.",
      "Food is available onsite but the winery is not a full restaurant. The current FAQ describes a small kitchen serving paninis, artisan cheese plates and snacks, and the reservation page notes that some food can be preordered in advance.",
      "Hye Meadow deliberately leans into family and pet access. The winery says children are welcome in the oak grove with adult supervision, leashed dogs are welcome in the tasting room or patio, and the outdoor acreage provides space for yard games and casual family time.",
      "Recurring events add another reason to treat the property as more than a tasting stop. The winery's current materials call out an annual Kite Fest, Grape Stomp and Pig Roast, plus winemaker dinners and paired tastings throughout the year.",
      "Location makes the winery easy to place inside a stronger Hye itinerary. William Chris Vineyards sits nearby on U.S. 290, Garrison Brothers is a short drive north, the historic Hye core gives the community context and the LBJ Ranch district lies farther west toward Stonewall.",
    ],
    managingAuthority: "Hye Meadow Winery",
    officialUrl: "https://www.hyemeadow.com/",
    reservationUrl: "https://www.hyemeadow.com/pages/reservations",
    address: "10257 West US-290, Hye, TX 78635",
    directions:
      "Hye Meadow sits directly on U.S. 290 in Hye between Johnson City and Stonewall, close to William Chris Vineyards. Use the official address for navigation and allow extra time on peak wine-corridor weekends.",
    accessibilityNotes:
      "The current business listing and winery layout indicate developed tasting-room and patio access, but outdoor meadow areas may include natural surfaces. Contact the winery directly if your visit depends on a specific mobility or seating accommodation.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Use Hye Meadow as the relaxed, outdoor-friendly winery block in a Hye day, then pair it with one more tasting or a history/distillery stop instead of overloading the route.",
      nearbyAttractions: [
        {
          name: "Hye",
          description:
            "The town guide adds the historic post office, Garrison Brothers and the wider U.S. 290 corridor.",
          proximity: "In Hye",
          href: "/destination/hye",
        },
        {
          name: "William Chris Vineyards",
          description:
            "A more structured Hye estate with guided tastings, chef pairings and major Texas-wine industry context.",
          proximity: "Nearby on U.S. 290",
          href: "/destination/william-chris-vineyards-hye",
        },
        {
          name: "Garrison Brothers Distillery",
          description:
            "A working bourbon ranch with tours, tastings, food and special events.",
          proximity: "North of U.S. 290",
          href: "/destination/garrison-brothers-distillery-hye",
        },
      ],
      foodAndDrink: [
        {
          name: "Hye Meadow kitchen",
          description:
            "Paninis, artisan cheese plates and snacks are designed for tasting-room and patio visits rather than full restaurant service.",
          proximity: "Onsite",
          href: "https://www.hyemeadow.com/pages/faqs",
        },
        {
          name: "Hye / U.S. 290 wine corridor",
          description:
            "Nearby wineries and tasting rooms make it easy to build a two-stop Hye tasting day.",
          proximity: "Along U.S. 290",
          href: "/destination/hye",
        },
      ],
      lodging: [
        {
          name: "Johnson City and Blanco County",
          description:
            "Stay east for easier access to Johnson City dining, museums and Blanco County attractions.",
          proximity: "East",
          href: "/county/blanco",
        },
        {
          name: "Fredericksburg / Stonewall corridor",
          description:
            "Stay west when Hye Meadow is part of a larger wine-country weekend.",
          proximity: "West",
          href: "/destination/fredericksburg-texas-wineries-things-to-do-guide",
        },
      ],
      neighborhoods: [
        {
          name: "Hye wine corridor",
          description:
            "Hye Meadow, William Chris, the historic Hye core and other tasting rooms sit in a short stretch of U.S. 290.",
          proximity: "At the winery",
          href: "/destination/hye",
        },
      ],
      familyStops: [
        {
          name: "Science Mill",
          description:
            "Johnson City's hands-on STEM museum gives families a substantial companion stop before or after wine-country time.",
          proximity: "Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
        {
          name: "Lyndon B. Johnson National Historical Park",
          description:
            "The LBJ Ranch and Johnson City districts add all-ages history along the same corridor.",
          proximity: "Stonewall / Johnson City",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
      ],
      sideTrips: [
        {
          name: "Johnson City",
          description:
            "Return east for museums, restaurants, events and the Blanco County courthouse square.",
          proximity: "East on U.S. 290",
          href: "/destination/johnson-city",
        },
        {
          name: "Fredericksburg",
          description:
            "Continue west for the larger winery, lodging, shopping and German-Texan heritage cluster.",
          proximity: "West on U.S. 290",
          href: "/destination/fredericksburg-texas-wineries-things-to-do-guide",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Hye Meadow adds a relaxed, family- and dog-friendly winery to the Hye cluster, with Texas-grown wines, outdoor acreage and recurring events that complement the more structured tasting and distillery experiences nearby.",
      assessment: {
        recommendedVisit:
          "Plan 1.5 to 2.5 hours for a tasting and outdoor time; allow longer for a production tour, special event or picnic-style visit.",
        physicalEffort: "Low",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Low",
        familyFit:
          "Strong for a winery because the operator explicitly welcomes children and leashed dogs and provides outdoor space and yard games; adult supervision remains important around wine service and the property.",
        firstTimeValue:
          "High for travelers who want a less formal Hye winery experience with outdoor space, food and flexible tasting formats.",
      },
      itineraries: [
        {
          label: "Relaxed tasting stop",
          duration: "1.5–2 hours",
          steps: [
            "Check the current tasting-room hours before leaving.",
            "Use the Signature Tasting or glass-and-bottle service based on how structured you want the visit to be.",
            "Leave time for the decks, meadow and small-kitchen food rather than rushing to the next winery.",
          ],
        },
        {
          label: "Hye winery half day",
          duration: "4–5 hours",
          steps: [
            "Start at Hye Meadow for a relaxed first tasting.",
            "Visit the historic Hye core between stops.",
            "Add William Chris or Garrison Brothers as the one major second reservation.",
          ],
        },
        {
          label: "Family-friendly Hill Country day",
          duration: "Full day",
          steps: [
            "Use Johnson City or Science Mill for the morning.",
            "Visit Hye Meadow during the afternoon for outdoor space and a flexible tasting.",
            "Finish with dinner in Johnson City rather than stacking another late tasting.",
          ],
        },
      ],
      sources: [
        {
          label: "Hye Meadow Winery — official site",
          url: "https://www.hyemeadow.com/",
          scope:
            "42-acre property, Texas-grape positioning, tasting-room character, current address and published hours.",
        },
        {
          label: "Hye Meadow Winery — Visit Us",
          url: "https://www.hyemeadow.com/pages/visit-us",
          scope:
            "Current tasting options, tour availability, hours and visitor planning.",
        },
        {
          label: "Hye Meadow Winery — Reservations",
          url: "https://www.hyemeadow.com/pages/reservations",
          scope:
            "Current Signature Tasting, Tasting Table and Barrel & Beyond pricing plus walk-in policy.",
        },
        {
          label: "Hye Meadow Winery — Who We Are",
          url: "https://www.hyemeadow.com/pages/who-we-are",
          scope:
            "100% Texas-grape statement, family approach, annual events and staff story.",
        },
        {
          label: "Hye Meadow Winery — FAQ",
          url: "https://www.hyemeadow.com/pages/faqs",
          scope:
            "Current food, family, dog, parking and holiday guidance.",
        },
      ],
    },
    featured: false,
  },
];
