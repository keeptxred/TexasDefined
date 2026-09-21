import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-21";

export const oldBlancoCountyCourthouseDestinations: Destination[] = [
  {
    id: "historic-old-blanco-county-courthouse",
    brandId: "texasdefined",
    slug: "old-blanco-county-courthouse",
    name: "Old Blanco County Courthouse",
    summary:
      "The Old Blanco County Courthouse anchors downtown Blanco with an 1886 Second Empire courthouse, a visitor center and museum, preservation history, monthly Market Day and one of the clearest physical links between Blanco and Johnson City's shared county-seat story.",
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
    coordinates: { lat: 30.097056, lng: -98.421599 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Blanco%20County%20Courthouse%20(Old),%20Blanco,%20Texas%20(8690726883).jpg?width=1600",
      alt: "Old Blanco County Courthouse on the courthouse square in Blanco, Texas",
      width: 1600,
      height: 1067,
      credit: "Nicolas Henderson · Wikimedia Commons · CC BY 2.0",
    },
    bestSeason:
      "Fall through spring for comfortable courthouse-square walking; March through December adds the recurring third-Saturday Blanco Market Day. Summer visits work well as a shorter history stop paired with the nearby Blanco River.",
    entryNote:
      "As reviewed September 21, 2026, the courthouse visitor center and museum list Monday-Saturday hours of 10 a.m.-4 p.m. and Sunday hours of noon-4 p.m. The preservation society does not publish a general museum admission price on its current homepage, so do not assume a fee or a free-admission policy without checking. Blanco Market Day is currently held on the courthouse grounds on the third Saturday from March through December, with seasonal hour adjustments published by the organizer.",
    highlights: [
      "1886 Second Empire courthouse designed by Frederick Ernst Ruffini",
      "Former Blanco County seat before government moved to Johnson City in 1890",
      "Current visitor center and museum",
      "Restored historic courtroom and courthouse grounds",
      "Blanco Market Day on the courthouse square",
      "Preservation story led by the Old Blanco County Courthouse Preservation Society",
      "Walkable connection to downtown Blanco",
      "Easy pairing with Blanco State Park and Real Ale Brewing",
    ],
    body: [
      "The Old Blanco County Courthouse is the strongest single place to understand why Blanco and Johnson City are tied together. The limestone courthouse was built in 1885-1886 and accepted for county use on January 29, 1886, but it served as the official courthouse for only four years before a 1890 election moved the Blanco County seat to Johnson City.",
      "Architect Frederick Ernst Ruffini gave the building a distinctive Second Empire form that remains the visual center of Blanco's square. That architecture matters on its own, but the building's unusual afterlife makes the site more than a preserved shell from the courthouse era.",
      "After county government left, the courthouse repeatedly adapted to local needs. The preservation society's history records periods as offices, school space, banking space, a town hall, theater and opera house, library, community gathering place and hospital. Those layers make the building a compact record of how a small Hill Country town reused its most substantial civic structure instead of abandoning it.",
      "Modern preservation is another major part of the story. The Old Blanco County Courthouse Preservation Society formed in 1986 to acquire, restore and operate the building, and the courthouse continues to function as a historic site, museum, visitor center and event venue. That active use helps the square remain a visitor anchor rather than treating preservation as a finished project.",
      "Current visitor hours make the courthouse unusually easy to fit into a Blanco day. The museum and visitor center are currently open seven days a week on a published schedule, while the grounds support Blanco Market Day on the third Saturday from March through December. Market weekends can materially change parking and foot traffic around the square, so they are either a feature to plan for or a reason to choose another day.",
      "The courthouse is also the correct starting point for a Blanco walking block. The historic square puts shops, food and civic architecture close together, while Blanco State Park sits only a short distance south along the river. Real Ale Brewing adds a working brewery and distillery north of the center, making it possible to combine history, water recreation and a Made-in-Texas producer without leaving the town area.",
      "For county-level context, pair this page with Johnson City's current Blanco County Courthouse and the county guide. Seeing both towns explains the nineteenth-century county-seat shift far more clearly than a sentence in a general history article, and it gives travelers a reason to explore both halves of Blanco County rather than treating U.S. 281 as only a pass-through route.",
    ],
    managingAuthority: "Old Blanco County Courthouse Preservation Society",
    officialUrl: "https://www.historicblanco.org/",
    address: "300 Main St, Blanco, TX 78606",
    directions:
      "The courthouse anchors the central square in downtown Blanco near U.S. 281. Parking is available around the square, but Market Day and special events can change access and demand.",
    accessibilityNotes:
      "This is a historic nineteenth-century building with active preservation work. The official visitor pages do not make a broad promise about every interior route or event configuration, so contact the preservation society before travel if a visit depends on a specific mobility accommodation.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Start at the courthouse to understand Blanco's civic history, then choose the river, Real Ale or a wider Hill Country drive as the second major block.",
      nearbyAttractions: [
        {
          name: "Blanco",
          description:
            "The town guide connects the courthouse with the river, historic square, food, lodging and broader Blanco planning.",
          proximity: "Downtown",
          href: "/destination/blanco",
        },
        {
          name: "Blanco State Park",
          description:
            "A compact in-town state park on the Blanco River with swimming, fishing, paddling and picnicking when conditions allow.",
          proximity: "South of downtown",
          href: "/destination/blanco-state-park",
        },
        {
          name: "Real Ale Brewing Company",
          description:
            "A working Blanco brewery and distillery with taproom service, free Friday brewery tours, food and live music.",
          proximity: "North on U.S. 281",
          href: "/destination/real-ale-brewing-company-blanco",
        },
      ],
      foodAndDrink: [
        {
          name: "Blanco courthouse square",
          description:
            "The downtown square and nearby U.S. 281 blocks contain the most walkable concentration of local food and visitor services.",
          proximity: "Walkable",
          href: "/destination/blanco",
        },
        {
          name: "Real Ale Taproom & Beer Garden",
          description:
            "Blanco-made beer and spirits add a production-focused stop to a courthouse-and-river itinerary.",
          proximity: "North of downtown",
          href: "/destination/real-ale-brewing-company-blanco",
        },
      ],
      lodging: [
        {
          name: "Blanco",
          description:
            "Local inns, guesthouses and Hill Country stays keep the courthouse square and state park close.",
          proximity: "Local",
          href: "/destination/blanco",
        },
        {
          name: "Johnson City and Blanco County",
          description:
            "Johnson City expands museum, event and dining options while staying within the same county trip.",
          proximity: "North on U.S. 281",
          href: "/county/blanco",
        },
      ],
      neighborhoods: [
        {
          name: "Historic courthouse square",
          description:
            "Blanco's walkable civic center, with the old courthouse as the visual and historical anchor.",
          proximity: "Onsite",
        },
      ],
      familyStops: [
        {
          name: "Blanco State Park",
          description:
            "A straightforward outdoor companion for families when river and weather conditions are suitable.",
          proximity: "Minutes away",
          href: "/destination/blanco-state-park",
        },
        {
          name: "Science Mill",
          description:
            "A larger indoor family attraction in Johnson City for a countywide history-and-science day.",
          proximity: "Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
      ],
      sideTrips: [
        {
          name: "Johnson City",
          description:
            "See the current county seat, LBJ history, museums and the other half of Blanco County's courthouse story.",
          proximity: "North on U.S. 281",
          href: "/destination/johnson-city",
        },
        {
          name: "Hye",
          description:
            "Continue into the U.S. 290 wine-and-bourbon corridor for another distinct Blanco County visitor cluster.",
          proximity: "Northwest",
          href: "/destination/hye",
        },
        {
          name: "Blanco County",
          description:
            "Use the county guide to connect Blanco, Johnson City, Hye, rivers, state parks and historic sites.",
          proximity: "Countywide",
          href: "/county/blanco",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "The courthouse turns Blanco County's seat-of-government history into a visitable place, while its long reuse as school, offices, bank, cultural space and hospital gives downtown Blanco a durable heritage anchor rather than a decorative square alone.",
      assessment: {
        recommendedVisit:
          "Plan 45 to 90 minutes for the building, museum and square; allow 2 to 3 hours when combining the stop with Market Day or an unhurried downtown walk.",
        physicalEffort: "Low",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Low",
        familyFit:
          "Good as a short history stop, especially when paired with Blanco State Park; children who need a more interactive destination may get more value from adding Science Mill in Johnson City.",
        firstTimeValue:
          "High for first-time Blanco visitors because the courthouse explains the town's architecture, county-seat history and modern square in one stop.",
      },
      itineraries: [
        {
          label: "Courthouse orientation stop",
          duration: "45–90 minutes",
          steps: [
            "Start inside the visitor center and museum during published hours.",
            "Look at the courthouse architecture and square before leaving the building.",
            "Use the square to decide whether the next block should be downtown food or the Blanco River.",
          ],
        },
        {
          label: "Blanco half day",
          duration: "4–5 hours",
          steps: [
            "Begin at the Old Blanco County Courthouse and historic square.",
            "Move to Blanco State Park for a separate river block if current conditions are good.",
            "Finish with food downtown or a Real Ale stop north of town.",
          ],
        },
        {
          label: "Two-courthouse Blanco County day",
          duration: "Full day",
          steps: [
            "Start at the old courthouse in Blanco and learn why the county seat moved.",
            "Drive north to Johnson City for the current county courthouse and LBJ or museum stops.",
            "Use the county guide to add Hye or a Pedernales stop only if time remains.",
          ],
        },
      ],
      sources: [
        {
          label: "Old Blanco County Courthouse — Home",
          url: "https://www.historicblanco.org/",
          scope:
            "Current visitor-center and museum hours, preservation organization and recurring courthouse use.",
        },
        {
          label: "Old Blanco County Courthouse — History",
          url: "https://www.historicblanco.org/history",
          scope:
            "1885-1886 construction, Frederick Ernst Ruffini design, 1890 county-seat move and the building's later community uses.",
        },
        {
          label: "Old Blanco County Courthouse — About",
          url: "https://www.historicblanco.org/about",
          scope:
            "Current preservation mission, Second Empire significance, courtroom/grounds use and society stewardship.",
        },
        {
          label: "Old Blanco County Courthouse — Market Day",
          url: "https://www.historicblanco.org/market-day",
          scope:
            "Current third-Saturday March-December schedule, 2026 dates and seasonal market hours.",
        },
        {
          label: "Wikimedia Commons — Old Blanco County Courthouse",
          url: "https://commons.wikimedia.org/wiki/File:Blanco_County_Courthouse_(Old),_Blanco,_Texas_(8690726883).jpg",
          scope:
            "Exact-subject 5,184×3,456 courthouse photograph licensed CC BY 2.0.",
        },
      ],
    },
    featured: true,
  },
];
