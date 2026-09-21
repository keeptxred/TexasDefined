import { DESTINATION_PHOTO_PLACEHOLDER } from "./destination-hero-placeholder";
import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-21";

export const johnsonCityWildlifeDestinations: Destination[] = [
  {
    id: "zoo-exotic-resort-johnson-city",
    brandId: "texasdefined",
    slug: "exotic-resort-zoo-johnson-city",
    name: "The Exotic Resort Zoo",
    summary:
      "The Exotic Resort Zoo north of Johnson City is a family-owned Hill Country safari park with 700+ animals from 45+ species, guided tractor safaris, timed self-drive tours, a petting zoo and onsite safari cabins.",
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
    coordinates: { lat: 30.33172, lng: -98.37936 },
    hero: {
      src: DESTINATION_PHOTO_PLACEHOLDER,
      alt: "The Exotic Resort Zoo near Johnson City — exact-location hero pending governed image clearance",
      width: 1600,
      height: 1067,
    },
    bestSeason:
      "Fall through spring for mild safari weather and active animals; summer visits are most comfortable early in the day, while freezing or rainy weather can interrupt guided tractor tours.",
    entryNote:
      "As reviewed September 21, 2026, the zoo's homepage and admissions page list daily access beginning at 9 a.m., with the homepage showing 9 a.m.-5 p.m. regular hours; a separate contact page still says 9 a.m.-6 p.m. and a last tour no later than 4:30 p.m., so verify late-day access before driving out. Current general admission is $19.95 for adults ages 13-59, $15.95 for children ages 2-12 and $17.95 for seniors 60+, with animal feed sold separately at $8. Admission covers one guided tractor safari or one drive-through safari plus the petting zoo, caged-animal area and picnic area.",
    highlights: [
      "700+ animals representing 45+ species",
      "Guided tractor safari lasting roughly 45 minutes to an hour; self-drive visits can run longer",
      "Timed self-drive safari through the property",
      "Petting zoo included with general admission",
      "Family-owned 137-acre Hill Country property established in 1995",
      "Onsite safari cabins for overnight stays",
    ],
    body: [
      "The Exotic Resort Zoo is one of Johnson City's strongest family attractions because it turns a Hill Country ranch into a safari-style wildlife experience rather than a conventional walk-through zoo. The operator currently describes more than 700 animals representing over 45 species, spread across a property large enough for the visit to be built around movement through animal habitat.",
      "Visitors choose between two primary tour formats. The guided option uses a tractor-pulled safari vehicle and typically lasts about 45 minutes to an hour, with a guide explaining the animals and how to interact safely. The drive-through option lets visitors use their own vehicle, but the zoo limits the number of vehicles entering by time slot and strongly encourages advance online booking for that format.",
      "General admission also includes the petting zoo, caged-animal area and picnic space, so the experience is broader than a single safari loop. As reviewed September 21, 2026, posted prices are $19.95 for adults ages 13-59, $15.95 for children ages 2-12 and $17.95 for seniors 60+, with animal feed at $8. The operator emphasizes that animals may approach vehicles closely in the drive-through area, which is part of the appeal but also why current feeding and vehicle rules should be treated as part of the visit rather than optional fine print.",
      "The zoo's story is unusually personal. Dennis and Marilyn Bacque established the property in 1995 after settling on 137 acres near Johnson City. Their original private-retreat plan changed after they brought home a Canadian elk named Dottie, and the animal collection expanded from there into the independently owned safari park operating today.",
      "The resort component makes this destination different from most Texas zoo stops. The property offers safari cabins onsite, allowing families to turn the zoo into an overnight Hill Country stay instead of a short attraction visit. That works especially well for travelers combining Johnson City with Science Mill, Reptilandia, LBJ history, Pedernales Falls or the U.S. 290 corridor.",
      "Weather matters more here than at Johnson City's indoor museums. The zoo says guided tours may pause during freezing or rainy conditions, while the self-drive experience can remain available in some poor-weather situations. Check the operator's live updates before making a dedicated drive, particularly during winter freezes or heavy rain.",
    ],
    managingAuthority: "The Exotic Resort Zoo",
    officialUrl: "https://www.zooexotics.com/",
    reservationUrl: "https://www.zooexotics.com/admissions/",
    address: "235 Zoo Trail, Johnson City, TX 78636",
    directions:
      "The zoo is about four miles north of Johnson City off U.S. 281. Follow the operator's current directions to Zoo Trail rather than relying on a generic Johnson City destination pin.",
    accessibilityNotes:
      "The self-drive safari can be experienced from the visitor's own vehicle, and the operator says its guided-tour trailer can accommodate wheelchairs using a heavy-duty ramp. The zoo currently prohibits dogs onsite, including service animals, because of live-animal safety restrictions; travelers who use a service animal should review the zoo's current policy and contact the operator before arrival.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Treat the zoo as a half-day wildlife block north of town, then use Johnson City for museums, food and history rather than trying to squeeze the safari between short downtown stops.",
      nearbyAttractions: [
        {
          name: "Reptilandia – Reptile Lagoon",
          description:
            "A temperature-controlled reptile and amphibian zoo with eight biomes and large naturalistic exhibits on U.S. 281.",
          proximity: "About 2 miles south",
          href: "/destination/reptilandia-johnson-city",
        },
        {
          name: "Johnson City",
          description:
            "Downtown museums, the Blanco County Courthouse, food and LBJ history make the natural companion base.",
          proximity: "About 4 miles south",
          href: "/destination/johnson-city",
        },
        {
          name: "Science Mill",
          description:
            "A hands-on STEM museum in the historic feed-mill complex that works especially well for families.",
          proximity: "Downtown Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
      ],
      foodAndDrink: [
        {
          name: "Downtown Johnson City",
          description:
            "Use Main Street and the courthouse area for restaurants, cafes and tasting rooms before or after the safari.",
          proximity: "About 4 miles south",
          href: "/destination/johnson-city",
        },
      ],
      lodging: [
        {
          name: "Exotic Resort Zoo safari cabins",
          description:
            "Onsite cabins let visitors stay on the wildlife property and turn the zoo into an overnight family destination.",
          proximity: "Onsite",
          href: "https://www.zooexotics.com/safari-cabins/",
        },
        {
          name: "Johnson City",
          description:
            "Town lodging provides easier access to restaurants, Science Mill and LBJ sites while keeping the zoo a short drive away.",
          proximity: "About 4 miles south",
          href: "/destination/johnson-city",
        },
      ],
      neighborhoods: [
        {
          name: "North U.S. 281 wildlife corridor",
          description:
            "The zoo and Reptilandia sit north of downtown along the same highway, making them easy to pair without crossing the whole county.",
          proximity: "North of Johnson City",
          href: "/destination/reptilandia-johnson-city",
        },
      ],
      familyStops: [
        {
          name: "Science Mill",
          description:
            "Hands-on science gives families a strong indoor contrast to the outdoor safari experience.",
          proximity: "Downtown Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
        {
          name: "Reptilandia",
          description:
            "An indoor reptile zoo adds snakes, lizards, turtles and amphibians to a wildlife-focused Johnson City day.",
          proximity: "About 2 miles south",
          href: "/destination/reptilandia-johnson-city",
        },
      ],
      sideTrips: [
        {
          name: "Blanco County",
          description:
            "Extend the trip toward Blanco, Pedernales Falls or the U.S. 290 corridor.",
          proximity: "Countywide",
          href: "/county/blanco",
        },
        {
          name: "Texas Hill Country",
          description:
            "Use Johnson City as a base for a larger Hill Country family trip.",
          proximity: "Regional",
          href: "/explore/region/hill-country",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "The Exotic Resort Zoo gives Johnson City a large-format wildlife experience that complements the town's museums and presidential history, while its guided safari, self-drive option and onsite cabins create several distinct ways to visit the same property.",
      assessment: {
        recommendedVisit:
          "Plan 2 to 4 hours for the zoo itself; allow most of a day if you want a guided safari, petting-zoo time, a meal break and a second Johnson City family attraction.",
        physicalEffort: "Low",
        weatherExposure: "Mostly outdoors",
        planningLevel: "Moderate",
        familyFit:
          "Excellent for families who enjoy close animal viewing, especially when paired with an indoor Johnson City attraction.",
        firstTimeValue:
          "High for family trips because the safari format is substantially different from a conventional zoo walk.",
      },
      itineraries: [
        {
          label: "Safari-focused visit",
          duration: "2–3 hours",
          steps: [
            "Choose guided tractor safari or self-drive before arrival.",
            "Reserve a drive-through slot online if that format matters.",
            "Allow additional time for the petting zoo and picnic area after the safari loop.",
          ],
        },
        {
          label: "Johnson City wildlife day",
          duration: "Full day",
          steps: [
            "Start at the Exotic Resort Zoo while temperatures are cooler.",
            "Take a lunch break in Johnson City.",
            "Use Reptilandia for the second wildlife block in a temperature-controlled setting.",
          ],
        },
        {
          label: "Family overnight",
          duration: "1 night",
          steps: [
            "Stay onsite or in Johnson City.",
            "Give the safari property its own half-day rather than rushing it.",
            "Use the second day for Science Mill, LBJ history or Pedernales Falls depending on weather.",
          ],
        },
      ],
      sources: [
        {
          label: "The Exotic Resort Zoo — official site",
          url: "https://www.zooexotics.com/",
          scope:
            "Current animal count, operating pattern, tour formats and Johnson City visitor information.",
        },
        {
          label: "The Exotic Resort Zoo — admissions",
          url: "https://www.zooexotics.com/admissions/",
          scope:
            "Current admission structure, guided-tour duration, drive-through reservation rules and included areas.",
        },
        {
          label: "The Exotic Resort Zoo — history",
          url: "https://www.zooexotics.com/our-story/",
          scope:
            "1995 founding, 137-acre property and Dennis and Marilyn Bacque history.",
        },
        {
          label: "The Exotic Resort Zoo — cabins",
          url: "https://www.zooexotics.com/safari-cabins/",
          scope:
            "Current onsite lodging and safari-cabin planning.",
        },
      ],
    },
    featured: false,
  },
  {
    id: "zoo-reptilandia-johnson-city",
    brandId: "texasdefined",
    slug: "reptilandia-johnson-city",
    name: "Reptilandia – Reptile Lagoon",
    summary:
      "Reptilandia – Reptile Lagoon north of Johnson City is a temperature-controlled reptile and amphibian zoo organized around eight biomes, large naturalistic habitats, conservation research and an ethnographic museum exploring human relationships with reptiles.",
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
    coordinates: { lat: 30.30847, lng: -98.39419 },
    hero: {
      src: DESTINATION_PHOTO_PLACEHOLDER,
      alt: "Reptilandia – Reptile Lagoon near Johnson City — exact-location hero pending governed image clearance",
      width: 1600,
      height: 1067,
    },
    bestSeason:
      "Year-round. The exhibit buildings are temperature controlled and enclosed, making Reptilandia one of the strongest bad-weather and summer-heat family attractions around Johnson City.",
    entryNote:
      "As reviewed September 21, 2026, Reptilandia is open Tuesday through Sunday from 10 a.m. to 5 p.m. and also opens Monday holidays from 10 a.m. to 5 p.m. Current daily admission is $20 for adults ages 13-64 and $15 for children ages 3-11, seniors 65+ and active/retired military; children under 3 are free. Animal feeding is not allowed, and the operator says all exhibits are enclosed so visits can continue in rain.",
    highlights: [
      "Eight distinct reptile and amphibian biomes",
      "Temperature-controlled indoor visitor experience",
      "Temperate Building with 21 large themed exhibits",
      "Jungle Building with tropical reptiles and giant lizards",
      "Ethnographic museum connecting reptiles, art and human culture",
      "Wheelchair-accessible visitor paths and conservation-focused programs",
    ],
    body: [
      "Reptilandia – Reptile Lagoon gives Johnson City an unusually specialized zoo: the collection focuses on reptiles and amphibians, but the operator presents them through large naturalistic habitats rather than a simple row of small display tanks. The zoo describes eight distinct biomes and a mission centered on education, conservation and research.",
      "The Temperate Building contains 21 large themed exhibits representing temperate and subtropical environments. Snakes, turtles, chameleons and other lizards are displayed in habitats designed to show ecological relationships and animal behavior, including mixed-species presentations where appropriate.",
      "The Jungle Building shifts to tropical reptiles and giant lizards in more humid environments. That contrast gives visitors a clearer sense of how reptiles adapt to climate and habitat rather than presenting the collection as a species checklist. The operator also maintains an ethnographic museum examining the relationship between people and reptiles through art and cultural objects.",
      "Founder Quetzal Dwyer brought decades of herpetology and reptile-conservation experience to Johnson City in 2022 after extensive work in Costa Rica and field research across Central America and the Pacific. The current staff includes keepers and curators with zoo, field-research and captive-breeding backgrounds, so the educational layer extends beyond exhibit labels.",
      "For families, the practical advantage is climate control. Reptilandia says all exhibits are enclosed and remain open in rain, and wheelchair-accessible paths run through the facility. As reviewed September 21, 2026, standard admission is $20 for adults and $15 for children ages 3-11, seniors and active/retired military, while children under 3 are free. That makes it an especially useful pairing with the more weather-dependent Exotic Resort Zoo or an outdoor stop at Pedernales Falls.",
      "Reptilandia sits on U.S. 281 north of downtown Johnson City, close enough to the Exotic Resort Zoo to make a two-attraction wildlife day realistic. Families can also pair it with Science Mill for a fully indoor science-and-wildlife itinerary or use downtown Johnson City for lunch between attractions.",
    ],
    managingAuthority: "Reptilandia – Reptile Lagoon",
    officialUrl: "https://www.reptilandiazootexas.com/",
    reservationUrl: "https://www.reptilandiazootexas.com/tickets-memberships",
    address: "1859 N US Hwy 281, Johnson City, TX 78636",
    directions:
      "Reptilandia is on U.S. 281 north of Johnson City and south of the Exotic Resort Zoo. Use the official street address for navigation rather than routing only to downtown Johnson City.",
    accessibilityNotes:
      "The operator specifically advertises wheelchair-accessible paths and a temperature-controlled facility. Handicapped scooters are permitted, while recreational scooters and drones are not.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Use Reptilandia as the indoor anchor for a wildlife-focused Johnson City day, then pair it with the outdoor safari park or downtown museums depending on weather.",
      nearbyAttractions: [
        {
          name: "The Exotic Resort Zoo",
          description:
            "A large safari-style wildlife park with guided tractor tours, self-drive access, a petting zoo and onsite cabins.",
          proximity: "About 2 miles north",
          href: "/destination/exotic-resort-zoo-johnson-city",
        },
        {
          name: "Johnson City",
          description:
            "Downtown adds food, museums, the courthouse square and presidential-history sites.",
          proximity: "North edge of town",
          href: "/destination/johnson-city",
        },
        {
          name: "Science Mill",
          description:
            "Hands-on STEM exhibits provide another substantial indoor family attraction in town.",
          proximity: "Downtown Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
      ],
      foodAndDrink: [
        {
          name: "Downtown Johnson City",
          description:
            "Main Street restaurants and cafes are the easiest meal break between wildlife attractions.",
          proximity: "A few minutes south",
          href: "/destination/johnson-city",
        },
      ],
      lodging: [
        {
          name: "Johnson City",
          description:
            "Town lodging keeps Reptilandia, Science Mill, LBJ sites and restaurants within a compact radius.",
          proximity: "Nearby",
          href: "/destination/johnson-city",
        },
        {
          name: "Exotic Resort Zoo safari cabins",
          description:
            "Onsite wildlife lodging can turn a paired Reptilandia and safari-zoo visit into an overnight family trip.",
          proximity: "About 2 miles north",
          href: "/destination/exotic-resort-zoo-johnson-city",
        },
      ],
      neighborhoods: [
        {
          name: "North U.S. 281 wildlife corridor",
          description:
            "Reptilandia and the Exotic Resort Zoo form a compact animal-attraction corridor immediately north of Johnson City.",
          proximity: "At the zoo",
          href: "/destination/exotic-resort-zoo-johnson-city",
        },
      ],
      familyStops: [
        {
          name: "Science Mill",
          description:
            "Pair reptiles and amphibians with hands-on engineering, biology and technology exhibits.",
          proximity: "Downtown Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
        {
          name: "The Exotic Resort Zoo",
          description:
            "Add a large outdoor safari experience if weather and time allow.",
          proximity: "About 2 miles north",
          href: "/destination/exotic-resort-zoo-johnson-city",
        },
      ],
      sideTrips: [
        {
          name: "Blanco County",
          description:
            "Use the county guide to connect the wildlife attractions with Blanco, Pedernales Falls and the U.S. 290 corridor.",
          proximity: "Countywide",
          href: "/county/blanco",
        },
        {
          name: "Texas Hill Country",
          description:
            "Continue toward Fredericksburg, Stonewall, Dripping Springs or Blanco after the Johnson City family cluster.",
          proximity: "Regional",
          href: "/explore/region/hill-country",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Reptilandia gives the Texas Hill Country a specialized reptile-and-amphibian institution with substantial exhibit design, conservation research and all-weather family value rather than treating reptiles as a small side gallery inside a general zoo.",
      assessment: {
        recommendedVisit:
          "Plan 1.5 to 3 hours for a first visit; reptile enthusiasts may want longer to read exhibit material and examine the collection in depth.",
        physicalEffort: "Low",
        weatherExposure: "Mostly indoors",
        planningLevel: "Low",
        familyFit:
          "Excellent for families interested in animals, biology and conservation, especially during hot, cold or rainy weather.",
        firstTimeValue:
          "High because the specialized reptile focus and naturalistic exhibit scale are unusual for a small Hill Country town.",
      },
      itineraries: [
        {
          label: "Focused reptile visit",
          duration: "1.5–2.5 hours",
          steps: [
            "Verify the current Tuesday-Sunday 10 a.m.-5 p.m. schedule before departure.",
            "Move through the Temperate and Jungle buildings without rushing the larger habitats.",
            "Leave time for the ethnographic museum and conservation interpretation.",
          ],
        },
        {
          label: "Johnson City wildlife day",
          duration: "Full day",
          steps: [
            "Visit Reptilandia during the hotter or wetter part of the day.",
            "Take a meal break in Johnson City.",
            "Use the Exotic Resort Zoo for the outdoor safari block when weather is favorable.",
          ],
        },
        {
          label: "Indoor family day",
          duration: "Full day",
          steps: [
            "Start at Science Mill in downtown Johnson City.",
            "Break for lunch near the courthouse square.",
            "Spend the afternoon at Reptilandia for a second climate-controlled learning stop.",
          ],
        },
      ],
      sources: [
        {
          label: "Reptilandia – official site",
          url: "https://www.reptilandiazootexas.com/",
          scope:
            "Current mission, eight-biome model, climate-controlled exhibits, accessibility and conservation context.",
        },
        {
          label: "Reptilandia – explore the zoo",
          url: "https://www.reptilandiazootexas.com/explore",
          scope:
            "Current Temperate Building, Jungle Building, ethnographic museum and exhibit descriptions.",
        },
        {
          label: "Reptilandia – general information",
          url: "https://www.reptilandiazootexas.com/info",
          scope:
            "Current rain policy, feeding restrictions, visibility guidance and accessibility-related visitor rules.",
        },
        {
          label: "Reptilandia – founder",
          url: "https://www.reptilandiazootexas.com/quetzal-dwyer",
          scope:
            "Quetzal Dwyer's conservation background, research history and 2022 Johnson City founding.",
        },
        {
          label: "Explore Johnson City — family attractions",
          url: "https://explorejctx.com/family-fun-in-johnson-city-texas/",
          scope:
            "Local visitor confirmation of Reptilandia and Exotic Resort Zoo as Johnson City family attractions.",
        },
      ],
    },
    featured: false,
  },
];
