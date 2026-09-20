import { DESTINATION_PHOTO_PLACEHOLDER } from "./destination-hero-placeholder";
import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-19";

export const pedernalesRiverNatureParkDestinations: Destination[] = [
  {
    id: "park-pedernales-river-nature-johnson-city",
    brandId: "texasdefined",
    slug: "pedernales-river-nature-park-johnson-city",
    name: "Pedernales River Nature Park",
    summary:
      "Pedernales River Nature Park is LCRA's 224-acre day-use river park in Johnson City, with roughly 0.6 mile of Pedernales River frontage, swimming, fishing, paddling, hiking, biking, horseback riding, picnic areas and reservable pavilions just off U.S. 281.",
    category: "outdoors",
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
    coordinates: { lat: 30.2714, lng: -98.3998 },
    hero: {
      src: DESTINATION_PHOTO_PLACEHOLDER,
      alt: "Pedernales River Nature Park in Johnson City — exact-location hero pending governed image clearance",
      width: 1600,
      height: 1067,
    },
    bestSeason:
      "Spring and fall for comfortable trail, picnic and river weather; summer is popular for swimming but demands heat precautions and current river-condition checks, while winter can be excellent for walking and fishing on mild days.",
    entryNote:
      "LCRA currently lists the park as open daily from sunrise to sunset. Current day-use fees are $5 for adults, free for children 12 and younger, and $2 for seniors 65+, military visitors and visitors with disabilities; LCRA Parks Pass holders enter free. Fees, swimming conditions and park operations can change, so verify the live LCRA page before travel.",
    highlights: [
      "224-acre LCRA day-use park inside Johnson City",
      "Roughly 0.6 mile of Pedernales River frontage",
      "Swimming, fishing and paddling access",
      "Hiking, biking and horseback-riding opportunities",
      "Picnic tables, grills and flushing restrooms",
      "Riverside Pavilion and Valley View Pavilion for group use",
    ],
    body: [
      "Pedernales River Nature Park is easy to confuse with Pedernales Falls State Park, but the two are very different destinations. The nature park is an LCRA-managed day-use park inside Johnson City at U.S. 281, while Pedernales Falls State Park is a much larger TPWD property east of town centered on the river's broad limestone falls and trail system.",
      "LCRA describes Pedernales River Nature Park as a 224-acre property with about 0.6 mile of shoreline. The park's appeal is direct river access close to town: visitors can swim, fish, paddle, walk trails, ride bikes, picnic and use designated horseback-riding areas without committing to a full state-park day.",
      "The park works especially well as a low-friction outdoor block in a Johnson City itinerary. It sits about a mile from downtown, so a family can pair river time with Science Mill, Reptilandia or lunch around the courthouse square without spending much of the day driving between attractions.",
      "Facilities are more developed than the word nature park may suggest. LCRA currently lists flushing restrooms, picnic tables, grills, swimming areas, trails, pet-friendly access and reservable group spaces including Riverside Pavilion and Valley View Pavilion. That makes the park useful for casual visits as well as reunions, birthday gatherings and organized outings.",
      "River conditions still deserve respect. The Pedernales is a Hill Country river affected by rainfall, heat, drought and upstream weather, so a normal-looking day-use park can offer a very different experience depending on flow and recent storms. Swimming and paddling plans should be based on current conditions rather than an old photo or seasonal assumption.",
      "The park's in-town location also makes it a useful alternative when Pedernales Falls State Park is full, but the experiences are not interchangeable. Choose Pedernales River Nature Park for convenient day-use river access near Johnson City's museums and restaurants; choose Pedernales Falls State Park for the dramatic limestone falls, longer trail network and full state-park experience.",
    ],
    managingAuthority: "Lower Colorado River Authority (LCRA)",
    officialUrl: "https://lcraparks.com/parks/pedernales-river-nature-park",
    address: "404 US-281, Johnson City, TX 78636",
    directions:
      "The park sits along U.S. 281 near the Pedernales River on the south side of Johnson City's main visitor core, with direct highway access close to the U.S. 281/U.S. 290 junction.",
    accessibilityNotes:
      "LCRA lists flushing restrooms, pavilions and developed day-use facilities, but individual riverbanks and natural-surface trails can be uneven. Contact LCRA Parks before travel if your visit depends on a specific accessible route to the water or pavilion.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Use the nature park as Johnson City's easy river-access block, then connect it with the town's museums, wildlife attractions and presidential-history sites.",
      nearbyAttractions: [
        {
          name: "Johnson City",
          description:
            "Downtown museums, food, the courthouse square and LBJ history are only minutes from the park.",
          proximity: "About 1 mile",
          href: "/destination/johnson-city",
        },
        {
          name: "Science Mill",
          description:
            "A hands-on STEM museum in the historic feed-mill complex provides a strong indoor companion to a river visit.",
          proximity: "Downtown Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
        {
          name: "Lyndon B. Johnson National Historical Park",
          description:
            "The Johnson City district adds the Boyhood Home, Johnson Settlement and national-park visitor center.",
          proximity: "Johnson City",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
      ],
      foodAndDrink: [
        {
          name: "Downtown Johnson City",
          description:
            "Restaurants, cafes and tasting rooms around Main Street make an easy before-or-after stop.",
          proximity: "About 1 mile",
          href: "/destination/johnson-city",
        },
      ],
      lodging: [
        {
          name: "Johnson City",
          description:
            "Staying in town keeps the nature park, museums and LBJ sites within a short drive.",
          proximity: "Nearby",
          href: "/destination/johnson-city",
        },
      ],
      neighborhoods: [
        {
          name: "U.S. 281 / Pedernales River corridor",
          description:
            "The park sits at Johnson City's southern river edge where U.S. 281 crosses the Pedernales.",
          proximity: "At the park",
          href: "/county/blanco",
        },
      ],
      familyStops: [
        {
          name: "Science Mill",
          description:
            "Use the museum as an indoor second half of the day after swimming, fishing or picnicking.",
          proximity: "Downtown Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
        {
          name: "Reptilandia – Reptile Lagoon",
          description:
            "A temperature-controlled reptile and amphibian zoo offers another weather-proof family stop.",
          proximity: "North of downtown",
          href: "/destination/reptilandia-johnson-city",
        },
      ],
      sideTrips: [
        {
          name: "Pedernales Falls State Park",
          description:
            "A separate TPWD park east of Johnson City with the dramatic falls area, longer trails, camping and designated river access.",
          proximity: "East of Johnson City",
          href: "/destination/pedernales-falls-state-park",
        },
        {
          name: "Blanco County",
          description:
            "Use the county guide to connect the park with Blanco, ranch roads, Johnson City and the wider Pedernales corridor.",
          proximity: "Countywide",
          href: "/county/blanco",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Pedernales River Nature Park gives Johnson City convenient public river access inside the town's visitor orbit, filling a different role from Pedernales Falls State Park and making swimming, fishing, paddling and picnicking easier to combine with museums and downtown stops.",
      assessment: {
        recommendedVisit:
          "Plan 1 to 3 hours for a casual river, picnic or trail stop; allow half a day for swimming, fishing or a pavilion gathering.",
        physicalEffort: "Low to moderate",
        weatherExposure: "Fully outdoors",
        planningLevel: "Low",
        familyFit:
          "Strong for families who want flexible river access close to Johnson City rather than a full state-park itinerary.",
        firstTimeValue:
          "High as an easy local outdoor add-on, especially when downtown museums or wildlife attractions fill the rest of the day.",
      },
      itineraries: [
        {
          label: "Quick river stop",
          duration: "1–2 hours",
          steps: [
            "Check current river and weather conditions before entering the water.",
            "Use the picnic and river-access areas for a short outdoor break.",
            "Continue into downtown Johnson City for food or museums.",
          ],
        },
        {
          label: "Johnson City family half day",
          duration: "4–5 hours",
          steps: [
            "Start with swimming, fishing or a short walk at the nature park.",
            "Take a lunch break in downtown Johnson City.",
            "Finish with Science Mill or Reptilandia depending on weather and interests.",
          ],
        },
        {
          label: "Pedernales comparison day",
          duration: "Full day",
          steps: [
            "Use Pedernales River Nature Park for convenient town-adjacent river access.",
            "Compare it with Pedernales Falls State Park only if reservations, weather and drive time allow.",
            "Treat the two parks as different experiences rather than duplicate stops.",
          ],
        },
      ],
      sources: [
        {
          label: "LCRA Parks — Pedernales River Nature Park",
          url: "https://lcraparks.com/parks/pedernales-river-nature-park",
          scope:
            "Current hours, fees, activities, facilities, pavilions, pet policy and visitor contact information.",
        },
        {
          label: "LCRA — Pedernales River Nature Park property information",
          url: "https://lcraparks.com/land-development/pedernales-river-nature-park",
          scope:
            "Current acreage, shoreline length, address and property specifications.",
        },
        {
          label: "Explore Johnson City — visitor map",
          url: "https://explorejctx.com/johnson-city-texas-map/",
          scope:
            "Current Johnson City visitor context and placement of the park within the town's attraction network.",
        },
      ],
    },
    featured: false,
  },
];
