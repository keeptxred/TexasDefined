import { DESTINATION_PHOTO_PLACEHOLDER } from "./destination-hero-placeholder";
import type { Destination } from "./types";

export const buggyBarnBlancoDestinations: Destination[] = [
  {
    id: "museum-buggy-barn-blanco",
    brandId: "texasdefined",
    slug: "buggy-barn-museum-blanco",
    name: "Buggy Barn Museum",
    summary:
      "Buggy Barn Museum in Blanco preserves more than 250 historic buggies, carriages and wagons from the 1800s and 1900s, plus the Pine Moore Old West Studio behind the museum, where historic vehicles and Western sets are used for tours, events and film productions.",
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
    coordinates: { lat: 30.109159, lng: -98.417636 },
    hero: {
      src: DESTINATION_PHOTO_PLACEHOLDER,
      alt: "Buggy Barn Museum in Blanco — exact-location hero pending governed image clearance",
      width: 1600,
      height: 1067,
    },
    bestSeason:
      "Year-round. The core museum is indoors, while Pine Moore's Old West exterior is most comfortable in spring, fall and mild winter weather.",
    entryNote:
      "As reviewed September 20, 2026, the museum lists Monday-Friday hours of 9 a.m.-5 p.m., Saturday 9 a.m.-4 p.m. and Sunday closed. Admission is by donation with current suggested amounts of $15 for adults, $12 for military and seniors and $10 for children. Group rates are available. Verify hours and donation guidance on the official site before travel.",
    highlights: [
      "More than 250 historic buggies, carriages and wagons",
      "Vehicles dating from the 1800s through the 1900s",
      "Collection examples from 12 countries",
      "95% of the carriage collection described by the museum as original",
      "Vehicles used in major film and television productions",
      "Pine Moore Old West Studio directly behind the museum",
      "Self-guided museum interpretation plus guided group tours",
      "Gift shop, group visits and event/production rentals",
    ],
    body: [
      "Buggy Barn Museum is one of Blanco's most distinctive history attractions because the collection focuses on the transportation technology that shaped everyday life before automobiles. The museum currently describes more than 250 restored and preserved buggies, carriages and wagons from the nineteenth and early twentieth centuries, with vehicles representing 12 countries and a broad range of farm, passenger and specialty designs.",
      "The collection is useful even for visitors who are not carriage specialists because the displays make design differences visible at human scale. Farm wagons, elegant passenger carriages, surreys and specialized vehicles show how transportation changed with purpose, geography, craftsmanship and social status. The museum says 95% of its carriages are original, with reproduction parts used selectively when conservation requires them.",
      "The museum's connection to film and television gives the collection a second life beyond static display. The official site says vehicles from the collection have appeared in productions including True Grit, There Will Be Blood, Killers of the Flower Moon, 1883, 1923, The Chosen and others. That production role helps explain why the property also maintains a separate Old West filming environment rather than functioning only as a traditional gallery museum.",
      "Pine Moore Old West Studio sits directly behind the museum. Museum visitors can see the Western town exterior as part of a normal visit, while interior access, productions, weddings, parties, corporate events and professional photography are handled through separate arrangements. The property includes Western-style buildings and production spaces rather than a single museum hall.",
      "The museum recommends allowing at least two hours to see both the collection and the town. Because each buggy carries its own historical information, visitors can move independently without needing a fixed tour time; schools and other groups can also arrange guided visits and educational support.",
      "For a broader Blanco day, the museum pairs naturally with the historic courthouse square, Blanco State Park and Real Ale Brewing Company. That combination gives the town a strong mix of transportation history, civic architecture, river recreation and Made-in-Texas production without requiring a long drive between stops.",
    ],
    managingAuthority: "Buggy Barn Museum",
    officialUrl: "https://buggybarnmuseum.com/",
    address: "1915 Main Street, Blanco, TX 78606",
    directions:
      "The museum is on Main Street/U.S. 281 on the north side of Blanco. Use the official street address for navigation and allow extra time if your visit also includes the courthouse square or Blanco State Park.",
    accessibilityNotes:
      "The main museum uses gallery-style displays and welcomes school and group tours. Pine Moore includes outdoor and historic-set surfaces that may be less even. Contact the museum directly if your visit depends on specific mobility access, seating or group accommodations.",
    sourceCheckedAt: "2026-09-20",
    areaGuide: {
      intro:
        "Use Buggy Barn as Blanco's transportation-history anchor, then connect it with the courthouse square, river park and local brewery.",
      nearbyAttractions: [
        {
          name: "Blanco",
          description:
            "The town guide connects the museum with the courthouse square, river, restaurants and other Blanco stops.",
          proximity: "In town",
          href: "/destination/blanco",
        },
        {
          name: "Old Blanco County Courthouse",
          description:
            "The restored 1880s courthouse anchors the historic downtown square and visitor core.",
          proximity: "Downtown Blanco",
          href: "/destination/blanco",
        },
        {
          name: "Blanco State Park",
          description:
            "The compact state park follows the Blanco River with swimming, fishing, paddling and shaded picnic areas.",
          proximity: "Minutes from the museum",
          href: "/destination/blanco-state-park",
        },
        {
          name: "Real Ale Brewing Company",
          description:
            "A working Blanco brewery and distillery with taproom-only releases, tours, food and live music.",
          proximity: "Blanco",
          href: "/destination/real-ale-brewing-company-blanco",
        },
      ],
      foodAndDrink: [
        {
          name: "Downtown Blanco",
          description:
            "Restaurants and cafes around the courthouse square make the easiest meal stop before or after the museum.",
          proximity: "A short drive south",
          href: "/destination/blanco",
        },
        {
          name: "Real Ale Brewing Company",
          description:
            "Pair museum history with a working Made-in-Texas brewery and distillery.",
          proximity: "Blanco",
          href: "/destination/real-ale-brewing-company-blanco",
        },
      ],
      lodging: [
        {
          name: "Blanco",
          description:
            "Town and nearby Hill Country lodging keep the museum, courthouse square and state park within a compact radius.",
          proximity: "In town",
          href: "/destination/blanco",
        },
      ],
      neighborhoods: [
        {
          name: "North Main Street / U.S. 281",
          description:
            "Buggy Barn sits on Blanco's northern approach along the highway before the courthouse-square core.",
          proximity: "At the museum",
          href: "/destination/blanco",
        },
      ],
      familyStops: [
        {
          name: "Blanco State Park",
          description:
            "River access, swimming, fishing and picnic space give families an outdoor counterpoint to the museum.",
          proximity: "In Blanco",
          href: "/destination/blanco-state-park",
        },
        {
          name: "Pine Moore Old West Studio",
          description:
            "The Western-town exterior behind the museum adds a highly visual layer to the carriage collection.",
          proximity: "Onsite",
          href: "https://buggybarnmuseum.com/services/pine-moore-old-west-studio",
        },
      ],
      sideTrips: [
        {
          name: "Johnson City",
          description:
            "Continue north for Science Mill, LBJ history, the motorcycle museum and the wider Blanco County attraction cluster.",
          proximity: "North on U.S. 281",
          href: "/destination/johnson-city",
        },
        {
          name: "Blanco County",
          description:
            "Use the county guide for Hye, Johnson City, Pedernales River stops and the broader Hill Country network.",
          proximity: "Countywide",
          href: "/county/blanco",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Buggy Barn preserves a large pre-automobile transportation collection while keeping many of those vehicles active in film, television and event production, making it both a historical museum and a working source of period material culture.",
      assessment: {
        recommendedVisit:
          "Plan about 2 hours for the museum and Pine Moore exterior; history enthusiasts, photographers and organized groups may want longer.",
        physicalEffort: "Low",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Low",
        familyFit:
          "Strong for families interested in vehicles, Western history or film production, with enough visual variety to work for mixed-age groups.",
        firstTimeValue:
          "High for transportation-history and Old West interests because the collection scale and production connection are unusual for a small-town museum.",
      },
      itineraries: [
        {
          label: "Focused museum visit",
          duration: "2 hours",
          steps: [
            "Start with the indoor carriage and wagon galleries.",
            "Read the vehicle-specific interpretation rather than treating the collection as one large visual display.",
            "Finish with the Pine Moore exterior and gift shop.",
          ],
        },
        {
          label: "Blanco history half day",
          duration: "4–5 hours",
          steps: [
            "Visit Buggy Barn in the morning.",
            "Continue to the Old Blanco County Courthouse and downtown square.",
            "Use Blanco State Park or lunch downtown for the second half of the visit.",
          ],
        },
        {
          label: "Blanco County full day",
          duration: "Full day",
          steps: [
            "Use Buggy Barn as the morning history anchor.",
            "Add Blanco State Park or Real Ale Brewing Company depending on interests.",
            "Continue toward Johnson City or Hye for another county stop rather than backtracking.",
          ],
        },
      ],
      sources: [
        {
          label: "Buggy Barn Museum — Blanco",
          url: "https://buggybarnmuseum.com/locations/blanco",
          scope:
            "Current address, hours, suggested donation amounts, parking, recommended visit length and group-tour information.",
        },
        {
          label: "Buggy Barn Museum — About",
          url: "https://buggybarnmuseum.com/about",
          scope:
            "Collection size, date range, countries represented and film/television use.",
        },
        {
          label: "Buggy Barn Museum — Collection",
          url: "https://buggybarnmuseum.com/services/buggy-carriage-wagon-collection",
          scope:
            "Vehicle types, originality/conservation context, visitor experience and photography guidance.",
        },
        {
          label: "Buggy Barn Museum — Pine Moore Old West Studio",
          url: "https://buggybarnmuseum.com/services/pine-moore-old-west-studio",
          scope:
            "Current Old West studio, event and production-use context.",
        },
      ],
    },
    featured: false,
  },
];
