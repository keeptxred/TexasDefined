import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-19";

export const garrisonBrothersHyeDestinations: Destination[] = [
  {
    id: "distillery-garrison-brothers-hye",
    brandId: "texasdefined",
    slug: "garrison-brothers-distillery-hye",
    name: "Garrison Brothers Distillery",
    summary:
      "Garrison Brothers Distillery in Hye is a working Texas Hill Country bourbon distillery with guided grain-to-glass tours, a historic stillhouse and cookhouse, hand-dipping in the bottling room, private reserve tastings, onsite food and a visitor campus on working ranch land.",
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
    nearestTown: "Hye",
    county: "Blanco",
    coordinates: { lat: 30.230835, lng: -98.567619 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Garrison%20Brothers%20Stillhouse.jpg?width=1600",
      alt: "Garrison Brothers Distillery stillhouse in Hye, Texas",
      width: 5184,
      height: 3456,
      credit: "WiffleAdams · CC BY-SA 4.0 · Wikimedia Commons",
    },
    bestSeason:
      "Fall through spring for the most comfortable Hill Country touring weather; summer visits still work well but the ranch setting and walking portions make heat planning important.",
    entryNote:
      "As reviewed September 19, 2026, the distillery lists Tuesday-Thursday hours of 10 a.m.-4 p.m. and Friday-Saturday hours of 10 a.m.-6 p.m., with Sunday and Monday closed. Standard distillery tours are currently $10 per person Tuesday-Friday and $20 Saturday; schedules, pricing, special closures and event access can change, so use the live booking calendar before departure.",
    highlights: [
      "75-90-minute guided grain-to-glass distillery tour",
      "Historic Stillhouse, Cookhouse, Show Barn and barrel-barn stops",
      "Working Bottling Room where bottles are hand-dipped in wax",
      "Hye Reserve guided tasting for guests age 21+",
      "Whiskey Shack food and visitor campus",
      "Working-ranch Hill Country setting along the Hye / U.S. 290 corridor",
      "Distillery history dating to 2006 with public visitation since 2008",
      "Exact-location Hill Country stop between Johnson City and Stonewall/Fredericksburg",
    ],
    body: [
      "Garrison Brothers Distillery is one of the defining production stops on the eastern Texas Hill Country wine-and-spirits corridor. The company was founded in 2006 by Dan and Nancy Garrison, opened the Hye distillery to the public in 2008 and began bringing its bourbon to market in 2010. The operation remains rooted on working ranch land rather than a city tasting-room footprint.",
      "The standard visitor experience is a 75- to 90-minute guided tour built around how the bourbon is made. The current route starts near the planked-cabin gift shop and tasting room, moves uphill through the production property and includes the Show Barn, Stillhouse, Cookhouse, Bottling Room and the original barrel barn known as Uno. The operator currently includes samples along the way and a Small Batch pour for guests who may legally drink.",
      "The Bottling Room is a distinctive part of the production story because Garrison Brothers still highlights hand-dipped wax as part of its finishing process. The distillery also runs volunteer bottling opportunities at selected times, giving visitors a more direct look at the labor behind packaging than a conventional tasting-room stop provides.",
      "Visitors who want a deeper tasting can reserve the Hye Reserve experience, which the distillery currently lists at $70 per person with only 10 seats per session. That tasting is explicitly 21+ and includes small pours of several premium expressions, while the standard distillery tour itself currently welcomes children accompanied by adults and leashed dogs.",
      "The campus has enough depth to support more than a single tour slot. The Whiskey Shack serves food during published visitor hours, the gift shop operates with the distillery, and the company schedules release days, cookouts, holiday programming and other public events throughout the year. Special-event dates can replace or interrupt normal tours, so the live visit page should control the final schedule.",
      "Garrison Brothers is also valuable geographically. Hye sits on the U.S. 290 corridor between Johnson City and Stonewall/Fredericksburg, which makes the distillery easy to combine with LBJ sites, wineries, small-town stops and the broader Blanco/Gillespie County road-trip network. It works especially well as one anchored reservation inside a larger Hill Country day rather than as an isolated out-and-back drive.",
      "The distillery's official materials describe it as Texas' first legal bourbon distillery. Texas Defined treats that as the operator's historical claim and focuses the visitor guide on verifiable current access, production history and trip planning rather than turning marketing language into an independent ranking.",
    ],
    managingAuthority: "Garrison Brothers Distillery",
    officialUrl: "https://www.garrisonbros.com/visit-hye/",
    reservationUrl: "https://www.garrisonbros.com/visit-hye/",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    address: "1827 Hye-Albert Rd, Hye, TX 78635",
    directions:
      "The distillery is in Hye on Hye-Albert Road north of U.S. 290, west of Johnson City and east of Stonewall. Use the official address and current navigation because Hill Country ranch roads and event traffic can affect the final approach.",
    accessibilityNotes:
      "The standard tour crosses an active working-distillery and ranch property and includes walking between production areas. Contact the distillery before booking if your visit depends on specific mobility, seating or transportation accommodations.",
    areaGuide: {
      intro:
        "Treat Garrison Brothers as an eastern Hill Country anchor: reserve the production experience first, then connect it with Johnson City, LBJ country, Hye/Stonewall and the U.S. 290 corridor.",
      nearbyAttractions: [
        {
          name: "Lyndon B. Johnson State Park and Historic Site",
          description:
            "Living-history ranch interpretation and the Sauer-Beckmann farm add Hill Country history near the Stonewall side of the corridor.",
          proximity: "West toward Stonewall",
          href: "/destination/lyndon-b-johnson-state-park-and-historic-site",
        },
        {
          name: "Lyndon B. Johnson National Historical Park",
          description:
            "Combine the Hye stop with the LBJ Ranch or Johnson City district for a fuller presidential-history itinerary.",
          proximity: "Johnson City and Stonewall districts",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
        {
          name: "Johnson City",
          description:
            "Museums, wildlife attractions, river access, restaurants and the Blanco County courthouse make Johnson City the strongest nearby multi-attraction base.",
          proximity: "East on U.S. 290",
          href: "/destination/johnson-city",
        },
      ],
      foodAndDrink: [
        {
          name: "Whiskey Shack",
          description:
            "The distillery's onsite food option operates during published visitor hours and is the easiest way to keep a tour day on one campus.",
          proximity: "Onsite",
          href: "https://www.garrisonbros.com/visit-hye/",
        },
        {
          name: "Hye and U.S. 290 corridor",
          description:
            "Wineries and tasting properties along the Hye-Stonewall-Johnson City corridor make it possible to build a full food-and-drink itinerary without returning to a metro area.",
          proximity: "Along U.S. 290",
          href: "/article/fredericksburg-texas-wineries-things-to-do-guide",
        },
      ],
      lodging: [
        {
          name: "Johnson City",
          description:
            "A practical eastern base for Garrison Brothers, Science Mill, LBJ history and Blanco County attractions.",
          proximity: "East of Hye",
          href: "/destination/johnson-city",
        },
        {
          name: "Fredericksburg and the U.S. 290 corridor",
          description:
            "A larger lodging inventory works well for travelers combining the distillery with multiple winery and Hill Country stops.",
          proximity: "West toward Fredericksburg",
          href: "/article/fredericksburg-texas-wineries-things-to-do-guide",
        },
      ],
      neighborhoods: [
        {
          name: "Hye / eastern Wine Road 290",
          description:
            "A rural cluster of ranchland, wineries, tasting rooms and production destinations between Johnson City and Stonewall.",
          proximity: "At the distillery",
          href: "/county/blanco",
        },
      ],
      familyStops: [
        {
          name: "Science Mill",
          description:
            "A hands-on STEM museum in Johnson City gives mixed-age groups a substantial non-alcohol-focused companion attraction.",
          proximity: "Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
        {
          name: "LBJ State Park and Historic Site",
          description:
            "Living-history farm interpretation and open Hill Country grounds work well for multigenerational groups.",
          proximity: "Stonewall area",
          href: "/destination/lyndon-b-johnson-state-park-and-historic-site",
        },
      ],
      sideTrips: [
        {
          name: "Blanco County",
          description:
            "Connect Hye with Johnson City, Blanco, the Pedernales River and the county's wider Hill Country history.",
          proximity: "Same county",
          href: "/county/blanco",
        },
        {
          name: "Fredericksburg wine country",
          description:
            "Continue west through Stonewall into the denser winery and visitor corridor around Fredericksburg.",
          proximity: "West on U.S. 290",
          href: "/article/fredericksburg-texas-wineries-things-to-do-guide",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Garrison Brothers combines a working production site, a documented early chapter in Texas bourbon, a ranch-scale Hill Country setting and bookable visitor experiences, making it substantially more useful to travelers than a simple tasting-room listing.",
      assessment: {
        recommendedVisit:
          "Plan about 2 hours for a standard tour and campus time; allow 3 hours or more for a combined tour-and-tasting experience, food and gift-shop time.",
        physicalEffort: "Low to moderate",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Moderate",
        familyFit:
          "Standard tours currently welcome children with adults, but alcohol service is age-restricted and the Hye Reserve tasting is 21+ only; mixed-age groups should confirm the exact experience before booking.",
        firstTimeValue:
          "High for visitors interested in Texas-made products, distilling, Hill Country food-and-drink travel or the U.S. 290 corridor.",
      },
      itineraries: [
        {
          label: "Standard distillery visit",
          duration: "2 hours",
          steps: [
            "Reserve a current tour time before making the drive to Hye.",
            "Arrive early enough for check-in and the visitor campus.",
            "Take the 75-90-minute production tour through the main distillery buildings.",
            "Leave time for the Whiskey Shack and gift shop after the tour.",
          ],
        },
        {
          label: "Production and tasting visit",
          duration: "3–4 hours",
          steps: [
            "Book a tour-and-tasting package or compatible current reservation times.",
            "Use the production tour for process and site context first.",
            "Move into the guided reserve tasting only if every participant meets the 21+ requirement.",
            "Build in food and non-driving time before continuing the Hill Country route.",
          ],
        },
        {
          label: "Hye and LBJ country day",
          duration: "Full day",
          steps: [
            "Anchor the morning or early afternoon around a Garrison Brothers reservation.",
            "Continue toward Stonewall for LBJ State Park or the LBJ Ranch district.",
            "Use Johnson City or the U.S. 290 corridor for food, museums or additional tasting-room stops.",
            "Keep a designated driver or lodging plan if the day includes alcohol service at multiple stops.",
          ],
        },
      ],
      sources: [
        {
          label: "Garrison Brothers — Visit Hye",
          url: "https://www.garrisonbros.com/visit-hye/",
          scope:
            "Current distillery hours, standard-tour times, pricing, tour length, food service, pet/child guidance and special closures.",
        },
        {
          label: "Garrison Brothers — Our Distillery",
          url: "https://www.garrisonbros.com/our-distillery/",
          scope:
            "Public-opening history, ranch setting, production campus and current visitor structure.",
        },
        {
          label: "Garrison Brothers — Hye Reserve Tasting",
          url: "https://www.garrisonbros.com/hye-reserve/",
          scope:
            "Current 21+ tasting format, capacity, pricing and published tasting times.",
        },
        {
          label: "Garrison Brothers — Tour and Tasting",
          url: "https://www.garrisonbros.com/tour-and-tasting-package/",
          scope:
            "Combined tour-and-tasting structure and current production-tour description.",
        },
        {
          label: "Garrison Brothers — official press center",
          url: "https://www.garrisonbros.com/press/press-releases/garrison-brothers-distillery-announces-the-2025-laguna-madre-release/",
          scope:
            "Founding year, first-market year and official Hye distillery address.",
        },
        {
          label: "Wikimedia Commons — Garrison Brothers Stillhouse",
          url: "https://commons.wikimedia.org/wiki/File:Garrison_Brothers_Stillhouse.jpg",
          scope:
            "Exact-location hero photograph and CC BY-SA 4.0 license provenance.",
        },
      ],
    },
    featured: true,
  },
];
