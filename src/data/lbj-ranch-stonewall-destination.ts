import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-20";

export const lbjRanchStonewallDestinations: Destination[] = [
  {
    id: "historic-lbj-ranch-stonewall",
    brandId: "texasdefined",
    slug: "lbj-ranch-stonewall",
    name: "LBJ Ranch",
    summary:
      "The LBJ Ranch near Stonewall is the self-guided driving district of Lyndon B. Johnson National Historical Park, where visitors use a free ranch permit to see Junction School, Johnson's reconstructed birthplace, the family cemetery, Show Barn, working Hereford cattle and the presidential ranch landscape.",
    category: "historic-sites",
    region: "hill-country",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["texas-hill-country"],
      gatewaySubregionIds: ["austin-area", "san-antonio-area"],
      countySlugs: ["gillespie"],
      travelRegionIds: ["hill-country"],
      relocationPresentationLabels: ["San Antonio & Hill Country", "Austin & Central Texas"],
    },
    nearestTown: "Stonewall",
    county: "Gillespie",
    coordinates: { lat: 30.241389, lng: -98.625556 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/LBJ-Ranch-1972.jpg?width=1600",
      alt: "Lyndon B. Johnson at the LBJ Ranch near Stonewall, Texas in 1972",
      width: 4904,
      height: 3249,
      credit: "LBJ Library · U.S. public domain · Wikimedia Commons",
    },
    bestSeason:
      "Fall through spring for the most comfortable ranch driving and outdoor stops; summer remains workable by car but heat can make the open-air stops much less comfortable.",
    entryNote:
      "The LBJ Ranch is free, but a free driving permit is required before entering. Pick up the permit at Lyndon B. Johnson State Park & Historic Site, 199 Park Road 52 in Stonewall, between 8:30 a.m. and 4 p.m. The current ranch entrance gate is open 9 a.m.-4:30 p.m. and the exit gate closes at 5 p.m. The Texas White House Complex remains closed during rehabilitation.",
    highlights: [
      "Free self-guided ranch driving tour",
      "Junction School, where Lyndon Johnson began school at age four",
      "Reconstructed birthplace of Lyndon B. Johnson",
      "Johnson Family Cemetery with President and Lady Bird Johnson",
      "Show Barn and heritage Hereford cattle",
      "Pedernales River and working-ranch landscape",
      "Texas White House landscape viewed from the driving route",
      "Official NPS app audio tour for the ranch drive",
    ],
    body: [
      "The LBJ Ranch is the western half of Lyndon B. Johnson National Historical Park and the place where Johnson's personal life, political identity and presidency were most visibly tied to the Texas Hill Country. He was born on the ranch, returned to it throughout his career, conducted presidential business there and was buried in the family cemetery only a short distance from his birthplace.",
      "The visit begins before the ranch gate. National Park Service rules currently require every vehicle to obtain a free driving permit from Lyndon B. Johnson State Park & Historic Site on U.S. 290 near Stonewall. Permits are issued beginning at 8:30 a.m., with no permits issued after 4 p.m. The ranch entrance gate opens at 9 a.m. and closes to inbound traffic at 4:30 p.m.; the exit gate closes at 5 p.m.",
      "Once inside, the ranch is explored at your own pace. The National Park Service provides a route map, and the official NPS mobile app includes a free LBJ Ranch Driving Tour audio experience. The route is designed for stopping at historic sites rather than simply driving past them.",
      "Junction School is one of the most important stops because it connects the ranch to Johnson's lifelong focus on education. He began school there at age four. Later, as president, education became a major part of his domestic-policy agenda, so the small one-room school carries meaning beyond its size.",
      "The reconstructed birthplace marks where Lyndon Baines Johnson was born on August 27, 1908. National Park Service interpretation notes that it is the only presidential birthplace reconstructed by a sitting president. The nearby family cemetery contains the graves of President Johnson, Lady Bird Johnson and other members of the Johnson family.",
      "The Show Barn keeps the ranch from feeling like a frozen presidential memorial. The property remains one of the National Park Service's working cattle-ranch landscapes, with Hereford cattle descended from the type of herd Johnson raised. The agricultural setting is part of the historical interpretation, not background scenery.",
      "The biggest current limitation is the Texas White House Complex rehabilitation. The Texas White House, Hangar Visitor Center, Lockheed JetStar and Klein Shop vehicle display are closed and inaccessible. The ranch driving route still passes the complex, but visitors may not park, stop along the construction fencing or walk the grounds during the closure.",
      "That closure does not make the ranch trip pointless. Junction School, the reconstructed birthplace, cemetery viewing area, Show Barn and ranch landscape remain the heart of the current self-guided experience. Travelers should plan around those open sites instead of arriving with an outdated expectation of a Texas White House interior tour.",
      "The state park and national park are separate agencies but function together for visitors. Texas Parks and Wildlife operates the state park where the ranch permit is issued and where Sauer-Beckmann Living History Farm interprets German-Texan farm life. The National Park Service manages the LBJ Ranch itself.",
      "A strong Hill Country history day can begin in Johnson City with the Boyhood Home and Johnson Settlement, continue west to Sauer-Beckmann Farm and then finish with the ranch drive. Hye, Stonewall and Fredericksburg give the same U.S. 290 corridor enough food, lodging and additional attractions to support a full weekend.",
    ],
    managingAuthority: "National Park Service — Lyndon B. Johnson National Historical Park",
    officialUrl: "https://www.nps.gov/lyjo/planyourvisit/visitlbjranch.htm",
    address: "Permit pickup: 199 Park Road 52, Stonewall, TX 78671",
    directions:
      "Before entering the LBJ Ranch, stop at Lyndon B. Johnson State Park & Historic Site on U.S. 290 near Stonewall to obtain the required free driving permit and route map. Follow the permit instructions to the ranch entrance on Park Road 49.",
    accessibilityNotes:
      "NPS describes Junction School, the reconstructed birthplace, cemetery viewing area and Show Barn as accessible ranch stops. The experience is vehicle-based with outdoor walking at individual sites; check current NPS accessibility guidance if a specific building or route is essential.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    areaGuide: {
      intro:
        "Treat the LBJ Ranch as the western anchor of a U.S. 290 presidential-history route rather than a standalone house tour.",
      nearbyAttractions: [
        {
          name: "LBJ State Park & Sauer-Beckmann Living History Farm",
          description:
            "Pick up the required ranch driving permit here, then explore German-Texan farm history, longhorns and bison before entering the ranch.",
          proximity: "Adjacent Stonewall corridor",
          href: "/destination/lyndon-b-johnson-state-park-and-historic-site",
        },
        {
          name: "Lyndon B. Johnson National Historical Park",
          description:
            "Use the broader two-district guide to connect the ranch with the Johnson City Visitor Center, Boyhood Home and Johnson Settlement.",
          proximity: "Same national park",
          href: "/destination/lyndon-b-johnson-national-historical-park",
        },
        {
          name: "Hye",
          description:
            "A small U.S. 290 community east of Stonewall with the historic post office, Garrison Brothers and winery stops.",
          proximity: "East on U.S. 290",
          href: "/destination/hye",
        },
      ],
      foodAndDrink: [
        {
          name: "Hye",
          description:
            "Use Hye for Garrison Brothers, wineries and tasting stops east of the ranch.",
          proximity: "East on U.S. 290",
          href: "/destination/hye",
        },
        {
          name: "Fredericksburg",
          description:
            "The largest concentration of restaurants, wineries and visitor services west of the ranch.",
          proximity: "West on U.S. 290",
          href: "/destination/fredericksburg",
        },
      ],
      lodging: [
        {
          name: "Fredericksburg",
          description:
            "The strongest lodging base west of the ranch, with hotels, inns and short-term stays plus evening dining and shopping.",
          proximity: "West of Stonewall",
          href: "/destination/fredericksburg",
        },
        {
          name: "Johnson City",
          description:
            "A practical eastern base when the Boyhood Home, Johnson Settlement and Blanco County attractions are also part of the trip.",
          proximity: "About 14 miles east",
          href: "/destination/johnson-city",
        },
      ],
      neighborhoods: [
        {
          name: "Stonewall / Pedernales corridor",
          description:
            "The ranch, state park, orchards, wineries and U.S. 290 form one continuous Hill Country visitor landscape.",
          proximity: "At the ranch",
        },
      ],
      familyStops: [
        {
          name: "Sauer-Beckmann Living History Farm",
          description:
            "A free working-history experience with interpreters, livestock and historic buildings near the ranch permit stop.",
          proximity: "LBJ State Park",
          href: "/destination/lyndon-b-johnson-state-park-and-historic-site",
        },
        {
          name: "LBJ Boyhood Home",
          description:
            "Free ranger-led programs in Johnson City add the childhood chapter before or after the ranch.",
          proximity: "About 14 miles east",
          href: "/destination/lbj-boyhood-home-johnson-city",
        },
      ],
      sideTrips: [
        {
          name: "Johnson Settlement",
          description:
            "Walk the one-mile historic cattle-driving settlement associated with Johnson's grandparents in Johnson City.",
          proximity: "Johnson City district",
          href: "/destination/johnson-settlement-johnson-city",
        },
        {
          name: "Garrison Brothers Distillery",
          description:
            "Add a working Texas bourbon distillery in Hye along the same U.S. 290 corridor.",
          proximity: "Hye",
          href: "/destination/garrison-brothers-distillery-hye",
        },
      ],
    },
    authorityGuide: {
      whyItMatters:
        "The LBJ Ranch is one of the rare presidential sites where political history, family history and a working agricultural landscape occupy the same place, making the drive itself part of the interpretation rather than merely transportation between buildings.",
      assessment: {
        recommendedVisit:
          "Plan 2 to 4 hours for the ranch drive and open stops; allow a full day when combined with LBJ State Park, Johnson City or both.",
        physicalEffort: "Low",
        weatherExposure: "Mixed vehicle/outdoor",
        planningLevel: "Moderate",
        familyFit:
          "Good for families comfortable with a self-guided driving route and short historic stops; Sauer-Beckmann Farm adds a more hands-on companion experience.",
        firstTimeValue:
          "Very high for visitors interested in presidential history or the Texas Hill Country, even while the Texas White House Complex is closed.",
      },
      itineraries: [
        {
          label: "Ranch drive only",
          duration: "2–3 hours",
          steps: [
            "Pick up the free driving permit at LBJ State Park before 4 p.m.",
            "Enter the ranch before the 4:30 p.m. inbound gate closure.",
            "Stop at Junction School, reconstructed birthplace, cemetery viewing area and Show Barn.",
          ],
        },
        {
          label: "Stonewall history half day",
          duration: "4–5 hours",
          steps: [
            "Start at LBJ State Park and Sauer-Beckmann Living History Farm.",
            "Collect the ranch driving permit.",
            "Complete the ranch route and open historic stops.",
          ],
        },
        {
          label: "Full LBJ corridor day",
          duration: "Full day",
          steps: [
            "Begin in Johnson City with the Boyhood Home and Johnson Settlement.",
            "Drive west to LBJ State Park for Sauer-Beckmann and the ranch permit.",
            "Finish with the self-guided ranch drive and open ranch sites.",
          ],
        },
      ],
      sources: [
        {
          label: "National Park Service — Visiting the LBJ Ranch",
          url: "https://www.nps.gov/lyjo/planyourvisit/visitlbjranch.htm",
          scope:
            "Current permit window, ranch gate times, self-guided route, fees and Texas White House Complex closure.",
        },
        {
          label: "National Park Service — Basic Information",
          url: "https://www.nps.gov/lyjo/planyourvisit/basicinfo.htm",
          scope:
            "Current free admission, open ranch stops and relationship between the two park districts.",
        },
        {
          label: "National Park Service — Texas White House Rehabilitation",
          url: "https://www.nps.gov/lyjo/texas-white-house-closure.htm",
          scope:
            "Current closure of the Texas White House Complex and what remains open at the ranch.",
        },
        {
          label: "Wikimedia Commons — LBJ-Ranch-1972",
          url: "https://commons.wikimedia.org/wiki/File:LBJ-Ranch-1972.jpg",
          scope:
            "Exact-subject historical ranch hero image and U.S. public-domain reuse status.",
        },
      ],
    },
    featured: false,
  },
];
