import type { Destination } from "./types";

export const militaryHistoryDestinations: Destination[] = [
  {
    id: "military-history-palo-alto-battlefield",
    brandId: "texasdefined",
    slug: "palo-alto-battlefield-national-historical-park",
    name: "Palo Alto Battlefield National Historical Park",
    summary: "The preserved South Texas prairie where U.S. and Mexican armies fought the first major battle of the U.S.–Mexican War on May 8, 1846.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Brownsville",
    coordinates: { lat: 26.017886, lng: -97.480617 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Palo_Alto_Battlefield_National_Historic_Site_PAAL8324.jpg?width=1600",
      alt: "Open coastal prairie at Palo Alto Battlefield National Historical Park near Brownsville",
      width: 3072,
      height: 2048,
      credit: "National Park Service Digital Image Archives · Public domain · Wikimedia Commons",
    },
    bestSeason: "November through May offers milder South Texas weather; check current park conditions before visiting.",
    entryNote: "Park grounds and visitor-center schedules differ and can change with staffing. Confirm current hours and closures with the National Park Service before the trip.",
    highlights: ["1846 battlefield", "Visitor center", "Battlefield trails", "U.S.–Mexican War history", "Brownsville Historic Battlefield Trail"],
    body: [
      "Palo Alto preserves the open coastal prairie where General Zachary Taylor's U.S. force and General Mariano Arista's Mexican army fought on May 8, 1846. The landscape makes artillery ranges, troop positions and the terrain of the war's opening campaign unusually easy to visualize.",
      "The park interprets the causes and consequences of the U.S.–Mexican War from both national perspectives and also administers nearby Resaca de la Palma Battlefield. Exhibits and trails place the battle inside the disputed Texas-Mexico boundary question that followed U.S. annexation rather than presenting the fighting as an isolated military episode.",
      "Use Palo Alto as the anchor for a lower Rio Grande military-history day. Brownsville and the Fort Brown area explain the river crossing and U.S. Army presence, Port Isabel adds the Gulf supply route, and Palmito Ranch shows why the same corridor remained strategically important through the final land battle of the Civil War nearly two decades later.",
    ],
    officialUrl: "https://www.nps.gov/paal/index.htm",
    managingAuthority: "National Park Service",
    address: "7200 Paredes Line Road, Brownsville, TX 78526",
    sourceCheckedAt: "2026-08-19",
    county: "Cameron",
    areaGuide: {
      intro: "Palo Alto works best as the historical anchor for a lower Rio Grande day rather than a stand-alone stop. The most useful extensions continue the 1846 campaign into Brownsville, follow the supply line toward Port Isabel, or compare the same border corridor with the Civil War landscape at Palmito Ranch.",
      nearbyAttractions: [
        { name: "Resaca de la Palma Battlefield", proximity: "Brownsville", description: "The second major battle of the U.S.–Mexican War was fought here on May 9, 1846, in brushier terrain that changed the tactical character of the campaign." },
        { name: "Port Isabel Lighthouse", proximity: "About 25 miles east", description: "Use Port Isabel to understand the Gulf-side supply corridor Taylor's army depended on during the opening campaign.", href: "/destination/port-isabel-lighthouse" },
        { name: "Palmito Ranch Battlefield", proximity: "East of Brownsville", description: "Compare the 1846 border war with the final land battle of the Civil War, fought in the same strategic lower Rio Grande corridor.", href: "/destination/palmito-ranch-battlefield" },
      ],
      foodAndDrink: [
        { name: "Central Brownsville", proximity: "Short drive south", description: "The downtown and central-city area is the simplest place to build a meal stop around a battlefield visit without turning the day into a second long drive." },
        { name: "South Padre and Port Isabel corridor", proximity: "East toward the coast", description: "A practical dining direction when the battlefield is part of a coast-bound itinerary rather than a Brownsville-only day." },
      ],
      lodging: [
        { name: "Brownsville", proximity: "Closest base", description: "Best for combining Palo Alto, Resaca de la Palma, Fort Brown history and other lower Rio Grande stops in one itinerary." },
        { name: "Port Isabel and South Padre Island", proximity: "Coastal alternative", description: "Better for travelers pairing military history with the coast and willing to drive back toward Brownsville for the battlefield sites." },
      ],
      neighborhoods: [
        { name: "Downtown Brownsville", proximity: "South of the battlefield", description: "Historic civic blocks and the Fort Brown area add the urban side of the 1846 campaign and the city that grew beside the military post." },
        { name: "Fort Brown corridor", proximity: "Near the Rio Grande", description: "Use the former military-post area to connect the battlefield with the river crossing and the U.S. Army presence opposite Matamoros." },
      ],
      familyStops: [
        { name: "Palo Alto visitor center and trails", proximity: "On site", description: "Start indoors with orientation, then use the trail system to make troop positions and battlefield scale easier to understand." },
        { name: "Port Isabel Lighthouse", proximity: "About 25 miles east", description: "A visually distinct historic stop that can break up a history-heavy day with a coastal landmark.", href: "/destination/port-isabel-lighthouse" },
      ],
      sideTrips: [
        { name: "Texas and the U.S.–Mexican War", description: "Read the full TexasDefined guide to annexation, the disputed border, Palo Alto, Resaca de la Palma and the Treaty of Guadalupe Hidalgo.", href: "/article/texas-us-mexican-war-palo-alto-guide" },
        { name: "Texas military history timeline", description: "Place the 1846 fighting between the Republic of Texas and the frontier-Army era that followed.", href: "/article/texas-military-history-timeline" },
        { name: "Cameron County guide", description: "Continue into Brownsville, Harlingen, the coast and the wider lower Rio Grande county.", href: "/article/cameron-county-brownsville-harlingen-south-padre-rio-grande" },
      ],
    },
  },
  {
    id: "military-history-texas-military-forces-museum",
    brandId: "texasdefined",
    slug: "texas-military-forces-museum",
    name: "Texas Military Forces Museum",
    summary: "Camp Mabry's museum of Texas militia, National Guard, State Guard and wartime service from the early nineteenth century to modern deployments.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Austin",
    coordinates: { lat: 30.3136, lng: -97.7611 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ceremonies_at_Camp_Mabry_190112-Z-DZ751-0199_(32916620338).jpg?width=1600",
      alt: "A 2019 ceremony inside the Texas Military Forces Museum at Camp Mabry in Austin",
      width: 3000,
      height: 2002,
      credit: "Sgt. 1st Class Jim Greenhill / U.S. Army National Guard · Public domain · Wikimedia Commons",
    },
    bestSeason: "Year-round indoor museum; verify Camp Mabry access requirements before leaving home.",
    entryNote: "The museum is on active Camp Mabry. Adult visitors are subject to installation security screening and photo-ID requirements, and the visitor-control cutoff can be earlier than museum closing time. Check the museum's current access instructions before visiting.",
    highlights: ["Texas National Guard", "36th Infantry Division", "Military vehicles", "Texas State Guard", "Camp Mabry"],
    body: [
      "The 45,000-square-foot Texas Military Forces Museum interprets the state's militia and volunteer traditions, the Texas Army and Air National Guard, and the Texas State Guard through uniforms, weapons, vehicles, photographs, artifacts and large-scale exhibits. It is the best single public collection for following the institutional story from nineteenth-century citizen-soldiers into the modern Texas Military Department.",
      "The museum is especially useful for understanding the 36th Infantry Division, border mobilizations, World War service and the distinction between National Guard components that can enter federal service and the Texas State Guard, which remains a state force. Vehicles and larger artifacts make the military organization easier to read than a chronology alone.",
      "Because the museum sits on active Camp Mabry, access is different from an ordinary city museum. Security screening and identification rules apply, and the visitor-control cutoff can occur before the museum itself closes. Pair the visit with the TexasDefined National Guard history guide and confirm the museum's current Camp Mabry entry instructions before arrival.",
    ],
    officialUrl: "https://texasmilitaryforcesmuseum.org/",
    managingAuthority: "Texas Military Department",
    address: "3038 W 35th St, Austin, TX 78703",
    sourceCheckedAt: "2026-08-19",
    county: "Travis",
    areaGuide: {
      intro: "Camp Mabry sits just west of central Austin, so the museum can fit easily into a broader history day. Use the military collection as the institutional stop, then add the Capitol, state-history museums or nearby central-city neighborhoods depending on how much time you have.",
      nearbyAttractions: [
        { name: "Texas State Capitol", proximity: "About 3 miles southeast", description: "Connect military institutions with the state government that commands Texas forces when they are serving under state authority.", href: "/destination/texas-state-capitol" },
        { name: "Bullock Texas State History Museum", proximity: "Near the Capitol", description: "A broad Texas-history complement for visitors who want political, cultural and economic context beyond the military story." },
        { name: "Downtown Austin", proximity: "Short drive east", description: "Use the central city for the Capitol, museums and the broader civic history of the state capital." },
      ],
      foodAndDrink: [
        { name: "West Austin and Clarksville", proximity: "East and southeast of Camp Mabry", description: "A convenient direction for cafes and restaurants when continuing toward downtown after the museum." },
        { name: "Burnet Road corridor", proximity: "North and northeast", description: "A practical alternative for casual dining when the rest of the itinerary stays on the north side of central Austin." },
      ],
      lodging: [
        { name: "Downtown Austin", proximity: "About 3 miles southeast", description: "Best for travelers combining Camp Mabry with the Capitol, museums and central-city attractions." },
        { name: "Central and North-Central Austin", proximity: "Short drive", description: "Useful for a car-based itinerary that includes Camp Mabry without requiring a downtown hotel." },
      ],
      neighborhoods: [
        { name: "Tarrytown and West Austin", proximity: "Around Camp Mabry", description: "Residential West Austin surrounds the installation and provides the immediate geographic context for the museum visit." },
        { name: "Clarksville", proximity: "East toward downtown", description: "A historic central-Austin neighborhood that works naturally between Camp Mabry and the downtown civic core." },
      ],
      familyStops: [
        { name: "Texas State Capitol grounds", proximity: "About 3 miles southeast", description: "Open grounds and monumental architecture make an easy second history stop after an indoor museum visit.", href: "/destination/texas-state-capitol" },
        { name: "Central Austin museum district", proximity: "Near the Capitol", description: "Use the state-history and university-area museums to widen the day beyond military history." },
      ],
      sideTrips: [
        { name: "Texas National Guard history", description: "Read the full TexasDefined guide from militia and Camp Mabry through the 36th Division, disaster response and modern Guard service.", href: "/article/texas-national-guard-history" },
        { name: "Texas military history timeline", description: "Place Camp Mabry inside the longer evolution from Republic military institutions to the modern Texas Military Department.", href: "/article/texas-military-history-timeline" },
        { name: "San Antonio military aviation", description: "Continue south to the federal military network that made San Antonio a center for Army and Air Force training.", href: "/article/san-antonio-military-aviation-history" },
      ],
    },
  },
];
