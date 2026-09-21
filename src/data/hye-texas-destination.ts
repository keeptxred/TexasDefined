import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-20";

export const hyeTexasDestinations: Destination[] = [
  {
    id: "small-town-hye",
    brandId: "texasdefined",
    slug: "hye",
    name: "Hye",
    summary:
      "Hye is a tiny Blanco County community on U.S. 290 where a landmark 1904 post office, Lyndon B. Johnson history, Garrison Brothers Distillery, major Texas wineries and the eastern Fredericksburg wine corridor come together in a compact Hill Country stop.",
    category: "small-towns",
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
    coordinates: { lat: 30.242486, lng: -98.570312 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hye%20Post%20Office%20Building%2C%20Hye%2C%20Texas%20%2848578618896%29.jpg?width=1600",
      alt: "Historic Hye Post Office building along U.S. 290 in Hye, Texas",
      width: 1600,
      height: 1067,
      credit: "Nicolas Henderson · Wikimedia Commons · CC BY 2.0",
    },
    bestSeason:
      "Fall through spring for the most comfortable U.S. 290 touring weather; spring adds wildflowers, while fall harvest and release weekends can make the wine-and-spirits corridor especially busy.",
    entryNote:
      "Hye is a small unincorporated community rather than a conventional downtown destination. Individual wineries, the distillery, the post office and nearby historic sites keep separate schedules, reservation policies and age rules, so build the day around confirmed stops rather than assuming everything will be open at the same time.",
    highlights: [
      "Hye Post Office — Recorded Texas Historic Landmark",
      "Garrison Brothers Distillery tours and tastings",
      "William Chris Vineyards",
      "Hye Meadow Winery",
      "U.S. 290 Hill Country wine corridor",
      "LBJ Ranch and Stonewall immediately west",
    ],
    body: [
      "Hye is small enough to miss at highway speed, but it sits at one of the most useful crossroads in the eastern Texas Hill Country. The community occupies the U.S. 290 corridor between Johnson City and Stonewall, putting it between Blanco County's county seat, the LBJ Ranch landscape and the larger Fredericksburg wine region.",
      "The Hye Post Office is the community's historic anchor. The Texas Historical Commission says Hiram “Hye” Brown founded a store here in 1880, the post office was established in 1886 and the present store building with its distinctive Bavarian-style pressed-metal facade dates to 1904. The site became a Recorded Texas Historic Landmark in 1966.",
      "The post office also has a direct Lyndon B. Johnson connection. The state marker records that Johnson mailed a letter here at age four and that President Johnson later used the post office as the setting for Lawrence F. O'Brien's 1965 swearing-in as U.S. Postmaster General. That history makes Hye a logical bridge between the Johnson City and LBJ Ranch portions of a presidential-history trip.",
      "Modern Hye is equally defined by Texas wine and spirits. Garrison Brothers operates a working bourbon distillery on ranch land north of U.S. 290, with guided grain-to-glass tours, tastings, food and special events. William Chris Vineyards farms estate vineyards in Hye and operates a major tasting destination, while Hye Meadow Winery adds another full winery-and-vineyard experience nearby.",
      "William Chris is especially important to Hye's current identity. The winery's current site says it farms its estate vineyards in Hye and maintains its primary visitor address on U.S. 290 here. In 2026, the company also established a home for Rebecca Caroline sparkling wine across the highway in the historic Hye Post Office, tying new wine tourism directly to the community's landmark building.",
      "Hye Meadow Winery reinforces the same pattern at a smaller scale. Its current visitor information describes a 42-acre oak-studded property with a tasting room, outdoor decks, production tours, food and a broad Texas-wine lineup. Together, William Chris, Hye Meadow and Garrison Brothers make Hye much more than a historical roadside marker.",
      "The best way to visit is as a geographic cluster rather than a checklist. Spend time at the historic post office, choose one or two reservation-based tasting or tour stops, and then continue west toward the LBJ Ranch and Stonewall or east toward Johnson City. That keeps the day compact and avoids unnecessary backtracking along one of the Hill Country's busiest tourism corridors.",
      "Drivers should also treat U.S. 290 as part of the planning problem. Wine, distillery and event weekends can create slower traffic and more turning movements than the rural setting suggests. If your group plans to drink, arrange a designated driver or organized transportation rather than building the itinerary around repeated self-driving tasting stops.",
    ],
    managingAuthority: "Blanco County community and individual historic/visitor sites",
    officialUrl: "https://atlas.thc.texas.gov/Details/5031002607",
    address: "Hye, TX 78635",
    directions:
      "Hye sits on U.S. 290 in western Blanco County, roughly between Johnson City and Stonewall. The historic Hye Post Office at 10261 W. U.S. 290 is the clearest geographic orientation point for the community.",
    accessibilityNotes:
      "Accessibility varies by property. The historic post office is an older building, while wineries and the distillery maintain their own visitor facilities and policies. Contact a specific stop directly if your visit depends on step-free access, seating or mobility assistance.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Use the historic post office as Hye's geographic anchor, then build one side of the day around Texas wine or bourbon and the other around LBJ history or Johnson City.",
      nearbyAttractions: [
        {
          name: "Hye Post Office",
          description:
            "A 1904 Recorded Texas Historic Landmark with direct Lyndon B. Johnson history and one of the most recognizable historic facades on U.S. 290.",
          proximity: "In Hye",
          href: "https://atlas.thc.texas.gov/Details/5031002607",
        },
        {
          name: "Garrison Brothers Distillery",
          description:
            "A working Texas bourbon distillery with tours, tastings, food, events and a ranch setting north of U.S. 290.",
          proximity: "Hye-Albert Road",
          href: "/destination/garrison-brothers-distillery-hye",
        },
        {
          name: "Lyndon B. Johnson National Historical Park",
          description:
            "The LBJ Ranch district near Stonewall and Johnson City district form the major history anchor immediately around Hye.",
          proximity: "Stonewall and Johnson City",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
      ],
      foodAndDrink: [
        {
          name: "William Chris Vineyards",
          description:
            "Major Hye estate winery with reservation-based tasting experiences and estate vineyards along U.S. 290.",
          proximity: "U.S. 290 in Hye",
          href: "/destination/william-chris-vineyards-hye",
        },
        {
          name: "Hye Meadow Winery",
          description:
            "A 42-acre winery property with tastings, production tours, small food offerings and outdoor space.",
          proximity: "U.S. 290 in Hye",
          href: "https://www.hyemeadow.com/",
        },
        {
          name: "Garrison Brothers Whiskey Shack",
          description:
            "Food and visitor hospitality on the Garrison Brothers ranch during published distillery hours.",
          proximity: "Garrison Brothers Distillery",
          href: "/destination/garrison-brothers-distillery-hye",
        },
      ],
      lodging: [
        {
          name: "Johnson City",
          description:
            "The nearest practical lodging and restaurant base to the east, with museums and family attractions for mixed-interest groups.",
          proximity: "East on U.S. 290",
          href: "/destination/johnson-city",
        },
        {
          name: "Stonewall and Fredericksburg corridor",
          description:
            "A larger lodging inventory to the west for travelers continuing deeper into Hill Country wine country.",
          proximity: "West on U.S. 290",
          href: "/destination/fredericksburg-texas-wineries-things-to-do-guide",
        },
      ],
      neighborhoods: [
        {
          name: "U.S. 290 Hye cluster",
          description:
            "The post office, wineries and highway-facing visitor stops form Hye's practical commercial and tourism core.",
          proximity: "Hye",
        },
        {
          name: "Hye-Albert Road",
          description:
            "Ranch-country side road leading north from the highway to Garrison Brothers and a quieter Blanco County landscape.",
          proximity: "North of U.S. 290",
          href: "/destination/garrison-brothers-distillery-hye",
        },
      ],
      familyStops: [
        {
          name: "Johnson City",
          description:
            "Science Mill, Reptilandia and other Johnson City attractions give families stronger all-ages options than a tasting-focused Hye itinerary.",
          proximity: "East on U.S. 290",
          href: "/destination/johnson-city",
        },
        {
          name: "LBJ Ranch",
          description:
            "A free self-guided National Park Service driving experience adds history and open landscape near Stonewall.",
          proximity: "West toward Stonewall",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
      ],
      sideTrips: [
        {
          name: "Johnson City",
          description:
            "Museums, food, the courthouse square and Pedernales River access create the strongest eastern companion stop.",
          proximity: "East",
          href: "/destination/johnson-city",
        },
        {
          name: "Fredericksburg",
          description:
            "Continue west for the largest concentration of wineries, museums, lodging, shopping and visitor services in the corridor.",
          proximity: "West",
          href: "/destination/fredericksburg-texas-wineries-things-to-do-guide",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Hye compresses several layers of Hill Country identity into a very small place: a landmark rural post office, presidential history, working Texas wine and bourbon production, and a strategic position between Johnson City, Stonewall and Fredericksburg.",
      assessment: {
        recommendedVisit:
          "Plan 3 to 6 hours if Hye is the main stop, or use it as a half-day cluster inside a larger Johnson City–Stonewall–Fredericksburg itinerary.",
        physicalEffort: "Low",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Moderate",
        familyFit:
          "Mixed. The historic and LBJ components work broadly, while many tasting experiences are adult-oriented and should be checked individually for child policies.",
        firstTimeValue:
          "High for travelers interested in Texas wine, bourbon, LBJ history or small Hill Country communities along U.S. 290.",
      },
      itineraries: [
        {
          label: "Historic Hye stop",
          duration: "1–2 hours",
          steps: [
            "Start at the Hye Post Office and read the state historical marker.",
            "Use the post office story to connect Hye with Lyndon B. Johnson and the nearby ranch district.",
            "Continue east to Johnson City or west to Stonewall without adding a tasting stop if time is limited.",
          ],
        },
        {
          label: "Hye wine-and-spirits half day",
          duration: "4–5 hours",
          steps: [
            "Reserve one major experience at Garrison Brothers, William Chris or Hye Meadow.",
            "Add the historic post office before or after the reservation.",
            "Choose only one additional tasting property rather than stacking multiple rushed stops.",
            "Use a designated driver or organized transportation if the itinerary includes alcohol.",
          ],
        },
        {
          label: "U.S. 290 history corridor",
          duration: "Full day",
          steps: [
            "Begin in Johnson City with LBJ or museum history.",
            "Stop in Hye for the post office and one wine or distillery experience.",
            "Continue west to the LBJ Ranch and Stonewall.",
            "Finish in Fredericksburg only if the day still has enough time for a meaningful stop rather than a drive-through.",
          ],
        },
      ],
      sources: [
        {
          label: "Texas Historical Commission — Hye Post Office",
          url: "https://atlas.thc.texas.gov/Details/5031002607",
          scope:
            "Historic marker, 1880 store founding, 1886 post office, 1904 building, LBJ connection and landmark status.",
        },
        {
          label: "Garrison Brothers — Visit Hye",
          url: "https://www.garrisonbros.com/visit-hye/",
          scope:
            "Current Hye distillery tours, hours, food service and visitor planning.",
        },
        {
          label: "William Chris Vineyards",
          url: "https://williamchriswines.com/",
          scope:
            "Current Hye estate address, visitor hours, vineyard identity and 2026 post-office expansion context.",
        },
        {
          label: "Hye Meadow Winery — Visit",
          url: "https://www.hyemeadow.com/pages/visit-us",
          scope:
            "Current Hye tasting hours, winery experiences, property description and visitor information.",
        },
        {
          label: "National Park Service — Lyndon B. Johnson National Historical Park",
          url: "https://www.nps.gov/lyjo/planyourvisit/index.htm",
          scope:
            "Current LBJ Ranch and Johnson City district relationship along the U.S. 290 corridor.",
        },
      ],
    },
    featured: false,
  },
];
