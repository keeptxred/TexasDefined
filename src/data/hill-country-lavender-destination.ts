import { DESTINATION_PHOTO_PLACEHOLDER } from "./destination-hero-placeholder";
import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-20";

export const hillCountryLavenderDestinations: Destination[] = [
  {
    id: "farm-hill-country-lavender-blanco",
    brandId: "texasdefined",
    slug: "hill-country-lavender-blanco",
    name: "Hill Country Lavender",
    summary:
      "Hill Country Lavender near Blanco is Texas' first commercial lavender farm, a free seasonal visitor stop with more than 2,500 plants, two walkable fields, a farm store, handmade lavender products, group talks and deep ties to the Blanco Lavender Festival.",
    category: "outdoors",
    region: "hill-country",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["texas-hill-country"],
      countySlugs: ["blanco"],
      travelRegionIds: ["hill-country"],
      relocationPresentationLabels: ["San Antonio & Hill Country", "Austin & Central Texas"],
    },
    nearestTown: "Blanco",
    county: "Blanco",
    coordinates: { lat: 30.114263, lng: -98.303508 },
    hero: {
      src: DESTINATION_PHOTO_PLACEHOLDER,
      alt: "Hill Country Lavender farm near Blanco — exact-location hero pending governed image clearance",
      width: 1600,
      height: 1067,
    },
    bestSeason:
      "The farm's published 2026 visitor season runs from mid-April through November 28, with lavender bloom conditions strongest only during part of that window. Bloom timing varies substantially with weather, so use the farm's current bloom update rather than assuming the fields will be purple.",
    entryNote:
      "Hill Country Lavender currently lists free admission and no reservation requirement. Regular 2026 hours are Thursday through Saturday, 10 a.m.-4 p.m., with Saturdays-only operation in August and seasonal holiday closures. The farm can close for heavy rain or lightning, and bloom/cut-your-own availability changes, so verify the live homepage before making a dedicated drive.",
    highlights: [
      "Texas' first commercial lavender farm",
      "More than 2,500 lavender plants",
      "Two walkable lavender fields in a Hill Country valley",
      "Free farm admission with no reservation required",
      "Farm store with handmade lavender products",
      "Seasonal cut-your-own lavender when blooms permit",
      "Group lavender-growing talks by reservation",
      "Direct connection to the annual Blanco Lavender Festival",
    ],
    body: [
      "Hill Country Lavender is one of the places that made Blanco's modern lavender identity possible. The farm traces its beginnings to 1999, when the first lavender was planted at the original location. In 2001 the fields opened to the public for viewing and harvesting, helping establish a new specialty crop and visitor experience in the Texas Hill Country.",
      "The current farm is a boutique operation on FM 165 east of Blanco, with lavender arranged in two fields inside a small valley. The operator currently describes more than 2,500 plants and multiple varieties, but visitors should not treat acreage or plant count as a promise of a solid-purple landscape. Lavender bloom is seasonal, weather-sensitive and uneven from variety to variety.",
      "That variability is important to trip planning. The farm publishes current bloom updates and specifically warns visitors when flowers are sparse. In season, visitors may be able to cut a bunch themselves, but cut-your-own depends on what is actually blooming and can end before the broader visitor season does.",
      "The normal visit is intentionally simple. Admission is currently free, reservations are not required, and visitors can walk the fields, browse the farm store and bring a picnic. The shop carries a large range of lavender products, including soaps, oils, sprays, bath products, culinary items and growing materials. The complete product line is also sold year-round at Brieger Pottery on the Blanco town square.",
      "Hill Country Lavender also has an educational role. The farm offers group talks by reservation about its history and growing lavender in Central Texas. The current listed price is $10 per person for the talk, excluding Lavender Festival weekend, but group availability and pricing should be confirmed directly before planning around it.",
      "The farm is central to the Blanco Lavender Festival story. Its founders helped establish commercial lavender growing in the area, and the farm's own history credits the operation with helping launch the annual festival in 2005. The current event page already lists the 22nd annual festival for June 4-6, 2027, while detailed festival-weekend farm hours and shuttle rules are published closer to the event.",
      "Accessibility is better than a rough farm-road stop might suggest but still depends on weather. The operator says a ramp can be provided for the shop and the granite-gravel paths can accommodate wheelchairs and walkers; the field itself can become difficult after heavy rain. Portable restrooms also create limitations for some visitors.",
      "Hill Country Lavender is best treated as part of a broader Blanco day rather than as an attraction that always fills several hours. Pair the farm with the courthouse square, Blanco State Park, local museums or another craft-production stop, and let the current bloom report determine how much of the day belongs to the fields.",
    ],
    managingAuthority: "Hill Country Lavender",
    officialUrl: "https://www.hillcountrylavender.com/",
    address: "8241 Farm to Market 165, Blanco, TX 78606",
    directions:
      "From Blanco's town square, the farm directs visitors east on 4th Street/FM 163 for about half a mile, then left onto FM 165 for about 7.6 miles. The operator warns that some GPS systems still retain an old farm location, so verify the street address before departure.",
    accessibilityNotes:
      "The operator says a portable ramp is available for wheelchair or walker access to the shop and that granite-gravel paths can be rolled on. Field conditions can become muddy after rain, and portable restroom access is limited, so contact the farm when specific mobility accommodations are essential.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Use the lavender farm as a seasonal rural stop east of Blanco, then return to town for the courthouse square, river, museums, food and year-round shopping.",
      nearbyAttractions: [
        {
          name: "Blanco",
          description:
            "The town guide connects the farm with the historic square, Blanco State Park, museums and Blanco's craft-food-and-drink cluster.",
          proximity: "About 8 miles west",
          href: "/destination/blanco",
        },
        {
          name: "Blanco State Park",
          description:
            "A compact in-town river park with swimming, fishing, paddling, camping and shaded picnicking.",
          proximity: "In Blanco",
          href: "/destination/blanco-state-park",
        },
        {
          name: "Brieger Pottery",
          description:
            "The downtown Blanco shop is Hill Country Lavender's year-round retail location and also showcases local pottery and other makers.",
          proximity: "Blanco town square",
          href: "https://www.briegerpottery.com/",
        },
      ],
      foodAndDrink: [
        {
          name: "Bring a picnic",
          description:
            "The farm allows visitors to bring a picnic, but asks guests to remove their own trash.",
          proximity: "At the farm",
        },
        {
          name: "Downtown Blanco",
          description:
            "Use Main Street and the square for restaurants and cafes before or after the farm.",
          proximity: "About 8 miles west",
          href: "/destination/blanco",
        },
      ],
      lodging: [
        {
          name: "Blanco",
          description:
            "Town lodging keeps the lavender farm, river, courthouse square and other county attractions within a short drive.",
          proximity: "About 8 miles west",
          href: "/destination/blanco",
        },
      ],
      neighborhoods: [
        {
          name: "FM 165 / FM 2325 farm country",
          description:
            "The rural corridor east of Blanco links the lavender farm with flower farms, ranches and the broader eastern Blanco County landscape.",
          proximity: "At the farm",
          href: "/county/blanco",
        },
      ],
      familyStops: [
        {
          name: "Blanco State Park",
          description:
            "Add river time or a picnic block when weather and water conditions cooperate.",
          proximity: "In Blanco",
          href: "/destination/blanco-state-park",
        },
        {
          name: "Johnson City",
          description:
            "Science Mill and the wildlife attractions make Johnson City a strong second family cluster in the same county.",
          proximity: "Northwest",
          href: "/destination/johnson-city",
        },
      ],
      sideTrips: [
        {
          name: "Hye",
          description:
            "Continue north toward Hye for U.S. 290 wineries, Garrison Brothers and LBJ-country history.",
          proximity: "North of Blanco",
          href: "/destination/hye",
        },
        {
          name: "Blanco County",
          description:
            "Use the county guide to connect Blanco, Johnson City, Hye, river parks, distilleries and Hill Country road trips.",
          proximity: "Countywide",
          href: "/county/blanco",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Hill Country Lavender helped establish commercial lavender growing and lavender tourism in the Texas Hill Country, giving Blanco both an agricultural identity and the foundation for its signature annual lavender festival.",
      assessment: {
        recommendedVisit:
          "Plan 45 minutes to 2 hours depending on bloom conditions, shopping and whether you bring a picnic; group talks justify a longer scheduled stop.",
        physicalEffort: "Low to moderate",
        weatherExposure: "Mostly outdoors",
        planningLevel: "Moderate",
        familyFit:
          "Good for families comfortable with a working farm, full sun, insects and uneven field conditions.",
        firstTimeValue:
          "High in bloom season and still useful outside peak bloom for the farm store, Hill Country setting and agricultural-history context.",
      },
      itineraries: [
        {
          label: "Quick farm stop",
          duration: "45–90 minutes",
          steps: [
            "Check the live bloom and weather update before leaving Blanco.",
            "Walk both fields without assuming cut-your-own will be available.",
            "Finish in the farm store for plants or lavender products.",
          ],
        },
        {
          label: "Lavender + Blanco half day",
          duration: "4–5 hours",
          steps: [
            "Visit the farm in the cooler part of the day.",
            "Return to Blanco for lunch and the courthouse square.",
            "Use Blanco State Park or a local museum as the second major stop.",
          ],
        },
        {
          label: "Lavender Festival weekend",
          duration: "Full day",
          steps: [
            "Use the current festival site for farm hours, parking and shuttle rules.",
            "Treat downtown market programming and the farm as separate stops.",
            "Do not assume regular pet, parking or cut-your-own rules apply during festival weekend.",
          ],
        },
      ],
      sources: [
        {
          label: "Hill Country Lavender — official home",
          url: "https://www.hillcountrylavender.com/",
          scope:
            "Current 2026 season, regular hours, free admission, no-reservation policy, address and plant-count context.",
        },
        {
          label: "Hill Country Lavender — location and contact",
          url: "https://www.hillcountrylavender.com/location-and-contact-1",
          scope:
            "Current directions, seasonal hours, owners and year-round Brieger Pottery retail location.",
        },
        {
          label: "Hill Country Lavender — FAQ",
          url: "https://www.hillcountrylavender.com/new-page",
          scope:
            "Current accessibility, picnic, pet, weather, field and visitor-policy guidance.",
        },
        {
          label: "Hill Country Lavender — history",
          url: "https://www.hillcountrylavender.com/our-history",
          scope:
            "Origins of commercial lavender growing in Blanco and the farm's role in starting the Lavender Festival.",
        },
        {
          label: "Hill Country Lavender — events",
          url: "https://www.hillcountrylavender.com/events",
          scope:
            "Current 2027 Blanco Lavender Festival save-the-date and group-talk information.",
        },
        {
          label: "U.S. Lavender Growers Association — open farms",
          url: "https://www.uslavender.org/assets/Find_A/Find%20a%20Farm%20February%202026.pdf",
          scope:
            "Independent confirmation that Hill Country Lavender is open to the public at its current Blanco address.",
        },
      ],
    },
    featured: false,
  },
];
