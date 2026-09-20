import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-20";

export const realAleBlancoDestinations: Destination[] = [
  {
    id: "brewery-real-ale-blanco",
    brandId: "texasdefined",
    slug: "real-ale-brewing-company-blanco",
    name: "Real Ale Brewing Company",
    summary:
      "Real Ale Brewing Company in Blanco is a working Hill Country brewery and distillery with 16+ beers on tap, taproom-only pilot releases, Real Spirits cocktails, a shaded beer garden, pizza, live music and free Friday brewery tours.",
    category: "food-bbq",
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
    coordinates: { lat: 30.113255, lng: -98.41274 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Real%20Ale%20Brewing%20Co%20Blanco%20Texas%202023.jpg?width=1600",
      alt: "Real Ale Brewing Company production brewery in Blanco, Texas",
      width: 3001,
      height: 2000,
      credit: "Larry D. Moore · Wikimedia Commons · CC BY 4.0",
    },
    bestSeason:
      "Year-round. Spring and fall are most comfortable for the beer garden and a broader Blanco River trip, while the indoor taproom keeps the brewery useful during summer heat or poor weather.",
    entryNote:
      "As reviewed September 20, 2026, fall taproom hours are Wednesday and Thursday noon-6 p.m., Friday and Saturday noon-8 p.m., and Sunday noon-6 p.m.; Monday and Tuesday are closed. Free brewery tours are currently offered Fridays at 4 p.m. with no reservation required. Hours, events, tours and tap lists change, so confirm the live taproom page before travel.",
    highlights: [
      "16+ beers on tap, including Blanco-only pilot releases",
      "Free Friday brewery tours at 4 p.m.",
      "Real Spirits grain-to-glass whiskey, gin and other releases",
      "Indoor taproom and shaded Hill Country beer garden",
      "Pizza Thursday through Sunday",
      "Regular Saturday live music and special events",
      "Family-friendly grounds with leashed dogs welcome",
      "Made-in-Texas beer and spirits production in Blanco",
    ],
    body: [
      "Real Ale Brewing Company is one of Blanco's most important visitor businesses because the taproom sits at the actual production brewery rather than functioning as a remote brand outpost. The company traces its history to 1996, when the operation began in the basement of an antique store on the Blanco square, and today combines full-scale beer production, a taproom, beer garden and onsite distilling north of town on U.S. 281.",
      "The current taproom experience is built for a longer stay than a quick tasting flight. Real Ale advertises more than 16 beers on tap, including core releases and small-batch beers from its eight-barrel pilot system that may be available only in Blanco. Cocktails, wine and Real Spirits broaden the menu for mixed groups, while the shaded beer garden gives the property a strong Hill Country hangout component.",
      "Free brewery tours are currently offered Fridays at 4 p.m. with no reservation required. Real Ale recommends arriving a little early and wearing closed-toe shoes. The company's FAQ says minors may visit and take the tour even though alcohol service is limited to guests 21 and older with valid identification.",
      "Food is part of the current visitor setup. Oh My Pizza Pie serves at the brewery Thursday through Sunday, allowing visitors to build a lunch or dinner block around the taproom without immediately returning to downtown Blanco. Real Ale also hosts regular live music on Saturdays and recurring events such as its anniversary celebration and Oktoberfest.",
      "Real Ale's spirits program makes the property more than a brewery. The company says its Real Spirits line is brewed, fermented, distilled and aged in Blanco, with several whiskies beginning as versions of Real Ale beer brewed without hops before moving into the onsite still and Texas aging environment. Some spirits are available only from the Blanco taproom, strengthening the case for treating the production site as a destination rather than merely a beer-brand headquarters.",
      "That production story also belongs in TexasDefined's Made-in-Texas layer. Real Ale's current materials explicitly describe beer production and grain-to-glass spirits in Blanco. Linking the Made-in-Texas record to the destination lets readers move from 'what is made here?' to 'can I actually visit where it is made?' without duplicating or exaggerating the manufacturing claim.",
      "The brewery is an especially efficient stop for travelers already using Blanco as a Hill Country base. Blanco State Park, the historic courthouse square and the Blanco River can fill the rest of the day, while Johnson City, Pedernales Falls and the U.S. 290 corridor remain close enough for a larger county weekend.",
    ],
    managingAuthority: "Real Ale Brewing Company",
    officialUrl: "https://realalebrewing.com/taproom-and-beer-garden/",
    address: "2250 N US Hwy 281, Blanco, TX 78606",
    directions:
      "The brewery is on U.S. 281 north of central Blanco. Use the official street address for navigation; it is separate from the historic courthouse square and Blanco State Park cluster closer to the river.",
    accessibilityNotes:
      "The current visitor page lists onsite parking, indoor taproom space and an outdoor beer garden. Contact Real Ale before travel if your visit depends on a specific mobility or sensory accommodation. All ages are welcome, but alcohol service requires valid ID and legal drinking age.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Use the brewery as the food-and-drink anchor for a Blanco day, then add river access, the historic square or a Blanco County side trip based on weather and interests.",
      nearbyAttractions: [
        {
          name: "Blanco",
          description:
            "The town's courthouse square, shops, food and river access give the brewery a fuller small-town context.",
          proximity: "Minutes south",
          href: "/destination/blanco",
        },
        {
          name: "Blanco State Park",
          description:
            "A compact river park inside town with swimming, fishing, paddling and picnic access along the Blanco River.",
          proximity: "Blanco",
          href: "/destination/blanco-state-park",
        },
        {
          name: "Johnson City",
          description:
            "Museums, LBJ history, specialty attractions and events make the county seat an easy companion stop.",
          proximity: "North on U.S. 281",
          href: "/destination/johnson-city",
        },
      ],
      foodAndDrink: [
        {
          name: "Real Ale Taproom & Beer Garden",
          description:
            "The brewery's core visitor space pours 16+ beers, pilot releases, Real Spirits cocktails and wine.",
          proximity: "Onsite",
          href: "https://realalebrewing.com/taproom-and-beer-garden/",
        },
        {
          name: "Oh My Pizza Pie",
          description:
            "Pizza is currently served at the brewery Thursday through Sunday.",
          proximity: "Onsite",
          href: "https://realalebrewing.com/taproom-and-beer-garden/",
        },
      ],
      lodging: [
        {
          name: "Blanco",
          description:
            "Small-town lodging keeps the brewery, Blanco River and courthouse square close together.",
          proximity: "In town",
          href: "/destination/blanco",
        },
        {
          name: "Blanco County",
          description:
            "Rural Hill Country stays can place visitors between Blanco, Johnson City and the Pedernales corridor.",
          proximity: "Countywide",
          href: "/county/blanco",
        },
      ],
      neighborhoods: [
        {
          name: "North U.S. 281",
          description:
            "The brewery sits north of Blanco's historic core along the main Austin–San Antonio Hill Country route.",
          proximity: "At the brewery",
          href: "/destination/blanco",
        },
      ],
      familyStops: [
        {
          name: "Blanco State Park",
          description:
            "A flexible all-ages river stop that pairs well with the brewery's family-friendly daytime visitor setup.",
          proximity: "Blanco",
          href: "/destination/blanco-state-park",
        },
        {
          name: "Science Mill",
          description:
            "A substantial hands-on STEM museum in Johnson City for families building a full Blanco County day.",
          proximity: "Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
      ],
      sideTrips: [
        {
          name: "Johnson City",
          description:
            "Continue north for the Science Mill, motorcycle museum, wildlife attractions, LBJ sites and signature events.",
          proximity: "North on U.S. 281",
          href: "/destination/johnson-city",
        },
        {
          name: "Garrison Brothers Distillery",
          description:
            "Compare Blanco's brewery/distillery with Hye's bourbon-focused working ranch along the county's U.S. 290 side.",
          proximity: "Hye",
          href: "/destination/garrison-brothers-distillery-hye",
        },
        {
          name: "Texas Craft Brewers Festival",
          description:
            "If your brewery-focused trip lines up with the confirmed annual date, use the Austin festival guide for tickets, lodging, transportation and statewide brewery context.",
          proximity: "Austin",
          href: "/event/texas-craft-brewers-festival",
        },
        {
          name: "Texas food, drink & brewery travel",
          description:
            "Connect Real Ale to TexasDefined's statewide food-and-drink routes, brewery destinations and festival planning.",
          proximity: "Statewide",
          href: "/explore/food-bbq",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Real Ale connects Blanco's small-town identity to a long-running Texas beer producer and a newer grain-to-glass spirits program, while its taproom, pilot brewery, tours, food and live music make the manufacturing site directly useful to travelers.",
      assessment: {
        recommendedVisit:
          "Plan 1.5 to 3 hours for the taproom, food and beer garden; allow longer on a Friday tour day or when live music and special events are scheduled.",
        physicalEffort: "Low",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Low",
        familyFit:
          "Strong for mixed-age daytime groups because all ages are welcome and minors may take the tour, though the core experience remains centered on beer and spirits.",
        firstTimeValue:
          "High for Texas craft-beer and Made-in-Texas travelers, especially when paired with the Blanco square or state park.",
      },
      itineraries: [
        {
          label: "First brewery visit",
          duration: "1.5–2.5 hours",
          steps: [
            "Check the live taproom hours and current tap list before departure.",
            "Visit the taproom and sample a mix of core and Blanco-only pilot releases.",
            "Use the beer garden and onsite pizza to avoid rushing through the property.",
          ],
        },
        {
          label: "Friday tour afternoon",
          duration: "3–4 hours",
          steps: [
            "Arrive before the current 4 p.m. free brewery tour and wear closed-toe shoes.",
            "Take the production tour, then return to the taproom for beer or Real Spirits.",
            "Stay for food and the beer garden if weather is comfortable.",
          ],
        },
        {
          label: "Blanco full day",
          duration: "Full day",
          steps: [
            "Start around the Blanco courthouse square or Blanco State Park.",
            "Use Real Ale as the midday or afternoon food-and-drink anchor.",
            "Finish with river time, downtown Blanco or a short county drive depending on the season.",
          ],
        },
      ],
      sources: [
        {
          label: "Real Ale Brewing — Taproom & Beer Garden",
          url: "https://realalebrewing.com/taproom-and-beer-garden/",
          scope:
            "Current fall hours, taproom features, free Friday tours, family/dog policy, food, parking and event context.",
        },
        {
          label: "Real Ale Brewing — Our Story",
          url: "https://realalebrewing.com/our-story/",
          scope:
            "1996 Blanco founding, basement origin and development into the current production brewery and taproom.",
        },
        {
          label: "Real Ale Brewing — Availability",
          url: "https://realalebrewing.com/availability/",
          scope:
            "Current Texas beer availability and Blanco grain-to-glass Real Spirits production claims.",
        },
        {
          label: "Real Ale Brewing — FAQ",
          url: "https://realalebrewing.com/answers/faqs/",
          scope:
            "Current tour/taproom planning, group guidance and all-ages visitor policy.",
        },
        {
          label: "Wikimedia Commons — Real Ale Brewing Co Blanco Texas 2023",
          url: "https://commons.wikimedia.org/wiki/File:Real_Ale_Brewing_Co_Blanco_Texas_2023.jpg",
          scope:
            "Exact-subject brewery image licensed CC BY 4.0 for reusable editorial display.",
        },
      ],
    },
    featured: true,
  },
];
