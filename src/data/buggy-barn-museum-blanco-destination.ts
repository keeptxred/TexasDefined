import { DESTINATION_PHOTO_PLACEHOLDER } from "./destination-hero-placeholder";
import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-24";

export const buggyBarnMuseumBlancoDestinations: Destination[] = [
  {
    id: "museum-buggy-barn-blanco",
    brandId: "texasdefined",
    slug: "buggy-barn-museum-blanco",
    name: "Buggy Barn Museum",
    summary:
      "Buggy Barn Museum in Blanco combines more than 250 historic buggies, carriages and wagons with the Pine Moore Old West Studio, film-production history, guided tours, school-group programming and one of the Hill Country's most unusual transportation-history collections.",
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
    coordinates: { lat: 30.1106, lng: -98.4178 },
    hero: {
      src: DESTINATION_PHOTO_PLACEHOLDER,
      alt: "Buggy Barn Museum and Pine Moore Old West Studio in Blanco — exact-location hero pending governed image clearance",
      width: 1600,
      height: 1067,
    },
    bestSeason:
      "Year-round. The core collection is indoors, while the Pine Moore Old West setting adds outdoor walking that is most comfortable in spring and fall or during cooler parts of summer days.",
    entryNote:
      "As reviewed September 24, 2026, the museum lists Monday-Friday hours of 9 a.m.-5 p.m., Saturday 9 a.m.-4 p.m. and Sunday closed. Admission is described as by donation with suggested amounts of $15 adults, $12 military/seniors and $10 children. The museum recommends allowing at least two hours for the collection and Old West town. Recheck the official visit page before a dedicated drive because hours, group access and suggested donations can change.",
    highlights: [
      "250+ historic buggies, carriages and wagons",
      "Vehicles spanning the 1800s through the 1900s",
      "Collection representing 12 countries",
      "Pine Moore Old West Studio behind the museum",
      "Film and television production connections",
      "Self-guided vehicle histories and guided group tours",
      "School and educational group visits",
      "Gift shop, event and production-rental facilities",
    ],
    body: [
      "Buggy Barn Museum is one of Blanco's most distinctive attractions because it combines a serious transportation-history collection with a functioning film and event environment. The museum sits on Main Street north of downtown and currently advertises more than 250 historic buggies, carriages and wagons from the nineteenth and twentieth centuries.",
      "The collection is broader than a single row of stagecoaches. The museum says the vehicles come from 12 countries and represent many different uses of horse-drawn transportation. Individual histories are displayed with the vehicles, which lets visitors tour at their own pace while still understanding why specific designs existed and how they were used.",
      "The museum's film connection gives the collection another layer of relevance. Its official materials say vehicles from the collection have appeared in productions including True Grit, Killers of the Flower Moon, 1883, 1923, The Chosen and other films and series. The Texas Film Commission separately documents the Buggy Barn as a Texas Westerns Film Trail location and specifically describes its use in the 2010 True Grit production, giving that part of the story an authoritative state source beyond the museum's own marketing.",
      "Behind the collection sits Pine Moore Old West Studio, a purpose-built Western town used for film productions, photo shoots, weddings, corporate events and private gatherings. The museum describes period storefronts, a saloon, church, jail, marshal's office, stables and other Western-set elements, making the visit feel partly like a museum and partly like a working location complex.",
      "The current visitor model is flexible. Guests can self-guide through the collection, while schools and groups can arrange guided tours and educational materials. The museum recommends about two hours for the museum and town, which is a more realistic planning block than treating it as a quick roadside curiosity.",
      "Photography rules matter because the property is also a commercial production location. The museum currently welcomes non-commercial personal photography but asks professional and commercial photographers to arrange permission in advance. Texas Defined therefore keeps this destination image-gated until a commercially reusable exact-location hero is secured rather than republishing a visitor or promotional photo without permission.",
      "Buggy Barn works especially well in a Blanco family or history itinerary. The Old Blanco County Courthouse and downtown square provide nineteenth-century civic history, Blanco State Park adds the river, and Real Ale Brewing gives adult travelers a Made-in-Texas production stop. Twin Sisters Dance Hall can turn the same day into an evening music itinerary when a public dance is scheduled.",
    ],
    managingAuthority: "Buggy Barn Museum",
    officialUrl: "https://buggybarnmuseum.com/",
    address: "1915 Main Street, Blanco, TX 78606",
    directions:
      "The museum is on Main Street/U.S. 281 north of downtown Blanco. Use the published 1915 Main Street address; onsite parking is available according to the museum's current visitor page.",
    accessibilityNotes:
      "The museum welcomes school and group tours but does not publish a comprehensive physical-accessibility inventory for every gallery and Pine Moore structure. Contact the museum before travel if a visit depends on a specific mobility accommodation or interior-access arrangement.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Use Buggy Barn as the major indoor history stop on the north side of Blanco, then combine it with the courthouse square, river or a scheduled Twin Sisters dance.",
      nearbyAttractions: [
        {
          name: "Old Blanco County Courthouse",
          description:
            "The 1886 former courthouse anchors Blanco's historic square and explains the town's role as the county's original seat.",
          proximity: "Downtown Blanco",
          href: "/destination/old-blanco-county-courthouse",
        },
        {
          name: "Blanco State Park",
          description:
            "An in-town river park with swimming, fishing, paddling and shaded picnic areas when current conditions allow.",
          proximity: "South of downtown",
          href: "/destination/blanco-state-park",
        },
        {
          name: "Twin Sisters Dance Hall",
          description:
            "A still-operating historic dance hall south of Blanco with public first-Saturday dances and special events.",
          proximity: "South on U.S. 281",
          href: "/destination/twin-sisters-dance-hall-blanco",
        },
      ],
      foodAndDrink: [
        {
          name: "Downtown Blanco",
          description:
            "Restaurants and cafes around the square make the easiest meal stop before or after the museum.",
          proximity: "South",
          href: "/destination/blanco",
        },
        {
          name: "Real Ale Brewing Company",
          description:
            "A working local brewery and distillery with taproom service, tours, food and a shaded beer garden.",
          proximity: "Blanco",
          href: "/destination/real-ale-brewing-company-blanco",
        },
      ],
      lodging: [
        {
          name: "Blanco",
          description:
            "Local inns and Hill Country stays keep the museum, courthouse square and state park close together.",
          proximity: "Local",
          href: "/destination/blanco",
        },
        {
          name: "Johnson City and Blanco County",
          description:
            "Johnson City expands the museum and dining inventory for a full county weekend.",
          proximity: "North",
          href: "/county/blanco",
        },
      ],
      neighborhoods: [
        {
          name: "North Main / U.S. 281",
          description:
            "The museum sits on the north side of Blanco along the highway corridor leading toward Johnson City.",
          proximity: "Onsite",
        },
      ],
      familyStops: [
        {
          name: "Pine Moore Old West Studio",
          description:
            "The Western-town setting adds visual variety and film-production context beyond the indoor vehicle collection.",
          proximity: "Behind the museum",
          href: "https://buggybarnmuseum.com/services/pine-moore-old-west-studio",
        },
        {
          name: "Blanco State Park",
          description:
            "A natural outdoor counterpoint to the museum when weather and river conditions cooperate.",
          proximity: "Blanco",
          href: "/destination/blanco-state-park",
        },
      ],
      sideTrips: [
        {
          name: "Twin Sisters Dance Hall",
          description:
            "Turn a daytime Blanco history trip into an evening dance-hall itinerary when a public event is scheduled.",
          proximity: "South",
          href: "/destination/twin-sisters-dance-hall-blanco",
        },
        {
          name: "Johnson City",
          description:
            "Continue north for Science Mill, LBJ history and the county's larger museum cluster.",
          proximity: "North on U.S. 281",
          href: "/destination/johnson-city",
        },
        {
          name: "Blanco County",
          description:
            "Use the county guide to connect Blanco with Johnson City, Hye and the Pedernales corridor.",
          proximity: "Countywide",
          href: "/county/blanco",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Buggy Barn combines a large horse-drawn transportation collection with documented film-production use and an operating Old West studio, giving Blanco a museum experience that connects transportation, material culture and Texas screen history.",
      assessment: {
        recommendedVisit:
          "Allow about 2 hours for the collection and Pine Moore setting; add more time for a guided group visit or visitors who want to read the history attached to individual vehicles.",
        physicalEffort: "Low to moderate",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Low",
        familyFit:
          "Strong for families interested in vehicles, Western history or movie production, with enough visual variety to work better than a purely text-heavy local-history museum for many children.",
        firstTimeValue:
          "High for Blanco visitors because the collection is unusual enough to justify a dedicated stop rather than serving as filler between the courthouse and river.",
      },
      itineraries: [
        {
          label: "First museum visit",
          duration: "2 hours",
          steps: [
            "Start with the main buggy, carriage and wagon collection.",
            "Read the histories on the vehicles that connect most strongly to transportation or film interests.",
            "Use the remaining time for the Pine Moore Old West setting and gift shop.",
          ],
        },
        {
          label: "Blanco history half day",
          duration: "4–5 hours",
          steps: [
            "Begin at Buggy Barn while the museum is open.",
            "Drive south to the Old Blanco County Courthouse and walk the historic square.",
            "Finish with lunch, the river or Real Ale depending on the group.",
          ],
        },
        {
          label: "Family day plus dance night",
          duration: "Full day",
          steps: [
            "Use Buggy Barn as the main morning or early-afternoon attraction.",
            "Give Blanco State Park or downtown its own separate block.",
            "When a public dance is confirmed, finish the day at Twin Sisters rather than adding another museum.",
          ],
        },
      ],
      sources: [
        {
          label: "Buggy Barn Museum — Blanco visitor page",
          url: "https://buggybarnmuseum.com/locations/blanco",
          scope:
            "Current hours, suggested admission, address, parking, visit length, guided tours and group information.",
        },
        {
          label: "Buggy Barn Museum — About",
          url: "https://buggybarnmuseum.com/about",
          scope:
            "Current 250+ vehicle collection, 12-country scope, preservation mission and film/television connections.",
        },
        {
          label: "Buggy Barn Museum — Pine Moore Old West Studio",
          url: "https://buggybarnmuseum.com/services/pine-moore-old-west-studio",
          scope:
            "Current Old West set features, production/event uses and photography/editorial-shoot context.",
        },
        {
          label: "Texas Film Commission — Buggy Barn Museum",
          url: "https://gov.texas.gov/film/trail/buggy-barn-museum",
          scope:
            "State-level Texas Westerns Film Trail context and documented use of the museum/vehicles in the 2010 True Grit production.",
        },
        {
          label: "Texas Historical Commission Atlas — Buggy Barn Museum",
          url: "https://atlas.thc.texas.gov/Details/4200001105",
          scope:
            "Museum identity, address, county, phone and historical museum-directory record.",
        },
      ],
    },
    featured: true,
  },
];
