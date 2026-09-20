import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-19";

export const johnsonCityAuthorityDestinations: Destination[] = [
  {
    id: "small-town-johnson-city",
    brandId: "texasdefined",
    slug: "johnson-city",
    name: "Johnson City",
    summary:
      "Johnson City is a compact Texas Hill Country town where Lyndon B. Johnson history, the Blanco County courthouse square, hands-on science, vintage motorcycles, wine-country routes and easy access to the Pedernales corridor fit into one unusually dense small-town itinerary.",
    category: "small-towns",
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
    coordinates: { lat: 30.2769, lng: -98.4117 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Blanco%20courthouse.jpg?width=1600",
      alt: "Blanco County Courthouse in downtown Johnson City, Texas",
      width: 2030,
      height: 1202,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    },
    bestSeason:
      "Fall through spring for downtown walking, presidential-history sites and Hill Country drives; late November and December add Johnson City's major holiday-light season, while summer works best with indoor museum breaks and early outdoor time.",
    entryNote:
      "Johnson City itself does not require admission, but museums, tasting rooms and individual attractions keep separate schedules. The National Park Service Johnson City district and Science Mill are substantial enough to plan around, and seasonal events can materially change traffic and parking around the courthouse square.",
    highlights: [
      "Blanco County Courthouse and walkable downtown core",
      "Lyndon B. Johnson National Historical Park — Johnson City district",
      "Science Mill hands-on STEM museum",
      "Texas Vintage Motorcycle Museum",
      "Reptilandia reptile and amphibian zoo",
      "The Exotic Resort Zoo safari park",
      "U.S. 290 Hill Country wine and Stonewall corridor",
      "Quick access to Pedernales Falls State Park",
    ],
    body: [
      "Johnson City works especially well as a Hill Country base because several very different visitor experiences sit within a compact town center. The Blanco County Courthouse anchors downtown, while restaurants, tasting rooms, shops, museums and visitor services cluster around Main Street and the surrounding blocks.",
      "The town is also the eastern half of Lyndon B. Johnson National Historical Park. The National Park Service's Johnson City district includes the visitor center, LBJ Boyhood Home and Johnson Settlement, where preserved buildings and landscape interpretation connect Johnson family history with ranching, cattle drives and nineteenth-century Hill Country settlement. The separate LBJ Ranch district lies about 14 miles west near Stonewall.",
      "Johnson City has grown beyond presidential history. The Science Mill occupies the historic 1880 feed mill and now presents more than 50 hands-on STEM exhibits, while the Texas Vintage Motorcycle Museum displays more than 100 motorcycles in a restored 1930s Ford dealership just off the square. North of downtown, Reptilandia adds a specialized reptile-and-amphibian zoo and the Exotic Resort Zoo adds a large safari-style wildlife park. Together those attractions give families both indoor and outdoor reasons to make Johnson City the destination rather than only a pass-through.",
      "The wider geography matters just as much as downtown. U.S. 290 continues west through Hye and Stonewall toward Fredericksburg, tying Johnson City into the Hill Country wine corridor and LBJ Ranch landscape. Pedernales Falls State Park lies a short drive east, so a single day can combine museums or history with river-country hiking when weather and park capacity cooperate.",
      "Johnson City's holiday identity is another major trip pattern. The town promotes a large Christmas Lights Spectacular and other seasonal events, and the courthouse-square setting makes the lights easy to pair with downtown businesses. Holiday weekends can be substantially busier than an ordinary Hill Country day, so lodging, dinner and parking deserve more advance planning during that period.",
      "A first visit should resist the temptation to treat Johnson City as only a pass-through on the way to Fredericksburg. The town has enough museum, history and food depth for a full day, and its position between Austin, San Antonio and the western Hill Country makes it one of the more efficient places to begin a multi-stop regional trip.",
    ],
    managingAuthority: "Johnson City, Texas visitor organizations and individual attractions",
    officialUrl: "https://explorejctx.com/",
    address: "Johnson City, TX 78636",
    directions:
      "Johnson City sits at the junction of U.S. 281 and U.S. 290 in Blanco County, roughly one hour from both Austin and San Antonio. The Blanco County Courthouse and visitor center near East Main Street make a practical first orientation point.",
    accessibilityNotes:
      "Downtown is compact, but sidewalks, older storefronts and historic properties vary. The National Park Service provides accessible facilities and program information for the Johnson City district, while individual museums publish their own accommodations.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Treat the courthouse square as the town's orientation point, then build separate blocks for presidential history, hands-on museums and the wider Pedernales or U.S. 290 corridor.",
      nearbyAttractions: [
        {
          name: "Lyndon B. Johnson National Historical Park",
          description:
            "The Johnson City district includes the visitor center, Boyhood Home and Johnson Settlement; the ranch district is about 14 miles west near Stonewall.",
          proximity: "In town and west toward Stonewall",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
        {
          name: "Science Mill",
          description:
            "A hands-on science museum inside Johnson City's historic feed-mill complex, with more than 50 interactive STEM exhibits.",
          proximity: "Downtown Johnson City",
          href: "/destination/science-mill-johnson-city",
        },
        {
          name: "Texas Vintage Motorcycle Museum",
          description:
            "A privately assembled collection of more than 100 vintage motorcycles inside a restored 1930s Ford dealership.",
          proximity: "Just off the courthouse square",
          href: "/destination/texas-vintage-motorcycle-museum-johnson-city",
        },
        {
          name: "Reptilandia – Reptile Lagoon",
          description:
            "A temperature-controlled reptile and amphibian zoo organized around eight biomes and large naturalistic habitats.",
          proximity: "North of downtown on U.S. 281",
          href: "/destination/reptilandia-johnson-city",
        },
        {
          name: "The Exotic Resort Zoo",
          description:
            "A safari-style wildlife park with 700+ animals, guided tractor tours, self-drive access and onsite cabins.",
          proximity: "About 4 miles north of town",
          href: "/destination/exotic-resort-zoo-johnson-city",
        },
      ],
      foodAndDrink: [
        {
          name: "Downtown Johnson City",
          description:
            "Restaurants, cafes, tasting rooms and casual food options cluster around Main Street and the courthouse square.",
          proximity: "Town center",
        },
        {
          name: "U.S. 290 corridor",
          description:
            "Wineries, tasting rooms and destination food stops extend west through Hye and Stonewall toward Fredericksburg.",
          proximity: "West of town",
          href: "/county/blanco",
        },
      ],
      lodging: [
        {
          name: "Johnson City",
          description:
            "Local inns, guesthouses and short-stay lodging keep visitors close to downtown museums and evening events.",
          proximity: "In town",
        },
        {
          name: "Blanco County Hill Country stays",
          description:
            "Rural cabins and guesthouses offer more space while keeping Johnson City, Blanco and the Pedernales corridor within reach.",
          proximity: "Countywide",
          href: "/county/blanco",
        },
      ],
      neighborhoods: [
        {
          name: "Courthouse square and Main Street",
          description:
            "The primary walkable cluster for visitor information, food, shops and the town's civic architecture.",
          proximity: "Downtown",
        },
        {
          name: "Lady Bird Lane / Nugent Avenue museum cluster",
          description:
            "Science Mill and the Texas Vintage Motorcycle Museum sit close enough to combine in one downtown museum block.",
          proximity: "Downtown",
        },
      ],
      familyStops: [
        {
          name: "Science Mill",
          description:
            "Johnson City's strongest family attraction, with indoor and outdoor hands-on STEM exhibits for a wide age range.",
          proximity: "Downtown",
          href: "/destination/science-mill-johnson-city",
        },
        {
          name: "Reptilandia",
          description:
            "A climate-controlled reptile zoo that stays useful during summer heat or rain.",
          proximity: "North of downtown",
          href: "/destination/reptilandia-johnson-city",
        },
        {
          name: "The Exotic Resort Zoo",
          description:
            "A guided or self-drive safari park for a more outdoor animal-focused family day.",
          proximity: "North of town",
          href: "/destination/exotic-resort-zoo-johnson-city",
        },
        {
          name: "Johnson Settlement",
          description:
            "An easy national-park walk with historic buildings, ranching interpretation and longhorn cattle.",
          proximity: "Johnson City NPS district",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
      ],
      sideTrips: [
        {
          name: "Pedernales Falls State Park",
          description:
            "Limestone river shelves, trails and Hill Country scenery make the park a natural outdoor counterpoint to Johnson City's museums.",
          proximity: "East of Johnson City",
          href: "/destination/pedernales-falls-state-park",
        },
        {
          name: "Blanco",
          description:
            "The county's other major small town adds its historic courthouse square and Blanco River State Park.",
          proximity: "South on U.S. 281",
          href: "/destination/blanco",
        },
        {
          name: "Texas Hill Country",
          description:
            "Continue west to Stonewall and Fredericksburg or connect east toward Dripping Springs and Austin.",
          proximity: "Regional",
          href: "/explore/region/hill-country",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Johnson City compresses presidential history, county-seat architecture, family science, specialty museums and Hill Country road-trip access into a small geographic footprint, making it more useful as a destination base than its size suggests.",
      assessment: {
        recommendedVisit:
          "One full day for a first visit; one or two nights if you want both Johnson City museums, the LBJ sites and a Pedernales or U.S. 290 side trip.",
        physicalEffort: "Low to moderate",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Moderate",
        familyFit:
          "Very strong because Science Mill and the national-park sites give families substantial indoor and outdoor options.",
        firstTimeValue:
          "High for travelers who want a compact Hill Country town with more than one major reason to stop.",
      },
      itineraries: [
        {
          label: "Downtown half day",
          duration: "4–5 hours",
          steps: [
            "Start around the Blanco County Courthouse and visitor center.",
            "Choose Science Mill or the Texas Vintage Motorcycle Museum for the main indoor stop.",
            "Walk downtown for lunch, shops and tasting rooms.",
          ],
        },
        {
          label: "Johnson City full day",
          duration: "8–10 hours",
          steps: [
            "Begin with the Johnson City district of Lyndon B. Johnson National Historical Park.",
            "Use midday for lunch and one of the downtown museums.",
            "Add the second museum or courthouse-square time in the afternoon.",
            "Finish with a local dinner or short scenic drive.",
          ],
        },
        {
          label: "Hill Country overnight",
          duration: "1–2 nights",
          steps: [
            "Give Johnson City a dedicated museum-and-history day.",
            "Use a second block for Pedernales Falls, Stonewall or the U.S. 290 wine corridor.",
            "Continue toward Fredericksburg, Blanco or Dripping Springs without backtracking through the region.",
          ],
        },
      ],
      sources: [
        {
          label: "Explore Johnson City",
          url: "https://explorejctx.com/",
          scope:
            "Official local visitor planning, downtown orientation, seasonal events and Johnson City attractions.",
        },
        {
          label: "National Park Service — Lyndon B. Johnson National Historical Park",
          url: "https://www.nps.gov/lyjo/planyourvisit/index.htm",
          scope:
            "Current Johnson City district, LBJ Ranch separation, visitor-center and historic-site planning.",
        },
        {
          label: "Science Mill",
          url: "https://www.sciencemill.org/",
          scope:
            "Current museum mission, operating schedule and Johnson City family-attraction context.",
        },
        {
          label: "Texas Vintage Motorcycle Museum",
          url: "https://www.texasvintagemotorcyclemuseum.com/",
          scope:
            "Current motorcycle-museum visitor information and downtown location.",
        },
      ],
    },
    featured: true,
  },
  {
    id: "museum-science-mill-johnson-city",
    brandId: "texasdefined",
    slug: "science-mill-johnson-city",
    name: "Science Mill",
    summary:
      "Science Mill in Johnson City transforms a historic 1880 feed mill into an all-ages STEM museum with more than 50 hands-on exhibits spanning engineering, biology, electricity, augmented reality, coding, ecology and interactive art.",
    category: "historic-sites",
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
    coordinates: { lat: 30.2765, lng: -98.4129 },
    hero: {
      src: "https://s3.amazonaws.com/texasstandard.org/txstandard/wp-content/uploads/2015/06/m.jpg",
      alt: "Historic Science Mill silos and outdoor grounds in Johnson City, Texas",
      width: 640,
      height: 427,
      credit: "San Antonio Charter Moms · CC BY 3.0 · via Texas Standard",
    },
    bestSeason:
      "Year-round, with especially high value during summer heat, rain or cold weather because most of the core experience is indoors; outdoor exhibits and the Hill Country setting are most comfortable in spring and fall.",
    entryNote:
      "Hours vary seasonally. As of September 19, 2026, the museum's fall schedule is Wednesday through Saturday from 10 a.m. to 4 p.m., with Sunday through Tuesday closed. Check the official hours page and buy admission in advance when a specific day is important.",
    highlights: [
      "More than 50 hands-on STEM exhibits",
      "Historic 1880 Johnson City feed mill and preserved silos",
      "Interactive engineering, biology, coding and electricity exhibits",
      "Augmented-reality sand-table and geology experiences",
      "Aquaponics greenhouse and living-animal exhibits",
      "Easy pairing with downtown Johnson City, LBJ history and the motorcycle museum",
    ],
    body: [
      "Science Mill is more than a children's museum built inside an old structure. The nonprofit purchased Johnson City's historic 1880 feed mill in 2012, preserved much of the 17,000-square-foot industrial complex and reopened it in 2015 as a science museum designed to connect hands-on play with science, technology, engineering and math careers.",
      "The exhibit mix is intentionally broad. The museum currently advertises more than 50 experiences, with installations that combine art, kinetic technology, augmented reality, computer gaming, biology, engineering and physical science. Visitors can move from electricity experiments and a wave pendulum to fossil excavation, topographic sand modeling, animal exhibits and an aquaponics greenhouse without the visit feeling like a single-subject science center.",
      "A major strength is that many exhibits reward experimentation rather than passive reading. The augmented-reality Dig In table lets visitors reshape sand into mountains, rivers, dams and watersheds. Go With The Flow introduces AC and DC electrical systems through controlled experiments, while Cell Phone Disco turns otherwise invisible radio signals into a visible light response inside one of the old silos.",
      "The historic building is part of the experience rather than a backdrop. The original mill and silos give the museum an industrial scale that fits the engineering content, and the adaptive reuse makes Science Mill relevant to adults interested in architecture and preservation even when they are visiting primarily for children.",
      "Science Mill also works especially well in a broader Johnson City itinerary. It sits near the courthouse square, the Texas Vintage Motorcycle Museum and the Johnson City district of Lyndon B. Johnson National Historical Park. That concentration means families can pair a major STEM stop with presidential history, a second specialty museum and downtown food without spending much of the day in the car.",
      "The museum's operating schedule changes by season, so use the official hours page rather than an old travel listing. Current fall 2026 hours run Wednesday through Saturday, and the museum notes that holiday, maintenance and private-event closures can change the normal pattern. Tickets can be purchased online or at the door, but checking the live calendar matters more than memorizing a permanent schedule.",
    ],
    managingAuthority: "Science Mill",
    officialUrl: "https://www.sciencemill.org/",
    reservationUrl: "https://www.sciencemill.org/",
    address: "101 S Lady Bird Ln, Johnson City, TX 78636",
    directions:
      "Science Mill is in downtown Johnson City near West Main Street and South Nugent/Lady Bird Lane. The museum publishes free street parking along Lady Bird Lane and around the courthouse square, plus additional parking west of the museum.",
    accessibilityNotes:
      "The museum is designed as a public family attraction in a renovated historic complex. Confirm current accessibility needs directly with Science Mill if your visit depends on specific mobility, sensory or program accommodations.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Pair Science Mill with one other downtown Johnson City anchor rather than rushing through every nearby attraction; the museum itself can easily occupy several hours.",
      nearbyAttractions: [
        {
          name: "Texas Vintage Motorcycle Museum",
          description:
            "A specialty collection of more than 100 vintage motorcycles in another reused downtown commercial building.",
          proximity: "Downtown Johnson City",
          href: "/destination/texas-vintage-motorcycle-museum-johnson-city",
        },
        {
          name: "Lyndon B. Johnson National Historical Park",
          description:
            "The Johnson City district adds the Boyhood Home, Johnson Settlement and national-park visitor center.",
          proximity: "Johnson City",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
        {
          name: "Blanco County Courthouse",
          description:
            "The 1916 courthouse anchors Johnson City's historic civic center and visitor core.",
          proximity: "Walkable downtown",
          href: "/destination/johnson-city",
        },
      ],
      foodAndDrink: [
        {
          name: "Downtown Johnson City",
          description:
            "Restaurants, cafes and tasting rooms around Main Street make it easy to break up a museum-heavy family day.",
          proximity: "Walkable",
          href: "/destination/johnson-city",
        },
      ],
      lodging: [
        {
          name: "Johnson City",
          description:
            "Staying in town keeps Science Mill, downtown dining and LBJ sites close without committing to Fredericksburg traffic.",
          proximity: "In town",
          href: "/destination/johnson-city",
        },
      ],
      neighborhoods: [
        {
          name: "Lady Bird Lane / Nugent Avenue",
          description:
            "The museum sits in the compact downtown zone that also contains civic buildings, visitor services and the motorcycle museum.",
          proximity: "At the museum",
          href: "/destination/johnson-city",
        },
      ],
      familyStops: [
        {
          name: "Johnson Settlement",
          description:
            "A short national-park trail with preserved buildings and ranching history gives families an outdoor history complement to Science Mill.",
          proximity: "Johnson City",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
        {
          name: "Pedernales Falls State Park",
          description:
            "Use a separate weather-friendly block for trails and river scenery after the museum.",
          proximity: "East of Johnson City",
          href: "/destination/pedernales-falls-state-park",
        },
      ],
      sideTrips: [
        {
          name: "Johnson City",
          description:
            "Use the dedicated town guide to combine Science Mill with the courthouse square, LBJ sites and the motorcycle museum.",
          proximity: "In town",
          href: "/destination/johnson-city",
        },
        {
          name: "Blanco County",
          description:
            "Extend the trip to Blanco, the Pedernales corridor and other county attractions.",
          proximity: "Countywide",
          href: "/county/blanco",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "Science Mill combines adaptive reuse of a historic Hill Country industrial site with a large, technology-heavy hands-on STEM program, giving Johnson City a family attraction substantial enough to anchor its own half-day trip.",
      assessment: {
        recommendedVisit:
          "Plan 2 to 4 hours for most families; allow a half day if your group likes interactive exhibits, live animals and outdoor science areas.",
        physicalEffort: "Low to moderate",
        weatherExposure: "Mostly indoors",
        planningLevel: "Moderate",
        familyFit:
          "Excellent for families, especially elementary and middle-school ages, but many engineering and technology exhibits also work for teens and curious adults.",
        firstTimeValue:
          "Very high for families visiting the Hill Country and strong as a weather-proof anchor in a Johnson City itinerary.",
      },
      itineraries: [
        {
          label: "Focused museum visit",
          duration: "2–3 hours",
          steps: [
            "Check the current seasonal hours before leaving.",
            "Start with the indoor engineering and interactive-technology exhibits.",
            "Finish with the greenhouse, living-animal and outdoor science areas as weather allows.",
          ],
        },
        {
          label: "Johnson City family half day",
          duration: "4–5 hours",
          steps: [
            "Spend the first major block at Science Mill.",
            "Walk downtown for lunch and the courthouse square.",
            "Add the Johnson Settlement or motorcycle museum based on age and interests.",
          ],
        },
        {
          label: "Hill Country family day",
          duration: "Full day",
          steps: [
            "Use Science Mill as the morning anchor.",
            "Break for lunch in Johnson City.",
            "Choose the LBJ Johnson City district or Pedernales Falls for the afternoon.",
            "Keep a second indoor museum in reserve if weather turns.",
          ],
        },
      ],
      sources: [
        {
          label: "Science Mill — official site",
          url: "https://www.sciencemill.org/",
          scope:
            "Current mission, exhibit count, Johnson City location and seasonal operating information.",
        },
        {
          label: "Science Mill — exhibits",
          url: "https://www.sciencemill.org/exhibits",
          scope:
            "Current hands-on exhibit inventory, STEM topics and indoor/outdoor experience.",
        },
        {
          label: "Science Mill — mission and history",
          url: "https://www.sciencemill.org/mission",
          scope:
            "1880 feed-mill history, 2012 acquisition, 2015 opening and adaptive-reuse context.",
        },
        {
          label: "Science Mill — hours",
          url: "https://www.sciencemill.org/hours-of-operation",
          scope:
            "Current fall 2026 operating schedule and seasonal-hours warning.",
        },
        {
          label: "Science Mill — directions",
          url: "https://www.sciencemill.org/directions",
          scope:
            "Current address, parking and driving directions.",
        },
      ],
    },
    featured: true,
  },
];
